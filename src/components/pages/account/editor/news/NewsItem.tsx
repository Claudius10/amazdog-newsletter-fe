import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteNewsById, findNewsById, updateState} from "../../../../../utils/api/news-api";
import {ApiErrorDTO} from "../../../../../utils/api/dtos/api";
import ApiError from "../../../../layout/modal-contents/ApiError";
import useModal from "../../../../hooks/useModal";
import Modal from "../../../../hooks/Modal";
import styles from "./NewsItem.module.css";
import {Button} from "../../../../layout/styled";

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

    let item;
    if (newsItem.isLoading || newsItem.isFetching) {
        item = <p className={styles.placeholder}>Cargando...</p>;
    } else if (newsItem.isError) {
        item = <p className={styles.placeholder}>Ocurrió un error. Por favor, inténtelo más tarde.</p>;
    } else if (newsItem.isSuccess && newsItem.data !== undefined) {
        let stateBttn;

        if (newsItem.data.active) {
            stateBttn = "Desactivar";
        } else {
            stateBttn = "Activar";
        }

        item = <div className={styles.news}>
            <div className={styles.actions}>
                <Button onClick={() => {
                    if (newsItem.data !== undefined) {
                        changeState(newsItem.data.id);
                    }
                }}>
                    {stateBttn}
                </Button>
                <Button onClick={() => {
                    if (newsItem.data !== undefined) {
                        deleteHandler(newsItem.data.id);
                    }
                }}>
                    Eliminar
                </Button>
            </div>

            <div className={styles.imgContainer}>
                <img src={newsItem.data.mainImage} alt={""}/>
            </div>

            <div className={styles.body}>
                <p className={styles.title}>{newsItem.data.title}</p>
                <div className={styles.text}>{newsItem.data.text.match(/.{1,2000}(?:\s|$)/g)!.map((item, index) => <p
                    key={index}><br/>{item}</p>)}</div>
            </div>

            <div className={styles.footer}>
                <NavLink to={newsItem.data.link}>Fuente</NavLink>
                <p className={styles.author}>{newsItem.data.author}</p>
                <p><span className={styles.keywords}>Palabras clave:</span> {newsItem.data.keywords}</p>
            </div>
        </div>;
    }

    return <div className={styles.layout}>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        {item}
    </div>;
};

export default NewsItem;
