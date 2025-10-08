export type TemplateType = "classic" | "modern";

export const TEMPLATES = {
  classic: {
    name: "Classic",
    description: "Clean and classic design",
  },
  modern: {
    name: "Modern",
    description: "Modern design with animations",
  },
} as const;

export const DEFAULT_TEMPLATE: TemplateType = "modern";
