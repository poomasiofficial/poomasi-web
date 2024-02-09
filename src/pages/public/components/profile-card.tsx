import styled from '@emotion/styled'
import Card from '@mui/material/Card'
import { CardActionArea } from '@mui/material'

import { useNavigate } from 'react-router-dom'

interface ProfileData {
  id: string
  image: string
  name: string
  field: string
  company1: string
  job1: string
  company2: string
  job2: string
}

interface Props {
  profileData: ProfileData
}

export function ProfileCard({ profileData }: Props) {
  const navigate = useNavigate()

  const handleProfileClick = (id: string) => {
    navigate(`/${id}`)
  }

  return (
    <Container>
      <CardConent onClick={() => handleProfileClick(profileData.id)}>
        <ProfilePictureWrapper>
          <ProfileImage src={profileData.image} alt={'profile-image'} />
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
