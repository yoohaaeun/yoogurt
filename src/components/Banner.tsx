import styled from 'styled-components';
import { IContent } from '../api';
import { LuInfo } from 'react-icons/lu';
import ContentDetail from './ContentDetail';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 85vh;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 3.5rem;
`;

const Overview = styled.p`
  width: 50%;
  font-size: 1.25rem;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(109, 109, 110, 0.7);
  width: 130px;
  padding: 10px 10px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  span {
    position: relative;
    top: 1px;
  }

  &:hover {
    background-color: rgba(109, 109, 110, 0.5);
  }
`;

const InfoIcon = styled(LuInfo)`
  font-size: 1.5rem;
  margin-right: 6px;
`;

interface IBanner {
  data: IContent;
}

export default function Banner({ data }: IBanner) {
  const navigate = useNavigate();
  const [showContentDetail, setShowContentDetail] = useState(false);
  const handleInfoClick = () => {
    navigate(`/movies/${data.id}`);
    setShowContentDetail(true);
  };

  return (
    <>
      {data && (
        <Wrapper>
          <Title>{data.title}</Title>
          <Overview>{data.overview}</Overview>
          <Info onClick={handleInfoClick}>
            <InfoIcon />
            <span>상세 정보</span>
          </Info>
        </Wrapper>
      )}
      {showContentDetail && <ContentDetail />}
    </>
  );
}
