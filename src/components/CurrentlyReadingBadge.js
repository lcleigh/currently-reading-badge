import React, { useState, useEffect } from "react";

export default function CurrentlyReadingBadge({ bookTitle }) {
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(bookTitle)}&limit=1`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch book data');
        }
        
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

    if (bookTitle) {
      fetchBook();
    }
  }, [bookTitle]);

  if (loading) {
    return <div>📚 Loading...</div>;
  }

  if (error) {
    return <div>📚 Currently Reading: {bookTitle}</div>;
  }

  if (!bookData) {
    return <div>📚 Book not found: {bookTitle}</div>;
  }

  const author = bookData.author_name ? bookData.author_name[0] : 'Unknown Author';
  const publishYear = bookData.first_publish_year;
  const coverUrl = bookData.cover_i 
    ? `https://covers.openlibrary.org/b/id/${bookData.cover_i}-M.jpg`
    : null;

    console.log(bookData);
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {coverUrl && (
            <img 
              src={coverUrl} 
              alt={`Cover of ${bookData.title}`}
              style={{ width: '60px', height: 'auto' }}
            />
          )}
          <div>
        📚 Currently Reading: {bookData.title} by {author}
        {publishYear && <div style={{ fontSize: '0.9em', opacity: 0.8 }}>📅 First published {publishYear}</div>}
      </div>
        </div>
      );
}