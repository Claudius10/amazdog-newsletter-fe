import styles from "./Charts.module.css";
import {
    BarElement,
    PointElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale, LineElement,
    Title,
    Tooltip, ArcElement,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Bar, Line, Doughnut} from 'react-chartjs-2';
import {NavLink} from "react-router-dom";
import {Dataset, Statistic} from "../../utils/types";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    ArcElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

type Props = {
    dataset: Dataset[],
    source: string;
    title: string;
    type: string;
}

export const Chart = (props: Props) => {

    const options = {
        clip: false,
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
                align: 'top' as const,
                anchor: 'end' as const,
                font: {
                    weight: 600,
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        let value;
                        if (props.type === "Bar") {
                            value = context.parsed.y;
                        } else {
                            value = context.parsed;
                        }
                        if (!Number.isInteger(value)) {
                            return `${context.dataset.label}: ${(value * 100).toFixed(0) + "%"}`;
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
    props.dataset.forEach((dataset: Dataset) => {
        dataset.data.forEach((statistic: Statistic) => {
                if (props.type === "Doughnut") {
                    if (!labels.includes(statistic.label)) {
                        labels.push(statistic.label);
                    }
                } else {

                    if (!labels.includes(statistic.date)) {
                        labels.push(statistic.date);
                    }
                }


            }
        );
    });
    console.log("datasetArray");
    console.log(props.dataset);
    const data = {
        labels,
        datasets: props.dataset
    };
    const sourceLink = props.dataset[0].data[0].source;
    const source = props.source;
    const tags = props.dataset[0].data[0].tags.split(', ');

    const getChart = (type: string, options: any, data: any) => {
        switch (type) {
            case "Bar":
                return <Bar options={options} data={data}/>;
            case "Line":
                return <Line options={options} data={data}/>;
            case "Doughnut":
                return <Doughnut options={options} data={data}/>;
        }
    };

    return (
        <div className={styles.border}>
            <div className={styles.chartContainer}>
                <p className={styles.title}>{props.title}</p>
                {getChart(props.type, options, data)}
                <div className={styles.info}>
                    <NavLink to={sourceLink}>
                        Fuente: {source}
                    </NavLink>
                    <p>Tags: {tags.map((item, index) => <span key={index}>{(index ? ', ' : '') + item}</span>)}
                    </p>
                </div>
            </div>
        </div>);
};
