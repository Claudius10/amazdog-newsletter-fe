import styles from "./NewsList.module.css";
import {useState} from "react";
import {findAllNews} from "../../../../../utils/api/news-api";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {NewsDTO} from "../../../../../utils/api/dtos/news";
import NewsForm from "./NewsForm";
import PaginationSubject from "../statistics/PaginationSubject";
import {Button} from "../../../../layout/styled";

const NewsList = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    let pageNumber = searchParams.get("page");
    let pageSize = searchParams.get("size");
    const navigate = useNavigate();


    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const {isError, isLoading, isSuccess, data: news, refetch} = useQuery({
            queryKey: ["news", "all", pageNumber, pageSize],
            queryFn: findAllNews
        }
    );

    const goToNews = (id: number) => {
        navigate(`${id}`);
    };

    let totalPages;
    let content;
    if (isLoading) {
        content = <p className={styles.placeholder}>Cargando...</p>;
        totalPages = 0;
    } else if (isError) {
        content = <p className={styles.placeholder}>Ocurrió un error. Por favor, inténtelo más tarde.</p>;
        totalPages = 0;
    } else if (isSuccess && news.content.length === 0) {
        content = <p className={styles.placeholder}>No se encontró nada</p>;
        totalPages = 0;
    } else if (isSuccess) {
        totalPages = news.totalPages;
        content = news.content.map((news: NewsDTO) =>
            <div onClick={() => {
                goToNews(news.id);
            }} className={styles.newsItem} key={news.id}>
                <p>{news.title}</p>
            </div>);
    }

    return <div className={styles.layout}>
        <p className={styles.header}>Noticias</p>
        {content}
        <Button $height={"3rem"} $width={"7rem"} onClick={toggleForm}>Añadir</Button>
        {showForm && <NewsForm refetch={refetch} toggleForm={toggleForm}/>}
        <div className={styles.pages}>
            <PaginationSubject totalPages={totalPages} queryKey={["news", "all"]} queryFn={findAllNews}/>
        </div>
    </div>;
};

export default NewsList;