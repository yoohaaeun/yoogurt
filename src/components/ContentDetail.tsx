import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { makeImagePath } from '../utils';
import { useContentCredits, useContentDetails, useContentVideos } from '../api';

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
  width: 700px;
  height: 650px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  border-radius: 10px;
  background-color: ${(props) => props.theme.black.veryDark};
  z-index: 100;

  @media (max-width: 765px) {
    width: 600px;
    height: 580px;
  }

  @media (max-width: 676px) {
    width: 500px;
    height: 480px;
  }

  @media (max-width: 574px) {
    width: 400px;
    height: 380px;
  }
`;

const Cover = styled.div<{ $bgPhoto: string }>`
  width: 100%;
  height: 50%;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  border-radius: 10px 10px 0 0;
  position: relative;
`;

const Title = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px 30px;
  font-size: 45px;
  position: absolute;
  bottom: 0;

  @media (max-width: 765px) {
    font-size: 35px;
  }

  @media (max-width: 676px) {
    font-size: 30px;
  }

  @media (max-width: 574px) {
    font-size: 25px;
  }
`;

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(147px, 1fr));
  grid-gap: 10px;
  padding: 10px 20px;
  height: 50%;
  color: ${(props) => props.theme.white.lighter};

  @media (max-width: 765px) {
    grid-template-columns: repeat(auto-fit, minmax(105px, 1fr));
  }

  @media (max-width: 676px) {
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  }
`;

const Article = styled.article`
  width: 100%;
  grid-column: span 2;
  padding-right: 11px;
  overflow-y: scroll;
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const Status = styled.p`
  display: inline-block;
  padding: 2px 5px;
  margin-bottom: 7px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.red};
  font-size: 11px;
`;

const OriginalTitle = styled.p`
  font-size: 20px;
  margin-bottom: 10px;

  @media (max-width: 574px) {
    font-size: 18px;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
  font-size: 13px;
  white-space: nowrap;

  @media (max-width: 574px) {
    font-size: 11px;
  }
`;

const Rating = styled(Info)`
  color: ${(props) => props.theme.gray.lighter};
  margin-bottom: 15px;
  gap: 8px;
`;

const Icon = styled.p`
  font-size: 10px;
  margin-right: 2px;
`;

const VoteCount = styled.p``;

const Tagline = styled.p`
  margin-bottom: 5px;
  font-weight: bold;
  margin-bottom: 15px;

  @media (max-width: 574px) {
    font-size: 15px;
  }
`;

const Overview = styled.p`
  width: 100%;
  color: ${(props) => props.theme.gray.lighter};
  font-size: 13px;
  line-height: 1.3;

  @media (max-width: 574px) {
    font-size: 11px;
  }
`;

const Aside = styled.aside`
  width: 100%;

  @media (max-width: 765px) {
    display: none;
  }
`;

const Trailer = styled.div`
  iframe {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
    border-radius: 10px;
  }
`;

const Cast = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(45px, 1fr));
  gap: 10px;
`;

const CastMemberCard = styled.div`
  text-align: center;
  position: relative;

  &:hover {
    .hover-InfoBox {
      display: inline-block;
    }
  }
`;

const DefaultAvatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border: 1px solid #ffffff;
  border-radius: 50%;
  background-color: ${(props) => props.theme.gray.darker};
  font-size: 7px;
`;

const ProfileAvatar = styled.div<{ $imageSrc: string }>`
  width: 45px;
  height: 45px;
  background-image: url(${(props) => props.$imageSrc});
  background-size: cover;
  background-position: center center;
  border-radius: 50%;
  border: 1px solid #ffffff;
`;

const InfoBox = styled.div`
  display: none;
  position: absolute;
  bottom: -45px;
  left: -23px;
  border-radius: 5px;
  white-space: nowrap;
  font-size: 13px;
  padding: 3px 6px;
  z-index: 100;
  background-color: ${(props) => props.theme.gray.darker};
  line-height: 1.3;

  p:last-child {
    color: ${(props) => props.theme.gray.lighter};
    font-size: 11px;
  }
`;

interface IContentDetail {
  type: string | null;
}

export default function ContentDetail({ type }: IContentDetail) {
  const navigate = useNavigate();
  const onOverlayCLick = () => navigate(-1);
  const { contentId } = useParams();
  const { data } = useContentDetails(type, Number(contentId));
  const { data: contentVideosData } = useContentVideos(type, Number(contentId));
  const { data: contentCreditsData } = useContentCredits(
    type,
    Number(contentId)
  );

  const trailers = contentVideosData?.results.filter(
    (video) => video.type === 'Trailer'
  );

  const simplifiedCast = contentCreditsData?.cast
    .slice(0, 6)
    .map((castMember) => ({
      character: castMember.character,
      name: castMember.name,
      profile_path: castMember.profile_path,
    }));

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
            <Cover
              $bgPhoto={makeImagePath(data.backdrop_path || data.poster_path)}
            >
              <Title>{data.title ? data.title : data.name}</Title>
            </Cover>

            <Section>
              <article>
                {data?.poster_path && (
                  <Poster src={makeImagePath(data.poster_path)} alt='' />
                )}
              </article>

              <Article>
                <Status>{data.status}</Status>
                <OriginalTitle>
                  {data.original_title
                    ? data.original_title
                    : data.original_name}
                </OriginalTitle>
                <Info>
                  <p>
                    {data.release_date
                      ? data.release_date
                      : data.first_air_date
                      ? data.first_air_date
                      : '미정'}
                  </p>
                  <p>•</p>
                  <p>{data.genres[0].name}</p>
                  <p>•</p>
                  <p>
                    {data.runtime
                      ? formatTime(data.runtime)
                      : data.number_of_seasons > 1
                      ? `시즌 ${data.number_of_seasons}개`
                      : `에피소드 ${data.number_of_episodes}개`}
                  </p>
                </Info>
                <Rating>
                  <p>{roundedRating}</p>
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

              <Aside>
                {trailers && trailers.length > 0 && (
                  <Trailer>
                    <iframe
                      id='player'
                      title='Movie Trailer'
                      width='100%'
                      height='640'
                      src={`http://www.youtube.com/embed/${trailers[0].key}`}
                      frameBorder='0'
                    />
                  </Trailer>
                )}
                {contentCreditsData && (
                  <>
                    {simplifiedCast?.length === 0 ? '' : <Info>Cast</Info>}
                    <Cast>
                      {simplifiedCast?.map((castMember, index) => (
                        <CastMemberCard key={index}>
                          {castMember.profile_path === null ? (
                            <DefaultAvatar>
                              이미지
                              <br /> 없음
                            </DefaultAvatar>
                          ) : (
                            <ProfileAvatar
                              $imageSrc={makeImagePath(castMember.profile_path)}
                            />
                          )}
                          <InfoBox className='hover-InfoBox'>
                            <p>{castMember.name}</p>
                            <p>{castMember.character}</p>
                          </InfoBox>
                        </CastMemberCard>
                      ))}
                    </Cast>
                  </>
                )}
              </Aside>
            </Section>
          </Container>
        </>
      )}
    </>
  );
}
