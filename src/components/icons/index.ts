import { VueConstructor } from "vue"

import SearchIcon from "./SearchIcon.vue"
import CartIcon from "./CartIcon.vue"
import FacebookIcon from "./FacebookIcon.vue"
import TwitterIcon from "./TwitterIcon.vue"
import InstagramIcon from "./InstagramIcon.vue"
import LinkedinIcon from "./LinkedinIcon.vue"
import BurgerIcon from "./BurgerIcon.vue"
import CloseIcon from "./CloseIcon.vue"

export type IconName =
  | "search"
  | "cart"
  | "facebook"
  | "twitter"
  | "instagram"
  | "linkedin"
  | "burger"
  | "close"

export const icons: Record<IconName, VueConstructor> = {
  search: SearchIcon,
  cart: CartIcon,
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  burger: BurgerIcon,
  close: CloseIcon,
}
