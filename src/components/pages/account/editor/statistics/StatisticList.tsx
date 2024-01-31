import styles from "./StatisticList.module.css";
import {useState} from "react";
import {deleteAllBySubject, findAllSubjects} from "../../../../../utils/api/statistics-api";
import {useMutation, useQuery} from "@tanstack/react-query";
import SubjectEntry from "./SubjectEntry";
import StatisticForm from "./StatisticForm";
import useModal from "../../../../hooks/useModal";
import Modal from "../../../../hooks/Modal";
import DeleteConfirmModal from "../../../../layout/modal-contents/DeleteConfirmModal";
import {useSearchParams} from "react-router-dom";
import PaginationSubject from "./PaginationSubject";
import {ApiErrorDTO} from "../../../../../utils/api/dtos/api";
import ApiError from "../../../../layout/modal-contents/ApiError";
import {Button} from "../../../../layout/styled";

const StatisticList = () => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    let pageNumber = searchParams.get("page");
    let pageSize = searchParams.get("size");

    const subjects = useQuery({
            queryKey: ["subjects", "all", pageNumber, pageSize],
            queryFn: findAllSubjects
        }
    );

    const removeAllBySubject = useMutation({
        mutationFn: deleteAllBySubject,
        onSuccess: async () => {
            await refetch();
        },
        onError: (error: ApiErrorDTO) => {
            openModal(<ApiError errorMsg={error.errorMsg} closeModal={closeModal}/>);
        }
    });

    const onDeleteConfirm = (subject: string) => {
        removeAllBySubject.mutate(subject);
        closeModal();
    };


    const removeAllBySubjectHandler = (subject: string) => {
        openModal(<DeleteConfirmModal closeModal={() => onDeleteConfirm(subject)}/>);
    };


    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const refetch = async () => {
        await subjects.refetch();
    };

    let totalPages;
    let content;
    if (subjects.isLoading) {
        content = <p className={styles.placeholder}>Cargando...</p>;
        totalPages = 0;
    } else if (subjects.isError) {
        content = <p className={styles.placeholder}>Ocurrió un error. Por favor, inténtelo más tarde.</p>;
        totalPages = 0;
    } else if (subjects.isSuccess && subjects.data.content.length === 0) {
        content = <p className={styles.placeholder}>No se encontró nada</p>;
        totalPages = 0;
    } else if (subjects.isSuccess) {
        totalPages = subjects.data.totalPages;
        content = subjects.data.content.map((subject: string, index: number) =>
            <div className={styles.entryList} key={index}>
                <div className={styles.entry}>
                    <SubjectEntry subject={subject}/>
                </div>
                <Button onClick={() => {
                    removeAllBySubjectHandler(subject);
                }}>Eliminar
                </Button>
            </div>);
    }

    return <div className={styles.layout}>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        <p className={styles.header}>Datos estadísticos</p>
        {content}
        <Button $height={"3rem"} $width={"7rem"} onClick={toggleForm}>Añadir</Button>
        {showForm && <StatisticForm refetch={refetch} toggleForm={toggleForm}/>}
        <div className={styles.pages}>
            <PaginationSubject totalPages={totalPages} queryKey={["subjects", "all"]} queryFn={findAllSubjects}/>
        </div>
    </div>;
};

export default StatisticList;