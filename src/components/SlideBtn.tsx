import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styled from 'styled-components';

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: calc(50% - 0.9rem);
  width: 1.8rem;
  height: 1.8rem;
  background-color: ${(props) => props.theme.white.lighter};
  opacity: 0.6;
  border: none;
  border-radius: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  cursor: pointer;

  &:hover {
    opacity: 1;
    scale: 1.1;
    transition: opacity 0.3s ease 0s;
    transition: scale 0.3s ease 0s;
  }

  &:first-child {
    left: -2.5rem;
  }

  &:last-child {
    right: -2.5rem;
  }

  @media (max-width: 574px) {
    &:first-child {
      left: 0.6rem;
    }

    &:last-child {
      right: 0.6rem;
    }
  }
`;

interface ISlideBtn {
  prevBtn: () => void;
  nextBtn: () => void;
}

export default function SlideBtn({ prevBtn, nextBtn }: ISlideBtn) {
  return (
    <Buttons>
      <NavigationButton onClick={prevBtn}>
        <IoIosArrowBack />
      </NavigationButton>
      <NavigationButton onClick={nextBtn}>
        <IoIosArrowForward />
      </NavigationButton>
    </Buttons>
  );
}
