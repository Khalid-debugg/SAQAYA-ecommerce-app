import { shallowMount } from "@vue/test-utils"
import AppBreadcrumb from "@/components/ui/AppBreadcrumb.vue"

const mockStore = {
  getters: { "products/selectedProductTitle": "Test Product" },
}

const mountBreadcrumb = (matched: object[]) =>
  shallowMount(AppBreadcrumb, {
    stubs: { RouterLink: true },
    mocks: {
      $store: mockStore,
      $route: { matched },
    },
  })

const makeRoute = (
  breadcrumb: string | ((store: object) => string),
  path: string
) => ({
  meta: { breadcrumb },
  path,
})

describe("AppBreadcrumb", () => {
  describe("rendering", () => {
    it("hides the nav when there are no routes with breadcrumb meta", () => {
      expect(
        mountBreadcrumb([{ meta: {}, path: "/" }])
          .find('[data-test="breadcrumb-nav"]')
          .exists()
      ).toBe(false)
    })

    it("shows the nav when there are breadcrumb routes", () => {
      expect(
        mountBreadcrumb([makeRoute("Products", "/products")])
          .find('[data-test="breadcrumb-nav"]')
          .exists()
      ).toBe(true)
    })
  })

  describe("crumb types", () => {
    it("renders a link for non-last crumbs", () => {
      const wrapper = mountBreadcrumb([
        makeRoute("Products", "/products"),
        makeRoute("Details", "/products/1"),
      ])
      expect(wrapper.find('[data-test="crumb-link"]').exists()).toBe(true)
    })

    it("renders a plain span for the last crumb", () => {
      const wrapper = mountBreadcrumb([makeRoute("Products", "/products")])
      expect(wrapper.find('[data-test="crumb-current"]').exists()).toBe(true)
    })

    it("does not render a link for the last crumb", () => {
      const wrapper = mountBreadcrumb([makeRoute("Products", "/products")])
      expect(wrapper.find('[data-test="crumb-link"]').exists()).toBe(false)
    })
  })

  describe("label resolution", () => {
    it("uses the string directly as the label", () => {
      const wrapper = mountBreadcrumb([makeRoute("Products", "/products")])
      expect(wrapper.find('[data-test="crumb-current"]').text()).toBe(
        "Products"
      )
    })

    it("calls the function with the store and uses the result as the label", () => {
      const breadcrumb = jest.fn(() => "Test Product")
      const wrapper = mountBreadcrumb([makeRoute(breadcrumb, "/products/1")])
      expect(breadcrumb).toHaveBeenCalledWith(mockStore)
      expect(wrapper.find('[data-test="crumb-current"]').text()).toBe(
        "Test Product"
      )
    })
  })
})
