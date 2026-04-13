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
import HeartIcon from "./HeartIcon.vue"
import QuickViewIcon from "./QuickViewIcon.vue"
import StarIcon from "./StarIcon.vue"
import ArrowUpIcon from "./ArrowUpIcon.vue"
import ArrowDownIcon from "./ArrowDownIcon.vue"
import BeautyIcon from "./BeautyIcon.vue"
import FragrancesIcon from "./FragrancesIcon.vue"
import FurnitureIcon from "./FurnitureIcon.vue"
import HomeDecorationIcon from "./HomeDecorationIcon.vue"
import MobileAccessoriesIcon from "./MobileAccessoriesIcon.vue"
import ArrowLeftIcon from "./ArrowLeftIcon.vue"
import ArrowRightIcon from "./ArrowRightIcon.vue"
import DeliveryIcon from "./DeliveryIcon.vue"
import ShieldIcon from "./ShieldIcon.vue"
import HeadPhoneIcon from "./HeadPhoneIcon.vue"

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
  heart: HeartIcon,
  view: QuickViewIcon,
  star: StarIcon,
  arrowUp: ArrowUpIcon,
  arrowDown: ArrowDownIcon,
  "arrow-left": ArrowLeftIcon,
  "arrow-right": ArrowRightIcon,
  beauty: BeautyIcon,
  fragrances: FragrancesIcon,
  furniture: FurnitureIcon,
  "home-decoration": HomeDecorationIcon,
  "mobile-accessories": MobileAccessoriesIcon,
  delivery: DeliveryIcon,
  shield: ShieldIcon,
  headphone: HeadPhoneIcon,
} as const

export type IconName = keyof typeof icons
