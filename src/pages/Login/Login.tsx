import { LoginBackground } from '../../assets'
import LoginForm from '../../components/LoginForm/LoginForm'
import { motion } from 'framer-motion'

const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
        className="rounded-md bg-white p-10 lg:flex lg:max-w-[1200px] lg:p-2"
      >
        <div className="hidden lg:block lg:w-1/2">
          <LoginBackground />
        </div>
        <div className="lg:flex lg:w-1/2 lg:items-center lg:justify-center">
          <LoginForm />
        </div>
      </motion.div>
    </div>
  )
}

export default Login
