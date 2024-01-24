import {useQuery} from "@tanstack/react-query";
import {findAllSubjects} from "../../../../../utils/api/statistics-api";
import SubjectItem from "./SubjectItem";
import {SubjectDTO} from "../../../../../utils/api/dtos/chart";
import {useSearchParams} from "react-router-dom";
import PaginationChartSubjects from "../charts/PaginationChartSubjects";

type Props = {
    onSelectedSubject: (subject: SubjectDTO) => void;
}

const SubjectList = (props: Props) => {
    const [searchParams] = useSearchParams();
    let pageNumber = searchParams.get("subjectsPage");
    let pageSize = searchParams.get("subjectsSize");

    const subjects = useQuery({
        queryKey: ["statistics", "subjects", pageNumber, pageSize],
        queryFn: findAllSubjects,
    });

    let totalPages;
    if (subjects.isSuccess) {
        totalPages = subjects.data.totalPages;
    }

    return <>
        {subjects.data?.content.map((subject: string, i: number) =>
            <SubjectItem subject={subject} key={i} onSelectedSubject={props.onSelectedSubject}/>)}
        <PaginationChartSubjects totalPages={totalPages} queryKey={["statistics", "subjects"]}
                                 queryFn={findAllSubjects}/>
    </>;
};

export default SubjectList;