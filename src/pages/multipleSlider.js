import React, { useLayoutEffect, useState } from 'react';
import berries from '../assets/berries.jpeg';
import cake from '../assets/cake.jpeg';
import pizza from '../assets/pizza.jpeg';
import salmon from '../assets/salmon.jpeg';
import '../styles/multipleSlider.css';

// 현재 창 사이즈 구하는 useWindowSize
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize); // resize되면 사이즈 업데이트
    updateSize(); // size업데이트
    return () => window.removeEventListener('resize', updateSize);
  }, []); // 초반에 한번만 작동
  return size;
}

function MultipleSlider() {
  // 현재 창 사이즈에서의 슬라이드의 width 구하는 getNewItemWidth
  function getNewItemWidth() {
    // windowWidth에 0.9배 - sliderPadding*2 빼준 길이로 itemWidth 변수 만들어주기
    let itemWidth = windowWidth * 0.9 - sliderPadding * 2;
    itemWidth = itemWidth > 1060 ? 1060 : itemWidth;
    return itemWidth;
  }

  let cards = [berries, cake, pizza, salmon];
  let sliderPadding = 40;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, windowHeight] = useWindowSize();
  // currentIndex 변경하는 함수 handleSwipe
  const handleSwipe = (index) => {
    setCurrentIndex((currentIndex) => currentIndex + index);
  };
  const newItemWidth = getNewItemWidth();

  return (
    <div id='sliderArea'>
      <article id='multipleSliderWrapper'>
        <button id='multipleSliderBeforeBtn' onClick={() => handleSwipe(-1)}>
          -
        </button>
        <button id='multipleSliderAfterBtn' onClick={() => handleSwipe(1)}>
          +
        </button>

        <div id='multipleSlider'>
          <div
            id='multipleSliderList'
            style={{
              transform: `translateX(${
                // -1 *
                // ((100 / cards.length) * currentIndex + // 슬라이드 1개 길이
                //   (100 / cards.length) * 0.5) // 슬라이드 1/2개 길이
                (-100 / cards.length) * (currentIndex + 0.5)
              }%)`,
            }}
          >
            {cards.map((el, idx) => {
              return (
                <div className='multipleSliderItem'>
                  <img
                    style={{ width: newItemWidth || 'auto' }}
                    key={idx}
                    src={el}
                    alt='동물의 숲 아미보 카드'
                  />
                </div>
              );
            })}
          </div>
        </div>
      </article>
    </div>
  );
}
export default MultipleSlider;
