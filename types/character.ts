export interface Character {
  name: string;
  race: string;
  class: string;
  level: number;
  background: string;
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };

  skills: string[];
  proficiencies: {
    languages: string[];
    tools: string[];
  };
  spells: Array<{
    name: string;
    level: number;
    components: string[];
    description: string;
  }>;
  abilities: Array<{
    name: string;
    description: string;
  }>;
  alignment: {
    ethic: -1 | 0 | 1;
    moral: -1 | 0 | 1;
  };
  backstory: string;
}

export interface StepProps {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
  onNext: () => void;
  onBack: () => void;
}

export interface Step {
  title: string;
  component: React.ComponentType<StepProps>;
}
