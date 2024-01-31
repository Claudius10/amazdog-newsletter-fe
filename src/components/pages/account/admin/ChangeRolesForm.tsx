import {useForm} from "react-hook-form";
import styles from "./UserForm.module.css";
import {Button} from "../../../layout/styled";
import {useMutation} from "@tanstack/react-query";
import {updateUserRole} from "../../../../utils/api/admin-api";
import {ApiErrorDTO} from "../../../../utils/api/dtos/api";
import useModal from "../../../hooks/useModal";
import ApiError from "../../../layout/modal-contents/ApiError";
import Modal from "../../../hooks/Modal";
import OnSuccessModal from "../../../layout/modal-contents/OnSuccessModal";

type FormValues = {
    role: string;
    action: boolean;
}

type Props = {
    userId: number;
    toggleForm: () => void;
    refetch: () => void;
}

const ChangeRolesForm = (props: Props) => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const {register, handleSubmit, formState: {isValid, errors}} = useForm<FormValues>({
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    const updateRoles = useMutation(
        {
            mutationFn: updateUserRole,
            onSuccess: async (msg) => {
                openModal(<OnSuccessModal
                    closeModal={closeModal}
                    extraAction={props.toggleForm}
                    text={msg as string}
                    redirect={false}
                />);
                props.refetch();
            },
            onError: (error: ApiErrorDTO) => {
                openModal(<ApiError errorMsg={error.errorMsg} closeModal={closeModal}/>);
            }
        });

    const onSubmitHandler = (form: FormValues) => {
        updateRoles.mutate({roleName: form.role, userId: props.userId, add: form.action});
    };

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
            <p className={styles.attribute}></p>
            <div className={styles.input}>
                <select
                    id="type"
                    {...register("role", {
                        required: {value: true, message: "Elija una opción"},
                    })}>
                    <option value={""} hidden>Seleccionar privilegio</option>
                    <option value={"USUARIO"}>USUARIO</option>
                    <option value={"EDITOR"}>EDITOR</option>
                    <option value={"ADMINISTRADOR"}>ADMINISTRADOR</option>
                </select>
                <p className={styles.error}>{errors.role?.message}</p>
            </div>

            <div className={styles.input}>
                <select
                    id="type"
                    {...register("action", {
                        required: {value: true, message: "Elija una opción"},
                    })}>
                    <option value={""} hidden>Seleccionar acción</option>
                    <option value={"true"}>AÑADIR</option>
                    <option value={"false"}>ELIMINAR</option>
                </select>
                <p className={styles.error}>{errors.action?.message}</p>
            </div>
            <Button disabled={!isValid} type={"submit"} $margin={"0 0 1rem 0"}>Continuar</Button>
        </form>
    </>;
};

export default ChangeRolesForm;