import {useNavigate} from "react-router-dom";

const Settings = () => {
    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.clear();
        navigate("/authentication");
    };
    return <>
        <button onClick={logoutHandler}>Terminar sesión</button>
    </>;
};

export default Settings;