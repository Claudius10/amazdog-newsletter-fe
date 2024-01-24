import {useState} from "react";
import {findAllSubjects} from "../../utils/api/statistics-api";
import {useQuery} from "@tanstack/react-query";
import {ChartDTO} from "../../utils/api/dtos/chart";

type Props = {
    chart: ChartDTO
}

const ChartItem = (props: Props) => {
    const [showSubjects, setShowSubjects] = useState(false);

    const subjects = useQuery({
        queryKey: ["statistics", "subjects"],
        queryFn: findAllSubjects,
        enabled: false
    });

    const addSubjectToChart = (subject: string, chartId: number) => {
        // update chart item in the backend with the new subject

    };
    const removeSubjectFromChart = (subject: string, id: number) => {
        // update chart on backend
    };

    const showSubjectList = () => {
        setShowSubjects(!showSubjects);
        subjects.refetch();
    };

    return <div>
        Gráfico tipo {props.chart.type}:
        <p>Título: {props.chart.title}</p>
        Tópicos/temas: {props.chart.subjects.map((subject) => <p key={subject.id}>{subject.name}</p>)}
    </div>;
};

export default ChartItem;