import { useEffect, useState, memo } from "react";
import { CartProduct as CartProductType } from "@/app/types/CartProduct";
import { Product } from "@/app/types/Product";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import "./CartProduct.scss";

type Props = {
  product: Product;
  cartItem: CartProductType;
  onUpdate: () => void;
};

const CartProduct: React.FC<Props> = ({ product, cartItem, onUpdate }) => {
  const [quantity, setQuantity] = useState(cartItem.quanity);

  useEffect(() => {
    setQuantity(cartItem.quanity);
  }, [cartItem.quanity]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = JSON.parse(localStorage.getItem("productsInCart") || "[]") as CartProductType[];
    const updatedItemIndex = updatedCart.findIndex((item) => item.productId === cartItem.productId);
    
    if (updatedItemIndex !== -1) {
      updatedCart[updatedItemIndex] = { ...cartItem, quanity: newQuantity };
      localStorage.setItem("productsInCart", JSON.stringify(updatedCart));
      setQuantity(newQuantity);
      onUpdate();
    }
  };

  const handleDelete = () => {
    const updatedCart = JSON.parse(localStorage.getItem("productsInCart") || "[]") as CartProductType[];
    const filteredCart = updatedCart.filter((item) => item.productId !== cartItem.productId);
    localStorage.setItem("productsInCart", JSON.stringify(filteredCart));
    onUpdate();
  };

  const incrementQuantity = () => handleQuantityChange(quantity + 1);
  const decrementQuantity = () => handleQuantityChange(quantity - 1);

  return (
    <article className="cartProduct">
      <div className="cartProduct__info">
        <Image
          src={product.images[0] || "/placeholder-image.jpg"}
          alt={product.title}
          width={150}
          height={150}
          className="cartProduct__info--image"
        />
        <div className="cartProduct__info--block">
          <h2 className="cartProduct__info--block--price">${product.price.toFixed(2)}</h2>
          <h2 className="cartProduct__info--block--header">{`${product.brand} ${product.title}`}</h2>
        </div>
      </div>

      <div className="cartProduct__controls">
        <div className="cartProduct__controls--quanity">
          <button
            className="cartProduct__controls--quanity--button"
            onClick={decrementQuantity}
          >
            -
          </button>
          <input
            type="number"
            className="cartProduct__controls--quanity--input"
            value={quantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            min="1"
          />
          <button
            className="cartProduct__controls--quanity--button"
            onClick={incrementQuantity}
          >
            +
          </button>
        </div>
        <button className="cartProduct__controls--delete" onClick={handleDelete}>
          <MdDelete />
        </button>
      </div>
    </article>
  );
};

export const MemoCartProduct = memo(CartProduct);