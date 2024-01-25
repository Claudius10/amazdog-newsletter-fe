import styles from "./Account.module.css";
import {NavLink, Outlet} from "react-router-dom";

const Account = () => {
    return <>
        <div className={styles.layout}>
            <nav className={styles.tabs} id={"sidebar"}>
                <ul>
                    <li>
                        <NavLink to={"/profile"} end>
                            <span className={styles.text}>Perfil</span>
                        </NavLink>
                    </li>
                    {(localStorage.getItem("USER_ROLE") === "EDITOR" || localStorage.getItem("USER_ROLE") === "ADMINISTRADOR") &&
                        <li>
                            <NavLink to={"/editor/statistics?page=1&size=5"} end>
                                <span className={styles.text}>Editor</span>
                            </NavLink>
                        </li>}
                    <li>
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