import styles from "./ResetPasswordRequest.module.css";
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
import CircleIcon from "../../layout/CircleIcon";
import PwVisibilityIcon from "../../../resources/Imagenes/pwvisibility.png";
import {Button} from "../../layout/styled";

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

    const form = <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <p className={styles.text}>Restablecer contraseña</p>

        <div className={styles["login-input"]}>
            <div className={styles["input-field"]}>
                <div className={styles["input-container"]}>
                    <input
                        id={"newPassword"}
                        type={passwordVisibility ? "password" : "text"}
                        className={styles.input}
                        placeholder={"Nueva contraseña"}
                        {...register("newPassword", {
                            required: {value: true, message: "La contraseña no puede faltar"},
                            pattern: {
                                value: passwordRegex,
                                message: "Mínimo 8 caracteres, una letra mayúscula, una letra minúscula, y un número"
                            },
                            minLength: {
                                value: 8,
                                message: "Mínimo 8 caracteres, una letra mayúscula, una letra minúscula, y un número"
                            },
                            maxLength: {
                                value: 50,
                                message: "Mínimo 8 caracteres, una letra mayúscula, una letra minúscula, y un número"
                            }
                        })}
                    />
                </div>
                <div className={styles.pwIcon}>
                    <CircleIcon
                        action={togglePwVisibility}
                        icon={PwVisibilityIcon}
                        width={"14px"}
                        height={"14px"}
                        alt={"toggle-password-visibility-button"}

                    />
                </div>
            </div>
            <p className={styles.formError}>{errors.newPassword?.message}</p>
        </div>

        <div className={styles["login-input"]}>
            <div className={styles["input-field"]}>
                <div className={styles["input-container"]}>
                    <input
                        id={"matchingNewPassword"}
                        type={passwordVisibility ? "password" : "text"}
                        className={styles.input}
                        placeholder={"Reintroduzca la nueva contraseña"}
                        {...register("matchingNewPassword", {
                            required: {value: true, message: "La contraseña no puede faltar"},
                            pattern: {
                                value: passwordRegex,
                                message: "Mínimo 8 caracteres, una letra mayúscula, una letra minúscula, y un número"
                            },
                            minLength: {
                                value: 8,
                                message: "Mínimo 8 caracteres, una letra mayúscula, una letra minúscula, y un número"
                            },
                            maxLength: {
                                value: 50,
                                message: "Mínimo 8 caracteres, una letra mayúscula, una letra minúscula, y un número"
                            }
                        })}
                    />
                </div>
                <div className={styles.pwIcon}>
                    <CircleIcon
                        action={togglePwVisibility}
                        icon={PwVisibilityIcon}
                        width={"14px"}
                        height={"14px"}
                        alt={"toggle-password-visibility-button"}

                    />
                </div>
            </div>
            <p className={styles.formError}>{errors.matchingNewPassword?.message}</p>
        </div>

        <Button disabled={!isValid} type={"submit"}>Continuar</Button>
    </form>;

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        {form}
    </>;
};

export default ResetPassword;