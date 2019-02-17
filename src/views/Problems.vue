<template>
	<div>
		<p>Problems</p>
		<p>katex</p>

		<div class="inner">
			<b-button variant="primary">Save Progress</b-button>
			<b-button variant="info">Send Question for Approval</b-button>
			<b-button variant="primary">Other Action</b-button>
			<hr>

			<div>
				<b-form-textarea
				id="textarea1"
				v-model="text"
				placeholder="Enter something"
				rows="3"
				max-rows="6"
				/>
			</div>

			<div class="">
				<br><p>Add supporting images, graphs, tex, and other documents</p>
				<div>
					<b-form-file
					v-model="file"
					:state="Boolean(file)"
					placeholder="Choose a file..."
					drop-placeholder="Drop file here..."
					/>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'problems',
  components: {
  }
}
</script>
