import { useToastClear } from '@hooks'
import { isErrorToastOpenState, errorToastMessageState, isSuccessToastOpenState, successToastMessageState, accountTokenState } from '@store'
import { useRecoilValue, useSetRecoilState, SetterOrUpdater } from 'recoil'

import styled from '@emotion/styled'
import TextareaAutosize from 'react-textarea-autosize'
import { useParams } from 'react-router-dom'
import { AccountResponse, RequestApi } from '@api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import InputLabel from '@mui/material/InputLabel'
import NativeSelect from '@mui/material/NativeSelect'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

const QUESTION_MAX_LENGTH: number = 500

export function DetailPage() {
  useToastClear()
  const accountToken: string | null = useRecoilValue(accountTokenState)
  const setIsErrorToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isErrorToastOpenState)
  const setErrorToastMessage: SetterOrUpdater<string> = useSetRecoilState(errorToastMessageState)
  const setIsSuccessToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isSuccessToastOpenState)
  const setSuccessToastMessage: SetterOrUpdater<string> = useSetRecoilState(successToastMessageState)

  const navigate = useNavigate()
  const { id } = useParams()
  const [account, setAccount]: [AccountResponse | undefined, Function] = useState()

  /**
   * Question info
   */
  const [questionText, setQuestionText]: [string, Function] = useState('')
  const [isSecret, setIsSecret]: [boolean, Function] = useState(false)
  const [careerYear, setCareerYear]: [string, Function] = useState('대학생')
  const [isMajor, setIsMajor]: [boolean, Function] = useState(true)

  const handleQuestionTextChange = (event: any) => {
    if (event.target.value.length <= QUESTION_MAX_LENGTH) {
      setQuestionText(event.target.value)
    }
  }
  const handleIsSecretChange = () => {
    setIsSecret((prev: boolean) => !prev)
  }
  const handleCareerYearChange = (event: any) => {
    setCareerYear(event.target.value)
  }
  const handleIsMajorChange = (e: any, value: boolean) => {
    setIsMajor(value)
  }
  const handleQuestionButtonClick = () => {
    if (!accountToken) {
      setIsErrorToastOpen(true)
      setErrorToastMessage('로그인은 필수입니다!')
      return
    }

    if (questionText.length < 10) {
      setIsErrorToastOpen(true)
      setErrorToastMessage('질문은 10자 이상이어야 합니다!')
      return
    }

    setQuestionText('')
    setIsSecret(false)
    setCareerYear('대학생')
    setIsMajor(true)
    setTimeout(() => {
      setIsSuccessToastOpen(true)
      setSuccessToastMessage('질문이 등록되었습니다.')
    }, 1300)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const account = await RequestApi.accounts.getAccount(id!)

        setAccount(account)
      } catch (error: any) {
        navigate(-1)
      }
    })()
  }, [questionText, isSecret, careerYear, isMajor])

  return (
    <Container>
      <PageContainer>
        <PageContent>
          <Header>
            <ProfilePictureWrapper>
              <ProfileImage src={account?.profile_image} alt={'profile-image'} />
            </ProfilePictureWrapper>

            <HeaderBody>
              <ProfileSection>
                <HeaderName>{account?.name}</HeaderName>
                <HeaderField>{account?.field}</HeaderField>
              </ProfileSection>
              <HeaderJob>{'現 ' + account?.company1 + ' ' + account?.job1}</HeaderJob>
            </HeaderBody>
          </Header>

          <div style={{ marginTop: '30px', fontWeight: 'bold', fontSize: '20px' }}>품앗이꾼 소개</div>
          <Description readOnly value={account?.description} />

          <Seperator />

          <Body>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '20px' }}>질문하기</div>
                {questionText.length === 500 ? (
                  <div
                    style={{
                      fontSize: '16px',
                      marginLeft: '3px',
                      marginTop: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      color: 'red',
                    }}
                  >
                    {`(${questionText.length} / 500)`}
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: '16px',
                      marginLeft: '3px',
                      marginTop: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      color: 'var(--gray-color)',
                    }}
                  >
                    {`(${questionText.length} / 500)`}
                  </div>
                )}
              </div>
              <FormControlLabel style={{ margin: '0' }} control={<Switch checked={isSecret} onChange={handleIsSecretChange} />} label="비밀질문" />
            </div>

            <QuestionArea
              value={questionText}
              onChange={handleQuestionTextChange}
              placeholder="타인에게 피해를 입힐 수 있는 과도한 질문은 자제해 주세요."
            />

            <div style={{ marginTop: '7px', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex' }}>
                <FormControl>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    개발 경력
                  </InputLabel>
                  <NativeSelect value={careerYear} onChange={handleCareerYearChange}>
                    <option value={'대학생'}>대학생</option>
                    <option value={'취준생'}>취준생</option>
                    <option value={'1~3년차'}>1~3년차</option>
                    <option value={'3년차 이상'}>3년차 이상</option>
                  </NativeSelect>
                </FormControl>

                <RadioGroup row style={{ marginLeft: '7px' }}>
                  <FormControlLabel
                    value="전공"
                    control={<Radio size="small" checked={isMajor} onChange={(e) => handleIsMajorChange(e, true)} />}
                    label="전공"
                  />
                  <FormControlLabel
                    value="비전공"
                    control={<Radio size="small" checked={!isMajor} onChange={(e) => handleIsMajorChange(e, false)} />}
                    label="비전공"
                  />
                </RadioGroup>
              </div>

              <Button
                variant="contained"
                onClick={() => handleQuestionButtonClick()}
                sx={{
                  width: '60px',
                  height: '40px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  borderRadius: '10px',
                  color: 'white',
                }}
              >
                등록
              </Button>
            </div>
          </Body>
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
  /* background-color: pink; */
`
const PageContent = styled.div`
  width: 1200px;
  margin-bottom: 50px;
`

const Header = styled.div`
  width: 100%;

  display: flex;
  /* background-color: green; */
`

const ProfilePictureWrapper = styled.div`
  display: flex;

  width: 140px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`
const ProfileSection = styled.div`
  display: flex;
  align-items: flex-end;

  @media (max-width: 520px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  /* background-color: red; */
`

const HeaderBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-left: 30px;
  padding-top: 40px;
  /* background-color: blue; */

  @media (max-width: 520px) {
    padding-top: 0;
    margin-left: 13px;
  }
`
const HeaderName = styled.div`
  font-weight: bold;
  font-size: 40px;

  @media (max-width: 520px) {
    font-size: 30px;
  }
`
const HeaderField = styled.div`
  margin-left: 10px;
  font-weight: bold;
  font-size: 30px;
  color: var(--gray-color);

  @media (max-width: 520px) {
    margin-left: 0;
    font-size: 23px;
  }
`
const HeaderJob = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: var(--light-gray-color);
  @media (max-width: 520px) {
    font-size: 16px;
  }
`

const Description = styled(TextareaAutosize)`
  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;
  border: none;
  outline: none;
  resize: none;
  font-size: 17px;
  padding: 0;

  @media (max-width: 520px) {
    font-size: 14px;
  }
  /* background-color: green; */
`
const Seperator = styled.div`
  height: 4px;
  width: 100%;
  border-top: 3px var(--light-gray-color) dashed;
  margin-top: 30px;
`

const Body = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 300px;
  /* background-color: greenyellow; */
`

const QuestionArea = styled.textarea`
  outline-color: #1976d2;
  font-size: 16px;
  margin-top: 5px;
  box-sizing: border-box;
  width: 100%;
  height: 60%;
  border-radius: 10px;
  resize: none;
  padding: 20px;

  @media (max-width: 520px) {
    font-size: 15px;
    height: 40%;
  }
  /* background-color: green; */
`
