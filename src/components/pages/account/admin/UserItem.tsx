import styles from "./UserItem.module.css";
import {disableAccount, enableAccount, findUserByEmail} from "../../../../utils/api/admin-api";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {UserDTO} from "../../../../utils/api/dtos/account";
import UserForm from "./UserForm";
import {Button} from "../../../layout/styled";
import ChangeRolesForm from "./ChangeRolesForm";
import useModal from "../../../hooks/useModal";
import Modal from "../../../hooks/Modal";
import OnSuccessModal from "../../../layout/modal-contents/OnSuccessModal";
import {ApiErrorDTO} from "../../../../utils/api/dtos/api";
import ApiError from "../../../layout/modal-contents/ApiError";

const UserItem = () => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string | undefined>(undefined);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const {isError, isLoading, isSuccess, data: user, refetch} = useQuery(
        {
            queryKey: ["find", "user", "by", userEmail],
            queryFn: findUserByEmail,
            enabled: false
        });

    useEffect(() => {
        if (userEmail !== undefined) {
            refetch();
        }
    }, [userEmail]);

    const activateAccount = useMutation(
        {
            mutationFn: enableAccount,
            onSuccess: (msg) => {
                openModal(<OnSuccessModal
                    closeModal={closeModal}
                    text={msg as string}
                    redirect={false}
                />);
            },
            onError: (error: ApiErrorDTO) => {
                openModal(<ApiError errorMsg={error.errorMsg} closeModal={closeModal}/>);
            }
        });

    const deactivateAccount = useMutation(
        {
            mutationFn: disableAccount,
            onSuccess: (msg) => {
                openModal(<OnSuccessModal
                    closeModal={closeModal}
                    text={msg as string}
                    redirect={false}
                />);
            },
            onError: (error: ApiErrorDTO) => {
                openModal(<ApiError errorMsg={error.errorMsg} closeModal={closeModal}/>);
            }
        });

    const updateAccountState = (isEnabled: boolean, email: string) => {
        if (isEnabled) {
            deactivateAccount.mutate(email);
        } else {
            activateAccount.mutate(email);
        }
    };

    let content;
    if (isLoading) {
        content = <p className={styles.placeholder}>Cargando...</p>;
    } else if (isError) {
        content = <p className={styles.placeholder}>Ocurrió un error</p>;
    } else if (isSuccess && typeof user === 'string') {
        content = <p className={styles.error}>{user as string}</p>;
    } else if (isSuccess && (user as UserDTO).id) {
        let theUser = (user as UserDTO);
        content =
            <div className={styles.user}>
                <p className={styles.text}>Nombre: <span className={styles.highlight}>{theUser.name}</span></p>
                <p className={styles.text}>Email: <span className={styles.highlight}>{theUser.email}</span></p>
                <div className={styles.text}>Privilegios: {theUser.roles.map((role, index) =>
                    <span className={styles.highlight} key={role.id}>{(index ? ', ' : '') + role.authority}</span>)}
                </div>
                <div className={styles.buttons}>
                    <Button
                        $margin={"0.5rem 0 0 0"}
                        $height={"2rem"}
                        $width={"9.5rem"}
                        onClick={toggleForm}>
                        Modificar privilegios
                    </Button>
                    <Button
                        $margin={"0.5rem 0 0 0"}
                        $height={"2rem"}
                        $width={"8.5rem"}
                        onClick={() => {
                            updateAccountState(theUser.isEnabled, theUser.email);
                        }}>
                        {theUser.isEnabled ? "Desactivar cuenta" : "Activar cuenta"}
                    </Button>
                </div>
            </div>;
    }

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        <div className={styles.layout}>
            <UserForm setUserEmail={setUserEmail}/>
            {content}
            {showForm && <ChangeRolesForm
                userId={(user as UserDTO).id}
                refetch={refetch}
                toggleForm={toggleForm}
            />}
        </div>
    </>;
};

export default UserItem;