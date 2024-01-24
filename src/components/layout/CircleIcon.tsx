import styles from "./CircleIcon.module.css";
import Icon from "./Icon";

type Props = {
    action: () => void;
    icon: string;
    height: string;
    width: string;
    alt: string;
}

const CircleIcon = (props: Props) => {
    return (
        <button
            className={styles.background}
            type="button"
            onClick={props.action}>
            <Icon src={props.icon} height={props.height} width={props.width} alt={props.alt}/>
        </button>
    );
};

export default CircleIcon;