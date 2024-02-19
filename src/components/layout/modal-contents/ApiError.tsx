import styles from "./ApiError.module.css";
import {Button} from "../styled";

type Props = {
    closeModal: () => void;
    errorMsg?: string[] | string;
}

const ApiError = (props: Props) => {
    let message;
    if (props.errorMsg === undefined) {
        message = (
            <p className={styles.text}>
                Ocurrió un error. Por favor inténtelo más tarde o contacte con nosotros.
            </p>
        );
    } else {
        if (typeof props.errorMsg === "string") {
            message = <p className={styles.text}>{props.errorMsg}</p>;
        } else {
            message = props.errorMsg.map(message => <p className={styles.text}>{message}</p>);
        }
    }

    return <div className={styles.modal}>
        {message}
        <Button onClick={props.closeModal}>Ok</Button>
    </div>;
};

export default ApiError;