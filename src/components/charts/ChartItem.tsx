import styles from "./ChartItem.module.css";
import {ChartDTO} from "../../utils/api/dtos/chart";

type Props = {
    chart: ChartDTO
}

const ChartItem = (props: Props) => {
    let chartType;
    switch (props.chart.type) {
        case "Bar":
            chartType = "Barras horizontales";
            break;
        case "Line":
            chartType = "Líneas";
            break;
        case "Doughnut":
            chartType = "Donut";
            break;
    }

    return <div className={styles.layout}>
        <p><span className={styles.text}>Gráfico tipo:</span> {chartType}</p>
        <p><span className={styles.text}>Título:</span> {props.chart.title}</p>
        <div className={styles.list}>
            <span className={styles.text}>Tópicos/temas:</span>
            {props.chart.subjects.map((subject) => <p key={subject.id}>{subject.name}</p>)}
        </div>
    </div>;
};

export default ChartItem;