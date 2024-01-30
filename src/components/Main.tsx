import styles from "./Main.module.css";
import Footer from "./footer/Footer";
import {Outlet, ScrollRestoration} from "react-router-dom";
import useModal from "./hooks/useModal";
import Modal from "./hooks/Modal";
import {SessionExpiredModal} from "./pages/auth/SessionExpiredModal";
import Navigation from "./nav/Navigation";

const Main = () => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const logoutBc = new BroadcastChannel("session");

    logoutBc.onmessage = (message) => {
        if (message.data === "key-expired") {
            openModal(<SessionExpiredModal closeModal={closeModal}/>);
        }
    };

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        <div className={styles.layout}>
            <Navigation/>
            <Outlet/>
            <Footer/>
            <ScrollRestoration/>
        </div>
    </>;
};

export default Main;