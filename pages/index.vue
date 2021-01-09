<template>
     <v-row dense>
        <v-col
          v-for="(card, index) in cards"
          :key="index"
          cols="12" sm="6" md="4" lg="3"
        >
          <v-card link :to="{name:'detail-id',params:{id:card.id}}">
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
            </v-img>
            <v-card-text class="text--primary">
              <div >
                <v-icon
                  color="red" fab small
                  class="mr-2"
                >mdi-export
                </v-icon>Whitsunday Island
              </div>
              <div >
                <v-icon
                  color="blue" fab small
                  class="mr-2"
                >mdi-import
                </v-icon>Whitehaven Beach
              </div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon @click.stop="ss">mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row></template>

<script>
import OverLay from '~/components/OverLay.vue'
import firebase from '~/plugins/firebase'

export default {
  components: {
    OverLay
  },

  layout: 'store',

  data: () => ({
    align: [
      'start',
    ],
    db: firebase.firestore(),
    cards: [
      { id:3, title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3 },
      { id:3, title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3 },
      { id:3, title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3 },
      { id:3, title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3 },
      { id:3, title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3 },
      { id:3, title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3 },
      { id:3, title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3 },
      { id:3, title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3 },
      { id:3, title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3 },
      { id:3, title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3 },
      { id:3, title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3 },
      { id:3, title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
      { id:3, title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
      { id:3, title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
      { id:3, title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
      { id:3, title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
      { id:3, title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
      { id:3, title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
      { id:3, title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
      { id:3, title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
      { id:3, title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
      { id:3, title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
      { id:3, title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
    ],
    desserts: [],
  }),

  created () {
    this.db.collection("product").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.initialize(doc)
      })
    }).then(() => this.loading = false)
  },

  methods: {
    initialize (doc) {
      if (Object.keys(doc.data()).length > 0) {
        this.desserts.unshift({
          id:     doc.id,
          yuzuru: doc.data().yuzuru,
          motomu: doc.data().motomu,
          trade:  doc.data().trade,
          status: doc.data().status,
        })
      }
    },
    ss () { console.log(111) },
    aa () { console.log(222) }
  }
}
</script>
