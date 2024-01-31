import styles from "./ApiError.module.css";
import {Button} from "../styled";

type Props = {
    closeModal: () => void;
}

const DeleteConfirmModal = (props: Props) => {
    return <div className={styles.modal}>
        <p className={styles.text}>¿Desea proceder con la eliminación?</p>
        <Button onClick={props.closeModal}>Sí</Button>
    </div>;
};

export default DeleteConfirmModal;