import { shallowMount } from "@vue/test-utils"
import AppIcon from "@/components/ui/AppIcon.vue"

const mountAppIcon = (name: string, size = 24) =>
  shallowMount(AppIcon, { propsData: { name, size } })

describe("AppIcon", () => {
  it("renders the correct icon for a valid name", () => {
    expect(
      mountAppIcon("cart").findComponent({ name: "CartIcon" }).exists()
    ).toBe(true)
  })

  it("falls back to CloseIcon for an unknown icon name", () => {
    expect(
      mountAppIcon("non-existent-icon")
        .findComponent({ name: "CloseIcon" })
        .exists()
    ).toBe(true)
  })

  it("passes the correct size to the icon", () => {
    expect(
      mountAppIcon("cart", 32)
        .findComponent({ name: "CartIcon" })
        .attributes("width")
    ).toBe("32")
  })
})
