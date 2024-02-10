import { useToastClear } from '@hooks'

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

export function DetailPage() {
  useToastClear()
  const navigate = useNavigate()
  const { id } = useParams()
  const [account, setAccount]: [AccountResponse | undefined, Function] = useState()

  useEffect(() => {
    ;(async () => {
      try {
        const account = await RequestApi.accounts.getAccount(id!)

        setAccount(account)
      } catch (error: any) {
        navigate(-1)
      }
    })()
  }, [])

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

          <div style={{ marginTop: '30px', fontWeight: 'bold', fontSize: '20px' }}>자기소개</div>
          <Description readOnly value={account?.description} />

          <Seperator />

          <Body>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '20px' }}>질문하기</div>
                <div
                  style={{ fontSize: '16px', marginLeft: '3px', marginTop: '1px', display: 'flex', alignItems: 'center', color: 'var(--gray-color)' }}
                >
                  (0 / 500)
                </div>
              </div>
              <FormControlLabel style={{ margin: '0' }} control={<Switch />} label="비밀질문" />
            </div>

            <QuestionArea />

            <div style={{ marginTop: '7px', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex' }}>
                <FormControl>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    개발 경력
                  </InputLabel>
                  <NativeSelect
                    defaultValue={'대학생'}
                    inputProps={{
                      name: 'age',
                      id: 'uncontrolled-native',
                    }}
                  >
                    <option value={'대학생'}>대학생</option>
                    <option value={'취준생'}>취준생</option>
                    <option value={'1~3년차'}>1~3년차</option>
                    <option value={'3년차 이상'}>3년차 이상</option>
                  </NativeSelect>
                </FormControl>

                <RadioGroup row style={{ marginLeft: '7px' }}>
                  <FormControlLabel value="전공" control={<Radio size="small" />} label="전공" />
                  <FormControlLabel value="비전공" control={<Radio size="small" />} label="비전공" />
                </RadioGroup>
              </div>

              <Button
                variant="contained"
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
  margin-top: 5px;
  box-sizing: border-box;
  width: 100%;
  height: 60%;
  border-radius: 10px;
  resize: none;

  @media (max-width: 520px) {
    height: 40%;
  }
  /* background-color: green; */
`
