import styles from "./Account.module.css";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Account = () => {
    const isLoggedIn = localStorage.getItem("ACCESS_TOKEN") !== null;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/authentication");
        }
    }, [isLoggedIn, navigate]);

    return <>
        <div className={styles.layout}>
            <nav className={styles.tabs} id={"sidebar"}>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <NavLink to={"/profile"} end>
                            <span className={styles.text}>Perfil</span>
                        </NavLink>
                    </li>

                    {(localStorage.getItem("USER_ROLE") === "EDITOR" || localStorage.getItem("USER_ROLE") === "ADMINISTRADOR") &&
                        <li className={styles.item}>
                            <NavLink to={"/editor/statistics?page=1&size=5"} end>
                                <span className={styles.text}>Editor</span>
                            </NavLink>
                        </li>}

                    <li className={styles.item}>
                        <NavLink to={"settings"}>
                            <span className={styles.text}>Configuración</span>
                        </NavLink>
                    </li>

                </ul>
            </nav>
        </div>
        <Outlet/>
    </>;
};

export default Account;