import styles from './App.module.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RouterProvider} from "react-router-dom";
import Routes from "./components/Routes";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

// TODO - LOW Show Text warning of: if a ChartData has a subject whose statistics have been all deleted, also delete the subject from the ChartData
// TODO - LOW show text warning that charts at /estadísticas public page only refresh with tab refresh
// TODO - LOW add/remove subject to chart

function App() {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 600000,
            },
            mutations: {},
        },
    });

    const router = Routes();

    return <div className={styles.wrapper}>
        <QueryClientProvider client={queryClient}>

            <RouterProvider router={router}/>
        </QueryClientProvider>
    </div>;
}

export default App;
