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
import UserItem from "./pages/account/admin/UserItem";
import ErrorPage from "./pages/placeholders/ErrorPage";
import NotFoundPage from "./pages/placeholders/NotFoundPage";

const Routes = () => {
    return createBrowserRouter(createRoutesFromElements(
        <Route path={"/"} element={<Main/>} errorElement={<ErrorPage/>}>
            <Route index element={<NewsPage/>} errorElement={<ErrorPage/>}/>
            <Route path={"/noticias"} element={<NewsPage/>} errorElement={<ErrorPage/>}/>
            <Route path={"/noticias/:id"} element={<NewsItemFull/>} errorElement={<ErrorPage/>}/>

            <Route path={"/estadísticas"} element={<StatisticsPage/>} errorElement={<ErrorPage/>}/>
            <Route path={"/authentication"} element={<Login/>} errorElement={<ErrorPage/>}/>
            <Route path={"/register"} element={<Register/>} errorElement={<ErrorPage/>}/>
            <Route path={"/activate/:token"} element={<ActivateAccount/>} errorElement={<ErrorPage/>}/>
            <Route path={"/request-password-reset"} element={<ResetPasswordRequest/>} errorElement={<ErrorPage/>}/>
            <Route path={"/password-reset/:token"} element={<ResetPassword/>} errorElement={<ErrorPage/>}/>

            <Route path={"/profile"} element={<Account/>} errorElement={<ErrorPage/>}>
                <Route index element={<Profile/>} errorElement={<ErrorPage/>}/>
                <Route path={"settings"} element={<Settings/>} errorElement={<ErrorPage/>}/>
            </Route>

            <Route path={"/editor"} element={<EditorNav/>} errorElement={<ErrorPage/>}>
                <Route index element={<StatisticList/>} errorElement={<ErrorPage/>}/>
                <Route path={"statistics"} element={<StatisticList/>} errorElement={<ErrorPage/>}/>
                <Route path={"statistics/subject"} element={<StatisticItem/>} errorElement={<ErrorPage/>}/>
                <Route path={"charts"} element={<ChartList/>} errorElement={<ErrorPage/>}/>
                <Route path={"news"} element={<NewsList/>} errorElement={<ErrorPage/>}/>
                <Route path={"news/:id"} element={<NewsItem/>} errorElement={<ErrorPage/>}/>
            </Route>

            <Route path={"/admin"} element={<AdminNav/>} errorElement={<ErrorPage/>}>
                <Route index element={<UserItem/>} errorElement={<ErrorPage/>}/>
            </Route>

            <Route path="*" element={<NotFoundPage/>} errorElement={<ErrorPage/>}/>
        </Route>
    ));
};

export default Routes;