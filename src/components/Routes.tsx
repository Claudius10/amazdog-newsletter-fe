import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import Main from "./Main";
import Home from "./pages/Home";
import News from "./pages/News";
import Statistics from "./pages/statistics/Statistics";
import Contact from "./pages/Contact";

// este es el componente de Rutas en que React Router nos permite activar un componente para una ruta específica que está presente en el navegador
// por ejemplo cuando la ruta amazdog-newsletter.com/noticias está en el navegador, entonces el componente News está activó (aparece en la pantalla)
// y así sucesivamente con las demás rutas abajo
// la ruta "/" representa a amazdog-newsletter.com tal cual y cuando está activa (cuando se abre la app)
// se activa el componente Main y es el que siempre está activo en la pantalla, porque en verdad es el contenedor de todas las demás rutas y los componentes que cargan en esas rutas
// en lugar de poner los componentes header y footer en todos los componentes individuales, los ponemos en uno y los demás componentes
// cargan/aparecen como hijo de Main y tendrán también el header y el footer

const Routes = () => {

    const router = createBrowserRouter(createRoutesFromElements(
        // ruta principal “main” que servirá como contenedor de las demás rutas
        <Route path={"/"} element={<Main/>}>
            {/* index element = componente que carga por defecto cuando la ruta “/” está activa  */}
            <Route index element={<Home/>}/>

            {/* sub-rutas */}
            <Route path={"/noticias"} element={<News/>}/>
            <Route path={"/estadísticas"} element={<Statistics/>}/>
            <Route path={"/contacto"} element={<Contact/>}/>
        </Route>
    ));
    return router;
};

export default Routes;