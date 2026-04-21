import { shallowMount } from "@vue/test-utils"
import { useRoute } from "vue-router"
import AppBreadcrumb from "@/components/ui/AppBreadcrumb.vue"

jest.mock("vue-router", () => ({
  useRoute: jest.fn(),
}))

jest.mock("@/store/products", () => ({
  useProductsStore: () => ({
    selectedProductTitle: "Test Product",
  }),
}))

const mountBreadcrumb = (matched: object[]) => {
  ;(useRoute as jest.Mock).mockReturnValue({ matched })
  return shallowMount(AppBreadcrumb, {
    global: {
      stubs: { RouterLink: true },
    },
  })
}

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
    it("renders a link for non-last crumbs and a span for the last", () => {
      const wrapper = mountBreadcrumb([
        makeRoute("Products", "/products"),
        makeRoute("Details", "/products/1"),
      ])
      expect(wrapper.find('[data-test="crumb-link"]').exists()).toBe(true)
      expect(wrapper.find('[data-test="crumb-current"]').exists()).toBe(true)
    })

    it("sets the correct path on non-last crumbs", () => {
      const wrapper = mountBreadcrumb([
        makeRoute("Products", "/products"),
        makeRoute("Details", "/products/1"),
      ])
      expect(wrapper.find('[data-test="crumb-link"]').attributes("to")).toBe(
        "/products"
      )
    })

    it("falls back to '/' when route path is empty", () => {
      const wrapper = mountBreadcrumb([
        makeRoute("Products", ""),
        makeRoute("Details", "/products/1"),
      ])
      expect(wrapper.find('[data-test="crumb-link"]').attributes("to")).toBe(
        "/"
      )
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
      expect(breadcrumb).toHaveBeenCalled()
      expect(wrapper.find('[data-test="crumb-current"]').text()).toBe(
        "Test Product"
      )
    })
  })
})
