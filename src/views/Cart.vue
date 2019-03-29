<template>
  <div class="">
    <br>
    <div class="inner">
      <b-button-group size="">
        <b-button variant="custom-orange">Generate Preview</b-button>
        <b-button variant="custom-orange">Download PDF</b-button>
        <b-button variant="custom-orange">Download LaTeX</b-button>
      </b-button-group>
    </div>
    <hr>
    <div class="inner">

      <draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
       <div v-for="element in myArray" :key="element.id">{{element.name}}</div>
     </draggable>

     <b-list-group>
      <b-list-group-item href="#" class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">Problem</h5>
          <small>3 day(s) ago
            <b-badge variant="primary">Draft</b-badge></small>
          </div>

          <p class="mb-1">
            Problem Preview (Image / Graph Zoom)
          </p>

          <small class="text-muted">Description / Tags / Other Information
            <br><b-button variant="warning" size="sm">Remove From Exam Cart</b-button>
          </small>
        </b-list-group-item>

        <b-list-group-item href="#" v-for="item in cartList"
        class="flex-column align-items-start">
        {{ item.questionID }}
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{ item.questionID }}</h5>
          <small>{{ item.editDate }}
            <b-badge variant="primary">{{ item.state }}</b-badge></small>
          </div>

          <p class="mb-1">
            Problem Preview (Image / Graph Zoom)
          </p>

          <small class="text-muted">{{ item.description }}
            <br><b-button variant="warning" size="sm">Remove From Exam Cart</b-button>
          </small>
        </b-list-group-item>

      </b-list-group>
    </div>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'cart',
  components: {
    draggable
  }
}
</script>
