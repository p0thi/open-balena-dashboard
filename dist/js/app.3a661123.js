(function(e){function t(t){for(var a,s,c=t[0],r=t[1],l=t[2],u=0,d=[];u<c.length;u++)s=c[u],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&d.push(i[s][0]),i[s]=0;for(a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a]);f&&f(t);while(d.length)d.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,s=1;s<n.length;s++){var c=n[s];0!==i[c]&&(a=!1)}a&&(o.splice(t--,1),e=r(r.s=n[0]))}return e}var a={},s={app:0},i={app:0},o=[];function c(e){return r.p+"js/"+({about:"about"}[e]||e)+"."+{about:"157af02a"}[e]+".js"}function r(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.e=function(e){var t=[],n={about:1};s[e]?t.push(s[e]):0!==s[e]&&n[e]&&t.push(s[e]=new Promise((function(t,n){for(var a="css/"+({about:"about"}[e]||e)+"."+{about:"d4e05801"}[e]+".css",i=r.p+a,o=document.getElementsByTagName("link"),c=0;c<o.length;c++){var l=o[c],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===a||u===i))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){l=d[c],u=l.getAttribute("data-href");if(u===a||u===i)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var a=t&&t.target&&t.target.src||i,o=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=a,delete s[e],f.parentNode.removeChild(f),n(o)},f.href=i;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){s[e]=0})));var a=i[e];if(0!==a)if(a)t.push(a[2]);else{var o=new Promise((function(t,n){a=i[e]=[t,n]}));t.push(a[2]=o);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,r.nc&&u.setAttribute("nonce",r.nc),u.src=c(e);var d=new Error;l=function(t){u.onerror=u.onload=null,clearTimeout(f);var n=i[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),s=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+s+")",d.name="ChunkLoadError",d.type=a,d.request=s,n[1](d)}i[e]=void 0}};var f=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},r.m=e,r.c=a,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/open-balena-dashboard/",r.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var f=u;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},1:function(e,t){},2:function(e,t){},3:function(e,t){},"37a4":function(e,t,n){},4:function(e,t){},4678:function(e,t,n){var a={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd3","./sv.js":"5fbd3","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function s(e){var t=i(e);return n(t)}function i(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}s.keys=function(){return Object.keys(a)},s.resolve=i,e.exports=s,s.id="4678"},5:function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},["logged_in"!==e.getLoggedInStatus?n("Login"):n("Overview")],1)},i=[],o=n("5530"),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"grid"},[n("vs-row",{attrs:{justify:"center"}},[n("vs-col",{attrs:{w:"2"}},[n("vs-card",{attrs:{type:"1"},scopedSlots:e._u([{key:"title",fn:function(){return[n("h3",[e._v("Login")])]},proxy:!0},{key:"text",fn:function(){return[n("div",{staticClass:"center content-inputs"},[n("vs-input",{attrs:{"label-placeholder":"E-Mail"},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),n("vs-input",{attrs:{type:"password","label-placeholder":"Password"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),n("vs-input",{attrs:{type:"url","label-placeholder":"API Url"},model:{value:e.api,callback:function(t){e.api=t},expression:"api"}})],1)]},proxy:!0},{key:"buttons",fn:function(){return[n("vs-checkbox",{model:{value:e.rememberEmail,callback:function(t){e.rememberEmail=t},expression:"rememberEmail"}},[e._v("remember E-Mail")]),n("vs-button",{attrs:{primary:""},on:{click:e.login}},[e._v("Login")])]},proxy:!0}])})],1)],1)],1)},r=[],l=n("2f62"),u=n("2ac8"),d={name:"Login",created:function(){this.api=this.apiUrl,this.email=localStorage.getItem("user_email"),this.email&&(this.rememberEmail=!0)},methods:Object(o["a"])(Object(o["a"])(Object(o["a"])({},Object(l["d"])({setApiUrl:"setApiUrl"})),Object(l["b"])({checkLoginStatus:"checkLoginStatus"})),{},{login:function(){var e,t=this,n=Object(u["getSdk"])({apiUrl:this.api,isBrowser:!0,debug:!0});this.$balena=n,this.rememberEmail?localStorage.setItem("user_email",this.email):localStorage.removeItem("user_email"),null===(e=this.$balena)||void 0===e||e.auth.login({email:this.email,password:this.password}).then((function(){var e;t.setApiUrl(t.api),t.checkLoginStatus(),null===(e=t.$balena)||void 0===e||e.models.application.getAllWithDeviceServiceDetails().then((function(e){console.log("apps",e)}))})).catch((function(e){return console.error(e)}))}}),computed:Object(o["a"])({},Object(l["c"])({apiUrl:"getApiUrl"})),data:function(){return{email:void 0,rememberEmail:!1,password:void 0,api:void 0}}},f=d,p=(n("d6db"),n("2877")),b=Object(p["a"])(f,c,r,!1,null,null,null),j=b.exports,h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"overview"},[n("vs-navbar",{attrs:{shadow:"",square:"","center-collapsed":""},scopedSlots:e._u([{key:"left",fn:function(){return[n("vs-button",{attrs:{flat:"",icon:""},on:{click:function(t){e.activeSidebar=!e.activeSidebar}}},[n("i",{staticClass:"bx bx-menu"})])]},proxy:!0}])}),n("vs-sidebar",{attrs:{absolute:"",open:e.activeSidebar},on:{"update:open":function(t){e.activeSidebar=t}},scopedSlots:e._u([{key:"footer",fn:function(){return[n("vs-row",{attrs:{justify:"space-between"}},[n("vs-button",{attrs:{flat:"",icon:""},on:{click:e.logout}},[n("i",{staticClass:"bx bx-log-out"})])],1)]},proxy:!0}]),model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},[n("div",{staticClass:"sidebar-descriptor"},[e._v(" Main Links ")]),n("vs-sidebar-item",{attrs:{id:"home",to:"/"},scopedSlots:e._u([{key:"icon",fn:function(){return[n("i",{staticClass:"bx bx-home"})]},proxy:!0}])},[e._v(" Home ")]),n("vs-sidebar-item",{attrs:{id:"about",to:"/devices"},scopedSlots:e._u([{key:"icon",fn:function(){return[n("i",{staticClass:"bx bx-home"})]},proxy:!0}])},[e._v(" Devices ")]),n("div",{staticClass:"sidebar-descriptor"},[e._v(" Application displays ")])],1),n("router-view")],1)},m=[],v={name:"Overview",mounted:function(){this.fetchDeviceTypes(),this.fetchingTimer=setInterval(this.fetchApplications,5e3),this.fetchApplications()},destroyed:function(){clearInterval(this.fetchingTimer)},methods:Object(o["a"])(Object(o["a"])(Object(o["a"])({},Object(l["b"])({fetchApplications:"fetchApplications",fetchDeviceTypes:"fetchDeviceTypes",checkLoginStatus:"checkLoginStatus"})),Object(l["d"])({setLoggedInStatus:"setLoggedInStatus"})),{},{logout:function(){this.$balena.auth.logout(),this.setLoggedInStatus(!1),this.checkLoginStatus()}}),data:function(){return{active:"home",activeSidebar:!1,fetchingTimer:void 0}}},g=v,y=(n("83af"),Object(p["a"])(g,h,m,!1,null,"0bafd1bd",null)),_=y.exports,k={components:{Login:j,Overview:_},created:function(){this.checkLoginStatus()},methods:Object(o["a"])({},Object(l["b"])({checkLoginStatus:"checkLoginStatus"})),computed:Object(o["a"])({},Object(l["c"])({authToken:"authToken",getLoggedInStatus:"getLoggedInStatus"})),data:function(){return{}}},S=k,O=(n("034f"),Object(p["a"])(S,s,i,!1,null,null,null)),w=O.exports,x=n("574d"),A=n.n(x);n("04f2"),n("7db0");a["default"].use(l["a"]);var L=new l["a"].Store({state:{loggedInStatus:"loading",api_url:null,applications:null,deviceTypes:null,selectedApp:null},mutations:{setLoggedInStatus:function(e,t){a["default"].set(e,"loggedInStatus",t?"logged_in":"logged_out")},setApiUrl:function(e,t){localStorage.setItem("api_url",t),e.api_url=t},setApplications:function(e,t){a["default"].set(e,"applications",t)},initializeStore:function(e){e.auth_token=localStorage.getItem("auth_token"),e.api_url=localStorage.getItem("api_url")},setDeviceTypes:function(e,t){e.deviceTypes=t},setSelectedApp:function(e,t){a["default"].set(e,"selectedApp",t.uuid)}},getters:{getLoggedInStatus:function(e){return e.loggedInStatus},getApplications:function(e){return e.applications},getDeviceTypes:function(e){return e.deviceTypes},getSelectedApp:function(e){var t;return null===(t=e.applications)||void 0===t?void 0:t.find((function(t){return t.uuid===e.selectedApp}))},getApiUrl:function(e){return e.api_url}},actions:{checkLoginStatus:function(e){var t,n=e.commit;console.log("test 1",this.$app.$balena),null===(t=this.$app.$balena)||void 0===t||t.auth.isLoggedIn().then((function(e){console.log("test 2"),n("setLoggedInStatus",e)}))},fetchApplications:function(e){var t,n=e.commit;console.log(this.$app.$balena),null===(t=this.$app.$balena)||void 0===t||t.models.application.getAllWithDeviceServiceDetails({$expand:{is_for__device_type:{$expand:["is_of__cpu_architecture"]}}}).then((function(e){n("setApplications",e),console.log("apps2",e)}))},fetchDeviceTypes:function(e){var t=e.commit,n=e.state;a["default"].axios.get("".concat(n.api_url,"/device-types/v1"),{headers:{authorization:"Bearer ".concat(n.auth_token)}}).then((function(e){console.log("types",e.data),t("setDeviceTypes",e.data)}))}},modules:{}}),z=(n("d3b7"),n("3ca3"),n("ddb0"),n("8c4f")),T=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.getApplications?n("div",e._l(e.getApplications,(function(t){return n("ApplicationTile",{key:t["uuid"],attrs:{details:t},nativeOn:{click:function(n){return e.selectApp(t)}}})})),1):e._e()])},E=[],$=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("vs-card",{attrs:{type:"3"},scopedSlots:e._u([{key:"title",fn:function(){return[n("h3",[e._v(e._s(e.details["app_name"]))]),n("h4",[e._v(e._s(e.details["owns__device"].length))])]},proxy:!0},{key:"img",fn:function(){return[n("img",{attrs:{src:e.details["is_for__device_type"][0].logo,alt:""}})]},proxy:!0},{key:"text",fn:function(){return[n("p",[e._v(e._s(e.details["is_for__device_type"][0]["is_of__cpu_architecture"][0]["slug"]))])]},proxy:!0}])})},I=[],C={name:"ApplicationTile",created:function(){},computed:Object(o["a"])({},Object(l["c"])({})),props:{details:{type:Object,required:!0}},data:function(){return{}}},D=C,U=Object(p["a"])(D,$,I,!1,null,"121287d3",null),P=U.exports,M={name:"Home",components:{ApplicationTile:P},methods:Object(o["a"])(Object(o["a"])({},Object(l["d"])({setSelectedApp:"setSelectedApp"})),{},{selectApp:function(e){console.log("app selected",e),this.setSelectedApp(e),this.$router.push("/devices")}}),computed:Object(o["a"])({},Object(l["c"])({getApplications:"getApplications"}))},N=M,q=Object(p["a"])(N,T,E,!1,null,null,null),B=q.exports;a["default"].use(z["a"]);var H=[{path:"/",name:"Home",component:B},{path:"/devices",name:"Devices",component:function(){return n.e("about").then(n.bind(null,"aa72"))},beforeEnter:function(e,t,n){L.getters.getSelectedApp?n():n("/")}}],F=new z["a"]({routes:H}),J=F,W=(n("678e"),n("bc3a")),K=n.n(W),G=n("2106"),Q=n.n(G),R=n("2ead"),V=n.n(R);a["default"].config.productionTip=!1,a["default"].use(A.a,{}),a["default"].use(Q.a,K.a),a["default"].use(V.a);var X=new a["default"]({router:J,render:function(e){return e(w)},beforeCreate:function(){console.log(this),this.$store.commit("initializeStore");var e=Object(u["getSdk"])({apiUrl:this.$store.getters.getApiUrl,isBrowser:!0,debug:!0});a["default"].prototype.$balena=e,console.log(this)},store:L});L.$app=X,X.$mount("#app")},6:function(e,t){},7:function(e,t){},"83af":function(e,t,n){"use strict";n("37a4")},"85ec":function(e,t,n){},d6db:function(e,t,n){"use strict";n("e67a")},e67a:function(e,t,n){}});
//# sourceMappingURL=app.3a661123.js.map