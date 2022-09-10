import { useState } from "react";

import { chooseSvgFill } from "@/common/helpers";
import {
    Colour,
    ColourValues,
    Count,
    CountValues,
    NullableProps,
    SetCard as SetCardType,
    Shading,
    ShadingValues,
    Shape,
    ShapeValues,
    SubmissionStatus,
} from "@/common/types";

import SetSvg from "@/components/SetSvg";
import StripesPattern from "@/components/StripesPattern";

import BuildPreview from "./BuildPreview";
import styles from "./styles.module.css";

type RadioButtonProps = {
    checked: boolean;
    children: React.SVGProps<SVGSVGElement> | React.SVGProps<SVGSVGElement>[];
    className?: string;
    name: string;
    onChange: () => void;
    value: Colour | Count | Shading | Shape;
};

function RadioButton({
    checked,
    children,
    className,
    name,
    onChange,
    value,
}: RadioButtonProps) {
    return (
        <label
            className={[
                styles.radioLabel,
                checked ? styles.checked : "",
                className,
            ].join(" ")}
        >
            {/* We use a fragment as <label> expects only one child */}
            <>
                <input
                    className={styles.radioButton}
                    type="radio"
                    checked={checked}
                    name={name}
                    onChange={() => onChange()}
                    value={value}
                />
                {children}
            </>
        </label>
    );
}

type CardBuilderProps = {
    onSubmit: (card: SetCardType) => Promise<SubmissionStatus>;
    submissionStatus: SubmissionStatus;
};

function CardBuilder({ onSubmit, submissionStatus }: CardBuilderProps) {
    const initialCard: NullableProps<SetCardType> = {
        colour: null,
        count: null,
        shading: null,
        shape: null,
    };

    /*
      Why have child state? Well it's because we have a <form>
      Lifting all of this <form> state into the parent makes it messy and mixes abstractions.
      And because of that it makes sense to keep <BuildPreview> here too.
    */
    const [builtCard, setBuiltCard] =
        useState<NullableProps<SetCardType>>(initialCard);

    const isCardCompletelyBuilt = [
        builtCard.colour,
        builtCard.count,
        builtCard.shading,
        builtCard.shape,
    ].every((feature) => feature !== null);

    return (
        <>
            <div>
                <BuildPreview
                    build={
                        isCardCompletelyBuilt
                            ? (builtCard as SetCardType)
                            : null
                    }
                    submissionStatus={submissionStatus}
                />
            </div>
            <form
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault(); // prevents browser refresh

                    // <form>'s onSubmit does not expect a returned Promise
                    // So we hide our Promise in an IIFE, and return void
                    void (async () => {
                        // It's safe to assume builtCard does not have NullableProps because
                        // the Submit button is disabled until then
                        const status = await onSubmit(builtCard as SetCardType);
                        if (status === "Correct") {
                            setBuiltCard(initialCard);
                        }
                    })();
                }}
            >
                {/* The following form rows are ordered by adjective order */}
                {/* See https://www.grammarly.com/blog/adjective-order/ */}
                <div className={styles.formRow}>
                    {CountValues.map((eachCount) => {
                        const circlePlots = {
                            1: [{ cx: "50", cy: "50", r: "10" }],
                            2: [
                                { cx: "20", cy: "80", r: "10" },
                                { cx: "80", cy: "20", r: "10" },
                            ],
                            3: [
                                { cx: "20", cy: "80", r: "10" },
                                { cx: "50", cy: "50", r: "10" },
                                { cx: "80", cy: "20", r: "10" },
                            ],
                        };

                        return (
                            <RadioButton
                                key={eachCount}
                                className={styles.dieFace}
                                checked={builtCard.count === eachCount}
                                name="count"
                                onChange={() =>
                                    setBuiltCard({
                                        ...builtCard,
                                        count: eachCount,
                                    })
                                }
                                value={eachCount}
                            >
                                <svg
                                    xmlns="http://wwww.w3.org/2000/svg"
                                    viewBox="0 0 100 100"
                                >
                                    {circlePlots[eachCount].map(
                                        (eachCirclePlot) => (
                                            <circle
                                                key={`${eachCirclePlot.cx}-${eachCirclePlot.cy}-${eachCirclePlot.r}`}
                                                cx={eachCirclePlot.cx}
                                                cy={eachCirclePlot.cy}
                                                r={eachCirclePlot.r}
                                                fill="black"
                                            />
                                        )
                                    )}
                                </svg>
                            </RadioButton>
                        );
                    })}
                </div>
                <div className={styles.formRow}>
                    {ShadingValues.map((eachShading) => {
                        const colour = "black";
                        const stripesId = "circle-stripes";
                        const fill = chooseSvgFill(
                            colour,
                            eachShading,
                            stripesId
                        );
                        return (
                            <RadioButton
                                key={eachShading}
                                checked={builtCard.shading === eachShading}
                                name="shading"
                                onChange={() =>
                                    setBuiltCard({
                                        ...builtCard,
                                        shading: eachShading,
                                    })
                                }
                                value={eachShading}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 100 100"
                                >
                                    <StripesPattern
                                        colour={colour}
                                        stripesId={stripesId}
                                        size="large"
                                    />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill={fill}
                                        stroke={colour}
                                        strokeWidth="5"
                                    />
                                </svg>
                            </RadioButton>
                        );
                    })}
                </div>
                <div className={styles.formRow}>
                    {ColourValues.map((eachColour) => (
                        <RadioButton
                            key={eachColour}
                            checked={builtCard.colour === eachColour}
                            name="colour"
                            onChange={() =>
                                setBuiltCard({
                                    ...builtCard,
                                    colour: eachColour,
                                })
                            }
                            value={eachColour}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 100 100"
                            >
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="50"
                                    fill={eachColour}
                                />
                            </svg>
                        </RadioButton>
                    ))}
                </div>
                <div id={styles.shapeRow} className={styles.formRow}>
                    {ShapeValues.map((eachShape) => (
                        <RadioButton
                            key={eachShape}
                            checked={builtCard.shape === eachShape}
                            name="shape"
                            onChange={() =>
                                setBuiltCard({ ...builtCard, shape: eachShape })
                            }
                            value={eachShape}
                        >
                            <SetSvg
                                className={styles.blackAndWhite}
                                stripesId="n/a"
                                colour="Red"
                                shading="Outlined"
                                shape={eachShape}
                            />
                        </RadioButton>
                    ))}
                </div>
                <input
                    className={styles.submit}
                    type="submit"
                    disabled={
                        !isCardCompletelyBuilt || submissionStatus === "Correct"
                    }
                    value="Submit"
                />
            </form>
        </>
    );
}

export default CardBuilder;
