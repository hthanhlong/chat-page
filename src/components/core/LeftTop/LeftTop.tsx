import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Avatar from '../Avatar/Avatar'
import { Button, Tooltip } from 'flowbite-react'
import { useState } from 'react'
import { CustomModal } from '../../ui'
import AddFriends from '../AddFriends/AddFriends'
import { useQuery } from '@tanstack/react-query'
import { UserService } from '../../../core/services'
import { useAuth } from '../../../core/hooks'
import { Skeleton } from '../../ui'

const LeftTop = () => {
  const [openModal, setOpenModal] = useState(false)
  const { id } = useAuth()

  const { data } = useQuery({
    queryKey: ['user', id],
    queryFn: () => UserService.getUserById(id),
  })

  return (
    <>
      <div className="flex h-[80px] items-center justify-between border-b-[1px] p-2 dark:border-gray-600">
        {data?.data ? (
          <Avatar
            name={data?.data.nickname}
            caption={data.data.caption}
            isEditable={true}
          />
        ) : (
          <Skeleton />
        )}
        <div className="flex">
          <Tooltip content="Finding new friends">
            <Button
              type="button"
              size="xs"
              onClick={() => setOpenModal(true)}
              className="mr-2 text-center hover:bg-gray-100"
              color="gray"
            >
              <FontAwesomeIcon icon={faPlus} fontSize={20} />
            </Button>
          </Tooltip>
          {/* <Notification /> */}
        </div>
      </div>
      <CustomModal
        header="Finding friends"
        body={<AddFriends />}
        openModal={openModal}
        size="lg"
        onAccept={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
      />
    </>
  )
}

export default LeftTop
