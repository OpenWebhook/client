import{R as t,A as v,I as y,H as k,G as E,c as L,s as b,g as S,r as f,a as _,T as d,b as w,d as g,p as c,e as U,f as x}from"./vendor.ded578f4.js";const C=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function l(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=l(e);fetch(e.href,o)}};C();const R="modulepreload",m={},I="/",p=function(s,l){return!l||l.length===0?s():Promise.all(l.map(r=>{if(r=`${I}${r}`,r in m)return;m[r]=!0;const e=r.endsWith(".css"),o=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${o}`))return;const n=document.createElement("link");if(n.rel=e?"stylesheet":R,e||(n.as="script",n.crossOrigin=""),n.href=r,document.head.appendChild(n),e)return new Promise((u,i)=>{n.addEventListener("load",u),n.addEventListener("error",()=>i(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>s())};const P=t.createContext({value:"http://localhost:8010/proxy",setValue:a=>{}}),W=t.createContext({value:"https://webhook-store.herokuapp.com",setValue:a=>{}}),A=a=>{const l=`${new URL(a).origin}/graphql`,r=l.replace("http","ws"),e=new k({uri:l}),o=new E(L({url:r})),n=b(({query:u})=>{const i=S(u);return i.kind==="OperationDefinition"&&i.operation==="subscription"},o,e);return new v({link:n,cache:new y})},h=(a,s)=>{const l=localStorage.getItem(a)||s,[r,e]=f.exports.useState(l);return[r,n=>{localStorage.setItem(a,n),e(n)}]},V=t.lazy(()=>p(()=>import("./index.87235f40.js"),["assets/index.87235f40.js","assets/index.d0231cc2.css","assets/index.04f68ef5.js","assets/index.6cf34f9e.css","assets/vendor.ded578f4.js","assets/index.7bf84e66.js","assets/index.07ff497d.css"])),O=t.lazy(()=>p(()=>import("./TopNav.7a7807a1.js"),["assets/TopNav.7a7807a1.js","assets/TopNav.3e528b53.css","assets/vendor.ded578f4.js","assets/index.14ed9b8a.js","assets/index.d256e2c3.css","assets/index.04f68ef5.js","assets/index.6cf34f9e.css"])),T=t.lazy(()=>p(()=>import("./WebhookList.component.595a907e.js"),["assets/WebhookList.component.595a907e.js","assets/WebhookList.component.29cfbdca.css","assets/vendor.ded578f4.js","assets/index.7bf84e66.js","assets/index.07ff497d.css","assets/index.04f68ef5.js","assets/index.6cf34f9e.css","assets/index.14ed9b8a.js","assets/index.d256e2c3.css"]));function q(){const[a,s]=h("redirectUrl","http://localhost:8010/proxy"),[l,r]=h("webhookStoreUrl","https://webhook-store.herokuapp.com");return t.createElement(W.Provider,{value:{value:l,setValue:r}},t.createElement(_,{client:A(l)},t.createElement(d,{name:d.names.dark},t.createElement(P.Provider,{value:{value:a,setValue:s}},t.createElement(f.exports.Suspense,{fallback:t.createElement("div",null,"Loading...")},t.createElement(V,{topnav:()=>t.createElement(O,null)},t.createElement("div",{style:{background:w}},t.createElement(T,null))))))))}g.configure({apiKey:"hbp_5dLUqCorpak7oThEbZ6GpdY4q7eGqC0v21xN",environment:"production"});c.init("phc_gaWo4JFok5X2n792nFxFstwZDJS9b2Wtt9jFTmEMV0Z",{api_host:"https://app.posthog.com"});c.capture("my event",{property:"value"});c.capture("my event 2",{property:"value2"});c.capture("my event 3",{property:"value3"});const $=U.createRoot(document.getElementById("root"));$.render(t.createElement(x,{honeybadger:g},t.createElement(t.StrictMode,null,t.createElement(q,null))));export{P as R,W};
//# sourceMappingURL=index.7a3e51fc.js.map
