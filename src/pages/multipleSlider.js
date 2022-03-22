import React, { useLayoutEffect, useState } from 'react';
import berries from '../assets/berries.jpeg';
import cake from '../assets/cake.jpeg';
import pizza from '../assets/pizza.jpeg';
import salmon from '../assets/salmon.jpeg';
import '../styles/multipleSlider.css';

// * 현재 창 사이즈 구하는 useWindowSize
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
  // TODO : 현재 창 사이즈 관련
  const [windowWidth, windowHeight] = useWindowSize();
  let sliderPadding = 40;
  // * 현재 창 사이즈에서의 슬라이드의 width 구하는 getNewItemWidth
  function getNewItemWidth() {
    // windowWidth에 0.9배 - sliderPadding*2 빼준 길이로 itemWidth 변수 만들어주기
    let itemWidth = windowWidth * 0.9 - sliderPadding * 2;
    itemWidth = itemWidth > 1060 ? 1060 : itemWidth;
    return itemWidth;
  }
  const newItemWidth = getNewItemWidth();

  // TODO : 보여질 카드 관련
  let cards = [berries, cake, pizza, salmon];
  const endData = 2; // 양 끝에 추가될 데이터 수 endData
  // * 복제한 슬라이드까지 포함 하도록 만드는 함수 setCards
  const setCards = () => {
    let addedFront = [];
    let addedRear = [];
    let index = 0;
    while (index < endData) {
      // 앞부분에는 cards에 가장 마지막 부분 복제해서 넣어주기
      addedFront.unshift(cards[cards.length - 1 - (index % cards.length)]); // 3(berries),2(cake)번째 추가
      // 뒷부분에는 cards에 가장 앞부분 복제해서 넣어주기
      addedRear.push(cards[index % cards.length]); // 0(pizza),1(salmon)번째 추가
      index++;
    }
    return [...addedFront, ...cards, ...addedRear];
  };
  let modCards = setCards();

  // TODO : index 재조정 관련
  // * 보여지는 card의 실제 index를 구하는 함수 getItemIndex
  function getItemIndex(index) {
    index -= endData; // cards의 일부분이 복제된 상황이라 추가한 endData만큼 빼서 실제 index로 보기
    if (index < 0) index += cards.length;
    // 0보다 작으면 cards.length만큼 더해서 복구
    else if (index >= cards.length) index -= cards.length; // cards.length보다 크면 cards.length만큼 뺴서 복구
    return index;
  }

  // TODO : 슬라이드 이동 관련
  const [currentIndex, setCurrentIndex] = useState(0);
  // * 몇번째 슬라이드를 보여줄 지 currentIndex 변경하는 함수 handleSwipe
  const handleSwipe = (direction) => {
    // setCurrentIndex((currentIndex) => currentIndex + index);
    handleCarousel(currentIndex + direction);
  };
  // * handleSwipe를 도와 currentIndex 범위 조정하는 함수 handleCarousel
  const handleCarousel = (index) => {
    // 들어온 수가 0보다 작다면 가장 마지막 slide index로
    if (index < 0) index = cards.length - 1;
    // 들어온 수가 cards.length와 크거나 같다면 가장 첫번째 slide index로
    else if (index >= cards.length) index = 0;
    setCurrentIndex(index);
  };

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
            {modCards.map((el, idx) => {
              const itemIndex = getItemIndex(idx);
              return (
                <div key={idx} className='multipleSliderItem'>
                  <img
                    style={{ width: newItemWidth || 'auto' }}
                    src={el}
                    alt={`실제 인덱스:${idx}, 재조정한 인덱스: ${itemIndex}`}
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
