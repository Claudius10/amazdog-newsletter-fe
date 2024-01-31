import styles from "./ChartList.module.css";
import ChartItem from "./ChartItem";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteChart, findAllCharts} from "../../utils/api/charts-api";
import {useState} from "react";
import useModal from "../hooks/useModal";
import {ApiErrorDTO} from "../../utils/api/dtos/api";
import ApiError from "../layout/modal-contents/ApiError";
import Modal from "../hooks/Modal";
import {Button} from "../layout/styled";
import ChartForm from "./ChartForm";
import {useNavigate} from "react-router-dom";

const ChartList = () => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const [showForm, setShowForm] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const formHandler = () => {
        setShowForm(!showForm);
        if (!showForm) {
            navigate("?subjectsPage=1&subjectsSize=5");
        } else {
            navigate("/editor/charts");
        }
    };

    const {isError, isLoading, isSuccess, data: charts} = useQuery({
            queryKey: ["charts", "to", "generate"],
            queryFn: findAllCharts
        }
    );

    const removeChart = useMutation({
        mutationFn: deleteChart,
        onSuccess: async () => {
            await queryClient.refetchQueries({queryKey: ["charts"]});
        },
        onError: (error: ApiErrorDTO) => {
            openModal(<ApiError errorMsg={error.errorMsg} closeModal={closeModal}/>);
        }
    });

    const removeChartHandler = (chartId: number) => {
        removeChart.mutate(chartId);
    };

    let chartsData;
    if (isLoading) {
        chartsData = <p className={styles.placeholder}>Cargando...</p>;
    } else if (isSuccess && charts.length === 0) {
        chartsData = <p className={styles.placeholder}>No hay ningún gráfico almacenado</p>;
    } else if (isError) {
        chartsData = <p className={styles.placeholder}>Ocurrió un error...</p>;
    } else if (isSuccess) {
        chartsData = charts.map((chart) => <div className={styles.itemList} key={chart.id}>
            <ChartItem chart={chart} key={chart.id}/>
            <Button onClick={() => removeChartHandler(chart.id)}>Eliminar</Button>
        </div>);
    }

    return <div className={styles.layout}>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        <p className={styles.title}>Gráficos</p>
        {chartsData}
        <Button $height={"3rem"} $width={"7rem"} onClick={formHandler}>Añadir</Button>
        {showForm && <ChartForm showForm={formHandler}/>}
    </div>;
};


export default ChartList;