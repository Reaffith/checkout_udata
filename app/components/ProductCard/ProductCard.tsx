import { Product } from "@/app/types/Product";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import './ProductCard.scss'


type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <article className="card">
      <Image
        src={product.images[0]}
        alt={product.title}
        width={300}
        height={200}
        className="card__img"
      />

      <div className="card__info">
        <p className="card__info--text">{product.title}</p>

        <p className="card__info--text">${product.price}</p>
      </div>

      <div className="card__description">
        <p className="card__description--text">Brand: {product.brand}</p>
        <p className="card__description--text">
          Reviews: {product.reviews.length}
        </p>
      </div>

      <Link href={`/product/${product.id}`} className="card__link" >See more</Link>
    </article>
  );
};


export const MemoProductCard = memo(ProductCard);