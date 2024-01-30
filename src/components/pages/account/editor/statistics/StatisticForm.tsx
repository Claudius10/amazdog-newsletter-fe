import {useForm} from "react-hook-form";
import styles from "../../../../charts/ChartList.module.css";
import {useMutation} from "@tanstack/react-query";
import {createStatistic} from "../../../../../utils/api/statistics-api";
import {Statistic} from "../../../../../utils/dto/statistics";
import useModal from "../../../../hooks/useModal";
import {ApiErrorDTO} from "../../../../../utils/api/dtos/api";
import ApiError from "../../../../layout/modal-contents/ApiError";
import Modal from "../../../../hooks/Modal";

type Props = {
    refetch?: () => void
    toggleForm: () => void
}

const StatisticForm = (props: Props) => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const {handleSubmit, register, reset, formState: {errors, isValid}} = useForm<Statistic>({
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    const createStatisticHandler = useMutation({
        mutationFn: createStatistic,
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

    const onSubmitHandler = (data: Statistic) => {
        createStatisticHandler.mutate(data);
    };

    const form = <form onSubmit={handleSubmit(onSubmitHandler)}>
        <span>Tema/Tópico: </span>
        <input
            id="subject"
            type="text"
            {...register("subject", {
                required: {value: true, message: "El tema/tópico no puede faltar"},
                minLength: {value: 5, message: "Mínimo 5 letras"},
                maxLength: {value: 255, message: "Máximo 255 letras"},
            })}
        />
        <p className={styles.error}>{errors.subject?.message}</p>
        <span>Etiqueta: </span>
        <input
            id="label"
            type="text"
            {...register("label", {
                required: {value: true, message: "La etiqueta no puede faltar"},
                minLength: {value: 5, message: "Mínimo 5 letras"},
                maxLength: {value: 255, message: "Máximo 255 letras"},
            })}
        />
        <p className={styles.error}>{errors.label?.message}</p>
        <span>Valor: </span>
        <input
            id="value"
            type="number"
            step={0.01}
            {...register("value", {
                required: {value: true, message: "El valor no puede faltar"}
            })}
        />
        <p className={styles.error}>{errors.value?.message}</p>
        <span>Fecha: </span>
        <input
            id="date"
            type="text"
            {...register("date", {
                required: {value: true, message: "La fecha no puede faltar"}
            })}
        />
        <p className={styles.error}>{errors.date?.message}</p>
        <span>Fuente: </span>
        <input
            id="source"
            type="text"
            {...register("source", {
                required: {value: true, message: "La fuente no puede faltar"},
                minLength: {value: 5, message: "Mínimo 5 letras"},
                maxLength: {value: 255, message: "Máximo 255 letras"},

            })}
        />
        <p className={styles.error}>{errors.source?.message}</p>
        <span>Tags: </span>
        <input
            id="Tags"
            type="text"
            placeholder={"Palabras separadas por coma, ejemplo: Mascotas, Perro, Gato"}
            {...register("tags", {
                maxLength: {value: 255, message: "Máximo 255 letras"},

            })}
        />
        <p className={styles.error}>{errors.tags?.message}</p>
        <button type={"submit"} disabled={!isValid}>Finalizar</button>
    </form>;

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        {form}
    </>;
};

export default StatisticForm;