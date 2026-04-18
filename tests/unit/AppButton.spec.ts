import { shallowMount } from "@vue/test-utils"
import AppButton from "@/components/ui/AppButton.vue"

const mountAppButton = (propsData = {}) =>
  shallowMount(AppButton, { propsData })

describe("AppButton", () => {
  describe("modifier", () => {
    it.each([
      ["primary", "btn--primary"],
      ["dark", "btn--dark"],
      ["outline", "btn--outline"],
    ])("applies the correct class for modifier '%s'", (modifier, expected) => {
      expect(mountAppButton({ modifier }).classes()).toContain(expected)
    })

    it("applies no modifier class when modifier is empty", () => {
      expect(mountAppButton({ modifier: "" }).classes()).not.toContain("btn--")
    })
  })

  describe("type", () => {
    it.each(["button", "submit", "reset"])(
      "sets the correct type attribute '%s'",
      (type) => {
        expect(mountAppButton({ type }).attributes("type")).toBe(type)
      }
    )
  })

  describe("disabled", () => {
    it("is not disabled by default", () => {
      expect(mountAppButton().attributes("disabled")).toBeUndefined()
    })

    it("is disabled when disabled prop is true", () => {
      expect(mountAppButton({ disabled: true }).attributes("disabled")).toBe(
        "disabled"
      )
    })
  })
})
