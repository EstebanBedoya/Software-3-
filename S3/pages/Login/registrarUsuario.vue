<template>
  <b-container>
    <b-form @submit="addUser" v-if="show">
      <b-form-group id="input-group-Nombre" label="Nombres:" label-for="input-1">
        <b-form-input id="input-nombre" type="text" v-model="usuarios.nombres" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-Apellido" label="Apellidos:" label-for="input-2">
        <b-form-input id="input-apellido" type="text" v-model="usuarios.apellidos" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-Email" label="Email" label-for="input-3">
        <b-form-input id="input-email" v-model="usuarios.email" required type="email"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-Password" label="Password:" label-for="input-4">
        <b-form-input id="input-password" type="password" v-model="usuarios.password" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>
export default {
    layout:"login",
  beforeMount() {},
  data() {
    return {
      usuarios: {
        nombres: "",
        apellidos: "",
        email: "",
        password: ""
      },

      show: true,
      usuarios: [{}]
    };
  },
  methods: {
    addUser() {
      var data = {
        usuarios: this.usuarios.nombres,
        apellidos: this.usuarios.apellidos,
        email: this.usuarios.email,
        password: this.usuarios.password
      };

      this.$axios
        .post("http://localhost:81/usuarios/", data)
        .then(Response => {
          console.log(Response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
