import styles from "./Login.module.css";
import PwVisibilityIcon from "../../../resources/Imagenes/pwvisibility.png";
import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {LoginDTO, LoginSuccessDTO} from "../../../utils/api/dtos/auth";
import {useMutation} from "@tanstack/react-query";
import {loginFn} from "../../../utils/api/auth-api";
import {ApiErrorDTO} from "../../../utils/api/dtos/api";
import {emailRgx} from "../../../utils/regex";
import CircleIcon from "../../layout/CircleIcon";
import {useAppDispatch} from "../../../store/reduxHooks";
import {authActions} from "../../../store/auth-slice";

const Login = () => {
    const [passwordVisibility, setPwVisibility] = useState(true);
    const [apiError, setApiError] = useState<string | undefined>(undefined);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm<LoginDTO>({
        mode: "onBlur",
        reValidateMode: "onBlur",
    });

    const login = useMutation({
        mutationFn: loginFn,
        onSuccess: (response: LoginSuccessDTO) => {
            navigate("/");
            localStorage.setItem("ACCESS_TOKEN", response.ACCESS_TOKEN);
            localStorage.setItem("ACCESS_EXP", response.ACCESS_EXP);
            localStorage.setItem("USER_EMAIL", response.USER_EMAIL);
            localStorage.setItem("USER_NAME", response.USER_NAME);
            localStorage.setItem("USER_ID", response.USER_ID);
            localStorage.setItem("USER_ROLE", response.USER_ROLE);
        },
        onError: (error: ApiErrorDTO) => {
            setApiError(error.errorMsg);
        },
    });

    const togglePwVisibility = () => {
        setPwVisibility(!passwordVisibility);
    };

    const onSubmitHandler = (form: LoginDTO) => {
        login.mutate(form);
    };

    const formJSX = (
        <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
            <div className={styles.login}>
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

                <div className={styles["login-input"]}>
                    <div className={styles["input-field"]}>
                        <div className={styles["input-container"]}>
                            <input
                                id={"password"}
                                type={passwordVisibility ? "password" : "text"}
                                className={styles.input}
                                autoComplete={"current-password"}
                                placeholder={"Contraseña"}
                                {...register("password", {
                                    required: {value: true, message: "La contraseña no puede faltar"}
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
                    <p className={styles.formError}>{errors.password?.message}</p>
                </div>
            </div>
            <button type={"submit"} disabled={!isValid}
                    className={isValid ? styles.loginBttn : styles.loginBttnInvalid}>Entrar
            </button>
        </form>
    );

    const contentJSX = (
        <div className={styles.layout}>
            <p className={styles.header}>Iniciar sesión</p>
            {formJSX}
            {login.isError && <p>{apiError}</p>}
            <div className={styles["go-to-register"]}>
                <p>¿Aún no tienes cuenta?</p>
                <NavLink to={"/register"} className={styles["register-link"]}>Regístrate aquí</NavLink>
            </div>
        </div>
    );

    return contentJSX;
};

export default Login;