import { useQuery, useQueryClient } from '@tanstack/react-query'
import { FriendService } from '../../../core/services'
import { useAuth, useWebSocket, useSelectedUserChat } from '../../../core/hooks'
import { useEffect, useState } from 'react'
import ClearMessage from '../ClearMessage/ClearMessage'
import Unfriend from '../Unfriend/Unfriend'
import { SOCKET_EVENTS } from '../../../core/constant'
import UserItem from '../UserItem/UserItem'
import './list-users.css'

const ListUsers = () => {
  const { id } = useAuth()
  const { selectedId, listFriends, setSelectedId, setListFriends } =
    useSelectedUserChat()
  const { webSocket, webSocketEvent } = useWebSocket()
  const [listOnLineUsers, setListOnLineUsers] = useState<string[]>([])
  const [rightClick, setRightClick] = useState('')
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['myFriends', id],
    queryFn: () => FriendService.getMyFriends(id),
  })

  useEffect(() => {
    if (data && data.data?.length > 0) {
      if (webSocket && webSocket.readyState === WebSocket.OPEN) {
        webSocket?.sendDataToServer({
          type: SOCKET_EVENTS.GET_ONLINE_USERS,
          payload: { userId: id },
        })
      }
      if (!selectedId || data?.data.includes(selectedId)) {
        setSelectedId(data?.data?.[0]._id)
      } else {
        setSelectedId(selectedId)
      }
      setListFriends(data?.data)
    }
  }, [data, webSocket])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.menu-user-item')) {
        setRightClick('')
      }
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  useEffect(() => {
    if (webSocketEvent?.type === SOCKET_EVENTS.GET_ONLINE_USERS) {
      const onlineUsers = webSocketEvent.payload as string[]
      const filterOnlineUsers = onlineUsers.filter((user) => user !== id)
      setListOnLineUsers(filterOnlineUsers)
    }

    if (webSocketEvent?.type === SOCKET_EVENTS.UPDATE_FRIEND_LIST) {
      queryClient.invalidateQueries({ queryKey: ['myFriends'] })
    }
  }, [id, listFriends, webSocketEvent])

  return (
    <div className="list-users lg:min-h-[calc(650px-160px)]">
      {!isLoading ? (
        listFriends?.map(
          (user: { _id: string; nickname: string; caption: string }) => (
            <div key={user._id} className="z-1 relative">
              <UserItem
                isOnline={listOnLineUsers.includes(user._id)}
                userId={user._id}
                active={selectedId === user._id}
                name={user.nickname}
                caption={user.caption}
                onClick={() => setSelectedId(user._id)}
                onContextMenu={(e) => {
                  e.preventDefault()
                  setRightClick(user._id)
                }}
              />
              <div
                className={`absolute left-2 top-[50px] mb-3 rounded bg-white shadow-lg ${
                  user._id === rightClick ? 'block' : 'hidden'
                } `}
              >
                <ul className="z-50 w-[140px] dark:bg-slate-800 dark:text-white">
                  <li className="cursor-pointer border-b-[1px] px-1 py-2 text-xs hover:bg-slate-200 dark:border-slate-600 dark:hover:bg-slate-600">
                    <ClearMessage />
                  </li>
                  <li className="cursor-pointer border-b-[1px] px-1 py-2 text-xs last-of-type:border-none hover:bg-slate-200 dark:border-slate-600 dark:hover:bg-slate-600">
                    <Unfriend senderId={id} receiverId={user._id} />
                  </li>
                </ul>
              </div>
            </div>
          ),
        )
      ) : (
        <></>
      )}
    </div>
  )
}

export default ListUsers
