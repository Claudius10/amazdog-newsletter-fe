import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {resetPassword} from "../../../utils/api/auth-api";
import {useForm} from "react-hook-form";
import {PasswordResetDTO} from "../../../utils/api/dtos/account";
import {passwordRegex} from "../../../utils/regex";
import {useState} from "react";
import useModal from "../../hooks/useModal";
import {ApiErrorDTO} from "../../../utils/api/dtos/api";
import ApiError from "../../layout/modal-contents/ApiError";
import Modal from "../../hooks/Modal";
import OnSuccessModal from "../../layout/modal-contents/OnSuccessModal";

const ResetPassword = () => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const [passwordVisibility, setPwVisibility] = useState(true);
    let {token} = useParams();

    const togglePwVisibility = () => {
        setPwVisibility(!passwordVisibility);
    };

    const mutation = useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            localStorage.clear();
            openModal(<OnSuccessModal closeModal={closeModal} redirect={true}
                                      text={"Contraseña actualizada con éxito"}/>);
        },
        onError: (error: ApiErrorDTO) => {
            openModal(<ApiError errorMsg={error.errorMsg} closeModal={closeModal}/>);
        }
    });

    const {register, handleSubmit, formState: {errors, isValid}} = useForm<PasswordResetDTO>({
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    const onSubmitHandler = (form: PasswordResetDTO) => {
        if (token !== undefined) {
            mutation.mutate({data: form, token});
        }
    };

    const form = <form onSubmit={handleSubmit(onSubmitHandler)}>
        <p>Restablecer contraseña</p>

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
                            value: passwordRegex,
                            message: "Mínimo 8 caracteres, una letra mayúscula, una letra minúscula, y un número"
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
                            value: passwordRegex,
                            message: "Mínimo 8 caracteres, una letra mayúscula, una letra minúscula, y un número"
                        },
                        minLength: {value: 2, message: "Mínimo 2 caracteres"},
                        maxLength: {value: 50, message: "Máximo 50 caracteres"}
                    })}/>
            </div>
        </div>
        <p>{errors.matchingNewPassword && errors.matchingNewPassword.message}</p>

        <div>
            <button disabled={!isValid} type={"submit"}>Finalizar</button>
        </div>
    </form>;

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        {form}
    </>;
};

export default ResetPassword;