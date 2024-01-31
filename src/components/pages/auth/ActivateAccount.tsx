import styles from "./ActivateAccount.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {activationFn} from "../../../utils/api/auth-api";
import {useEffect, useState} from "react";
import {BounceLoader} from "react-spinners";
import {ApiErrorDTO} from "../../../utils/api/dtos/api";
import ApiError from "../../layout/modal-contents/ApiError";
import useModal from "../../hooks/useModal";
import Modal from "../../hooks/Modal";

const ActivateAccount = () => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    let {token} = useParams();

    const activate = useMutation({
        mutationFn: activationFn,
        onSuccess: () => {
            setIsLoading(false);
            setTimeout(() => {
                navigate("/authentication");
            }, 2000);
        },
        onError: (error: ApiErrorDTO) => {
            openModal(<ApiError errorMsg={error.errorMsg} closeModal={closeModal}/>);
        }
    });

    useEffect(() => {
        if (token != null) {
            activate.mutate(token);
        }
    }, []);

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        <div className={styles.layout}>
            <p className={styles.text}>Activación en curso...</p>
            <BounceLoader color="#ffb12c" loading={isLoading}/>
            {activate.isSuccess &&
                <p className={styles.text}>!Tu cuenta ha sido activada! Redireccionando en un momento...</p>}
        </div>
    </>;
};

export default ActivateAccount;