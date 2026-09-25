import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import ProductList from "./ProductList";
import { CATEGORIES } from "../config";

jest.mock("axios", () => ({ get: jest.fn(), post: jest.fn(), put: jest.fn() }));

const products = [
  { productId: 1, name: "Classic Oxford Shirt", description: "Cotton shirt", price: 1299, imageUrls: ["/products/a.svg"] },
  { productId: 2, name: "Denim Jacket", description: "Denim", price: 2499, imageUrls: [] },
  { productId: 3, name: "Chino Trousers", description: "Chinos", price: 1599, imageUrls: [] },
];

const renderList = (props = {}) =>
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<ProductList category={CATEGORIES.mens} {...props} />} />
        <Route path="/login" element={<p>Login page</p>} />
      </Routes>
    </MemoryRouter>
  );

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
  axios.get.mockResolvedValue({ data: products });
});

test("loads and shows the products of a category", async () => {
  renderList();

  expect(await screen.findByText("Classic Oxford Shirt")).toBeInTheDocument();
  expect(screen.getByText("₹2499.00")).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("/api/products/category/mens%20wear"));
});

test("shows a preview and a link to more products when limited", async () => {
  renderList({ limit: 2 });

  await screen.findByText("Classic Oxford Shirt");
  expect(screen.queryByText("Chino Trousers")).not.toBeInTheDocument();
  expect(screen.getByText("View more products")).toBeInTheDocument();
});

test("sends visitors who are not logged in to the login page", async () => {
  renderList();

  fireEvent.click((await screen.findAllByText("Add to Cart"))[0]);

  expect(await screen.findByText("Login page")).toBeInTheDocument();
  expect(axios.post).not.toHaveBeenCalled();
});

test("adds a product to the cart for a logged-in customer", async () => {
  localStorage.setItem("userEmail", "asha@example.com");
  axios.post.mockResolvedValue({ data: {} });
  renderList();

  fireEvent.click((await screen.findAllByText("Add to Cart"))[0]);

  await waitFor(() =>
    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining("/api/cart/add"), null, {
      params: { customerEmail: "asha@example.com", productId: 1, quantity: 1 },
    })
  );
  expect(await screen.findByText("Added ✓")).toBeInTheDocument();
});

test("shows an error when the backend is unreachable", async () => {
  axios.get.mockRejectedValue(new Error("Network Error"));
  renderList();

  expect(await screen.findByText(/Could not load products/)).toBeInTheDocument();
});
