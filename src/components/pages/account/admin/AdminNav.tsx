import styles from "../nav/Account.module.css";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const AdminNav = () => {
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