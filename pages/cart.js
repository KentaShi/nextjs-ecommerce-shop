import CartItem from "@/components/CartItem";
import { DataContext } from "@/store/globalState";
import { useContext } from "react";

const cart = () => {
    const [state, dispatch] = useContext(DataContext);
    const {
        cart: { products, totalQty },
    } = state;
    console.log(products, totalQty);
    return (
        <div>
            {totalQty === 0 ? (
                <div>Cart is empty</div>
            ) : (
                products.map((item, index) => (
                    <CartItem
                        key={index}
                        product={item.product}
                        qty={item.qty}
                    />
                ))
            )}
        </div>
    );
};

export default cart;
