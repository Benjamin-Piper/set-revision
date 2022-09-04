import {
    ColourValues,
    CountValues,
    SetCard,
    Shading,
    ShadingValues,
    ShapeValues,
} from "./types";

export const createDeck: () => SetCard[] = () => {
    const deck = [];
    for (const colour of ColourValues) {
        for (const count of CountValues) {
            for (const shading of ShadingValues) {
                for (const shape of ShapeValues) {
                    deck.push({ colour, count, shading, shape });
                }
            }
        }
    }
    return deck;
};

export const chooseSvgFill = (
    colour: string,
    shading: Shading,
    stripesId: string
) => {
    switch (shading) {
        case "Solid":
            return colour;
        case "Striped":
            return `url(#${stripesId})`;
        case "Outlined":
            return "None";
    }
};

export const delay = (milliseconds: number) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

export const randomlySelectIndex = <T>(array: T[]) => {
    return Math.floor(Math.random() * array.length);
};
