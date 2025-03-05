import React, { useState, useEffect } from "react";
import "../css/Bible.css";

function Bible() {
  const [translations, setTranslations] = useState([]); // State to store translations
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Fetch the available translations when the component mounts
    fetch("https://bible.helloao.org/api/available_translations.json")
      .then((response) => response.json())
      .then((data) => {
        // Filter translations to only include those with language "eng"
        const englishTranslations = data.translations.filter(
          (translation) => translation.language === "eng"
        );
        setTranslations(englishTranslations); // Store the filtered translations in state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        setError("Failed to fetch translations"); // Handle errors
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  return (
    <div className="page">
      <h1>Bible Translations (English)</h1>
      {loading && <p>Loading translations...</p>}{" "}
      {/* Show loading text while fetching */}
      {error && <p>{error}</p>} {/* Show error message if there's an issue */}
      {/* Display translations if available */}
      <div className="translations-list">
        {translations.length > 0 ? (
          translations.map((translation, index) => (
            <div key={index} className="translation-card">
              <h3>{translation.name}</h3>
              <p>
                <strong>English Name:</strong> {translation.englishName}
              </p>
              <p>
                <strong>Language:</strong> {translation.language}
              </p>
              <p>
                <strong>Text Direction:</strong> {translation.textDirection}
              </p>
              <p>
                <strong>Number of Books:</strong> {translation.numberOfBooks}
              </p>
              <p>
                <strong>Total Chapters:</strong>{" "}
                {translation.totalNumberOfChapters}
              </p>
              <p>
                <strong>Total Verses:</strong> {translation.totalNumberOfVerses}
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a
                  href={translation.website}
                  target="_blank"
                  rel="noopener noreferrer">
                  {translation.website}
                </a>
              </p>
              <p>
                <strong>License URL:</strong>{" "}
                <a
                  href={translation.licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  {translation.licenseUrl}
                </a>
              </p>
              <p>
                <strong>Formats Available:</strong>{" "}
                {translation.availableFormats.join(", ")}
              </p>
            </div>
          ))
        ) : (
          <p>No English translations available.</p> // Message if no English translations are fetched
        )}
      </div>
    </div>
  );
}

export default Bible;
