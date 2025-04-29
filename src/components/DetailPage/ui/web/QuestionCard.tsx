import dayjs from 'dayjs'
import { CareerYearType } from '@api/enums.ts'
import styled from '@emotion/styled'
import Card from '@mui/material/Card'
import TextareaAutosize from 'react-textarea-autosize'
import { colors } from '@styles/foundation/color'
import { GetQnaListResponse } from '@api/types.ts'
import { useAccountStore } from '@store/account'
import { getMobileVw } from '@utils/responsive'

type QuestionCardProps = {
  question: GetQnaListResponse
  isSecret?: boolean
}

export const getCareerYearString = (career_year: string) => {
  switch (career_year) {
    case CareerYearType.ACADEMIC:
      return '대학생'
    case CareerYearType.JOB_SEEKER:
      return '취준생'
    case CareerYearType.JUNIOR:
      return '신입~3년차'
    case CareerYearType.MIDDLE:
      return '3년차 이상'
    default:
      return '대학생'
  }
}

export function QuestionCard({ question, isSecret }: QuestionCardProps) {
  const { accountToken } = useAccountStore()

  return (
    <QnaCard className={'qna-card'}>
      {/* 비밀 질문 인 경우, 블러처리 */}
      {isSecret && (
        <BlurOverlay>
          <TextBlurOverlay>{accountToken ? '비밀 질문이에요' : '답변을 보려면 로그인을 해주세요 :)'}</TextBlurOverlay>
        </BlurOverlay>
      )}
      <QnaHead>Q</QnaHead>
      <QnaContentArea readOnly value={question.question_text} />
      <div style={{ display: 'flex' }}>
        <QnaContentCareer
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            backgroundColor: '#EAEBED',
            marginRight: '6px',
            color: '#727478',
          }}
        >
          {getCareerYearString(question.career_year)}
        </QnaContentCareer>
        <QnaContentMajor
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            backgroundColor: '#EAEBED',
            marginRight: '12px',
            color: '#727478',
          }}
        >
          {question.is_major ? '전공' : '비전공'}
        </QnaContentMajor>
        <QnaContentDate
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#727478',
          }}
        >
          {dayjs(question.created_at).format('YYYY-MM-DD')}
        </QnaContentDate>
      </div>
    </QnaCard>
  )
}

const QnaCard = styled(Card)`
  background-color: #f5f5f5;
  box-shadow: none;
  border-radius: 22px;
  margin-top: 20px;
  padding: 24px 28px 32px;
  width: 60%;
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 1024px) {
    width: ${getMobileVw(290)};
    border-radius: 20px;
    padding: 20px 20px 40px;
    box-shadow: none;
  }
`

const QnaHead = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #3ecdba;

  color: #fff;

  font-size: 32px;
  font-style: normal;
  font-weight: 800;
  line-height: 150%; /* 48px */

  @media (max-width: 1024px) {
    width: 1.5rem;
    height: 1.5rem;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
`

const QnaContentArea = styled(TextareaAutosize)`
  width: 100%;
  height: 100%;
  outline: none;
  background-color: #f5f5f5;
  box-sizing: border-box;
  border: none;
  resize: none;

  color: #28292a;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;

  @media (max-width: 1024px) {
    font-size: 14px;
  }
`

const BlurOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 22px;
  border: 1px solid #dadce0;
`

const TextBlurOverlay = styled.div`
  font-size: 24px;
  word-break: keep-all;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  top: 50%;
  left: 50%;
  text-align: center;
  color: #fff;

  background-color: rgba(78, 80, 83, 0.7);
  border-radius: 500px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 18px;
  font-weight: 500;

  @media (max-width: 1024px) {
    /* margin-bottom: 30px; */
    font-size: 1rem;
    font-weight: 500;
  }
`
const QnaContentCareer = styled.div`
  @media (max-width: 1024px) {
    font-size: 0.75rem;
    background-color: ${colors.gray200};
    margin-right: 6px;
    color: ${colors.gray500};
  }
`

const QnaContentMajor = styled.div`
  @media (max-width: 1024px) {
    background-color: ${colors.gray200};
    font-size: 0.75rem;
    color: ${colors.gray500};
  }
`
const QnaContentDate = styled.div`
  @media (max-width: 1024px) {
    position: absolute;
    bottom: 5%;
    font-size: 0.75rem;
    color: ${colors.gray500};
  }
`
