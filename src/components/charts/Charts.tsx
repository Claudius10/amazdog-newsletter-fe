import styles from "./Charts.module.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Bar} from 'react-chartjs-2';
import {NavLink} from "react-router-dom";
import {Dataset, Statistic} from "../../utils/types";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

type Props = {
    data: Statistic[],
    dataset: Dataset[]
    source: string;
}

export const BarChart = (props: Props) => {

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            datalabels: {
                formatter: function (statistic: Statistic) {
                    return statistic.value;
                },
                color: 'black',
                align: 'top' as const,
                anchor: 'end' as const,
                font: {
                    weight: 600,
                },
            }
        },
        locale: 'es-ES',
        scales: {
            x: {},
            y: {
                beginAtZero: true
            }
        },
    };

    const title = props.data[0].subject;
    const labels = props.data.map(item => item.date);
    const data = {labels, datasets: props.dataset};
    const sourceLink = props.data[0].source;
    const source = props.source;
    const tags = props.data[0].tags.split(', ');

    return (
        <div className={styles.layout}>
            <p className={styles.title}>{title}</p>
            <Bar options={options} data={data} className={styles.chart}/>
            <div className={styles.info}>
                <NavLink to={sourceLink}>
                    Fuente: {source}
                </NavLink>
                <p>Tags: {tags.map((item, index) => <span>{(index ? ', ' : '') + item}</span>)}
                </p>
            </div>

        </div>);
};
