import {useQuery} from "@tanstack/react-query";
import {findActiveNews} from "../../utils/api/news-api";
import {NewsDTO} from "../../utils/api/dtos/news";

const NewsPage = () => {

    const {isError, isLoading, isSuccess, data: activeNews, refetch} = useQuery({
            queryKey: ["news", "active"],
            queryFn: findActiveNews
        }
    );

    let content;
    if (isLoading) {
        content = <p>Cargando...</p>;
    } else if (isError) {
        content = <p>Ocurrió un error. Por favor, inténtelo más tarde.</p>;
    } else if (isSuccess && activeNews.length === 0) {
        content = <p>No se encontró nada</p>;
    } else if (isSuccess) {
        content = activeNews.map((news: NewsDTO) =>
            <div key={news.id}>
                <p>Título: {news.title}</p>
                <p>Autor: {news.author}</p>
                <p>Texto: {news.text}</p>
                <p>Imagen principal: {news.mainImage}</p>
                <p>Galería imágenes:</p>
                <div>
                    {news.images.map((item: any, index: number) =>
                        <div key={index}>
                            <p>Nombre: {item.imageName}</p>
                            <p>Enlace: {item.imageLink}</p>
                        </div>
                    )}
                </div>
                <p>Palabras clave: {news.keywords}</p>
                <p>Enlace: {news.link}</p>
            </div>);
    }

    return <div>
        {content}
    </div>;
};

export default NewsPage;