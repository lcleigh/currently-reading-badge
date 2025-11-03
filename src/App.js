import React, { useState } from "react";
import CurrentlyReadingBadge from "./components/CurrentlyReadingBadge";
import BookSearch from "./components/BookSearch";
import ThemeSelector from "./components/ThemeSelector";

function App() {
  const [bookTitle, setBookTitle] = useState("The Nutcracker");
  const [selectedTheme, setSelectedTheme] = useState("neutral");
  
  return (
    <div style={{ padding: "20px" }}>
      <h1>My Reading Tracker</h1>
      <BookSearch onSearch={setBookTitle}/>
      <br />

      <ThemeSelector
        selectedTheme={selectedTheme}
        onThemeChange={setSelectedTheme}
      />
      <br />
      <CurrentlyReadingBadge 
        bookTitle={bookTitle} 
        theme={selectedTheme}
      />
      <br />
    </div>
  );
}

export default App;
