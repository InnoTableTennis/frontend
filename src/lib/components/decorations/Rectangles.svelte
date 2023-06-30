<div class="container">
	<div class="rect right rotate-right top">
		<div class="rect upper" />
	</div>
	<div class="rect left rotate-right bottom">
		<div class="rect lower" />
	</div>
</div>

<style>
	.container {
		z-index: -10;
		position: absolute;
		width: 100%;
		height: 100%;
		bottom: 0;
		left: 0;
		overflow: hidden;
	}
	.rect {
		position: absolute;
		background: var(--secondary-color);
		height: 8vw;
		width: 100vw;
	}

	.rotate-right {
		-ms-transform: rotate(45deg);
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
	}

	.right {
		left: 20em;
	}
	.left {
		right: 24em;
	}
	.bottom {
		bottom: 5vw;
	}
	.top {
		top: 5vw;
	}
	.upper {
		bottom: 13vw;
	}
	.lower {
		top: 13vw;
	}

	@media (max-width: 550px) {
		.rotate-right.top {
			-ms-transform: rotate(-45deg);
			-webkit-transform: rotate(-45deg);
			transform: rotate(-45deg);
		}
		.rect {
			height: 25vw;
			width: 150vw;
		}
		.right {
			left: -20em;
		}
		.left {
			right: 0em;
		}
		.bottom {
			bottom: 0vw;
		}
		.top {
			top: 23vw;
		}
		.upper,
		.lower {
			display: none;
		}
	}
</style>
