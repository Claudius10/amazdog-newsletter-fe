import useModal from "../../../hooks/useModal";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {deleteAccount} from "../../../../utils/api/account-api";
import {ApiErrorDTO} from "../../../../utils/api/dtos/api";
import ApiError from "../../../layout/modal-contents/ApiError";
import {useForm} from "react-hook-form";
import {PasswordDTO} from "../../../../utils/api/dtos/account";
import {useNavigate} from "react-router-dom";
import styles from "./DeleteAccount.module.css";
import Modal from "../../../hooks/Modal";

const DeleteAccount = () => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const [passwordVisibility, setPwVisibility] = useState(true);
    const userId = localStorage.getItem("USER_ID");

    const togglePwVisibility = () => {
        setPwVisibility(!passwordVisibility);
    };

    const mutation = useMutation({
        mutationFn: deleteAccount,
        onSuccess: () => {
            localStorage.clear();
            openModal(<OnSuccess closeModal={closeModal}/>);
        },
        onError: (error: ApiErrorDTO) => {
            openModal(<ApiError errorMsg={error.errorMsg} closeModal={closeModal}/>);
        }
    });

    const onSubmitHandler = (form: PasswordDTO) => {
        mutation.mutate({data: form, userId: Number(userId)});
    };

    const {register, handleSubmit, formState: {errors, isValid}} = useForm<PasswordDTO>({
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    const form =
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <p>Borrar cuenta</p>
            <div>
                <label htmlFor={"password"}>
                    Contraseña*
                </label>
                <div>
                    <input
                        id={"password"}
                        type={passwordVisibility ? "password" : "text"}
                        autoComplete={"current-password"}
                        {...register("password", {
                            required: {value: true, message: "El valor no puede faltar"}
                        })}
                    />
                </div>
            </div>
            <p>{errors.password && errors.password.message}</p>

            <div>
                <button disabled={!isValid} type={"submit"}>Borrar</button>
            </div>
        </form>;

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        {form}
    </>;
};

type Props = {
    closeModal: () => void;
}

const OnSuccess = (props: Props) => {
    const navigate = useNavigate();

    const handler = () => {
        props.closeModal();
        navigate("/");
    };

    return <div className={styles.layout}>
        <p className={styles.text}>Cuenta borrada con éxito</p>
        <button type={"button"} className={styles.button} onClick={handler}>Ok</button>
    </div>;
};

export default DeleteAccount;