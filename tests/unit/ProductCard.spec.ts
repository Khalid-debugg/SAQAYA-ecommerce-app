import { shallowMount } from "@vue/test-utils"
import ProductCard from "@/components/business/ProductCard.vue"
import { Product } from "@/types/product"

const baseProduct: Product = {
  id: 1,
  title: "Test Product",
  description: "A test product",
  category: "electronics",
  price: 100,
  rating: 4.5,
  discountPercentage: 10,
  stock: 50,
  images: ["image1.jpg"],
  thumbnail: "thumbnail.jpg",
  reviews: [
    {
      rating: 5,
      comment: "Great",
      date: "2024-01-07",
      reviewerName: "Reviewer",
      reviewerEmail: "reviewer@test.com",
    },
  ],
  meta: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    barcode: "123456789",
    qrCode: "https://qr-code-link.com/qr.png",
  },
}

const productFloatPrice: Product = { ...baseProduct, price: 99.5 }
const productZeroPrice: Product = { ...baseProduct, price: 0 }
const productNoReviews: Product = { ...baseProduct, reviews: [] }
const productMultipleReviews: Product = {
  ...baseProduct,
  reviews: [
    {
      rating: 5,
      comment: "Great",
      date: "2024-01-01",
      reviewerName: "Reviewer 2",
      reviewerEmail: "reviewer2@test.com",
    },
    {
      rating: 4,
      comment: "Good",
      date: "2024-01-02",
      reviewerName: "Reviewer 3",
      reviewerEmail: "reviewer3@test.com",
    },
    {
      rating: 3,
      comment: "Ok",
      date: "2024-01-03",
      reviewerName: "Reviewer 4",
      reviewerEmail: "reviewer4@test.com",
    },
  ],
}
const productNoDiscount: Product = { ...baseProduct, discountPercentage: 0 }
const productZeroPriceWithDiscount: Product = {
  ...baseProduct,
  price: 0,
  discountPercentage: 10,
}
const productWithKnownDiscount: Product = {
  ...baseProduct,
  price: 90,
  discountPercentage: 10,
}
const mountCardWrapper = (product: Product) =>
  shallowMount(ProductCard, {
    propsData: { product },
    stubs: { RouterLink: true },
  })

describe("ProductCard", () => {
  describe("rendering", () => {
    it("renders the product title", () => {
      expect(
        mountCardWrapper(baseProduct).find('[data-test="product-title"]').text()
      ).toBe("Test Product")
    })

    it.each([
      [productFloatPrice, "$99.50"],
      [productZeroPrice, "Free"],
    ])("renders the correct product price", (product, expected) => {
      expect(
        mountCardWrapper(product).find('[data-test="product-price"]').text()
      ).toBe(expected)
    })

    it.each([
      [baseProduct, "(1)"],
      [productNoReviews, "(0)"],
      [productMultipleReviews, "(3)"],
    ])("renders the correct review count", (product, expected) => {
      expect(
        mountCardWrapper(product).find('[data-test="review-count"]').text()
      ).toBe(expected)
    })

    it.each([
      ["alt", "Test Product"],
      ["src", "thumbnail.jpg"],
    ])("sets the correct attributes on the product image", (attr, expected) => {
      expect(
        mountCardWrapper(baseProduct)
          .find('[data-test="product-image"]')
          .attributes(attr)
      ).toBe(expected)
    })
  })
  describe("discount badge", () => {
    it.each([
      [baseProduct, true],
      [productNoDiscount, false],
      [productZeroPriceWithDiscount, false],
    ])("shows or hides the discount badge correctly", (product, expected) => {
      expect(
        mountCardWrapper(product).find('[data-test="discount-badge"]').exists()
      ).toBe(expected)
    })

    it.each([
      [baseProduct, true],
      [productNoDiscount, false],
      [productZeroPriceWithDiscount, false],
    ])("shows or hides the original price correctly", (product, expected) => {
      expect(
        mountCardWrapper(product).find('[data-test="original-price"]').exists()
      ).toBe(expected)
    })

    it("computes the correct original price", () => {
      expect(
        mountCardWrapper(productWithKnownDiscount)
          .find('[data-test="original-price"]')
          .text()
      ).toBe("$100.00")
    })
  })
})
