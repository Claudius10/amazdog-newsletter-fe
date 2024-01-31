import {useForm} from "react-hook-form";
import styles from "./UserForm.module.css";
import {Button} from "../../../layout/styled";

type FormValues = {
    email: string;
}

type Props = {
    setUserEmail: (email: string) => void;
}

const UserForm = (props: Props) => {
    const {register, handleSubmit, formState: {isValid, errors}} = useForm<FormValues>({
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    const onSubmitHandler = (form: FormValues) => {
        props.setUserEmail(form.email);
    };

    return <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <p className={styles.attribute}>Buscar usuario</p>
        <div className={styles.input}>
            <input
                id={"userEmail"}
                type={"email"}
                placeholder={"Correo electrónico"}
                {...register("email", {
                    required: {value: true, message: "El email no puede faltar"},
                    minLength: {value: 2, message: "Mínimo 2 caracteres"},
                    maxLength: {value: 50, message: "Máximo 50 caracteres"}
                })}
            />
            <p className={styles.error}>{errors.email && errors.email.message}</p>
        </div>
        <Button disabled={!isValid} type={"submit"} $margin={"0 0 1rem 0"}>Continuar</Button>
    </form>;

};

export default UserForm;