// eslint-disable-next-line no-unused-vars
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../components/Header";

describe("Header Component", () => {
  test("renders Covid Tracker text", () => {
    render(<Header />);
    const linkElement = screen.getByRole("link", { name: /covid tracker/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });

  test("has correct background color", () => {
    render(<Header />);
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toHaveClass("bg-purple-800");
  });
});
