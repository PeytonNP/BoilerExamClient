<template>
  <div class="home">
    <p>Replace with B^e Custom Image</p>
    <div class="center-div">
      <p>Query list of courses available from the database (course titles as well?)</p>
      <h3>What course(s) do you teach?</h3>
      <b-button-group vertical>
        <b-button v-for="btn in buttons" :pressed.sync="btn.state" :variant="btn.variant" :key="btn.variant">
          {{ btn.caption }}&nbsp;
        </b-button>
      </b-button-group>
      <p>Selected State: <strong>{{ btnStates }}</strong></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      myToggle: false,
      toggleMA161: false,
      buttons: [
        { variant: 'primary', caption: 'MA 16010', state: false },
        { variant: 'primary', caption: 'MA 16020', state: false },
        { variant: 'primary', caption: 'MA 16100', state: false },
        { variant: 'primary', caption: 'MA 16200', state: false },
        { variant: 'primary', caption: 'MA 16600', state: false },
        { variant: 'primary', caption: 'MA 25000 - Linear Algebra', state: false },
        { variant: 'primary', caption: 'MA 26100 - Multivariate Calculus', state: false },
        { variant: 'primary', caption: 'MA 35100 - Elementary Linear Algebra', state: false },
        { variant: 'primary', caption: 'MA 36600 - Ordinary Differential Equations', state: false },
        { variant: 'primary', caption: 'MA 41600 - Probability', state: false }
      ]
    }
  },
  computed: {
    btnStates () {
      return this.buttons.map(btn => btn.state)
    }
  }
}
</script>
