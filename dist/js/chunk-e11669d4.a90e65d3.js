(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e11669d4"],{"06ab":function(t,e,a){},ab0d:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("main",{staticClass:"row"},[a("div",{staticClass:"col-2"},[a("logo",{attrs:{width:250,height:300,text:t.texto}}),a("div",{staticClass:"container"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.pergunta,expression:"pergunta"}],staticClass:"input",attrs:{type:"text"},domProps:{value:t.pergunta},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.enviarTexto(e)},input:function(e){e.target.composing||(t.pergunta=e.target.value)}}}),this.modoTexto?a("button",{staticClass:"button ripple digitar",attrs:{disabled:t.disable},on:{click:t.enviarTexto}},[t.loading&&this.modoTexto?a("img",{attrs:{src:"/image/loading.svg",width:"64"}}):a("i",{staticClass:"fas fa-play",staticStyle:{"font-size":"3rem"}})]):a("button",{staticClass:"button ripple digitar",on:{click:t.abrirInput}},[a("i",{staticClass:"far fa-keyboard",staticStyle:{"font-size":"3rem"}})]),t.gravando?a("button",{staticClass:"button ripple gravar",on:{click:t.parar}},[a("i",{staticClass:"fas fa-stop",staticStyle:{"font-size":"3rem"}})]):a("button",{staticClass:"button ripple gravar",on:{click:t.gravar}},[t.loading&&!this.modoTexto?a("img",{attrs:{src:"/image/loading.svg",width:"64"}}):a("i",{staticClass:"fa fa-microphone",staticStyle:{"font-size":"3rem"}})])]),a("div",{staticClass:"row"},[a("h1",{staticClass:"text-green",staticStyle:{"min-height":"50px"},attrs:{id:"resposta"}},[t._v(t._s(this.resposta))])])],1),a("div",{staticClass:"col-4",staticStyle:{position:"fixed",right:"0",top:"12%",width:"24%"}},[a("vue-qr",{attrs:{text:"https://api.whatsapp.com/send?phone=556296331035&text=&source=&data=",size:230,dotScale:.7}})],1)])},n=[],s=(a("96cf"),a("3b8d")),i=a("658f"),r=a.n(i),c=a("da43"),l=a.n(c),d={data:function(){return{texto:"FIAPSON",classe:"",pergunta:"",resposta:" ",loading:!1,modoTexto:!1,gravando:!1,disable:!1}},components:{VueQr:r.a},created:function(){},mounted:function(){},methods:{abrirInput:function(){this.modoTexto=!0,document.getElementsByClassName("input")[0].style.width="65%"},enviarTexto:function(){var t=this;this.disable=!0,this.loading=!0,this.resposta="Buscando conhecimento ...",this.classe="",this.axios.post("http://node.fiapson.com/msg",{msg:this.pergunta,from:"x",to:"fiapson",channel:"web"}).then(function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(a){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.resposta=a.data.msg,t.loading=!1,t.disable=!1,t.pergunta="";case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(){t.loading=!1,t.disable=!1,t.$swal.fire("Ocorreu um erro","Tente novamente!","error")}))},gravar:function(){this.modoTexto=!1,document.getElementsByClassName("input")[0].style.width="0%",this.gravando=!0,window.recorder=new l.a({sampleBits:16,numChannels:1}),window.recorder.start().catch((function(t){console.log("err",t)}))},parar:function(){var t=this;console.log("Parar"),this.resposta="Buscando conhecimento ...",this.loading=!0,this.gravando=!1,window.recorder.stop(),window.recorder.destroy().catch((function(t){console.log(t)}));var e=window.recorder.getWAVBlob(),a=URL.createObjectURL(e);console.log(a);var o={headers:{"Content-Type":"multipart/form-data;"},responseType:"blob"},n=new FormData;n.append("audio",e,"audio"),n.append("from","rm"),n.append("to","fiapson"),n.append("channel","web"),this.axios.post("http://node.fiapson.com/audio",n,o).then((function(e){var a=window.URL.createObjectURL(new Blob([e.data],{type:"audio/ogg; codecs=opus"}));t.resposta="",t.disable=!1,t.loading=!1;var o=new Audio(a);o.play(),console.log(a)})).catch((function(t){console.log(t)}))}},watch:{pergunta:function(t){return""==t||(this.disable=!1)}}},u=d,p=(a("bd25"),a("2877")),g=Object(p["a"])(u,o,n,!1,null,null,null);e["default"]=g.exports},bd25:function(t,e,a){"use strict";var o=a("06ab"),n=a.n(o);n.a}}]);
//# sourceMappingURL=chunk-e11669d4.a90e65d3.js.map