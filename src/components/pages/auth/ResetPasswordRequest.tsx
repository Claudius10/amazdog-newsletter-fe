import styles from "./ResetPasswordRequest.module.css";
import {requestPasswordReset} from "../../../utils/api/auth-api";
import ApiError from "../../layout/modal-contents/ApiError";
import useModal from "../../hooks/useModal";
import {useForm} from "react-hook-form";
import {emailRgx} from "../../../utils/regex";
import Modal from "../../hooks/Modal";
import {useMutation} from "@tanstack/react-query";
import OnSuccessModal from "../../layout/modal-contents/OnSuccessModal";
import {Button} from "../../layout/styled";

type FormValues = {
    email: string;
}

const ResetPasswordRequest = () => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();

    const mutation = useMutation({
        mutationFn: requestPasswordReset,
        onSuccess: () => {
            openModal(<OnSuccessModal closeModal={closeModal} redirect={true}
                                      text={"En breve recibirá un correo electrónico para restablecer la contraseña"}/>);
        },
        onError: (error: string) => {
            openModal(<ApiError errorMsg={error} closeModal={closeModal}/>);
        }
    });

    const {register, handleSubmit, formState: {errors, isValid}} = useForm<FormValues>({
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    const onSubmitHandler = (form: FormValues) => {
        mutation.mutate(form.email);
    };

    const form = <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <p className={styles.text}>Restablecer contraseña</p>
        <div className={styles["login-input"]}>
            <div className={styles["input-container"]}>
                <input
                    id={"email"}
                    type={"email"}
                    className={styles.input}
                    autoComplete={"email"}
                    placeholder={"Correo electrónico"}
                    {...register("email", {
                        required: {value: true, message: "El email no puede faltar"},
                        pattern: {
                            value: emailRgx,
                            message: "Compruebe el email introducido"
                        },
                        maxLength: {value: 100, message: "Compruebe el email introducido"}
                    })}
                />
            </div>
            <p className={styles.formError}>{errors.email?.message}</p>
        </div>
        <Button disabled={!isValid} $margin={"1rem 0 1rem 0"} type={"submit"}>Continuar</Button>
    </form>;

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        {form}
    </>;
};

export default ResetPasswordRequest;