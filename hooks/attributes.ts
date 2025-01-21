import { useState } from "react";
import type { AttributeKey } from "@/lib/attributes";
export function useAttributeDnd(
  initialValues: number[],
  onAssign: (attribute: AttributeKey, value: number) => void
) {
  const [availableValues, setAvailableValues] =
    useState<number[]>(initialValues);
  const handleDragStart = (e: React.DragEvent, value: number) => {
    e.dataTransfer.setData("value", value.toString());
  };
  const handleDrop = (e: React.DragEvent, attribute: AttributeKey) => {
    e.preventDefault();
    const value = Number.parseInt(e.dataTransfer.getData("value"));
    if (!isNaN(value)) {
      onAssign(attribute, value);
      setAvailableValues((prev) => prev.filter((v) => v !== value));
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const reset = () => {
    setAvailableValues(initialValues);
  };
  return {
    availableValues,
    handleDragStart,
    handleDrop,
    handleDragOver,
    reset,
    setAvailableValues,
  };
}
