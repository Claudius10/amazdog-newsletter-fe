import styles from "./Navigation.module.css";
import {NavLink} from "react-router-dom";
import MobileButton from "../layout/MobileButton/MobileButton";
import MenuIcon from "../../resources/Icons/menu.png";


// el componente Navigation está usado dentro del componente Header
// y representa la navigación tanto en desktop como en dispositivos móviles para cambiar de componentes
// no le hace falta props

const Navigation = () => {

    // la variable declarada con const (constant "constante", las variables en javascript pueden set declaradas con let o const,
    // si son const no pueden ser reasignadas otro valor a partir de su valor inicial)
    // desktop contiene el elemento html nav que tiene la barra de navegación para pantalla desktop
    // el componente NavLink es un componente anchor (<a>) especial que viene dado por React Router que permite
    // cambiar la ruta de la aplicación, por ejemplo cuando se hace click en Noticias
    // la ruta de la aplicación será amazdog-newsletter.com/noticias
    // cuando se hace click en estadísticas será amazdog-newsletter.com/estadísticas etc.
    // la ruta por defecto cuando carga la página será simplemente amazdog-newsletter.com
    const desktop = (
        <nav className={styles.desktop}>
            <NavLink to={"/noticias"}>Noticias</NavLink>
            <NavLink to={"/estadísticas"}>Estadísticas</NavLink>
            <NavLink to={"/contacto"}>Contacto</NavLink>
        </nav>
    );

    const mobileMenuAction = () => {
    };

    // la variable mobile representa el botón que aparece en pantallas móviles con un icono de menu
    // la función de arriba (vacía de momento) representará la acción que se ejecutará cuando se pulsa el botón
    const mobile = (
        <div className={styles.mobile}>
            {/* abajo los props del componente MobileButton se configuran como si fueran atributos de un elemento html */}
            <MobileButton
                name={"menu"}
                action={mobileMenuAction}
                icon={MenuIcon}
                height={"35px"}
                width={"35px"}
                alt={"Menu Button"}/>
        </div>
    );

    // en react también podemos devolver o retornar una o varias variables que contienen html
    return <>
        {desktop}
        {mobile}
    </>;
};

export default Navigation;