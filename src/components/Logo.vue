<template lang="">
  <div class="logo col-1 fadeIn">
		<div id="wave" v-if="loading">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<h1 class="text-logo" v-else>{{text || "FIAPSON"}}</h1>
		<canvas id="canvas" :height="height || 400" :width="width || 500"></canvas>
  </div>
</template>

<script>
export default {
	name: "Logo",
	props: {
		height: {
			default: 250
		},
		width: {
			default: 800
		},
		text: {
			default: "Fiapson"
		},
		rangeMax: {
			default: 30
		}
	},
	data() {
		return {
			loading: false
		};
	},
	created() {},
	mounted() {
		this.render();
	},
	methods: {
		render() {
			const el = document.getElementById("canvas");
			const ctx = el.getContext("2d");
			const dpr = window.devicePixelRatio || 1;
			const pi = Math.PI;
			const points = 12;
			const radius = 200 * dpr;

			const elHeight = el.getAttribute("height")
				? parseInt(el.getAttribute("height"))
				: 200;
			const elWidth = el.getAttribute("width")
				? parseInt(el.getAttribute("width"))
				: 600;

			const h = elHeight * dpr;
			const w = elWidth * dpr;
			const center = {
				x: (w / 2) * dpr,
				y: (h / 2) * dpr
			};
			const circles = [];
			const rangeMin = 1;
			const rangeMax = this.rangeMax;
			// const rangeMax = 30;
			const showPoints = true;

			let mouseY = 0;
			let tick = 0;

			const gradient1 = ctx.createLinearGradient(0, 0, w, 0);
			gradient1.addColorStop(0, "#1CE831");
			gradient1.addColorStop(1, "#FF3877");

			const gradient2 = ctx.createLinearGradient(0, 0, w, 0);
			gradient2.addColorStop(0, "#48c6ef");
			gradient2.addColorStop(1, "#009C10");

			const gradient3 = ctx.createLinearGradient(0, 0, w, 0);
			gradient3.addColorStop(0, "#9795f0");
			gradient3.addColorStop(1, "#E91C5D");

			const gradient4 = ctx.createLinearGradient(0, 0, w, 0);
			gradient4.addColorStop(0, "#fff");
			gradient4.addColorStop(1, "#fff");

			const gradients = [gradient1, gradient2, gradient3, gradient4];

			window.addEventListener("mousemove", handleMove, true);

			function handleMove(event) {
				mouseY = event.clientY;
			}

			ctx.scale(dpr, dpr);

			el.width = w * dpr;
			el.height = h * dpr;

			for (var idx = 0; idx <= gradients.length - 1; idx++) {
				let swingpoints = [];
				let radian = 0;

				for (var i = 0; i < points; i++) {
					radian = ((pi * 2) / points) * i;
					var ptX = center.x + radius * Math.cos(radian);
					var ptY = center.y + radius * Math.sin(radian);

					swingpoints.push({
						x: ptX,
						y: ptY,
						radian: radian,
						range: random(rangeMin, rangeMax),
						phase: 0
					});
				}

				circles.push(swingpoints);
			}

			function swingCircle() {
				ctx.clearRect(0, 0, w * dpr, h * dpr);

				ctx.globalAlpha = 1;
				ctx.globalCompositeOperation = "source-over";

				for (let k = 0; k < circles.length; k++) {
					let swingpoints = circles[k];

					for (var i = 0; i < swingpoints.length; i++) {
						swingpoints[i].phase += random(1, 10) * -0.01;

						let phase = 4 * Math.sin(tick / 65);

						if (mouseY !== 0) {
							phase = mouseY / 200 + 1;
						}

						var r =
							radius +
							swingpoints[i].range * phase * Math.sin(swingpoints[i].phase) -
							rangeMax;

						swingpoints[i].radian += pi / 360;

						var ptX = center.x + r * Math.cos(swingpoints[i].radian);
						var ptY = center.y + r * Math.sin(swingpoints[i].radian);

						if (showPoints === true) {
							ctx.strokeStyle = "#96fbc4";

							ctx.beginPath();
							ctx.arc(ptX, ptY, 2 * dpr, 0, pi * 2, true);
							ctx.closePath();
							ctx.stroke();
						}

						swingpoints[i] = {
							x: ptX,
							y: ptY,
							radian: swingpoints[i].radian,
							range: swingpoints[i].range,
							phase: swingpoints[i].phase
						};
					}

					const fill = gradients[k];

					drawCurve(swingpoints, fill);
				}

				tick++;

				requestAnimationFrame(swingCircle);
			}

			requestAnimationFrame(swingCircle);

			function drawCurve(pts, fillStyle) {
				ctx.fillStyle = fillStyle;
				ctx.beginPath();
				ctx.moveTo(
					(pts[cycle(-1, points)].x + pts[0].x) / 2,
					(pts[cycle(-1, points)].y + pts[0].y) / 2
				);
				for (var i = 0; i < pts.length; i++) {
					ctx.quadraticCurveTo(
						pts[i].x,
						pts[i].y,
						(pts[i].x + pts[cycle(i + 1, points)].x) / 2,
						(pts[i].y + pts[cycle(i + 1, points)].y) / 2
					);
				}

				ctx.closePath();
				ctx.fill();
			}

			function cycle(num1, num2) {
				return ((num1 % num2) + num2) % num2;
			}

			function random(num1, num2) {
				var max = Math.max(num1, num2);
				var min = Math.min(num1, num2);
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}
		}
	},
	watch: {
		rangeMax: function(val) {
			// eslint-disable-next-line
			console.log(val);
			this.render();
		}
	}
};
</script>
<style scoped>
div#wave {
    position: absolute;
    margin-top: 29%;
    text-align: center;
    width: 100px;
    height: 100px;
    margin-left: 44%;
    margin-right: auto;
}
div#wave .dot {
	display: inline-block;
	max-height: 300px;
	width: 12px;
	height: 12px;
	border-radius: 50%;
	margin-right: 3px;
	background: #303131;
	animation: wave 1.3s linear infinite;
}
div#wave .dot:nth-child(2) {
	animation-delay: -1.1s;
}
div#wave .dot:nth-child(3) {
	animation-delay: -0.9s;
}

@keyframes wave {
	0%,
	60%,
	100% {
		transform: initial;
	}
	30% {
		transform: translateY(-55px);
	}
}
</style>