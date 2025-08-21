import { notFound } from "next/navigation";
import { getProducts } from "./functions/api";
import { ProductsResponse } from "./types/ProductsResponse";
import { MemoProductCard } from "./components/ProductCard/ProductCard";
import "./home.scss";
import Link from "next/link";

interface PageProps {
  searchParams: { page?: string; order?: "asc" | "desc" };
}

export default async function Home({ searchParams }: PageProps) {
  const page = searchParams.page ? +searchParams.page : 1;
  const order = searchParams.order || undefined;

  let apiCallResult: ProductsResponse | undefined;

  try {
    apiCallResult = await getProducts(page, order);
  } catch {
    return notFound();
  }

  const products = apiCallResult.products;
  const pages = Array.from(
    { length: Math.ceil(apiCallResult.total / 30) },
    (_, k) => k + 1
  );

  return (
    <main className="home">
      <h1 className="home__header">Product List</h1>

      <div className="home__sorting">
        <p className="home__sorting--text">Sort by</p>

        <Link className="home__sorting--link" href={{ pathname: "/", query: { page: page.toString(), order: "asc" } }}>
          Price: Low to High
        </Link>

        <Link className="home__sorting--link" href={{ pathname: "/", query: { page: page.toString(), order: "desc" } }}>
          Price: High to Low
        </Link>
      </div>

      <div className="home__list">
        {products.map((product) => (
          <MemoProductCard product={product} key={product.id} />
        ))}
      </div>

      <div className="home__pagination">
        {pages.map((page) => (
          <Link
            href={{
              pathname: "/",
              query: { page: page.toString(), order: order || undefined },
            }}
            className="home__pagination--item"
            key={page}
          >
            {page}
          </Link>
        ))}
      </div>
    </main>
  );
}
