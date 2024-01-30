import styles from "../general/ChangeAttribute.module.css";
import {useState} from "react";
import useModal from "../../../hooks/useModal";
import {useMutation} from "@tanstack/react-query";
import {updatePassword} from "../../../../utils/api/account-api";
import {ApiErrorDTO} from "../../../../utils/api/dtos/api";
import {useForm} from "react-hook-form";
import {PasswordChangeDTO} from "../../../../utils/api/dtos/account";
import {passwordRegex} from "../../../../utils/regex";
import ApiError from "../../../layout/modal-contents/ApiError";
import Modal from "../../../hooks/Modal";
import OnSuccessModal from "../../../layout/modal-contents/OnSuccessModal";
import {Button} from "../../../layout/styled";

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
            openModal(<OnSuccessModal closeModal={closeModal} redirect={true}
                                      text={"Contraseña actualizada con éxito"}/>);
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

    const form = <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <p className={styles.attribute}>Cambiar contraseña</p>

        <div className={styles.input}>
            <input
                id={"currentPassword"}
                type={passwordVisibility ? "password" : "text"}
                autoComplete={"current-password"}
                placeholder={"Contraseña actual"}
                {...register("currentPassword", {
                    required: {value: true, message: "La contraseña no puede faltar"}
                })}
            />
            <p className={styles.error}>{errors.currentPassword && errors.currentPassword.message}</p>
        </div>

        <div className={styles.input}>
            <input
                id={"newPassword"}
                type={passwordVisibility ? "password" : "text"}
                autoComplete={"new-password"}
                placeholder={"Contraseña nueva"}
                {...register("newPassword", {
                    required: {value: true, message: "La contraseña no puede faltar"},
                    pattern: {
                        value: passwordRegex,
                        message: "Mínimo 8 caracteres, una letra mayúscula, una letra minúscula, y un número"
                    },
                    minLength: {value: 2, message: "Mínimo 2 caracteres"},
                    maxLength: {value: 50, message: "Máximo 50 caracteres"}
                })}
            />
            <p className={styles.error}>{errors.newPassword && errors.newPassword.message}</p>
        </div>

        <div className={styles.input}>
            <input
                id={"matchingNewPassword"}
                type={passwordVisibility ? "password" : "text"}
                autoComplete={"new-password"}
                placeholder={"Reintroduzca la contraseña nueva"}
                {...register("matchingNewPassword", {
                    required: {value: true, message: "El valor no puede faltar"},
                    pattern: {
                        value: passwordRegex,
                        message: "Mínimo 8 caracteres, una letra mayúscula, una letra minúscula, y un número"
                    },
                    minLength: {value: 2, message: "Mínimo 2 caracteres"},
                    maxLength: {value: 50, message: "Máximo 50 caracteres"}
                })}/>
            <p className={styles.error}>{errors.matchingNewPassword && errors.matchingNewPassword.message}</p>
        </div>

        <Button disabled={!isValid} type={"submit"} $margin={"0 0 1rem 0"}>Actualizar</Button>
    </form>;

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        {form}
    </>;
};

export default PasswordChange;