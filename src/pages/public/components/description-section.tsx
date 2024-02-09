import styled from '@emotion/styled'

export function DescriptionSection() {
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
