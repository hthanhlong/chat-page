import googleSvg from './google.svg'
import x from './x.svg'
import OpenEye from './open-eye.svg'
import HiddenEye from './hidden-eye.svg'
import SignInImage from './images/signin.png'
import SignUpImage from './images/signup.png'
import AvatarSvg from './avatarDefault.svg'
import Menu from './menu.svg'
import Close from './close.svg'
import { CustomSvg } from '../components'

const GoogleIcon = () => <CustomSvg src={googleSvg} />
const XIcon = () => <CustomSvg src={x} />
const OpenPasswordIcon = () => <CustomSvg src={OpenEye} />
const HiddenPasswordIcon = () => <CustomSvg src={HiddenEye} />
const MenuIcon = ({ ...props }) => <CustomSvg src={Menu} {...props} />
const CloseIcon = ({ ...props }) => <CustomSvg src={Close} {...props} />

const AvatarDefault = ({
  avatarUrl,
  isOnline = false,
  size = 'xl',
}: {
  avatarUrl?: string
  isOnline?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}) => {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14',
  }

  return (
    <div
      className={`relative flex items-center justify-center ${sizeMap[size]} rounded-full border-2 max-lg:h-[40px] max-lg:w-[40px]`}
    >
      <img
        className="rounded-full"
        src={avatarUrl || AvatarSvg.toString()}
        alt="none"
      />
      {isOnline && (
        <span className="absolute bottom-0 left-7 h-2 w-2 rounded-full bg-lime-600"></span>
      )}
    </div>
  )
}

const SignInBackground = () => (
  <img src={SignInImage} className="object-fit h-full w-full" />
)

const SignUpBackground = () => (
  <img src={SignUpImage} className="object-fit h-full w-full" />
)

export {
  GoogleIcon,
  XIcon,
  OpenPasswordIcon,
  HiddenPasswordIcon,
  SignInBackground,
  SignUpBackground,
  AvatarDefault,
  MenuIcon,
  CloseIcon,
}
