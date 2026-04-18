import { shallowMount } from "@vue/test-utils"
import SortDropdown from "@/components/ui/SortDropdown.vue"

interface SortOption {
  label: string
  value: string
  sortBy: string
  order: string
}

const options: SortOption[] = [
  { label: "Default", value: "default", sortBy: "", order: "" },
  { label: "Highest Rating", value: "rating", sortBy: "rating", order: "desc" },
  {
    label: "Price: High to Low",
    value: "price-high",
    sortBy: "price",
    order: "desc",
  },
  {
    label: "Price: Low to High",
    value: "price-low",
    sortBy: "price",
    order: "asc",
  },
  {
    label: "Discount Percentage",
    value: "discount",
    sortBy: "discountPercentage",
    order: "desc",
  },
]

const defaultValue: SortOption = options[0]

const mountDropdown = (value: SortOption = defaultValue) =>
  shallowMount(SortDropdown, {
    propsData: { value, options },
  })

const openMenu = async (wrapper: ReturnType<typeof mountDropdown>) => {
  await wrapper.find('[data-test="sort-trigger"]').trigger("click")
}

describe("SortDropdown", () => {
  describe("rendering", () => {
    it("hides the menu by default", () => {
      expect(mountDropdown().find('[data-test="sort-menu"]').exists()).toBe(
        false
      )
    })

    it("shows the menu when trigger is clicked", async () => {
      const wrapper = mountDropdown()
      await openMenu(wrapper)
      expect(wrapper.find('[data-test="sort-menu"]').exists()).toBe(true)
    })

    it("renders all options when menu is open", async () => {
      const wrapper = mountDropdown()
      await openMenu(wrapper)
      expect(wrapper.findAll(".sort-dropdown__item")).toHaveLength(
        options.length
      )
    })

    it("applies active class only to the currently selected option", async () => {
      const wrapper = mountDropdown(options[1])
      await openMenu(wrapper)
      options.forEach((option) => {
        const item = wrapper.find(`[data-test="sort-option-${option.value}"]`)
        if (option.value === options[1].value) {
          expect(item.classes()).toContain("sort-dropdown__item--active")
        } else {
          expect(item.classes()).not.toContain("sort-dropdown__item--active")
        }
      })
    })
  })

  describe("toggle", () => {
    it("closes the menu when trigger is clicked again", async () => {
      const wrapper = mountDropdown()
      await openMenu(wrapper)
      await wrapper.find('[data-test="sort-trigger"]').trigger("click")
      expect(wrapper.find('[data-test="sort-menu"]').exists()).toBe(false)
    })
  })

  describe("selection", () => {
    it.each(options.map((option) => [option.label, option]))(
      "emits the correct payload when '%s' is selected",
      async (_, option) => {
        const wrapper = mountDropdown()
        await openMenu(wrapper)
        await wrapper
          .find(`[data-test="sort-option-${(option as SortOption).value}"]`)
          .trigger("click")
        const emitted = wrapper.emitted("input")
        expect(emitted).toBeTruthy()
        expect(emitted?.[0][0]).toEqual(option)
      }
    )

    it("closes the menu after selecting an option", async () => {
      const wrapper = mountDropdown()
      await openMenu(wrapper)
      await wrapper
        .find(`[data-test="sort-option-${options[1].value}"]`)
        .trigger("click")
      expect(wrapper.find('[data-test="sort-menu"]').exists()).toBe(false)
    })
  })
})
