declare module "*.vue" {
  import { DefineComponent } from "vue"
  const component: DefineComponent<object, object, unknown>
  export default component
}

declare module "*.png" {
  const value: string
  export default value
}

declare module "*.jpg" {
  const value: string
  export default value
}

declare module "*.jpeg" {
  const value: string
  export default value
}

declare module "*.svg" {
  const value: string
  export default value
}
