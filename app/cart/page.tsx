"use client";
import { useEffect, useState } from "react";
import { CartProduct } from "../types/CartProduct";
import "./cart.scss";
import { Product } from "../types/Product";
import { getOneProduct } from "../functions/api";
import { MemoCartProduct } from "@/app/components/CartProduct/CartProduct";

export default function Cart() {
  const [alreadyInCart, setAlreadyInCart] = useState<CartProduct[] | null>(
    localStorage.getItem("productsInCart")
      ? JSON.parse(localStorage.getItem("productsInCart") as string)
      : null
  );
  const [productsInCart, setProductsInCart] = useState<Product[]>([]);
  const [update, setUpdate] = useState(0);
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    alreadyInCart?.forEach((p) => {
      const getProduct = async () => {
        try {
          const result = await getOneProduct(p.productId.toString());
          setProductsInCart((prev) =>
            prev.some((item) => item.id === result.id)
              ? prev
              : [...prev, result]
          );
        } catch (error) {
          console.log(error);
          return new Error("Can't load product in cart");
        }
      };
      getProduct();
    });
  }, [alreadyInCart]);

  useEffect(() => {
    setAlreadyInCart(
      localStorage.getItem("productsInCart")
        ? JSON.parse(localStorage.getItem("productsInCart") as string)
        : null
    );
  }, [update]);

  const handleUpdate = () => {
    setUpdate((prev) => prev + 1);
  };

  const onPromoApply = async () => {
    try {
      const result = await fetch("/api/promocode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promocode: promo }),
      });

      if (!result.ok) throw new Error("Invalid promocode");
      const data = await result.json();
      setDiscount(data.discountPercent || 0);
    } catch (error) {
      console.error("Error while applying promocode:", error);
      setDiscount(0); 
    }
    setPromo("");
  };

  const calculateTotal = () => {
    return productsInCart.reduce((total, product) => {
      const cartItem = alreadyInCart?.find((item) => item.productId === product.id);
      return total + (product.price * (cartItem?.quanity || 0));
    }, 0);
  };

  const totalPrice = calculateTotal();
  const discountedPrice = totalPrice * (1 - discount / 100);

  return (
    <main className="cart">
      <div className="cart_products">
        {productsInCart.map((product) => {
          const cartItem = alreadyInCart?.find((item) => item.productId === product.id);
          return cartItem ? (
            <MemoCartProduct
              key={product.id}
              product={product}
              cartItem={cartItem}
              onUpdate={handleUpdate}
            />
          ) : null;
        })}
      </div>

      <div className="cart_promo">
        <p className="cart_promo-total">Total: ${totalPrice.toFixed(2)}</p>
        <input
          type="text"
          className="cart_promo-input"
          placeholder="Promocode"
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
        />
        <button className="cart_promo-total-button" onClick={onPromoApply}>
          Apply Promo
        </button>
        <p className="cart_promo-discount">Discount: {discount}%</p>
        <p className="cart_promo-final">Final Price: ${discountedPrice.toFixed(2)}</p>

        <button className="cart_promo-total-button final" disabled title="Not Implemented">
            Purchase
        </button>
      </div>
    </main>
  );
}