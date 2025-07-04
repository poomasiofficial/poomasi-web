import { LandingInfoCard } from '@components/LandingPage/ui/web/LandingInfoCard.tsx'
import styled from '@emotion/styled'
import { PoomasiGuideModal } from '@components/LandingPage/ui/web/PoomasiGuideModal.tsx'
import { useState } from 'react'
import { CommonGuideModal } from '@components/modal/CommonGuideModal.tsx'

export function IntroduceSection() {
  const [useGuideModal, setUseGuideModal] = useState(false)
  const [isCommonGuideModal, setIsCommonGuideModal] = useState(false)
  const [commonGuideInfo, setCommonGuideInfo] = useState({
    title: '세부안내',
    content: '품삯은 받고 있지 않아요. 대신 서로 돕고 마음을 나누는 \n 따뜻한 공간이 될 수 있도록 과도한 질문은 자제 부탁드려요.',
  })

  const handleUseGuideModalClick = () => {
    setUseGuideModal(true)
  }

  const handleMentoringModalClick = () => {
    setIsCommonGuideModal(true)
    setCommonGuideInfo({
      title: '품앗이 규칙',
      content: '품삯은 받고 있지 않아요. 대신 서로 돕고 마음을 나누는 \n 따뜻한 공간이 될 수 있도록 과도한 질문은 자제 부탁드려요.',
    })
  }

  const handleQuestionModalClick = () => {
    setIsCommonGuideModal(true)
    setCommonGuideInfo({
      title: '세부안내',
      content: ' 품앗이꾼들은 빠르게 답변드리기 위해 노력하고 있어요.\n 다만 일정에 따라 답변이 조금 늦어질 수 있는 점, 너그럽게 양해 부탁드려요 :D',
    })
  }

  const modalCloseHandler = () => {
    setIsCommonGuideModal(false)
  }

  return (
    <IntroduceSectionContainer>
      <IntroducePoomasi>
        <IntroduceTitleText>품앗이꾼은요?</IntroduceTitleText>
        <IntroduceText>
          누구에게나 배울점이 있다는 믿음하에 저희가
          <br />
          가진 경험을 서로 전파해요!
        </IntroduceText>
      </IntroducePoomasi>
      <IntroduceCardList>
        <LandingInfoCard infoText="이용방법" imgSrc="/landingPage/question-icon.png?v=1" onClick={handleUseGuideModalClick} />
        <LandingInfoCard infoText="품앗이 규칙" imgSrc="/landingPage/mentoring-icon.png?v=1" onClick={handleMentoringModalClick} />
        <LandingInfoCard infoText="세부안내" imgSrc="/landingPage/sharing-icon.png?v=1" onClick={handleQuestionModalClick} />
      </IntroduceCardList>
      {useGuideModal && (
        <PoomasiGuideModal
          onClose={() => {
            setUseGuideModal(false)
          }}
        />
      )}
      {isCommonGuideModal && <CommonGuideModal title={commonGuideInfo.title} content={commonGuideInfo.content} onCloseClick={modalCloseHandler} />}
    </IntroduceSectionContainer>
  )
}

const IntroduceSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 54px;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-image: url('/landingPage/introduce-background.png');
  background-size: cover;
  background-position: center; // 이미지를 중앙에 배치
  background-repeat: no-repeat; // 이미지 반복
  padding-bottom: 90px;
`

const IntroducePoomasi = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const IntroduceTitleText = styled.div`
  color: #068372;
  text-align: center;
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: 150%; /* 54px */
`

const IntroduceText = styled.div`
  color: #0e0e0e;
  text-align: center;

  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 48px */
`

const IntroduceCardList = styled.div`
  width: 1320px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  gap: 20px;

  @media (max-width: 1320px) {
    width: 1024px;
  }
`
