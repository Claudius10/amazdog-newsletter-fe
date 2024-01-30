import styles from "./NewsItem.module.css";
import {NewsDTO} from "../../../utils/api/dtos/news";
import {useNavigate} from "react-router-dom";
import {Button} from "../../layout/styled";

type Props = {
    news: NewsDTO;
}

const NewsItem = (props: Props) => {
    const navigate = useNavigate();

    const readMore = (id: number) => {
        navigate(`/noticias/${id}`);
    };

    return <div className={styles.layout}>

        <div className={styles.imgContainer}>
            <img src={props.news.mainImage} alt={""}/>
        </div>

        <div className={styles.body}>
            <p className={styles.title}>{props.news.title}</p>
            <div className={styles.text}>{props.news.text}</div>
            <Button onClick={() => {
                readMore(props.news.id);
            }}>Leer más
            </Button>
        </div>
    </div>;

};

export default NewsItem;