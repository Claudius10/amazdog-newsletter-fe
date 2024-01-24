import {SubjectDTO} from "../../../../../utils/api/dtos/chart";

type Props = {
    subject: string;
    onSelectedSubject: (subject: SubjectDTO) => void;
}

const SubjectItem = (props: Props) => {

    const addSubject = () => {
        props.onSelectedSubject({name: props.subject, id: undefined});
    };

    return <div>
        {props.subject}
        <input type={"checkbox"} onClick={addSubject}/>
    </div>;
};

export default SubjectItem;