import styled from '@emotion/styled'
import Card from '@mui/material/Card'
import { CardActionArea } from '@mui/material'

import { useNavigate } from 'react-router-dom'

interface ProfileData {
  nickname: string
  profile_image: string
  name: string
  field: string
  company1: string
  job1: string
  company2: string
  job2: string
  is_vacation: boolean
}

interface Props {
  profileData: ProfileData
}

export function ProfileCard({ profileData }: Props) {
  const navigate = useNavigate()

  const handleProfileClick = (nickname: string) => {
    navigate(`/${nickname}`)
  }

  return (
    <Container>
      {profileData.is_vacation ? (
        <div style={{ position: 'relative' }}>
          <BlurOverlay>
            <CardConent>
              <ProfilePictureWrapper>
                <ProfileImage src={profileData.profile_image} alt={'profile-image'} />
              </ProfilePictureWrapper>
              <ProfileName>{profileData.name}</ProfileName>
              <ProfileField>{profileData.field}</ProfileField>

              <ProfileHistory>
                <ProfileHistoryComponey>{profileData.company1}</ProfileHistoryComponey>
                <ProfileHistoryJob>{profileData.job1}</ProfileHistoryJob>
              </ProfileHistory>

              <ProfileHistory>
                <ProfileHistoryComponey>{profileData.company2}</ProfileHistoryComponey>
                <ProfileHistoryJob>{profileData.job2}</ProfileHistoryJob>
              </ProfileHistory>
            </CardConent>
          </BlurOverlay>
          <TextBlurOverlay>
            <div style={{ fontSize: '100px' }}>🏖</div> 휴가를 떠났어요 :D
          </TextBlurOverlay>
        </div>
      ) : (
        <CardConent onClick={() => handleProfileClick(profileData.nickname)}>
          <ProfilePictureWrapper>
            <ProfileImage src={profileData.profile_image} alt={'profile-image'} />
          </ProfilePictureWrapper>
          <ProfileName>{profileData.name}</ProfileName>
          <ProfileField>{profileData.field}</ProfileField>

          <ProfileHistory>
            <ProfileHistoryComponey>{profileData.company1}</ProfileHistoryComponey>
            <ProfileHistoryJob>{profileData.job1}</ProfileHistoryJob>
          </ProfileHistory>

          <ProfileHistory>
            <ProfileHistoryComponey>{profileData.company2}</ProfileHistoryComponey>
            <ProfileHistoryJob>{profileData.job2}</ProfileHistoryJob>
          </ProfileHistory>
        </CardConent>
      )}
    </Container>
  )
}

const Container = styled(Card)`
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  margin-left: 3px;
  margin-right: 17px;
  margin-top: 10px;
  margin-bottom: 10px;

  width: 180px;
  height: 332px;

  @media (max-width: 520px) {
    width: 150px;
    height: 300px;
  }

  // iphone mini
  @media (max-width: 380px) {
    width: 140px;
    height: 290px;
  }
`
const CardConent = styled(CardActionArea)`
  padding: 20px;

  @media (max-width: 520px) {
    padding: 17px;
  }
`

const ProfilePictureWrapper = styled.div`
  display: flex;

  width: 100%;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const ProfileName = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
`

const ProfileField = styled.div`
  font-size: 17px;
  font-weight: bold;
  color: var(--gray-color);

  // iphone mini
  @media (max-width: 380px) {
    font-size: 16px;
  }
`

const ProfileHistory = styled.div`
  height: 30px;
  margin-top: 10%;
  font-size: 13px;
  font-weight: bold;
  color: #aaaaaa;
`

const ProfileHistoryComponey = styled.div`
  font-size: 13px;
  font-weight: bold;
`
const ProfileHistoryJob = styled.div`
  font-size: 13px;
  font-weight: bold;
`

const BlurOverlay = styled.div`
  width: 100%;
  height: 100%;
  filter: blur(5px);
  -webkit-filter: blur(5px);
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
  font-weight: bold;
`
