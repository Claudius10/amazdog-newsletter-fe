import {createNews} from "../../../../../utils/api/news-api";
import {useMutation} from "@tanstack/react-query";
import {useFieldArray, useForm} from "react-hook-form";
import {NewsDTO} from "../../../../../utils/api/dtos/news";
import styles from "../../../../charts/ChartList.module.css";
import {ApiErrorDTO} from "../../../../../utils/api/dtos/api";
import ApiError from "../../../../layout/modal-contents/ApiError";
import useModal from "../../../../hooks/useModal";
import Modal from "../../../../hooks/Modal";

type Props = {
    refetch?: () => void
    toggleForm: () => void
}

const NewsForm = (props: Props) => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const {handleSubmit, register, reset, formState: {errors, isValid}, control} = useForm<NewsDTO>({
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: "images"
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

    const form = <form onSubmit={handleSubmit(onSubmitHandler)}>
        <span>Título: </span>
        <input
            id="title"
            type="text"
            {...register("title", {
                required: {value: true, message: "El título no puede faltar"},
                minLength: {value: 5, message: "Mínimo 5 letras"},
                maxLength: {value: 255, message: "Máximo 255 letras"},
            })}
        />
        <p className={styles.error}>{errors.title?.message}</p>
        <span>Autor: </span>
        <input
            id="author"
            type="text"
            {...register("author", {
                required: {value: true, message: "El autor no puede faltar"},
                minLength: {value: 5, message: "Mínimo 5 letras"},
                maxLength: {value: 255, message: "Máximo 255 letras"},
            })}
        />
        <p className={styles.error}>{errors.author?.message}</p>
        <p>Texto: </p>
        <textarea
            id="text"
            rows={10}
            cols={75}
            {...register("text", {
                required: {value: true, message: "El texto no puede faltar"},
                minLength: {value: 5, message: "Mínimo 5 letras"}
            })}
        />
        <p className={styles.error}>{errors.text?.message}</p>
        <span>Imagen principal: </span>
        <input
            id="mainImage"
            type="text"
            {...register("mainImage")}
        />
        <p className={styles.error}>{errors.mainImage?.message}</p>
        <span>Galería imágenes: </span>
        {fields.map((field, index) => {
            return (
                <div key={field.id}>
                    <span>Nombre: </span>
                    <input
                        {...register(`images.${index}.imageName` as const)}
                    />
                    <span>Enlace: </span>
                    <input
                        {...register(`images.${index}.imageLink` as const)}
                    />
                    <button type="button" onClick={() => remove(index)}>
                        Borrar
                    </button>
                </div>
            );
        })}
        <button
            type="button"
            onClick={() =>
                append({
                    imageName: "",
                    imageLink: ""
                })
            }
        >
            Añadir
        </button>
        <p className={styles.error}>{errors.images?.message}</p>
        <span>Palabras clave: </span>
        <input
            id="keywords"
            type="text"
            placeholder={"Palabras separadas por coma, ejemplo: Mascotas, Perro, Gato"}
            {...register("keywords",)}
        />
        <p className={styles.error}>{errors.keywords?.message}</p>
        <span>Enlace: </span>
        <input
            id="link"
            type="text"
            {...register("link", {
                required: {value: true, message: "El enlace no puede faltar"},
                maxLength: {value: 255, message: "Máximo 255 letras"},

            })}
        />
        <p className={styles.error}>{errors.link?.message}</p>
        <button type={"submit"} disabled={!isValid}>Finalizar</button>
    </form>;

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        {form}
    </>;
};

export default NewsForm;