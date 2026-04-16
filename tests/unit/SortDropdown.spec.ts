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

describe("SortDropdown", () => {
  describe("rendering", () => {
    it("renders the Sort by label", () => {
      expect(mountDropdown().find('[data-test="sort-label"]').text()).toBe(
        "Sort by"
      )
    })

    it.each(options.map((option) => [option, option.label]))(
      "w/e",
      (option, label) => {
        expect(
          mountDropdown(option as SortOption)
            .find("[data-test=sort-selected-label")
            .text()
        ).toBe(label)
      }
    )

    it("hides the menu by default", () => {
      expect(mountDropdown().find('[data-test="sort-menu"]').exists()).toBe(
        false
      )
    })

    it("shows the menu when trigger is clicked", async () => {
      const wrapper = mountDropdown()
      await wrapper.find('[data-test="sort-trigger"]').trigger("click")
      expect(wrapper.find('[data-test="sort-menu"]').exists()).toBe(true)
    })

    it("renders all options when menu is open", async () => {
      const wrapper = mountDropdown()
      await wrapper.find('[data-test="sort-trigger"]').trigger("click")
      expect(wrapper.findAll(".sort-dropdown__item")).toHaveLength(
        options.length
      )
    })

    it("renders no options when options array is empty", async () => {
      const wrapper = shallowMount(SortDropdown, {
        propsData: { value: defaultValue, options: [] },
      })
      await wrapper.find('[data-test="sort-trigger"]').trigger("click")
      expect(wrapper.findAll(".sort-dropdown__item")).toHaveLength(0)
    })

    it("applies active class only to the currently selected option", async () => {
      const wrapper = mountDropdown(options[1])
      await wrapper.find('[data-test="sort-trigger"]').trigger("click")
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
      await wrapper.find('[data-test="sort-trigger"]').trigger("click")
      await wrapper.find('[data-test="sort-trigger"]').trigger("click")
      expect(wrapper.find('[data-test="sort-menu"]').exists()).toBe(false)
    })

    it("toggles correctly on multiple rapid clicks", async () => {
      const wrapper = mountDropdown()
      await wrapper.find('[data-test="sort-trigger"]').trigger("click")
      await wrapper.find('[data-test="sort-trigger"]').trigger("click")
      await wrapper.find('[data-test="sort-trigger"]').trigger("click")
      expect(wrapper.find('[data-test="sort-menu"]').exists()).toBe(true)
    })
  })

  describe("selection", () => {
    it("emits the correct option for each selectable option", async () => {
      for (const option of options) {
        const wrapper = mountDropdown()
        await wrapper.find('[data-test="sort-trigger"]').trigger("click")
        await wrapper
          .find(`[data-test="sort-option-${option.value}"]`)
          .trigger("click")
        const emitted = wrapper.emitted("input")
        expect(emitted?.[0][0]).toEqual(option)
      }
    })

    it("closes the menu after selecting an option", async () => {
      const wrapper = mountDropdown()
      await wrapper.find('[data-test="sort-trigger"]').trigger("click")
      await wrapper
        .find(`[data-test="sort-option-${options[1].value}"]`)
        .trigger("click")
      expect(wrapper.find('[data-test="sort-menu"]').exists()).toBe(false)
    })

    it("emits and closes when selecting the already active option", async () => {
      const wrapper = mountDropdown(options[1])
      await wrapper.find('[data-test="sort-trigger"]').trigger("click")
      await wrapper
        .find(`[data-test="sort-option-${options[1].value}"]`)
        .trigger("click")
      const emitted = wrapper.emitted("input")
      expect(emitted?.[0][0]).toEqual(options[1])
      expect(wrapper.find('[data-test="sort-menu"]').exists()).toBe(false)
    })
  })
})
