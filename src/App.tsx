import { useState } from "react";

import { createDeck, delay, randomlySelectIndex } from "@/common/helpers";
import { SetCard as SetCardType, SubmissionStatus } from "@/common/types";

import CardBuilder from "@/components/CardBuilder";
import SetCard from "@/components/SetCard";

import "./App.css";

type TwoCards = {
    firstCard: SetCardType;
    secondCard: SetCardType;
};

const initialiseCards: () => TwoCards = () => {
    const deck = createDeck();
    // TUTORIAL: No need to specify the <T>, it's inferred
    const firstCardIndex = randomlySelectIndex(deck);
    const strippedDeck = deck.filter((_, index) => index !== firstCardIndex);
    const secondCardIndex = randomlySelectIndex(strippedDeck);

    return {
        firstCard: deck[firstCardIndex],
        secondCard: deck[secondCardIndex],
    };
};

const verifySet = (
    firstCard: SetCardType,
    secondCard: SetCardType,
    submittedCard: SetCardType
    // TUTORIAL: this function marks the set as either Correct or Incorrect. No Unsubmitted needed.
): Exclude<SubmissionStatus, "Unsubmitted"> => {
    const isVerified = (["colour", "count", "shading", "shape"] as const).every(
        (eachFeature) => {
            const cardFeatures = [firstCard, secondCard, submittedCard].map(
                (card) => card[eachFeature]
            );
            const setOfCardFeatures = new Set(cardFeatures);
            const allTheSame = setOfCardFeatures.size === 1;
            const allDifferent = cardFeatures.length === setOfCardFeatures.size;
            return allTheSame || allDifferent;
        }
    );

    if (isVerified) {
        return "Correct";
    }
    return "Incorrect";
};

function App() {
    const [{ firstCard, secondCard }, setTwoCards] = useState<TwoCards>(
        initialiseCards()
    );
    const [submissionStatus, setSubmissionStatus] =
        useState<SubmissionStatus>("Unsubmitted");

    return (
        <main className="wrapper">
            <div className="card-holder">
                <SetCard
                    colour={firstCard.colour}
                    count={firstCard.count}
                    shading={firstCard.shading}
                    shape={firstCard.shape}
                />
                <SetCard
                    colour={secondCard.colour}
                    count={secondCard.count}
                    shading={secondCard.shading}
                    shape={secondCard.shape}
                />
            </div>
            <CardBuilder
                onSubmit={async (submittedCard) => {
                    const status = verifySet(
                        firstCard,
                        secondCard,
                        submittedCard
                    );
                    setSubmissionStatus(status);
                    if (status === "Correct") {
                        await delay(800);
                        setTwoCards(initialiseCards());
                        setSubmissionStatus("Unsubmitted");
                    }
                    return status;
                }}
                submissionStatus={submissionStatus}
            />
        </main>
    );
}

export default App;
