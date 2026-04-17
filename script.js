// API URL
const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

// Safe DOM access
const getEl = (id) =>
    typeof document !== 'undefined' ? document.getElementById(id) : null;

// Elements
const searchBtn = getEl('search-btn');
const wordInput = getEl('word-input');
const loading = getEl('loading');
const errorMsg = getEl('error-Msg');
const resultsContainer = getEl('results');
const wordDisplay = getEl('wordDisplay');
const pronunciation = getEl('pronunciation');
const definitionsDiv = getEl('definitions');
const synonymsDiv = getEl('synonyms');
const favoriteBtn = getEl('favoriteBtn');
const favoritesList = getEl('favoritesList');

let currentWord = '';
let currentDefinitions = [];

let favorites = loadFavorites();
displayFavorites();

// Event listeners
if (searchBtn) {
    searchBtn.addEventListener('click', searchWord);
}

if (wordInput) {
    wordInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            searchWord();
        }
    });
}

if (favoriteBtn) {
    favoriteBtn.addEventListener('click', toggleFavorite);
}

async function searchWord() {
    if (!wordInput) return;

    const word = wordInput.value.trim().toLowerCase();
    if (word === '') return;

    resultsContainer.style.display = 'none';
    errorMsg.style.display = 'none';
    loading.style.display = 'block';

    try {
        const response = await fetch(`${API_URL}${word}`);
        if (!response.ok) throw new Error('Word not found');

        const data = await response.json();
        const wordData = data[0];

        currentWord = wordData.word;
        displayWordData(wordData);

        resultsContainer.style.display = 'block';
    } catch (error) {
        errorMsg.style.display = 'block';
        console.log('Error:', error);
    } finally {
        loading.style.display = 'none';
    }
}

function displayWordData(wordData) {
    wordDisplay.textContent = wordData.word;

    let phoneticText =
        wordData.phonetic ||
        wordData.phonetics?.[0]?.text ||
        'Not available';

    pronunciation.textContent = `/${phoneticText}/`;

    definitionsDiv.innerHTML = '';
    synonymsDiv.innerHTML = '';
    currentDefinitions = [];

    wordData.meanings.forEach((meaning) => {
        const partOfSpeech = meaning.partOfSpeech;

        meaning.definitions.forEach((def, index) => {
            const defItem = document.createElement('div');
            defItem.className = 'definition-item';

            const posSpan = document.createElement('span');
            posSpan.className = 'part-of-speech';
            posSpan.textContent = partOfSpeech;

            const defText = document.createElement('div');
            defText.className = 'definition-text';
            defText.innerHTML = `<strong>Definition ${index + 1}:</strong> ${def.definition}`;

            defItem.appendChild(posSpan);
            defItem.appendChild(defText);

            if (def.example) {
                const exampleDiv = document.createElement('div');
                exampleDiv.className = 'example-text';
                exampleDiv.textContent = `Example: "${def.example}"`;
                defItem.appendChild(exampleDiv);
            }

            definitionsDiv.appendChild(defItem);

            currentDefinitions.push({
                partOfSpeech,
                definition: def.definition,
                example: def.example || ''
            });
        });

        if (meaning.synonyms?.length) {
            const title = document.createElement('div');
            title.innerHTML = '<strong>Similar Words:</strong>';
            synonymsDiv.appendChild(title);

            meaning.synonyms.forEach((synonym) => {
                const tag = document.createElement('span');
                tag.className = 'synonym-tag';
                tag.textContent = synonym;
                tag.onclick = () => searchSynonym(synonym);

                synonymsDiv.appendChild(tag);
            });
        }
    });

    updateFavoriteButton();
}

function searchSynonym(synonym) {
    wordInput.value = synonym;
    searchWord();
}

function toggleFavorite() {
    if (!currentWord) return;

    const index = favorites.findIndex(f => f.word === currentWord);

    if (index === -1) {
        favorites.push({
            word: currentWord,
            definitions: currentDefinitions
        });
    } else {
        favorites.splice(index, 1);
    }

    saveFavorites();
    displayFavorites();
    updateFavoriteButton();
}

function updateFavoriteButton() {
    const isFavorite = favorites.some(f => f.word === currentWord);

    favoriteBtn.textContent = isFavorite
        ? 'Remove from Favorites'
        : 'Add to Favorites';
}

function displayFavorites() {
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p>No favorite words yet.</p>';
        return;
    }

    favoritesList.innerHTML = '';

    favorites.forEach((fav) => {
        const div = document.createElement('div');
        div.className = 'favorite-word';
        div.textContent = fav.word;

        div.onclick = () => {
            wordInput.value = fav.word;
            searchWord();
        };

        favoritesList.appendChild(div);
    });
}

function loadFavorites() {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
}

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}