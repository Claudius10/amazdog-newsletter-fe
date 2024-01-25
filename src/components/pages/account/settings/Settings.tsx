import {useNavigate} from "react-router-dom";
import PasswordChange from "./PasswordChange";
import DeleteAccount from "./DeleteAccount";

const Settings = () => {
    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.clear();
        navigate("/authentication");
    };

    return <>
        <button onClick={logoutHandler}>Terminar sesión</button>
        <PasswordChange/>
        <DeleteAccount/>
    </>;
};

export default Settings;