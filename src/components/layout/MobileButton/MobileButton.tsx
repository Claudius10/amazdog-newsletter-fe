import styles from "./MobileButton.module.css";
// el CSS en React funciona de la siguiente manera: se crea un fichero llamado NombreDelComponente.module.css
// en este caso, en la carpeta MobileButton hay 2 ficheros, el MobileButton.tsx que es este fichero que contiene el componente
// y el fichero MobileButton.module.css que contiene las reglas de css de este componente en concreto
// luego se importa dicho fichero mediante la palabra clave import y con el nombre de variable "styles" como arriba
// todos los elementos de html tienen un attributo llamado className mediante el cual vinculamos la regla css y el elemento html
// abajo en el componente button tengo className={styles.button}, donde dentro de los {} del attributo className
// puedo acceder a las reglas de css mediante la variables styles

// el importe de abajo es como se importa un componente en otro componente para usarlo
import Icon from "../Icon";

// Los componentes son funciones de javascript que retornan un elemento html
// componentes que no retornan un elemento html son llamados hooks (tema avanzado)
// Este es un componente muy normal que retorna ("return") un elemento html, un button en este caso
// los componentes, como son funciones, también pueden aceptar parameters de entrada
// en React, los parametros o arguments de un componente les llamamos "props", corto de propiedades
// cuando usamos un componente que require props, estas se configuran como se configuran los atributos de un elemento html
// mira en el componente Navigation como están configurados los props de este componente

type Props = {
    name: string;
    // acción cuando se pulsa el botón, que es una función
    action: () => void;
    icon: string;
    height: string;
    width: string;
    alt: string;
}

// con la palabra clave "type" y un nombre a nuestra elección podemos definir la forma de un objeto
// los tipos primitivos de javascript son string, number, boolean, undefined, null y los de java pues más (String, int, double, float, boolean, etc.)
// con typescript podemos crear nuestros propios typos, arriba he creado el tipo "Props", que es la forma que toma el objeto que constituye
// los parametros de este componente
// el componente MobileButton representa un botón con icono utilizado en pantallas de móviles y cuando se pulsa hace una acción a nuestra elección
// abrir una ventana, navegar a otra página, etc.
// este componente yo lo usé en el componente Navigation

const MobileButton = (props: Props) => {
    return <button
        type="button"
        className={styles.button}
        onClick={props.action}>
        <Icon src={props.icon} height={props.height} width={props.width} alt={props.alt}/>
    </button>;
};

export default MobileButton;