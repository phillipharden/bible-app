import React, { useState, useEffect } from "react";
import "../css/TranslationSelector.css";

// Define types matching the API response
interface Translation {
  id: string;
  name: string;
  shortName: string;
}

interface TranslationBook {
  id: string;
  name: string;
}

interface ChapterContent {
  type: string;
  content: string[];
}

interface TranslationBookChapterAudioLinks {
  [reader: string]: string;
}

interface ChapterData {
  number: number;
  content: ChapterContent[];
  footnotes: ChapterFootnote[];
}

interface ChapterFootnote {
  noteId: number;
  text: string;
  reference?: { chapter: number; verse: number };
  caller: "+" | string | null;
}

interface TranslationBookChapter {
  translation: Translation;
  book: TranslationBook;
  thisChapterApiLink: string;
  thisChapterAudioLinks: TranslationBookChapterAudioLinks;
  nextChapterApiLink: string | null;
  previousChapterApiLink: string | null;
  previousChapterAudioLinks: TranslationBookChapterAudioLinks;
  numberOfVerses: number;
  chapter: ChapterData;
}

const TranslationSelector = () => {
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

        const englishTranslations = data.translations
          .filter((translation: Translation) => translation.language === "eng")
          .sort((a: Translation, b: Translation) => a.name.localeCompare(b.name));

        setTranslations(englishTranslations);
      } catch (error) {
        console.error("Error fetching translations:", error);
      }
    }

    fetchTranslations();
  }, []);

  // Handle translation selection
  const handleTranslationSelect = (translation: Translation) => {
    setSelectedTranslation(translation);
    localStorage.setItem("selectedTranslation", JSON.stringify(translation));
    setBooks([]); // Reset books when a new translation is selected
    setSelectedBook(null);
    setChapters([]);
    setSelectedChapter(null);

    // Fetch books for the selected translation
    fetchBooks(translation.id);
  };

  // Fetch books for the selected translation
  const fetchBooks = async (translationId: string) => {
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
  const handleBookSelect = async (book: TranslationBook) => {
    setSelectedBook(book);
    setChapters([]); // Reset chapters on book change
    setSelectedChapter(null);

    try {
      const response = await fetch(
        `https://bible.helloao.org/api/${selectedTranslation?.id}/${book.id}/chapters.json`
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
                    <li key={chapter.chapter.number} onClick={() => setSelectedChapter(chapter.chapter.number)}>
                      Chapter {chapter.chapter.number}
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
              <h3>Selected Chapter: {selectedBook.name} {selectedChapter}</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TranslationSelector;
