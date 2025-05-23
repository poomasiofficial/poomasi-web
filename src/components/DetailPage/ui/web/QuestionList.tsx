import { ProfileBadge } from '@components/badge'
import { AccountType, QnaAskerType } from '@api/enums.ts'
import { GetQnaListResponse } from '@api/types.ts'
import styled from '@emotion/styled'
import Grid from '@mui/material/Grid'
// import TextareaAutosize from 'react-textarea-autosize'
// import Card from '@mui/material/Card'
import { useCallback, useEffect, useState } from 'react'
import { RequestApi } from '@api/request-api.ts'
import { useDetailPageContext } from '@components/DetailPage/model/provider/DetailPageProvider.tsx'
import { useParams } from 'react-router-dom'
import { QuestionCard } from '@components/DetailPage/ui/web/QuestionCard.tsx'
import { AnswerCard } from '@components/DetailPage/ui/web/AnswerCard.tsx'
import { QuestionAnswerModal } from '@components/DetailPage/ui/web/QuestionAnswerModal.tsx'
import { useAccountStore } from '@store/account'
import { match, P } from 'ts-pattern'

export function QuestionList() {
  const { id } = useParams()
  const { publicId, accountType } = useAccountStore()
  const { teacherAccount, isQuestionListFetched, setIsQuestionListFetched } = useDetailPageContext()
  // @todo react-query로 변경
  const [qnaDataList, setQnaDataList] = useState<{
    data: GetQnaListResponse[]
    isInitFetched: boolean
    isApiError: boolean
  }>({
    data: [],
    isApiError: false,
    isInitFetched: false,
  })
  //Q&A 리스트 상태관리
  const [qnaAskerType, setQnaAskerType] = useState<QnaAskerType>(QnaAskerType.ALL) //QnA 필터 상태 관리
  const [answerModalData, setAnswerModalData] = useState<GetQnaListResponse | null>(null)
  const [isAnswerAuthority, setIsAnswerAuthority] = useState<boolean>(false)

  const getTeacherQnaList = async () => {
    try {
      const qnas = await RequestApi.posts.getQnaList(qnaAskerType, id)
      setQnaDataList(() => ({
        data: qnas.data,
        isApiError: false,
        isInitFetched: true,
      }))
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('', error)
        setQnaDataList((prev) => ({
          ...prev,
          isApiError: true,
          isInitFetched: false,
        }))
      }
    }
  }

  const handleAnswerModalOpenClick = (question: GetQnaListResponse) => {
    setAnswerModalData(question)
  }

  const getIsSecretQuestion = useCallback((question: GetQnaListResponse) => {
    if (accountType === AccountType.MENTOR && teacherAccount?.public_id === publicId) {
      return false
    }

    // 비밀질문이 아닌 경우 모두 확인 가능
    if (question.is_secret === 0) {
      return false
    }

    // 비밀질문인 경우, 본인만 확인가능
    if (question.is_secret === 1) {
      return question.questioner_public_id !== publicId
    }

    return true
  }, [])

  useEffect(() => {
    getTeacherQnaList()
  }, [id, qnaAskerType])

  useEffect(() => {
    if (teacherAccount) {
      setIsAnswerAuthority(teacherAccount.public_id === publicId && accountType === AccountType.MENTOR)
    }
  }, [teacherAccount])

  useEffect(() => {
    if (isQuestionListFetched) {
      getTeacherQnaList().finally(() => setIsQuestionListFetched(false))
    }
  }, [isQuestionListFetched])

  return (
    <QuestionListBody>
      <div
        style={{
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: '20px',
        }}
      >
        질문 History
      </div>

      <BadgeContainer>
        <ProfileBadge onClick={() => setQnaAskerType(QnaAskerType.ALL)} badgeString={'전체'} selected={QnaAskerType.ALL === qnaAskerType} />
        <ProfileBadge onClick={() => setQnaAskerType(QnaAskerType.ME)} badgeString={'내 질문'} selected={QnaAskerType.ME === qnaAskerType} />
      </BadgeContainer>

      {match(qnaDataList)
        .with({ isApiError: true }, () => <InfoText>질문을 가져오던 도중, 실패하였습니다. 다시 시도해주세요.</InfoText>)
        .with({ isInitFetched: false }, () => <InfoText>질문을 가져오는 중입니다..</InfoText>)
        .with({ data: P.when((dataList) => dataList.length === 0) }, () => <InfoText>아직 질문이 없네요 :D</InfoText>)
        .otherwise((qnaData) =>
          qnaData.data.map((qna) => (
            <QnaSection key={qna.public_id}>
              <QuestionArea>
                <QuestionCard question={qna} isSecret={getIsSecretQuestion(qna)} key={qna.public_id} />
                {isAnswerAuthority && !qna.answer_text && (
                  <QuestionAnswerButton onClick={() => handleAnswerModalOpenClick(qna)}>댓글 달기</QuestionAnswerButton>
                )}
              </QuestionArea>

              {qna.answer_text && (
                <AnswerCard
                  answerText={qna.answer_text}
                  isMyAnswer={getIsSecretQuestion(qna)}
                  teacherName={teacherAccount?.name ?? ''}
                  answerDate={qna.updated_at}
                />
              )}
            </QnaSection>
          )),
        )}
      {answerModalData !== null && <QuestionAnswerModal question={answerModalData} setAnswerModalClose={() => setAnswerModalData(null)} />}
    </QuestionListBody>
  )
}

const QuestionListBody = styled.div`
  margin-top: 70px;
  width: 100%;

  @media (max-width: 1024px) {
    margin-top: 0;
  }

  /* background-color: greenyellow; */
`

const BadgeContainer = styled(Grid)`
  width: 100%;
`

const QnaSection = styled.div`
  margin-bottom: 50px;

  @media (max-width: 1024px) {
    margin-bottom: 30px;
  }
`

const InfoText = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 24px;
`

const QuestionArea = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  gap: 20px;
`

const QuestionAnswerButton = styled.div`
  display: inline-flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  background: #b2ebe3;

  color: #08ae98;

  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`
