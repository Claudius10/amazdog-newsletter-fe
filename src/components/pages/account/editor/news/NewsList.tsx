import {useState} from "react";
import {findAllNews} from "../../../../../utils/api/news-api";
import {useSearchParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import {NewsDTO} from "../../../../../utils/api/dtos/news";
import NewsForm from "./NewsForm";
import PaginationSubject from "../subjects/PaginationSubject";
import NewsEntry from "./NewsEntry";

const NewsList = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    let pageNumber = searchParams.get("page");
    let pageSize = searchParams.get("size");

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const {isError, isLoading, isSuccess, data: news, refetch} = useQuery({
            queryKey: ["news", "all", pageNumber, pageSize],
            queryFn: findAllNews
        }
    );

    const removeNews = useMutation({});

    const onDeleteConfirm = (id: number) => {
    };

    let totalPages;
    let content;
    if (isLoading) {
        content = <p>Cargando...</p>;
        totalPages = 0;
    } else if (isError) {
        content = <p>Ocurrió un error. Por favor, inténtelo más tarde.</p>;
        totalPages = 0;
    } else if (isSuccess && news.content.length === 0) {
        content = <p>No se encontró nada</p>;
        totalPages = 0;
    } else if (isSuccess) {
        totalPages = news.totalPages;
        content = news.content.map((news: NewsDTO) =>
            <div key={news.id}>
                <NewsEntry id={news.id} title={news.title} active={news.active}/>
                <button onClick={() => {
                    onDeleteConfirm(news.id);
                }}>Eliminar
                </button>
            </div>);
    }

    return <div>
        Lista de noticias
        {content}
        <button onClick={toggleForm}>Añadir</button>
        {showForm && <NewsForm refetch={refetch} toggleForm={toggleForm}/>}
        <p>Noticias a generar</p>
        <PaginationSubject totalPages={totalPages} queryKey={["news", "all"]} queryFn={findAllNews}/>
    </div>;
};

export default NewsList;