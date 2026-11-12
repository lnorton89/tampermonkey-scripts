// ==UserScript==
// @name         LookMovie2 Enhancer
// @version      1.2.0.202611120940
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

"use strict";(()=>{var Ab=Object.create;var ym=Object.defineProperty;var Mb=Object.getOwnPropertyDescriptor;var Cb=Object.getOwnPropertyNames;var Ob=Object.getPrototypeOf,Rb=Object.prototype.hasOwnProperty;var Ue=(t,e)=>()=>{try{return e||t((e={exports:{}}).exports,e),e.exports}catch(n){throw e=0,n}};var zb=(t,e,n,l)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of Cb(e))!Rb.call(t,a)&&a!==n&&ym(t,a,{get:()=>e[a],enumerable:!(l=Mb(e,a))||l.enumerable});return t};var J=(t,e,n)=>(n=t!=null?Ab(Ob(t)):{},zb(e||!t||!t.__esModule?ym(n,"default",{value:t,enumerable:!0}):n,t));var _p=Ue(et=>{"use strict";function Rs(t,e){var n=t.length;t.push(e);t:for(;0<n;){var l=n-1>>>1,a=t[l];if(0<Qo(a,e))t[l]=e,t[n]=a,n=l;else break t}}function De(t){return t.length===0?null:t[0]}function Zo(t){if(t.length===0)return null;var e=t[0],n=t.pop();if(n!==e){t[0]=n;t:for(var l=0,a=t.length,i=a>>>1;l<i;){var o=2*(l+1)-1,u=t[o],s=o+1,d=t[s];if(0>Qo(u,n))s<a&&0>Qo(d,u)?(t[l]=d,t[s]=n,l=s):(t[l]=u,t[o]=n,l=o);else if(s<a&&0>Qo(d,n))t[l]=d,t[s]=n,l=s;else break t}}return e}function Qo(t,e){var n=t.sortIndex-e.sortIndex;return n!==0?n:t.id-e.id}et.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(gp=performance,et.unstable_now=function(){return gp.now()}):(Ms=Date,yp=Ms.now(),et.unstable_now=function(){return Ms.now()-yp});var gp,Ms,yp,tn=[],Tn=[],eS=1,pe=null,Dt=3,zs=!1,oi=!1,ui=!1,Us=!1,Sp=typeof setTimeout=="function"?setTimeout:null,wp=typeof clearTimeout=="function"?clearTimeout:null,vp=typeof setImmediate<"u"?setImmediate:null;function Ko(t){for(var e=De(Tn);e!==null;){if(e.callback===null)Zo(Tn);else if(e.startTime<=t)Zo(Tn),e.sortIndex=e.expirationTime,Rs(tn,e);else break;e=De(Tn)}}function Ls(t){if(ui=!1,Ko(t),!oi)if(De(tn)!==null)oi=!0,Gl||(Gl=!0,Xl());else{var e=De(Tn);e!==null&&Ds(Ls,e.startTime-t)}}var Gl=!1,ri=-1,Ep=5,xp=-1;function Tp(){return Us?!0:!(et.unstable_now()-xp<Ep)}function Cs(){if(Us=!1,Gl){var t=et.unstable_now();xp=t;var e=!0;try{t:{oi=!1,ui&&(ui=!1,wp(ri),ri=-1),zs=!0;var n=Dt;try{e:{for(Ko(t),pe=De(tn);pe!==null&&!(pe.expirationTime>t&&Tp());){var l=pe.callback;if(typeof l=="function"){pe.callback=null,Dt=pe.priorityLevel;var a=l(pe.expirationTime<=t);if(t=et.unstable_now(),typeof a=="function"){pe.callback=a,Ko(t),e=!0;break e}pe===De(tn)&&Zo(tn),Ko(t)}else Zo(tn);pe=De(tn)}if(pe!==null)e=!0;else{var i=De(Tn);i!==null&&Ds(Ls,i.startTime-t),e=!1}}break t}finally{pe=null,Dt=n,zs=!1}e=void 0}}finally{e?Xl():Gl=!1}}}var Xl;typeof vp=="function"?Xl=function(){vp(Cs)}:typeof MessageChannel<"u"?(Os=new MessageChannel,bp=Os.port2,Os.port1.onmessage=Cs,Xl=function(){bp.postMessage(null)}):Xl=function(){Sp(Cs,0)};var Os,bp;function Ds(t,e){ri=Sp(function(){t(et.unstable_now())},e)}et.unstable_IdlePriority=5;et.unstable_ImmediatePriority=1;et.unstable_LowPriority=4;et.unstable_NormalPriority=3;et.unstable_Profiling=null;et.unstable_UserBlockingPriority=2;et.unstable_cancelCallback=function(t){t.callback=null};et.unstable_forceFrameRate=function(t){0>t||125<t?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Ep=0<t?Math.floor(1e3/t):5};et.unstable_getCurrentPriorityLevel=function(){return Dt};et.unstable_next=function(t){switch(Dt){case 1:case 2:case 3:var e=3;break;default:e=Dt}var n=Dt;Dt=e;try{return t()}finally{Dt=n}};et.unstable_requestPaint=function(){Us=!0};et.unstable_runWithPriority=function(t,e){switch(t){case 1:case 2:case 3:case 4:case 5:break;default:t=3}var n=Dt;Dt=t;try{return e()}finally{Dt=n}};et.unstable_scheduleCallback=function(t,e,n){var l=et.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?l+n:l):n=l,t){case 1:var a=-1;break;case 2:a=250;break;case 5:a=1073741823;break;case 4:a=1e4;break;default:a=5e3}return a=n+a,t={id:eS++,callback:e,priorityLevel:t,startTime:n,expirationTime:a,sortIndex:-1},n>l?(t.sortIndex=n,Rs(Tn,t),De(tn)===null&&t===De(Tn)&&(ui?(wp(ri),ri=-1):ui=!0,Ds(Ls,n-l))):(t.sortIndex=a,Rs(tn,t),oi||zs||(oi=!0,Gl||(Gl=!0,Xl()))),t};et.unstable_shouldYield=Tp;et.unstable_wrapCallback=function(t){var e=Dt;return function(){var n=Dt;Dt=e;try{return t.apply(this,arguments)}finally{Dt=n}}}});var Ap=Ue((zT,Np)=>{"use strict";Np.exports=_p()});var Yp=Ue(R=>{"use strict";var Bs=Symbol.for("react.transitional.element"),nS=Symbol.for("react.portal"),lS=Symbol.for("react.fragment"),aS=Symbol.for("react.strict_mode"),iS=Symbol.for("react.profiler"),oS=Symbol.for("react.consumer"),uS=Symbol.for("react.context"),rS=Symbol.for("react.forward_ref"),sS=Symbol.for("react.suspense"),cS=Symbol.for("react.memo"),zp=Symbol.for("react.lazy"),fS=Symbol.for("react.activity"),dS=Symbol.for("react.view_transition"),Mp=Symbol.iterator;function mS(t){return t===null||typeof t!="object"?null:(t=Mp&&t[Mp]||t["@@iterator"],typeof t=="function"?t:null)}var Up={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Lp=Object.assign,Dp={};function Kl(t,e,n){this.props=t,this.context=e,this.refs=Dp,this.updater=n||Up}Kl.prototype.isReactComponent={};Kl.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Kl.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function $p(){}$p.prototype=Kl.prototype;function qs(t,e,n){this.props=t,this.context=e,this.refs=Dp,this.updater=n||Up}var Ys=qs.prototype=new $p;Ys.constructor=qs;Lp(Ys,Kl.prototype);Ys.isPureReactComponent=!0;var Cp=Array.isArray;function Hs(){}var I={H:null,A:null,T:null,S:null},Hp=Object.prototype.hasOwnProperty;function Vs(t,e,n){var l=n.ref;return{$$typeof:Bs,type:t,key:e,ref:l!==void 0?l:null,props:n}}function pS(t,e){return Vs(t.type,e,t.props)}function ks(t){return typeof t=="object"&&t!==null&&t.$$typeof===Bs}function hS(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Op=/\/+/g;function $s(t,e){return typeof t=="object"&&t!==null&&t.key!=null?hS(""+t.key):e.toString(36)}function gS(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(Hs,Hs):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function Ql(t,e,n,l,a){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(i){case"bigint":case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Bs:case nS:o=!0;break;case zp:return o=t._init,Ql(o(t._payload),e,n,l,a)}}if(o)return a=a(t),o=l===""?"."+$s(t,0):l,Cp(a)?(n="",o!=null&&(n=o.replace(Op,"$&/")+"/"),Ql(a,e,n,"",function(d){return d})):a!=null&&(ks(a)&&(a=pS(a,n+(a.key==null||t&&t.key===a.key?"":(""+a.key).replace(Op,"$&/")+"/")+o)),e.push(a)),1;o=0;var u=l===""?".":l+":";if(Cp(t))for(var s=0;s<t.length;s++)l=t[s],i=u+$s(l,s),o+=Ql(l,e,n,i,a);else if(s=mS(t),typeof s=="function")for(t=s.call(t),s=0;!(l=t.next()).done;)l=l.value,i=u+$s(l,s++),o+=Ql(l,e,n,i,a);else if(i==="object"){if(typeof t.then=="function")return Ql(gS(t),e,n,l,a);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return o}function Jo(t,e,n){if(t==null)return t;var l=[],a=0;return Ql(t,l,"","",function(i){return e.call(n,i,a++)}),l}function yS(t){if(t._status===-1){var e=t._result,n=e();n.then(function(l){(t._status===0||t._status===-1)&&(t._status=1,t._result=l,n.status===void 0&&(n.status="fulfilled",n.value=l))},function(l){(t._status===0||t._status===-1)&&(t._status=2,t._result=l,n.status===void 0&&(n.status="rejected",n.reason=l))}),t._status===-1&&(t._status=0,t._result=n)}if(t._status===1)return t._result.default;throw t._result}var Rp=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)};function Bp(t){var e=I.T,n={};n.types=e!==null?e.types:null,I.T=n;try{var l=t(),a=I.S;a!==null&&a(n,l),typeof l=="object"&&l!==null&&typeof l.then=="function"&&l.then(Hs,Rp)}catch(i){Rp(i)}finally{e!==null&&n.types!==null&&(e.types=n.types),I.T=e}}function qp(t){var e=I.T;if(e!==null){var n=e.types;n===null?e.types=[t]:n.indexOf(t)===-1&&n.push(t)}else Bp(qp.bind(null,t))}var vS={map:Jo,forEach:function(t,e,n){Jo(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Jo(t,function(){e++}),e},toArray:function(t){return Jo(t,function(e){return e})||[]},only:function(t){if(!ks(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};R.Activity=fS;R.Children=vS;R.Component=Kl;R.Fragment=lS;R.Profiler=iS;R.PureComponent=qs;R.StrictMode=aS;R.Suspense=sS;R.ViewTransition=dS;R.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=I;R.__COMPILER_RUNTIME={__proto__:null,c:function(t){return I.H.useMemoCache(t)}};R.addTransitionType=qp;R.cache=function(t){return function(){return t.apply(null,arguments)}};R.cacheSignal=function(){return null};R.cloneElement=function(t,e,n){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var l=Lp({},t.props),a=t.key;if(e!=null)for(i in e.key!==void 0&&(a=""+e.key),e)!Hp.call(e,i)||i==="key"||i==="__self"||i==="__source"||i==="ref"&&e.ref===void 0||(l[i]=e[i]);var i=arguments.length-2;if(i===1)l.children=n;else if(1<i){for(var o=Array(i),u=0;u<i;u++)o[u]=arguments[u+2];l.children=o}return Vs(t.type,a,l)};R.createContext=function(t){return t={$$typeof:uS,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:oS,_context:t},t};R.createElement=function(t,e,n){var l,a={},i=null;if(e!=null)for(l in e.key!==void 0&&(i=""+e.key),e)Hp.call(e,l)&&l!=="key"&&l!=="__self"&&l!=="__source"&&(a[l]=e[l]);var o=arguments.length-2;if(o===1)a.children=n;else if(1<o){for(var u=Array(o),s=0;s<o;s++)u[s]=arguments[s+2];a.children=u}if(t&&t.defaultProps)for(l in o=t.defaultProps,o)a[l]===void 0&&(a[l]=o[l]);return Vs(t,i,a)};R.createRef=function(){return{current:null}};R.forwardRef=function(t){return{$$typeof:rS,render:t}};R.isValidElement=ks;R.lazy=function(t){return{$$typeof:zp,_payload:{_status:-1,_result:t},_init:yS}};R.memo=function(t,e){return{$$typeof:cS,type:t,compare:e===void 0?null:e}};R.startTransition=Bp;R.unstable_useCacheRefresh=function(){return I.H.useCacheRefresh()};R.use=function(t){return I.H.use(t)};R.useActionState=function(t,e,n){return I.H.useActionState(t,e,n)};R.useCallback=function(t,e){return I.H.useCallback(t,e)};R.useContext=function(t){return I.H.useContext(t)};R.useDebugValue=function(){};R.useDeferredValue=function(t,e){return I.H.useDeferredValue(t,e)};R.useEffect=function(t,e){return I.H.useEffect(t,e)};R.useEffectEvent=function(t){return I.H.useEffectEvent(t)};R.useId=function(){return I.H.useId()};R.useImperativeHandle=function(t,e,n){return I.H.useImperativeHandle(t,e,n)};R.useInsertionEffect=function(t,e){return I.H.useInsertionEffect(t,e)};R.useLayoutEffect=function(t,e){return I.H.useLayoutEffect(t,e)};R.useMemo=function(t,e){return I.H.useMemo(t,e)};R.useOptimistic=function(t,e){return I.H.useOptimistic(t,e)};R.useReducer=function(t,e,n){return I.H.useReducer(t,e,n)};R.useRef=function(t){return I.H.useRef(t)};R.useState=function(t){return I.H.useState(t)};R.useSyncExternalStore=function(t,e,n){return I.H.useSyncExternalStore(t,e,n)};R.useTransition=function(){return I.H.useTransition()};R.version="19.3.1"});var ul=Ue((LT,Vp)=>{"use strict";Vp.exports=Yp()});var Xp=Ue($t=>{"use strict";var bS=ul();function jp(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function _n(){}var qt={d:{f:_n,r:function(){throw Error(jp(522))},D:_n,C:_n,L:_n,m:_n,X:_n,S:_n,M:_n},p:0,findDOMNode:null},SS=Symbol.for("react.portal"),wS=Symbol.for("react.recoverable"),kp=Symbol.for("react.optimistic_key");function ES(t,e,n){var l=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:SS,key:l==null?null:l===kp?kp:""+l,children:t,containerInfo:e,implementation:n}}var si=bS.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Io(t,e){if(t==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}$t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=qt;$t.browser=function(t){return{$$typeof:wS,_reason:t}};$t.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(jp(299));return ES(t,e,null,n)};$t.flushSync=function(t){var e=si.T,n=qt.p;try{if(si.T=null,qt.p=2,t)return t()}finally{si.T=e,qt.p=n,qt.d.f()}};$t.preconnect=function(t,e){typeof t=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,qt.d.C(t,e))};$t.prefetchDNS=function(t){typeof t=="string"&&qt.d.D(t)};$t.preinit=function(t,e){if(typeof t=="string"&&e&&typeof e.as=="string"){var n=e.as,l=Io(n,e.crossOrigin),a=typeof e.integrity=="string"?e.integrity:void 0,i=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;n==="style"?qt.d.S(t,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:l,integrity:a,fetchPriority:i}):n==="script"&&qt.d.X(t,{crossOrigin:l,integrity:a,fetchPriority:i,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};$t.preinitModule=function(t,e){if(typeof t=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var n=Io(e.as,e.crossOrigin);qt.d.M(t,{crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0})}}else e==null&&qt.d.M(t)};$t.preload=function(t,e){if(typeof t=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var n=e.as,l=Io(n,e.crossOrigin);qt.d.L(t,n,{crossOrigin:l,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};$t.preloadModule=function(t,e){if(typeof t=="string")if(e){var n=Io(e.as,e.crossOrigin);qt.d.m(t,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0})}else qt.d.m(t)};$t.requestFormReset=function(t){qt.d.r(t)};$t.unstable_batchedUpdates=function(t,e){return t(e)};$t.useFormState=function(t,e,n){return si.H.useFormState(t,e,n)};$t.useFormStatus=function(){return si.H.useHostTransitionStatus()};$t.version="19.3.1"});var js=Ue(($T,Qp)=>{"use strict";function Gp(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Gp)}catch(t){console.error(t)}}Gp(),Qp.exports=Xp()});var zv=Ue(Rr=>{"use strict";var vt=Ap(),Rg=ul(),xS=js();function S(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function zg(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Ii(t){for(var e=t,n=e;n&&!n.alternate;)e=n,(e.flags&4098)!==0&&(t=e.return),n=e.return;for(;e.return;)e=e.return;return e.tag===3?t:null}function Ug(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Lg(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Kp(t){if(Ii(t)!==t)throw Error(S(188))}function TS(t){var e=t.alternate;if(!e){if(e=Ii(t),e===null)throw Error(S(188));return e!==t?null:t}for(var n=t,l=e;;){var a=n.return;if(a===null)break;var i=a.alternate;if(i===null){if(l=a.return,l!==null){n=l;continue}break}if(a.child===i.child){for(i=a.child;i;){if(i===n)return Kp(a),t;if(i===l)return Kp(a),e;i=i.sibling}throw Error(S(188))}if(n.return!==l.return)n=a,l=i;else{for(var o=!1,u=a.child;u;){if(u===n){o=!0,n=a,l=i;break}if(u===l){o=!0,l=a,n=i;break}u=u.sibling}if(!o){for(u=i.child;u;){if(u===n){o=!0,n=i,l=a;break}if(u===l){o=!0,l=i,n=a;break}u=u.sibling}if(!o)throw Error(S(189))}}if(n.alternate!==l)throw Error(S(190))}if(n.tag!==3)throw Error(S(188));return n.stateNode.current===n?t:e}function Dg(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=Dg(t),e!==null)return e;t=t.sibling}return null}function Jt(t,e,n,l,a,i){for(;t!==null;){if((t.tag===5||t.tag===27||t.tag===6)&&n(t,l,a,i)||(t.tag!==22||t.memoizedState===null)&&(e||t.tag!==5&&t.tag!==27)&&Jt(t.child,e,n,l,a,i))return!0;t=t.sibling}return!1}function Ml(t){for(t=t.return;t!==null;){if(t.tag===3||t.tag===5||t.tag===27)return t;t=t.return}return null}function Zp(t){var e=!1;for(t=t.return;t!==null&&(t.tag===4&&(e=!0),!(t.tag===3||t.tag===5||t.tag===27));)t=t.return;return e}function $g(t){var e=[null,null],n=Ml(t);return n===null||Hg(e,t,n.child,{foundSelf:!1}),e}function Hg(t,e,n,l){for(;n!==null;){if(n===e)l.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(l.foundSelf)return t[1]=n,!0;t[0]=n}else if((n.tag!==22||n.memoizedState===null)&&Hg(t,e,n.child,l))return!0;n=n.sibling}return!1}function yt(t){switch(t.tag){case 5:case 27:case 6:return t.stateNode;case 3:return t.stateNode.containerInfo;default:throw Error(S(559))}}var ta=null,wc=null;function _S(t,e,n){return t===n?!0:t===e?(ta=t,!0):!1}function NS(t,e,n){return t===n?(wc=t,!1):t===e?(wc!==null&&(ta=t),!0):!1}function Jp(t){if(t===null)return null;do t=t===null?null:t.return;while(t&&t.tag!==5&&t.tag!==27&&t.tag!==3);return t||null}function Ec(t,e,n){for(var l=0,a=t;a;a=n(a))l++;a=0;for(var i=e;i;i=n(i))a++;for(;0<l-a;)t=n(t),l--;for(;0<a-l;)e=n(e),a--;for(;l--;){if(t===e||e!==null&&t===e.alternate)return t;t=n(t),e=n(e)}return null}var Z=Object.assign,AS=Symbol.for("react.element"),Wo=Symbol.for("react.transitional.element"),gi=Symbol.for("react.portal"),ea=Symbol.for("react.fragment"),Bg=Symbol.for("react.strict_mode"),xc=Symbol.for("react.profiler"),qg=Symbol.for("react.consumer"),Ve=Symbol.for("react.context"),Uf=Symbol.for("react.forward_ref"),Tc=Symbol.for("react.suspense"),_c=Symbol.for("react.suspense_list"),Lf=Symbol.for("react.memo"),Cn=Symbol.for("react.lazy"),Nc=Symbol.for("react.activity"),MS=Symbol.for("react.legacy_hidden"),CS=Symbol.for("react.memo_cache_sentinel"),Ac=Symbol.for("react.view_transition"),OS=Symbol.for("react.recoverable"),Ip=Symbol.iterator;function ci(t){return t===null||typeof t!="object"?null:(t=Ip&&t[Ip]||t["@@iterator"],typeof t=="function"?t:null)}var RS=Symbol.for("react.client.reference");function Mc(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===RS?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case ea:return"Fragment";case xc:return"Profiler";case Bg:return"StrictMode";case Tc:return"Suspense";case _c:return"SuspenseList";case Nc:return"Activity";case Ac:return"ViewTransition"}if(typeof t=="object")switch(t.$$typeof){case gi:return"Portal";case Ve:return t.displayName||"Context";case qg:return(t._context.displayName||"Context")+".Consumer";case Uf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Lf:return e=t.displayName||null,e!==null?e:Mc(t.type)||"Memo";case Cn:e=t._payload,t=t._init;try{return Mc(t(e))}catch{}}return null}var yi=Array.isArray,O=Rg.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,V=xS.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,hl={pending:!1,data:null,method:null,action:null},Cc=[],na=-1;function Ze(t){return{current:t}}function At(t){0>na||(t.current=Cc[na],Cc[na]=null,na--)}function F(t,e){na++,Cc[na]=t.current,t.current=e}var Ge=Ze(null),Li=Ze(null),Bn=Ze(null),Hu=Ze(null);function Bu(t,e){switch(F(Bn,e),F(Li,t),F(Ge,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?cg(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=cg(e),t=uv(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}At(Ge),F(Ge,t)}function Ea(){At(Ge),At(Li),At(Bn)}function Oc(t){var e=t.memoizedState;e!==null&&(za._currentValue=e.memoizedState,F(Hu,t)),e=Ge.current;var n=uv(e,t.type);e!==n&&(F(Li,t),F(Ge,n))}function qu(t){Li.current===t&&(At(Ge),At(Li)),Hu.current===t&&(At(Hu),za._currentValue=hl)}var Xs,Wp;function An(t){if(Xs===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Xs=e&&e[1]||"",Wp=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Xs+t+Wp}var Gs=!1;function Qs(t,e){if(!t||Gs)return"";Gs=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(e){var v=function(){throw Error()};if(Object.defineProperty(v.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(v,[])}catch(E){var m=E}Reflect.construct(t,[],v)}else{try{v.call()}catch(E){m=E}v=!1;try{var y=Object.getOwnPropertyDescriptor(t.prototype,"props");Object.defineProperty(t.prototype,"props",{configurable:!0,set:function(){throw Error()}}),v=!0,new t}finally{v&&(y!==void 0?Object.defineProperty(t.prototype,"props",y):delete t.prototype.props)}}}else{try{throw Error()}catch(E){m=E}(v=t())&&typeof v.catch=="function"&&v.catch(function(){})}}catch(E){if(E&&m&&typeof E.stack=="string")return[E.stack,m.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=l.DetermineComponentFrameRoot(),o=i[0],u=i[1];if(o&&u){var s=o.split(`
`),d=u.split(`
`);for(a=l=0;l<s.length&&!s[l].includes("DetermineComponentFrameRoot");)l++;for(;a<d.length&&!d[a].includes("DetermineComponentFrameRoot");)a++;if(l===s.length||a===d.length)for(l=s.length-1,a=d.length-1;1<=l&&0<=a&&s[l]!==d[a];)a--;for(;1<=l&&0<=a;l--,a--)if(s[l]!==d[a]){if(l!==1||a!==1)do if(l--,a--,0>a||s[l]!==d[a]){var p=`
`+s[l].replace(" at new "," at ");return t.displayName&&p.includes("<anonymous>")&&(p=p.replace("<anonymous>",t.displayName)),p}while(1<=l&&0<=a);break}}}finally{Gs=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?An(n):""}function zS(t,e){switch(t.tag){case 26:case 27:case 5:return An(t.type);case 16:return An("Lazy");case 13:return t.child!==e&&e!==null?An("Suspense Fallback"):An("Suspense");case 19:return An("SuspenseList");case 0:case 15:return Qs(t.type,!1);case 11:return Qs(t.type.render,!1);case 1:return Qs(t.type,!0);case 31:return An("Activity");case 30:return An("ViewTransition");default:return""}}function Pp(t){try{var e="",n=null;do e+=zS(t,n),n=t,t=t.return;while(t);return e}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var Rc=Object.prototype.hasOwnProperty,Df=vt.unstable_scheduleCallback,Ks=vt.unstable_cancelCallback,US=vt.unstable_shouldYield,LS=vt.unstable_requestPaint,ae=vt.unstable_now,DS=vt.unstable_getCurrentPriorityLevel,Yg=vt.unstable_ImmediatePriority,Vg=vt.unstable_UserBlockingPriority,Yu=vt.unstable_NormalPriority,$S=vt.unstable_LowPriority,kg=vt.unstable_IdlePriority,HS=vt.log,BS=vt.unstable_setDisableYieldValue,Wi=null,ie=null;function zn(t){if(typeof HS=="function"&&BS(t),ie&&typeof ie.setStrictMode=="function")try{ie.setStrictMode(Wi,t)}catch{}}var oe=Math.clz32?Math.clz32:VS,qS=Math.log,YS=Math.LN2;function VS(t){return t>>>=0,t===0?32:31-(qS(t)/YS|0)|0}var Po=256,Fo=262144,tu=4194304;function cl(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&-t;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function dr(t,e,n){var l=t.pendingLanes;if(l===0)return 0;var a=0,i=t.suspendedLanes,o=t.pingedLanes;t=t.warmLanes;var u=l&134217727;return u!==0?(l=u&~i,l!==0?a=cl(l):(o&=u,o!==0?a=cl(o):n||(n=u&~t,n!==0&&(a=cl(n))))):(u=l&~i,u!==0?a=cl(u):o!==0?a=cl(o):n||(n=l&~t,n!==0&&(a=cl(n)))),a===0?0:e!==0&&e!==a&&(e&i)===0&&(i=a&-a,n=e&-e,i>=n||i===32&&(n&4194048)!==0)?e:a}function Pi(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function jg(t,e){(e&8)!==0&&(e|=e&32);var n=t.entangledLanes;if(n!==0)for(t=t.entanglements,n&=e;0<n;){var l=31-oe(n),a=1<<l;e|=t[l],n&=~a}return e}function kS(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Xg(){var t=tu;return tu<<=1,(tu&62914560)===0&&(tu=4194304),t}function Zs(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Fi(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function jS(t,e,n,l,a,i){var o=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var u=t.entanglements,s=t.expirationTimes,d=t.hiddenUpdates;for(n=o&~n;0<n;){var p=31-oe(n),v=1<<p;u[p]=0,s[p]=-1;var m=d[p];if(m!==null)for(d[p]=null,p=0;p<m.length;p++){var y=m[p];y!==null&&(y.lane&=-536870913)}n&=~v}l!==0&&Gg(t,l,0),i!==0&&a===0&&t.tag!==0&&(t.suspendedLanes|=i&~(o&~e))}function Gg(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var l=31-oe(e);t.entangledLanes|=e,t.entanglements[l]=t.entanglements[l]|1073741824|n&261930}function Qg(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var l=31-oe(n),a=1<<l;a&e|t[l]&e&&(t[l]|=e),n&=~a}}function Kg(t,e){var n=e&-e;return n=(n&42)!==0?1:$f(n),(n&(t.suspendedLanes|e))!==0?0:n}function $f(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Hf(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Zg(){var t=V.p;return t!==0?t:(t=window.event,t===void 0?32:Cv(t.type))}function Fp(t,e){var n=V.p;try{return V.p=t,e()}finally{V.p=n}}var pn=Math.random().toString(36).slice(2),_t="__reactFiber$"+pn,It="__reactProps$"+pn,Da="__reactContainer$"+pn,th="__reactEvents$"+pn,XS="__reactListeners$"+pn,GS="__reactHandles$"+pn,eh="__reactResources$"+pn,to="__reactMarker$"+pn,Vu="__reactLoad$"+pn;function mr(t){delete t[_t],delete t[It],delete t[XS],delete t[GS]}function ml(t){var e;if(e=t[_t])return e;for(var n=t.parentNode;n;){if(e=n[Da]||n[_t]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=vg(t);t!==null;){if(n=t[_t])return n;t=vg(t)}return e}t=n,n=t.parentNode}return null}function $a(t){if(t=t[_t]||t[Da]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function vi(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(S(33))}function da(t){var e=t[eh];return e||(e=t[eh]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function wt(t){t[to]=!0}function Jg(t){t[Vu]=void 0}var Ig=new Set,Wg={};function Cl(t,e){xa(t,e),xa(t+"Capture",e)}function xa(t,e){for(Wg[t]=e,t=0;t<e.length;t++)Ig.add(e[t])}var QS=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),nh={},lh={};function KS(t){return Rc.call(lh,t)?!0:Rc.call(nh,t)?!1:QS.test(t)?lh[t]=!0:(nh[t]=!0,!1)}var q=!1;function ah(){var t=q;return q=!1,t}function vu(t,e,n){if(KS(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var l=e.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,n)}}function eu(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,n)}}function en(t,e,n,l){if(l===null)t.removeAttribute(n);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,l)}}function te(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Pg(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function ZS(t,e,n){var l=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var a=l.get,i=l.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return a.call(this)},set:function(o){n=""+o,i.call(this,o)}}),Object.defineProperty(t,e,{enumerable:l.enumerable}),{getValue:function(){return n},setValue:function(o){n=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function zc(t){if(!t._valueTracker){var e=Pg(t)?"checked":"value";t._valueTracker=ZS(t,e,""+t[e])}}function Fg(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),l="";return t&&(l=Pg(t)?t.checked?"true":"false":t.value),t=l,t!==n?(e.setValue(t),!0):!1}var JS=/[\n"\\]/g;function be(t){return t.replace(JS,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function Uc(t,e,n,l,a,i,o,u){t.name="",o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?t.type=o:t.removeAttribute("type"),e!=null?o==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+te(e)):t.value!==""+te(e)&&(t.value=""+te(e)):o!=="submit"&&o!=="reset"||t.removeAttribute("value"),e!=null?o==="number"&&t.value==e?Js(t,te(t.value)):Js(t,te(e)):n!=null?Js(t,te(n)):l!=null&&t.removeAttribute("value"),a==null&&i!=null&&(t.defaultChecked=!!i),a!=null&&(t.checked=a&&typeof a!="function"&&typeof a!="symbol"),u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?t.name=""+te(u):t.removeAttribute("name")}function ty(t,e,n,l,a,i,o,u){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(t.type=i),e!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||e!=null)){zc(t);return}n=n!=null?""+te(n):"",e=e!=null?""+te(e):n,u||e===t.value||(t.value=e),t.defaultValue=e}l=l??a,l=typeof l!="function"&&typeof l!="symbol"&&!!l,t.checked=u?t.checked:!!l,t.defaultChecked=!!l,o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"&&(t.name=o),zc(t)}function Js(t,e){t.defaultValue!==""+e&&(t.defaultValue=""+e)}function ma(t,e,n,l){if(t=t.options,e){e={};for(var a=0;a<n.length;a++)e["$"+n[a]]=!0;for(n=0;n<t.length;n++)a=e.hasOwnProperty("$"+t[n].value),t[n].selected!==a&&(t[n].selected=a),a&&l&&(t[n].defaultSelected=!0)}else{for(n=""+te(n),e=null,a=0;a<t.length;a++){if(t[a].value===n){t[a].selected=!0,l&&(t[a].defaultSelected=!0);return}e!==null||t[a].disabled||(e=t[a])}e!==null&&(e.selected=!0)}}function ey(t,e,n){if(e!=null&&(e=""+te(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+te(n):""}function ny(t,e,n,l){if(e==null){if(l!=null){if(n!=null)throw Error(S(92));if(yi(l)){if(1<l.length)throw Error(S(93));l=l[0]}n=l}n==null&&(n=""),e=n}n=te(e),t.defaultValue=n,l=t.textContent,l===n&&l!==""&&l!==null&&(t.value=l),zc(t)}function Ta(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var IS=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function ih(t,e,n){var l=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?l?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":l?t.setProperty(e,n):typeof n!="number"||n===0||IS.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function ly(t,e,n){if(e!=null&&typeof e!="object")throw Error(S(62));if(t=t.style,n!=null){for(var l in n)!n.hasOwnProperty(l)||e!=null&&e.hasOwnProperty(l)||(l.indexOf("--")===0?t.setProperty(l,""):l==="float"?t.cssFloat="":t[l]="",q=!0);for(var a in e)l=e[a],e.hasOwnProperty(a)&&n[a]!==l&&(ih(t,a,l),q=!0)}else for(var i in e)e.hasOwnProperty(i)&&ih(t,i,e[i])}function Bf(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var WS=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),PS=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function bu(t){return PS.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function ke(){}var Lc=null;function qf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var la=null,pa=null;function oh(t){var e=$a(t);if(e&&(t=e.stateNode)){var n=t[It]||null;t:switch(t=e.stateNode,e.type){case"input":if(Uc(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+be(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var l=n[e];if(l!==t&&l.form===t.form){var a=l[It]||null;if(!a)throw Error(S(90));Uc(l,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(e=0;e<n.length;e++)l=n[e],l.form===t.form&&Fg(l)}break t;case"textarea":ey(t,n.value,n.defaultValue);break t;case"select":e=n.value,e!=null&&ma(t,!!n.multiple,e,!1)}}}var Is=!1;function ay(t,e,n){if(Is)return t(e,n);Is=!0;try{var l=t(e);return l}finally{if(Is=!1,(la!==null||pa!==null)&&(Ar(),la&&(e=la,t=pa,pa=la=null,oh(e),t)))for(e=0;e<t.length;e++)oh(t[e])}}function Di(t,e){var n=t.stateNode;if(n===null)return null;var l=n[It]||null;if(l===null)return null;n=l[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(t=t.type,l=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!l;break t;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(S(231,e,typeof n));return n}var rn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Dc=!1;if(rn)try{Zl={},Object.defineProperty(Zl,"passive",{get:function(){Dc=!0}}),window.addEventListener("test",Zl,Zl),window.removeEventListener("test",Zl,Zl)}catch{Dc=!1}var Zl,Un=null,Yf=null,Su=null;function iy(){if(Su)return Su;var t,e=Yf,n=e.length,l,a="value"in Un?Un.value:Un.textContent,i=a.length;for(t=0;t<n&&e[t]===a[t];t++);var o=n-t;for(l=1;l<=o&&e[n-l]===a[i-l];l++);return Su=a.slice(t,1<l?1-l:void 0)}function wu(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function nu(){return!0}function uh(){return!1}function jt(t){function e(n,l,a,i,o){this._reactName=n,this._targetInst=a,this.type=l,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var u in t)t.hasOwnProperty(u)&&(n=t[u],this[u]=n?n(i):i[u]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?nu:uh,this.isPropagationStopped=uh,this}return Z(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=nu)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=nu)},persist:function(){},isPersistent:nu}),e}var Fn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},pr=jt(Fn),eo=Z({},Fn,{view:0,detail:0}),FS=jt(eo),Ws,Ps,fi,hr=Z({},eo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Vf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==fi&&(fi&&t.type==="mousemove"?(Ws=t.screenX-fi.screenX,Ps=t.screenY-fi.screenY):Ps=Ws=0,fi=t),Ws)},movementY:function(t){return"movementY"in t?t.movementY:Ps}}),rh=jt(hr),tw=Z({},hr,{dataTransfer:0}),ew=jt(tw),nw=Z({},eo,{relatedTarget:0}),Fs=jt(nw),lw=Z({},Fn,{animationName:0,elapsedTime:0,pseudoElement:0}),aw=jt(lw),iw=Z({},Fn,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),ow=jt(iw),uw=Z({},Fn,{data:0}),sh=jt(uw),rw={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},sw={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},cw={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function fw(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=cw[t])?!!e[t]:!1}function Vf(){return fw}var dw=Z({},eo,{key:function(t){if(t.key){var e=rw[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=wu(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?sw[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Vf,charCode:function(t){return t.type==="keypress"?wu(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?wu(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),mw=jt(dw),pw=Z({},hr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ch=jt(pw),hw=Z({},Fn,{submitter:0}),gw=jt(hw),yw=Z({},eo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Vf}),vw=jt(yw),bw=Z({},Fn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Sw=jt(bw),ww=Z({},hr,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Ew=jt(ww),xw=Z({},Fn,{newState:0,oldState:0,source:0}),Tw=jt(xw),_w=[9,13,27,32],kf=rn&&"CompositionEvent"in window,wi=null;rn&&"documentMode"in document&&(wi=document.documentMode);var Nw=rn&&"TextEvent"in window&&!wi,oy=rn&&(!kf||wi&&8<wi&&11>=wi),fh=" ",dh=!1;function uy(t,e){switch(t){case"keyup":return _w.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ry(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var aa=!1;function Aw(t,e){switch(t){case"compositionend":return ry(e);case"keypress":return e.which!==32?null:(dh=!0,fh);case"textInput":return t=e.data,t===fh&&dh?null:t;default:return null}}function Mw(t,e){if(aa)return t==="compositionend"||!kf&&uy(t,e)?(t=iy(),Su=Yf=Un=null,aa=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return oy&&e.locale!=="ko"?null:e.data;default:return null}}var Cw={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function mh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Cw[t.type]:e==="textarea"}function sy(t,e,n,l){la?pa?pa.push(l):pa=[l]:la=l,e=sr(e,"onChange"),0<e.length&&(n=new pr("onChange","change",null,n,l),t.push({event:n,listeners:e}))}var Ei=null,$i=null;function Ow(t){av(t,0)}function gr(t){var e=vi(t);if(Fg(e))return t}function ph(t,e){if(t==="change")return e}var cy=!1;rn&&(rn?(au="oninput"in document,au||(tc=document.createElement("div"),tc.setAttribute("oninput","return;"),au=typeof tc.oninput=="function"),lu=au):lu=!1,cy=lu&&(!document.documentMode||9<document.documentMode));var lu,au,tc;function hh(){Ei&&(Ei.detachEvent("onpropertychange",fy),$i=Ei=null)}function fy(t){if(t.propertyName==="value"&&gr($i)){var e=[];sy(e,$i,t,qf(t)),ay(Ow,e)}}function Rw(t,e,n){t==="focusin"?(hh(),Ei=e,$i=n,Ei.attachEvent("onpropertychange",fy)):t==="focusout"&&hh()}function zw(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return gr($i)}function Uw(t,e){if(t==="click")return gr(e)}function Lw(t,e){if(t==="input"||t==="change")return gr(e)}function Dw(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var re=typeof Object.is=="function"?Object.is:Dw;function Hi(t,e){if(re(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),l=Object.keys(e);if(n.length!==l.length)return!1;for(l=0;l<n.length;l++){var a=n[l];if(!Rc.call(e,a)||!re(t[a],e[a]))return!1}return!0}function $c(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function gh(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function yh(t,e){var n=gh(t);t=0;for(var l;n;){if(n.nodeType===3){if(l=t+n.textContent.length,t<=e&&l>=e)return{node:n,offset:e-t};t=l}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=gh(n)}}function dy(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?dy(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function my(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=$c(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=$c(t.document)}return e}function jf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var $w=rn&&"documentMode"in document&&11>=document.documentMode,ia=null,Hc=null,xi=null,Bc=!1;function vh(t,e,n){var l=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Bc||ia==null||ia!==$c(l)||(l=ia,"selectionStart"in l&&jf(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),xi&&Hi(xi,l)||(xi=l,l=sr(Hc,"onSelect"),0<l.length&&(e=new pr("onSelect","select",null,e,n),t.push({event:e,listeners:l}),e.target=ia)))}function rl(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var oa={animationend:rl("Animation","AnimationEnd"),animationiteration:rl("Animation","AnimationIteration"),animationstart:rl("Animation","AnimationStart"),transitionrun:rl("Transition","TransitionRun"),transitionstart:rl("Transition","TransitionStart"),transitioncancel:rl("Transition","TransitionCancel"),transitionend:rl("Transition","TransitionEnd")},ec={},py={};rn&&(py=document.createElement("div").style,"AnimationEvent"in window||(delete oa.animationend.animation,delete oa.animationiteration.animation,delete oa.animationstart.animation),"TransitionEvent"in window||delete oa.transitionend.transition);function Ol(t){if(ec[t])return ec[t];if(!oa[t])return t;var e=oa[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in py)return ec[t]=e[n];return t}var hy=Ol("animationend"),gy=Ol("animationiteration"),yy=Ol("animationstart"),Hw=Ol("transitionrun"),Bw=Ol("transitionstart"),qw=Ol("transitioncancel"),vy=Ol("transitionend"),by=new Map,qc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");qc.push("scrollEnd");function Oe(t,e){by.set(t,e),Cl(e,[t])}var Yw=0;function sn(t,e){if(t.name!=null&&t.name!=="auto")return t.name;if(e.autoName!==null)return e.autoName;t=Ce.identifierPrefix;var n=Yw++;return t="_"+t+"t_"+n.toString(32)+"_",e.autoName=t}function bh(t){if(t==null||typeof t=="string")return t;var e=null,n=wa;if(n!==null)for(var l=0;l<n.length;l++){var a=t[n[l]];if(a!=null){if(a==="none")return"none";e=e==null?a:e+(" "+a)}}return e??t.default}function hn(t,e){return t=bh(t),e=bh(e),e==null?t==="auto"?null:t:e==="auto"?null:e}var ku=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},ge=[],ua=0,Xf=0;function yr(){for(var t=ua,e=Xf=ua=0;e<t;){var n=ge[e];ge[e++]=null;var l=ge[e];ge[e++]=null;var a=ge[e];ge[e++]=null;var i=ge[e];if(ge[e++]=null,l!==null&&a!==null){var o=l.pending;o===null?a.next=a:(a.next=o.next,o.next=a),l.pending=a}i!==0&&Sy(n,a,i)}}function vr(t,e,n,l){ge[ua++]=t,ge[ua++]=e,ge[ua++]=n,ge[ua++]=l,Xf|=l,t.lanes|=l,t=t.alternate,t!==null&&(t.lanes|=l)}function Gf(t,e,n,l){return vr(t,e,n,l),ju(t)}function Rl(t,e){return vr(t,null,null,e),ju(t)}function Sy(t,e,n){t.lanes|=n;var l=t.alternate;l!==null&&(l.lanes|=n);for(var a=!1,i=t.return;i!==null;)i.childLanes|=n,l=i.alternate,l!==null&&(l.childLanes|=n),i.tag===22&&(t=i.stateNode,t===null||t._visibility&1||(a=!0)),t=i,i=i.return;return t.tag===3?(i=t.stateNode,a&&e!==null&&(a=31-oe(n),t=i.hiddenUpdates,l=t[a],l===null?t[a]=[e]:l.push(e),e.lane=n|536870912),i):null}function ju(t){if(50<Ui)throw Ui=0,Ru=null,Error(S(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var ra={};function Vw(t,e,n,l){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Kt(t,e,n,l){return new Vw(t,e,n,l)}function Qf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function on(t,e){var n=t.alternate;return n===null?(n=Kt(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&1206910976,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function wy(t,e){t.flags&=1206910978;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function Eu(t,e,n,l,a,i){var o=0;if(l=t,typeof l=="function")Qf(l)&&(o=1);else if(typeof l=="string")o=mx(t,n,Ge.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(l){case Nc:return t=Kt(31,n,e,a),t.elementType=Nc,t.lanes=i,t;case ea:return gl(n.children,a,i,e);case Bg:o=8,a|=24;break;case xc:return t=Kt(12,n,e,a|2),t.elementType=xc,t.lanes=i,t;case Tc:return t=Kt(13,n,e,a),t.elementType=Tc,t.lanes=i,t;case _c:return t=Kt(19,n,e,a),t.elementType=_c,t.lanes=i,t;case MS:case Ac:return t=a|32,t=Kt(30,n,e,t),t.elementType=Ac,t.lanes=i,t.stateNode={autoName:null,paired:null,clones:null,ref:null},t;default:if(typeof l=="object"&&l!==null)switch(l.$$typeof){case Ve:o=10;break t;case qg:o=9;break t;case Uf:o=11;break t;case Lf:o=14;break t;case Cn:o=16,l=null;break t}o=29,n=Error(S(130,t===null?"null":typeof t,"")),l=null}return e=Kt(o,n,e,a),e.elementType=t,e.type=l,e.lanes=i,e}function gl(t,e,n,l){return t=Kt(7,t,l,e),t.lanes=n,t}function nc(t,e,n){return t=Kt(6,t,null,e),t.lanes=n,t}function Ey(t){var e=Kt(18,null,null,0);return e.stateNode=t,e}function lc(t,e,n){return e=Kt(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var Sh=new WeakMap;function Se(t,e){if(typeof t=="object"&&t!==null){var n=Sh.get(t);return n!==void 0?n:(e={value:t,source:e,stack:Pp(e)},Sh.set(t,e),e)}return{value:t,source:e,stack:Pp(e)}}var sa=[],ca=0,Xu=null,Bi=0,ye=[],ve=0,Zn=null,je=1,Xe="";function ln(t,e){sa[ca++]=Bi,sa[ca++]=Xu,Xu=t,Bi=e}function xy(t,e,n){ye[ve++]=je,ye[ve++]=Xe,ye[ve++]=Zn,Zn=t;var l=je;t=Xe;var a=32-oe(l)-1;l&=~(1<<a),n+=1;var i=32-oe(e)+a;if(30<i){var o=a-a%5;i=(l&(1<<o)-1).toString(32),l>>=o,a-=o,je=1<<32-oe(e)+a|n<<a|l,Xe=i+t}else je=1<<i|n<<a|l,Xe=t}function br(t){t.return!==null&&(ln(t,1),xy(t,1,0))}function Kf(t){for(;t===Xu;)Xu=sa[--ca],sa[ca]=null,Bi=sa[--ca],sa[ca]=null;for(;t===Zn;)Zn=ye[--ve],ye[ve]=null,Xe=ye[--ve],ye[ve]=null,je=ye[--ve],ye[ve]=null}function Ty(t,e){ye[ve++]=je,ye[ve++]=Xe,ye[ve++]=Zn,je=e.id,Xe=e.overflow,Zn=t}var Et=null,P=null,L=!1,qn=null,we=!1,Yc=Error(S(519));function Jn(t){var e=Error(S(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw qi(Se(e,t)),Yc}function wh(t){var e=t.stateNode,n=t.type,l=t.memoizedProps;switch(e[_t]=t,e[It]=l,n){case"dialog":D("cancel",e),D("close",e);break;case"iframe":case"object":case"embed":D("load",e);break;case"video":case"audio":for(n=0;n<ji.length;n++)D(ji[n],e);break;case"source":D("error",e);break;case"img":case"image":case"link":D("error",e),D("load",e);break;case"details":D("toggle",e);break;case"input":D("invalid",e),ty(e,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":D("invalid",e);break;case"textarea":D("invalid",e),ny(e,l.value,l.defaultValue,l.children)}n=l.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||l.suppressHydrationWarning===!0||ov(e.textContent,n)?(l.popover!=null&&(D("beforetoggle",e),D("toggle",e)),l.onScroll!=null&&D("scroll",e),l.onScrollEnd!=null&&D("scrollend",e),l.onClick!=null&&(e.onclick=ke),e=!0):e=!1,e||Jn(t,!0)}function Gu(t){for(Et=t.return;Et;)switch(Et.tag){case 5:case 31:case 13:we=!1;return;case 27:case 3:we=!0;return;default:Et=Et.return}}function Jl(t){if(t!==Et)return!1;if(!L)return Gu(t),L=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||_f(t.type,t.memoizedProps)),n=!n),n&&P&&Jn(t),Gu(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(S(317));P=yg(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(S(317));P=yg(t)}else e===27?(e=P,tl(t.type)?(t=Cf,Cf=null,P=t):P=e):P=Et?Ee(t.stateNode.nextSibling):null;return!0}function Sl(){P=Et=null,L=!1}function ac(){var t=qn;return t!==null&&(Gt===null?Gt=t:Gt.push.apply(Gt,t),qn=null),t}function qi(t){qn===null?qn=[t]:qn.push(t)}var Vc=Ze(null),zl=null,an=null;function Ln(t,e,n){F(Vc,e._currentValue),e._currentValue=n}function un(t){t._currentValue=Vc.current,At(Vc)}function xu(t,e,n){for(;t!==null;){var l=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,l!==null&&(l.childLanes|=e)):l!==null&&(l.childLanes&e)!==e&&(l.childLanes|=e),t===n)break;t=t.return}}function kc(t,e,n,l){var a=t.child;for(a!==null&&(a.return=t);a!==null;){var i=a.dependencies;if(i!==null){var o=a.child;i=i.firstContext;t:for(;i!==null;){var u=i;i=a;for(var s=0;s<e.length;s++)if(u.context===e[s]){i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),xu(i.return,n,t),l||(o=null);break t}i=u.next}}else if(a.tag===18){if(o=a.return,o===null)throw Error(S(341));o.lanes|=n,i=o.alternate,i!==null&&(i.lanes|=n),xu(o,n,t),o=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),xu(a.return,n,t),o=a.child,o=o!==null?o.sibling:null):o=a.child;if(o!==null)o.return=a;else for(o=a;o!==null;){if(o===t){o=null;break}if(a=o.sibling,a!==null){a.return=o.return,o=a;break}o=o.return}a=o}}function wl(t,e,n,l){t=null;for(var a=e,i=!1;a!==null;){if(!i){if((a.flags&524288)!==0)i=!0;else if((a.flags&262144)!==0)break}if(a.tag===10){var o=a.alternate;if(o===null)throw Error(S(387));if(o=o.memoizedProps,o!==null){var u=a.type;re(a.pendingProps.value,o.value)||(t!==null?t.push(u):t=[u])}}else if(a===Hu.current){if(o=a.alternate,o===null)throw Error(S(387));o.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(t!==null?t.push(za):t=[za])}a=a.return}return t!==null&&kc(e,t,n,l),e.flags|=262144,t!==null}function Qu(t){for(t=t.firstContext;t!==null;){if(!re(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function El(t){zl=t,an=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Nt(t){return _y(zl,t)}function iu(t,e){return zl===null&&El(t),_y(t,e)}function _y(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},an===null){if(t===null)throw Error(S(308));an=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else an=an.next=e;return n}var kw=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,l){t.push(l)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},jw=vt.unstable_scheduleCallback,Xw=vt.unstable_NormalPriority,mt={$$typeof:Ve,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Zf(){return{controller:new kw,data:new Map,refCount:0}}function no(t){t.refCount--,t.refCount===0&&jw(Xw,function(){t.controller.abort()})}function Eh(t,e){if((t.pendingLanes&4194048)!==0){var n=t.transitionTypes;for(n===null&&(n=t.transitionTypes=[]),t=0;t<e.length;t++){var l=e[t];n.indexOf(l)===-1&&n.push(l)}}}var bi=null;function Gw(t){var e=t.transitionTypes;return t.transitionTypes=null,e}var Ti=null,jc=0,xl=0,ha=null;function Qw(t,e){if(Ti===null){var n=Ti=[];jc=0,xl=Ed(),ha={status:"pending",value:void 0,then:function(l){n.push(l)}}}return jc++,e.then(xh,xh),e}function xh(){if(--jc===0&&(bi=null,Ti!==null)){ha!==null&&(ha.status="fulfilled");var t=Ti;Ti=null,xl=0,ha=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function Kw(t,e){var n=[],l={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return t.then(function(){l.status="fulfilled",l.value=e;for(var a=0;a<n.length;a++)(0,n[a])(e)},function(a){for(l.status="rejected",l.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),l}var Th=O.S;O.S=function(t,e){if(j0=ae(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&Qw(t,e),bi!==null)for(var n=Ca;n!==null;)Eh(n,bi),n=n.next;if(n=t.types,n!==null){for(var l=Ca;l!==null;)Eh(l,n),l=l.next;if(xl!==0){l=bi,l===null&&(l=bi=[]);for(var a=0;a<n.length;a++){var i=n[a];l.indexOf(i)===-1&&l.push(i)}}}Th!==null&&Th(t,e)};var yl=Ze(null);function Jf(){var t=yl.current;return t!==null?t:K.pooledCache}function Tu(t,e){e===null?F(yl,yl.current):F(yl,e.pool)}function Ny(){var t=Jf();return t===null?null:{parent:mt._currentValue,pool:t}}var Ha=Error(S(460)),If=Error(S(474)),Sr=Error(S(542)),Ku={then:function(){}};function _h(t){return t=t.status,t==="fulfilled"||t==="rejected"}function Ay(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(ke,ke),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Ah(t),t===void 0&&!("reason"in e)?Error(S(600)):t;default:if(typeof e.status=="string")e.then(ke,ke);else{if(t=K,t!==null&&100<t.shellSuspendCounter)throw Error(S(482));t=e,t.status="pending",t.then(function(l){if(e.status==="pending"){var a=e;a.status="fulfilled",a.value=l}},function(l){if(e.status==="pending"){var a=e;a.status="rejected",a.reason=l}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Ah(t),t}throw vl=e,Ha}}function fl(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(vl=n,Ha):n}}var vl=null;function Nh(){if(vl===null)throw Error(S(459));var t=vl;return vl=null,t}function Ah(t){if(t===Ha||t===Sr)throw Error(S(483))}var ga=null,Yi=0;function ou(t){var e=Yi;return Yi+=1,ga===null&&(ga=[]),Ay(ga,t,e)}function Nn(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function uu(t,e){throw e.$$typeof===AS?Error(S(525)):(t=Object.prototype.toString.call(e),Error(S(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function My(t){function e(f,c){if(t){var g=f.deletions;g===null?(f.deletions=[c],f.flags|=16):g.push(c)}}function n(f,c){if(!t)return null;for(;c!==null;)e(f,c),c=c.sibling;return null}function l(f){for(var c=new Map;f!==null;)f.key===null?c.set(f.index,f):c.set(f.key,f),f=f.sibling;return c}function a(f,c){return f=on(f,c),f.index=0,f.sibling=null,f}function i(f,c,g){return f.index=g,t?(g=f.alternate,g!==null?(g=g.index,g<c?(f.flags|=2,c):g):(f.flags|=134217730,c)):(f.flags|=1048576,c)}function o(f){return t&&f.alternate===null&&(f.flags|=134217730),f}function u(f,c,g,b){return c===null||c.tag!==6?(c=nc(g,f.mode,b),c.return=f,c):(c=a(c,g),c.return=f,c)}function s(f,c,g,b){var x=g.type;return x===ea?(f=p(f,c,g.props.children,b,g.key),Nn(f,g),f):c!==null&&(c.elementType===x||typeof x=="object"&&x!==null&&x.$$typeof===Cn&&fl(x)===c.type)?(c=a(c,g.props),Nn(c,g),c.return=f,c):(c=Eu(g.type,g.key,g.props,null,f.mode,b),Nn(c,g),c.return=f,c)}function d(f,c,g,b){return c===null||c.tag!==4||c.stateNode.containerInfo!==g.containerInfo||c.stateNode.implementation!==g.implementation?(c=lc(g,f.mode,b),c.return=f,c):(c=a(c,g.children||[]),c.return=f,c)}function p(f,c,g,b,x){return c===null||c.tag!==7?(c=gl(g,f.mode,b,x),c.return=f,c):(c=a(c,g),c.return=f,c)}function v(f,c,g){if(typeof c=="string"&&c!==""||typeof c=="number"||typeof c=="bigint")return c=nc(""+c,f.mode,g),c.return=f,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case Wo:return g=Eu(c.type,c.key,c.props,null,f.mode,g),Nn(g,c),g.return=f,g;case gi:return c=lc(c,f.mode,g),c.return=f,c;case Cn:return c=fl(c),v(f,c,g)}if(yi(c)||ci(c))return c=gl(c,f.mode,g,null),c.return=f,c;if(typeof c.then=="function")return v(f,ou(c),g);if(c.$$typeof===Ve)return v(f,iu(f,c),g);uu(f,c)}return null}function m(f,c,g,b){var x=c!==null?c.key:null;if(typeof g=="string"&&g!==""||typeof g=="number"||typeof g=="bigint")return x!==null?null:u(f,c,""+g,b);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Wo:return g.key===x?s(f,c,g,b):null;case gi:return g.key===x?d(f,c,g,b):null;case Cn:return g=fl(g),m(f,c,g,b)}if(yi(g)||ci(g))return x!==null?null:p(f,c,g,b,null);if(typeof g.then=="function")return m(f,c,ou(g),b);if(g.$$typeof===Ve)return m(f,c,iu(f,g),b);uu(f,g)}return null}function y(f,c,g,b,x){if(typeof b=="string"&&b!==""||typeof b=="number"||typeof b=="bigint")return f=f.get(g)||null,u(c,f,""+b,x);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case Wo:return f=f.get(b.key===null?g:b.key)||null,s(c,f,b,x);case gi:return f=f.get(b.key===null?g:b.key)||null,d(c,f,b,x);case Cn:return b=fl(b),y(f,c,g,b,x)}if(yi(b)||ci(b))return f=f.get(g)||null,p(c,f,b,x,null);if(typeof b.then=="function")return y(f,c,g,ou(b),x);if(b.$$typeof===Ve)return y(f,c,g,iu(c,b),x);uu(c,b)}return null}function E(f,c,g,b){for(var x=null,z=null,A=c,M=c=0,ct=null;A!==null&&M<g.length;M++){A.index>M?(ct=A,A=null):ct=A.sibling;var B=m(f,A,g[M],b);if(B===null){A===null&&(A=ct);break}t&&A&&B.alternate===null&&e(f,A),c=i(B,c,M),z===null?x=B:z.sibling=B,z=B,A=ct}if(M===g.length)return n(f,A),L&&ln(f,M),x;if(A===null){for(;M<g.length;M++)A=v(f,g[M],b),A!==null&&(c=i(A,c,M),z===null?x=A:z.sibling=A,z=A);return L&&ln(f,M),x}for(A=l(A);M<g.length;M++)ct=y(A,f,M,g[M],b),ct!==null&&(t&&(B=ct.alternate,B!==null&&A.delete(B.key===null?M:B.key)),c=i(ct,c,M),z===null?x=ct:z.sibling=ct,z=ct);return t&&A.forEach(function(Sn){return e(f,Sn)}),L&&ln(f,M),x}function _(f,c,g,b){if(g==null)throw Error(S(151));for(var x=null,z=null,A=c,M=c=0,ct=null,B=g.next();A!==null&&!B.done;M++,B=g.next()){A.index>M?(ct=A,A=null):ct=A.sibling;var Sn=m(f,A,B.value,b);if(Sn===null){A===null&&(A=ct);break}t&&A&&Sn.alternate===null&&e(f,A),c=i(Sn,c,M),z===null?x=Sn:z.sibling=Sn,z=Sn,A=ct}if(B.done)return n(f,A),L&&ln(f,M),x;if(A===null){for(;!B.done;M++,B=g.next())B=v(f,B.value,b),B!==null&&(c=i(B,c,M),z===null?x=B:z.sibling=B,z=B);return L&&ln(f,M),x}for(A=l(A);!B.done;M++,B=g.next())B=y(A,f,M,B.value,b),B!==null&&(t&&(ct=B.alternate,ct!==null&&A.delete(ct.key===null?M:ct.key)),c=i(B,c,M),z===null?x=B:z.sibling=B,z=B);return t&&A.forEach(function(Nb){return e(f,Nb)}),L&&ln(f,M),x}function N(f,c,g,b){if(typeof g=="object"&&g!==null&&g.type===ea&&g.key===null&&g.props.ref===void 0&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case Wo:t:{for(var x=g.key;c!==null;){if(c.key===x){if(x=g.type,x===ea){if(c.tag===7){n(f,c.sibling),b=a(c,g.props.children),Nn(b,g),b.return=f,f=b;break t}}else if(c.elementType===x||typeof x=="object"&&x!==null&&x.$$typeof===Cn&&fl(x)===c.type){n(f,c.sibling),b=a(c,g.props),Nn(b,g),b.return=f,f=b;break t}n(f,c);break}else e(f,c);c=c.sibling}g.type===ea?(b=gl(g.props.children,f.mode,b,g.key),Nn(b,g),b.return=f,f=b):(b=Eu(g.type,g.key,g.props,null,f.mode,b),Nn(b,g),b.return=f,f=b)}return o(f);case gi:t:{for(x=g.key;c!==null;){if(c.key===x)if(c.tag===4&&c.stateNode.containerInfo===g.containerInfo&&c.stateNode.implementation===g.implementation){n(f,c.sibling),b=a(c,g.children||[]),b.return=f,f=b;break t}else{n(f,c);break}else e(f,c);c=c.sibling}b=lc(g,f.mode,b),b.return=f,f=b}return o(f);case Cn:return g=fl(g),N(f,c,g,b)}if(yi(g))return E(f,c,g,b);if(ci(g)){if(x=ci(g),typeof x!="function")throw Error(S(150));return g=x.call(g),_(f,c,g,b)}if(typeof g.then=="function")return N(f,c,ou(g),b);if(g.$$typeof===Ve)return N(f,c,iu(f,g),b);uu(f,g)}return typeof g=="string"&&g!==""||typeof g=="number"||typeof g=="bigint"?(g=""+g,c!==null&&c.tag===6?(n(f,c.sibling),b=a(c,g),b.return=f,f=b):(n(f,c),b=nc(g,f.mode,b),b.return=f,f=b),o(f)):n(f,c)}return function(f,c,g,b){try{Yi=0;var x=N(f,c,g,b);return ga=null,x}catch(A){if(A===Ha||A===Sr)throw A;var z=Kt(29,A,null,f.mode);return z.lanes=b,z.return=f,z}}}var Tl=My(!0),Cy=My(!1),On=!1;function Wf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Xc(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Yn(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Vn(t,e,n){var l=t.updateQueue;if(l===null)return null;if(l=l.shared,(Y&2)!==0){var a=l.pending;return a===null?e.next=e:(e.next=a.next,a.next=e),l.pending=e,e=ju(t),Sy(t,null,n),e}return vr(t,l,e,n),ju(t)}function _i(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var l=e.lanes;l&=t.pendingLanes,n|=l,e.lanes=n,Qg(t,n)}}function ic(t,e){var n=t.updateQueue,l=t.alternate;if(l!==null&&(l=l.updateQueue,n===l)){var a=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?a=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?a=i=e:i=i.next=e}else a=i=e;n={baseState:l.baseState,firstBaseUpdate:a,lastBaseUpdate:i,shared:l.shared,callbacks:l.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var Gc=!1;function Ni(){if(Gc){var t=ha;if(t!==null)throw t}}function Ai(t,e,n,l){Gc=!1;var a=t.updateQueue;On=!1;var i=a.firstBaseUpdate,o=a.lastBaseUpdate,u=a.shared.pending;if(u!==null){a.shared.pending=null;var s=u,d=s.next;s.next=null,o===null?i=d:o.next=d,o=s;var p=t.alternate;p!==null&&(p=p.updateQueue,u=p.lastBaseUpdate,u!==o&&(u===null?p.firstBaseUpdate=d:u.next=d,p.lastBaseUpdate=s))}if(i!==null){var v=a.baseState;o=0,p=d=s=null,u=i;do{var m=u.lane&-536870913,y=m!==u.lane;if(y?(H&m)===m:(l&m)===m){m!==0&&m===xl&&(Gc=!0),p!==null&&(p=p.next={lane:0,tag:u.tag,payload:u.payload,callback:null,next:null});t:{var E=t,_=u;m=e;var N=n;switch(_.tag){case 1:if(E=_.payload,typeof E=="function"){v=E.call(N,v,m);break t}v=E;break t;case 3:E.flags=E.flags&-65537|128;case 0:if(E=_.payload,m=typeof E=="function"?E.call(N,v,m):E,m==null)break t;v=Z({},v,m);break t;case 2:On=!0}}m=u.callback,m!==null&&(t.flags|=64,y&&(t.flags|=8192),y=a.callbacks,y===null?a.callbacks=[m]:y.push(m))}else y={lane:m,tag:u.tag,payload:u.payload,callback:u.callback,next:null},p===null?(d=p=y,s=v):p=p.next=y,o|=m;if(u=u.next,u===null){if(u=a.shared.pending,u===null)break;y=u,u=y.next,y.next=null,a.lastBaseUpdate=y,a.shared.pending=null}}while(!0);p===null&&(s=v),a.baseState=s,a.firstBaseUpdate=d,a.lastBaseUpdate=p,i===null&&(a.shared.lanes=0),Pn|=o,t.lanes=o,t.memoizedState=v}}function Oy(t,e){if(typeof t!="function")throw Error(S(191,t));t.call(e)}function Ry(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)Oy(n[t],e)}var In=Ze(null),Zu=Ze(0);function Mh(t,e){t=mn,F(Zu,t),F(In,e),mn=t|e.baseLanes}function Qc(){F(Zu,mn),F(In,In.current)}function Pf(){mn=Zu.current,At(In),At(Zu)}var Ot=Ze(null),Ht=null;function kn(t){var e=t.alternate;F(Mt,Mt.current&1),F(Ot,t),Ht===null&&(e===null||In.current!==null||e.memoizedState!==null)&&(Ht=t)}function Kc(t){F(Mt,Mt.current),F(Ot,t),Ht===null&&(Ht=t)}function zy(t){t.tag===22?(F(Mt,Mt.current),F(Ot,t),Ht===null&&(Ht=t)):jn()}function jn(){F(Mt,Mt.current),F(Ot,Ot.current)}function ee(t){At(Ot),Ht===t&&(Ht=null),At(Mt)}var Mt=Ze(0);function Vi(t,e){F(Ot,Ot.current),F(Mt,e)}function Ff(t){At(Mt),At(Ot),Ht===t&&(Ht=null)}function Ju(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Mf(n)||Nd(n)))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!=="independent"){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var cn=0,U=null,Q=null,dt=null,Iu=!1,ya=!1,_l=!1,Wu=0,ki=0,va=null,Zw=0;function it(){throw Error(S(321))}function td(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!re(t[n],e[n]))return!1;return!0}function ed(t,e,n,l,a,i){return cn=i,U=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,O.H=t===null||t.memoizedState===null?s0:c0,_l=!1,i=n(l,a),_l=!1,ya&&(i=Ly(e,n,l,a)),Uy(t),i}function Uy(t){O.H=Pu;var e=Q!==null&&Q.next!==null;if(cn=0,dt=Q=U=null,Iu=!1,ki=0,va=null,e)throw Error(S(300));t===null||pt||(t=t.dependencies,t!==null&&Qu(t)&&(pt=!0))}function Ly(t,e,n,l){U=t;var a=0;do{if(ya&&(va=null),ki=0,ya=!1,25<=a)throw Error(S(301));if(a+=1,dt=Q=null,t.updateQueue!=null){var i=t.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}O.H=nE,i=e(n,l)}while(ya);return i}function Jw(){var t=O.H,e=t.useState()[0];return e=typeof e.then=="function"?lo(e):e,t=t.useState()[0],(Q!==null?Q.memoizedState:null)!==t&&(U.flags|=1024),e}function nd(){var t=Wu!==0;return Wu=0,t}function ld(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function ad(t){if(Iu){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}Iu=!1}cn=0,dt=Q=U=null,ya=!1,ki=Wu=0,va=null}function kt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return dt===null?U.memoizedState=dt=t:dt=dt.next=t,dt}function rt(){if(Q===null){var t=U.alternate;t=t!==null?t.memoizedState:null}else t=Q.next;var e=dt===null?U.memoizedState:dt.next;if(e!==null)dt=e,Q=t;else{if(t===null)throw U.alternate===null?Error(S(467)):Error(S(310));Q=t,t={memoizedState:Q.memoizedState,baseState:Q.baseState,baseQueue:Q.baseQueue,queue:Q.queue,next:null},dt===null?U.memoizedState=dt=t:dt=dt.next=t}return dt}function wr(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function lo(t){var e=ki;return ki+=1,va===null&&(va=[]),t=Ay(va,t,e),e=U,(dt===null?e.memoizedState:dt.next)===null&&(e=e.alternate,O.H=e===null||e.memoizedState===null?s0:c0),t}function Er(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return lo(t);if(t.$$typeof===OS)return;if(t.$$typeof===Ve)return Nt(t)}throw Error(S(438,String(t)))}function id(t){var e=null,n=U.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var l=U.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(e={data:l.data.map(function(a){return a.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=wr(),U.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),l=0;l<t;l++)n[l]=CS;return e.index++,n}function fn(t,e){return typeof e=="function"?e(t):e}function _u(t){var e=rt();return od(e,Q,t)}function od(t,e,n){var l=t.queue;if(l===null)throw Error(S(311));l.lastRenderedReducer=n;var a=t.baseQueue,i=l.pending;if(i!==null){if(a!==null){var o=a.next;a.next=i.next,i.next=o}e.baseQueue=a=i,l.pending=null}if(i=t.baseState,a===null)t.memoizedState=i;else{e=a.next;var u=o=null,s=null,d=e,p=!1;do{var v=d.lane&-536870913;if(v!==d.lane?(H&v)===v:(cn&v)===v){var m=d.revertLane;if(m===0)s!==null&&(s=s.next={lane:0,revertLane:0,gesture:null,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),v===xl&&(p=!0);else if((cn&m)===m){d=d.next,m===xl&&(p=!0);continue}else v={lane:0,revertLane:d.revertLane,gesture:null,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null},s===null?(u=s=v,o=i):s=s.next=v,U.lanes|=m,Pn|=m;v=d.action,_l&&n(i,v),i=d.hasEagerState?d.eagerState:n(i,v)}else m={lane:v,revertLane:d.revertLane,gesture:d.gesture,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null},s===null?(u=s=m,o=i):s=s.next=m,U.lanes|=v,Pn|=v;d=d.next}while(d!==null&&d!==e);if(s===null?o=i:s.next=u,!re(i,t.memoizedState)&&(pt=!0,p&&(n=ha,n!==null)))throw n;t.memoizedState=i,t.baseState=o,t.baseQueue=s,l.lastRenderedState=i}return a===null&&(l.lanes=0),[t.memoizedState,l.dispatch]}function oc(t){var e=rt(),n=e.queue;if(n===null)throw Error(S(311));n.lastRenderedReducer=t;var l=n.dispatch,a=n.pending,i=e.memoizedState;if(a!==null){n.pending=null;var o=a=a.next;do i=t(i,o.action),o=o.next;while(o!==a);re(i,e.memoizedState)||(pt=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,l]}function Dy(t,e,n){var l=U,a=rt(),i=L;if(i){if(n===void 0)throw Error(S(407));n=n()}else n=e();var o=!re((Q||a).memoizedState,n);if(o&&(a.memoizedState=n,pt=!0),a=a.queue,ud(By.bind(null,l,a,t),[t]),t=a.getSnapshot!==e||o||dt!==null&&(dt.memoizedState.tag&1)!==0,_a(t?9:8,{destroy:void 0},Hy.bind(null,l,a,n,e),null),t){if(l.flags|=2048,K===null)throw Error(S(349));i||(cn&127)!==0||$y(l,e,n)}return n}function $y(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=U.updateQueue,e===null?(e=wr(),U.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Hy(t,e,n,l){e.value=n,e.getSnapshot=l,qy(e)&&Yy(t)}function By(t,e,n){return n(function(){qy(e)&&Yy(t)})}function qy(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!re(t,n)}catch{return!0}}function Yy(t){var e=Rl(t,2);e!==null&&Zt(e,t,2)}function Zc(t){var e=kt();if(typeof t=="function"){var n=t;if(t=n(),_l){zn(!0);try{n()}finally{zn(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:fn,lastRenderedState:t},e}function Vy(t,e,n,l){return t.baseState=n,od(t,Q,typeof l=="function"?l:fn)}function Iw(t,e,n,l,a){if(Tr(t))throw Error(S(485));if(t=e.action,t!==null){var i={payload:a,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(o){i.listeners.push(o)}};O.T!==null?n(!0):i.isTransition=!1,l(i),n=e.pending,n===null?(i.next=e.pending=i,ky(e,i)):(i.next=n.next,e.pending=n.next=i)}}function ky(t,e){var n=e.action,l=e.payload,a=t.state;if(e.isTransition){var i=O.T,o={};o.types=i!==null?i.types:null,O.T=o;try{var u=n(a,l),s=O.S;s!==null&&s(o,u),Ch(t,e,u)}catch(d){Jc(t,e,d)}finally{i!==null&&o.types!==null&&(i.types=o.types),O.T=i}}else try{i=n(a,l),Ch(t,e,i)}catch(d){Jc(t,e,d)}}function Ch(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(l){Oh(t,e,l)},function(l){return Jc(t,e,l)}):Oh(t,e,n)}function Oh(t,e,n){e.status="fulfilled",e.value=n,jy(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,ky(t,n)))}function Jc(t,e,n){var l=t.pending;if(t.pending=null,l!==null){l=l.next;do e.status="rejected",e.reason=n,jy(e),e=e.next;while(e!==l)}t.action=null}function jy(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Xy(t,e){return e}function Rh(t,e){if(L){var n=K.formState;if(n!==null){t:{var l=U;if(L){if(P){e:{for(var a=P,i=we;a.nodeType!==8;){if(!i){a=null;break e}if(a=Ee(a.nextSibling),a===null){a=null;break e}}i=a.data,a=i==="F!"||i==="F"?a:null}if(a){P=Ee(a.nextSibling),l=a.data==="F!";break t}}Jn(l)}l=!1}l&&(e=n[0])}}return n=kt(),n.memoizedState=n.baseState=e,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Xy,lastRenderedState:e},n.queue=l,n=o0.bind(null,U,l),l.dispatch=n,l=Zc(!1),i=fd.bind(null,U,!1,l.queue),l=kt(),a={state:e,dispatch:null,action:t,pending:null},l.queue=a,n=Iw.bind(null,U,a,i,n),a.dispatch=n,l.memoizedState=t,[e,n,!1]}function zh(t){var e=rt();return Gy(e,Q,t)}function Gy(t,e,n){if(e=od(t,e,Xy)[0],t=_u(fn)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var l=lo(e)}catch(o){throw o===Ha?Sr:o}else l=e;e=rt();var a=e.queue,i=a.dispatch;return n!==e.memoizedState&&(U.flags|=2048,_a(9,{destroy:void 0},Ww.bind(null,a,n),null)),[l,i,t]}function Ww(t,e){t.action=e}function Uh(t){var e=rt(),n=Q;if(n!==null)return Gy(e,n,t);rt(),e=e.memoizedState,n=rt();var l=n.queue.dispatch;return n.memoizedState=t,[e,l,!1]}function _a(t,e,n,l){return t={tag:t,create:n,deps:l,inst:e,next:null},e=U.updateQueue,e===null&&(e=wr(),U.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(l=n.next,n.next=t,t.next=l,e.lastEffect=t),t}function Qy(){return rt().memoizedState}function Nu(t,e,n,l){var a=kt();U.flags|=t,a.memoizedState=_a(1|e,{destroy:void 0},n,l===void 0?null:l)}function xr(t,e,n,l){var a=rt();l=l===void 0?null:l;var i=a.memoizedState.inst;Q!==null&&l!==null&&td(l,Q.memoizedState.deps)?a.memoizedState=_a(e,i,n,l):(U.flags|=t,a.memoizedState=_a(1|e,i,n,l))}function Lh(t,e){Nu(8390656,8,t,e)}function ud(t,e){xr(2048,8,t,e)}function Pw(t){U.flags|=4;var e=U.updateQueue;if(e===null)e=wr(),U.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function Ky(t){var e=rt().memoizedState;return Pw({ref:e,nextImpl:t}),function(){if((Y&2)!==0)throw Error(S(440));return e.impl.apply(void 0,arguments)}}function Zy(t,e){return xr(4,2,t,e)}function Jy(t,e){return xr(4,4,t,e)}function Iy(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Wy(t,e,n){n=n!=null?n.concat([t]):null,xr(4,4,Iy.bind(null,e,t),n)}function rd(){}function Py(t,e){var n=rt();e=e===void 0?null:e;var l=n.memoizedState;return e!==null&&td(e,l[1])?l[0]:(n.memoizedState=[t,e],t)}function Fy(t,e){var n=rt();e=e===void 0?null:e;var l=n.memoizedState;if(e!==null&&td(e,l[1]))return l[0];if(l=t(),_l){zn(!0);try{t()}finally{zn(!1)}}return n.memoizedState=[l,e],l}function sd(t,e,n){return n===void 0||(cn&1073741824)!==0&&(H&261930)===0?t.memoizedState=e:(t.memoizedState=n,t=G0(),U.lanes|=t,Pn|=t,n)}function t0(t,e,n,l){return re(n,e)?n:In.current!==null?(t=sd(t,n,l),re(t,e)||(pt=!0),t):(cn&106)===0||(cn&1073741824)!==0&&(H&261930)===0?(pt=!0,t.memoizedState=n):(t=G0(),U.lanes|=t,Pn|=t,e)}function e0(t,e,n,l,a){var i=V.p;V.p=i!==0&&8>i?i:8;var o=O.T,u={};u.types=o!==null?o.types:null,O.T=u,fd(t,!1,e,n);try{var s=a(),d=O.S;if(d!==null&&d(u,s),s!==null&&typeof s=="object"&&typeof s.then=="function"){var p=Kw(s,l);Mi(t,e,p,ue(t))}else Mi(t,e,l,ue(t))}catch(v){Mi(t,e,{then:function(){},status:"rejected",reason:v},ue())}finally{V.p=i,o!==null&&u.types!==null&&(o.types=u.types),O.T=o}}function Fw(){}function Ic(t,e,n,l){if(t.tag!==5)throw Error(S(476));var a=n0(t).queue;e0(t,a,e,hl,n===null?Fw:function(){return l0(t),n(l)})}function n0(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:hl,baseState:hl,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fn,lastRenderedState:hl},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fn,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function l0(t){var e=n0(t);e.next===null&&(e=t.alternate.memoizedState),Mi(t,e.next.queue,{},ue())}function cd(){return Nt(za)}function a0(){return rt().memoizedState}function i0(){return rt().memoizedState}function tE(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=ue();t=Yn(n);var l=Vn(e,t,n);l!==null&&(Zt(l,e,n),_i(l,e,n)),e={cache:Zf()},t.payload=e;return}e=e.return}}function eE(t,e,n){var l=ue();n={lane:l,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Tr(t)?u0(e,n):(n=Gf(t,e,n,l),n!==null&&(Zt(n,t,l),r0(n,e,l)))}function o0(t,e,n){var l=ue();Mi(t,e,n,l)}function Mi(t,e,n,l){var a={lane:l,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Tr(t))u0(e,a);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var o=e.lastRenderedState,u=i(o,n);if(a.hasEagerState=!0,a.eagerState=u,re(u,o))return vr(t,e,a,0),K===null&&yr(),!1}catch{}if(n=Gf(t,e,a,l),n!==null)return Zt(n,t,l),r0(n,e,l),!0}return!1}function fd(t,e,n,l){if(l={lane:2,revertLane:Ed(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},Tr(t)){if(e)throw Error(S(479))}else e=Gf(t,n,l,2),e!==null&&Zt(e,t,2)}function Tr(t){var e=t.alternate;return t===U||e!==null&&e===U}function u0(t,e){ya=Iu=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function r0(t,e,n){if((n&4194048)!==0){var l=e.lanes;l&=t.pendingLanes,n|=l,e.lanes=n,Qg(t,n)}}var Pu={readContext:Nt,use:Er,useCallback:it,useContext:it,useEffect:it,useImperativeHandle:it,useLayoutEffect:it,useInsertionEffect:it,useMemo:it,useReducer:it,useRef:it,useState:it,useDebugValue:it,useDeferredValue:it,useTransition:it,useSyncExternalStore:it,useId:it,useHostTransitionStatus:it,useFormState:it,useActionState:it,useOptimistic:it,useMemoCache:it,useCacheRefresh:it,useEffectEvent:it},s0={readContext:Nt,use:Er,useCallback:function(t,e){return kt().memoizedState=[t,e===void 0?null:e],t},useContext:Nt,useEffect:Lh,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,Nu(4194308,4,Iy.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Nu(4194308,4,t,e)},useInsertionEffect:function(t,e){Nu(4,2,t,e)},useMemo:function(t,e){var n=kt();e=e===void 0?null:e;var l=t();if(_l){zn(!0);try{t()}finally{zn(!1)}}return n.memoizedState=[l,e],l},useReducer:function(t,e,n){var l=kt();if(n!==void 0){var a=n(e);if(_l){zn(!0);try{n(e)}finally{zn(!1)}}}else a=e;return l.memoizedState=l.baseState=a,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:a},l.queue=t,t=t.dispatch=eE.bind(null,U,t),[l.memoizedState,t]},useRef:function(t){var e=kt();return t={current:t},e.memoizedState=t},useState:function(t){t=Zc(t);var e=t.queue,n=o0.bind(null,U,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:rd,useDeferredValue:function(t,e){var n=kt();return sd(n,t,e)},useTransition:function(){var t=Zc(!1);return t=e0.bind(null,U,t.queue,!0,!1),kt().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var l=U,a=kt();if(L){if(n===void 0)throw Error(S(407));n=n()}else{if(n=e(),K===null)throw Error(S(349));(H&127)!==0||$y(l,e,n)}a.memoizedState=n;var i={value:n,getSnapshot:e};return a.queue=i,Lh(By.bind(null,l,i,t),[t]),l.flags|=2048,_a(9,{destroy:void 0},Hy.bind(null,l,i,n,e),null),n},useId:function(){var t=kt(),e=K.identifierPrefix;if(L){var n=Xe,l=je;n=(l&~(1<<32-oe(l)-1)).toString(32)+n,e="_"+e+"R_"+n,n=Wu++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=Zw++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:cd,useFormState:Rh,useActionState:Rh,useOptimistic:function(t){var e=kt();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=fd.bind(null,U,!0,n),n.dispatch=e,[t,e]},useMemoCache:id,useCacheRefresh:function(){return kt().memoizedState=tE.bind(null,U)},useEffectEvent:function(t){var e=kt(),n={impl:t};return e.memoizedState=n,function(){if((Y&2)!==0)throw Error(S(440));return n.impl.apply(void 0,arguments)}}},c0={readContext:Nt,use:Er,useCallback:Py,useContext:Nt,useEffect:ud,useImperativeHandle:Wy,useInsertionEffect:Zy,useLayoutEffect:Jy,useMemo:Fy,useReducer:_u,useRef:Qy,useState:function(){return _u(fn)},useDebugValue:rd,useDeferredValue:function(t,e){var n=rt();return t0(n,Q.memoizedState,t,e)},useTransition:function(){var t=_u(fn)[0],e=rt().memoizedState;return[typeof t=="boolean"?t:lo(t),e]},useSyncExternalStore:Dy,useId:a0,useHostTransitionStatus:cd,useFormState:zh,useActionState:zh,useOptimistic:function(t,e){var n=rt();return Vy(n,Q,t,e)},useMemoCache:id,useCacheRefresh:i0,useEffectEvent:Ky},nE={readContext:Nt,use:Er,useCallback:Py,useContext:Nt,useEffect:ud,useImperativeHandle:Wy,useInsertionEffect:Zy,useLayoutEffect:Jy,useMemo:Fy,useReducer:oc,useRef:Qy,useState:function(){return oc(fn)},useDebugValue:rd,useDeferredValue:function(t,e){var n=rt();return Q===null?sd(n,t,e):t0(n,Q.memoizedState,t,e)},useTransition:function(){var t=oc(fn)[0],e=rt().memoizedState;return[typeof t=="boolean"?t:lo(t),e]},useSyncExternalStore:Dy,useId:a0,useHostTransitionStatus:cd,useFormState:Uh,useActionState:Uh,useOptimistic:function(t,e){var n=rt();return Q!==null?Vy(n,Q,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:id,useCacheRefresh:i0,useEffectEvent:Ky};function uc(t,e,n,l){e=t.memoizedState,n=n(l,e),n=n==null?e:Z({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Wc={enqueueSetState:function(t,e,n){t=t._reactInternals;var l=ue(),a=Yn(l);a.payload=e,n!=null&&(a.callback=n),e=Vn(t,a,l),e!==null&&(Zt(e,t,l),_i(e,t,l))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var l=ue(),a=Yn(l);a.tag=1,a.payload=e,n!=null&&(a.callback=n),e=Vn(t,a,l),e!==null&&(Zt(e,t,l),_i(e,t,l))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ue(),l=Yn(n);l.tag=2,e!=null&&(l.callback=e),e=Vn(t,l,n),e!==null&&(Zt(e,t,n),_i(e,t,n))}};function Dh(t,e,n,l,a,i,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(l,i,o):e.prototype&&e.prototype.isPureReactComponent?!Hi(n,l)||!Hi(a,i):!0}function $h(t,e,n,l){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,l),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,l),e.state!==t&&Wc.enqueueReplaceState(e,e.state,null)}function Nl(t,e){var n=e;if("ref"in e){n={};for(var l in e)l!=="ref"&&(n[l]=e[l])}if(t=t.defaultProps){n===e&&(n=Z({},n));for(var a in t)n[a]===void 0&&(n[a]=t[a])}return n}function f0(t){ku(t)}function d0(t){console.error(t)}function m0(t){ku(t)}function Fu(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(l){setTimeout(function(){throw l})}}function Hh(t,e,n){try{var l=t.onCaughtError;l(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function Pc(t,e,n){return n=Yn(n),n.tag=3,n.payload={element:null},n.callback=function(){Fu(t,e)},n}function p0(t){return t=Yn(t),t.tag=3,t}function h0(t,e,n,l){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var i=l.value;t.payload=function(){return a(i)},t.callback=function(){Hh(e,n,l)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch=="function"&&(t.callback=function(){Hh(e,n,l),typeof a!="function"&&(Xn===null?Xn=new Set([this]):Xn.add(this));var u=l.stack;this.componentDidCatch(l.value,{componentStack:u!==null?u:""})})}function lE(t,e,n,l,a){if(n.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(e=n.alternate,e!==null&&wl(e,n,a,!0),n=Ot.current,n!==null){switch(n.tag){case 31:case 13:case 19:return Ht===null?ur():n.alternate===null&&ot===0&&(ot=3),n.flags&=-257,n.flags|=65536,n.lanes=a,l===Ku?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([l]):e.add(l),pc(t,l,a)),!1;case 22:return n.flags|=65536,l===Ku?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([l])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([l]):n.add(l)),pc(t,l,a)),!1}throw Error(S(435,n.tag))}return pc(t,l,a),ur(),!1}if(L)return e=Ot.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=a,l!==Yc&&(t=Error(S(422),{cause:l}),qi(Se(t,n)))):(l!==Yc&&(e=Error(S(423),{cause:l}),qi(Se(e,n))),t=t.current.alternate,t.flags|=65536,a&=-a,t.lanes|=a,l=Se(l,n),a=Pc(t.stateNode,l,a),ic(t,a),ot!==4&&(ot=2)),!1;var i=Error(S(520),{cause:l});if(i=Se(i,n),zi===null?zi=[i]:zi.push(i),ot!==4&&(ot=2),e===null)return!0;l=Se(l,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=a&-a,n.lanes|=t,t=Pc(n.stateNode,l,t),ic(n,t),!1;case 1:if(e=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(Xn===null||!Xn.has(i))))return n.flags|=65536,a&=-a,n.lanes|=a,a=p0(a),h0(a,t,n,l),ic(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var dd=Error(S(461)),pt=!1;function gt(t,e,n,l){e.child=t===null?Cy(e,null,n,l):Tl(e,t.child,n,l)}function Bh(t,e,n,l,a){n=n.render;var i=e.ref;if("ref"in l){var o={};for(var u in l)u!=="ref"&&(o[u]=l[u])}else o=l;return El(e),l=ed(t,e,n,o,i,a),u=nd(),t!==null&&!pt?(ld(t,e,a),dn(t,e,a)):(L&&u&&br(e),e.flags|=1,gt(t,e,l,a),e.child)}function qh(t,e,n,l,a){if(t===null){var i=n.type;return typeof i=="function"&&!Qf(i)&&i.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=i,g0(t,e,i,l,a)):(t=Eu(n.type,null,l,e,e.mode,a),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!pd(t,a)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:Hi,n(o,l)&&t.ref===e.ref)return dn(t,e,a)}return e.flags|=1,t=on(i,l),t.ref=e.ref,t.return=e,e.child=t}function g0(t,e,n,l,a){if(t!==null){var i=t.memoizedProps;if(Hi(i,l)&&t.ref===e.ref)if(pt=!1,e.pendingProps=l=i,pd(t,a))(t.flags&131072)!==0&&(pt=!0);else return e.lanes=t.lanes,dn(t,e,a)}return Fc(t,e,n,l,a)}function y0(t,e,n,l){var a=l.children,i=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((e.flags&128)!==0){if(i=i!==null?i.baseLanes|n:n,t!==null){for(l=e.child=t.child,a=0;l!==null;)a=a|l.lanes|l.childLanes,l=l.sibling;l=a&~i}else l=0,e.child=null;return Yh(t,e,i,n,l)}if((n&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&Tu(e,i!==null?i.cachePool:null),i!==null?Mh(e,i):Qc(),zy(e);else return l=e.lanes=536870912,Yh(t,e,i!==null?i.baseLanes|n:n,n,l)}else i!==null?(Tu(e,i.cachePool),Mh(e,i),jn(),e.memoizedState=null):(t!==null&&Tu(e,null),Qc(),jn());return gt(t,e,a,n),e.child}function Ci(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function Yh(t,e,n,l,a){var i=Jf();return i=i===null?null:{parent:mt._currentValue,pool:i},e.memoizedState={baseLanes:n,cachePool:i},t!==null&&Tu(e,null),Qc(),zy(e),t!==null&&wl(t,e,l,!0),e.childLanes=a,null}function Au(t,e){return e=_r({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Vh(t,e,n){return Tl(e,t.child,null,n),t=Au(e,e.pendingProps),t.flags|=2,ee(e),e.memoizedState=null,t}function aE(t,e,n){var l=e.pendingProps,a=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(L){if(l.mode==="hidden")return t=Au(e,l),e.lanes=536870912,t.memoizedState={baseLanes:0,cachePool:null},Ci(null,t);if(Kc(e),(t=P)?(t=yv(t,we),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:Zn!==null?{id:je,overflow:Xe}:null,retryLane:536870912,hydrationErrors:null},n=Ey(t),n.return=e,e.child=n,Et=e,P=null)):t=null,t===null)throw Jn(e);return e.lanes=536870912,null}return Au(e,l)}var i=t.memoizedState;if(i!==null){var o=i.dehydrated;if(Kc(e),a)if(e.flags&256)e.flags&=-257,e=Vh(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(S(558));else if(pt||wl(t,e,n,!1),a=(n&t.childLanes)!==0,pt||a){if(In.current===null){if(l=K,l!==null&&(o=Kg(l,n),o!==0&&o!==i.retryLane))throw i.retryLane=o,Rl(t,o),Zt(l,t,o),dd;ur()}e=Vh(t,e,n)}else t=i.treeContext,P=Ee(o.nextSibling),Et=e,L=!0,qn=null,we=!1,t!==null&&Ty(e,t),e=Au(e,l),e.flags|=134221824;return e}return t=on(t.child,{mode:l.mode,children:l.children}),t.ref=e.ref,e.child=t,t.return=e,t}function Wl(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(S(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function Fc(t,e,n,l,a){return El(e),n=ed(t,e,n,l,void 0,a),l=nd(),t!==null&&!pt?(ld(t,e,a),dn(t,e,a)):(L&&l&&br(e),e.flags|=1,gt(t,e,n,a),e.child)}function kh(t,e,n,l,a,i){return El(e),e.updateQueue=null,n=Ly(e,l,n,a),Uy(t),l=nd(),t!==null&&!pt?(ld(t,e,i),dn(t,e,i)):(L&&l&&br(e),e.flags|=1,gt(t,e,n,i),e.child)}function jh(t,e,n,l,a){if(El(e),e.stateNode===null){var i=ra,o=n.contextType;typeof o=="object"&&o!==null&&(i=Nt(o)),i=new n(l,i),e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Wc,e.stateNode=i,i._reactInternals=e,i=e.stateNode,i.props=l,i.state=e.memoizedState,i.refs={},Wf(e),o=n.contextType,i.context=typeof o=="object"&&o!==null?Nt(o):ra,i.state=e.memoizedState,o=n.getDerivedStateFromProps,typeof o=="function"&&(uc(e,n,o,l),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(o=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),o!==i.state&&Wc.enqueueReplaceState(i,i.state,null),Ai(e,l,i,a),Ni(),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308),l=!0}else if(t===null){i=e.stateNode;var u=e.memoizedProps,s=Nl(n,u);i.props=s;var d=i.context,p=n.contextType;o=ra,typeof p=="object"&&p!==null&&(o=Nt(p));var v=n.getDerivedStateFromProps;p=typeof v=="function"||typeof i.getSnapshotBeforeUpdate=="function",u=e.pendingProps!==u,p||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u||d!==o)&&$h(e,i,l,o),On=!1;var m=e.memoizedState;i.state=m,Ai(e,l,i,a),Ni(),d=e.memoizedState,u||m!==d||On?(typeof v=="function"&&(uc(e,n,v,l),d=e.memoizedState),(s=On||Dh(e,n,s,l,m,d,o))?(p||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(e.flags|=4194308)):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=l,e.memoizedState=d),i.props=l,i.state=d,i.context=o,l=s):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),l=!1)}else{i=e.stateNode,Xc(t,e),o=e.memoizedProps,p=Nl(n,o),i.props=p,v=e.pendingProps,m=i.context,d=n.contextType,s=ra,typeof d=="object"&&d!==null&&(s=Nt(d)),u=n.getDerivedStateFromProps,(d=typeof u=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(o!==v||m!==s)&&$h(e,i,l,s),On=!1,m=e.memoizedState,i.state=m,Ai(e,l,i,a),Ni();var y=e.memoizedState;o!==v||m!==y||On||t!==null&&t.dependencies!==null&&Qu(t.dependencies)?(typeof u=="function"&&(uc(e,n,u,l),y=e.memoizedState),(p=On||Dh(e,n,p,l,m,y,s)||t!==null&&t.dependencies!==null&&Qu(t.dependencies))?(d||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(l,y,s),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(l,y,s)),typeof i.componentDidUpdate=="function"&&(e.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof i.componentDidUpdate!="function"||o===t.memoizedProps&&m===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&m===t.memoizedState||(e.flags|=1024),e.memoizedProps=l,e.memoizedState=y),i.props=l,i.state=y,i.context=s,l=p):(typeof i.componentDidUpdate!="function"||o===t.memoizedProps&&m===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&m===t.memoizedState||(e.flags|=1024),l=!1)}return i=l,Wl(t,e),l=(e.flags&128)!==0,i||l?(i=e.stateNode,n=l&&typeof n.getDerivedStateFromError!="function"?null:i.render(),e.flags|=1,t!==null&&l?(e.child=Tl(e,t.child,null,a),e.child=Tl(e,null,n,a)):gt(t,e,n,a),e.memoizedState=i.state,t=e.child):t=dn(t,e,a),t}function Xh(t,e,n,l){return Sl(),e.flags|=256,gt(t,e,n,l),e.child}var tf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function ef(t){return{baseLanes:t,cachePool:Ny()}}function nf(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=le),t}function v0(t,e,n){var l=e.pendingProps,a=!1,i=(e.flags&128)!==0,o;if((o=i)||(o=t!==null&&t.memoizedState===null?!1:(Mt.current&2)!==0),o&&(a=!0,e.flags&=-129),o=(e.flags&32)!==0,e.flags&=-33,t===null){if(L){if(a?kn(e):jn(),(t=P)?(t=yv(t,we),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:Zn!==null?{id:je,overflow:Xe}:null,retryLane:536870912,hydrationErrors:null},n=Ey(t),n.return=e,e.child=n,Et=e,P=null)):t=null,t===null)throw Jn(e);return Nd(t)?e.lanes=32:e.lanes=536870912,null}return i=l.children,l=l.fallback,a?(jn(),a=e.mode,i=_r({mode:"hidden",children:i},a),l=gl(l,a,n,null),i.return=e,l.return=e,i.sibling=l,e.child=i,l=e.child,l.memoizedState=ef(n),l.childLanes=nf(t,o,n),e.memoizedState=tf,Ci(null,l)):(kn(e),md(e,i))}var u=t.memoizedState;if(u!==null){var s=u.dehydrated;if(s!==null)return iE(t,e,i,o,l,s,u,n)}return a?(jn(),a=l.fallback,i=e.mode,u=t.child,s=u.sibling,l=on(u,{mode:"hidden",children:l.children}),l.subtreeFlags=u.subtreeFlags&1206910976,s!==null?a=on(s,a):(a=gl(a,i,n,null),a.flags|=2),a.return=e,l.return=e,l.sibling=a,e.child=l,Ci(null,l),l=e.child,a=t.child.memoizedState,a===null?a=ef(n):(i=a.cachePool,i!==null?(u=mt._currentValue,i=i.parent!==u?{parent:u,pool:u}:i):i=Ny(),a={baseLanes:a.baseLanes|n,cachePool:i}),l.memoizedState=a,l.childLanes=nf(t,o,n),e.memoizedState=tf,Ci(t.child,l)):(kn(e),n=t.child,t=n.sibling,n=on(n,{mode:"visible",children:l.children}),n.return=e,n.sibling=null,t!==null&&(o=e.deletions,o===null?(e.deletions=[t],e.flags|=16):o.push(t)),e.child=n,e.memoizedState=null,n)}function md(t,e){return e=_r({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function _r(t,e){return t=Kt(22,t,null,e),t.lanes=0,t}function ru(t,e,n){return Tl(e,t.child,null,n),t=md(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function iE(t,e,n,l,a,i,o,u){if(n)return e.flags&256?(kn(e),e.flags&=-257,ru(t,e,u)):e.memoizedState!==null?(jn(),e.child=t.child,e.flags|=128,null):(jn(),i=a.fallback,o=e.mode,a=_r({mode:"visible",children:a.children},o),i=gl(i,o,u,null),i.flags|=2,a.return=e,i.return=e,a.sibling=i,e.child=a,Tl(e,t.child,null,u),a=e.child,a.memoizedState=ef(u),a.childLanes=nf(t,l,u),e.memoizedState=tf,Ci(null,a));if(kn(e),Nd(i)){if(l=i.nextSibling&&i.nextSibling.dataset,l)var s=l.dgst;return l=s,l!==""&&(a=Error(S(419)),a.stack="",a.digest=l,qi({value:a,source:null,stack:null})),ru(t,e,u)}if(pt||wl(t,e,u,!1),l=(u&t.childLanes)!==0,pt||l){if(In.current!==null)return ru(t,e,u);if(l=K,l!==null&&(a=Kg(l,u),a!==0&&a!==o.retryLane))throw o.retryLane=a,Rl(t,a),Zt(l,t,a),dd;return Mf(i)||ur(),ru(t,e,u)}return Mf(i)?(e.flags|=192,e.child=t.child,null):(t=o.treeContext,P=Ee(i.nextSibling),Et=e,L=!0,qn=null,we=!1,t!==null&&Ty(e,t),e=md(e,a.children),e.flags|=134221824,e)}function Gh(t,e,n){t.lanes|=e;var l=t.alternate;l!==null&&(l.lanes|=e),xu(t.return,e,n)}function Qh(t){for(var e=null;t!==null;){var n=t.alternate;n!==null&&Ju(n)===null&&(e=t),t=t.sibling}return e}function su(t,e,n,l,a,i){var o=t.memoizedState;o===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:l,tail:n,tailMode:a,treeForkCount:i}:(o.isBackwards=e,o.rendering=null,o.renderingStartTime=0,o.last=l,o.tail=n,o.tailMode=a,o.treeForkCount=i)}function rc(t){var e=t.child;for(t.child=null;e!==null;){var n=e.sibling;e.sibling=t.child,t.child=e,e=n}}function lf(t,e,n){var l=e.pendingProps,a=l.revealOrder,i=l.tail;l=l.children;var o=Mt.current;if(e.flags&128)return Vi(e,o),null;var u=(o&2)!==0;if(u?(o=o&1|2,e.flags|=128):o&=1,Vi(e,o),a==="backwards"&&t!==null?(rc(t),gt(t,e,l,n),rc(t)):gt(t,e,l,n),l=L?Bi:0,!u&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Gh(t,n,e);else if(t.tag===19)Gh(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(a){case"backwards":n=Qh(e.child),n===null?(a=e.child,e.child=null):(a=n.sibling,n.sibling=null,rc(e)),su(e,!0,a,null,i,l);break;case"unstable_legacy-backwards":for(n=null,a=e.child,e.child=null;a!==null;){if(t=a.alternate,t!==null&&Ju(t)===null){e.child=a;break}t=a.sibling,a.sibling=n,n=a,a=t}su(e,!0,n,null,i,l);break;case"together":su(e,!1,null,null,void 0,l);break;case"independent":e.memoizedState=null;break;default:n=Qh(e.child),n===null?(a=e.child,e.child=null):(a=n.sibling,n.sibling=null),su(e,!1,a,n,i,l)}return e.child}function Kh(t,e,n){var l=e.pendingProps;return Ln(e,e.type,l.value),gt(t,e,l.children,n),e.child}function dn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Pn|=e.lanes,(n&e.childLanes)===0)if(t!==null){if(wl(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(S(153));if(e.child!==null){for(t=e.child,n=on(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=on(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function pd(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&Qu(t)))}function oE(t,e,n){switch(e.tag){case 3:Bu(e,e.stateNode.containerInfo),Ln(e,mt,t.memoizedState.cache),Sl();break;case 27:case 5:Oc(e);break;case 4:Bu(e,e.stateNode.containerInfo);break;case 10:Ln(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,Kc(e),null;break;case 13:var l=e.memoizedState;if(l!==null){if(l.dehydrated!==null)return kn(e),e.flags|=128,null;l=wl(t,e,n,!1);var a=e.child.childLanes;return l||(n&a)!==0?v0(t,e,n):(kn(e),t=dn(t,e,n),t!==null?t.sibling:null)}kn(e);break;case 19:if(e.flags&128)return lf(t,e,n);if(a=(t.flags&128)!==0,l=(n&e.childLanes)!==0,l||(wl(t,e,n,!1),l=(n&e.childLanes)!==0),a){if(l)return lf(t,e,n);e.flags|=128}if(a=e.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),Vi(e,Mt.current),l)break;return null;case 22:return e.lanes=0,y0(t,e,n,e.pendingProps);case 24:Ln(e,mt,t.memoizedState.cache)}return dn(t,e,n)}function b0(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)pt=!0;else{if(!pd(t,n)&&(e.flags&128)===0)return pt=!1,oE(t,e,n);pt=(t.flags&131072)!==0}else pt=!1,L&&(e.flags&1048576)!==0&&xy(e,Bi,e.index);switch(e.lanes=0,e.tag){case 16:t:{var l=e.pendingProps;if(t=fl(e.elementType),e.type=t,typeof t=="function")Qf(t)?(l=Nl(t,l),e.tag=1,e=jh(null,e,t,l,n)):(e.tag=0,e=Fc(null,e,t,l,n));else{if(t!=null){var a=t.$$typeof;if(a===Uf){e.tag=11,e=Bh(null,e,t,l,n);break t}else if(a===Lf){e.tag=14,e=qh(null,e,t,l,n);break t}else if(a===Ve){e.tag=10,e.type=t,e=Kh(null,e,n);break t}}throw e=Mc(t)||t,Error(S(306,e,""))}}return e;case 0:return Fc(t,e,e.type,e.pendingProps,n);case 1:return l=e.type,a=Nl(l,e.pendingProps),jh(t,e,l,a,n);case 3:t:{if(Bu(e,e.stateNode.containerInfo),t===null)throw Error(S(387));l=e.pendingProps;var i=e.memoizedState;a=i.element,Xc(t,e),Ai(e,l,null,n);var o=e.memoizedState;if(l=o.cache,Ln(e,mt,l),l!==i.cache&&kc(e,[mt],n,!0),Ni(),l=o.element,i.isDehydrated)if(i={element:l,isDehydrated:!1,cache:o.cache},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){e=Xh(t,e,l,n);break t}else if(l!==a){a=Se(Error(S(424)),e),qi(a),e=Xh(t,e,l,n);break t}else for(t=e.stateNode.containerInfo,t.nodeType===9?t=t.body:t=t.nodeName==="HTML"?t.ownerDocument.body:t,P=Ee(t.firstChild),Et=e,L=!0,qn=null,we=!0,n=Cy(e,null,l,n),e.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling;else{if(Sl(),l===a){e=dn(t,e,n);break t}gt(t,e,l,n)}e=e.child}return e;case 26:return Wl(t,e),t===null?(n=Sg(e.type,null,e.pendingProps,null))?e.memoizedState=n:L||(e.stateNode=rv(e.type,e.pendingProps,Bn.current,e)):e.memoizedState=Sg(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return Oc(e),t===null&&L&&(l=e.stateNode=vv(e.type,e.pendingProps,Bn.current),Et=e,we=!0,a=P,tl(e.type)?(Cf=a,P=Ee(l.firstChild)):P=a),gt(t,e,e.pendingProps.children,n),Wl(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&L&&((a=l=P)&&(l=PE(l,e.type,e.pendingProps,we),l!==null?(e.stateNode=l,Et=e,P=Ee(l.firstChild),we=!1,a=!0):a=!1),a||Jn(e)),Oc(e),a=e.type,i=e.pendingProps,o=t!==null?t.memoizedProps:null,l=i.children,_f(a,i)?l=null:o!==null&&_f(a,o)&&(e.flags|=32),e.memoizedState!==null&&(a=ed(t,e,Jw,null,null,n),za._currentValue=a),Wl(t,e),gt(t,e,l,n),e.child;case 6:return t===null&&L&&((t=n=P)&&(n=FE(n,e.pendingProps,we),n!==null?(e.stateNode=n,Et=e,P=null,t=!0):t=!1),t||Jn(e)),null;case 13:return v0(t,e,n);case 4:return Bu(e,e.stateNode.containerInfo),l=e.pendingProps,t===null?e.child=Tl(e,null,l,n):gt(t,e,l,n),e.child;case 11:return Bh(t,e,e.type,e.pendingProps,n);case 7:return l=e.pendingProps,Wl(t,e),gt(t,e,l,n),e.child;case 8:return gt(t,e,e.pendingProps.children,n),e.child;case 12:return gt(t,e,e.pendingProps.children,n),e.child;case 10:return Kh(t,e,n);case 9:return a=e.type._context,l=e.pendingProps.children,El(e),a=Nt(a),l=l(a),e.flags|=1,gt(t,e,l,n),e.child;case 14:return qh(t,e,e.type,e.pendingProps,n);case 15:return g0(t,e,e.type,e.pendingProps,n);case 19:return lf(t,e,n);case 31:return aE(t,e,n);case 22:return y0(t,e,n,e.pendingProps);case 24:return El(e),l=Nt(mt),t===null?(a=Jf(),a===null&&(a=K,i=Zf(),a.pooledCache=i,i.refCount++,i!==null&&(a.pooledCacheLanes|=n),a=i),e.memoizedState={parent:l,cache:a},Wf(e),Ln(e,mt,a)):((t.lanes&n)!==0&&(Xc(t,e),Ai(e,null,null,n),Ni()),a=t.memoizedState,i=e.memoizedState,a.parent!==l?(a={parent:l,cache:l},e.memoizedState=a,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=a),Ln(e,mt,l)):(l=i.cache,Ln(e,mt,l),l!==a.cache&&kc(e,[mt],n,!0))),gt(t,e,e.pendingProps.children,n),e.child;case 30:return e.stateNode===null&&(e.stateNode={autoName:null,paired:null,clones:null,ref:null}),l=e.pendingProps,l.name!=null&&l.name!=="auto"?e.flags|=t===null?18882560:18874368:L&&br(e),t!==null&&t.memoizedProps.name!==l.name?e.flags|=4194816:Wl(t,e),gt(t,e,l.children,n),e.child;case 29:throw e.pendingProps}throw Error(S(156,e.tag))}function nn(t){t.flags|=4}function sc(t,e,n,l,a){var i;if((i=(t.mode&32)!==0)&&(i=n===null?xg(e,l):xg(e,l)&&(l.src!==n.src||l.srcSet!==n.srcSet)),i){if(t.flags|=16777216,(a&335544128)===a)if(t.stateNode.complete)t.flags|=8192;else if(Z0())t.flags|=8192;else throw vl=Ku,If}else t.flags&=-16777217}function Zh(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Ev(e))if(Z0())t.flags|=8192;else throw vl=Ku,If}function cu(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?Xg():536870912,t.lanes|=e,Na|=e)}function di(t,e){if(!L)switch(t.tailMode){case"visible":break;case"collapsed":for(var n=t.tail,l=null;n!==null;)n.alternate!==null&&(l=n),n=n.sibling;l===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:l.sibling=null;break;default:for(e=t.tail,n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null}}function W(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,l=0;if(e)for(var a=t.child;a!==null;)n|=a.lanes|a.childLanes,l|=a.subtreeFlags&1206910976,l|=a.flags&1206910976,a.return=t,a=a.sibling;else for(a=t.child;a!==null;)n|=a.lanes|a.childLanes,l|=a.subtreeFlags,l|=a.flags,a.return=t,a=a.sibling;return t.subtreeFlags|=l,t.childLanes=n,e}function uE(t,e,n){var l=e.pendingProps;switch(Kf(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return W(e),null;case 1:return W(e),null;case 3:return n=e.stateNode,l=null,t!==null&&(l=t.memoizedState.cache),e.memoizedState.cache!==l&&(e.flags|=2048),un(mt),Ea(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(Jl(e)?nn(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,ac())),W(e),null;case 26:var a=e.type,i=e.memoizedState;return t===null?(nn(e),i!==null?(W(e),Zh(e,i)):(W(e),sc(e,a,null,l,n))):i?i!==t.memoizedState?(nn(e),W(e),Zh(e,i)):(W(e),e.flags&=-16777217):(t=t.memoizedProps,t!==l&&nn(e),W(e),sc(e,a,t,l,n)),null;case 27:if(qu(e),n=Bn.current,a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==l&&nn(e);else{if(!l){if(e.stateNode===null)throw Error(S(166));return W(e),e.subtreeFlags&=-33554433,null}t=Ge.current,Jl(e)?wh(e,t):(t=vv(a,l,n),e.stateNode=t,nn(e))}return W(e),e.subtreeFlags&=-33554433,null;case 5:if(qu(e),a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==l&&nn(e);else{if(!l){if(e.stateNode===null)throw Error(S(166));return W(e),e.subtreeFlags&=-33554433,null}if(i=Ge.current,Jl(e))wh(e,i);else{var o=Gi(Bn.current);switch(i){case 1:i=o.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:i=o.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":i=o.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":i=o.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":i=o.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof l.is=="string"?o.createElement("select",{is:l.is}):o.createElement("select"),l.multiple?i.multiple=!0:l.size&&(i.size=l.size);break;default:i=typeof l.is=="string"?o.createElement(a,{is:l.is}):o.createElement(a)}}i[_t]=e,i[It]=l;t:for(o=e.child;o!==null;){if(o.tag===5||o.tag===6)i.appendChild(o.stateNode);else if(o.tag!==4&&o.tag!==27&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===e)break t;for(;o.sibling===null;){if(o.return===null||o.return===e)break t;o=o.return}o.sibling.return=o.return,o=o.sibling}e.stateNode=i;t:switch(Ct(i,a,l),a){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break t;case"img":l=!0;break t;default:l=!1}l&&nn(e)}}return W(e),e.subtreeFlags&=-33554433,sc(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==l&&nn(e);else{if(typeof l!="string"&&e.stateNode===null)throw Error(S(166));if(t=Bn.current,Jl(e)){if(t=e.stateNode,n=e.memoizedProps,l=null,a=Et,a!==null)switch(a.tag){case 27:case 5:l=a.memoizedProps}t[_t]=e,t=!!(t.nodeValue===n||l!==null&&l.suppressHydrationWarning===!0||ov(t.nodeValue,n)),t||Jn(e,!0)}else t=Gi(t).createTextNode(l),t[_t]=e,e.stateNode=t}return W(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(l=Jl(e),n!==null){if(t===null){if(!l)throw Error(S(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(S(557));t[_t]=e}else Sl(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;W(e),t=!1}else n=ac(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(ee(e),e):(ee(e),null);if((e.flags&128)!==0)throw Error(S(558))}return W(e),null;case 13:if(l=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(a=Jl(e),l!==null&&l.dehydrated!==null){if(t===null){if(!a)throw Error(S(318));if(a=e.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(S(317));a[_t]=e}else Sl(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;W(e),a=!1}else a=ac(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),a=!0;if(!a)return e.flags&256?(ee(e),e):(ee(e),null)}return ee(e),(e.flags&128)!==0?(e.lanes=n,e):(n=l!==null,t=t!==null&&t.memoizedState!==null,n&&(l=e.child,a=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(a=l.alternate.memoizedState.cachePool.pool),i=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(i=l.memoizedState.cachePool.pool),i!==a&&(l.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),cu(e,e.updateQueue),W(e),null);case 4:return Ea(),t===null&&xd(e.stateNode.containerInfo),e.flags|=67108864,W(e),null;case 10:return un(e.type),W(e),null;case 19:if(Ff(e),l=e.memoizedState,l===null)return W(e),null;if(a=(e.flags&128)!==0,i=l.rendering,i===null)if(a)di(l,!1);else{if(ot!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(i=Ju(t),i!==null){for(e.flags|=128,di(l,!1),t=i.updateQueue,e.updateQueue=t,cu(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)wy(n,t),n=n.sibling;return Vi(e,Mt.current&1|2),L&&ln(e,l.treeForkCount),e.child}t=t.sibling}l.tail!==null&&ae()>ir&&(e.flags|=128,a=!0,di(l,!1),e.lanes=4194304)}else{if(!a)if(t=Ju(i),t!==null){if(e.flags|=128,a=!0,t=t.updateQueue,e.updateQueue=t,cu(e,t),di(l,!0),l.tail===null&&l.tailMode!=="collapsed"&&l.tailMode!=="visible"&&!i.alternate&&!L)return W(e),null}else 2*ae()-l.renderingStartTime>ir&&n!==536870912&&(e.flags|=128,a=!0,di(l,!1),e.lanes=4194304);l.isBackwards?(i.sibling=e.child,e.child=i):(t=l.last,t!==null?t.sibling=i:e.child=i,l.last=i)}if(l.tail!==null){t=l.tail;t:{for(n=t;n!==null;){if(n.alternate!==null){n=!1;break t}n=n.sibling}n=!0}return l.rendering=t,l.tail=t.sibling,l.renderingStartTime=ae(),t.sibling=null,i=Mt.current,i=a?i&1|2:i&1,l.tailMode==="visible"||l.tailMode==="collapsed"||!n||L?Vi(e,i):(n=i,F(Ot,e),F(Mt,n),Ht===null&&(Ht=e)),L&&ln(e,l.treeForkCount),t}return W(e),null;case 22:case 23:return ee(e),Pf(),l=e.memoizedState!==null,t!==null?t.memoizedState!==null!==l&&(e.flags|=8192):l&&(e.flags|=8192),l?(n&536870912)!==0&&(e.flags&128)===0&&(W(e),e.subtreeFlags&6&&(e.flags|=8192)):W(e),n=e.updateQueue,n!==null&&cu(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),l=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(l=e.memoizedState.cachePool.pool),l!==n&&(e.flags|=2048),t!==null&&At(yl),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),un(mt),W(e),null;case 25:return null;case 30:return e.flags|=33554432,W(e),null}throw Error(S(156,e.tag))}function rE(t,e){switch(Kf(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return un(mt),Ea(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return qu(e),null;case 31:if(e.memoizedState!==null){if(ee(e),e.alternate===null)throw Error(S(340));Sl()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(ee(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(S(340));Sl()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Ff(e),t=e.flags,t&65536?(e.flags=t&-65537|128,t=e.memoizedState,t!==null&&(t.rendering=null,t.tail=null),e.flags|=4,e):null;case 4:return Ea(),null;case 10:return un(e.type),null;case 22:case 23:return ee(e),Pf(),t!==null&&At(yl),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return un(mt),null;case 25:return null;default:return null}}function S0(t,e){switch(Kf(e),e.tag){case 3:un(mt),Ea();break;case 26:case 27:case 5:qu(e);break;case 4:Ea();break;case 31:e.memoizedState!==null&&ee(e);break;case 13:ee(e);break;case 19:Ff(e);break;case 10:un(e.type);break;case 22:case 23:ee(e),Pf(),t!==null&&At(yl);break;case 24:un(mt)}}function ao(t,e){try{var n=e.updateQueue,l=n!==null?n.lastEffect:null;if(l!==null){var a=l.next;n=a;do{if((n.tag&t)===t){l=void 0;var i=n.create,o=n.inst;l=i(),o.destroy=l}n=n.next}while(n!==a)}}catch(u){G(e,e.return,u)}}function Wn(t,e,n){try{var l=e.updateQueue,a=l!==null?l.lastEffect:null;if(a!==null){var i=a.next;l=i;do{if((l.tag&t)===t){var o=l.inst,u=o.destroy;if(u!==void 0){o.destroy=void 0,a=e;var s=n,d=u;try{d()}catch(p){G(a,s,p)}}}l=l.next}while(l!==i)}}catch(p){G(e,e.return,p)}}function w0(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{Ry(e,n)}catch(l){G(t,t.return,l)}}}function E0(t,e,n){n.props=Nl(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(l){G(t,e,l)}}function qe(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var l=t.stateNode;break;case 30:var a=t.stateNode,i=sn(t.memoizedProps,a);(a.ref===null||a.ref.name!==i)&&(a.ref=dv(i)),l=a.ref;break;case 7:if(t.stateNode===null){var o=new se(t);Jt(t.child,!1,IE,o,void 0,void 0),t.stateNode=o}l=t.stateNode;break;default:l=t.stateNode}typeof n=="function"?t.refCleanup=n(l):n.current=l}}catch(u){G(t,e,u)}}function Tt(t,e){var n=t.ref,l=t.refCleanup;if(n!==null)if(typeof l=="function")try{l()}catch(a){G(t,e,a)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){G(t,e,a)}else n.current=null}function tr(t,e){if((t.tag===5||t.tag===27||t.tag===6)&&t.alternate===null&&e!==null)for(var n=0;n<e.length;n++)gv(t.stateNode,e[n])}function Jh(t){for(var e=t.return;e!==null&&(gd(e)&&gv(t.stateNode,e.stateNode),!hd(e));)e=e.return}function Oi(t){for(var e=t.return;e!==null&&(gd(e)&&WE(t.stateNode,e.stateNode),!hd(e));)e=e.return}function hd(t){return t.tag===5||t.tag===3||t.tag===27}function gd(t){return t&&t.tag===7&&t.stateNode!==null}function af(t){var e=t.type,n=t.memoizedProps,l=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&l.focus();break t;case"img":n.src?l.src=n.src:n.srcSet&&(l.srcset=n.srcSet)}}catch(a){G(t,t.return,a)}}function cc(t,e,n){try{var l=t.stateNode;zE(l,t.type,n,e),l[It]=e}catch(a){G(t,t.return,a)}}function x0(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&tl(t.type)||t.tag===4}function fc(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||x0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&tl(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function of(t,e,n,l){var a=t.tag;if(a===5||a===6)a=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(a,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(a),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=ke)),tr(t,l),q=!0;else if(a!==4&&(a===27&&(tr(t,l),l=null,tl(t.type)&&(n=t.stateNode,e=null)),t=t.child,t!==null))for(of(t,e,n,l),t=t.sibling;t!==null;)of(t,e,n,l),t=t.sibling}function er(t,e,n,l){var a=t.tag;if(a===5||a===6)a=t.stateNode,e?n.insertBefore(a,e):n.appendChild(a),tr(t,l),q=!0;else if(a!==4&&(a===27&&(tr(t,l),l=null,tl(t.type)&&(n=t.stateNode)),t=t.child,t!==null))for(er(t,e,n,l),t=t.sibling;t!==null;)er(t,e,n,l),t=t.sibling}function T0(t){var e=t.stateNode,n=t.memoizedProps;try{for(var l=t.type,a=e.attributes;a.length;)e.removeAttributeNode(a[0]);Ct(e,l,n),e[_t]=t,e[It]=n}catch(i){G(t,t.return,i)}}var nr=!1,ne=null;function Ih(t){(t.tag===30||(t.subtreeFlags&33554432)!==0)&&(nr=!0)}var Ye=null;function Wh(){var t=Ye;return Ye=null,t}var Qt=0;function Ba(t,e,n,l,a){return Qt=0,_0(t.child,e,n,l,a)}function _0(t,e,n,l,a){for(var i=!1;t!==null;){if(t.tag===5){var o=t.stateNode;if(l!==null){var u=Nf(o);l.push(u),u.view&&(i=!0)}else i||Nf(o).view&&(i=!0);nr=!0,sv(o,Qt===0?e:e+"_"+Qt,n),Qt++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&a||_0(t.child,e,n,l,a)&&(i=!0));t=t.sibling}return i}function Ke(t,e){for(;t!==null;)t.tag===5?cv(t.stateNode,t.memoizedProps):(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&e||Ke(t.child,e)),t=t.sibling}function Mu(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if((t.tag!==22||t.memoizedState===null)&&(Mu(t),t.tag===30&&(t.flags&18874368)!==0&&t.stateNode.paired)){var e=t.memoizedProps;if(e.name==null||e.name==="auto")throw Error(S(544));var n=e.name;e=hn(e.default,e.share),e!=="none"&&(Ba(t,n,e,null,!1)||Ke(t.child,!1))}t=t.sibling}}function uf(t,e){if(t.tag===30){var n=t.stateNode,l=t.memoizedProps,a=sn(l,n),i=hn(l.default,n.paired?l.share:l.enter);i!=="none"?Ba(t,a,i,null,!1)?(Mu(t),n.paired||e||Aa(t,l.onEnter)):Ke(t.child,!1):Mu(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)uf(t,e),t=t.sibling;else Mu(t)}function rf(t){if(ne!==null&&ne.size!==0){var e=ne;if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var n=t.memoizedProps,l=n.name;if(l!=null&&l!=="auto"){var a=e.get(l);if(a!==void 0){var i=hn(n.default,n.share);if(i!=="none"&&(Ba(t,l,i,null,!1)?(i=t.stateNode,a.paired=i,i.paired=a,Aa(t,n.onShare)):Ke(t.child,!1)),e.delete(l),e.size===0)break}}}rf(t)}t=t.sibling}}}function sf(t){if(t.tag===30){var e=t.memoizedProps,n=sn(e,t.stateNode),l=ne!==null?ne.get(n):void 0,a=hn(e.default,l!==void 0?e.share:e.exit);a!=="none"&&(Ba(t,n,a,null,!1)?l!==void 0?(a=t.stateNode,l.paired=a,a.paired=l,ne.delete(n),Aa(t,e.onShare)):Aa(t,e.onExit):Ke(t.child,!1)),ne!==null&&rf(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)sf(t),t=t.sibling;else ne!==null&&rf(t)}function N0(t){for(t=t.child;t!==null;){if(t.tag===30){var e=t.memoizedProps,n=sn(e,t.stateNode);e=hn(e.default,e.update),t.flags&=-5,e!=="none"&&Ba(t,n,e,t.memoizedState=[],!1)}else(t.subtreeFlags&33554432)!==0&&N0(t);t=t.sibling}}function cf(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var e=t.stateNode;e.paired!==null&&(e.paired=null,Ke(t.child,!1))}cf(t)}t=t.sibling}}function Cu(t){if(t.tag===30)t.stateNode.paired=null,Ke(t.child,!1),cf(t);else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)Cu(t),t=t.sibling;else cf(t)}function A0(t){for(t=t.child;t!==null;)t.tag===30?Ke(t.child,!1):(t.subtreeFlags&33554432)!==0&&A0(t),t=t.sibling}function yd(t,e,n,l,a,i,o){for(var u=!1;e!==null;){if(e.tag===5){var s=e.stateNode;if(i!==null&&Qt<i.length){var d=i[Qt],p=Nf(s);(d.view||p.view)&&(u=!0);var v;if(v=(t.flags&4)===0)if(p.clip)v=!0;else{v=d.rect;var m=p.rect;v=v.y!==m.y||v.x!==m.x||v.height!==m.height||v.width!==m.width}v&&(t.flags|=4),p.abs?p=!d.abs:(d=d.rect,p=p.rect,p=d.height!==p.height||d.width!==p.width),p&&(t.flags|=32)}else t.flags|=32;(t.flags&4)!==0&&sv(s,Qt===0?n:n+"_"+Qt,a),u&&(t.flags&4)!==0||(Ye===null&&(Ye=[]),Ye.push(s,Qt===0?l:l+"_"+Qt,e.memoizedProps)),Qt++}else(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&o?t.flags|=e.flags&32:yd(t,e.child,n,l,a,i,o)&&(u=!0));e=e.sibling}return u}function M0(t,e){for(t=t.child;t!==null;){if(t.tag===30){var n=t.memoizedProps,l=t.stateNode,a=sn(n,l),i=hn(n.default,n.update);if(e){l=l.clones;var o=l===null?null:l.map(BE)}else o=t.memoizedState,t.memoizedState=null;l=t;var u=t.child;Qt=0,a=yd(l,u,a,a,i,o,!1),(t.flags&4)!==0&&a&&(e||Aa(t,n.onUpdate))}else(t.subtreeFlags&33554432)!==0&&M0(t,e);t=t.sibling}}var bt=!1,k=!1,$e=!1,dc=!1,Ph=typeof WeakSet=="function"?WeakSet:Set,St=null,He=!1,Si=!1,lr=!1,ff=!1;function sE(t,e,n){if(t=t.containerInfo,xf=Ua,t=my(t),jf(t)){if("selectionStart"in t)var l={start:t.selectionStart,end:t.selectionEnd};else t:{l=(l=t.ownerDocument)&&l.defaultView||window;var a=l.getSelection&&l.getSelection();if(a&&a.rangeCount!==0){l=a.anchorNode;var i=a.anchorOffset,o=a.focusNode;a=a.focusOffset;try{l.nodeType,o.nodeType}catch{l=null;break t}var u=0,s=-1,d=-1,p=0,v=0,m=t,y=null;e:for(;;){for(var E;m!==l||i!==0&&m.nodeType!==3||(s=u+i),m!==o||a!==0&&m.nodeType!==3||(d=u+a),m.nodeType===3&&(u+=m.nodeValue.length),(E=m.firstChild)!==null;)y=m,m=E;for(;;){if(m===t)break e;if(y===l&&++p===i&&(s=u),y===o&&++v===a&&(d=u),(E=m.nextSibling)!==null)break;m=y,y=m.parentNode}m=E}l=s===-1||d===-1?null:{start:s,end:d}}else l=null}l=l||{start:0,end:0}}else l=null;for(Tf={focusedElem:t,selectionRange:l},Ua=!1,n=(n&335544064)===n,St=e,e=n?9270:1024;St!==null;){if(t=St,n&&(l=t.deletions,l!==null))for(i=0;i<l.length;i++)n&&sf(l[i]);if(t.alternate===null&&(t.flags&2)!==0)n&&Ih(t),fu(n);else{if(t.tag===22){if(l=t.alternate,t.memoizedState!==null){l!==null&&l.memoizedState===null&&n&&sf(l),fu(n);continue}else if(l!==null&&l.memoizedState!==null){n&&Ih(t),fu(n);continue}}l=t.child,(t.subtreeFlags&e)!==0&&l!==null?(l.return=t,St=l):(n&&N0(t),fu(n))}}ne=null}function fu(t){for(;St!==null;){var e=St,n=t,l=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 15:break;case 1:if((a&1024)!==0&&l!==null){n=void 0,a=l.memoizedProps,l=l.memoizedState;var i=e.stateNode;try{var o=Nl(e.type,a);n=i.getSnapshotBeforeUpdate(o,l),i.__reactInternalSnapshotBeforeUpdate=n}catch(u){G(e,e.return,u)}}break;case 3:if((a&1024)!==0){if(l=e.stateNode.containerInfo,n=l.nodeType,n===9)Af(l);else if(n===1)switch(l.nodeName){case"HEAD":case"HTML":case"BODY":Af(l);break;default:l.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&l!==null&&(n=sn(l.memoizedProps,l.stateNode),a=e.memoizedProps,a=hn(a.default,a.update),a!=="none"&&Ba(l,n,a,l.memoizedState=[],!0));break;default:if((a&1024)!==0)throw Error(S(163))}if(l=e.sibling,l!==null){l.return=e.return,St=l;break}St=e.return}}function C0(t,e,n){var l=n.flags;switch(n.tag){case 0:case 11:case 15:Be(t,n),l&4&&ao(5,n);break;case 1:if(Be(t,n),l&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(o){G(n,n.return,o)}else{var a=Nl(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(a,e,t.__reactInternalSnapshotBeforeUpdate)}catch(o){G(n,n.return,o)}}l&64&&w0(n),l&512&&qe(n,n.return);break;case 3:if(Be(t,n),l&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{Ry(t,e)}catch(o){G(n,n.return,o)}}break;case 27:e===null&&l&4&&T0(n);case 26:case 5:Be(t,n),e===null&&l&4&&af(n),l&512&&qe(n,n.return);break;case 12:Be(t,n);break;case 31:Be(t,n),l&4&&U0(t,n);break;case 13:Be(t,n),l&4&&L0(t,n),l&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=wE.bind(null,n),tx(t,n))));break;case 22:if(l=n.memoizedState!==null||bt,!l){var i=e!==null&&e.memoizedState!==null||k;e=bt,a=k,bt=l,(k=i)&&!a?(l=2,(n.subtreeFlags&8772)!==0&&(l|=1),Ne(t,n,l)):Be(t,n),bt=e,k=a}break;case 30:Be(t,n),l&512&&qe(n,n.return);break;case 7:l&512&&qe(n,n.return);default:Be(t,n)}}function df(t,e){for(t=t.child;t!==null;)O0(t,e),t=t.sibling}function O0(t,e){switch(t.tag){case 5:case 26:try{var n=t.stateNode;if(e){var l=n.style;typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"}else{var a=t.stateNode,i=t.memoizedProps.style,o=i!=null&&i.hasOwnProperty("display")?i.display:null;a.style.display=o==null||typeof o=="boolean"?"":(""+o).trim()}}catch(s){G(t,t.return,s)}mf(t,e);break;case 6:try{t.stateNode.nodeValue=e?"":t.memoizedProps,q=!0}catch(s){G(t,t.return,s)}break;case 18:try{var u=t.stateNode;e?pg(u,!0):pg(t.stateNode,!1)}catch(s){G(t,t.return,s)}break;case 22:case 23:t.memoizedState===null&&df(t,e);break;default:df(t,e)}}function mf(t,e){if(t.subtreeFlags&67108864)for(t=t.child;t!==null;){t:{var n=t,l=e;switch(n.tag){case 4:O0(n,l);break t;case 22:n.memoizedState===null&&mf(n,l);break t;default:mf(n,l)}}t=t.sibling}}function R0(t){var e=t.alternate;e!==null&&(t.alternate=null,R0(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&mr(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var nt=null,Xt=!1;function _e(t,e,n){for(n=n.child;n!==null;)z0(t,e,n),n=n.sibling}function z0(t,e,n){if(ie&&typeof ie.onCommitFiberUnmount=="function")try{ie.onCommitFiberUnmount(Wi,n)}catch{}switch(n.tag){case 26:k||Tt(n,e),_e(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!k&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:k||Tt(n,e),Oi(n);var l=nt,a=Xt;tl(n.type)&&(nt=n.stateNode,Xt=!1),_e(t,e,n),bv(n.stateNode,n.type,n.memoizedProps),nt=l,Xt=a;break;case 5:k||Tt(n,e),Oi(n);case 6:if(n.tag===6&&Oi(n),l=nt,a=Xt,nt=null,_e(t,e,n),nt=l,Xt=a,nt!==null)if(Xt)try{(nt.nodeType===9?nt.body:nt.nodeName==="HTML"?nt.ownerDocument.body:nt).removeChild(n.stateNode),q=!0}catch(i){G(n,e,i)}else try{nt.removeChild(n.stateNode),q=!0}catch(i){G(n,e,i)}break;case 18:nt!==null&&(Xt?(t=nt,mg(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),La(t)):mg(nt,n.stateNode));break;case 4:l=nt,a=Xt,nt=n.stateNode.containerInfo,Xt=!0,_e(t,e,n),nt=l,Xt=a;break;case 0:case 11:case 14:case 15:Wn(2,n,e),k||Wn(4,n,e),_e(t,e,n);break;case 1:k||(Tt(n,e),l=n.stateNode,typeof l.componentWillUnmount=="function"&&E0(n,e,l)),_e(t,e,n);break;case 21:_e(t,e,n);break;case 22:k=(l=k)||n.memoizedState!==null,_e(t,e,n),k=l;break;case 30:Tt(n,e),_e(t,e,n);break;case 7:k||Tt(n,e),_e(t,e,n);break;default:_e(t,e,n)}}function U0(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{La(t)}catch(n){G(e,e.return,n)}}}function L0(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{La(t)}catch(n){G(e,e.return,n)}}function cE(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Ph),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Ph),e;default:throw Error(S(435,t.tag))}}function du(t,e){var n=cE(t);e.forEach(function(l){if(!n.has(l)){n.add(l);var a=EE.bind(null,t,l);l.then(a,a)}})}function Yt(t,e,n){var l=e.deletions;if(l!==null)for(var a=0;a<l.length;a++){var i=l[a],o=t,u=e,s=u;t:for(;s!==null;){switch(s.tag){case 27:if(tl(s.type)){nt=s.stateNode,Xt=!1;break t}break;case 5:nt=s.stateNode,Xt=!1;break t;case 3:case 4:nt=s.stateNode.containerInfo,Xt=!0;break t}s=s.return}if(nt===null)throw Error(S(160));z0(o,u,i),nt=null,Xt=!1,o=i.alternate,o!==null&&(o.return=null),i.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)D0(e,t,n),e=e.sibling}var Ae=null;function D0(t,e,n){var l=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(a&4&&(l=t.updateQueue,l=l!==null?l.events:null,l!==null))for(var i=0;i<l.length;i++){var o=l[i];o.ref.impl=o.nextImpl}Yt(e,t,n),Vt(t),a&4&&(Wn(3,t,t.return),ao(3,t),Wn(5,t,t.return));break;case 1:Yt(e,t,n),Vt(t),a&512&&(k||l===null||Tt(l,l.return)),a&64&&bt&&(t=t.updateQueue,t!==null&&(e=t.callbacks,e!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?e:n.concat(e))));break;case 26:if(i=Ae,Yt(e,t,n),Vt(t),a&512&&(k||l===null||Tt(l,l.return)),a&4)if(a=l!==null?l.memoizedState:null,n=t.memoizedState,l===null)if(n===null)if(t.stateNode===null)if(bt)t.stateNode=rv(t.type,t.memoizedProps,e.containerInfo,t);else{t:{e=t.type,n=t.memoizedProps,a=i.ownerDocument||i;e:switch(e){case"title":l=a.getElementsByTagName("title")[0],(!l||l[to]||l[_t]||l.namespaceURI==="http://www.w3.org/2000/svg"||l.hasAttribute("itemprop"))&&(l=a.createElement(e),a.head.insertBefore(l,a.querySelector("head > title"))),Ct(l,e,n),l[_t]=t,wt(l),e=l;break t;case"link":if(i=Eg("link","href",a).get(e+(n.href||""))){for(o=0;o<i.length;o++)if(l=i[o],l.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&l.getAttribute("rel")===(n.rel==null?null:n.rel)&&l.getAttribute("title")===(n.title==null?null:n.title)&&l.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){i.splice(o,1);break e}}l=a.createElement(e),Ct(l,e,n),a.head.appendChild(l);break;case"meta":if(i=Eg("meta","content",a).get(e+(n.content||""))){for(o=0;o<i.length;o++)if(l=i[o],l.getAttribute("content")===(n.content==null?null:""+n.content)&&l.getAttribute("name")===(n.name==null?null:n.name)&&l.getAttribute("property")===(n.property==null?null:n.property)&&l.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&l.getAttribute("charset")===(n.charSet==null?null:n.charSet)){i.splice(o,1);break e}}l=a.createElement(e),Ct(l,e,n),a.head.appendChild(l);break;default:throw Error(S(468,e))}l[_t]=t,wt(l),e=l}t.stateNode=e}else bt||Of(i,t.type,t.stateNode);else t.stateNode=wg(i,n,t.memoizedProps);else a!==n?(a===null?(e=l.stateNode,e===null||k||e.parentNode.removeChild(e)):a.count--,n===null?bt||Of(i,t.type,t.stateNode):wg(i,n,t.memoizedProps)):n===null&&t.stateNode!==null&&cc(t,t.memoizedProps,l.memoizedProps);break;case 27:Yt(e,t,n),Vt(t),a&512&&(k||l===null||Tt(l,l.return)),l!==null&&a&4&&cc(t,t.memoizedProps,l.memoizedProps);break;case 5:if(i=$e,$e=!1,Yt(e,t,n),$e=i,Vt(t),a&512&&(k||l===null||Tt(l,l.return)),t.flags&32){e=t.stateNode;try{Ta(e,""),q=!0}catch(p){G(t,t.return,p)}}a&4&&t.stateNode!=null&&(e=t.memoizedProps,cc(t,e,l!==null?l.memoizedProps:e)),a&1024&&(dc=!0);break;case 6:if(Yt(e,t,n),Vt(t),a&4){if(t.stateNode===null)throw Error(S(162));e=t.memoizedProps,n=t.stateNode;try{n.nodeValue=e,q=!0}catch(p){G(t,t.return,p)}}break;case 3:if(q=!1,Uu=null,i=Ae,Ae=Qi(e.containerInfo),Yt(e,t,n),Ae=i,Vt(t),a&4&&l!==null&&l.memoizedState.isDehydrated)try{La(e.containerInfo)}catch(p){G(t,t.return,p)}dc&&(dc=!1,$0(t)),q=!1;break;case 4:a=$e,$e=bt,l=ah(),i=Ae,Ae=Qi(t.stateNode.containerInfo),Yt(e,t,n),Vt(t),Ae=i,q&&Si&&(lr=!0),q=l,$e=a;break;case 12:Yt(e,t,n),Vt(t);break;case 31:Yt(e,t,n),Vt(t),a&4&&(e=t.updateQueue,e!==null&&(t.updateQueue=null,du(t,e)));break;case 13:Yt(e,t,n),Vt(t),t.child.flags&8192&&t.memoizedState!==null!=(l!==null&&l.memoizedState!==null)&&(Nr=ae()),a&4&&(e=t.updateQueue,e!==null&&(t.updateQueue=null,du(t,e)));break;case 22:i=t.memoizedState!==null,o=l!==null&&l.memoizedState!==null;var u=bt,s=k,d=$e;bt=u||i,$e=d||i,k=s||o,Yt(e,t,n),k=s,$e=d,bt=u,Vt(t),a&8192&&(e=t.stateNode,e._visibility=i?e._visibility&-2:e._visibility|1,!i||l===null||o||bt||k||(e=o||k,n=bt,l=k,bt=i||bt,k=e,Mn(t,2),bt=n,k=l),!i&&$e||df(t,i)),a&4&&(e=t.updateQueue,e!==null&&(n=e.retryQueue,n!==null&&(e.retryQueue=null,du(t,n))));break;case 19:Yt(e,t,n),Vt(t),a&4&&(e=t.updateQueue,e!==null&&(t.updateQueue=null,du(t,e)));break;case 30:a&512&&(k||l===null||Tt(l,l.return)),a=ah(),i=Si,o=(n&335544064)===n,u=t.memoizedProps,Si=o&&hn(u.default,u.update)!=="none",Yt(e,t,n),Vt(t),o&&l!==null&&q&&(t.flags|=4),Si=i,q=a;break;case 21:break;case 7:a&512&&(k||l===null||Tt(l,l.return)),l&&l.stateNode!==null&&(l.stateNode._fragmentFiber=t);default:Yt(e,t,n),Vt(t)}}function Vt(t){var e=t.flags;if(e&2){try{for(var n,l=t.return;l!==null;){if(x0(l)){n=l;break}l=l.return}l=null;for(var a=t.return;a!==null;){if(gd(a)){var i=a.stateNode;l===null?l=[i]:l.push(i)}if(hd(a))break;a=a.return}var o=l;if(n==null)throw Error(S(160));switch(n.tag){case 27:var u=n.stateNode,s=fc(t);er(t,s,u,o);break;case 5:var d=n.stateNode;n.flags&32&&(Ta(d,""),n.flags&=-33);var p=fc(t);er(t,p,d,o);break;case 3:case 4:var v=n.stateNode.containerInfo,m=fc(t);of(t,m,v,o);break;default:throw Error(S(161))}}catch(y){G(t,t.return,y)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function $0(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;$0(e),e.tag===5&&e.flags&1024&&(e=e.stateNode,Ua=!0,e.reset(),Ua=!1),t=t.sibling}}function Il(t,e){if(e.subtreeFlags&9270)for(e=e.child;e!==null;)H0(e,t),e=e.sibling;else M0(e,!1)}function H0(t,e){var n=t.alternate;if(n===null)uf(t,!1);else switch(t.tag){case 3:if(ff=He=!1,Wh(),Il(e,t),!He&&!lr){if(t=Ye,t!==null)for(var l=0;l<t.length;l+=3){n=t[l];var a=t[l+1];cv(n,t[l+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+a+")"})}t=e.containerInfo,t=t.nodeType===9?t.documentElement:t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName===""&&(t.style.viewTransitionName="none",t.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),t.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),ff=!0}Ye=null;break;case 5:Il(e,t);break;case 4:l=He,He=!1,Il(e,t),He&&(lr=!0),He=l;break;case 22:t.memoizedState===null&&(n.memoizedState!==null?uf(t,!1):Il(e,t));break;case 30:l=He,a=Wh(),He=!1,Il(e,t),He&&(t.flags|=4);var i=t.memoizedProps,o=t.stateNode;e=sn(i,o),o=sn(n.memoizedProps,o);var u=hn(i.default,i.update);u==="none"?e=!1:(i=n.memoizedState,n.memoizedState=null,n=t.child,Qt=0,e=yd(t,n,e,o,u,i,!0),Qt!==(i===null?0:i.length)&&(t.flags|=32)),(t.flags&4)!==0&&e?(Aa(t,t.memoizedProps.onUpdate),Ye=a):a!==null&&(a.push.apply(a,Ye),Ye=a),He=(t.flags&32)!==0?!0:l;break;default:Il(e,t)}}function Be(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)C0(t,e.alternate,e),e=e.sibling}function Mn(t,e){for(t=t.child;t!==null;){var n=t,l=e;switch(n.tag){case 0:case 11:case 14:case 15:Wn(4,n,n.return),Mn(n,l);break;case 1:Tt(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&E0(n,n.return,a),Mn(n,l);break;case 27:(l&2)!==0&&bv(n.stateNode,n.type,n.memoizedProps);case 5:Tt(n,n.return),n.tag!==5&&n.tag!==27||Oi(n),Mn(n,l);break;case 6:Oi(n);break;case 26:Tt(n,n.return),a=n.stateNode,n.memoizedState!==null||a===null||k||a.parentNode.removeChild(a),Mn(n,l);break;case 22:n.memoizedState===null&&Mn(n,l);break;case 30:Tt(n,n.return),Mn(n,l);break;case 7:Tt(n,n.return);default:Mn(n,l)}t=t.sibling}}function Ne(t,e,n){for(n=(e.subtreeFlags&8772)!==0?n:n&-2,e=e.child;e!==null;){var l=e.alternate,a=t,i=e,o=i.flags,u=(n&1)!==0;switch(i.tag){case 0:case 11:case 15:Ne(a,i,n),ao(4,i);break;case 1:if(Ne(a,i,n),l=i,a=l.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(p){G(l,l.return,p)}if(l=i,a=l.updateQueue,a!==null){var s=l.stateNode;try{var d=a.shared.hiddenCallbacks;if(d!==null)for(a.shared.hiddenCallbacks=null,a=0;a<d.length;a++)Oy(d[a],s)}catch(p){G(l,l.return,p)}}u&&o&64&&w0(i),qe(i,i.return);break;case 27:(n&2)!==0&&T0(i);case 5:i.tag!==5&&i.tag!==27||Jh(i),Ne(a,i,n),u&&l===null&&o&4&&af(i),qe(i,i.return);break;case 6:Jh(i);break;case 26:s=i.stateNode,i.memoizedState!==null||s===null||bt||Of(Qi(s.ownerDocument),i.type,s),Ne(a,i,n),u&&l===null&&o&4&&af(i),qe(i,i.return);break;case 12:Ne(a,i,n);break;case 31:Ne(a,i,n),u&&o&4&&U0(a,i);break;case 13:Ne(a,i,n),u&&o&4&&L0(a,i);break;case 22:i.memoizedState===null&&Ne(a,i,n),qe(i,i.return);break;case 30:Ne(a,i,n),qe(i,i.return);break;case 7:qe(i,i.return);default:Ne(a,i,n)}e=e.sibling}}function vd(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&no(n))}function bd(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&no(t))}function he(t,e,n,l){var a=(n&335544064)===n;if(e.subtreeFlags&(a?10262:10256))for(e=e.child;e!==null;)B0(t,e,n,l),e=e.sibling;else a&&A0(e)}function B0(t,e,n,l){var a=(n&335544064)===n;a&&e.alternate===null&&e.return!==null&&e.return.alternate!==null&&Cu(e);var i=e.flags;switch(e.tag){case 0:case 11:case 15:he(t,e,n,l),i&2048&&ao(9,e);break;case 1:he(t,e,n,l);break;case 3:he(t,e,n,l),a&&ff&&(t=t.containerInfo,t=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,t.style.viewTransitionName==="root"&&(t.style.viewTransitionName=""),t=t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName==="none"&&(t.style.viewTransitionName="")),i&2048&&(i=null,e.alternate!==null&&(i=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==i&&(e.refCount++,i!=null&&no(i)));break;case 12:if(i&2048){he(t,e,n,l),i=e.stateNode;try{var o=e.memoizedProps,u=o.id,s=o.onPostCommit;typeof s=="function"&&s(u,e.alternate===null?"mount":"update",i.passiveEffectDuration,-0)}catch(d){G(e,e.return,d)}}else he(t,e,n,l);break;case 31:he(t,e,n,l);break;case 13:he(t,e,n,l);break;case 23:break;case 22:o=e.stateNode,u=e.alternate,e.memoizedState!==null?(a&&u!==null&&u.memoizedState===null&&Cu(u),o._visibility&2?he(t,e,n,l):Ri(t,e)):(a&&u!==null&&u.memoizedState!==null&&Cu(e),o._visibility&2?he(t,e,n,l):(o._visibility|=2,Pl(t,e,n,l,(e.subtreeFlags&10256)!==0||!1))),i&2048&&vd(u,e);break;case 24:he(t,e,n,l),i&2048&&bd(e.alternate,e);break;case 30:a&&(i=e.alternate,i!==null&&(Ke(i.child,!0),Ke(e.child,!0))),he(t,e,n,l);break;default:he(t,e,n,l)}}function Pl(t,e,n,l,a){for(a=a&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var i=t,o=e,u=n,s=l,d=o.flags;switch(o.tag){case 0:case 11:case 15:Pl(i,o,u,s,a),ao(8,o);break;case 23:break;case 22:var p=o.stateNode;o.memoizedState!==null?p._visibility&2?Pl(i,o,u,s,a):Ri(i,o):(p._visibility|=2,Pl(i,o,u,s,a)),a&&d&2048&&vd(o.alternate,o);break;case 24:Pl(i,o,u,s,a),a&&d&2048&&bd(o.alternate,o);break;default:Pl(i,o,u,s,a)}e=e.sibling}}function Ri(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,l=e,a=l.flags;switch(l.tag){case 22:Ri(n,l),a&2048&&vd(l.alternate,l);break;case 24:Ri(n,l),a&2048&&bd(l.alternate,l);break;default:Ri(n,l)}e=e.sibling}}var dl=8192;function sl(t,e,n){if(t.subtreeFlags&dl)for(t=t.child;t!==null;)q0(t,e,n),t=t.sibling}function q0(t,e,n){switch(t.tag){case 26:sl(t,e,n),t.flags&dl&&(t.memoizedState!==null?px(n,Ae,t.memoizedState,t.memoizedProps):(t=t.stateNode,(e&335544128)===e&&Tg(n,t)));break;case 5:sl(t,e,n),t.flags&dl&&(t=t.stateNode,(e&335544128)===e&&Tg(n,t));break;case 3:case 4:var l=Ae;Ae=Qi(t.stateNode.containerInfo),sl(t,e,n),Ae=l;break;case 22:t.memoizedState===null&&(l=t.alternate,l!==null&&l.memoizedState!==null?(l=dl,dl=16777216,sl(t,e,n),dl=l):sl(t,e,n));break;case 30:if((t.flags&dl)!==0&&(l=t.memoizedProps.name,l!=null&&l!=="auto")){var a=t.stateNode;a.paired=null,ne===null&&(ne=new Map),ne.set(l,a)}sl(t,e,n);break;default:sl(t,e,n)}}function Y0(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function mi(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var l=e[n];St=l,k0(l,t)}Y0(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)V0(t),t=t.sibling}function V0(t){switch(t.tag){case 0:case 11:case 15:mi(t),t.flags&2048&&Wn(9,t,t.return);break;case 3:mi(t);break;case 12:mi(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,Ou(t)):mi(t);break;default:mi(t)}}function Ou(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var n=0;n<e.length;n++){var l=e[n];St=l,k0(l,t)}Y0(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:Wn(8,e,e.return),Ou(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,Ou(e));break;default:Ou(e)}t=t.sibling}}function k0(t,e){for(;St!==null;){var n=St;switch(n.tag){case 0:case 11:case 15:Wn(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var l=n.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:no(n.memoizedState.cache)}if(l=n.child,l!==null)l.return=n,St=l;else t:for(n=t;St!==null;){l=St;var a=l.sibling,i=l.return;if(R0(l),l===n){St=null;break t}if(a!==null){a.return=i,St=a;break t}St=i}}}var fE={getCacheForType:function(t){var e=Nt(mt),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return Nt(mt).controller.signal}},dE=typeof WeakMap=="function"?WeakMap:Map,Y=0,K=null,$=null,H=0,j=0,Ft=null,Dn=!1,qa=!1,Sd=!1,mn=0,ot=0,Pn=0,bl=0,ar=0,le=0,Na=0,zi=null,Gt=null,pf=!1,Nr=0,j0=0,ir=1/0,or=null,Xn=null,lt=0,Ce=null,Al=null,Qe=0,hf=0,gf=null,X0=null,ba=null,Sa=null,wa=null,Ui=0,Ru=null;function ue(){return(Y&2)!==0&&H!==0?H&-H:O.T!==null?Ed():Zg()}function G0(){if(le===0)if((H&536870912)===0||L){var t=Fo;Fo<<=1,(Fo&3932160)===0&&(Fo=262144),le=t}else le=536870912;return t=Ot.current,t!==null&&(t.flags|=32),le}function Aa(t,e){if(e!=null){var n=t.stateNode,l=n.ref;l===null&&(l=n.ref=dv(sn(t.memoizedProps,n))),Sa===null&&(Sa=[]),Sa.push(e.bind(null,l))}}function Zt(t,e,n){(t===K&&(j===2||j===9)||t.cancelPendingCommit!==null)&&(Ma(t,0),$n(t,H,le,!1)),Fi(t,n),((Y&2)===0||t!==K)&&(t===K&&((Y&2)===0&&(bl|=n),ot===4&&$n(t,H,le,!1)),Je(t))}function Q0(t,e,n){if((Y&6)!==0)throw Error(S(327));var l=!n&&(e&127)===0&&(e&t.expiredLanes)===0||Pi(t,e),a=l?hE(t,e):mc(t,e,!0),i=l;do{if(a===0){qa&&!l&&$n(t,e,0,!1);break}else{if(n=t.current.alternate,i&&!mE(n)){a=mc(t,e,!1),i=!1;continue}if(a===2){if(i=e,t.errorRecoveryDisabledLanes&i)var o=0;else o=t.pendingLanes&-536870913,o=o!==0?o:o&536870912?536870912:0;if(o!==0){e=o;t:{var u=t;a=zi;var s=u.current.memoizedState.isDehydrated;if(s&&(Ma(u,o).flags|=256),o=mc(u,o,!1),o!==2&&o!==6){if(Sd&&!s){u.errorRecoveryDisabledLanes|=i,bl|=i,a=4;break t}i=Gt,Gt=a,i!==null&&(Gt===null?Gt=i:Gt.push.apply(Gt,i))}a=o}if(i=!1,a!==2)continue}}if(a===1){Ma(t,0),$n(t,e,0,!0);break}t:{switch(l=t,i=a,i){case 0:case 1:throw Error(S(345));case 4:if((e&4194048)!==e&&(e&62914560)!==e)break;case 6:$n(l,e,le,!Dn);break t;case 2:Gt=null;break;case 3:case 5:break;default:throw Error(S(329))}if((e&62914560)===e&&(a=Nr+300-ae(),10<a)){if($n(l,e,le,!Dn),dr(l,0,!0)!==0)break t;Qe=e,l.timeoutHandle=Td(Fh.bind(null,l,n,Gt,or,pf,e,le,bl,Na,Dn,i,"Throttled",-0,0),a);break t}Fh(l,n,Gt,or,pf,e,le,bl,Na,Dn,i,null,-0,0)}}break}while(!0);Je(t)}function Fh(t,e,n,l,a,i,o,u,s,d,p,v,m,y){t.timeoutHandle=-1;var E=e.subtreeFlags,_=(i&335544064)===i;if(v=null,(_||E&8192||(E&16785408)===16785408)&&(v={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ke},ne=null,q0(e,i,v),_&&(E=v,_=t.containerInfo,_=(_.nodeType===9?_:_.ownerDocument).__reactViewTransition,_!=null&&(E.count++,E.waitingForViewTransition=!0,E=Ki.bind(E),_.finished.then(E,E))),E=(i&62914560)===i?Nr-ae():(i&4194048)===i?j0-ae():0,E=hx(v,E),E!==null)){Qe=i,t.cancelPendingCommit=E(eg.bind(null,t,e,i,n,l,a,o,u,s,d,p,v,null,m,y)),$n(t,i,o,!d);return}eg(t,e,i,n,l,a,o,u,s,d,p,v)}function mE(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var l=0;l<n.length;l++){var a=n[l],i=a.getSnapshot;a=a.value;try{if(!re(i(),a))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function $n(t,e,n,l){e=jg(t,e),e&=~ar,e&=~bl,t.suspendedLanes|=e,t.pingedLanes&=~e,l&&(t.warmLanes|=e),l=t.expirationTimes;for(var a=e;0<a;){var i=31-oe(a),o=1<<i;l[i]=-1,a&=~o}n!==0&&Gg(t,n,e)}function Ar(){return(Y&6)===0?(io(0,!1),!1):!0}function wd(){if($!==null){if(j===0)var t=$.return;else t=$,an=zl=null,ad(t),ga=null,Yi=0,t=$;for(;t!==null;)S0(t.alternate,t),t=t.return;$=null}}function Ma(t,e){var n=t.timeoutHandle;return n!==-1&&(t.timeoutHandle=-1,DE(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Qe=0,wd(),K=t,$=n=on(t.current,null),H=e,j=0,Ft=null,Dn=!1,qa=Pi(t,e),Sd=!1,Na=le=ar=bl=Pn=ot=0,Gt=zi=null,pf=!1,mn=jg(t,e),yr(),n}function K0(t,e){U=null,O.H=Pu,e===Ha||e===Sr?(e=Nh(),j=3):e===If?(e=Nh(),j=4):j=e===dd?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,Ft=e,$===null&&(ot=1,Fu(t,Se(e,t.current)))}function Z0(){var t=Ot.current;return t===null?!0:(H&4194048)===H?Ht===null:(H&62914560)===H||(H&536870912)!==0?t===Ht:!1}function J0(){var t=O.H;return O.H=Pu,t===null?Pu:t}function I0(){var t=O.A;return O.A=fE,t}function ur(){ot=4,Dn||(H&4194048)!==H&&Ot.current!==null||(qa=!0),(Pn&134217727)===0&&(bl&134217727)===0||K===null||$n(K,H,le,!1)}function mc(t,e,n){var l=Y;Y|=2;var a=J0(),i=I0();(K!==t||H!==e)&&(or=null,Ma(t,e)),e=!1;var o=ot;t:do try{if(j!==0&&$!==null){var u=$,s=Ft;switch(j){case 8:wd(),o=6;break t;case 3:case 2:case 9:case 6:Ot.current===null&&(e=!0);var d=j;if(j=0,Ft=null,fa(t,u,s,d),n&&qa){o=0;break t}break;default:d=j,j=0,Ft=null,fa(t,u,s,d)}}pE(),o=ot;break}catch(p){K0(t,p)}while(!0);return e&&t.shellSuspendCounter++,an=zl=null,Y=l,O.H=a,O.A=i,$===null&&(K=null,H=0,yr()),o}function pE(){for(;$!==null;)W0($)}function hE(t,e){var n=Y;Y|=2;var l=J0(),a=I0();K!==t||H!==e?(or=null,ir=ae()+500,Ma(t,e)):qa=Pi(t,e);t:do try{if(j!==0&&$!==null){e=$;var i=Ft;e:switch(j){case 1:j=0,Ft=null,fa(t,e,i,1);break;case 2:case 9:if(_h(i)){j=0,Ft=null,tg(e);break}e=function(){j!==2&&j!==9||K!==t||(j=7),Je(t)},i.then(e,e);break t;case 3:j=7;break t;case 4:j=5;break t;case 7:_h(i)?(j=0,Ft=null,tg(e)):(j=0,Ft=null,fa(t,e,i,7));break;case 5:var o=null;switch($.tag){case 26:o=$.memoizedState;case 5:case 27:var u=$;if(o?Ev(o):u.stateNode.complete){j=0,Ft=null;var s=u.sibling;if(s!==null)$=s;else{var d=u.return;d!==null?($=d,Mr(d)):$=null}break e}}j=0,Ft=null,fa(t,e,i,5);break;case 6:j=0,Ft=null,fa(t,e,i,6);break;case 8:wd(),ot=6;break t;default:throw Error(S(462))}}gE();break}catch(p){K0(t,p)}while(!0);return an=zl=null,O.H=l,O.A=a,Y=n,$!==null?0:(K=null,H=0,yr(),ot)}function gE(){for(;$!==null&&!US();)W0($)}function W0(t){var e=b0(t.alternate,t,mn);t.memoizedProps=t.pendingProps,e===null?Mr(t):$=e}function tg(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=kh(n,e,e.pendingProps,e.type,void 0,H);break;case 11:e=kh(n,e,e.pendingProps,e.type.render,e.ref,H);break;case 5:ad(e);var l=e;l===Et&&(L?(Gu(l),l.tag===5&&l.stateNode!=null&&(P=l.stateNode)):(Gu(l),L=!0));default:S0(n,e),e=$=wy(e,mn),e=b0(n,e,mn)}t.memoizedProps=t.pendingProps,e===null?Mr(t):$=e}function fa(t,e,n,l){an=zl=null,ad(e),ga=null,Yi=0;var a=e.return;try{if(lE(t,a,e,n,H)){ot=1,Fu(t,Se(n,t.current)),$=null;return}}catch(i){if(a!==null)throw $=a,i;ot=1,Fu(t,Se(n,t.current)),$=null;return}e.flags&32768?(L||l===1?t=!0:qa||(H&536870912)!==0?t=!1:(Dn=t=!0,(l===2||l===9||l===3||l===6)&&(l=Ot.current,l!==null&&l.tag===13&&(l.flags|=16384))),P0(e,t)):Mr(e)}function Mr(t){var e=t;do{if((e.flags&32768)!==0){P0(e,Dn);return}t=e.return;var n=uE(e.alternate,e,mn);if(n!==null){$=n;return}if(e=e.sibling,e!==null){$=e;return}$=e=t}while(e!==null);ot===0&&(ot=5)}function P0(t,e){do{var n=rE(t.alternate,t);if(n!==null){n.flags&=32767,$=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){$=t;return}$=t=n}while(t!==null);ot=6,$=null}function eg(t,e,n,l,a,i,o,u,s,d,p,v){t.cancelPendingCommit=null;do Cr();while(lt!==0);if((Y&6)!==0)throw Error(S(327));if(e!==null){if(e===t.current)throw Error(S(177));t===K&&($=K=null,H=0),Al=e,Ce=t,Qe=n,gf=a,X0=l,yE(t,e,n,o,u,s,v)}}function yE(t,e,n,l,a,i,o){var u=e.lanes|e.childLanes;if(hf=u,u|=Xf,jS(t,n,u,l,a,i),Sa=null,(n&335544064)===n?(wa=Gw(t),l=10262):(wa=null,l=10256),(e.subtreeFlags&l)!==0||(e.flags&l)!==0?(t.callbackNode=null,t.callbackPriority=0,xE(Yu,function(){return Sf(),null})):(t.callbackNode=null,t.callbackPriority=0),nr=!1,l=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||l){l=O.T,O.T=null,a=V.p,V.p=2,i=Y,Y|=4;try{sE(t,e,n)}finally{Y=i,V.p=a,O.T=l}}lt=1,nr?ba=VE(o,t.containerInfo,wa,yf,vf,bE,bf,Sf,vE,null,null):(yf(),vf(),bf())}function vE(t){if(lt!==0){var e=Ce.onRecoverableError;e(t,{componentStack:null})}}function bE(){lt===3&&(lt=0,H0(Al,Ce),lt=4)}function yf(){if(lt===1){lt=0;var t=Ce,e=Al,n=Qe,l=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||l){l=O.T,O.T=null;var a=V.p;V.p=2;var i=Y;Y|=4;try{Si=lr=!1,D0(e,t,n),n=Tf;var o=my(t.containerInfo),u=n.focusedElem,s=n.selectionRange;if(o!==u&&u&&u.ownerDocument&&dy(u.ownerDocument.documentElement,u)){if(s!==null&&jf(u)){var d=s.start,p=s.end;if(p===void 0&&(p=d),"selectionStart"in u)u.selectionStart=d,u.selectionEnd=Math.min(p,u.value.length);else{var v=u.ownerDocument||document,m=v&&v.defaultView||window;if(m.getSelection){var y=m.getSelection(),E=u.textContent.length,_=Math.min(s.start,E),N=s.end===void 0?_:Math.min(s.end,E);!y.extend&&_>N&&(o=N,N=_,_=o);var f=yh(u,_),c=yh(u,N);if(f&&c&&(y.rangeCount!==1||y.anchorNode!==f.node||y.anchorOffset!==f.offset||y.focusNode!==c.node||y.focusOffset!==c.offset)){var g=v.createRange();g.setStart(f.node,f.offset),y.removeAllRanges(),_>N?(y.addRange(g),y.extend(c.node,c.offset)):(g.setEnd(c.node,c.offset),y.addRange(g))}}}}for(v=[],y=u;y=y.parentNode;)y.nodeType===1&&v.push({element:y,left:y.scrollLeft,top:y.scrollTop});for(typeof u.focus=="function"&&u.focus(),u=0;u<v.length;u++){var b=v[u];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}Ua=!!xf,Tf=xf=null}finally{Y=i,V.p=a,O.T=l}}t.current=e,lt=2}}function vf(){if(lt===2){lt=0;var t=Ce,e=Al,n=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||n){n=O.T,O.T=null;var l=V.p;V.p=2;var a=Y;Y|=4;try{C0(t,e.alternate,e)}finally{Y=a,V.p=l,O.T=n}}lt=3}}function bf(){if(lt===4||lt===3){lt=0;var t=ba;ba=null,LS();var e=Ce,n=Al,l=Qe,a=X0,i=(l&335544064)===l?10262:10256;if((n.subtreeFlags&i)!==0||(n.flags&i)!==0?lt=5:(lt=0,Al=Ce=null,F0(e,e.pendingLanes)),i=e.pendingLanes,i===0&&(Xn=null),Hf(l),n=n.stateNode,ie&&typeof ie.onCommitFiberRoot=="function")try{ie.onCommitFiberRoot(Wi,n,void 0,(n.current.flags&128)===128)}catch{}if(a!==null){n=O.T,i=V.p,V.p=2,O.T=null;try{for(var o=e.onRecoverableError,u=0;u<a.length;u++){var s=a[u];o(s.value,{componentStack:s.stack})}}finally{O.T=n,V.p=i}}if(a=Sa,o=wa,wa=null,a!==null&&(Sa=null,o===null&&(o=[]),t!==null))for(s=0;s<a.length;s++)n=(0,a[s])(o),n!==void 0&&t.finished.finally(n);(Qe&3)!==0&&Cr(),Je(e),i=e.pendingLanes,(l&261930)!==0&&(i&42)!==0?e===Ru?Ui++:(Ui=0,Ru=e):(Ui=0,Ru=null),io(0,!1)}}function F0(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,no(e)))}function Cr(){return ba!==null&&(ba.skipTransition(),ba=null),yf(),vf(),bf(),Sf()}function Sf(){if(lt!==5)return!1;var t=Ce,e=hf;hf=0;var n=Hf(Qe),l=O.T,a=V.p;try{V.p=32>n?32:n,O.T=null,n=gf,gf=null;var i=Ce,o=Qe;if(lt=0,Al=Ce=null,Qe=0,(Y&6)!==0)throw Error(S(331));var u=Y;if(Y|=4,V0(i.current),B0(i,i.current,o,n),Y=u,io(0,!1),ie&&typeof ie.onPostCommitFiberRoot=="function")try{ie.onPostCommitFiberRoot(Wi,i)}catch{}return!0}finally{V.p=a,O.T=l,F0(t,e)}}function ng(t,e,n){e=Se(n,e),e=Pc(t.stateNode,e,2),t=Vn(t,e,2),t!==null&&(Fi(t,2),Je(t))}function G(t,e,n){if(t.tag===3)ng(t,t,n);else for(;e!==null;){if(e.tag===3){ng(e,t,n);break}else if(e.tag===1){var l=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(Xn===null||!Xn.has(l))){t=Se(n,t),n=p0(2),l=Vn(e,n,2),l!==null&&(h0(n,l,e,t),Fi(l,2),Je(l));break}}e=e.return}}function pc(t,e,n){var l=t.pingCache;if(l===null){l=t.pingCache=new dE;var a=new Set;l.set(e,a)}else a=l.get(e),a===void 0&&(a=new Set,l.set(e,a));a.has(n)||(Sd=!0,a.add(n),t=SE.bind(null,t,e,n),e.then(t,t))}function SE(t,e,n){var l=t.pingCache;l!==null&&l.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,K===t&&(H&n)===n&&((ot===4||ot===3&&(H&62914560)===H&&300>ae()-Nr)&&(Y&2)===0?Ma(t,0):ar|=n,Na===H&&(Na=0)),Je(t)}function tv(t,e){e===0&&(e=Xg()),t=Rl(t,e),t!==null&&(Fi(t,e),Je(t))}function wE(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),tv(t,n)}function EE(t,e){var n=0;switch(t.tag){case 31:case 13:var l=t.stateNode,a=t.memoizedState;a!==null&&(n=a.retryLane);break;case 19:l=t.stateNode;break;case 22:l=t.stateNode._retryCache;break;default:throw Error(S(314))}l!==null&&l.delete(e),tv(t,n)}function xE(t,e){return Df(t,e)}var Ca=null,Fl=null,wf=!1,rr=!1,hc=!1,Hn=0;function Je(t){t!==Fl&&t.next===null&&(Fl===null?Ca=Fl=t:Fl=Fl.next=t),rr=!0,wf||(wf=!0,_E())}function io(t,e){if(!hc&&rr){hc=!0;do for(var n=!1,l=Ca;l!==null;){if(!e)if(t!==0){var a=l.pendingLanes;if(a===0)var i=0;else{var o=l.suspendedLanes,u=l.pingedLanes;i=(1<<31-oe(42|t)+1)-1,i&=a&~(o&~u),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,lg(l,i))}else i=H,i=dr(l,l===K?i:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(i&3)===0||Pi(l,i)||(n=!0,lg(l,i));l=l.next}while(n);hc=!1}}function TE(){ev()}function ev(){rr=wf=!1;var t=0;Hn!==0&&LE()&&(t=Hn);for(var e=ae(),n=null,l=Ca;l!==null;){var a=l.next,i=nv(l,e);i===0?(l.next=null,n===null?Ca=a:n.next=a,a===null&&(Fl=n)):(n=l,(t!==0||(i&3)!==0)&&(rr=!0)),l=a}lt!==0&&lt!==5||io(t,!1),Hn!==0&&(Hn=0)}function nv(t,e){for(var n=t.suspendedLanes,l=t.pingedLanes,a=t.expirationTimes,i=t.pendingLanes&-62914561;0<i;){var o=31-oe(i),u=1<<o,s=a[o];s===-1?((u&n)===0||(u&l)!==0)&&(a[o]=kS(u,e)):s<=e&&(t.expiredLanes|=u),i&=~u}if(e=K,n=H,n=dr(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l=t.callbackNode,n===0||t===e&&(j===2||j===9)||t.cancelPendingCommit!==null)return l!==null&&l!==null&&Ks(l),t.callbackNode=null,t.callbackPriority=0;if((n&3)===0||Pi(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(l!==null&&Ks(l),Hf(n)){case 2:case 8:n=Vg;break;case 32:n=Yu;break;case 268435456:n=kg;break;default:n=Yu}return l=lv.bind(null,t),n=Df(n,l),t.callbackPriority=e,t.callbackNode=n,e}return l!==null&&l!==null&&Ks(l),t.callbackPriority=2,t.callbackNode=null,2}function lv(t,e){if(lt!==0&&lt!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(Cr()&&t.callbackNode!==n)return null;var l=H;return l=dr(t,t===K?l:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l===0?null:(Q0(t,l,e),nv(t,ae()),t.callbackNode!=null&&t.callbackNode===n?lv.bind(null,t):null)}function lg(t,e){if(Cr())return null;Q0(t,e,!0)}function _E(){$E(function(){(Y&6)!==0?Df(Yg,TE):ev()})}function Ed(){if(Hn===0){var t=xl;t===0&&(t=Po,Po<<=1,(Po&261888)===0&&(Po=256)),Hn=t}return Hn}function ag(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:bu(t)}function NE(t,e,n,l,a){if(e==="submit"&&n&&n.stateNode===a){var i=ag((a[It]||null).action),o=l.submitter;o&&(e=(e=o[It]||null)?ag(e.formAction):o.getAttribute("formAction"),e!==null&&(i=e,o=null));var u=new pr("action","action",null,l,a);t.push({event:u,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(Hn!==0){var s=new FormData(a,o);Ic(n,{pending:!0,data:s,method:a.method,action:i},null,s)}}else typeof i=="function"&&(u.preventDefault(),s=new FormData(a,o),Ic(n,{pending:!0,data:s,method:a.method,action:i},i,s))},currentTarget:a}]})}}for(mu=0;mu<qc.length;mu++)pu=qc[mu],ig=pu.toLowerCase(),og=pu[0].toUpperCase()+pu.slice(1),Oe(ig,"on"+og);var pu,ig,og,mu;Oe(hy,"onAnimationEnd");Oe(gy,"onAnimationIteration");Oe(yy,"onAnimationStart");Oe("dblclick","onDoubleClick");Oe("focusin","onFocus");Oe("focusout","onBlur");Oe(Hw,"onTransitionRun");Oe(Bw,"onTransitionStart");Oe(qw,"onTransitionCancel");Oe(vy,"onTransitionEnd");xa("onMouseEnter",["mouseout","mouseover"]);xa("onMouseLeave",["mouseout","mouseover"]);xa("onPointerEnter",["pointerout","pointerover"]);xa("onPointerLeave",["pointerout","pointerover"]);Cl("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Cl("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Cl("onBeforeInput",["compositionend","keypress","textInput","paste"]);Cl("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Cl("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Cl("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ji="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),AE=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ji));function av(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var l=t[n],a=l.event;l=l.listeners;t:{var i=void 0;if(e)for(var o=l.length-1;0<=o;o--){var u=l[o],s=u.instance,d=u.currentTarget;if(u=u.listener,s!==i&&a.isPropagationStopped())break t;i=u,a.currentTarget=d;try{i(a)}catch(p){ku(p)}a.currentTarget=null,i=s}else for(o=0;o<l.length;o++){if(u=l[o],s=u.instance,d=u.currentTarget,u=u.listener,s!==i&&a.isPropagationStopped())break t;i=u,a.currentTarget=d;try{i(a)}catch(p){ku(p)}a.currentTarget=null,i=s}}}}function D(t,e){var n=e[th];n===void 0&&(n=e[th]=new Set);var l=t+"__bubble";n.has(l)||(iv(e,t,2,!1),n.add(l))}function gc(t,e,n){var l=0;e&&(l|=4),iv(n,t,l,e)}var hu="_reactListening"+Math.random().toString(36).slice(2);function xd(t){if(!t[hu]){t[hu]=!0,Ig.forEach(function(n){n!=="selectionchange"&&(AE.has(n)||gc(n,!1,t),gc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[hu]||(e[hu]=!0,gc("selectionchange",!1,e))}}function iv(t,e,n,l){switch(Cv(e)){case 2:var a=bx;break;case 8:a=Sx;break;default:a=Od}n=a.bind(null,e,n,t),a=void 0,!Dc||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(a=!0),l?a!==void 0?t.addEventListener(e,n,{capture:!0,passive:a}):t.addEventListener(e,n,!0):a!==void 0?t.addEventListener(e,n,{passive:a}):t.addEventListener(e,n,!1)}function yc(t,e,n,l,a){var i=l;if((e&1)===0&&(e&2)===0&&l!==null)t:for(;;){if(l===null)return;var o=l.tag;if(o===3||o===4){var u=l.stateNode.containerInfo;if(u===a)break;if(o===4)for(o=l.return;o!==null;){var s=o.tag;if((s===3||s===4)&&o.stateNode.containerInfo===a)return;o=o.return}for(;u!==null;){if(o=ml(u),o===null)return;if(s=o.tag,s===5||s===6||s===26||s===27){l=i=o;continue t}u=u.parentNode}}l=l.return}ay(function(){var d=i,p=qf(n),v=[];t:{var m=by.get(t);if(m!==void 0){var y=pr,E=t;switch(t){case"keypress":if(wu(n)===0)break t;case"keydown":case"keyup":y=mw;break;case"focusin":E="focus",y=Fs;break;case"focusout":E="blur",y=Fs;break;case"beforeblur":case"afterblur":y=Fs;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=rh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=ew;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=vw;break;case hy:case gy:case yy:y=aw;break;case vy:y=Sw;break;case"scroll":case"scrollend":y=FS;break;case"wheel":y=Ew;break;case"copy":case"cut":case"paste":y=ow;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=ch;break;case"submit":y=gw;break;case"toggle":case"beforetoggle":y=Tw}var _=(e&4)!==0,N=!_&&(t==="scroll"||t==="scrollend"),f=_?m!==null?m+"Capture":null:m;_=[];for(var c=d,g;c!==null;){var b=c;if(g=b.stateNode,b=b.tag,b!==5&&b!==26&&b!==27||g===null||f===null||(b=Di(c,f),b!=null&&_.push(Xi(c,b,g))),N)break;c=c.return}0<_.length&&(m=new y(m,E,null,n,p),v.push({event:m,listeners:_}))}}if((e&7)===0){t:{if(y=t==="mouseover"||t==="pointerover",m=t==="mouseout"||t==="pointerout",y&&n!==Lc&&(E=n.relatedTarget||n.fromElement)&&(ml(E)||E[Da]))break t;(m||y)&&(E=p.window===p?p:(y=p.ownerDocument)?y.defaultView||y.parentWindow:window,m?(y=n.relatedTarget||n.toElement,m=d,y=y?ml(y):null,y!==null&&(N=Ii(y),_=y.tag,y!==N||_!==5&&_!==27&&_!==6)&&(y=null)):(m=null,y=d),m!==y&&(_=rh,b="onMouseLeave",f="onMouseEnter",c="mouse",(t==="pointerout"||t==="pointerover")&&(_=ch,b="onPointerLeave",f="onPointerEnter",c="pointer"),N=m==null?E:vi(m),g=y==null?E:vi(y),E=new _(b,c+"leave",m,n,p),E.target=N,E.relatedTarget=g,b=null,ml(p)===d&&(_=new _(f,c+"enter",y,n,p),_.target=g,_.relatedTarget=N,b=_),N=b,_=m&&y?Ec(m,y,ME):null,m!==null&&ug(v,E,m,_,!1),y!==null&&N!==null&&ug(v,N,y,_,!0)))}t:{if(m=d?vi(d):window,y=m.nodeName&&m.nodeName.toLowerCase(),y==="select"||y==="input"&&m.type==="file")var x=ph;else if(mh(m))if(cy)x=Lw;else{x=zw;var z=Rw}else y=m.nodeName,!y||y.toLowerCase()!=="input"||m.type!=="checkbox"&&m.type!=="radio"?d&&Bf(d.elementType)&&(x=ph):x=Uw;if(x&&(x=x(t,d))){sy(v,x,n,p);break t}z&&z(t,m,d)}switch(z=d?vi(d):window,t){case"focusin":(mh(z)||z.contentEditable==="true")&&(ia=z,Hc=d,xi=null);break;case"focusout":xi=Hc=ia=null;break;case"mousedown":Bc=!0;break;case"contextmenu":case"mouseup":case"dragend":Bc=!1,vh(v,n,p);break;case"selectionchange":if($w)break;case"keydown":case"keyup":vh(v,n,p)}var A;if(kf)t:{switch(t){case"compositionstart":var M="onCompositionStart";break t;case"compositionend":M="onCompositionEnd";break t;case"compositionupdate":M="onCompositionUpdate";break t}M=void 0}else aa?uy(t,n)&&(M="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(M="onCompositionStart");M&&(oy&&n.locale!=="ko"&&(aa||M!=="onCompositionStart"?M==="onCompositionEnd"&&aa&&(A=iy()):(Un=p,Yf="value"in Un?Un.value:Un.textContent,aa=!0)),z=sr(d,M),0<z.length&&(M=new sh(M,t,null,n,p),v.push({event:M,listeners:z}),A?M.data=A:(A=ry(n),A!==null&&(M.data=A)))),(A=Nw?Aw(t,n):Mw(t,n))&&(M=sr(d,"onBeforeInput"),0<M.length&&(z=new sh("onBeforeInput","beforeinput",null,n,p),v.push({event:z,listeners:M}),z.data=A)),NE(v,t,d,n,p)}av(v,e)})}function Xi(t,e,n){return{instance:t,listener:e,currentTarget:n}}function sr(t,e){for(var n=e+"Capture",l=[];t!==null;){var a=t,i=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||i===null||(a=Di(t,n),a!=null&&l.unshift(Xi(t,a,i)),a=Di(t,e),a!=null&&l.push(Xi(t,a,i))),t.tag===3)return l;t=t.return}return[]}function ME(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function ug(t,e,n,l,a){for(var i=e._reactName,o=[];n!==null&&n!==l;){var u=n,s=u.alternate,d=u.stateNode;if(u=u.tag,s!==null&&s===l)break;u!==5&&u!==26&&u!==27||d===null||(s=d,a?(d=Di(n,i),d!=null&&o.unshift(Xi(n,d,s))):a||(d=Di(n,i),d!=null&&o.push(Xi(n,d,s)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var CE=/\r\n?/g,OE=/\u0000|\uFFFD/g;function rg(t){return(typeof t=="string"?t:""+t).replace(CE,`
`).replace(OE,"")}function ov(t,e){return e=rg(e),rg(t)===e}function X(t,e,n,l,a,i){switch(n){case"children":if(typeof l=="string")e==="body"||e==="textarea"&&l===""||Ta(t,l);else if(typeof l=="number"||typeof l=="bigint")e!=="body"&&Ta(t,""+l);else return;break;case"className":eu(t,"class",l);break;case"tabIndex":eu(t,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":eu(t,n,l);break;case"style":ly(t,l,i);return;case"data":if(e!=="object"){eu(t,"data",l);break}case"src":case"href":if(l===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(n);break}l=bu(l),t.setAttribute(n,l);break;case"action":case"formAction":if(typeof l=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(e!=="input"&&X(t,e,"name",a.name,a,null),X(t,e,"formEncType",a.formEncType,a,null),X(t,e,"formMethod",a.formMethod,a,null),X(t,e,"formTarget",a.formTarget,a,null)):(X(t,e,"encType",a.encType,a,null),X(t,e,"method",a.method,a,null),X(t,e,"target",a.target,a,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(n);break}l=bu(l),t.setAttribute(n,l);break;case"onClick":l!=null&&(t.onclick=ke);return;case"onScroll":l!=null&&D("scroll",t);return;case"onScrollEnd":l!=null&&D("scrollend",t);return;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(S(61));if(n=l.__html,n!=null){if(a.children!=null)throw Error(S(60));i?.__html!==n&&(t.innerHTML=n)}}break;case"multiple":t.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":t.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){t.removeAttribute("xlink:href");break}n=bu(l),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(n,l):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":l===!0?t.setAttribute(n,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(n,l):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?t.setAttribute(n,l):t.removeAttribute(n);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?t.removeAttribute(n):t.setAttribute(n,l);break;case"popover":D("beforetoggle",t),D("toggle",t),vu(t,"popover",l);break;case"xlinkActuate":en(t,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":en(t,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":en(t,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":en(t,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":en(t,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":en(t,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":en(t,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":en(t,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":en(t,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":vu(t,"is",l);break;case"innerText":case"textContent":return;default:if(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")n=WS.get(n)||n,vu(t,n,l);else return}q=!0}function Ef(t,e,n,l,a,i){switch(n){case"style":ly(t,l,i);return;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(S(61));if(n=l.__html,n!=null){if(a.children!=null)throw Error(S(60));i?.__html!==n&&(t.innerHTML=n)}}break;case"children":if(typeof l=="string")Ta(t,l);else if(typeof l=="number"||typeof l=="bigint")Ta(t,""+l);else return;break;case"onScroll":l!=null&&D("scroll",t);return;case"onScrollEnd":l!=null&&D("scrollend",t);return;case"onClick":l!=null&&(t.onclick=ke);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!Wg.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),i=n.slice(2,a?n.length-7:void 0),e=t[It]||null,e=e!=null?e[n]:null,typeof e=="function"&&t.removeEventListener(i,e,a),typeof l=="function")){typeof e!="function"&&e!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(i,l,a);break t}q=!0,n in t?t[n]=l:l===!0?t.setAttribute(n,""):vu(t,n,l)}return}q=!0}function Ct(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":D("error",t),D("load",t);var l=!1,a=!1,i;for(i in n)if(n.hasOwnProperty(i)){var o=n[i];if(o!=null)switch(i){case"src":l=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(S(137,e));default:X(t,e,i,o,n,null)}}a&&X(t,e,"srcSet",n.srcSet,n,null),l&&X(t,e,"src",n.src,n,null);return;case"input":D("invalid",t);var u=i=o=a=null,s=null,d=null;for(l in n)if(n.hasOwnProperty(l)){var p=n[l];if(p!=null)switch(l){case"name":a=p;break;case"type":o=p;break;case"checked":s=p;break;case"defaultChecked":d=p;break;case"value":i=p;break;case"defaultValue":u=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(S(137,e));break;default:X(t,e,l,p,n,null)}}ty(t,i,u,s,d,o,a,!1);return;case"select":D("invalid",t),l=o=i=null;for(a in n)if(n.hasOwnProperty(a)&&(u=n[a],u!=null))switch(a){case"value":i=u;break;case"defaultValue":o=u;break;case"multiple":l=u;default:X(t,e,a,u,n,null)}e=i,n=o,t.multiple=!!l,e!=null?ma(t,!!l,e,!1):n!=null&&ma(t,!!l,n,!0);return;case"textarea":D("invalid",t),i=a=l=null;for(o in n)if(n.hasOwnProperty(o)&&(u=n[o],u!=null))switch(o){case"value":l=u;break;case"defaultValue":a=u;break;case"children":i=u;break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(S(91));break;default:X(t,e,o,u,n,null)}ny(t,l,a,i);return;case"option":for(s in n)n.hasOwnProperty(s)&&(l=n[s],l!=null)&&(s==="selected"?t.selected=l&&typeof l!="function"&&typeof l!="symbol":X(t,e,s,l,n,null));return;case"dialog":D("beforetoggle",t),D("toggle",t),D("cancel",t),D("close",t);break;case"iframe":case"object":D("load",t);break;case"video":case"audio":for(l=0;l<ji.length;l++)D(ji[l],t);break;case"image":D("error",t),D("load",t);break;case"details":D("toggle",t);break;case"embed":case"source":case"link":D("error",t),D("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(d in n)if(n.hasOwnProperty(d)&&(l=n[d],l!=null))switch(d){case"children":case"dangerouslySetInnerHTML":throw Error(S(137,e));default:X(t,e,d,l,n,null)}return;default:if(Bf(e)){for(p in n)n.hasOwnProperty(p)&&(l=n[p],l!==void 0&&Ef(t,e,p,l,n,void 0));return}}for(u in n)n.hasOwnProperty(u)&&(l=n[u],l!=null&&X(t,e,u,l,n,null))}var RE={};function zE(t,e,n,l){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,i=null,o=null,u=null,s=null,d=null,p=null;for(y in n){var v=n[y];if(n.hasOwnProperty(y)&&v!=null)switch(y){case"checked":break;case"value":break;case"defaultValue":s=v;default:l.hasOwnProperty(y)||X(t,e,y,null,l,v)}}for(var m in l){var y=l[m];if(v=n[m],l.hasOwnProperty(m)&&(y!=null||v!=null))switch(m){case"type":y!==v&&(q=!0),i=y;break;case"name":y!==v&&(q=!0),a=y;break;case"checked":y!==v&&(q=!0),d=y;break;case"defaultChecked":y!==v&&(q=!0),p=y;break;case"value":y!==v&&(q=!0),o=y;break;case"defaultValue":y!==v&&(q=!0),u=y;break;case"children":case"dangerouslySetInnerHTML":if(y!=null)throw Error(S(137,e));break;default:y!==v&&X(t,e,m,y,l,v)}}Uc(t,o,u,s,d,p,i,a);return;case"select":y=o=u=m=null;for(i in n)if(s=n[i],n.hasOwnProperty(i)&&s!=null)switch(i){case"value":break;case"multiple":y=s;default:l.hasOwnProperty(i)||X(t,e,i,null,l,s)}for(a in l)if(i=l[a],s=n[a],l.hasOwnProperty(a)&&(i!=null||s!=null))switch(a){case"value":i!==s&&(q=!0),m=i;break;case"defaultValue":i!==s&&(q=!0),u=i;break;case"multiple":i!==s&&(q=!0),o=i;default:i!==s&&X(t,e,a,i,l,s)}e=u,n=o,l=y,m!=null?ma(t,!!n,m,!1):!!l!=!!n&&(e!=null?ma(t,!!n,e,!0):ma(t,!!n,n?[]:"",!1));return;case"textarea":y=m=null;for(u in n)if(a=n[u],n.hasOwnProperty(u)&&a!=null&&!l.hasOwnProperty(u))switch(u){case"value":break;case"children":break;default:X(t,e,u,null,l,a)}for(o in l)if(a=l[o],i=n[o],l.hasOwnProperty(o)&&(a!=null||i!=null))switch(o){case"value":a!==i&&(q=!0),m=a;break;case"defaultValue":a!==i&&(q=!0),y=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(S(91));break;default:a!==i&&X(t,e,o,a,l,i)}ey(t,m,y);return;case"option":for(var E in n)m=n[E],n.hasOwnProperty(E)&&m!=null&&!l.hasOwnProperty(E)&&(E==="selected"?t.selected=!1:X(t,e,E,null,l,m));for(s in l)m=l[s],y=n[s],l.hasOwnProperty(s)&&m!==y&&(m!=null||y!=null)&&(s==="selected"?(m!==y&&(q=!0),t.selected=m&&typeof m!="function"&&typeof m!="symbol"):X(t,e,s,m,l,y));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var _ in n)m=n[_],n.hasOwnProperty(_)&&m!=null&&!l.hasOwnProperty(_)&&X(t,e,_,null,l,m);for(d in l)if(m=l[d],y=n[d],l.hasOwnProperty(d)&&m!==y&&(m!=null||y!=null))switch(d){case"children":case"dangerouslySetInnerHTML":if(m!=null)throw Error(S(137,e));break;default:X(t,e,d,m,l,y)}return;default:if(Bf(e)){for(var N in n)m=n[N],n.hasOwnProperty(N)&&m!==void 0&&!l.hasOwnProperty(N)&&Ef(t,e,N,void 0,l,m);for(p in l)m=l[p],y=n[p],!l.hasOwnProperty(p)||m===y||m===void 0&&y===void 0||Ef(t,e,p,m,l,y);return}}for(var f in n)m=n[f],n.hasOwnProperty(f)&&m!=null&&!l.hasOwnProperty(f)&&X(t,e,f,null,l,m);for(v in l)m=l[v],y=n[v],!l.hasOwnProperty(v)||m===y||m==null&&y==null||X(t,e,v,m,l,y)}function sg(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function UE(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),l=0;l<n.length;l++){var a=n[l],i=a.transferSize,o=a.initiatorType,u=a.duration;if(i&&u&&sg(o)){for(o=0,u=a.responseEnd,l+=1;l<n.length;l++){var s=n[l],d=s.startTime;if(d>u)break;var p=s.transferSize,v=s.initiatorType;p&&sg(v)&&(s=s.responseEnd,o+=p*(s<u?1:(u-d)/(s-d)))}if(--l,e+=8*(i+o)/(a.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var xf=null,Tf=null;function Gi(t){return t.nodeType===9?t:t.ownerDocument}function cg(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function uv(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function rv(t,e,n,l){return n=Gi(n).createElement(t),n[_t]=l,n[It]=e,Ct(n,t,e),wt(n),n}function _f(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var vc=null;function LE(){var t=window.event;return t&&t.type==="popstate"?t===vc?!1:(vc=t,!0):(vc=null,!1)}var Td=typeof setTimeout=="function"?setTimeout:void 0,DE=typeof clearTimeout=="function"?clearTimeout:void 0,fg=typeof Promise=="function"?Promise:void 0,dg=typeof requestAnimationFrame=="function"?requestAnimationFrame:Td,$E=typeof queueMicrotask=="function"?queueMicrotask:typeof fg<"u"?function(t){return fg.resolve(null).then(t).catch(HE)}:Td;function HE(t){setTimeout(function(){throw t})}function tl(t){return t==="head"}function mg(t,e){var n=e,l=0;do{var a=n.nextSibling;if(t.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"||n==="/&"){if(l===0){t.removeChild(a),La(e);return}l--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")l++;else if(n==="html")Sc(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,Sc(n);for(var i=n.firstChild;i;){var o=i.nextSibling,u=i.nodeName;i[to]||u==="SCRIPT"||u==="STYLE"||u==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=o}}else n==="body"&&Sc(t.ownerDocument.body);n=a}while(n);La(e)}function pg(t,e){var n=t;t=0;do{var l=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=l}while(n)}function sv(t,e,n){if(e=CSS.escape(e)!==e?"r-"+btoa(e).replace(/=/g,""):e,t.style.viewTransitionName=e,n!=null&&(t.style.viewTransitionClass=n),n=getComputedStyle(t),n.display==="inline"){if(e=t.getClientRects(),e.length===1)var l=1;else for(var a=l=0;a<e.length;a++){var i=e[a];0<i.width&&0<i.height&&l++}l===1&&(t=t.style,t.display=e.length===1?"inline-block":"block",t.marginTop="-"+n.paddingTop,t.marginBottom="-"+n.paddingBottom)}}function cv(t,e){t=t.style,e=e.style;var n=e!=null?e.hasOwnProperty("viewTransitionName")?e.viewTransitionName:e.hasOwnProperty("view-transition-name")?e["view-transition-name"]:null:null;t.viewTransitionName=n==null||typeof n=="boolean"?"":(""+n).trim(),n=e!=null?e.hasOwnProperty("viewTransitionClass")?e.viewTransitionClass:e.hasOwnProperty("view-transition-class")?e["view-transition-class"]:null:null,t.viewTransitionClass=n==null||typeof n=="boolean"?"":(""+n).trim(),t.display==="inline-block"&&(e==null?t.display=t.margin="":(n=e.display,t.display=n==null||typeof n=="boolean"?"":n,n=e.margin,n!=null?t.margin=n:(n=e.hasOwnProperty("marginTop")?e.marginTop:e["margin-top"],t.marginTop=n==null||typeof n=="boolean"?"":n,e=e.hasOwnProperty("marginBottom")?e.marginBottom:e["margin-bottom"],t.marginBottom=e==null||typeof e=="boolean"?"":e)))}function fv(t,e,n){return n=n.ownerDocument.defaultView,{rect:t,abs:e.position==="absolute"||e.position==="fixed",clip:e.clipPath!=="none"||e.overflow!=="visible"||e.filter!=="none"||e.mask!=="none"||e.mask!=="none"||e.borderRadius!=="0px",view:0<=t.bottom&&0<=t.right&&t.top<=n.innerHeight&&t.left<=n.innerWidth}}function Nf(t){var e=t.getBoundingClientRect(),n=getComputedStyle(t);return fv(e,n,t)}function BE(t){var e=t.getBoundingClientRect();e=new DOMRect(e.x+2e4,e.y+2e4,e.width,e.height);var n=getComputedStyle(t);return fv(e,n,t)}function qE(t){return t.documentElement.clientHeight}function YE(t){this.addEventListener("load",t),this.addEventListener("error",t)}function VE(t,e,n,l,a,i,o,u,s){var d=e.nodeType===9?e:e.ownerDocument;try{var p=d.startViewTransition({update:function(){var m=d.defaultView,y=m.navigation&&m.navigation.transition,E=d.fonts.status;l();var _=[];if(E==="loaded"&&(qE(d),d.fonts.status==="loading"&&_.push(d.fonts.ready)),E=_.length,t!==null)for(var N=t.suspenseyImages,f=0,c=0;c<N.length;c++){var g=N[c];if(!g.complete){var b=g.getBoundingClientRect();if(0<b.bottom&&0<b.right&&b.top<m.innerHeight&&b.left<m.innerWidth){if(f+=xv(g),f>Lu){_.length=E;break}g=new Promise(YE.bind(g)),_.push(g)}}}if(0<_.length)return m=Promise.race([Promise.all(_),new Promise(function(x){return setTimeout(x,500)})]).then(a,a),(y?Promise.allSettled([y.finished,m]):m).then(i,i);if(a(),y)return y.finished.then(i,i);i()},types:n});d.__reactViewTransition=p;var v=[];return p.ready.then(function(){for(var m=d.documentElement.getAnimations({subtree:!0}),y=0;y<m.length;y++){var E=m[y],_=E.effect,N=_.pseudoElement;if(N!=null&&N.startsWith("::view-transition")){v.push(E),E=_.getKeyframes();for(var f=N=void 0,c=!0,g=0;g<E.length;g++){var b=E[g],x=b.width;if(N===void 0)N=x;else if(N!==x){c=!1;break}if(x=b.height,f===void 0)f=x;else if(f!==x){c=!1;break}delete b.width,delete b.height,b.transform==="none"&&delete b.transform}c&&N!==void 0&&f!==void 0&&(_.setKeyframes(E),c=getComputedStyle(_.target,_.pseudoElement),c.width!==N||c.height!==f)&&(c=E[0],c.width=N,c.height=f,c=E[E.length-1],c.width=N,c.height=f,_.setKeyframes(E))}}o()},function(m){d.__reactViewTransition===p&&(d.__reactViewTransition=null);try{typeof m=="object"&&m!==null&&m.name==="InvalidStateError"&&(m.message==="View transition was skipped because document visibility state is hidden."||m.message==="Skipping view transition because document visibility state has become hidden."||m.message==="Skipping view transition because viewport size changed."||m.message==="Transition was aborted because of invalid state")&&(m=null),m!==null&&s(m)}finally{l(),a(),o()}}),p.finished.finally(function(){for(var m=0;m<v.length;m++)v[m].cancel();d.__reactViewTransition===p&&(d.__reactViewTransition=null),u()}),p}catch{return l(),a(),o(),null}}function pl(t,e){this._scope=document.documentElement,this._selector="::view-transition-"+t+"("+e+")"}pl.prototype.animate=function(t,e){return e=typeof e=="number"?{duration:e}:Z({},e),e.pseudoElement=this._selector,this._scope.animate(t,e)};pl.prototype.getAnimations=function(){for(var t=this._scope,e=this._selector,n=t.getAnimations({subtree:!0}),l=[],a=0;a<n.length;a++){var i=n[a].effect;i!==null&&i.target===t&&i.pseudoElement===e&&l.push(n[a])}return l};pl.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function dv(t){return{name:t,group:new pl("group",t),imagePair:new pl("image-pair",t),old:new pl("old",t),new:new pl("new",t)}}function se(t){this._fragmentFiber=t,this._observers=this._eventListeners=null}se.prototype.addEventListener=function(t,e,n){var l=null,a=null;if(!(n!=null&&typeof n!="boolean"&&(l=n.signal||null,l!==null&&l.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var i=this._eventListeners;if(mv(i,t,e,n)===-1){var o=this,u=e;n!=null&&typeof n!="boolean"&&n.once===!0&&(u=function(s){o.removeEventListener(t,e,n),typeof e=="function"?e.call(this,s):e.handleEvent(s)}),l!==null&&(a=o.removeEventListener.bind(o,t,e,n),l.addEventListener("abort",a,{once:!0}),a=l.removeEventListener.bind(l,"abort",a)),l=Oa(n),i.push({type:t,listener:e,optionsOrUseCapture:n,attachedListener:u,cleanup:a}),Jt(this._fragmentFiber.child,!1,kE,t,u,l)}this._eventListeners=i}};function kE(t,e,n,l){return yt(t).addEventListener(e,n,l),!1}se.prototype.removeEventListener=function(t,e,n){var l=this._eventListeners;if(l!==null&&(e=mv(l,t,e,n),e!==-1)){var a=l[e];n=a.attachedListener;var i=a.cleanup;a=Oa(a.optionsOrUseCapture),Jt(this._fragmentFiber.child,!1,jE,t,n,a),l.splice(e,1),i!==null&&i()}};function jE(t,e,n,l){return yt(t).removeEventListener(e,n,l),!1}function Oa(t){return t!=null&&typeof t!="boolean"&&(t.once===!0||t.signal instanceof AbortSignal)?{capture:t.capture,passive:t.passive}:t}function hg(t){return t==null?"c=0":typeof t=="boolean"?"c="+(t?"1":"0"):"c="+(t.capture?"1":"0")}function mv(t,e,n,l){if(t.length===0)return-1;l=hg(l);for(var a=0;a<t.length;a++){var i=t[a];if(i.type===e&&i.listener===n&&hg(i.optionsOrUseCapture)===l)return a}return-1}se.prototype.dispatchEvent=function(t){var e=Ml(this._fragmentFiber);if(e===null)return!0;e=yt(e);var n=this._eventListeners;if(n!==null&&0<n.length||!t.bubbles){var l=e.nodeType===9?e.createComment(""):document.createTextNode("");if(n)for(var a=0;a<n.length;a++){var i=n[a];l.addEventListener(i.type,i.attachedListener,Oa(i.optionsOrUseCapture))}if(e.appendChild(l),t=l.dispatchEvent(t),n)for(a=0;a<n.length;a++)i=n[a],l.removeEventListener(i.type,i.attachedListener,Oa(i.optionsOrUseCapture));return e.removeChild(l),t}return e.dispatchEvent(t)};se.prototype.focus=function(t){Jt(this._fragmentFiber.child,!0,pv,t,void 0,void 0)};function pv(t,e){return t.tag===6?!1:(t=yt(t),ex(t,e))}se.prototype.focusLast=function(t){var e=[];Jt(this._fragmentFiber.child,!0,_d,e,void 0,void 0);for(var n=e.length-1;0<=n&&!pv(e[n],t);n--);};function _d(t,e){return e.push(t),!1}se.prototype.blur=function(){var t=Ml(this._fragmentFiber);t!==null&&(t=yt(t),t=Gi(t).activeElement,t!==null&&Jt(this._fragmentFiber.child,!1,XE,t,void 0,void 0))};function XE(t,e){return t.tag===6?!1:(t=yt(t),t===e||t.contains(e)?(e.blur(),!0):!1)}se.prototype.observeUsing=function(t){this._observers===null&&(this._observers=new Set),this._observers.add(t),Jt(this._fragmentFiber.child,!1,GE,t,void 0,void 0)};function GE(t,e){return t.tag===6||(t=yt(t),e.observe(t)),!1}se.prototype.unobserveUsing=function(t){var e=this._observers;if(e!==null&&e.has(t)){e.delete(t),Jt(this._fragmentFiber.child,!1,QE,t,void 0,void 0);for(var n=e=0;n<Me.length;n++){var l=Me[n];l.fragmentInstance===this&&l.observer===t?t.unobserve(l.instance):Me[e++]=l}Me.length=e}};function QE(t,e){return t.tag===6||(t=yt(t),e.unobserve(t)),!1}var Me=[],bc=!1;function KE(t,e,n){Me.push({fragmentInstance:t,observer:e,instance:n}),bc||(bc=!0,nx(function(){bc=!1;var l=Me;Me=[];for(var a=0;a<l.length;a++){var i=l[a];i.observer.unobserve(i.instance)}}))}se.prototype.getClientRects=function(){var t=[];return Jt(this._fragmentFiber.child,!1,ZE,t,void 0,void 0),t};function ZE(t,e){if(t.tag===6){t=t.stateNode;var n=t.ownerDocument.createRange();n.selectNodeContents(t),e.push.apply(e,n.getClientRects())}else t=yt(t),e.push.apply(e,t.getClientRects());return!1}se.prototype.getRootNode=function(t){var e=Ml(this._fragmentFiber);return e===null?this:yt(e).getRootNode(t)};se.prototype.compareDocumentPosition=function(t){var e=Ml(this._fragmentFiber);if(e===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];Jt(this._fragmentFiber.child,!1,_d,n,void 0,void 0);var l=yt(e);if(n.length===0){if(n=l,Zp(this._fragmentFiber)){t:{for(e=this._fragmentFiber.return;e!==null;){if(e.tag===4){e=e.stateNode.containerInfo;break t}if(e.tag===3||e.tag===5||e.tag===27)break;e=e.return}e=null}e!=null&&(n=e)}e=this._fragmentFiber;var a=l=n.compareDocumentPosition(t);return n===t?a=Node.DOCUMENT_POSITION_CONTAINS:l&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=$g(e)[1],n===null?a=Node.DOCUMENT_POSITION_PRECEDING:(t=yt(n).compareDocumentPosition(t),a=t===0||t&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),a|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}e=yt(n[0]),a=yt(n[n.length-1]);var i=Zp(this._fragmentFiber)?e.parentElement:l;if(i==null)return Node.DOCUMENT_POSITION_DISCONNECTED;l=i.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_CONTAINED_BY,i=i.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=e.compareDocumentPosition(t),u=a.compareDocumentPosition(t),s=o&Node.DOCUMENT_POSITION_CONTAINED_BY||u&Node.DOCUMENT_POSITION_CONTAINED_BY;return u=l&&i&&o&Node.DOCUMENT_POSITION_FOLLOWING&&u&Node.DOCUMENT_POSITION_PRECEDING,e=l&&e===t||i&&a===t||s||u?Node.DOCUMENT_POSITION_CONTAINED_BY:!l&&e===t||!i&&a===t?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,e&Node.DOCUMENT_POSITION_DISCONNECTED||e&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||JE(e,this._fragmentFiber,n[0],n[n.length-1],t)?e:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function JE(t,e,n,l,a){var i=ml(a);if(t&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!i)t:{for(;i!==null;){if(i.tag===7&&(i===e||i.alternate===e)){n=!0;break t}i=i.return}n=!1}return n}if(t&Node.DOCUMENT_POSITION_CONTAINS){if(i===null)return i=a.ownerDocument,a===i||a===i.documentElement||a===i.body;t:{for(i=e,e=Ml(e);i!==null;){if(!(i.tag!==5&&i.tag!==3&&i.tag!==27||i!==e&&i.alternate!==e)){i=!0;break t}i=i.return}i=!1}return i}return t&Node.DOCUMENT_POSITION_PRECEDING?((e=!!i)&&!(e=i===n)&&(e=Ec(n,i,Jp),e===null?e=!1:(Jt(e,!0,_S,i,n),i=ta,ta=null,e=i!==null)),e):t&Node.DOCUMENT_POSITION_FOLLOWING?((e=!!i)&&!(e=i===l)&&(e=Ec(l,i,Jp),e===null?e=!1:(Jt(e,!0,NS,i,l),i=ta,wc=ta=null,e=i!==null)),e):!1}function gg(t,e){var n=t.ownerDocument.createRange();n.selectNodeContents(t),t=n.getBoundingClientRect(),window.scrollTo(window.scrollX+t.left,e?window.scrollY+t.top:window.scrollY+t.bottom-window.innerHeight)}se.prototype.scrollIntoView=function(t){if(typeof t=="object")throw Error(S(566));var e=[];Jt(this._fragmentFiber.child,!1,_d,e,void 0,void 0);var n=t!==!1;if(e.length===0){var l=$g(this._fragmentFiber);if(l=n?l[1]||l[0]||Ml(this._fragmentFiber):l[0]||l[1],l===null)return;if(l.tag===6){t=yt(l),gg(t,n);return}if(l=yt(l),l.nodeType!==9){if(l.nodeType===11){n="host"in l?l.host:null,n!==null&&n.scrollIntoView(t);return}l.scrollIntoView(t)}}for(l=n?e.length-1:0;l!==(n?-1:e.length);){var a=e[l];a.tag===6?(a=yt(a),gg(a,n)):yt(a).scrollIntoView(t),l+=n?-1:1}};function IE(t,e){return t=yt(t),hv(t,e),!1}function hv(t,e){t.reactFragments==null&&(t.reactFragments=new Set),t.reactFragments.add(e)}function gv(t,e){var n=e._eventListeners;if(n!==null)for(var l=0;l<n.length;l++){var a=n[l];t.addEventListener(a.type,a.attachedListener,Oa(a.optionsOrUseCapture))}t.nodeType!==3&&(n=e._observers,n!==null&&n.forEach(function(i){for(var o=0,u=0;u<Me.length;u++){var s=Me[u];(s.fragmentInstance!==e||s.observer!==i||s.instance!==t)&&(Me[o++]=s)}Me.length=o,i.observe(t)}),hv(t,e))}function WE(t,e){var n=e._eventListeners;if(n!==null)for(var l=0;l<n.length;l++){var a=n[l];t.removeEventListener(a.type,a.attachedListener,Oa(a.optionsOrUseCapture))}t.nodeType!==3&&(n=e._observers,n!==null&&n.forEach(function(i){typeof i.rootMargin=="string"?KE(e,i,t):i.unobserve(t)}),t.reactFragments!=null&&t.reactFragments.delete(e))}function Af(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Af(n),mr(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function PE(t,e,n,l){for(;t.nodeType===1;){var a=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!l&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(l){if(!t[to])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(i=t.getAttribute("rel"),i==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(i!==a.rel||t.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||t.getAttribute("title")!==(a.title==null?null:a.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(i=t.getAttribute("src"),(i!==(a.src==null?null:a.src)||t.getAttribute("type")!==(a.type==null?null:a.type)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&i&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var i=a.name==null?null:""+a.name;if(a.type==="hidden"&&t.getAttribute("name")===i)return t}else return t;if(t=Ee(t.nextSibling),t===null)break}return null}function FE(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Ee(t.nextSibling),t===null))return null;return t}function yv(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Ee(t.nextSibling),t===null))return null;return t}function Mf(t){return t.data==="$?"||t.data==="$~"}function Nd(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function tx(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var l=function(){e(),n.removeEventListener("DOMContentLoaded",l)};n.addEventListener("DOMContentLoaded",l),t._reactRetry=l}}function Ee(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var Cf=null;function yg(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Ee(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function vg(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function ex(t,e){function n(){l=!0}if(t.ownerDocument.activeElement===t)return!0;var l=!1;try{t.ownerDocument.addEventListener("focus",n,!0),(t.focus||HTMLElement.prototype.focus).call(t,e)}finally{t.ownerDocument.removeEventListener("focus",n,!0)}return l}function nx(t){dg(function(){dg(function(e){return t(e)})})}function vv(t,e,n){switch(e=Gi(n),t){case"html":if(t=e.documentElement,!t)throw Error(S(452));return t;case"head":if(t=e.head,!t)throw Error(S(453));return t;case"body":if(t=e.body,!t)throw Error(S(454));return t;default:throw Error(S(451))}}function bv(t,e,n){for(var l in n){var a=n[l];n.hasOwnProperty(l)&&a!=null&&X(t,e,l,null,RE,a)}n.dangerouslySetInnerHTML!=null&&(t.textContent=""),t.onclick===ke&&(t.onclick=null),mr(t)}function Sc(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);mr(t)}var xe=new Map,bg=new Set;function Qi(t){if(typeof t.getRootNode=="function"){var e=t.getRootNode();if(e.nodeType===9||e.nodeType===11)return e}return t.nodeType===9?t:t.ownerDocument}var gn=V.d;V.d={f:lx,r:ax,D:ix,C:ox,L:ux,m:rx,X:cx,S:sx,M:fx};function lx(){var t=gn.f(),e=Ar();return t||e}function ax(t){var e=$a(t);e!==null&&e.tag===5&&e.type==="form"?l0(e):gn.r(t)}var Ya=typeof document>"u"?null:document;function Sv(t,e,n){var l=Ya;if(l&&typeof e=="string"&&e){var a=be(e);a='link[rel="'+t+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),bg.has(a)||(bg.add(a),t={rel:t,crossOrigin:n,href:e},l.querySelector(a)===null&&(e=l.createElement("link"),Ct(e,"link",t),wt(e),l.head.appendChild(e)))}}function ix(t){gn.D(t),Sv("dns-prefetch",t,null)}function ox(t,e){gn.C(t,e),Sv("preconnect",t,e)}function ux(t,e,n){gn.L(t,e,n);var l=Ya;if(l&&t&&e){var a='link[rel="preload"][as="'+be(e)+'"]';e==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+be(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+be(n.imageSizes)+'"]')):a+='[href="'+be(t)+'"]';var i=a;switch(e){case"style":i=Ra(t);break;case"script":i=Va(t)}if(!(xe.has(i)||(t=Z({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),xe.set(i,t),l.querySelector(a)!==null||e==="style"&&l.querySelector(oo(i))||e==="script"&&l.querySelector(uo(i))))){var o=l.createElement("link");Ct(o,"link",t),e==="style"&&(o[Vu]=!0,o.onload=o.onerror=function(){Jg(o)}),wt(o),l.head.appendChild(o)}}}function rx(t,e){gn.m(t,e);var n=Ya;if(n&&t){var l=e&&typeof e.as=="string"?e.as:"script",a='link[rel="modulepreload"][as="'+be(l)+'"][href="'+be(t)+'"]',i=a;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Va(t)}if(!xe.has(i)&&(t=Z({rel:"modulepreload",href:t},e),xe.set(i,t),n.querySelector(a)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(uo(i)))return}l=n.createElement("link"),Ct(l,"link",t),wt(l),n.head.appendChild(l)}}}function sx(t,e,n){gn.S(t,e,n);var l=Ya;if(l&&t){var a=da(l).hoistableStyles,i=Ra(t);e=e||"default";var o=a.get(i);if(!o){var u={loading:0,preload:null};if(o=l.querySelector(oo(i)))u.loading=5;else{t=Z({rel:"stylesheet",href:t,"data-precedence":e},n),(n=xe.get(i))&&Ad(t,n);var s=o=l.createElement("link");wt(s),Ct(s,"link",t),s._p=new Promise(function(d,p){s.onload=d,s.onerror=p}),s.addEventListener("load",function(){u.loading|=1}),s.addEventListener("error",function(){u.loading|=2}),u.loading|=4,zu(o,e,l)}o={type:"stylesheet",instance:o,count:1,state:u},a.set(i,o)}}}function cx(t,e){gn.X(t,e);var n=Ya;if(n&&t){var l=da(n).hoistableScripts,a=Va(t),i=l.get(a);i||(i=n.querySelector(uo(a)),i||(t=Z({src:t,async:!0},e),(e=xe.get(a))&&Md(t,e),i=n.createElement("script"),wt(i),Ct(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(a,i))}}function fx(t,e){gn.M(t,e);var n=Ya;if(n&&t){var l=da(n).hoistableScripts,a=Va(t),i=l.get(a);i||(i=n.querySelector(uo(a)),i||(t=Z({src:t,async:!0,type:"module"},e),(e=xe.get(a))&&Md(t,e),i=n.createElement("script"),wt(i),Ct(i,"link",t),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(a,i))}}function Sg(t,e,n,l){var a=(a=Bn.current)?Qi(a):null;if(!a)throw Error(S(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(n=Ra(n.href),e=da(a).hoistableStyles,l=e.get(n),l||(l={type:"style",instance:null,count:0,state:null},e.set(n,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=Ra(n.href);var i=da(a).hoistableStyles,o=i.get(t);if(o||(a=a.ownerDocument||a,o={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(t,o),(i=a.querySelector(oo(t)))?i._p||(o.instance=i,o.state.loading=5):(i=xe.get(t),i||(i={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},xe.set(t,i)),dx(a,t,i,o.state))),e&&l===null)throw Error(S(528,""));return o}if(e&&l!==null)throw Error(S(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(n=Va(n),e=da(a).hoistableScripts,l=e.get(n),l||(l={type:"script",instance:null,count:0,state:null},e.set(n,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(S(444,t))}}function Ra(t){return'href="'+be(t)+'"'}function oo(t){return'link[rel="stylesheet"]['+t+"]"}function wv(t){return Z({},t,{"data-precedence":t.precedence,precedence:null})}function dx(t,e,n,l){if(e=t.querySelector('link[rel="preload"][as="style"]['+e+"]")){if(e[Vu]!==!0){l.loading=1;return}}else e=t.createElement("link"),e[Vu]=!0,e.onload=e.onerror=Jg.bind(null,e),Ct(e,"link",n),wt(e),t.head.appendChild(e);l.preload=e,e.addEventListener("load",function(){return l.loading|=1}),e.addEventListener("error",function(){return l.loading|=2})}function Va(t){return'[src="'+be(t)+'"]'}function uo(t){return"script[async]"+t}function wg(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var l=t.querySelector('style[data-href~="'+be(n.href)+'"]');if(l)return e.instance=l,wt(l),l;var a=Z({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return l=(t.ownerDocument||t).createElement("style"),wt(l),Ct(l,"style",a),zu(l,n.precedence,t),e.instance=l;case"stylesheet":a=Ra(n.href);var i=t.querySelector(oo(a));if(i)return e.state.loading|=4,e.instance=i,wt(i),i;l=wv(n),(a=xe.get(a))&&Ad(l,a),i=(t.ownerDocument||t).createElement("link"),wt(i);var o=i;return o._p=new Promise(function(u,s){o.onload=u,o.onerror=s}),Ct(i,"link",l),e.state.loading|=4,zu(i,n.precedence,t),e.instance=i;case"script":return i=Va(n.src),(a=t.querySelector(uo(i)))?(e.instance=a,wt(a),a):(l=n,(a=xe.get(i))&&(l=Z({},n),Md(l,a)),t=t.ownerDocument||t,a=t.createElement("script"),wt(a),Ct(a,"link",l),t.head.appendChild(a),e.instance=a);case"void":return null;default:throw Error(S(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(l=e.instance,e.state.loading|=4,zu(l,n.precedence,t));return e.instance}function zu(t,e,n){for(var l=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=l.length?l[l.length-1]:null,i=a,o=0;o<l.length;o++){var u=l[o];if(u.dataset.precedence===e)i=u;else if(i!==a)break}i?i.parentNode.insertBefore(t,i.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function Ad(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function Md(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var Uu=null;function Eg(t,e,n){if(Uu===null){var l=new Map,a=Uu=new Map;a.set(n,l)}else a=Uu,l=a.get(n),l||(l=new Map,a.set(n,l));if(l.has(t))return l;for(l.set(t,null),n=n.getElementsByTagName(t),a=0;a<n.length;a++){var i=n[a];if(!(i[to]||i[_t]||t==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var o=i.getAttribute(e)||"";o=t+o;var u=l.get(o);u?u.push(i):l.set(o,[i])}}return l}function Of(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function mx(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;return e.rel==="stylesheet"?(t=e.disabled,typeof e.precedence=="string"&&t==null):!0;case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function xg(t,e){return t==="img"&&e.src!=null&&e.src!==""&&e.onLoad==null&&e.loading!=="lazy"}function Ev(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function xv(t){return(t.width||100)*(t.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function Tg(t,e){typeof e.decode=="function"&&(t.imgCount++,e.complete||(t.imgBytes+=xv(e),t.suspenseyImages.push(e)),t=gx.bind(t),e.decode().then(t,t))}function px(t,e,n,l){if(n.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var a=Ra(l.href),i=e.querySelector(oo(a));if(i){e=i._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Ki.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=i,wt(i);return}i=e.ownerDocument||e,l=wv(l),(a=xe.get(a))&&Ad(l,a),i=i.createElement("link"),wt(i);var o=i;o._p=new Promise(function(u,s){o.onload=u,o.onerror=s}),Ct(i,"link",l),n.instance=i}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&(n.state.loading&3)===0&&(t.count++,n=Ki.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var Lu=0;function hx(t,e){return t.stylesheets&&t.count===0&&Du(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var l=setTimeout(function(){if(t.stylesheets&&Du(t,t.stylesheets),t.unsuspend){var i=t.unsuspend;t.unsuspend=null,i()}},6e4+e);0<t.imgBytes&&Lu===0&&(Lu=62500*UE());var a=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Du(t,t.stylesheets),t.unsuspend)){var i=t.unsuspend;t.unsuspend=null,i()}},(t.imgBytes>Lu?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(l),clearTimeout(a)}}:null}function Tv(t){if(t.count===0&&(t.imgCount===0||!t.waitingForImages)){if(t.stylesheets)Du(t,t.stylesheets);else if(t.unsuspend){var e=t.unsuspend;t.unsuspend=null,e()}}}function Ki(){this.count--,Tv(this)}function gx(){this.imgCount--,Tv(this)}var cr=null;function Du(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,cr=new Map,e.forEach(yx,t),cr=null,Ki.call(t))}function yx(t,e){if(!(e.state.loading&4)){var n=cr.get(t);if(n)var l=n.get(null);else{n=new Map,cr.set(t,n);for(var a=t.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<a.length;i++){var o=a[i];(o.nodeName==="LINK"||o.getAttribute("media")!=="not all")&&(n.set(o.dataset.precedence,o),l=o)}l&&n.set(null,l)}a=e.instance,o=a.getAttribute("data-precedence"),i=n.get(o)||l,i===l&&n.set(null,a),n.set(o,a),this.count++,l=Ki.bind(this),a.addEventListener("load",l),a.addEventListener("error",l),i?i.parentNode.insertBefore(a,i.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(a,t.firstChild)),e.state.loading|=4}}var za={$$typeof:Ve,Provider:null,Consumer:null,_currentValue:hl,_currentValue2:hl,_threadCount:0};function vx(t,e,n,l,a,i,o,u,s){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Zs(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Zs(0),this.hiddenUpdates=Zs(null),this.identifierPrefix=l,this.onUncaughtError=a,this.onCaughtError=i,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=s,this.transitionTypes=null,this.incompleteTransitions=new Map}function _v(t,e,n,l,a,i,o,u,s,d,p,v){return t=new vx(t,e,n,o,s,d,p,v,u),e=1,i===!0&&(e|=24),i=Kt(3,null,null,e),t.current=i,i.stateNode=t,e=Zf(),e.refCount++,t.pooledCache=e,e.refCount++,i.memoizedState={element:l,isDehydrated:n,cache:e},Wf(i),t}function Nv(t){return t?(t=ra,t):ra}function Av(t,e,n,l,a,i){a=Nv(a),l.context===null?l.context=a:l.pendingContext=a,l=Yn(e),l.payload={element:n},i=i===void 0?null:i,i!==null&&(l.callback=i),n=Vn(t,l,e),n!==null&&(Zt(n,t,e),_i(n,t,e))}function _g(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Cd(t,e){_g(t,e),(t=t.alternate)&&_g(t,e)}function Mv(t){if(t.tag===13||t.tag===31){var e=Rl(t,67108864);e!==null&&Zt(e,t,67108864),Cd(t,67108864)}}function Ng(t){if(t.tag===13||t.tag===31){var e=ue();e=$f(e);var n=Rl(t,e);n!==null&&Zt(n,t,e),Cd(t,e)}}var Ua=!0;function bx(t,e,n,l){var a=O.T;O.T=null;var i=V.p;try{V.p=2,Od(t,e,n,l)}finally{V.p=i,O.T=a}}function Sx(t,e,n,l){var a=O.T;O.T=null;var i=V.p;try{V.p=8,Od(t,e,n,l)}finally{V.p=i,O.T=a}}function Od(t,e,n,l){if(Ua){var a=Rf(l);if(a===null)yc(t,e,l,fr,n),Ag(t,l);else if(Ex(a,t,e,n,l))l.stopPropagation();else if(Ag(t,l),e&4&&-1<wx.indexOf(t)){for(;a!==null;){var i=$a(a);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var o=cl(i.pendingLanes);if(o!==0){var u=i;for(u.pendingLanes|=2,u.entangledLanes|=2;o;){var s=1<<31-oe(o);u.entanglements[1]|=s,o&=~s}Je(i),(Y&6)===0&&(ir=ae()+500,io(0,!1))}}break;case 31:case 13:u=Rl(i,2),u!==null&&Zt(u,i,2),Ar(),Cd(i,2)}if(i=Rf(l),i===null&&yc(t,e,l,fr,n),i===a)break;a=i}a!==null&&l.stopPropagation()}else yc(t,e,l,null,n)}}function Rf(t){return t=qf(t),Rd(t)}var fr=null;function Rd(t){if(fr=null,t=ml(t),t!==null){var e=Ii(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=Ug(e),t!==null)return t;t=null}else if(n===31){if(t=Lg(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return fr=t,null}function Cv(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(DS()){case Yg:return 2;case Vg:return 8;case Yu:case $S:return 32;case kg:return 268435456;default:return 32}default:return 32}}var zf=!1,Gn=null,Qn=null,Kn=null,Zi=new Map,Ji=new Map,Rn=[],wx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Ag(t,e){switch(t){case"focusin":case"focusout":Gn=null;break;case"dragenter":case"dragleave":Qn=null;break;case"mouseover":case"mouseout":Kn=null;break;case"pointerover":case"pointerout":Zi.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ji.delete(e.pointerId)}}function pi(t,e,n,l,a,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:l,nativeEvent:i,targetContainers:[a]},e!==null&&(e=$a(e),e!==null&&Mv(e)),t):(t.eventSystemFlags|=l,e=t.targetContainers,a!==null&&e.indexOf(a)===-1&&e.push(a),t)}function Ex(t,e,n,l,a){switch(e){case"focusin":return Gn=pi(Gn,t,e,n,l,a),!0;case"dragenter":return Qn=pi(Qn,t,e,n,l,a),!0;case"mouseover":return Kn=pi(Kn,t,e,n,l,a),!0;case"pointerover":var i=a.pointerId;return Zi.set(i,pi(Zi.get(i)||null,t,e,n,l,a)),!0;case"gotpointercapture":return i=a.pointerId,Ji.set(i,pi(Ji.get(i)||null,t,e,n,l,a)),!0}return!1}function Ov(t){var e=ml(t.target);if(e!==null){var n=Ii(e);if(n!==null){if(e=n.tag,e===13){if(e=Ug(n),e!==null){t.blockedOn=e,Fp(t.priority,function(){Ng(n)});return}}else if(e===31){if(e=Lg(n),e!==null){t.blockedOn=e,Fp(t.priority,function(){Ng(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function $u(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Rf(t.nativeEvent);if(n===null){n=t.nativeEvent;var l=new n.constructor(n.type,n);Lc=l,n.target.dispatchEvent(l),Lc=null}else return e=$a(n),e!==null&&Mv(e),t.blockedOn=n,!1;e.shift()}return!0}function Mg(t,e,n){$u(t)&&n.delete(e)}function xx(){zf=!1,Gn!==null&&$u(Gn)&&(Gn=null),Qn!==null&&$u(Qn)&&(Qn=null),Kn!==null&&$u(Kn)&&(Kn=null),Zi.forEach(Mg),Ji.forEach(Mg)}function gu(t,e){t.blockedOn===e&&(t.blockedOn=null,zf||(zf=!0,vt.unstable_scheduleCallback(vt.unstable_NormalPriority,xx)))}var yu=null;function Cg(t){yu!==t&&(yu=t,vt.unstable_scheduleCallback(vt.unstable_NormalPriority,function(){yu===t&&(yu=null);for(var e=0;e<t.length;e+=3){var n=t[e],l=t[e+1],a=t[e+2];if(typeof l!="function"){if(Rd(l||n)===null)continue;break}var i=$a(n);i!==null&&(t.splice(e,3),e-=3,Ic(i,{pending:!0,data:a,method:n.method,action:l},l,a))}}))}function La(t){function e(s){return gu(s,t)}Gn!==null&&gu(Gn,t),Qn!==null&&gu(Qn,t),Kn!==null&&gu(Kn,t),Zi.forEach(e),Ji.forEach(e);for(var n=0;n<Rn.length;n++){var l=Rn[n];l.blockedOn===t&&(l.blockedOn=null)}for(;0<Rn.length&&(n=Rn[0],n.blockedOn===null);)Ov(n),n.blockedOn===null&&Rn.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(l=0;l<n.length;l+=3){var a=n[l],i=n[l+1],o=a[It]||null;if(typeof i=="function")o||Cg(n);else if(o){var u=null;if(i&&i.hasAttribute("formAction")){if(a=i,o=i[It]||null)u=o.formAction;else if(Rd(a)!==null)continue}else u=o.action;typeof u=="function"?n[l+1]=u:(n.splice(l,3),l-=3),Cg(n)}}}function Rv(){function t(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(o){return a=o})},focusReset:"manual",scroll:"manual"})}function e(){a!==null&&(a(),a=null),l||setTimeout(n,20)}function n(){if(!l&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,a=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){l=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),a!==null&&(a(),a=null)}}}function zd(t){this._internalRoot=t}Or.prototype.render=zd.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(S(409));var n=e.current,l=ue();Av(n,l,t,e,null,null)};Or.prototype.unmount=zd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Av(t.current,2,null,t,null,null),Ar(),e[Da]=null}};function Or(t){this._internalRoot=t}Or.prototype.unstable_scheduleHydration=function(t){if(t){var e=Zg();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Rn.length&&e!==0&&e<Rn[n].priority;n++);Rn.splice(n,0,t),n===0&&Ov(t)}};var Og=Rg.version;if(Og!=="19.3.1")throw Error(S(527,Og,"19.3.1"));V.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(S(188)):(t=Object.keys(t).join(","),Error(S(268,t)));return t=TS(e),t=t!==null?Dg(t):null,t=t===null?null:t.stateNode,t};var Tx={bundleType:0,version:"19.3.1",rendererPackageName:"react-dom",currentDispatcherRef:O,reconcilerVersion:"19.3.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(hi=__REACT_DEVTOOLS_GLOBAL_HOOK__,!hi.isDisabled&&hi.supportsFiber))try{Wi=hi.inject(Tx),ie=hi}catch{}var hi;Rr.createRoot=function(t,e){if(!zg(t))throw Error(S(299));var n=!1,l="",a=f0,i=d0,o=m0;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(l=e.identifierPrefix),e.onUncaughtError!==void 0&&(a=e.onUncaughtError),e.onCaughtError!==void 0&&(i=e.onCaughtError),e.onRecoverableError!==void 0&&(o=e.onRecoverableError)),e=_v(t,1,!1,null,null,n,l,null,a,i,o,Rv),t[Da]=e.current,xd(t),new zd(e)};Rr.hydrateRoot=function(t,e,n){if(!zg(t))throw Error(S(299));var l=!1,a="",i=f0,o=d0,u=m0,s=null;return n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(o=n.onCaughtError),n.onRecoverableError!==void 0&&(u=n.onRecoverableError),n.formState!==void 0&&(s=n.formState)),e=_v(t,1,!0,e,n??null,l,a,s,i,o,u,Rv),e.context=Nv(null),n=e.current,l=ue(),l=$f(l),a=Yn(l),a.callback=null,Vn(n,a,l),n=l,e.current.lanes=n,Fi(e,n),Je(e),t[Da]=e.current,xd(t),new Or(e)};Rr.version="19.3.1"});var Dv=Ue((BT,Lv)=>{"use strict";function Uv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Uv)}catch(t){console.error(t)}}Uv(),Lv.exports=zv()});var d1=Ue(Hr=>{"use strict";var Xx=Symbol.for("react.transitional.element"),Gx=Symbol.for("react.fragment");function f1(t,e,n){var l=null;if(n!==void 0&&(l=""+n),e.key!==void 0&&(l=""+e.key),"key"in e){n={};for(var a in e)a!=="key"&&(n[a]=e[a])}else n=e;return e=n.ref,{$$typeof:Xx,type:t,key:l,ref:e!==void 0?e:null,props:n}}Hr.Fragment=Gx;Hr.jsx=f1;Hr.jsxs=f1});var st=Ue((O4,m1)=>{"use strict";m1.exports=d1()});var r="lookmovie2-enhancer",vm=`${r}:settings`,is=`${r}:watchlist`,os=`${r}:movie-watchlist`,us=`${r}:playlist`,Oo=`${r}:playlist-session`,Ro=`${r}:shows-list-progress`,rs=`${r}:resume-points`,ss=`${r}:intro-times`,cs=`${r}:backup-snapshots`,bm=14,fs=`${r}:episode-titles`,ds=5e3,ms=`${r}-style`,ps=`${r}-site-theme`,Sm=`${r}-ad-bypass-style`,Yl=`${r}-fullscreen-style`,Le=`${r}-fullscreen-exit`,w=`${r}-root`,wm=`${r}:ntfy-active-tab`,Em=15e3,xm=500,Tm=3600*1e3,_m=1e3,zo=95,Nm=2,hs=2e3,Am=30*1e3,Mm=25,Cm=10,Om=8,gs=24,Rm=300,ol=Object.freeze([.5,.75,1,1.25,1.5,1.75,2]),Ub={autoPlay:!0,autoFullscreen:!0,windowedFullscreen:!0,autoNextEpisode:!0,autoSkipIntro:!0,autoSkipCredits:!0,playbackRate:1,siteTheme:!0,ntfyRemoteEnabled:!1,ntfyServer:"https://ntfy.sh",ntfyTopic:"",ntfyControlTopic:"",ntfyCommandSecret:""},Bt=Object.freeze(Ub);function zm(t){let e=document.body;if(e){t(e);return}let n=window.setInterval(()=>{let l=document.body;l&&(window.clearInterval(n),t(l))},50)}function Uo(t){if(!t||typeof t.getBoundingClientRect!="function")return!1;let e=t.getBoundingClientRect();return e.width>0&&e.height>0}function Um(t){return[t.textContent??"",t.getAttribute("aria-label")??"",t.getAttribute("title")??""].join(" ").replace(/\s+/g," ").trim()}function Lo(t,e){let n=document.getElementById(t);if(n instanceof HTMLStyleElement)return n;let l=document.createElement("style");return l.id=t,l.textContent=e,(document.head??document.documentElement).appendChild(l),l}function Wa(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function Do(t){return Wa(t)?t:{}}function We(t,e){return typeof t=="boolean"?t:e}function Pa(t,e){return typeof t=="string"&&t.trim()?t.trim():e}function Lm(t){return t instanceof Error?t.message:String(t)}var Lb="https://ntfy.sh",Db=/^[A-Za-z0-9_-]{1,64}$/;function Ho(t){return(typeof t=="string"?t:"").trim().replace(/^\/+|\/+$/g,"")}function ys(t){return Db.test(Ho(t))}function Dm(t,e){let n=Ho(t);return n?n.length>64?`${e} topic must be 64 characters or fewer.`:`${e} topic can only use letters, numbers, hyphens, and underscores.`:`${e} topic is required.`}function Bo(t){return(t.server.trim()||Lb).replace(/\/+$/,"")}function qo(t){return Ho(t.topic)}function Fa(t){let e=Ho(t.controlTopic);if(e)return e;let n=qo(t);return n?`${n}-controls`:""}function vs(t){let e=qo(t);if(!ys(e))return Dm(e,"Display");let n=Fa(t);return ys(n)?"":Dm(n,"Control")}function bs(t,e){return`${Bo(t)}/${encodeURIComponent(e)}`}function $b(t,e=Date.now()){let n=Fa(t);if(!ys(n))return"";let l=new URL(`${Bo(t)}/${encodeURIComponent(n)}/sse`);return l.searchParams.set("since",String(Math.floor(e/1e3))),l.toString()}function Hb(t,e){let n=t.secret.trim();return n?`${n} ${e}`:e}function Vl(t,e,n){return{action:"http",label:e,url:bs(t,Fa(t)),method:"POST",body:Hb(t,n),clear:!1}}function $o(t,e,n){let l=Number(n);return Number.isFinite(l)?{command:t,[e]:l}:null}function Bb(t,e){if(e&&t.secret!==e)return null;let n=t.command??t.action??"",l=(typeof n=="string"?n:"").trim().toLowerCase();return l?l==="seek"?$o(l,"seconds",t.seconds??t.by??t.value):l==="volume"?$o(l,"percent",t.percent??t.value):{command:l}:null}function qb(t,e){let n=(typeof t=="string"?t:"").trim();if(!n)return null;let l=e.trim();try{let s=JSON.parse(n);if(Wa(s))return Bb(s,l)}catch{}let a=n;if(l){if(a!==l&&!a.startsWith(`${l} `))return null;a=a.slice(l.length).trim()}let[i="",o=""]=a.split(/\s+/,2),u=i.toLowerCase();return u==="seek"?$o(u,"seconds",o):u==="volume"?$o(u,"percent",o):{command:u}}function Yb(t,e){switch(t.command){case"play":return e.play();case"pause":return e.pause();case"toggle":case"playpause":case"play-pause":return e.toggle();case"seek":return t.seconds!==void 0&&e.seekBy(t.seconds);case"fullscreen":case"fs":return e.fullscreen();case"next":return e.next();case"mute":return e.setMuted(!0);case"unmute":return e.setMuted(!1);case"volume":return t.percent!==void 0&&e.setVolume(t.percent);default:return!1}}async function $m(t,e,n="POST"){let l=JSON.stringify(e),a={"Content-Type":"application/json"};try{let i=await fetch(t,{method:n,body:l,headers:a});if(!i.ok)throw new Error(`ntfy request failed with HTTP ${String(i.status)}`)}catch(i){if(typeof GM_xmlhttpRequest!="function")throw i;await new Promise((o,u)=>{GM_xmlhttpRequest({method:n,url:t,data:l,headers:a,onload(s){if(s.status>=200&&s.status<300){o();return}u(new Error(`ntfy request failed with HTTP ${String(s.status)}`))},onerror(){u(new Error("ntfy request failed"))}})})}}function Vb(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}function kb(t,e,n=Vb()){function l(){try{let a=JSON.parse(localStorage.getItem(t)??"null");return Wa(a)?a:null}catch{return null}}return{tabId:n,read:l,isCurrent(a=Date.now()){let i=l();return!i?.tabId||i.tabId===n?!0:a-Number(i.updatedAt??0)>e},write(a){let i={tabId:n,href:location.href,title:a,updatedAt:Date.now()};localStorage.setItem(t,JSON.stringify(i))},clear(){l()?.tabId===n&&localStorage.removeItem(t)}}}var jb=5e3,Xb=5e3,Gb=5e3;function Hm(t){let e=kb(t.tabClaimKey,t.tabClaimTtlMs??15e3),n=null,l=0,a=0,i="",o=0,u=!1,s=()=>document.visibilityState!=="hidden",d=()=>t.canClaim?.()??!0;function p(){try{e.write(t.getTitle())}catch(g){console.warn(`[${t.scriptId}] Failed to claim ntfy remote tab.`,g)}}function v(g="activity"){return!t.getConfig().enabled||!s()||!d()?!1:(p(),t.onStatus("connected",`This tab controls the remote (${g}).`),!0)}function m(){e.clear()}function y(){t.getConfig().enabled&&e.isCurrent()&&s()&&d()&&p()}function E(){u||(u=!0,window.addEventListener("focus",()=>v("focus")),document.addEventListener("visibilitychange",()=>{s()?v("visible"):m()}),window.addEventListener("pagehide",m))}function _(g){let b;try{b=JSON.parse(typeof g.data=="string"?g.data:"{}")}catch(M){console.warn(`[${t.scriptId}] Failed to parse ntfy event.`,M);return}if(!Wa(b)||b.event!=="message"||typeof b.message!="string")return;let x=typeof b.id=="string"?b.id:"";if(x&&x===i)return;if(i=x,!s()||!e.isCurrent()){let M=Date.now();M-o>Gb&&(o=M,t.onStatus("connected",`Another visible ${t.siteName} tab owns the remote.`));return}let z=qb(b.message,t.getConfig().secret);if(!z){t.onStatus("connected","Ignored ntfy message.");return}let A=Yb(z,t.handlers);if(A&&t.onCommandHandled){let M=t.onCommandHandled;window.setTimeout(()=>{M(z)},150)}t.onStatus("connected",A?`Ran remote command: ${z.command}`:`No player handled: ${z.command}`)}function N(){n&&(n.close(),n=null)}function f(){window.clearTimeout(l),l=0,N(),a&&(window.clearInterval(a),a=0),m(),t.onStatus("disabled","")}function c(){window.clearTimeout(l),l=0;let g=t.getConfig();if(!g.enabled)return f(),!1;let b=$b(g);if(!b)return f(),t.onStatus("disabled",vs(g)||"Add an ntfy topic to enable remote control."),!1;N(),a||(a=window.setInterval(y,Xb)),E(),t.onStatus("connecting","Connecting to ntfy.");let x=new EventSource(b);return n=x,x.onopen=()=>{t.onStatus("connected","Connected to ntfy.")},x.onmessage=_,x.onerror=()=>{t.onStatus("error","ntfy connection lost. Reconnecting soon."),N(),l=window.setTimeout(c,jb)},!0}return{tabId:e.tabId,start:c,stop:f,restart(){return N(),c()},claim:v,release:m,isCurrentTab:()=>e.isCurrent()}}function Yo(){return typeof GM_getValue=="function"&&typeof GM_setValue=="function"}function Qb(t){try{return localStorage.getItem(t)}catch{return null}}function Te(t){if(Yo()){let n=GM_getValue(t,null);if(typeof n=="string")return n}let e=Qb(t);return e!==null&&Yo()&&GM_setValue(t,e),e}function Pt(t,e){Yo()&&GM_setValue(t,e);try{e===null?localStorage.removeItem(t):localStorage.setItem(t,e)}catch(n){if(!Yo())throw n}}function Kb(t,e){let n={};for(let[l,a]of Object.entries(e)){let i=t[l];n[l]=typeof i==typeof a?i:a}return n}function Bm(t){let{scriptId:e,storageKey:n,defaults:l}=t,a=t.normalize??Kb;function i(o){return a(Do(o),l)}return{normalize:i,load(){try{return i(JSON.parse(Te(n)||"{}"))}catch(o){return console.warn(`[${e}] Failed to load saved settings.`,o),{...l}}},persist(o){try{Pt(n,JSON.stringify(o))}catch(u){console.warn(`[${e}] Failed to save settings.`,u)}}}}function Ym(t){let e=t?Array.from(t.querySelectorAll("video")):[],n=Array.from(document.querySelectorAll("video")),l=[...new Set([...e,...n])].filter(a=>Uo(a));return l.find(a=>!a.paused&&!a.ended)??l.find(a=>a.readyState>0)??l[0]??null}function qm(t){t.play().catch(()=>{})}function Vm(t){return{play(){let e=t();return e?(qm(e),!0):!1},pause(){let e=t();return e?(e.pause(),!0):!1},toggle(){let e=t();return e?(e.paused?qm(e):e.pause(),!0):!1},seekBy(e){let n=t();if(!n||!Number.isFinite(e))return!1;let l=Number.isFinite(n.duration)?n.duration:Number.MAX_SAFE_INTEGER;return n.currentTime=Math.max(0,Math.min(l,n.currentTime+e)),!0},setVolume(e){let n=t();return!n||!Number.isFinite(e)?!1:(n.volume=Math.max(0,Math.min(1,e/100)),n.muted=!1,!0)},setMuted(e){let n=t();return n?(n.muted=e,!0):!1}}}function ft(t){return typeof t=="object"&&t!==null}function ut(t,e){return t?t[e]:void 0}function ti(t){return Object.entries(t||{})}function ei(t){return window[t]}function wn(...t){for(let e of t){let n=ei(e);if(n)return n}return{}}function tt(t){let e=Number.parseInt(String(t),10);return Number.isFinite(e)&&e>0?e:0}async function kl(t){let e=await fetch(t,{credentials:"same-origin"});if(!e.ok)throw new Error(`Request failed (${e.status})`);return e.text()}async function Vo(t){let e=await fetch(t,{credentials:"same-origin"});if(!e.ok)throw new Error(`Request failed (${e.status})`);return await e.json()}function de(t){return t?t.replaceAll("\\'","'").replaceAll("\\\\","\\"):""}function at(t){let e=typeof t=="string"?t.trim():"";if(!e||e.startsWith("data:image/"))return"";let n=typeof window<"u"&&window.location?window.location.href:"https://www.lookmovie2.to/";try{return new URL(e,n).href}catch{return e.startsWith("//")?`https:${e}`:e}}function En(t){if(!t)return"";let e=t.getAttribute("style")||"",n=/background-image:\s*url\((['"]?)(.*?)\1\)/i.exec(e),l=[t.getAttribute("content"),t.getAttribute("data-lazy-background"),t.getAttribute("data-src-portrait"),t.getAttribute("data-background-image"),t.getAttribute("data-src"),n?.[2],t.getAttribute("src")];return at(l.find(a=>typeof a=="string"&&a.trim()&&!a.trim().startsWith("data:image/"))||"")}function xn(t){return String(t)}function me(t){if(!ft(t))return null;let e=tt(t.season),n=tt(t.episode),l=tt(t.idEpisode||t.id_episode);return!e||!n||!l?null:{season:e,episode:n,idEpisode:l,watchedAt:typeof t.watchedAt=="number"?t.watchedAt:void 0,updatedAt:typeof t.updatedAt=="number"?t.updatedAt:void 0}}function km(t){return t?`S${String(t.season).padStart(2,"0")}E${String(t.episode).padStart(2,"0")}`:"Unknown episode"}function Pe(t,e){return!t&&!e?0:t?e?t.season!==e.season?t.season-e.season:t.episode!==e.episode?t.episode-e.episode:t.idEpisode-e.idEpisode:1:-1}function Ss(t,e){return!t||!e?!1:t.idEpisode===e.idEpisode&&t.season===e.season&&t.episode===e.episode}function Fe(t){return!!t&&Ss(t.latestEpisode,t.lastWatched)}var ws=Bm({scriptId:r,storageKey:vm,defaults:Bt,normalize:t=>({autoPlay:We(t.autoPlay,Bt.autoPlay),autoFullscreen:We(t.autoFullscreen,Bt.autoFullscreen),windowedFullscreen:We(t.windowedFullscreen,Bt.windowedFullscreen),autoNextEpisode:We(t.autoNextEpisode,Bt.autoNextEpisode),autoSkipIntro:We(t.autoSkipIntro,Bt.autoSkipIntro),autoSkipCredits:We(t.autoSkipCredits,Bt.autoSkipCredits),playbackRate:ol.includes(Number(t.playbackRate))?Number(t.playbackRate):Bt.playbackRate,siteTheme:We(t.siteTheme,Bt.siteTheme),ntfyRemoteEnabled:We(t.ntfyRemoteEnabled,Bt.ntfyRemoteEnabled),ntfyServer:Pa(t.ntfyServer,Bt.ntfyServer).replace(/\/+$/,""),ntfyTopic:Pa(t.ntfyTopic,Bt.ntfyTopic),ntfyControlTopic:Pa(t.ntfyControlTopic,Bt.ntfyControlTopic),ntfyCommandSecret:Pa(t.ntfyCommandSecret,Bt.ntfyCommandSecret)})});function Xm(t){return ws.normalize(t)}function Gm(){return ws.load()}function Es(t){return typeof t=="string"||typeof t=="number"?String(t).trim():""}function ni(t,e){if(!ft(e))return null;let n=typeof t=="string"&&t.trim()?t.trim():"";return n?{slug:n,idShow:tt(e.idShow||e.id_show),title:typeof e.title=="string"&&e.title.trim()?e.title.trim():n,year:Es(e.year),poster:typeof e.poster=="string"?e.poster:"",addedAt:typeof e.addedAt=="number"?e.addedAt:Date.now(),lastSyncedAt:typeof e.lastSyncedAt=="number"?e.lastSyncedAt:0,lastSyncError:typeof e.lastSyncError=="string"?e.lastSyncError:"",latestEpisode:me(e.latestEpisode),lastWatched:me(e.lastWatched),upcoming:Zb(e.upcoming)}:null}function Zb(t){if(!ft(t)||!Array.isArray(t.episodes))return null;let e=t.episodes.map(me).filter(l=>!!l),n=tt(t.total);return{afterIdEpisode:tt(t.afterIdEpisode),total:Math.max(n,e.length),episodes:e}}function xs(t,e){let n=ft(t)?t[e]:void 0;return ft(n)?n:{}}function Qm(){try{let t=JSON.parse(Te(is)||"{}"),e={};return Object.entries(xs(t,"shows")).forEach(([n,l])=>{let a=ni(n,l);a&&(e[n]=a)}),{shows:e}}catch(t){return console.warn(`[${r}] Failed to load watchlist.`,t),{shows:{}}}}function li(t,e){if(!ft(e))return null;let n=typeof t=="string"&&t.trim()?t.trim():"";return n?{slug:n,title:typeof e.title=="string"&&e.title.trim()?e.title.trim():n,year:Es(e.year),poster:typeof e.poster=="string"?e.poster:"",idMovie:tt(e.idMovie||e.id_movie),href:typeof e.href=="string"?e.href:`/movies/view/${n}`,addedAt:typeof e.addedAt=="number"?e.addedAt:Date.now(),watched:!!e.watched,watchedAt:typeof e.watchedAt=="number"?e.watchedAt:void 0}:null}function Km(){try{let t=JSON.parse(Te(os)||"{}"),e={};return Object.entries(xs(t,"movies")).forEach(([n,l])=>{let a=li(n,l);a&&(e[n]=a)}),{movies:e}}catch(t){return console.warn(`[${r}] Failed to load movie watchlist.`,t),{movies:{}}}}function ai(t,e){if(!ft(e))return null;let n=typeof e.slug=="string"&&e.slug.trim()?e.slug.trim():typeof t=="string"&&t.trim()?(t.split(":")[0]??"").trim():"",l=me(e.episode||e.latestEpisode);return!n||!l?null:{key:typeof t=="string"&&t.trim()?t.trim():`${n}:${l.season}:${l.episode}:${l.idEpisode}`,slug:n,idShow:tt(e.idShow||e.id_show),title:typeof e.title=="string"&&e.title.trim()?e.title.trim():n,year:Es(e.year),poster:typeof e.poster=="string"?e.poster:"",episode:l,addedAt:typeof e.addedAt=="number"?e.addedAt:Date.now()}}function Zm(){try{let t=JSON.parse(Te(us)||"{}"),e={};return Object.entries(xs(t,"entries")).forEach(([n,l])=>{let a=ai(n,l);a&&(e[a.key]=a)}),{entries:e}}catch(t){return console.warn(`[${r}] Failed to load playlist.`,t),{entries:{}}}}function Jm(t){return ft(t)?{active:!!t.active,currentKey:typeof t.currentKey=="string"?t.currentKey:"",startedAt:typeof t.startedAt=="number"?t.startedAt:0}:{active:!1,currentKey:"",startedAt:0}}function Im(){try{return Jm(JSON.parse(Te(Oo)||"{}"))}catch(t){return console.warn(`[${r}] Failed to load playlist session.`,t),{active:!1,currentKey:"",startedAt:0}}}function ko(t){if(!ft(t))return null;let e=typeof t.slug=="string"&&t.slug.trim()?t.slug.trim():"",n=me(t.episode);return!e||!n?null:{slug:e,title:typeof t.title=="string"?t.title:e,href:typeof t.href=="string"?t.href:"",episode:n,seenAt:typeof t.seenAt=="number"?t.seenAt:Date.now(),source:t.source==="manual"?"manual":"auto"}}function Wm(){try{return ko(JSON.parse(Te(Ro)||"null"))}catch(t){return console.warn(`[${r}] Failed to load shows list progress.`,t),null}}function Pm(t){ws.persist(t)}function Fm(t){try{Pt(is,JSON.stringify(t)),lp({watchlist:t})}catch(e){console.warn(`[${r}] Failed to save watchlist.`,e)}}function tp(t){try{Pt(os,JSON.stringify(t)),lp({movieWatchlist:t})}catch(e){console.warn(`[${r}] Failed to save movie watchlist.`,e)}}function Ts(t){try{Pt(us,JSON.stringify(t))}catch(e){console.warn(`[${r}] Failed to save playlist.`,e)}}function ep(t){try{let e=Jm(t);if(!e.active){Pt(Oo,null);return}Pt(Oo,JSON.stringify(e))}catch(e){console.warn(`[${r}] Failed to save playlist session.`,e)}}function _s(t){try{let e=ko(t);if(!e){Pt(Ro,null);return}Pt(Ro,JSON.stringify(e))}catch(e){console.warn(`[${r}] Failed to save shows list progress.`,e)}}function jm(t,e){let n=t?t[e]:void 0;return n&&typeof n=="object"?Object.keys(n).length:0}function Jb(t=new Date){let e=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${n}`}function np(){return typeof GM_getValue=="function"&&typeof GM_setValue=="function"}function jo(){if(!np())return[];try{let t=GM_getValue(cs,null),e=JSON.parse(typeof t=="string"&&t?t:"[]");return Array.isArray(e)?e.filter(n=>ft(n)&&typeof n.date=="string"):[]}catch(t){return console.warn(`[${r}] Failed to load backup snapshots.`,t),[]}}function lp(t){if(np())try{if(t.watchlist&&!jm(t.watchlist,"shows")||t.movieWatchlist&&!jm(t.movieWatchlist,"movies"))return;let e=Jb(),n=jo(),l=n.find(o=>o.date===e)||n[0]||{},i=[{watchlist:l.watchlist||{shows:{}},movieWatchlist:l.movieWatchlist||{movies:{}},...t,date:e,savedAt:Date.now()},...n.filter(o=>o.date!==e)].sort((o,u)=>u.date.localeCompare(o.date)).slice(0,bm);GM_setValue(cs,JSON.stringify(i))}catch(e){console.warn(`[${r}] Failed to save backup snapshot.`,e)}}function ap(t,e){try{let n=JSON.parse(Te(t)||"null");return ft(n)?n:e}catch(n){return console.warn(`[${r}] Failed to load ${t}.`,n),e}}function ip(t,e){try{Pt(t,JSON.stringify(e))}catch(n){console.warn(`[${r}] Failed to save ${t}.`,n)}}function Ns(t){if(!ft(t))return null;let e=Number(t.progress??t.currentTime),n=Number(t.duration);return!Number.isFinite(e)||!Number.isFinite(n)||e<0||n<=0?null:{progress:e,duration:n,savedAt:typeof t.savedAt=="number"?t.savedAt:Date.now()}}function op(){let t={};return Object.entries(ap(rs,{})).forEach(([e,n])=>{let l=Ns(n);l&&(t[e]=l)}),t}function up(t){ip(rs,t)}function Ib(t){if(!ft(t))return null;let e=Number(t.start),n=Number(t.end),l=Number.isFinite(e)&&Number.isFinite(n)&&e>=0&&n>e,a=Number(t.creditsFromEnd),i=Number.isFinite(a)&&a>0;return!l&&!i?null:{...l?{start:e,end:n}:{},...i?{creditsFromEnd:a}:{},updatedAt:typeof t.updatedAt=="number"?t.updatedAt:Date.now()}}function rp(){let t={};return Object.entries(ap(ss,{})).forEach(([e,n])=>{let l=Ib(n);l&&(t[e]=l)}),t}function sp(t){ip(ss,t)}var h={settings:Gm(),watchlistStore:Qm(),movieWatchlistStore:Km(),playlistStore:Zm(),playlistSession:Im(),showsListProgress:Wm(),showsListProgressOrder:-1,showsListSeenCandidate:null,showsListSeenCandidateOrder:-1,showsListSessionTouched:!1,showsListManualMarkerSet:!1,showsListObserver:null,showsListMutationObserver:null,showsListRefreshScheduled:!1,showsListObservedCards:new WeakSet,domBootstrapped:!1,uiBootAttempts:0,fullscreenTriggered:!1,lastKnownUrl:location.href,watchlistRefreshPromise:null,watchlistBusy:!1,watchlistMessage:"",watchlistMessageTone:"muted",lastTrackedEpisodeSignature:"",ntfyRemoteStatus:"disabled",ntfyRemoteMessage:"",ntfyLastNotificationAt:0};var ii=null,cp=new Map,fp="",Wb=4,As=0,dp=[];async function Pb(t){As>=Wb&&await new Promise(e=>dp.push(e)),As+=1;try{return await t()}finally{As-=1,dp.shift()?.()}}function mp(){if(ii)return ii;ii={};try{let t=JSON.parse(Te(fs)||"{}");ti(t).forEach(([e,n])=>{typeof n=="string"&&n.trim()&&(ii[e]=n)})}catch(t){console.warn(`[${r}] Could not read cached episode titles.`,t)}return ii}function Fb(t){let e=Object.keys(t);e.length>ds&&e.slice(0,e.length-ds).forEach(n=>{delete t[n]});try{Pt(fs,JSON.stringify(t))}catch(n){console.warn(`[${r}] Could not save episode titles.`,n)}}function pp(t){let e=mp(),n=!1;return Object.entries(t).forEach(([l,a])=>{e[l]!==a&&(delete e[l],e[l]=a,n=!0)}),n&&Fb(e),n}function hp(t){let e=typeof t=="string"?t.replace(/\s+/g," ").trim():"";return/^episode\s*#?\d+$/i.test(e)?"":e}function tS(t){let e={};for(let n of t.matchAll(/\{[^{}]*?\bid_episode\b[^{}]*?\}/g)){let l=n[0],a=/\btitle:\s*'((?:\\.|[^'\\])*)'/.exec(l),i=/\bid_episode:\s*['"]?(\d+)/.exec(l),o=hp(de(a?.[1]));i?.[1]&&o&&(e[i[1]]=o)}return e}function jl(t){return t&&mp()[String(t)]||""}function Lt(t){let e=km(t),n=jl(t?.idEpisode);return n?`${e} \xB7 ${n}`:e}function Xo(){let t=wn("show_storage"),e=ut(t,"seasons");if(!Array.isArray(e)||!e.length)return!1;let n=`${String(ut(t,"id_show"))}:${e.length}`;if(n===fp)return!1;fp=n;let l={};return e.forEach(a=>{let i=ut(a,"id_episode"),o=hp(ut(a,"title"));(typeof i=="number"||typeof i=="string")&&String(i)&&o&&(l[String(i)]=o)}),pp(l)}function Go(t,e){let n=e.some(a=>a&&!jl(a.idEpisode));if(!t||!n)return Promise.resolve(!1);let l=cp.get(t);return l||(l=Pb(()=>kl(`/shows/play/${encodeURIComponent(t)}`)).then(a=>pp(tS(a))).catch(a=>(console.warn(`[${r}] Could not load episode titles for ${t}.`,a),!1)),cp.set(t,l)),l}var V1=J(Dv(),1);var Ud=new Set;function $v(t){return Ud.add(t),()=>{Ud.delete(t)}}function ka(){Ud.forEach(t=>{t()})}function Hv(){return`
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
    `}var Wt=J(ul(),1),q1=J(js(),1);var zr=new Map;function Dd(t,e=""){h.ntfyRemoteStatus=t,h.ntfyRemoteMessage=e,ka()}function Bv(){let{settings:t}=h;return{enabled:t.ntfyRemoteEnabled,server:t.ntfyServer,topic:t.ntfyTopic,controlTopic:t.ntfyControlTopic,secret:t.ntfyCommandSecret}}var $d=Hm({scriptId:r,siteName:"LookMovie",tabClaimKey:wm,tabClaimTtlMs:Em,getConfig:Bv,canClaim:()=>!!so(),getTitle:()=>qv(),handlers:{play:()=>jv(),pause:()=>Xv(),toggle:()=>Gv(),seekBy:t=>Qv(t),fullscreen:()=>Jv(),next:()=>Ul(),setMuted:t=>Zv(t),setVolume:t=>Kv(t)},onStatus:Dd,onCommandHandled:t=>{ro(t.command)}});function _x(t="activity"){return $d.claim(t)}function Hd(){return location.pathname.startsWith("/shows/play/")}function Ur(){return wn("show_storage","show")}function Bd(){return wn("movie_storage","movie")}function Nx(){if(qd())return!0;let t=Bd();return!Hd()&&!!(t.id_movie||t.title||t.slug)}function Ax(t){let e=[Vl(t,"Play/Pause","toggle"),Vl(t,"Fullscreen","fullscreen")];return Hd()?e.push(Vl(t,"Next","next")):Nx()?e.push(Vl(t,"-30s","seek -30")):e.push(Vl(t,"+30s","seek 30")),e}function Ld(t,e){let n=xn(t||"").replace(/\s+/g," ").trim(),l=typeof e=="string"||typeof e=="number"?String(e).trim():"";if(!n)return"";if(/ \(\d{4}\)$/.test(n))return n;let a=/^(.*?)(\d{4})$/.exec(n),i=a?.[1]?.trim()??"";return a&&i?`${i} (${a[2]??""})`:l&&!n.endsWith(`(${l})`)?`${n} (${l})`:n}function qv(){let t=Ur(),e=Bd(),n=typeof t.title=="string"&&t.title.trim()?Ld(t.title,t.year):typeof e.title=="string"&&e.title.trim()?Ld(e.title,e.year):"";if(n)return n;let l=document.querySelector("h1")?.textContent||document.querySelector(".movie-title, .film-title, .show-title")?.textContent||document.title||"LookMovie2";return Ld(l)||"LookMovie2"}function Mx(){let t=/^#S(\d+)-E(\d+)-(\d+)$/i.exec(location.hash);return t?Lt({season:Number(t[1]),episode:Number(t[2]),idEpisode:Number(t[3])}):""}function Yv(){let t=Ur(),e=Number(ei("id_show")||t.id_show||t.idShow||0),n=Object.values(h.watchlistStore.shows);if(e){let a=n.find(i=>i.idShow===e);if(a)return a}let l=xn(t.slug||"").trim();return l&&h.watchlistStore.shows[l]||null}function Cx(){let t=Ur(),e=Yv(),n=/\/shows\/view\/([^/?#]+)/i.exec(location.pathname),a=document.querySelector('a[href*="/shows/view/"]')?.getAttribute("href")?.match(/\/shows\/view\/([^/?#]+)/i);return xn(t.slug||"").trim()||xn(t.seo_url||"").trim()||String(e?.slug||"").trim()||(n?.[1]??"")||(a?.[1]??"")}function Ox(t){return t?zr.has(t)?Promise.resolve(zr.get(t)||""):fetch(`/shows/view/${encodeURIComponent(t)}`,{credentials:"same-origin"}).then(e=>{if(!e.ok)throw new Error(`Show poster request failed with HTTP ${e.status}`);return e.text()}).then(e=>{let n=/poster_medium:\s*'((?:\\'|[^'])*)'/.exec(e),l=at(n?de(n[1]):"");return zr.set(t,l),l}).catch(e=>(console.warn(`[${r}] Could not resolve show poster for ntfy attachment.`,e),zr.set(t,""),"")):Promise.resolve("")}function Rx(){let t=so(),e=Bd(),n=Ur(),l=Yv(),a=document.querySelector(['meta[property="og:image"]',".movie__poster[data-background-image]",'.movie__poster[style*="background-image"]',".movie-single-ct img[data-src]",".movie-single-ct img[src]",".internal-page-container img[data-src]",".internal-page-container img[src]","[data-background-image]",'[style*="background-image"]',"img[data-src-portrait]","img[data-src]"].join(", "));return at(t?.getAttribute("poster"))||at(e.movie_poster)||at(e.poster_medium)||at(n.poster_medium)||at(n.poster_large)||at(n.poster_original)||at(n.poster)||at(l?.poster)||En(a)}function zx(){let t=Rx();return t||!Hd()?Promise.resolve(t):Ox(Cx())}function Ux(t,e,n,l="POST"){return fetch(t,{method:l,body:e,headers:n}).then(a=>{if(!a.ok)throw new Error(`ntfy request failed with HTTP ${a.status}`);return a})}function Lx(t){return t?fetch(t,{credentials:"omit",referrerPolicy:"no-referrer"}).then(e=>{if(!e.ok)throw new Error(`Poster request failed with HTTP ${e.status}`);return e.blob()}).then(e=>!e.size||e.size>15*1024*1024?null:e).catch(e=>(console.warn(`[${r}] Could not fetch poster for ntfy attachment.`,e),null)):Promise.resolve(null)}function Dx(t,e,n){let l={Title:t.title,Message:t.message,Priority:String(t.priority),Tags:t.tags.join(","),Click:t.click,Actions:JSON.stringify(t.actions),"X-Sequence-ID":t.sequence_id};return e&&(l.Filename=e),n&&(l["Content-Type"]=n),Object.keys(l).forEach(a=>{l[a]||delete l[a]}),l}function $x(t,e,n,l){return Lx(l).then(a=>a?Ux(bs(t,e),a,Dx(n,"lookmovie-poster.jpg",a.type||"image/jpeg")):$m(Bo(t),n))}function ro(t="update"){if(!h.settings.ntfyRemoteEnabled||!_x(t))return!1;let e=Bv(),n=qo(e),l=Fa(e);if(!n||!l||vs(e))return!1;let a=so();if(!a)return!1;let i=a.paused,o=qv(),u=Mx(),s={topic:n,title:i?"Paused on LookMovie2":"Playing on LookMovie2",message:u?`${o} - ${u}`:o,tags:["tv"],priority:3,sequence_id:`${r}-player`,click:location.href,actions:Ax(e)};return h.ntfyLastNotificationAt=Date.now(),zx().then(d=>$x(e,n,s,d)).then(()=>{Dd("connected",`Updated Android player notification (${t}).`)}).catch(d=>{console.warn(`[${r}] Failed to publish ntfy player notification.`,d),Dd("error","Could not publish Android player notification.")}),!0}function Vv(){return $d.start()}function kv(){return $d.restart()}var Lr=`${r}-in-theaters`;function Hx(){let t=new Set;return Array.from(document.querySelectorAll(".hero-slider .slide-item")).map(e=>{let n=e.querySelector('.slide-item__backdrop--wrapper a[href*="/movies/view/"]'),l=e.querySelector(".slide-item__backdrop img"),a=e.querySelector(".slide-item__title"),i=a?.querySelector("span"),o=n?n.getAttribute("href"):"";if(!o||t.has(o))return null;t.add(o);let u=a?Array.from(a.childNodes).filter(s=>s.nodeType===Node.TEXT_NODE).map(s=>s.textContent).join("").trim():"";return{href:o,title:u||l?.getAttribute("alt")||"",year:i?(i.textContent??"").replace(/[()]/g,"").trim():"",rating:e.querySelector(".slide-item__stat span")?.textContent||"",poster:at(l&&(l.getAttribute("data-src-portrait")||l.getAttribute("data-src-landscape"))||""),qualityTag:e.querySelector(".quality-tag")}}).filter(e=>!!e)}function Bx(t){let e=document.createElement("div");e.className="movie-item-style-2 movie-item-style-1";let n=document.createElement("div");n.className="hvr-inner";let l=document.createElement("a");l.href=t.href,l.append(" WATCH NOW ");let a=document.createElement("i");a.className="ion-play",l.append(a),n.append(l);let i=document.createElement("div");i.className="image__placeholder";let o=document.createElement("a");o.href=t.href;let u=document.createElement("img");if(u.src=t.poster,u.alt=t.title,u.loading="lazy",o.append(u),t.rating.trim()){let v=document.createElement("p");v.className="rate";let m=document.createElement("i");m.className="ion-android-star";let y=document.createElement("span");y.textContent=t.rating.trim(),v.append(m,y," /10"),o.append(v)}if(t.year){let v=document.createElement("p");v.className="year",v.textContent=t.year,o.append(v)}i.append(o),t.qualityTag&&i.append(t.qualityTag.cloneNode(!0));let s=document.createElement("div");s.className="mv-item-infor";let d=document.createElement("h6"),p=document.createElement("a");return p.href=t.href,p.textContent=t.title,d.append(p),s.append(d),e.append(n,i,s),e}function qx(){let t=Array.from(document.querySelectorAll(".page-single .hero-ct h1")).find(e=>/movies filter/i.test(e.textContent||""));return t?t.closest(".row"):null}function Dr(){let t=document.querySelector(`.${Lr}`);if(location.pathname!=="/"||!h.settings.siteTheme){t&&t.remove();return}let e=qx();if(t||!e)return;let n=Hx();if(!n.length)return;let l=document.createElement("div");l.className=`row ipad-width ${Lr}`,l.innerHTML=`
    <div class="col-sm-12"><div class="hero-ct"><h1>Recent &amp; In Theaters</h1></div></div>
    <div class="col-sm-12"><div class="flex-wrap-movielist"></div></div>
  `;let a=l.querySelector(".flex-wrap-movielist");if(a){if(a.dataset.expanded="false",n.forEach((i,o)=>{let u=Bx(i);o>=gs&&u.classList.add(`${Lr}-extra`),a.append(u)}),n.length>gs){let i=document.createElement("button");i.type="button",i.className=`${Lr}-toggle`,i.textContent=`Show all ${n.length}`,i.addEventListener("click",()=>{let o=a.dataset.expanded!=="true";a.dataset.expanded=o?"true":"false",i.textContent=o?"Show fewer":`Show all ${n.length}`}),a.parentElement?.append(i)}e.parentElement?.insertBefore(l,e),co(),Ll()}}var Yx=`
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
    background: rgba(2, 13, 24, 0.86) !important;
    backdrop-filter: blur(12px);
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
`;function $r(){if(!h.settings.siteTheme){document.getElementById(ps)?.remove();return}Lo(ps,Yx)}var Iv=0;function Vx(){window.clearTimeout(Iv),Iv=window.setTimeout(()=>{kv()},xm)}function el(t){let e={ntfyRemoteEnabled:h.settings.ntfyRemoteEnabled,ntfyServer:h.settings.ntfyServer,ntfyTopic:h.settings.ntfyTopic,ntfyControlTopic:h.settings.ntfyControlTopic,ntfyCommandSecret:h.settings.ntfyCommandSecret};h.settings=Xm(t),Pm(h.settings),Wv(),$r(),Dr(),(!h.settings.autoFullscreen||!h.settings.windowedFullscreen)&&(ja(),h.fullscreenTriggered=!1),(e.ntfyRemoteEnabled!==h.settings.ntfyRemoteEnabled||e.ntfyServer!==h.settings.ntfyServer||e.ntfyTopic!==h.settings.ntfyTopic||e.ntfyControlTopic!==h.settings.ntfyControlTopic||e.ntfyCommandSecret!==h.settings.ntfyCommandSecret)&&Vx()}var ho=J(ul(),1);function Pv(t,e){return!t||!e?"":`${t}:${e.season}:${e.episode}:${e.idEpisode}`}function Yd(){return Object.values(h.playlistStore.entries)}function fo(t){return t&&h.playlistStore.entries[t]||null}function Fv(t,e){return!!fo(Pv(t,e))}function Vd(t){return[...t].sort((e,n)=>e.addedAt-n.addedAt)}function Xa(){Ts(h.playlistStore),Rt(),nl()}function kd(){ep(h.playlistSession),Rt()}function t1(t){if(!t?.slug||!t.latestEpisode)return;let e=Pv(t.slug,t.latestEpisode);if(!e||fo(e)){Rt();return}let n=ai(e,{slug:t.slug,idShow:t.idShow,title:t.title,year:t.year,poster:t.poster,episode:t.latestEpisode,addedAt:Date.now()});n&&(h.playlistStore.entries[e]=n),Xa()}function jd(t){fo(t)&&(delete h.playlistStore.entries[t],h.playlistSession.active&&h.playlistSession.currentKey===t&&Ga(),Xa())}function e1(t){let e=t[0];return e?`${t.length} queued ${t.length===1?"episode":"episodes"} | Next: ${e.title} ${Lt(e.episode)}`:"Add latest show episodes from the watchlist poster or list view."}function n1(t){let e=Vd(Yd()),n=e[0];if(!n)return null;if(!t)return n;let l=e.findIndex(a=>a.key===t);return l>=0?e[l+1]||null:n}function l1(t){return t?(location.href=Dl(t.slug,t.episode),!0):!1}function mo(t){let e=t?fo(t):n1("");return e?(h.playlistSession={active:!0,currentKey:e.key,startedAt:Date.now()},kd(),l1(e)):(Ga(),!1)}function Ga(){h.playlistSession={active:!1,currentKey:"",startedAt:0},kd()}function a1(){if(!h.playlistSession.active)return!1;let t=h.playlistSession.currentKey;if(!fo(t))return Ga(),!1;let n=n1(t);return delete h.playlistStore.entries[t],Ts(h.playlistStore),n?(h.playlistSession.currentKey=n.key,kd(),Xa(),l1(n)):(Ga(),Xa(),!0)}var kx=1;function jx(){return{app:r,version:kx,exportedAt:new Date().toISOString(),watchlist:h.watchlistStore,movieWatchlist:h.movieWatchlistStore,playlist:h.playlistStore}}function o1(){let t=JSON.stringify(jx(),null,2),e=URL.createObjectURL(new Blob([t],{type:"application/json"})),n=document.createElement("a");n.href=e,n.download=`lookmovie2-watchlist-${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(n),n.click(),n.remove(),window.setTimeout(()=>{URL.revokeObjectURL(e)},1e3)}function Xd(t,e,n){if(!ft(t))return{};let l=t[e],a=ft(l)?l[n]:void 0;if(ft(a))return a;let i=t[n];return ft(i)?i:{}}function u1(t){let e=[],n=0,l=0;Object.entries(Xd(t,"watchlist","shows")).forEach(([i,o])=>{if(h.watchlistStore.shows[i])return;let u=ni(i,o);u&&(h.watchlistStore.shows[i]=u,e.push(i))}),Object.entries(Xd(t,"movieWatchlist","movies")).forEach(([i,o])=>{if(h.movieWatchlistStore.movies[i])return;let u=li(i,o);u&&(h.movieWatchlistStore.movies[i]=u,n+=1)}),Object.entries(Xd(t,"playlist","entries")).forEach(([i,o])=>{let u=ai(i,o);u&&!h.playlistStore.entries[u.key]&&(h.playlistStore.entries[u.key]=u,l+=1)}),e.length&&($l(),yn({force:!0,slugs:e})),n&&(Qa(),po()),l&&Xa();let a=`Restored ${e.length} ${e.length===1?"show":"shows"}, ${n} ${n===1?"movie":"movies"}, ${l} playlist ${l===1?"episode":"episodes"}.`;return ce(a,e.length||n||l?"success":"muted"),a}async function r1(t){try{return u1(JSON.parse(await t.text()))}catch(e){return console.warn(`[${r}] Failed to import backup.`,e),ce("That file is not a valid watchlist backup.","danger"),""}}function i1(t){return Object.keys(t||{}).length}function s1(){return jo().map(t=>({date:t.date,showCount:i1(ut(t.watchlist,"shows")),movieCount:i1(ut(t.movieWatchlist,"movies"))}))}function c1(t){let e=jo().find(n=>n.date===t);return e?u1(e):""}var zt=J(st(),1);function p1(){let t=(0,ho.useRef)(null),[e,n]=(0,ho.useState)(""),l=s1(),[a,i]=(0,ho.useState)(""),o=a||l[0]?.date||"";return(0,zt.jsxs)("div",{className:`${r}-setting ${r}-setting-stack`,children:[(0,zt.jsxs)("div",{children:[(0,zt.jsx)("p",{className:`${r}-setting-title`,children:"Watchlist backup"}),(0,zt.jsx)("p",{className:`${r}-setting-copy`,children:"Watchlists are kept in Tampermonkey storage with a daily snapshot for the last 14 days. Export a file now and then for a copy outside the browser. Restoring only adds missing entries."})]}),(0,zt.jsxs)("div",{className:`${r}-backup-actions`,children:[(0,zt.jsx)("button",{className:`${r}-button`,type:"button",onClick:()=>{o1()},children:"Export file"}),(0,zt.jsx)("button",{className:`${r}-button`,type:"button",onClick:()=>{t.current?.click()},children:"Import file"}),(0,zt.jsx)("input",{ref:t,className:`${r}-file-input`,type:"file",accept:"application/json,.json",hidden:!0,onChange:u=>{let s=u.currentTarget.files?.[0];u.currentTarget.value="",s&&r1(s).then(d=>{n(d)})}})]}),l.length?(0,zt.jsxs)("div",{className:`${r}-backup-actions`,children:[(0,zt.jsxs)("label",{className:`${r}-field`,children:[(0,zt.jsx)("span",{children:"Snapshot"}),(0,zt.jsx)("select",{value:o,onChange:u=>{i(u.currentTarget.value)},children:l.map(u=>(0,zt.jsxs)("option",{value:u.date,children:[u.date," (",u.showCount," shows, ",u.movieCount," movies)"]},u.date))})]}),(0,zt.jsx)("button",{className:`${r}-button`,type:"button",onClick:()=>{n(c1(o))},children:"Restore"})]}):null,e?(0,zt.jsx)("p",{className:`${r}-ntfy-status`,children:e}):null]})}var Re=J(st(),1);function ll({settingKey:t,title:e,copy:n,icon:l}){let a=h.settings[t];return(0,Re.jsxs)("label",{className:`${r}-setting`,children:[(0,Re.jsxs)("div",{className:`${r}-setting-main`,children:[l?(0,Re.jsx)("span",{className:`${r}-setting-icon`,children:l}):null,(0,Re.jsxs)("div",{children:[(0,Re.jsx)("p",{className:`${r}-setting-title`,children:e}),(0,Re.jsx)("p",{className:`${r}-setting-copy`,children:n})]})]}),(0,Re.jsxs)("span",{className:`${r}-switch`,children:[(0,Re.jsx)("input",{type:"checkbox",checked:a,onChange:i=>{el({...h.settings,[t]:i.currentTarget.checked})}}),(0,Re.jsx)("span",{className:`${r}-slider`})]})]})}var kr=J(ul(),1);var Qx=/^(?:ep_\d+|lookmovie\.mv_\d+)$/,Gd=null;function h1(t){return`ep_${t}`}function g1(t){return`lookmovie.mv_${t}`}function y1(){return Gd||(Gd=op()),Gd}function v1(t){try{return Ns(JSON.parse(localStorage.getItem(t)||"null"))}catch{return null}}function Kx(t){let e=Object.keys(t);return e.length<=hs?!1:(e.sort((n,l)=>(t[l]?.savedAt??0)-(t[n]?.savedAt??0)).slice(hs).forEach(n=>{delete t[n]}),!0)}function Br(){let t=y1(),e=!1;try{for(let n=0;n<localStorage.length;n+=1){let l=localStorage.key(n);if(l===null||!Qx.test(l))continue;let a=v1(l),i=t[l];a&&(i?.progress!==a.progress||i.duration!==a.duration)&&(t[l]={...a,savedAt:Date.now()},e=!0)}Object.entries(t).forEach(([n,l])=>{localStorage.getItem(n)===null&&localStorage.setItem(n,JSON.stringify({duration:l.duration,progress:l.progress}))})}catch(n){console.warn(`[${r}] Failed to sync resume points.`,n)}(Kx(t)||e)&&up(t)}function b1(){Br(),window.setInterval(Br,Am),window.addEventListener("pagehide",Br),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Br()})}function Zx(t){return v1(t)||y1()[t]||null}function qr(t){let e=Zx(t);if(!e)return null;let n=e.progress/e.duration*100;return n>=Nm&&n<zo?e:null}function Yr(t){let e=Math.max(1,Math.round((t.duration-t.progress)/6e4));return e<60?`${e}m left`:`${Math.floor(e/60)}h ${e%60}m left`}var xt=J(st(),1);function S1({entry:t,viewMode:e}){let n=t.watched?"watched":"new",l=t.href||Vr(t.slug),a=t.addedAt?`Added ${new Date(t.addedAt).toLocaleDateString()}`:"",i=[],o=t.idMovie?qr(g1(t.idMovie)):null,u=`/movies/play/${t.slug}`;return a&&i.push(a),(0,xt.jsxs)("article",{className:`${r}-watch-item`,"data-state":n,"data-view":e,children:[(0,xt.jsxs)("div",{className:`${r}-watch-item-poster`,children:[(0,xt.jsx)("a",{className:`${r}-watch-poster-link`,href:l,"aria-label":`Open ${t.title}`,children:t.poster?(0,xt.jsx)("img",{src:t.poster,alt:t.title,loading:"lazy"}):(0,xt.jsx)("div",{className:`${r}-watch-item-poster-placeholder`,children:"MOVIE"})}),(0,xt.jsx)("button",{className:`${r}-poster-icon-button ${r}-poster-check-button`,type:"button","aria-label":t.watched?`Mark ${t.title} unwatched`:`Mark ${t.title} watched`,title:t.watched?"Mark unwatched":"Mark watched",onClick:()=>{w1(t.slug)},children:"\u2713"}),(0,xt.jsx)("button",{className:`${r}-poster-icon-button ${r}-poster-remove-button`,type:"button","aria-label":`Remove ${t.title}`,title:"Remove",onClick:()=>{go(t.slug)},children:"\xD7"}),(0,xt.jsx)("div",{className:`${r}-watch-item-poster-overlay`,children:(0,xt.jsx)("span",{className:`${r}-watch-badge`,"data-state":n,children:t.watched?"Watched":"To watch"})})]}),(0,xt.jsxs)("div",{className:`${r}-watch-item-body`,children:[(0,xt.jsxs)("div",{children:[(0,xt.jsxs)("a",{className:`${r}-watch-item-title`,href:l,children:[t.title,t.year?` (${t.year})`:""]}),i.length?(0,xt.jsx)("p",{className:`${r}-watch-item-copy`,children:i.join(" | ")}):null]}),o||!t.watched?(0,xt.jsxs)("a",{className:`${r}-watch-action`,href:u,children:[(0,xt.jsx)("span",{"aria-hidden":"true",children:"\u25B6"})," ",o?"Continue":"Play",o?(0,xt.jsx)("small",{children:Yr(o)}):null]}):null]})]})}var yo=J(st(),1);function E1(){return(0,yo.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,yo.jsx)("path",{d:"M9.2 16.6 4.9 12.3l-1.4 1.4 5.7 5.7L21 7.6l-1.4-1.4L9.2 16.6z"})})}function x1(){return(0,yo.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,yo.jsx)("path",{d:"m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5z"})})}var Ut=J(st(),1);function T1({entry:t,viewMode:e,isActive:n}){let l=Dl(t.slug,t.episode),a=Lt(t.episode),i=t.addedAt?`Queued ${new Date(t.addedAt).toLocaleDateString()}`:"",o=[a];return i&&o.push(i),(0,Ut.jsxs)("article",{className:`${r}-watch-item`,"data-state":"new","data-view":e,"data-playlist-active":n?"true":"false",children:[(0,Ut.jsxs)("div",{className:`${r}-watch-item-poster`,children:[(0,Ut.jsx)("a",{className:`${r}-watch-poster-link`,href:l,"aria-label":`Open ${t.title} ${a}`,onClick:u=>{u.preventDefault(),mo(t.key)},children:t.poster?(0,Ut.jsx)("img",{src:t.poster,alt:t.title,loading:"lazy"}):(0,Ut.jsx)("div",{className:`${r}-watch-item-poster-placeholder`,children:"TV"})}),(0,Ut.jsx)("button",{className:`${r}-poster-icon-button ${r}-poster-check-button`,type:"button","aria-label":`Remove ${t.title} ${a} from playlist`,title:"Done",onClick:()=>{jd(t.key)},children:(0,Ut.jsx)(E1,{})}),(0,Ut.jsx)("button",{className:`${r}-poster-icon-button ${r}-poster-remove-button`,type:"button","aria-label":`Remove ${t.title}`,title:"Remove",onClick:()=>{jd(t.key)},children:(0,Ut.jsx)(x1,{})}),(0,Ut.jsx)("div",{className:`${r}-watch-item-poster-overlay`,children:(0,Ut.jsx)("span",{className:`${r}-watch-badge`,"data-state":"new",children:n?"Playing":"Queued"})})]}),(0,Ut.jsx)("div",{className:`${r}-watch-item-body`,children:(0,Ut.jsxs)("div",{children:[(0,Ut.jsxs)("a",{className:`${r}-watch-item-title`,href:l,onClick:u=>{u.preventDefault(),mo(t.key)},children:[t.title,t.year?` (${t.year})`:""]}),(0,Ut.jsx)("p",{className:`${r}-watch-item-copy`,children:o.join(" | ")})]})})]})}var al=J(ul(),1);async function _1(t,e){let n=String(e||"").trim();if(n.length<2)return[];let l=await Vo(`/api/v1/${t}/do-search/?q=${encodeURIComponent(n)}`),a=ut(l,"result");return(Array.isArray(a)?a:[]).filter(o=>!!o&&typeof ut(o,"slug")=="string"&&!!ut(o,"slug")).slice(0,Om).map(o=>({slug:o.slug,idShow:tt(o.id_show),idMovie:tt(o.id_movie),title:typeof o.title=="string"?o.title:o.slug,year:o.year?xn(o.year):"",rating:o.imdb_rating?xn(o.imdb_rating):"",poster:at(ut(o.poster,"w200")||ut(o.poster,"w100")||"")}))}var fe=J(st(),1);function N1({type:t}){let[e,n]=(0,al.useState)(""),[l,a]=(0,al.useState)([]),[i,o]=(0,al.useState)(""),u=(0,al.useRef)(0),s=t==="shows";(0,al.useEffect)(()=>{a([]),o("");let p=e.trim();if(p.length<2)return;let v=++u.current,m=async()=>{o("Searching...");try{let E=await _1(t,p);v===u.current&&(a(E),o(E.length?"":"No matches."))}catch{v===u.current&&o("Search failed. Try again.")}},y=window.setTimeout(()=>{m()},Rm);return()=>{window.clearTimeout(y)}},[e,t]);function d(p){s?bo({...p}):vo({...p,href:`/movies/view/${p.slug}`})}return(0,fe.jsxs)("div",{className:`${r}-search`,children:[(0,fe.jsx)("input",{type:"search",value:e,placeholder:s?"Search TV shows to add":"Search movies to add","aria-label":s?"Search TV shows to add":"Search movies to add",onChange:p=>{n(p.currentTarget.value)},onKeyDown:p=>{p.key==="Escape"&&(p.stopPropagation(),n(""))}}),i?(0,fe.jsx)("p",{className:`${r}-search-status`,children:i}):null,l.length?(0,fe.jsx)("ul",{className:`${r}-search-results`,children:l.map(p=>{let v=s?!!Ie(p.slug):!!vn(p.slug);return(0,fe.jsxs)("li",{children:[p.poster?(0,fe.jsx)("img",{src:p.poster,alt:"",loading:"lazy"}):(0,fe.jsx)("span",{}),(0,fe.jsxs)("div",{children:[(0,fe.jsx)("strong",{children:p.title}),(0,fe.jsx)("small",{children:[p.year,p.rating?`IMDb ${p.rating}`:""].filter(Boolean).join(" \xB7 ")})]}),(0,fe.jsx)("button",{className:`${r}-button`,type:"button",disabled:v,onClick:()=>{d(p)},children:v?"Added":"Add"})]},p.slug)})}):null]})}var ht=J(st(),1);function Jx(t,e){let{lastWatched:n}=t,l=n?qr(h1(n.idEpisode)):null;if(n&&l)return{href:Dl(t.slug,n),label:`Continue ${Lt(n)}`,detail:Yr(l)};let a=e?.episodes[0];return a?{href:Dl(t.slug,a),label:`Play ${Lt(a)}`,detail:""}:null}function A1({entry:t,viewMode:e}){let n=Qd(t),l=n?n.total:null,a=Jx(t,n),i=l!==null?l>0?"new":"watched":t.latestEpisode?Fe(t)?"watched":"new":"pending",o=t.latestEpisode?`Latest ${Lt(t.latestEpisode)}`:"Latest episode not synced yet",u=t.lastWatched?`Watched through ${Lt(t.lastWatched)}`:"Nothing marked watched yet",s=t.lastSyncError?`Sync issue: ${t.lastSyncError}`:"",d=i==="new"?l?`${l>99?"99+":l} unwatched`:"New episode":i==="watched"?"Up to date":"Pending sync",p=M1(t.slug,t.latestEpisode),v=Fe(t)?"Mark latest unwatched":"Mark latest watched",m=Fv(t.slug,t.latestEpisode),y=m?`${t.title} latest episode is already in your playlist`:`Add ${t.title} latest episode to playlist`,E=t.lastWatched?[o,u]:[o];return s&&E.push(s),(0,ht.jsxs)("article",{className:`${r}-watch-item`,"data-state":i,"data-view":e,children:[(0,ht.jsxs)("div",{className:`${r}-watch-item-poster`,children:[(0,ht.jsx)("a",{className:`${r}-watch-poster-link`,href:p,"aria-label":`Open ${t.title}`,children:t.poster?(0,ht.jsx)("img",{src:t.poster,alt:t.title,loading:"lazy"}):(0,ht.jsx)("div",{className:`${r}-watch-item-poster-placeholder`,children:"TV"})}),(0,ht.jsx)("button",{className:`${r}-poster-icon-button ${r}-poster-check-button`,type:"button",disabled:!t.latestEpisode,"aria-label":v,title:v,onClick:()=>{C1(t.slug)},children:"\u2713"}),(0,ht.jsx)("button",{className:`${r}-poster-icon-button ${r}-poster-playlist-button`,type:"button",disabled:!t.latestEpisode||m,"aria-label":y,title:y,onClick:()=>{t1(t)},children:"+"}),(0,ht.jsx)("button",{className:`${r}-poster-icon-button ${r}-poster-remove-button`,type:"button","aria-label":`Remove ${t.title}`,title:"Remove",onClick:()=>{So(t.slug)},children:"\xD7"}),(0,ht.jsx)("div",{className:`${r}-watch-item-poster-overlay`,children:(0,ht.jsx)("span",{className:`${r}-watch-badge`,"data-state":i,children:d})})]}),(0,ht.jsxs)("div",{className:`${r}-watch-item-body`,children:[(0,ht.jsxs)("div",{children:[(0,ht.jsxs)("a",{className:`${r}-watch-item-title`,href:p,children:[t.title,t.year?` (${t.year})`:""]}),(0,ht.jsx)("p",{className:`${r}-watch-item-copy`,title:E.join(" | "),children:E.join(" | ")})]}),a?(0,ht.jsxs)("a",{className:`${r}-watch-action`,href:a.href,title:a.label,children:[(0,ht.jsx)("span",{"aria-hidden":"true",children:"\u25B6"}),(0,ht.jsx)("span",{className:`${r}-watch-action-label`,children:a.label}),a.detail?(0,ht.jsx)("small",{children:a.detail}):null]}):null]})]})}var C=J(st(),1);function O1(){return(0,C.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,C.jsx)("path",{d:"M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"})})}function R1(){return(0,C.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,C.jsx)("path",{d:"M4 6h3v3H4V6zm5 .5h11v2H9v-2zM4 11h3v3H4v-3zm5 .5h11v2H9v-2zM4 16h3v3H4v-3zm5 .5h11v2H9v-2z"})})}function Ix(){return(0,C.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,C.jsx)("path",{d:"M17.7 6.3A7.9 7.9 0 0 0 12 4a8 8 0 1 0 7.5 10.7l-1.9-.7A6 6 0 1 1 16.3 7.7L13 11h8V3l-3.3 3.3z"})})}function Wx(){return(0,C.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,C.jsx)("path",{d:"M8 5v14l11-7L8 5z"})})}function Px(){return(0,C.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,C.jsx)("path",{d:"M6 6h12v12H6V6z"})})}function z1({id:t,title:e,summary:n,count:l,isOpen:a,onClick:i}){return(0,C.jsxs)("button",{id:`${w}-${t}-fold-button`,className:`${r}-accordion-trigger`,type:"button","aria-expanded":a?"true":"false","aria-controls":`${w}-${t}-fold-panel`,"data-open":a?"true":"false",onClick:i,children:[(0,C.jsxs)("span",{children:[(0,C.jsx)("strong",{children:e}),(0,C.jsx)("small",{children:n})]}),(0,C.jsx)("em",{children:l})]})}function U1(){let[t,e]=(0,kr.useState)("watchlist"),[n,l]=(0,kr.useState)("shows"),[a,i]=(0,kr.useState)("poster"),o=D1(jr()),u=L1(Kd()),s=Vd(Yd()),d=o.filter(c=>c.latestEpisode&&!Fe(c)).length,p=u.filter(c=>!c.watched).length,v=n==="shows",m=t==="watchlist",y=t==="playlist",E=v?o.length?`${o.length} tracked ${o.length===1?"show":"shows"}${d?` | ${d} with a newer latest episode`:""}`:"Add shows from the latest episodes page to start tracking them.":u.length?`${u.length} tracked ${u.length===1?"movie":"movies"}${p?` | ${p} unwatched`:""}`:"Add movies from the movies page or an individual movie page to start tracking them.",_=e1(s),N=a==="list",f=h.playlistSession.active;return(0,C.jsx)("section",{id:`${w}-watchlist-panel`,children:(0,C.jsxs)("div",{className:`${r}-accordion`,children:[(0,C.jsx)(z1,{id:"watchlist",title:"Watchlist",summary:E,count:o.length+u.length,isOpen:m,onClick:()=>{e("watchlist")}}),m?(0,C.jsxs)("div",{id:`${w}-watchlist-fold-panel`,className:`${r}-accordion-panel`,role:"region","aria-labelledby":`${w}-watchlist-fold-button`,children:[(0,C.jsxs)("div",{id:`${w}-watchlist-toolbar`,children:[(0,C.jsxs)("div",{children:[(0,C.jsx)("h3",{id:`${w}-watchlist-title`,children:"Watchlist"}),(0,C.jsxs)("div",{className:`${r}-tabs`,role:"tablist","aria-label":"Watchlist type",children:[(0,C.jsxs)("button",{className:`${r}-tab`,type:"button",role:"tab","aria-selected":v?"true":"false","data-active":v?"true":"false",onClick:()=>{l("shows")},children:["TV Shows",d>0?(0,C.jsx)("span",{children:d}):null]}),(0,C.jsxs)("button",{className:`${r}-tab`,type:"button",role:"tab","aria-selected":v?"false":"true","data-active":v?"false":"true",onClick:()=>{l("movies")},children:["Movies",p>0?(0,C.jsx)("span",{children:p}):null]})]})]}),(0,C.jsxs)("div",{className:`${r}-watchlist-toolbar-actions`,children:[(0,C.jsx)("button",{className:`${r}-button ${r}-toolbar-icon-button ${r}-view-toggle`,type:"button","aria-pressed":N?"true":"false","aria-label":N?"Switch to poster view":"Switch to list view",title:N?"Switch to poster view":"Switch to list view",onClick:()=>{i(N?"poster":"list")},children:N?(0,C.jsx)(O1,{}):(0,C.jsx)(R1,{})}),v?(0,C.jsx)("button",{id:`${w}-watchlist-refresh`,className:`${r}-button ${r}-toolbar-icon-button`,type:"button",disabled:h.watchlistBusy,"aria-label":"Refresh watchlist",title:"Refresh watchlist",onClick:()=>{yn({force:!0})},children:(0,C.jsx)(Ix,{})}):null]})]}),(0,C.jsx)(N1,{type:v?"shows":"movies"}),v?(0,C.jsx)("div",{id:`${w}-watchlist-status`,"data-tone":h.watchlistMessageTone,children:h.watchlistBusy?h.watchlistMessage||"Refreshing watchlist...":h.watchlistMessage||""}):null,(0,C.jsx)("div",{id:`${w}-watchlist-list`,"data-view":a,children:v&&o.length?o.map(c=>(0,C.jsx)(A1,{entry:c,viewMode:a},c.slug)):!v&&u.length?u.map(c=>(0,C.jsx)(S1,{entry:c,viewMode:a},c.slug)):(0,C.jsx)("div",{className:`${r}-watch-empty`,children:v?"On the /shows page or an individual show page, use the watchlist button to add that show here.":"On the /movies page or an individual movie page, use the movie watchlist button to add a movie here."})})]}):null,(0,C.jsx)(z1,{id:"playlist",title:"Playlist",summary:_,count:s.length,isOpen:y,onClick:()=>{e("playlist")}}),y?(0,C.jsxs)("div",{id:`${w}-playlist-fold-panel`,className:`${r}-accordion-panel`,role:"region","aria-labelledby":`${w}-playlist-fold-button`,children:[(0,C.jsxs)("div",{id:`${w}-playlist-toolbar`,children:[(0,C.jsx)("h3",{id:`${w}-playlist-title`,children:"Playlist"}),(0,C.jsxs)("div",{className:`${r}-watchlist-toolbar-actions`,children:[(0,C.jsx)("button",{className:`${r}-button ${r}-toolbar-icon-button ${r}-playlist-play-button`,type:"button",disabled:!s.length,"aria-label":f?"Stop playlist playback":"Play playlist",title:f?"Stop playlist playback":"Play playlist","data-active":f?"true":"false",onClick:()=>{f?Ga():mo()},children:f?(0,C.jsx)(Px,{}):(0,C.jsx)(Wx,{})}),(0,C.jsx)("button",{className:`${r}-button ${r}-toolbar-icon-button ${r}-view-toggle`,type:"button","aria-pressed":N?"true":"false","aria-label":N?"Switch to poster view":"Switch to list view",title:N?"Switch to poster view":"Switch to list view",onClick:()=>{i(N?"poster":"list")},children:N?(0,C.jsx)(O1,{}):(0,C.jsx)(R1,{})})]})]}),(0,C.jsx)("div",{id:`${w}-playlist-list`,"data-view":a,children:s.length?s.map(c=>(0,C.jsx)(T1,{entry:c,viewMode:a,isActive:h.playlistSession.currentKey===c.key},c.key)):(0,C.jsx)("div",{className:`${r}-watch-empty`,children:"Add a latest show episode from a watchlist poster or list item."})})]}):null]})})}var T=J(st(),1);function Fx(t){return Array.from(document.querySelectorAll("a, button")).find(e=>Uo(e)?t.test(Um(e)):!1)}function t2(){let t=Fx(/\bsign\s*up\b|\bsignup\b|\bregister\b/i);if(t){let n=t.closest("li");return n?.parentElement?{parent:n.parentElement,before:n.nextSibling,sourceItem:n}:{parent:t.parentElement,before:t.nextSibling,sourceItem:null}}let e=document.querySelector("header, nav, .navbar, .main-header, .header");return e?{parent:e,before:null,sourceItem:null}:null}function e2(t){for(let e=t;e&&e!==document.body;e=e.parentElement){let n=getComputedStyle(e).position;if(n==="fixed"||n==="sticky")return!0}return!1}function n2(){let t=t2(),e=t?.parent;if(!t||!e||e2(e))return null;let n=document.getElementById(`${w}-launcher-host`);return n&&n.tagName!=="LI"&&(n.remove(),n=null),n||(n=document.createElement("li"),n.id=`${w}-launcher-host`),t.sourceItem&&n.className!==t.sourceItem.className&&(n.className=t.sourceItem.className),t.before!==n&&(n.parentElement!==e||n.nextSibling!==t.before)&&e.insertBefore(n,t.before),n}function $1(){return(0,T.jsxs)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[(0,T.jsx)("path",{d:"M8 6.5v11l8.5-5.5L8 6.5z"}),(0,T.jsx)("path",{d:"M16.5 4.5a7.5 7.5 0 0 1 3.2 9.4l1.6.7A9.3 9.3 0 0 0 17.2 3l-.7 1.5zM7.5 19.5a7.5 7.5 0 0 1-3.2-9.4l-1.6-.7A9.3 9.3 0 0 0 6.8 21l.7-1.5z"}),(0,T.jsx)("path",{d:"M19.4 15.2 22 15l-1.5 2.2-1.1-2zM4.6 8.8 2 9l1.5-2.2 1.1 2z"})]})}function H1(){return(0,T.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,T.jsx)("path",{d:"M5 10V5h5v2H7v3H5zm9-5h5v5h-2V7h-3V5zM7 14v3h3v2H5v-5h2zm10 0h2v5h-5v-2h3v-3z"})})}function l2(){return(0,T.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,T.jsx)("path",{d:"M3 5h18v14H3V5zm2 2v10h14V7H5zm2 2h4v2H9v2H7V9zm10 6h-4v-2h2v-2h2v4z"})})}function a2(){return(0,T.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,T.jsx)("path",{d:"M4 4h7v7H4V4zm9 0h7v4h-7V4zm0 6h7v10h-7V10zM4 13h7v7H4v-7z"})})}function i2(){return(0,T.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,T.jsx)("path",{d:"M5 6v12l8.5-6L5 6zm9 0v12h2V6h-2zm3 0v12h2V6h-2z"})})}function o2(){return(0,T.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,T.jsx)("path",{d:"M4 6v12l7-6-7-6zm7 0v12l7-6-7-6zm8 0h2v12h-2V6z"})})}function B1(){return(0,T.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,T.jsx)("path",{d:"M7.1 14.9a7 7 0 0 1 9.8 0l-1.4 1.4a5 5 0 0 0-7 0l-1.4-1.4zm-3.5-3.5a12 12 0 0 1 16.8 0L19 12.8a10 10 0 0 0-14 0l-1.4-1.4zm7 7a2 2 0 0 1 2.8 0L12 19.8l-1.4-1.4zM8 4h8v2H8V4z"})})}function u2(){return(0,T.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,T.jsx)("path",{d:"M12 2.8 14.3 8l5.7.6-4.3 3.8 1.2 5.6-4.9-2.9L7.1 18l1.2-5.6L4 8.6 9.7 8 12 2.8z"})})}function Y1(){let[t,e]=(0,Wt.useState)(!1),[n,l]=(0,Wt.useState)(null),[a,i]=(0,Wt.useState)(()=>window.scrollY>120),[o,u]=(0,Wt.useState)(!1),s=(0,Wt.useRef)(0),[,d]=(0,Wt.useState)(0);(0,Wt.useEffect)(()=>$v(()=>{d(f=>f+1)}),[]),(0,Wt.useEffect)(()=>{function f(c){c.key==="Escape"&&e(!1)}return window.addEventListener("keydown",f),()=>{window.removeEventListener("keydown",f)}},[]),(0,Wt.useEffect)(()=>{let f=0;function c(){let b=n2();l(x=>x===b?x:b),f+=1,(b||f>40)&&window.clearInterval(g)}let g=window.setInterval(c,500);return c(),()=>{window.clearInterval(g)}},[]),(0,Wt.useEffect)(()=>{function f(){i(window.scrollY>120)}return f(),window.addEventListener("scroll",f,{passive:!0}),()=>{window.removeEventListener("scroll",f)}},[]),(0,Wt.useEffect)(()=>()=>{window.clearTimeout(s.current)},[]);function p(){e(!0)}function v(){window.clearTimeout(s.current),u(!0)}function m(){window.clearTimeout(s.current),s.current=window.setTimeout(()=>{u(!1)},240)}function y(f){el({...h.settings,[f]:!h.settings[f]})}function E(f,c){el({...h.settings,[f]:c})}let _=a?null:n,N=(0,T.jsxs)("div",{id:`${w}-launcher`,"data-hosted":_?"true":"false","data-scrolled":a?"true":"false","data-quick-open":o?"true":"false",onMouseEnter:v,onMouseLeave:m,onFocus:v,onBlur:f=>{f.currentTarget.contains(f.relatedTarget)||m()},children:[(0,T.jsxs)("button",{id:`${w}-button`,type:"button","aria-label":"Open LookMovie2 Enhancer","aria-haspopup":"dialog","aria-expanded":t?"true":"false",title:"Open enhancer",onClick:()=>{t?e(!1):p()},children:[(0,T.jsx)("span",{id:`${w}-button-icon`,children:(0,T.jsx)(u2,{})}),(0,T.jsx)("span",{id:`${w}-button-label`,children:"Enhancer"})]}),(0,T.jsxs)("div",{id:`${w}-quick-settings`,role:"toolbar","aria-label":"Quick playback settings",children:[(0,T.jsx)("button",{className:`${r}-quick-setting`,type:"button","aria-label":"Toggle auto play",title:"Toggle auto play","data-enabled":h.settings.autoPlay?"true":"false",onClick:f=>{f.stopPropagation(),y("autoPlay")},children:(0,T.jsx)($1,{})}),(0,T.jsx)("button",{className:`${r}-quick-setting`,type:"button","aria-label":"Toggle auto fullscreen",title:"Toggle auto fullscreen","data-enabled":h.settings.autoFullscreen?"true":"false",onClick:f=>{f.stopPropagation(),y("autoFullscreen")},children:(0,T.jsx)(H1,{})}),(0,T.jsx)("button",{className:`${r}-quick-setting`,type:"button","aria-label":"Toggle ntfy remote",title:"Toggle ntfy remote","data-enabled":h.settings.ntfyRemoteEnabled?"true":"false",onClick:f=>{f.stopPropagation(),y("ntfyRemoteEnabled")},children:(0,T.jsx)(B1,{})})]})]});return(0,T.jsxs)(T.Fragment,{children:[_?(0,q1.createPortal)(N,_):N,(0,T.jsx)("div",{id:`${w}-overlay`,"aria-hidden":t?"false":"true",className:t?`${r}-open`:"",onClick:f=>{f.target===f.currentTarget&&e(!1)},children:(0,T.jsxs)("div",{id:`${w}-modal`,role:"dialog","aria-modal":"true","aria-labelledby":`${w}-title`,children:[(0,T.jsxs)("div",{id:`${w}-header`,children:[(0,T.jsxs)("div",{children:[(0,T.jsx)("h2",{id:`${w}-title`,children:"LookMovie2 Enhancer"}),(0,T.jsx)("p",{id:`${w}-subtitle`,children:"Playback helpers plus a personal show watchlist with latest episode tracking."})]}),(0,T.jsx)("button",{id:`${w}-close`,type:"button","aria-label":"Close settings",onClick:()=>{e(!1)},children:"\xD7"})]}),(0,T.jsxs)("div",{id:`${w}-content`,children:[(0,T.jsxs)("section",{id:`${w}-settings-panel`,children:[(0,T.jsx)("h3",{id:`${w}-settings-title`,children:"Playback Tools"}),(0,T.jsxs)("div",{id:`${w}-settings`,children:[(0,T.jsx)(ll,{settingKey:"autoPlay",title:"Auto play",copy:"Clicks the resume or start button when the playback modal appears.",icon:(0,T.jsx)($1,{})}),(0,T.jsx)(ll,{settingKey:"autoFullscreen",title:"Auto fullscreen",copy:"Clicks the player's fullscreen button after playback starts.",icon:(0,T.jsx)(H1,{})}),(0,T.jsx)(ll,{settingKey:"windowedFullscreen",title:"Windowed fullscreen",copy:"Stretches the player over the page when the browser blocks real fullscreen, e.g. after auto play or a remote command.",icon:(0,T.jsx)(l2,{})}),(0,T.jsx)(ll,{settingKey:"siteTheme",title:"Site UI polish",copy:"Wider layout, responsive poster grids, a calmer background and no premium upsell links.",icon:(0,T.jsx)(a2,{})}),(0,T.jsx)(ll,{settingKey:"autoNextEpisode",title:"Auto next episode",copy:"Counts down and plays the next episode when one ends, outside playlist mode.",icon:(0,T.jsx)(i2,{})}),(0,T.jsx)(ll,{settingKey:"autoSkipIntro",title:"Auto skip intros",copy:"Jumps past an intro you marked for that show. Off shows a Skip intro button instead.",icon:(0,T.jsx)(o2,{})}),(0,T.jsx)(ll,{settingKey:"ntfyRemoteEnabled",title:"Android remote",copy:"Publishes a player notification to ntfy with Android action buttons.",icon:(0,T.jsx)(B1,{})}),(0,T.jsxs)("div",{className:`${r}-setting ${r}-setting-stack`,children:[(0,T.jsxs)("div",{children:[(0,T.jsx)("p",{className:`${r}-setting-title`,children:"ntfy topics"}),(0,T.jsx)("p",{className:`${r}-setting-copy`,children:"The phone subscribes to the display topic; the browser listens on the control topic. Use only letters, numbers, hyphens, and underscores."})]}),(0,T.jsxs)("label",{className:`${r}-field`,children:[(0,T.jsx)("span",{children:"Server"}),(0,T.jsx)("input",{type:"url",value:h.settings.ntfyServer,placeholder:"https://ntfy.sh",onChange:f=>{E("ntfyServer",f.currentTarget.value)}})]}),(0,T.jsxs)("label",{className:`${r}-field`,children:[(0,T.jsx)("span",{children:"Display topic"}),(0,T.jsx)("input",{type:"text",value:h.settings.ntfyTopic,maxLength:64,pattern:"[A-Za-z0-9_-]{1,64}",placeholder:"random-private-topic",onChange:f=>{E("ntfyTopic",f.currentTarget.value)}})]}),(0,T.jsxs)("label",{className:`${r}-field`,children:[(0,T.jsx)("span",{children:"Control topic"}),(0,T.jsx)("input",{type:"text",value:h.settings.ntfyControlTopic,maxLength:64,pattern:"[A-Za-z0-9_-]{1,64}",placeholder:"display-topic-controls",onChange:f=>{E("ntfyControlTopic",f.currentTarget.value)}})]}),(0,T.jsxs)("label",{className:`${r}-field`,children:[(0,T.jsx)("span",{children:"Command secret"}),(0,T.jsx)("input",{type:"password",value:h.settings.ntfyCommandSecret,placeholder:"optional shared command prefix",onChange:f=>{E("ntfyCommandSecret",f.currentTarget.value)}})]}),(0,T.jsx)("p",{className:`${r}-ntfy-status`,"data-status":h.ntfyRemoteStatus,children:h.ntfyRemoteMessage||`Remote status: ${h.ntfyRemoteStatus}`})]}),(0,T.jsx)(p1,{})]}),(0,T.jsx)("div",{id:`${w}-footer`,children:"Settings and watchlist data are saved in Tampermonkey storage on this browser."})]}),(0,T.jsx)(U1,{})]})]})})]})}var k1=J(st(),1),Zd=null;function r2(){if(!document.head||document.getElementById(ms))return;let t=document.createElement("style");t.id=ms,t.textContent=Hv(),document.head.appendChild(t)}function Jd(){if(r2(),!document.body)return;let t=document.getElementById(w);t||(t=document.createElement("div"),t.id=w,document.body.appendChild(t)),Zd||(Zd=(0,V1.createRoot)(t),Zd.render((0,k1.jsx)(Y1,{})))}function nl(){ka()}function Rt(){ka()}function Wv(){ka()}var wo=null;function Kd(){return Object.values(h.movieWatchlistStore.movies)}function vn(t){return t&&h.movieWatchlistStore.movies[t]||null}function L1(t){return[...t].sort((e,n)=>e.watched!==n.watched?e.watched?1:-1:e.title.localeCompare(n.title))}function Qa(){tp(h.movieWatchlistStore),Rt(),nl(),Ll(),Eo()}function s2(t){return!(!t||typeof t.poster!="string"||!t.poster.trim()||t.poster.trim().startsWith("data:image/"))}function c2(t){let e=/(?:var\s+|window\.)movie_storage\s*=\s*(\{[\s\S]*?\})\s*;/.exec(t);if(!e)return{};try{return Do(JSON.parse(e[1]??""))}catch(n){return console.warn(`[${r}] Failed to parse movie_storage metadata.`,n),{}}}async function j1(t,e){let n=await kl(`/movies/view/${t}`),l=c2(n),a=/id_movie:\s*(\d+)/.exec(n),i=/title:\s*'((?:\\'|[^'])*)'/.exec(n),o=/year:\s*'((?:\\'|[^'])*)'/.exec(n),u=/poster_medium:\s*'((?:\\'|[^'])*)'/.exec(n),s=typeof l.movie_poster=="string"&&l.movie_poster?l.movie_poster:typeof l.poster_medium=="string"&&l.poster_medium?l.poster_medium:typeof l.poster=="string"?l.poster:"";return{slug:t,idMovie:typeof l.id_movie=="number"?l.id_movie:a?parseInt(a[1]??"",10):0,title:typeof l.title=="string"&&l.title.trim()?l.title.trim():i?de(i[1]).trim():e?.title?e.title:t,year:typeof l.year=="string"||typeof l.year=="number"?String(l.year):o?de(o[1]).trim():e?.year?e.year:"",poster:at(s)||(u?at(de(u[1])):"")||(e?.poster?at(e.poster):"")}}async function po(){if(wo)return wo;let t=Kd().filter(e=>!s2(e)||!e.idMovie);if(t.length)return wo=(async()=>{let e=!1;for(let n of t)try{let l=await j1(n.slug,n);l.idMovie&&l.idMovie!==n.idMovie&&(n.idMovie=l.idMovie,e=!0),l.title&&l.title!==n.title&&(n.title=l.title,e=!0),l.year&&l.year!==n.year&&(n.year=l.year,e=!0),l.poster&&l.poster!==n.poster&&(n.poster=l.poster,e=!0)}catch(l){console.warn(`[${r}] Failed to refresh movie metadata for ${n.slug}.`,l)}e&&Qa()})().finally(()=>{wo=null}),wo}function vo(t){if(!t?.slug)return;let{slug:e}=t,n={slug:t.slug,title:t.title||t.slug,year:t.year||"",poster:t.poster||"",idMovie:t.idMovie||0};j1(e,t).then(l=>{l.title&&(n.title=l.title),l.year&&(n.year=l.year),l.poster&&(n.poster=l.poster),l.idMovie&&(n.idMovie=l.idMovie);let a=li(e,{slug:e,title:n.title,year:n.year,poster:n.poster,idMovie:n.idMovie,href:t.href||`/movies/view/${e}`,addedAt:Date.now(),watched:!1});a&&(h.movieWatchlistStore.movies[e]=a),Qa(),Rt()})}function go(t){vn(t)&&(delete h.movieWatchlistStore.movies[t],Qa())}function w1(t){let e=vn(t);e&&(e.watched=!e.watched,e.watchedAt=e.watched?Date.now():void 0,Qa())}function Hl(){return!!document.body}function Xr(t){return me({season:t.dataset.season,episode:t.dataset.episode,idEpisode:t.dataset.idEpisode})}function G1(t){try{let e=new URL(t,location.origin);return/\/shows\/view\/([^/?#]+)/i.exec(e.pathname)?.[1]??""}catch{return""}}function f2(t){try{let e=new URL(t,location.origin),n=tt(e.searchParams.get("season")),l=tt(e.searchParams.get("episode")),a=tt(e.searchParams.get("id_episode"));return!n||!l||!a?null:{season:n,episode:l,idEpisode:a}}catch{return null}}function Gr(t){return(typeof t=="string"?/-(\d{4})$/.exec(t):null)?.[1]??""}function Q1(t){try{let e=new URL(t,location.origin);return/\/movies\/view\/([^/?#]+)/i.exec(e.pathname)?.[1]??""}catch{return""}}function xo(t){if(!t)return null;let e=t.querySelector('a[href*="/shows/view/"]');if(!e)return null;let n=e.getAttribute("href")??"",l=G1(n);if(!l)return null;let a=t.querySelector(".mv-item-infor h6"),i=t.querySelector("img[data-src], img[src]"),o=f2(n);return{slug:l,title:a?(a.textContent??"").trim():l,year:Gr(l),poster:En(i),href:new URL(n,location.origin).href,episode:o}}function M1(t,e){return t?e?`/shows/view/${t}?season=${e.season}&episode=${e.episode}&id_episode=${e.idEpisode}`:`/shows/view/${t}`:"/shows"}function Dl(t,e){return t?e?`/shows/play/${t}#S${e.season}-E${e.episode}-${e.idEpisode}`:`/shows/view/${t}`:"/shows"}function Vr(t){return t?`/movies/view/${t}`:"/movies"}function To(){return location.pathname==="/shows"}function K1(){return location.pathname.startsWith("/shows/view/")}function qd(){return location.pathname.startsWith("/movies/play/")}function Z1(){return location.pathname.startsWith("/movies/view/")}function d2(){if(!K1())return null;let t=wn("show_storage"),e=typeof t.slug=="string"&&t.slug?t.slug:G1(location.href);if(!e)return null;let n=document.querySelector(".movie-single-ct h1")||document.querySelector(".movie-single-ct h2")||document.querySelector(".internal-page-container h1")||document.querySelector(".internal-page-container h2"),l=document.querySelector('.movie__poster[style*="background-image"]')||document.querySelector(".movie__poster[data-background-image]")||document.querySelector(".movie-single-ct img[data-src], .movie-single-ct img[src]")||document.querySelector(".internal-page-container img[data-src], .internal-page-container img[src]"),a=document.querySelector('meta[property="og:image"]'),i=new URLSearchParams(location.search),o=me({season:i.get("season"),episode:i.get("episode"),idEpisode:i.get("id_episode")});return{slug:e,title:typeof t.title=="string"&&t.title.trim()?t.title.trim():n?(n.textContent??"").replace(/\s*\d{4}\s*$/,"").trim():e,year:typeof t.year=="string"||typeof t.year=="number"?String(t.year):Gr(e),poster:typeof t.poster_medium=="string"&&t.poster_medium?t.poster_medium:En(l)||a?.getAttribute("content")||"",idShow:tt(t.id_show),episode:o}}function m2(t){if(!t)return null;let e=t.querySelector('a[href*="/movies/view/"]');if(!e)return null;let n=e.getAttribute("href")??"",l=Q1(n);if(!l)return null;let a=t.querySelector(".slide-item__title, .mv-item-infor h6, h6, h5, .title"),i=t.querySelector("img[data-src-portrait], img[data-src], img[src]"),o=t.querySelector('[data-background-image], [style*="background-image"], [data-src-portrait], [data-src]'),u=t.querySelector(".year"),s=a?(a.textContent??"").trim():"",d=/\((\d{4})\)/.exec(s),p=En(i)||En(o);return{slug:l,title:s?s.replace(/\s*\(\d{4}\)\s*$/,"").trim():l,year:u?(u.textContent??"").trim():d?.[1]||Gr(l),poster:p,href:new URL(n,location.origin).href}}function p2(){if(!Z1())return null;let t=Q1(location.href);if(!t)return null;let e=wn("movie_storage","movie"),n=document.querySelector(".movie-single-ct h1")||document.querySelector(".movie-single-ct h2")||document.querySelector(".internal-page-container h1")||document.querySelector(".internal-page-container h2"),l=document.querySelector('.movie__poster[data-background-image], .movie__poster[style*="background-image"], .movie-single-ct img[data-src], .movie-single-ct img[src], .internal-page-container img[data-src], .internal-page-container img[src]'),a=document.querySelector('meta[property="og:image"]');return{slug:t,title:typeof e.title=="string"&&e.title.trim()?e.title.trim():n?(n.textContent??"").trim():t,year:typeof e.year=="string"||typeof e.year=="number"?String(e.year):Gr(t),poster:at(typeof e.movie_poster=="string"&&e.movie_poster?e.movie_poster:typeof e.poster_medium=="string"&&e.poster_medium?e.poster_medium:"")||En(l)||at(a?.getAttribute("content")||""),href:location.href}}function Id(t){let e=t.dataset.watchlistSlug||"",n=Ie(e),l=Xr(t),a="add",i="+ Watch",o="Add this show to your watchlist";if(n){let u=l&&(!n.lastWatched||Pe(l,n.lastWatched)>0);a=u?"watching-new":"watching",i="Watching",o=u?"This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.":"This show is already in your watchlist. Click to remove it."}t.dataset.state!==a&&(t.dataset.state=a),t.textContent!==i&&(t.textContent=i),t.title!==o&&(t.title=o),t.disabled&&(t.disabled=!1)}function il(){document.querySelectorAll(`.${r}-episode-watch-button`).forEach(t=>{Id(t)})}function Wd(t){let e=t.dataset.watchlistSlug||"",n=Ie(e),l=Xr(t);if(!n){t.dataset.state="add",t.textContent="+ Add To Watchlist",t.title="Add this show to your watchlist",t.disabled=!1;return}let a=l&&(!n.lastWatched||Pe(l,n.lastWatched)>0);t.dataset.state=a?"watching-new":"watching",t.textContent=a?"Watching: New Episode":"Watching",t.title=a?"This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.":"This show is already in your watchlist. Click to remove it.",t.disabled=!1}function _o(){document.querySelectorAll(`.${r}-show-view-watch-button`).forEach(t=>{Wd(t)})}function Pd(t){let e=t.dataset.watchlistSlug||"",n=vn(e);if(!n){t.dataset.state="add",t.textContent="+ Movie",t.title="Add this movie to your watchlist",t.disabled=!1;return}t.dataset.state=n.watched?"watching":"watching-new",t.textContent=n.watched?"Watched":"Movie List",t.title=n.watched?"This movie is marked watched. Click to remove it from your movie watchlist.":"This movie is in your movie watchlist. Click to remove it.",t.disabled=!1}function Ll(){document.querySelectorAll(`.${r}-movie-watch-button`).forEach(t=>{Pd(t)})}function Fd(t){let e=t.dataset.watchlistSlug||"",n=vn(e);if(!n){t.dataset.state="add",t.textContent="+ Add Movie To Watchlist",t.title="Add this movie to your watchlist",t.disabled=!1;return}t.dataset.state=n.watched?"watching":"watching-new",t.textContent=n.watched?"Movie Watched":"In Movie Watchlist",t.title=n.watched?"This movie is marked watched. Click to remove it from your movie watchlist.":"This movie is in your movie watchlist. Click to remove it.",t.disabled=!1}function Eo(){document.querySelectorAll(`.${r}-movie-view-watch-button`).forEach(t=>{Fd(t)})}function J1(t,e="auto"){return!t?.slug||!t.episode?null:{slug:t.slug,title:t.title||t.slug,href:t.href||"",episode:t.episode,seenAt:Date.now(),source:e}}function I1(t,e){return!!t&&!!e&&t.slug===e.slug&&Ss(t.episode,e.episode)}function tm(t){return Array.from(document.querySelectorAll(".episode-item")).indexOf(t)}function em(){if(!Hl()||!To())return;document.querySelectorAll(`.episode-item.${r}-shows-list-marker`).forEach(e=>{e.classList.remove(`${r}-shows-list-marker`),e.removeAttribute("data-lookmovie-list-marker")}),h.showsListProgressOrder=-1;let t=h.showsListProgress;t&&document.querySelectorAll(".episode-item").forEach(e=>{let n=xo(e);I1(n,t)&&(e.classList.add(`${r}-shows-list-marker`),e.dataset.lookmovieListMarker="true",h.showsListProgressOrder=tm(e))})}function W1(t){let e=xo(t.closest(".episode-item")),n=I1(e,h.showsListProgress),l=n?"current":"set",a=n?"Bookmarked":"Set bookmark",i=n?"This is the current shows-page bookmark.":"Set the yellow shows-page bookmark here.";t.dataset.state!==l&&(t.dataset.state=l),t.textContent!==a&&(t.textContent=a),t.title!==i&&(t.title=i)}function h2(){document.querySelectorAll(`.${r}-shows-list-marker-button`).forEach(t=>{W1(t)})}function g2(t){let e=J1(xo(t),"manual");e&&(h.showsListProgress=e,h.showsListProgressOrder=tm(t),h.showsListSeenCandidate=null,h.showsListSeenCandidateOrder=-1,h.showsListManualMarkerSet=!0,_s(e),em(),h2())}function y2(){if(h.showsListManualMarkerSet||h.showsListProgress?.source==="manual")return;let t=ko(h.showsListSeenCandidate);t&&(h.showsListProgress&&!h.showsListSessionTouched&&(h.showsListProgressOrder<0||h.showsListSeenCandidateOrder<h.showsListProgressOrder)||(h.showsListProgress=t,_s(t),em()))}function Qr(t){t?.persist&&y2(),h.showsListObserver&&h.showsListObserver.disconnect(),h.showsListMutationObserver&&h.showsListMutationObserver.disconnect(),h.showsListObserver=null,h.showsListMutationObserver=null,h.showsListRefreshScheduled=!1,h.showsListObservedCards=new WeakSet,h.showsListSeenCandidate=null,h.showsListSeenCandidateOrder=-1,h.showsListSessionTouched=!1,h.showsListManualMarkerSet=!1}function v2(t){let e=xo(t),n=J1(e);if(!n)return;let l=tm(t);l<h.showsListSeenCandidateOrder||(h.showsListSeenCandidate=n,h.showsListSeenCandidateOrder=l)}function P1(){let t=h.showsListObserver;!Hl()||!To()||!t||(em(),document.querySelectorAll(".episode-item").forEach(e=>{h.showsListObservedCards.has(e)||(h.showsListObservedCards.add(e),t.observe(e))}))}function b2(){h.showsListRefreshScheduled||(h.showsListRefreshScheduled=!0,window.setTimeout(()=>{h.showsListRefreshScheduled=!1,P1()},150))}function Kr(){if(!(!Hl()||!To()||typeof IntersectionObserver!="function")){if(h.showsListObserver||(h.showsListObserver=new IntersectionObserver(t=>{t.filter(e=>e.isIntersecting).forEach(e=>{v2(e.target)})},{threshold:.55})),!h.showsListMutationObserver){let t=new MutationObserver(()=>{b2()});h.showsListMutationObserver=t,t.observe(document.body,{childList:!0,subtree:!0})}P1()}}function F1(){To()&&(h.showsListSessionTouched=!0)}function S2(t){let e=t.querySelector(`.${r}-episode-card-title`),n=t.querySelector(".mv-item-infor h5");if(e||!n)return e;let l=document.createElement("p");return l.className=`${r}-episode-card-title`,n.after(l),l}function X1(t,e){let n=S2(t),l=jl(e.idEpisode);n&&n.textContent!==l&&(n.textContent=l,n.setAttribute("title",l))}function w2(t,e){let{episode:n}=e;n&&(X1(t,n),!jl(n.idEpisode)&&Go(e.slug,[n]).then(()=>{jl(n.idEpisode)?X1(t,n):t.querySelector(`.${r}-episode-card-title`)?.remove()}))}function Zr(){!Hl()||!To()||document.querySelectorAll(".episode-item").forEach(t=>{let e=xo(t);if(!e)return;let n=t.querySelector(`.${r}-episode-watch-button`);if(!n){let a=document.createElement("button");n=a,a.type="button",a.className=`${r}-episode-watch-button`,t.appendChild(a);let i=async o=>{o.preventDefault(),o.stopPropagation();let u=a.dataset.watchlistSlug;if(u){if(Ie(u)){So(u);return}a.dataset.state="adding",a.textContent="Adding...",a.disabled=!0,await bo({slug:u,title:a.dataset.title||u,year:a.dataset.year||"",poster:a.dataset.poster||"",episode:Xr(a)}),Id(a)}};a.addEventListener("click",o=>{i(o)})}n.dataset.watchlistSlug=e.slug,n.dataset.title=e.title,n.dataset.year=e.year,n.dataset.poster=e.poster,e.episode&&(n.dataset.season=String(e.episode.season),n.dataset.episode=String(e.episode.episode),n.dataset.idEpisode=String(e.episode.idEpisode)),Id(n),w2(t,e);let l=t.querySelector(`.${r}-shows-list-marker-button`);l||(l=document.createElement("button"),l.type="button",l.className=`${r}-shows-list-marker-button`,t.appendChild(l),l.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation(),g2(t)})),W1(l)})}function nm(){if(!Hl()||!K1())return;let t=d2();if(!t)return;let e=document.querySelector(".watch-heading")||document.querySelector(".movie-single-ct.main-content")||document.querySelector(".internal-page-container");if(!e)return;let n=document.querySelector(`.${r}-show-view-watch-wrap`);n||(n=document.createElement("div"),n.className=`${r}-show-view-watch-wrap`,e.appendChild(n));let l=n.querySelector(`.${r}-show-view-watch-button`);if(!l){let a=document.createElement("button");l=a,a.type="button",a.className=`${r}-show-view-watch-button`,n.appendChild(a);let i=async()=>{let o=a.dataset.watchlistSlug;if(o){if(Ie(o)){So(o);return}a.dataset.state="adding",a.textContent="Adding...",a.disabled=!0,await bo({slug:o,title:a.dataset.title||o,year:a.dataset.year||"",poster:a.dataset.poster||"",episode:Xr(a)}),Wd(a)}};a.addEventListener("click",()=>{i()})}l.dataset.watchlistSlug=t.slug,l.dataset.title=t.title,l.dataset.year=t.year,l.dataset.poster=t.poster,t.episode?(l.dataset.season=String(t.episode.season),l.dataset.episode=String(t.episode.episode),l.dataset.idEpisode=String(t.episode.idEpisode)):(delete l.dataset.season,delete l.dataset.episode,delete l.dataset.idEpisode),Wd(l)}function co(){!Hl()||qd()||document.querySelectorAll('a[href*="/movies/view/"]').forEach(t=>{let e=t.closest(".slide-item")||t.closest(".movie-item")||t.closest(".mv-item")||t.closest(".movie-item-style-2")||t.closest(".slide-item__backdrop--wrapper")||t.closest(".item")||t.parentElement,n=m2(e);if(!n||!e)return;let l=e.querySelector(".slide-item__buttons")||e.querySelector(".image__placeholder")||e,a=l.querySelector(`.${r}-movie-watch-button`);if(!a){let i=document.createElement("button");a=i,i.type="button",i.className=`${r}-movie-watch-button ${r}-episode-watch-button`,l.appendChild(i),getComputedStyle(l).position==="static"&&(l.style.position="relative"),i.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation();let u=i.dataset.watchlistSlug;if(u){if(vn(u)){go(u);return}vo({slug:u,title:i.dataset.title||u,year:i.dataset.year||"",poster:i.dataset.poster||"",href:i.dataset.href||Vr(u)}),Pd(i)}})}a.dataset.watchlistSlug=n.slug,a.dataset.title=n.title,a.dataset.year=n.year,a.dataset.poster=n.poster,a.dataset.href=n.href,Pd(a)})}function lm(){if(!Hl()||!Z1())return;let t=p2();if(!t)return;let e=document.querySelector(".watch-heading")||document.querySelector(".movie-single-ct.main-content")||document.querySelector(".internal-page-container");if(!e)return;let n=document.querySelector(`.${r}-movie-view-watch-wrap`);n||(n=document.createElement("div"),n.className=`${r}-show-view-watch-wrap ${r}-movie-view-watch-wrap`,e.appendChild(n));let l=n.querySelector(`.${r}-movie-view-watch-button`);if(!l){let a=document.createElement("button");l=a,a.type="button",a.className=`${r}-show-view-watch-button ${r}-movie-view-watch-button`,n.appendChild(a),a.addEventListener("click",()=>{let i=a.dataset.watchlistSlug;if(i){if(vn(i)){go(i);return}vo({slug:i,title:a.dataset.title||i,year:a.dataset.year||"",poster:a.dataset.poster||"",href:a.dataset.href||Vr(i)}),Fd(a)}})}l.dataset.watchlistSlug=t.slug,l.dataset.title=t.title,l.dataset.year=t.year,l.dataset.poster=t.poster,l.dataset.href=t.href,Fd(l)}function jr(){return Object.values(h.watchlistStore.shows)}function Ie(t){return t&&h.watchlistStore.shows[t]||null}function E2(t){return t&&jr().find(e=>e.idShow===t)||null}function D1(t){return[...t].sort((e,n)=>{let l=e.latestEpisode?Fe(e)?1:0:2,a=n.latestEpisode?Fe(n)?1:0:2;return l!==a?l-a:e.title.localeCompare(n.title)})}function x2(t,e){return t?!t.idShow||!t.latestEpisode||!t.upcoming?!0:!t.lastSyncedAt||e-t.lastSyncedAt>=Tm:!1}function $l(){Fm(h.watchlistStore),Rt(),nl(),il(),_o()}function ce(t,e){h.watchlistMessage=t||"",h.watchlistMessageTone=e||"muted",Rt()}async function tb(t,e){let n=await kl(`/shows/view/${t}`),l=/id_show:\s*(\d+)/.exec(n),a=/title:\s*'((?:\\'|[^'])*)'/.exec(n),i=/year:\s*'((?:\\'|[^'])*)'/.exec(n),o=/poster_medium:\s*'((?:\\'|[^'])*)'/.exec(n);return{slug:t,idShow:l?tt(l[1]):0,title:a?de(a[1]).trim():e?.title?e.title:t,year:i?de(i[1]).trim():e?.year?e.year:"",poster:o?de(o[1]).trim():e?.poster?e.poster:""}}async function eb(t){let e=await Vo(`/api/v2/download/episode/list?id=${t}`),n=[];ti(ut(e,"list")).forEach(([i,o])=>{ti(o).forEach(([u,s])=>{let d=me({season:i,episode:u,idEpisode:ut(s,"id_episode")});d&&n.push(d)})}),n.sort(Pe);let l=ut(e,"latest")||null,a=me({season:ut(l,"season"),episode:ut(l,"episode"),idEpisode:ut(l,"id_episode")});return a&&(a.updatedAt=Date.now()),{latestEpisode:a,episodes:n}}function T2(t,e){let n=e?t.findIndex(a=>Pe(a,e)>0):0,l=n<0?[]:t.slice(n);return{afterIdEpisode:e?e.idEpisode:0,total:l.length,episodes:l.slice(0,Mm).map(({season:a,episode:i,idEpisode:o})=>({season:a,episode:i,idEpisode:o}))}}function Qd(t){let e=t?.upcoming;if(!t||!e)return null;let{lastWatched:n}=t,l=n?n.idEpisode:0;if(e.afterIdEpisode===l)return e;if(!n)return null;let a=e.episodes.findIndex(i=>Pe(i,n)>0);return a<0?e.episodes.length===e.total?{afterIdEpisode:l,total:0,episodes:[]}:null:a===0?null:{afterIdEpisode:l,total:e.total-a,episodes:e.episodes.slice(a)}}function nb(t){t.upcoming&&!Qd(t)&&yn({force:!0,slugs:[t.slug]})}async function bo(t){if(!t?.slug)return;let e=Ie(t.slug);if(e){ce(`${e.title} is already in your watchlist.`,"muted"),il();return}ce(`Adding ${t.title||t.slug}...`,"muted");let n={slug:t.slug,idShow:0,title:t.title||t.slug,year:t.year||"",poster:t.poster||""};try{n=await tb(t.slug,t)}catch(a){console.warn(`[${r}] Failed to resolve show metadata for ${t.slug}.`,a)}let l=ni(t.slug,{slug:t.slug,idShow:n.idShow,title:n.title||t.title||t.slug,year:n.year||t.year||"",poster:n.poster||t.poster||"",addedAt:Date.now(),latestEpisode:t.episode||null,lastSyncedAt:0});l&&(h.watchlistStore.shows[t.slug]=l),$l(),ce(`${n.title||t.title||t.slug} added to your watchlist.`,"success"),await yn({force:!0,slugs:[t.slug]})}function So(t){let e=Ie(t);e&&(delete h.watchlistStore.shows[t],$l(),ce(`${e.title} removed from your watchlist.`,"muted"))}function C1(t){let e=Ie(t);e?.latestEpisode&&(Fe(e)?(e.lastWatched=null,ce(`${e.title} marked as having an unwatched latest episode.`,"muted")):(e.lastWatched={...e.latestEpisode,watchedAt:Date.now()},ce(`${e.title} marked watched through ${Lt(e.latestEpisode)}.`,"success")),$l(),nb(e))}async function yn(t){let e=!!t?.force,n=t&&Array.isArray(t.slugs)?new Set(t.slugs):null;if(h.watchlistRefreshPromise)return h.watchlistRefreshPromise;let l=Date.now(),a=jr().filter(i=>n&&!n.has(i.slug)?!1:e||x2(i,l));if(!a.length){Rt(),il();return}return h.watchlistBusy=!0,ce(`Refreshing ${a.length} watchlist ${a.length===1?"show":"shows"}...`,"muted"),h.watchlistRefreshPromise=(async()=>{for(let i of a)try{if(!i.idShow){let s=await tb(i.slug,i);i.idShow=s.idShow,i.title=s.title||i.title,i.year=s.year||i.year,i.poster=s.poster||i.poster}if(!i.idShow)throw new Error("Unable to resolve show id.");let{latestEpisode:o,episodes:u}=await eb(i.idShow);i.latestEpisode=o,i.upcoming=T2(u,i.lastWatched),i.lastSyncError="",i.lastSyncedAt=Date.now()}catch(o){i.lastSyncError=Lm(o),i.lastSyncedAt=Date.now(),console.warn(`[${r}] Failed to refresh ${i.slug}.`,o)}$l(),ce("Watchlist refreshed.","success"),am()})().catch(i=>{console.warn(`[${r}] Watchlist refresh failed.`,i),ce("Watchlist refresh failed.","danger")}).finally(()=>{h.watchlistBusy=!1,Rt(),il(),h.watchlistRefreshPromise=null}),h.watchlistRefreshPromise}function lb(){let t=tt(ei("id_show"));if(t)return t;let e=Array.from(document.scripts).find(l=>/id_show:\s*\d+/.test(l.textContent||"")),n=e?/id_show:\s*(\d+)/.exec(e.textContent):null;return n?tt(n[1]):0}function _2(){if(!location.pathname.startsWith("/shows/play/"))return null;let t=/^#S(\d+)-E(\d+)-(\d+)$/i.exec(location.hash);if(!t)return null;let e=lb(),n=tt(t[1]),l=tt(t[2]),a=tt(t[3]);return!e||!n||!l||!a?null:{idShow:e,season:n,episode:l,idEpisode:a}}function ab(){let t=_2();if(!t)return;let e=`${t.idShow}:${t.idEpisode}`;if(e===h.lastTrackedEpisodeSignature)return;let n=E2(t.idShow);n&&(n.lastWatched={season:t.season,episode:t.episode,idEpisode:t.idEpisode,watchedAt:Date.now()},(!n.latestEpisode||Pe(n.lastWatched,n.latestEpisode)>0)&&(n.latestEpisode={season:t.season,episode:t.episode,idEpisode:t.idEpisode,updatedAt:Date.now()}),h.lastTrackedEpisodeSignature=e,$l(),nb(n),ce(`${n.title} updated to watched through ${Lt(n.lastWatched)}.`,"success"))}var No=null;function am(){if(No)return No;let t=new Map,e=(n,...l)=>{t.set(n,[...t.get(n)||[],...l])};return Object.values(h.watchlistStore.shows).forEach(n=>{e(n.slug,n.latestEpisode,n.lastWatched,n.upcoming?.episodes[0])}),Object.values(h.playlistStore.entries).forEach(n=>{e(n.slug,n.episode)}),No=(async()=>{for(let[n,l]of t)await Go(n,l)&&Rt()})().finally(()=>{No=null}),No}function N2(){let t=/^#S(\d+)-E(\d+)-(\d+)$/i.exec(location.hash);return t?{season:Number(t[1]),episode:Number(t[2]),idEpisode:Number(t[3])}:null}async function Jr(){let t=lb(),e=N2();if(!t||!e)return null;let{episodes:n}=await eb(t);return n.find(l=>Pe(l,e)>0)||null}var Ir=`${r}-autonext`,im=0,Ka=null;function Za(){window.clearInterval(im),im=0,Ka&&(Ka.remove(),Ka=null)}function ib(t){Za(),Ul(t)}function A2(t){let e=document.createElement("div");e.className=Ir,e.setAttribute("role","status");let n=document.createElement("p");n.append("Up next: ");let l=document.createElement("strong");l.textContent=Lt(t),n.append(l," in ");let a=document.createElement("span");a.className=`${Ir}-seconds`,n.append(a,"s");let i=document.createElement("button");i.type="button",i.className=`${Ir}-play`,i.textContent="Play now",i.addEventListener("click",u=>{u.stopPropagation(),ib(t)});let o=document.createElement("button");return o.type="button",o.textContent="Cancel",o.addEventListener("click",u=>{u.stopPropagation(),Za()}),e.append(n,i,o),e}async function Wr(t){if(!!!t?.force&&!h.settings.autoNextEpisode||!location.pathname.startsWith("/shows/play/"))return!1;let n=location.hash,l=null;try{l=await Jr()}catch(s){console.warn(`[${r}] Could not look up the next episode.`,s)}let a=document.getElementById("video_player");if(!l||!a||location.hash!==n)return!1;let i=l;Za(),Ka=A2(i),a.appendChild(Ka);let o=Cm,u=Ka.querySelector(`.${Ir}-seconds`);return u?(u.textContent=String(o),im=window.setInterval(()=>{o-=1,location.hash!==n?Za():o<=0?ib(i):u.textContent=String(o)},1e3),!0):!1}var Ao=`${r}-intro`,M2=1,ob=5,om=null,Ja=null,rm="",um="",bn=null,ub=0;function Pr(){return om||(om=rp()),om}function ts(){let t=/^\/shows\/play\/(?:\d+-)?([^/?#]+)/i.exec(location.pathname);return t?(t[1]??"").toLowerCase():""}function es(){let t=ts();return t&&Pr()[t]||null}function ns(){let t=es();return t&&Number.isFinite(t.start)?t:null}function Fr(t){let e=ts(),n={...es()||{},...t,updatedAt:Date.now()};Object.keys(n).forEach(l=>{n[l]===void 0&&delete n[l]}),Number.isFinite(n.start)||Number.isFinite(n.creditsFromEnd)?Pr()[e]=n:delete Pr()[e],sp(Pr())}function Bl(t){let e=Math.max(0,Math.round(t));return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function Mo(){return document.querySelector("#video_player video")}function sm(t,e){return!!t&&e>=t.start&&e<t.end-M2}function ze(t){let e=cb();if(!e)return;let n=e.querySelector(`.${Ao}-toast`);n&&(n.textContent=t,n.hidden=!1,window.clearTimeout(ub),ub=window.setTimeout(()=>{n.hidden=!0},2500))}function ls(){let t=Mo(),e=ns();return!t||!sm(e,t.currentTime)?!1:(rm=location.hash,t.currentTime=e.end,ze("Skipped intro"),!0)}function ql(t,e,n){let l=document.createElement("button");return l.type="button",l.className=e,l.textContent=t,l.addEventListener("click",a=>{a.stopPropagation(),n()}),l}function C2(t,e){let n=document.createElement("div");n.className=`${r}-player-menu-row`;let l=document.createElement("span");l.textContent="Intro",n.append(l);let a=ns();if(Ja!==null){let i=Ja;n.append(ql(`Mark end (from ${Bl(i)})`,t,()=>{let o=Mo(),u=o?o.currentTime:0;if(u-i<ob){ze(`Play past the intro first (at least ${ob}s).`);return}Fr({start:i,end:u}),Ja=null,rm=location.hash,ze(`Intro saved: ${Bl(i)}\u2013${Bl(u)}`),e()}),ql("Cancel",t,()=>{Ja=null,e()}))}else if(a){let i=document.createElement("em");i.textContent=`${Bl(a.start)}\u2013${Bl(a.end)}`,n.append(i,ql("Clear",t,()=>{Fr({start:void 0,end:void 0}),sb(Mo()),ze("Intro cleared for this show."),e()}))}else n.append(ql("Mark start here",t,()=>{let i=Mo();Ja=i?i.currentTime:0,ze("Now play to the end of the intro and mark it."),e()}));return n}function O2(t,e){let n=document.createElement("div");n.className=`${r}-player-menu-row`;let l=document.createElement("span");l.textContent="Credits",n.append(l);let a=es();if(a?.creditsFromEnd!==void 0&&Number.isFinite(a.creditsFromEnd)){let i=document.createElement("em");i.textContent=`last ${Bl(a.creditsFromEnd)}`,n.append(i,ql("Clear",t,()=>{Fr({creditsFromEnd:void 0}),ze("Credits cleared for this show."),e()}))}else n.append(ql("Mark credits start here",t,()=>{let i=Mo();if(!i||!Number.isFinite(i.duration))return;let o=i.duration-i.currentTime;Fr({creditsFromEnd:o}),um=location.hash,ze(`Credits saved: last ${Bl(o)} of each episode.`),e()}));return n}function rb(t,e){if(!ts())return null;let n=document.createElement("div");n.className=`${r}-player-menu-section`;let l=document.createElement("p");return l.className=`${r}-player-menu-heading`,l.textContent="This show",n.append(l,C2(t,e),O2(t,e)),n}function sb(t){if(!bn)return;let e=bn.querySelector(`.${Ao}-skip`);e&&(e.hidden=!(!h.settings.autoSkipIntro&&sm(ns(),t?t.currentTime:-1)))}function cb(){let t=document.getElementById("video_player");if(!t)return null;if(bn?.parentElement===t)return bn;bn=document.createElement("div"),bn.className=Ao;let e=ql("Skip intro",`${Ao}-skip`,ls);e.hidden=!0;let n=document.createElement("p");return n.className=`${Ao}-toast`,n.hidden=!0,bn.append(e,n),t.appendChild(bn),bn}function fb(t){if(!ts()||!cb())return;let e=es(),n=t.currentTime;h.settings.autoSkipIntro&&rm!==location.hash&&Ja===null&&sm(ns(),n)&&ls(),e?.creditsFromEnd!==void 0&&Number.isFinite(e.creditsFromEnd)&&h.settings.autoSkipCredits&&um!==location.hash&&Number.isFinite(t.duration)&&!t.paused&&t.duration-n<=e.creditsFromEnd&&(um=location.hash,Wr({force:!0})),sb(t)}var cm=`${r}-player-menu`,R2=`${r}-player-menu-button`,db="#video_player .vjs-settings-quality-menu",z2=[{key:"autoPlay",label:"Auto play"},{key:"autoNextEpisode",label:"Auto next episode",showsOnly:!0},{key:"autoSkipIntro",label:"Auto skip intros",showsOnly:!0},{key:"autoSkipCredits",label:"Skip credits to next episode",showsOnly:!0},{key:"autoFullscreen",label:"Auto fullscreen"},{key:"windowedFullscreen",label:"Windowed fullscreen"}];function U2(){return location.pathname.startsWith("/shows/play/")}function mb(){return document.querySelector("#video_player video")}function as(t=mb()){t&&t.playbackRate!==h.settings.playbackRate&&(t.playbackRate=h.settings.playbackRate)}function pb(t){el({...h.settings,playbackRate:t}),as(),ze(`Speed ${t}\xD7`),Co()}function fm(t){let e=ol.indexOf(h.settings.playbackRate),n=ol[Math.max(0,Math.min(ol.length-1,e+t))];n!==void 0&&n!==h.settings.playbackRate&&pb(n)}async function dm(){let t=mb();if(!t||!document.pictureInPictureEnabled)return!1;try{return document.pictureInPictureElement?await document.exitPictureInPicture():await t.requestPictureInPicture(),!0}catch(e){return console.warn(`[${r}] Picture-in-picture failed.`,e),!1}}function hb(t){let e=document.createElement("div");e.className=`${r}-player-menu-section`;let n=document.createElement("p");return n.className=`${r}-player-menu-heading`,n.textContent=t,e.append(n),e}function L2(){let t=hb("Speed"),e=document.createElement("div");return e.className=`${r}-player-menu-chips`,ol.forEach(n=>{let l=document.createElement("button");l.type="button",l.textContent=`${n}\xD7`,l.dataset.active=n===h.settings.playbackRate?"true":"false",l.addEventListener("click",()=>{pb(n)}),e.append(l)}),t.append(e),t}function D2(){let t=hb("Enhancer");if(z2.filter(e=>!e.showsOnly||U2()).forEach(e=>{let n=document.createElement("button");n.type="button",n.className=`${r}-player-menu-toggle`,n.setAttribute("role","menuitemcheckbox"),n.setAttribute("aria-checked",h.settings[e.key]?"true":"false"),n.textContent=e.label,n.addEventListener("click",()=>{el({...h.settings,[e.key]:!h.settings[e.key]}),Co()}),t.append(n)}),document.pictureInPictureEnabled){let e=document.createElement("button");e.type="button",e.className=`${r}-player-menu-toggle`,e.textContent="Picture-in-picture",e.addEventListener("click",()=>{dm()}),t.append(e)}return t}function Co(){let t=document.querySelector(`${db} .${cm}`);if(!t)return;t.replaceChildren(L2(),D2());let e=rb(R2,Co);e&&t.append(e)}function mm(){let t=document.querySelector(db),e=t?.querySelector(".vjs-settings-body");if(!t||!e||e.querySelector(`.${cm}`))return;let n=e.querySelector(".vjs-menu");if(n&&!e.querySelector(`.${r}-quality-heading`)){let i=document.createElement("p");i.className=`${r}-player-menu-heading ${r}-quality-heading`,i.textContent="Quality",e.insertBefore(i,n)}let l=document.createElement("div");l.className=cm,l.addEventListener("click",i=>{i.stopPropagation()}),e.append(l),Co();let a=t.parentElement?.querySelector("button");a&&a.addEventListener("click",Co)}function yb(){return document.getElementById("video_player")}function so(){return Ym(document.getElementById("video_player"))}var Ia=Vm(so);function jv(){return Ia.play()}function Xv(){return Ia.pause()}function Gv(){return Ia.toggle()}function Qv(t){return Ia.seekBy(t)}function Kv(t){return Ia.setVolume(t)}function Zv(t){return Ia.setMuted(t)}function Jv(){let t=document.getElementById("video_player"),e=t?.querySelector(".vjs-fullscreen-control"),n=!!document.getElementById(Yl),l=!!document.fullscreenElement,a=!!t?.classList.contains("vjs-fullscreen");return n||l||a?(n&&ja(),l&&typeof document.exitFullscreen=="function"&&document.exitFullscreen(),a&&e&&e.click(),h.fullscreenTriggered=!1,!0):vb()}function vb(){let t=document.getElementById("video_player");if(document.getElementById(Yl)||document.fullscreenElement||t?.classList.contains("vjs-fullscreen"))return!0;if(!t)return!1;let e=t.querySelector(".vjs-fullscreen-control");if(e&&e.click(),h.settings.windowedFullscreen)B2();else if(!e)return!1;return h.fullscreenTriggered=!0,!0}function gb(t){history.replaceState(null,"",`#S${t.season}-E${t.episode}-${t.idEpisode}`),window.dispatchEvent(new Event("ChangedEpisodeHash"))}function Ul(t){return location.pathname.startsWith("/shows/play/")?t?(gb(t),!0):(Jr().then(e=>{e?gb(e):ze("This is the last episode.")}).catch(e=>{console.warn(`[${r}] Could not find the next episode.`,e)}),!0):!1}function $2(){if(!h.settings.autoPlay)return!1;let t=document.getElementById("progress-continue-button"),e=document.getElementById("progress-from-beginning-button"),n=Number.parseFloat(document.getElementById("progress-bar")?.style.width??""),l=Number.isFinite(n)&&n>=zo?e||t:t||e;return l?(console.info(`[${r}] Dismissing playback modal (${l.id}).`),l.click(),!0):!1}function H2(){let t=yb();if(!t)return!1;let e=document.getElementById(Le);if(e||(e=document.createElement("button"),e.id=Le,e.type="button",e.textContent="Exit",e.setAttribute("aria-label","Exit windowed fullscreen"),e.title="Exit windowed fullscreen",e.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),ja(),h.fullscreenTriggered=!1})),e.parentElement!==t&&t.appendChild(e),!t._lookmovieFullscreenExitActivityAttached){let n=()=>{window.clearTimeout(t._lookmovieFullscreenExitActivityTimer),t.classList.add(`${r}-fullscreen-exit-active`),t._lookmovieFullscreenExitActivityTimer=window.setTimeout(()=>{t.classList.remove(`${r}-fullscreen-exit-active`)},1600)};t._lookmovieFullscreenExitActivityAttached=!0,t.addEventListener("pointermove",n)}return!0}function B2(){if(!document.head)return!1;if(!document.getElementById(Yl)){let t=document.createElement("style");t.id=Yl,t.textContent=`
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
        `,document.head.appendChild(t)}return H2(),document.body&&document.body.classList.add(`${r}-fullscreen`),!0}function ja(){let t=document.getElementById(Yl);t&&t.remove();let e=yb();e&&(window.clearTimeout(e._lookmovieFullscreenExitActivityTimer),e.classList.remove(`${r}-fullscreen-exit-active`));let n=document.getElementById(Le);n&&n.remove(),document.body&&document.body.classList.remove(`${r}-fullscreen`)}function q2(){return!h.settings.autoFullscreen||h.fullscreenTriggered?!1:(console.info(`[${r}] Applying fullscreen behavior.`),vb())}function Y2(){Za(),ab(),ro("play"),!(!h.settings.autoPlay&&!h.settings.autoFullscreen)&&window.setTimeout(()=>{let t=$2();window.setTimeout(()=>{q2()},t?500:200)},300)}function V2(){ro("pause")}function k2(){ro("ended"),window.setTimeout(()=>{a1()||Wr()},750)}function pm(t){!t||t._lookmovieEnhancerAttached||(t._lookmovieEnhancerAttached=!0,t.addEventListener("play",Y2),t.addEventListener("loadedmetadata",()=>{t.closest("#video_player")&&(mm(),as(t))}),t.addEventListener("play",()=>{t.closest("#video_player")&&as(t)}),t.addEventListener("pause",V2),t.addEventListener("ended",k2),t.addEventListener("timeupdate",()=>{t.closest("#video_player")&&(mm(),fb(t))}))}function hm(){document.querySelectorAll("video").forEach(t=>{pm(t)})}function bb(){zm(t=>{hm(),new MutationObserver(n=>{n.forEach(l=>{l.type==="childList"&&l.addedNodes.forEach(a=>{if(a.nodeType!==Node.ELEMENT_NODE)return;let i=a;i.tagName==="VIDEO"&&pm(i),typeof i.querySelectorAll=="function"&&i.querySelectorAll("video").forEach(o=>{pm(o)})})})}).observe(t,{childList:!0,subtree:!0})})}var wb=".player-pre-init-ads",j2=".pre-init-ads--close, .pre-init-ads--back-button";function X2(){let t=window;t.__lookmovie2EnhancerAdBypass||(t.__lookmovie2EnhancerAdBypass=!0,Object.defineProperty(window,"_preInitAdsTimestamp",{configurable:!0,get:()=>Date.now(),set:()=>{}}))}function G2(t){let e=document.createElement("script");e.textContent=t,(document.head??document.documentElement).appendChild(e),e.remove()}function Q2(){Lo(Sm,".ad-container { display: none !important; }")}function Sb(){let t=document.querySelector(wb);if(!t||t.classList.contains("tw-hidden"))return!1;let e=t.querySelector(j2);return e?(e.click(),console.info(`[${r}] Skipped ad countdown.`),!0):!1}function Eb(){try{G2(`(${X2.toString()})();`)}catch(t){console.warn(`[${r}] Failed to install ad timer bypass.`,t)}Q2()}function xb(){let t=document.querySelector(wb);t&&(Sb(),new MutationObserver(()=>{Sb()}).observe(t,{attributes:!0,attributeFilter:["class"]}))}function Tb(){return location.pathname.startsWith("/shows/play/")}function K2(t){let e=t;return!!e&&(!!e.isContentEditable||/^(input|textarea|select)$/i.test(e.tagName||""))}function Z2(t){if(!document.getElementById("video_player")||t.ctrlKey||t.metaKey||t.altKey||K2(t.target))return;let e=!1;switch(t.key){case"n":case"N":e=Tb()&&Ul();break;case"s":case"S":e=ls();break;case">":fm(1),e=!0;break;case"<":fm(-1),e=!0;break;case"p":case"P":dm(),e=!0;break;default:break}e&&(t.preventDefault(),t.stopPropagation())}function J2(t){let e=t.target;!(e&&typeof e.closest=="function"&&e.closest(".vjs-next-episode-button"))||!Tb()||(t.preventDefault(),t.stopImmediatePropagation(),Ul())}function _b(){document.addEventListener("keydown",Z2,!0),document.addEventListener("click",J2,!0)}function I2(){window.setInterval(()=>{if(location.href===h.lastKnownUrl)return;new URL(h.lastKnownUrl,location.origin).pathname==="/shows"?Qr({persist:!0}):Qr(),h.lastKnownUrl=location.href,h.fullscreenTriggered=!1,h.lastTrackedEpisodeSignature="",ja(),hm(),Xo(),Jd(),Rt(),il(),Zr(),Kr(),_o(),nm(),Ll(),co(),Eo(),lm(),po(),yn()},_m)}function gm(){if(h.domBootstrapped)return;h.domBootstrapped=!0,xb(),_b(),bb(),Vv(),I2(),window.addEventListener("scroll",F1,{passive:!0}),window.addEventListener("pagehide",()=>{Qr({persist:!0})});let t=window.setInterval(()=>{h.uiBootAttempts+=1,Xo()&&Rt(),Jd(),Zr(),Kr(),nm(),co(),lm(),Dr(),(document.getElementById(w)||h.uiBootAttempts>100)&&window.clearInterval(t)},100);Xo(),Zr(),Rt(),nl(),il(),Kr(),_o(),Ll(),Eo(),po(),yn(),am()}Eb();$r();b1();document.readyState==="loading"?document.addEventListener("DOMContentLoaded",gm,{once:!0}):gm();})();
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
