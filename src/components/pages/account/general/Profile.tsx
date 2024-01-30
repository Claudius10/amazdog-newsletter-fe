import styles from "./Profile.module.css";
import ChangeUsername from "./ChangeUsername";
import ChangeEmail from "./ChangeEmail";

const Profile = () => {
    return <div className={styles.layout}>
        <div className={styles.info}>
            <ChangeUsername username={localStorage.getItem("USER_NAME")}/>
        </div>

        <div className={styles.info}>
            <ChangeEmail email={localStorage.getItem("USER_EMAIL")}/>
        </div>
    </div>;
};

export default Profile;