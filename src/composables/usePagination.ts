import { ref, computed, Ref } from "vue"

export function usePagination<T>(items: Ref<T[]>, itemsPerPage: Ref<number>) {
  const currentPage = ref(0)

  const totalPages = computed(() =>
    Math.ceil(items.value.length / itemsPerPage.value)
  )

  const hasNext = computed(() => currentPage.value < totalPages.value - 1)

  const hasPrev = computed(() => currentPage.value > 0)

  const paginatedItems = computed(() => {
    const start = currentPage.value * itemsPerPage.value
    return items.value.slice(start, start + itemsPerPage.value)
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
