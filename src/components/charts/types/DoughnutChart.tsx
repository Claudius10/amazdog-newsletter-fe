import styles from "./Charts.module.css";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip, ArcElement,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Doughnut} from 'react-chartjs-2';
import {NavLink} from "react-router-dom";
import {ChartProps, Dataset} from "../../../utils/dto/chart";
import {Statistic} from "../../../utils/dto/statistics";

ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const DoughnutChart = (props: ChartProps) => {
    const options = {
        layout: {
            padding: {
                top: 25
            }
        },
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
                        context.dataset.label = context.label;
                        if (!Number.isInteger(context.parsed)) {
                            return `${context.label}: ${(context.parsed * 100).toFixed(0) + "%"}`;
                        }
                    },
                    title: function (context: any) {
                        return "";
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
                if (!labels.includes(statistic.label)) {
                    labels.push(statistic.label);
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

    return <div className={styles.layout}>
        <p className={styles.title}>{props.title}</p>

        <div className={styles.chartContainer}>
            <Doughnut options={options} data={data}/>
        </div>

        <div className={styles.info}>
            <NavLink to={sourceLink}>Fuente</NavLink>
            <p className={styles.tags}>Tags: {tags.map((item, index) => <span key={index}>{(index ? ', ' : '') + item}</span>)}
            </p>
        </div>

    </div>;
};

export default DoughnutChart;