import styles from "./ActivateAccount.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {activationFn} from "../../../utils/api/auth-api";
import {useEffect, useState} from "react";
import {BounceLoader} from "react-spinners";

const ActivateAccount = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    let {token} = useParams();

    const activate = useMutation({
        mutationFn: activationFn,
        onSuccess: () => {
            setIsLoading(false);
            setTimeout(() => {
                navigate("/authentication");
            }, 2000);
        }
    });

    useEffect(() => {
        if (token != null) {
            activate.mutate(token);
        }
    }, []);

    return <div className={styles.layout}>
        <p>Estamos activando tu cuenta...</p>
        <BounceLoader color="#ffb12c" loading={isLoading}/>
        {activate.isSuccess && <p>!Tu cuenta ha sido activada! Redireccionando en un momento...</p>}
    </div>;
};

export default ActivateAccount;