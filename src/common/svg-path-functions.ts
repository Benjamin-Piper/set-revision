/*
  This file exports constants and functions that mkae SVG paths more readable.
  The capital letter commands are used, which use absolute coordinates.
*/

export const closePath = "Z";

/**
 * Moves the current point to coordinates x, y.
 */
export const moveTo = (x: number, y: number) => ["M", x, y].join(" ");

/**
 * Draws a line to coordinates x, y.
 */
export const lineTo = (x: number, y: number) => ["L", x, y].join(" ");

/**
 * Draws a vertical line to coordinates y.
 */
export const verticalLineTo = (y: number) => `V ${y}`;

/**
 * Draws a quadratic bézier curve to coordinates endX, endY.
 * The control coordinates define the strength and coordinates of the vertex.
 * @param controlX
 * @param controlY
 * @param endX
 * @param endY
 */
export const quadraticBezierCurve = (
    controlX: number,
    controlY: number,
    endX: number,
    endY: number
) => {
    const controlCoordinates = [controlX, controlY].join(",");
    const endCoordinates = [endX, endY].join(",");
    return `Q ${controlCoordinates} ${endCoordinates}`;
};

/**
 * Draws an elliptical arc curve to coordinates endX, endY.
 * @param radiusX radius along x-axis
 * @param radiusY radius along y-axis
 * @param angle rotation in degrees of ellipse relative to x-axis
 * @param isLargeArc if true then the curve takes the longer route
 * @param isSweep determines the orientation of the curve
 * @param endX
 * @param endY
 * @returns
 */
export const ellipticalArcCurve = (
    radiusX: number,
    radiusY: number,
    angle: number,
    isLargeArc: boolean,
    isSweep: boolean,
    endX: number,
    endY: number
) => {
    const booleanToFlag = (b: boolean) => (b ? "1" : "0");

    const radii = [radiusX, radiusY].join(",");
    const options = [
        angle,
        booleanToFlag(isLargeArc),
        booleanToFlag(isSweep),
    ].join(",");
    const endCoordinates = [endX, endY].join(",");
    return `A ${radii} ${options} ${endCoordinates}`;
};
