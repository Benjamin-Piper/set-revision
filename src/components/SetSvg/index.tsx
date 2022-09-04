import { chooseSvgFill } from "@/common/helpers";
import {
    closePath,
    ellipticalArcCurve,
    lineTo,
    moveTo,
    quadraticBezierCurve,
    verticalLineTo,
} from "@/common/svg-path-functions";
import { Colour, Shading, Shape } from "@/common/types";

import StripesPattern from "@/components/StripesPattern";

type Props = {
    className?: string;
    colour: Colour;
    shading: Shading;
    shape: Shape;
    stripesId: string;
};

/** stripesId must be unique otherwise the stripe colour may not match */
function SetSvg({ className, colour, shading, shape, stripesId }: Props) {
    const fill = chooseSvgFill(colour, shading, stripesId);

    // TUTORIAL: Using an IIFE as this constant doesn't change after it's set
    // https://developer.mozilla.org/en-US/docs/Glossary/IIFE
    const pathDefinition = (() => {
        switch (shape) {
            case "Diamond":
                return [
                    moveTo(50, 10),
                    lineTo(95, 100),
                    lineTo(50, 190),
                    lineTo(5, 100),
                    closePath,
                ].join(" ");
            case "Pill":
                return [
                    moveTo(2.5, 50),
                    ellipticalArcCurve(47.5, 47.5, 0, true, true, 97.5, 50),
                    verticalLineTo(150),
                    ellipticalArcCurve(47.5, 47.5, 0, true, true, 2.5, 150),
                    verticalLineTo(50),
                ].join(" ");
            case "Squiggle":
                return [
                    moveTo(15, 30),
                    quadraticBezierCurve(40, 65, 20, 100),
                    quadraticBezierCurve(-12, 160, 30, 185),
                    quadraticBezierCurve(50, 195, 70, 191),
                    quadraticBezierCurve(105, 185, 85, 155),
                    quadraticBezierCurve(70, 130, 78, 110),
                    quadraticBezierCurve(112, 40, 60, 12),
                    quadraticBezierCurve(35, 0, 15, 15),
                    quadraticBezierCurve(10, 20, 15, 30),
                    closePath,
                ].join(" ");
        }
    })();

    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 200"
        >
            <StripesPattern
                colour={colour}
                stripesId={stripesId}
                size="small"
            />
            <path
                stroke={colour}
                strokeWidth="5"
                fill={fill}
                d={pathDefinition}
            />
        </svg>
    );
}

export default SetSvg;
