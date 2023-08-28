import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { makeImagePath } from '../utils';
import { useMovieDetails } from '../api';

const Overlay = styled(motion.div)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  z-index: 99;
`;

const Container = styled(motion.div)`
  width: 650px;
  height: 650px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  border-radius: 10px;
  background-color: ${(props) => props.theme.black.black};
  z-index: 100;
`;

const Cover = styled.div<{ photo: string }>`
  width: 100%;
  height: 50%;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.photo});
  background-size: cover;
  background-position: center center;
  border-radius: 10px 10px 0 0;
  position: relative;
`;

const Title = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 15px 30px;
  font-size: 45px;
  position: absolute;
  bottom: 0;
`;

const Section = styled.section`
  display: flex;
  padding: 0 30px;
  color: ${(props) => props.theme.white.lighter};
`;

const Article = styled.article`
  width: 300px;
  height: 300px;
  margin-left: 10px;
  overflow-y: hidden;
`;

const Poster = styled.img`
  width: 130px;
  border-radius: 5px;
`;

const Status = styled.p`
  display: inline-block;
  padding: 2px 5px;
  margin-bottom: 5px;
  border-radius: 3px;
  background-color: #ff5050;
  font-size: 11px;
`;

const OriginalTitle = styled.p`
  font-size: 20px;
  margin-bottom: 10px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
  font-size: 13px;
`;

const Rating = styled(Info)`
  color: #b8b8b8;
  margin-bottom: 15px;
  gap: 8px;
`;

const VoteAverage = styled.p``;

const Icon = styled.p`
  font-size: 10px;
  margin-right: 2px;
`;

const VoteCount = styled.p``;

const Tagline = styled.p`
  margin-bottom: 5px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const Overview = styled.p`
  width: 100%;
  height: 150px;
  padding-right: 17px;
  overflow-y: auto;
  color: #b8b8b8;
  font-size: 13px;
  line-height: 1.3;
`;

export default function ContentDetail() {
  const navigate = useNavigate();
  const onOverlayCLick = () => navigate('/');
  const { movieId } = useParams();
  const { data } = useMovieDetails(Number(movieId));

  function formatTime(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    let formattedTime = '';
    if (hours > 0) {
      formattedTime += `${hours}h `;
    }
    if (remainingMinutes > 0) {
      formattedTime += `${remainingMinutes}min`;
    }

    return formattedTime;
  }

  const roundedRating = data?.vote_average.toFixed(2);

  function generateStars(count: number) {
    const starCount = Math.round(count / 2);
    let stars = '';
    for (let i = 0; i < starCount; i++) {
      stars += '⭐️ ';
    }

    return stars;
  }

  return (
    <>
      {data && (
        <>
          <Overlay
            onClick={onOverlayCLick}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <Container>
            <Cover photo={makeImagePath(data.backdrop_path)}>
              <Title>{data.title}</Title>
            </Cover>

            <Section>
              <article>
                {data?.poster_path && (
                  <Poster src={makeImagePath(data.poster_path || '')} alt='' />
                )}
              </article>

              <Article>
                <Status>{data.status}</Status>
                <OriginalTitle>{data.original_title}</OriginalTitle>
                <Info>
                  <p>{data.release_date}</p>
                  <p>•</p>
                  <p>{data.genres[0].name}</p>
                  <p>•</p>
                  <p>{formatTime(data.runtime)}</p>
                </Info>
                <Rating>
                  <VoteAverage>{roundedRating}</VoteAverage>
                  <Icon>
                    {roundedRating !== undefined
                      ? generateStars(parseInt(roundedRating))
                      : null}
                  </Icon>
                  <VoteCount>{data.vote_count} voted</VoteCount>
                </Rating>
                {data?.tagline && <Tagline>"{data.tagline}"</Tagline>}
                {data?.overview && <Overview>{data.overview}</Overview>}
              </Article>
            </Section>
          </Container>
        </>
      )}
    </>
  );
}
