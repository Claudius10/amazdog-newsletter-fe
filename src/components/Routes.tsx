import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import Main from "./Main";
import StatisticsPage from "./pages/statistics/StatisticsPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ActivateAccount from "./pages/auth/ActivateAccount";
import Account from "./pages/account/nav/Account";
import Profile from "./pages/account/general/Profile";
import Settings from "./pages/account/settings/Settings";
import EditorNav from "./pages/account/editor/EditorNav";
import StatisticItem from "./pages/account/editor/statistics/StatisticItem";
import NewsPage from "./pages/news/NewsPage";
import NewsList from "./pages/account/editor/news/NewsList";
import StatisticList from "./pages/account/editor/statistics/StatisticList";
import NewsItem from "./pages/account/editor/news/NewsItem";
import ResetPasswordRequest from "./pages/auth/ResetPasswordRequest";
import ResetPassword from "./pages/auth/ResetPassword";
import NewsItemFull from "./pages/news/NewsItemFull";
import ChartList from "./charts/ChartList";
import AdminNav from "./pages/account/admin/AdminNav";
import Users from "./pages/account/admin/Users";

const Routes = () => {

    return createBrowserRouter(createRoutesFromElements(
        <Route path={"/"} element={<Main/>}>
            <Route index element={<NewsPage/>}/>
            <Route path={"/noticias"} element={<NewsPage/>}/>
            <Route path={"/noticias/:id"} element={<NewsItemFull/>}/>

            <Route path={"/estadísticas"} element={<StatisticsPage/>}/>
            <Route path={"/authentication"} element={<Login/>}/>
            <Route path={"/register"} element={<Register/>}/>
            <Route path={"/activate/:token"} element={<ActivateAccount/>}/>
            <Route path={"/request-password-reset"} element={<ResetPasswordRequest/>}/>
            <Route path={"/password-reset/:token"} element={<ResetPassword/>}/>

            <Route path={"/profile"} element={<Account/>}>
                <Route index element={<Profile/>}/>
                <Route path={"settings"} element={<Settings/>}/>
            </Route>

            <Route path={"/editor"} element={<EditorNav/>}>
                <Route index element={<StatisticList/>}/>
                <Route path={"statistics"} element={<StatisticList/>}/>
                <Route path={"statistics/subject"} element={<StatisticItem/>}/>
                <Route path={"charts"} element={<ChartList/>}/>
                <Route path={"news"} element={<NewsList/>}/>
                <Route path={"news/:id"} element={<NewsItem/>}/>
            </Route>

            <Route path={"/admin"} element={<AdminNav/>}>
                <Route index element={<Users/>}/>
            </Route>
        </Route>
    ));
};

export default Routes;