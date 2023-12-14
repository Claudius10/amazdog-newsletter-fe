import styles from "./Main.module.css";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import {Outlet, ScrollRestoration} from "react-router-dom";

const Main = () => {

    return <>
        <div className={styles.layout}>

            <Header/>

            {/* el componente Outlet es un componente especial de React Router
             y digamos que es un placeholder o un portal en donde se cargaran otros componentes
             por ejemplo: cuando la ruta amazdog-newsletter.com/noticias está activa entonces Outlet es sustituido
             por el componente News
            */}
            <Outlet/>

            <Footer/>

            {/* ScrollRestoration es otro componente especial de React router que simplemente
             se asegura de cargar cada componente desde arriba, es decir, si hacemos scroll hasta el final de la página
             de un componente, cuando abrimos otra ruta y otro componente empezamos desde el inicio de la página no de donde lo hemos dejado
             */}
            <ScrollRestoration/>
        </div>
    </>;
};

export default Main;