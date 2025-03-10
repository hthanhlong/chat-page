import { MenuIcon } from '../../../assets'

const Menu = ({ handleClickOpen }: { handleClickOpen: () => void }) => {
  return (
    <div
      onClick={handleClickOpen}
      className="flex w-full max-w-[80px] justify-center border-r-[1px] border-gray-600 pt-4 dark:bg-black lg:hidden"
    >
      <MenuIcon className="h-[32px] w-[32px] cursor-pointer rounded-full text-center transition-all hover:scale-125" />
    </div>
  )
}

export default Menu
