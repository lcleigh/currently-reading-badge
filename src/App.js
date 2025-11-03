import React, { useRef, useState } from "react";
import CurrentlyReadingBadge from "./components/CurrentlyReadingBadge";
import BookSearch from "./components/BookSearch";
import ThemeSelector from "./components/ThemeSelector";
import ReadingBadgeMarkdownGenerator from "./components/ReadingBadgeMarkdownGenerator";

function App() {
  const [bookTitle, setBookTitle] = useState("The Nutcracker");
  const [selectedTheme, setSelectedTheme] = useState("neutral");
  // create a ref for the badge
  const badgeRef = useRef(null);
  
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
        badgeRef={badgeRef}
        bookTitle={bookTitle} 
        theme={selectedTheme}
      />
      <br />
      <ReadingBadgeMarkdownGenerator 
        badgeRef={badgeRef}
        book={bookTitle}
        theme={selectedTheme}
      />
    </div>
  );
}

export default App;
