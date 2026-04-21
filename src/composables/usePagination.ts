import { ref, computed, Ref } from "vue"

export function usePagination<T>(items: Ref<T[]>, itemsPerPage: number) {
  const currentPage = ref(0)

  const totalPages = computed(() =>
    Math.ceil(items.value.length / itemsPerPage)
  )

  const hasNext = computed(() => currentPage.value < totalPages.value - 1)

  const hasPrev = computed(() => currentPage.value > 0)

  const paginatedItems = computed(() => {
    const start = currentPage.value * itemsPerPage
    return items.value.slice(start, start + itemsPerPage)
  })

  function next() {
    if (hasNext.value) currentPage.value++
  }

  function prev() {
    if (hasPrev.value) currentPage.value--
  }

  return {
    currentPage,
    totalPages,
    hasNext,
    hasPrev,
    paginatedItems,
    next,
    prev,
  }
}
