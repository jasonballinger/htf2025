import "./App.css";
import { useState, useRef, useEffect } from "react";
import { Scenario } from "./ScenarioSelect";

export default function SpeakingSession({ scenario }: { scenario: Scenario }) {
    // TODO: need to handle microphone permissions
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [events, setEvents] = useState<any[]>([]);
    const [dataChannel, setDataChannel] = useState<RTCDataChannel | null>(null);
    const [isMuted, setIsMuted] = useState(false);

    const audioTrack = useRef<MediaStreamTrack | null>(null);
    const peerConnection = useRef<RTCPeerConnection | null>(null);
    const audioElement = useRef<HTMLAudioElement | null>(null);

    const finalPrompt = `${scenario.scenario.basePrompt} Remain aware of cultural norms in the countries where ${scenario.options.language} is spoken, and practice them. Only speak in ${scenario.options.language}, at a vocabulary level that a ${scenario.options.difficulty} speaker could understand. If you are spoken to in a language other than ${scenario.options.language}, act confused and say that you cannot understand what they are saying in ${scenario.options.language}, and ask the user to speak ${scenario.options.language}. If they repeat the same question in a language other than ${scenario.options.language}, respond in English and say that you cannot understand them. After this, return to speaking ${scenario.options.language} unless they continue to respond in a non-${scenario.options.language} langugae.`;

    async function startSession({ instructions }: { instructions: string }) {
        // Get a session token for OpenAI Realtime API
        const tokenResponse = await fetch("http://localhost:3001/session", {
            method: "POST",
            body: JSON.stringify({ instructions: finalPrompt }),
        });
        const data = await tokenResponse.json();
        const EPHEMERAL_KEY = data.client_secret.value;

        // Create a peer connection
        const pc = new RTCPeerConnection();

        // Set up to play remote audio from the model
        audioElement.current = document.createElement("audio");
        audioElement.current.autoplay = true;
        pc.ontrack = (e) => {
            if (audioElement.current) {
                audioElement.current.srcObject = e.streams[0];
            }
        };

        // Add local audio track for microphone input in the browser
        const ms = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });
        const track = ms.getTracks()[0];
        audioTrack.current = track; // Store reference to track
        pc.addTrack(track);

        // Set up data channel for sending and receiving events
        const dc = pc.createDataChannel("oai-events");
        setDataChannel(dc);

        // Start the session using the Session Description Protocol (SDP)
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        const baseUrl = "https://api.openai.com/v1/realtime";
        const model = "gpt-4o-realtime-preview-2024-12-17";
        const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
            method: "POST",
            body: offer.sdp,
            headers: {
                Authorization: `Bearer ${EPHEMERAL_KEY}`,
                "Content-Type": "application/sdp",
            },
        });

        const answer: RTCSessionDescriptionInit = {
            type: "answer",
            sdp: await sdpResponse.text(),
        };
        await pc.setRemoteDescription(answer);

        peerConnection.current = pc;
    }

    // Stop current session, clean up peer connection and data channel
    function stopSession() {
        if (dataChannel) {
            dataChannel.close();
        }

        if (peerConnection.current) {
            peerConnection.current.getSenders().forEach((sender) => {
                if (sender.track) {
                    sender.track.stop();
                }
            });

            peerConnection.current.close();
        }

        setIsSessionActive(false);
        setDataChannel(null);
        peerConnection.current = null;
    }

    // Send a message to the model
    function sendClientEvent(message: any) {
        if (dataChannel) {
            const timestamp = new Date().toLocaleTimeString();
            message.event_id = message.event_id || crypto.randomUUID();

            // send event before setting timestamp since the backend peer doesn't expect this field
            dataChannel.send(JSON.stringify(message));

            // if guard just in case the timestamp exists by miracle
            if (!message.timestamp) {
                message.timestamp = timestamp;
            }
            setEvents((prev) => [message, ...prev]);
        } else {
            console.error(
                "Failed to send message - no data channel available",
                message
            );
        }
    }

    // Send a text message to the model
    function sendTextMessage(message: any) {
        const event = {
            type: "conversation.item.create",
            item: {
                type: "message",
                role: "user",
                content: [
                    {
                        type: "input_text",
                        text: message,
                    },
                ],
            },
        };

        sendClientEvent(event);
        sendClientEvent({ type: "response.create" });
    }

    // Attach event listeners to the data channel when a new one is created
    useEffect(() => {
        if (dataChannel) {
            // Append new server events to the list
            dataChannel.addEventListener("message", (e) => {
                const event = JSON.parse(e.data);
                if (!event.timestamp) {
                    event.timestamp = new Date().toLocaleTimeString();
                }

                setEvents((prev) => [event, ...prev]);
            });

            // Set session active when the data channel is opened
            dataChannel.addEventListener("open", () => {
                setIsSessionActive(true);
                setEvents([]);
            });
        }
    }, [dataChannel]);

    // Add function to toggle mute
    const toggleMute = () => {
        if (audioTrack.current) {
            audioTrack.current.enabled = !audioTrack.current.enabled;
            setIsMuted(!isMuted);
        }
    };

    return (
        <>
            <button
                onClick={async () => {
                    if (isSessionActive) {
                        stopSession();
                    } else {
                        try {
                            await startSession({
                                instructions: "You are a helpful AI assistant.",
                            });
                        } catch (error) {
                            console.error("Failed to start session:", error);
                        }
                    }
                }}
            >
                {isSessionActive ? "Stop Session" : "Start Session"}
            </button>

            {/* Add mute button */}
            {isSessionActive && (
                <button onClick={toggleMute}>
                    {isMuted ? "Unmute" : "Mute"} Microphone
                </button>
            )}
            <p>hello!</p>
        </>
    );
}
