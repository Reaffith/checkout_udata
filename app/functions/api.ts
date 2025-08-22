import { ProductsResponse } from "../types/ProductsResponse";

const BASE_URL = "https://dummyjson.com/products";

export const getProducts = async (
  page: number = 1,
  order?: "asc" | "desc"
): Promise<ProductsResponse> => {
  try {
    const url = new URL(BASE_URL);
    url.searchParams.append("skip", `${30 * (page - 1)}`);
    if (order) {
      url.searchParams.append("sortBy", "price");
      url.searchParams.append("order", order);
    }

    const result = await fetch(url.toString(), { cache: "no-store" });
    if (!result.ok) {
      throw new Error("Error while fetching products");
    }

    return await result.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error while fetching products");
  }
};

export const getOneProduct = async (id: string) => {
  try {
    const result = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });

    if (!result.ok) {
      throw new Error("Error while fetching product");
    }

    return await result.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error while fetching product");
  }
};
