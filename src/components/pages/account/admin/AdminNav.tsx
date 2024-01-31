import styles from "../nav/Account.module.css";
import {NavLink, Outlet} from "react-router-dom";

const AdminNav = () => {

    return <>
        <div className={styles.layout}>
            <nav className={styles.tabs} id={"sidebar"}>
                <ul className={styles.list}>
                    <li className={styles.item}>
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

export default AdminNav;