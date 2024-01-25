import useModal from "../../../hooks/useModal";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {updateEmail} from "../../../../utils/api/account-api";
import {ApiErrorDTO} from "../../../../utils/api/dtos/api";
import ApiError from "../../../layout/modal-contents/ApiError";
import {useForm} from "react-hook-form";
import {EmailChangeDTO} from "../../../../utils/api/dtos/account";
import styles from "../settings/PasswordChange.module.css";
import {emailRgx} from "../../../../utils/regex";
import Modal from "../../../hooks/Modal";

const ChangeEmail = () => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const [passwordVisibility, setPwVisibility] = useState(true);
    const userId = localStorage.getItem("USER_ID");

    const togglePwVisibility = () => {
        setPwVisibility(!passwordVisibility);
    };

    const mutation = useMutation({
        mutationFn: updateEmail,
        onSuccess: () => {
            openModal(<OnSuccess closeModal={closeModal}/>);
        },
        onError: (error: ApiErrorDTO) => {
            openModal(<ApiError errorMsg={error.errorMsg} closeModal={closeModal}/>);
        }
    });

    const {register, handleSubmit, formState: {isValid, errors}} = useForm<EmailChangeDTO>({
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    const onSubmitHandler = (form: EmailChangeDTO) => {
        mutation.mutate({data: form, userId: Number(userId)});
    };

    const form =
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <p>Actualizar el email</p>

            <div>
                <label htmlFor={"emailUpdate"}>
                    Email nuevo*
                </label>
                <input
                    id={"emailUpdate"}
                    type={"text"}
                    autoComplete={"username"}
                    {...register("email", {
                        required: {value: true, message: "El valor no puede faltar"},
                        pattern: {
                            value: emailRgx,
                            message: "Compruebe el email introducido."
                        },
                        minLength: {value: 2, message: "Mínimo 2 caracteres"},
                        maxLength: {value: 50, message: "Máximo 50 caracteres"}
                    })}
                />
            </div>
            <p>{errors.email && errors.email.message}</p>

            <div>
                <label htmlFor={"password"}>
                    Contraseña actual*
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
    return <div className={styles.layout}>
        <p className={styles.text}>Email actualizado. Reinicie la sesión para ver los cambios. </p>
        <button type={"button"} className={styles.button} onClick={props.closeModal}>Ok</button>
    </div>;
};

export default ChangeEmail;