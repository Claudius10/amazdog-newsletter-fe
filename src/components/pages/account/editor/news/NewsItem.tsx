import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteNewsById, findNewsById, updateState} from "../../../../../utils/api/news-api";
import {ApiErrorDTO} from "../../../../../utils/api/dtos/api";
import ApiError from "../../../../layout/modal-contents/ApiError";
import useModal from "../../../../hooks/useModal";
import Modal from "../../../../hooks/Modal";

const NewsItem = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    let {id} = useParams();
    const newsItem = useQuery({queryKey: ["newsItem", id], queryFn: findNewsById});

    const removeById = useMutation({
        mutationFn: deleteNewsById,
        onSuccess: async () => {
            await queryClient.refetchQueries({queryKey: ["news", "all"]});
            navigate(-1);
        },
        onError: (error: ApiErrorDTO) => {
            openModal(<ApiError errorMsg={error.errorMsg} closeModal={closeModal}/>);
        }
    });

    const updateStateFn = useMutation({
        mutationFn: updateState,
        onSuccess: async () => {
            await queryClient.refetchQueries({queryKey: ["news", "all"]});
            await queryClient.refetchQueries({queryKey: ["news", "active"]});
            await newsItem.refetch();
        },
        onError: (error: ApiErrorDTO) => {
            openModal(<ApiError errorMsg={error.errorMsg} closeModal={closeModal}/>);
        }
    });

    const deleteHandler = (id: number) => {
        removeById.mutate(id);
    };

    const changeState = (id: number) => {
        let state;
        if (newsItem.isSuccess && newsItem.data?.active) {
            state = false;
        } else {
            state = true;
        }
        updateStateFn.mutate({id, state});
    };

    let newsList;
    let stateBttn;
    if (newsItem.isLoading || newsItem.isFetching) {
        newsList = <p>Cargando...</p>;
    } else if (newsItem.isError) {
        newsList = <p>Ocurrió un error. Por favor, inténtelo más tarde.</p>;
    } else if (newsItem.isSuccess) {

        if (newsItem.data?.active) {
            stateBttn = "Desactivar";
        } else {
            stateBttn = "Activar";
        }

        newsList =
            <div key={newsItem.data?.id}>
                <p>Título: {newsItem.data?.title}</p>
                <p>Autor: {newsItem.data?.author}</p>
                <p>Texto: {newsItem.data?.text}</p>
                <p>Imagen principal: {newsItem.data?.mainImage}</p>
                <p>Galería imágenes:</p>
                <div>
                    {newsItem.data?.images.map((item: any, index: number) =>
                        <div key={index}>
                            <p>Nombre: {item.imageName}</p>
                            <p>Enlace: {item.imageLink}</p>
                        </div>
                    )}
                </div>
                <p>Palabras clave: {newsItem.data?.keywords}</p>
                <p>Enlace: {newsItem.data?.link}</p>
                <p>Fecha creación: {newsItem.data?.createdOn}</p>
                <p>Estado: {`${newsItem.data?.active}`}</p>
                <button onClick={() => {
                    if (newsItem.data !== undefined) {
                        changeState(newsItem.data.id);
                    }
                }}>{stateBttn}</button>
                <button onClick={() => {
                    if (newsItem.data !== undefined) {
                        deleteHandler(newsItem.data.id);
                    }
                }}>Eliminar
                </button>
            </div>;
    }

    return <div>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        {newsList}
    </div>;
};

export default NewsItem;
