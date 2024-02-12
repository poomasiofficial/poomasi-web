import { HttpMethod } from '@api/enums'
import requestHandler from '@api/request-handler'

const PATH = '/posts'

export const PostsApi = {
  postQna: async ({ id, isSecret, careerYear, isMajor, questionText }: any) => {
    const form: FormData = new FormData()
    form.append('nickname', id)
    form.append('is_secret', isSecret)
    form.append('career_year', careerYear)
    form.append('is_major', isMajor)
    form.append('question_text', questionText)

    return await requestHandler<null>({ url: PATH + '/qna/', method: HttpMethod.POST, data: form })
  },
}
