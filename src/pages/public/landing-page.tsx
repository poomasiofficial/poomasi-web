import { useToastClear } from '@hooks'

import styled from '@emotion/styled'
import { DescriptionSection, FooterSection, PeopleSection, TitleSection } from './components'

export function LandingPage() {
  useToastClear()

  return (
    <Container>
      <PageContainer>
        <PageContent>
          <TitleSection />
        </PageContent>
      </PageContainer>

      <PageContainer>
        <PageContent>
          <DescriptionSection />
        </PageContent>
      </PageContainer>

      <PageContainer>
        <PageContent>
          <PeopleSection />
        </PageContent>
      </PageContainer>

      <PageContainer>
        <PageContent>
          <FooterSection />
        </PageContent>
      </PageContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 80px;
`

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 5% 0 5%;
`

const PageContent = styled.div`
  width: 1200px;
  margin-bottom: 50px;
`
