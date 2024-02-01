import styles from "./ModalContent.module.css";
import {useNavigate} from "react-router-dom";

type Props = {
    closeModal: () => void;
}

const RegisterModalContent = (props: Props) => {
    const navigate = useNavigate();
    const closeHandler = () => {
        props.closeModal();
        navigate("/");
    };

    return <div className={styles.layout}>
        <p className={styles.text}>¡Cuenta registrada!</p>
        <p className={styles.text}>En breve recibirá un correo electrónico con el enlace de activación</p>
        <button type={"button"} className={styles.button} onClick={closeHandler}>Ok</button>
    </div>;
};

export default RegisterModalContent;