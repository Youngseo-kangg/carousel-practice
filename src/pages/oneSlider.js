import React, { useState } from 'react';
import card1 from '../assets/card1.jpg';
import card2 from '../assets/card2.png';
import card3 from '../assets/card3.png';
import '../styles/oneSlider.css';

function OneSlider() {
  let cards = [card1, card2, card3];
  const [currentIdx, setCurrentIdx] = useState(0);
  const changeIdx = (direction) => {
    if (direction === '+') {
      if (currentIdx >= cards.length - 1) {
        setCurrentIdx(0);
      } else {
        setCurrentIdx(currentIdx + 1);
      }
    } else if (direction === '-') {
      if (currentIdx <= 0) {
        setCurrentIdx(cards.length - 1);
      } else {
        setCurrentIdx(currentIdx - 1);
      }
    }
  };

  return (
    <article id='oneSliderWrapper'>
      <div className='buttonWrapper'>
        <button id='oneSliderBeforeBtn' onClick={() => changeIdx('-')}>
          -
        </button>
      </div>

      <div id='oneSlider'>
        <div id='oneSliderList'>
          <div id='oneSlider'>
            <img src={cards[currentIdx]} alt='동물의 숲 아미보 카드' />
          </div>
        </div>
      </div>

      <div className='buttonWrapper'>
        <button id='oneSliderAfterBtn' onClick={() => changeIdx('+')}>
          +
        </button>
      </div>
    </article>
  );
}
export default OneSlider;
