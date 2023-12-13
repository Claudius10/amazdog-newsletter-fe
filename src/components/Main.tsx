import styles from "./Main.module.css";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import {Outlet, ScrollRestoration} from "react-router-dom";

const Main = () => {

    return <>
        <div className={styles.layout}>
            <Header/>
            <Outlet/>
            <Footer/>
            <ScrollRestoration/>
        </div>
    </>;
};

export default Main;