import { Book, Crown, Flag, GraduationCap, Heart, PersonStanding, Scroll, Shield, Swords, User } from "lucide-react"
import { AbilityScore } from "./ability-score.tsx"
import { InfoItem } from "./info-item"
import { ProficiencyBadge } from "./proficiency-badge"
import { SpellCard } from "./spell-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import type { Character } from "@/types/character"
const ALIGNMENT_MAP = {
  ethic: {
    "-1": "Chaotic",
    "0": "Neutral",
    "1": "Lawful",
      },
  moral: {
    "-1": "Evil",
    "0": "Neutral",
    "1": "Good",
  },
}
interface CharacterDisplayProps {
  character: Character
}
export function CharacterDisplay({ character }: CharacterDisplayProps) {
  const alignmentString = `${ALIGNMENT_MAP.ethic[character.alignment.ethic]} ${ALIGNMENT_MAP.moral[character.alignment.moral]}`
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold">{character.name}</h1>
          <p className="text-muted-foreground">
            Level {character.level} {character.race} {character.class}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <InfoItem icon={PersonStanding} label="Race" value={character.race} />
          <InfoItem icon={Swords} label="Class" value={character.class} />
          <InfoItem icon={Crown} label="Background" value={character.background} />
          <InfoItem icon={Flag} label="Alignment" value={alignmentString} />
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <AbilityScore name="Strength" score={character.attributes.strength} abbreviation="STR" />
        <AbilityScore name="Dexterity" score={character.attributes.dexterity} abbreviation="DEX" />
        <AbilityScore name="Constitution" score={character.attributes.constitution} abbreviation="CON" />
        <AbilityScore name="Intelligence" score={character.attributes.intelligence} abbreviation="INT" />
        <AbilityScore name="Wisdom" score={character.attributes.wisdom} abbreviation="WIS" />
        <AbilityScore name="Charisma" score={character.attributes.charisma} abbreviation="CHA" />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Proficiencies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {character.proficiencies.languages.map((language) => (
                      <ProficiencyBadge key={language} name={language} type="language" />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {character.proficiencies.tools.map((tool) => (
                      <ProficiencyBadge key={tool} name={tool} type="tool" />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {character.skills.map((skill) => (
                      <ProficiencyBadge key={skill} name={skill} type="skill" />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="w-5 h-5" />
                Backstory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                <p className="text-sm whitespace-pre-wrap">{character.backstory}</p>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scroll className="w-5 h-5" />
                Spells
              </CardTitle>
            </CardHeader> 
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {character.spells.map((spell, index) => (
                  <AccordionItem key={spell.name} value={`spell-${index}`}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <span>{spell.name}</span>
                        <span className="text-sm text-muted-foreground">(Level {spell.level})</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <SpellCard {...spell} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
            <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
           <GraduationCap className="w-5 h-5" />
                Abilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {character.abilities.map((ability, index) => (
                  <AccordionItem key={ability.name} value={`ability-${index}`}>
                    <AccordionTrigger>{ability.name}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">{ability.description}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
                )
}
