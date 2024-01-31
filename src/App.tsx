import styles from './App.module.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RouterProvider} from "react-router-dom";
import Routes from "./components/Routes";

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
