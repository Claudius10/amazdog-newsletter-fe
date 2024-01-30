import {useNavigate} from "react-router-dom";
import styles from "../../layout/modal-contents/ModalContent.module.css";

type Props = {
    closeModal: () => void;
    errorMsg?: string;
}

export const SessionExpiredModal = (props: Props) => {
    const navigate = useNavigate();

    const redirect = () => {
        navigate("/authentication");
        props.closeModal();
    };

    const close = () => {
        navigate("/");
        props.closeModal();
    };

    const bttn = (
        <span onClick={redirect} className={styles.link}>
            aquí
        </span>
    );
    return <div className={styles.layout}>
        <p className={styles.text}>La sesión ha expirado</p>
        <p className={styles.text}>Pulse {bttn} para volver a reiniciarla</p>
        <button className={styles.button} onClick={close}>Ok</button>
    </div>;
};