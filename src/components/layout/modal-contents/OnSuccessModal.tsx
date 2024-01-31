import {useNavigate} from "react-router-dom";
import styles from "./OnSuccessModal.module.css";

type Props = {
    closeModal: () => void;
    extraAction?: () => void;
    text: string;
    redirect: boolean;
}

const OnSuccessModal = (props: Props) => {
    const navigate = useNavigate();

    const handler = () => {
        props.closeModal();

        if (props.extraAction) {
            props.extraAction();
        }

        if (props.redirect) {
            navigate("/");
        }
    };

    return <div className={styles.layout}>
        <p className={styles.text}>{props.text}</p>
        <button type={"button"} className={styles.button} onClick={handler}>Ok</button>
    </div>;
};

export default OnSuccessModal;