import { createContext, useReducer, useEffect } from "react";
import reducers from "./reducers";
import { getData } from "@/utils/fetchData";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const initState = {
        notify: {},
        auth: {},
        cart: { products: [], totalQty: 0, totalPrice: 0 },
    };
    const [state, dispatch] = useReducer(reducers, initState);
    const { cart } = state;

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

    useEffect(() => {
        const __next__cart = JSON.parse(localStorage.getItem("__next__cart"));
        if (__next__cart)
            dispatch({ type: "ADD_TO_CART", payload: __next__cart });
    }, []);
    useEffect(() => {
        localStorage.setItem("__next__cart", JSON.stringify(cart));
    }, [cart]);
    return (
        <DataContext.Provider value={[state, dispatch]}>
            {children}
        </DataContext.Provider>
    );
};
