import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import Main from "./Main";
import Home from "./pages/Home";
import StatisticsPage from "./pages/statistics/StatisticsPage";
import Contact from "./pages/Contact";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ActivateAccount from "./pages/auth/ActivateAccount";
import Account from "./pages/account/nav/Account";
import Profile from "./pages/account/general/Profile";
import Settings from "./pages/account/settings/Settings";
import EditorNav from "./pages/account/editor/EditorNav";
import StatisticItem from "./pages/account/editor/statistics/StatisticItem";
import NewsPage from "./pages/NewsPage";
import NewsList from "./pages/account/editor/news/NewsList";
import StatisticList from "./pages/account/editor/statistics/StatisticList";
import NewsItem from "./pages/account/editor/news/NewsItem";
import ChartsPage from "./pages/account/editor/charts/ChartsPage";

// este es el componente de Rutas en que React Router nos permite activar un componente para una ruta específica que está presente en el navegador
// por ejemplo cuando la ruta amazdog-newsletter.com/noticias está en el navegador, entonces el componente NewsList está activó (aparece en la pantalla)
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
            <Route path={"/noticias"} element={<NewsPage/>}/>
            <Route path={"/estadísticas"} element={<StatisticsPage/>}/>
            <Route path={"/contacto"} element={<Contact/>}/>
            <Route path={"/authentication"} element={<Login/>}/>
            <Route path={"/register"} element={<Register/>}/>
            <Route path={"/activate/:token"} element={<ActivateAccount/>}/>

            <Route path={"/profile"} element={<Account/>}>
                <Route index element={<Profile/>}/>
                <Route path={"settings"} element={<Settings/>}/>
            </Route>

            <Route path={"/editor"} element={<EditorNav/>}>
                <Route index element={<StatisticList/>}/>
                <Route path={"statistics"} element={<StatisticList/>}/>
                <Route path={"statistics/subject"} element={<StatisticItem/>}/>
                <Route path={"charts"} element={<ChartsPage/>}/>
                <Route path={"news"} element={<NewsList/>}/>
                <Route path={"news/:id"} element={<NewsItem/>}/>
            </Route>

        </Route>
    ));
    return router;
};

export default Routes;