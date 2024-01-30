import {useState} from "react";
import {deleteAllBySubject, findAllSubjects} from "../../../../../utils/api/statistics-api";
import {useMutation, useQuery} from "@tanstack/react-query";
import SubjectEntry from "./SubjectEntry";
import StatisticForm from "./StatisticForm";
import useModal from "../../../../hooks/useModal";
import Modal from "../../../../hooks/Modal";
import DeleteConfirmModal from "../../../../layout/modal-contents/DeleteConfirmModal";
import {useSearchParams} from "react-router-dom";
import PaginationSubject from "../subjects/PaginationSubject";
import {ApiErrorDTO} from "../../../../../utils/api/dtos/api";
import ApiError from "../../../../layout/modal-contents/ApiError";

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
        content = <p>Cargando...</p>;
        totalPages = 0;
    } else if (subjects.isError) {
        content = <p>Ocurrió un error. Por favor, inténtelo más tarde.</p>;
        totalPages = 0;
    } else if (subjects.isSuccess && subjects.data.content.length === 0) {
        content = <p>No se encontró nada</p>;
        totalPages = 0;
    } else if (subjects.isSuccess) {
        totalPages = subjects.data.totalPages;
        content = subjects.data.content.map((subject: string, index: number) =>
            <div key={index}>
                <SubjectEntry subject={subject}/>
                <button onClick={() => {
                    removeAllBySubjectHandler(subject);
                }}>Eliminar
                </button>
            </div>);
    }

    return <div>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        Datos estadísticos por tema
        {content}
        <button onClick={toggleForm}>Añadir</button>
        {showForm && <StatisticForm refetch={refetch} toggleForm={toggleForm}/>}
        <PaginationSubject totalPages={totalPages} queryKey={["subjects", "all"]} queryFn={findAllSubjects}/>
    </div>;
};

export default StatisticList;