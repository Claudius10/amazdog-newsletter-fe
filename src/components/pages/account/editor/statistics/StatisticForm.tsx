import {useForm} from "react-hook-form";
import styles from "../../general/ChangeAttribute.module.css";
import {useMutation} from "@tanstack/react-query";
import {createStatistic} from "../../../../../utils/api/statistics-api";
import {Statistic} from "../../../../../utils/dto/statistics";
import useModal from "../../../../hooks/useModal";
import {ApiErrorDTO} from "../../../../../utils/api/dtos/api";
import ApiError from "../../../../layout/modal-contents/ApiError";
import Modal from "../../../../hooks/Modal";
import {Button} from "../../../../layout/styled";

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

    const form = <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <p className={styles.attribute}>Información nuevo dato</p>

        <div className={styles.input}>
            <input
                id="subject"
                type="text"
                placeholder={"Tema/Tópico/Sujeto"}
                {...register("subject", {
                    required: {value: true, message: "El tema/tópico no puede faltar"},
                    maxLength: {value: 255, message: "Máximo 255 letras"},
                })}
            />
            <p className={styles.error}>{errors.subject?.message}</p>
        </div>

        <div className={styles.input}>
            <input
                id="label"
                type="text"
                placeholder={"Etiqueta"}
                {...register("label", {
                    required: {value: true, message: "La etiqueta no puede faltar"},
                    maxLength: {value: 255, message: "Máximo 255 letras"},
                })}
            />
            <p className={styles.error}>{errors.label?.message}</p>
        </div>

        <div className={styles.input}>
            <input
                id="value"
                type="number"
                step={0.001}
                placeholder={"Valor, % en decimales: 0.498 (49.8%)"}
                {...register("value", {
                    required: {value: true, message: "El valor no puede faltar"}
                })}
            />
            <p className={styles.error}>{errors.value?.message}</p>
        </div>

        <div className={styles.input}>
            <input
                id="date"
                type="text"
                placeholder={"Fecha en formato: dd-MM-yyyy"}
                {...register("date", {
                    required: {value: true, message: "La fecha no puede faltar"}
                })}
            />
            <p className={styles.error}>{errors.date?.message}</p>
        </div>

        <div className={styles.input}>
            <input
                id="source"
                type="text"
                placeholder={"Fuente"}
                {...register("source", {
                    required: {value: true, message: "La fuente no puede faltar"},
                    maxLength: {value: 255, message: "Máximo 255 letras"},

                })}
            />
            <p className={styles.error}>{errors.source?.message}</p>
        </div>

        <div className={styles.input}>
            <input
                id="Tags"
                type="text"
                placeholder={"Tags: Mascotas, Perro, ..."}
                {...register("tags", {
                    maxLength: {value: 255, message: "Máximo 255 letras"},

                })}
            />
            <p className={styles.error}>{errors.tags?.message}</p>
        </div>
        <Button type={"submit"} $margin={"0 0 1rem 0"} disabled={!isValid}>Finalizar</Button>
    </form>;

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        {form}
    </>;
};

export default StatisticForm;