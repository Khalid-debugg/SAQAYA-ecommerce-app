// @ts-nocheck
import Vue from "vue"

export const paginationMixin = Vue.extend({
  data() {
    return {
      currentPage: 0,
      itemsPerPage: 4,
    }
  },
  computed: {
    items(): unknown[] {
      return []
    },
    totalPages(): number {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    hasNext(): boolean {
      return this.currentPage < this.totalPages - 1
    },
    hasPrev(): boolean {
      return this.currentPage > 0
    },
    paginatedItems(): unknown[] {
      const start = this.currentPage * this.itemsPerPage
      return this.items.slice(start, start + this.itemsPerPage)
    },
  },
  methods: {
    next() {
      if (this.hasNext) this.currentPage++
    },
    prev() {
      if (this.hasPrev) this.currentPage--
    },
  },
})
