import styles from "./NewsPage.module.css";
import {useQuery} from "@tanstack/react-query";
import {findActiveNews} from "../../../utils/api/news-api";
import {NewsDTO} from "../../../utils/api/dtos/news";
import NewsItem from "./NewsItem";

const NewsPage = () => {

    const {isError, isLoading, isSuccess, data: activeNews} = useQuery({
            queryKey: ["news", "active"],
            queryFn: findActiveNews
        }
    );

    let content;
    if (isLoading) {
        content = <p className={styles.placeholder}>Cargando...</p>;
    } else if (isError) {
        content = <p className={styles.placeholder}>Ocurrió un error. Por favor, inténtelo más tarde.</p>;
    } else if (isSuccess && activeNews.length === 0) {
        content = <p className={styles.placeholder}>No se encontró nada</p>;
    } else if (isSuccess) {
        content = activeNews.map((news: NewsDTO) =>
            <NewsItem news={news} key={news.id}/>
        );
    }

    return <ul className={styles.layout}>
        <div className={styles.rows}>
            {content}
        </div>
    </ul>;
};

export default NewsPage;