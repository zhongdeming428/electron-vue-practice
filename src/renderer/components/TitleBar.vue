<template>
  <div class="title-bar">
		<span class="close" @click="close"></span>
		<span class="maximize" @click="maximize"></span>
		<span class="minimize" @click="minimize"></span>
	</div>
</template>

<script>
	import { remote } from 'electron';
	export default {
		name: 'title-bar',
		data() {
			return {
				curWin: remote.BrowserWindow.getFocusedWindow()
			};
		},
		methods: {
			close() {
				this.curWin.close();
			},
			maximize() {
				let isMaximized = this.curWin.isMaximized();
				if (isMaximized) {
					this.curWin.unmaximize();
				}
				else {
					this.curWin.maximize();
				}
			},
			minimize() {
				this.curWin.minimize();
			}
		}
	}
</script>

<style scoped>
  .title-bar {
		position: fixed;
		top: 0;
		right: 0;
		/* z-index: 9999; */
		/* width: 100%; */
		height: 30px;
		background-color: white;
		/* -webkit-app-region: drag; */
	}
	.minimize,
	.maximize,
	.close {
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 0.6rem;
		background-color: yellow;
		float: right;
		margin-right: 0.5rem;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
		cursor: pointer;
		-webkit-app-region: no-drag
	}
	.maximize {
		background-color: yellowgreen
	}
	.close {
		background-color: red
	}
</style>
