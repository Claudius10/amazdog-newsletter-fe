import styles from "./Charts.module.css";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Bar} from 'react-chartjs-2';
import {NavLink} from "react-router-dom";
import {ChartProps, Dataset} from "../../../utils/dto/chart";
import {Statistic} from "../../../utils/dto/statistics";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const BarChart = (props: ChartProps) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            datalabels: {
                formatter: function (statistic: Statistic) {
                    if (!Number.isInteger(statistic.value)) {
                        return (statistic.value * 100).toFixed(0) + "%";
                    }
                    return statistic.value;
                },
                color: 'black',
                align: 'center' as const,
                anchor: 'center' as const,
                font: {
                    weight: 600,
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        if (!Number.isInteger(context.parsed.y)) {
                            return `${context.dataset.label}: ${(context.parsed.y * 100).toFixed(0) + "%"}`;
                        }
                    }
                }
            },
        },
        locale: 'es-ES',
        scales: {
            x: {
                title: {
                    display: false,
                    text: ""
                },
                stacked: true,
            },
            y: {
                title: {
                    display: true,
                    text: "Cantidad"
                },
                stacked: true,
                beginAtZero: true,
                offset: true,
                ticks: {
                    callback: (value: any) => {
                        if (!Number.isInteger(value)) {
                            return (value * 100).toFixed(0) + "%";
                        } else {
                            return value;
                        }
                    }
                }
            },
        },
    };

    let labels: string[] = [];
    let tags: string[] = [];
    props.dataset.forEach((dataset: Dataset) => {
        dataset.data.forEach((statistic: Statistic) => {
                if (!labels.includes(statistic.date)) {
                    labels.push(statistic.date);
                }

                let tempTags = statistic.tags.split(', ');
                tempTags.forEach((tag) => {
                    if (!tags.includes(tag)) {
                        tags.push(tag);
                    }
                });
            }
        );
    });

    const data = {labels, datasets: props.dataset};
    const sourceLink = props.dataset[0].data[0].source;

    return (
        <div className={styles.border}>
            <div className={styles.chartContainer}>
                <p className={styles.title}>{props.title}</p>
                <Bar options={options} data={data}/>
                <div className={styles.info}>
                    <NavLink to={sourceLink}>Fuente</NavLink>
                    <p>Tags: {tags.map((item, index) => <span key={index}>{(index ? ', ' : '') + item}</span>)}
                    </p>
                </div>
            </div>
        </div>);
};

export default BarChart;