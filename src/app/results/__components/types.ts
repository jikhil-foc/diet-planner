import type { ReactNode } from "react";

export type Food = {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type DietSection = {
  food: Food;
};

export type DietKey =
  | "breakfast"
  | "midbreakfast"
  | "lunch"
  | "snacks"
  | "dinner";

export type DietData = Partial<Record<DietKey, DietSection>>;

export type Totals = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type SectionName = {
  key: DietKey;
  label: string;
  icon: ReactNode;
};
