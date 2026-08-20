const API_URL = 'https://api.quotable.io/quotes/random';

const fallbackQuotes = [
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { text: 'Experience is the name everyone gives to their mistakes.', author: 'Oscar Wilde' },
  { text: 'In order to be irreplaceable, one must always be different.', author: 'Coco Chanel' },
  { text: 'Java is to JavaScript what car is to carpet.', author: 'Chris Heilmann' },
  { text: 'Knowledge is power.', author: 'Francis Bacon' },
  { text: 'Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday\u2019s code.', author: 'Dan Salomon' },
  { text: 'Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.', author: 'Antoine de Saint-Exupery' },
  { text: 'Ruby is rubbish! PHP is phpantastic!', author: 'Nikita Popov' },
  { text: 'Code is like humor. When you have to explain it, it\u2019s bad.', author: 'Cory House' },
  { text: 'Fix the cause, not the symptom.', author: 'Steve Maguire' },
  { text: 'Optimism is an occupational hazard of programming; feedback is the treatment.', author: 'Kent Beck' },
  { text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman' }
];

const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const spinner = document.getElementById('spinner');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const copyQuoteBtn = document.getElementById('copyQuoteBtn');
const shareQuoteBtn = document.getElementById('shareQuoteBtn');
const sourceNote = document.getElementById('sourceNote');

let currentQuote = { text: '', author: '' };
let isLoading = false;

function setLoading(loading) {
  isLoading = loading;
  spinner.classList.toggle('visible', loading);
  quoteText.classList.toggle('loading', loading);
  quoteAuthor.classList.toggle('loading', loading);
  newQuoteBtn.disabled = loading;
  copyQuoteBtn.disabled = loading;
  shareQuoteBtn.disabled = loading;
}

function displayQuote(quote, fromFallback) {
  currentQuote = quote;
  quoteText.textContent = quote.text;
  quoteAuthor.textContent = '- ' + quote.author;
  sourceNote.textContent = fromFallback
    ? 'Using offline quotes - check your internet connection.'
    : 'Quoted from api.quotable.io';
}

async function fetchQuote() {
  setLoading(true);
  quoteText.textContent = 'Loading a fresh quote...';

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(API_URL, { signal: controller.signal });
    clearTimeout(timer);

    if (!response.ok) throw new Error('Request failed');

    const data = await response.json();
    const quote = Array.isArray(data) ? data[0] : data;
    displayQuote(
      {
        text: quote.content,
        author: quote.author
      },
      false
    );
  } catch (err) {
    const random = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    displayQuote(random, true);
  } finally {
    setLoading(false);
  }
}

function showCopied(button) {
  const original = button.textContent;
  button.textContent = 'Copied!';
  button.classList.add('copied');
  setTimeout(() => {
    button.textContent = original;
    button.classList.remove('copied');
  }, 1600);
}

copyQuoteBtn.addEventListener('click', async () => {
  const text = currentQuote.text + ' - ' + currentQuote.author;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    showCopied(copyQuoteBtn);
  } catch (err) {
    sourceNote.textContent = 'Could not copy. Select the text manually.';
  }
});

shareQuoteBtn.addEventListener('click', () => {
  const text = encodeURIComponent(currentQuote.text + ' - ' + currentQuote.author);
  const url = 'https://wa.me/?text=' + text;
  window.open(url, '_blank', 'noopener,noreferrer');
});

newQuoteBtn.addEventListener('click', fetchQuote);

fetchQuote();