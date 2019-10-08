<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand to="/Deudas">APO</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/Tarjetas">Tarjetas</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template slot="button-content">
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <b-container class="mt-5">
      <nuxt />
    </b-container>
  </div>
</template>

<script>
import Slider from "@jeremyhamm/vue-slider";

export default {
  components: {
    Slider
  }
};
</script>

<style>
@import url("../styles/main.scss");
</style>