import SearchIcon from "./SearchIcon.vue"
import CartIcon from "./CartIcon.vue"
import FacebookIcon from "./FacebookIcon.vue"
import TwitterIcon from "./TwitterIcon.vue"
import InstagramIcon from "./InstagramIcon.vue"
import LinkedinIcon from "./LinkedinIcon.vue"
import BurgerIcon from "./BurgerIcon.vue"
import CloseIcon from "./CloseIcon.vue"
import SendIcon from "./SendIcon.vue"
import PhoneIcon from "./PhoneIcon.vue"
import MailIcon from "./MailIcon.vue"

export const icons = {
  search: SearchIcon,
  cart: CartIcon,
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  burger: BurgerIcon,
  close: CloseIcon,
  send: SendIcon,
  phone: PhoneIcon,
  mail: MailIcon,
} as const

export type IconName = keyof typeof icons
