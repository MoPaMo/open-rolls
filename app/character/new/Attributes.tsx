"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import type { StepProps } from "@/types/character";
import {
  ATTRIBUTES,
  STANDARD_ARRAY,
  POINT_BUY_COSTS,
  rollAttribute,
  calculatePointBuyTotal,
  icons,
  type AttributeKey,
} from "@/lib/attributes";
import { useAttributeDnd } from "@/hooks/attributes";
import { Dice6 } from "lucide-react";
type Method = "manual" | "pointBuy" | "standardArray" | "roll";
export function AttributesStep({
  character,
  updateCharacter,
  onNext,
  onBack,
}: StepProps) {
  const [method, setMethod] = useState<Method>("pointBuy");
  const [rolledValues, setRolledValues] = useState<number[]>([]);
  const {
    availableValues,
    handleDragStart,
    handleDrop,
    handleDragOver,
    reset,
    setAvailableValues,
  } = useAttributeDnd(
    method === "standardArray" ? STANDARD_ARRAY : rolledValues,
    (attribute, value) => {
      updateCharacter({
        attributes: {
          ...character.attributes,
          [attribute]: value,
        },
      });
    },
  );
  const handleRoll = () => {
    const newRolls = Array.from({ length: 6 }, rollAttribute);
    setRolledValues(newRolls);
    setAvailableValues(newRolls);
    updateCharacter({
      attributes: ATTRIBUTES.reduce(
        (acc, attr) => ({ ...acc, [attr]: 0 }),
        {} as Record<AttributeKey, number>,
      ),
    });
  };
  const handleMethodChange = (newMethod: Method) => {
    setMethod(newMethod);
    updateCharacter({
      attributes: ATTRIBUTES.reduce(
        (acc, attr) => ({ ...acc, [attr]: newMethod === "pointBuy" ? 8 : 0 }),
        {} as Record<AttributeKey, number>,
      ),
    });
    if (newMethod === "standardArray") {
      setAvailableValues(STANDARD_ARRAY);
    } else if (newMethod === "roll") {
      handleRoll();
    }
  };
  const handlePointBuy = (attribute: AttributeKey, increment: boolean) => {
    const currentValue = character.attributes[attribute];
    const newValue = increment ? currentValue + 1 : currentValue - 1;
    if (newValue >= 8 && newValue <= 15) {
      const newAttributes = {
        ...character.attributes,
        [attribute]: newValue,
      };
      if (calculatePointBuyTotal(newAttributes) <= 27) {
        updateCharacter({ attributes: newAttributes });
      }
    }
  };
  const handleManualChange = (attribute: AttributeKey, value: string) => {
    const numValue = Number.parseInt(value) || 0;
    updateCharacter({
      attributes: {
        ...character.attributes,
        [attribute]: Math.min(20, Math.max(1, numValue)),
      },
    });
  };
  const isValid = ATTRIBUTES.every(
    (attr) => character.attributes[attr as AttributeKey] > 0,
  );
  const pointBuyTotal = calculatePointBuyTotal(character.attributes);
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Choose Method</Label>
        <Select value={method} onValueChange={handleMethodChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pointBuy">Point Buy (27 Points)</SelectItem>
            <SelectItem value="standardArray">Standard Array</SelectItem>
            <SelectItem value="roll">Roll Stats</SelectItem>
            <SelectItem value="manual">Manual Entry</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {(method === "roll" || method === "standardArray") && (
        <div className="flex items-center gap-4">
          {method === "roll" && (
            <>
              <Button onClick={handleRoll} variant="outline">
                <Dice6 className="w-4 h-4 mr-2" />
                Roll All
              </Button>
              <Button onClick={reset} variant="outline" size="sm">
                Reset Assignments
              </Button>
            </>
          )}
          {method === "standardArray" && (
            <Button onClick={reset} variant="outline" size="sm">
              Reset Assignments
            </Button>
          )}
        </div>
      )}
      {(method === "standardArray" || method === "roll") && (
        <div className="grid grid-cols-2 gap-4 p-4 mb-4 border rounded-lg">
          <div className="space-y-2">
            <Label>Available Values</Label>
            <div className="flex flex-wrap gap-2">
              {availableValues.map((value, index) => (
                <Card
                  key={`${value}-${index}`}
                  className="p-2 cursor-move"
                  draggable
                  onDragStart={(e) => handleDragStart(e, value)}
                >
                  {value}
                </Card>
              ))}
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Drag and drop values to assign them to attributes
          </div>
        </div>
      )}
      {method === "pointBuy" && (
        <div className="text-sm text-muted-foreground">
          Points Remaining: {27 - pointBuyTotal}
        </div>
      )}
      <div className="space-y-4 grid grid-cols-3 gap-4">
        {ATTRIBUTES.map((attribute) => (
          <div
            key={attribute}
            className="space-y-2"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, attribute as AttributeKey)}
          >
            <Label htmlFor={attribute} className="capitalize">
              {React.createElement(icons[attribute])} {attribute}
            </Label>
            {method === "pointBuy" ? (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handlePointBuy(attribute as AttributeKey, false)
                  }
                  disabled={character.attributes[attribute] <= 8}
                >
                  -
                </Button>
                <div className="w-20 text-center">
                  {character.attributes[attribute]}
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({POINT_BUY_COSTS[character.attributes[attribute]] || 0}{" "}
                    points)
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handlePointBuy(attribute as AttributeKey, true)
                  }
                  disabled={
                    character.attributes[attribute] >= 15 || pointBuyTotal >= 27
                  }
                >
                  +
                </Button>
              </div>
            ) : method === "manual" ? (
              <Input
                id={attribute}
                type="number"
                min="1"
                max="20"
                value={character.attributes[attribute]}
                onChange={(e) =>
                  handleManualChange(attribute as AttributeKey, e.target.value)
                }
              />
            ) : (
              <Card
                className={`p-4 text-center ${
                  character.attributes[attribute] ? "bg-muted" : "border-dashed"
                }`}
              >
                {character.attributes[attribute] || "Drop a value here"}
              </Card>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Button onClick={onBack} variant="outline" className="w-full">
          Back
        </Button>
        <Button onClick={onNext} disabled={!isValid} className="w-full">
          Next
        </Button>
      </div>
    </div>
  );
}
