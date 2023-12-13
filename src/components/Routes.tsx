import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import Main from "./Main";
import Home from "./pages/Home";
import News from "./pages/News";
import Statistics from "./pages/statistics/Statistics";
import Contact from "./pages/Contact";

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