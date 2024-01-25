import styles from "./PasswordChange.module.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import useModal from "../../../hooks/useModal";
import {useMutation} from "@tanstack/react-query";
import {updatePassword} from "../../../../utils/api/account-api";
import {ApiErrorDTO} from "../../../../utils/api/dtos/api";
import {useForm} from "react-hook-form";
import {PasswordChangeDTO} from "../../../../utils/api/dtos/account";
import {charsAndNumbersRegex} from "../../../../utils/regex";
import ApiError from "../../../layout/modal-contents/ApiError";
import Modal from "../../../hooks/Modal";

const PasswordChange = () => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const [passwordVisibility, setPwVisibility] = useState(true);
    const userId = localStorage.getItem("USER_ID");

    const togglePwVisibility = () => {
        setPwVisibility(!passwordVisibility);
    };

    const mutation = useMutation({
        mutationFn: updatePassword,
        onSuccess: () => {
            localStorage.clear();
            openModal(<OnSuccess closeModal={closeModal}/>);
        },
        onError: (error: ApiErrorDTO) => {
            openModal(<ApiError errorMsg={error.errorMsg} closeModal={closeModal}/>);
        }
    });

    const {register, handleSubmit, formState: {errors, isValid}} = useForm<PasswordChangeDTO>({
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    const onSubmitHandler = (form: PasswordChangeDTO) => {
        mutation.mutate({data: form, userId: Number(userId)});
    };

    const form = <form onSubmit={handleSubmit(onSubmitHandler)}>
        <p>Cambiar contraseña</p>

        <div>
            <label htmlFor={"currentPassword"}>
                Contraseña actual*
            </label>
            <div>
                <input
                    id={"currentPassword"}
                    type={passwordVisibility ? "password" : "text"}
                    autoComplete={"current-password"}
                    {...register("currentPassword", {
                        required: {value: true, message: "El valor no puede faltar"},
                        pattern: {
                            value: charsAndNumbersRegex,
                            message: "Compruebe la contraseña introducida."
                        },
                    })}
                />

            </div>
        </div>
        <p>{errors.currentPassword && errors.currentPassword.message}</p>

        <div>
            <label htmlFor={"newPassword"}>
                Contraseña nueva*
            </label>
            <div>
                <input
                    id={"newPassword"}
                    type={passwordVisibility ? "password" : "text"}
                    autoComplete={"new-password"}
                    {...register("newPassword", {
                        required: {value: true, message: "El valor no puede faltar"},
                        pattern: {
                            value: charsAndNumbersRegex,
                            message: "Compruebe la contraseña introducida."
                        },
                        minLength: {value: 2, message: "Mínimo 2 caracteres"},
                        maxLength: {value: 50, message: "Máximo 50 caracteres"}
                    })}
                />
            </div>
        </div>
        <p>{errors.newPassword && errors.newPassword.message}</p>

        <div>
            <label htmlFor={"matchingNewPassword"}>
                Reintroduzca la contraseña nueva*
            </label>
            <div>
                <input
                    id={"matchingNewPassword"}
                    type={passwordVisibility ? "password" : "text"}
                    autoComplete={"new-password"}
                    {...register("matchingNewPassword", {
                        required: {value: true, message: "El valor no puede faltar"},
                        pattern: {
                            value: charsAndNumbersRegex,
                            message: "Compruebe la contraseña introducida."
                        },
                        minLength: {value: 2, message: "Mínimo 2 caracteres"},
                        maxLength: {value: 50, message: "Máximo 50 caracteres"}
                    })}/>
            </div>
        </div>
        <p>{errors.matchingNewPassword && errors.matchingNewPassword.message}</p>

        <div>
            <button disabled={!isValid} type={"submit"}>Actualizar</button>
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
        <p className={styles.text}>Contraseña actualizada con éxito</p>
        <button type={"button"} className={styles.button} onClick={handler}>Ok</button>
    </div>;
};

export default PasswordChange;