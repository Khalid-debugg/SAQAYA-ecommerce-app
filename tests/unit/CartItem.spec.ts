import { shallowMount } from "@vue/test-utils"
import CartItem from "@/components/business/CartItem.vue"
import { CartItem as CartItemType } from "@/types/cart"

const baseCartItem: CartItemType = {
  quantity: 2,
  product: {
    id: 1,
    title: "Test Product",
    description: "",
    category: "electronics",
    price: 50,
    rating: 4,
    discountPercentage: 0,
    stock: 10,
    images: [],
    thumbnail: "thumbnail.jpg",
    reviews: [],
    meta: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      barcode: "",
      qrCode: "",
    },
  },
}

const mountCartItem = (cartItem: CartItemType = baseCartItem) =>
  shallowMount(CartItem, { props: { cartItem } })

describe("CartItem", () => {
  describe("rendering", () => {
    it("displays the product title", () => {
      expect(mountCartItem().find('[data-test="product-title"]').text()).toBe(
        "Test Product"
      )
    })

    it("displays the correct quantity", () => {
      expect(mountCartItem().find('[data-test="quantity"]').text()).toBe("2")
    })

    it.each([
      ["src", "thumbnail.jpg"],
      ["alt", "Test Product"],
    ])("sets the correct %s on the product image", (attr, expected) => {
      expect(
        mountCartItem().find('[data-test="product-image"]').attributes(attr)
      ).toBe(expected)
    })

    it.each([
      [{ ...baseCartItem, quantity: 1 }, "$50.00"],
      [{ ...baseCartItem, quantity: 2 }, "$100.00"],
      [{ ...baseCartItem, quantity: 3 }, "$150.00"],
    ])("displays the correct total", (cartItem, expected) => {
      expect(mountCartItem(cartItem).find('[data-test="total"]').text()).toBe(
        expected
      )
    })
  })

  describe("remove", () => {
    it("emits remove with the correct product id when remove button is clicked", async () => {
      const wrapper = mountCartItem()
      await wrapper.find('[data-test="remove-btn"]').trigger("click")
      const emitted = wrapper.emitted("remove")
      expect(emitted).toBeTruthy()
      expect(emitted?.[0][0]).toBe(1)
    })
  })

  describe("quantity controls", () => {
    it("emits update-quantity with quantity + 1 when increment is clicked", async () => {
      const wrapper = mountCartItem()
      await wrapper.find('[data-test="increment-btn"]').trigger("click")
      const emitted = wrapper.emitted("update-quantity")
      expect(emitted).toBeTruthy()
      expect(emitted?.[0][0]).toEqual({ id: 1, quantity: 3 })
    })

    it("emits update-quantity with quantity - 1 when decrement is clicked", async () => {
      const wrapper = mountCartItem()
      await wrapper.find('[data-test="decrement-btn"]').trigger("click")
      const emitted = wrapper.emitted("update-quantity")
      expect(emitted).toBeTruthy()
      expect(emitted?.[0][0]).toEqual({ id: 1, quantity: 1 })
    })
  })
})
