<template>
	<main class="row">
		<div class="col-2 center card" style="background: white; padding: 1rem;">
			<h2>Atendimentos</h2>
			<TrendChart :datasets="dataSet" :grid="grid" :labels="labels" :min="0"></TrendChart>
		</div>

		<div class="col-4 center" v-if="qr != ''">
			<vue-qr :text="qr" :size="230" :dotScale="0.7"></vue-qr>
			<div class="col-1 text-center" v-if="qr">
				<h1 class="text-white">{{textWaiting}}</h1>
			</div>
		</div>
		<div class="col-4 center" v-else>
			<div class="square rounded bg-purple" v-if="connected">
				<div class="col-1 center">
					<h3 class="text-white">Whatsapp Conectado</h3>
					<button class="btn btn-red" @click="disconnect" :disabled="disabled">Sair</button>
				</div>
			</div>
			<div class="square" v-if="qr === '' && connected == false">
				<h3 class="text-white">Conectando</h3>
			</div>
		</div>
		<div class="col-1">
			<div class="col-2 center card" style="margin-left: 12rem; padding-top: 1rem;">
				<div class="col-1">Período</div>
				<label for="dtInicio">Início</label>
				<input type="date" name="dtInicio" id="dtInicio">
				<label for="dtFinal">Fim</label>
				<input type="date" name="dtFinal" id="dtFinal">
				<div style="margin-top: -15px">
					<button class="btn bg-red text-white">Filtrar</button>
					<button class="btn bg-purple">Download</button>
				</div>
			</div>
		</div>
		<div class="col-1">
			<div class="col-2 center card" style="margin-left: 12rem; padding-top: 1rem;">
				<div class="col-1">Interações</div>
				<apexchart width="500" type="bar" :options="interacoes" :series="series"></apexchart>
			</div>
		</div>
		<div class="col-1">
			<div class="col-2 center card" style="margin-left: 12rem; padding-top: 1rem;">
				<div class="col-1">Semantico</div>
				<apexchart width="500" type="donut" :options="{}" :series="semantico"></apexchart>
			</div>
		</div>
		<div class="col-1">
			<div class="col-2 center card" style="margin-left: 12rem; padding-top: 1rem;">
				<div class="col-1">Retenção</div>
				<apexchart width="500" type="donut" :options="{}" :series="retencao"></apexchart>
			</div>
		</div>
	</main>
</template>

<script>
import Vue from "vue";
import VueQr from "vue-qr";
import url from "./../../config";
import axios from "axios";
import VueApexCharts from "vue-apexcharts";

Vue.component("apexchart", VueApexCharts);

export default {
	data() {
		return {
			qr: "",
			textWaiting: "Iniciando Whats",
			connected: false,
			disabled: false,
			increment: 0,
			dataSet: [
				{
					data: [10, 50, 20, 100, 40, 60, 80],
					smooth: true,
					fill: true
				}
			],
			grid: {
				verticalLines: true,
				horizontalLines: true
			},
			labels: {
				xLabels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
				yLabels: 5
			},
			interacoes: {
				chart: {
					id: "vuechart-example"
				},
				xaxis: {
					categories: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"]
				}
			},
			series: [
				{
					name: "Não Respondidos",
					data: [30, 40, 45, 50, 49, 60, 70]
				}
			],
			semantico: [79, 21],
			retencao: [85, 15],
		};
	},
	components: {
		VueQr
	},
	created() {
		this.socket();
		this.checkConnection();
	},
	mounted() {
		// eslint-disable-next-line
		console.log("TESTANDO");
	},
	methods: {
		socket() {
			this.$options.sockets.onmessage = data => {
				let ws = JSON.parse(data.data);
				switch (ws.event) {
					case "qr":
						this.qr = ws.msg;
						this.textWaiting = "Escaneie o QR Code com seu Whats";
						// eslint-disable-next-line
						console.log(this.qr);
						break;
					case "connecting":
						this.textWaiting = "Conectando ...";
						this.checkConnection();
						break;
					case "connected":
						this.resetQr();
						this.connected = true;
						break;
					case "disconnected":
						this.resetQr();
						this.connected = false;
						break;
					case "message":
						this.increment = this.increment + 1;
						// eslint-disable-next-line
						console.log(ws.msg);
						break;
					default:
						// eslint-disable-next-line
						console.log(ws);
						break;
				}
			};
		},
		checkConnection() {
			this.disabled = true;
			axios
				.get(`${url.HTTP}/adminTest`)
				.then(res => {
					this.disabled = false;
					this.connected = true;
					// eslint-disable-next-line
					console.log(res);
				})
				.catch(err => {
					if (typeof err.response.data === "undefined")
						return this.$swal("Erro no servidor Go");
					this.qr = err.response.data;
					this.connected = false;
					this.disabled = false;
				});
		},
		disconnect() {
			this.$swal
				.fire({
					title: "Tem certeza que deseja desconectar?",
					confirmButtonText: "Sim",
					showCancelButton: true,
					cancelButtonText: "Não"
				})
				.then(result => {
					if (result.value == true) this.disconnectRequest();
					// eslint-disable-next-line
					console.log(result);
				});
		},
		disconnectRequest() {
			axios
				.get(`${url.HTTP}/disconnect`)
				.then(() => {
					this.connected = false;
				})
				.catch(() => {
					this.connected = true;
				});
		},
		resetQr() {
			this.qr = "";
			this.textWaiting = "";
		}
	}
};
</script>

<style scoped>
.square {
	width: 230px;
	height: 230px;
	display: flex;
	justify-content: center;
	justify-items: center;
	align-content: center;
	align-items: center;
}
</style>
