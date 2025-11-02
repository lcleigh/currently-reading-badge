import { render, screen, fireEvent } from "@testing-library/react";
import BookSearch from "./BookSearch";

test("renders search input and button", () => {
  const mockOnSearch = jest.fn();

  render(<BookSearch onSearch={mockOnSearch} />);

  expect(screen.getByPlaceholderText(/Search for a book/i)).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
});

test("calls onSearch when button is clicked", () => {
  const mockOnSearch = jest.fn();
  render(<BookSearch onSearch={mockOnSearch} />);

  const input = screen.getByPlaceholderText(/Search for a book/i);
  const button = screen.getByRole("button");

  fireEvent.change(input, { target: { value: "1984" } });
  fireEvent.click(button);

  expect(mockOnSearch).toHaveBeenCalledWith("1984");
});

test("does not call onSearch when input is empty", () => {
    const mockOnSearch = jest.fn();
    render(<BookSearch onSearch={mockOnSearch} />);
  
    const button = screen.getByRole("button");
    fireEvent.click(button);
  
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  test("calls onSearch when Enter key is pressed", () => {
    const mockOnSearch = jest.fn();
    render(<BookSearch onSearch={mockOnSearch} />);
  
    const input = screen.getByPlaceholderText(/Search for a book/i);
    fireEvent.change(input, { target: { value: "1984" } });
    fireEvent.keyDown(input, { key: "Enter" });
  
    expect(mockOnSearch).toHaveBeenCalledWith("1984");
  });

  test("trims whitespace from input", () => {
    const mockOnSearch = jest.fn();
    render(<BookSearch onSearch={mockOnSearch} />);
  
    const input = screen.getByPlaceholderText(/Search for a book/i);
    const button = screen.getByRole("button");
  
    fireEvent.change(input, { target: { value: "  1984  " } });
    fireEvent.click(button);
  
    expect(mockOnSearch).toHaveBeenCalledWith("1984");
  });