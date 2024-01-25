import {useMutation, useQuery} from "@tanstack/react-query";
import {deleteById, findAllBySubject} from "../../../../../utils/api/statistics-api";
import {ApiErrorDTO} from "../../../../../utils/api/dtos/api";
import ApiError from "../../../../layout/modal-contents/ApiError";
import useModal from "../../../../hooks/useModal";
import Modal from "../../../../hooks/Modal";
import {useSearchParams} from "react-router-dom";
import {useState} from "react";
import StatisticForm from "./StatisticForm";
import PaginationStatistics from "./PaginationStatistics";
import {Statistic} from "../../../../../utils/dto/statistics";

const StatisticItem = () => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const [showForm, setShowForm] = useState(false);
    const [searchParams] = useSearchParams();
    let subject = searchParams.get("name");
    let pageNumber = searchParams.get("page");
    let pageSize = searchParams.get("size");

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const statistics = useQuery({
            queryKey: ["statistics", "by", "subject", subject, pageNumber, pageSize],
            queryFn: findAllBySubject
        }
    );

    const removeById = useMutation({
        mutationFn: deleteById,
        onSuccess: async () => {
            await statistics.refetch();

        },
        onError: (error: ApiErrorDTO) => {
            openModal(<ApiError errorMsg={error.errorMsg} closeModal={closeModal}/>);
        }
    });

    const deleteHandler = (id: number) => {
        removeById.mutate(id);
    };


    let totalPages;
    let statisticsList;
    let title;
    let theSubject;
    if (statistics.isLoading || statistics.isFetching) {
        statisticsList = <p>Cargando...</p>;
        totalPages = 0;
        title = <p>Cargando...</p>;
        theSubject = "";
    } else if (statistics.isError) {
        statisticsList = <p>Ocurrió un error. Por favor, inténtelo más tarde.</p>;
        totalPages = 0;
        theSubject = "";
    } else if (statistics.isSuccess && statistics.data.content.length === 0) {
        statisticsList = <p>No se encontró nada</p>;
        title = <p></p>;
        totalPages = 0;
        theSubject = "";
    } else if (statistics.isSuccess) {
        console.log(statistics.data);
        totalPages = statistics.data.totalPages;
        title = <p>{statistics.data.content[0].subject}</p>;
        theSubject = statistics.data.content[0].subject;
        statisticsList = statistics.data.content.map((statistic: Statistic) => <div key={statistic.id}>
            <p>Etiqueta: {statistic.label}</p>
            <p>Valor: {statistic.value}</p>
            <p>Fecha: {statistic.date}</p>
            <p>Fuente: {statistic.source}</p>
            <p>Tags: {statistic.tags}</p>
            <button onClick={() => {
                deleteHandler(statistic.id);
            }}>Eliminar
            </button>
        </div>);
    }

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        {title}
        {statisticsList}
        <button onClick={toggleForm}>Añadir</button>
        {showForm && <StatisticForm toggleForm={toggleForm} refetch={statistics.refetch}/>}
        <PaginationStatistics totalPages={totalPages}
                              queryKey={["statistics", "by", "subject", subject!]}
                              queryFn={findAllBySubject}
                              subject={theSubject}/>
    </>;
};

export default StatisticItem;