
const quotes = [
    `Don't roll a tire down a hill if there's a cow standing behind you wearing rubber boots.`,
    `Excuse me? Could you please leave?`,
    `I just don't like bananas very much.`,
    `I'm trying to get something done!`,
    `It's shrimp in a bag!`,
    `Nice to greetcha!`,
    `Josh, you're out of the band.`,
    `I renew me, do you renew you? Do you need a new you? I need a new me. I renew me.`,
    `It's possible, but is it plausible?`,
    `Use your glutes!`
];

let words = []; // the words in the current quote
let wordIndex = 0; // the index of the current word
let startTime = Date.now(); // the time when the game started
let gameActive = false; // whether the typing game is active

const quoteElement = document.getElementById('quote'); // the DOM element that holds the quote
const messageElement = document.getElementById('message'); // the DOM element that holds the message (success or error)
const typedValueElement = document.getElementById('typed-value'); // the DOM element that holds the user's typed value

function updateWordHighlights() {
  const wordElements = [...quoteElement.children];

  wordElements.forEach((wordElement, index) => {
    wordElement.classList.toggle('highlight', index === wordIndex);
    wordElement.classList.toggle('past-text', index < wordIndex);
  });
}

document.getElementById('start-button').addEventListener('click', () => { // when the start button is clicked
  const quoteIndex = Math.floor(Math.random() * quotes.length); // get a random index for the quotes array
  const quote = quotes[quoteIndex]; // get the quote at that index
  words = quote.split(' '); // split the quote into words and store in the words array
  wordIndex = 0; // reset the current word to the first one

  const spanWords = words.map((word) => `<span>${word} </span>`); // wrap each word in a span element (simple divider) so we can style them individually
  quoteElement.innerHTML = spanWords.join(''); // set the innerHTML of the quoteElement to the spanWords array joined into a string
  updateWordHighlights();

  messageElement.innerText = ''; // clear the message element

  typedValueElement.value = ''; // clear the typedValueElement so the user can start typing
  typedValueElement.focus(); // focus the typedValueElement so the user can start typing

  startTime = new Date().getTime(); // start the timer
  gameActive = true;
  typedValueElement.disabled = false; // enable the input box
  typedValueElement.classList.remove('error'); // remove the error class if it was there
});

typedValueElement.addEventListener('input', () => { // when the user types in the typedValueElement
  if (!gameActive) return; // ignore input when game is not active
  const currentWord = words[wordIndex]; // get the current word from the words array
  const typedValue = typedValueElement.value; // what the user has typed so far

  if (typedValue === currentWord && wordIndex === words.length - 1 && gameActive) { // if the user has typed the full quote correctly and is on the last word
    const elapsedTime = new Date().getTime() - startTime; // total time
    const chars = words.join(' ').length;
    const minutes = elapsedTime / 60000;
    const wpm = ((chars / 5) / minutes).toFixed(2);
    const message = `CONGRATULATIONS! Your WPM is ${wpm}!`;
    messageElement.innerText = message; // show the message

    gameActive = false; // no more typing allowed
    typedValueElement.disabled = true; // disable the input box
    typedValueElement.classList.remove('error'); // remove the error class if it was there
    return;
  }

  if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) { // if the user has typed the current word correctly and pressed space
    typedValueElement.value = ''; // clear the input box for the next word
    wordIndex++; // next word
    updateWordHighlights();
    typedValueElement.classList.remove('error');
    return;
  }

  if (currentWord.startsWith(typedValue)) { // if the user has typed the current word correctly so far
    typedValueElement.classList.remove('error'); // remove the error class if it was there
  } else { // error
    typedValueElement.classList.add('error');
  }
});