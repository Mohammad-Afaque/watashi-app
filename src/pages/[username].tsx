import { useGetUser } from '@/hooks/useGetUser'
import { useRouter } from 'next/router'
import Head from 'next/head'

import ProfileInfoSection from '@/components/Profile/ProfileInfoSection'
import { useGetUserList } from '@/hooks/useGetUserList'
import ListItemCard from '@/components/list/ListItemCard'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useFollowUser } from '@/hooks/useFollowUser'
import { useGetFollows } from '@/hooks/useGetFollows'
import { useUnFollowUser } from '@/hooks/useUnFollowUser'

const ProfilePage = () => {
  const router = useRouter()
  const { username } = router.query as { username: string }

  const { user, status } = useGetUser(username)
  const { data: lists, status: listStatus } = useGetUserList(username)
  const { user: currentUser, status: currentUserStatus } = useCurrentUser()

  const userId = user?.id as string
  const { data: follows, status: followsStatus } = useGetFollows(userId)
  const followUserMutation = useFollowUser(userId)
  const unFollowUserMutation = useUnFollowUser(userId)

  const onFollowHandler = () => {
    if (!user || !user.id) return
    followUserMutation.mutate(user.id)
  }

  const onUnFollowHandler = () => {
    if (!user || !user.id) return
    unFollowUserMutation.mutate(user.id)
  }

  if (!user && status !== 'loading') {
    return (
      <div className='flex h-56 items-center justify-center bg-white p-2'>
        <h1 className='text-xl'>User doesn&apos;t Exist!</h1>
      </div>
    )
  }

  const isFollowing =
    follows?.followers.find((follower) => follower.id === currentUser?.id) !==
    undefined

  return (
    <>
      <Head>
        <title>{user?.username}</title>
      </Head>
      <div className='mt-2 overflow-hidden rounded shadow'>
        {user && user.id && currentUser && currentUser.id && follows && (
          <ProfileInfoSection
            user={user}
            isSameUser={user.id === currentUser.id}
            onFollow={onFollowHandler}
            isFollowing={isFollowing}
            onUnFollow={onUnFollowHandler}
            followers={follows.followers}
            following={follows.following}
          />
        )}
      </div>
      {lists && lists.list.length > 0 && (
        <div className='mt-2 space-y-3 rounded bg-white p-3 shadow'>
          {lists.list.map((list) => (
            <div key={list.id}>
              <div className='mb-3 border-b pb-2'>
                <p className='text-lg font-semibold'>{list.name}</p>
              </div>
              <div className='flex space-x-3 overflow-x-auto'>
                {list.items.map((item) => (
                  <div key={item.id}>
                    <ListItemCard title={item.title} image={item.posterPath} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default ProfilePage
