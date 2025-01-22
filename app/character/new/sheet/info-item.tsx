import type { LucideIcon } from "lucide-react";
interface InfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}
export function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-center gap-2 ">
      <Icon className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm font-medium quintessential">{label}:</span>
      <span className="text-sm almendra-sc">{value}</span>
    </div>
  );
}
