"use client";

import { useState } from "react";
import type { Character, Step } from "@/types/character";
import { Button } from "@/components/ui/button";
import { TraitStep } from "./Traits";
import { ClassStep } from "./Class";
import { BackgroundStep } from "./Background";
import { AttributesStep } from "./Attributes";
import { AlignmentStep } from "./Alignment";
const INITIAL_CHARACTER: Character = {
  name: "",
  race: "",
  class: "",
  level: 1,
  background: "",
  attributes: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  },
  skills: [],
  proficiencies: {
    languages: [],
    tools: [],
  },
  spells: [],
  abilities: [],
  alignment: {
    ethic: 0,
    moral: 0,
  },
  backstory: "",
};

const steps: Step[] = [
  { title: "Traits", component: TraitStep },
  { title: "Class", component: ClassStep },
  { title: "Background", component: BackgroundStep },
  { title: "Attributes", component: AttributesStep },
  { title: "Alignment", component: AlignmentStep },
] as const;

export default function CharacterWizard() {
  const [step, setStep] = useState(0);
  const [character, setCharacter] = useState<Character>(INITIAL_CHARACTER);
  const [isComplete, setIsComplete] = useState(false);

  const updateCharacter = (updates: Partial<Character>) => {
    setCharacter((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setCharacter(INITIAL_CHARACTER);
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <div>
        Doneee
        <Button onClick={handleReset}>Create Another Character</Button>
      </div>
    );
  }

  const CurrentStep = steps[step]?.component;

  if (!CurrentStep) {
    return <div>Error: Step not found</div>;
  }

  return (
    <div>
      <CurrentStep
        character={character}
        updateCharacter={updateCharacter}
        onNext={handleNext}
        onBack={handleBack}
      />
    </div>
  );
}
