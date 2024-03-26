import UserItem from "./UserItem"
import usePropertiesElement from "../../hooks/usePropertiesElement"
import { useQuery } from "@tanstack/react-query"
import { getMyFriends } from "../../axios/friend"
import { useAuth } from "../../hooks/useAuth"
import { useEffect, useState } from "react"
import { useSelectedUserChat } from "../../hooks/useSelectedUserChat"
import { useSocketStates } from "../../hooks/useSocketStates"

const ListUsers = () => {
  const { id } = useAuth()
  const { selectedId, listFriends, setSelectedId, setListFriends } =
    useSelectedUserChat()
  const { ws, socketEvent } = useSocketStates()
  const [listOnLineUsers, setListOnLineUsers] = useState<string[]>([])
  const properties = usePropertiesElement("main-layout")
  const properties2 = usePropertiesElement("chat-left-top")
  const [rightClick, setRightClick] = useState("")
  const currentHeight = (properties?.height ?? 0) - (properties2?.height ?? 0)

  const { data, isLoading } = useQuery({
    queryKey: ["myFriends"],
    queryFn: () => getMyFriends(id),
  })

  useEffect(() => {
    if (data && data.data?.length > 0) {
      ws?.sendDataToServer({ type: "GET_ONLINE_USERS" })
      setSelectedId(data?.data?.[0]._id)
      setListFriends(data?.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, ws])

  useEffect(() => {
    const TIME_CALL_GET_ONLINE_USERS = 1000 * 60 * 5 // 5 minutes
    const id = setInterval(() => {
      ws?.sendDataToServer({ type: "GET_ONLINE_USERS" })
    }, TIME_CALL_GET_ONLINE_USERS)
    return () => clearInterval(id)
  }, [ws])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".menu-user-item")) {
        setRightClick("")
      }
    }
    document.addEventListener("click", handleClick)
    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  useEffect(() => {
    if (socketEvent?.type === "ONLINE_USERS") {
      const onlineUsers = socketEvent.payload as string[]
      const filterOnlineUsers = onlineUsers.filter((user) => user !== id)
      setListOnLineUsers(filterOnlineUsers)
    }
  }, [id, listFriends, socketEvent])

  return (
    <div className="overflow-auto" style={{ height: currentHeight - 24 || "" }}>
      {!isLoading ? (
        listFriends?.map(
          (user: { _id: string; nickname: string; caption: string }) => (
            <div key={user._id} className="relative">
              <UserItem
                isOnline={listOnLineUsers.includes(user._id)}
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
                className={`menu-user-item absolute bg-white shadow-lg top-[60px] left-2 mb-3 z-10 rounded ${
                  user._id === rightClick ? "block" : "hidden"
                } `}
              >
                <ul>
                  <li className="py-2 px-1 border-b-[1px] hover:bg-slate-200 cursor-pointer text-sm">
                    Clear conservation
                  </li>
                  <li className="py-2 px-1 border-b-[1px] hover:bg-slate-200 cursor-pointer text-sm">
                    Unfriend
                  </li>
                </ul>
              </div>
            </div>
          )
        )
      ) : (
        <></>
      )}
    </div>
  )
}

export default ListUsers
