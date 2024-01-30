import styles from "./Settings.module.css";
import {Button} from "../../../layout/styled";
import {useNavigate} from "react-router-dom";
import PasswordChange from "./PasswordChange";
import DeleteAccount from "./DeleteAccount";

const Settings = () => {
    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.clear();
        navigate("/authentication");
    };

    return <div className={styles.layout}>
        <Button $height={"3rem"} $width={"19rem"} onClick={logoutHandler}>Terminar sesión</Button>
        <PasswordChange/>
        <DeleteAccount/>
    </div>;
};

export default Settings;