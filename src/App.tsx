import { useState } from "react";
import ScenarioSelect from "./ScenarioSelect";
import { Scenario } from "./ScenarioSelect";
import SpeakingSession from "./SpeakingSession";

export default function App() {
    const [scenario, setScenario] = useState<Scenario | null>(null);

    const handleScenarioSelect = (newScenario: Scenario) => {
        setScenario(newScenario);
        // Here you can add logic to change the view
    };

    return (
        <>
            {scenario ? (
                <SpeakingSession scenario={scenario} />
            ) : (
                <ScenarioSelect onScenarioSelect={handleScenarioSelect} />
            )}
        </>
    );
}
