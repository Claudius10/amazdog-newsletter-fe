import styles from "./ErrorPage.module.css";
import {useRouteError, isRouteErrorResponse} from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div className={styles.error}>
                <h1>Oops!</h1>
                <h2>{error.status}</h2>
                <p>{error.statusText}</p>
                {error.data?.message && <p>{error.data.message}</p>}
            </div>
        );
    } else {
        return (
            <div>
                <div className={styles.error}>
                    <span>Oops...</span>
                    <p>
                        {" "}
                        Ocurrió un error. Si crees que esto no debería suceder, contacta con
                        nosotros.
                    </p>
                </div>
            </div>
        );
    }
};

export default ErrorPage;
