import { createContext, useReducer, useEffect } from "react";
import reducers from "./reducers";
import { getData } from "@/utils/fetchData";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const initState = { notify: {}, auth: {}, cart: [] };
    const [state, dispatch] = useReducer(reducers, initState);

    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin");
        if (firstLogin) {
            getData("auth/accessToken").then((res) => {
                if (res.arr) return localStorage.removeItem("firstLogin");
                dispatch({
                    type: "AUTH",
                    payload: {
                        token: res.access_token,
                        user: res.user,
                    },
                });
            });
        }
    }, []);
    return (
        <DataContext.Provider value={[state, dispatch]}>
            {children}
        </DataContext.Provider>
    );
};
