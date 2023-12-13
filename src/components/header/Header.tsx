import styles from "./Header.module.css";
import {NavLink} from "react-router-dom";
import Navigation from "../nav/Navigation";
import Icon from "../layout/Icon";
import amazdogHeaderLogo from "../../resources/Imagenes/logo.png";

const Header = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <NavLink to={"/"} className={styles.icon}>
                    <Icon src={amazdogHeaderLogo} height={"27px"} width={"auto"} alt={"Logo de Amazdog"}/>
                </NavLink>
                <Navigation/>
            </header>
        </div>
    );
};

export default Header;