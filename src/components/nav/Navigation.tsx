import styles from "./Navigation.module.css";
import {NavLink} from "react-router-dom";
import MobileButton from "../layout/MobileButton";
import MenuIcon from "../../resources/Icons/menu.png";

const Navigation = () => {

    const desktop = (
        <nav className={styles.desktop}>
            <NavLink to={"/noticias"}>Noticias</NavLink>
            <NavLink to={"/estadísticas"}>Estadísticas</NavLink>
            <NavLink to={"/contacto"}>Contacto</NavLink>
        </nav>
    );

    const mobileMenuAction = () => {
    };

    const mobile = (
        <div className={styles.mobile}>
            <MobileButton
                name={"menu"}
                action={mobileMenuAction}
                icon={MenuIcon}
                height={"35px"}
                width={"35px"}
                alt={"Menu Button"}/>
        </div>
    );

    return <>
        {desktop}
        {mobile}
    </>;
};

export default Navigation;