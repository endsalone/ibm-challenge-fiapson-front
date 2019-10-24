import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import( /* webpackChunkname: "index" */ './views/pages/Index.vue')
    },
    {
      path: '/como-funciona',
      name: 'comoFunciona',
      component: () => import( /* webpackChunkname: "como-funciona" */ './views/pages/ComoFunciona.vue')
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import( /* webpackChunkname: "faq" */ './views/pages/Faq.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import( /* webpackChunkname: "login" */ './views/pages/Login.vue')
    },
    {
      path: '/contato',
      name: 'contato',
      component: () => import( /* webpackChunkname: "contato" */ './views/pages/Contato.vue')
    },
    {
      path: '/aluno',
      name: 'aluno',
      component: () => import( /* webpackChunkname: "contato" */ './views/pages/Aluno.vue')
    },
    {
      path: '/admin',
      name: 'novaConexao',
      component: () => import( /* webpackChunkname: "nova-conexao" */ './views/admin/NovaConexao.vue')
    },
    {
      path: '/demo',
      name: 'novaConexao',
      component: () => import( /* webpackChunkname: "nova-conexao" */ './views/pages/Demo.vue')
    }
  ]
})
