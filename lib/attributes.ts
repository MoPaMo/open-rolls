import {
  BicepsFlexed,
  BookCopy,
  Brain,
  Heart,
  MessageCircleHeart,
  Activity,
} from "lucide-react";
export const icons = {
  strength: BicepsFlexed,
  dexterity: Activity,
  constitution: Heart,
  intelligence: Brain,
  wisdom: BookCopy,
  charisma: MessageCircleHeart,
};

export const ATTRIBUTES = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
] as const;

export type AttributeKey = (typeof ATTRIBUTES)[number];

export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

export const POINT_BUY_COSTS: Record<number, number> = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
};
export function rollAttribute(): number {
  const rolls = Array.from(
    { length: 4 },
    () => Math.floor(Math.random() * 6) + 1,
  );
  return rolls
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((sum, num) => sum + num, 0);
}
export function calculatePointBuyTotal(
  attributes: Record<AttributeKey, number>,
): number {
  return Object.values(attributes).reduce((total, value) => {
    return total + (POINT_BUY_COSTS[value] || 0);
  }, 0);
}
