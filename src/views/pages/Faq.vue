<template>
	<main class="row">
		<div class="row">
			<logo text="FIAPSON"></logo>
		</div>
		<div class="container text-white">
			<h1 class="text-big">F.A.Q</h1>
		</div>
		<div class="container bg-red">
			<p class="text-white row">Posso fazer perguntas sobre quaisquer Disciplinas?</p>
			<h3
				class="row"
			>R: Não para este Projeto Piloto estamos somente disponíveis com na Disciplina EAD de Algoritmos.</h3>
		</div>
		<div class="container">
			<p class="text-white row">Como funciona o Chat Bot?</p>
			<h3 class="row">
				R: É muito simples depois de
				<a href="login.html">logado</a> você pode clicar no logo-tipo do FIAPSON e falar sua dúvida próximo ao microfone de seu disposito. De qualquer forma nós criamos um roteiro
				<router-link to="/como-funciona">neste link</router-link>.
			</h3>
		</div>

		<div class="container bg-red">
			<p class="text-white row">Quando devo usar o FIAPSON?</p>
			<h3
				class="row"
			>R: Recomendamos usar o FIAPSON sempre que precisar, pois sempre estamos aprimorando nossa ferramenta para você ;).</h3>
		</div>
	</main>
</template>

<script>
export default {};
</script>