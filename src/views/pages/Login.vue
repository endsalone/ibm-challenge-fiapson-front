<template>
	<main class="row">
        <div class="row">
            <logo :width="800" :height="225" :text="texto"></logo>
        </div>
        <div class="row">
            <div class="col-3 card">
                <div class="card-title">
                    <span class="text-white">ENTRAR</span>
                </div>
                <div class="card-body">
                    <div class="row left">
                        <label for="rm" class="">RM</label>
                        <input type="text" placeholder="XXXXXX" name="rm" id="rm" v-model="rm" class="col-1 input-lg">
                    </div>
                    <div class="row left">
                        <label for="senha" class="">SENHA</label>
                        <input type="password" placeholder="*******" name="senha" id="senha" v-model="senha" class="col-1 input-lg">
                    </div>
                    <div class="row left">
                        <button type="button" class="btn btn-red col-1" @click="entrar">Entrar</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            texto: "FIAPSON",
            rm: "",
            senha: "",
        }
    },
    methods: {
        entrar: function(){
            if(this.rm === "12345" && this.senha === "12345")
                return this.$router.push('/aluno')
            if(this.rm === "admin" && this.senha === "admin")
                return this.$router.push('/admin')
            
            return this.$swal.fire("Usuário ou senha inválidos", "Tente novamente!", "error");
        }
    },
};
</script>