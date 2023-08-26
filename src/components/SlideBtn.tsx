import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import styled from 'styled-components';

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  position: relative;
  top: 125px;
`;

const NavigationButton = styled.button`
  position: absolute;
  width: 45px;
  height: 45px;
  background-color: #ffffff;
  opacity: 0.5;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  cursor: pointer;

  &:hover {
    opacity: 1;
    transition: opacity 0.3s ease 0s;
  }
`;

const PrevButton = styled(NavigationButton)`
  left: -70px;
`;

const NextButton = styled(NavigationButton)`
  right: -70px;
`;

interface ISlideBtn {
  prevBtn: () => void;
  nextBtn: () => void;
}

export default function SlideBtn({ prevBtn, nextBtn }: ISlideBtn) {
  return (
    <Buttons>
      <PrevButton onClick={prevBtn}>
        <IoIosArrowBack />
      </PrevButton>
      <NextButton onClick={nextBtn}>
        <IoIosArrowForward />
      </NextButton>
    </Buttons>
  );
}
