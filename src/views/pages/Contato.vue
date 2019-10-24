<template>
	<main class="row">
		<div class="row">
			<logo :width="800" :height="225"></logo>
		</div>
		<div class="row">
			<div class="col-2 card">
				<div class="card-title bg-green">
					<span class="text-white">Contato</span>
				</div>
				<div class="card-body">
					<div class="row left">
						<label for="nome" class>Nome</label>
						<input type="text" placeholder="Seu Nome" name="nome" id="nome" class="col-1 input-lg" />
					</div>
					<div class="row left">
						<label for="email" class>E-mail</label>
						<input
							type="text"
							placeholder="email@dominio.com"
							name="email"
							id="email"
							class="col-1 input-lg"
						/>
					</div>
					<div class="row left">
						<label for="mensagem" class>Mensagem</label>
						<textarea type="text" name="mensagem" id="mensagem" class="col-1 input-lg"></textarea>
					</div>
					<div class="row left">
						<button type="button" class="btn btn-red col-1">Enviar ;)</button>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
export default {};
</script>