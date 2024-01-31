import styles from "./SubjectItem.module.css";
import {useMutation, useQuery} from "@tanstack/react-query";
import {deleteById, findAllBySubject} from "../../../../../utils/api/statistics-api";
import {ApiErrorDTO} from "../../../../../utils/api/dtos/api";
import ApiError from "../../../../layout/modal-contents/ApiError";
import useModal from "../../../../hooks/useModal";
import Modal from "../../../../hooks/Modal";
import {NavLink, useSearchParams} from "react-router-dom";
import {useState} from "react";
import StatisticForm from "./StatisticForm";
import PaginationStatistics from "./PaginationStatistics";
import {Statistic} from "../../../../../utils/dto/statistics";
import {Button} from "../../../../layout/styled";

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
        statisticsList = <p className={styles.placeholder}>Cargando...</p>;
        totalPages = 0;
        title = <p className={styles.placeholder}>Cargando...</p>;
        theSubject = "";
    } else if (statistics.isError) {
        statisticsList = <p className={styles.placeholder}>Ocurrió un error. Por favor, inténtelo más tarde.</p>;
        totalPages = 0;
        theSubject = "";
    } else if (statistics.isSuccess && statistics.data.content.length === 0) {
        statisticsList = <p className={styles.placeholder}>No se encontró nada</p>;
        title = <p></p>;
        totalPages = 0;
        theSubject = "";
    } else if (statistics.isSuccess) {
        totalPages = statistics.data.totalPages;
        title = <p className={styles.title}>{statistics.data.content[0].subject}</p>;
        theSubject = statistics.data.content[0].subject;
        statisticsList = statistics.data.content.map((statistic: Statistic) =>
            <div className={styles.itemList} key={statistic.id}>
                <div className={styles.item}>
                    <p><span className={styles.text}>Etiqueta:</span>{statistic.label}</p>
                    <p><span className={styles.text}>Valor:</span>{statistic.value}</p>
                    <p><span className={styles.text}>Fecha:</span>{statistic.date}</p>
                </div>
                <div className={styles.item}>
                    <p><span className={styles.text}>Tags:</span>{statistic.tags}</p>
                    <NavLink to={statistic.source}>Fuente</NavLink>
                </div>
                <Button onClick={() => {
                    deleteHandler(statistic.id);
                }}>Eliminar
                </Button>
            </div>);
    }

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        <div className={styles.layout}>
            {title}
            {statisticsList}
            <Button $height={"3rem"} $width={"7rem"} onClick={toggleForm}>Añadir</Button>
            {showForm && <StatisticForm toggleForm={toggleForm} refetch={statistics.refetch}/>}
            <div className={styles.pages}>
                <PaginationStatistics
                    totalPages={totalPages}
                    queryKey={["statistics", "by", "subject", subject!]}
                    queryFn={findAllBySubject}
                    subject={theSubject}
                />
            </div>
        </div>
    </>;
};

export default StatisticItem;