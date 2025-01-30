import styled from '@emotion/styled'

export function TitleSection() {
  return (
    <Container>
      <Title>대학생 전문 상담 멘토링,</Title>
      <Title style={{ fontWeight: 'bold' }}>품앗이</Title>
      <Link href="https://poomasi.kr/">https://poomasi.kr/</Link>
    </Container>
  )
}
const Container = styled.div`
  width: 100%;
`

const Title = styled.div`
  font-size: 45px;

  @media (max-width: 520px) {
    font-size: 30px;
  }
`
const Link = styled.a`
  display: inline-block;
  margin-top: 10px;
  text-decoration: none;
  font-style: italic;

  &:hover {
    color: white;
    background-color: black;
    transition: 0.5s ease;
  }
`
