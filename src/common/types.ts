// TUTORIAL: `as const` assigns the literal type instead of general ones like string[] or number[]

export const ColourValues = ["Red", "Green", "Purple"] as const;
export const CountValues = [1, 2, 3] as const;
export const ShadingValues = ["Solid", "Striped", "Outlined"] as const;
export const ShapeValues = ["Diamond", "Pill", "Squiggle"] as const;

// TUTORIAL: `typeof` gets the array type, `[number]` gets the type union

export type Colour = typeof ColourValues[number];
export type Count = typeof CountValues[number];
export type Shading = typeof ShadingValues[number];
export type Shape = typeof ShapeValues[number];

// TUTORIAL: For each key K in object of type T, the type of T[K] is itself or null
// From https://typeofnan.dev/making-every-object-property-nullable-in-typescript
export type NullableProps<T> = { [K in keyof T]: T[K] | null };

export type SetCard = {
    colour: Colour;
    count: Count;
    shading: Shading;
    shape: Shape;
};

// TUTORIAL: Union types work like mathematical sets, they only accept known values
export type SubmissionStatus = "Correct" | "Incorrect" | "Unsubmitted";
