import styled from 'styled-components';
import { IContent } from '../api';
import { LuInfo } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 75vh;

  @media (max-width: 765px) {
    height: 60vh;
  }
`;

const Title = styled.h2`
  margin-bottom: 1.25rem;
  font-size: 3.5rem;

  @media (max-width: 765px) {
    font-size: 3rem;
  }

  @media (max-width: 574px) {
    font-size: 2.5rem;
  }
`;

const Overview = styled.p`
  width: 50%;
  font-size: 1.25rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;

  @media (max-width: 1400px) {
    width: 70%;
  }

  @media (max-width: 765px) {
    width: 80%;
    font-size: 1.1rem;
  }

  @media (max-width: 574px) {
    font-size: 1rem;
    width: 90%;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(109, 109, 110, 0.7);
  width: 8rem;
  padding: 0.6rem 0.6rem;
  border-radius: 0.3rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(109, 109, 110, 0.5);
  }

  @media (max-width: 574px) {
    width: 6.9rem;
    font-size: 0.9rem;
  }
`;

const InfoIcon = styled(LuInfo)`
  font-size: 1.5rem;
  margin-right: 0.4rem;
`;

interface IBanner {
  data: IContent;
  type: string;
}

export default function Banner({ data, type }: IBanner) {
  const navigate = useNavigate();
  const onClicked = () => {
    if (type === 'movie') {
      navigate(`/home/${data.id}`);
    } else if (type === 'tv') {
      navigate(`/tvSeries/${data.id}`);
    }
  };

  return (
    <>
      {data && (
        <Wrapper>
          <Title>{data.title ? data.title : data.name}</Title>
          <Overview>{data.overview}</Overview>
          <Info onClick={onClicked}>
            <InfoIcon />
            <span>상세 정보</span>
          </Info>
        </Wrapper>
      )}
    </>
  );
}
