const quoteOnPage = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

let randomQuotes;  
let quotes;
async function getQuotes() {  
  if (lengNow == 'en') {
    randomQuotes = getRandomIntInclusive(0, 99);
    quotes = 'https://type.fit/api/quotes';
  } else {
    randomQuotes = getRandomIntInclusive(0, 11);
    quotes = '../js/quotesRU.json';
  }
  const res = await fetch(quotes);
  const data = await res.json(); 
  quoteOnPage.textContent = data[randomQuotes].text;
  if(data[randomQuotes].author == null) {
    author.textContent = 'unknown author'
  } else {
    author.textContent = data[randomQuotes].author;
  }
}
getQuotes();


changeQuote.addEventListener('click', getQuotes);
