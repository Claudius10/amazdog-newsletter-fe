import styles from "../statistics/Statistics.module.css";
import {findAllChartData} from "../../../utils/api/charts-api";
import {useQuery} from "@tanstack/react-query";
import GenerateChart from "../../charts/GenerateChart";

const StatisticsPage = () => {
    const {isLoading, isSuccess, isError, data: chartsData} = useQuery({
            queryKey: ["chart", "data"],
            queryFn: findAllChartData
        }
    );

    let content;
    if (isLoading) {
        content = <p className={styles.placeholder}>Cargando...</p>;
    } else if (isError) {
        content = <p className={styles.placeholder}>Ocurrió un error. Por favor, inténtelo más tarde.</p>;
    } else if (isSuccess && chartsData.length === 0) {
        content = <p className={styles.placeholder}>No se encontró nada</p>;
    } else if (isSuccess) {
        content = chartsData.map((data, index) => <div key={index}>{GenerateChart(data)}</div>);
    }

    return <div className={styles.layout}>
        <div className={styles.rows}>
            {content}
        </div>
    </div>;

};

export default StatisticsPage;