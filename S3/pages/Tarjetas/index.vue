<template>

  <b-content>
    
    <nuxt-link :to="'/Tarjetas/registrarTarjeta'">
      <b-button variant="outline-dark">Agregar tarjeta</b-button>
    </nuxt-link>
    <div id="app" class="d-flex justify-content-center flex-wrap">
      <b-row class="mt-3">
        <b-col cols="10" md="auto" v-for="(tarjeta,index) in card" :key="index">
          <b-card no-body class="overflow-hidden row" style="max-width: 420px;" border-variant="dark">
            <b-row no-gutters>
              <b-col cols="10" md="6" v-if="tarjeta.franquicia == 'visa'">
                <b-card-img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Old_Visa_Logo.svg"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col cols="10" md="6" v-else>
                <b-card-img
                  src="https://media.wired.com/photos/5926dea77034dc5f91bece36/master/w_582,c_limit/Mastercard3-1.jpg"
                  class="rounded-0"
                ></b-card-img>
              </b-col>

              <b-col cols="10" md="6">
                <b-card-body :title="tarjeta.numero">
                  <b-card-text>{{tarjeta.fechaExpedicion }}</b-card-text>
                  <b-badge
                    variant="danger"
                    v-b-modal.modal-1
                    href="#"
                    v-b-popover.hover.top="'Eliminar Tarjeta'"
                    @click="datosParaEliminarTarjeta(index, tarjeta._id)"
                  ><i class="material-icons">delete</i></b-badge>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <b-modal id="modal-1" hide-footer hide-header no-close-on-backdrop>
      <p class="my-4">¿Seguro que quiere eliminar?</p>
      <b-button variant="danger" @click="$bvModal.hide('modal-1'), deleteCard(index, idTarjeta)">Eliminar</b-button>
      <b-button variant="secondary" @click="$bvModal.hide('modal-1')">Cancelar</b-button>
    </b-modal>
  </b-content>
</template>

<script>
export default {
  beforeMount() {
    this.getAllRecords();
  },
  data() {
    return {
      card: [],
      index: "",
      idTarjeta: ""
    };
  },
  methods: {
    getAllRecords() {
      this.$axios.get("http://localhost:81/tarjetas/").then(response => {
        console.log(response);
        if (response.data.error) {
          this.errorMessage = reponse.data.message;
        } else {
          app.user = response.data.tarjetas;
          this.card = response.data.tarjetas;
        }
      });
    },
    deleteCard(index, id) {
      let url = `http://localhost:81/tarjetas/${id}`;

      this.$axios
        .delete(url, id)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      this.card.splice(index, 1);
    },
    datosParaEliminarTarjeta(index, id) {
      this.index = index;
      this.idTarjeta = id;
    }
  }
};
</script>

<style>
@import url("../../styles/main.scss");
</style>