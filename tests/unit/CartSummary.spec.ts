import { shallowMount } from "@vue/test-utils"
import CartSummary from "@/components/business/CartSummary.vue"

let mockSubtotal = 0
let mockShippingCost = 0
let mockTotal = 0

jest.mock("@/store/cart", () => ({
  useCartStore: () => ({
    get subtotalUSD() {
      return mockSubtotal
    },
    get shippingCost() {
      return mockShippingCost
    },
    get totalUSD() {
      return mockTotal
    },
  }),
}))

const mountCartSummary = (subtotalUSD = 0, shippingCost = 0, totalUSD = 0) => {
  mockSubtotal = subtotalUSD
  mockShippingCost = shippingCost
  mockTotal = totalUSD
  return shallowMount(CartSummary)
}

describe("CartSummary", () => {
  describe("totals", () => {
    describe("subtotal", () => {
      it.each([
        [0, "$0.00"],
        [99.5, "$99.50"],
        [33.333, "$33.33"],
        [99.999, "$100.00"],
      ])("displays subtotal correctly", (subtotal, expected) => {
        expect(
          mountCartSummary(subtotal).find('[data-test="subtotal"]').text()
        ).toBe(expected)
      })
    })

    describe("shipping", () => {
      it.each([
        [0, "Free"],
        [20, "$20.00"],
      ])("displays shipping cost correctly", (shippingCost, expected) => {
        expect(
          mountCartSummary(0, shippingCost, 0)
            .find('[data-test="shipping"]')
            .text()
        ).toBe(expected)
      })
    })

    describe("total", () => {
      it.each([
        [0, "$0.00"],
        [99.5, "$99.50"],
        [33.333, "$33.33"],
        [99.999, "$100.00"],
      ])("displays shipping cost correctly", (total, expected) => {
        expect(
          mountCartSummary(0, 0, total).find('[data-test="total"]').text()
        ).toBe(expected)
      })
    })

    describe("subtotal + shipping = total", () => {
      it.each([
        [99.5, 20, 119.5, "$119.50"],
        [49.1, 10, 59.1, "$59.10"],
        [33.333, 5, 38.333, "$38.33"],
      ])(
        "calculates the total properly",
        (subtotal, shippingCost, total, expectedTotal) => {
          expect(
            mountCartSummary(subtotal, shippingCost, total)
              .find('[data-test="total"]')
              .text()
          ).toBe(expectedTotal)
        }
      )
    })
  })
})
