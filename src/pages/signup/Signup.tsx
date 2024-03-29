import { Link } from 'react-router-dom'
import { SignUpBackground } from '../../assets'
import { Title } from '../../components'
import SignUpForm from '../../components/SignupForm/SignupForm'

const Signup = () => {
  return (
    <div className="login-back-ground flex items-center justify-center ">
      <div className="login-wrapper block w-[1200px] rounded border-[18px] border-purple-500 border-opacity-25 lg:flex">
        <div className="login-column-left-content m-auto h-full flex-1 px-28">
          <div className="content">
            <Title text="Create Account" />
            <SignUpForm />
            <Link
              className="mt-4 inline-block w-full text-center text-sky-500 underline hover:text-sky-600"
              to="/login"
            >
              You already have account?
            </Link>
          </div>
        </div>
        <div className="login-column-left w-full lg:w-[620px]">
          <SignUpBackground />
        </div>
      </div>
    </div>
  )
}

export default Signup
