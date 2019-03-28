<template>
  <b-form id="examForm">
    <b-form-group label-cols
                  id="fieldset1"
                  label="Exam Name"
                  label-for="examNameInput">
      <b-form-input
        id="examNameInput"
        placeholder="e.g. Dr. Mummert"
        v-model="value.Title"
        required>
      </b-form-input>
    </b-form-group>
    <b-form-group
      id="description"
      label="Description:"
      label-for="des-input"
    >
      <b-form-textarea id="des-input" v-model="value.Description"/>
    </b-form-group>

    <b-form-group label-cols
                  id="semesterLabel"
                  label="Semester"
                  label-for="semesterInput">
      <b-form-input
        id="semesterInput"
        placeholder="e.g. Spring 2019"
        required>
      </b-form-input>
    </b-form-group>

    <b-form-group label-cols
                  id="courseSelect"
                  label="Course Name"
                  label-for="courseDropdown"
                  description="get list of courses for user">
      <b-form-select class="" id="courseDropdown">
        <option value="null">Please select an option</option>
        <option value="a">Course A</option>
        <option value="b">Course B</option>
        <option value="c">Course C</option>
        <option value="d">Course D</option>
      </b-form-select>
    </b-form-group>

    <b-form-group label-cols
                  id="sectionLabel"
                  label="Section"
                  label-for="sectionInput">
      <b-form-input
        id="sectionInput"
        placeholder="e.g. Section01"
        required>
      </b-form-input>
    </b-form-group>

    <b-form-group label-cols
                  id="dateLabel"
                  label="Exam Date"
                  label-for="dateInput">
      <b-form-input
        id="dateInput"
        type="date"
        v-model="date"
        required>
      </b-form-input>
    </b-form-group>

    <b-form-group label-cols
                  id="timeLabel"
                  label="Exam Time"
                  label-for="timeInput">
      <b-form-input
        id="timeInput"
        type="time"
        v-model="time"
        required>
      </b-form-input>
    </b-form-group>

  </b-form>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    value: {
      type: Object,
      required: true,
    }
  },
  computed: {
    date: {
      get () {
        return moment(this.value.Time).format('YYYY-MM-DD')
      },
      set (value) {
        const [year, month, day] = value.split('-')
        this.value.Time = moment(this.value.Time).year(year).month(parseInt(month) - 1).date(day).toDate()
        console.log('getback', moment(this.value.Time).format('YYYY-MM-DD'))
      },
    },
    time: {
      get () {
        return moment(this.value.Time).format('HH:mm')
      },
      set (value) {
        const [hour, minute] = value.split(':')
        this.value.Time = moment(this.value.Time).hour(hour).minute(minute).toDate()
      },
    }
  }
}
</script>
