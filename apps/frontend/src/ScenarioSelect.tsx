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
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            basePrompt: ""
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
