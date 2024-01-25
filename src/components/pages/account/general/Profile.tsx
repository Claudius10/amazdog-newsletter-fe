import styles from "./Profile.module.css";
import ChangeUsername from "./ChangeUsername";
import ChangeEmail from "./ChangeEmail";

const Profile = () => {
    return <>
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
                    <ChangeUsername/>
                    <ChangeEmail/>
                </div>
            </div>
        </div>
    </>;
};

export default Profile;