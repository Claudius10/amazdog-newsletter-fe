import styles from "./ChartList.module.css";
import ChartItem from "./ChartItem";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createChart, deleteChart, findAllCharts} from "../../utils/api/charts-api";
import {useState} from "react";
import {useForm} from "react-hook-form";
import useModal from "../hooks/useModal";
import {ApiErrorDTO} from "../../utils/api/dtos/api";
import ApiError from "../layout/modal-contents/ApiError";
import Modal from "../hooks/Modal";
import {ChartDTO} from "../../utils/api/dtos/chart";
import SubjectList from "../pages/account/editor/subjects/SubjectList";
import {useNavigate} from "react-router-dom";
import {Subject} from "../../utils/dto/statistics";

const ChartList = () => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [subjectsLength, setSubjectsLength] = useState(0);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {isError, isLoading, isSuccess, data: charts} = useQuery({
            queryKey: ["charts", "to", "generate"],
            queryFn: findAllCharts
        }
    );

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

    const removeChart = useMutation({
        mutationFn: deleteChart,
        onSuccess: async () => {
            await queryClient.refetchQueries({queryKey: ["charts"]});
            reset();
            setShowForm(false);
        },
        onError: (error: ApiErrorDTO) => {
            openModal(<ApiError errorMsg={error.errorMsg} closeModal={closeModal}/>);
        }
    });

    const {handleSubmit, register, reset, formState: {errors, isValid}, setValue, getValues} = useForm<ChartDTO>({
        mode: "onBlur",
        reValidateMode: "onBlur",
    });


    const onSubmitHandler = (data: ChartDTO) => {
        addChart.mutate(data);
    };

    const removeChartHandler = (chartId: number) => {
        removeChart.mutate(chartId);
    };

    const formHandler = () => {
        reset();
        setShowForm(!showForm);
        if (!showForm) {
            navigate("?subjectsPage=1&subjectsSize=5");
        } else {
            navigate("/editor/charts");
        }
    };

    const onSelectedSubject = (subject: Subject) => {
        const index = subjects.findIndex((item) => item.name === subject.name);
        if (index !== -1) {
            subjects.splice(index, 1);
        } else {
            subjects.push(subject);
        }
        setValue("subjects", subjects);
        setSubjectsLength(subjects.length);
    };

    let isFormValid = isValid && subjectsLength > 0;

    const form = <form onSubmit={handleSubmit(onSubmitHandler)}>
        <span>Título: </span>
        <input
            id="title"
            type="text"
            placeholder={"es públicamente visible"}
            {...register("title", {
                required: {value: true, message: "El título no puede faltar"},
                minLength: {value: 5, message: "Mínimo 5 letras"},
                maxLength: {value: 255, message: "Máximo 255 letras"},
            })}
        />
        <p className={styles.error}>{errors.title?.message}</p>
        <span>Tipo: </span>
        <select
            id="type"
            {...register("type", {
                required: {value: true, message: "Elija una opción"},
            })}>
            <option hidden/>
            <option value={"Bar"}>Barras verticales</option>
            <option value={"Line"}>Líneas</option>
            <option value={"Doughnut"}>Donut</option>
        </select>
        <p className={styles.error}>{errors.type?.message}</p>
        <span>Temas: </span>
        <SubjectList onSelectedSubject={onSelectedSubject}/>
        <p className={styles.error}>{errors.subjects?.message}</p>
        <button type={"submit"} disabled={!isFormValid}>Finalizar</button>
    </form>;

    let chartsData;
    if (isLoading) {
        chartsData = <p className={styles.text}>Cargando...</p>;
    } else if (isSuccess && charts.length === 0) {
        chartsData = <p>No hay ningún gráfico almacenado</p>;
    } else if (isSuccess) {
        chartsData = charts.map((chart) => <div key={chart.id}>
            <ChartItem chart={chart} key={chart.id}/>
            <button onClick={() => removeChartHandler(chart.id)}>Eliminar</button>
        </div>);
    }

    return <div>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        <p>Gráficos</p>
        {chartsData}
        <button onClick={formHandler}>Añadir</button>
        {showForm && form}
    </div>;
};

export default ChartList;