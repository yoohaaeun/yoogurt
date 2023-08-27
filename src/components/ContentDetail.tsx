import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { makeImagePath } from '../utils';

const Overlay = styled(motion.div)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  z-index: 99;
`;

const Container = styled(motion.div)`
  position: fixed;
  width: 40vw;
  height: 80vh;
  top: 120px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  z-index: 100;
`;

const Cover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
  border-radius: 10px 10px 0 0;
`;

const Title = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const Overview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

export default function ContentDetail({ clickedMovie }: any) {
  const navigate = useNavigate();
  const onOverlayCLick = () => navigate('/');

  return (
    <>
      {clickedMovie && (
        <>
          <Overlay
            onClick={onOverlayCLick}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <Container>
            <>
              <Cover
                style={{
                  backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                    clickedMovie.backdrop_path,
                    'w500'
                  )})`,
                }}
              />
              <Title>{clickedMovie.title}</Title>
              <Overview>{clickedMovie.overview}</Overview>
            </>
          </Container>
        </>
      )}
    </>
  );
}
