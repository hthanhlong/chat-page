import { useForm, SubmitHandler } from 'react-hook-form'
// import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import {
  PasswordInput,
  SignUpNow,
  Input,
  Title,
  ButtonSignIn,
  SignInDivider,
} from '../../ui'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../../../core/validation'
import { useMutation } from '@tanstack/react-query'
import { capitalizeFirstLetter } from '../../../utils'
import { useAuth } from '../../../core/hooks'
import { ISignIn, ISignInResponse, ISuccessResponse } from '../../../types'
import { AuthService } from '../../../core/services'

const SignInForm = () => {
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<ISignIn> = (data) => {
    signInFn(data)
  }

  const {
    mutate: signInFn,
    error,
    isPending,
  } = useMutation({
    mutationFn: (data: ISignIn) => {
      return AuthService.signIn(data)
    },
    onSuccess: (response: ISuccessResponse<ISignInResponse>) => {
      if (response.isSuccess) {
        setAuth(response.data)
        navigate('/')
      }
    },
  })

  // const redirectFn = async (
  //   data: ISuccessResponse<{
  //     accessToken: string
  //   }>,
  // ): Promise<void | undefined> => {
  //   if (data && data.isSuccess) {
  //     setGlobalLoading(true)
  //     await sleep(3000)
  //     setAuth(data?.data)
  //   }
  // }

  // const handleResponseMessage = async (response: unknown) => {
  //   // @ts-expect-error - //
  //   const result: ISuccessResponse = await AuthService.signInByGoogle(response)
  //   if (result.isSuccess) {
  //     await redirectFn(result)
  //   } else {
  //     console.error('Failed to login with Google', result)
  //   }
  // }

  // const handleErrorMessage = (error: unknown) => {
  //   console.error('Login error:', error)
  // }

  // useEffect(() => {
  //   if (accessToken) navigate('/')
  //   return () => {
  //     setGlobalLoading(false)
  //   }
  // }, [accessToken])

  return (
    <form
      className="flex-1 lg:px-24 lg:py-20"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <Title text="Log in" />
      <Input
        label="username"
        name="username"
        defaultValue="guest_1"
        register={register}
        errorMessage={errors.username?.message}
        placeholder="id: guest_1 or guest_2"
      />
      <PasswordInput
        register={register}
        defaultValue="Password123"
        errorMessage={errors.password?.message}
      />
      <div className="text-center text-xs">
        <p className="h-[16px] text-red-500">
          {/* @ts-expect-error - //*/}
          {error?.response?.data.message
            ? //  @ts-expect-error - //
              capitalizeFirstLetter(error?.response?.data.message)
            : ''}
        </p>
      </div>
      <ButtonSignIn isLoading={isPending} />
      <SignInDivider />
      {/* <div className="flex items-center justify-center">
        <GoogleLogin
          text="signin_with"
          theme="filled_blue"
          onSuccess={handleResponseMessage}
          onError={() => handleErrorMessage}
        />
      </div> */}

      <SignUpNow />
    </form>
  )
}

export default SignInForm
