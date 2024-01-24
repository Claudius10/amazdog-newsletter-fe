import styles from "./ModalContent.module.css";

type Props = {
    closeModal: () => void
}

const RegisterModalContent = (props: Props) => {
    return <div className={styles.layout}>
        <p style={styles.text}>¡Cuenta registrada!</p>
        <p style={styles.text}>En breve recibirá un correo electrónico con el enlace de activación</p>
        <button type={"button"} className={styles.button} onClick={props.closeModal}>Ok</button>
    </div>;
};

export default RegisterModalContent;