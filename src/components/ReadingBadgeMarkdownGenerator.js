import React, { useRef } from "react";
import * as htmlToImage from "html-to-image";

export default function ReadingBadgeMarkdownGenerator({ bookTitle, badgeRef }) {
  // const badgeRef = useRef();

  const handleDownload = async () => {
    console.log("Download button clicked");
    console.log()
    if (!badgeRef.current) {
      console.error("❌ No badgeRef found");
      return;
    }
    try {
      const dataUrl = await htmlToImage.toSvg(badgeRef.current);
      const link = document.createElement("a");
      link.download = `${bookTitle}-badge.svg`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error generating image:", err);
    }
  };

  return (
    <div style={{ textAlign: "left", marginTop: "20px" }}>
      <br />
      <button
        onClick={handleDownload}
      >
        Download Badge
      </button>
    </div>
  );
}