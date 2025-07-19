import styled from '@emotion/styled'
import { getMobileVw } from '@utils/responsive'
import { useDetailPageContext } from '@components/DetailPage/model/provider/DetailPageProvider.tsx'
import { EditPencilButton } from '@components/button/editButton/EditPencilButton'
import { useMentoProfileEdit, useEditAuthority } from '@components/DetailPage/model/hooks'
import { MentoDescriptionArea } from '@components/DetailPage/ui/web/MentoDescriptionArea'

export function TeacherIntroduce() {
  const { teacherAccount } = useDetailPageContext()
  const { isAuthority } = useEditAuthority()

  // const accountType = useAccountStore((state) => state.accountType)
  // const isEditable = accountType === AccountType.MENTOR || accountType === AccountType.STAFF

  const { isEditing, editedText, loading, handleEditClick, handleTextChange } = useMentoProfileEdit(
    teacherAccount?.description || '' /* onUpdateRequest 콜백 함수 */,
  )

  return (
    <>
      <Header>
        <ProfilePictureWrapper>
          <ProfileImage src={teacherAccount?.profile_image} alt={'profile-image'} />
        </ProfilePictureWrapper>

        <HeaderBody>
          <ProfileSection className="ProfileSection-fisrt">
            <HeaderName>{teacherAccount?.name}</HeaderName>
            <HeaderField>{teacherAccount?.field}</HeaderField>
          </ProfileSection>
          <HeaderJob className="ProfileSection-second">{'現 ' + teacherAccount?.company1 + ' ' + teacherAccount?.job1}</HeaderJob>
        </HeaderBody>
      </Header>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ marginTop: '30px', fontWeight: '700', fontSize: '1.45rem', color: '#0E0E0E', lineHeight: '150%' }}>품앗이꾼 소개</div>
        {isAuthority && <EditPencilButton isEditing={isEditing} onClick={handleEditClick} loading={loading} />}
      </div>
      {/* <Description readOnly value={teacherAccount?.description} /> */}
      <MentoDescriptionArea value={editedText} isEditing={isEditing} onChange={handleTextChange} />
    </>
  )
}

const Header = styled.div`
  width: 100%;
  height: 116px;
  display: flex;
  /* background-color: green; */

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    border-bottom: 1px solid #eaebed;
    border-top: 1px solid #eaebed;
    padding: 2.5rem;
  }
`

const ProfilePictureWrapper = styled.div`
  display: flex;

  width: 133px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;

  @media (max-width: 1024px) {
    width: ${getMobileVw(90)};
    height: auto;
  }
`

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ProfileSection = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.125rem;
    gap: 0.6rem;
  }
`

const HeaderBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-left: 16px;
  /* background-color: blue; */

  @media (max-width: 1024px) {
    padding-top: 10px;
    margin-left: 0;
    align-items: center;
    gap: 10px;
  }
`
const HeaderName = styled.div`
  color: #0e0e0e;

  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 48px */

  @media (max-width: 1024px) {
    font-size: 1rem;
  }
`
const HeaderField = styled.div`
  margin-left: 10px;
  color: #068372;

  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 42px */

  @media (max-width: 1024px) {
    margin-left: 0;
    color: #006837;
    font-size: 1rem;
  }
`
const HeaderJob = styled.div`
  color: #727478;

  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 36px */

  @media (max-width: 1024px) {
    font-size: 16px;
  }

  // iphone mini
  @media (max-width: 380px) {
    font-size: 15px;
  }
`
