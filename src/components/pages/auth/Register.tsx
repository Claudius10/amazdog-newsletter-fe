import styles from "./Register.module.css";
import PwVisibilityIcon from "../../../resources/Imagenes/pwvisibility.png";
import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {RegisterDTO} from "../../../utils/api/dtos/auth";
import {useMutation} from "@tanstack/react-query";
import {ApiErrorDTO} from "../../../utils/api/dtos/api";
import {registerFn} from "../../../utils/api/auth-api";
import {emailRgx, esCharsRegex, passwordRegex} from "../../../utils/regex";
import CircleIcon from "../../layout/CircleIcon";
import useModal from "../../hooks/useModal";
import Modal from "../../hooks/Modal";
import RegisterModalContent from "../../layout/modal-contents/RegisterModalContent";

const Register = () => {
    const {isModalOpen, modalContent, openModal, closeModal} = useModal();
    const [passwordVisibility, setPwVisibility] = useState(true);
    const [apiError, setApiError] = useState<string | undefined>(undefined);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm<RegisterDTO>({
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    const registration = useMutation({
        mutationFn: registerFn,
        onSuccess: () => {
            navigate("/");
            openModal(<RegisterModalContent closeModal={closeModal}/>);
        },
        onError: (error: ApiErrorDTO) => {
            setApiError(error.errorMsg);
        }
    });

    const togglePwVisibility = () => {
        setPwVisibility(!passwordVisibility);
    };

    const onSubmitHandler = (form: RegisterDTO) => {
        registration.mutate(form);
    };

    const formJSX = (
        <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
            <div className={styles.register}>

                <div className={styles["register-input"]}>
                    <div className={styles["input-container"]}>
                        <input
                            id={"name"}
                            type={"text"}
                            className={styles.input}
                            autoComplete={"name"}
                            placeholder={"Nombre y apellido(s)"}
                            {...register("name", {
                                required: {value: true, message: "El nombre no puede faltar"},
                                pattern: {
                                    value: esCharsRegex,
                                    message: "Solo se aceptan letras"
                                },
                                minLength: {
                                    value: 2,
                                    message: "La longitud mínima del nombre es de 2 caracteres"
                                },
                                maxLength: {
                                    value: 50,
                                    message: "La longitud máxima del nombre es de 50 caracteres"
                                }
                            })}
                        />
                    </div>
                    <p className={styles.formError}>{errors.name?.message}</p>
                </div>

                <div className={styles["register-input"]}>
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
                                maxLength: {value: 100, message: "La longitud máxima del email es de 100 caracteres"}
                            })}
                        />
                    </div>
                    <p className={styles.formError}>{errors.email?.message}</p>
                </div>

                <div className={styles["register-input"]}>
                    <div className={styles["input-container"]}>
                        <input
                            id={"matchingEmail"}
                            type={"email"}
                            className={styles.input}
                            autoComplete={"email"}
                            placeholder={"Confirmar correo electrónico"}
                            {...register("matchingEmail", {
                                required: {value: true, message: "El email no puede faltar"},
                                pattern: {
                                    value: emailRgx,
                                    message: "Compruebe el email introducido"
                                },
                                maxLength: {value: 100, message: "Confirme el email introducido"}
                            })}
                        />
                    </div>
                    <p className={styles.formError}>{errors.matchingEmail?.message}</p>
                </div>

                <div className={styles["register-input"]}>
                    <div className={styles["input-field"]}>
                        <div className={styles["input-container"]}>
                            <input
                                id={"password"}
                                type={passwordVisibility ? "password" : "text"}
                                className={styles.input}
                                autoComplete={"new-password"}
                                placeholder={"Contraseña"}
                                {...register("password", {
                                    required: {value: true, message: "La contraseña no puede faltar"},
                                    pattern: {
                                        value: passwordRegex,
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
                                alt={"toggle-password-visibility-icon"}/>
                        </div>
                    </div>
                    <p className={styles.formError}>{errors.password?.message}</p>
                </div>

                <div className={styles["register-input"]}>
                    <div className={styles["input-field"]}>
                        <div className={styles["input-container"]}>
                            <input
                                id={"matchingPassword"}
                                type={passwordVisibility ? "password" : "text"}
                                className={styles.input}
                                autoComplete={"new-password"}
                                placeholder={"Confirmar contraseña"}
                                {...register("matchingPassword", {
                                    required: {value: true, message: "Confirme la contraseña introducida"}
                                })}
                            />
                        </div>
                        <div className={styles.pwIcon}>
                            <CircleIcon
                                action={togglePwVisibility}
                                icon={PwVisibilityIcon}
                                width={"14px"}
                                height={"14px"}
                                alt={"toggle-password-visibility-icon"}
                            />
                        </div>
                    </div>
                    <p className={styles.formError}>{errors.matchingPassword?.message}</p>
                </div>
            </div>
            <button type={"submit"} disabled={!isValid}
                    className={isValid ? styles.registerBttn : styles.registerBttnInvalid}>Registrar
            </button>
        </form>
    );

    const contentJSX =
        <div className={styles.layout}>
            <p className={styles.header}>Crear cuenta</p>
            {formJSX}
            {registration.isError && <p>{apiError}</p>}
            <div className={styles["go-to-login"]}>
                <p>¿Ya tienes cuenta?</p>
                <NavLink to={"/authentication"} className={styles["login-link"]}>Iniciar sesión</NavLink>
            </div>
        </div>;

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        {contentJSX}
    </>;
};

export default Register;