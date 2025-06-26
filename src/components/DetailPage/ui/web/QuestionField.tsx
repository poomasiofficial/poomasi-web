import { AskerSpecificType, CareerYearType } from '@utils/api/enums.ts'
import { DebouncedButton } from '@components/button'
import { useCallback, useState } from 'react'
import { useToastMessageStore } from '@store/toast'
import { useAccountStore } from '@store/account'
// import { RequestApi } from '@utils/api/request-api.ts'
// import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { getMobileVw } from '@utils/responsive'
import optionCheck from '@assets/images/option-check.svg'
import { colors } from '@styles/foundation/color'
import { useMobileStore } from '@store/useMobileStore.ts'
import { useKeyboardHeight } from '@components/DetailPage/model/hooks/usekeyboardHeight'
import { useDetailPageContext } from '@components/DetailPage/model/provider/DetailPageProvider.tsx'
import { CommonSelect } from '@components/CommonSelect/CommonSelect'
import { usePostQuestion } from '@utils/api/posts/usePostQuestion'
import { CAREER_YEAR_OPTIONS, SPECIFIC_TYPE_OPTIONS } from '@utils/api/enums'
import { useParams } from 'react-router-dom'

const QUESTION_MAX_LENGTH: number = 500

export function QuestionField() {
  const { isMobile } = useMobileStore()
  const { keyboardHeight } = useKeyboardHeight(isMobile)
  const { id } = useParams()
  const { setSuccessToastMessage, setErrorToastMessage } = useToastMessageStore()
  const { accessToken } = useAccountStore()
  const { setIsQuestionListFetched } = useDetailPageContext()
  const [questionText, setQuestionText] = useState<string>('')
  const [isSecret, setIsSecret] = useState<boolean>(false)
  const [careerYear, setCareerYear] = useState<CareerYearType>(CareerYearType.ACADEMIC)
  const [isMajor, setIsMajor] = useState<boolean>(true)

  //질문글 등록
  const handleQuestionTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= QUESTION_MAX_LENGTH) {
      setQuestionText(event.target.value)
    }
  }
  //비밀 질문 여부 체크
  const handleIsSecretChange = () => {
    setIsSecret((prev: boolean) => !prev)
  }

  const { mutate: postQuestionToServer } = usePostQuestion(
    () => {
      setQuestionText('')
      setIsSecret(false)
      setCareerYear(CareerYearType.ACADEMIC)
      setIsMajor(true)
      setIsQuestionListFetched(true) //질문목록 다시 불러오기

      setTimeout(() => {
        setSuccessToastMessage('질문이 등록되었습니다.')
      }, 1300)
    },
    () => {
      setErrorToastMessage('질문 등록에 실패했습니다!')
    },
  )

  const postQuestion = useCallback(() => {
    // console.log('nickname:', nickname)
    // if (!nickname) return
    if (!id) return
    postQuestionToServer({
      nickname: id,
      isSecret,
      careerYear,
      isMajor,
      questionText,
    })
  }, [id, isSecret, careerYear, isMajor, questionText, postQuestionToServer])

  const handleQuestionButtonClick = useCallback(async () => {
    if (!accessToken) {
      setErrorToastMessage('질문하려면 로그인이 필수입니다!')
      return
    }

    if (questionText.length < 10) {
      setErrorToastMessage('질문은 10자 이상이어야 합니다!')
      return
    }

    postQuestion()
  }, [accessToken, questionText, postQuestion, setErrorToastMessage])

  return (
    <QuestionSection className="QuestionSection">
      <QuestionFieldTitle>질문하기</QuestionFieldTitle>
      <AskerInfo>
        <SelectContainer>
          <CommonSelect
            title={'개발 경력'}
            value={careerYear}
            onChange={(selectValue) => setCareerYear(selectValue as CareerYearType)}
            options={CAREER_YEAR_OPTIONS}
          />
          <CommonSelect
            title={'전공 사항'}
            value={isMajor ? AskerSpecificType.SPECIALTY : AskerSpecificType.NONE_SPECIALTY}
            onChange={(selectValue) => setIsMajor(selectValue === AskerSpecificType.SPECIALTY)}
            options={SPECIFIC_TYPE_OPTIONS}
          />
        </SelectContainer>
      </AskerInfo>

      <QuestionArea className="QuestionAreaBox">
        <QuestionTextField
          value={questionText}
          onChange={handleQuestionTextChange}
          placeholder="타인에게 피해를 입힐 수 있는 과도한 질문은 자제해 주세요."
        />
        <QuestionOption>
          <QuestionFieldLength>
            글자수: (<span>{questionText.length}</span> / 500)
          </QuestionFieldLength>

          <QuestionSecretOption onClick={handleIsSecretChange}>
            <QuestionCheckbox>{isSecret && <img src={optionCheck} />}</QuestionCheckbox>
            <span>비밀질문</span>
          </QuestionSecretOption>
        </QuestionOption>
      </QuestionArea>

      <QuestionBtnWrapper keyboardHeight={keyboardHeight} style={{ marginLeft: 'auto' }}>
        <DebouncedButton
          text={'질문 등록하기'}
          onClick={() => handleQuestionButtonClick()}
          variant="contained"
          sx={{
            height: '60px',
            fontSize: '18px',
            fontWeight: '700',
            lineHeight: '150%',
            padding: '0 20px',
            borderRadius: '10px',
            color: 'white',
            boxShadow: 'none',
            backgroundColor: '#3ecdba',
            '@media (max-width:1024px)': {
              bottom: `${keyboardHeight + 16}px`,
            },
          }}
        />
      </QuestionBtnWrapper>
    </QuestionSection>
  )
}

const QuestionSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
  gap: 20px;
  @media (max-width: 768px) {
    margin-bottom: ${getMobileVw(40)};
    paddingbottom: 40px;
  }
`

const QuestionFieldTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  @media (max-width: 1024px) {
    font-size: 1.125rem;
  }
`

const AskerInfo = styled.div`
  display: flex;
`

const QuestionArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #eaebed;
  background: #f7f7f7;
  padding: 1.5rem 32px;

  @media (max-width: 1024px) {
    padding: 14px;
    border-width: 0 0 0 0;
  }
`

const QuestionTextField = styled.textarea`
  // element 디자인 요소소
  width: 100%;
  min-height: 270px;
  resize: none;
  background: transparent;

  // focus 시, 기본 디자인이 노출되는 사항 비활성화
  outline: none !important;
  box-shadow: none !important;
  border-bottom: 1px solid #eaebed;

  color: #28292a;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;

  &::placeholder {
    color: #9b9ea2;
  }

  @media (max-width: 1024px) {
    border-width: 0 0 0 0;
  }
`

const QuestionOption = styled.div`
  width: 100%;
  margin: 24px 0 0;
  display: flex;
  justify-content: space-between;
`

const QuestionFieldLength = styled.div`
  color: #9b9ea2;

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;

  span {
    color: #3ecdba;
  }
`

const QuestionSecretOption = styled.div`
  display: flex;
  gap: 8px;
  color: ${colors.gray500};
  align-items: center;
`

const QuestionCheckbox = styled.div`
  width: 24px;
  height: 24px;

  border-radius: 5px;
  border: 1px solid #c5c8cd;
  background: #ffffff;
`

const SelectContainer = styled.div`
  display: flex;
  gap: 8px;
`

const QuestionBtnWrapper = styled.div<{ keyboardHeight: number }>`
  margin-left: auto;

  /* @media (max-width: 1024px) {
    position: fixed;
    bottom: ${({ keyboardHeight }) => `${keyboardHeight + 16}px`};
    left: 0;
    width: 100%;
    padding: 0 16px;
    z-index: 999;
    transition: bottom 0.3s ease;
  } */
`
