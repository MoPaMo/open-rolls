import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
interface ProficiencyBadgeProps {
  name: string
  type: "language" | "tool" | "skill"
        }
export function ProficiencyBadge({ name, type }: ProficiencyBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge variant="secondary">{name}</Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{type.charAt(0).toUpperCase() + type.slice(1)} Proficiency</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
