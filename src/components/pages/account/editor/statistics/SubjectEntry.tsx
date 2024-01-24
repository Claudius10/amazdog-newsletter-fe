import {useNavigate} from "react-router-dom";

type Props = {
    subject: string;
}

const SubjectEntry = (props: Props) => {
    const navigate = useNavigate();

    const fetchStatistics = async () => {
        console.log(props.subject);
        navigate(`subject?name=${props.subject}&page=1&size=5`);
    };

    return <div>
        <p onClick={fetchStatistics}>{props.subject}</p>
    </div>;
};

export default SubjectEntry;