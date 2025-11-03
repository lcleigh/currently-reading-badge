import React, { useState, useEffect } from "react";
import { themes } from "../themes/badgeColourThemes";

export default function CurrentlyReadingBadge({ bookTitle, theme, badgeRef }) {
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentColourTheme = themes[theme] || themes.neutral;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(bookTitle)}&limit=1`
        );

        if (!response.ok) throw new Error("Failed to fetch book data");

        const data = await response.json();

        if (data.docs && data.docs.length > 0) {
          setBookData(data.docs[0]);
        } else {
          setBookData(null);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (bookTitle) fetchBook();
  }, [bookTitle]);

  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    backgroundColor: currentColourTheme.background,
    border: `2px solid ${currentColourTheme.border}`,
    borderRadius: "8px",
    fontFamily: 'Georgia, "Times New Roman", serif',
    maxWidth: "600px",  // allow longer badges
    flexWrap: "wrap",    // lets text wrap instead of overlapping
    wordBreak: "break-word", // breaks long words if needed
  };

  const textContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: 1,
    minWidth: 0,
  };

  if (loading) return <div style={badgeStyle}>📚 Loading...</div>;
  if (error) return <div style={badgeStyle}>📚 Currently Reading: {bookTitle}</div>;
  if (!bookData) return <div style={badgeStyle}>📚 Book not found: {bookTitle}</div>;

  const author = bookData.author_name ? bookData.author_name[0] : "Unknown Author";
  const publishYear = bookData.first_publish_year;
  const coverUrl = bookData.cover_i
    ? `https://covers.openlibrary.org/b/id/${bookData.cover_i}-M.jpg`
    : null;

  return (
    <div ref={badgeRef} style={badgeStyle}>
  {coverUrl && (
    <img
      src={coverUrl}
      alt={`Cover of ${bookData.title}`}
      style={{
        width: "50px",
        height: "auto",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    />
  )}
  <div style={textContainerStyle}>
    <div style={{
      color: currentColourTheme.text,
      fontSize: "14px",
      fontWeight: "600",
      margin: 0,
      lineHeight: "1.4",
      overflowWrap: "break-word",
    }}>
      📚 Currently Reading: {bookData.title}
    </div>
    <div style={{
      color: currentColourTheme.subtext,
      fontSize: "12px",
      margin: 0,
    }}>
      by {author}
    </div>
    {publishYear && (
      <div style={{
        color: currentColourTheme.subtext,
        fontSize: "12px",
        margin: 0,
      }}>
        📅 First published {publishYear}
      </div>
    )}
  </div>
</div>
  );
}