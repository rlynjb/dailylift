(window.webpackJsonp=window.webpackJsonp||[]).push([[7,3,4],{336:function(t,e,n){var content=n(341);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(123).default)("9bd02650",content,!0,{sourceMap:!1})},337:function(t,e,n){var content=n(344);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(123).default)("5cd58748",content,!0,{sourceMap:!1})},339:function(t,e,n){var content=n(350);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(123).default)("7f4ba3cc",content,!0,{sourceMap:!1})},340:function(t,e,n){"use strict";n(336)},341:function(t,e,n){var r=n(122)((function(i){return i[1]}));r.push([t.i,"/*purgecss start ignore*/\n.input-field[data-v-271a157e]{\n  border:1px solid #d3d3d3;\n  padding:.1em .4em;\n  width:100%\n}\n.input-field[data-v-271a157e]:focus-visible{\n  outline:none;\n  border:1px solid grey\n}\n\n/*purgecss end ignore*/",""]),r.locals={},t.exports=r},342:function(t,e,n){t.exports=n.p+"img/kirby.b4f207c.jpg"},343:function(t,e,n){"use strict";n(337)},344:function(t,e,n){var r=n(122)((function(i){return i[1]}));r.push([t.i,"/*purgecss start ignore*/\n.image-field[data-v-26078075]{\n  min-height:12vw;\n  width:100%;\n  border:1px solid #d3d3d3\n}\n.image-field__btn[data-v-26078075]{\n  background:grey;\n  width:100%\n}\n\n/*purgecss end ignore*/",""]),r.locals={},t.exports=r},345:function(t,e,n){"use strict";n.r(e);var r=n(0).c.extend({name:"InputField",props:{label:String,val:String},methods:{update:function(t,e){this.$emit("input",{label:t,val:e.currentTarget.value})}}}),l=(n(340),n(59)),component=Object(l.a)(r,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"input-field-container"},[e("input",{staticClass:"input-field",attrs:{type:"text"},domProps:{value:t.val},on:{input:function(e){return t.update(t.label,e)}}})])}),[],!1,null,"271a157e",null);e.default=component.exports},346:function(t,e,n){"use strict";n.r(e);var r=n(0).c.extend({name:"ImageField",props:{value:String},methods:{setImage:function(t){var e=this,n=new FileReader;n.onloadend=function(t){e.$emit("input",{label:"image",val:n.result})},n.readAsDataURL(t.target.files[0])}}}),l=(n(343),n(59)),component=Object(l.a)(r,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"image-field"},[t.value?e("div",[e("img",{attrs:{src:t.value}})]):e("div",[e("img",{attrs:{src:n(342)}}),t._v(" "),e("input",{attrs:{type:"file",id:"myFile",name:"filename"},on:{input:t.setImage}})])])}),[],!1,null,"26078075",null);e.default=component.exports},349:function(t,e,n){"use strict";n(339)},350:function(t,e,n){var r=n(122)((function(i){return i[1]}));r.push([t.i,"/*purgecss start ignore*/\n.workout-card[data-v-3a2f78d2]{\n  display:grid;\n  grid-template-columns:repeat(12, minmax(0, 1fr));\n  gap:0.75rem;\n  --tw-bg-opacity:1;\n  background-color:rgba(248, 250, 252, var(--tw-bg-opacity));\n  padding:1rem\n}\n.workout-card__title[data-v-3a2f78d2]{\n  grid-column:span 12 / span 12;\n  margin-bottom:1rem;\n  font-size:1.4em;\n  line-height:1.3\n}\n.workout-card__title small[data-v-3a2f78d2]{\n  margin-top:0.25rem;\n  font-size:.5em;\n  display:block\n}\n.workout-card__image[data-v-3a2f78d2]{\n  grid-column:span 12 / span 12\n}\n.workout-card__content[data-v-3a2f78d2]{\n  grid-column:span 12 / span 12;\n  display:grid;\n  grid-template-columns:repeat(2, minmax(0, 1fr))\n}\n.workout-card__reps[data-v-3a2f78d2]{\n  grid-column:span 12 / span 12;\n  display:grid;\n  grid-template-columns:repeat(3, minmax(0, 1fr));\n  gap:0.5rem\n}\n.workout-card__label[data-v-3a2f78d2]{\n  grid-column:span 3 / span 3\n}\n.workout-card__input[data-v-3a2f78d2]{\n  grid-column:span 1 / span 1\n}\n\n/*purgecss end ignore*/",""]),r.locals={},t.exports=r},355:function(t,e,n){"use strict";n.r(e);n(32);var r=n(0),l=n(353),o=r.c.extend({name:"WorkoutCard",props:{exercise:{type:Object,default:function(){return{}}}},data:function(){return{toggleDetail:!1}},created:function(){this.update=Object(l.debounce)(this.update,2e3)},methods:{update:function(t){this.$set(this.exercise,t.label,t.val),this.$emit("input",this.exercise)}}}),d=(n(349),n(59)),component=Object(d.a)(o,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"workout-card"},[e("h2",{staticClass:"workout-card__title"},[e("InputField",{staticClass:"workout-card__input",attrs:{label:"name",val:t.exercise.name},on:{input:t.update}}),t._v(" "),e("small",[e("InputField",{staticClass:"workout-card__input",attrs:{label:"muscles",val:t.exercise.muscles},on:{input:t.update}})],1)],1),t._v(" "),e("ImageField",{staticClass:"workout-card__image",attrs:{label:"image"},on:{input:t.update},model:{value:t.exercise.image,callback:function(e){t.$set(t.exercise,"image",e)},expression:"exercise.image"}}),t._v(" "),e("button",{on:{click:function(){return t.toggleDetail=!t.toggleDetail}}},[t._v("Detail")]),t._v(" "),t.toggleDetail?e("div",{staticClass:"workout-card__content"},[e("div",{staticClass:"workout-card__reps"},[e("h6",{staticClass:"workout-card__label"},[t._v("Sets")]),t._v(" "),e("InputField",{staticClass:"workout-card__input",attrs:{label:"set1",val:t.exercise.set1},on:{input:t.update}}),t._v(" "),e("InputField",{staticClass:"workout-card__input",attrs:{label:"set2",val:t.exercise.set2},on:{input:t.update}}),t._v(" "),e("InputField",{staticClass:"workout-card__input",attrs:{label:"set3",val:t.exercise.set3},on:{input:t.update}}),t._v(" "),e("h6",{staticClass:"workout-card__label"},[t._v("Weight")]),t._v(" "),e("InputField",{staticClass:"workout-card__input",attrs:{label:"weight1",val:t.exercise.weight1},on:{input:t.update}}),t._v(" "),e("InputField",{staticClass:"workout-card__input",attrs:{label:"weight2",val:t.exercise.weight2},on:{input:t.update}}),t._v(" "),e("InputField",{staticClass:"workout-card__input",attrs:{label:"weight3",val:t.exercise.weight3},on:{input:t.update}}),t._v(" "),e("h6",{staticClass:"workout-card__label"},[t._v("Time")]),t._v(" "),e("InputField",{staticClass:"workout-card__input",attrs:{label:"minutes",val:t.exercise.minutes},on:{input:t.update}}),t._v(" "),e("InputField",{staticClass:"workout-card__input",attrs:{label:"seconds",val:t.exercise.seconds},on:{input:t.update}})],1)]):t._e()],1)}),[],!1,null,"3a2f78d2",null);e.default=component.exports;installComponents(component,{InputField:n(345).default,ImageField:n(346).default})}}]);