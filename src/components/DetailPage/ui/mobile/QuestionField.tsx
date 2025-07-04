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
import { Seperator } from '@components/seperator/Seperator'
import { useMobileStore } from '@store/useMobileStore.ts'
import { useKeyboardHeight } from '@components/DetailPage/model/hooks/usekeyboardHeight'
import { useDetailPageContext } from '@components/DetailPage/model/provider/DetailPageProvider.tsx'
import { CommonSelect } from '@components/CommonSelect/CommonSelect'
import { CAREER_YEAR_OPTIONS, SPECIFIC_TYPE_OPTIONS } from '@utils/api/enums'
import { usePostQuestion } from '@utils/api/posts/usePostQuestion'
import { useParams } from 'react-router-dom'

const QUESTION_MAX_LENGTH: number = 500

export function QuestionField() {
  const { isMobile } = useMobileStore()
  // const keyboardHeight = useKeyboardHeight(isMobile)
  const { keyboardHeight, isTextareaFocused } = useKeyboardHeight(isMobile)

  const { id } = useParams()
  const { setSuccessToastMessage, setErrorToastMessage } = useToastMessageStore()
  const { accessToken } = useAccountStore()
  const [questionText, setQuestionText] = useState<string>('')
  const [isSecret, setIsSecret] = useState<boolean>(false)
  const [careerYear, setCareerYear] = useState<CareerYearType>(CareerYearType.ACADEMIC)
  const [isMajor, setIsMajor] = useState<boolean>(true)
  const { setIsQuestionListFetched } = useDetailPageContext()

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
    if (!id) return
    postQuestionToServer({
      nickname: id,
      isSecret,
      careerYear,
      isMajor,
      questionText,
    })
  }, [id, isSecret, careerYear, isMajor, questionText, postQuestionToServer])

  /*
  const postingQuestion = async () => {
    try {
      //질문 데이터를 서버에 등록
      await RequestApi.posts.postQna({ id, isSecret, careerYear, isMajor, questionText })

      //질문 등록 후, 리셋
      setQuestionText('')
      setIsSecret(false)
      setCareerYear(CareerYearType.ACADEMIC)
      setIsMajor(true)

      setTimeout(() => {
        setSuccessToastMessage('질문이 등록되었습니다.')
      }, 1300)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('질문 등록에 실패했습니다!', error)
      }

      setErrorToastMessage('질문 등록에 실패했습니다!')
    }
  } */

  // 팁 !
  // function 재랜더링 되지 않도록 함.
  // 관련하여, 오버 엔지리어닝이 되는 경우도 있다하니 관련 내용은 고민해보도록 하겠습니다.

  const handleQuestionButtonClick = useCallback(async () => {
    if (!accessToken) {
      setErrorToastMessage('질문하려면 로그인이 필수입니다!')
      return
    }

    if (questionText.length < 10) {
      setErrorToastMessage('질문은 10자 이상이어야 합니다!')
      return
    }

    // 질문 등록
    await postQuestion()
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
        </QuestionOption>
      </QuestionArea>
      <QuestionSecretOption onClick={handleIsSecretChange}>
        <QuestionCheckbox>{isSecret && <img src={optionCheck} />}</QuestionCheckbox>
        <span>비밀질문</span>
      </QuestionSecretOption>

      <QuestionBtnWrapper style={{ marginLeft: 'auto' }} className="MobileWrapper">
        <DebouncedButton
          text={'질문 등록하기'}
          onClick={() => handleQuestionButtonClick()}
          variant="contained"
          sx={{
            width: '60px',
            height: '40px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '10px',
            color: 'white',
            backgroundColor: '#3ecdba',
            '@media (max-width:1024px)': {
              width: '100%',
              boxShadow: 'none !important',
              height: '48px',
              padding: '16px 20px',
            },
            ...(isMobile && isTextareaFocused && keyboardHeight > 0
              ? {
                  position: 'fixed',
                  bottom: `${keyboardHeight + 6}px`, // 키보드 위 여유공간
                  // left: '16px',
                  right: '1px',
                  zIndex: 9999,
                }
              : {}),
          }}
        />
      </QuestionBtnWrapper>
      <Seperator />
    </QuestionSection>
  )
}

const QuestionBtnWrapper = styled.div`
  @media (max-width: 1024px) {
    transition: bottom 0.3s ease;
    margin: 0 !important;
    width: 100% !important;
  }
`

const QuestionSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
  gap: 20px;
  @media (max-width: 768px) {
    margin-bottom: ${getMobileVw(40)};
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
  border: 1px solid var(--Gray-200, #eaebed);
  background: #f7f7f7;
  padding: 1.5rem 32px;

  @media (max-width: 1024px) {
    padding: 14px;
    border-width: 0 0 0 0;
    border: none;
  }
`

const QuestionTextField = styled.textarea`
  // element 디자인 요소소
  width: 100%;
  min-height: 270px;
  resize: none;
  background: transparent;
  border-width: 0 0 1px 0;

  // focus 시, 기본 디자인이 노출되는 사항 비활성화
  outline: none !important;
  box-shadow: none !important;

  // element 폰트 요소
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
    font-weight: 400;
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
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-right: 15px;
  padding: 8px 12px;
  border-radius: 100px;
  border: 1px solid #c5c8cd;
  background: #fff;
  @media (max-width: 1024px) {
    border: none;
  }
`
