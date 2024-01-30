import styles from "./ChangeAttribute.module.css";
import useModal from "../../../hooks/useModal";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {updateEmail} from "../../../../utils/api/account-api";
import {ApiErrorDTO} from "../../../../utils/api/dtos/api";
import ApiError from "../../../layout/modal-contents/ApiError";
import {useForm} from "react-hook-form";
import {EmailChangeDTO} from "../../../../utils/api/dtos/account";
import {emailRgx} from "../../../../utils/regex";
import Modal from "../../../hooks/Modal";
import OnSuccessModal from "../../../layout/modal-contents/OnSuccessModal";
import {Button} from "../../../layout/styled";

type Props = {
    email: string | null;
}

const ChangeEmail = (props: Props) => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const [passwordVisibility, setPwVisibility] = useState(true);
    const userId = localStorage.getItem("USER_ID");

    const togglePwVisibility = () => {
        setPwVisibility(!passwordVisibility);
    };

    const mutation = useMutation({
        mutationFn: updateEmail,
        onSuccess: () => {
            openModal(<OnSuccessModal closeModal={closeModal} redirect={false}
                                      text={"Email actualizado. Reinicie la sesión para que los cambios tomen efecto."}/>);
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
        <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
            <p className={styles.attribute}>{props.email}</p>
            <label htmlFor={"nameUpdate"} className={styles.label}>Actualizar email</label>

            <div className={styles.input}>
                <input
                    id={"emailUpdate"}
                    type={"text"}
                    autoComplete={"email"}
                    placeholder={"Correo electrónico"}
                    {...register("email", {
                        required: {value: true, message: "El email no puede faltar"},
                        pattern: {
                            value: emailRgx,
                            message: "Compruebe el email introducido."
                        },
                        minLength: {value: 2, message: "Mínimo 2 caracteres"},
                        maxLength: {value: 50, message: "Máximo 50 caracteres"}
                    })}
                />
                <p className={styles.error}>{errors.email && errors.email.message}</p>
            </div>

            <div className={styles.input}>
                <input
                    id={"password"}
                    type={passwordVisibility ? "password" : "text"}
                    autoComplete={"current-password"}
                    placeholder={"Contraseña actual"}
                    {...register("password", {
                        required: {value: true, message: "La contraseña no puede faltar"}
                    })}
                />
                <p className={styles.error}>{errors.password && errors.password.message}</p>
            </div>

            <Button disabled={!isValid} type={"submit"} $margin={"0 0 1rem 0"}>Actualizar</Button>
        </form>;

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        {form}
    </>;
};

export default ChangeEmail;