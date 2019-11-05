<template>
  <b-container>
    <b-form @submit="compare" v-if="show">
      <b-form-group id="input-group-email" label="Email:" label-for="input-1">
        <b-form-input id="input-email" type="text" v-model="login.email" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-password" label="password:" label-for="input-2">
        <b-form-input id="input-password" type="password" v-model="login.password" required></b-form-input>
      </b-form-group>
    </b-form>

    <b-button type="submit" variant="primary">login</b-button>
  </b-container>
</template>

<script>
export default {
    layout:"login",
    data(){
        return {
            login: {
                email: "",
                password: ""
            }, 

            show: true,
            login: [{}]
        }
    },
    methods: {
        compare(){
            var data = {
                email: this.login.email,
                password: this.login.password
            }

            this.$axios.post('http://localhost:81/login/auth', data)
            .then(Response => {
          console.log(Response);
        })
        .catch(error => {
          console.log(error);
        });
        }
    }

}
</script>

<style>

</style>