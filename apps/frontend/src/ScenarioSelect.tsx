import { useState } from "react";
// import { useNavigate } from "react-router-dom"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// enum Language {
//     English = "English",
//     Chinese = "Chinese",
//     Russian = "Russian",
//     Arabic = "Arabic"
// }

// enum Voice {
//     alloy = "alloy",
//     echo = "echo",
//     shimmer = "shimmer",
//     // ash,
//     // ballad,
//     // coral,
//     // sage,
//     // verse
// }

interface ScenarioOptions {
    language: String;
    difficulty: String;
    voice: String;
}

interface ScenarioBase {
    title: String;
    description: String;
    basePrompt: String;
}

export interface Scenario {
    scenario: ScenarioBase;
    options: ScenarioOptions;
}

const scenarios: ScenarioBase[] = [
    {
        title: "Renting an Apartment",
        description:
            "Talk to a landlord about renting an apartment. Discuss details such as price, apartment type, location, and any other relevant information.",
        basePrompt:
            "You are a landlord. The user is an American student studying abroad in your country, and they are seeking to rent an apartment. Your task is to have a natural conversation with the user about the apartments you have for rent, details such as price and apartment type, and so on, responding to what they say in an appropriate manner. The conversation should continue until you or I indicate through our speech that the conversation has come to an end.",
    },
    {
        title: "Calling Emergency Services",
        description:
            "Call the local emergency number to request assistance or report a crime. Describe the situation and what you need, cooperating with dispatcher instructions.",
        basePrompt:
            "You are speaking with an American student studying abroad in your country. They are experiencing a medical Emergency. You are playing the role of a helpful, serious dispatcher communicating with the student who has found a person unconscious on the ground. First, you will provide the student with the number for Emergency services in your country. Then, the student will explain their situation.",
    },
    {
        title: "Ordering Food",
        description:
            "Place an order at a restaurant. You may ask about menu items, prices, etc. before placing your order.",
        basePrompt:
            "You are a waiter at a restaurant in your country. The user is an American student who has come to study abroad in your country, and has come to your restaurant to eat a meal. Your task is to be their waiter, having a natural conversation with them about what they would like to eat, prices, and other topics appropriate to a conversation with a restaurant customer. The conversation should continue until you or I indicate through our speech that the conversation has come to an end.",
    },
];

// const basePrompt = "";

interface ScenarioSelectProps {
    onScenarioSelect: (scenario: Scenario) => void;
}

export default function ScenarioSelect({
    onScenarioSelect,
}: ScenarioSelectProps) {
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState("");

    const handleSelect = (item: ScenarioBase) => {
        const newScenario = {
            scenario: item,
            options: {
                language: selectedLanguage,
                voice: "alloy",
                difficulty: selectedDifficulty,
            },
        };
        onScenarioSelect(newScenario);
    };

    return (
        <div className="w-full min-h-screen bg-background">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-[1400px] mx-auto">
                {scenarios.map((item, index) => (
                    <Card key={index} className="w-[350px]">
                        <CardHeader>
                            <CardTitle className="text-xl text-center w-full">
                                {item.title}
                            </CardTitle>
                            <CardDescription>
                                {item.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Select
                                onValueChange={(value) =>
                                    setSelectedLanguage(value)
                                }
                            >
                                <SelectTrigger className="w-full content-center">
                                    <SelectValue placeholder="Language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="English">
                                        🇬🇧 English
                                    </SelectItem>
                                    <SelectItem value="Chinese">
                                        🇨🇳 Chinese
                                    </SelectItem>
                                    <SelectItem value="Arabic">
                                        🇸🇦 Arabic
                                    </SelectItem>
                                    <SelectItem value="Russian">
                                        🇷🇺 Russian
                                    </SelectItem>
                                    <SelectItem value="Persian/Farsi">
                                        🇮🇷 Persian/Farsi
                                    </SelectItem>
                                    <SelectItem value="Spanish">
                                        🇪🇸 Spanish
                                    </SelectItem>
                                    <SelectItem value="French">
                                        🇫🇷 French
                                    </SelectItem>
                                    <SelectItem value="German">
                                        🇩🇪 German
                                    </SelectItem>
                                    <SelectItem value="Portugese">
                                        🇵🇹 Portugese
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Select
                                onValueChange={(value) =>
                                    setSelectedDifficulty(value)
                                }
                            >
                                <SelectTrigger className="w-full content-center">
                                    <SelectValue placeholder="Difficulty" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Beginner">
                                        Easy
                                    </SelectItem>
                                    <SelectItem value="Intermediate">
                                        Intermediate
                                    </SelectItem>
                                    <SelectItem value="Intermediate-Expert">
                                        Hard
                                    </SelectItem>
                                    <SelectItem value="Fluent">
                                        Fluent
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button
                                variant="outline"
                                onClick={() => handleSelect(item)}
                                disabled={!selectedLanguage}
                            >
                                Select
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
