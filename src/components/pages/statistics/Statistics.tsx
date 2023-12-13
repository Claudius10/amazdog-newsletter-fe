import styles from "../statistics/Statistics.module.css";
import {BarChart} from "../../charts/Charts";
import {Statistic} from "../../../utils/types";

const Statistics = () => {
    const fetchedData: Statistic[] = [
        {
            id: 1,
            subject: "¿Cuántos perros y gatos fueron recogidos por refugios y protectoras de animales en 2022?",
            date: "2019",
            value: 306506,
            source: "https://www.fundacion-affinity.org/observatorio/infografia-el-nunca-lo-haria-abandono-adopcion-perros-gatos-espana-2023",
            tags: "Perros, Gatos"
        },
        {
            id: 2,
            subject: "¿Cuántos perros y gatos fueron recogidos por refugios y protectoras de animales en 2022?",
            date: "2020",
            value: 286153,
            source: "https://www.fundacion-affinity.org/observatorio/infografia-el-nunca-lo-haria-abandono-adopcion-perros-gatos-espana-2023",
            tags: "Perros, Gatos"
        },
        {
            id: 3,
            subject: "¿Cuántos perros y gatos fueron recogidos por refugios y protectoras de animales en 2022?",
            date: "2021",
            value: 285554,
            source: "https://www.fundacion-affinity.org/observatorio/infografia-el-nunca-lo-haria-abandono-adopcion-perros-gatos-espana-2023",
            tags: "Perros, Gatos"
        },
        {
            id: 4,
            subject: "¿Cuántos perros y gatos fueron recogidos por refugios y protectoras de animales en 2022?",
            date: "2022",
            value: 288457,
            source: "https://www.fundacion-affinity.org/observatorio/infografia-el-nunca-lo-haria-abandono-adopcion-perros-gatos-espana-2023",
            tags: "Perros, Gatos"
        },
    ];

    return <div className={styles.layout}>
        <BarChart
            dataset={[
                {
                    label: 'Perros y Gatos',
                    data: fetchedData,
                    borderColor: 'rgb(255,255,255)',
                    backgroundColor: 'rgba(255, 177, 44)',
                    parsing: {
                        xAxisKey: 'date',
                        yAxisKey: 'value',
                    }
                },
            ]}
            data={fetchedData}
            source={"fundación-affinity"}/>
    </div>;

};

export default Statistics;