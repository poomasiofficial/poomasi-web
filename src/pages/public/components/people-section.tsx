import styled from '@emotion/styled'

import Grid from '@mui/material/Grid'
import { ProfileCard } from './profile-card'
import { Badge } from '@components'
import { useEffect, useState } from 'react'
import { AccountListResponse, RequestApi } from '@api'

export function PeopleSection() {
  const [selectedField, setSelectedField]: [string, Function] = useState('전체')
  const [accountList, setAccountList]: [Array<AccountListResponse>, Function] = useState([])

  const handleClickBadge = (word: string) => {
    setSelectedField(word)
  }

  useEffect(() => {
    ;(async () => {
      setAccountList(await RequestApi.accounts.getAccountList())
    })()
  }, [])

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
        {/* <Badge onClick={() => handleClickBadge('AI/ML')} word={'AI/ML'} /> */}
      </BadgeContainer>

      <div>
        <PeopleContainer container style={{ margin: '0 auto' }}>
          {accountList
            .filter((account) => {
              if (selectedField === '전체') return true
              else return account.field === selectedField
            })
            .map((account) => (
              <ProfileCard key={account.nickname} profileData={account} />
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
