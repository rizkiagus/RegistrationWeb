<template>
  <div>
    <v-data-table
      ref="myTable"
      :headers="headers"
      :items="itemsWithIndex"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat class="mb-0 pb-0">
            <v-toolbar-title class="text-capitalize mx-auto">laporan data siswa tahun ajaran 2022/2023</v-toolbar-title>
        </v-toolbar>
        <p class="font-weight-bold body-2 mx-auto text-center">SMK Yapim Indrapura</p>
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
              ></v-text-field>
              <v-btn
                @click="download"
                depressed
                class="my-4 text-capitalize"
                color="indigo lighten-3"
              >
                Download
              </v-btn>
            </v-col>
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
            <v-col>
              <v-select
                outlined
                dense
                label="Filter Tahun Ajaran"
                v-model="pilihtahun"
                :items="tahun"
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
      <template v-slot:[`item.nomor`]="{ index }">
        {{ index + 1 }}
      </template>
    </v-data-table>
  </div>
</template>
<script>
import router from "@/router";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
export default {
  name: "SiswaView",
  data: () => ({
    name: "makan",
    search: "",
    pilih: null,
    pilihtahun: null,
    year: new Date(),
    tahun: [
      {
        text: "Semua",
        value: null,
      },
      {
        text: '2022/2023',
        value: "2022/2023"
      },
      {
        text: '2023/2024',
        value: "2023/2024"
      },
      {
        text: '2024/2025',
        value: "2024/2025"
      },
      {
        text: '2025/2026',
        value: "2025/2026"
      },
    ],
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
          text: "No",
          align: "start",
          sortable: true,
          value: "nomor",
        },
        {
          text: "Nama Siswa",
          align: "start",
          sortable: false,
          value: "nama",
        },
        { text: "Agama", value: "agama", sortable: false },
        { text: "Sekolah Asal", value: "sekolah_asal", sortable: false },
        {
          text: "Jurusan Yang Diambil",
          value: "jurusan",
          filter: this.filterJurusan,
          sortable: false,
        },
        {
          text: "T/A",
          value: "tahun_ajaran",
          filter: this.filterTahun,
          sortable: false,
        },
        { text: "Nomor HP", value: "telp", sortable: false },
        { text: "Aksi", value: "id", align: "center", sortable: false },
      ];
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    itemsWithIndex() {
      return this.dataSiswa.map((dataSiswa, index) => ({
        ...dataSiswa,
        index: index + 1,
      }));
    },
    itemsData(){
      return this.$refs['myTable'].map((itemsWithIndex) => ({
        ...itemsWithIndex
      }))
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
    download() {
      const data = this.$refs['myTable'].items
      console.log(data)
      const columns = [
        { title: "No", dataKey: "index" },
        { title: "Nama", dataKey: "nama" },
        { title: "Agama", dataKey: "agama" },
        { title: "Sekolah Asal", dataKey: "sekolah_asal" },
        { title: "Jurusan Yang Diambil", dataKey: "jurusan" },
        { title: "No. HP", dataKey: "telp" },
      ];
      let pdfName = "Siswa Terdaftar";
      var doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "letter",
      });
      doc.setFontSize(16).text(`Daftar Siswa Yang Mendaftar Pada Tahun Ajaran ${this.year.getFullYear()} / ${this.year.getFullYear()+1}`, 0.5, 1.0);
      autoTable(doc, {
        columns,
        body: data,
        margin: { left: 0.5, top: 1.25 },
      });
      doc.save(pdfName + ".pdf");
    },
    filterJurusan(value) {
      if (!this.pilih) {
        return true;
      }
      return value === this.pilih;
    },
    filterTahun(value) {
      if (!this.pilihtahun) {
        return true;
      }
      return value === this.pilihtahun;
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
