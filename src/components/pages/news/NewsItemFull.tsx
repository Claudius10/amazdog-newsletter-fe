import {useQuery} from "@tanstack/react-query";
import {NavLink, useParams} from "react-router-dom";
import {findActiveNewsById} from "../../../utils/api/news-api";
import styles from "./NewsItemFull.module.css";

const NewsItemFull = () => {
    let {id} = useParams();

    const {isError, isSuccess, isLoading, data: news} = useQuery({
        queryKey: ["active", "news", id],
        queryFn: findActiveNewsById
    });

    let content;
    if (isLoading) {
        content = <p className={styles.placeholder}>Cargando...</p>;
    } else if (isError) {
        content = <p className={styles.placeholder}>Ocurrió un error. Por favor, inténtelo más tarde.</p>;
    } else if (isSuccess) {
        content = <div className={styles.news}>

            <div className={styles.imgContainer}>
                <img src={news.mainImage} alt={""}/>
            </div>

            <div className={styles.body}>
                <p className={styles.title}>{news.title}</p>
                <div className={styles.text}>{news.text.match(/.{1,2000}(?:\s|$)/g)!.map((item, index) => <p
                    key={index}><br/>{item}</p>)}</div>
            </div>

            <div className={styles.footer}>
                <NavLink to={news.link}>Fuente</NavLink>
                <p className={styles.author}>{news.author}</p>
                <p><span className={styles.keywords}>Palabras clave:</span> {news.keywords}</p>
            </div>
        </div>;
    }

    return <div className={styles.layout}>
        {content}
    </div>;
};

export default NewsItemFull;