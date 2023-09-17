import styled from 'styled-components';

const Wrapper = styled.footer`
  width: 100vw;
  height: 9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  img {
    width: 3rem;
    position: relative;
    top: 0.2rem;
  }

  p {
    font-size: 0.8rem;
    color: ${(props) => props.theme.gray.darker};
  }
`;

export default function Footer() {
  return (
    <Wrapper>
      <a href='https://github.com/yoohaaeun/yoogurt'>
        <img src='images/logo.png' alt='' />
      </a>
      <p>© 2023 Yoogurt. All rights reserved.</p>
    </Wrapper>
  );
}
