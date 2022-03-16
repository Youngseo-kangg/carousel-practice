import { useState } from 'react';
import card1 from '../assets/card1.jpg';
import card2 from '../assets/card2.png';
import card3 from '../assets/card3.png';

function OneSlider() {
  const [currentIdx, setCurrentIdx] = useState(0);
  let cards = [card1, card2, card3];
  return (
    <article id='oneSliderWrapper'>
      <button
        id='oneSliderBeforeBtn'
        onClick={() => setCurrentIdx(currentIdx--)}
      >
        -
      </button>
      <div id='oneSlider'>
        {cards.map((card) => {
          return <img src={card} alt='동물의 숲 아미보 카드' />;
        })}
      </div>
      <button
        id='oneSliderAfterBtn'
        onClick={() => setCurrentIdx(currentIdx++)}
      >
        +
      </button>
    </article>
  );
}
export default OneSlider;
