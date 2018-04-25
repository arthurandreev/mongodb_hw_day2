const QuoteView = require('./views/quoteView');
const Request = require('./services/request.js');

const quoteView = new QuoteView();
const request = new Request('http://localhost:3000/api/quotes');

//where does allQuotes come from??
const getQuotesRequestComplete = function(allQuotes){
  //console.log(allQuotes);

  allQuotes.forEach((quote) => quoteView.addQuote(quote) )
}

const createQuoteRequestComplete = function(addedQuote) {
  // console.log(addedQuote);
  quoteView.addQuote(addedQuote);
}

//third step
const deleteAllRequestComplete = function(){
  quoteView.clear();
}

//second step
const onFormDelete = function() {
  console.log('delete');
  request.deleteAll(deleteAllRequestComplete);
  // console.log('form deleted');
}

//how can it see name and quote in onFormSubmit??
const onFormSubmit = function (event) {
  //preventDefault is important to avoid only html code being submitted and for asynchronous operation
  event.preventDefault();
  console.log('form submitted');

  const nameInput = event.target.name;
  const quoteInput = event.target.quote;

  const newQuote = {
    name: nameInput.value,
    quote: quoteInput.value
  };

  request.post(createQuoteRequestComplete, newQuote);
}

const appStart = function(){
  //getQuotesRequestComplete is a function that we are passing in
  request.get(getQuotesRequestComplete);

  const addQuoteForm = document.querySelector('form');
  addQuoteForm.addEventListener('submit', onFormSubmit);

//first step is to add event listener to the button
  const deleteQuoteForm = document.querySelector('#deleteButton');
  deleteQuoteForm.addEventListener('click', onFormDelete);
}

document.addEventListener('DOMContentLoaded', appStart);
