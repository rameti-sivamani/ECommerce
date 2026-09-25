// Base URL of the Spring Boot API. Set REACT_APP_API_URL to point at another server.
export const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export const CATEGORIES = {
  mens: { name: "mens wear", title: "Men's Wear", path: "/products/category/menswear" },
  womens: { name: "womens wear", title: "Women's Wear", path: "/products/category/womenswear" },
  kids: { name: "kids wear", title: "Kids' Wear", path: "/products/category/kidswear" },
};
