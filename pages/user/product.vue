<template>
  <v-container fluid class="mb-12">
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      :loading="loading"
      loading-text="Loading... Please wait"
      :items-per-page="limit"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>交換募集リスト</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">募集する</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-card v-show="src !== ''">
                    <v-img
                      :src="src"
                      class="white--text align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      height="200px"
                    ></v-img>
                  </v-card>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-file-input
                        @change="getFileName"
                        accept="image/*"
                        label="トレード品の画像"
                        filled
                        prepend-icon="mdi-camera"
                      ></v-file-input>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.yuzuru"
                        :rules="nameRules"
                        label="譲るもの"
                        prepend-icon="mdi-export"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.motomu"
                        :rules="nameRules"
                        label="求めるもの"
                        prepend-icon="mdi-import"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.trade"
                        :rules="nameRules"
                        prepend-icon="mdi-rotate-right"
                        label="交換方法"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        :items="status"
                        v-model="editedItem.status"
                        label="status"
                        required
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">キャンセル</v-btn>
                <v-btn color="blue darken-1" @click="save">登録</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip :color="getColor(item.status)" dark>{{ item.status | toStatusName }}</v-chip>
      </template>
      <template v-slot:item.yuzuru="{ item }">
        {{ item.yuzuru | chunk }}
      </template>
      <template v-slot:item.motomu="{ item }">
        {{ item.motomu | chunk }}
      </template>

      <template v-slot:item.action="{ item }">
        <v-icon
          class="mr-2"
          @click="editItem(item)"
        >
          edit
        </v-icon>
        <v-icon
          class="mr-2"
          @click="deleteItem(item)"
        >
          delete
        </v-icon>
        <v-icon
          @click="deleteItem(item)"
        > 
          mdi-twitter
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {

  data: () => ({
    src: '',
    dialog: false,
    loading: true,
    limit: 15,
    headers: [
      {
        text: '譲るもの',
        align: 'left',
        sortable: false,
        value: 'yuzuru',
      },
      {
        text: '求めるもの',
        align: 'left',
        sortable: false,
        value: 'motomu',
      },
      { text: '交換方法', value: 'trade', sortable: false },
      { text: 'ステータス',align: 'center', value: 'status' },
      {
        align: 'center',
        sortable: false,
        value: 'action',
      },
    ],
    status: [
      { text: '交換呼びかけ中', value: 1 },
      { text: '停止中', value: 0 }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      yuzuru: '',
      motomu: '',
      trade: '',
      status: 1,
    },
    defaultItem: {
      id: '',
      yuzuru: '',
      motomu: '',
      trade: '',
      status: 1,
    },
    nameRules: [
      v => !!v || '値を入力してください',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    db: firebase.firestore(),
    storageRef: firebase.storage()
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '新規登録' : '編集'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.db.collection("product").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.initialize(doc)
      })
    }).then(() => this.loading = false)
  },

  mounted () {
    //this.db.collection("product").get().then((querySnapshot) => {
    //  querySnapshot.forEach((doc) => {
    //      console.log(`${doc.id} => ${doc.data()}`)
    //  })
    //})
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

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item)
      if (confirm('Are you sure you want to delete this item?')) {
        this.desserts.splice(index, 1)
        this.db.collection("product").doc(item.id).delete()
      }
    },

    close () {
      this.dialog = false
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
        this.db.collection("product").doc(this.editedItem.id).update({
          yuzuru: this.editedItem.yuzuru,
          motomu: this.editedItem.motomu,
          trade:  this.editedItem.trade,
          status: this.editedItem.status,
        }).then(() => {
          this.close()
        })
      } else {
        this.db.collection("product").add({
          yuzuru: this.editedItem.yuzuru,
          motomu: this.editedItem.motomu,
          trade:  this.editedItem.trade,
          status: this.editedItem.status,
        }).then((docRef) => {
          this.desserts.unshift({
            id:     docRef.id,
            yuzuru: this.editedItem.yuzuru,
            motomu: this.editedItem.motomu,
            trade:  this.editedItem.trade,
            status: this.editedItem.status,
          })
        }).then(() => {
          this.close()
        })
      }
    },

    getColor (status) {
      switch(status){
        case 1:
          return 'green';
        case 0:
          return 'gray';
      }
    },

    getFileName(file) {
      if (file !== null) {
        const uploadTask = this.storageRef.ref(file.name).put(file)
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.src = downloadURL
          console.log('File available at', downloadURL);
        })
      } else {
          this.src = ''
      }
    }
      
  }
}
</script>
