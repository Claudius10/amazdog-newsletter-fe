import {useNavigate} from "react-router-dom";

type Props = {
    id: number;
    title: string;
    active: boolean;
}

const NewsEntry = (props: Props) => {
    const navigate = useNavigate();

    const goToNews = async () => {
        navigate(`${props.id}`);
    };


    return <div>
        <p onClick={goToNews}>{props.title} <span>Estado: {`${props.active}`}</span></p>
    </div>;
};

export default NewsEntry;