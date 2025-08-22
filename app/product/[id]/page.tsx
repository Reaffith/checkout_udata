import "./ProductPage.scss";
import { Product } from "@/app/types/Product";
import { getOneProduct } from "@/app/functions/api";
import { notFound } from "next/navigation";
import { ImageBlock } from "@/app/components/ImageBlock/ImageBlock";
import { AddToCartButton } from "@/app/components/AddToCartButton/AddToCartButton";

type Props = {
  params: { id: string };
};

export default async function ProductPage({ params }: Props) {
  const { id } = params;
  let product: Product;

  try {
    product = await getOneProduct(id);
  } catch {
    return notFound();
  }

  return (
    <main className="product">
      <h1 className="product__header">{product.title}</h1>

      <ImageBlock images={product.images} />

      <div className="product__details">
        <p className="product__details--description">{product.description}</p>
        <p className="product__details--price">${product.price.toFixed(2)}</p>
        <p className="product__details--brand">Brand: {product.brand}</p>
      </div>

      <div className="product__reviews">
        <h2 className="product__reviews--header">Reviews</h2>
        {product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div className="product__reviews--item" key={index}>
              <p className="product__reviews--rating">
                Rating: {review.rating}/5
              </p>
              <p className="product__reviews--comment">{review.comment}</p>
              <p className="product__reviews--reviewer">
                - {review.reviewerName} ({review.date})
              </p>
            </div>
          ))
        ) : (
          <p className="product__reviews--no-reviews">No reviews yet.</p>
        )}
      </div>

      <AddToCartButton id={product.id} />
    </main>
  );
};
