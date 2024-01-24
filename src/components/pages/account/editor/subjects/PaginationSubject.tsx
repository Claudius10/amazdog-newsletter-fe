import {useNavigate, useSearchParams} from "react-router-dom";
import {ChangeEvent} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {QueryOptions} from "@tanstack/react-query/build/modern/index";

type Props = {
    totalPages?: number;
    queryKey: string[];
    queryFn: (options: QueryOptions) => Promise<any>;
}

const PaginationSubject = (props: Props) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    let pageSize = searchParams.get("size");
    let pageNumber = searchParams.get("page");
    const queryClient = useQueryClient();

    const reload = async (pageSize: string | null, pageNumber: string | null) => {
        if (pageSize != null && pageNumber != null) {
            props.queryKey.push(pageNumber);
            props.queryKey.push(pageSize);
            await queryClient.ensureQueryData({
                queryKey: props.queryKey,
                queryFn: props.queryFn
            });
        }
    };

    const queryNewPage = async (selectedPageNumber: string) => {
        await reload(pageSize, selectedPageNumber);
    };

    const queryNewPageSize = async (selectedPageSize: string) => {
        await reload(selectedPageSize, pageNumber);
    };

    let pageArray: number[] = [];
    if (props.totalPages) {
        pageArray = Array.from(Array(props.totalPages), (e, i) => i + 1);
    }

    const changePage = async (event: ChangeEvent<HTMLSelectElement>) => {
        await queryNewPage(event.target.value);
        navigate(`?page=${event.target.value}&size=${pageSize}`);
    };

    const changePageSize = async (event: ChangeEvent<HTMLSelectElement>) => {
        await queryNewPageSize(event.target.value);
        navigate(`?page=${pageNumber}&size=${event.target.value}`);
    };

    return <div>
        <>
            <span>Página: </span>
            <select id={"pageNumber"} name={"pageNumber"} onChange={changePage}>
                {pageArray.map((number) => <option key={number} value={number}>{number}</option>)}
            </select>
        </>
        <>
            <span>Tamaño página: </span>
            <select id={"pageSize"} name={"pageSize"} onChange={changePageSize}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
            </select>
        </>
    </div>;
};

export default PaginationSubject;