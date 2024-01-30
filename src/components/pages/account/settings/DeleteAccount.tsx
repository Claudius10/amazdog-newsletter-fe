import styles from "../general/ChangeAttribute.module.css";
import useModal from "../../../hooks/useModal";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {deleteAccount} from "../../../../utils/api/account-api";
import {ApiErrorDTO} from "../../../../utils/api/dtos/api";
import ApiError from "../../../layout/modal-contents/ApiError";
import {useForm} from "react-hook-form";
import {PasswordDTO} from "../../../../utils/api/dtos/account";
import Modal from "../../../hooks/Modal";
import OnSuccessModal from "../../../layout/modal-contents/OnSuccessModal";
import {Button} from "../../../layout/styled";

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
            openModal(<OnSuccessModal closeModal={closeModal} redirect={true} text={"Cuenta borrada con éxito"}/>);
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
        <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
            <p className={styles.attribute}>Borrar cuenta</p>

            <div className={styles.input}>
                <input
                    id={"password"}
                    type={passwordVisibility ? "password" : "text"}
                    autoComplete={"current-password"}
                    placeholder={"Contraseña actual"}
                    {...register("password", {
                        required: {value: true, message: "El valor no puede faltar"}
                    })}
                />
                <p className={styles.error}>{errors.password && errors.password.message}</p>
            </div>


            <Button disabled={!isValid} type={"submit"} $margin={"0 0 1rem 0"}>Borrar</Button>

        </form>;

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        {form}
    </>;
};

export default DeleteAccount;