(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{337:function(e,t,n){var content=n(344);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(123).default)("5cd58748",content,!0,{sourceMap:!1})},342:function(e,t,n){e.exports=n.p+"img/kirby.b4f207c.jpg"},343:function(e,t,n){"use strict";n(337)},344:function(e,t,n){var r=n(122)((function(i){return i[1]}));r.push([e.i,"/*purgecss start ignore*/\n.image-field[data-v-26078075]{\n  min-height:12vw;\n  width:100%;\n  border:1px solid #d3d3d3\n}\n.image-field__btn[data-v-26078075]{\n  background:grey;\n  width:100%\n}\n\n/*purgecss end ignore*/",""]),r.locals={},e.exports=r},346:function(e,t,n){"use strict";n.r(t);var r=n(0).c.extend({name:"ImageField",props:{value:String},methods:{setImage:function(e){var t=this,n=new FileReader;n.onloadend=function(e){t.$emit("input",{label:"image",val:n.result})},n.readAsDataURL(e.target.files[0])}}}),l=(n(343),n(59)),component=Object(l.a)(r,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"image-field"},[e.value?t("div",[t("img",{attrs:{src:e.value}})]):t("div",[t("img",{attrs:{src:n(342)}}),e._v(" "),t("input",{attrs:{type:"file",id:"myFile",name:"filename"},on:{input:e.setImage}})])])}),[],!1,null,"26078075",null);t.default=component.exports}}]);