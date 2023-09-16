import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  width: 100vw;
  padding: 20px 60px;
`;

const Logo = styled.img`
  width: 5.9rem;
  margin-right: 2rem;
  position: relative;
  top: 5px;

  @media (max-width: 676px) {
    margin-right: 0;
    width: 5.5rem;
    margin-right: 1rem;
  }
`;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  background-image: url('/images/bg-lost-in-space.png');
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 100px;
`;

const Title = styled.h2`
  font-size: 80px;
  margin-bottom: 35px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.57);

  @media (max-width: 765px) {
    font-size: 50px;
  }
`;

const Message = styled.p`
  font-size: 30px;
  margin-bottom: 30px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.57);
  line-height: 1.4;

  @media (max-width: 765px) {
    font-size: 23px;
  }
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.white.lighter};
  border-radius: 5px;
  border: none;
  padding: 10px 30px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

export default function NotFound() {
  return (
    <>
      <Nav>
        <Link to='/'>
          <Logo src='images/logo.png' alt='' />
        </Link>
      </Nav>
      <Container>
        <Title>길을 잃으셨나요?</Title>
        <Message>
          죄송합니다. 해당 페이지를 찾을 수 없습니다. 홈페이지로 이동해 다양한
          콘텐츠를 만나보세요.
        </Message>
        <Button>
          <a href='/'>Yoogurt 홈</a>
        </Button>
      </Container>
    </>
  );
}
