function w(){}function ee(e,t){for(const n in t)e[n]=t[n];return e}function J(e){return e()}function G(){return Object.create(null)}function v(e){e.forEach(J)}function L(e){return typeof e=="function"}function we(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}let N;function be(e,t){return N||(N=document.createElement("a")),N.href=t,e===N.href}function te(e){return Object.keys(e).length===0}function ne(e,...t){if(e==null)return w;const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function ve(e,t,n){e.$$.on_destroy.push(ne(t,n))}function Ee(e,t,n,i){if(e){const r=K(e,t,n,i);return e[0](r)}}function K(e,t,n,i){return e[1]&&i?ee(n.ctx.slice(),e[1](i(t))):n.ctx}function ke(e,t,n,i){if(e[2]&&i){const r=e[2](i(n));if(t.dirty===void 0)return r;if(typeof r=="object"){const o=[],s=Math.max(t.dirty.length,r.length);for(let l=0;l<s;l+=1)o[l]=t.dirty[l]|r[l];return o}return t.dirty|r}return t.dirty}function Ne(e,t,n,i,r,o){if(r){const s=K(t,n,i,o);e.p(s,r)}}function Se(e){if(e.ctx.length>32){const t=[],n=e.ctx.length/32;for(let i=0;i<n;i++)t[i]=-1;return t}return-1}function Ae(e){const t={};for(const n in e)n[0]!=="$"&&(t[n]=e[n]);return t}function je(e,t){const n={};t=new Set(t);for(const i in e)!t.has(i)&&i[0]!=="$"&&(n[i]=e[i]);return n}function Ce(e,t,n){return e.set(n),t}function Me(e){return e&&L(e.destroy)?e.destroy:w}let C=!1;function ie(){C=!0}function re(){C=!1}function se(e,t,n,i){for(;e<t;){const r=e+(t-e>>1);n(r)<=i?e=r+1:t=r}return e}function ce(e){if(e.hydrate_init)return;e.hydrate_init=!0;let t=e.childNodes;if(e.nodeName==="HEAD"){const c=[];for(let u=0;u<t.length;u++){const a=t[u];a.claim_order!==void 0&&c.push(a)}t=c}const n=new Int32Array(t.length+1),i=new Int32Array(t.length);n[0]=-1;let r=0;for(let c=0;c<t.length;c++){const u=t[c].claim_order,a=(r>0&&t[n[r]].claim_order<=u?r+1:se(1,r,_=>t[n[_]].claim_order,u))-1;i[c]=n[a]+1;const d=a+1;n[d]=c,r=Math.max(d,r)}const o=[],s=[];let l=t.length-1;for(let c=n[r]+1;c!=0;c=i[c-1]){for(o.push(t[c-1]);l>=c;l--)s.push(t[l]);l--}for(;l>=0;l--)s.push(t[l]);o.reverse(),s.sort((c,u)=>c.claim_order-u.claim_order);for(let c=0,u=0;c<s.length;c++){for(;u<o.length&&s[c].claim_order>=o[u].claim_order;)u++;const a=u<o.length?o[u]:null;e.insertBefore(s[c],a)}}function oe(e,t){if(C){for(ce(e),(e.actual_end_child===void 0||e.actual_end_child!==null&&e.actual_end_child.parentNode!==e)&&(e.actual_end_child=e.firstChild);e.actual_end_child!==null&&e.actual_end_child.claim_order===void 0;)e.actual_end_child=e.actual_end_child.nextSibling;t!==e.actual_end_child?(t.claim_order!==void 0||t.parentNode!==e)&&e.insertBefore(t,e.actual_end_child):e.actual_end_child=t.nextSibling}else(t.parentNode!==e||t.nextSibling!==null)&&e.appendChild(t)}function Te(e,t,n){C&&!n?oe(e,t):(t.parentNode!==e||t.nextSibling!=n)&&e.insertBefore(t,n||null)}function le(e){e.parentNode&&e.parentNode.removeChild(e)}function De(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function ue(e){return document.createElement(e)}function fe(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function z(e){return document.createTextNode(e)}function Oe(){return z(" ")}function Pe(){return z("")}function qe(e,t,n,i){return e.addEventListener(t,n,i),()=>e.removeEventListener(t,n,i)}function ae(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function Be(e,t){const n=Object.getOwnPropertyDescriptors(e.__proto__);for(const i in t)t[i]==null?e.removeAttribute(i):i==="style"?e.style.cssText=t[i]:i==="__value"?e.value=e[i]=t[i]:n[i]&&n[i].set?e[i]=t[i]:ae(e,i,t[i])}function _e(e){return Array.from(e.childNodes)}function de(e){e.claim_info===void 0&&(e.claim_info={last_index:0,total_claimed:0})}function Q(e,t,n,i,r=!1){de(e);const o=(()=>{for(let s=e.claim_info.last_index;s<e.length;s++){const l=e[s];if(t(l)){const c=n(l);return c===void 0?e.splice(s,1):e[s]=c,r||(e.claim_info.last_index=s),l}}for(let s=e.claim_info.last_index-1;s>=0;s--){const l=e[s];if(t(l)){const c=n(l);return c===void 0?e.splice(s,1):e[s]=c,r?c===void 0&&e.claim_info.last_index--:e.claim_info.last_index=s,l}}return i()})();return o.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1,o}function U(e,t,n,i){return Q(e,r=>r.nodeName===t,r=>{const o=[];for(let s=0;s<r.attributes.length;s++){const l=r.attributes[s];n[l.name]||o.push(l.name)}o.forEach(s=>r.removeAttribute(s))},()=>i(t))}function He(e,t,n){return U(e,t,n,ue)}function Le(e,t,n){return U(e,t,n,fe)}function he(e,t){return Q(e,n=>n.nodeType===3,n=>{const i=""+t;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>z(t),!0)}function ze(e){return he(e," ")}function Fe(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function Re(e,t){e.value=t??""}function We(e,t,n,i){n===null?e.style.removeProperty(t):e.style.setProperty(t,n,i?"important":"")}function me(e,t,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(e,n,i,t),r}function Ge(e,t){const n=[];let i=0;for(const r of t.childNodes)if(r.nodeType===8){const o=r.textContent.trim();o===`HEAD_${e}_END`?(i-=1,n.push(r)):o===`HEAD_${e}_START`&&(i+=1,n.push(r))}else i>0&&n.push(r);return n}function Ie(e,t){return new e(t)}let b;function $(e){b=e}function F(){if(!b)throw new Error("Function called outside component initialization");return b}function Je(e){F().$$.on_mount.push(e)}function Ke(e){F().$$.after_update.push(e)}function Qe(){const e=F();return(t,n,{cancelable:i=!1}={})=>{const r=e.$$.callbacks[t];if(r){const o=me(t,n,{cancelable:i});return r.slice().forEach(s=>{s.call(e,o)}),!o.defaultPrevented}return!0}}const x=[],I=[],A=[],q=[],V=Promise.resolve();let B=!1;function X(){B||(B=!0,V.then(Y))}function Ue(){return X(),V}function H(e){A.push(e)}function Ve(e){q.push(e)}const P=new Set;let S=0;function Y(){const e=b;do{for(;S<x.length;){const t=x[S];S++,$(t),pe(t.$$)}for($(null),x.length=0,S=0;I.length;)I.pop()();for(let t=0;t<A.length;t+=1){const n=A[t];P.has(n)||(P.add(n),n())}A.length=0}while(x.length);for(;q.length;)q.pop()();B=!1,P.clear(),$(e)}function pe(e){if(e.fragment!==null){e.update(),v(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(H)}}const j=new Set;let g;function Xe(){g={r:0,c:[],p:g}}function Ye(){g.r||v(g.c),g=g.p}function Z(e,t){e&&e.i&&(j.delete(e),e.i(t))}function ye(e,t,n,i){if(e&&e.o){if(j.has(e))return;j.add(e),g.c.push(()=>{j.delete(e),i&&(n&&e.d(1),i())}),e.o(t)}else i&&i()}function Ze(e,t){e.d(1),t.delete(e.key)}function et(e,t){ye(e,1,1,()=>{t.delete(e.key)})}function tt(e,t,n,i,r,o,s,l,c,u,a,d){let _=e.length,m=o.length,h=_;const M={};for(;h--;)M[e[h].key]=h;const E=[],T=new Map,D=new Map;for(h=m;h--;){const f=d(r,o,h),p=n(f);let y=s.get(p);y?i&&y.p(f,t):(y=u(p,f),y.c()),T.set(p,E[h]=y),p in M&&D.set(p,Math.abs(h-M[p]))}const R=new Set,W=new Set;function O(f){Z(f,1),f.m(l,a),s.set(f.key,f),a=f.first,m--}for(;_&&m;){const f=E[m-1],p=e[_-1],y=f.key,k=p.key;f===p?(a=f.first,_--,m--):T.has(k)?!s.has(y)||R.has(y)?O(f):W.has(k)?_--:D.get(y)>D.get(k)?(W.add(y),O(f)):(R.add(k),_--):(c(p,s),_--)}for(;_--;){const f=e[_];T.has(f.key)||c(f,s)}for(;m;)O(E[m-1]);return E}function nt(e,t){const n={},i={},r={$$scope:1};let o=e.length;for(;o--;){const s=e[o],l=t[o];if(l){for(const c in s)c in l||(i[c]=1);for(const c in l)r[c]||(n[c]=l[c],r[c]=1);e[o]=l}else for(const c in s)r[c]=1}for(const s in i)s in n||(n[s]=void 0);return n}function it(e,t,n,i){const r=e.$$.props[t];r!==void 0&&(e.$$.bound[r]=n,i===void 0&&n(e.$$.ctx[r]))}function rt(e){e&&e.c()}function st(e,t){e&&e.l(t)}function ge(e,t,n,i){const{fragment:r,after_update:o}=e.$$;r&&r.m(t,n),i||H(()=>{const s=e.$$.on_mount.map(J).filter(L);e.$$.on_destroy?e.$$.on_destroy.push(...s):v(s),e.$$.on_mount=[]}),o.forEach(H)}function xe(e,t){const n=e.$$;n.fragment!==null&&(v(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function $e(e,t){e.$$.dirty[0]===-1&&(x.push(e),X(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function ct(e,t,n,i,r,o,s,l=[-1]){const c=b;$(e);const u=e.$$={fragment:null,ctx:[],props:o,update:w,not_equal:r,bound:G(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(c?c.$$.context:[])),callbacks:G(),dirty:l,skip_bound:!1,root:t.target||c.$$.root};s&&s(u.root);let a=!1;if(u.ctx=n?n(e,t.props||{},(d,_,...m)=>{const h=m.length?m[0]:_;return u.ctx&&r(u.ctx[d],u.ctx[d]=h)&&(!u.skip_bound&&u.bound[d]&&u.bound[d](h),a&&$e(e,d)),_}):[],u.update(),a=!0,v(u.before_update),u.fragment=i?i(u.ctx):!1,t.target){if(t.hydrate){ie();const d=_e(t.target);u.fragment&&u.fragment.l(d),d.forEach(le)}else u.fragment&&u.fragment.c();t.intro&&Z(e.$$.fragment),ge(e,t.target,t.anchor,t.customElement),re(),Y()}$(c)}class ot{$destroy(){xe(this,1),this.$destroy=w}$on(t,n){if(!L(n))return w;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(t){this.$$set&&!te(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}export{nt as $,Ue as A,w as B,ne as C,v as D,L as E,Ee as F,Ne as G,Se as H,ke as I,oe as J,ve as K,qe as L,tt as M,Ce as N,et as O,fe as P,Le as Q,Re as R,ot as S,Ge as T,be as U,je as V,Qe as W,ee as X,Ae as Y,Be as Z,Me as _,Oe as a,Ze as a0,I as a1,it as a2,Ve as a3,De as a4,Te as b,ze as c,Ye as d,Pe as e,Z as f,Xe as g,le as h,ct as i,Ke as j,ue as k,He as l,_e as m,ae as n,Je as o,We as p,z as q,he as r,we as s,ye as t,Fe as u,Ie as v,rt as w,st as x,ge as y,xe as z};
