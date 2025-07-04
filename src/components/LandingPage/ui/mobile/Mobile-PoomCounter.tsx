import styled from '@emotion/styled'
import { usePoomCount } from '@components/LandingPage/hooks/usePoomCount.ts'
import { getMobileVw } from '@utils/responsive'
import { colors } from '@styles/foundation/color'

export function MobilePoomCounter() {
  const { qnaCount, accountCount } = usePoomCount()

  return (
    <CounterContainer>
      <PoomCountIconContainer src="/landingPage/poom-count-icon.png" />
      <PoomExplainText>
        현재, <HighlightText>{accountCount}명</HighlightText>과 <br></br>
        <HighlightText>{qnaCount}번</HighlightText>의 품을 나누었어요.
      </PoomExplainText>
    </CounterContainer>
  )
}

const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: url('/landingPage/poom-count-background.png');
  background-size: cover; // 이미지가 컨테이너를 꽉 채우도록
  background-position: center; // 이미지를 중앙에 배치
  background-repeat: no-repeat; // 이미지 반복

  gap: 2.5rem;
  width: 100%;
  height: auto;
  padding: 1.875rem;

  @media (max-width: 1024px) {
    gap: 1rem;
    padding: 2.375rem 3.625rem;
  }
`

const PoomExplainText = styled.div`
  width: 93%;
  color: #0e0e0e;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  text-align: center;
`

const PoomCountIconContainer = styled.img`
  width: ${getMobileVw(72)};
  height: auto;
`

const HighlightText = styled.span`
  color: ${colors.green700};
  font-weight: 800;
`
