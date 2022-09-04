import styles from "./styles.module.css";

type Props = {
    className?: string;
    children?: JSX.Element | JSX.Element[];
};

function BlankCard({ className, children }: Props) {
    return (
        <div className={`${styles.blankCard} ${className ?? ""}`}>
            {children}
        </div>
    );
}

export default BlankCard;
