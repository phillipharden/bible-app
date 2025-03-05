import React, { useState, useEffect } from "react";
import "../css/ReadBible.css";

const ReadBible = () => {
  const [translations, setTranslations] = useState([]);
  const [selectedTranslation, setSelectedTranslation] = useState(null);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);

  // Fetch translations when the component mounts
  useEffect(() => {
    async function fetchTranslations() {
      try {
        const response = await fetch(
          "https://bible.helloao.org/api/available_translations.json"
        );
        const data = await response.json();

        // Filter only English translations and sort them
        const englishTranslations = data.translations
          .filter((translation) => translation.language === "eng")
          .sort((a, b) => a.name.localeCompare(b.name));

        setTranslations(englishTranslations);
      } catch (error) {
        console.error("Error fetching translations:", error);
      }
    }

    fetchTranslations();
  }, []);

  // Handle translation selection
  const handleTranslationSelect = (translation) => {
    setSelectedTranslation(translation);
    localStorage.setItem("selectedTranslation", JSON.stringify(translation));
    setBooks([]); // Reset books when a new translation is selected
    setSelectedBook(null);
    setChapters([]);
    setSelectedChapter(null);

    // Fetch the books for the selected translation
    fetchBooks(translation.id);
  };

  // Fetch books for the selected translation
  const fetchBooks = async (translationId) => {
    try {
      const response = await fetch(
        `https://bible.helloao.org/api/${translationId}/books.json`
      );
      const booksData = await response.json();

      if (booksData && booksData.books) {
        setBooks(booksData.books);
      } else {
        setBooks([]);
        console.warn("No books found for this translation.");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Handle book selection and fetch chapters
  const handleBookSelect = async (book) => {
    setSelectedBook(book);
    setChapters([]); // Reset chapters on book change
    setSelectedChapter(null);

    try {
      const response = await fetch(
        `https://bible.helloao.org/api/${selectedTranslation.id}/${book.id}/chapters.json`
      );
      const chaptersData = await response.json();

      if (chaptersData && chaptersData.chapters) {
        setChapters(chaptersData.chapters);
      } else {
        setChapters([]);
        console.warn("No chapters found for this book.");
      }
    } catch (error) {
      console.error("Error fetching chapters:", error);
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

          {/* Book Selection */}
          <h4>Select a Book:</h4>
          <ul>
            {books.length > 0 ? (
              books.map((book) => (
                <li key={book.id} onClick={() => handleBookSelect(book)}>
                  {book.name}
                </li>
              ))
            ) : (
              <p>No books found for this translation.</p>
            )}
          </ul>

          {/* Chapter Selection */}
          {selectedBook && (
            <div>
              <h4>Select a Chapter from {selectedBook.name}:</h4>
              <ul>
                {chapters.length > 0 ? (
                  chapters.map((chapter) => (
                    <li
                      key={chapter.number}
                      onClick={() => setSelectedChapter(chapter.number)}>
                      Chapter {chapter.number}
                    </li>
                  ))
                ) : (
                  <p>No chapters available.</p>
                )}
              </ul>
            </div>
          )}

          {/* Display Selected Chapter */}
          {selectedChapter && (
            <div>
              <h3>
                Selected Chapter: {selectedBook.name} {selectedChapter}
              </h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReadBible;
