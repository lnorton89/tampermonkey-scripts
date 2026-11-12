// ==UserScript==
// @name         LookMovie2 Enhancer
// @version      1.2.0.202611121023
// @namespace    https://github.com/lnorton89/tampermonkey-scripts
// @description  Combines playback helpers with a persistent show watchlist for latest episode tracking.
// @author       Lawrence
// @match        *://*.lookmovie2.to/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @connect      ntfy.sh
// @connect      *
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/lnorton89/tampermonkey-scripts/main/scripts/lookmovie2.to/dist/lookmovie2.to.user.js
// @downloadURL  https://raw.githubusercontent.com/lnorton89/tampermonkey-scripts/main/scripts/lookmovie2.to/dist/lookmovie2.to.user.js
// ==/UserScript==

"use strict";(()=>{var qb=Object.create;var Tm=Object.defineProperty;var kb=Object.getOwnPropertyDescriptor;var Vb=Object.getOwnPropertyNames;var Yb=Object.getPrototypeOf,jb=Object.prototype.hasOwnProperty;var Ue=(t,e)=>()=>{try{return e||t((e={exports:{}}).exports,e),e.exports}catch(n){throw e=0,n}};var Xb=(t,e,n,l)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of Vb(e))!jb.call(t,a)&&a!==n&&Tm(t,a,{get:()=>e[a],enumerable:!(l=kb(e,a))||l.enumerable});return t};var J=(t,e,n)=>(n=t!=null?qb(Yb(t)):{},Xb(e||!t||!t.__esModule?Tm(n,"default",{value:t,enumerable:!0}):n,t));var zp=Ue(et=>{"use strict";function $s(t,e){var n=t.length;t.push(e);t:for(;0<n;){var l=n-1>>>1,a=t[l];if(0<Ko(a,e))t[l]=e,t[n]=a,n=l;else break t}}function De(t){return t.length===0?null:t[0]}function Jo(t){if(t.length===0)return null;var e=t[0],n=t.pop();if(n!==e){t[0]=n;t:for(var l=0,a=t.length,i=a>>>1;l<i;){var o=2*(l+1)-1,u=t[o],s=o+1,m=t[s];if(0>Ko(u,n))s<a&&0>Ko(m,u)?(t[l]=m,t[s]=n,l=s):(t[l]=u,t[o]=n,l=o);else if(s<a&&0>Ko(m,n))t[l]=m,t[s]=n,l=s;else break t}}return e}function Ko(t,e){var n=t.sortIndex-e.sortIndex;return n!==0?n:t.id-e.id}et.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(xp=performance,et.unstable_now=function(){return xp.now()}):(Us=Date,Tp=Us.now(),et.unstable_now=function(){return Us.now()-Tp});var xp,Us,Tp,en=[],_n=[],mS=1,pe=null,Dt=3,Hs=!1,ui=!1,ri=!1,Bs=!1,Ap=typeof setTimeout=="function"?setTimeout:null,Mp=typeof clearTimeout=="function"?clearTimeout:null,_p=typeof setImmediate<"u"?setImmediate:null;function Zo(t){for(var e=De(_n);e!==null;){if(e.callback===null)Jo(_n);else if(e.startTime<=t)Jo(_n),e.sortIndex=e.expirationTime,$s(en,e);else break;e=De(_n)}}function qs(t){if(ri=!1,Zo(t),!ui)if(De(en)!==null)ui=!0,Ql||(Ql=!0,Gl());else{var e=De(_n);e!==null&&ks(qs,e.startTime-t)}}var Ql=!1,si=-1,Cp=5,Op=-1;function Rp(){return Bs?!0:!(et.unstable_now()-Op<Cp)}function Ls(){if(Bs=!1,Ql){var t=et.unstable_now();Op=t;var e=!0;try{t:{ui=!1,ri&&(ri=!1,Mp(si),si=-1),Hs=!0;var n=Dt;try{e:{for(Zo(t),pe=De(en);pe!==null&&!(pe.expirationTime>t&&Rp());){var l=pe.callback;if(typeof l=="function"){pe.callback=null,Dt=pe.priorityLevel;var a=l(pe.expirationTime<=t);if(t=et.unstable_now(),typeof a=="function"){pe.callback=a,Zo(t),e=!0;break e}pe===De(en)&&Jo(en),Zo(t)}else Jo(en);pe=De(en)}if(pe!==null)e=!0;else{var i=De(_n);i!==null&&ks(qs,i.startTime-t),e=!1}}break t}finally{pe=null,Dt=n,Hs=!1}e=void 0}}finally{e?Gl():Ql=!1}}}var Gl;typeof _p=="function"?Gl=function(){_p(Ls)}:typeof MessageChannel<"u"?(Ds=new MessageChannel,Np=Ds.port2,Ds.port1.onmessage=Ls,Gl=function(){Np.postMessage(null)}):Gl=function(){Ap(Ls,0)};var Ds,Np;function ks(t,e){si=Ap(function(){t(et.unstable_now())},e)}et.unstable_IdlePriority=5;et.unstable_ImmediatePriority=1;et.unstable_LowPriority=4;et.unstable_NormalPriority=3;et.unstable_Profiling=null;et.unstable_UserBlockingPriority=2;et.unstable_cancelCallback=function(t){t.callback=null};et.unstable_forceFrameRate=function(t){0>t||125<t?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Cp=0<t?Math.floor(1e3/t):5};et.unstable_getCurrentPriorityLevel=function(){return Dt};et.unstable_next=function(t){switch(Dt){case 1:case 2:case 3:var e=3;break;default:e=Dt}var n=Dt;Dt=e;try{return t()}finally{Dt=n}};et.unstable_requestPaint=function(){Bs=!0};et.unstable_runWithPriority=function(t,e){switch(t){case 1:case 2:case 3:case 4:case 5:break;default:t=3}var n=Dt;Dt=t;try{return e()}finally{Dt=n}};et.unstable_scheduleCallback=function(t,e,n){var l=et.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?l+n:l):n=l,t){case 1:var a=-1;break;case 2:a=250;break;case 5:a=1073741823;break;case 4:a=1e4;break;default:a=5e3}return a=n+a,t={id:mS++,callback:e,priorityLevel:t,startTime:n,expirationTime:a,sortIndex:-1},n>l?(t.sortIndex=n,$s(_n,t),De(en)===null&&t===De(_n)&&(ri?(Mp(si),si=-1):ri=!0,ks(qs,n-l))):(t.sortIndex=a,$s(en,t),ui||Hs||(ui=!0,Ql||(Ql=!0,Gl()))),t};et.unstable_shouldYield=Rp;et.unstable_wrapCallback=function(t){var e=Dt;return function(){var n=Dt;Dt=e;try{return t.apply(this,arguments)}finally{Dt=n}}}});var Lp=Ue((FT,Up)=>{"use strict";Up.exports=zp()});var Kp=Ue(R=>{"use strict";var js=Symbol.for("react.transitional.element"),pS=Symbol.for("react.portal"),hS=Symbol.for("react.fragment"),gS=Symbol.for("react.strict_mode"),yS=Symbol.for("react.profiler"),vS=Symbol.for("react.consumer"),bS=Symbol.for("react.context"),SS=Symbol.for("react.forward_ref"),wS=Symbol.for("react.suspense"),ES=Symbol.for("react.memo"),qp=Symbol.for("react.lazy"),xS=Symbol.for("react.activity"),TS=Symbol.for("react.view_transition"),Dp=Symbol.iterator;function _S(t){return t===null||typeof t!="object"?null:(t=Dp&&t[Dp]||t["@@iterator"],typeof t=="function"?t:null)}var kp={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Vp=Object.assign,Yp={};function Zl(t,e,n){this.props=t,this.context=e,this.refs=Yp,this.updater=n||kp}Zl.prototype.isReactComponent={};Zl.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Zl.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function jp(){}jp.prototype=Zl.prototype;function Xs(t,e,n){this.props=t,this.context=e,this.refs=Yp,this.updater=n||kp}var Gs=Xs.prototype=new jp;Gs.constructor=Xs;Vp(Gs,Zl.prototype);Gs.isPureReactComponent=!0;var $p=Array.isArray;function Ys(){}var I={H:null,A:null,T:null,S:null},Xp=Object.prototype.hasOwnProperty;function Qs(t,e,n){var l=n.ref;return{$$typeof:js,type:t,key:e,ref:l!==void 0?l:null,props:n}}function NS(t,e){return Qs(t.type,e,t.props)}function Ks(t){return typeof t=="object"&&t!==null&&t.$$typeof===js}function AS(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Hp=/\/+/g;function Vs(t,e){return typeof t=="object"&&t!==null&&t.key!=null?AS(""+t.key):e.toString(36)}function MS(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(Ys,Ys):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function Kl(t,e,n,l,a){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(i){case"bigint":case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case js:case pS:o=!0;break;case qp:return o=t._init,Kl(o(t._payload),e,n,l,a)}}if(o)return a=a(t),o=l===""?"."+Vs(t,0):l,$p(a)?(n="",o!=null&&(n=o.replace(Hp,"$&/")+"/"),Kl(a,e,n,"",function(m){return m})):a!=null&&(Ks(a)&&(a=NS(a,n+(a.key==null||t&&t.key===a.key?"":(""+a.key).replace(Hp,"$&/")+"/")+o)),e.push(a)),1;o=0;var u=l===""?".":l+":";if($p(t))for(var s=0;s<t.length;s++)l=t[s],i=u+Vs(l,s),o+=Kl(l,e,n,i,a);else if(s=_S(t),typeof s=="function")for(t=s.call(t),s=0;!(l=t.next()).done;)l=l.value,i=u+Vs(l,s++),o+=Kl(l,e,n,i,a);else if(i==="object"){if(typeof t.then=="function")return Kl(MS(t),e,n,l,a);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return o}function Io(t,e,n){if(t==null)return t;var l=[],a=0;return Kl(t,l,"","",function(i){return e.call(n,i,a++)}),l}function CS(t){if(t._status===-1){var e=t._result,n=e();n.then(function(l){(t._status===0||t._status===-1)&&(t._status=1,t._result=l,n.status===void 0&&(n.status="fulfilled",n.value=l))},function(l){(t._status===0||t._status===-1)&&(t._status=2,t._result=l,n.status===void 0&&(n.status="rejected",n.reason=l))}),t._status===-1&&(t._status=0,t._result=n)}if(t._status===1)return t._result.default;throw t._result}var Bp=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)};function Gp(t){var e=I.T,n={};n.types=e!==null?e.types:null,I.T=n;try{var l=t(),a=I.S;a!==null&&a(n,l),typeof l=="object"&&l!==null&&typeof l.then=="function"&&l.then(Ys,Bp)}catch(i){Bp(i)}finally{e!==null&&n.types!==null&&(e.types=n.types),I.T=e}}function Qp(t){var e=I.T;if(e!==null){var n=e.types;n===null?e.types=[t]:n.indexOf(t)===-1&&n.push(t)}else Gp(Qp.bind(null,t))}var OS={map:Io,forEach:function(t,e,n){Io(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Io(t,function(){e++}),e},toArray:function(t){return Io(t,function(e){return e})||[]},only:function(t){if(!Ks(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};R.Activity=xS;R.Children=OS;R.Component=Zl;R.Fragment=hS;R.Profiler=yS;R.PureComponent=Xs;R.StrictMode=gS;R.Suspense=wS;R.ViewTransition=TS;R.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=I;R.__COMPILER_RUNTIME={__proto__:null,c:function(t){return I.H.useMemoCache(t)}};R.addTransitionType=Qp;R.cache=function(t){return function(){return t.apply(null,arguments)}};R.cacheSignal=function(){return null};R.cloneElement=function(t,e,n){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var l=Vp({},t.props),a=t.key;if(e!=null)for(i in e.key!==void 0&&(a=""+e.key),e)!Xp.call(e,i)||i==="key"||i==="__self"||i==="__source"||i==="ref"&&e.ref===void 0||(l[i]=e[i]);var i=arguments.length-2;if(i===1)l.children=n;else if(1<i){for(var o=Array(i),u=0;u<i;u++)o[u]=arguments[u+2];l.children=o}return Qs(t.type,a,l)};R.createContext=function(t){return t={$$typeof:bS,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:vS,_context:t},t};R.createElement=function(t,e,n){var l,a={},i=null;if(e!=null)for(l in e.key!==void 0&&(i=""+e.key),e)Xp.call(e,l)&&l!=="key"&&l!=="__self"&&l!=="__source"&&(a[l]=e[l]);var o=arguments.length-2;if(o===1)a.children=n;else if(1<o){for(var u=Array(o),s=0;s<o;s++)u[s]=arguments[s+2];a.children=u}if(t&&t.defaultProps)for(l in o=t.defaultProps,o)a[l]===void 0&&(a[l]=o[l]);return Qs(t,i,a)};R.createRef=function(){return{current:null}};R.forwardRef=function(t){return{$$typeof:SS,render:t}};R.isValidElement=Ks;R.lazy=function(t){return{$$typeof:qp,_payload:{_status:-1,_result:t},_init:CS}};R.memo=function(t,e){return{$$typeof:ES,type:t,compare:e===void 0?null:e}};R.startTransition=Gp;R.unstable_useCacheRefresh=function(){return I.H.useCacheRefresh()};R.use=function(t){return I.H.use(t)};R.useActionState=function(t,e,n){return I.H.useActionState(t,e,n)};R.useCallback=function(t,e){return I.H.useCallback(t,e)};R.useContext=function(t){return I.H.useContext(t)};R.useDebugValue=function(){};R.useDeferredValue=function(t,e){return I.H.useDeferredValue(t,e)};R.useEffect=function(t,e){return I.H.useEffect(t,e)};R.useEffectEvent=function(t){return I.H.useEffectEvent(t)};R.useId=function(){return I.H.useId()};R.useImperativeHandle=function(t,e,n){return I.H.useImperativeHandle(t,e,n)};R.useInsertionEffect=function(t,e){return I.H.useInsertionEffect(t,e)};R.useLayoutEffect=function(t,e){return I.H.useLayoutEffect(t,e)};R.useMemo=function(t,e){return I.H.useMemo(t,e)};R.useOptimistic=function(t,e){return I.H.useOptimistic(t,e)};R.useReducer=function(t,e,n){return I.H.useReducer(t,e,n)};R.useRef=function(t){return I.H.useRef(t)};R.useState=function(t){return I.H.useState(t)};R.useSyncExternalStore=function(t,e,n){return I.H.useSyncExternalStore(t,e,n)};R.useTransition=function(){return I.H.useTransition()};R.version="19.3.1"});var rl=Ue((e4,Zp)=>{"use strict";Zp.exports=Kp()});var Wp=Ue($t=>{"use strict";var RS=rl();function Ip(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Nn(){}var qt={d:{f:Nn,r:function(){throw Error(Ip(522))},D:Nn,C:Nn,L:Nn,m:Nn,X:Nn,S:Nn,M:Nn},p:0,findDOMNode:null},zS=Symbol.for("react.portal"),US=Symbol.for("react.recoverable"),Jp=Symbol.for("react.optimistic_key");function LS(t,e,n){var l=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:zS,key:l==null?null:l===Jp?Jp:""+l,children:t,containerInfo:e,implementation:n}}var ci=RS.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Wo(t,e){if(t==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}$t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=qt;$t.browser=function(t){return{$$typeof:US,_reason:t}};$t.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(Ip(299));return LS(t,e,null,n)};$t.flushSync=function(t){var e=ci.T,n=qt.p;try{if(ci.T=null,qt.p=2,t)return t()}finally{ci.T=e,qt.p=n,qt.d.f()}};$t.preconnect=function(t,e){typeof t=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,qt.d.C(t,e))};$t.prefetchDNS=function(t){typeof t=="string"&&qt.d.D(t)};$t.preinit=function(t,e){if(typeof t=="string"&&e&&typeof e.as=="string"){var n=e.as,l=Wo(n,e.crossOrigin),a=typeof e.integrity=="string"?e.integrity:void 0,i=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;n==="style"?qt.d.S(t,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:l,integrity:a,fetchPriority:i}):n==="script"&&qt.d.X(t,{crossOrigin:l,integrity:a,fetchPriority:i,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};$t.preinitModule=function(t,e){if(typeof t=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var n=Wo(e.as,e.crossOrigin);qt.d.M(t,{crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0})}}else e==null&&qt.d.M(t)};$t.preload=function(t,e){if(typeof t=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var n=e.as,l=Wo(n,e.crossOrigin);qt.d.L(t,n,{crossOrigin:l,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};$t.preloadModule=function(t,e){if(typeof t=="string")if(e){var n=Wo(e.as,e.crossOrigin);qt.d.m(t,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0})}else qt.d.m(t)};$t.requestFormReset=function(t){qt.d.r(t)};$t.unstable_batchedUpdates=function(t,e){return t(e)};$t.useFormState=function(t,e,n){return ci.H.useFormState(t,e,n)};$t.useFormStatus=function(){return ci.H.useHostTransitionStatus()};$t.version="19.3.1"});var Zs=Ue((l4,Fp)=>{"use strict";function Pp(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Pp)}catch(t){console.error(t)}}Pp(),Fp.exports=Wp()});var qv=Ue(zr=>{"use strict";var vt=Lp(),Bg=rl(),DS=Zs();function S(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function qg(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Wi(t){for(var e=t,n=e;n&&!n.alternate;)e=n,(e.flags&4098)!==0&&(t=e.return),n=e.return;for(;e.return;)e=e.return;return e.tag===3?t:null}function kg(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Vg(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function th(t){if(Wi(t)!==t)throw Error(S(188))}function $S(t){var e=t.alternate;if(!e){if(e=Wi(t),e===null)throw Error(S(188));return e!==t?null:t}for(var n=t,l=e;;){var a=n.return;if(a===null)break;var i=a.alternate;if(i===null){if(l=a.return,l!==null){n=l;continue}break}if(a.child===i.child){for(i=a.child;i;){if(i===n)return th(a),t;if(i===l)return th(a),e;i=i.sibling}throw Error(S(188))}if(n.return!==l.return)n=a,l=i;else{for(var o=!1,u=a.child;u;){if(u===n){o=!0,n=a,l=i;break}if(u===l){o=!0,l=a,n=i;break}u=u.sibling}if(!o){for(u=i.child;u;){if(u===n){o=!0,n=i,l=a;break}if(u===l){o=!0,l=i,n=a;break}u=u.sibling}if(!o)throw Error(S(189))}}if(n.alternate!==l)throw Error(S(190))}if(n.tag!==3)throw Error(S(188));return n.stateNode.current===n?t:e}function Yg(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=Yg(t),e!==null)return e;t=t.sibling}return null}function Jt(t,e,n,l,a,i){for(;t!==null;){if((t.tag===5||t.tag===27||t.tag===6)&&n(t,l,a,i)||(t.tag!==22||t.memoizedState===null)&&(e||t.tag!==5&&t.tag!==27)&&Jt(t.child,e,n,l,a,i))return!0;t=t.sibling}return!1}function Cl(t){for(t=t.return;t!==null;){if(t.tag===3||t.tag===5||t.tag===27)return t;t=t.return}return null}function eh(t){var e=!1;for(t=t.return;t!==null&&(t.tag===4&&(e=!0),!(t.tag===3||t.tag===5||t.tag===27));)t=t.return;return e}function jg(t){var e=[null,null],n=Cl(t);return n===null||Xg(e,t,n.child,{foundSelf:!1}),e}function Xg(t,e,n,l){for(;n!==null;){if(n===e)l.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(l.foundSelf)return t[1]=n,!0;t[0]=n}else if((n.tag!==22||n.memoizedState===null)&&Xg(t,e,n.child,l))return!0;n=n.sibling}return!1}function yt(t){switch(t.tag){case 5:case 27:case 6:return t.stateNode;case 3:return t.stateNode.containerInfo;default:throw Error(S(559))}}var ea=null,Nc=null;function HS(t,e,n){return t===n?!0:t===e?(ea=t,!0):!1}function BS(t,e,n){return t===n?(Nc=t,!1):t===e?(Nc!==null&&(ea=t),!0):!1}function nh(t){if(t===null)return null;do t=t===null?null:t.return;while(t&&t.tag!==5&&t.tag!==27&&t.tag!==3);return t||null}function Ac(t,e,n){for(var l=0,a=t;a;a=n(a))l++;a=0;for(var i=e;i;i=n(i))a++;for(;0<l-a;)t=n(t),l--;for(;0<a-l;)e=n(e),a--;for(;l--;){if(t===e||e!==null&&t===e.alternate)return t;t=n(t),e=n(e)}return null}var Z=Object.assign,qS=Symbol.for("react.element"),Po=Symbol.for("react.transitional.element"),yi=Symbol.for("react.portal"),na=Symbol.for("react.fragment"),Gg=Symbol.for("react.strict_mode"),Mc=Symbol.for("react.profiler"),Qg=Symbol.for("react.consumer"),Ve=Symbol.for("react.context"),Bf=Symbol.for("react.forward_ref"),Cc=Symbol.for("react.suspense"),Oc=Symbol.for("react.suspense_list"),qf=Symbol.for("react.memo"),On=Symbol.for("react.lazy"),Rc=Symbol.for("react.activity"),kS=Symbol.for("react.legacy_hidden"),VS=Symbol.for("react.memo_cache_sentinel"),zc=Symbol.for("react.view_transition"),YS=Symbol.for("react.recoverable"),lh=Symbol.iterator;function fi(t){return t===null||typeof t!="object"?null:(t=lh&&t[lh]||t["@@iterator"],typeof t=="function"?t:null)}var jS=Symbol.for("react.client.reference");function Uc(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===jS?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case na:return"Fragment";case Mc:return"Profiler";case Gg:return"StrictMode";case Cc:return"Suspense";case Oc:return"SuspenseList";case Rc:return"Activity";case zc:return"ViewTransition"}if(typeof t=="object")switch(t.$$typeof){case yi:return"Portal";case Ve:return t.displayName||"Context";case Qg:return(t._context.displayName||"Context")+".Consumer";case Bf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case qf:return e=t.displayName||null,e!==null?e:Uc(t.type)||"Memo";case On:e=t._payload,t=t._init;try{return Uc(t(e))}catch{}}return null}var vi=Array.isArray,O=Bg.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,V=DS.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,gl={pending:!1,data:null,method:null,action:null},Lc=[],la=-1;function Ze(t){return{current:t}}function At(t){0>la||(t.current=Lc[la],Lc[la]=null,la--)}function F(t,e){la++,Lc[la]=t.current,t.current=e}var Ge=Ze(null),Di=Ze(null),qn=Ze(null),Bu=Ze(null);function qu(t,e){switch(F(qn,e),F(Di,t),F(Ge,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?yg(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=yg(e),t=pv(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}At(Ge),F(Ge,t)}function xa(){At(Ge),At(Di),At(qn)}function Dc(t){var e=t.memoizedState;e!==null&&(Ua._currentValue=e.memoizedState,F(Bu,t)),e=Ge.current;var n=pv(e,t.type);e!==n&&(F(Di,t),F(Ge,n))}function ku(t){Di.current===t&&(At(Ge),At(Di)),Bu.current===t&&(At(Bu),Ua._currentValue=gl)}var Js,ah;function Mn(t){if(Js===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Js=e&&e[1]||"",ah=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Js+t+ah}var Is=!1;function Ws(t,e){if(!t||Is)return"";Is=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(e){var v=function(){throw Error()};if(Object.defineProperty(v.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(v,[])}catch(E){var d=E}Reflect.construct(t,[],v)}else{try{v.call()}catch(E){d=E}v=!1;try{var g=Object.getOwnPropertyDescriptor(t.prototype,"props");Object.defineProperty(t.prototype,"props",{configurable:!0,set:function(){throw Error()}}),v=!0,new t}finally{v&&(g!==void 0?Object.defineProperty(t.prototype,"props",g):delete t.prototype.props)}}}else{try{throw Error()}catch(E){d=E}(v=t())&&typeof v.catch=="function"&&v.catch(function(){})}}catch(E){if(E&&d&&typeof E.stack=="string")return[E.stack,d.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=l.DetermineComponentFrameRoot(),o=i[0],u=i[1];if(o&&u){var s=o.split(`
`),m=u.split(`
`);for(a=l=0;l<s.length&&!s[l].includes("DetermineComponentFrameRoot");)l++;for(;a<m.length&&!m[a].includes("DetermineComponentFrameRoot");)a++;if(l===s.length||a===m.length)for(l=s.length-1,a=m.length-1;1<=l&&0<=a&&s[l]!==m[a];)a--;for(;1<=l&&0<=a;l--,a--)if(s[l]!==m[a]){if(l!==1||a!==1)do if(l--,a--,0>a||s[l]!==m[a]){var p=`
`+s[l].replace(" at new "," at ");return t.displayName&&p.includes("<anonymous>")&&(p=p.replace("<anonymous>",t.displayName)),p}while(1<=l&&0<=a);break}}}finally{Is=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Mn(n):""}function XS(t,e){switch(t.tag){case 26:case 27:case 5:return Mn(t.type);case 16:return Mn("Lazy");case 13:return t.child!==e&&e!==null?Mn("Suspense Fallback"):Mn("Suspense");case 19:return Mn("SuspenseList");case 0:case 15:return Ws(t.type,!1);case 11:return Ws(t.type.render,!1);case 1:return Ws(t.type,!0);case 31:return Mn("Activity");case 30:return Mn("ViewTransition");default:return""}}function ih(t){try{var e="",n=null;do e+=XS(t,n),n=t,t=t.return;while(t);return e}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var $c=Object.prototype.hasOwnProperty,kf=vt.unstable_scheduleCallback,Ps=vt.unstable_cancelCallback,GS=vt.unstable_shouldYield,QS=vt.unstable_requestPaint,ae=vt.unstable_now,KS=vt.unstable_getCurrentPriorityLevel,Kg=vt.unstable_ImmediatePriority,Zg=vt.unstable_UserBlockingPriority,Vu=vt.unstable_NormalPriority,ZS=vt.unstable_LowPriority,Jg=vt.unstable_IdlePriority,JS=vt.log,IS=vt.unstable_setDisableYieldValue,Pi=null,ie=null;function Un(t){if(typeof JS=="function"&&IS(t),ie&&typeof ie.setStrictMode=="function")try{ie.setStrictMode(Pi,t)}catch{}}var oe=Math.clz32?Math.clz32:FS,WS=Math.log,PS=Math.LN2;function FS(t){return t>>>=0,t===0?32:31-(WS(t)/PS|0)|0}var Fo=256,tu=262144,eu=4194304;function fl(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&-t;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function mr(t,e,n){var l=t.pendingLanes;if(l===0)return 0;var a=0,i=t.suspendedLanes,o=t.pingedLanes;t=t.warmLanes;var u=l&134217727;return u!==0?(l=u&~i,l!==0?a=fl(l):(o&=u,o!==0?a=fl(o):n||(n=u&~t,n!==0&&(a=fl(n))))):(u=l&~i,u!==0?a=fl(u):o!==0?a=fl(o):n||(n=l&~t,n!==0&&(a=fl(n)))),a===0?0:e!==0&&e!==a&&(e&i)===0&&(i=a&-a,n=e&-e,i>=n||i===32&&(n&4194048)!==0)?e:a}function Fi(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function Ig(t,e){(e&8)!==0&&(e|=e&32);var n=t.entangledLanes;if(n!==0)for(t=t.entanglements,n&=e;0<n;){var l=31-oe(n),a=1<<l;e|=t[l],n&=~a}return e}function tw(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Wg(){var t=eu;return eu<<=1,(eu&62914560)===0&&(eu=4194304),t}function Fs(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function to(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function ew(t,e,n,l,a,i){var o=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var u=t.entanglements,s=t.expirationTimes,m=t.hiddenUpdates;for(n=o&~n;0<n;){var p=31-oe(n),v=1<<p;u[p]=0,s[p]=-1;var d=m[p];if(d!==null)for(m[p]=null,p=0;p<d.length;p++){var g=d[p];g!==null&&(g.lane&=-536870913)}n&=~v}l!==0&&Pg(t,l,0),i!==0&&a===0&&t.tag!==0&&(t.suspendedLanes|=i&~(o&~e))}function Pg(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var l=31-oe(e);t.entangledLanes|=e,t.entanglements[l]=t.entanglements[l]|1073741824|n&261930}function Fg(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var l=31-oe(n),a=1<<l;a&e|t[l]&e&&(t[l]|=e),n&=~a}}function t0(t,e){var n=e&-e;return n=(n&42)!==0?1:Vf(n),(n&(t.suspendedLanes|e))!==0?0:n}function Vf(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Yf(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function e0(){var t=V.p;return t!==0?t:(t=window.event,t===void 0?32:$v(t.type))}function oh(t,e){var n=V.p;try{return V.p=t,e()}finally{V.p=n}}var hn=Math.random().toString(36).slice(2),_t="__reactFiber$"+hn,It="__reactProps$"+hn,$a="__reactContainer$"+hn,uh="__reactEvents$"+hn,nw="__reactListeners$"+hn,lw="__reactHandles$"+hn,rh="__reactResources$"+hn,eo="__reactMarker$"+hn,Yu="__reactLoad$"+hn;function pr(t){delete t[_t],delete t[It],delete t[nw],delete t[lw]}function pl(t){var e;if(e=t[_t])return e;for(var n=t.parentNode;n;){if(e=n[$a]||n[_t]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=_g(t);t!==null;){if(n=t[_t])return n;t=_g(t)}return e}t=n,n=t.parentNode}return null}function Ha(t){if(t=t[_t]||t[$a]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function bi(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(S(33))}function ma(t){var e=t[rh];return e||(e=t[rh]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function wt(t){t[eo]=!0}function n0(t){t[Yu]=void 0}var l0=new Set,a0={};function Ol(t,e){Ta(t,e),Ta(t+"Capture",e)}function Ta(t,e){for(a0[t]=e,t=0;t<e.length;t++)l0.add(e[t])}var aw=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),sh={},ch={};function iw(t){return $c.call(ch,t)?!0:$c.call(sh,t)?!1:aw.test(t)?ch[t]=!0:(sh[t]=!0,!1)}var q=!1;function fh(){var t=q;return q=!1,t}function bu(t,e,n){if(iw(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var l=e.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,n)}}function nu(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,n)}}function nn(t,e,n,l){if(l===null)t.removeAttribute(n);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,l)}}function te(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function i0(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function ow(t,e,n){var l=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var a=l.get,i=l.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return a.call(this)},set:function(o){n=""+o,i.call(this,o)}}),Object.defineProperty(t,e,{enumerable:l.enumerable}),{getValue:function(){return n},setValue:function(o){n=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Hc(t){if(!t._valueTracker){var e=i0(t)?"checked":"value";t._valueTracker=ow(t,e,""+t[e])}}function o0(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),l="";return t&&(l=i0(t)?t.checked?"true":"false":t.value),t=l,t!==n?(e.setValue(t),!0):!1}var uw=/[\n"\\]/g;function be(t){return t.replace(uw,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function Bc(t,e,n,l,a,i,o,u){t.name="",o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?t.type=o:t.removeAttribute("type"),e!=null?o==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+te(e)):t.value!==""+te(e)&&(t.value=""+te(e)):o!=="submit"&&o!=="reset"||t.removeAttribute("value"),e!=null?o==="number"&&t.value==e?tc(t,te(t.value)):tc(t,te(e)):n!=null?tc(t,te(n)):l!=null&&t.removeAttribute("value"),a==null&&i!=null&&(t.defaultChecked=!!i),a!=null&&(t.checked=a&&typeof a!="function"&&typeof a!="symbol"),u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?t.name=""+te(u):t.removeAttribute("name")}function u0(t,e,n,l,a,i,o,u){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(t.type=i),e!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||e!=null)){Hc(t);return}n=n!=null?""+te(n):"",e=e!=null?""+te(e):n,u||e===t.value||(t.value=e),t.defaultValue=e}l=l??a,l=typeof l!="function"&&typeof l!="symbol"&&!!l,t.checked=u?t.checked:!!l,t.defaultChecked=!!l,o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"&&(t.name=o),Hc(t)}function tc(t,e){t.defaultValue!==""+e&&(t.defaultValue=""+e)}function pa(t,e,n,l){if(t=t.options,e){e={};for(var a=0;a<n.length;a++)e["$"+n[a]]=!0;for(n=0;n<t.length;n++)a=e.hasOwnProperty("$"+t[n].value),t[n].selected!==a&&(t[n].selected=a),a&&l&&(t[n].defaultSelected=!0)}else{for(n=""+te(n),e=null,a=0;a<t.length;a++){if(t[a].value===n){t[a].selected=!0,l&&(t[a].defaultSelected=!0);return}e!==null||t[a].disabled||(e=t[a])}e!==null&&(e.selected=!0)}}function r0(t,e,n){if(e!=null&&(e=""+te(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+te(n):""}function s0(t,e,n,l){if(e==null){if(l!=null){if(n!=null)throw Error(S(92));if(vi(l)){if(1<l.length)throw Error(S(93));l=l[0]}n=l}n==null&&(n=""),e=n}n=te(e),t.defaultValue=n,l=t.textContent,l===n&&l!==""&&l!==null&&(t.value=l),Hc(t)}function _a(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var rw=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function dh(t,e,n){var l=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?l?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":l?t.setProperty(e,n):typeof n!="number"||n===0||rw.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function c0(t,e,n){if(e!=null&&typeof e!="object")throw Error(S(62));if(t=t.style,n!=null){for(var l in n)!n.hasOwnProperty(l)||e!=null&&e.hasOwnProperty(l)||(l.indexOf("--")===0?t.setProperty(l,""):l==="float"?t.cssFloat="":t[l]="",q=!0);for(var a in e)l=e[a],e.hasOwnProperty(a)&&n[a]!==l&&(dh(t,a,l),q=!0)}else for(var i in e)e.hasOwnProperty(i)&&dh(t,i,e[i])}function jf(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var sw=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),cw=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Su(t){return cw.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Ye(){}var qc=null;function Xf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var aa=null,ha=null;function mh(t){var e=Ha(t);if(e&&(t=e.stateNode)){var n=t[It]||null;t:switch(t=e.stateNode,e.type){case"input":if(Bc(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+be(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var l=n[e];if(l!==t&&l.form===t.form){var a=l[It]||null;if(!a)throw Error(S(90));Bc(l,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(e=0;e<n.length;e++)l=n[e],l.form===t.form&&o0(l)}break t;case"textarea":r0(t,n.value,n.defaultValue);break t;case"select":e=n.value,e!=null&&pa(t,!!n.multiple,e,!1)}}}var ec=!1;function f0(t,e,n){if(ec)return t(e,n);ec=!0;try{var l=t(e);return l}finally{if(ec=!1,(aa!==null||ha!==null)&&(Mr(),aa&&(e=aa,t=ha,ha=aa=null,mh(e),t)))for(e=0;e<t.length;e++)mh(t[e])}}function $i(t,e){var n=t.stateNode;if(n===null)return null;var l=n[It]||null;if(l===null)return null;n=l[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(t=t.type,l=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!l;break t;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(S(231,e,typeof n));return n}var sn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),kc=!1;if(sn)try{Jl={},Object.defineProperty(Jl,"passive",{get:function(){kc=!0}}),window.addEventListener("test",Jl,Jl),window.removeEventListener("test",Jl,Jl)}catch{kc=!1}var Jl,Ln=null,Gf=null,wu=null;function d0(){if(wu)return wu;var t,e=Gf,n=e.length,l,a="value"in Ln?Ln.value:Ln.textContent,i=a.length;for(t=0;t<n&&e[t]===a[t];t++);var o=n-t;for(l=1;l<=o&&e[n-l]===a[i-l];l++);return wu=a.slice(t,1<l?1-l:void 0)}function Eu(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function lu(){return!0}function ph(){return!1}function jt(t){function e(n,l,a,i,o){this._reactName=n,this._targetInst=a,this.type=l,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var u in t)t.hasOwnProperty(u)&&(n=t[u],this[u]=n?n(i):i[u]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?lu:ph,this.isPropagationStopped=ph,this}return Z(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=lu)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=lu)},persist:function(){},isPersistent:lu}),e}var tl={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},hr=jt(tl),no=Z({},tl,{view:0,detail:0}),fw=jt(no),nc,lc,di,gr=Z({},no,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Qf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==di&&(di&&t.type==="mousemove"?(nc=t.screenX-di.screenX,lc=t.screenY-di.screenY):lc=nc=0,di=t),nc)},movementY:function(t){return"movementY"in t?t.movementY:lc}}),hh=jt(gr),dw=Z({},gr,{dataTransfer:0}),mw=jt(dw),pw=Z({},no,{relatedTarget:0}),ac=jt(pw),hw=Z({},tl,{animationName:0,elapsedTime:0,pseudoElement:0}),gw=jt(hw),yw=Z({},tl,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),vw=jt(yw),bw=Z({},tl,{data:0}),gh=jt(bw),Sw={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ww={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ew={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function xw(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Ew[t])?!!e[t]:!1}function Qf(){return xw}var Tw=Z({},no,{key:function(t){if(t.key){var e=Sw[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Eu(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?ww[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Qf,charCode:function(t){return t.type==="keypress"?Eu(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Eu(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),_w=jt(Tw),Nw=Z({},gr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),yh=jt(Nw),Aw=Z({},tl,{submitter:0}),Mw=jt(Aw),Cw=Z({},no,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Qf}),Ow=jt(Cw),Rw=Z({},tl,{propertyName:0,elapsedTime:0,pseudoElement:0}),zw=jt(Rw),Uw=Z({},gr,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Lw=jt(Uw),Dw=Z({},tl,{newState:0,oldState:0,source:0}),$w=jt(Dw),Hw=[9,13,27,32],Kf=sn&&"CompositionEvent"in window,Ei=null;sn&&"documentMode"in document&&(Ei=document.documentMode);var Bw=sn&&"TextEvent"in window&&!Ei,m0=sn&&(!Kf||Ei&&8<Ei&&11>=Ei),vh=" ",bh=!1;function p0(t,e){switch(t){case"keyup":return Hw.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function h0(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ia=!1;function qw(t,e){switch(t){case"compositionend":return h0(e);case"keypress":return e.which!==32?null:(bh=!0,vh);case"textInput":return t=e.data,t===vh&&bh?null:t;default:return null}}function kw(t,e){if(ia)return t==="compositionend"||!Kf&&p0(t,e)?(t=d0(),wu=Gf=Ln=null,ia=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return m0&&e.locale!=="ko"?null:e.data;default:return null}}var Vw={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Sh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Vw[t.type]:e==="textarea"}function g0(t,e,n,l){aa?ha?ha.push(l):ha=[l]:aa=l,e=cr(e,"onChange"),0<e.length&&(n=new hr("onChange","change",null,n,l),t.push({event:n,listeners:e}))}var xi=null,Hi=null;function Yw(t){fv(t,0)}function yr(t){var e=bi(t);if(o0(e))return t}function wh(t,e){if(t==="change")return e}var y0=!1;sn&&(sn?(iu="oninput"in document,iu||(ic=document.createElement("div"),ic.setAttribute("oninput","return;"),iu=typeof ic.oninput=="function"),au=iu):au=!1,y0=au&&(!document.documentMode||9<document.documentMode));var au,iu,ic;function Eh(){xi&&(xi.detachEvent("onpropertychange",v0),Hi=xi=null)}function v0(t){if(t.propertyName==="value"&&yr(Hi)){var e=[];g0(e,Hi,t,Xf(t)),f0(Yw,e)}}function jw(t,e,n){t==="focusin"?(Eh(),xi=e,Hi=n,xi.attachEvent("onpropertychange",v0)):t==="focusout"&&Eh()}function Xw(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return yr(Hi)}function Gw(t,e){if(t==="click")return yr(e)}function Qw(t,e){if(t==="input"||t==="change")return yr(e)}function Kw(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var re=typeof Object.is=="function"?Object.is:Kw;function Bi(t,e){if(re(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),l=Object.keys(e);if(n.length!==l.length)return!1;for(l=0;l<n.length;l++){var a=n[l];if(!$c.call(e,a)||!re(t[a],e[a]))return!1}return!0}function Vc(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function xh(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Th(t,e){var n=xh(t);t=0;for(var l;n;){if(n.nodeType===3){if(l=t+n.textContent.length,t<=e&&l>=e)return{node:n,offset:e-t};t=l}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=xh(n)}}function b0(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?b0(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function S0(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=Vc(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Vc(t.document)}return e}function Zf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var Zw=sn&&"documentMode"in document&&11>=document.documentMode,oa=null,Yc=null,Ti=null,jc=!1;function _h(t,e,n){var l=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;jc||oa==null||oa!==Vc(l)||(l=oa,"selectionStart"in l&&Zf(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),Ti&&Bi(Ti,l)||(Ti=l,l=cr(Yc,"onSelect"),0<l.length&&(e=new hr("onSelect","select",null,e,n),t.push({event:e,listeners:l}),e.target=oa)))}function sl(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ua={animationend:sl("Animation","AnimationEnd"),animationiteration:sl("Animation","AnimationIteration"),animationstart:sl("Animation","AnimationStart"),transitionrun:sl("Transition","TransitionRun"),transitionstart:sl("Transition","TransitionStart"),transitioncancel:sl("Transition","TransitionCancel"),transitionend:sl("Transition","TransitionEnd")},oc={},w0={};sn&&(w0=document.createElement("div").style,"AnimationEvent"in window||(delete ua.animationend.animation,delete ua.animationiteration.animation,delete ua.animationstart.animation),"TransitionEvent"in window||delete ua.transitionend.transition);function Rl(t){if(oc[t])return oc[t];if(!ua[t])return t;var e=ua[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in w0)return oc[t]=e[n];return t}var E0=Rl("animationend"),x0=Rl("animationiteration"),T0=Rl("animationstart"),Jw=Rl("transitionrun"),Iw=Rl("transitionstart"),Ww=Rl("transitioncancel"),_0=Rl("transitionend"),N0=new Map,Xc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Xc.push("scrollEnd");function Oe(t,e){N0.set(t,e),Ol(e,[t])}var Pw=0;function cn(t,e){if(t.name!=null&&t.name!=="auto")return t.name;if(e.autoName!==null)return e.autoName;t=Ce.identifierPrefix;var n=Pw++;return t="_"+t+"t_"+n.toString(32)+"_",e.autoName=t}function Nh(t){if(t==null||typeof t=="string")return t;var e=null,n=Ea;if(n!==null)for(var l=0;l<n.length;l++){var a=t[n[l]];if(a!=null){if(a==="none")return"none";e=e==null?a:e+(" "+a)}}return e??t.default}function gn(t,e){return t=Nh(t),e=Nh(e),e==null?t==="auto"?null:t:e==="auto"?null:e}var ju=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},ge=[],ra=0,Jf=0;function vr(){for(var t=ra,e=Jf=ra=0;e<t;){var n=ge[e];ge[e++]=null;var l=ge[e];ge[e++]=null;var a=ge[e];ge[e++]=null;var i=ge[e];if(ge[e++]=null,l!==null&&a!==null){var o=l.pending;o===null?a.next=a:(a.next=o.next,o.next=a),l.pending=a}i!==0&&A0(n,a,i)}}function br(t,e,n,l){ge[ra++]=t,ge[ra++]=e,ge[ra++]=n,ge[ra++]=l,Jf|=l,t.lanes|=l,t=t.alternate,t!==null&&(t.lanes|=l)}function If(t,e,n,l){return br(t,e,n,l),Xu(t)}function zl(t,e){return br(t,null,null,e),Xu(t)}function A0(t,e,n){t.lanes|=n;var l=t.alternate;l!==null&&(l.lanes|=n);for(var a=!1,i=t.return;i!==null;)i.childLanes|=n,l=i.alternate,l!==null&&(l.childLanes|=n),i.tag===22&&(t=i.stateNode,t===null||t._visibility&1||(a=!0)),t=i,i=i.return;return t.tag===3?(i=t.stateNode,a&&e!==null&&(a=31-oe(n),t=i.hiddenUpdates,l=t[a],l===null?t[a]=[e]:l.push(e),e.lane=n|536870912),i):null}function Xu(t){if(50<Li)throw Li=0,zu=null,Error(S(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var sa={};function Fw(t,e,n,l){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Kt(t,e,n,l){return new Fw(t,e,n,l)}function Wf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function un(t,e){var n=t.alternate;return n===null?(n=Kt(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&1206910976,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function M0(t,e){t.flags&=1206910978;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function xu(t,e,n,l,a,i){var o=0;if(l=t,typeof l=="function")Wf(l)&&(o=1);else if(typeof l=="string")o=_x(t,n,Ge.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(l){case Rc:return t=Kt(31,n,e,a),t.elementType=Rc,t.lanes=i,t;case na:return yl(n.children,a,i,e);case Gg:o=8,a|=24;break;case Mc:return t=Kt(12,n,e,a|2),t.elementType=Mc,t.lanes=i,t;case Cc:return t=Kt(13,n,e,a),t.elementType=Cc,t.lanes=i,t;case Oc:return t=Kt(19,n,e,a),t.elementType=Oc,t.lanes=i,t;case kS:case zc:return t=a|32,t=Kt(30,n,e,t),t.elementType=zc,t.lanes=i,t.stateNode={autoName:null,paired:null,clones:null,ref:null},t;default:if(typeof l=="object"&&l!==null)switch(l.$$typeof){case Ve:o=10;break t;case Qg:o=9;break t;case Bf:o=11;break t;case qf:o=14;break t;case On:o=16,l=null;break t}o=29,n=Error(S(130,t===null?"null":typeof t,"")),l=null}return e=Kt(o,n,e,a),e.elementType=t,e.type=l,e.lanes=i,e}function yl(t,e,n,l){return t=Kt(7,t,l,e),t.lanes=n,t}function uc(t,e,n){return t=Kt(6,t,null,e),t.lanes=n,t}function C0(t){var e=Kt(18,null,null,0);return e.stateNode=t,e}function rc(t,e,n){return e=Kt(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var Ah=new WeakMap;function Se(t,e){if(typeof t=="object"&&t!==null){var n=Ah.get(t);return n!==void 0?n:(e={value:t,source:e,stack:ih(e)},Ah.set(t,e),e)}return{value:t,source:e,stack:ih(e)}}var ca=[],fa=0,Gu=null,qi=0,ye=[],ve=0,Jn=null,je=1,Xe="";function an(t,e){ca[fa++]=qi,ca[fa++]=Gu,Gu=t,qi=e}function O0(t,e,n){ye[ve++]=je,ye[ve++]=Xe,ye[ve++]=Jn,Jn=t;var l=je;t=Xe;var a=32-oe(l)-1;l&=~(1<<a),n+=1;var i=32-oe(e)+a;if(30<i){var o=a-a%5;i=(l&(1<<o)-1).toString(32),l>>=o,a-=o,je=1<<32-oe(e)+a|n<<a|l,Xe=i+t}else je=1<<i|n<<a|l,Xe=t}function Sr(t){t.return!==null&&(an(t,1),O0(t,1,0))}function Pf(t){for(;t===Gu;)Gu=ca[--fa],ca[fa]=null,qi=ca[--fa],ca[fa]=null;for(;t===Jn;)Jn=ye[--ve],ye[ve]=null,Xe=ye[--ve],ye[ve]=null,je=ye[--ve],ye[ve]=null}function R0(t,e){ye[ve++]=je,ye[ve++]=Xe,ye[ve++]=Jn,je=e.id,Xe=e.overflow,Jn=t}var Et=null,P=null,L=!1,kn=null,we=!1,Gc=Error(S(519));function In(t){var e=Error(S(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw ki(Se(e,t)),Gc}function Mh(t){var e=t.stateNode,n=t.type,l=t.memoizedProps;switch(e[_t]=t,e[It]=l,n){case"dialog":D("cancel",e),D("close",e);break;case"iframe":case"object":case"embed":D("load",e);break;case"video":case"audio":for(n=0;n<Xi.length;n++)D(Xi[n],e);break;case"source":D("error",e);break;case"img":case"image":case"link":D("error",e),D("load",e);break;case"details":D("toggle",e);break;case"input":D("invalid",e),u0(e,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":D("invalid",e);break;case"textarea":D("invalid",e),s0(e,l.value,l.defaultValue,l.children)}n=l.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||l.suppressHydrationWarning===!0||mv(e.textContent,n)?(l.popover!=null&&(D("beforetoggle",e),D("toggle",e)),l.onScroll!=null&&D("scroll",e),l.onScrollEnd!=null&&D("scrollend",e),l.onClick!=null&&(e.onclick=Ye),e=!0):e=!1,e||In(t,!0)}function Qu(t){for(Et=t.return;Et;)switch(Et.tag){case 5:case 31:case 13:we=!1;return;case 27:case 3:we=!0;return;default:Et=Et.return}}function Il(t){if(t!==Et)return!1;if(!L)return Qu(t),L=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||Of(t.type,t.memoizedProps)),n=!n),n&&P&&In(t),Qu(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(S(317));P=Tg(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(S(317));P=Tg(t)}else e===27?(e=P,el(t.type)?(t=Lf,Lf=null,P=t):P=e):P=Et?Ee(t.stateNode.nextSibling):null;return!0}function wl(){P=Et=null,L=!1}function sc(){var t=kn;return t!==null&&(Gt===null?Gt=t:Gt.push.apply(Gt,t),kn=null),t}function ki(t){kn===null?kn=[t]:kn.push(t)}var Qc=Ze(null),Ul=null,on=null;function Dn(t,e,n){F(Qc,e._currentValue),e._currentValue=n}function rn(t){t._currentValue=Qc.current,At(Qc)}function Tu(t,e,n){for(;t!==null;){var l=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,l!==null&&(l.childLanes|=e)):l!==null&&(l.childLanes&e)!==e&&(l.childLanes|=e),t===n)break;t=t.return}}function Kc(t,e,n,l){var a=t.child;for(a!==null&&(a.return=t);a!==null;){var i=a.dependencies;if(i!==null){var o=a.child;i=i.firstContext;t:for(;i!==null;){var u=i;i=a;for(var s=0;s<e.length;s++)if(u.context===e[s]){i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),Tu(i.return,n,t),l||(o=null);break t}i=u.next}}else if(a.tag===18){if(o=a.return,o===null)throw Error(S(341));o.lanes|=n,i=o.alternate,i!==null&&(i.lanes|=n),Tu(o,n,t),o=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),Tu(a.return,n,t),o=a.child,o=o!==null?o.sibling:null):o=a.child;if(o!==null)o.return=a;else for(o=a;o!==null;){if(o===t){o=null;break}if(a=o.sibling,a!==null){a.return=o.return,o=a;break}o=o.return}a=o}}function El(t,e,n,l){t=null;for(var a=e,i=!1;a!==null;){if(!i){if((a.flags&524288)!==0)i=!0;else if((a.flags&262144)!==0)break}if(a.tag===10){var o=a.alternate;if(o===null)throw Error(S(387));if(o=o.memoizedProps,o!==null){var u=a.type;re(a.pendingProps.value,o.value)||(t!==null?t.push(u):t=[u])}}else if(a===Bu.current){if(o=a.alternate,o===null)throw Error(S(387));o.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(t!==null?t.push(Ua):t=[Ua])}a=a.return}return t!==null&&Kc(e,t,n,l),e.flags|=262144,t!==null}function Ku(t){for(t=t.firstContext;t!==null;){if(!re(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function xl(t){Ul=t,on=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Nt(t){return z0(Ul,t)}function ou(t,e){return Ul===null&&xl(t),z0(t,e)}function z0(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},on===null){if(t===null)throw Error(S(308));on=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else on=on.next=e;return n}var tE=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,l){t.push(l)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},eE=vt.unstable_scheduleCallback,nE=vt.unstable_NormalPriority,mt={$$typeof:Ve,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ff(){return{controller:new tE,data:new Map,refCount:0}}function lo(t){t.refCount--,t.refCount===0&&eE(nE,function(){t.controller.abort()})}function Ch(t,e){if((t.pendingLanes&4194048)!==0){var n=t.transitionTypes;for(n===null&&(n=t.transitionTypes=[]),t=0;t<e.length;t++){var l=e[t];n.indexOf(l)===-1&&n.push(l)}}}var Si=null;function lE(t){var e=t.transitionTypes;return t.transitionTypes=null,e}var _i=null,Zc=0,Tl=0,ga=null;function aE(t,e){if(_i===null){var n=_i=[];Zc=0,Tl=Ad(),ga={status:"pending",value:void 0,then:function(l){n.push(l)}}}return Zc++,e.then(Oh,Oh),e}function Oh(){if(--Zc===0&&(Si=null,_i!==null)){ga!==null&&(ga.status="fulfilled");var t=_i;_i=null,Tl=0,ga=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function iE(t,e){var n=[],l={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return t.then(function(){l.status="fulfilled",l.value=e;for(var a=0;a<n.length;a++)(0,n[a])(e)},function(a){for(l.status="rejected",l.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),l}var Rh=O.S;O.S=function(t,e){if(Iy=ae(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&aE(t,e),Si!==null)for(var n=Oa;n!==null;)Ch(n,Si),n=n.next;if(n=t.types,n!==null){for(var l=Oa;l!==null;)Ch(l,n),l=l.next;if(Tl!==0){l=Si,l===null&&(l=Si=[]);for(var a=0;a<n.length;a++){var i=n[a];l.indexOf(i)===-1&&l.push(i)}}}Rh!==null&&Rh(t,e)};var vl=Ze(null);function td(){var t=vl.current;return t!==null?t:K.pooledCache}function _u(t,e){e===null?F(vl,vl.current):F(vl,e.pool)}function U0(){var t=td();return t===null?null:{parent:mt._currentValue,pool:t}}var Ba=Error(S(460)),ed=Error(S(474)),wr=Error(S(542)),Zu={then:function(){}};function zh(t){return t=t.status,t==="fulfilled"||t==="rejected"}function L0(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(Ye,Ye),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Lh(t),t===void 0&&!("reason"in e)?Error(S(600)):t;default:if(typeof e.status=="string")e.then(Ye,Ye);else{if(t=K,t!==null&&100<t.shellSuspendCounter)throw Error(S(482));t=e,t.status="pending",t.then(function(l){if(e.status==="pending"){var a=e;a.status="fulfilled",a.value=l}},function(l){if(e.status==="pending"){var a=e;a.status="rejected",a.reason=l}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Lh(t),t}throw bl=e,Ba}}function dl(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(bl=n,Ba):n}}var bl=null;function Uh(){if(bl===null)throw Error(S(459));var t=bl;return bl=null,t}function Lh(t){if(t===Ba||t===wr)throw Error(S(483))}var ya=null,Vi=0;function uu(t){var e=Vi;return Vi+=1,ya===null&&(ya=[]),L0(ya,t,e)}function An(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function ru(t,e){throw e.$$typeof===qS?Error(S(525)):(t=Object.prototype.toString.call(e),Error(S(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function D0(t){function e(f,c){if(t){var y=f.deletions;y===null?(f.deletions=[c],f.flags|=16):y.push(c)}}function n(f,c){if(!t)return null;for(;c!==null;)e(f,c),c=c.sibling;return null}function l(f){for(var c=new Map;f!==null;)f.key===null?c.set(f.index,f):c.set(f.key,f),f=f.sibling;return c}function a(f,c){return f=un(f,c),f.index=0,f.sibling=null,f}function i(f,c,y){return f.index=y,t?(y=f.alternate,y!==null?(y=y.index,y<c?(f.flags|=2,c):y):(f.flags|=134217730,c)):(f.flags|=1048576,c)}function o(f){return t&&f.alternate===null&&(f.flags|=134217730),f}function u(f,c,y,b){return c===null||c.tag!==6?(c=uc(y,f.mode,b),c.return=f,c):(c=a(c,y),c.return=f,c)}function s(f,c,y,b){var x=y.type;return x===na?(f=p(f,c,y.props.children,b,y.key),An(f,y),f):c!==null&&(c.elementType===x||typeof x=="object"&&x!==null&&x.$$typeof===On&&dl(x)===c.type)?(c=a(c,y.props),An(c,y),c.return=f,c):(c=xu(y.type,y.key,y.props,null,f.mode,b),An(c,y),c.return=f,c)}function m(f,c,y,b){return c===null||c.tag!==4||c.stateNode.containerInfo!==y.containerInfo||c.stateNode.implementation!==y.implementation?(c=rc(y,f.mode,b),c.return=f,c):(c=a(c,y.children||[]),c.return=f,c)}function p(f,c,y,b,x){return c===null||c.tag!==7?(c=yl(y,f.mode,b,x),c.return=f,c):(c=a(c,y),c.return=f,c)}function v(f,c,y){if(typeof c=="string"&&c!==""||typeof c=="number"||typeof c=="bigint")return c=uc(""+c,f.mode,y),c.return=f,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case Po:return y=xu(c.type,c.key,c.props,null,f.mode,y),An(y,c),y.return=f,y;case yi:return c=rc(c,f.mode,y),c.return=f,c;case On:return c=dl(c),v(f,c,y)}if(vi(c)||fi(c))return c=yl(c,f.mode,y,null),c.return=f,c;if(typeof c.then=="function")return v(f,uu(c),y);if(c.$$typeof===Ve)return v(f,ou(f,c),y);ru(f,c)}return null}function d(f,c,y,b){var x=c!==null?c.key:null;if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return x!==null?null:u(f,c,""+y,b);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Po:return y.key===x?s(f,c,y,b):null;case yi:return y.key===x?m(f,c,y,b):null;case On:return y=dl(y),d(f,c,y,b)}if(vi(y)||fi(y))return x!==null?null:p(f,c,y,b,null);if(typeof y.then=="function")return d(f,c,uu(y),b);if(y.$$typeof===Ve)return d(f,c,ou(f,y),b);ru(f,y)}return null}function g(f,c,y,b,x){if(typeof b=="string"&&b!==""||typeof b=="number"||typeof b=="bigint")return f=f.get(y)||null,u(c,f,""+b,x);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case Po:return f=f.get(b.key===null?y:b.key)||null,s(c,f,b,x);case yi:return f=f.get(b.key===null?y:b.key)||null,m(c,f,b,x);case On:return b=dl(b),g(f,c,y,b,x)}if(vi(b)||fi(b))return f=f.get(y)||null,p(c,f,b,x,null);if(typeof b.then=="function")return g(f,c,y,uu(b),x);if(b.$$typeof===Ve)return g(f,c,y,ou(c,b),x);ru(c,b)}return null}function E(f,c,y,b){for(var x=null,z=null,A=c,M=c=0,ct=null;A!==null&&M<y.length;M++){A.index>M?(ct=A,A=null):ct=A.sibling;var B=d(f,A,y[M],b);if(B===null){A===null&&(A=ct);break}t&&A&&B.alternate===null&&e(f,A),c=i(B,c,M),z===null?x=B:z.sibling=B,z=B,A=ct}if(M===y.length)return n(f,A),L&&an(f,M),x;if(A===null){for(;M<y.length;M++)A=v(f,y[M],b),A!==null&&(c=i(A,c,M),z===null?x=A:z.sibling=A,z=A);return L&&an(f,M),x}for(A=l(A);M<y.length;M++)ct=g(A,f,M,y[M],b),ct!==null&&(t&&(B=ct.alternate,B!==null&&A.delete(B.key===null?M:B.key)),c=i(ct,c,M),z===null?x=ct:z.sibling=ct,z=ct);return t&&A.forEach(function(wn){return e(f,wn)}),L&&an(f,M),x}function _(f,c,y,b){if(y==null)throw Error(S(151));for(var x=null,z=null,A=c,M=c=0,ct=null,B=y.next();A!==null&&!B.done;M++,B=y.next()){A.index>M?(ct=A,A=null):ct=A.sibling;var wn=d(f,A,B.value,b);if(wn===null){A===null&&(A=ct);break}t&&A&&wn.alternate===null&&e(f,A),c=i(wn,c,M),z===null?x=wn:z.sibling=wn,z=wn,A=ct}if(B.done)return n(f,A),L&&an(f,M),x;if(A===null){for(;!B.done;M++,B=y.next())B=v(f,B.value,b),B!==null&&(c=i(B,c,M),z===null?x=B:z.sibling=B,z=B);return L&&an(f,M),x}for(A=l(A);!B.done;M++,B=y.next())B=g(A,f,M,B.value,b),B!==null&&(t&&(ct=B.alternate,ct!==null&&A.delete(ct.key===null?M:ct.key)),c=i(B,c,M),z===null?x=B:z.sibling=B,z=B);return t&&A.forEach(function(Bb){return e(f,Bb)}),L&&an(f,M),x}function N(f,c,y,b){if(typeof y=="object"&&y!==null&&y.type===na&&y.key===null&&y.props.ref===void 0&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case Po:t:{for(var x=y.key;c!==null;){if(c.key===x){if(x=y.type,x===na){if(c.tag===7){n(f,c.sibling),b=a(c,y.props.children),An(b,y),b.return=f,f=b;break t}}else if(c.elementType===x||typeof x=="object"&&x!==null&&x.$$typeof===On&&dl(x)===c.type){n(f,c.sibling),b=a(c,y.props),An(b,y),b.return=f,f=b;break t}n(f,c);break}else e(f,c);c=c.sibling}y.type===na?(b=yl(y.props.children,f.mode,b,y.key),An(b,y),b.return=f,f=b):(b=xu(y.type,y.key,y.props,null,f.mode,b),An(b,y),b.return=f,f=b)}return o(f);case yi:t:{for(x=y.key;c!==null;){if(c.key===x)if(c.tag===4&&c.stateNode.containerInfo===y.containerInfo&&c.stateNode.implementation===y.implementation){n(f,c.sibling),b=a(c,y.children||[]),b.return=f,f=b;break t}else{n(f,c);break}else e(f,c);c=c.sibling}b=rc(y,f.mode,b),b.return=f,f=b}return o(f);case On:return y=dl(y),N(f,c,y,b)}if(vi(y))return E(f,c,y,b);if(fi(y)){if(x=fi(y),typeof x!="function")throw Error(S(150));return y=x.call(y),_(f,c,y,b)}if(typeof y.then=="function")return N(f,c,uu(y),b);if(y.$$typeof===Ve)return N(f,c,ou(f,y),b);ru(f,y)}return typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint"?(y=""+y,c!==null&&c.tag===6?(n(f,c.sibling),b=a(c,y),b.return=f,f=b):(n(f,c),b=uc(y,f.mode,b),b.return=f,f=b),o(f)):n(f,c)}return function(f,c,y,b){try{Vi=0;var x=N(f,c,y,b);return ya=null,x}catch(A){if(A===Ba||A===wr)throw A;var z=Kt(29,A,null,f.mode);return z.lanes=b,z.return=f,z}}}var _l=D0(!0),$0=D0(!1),Rn=!1;function nd(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Jc(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Vn(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Yn(t,e,n){var l=t.updateQueue;if(l===null)return null;if(l=l.shared,(k&2)!==0){var a=l.pending;return a===null?e.next=e:(e.next=a.next,a.next=e),l.pending=e,e=Xu(t),A0(t,null,n),e}return br(t,l,e,n),Xu(t)}function Ni(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var l=e.lanes;l&=t.pendingLanes,n|=l,e.lanes=n,Fg(t,n)}}function cc(t,e){var n=t.updateQueue,l=t.alternate;if(l!==null&&(l=l.updateQueue,n===l)){var a=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?a=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?a=i=e:i=i.next=e}else a=i=e;n={baseState:l.baseState,firstBaseUpdate:a,lastBaseUpdate:i,shared:l.shared,callbacks:l.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var Ic=!1;function Ai(){if(Ic){var t=ga;if(t!==null)throw t}}function Mi(t,e,n,l){Ic=!1;var a=t.updateQueue;Rn=!1;var i=a.firstBaseUpdate,o=a.lastBaseUpdate,u=a.shared.pending;if(u!==null){a.shared.pending=null;var s=u,m=s.next;s.next=null,o===null?i=m:o.next=m,o=s;var p=t.alternate;p!==null&&(p=p.updateQueue,u=p.lastBaseUpdate,u!==o&&(u===null?p.firstBaseUpdate=m:u.next=m,p.lastBaseUpdate=s))}if(i!==null){var v=a.baseState;o=0,p=m=s=null,u=i;do{var d=u.lane&-536870913,g=d!==u.lane;if(g?(H&d)===d:(l&d)===d){d!==0&&d===Tl&&(Ic=!0),p!==null&&(p=p.next={lane:0,tag:u.tag,payload:u.payload,callback:null,next:null});t:{var E=t,_=u;d=e;var N=n;switch(_.tag){case 1:if(E=_.payload,typeof E=="function"){v=E.call(N,v,d);break t}v=E;break t;case 3:E.flags=E.flags&-65537|128;case 0:if(E=_.payload,d=typeof E=="function"?E.call(N,v,d):E,d==null)break t;v=Z({},v,d);break t;case 2:Rn=!0}}d=u.callback,d!==null&&(t.flags|=64,g&&(t.flags|=8192),g=a.callbacks,g===null?a.callbacks=[d]:g.push(d))}else g={lane:d,tag:u.tag,payload:u.payload,callback:u.callback,next:null},p===null?(m=p=g,s=v):p=p.next=g,o|=d;if(u=u.next,u===null){if(u=a.shared.pending,u===null)break;g=u,u=g.next,g.next=null,a.lastBaseUpdate=g,a.shared.pending=null}}while(!0);p===null&&(s=v),a.baseState=s,a.firstBaseUpdate=m,a.lastBaseUpdate=p,i===null&&(a.shared.lanes=0),Fn|=o,t.lanes=o,t.memoizedState=v}}function H0(t,e){if(typeof t!="function")throw Error(S(191,t));t.call(e)}function B0(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)H0(n[t],e)}var Wn=Ze(null),Ju=Ze(0);function Dh(t,e){t=pn,F(Ju,t),F(Wn,e),pn=t|e.baseLanes}function Wc(){F(Ju,pn),F(Wn,Wn.current)}function ld(){pn=Ju.current,At(Wn),At(Ju)}var Ot=Ze(null),Ht=null;function jn(t){var e=t.alternate;F(Mt,Mt.current&1),F(Ot,t),Ht===null&&(e===null||Wn.current!==null||e.memoizedState!==null)&&(Ht=t)}function Pc(t){F(Mt,Mt.current),F(Ot,t),Ht===null&&(Ht=t)}function q0(t){t.tag===22?(F(Mt,Mt.current),F(Ot,t),Ht===null&&(Ht=t)):Xn()}function Xn(){F(Mt,Mt.current),F(Ot,Ot.current)}function ee(t){At(Ot),Ht===t&&(Ht=null),At(Mt)}var Mt=Ze(0);function Yi(t,e){F(Ot,Ot.current),F(Mt,e)}function ad(t){At(Mt),At(Ot),Ht===t&&(Ht=null)}function Iu(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Uf(n)||Rd(n)))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!=="independent"){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var fn=0,U=null,Q=null,dt=null,Wu=!1,va=!1,Nl=!1,Pu=0,ji=0,ba=null,oE=0;function it(){throw Error(S(321))}function id(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!re(t[n],e[n]))return!1;return!0}function od(t,e,n,l,a,i){return fn=i,U=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,O.H=t===null||t.memoizedState===null?gy:yy,Nl=!1,i=n(l,a),Nl=!1,va&&(i=V0(e,n,l,a)),k0(t),i}function k0(t){O.H=Fu;var e=Q!==null&&Q.next!==null;if(fn=0,dt=Q=U=null,Wu=!1,ji=0,ba=null,e)throw Error(S(300));t===null||pt||(t=t.dependencies,t!==null&&Ku(t)&&(pt=!0))}function V0(t,e,n,l){U=t;var a=0;do{if(va&&(ba=null),ji=0,va=!1,25<=a)throw Error(S(301));if(a+=1,dt=Q=null,t.updateQueue!=null){var i=t.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}O.H=pE,i=e(n,l)}while(va);return i}function uE(){var t=O.H,e=t.useState()[0];return e=typeof e.then=="function"?ao(e):e,t=t.useState()[0],(Q!==null?Q.memoizedState:null)!==t&&(U.flags|=1024),e}function ud(){var t=Pu!==0;return Pu=0,t}function rd(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function sd(t){if(Wu){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}Wu=!1}fn=0,dt=Q=U=null,va=!1,ji=Pu=0,ba=null}function Yt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return dt===null?U.memoizedState=dt=t:dt=dt.next=t,dt}function rt(){if(Q===null){var t=U.alternate;t=t!==null?t.memoizedState:null}else t=Q.next;var e=dt===null?U.memoizedState:dt.next;if(e!==null)dt=e,Q=t;else{if(t===null)throw U.alternate===null?Error(S(467)):Error(S(310));Q=t,t={memoizedState:Q.memoizedState,baseState:Q.baseState,baseQueue:Q.baseQueue,queue:Q.queue,next:null},dt===null?U.memoizedState=dt=t:dt=dt.next=t}return dt}function Er(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ao(t){var e=ji;return ji+=1,ba===null&&(ba=[]),t=L0(ba,t,e),e=U,(dt===null?e.memoizedState:dt.next)===null&&(e=e.alternate,O.H=e===null||e.memoizedState===null?gy:yy),t}function xr(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return ao(t);if(t.$$typeof===YS)return;if(t.$$typeof===Ve)return Nt(t)}throw Error(S(438,String(t)))}function cd(t){var e=null,n=U.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var l=U.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(e={data:l.data.map(function(a){return a.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=Er(),U.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),l=0;l<t;l++)n[l]=VS;return e.index++,n}function dn(t,e){return typeof e=="function"?e(t):e}function Nu(t){var e=rt();return fd(e,Q,t)}function fd(t,e,n){var l=t.queue;if(l===null)throw Error(S(311));l.lastRenderedReducer=n;var a=t.baseQueue,i=l.pending;if(i!==null){if(a!==null){var o=a.next;a.next=i.next,i.next=o}e.baseQueue=a=i,l.pending=null}if(i=t.baseState,a===null)t.memoizedState=i;else{e=a.next;var u=o=null,s=null,m=e,p=!1;do{var v=m.lane&-536870913;if(v!==m.lane?(H&v)===v:(fn&v)===v){var d=m.revertLane;if(d===0)s!==null&&(s=s.next={lane:0,revertLane:0,gesture:null,action:m.action,hasEagerState:m.hasEagerState,eagerState:m.eagerState,next:null}),v===Tl&&(p=!0);else if((fn&d)===d){m=m.next,d===Tl&&(p=!0);continue}else v={lane:0,revertLane:m.revertLane,gesture:null,action:m.action,hasEagerState:m.hasEagerState,eagerState:m.eagerState,next:null},s===null?(u=s=v,o=i):s=s.next=v,U.lanes|=d,Fn|=d;v=m.action,Nl&&n(i,v),i=m.hasEagerState?m.eagerState:n(i,v)}else d={lane:v,revertLane:m.revertLane,gesture:m.gesture,action:m.action,hasEagerState:m.hasEagerState,eagerState:m.eagerState,next:null},s===null?(u=s=d,o=i):s=s.next=d,U.lanes|=v,Fn|=v;m=m.next}while(m!==null&&m!==e);if(s===null?o=i:s.next=u,!re(i,t.memoizedState)&&(pt=!0,p&&(n=ga,n!==null)))throw n;t.memoizedState=i,t.baseState=o,t.baseQueue=s,l.lastRenderedState=i}return a===null&&(l.lanes=0),[t.memoizedState,l.dispatch]}function fc(t){var e=rt(),n=e.queue;if(n===null)throw Error(S(311));n.lastRenderedReducer=t;var l=n.dispatch,a=n.pending,i=e.memoizedState;if(a!==null){n.pending=null;var o=a=a.next;do i=t(i,o.action),o=o.next;while(o!==a);re(i,e.memoizedState)||(pt=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,l]}function Y0(t,e,n){var l=U,a=rt(),i=L;if(i){if(n===void 0)throw Error(S(407));n=n()}else n=e();var o=!re((Q||a).memoizedState,n);if(o&&(a.memoizedState=n,pt=!0),a=a.queue,dd(G0.bind(null,l,a,t),[t]),t=a.getSnapshot!==e||o||dt!==null&&(dt.memoizedState.tag&1)!==0,Na(t?9:8,{destroy:void 0},X0.bind(null,l,a,n,e),null),t){if(l.flags|=2048,K===null)throw Error(S(349));i||(fn&127)!==0||j0(l,e,n)}return n}function j0(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=U.updateQueue,e===null?(e=Er(),U.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function X0(t,e,n,l){e.value=n,e.getSnapshot=l,Q0(e)&&K0(t)}function G0(t,e,n){return n(function(){Q0(e)&&K0(t)})}function Q0(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!re(t,n)}catch{return!0}}function K0(t){var e=zl(t,2);e!==null&&Zt(e,t,2)}function Fc(t){var e=Yt();if(typeof t=="function"){var n=t;if(t=n(),Nl){Un(!0);try{n()}finally{Un(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:dn,lastRenderedState:t},e}function Z0(t,e,n,l){return t.baseState=n,fd(t,Q,typeof l=="function"?l:dn)}function rE(t,e,n,l,a){if(_r(t))throw Error(S(485));if(t=e.action,t!==null){var i={payload:a,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(o){i.listeners.push(o)}};O.T!==null?n(!0):i.isTransition=!1,l(i),n=e.pending,n===null?(i.next=e.pending=i,J0(e,i)):(i.next=n.next,e.pending=n.next=i)}}function J0(t,e){var n=e.action,l=e.payload,a=t.state;if(e.isTransition){var i=O.T,o={};o.types=i!==null?i.types:null,O.T=o;try{var u=n(a,l),s=O.S;s!==null&&s(o,u),$h(t,e,u)}catch(m){tf(t,e,m)}finally{i!==null&&o.types!==null&&(i.types=o.types),O.T=i}}else try{i=n(a,l),$h(t,e,i)}catch(m){tf(t,e,m)}}function $h(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(l){Hh(t,e,l)},function(l){return tf(t,e,l)}):Hh(t,e,n)}function Hh(t,e,n){e.status="fulfilled",e.value=n,I0(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,J0(t,n)))}function tf(t,e,n){var l=t.pending;if(t.pending=null,l!==null){l=l.next;do e.status="rejected",e.reason=n,I0(e),e=e.next;while(e!==l)}t.action=null}function I0(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function W0(t,e){return e}function Bh(t,e){if(L){var n=K.formState;if(n!==null){t:{var l=U;if(L){if(P){e:{for(var a=P,i=we;a.nodeType!==8;){if(!i){a=null;break e}if(a=Ee(a.nextSibling),a===null){a=null;break e}}i=a.data,a=i==="F!"||i==="F"?a:null}if(a){P=Ee(a.nextSibling),l=a.data==="F!";break t}}In(l)}l=!1}l&&(e=n[0])}}return n=Yt(),n.memoizedState=n.baseState=e,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:W0,lastRenderedState:e},n.queue=l,n=my.bind(null,U,l),l.dispatch=n,l=Fc(!1),i=gd.bind(null,U,!1,l.queue),l=Yt(),a={state:e,dispatch:null,action:t,pending:null},l.queue=a,n=rE.bind(null,U,a,i,n),a.dispatch=n,l.memoizedState=t,[e,n,!1]}function qh(t){var e=rt();return P0(e,Q,t)}function P0(t,e,n){if(e=fd(t,e,W0)[0],t=Nu(dn)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var l=ao(e)}catch(o){throw o===Ba?wr:o}else l=e;e=rt();var a=e.queue,i=a.dispatch;return n!==e.memoizedState&&(U.flags|=2048,Na(9,{destroy:void 0},sE.bind(null,a,n),null)),[l,i,t]}function sE(t,e){t.action=e}function kh(t){var e=rt(),n=Q;if(n!==null)return P0(e,n,t);rt(),e=e.memoizedState,n=rt();var l=n.queue.dispatch;return n.memoizedState=t,[e,l,!1]}function Na(t,e,n,l){return t={tag:t,create:n,deps:l,inst:e,next:null},e=U.updateQueue,e===null&&(e=Er(),U.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(l=n.next,n.next=t,t.next=l,e.lastEffect=t),t}function F0(){return rt().memoizedState}function Au(t,e,n,l){var a=Yt();U.flags|=t,a.memoizedState=Na(1|e,{destroy:void 0},n,l===void 0?null:l)}function Tr(t,e,n,l){var a=rt();l=l===void 0?null:l;var i=a.memoizedState.inst;Q!==null&&l!==null&&id(l,Q.memoizedState.deps)?a.memoizedState=Na(e,i,n,l):(U.flags|=t,a.memoizedState=Na(1|e,i,n,l))}function Vh(t,e){Au(8390656,8,t,e)}function dd(t,e){Tr(2048,8,t,e)}function cE(t){U.flags|=4;var e=U.updateQueue;if(e===null)e=Er(),U.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function ty(t){var e=rt().memoizedState;return cE({ref:e,nextImpl:t}),function(){if((k&2)!==0)throw Error(S(440));return e.impl.apply(void 0,arguments)}}function ey(t,e){return Tr(4,2,t,e)}function ny(t,e){return Tr(4,4,t,e)}function ly(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function ay(t,e,n){n=n!=null?n.concat([t]):null,Tr(4,4,ly.bind(null,e,t),n)}function md(){}function iy(t,e){var n=rt();e=e===void 0?null:e;var l=n.memoizedState;return e!==null&&id(e,l[1])?l[0]:(n.memoizedState=[t,e],t)}function oy(t,e){var n=rt();e=e===void 0?null:e;var l=n.memoizedState;if(e!==null&&id(e,l[1]))return l[0];if(l=t(),Nl){Un(!0);try{t()}finally{Un(!1)}}return n.memoizedState=[l,e],l}function pd(t,e,n){return n===void 0||(fn&1073741824)!==0&&(H&261930)===0?t.memoizedState=e:(t.memoizedState=n,t=Py(),U.lanes|=t,Fn|=t,n)}function uy(t,e,n,l){return re(n,e)?n:Wn.current!==null?(t=pd(t,n,l),re(t,e)||(pt=!0),t):(fn&106)===0||(fn&1073741824)!==0&&(H&261930)===0?(pt=!0,t.memoizedState=n):(t=Py(),U.lanes|=t,Fn|=t,e)}function ry(t,e,n,l,a){var i=V.p;V.p=i!==0&&8>i?i:8;var o=O.T,u={};u.types=o!==null?o.types:null,O.T=u,gd(t,!1,e,n);try{var s=a(),m=O.S;if(m!==null&&m(u,s),s!==null&&typeof s=="object"&&typeof s.then=="function"){var p=iE(s,l);Ci(t,e,p,ue(t))}else Ci(t,e,l,ue(t))}catch(v){Ci(t,e,{then:function(){},status:"rejected",reason:v},ue())}finally{V.p=i,o!==null&&u.types!==null&&(o.types=u.types),O.T=o}}function fE(){}function ef(t,e,n,l){if(t.tag!==5)throw Error(S(476));var a=sy(t).queue;ry(t,a,e,gl,n===null?fE:function(){return cy(t),n(l)})}function sy(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:gl,baseState:gl,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:dn,lastRenderedState:gl},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:dn,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function cy(t){var e=sy(t);e.next===null&&(e=t.alternate.memoizedState),Ci(t,e.next.queue,{},ue())}function hd(){return Nt(Ua)}function fy(){return rt().memoizedState}function dy(){return rt().memoizedState}function dE(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=ue();t=Vn(n);var l=Yn(e,t,n);l!==null&&(Zt(l,e,n),Ni(l,e,n)),e={cache:Ff()},t.payload=e;return}e=e.return}}function mE(t,e,n){var l=ue();n={lane:l,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},_r(t)?py(e,n):(n=If(t,e,n,l),n!==null&&(Zt(n,t,l),hy(n,e,l)))}function my(t,e,n){var l=ue();Ci(t,e,n,l)}function Ci(t,e,n,l){var a={lane:l,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(_r(t))py(e,a);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var o=e.lastRenderedState,u=i(o,n);if(a.hasEagerState=!0,a.eagerState=u,re(u,o))return br(t,e,a,0),K===null&&vr(),!1}catch{}if(n=If(t,e,a,l),n!==null)return Zt(n,t,l),hy(n,e,l),!0}return!1}function gd(t,e,n,l){if(l={lane:2,revertLane:Ad(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},_r(t)){if(e)throw Error(S(479))}else e=If(t,n,l,2),e!==null&&Zt(e,t,2)}function _r(t){var e=t.alternate;return t===U||e!==null&&e===U}function py(t,e){va=Wu=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function hy(t,e,n){if((n&4194048)!==0){var l=e.lanes;l&=t.pendingLanes,n|=l,e.lanes=n,Fg(t,n)}}var Fu={readContext:Nt,use:xr,useCallback:it,useContext:it,useEffect:it,useImperativeHandle:it,useLayoutEffect:it,useInsertionEffect:it,useMemo:it,useReducer:it,useRef:it,useState:it,useDebugValue:it,useDeferredValue:it,useTransition:it,useSyncExternalStore:it,useId:it,useHostTransitionStatus:it,useFormState:it,useActionState:it,useOptimistic:it,useMemoCache:it,useCacheRefresh:it,useEffectEvent:it},gy={readContext:Nt,use:xr,useCallback:function(t,e){return Yt().memoizedState=[t,e===void 0?null:e],t},useContext:Nt,useEffect:Vh,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,Au(4194308,4,ly.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Au(4194308,4,t,e)},useInsertionEffect:function(t,e){Au(4,2,t,e)},useMemo:function(t,e){var n=Yt();e=e===void 0?null:e;var l=t();if(Nl){Un(!0);try{t()}finally{Un(!1)}}return n.memoizedState=[l,e],l},useReducer:function(t,e,n){var l=Yt();if(n!==void 0){var a=n(e);if(Nl){Un(!0);try{n(e)}finally{Un(!1)}}}else a=e;return l.memoizedState=l.baseState=a,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:a},l.queue=t,t=t.dispatch=mE.bind(null,U,t),[l.memoizedState,t]},useRef:function(t){var e=Yt();return t={current:t},e.memoizedState=t},useState:function(t){t=Fc(t);var e=t.queue,n=my.bind(null,U,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:md,useDeferredValue:function(t,e){var n=Yt();return pd(n,t,e)},useTransition:function(){var t=Fc(!1);return t=ry.bind(null,U,t.queue,!0,!1),Yt().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var l=U,a=Yt();if(L){if(n===void 0)throw Error(S(407));n=n()}else{if(n=e(),K===null)throw Error(S(349));(H&127)!==0||j0(l,e,n)}a.memoizedState=n;var i={value:n,getSnapshot:e};return a.queue=i,Vh(G0.bind(null,l,i,t),[t]),l.flags|=2048,Na(9,{destroy:void 0},X0.bind(null,l,i,n,e),null),n},useId:function(){var t=Yt(),e=K.identifierPrefix;if(L){var n=Xe,l=je;n=(l&~(1<<32-oe(l)-1)).toString(32)+n,e="_"+e+"R_"+n,n=Pu++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=oE++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:hd,useFormState:Bh,useActionState:Bh,useOptimistic:function(t){var e=Yt();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=gd.bind(null,U,!0,n),n.dispatch=e,[t,e]},useMemoCache:cd,useCacheRefresh:function(){return Yt().memoizedState=dE.bind(null,U)},useEffectEvent:function(t){var e=Yt(),n={impl:t};return e.memoizedState=n,function(){if((k&2)!==0)throw Error(S(440));return n.impl.apply(void 0,arguments)}}},yy={readContext:Nt,use:xr,useCallback:iy,useContext:Nt,useEffect:dd,useImperativeHandle:ay,useInsertionEffect:ey,useLayoutEffect:ny,useMemo:oy,useReducer:Nu,useRef:F0,useState:function(){return Nu(dn)},useDebugValue:md,useDeferredValue:function(t,e){var n=rt();return uy(n,Q.memoizedState,t,e)},useTransition:function(){var t=Nu(dn)[0],e=rt().memoizedState;return[typeof t=="boolean"?t:ao(t),e]},useSyncExternalStore:Y0,useId:fy,useHostTransitionStatus:hd,useFormState:qh,useActionState:qh,useOptimistic:function(t,e){var n=rt();return Z0(n,Q,t,e)},useMemoCache:cd,useCacheRefresh:dy,useEffectEvent:ty},pE={readContext:Nt,use:xr,useCallback:iy,useContext:Nt,useEffect:dd,useImperativeHandle:ay,useInsertionEffect:ey,useLayoutEffect:ny,useMemo:oy,useReducer:fc,useRef:F0,useState:function(){return fc(dn)},useDebugValue:md,useDeferredValue:function(t,e){var n=rt();return Q===null?pd(n,t,e):uy(n,Q.memoizedState,t,e)},useTransition:function(){var t=fc(dn)[0],e=rt().memoizedState;return[typeof t=="boolean"?t:ao(t),e]},useSyncExternalStore:Y0,useId:fy,useHostTransitionStatus:hd,useFormState:kh,useActionState:kh,useOptimistic:function(t,e){var n=rt();return Q!==null?Z0(n,Q,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:cd,useCacheRefresh:dy,useEffectEvent:ty};function dc(t,e,n,l){e=t.memoizedState,n=n(l,e),n=n==null?e:Z({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var nf={enqueueSetState:function(t,e,n){t=t._reactInternals;var l=ue(),a=Vn(l);a.payload=e,n!=null&&(a.callback=n),e=Yn(t,a,l),e!==null&&(Zt(e,t,l),Ni(e,t,l))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var l=ue(),a=Vn(l);a.tag=1,a.payload=e,n!=null&&(a.callback=n),e=Yn(t,a,l),e!==null&&(Zt(e,t,l),Ni(e,t,l))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ue(),l=Vn(n);l.tag=2,e!=null&&(l.callback=e),e=Yn(t,l,n),e!==null&&(Zt(e,t,n),Ni(e,t,n))}};function Yh(t,e,n,l,a,i,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(l,i,o):e.prototype&&e.prototype.isPureReactComponent?!Bi(n,l)||!Bi(a,i):!0}function jh(t,e,n,l){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,l),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,l),e.state!==t&&nf.enqueueReplaceState(e,e.state,null)}function Al(t,e){var n=e;if("ref"in e){n={};for(var l in e)l!=="ref"&&(n[l]=e[l])}if(t=t.defaultProps){n===e&&(n=Z({},n));for(var a in t)n[a]===void 0&&(n[a]=t[a])}return n}function vy(t){ju(t)}function by(t){console.error(t)}function Sy(t){ju(t)}function tr(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(l){setTimeout(function(){throw l})}}function Xh(t,e,n){try{var l=t.onCaughtError;l(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function lf(t,e,n){return n=Vn(n),n.tag=3,n.payload={element:null},n.callback=function(){tr(t,e)},n}function wy(t){return t=Vn(t),t.tag=3,t}function Ey(t,e,n,l){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var i=l.value;t.payload=function(){return a(i)},t.callback=function(){Xh(e,n,l)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch=="function"&&(t.callback=function(){Xh(e,n,l),typeof a!="function"&&(Gn===null?Gn=new Set([this]):Gn.add(this));var u=l.stack;this.componentDidCatch(l.value,{componentStack:u!==null?u:""})})}function hE(t,e,n,l,a){if(n.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(e=n.alternate,e!==null&&El(e,n,a,!0),n=Ot.current,n!==null){switch(n.tag){case 31:case 13:case 19:return Ht===null?rr():n.alternate===null&&ot===0&&(ot=3),n.flags&=-257,n.flags|=65536,n.lanes=a,l===Zu?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([l]):e.add(l),bc(t,l,a)),!1;case 22:return n.flags|=65536,l===Zu?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([l])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([l]):n.add(l)),bc(t,l,a)),!1}throw Error(S(435,n.tag))}return bc(t,l,a),rr(),!1}if(L)return e=Ot.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=a,l!==Gc&&(t=Error(S(422),{cause:l}),ki(Se(t,n)))):(l!==Gc&&(e=Error(S(423),{cause:l}),ki(Se(e,n))),t=t.current.alternate,t.flags|=65536,a&=-a,t.lanes|=a,l=Se(l,n),a=lf(t.stateNode,l,a),cc(t,a),ot!==4&&(ot=2)),!1;var i=Error(S(520),{cause:l});if(i=Se(i,n),Ui===null?Ui=[i]:Ui.push(i),ot!==4&&(ot=2),e===null)return!0;l=Se(l,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=a&-a,n.lanes|=t,t=lf(n.stateNode,l,t),cc(n,t),!1;case 1:if(e=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(Gn===null||!Gn.has(i))))return n.flags|=65536,a&=-a,n.lanes|=a,a=wy(a),Ey(a,t,n,l),cc(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var yd=Error(S(461)),pt=!1;function gt(t,e,n,l){e.child=t===null?$0(e,null,n,l):_l(e,t.child,n,l)}function Gh(t,e,n,l,a){n=n.render;var i=e.ref;if("ref"in l){var o={};for(var u in l)u!=="ref"&&(o[u]=l[u])}else o=l;return xl(e),l=od(t,e,n,o,i,a),u=ud(),t!==null&&!pt?(rd(t,e,a),mn(t,e,a)):(L&&u&&Sr(e),e.flags|=1,gt(t,e,l,a),e.child)}function Qh(t,e,n,l,a){if(t===null){var i=n.type;return typeof i=="function"&&!Wf(i)&&i.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=i,xy(t,e,i,l,a)):(t=xu(n.type,null,l,e,e.mode,a),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!bd(t,a)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:Bi,n(o,l)&&t.ref===e.ref)return mn(t,e,a)}return e.flags|=1,t=un(i,l),t.ref=e.ref,t.return=e,e.child=t}function xy(t,e,n,l,a){if(t!==null){var i=t.memoizedProps;if(Bi(i,l)&&t.ref===e.ref)if(pt=!1,e.pendingProps=l=i,bd(t,a))(t.flags&131072)!==0&&(pt=!0);else return e.lanes=t.lanes,mn(t,e,a)}return af(t,e,n,l,a)}function Ty(t,e,n,l){var a=l.children,i=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((e.flags&128)!==0){if(i=i!==null?i.baseLanes|n:n,t!==null){for(l=e.child=t.child,a=0;l!==null;)a=a|l.lanes|l.childLanes,l=l.sibling;l=a&~i}else l=0,e.child=null;return Kh(t,e,i,n,l)}if((n&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&_u(e,i!==null?i.cachePool:null),i!==null?Dh(e,i):Wc(),q0(e);else return l=e.lanes=536870912,Kh(t,e,i!==null?i.baseLanes|n:n,n,l)}else i!==null?(_u(e,i.cachePool),Dh(e,i),Xn(),e.memoizedState=null):(t!==null&&_u(e,null),Wc(),Xn());return gt(t,e,a,n),e.child}function Oi(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function Kh(t,e,n,l,a){var i=td();return i=i===null?null:{parent:mt._currentValue,pool:i},e.memoizedState={baseLanes:n,cachePool:i},t!==null&&_u(e,null),Wc(),q0(e),t!==null&&El(t,e,l,!0),e.childLanes=a,null}function Mu(t,e){return e=Nr({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Zh(t,e,n){return _l(e,t.child,null,n),t=Mu(e,e.pendingProps),t.flags|=2,ee(e),e.memoizedState=null,t}function gE(t,e,n){var l=e.pendingProps,a=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(L){if(l.mode==="hidden")return t=Mu(e,l),e.lanes=536870912,t.memoizedState={baseLanes:0,cachePool:null},Oi(null,t);if(Pc(e),(t=P)?(t=Tv(t,we),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:Jn!==null?{id:je,overflow:Xe}:null,retryLane:536870912,hydrationErrors:null},n=C0(t),n.return=e,e.child=n,Et=e,P=null)):t=null,t===null)throw In(e);return e.lanes=536870912,null}return Mu(e,l)}var i=t.memoizedState;if(i!==null){var o=i.dehydrated;if(Pc(e),a)if(e.flags&256)e.flags&=-257,e=Zh(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(S(558));else if(pt||El(t,e,n,!1),a=(n&t.childLanes)!==0,pt||a){if(Wn.current===null){if(l=K,l!==null&&(o=t0(l,n),o!==0&&o!==i.retryLane))throw i.retryLane=o,zl(t,o),Zt(l,t,o),yd;rr()}e=Zh(t,e,n)}else t=i.treeContext,P=Ee(o.nextSibling),Et=e,L=!0,kn=null,we=!1,t!==null&&R0(e,t),e=Mu(e,l),e.flags|=134221824;return e}return t=un(t.child,{mode:l.mode,children:l.children}),t.ref=e.ref,e.child=t,t.return=e,t}function Pl(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(S(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function af(t,e,n,l,a){return xl(e),n=od(t,e,n,l,void 0,a),l=ud(),t!==null&&!pt?(rd(t,e,a),mn(t,e,a)):(L&&l&&Sr(e),e.flags|=1,gt(t,e,n,a),e.child)}function Jh(t,e,n,l,a,i){return xl(e),e.updateQueue=null,n=V0(e,l,n,a),k0(t),l=ud(),t!==null&&!pt?(rd(t,e,i),mn(t,e,i)):(L&&l&&Sr(e),e.flags|=1,gt(t,e,n,i),e.child)}function Ih(t,e,n,l,a){if(xl(e),e.stateNode===null){var i=sa,o=n.contextType;typeof o=="object"&&o!==null&&(i=Nt(o)),i=new n(l,i),e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=nf,e.stateNode=i,i._reactInternals=e,i=e.stateNode,i.props=l,i.state=e.memoizedState,i.refs={},nd(e),o=n.contextType,i.context=typeof o=="object"&&o!==null?Nt(o):sa,i.state=e.memoizedState,o=n.getDerivedStateFromProps,typeof o=="function"&&(dc(e,n,o,l),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(o=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),o!==i.state&&nf.enqueueReplaceState(i,i.state,null),Mi(e,l,i,a),Ai(),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308),l=!0}else if(t===null){i=e.stateNode;var u=e.memoizedProps,s=Al(n,u);i.props=s;var m=i.context,p=n.contextType;o=sa,typeof p=="object"&&p!==null&&(o=Nt(p));var v=n.getDerivedStateFromProps;p=typeof v=="function"||typeof i.getSnapshotBeforeUpdate=="function",u=e.pendingProps!==u,p||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u||m!==o)&&jh(e,i,l,o),Rn=!1;var d=e.memoizedState;i.state=d,Mi(e,l,i,a),Ai(),m=e.memoizedState,u||d!==m||Rn?(typeof v=="function"&&(dc(e,n,v,l),m=e.memoizedState),(s=Rn||Yh(e,n,s,l,d,m,o))?(p||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(e.flags|=4194308)):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=l,e.memoizedState=m),i.props=l,i.state=m,i.context=o,l=s):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),l=!1)}else{i=e.stateNode,Jc(t,e),o=e.memoizedProps,p=Al(n,o),i.props=p,v=e.pendingProps,d=i.context,m=n.contextType,s=sa,typeof m=="object"&&m!==null&&(s=Nt(m)),u=n.getDerivedStateFromProps,(m=typeof u=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(o!==v||d!==s)&&jh(e,i,l,s),Rn=!1,d=e.memoizedState,i.state=d,Mi(e,l,i,a),Ai();var g=e.memoizedState;o!==v||d!==g||Rn||t!==null&&t.dependencies!==null&&Ku(t.dependencies)?(typeof u=="function"&&(dc(e,n,u,l),g=e.memoizedState),(p=Rn||Yh(e,n,p,l,d,g,s)||t!==null&&t.dependencies!==null&&Ku(t.dependencies))?(m||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(l,g,s),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(l,g,s)),typeof i.componentDidUpdate=="function"&&(e.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof i.componentDidUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),e.memoizedProps=l,e.memoizedState=g),i.props=l,i.state=g,i.context=s,l=p):(typeof i.componentDidUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),l=!1)}return i=l,Pl(t,e),l=(e.flags&128)!==0,i||l?(i=e.stateNode,n=l&&typeof n.getDerivedStateFromError!="function"?null:i.render(),e.flags|=1,t!==null&&l?(e.child=_l(e,t.child,null,a),e.child=_l(e,null,n,a)):gt(t,e,n,a),e.memoizedState=i.state,t=e.child):t=mn(t,e,a),t}function Wh(t,e,n,l){return wl(),e.flags|=256,gt(t,e,n,l),e.child}var of={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function uf(t){return{baseLanes:t,cachePool:U0()}}function rf(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=le),t}function _y(t,e,n){var l=e.pendingProps,a=!1,i=(e.flags&128)!==0,o;if((o=i)||(o=t!==null&&t.memoizedState===null?!1:(Mt.current&2)!==0),o&&(a=!0,e.flags&=-129),o=(e.flags&32)!==0,e.flags&=-33,t===null){if(L){if(a?jn(e):Xn(),(t=P)?(t=Tv(t,we),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:Jn!==null?{id:je,overflow:Xe}:null,retryLane:536870912,hydrationErrors:null},n=C0(t),n.return=e,e.child=n,Et=e,P=null)):t=null,t===null)throw In(e);return Rd(t)?e.lanes=32:e.lanes=536870912,null}return i=l.children,l=l.fallback,a?(Xn(),a=e.mode,i=Nr({mode:"hidden",children:i},a),l=yl(l,a,n,null),i.return=e,l.return=e,i.sibling=l,e.child=i,l=e.child,l.memoizedState=uf(n),l.childLanes=rf(t,o,n),e.memoizedState=of,Oi(null,l)):(jn(e),vd(e,i))}var u=t.memoizedState;if(u!==null){var s=u.dehydrated;if(s!==null)return yE(t,e,i,o,l,s,u,n)}return a?(Xn(),a=l.fallback,i=e.mode,u=t.child,s=u.sibling,l=un(u,{mode:"hidden",children:l.children}),l.subtreeFlags=u.subtreeFlags&1206910976,s!==null?a=un(s,a):(a=yl(a,i,n,null),a.flags|=2),a.return=e,l.return=e,l.sibling=a,e.child=l,Oi(null,l),l=e.child,a=t.child.memoizedState,a===null?a=uf(n):(i=a.cachePool,i!==null?(u=mt._currentValue,i=i.parent!==u?{parent:u,pool:u}:i):i=U0(),a={baseLanes:a.baseLanes|n,cachePool:i}),l.memoizedState=a,l.childLanes=rf(t,o,n),e.memoizedState=of,Oi(t.child,l)):(jn(e),n=t.child,t=n.sibling,n=un(n,{mode:"visible",children:l.children}),n.return=e,n.sibling=null,t!==null&&(o=e.deletions,o===null?(e.deletions=[t],e.flags|=16):o.push(t)),e.child=n,e.memoizedState=null,n)}function vd(t,e){return e=Nr({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Nr(t,e){return t=Kt(22,t,null,e),t.lanes=0,t}function su(t,e,n){return _l(e,t.child,null,n),t=vd(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function yE(t,e,n,l,a,i,o,u){if(n)return e.flags&256?(jn(e),e.flags&=-257,su(t,e,u)):e.memoizedState!==null?(Xn(),e.child=t.child,e.flags|=128,null):(Xn(),i=a.fallback,o=e.mode,a=Nr({mode:"visible",children:a.children},o),i=yl(i,o,u,null),i.flags|=2,a.return=e,i.return=e,a.sibling=i,e.child=a,_l(e,t.child,null,u),a=e.child,a.memoizedState=uf(u),a.childLanes=rf(t,l,u),e.memoizedState=of,Oi(null,a));if(jn(e),Rd(i)){if(l=i.nextSibling&&i.nextSibling.dataset,l)var s=l.dgst;return l=s,l!==""&&(a=Error(S(419)),a.stack="",a.digest=l,ki({value:a,source:null,stack:null})),su(t,e,u)}if(pt||El(t,e,u,!1),l=(u&t.childLanes)!==0,pt||l){if(Wn.current!==null)return su(t,e,u);if(l=K,l!==null&&(a=t0(l,u),a!==0&&a!==o.retryLane))throw o.retryLane=a,zl(t,a),Zt(l,t,a),yd;return Uf(i)||rr(),su(t,e,u)}return Uf(i)?(e.flags|=192,e.child=t.child,null):(t=o.treeContext,P=Ee(i.nextSibling),Et=e,L=!0,kn=null,we=!1,t!==null&&R0(e,t),e=vd(e,a.children),e.flags|=134221824,e)}function Ph(t,e,n){t.lanes|=e;var l=t.alternate;l!==null&&(l.lanes|=e),Tu(t.return,e,n)}function Fh(t){for(var e=null;t!==null;){var n=t.alternate;n!==null&&Iu(n)===null&&(e=t),t=t.sibling}return e}function cu(t,e,n,l,a,i){var o=t.memoizedState;o===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:l,tail:n,tailMode:a,treeForkCount:i}:(o.isBackwards=e,o.rendering=null,o.renderingStartTime=0,o.last=l,o.tail=n,o.tailMode=a,o.treeForkCount=i)}function mc(t){var e=t.child;for(t.child=null;e!==null;){var n=e.sibling;e.sibling=t.child,t.child=e,e=n}}function sf(t,e,n){var l=e.pendingProps,a=l.revealOrder,i=l.tail;l=l.children;var o=Mt.current;if(e.flags&128)return Yi(e,o),null;var u=(o&2)!==0;if(u?(o=o&1|2,e.flags|=128):o&=1,Yi(e,o),a==="backwards"&&t!==null?(mc(t),gt(t,e,l,n),mc(t)):gt(t,e,l,n),l=L?qi:0,!u&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Ph(t,n,e);else if(t.tag===19)Ph(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(a){case"backwards":n=Fh(e.child),n===null?(a=e.child,e.child=null):(a=n.sibling,n.sibling=null,mc(e)),cu(e,!0,a,null,i,l);break;case"unstable_legacy-backwards":for(n=null,a=e.child,e.child=null;a!==null;){if(t=a.alternate,t!==null&&Iu(t)===null){e.child=a;break}t=a.sibling,a.sibling=n,n=a,a=t}cu(e,!0,n,null,i,l);break;case"together":cu(e,!1,null,null,void 0,l);break;case"independent":e.memoizedState=null;break;default:n=Fh(e.child),n===null?(a=e.child,e.child=null):(a=n.sibling,n.sibling=null),cu(e,!1,a,n,i,l)}return e.child}function tg(t,e,n){var l=e.pendingProps;return Dn(e,e.type,l.value),gt(t,e,l.children,n),e.child}function mn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Fn|=e.lanes,(n&e.childLanes)===0)if(t!==null){if(El(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(S(153));if(e.child!==null){for(t=e.child,n=un(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=un(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function bd(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&Ku(t)))}function vE(t,e,n){switch(e.tag){case 3:qu(e,e.stateNode.containerInfo),Dn(e,mt,t.memoizedState.cache),wl();break;case 27:case 5:Dc(e);break;case 4:qu(e,e.stateNode.containerInfo);break;case 10:Dn(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,Pc(e),null;break;case 13:var l=e.memoizedState;if(l!==null){if(l.dehydrated!==null)return jn(e),e.flags|=128,null;l=El(t,e,n,!1);var a=e.child.childLanes;return l||(n&a)!==0?_y(t,e,n):(jn(e),t=mn(t,e,n),t!==null?t.sibling:null)}jn(e);break;case 19:if(e.flags&128)return sf(t,e,n);if(a=(t.flags&128)!==0,l=(n&e.childLanes)!==0,l||(El(t,e,n,!1),l=(n&e.childLanes)!==0),a){if(l)return sf(t,e,n);e.flags|=128}if(a=e.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),Yi(e,Mt.current),l)break;return null;case 22:return e.lanes=0,Ty(t,e,n,e.pendingProps);case 24:Dn(e,mt,t.memoizedState.cache)}return mn(t,e,n)}function Ny(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)pt=!0;else{if(!bd(t,n)&&(e.flags&128)===0)return pt=!1,vE(t,e,n);pt=(t.flags&131072)!==0}else pt=!1,L&&(e.flags&1048576)!==0&&O0(e,qi,e.index);switch(e.lanes=0,e.tag){case 16:t:{var l=e.pendingProps;if(t=dl(e.elementType),e.type=t,typeof t=="function")Wf(t)?(l=Al(t,l),e.tag=1,e=Ih(null,e,t,l,n)):(e.tag=0,e=af(null,e,t,l,n));else{if(t!=null){var a=t.$$typeof;if(a===Bf){e.tag=11,e=Gh(null,e,t,l,n);break t}else if(a===qf){e.tag=14,e=Qh(null,e,t,l,n);break t}else if(a===Ve){e.tag=10,e.type=t,e=tg(null,e,n);break t}}throw e=Uc(t)||t,Error(S(306,e,""))}}return e;case 0:return af(t,e,e.type,e.pendingProps,n);case 1:return l=e.type,a=Al(l,e.pendingProps),Ih(t,e,l,a,n);case 3:t:{if(qu(e,e.stateNode.containerInfo),t===null)throw Error(S(387));l=e.pendingProps;var i=e.memoizedState;a=i.element,Jc(t,e),Mi(e,l,null,n);var o=e.memoizedState;if(l=o.cache,Dn(e,mt,l),l!==i.cache&&Kc(e,[mt],n,!0),Ai(),l=o.element,i.isDehydrated)if(i={element:l,isDehydrated:!1,cache:o.cache},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){e=Wh(t,e,l,n);break t}else if(l!==a){a=Se(Error(S(424)),e),ki(a),e=Wh(t,e,l,n);break t}else for(t=e.stateNode.containerInfo,t.nodeType===9?t=t.body:t=t.nodeName==="HTML"?t.ownerDocument.body:t,P=Ee(t.firstChild),Et=e,L=!0,kn=null,we=!0,n=$0(e,null,l,n),e.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling;else{if(wl(),l===a){e=mn(t,e,n);break t}gt(t,e,l,n)}e=e.child}return e;case 26:return Pl(t,e),t===null?(n=Ag(e.type,null,e.pendingProps,null))?e.memoizedState=n:L||(e.stateNode=hv(e.type,e.pendingProps,qn.current,e)):e.memoizedState=Ag(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return Dc(e),t===null&&L&&(l=e.stateNode=_v(e.type,e.pendingProps,qn.current),Et=e,we=!0,a=P,el(e.type)?(Lf=a,P=Ee(l.firstChild)):P=a),gt(t,e,e.pendingProps.children,n),Pl(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&L&&((a=l=P)&&(l=cx(l,e.type,e.pendingProps,we),l!==null?(e.stateNode=l,Et=e,P=Ee(l.firstChild),we=!1,a=!0):a=!1),a||In(e)),Dc(e),a=e.type,i=e.pendingProps,o=t!==null?t.memoizedProps:null,l=i.children,Of(a,i)?l=null:o!==null&&Of(a,o)&&(e.flags|=32),e.memoizedState!==null&&(a=od(t,e,uE,null,null,n),Ua._currentValue=a),Pl(t,e),gt(t,e,l,n),e.child;case 6:return t===null&&L&&((t=n=P)&&(n=fx(n,e.pendingProps,we),n!==null?(e.stateNode=n,Et=e,P=null,t=!0):t=!1),t||In(e)),null;case 13:return _y(t,e,n);case 4:return qu(e,e.stateNode.containerInfo),l=e.pendingProps,t===null?e.child=_l(e,null,l,n):gt(t,e,l,n),e.child;case 11:return Gh(t,e,e.type,e.pendingProps,n);case 7:return l=e.pendingProps,Pl(t,e),gt(t,e,l,n),e.child;case 8:return gt(t,e,e.pendingProps.children,n),e.child;case 12:return gt(t,e,e.pendingProps.children,n),e.child;case 10:return tg(t,e,n);case 9:return a=e.type._context,l=e.pendingProps.children,xl(e),a=Nt(a),l=l(a),e.flags|=1,gt(t,e,l,n),e.child;case 14:return Qh(t,e,e.type,e.pendingProps,n);case 15:return xy(t,e,e.type,e.pendingProps,n);case 19:return sf(t,e,n);case 31:return gE(t,e,n);case 22:return Ty(t,e,n,e.pendingProps);case 24:return xl(e),l=Nt(mt),t===null?(a=td(),a===null&&(a=K,i=Ff(),a.pooledCache=i,i.refCount++,i!==null&&(a.pooledCacheLanes|=n),a=i),e.memoizedState={parent:l,cache:a},nd(e),Dn(e,mt,a)):((t.lanes&n)!==0&&(Jc(t,e),Mi(e,null,null,n),Ai()),a=t.memoizedState,i=e.memoizedState,a.parent!==l?(a={parent:l,cache:l},e.memoizedState=a,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=a),Dn(e,mt,l)):(l=i.cache,Dn(e,mt,l),l!==a.cache&&Kc(e,[mt],n,!0))),gt(t,e,e.pendingProps.children,n),e.child;case 30:return e.stateNode===null&&(e.stateNode={autoName:null,paired:null,clones:null,ref:null}),l=e.pendingProps,l.name!=null&&l.name!=="auto"?e.flags|=t===null?18882560:18874368:L&&Sr(e),t!==null&&t.memoizedProps.name!==l.name?e.flags|=4194816:Pl(t,e),gt(t,e,l.children,n),e.child;case 29:throw e.pendingProps}throw Error(S(156,e.tag))}function ln(t){t.flags|=4}function pc(t,e,n,l,a){var i;if((i=(t.mode&32)!==0)&&(i=n===null?Og(e,l):Og(e,l)&&(l.src!==n.src||l.srcSet!==n.srcSet)),i){if(t.flags|=16777216,(a&335544128)===a)if(t.stateNode.complete)t.flags|=8192;else if(ev())t.flags|=8192;else throw bl=Zu,ed}else t.flags&=-16777217}function eg(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Cv(e))if(ev())t.flags|=8192;else throw bl=Zu,ed}function fu(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?Wg():536870912,t.lanes|=e,Aa|=e)}function mi(t,e){if(!L)switch(t.tailMode){case"visible":break;case"collapsed":for(var n=t.tail,l=null;n!==null;)n.alternate!==null&&(l=n),n=n.sibling;l===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:l.sibling=null;break;default:for(e=t.tail,n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null}}function W(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,l=0;if(e)for(var a=t.child;a!==null;)n|=a.lanes|a.childLanes,l|=a.subtreeFlags&1206910976,l|=a.flags&1206910976,a.return=t,a=a.sibling;else for(a=t.child;a!==null;)n|=a.lanes|a.childLanes,l|=a.subtreeFlags,l|=a.flags,a.return=t,a=a.sibling;return t.subtreeFlags|=l,t.childLanes=n,e}function bE(t,e,n){var l=e.pendingProps;switch(Pf(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return W(e),null;case 1:return W(e),null;case 3:return n=e.stateNode,l=null,t!==null&&(l=t.memoizedState.cache),e.memoizedState.cache!==l&&(e.flags|=2048),rn(mt),xa(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(Il(e)?ln(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,sc())),W(e),null;case 26:var a=e.type,i=e.memoizedState;return t===null?(ln(e),i!==null?(W(e),eg(e,i)):(W(e),pc(e,a,null,l,n))):i?i!==t.memoizedState?(ln(e),W(e),eg(e,i)):(W(e),e.flags&=-16777217):(t=t.memoizedProps,t!==l&&ln(e),W(e),pc(e,a,t,l,n)),null;case 27:if(ku(e),n=qn.current,a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==l&&ln(e);else{if(!l){if(e.stateNode===null)throw Error(S(166));return W(e),e.subtreeFlags&=-33554433,null}t=Ge.current,Il(e)?Mh(e,t):(t=_v(a,l,n),e.stateNode=t,ln(e))}return W(e),e.subtreeFlags&=-33554433,null;case 5:if(ku(e),a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==l&&ln(e);else{if(!l){if(e.stateNode===null)throw Error(S(166));return W(e),e.subtreeFlags&=-33554433,null}if(i=Ge.current,Il(e))Mh(e,i);else{var o=Qi(qn.current);switch(i){case 1:i=o.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:i=o.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":i=o.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":i=o.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":i=o.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof l.is=="string"?o.createElement("select",{is:l.is}):o.createElement("select"),l.multiple?i.multiple=!0:l.size&&(i.size=l.size);break;default:i=typeof l.is=="string"?o.createElement(a,{is:l.is}):o.createElement(a)}}i[_t]=e,i[It]=l;t:for(o=e.child;o!==null;){if(o.tag===5||o.tag===6)i.appendChild(o.stateNode);else if(o.tag!==4&&o.tag!==27&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===e)break t;for(;o.sibling===null;){if(o.return===null||o.return===e)break t;o=o.return}o.sibling.return=o.return,o=o.sibling}e.stateNode=i;t:switch(Ct(i,a,l),a){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break t;case"img":l=!0;break t;default:l=!1}l&&ln(e)}}return W(e),e.subtreeFlags&=-33554433,pc(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==l&&ln(e);else{if(typeof l!="string"&&e.stateNode===null)throw Error(S(166));if(t=qn.current,Il(e)){if(t=e.stateNode,n=e.memoizedProps,l=null,a=Et,a!==null)switch(a.tag){case 27:case 5:l=a.memoizedProps}t[_t]=e,t=!!(t.nodeValue===n||l!==null&&l.suppressHydrationWarning===!0||mv(t.nodeValue,n)),t||In(e,!0)}else t=Qi(t).createTextNode(l),t[_t]=e,e.stateNode=t}return W(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(l=Il(e),n!==null){if(t===null){if(!l)throw Error(S(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(S(557));t[_t]=e}else wl(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;W(e),t=!1}else n=sc(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(ee(e),e):(ee(e),null);if((e.flags&128)!==0)throw Error(S(558))}return W(e),null;case 13:if(l=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(a=Il(e),l!==null&&l.dehydrated!==null){if(t===null){if(!a)throw Error(S(318));if(a=e.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(S(317));a[_t]=e}else wl(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;W(e),a=!1}else a=sc(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),a=!0;if(!a)return e.flags&256?(ee(e),e):(ee(e),null)}return ee(e),(e.flags&128)!==0?(e.lanes=n,e):(n=l!==null,t=t!==null&&t.memoizedState!==null,n&&(l=e.child,a=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(a=l.alternate.memoizedState.cachePool.pool),i=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(i=l.memoizedState.cachePool.pool),i!==a&&(l.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),fu(e,e.updateQueue),W(e),null);case 4:return xa(),t===null&&Md(e.stateNode.containerInfo),e.flags|=67108864,W(e),null;case 10:return rn(e.type),W(e),null;case 19:if(ad(e),l=e.memoizedState,l===null)return W(e),null;if(a=(e.flags&128)!==0,i=l.rendering,i===null)if(a)mi(l,!1);else{if(ot!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(i=Iu(t),i!==null){for(e.flags|=128,mi(l,!1),t=i.updateQueue,e.updateQueue=t,fu(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)M0(n,t),n=n.sibling;return Yi(e,Mt.current&1|2),L&&an(e,l.treeForkCount),e.child}t=t.sibling}l.tail!==null&&ae()>or&&(e.flags|=128,a=!0,mi(l,!1),e.lanes=4194304)}else{if(!a)if(t=Iu(i),t!==null){if(e.flags|=128,a=!0,t=t.updateQueue,e.updateQueue=t,fu(e,t),mi(l,!0),l.tail===null&&l.tailMode!=="collapsed"&&l.tailMode!=="visible"&&!i.alternate&&!L)return W(e),null}else 2*ae()-l.renderingStartTime>or&&n!==536870912&&(e.flags|=128,a=!0,mi(l,!1),e.lanes=4194304);l.isBackwards?(i.sibling=e.child,e.child=i):(t=l.last,t!==null?t.sibling=i:e.child=i,l.last=i)}if(l.tail!==null){t=l.tail;t:{for(n=t;n!==null;){if(n.alternate!==null){n=!1;break t}n=n.sibling}n=!0}return l.rendering=t,l.tail=t.sibling,l.renderingStartTime=ae(),t.sibling=null,i=Mt.current,i=a?i&1|2:i&1,l.tailMode==="visible"||l.tailMode==="collapsed"||!n||L?Yi(e,i):(n=i,F(Ot,e),F(Mt,n),Ht===null&&(Ht=e)),L&&an(e,l.treeForkCount),t}return W(e),null;case 22:case 23:return ee(e),ld(),l=e.memoizedState!==null,t!==null?t.memoizedState!==null!==l&&(e.flags|=8192):l&&(e.flags|=8192),l?(n&536870912)!==0&&(e.flags&128)===0&&(W(e),e.subtreeFlags&6&&(e.flags|=8192)):W(e),n=e.updateQueue,n!==null&&fu(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),l=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(l=e.memoizedState.cachePool.pool),l!==n&&(e.flags|=2048),t!==null&&At(vl),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),rn(mt),W(e),null;case 25:return null;case 30:return e.flags|=33554432,W(e),null}throw Error(S(156,e.tag))}function SE(t,e){switch(Pf(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return rn(mt),xa(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return ku(e),null;case 31:if(e.memoizedState!==null){if(ee(e),e.alternate===null)throw Error(S(340));wl()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(ee(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(S(340));wl()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return ad(e),t=e.flags,t&65536?(e.flags=t&-65537|128,t=e.memoizedState,t!==null&&(t.rendering=null,t.tail=null),e.flags|=4,e):null;case 4:return xa(),null;case 10:return rn(e.type),null;case 22:case 23:return ee(e),ld(),t!==null&&At(vl),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return rn(mt),null;case 25:return null;default:return null}}function Ay(t,e){switch(Pf(e),e.tag){case 3:rn(mt),xa();break;case 26:case 27:case 5:ku(e);break;case 4:xa();break;case 31:e.memoizedState!==null&&ee(e);break;case 13:ee(e);break;case 19:ad(e);break;case 10:rn(e.type);break;case 22:case 23:ee(e),ld(),t!==null&&At(vl);break;case 24:rn(mt)}}function io(t,e){try{var n=e.updateQueue,l=n!==null?n.lastEffect:null;if(l!==null){var a=l.next;n=a;do{if((n.tag&t)===t){l=void 0;var i=n.create,o=n.inst;l=i(),o.destroy=l}n=n.next}while(n!==a)}}catch(u){G(e,e.return,u)}}function Pn(t,e,n){try{var l=e.updateQueue,a=l!==null?l.lastEffect:null;if(a!==null){var i=a.next;l=i;do{if((l.tag&t)===t){var o=l.inst,u=o.destroy;if(u!==void 0){o.destroy=void 0,a=e;var s=n,m=u;try{m()}catch(p){G(a,s,p)}}}l=l.next}while(l!==i)}}catch(p){G(e,e.return,p)}}function My(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{B0(e,n)}catch(l){G(t,t.return,l)}}}function Cy(t,e,n){n.props=Al(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(l){G(t,e,l)}}function qe(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var l=t.stateNode;break;case 30:var a=t.stateNode,i=cn(t.memoizedProps,a);(a.ref===null||a.ref.name!==i)&&(a.ref=bv(i)),l=a.ref;break;case 7:if(t.stateNode===null){var o=new se(t);Jt(t.child,!1,rx,o,void 0,void 0),t.stateNode=o}l=t.stateNode;break;default:l=t.stateNode}typeof n=="function"?t.refCleanup=n(l):n.current=l}}catch(u){G(t,e,u)}}function Tt(t,e){var n=t.ref,l=t.refCleanup;if(n!==null)if(typeof l=="function")try{l()}catch(a){G(t,e,a)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){G(t,e,a)}else n.current=null}function er(t,e){if((t.tag===5||t.tag===27||t.tag===6)&&t.alternate===null&&e!==null)for(var n=0;n<e.length;n++)xv(t.stateNode,e[n])}function ng(t){for(var e=t.return;e!==null&&(wd(e)&&xv(t.stateNode,e.stateNode),!Sd(e));)e=e.return}function Ri(t){for(var e=t.return;e!==null&&(wd(e)&&sx(t.stateNode,e.stateNode),!Sd(e));)e=e.return}function Sd(t){return t.tag===5||t.tag===3||t.tag===27}function wd(t){return t&&t.tag===7&&t.stateNode!==null}function cf(t){var e=t.type,n=t.memoizedProps,l=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&l.focus();break t;case"img":n.src?l.src=n.src:n.srcSet&&(l.srcset=n.srcSet)}}catch(a){G(t,t.return,a)}}function hc(t,e,n){try{var l=t.stateNode;XE(l,t.type,n,e),l[It]=e}catch(a){G(t,t.return,a)}}function Oy(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&el(t.type)||t.tag===4}function gc(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||Oy(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&el(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function ff(t,e,n,l){var a=t.tag;if(a===5||a===6)a=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(a,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(a),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Ye)),er(t,l),q=!0;else if(a!==4&&(a===27&&(er(t,l),l=null,el(t.type)&&(n=t.stateNode,e=null)),t=t.child,t!==null))for(ff(t,e,n,l),t=t.sibling;t!==null;)ff(t,e,n,l),t=t.sibling}function nr(t,e,n,l){var a=t.tag;if(a===5||a===6)a=t.stateNode,e?n.insertBefore(a,e):n.appendChild(a),er(t,l),q=!0;else if(a!==4&&(a===27&&(er(t,l),l=null,el(t.type)&&(n=t.stateNode)),t=t.child,t!==null))for(nr(t,e,n,l),t=t.sibling;t!==null;)nr(t,e,n,l),t=t.sibling}function Ry(t){var e=t.stateNode,n=t.memoizedProps;try{for(var l=t.type,a=e.attributes;a.length;)e.removeAttributeNode(a[0]);Ct(e,l,n),e[_t]=t,e[It]=n}catch(i){G(t,t.return,i)}}var lr=!1,ne=null;function lg(t){(t.tag===30||(t.subtreeFlags&33554432)!==0)&&(lr=!0)}var ke=null;function ag(){var t=ke;return ke=null,t}var Qt=0;function qa(t,e,n,l,a){return Qt=0,zy(t.child,e,n,l,a)}function zy(t,e,n,l,a){for(var i=!1;t!==null;){if(t.tag===5){var o=t.stateNode;if(l!==null){var u=Rf(o);l.push(u),u.view&&(i=!0)}else i||Rf(o).view&&(i=!0);lr=!0,gv(o,Qt===0?e:e+"_"+Qt,n),Qt++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&a||zy(t.child,e,n,l,a)&&(i=!0));t=t.sibling}return i}function Ke(t,e){for(;t!==null;)t.tag===5?yv(t.stateNode,t.memoizedProps):(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&e||Ke(t.child,e)),t=t.sibling}function Cu(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if((t.tag!==22||t.memoizedState===null)&&(Cu(t),t.tag===30&&(t.flags&18874368)!==0&&t.stateNode.paired)){var e=t.memoizedProps;if(e.name==null||e.name==="auto")throw Error(S(544));var n=e.name;e=gn(e.default,e.share),e!=="none"&&(qa(t,n,e,null,!1)||Ke(t.child,!1))}t=t.sibling}}function df(t,e){if(t.tag===30){var n=t.stateNode,l=t.memoizedProps,a=cn(l,n),i=gn(l.default,n.paired?l.share:l.enter);i!=="none"?qa(t,a,i,null,!1)?(Cu(t),n.paired||e||Ma(t,l.onEnter)):Ke(t.child,!1):Cu(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)df(t,e),t=t.sibling;else Cu(t)}function mf(t){if(ne!==null&&ne.size!==0){var e=ne;if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var n=t.memoizedProps,l=n.name;if(l!=null&&l!=="auto"){var a=e.get(l);if(a!==void 0){var i=gn(n.default,n.share);if(i!=="none"&&(qa(t,l,i,null,!1)?(i=t.stateNode,a.paired=i,i.paired=a,Ma(t,n.onShare)):Ke(t.child,!1)),e.delete(l),e.size===0)break}}}mf(t)}t=t.sibling}}}function pf(t){if(t.tag===30){var e=t.memoizedProps,n=cn(e,t.stateNode),l=ne!==null?ne.get(n):void 0,a=gn(e.default,l!==void 0?e.share:e.exit);a!=="none"&&(qa(t,n,a,null,!1)?l!==void 0?(a=t.stateNode,l.paired=a,a.paired=l,ne.delete(n),Ma(t,e.onShare)):Ma(t,e.onExit):Ke(t.child,!1)),ne!==null&&mf(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)pf(t),t=t.sibling;else ne!==null&&mf(t)}function Uy(t){for(t=t.child;t!==null;){if(t.tag===30){var e=t.memoizedProps,n=cn(e,t.stateNode);e=gn(e.default,e.update),t.flags&=-5,e!=="none"&&qa(t,n,e,t.memoizedState=[],!1)}else(t.subtreeFlags&33554432)!==0&&Uy(t);t=t.sibling}}function hf(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var e=t.stateNode;e.paired!==null&&(e.paired=null,Ke(t.child,!1))}hf(t)}t=t.sibling}}function Ou(t){if(t.tag===30)t.stateNode.paired=null,Ke(t.child,!1),hf(t);else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)Ou(t),t=t.sibling;else hf(t)}function Ly(t){for(t=t.child;t!==null;)t.tag===30?Ke(t.child,!1):(t.subtreeFlags&33554432)!==0&&Ly(t),t=t.sibling}function Ed(t,e,n,l,a,i,o){for(var u=!1;e!==null;){if(e.tag===5){var s=e.stateNode;if(i!==null&&Qt<i.length){var m=i[Qt],p=Rf(s);(m.view||p.view)&&(u=!0);var v;if(v=(t.flags&4)===0)if(p.clip)v=!0;else{v=m.rect;var d=p.rect;v=v.y!==d.y||v.x!==d.x||v.height!==d.height||v.width!==d.width}v&&(t.flags|=4),p.abs?p=!m.abs:(m=m.rect,p=p.rect,p=m.height!==p.height||m.width!==p.width),p&&(t.flags|=32)}else t.flags|=32;(t.flags&4)!==0&&gv(s,Qt===0?n:n+"_"+Qt,a),u&&(t.flags&4)!==0||(ke===null&&(ke=[]),ke.push(s,Qt===0?l:l+"_"+Qt,e.memoizedProps)),Qt++}else(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&o?t.flags|=e.flags&32:Ed(t,e.child,n,l,a,i,o)&&(u=!0));e=e.sibling}return u}function Dy(t,e){for(t=t.child;t!==null;){if(t.tag===30){var n=t.memoizedProps,l=t.stateNode,a=cn(n,l),i=gn(n.default,n.update);if(e){l=l.clones;var o=l===null?null:l.map(IE)}else o=t.memoizedState,t.memoizedState=null;l=t;var u=t.child;Qt=0,a=Ed(l,u,a,a,i,o,!1),(t.flags&4)!==0&&a&&(e||Ma(t,n.onUpdate))}else(t.subtreeFlags&33554432)!==0&&Dy(t,e);t=t.sibling}}var bt=!1,Y=!1,$e=!1,yc=!1,ig=typeof WeakSet=="function"?WeakSet:Set,St=null,He=!1,wi=!1,ar=!1,gf=!1;function wE(t,e,n){if(t=t.containerInfo,Mf=La,t=S0(t),Zf(t)){if("selectionStart"in t)var l={start:t.selectionStart,end:t.selectionEnd};else t:{l=(l=t.ownerDocument)&&l.defaultView||window;var a=l.getSelection&&l.getSelection();if(a&&a.rangeCount!==0){l=a.anchorNode;var i=a.anchorOffset,o=a.focusNode;a=a.focusOffset;try{l.nodeType,o.nodeType}catch{l=null;break t}var u=0,s=-1,m=-1,p=0,v=0,d=t,g=null;e:for(;;){for(var E;d!==l||i!==0&&d.nodeType!==3||(s=u+i),d!==o||a!==0&&d.nodeType!==3||(m=u+a),d.nodeType===3&&(u+=d.nodeValue.length),(E=d.firstChild)!==null;)g=d,d=E;for(;;){if(d===t)break e;if(g===l&&++p===i&&(s=u),g===o&&++v===a&&(m=u),(E=d.nextSibling)!==null)break;d=g,g=d.parentNode}d=E}l=s===-1||m===-1?null:{start:s,end:m}}else l=null}l=l||{start:0,end:0}}else l=null;for(Cf={focusedElem:t,selectionRange:l},La=!1,n=(n&335544064)===n,St=e,e=n?9270:1024;St!==null;){if(t=St,n&&(l=t.deletions,l!==null))for(i=0;i<l.length;i++)n&&pf(l[i]);if(t.alternate===null&&(t.flags&2)!==0)n&&lg(t),du(n);else{if(t.tag===22){if(l=t.alternate,t.memoizedState!==null){l!==null&&l.memoizedState===null&&n&&pf(l),du(n);continue}else if(l!==null&&l.memoizedState!==null){n&&lg(t),du(n);continue}}l=t.child,(t.subtreeFlags&e)!==0&&l!==null?(l.return=t,St=l):(n&&Uy(t),du(n))}}ne=null}function du(t){for(;St!==null;){var e=St,n=t,l=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 15:break;case 1:if((a&1024)!==0&&l!==null){n=void 0,a=l.memoizedProps,l=l.memoizedState;var i=e.stateNode;try{var o=Al(e.type,a);n=i.getSnapshotBeforeUpdate(o,l),i.__reactInternalSnapshotBeforeUpdate=n}catch(u){G(e,e.return,u)}}break;case 3:if((a&1024)!==0){if(l=e.stateNode.containerInfo,n=l.nodeType,n===9)zf(l);else if(n===1)switch(l.nodeName){case"HEAD":case"HTML":case"BODY":zf(l);break;default:l.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&l!==null&&(n=cn(l.memoizedProps,l.stateNode),a=e.memoizedProps,a=gn(a.default,a.update),a!=="none"&&qa(l,n,a,l.memoizedState=[],!0));break;default:if((a&1024)!==0)throw Error(S(163))}if(l=e.sibling,l!==null){l.return=e.return,St=l;break}St=e.return}}function $y(t,e,n){var l=n.flags;switch(n.tag){case 0:case 11:case 15:Be(t,n),l&4&&io(5,n);break;case 1:if(Be(t,n),l&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(o){G(n,n.return,o)}else{var a=Al(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(a,e,t.__reactInternalSnapshotBeforeUpdate)}catch(o){G(n,n.return,o)}}l&64&&My(n),l&512&&qe(n,n.return);break;case 3:if(Be(t,n),l&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{B0(t,e)}catch(o){G(n,n.return,o)}}break;case 27:e===null&&l&4&&Ry(n);case 26:case 5:Be(t,n),e===null&&l&4&&cf(n),l&512&&qe(n,n.return);break;case 12:Be(t,n);break;case 31:Be(t,n),l&4&&ky(t,n);break;case 13:Be(t,n),l&4&&Vy(t,n),l&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=UE.bind(null,n),dx(t,n))));break;case 22:if(l=n.memoizedState!==null||bt,!l){var i=e!==null&&e.memoizedState!==null||Y;e=bt,a=Y,bt=l,(Y=i)&&!a?(l=2,(n.subtreeFlags&8772)!==0&&(l|=1),Ne(t,n,l)):Be(t,n),bt=e,Y=a}break;case 30:Be(t,n),l&512&&qe(n,n.return);break;case 7:l&512&&qe(n,n.return);default:Be(t,n)}}function yf(t,e){for(t=t.child;t!==null;)Hy(t,e),t=t.sibling}function Hy(t,e){switch(t.tag){case 5:case 26:try{var n=t.stateNode;if(e){var l=n.style;typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"}else{var a=t.stateNode,i=t.memoizedProps.style,o=i!=null&&i.hasOwnProperty("display")?i.display:null;a.style.display=o==null||typeof o=="boolean"?"":(""+o).trim()}}catch(s){G(t,t.return,s)}vf(t,e);break;case 6:try{t.stateNode.nodeValue=e?"":t.memoizedProps,q=!0}catch(s){G(t,t.return,s)}break;case 18:try{var u=t.stateNode;e?wg(u,!0):wg(t.stateNode,!1)}catch(s){G(t,t.return,s)}break;case 22:case 23:t.memoizedState===null&&yf(t,e);break;default:yf(t,e)}}function vf(t,e){if(t.subtreeFlags&67108864)for(t=t.child;t!==null;){t:{var n=t,l=e;switch(n.tag){case 4:Hy(n,l);break t;case 22:n.memoizedState===null&&vf(n,l);break t;default:vf(n,l)}}t=t.sibling}}function By(t){var e=t.alternate;e!==null&&(t.alternate=null,By(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&pr(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var nt=null,Xt=!1;function _e(t,e,n){for(n=n.child;n!==null;)qy(t,e,n),n=n.sibling}function qy(t,e,n){if(ie&&typeof ie.onCommitFiberUnmount=="function")try{ie.onCommitFiberUnmount(Pi,n)}catch{}switch(n.tag){case 26:Y||Tt(n,e),_e(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!Y&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Y||Tt(n,e),Ri(n);var l=nt,a=Xt;el(n.type)&&(nt=n.stateNode,Xt=!1),_e(t,e,n),Nv(n.stateNode,n.type,n.memoizedProps),nt=l,Xt=a;break;case 5:Y||Tt(n,e),Ri(n);case 6:if(n.tag===6&&Ri(n),l=nt,a=Xt,nt=null,_e(t,e,n),nt=l,Xt=a,nt!==null)if(Xt)try{(nt.nodeType===9?nt.body:nt.nodeName==="HTML"?nt.ownerDocument.body:nt).removeChild(n.stateNode),q=!0}catch(i){G(n,e,i)}else try{nt.removeChild(n.stateNode),q=!0}catch(i){G(n,e,i)}break;case 18:nt!==null&&(Xt?(t=nt,Sg(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),Da(t)):Sg(nt,n.stateNode));break;case 4:l=nt,a=Xt,nt=n.stateNode.containerInfo,Xt=!0,_e(t,e,n),nt=l,Xt=a;break;case 0:case 11:case 14:case 15:Pn(2,n,e),Y||Pn(4,n,e),_e(t,e,n);break;case 1:Y||(Tt(n,e),l=n.stateNode,typeof l.componentWillUnmount=="function"&&Cy(n,e,l)),_e(t,e,n);break;case 21:_e(t,e,n);break;case 22:Y=(l=Y)||n.memoizedState!==null,_e(t,e,n),Y=l;break;case 30:Tt(n,e),_e(t,e,n);break;case 7:Y||Tt(n,e),_e(t,e,n);break;default:_e(t,e,n)}}function ky(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Da(t)}catch(n){G(e,e.return,n)}}}function Vy(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Da(t)}catch(n){G(e,e.return,n)}}function EE(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new ig),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new ig),e;default:throw Error(S(435,t.tag))}}function mu(t,e){var n=EE(t);e.forEach(function(l){if(!n.has(l)){n.add(l);var a=LE.bind(null,t,l);l.then(a,a)}})}function kt(t,e,n){var l=e.deletions;if(l!==null)for(var a=0;a<l.length;a++){var i=l[a],o=t,u=e,s=u;t:for(;s!==null;){switch(s.tag){case 27:if(el(s.type)){nt=s.stateNode,Xt=!1;break t}break;case 5:nt=s.stateNode,Xt=!1;break t;case 3:case 4:nt=s.stateNode.containerInfo,Xt=!0;break t}s=s.return}if(nt===null)throw Error(S(160));qy(o,u,i),nt=null,Xt=!1,o=i.alternate,o!==null&&(o.return=null),i.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)Yy(e,t,n),e=e.sibling}var Ae=null;function Yy(t,e,n){var l=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(a&4&&(l=t.updateQueue,l=l!==null?l.events:null,l!==null))for(var i=0;i<l.length;i++){var o=l[i];o.ref.impl=o.nextImpl}kt(e,t,n),Vt(t),a&4&&(Pn(3,t,t.return),io(3,t),Pn(5,t,t.return));break;case 1:kt(e,t,n),Vt(t),a&512&&(Y||l===null||Tt(l,l.return)),a&64&&bt&&(t=t.updateQueue,t!==null&&(e=t.callbacks,e!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?e:n.concat(e))));break;case 26:if(i=Ae,kt(e,t,n),Vt(t),a&512&&(Y||l===null||Tt(l,l.return)),a&4)if(a=l!==null?l.memoizedState:null,n=t.memoizedState,l===null)if(n===null)if(t.stateNode===null)if(bt)t.stateNode=hv(t.type,t.memoizedProps,e.containerInfo,t);else{t:{e=t.type,n=t.memoizedProps,a=i.ownerDocument||i;e:switch(e){case"title":l=a.getElementsByTagName("title")[0],(!l||l[eo]||l[_t]||l.namespaceURI==="http://www.w3.org/2000/svg"||l.hasAttribute("itemprop"))&&(l=a.createElement(e),a.head.insertBefore(l,a.querySelector("head > title"))),Ct(l,e,n),l[_t]=t,wt(l),e=l;break t;case"link":if(i=Cg("link","href",a).get(e+(n.href||""))){for(o=0;o<i.length;o++)if(l=i[o],l.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&l.getAttribute("rel")===(n.rel==null?null:n.rel)&&l.getAttribute("title")===(n.title==null?null:n.title)&&l.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){i.splice(o,1);break e}}l=a.createElement(e),Ct(l,e,n),a.head.appendChild(l);break;case"meta":if(i=Cg("meta","content",a).get(e+(n.content||""))){for(o=0;o<i.length;o++)if(l=i[o],l.getAttribute("content")===(n.content==null?null:""+n.content)&&l.getAttribute("name")===(n.name==null?null:n.name)&&l.getAttribute("property")===(n.property==null?null:n.property)&&l.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&l.getAttribute("charset")===(n.charSet==null?null:n.charSet)){i.splice(o,1);break e}}l=a.createElement(e),Ct(l,e,n),a.head.appendChild(l);break;default:throw Error(S(468,e))}l[_t]=t,wt(l),e=l}t.stateNode=e}else bt||Df(i,t.type,t.stateNode);else t.stateNode=Mg(i,n,t.memoizedProps);else a!==n?(a===null?(e=l.stateNode,e===null||Y||e.parentNode.removeChild(e)):a.count--,n===null?bt||Df(i,t.type,t.stateNode):Mg(i,n,t.memoizedProps)):n===null&&t.stateNode!==null&&hc(t,t.memoizedProps,l.memoizedProps);break;case 27:kt(e,t,n),Vt(t),a&512&&(Y||l===null||Tt(l,l.return)),l!==null&&a&4&&hc(t,t.memoizedProps,l.memoizedProps);break;case 5:if(i=$e,$e=!1,kt(e,t,n),$e=i,Vt(t),a&512&&(Y||l===null||Tt(l,l.return)),t.flags&32){e=t.stateNode;try{_a(e,""),q=!0}catch(p){G(t,t.return,p)}}a&4&&t.stateNode!=null&&(e=t.memoizedProps,hc(t,e,l!==null?l.memoizedProps:e)),a&1024&&(yc=!0);break;case 6:if(kt(e,t,n),Vt(t),a&4){if(t.stateNode===null)throw Error(S(162));e=t.memoizedProps,n=t.stateNode;try{n.nodeValue=e,q=!0}catch(p){G(t,t.return,p)}}break;case 3:if(q=!1,Lu=null,i=Ae,Ae=Ki(e.containerInfo),kt(e,t,n),Ae=i,Vt(t),a&4&&l!==null&&l.memoizedState.isDehydrated)try{Da(e.containerInfo)}catch(p){G(t,t.return,p)}yc&&(yc=!1,jy(t)),q=!1;break;case 4:a=$e,$e=bt,l=fh(),i=Ae,Ae=Ki(t.stateNode.containerInfo),kt(e,t,n),Vt(t),Ae=i,q&&wi&&(ar=!0),q=l,$e=a;break;case 12:kt(e,t,n),Vt(t);break;case 31:kt(e,t,n),Vt(t),a&4&&(e=t.updateQueue,e!==null&&(t.updateQueue=null,mu(t,e)));break;case 13:kt(e,t,n),Vt(t),t.child.flags&8192&&t.memoizedState!==null!=(l!==null&&l.memoizedState!==null)&&(Ar=ae()),a&4&&(e=t.updateQueue,e!==null&&(t.updateQueue=null,mu(t,e)));break;case 22:i=t.memoizedState!==null,o=l!==null&&l.memoizedState!==null;var u=bt,s=Y,m=$e;bt=u||i,$e=m||i,Y=s||o,kt(e,t,n),Y=s,$e=m,bt=u,Vt(t),a&8192&&(e=t.stateNode,e._visibility=i?e._visibility&-2:e._visibility|1,!i||l===null||o||bt||Y||(e=o||Y,n=bt,l=Y,bt=i||bt,Y=e,Cn(t,2),bt=n,Y=l),!i&&$e||yf(t,i)),a&4&&(e=t.updateQueue,e!==null&&(n=e.retryQueue,n!==null&&(e.retryQueue=null,mu(t,n))));break;case 19:kt(e,t,n),Vt(t),a&4&&(e=t.updateQueue,e!==null&&(t.updateQueue=null,mu(t,e)));break;case 30:a&512&&(Y||l===null||Tt(l,l.return)),a=fh(),i=wi,o=(n&335544064)===n,u=t.memoizedProps,wi=o&&gn(u.default,u.update)!=="none",kt(e,t,n),Vt(t),o&&l!==null&&q&&(t.flags|=4),wi=i,q=a;break;case 21:break;case 7:a&512&&(Y||l===null||Tt(l,l.return)),l&&l.stateNode!==null&&(l.stateNode._fragmentFiber=t);default:kt(e,t,n),Vt(t)}}function Vt(t){var e=t.flags;if(e&2){try{for(var n,l=t.return;l!==null;){if(Oy(l)){n=l;break}l=l.return}l=null;for(var a=t.return;a!==null;){if(wd(a)){var i=a.stateNode;l===null?l=[i]:l.push(i)}if(Sd(a))break;a=a.return}var o=l;if(n==null)throw Error(S(160));switch(n.tag){case 27:var u=n.stateNode,s=gc(t);nr(t,s,u,o);break;case 5:var m=n.stateNode;n.flags&32&&(_a(m,""),n.flags&=-33);var p=gc(t);nr(t,p,m,o);break;case 3:case 4:var v=n.stateNode.containerInfo,d=gc(t);ff(t,d,v,o);break;default:throw Error(S(161))}}catch(g){G(t,t.return,g)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function jy(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;jy(e),e.tag===5&&e.flags&1024&&(e=e.stateNode,La=!0,e.reset(),La=!1),t=t.sibling}}function Wl(t,e){if(e.subtreeFlags&9270)for(e=e.child;e!==null;)Xy(e,t),e=e.sibling;else Dy(e,!1)}function Xy(t,e){var n=t.alternate;if(n===null)df(t,!1);else switch(t.tag){case 3:if(gf=He=!1,ag(),Wl(e,t),!He&&!ar){if(t=ke,t!==null)for(var l=0;l<t.length;l+=3){n=t[l];var a=t[l+1];yv(n,t[l+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+a+")"})}t=e.containerInfo,t=t.nodeType===9?t.documentElement:t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName===""&&(t.style.viewTransitionName="none",t.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),t.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),gf=!0}ke=null;break;case 5:Wl(e,t);break;case 4:l=He,He=!1,Wl(e,t),He&&(ar=!0),He=l;break;case 22:t.memoizedState===null&&(n.memoizedState!==null?df(t,!1):Wl(e,t));break;case 30:l=He,a=ag(),He=!1,Wl(e,t),He&&(t.flags|=4);var i=t.memoizedProps,o=t.stateNode;e=cn(i,o),o=cn(n.memoizedProps,o);var u=gn(i.default,i.update);u==="none"?e=!1:(i=n.memoizedState,n.memoizedState=null,n=t.child,Qt=0,e=Ed(t,n,e,o,u,i,!0),Qt!==(i===null?0:i.length)&&(t.flags|=32)),(t.flags&4)!==0&&e?(Ma(t,t.memoizedProps.onUpdate),ke=a):a!==null&&(a.push.apply(a,ke),ke=a),He=(t.flags&32)!==0?!0:l;break;default:Wl(e,t)}}function Be(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)$y(t,e.alternate,e),e=e.sibling}function Cn(t,e){for(t=t.child;t!==null;){var n=t,l=e;switch(n.tag){case 0:case 11:case 14:case 15:Pn(4,n,n.return),Cn(n,l);break;case 1:Tt(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&Cy(n,n.return,a),Cn(n,l);break;case 27:(l&2)!==0&&Nv(n.stateNode,n.type,n.memoizedProps);case 5:Tt(n,n.return),n.tag!==5&&n.tag!==27||Ri(n),Cn(n,l);break;case 6:Ri(n);break;case 26:Tt(n,n.return),a=n.stateNode,n.memoizedState!==null||a===null||Y||a.parentNode.removeChild(a),Cn(n,l);break;case 22:n.memoizedState===null&&Cn(n,l);break;case 30:Tt(n,n.return),Cn(n,l);break;case 7:Tt(n,n.return);default:Cn(n,l)}t=t.sibling}}function Ne(t,e,n){for(n=(e.subtreeFlags&8772)!==0?n:n&-2,e=e.child;e!==null;){var l=e.alternate,a=t,i=e,o=i.flags,u=(n&1)!==0;switch(i.tag){case 0:case 11:case 15:Ne(a,i,n),io(4,i);break;case 1:if(Ne(a,i,n),l=i,a=l.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(p){G(l,l.return,p)}if(l=i,a=l.updateQueue,a!==null){var s=l.stateNode;try{var m=a.shared.hiddenCallbacks;if(m!==null)for(a.shared.hiddenCallbacks=null,a=0;a<m.length;a++)H0(m[a],s)}catch(p){G(l,l.return,p)}}u&&o&64&&My(i),qe(i,i.return);break;case 27:(n&2)!==0&&Ry(i);case 5:i.tag!==5&&i.tag!==27||ng(i),Ne(a,i,n),u&&l===null&&o&4&&cf(i),qe(i,i.return);break;case 6:ng(i);break;case 26:s=i.stateNode,i.memoizedState!==null||s===null||bt||Df(Ki(s.ownerDocument),i.type,s),Ne(a,i,n),u&&l===null&&o&4&&cf(i),qe(i,i.return);break;case 12:Ne(a,i,n);break;case 31:Ne(a,i,n),u&&o&4&&ky(a,i);break;case 13:Ne(a,i,n),u&&o&4&&Vy(a,i);break;case 22:i.memoizedState===null&&Ne(a,i,n),qe(i,i.return);break;case 30:Ne(a,i,n),qe(i,i.return);break;case 7:qe(i,i.return);default:Ne(a,i,n)}e=e.sibling}}function xd(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&lo(n))}function Td(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&lo(t))}function he(t,e,n,l){var a=(n&335544064)===n;if(e.subtreeFlags&(a?10262:10256))for(e=e.child;e!==null;)Gy(t,e,n,l),e=e.sibling;else a&&Ly(e)}function Gy(t,e,n,l){var a=(n&335544064)===n;a&&e.alternate===null&&e.return!==null&&e.return.alternate!==null&&Ou(e);var i=e.flags;switch(e.tag){case 0:case 11:case 15:he(t,e,n,l),i&2048&&io(9,e);break;case 1:he(t,e,n,l);break;case 3:he(t,e,n,l),a&&gf&&(t=t.containerInfo,t=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,t.style.viewTransitionName==="root"&&(t.style.viewTransitionName=""),t=t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName==="none"&&(t.style.viewTransitionName="")),i&2048&&(i=null,e.alternate!==null&&(i=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==i&&(e.refCount++,i!=null&&lo(i)));break;case 12:if(i&2048){he(t,e,n,l),i=e.stateNode;try{var o=e.memoizedProps,u=o.id,s=o.onPostCommit;typeof s=="function"&&s(u,e.alternate===null?"mount":"update",i.passiveEffectDuration,-0)}catch(m){G(e,e.return,m)}}else he(t,e,n,l);break;case 31:he(t,e,n,l);break;case 13:he(t,e,n,l);break;case 23:break;case 22:o=e.stateNode,u=e.alternate,e.memoizedState!==null?(a&&u!==null&&u.memoizedState===null&&Ou(u),o._visibility&2?he(t,e,n,l):zi(t,e)):(a&&u!==null&&u.memoizedState!==null&&Ou(e),o._visibility&2?he(t,e,n,l):(o._visibility|=2,Fl(t,e,n,l,(e.subtreeFlags&10256)!==0||!1))),i&2048&&xd(u,e);break;case 24:he(t,e,n,l),i&2048&&Td(e.alternate,e);break;case 30:a&&(i=e.alternate,i!==null&&(Ke(i.child,!0),Ke(e.child,!0))),he(t,e,n,l);break;default:he(t,e,n,l)}}function Fl(t,e,n,l,a){for(a=a&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var i=t,o=e,u=n,s=l,m=o.flags;switch(o.tag){case 0:case 11:case 15:Fl(i,o,u,s,a),io(8,o);break;case 23:break;case 22:var p=o.stateNode;o.memoizedState!==null?p._visibility&2?Fl(i,o,u,s,a):zi(i,o):(p._visibility|=2,Fl(i,o,u,s,a)),a&&m&2048&&xd(o.alternate,o);break;case 24:Fl(i,o,u,s,a),a&&m&2048&&Td(o.alternate,o);break;default:Fl(i,o,u,s,a)}e=e.sibling}}function zi(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,l=e,a=l.flags;switch(l.tag){case 22:zi(n,l),a&2048&&xd(l.alternate,l);break;case 24:zi(n,l),a&2048&&Td(l.alternate,l);break;default:zi(n,l)}e=e.sibling}}var ml=8192;function cl(t,e,n){if(t.subtreeFlags&ml)for(t=t.child;t!==null;)Qy(t,e,n),t=t.sibling}function Qy(t,e,n){switch(t.tag){case 26:cl(t,e,n),t.flags&ml&&(t.memoizedState!==null?Nx(n,Ae,t.memoizedState,t.memoizedProps):(t=t.stateNode,(e&335544128)===e&&Rg(n,t)));break;case 5:cl(t,e,n),t.flags&ml&&(t=t.stateNode,(e&335544128)===e&&Rg(n,t));break;case 3:case 4:var l=Ae;Ae=Ki(t.stateNode.containerInfo),cl(t,e,n),Ae=l;break;case 22:t.memoizedState===null&&(l=t.alternate,l!==null&&l.memoizedState!==null?(l=ml,ml=16777216,cl(t,e,n),ml=l):cl(t,e,n));break;case 30:if((t.flags&ml)!==0&&(l=t.memoizedProps.name,l!=null&&l!=="auto")){var a=t.stateNode;a.paired=null,ne===null&&(ne=new Map),ne.set(l,a)}cl(t,e,n);break;default:cl(t,e,n)}}function Ky(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function pi(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var l=e[n];St=l,Jy(l,t)}Ky(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Zy(t),t=t.sibling}function Zy(t){switch(t.tag){case 0:case 11:case 15:pi(t),t.flags&2048&&Pn(9,t,t.return);break;case 3:pi(t);break;case 12:pi(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,Ru(t)):pi(t);break;default:pi(t)}}function Ru(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var l=e[n];St=l,Jy(l,t)}Ky(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:Pn(8,e,e.return),Ru(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,Ru(e));break;default:Ru(e)}t=t.sibling}}function Jy(t,e){for(;St!==null;){var n=St;switch(n.tag){case 0:case 11:case 15:Pn(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var l=n.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:lo(n.memoizedState.cache)}if(l=n.child,l!==null)l.return=n,St=l;else t:for(n=t;St!==null;){l=St;var a=l.sibling,i=l.return;if(By(l),l===n){St=null;break t}if(a!==null){a.return=i,St=a;break t}St=i}}}var xE={getCacheForType:function(t){var e=Nt(mt),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return Nt(mt).controller.signal}},TE=typeof WeakMap=="function"?WeakMap:Map,k=0,K=null,$=null,H=0,j=0,Ft=null,$n=!1,ka=!1,_d=!1,pn=0,ot=0,Fn=0,Sl=0,ir=0,le=0,Aa=0,Ui=null,Gt=null,bf=!1,Ar=0,Iy=0,or=1/0,ur=null,Gn=null,lt=0,Ce=null,Ml=null,Qe=0,Sf=0,wf=null,Wy=null,Sa=null,wa=null,Ea=null,Li=0,zu=null;function ue(){return(k&2)!==0&&H!==0?H&-H:O.T!==null?Ad():e0()}function Py(){if(le===0)if((H&536870912)===0||L){var t=tu;tu<<=1,(tu&3932160)===0&&(tu=262144),le=t}else le=536870912;return t=Ot.current,t!==null&&(t.flags|=32),le}function Ma(t,e){if(e!=null){var n=t.stateNode,l=n.ref;l===null&&(l=n.ref=bv(cn(t.memoizedProps,n))),wa===null&&(wa=[]),wa.push(e.bind(null,l))}}function Zt(t,e,n){(t===K&&(j===2||j===9)||t.cancelPendingCommit!==null)&&(Ca(t,0),Hn(t,H,le,!1)),to(t,n),((k&2)===0||t!==K)&&(t===K&&((k&2)===0&&(Sl|=n),ot===4&&Hn(t,H,le,!1)),Je(t))}function Fy(t,e,n){if((k&6)!==0)throw Error(S(327));var l=!n&&(e&127)===0&&(e&t.expiredLanes)===0||Fi(t,e),a=l?AE(t,e):vc(t,e,!0),i=l;do{if(a===0){ka&&!l&&Hn(t,e,0,!1);break}else{if(n=t.current.alternate,i&&!_E(n)){a=vc(t,e,!1),i=!1;continue}if(a===2){if(i=e,t.errorRecoveryDisabledLanes&i)var o=0;else o=t.pendingLanes&-536870913,o=o!==0?o:o&536870912?536870912:0;if(o!==0){e=o;t:{var u=t;a=Ui;var s=u.current.memoizedState.isDehydrated;if(s&&(Ca(u,o).flags|=256),o=vc(u,o,!1),o!==2&&o!==6){if(_d&&!s){u.errorRecoveryDisabledLanes|=i,Sl|=i,a=4;break t}i=Gt,Gt=a,i!==null&&(Gt===null?Gt=i:Gt.push.apply(Gt,i))}a=o}if(i=!1,a!==2)continue}}if(a===1){Ca(t,0),Hn(t,e,0,!0);break}t:{switch(l=t,i=a,i){case 0:case 1:throw Error(S(345));case 4:if((e&4194048)!==e&&(e&62914560)!==e)break;case 6:Hn(l,e,le,!$n);break t;case 2:Gt=null;break;case 3:case 5:break;default:throw Error(S(329))}if((e&62914560)===e&&(a=Ar+300-ae(),10<a)){if(Hn(l,e,le,!$n),mr(l,0,!0)!==0)break t;Qe=e,l.timeoutHandle=Cd(og.bind(null,l,n,Gt,ur,bf,e,le,Sl,Aa,$n,i,"Throttled",-0,0),a);break t}og(l,n,Gt,ur,bf,e,le,Sl,Aa,$n,i,null,-0,0)}}break}while(!0);Je(t)}function og(t,e,n,l,a,i,o,u,s,m,p,v,d,g){t.timeoutHandle=-1;var E=e.subtreeFlags,_=(i&335544064)===i;if(v=null,(_||E&8192||(E&16785408)===16785408)&&(v={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ye},ne=null,Qy(e,i,v),_&&(E=v,_=t.containerInfo,_=(_.nodeType===9?_:_.ownerDocument).__reactViewTransition,_!=null&&(E.count++,E.waitingForViewTransition=!0,E=Zi.bind(E),_.finished.then(E,E))),E=(i&62914560)===i?Ar-ae():(i&4194048)===i?Iy-ae():0,E=Ax(v,E),E!==null)){Qe=i,t.cancelPendingCommit=E(rg.bind(null,t,e,i,n,l,a,o,u,s,m,p,v,null,d,g)),Hn(t,i,o,!m);return}rg(t,e,i,n,l,a,o,u,s,m,p,v)}function _E(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var l=0;l<n.length;l++){var a=n[l],i=a.getSnapshot;a=a.value;try{if(!re(i(),a))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Hn(t,e,n,l){e=Ig(t,e),e&=~ir,e&=~Sl,t.suspendedLanes|=e,t.pingedLanes&=~e,l&&(t.warmLanes|=e),l=t.expirationTimes;for(var a=e;0<a;){var i=31-oe(a),o=1<<i;l[i]=-1,a&=~o}n!==0&&Pg(t,n,e)}function Mr(){return(k&6)===0?(oo(0,!1),!1):!0}function Nd(){if($!==null){if(j===0)var t=$.return;else t=$,on=Ul=null,sd(t),ya=null,Vi=0,t=$;for(;t!==null;)Ay(t.alternate,t),t=t.return;$=null}}function Ca(t,e){var n=t.timeoutHandle;return n!==-1&&(t.timeoutHandle=-1,KE(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Qe=0,Nd(),K=t,$=n=un(t.current,null),H=e,j=0,Ft=null,$n=!1,ka=Fi(t,e),_d=!1,Aa=le=ir=Sl=Fn=ot=0,Gt=Ui=null,bf=!1,pn=Ig(t,e),vr(),n}function tv(t,e){U=null,O.H=Fu,e===Ba||e===wr?(e=Uh(),j=3):e===ed?(e=Uh(),j=4):j=e===yd?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,Ft=e,$===null&&(ot=1,tr(t,Se(e,t.current)))}function ev(){var t=Ot.current;return t===null?!0:(H&4194048)===H?Ht===null:(H&62914560)===H||(H&536870912)!==0?t===Ht:!1}function nv(){var t=O.H;return O.H=Fu,t===null?Fu:t}function lv(){var t=O.A;return O.A=xE,t}function rr(){ot=4,$n||(H&4194048)!==H&&Ot.current!==null||(ka=!0),(Fn&134217727)===0&&(Sl&134217727)===0||K===null||Hn(K,H,le,!1)}function vc(t,e,n){var l=k;k|=2;var a=nv(),i=lv();(K!==t||H!==e)&&(ur=null,Ca(t,e)),e=!1;var o=ot;t:do try{if(j!==0&&$!==null){var u=$,s=Ft;switch(j){case 8:Nd(),o=6;break t;case 3:case 2:case 9:case 6:Ot.current===null&&(e=!0);var m=j;if(j=0,Ft=null,da(t,u,s,m),n&&ka){o=0;break t}break;default:m=j,j=0,Ft=null,da(t,u,s,m)}}NE(),o=ot;break}catch(p){tv(t,p)}while(!0);return e&&t.shellSuspendCounter++,on=Ul=null,k=l,O.H=a,O.A=i,$===null&&(K=null,H=0,vr()),o}function NE(){for(;$!==null;)av($)}function AE(t,e){var n=k;k|=2;var l=nv(),a=lv();K!==t||H!==e?(ur=null,or=ae()+500,Ca(t,e)):ka=Fi(t,e);t:do try{if(j!==0&&$!==null){e=$;var i=Ft;e:switch(j){case 1:j=0,Ft=null,da(t,e,i,1);break;case 2:case 9:if(zh(i)){j=0,Ft=null,ug(e);break}e=function(){j!==2&&j!==9||K!==t||(j=7),Je(t)},i.then(e,e);break t;case 3:j=7;break t;case 4:j=5;break t;case 7:zh(i)?(j=0,Ft=null,ug(e)):(j=0,Ft=null,da(t,e,i,7));break;case 5:var o=null;switch($.tag){case 26:o=$.memoizedState;case 5:case 27:var u=$;if(o?Cv(o):u.stateNode.complete){j=0,Ft=null;var s=u.sibling;if(s!==null)$=s;else{var m=u.return;m!==null?($=m,Cr(m)):$=null}break e}}j=0,Ft=null,da(t,e,i,5);break;case 6:j=0,Ft=null,da(t,e,i,6);break;case 8:Nd(),ot=6;break t;default:throw Error(S(462))}}ME();break}catch(p){tv(t,p)}while(!0);return on=Ul=null,O.H=l,O.A=a,k=n,$!==null?0:(K=null,H=0,vr(),ot)}function ME(){for(;$!==null&&!GS();)av($)}function av(t){var e=Ny(t.alternate,t,pn);t.memoizedProps=t.pendingProps,e===null?Cr(t):$=e}function ug(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=Jh(n,e,e.pendingProps,e.type,void 0,H);break;case 11:e=Jh(n,e,e.pendingProps,e.type.render,e.ref,H);break;case 5:sd(e);var l=e;l===Et&&(L?(Qu(l),l.tag===5&&l.stateNode!=null&&(P=l.stateNode)):(Qu(l),L=!0));default:Ay(n,e),e=$=M0(e,pn),e=Ny(n,e,pn)}t.memoizedProps=t.pendingProps,e===null?Cr(t):$=e}function da(t,e,n,l){on=Ul=null,sd(e),ya=null,Vi=0;var a=e.return;try{if(hE(t,a,e,n,H)){ot=1,tr(t,Se(n,t.current)),$=null;return}}catch(i){if(a!==null)throw $=a,i;ot=1,tr(t,Se(n,t.current)),$=null;return}e.flags&32768?(L||l===1?t=!0:ka||(H&536870912)!==0?t=!1:($n=t=!0,(l===2||l===9||l===3||l===6)&&(l=Ot.current,l!==null&&l.tag===13&&(l.flags|=16384))),iv(e,t)):Cr(e)}function Cr(t){var e=t;do{if((e.flags&32768)!==0){iv(e,$n);return}t=e.return;var n=bE(e.alternate,e,pn);if(n!==null){$=n;return}if(e=e.sibling,e!==null){$=e;return}$=e=t}while(e!==null);ot===0&&(ot=5)}function iv(t,e){do{var n=SE(t.alternate,t);if(n!==null){n.flags&=32767,$=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){$=t;return}$=t=n}while(t!==null);ot=6,$=null}function rg(t,e,n,l,a,i,o,u,s,m,p,v){t.cancelPendingCommit=null;do Or();while(lt!==0);if((k&6)!==0)throw Error(S(327));if(e!==null){if(e===t.current)throw Error(S(177));t===K&&($=K=null,H=0),Ml=e,Ce=t,Qe=n,wf=a,Wy=l,CE(t,e,n,o,u,s,v)}}function CE(t,e,n,l,a,i,o){var u=e.lanes|e.childLanes;if(Sf=u,u|=Jf,ew(t,n,u,l,a,i),wa=null,(n&335544064)===n?(Ea=lE(t),l=10262):(Ea=null,l=10256),(e.subtreeFlags&l)!==0||(e.flags&l)!==0?(t.callbackNode=null,t.callbackPriority=0,DE(Vu,function(){return _f(),null})):(t.callbackNode=null,t.callbackPriority=0),lr=!1,l=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||l){l=O.T,O.T=null,a=V.p,V.p=2,i=k,k|=4;try{wE(t,e,n)}finally{k=i,V.p=a,O.T=l}}lt=1,lr?Sa=FE(o,t.containerInfo,Ea,Ef,xf,RE,Tf,_f,OE,null,null):(Ef(),xf(),Tf())}function OE(t){if(lt!==0){var e=Ce.onRecoverableError;e(t,{componentStack:null})}}function RE(){lt===3&&(lt=0,Xy(Ml,Ce),lt=4)}function Ef(){if(lt===1){lt=0;var t=Ce,e=Ml,n=Qe,l=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||l){l=O.T,O.T=null;var a=V.p;V.p=2;var i=k;k|=4;try{wi=ar=!1,Yy(e,t,n),n=Cf;var o=S0(t.containerInfo),u=n.focusedElem,s=n.selectionRange;if(o!==u&&u&&u.ownerDocument&&b0(u.ownerDocument.documentElement,u)){if(s!==null&&Zf(u)){var m=s.start,p=s.end;if(p===void 0&&(p=m),"selectionStart"in u)u.selectionStart=m,u.selectionEnd=Math.min(p,u.value.length);else{var v=u.ownerDocument||document,d=v&&v.defaultView||window;if(d.getSelection){var g=d.getSelection(),E=u.textContent.length,_=Math.min(s.start,E),N=s.end===void 0?_:Math.min(s.end,E);!g.extend&&_>N&&(o=N,N=_,_=o);var f=Th(u,_),c=Th(u,N);if(f&&c&&(g.rangeCount!==1||g.anchorNode!==f.node||g.anchorOffset!==f.offset||g.focusNode!==c.node||g.focusOffset!==c.offset)){var y=v.createRange();y.setStart(f.node,f.offset),g.removeAllRanges(),_>N?(g.addRange(y),g.extend(c.node,c.offset)):(y.setEnd(c.node,c.offset),g.addRange(y))}}}}for(v=[],g=u;g=g.parentNode;)g.nodeType===1&&v.push({element:g,left:g.scrollLeft,top:g.scrollTop});for(typeof u.focus=="function"&&u.focus(),u=0;u<v.length;u++){var b=v[u];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}La=!!Mf,Cf=Mf=null}finally{k=i,V.p=a,O.T=l}}t.current=e,lt=2}}function xf(){if(lt===2){lt=0;var t=Ce,e=Ml,n=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||n){n=O.T,O.T=null;var l=V.p;V.p=2;var a=k;k|=4;try{$y(t,e.alternate,e)}finally{k=a,V.p=l,O.T=n}}lt=3}}function Tf(){if(lt===4||lt===3){lt=0;var t=Sa;Sa=null,QS();var e=Ce,n=Ml,l=Qe,a=Wy,i=(l&335544064)===l?10262:10256;if((n.subtreeFlags&i)!==0||(n.flags&i)!==0?lt=5:(lt=0,Ml=Ce=null,ov(e,e.pendingLanes)),i=e.pendingLanes,i===0&&(Gn=null),Yf(l),n=n.stateNode,ie&&typeof ie.onCommitFiberRoot=="function")try{ie.onCommitFiberRoot(Pi,n,void 0,(n.current.flags&128)===128)}catch{}if(a!==null){n=O.T,i=V.p,V.p=2,O.T=null;try{for(var o=e.onRecoverableError,u=0;u<a.length;u++){var s=a[u];o(s.value,{componentStack:s.stack})}}finally{O.T=n,V.p=i}}if(a=wa,o=Ea,Ea=null,a!==null&&(wa=null,o===null&&(o=[]),t!==null))for(s=0;s<a.length;s++)n=(0,a[s])(o),n!==void 0&&t.finished.finally(n);(Qe&3)!==0&&Or(),Je(e),i=e.pendingLanes,(l&261930)!==0&&(i&42)!==0?e===zu?Li++:(Li=0,zu=e):(Li=0,zu=null),oo(0,!1)}}function ov(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,lo(e)))}function Or(){return Sa!==null&&(Sa.skipTransition(),Sa=null),Ef(),xf(),Tf(),_f()}function _f(){if(lt!==5)return!1;var t=Ce,e=Sf;Sf=0;var n=Yf(Qe),l=O.T,a=V.p;try{V.p=32>n?32:n,O.T=null,n=wf,wf=null;var i=Ce,o=Qe;if(lt=0,Ml=Ce=null,Qe=0,(k&6)!==0)throw Error(S(331));var u=k;if(k|=4,Zy(i.current),Gy(i,i.current,o,n),k=u,oo(0,!1),ie&&typeof ie.onPostCommitFiberRoot=="function")try{ie.onPostCommitFiberRoot(Pi,i)}catch{}return!0}finally{V.p=a,O.T=l,ov(t,e)}}function sg(t,e,n){e=Se(n,e),e=lf(t.stateNode,e,2),t=Yn(t,e,2),t!==null&&(to(t,2),Je(t))}function G(t,e,n){if(t.tag===3)sg(t,t,n);else for(;e!==null;){if(e.tag===3){sg(e,t,n);break}else if(e.tag===1){var l=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(Gn===null||!Gn.has(l))){t=Se(n,t),n=wy(2),l=Yn(e,n,2),l!==null&&(Ey(n,l,e,t),to(l,2),Je(l));break}}e=e.return}}function bc(t,e,n){var l=t.pingCache;if(l===null){l=t.pingCache=new TE;var a=new Set;l.set(e,a)}else a=l.get(e),a===void 0&&(a=new Set,l.set(e,a));a.has(n)||(_d=!0,a.add(n),t=zE.bind(null,t,e,n),e.then(t,t))}function zE(t,e,n){var l=t.pingCache;l!==null&&l.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,K===t&&(H&n)===n&&((ot===4||ot===3&&(H&62914560)===H&&300>ae()-Ar)&&(k&2)===0?Ca(t,0):ir|=n,Aa===H&&(Aa=0)),Je(t)}function uv(t,e){e===0&&(e=Wg()),t=zl(t,e),t!==null&&(to(t,e),Je(t))}function UE(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),uv(t,n)}function LE(t,e){var n=0;switch(t.tag){case 31:case 13:var l=t.stateNode,a=t.memoizedState;a!==null&&(n=a.retryLane);break;case 19:l=t.stateNode;break;case 22:l=t.stateNode._retryCache;break;default:throw Error(S(314))}l!==null&&l.delete(e),uv(t,n)}function DE(t,e){return kf(t,e)}var Oa=null,ta=null,Nf=!1,sr=!1,Sc=!1,Bn=0;function Je(t){t!==ta&&t.next===null&&(ta===null?Oa=ta=t:ta=ta.next=t),sr=!0,Nf||(Nf=!0,HE())}function oo(t,e){if(!Sc&&sr){Sc=!0;do for(var n=!1,l=Oa;l!==null;){if(!e)if(t!==0){var a=l.pendingLanes;if(a===0)var i=0;else{var o=l.suspendedLanes,u=l.pingedLanes;i=(1<<31-oe(42|t)+1)-1,i&=a&~(o&~u),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,cg(l,i))}else i=H,i=mr(l,l===K?i:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(i&3)===0||Fi(l,i)||(n=!0,cg(l,i));l=l.next}while(n);Sc=!1}}function $E(){rv()}function rv(){sr=Nf=!1;var t=0;Bn!==0&&QE()&&(t=Bn);for(var e=ae(),n=null,l=Oa;l!==null;){var a=l.next,i=sv(l,e);i===0?(l.next=null,n===null?Oa=a:n.next=a,a===null&&(ta=n)):(n=l,(t!==0||(i&3)!==0)&&(sr=!0)),l=a}lt!==0&&lt!==5||oo(t,!1),Bn!==0&&(Bn=0)}function sv(t,e){for(var n=t.suspendedLanes,l=t.pingedLanes,a=t.expirationTimes,i=t.pendingLanes&-62914561;0<i;){var o=31-oe(i),u=1<<o,s=a[o];s===-1?((u&n)===0||(u&l)!==0)&&(a[o]=tw(u,e)):s<=e&&(t.expiredLanes|=u),i&=~u}if(e=K,n=H,n=mr(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l=t.callbackNode,n===0||t===e&&(j===2||j===9)||t.cancelPendingCommit!==null)return l!==null&&l!==null&&Ps(l),t.callbackNode=null,t.callbackPriority=0;if((n&3)===0||Fi(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(l!==null&&Ps(l),Yf(n)){case 2:case 8:n=Zg;break;case 32:n=Vu;break;case 268435456:n=Jg;break;default:n=Vu}return l=cv.bind(null,t),n=kf(n,l),t.callbackPriority=e,t.callbackNode=n,e}return l!==null&&l!==null&&Ps(l),t.callbackPriority=2,t.callbackNode=null,2}function cv(t,e){if(lt!==0&&lt!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(Or()&&t.callbackNode!==n)return null;var l=H;return l=mr(t,t===K?l:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l===0?null:(Fy(t,l,e),sv(t,ae()),t.callbackNode!=null&&t.callbackNode===n?cv.bind(null,t):null)}function cg(t,e){if(Or())return null;Fy(t,e,!0)}function HE(){ZE(function(){(k&6)!==0?kf(Kg,$E):rv()})}function Ad(){if(Bn===0){var t=Tl;t===0&&(t=Fo,Fo<<=1,(Fo&261888)===0&&(Fo=256)),Bn=t}return Bn}function fg(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Su(t)}function BE(t,e,n,l,a){if(e==="submit"&&n&&n.stateNode===a){var i=fg((a[It]||null).action),o=l.submitter;o&&(e=(e=o[It]||null)?fg(e.formAction):o.getAttribute("formAction"),e!==null&&(i=e,o=null));var u=new hr("action","action",null,l,a);t.push({event:u,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(Bn!==0){var s=new FormData(a,o);ef(n,{pending:!0,data:s,method:a.method,action:i},null,s)}}else typeof i=="function"&&(u.preventDefault(),s=new FormData(a,o),ef(n,{pending:!0,data:s,method:a.method,action:i},i,s))},currentTarget:a}]})}}for(pu=0;pu<Xc.length;pu++)hu=Xc[pu],dg=hu.toLowerCase(),mg=hu[0].toUpperCase()+hu.slice(1),Oe(dg,"on"+mg);var hu,dg,mg,pu;Oe(E0,"onAnimationEnd");Oe(x0,"onAnimationIteration");Oe(T0,"onAnimationStart");Oe("dblclick","onDoubleClick");Oe("focusin","onFocus");Oe("focusout","onBlur");Oe(Jw,"onTransitionRun");Oe(Iw,"onTransitionStart");Oe(Ww,"onTransitionCancel");Oe(_0,"onTransitionEnd");Ta("onMouseEnter",["mouseout","mouseover"]);Ta("onMouseLeave",["mouseout","mouseover"]);Ta("onPointerEnter",["pointerout","pointerover"]);Ta("onPointerLeave",["pointerout","pointerover"]);Ol("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ol("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ol("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ol("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ol("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ol("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Xi="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),qE=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Xi));function fv(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var l=t[n],a=l.event;l=l.listeners;t:{var i=void 0;if(e)for(var o=l.length-1;0<=o;o--){var u=l[o],s=u.instance,m=u.currentTarget;if(u=u.listener,s!==i&&a.isPropagationStopped())break t;i=u,a.currentTarget=m;try{i(a)}catch(p){ju(p)}a.currentTarget=null,i=s}else for(o=0;o<l.length;o++){if(u=l[o],s=u.instance,m=u.currentTarget,u=u.listener,s!==i&&a.isPropagationStopped())break t;i=u,a.currentTarget=m;try{i(a)}catch(p){ju(p)}a.currentTarget=null,i=s}}}}function D(t,e){var n=e[uh];n===void 0&&(n=e[uh]=new Set);var l=t+"__bubble";n.has(l)||(dv(e,t,2,!1),n.add(l))}function wc(t,e,n){var l=0;e&&(l|=4),dv(n,t,l,e)}var gu="_reactListening"+Math.random().toString(36).slice(2);function Md(t){if(!t[gu]){t[gu]=!0,l0.forEach(function(n){n!=="selectionchange"&&(qE.has(n)||wc(n,!1,t),wc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[gu]||(e[gu]=!0,wc("selectionchange",!1,e))}}function dv(t,e,n,l){switch($v(e)){case 2:var a=Rx;break;case 8:a=zx;break;default:a=Dd}n=a.bind(null,e,n,t),a=void 0,!kc||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(a=!0),l?a!==void 0?t.addEventListener(e,n,{capture:!0,passive:a}):t.addEventListener(e,n,!0):a!==void 0?t.addEventListener(e,n,{passive:a}):t.addEventListener(e,n,!1)}function Ec(t,e,n,l,a){var i=l;if((e&1)===0&&(e&2)===0&&l!==null)t:for(;;){if(l===null)return;var o=l.tag;if(o===3||o===4){var u=l.stateNode.containerInfo;if(u===a)break;if(o===4)for(o=l.return;o!==null;){var s=o.tag;if((s===3||s===4)&&o.stateNode.containerInfo===a)return;o=o.return}for(;u!==null;){if(o=pl(u),o===null)return;if(s=o.tag,s===5||s===6||s===26||s===27){l=i=o;continue t}u=u.parentNode}}l=l.return}f0(function(){var m=i,p=Xf(n),v=[];t:{var d=N0.get(t);if(d!==void 0){var g=hr,E=t;switch(t){case"keypress":if(Eu(n)===0)break t;case"keydown":case"keyup":g=_w;break;case"focusin":E="focus",g=ac;break;case"focusout":E="blur",g=ac;break;case"beforeblur":case"afterblur":g=ac;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":g=hh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":g=mw;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":g=Ow;break;case E0:case x0:case T0:g=gw;break;case _0:g=zw;break;case"scroll":case"scrollend":g=fw;break;case"wheel":g=Lw;break;case"copy":case"cut":case"paste":g=vw;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":g=yh;break;case"submit":g=Mw;break;case"toggle":case"beforetoggle":g=$w}var _=(e&4)!==0,N=!_&&(t==="scroll"||t==="scrollend"),f=_?d!==null?d+"Capture":null:d;_=[];for(var c=m,y;c!==null;){var b=c;if(y=b.stateNode,b=b.tag,b!==5&&b!==26&&b!==27||y===null||f===null||(b=$i(c,f),b!=null&&_.push(Gi(c,b,y))),N)break;c=c.return}0<_.length&&(d=new g(d,E,null,n,p),v.push({event:d,listeners:_}))}}if((e&7)===0){t:{if(g=t==="mouseover"||t==="pointerover",d=t==="mouseout"||t==="pointerout",g&&n!==qc&&(E=n.relatedTarget||n.fromElement)&&(pl(E)||E[$a]))break t;(d||g)&&(E=p.window===p?p:(g=p.ownerDocument)?g.defaultView||g.parentWindow:window,d?(g=n.relatedTarget||n.toElement,d=m,g=g?pl(g):null,g!==null&&(N=Wi(g),_=g.tag,g!==N||_!==5&&_!==27&&_!==6)&&(g=null)):(d=null,g=m),d!==g&&(_=hh,b="onMouseLeave",f="onMouseEnter",c="mouse",(t==="pointerout"||t==="pointerover")&&(_=yh,b="onPointerLeave",f="onPointerEnter",c="pointer"),N=d==null?E:bi(d),y=g==null?E:bi(g),E=new _(b,c+"leave",d,n,p),E.target=N,E.relatedTarget=y,b=null,pl(p)===m&&(_=new _(f,c+"enter",g,n,p),_.target=y,_.relatedTarget=N,b=_),N=b,_=d&&g?Ac(d,g,kE):null,d!==null&&pg(v,E,d,_,!1),g!==null&&N!==null&&pg(v,N,g,_,!0)))}t:{if(d=m?bi(m):window,g=d.nodeName&&d.nodeName.toLowerCase(),g==="select"||g==="input"&&d.type==="file")var x=wh;else if(Sh(d))if(y0)x=Qw;else{x=Xw;var z=jw}else g=d.nodeName,!g||g.toLowerCase()!=="input"||d.type!=="checkbox"&&d.type!=="radio"?m&&jf(m.elementType)&&(x=wh):x=Gw;if(x&&(x=x(t,m))){g0(v,x,n,p);break t}z&&z(t,d,m)}switch(z=m?bi(m):window,t){case"focusin":(Sh(z)||z.contentEditable==="true")&&(oa=z,Yc=m,Ti=null);break;case"focusout":Ti=Yc=oa=null;break;case"mousedown":jc=!0;break;case"contextmenu":case"mouseup":case"dragend":jc=!1,_h(v,n,p);break;case"selectionchange":if(Zw)break;case"keydown":case"keyup":_h(v,n,p)}var A;if(Kf)t:{switch(t){case"compositionstart":var M="onCompositionStart";break t;case"compositionend":M="onCompositionEnd";break t;case"compositionupdate":M="onCompositionUpdate";break t}M=void 0}else ia?p0(t,n)&&(M="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(M="onCompositionStart");M&&(m0&&n.locale!=="ko"&&(ia||M!=="onCompositionStart"?M==="onCompositionEnd"&&ia&&(A=d0()):(Ln=p,Gf="value"in Ln?Ln.value:Ln.textContent,ia=!0)),z=cr(m,M),0<z.length&&(M=new gh(M,t,null,n,p),v.push({event:M,listeners:z}),A?M.data=A:(A=h0(n),A!==null&&(M.data=A)))),(A=Bw?qw(t,n):kw(t,n))&&(M=cr(m,"onBeforeInput"),0<M.length&&(z=new gh("onBeforeInput","beforeinput",null,n,p),v.push({event:z,listeners:M}),z.data=A)),BE(v,t,m,n,p)}fv(v,e)})}function Gi(t,e,n){return{instance:t,listener:e,currentTarget:n}}function cr(t,e){for(var n=e+"Capture",l=[];t!==null;){var a=t,i=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||i===null||(a=$i(t,n),a!=null&&l.unshift(Gi(t,a,i)),a=$i(t,e),a!=null&&l.push(Gi(t,a,i))),t.tag===3)return l;t=t.return}return[]}function kE(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function pg(t,e,n,l,a){for(var i=e._reactName,o=[];n!==null&&n!==l;){var u=n,s=u.alternate,m=u.stateNode;if(u=u.tag,s!==null&&s===l)break;u!==5&&u!==26&&u!==27||m===null||(s=m,a?(m=$i(n,i),m!=null&&o.unshift(Gi(n,m,s))):a||(m=$i(n,i),m!=null&&o.push(Gi(n,m,s)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var VE=/\r\n?/g,YE=/\u0000|\uFFFD/g;function hg(t){return(typeof t=="string"?t:""+t).replace(VE,`
`).replace(YE,"")}function mv(t,e){return e=hg(e),hg(t)===e}function X(t,e,n,l,a,i){switch(n){case"children":if(typeof l=="string")e==="body"||e==="textarea"&&l===""||_a(t,l);else if(typeof l=="number"||typeof l=="bigint")e!=="body"&&_a(t,""+l);else return;break;case"className":nu(t,"class",l);break;case"tabIndex":nu(t,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":nu(t,n,l);break;case"style":c0(t,l,i);return;case"data":if(e!=="object"){nu(t,"data",l);break}case"src":case"href":if(l===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(n);break}l=Su(l),t.setAttribute(n,l);break;case"action":case"formAction":if(typeof l=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(e!=="input"&&X(t,e,"name",a.name,a,null),X(t,e,"formEncType",a.formEncType,a,null),X(t,e,"formMethod",a.formMethod,a,null),X(t,e,"formTarget",a.formTarget,a,null)):(X(t,e,"encType",a.encType,a,null),X(t,e,"method",a.method,a,null),X(t,e,"target",a.target,a,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(n);break}l=Su(l),t.setAttribute(n,l);break;case"onClick":l!=null&&(t.onclick=Ye);return;case"onScroll":l!=null&&D("scroll",t);return;case"onScrollEnd":l!=null&&D("scrollend",t);return;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(S(61));if(n=l.__html,n!=null){if(a.children!=null)throw Error(S(60));i?.__html!==n&&(t.innerHTML=n)}}break;case"multiple":t.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":t.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){t.removeAttribute("xlink:href");break}n=Su(l),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(n,l):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":l===!0?t.setAttribute(n,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(n,l):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?t.setAttribute(n,l):t.removeAttribute(n);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?t.removeAttribute(n):t.setAttribute(n,l);break;case"popover":D("beforetoggle",t),D("toggle",t),bu(t,"popover",l);break;case"xlinkActuate":nn(t,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":nn(t,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":nn(t,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":nn(t,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":nn(t,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":nn(t,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":nn(t,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":nn(t,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":nn(t,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":bu(t,"is",l);break;case"innerText":case"textContent":return;default:if(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")n=sw.get(n)||n,bu(t,n,l);else return}q=!0}function Af(t,e,n,l,a,i){switch(n){case"style":c0(t,l,i);return;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(S(61));if(n=l.__html,n!=null){if(a.children!=null)throw Error(S(60));i?.__html!==n&&(t.innerHTML=n)}}break;case"children":if(typeof l=="string")_a(t,l);else if(typeof l=="number"||typeof l=="bigint")_a(t,""+l);else return;break;case"onScroll":l!=null&&D("scroll",t);return;case"onScrollEnd":l!=null&&D("scrollend",t);return;case"onClick":l!=null&&(t.onclick=Ye);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!a0.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),i=n.slice(2,a?n.length-7:void 0),e=t[It]||null,e=e!=null?e[n]:null,typeof e=="function"&&t.removeEventListener(i,e,a),typeof l=="function")){typeof e!="function"&&e!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(i,l,a);break t}q=!0,n in t?t[n]=l:l===!0?t.setAttribute(n,""):bu(t,n,l)}return}q=!0}function Ct(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":D("error",t),D("load",t);var l=!1,a=!1,i;for(i in n)if(n.hasOwnProperty(i)){var o=n[i];if(o!=null)switch(i){case"src":l=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(S(137,e));default:X(t,e,i,o,n,null)}}a&&X(t,e,"srcSet",n.srcSet,n,null),l&&X(t,e,"src",n.src,n,null);return;case"input":D("invalid",t);var u=i=o=a=null,s=null,m=null;for(l in n)if(n.hasOwnProperty(l)){var p=n[l];if(p!=null)switch(l){case"name":a=p;break;case"type":o=p;break;case"checked":s=p;break;case"defaultChecked":m=p;break;case"value":i=p;break;case"defaultValue":u=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(S(137,e));break;default:X(t,e,l,p,n,null)}}u0(t,i,u,s,m,o,a,!1);return;case"select":D("invalid",t),l=o=i=null;for(a in n)if(n.hasOwnProperty(a)&&(u=n[a],u!=null))switch(a){case"value":i=u;break;case"defaultValue":o=u;break;case"multiple":l=u;default:X(t,e,a,u,n,null)}e=i,n=o,t.multiple=!!l,e!=null?pa(t,!!l,e,!1):n!=null&&pa(t,!!l,n,!0);return;case"textarea":D("invalid",t),i=a=l=null;for(o in n)if(n.hasOwnProperty(o)&&(u=n[o],u!=null))switch(o){case"value":l=u;break;case"defaultValue":a=u;break;case"children":i=u;break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(S(91));break;default:X(t,e,o,u,n,null)}s0(t,l,a,i);return;case"option":for(s in n)n.hasOwnProperty(s)&&(l=n[s],l!=null)&&(s==="selected"?t.selected=l&&typeof l!="function"&&typeof l!="symbol":X(t,e,s,l,n,null));return;case"dialog":D("beforetoggle",t),D("toggle",t),D("cancel",t),D("close",t);break;case"iframe":case"object":D("load",t);break;case"video":case"audio":for(l=0;l<Xi.length;l++)D(Xi[l],t);break;case"image":D("error",t),D("load",t);break;case"details":D("toggle",t);break;case"embed":case"source":case"link":D("error",t),D("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(m in n)if(n.hasOwnProperty(m)&&(l=n[m],l!=null))switch(m){case"children":case"dangerouslySetInnerHTML":throw Error(S(137,e));default:X(t,e,m,l,n,null)}return;default:if(jf(e)){for(p in n)n.hasOwnProperty(p)&&(l=n[p],l!==void 0&&Af(t,e,p,l,n,void 0));return}}for(u in n)n.hasOwnProperty(u)&&(l=n[u],l!=null&&X(t,e,u,l,n,null))}var jE={};function XE(t,e,n,l){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,i=null,o=null,u=null,s=null,m=null,p=null;for(g in n){var v=n[g];if(n.hasOwnProperty(g)&&v!=null)switch(g){case"checked":break;case"value":break;case"defaultValue":s=v;default:l.hasOwnProperty(g)||X(t,e,g,null,l,v)}}for(var d in l){var g=l[d];if(v=n[d],l.hasOwnProperty(d)&&(g!=null||v!=null))switch(d){case"type":g!==v&&(q=!0),i=g;break;case"name":g!==v&&(q=!0),a=g;break;case"checked":g!==v&&(q=!0),m=g;break;case"defaultChecked":g!==v&&(q=!0),p=g;break;case"value":g!==v&&(q=!0),o=g;break;case"defaultValue":g!==v&&(q=!0),u=g;break;case"children":case"dangerouslySetInnerHTML":if(g!=null)throw Error(S(137,e));break;default:g!==v&&X(t,e,d,g,l,v)}}Bc(t,o,u,s,m,p,i,a);return;case"select":g=o=u=d=null;for(i in n)if(s=n[i],n.hasOwnProperty(i)&&s!=null)switch(i){case"value":break;case"multiple":g=s;default:l.hasOwnProperty(i)||X(t,e,i,null,l,s)}for(a in l)if(i=l[a],s=n[a],l.hasOwnProperty(a)&&(i!=null||s!=null))switch(a){case"value":i!==s&&(q=!0),d=i;break;case"defaultValue":i!==s&&(q=!0),u=i;break;case"multiple":i!==s&&(q=!0),o=i;default:i!==s&&X(t,e,a,i,l,s)}e=u,n=o,l=g,d!=null?pa(t,!!n,d,!1):!!l!=!!n&&(e!=null?pa(t,!!n,e,!0):pa(t,!!n,n?[]:"",!1));return;case"textarea":g=d=null;for(u in n)if(a=n[u],n.hasOwnProperty(u)&&a!=null&&!l.hasOwnProperty(u))switch(u){case"value":break;case"children":break;default:X(t,e,u,null,l,a)}for(o in l)if(a=l[o],i=n[o],l.hasOwnProperty(o)&&(a!=null||i!=null))switch(o){case"value":a!==i&&(q=!0),d=a;break;case"defaultValue":a!==i&&(q=!0),g=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(S(91));break;default:a!==i&&X(t,e,o,a,l,i)}r0(t,d,g);return;case"option":for(var E in n)d=n[E],n.hasOwnProperty(E)&&d!=null&&!l.hasOwnProperty(E)&&(E==="selected"?t.selected=!1:X(t,e,E,null,l,d));for(s in l)d=l[s],g=n[s],l.hasOwnProperty(s)&&d!==g&&(d!=null||g!=null)&&(s==="selected"?(d!==g&&(q=!0),t.selected=d&&typeof d!="function"&&typeof d!="symbol"):X(t,e,s,d,l,g));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var _ in n)d=n[_],n.hasOwnProperty(_)&&d!=null&&!l.hasOwnProperty(_)&&X(t,e,_,null,l,d);for(m in l)if(d=l[m],g=n[m],l.hasOwnProperty(m)&&d!==g&&(d!=null||g!=null))switch(m){case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(S(137,e));break;default:X(t,e,m,d,l,g)}return;default:if(jf(e)){for(var N in n)d=n[N],n.hasOwnProperty(N)&&d!==void 0&&!l.hasOwnProperty(N)&&Af(t,e,N,void 0,l,d);for(p in l)d=l[p],g=n[p],!l.hasOwnProperty(p)||d===g||d===void 0&&g===void 0||Af(t,e,p,d,l,g);return}}for(var f in n)d=n[f],n.hasOwnProperty(f)&&d!=null&&!l.hasOwnProperty(f)&&X(t,e,f,null,l,d);for(v in l)d=l[v],g=n[v],!l.hasOwnProperty(v)||d===g||d==null&&g==null||X(t,e,v,d,l,g)}function gg(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function GE(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),l=0;l<n.length;l++){var a=n[l],i=a.transferSize,o=a.initiatorType,u=a.duration;if(i&&u&&gg(o)){for(o=0,u=a.responseEnd,l+=1;l<n.length;l++){var s=n[l],m=s.startTime;if(m>u)break;var p=s.transferSize,v=s.initiatorType;p&&gg(v)&&(s=s.responseEnd,o+=p*(s<u?1:(u-m)/(s-m)))}if(--l,e+=8*(i+o)/(a.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Mf=null,Cf=null;function Qi(t){return t.nodeType===9?t:t.ownerDocument}function yg(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function pv(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function hv(t,e,n,l){return n=Qi(n).createElement(t),n[_t]=l,n[It]=e,Ct(n,t,e),wt(n),n}function Of(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var xc=null;function QE(){var t=window.event;return t&&t.type==="popstate"?t===xc?!1:(xc=t,!0):(xc=null,!1)}var Cd=typeof setTimeout=="function"?setTimeout:void 0,KE=typeof clearTimeout=="function"?clearTimeout:void 0,vg=typeof Promise=="function"?Promise:void 0,bg=typeof requestAnimationFrame=="function"?requestAnimationFrame:Cd,ZE=typeof queueMicrotask=="function"?queueMicrotask:typeof vg<"u"?function(t){return vg.resolve(null).then(t).catch(JE)}:Cd;function JE(t){setTimeout(function(){throw t})}function el(t){return t==="head"}function Sg(t,e){var n=e,l=0;do{var a=n.nextSibling;if(t.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"||n==="/&"){if(l===0){t.removeChild(a),Da(e);return}l--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")l++;else if(n==="html")_c(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,_c(n);for(var i=n.firstChild;i;){var o=i.nextSibling,u=i.nodeName;i[eo]||u==="SCRIPT"||u==="STYLE"||u==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=o}}else n==="body"&&_c(t.ownerDocument.body);n=a}while(n);Da(e)}function wg(t,e){var n=t;t=0;do{var l=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=l}while(n)}function gv(t,e,n){if(e=CSS.escape(e)!==e?"r-"+btoa(e).replace(/=/g,""):e,t.style.viewTransitionName=e,n!=null&&(t.style.viewTransitionClass=n),n=getComputedStyle(t),n.display==="inline"){if(e=t.getClientRects(),e.length===1)var l=1;else for(var a=l=0;a<e.length;a++){var i=e[a];0<i.width&&0<i.height&&l++}l===1&&(t=t.style,t.display=e.length===1?"inline-block":"block",t.marginTop="-"+n.paddingTop,t.marginBottom="-"+n.paddingBottom)}}function yv(t,e){t=t.style,e=e.style;var n=e!=null?e.hasOwnProperty("viewTransitionName")?e.viewTransitionName:e.hasOwnProperty("view-transition-name")?e["view-transition-name"]:null:null;t.viewTransitionName=n==null||typeof n=="boolean"?"":(""+n).trim(),n=e!=null?e.hasOwnProperty("viewTransitionClass")?e.viewTransitionClass:e.hasOwnProperty("view-transition-class")?e["view-transition-class"]:null:null,t.viewTransitionClass=n==null||typeof n=="boolean"?"":(""+n).trim(),t.display==="inline-block"&&(e==null?t.display=t.margin="":(n=e.display,t.display=n==null||typeof n=="boolean"?"":n,n=e.margin,n!=null?t.margin=n:(n=e.hasOwnProperty("marginTop")?e.marginTop:e["margin-top"],t.marginTop=n==null||typeof n=="boolean"?"":n,e=e.hasOwnProperty("marginBottom")?e.marginBottom:e["margin-bottom"],t.marginBottom=e==null||typeof e=="boolean"?"":e)))}function vv(t,e,n){return n=n.ownerDocument.defaultView,{rect:t,abs:e.position==="absolute"||e.position==="fixed",clip:e.clipPath!=="none"||e.overflow!=="visible"||e.filter!=="none"||e.mask!=="none"||e.mask!=="none"||e.borderRadius!=="0px",view:0<=t.bottom&&0<=t.right&&t.top<=n.innerHeight&&t.left<=n.innerWidth}}function Rf(t){var e=t.getBoundingClientRect(),n=getComputedStyle(t);return vv(e,n,t)}function IE(t){var e=t.getBoundingClientRect();e=new DOMRect(e.x+2e4,e.y+2e4,e.width,e.height);var n=getComputedStyle(t);return vv(e,n,t)}function WE(t){return t.documentElement.clientHeight}function PE(t){this.addEventListener("load",t),this.addEventListener("error",t)}function FE(t,e,n,l,a,i,o,u,s){var m=e.nodeType===9?e:e.ownerDocument;try{var p=m.startViewTransition({update:function(){var d=m.defaultView,g=d.navigation&&d.navigation.transition,E=m.fonts.status;l();var _=[];if(E==="loaded"&&(WE(m),m.fonts.status==="loading"&&_.push(m.fonts.ready)),E=_.length,t!==null)for(var N=t.suspenseyImages,f=0,c=0;c<N.length;c++){var y=N[c];if(!y.complete){var b=y.getBoundingClientRect();if(0<b.bottom&&0<b.right&&b.top<d.innerHeight&&b.left<d.innerWidth){if(f+=Ov(y),f>Du){_.length=E;break}y=new Promise(PE.bind(y)),_.push(y)}}}if(0<_.length)return d=Promise.race([Promise.all(_),new Promise(function(x){return setTimeout(x,500)})]).then(a,a),(g?Promise.allSettled([g.finished,d]):d).then(i,i);if(a(),g)return g.finished.then(i,i);i()},types:n});m.__reactViewTransition=p;var v=[];return p.ready.then(function(){for(var d=m.documentElement.getAnimations({subtree:!0}),g=0;g<d.length;g++){var E=d[g],_=E.effect,N=_.pseudoElement;if(N!=null&&N.startsWith("::view-transition")){v.push(E),E=_.getKeyframes();for(var f=N=void 0,c=!0,y=0;y<E.length;y++){var b=E[y],x=b.width;if(N===void 0)N=x;else if(N!==x){c=!1;break}if(x=b.height,f===void 0)f=x;else if(f!==x){c=!1;break}delete b.width,delete b.height,b.transform==="none"&&delete b.transform}c&&N!==void 0&&f!==void 0&&(_.setKeyframes(E),c=getComputedStyle(_.target,_.pseudoElement),c.width!==N||c.height!==f)&&(c=E[0],c.width=N,c.height=f,c=E[E.length-1],c.width=N,c.height=f,_.setKeyframes(E))}}o()},function(d){m.__reactViewTransition===p&&(m.__reactViewTransition=null);try{typeof d=="object"&&d!==null&&d.name==="InvalidStateError"&&(d.message==="View transition was skipped because document visibility state is hidden."||d.message==="Skipping view transition because document visibility state has become hidden."||d.message==="Skipping view transition because viewport size changed."||d.message==="Transition was aborted because of invalid state")&&(d=null),d!==null&&s(d)}finally{l(),a(),o()}}),p.finished.finally(function(){for(var d=0;d<v.length;d++)v[d].cancel();m.__reactViewTransition===p&&(m.__reactViewTransition=null),u()}),p}catch{return l(),a(),o(),null}}function hl(t,e){this._scope=document.documentElement,this._selector="::view-transition-"+t+"("+e+")"}hl.prototype.animate=function(t,e){return e=typeof e=="number"?{duration:e}:Z({},e),e.pseudoElement=this._selector,this._scope.animate(t,e)};hl.prototype.getAnimations=function(){for(var t=this._scope,e=this._selector,n=t.getAnimations({subtree:!0}),l=[],a=0;a<n.length;a++){var i=n[a].effect;i!==null&&i.target===t&&i.pseudoElement===e&&l.push(n[a])}return l};hl.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function bv(t){return{name:t,group:new hl("group",t),imagePair:new hl("image-pair",t),old:new hl("old",t),new:new hl("new",t)}}function se(t){this._fragmentFiber=t,this._observers=this._eventListeners=null}se.prototype.addEventListener=function(t,e,n){var l=null,a=null;if(!(n!=null&&typeof n!="boolean"&&(l=n.signal||null,l!==null&&l.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var i=this._eventListeners;if(Sv(i,t,e,n)===-1){var o=this,u=e;n!=null&&typeof n!="boolean"&&n.once===!0&&(u=function(s){o.removeEventListener(t,e,n),typeof e=="function"?e.call(this,s):e.handleEvent(s)}),l!==null&&(a=o.removeEventListener.bind(o,t,e,n),l.addEventListener("abort",a,{once:!0}),a=l.removeEventListener.bind(l,"abort",a)),l=Ra(n),i.push({type:t,listener:e,optionsOrUseCapture:n,attachedListener:u,cleanup:a}),Jt(this._fragmentFiber.child,!1,tx,t,u,l)}this._eventListeners=i}};function tx(t,e,n,l){return yt(t).addEventListener(e,n,l),!1}se.prototype.removeEventListener=function(t,e,n){var l=this._eventListeners;if(l!==null&&(e=Sv(l,t,e,n),e!==-1)){var a=l[e];n=a.attachedListener;var i=a.cleanup;a=Ra(a.optionsOrUseCapture),Jt(this._fragmentFiber.child,!1,ex,t,n,a),l.splice(e,1),i!==null&&i()}};function ex(t,e,n,l){return yt(t).removeEventListener(e,n,l),!1}function Ra(t){return t!=null&&typeof t!="boolean"&&(t.once===!0||t.signal instanceof AbortSignal)?{capture:t.capture,passive:t.passive}:t}function Eg(t){return t==null?"c=0":typeof t=="boolean"?"c="+(t?"1":"0"):"c="+(t.capture?"1":"0")}function Sv(t,e,n,l){if(t.length===0)return-1;l=Eg(l);for(var a=0;a<t.length;a++){var i=t[a];if(i.type===e&&i.listener===n&&Eg(i.optionsOrUseCapture)===l)return a}return-1}se.prototype.dispatchEvent=function(t){var e=Cl(this._fragmentFiber);if(e===null)return!0;e=yt(e);var n=this._eventListeners;if(n!==null&&0<n.length||!t.bubbles){var l=e.nodeType===9?e.createComment(""):document.createTextNode("");if(n)for(var a=0;a<n.length;a++){var i=n[a];l.addEventListener(i.type,i.attachedListener,Ra(i.optionsOrUseCapture))}if(e.appendChild(l),t=l.dispatchEvent(t),n)for(a=0;a<n.length;a++)i=n[a],l.removeEventListener(i.type,i.attachedListener,Ra(i.optionsOrUseCapture));return e.removeChild(l),t}return e.dispatchEvent(t)};se.prototype.focus=function(t){Jt(this._fragmentFiber.child,!0,wv,t,void 0,void 0)};function wv(t,e){return t.tag===6?!1:(t=yt(t),mx(t,e))}se.prototype.focusLast=function(t){var e=[];Jt(this._fragmentFiber.child,!0,Od,e,void 0,void 0);for(var n=e.length-1;0<=n&&!wv(e[n],t);n--);};function Od(t,e){return e.push(t),!1}se.prototype.blur=function(){var t=Cl(this._fragmentFiber);t!==null&&(t=yt(t),t=Qi(t).activeElement,t!==null&&Jt(this._fragmentFiber.child,!1,nx,t,void 0,void 0))};function nx(t,e){return t.tag===6?!1:(t=yt(t),t===e||t.contains(e)?(e.blur(),!0):!1)}se.prototype.observeUsing=function(t){this._observers===null&&(this._observers=new Set),this._observers.add(t),Jt(this._fragmentFiber.child,!1,lx,t,void 0,void 0)};function lx(t,e){return t.tag===6||(t=yt(t),e.observe(t)),!1}se.prototype.unobserveUsing=function(t){var e=this._observers;if(e!==null&&e.has(t)){e.delete(t),Jt(this._fragmentFiber.child,!1,ax,t,void 0,void 0);for(var n=e=0;n<Me.length;n++){var l=Me[n];l.fragmentInstance===this&&l.observer===t?t.unobserve(l.instance):Me[e++]=l}Me.length=e}};function ax(t,e){return t.tag===6||(t=yt(t),e.unobserve(t)),!1}var Me=[],Tc=!1;function ix(t,e,n){Me.push({fragmentInstance:t,observer:e,instance:n}),Tc||(Tc=!0,px(function(){Tc=!1;var l=Me;Me=[];for(var a=0;a<l.length;a++){var i=l[a];i.observer.unobserve(i.instance)}}))}se.prototype.getClientRects=function(){var t=[];return Jt(this._fragmentFiber.child,!1,ox,t,void 0,void 0),t};function ox(t,e){if(t.tag===6){t=t.stateNode;var n=t.ownerDocument.createRange();n.selectNodeContents(t),e.push.apply(e,n.getClientRects())}else t=yt(t),e.push.apply(e,t.getClientRects());return!1}se.prototype.getRootNode=function(t){var e=Cl(this._fragmentFiber);return e===null?this:yt(e).getRootNode(t)};se.prototype.compareDocumentPosition=function(t){var e=Cl(this._fragmentFiber);if(e===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];Jt(this._fragmentFiber.child,!1,Od,n,void 0,void 0);var l=yt(e);if(n.length===0){if(n=l,eh(this._fragmentFiber)){t:{for(e=this._fragmentFiber.return;e!==null;){if(e.tag===4){e=e.stateNode.containerInfo;break t}if(e.tag===3||e.tag===5||e.tag===27)break;e=e.return}e=null}e!=null&&(n=e)}e=this._fragmentFiber;var a=l=n.compareDocumentPosition(t);return n===t?a=Node.DOCUMENT_POSITION_CONTAINS:l&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=jg(e)[1],n===null?a=Node.DOCUMENT_POSITION_PRECEDING:(t=yt(n).compareDocumentPosition(t),a=t===0||t&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),a|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}e=yt(n[0]),a=yt(n[n.length-1]);var i=eh(this._fragmentFiber)?e.parentElement:l;if(i==null)return Node.DOCUMENT_POSITION_DISCONNECTED;l=i.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_CONTAINED_BY,i=i.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=e.compareDocumentPosition(t),u=a.compareDocumentPosition(t),s=o&Node.DOCUMENT_POSITION_CONTAINED_BY||u&Node.DOCUMENT_POSITION_CONTAINED_BY;return u=l&&i&&o&Node.DOCUMENT_POSITION_FOLLOWING&&u&Node.DOCUMENT_POSITION_PRECEDING,e=l&&e===t||i&&a===t||s||u?Node.DOCUMENT_POSITION_CONTAINED_BY:!l&&e===t||!i&&a===t?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,e&Node.DOCUMENT_POSITION_DISCONNECTED||e&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||ux(e,this._fragmentFiber,n[0],n[n.length-1],t)?e:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function ux(t,e,n,l,a){var i=pl(a);if(t&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!i)t:{for(;i!==null;){if(i.tag===7&&(i===e||i.alternate===e)){n=!0;break t}i=i.return}n=!1}return n}if(t&Node.DOCUMENT_POSITION_CONTAINS){if(i===null)return i=a.ownerDocument,a===i||a===i.documentElement||a===i.body;t:{for(i=e,e=Cl(e);i!==null;){if(!(i.tag!==5&&i.tag!==3&&i.tag!==27||i!==e&&i.alternate!==e)){i=!0;break t}i=i.return}i=!1}return i}return t&Node.DOCUMENT_POSITION_PRECEDING?((e=!!i)&&!(e=i===n)&&(e=Ac(n,i,nh),e===null?e=!1:(Jt(e,!0,HS,i,n),i=ea,ea=null,e=i!==null)),e):t&Node.DOCUMENT_POSITION_FOLLOWING?((e=!!i)&&!(e=i===l)&&(e=Ac(l,i,nh),e===null?e=!1:(Jt(e,!0,BS,i,l),i=ea,Nc=ea=null,e=i!==null)),e):!1}function xg(t,e){var n=t.ownerDocument.createRange();n.selectNodeContents(t),t=n.getBoundingClientRect(),window.scrollTo(window.scrollX+t.left,e?window.scrollY+t.top:window.scrollY+t.bottom-window.innerHeight)}se.prototype.scrollIntoView=function(t){if(typeof t=="object")throw Error(S(566));var e=[];Jt(this._fragmentFiber.child,!1,Od,e,void 0,void 0);var n=t!==!1;if(e.length===0){var l=jg(this._fragmentFiber);if(l=n?l[1]||l[0]||Cl(this._fragmentFiber):l[0]||l[1],l===null)return;if(l.tag===6){t=yt(l),xg(t,n);return}if(l=yt(l),l.nodeType!==9){if(l.nodeType===11){n="host"in l?l.host:null,n!==null&&n.scrollIntoView(t);return}l.scrollIntoView(t)}}for(l=n?e.length-1:0;l!==(n?-1:e.length);){var a=e[l];a.tag===6?(a=yt(a),xg(a,n)):yt(a).scrollIntoView(t),l+=n?-1:1}};function rx(t,e){return t=yt(t),Ev(t,e),!1}function Ev(t,e){t.reactFragments==null&&(t.reactFragments=new Set),t.reactFragments.add(e)}function xv(t,e){var n=e._eventListeners;if(n!==null)for(var l=0;l<n.length;l++){var a=n[l];t.addEventListener(a.type,a.attachedListener,Ra(a.optionsOrUseCapture))}t.nodeType!==3&&(n=e._observers,n!==null&&n.forEach(function(i){for(var o=0,u=0;u<Me.length;u++){var s=Me[u];(s.fragmentInstance!==e||s.observer!==i||s.instance!==t)&&(Me[o++]=s)}Me.length=o,i.observe(t)}),Ev(t,e))}function sx(t,e){var n=e._eventListeners;if(n!==null)for(var l=0;l<n.length;l++){var a=n[l];t.removeEventListener(a.type,a.attachedListener,Ra(a.optionsOrUseCapture))}t.nodeType!==3&&(n=e._observers,n!==null&&n.forEach(function(i){typeof i.rootMargin=="string"?ix(e,i,t):i.unobserve(t)}),t.reactFragments!=null&&t.reactFragments.delete(e))}function zf(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":zf(n),pr(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function cx(t,e,n,l){for(;t.nodeType===1;){var a=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!l&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(l){if(!t[eo])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(i=t.getAttribute("rel"),i==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(i!==a.rel||t.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||t.getAttribute("title")!==(a.title==null?null:a.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(i=t.getAttribute("src"),(i!==(a.src==null?null:a.src)||t.getAttribute("type")!==(a.type==null?null:a.type)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&i&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var i=a.name==null?null:""+a.name;if(a.type==="hidden"&&t.getAttribute("name")===i)return t}else return t;if(t=Ee(t.nextSibling),t===null)break}return null}function fx(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Ee(t.nextSibling),t===null))return null;return t}function Tv(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Ee(t.nextSibling),t===null))return null;return t}function Uf(t){return t.data==="$?"||t.data==="$~"}function Rd(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function dx(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var l=function(){e(),n.removeEventListener("DOMContentLoaded",l)};n.addEventListener("DOMContentLoaded",l),t._reactRetry=l}}function Ee(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var Lf=null;function Tg(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Ee(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function _g(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function mx(t,e){function n(){l=!0}if(t.ownerDocument.activeElement===t)return!0;var l=!1;try{t.ownerDocument.addEventListener("focus",n,!0),(t.focus||HTMLElement.prototype.focus).call(t,e)}finally{t.ownerDocument.removeEventListener("focus",n,!0)}return l}function px(t){bg(function(){bg(function(e){return t(e)})})}function _v(t,e,n){switch(e=Qi(n),t){case"html":if(t=e.documentElement,!t)throw Error(S(452));return t;case"head":if(t=e.head,!t)throw Error(S(453));return t;case"body":if(t=e.body,!t)throw Error(S(454));return t;default:throw Error(S(451))}}function Nv(t,e,n){for(var l in n){var a=n[l];n.hasOwnProperty(l)&&a!=null&&X(t,e,l,null,jE,a)}n.dangerouslySetInnerHTML!=null&&(t.textContent=""),t.onclick===Ye&&(t.onclick=null),pr(t)}function _c(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);pr(t)}var xe=new Map,Ng=new Set;function Ki(t){if(typeof t.getRootNode=="function"){var e=t.getRootNode();if(e.nodeType===9||e.nodeType===11)return e}return t.nodeType===9?t:t.ownerDocument}var yn=V.d;V.d={f:hx,r:gx,D:yx,C:vx,L:bx,m:Sx,X:Ex,S:wx,M:xx};function hx(){var t=yn.f(),e=Mr();return t||e}function gx(t){var e=Ha(t);e!==null&&e.tag===5&&e.type==="form"?cy(e):yn.r(t)}var Va=typeof document>"u"?null:document;function Av(t,e,n){var l=Va;if(l&&typeof e=="string"&&e){var a=be(e);a='link[rel="'+t+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),Ng.has(a)||(Ng.add(a),t={rel:t,crossOrigin:n,href:e},l.querySelector(a)===null&&(e=l.createElement("link"),Ct(e,"link",t),wt(e),l.head.appendChild(e)))}}function yx(t){yn.D(t),Av("dns-prefetch",t,null)}function vx(t,e){yn.C(t,e),Av("preconnect",t,e)}function bx(t,e,n){yn.L(t,e,n);var l=Va;if(l&&t&&e){var a='link[rel="preload"][as="'+be(e)+'"]';e==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+be(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+be(n.imageSizes)+'"]')):a+='[href="'+be(t)+'"]';var i=a;switch(e){case"style":i=za(t);break;case"script":i=Ya(t)}if(!(xe.has(i)||(t=Z({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),xe.set(i,t),l.querySelector(a)!==null||e==="style"&&l.querySelector(uo(i))||e==="script"&&l.querySelector(ro(i))))){var o=l.createElement("link");Ct(o,"link",t),e==="style"&&(o[Yu]=!0,o.onload=o.onerror=function(){n0(o)}),wt(o),l.head.appendChild(o)}}}function Sx(t,e){yn.m(t,e);var n=Va;if(n&&t){var l=e&&typeof e.as=="string"?e.as:"script",a='link[rel="modulepreload"][as="'+be(l)+'"][href="'+be(t)+'"]',i=a;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Ya(t)}if(!xe.has(i)&&(t=Z({rel:"modulepreload",href:t},e),xe.set(i,t),n.querySelector(a)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(ro(i)))return}l=n.createElement("link"),Ct(l,"link",t),wt(l),n.head.appendChild(l)}}}function wx(t,e,n){yn.S(t,e,n);var l=Va;if(l&&t){var a=ma(l).hoistableStyles,i=za(t);e=e||"default";var o=a.get(i);if(!o){var u={loading:0,preload:null};if(o=l.querySelector(uo(i)))u.loading=5;else{t=Z({rel:"stylesheet",href:t,"data-precedence":e},n),(n=xe.get(i))&&zd(t,n);var s=o=l.createElement("link");wt(s),Ct(s,"link",t),s._p=new Promise(function(m,p){s.onload=m,s.onerror=p}),s.addEventListener("load",function(){u.loading|=1}),s.addEventListener("error",function(){u.loading|=2}),u.loading|=4,Uu(o,e,l)}o={type:"stylesheet",instance:o,count:1,state:u},a.set(i,o)}}}function Ex(t,e){yn.X(t,e);var n=Va;if(n&&t){var l=ma(n).hoistableScripts,a=Ya(t),i=l.get(a);i||(i=n.querySelector(ro(a)),i||(t=Z({src:t,async:!0},e),(e=xe.get(a))&&Ud(t,e),i=n.createElement("script"),wt(i),Ct(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(a,i))}}function xx(t,e){yn.M(t,e);var n=Va;if(n&&t){var l=ma(n).hoistableScripts,a=Ya(t),i=l.get(a);i||(i=n.querySelector(ro(a)),i||(t=Z({src:t,async:!0,type:"module"},e),(e=xe.get(a))&&Ud(t,e),i=n.createElement("script"),wt(i),Ct(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(a,i))}}function Ag(t,e,n,l){var a=(a=qn.current)?Ki(a):null;if(!a)throw Error(S(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(n=za(n.href),e=ma(a).hoistableStyles,l=e.get(n),l||(l={type:"style",instance:null,count:0,state:null},e.set(n,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=za(n.href);var i=ma(a).hoistableStyles,o=i.get(t);if(o||(a=a.ownerDocument||a,o={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(t,o),(i=a.querySelector(uo(t)))?i._p||(o.instance=i,o.state.loading=5):(i=xe.get(t),i||(i={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},xe.set(t,i)),Tx(a,t,i,o.state))),e&&l===null)throw Error(S(528,""));return o}if(e&&l!==null)throw Error(S(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(n=Ya(n),e=ma(a).hoistableScripts,l=e.get(n),l||(l={type:"script",instance:null,count:0,state:null},e.set(n,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(S(444,t))}}function za(t){return'href="'+be(t)+'"'}function uo(t){return'link[rel="stylesheet"]['+t+"]"}function Mv(t){return Z({},t,{"data-precedence":t.precedence,precedence:null})}function Tx(t,e,n,l){if(e=t.querySelector('link[rel="preload"][as="style"]['+e+"]")){if(e[Yu]!==!0){l.loading=1;return}}else e=t.createElement("link"),e[Yu]=!0,e.onload=e.onerror=n0.bind(null,e),Ct(e,"link",n),wt(e),t.head.appendChild(e);l.preload=e,e.addEventListener("load",function(){return l.loading|=1}),e.addEventListener("error",function(){return l.loading|=2})}function Ya(t){return'[src="'+be(t)+'"]'}function ro(t){return"script[async]"+t}function Mg(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var l=t.querySelector('style[data-href~="'+be(n.href)+'"]');if(l)return e.instance=l,wt(l),l;var a=Z({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return l=(t.ownerDocument||t).createElement("style"),wt(l),Ct(l,"style",a),Uu(l,n.precedence,t),e.instance=l;case"stylesheet":a=za(n.href);var i=t.querySelector(uo(a));if(i)return e.state.loading|=4,e.instance=i,wt(i),i;l=Mv(n),(a=xe.get(a))&&zd(l,a),i=(t.ownerDocument||t).createElement("link"),wt(i);var o=i;return o._p=new Promise(function(u,s){o.onload=u,o.onerror=s}),Ct(i,"link",l),e.state.loading|=4,Uu(i,n.precedence,t),e.instance=i;case"script":return i=Ya(n.src),(a=t.querySelector(ro(i)))?(e.instance=a,wt(a),a):(l=n,(a=xe.get(i))&&(l=Z({},n),Ud(l,a)),t=t.ownerDocument||t,a=t.createElement("script"),wt(a),Ct(a,"link",l),t.head.appendChild(a),e.instance=a);case"void":return null;default:throw Error(S(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(l=e.instance,e.state.loading|=4,Uu(l,n.precedence,t));return e.instance}function Uu(t,e,n){for(var l=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=l.length?l[l.length-1]:null,i=a,o=0;o<l.length;o++){var u=l[o];if(u.dataset.precedence===e)i=u;else if(i!==a)break}i?i.parentNode.insertBefore(t,i.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function zd(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function Ud(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var Lu=null;function Cg(t,e,n){if(Lu===null){var l=new Map,a=Lu=new Map;a.set(n,l)}else a=Lu,l=a.get(n),l||(l=new Map,a.set(n,l));if(l.has(t))return l;for(l.set(t,null),n=n.getElementsByTagName(t),a=0;a<n.length;a++){var i=n[a];if(!(i[eo]||i[_t]||t==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var o=i.getAttribute(e)||"";o=t+o;var u=l.get(o);u?u.push(i):l.set(o,[i])}}return l}function Df(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function _x(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;return e.rel==="stylesheet"?(t=e.disabled,typeof e.precedence=="string"&&t==null):!0;case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function Og(t,e){return t==="img"&&e.src!=null&&e.src!==""&&e.onLoad==null&&e.loading!=="lazy"}function Cv(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function Ov(t){return(t.width||100)*(t.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function Rg(t,e){typeof e.decode=="function"&&(t.imgCount++,e.complete||(t.imgBytes+=Ov(e),t.suspenseyImages.push(e)),t=Mx.bind(t),e.decode().then(t,t))}function Nx(t,e,n,l){if(n.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var a=za(l.href),i=e.querySelector(uo(a));if(i){e=i._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Zi.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=i,wt(i);return}i=e.ownerDocument||e,l=Mv(l),(a=xe.get(a))&&zd(l,a),i=i.createElement("link"),wt(i);var o=i;o._p=new Promise(function(u,s){o.onload=u,o.onerror=s}),Ct(i,"link",l),n.instance=i}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&(n.state.loading&3)===0&&(t.count++,n=Zi.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var Du=0;function Ax(t,e){return t.stylesheets&&t.count===0&&$u(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var l=setTimeout(function(){if(t.stylesheets&&$u(t,t.stylesheets),t.unsuspend){var i=t.unsuspend;t.unsuspend=null,i()}},6e4+e);0<t.imgBytes&&Du===0&&(Du=62500*GE());var a=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&$u(t,t.stylesheets),t.unsuspend)){var i=t.unsuspend;t.unsuspend=null,i()}},(t.imgBytes>Du?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(l),clearTimeout(a)}}:null}function Rv(t){if(t.count===0&&(t.imgCount===0||!t.waitingForImages)){if(t.stylesheets)$u(t,t.stylesheets);else if(t.unsuspend){var e=t.unsuspend;t.unsuspend=null,e()}}}function Zi(){this.count--,Rv(this)}function Mx(){this.imgCount--,Rv(this)}var fr=null;function $u(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,fr=new Map,e.forEach(Cx,t),fr=null,Zi.call(t))}function Cx(t,e){if(!(e.state.loading&4)){var n=fr.get(t);if(n)var l=n.get(null);else{n=new Map,fr.set(t,n);for(var a=t.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<a.length;i++){var o=a[i];(o.nodeName==="LINK"||o.getAttribute("media")!=="not all")&&(n.set(o.dataset.precedence,o),l=o)}l&&n.set(null,l)}a=e.instance,o=a.getAttribute("data-precedence"),i=n.get(o)||l,i===l&&n.set(null,a),n.set(o,a),this.count++,l=Zi.bind(this),a.addEventListener("load",l),a.addEventListener("error",l),i?i.parentNode.insertBefore(a,i.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(a,t.firstChild)),e.state.loading|=4}}var Ua={$$typeof:Ve,Provider:null,Consumer:null,_currentValue:gl,_currentValue2:gl,_threadCount:0};function Ox(t,e,n,l,a,i,o,u,s){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Fs(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Fs(0),this.hiddenUpdates=Fs(null),this.identifierPrefix=l,this.onUncaughtError=a,this.onCaughtError=i,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=s,this.transitionTypes=null,this.incompleteTransitions=new Map}function zv(t,e,n,l,a,i,o,u,s,m,p,v){return t=new Ox(t,e,n,o,s,m,p,v,u),e=1,i===!0&&(e|=24),i=Kt(3,null,null,e),t.current=i,i.stateNode=t,e=Ff(),e.refCount++,t.pooledCache=e,e.refCount++,i.memoizedState={element:l,isDehydrated:n,cache:e},nd(i),t}function Uv(t){return t?(t=sa,t):sa}function Lv(t,e,n,l,a,i){a=Uv(a),l.context===null?l.context=a:l.pendingContext=a,l=Vn(e),l.payload={element:n},i=i===void 0?null:i,i!==null&&(l.callback=i),n=Yn(t,l,e),n!==null&&(Zt(n,t,e),Ni(n,t,e))}function zg(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Ld(t,e){zg(t,e),(t=t.alternate)&&zg(t,e)}function Dv(t){if(t.tag===13||t.tag===31){var e=zl(t,67108864);e!==null&&Zt(e,t,67108864),Ld(t,67108864)}}function Ug(t){if(t.tag===13||t.tag===31){var e=ue();e=Vf(e);var n=zl(t,e);n!==null&&Zt(n,t,e),Ld(t,e)}}var La=!0;function Rx(t,e,n,l){var a=O.T;O.T=null;var i=V.p;try{V.p=2,Dd(t,e,n,l)}finally{V.p=i,O.T=a}}function zx(t,e,n,l){var a=O.T;O.T=null;var i=V.p;try{V.p=8,Dd(t,e,n,l)}finally{V.p=i,O.T=a}}function Dd(t,e,n,l){if(La){var a=$f(l);if(a===null)Ec(t,e,l,dr,n),Lg(t,l);else if(Lx(a,t,e,n,l))l.stopPropagation();else if(Lg(t,l),e&4&&-1<Ux.indexOf(t)){for(;a!==null;){var i=Ha(a);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var o=fl(i.pendingLanes);if(o!==0){var u=i;for(u.pendingLanes|=2,u.entangledLanes|=2;o;){var s=1<<31-oe(o);u.entanglements[1]|=s,o&=~s}Je(i),(k&6)===0&&(or=ae()+500,oo(0,!1))}}break;case 31:case 13:u=zl(i,2),u!==null&&Zt(u,i,2),Mr(),Ld(i,2)}if(i=$f(l),i===null&&Ec(t,e,l,dr,n),i===a)break;a=i}a!==null&&l.stopPropagation()}else Ec(t,e,l,null,n)}}function $f(t){return t=Xf(t),$d(t)}var dr=null;function $d(t){if(dr=null,t=pl(t),t!==null){var e=Wi(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=kg(e),t!==null)return t;t=null}else if(n===31){if(t=Vg(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return dr=t,null}function $v(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(KS()){case Kg:return 2;case Zg:return 8;case Vu:case ZS:return 32;case Jg:return 268435456;default:return 32}default:return 32}}var Hf=!1,Qn=null,Kn=null,Zn=null,Ji=new Map,Ii=new Map,zn=[],Ux="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Lg(t,e){switch(t){case"focusin":case"focusout":Qn=null;break;case"dragenter":case"dragleave":Kn=null;break;case"mouseover":case"mouseout":Zn=null;break;case"pointerover":case"pointerout":Ji.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ii.delete(e.pointerId)}}function hi(t,e,n,l,a,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:l,nativeEvent:i,targetContainers:[a]},e!==null&&(e=Ha(e),e!==null&&Dv(e)),t):(t.eventSystemFlags|=l,e=t.targetContainers,a!==null&&e.indexOf(a)===-1&&e.push(a),t)}function Lx(t,e,n,l,a){switch(e){case"focusin":return Qn=hi(Qn,t,e,n,l,a),!0;case"dragenter":return Kn=hi(Kn,t,e,n,l,a),!0;case"mouseover":return Zn=hi(Zn,t,e,n,l,a),!0;case"pointerover":var i=a.pointerId;return Ji.set(i,hi(Ji.get(i)||null,t,e,n,l,a)),!0;case"gotpointercapture":return i=a.pointerId,Ii.set(i,hi(Ii.get(i)||null,t,e,n,l,a)),!0}return!1}function Hv(t){var e=pl(t.target);if(e!==null){var n=Wi(e);if(n!==null){if(e=n.tag,e===13){if(e=kg(n),e!==null){t.blockedOn=e,oh(t.priority,function(){Ug(n)});return}}else if(e===31){if(e=Vg(n),e!==null){t.blockedOn=e,oh(t.priority,function(){Ug(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Hu(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=$f(t.nativeEvent);if(n===null){n=t.nativeEvent;var l=new n.constructor(n.type,n);qc=l,n.target.dispatchEvent(l),qc=null}else return e=Ha(n),e!==null&&Dv(e),t.blockedOn=n,!1;e.shift()}return!0}function Dg(t,e,n){Hu(t)&&n.delete(e)}function Dx(){Hf=!1,Qn!==null&&Hu(Qn)&&(Qn=null),Kn!==null&&Hu(Kn)&&(Kn=null),Zn!==null&&Hu(Zn)&&(Zn=null),Ji.forEach(Dg),Ii.forEach(Dg)}function yu(t,e){t.blockedOn===e&&(t.blockedOn=null,Hf||(Hf=!0,vt.unstable_scheduleCallback(vt.unstable_NormalPriority,Dx)))}var vu=null;function $g(t){vu!==t&&(vu=t,vt.unstable_scheduleCallback(vt.unstable_NormalPriority,function(){vu===t&&(vu=null);for(var e=0;e<t.length;e+=3){var n=t[e],l=t[e+1],a=t[e+2];if(typeof l!="function"){if($d(l||n)===null)continue;break}var i=Ha(n);i!==null&&(t.splice(e,3),e-=3,ef(i,{pending:!0,data:a,method:n.method,action:l},l,a))}}))}function Da(t){function e(s){return yu(s,t)}Qn!==null&&yu(Qn,t),Kn!==null&&yu(Kn,t),Zn!==null&&yu(Zn,t),Ji.forEach(e),Ii.forEach(e);for(var n=0;n<zn.length;n++){var l=zn[n];l.blockedOn===t&&(l.blockedOn=null)}for(;0<zn.length&&(n=zn[0],n.blockedOn===null);)Hv(n),n.blockedOn===null&&zn.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(l=0;l<n.length;l+=3){var a=n[l],i=n[l+1],o=a[It]||null;if(typeof i=="function")o||$g(n);else if(o){var u=null;if(i&&i.hasAttribute("formAction")){if(a=i,o=i[It]||null)u=o.formAction;else if($d(a)!==null)continue}else u=o.action;typeof u=="function"?n[l+1]=u:(n.splice(l,3),l-=3),$g(n)}}}function Bv(){function t(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(o){return a=o})},focusReset:"manual",scroll:"manual"})}function e(){a!==null&&(a(),a=null),l||setTimeout(n,20)}function n(){if(!l&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,a=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){l=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),a!==null&&(a(),a=null)}}}function Hd(t){this._internalRoot=t}Rr.prototype.render=Hd.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(S(409));var n=e.current,l=ue();Lv(n,l,t,e,null,null)};Rr.prototype.unmount=Hd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Lv(t.current,2,null,t,null,null),Mr(),e[$a]=null}};function Rr(t){this._internalRoot=t}Rr.prototype.unstable_scheduleHydration=function(t){if(t){var e=e0();t={blockedOn:null,target:t,priority:e};for(var n=0;n<zn.length&&e!==0&&e<zn[n].priority;n++);zn.splice(n,0,t),n===0&&Hv(t)}};var Hg=Bg.version;if(Hg!=="19.3.1")throw Error(S(527,Hg,"19.3.1"));V.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(S(188)):(t=Object.keys(t).join(","),Error(S(268,t)));return t=$S(e),t=t!==null?Yg(t):null,t=t===null?null:t.stateNode,t};var $x={bundleType:0,version:"19.3.1",rendererPackageName:"react-dom",currentDispatcherRef:O,reconcilerVersion:"19.3.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(gi=__REACT_DEVTOOLS_GLOBAL_HOOK__,!gi.isDisabled&&gi.supportsFiber))try{Pi=gi.inject($x),ie=gi}catch{}var gi;zr.createRoot=function(t,e){if(!qg(t))throw Error(S(299));var n=!1,l="",a=vy,i=by,o=Sy;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(l=e.identifierPrefix),e.onUncaughtError!==void 0&&(a=e.onUncaughtError),e.onCaughtError!==void 0&&(i=e.onCaughtError),e.onRecoverableError!==void 0&&(o=e.onRecoverableError)),e=zv(t,1,!1,null,null,n,l,null,a,i,o,Bv),t[$a]=e.current,Md(t),new Hd(e)};zr.hydrateRoot=function(t,e,n){if(!qg(t))throw Error(S(299));var l=!1,a="",i=vy,o=by,u=Sy,s=null;return n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(o=n.onCaughtError),n.onRecoverableError!==void 0&&(u=n.onRecoverableError),n.formState!==void 0&&(s=n.formState)),e=zv(t,1,!0,e,n??null,l,a,s,i,o,u,Bv),e.context=Uv(null),n=e.current,l=ue(),l=Vf(l),a=Vn(l),a.callback=null,Yn(n,a,l),n=l,e.current.lanes=n,to(e,n),Je(e),t[$a]=e.current,Md(t),new Rr(e)};zr.version="19.3.1"});var Yv=Ue((i4,Vv)=>{"use strict";function kv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(kv)}catch(t){console.error(t)}}kv(),Vv.exports=qv()});var b1=Ue(Br=>{"use strict";var n2=Symbol.for("react.transitional.element"),l2=Symbol.for("react.fragment");function v1(t,e,n){var l=null;if(n!==void 0&&(l=""+n),e.key!==void 0&&(l=""+e.key),"key"in e){n={};for(var a in e)a!=="key"&&(n[a]=e[a])}else n=e;return e=n.ref,{$$typeof:n2,type:t,key:l,ref:e!==void 0?e:null,props:n}}Br.Fragment=l2;Br.jsx=v1;Br.jsxs=v1});var st=Ue((W4,S1)=>{"use strict";S1.exports=b1()});var r="lookmovie2-enhancer",_m=`${r}:settings`,cs=`${r}:watchlist`,fs=`${r}:movie-watchlist`,ds=`${r}:playlist`,Ro=`${r}:playlist-session`,zo=`${r}:shows-list-progress`,ms=`${r}:resume-points`,ps=`${r}:intro-times`,hs=`${r}:backup-snapshots`,Nm=14,gs=`${r}:episode-titles`,ys=5e3,vs=`${r}-style`,bs=`${r}-site-theme`,Am=`${r}-ad-bypass-style`,Vl=`${r}-fullscreen-style`,Le=`${r}-fullscreen-exit`,w=`${r}-root`,Mm=`${r}:ntfy-active-tab`,Cm=15e3,Om=500,Rm=3600*1e3,zm=1e3,Uo=95,Um=2,Ss=2e3,Lm=30*1e3,Dm=25,$m=10,Hm=8,ws=24,Bm=300,ul=Object.freeze([.5,.75,1,1.25,1.5,1.75,2]),Gb={autoPlay:!0,autoFullscreen:!0,windowedFullscreen:!0,autoNextEpisode:!0,autoSkipIntro:!0,autoSkipCredits:!0,playbackRate:1,siteTheme:!0,ntfyRemoteEnabled:!1,ntfyServer:"https://ntfy.sh",ntfyTopic:"",ntfyControlTopic:"",ntfyCommandSecret:""},Bt=Object.freeze(Gb);function qm(t){let e=document.body;if(e){t(e);return}let n=window.setInterval(()=>{let l=document.body;l&&(window.clearInterval(n),t(l))},50)}function Lo(t){if(!t||typeof t.getBoundingClientRect!="function")return!1;let e=t.getBoundingClientRect();return e.width>0&&e.height>0}function km(t){return[t.textContent??"",t.getAttribute("aria-label")??"",t.getAttribute("title")??""].join(" ").replace(/\s+/g," ").trim()}function Do(t,e){let n=document.getElementById(t);if(n instanceof HTMLStyleElement)return n;let l=document.createElement("style");return l.id=t,l.textContent=e,(document.head??document.documentElement).appendChild(l),l}function Pa(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function $o(t){return Pa(t)?t:{}}function Pe(t,e){return typeof t=="boolean"?t:e}function Fa(t,e){return typeof t=="string"&&t.trim()?t.trim():e}function Vm(t){return t instanceof Error?t.message:String(t)}var Qb="https://ntfy.sh",Kb=/^[A-Za-z0-9_-]{1,64}$/;function Bo(t){return(typeof t=="string"?t:"").trim().replace(/^\/+|\/+$/g,"")}function Es(t){return Kb.test(Bo(t))}function Ym(t,e){let n=Bo(t);return n?n.length>64?`${e} topic must be 64 characters or fewer.`:`${e} topic can only use letters, numbers, hyphens, and underscores.`:`${e} topic is required.`}function qo(t){return(t.server.trim()||Qb).replace(/\/+$/,"")}function ko(t){return Bo(t.topic)}function ti(t){let e=Bo(t.controlTopic);if(e)return e;let n=ko(t);return n?`${n}-controls`:""}function xs(t){let e=ko(t);if(!Es(e))return Ym(e,"Display");let n=ti(t);return Es(n)?"":Ym(n,"Control")}function Ts(t,e){return`${qo(t)}/${encodeURIComponent(e)}`}function Zb(t,e=Date.now()){let n=ti(t);if(!Es(n))return"";let l=new URL(`${qo(t)}/${encodeURIComponent(n)}/sse`);return l.searchParams.set("since",String(Math.floor(e/1e3))),l.toString()}function Jb(t,e){let n=t.secret.trim();return n?`${n} ${e}`:e}function Yl(t,e,n){return{action:"http",label:e,url:Ts(t,ti(t)),method:"POST",body:Jb(t,n),clear:!1}}function Ho(t,e,n){let l=Number(n);return Number.isFinite(l)?{command:t,[e]:l}:null}function Ib(t,e){if(e&&t.secret!==e)return null;let n=t.command??t.action??"",l=(typeof n=="string"?n:"").trim().toLowerCase();return l?l==="seek"?Ho(l,"seconds",t.seconds??t.by??t.value):l==="volume"?Ho(l,"percent",t.percent??t.value):{command:l}:null}function Wb(t,e){let n=(typeof t=="string"?t:"").trim();if(!n)return null;let l=e.trim();try{let s=JSON.parse(n);if(Pa(s))return Ib(s,l)}catch{}let a=n;if(l){if(a!==l&&!a.startsWith(`${l} `))return null;a=a.slice(l.length).trim()}let[i="",o=""]=a.split(/\s+/,2),u=i.toLowerCase();return u==="seek"?Ho(u,"seconds",o):u==="volume"?Ho(u,"percent",o):{command:u}}function Pb(t,e){switch(t.command){case"play":return e.play();case"pause":return e.pause();case"toggle":case"playpause":case"play-pause":return e.toggle();case"seek":return t.seconds!==void 0&&e.seekBy(t.seconds);case"fullscreen":case"fs":return e.fullscreen();case"next":return e.next();case"mute":return e.setMuted(!0);case"unmute":return e.setMuted(!1);case"volume":return t.percent!==void 0&&e.setVolume(t.percent);default:return!1}}async function jm(t,e,n="POST"){let l=JSON.stringify(e),a={"Content-Type":"application/json"};try{let i=await fetch(t,{method:n,body:l,headers:a});if(!i.ok)throw new Error(`ntfy request failed with HTTP ${String(i.status)}`)}catch(i){if(typeof GM_xmlhttpRequest!="function")throw i;await new Promise((o,u)=>{GM_xmlhttpRequest({method:n,url:t,data:l,headers:a,onload(s){if(s.status>=200&&s.status<300){o();return}u(new Error(`ntfy request failed with HTTP ${String(s.status)}`))},onerror(){u(new Error("ntfy request failed"))}})})}}function Fb(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}function tS(t,e,n=Fb()){function l(){try{let a=JSON.parse(localStorage.getItem(t)??"null");return Pa(a)?a:null}catch{return null}}return{tabId:n,read:l,isCurrent(a=Date.now()){let i=l();return!i?.tabId||i.tabId===n?!0:a-Number(i.updatedAt??0)>e},write(a){let i={tabId:n,href:location.href,title:a,updatedAt:Date.now()};localStorage.setItem(t,JSON.stringify(i))},clear(){l()?.tabId===n&&localStorage.removeItem(t)}}}var eS=5e3,nS=5e3,lS=5e3;function Xm(t){let e=tS(t.tabClaimKey,t.tabClaimTtlMs??15e3),n=null,l=0,a=0,i="",o=0,u=!1,s=()=>document.visibilityState!=="hidden",m=()=>t.canClaim?.()??!0;function p(){try{e.write(t.getTitle())}catch(y){console.warn(`[${t.scriptId}] Failed to claim ntfy remote tab.`,y)}}function v(y="activity"){return!t.getConfig().enabled||!s()||!m()?!1:(p(),t.onStatus("connected",`This tab controls the remote (${y}).`),!0)}function d(){e.clear()}function g(){t.getConfig().enabled&&e.isCurrent()&&s()&&m()&&p()}function E(){u||(u=!0,window.addEventListener("focus",()=>v("focus")),document.addEventListener("visibilitychange",()=>{s()?v("visible"):d()}),window.addEventListener("pagehide",d))}function _(y){let b;try{b=JSON.parse(typeof y.data=="string"?y.data:"{}")}catch(M){console.warn(`[${t.scriptId}] Failed to parse ntfy event.`,M);return}if(!Pa(b)||b.event!=="message"||typeof b.message!="string")return;let x=typeof b.id=="string"?b.id:"";if(x&&x===i)return;if(i=x,!s()||!e.isCurrent()){let M=Date.now();M-o>lS&&(o=M,t.onStatus("connected",`Another visible ${t.siteName} tab owns the remote.`));return}let z=Wb(b.message,t.getConfig().secret);if(!z){t.onStatus("connected","Ignored ntfy message.");return}let A=Pb(z,t.handlers);if(A&&t.onCommandHandled){let M=t.onCommandHandled;window.setTimeout(()=>{M(z)},150)}t.onStatus("connected",A?`Ran remote command: ${z.command}`:`No player handled: ${z.command}`)}function N(){n&&(n.close(),n=null)}function f(){window.clearTimeout(l),l=0,N(),a&&(window.clearInterval(a),a=0),d(),t.onStatus("disabled","")}function c(){window.clearTimeout(l),l=0;let y=t.getConfig();if(!y.enabled)return f(),!1;let b=Zb(y);if(!b)return f(),t.onStatus("disabled",xs(y)||"Add an ntfy topic to enable remote control."),!1;N(),a||(a=window.setInterval(g,nS)),E(),t.onStatus("connecting","Connecting to ntfy.");let x=new EventSource(b);return n=x,x.onopen=()=>{t.onStatus("connected","Connected to ntfy.")},x.onmessage=_,x.onerror=()=>{t.onStatus("error","ntfy connection lost. Reconnecting soon."),N(),l=window.setTimeout(c,eS)},!0}return{tabId:e.tabId,start:c,stop:f,restart(){return N(),c()},claim:v,release:d,isCurrentTab:()=>e.isCurrent()}}function Vo(){return typeof GM_getValue=="function"&&typeof GM_setValue=="function"}function aS(t){try{return localStorage.getItem(t)}catch{return null}}function Te(t){if(Vo()){let n=GM_getValue(t,null);if(typeof n=="string")return n}let e=aS(t);return e!==null&&Vo()&&GM_setValue(t,e),e}function Pt(t,e){Vo()&&GM_setValue(t,e);try{e===null?localStorage.removeItem(t):localStorage.setItem(t,e)}catch(n){if(!Vo())throw n}}function iS(t,e){let n={};for(let[l,a]of Object.entries(e)){let i=t[l];n[l]=typeof i==typeof a?i:a}return n}function Gm(t){let{scriptId:e,storageKey:n,defaults:l}=t,a=t.normalize??iS;function i(o){return a($o(o),l)}return{normalize:i,load(){try{return i(JSON.parse(Te(n)||"{}"))}catch(o){return console.warn(`[${e}] Failed to load saved settings.`,o),{...l}}},persist(o){try{Pt(n,JSON.stringify(o))}catch(u){console.warn(`[${e}] Failed to save settings.`,u)}}}}function Km(t){let e=t?Array.from(t.querySelectorAll("video")):[],n=Array.from(document.querySelectorAll("video")),l=[...new Set([...e,...n])].filter(a=>Lo(a));return l.find(a=>!a.paused&&!a.ended)??l.find(a=>a.readyState>0)??l[0]??null}function Qm(t){t.play().catch(()=>{})}function Zm(t){return{play(){let e=t();return e?(Qm(e),!0):!1},pause(){let e=t();return e?(e.pause(),!0):!1},toggle(){let e=t();return e?(e.paused?Qm(e):e.pause(),!0):!1},seekBy(e){let n=t();if(!n||!Number.isFinite(e))return!1;let l=Number.isFinite(n.duration)?n.duration:Number.MAX_SAFE_INTEGER;return n.currentTime=Math.max(0,Math.min(l,n.currentTime+e)),!0},setVolume(e){let n=t();return!n||!Number.isFinite(e)?!1:(n.volume=Math.max(0,Math.min(1,e/100)),n.muted=!1,!0)},setMuted(e){let n=t();return n?(n.muted=e,!0):!1}}}function ft(t){return typeof t=="object"&&t!==null}function ut(t,e){return t?t[e]:void 0}function ei(t){return Object.entries(t||{})}function ni(t){return window[t]}function En(...t){for(let e of t){let n=ni(e);if(n)return n}return{}}function tt(t){let e=Number.parseInt(String(t),10);return Number.isFinite(e)&&e>0?e:0}async function jl(t){let e=await fetch(t,{credentials:"same-origin"});if(!e.ok)throw new Error(`Request failed (${e.status})`);return e.text()}async function Yo(t){let e=await fetch(t,{credentials:"same-origin"});if(!e.ok)throw new Error(`Request failed (${e.status})`);return await e.json()}function de(t){return t?t.replaceAll("\\'","'").replaceAll("\\\\","\\"):""}function at(t){let e=typeof t=="string"?t.trim():"";if(!e||e.startsWith("data:image/"))return"";let n=typeof window<"u"&&window.location?window.location.href:"https://www.lookmovie2.to/";try{return new URL(e,n).href}catch{return e.startsWith("//")?`https:${e}`:e}}function xn(t){if(!t)return"";let e=t.getAttribute("style")||"",n=/background-image:\s*url\((['"]?)(.*?)\1\)/i.exec(e),l=[t.getAttribute("content"),t.getAttribute("data-lazy-background"),t.getAttribute("data-src-portrait"),t.getAttribute("data-background-image"),t.getAttribute("data-src"),n?.[2],t.getAttribute("src")];return at(l.find(a=>typeof a=="string"&&a.trim()&&!a.trim().startsWith("data:image/"))||"")}function Tn(t){return String(t)}function me(t){if(!ft(t))return null;let e=tt(t.season),n=tt(t.episode),l=tt(t.idEpisode||t.id_episode);return!e||!n||!l?null:{season:e,episode:n,idEpisode:l,watchedAt:typeof t.watchedAt=="number"?t.watchedAt:void 0,updatedAt:typeof t.updatedAt=="number"?t.updatedAt:void 0}}function Jm(t){return t?`S${String(t.season).padStart(2,"0")}E${String(t.episode).padStart(2,"0")}`:"Unknown episode"}function Fe(t,e){return!t&&!e?0:t?e?t.season!==e.season?t.season-e.season:t.episode!==e.episode?t.episode-e.episode:t.idEpisode-e.idEpisode:1:-1}function _s(t,e){return!t||!e?!1:t.idEpisode===e.idEpisode&&t.season===e.season&&t.episode===e.episode}function tn(t){return!!t&&_s(t.latestEpisode,t.lastWatched)}var Ns=Gm({scriptId:r,storageKey:_m,defaults:Bt,normalize:t=>({autoPlay:Pe(t.autoPlay,Bt.autoPlay),autoFullscreen:Pe(t.autoFullscreen,Bt.autoFullscreen),windowedFullscreen:Pe(t.windowedFullscreen,Bt.windowedFullscreen),autoNextEpisode:Pe(t.autoNextEpisode,Bt.autoNextEpisode),autoSkipIntro:Pe(t.autoSkipIntro,Bt.autoSkipIntro),autoSkipCredits:Pe(t.autoSkipCredits,Bt.autoSkipCredits),playbackRate:ul.includes(Number(t.playbackRate))?Number(t.playbackRate):Bt.playbackRate,siteTheme:Pe(t.siteTheme,Bt.siteTheme),ntfyRemoteEnabled:Pe(t.ntfyRemoteEnabled,Bt.ntfyRemoteEnabled),ntfyServer:Fa(t.ntfyServer,Bt.ntfyServer).replace(/\/+$/,""),ntfyTopic:Fa(t.ntfyTopic,Bt.ntfyTopic),ntfyControlTopic:Fa(t.ntfyControlTopic,Bt.ntfyControlTopic),ntfyCommandSecret:Fa(t.ntfyCommandSecret,Bt.ntfyCommandSecret)})});function Wm(t){return Ns.normalize(t)}function Pm(){return Ns.load()}function As(t){return typeof t=="string"||typeof t=="number"?String(t).trim():""}function li(t,e){if(!ft(e))return null;let n=typeof t=="string"&&t.trim()?t.trim():"";return n?{slug:n,idShow:tt(e.idShow||e.id_show),title:typeof e.title=="string"&&e.title.trim()?e.title.trim():n,year:As(e.year),poster:typeof e.poster=="string"?e.poster:"",addedAt:typeof e.addedAt=="number"?e.addedAt:Date.now(),lastSyncedAt:typeof e.lastSyncedAt=="number"?e.lastSyncedAt:0,lastSyncError:typeof e.lastSyncError=="string"?e.lastSyncError:"",latestEpisode:me(e.latestEpisode),lastWatched:me(e.lastWatched),upcoming:oS(e.upcoming)}:null}function oS(t){if(!ft(t)||!Array.isArray(t.episodes))return null;let e=t.episodes.map(me).filter(l=>!!l),n=tt(t.total);return{afterIdEpisode:tt(t.afterIdEpisode),total:Math.max(n,e.length),episodes:e}}function Ms(t,e){let n=ft(t)?t[e]:void 0;return ft(n)?n:{}}function Fm(){try{let t=JSON.parse(Te(cs)||"{}"),e={};return Object.entries(Ms(t,"shows")).forEach(([n,l])=>{let a=li(n,l);a&&(e[n]=a)}),{shows:e}}catch(t){return console.warn(`[${r}] Failed to load watchlist.`,t),{shows:{}}}}function ai(t,e){if(!ft(e))return null;let n=typeof t=="string"&&t.trim()?t.trim():"";return n?{slug:n,title:typeof e.title=="string"&&e.title.trim()?e.title.trim():n,year:As(e.year),poster:typeof e.poster=="string"?e.poster:"",idMovie:tt(e.idMovie||e.id_movie),href:typeof e.href=="string"?e.href:`/movies/view/${n}`,addedAt:typeof e.addedAt=="number"?e.addedAt:Date.now(),watched:!!e.watched,watchedAt:typeof e.watchedAt=="number"?e.watchedAt:void 0}:null}function tp(){try{let t=JSON.parse(Te(fs)||"{}"),e={};return Object.entries(Ms(t,"movies")).forEach(([n,l])=>{let a=ai(n,l);a&&(e[n]=a)}),{movies:e}}catch(t){return console.warn(`[${r}] Failed to load movie watchlist.`,t),{movies:{}}}}function ii(t,e){if(!ft(e))return null;let n=typeof e.slug=="string"&&e.slug.trim()?e.slug.trim():typeof t=="string"&&t.trim()?(t.split(":")[0]??"").trim():"",l=me(e.episode||e.latestEpisode);return!n||!l?null:{key:typeof t=="string"&&t.trim()?t.trim():`${n}:${l.season}:${l.episode}:${l.idEpisode}`,slug:n,idShow:tt(e.idShow||e.id_show),title:typeof e.title=="string"&&e.title.trim()?e.title.trim():n,year:As(e.year),poster:typeof e.poster=="string"?e.poster:"",episode:l,addedAt:typeof e.addedAt=="number"?e.addedAt:Date.now()}}function ep(){try{let t=JSON.parse(Te(ds)||"{}"),e={};return Object.entries(Ms(t,"entries")).forEach(([n,l])=>{let a=ii(n,l);a&&(e[a.key]=a)}),{entries:e}}catch(t){return console.warn(`[${r}] Failed to load playlist.`,t),{entries:{}}}}function np(t){return ft(t)?{active:!!t.active,currentKey:typeof t.currentKey=="string"?t.currentKey:"",startedAt:typeof t.startedAt=="number"?t.startedAt:0}:{active:!1,currentKey:"",startedAt:0}}function lp(){try{return np(JSON.parse(Te(Ro)||"{}"))}catch(t){return console.warn(`[${r}] Failed to load playlist session.`,t),{active:!1,currentKey:"",startedAt:0}}}function jo(t){if(!ft(t))return null;let e=typeof t.slug=="string"&&t.slug.trim()?t.slug.trim():"",n=me(t.episode);return!e||!n?null:{slug:e,title:typeof t.title=="string"?t.title:e,href:typeof t.href=="string"?t.href:"",episode:n,seenAt:typeof t.seenAt=="number"?t.seenAt:Date.now(),source:t.source==="manual"?"manual":"auto"}}function ap(){try{return jo(JSON.parse(Te(zo)||"null"))}catch(t){return console.warn(`[${r}] Failed to load shows list progress.`,t),null}}function ip(t){Ns.persist(t)}function op(t){try{Pt(cs,JSON.stringify(t)),cp({watchlist:t})}catch(e){console.warn(`[${r}] Failed to save watchlist.`,e)}}function up(t){try{Pt(fs,JSON.stringify(t)),cp({movieWatchlist:t})}catch(e){console.warn(`[${r}] Failed to save movie watchlist.`,e)}}function Cs(t){try{Pt(ds,JSON.stringify(t))}catch(e){console.warn(`[${r}] Failed to save playlist.`,e)}}function rp(t){try{let e=np(t);if(!e.active){Pt(Ro,null);return}Pt(Ro,JSON.stringify(e))}catch(e){console.warn(`[${r}] Failed to save playlist session.`,e)}}function Os(t){try{let e=jo(t);if(!e){Pt(zo,null);return}Pt(zo,JSON.stringify(e))}catch(e){console.warn(`[${r}] Failed to save shows list progress.`,e)}}function Im(t,e){let n=t?t[e]:void 0;return n&&typeof n=="object"?Object.keys(n).length:0}function uS(t=new Date){let e=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${n}`}function sp(){return typeof GM_getValue=="function"&&typeof GM_setValue=="function"}function Xo(){if(!sp())return[];try{let t=GM_getValue(hs,null),e=JSON.parse(typeof t=="string"&&t?t:"[]");return Array.isArray(e)?e.filter(n=>ft(n)&&typeof n.date=="string"):[]}catch(t){return console.warn(`[${r}] Failed to load backup snapshots.`,t),[]}}function cp(t){if(sp())try{if(t.watchlist&&!Im(t.watchlist,"shows")||t.movieWatchlist&&!Im(t.movieWatchlist,"movies"))return;let e=uS(),n=Xo(),l=n.find(o=>o.date===e)||n[0]||{},i=[{watchlist:l.watchlist||{shows:{}},movieWatchlist:l.movieWatchlist||{movies:{}},...t,date:e,savedAt:Date.now()},...n.filter(o=>o.date!==e)].sort((o,u)=>u.date.localeCompare(o.date)).slice(0,Nm);GM_setValue(hs,JSON.stringify(i))}catch(e){console.warn(`[${r}] Failed to save backup snapshot.`,e)}}function fp(t,e){try{let n=JSON.parse(Te(t)||"null");return ft(n)?n:e}catch(n){return console.warn(`[${r}] Failed to load ${t}.`,n),e}}function dp(t,e){try{Pt(t,JSON.stringify(e))}catch(n){console.warn(`[${r}] Failed to save ${t}.`,n)}}function Rs(t){if(!ft(t))return null;let e=Number(t.progress??t.currentTime),n=Number(t.duration);return!Number.isFinite(e)||!Number.isFinite(n)||e<0||n<=0?null:{progress:e,duration:n,savedAt:typeof t.savedAt=="number"?t.savedAt:Date.now()}}function mp(){let t={};return Object.entries(fp(ms,{})).forEach(([e,n])=>{let l=Rs(n);l&&(t[e]=l)}),t}function pp(t){dp(ms,t)}function rS(t){if(!ft(t))return null;let e=Number(t.start),n=Number(t.end),l=Number.isFinite(e)&&Number.isFinite(n)&&e>=0&&n>e,a=Number(t.creditsFromEnd),i=Number.isFinite(a)&&a>0;return!l&&!i?null:{...l?{start:e,end:n}:{},...i?{creditsFromEnd:a}:{},updatedAt:typeof t.updatedAt=="number"?t.updatedAt:Date.now()}}function hp(){let t={};return Object.entries(fp(ps,{})).forEach(([e,n])=>{let l=rS(n);l&&(t[e]=l)}),t}function gp(t){dp(ps,t)}var h={settings:Pm(),watchlistStore:Fm(),movieWatchlistStore:tp(),playlistStore:ep(),playlistSession:lp(),showsListProgress:ap(),showsListProgressOrder:-1,showsListSeenCandidate:null,showsListSeenCandidateOrder:-1,showsListSessionTouched:!1,showsListManualMarkerSet:!1,showsListObserver:null,showsListMutationObserver:null,showsListRefreshScheduled:!1,showsListObservedCards:new WeakSet,domBootstrapped:!1,uiBootAttempts:0,fullscreenTriggered:!1,lastKnownUrl:location.href,watchlistRefreshPromise:null,watchlistBusy:!1,watchlistMessage:"",watchlistMessageTone:"muted",lastTrackedEpisodeSignature:"",ntfyRemoteStatus:"disabled",ntfyRemoteMessage:"",ntfyLastNotificationAt:0};var oi=null,yp=new Map,vp="",sS=4,zs=0,bp=[];async function cS(t){zs>=sS&&await new Promise(e=>bp.push(e)),zs+=1;try{return await t()}finally{zs-=1,bp.shift()?.()}}function Sp(){if(oi)return oi;oi={};try{let t=JSON.parse(Te(gs)||"{}");ei(t).forEach(([e,n])=>{typeof n=="string"&&n.trim()&&(oi[e]=n)})}catch(t){console.warn(`[${r}] Could not read cached episode titles.`,t)}return oi}function fS(t){let e=Object.keys(t);e.length>ys&&e.slice(0,e.length-ys).forEach(n=>{delete t[n]});try{Pt(gs,JSON.stringify(t))}catch(n){console.warn(`[${r}] Could not save episode titles.`,n)}}function wp(t){let e=Sp(),n=!1;return Object.entries(t).forEach(([l,a])=>{e[l]!==a&&(delete e[l],e[l]=a,n=!0)}),n&&fS(e),n}function Ep(t){let e=typeof t=="string"?t.replace(/\s+/g," ").trim():"";return/^episode\s*#?\d+$/i.test(e)?"":e}function dS(t){let e={};for(let n of t.matchAll(/\{[^{}]*?\bid_episode\b[^{}]*?\}/g)){let l=n[0],a=/\btitle:\s*'((?:\\.|[^'\\])*)'/.exec(l),i=/\bid_episode:\s*['"]?(\d+)/.exec(l),o=Ep(de(a?.[1]));i?.[1]&&o&&(e[i[1]]=o)}return e}function Xl(t){return t&&Sp()[String(t)]||""}function Lt(t){let e=Jm(t),n=Xl(t?.idEpisode);return n?`${e} \xB7 ${n}`:e}function Go(){let t=En("show_storage"),e=ut(t,"seasons");if(!Array.isArray(e)||!e.length)return!1;let n=`${String(ut(t,"id_show"))}:${e.length}`;if(n===vp)return!1;vp=n;let l={};return e.forEach(a=>{let i=ut(a,"id_episode"),o=Ep(ut(a,"title"));(typeof i=="number"||typeof i=="string")&&String(i)&&o&&(l[String(i)]=o)}),wp(l)}function Qo(t,e){let n=e.some(a=>a&&!Xl(a.idEpisode));if(!t||!n)return Promise.resolve(!1);let l=yp.get(t);return l||(l=cS(()=>jl(`/shows/play/${encodeURIComponent(t)}`)).then(a=>wp(dS(a))).catch(a=>(console.warn(`[${r}] Could not load episode titles for ${t}.`,a),!1)),yp.set(t,l)),l}var Z1=J(Yv(),1);var Bd=new Set;function jv(t){return Bd.add(t),()=>{Bd.delete(t)}}function ja(){Bd.forEach(t=>{t()})}function Xv(){return`
        @keyframes ${r}-rainbow-border {
            to {
                --${r}-rainbow-angle: 360deg;
            }
        }

        @property --${r}-rainbow-angle {
            syntax: '<angle>';
            initial-value: 0deg;
            inherits: false;
        }

        #${w}-launcher-host {
            display: flex;
            align-items: center;
            flex: 0 0 auto;
            margin: 0;
            padding: 0;
            position: relative;
            z-index: 20;
        }

        #${w} > #${w}-launcher {
            position: absolute;
            top: 14px;
            right: 14px;
            z-index: 2147483647;
        }

        #${w} > #${w}-launcher[data-scrolled="true"] {
            position: fixed;
            top: 18px;
            right: 18px;
        }

        #${w}-launcher-host #${w}-launcher {
            position: relative;
            right: auto;
            bottom: auto;
            z-index: auto;
        }

        #${w}-launcher {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding-bottom: 14px;
            margin-bottom: -14px;
        }

        #${w}-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0;
            min-height: 0;
            min-width: 0;
            position: relative;
            isolation: isolate;
            overflow: hidden;
            border: 0;
            border-radius: 30px;
            padding: 5px 17px;
            margin: 0;
            color: #abb7c4;
            background: transparent;
            box-shadow:
                0 0 0 1px rgba(255, 255, 255, 0.08),
                0 0 18px rgba(0, 194, 255, 0.16);
            font-family: Dosis, sans-serif;
            font-size: 14px;
            font-weight: 700;
            line-height: 20px;
            letter-spacing: 0;
            text-transform: uppercase;
            white-space: nowrap;
            cursor: pointer;
        }

        #${w}-button::before {
            --${r}-rainbow-angle: 0deg;
            content: '';
            position: absolute;
            inset: -70%;
            z-index: -2;
            background: conic-gradient(
                from var(--${r}-rainbow-angle),
                #ff2d95,
                #ff7a18,
                #ffd60a,
                #24f2a6,
                #00c2ff,
                #7c3cff,
                #ff2d95
            );
            animation: ${r}-rainbow-border 10s linear infinite;
        }

        #${w}-button::after {
            content: '';
            position: absolute;
            inset: 2px;
            z-index: -1;
            border-radius: inherit;
            background: #13283c;
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
        }

        #${w}-launcher[data-hosted="false"] #${w}-button {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            padding: 0;
            box-shadow:
                0 10px 26px rgba(0, 0, 0, 0.26),
                0 0 20px rgba(255, 45, 149, 0.26),
                0 0 26px rgba(0, 194, 255, 0.18);
        }

        #${w}-button:hover {
            color: #abb7c4;
            box-shadow:
                0 0 0 1px rgba(255, 255, 255, 0.18),
                0 0 18px rgba(255, 255, 255, 0.12);
        }

        #${w}-button:hover::before {
            background: #ffffff;
            animation-play-state: paused;
        }

        #${w}-button-icon {
            display: none;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 1;
        }

        #${w}-button-icon svg {
            width: 18px;
            height: 18px;
            fill: currentColor;
        }

        #${w}-launcher[data-hosted="false"] #${w}-button-icon {
            display: inline-flex;
        }

        #${w}-button-label {
            display: inline-flex;
            align-items: center;
            position: relative;
            z-index: 1;
            white-space: nowrap;
        }

        #${w}-launcher[data-hosted="false"] #${w}-button-label {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip: rect(0 0 0 0);
            white-space: nowrap;
        }

        #${w}-quick-settings {
            position: absolute;
            top: calc(100% - 6px);
            right: 0;
            z-index: 2147483647;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin-top: 0;
            padding: 6px;
            border: 1px solid rgba(148, 163, 184, 0.28);
            border-radius: 999px;
            background: rgba(15, 23, 42, 0.96);
            box-shadow: 0 14px 34px rgba(0, 0, 0, 0.36);
            opacity: 0;
            transform: translateY(-6px);
            pointer-events: none;
            transition: opacity 0.18s ease, transform 0.18s ease;
        }

        #${w}-quick-settings::before {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            top: -10px;
            height: 10px;
        }

        #${w}-launcher:hover #${w}-quick-settings,
        #${w}-launcher:focus-within #${w}-quick-settings,
        #${w}-launcher[data-quick-open="true"] #${w}-quick-settings {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
        }

        .${r}-quick-setting {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border: 1px solid rgba(148, 163, 184, 0.18);
            border-radius: 50%;
            padding: 0;
            background: rgba(30, 41, 59, 0.78);
            color: #64748b;
            cursor: pointer;
            transition: border-color 0.14s ease, background 0.14s ease, color 0.14s ease;
        }

        .${r}-quick-setting:hover {
            border-color: rgba(226, 232, 240, 0.45);
        }

        .${r}-quick-setting[data-enabled="true"] {
            border-color: rgba(186, 230, 253, 0.72);
            background: rgba(14, 116, 144, 0.34);
            color: #bae6fd;
            box-shadow: 0 0 16px rgba(186, 230, 253, 0.16);
        }

        .${r}-quick-setting svg {
            width: 17px;
            height: 17px;
            fill: currentColor;
        }

        #${w}-overlay {
            position: fixed;
            inset: 0;
            z-index: 2147483647;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: rgba(5, 10, 20, 0.65);
        }

        #${w}-overlay.${r}-open {
            display: flex;
        }

        #${w}-modal {
            width: min(95vw, 1600px);
            height: min(92vh, 1100px);
            border: 1px solid rgba(148, 163, 184, 0.25);
            border-radius: 18px;
            overflow: hidden;
            background: #0f172a;
            color: #e5e7eb;
            box-shadow: 0 25px 70px rgba(0, 0, 0, 0.45);
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            scrollbar-color: rgba(125, 211, 252, 0.58) rgba(15, 23, 42, 0.72);
            scrollbar-width: thin;
        }

        #${w}-modal * {
            scrollbar-color: rgba(125, 211, 252, 0.58) rgba(15, 23, 42, 0.72);
            scrollbar-width: thin;
        }

        #${w}-modal *::-webkit-scrollbar {
            width: 10px;
            height: 10px;
        }

        #${w}-modal *::-webkit-scrollbar-track {
            border-radius: 999px;
            background: rgba(15, 23, 42, 0.72);
        }

        #${w}-modal *::-webkit-scrollbar-thumb {
            border: 2px solid rgba(15, 23, 42, 0.72);
            border-radius: 999px;
            background:
                linear-gradient(180deg, rgba(216, 180, 254, 0.82), rgba(125, 211, 252, 0.82), rgba(187, 247, 208, 0.82));
            background-clip: padding-box;
        }

        #${w}-modal *::-webkit-scrollbar-thumb:hover {
            background:
                linear-gradient(180deg, rgba(244, 194, 194, 0.95), rgba(125, 211, 252, 0.95), rgba(253, 230, 138, 0.95));
            background-clip: padding-box;
        }

        #${w}-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 12px;
            padding: 18px 18px 10px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.12);
        }

        #${w}-title {
            margin: 0;
            font-size: 18px;
            font-weight: 700;
        }

        #${w}-subtitle {
            margin: 6px 0 0;
            color: #94a3b8;
            font-size: 13px;
            line-height: 1.45;
        }

        #${w}-close {
            border: 0;
            background: transparent;
            color: #cbd5e1;
            font-size: 22px;
            line-height: 1;
            cursor: pointer;
        }

        #${w}-content {
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 20px;
            flex: 1;
            min-height: 0;
            overflow: hidden;
        }

        #${w}-settings-panel {
            display: flex;
            flex-direction: column;
            min-width: 0;
            min-height: 0;
            border-bottom: 1px solid rgba(148, 163, 184, 0.12);
            padding-bottom: 18px;
        }

        #${w}-watchlist-panel {
            display: flex;
            flex-direction: column;
            min-width: 0;
            min-height: 0;
            overflow: hidden;
        }

        @media (min-width: 980px) {
            #${w}-content {
                display: grid;
                grid-template-columns: 280px minmax(0, 1fr);
                gap: 24px;
            }

            #${w}-settings-panel {
                border-bottom: none;
                border-right: 1px solid rgba(148, 163, 184, 0.12);
                padding-bottom: 0;
                padding-right: 14px;
                overflow-y: auto;
                scrollbar-width: thin;
            }
        }

        #${w}-settings-title,
        #${w}-watchlist-title,
        #${w}-playlist-title {
            margin: 0 0 12px;
            color: #f8fafc;
            font-size: 15px;
            font-weight: 700;
        }

        #${w}-settings {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            gap: 12px;
        }

        .${r}-setting {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 12px;
            align-items: center;
            padding: 14px;
            border: 1px solid rgba(148, 163, 184, 0.18);
            border-radius: 14px;
            background: rgba(15, 23, 42, 0.7);
        }

        .${r}-setting-stack {
            grid-template-columns: minmax(0, 1fr);
            align-items: stretch;
        }

        .${r}-setting-main {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            min-width: 0;
        }

        .${r}-setting-icon {
            display: inline-flex;
            width: 28px;
            height: 28px;
            flex: 0 0 28px;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(56, 189, 248, 0.28);
            border-radius: 8px;
            background: rgba(14, 165, 233, 0.1);
            color: #7dd3fc;
        }

        .${r}-setting-icon svg {
            width: 18px;
            height: 18px;
            fill: currentColor;
        }

        .${r}-setting-title {
            margin: 0;
            color: #f8fafc;
            font-size: 14px;
            font-weight: 700;
        }

        .${r}-setting-copy {
            margin: 4px 0 0;
            color: #94a3b8;
            font-size: 12px;
            line-height: 1.45;
        }

        .${r}-switch {
            position: relative;
            display: inline-block;
            width: 52px;
            height: 30px;
        }

        .${r}-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .${r}-slider {
            position: absolute;
            inset: 0;
            border-radius: 999px;
            background: #334155;
            transition: background 0.18s ease;
        }

        .${r}-slider::before {
            content: '';
            position: absolute;
            top: 4px;
            left: 4px;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #ffffff;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
            transition: transform 0.18s ease;
        }

        .${r}-switch input:checked + .${r}-slider {
            background: #2563eb;
        }

        .${r}-switch input:checked + .${r}-slider::before {
            transform: translateX(22px);
        }

        .${r}-field {
            display: grid;
            gap: 5px;
            min-width: 0;
        }

        .${r}-field span {
            color: #cbd5e1;
            font-size: 11px;
            font-weight: 700;
        }

        .${r}-field input,
        .${r}-field select {
            width: 100%;
            min-width: 0;
            box-sizing: border-box;
            border: 1px solid rgba(148, 163, 184, 0.22);
            border-radius: 8px;
            padding: 8px 9px;
            background: rgba(2, 6, 23, 0.58);
            color: #f8fafc;
            font: 12px/1.35 Arial, sans-serif;
        }

        .${r}-field input::placeholder {
            color: #64748b;
        }

        .${r}-field input:focus,
        .${r}-field select:focus {
            outline: none;
            border-color: rgba(125, 211, 252, 0.72);
            box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.18);
        }

        .${r}-backup-actions {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-end;
            gap: 8px;
        }

        .${r}-backup-actions .${r}-field {
            flex: 1 1 180px;
        }

        /* The site's input styles override the hidden attribute. */
        .${r}-file-input {
            display: none !important;
        }

        .${r}-backup-actions .${r}-button {
            padding: 8px 12px;
        }

        .${r}-ntfy-status {
            margin: 0;
            color: #94a3b8;
            font-size: 12px;
            line-height: 1.45;
        }

        .${r}-ntfy-status[data-status="connected"] {
            color: #86efac;
        }

        .${r}-ntfy-status[data-status="connecting"] {
            color: #fde68a;
        }

        .${r}-ntfy-status[data-status="error"] {
            color: #fda4af;
        }

        .${r}-accordion {
            display: flex;
            flex-direction: column;
            gap: 10px;
            min-height: 0;
            flex: 1;
        }

        .${r}-accordion-trigger {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            align-items: center;
            gap: 12px;
            width: 100%;
            border: 1px solid rgba(148, 163, 184, 0.18);
            border-radius: 10px;
            padding: 10px 12px;
            background: rgba(15, 23, 42, 0.78);
            color: #f8fafc;
            text-align: left;
            cursor: pointer;
        }

        .${r}-accordion-trigger[data-open="true"] {
            border-color: rgba(96, 165, 250, 0.42);
            background: rgba(30, 41, 59, 0.92);
        }

        .${r}-accordion-trigger span {
            display: grid;
            gap: 3px;
            min-width: 0;
        }

        .${r}-accordion-trigger strong {
            font: 800 13px/1.2 Arial, sans-serif;
        }

        .${r}-accordion-trigger small {
            color: #94a3b8;
            font: 12px/1.35 Arial, sans-serif;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .${r}-accordion-trigger em {
            min-width: 24px;
            border-radius: 999px;
            padding: 4px 7px;
            background: rgba(37, 99, 235, 0.72);
            color: #eff6ff;
            font: 800 11px/1 Arial, sans-serif;
            text-align: center;
            font-style: normal;
        }

        .${r}-accordion-panel {
            display: flex;
            flex-direction: column;
            min-height: 0;
            flex: 1;
        }

        #${w}-watchlist-toolbar,
        #${w}-playlist-toolbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 14px;
            padding-bottom: 12px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.12);
            flex: 0 0 auto;
        }

        .${r}-watchlist-toolbar-actions {
            display: inline-flex;
            align-items: center;
            justify-content: flex-end;
            flex-wrap: wrap;
            gap: 8px;
        }

        .${r}-view-toggle {
            min-width: 0;
        }

        .${r}-toolbar-icon-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 34px;
            height: 34px;
            padding: 0;
        }

        .${r}-toolbar-icon-button svg {
            width: 17px;
            height: 17px;
            fill: currentColor;
        }

        .${r}-tabs {
            display: inline-flex;
            gap: 4px;
            margin: 0 0 8px;
            padding: 3px;
            border: 1px solid rgba(148, 163, 184, 0.18);
            border-radius: 999px;
            background: rgba(15, 23, 42, 0.7);
        }

        .${r}-tab {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            border: 0;
            border-radius: 999px;
            padding: 6px 10px;
            background: transparent;
            color: #94a3b8;
            font: 700 12px/1 Arial, sans-serif;
            cursor: pointer;
        }

        .${r}-tab[data-active="true"] {
            background: rgba(37, 99, 235, 0.88);
            color: #eff6ff;
        }

        .${r}-tab span {
            min-width: 18px;
            padding: 2px 6px;
            border-radius: 999px;
            background: rgba(249, 115, 22, 0.92);
            color: #fff7ed;
            font-size: 10px;
            text-align: center;
        }

        #${w}-watchlist-status {
            min-height: 18px;
            margin-bottom: 10px;
            font-size: 12px;
            line-height: 1.45;
            flex: 0 0 auto;
        }

        #${w}-watchlist-status[data-tone="success"] {
            color: #86efac;
        }

        #${w}-watchlist-status[data-tone="danger"] {
            color: #fda4af;
        }

        #${w}-watchlist-status[data-tone="muted"] {
            color: #94a3b8;
        }

        #${w}-watchlist-list,
        #${w}-playlist-list {
            display: grid;
            grid-template-columns: repeat(6, minmax(0, 1fr));
            grid-auto-rows: max-content;
            align-items: stretch;
            align-content: start;
            gap: 14px;
            flex: 1;
            min-height: 0;
            overflow-y: auto;
            overflow-x: hidden;
            padding-right: 8px;
        }

        #${w}-watchlist-list[data-view="list"],
        #${w}-playlist-list[data-view="list"] {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .${r}-watch-empty {
            grid-column: 1 / -1;
            padding: 32px 24px;
            border: 1px dashed rgba(148, 163, 184, 0.2);
            border-radius: 14px;
            color: #94a3b8;
            font-size: 14px;
            line-height: 1.55;
            background: rgba(15, 23, 42, 0.35);
            text-align: center;
            align-self: center;
        }

        .${r}-watch-item {
            display: flex;
            flex-direction: column;
            gap: 0;
            min-width: 0;
            border: 1px solid rgba(148, 163, 184, 0.16);
            border-radius: 12px;
            background: rgba(15, 23, 42, 0.85);
            overflow: hidden;
            transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .${r}-watch-item[data-view="list"] {
            display: grid;
            grid-template-columns: 74px minmax(0, 1fr);
            gap: 0;
            min-height: 112px;
            border-radius: 10px;
        }

        .${r}-watch-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .${r}-watch-item[data-state="new"] {
            border-color: rgba(249, 115, 22, 0.55);
            box-shadow: 0 0 0 1px rgba(249, 115, 22, 0.18);
        }

        .${r}-watch-item[data-playlist-active="true"] {
            border-color: rgba(96, 165, 250, 0.72);
            box-shadow: 0 0 0 1px rgba(96, 165, 250, 0.28), 0 8px 24px rgba(37, 99, 235, 0.18);
        }

        .${r}-watch-item[data-state="new"]:hover {
            box-shadow: 0 8px 24px rgba(249, 115, 22, 0.15);
        }

        .${r}-watch-item-poster {
            position: relative;
            width: 100%;
            aspect-ratio: 2 / 3;
            overflow: hidden;
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.8));
        }

        .${r}-watch-item[data-view="list"] .${r}-watch-item-poster {
            width: 74px;
            height: 112px;
            aspect-ratio: auto;
            flex: 0 0 auto;
        }

        .${r}-watch-item-poster img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .${r}-watch-poster-link {
            display: block;
            width: 100%;
            height: 100%;
            color: inherit;
            text-decoration: none;
        }

        .${r}-watch-item-poster-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #64748b;
            font-size: 40px;
            font-weight: 700;
        }

        .${r}-watch-item-poster-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 8px 10px;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            pointer-events: none;
        }

        .${r}-watch-item[data-view="list"] .${r}-watch-item-poster-overlay {
            display: none;
        }

        .${r}-watch-item-body {
            padding: 11px 10px 10px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            flex: 1;
            min-height: 82px;
        }

        /* Grid cards reserve two lines each for the title and the summary so every card in a
           row (and across rows) lines up, with the action button pinned to the bottom. */
        .${r}-watch-item:not([data-view="list"]) .${r}-watch-item-body {
            min-height: 132px;
        }

        .${r}-watch-item:not([data-view="list"]) .${r}-watch-item-title {
            min-height: calc(2em * 1.3);
        }

        .${r}-watch-item:not([data-view="list"]) .${r}-watch-item-copy {
            min-height: calc(2em * 1.4);
        }

        .${r}-watch-item[data-view="list"] .${r}-watch-item-body {
            min-height: 0;
            padding: 10px 12px;
        }

        .${r}-watch-item-title {
            color: #f8fafc;
            font-size: 13px;
            font-weight: 700;
            text-decoration: none;
            line-height: 1.3;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .${r}-watch-item-copy {
            margin: 3px 0 0;
            color: #94a3b8;
            font-size: 11px;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .${r}-watch-action {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-top: auto;
            padding: 7px 10px;
            border-radius: 999px;
            background: linear-gradient(135deg, #2563eb, #0ea5e9);
            color: #f8fafc;
            font: 700 11px/1.2 Arial, sans-serif;
            text-decoration: none;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            transition: filter 0.15s ease, transform 0.15s ease;
        }

        .${r}-watch-action-label {
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .${r}-watch-action > span[aria-hidden="true"],
        .${r}-watch-action small {
            flex: 0 0 auto;
        }

        .${r}-watch-action:hover {
            filter: brightness(1.12);
            transform: translateY(-1px);
        }

        .${r}-watch-action small {
            margin-left: auto;
            color: rgba(248, 250, 252, 0.82);
            font-size: 10px;
            font-weight: 600;
        }

        .${r}-watch-item[data-view="list"] .${r}-watch-action {
            align-self: flex-start;
            margin-top: 0;
        }

        .${r}-search {
            position: relative;
            margin: 0 0 12px;
        }

        .${r}-search input {
            width: 100%;
            box-sizing: border-box;
            border: 1px solid rgba(148, 163, 184, 0.22);
            border-radius: 10px;
            padding: 10px 12px;
            background: rgba(2, 6, 23, 0.58);
            color: #f8fafc;
            font: 13px/1.35 Arial, sans-serif;
        }

        .${r}-search input:focus {
            outline: none;
            border-color: rgba(125, 211, 252, 0.72);
            box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.18);
        }

        .${r}-search-status {
            margin: 6px 2px 0;
            color: #94a3b8;
            font: 12px/1.4 Arial, sans-serif;
        }

        .${r}-search-results {
            position: absolute;
            z-index: 5;
            top: calc(100% + 6px);
            left: 0;
            right: 0;
            max-height: 420px;
            overflow-y: auto;
            margin: 0;
            padding: 6px;
            list-style: none;
            border: 1px solid rgba(148, 163, 184, 0.22);
            border-radius: 12px;
            background: #0b1424;
            box-shadow: 0 18px 40px rgba(0, 0, 0, 0.55);
        }

        .${r}-search-results li {
            display: grid;
            grid-template-columns: 40px minmax(0, 1fr) auto;
            align-items: center;
            gap: 10px;
            padding: 6px;
            border-radius: 8px;
        }

        .${r}-search-results li:hover {
            background: rgba(30, 41, 59, 0.8);
        }

        .${r}-search-results img,
        .${r}-search-results li > span {
            width: 40px;
            height: 60px;
            border-radius: 6px;
            object-fit: cover;
            background: #1e293b;
        }

        .${r}-search-results strong {
            display: block;
            color: #f8fafc;
            font: 700 13px/1.3 Arial, sans-serif;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .${r}-search-results small {
            color: #94a3b8;
            font: 11px/1.4 Arial, sans-serif;
        }

        .${r}-stats {
            position: absolute;
            top: 12px;
            left: 12px;
            z-index: 1000002;
            margin: 0;
            padding: 8px 10px;
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.75);
            color: #e2e8f0;
            font: 12px/1.45 Consolas, 'Courier New', monospace;
            white-space: pre;
            pointer-events: none;
        }

        .${r}-buffering {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 1000001;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            padding: 16px 20px;
            border-radius: 16px;
            background: rgba(2, 6, 23, 0.72);
            color: #f8fafc;
            font: 14px/1.2 Arial, sans-serif;
            text-align: center;
            pointer-events: none;
            transform: translate(-50%, -50%);
        }

        .${r}-buffering-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(248, 250, 252, 0.22);
            border-top-color: #38bdf8;
            border-radius: 50%;
            animation: ${r}-buffering-spin 0.8s linear infinite;
        }

        .${r}-buffering[data-kind="stalled"] .${r}-buffering-spinner {
            border-top-color: #f59e0b;
        }

        .${r}-buffering small {
            color: #cbd5e1;
            font-size: 12px;
        }

        @keyframes ${r}-buffering-spin {
            to {
                transform: rotate(360deg);
            }
        }

        .${r}-autonext {
            position: absolute;
            right: 24px;
            bottom: 72px;
            z-index: 1000001;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 14px;
            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 14px;
            background: rgba(2, 6, 23, 0.88);
            color: #f8fafc;
            font: 14px/1.3 Arial, sans-serif;
            box-shadow: 0 14px 34px rgba(0, 0, 0, 0.5);
        }

        .${r}-autonext p {
            margin: 0;
        }

        .${r}-autonext button,
        .${r}-intro button {
            border: 1px solid rgba(255, 255, 255, 0.24);
            border-radius: 999px;
            padding: 7px 12px;
            background: rgba(15, 23, 42, 0.9);
            color: #f8fafc;
            font: 700 12px/1 Arial, sans-serif;
            cursor: pointer;
        }

        .${r}-autonext .${r}-autonext-play,
        .${r}-intro .${r}-intro-skip {
            border-color: transparent;
            background: #f8fafc;
            color: #020617;
        }

        .${r}-intro {
            position: absolute;
            right: 24px;
            bottom: 72px;
            z-index: 1000000;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 8px;
            pointer-events: none;
        }

        .${r}-intro > * {
            pointer-events: auto;
        }

        .${r}-intro .${r}-intro-skip {
            padding: 10px 18px;
            font-size: 14px;
            box-shadow: 0 10px 26px rgba(0, 0, 0, 0.45);
        }

        /* Sections added to the site's own player settings menu (the control bar gear). The
           site fixes that menu at 232px and its .video-js button rules override display and
           borders, hence the !important overrides below. */
        #video_player .vjs-settings-quality-menu {
            height: auto !important;
            max-height: min(60vh, 520px) !important;
            overflow-y: auto !important;
            scrollbar-width: thin;
        }

        #video_player .${r}-player-menu-toggle {
            display: flex !important;
            width: 100% !important;
        }

        #video_player .${r}-player-menu-toggle[role="menuitemcheckbox"]::after {
            display: block !important;
        }

        #video_player .${r}-player-menu-button,
        #video_player .${r}-player-menu-chips button {
            border: 1px solid rgba(255, 255, 255, 0.24) !important;
        }

        #video_player .${r}-player-menu-chips button[data-active="true"] {
            border-color: transparent !important;
        }

        #video_player .${r}-player-menu-heading {
            text-align: left !important;
        }

        .${r}-player-menu {
            padding: 4px 0 8px;
            text-align: left;
        }

        .${r}-player-menu-section {
            padding: 8px 0 4px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .${r}-player-menu-heading {
            margin: 4px 16px 6px;
            color: rgba(255, 255, 255, 0.55);
            font: 700 10px/1.2 Arial, sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.06em;
        }

        .${r}-player-menu-toggle {
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            margin: 0;
            padding: 7px 16px;
            border: 0;
            background: transparent;
            color: #fff;
            font: 700 12px/1.2 Arial, sans-serif;
            text-align: left;
            cursor: pointer;
        }

        .${r}-player-menu-toggle:hover,
        .${r}-player-menu-toggle:focus-visible {
            background: rgba(255, 255, 255, 0.1);
            outline: none;
        }

        /* A small switch on the right, mirroring the on/off state. */
        .${r}-player-menu-toggle[role="menuitemcheckbox"]::after {
            content: '';
            flex: 0 0 auto;
            width: 28px;
            height: 16px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.25)
                radial-gradient(circle at 8px 50%, #fff 5px, transparent 5.5px);
            transition: background 0.15s ease;
        }

        .${r}-player-menu-toggle[aria-checked="true"]::after {
            background: #2563eb radial-gradient(circle at 20px 50%, #fff 5px, transparent 5.5px);
        }

        .${r}-player-menu-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            padding: 2px 16px 4px;
        }

        .${r}-player-menu-chips button {
            min-width: 44px;
            padding: 5px 8px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 999px;
            background: transparent;
            color: #fff;
            font: 700 11px/1 Arial, sans-serif;
            cursor: pointer;
        }

        .${r}-player-menu-chips button:hover {
            border-color: rgba(255, 255, 255, 0.5);
        }

        .${r}-player-menu-chips button[data-active="true"] {
            border-color: transparent;
            background: #fff;
            color: #111;
        }

        .${r}-player-menu-row {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px;
            padding: 5px 16px;
            color: #fff;
            font: 700 12px/1.2 Arial, sans-serif;
        }

        .${r}-player-menu-row > span {
            min-width: 52px;
        }

        .${r}-player-menu-row em {
            color: rgba(255, 255, 255, 0.7);
            font-style: normal;
        }

        .${r}-player-menu-button {
            padding: 5px 10px;
            border: 1px solid rgba(255, 255, 255, 0.24);
            border-radius: 999px;
            background: transparent;
            color: #fff;
            font: 700 11px/1 Arial, sans-serif;
            cursor: pointer;
        }

        .${r}-player-menu-button:hover {
            background: rgba(255, 255, 255, 0.12);
        }

        .${r}-intro-toast {
            margin: 0;
            padding: 6px 10px;
            border-radius: 8px;
            background: rgba(2, 6, 23, 0.86);
            color: #f8fafc;
            font: 12px/1.3 Arial, sans-serif;
        }

        .${r}-intro [hidden],
        .${r}-intro-toast[hidden] {
            display: none !important;
        }

        .${r}-watch-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 5px 8px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.03em;
            white-space: nowrap;
        }

        .${r}-watch-badge[data-state="new"] {
            background: rgba(249, 115, 22, 0.18);
            color: #fdba74;
        }

        .${r}-watch-badge[data-state="watched"] {
            background: rgba(34, 197, 94, 0.18);
            color: #86efac;
        }

        .${r}-watch-badge[data-state="pending"] {
            background: rgba(148, 163, 184, 0.18);
            color: #cbd5e1;
        }

        .${r}-watch-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: auto;
        }

        .${r}-poster-icon-button {
            position: absolute;
            top: 8px;
            z-index: 3;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border: 1px solid rgba(226, 232, 240, 0.28);
            border-radius: 50%;
            padding: 0;
            background: rgba(15, 23, 42, 0.88);
            color: #f8fafc;
            font: 800 18px/1 Arial, sans-serif;
            box-shadow: 0 8px 22px rgba(0, 0, 0, 0.32);
            cursor: pointer;
            opacity: 0;
            transform: translateY(-3px);
            transition: opacity 0.14s ease, transform 0.14s ease, border-color 0.14s ease, background 0.14s ease;
        }

        .${r}-poster-check-button {
            left: 8px;
            color: #bbf7d0;
        }

        .${r}-poster-playlist-button {
            left: 50%;
            transform: translate(-50%, -3px);
            color: #bfdbfe;
        }

        .${r}-poster-remove-button {
            right: 8px;
            color: #fecdd3;
        }

        .${r}-watch-item:hover .${r}-poster-icon-button,
        .${r}-watch-item:focus-within .${r}-poster-icon-button {
            opacity: 1;
            transform: translateY(0);
        }

        .${r}-watch-item:hover .${r}-poster-playlist-button,
        .${r}-watch-item:focus-within .${r}-poster-playlist-button {
            transform: translate(-50%, 0);
        }

        .${r}-poster-check-button:hover {
            border-color: rgba(134, 239, 172, 0.72);
            background: rgba(22, 101, 52, 0.92);
        }

        .${r}-poster-remove-button:hover {
            border-color: rgba(251, 113, 133, 0.72);
            background: rgba(127, 29, 29, 0.92);
        }

        .${r}-poster-playlist-button:hover {
            border-color: rgba(147, 197, 253, 0.72);
            background: rgba(30, 64, 175, 0.92);
        }

        .${r}-poster-icon-button[disabled] {
            cursor: not-allowed;
            opacity: 0;
        }

        .${r}-poster-icon-button svg {
            width: 16px;
            height: 16px;
            fill: currentColor;
        }

        .${r}-playlist-play-button[data-active="true"] {
            border-color: rgba(251, 113, 133, 0.64);
            color: #fecdd3;
        }

        .${r}-watch-item[data-view="list"] .${r}-poster-icon-button {
            top: 6px;
            width: 20px;
            height: 20px;
            font-size: 13px;
        }

        .${r}-watch-item[data-view="list"] .${r}-poster-icon-button svg {
            width: 12px;
            height: 12px;
        }

        .${r}-watch-item[data-view="list"] .${r}-poster-check-button {
            left: 5px;
        }

        .${r}-watch-item[data-view="list"] .${r}-poster-remove-button {
            right: 5px;
        }

        .${r}-button,
        .${r}-link-button {
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 999px;
            padding: 5px 10px;
            background: rgba(30, 41, 59, 0.9);
            color: #e2e8f0;
            font: 600 11px/1 Arial, sans-serif;
            cursor: pointer;
            text-decoration: none;
            white-space: nowrap;
        }

        .${r}-open-link {
            font-size: 11px;
            padding: 6px 10px;
        }

        .${r}-button:hover,
        .${r}-link-button:hover {
            border-color: rgba(96, 165, 250, 0.65);
            color: #f8fafc;
        }

        .${r}-button[disabled] {
            cursor: wait;
            opacity: 0.65;
        }

        .${r}-danger-button:hover {
            border-color: rgba(251, 113, 133, 0.7);
        }

        #${w}-footer {
            margin-top: auto;
            padding-top: 16px;
            color: #94a3b8;
            font: 12px/1.45 Arial, sans-serif;
            overflow-wrap: anywhere;
        }

        .${r}-episode-card-title {
            min-height: 1.35em;
            margin: 2px 0 6px !important;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #e2e8f0 !important;
            font: 700 14px/1.35 Arial, sans-serif !important;
        }

        .${r}-episode-watch-button {
            position: absolute;
            top: 12px;
            right: 12px;
            z-index: 5;
            border: 0;
            border-radius: 999px;
            padding: 8px 10px;
            background: rgba(15, 23, 42, 0.92);
            color: #e2e8f0;
            font: 700 12px/1 Arial, sans-serif;
            box-shadow: 0 10px 26px rgba(0, 0, 0, 0.28);
            cursor: pointer;
        }

        .${r}-episode-watch-button[data-state="watching"] {
            background: rgba(30, 64, 175, 0.92);
            color: #dbeafe;
        }

        .${r}-episode-watch-button[data-state="watching-new"] {
            background: rgba(194, 65, 12, 0.95);
            color: #ffedd5;
        }

        .${r}-episode-watch-button[data-state="adding"] {
            cursor: wait;
            opacity: 0.8;
        }

        .${r}-shows-list-marker-button {
            position: absolute;
            left: 12px;
            bottom: 12px;
            z-index: 6;
            border: 0;
            border-radius: 999px;
            padding: 8px 10px;
            background: rgba(15, 23, 42, 0.92);
            color: #f8fafc;
            font: 700 12px/1 Arial, sans-serif;
            box-shadow: 0 10px 26px rgba(0, 0, 0, 0.28);
            cursor: pointer;
            opacity: 0;
            pointer-events: none;
            transform: translateY(4px);
            transition: opacity 0.14s ease, transform 0.14s ease, background 0.14s ease;
        }

        .episode-item:hover .${r}-shows-list-marker-button,
        .episode-item:focus-within .${r}-shows-list-marker-button {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
        }

        .${r}-shows-list-marker-button:hover,
        .${r}-shows-list-marker-button[data-state="current"] {
            background: rgba(202, 138, 4, 0.96);
            color: #fef9c3;
        }

        .episode-item.${r}-shows-list-marker img {
            outline: 4px solid #facc15 !important;
            outline-offset: -4px;
            border-radius: 6px;
            box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.5), 0 0 22px rgba(250, 204, 21, 0.7);
        }

        .episode-item.${r}-shows-list-marker {
            filter: drop-shadow(0 0 16px rgba(250, 204, 21, 0.45));
        }

        .${r}-show-view-watch-wrap {
            margin-top: 14px;
        }

        .${r}-show-view-watch-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            min-height: 44px;
            border: 1px solid rgba(148, 163, 184, 0.28);
            border-radius: 999px;
            padding: 10px 16px;
            background: rgba(15, 23, 42, 0.92);
            color: #f8fafc;
            font: 700 13px/1 Arial, sans-serif;
            cursor: pointer;
            transition: transform 0.14s ease, border-color 0.14s ease, background 0.14s ease;
        }

        .${r}-show-view-watch-button:hover {
            transform: translateY(-1px);
            border-color: rgba(96, 165, 250, 0.65);
        }

        .${r}-show-view-watch-button[data-state="watching"] {
            background: rgba(30, 64, 175, 0.92);
            color: #dbeafe;
        }

        .${r}-show-view-watch-button[data-state="watching-new"] {
            background: rgba(194, 65, 12, 0.95);
            color: #ffedd5;
        }

        .${r}-show-view-watch-button[data-state="adding"] {
            cursor: wait;
            opacity: 0.8;
        }

        @media (max-width: 1400px) {
            #${w}-watchlist-list,
            #${w}-playlist-list {
                grid-template-columns: repeat(5, 1fr);
            }
        }

        @media (max-width: 1100px) {
            #${w}-watchlist-list,
            #${w}-playlist-list {
                grid-template-columns: repeat(4, 1fr);
            }
        }

        @media (max-width: 850px) {
            #${w}-content {
                display: flex;
                flex-direction: column;
            }

            #${w}-settings-panel {
                border-bottom: 1px solid rgba(148, 163, 184, 0.12);
                border-right: none;
                padding-bottom: 16px;
                padding-right: 0;
            }

            #${w}-watchlist-list,
            #${w}-playlist-list {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (max-width: 640px) {
            #${w}-watchlist-list,
            #${w}-playlist-list {
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
            }

            #${w}-modal {
                width: 100vw;
                height: 100vh;
                border-radius: 0;
            }
        }
    `}var Wt=J(rl(),1),Q1=J(Zs(),1);var Ur=new Map;function kd(t,e=""){h.ntfyRemoteStatus=t,h.ntfyRemoteMessage=e,ja()}function Gv(){let{settings:t}=h;return{enabled:t.ntfyRemoteEnabled,server:t.ntfyServer,topic:t.ntfyTopic,controlTopic:t.ntfyControlTopic,secret:t.ntfyCommandSecret}}var Vd=Xm({scriptId:r,siteName:"LookMovie",tabClaimKey:Mm,tabClaimTtlMs:Cm,getConfig:Gv,canClaim:()=>!!co(),getTitle:()=>Qv(),handlers:{play:()=>Iv(),pause:()=>Wv(),toggle:()=>Pv(),seekBy:t=>Fv(t),fullscreen:()=>n1(),next:()=>Ll(),setMuted:t=>e1(t),setVolume:t=>t1(t)},onStatus:kd,onCommandHandled:t=>{so(t.command)}});function Hx(t="activity"){return Vd.claim(t)}function Yd(){return location.pathname.startsWith("/shows/play/")}function Lr(){return En("show_storage","show")}function jd(){return En("movie_storage","movie")}function Bx(){if(Xd())return!0;let t=jd();return!Yd()&&!!(t.id_movie||t.title||t.slug)}function qx(t){let e=[Yl(t,"Play/Pause","toggle"),Yl(t,"Fullscreen","fullscreen")];return Yd()?e.push(Yl(t,"Next","next")):Bx()?e.push(Yl(t,"-30s","seek -30")):e.push(Yl(t,"+30s","seek 30")),e}function qd(t,e){let n=Tn(t||"").replace(/\s+/g," ").trim(),l=typeof e=="string"||typeof e=="number"?String(e).trim():"";if(!n)return"";if(/ \(\d{4}\)$/.test(n))return n;let a=/^(.*?)(\d{4})$/.exec(n),i=a?.[1]?.trim()??"";return a&&i?`${i} (${a[2]??""})`:l&&!n.endsWith(`(${l})`)?`${n} (${l})`:n}function Qv(){let t=Lr(),e=jd(),n=typeof t.title=="string"&&t.title.trim()?qd(t.title,t.year):typeof e.title=="string"&&e.title.trim()?qd(e.title,e.year):"";if(n)return n;let l=document.querySelector("h1")?.textContent||document.querySelector(".movie-title, .film-title, .show-title")?.textContent||document.title||"LookMovie2";return qd(l)||"LookMovie2"}function kx(){let t=/^#S(\d+)-E(\d+)-(\d+)$/i.exec(location.hash);return t?Lt({season:Number(t[1]),episode:Number(t[2]),idEpisode:Number(t[3])}):""}function Kv(){let t=Lr(),e=Number(ni("id_show")||t.id_show||t.idShow||0),n=Object.values(h.watchlistStore.shows);if(e){let a=n.find(i=>i.idShow===e);if(a)return a}let l=Tn(t.slug||"").trim();return l&&h.watchlistStore.shows[l]||null}function Vx(){let t=Lr(),e=Kv(),n=/\/shows\/view\/([^/?#]+)/i.exec(location.pathname),a=document.querySelector('a[href*="/shows/view/"]')?.getAttribute("href")?.match(/\/shows\/view\/([^/?#]+)/i);return Tn(t.slug||"").trim()||Tn(t.seo_url||"").trim()||String(e?.slug||"").trim()||(n?.[1]??"")||(a?.[1]??"")}function Yx(t){return t?Ur.has(t)?Promise.resolve(Ur.get(t)||""):fetch(`/shows/view/${encodeURIComponent(t)}`,{credentials:"same-origin"}).then(e=>{if(!e.ok)throw new Error(`Show poster request failed with HTTP ${e.status}`);return e.text()}).then(e=>{let n=/poster_medium:\s*'((?:\\'|[^'])*)'/.exec(e),l=at(n?de(n[1]):"");return Ur.set(t,l),l}).catch(e=>(console.warn(`[${r}] Could not resolve show poster for ntfy attachment.`,e),Ur.set(t,""),"")):Promise.resolve("")}function jx(){let t=co(),e=jd(),n=Lr(),l=Kv(),a=document.querySelector(['meta[property="og:image"]',".movie__poster[data-background-image]",'.movie__poster[style*="background-image"]',".movie-single-ct img[data-src]",".movie-single-ct img[src]",".internal-page-container img[data-src]",".internal-page-container img[src]","[data-background-image]",'[style*="background-image"]',"img[data-src-portrait]","img[data-src]"].join(", "));return at(t?.getAttribute("poster"))||at(e.movie_poster)||at(e.poster_medium)||at(n.poster_medium)||at(n.poster_large)||at(n.poster_original)||at(n.poster)||at(l?.poster)||xn(a)}function Xx(){let t=jx();return t||!Yd()?Promise.resolve(t):Yx(Vx())}function Gx(t,e,n,l="POST"){return fetch(t,{method:l,body:e,headers:n}).then(a=>{if(!a.ok)throw new Error(`ntfy request failed with HTTP ${a.status}`);return a})}function Qx(t){return t?fetch(t,{credentials:"omit",referrerPolicy:"no-referrer"}).then(e=>{if(!e.ok)throw new Error(`Poster request failed with HTTP ${e.status}`);return e.blob()}).then(e=>!e.size||e.size>15*1024*1024?null:e).catch(e=>(console.warn(`[${r}] Could not fetch poster for ntfy attachment.`,e),null)):Promise.resolve(null)}function Kx(t,e,n){let l={Title:t.title,Message:t.message,Priority:String(t.priority),Tags:t.tags.join(","),Click:t.click,Actions:JSON.stringify(t.actions),"X-Sequence-ID":t.sequence_id};return e&&(l.Filename=e),n&&(l["Content-Type"]=n),Object.keys(l).forEach(a=>{l[a]||delete l[a]}),l}function Zx(t,e,n,l){return Qx(l).then(a=>a?Gx(Ts(t,e),a,Kx(n,"lookmovie-poster.jpg",a.type||"image/jpeg")):jm(qo(t),n))}function so(t="update"){if(!h.settings.ntfyRemoteEnabled||!Hx(t))return!1;let e=Gv(),n=ko(e),l=ti(e);if(!n||!l||xs(e))return!1;let a=co();if(!a)return!1;let i=a.paused,o=Qv(),u=kx(),s={topic:n,title:i?"Paused on LookMovie2":"Playing on LookMovie2",message:u?`${o} - ${u}`:o,tags:["tv"],priority:3,sequence_id:`${r}-player`,click:location.href,actions:qx(e)};return h.ntfyLastNotificationAt=Date.now(),Xx().then(m=>Zx(e,n,s,m)).then(()=>{kd("connected",`Updated Android player notification (${t}).`)}).catch(m=>{console.warn(`[${r}] Failed to publish ntfy player notification.`,m),kd("error","Could not publish Android player notification.")}),!0}function Zv(){return Vd.start()}function Jv(){return Vd.restart()}var Dr=`${r}-in-theaters`;function Jx(){let t=new Set;return Array.from(document.querySelectorAll(".hero-slider .slide-item")).map(e=>{let n=e.querySelector('.slide-item__backdrop--wrapper a[href*="/movies/view/"]'),l=e.querySelector(".slide-item__backdrop img"),a=e.querySelector(".slide-item__title"),i=a?.querySelector("span"),o=n?n.getAttribute("href"):"";if(!o||t.has(o))return null;t.add(o);let u=a?Array.from(a.childNodes).filter(s=>s.nodeType===Node.TEXT_NODE).map(s=>s.textContent).join("").trim():"";return{href:o,title:u||l?.getAttribute("alt")||"",year:i?(i.textContent??"").replace(/[()]/g,"").trim():"",rating:e.querySelector(".slide-item__stat span")?.textContent||"",poster:at(l&&(l.getAttribute("data-src-portrait")||l.getAttribute("data-src-landscape"))||""),qualityTag:e.querySelector(".quality-tag")}}).filter(e=>!!e)}function Ix(t){let e=document.createElement("div");e.className="movie-item-style-2 movie-item-style-1";let n=document.createElement("div");n.className="hvr-inner";let l=document.createElement("a");l.href=t.href,l.append(" WATCH NOW ");let a=document.createElement("i");a.className="ion-play",l.append(a),n.append(l);let i=document.createElement("div");i.className="image__placeholder";let o=document.createElement("a");o.href=t.href;let u=document.createElement("img");if(u.src=t.poster,u.alt=t.title,u.loading="lazy",o.append(u),t.rating.trim()){let v=document.createElement("p");v.className="rate";let d=document.createElement("i");d.className="ion-android-star";let g=document.createElement("span");g.textContent=t.rating.trim(),v.append(d,g," /10"),o.append(v)}if(t.year){let v=document.createElement("p");v.className="year",v.textContent=t.year,o.append(v)}i.append(o),t.qualityTag&&i.append(t.qualityTag.cloneNode(!0));let s=document.createElement("div");s.className="mv-item-infor";let m=document.createElement("h6"),p=document.createElement("a");return p.href=t.href,p.textContent=t.title,m.append(p),s.append(m),e.append(n,i,s),e}function Wx(){let t=Array.from(document.querySelectorAll(".page-single .hero-ct h1")).find(e=>/movies filter/i.test(e.textContent||""));return t?t.closest(".row"):null}function $r(){let t=document.querySelector(`.${Dr}`);if(location.pathname!=="/"||!h.settings.siteTheme){t&&t.remove();return}let e=Wx();if(t||!e)return;let n=Jx();if(!n.length)return;let l=document.createElement("div");l.className=`row ipad-width ${Dr}`,l.innerHTML=`
    <div class="col-sm-12"><div class="hero-ct"><h1>Recent &amp; In Theaters</h1></div></div>
    <div class="col-sm-12"><div class="flex-wrap-movielist"></div></div>
  `;let a=l.querySelector(".flex-wrap-movielist");if(a){if(a.dataset.expanded="false",n.forEach((i,o)=>{let u=Ix(i);o>=ws&&u.classList.add(`${Dr}-extra`),a.append(u)}),n.length>ws){let i=document.createElement("button");i.type="button",i.className=`${Dr}-toggle`,i.textContent=`Show all ${n.length}`,i.addEventListener("click",()=>{let o=a.dataset.expanded!=="true";a.dataset.expanded=o?"true":"false",i.textContent=o?"Show fewer":`Show all ${n.length}`}),a.parentElement?.append(i)}e.parentElement?.insertBefore(l,e),fo(),Dl()}}var Px=`
  body {
    background: #020d18 !important;
  }

  .hero.common-hero,
  .ht-footer {
    background-image: linear-gradient(180deg, #0a1b2e 0%, #020d18 70%) !important;
  }

  header.ht-header {
    position: sticky !important;
    top: 0;
    /* Solid rather than backdrop-filter: a blur over playing video is redone every frame and
       can keep Chrome from using its fast video overlay path, which lagged fullscreen playback. */
    background: rgba(2, 13, 24, 0.96) !important;
    border-bottom: 1px solid rgba(148, 163, 184, 0.12);
  }

  @media (min-width: 1400px) {
    .container {
      max-width: min(1760px, calc(100vw - 96px)) !important;
      width: auto !important;
    }
  }

  .flex-wrap-movielist {
    display: grid !important;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: 30px 22px;
  }

  .flex-wrap-movielist > .movie-item-style-2 {
    width: auto !important;
    height: auto !important;
    margin: 0 !important;
  }

  /* The site sizes this box with height: 0 + padding-bottom: 150%; drop that padding so the
     aspect-ratio box has a real height, and pin the image to it. */
  .movie-item-style-2 .image__placeholder {
    width: 100% !important;
    height: auto !important;
    padding: 0 !important;
    aspect-ratio: 2 / 3;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
    transition: transform 0.18s ease, box-shadow 0.18s ease;
  }

  .movie-item-style-2 .image__placeholder img {
    position: absolute;
    inset: 0;
    margin: 0 !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
  }

  .movie-item-style-2:hover .image__placeholder {
    transform: translateY(-4px);
    box-shadow: 0 16px 34px rgba(0, 0, 0, 0.5), 0 0 0 2px rgba(56, 189, 248, 0.55);
  }

  .movie-item-style-2 .mv-item-infor {
    padding-top: 8px;
  }

  .movie-item-style-2 .mv-item-infor h6,
  .movie-item-style-2 .mv-item-infor a {
    font-size: 14px !important;
    line-height: 1.35 !important;
  }

  .tv-episodes-list {
    display: grid !important;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 20px;
  }

  @media (min-width: 1400px) {
    .tv-episodes-list {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  .tv-episodes-list > .episode-item {
    width: auto !important;
    max-width: none !important;
    margin: 0 !important;
  }

  .tv-episodes-list .episode-item .mv-item-infor p {
    font-size: 14px !important;
    line-height: 1.5 !important;
  }

  /* The poster alone sets each card's height. contain: size stops the text column from adding
     to it, so episode titles and buttons added after load can't resize cards (or their rows). */
  .tv-episodes-list .episode-item .mv-item-infor {
    contain: size;
    align-self: stretch !important;
    min-width: 0;
    overflow: hidden;
  }

  .tv-episodes-list .episode-item .mv-item-infor p.describe {
    display: -webkit-box !important;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    max-height: none !important;
    overflow: hidden !important;
  }

  .tv-episodes-list .episode-item {
    border-radius: 12px;
    overflow: hidden;
    transition: background 0.18s ease, box-shadow 0.18s ease;
  }

  .tv-episodes-list .episode-item:hover {
    box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.45);
  }

  /* The site only sometimes reveals its slider; the in-theaters grid replaces it. */
  .hero-slider {
    display: none !important;
  }

  .${r}-in-theaters {
    margin-bottom: 40px;
  }

  .${r}-in-theaters .flex-wrap-movielist[data-expanded='false'] .${r}-in-theaters-extra {
    display: none !important;
  }

  .${r}-in-theaters-toggle {
    display: block;
    margin: 28px auto 0;
    padding: 10px 22px;
    border: 1px solid rgba(148, 163, 184, 0.3);
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.85);
    color: #f8fafc;
    font: 700 13px/1 Arial, sans-serif;
    cursor: pointer;
  }

  .${r}-in-theaters-toggle:hover {
    border-color: rgba(56, 189, 248, 0.6);
  }

  a[href="/premium.html"] {
    display: none !important;
  }
`;function Hr(){if(!h.settings.siteTheme){document.getElementById(bs)?.remove();return}Do(bs,Px)}var l1=0;function Fx(){window.clearTimeout(l1),l1=window.setTimeout(()=>{Jv()},Om)}function nl(t){let e={ntfyRemoteEnabled:h.settings.ntfyRemoteEnabled,ntfyServer:h.settings.ntfyServer,ntfyTopic:h.settings.ntfyTopic,ntfyControlTopic:h.settings.ntfyControlTopic,ntfyCommandSecret:h.settings.ntfyCommandSecret};h.settings=Wm(t),ip(h.settings),a1(),Hr(),$r(),(!h.settings.autoFullscreen||!h.settings.windowedFullscreen)&&(Xa(),h.fullscreenTriggered=!1),(e.ntfyRemoteEnabled!==h.settings.ntfyRemoteEnabled||e.ntfyServer!==h.settings.ntfyServer||e.ntfyTopic!==h.settings.ntfyTopic||e.ntfyControlTopic!==h.settings.ntfyControlTopic||e.ntfyCommandSecret!==h.settings.ntfyCommandSecret)&&Fx()}var go=J(rl(),1);function i1(t,e){return!t||!e?"":`${t}:${e.season}:${e.episode}:${e.idEpisode}`}function Gd(){return Object.values(h.playlistStore.entries)}function mo(t){return t&&h.playlistStore.entries[t]||null}function o1(t,e){return!!mo(i1(t,e))}function Qd(t){return[...t].sort((e,n)=>e.addedAt-n.addedAt)}function Ga(){Cs(h.playlistStore),Rt(),ll()}function Kd(){rp(h.playlistSession),Rt()}function u1(t){if(!t?.slug||!t.latestEpisode)return;let e=i1(t.slug,t.latestEpisode);if(!e||mo(e)){Rt();return}let n=ii(e,{slug:t.slug,idShow:t.idShow,title:t.title,year:t.year,poster:t.poster,episode:t.latestEpisode,addedAt:Date.now()});n&&(h.playlistStore.entries[e]=n),Ga()}function Zd(t){mo(t)&&(delete h.playlistStore.entries[t],h.playlistSession.active&&h.playlistSession.currentKey===t&&Qa(),Ga())}function r1(t){let e=t[0];return e?`${t.length} queued ${t.length===1?"episode":"episodes"} | Next: ${e.title} ${Lt(e.episode)}`:"Add latest show episodes from the watchlist poster or list view."}function s1(t){let e=Qd(Gd()),n=e[0];if(!n)return null;if(!t)return n;let l=e.findIndex(a=>a.key===t);return l>=0?e[l+1]||null:n}function c1(t){return t?(location.href=$l(t.slug,t.episode),!0):!1}function po(t){let e=t?mo(t):s1("");return e?(h.playlistSession={active:!0,currentKey:e.key,startedAt:Date.now()},Kd(),c1(e)):(Qa(),!1)}function Qa(){h.playlistSession={active:!1,currentKey:"",startedAt:0},Kd()}function f1(){if(!h.playlistSession.active)return!1;let t=h.playlistSession.currentKey;if(!mo(t))return Qa(),!1;let n=s1(t);return delete h.playlistStore.entries[t],Cs(h.playlistStore),n?(h.playlistSession.currentKey=n.key,Kd(),Ga(),c1(n)):(Qa(),Ga(),!0)}var t2=1;function e2(){return{app:r,version:t2,exportedAt:new Date().toISOString(),watchlist:h.watchlistStore,movieWatchlist:h.movieWatchlistStore,playlist:h.playlistStore}}function m1(){let t=JSON.stringify(e2(),null,2),e=URL.createObjectURL(new Blob([t],{type:"application/json"})),n=document.createElement("a");n.href=e,n.download=`lookmovie2-watchlist-${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(n),n.click(),n.remove(),window.setTimeout(()=>{URL.revokeObjectURL(e)},1e3)}function Jd(t,e,n){if(!ft(t))return{};let l=t[e],a=ft(l)?l[n]:void 0;if(ft(a))return a;let i=t[n];return ft(i)?i:{}}function p1(t){let e=[],n=0,l=0;Object.entries(Jd(t,"watchlist","shows")).forEach(([i,o])=>{if(h.watchlistStore.shows[i])return;let u=li(i,o);u&&(h.watchlistStore.shows[i]=u,e.push(i))}),Object.entries(Jd(t,"movieWatchlist","movies")).forEach(([i,o])=>{if(h.movieWatchlistStore.movies[i])return;let u=ai(i,o);u&&(h.movieWatchlistStore.movies[i]=u,n+=1)}),Object.entries(Jd(t,"playlist","entries")).forEach(([i,o])=>{let u=ii(i,o);u&&!h.playlistStore.entries[u.key]&&(h.playlistStore.entries[u.key]=u,l+=1)}),e.length&&(Hl(),vn({force:!0,slugs:e})),n&&(Ka(),ho()),l&&Ga();let a=`Restored ${e.length} ${e.length===1?"show":"shows"}, ${n} ${n===1?"movie":"movies"}, ${l} playlist ${l===1?"episode":"episodes"}.`;return ce(a,e.length||n||l?"success":"muted"),a}async function h1(t){try{return p1(JSON.parse(await t.text()))}catch(e){return console.warn(`[${r}] Failed to import backup.`,e),ce("That file is not a valid watchlist backup.","danger"),""}}function d1(t){return Object.keys(t||{}).length}function g1(){return Xo().map(t=>({date:t.date,showCount:d1(ut(t.watchlist,"shows")),movieCount:d1(ut(t.movieWatchlist,"movies"))}))}function y1(t){let e=Xo().find(n=>n.date===t);return e?p1(e):""}var zt=J(st(),1);function w1(){let t=(0,go.useRef)(null),[e,n]=(0,go.useState)(""),l=g1(),[a,i]=(0,go.useState)(""),o=a||l[0]?.date||"";return(0,zt.jsxs)("div",{className:`${r}-setting ${r}-setting-stack`,children:[(0,zt.jsxs)("div",{children:[(0,zt.jsx)("p",{className:`${r}-setting-title`,children:"Watchlist backup"}),(0,zt.jsx)("p",{className:`${r}-setting-copy`,children:"Watchlists are kept in Tampermonkey storage with a daily snapshot for the last 14 days. Export a file now and then for a copy outside the browser. Restoring only adds missing entries."})]}),(0,zt.jsxs)("div",{className:`${r}-backup-actions`,children:[(0,zt.jsx)("button",{className:`${r}-button`,type:"button",onClick:()=>{m1()},children:"Export file"}),(0,zt.jsx)("button",{className:`${r}-button`,type:"button",onClick:()=>{t.current?.click()},children:"Import file"}),(0,zt.jsx)("input",{ref:t,className:`${r}-file-input`,type:"file",accept:"application/json,.json",hidden:!0,onChange:u=>{let s=u.currentTarget.files?.[0];u.currentTarget.value="",s&&h1(s).then(m=>{n(m)})}})]}),l.length?(0,zt.jsxs)("div",{className:`${r}-backup-actions`,children:[(0,zt.jsxs)("label",{className:`${r}-field`,children:[(0,zt.jsx)("span",{children:"Snapshot"}),(0,zt.jsx)("select",{value:o,onChange:u=>{i(u.currentTarget.value)},children:l.map(u=>(0,zt.jsxs)("option",{value:u.date,children:[u.date," (",u.showCount," shows, ",u.movieCount," movies)"]},u.date))})]}),(0,zt.jsx)("button",{className:`${r}-button`,type:"button",onClick:()=>{n(y1(o))},children:"Restore"})]}):null,e?(0,zt.jsx)("p",{className:`${r}-ntfy-status`,children:e}):null]})}var Re=J(st(),1);function al({settingKey:t,title:e,copy:n,icon:l}){let a=h.settings[t];return(0,Re.jsxs)("label",{className:`${r}-setting`,children:[(0,Re.jsxs)("div",{className:`${r}-setting-main`,children:[l?(0,Re.jsx)("span",{className:`${r}-setting-icon`,children:l}):null,(0,Re.jsxs)("div",{children:[(0,Re.jsx)("p",{className:`${r}-setting-title`,children:e}),(0,Re.jsx)("p",{className:`${r}-setting-copy`,children:n})]})]}),(0,Re.jsxs)("span",{className:`${r}-switch`,children:[(0,Re.jsx)("input",{type:"checkbox",checked:a,onChange:i=>{nl({...h.settings,[t]:i.currentTarget.checked})}}),(0,Re.jsx)("span",{className:`${r}-slider`})]})]})}var jr=J(rl(),1);var a2=/^(?:ep_\d+|lookmovie\.mv_\d+)$/,Id=null;function E1(t){return`ep_${t}`}function x1(t){return`lookmovie.mv_${t}`}function T1(){return Id||(Id=mp()),Id}function _1(t){try{return Rs(JSON.parse(localStorage.getItem(t)||"null"))}catch{return null}}function i2(t){let e=Object.keys(t);return e.length<=Ss?!1:(e.sort((n,l)=>(t[l]?.savedAt??0)-(t[n]?.savedAt??0)).slice(Ss).forEach(n=>{delete t[n]}),!0)}function qr(){let t=T1(),e=!1;try{for(let n=0;n<localStorage.length;n+=1){let l=localStorage.key(n);if(l===null||!a2.test(l))continue;let a=_1(l),i=t[l];a&&(i?.progress!==a.progress||i.duration!==a.duration)&&(t[l]={...a,savedAt:Date.now()},e=!0)}Object.entries(t).forEach(([n,l])=>{localStorage.getItem(n)===null&&localStorage.setItem(n,JSON.stringify({duration:l.duration,progress:l.progress}))})}catch(n){console.warn(`[${r}] Failed to sync resume points.`,n)}(i2(t)||e)&&pp(t)}function N1(){qr(),window.setInterval(qr,Lm),window.addEventListener("pagehide",qr),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&qr()})}function o2(t){return _1(t)||T1()[t]||null}function kr(t){let e=o2(t);if(!e)return null;let n=e.progress/e.duration*100;return n>=Um&&n<Uo?e:null}function Vr(t){let e=Math.max(1,Math.round((t.duration-t.progress)/6e4));return e<60?`${e}m left`:`${Math.floor(e/60)}h ${e%60}m left`}var xt=J(st(),1);function A1({entry:t,viewMode:e}){let n=t.watched?"watched":"new",l=t.href||Yr(t.slug),a=t.addedAt?`Added ${new Date(t.addedAt).toLocaleDateString()}`:"",i=[],o=t.idMovie?kr(x1(t.idMovie)):null,u=`/movies/play/${t.slug}`;return a&&i.push(a),(0,xt.jsxs)("article",{className:`${r}-watch-item`,"data-state":n,"data-view":e,children:[(0,xt.jsxs)("div",{className:`${r}-watch-item-poster`,children:[(0,xt.jsx)("a",{className:`${r}-watch-poster-link`,href:l,"aria-label":`Open ${t.title}`,children:t.poster?(0,xt.jsx)("img",{src:t.poster,alt:t.title,loading:"lazy"}):(0,xt.jsx)("div",{className:`${r}-watch-item-poster-placeholder`,children:"MOVIE"})}),(0,xt.jsx)("button",{className:`${r}-poster-icon-button ${r}-poster-check-button`,type:"button","aria-label":t.watched?`Mark ${t.title} unwatched`:`Mark ${t.title} watched`,title:t.watched?"Mark unwatched":"Mark watched",onClick:()=>{M1(t.slug)},children:"\u2713"}),(0,xt.jsx)("button",{className:`${r}-poster-icon-button ${r}-poster-remove-button`,type:"button","aria-label":`Remove ${t.title}`,title:"Remove",onClick:()=>{yo(t.slug)},children:"\xD7"}),(0,xt.jsx)("div",{className:`${r}-watch-item-poster-overlay`,children:(0,xt.jsx)("span",{className:`${r}-watch-badge`,"data-state":n,children:t.watched?"Watched":"To watch"})})]}),(0,xt.jsxs)("div",{className:`${r}-watch-item-body`,children:[(0,xt.jsxs)("div",{children:[(0,xt.jsxs)("a",{className:`${r}-watch-item-title`,href:l,children:[t.title,t.year?` (${t.year})`:""]}),i.length?(0,xt.jsx)("p",{className:`${r}-watch-item-copy`,children:i.join(" | ")}):null]}),o||!t.watched?(0,xt.jsxs)("a",{className:`${r}-watch-action`,href:u,children:[(0,xt.jsx)("span",{"aria-hidden":"true",children:"\u25B6"})," ",o?"Continue":"Play",o?(0,xt.jsx)("small",{children:Vr(o)}):null]}):null]})]})}var vo=J(st(),1);function C1(){return(0,vo.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,vo.jsx)("path",{d:"M9.2 16.6 4.9 12.3l-1.4 1.4 5.7 5.7L21 7.6l-1.4-1.4L9.2 16.6z"})})}function O1(){return(0,vo.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,vo.jsx)("path",{d:"m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5z"})})}var Ut=J(st(),1);function R1({entry:t,viewMode:e,isActive:n}){let l=$l(t.slug,t.episode),a=Lt(t.episode),i=t.addedAt?`Queued ${new Date(t.addedAt).toLocaleDateString()}`:"",o=[a];return i&&o.push(i),(0,Ut.jsxs)("article",{className:`${r}-watch-item`,"data-state":"new","data-view":e,"data-playlist-active":n?"true":"false",children:[(0,Ut.jsxs)("div",{className:`${r}-watch-item-poster`,children:[(0,Ut.jsx)("a",{className:`${r}-watch-poster-link`,href:l,"aria-label":`Open ${t.title} ${a}`,onClick:u=>{u.preventDefault(),po(t.key)},children:t.poster?(0,Ut.jsx)("img",{src:t.poster,alt:t.title,loading:"lazy"}):(0,Ut.jsx)("div",{className:`${r}-watch-item-poster-placeholder`,children:"TV"})}),(0,Ut.jsx)("button",{className:`${r}-poster-icon-button ${r}-poster-check-button`,type:"button","aria-label":`Remove ${t.title} ${a} from playlist`,title:"Done",onClick:()=>{Zd(t.key)},children:(0,Ut.jsx)(C1,{})}),(0,Ut.jsx)("button",{className:`${r}-poster-icon-button ${r}-poster-remove-button`,type:"button","aria-label":`Remove ${t.title}`,title:"Remove",onClick:()=>{Zd(t.key)},children:(0,Ut.jsx)(O1,{})}),(0,Ut.jsx)("div",{className:`${r}-watch-item-poster-overlay`,children:(0,Ut.jsx)("span",{className:`${r}-watch-badge`,"data-state":"new",children:n?"Playing":"Queued"})})]}),(0,Ut.jsx)("div",{className:`${r}-watch-item-body`,children:(0,Ut.jsxs)("div",{children:[(0,Ut.jsxs)("a",{className:`${r}-watch-item-title`,href:l,onClick:u=>{u.preventDefault(),po(t.key)},children:[t.title,t.year?` (${t.year})`:""]}),(0,Ut.jsx)("p",{className:`${r}-watch-item-copy`,children:o.join(" | ")})]})})]})}var il=J(rl(),1);async function z1(t,e){let n=String(e||"").trim();if(n.length<2)return[];let l=await Yo(`/api/v1/${t}/do-search/?q=${encodeURIComponent(n)}`),a=ut(l,"result");return(Array.isArray(a)?a:[]).filter(o=>!!o&&typeof ut(o,"slug")=="string"&&!!ut(o,"slug")).slice(0,Hm).map(o=>({slug:o.slug,idShow:tt(o.id_show),idMovie:tt(o.id_movie),title:typeof o.title=="string"?o.title:o.slug,year:o.year?Tn(o.year):"",rating:o.imdb_rating?Tn(o.imdb_rating):"",poster:at(ut(o.poster,"w200")||ut(o.poster,"w100")||"")}))}var fe=J(st(),1);function U1({type:t}){let[e,n]=(0,il.useState)(""),[l,a]=(0,il.useState)([]),[i,o]=(0,il.useState)(""),u=(0,il.useRef)(0),s=t==="shows";(0,il.useEffect)(()=>{a([]),o("");let p=e.trim();if(p.length<2)return;let v=++u.current,d=async()=>{o("Searching...");try{let E=await z1(t,p);v===u.current&&(a(E),o(E.length?"":"No matches."))}catch{v===u.current&&o("Search failed. Try again.")}},g=window.setTimeout(()=>{d()},Bm);return()=>{window.clearTimeout(g)}},[e,t]);function m(p){s?So({...p}):bo({...p,href:`/movies/view/${p.slug}`})}return(0,fe.jsxs)("div",{className:`${r}-search`,children:[(0,fe.jsx)("input",{type:"search",value:e,placeholder:s?"Search TV shows to add":"Search movies to add","aria-label":s?"Search TV shows to add":"Search movies to add",onChange:p=>{n(p.currentTarget.value)},onKeyDown:p=>{p.key==="Escape"&&(p.stopPropagation(),n(""))}}),i?(0,fe.jsx)("p",{className:`${r}-search-status`,children:i}):null,l.length?(0,fe.jsx)("ul",{className:`${r}-search-results`,children:l.map(p=>{let v=s?!!Ie(p.slug):!!bn(p.slug);return(0,fe.jsxs)("li",{children:[p.poster?(0,fe.jsx)("img",{src:p.poster,alt:"",loading:"lazy"}):(0,fe.jsx)("span",{}),(0,fe.jsxs)("div",{children:[(0,fe.jsx)("strong",{children:p.title}),(0,fe.jsx)("small",{children:[p.year,p.rating?`IMDb ${p.rating}`:""].filter(Boolean).join(" \xB7 ")})]}),(0,fe.jsx)("button",{className:`${r}-button`,type:"button",disabled:v,onClick:()=>{m(p)},children:v?"Added":"Add"})]},p.slug)})}):null]})}var ht=J(st(),1);function u2(t,e){let{lastWatched:n}=t,l=n?kr(E1(n.idEpisode)):null;if(n&&l)return{href:$l(t.slug,n),label:`Continue ${Lt(n)}`,detail:Vr(l)};let a=e?.episodes[0];return a?{href:$l(t.slug,a),label:`Play ${Lt(a)}`,detail:""}:null}function L1({entry:t,viewMode:e}){let n=Wd(t),l=n?n.total:null,a=u2(t,n),i=l!==null?l>0?"new":"watched":t.latestEpisode?tn(t)?"watched":"new":"pending",o=t.latestEpisode?`Latest ${Lt(t.latestEpisode)}`:"Latest episode not synced yet",u=t.lastWatched?`Watched through ${Lt(t.lastWatched)}`:"Nothing marked watched yet",s=t.lastSyncError?`Sync issue: ${t.lastSyncError}`:"",m=i==="new"?l?`${l>99?"99+":l} unwatched`:"New episode":i==="watched"?"Up to date":"Pending sync",p=D1(t.slug,t.latestEpisode),v=tn(t)?"Mark latest unwatched":"Mark latest watched",d=o1(t.slug,t.latestEpisode),g=d?`${t.title} latest episode is already in your playlist`:`Add ${t.title} latest episode to playlist`,E=t.lastWatched?[o,u]:[o];return s&&E.push(s),(0,ht.jsxs)("article",{className:`${r}-watch-item`,"data-state":i,"data-view":e,children:[(0,ht.jsxs)("div",{className:`${r}-watch-item-poster`,children:[(0,ht.jsx)("a",{className:`${r}-watch-poster-link`,href:p,"aria-label":`Open ${t.title}`,children:t.poster?(0,ht.jsx)("img",{src:t.poster,alt:t.title,loading:"lazy"}):(0,ht.jsx)("div",{className:`${r}-watch-item-poster-placeholder`,children:"TV"})}),(0,ht.jsx)("button",{className:`${r}-poster-icon-button ${r}-poster-check-button`,type:"button",disabled:!t.latestEpisode,"aria-label":v,title:v,onClick:()=>{$1(t.slug)},children:"\u2713"}),(0,ht.jsx)("button",{className:`${r}-poster-icon-button ${r}-poster-playlist-button`,type:"button",disabled:!t.latestEpisode||d,"aria-label":g,title:g,onClick:()=>{u1(t)},children:"+"}),(0,ht.jsx)("button",{className:`${r}-poster-icon-button ${r}-poster-remove-button`,type:"button","aria-label":`Remove ${t.title}`,title:"Remove",onClick:()=>{wo(t.slug)},children:"\xD7"}),(0,ht.jsx)("div",{className:`${r}-watch-item-poster-overlay`,children:(0,ht.jsx)("span",{className:`${r}-watch-badge`,"data-state":i,children:m})})]}),(0,ht.jsxs)("div",{className:`${r}-watch-item-body`,children:[(0,ht.jsxs)("div",{children:[(0,ht.jsxs)("a",{className:`${r}-watch-item-title`,href:p,children:[t.title,t.year?` (${t.year})`:""]}),(0,ht.jsx)("p",{className:`${r}-watch-item-copy`,title:E.join(" | "),children:E.join(" | ")})]}),a?(0,ht.jsxs)("a",{className:`${r}-watch-action`,href:a.href,title:a.label,children:[(0,ht.jsx)("span",{"aria-hidden":"true",children:"\u25B6"}),(0,ht.jsx)("span",{className:`${r}-watch-action-label`,children:a.label}),a.detail?(0,ht.jsx)("small",{children:a.detail}):null]}):null]})]})}var C=J(st(),1);function H1(){return(0,C.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,C.jsx)("path",{d:"M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"})})}function B1(){return(0,C.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,C.jsx)("path",{d:"M4 6h3v3H4V6zm5 .5h11v2H9v-2zM4 11h3v3H4v-3zm5 .5h11v2H9v-2zM4 16h3v3H4v-3zm5 .5h11v2H9v-2z"})})}function r2(){return(0,C.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,C.jsx)("path",{d:"M17.7 6.3A7.9 7.9 0 0 0 12 4a8 8 0 1 0 7.5 10.7l-1.9-.7A6 6 0 1 1 16.3 7.7L13 11h8V3l-3.3 3.3z"})})}function s2(){return(0,C.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,C.jsx)("path",{d:"M8 5v14l11-7L8 5z"})})}function c2(){return(0,C.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,C.jsx)("path",{d:"M6 6h12v12H6V6z"})})}function q1({id:t,title:e,summary:n,count:l,isOpen:a,onClick:i}){return(0,C.jsxs)("button",{id:`${w}-${t}-fold-button`,className:`${r}-accordion-trigger`,type:"button","aria-expanded":a?"true":"false","aria-controls":`${w}-${t}-fold-panel`,"data-open":a?"true":"false",onClick:i,children:[(0,C.jsxs)("span",{children:[(0,C.jsx)("strong",{children:e}),(0,C.jsx)("small",{children:n})]}),(0,C.jsx)("em",{children:l})]})}function k1(){let[t,e]=(0,jr.useState)("watchlist"),[n,l]=(0,jr.useState)("shows"),[a,i]=(0,jr.useState)("poster"),o=Y1(Xr()),u=V1(Pd()),s=Qd(Gd()),m=o.filter(c=>c.latestEpisode&&!tn(c)).length,p=u.filter(c=>!c.watched).length,v=n==="shows",d=t==="watchlist",g=t==="playlist",E=v?o.length?`${o.length} tracked ${o.length===1?"show":"shows"}${m?` | ${m} with a newer latest episode`:""}`:"Add shows from the latest episodes page to start tracking them.":u.length?`${u.length} tracked ${u.length===1?"movie":"movies"}${p?` | ${p} unwatched`:""}`:"Add movies from the movies page or an individual movie page to start tracking them.",_=r1(s),N=a==="list",f=h.playlistSession.active;return(0,C.jsx)("section",{id:`${w}-watchlist-panel`,children:(0,C.jsxs)("div",{className:`${r}-accordion`,children:[(0,C.jsx)(q1,{id:"watchlist",title:"Watchlist",summary:E,count:o.length+u.length,isOpen:d,onClick:()=>{e("watchlist")}}),d?(0,C.jsxs)("div",{id:`${w}-watchlist-fold-panel`,className:`${r}-accordion-panel`,role:"region","aria-labelledby":`${w}-watchlist-fold-button`,children:[(0,C.jsxs)("div",{id:`${w}-watchlist-toolbar`,children:[(0,C.jsxs)("div",{children:[(0,C.jsx)("h3",{id:`${w}-watchlist-title`,children:"Watchlist"}),(0,C.jsxs)("div",{className:`${r}-tabs`,role:"tablist","aria-label":"Watchlist type",children:[(0,C.jsxs)("button",{className:`${r}-tab`,type:"button",role:"tab","aria-selected":v?"true":"false","data-active":v?"true":"false",onClick:()=>{l("shows")},children:["TV Shows",m>0?(0,C.jsx)("span",{children:m}):null]}),(0,C.jsxs)("button",{className:`${r}-tab`,type:"button",role:"tab","aria-selected":v?"false":"true","data-active":v?"false":"true",onClick:()=>{l("movies")},children:["Movies",p>0?(0,C.jsx)("span",{children:p}):null]})]})]}),(0,C.jsxs)("div",{className:`${r}-watchlist-toolbar-actions`,children:[(0,C.jsx)("button",{className:`${r}-button ${r}-toolbar-icon-button ${r}-view-toggle`,type:"button","aria-pressed":N?"true":"false","aria-label":N?"Switch to poster view":"Switch to list view",title:N?"Switch to poster view":"Switch to list view",onClick:()=>{i(N?"poster":"list")},children:N?(0,C.jsx)(H1,{}):(0,C.jsx)(B1,{})}),v?(0,C.jsx)("button",{id:`${w}-watchlist-refresh`,className:`${r}-button ${r}-toolbar-icon-button`,type:"button",disabled:h.watchlistBusy,"aria-label":"Refresh watchlist",title:"Refresh watchlist",onClick:()=>{vn({force:!0})},children:(0,C.jsx)(r2,{})}):null]})]}),(0,C.jsx)(U1,{type:v?"shows":"movies"}),v?(0,C.jsx)("div",{id:`${w}-watchlist-status`,"data-tone":h.watchlistMessageTone,children:h.watchlistBusy?h.watchlistMessage||"Refreshing watchlist...":h.watchlistMessage||""}):null,(0,C.jsx)("div",{id:`${w}-watchlist-list`,"data-view":a,children:v&&o.length?o.map(c=>(0,C.jsx)(L1,{entry:c,viewMode:a},c.slug)):!v&&u.length?u.map(c=>(0,C.jsx)(A1,{entry:c,viewMode:a},c.slug)):(0,C.jsx)("div",{className:`${r}-watch-empty`,children:v?"On the /shows page or an individual show page, use the watchlist button to add that show here.":"On the /movies page or an individual movie page, use the movie watchlist button to add a movie here."})})]}):null,(0,C.jsx)(q1,{id:"playlist",title:"Playlist",summary:_,count:s.length,isOpen:g,onClick:()=>{e("playlist")}}),g?(0,C.jsxs)("div",{id:`${w}-playlist-fold-panel`,className:`${r}-accordion-panel`,role:"region","aria-labelledby":`${w}-playlist-fold-button`,children:[(0,C.jsxs)("div",{id:`${w}-playlist-toolbar`,children:[(0,C.jsx)("h3",{id:`${w}-playlist-title`,children:"Playlist"}),(0,C.jsxs)("div",{className:`${r}-watchlist-toolbar-actions`,children:[(0,C.jsx)("button",{className:`${r}-button ${r}-toolbar-icon-button ${r}-playlist-play-button`,type:"button",disabled:!s.length,"aria-label":f?"Stop playlist playback":"Play playlist",title:f?"Stop playlist playback":"Play playlist","data-active":f?"true":"false",onClick:()=>{f?Qa():po()},children:f?(0,C.jsx)(c2,{}):(0,C.jsx)(s2,{})}),(0,C.jsx)("button",{className:`${r}-button ${r}-toolbar-icon-button ${r}-view-toggle`,type:"button","aria-pressed":N?"true":"false","aria-label":N?"Switch to poster view":"Switch to list view",title:N?"Switch to poster view":"Switch to list view",onClick:()=>{i(N?"poster":"list")},children:N?(0,C.jsx)(H1,{}):(0,C.jsx)(B1,{})})]})]}),(0,C.jsx)("div",{id:`${w}-playlist-list`,"data-view":a,children:s.length?s.map(c=>(0,C.jsx)(R1,{entry:c,viewMode:a,isActive:h.playlistSession.currentKey===c.key},c.key)):(0,C.jsx)("div",{className:`${r}-watch-empty`,children:"Add a latest show episode from a watchlist poster or list item."})})]}):null]})})}var T=J(st(),1);function f2(t){return Array.from(document.querySelectorAll("a, button")).find(e=>Lo(e)?t.test(km(e)):!1)}function d2(){let t=f2(/\bsign\s*up\b|\bsignup\b|\bregister\b/i);if(t){let n=t.closest("li");return n?.parentElement?{parent:n.parentElement,before:n.nextSibling,sourceItem:n}:{parent:t.parentElement,before:t.nextSibling,sourceItem:null}}let e=document.querySelector("header, nav, .navbar, .main-header, .header");return e?{parent:e,before:null,sourceItem:null}:null}function m2(t){for(let e=t;e&&e!==document.body;e=e.parentElement){let n=getComputedStyle(e).position;if(n==="fixed"||n==="sticky")return!0}return!1}function p2(){let t=d2(),e=t?.parent;if(!t||!e||m2(e))return null;let n=document.getElementById(`${w}-launcher-host`);return n&&n.tagName!=="LI"&&(n.remove(),n=null),n||(n=document.createElement("li"),n.id=`${w}-launcher-host`),t.sourceItem&&n.className!==t.sourceItem.className&&(n.className=t.sourceItem.className),t.before!==n&&(n.parentElement!==e||n.nextSibling!==t.before)&&e.insertBefore(n,t.before),n}function j1(){return(0,T.jsxs)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[(0,T.jsx)("path",{d:"M8 6.5v11l8.5-5.5L8 6.5z"}),(0,T.jsx)("path",{d:"M16.5 4.5a7.5 7.5 0 0 1 3.2 9.4l1.6.7A9.3 9.3 0 0 0 17.2 3l-.7 1.5zM7.5 19.5a7.5 7.5 0 0 1-3.2-9.4l-1.6-.7A9.3 9.3 0 0 0 6.8 21l.7-1.5z"}),(0,T.jsx)("path",{d:"M19.4 15.2 22 15l-1.5 2.2-1.1-2zM4.6 8.8 2 9l1.5-2.2 1.1 2z"})]})}function X1(){return(0,T.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,T.jsx)("path",{d:"M5 10V5h5v2H7v3H5zm9-5h5v5h-2V7h-3V5zM7 14v3h3v2H5v-5h2zm10 0h2v5h-5v-2h3v-3z"})})}function h2(){return(0,T.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,T.jsx)("path",{d:"M3 5h18v14H3V5zm2 2v10h14V7H5zm2 2h4v2H9v2H7V9zm10 6h-4v-2h2v-2h2v4z"})})}function g2(){return(0,T.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,T.jsx)("path",{d:"M4 4h7v7H4V4zm9 0h7v4h-7V4zm0 6h7v10h-7V10zM4 13h7v7H4v-7z"})})}function y2(){return(0,T.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,T.jsx)("path",{d:"M5 6v12l8.5-6L5 6zm9 0v12h2V6h-2zm3 0v12h2V6h-2z"})})}function v2(){return(0,T.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,T.jsx)("path",{d:"M4 6v12l7-6-7-6zm7 0v12l7-6-7-6zm8 0h2v12h-2V6z"})})}function G1(){return(0,T.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,T.jsx)("path",{d:"M7.1 14.9a7 7 0 0 1 9.8 0l-1.4 1.4a5 5 0 0 0-7 0l-1.4-1.4zm-3.5-3.5a12 12 0 0 1 16.8 0L19 12.8a10 10 0 0 0-14 0l-1.4-1.4zm7 7a2 2 0 0 1 2.8 0L12 19.8l-1.4-1.4zM8 4h8v2H8V4z"})})}function b2(){return(0,T.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,T.jsx)("path",{d:"M12 2.8 14.3 8l5.7.6-4.3 3.8 1.2 5.6-4.9-2.9L7.1 18l1.2-5.6L4 8.6 9.7 8 12 2.8z"})})}function K1(){let[t,e]=(0,Wt.useState)(!1),[n,l]=(0,Wt.useState)(null),[a,i]=(0,Wt.useState)(()=>window.scrollY>120),[o,u]=(0,Wt.useState)(!1),s=(0,Wt.useRef)(0),[,m]=(0,Wt.useState)(0);(0,Wt.useEffect)(()=>jv(()=>{m(f=>f+1)}),[]),(0,Wt.useEffect)(()=>{function f(c){c.key==="Escape"&&e(!1)}return window.addEventListener("keydown",f),()=>{window.removeEventListener("keydown",f)}},[]),(0,Wt.useEffect)(()=>{let f=0;function c(){let b=p2();l(x=>x===b?x:b),f+=1,(b||f>40)&&window.clearInterval(y)}let y=window.setInterval(c,500);return c(),()=>{window.clearInterval(y)}},[]),(0,Wt.useEffect)(()=>{function f(){i(window.scrollY>120)}return f(),window.addEventListener("scroll",f,{passive:!0}),()=>{window.removeEventListener("scroll",f)}},[]),(0,Wt.useEffect)(()=>()=>{window.clearTimeout(s.current)},[]);function p(){e(!0)}function v(){window.clearTimeout(s.current),u(!0)}function d(){window.clearTimeout(s.current),s.current=window.setTimeout(()=>{u(!1)},240)}function g(f){nl({...h.settings,[f]:!h.settings[f]})}function E(f,c){nl({...h.settings,[f]:c})}let _=a?null:n,N=(0,T.jsxs)("div",{id:`${w}-launcher`,"data-hosted":_?"true":"false","data-scrolled":a?"true":"false","data-quick-open":o?"true":"false",onMouseEnter:v,onMouseLeave:d,onFocus:v,onBlur:f=>{f.currentTarget.contains(f.relatedTarget)||d()},children:[(0,T.jsxs)("button",{id:`${w}-button`,type:"button","aria-label":"Open LookMovie2 Enhancer","aria-haspopup":"dialog","aria-expanded":t?"true":"false",title:"Open enhancer",onClick:()=>{t?e(!1):p()},children:[(0,T.jsx)("span",{id:`${w}-button-icon`,children:(0,T.jsx)(b2,{})}),(0,T.jsx)("span",{id:`${w}-button-label`,children:"Enhancer"})]}),(0,T.jsxs)("div",{id:`${w}-quick-settings`,role:"toolbar","aria-label":"Quick playback settings",children:[(0,T.jsx)("button",{className:`${r}-quick-setting`,type:"button","aria-label":"Toggle auto play",title:"Toggle auto play","data-enabled":h.settings.autoPlay?"true":"false",onClick:f=>{f.stopPropagation(),g("autoPlay")},children:(0,T.jsx)(j1,{})}),(0,T.jsx)("button",{className:`${r}-quick-setting`,type:"button","aria-label":"Toggle auto fullscreen",title:"Toggle auto fullscreen","data-enabled":h.settings.autoFullscreen?"true":"false",onClick:f=>{f.stopPropagation(),g("autoFullscreen")},children:(0,T.jsx)(X1,{})}),(0,T.jsx)("button",{className:`${r}-quick-setting`,type:"button","aria-label":"Toggle ntfy remote",title:"Toggle ntfy remote","data-enabled":h.settings.ntfyRemoteEnabled?"true":"false",onClick:f=>{f.stopPropagation(),g("ntfyRemoteEnabled")},children:(0,T.jsx)(G1,{})})]})]});return(0,T.jsxs)(T.Fragment,{children:[_?(0,Q1.createPortal)(N,_):N,(0,T.jsx)("div",{id:`${w}-overlay`,"aria-hidden":t?"false":"true",className:t?`${r}-open`:"",onClick:f=>{f.target===f.currentTarget&&e(!1)},children:(0,T.jsxs)("div",{id:`${w}-modal`,role:"dialog","aria-modal":"true","aria-labelledby":`${w}-title`,children:[(0,T.jsxs)("div",{id:`${w}-header`,children:[(0,T.jsxs)("div",{children:[(0,T.jsx)("h2",{id:`${w}-title`,children:"LookMovie2 Enhancer"}),(0,T.jsx)("p",{id:`${w}-subtitle`,children:"Playback helpers plus a personal show watchlist with latest episode tracking."})]}),(0,T.jsx)("button",{id:`${w}-close`,type:"button","aria-label":"Close settings",onClick:()=>{e(!1)},children:"\xD7"})]}),(0,T.jsxs)("div",{id:`${w}-content`,children:[(0,T.jsxs)("section",{id:`${w}-settings-panel`,children:[(0,T.jsx)("h3",{id:`${w}-settings-title`,children:"Playback Tools"}),(0,T.jsxs)("div",{id:`${w}-settings`,children:[(0,T.jsx)(al,{settingKey:"autoPlay",title:"Auto play",copy:"Clicks the resume or start button when the playback modal appears.",icon:(0,T.jsx)(j1,{})}),(0,T.jsx)(al,{settingKey:"autoFullscreen",title:"Auto fullscreen",copy:"Clicks the player's fullscreen button after playback starts.",icon:(0,T.jsx)(X1,{})}),(0,T.jsx)(al,{settingKey:"windowedFullscreen",title:"Windowed fullscreen",copy:"Stretches the player over the page when the browser blocks real fullscreen, e.g. after auto play or a remote command.",icon:(0,T.jsx)(h2,{})}),(0,T.jsx)(al,{settingKey:"siteTheme",title:"Site UI polish",copy:"Wider layout, responsive poster grids, a calmer background and no premium upsell links.",icon:(0,T.jsx)(g2,{})}),(0,T.jsx)(al,{settingKey:"autoNextEpisode",title:"Auto next episode",copy:"Counts down and plays the next episode when one ends, outside playlist mode.",icon:(0,T.jsx)(y2,{})}),(0,T.jsx)(al,{settingKey:"autoSkipIntro",title:"Auto skip intros",copy:"Jumps past an intro you marked for that show. Off shows a Skip intro button instead.",icon:(0,T.jsx)(v2,{})}),(0,T.jsx)(al,{settingKey:"ntfyRemoteEnabled",title:"Android remote",copy:"Publishes a player notification to ntfy with Android action buttons.",icon:(0,T.jsx)(G1,{})}),(0,T.jsxs)("div",{className:`${r}-setting ${r}-setting-stack`,children:[(0,T.jsxs)("div",{children:[(0,T.jsx)("p",{className:`${r}-setting-title`,children:"ntfy topics"}),(0,T.jsx)("p",{className:`${r}-setting-copy`,children:"The phone subscribes to the display topic; the browser listens on the control topic. Use only letters, numbers, hyphens, and underscores."})]}),(0,T.jsxs)("label",{className:`${r}-field`,children:[(0,T.jsx)("span",{children:"Server"}),(0,T.jsx)("input",{type:"url",value:h.settings.ntfyServer,placeholder:"https://ntfy.sh",onChange:f=>{E("ntfyServer",f.currentTarget.value)}})]}),(0,T.jsxs)("label",{className:`${r}-field`,children:[(0,T.jsx)("span",{children:"Display topic"}),(0,T.jsx)("input",{type:"text",value:h.settings.ntfyTopic,maxLength:64,pattern:"[A-Za-z0-9_-]{1,64}",placeholder:"random-private-topic",onChange:f=>{E("ntfyTopic",f.currentTarget.value)}})]}),(0,T.jsxs)("label",{className:`${r}-field`,children:[(0,T.jsx)("span",{children:"Control topic"}),(0,T.jsx)("input",{type:"text",value:h.settings.ntfyControlTopic,maxLength:64,pattern:"[A-Za-z0-9_-]{1,64}",placeholder:"display-topic-controls",onChange:f=>{E("ntfyControlTopic",f.currentTarget.value)}})]}),(0,T.jsxs)("label",{className:`${r}-field`,children:[(0,T.jsx)("span",{children:"Command secret"}),(0,T.jsx)("input",{type:"password",value:h.settings.ntfyCommandSecret,placeholder:"optional shared command prefix",onChange:f=>{E("ntfyCommandSecret",f.currentTarget.value)}})]}),(0,T.jsx)("p",{className:`${r}-ntfy-status`,"data-status":h.ntfyRemoteStatus,children:h.ntfyRemoteMessage||`Remote status: ${h.ntfyRemoteStatus}`})]}),(0,T.jsx)(w1,{})]}),(0,T.jsx)("div",{id:`${w}-footer`,children:"Settings and watchlist data are saved in Tampermonkey storage on this browser."})]}),(0,T.jsx)(k1,{})]})]})})]})}var J1=J(st(),1),Fd=null;function S2(){if(!document.head||document.getElementById(vs))return;let t=document.createElement("style");t.id=vs,t.textContent=Xv(),document.head.appendChild(t)}function tm(){if(S2(),!document.body)return;let t=document.getElementById(w);t||(t=document.createElement("div"),t.id=w,document.body.appendChild(t)),Fd||(Fd=(0,Z1.createRoot)(t),Fd.render((0,J1.jsx)(K1,{})))}function ll(){ja()}function Rt(){ja()}function a1(){ja()}var Eo=null;function Pd(){return Object.values(h.movieWatchlistStore.movies)}function bn(t){return t&&h.movieWatchlistStore.movies[t]||null}function V1(t){return[...t].sort((e,n)=>e.watched!==n.watched?e.watched?1:-1:e.title.localeCompare(n.title))}function Ka(){up(h.movieWatchlistStore),Rt(),ll(),Dl(),xo()}function w2(t){return!(!t||typeof t.poster!="string"||!t.poster.trim()||t.poster.trim().startsWith("data:image/"))}function E2(t){let e=/(?:var\s+|window\.)movie_storage\s*=\s*(\{[\s\S]*?\})\s*;/.exec(t);if(!e)return{};try{return $o(JSON.parse(e[1]??""))}catch(n){return console.warn(`[${r}] Failed to parse movie_storage metadata.`,n),{}}}async function I1(t,e){let n=await jl(`/movies/view/${t}`),l=E2(n),a=/id_movie:\s*(\d+)/.exec(n),i=/title:\s*'((?:\\'|[^'])*)'/.exec(n),o=/year:\s*'((?:\\'|[^'])*)'/.exec(n),u=/poster_medium:\s*'((?:\\'|[^'])*)'/.exec(n),s=typeof l.movie_poster=="string"&&l.movie_poster?l.movie_poster:typeof l.poster_medium=="string"&&l.poster_medium?l.poster_medium:typeof l.poster=="string"?l.poster:"";return{slug:t,idMovie:typeof l.id_movie=="number"?l.id_movie:a?parseInt(a[1]??"",10):0,title:typeof l.title=="string"&&l.title.trim()?l.title.trim():i?de(i[1]).trim():e?.title?e.title:t,year:typeof l.year=="string"||typeof l.year=="number"?String(l.year):o?de(o[1]).trim():e?.year?e.year:"",poster:at(s)||(u?at(de(u[1])):"")||(e?.poster?at(e.poster):"")}}async function ho(){if(Eo)return Eo;let t=Pd().filter(e=>!w2(e)||!e.idMovie);if(t.length)return Eo=(async()=>{let e=!1;for(let n of t)try{let l=await I1(n.slug,n);l.idMovie&&l.idMovie!==n.idMovie&&(n.idMovie=l.idMovie,e=!0),l.title&&l.title!==n.title&&(n.title=l.title,e=!0),l.year&&l.year!==n.year&&(n.year=l.year,e=!0),l.poster&&l.poster!==n.poster&&(n.poster=l.poster,e=!0)}catch(l){console.warn(`[${r}] Failed to refresh movie metadata for ${n.slug}.`,l)}e&&Ka()})().finally(()=>{Eo=null}),Eo}function bo(t){if(!t?.slug)return;let{slug:e}=t,n={slug:t.slug,title:t.title||t.slug,year:t.year||"",poster:t.poster||"",idMovie:t.idMovie||0};I1(e,t).then(l=>{l.title&&(n.title=l.title),l.year&&(n.year=l.year),l.poster&&(n.poster=l.poster),l.idMovie&&(n.idMovie=l.idMovie);let a=ai(e,{slug:e,title:n.title,year:n.year,poster:n.poster,idMovie:n.idMovie,href:t.href||`/movies/view/${e}`,addedAt:Date.now(),watched:!1});a&&(h.movieWatchlistStore.movies[e]=a),Ka(),Rt()})}function yo(t){bn(t)&&(delete h.movieWatchlistStore.movies[t],Ka())}function M1(t){let e=bn(t);e&&(e.watched=!e.watched,e.watchedAt=e.watched?Date.now():void 0,Ka())}function Bl(){return!!document.body}function Gr(t){return me({season:t.dataset.season,episode:t.dataset.episode,idEpisode:t.dataset.idEpisode})}function P1(t){try{let e=new URL(t,location.origin);return/\/shows\/view\/([^/?#]+)/i.exec(e.pathname)?.[1]??""}catch{return""}}function x2(t){try{let e=new URL(t,location.origin),n=tt(e.searchParams.get("season")),l=tt(e.searchParams.get("episode")),a=tt(e.searchParams.get("id_episode"));return!n||!l||!a?null:{season:n,episode:l,idEpisode:a}}catch{return null}}function Qr(t){return(typeof t=="string"?/-(\d{4})$/.exec(t):null)?.[1]??""}function F1(t){try{let e=new URL(t,location.origin);return/\/movies\/view\/([^/?#]+)/i.exec(e.pathname)?.[1]??""}catch{return""}}function To(t){if(!t)return null;let e=t.querySelector('a[href*="/shows/view/"]');if(!e)return null;let n=e.getAttribute("href")??"",l=P1(n);if(!l)return null;let a=t.querySelector(".mv-item-infor h6"),i=t.querySelector("img[data-src], img[src]"),o=x2(n);return{slug:l,title:a?(a.textContent??"").trim():l,year:Qr(l),poster:xn(i),href:new URL(n,location.origin).href,episode:o}}function D1(t,e){return t?e?`/shows/view/${t}?season=${e.season}&episode=${e.episode}&id_episode=${e.idEpisode}`:`/shows/view/${t}`:"/shows"}function $l(t,e){return t?e?`/shows/play/${t}#S${e.season}-E${e.episode}-${e.idEpisode}`:`/shows/view/${t}`:"/shows"}function Yr(t){return t?`/movies/view/${t}`:"/movies"}function _o(){return location.pathname==="/shows"}function tb(){return location.pathname.startsWith("/shows/view/")}function Xd(){return location.pathname.startsWith("/movies/play/")}function eb(){return location.pathname.startsWith("/movies/view/")}function T2(){if(!tb())return null;let t=En("show_storage"),e=typeof t.slug=="string"&&t.slug?t.slug:P1(location.href);if(!e)return null;let n=document.querySelector(".movie-single-ct h1")||document.querySelector(".movie-single-ct h2")||document.querySelector(".internal-page-container h1")||document.querySelector(".internal-page-container h2"),l=document.querySelector('.movie__poster[style*="background-image"]')||document.querySelector(".movie__poster[data-background-image]")||document.querySelector(".movie-single-ct img[data-src], .movie-single-ct img[src]")||document.querySelector(".internal-page-container img[data-src], .internal-page-container img[src]"),a=document.querySelector('meta[property="og:image"]'),i=new URLSearchParams(location.search),o=me({season:i.get("season"),episode:i.get("episode"),idEpisode:i.get("id_episode")});return{slug:e,title:typeof t.title=="string"&&t.title.trim()?t.title.trim():n?(n.textContent??"").replace(/\s*\d{4}\s*$/,"").trim():e,year:typeof t.year=="string"||typeof t.year=="number"?String(t.year):Qr(e),poster:typeof t.poster_medium=="string"&&t.poster_medium?t.poster_medium:xn(l)||a?.getAttribute("content")||"",idShow:tt(t.id_show),episode:o}}function _2(t){if(!t)return null;let e=t.querySelector('a[href*="/movies/view/"]');if(!e)return null;let n=e.getAttribute("href")??"",l=F1(n);if(!l)return null;let a=t.querySelector(".slide-item__title, .mv-item-infor h6, h6, h5, .title"),i=t.querySelector("img[data-src-portrait], img[data-src], img[src]"),o=t.querySelector('[data-background-image], [style*="background-image"], [data-src-portrait], [data-src]'),u=t.querySelector(".year"),s=a?(a.textContent??"").trim():"",m=/\((\d{4})\)/.exec(s),p=xn(i)||xn(o);return{slug:l,title:s?s.replace(/\s*\(\d{4}\)\s*$/,"").trim():l,year:u?(u.textContent??"").trim():m?.[1]||Qr(l),poster:p,href:new URL(n,location.origin).href}}function N2(){if(!eb())return null;let t=F1(location.href);if(!t)return null;let e=En("movie_storage","movie"),n=document.querySelector(".movie-single-ct h1")||document.querySelector(".movie-single-ct h2")||document.querySelector(".internal-page-container h1")||document.querySelector(".internal-page-container h2"),l=document.querySelector('.movie__poster[data-background-image], .movie__poster[style*="background-image"], .movie-single-ct img[data-src], .movie-single-ct img[src], .internal-page-container img[data-src], .internal-page-container img[src]'),a=document.querySelector('meta[property="og:image"]');return{slug:t,title:typeof e.title=="string"&&e.title.trim()?e.title.trim():n?(n.textContent??"").trim():t,year:typeof e.year=="string"||typeof e.year=="number"?String(e.year):Qr(t),poster:at(typeof e.movie_poster=="string"&&e.movie_poster?e.movie_poster:typeof e.poster_medium=="string"&&e.poster_medium?e.poster_medium:"")||xn(l)||at(a?.getAttribute("content")||""),href:location.href}}function em(t){let e=t.dataset.watchlistSlug||"",n=Ie(e),l=Gr(t),a="add",i="+ Watch",o="Add this show to your watchlist";if(n){let u=l&&(!n.lastWatched||Fe(l,n.lastWatched)>0);a=u?"watching-new":"watching",i="Watching",o=u?"This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.":"This show is already in your watchlist. Click to remove it."}t.dataset.state!==a&&(t.dataset.state=a),t.textContent!==i&&(t.textContent=i),t.title!==o&&(t.title=o),t.disabled&&(t.disabled=!1)}function ol(){document.querySelectorAll(`.${r}-episode-watch-button`).forEach(t=>{em(t)})}function nm(t){let e=t.dataset.watchlistSlug||"",n=Ie(e),l=Gr(t);if(!n){t.dataset.state="add",t.textContent="+ Add To Watchlist",t.title="Add this show to your watchlist",t.disabled=!1;return}let a=l&&(!n.lastWatched||Fe(l,n.lastWatched)>0);t.dataset.state=a?"watching-new":"watching",t.textContent=a?"Watching: New Episode":"Watching",t.title=a?"This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.":"This show is already in your watchlist. Click to remove it.",t.disabled=!1}function No(){document.querySelectorAll(`.${r}-show-view-watch-button`).forEach(t=>{nm(t)})}function lm(t){let e=t.dataset.watchlistSlug||"",n=bn(e);if(!n){t.dataset.state="add",t.textContent="+ Movie",t.title="Add this movie to your watchlist",t.disabled=!1;return}t.dataset.state=n.watched?"watching":"watching-new",t.textContent=n.watched?"Watched":"Movie List",t.title=n.watched?"This movie is marked watched. Click to remove it from your movie watchlist.":"This movie is in your movie watchlist. Click to remove it.",t.disabled=!1}function Dl(){document.querySelectorAll(`.${r}-movie-watch-button`).forEach(t=>{lm(t)})}function am(t){let e=t.dataset.watchlistSlug||"",n=bn(e);if(!n){t.dataset.state="add",t.textContent="+ Add Movie To Watchlist",t.title="Add this movie to your watchlist",t.disabled=!1;return}t.dataset.state=n.watched?"watching":"watching-new",t.textContent=n.watched?"Movie Watched":"In Movie Watchlist",t.title=n.watched?"This movie is marked watched. Click to remove it from your movie watchlist.":"This movie is in your movie watchlist. Click to remove it.",t.disabled=!1}function xo(){document.querySelectorAll(`.${r}-movie-view-watch-button`).forEach(t=>{am(t)})}function nb(t,e="auto"){return!t?.slug||!t.episode?null:{slug:t.slug,title:t.title||t.slug,href:t.href||"",episode:t.episode,seenAt:Date.now(),source:e}}function lb(t,e){return!!t&&!!e&&t.slug===e.slug&&_s(t.episode,e.episode)}function im(t){return Array.from(document.querySelectorAll(".episode-item")).indexOf(t)}function om(){if(!Bl()||!_o())return;document.querySelectorAll(`.episode-item.${r}-shows-list-marker`).forEach(e=>{e.classList.remove(`${r}-shows-list-marker`),e.removeAttribute("data-lookmovie-list-marker")}),h.showsListProgressOrder=-1;let t=h.showsListProgress;t&&document.querySelectorAll(".episode-item").forEach(e=>{let n=To(e);lb(n,t)&&(e.classList.add(`${r}-shows-list-marker`),e.dataset.lookmovieListMarker="true",h.showsListProgressOrder=im(e))})}function ab(t){let e=To(t.closest(".episode-item")),n=lb(e,h.showsListProgress),l=n?"current":"set",a=n?"Bookmarked":"Set bookmark",i=n?"This is the current shows-page bookmark.":"Set the yellow shows-page bookmark here.";t.dataset.state!==l&&(t.dataset.state=l),t.textContent!==a&&(t.textContent=a),t.title!==i&&(t.title=i)}function A2(){document.querySelectorAll(`.${r}-shows-list-marker-button`).forEach(t=>{ab(t)})}function M2(t){let e=nb(To(t),"manual");e&&(h.showsListProgress=e,h.showsListProgressOrder=im(t),h.showsListSeenCandidate=null,h.showsListSeenCandidateOrder=-1,h.showsListManualMarkerSet=!0,Os(e),om(),A2())}function C2(){if(h.showsListManualMarkerSet||h.showsListProgress?.source==="manual")return;let t=jo(h.showsListSeenCandidate);t&&(h.showsListProgress&&!h.showsListSessionTouched&&(h.showsListProgressOrder<0||h.showsListSeenCandidateOrder<h.showsListProgressOrder)||(h.showsListProgress=t,Os(t),om()))}function Kr(t){t?.persist&&C2(),h.showsListObserver&&h.showsListObserver.disconnect(),h.showsListMutationObserver&&h.showsListMutationObserver.disconnect(),h.showsListObserver=null,h.showsListMutationObserver=null,h.showsListRefreshScheduled=!1,h.showsListObservedCards=new WeakSet,h.showsListSeenCandidate=null,h.showsListSeenCandidateOrder=-1,h.showsListSessionTouched=!1,h.showsListManualMarkerSet=!1}function O2(t){let e=To(t),n=nb(e);if(!n)return;let l=im(t);l<h.showsListSeenCandidateOrder||(h.showsListSeenCandidate=n,h.showsListSeenCandidateOrder=l)}function ib(){let t=h.showsListObserver;!Bl()||!_o()||!t||(om(),document.querySelectorAll(".episode-item").forEach(e=>{h.showsListObservedCards.has(e)||(h.showsListObservedCards.add(e),t.observe(e))}))}function R2(){h.showsListRefreshScheduled||(h.showsListRefreshScheduled=!0,window.setTimeout(()=>{h.showsListRefreshScheduled=!1,ib()},150))}function Zr(){if(!(!Bl()||!_o()||typeof IntersectionObserver!="function")){if(h.showsListObserver||(h.showsListObserver=new IntersectionObserver(t=>{t.filter(e=>e.isIntersecting).forEach(e=>{O2(e.target)})},{threshold:.55})),!h.showsListMutationObserver){let t=new MutationObserver(()=>{R2()});h.showsListMutationObserver=t,t.observe(document.body,{childList:!0,subtree:!0})}ib()}}function ob(){_o()&&(h.showsListSessionTouched=!0)}function z2(t){let e=t.querySelector(`.${r}-episode-card-title`),n=t.querySelector(".mv-item-infor h5");if(e||!n)return e;let l=document.createElement("p");return l.className=`${r}-episode-card-title`,n.after(l),l}function W1(t,e){let n=z2(t),l=Xl(e.idEpisode);n&&n.textContent!==l&&(n.textContent=l,n.setAttribute("title",l))}function U2(t,e){let{episode:n}=e;n&&(W1(t,n),!Xl(n.idEpisode)&&Qo(e.slug,[n]).then(()=>{Xl(n.idEpisode)?W1(t,n):t.querySelector(`.${r}-episode-card-title`)?.remove()}))}function Jr(){!Bl()||!_o()||document.querySelectorAll(".episode-item").forEach(t=>{let e=To(t);if(!e)return;let n=t.querySelector(`.${r}-episode-watch-button`);if(!n){let a=document.createElement("button");n=a,a.type="button",a.className=`${r}-episode-watch-button`,t.appendChild(a);let i=async o=>{o.preventDefault(),o.stopPropagation();let u=a.dataset.watchlistSlug;if(u){if(Ie(u)){wo(u);return}a.dataset.state="adding",a.textContent="Adding...",a.disabled=!0,await So({slug:u,title:a.dataset.title||u,year:a.dataset.year||"",poster:a.dataset.poster||"",episode:Gr(a)}),em(a)}};a.addEventListener("click",o=>{i(o)})}n.dataset.watchlistSlug=e.slug,n.dataset.title=e.title,n.dataset.year=e.year,n.dataset.poster=e.poster,e.episode&&(n.dataset.season=String(e.episode.season),n.dataset.episode=String(e.episode.episode),n.dataset.idEpisode=String(e.episode.idEpisode)),em(n),U2(t,e);let l=t.querySelector(`.${r}-shows-list-marker-button`);l||(l=document.createElement("button"),l.type="button",l.className=`${r}-shows-list-marker-button`,t.appendChild(l),l.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation(),M2(t)})),ab(l)})}function um(){if(!Bl()||!tb())return;let t=T2();if(!t)return;let e=document.querySelector(".watch-heading")||document.querySelector(".movie-single-ct.main-content")||document.querySelector(".internal-page-container");if(!e)return;let n=document.querySelector(`.${r}-show-view-watch-wrap`);n||(n=document.createElement("div"),n.className=`${r}-show-view-watch-wrap`,e.appendChild(n));let l=n.querySelector(`.${r}-show-view-watch-button`);if(!l){let a=document.createElement("button");l=a,a.type="button",a.className=`${r}-show-view-watch-button`,n.appendChild(a);let i=async()=>{let o=a.dataset.watchlistSlug;if(o){if(Ie(o)){wo(o);return}a.dataset.state="adding",a.textContent="Adding...",a.disabled=!0,await So({slug:o,title:a.dataset.title||o,year:a.dataset.year||"",poster:a.dataset.poster||"",episode:Gr(a)}),nm(a)}};a.addEventListener("click",()=>{i()})}l.dataset.watchlistSlug=t.slug,l.dataset.title=t.title,l.dataset.year=t.year,l.dataset.poster=t.poster,t.episode?(l.dataset.season=String(t.episode.season),l.dataset.episode=String(t.episode.episode),l.dataset.idEpisode=String(t.episode.idEpisode)):(delete l.dataset.season,delete l.dataset.episode,delete l.dataset.idEpisode),nm(l)}function fo(){!Bl()||Xd()||document.querySelectorAll('a[href*="/movies/view/"]').forEach(t=>{let e=t.closest(".slide-item")||t.closest(".movie-item")||t.closest(".mv-item")||t.closest(".movie-item-style-2")||t.closest(".slide-item__backdrop--wrapper")||t.closest(".item")||t.parentElement,n=_2(e);if(!n||!e)return;let l=e.querySelector(".slide-item__buttons")||e.querySelector(".image__placeholder")||e,a=l.querySelector(`.${r}-movie-watch-button`);if(!a){let i=document.createElement("button");a=i,i.type="button",i.className=`${r}-movie-watch-button ${r}-episode-watch-button`,l.appendChild(i),getComputedStyle(l).position==="static"&&(l.style.position="relative"),i.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation();let u=i.dataset.watchlistSlug;if(u){if(bn(u)){yo(u);return}bo({slug:u,title:i.dataset.title||u,year:i.dataset.year||"",poster:i.dataset.poster||"",href:i.dataset.href||Yr(u)}),lm(i)}})}a.dataset.watchlistSlug=n.slug,a.dataset.title=n.title,a.dataset.year=n.year,a.dataset.poster=n.poster,a.dataset.href=n.href,lm(a)})}function rm(){if(!Bl()||!eb())return;let t=N2();if(!t)return;let e=document.querySelector(".watch-heading")||document.querySelector(".movie-single-ct.main-content")||document.querySelector(".internal-page-container");if(!e)return;let n=document.querySelector(`.${r}-movie-view-watch-wrap`);n||(n=document.createElement("div"),n.className=`${r}-show-view-watch-wrap ${r}-movie-view-watch-wrap`,e.appendChild(n));let l=n.querySelector(`.${r}-movie-view-watch-button`);if(!l){let a=document.createElement("button");l=a,a.type="button",a.className=`${r}-show-view-watch-button ${r}-movie-view-watch-button`,n.appendChild(a),a.addEventListener("click",()=>{let i=a.dataset.watchlistSlug;if(i){if(bn(i)){yo(i);return}bo({slug:i,title:a.dataset.title||i,year:a.dataset.year||"",poster:a.dataset.poster||"",href:a.dataset.href||Yr(i)}),am(a)}})}l.dataset.watchlistSlug=t.slug,l.dataset.title=t.title,l.dataset.year=t.year,l.dataset.poster=t.poster,l.dataset.href=t.href,am(l)}function Xr(){return Object.values(h.watchlistStore.shows)}function Ie(t){return t&&h.watchlistStore.shows[t]||null}function L2(t){return t&&Xr().find(e=>e.idShow===t)||null}function Y1(t){return[...t].sort((e,n)=>{let l=e.latestEpisode?tn(e)?1:0:2,a=n.latestEpisode?tn(n)?1:0:2;return l!==a?l-a:e.title.localeCompare(n.title)})}function D2(t,e){return t?!t.idShow||!t.latestEpisode||!t.upcoming?!0:!t.lastSyncedAt||e-t.lastSyncedAt>=Rm:!1}function Hl(){op(h.watchlistStore),Rt(),ll(),ol(),No()}function ce(t,e){h.watchlistMessage=t||"",h.watchlistMessageTone=e||"muted",Rt()}async function ub(t,e){let n=await jl(`/shows/view/${t}`),l=/id_show:\s*(\d+)/.exec(n),a=/title:\s*'((?:\\'|[^'])*)'/.exec(n),i=/year:\s*'((?:\\'|[^'])*)'/.exec(n),o=/poster_medium:\s*'((?:\\'|[^'])*)'/.exec(n);return{slug:t,idShow:l?tt(l[1]):0,title:a?de(a[1]).trim():e?.title?e.title:t,year:i?de(i[1]).trim():e?.year?e.year:"",poster:o?de(o[1]).trim():e?.poster?e.poster:""}}async function rb(t){let e=await Yo(`/api/v2/download/episode/list?id=${t}`),n=[];ei(ut(e,"list")).forEach(([i,o])=>{ei(o).forEach(([u,s])=>{let m=me({season:i,episode:u,idEpisode:ut(s,"id_episode")});m&&n.push(m)})}),n.sort(Fe);let l=ut(e,"latest")||null,a=me({season:ut(l,"season"),episode:ut(l,"episode"),idEpisode:ut(l,"id_episode")});return a&&(a.updatedAt=Date.now()),{latestEpisode:a,episodes:n}}function $2(t,e){let n=e?t.findIndex(a=>Fe(a,e)>0):0,l=n<0?[]:t.slice(n);return{afterIdEpisode:e?e.idEpisode:0,total:l.length,episodes:l.slice(0,Dm).map(({season:a,episode:i,idEpisode:o})=>({season:a,episode:i,idEpisode:o}))}}function Wd(t){let e=t?.upcoming;if(!t||!e)return null;let{lastWatched:n}=t,l=n?n.idEpisode:0;if(e.afterIdEpisode===l)return e;if(!n)return null;let a=e.episodes.findIndex(i=>Fe(i,n)>0);return a<0?e.episodes.length===e.total?{afterIdEpisode:l,total:0,episodes:[]}:null:a===0?null:{afterIdEpisode:l,total:e.total-a,episodes:e.episodes.slice(a)}}function sb(t){t.upcoming&&!Wd(t)&&vn({force:!0,slugs:[t.slug]})}async function So(t){if(!t?.slug)return;let e=Ie(t.slug);if(e){ce(`${e.title} is already in your watchlist.`,"muted"),ol();return}ce(`Adding ${t.title||t.slug}...`,"muted");let n={slug:t.slug,idShow:0,title:t.title||t.slug,year:t.year||"",poster:t.poster||""};try{n=await ub(t.slug,t)}catch(a){console.warn(`[${r}] Failed to resolve show metadata for ${t.slug}.`,a)}let l=li(t.slug,{slug:t.slug,idShow:n.idShow,title:n.title||t.title||t.slug,year:n.year||t.year||"",poster:n.poster||t.poster||"",addedAt:Date.now(),latestEpisode:t.episode||null,lastSyncedAt:0});l&&(h.watchlistStore.shows[t.slug]=l),Hl(),ce(`${n.title||t.title||t.slug} added to your watchlist.`,"success"),await vn({force:!0,slugs:[t.slug]})}function wo(t){let e=Ie(t);e&&(delete h.watchlistStore.shows[t],Hl(),ce(`${e.title} removed from your watchlist.`,"muted"))}function $1(t){let e=Ie(t);e?.latestEpisode&&(tn(e)?(e.lastWatched=null,ce(`${e.title} marked as having an unwatched latest episode.`,"muted")):(e.lastWatched={...e.latestEpisode,watchedAt:Date.now()},ce(`${e.title} marked watched through ${Lt(e.latestEpisode)}.`,"success")),Hl(),sb(e))}async function vn(t){let e=!!t?.force,n=t&&Array.isArray(t.slugs)?new Set(t.slugs):null;if(h.watchlistRefreshPromise)return h.watchlistRefreshPromise;let l=Date.now(),a=Xr().filter(i=>n&&!n.has(i.slug)?!1:e||D2(i,l));if(!a.length){Rt(),ol();return}return h.watchlistBusy=!0,ce(`Refreshing ${a.length} watchlist ${a.length===1?"show":"shows"}...`,"muted"),h.watchlistRefreshPromise=(async()=>{for(let i of a)try{if(!i.idShow){let s=await ub(i.slug,i);i.idShow=s.idShow,i.title=s.title||i.title,i.year=s.year||i.year,i.poster=s.poster||i.poster}if(!i.idShow)throw new Error("Unable to resolve show id.");let{latestEpisode:o,episodes:u}=await rb(i.idShow);i.latestEpisode=o,i.upcoming=$2(u,i.lastWatched),i.lastSyncError="",i.lastSyncedAt=Date.now()}catch(o){i.lastSyncError=Vm(o),i.lastSyncedAt=Date.now(),console.warn(`[${r}] Failed to refresh ${i.slug}.`,o)}Hl(),ce("Watchlist refreshed.","success"),sm()})().catch(i=>{console.warn(`[${r}] Watchlist refresh failed.`,i),ce("Watchlist refresh failed.","danger")}).finally(()=>{h.watchlistBusy=!1,Rt(),ol(),h.watchlistRefreshPromise=null}),h.watchlistRefreshPromise}function cb(){let t=tt(ni("id_show"));if(t)return t;let e=Array.from(document.scripts).find(l=>/id_show:\s*\d+/.test(l.textContent||"")),n=e?/id_show:\s*(\d+)/.exec(e.textContent):null;return n?tt(n[1]):0}function H2(){if(!location.pathname.startsWith("/shows/play/"))return null;let t=/^#S(\d+)-E(\d+)-(\d+)$/i.exec(location.hash);if(!t)return null;let e=cb(),n=tt(t[1]),l=tt(t[2]),a=tt(t[3]);return!e||!n||!l||!a?null:{idShow:e,season:n,episode:l,idEpisode:a}}function fb(){let t=H2();if(!t)return;let e=`${t.idShow}:${t.idEpisode}`;if(e===h.lastTrackedEpisodeSignature)return;let n=L2(t.idShow);n&&(n.lastWatched={season:t.season,episode:t.episode,idEpisode:t.idEpisode,watchedAt:Date.now()},(!n.latestEpisode||Fe(n.lastWatched,n.latestEpisode)>0)&&(n.latestEpisode={season:t.season,episode:t.episode,idEpisode:t.idEpisode,updatedAt:Date.now()}),h.lastTrackedEpisodeSignature=e,Hl(),sb(n),ce(`${n.title} updated to watched through ${Lt(n.lastWatched)}.`,"success"))}var Ao=null;function sm(){if(Ao)return Ao;let t=new Map,e=(n,...l)=>{t.set(n,[...t.get(n)||[],...l])};return Object.values(h.watchlistStore.shows).forEach(n=>{e(n.slug,n.latestEpisode,n.lastWatched,n.upcoming?.episodes[0])}),Object.values(h.playlistStore.entries).forEach(n=>{e(n.slug,n.episode)}),Ao=(async()=>{for(let[n,l]of t)await Qo(n,l)&&Rt()})().finally(()=>{Ao=null}),Ao}function B2(){let t=/^#S(\d+)-E(\d+)-(\d+)$/i.exec(location.hash);return t?{season:Number(t[1]),episode:Number(t[2]),idEpisode:Number(t[3])}:null}async function Ir(){let t=cb(),e=B2();if(!t||!e)return null;let{episodes:n}=await rb(t);return n.find(l=>Fe(l,e)>0)||null}var Wr=`${r}-autonext`,cm=0,Za=null;function Ja(){window.clearInterval(cm),cm=0,Za&&(Za.remove(),Za=null)}function db(t){Ja(),Ll(t)}function q2(t){let e=document.createElement("div");e.className=Wr,e.setAttribute("role","status");let n=document.createElement("p");n.append("Up next: ");let l=document.createElement("strong");l.textContent=Lt(t),n.append(l," in ");let a=document.createElement("span");a.className=`${Wr}-seconds`,n.append(a,"s");let i=document.createElement("button");i.type="button",i.className=`${Wr}-play`,i.textContent="Play now",i.addEventListener("click",u=>{u.stopPropagation(),db(t)});let o=document.createElement("button");return o.type="button",o.textContent="Cancel",o.addEventListener("click",u=>{u.stopPropagation(),Ja()}),e.append(n,i,o),e}async function Pr(t){if(!!!t?.force&&!h.settings.autoNextEpisode||!location.pathname.startsWith("/shows/play/"))return!1;let n=location.hash,l=null;try{l=await Ir()}catch(s){console.warn(`[${r}] Could not look up the next episode.`,s)}let a=document.getElementById("video_player");if(!l||!a||location.hash!==n)return!1;let i=l;Ja(),Za=q2(i),a.appendChild(Za);let o=$m,u=Za.querySelector(`.${Wr}-seconds`);return u?(u.textContent=String(o),cm=window.setInterval(()=>{o-=1,location.hash!==n?Ja():o<=0?db(i):u.textContent=String(o)},1e3),!0):!1}var Fr=`${r}-buffering`,k2=200,V2=500,Y2=1;function j2(t){let{buffered:e,currentTime:n}=t;for(let l=0;l<e.length;l+=1)if(e.start(l)<=n+.25&&n<=e.end(l))return Math.max(0,e.end(l)-n);return 0}function X2(){let t=document.createElement("div");t.className=Fr,t.setAttribute("role","status"),t.setAttribute("aria-live","polite");let e=document.createElement("span");e.className=`${Fr}-spinner`,e.setAttribute("aria-hidden","true");let n=document.createElement("strong");n.textContent="Buffering";let l=document.createElement("small");return l.className=`${Fr}-detail`,t.append(e,n,l),t}function ts(t){if(t._lookmovieBufferingAttached||!t.closest("#video_player"))return;t._lookmovieBufferingAttached=!0;let e=!1,n=0,l=null,a=()=>!t.paused&&!t.ended&&(e||t.readyState<HTMLMediaElement.HAVE_FUTURE_DATA),i=()=>{window.clearTimeout(n),n=0,l?.remove(),l=null},o=()=>{let d=l?.querySelector("strong"),g=l?.querySelector(`.${Fr}-detail`),E=j2(t),_=E>=Y2;d&&(d.textContent=_?"Stalled":"Buffering"),g&&(g.textContent=_?`${E.toFixed(0)}s buffered, player stuck`:`${E.toFixed(1)}s buffered ahead`),l?.setAttribute("data-kind",_?"stalled":"buffering")},u=()=>{let d=t.closest("#video_player");!d||!a()||(l?.isConnected||(l=X2(),d.appendChild(l)),o())},s=()=>{if(!t.isConnected){i(),window.clearInterval(v);return}if(!a()){i();return}l?o():n||(n=window.setTimeout(()=>{n=0,u()},k2))},m=()=>{e=!0,s()},p=()=>{e=!1,s()};t.addEventListener("waiting",m),t.addEventListener("stalled",s),["playing","pause","ended","emptied","seeked"].forEach(d=>{t.addEventListener(d,p)}),["canplay","progress","timeupdate"].forEach(d=>{t.addEventListener(d,s)});let v=window.setInterval(s,V2)}var Mo=`${r}-intro`,G2=1,mb=5,fm=null,Ia=null,mm="",dm="",Sn=null,pb=0;function es(){return fm||(fm=hp()),fm}function ls(){let t=/^\/shows\/play\/(?:\d+-)?([^/?#]+)/i.exec(location.pathname);return t?(t[1]??"").toLowerCase():""}function as(){let t=ls();return t&&es()[t]||null}function is(){let t=as();return t&&Number.isFinite(t.start)?t:null}function ns(t){let e=ls(),n={...as()||{},...t,updatedAt:Date.now()};Object.keys(n).forEach(l=>{n[l]===void 0&&delete n[l]}),Number.isFinite(n.start)||Number.isFinite(n.creditsFromEnd)?es()[e]=n:delete es()[e],gp(es())}function ql(t){let e=Math.max(0,Math.round(t));return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function Co(){return document.querySelector("#video_player video")}function pm(t,e){return!!t&&e>=t.start&&e<t.end-G2}function ze(t){let e=yb();if(!e)return;let n=e.querySelector(`.${Mo}-toast`);n&&(n.textContent=t,n.hidden=!1,window.clearTimeout(pb),pb=window.setTimeout(()=>{n.hidden=!0},2500))}function os(){let t=Co(),e=is();return!t||!pm(e,t.currentTime)?!1:(mm=location.hash,t.currentTime=e.end,ze("Skipped intro"),!0)}function kl(t,e,n){let l=document.createElement("button");return l.type="button",l.className=e,l.textContent=t,l.addEventListener("click",a=>{a.stopPropagation(),n()}),l}function Q2(t,e){let n=document.createElement("div");n.className=`${r}-player-menu-row`;let l=document.createElement("span");l.textContent="Intro",n.append(l);let a=is();if(Ia!==null){let i=Ia;n.append(kl(`Mark end (from ${ql(i)})`,t,()=>{let o=Co(),u=o?o.currentTime:0;if(u-i<mb){ze(`Play past the intro first (at least ${mb}s).`);return}ns({start:i,end:u}),Ia=null,mm=location.hash,ze(`Intro saved: ${ql(i)}\u2013${ql(u)}`),e()}),kl("Cancel",t,()=>{Ia=null,e()}))}else if(a){let i=document.createElement("em");i.textContent=`${ql(a.start)}\u2013${ql(a.end)}`,n.append(i,kl("Clear",t,()=>{ns({start:void 0,end:void 0}),gb(Co()),ze("Intro cleared for this show."),e()}))}else n.append(kl("Mark start here",t,()=>{let i=Co();Ia=i?i.currentTime:0,ze("Now play to the end of the intro and mark it."),e()}));return n}function K2(t,e){let n=document.createElement("div");n.className=`${r}-player-menu-row`;let l=document.createElement("span");l.textContent="Credits",n.append(l);let a=as();if(a?.creditsFromEnd!==void 0&&Number.isFinite(a.creditsFromEnd)){let i=document.createElement("em");i.textContent=`last ${ql(a.creditsFromEnd)}`,n.append(i,kl("Clear",t,()=>{ns({creditsFromEnd:void 0}),ze("Credits cleared for this show."),e()}))}else n.append(kl("Mark credits start here",t,()=>{let i=Co();if(!i||!Number.isFinite(i.duration))return;let o=i.duration-i.currentTime;ns({creditsFromEnd:o}),dm=location.hash,ze(`Credits saved: last ${ql(o)} of each episode.`),e()}));return n}function hb(t,e){if(!ls())return null;let n=document.createElement("div");n.className=`${r}-player-menu-section`;let l=document.createElement("p");return l.className=`${r}-player-menu-heading`,l.textContent="This show",n.append(l,Q2(t,e),K2(t,e)),n}function gb(t){if(!Sn)return;let e=Sn.querySelector(`.${Mo}-skip`);e&&(e.hidden=!(!h.settings.autoSkipIntro&&pm(is(),t?t.currentTime:-1)))}function yb(){let t=document.getElementById("video_player");if(!t)return null;if(Sn?.parentElement===t)return Sn;Sn=document.createElement("div"),Sn.className=Mo;let e=kl("Skip intro",`${Mo}-skip`,os);e.hidden=!0;let n=document.createElement("p");return n.className=`${Mo}-toast`,n.hidden=!0,Sn.append(e,n),t.appendChild(Sn),Sn}function vb(t){if(!ls()||!yb())return;let e=as(),n=t.currentTime;h.settings.autoSkipIntro&&mm!==location.hash&&Ia===null&&pm(is(),n)&&os(),e?.creditsFromEnd!==void 0&&Number.isFinite(e.creditsFromEnd)&&h.settings.autoSkipCredits&&dm!==location.hash&&Number.isFinite(t.duration)&&!t.paused&&t.duration-n<=e.creditsFromEnd&&(dm=location.hash,Pr({force:!0})),gb(t)}var hm=`${r}-player-menu`,Z2=`${r}-player-menu-button`,bb="#video_player .vjs-settings-quality-menu",J2=[{key:"autoPlay",label:"Auto play"},{key:"autoNextEpisode",label:"Auto next episode",showsOnly:!0},{key:"autoSkipIntro",label:"Auto skip intros",showsOnly:!0},{key:"autoSkipCredits",label:"Skip credits to next episode",showsOnly:!0},{key:"autoFullscreen",label:"Auto fullscreen"},{key:"windowedFullscreen",label:"Windowed fullscreen"}];function I2(){return location.pathname.startsWith("/shows/play/")}function Sb(){return document.querySelector("#video_player video")}function us(t=Sb()){t&&t.playbackRate!==h.settings.playbackRate&&(t.playbackRate=h.settings.playbackRate)}function wb(t){nl({...h.settings,playbackRate:t}),us(),ze(`Speed ${t}\xD7`),Oo()}function gm(t){let e=ul.indexOf(h.settings.playbackRate),n=ul[Math.max(0,Math.min(ul.length-1,e+t))];n!==void 0&&n!==h.settings.playbackRate&&wb(n)}async function ym(){let t=Sb();if(!t||!document.pictureInPictureEnabled)return!1;try{return document.pictureInPictureElement?await document.exitPictureInPicture():await t.requestPictureInPicture(),!0}catch(e){return console.warn(`[${r}] Picture-in-picture failed.`,e),!1}}function Eb(t){let e=document.createElement("div");e.className=`${r}-player-menu-section`;let n=document.createElement("p");return n.className=`${r}-player-menu-heading`,n.textContent=t,e.append(n),e}function W2(){let t=Eb("Speed"),e=document.createElement("div");return e.className=`${r}-player-menu-chips`,ul.forEach(n=>{let l=document.createElement("button");l.type="button",l.textContent=`${n}\xD7`,l.dataset.active=n===h.settings.playbackRate?"true":"false",l.addEventListener("click",()=>{wb(n)}),e.append(l)}),t.append(e),t}function P2(){let t=Eb("Enhancer");if(J2.filter(e=>!e.showsOnly||I2()).forEach(e=>{let n=document.createElement("button");n.type="button",n.className=`${r}-player-menu-toggle`,n.setAttribute("role","menuitemcheckbox"),n.setAttribute("aria-checked",h.settings[e.key]?"true":"false"),n.textContent=e.label,n.addEventListener("click",()=>{nl({...h.settings,[e.key]:!h.settings[e.key]}),Oo()}),t.append(n)}),document.pictureInPictureEnabled){let e=document.createElement("button");e.type="button",e.className=`${r}-player-menu-toggle`,e.textContent="Picture-in-picture",e.addEventListener("click",()=>{ym()}),t.append(e)}return t}function Oo(){let t=document.querySelector(`${bb} .${hm}`);if(!t)return;t.replaceChildren(W2(),P2());let e=hb(Z2,Oo);e&&t.append(e)}function vm(){let t=document.querySelector(bb),e=t?.querySelector(".vjs-settings-body");if(!t||!e||e.querySelector(`.${hm}`))return;let n=e.querySelector(".vjs-menu");if(n&&!e.querySelector(`.${r}-quality-heading`)){let i=document.createElement("p");i.className=`${r}-player-menu-heading ${r}-quality-heading`,i.textContent="Quality",e.insertBefore(i,n)}let l=document.createElement("div");l.className=hm,l.addEventListener("click",i=>{i.stopPropagation()}),e.append(l),Oo();let a=t.parentElement?.querySelector("button");a&&a.addEventListener("click",Oo)}function Tb(){return document.getElementById("video_player")}function co(){return Km(document.getElementById("video_player"))}var Wa=Zm(co);function Iv(){return Wa.play()}function Wv(){return Wa.pause()}function Pv(){return Wa.toggle()}function Fv(t){return Wa.seekBy(t)}function t1(t){return Wa.setVolume(t)}function e1(t){return Wa.setMuted(t)}function n1(){let t=document.getElementById("video_player"),e=t?.querySelector(".vjs-fullscreen-control"),n=!!document.getElementById(Vl),l=!!document.fullscreenElement,a=!!t?.classList.contains("vjs-fullscreen");return n||l||a?(n&&Xa(),l&&typeof document.exitFullscreen=="function"&&document.exitFullscreen(),a&&e&&e.click(),h.fullscreenTriggered=!1,!0):_b()}function _b(){let t=document.getElementById("video_player");if(document.getElementById(Vl)||document.fullscreenElement||t?.classList.contains("vjs-fullscreen"))return!0;if(!t)return!1;let e=t.querySelector(".vjs-fullscreen-control");if(e&&e.click(),h.settings.windowedFullscreen)eT();else if(!e)return!1;return h.fullscreenTriggered=!0,!0}function xb(t){history.replaceState(null,"",`#S${t.season}-E${t.episode}-${t.idEpisode}`),window.dispatchEvent(new Event("ChangedEpisodeHash"))}function Ll(t){return location.pathname.startsWith("/shows/play/")?t?(xb(t),!0):(Ir().then(e=>{e?xb(e):ze("This is the last episode.")}).catch(e=>{console.warn(`[${r}] Could not find the next episode.`,e)}),!0):!1}function F2(){if(!h.settings.autoPlay)return!1;let t=document.getElementById("progress-continue-button"),e=document.getElementById("progress-from-beginning-button"),n=Number.parseFloat(document.getElementById("progress-bar")?.style.width??""),l=Number.isFinite(n)&&n>=Uo?e||t:t||e;return l?(console.info(`[${r}] Dismissing playback modal (${l.id}).`),l.click(),!0):!1}function tT(){let t=Tb();if(!t)return!1;let e=document.getElementById(Le);if(e||(e=document.createElement("button"),e.id=Le,e.type="button",e.textContent="Exit",e.setAttribute("aria-label","Exit windowed fullscreen"),e.title="Exit windowed fullscreen",e.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),Xa(),h.fullscreenTriggered=!1})),e.parentElement!==t&&t.appendChild(e),!t._lookmovieFullscreenExitActivityAttached){let n=()=>{window.clearTimeout(t._lookmovieFullscreenExitActivityTimer),t.classList.add(`${r}-fullscreen-exit-active`),t._lookmovieFullscreenExitActivityTimer=window.setTimeout(()=>{t.classList.remove(`${r}-fullscreen-exit-active`)},1600)};t._lookmovieFullscreenExitActivityAttached=!0,t.addEventListener("pointermove",n)}return!0}function eT(){if(!document.head)return!1;if(!document.getElementById(Vl)){let t=document.createElement("style");t.id=Vl,t.textContent=`
            #video_player {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                z-index: 999999 !important;
                background: black !important;
                cursor: none !important;
            }

            #video_player.${r}-fullscreen-exit-active {
                cursor: auto !important;
            }

            body.${r}-fullscreen {
                overflow: hidden !important;
            }

            #${Le} {
                position: absolute !important;
                top: 14px !important;
                right: 14px !important;
                z-index: 1000000 !important;
                min-width: 0 !important;
                border: 1px solid rgba(255, 255, 255, 0.34) !important;
                border-radius: 999px !important;
                padding: 8px 12px !important;
                background: rgba(15, 23, 42, 0.86) !important;
                color: #f8fafc !important;
                font: 700 12px/1 Arial, sans-serif !important;
                letter-spacing: 0 !important;
                cursor: pointer !important;
                opacity: 0 !important;
                pointer-events: none !important;
                transform: translateY(-4px) !important;
                transition: opacity 0.15s ease, transform 0.15s ease, border-color 0.15s ease !important;
            }

            #video_player.${r}-fullscreen-exit-active #${Le},
            #${Le}:hover,
            #${Le}:focus-visible {
                opacity: 1 !important;
                pointer-events: auto !important;
                transform: translateY(0) !important;
            }

            #${Le}:hover,
            #${Le}:focus-visible {
                border-color: rgba(125, 211, 252, 0.78) !important;
            }
        `,document.head.appendChild(t)}return tT(),document.body&&document.body.classList.add(`${r}-fullscreen`),!0}function Xa(){let t=document.getElementById(Vl);t&&t.remove();let e=Tb();e&&(window.clearTimeout(e._lookmovieFullscreenExitActivityTimer),e.classList.remove(`${r}-fullscreen-exit-active`));let n=document.getElementById(Le);n&&n.remove(),document.body&&document.body.classList.remove(`${r}-fullscreen`)}function nT(){return!h.settings.autoFullscreen||h.fullscreenTriggered?!1:(console.info(`[${r}] Applying fullscreen behavior.`),_b())}function lT(){Ja(),fb(),so("play"),!(!h.settings.autoPlay&&!h.settings.autoFullscreen)&&window.setTimeout(()=>{let t=F2();window.setTimeout(()=>{nT()},t?500:200)},300)}function aT(){so("pause")}function iT(){so("ended"),window.setTimeout(()=>{f1()||Pr()},750)}function bm(t){!t||t._lookmovieEnhancerAttached||(t._lookmovieEnhancerAttached=!0,ts(t),t.addEventListener("play",lT),t.addEventListener("loadstart",()=>{ts(t)}),t.addEventListener("loadedmetadata",()=>{ts(t),t.closest("#video_player")&&(vm(),us(t))}),t.addEventListener("play",()=>{t.closest("#video_player")&&us(t)}),t.addEventListener("pause",aT),t.addEventListener("ended",iT),t.addEventListener("timeupdate",()=>{t.closest("#video_player")&&(vm(),vb(t))}))}function Sm(){document.querySelectorAll("video").forEach(t=>{bm(t)})}function Nb(){qm(t=>{Sm(),new MutationObserver(n=>{n.forEach(l=>{l.type==="childList"&&l.addedNodes.forEach(a=>{if(a.nodeType!==Node.ELEMENT_NODE)return;let i=a;i.tagName==="VIDEO"&&bm(i),typeof i.querySelectorAll=="function"&&i.querySelectorAll("video").forEach(o=>{bm(o)})})})}).observe(t,{childList:!0,subtree:!0})})}var Mb=".player-pre-init-ads",oT=".pre-init-ads--close, .pre-init-ads--back-button";function uT(){let t=window;t.__lookmovie2EnhancerAdBypass||(t.__lookmovie2EnhancerAdBypass=!0,Object.defineProperty(window,"_preInitAdsTimestamp",{configurable:!0,get:()=>Date.now(),set:()=>{}}))}function rT(t){let e=document.createElement("script");e.textContent=t,(document.head??document.documentElement).appendChild(e),e.remove()}function sT(){Do(Am,".ad-container { display: none !important; }")}function Ab(){let t=document.querySelector(Mb);if(!t||t.classList.contains("tw-hidden"))return!1;let e=t.querySelector(oT);return e?(e.click(),console.info(`[${r}] Skipped ad countdown.`),!0):!1}function Cb(){try{rT(`(${uT.toString()})();`)}catch(t){console.warn(`[${r}] Failed to install ad timer bypass.`,t)}sT()}function Ob(){let t=document.querySelector(Mb);t&&(Ab(),new MutationObserver(()=>{Ab()}).observe(t,{attributes:!0,attributeFilter:["class"]}))}var cT=`${r}-stats`,fT=1e3,We=null,Rb=0,wm=0,Em=null,ss=0,rs=0;function Ub(){return document.querySelector("#video_player video")}function dT(t){let{buffered:e,currentTime:n}=t;for(let l=0;l<e.length;l+=1)if(e.start(l)<=n+.25&&n<=e.end(l))return e.end(l)-n;return 0}function mT(){return document.fullscreenElement?"native":document.getElementById(`${r}-fullscreen-style`)?"windowed":"off"}function Lb(t){rs&&(ss=Math.max(ss,t-rs)),rs=t,wm=window.requestAnimationFrame(Lb)}function zb(){let t=Ub();if(!We||!t)return;We.parentElement!==t.closest("#video_player")&&t.closest("#video_player")?.appendChild(We);let e=t.getVideoPlaybackQuality(),n=performance.now(),l={at:n,total:e.totalVideoFrames,dropped:e.droppedVideoFrames},a=Em;Em=l;let i=a?(n-a.at)/1e3:0,o=a?l.total-a.total:0,u=a?l.dropped-a.dropped:0,s=i?o/i:0,m=o?100*u/o:0,p=l.total?100*l.dropped/l.total:0,v=t.getBoundingClientRect(),d=window.devicePixelRatio||1;We.textContent=[`stream    ${t.videoWidth}x${t.videoHeight}`,`drawn at  ${Math.round(v.width*d)}x${Math.round(v.height*d)} (dpr ${d})`,`fps       ${s.toFixed(1)}  rate ${t.playbackRate}x`,`dropped   ${u}/s (${m.toFixed(0)}%)  total ${l.dropped} (${p.toFixed(1)}%)`,`buffer    ${dT(t).toFixed(1)}s ahead  readyState ${t.readyState}`,`jank      worst frame gap ${Math.round(ss)}ms`,`fullscr   ${mT()}  ${t.paused?"paused":"playing"}`].join(`
`),ss=0}function Db(){return We?(window.clearInterval(Rb),window.cancelAnimationFrame(wm),We.remove(),We=null,Em=null,rs=0,!0):Ub()?(We=document.createElement("pre"),We.className=cT,We.setAttribute("aria-hidden","true"),zb(),Rb=window.setInterval(zb,fT),wm=window.requestAnimationFrame(Lb),!0):!1}function $b(){return location.pathname.startsWith("/shows/play/")}function pT(t){let e=t;return!!e&&(!!e.isContentEditable||/^(input|textarea|select)$/i.test(e.tagName||""))}function hT(t){if(!document.getElementById("video_player")||t.ctrlKey||t.metaKey||t.altKey||pT(t.target))return;let e=!1;switch(t.key){case"n":case"N":e=$b()&&Ll();break;case"s":case"S":e=os();break;case">":gm(1),e=!0;break;case"<":gm(-1),e=!0;break;case"p":case"P":ym(),e=!0;break;case"d":case"D":e=Db();break;default:break}e&&(t.preventDefault(),t.stopPropagation())}function gT(t){let e=t.target;!(e&&typeof e.closest=="function"&&e.closest(".vjs-next-episode-button"))||!$b()||(t.preventDefault(),t.stopImmediatePropagation(),Ll())}function Hb(){document.addEventListener("keydown",hT,!0),document.addEventListener("click",gT,!0)}function yT(){window.setInterval(()=>{if(location.href===h.lastKnownUrl)return;new URL(h.lastKnownUrl,location.origin).pathname==="/shows"?Kr({persist:!0}):Kr(),h.lastKnownUrl=location.href,h.fullscreenTriggered=!1,h.lastTrackedEpisodeSignature="",Xa(),Sm(),Go(),tm(),Rt(),ol(),Jr(),Zr(),No(),um(),Dl(),fo(),xo(),rm(),ho(),vn()},zm)}function xm(){if(h.domBootstrapped)return;h.domBootstrapped=!0,Ob(),Hb(),Nb(),Zv(),yT(),window.addEventListener("scroll",ob,{passive:!0}),window.addEventListener("pagehide",()=>{Kr({persist:!0})});let t=window.setInterval(()=>{h.uiBootAttempts+=1,Go()&&Rt(),tm(),Jr(),Zr(),um(),fo(),rm(),$r(),(document.getElementById(w)||h.uiBootAttempts>100)&&window.clearInterval(t)},100);Go(),Jr(),Rt(),ll(),ol(),Zr(),No(),Dl(),xo(),ho(),vn(),sm()}Cb();Hr();N1();document.readyState==="loading"?document.addEventListener("DOMContentLoaded",xm,{once:!0}):xm();})();
/*! Bundled license information:

scheduler/cjs/scheduler.production.js:
  (**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.production.js:
  (**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
