import {createNews} from "../../../../../utils/api/news-api";
import {useMutation} from "@tanstack/react-query";
import {useForm} from "react-hook-form";
import {NewsDTO} from "../../../../../utils/api/dtos/news";
import styles from "./NewsForm.module.css";
import {ApiErrorDTO} from "../../../../../utils/api/dtos/api";
import ApiError from "../../../../layout/modal-contents/ApiError";
import useModal from "../../../../hooks/useModal";
import Modal from "../../../../hooks/Modal";
import {Button} from "../../../../layout/styled";

type Props = {
    refetch?: () => void
    toggleForm: () => void
}

const NewsForm = (props: Props) => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const {handleSubmit, register, reset, formState: {errors, isValid}} = useForm<NewsDTO>({
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    const createNewsHandler = useMutation({
        mutationFn: createNews,
        onSuccess: async () => {
            if (props.refetch) {
                await props.refetch();
            }
            reset();
            props.toggleForm();
        },
        onError: (error: ApiErrorDTO) => {
            openModal(<ApiError errorMsg={error.errorMsg} closeModal={closeModal}/>);
        }
    });

    const onSubmitHandler = (data: NewsDTO) => {
        createNewsHandler.mutate(data);
    };

    const form = <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <div className={styles.space}/>
        <div className={styles.input}>
            <input
                id="title"
                type="text"
                placeholder={"Título"}
                {...register("title", {
                    required: {value: true, message: "El título no puede faltar"},
                    minLength: {value: 5, message: "Mínimo 5 letras"},
                    maxLength: {value: 255, message: "Máximo 255 letras"},
                })}
            />
            <p className={styles.error}>{errors.title?.message}</p>
        </div>

        <div className={styles.input}>
            <input
                id="author"
                type="text"
                placeholder={"Autor"}
                {...register("author", {
                    required: {value: true, message: "El autor no puede faltar"},
                    minLength: {value: 5, message: "Mínimo 5 letras"},
                    maxLength: {value: 255, message: "Máximo 255 letras"},
                })}
            />
            <p className={styles.error}>{errors.author?.message}</p>
        </div>

        <div className={styles.content}>
        <textarea
            id="text"
            rows={10}
            cols={75}
            placeholder={"Texto de la noticia"}
            {...register("text", {
                required: {value: true, message: "El texto no puede faltar"},
                minLength: {value: 5, message: "Mínimo 5 letras"}
            })}
        />
            <p className={styles.error}>{errors.text?.message}</p>
        </div>

        <div className={styles.input}>
            <input
                id="mainImage"
                type="text"
                placeholder={"Enlace de la imagen"}
                {...register("mainImage", {
                    required: {value: true, message: "El enlace no puede faltar"}
                })}
            />
            <p className={styles.error}>{errors.mainImage?.message}</p>
        </div>

        <div className={styles.input}>
            <input
                id="keywords"
                type="text"
                placeholder={"Palabras clave: Mascotas, Perro, Gato"}
                {...register("keywords",)}
            />
            <p className={styles.error}>{errors.keywords?.message}</p>
        </div>

        <div className={styles.input}>
            <input
                id="link"
                type="text"
                placeholder={"Enlace de la fuente"}
                {...register("link", {
                    required: {value: true, message: "El enlace no puede faltar"},
                    maxLength: {value: 255, message: "Máximo 255 letras"},

                })}
            />
            <p className={styles.error}>{errors.link?.message}</p>
        </div>
        <Button type={"submit"} $margin={"1rem 0 1rem 0"} disabled={!isValid}>Finalizar</Button>
    </form>;

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        {form}
    </>;
};

export default NewsForm;