import styles from "./MobileButton.module.css";
import Icon from "../Icon";

type Props = {
    name: string;
    action: () => void;
    icon: string;
    height: string;
    width: string;
    alt: string;
}

const MobileButton = (props: Props) => {
    return <button
        type="button"
        className={styles.button}
        onClick={props.action}>
        <Icon src={props.icon} height={props.height} width={props.width} alt={props.alt}/>
    </button>;
};

export default MobileButton;