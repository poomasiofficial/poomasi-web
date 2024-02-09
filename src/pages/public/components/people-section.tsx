import styled from '@emotion/styled'

import Grid from '@mui/material/Grid'
import { ProfileCard } from './profile-card'
import { Badge } from '@components'
import { useState } from 'react'

export const profileDataList = [
  {
    id: 'HelloMinchan',
    image:
      'https://media.licdn.com/dms/image/D5603AQGVNgciNVRM7Q/profile-displayphoto-shrink_200_200/0/1670180619652?e=1712793600&v=beta&t=NimD6kebYbex1suBZ-QmZfr1oTaXHydj9u0H50gAHsQ',
    name: '정민찬',
    field: 'Backend',
    company1: '극장업 C사',
    job1: '소프트웨어 엔지니어',
    company2: '플랫폼 D사',
    job2: '소프트웨어 엔지니어',
  },
  {
    id: 'hyunju-song',
    image: 'https://avatars.githubusercontent.com/u/57041121?v=4',
    name: 'Summer',
    field: 'Data',
    company1: '유통업 G사',
    job1: '데이터 아키텍트',
    company2: '핀테크 F사',
    job2: '데이터 엔지니어',
  },
  {
    id: 'KyoungnamMin',
    image:
      'https://media.licdn.com/dms/image/C4E03AQFrXFyh6drCEQ/profile-displayphoto-shrink_200_200/0/1654063113836?e=1712793600&v=beta&t=6hEojbQNOyp1Poa5qwLg-jKtWpkrtnLarU6bfEocwQY',
    name: 'Tony',
    field: 'Backend',
    company1: 'AI/ML L사',
    job1: '백엔드 개발자',
    company2: '',
    job2: '',
  },
  {
    id: 'socar-abel',
    image:
      'https://media.licdn.com/dms/image/D5603AQHq_KIdOGFnpw/profile-displayphoto-shrink_200_200/0/1699419084572?e=1712793600&v=beta&t=SNtSvv11mw4wCtEG2np63RiuxICL9AOEpfYUOeva0mo',
    name: '김상우',
    field: 'iOS',
    company1: '카셰어링 S사',
    job1: 'iOS 개발자',
    company2: '',
    job2: '',
  },
  {
    id: 'ashpurple',
    image: 'https://avatars.githubusercontent.com/u/75887645?v=4',
    name: '안세훈',
    field: 'Web Frontend',
    company1: '반도체 S사',
    job1: '프론트엔드 개발자',
    company2: '',
    job2: '',
  },
  {
    id: 'koreatlwls',
    image:
      'https://media.licdn.com/dms/image/D4E03AQHsr3sHX7liHA/profile-displayphoto-shrink_200_200/0/1669444530009?e=1712793600&v=beta&t=1MYgBFOOQnLn7SlQtTTE4NNfWeqoTL62552cQ60PFC0',
    name: '김시진',
    field: 'Android',
    company1: '숙박업 Y사',
    job1: 'Android 개발자',
    company2: '',
    job2: '',
  },
  {
    id: 'ye1ne',
    image:
      'https://media.licdn.com/dms/image/D5603AQF-Vn4on1k6VA/profile-displayphoto-shrink_200_200/0/1689130079313?e=1712793600&v=beta&t=YvYPXxjNHWswJQjOIgEyW7LTaYf-cz8U1C0_pzlm_vY',
    name: 'Lani',
    field: 'Fullstack',
    company1: '인테리어 O사',
    job1: '풀스택 개발자',
    company2: '',
    job2: '',
  },
  {
    id: 'bepyan',
    image: 'https://avatars.githubusercontent.com/u/65283190?v=4',
    name: 'Edward',
    field: 'Web Frontend',
    company1: '메신저 K사',
    job1: '프론트엔드 개발자',
    company2: '커머스 W사',
    job2: '프론트엔드 개발자',
  },
  {
    id: 'RokwonK',
    image:
      'https://media.licdn.com/dms/image/D5603AQGnBrHWhHi75Q/profile-displayphoto-shrink_200_200/0/1688264196535?e=1712793600&v=beta&t=57Ym8Ck-R9Y8MYXGSdq69auTak2rlr6dXBGJSoeg1kg',
    name: 'Logan',
    field: 'iOS',
    company1: '플랫폼 K사',
    job1: 'iOS 리드',
    company2: '',
    job2: '',
  },
]

export function PeopleSection() {
  const [selectedField, setSelectedField] = useState('전체')

  const handleClickBadge = (word: string) => {
    setSelectedField(word)
  }

  return (
    <Container>
      <Seperator />
      <SubHead>품앗이꾼</SubHead>

      <BadgeContainer>
        <Badge onClick={() => handleClickBadge('전체')} word={'전체'} />
        <Badge onClick={() => handleClickBadge('Web Frontend')} word={'Web Frontend'} />
        <Badge onClick={() => handleClickBadge('Backend')} word={'Backend'} />
        <Badge onClick={() => handleClickBadge('Fullstack')} word={'Fullstack'} />
        <Badge onClick={() => handleClickBadge('Android')} word={'Android'} />
        <Badge onClick={() => handleClickBadge('iOS')} word={'iOS'} />
        <Badge onClick={() => handleClickBadge('Data')} word={'Data'} />
        <Badge onClick={() => handleClickBadge('AI/ML')} word={'AI/ML'} />
      </BadgeContainer>

      <div style={{ maxHeight: '800px', overflowY: 'auto' }}>
        <PeopleContainer container style={{ margin: '0 auto' }}>
          {profileDataList
            .filter((profileData) => {
              if (selectedField === '전체') return true
              else return profileData.field === selectedField
            })
            .map((profileData) => (
              <ProfileCard profileData={profileData} />
            ))}
        </PeopleContainer>
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
`

const Seperator = styled.div`
  height: 4px;
  width: 30px;
  background-color: black;
  margin-top: 7px;
  margin-bottom: 16px;
`
const SubHead = styled.div`
  font-size: 30px;
  margin-bottom: 13px;
`

const BadgeContainer = styled(Grid)`
  width: 100%;
`

const PeopleContainer = styled(Grid)`
  width: 100%;
  display: flex;
`
