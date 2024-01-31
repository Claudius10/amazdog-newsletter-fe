import styles from "./SubjectItem.module.css";
import {Subject} from "../../../../../utils/dto/statistics";

type Props = {
    subject: string;
    onSelectedSubject: (subject: Subject) => void;
}

const SubjectItem = (props: Props) => {

    const addSubject = () => {
        props.onSelectedSubject({name: props.subject, id: undefined});
    };

    return <div className={styles.layout}>
        <p className={styles.title}>{props.subject}</p>
        <input type={"checkbox"} onClick={addSubject}/>
    </div>;
};

export default SubjectItem;