import { useState, useEffect, useRef } from "react";
import { initWebRTC } from "./webrtcUtils";
import "./App.css";

function App() {
    const [sessionId, setSessionId] = useState<string>("");
    const [peerConnection, setPeerConnection] =
        useState<RTCPeerConnection | null>(null);
    const [isRecording, setIsRecording] = useState<boolean>(false); // Track recording state
    const mediaRecorderRef = useRef<MediaRecorder | null>(null); // Ref for MediaRecorder

    useEffect(() => {
        async function initializeWebRTC() {
            try {
                const pc = await initWebRTC(setSessionId);
                setPeerConnection(pc); // Store the peer connection in state
            } catch (error) {
                console.error("Error initializing WebRTC:", error);
            }
        }

        initializeWebRTC();
    }, []);

    // Function to start recording
    const startRecording = async () => {
        if (!peerConnection) {
            console.error("Peer connection is not ready.");
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = async (event) => {
                if (event.data.size > 0) {
                    console.log("Recording complete, sending audio...");
                    await sendAudioToPeer(event.data); // Send the audio blob to the peer
                }
            };

            mediaRecorder.start(); // Start recording
            setIsRecording(true); // Update recording state
            console.log("Recording started...");
        } catch (error) {
            console.error("Error starting recording:", error);
        }
    };

    // Function to stop recording
    const stopRecording = () => {
        const mediaRecorder = mediaRecorderRef.current;
        if (mediaRecorder && mediaRecorder.state !== "inactive") {
            mediaRecorder.stop(); // Stop recording
            setIsRecording(false); // Update recording state
            console.log("Recording stopped...");
        }
    };

    // Function to send audio to the peer
    const sendAudioToPeer = async (audioBlob: Blob) => {
        if (!peerConnection) {
            console.error("Peer connection is not ready.");
            return;
        }

        const audioContext = new AudioContext();
        const audioBuffer = await audioBlob.arrayBuffer();
        const decodedAudio = await audioContext.decodeAudioData(audioBuffer);

        const source = audioContext.createBufferSource();
        source.buffer = decodedAudio;

        const destination = audioContext.createMediaStreamDestination();
        source.connect(destination);
        source.start();

        const track = destination.stream.getAudioTracks()[0];
        peerConnection.addTrack(track); // Add the audio track to the peer connection
    };

    return (
        <>
            <p>Session id: {sessionId}</p>
            {peerConnection && <p>Peer connection is ready!</p>}
            <button onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
        </>
    );
}

export default App;
