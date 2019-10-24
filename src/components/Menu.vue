<template>
	<nav class="nav" v-if="option != 'Demo'">
		<ul>
			<li>
				<router-link to="/">Início</router-link>
			</li>
			<li>
        <router-link to="/como-funciona">Como Funciona</router-link>
			</li>
			<li>
        <router-link to="/faq">FAQ</router-link>
			</li>
			<li>
        <router-link to="/contato">Contato</router-link>
			</li>
			<li>
        <router-link to="/login" v-if="option === 'Admin' || option==='Aluno'">Sair</router-link>
        <router-link to="/login" v-else>Login</router-link>
			</li>
		</ul>
	</nav>
</template>
<script>
  export default {
		name: "Menu",
		data() {
			return {
				option: "",
			}
		},
		created() {
			var url = (window.location.href).split("/")
			if(url[url.length-1] === 'login')
				this.option = "Login"
			else if(url[url.length-1] === 'admin')
				this.option = "Admin"
			else if(url[url.length-1] === 'aluno')
				this.option = "Aluno"
			else if(url[url.length-1] === 'demo')
				this.option = "Demo"
			else
				this.option = "Aluno"
		},
  };
</script>