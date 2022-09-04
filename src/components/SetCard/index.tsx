import { SetCard as SetCardType } from "@/common/types";

import BlankCard from "@/components/BlankCard";
import SetSvg from "@/components/SetSvg";

// TUTORIAL: This type intersection combines two types into one!
type Props = SetCardType & { className?: string };

function SetCard({ className, colour, count, shading, shape }: Props) {
    // TUTORIAL: Initialising an array gives it type any[] so we explicitly type it.
    // TUTORIAL: We have multiple shapes, so we remove "count" from the type.
    const svgs = Array<Omit<SetCardType, "count">>(count).fill({
        colour,
        shading,
        shape,
    });

    const cardId = `${colour}-${count}-${shading}-${shape}`;

    return (
        <BlankCard className={className}>
            {svgs.map(({ colour, shading, shape }, index) => (
                <SetSvg
                    key={index}
                    stripesId={cardId}
                    colour={colour}
                    shading={shading}
                    shape={shape}
                />
            ))}
        </BlankCard>
    );
}

export default SetCard;
