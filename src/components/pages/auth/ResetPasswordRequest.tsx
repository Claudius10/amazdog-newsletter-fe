import {requestPasswordReset} from "../../../utils/api/auth-api";
import ApiError from "../../layout/modal-contents/ApiError";
import useModal from "../../hooks/useModal";
import {useForm} from "react-hook-form";
import {emailRgx} from "../../../utils/regex";
import Modal from "../../hooks/Modal";
import {useMutation} from "@tanstack/react-query";
import OnSuccessModal from "../../layout/modal-contents/OnSuccessModal";

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

    const form = <form onSubmit={handleSubmit(onSubmitHandler)}>
        <p>Ayuda de contraseña</p>

        <div>
            <label htmlFor={"email"}>
                Email asociado con su cuenta
            </label>
            <div>
                <input
                    id={"email"}
                    type={"text"}
                    autoComplete={"email"}
                    {...register("email", {
                        required: {value: true, message: "El valor no puede faltar"},
                        pattern: {
                            value: emailRgx,
                            message: "Compruebe el email introducido"
                        },
                        minLength: {value: 2, message: "Mínimo 2 caracteres"},
                        maxLength: {value: 50, message: "Máximo 50 caracteres"}
                    })}
                />
            </div>
        </div>
        <p>{errors.email && errors.email.message}</p>

        <div>
            <button disabled={!isValid} type={"submit"}>Continuar</button>
        </div>
    </form>;

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        {form}
    </>;
};

export default ResetPasswordRequest;