import styles from "./Profile.module.css";
import useModal from "../../../hooks/useModal";
import Modal from "../../../hooks/Modal";

const Profile = () => {
    const {isModalOpen, modalContent, openModal, closeModal} = useModal();
    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        <div className={styles.layout}>
            <div className={styles.container}>
                <div className={styles.info}>
                    <div className={styles.field}>
                        <p className={styles.text}>Nombre: <span
                            className={styles.value}>{localStorage.getItem("USER_NAME")}</span></p>
                    </div>

                    <div className={styles.field}>
                        <p className={styles.text}>Email: <span
                            className={styles.value}>{localStorage.getItem("USER_EMAIL")}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default Profile;