<template>
  <div id="app">
    <b-navbar toggleable type="dark" variant="dark">
    <b-navbar-toggle target="nav_text_collapse" />
    <b-navbar-brand :to="{ name: 'home' }">Boiler Exam</b-navbar-brand>
    <b-collapse is-nav id="nav_text_collapse">
      <b-navbar-nav>
        <b-nav-item-dropdown text="Library">
            <b-dropdown-item :to="{ name: 'library' }">Question Catalog</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'metrics' }">Metrics</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item :to="{ name: 'problems' }">Problem Editor</b-nav-item>
          <b-nav-item :to="{ name: 'exams' }">Exams</b-nav-item>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item :to="{ name: 'cart' }"><i class="fas fa-shopping-cart fa-lg"></i></b-nav-item>
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
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
