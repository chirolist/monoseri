<template>
  <div class="text-center">
    <v-overlay :value="overlay" opacity=1>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  data: () => ({
    overlay: true,
  }),

  computed: {
    ...mapGetters(['isAuthenticated'])
  },

  async mounted() {
    setTimeout(() => {
      if (!this.isAuthenticated) {
        // ログインしていなかったら飛ぶページを設定
        this.$router.push('login')
      } else {
        this.overlay = false
      }
    }, 0)
  }
}
</script>
