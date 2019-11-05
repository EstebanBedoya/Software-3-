<template>
  <div class="mt-4" id="app">
    <b-card header="Deudas" header-bg-variant="info" header-text-variant="white">
      <template v-slot:header>
        Deudas
        <b-button  style="float:right"  :to="'/deudas/registrarDeuda'" variant="primary">
          <i class="material-icons">add</i>
        </b-button>
      </template>
      <b-row class="mt-3">
        <b-col cols="10" md="auto" v-for="(deuda,index) in cards" :key="index">
          <b-card
            :header="deuda.entidad"
            border-variant="info"
            header-bg-variant="info"
            header-text-variant="white"
          >
            <b-card-text>Monto total: {{deuda.montoTotal}}</b-card-text>
            <b-card-text>Cuota: {{deuda.cuota}}</b-card-text>
            <b-card-text>Proximo pago: {{deuda.fechaPago}}</b-card-text>

            <b-badge
              href="#"
              variant="danger"
              v-b-modal.modal-2
              @click="datosParaEliminarDeuda(index, deuda._id)"
              v-b-popover.hover.top="'Eliminar Deuda'"
            >
              <i class="material-icons">delete</i>
            </b-badge>
            <b-badge
              href="#"
              variant="primary"
              v-b-modal.modal-1
              @click="setIdDeuda(deuda._id)"
              v-b-popover.hover.top="'Asignar tarjeta'"
            >
              <i class="material-icons">credit_card</i>
            </b-badge>
          </b-card>
        </b-col>

        <!-- <b-col cols="10" lg="3">
        <b-card
          header="agregar deuda"
          footer
          border-variant="info"
          header-bg-variant="info"
          header-text-variant="white"
        >
          <b-button :to="'/deudas/registrarDeuda'" variant="primary">
            <i class="material-icons">add</i>
          </b-button>
        </b-card>
        </b-col>-->

        <!-- <b-card header="More" border-variant="info" header-bg-variant="info" header-text-variant="white"></b-card> -->
      </b-row>
    </b-card>
    <b-modal id="modal-1" ref="my-modal" hide-footer title="APO">
      <div class="d-block text-center">
        <h3>Seleccionar tarjeta</h3>
      </div>

      <div v-for="(tarjeta,index) in tarjetas" :key="index">
        <b-button
          class="mt-3"
          variant="outline-primary"
          block
          @click="$bvModal.hide('modal-1'), addTarjetaInDeuda(idDeuda,tarjeta.numero)"
        >
          {{tarjeta.numero}}
          <b-badge variant="dark">{{tarjeta.franquicia}}</b-badge>
        </b-button>
      </div>
    </b-modal>

    <b-modal id="modal-2" hide-footer hide-header no-close-on-backdrop>
      <p class="my-4">¿Seguro que quiere eliminar?</p>
      <b-button
        variant="danger"
        @click="$bvModal.hide('modal-2'), deleteCard(index, idDeuda)"
      >Eliminar</b-button>
      <b-button variant="secondary" @click="$bvModal.hide('modal-2')">Cancelar</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.getAllRecords();
    this.getAllTarjetas();
  },
  data() {
    return {
      cards: [],
      tarjetas: [],
      idDeuda: "",
      index: ""
    };
  },
  methods: {
    deleteCard(index, id) {
      this.$axios
        .delete(`http://localhost:81/deudas/${id}`, id)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      this.cards.splice(index, 1);
    },
    getAllRecords() {
      this.$axios.get("http://localhost:81/deudas/").then(response => {
        // console.log(response.data.deudas);

        if (response.data.error) {
          this.errorMessage = reponse.data.message;
        } else {
          app.user = response.data.deudas;
          this.cards = response.data.deudas;
        }
      });
    },
    getAllTarjetas() {
      this.$axios.get(`http://localhost:81/tarjetas/`).then(response => {
        if (response.data.error) {
          this.errorMessage = reponse.data.message;
        } else {
          app.user = response.data.tarjetas;
          this.tarjetas = response.data.tarjetas;
        }
      });
    },
    addTarjetaInDeuda(id, value) {
      this.$axios
        .put(`http://localhost:81/deudas/${id}/${value}`, id, value)
        .then(response => {
          console.log(response);
        });
    },
    setIdDeuda(id) {
      this.idDeuda = id;
    },
    datosParaEliminarDeuda(index, id) {
      this.index = index;
      this.idDeuda = id;
    }
  }
};
</script>
<style>
@import url("../../styles/main.scss");
</style>