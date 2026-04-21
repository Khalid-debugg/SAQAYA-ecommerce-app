import { shallowMount } from "@vue/test-utils"
import CartList from "@/components/business/CartList.vue"
import CartItemComponent from "@/components/business/CartItem.vue"
import { CartItem } from "@/types/cart"
import { Product } from "@/types/product"

const mockRemoveFromCart = jest.fn()
const mockUpdateQuantity = jest.fn()
let mockCartItems: CartItem[] = []

jest.mock("@/store/cart", () => ({
  useCartStore: () => ({
    get cartItems() {
      return mockCartItems
    },
    removeFromCart: mockRemoveFromCart,
    updateQuantity: mockUpdateQuantity,
  }),
}))

const baseProduct: Product = {
  id: 1,
  title: "Test Product",
  description: "",
  category: "electronics",
  price: 10,
  rating: 4,
  discountPercentage: 0,
  stock: 10,
  images: [],
  thumbnail: "",
  reviews: [],
  meta: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    barcode: "",
    qrCode: "",
  },
}

const baseCartItem: CartItem = { product: baseProduct, quantity: 1 }
const secondCartItem: CartItem = {
  product: { ...baseProduct, id: 2 },
  quantity: 2,
}
const thirdCartItem: CartItem = {
  product: { ...baseProduct, id: 3 },
  quantity: 1,
}

const mountCartList = (cartItems: CartItem[]) => {
  mockCartItems = cartItems
  return shallowMount(CartList)
}

beforeEach(() => {
  mockRemoveFromCart.mockClear()
  mockUpdateQuantity.mockClear()
})

describe("CartList", () => {
  describe("rendering", () => {
    it("shows empty message when cart is empty", () => {
      expect(mountCartList([]).find('[data-test="cart-empty"]').exists()).toBe(
        true
      )
    })

    it("hides empty message when cart has items", () => {
      expect(
        mountCartList([baseCartItem]).find('[data-test="cart-empty"]').exists()
      ).toBe(false)
    })

    it("renders the correct number of cart items", () => {
      expect(
        mountCartList([
          baseCartItem,
          secondCartItem,
          thirdCartItem,
        ]).findAllComponents(CartItemComponent)
      ).toHaveLength(3)
    })
  })

  describe("removeFromCart", () => {
    it("commits REMOVE_FROM_CART with the correct product id", async () => {
      await mountCartList([baseCartItem])
        .findComponent(CartItemComponent)
        .vm.$emit("remove", 1)
      expect(mockRemoveFromCart).toHaveBeenCalledWith(1)
    })
  })

  describe("updateQuantity", () => {
    it("commits UPDATE_QUANTITY with correct payload when quantity >= 1", async () => {
      await mountCartList([baseCartItem])
        .findComponent(CartItemComponent)
        .vm.$emit("update-quantity", { id: 1, quantity: 2 })
      expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 2)
    })

    it.each([0, -1])(
      "commits REMOVE_FROM_CART instead when quantity is %s",
      async (quantity) => {
        await mountCartList([baseCartItem])
          .findComponent(CartItemComponent)
          .vm.$emit("update-quantity", { id: 1, quantity })
        expect(mockRemoveFromCart).toHaveBeenCalledWith(1)
      }
    )
  })
})
