import React, { useState, useEffect } from "react";
import "../css/TranslationSelector.css"

const TranslationSelector = () => {
  const [translations, setTranslations] = useState([]);
  const [selectedTranslation, setSelectedTranslation] = useState(null);
  const [books, setBooks] = useState([]);

  // Fetch translations when the component mounts
  useEffect(() => {
    async function fetchTranslations() {
      try {
        const response = await fetch(
          "https://bible.helloao.org/api/available_translations.json"
        );
        const data = await response.json();

        // Filter the translations to show only those with language: "eng"
        const englishTranslations = data.translations
          .filter((translation) => translation.language === "eng")
          .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by translation name

        setTranslations(englishTranslations);
      } catch (error) {
        console.error("Error fetching translations:", error);
      }
    }

    fetchTranslations();
  }, []); // Empty dependency array means this effect runs once on mount

  // Handle translation selection
  const handleTranslationSelect = (translation) => {
    setSelectedTranslation(translation);
    localStorage.setItem("selectedTranslation", JSON.stringify(translation));

    // Fetch the books for the selected translation
    fetchBooks(translation);
  };


  // Fetch books for the selected translation
const fetchBooks = async (translation) => {
  try {
    const response = await fetch(
      `https://bible.helloao.org/api/${translation.id}/books.json`
    );
    const booksData = await response.json();

    if (booksData && booksData.books) {
      setBooks(booksData.books); // ✅ Extract the books array
    } else {
      setBooks([]); // If no books are found, set an empty array
      console.warn("No books found for this translation.");
    }

    console.log("Books:", booksData.books);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};


  return (
    <div className="container">
      <h2>Select a Translation</h2>
      <ul className="translations-list">
        {translations.map((translation) => (
          <li
            key={translation.id}
            onClick={() => handleTranslationSelect(translation)}>
            {translation.name}
          </li>
        ))}
      </ul>

      {selectedTranslation && (
        <div>
          <h3>Selected Translation: {selectedTranslation.name}</h3>
          <p>{selectedTranslation.shortName}</p>
          <h4>Books:</h4>
          <ul>
            {books.length > 0 ? (
              books.map((book, index) => <li key={index}>{book.name}</li>)
            ) : (
              <p>No books found for this translation.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TranslationSelector;
