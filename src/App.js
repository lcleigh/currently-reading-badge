import React, { useState } from "react";
import CurrentlyReadingBadge from "./components/CurrentlyReadingBadge";
import BookSearch from "./components/BookSearch";

function App() {
  const [bookTitle, setBookTitle] = useState("The Nutcracker");
  return (
    <div style={{ padding: "20px" }}>
      <h1>My Reading Tracker</h1>
      <BookSearch onSearch={setBookTitle}/>
      <CurrentlyReadingBadge bookTitle={bookTitle}/>
    </div>
  );
}

export default App;
