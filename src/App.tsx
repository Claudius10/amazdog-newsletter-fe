import styles from './App.module.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RouterProvider} from "react-router-dom";
import Routes from "./components/Routes";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

// TODO - style modals
// TODO - style acc activation comp
// TODO - style pw request comp
// TODO - style pw change comp
// TODO - Add warning to only have one dataset per doughnut chart
// TODO - style editor
// TODO - do admin panel and style

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
