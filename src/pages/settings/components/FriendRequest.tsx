import { Button } from 'flowbite-react'
import { Avatar, Skeleton } from '../../../components'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getFriendRequests, updateFriendStatus } from '../../../axios/friend'
import { useAuth } from '../../../hooks/useAuth'
import { IFriendRequest } from '../../../types'

const FriendRequest = () => {
  const { id } = useAuth()
  const queryClient = useQueryClient()

  const { data: ListFriendRequest, isLoading } = useQuery({
    queryKey: ['friendRequests'],
    queryFn: () => getFriendRequests(id),
  })

  const { mutate } = useMutation({
    mutationFn: (request: IFriendRequest) => updateFriendStatus(request),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['friendRequests'] }),
  })

  return (
    <div className="flex w-full flex-wrap overflow-auto max-lg:h-screen">
      {!isLoading ? (
        ListFriendRequest?.data?.map(
          (user: { _id: string; nickname: string }) => (
            <div
              key={user._id}
              className="m-1 flex h-20 w-[calc(50%-8px)] items-center justify-between rounded-md border-[1px] px-2 py-1 hover:bg-gray-100 hover:dark:bg-gray-800"
            >
              <Avatar name={user.nickname} />
              <div className="flex">
                <Button
                  color="blue"
                  size="xs"
                  className="mr-1"
                  onClick={() => {
                    mutate({
                      senderId: user._id,
                      receiverId: id,
                      status: 'FRIEND',
                    })
                  }}
                >
                  Accept
                </Button>
                <Button
                  color="red"
                  size="xs"
                  onClick={() => {
                    mutate({
                      senderId: user._id,
                      receiverId: id,
                      status: 'REJECT',
                    })
                  }}
                >
                  Reject
                </Button>
              </div>
            </div>
          ),
        )
      ) : (
        <Skeleton />
      )}
    </div>
  )
}
export default FriendRequest
