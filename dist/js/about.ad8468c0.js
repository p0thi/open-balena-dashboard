(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"07ac":function(e,t,n){var i=n("23e7"),s=n("6f53").values;i({target:"Object",stat:!0},{values:function(e){return s(e)}})},3253:function(e,t,n){"use strict";n("a449")},"3a73":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._l(e.apiKeys,(function(t){return n("div",{key:t.id},[n("div",[e._v(e._s(t.name))]),n("div",[e._v(e._s(t.key))]),n("vs-button",{on:{click:function(n){return e.deleteKey(t)}}},[e._v("Delete")])],1)})),n("vs-input",{on:{keypress:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.createKey(t)}},model:{value:e.newKeyName,callback:function(t){e.newKeyName=t},expression:"newKeyName"}})],2)},s=[],a={name:"UserSettings",created:function(){this.fetchKeys()},methods:{createKey:function(){var e=this;this.$balena.models.apiKey.create(this.newKeyName).then((function(t){console.log("key created",t),e.fetchKeys()}))},fetchKeys:function(){var e=this;this.$balena.models.apiKey.getAll().then((function(t){console.log("api keys",t),e.apiKeys=t}))},deleteKey:function(e){var t=this;this.$balena.models.apiKey.revoke(e.id).then((function(){t.fetchKeys()}))}},data:function(){return{newKeyName:void 0,apiKeys:void 0}}},r=a,c=n("2877"),o=Object(c["a"])(r,i,s,!1,null,"715d0567",null);t["default"]=o.exports},"44e7":function(e,t,n){var i=n("861d"),s=n("c6b6"),a=n("b622"),r=a("match");e.exports=function(e){var t;return i(e)&&(void 0!==(t=e[r])?!!t:"RegExp"==s(e))}},"4df4":function(e,t,n){"use strict";var i=n("0366"),s=n("7b0b"),a=n("9bdd"),r=n("e95a"),c=n("50c4"),o=n("8418"),l=n("35a1");e.exports=function(e){var t,n,v,d,u,f,h=s(e),b="function"==typeof this?this:Array,p=arguments.length,m=p>1?arguments[1]:void 0,g=void 0!==m,y=l(h),_=0;if(g&&(m=i(m,p>2?arguments[2]:void 0,2)),void 0==y||b==Array&&r(y))for(t=c(h.length),n=new b(t);t>_;_++)f=g?m(h[_],_):h[_],o(n,_,f);else for(d=y.call(h),u=d.next,n=new b;!(v=u.call(d)).done;_++)f=g?a(d,m,[v.value,_],!0):v.value,o(n,_,f);return n.length=_,n}},"4fad":function(e,t,n){var i=n("23e7"),s=n("6f53").entries;i({target:"Object",stat:!0},{entries:function(e){return s(e)}})},"5a34":function(e,t,n){var i=n("44e7");e.exports=function(e){if(i(e))throw TypeError("The method doesn't accept regular expressions");return e}},"6f53":function(e,t,n){var i=n("83ab"),s=n("df75"),a=n("fc6a"),r=n("d1e7").f,c=function(e){return function(t){var n,c=a(t),o=s(c),l=o.length,v=0,d=[];while(l>v)n=o[v++],i&&!r.call(c,n)||d.push(e?[n,c[n]]:c[n]);return d}};e.exports={entries:c(!0),values:c(!1)}},"8a79":function(e,t,n){"use strict";var i=n("23e7"),s=n("06cf").f,a=n("50c4"),r=n("5a34"),c=n("1d80"),o=n("ab13"),l=n("c430"),v="".endsWith,d=Math.min,u=o("endsWith"),f=!l&&!u&&!!function(){var e=s(String.prototype,"endsWith");return e&&!e.writable}();i({target:"String",proto:!0,forced:!f&&!u},{endsWith:function(e){var t=String(c(this));r(e);var n=arguments.length>1?arguments[1]:void 0,i=a(t.length),s=void 0===n?i:d(a(n),i),o=String(e);return v?v.call(t,o,s):t.slice(s-o.length,s)===o}})},"9bdd":function(e,t,n){var i=n("825a"),s=n("2a62");e.exports=function(e,t,n,a){try{return a?t(i(n)[0],n[1]):t(n)}catch(r){throw s(e),r}}},a449:function(e,t,n){},a630:function(e,t,n){var i=n("23e7"),s=n("4df4"),a=n("1c7e"),r=!a((function(e){Array.from(e)}));i({target:"Array",stat:!0,forced:r},{from:s})},aa72:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.getSelectedApp?n("div",{staticClass:"grid"},[n("vs-row",e._l(e.sortedDevices,(function(e){return n("vs-col",{key:e.uuid,attrs:{lg:"4",sm:"6",xs:"12","vs-justify":"center","vs-align":"center"}},[n("DeviceTile",{attrs:{details:e}})],1)})),1)],1):n("div")},s=[];function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function r(e){if(Array.isArray(e))return a(e)}n("a4d3"),n("e01a"),n("d3b7"),n("d28b"),n("3ca3"),n("ddb0"),n("a630");function c(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}n("fb6a"),n("b0c0");function o(e,t){if(e){if("string"===typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(e,t):void 0}}function l(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function v(e){return r(e)||c(e)||o(e)||l()}var d=n("5530"),u=n("2f62"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("vs-card",{on:{click:function(t){e.showDetailsDialog=!e.showDetailsDialog}},scopedSlots:e._u([{key:"title",fn:function(){return[n("h2",[e._v(e._s(e.details["device_name"]))])]},proxy:!0},{key:"text",fn:function(){return[n("p",[e._v("Online/VPN Connected: "+e._s(e.details["is_online"])+", "+e._s(e.details["is_connected_to_vpn"]))]),n("p",[e._v("IP Adress: "+e._s(e.details["ip_address"]))]),n("p",[e._v("Status / progress: "+e._s(e.details["overall_status"])+" / "+e._s(e.details["overall_progress"]))]),n("p",[e._v("UUID: "+e._s(e.details["uuid"]))]),n("p",[e._v("Last connectivity event: "+e._s(e._f("moment")(e.details["last_connectivity_event"],"DD.MM.YYYY, HH:mm:ss")))]),n("p",[e._v("Created at: "+e._s(e._f("moment")(e.details["created_at"],"DD.MM.YYYY, HH:mm:ss")))]),n("vs-button",{on:{click:e.restartDevice}},[e._v("Restart")])]},proxy:!0}])}),n("vs-dialog",{attrs:{"overflow-hidden":"",scroll:"","full-screen":""},scopedSlots:e._u([{key:"header",fn:function(){return[n("h4",[e._v(e._s(e.details["device_name"]))]),n("vs-button",{attrs:{icon:"",flat:""},on:{click:function(t){e.showEditNameDialog=!e.showEditNameDialog}}},[n("i",{staticClass:"bx bx-edit"})])]},proxy:!0}]),model:{value:e.showDetailsDialog,callback:function(t){e.showDetailsDialog=t},expression:"showDetailsDialog"}},[e.getSelectedDevice?n("div",[n("vs-navbar",{attrs:{id:"device-details-navbar"},model:{value:e.navbarItem,callback:function(t){e.navbarItem=t},expression:"navbarItem"}},[n("vs-navbar-item",{attrs:{active:e.navbarItem===e.details.uuid+"settings",id:e.details.uuid+"settings"}},[e._v(" Settings ")]),n("vs-navbar-item",{attrs:{active:e.navbarItem===e.details.uuid+"env",id:e.details.uuid+"env"}},[e._v(" Environment Variables ")])],1),e.navbarItem===e.details.uuid+"settings"?n("vs-row",[n("vs-col",{attrs:{lg:"6",sm:"12"}},[n("vs-table",{scopedSlots:e._u([{key:"thead",fn:function(){return[n("vs-tr",[n("vs-th",[e._v("Service")]),n("vs-th",[e._v("Status")]),n("vs-th")],1)]},proxy:!0},{key:"tbody",fn:function(){return e._l(e.getSelectedDevice["current_services"],(function(t,i,s){return n("vs-tr",{key:s,attrs:{data:t[0]}},[n("vs-td",[n("div",{staticClass:"service-list-name",style:"background-color: "+e.colors[t[0]["service_id"]]},[e._v(" "+e._s(i)+" ")])]),n("vs-td",[n("span",["Running"===t[0].status?n("i",{staticClass:"bx bx-check-circle",staticStyle:{color:"green"}}):n("i",{staticClass:"bx bx-error-circle",staticStyle:{color:"red"}})]),n("span",[e._v(" "+e._s(t[0].status))])]),n("vs-td",[n("vs-row",[n("vs-button",{attrs:{icon:"",flat:"",disabled:"Running"===t[0].status},on:{click:function(n){return e.startService(t[0].service_id)}}},[n("i",{staticClass:"bx bx-play"})]),n("vs-button",{attrs:{icon:"",flat:"",disabled:"Running"!==t[0].status},on:{click:function(n){return e.stopService(t[0].service_id)}}},[n("i",{staticClass:"bx bx-stop"})]),n("vs-button",{attrs:{icon:"",flat:"",disabled:"Running"!==t[0].status},on:{click:function(n){return e.restartService(t[0].service_id)}}},[n("i",{staticClass:"bx bx-refresh"})])],1)],1)],1)}))},proxy:!0}],null,!1,2261836017)})],1),n("vs-col",{attrs:{lg:"6",sm:"12"}},[n("div",{staticClass:"hardware-stats"},[n("vs-row",{staticClass:"spacing-row"},[n("vs-col",{attrs:{lg:"3",sm:"6",xs:"12"}},[n("div",{staticClass:"hardware-stats-text"},[n("span",[e._v("CPU")]),n("span",[e._v(e._s(e.getSelectedDevice["cpu_usage"])+"%")])]),n("div",{staticClass:"progress-background"},[n("div",{staticClass:"progress-status",style:"width: "+e.getSelectedDevice["cpu_usage"]+"%"})])]),n("vs-col",{attrs:{lg:"3",sm:"6",xs:"12"}},[n("div",{staticClass:"hardware-stats-text"},[n("span",[e._v("Temperature")]),n("span",[e._v("~"+e._s(e.getSelectedDevice["cpu_temp"])+"°C")])]),n("div",{staticClass:"progress-background"},[n("div",{staticClass:"progress-status",style:"width: "+e.getSelectedDevice["cpu_temp"]+"%"})])]),n("vs-col",{attrs:{lg:"3",sm:"6",xs:"12"}},[n("div",{staticClass:"hardware-stats-text"},[n("span",[e._v("Memory")]),n("span",[e._v(e._s(e.getSelectedDevice["memory_usage"])+" MB / "+e._s((e.getSelectedDevice["memory_total"]/1e3).toFixed(1))+" GB")])]),n("div",{staticClass:"progress-background"},[n("div",{staticClass:"progress-status",style:"width: "+e.getSelectedDevice["memory_usage"]/e.getSelectedDevice["memory_total"]*100+"%"})])]),n("vs-col",{attrs:{lg:"3",sm:"6",xs:"12"}},[n("div",{staticClass:"hardware-stats-text"},[n("span",[e._v("Storage")]),n("span",[e._v(e._s((e.getSelectedDevice["storage_usage"]/1e3).toFixed(1))+" GB/"+e._s((e.getSelectedDevice["storage_total"]/1e3).toFixed(1))+" GB")])]),n("div",{staticClass:"progress-background"},[n("div",{staticClass:"progress-status",style:"width: "+e.getSelectedDevice["storage_usage"]/e.getSelectedDevice["storage_total"]*100+"%"})])])],1)],1),n("div",{ref:"logContainer",staticClass:"log-container"},e._l(e.logs,(function(t,i){return n("div",{key:"line"+i},[n("span",{staticClass:"timestamp"},[e._v(e._s(e._f("moment")(t.timestamp,"DD.MM.YY - HH:mm:ss"))+":")]),n("span",{staticClass:"service",style:"background-color: "+e.colors[t.serviceId]},[e._v(e._s(e.getServiceNameByServiceId(t.serviceId)))]),n("span",{staticClass:"message",class:{"is-system":t.isSystem,"is-error":t.isStdErr}},[e._v(e._s(t.message))])])})),0)])],1):e.navbarItem===e.details.uuid+"env"?n("vs-row",[n("vs-col",[n("vs-table",{attrs:{striped:""},scopedSlots:e._u([{key:"thead",fn:function(){return[n("vs-tr",[n("vs-th",[e._v(" Name ")]),n("vs-th",[e._v(" Value ")]),n("vs-th",[e._v(" Actions ")]),n("vs-th",[e._v(" Created At ")]),n("vs-th",[e._v(" Last Modified At ")])],1)]},proxy:!0},{key:"tbody",fn:function(){return[e._l(e.sortedEnvVars,(function(t){return n("vs-tr",{key:t.id,attrs:{data:t}},[n("vs-td",[e._v(e._s(t.name))]),n("vs-td",{attrs:{edit:""},on:{click:function(n){e.envEditObject.edit=t,e.envEditObject.editProp="value",e.envEditObject.editActive=!0}}},[e._v(" "+e._s(t.value)+" ")]),n("vs-td",[n("vs-button",{attrs:{icon:"",flat:""},on:{click:function(n){return e.removeEnv(t)}}},[n("i",{staticClass:"bx bx-trash"})])],1),n("vs-td",[e._v(" "+e._s(e._f("moment")(t["created_at"],"DD.MM.YYYY - HH:mm:ss"))+" ")]),n("vs-td",[e._v(" "+e._s(e._f("moment")(t["modified_at"],"DD.MM.YYYY - HH:mm:ss"))+" ")])],1)})),n("vs-tr",[n("vs-td",[n("vs-input",{attrs:{"label-placeholder":"New variable name"},model:{value:e.newEnvObject.name,callback:function(t){e.$set(e.newEnvObject,"name",t)},expression:"newEnvObject.name"}})],1),n("vs-td",[n("vs-input",{attrs:{"label-placeholder":"New variable value"},model:{value:e.newEnvObject.value,callback:function(t){e.$set(e.newEnvObject,"value",t)},expression:"newEnvObject.value"}})],1),n("vs-td",[n("vs-button",{attrs:{icon:"",flat:""},on:{click:e.saveNewEnv}},[n("i",{staticClass:"bx bx-save"}),n("span",[e._v("Speichern")])])],1)],1)]},proxy:!0}],null,!1,639915550)}),n("vs-dialog",{attrs:{blur:""},scopedSlots:e._u([{key:"header",fn:function(){return[e._v(' Edit Prop "'+e._s(e.envEditObject.editProp)+'" ')]},proxy:!0}],null,!1,2754955381),model:{value:e.envEditObject.editActive,callback:function(t){e.$set(e.envEditObject,"editActive",t)},expression:"envEditObject.editActive"}},[e.envEditObject.editProp?n("vs-input",{on:{keypress:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.saveEnv(t)}},model:{value:e.envEditObject.edit[e.envEditObject.editProp],callback:function(t){e.$set(e.envEditObject.edit,e.envEditObject.editProp,t)},expression:"envEditObject.edit[envEditObject.editProp]"}}):e._e()],1)],1)],1):e._e()],1):e._e()]),n("vs-dialog",{attrs:{blur:""},model:{value:e.showEditNameDialog,callback:function(t){e.showEditNameDialog=t},expression:"showEditNameDialog"}},[n("vs-input",{model:{value:e.details["device_name"],callback:function(t){e.$set(e.details,"device_name",t)},expression:"details['device_name']"}}),n("vs-button",{on:{click:e.saveName}},[e._v("Save")])],1)],1)},h=[];function b(e){if(Array.isArray(e))return e}function p(e,t){var n=e&&("undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null!=n){var i,s,a=[],r=!0,c=!1;try{for(n=n.call(e);!(r=(i=n.next()).done);r=!0)if(a.push(i.value),t&&a.length===t)break}catch(o){c=!0,s=o}finally{try{r||null==n["return"]||n["return"]()}finally{if(c)throw s}}return a}}function m(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function g(e,t){return b(e)||p(e,t)||o(e,t)||m()}function y(e,t){var n="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=o(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var i=0,s=function(){};return{s:s,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:s}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,r=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return r=e.done,e},e:function(e){c=!0,a=e},f:function(){try{r||null==n["return"]||n["return"]()}finally{if(c)throw a}}}}n("8a79"),n("07ac"),n("4fad");var _={name:"DeviceTile",watch:{showDetailsDialog:function(e){e?this.startShowingDetails():this.stopShowingDetails()},navbarItem:function(e){null!==e&&void 0!==e&&e.endsWith("env")&&this.fetchEnvVars()}},created:function(){this.navbarItem="".concat(this.details.uuid,"settings")},updated:function(){this.$refs.logContainer&&(this.$refs.logContainer.scrollTop=this.$refs.logContainer.scrollHeight)},destroyed:function(){var e;null===(e=this.logger)||void 0===e||e.unsubscribe()},methods:Object(d["a"])(Object(d["a"])(Object(d["a"])({},Object(u["b"])({fetchDevice:"fetchDevice"})),Object(u["d"])({setSelectedDevice:"setSelectedDevice"})),{},{startShowingDetails:function(){var e,t=this;this.setSelectedDevice(null),this.interval=setInterval((function(){t.fetchDevice(t.details.uuid)}),5e3),this.fetchDevice(this.details.uuid),this.logs=[],null===(e=this.$balena)||void 0===e||e.logs.subscribe(this.details.uuid,{count:150}).then((function(e){t.logger=e,e.on("line",(function(e){t.$refs.logContainer&&(t.$refs.logContainer.scrollTop=t.$refs.logContainer.scrollHeight),t.logs.push(e)}))}))},stopShowingDetails:function(){var e;null===(e=this.logger)||void 0===e||e.unsubscribe(),clearInterval(this.interval)},restartDevice:function(){for(var e=0,t=Object.values(this.details["current_services"]);e<t.length;e++){var n,i=t[e],s=y(i);try{for(s.s();!(n=s.n()).done;){var a,r=n.value;null===(a=this.$balena)||void 0===a||a.models.device.restartService(this.details.uuid,r["image_id"])}}catch(c){s.e(c)}finally{s.f()}}},startService:function(e){this.$balena.models.device.startService(this.details.uuid,e)},stopService:function(e){this.$balena.models.device.stopService(this.details.uuid,e)},restartService:function(e){this.$balena.models.device.restartService(this.details.uuid,e)},getServiceNameByServiceId:function(e){for(var t=0,n=Object.entries(this.getSelectedDevice["current_services"]);t<n.length;t++){var i,s=g(n[t],2),a=s[0],r=s[1],c=y(r);try{for(c.s();!(i=c.n()).done;){var o=i.value;if(o["service_id"]===e)return a}}catch(l){c.e(l)}finally{c.f()}}return null},saveName:function(){var e=this;this.$balena.models.device.rename(this.details.uuid,this.details["device_name"]).then((function(){e.showEditNameDialog=!1}))},fetchEnvVars:function(){var e=this;this.fetchingEnvVars=!0,this.$balena.models.device.envVar.getAllByDevice(this.details.uuid,{}).then((function(t){e.envVars=t}))},saveEnv:function(){var e=this;this.envEditObject.editActive=!1,this.fetchingEnvVars=!0,this.$balena.models.device.envVar.set(this.details.uuid,this.envEditObject.edit.name,this.envEditObject.edit.value).then((function(){e.fetchEnvVars()}))},removeEnv:function(e){var t=this;this.$balena.models.device.envVar.remove(this.details.uuid,e.name).then((function(){t.fetchEnvVars()}))},saveNewEnv:function(){var e=this;this.$balena.models.device.envVar.set(this.details.uuid,this.newEnvObject.name,this.newEnvObject.value).then((function(){e.fetchEnvVars(),e.newEnvObject.name=void 0,e.newEnvObject.value=void 0}))}}),computed:Object(d["a"])(Object(d["a"])({},Object(u["c"])({getSelectedDevice:"getSelectedDevice"})),{},{sortedEnvVars:function(){var e=this;return this.envVars?v(this.envVars).sort((function(t,n){return e.$moment(t["created_at"])-e.$moment(n["created_at"])})):[]}}),props:{details:{required:!0}},data:function(){return{interval:void 0,showDetailsDialog:!1,showEditNameDialog:!1,envVars:void 0,fetchingEnvVars:!1,logs:[],envEditObject:{editActive:!1,edit:null,editProp:void 0},newEnvObject:{name:void 0,value:void 0},navbarItem:void 0,logger:void 0,colors:["#0C059A","#B36E2E","#C0BC0D","#9F4081","#2363CC","#EB5E7E","#AAA723","#D286A8","#318747"]}}},S=_,D=(n("aea2"),n("3253"),n("2877")),w=Object(D["a"])(S,f,h,!1,null,"532ca562",null),E=w.exports,x={name:"Devices",components:{DeviceTile:E},created:function(){this.interval=setInterval(this.fetchDevicesOfSelectedApp,2e4),this.fetchDevicesOfSelectedApp()},destroyed:function(){clearInterval(this.interval)},methods:Object(d["a"])({},Object(u["b"])({fetchDevicesOfSelectedApp:"fetchDevicesOfSelectedApp"})),computed:Object(d["a"])(Object(d["a"])({},Object(u["c"])({getSelectedAppDevices:"getSelectedAppDevices",getSelectedApp:"getSelectedApp"})),{},{sortedDevices:function(){return this.getSelectedAppDevices?v(this.getSelectedAppDevices).sort((function(e,t){return e["device_name"]<t["device_name"]?-1:e["device_name"]>t["device_name"]?1:0})):null}}),data:function(){return{interval:void 0}}},O=x,k=Object(D["a"])(O,i,s,!1,null,"b9ef0a74",null);t["default"]=k.exports},ab13:function(e,t,n){var i=n("b622"),s=i("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[s]=!1,"/./"[e](t)}catch(i){}}return!1}},aea2:function(e,t,n){"use strict";n("f7cf")},b0c0:function(e,t,n){var i=n("83ab"),s=n("9bf2").f,a=Function.prototype,r=a.toString,c=/^\s*function ([^ (]*)/,o="name";i&&!(o in a)&&s(a,o,{configurable:!0,get:function(){try{return r.call(this).match(c)[1]}catch(e){return""}}})},d28b:function(e,t,n){var i=n("746f");i("iterator")},e01a:function(e,t,n){"use strict";var i=n("23e7"),s=n("83ab"),a=n("da84"),r=n("5135"),c=n("861d"),o=n("9bf2").f,l=n("e893"),v=a.Symbol;if(s&&"function"==typeof v&&(!("description"in v.prototype)||void 0!==v().description)){var d={},u=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),t=this instanceof u?new v(e):void 0===e?v():v(e);return""===e&&(d[t]=!0),t};l(u,v);var f=u.prototype=v.prototype;f.constructor=u;var h=f.toString,b="Symbol(test)"==String(v("test")),p=/^Symbol\((.*)\)[^)]+$/;o(f,"description",{configurable:!0,get:function(){var e=c(this)?this.valueOf():this,t=h.call(e);if(r(d,e))return"";var n=b?t.slice(7,-1):t.replace(p,"$1");return""===n?void 0:n}}),i({global:!0,forced:!0},{Symbol:u})}},f7cf:function(e,t,n){},fb6a:function(e,t,n){"use strict";var i=n("23e7"),s=n("861d"),a=n("e8b5"),r=n("23cb"),c=n("50c4"),o=n("fc6a"),l=n("8418"),v=n("b622"),d=n("1dde"),u=d("slice"),f=v("species"),h=[].slice,b=Math.max;i({target:"Array",proto:!0,forced:!u},{slice:function(e,t){var n,i,v,d=o(this),u=c(d.length),p=r(e,u),m=r(void 0===t?u:t,u);if(a(d)&&(n=d.constructor,"function"!=typeof n||n!==Array&&!a(n.prototype)?s(n)&&(n=n[f],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return h.call(d,p,m);for(i=new(void 0===n?Array:n)(b(m-p,0)),v=0;p<m;p++,v++)p in d&&l(i,v,d[p]);return i.length=v,i}})}}]);
//# sourceMappingURL=about.ad8468c0.js.map