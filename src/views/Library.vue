<template>
  <div class="library container">
    <br>
    <h2>Question Catalog
      <b-dropdown right text="Course">
        <b-dropdown-item>All Courses</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item>MA 16100</b-dropdown-item>
        <b-dropdown-item>MA 26500</b-dropdown-item>
        <b-dropdown-item>Other Courses</b-dropdown-item>
      </b-dropdown>
    </h2>
    <p>Select multiple courses: https://vue-multiselect.js.org/</p>

    <div class="">
      <br>
      <b-button-group size="">
        <b-button>Create New Question</b-button>
        <b-button>Create New Exam</b-button>
        <b-button>View Exam Cart</b-button>
      </b-button-group>
      <br><br>
    </div>

    <div class="">
      <p>Populate from database</p>
      <table class="table table-bordered" style="width:100%">
          <tbody>
              <tr>
                <td><button class="btn" v-b-modal.actionModal><i class="fas fa-ellipsis-v"></i></button></td>
                <td><p>Tags</p></td>
                <td><p>Question + Answer</p></td>
                <td><button class="btn" v-b-modal.focusModal><i class="fas fa-eye" @click=""></i></button></td>
              </tr>
              <tr>
                <td><button class="btn" v-b-modal.actionModal><i class="fas fa-ellipsis-v"></i></button></td>
                <td><p>Tags</p></td>
                <td><p>Question + Answer</p></td>
                <td><button class="btn" v-b-modal.focusModal><i class="fas fa-eye"></i></button></td>
              </tr>
              <tr>
                <td><button class="btn" v-b-modal.actionModal><i class="fas fa-ellipsis-v"></i></button></td>
                <td><p>Tags</p></td>
                <td><p>Question + Answer</p></td>
                <td><button class="btn" v-b-modal.focusModal><i class="fas fa-eye"></i></button></td>
              </tr>
              <tr>
                <td><button class="btn" v-b-modal.actionModal><i class="fas fa-ellipsis-v"></i></button></td>
                <td><p>Tags</p></td>
                <td><p>Question + Answer</p></td>
                <td><button class="btn" v-b-modal.focusModal><i class="fas fa-eye"></i></button></td>
              </tr>
              <tr>
                <td><button class="btn" v-b-modal.actionModal><i class="fas fa-ellipsis-v"></i></button></td>
                <td><p>Tags</p></td>
                <td><p>Question + Answer</p></td>
                <td><button class="btn" v-b-modal.focusModal><i class="fas fa-eye"></i></button></td>
              </tr>
          </tbody>
      </table>
    </div>

    <div class="inner">
      <b-modal id="focusModal" size="lg" title="Question ID">
        <p>Author Info, graphs, course, tags, state, used on exams</p>
      </b-modal>

      <b-modal id="actionModal" size="" title="Question ID">
        Viewing more info about the problem
        <p>Describe a list of actions the user can take</p>
        <p>Select one of the following actions</p>
        <b-list-group>
          <b-list-group-item href="#">Clone - Copy this problem to my problems</b-list-group-item>
          <b-list-group-item href="#">Cart - Add this problem to my exam cart</b-list-group-item>
          <b-list-group-item href="#">Other action</b-list-group-item>
          <b-list-group-item href="#" disabled>Edit - Cannot edit another user's problem</b-list-group-item>
        </b-list-group>
      </b-modal>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Library',
  components: {
  }
}
</script>
