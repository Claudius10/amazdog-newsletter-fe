import {NavLink, Outlet} from "react-router-dom";
import styles from "../nav/Account.module.css";

const EditorNav = () => {
    return <>
        <div className={styles.layout}>
            <nav className={styles.tabs} id={"sidebar"}>
                <ul>
                    <li>
                        <NavLink to={"statistics?page=1&size=5"} end>
                            <span className={styles.text}>Estadísticos</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"charts"}>
                            <span className={styles.text}>Gráficos</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"news?page=1&size=5"}>
                            <span className={styles.text}>Noticias</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/profile"}>
                            <span className={styles.text}>Perfil</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
        <Outlet/>
    </>;
};

export default EditorNav;