import { AccountsApi } from './accounts'
import { PostsApi } from './posts'

export const RequestApi = {
  accounts: { ...AccountsApi },
  posts: { ...PostsApi },
}
