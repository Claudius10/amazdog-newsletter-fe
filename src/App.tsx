import styles from './App.module.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RouterProvider} from "react-router-dom";
import Routes from "./components/Routes";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

// TODO - Add password reset functionality
// TODO - Add jwt expiration check for api calls
// TODO - Define all onSuccess/onError for Mutations
// TODO - Add warning to only have one dataset per doughnut chart
// TODO - Desktop and mobile styling

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
