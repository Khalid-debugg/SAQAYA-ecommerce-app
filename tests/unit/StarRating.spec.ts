import { shallowMount } from "@vue/test-utils"
import StarRating from "@/components/ui/StarRating.vue"

const mountStarRating = (rating: number) =>
  shallowMount(StarRating, { propsData: { rating } })

describe("StarRating", () => {
  it("returns 100 when the star is fully filled", () => {
    expect((mountStarRating(3).vm as any).getFill(3)).toBe(100)
  })

  it("returns 0 when the star is empty", () => {
    expect((mountStarRating(3).vm as any).getFill(5)).toBe(0)
  })

  it("returns the correct partial fill percentage", () => {
    expect((mountStarRating(3.5).vm as any).getFill(4)).toBe(50)
  })
})
