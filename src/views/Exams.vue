<template>
<b-container>
  <b-row class="py-5">
    <b-col>
      <b-list-group>
        <b-list-group-item :to="{ name: 'exam', params: { examID: 'testID' } }">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">MA261 - Fall18</h5>
            <small>3 days ago</small>
          </div>
          <p class="mb-1">
            <b-badge>Tested</b-badge>
            12 Questions
          </p>
        </b-list-group-item>
      </b-list-group>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
export default {
  name: 'Exams'
}
</script>

<style scoped>

</style>
