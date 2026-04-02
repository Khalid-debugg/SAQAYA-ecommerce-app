<template>
  <div class="page-layout">
    <Header />
    <main class="page-layout__main">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/layouts/Header.vue"
import Footer from "@/components/layouts/Footer.vue"

export default {
  components: {
    Header,
    Footer,
  },
}
</script>

<style lang="scss" scoped></style>
