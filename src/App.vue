<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand :to="{ name: 'home' }">BoilerExam</b-navbar-brand>
      <b-collapse is-nav id="nav-collapse">
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'library' }">Library</b-nav-item>
          <b-nav-item :to="{ name: 'problems' }">Problem Editor</b-nav-item>
          <b-nav-item :to="{ name: 'exams' }">Exam Builder</b-nav-item>
          <b-nav-item :to="{ name: 'metrics' }">Metrics</b-nav-item>
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
