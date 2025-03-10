import { ClassAttributes, FormHTMLAttributes, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { JSX } from 'react/jsx-runtime'
import useDebounce from '../../../core/hooks/useDebounce'
import { useAuth, useSelectedUserChat } from '../../../core/hooks'
import { FriendService } from '../../../core/services'
import { useQuery } from '@tanstack/react-query'

export const PADDING_CONTAINER = 'p-4'

const SearchBar = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLFormElement> &
    FormHTMLAttributes<HTMLFormElement>,
) => {
  const { id } = useAuth()
  const { register, handleSubmit, watch } = useForm()
  const { setListFriends } = useSelectedUserChat()
  const watchShowAge = watch('search-friend')
  const { valueDebounce } = useDebounce(watchShowAge)

  const { data } = useQuery({
    queryKey: ['myFriends', id],
    queryFn: () => FriendService.getMyFriends(id),
  })

  console.log('data', data)

  const onSubmit = async (keyword: string) => {
    const friends = await FriendService.searchFriends({
      id,
      keyword: keyword,
    })
    setListFriends(friends.data)
  }

  useEffect(() => {
    if (!valueDebounce) {
      setListFriends(data?.data)
    } else {
      onSubmit(valueDebounce)
    }
  }, [valueDebounce])

  return (
    <div className="flex h-[80px] items-center px-2 dark:border-gray-600">
      <form
        {...props}
        onSubmit={handleSubmit(onSubmit as never)}
        className="relative w-full"
      >
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <svg
            className="h-4 w-4 text-gray-700 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          {...register('search-friend', { required: true, maxLength: 64 })}
          type="search"
          id="default-search"
          className="block w-full rounded-full border-0 bg-gray-100 p-2.5 ps-10 text-sm text-black focus:ring-0 dark:bg-slate-800 dark:text-white"
          placeholder="Searching..."
          autoComplete="off"
        />
      </form>
    </div>
  )
}

export default SearchBar
