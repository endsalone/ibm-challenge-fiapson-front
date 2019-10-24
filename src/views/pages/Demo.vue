<template>
	<main class="row">
		<div class="col-2">
			<logo :width="250" :height="300" :text="texto"></logo>
		</div>
		<div class="col-4" style="position: fixed; right: 0; top:12%; width:24%">
			<vue-qr
				text="https://api.whatsapp.com/send?phone=556296331035&text=&source=&data="
				:size="230"
				:dotScale="0.7"
			></vue-qr>
		</div>
	</main>
</template>

<script>
import VueQr from "vue-qr";
import Recorder from "js-audio-recorder";

export default {
	data() {
		return {
			texto: "FIAPSON",
			classe: "",
			pergunta: "",
			resposta: " ",
			modoTexto: false,
			gravando: false,
			disable: true
		};
	},
	components: {
		VueQr
	},
	created() {},
	mounted() {},
	methods: {
		abrirInput: function() {
			this.modoTexto = true;
			document.getElementsByClassName("input")[0].style.width = "65%";
		},
		enviarTexto: function() {
			this.classe = "";
			this.axios
				.post("http://node.fiapson.com/msg", {
					msg: this.pergunta,
					from: "x",
					to: "fiapson",
					channel: "web"
				})
				.then(async response => {
					this.resposta = response.data.msg;
					// this.classe = "resposta"
					this.pergunta = "";
				})
				.catch(() => {
					this.$swal.fire("Ocorreu um erro", "Tente novamente!", "error");
				});
		},
		gravar: function() {
			this.modoTexto = false;
			document.getElementsByClassName("input")[0].style.width = "0%";
			this.gravando = true;
			window.recorder = new Recorder({
				sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
				numChannels: 1 // 声道，支持 1 或 2， 默认是1
			});

			window.recorder.start().catch(err => {
				// eslint-disable-next-line
				console.log("err", err);
			});
		},
		parar: function() {
			// eslint-disable-next-line
			console.log("Parar");
			// window.recorder.stop();
			this.gravando = false;
			window.recorder.stop();
			window.recorder.destroy().catch(r => {
				// eslint-disable-next-line
				console.log(r);
			});

			let blobWav = window.recorder.getWAVBlob();
			let url = URL.createObjectURL(blobWav);
			let a = new Audio(url);
			a.play();
			// eslint-disable-next-line
			console.log(url);
			
			let config = {
				headers: {
					"Content-Type": `multipart/form-data;`
				},
				responseType: "blob"
				// timeout: 30000,
			};

			let formData = new FormData();
			formData.append("audio", blobWav, "audio");
			formData.append("from", "rm");
			formData.append("to", "fiapson");
			formData.append("channel", "web");

			this.axios
				.post("http://localhost:3000/audio", formData, config)
				.then(response => {
					let url = window.URL.createObjectURL(
						new Blob([response.data], { type: "audio/ogg; codecs=opus" })
					);
					let a = new Audio(url);
					a.play();
					// eslint-disable-next-line
					console.log(url);
				})
				.catch(err => {
					// eslint-disable-next-line
					console.log(err);
				});

			// window.recorder.play();
		}
	},
	watch: {
		pergunta: function(val) {
			return val != "" ? (this.disable = false) : true;
		}
	}
};
</script>
<style scope>
.input {
	padding: 15px;
	width: 0%;
	font-size: 2rem;
	border: 1px solid #c6c6;
	position: relative;
	z-index: 0;
	transition: width 1s, color 2s;
}
.input:focus {
	outline: none !important;
}
.button {
	border: 0px;
	width: 100px;
	height: 130px;
	background: #ff3877;
	padding: 0;
	border: none;
	text-align: center;
	margin-left: -3rem;
	margin-top: -20px;
	position: relative;
	z-index: 1;
}
button:focus {
	outline: none !important;
}
.ripple {
	background-position: center;
	transition: background 0.8s;
}
.ripple:hover {
	background: #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%)
		center/15000%;
}
.ripple:active {
	background-color: #6eb9f7;
	background-size: 100%;
	transition: background 0s;
}
button {
	border: none;
	padding: 12px 18px;
	font-size: 16px;
	text-transform: uppercase;
	cursor: pointer;
	color: white;
	background-color: #2196f3;
	outline: none;
}
@-webkit-keyframes pulse {
	0% {
		background-color: red;
	}
	50% {
		background-color: purple;
	}
	100% {
		background-color: red;
	}
}

.resposta {
	overflow: hidden; /* Ensures the content is not revealed until the animation */
	white-space: nowrap; /* Keeps the content on a single line */
	margin: 0 auto; /* Gives that scrolling effect as the typing happens */
	letter-spacing: 0.15em; /* Adjust as needed */
	animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
}

/* The typing effect */
@keyframes typing {
	from {
		width: 0;
	}
	to {
		width: 80%;
	}
}

/* The resposta cursor effect */
@keyframes blink-caret {
	from,
	to {
		border-color: transparent;
	}
	50% {
		border-color: orange;
	}
}

.recording {
	-webkit-animation: pulse 2s infinite;
}
.digitar {
	border-radius: 60px 0px 0px 60px;
}
.gravar {
	margin-left: -1px;
	border-radius: 0px 60px 60px 0px;
}
</style>