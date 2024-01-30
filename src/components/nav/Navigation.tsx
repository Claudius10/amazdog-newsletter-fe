import styles from "./Navigation.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import MobileButton from "../layout/MobileButton/MobileButton";
import MenuIcon from "../../resources/Icons/menu.png";
import loginIcon from "../../resources/Icons/login.png";
import loggedInIcon from "../../resources/Icons/loggedin.png";
import {useState} from "react";
import Icon from "../layout/Icon";
import amazdogHeaderLogo from "../../resources/Imagenes/logo.png";

const Navigation = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const mobileMenuAction = () => {
        setShowDropdown(!showDropdown);
    };

    let accountIcon;
    if (localStorage.getItem("ACCESS_TOKEN") !== null) {
        accountIcon = loggedInIcon;
    } else {
        accountIcon = loginIcon;
    }

    const authNavigate = () => {
        if (localStorage.getItem("ACCESS_TOKEN") !== null) {
            navigate("/profile");
        } else {
            navigate("/authentication");
        }
    };

    const desktop = (
        <nav className={styles.desktop}>
            <NavLink to={"/noticias"}>Noticias</NavLink>
            <NavLink to={"/estadísticas"}>Estadísticas</NavLink>
            <MobileButton
                name={"account-or-auth-navigation-button"}
                action={authNavigate}
                icon={accountIcon}
                height={"32px"}
                width={"auto"}
                alt={"Navigate to login page or profile page"}/>
        </nav>
    );

    const mobileMenuDropdown = <div
        className={showDropdown ? styles.mobileMenuDropdownOn : styles.mobileMenuDropdownOff}>
        <NavLink to={"/noticias"} onClick={mobileMenuAction}>Noticias</NavLink>
        <NavLink to={"/estadísticas"} onClick={mobileMenuAction}>Estadísticas</NavLink>
        <NavLink to={"/profile"} onClick={mobileMenuAction}>Cuenta</NavLink>
    </div>;

    const mobile = (
        <div className={showDropdown ? styles.mobileOn : styles.mobileOff}>
            <MobileButton
                name={"menu"}
                action={mobileMenuAction}
                icon={MenuIcon}
                height={"35px"}
                width={"35px"}
                alt={"Menu Button"}/>
            {mobileMenuDropdown}
        </div>
    );

    return <div className={styles.layout}>
        <div className={styles.container}>
            <NavLink to={"/"} onClick={() => {
                if (showDropdown) {
                    setShowDropdown(false);
                }
            }} className={styles.icon}>
                <Icon src={amazdogHeaderLogo} height={"27px"} width={"auto"} alt={"Logo de Amazdog"}/>
            </NavLink>
            {desktop}
            {mobile}
        </div>
    </div>;
};

export default Navigation;