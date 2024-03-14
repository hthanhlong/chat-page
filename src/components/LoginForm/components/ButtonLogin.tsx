import Button from "../../Button/Button"

const ButtonLogin = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Button
      disabled={isLoading}
      type="submit"
      text="Log in"
      className="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2 my-2"
    />
  )
}

export default ButtonLogin
