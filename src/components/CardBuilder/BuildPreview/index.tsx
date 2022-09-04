import { SetCard as SetCardType, SubmissionStatus } from "@/common/types";

import BlankCard from "@/components/BlankCard";
import SetCard from "@/components/SetCard";

import styles from "./styles.module.css";

type Props = {
    build: SetCardType | null;
    submissionStatus: SubmissionStatus;
};

function BuildPreview({ build, submissionStatus }: Props) {
    // TUTORIAL: Using an IIFE as this constant doesn't change after it's set
    // https://developer.mozilla.org/en-US/docs/Glossary/IIFE
    const outlineClass = (() => {
        switch (submissionStatus) {
            case "Correct":
                return styles.correct;
            case "Incorrect":
                return styles.incorrect;
            case "Unsubmitted":
                return "";
        }
    })();

    if (build !== null) {
        return (
            <SetCard
                className={outlineClass}
                colour={build.colour}
                count={build.count}
                shading={build.shading}
                shape={build.shape}
            />
        );
    }
    return <BlankCard />;
}

export default BuildPreview;
