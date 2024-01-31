import styles from "./ChartForm.module.css";
import SubjectList from "../pages/account/editor/subjects/SubjectList";
import {useForm} from "react-hook-form";
import {ChartDTO} from "../../utils/api/dtos/chart";
import {createChart} from "../../utils/api/charts-api";
import {ApiErrorDTO} from "../../utils/api/dtos/api";
import ApiError from "../layout/modal-contents/ApiError";
import {Subject} from "../../utils/dto/statistics";
import {useEffect, useState} from "react";
import useModal from "../hooks/useModal";
import Modal from "../hooks/Modal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Button} from "../layout/styled";

type Props = {
    showForm: () => void;
}

const ChartForm = (props: Props) => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const queryClient = useQueryClient();
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [subjectsLength, setSubjectsLength] = useState(0);

    const {handleSubmit, register, reset, formState: {errors, isValid}, setValue} = useForm<ChartDTO>({
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    useEffect(() => {
        reset();
    }, []);

    const formHandler = () => {
        reset();
        props.showForm();
    };

    const addChart = useMutation({
        mutationFn: createChart,
        onSuccess: async () => {
            await queryClient.refetchQueries({queryKey: ["charts"]});
            formHandler();
        },
        onError: (error: ApiErrorDTO) => {
            openModal(<ApiError errorMsg={error.errorMsg} closeModal={closeModal}/>);
        }
    });


    const onSubmitHandler = (data: ChartDTO) => {
        addChart.mutate(data);
    };

    const onSelectedSubject = (subject: Subject) => {
        const index = subjects.findIndex((item) => item.name === subject.name);

        if (index === -1) {
            subjects.push(subject);
        } else {
            subjects.splice(index, 1);
        }
        setValue("subjects", subjects);
        setSubjectsLength(subjects.length);
    };

    let isFormValid = isValid && subjectsLength > 0;

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
            <div className={styles.space}/>
            <div className={styles.input}>
                <input
                    id="title"
                    type="text"
                    placeholder={"Título, públicamente visible"}
                    {...register("title", {
                        required: {value: true, message: "El título no puede faltar"},
                        minLength: {value: 5, message: "Mínimo 5 letras"},
                        maxLength: {value: 255, message: "Máximo 255 letras"},
                    })}
                />
                <p className={styles.error}>{errors.title?.message}</p>
            </div>

            <div className={styles.input}>
                <select
                    id="type"
                    {...register("type", {
                        required: {value: true, message: "Elija una opción"},
                    })}>
                    <option value={""} hidden>Tipo</option>
                    <option value={"Bar"}>Barras verticales</option>
                    <option value={"Line"}>Líneas</option>
                    <option value={"Doughnut"}>Donut</option>
                </select>
                <p className={styles.error}>{errors.type?.message}</p>
            </div>

            <div className={styles.subjects}>
                <span className={styles.text}>Temas a representar en el gráfico: </span>
                <SubjectList onSelectedSubject={onSelectedSubject}/>
                <p className={styles.error}>{errors.subjects?.message}</p>
            </div>
            <Button type={"submit"} $margin={"0 0 1rem 0"} disabled={!isFormValid}>Finalizar</Button>
        </form>
    </>;
};

export default ChartForm;