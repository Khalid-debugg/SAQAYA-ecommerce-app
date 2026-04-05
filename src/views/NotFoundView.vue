<template>
  <div class="not-found">
    <!-- TODO: add breadcrumb when understood-->
    <div class="container">
      <section class="not-found__content">
        <h1 class="not-found__title">404 Not Found</h1>
        <p class="not-found__description">
          Your visited page not found. You may go to home page.
        </p>
        <router-link to="/" class="not-found__cta"
          >Back to home page</router-link
        >
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "NotFoundView",
})
</script>
