import { useEffect, useState } from 'react';

type Quote = {
  author: string;
  id: number;
  quote: string;
};

function App() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [id, setId] = useState(Math.floor(100 * Math.random()));

  async function getQuotes() {
    const res = await fetch('https://dummyjson.com/quotes?limit=100');
    const data = await res.json();
    setQuotes(data.quotes);
  }
  function getRandomId() {
    const randNum = Math.floor(quotes.length * Math.random());
    if (randNum === id) return getRandomId();
    setId(randNum);
  }

  function tweetThis() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quotes[id].quote} - ${quotes[id].author}`;
    window.open(twitterUrl, '_blank');
  }

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <>
      {quotes.length ? (
        <div className='quote-container'>
          <div className='quote-text'>
            <i>
              <QuoteLeftIcon />
            </i>
            <span>{quotes[id].quote}</span>
          </div>
          <div className='quote-author'>
            <span>{quotes[id].author}</span>
          </div>
          <div className='button-container'>
            <button
              className='twitter-button'
              title='Tweet This!'
              onClick={tweetThis}
            >
              <i className='fa-twitter'>
                <TwitterIcon />
              </i>
            </button>
            <button onClick={getRandomId}>New Quote</button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export const Loader = () => {
  return <div className='loader' id='loader'></div>;
};

export const QuoteLeftIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='1em'
      viewBox='0 0 448 512'
      color='currentColor'
      className='fa-quote-left'
    >
      <path d='M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z' />
    </svg>
  );
};

export const TwitterIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='currentColor'
      viewBox='0 0 16 16'
    >
      <path d='M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z' />
    </svg>
  );
};
export default App;
