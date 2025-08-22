    "use client";

    import { useEffect, useState } from "react";
    import './AddToCartButton.scss';
import { CartProduct } from "@/app/types/CartProduct";

    type Props = {
    id: number;
    };

    export const AddToCartButton: React.FC<Props> = ({ id }) => {
    const [alreadyInCart, setAlreadyInCart] = useState<
        CartProduct[] | null
    >(
        localStorage.getItem("productsInCart")
        ? JSON.parse(localStorage.getItem("productsInCart") as string)
        : null
    );
    const [isInCart, setIsInCart] = useState(false);
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        setAlreadyInCart(
        localStorage.getItem("productsInCart")
            ? JSON.parse(localStorage.getItem("productsInCart") as string)
            : null
        );
    }, [update]);

    useEffect(() => {
        if (alreadyInCart?.filter((p) => p.productId === id)[0]) {
        setIsInCart(true);
        }
    }, [alreadyInCart, id]);

    const onButtonClick = () => {
        if (!isInCart) {
        if (alreadyInCart) {
            localStorage.setItem(
            "productsInCart",
            JSON.stringify([...alreadyInCart, { productId: id, quanity: 1 }])
            );
        } else {
            localStorage.setItem(
            "productsInCart",
            JSON.stringify([{ productId: id, quanity: 1 }])
            );
        }
        }

        setUpdate((prev) => prev + 1);
    };

    return (
        <button className="addButton" onClick={onButtonClick} disabled={isInCart}>
        {isInCart ? "Already in Cart" : "Add to Cart"}
        </button>
    );
    };
