<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand :to="{ name: 'home' }">BoilerExam</b-navbar-brand>
      <b-collapse is-nav id="nav-collapse">
        <b-navbar-nav>
          <b-nav-item-dropdown text="Library">
            <b-dropdown-item :to="{ name: 'library' }">Question Catalog</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'metrics' }">Metrics</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item :to="{ name: 'problems' }">Problem Editor</b-nav-item>
          <b-nav-item :to="{ name: 'exams' }">Exams</b-nav-item>
          <b-nav-item :to="{ name: 'cart' }"><i class="fas fa-shopping-cart"></i></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/dist/bootstrap-vue.css';

@import './styles/multiselect';

@import '~@fortawesome/fontawesome-free/css/all.css';
</style>
