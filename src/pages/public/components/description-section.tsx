import { RequestApi } from '@api'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import CountUp from 'react-countup'

export function DescriptionSection() {
  const [accountCount, setAccountCount]: [number, Function] = useState(85)
  const [qnaCount, setQnaCount]: [number, Function] = useState(37)

  useEffect(() => {
    ;(async () => {
      try {
        const qnaStaus = await RequestApi.posts.getQnaStatus()
        setAccountCount(qnaStaus.account_count)
        setQnaCount(qnaStaus.qna_count)
      } catch (error: any) {
        setAccountCount(85)
        setQnaCount(37)
      }
    })()
  }, [])

  return (
    <Container>
      <Seperator />
      <SubHead>소개</SubHead>
      <Description>
        품앗이에는 다양한 직군의 현업 개발자들이 있습니다.
        <br />
        저희는 삼인행필유아사(三人行必有我師)를 바탕으로,
        <br />
        누구에게나 배울점이 있다는 믿음하에 저희가 가진 경험을
        <br />
        서로 전파하고 멘토링을 진행하고 있습니다.
        <br />각 분야의 품앗이꾼들에게 도움을 받아보세요 :)
        <br />
        <br /> 👉 이용 방법 : 로그인 후 도움받고 싶은 품앗이꾼에게 질문 작성
      </Description>

      <Status>
        <div>
          현재, <StatusCountUp duration={5} end={accountCount} />
          명과 <StatusCountUp duration={5} end={qnaCount} />
          번의
        </div>
        <StatusRightText>품을 나누었어요. 🌱</StatusRightText>
      </Status>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
`

const Seperator = styled.div`
  height: 4px;
  width: 30px;
  background-color: black;
  margin-top: 7px;
  margin-bottom: 16px;
`
const SubHead = styled.div`
  font-size: 30px;
  margin-bottom: 13px;

  @media (max-width: 520px) {
    font-size: 25px;
  }
`
const Description = styled.div`
  line-height: 1.6;
  font-size: 17px;

  @media (max-width: 520px) {
    font-size: 15px;
  }
`

const Status = styled.div`
  line-height: 1.6;
  font-size: 35px;

  color: var(--gray-color);
  margin-top: 50px;

  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: green; */

  @media (max-width: 520px) {
    font-size: 27px;
    flex-direction: column;
  }
`

const StatusCountUp = styled(CountUp)`
  font-weight: bold;
  color: #6cb11a;
`
const StatusRightText = styled.div`
  margin-left: 7px;
`
