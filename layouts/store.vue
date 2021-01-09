<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="red darken-3"
      dark
    >
      <v-toolbar-title
        class="pl-4 pr-4"
      >
        <span class="hidden-sm-and-down">monoseri</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        label="商品を探す"
      >
        <template v-slot:append>
          <v-btn color="red" fab small dark outlined
            @click=""><v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
      </v-text-field>
      <v-menu
        transition="slide-y-transition"
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
          >
          <v-icon>mdi-bell</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item >
            <v-list-item-title>Option 1</v-list-item-title>
          </v-list-item>
          <v-list-item disabled>
            <v-list-item-title>Option 2</v-list-item-title>
          </v-list-item>
          <v-list-item >
            <v-list-item-title>Option 3</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu
        transition="slide-y-transition"
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            large
            v-on="on"
          >
            <v-avatar
            color="red darken-3"
            size="32px"
            item
            >
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item >
            <v-list-item-title>Option 1</v-list-item-title>
          </v-list-item>
          <v-list-item @click=logout>
            <v-list-item-title>ログアウト</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
      <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from '~/plugins/firebase'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  components: {
  },

  props: {
    source: String,
  },
  data: () => ({
  }),

  computed: {
    ...mapState(['user']),
    ...mapGetters(['isAuthenticated'])
  },

  async mounted() {
    setTimeout(() => {
      if (!this.isAuthenticated) {
        // ログインしていなかったら飛ぶページを設定
        this.$router.push('/login')
      }
    }, 0)
  },

  methods : {
    ...mapActions(['setUser']),
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(user => {
        // ログインしたら飛ぶページを指定
        // this.$router.push("/member-page")
        this.$router.push('/')
      }).catch((error) => {
        alert(error)
      });
    },
    logout() {
      firebase.auth().signOut()
      .then(() => {
        this.setUser(null)
        this.$router.push('/login')
      }).catch((error) => {
        alert(error)
      })
    }
  }
}
</script>
