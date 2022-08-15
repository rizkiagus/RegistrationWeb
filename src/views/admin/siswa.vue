<template>
  <v-data-table
    :headers="headers"
    :items="dataSiswa"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Daftar Siswa Yang Sudah Mendaftar</v-toolbar-title>
      </v-toolbar>
      <v-card flat>
        <v-card-title class="body-2">Filter</v-card-title>
        <v-row class="mx-1">
          <v-col
            ><v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              outlined
              dense
              hide-details
            ></v-text-field
          ></v-col>
          <v-col>
            <v-select
              outlined
              dense
              label="Filter Berdasarkan Jurusan"
              v-model="pilih"
              :items="jurusan"
            >
            </v-select>
          </v-col>
        </v-row>
      </v-card>
    </template>
    <template v-slot:[`item.id`]="{ item }">
      <v-btn plain small class="text-capitalize" @click="goto(item.id)">
        Lihat Detail
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import router from "@/router";
export default {
  name: "SiswaView",
  data: () => ({
    search: "",
    pilih: null,
    jurusan: [
      {
        text: "Semua",
        value: null,
      },
      {
        text: "SMK: Teknik Komputer Jaringan",
        value: "SMK: Teknik Komputer Jaringan",
      },
      {
        text: "SMK: Teknik Kendaraan Ringan",
        value: "SMK: Teknik Kendaraan Ringan",
      },
    ],
    dialog: false,
    dialogDelete: false,
    // headers: [
    //   {
    //     text: "Nama Siswa",
    //     align: "start",
    //     sortable: false,
    //     value: "nama",
    //     filter: this.filterJurusan,
    //   },
    //   { text: "Agama", value: "agama" },
    //   { text: "Sekolah Asal", value: "sekolah_asal" },
    //   {
    //     text: "Jurusan Yang Diambil",
    //     value: "jurusan",
    //   },
    //   { text: "Nomor HP", value: "telp" },
    //   { text: "Aksi", value: "id", align: "center", sortable: false },
    // ],
    gotoIndex: "",
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    headers() {
      return [
        {
          text: "Nama Siswa",
          align: "start",
          sortable: false,
          value: "nama",
        },
        { text: "Agama", value: "agama" },
        { text: "Sekolah Asal", value: "sekolah_asal" },
        {
          text: "Jurusan Yang Diambil",
          value: "jurusan",
          filter: this.filterJurusan,
        },
        { text: "Nomor HP", value: "telp" },
        { text: "Aksi", value: "id", align: "center", sortable: false },
      ];
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    dataSiswa() {
      return this.$store.state.siswa.datasiswa;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },
  mounted() {
    this.$store.dispatch("siswa/getSiswa");
  },

  methods: {
    filterJurusan(value) {
      if (!this.pilih) {
        return true;
      }
      return value === this.pilih;
    },
    goto(id) {
      this.gotoIndex = router.push(`/siswa/detail/${id}`);
    },
    initialize() {
      this.desserts = [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
