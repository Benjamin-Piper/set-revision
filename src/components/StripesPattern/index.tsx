type Props = {
    colour: string;
    stripesId: string;
    size: "small" | "large";
};

function StripesPattern({ colour, stripesId, size }: Props) {
    // TUTORIAL: Using an IIFE as this constant doesn't change after it's set
    // https://developer.mozilla.org/en-US/docs/Glossary/IIFE
    const { patternHeight, rectangleHeight } = (() => {
        switch (size) {
            case "small":
                return {
                    patternHeight: "4%",
                    rectangleHeight: "2%",
                };
            case "large":
                return {
                    patternHeight: "10%",
                    rectangleHeight: "5%",
                };
        }
    })();

    return (
        <defs>
            <pattern id={stripesId} height={patternHeight} width="100%">
                {/* The rectangle height must be lower than the pattern height */}
                <rect
                    fill={colour}
                    y={rectangleHeight}
                    height="50%"
                    width="100%"
                />
            </pattern>
        </defs>
    );
}

export default StripesPattern;
