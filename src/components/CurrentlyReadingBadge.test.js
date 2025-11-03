import { render, screen, waitFor } from "@testing-library/react";
import CurrentlyReadingBadge from "./CurrentlyReadingBadge";

// Mock fetch globally
global.fetch = jest.fn();

describe("CurrentlyReadingBadge", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test("shows loading state initially", () => {
    fetch.mockImplementation(() => new Promise(() => {})); // Never resolves
    
    render(<CurrentlyReadingBadge bookTitle="Pride and Prejudice" />);
    
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("renders book title, author, and publication year when API call succeeds", async () => {
    const mockResponse = {
      docs: [
        {
          title: "Pride and Prejudice",
          author_name: ["Jane Austen"],
          cover_i: 12345,
          first_publish_year: 1813,
        },
      ],
    };
  
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });
  
    render(<CurrentlyReadingBadge bookTitle="Pride and Prejudice" />);
  
    await waitFor(() => {
      expect(screen.getByText(/Currently Reading: Pride and Prejudice/i)).toBeInTheDocument();
      expect(screen.getByText(/by Jane Austen/i)).toBeInTheDocument();
      expect(screen.getByText(/First published 1813/i)).toBeInTheDocument();
    });
  });

  test("handles book without author", async () => {
    const mockResponse = {
      docs: [
        {
          title: "Mystery Book",
          author_name: null,
        },
      ],
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<CurrentlyReadingBadge bookTitle="Mystery Book" />);

    await waitFor(() => {
        expect(screen.getByText(/Currently Reading: Mystery Book/i)).toBeInTheDocument();
        expect(screen.getByText(/by Unknown Author/i)).toBeInTheDocument();
    });
  });

  test("shows book title when API call fails", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    render(<CurrentlyReadingBadge bookTitle="Pride and Prejudice" />);

    await waitFor(() => {
      expect(screen.getByText(/Currently Reading: Pride and Prejudice/i)).toBeInTheDocument();
    });
  });

  test("shows book not found when no results", async () => {
    const mockResponse = {
      docs: [],
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<CurrentlyReadingBadge bookTitle="Nonexistent Book" />);

    await waitFor(() => {
      expect(screen.getByText(/Book not found: Nonexistent Book/i)).toBeInTheDocument();
    });
  });

  test("handles book without publication year", async () => {
    const mockResponse = {
      docs: [
        {
          title: "Mystery Book",
          author_name: ["Unknown Author"],
          cover_i: 12345,
          first_publish_year: null,
        },
      ],
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<CurrentlyReadingBadge bookTitle="Mystery Book" />);

    await waitFor(() => {
        expect(screen.getByText(/Currently Reading: Mystery Book/i)).toBeInTheDocument();
        expect(screen.getByText(/by Unknown Author/i)).toBeInTheDocument();
        expect(screen.queryByText(/First published/i)).not.toBeInTheDocument();
    });
  });

  test("renders the correct book info for a given title", async () => {
    const mockBook = {
      title: "Jane Eyre",
      author_name: ["Charlotte Brontë"],
      cover_i: 67890,
      first_publish_year: 1847,
    };
  
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ docs: [mockBook] }),
    });
  
    render(<CurrentlyReadingBadge bookTitle={mockBook.title} />);
  
    const titleText = await screen.findByText(
      new RegExp(`Currently Reading: ${mockBook.title}`, "i")
    );

    const authorText = await screen.findByText(
        new RegExp(`by ${mockBook.author_name[0]}`, "i")
      );
  
    expect(titleText).toBeInTheDocument();
    expect(authorText).toBeInTheDocument();

  });

  test("displays book cover when available", async () => {
    const mockResponse = {
      docs: [
        {
          title: "Pride and Prejudice",
          author_name: ["Jane Austen"],
          cover_i: 12345,
          first_publish_year: 1813,
        },
      ],
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<CurrentlyReadingBadge bookTitle="Pride and Prejudice" />);

    await waitFor(() => {
      const img = screen.getByAltText(/Cover of Pride and Prejudice/i);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://covers.openlibrary.org/b/id/12345-M.jpg');
    });
  });
});