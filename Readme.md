# Wordly Dictionary

A simple web-based dictionary application that allows users to search for word definitions, pronunciations, synonyms, and save favorite words.

## Key Features

- **Word Search**: Enter any word to get its definition, pronunciation, and synonyms.
- **Pronunciation**: Displays phonetic pronunciation for words.
- **Synonyms**: Shows related words and synonyms.
- **Favorites**: Save and manage a list of favorite words for quick access.
- **Responsive Design**: Works on desktop and mobile devices.
- **Error Handling**: Displays user-friendly messages for invalid searches.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- [Dictionary API](https://api.dictionaryapi.dev/) for word data

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd SingleWebApp
   ```

2. **Install dependencies** (optional, for linting):
   ```bash
   npm install
   ```

3. **Run the application**:
   - Open `index.html` in your web browser.
   - For a better development experience, serve the files using a local server to avoid CORS issues:
     ```bash
     npx http-server
     ```
     Then open `http://localhost:8080` in your browser.

4. **Linting** (optional):
   ```bash
   npm test
   ```

## Usage

1. Enter a word in the search box.
2. Click the "Search" button.
3. View the definition, pronunciation, and synonyms.
4. Click "Add to Favorites" to save the word.
5. View your favorite words in the "My favorite words" section.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.