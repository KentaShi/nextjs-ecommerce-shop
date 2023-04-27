import { createContext, useReducer } from "react";
import reducers from "./reducers";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const initState = { notify: {}, auth: {} };
    const [state, dispatch] = useReducer(reducers, initState);
    return (
        <DataContext.Provider value={[state, dispatch]}>
            {children}
        </DataContext.Provider>
    );
};
