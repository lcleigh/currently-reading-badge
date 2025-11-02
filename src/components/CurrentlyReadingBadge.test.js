import { render, screen } from "@testing-library/react";
import CurrentlyReadingBadge from "./CurrentlyReadingBadge";

test("renders the book title", () => {
  render(<CurrentlyReadingBadge />);
  const text = screen.getByText(/Currently reading: Pride and Prejudice/i);
  expect(text).toBeInTheDocument();
});