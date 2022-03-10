import { useMutation } from 'react-query'
import { useQueryClient } from 'react-query'

import { followUser } from '@/lib/client/follows'

export const useFollowUser = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation(followUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['follows', id])
    },
  })
}
