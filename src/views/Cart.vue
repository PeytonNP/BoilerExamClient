<template>
	<div class="">
		<br><p>Items currently in user's cart</p>
		<p>Add drag and drop api to move questions to appropriate order</p>

		<div class="inner">
			<b-button-group size="">
		        <b-button variant="primary">Generate Preview</b-button>
		        <b-button variant="primary">Download PDF</b-button>
		        <b-button variant="primary">Download LaTeX</b-button>
		      </b-button-group>
		</div>
		<hr>

		<div class="inner">
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

				<b-list-group-item href="#" class="flex-column align-items-start">
					<div class="d-flex w-100 justify-content-between">
						<h5 class="mb-1">Problem</h5>
						<small>7 day(s) ago
						<b-badge variant="primary">Draft</b-badge></small>
					</div>

					<p class="mb-1">
						Problem Preview (Image / Graph Zoom)
					</p>

					<small class="text-muted">Description / Tags / Other Information
					<br><b-button variant="warning" size="sm">Remove From Exam Cart</b-button>
					</small>
				</b-list-group-item>

				<b-list-group-item href="#" class="flex-column align-items-start">
					<div class="d-flex w-100 justify-content-between">
						<h5 class="mb-1">Problem</h5>
						<small>13 day(s) ago
						<b-badge variant="primary">Draft</b-badge></small>
					</div>

					<p class="mb-1">
						Problem Preview (Image / Graph Zoom)
					</p>

					<small class="text-muted">Description / Tags / Other Information
					<br><b-button variant="warning" size="sm">Remove From Exam Cart</b-button>
					</small>
				</b-list-group-item>

				<b-list-group-item href="#" class="flex-column align-items-start">
					<div class="d-flex w-100 justify-content-between">
						<h5 class="mb-1">Problem</h5>
						<small class="text-muted">30 Day(s) Ago
						<b-badge variant="primary">Approved</b-badge></small>
					</div>

					<p class="mb-1">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
					</p>

					<small class="text-muted">Description / Tags / Other Information
					<br><b-button variant="warning" size="sm">Remove From Exam Cart</b-button>
					</small>
				</b-list-group-item>

				<b-list-group-item href="#" class="flex-column align-items-start">
					<div class="d-flex w-100 justify-content-between">
						<h5 class="mb-1">Problem</h5>
						<small class="text-muted">60 Day(s) Ago
						<b-badge variant="danger">Already Used</b-badge></small>
					</div>

					<p class="mb-1">
						Problem Preview (Image / Graph Zoom)
					</p>

					<small class="text-muted">Description / Tags / Other Information
					<br><b-button variant="warning" size="sm">Remove From Exam Cart</b-button>
					</small>
				</b-list-group-item>

				<b-list-group-item href="#" class="flex-column align-items-start">
					<div class="d-flex w-100 justify-content-between">
						<h5 class="mb-1">Problem</h5>
						<small class="text-muted">1 Day(s) Ago
						<b-badge variant="danger">Not Approved</b-badge></small>
					</div>

					<p class="mb-1">
						Problem Preview (Image / Graph Zoom)
					</p>

					<small class="text-muted">Description / Tags / Other Information
					<br><b-button variant="warning" size="sm">Remove From Exam Cart</b-button>
					</small>
				</b-list-group-item>

			</b-list-group>
		</div>

	</div>
</template>

<script>
export default {
  name: 'cart',
  components: {
  }
}
</script>
