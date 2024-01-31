import {useNavigate} from "react-router-dom";

type Props = {
    subject: string;
}

const SubjectEntry = (props: Props) => {
    const navigate = useNavigate();

    const fetchStatistics = async () => {
        navigate(`subject?name=${props.subject}&page=1&size=5`);
    };

    return <><p onClick={fetchStatistics}>{props.subject}</p></>;
};

export default SubjectEntry;