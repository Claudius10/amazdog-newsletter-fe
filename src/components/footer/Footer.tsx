import styles from "./Footer.module.css";
import {NavLink} from "react-router-dom";

const Footer = () => {
    const link = <NavLink to={"https://amazdog.com/"}>AMAZDOG UNIVERSAL SL.</NavLink>;

    return <div className={styles.layout}>
        <div className={styles.container}>

            <div className={styles.info}>
                <div className={styles.column}>
                    <p className={styles.header}>APP</p>
                    <NavLink to={"http://app.amazdog.com/"}>Descargar APP</NavLink>
                </div>

                <div className={styles.column}>
                    <p className={styles.header}>Seguros Amazdog</p>
                    <NavLink to={"https://seguros.amazdog.com/"}>Modalidad Básica</NavLink>
                    <NavLink to={"https://seguros.amazdog.com/"}>Modalidad Completa</NavLink>
                </div>

                <div className={styles.column}>
                    <p className={styles.header}>Social</p>
                    <NavLink to={"https://www.instagram.com/_amazdog/"}>Instagram</NavLink>
                    <NavLink to={"https://www.facebook.com/Amazdog-1295832217257422/"}>Facebook</NavLink>
                    <NavLink to={"https://twitter.com/amazdog"}>X</NavLink>
                </div>

                <div className={styles.column}>
                    <p className={styles.header}>Compañía</p>
                    <NavLink to={"https://amazdog.com/index.php/sobre-nosotros/"}>Sobre nosotros</NavLink>
                    <NavLink to={"https://amazdog.com/index.php/contacto/"}>Contacto</NavLink>
                    <NavLink to={"https://amazdog.com/"}>Página principal</NavLink>
                </div>
            </div>

            <p className={styles.text}>Copyright © {link} Todos los derechos reservados.</p>
        </div>
    </div>;
};

export default Footer;