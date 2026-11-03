/* ==UserScript==
// @name         LookMovie2 Enhancer
// @namespace    https://github.com/lnorton89/tampermonkey-scripts
// @version      1.2.0
// @description  Combines playback helpers with a persistent show watchlist for latest episode tracking.
// @author       Lawrence
// @match        *://*.lookmovie2.to/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @connect      ntfy.sh
// @connect      *
// @run-at       document-start
// ==/UserScript== */


"use strict";(()=>{var qy=Object.create;var Nf=Object.defineProperty;var Yy=Object.getOwnPropertyDescriptor;var jy=Object.getOwnPropertyNames;var Vy=Object.getPrototypeOf,Gy=Object.prototype.hasOwnProperty;var be=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Qy=(t,e,a,l)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of jy(e))!Gy.call(t,n)&&n!==a&&Nf(t,n,{get:()=>e[n],enumerable:!(l=Yy(e,n))||l.enumerable});return t};var k=(t,e,a)=>(a=t!=null?qy(Vy(t)):{},Qy(e||!t||!t.__esModule?Nf(a,"default",{value:t,enumerable:!0}):a,t));var yd=be(P=>{"use strict";function cc(t,e){var a=t.length;t.push(e);t:for(;0<a;){var l=a-1>>>1,n=t[l];if(0<Zi(n,e))t[l]=e,t[a]=n,a=l;else break t}}function Ee(t){return t.length===0?null:t[0]}function Ki(t){if(t.length===0)return null;var e=t[0],a=t.pop();if(a!==e){t[0]=a;t:for(var l=0,n=t.length,i=n>>>1;l<i;){var o=2*(l+1)-1,u=t[o],s=o+1,p=t[s];if(0>Zi(u,a))s<n&&0>Zi(p,u)?(t[l]=p,t[s]=a,l=s):(t[l]=u,t[o]=a,l=o);else if(s<n&&0>Zi(p,a))t[l]=p,t[s]=a,l=s;else break t}}return e}function Zi(t,e){var a=t.sortIndex-e.sortIndex;return a!==0?a:t.id-e.id}P.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(cd=performance,P.unstable_now=function(){return cd.now()}):(ic=Date,sd=ic.now(),P.unstable_now=function(){return ic.now()-sd});var cd,ic,sd,Ue=[],na=[],Ky=1,ae=null,_t=3,sc=!1,dn=!1,pn=!1,rc=!1,dd=typeof setTimeout=="function"?setTimeout:null,pd=typeof clearTimeout=="function"?clearTimeout:null,rd=typeof setImmediate<"u"?setImmediate:null;function ki(t){for(var e=Ee(na);e!==null;){if(e.callback===null)Ki(na);else if(e.startTime<=t)Ki(na),e.sortIndex=e.expirationTime,cc(Ue,e);else break;e=Ee(na)}}function fc(t){if(pn=!1,ki(t),!dn)if(Ee(Ue)!==null)dn=!0,rl||(rl=!0,sl());else{var e=Ee(na);e!==null&&dc(fc,e.startTime-t)}}var rl=!1,mn=-1,md=5,hd=-1;function gd(){return rc?!0:!(P.unstable_now()-hd<md)}function oc(){if(rc=!1,rl){var t=P.unstable_now();hd=t;var e=!0;try{t:{dn=!1,pn&&(pn=!1,pd(mn),mn=-1),sc=!0;var a=_t;try{e:{for(ki(t),ae=Ee(Ue);ae!==null&&!(ae.expirationTime>t&&gd());){var l=ae.callback;if(typeof l=="function"){ae.callback=null,_t=ae.priorityLevel;var n=l(ae.expirationTime<=t);if(t=P.unstable_now(),typeof n=="function"){ae.callback=n,ki(t),e=!0;break e}ae===Ee(Ue)&&Ki(Ue),ki(t)}else Ki(Ue);ae=Ee(Ue)}if(ae!==null)e=!0;else{var i=Ee(na);i!==null&&dc(fc,i.startTime-t),e=!1}}break t}finally{ae=null,_t=a,sc=!1}e=void 0}}finally{e?sl():rl=!1}}}var sl;typeof rd=="function"?sl=function(){rd(oc)}:typeof MessageChannel<"u"?(uc=new MessageChannel,fd=uc.port2,uc.port1.onmessage=oc,sl=function(){fd.postMessage(null)}):sl=function(){dd(oc,0)};var uc,fd;function dc(t,e){mn=dd(function(){t(P.unstable_now())},e)}P.unstable_IdlePriority=5;P.unstable_ImmediatePriority=1;P.unstable_LowPriority=4;P.unstable_NormalPriority=3;P.unstable_Profiling=null;P.unstable_UserBlockingPriority=2;P.unstable_cancelCallback=function(t){t.callback=null};P.unstable_forceFrameRate=function(t){0>t||125<t?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):md=0<t?Math.floor(1e3/t):5};P.unstable_getCurrentPriorityLevel=function(){return _t};P.unstable_next=function(t){switch(_t){case 1:case 2:case 3:var e=3;break;default:e=_t}var a=_t;_t=e;try{return t()}finally{_t=a}};P.unstable_requestPaint=function(){rc=!0};P.unstable_runWithPriority=function(t,e){switch(t){case 1:case 2:case 3:case 4:case 5:break;default:t=3}var a=_t;_t=t;try{return e()}finally{_t=a}};P.unstable_scheduleCallback=function(t,e,a){var l=P.unstable_now();switch(typeof a=="object"&&a!==null?(a=a.delay,a=typeof a=="number"&&0<a?l+a:l):a=l,t){case 1:var n=-1;break;case 2:n=250;break;case 5:n=1073741823;break;case 4:n=1e4;break;default:n=5e3}return n=a+n,t={id:Ky++,callback:e,priorityLevel:t,startTime:a,expirationTime:n,sortIndex:-1},a>l?(t.sortIndex=a,cc(na,t),Ee(Ue)===null&&t===Ee(na)&&(pn?(pd(mn),mn=-1):pn=!0,dc(fc,a-l))):(t.sortIndex=n,cc(Ue,t),dn||sc||(dn=!0,rl||(rl=!0,sl()))),t};P.unstable_shouldYield=gd;P.unstable_wrapCallback=function(t){var e=_t;return function(){var a=_t;_t=e;try{return t.apply(this,arguments)}finally{_t=a}}}});var bd=be((x2,vd)=>{"use strict";vd.exports=yd()});var Od=be(N=>{"use strict";var hc=Symbol.for("react.transitional.element"),Jy=Symbol.for("react.portal"),Wy=Symbol.for("react.fragment"),Fy=Symbol.for("react.strict_mode"),Iy=Symbol.for("react.profiler"),Py=Symbol.for("react.consumer"),tv=Symbol.for("react.context"),ev=Symbol.for("react.forward_ref"),av=Symbol.for("react.suspense"),lv=Symbol.for("react.memo"),Td=Symbol.for("react.lazy"),nv=Symbol.for("react.activity"),Sd=Symbol.iterator;function iv(t){return t===null||typeof t!="object"?null:(t=Sd&&t[Sd]||t["@@iterator"],typeof t=="function"?t:null)}var Ad={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_d=Object.assign,Md={};function dl(t,e,a){this.props=t,this.context=e,this.refs=Md,this.updater=a||Ad}dl.prototype.isReactComponent={};dl.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};dl.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function zd(){}zd.prototype=dl.prototype;function gc(t,e,a){this.props=t,this.context=e,this.refs=Md,this.updater=a||Ad}var yc=gc.prototype=new zd;yc.constructor=gc;_d(yc,dl.prototype);yc.isPureReactComponent=!0;var wd=Array.isArray;function mc(){}var J={H:null,A:null,T:null,S:null},Nd=Object.prototype.hasOwnProperty;function vc(t,e,a){var l=a.ref;return{$$typeof:hc,type:t,key:e,ref:l!==void 0?l:null,props:a}}function ov(t,e){return vc(t.type,e,t.props)}function bc(t){return typeof t=="object"&&t!==null&&t.$$typeof===hc}function uv(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(a){return e[a]})}var xd=/\/+/g;function pc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?uv(""+t.key):e.toString(36)}function cv(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(mc,mc):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function fl(t,e,a,l,n){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(i){case"bigint":case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case hc:case Jy:o=!0;break;case Td:return o=t._init,fl(o(t._payload),e,a,l,n)}}if(o)return n=n(t),o=l===""?"."+pc(t,0):l,wd(n)?(a="",o!=null&&(a=o.replace(xd,"$&/")+"/"),fl(n,e,a,"",function(p){return p})):n!=null&&(bc(n)&&(n=ov(n,a+(n.key==null||t&&t.key===n.key?"":(""+n.key).replace(xd,"$&/")+"/")+o)),e.push(n)),1;o=0;var u=l===""?".":l+":";if(wd(t))for(var s=0;s<t.length;s++)l=t[s],i=u+pc(l,s),o+=fl(l,e,a,i,n);else if(s=iv(t),typeof s=="function")for(t=s.call(t),s=0;!(l=t.next()).done;)l=l.value,i=u+pc(l,s++),o+=fl(l,e,a,i,n);else if(i==="object"){if(typeof t.then=="function")return fl(cv(t),e,a,l,n);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return o}function Ji(t,e,a){if(t==null)return t;var l=[],n=0;return fl(t,l,"","",function(i){return e.call(a,i,n++)}),l}function sv(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(a){(t._status===0||t._status===-1)&&(t._status=1,t._result=a)},function(a){(t._status===0||t._status===-1)&&(t._status=2,t._result=a)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Ed=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},rv={map:Ji,forEach:function(t,e,a){Ji(t,function(){e.apply(this,arguments)},a)},count:function(t){var e=0;return Ji(t,function(){e++}),e},toArray:function(t){return Ji(t,function(e){return e})||[]},only:function(t){if(!bc(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};N.Activity=nv;N.Children=rv;N.Component=dl;N.Fragment=Wy;N.Profiler=Iy;N.PureComponent=gc;N.StrictMode=Fy;N.Suspense=av;N.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=J;N.__COMPILER_RUNTIME={__proto__:null,c:function(t){return J.H.useMemoCache(t)}};N.cache=function(t){return function(){return t.apply(null,arguments)}};N.cacheSignal=function(){return null};N.cloneElement=function(t,e,a){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var l=_d({},t.props),n=t.key;if(e!=null)for(i in e.key!==void 0&&(n=""+e.key),e)!Nd.call(e,i)||i==="key"||i==="__self"||i==="__source"||i==="ref"&&e.ref===void 0||(l[i]=e[i]);var i=arguments.length-2;if(i===1)l.children=a;else if(1<i){for(var o=Array(i),u=0;u<i;u++)o[u]=arguments[u+2];l.children=o}return vc(t.type,n,l)};N.createContext=function(t){return t={$$typeof:tv,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:Py,_context:t},t};N.createElement=function(t,e,a){var l,n={},i=null;if(e!=null)for(l in e.key!==void 0&&(i=""+e.key),e)Nd.call(e,l)&&l!=="key"&&l!=="__self"&&l!=="__source"&&(n[l]=e[l]);var o=arguments.length-2;if(o===1)n.children=a;else if(1<o){for(var u=Array(o),s=0;s<o;s++)u[s]=arguments[s+2];n.children=u}if(t&&t.defaultProps)for(l in o=t.defaultProps,o)n[l]===void 0&&(n[l]=o[l]);return vc(t,i,n)};N.createRef=function(){return{current:null}};N.forwardRef=function(t){return{$$typeof:ev,render:t}};N.isValidElement=bc;N.lazy=function(t){return{$$typeof:Td,_payload:{_status:-1,_result:t},_init:sv}};N.memo=function(t,e){return{$$typeof:lv,type:t,compare:e===void 0?null:e}};N.startTransition=function(t){var e=J.T,a={};J.T=a;try{var l=t(),n=J.S;n!==null&&n(a,l),typeof l=="object"&&l!==null&&typeof l.then=="function"&&l.then(mc,Ed)}catch(i){Ed(i)}finally{e!==null&&a.types!==null&&(e.types=a.types),J.T=e}};N.unstable_useCacheRefresh=function(){return J.H.useCacheRefresh()};N.use=function(t){return J.H.use(t)};N.useActionState=function(t,e,a){return J.H.useActionState(t,e,a)};N.useCallback=function(t,e){return J.H.useCallback(t,e)};N.useContext=function(t){return J.H.useContext(t)};N.useDebugValue=function(){};N.useDeferredValue=function(t,e){return J.H.useDeferredValue(t,e)};N.useEffect=function(t,e){return J.H.useEffect(t,e)};N.useEffectEvent=function(t){return J.H.useEffectEvent(t)};N.useId=function(){return J.H.useId()};N.useImperativeHandle=function(t,e,a){return J.H.useImperativeHandle(t,e,a)};N.useInsertionEffect=function(t,e){return J.H.useInsertionEffect(t,e)};N.useLayoutEffect=function(t,e){return J.H.useLayoutEffect(t,e)};N.useMemo=function(t,e){return J.H.useMemo(t,e)};N.useOptimistic=function(t,e){return J.H.useOptimistic(t,e)};N.useReducer=function(t,e,a){return J.H.useReducer(t,e,a)};N.useRef=function(t){return J.H.useRef(t)};N.useState=function(t){return J.H.useState(t)};N.useSyncExternalStore=function(t,e,a){return J.H.useSyncExternalStore(t,e,a)};N.useTransition=function(){return J.H.useTransition()};N.version="19.2.5"});var Ha=be((T2,Cd)=>{"use strict";Cd.exports=Od()});var Rd=be(Nt=>{"use strict";var fv=Ha();function $d(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)e+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function ia(){}var zt={d:{f:ia,r:function(){throw Error($d(522))},D:ia,C:ia,L:ia,m:ia,X:ia,S:ia,M:ia},p:0,findDOMNode:null},dv=Symbol.for("react.portal");function pv(t,e,a){var l=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:dv,key:l==null?null:""+l,children:t,containerInfo:e,implementation:a}}var hn=fv.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Wi(t,e){if(t==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}Nt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=zt;Nt.createPortal=function(t,e){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error($d(299));return pv(t,e,null,a)};Nt.flushSync=function(t){var e=hn.T,a=zt.p;try{if(hn.T=null,zt.p=2,t)return t()}finally{hn.T=e,zt.p=a,zt.d.f()}};Nt.preconnect=function(t,e){typeof t=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,zt.d.C(t,e))};Nt.prefetchDNS=function(t){typeof t=="string"&&zt.d.D(t)};Nt.preinit=function(t,e){if(typeof t=="string"&&e&&typeof e.as=="string"){var a=e.as,l=Wi(a,e.crossOrigin),n=typeof e.integrity=="string"?e.integrity:void 0,i=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;a==="style"?zt.d.S(t,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:l,integrity:n,fetchPriority:i}):a==="script"&&zt.d.X(t,{crossOrigin:l,integrity:n,fetchPriority:i,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};Nt.preinitModule=function(t,e){if(typeof t=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var a=Wi(e.as,e.crossOrigin);zt.d.M(t,{crossOrigin:a,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0})}}else e==null&&zt.d.M(t)};Nt.preload=function(t,e){if(typeof t=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var a=e.as,l=Wi(a,e.crossOrigin);zt.d.L(t,a,{crossOrigin:l,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};Nt.preloadModule=function(t,e){if(typeof t=="string")if(e){var a=Wi(e.as,e.crossOrigin);zt.d.m(t,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:a,integrity:typeof e.integrity=="string"?e.integrity:void 0})}else zt.d.m(t)};Nt.requestFormReset=function(t){zt.d.r(t)};Nt.unstable_batchedUpdates=function(t,e){return t(e)};Nt.useFormState=function(t,e,a){return hn.H.useFormState(t,e,a)};Nt.useFormStatus=function(){return hn.H.useHostTransitionStatus()};Nt.version="19.2.5"});var Sc=be((_2,Dd)=>{"use strict";function Ud(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ud)}catch(t){console.error(t)}}Ud(),Dd.exports=Rd()});var k0=be(xu=>{"use strict";var pt=bd(),um=Ha(),mv=Sc();function w(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)e+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function cm(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function ei(t){var e=t,a=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(a=e.return),t=e.return;while(t)}return e.tag===3?a:null}function sm(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function rm(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Ld(t){if(ei(t)!==t)throw Error(w(188))}function hv(t){var e=t.alternate;if(!e){if(e=ei(t),e===null)throw Error(w(188));return e!==t?null:t}for(var a=t,l=e;;){var n=a.return;if(n===null)break;var i=n.alternate;if(i===null){if(l=n.return,l!==null){a=l;continue}break}if(n.child===i.child){for(i=n.child;i;){if(i===a)return Ld(n),t;if(i===l)return Ld(n),e;i=i.sibling}throw Error(w(188))}if(a.return!==l.return)a=n,l=i;else{for(var o=!1,u=n.child;u;){if(u===a){o=!0,a=n,l=i;break}if(u===l){o=!0,l=n,a=i;break}u=u.sibling}if(!o){for(u=i.child;u;){if(u===a){o=!0,a=i,l=n;break}if(u===l){o=!0,l=i,a=n;break}u=u.sibling}if(!o)throw Error(w(189))}}if(a.alternate!==l)throw Error(w(190))}if(a.tag!==3)throw Error(w(188));return a.stateNode.current===a?t:e}function fm(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=fm(t),e!==null)return e;t=t.sibling}return null}var I=Object.assign,gv=Symbol.for("react.element"),Fi=Symbol.for("react.transitional.element"),En=Symbol.for("react.portal"),vl=Symbol.for("react.fragment"),dm=Symbol.for("react.strict_mode"),ts=Symbol.for("react.profiler"),pm=Symbol.for("react.consumer"),Ve=Symbol.for("react.context"),Js=Symbol.for("react.forward_ref"),es=Symbol.for("react.suspense"),as=Symbol.for("react.suspense_list"),Ws=Symbol.for("react.memo"),oa=Symbol.for("react.lazy");Symbol.for("react.scope");var ls=Symbol.for("react.activity");Symbol.for("react.legacy_hidden");Symbol.for("react.tracing_marker");var yv=Symbol.for("react.memo_cache_sentinel");Symbol.for("react.view_transition");var Bd=Symbol.iterator;function gn(t){return t===null||typeof t!="object"?null:(t=Bd&&t[Bd]||t["@@iterator"],typeof t=="function"?t:null)}var vv=Symbol.for("react.client.reference");function ns(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===vv?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case vl:return"Fragment";case ts:return"Profiler";case dm:return"StrictMode";case es:return"Suspense";case as:return"SuspenseList";case ls:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case En:return"Portal";case Ve:return t.displayName||"Context";case pm:return(t._context.displayName||"Context")+".Consumer";case Js:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Ws:return e=t.displayName||null,e!==null?e:ns(t.type)||"Memo";case oa:e=t._payload,t=t._init;try{return ns(t(e))}catch{}}return null}var Tn=Array.isArray,z=um.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,j=mv.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Qa={pending:!1,data:null,method:null,action:null},is=[],bl=-1;function ze(t){return{current:t}}function yt(t){0>bl||(t.current=is[bl],is[bl]=null,bl--)}function K(t,e){bl++,is[bl]=t.current,t.current=e}var Me=ze(null),jn=ze(null),ya=ze(null),Co=ze(null);function $o(t,e){switch(K(ya,e),K(jn,t),K(Me,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?Qp(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=Qp(e),t=R0(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}yt(Me),K(Me,t)}function Bl(){yt(Me),yt(jn),yt(ya)}function os(t){t.memoizedState!==null&&K(Co,t);var e=Me.current,a=R0(e,t.type);e!==a&&(K(jn,t),K(Me,a))}function Ro(t){jn.current===t&&(yt(Me),yt(jn)),Co.current===t&&(yt(Co),In._currentValue=Qa)}var wc,Hd;function Ya(t){if(wc===void 0)try{throw Error()}catch(a){var e=a.stack.trim().match(/\n( *(at )?)/);wc=e&&e[1]||"",Hd=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+wc+t+Hd}var xc=!1;function Ec(t,e){if(!t||xc)return"";xc=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(e){var v=function(){throw Error()};if(Object.defineProperty(v.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(v,[])}catch(y){var m=y}Reflect.construct(t,[],v)}else{try{v.call()}catch(y){m=y}t.call(v.prototype)}}else{try{throw Error()}catch(y){m=y}(v=t())&&typeof v.catch=="function"&&v.catch(function(){})}}catch(y){if(y&&m&&typeof y.stack=="string")return[y.stack,m.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var n=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");n&&n.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=l.DetermineComponentFrameRoot(),o=i[0],u=i[1];if(o&&u){var s=o.split(`
`),p=u.split(`
`);for(n=l=0;l<s.length&&!s[l].includes("DetermineComponentFrameRoot");)l++;for(;n<p.length&&!p[n].includes("DetermineComponentFrameRoot");)n++;if(l===s.length||n===p.length)for(l=s.length-1,n=p.length-1;1<=l&&0<=n&&s[l]!==p[n];)n--;for(;1<=l&&0<=n;l--,n--)if(s[l]!==p[n]){if(l!==1||n!==1)do if(l--,n--,0>n||s[l]!==p[n]){var g=`
`+s[l].replace(" at new "," at ");return t.displayName&&g.includes("<anonymous>")&&(g=g.replace("<anonymous>",t.displayName)),g}while(1<=l&&0<=n);break}}}finally{xc=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?Ya(a):""}function bv(t,e){switch(t.tag){case 26:case 27:case 5:return Ya(t.type);case 16:return Ya("Lazy");case 13:return t.child!==e&&e!==null?Ya("Suspense Fallback"):Ya("Suspense");case 19:return Ya("SuspenseList");case 0:case 15:return Ec(t.type,!1);case 11:return Ec(t.type.render,!1);case 1:return Ec(t.type,!0);case 31:return Ya("Activity");default:return""}}function qd(t){try{var e="",a=null;do e+=bv(t,a),a=t,t=t.return;while(t);return e}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var us=Object.prototype.hasOwnProperty,Fs=pt.unstable_scheduleCallback,Tc=pt.unstable_cancelCallback,Sv=pt.unstable_shouldYield,wv=pt.unstable_requestPaint,kt=pt.unstable_now,xv=pt.unstable_getCurrentPriorityLevel,mm=pt.unstable_ImmediatePriority,hm=pt.unstable_UserBlockingPriority,Uo=pt.unstable_NormalPriority,Ev=pt.unstable_LowPriority,gm=pt.unstable_IdlePriority,Tv=pt.log,Av=pt.unstable_setDisableYieldValue,ai=null,Kt=null;function da(t){if(typeof Tv=="function"&&Av(t),Kt&&typeof Kt.setStrictMode=="function")try{Kt.setStrictMode(ai,t)}catch{}}var Jt=Math.clz32?Math.clz32:zv,_v=Math.log,Mv=Math.LN2;function zv(t){return t>>>=0,t===0?32:31-(_v(t)/Mv|0)|0}var Ii=256,Pi=262144,to=4194304;function ja(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function ou(t,e,a){var l=t.pendingLanes;if(l===0)return 0;var n=0,i=t.suspendedLanes,o=t.pingedLanes;t=t.warmLanes;var u=l&134217727;return u!==0?(l=u&~i,l!==0?n=ja(l):(o&=u,o!==0?n=ja(o):a||(a=u&~t,a!==0&&(n=ja(a))))):(u=l&~i,u!==0?n=ja(u):o!==0?n=ja(o):a||(a=l&~t,a!==0&&(n=ja(a)))),n===0?0:e!==0&&e!==n&&(e&i)===0&&(i=n&-n,a=e&-e,i>=a||i===32&&(a&4194048)!==0)?e:n}function li(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function Nv(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ym(){var t=to;return to<<=1,(to&62914560)===0&&(to=4194304),t}function Ac(t){for(var e=[],a=0;31>a;a++)e.push(t);return e}function ni(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Ov(t,e,a,l,n,i){var o=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var u=t.entanglements,s=t.expirationTimes,p=t.hiddenUpdates;for(a=o&~a;0<a;){var g=31-Jt(a),v=1<<g;u[g]=0,s[g]=-1;var m=p[g];if(m!==null)for(p[g]=null,g=0;g<m.length;g++){var y=m[g];y!==null&&(y.lane&=-536870913)}a&=~v}l!==0&&vm(t,l,0),i!==0&&n===0&&t.tag!==0&&(t.suspendedLanes|=i&~(o&~e))}function vm(t,e,a){t.pendingLanes|=e,t.suspendedLanes&=~e;var l=31-Jt(e);t.entangledLanes|=e,t.entanglements[l]=t.entanglements[l]|1073741824|a&261930}function bm(t,e){var a=t.entangledLanes|=e;for(t=t.entanglements;a;){var l=31-Jt(a),n=1<<l;n&e|t[l]&e&&(t[l]|=e),a&=~n}}function Sm(t,e){var a=e&-e;return a=(a&42)!==0?1:Is(a),(a&(t.suspendedLanes|e))!==0?0:a}function Is(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Ps(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function wm(){var t=j.p;return t!==0?t:(t=window.event,t===void 0?32:Q0(t.type))}function Yd(t,e){var a=j.p;try{return j.p=t,e()}finally{j.p=a}}var Oa=Math.random().toString(36).slice(2),St="__reactFiber$"+Oa,qt="__reactProps$"+Oa,Kl="__reactContainer$"+Oa,cs="__reactEvents$"+Oa,Cv="__reactListeners$"+Oa,$v="__reactHandles$"+Oa,jd="__reactResources$"+Oa,ii="__reactMarker$"+Oa;function tr(t){delete t[St],delete t[qt],delete t[cs],delete t[Cv],delete t[$v]}function Sl(t){var e=t[St];if(e)return e;for(var a=t.parentNode;a;){if(e=a[Kl]||a[St]){if(a=e.alternate,e.child!==null||a!==null&&a.child!==null)for(t=Jp(t);t!==null;){if(a=t[St])return a;t=Jp(t)}return e}t=a,a=t.parentNode}return null}function Jl(t){if(t=t[St]||t[Kl]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function An(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(w(33))}function Ol(t){var e=t[jd];return e||(e=t[jd]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function gt(t){t[ii]=!0}var xm=new Set,Em={};function tl(t,e){Hl(t,e),Hl(t+"Capture",e)}function Hl(t,e){for(Em[t]=e,t=0;t<e.length;t++)xm.add(e[t])}var Rv=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Vd={},Gd={};function Uv(t){return us.call(Gd,t)?!0:us.call(Vd,t)?!1:Rv.test(t)?Gd[t]=!0:(Vd[t]=!0,!1)}function go(t,e,a){if(Uv(e))if(a===null)t.removeAttribute(e);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var l=e.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+a)}}function eo(t,e,a){if(a===null)t.removeAttribute(e);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+a)}}function De(t,e,a,l){if(l===null)t.removeAttribute(a);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(e,a,""+l)}}function ne(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Tm(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Dv(t,e,a){var l=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var n=l.get,i=l.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return n.call(this)},set:function(o){a=""+o,i.call(this,o)}}),Object.defineProperty(t,e,{enumerable:l.enumerable}),{getValue:function(){return a},setValue:function(o){a=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function ss(t){if(!t._valueTracker){var e=Tm(t)?"checked":"value";t._valueTracker=Dv(t,e,""+t[e])}}function Am(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var a=e.getValue(),l="";return t&&(l=Tm(t)?t.checked?"true":"false":t.value),t=l,t!==a?(e.setValue(t),!0):!1}function Do(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Lv=/[\n"\\]/g;function ue(t){return t.replace(Lv,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function rs(t,e,a,l,n,i,o,u){t.name="",o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?t.type=o:t.removeAttribute("type"),e!=null?o==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+ne(e)):t.value!==""+ne(e)&&(t.value=""+ne(e)):o!=="submit"&&o!=="reset"||t.removeAttribute("value"),e!=null?fs(t,o,ne(e)):a!=null?fs(t,o,ne(a)):l!=null&&t.removeAttribute("value"),n==null&&i!=null&&(t.defaultChecked=!!i),n!=null&&(t.checked=n&&typeof n!="function"&&typeof n!="symbol"),u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?t.name=""+ne(u):t.removeAttribute("name")}function _m(t,e,a,l,n,i,o,u){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(t.type=i),e!=null||a!=null){if(!(i!=="submit"&&i!=="reset"||e!=null)){ss(t);return}a=a!=null?""+ne(a):"",e=e!=null?""+ne(e):a,u||e===t.value||(t.value=e),t.defaultValue=e}l=l??n,l=typeof l!="function"&&typeof l!="symbol"&&!!l,t.checked=u?t.checked:!!l,t.defaultChecked=!!l,o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"&&(t.name=o),ss(t)}function fs(t,e,a){e==="number"&&Do(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function Cl(t,e,a,l){if(t=t.options,e){e={};for(var n=0;n<a.length;n++)e["$"+a[n]]=!0;for(a=0;a<t.length;a++)n=e.hasOwnProperty("$"+t[a].value),t[a].selected!==n&&(t[a].selected=n),n&&l&&(t[a].defaultSelected=!0)}else{for(a=""+ne(a),e=null,n=0;n<t.length;n++){if(t[n].value===a){t[n].selected=!0,l&&(t[n].defaultSelected=!0);return}e!==null||t[n].disabled||(e=t[n])}e!==null&&(e.selected=!0)}}function Mm(t,e,a){if(e!=null&&(e=""+ne(e),e!==t.value&&(t.value=e),a==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=a!=null?""+ne(a):""}function zm(t,e,a,l){if(e==null){if(l!=null){if(a!=null)throw Error(w(92));if(Tn(l)){if(1<l.length)throw Error(w(93));l=l[0]}a=l}a==null&&(a=""),e=a}a=ne(e),t.defaultValue=a,l=t.textContent,l===a&&l!==""&&l!==null&&(t.value=l),ss(t)}function ql(t,e){if(e){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=e;return}}t.textContent=e}var Bv=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Qd(t,e,a){var l=e.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?l?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":l?t.setProperty(e,a):typeof a!="number"||a===0||Bv.has(e)?e==="float"?t.cssFloat=a:t[e]=(""+a).trim():t[e]=a+"px"}function Nm(t,e,a){if(e!=null&&typeof e!="object")throw Error(w(62));if(t=t.style,a!=null){for(var l in a)!a.hasOwnProperty(l)||e!=null&&e.hasOwnProperty(l)||(l.indexOf("--")===0?t.setProperty(l,""):l==="float"?t.cssFloat="":t[l]="");for(var n in e)l=e[n],e.hasOwnProperty(n)&&a[n]!==l&&Qd(t,n,l)}else for(var i in e)e.hasOwnProperty(i)&&Qd(t,i,e[i])}function er(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Hv=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),qv=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function yo(t){return qv.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Ge(){}var ds=null;function ar(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var wl=null,$l=null;function Xd(t){var e=Jl(t);if(e&&(t=e.stateNode)){var a=t[qt]||null;t:switch(t=e.stateNode,e.type){case"input":if(rs(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),e=a.name,a.type==="radio"&&e!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+ue(""+e)+'"][type="radio"]'),e=0;e<a.length;e++){var l=a[e];if(l!==t&&l.form===t.form){var n=l[qt]||null;if(!n)throw Error(w(90));rs(l,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name)}}for(e=0;e<a.length;e++)l=a[e],l.form===t.form&&Am(l)}break t;case"textarea":Mm(t,a.value,a.defaultValue);break t;case"select":e=a.value,e!=null&&Cl(t,!!a.multiple,e,!1)}}}var _c=!1;function Om(t,e,a){if(_c)return t(e,a);_c=!0;try{var l=t(e);return l}finally{if(_c=!1,(wl!==null||$l!==null)&&(vu(),wl&&(e=wl,t=$l,$l=wl=null,Xd(e),t)))for(e=0;e<t.length;e++)Xd(t[e])}}function Vn(t,e){var a=t.stateNode;if(a===null)return null;var l=a[qt]||null;if(l===null)return null;a=l[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(t=t.type,l=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!l;break t;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(w(231,e,typeof a));return a}var Ke=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ps=!1;if(Ke)try{pl={},Object.defineProperty(pl,"passive",{get:function(){ps=!0}}),window.addEventListener("test",pl,pl),window.removeEventListener("test",pl,pl)}catch{ps=!1}var pl,pa=null,lr=null,vo=null;function Cm(){if(vo)return vo;var t,e=lr,a=e.length,l,n="value"in pa?pa.value:pa.textContent,i=n.length;for(t=0;t<a&&e[t]===n[t];t++);var o=a-t;for(l=1;l<=o&&e[a-l]===n[i-l];l++);return vo=n.slice(t,1<l?1-l:void 0)}function bo(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function ao(){return!0}function Zd(){return!1}function Yt(t){function e(a,l,n,i,o){this._reactName=a,this._targetInst=n,this.type=l,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var u in t)t.hasOwnProperty(u)&&(a=t[u],this[u]=a?a(i):i[u]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?ao:Zd,this.isPropagationStopped=Zd,this}return I(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=ao)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=ao)},persist:function(){},isPersistent:ao}),e}var el={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},uu=Yt(el),oi=I({},el,{view:0,detail:0}),Yv=Yt(oi),Mc,zc,yn,cu=I({},oi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:nr,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==yn&&(yn&&t.type==="mousemove"?(Mc=t.screenX-yn.screenX,zc=t.screenY-yn.screenY):zc=Mc=0,yn=t),Mc)},movementY:function(t){return"movementY"in t?t.movementY:zc}}),kd=Yt(cu),jv=I({},cu,{dataTransfer:0}),Vv=Yt(jv),Gv=I({},oi,{relatedTarget:0}),Nc=Yt(Gv),Qv=I({},el,{animationName:0,elapsedTime:0,pseudoElement:0}),Xv=Yt(Qv),Zv=I({},el,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),kv=Yt(Zv),Kv=I({},el,{data:0}),Kd=Yt(Kv),Jv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Wv={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Fv={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Iv(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Fv[t])?!!e[t]:!1}function nr(){return Iv}var Pv=I({},oi,{key:function(t){if(t.key){var e=Jv[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=bo(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Wv[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:nr,charCode:function(t){return t.type==="keypress"?bo(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?bo(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),t1=Yt(Pv),e1=I({},cu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Jd=Yt(e1),a1=I({},oi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:nr}),l1=Yt(a1),n1=I({},el,{propertyName:0,elapsedTime:0,pseudoElement:0}),i1=Yt(n1),o1=I({},cu,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),u1=Yt(o1),c1=I({},el,{newState:0,oldState:0}),s1=Yt(c1),r1=[9,13,27,32],ir=Ke&&"CompositionEvent"in window,zn=null;Ke&&"documentMode"in document&&(zn=document.documentMode);var f1=Ke&&"TextEvent"in window&&!zn,$m=Ke&&(!ir||zn&&8<zn&&11>=zn),Wd=" ",Fd=!1;function Rm(t,e){switch(t){case"keyup":return r1.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Um(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var xl=!1;function d1(t,e){switch(t){case"compositionend":return Um(e);case"keypress":return e.which!==32?null:(Fd=!0,Wd);case"textInput":return t=e.data,t===Wd&&Fd?null:t;default:return null}}function p1(t,e){if(xl)return t==="compositionend"||!ir&&Rm(t,e)?(t=Cm(),vo=lr=pa=null,xl=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return $m&&e.locale!=="ko"?null:e.data;default:return null}}var m1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Id(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!m1[t.type]:e==="textarea"}function Dm(t,e,a,l){wl?$l?$l.push(l):$l=[l]:wl=l,e=Po(e,"onChange"),0<e.length&&(a=new uu("onChange","change",null,a,l),t.push({event:a,listeners:e}))}var Nn=null,Gn=null;function h1(t){O0(t,0)}function su(t){var e=An(t);if(Am(e))return t}function Pd(t,e){if(t==="change")return e}var Lm=!1;Ke&&(Ke?(no="oninput"in document,no||(Oc=document.createElement("div"),Oc.setAttribute("oninput","return;"),no=typeof Oc.oninput=="function"),lo=no):lo=!1,Lm=lo&&(!document.documentMode||9<document.documentMode));var lo,no,Oc;function tp(){Nn&&(Nn.detachEvent("onpropertychange",Bm),Gn=Nn=null)}function Bm(t){if(t.propertyName==="value"&&su(Gn)){var e=[];Dm(e,Gn,t,ar(t)),Om(h1,e)}}function g1(t,e,a){t==="focusin"?(tp(),Nn=e,Gn=a,Nn.attachEvent("onpropertychange",Bm)):t==="focusout"&&tp()}function y1(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return su(Gn)}function v1(t,e){if(t==="click")return su(e)}function b1(t,e){if(t==="input"||t==="change")return su(e)}function S1(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Ft=typeof Object.is=="function"?Object.is:S1;function Qn(t,e){if(Ft(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var a=Object.keys(t),l=Object.keys(e);if(a.length!==l.length)return!1;for(l=0;l<a.length;l++){var n=a[l];if(!us.call(e,n)||!Ft(t[n],e[n]))return!1}return!0}function ep(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function ap(t,e){var a=ep(t);t=0;for(var l;a;){if(a.nodeType===3){if(l=t+a.textContent.length,t<=e&&l>=e)return{node:a,offset:e-t};t=l}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=ep(a)}}function Hm(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Hm(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function qm(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=Do(t.document);e instanceof t.HTMLIFrameElement;){try{var a=typeof e.contentWindow.location.href=="string"}catch{a=!1}if(a)t=e.contentWindow;else break;e=Do(t.document)}return e}function or(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var w1=Ke&&"documentMode"in document&&11>=document.documentMode,El=null,ms=null,On=null,hs=!1;function lp(t,e,a){var l=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;hs||El==null||El!==Do(l)||(l=El,"selectionStart"in l&&or(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),On&&Qn(On,l)||(On=l,l=Po(ms,"onSelect"),0<l.length&&(e=new uu("onSelect","select",null,e,a),t.push({event:e,listeners:l}),e.target=El)))}function qa(t,e){var a={};return a[t.toLowerCase()]=e.toLowerCase(),a["Webkit"+t]="webkit"+e,a["Moz"+t]="moz"+e,a}var Tl={animationend:qa("Animation","AnimationEnd"),animationiteration:qa("Animation","AnimationIteration"),animationstart:qa("Animation","AnimationStart"),transitionrun:qa("Transition","TransitionRun"),transitionstart:qa("Transition","TransitionStart"),transitioncancel:qa("Transition","TransitionCancel"),transitionend:qa("Transition","TransitionEnd")},Cc={},Ym={};Ke&&(Ym=document.createElement("div").style,"AnimationEvent"in window||(delete Tl.animationend.animation,delete Tl.animationiteration.animation,delete Tl.animationstart.animation),"TransitionEvent"in window||delete Tl.transitionend.transition);function al(t){if(Cc[t])return Cc[t];if(!Tl[t])return t;var e=Tl[t],a;for(a in e)if(e.hasOwnProperty(a)&&a in Ym)return Cc[t]=e[a];return t}var jm=al("animationend"),Vm=al("animationiteration"),Gm=al("animationstart"),x1=al("transitionrun"),E1=al("transitionstart"),T1=al("transitioncancel"),Qm=al("transitionend"),Xm=new Map,gs="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");gs.push("scrollEnd");function he(t,e){Xm.set(t,e),tl(e,[t])}var Lo=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},le=[],Al=0,ur=0;function ru(){for(var t=Al,e=ur=Al=0;e<t;){var a=le[e];le[e++]=null;var l=le[e];le[e++]=null;var n=le[e];le[e++]=null;var i=le[e];if(le[e++]=null,l!==null&&n!==null){var o=l.pending;o===null?n.next=n:(n.next=o.next,o.next=n),l.pending=n}i!==0&&Zm(a,n,i)}}function fu(t,e,a,l){le[Al++]=t,le[Al++]=e,le[Al++]=a,le[Al++]=l,ur|=l,t.lanes|=l,t=t.alternate,t!==null&&(t.lanes|=l)}function cr(t,e,a,l){return fu(t,e,a,l),Bo(t)}function ll(t,e){return fu(t,null,null,e),Bo(t)}function Zm(t,e,a){t.lanes|=a;var l=t.alternate;l!==null&&(l.lanes|=a);for(var n=!1,i=t.return;i!==null;)i.childLanes|=a,l=i.alternate,l!==null&&(l.childLanes|=a),i.tag===22&&(t=i.stateNode,t===null||t._visibility&1||(n=!0)),t=i,i=i.return;return t.tag===3?(i=t.stateNode,n&&e!==null&&(n=31-Jt(a),t=i.hiddenUpdates,l=t[n],l===null?t[n]=[e]:l.push(e),e.lane=a|536870912),i):null}function Bo(t){if(50<qn)throw qn=0,Bs=null,Error(w(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var _l={};function A1(t,e,a,l){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Xt(t,e,a,l){return new A1(t,e,a,l)}function sr(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Xe(t,e){var a=t.alternate;return a===null?(a=Xt(t.tag,e,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=e,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,e=t.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function km(t,e){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,e=a.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function So(t,e,a,l,n,i){var o=0;if(l=t,typeof t=="function")sr(t)&&(o=1);else if(typeof t=="string")o=zb(t,a,Me.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case ls:return t=Xt(31,a,e,n),t.elementType=ls,t.lanes=i,t;case vl:return Xa(a.children,n,i,e);case dm:o=8,n|=24;break;case ts:return t=Xt(12,a,e,n|2),t.elementType=ts,t.lanes=i,t;case es:return t=Xt(13,a,e,n),t.elementType=es,t.lanes=i,t;case as:return t=Xt(19,a,e,n),t.elementType=as,t.lanes=i,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Ve:o=10;break t;case pm:o=9;break t;case Js:o=11;break t;case Ws:o=14;break t;case oa:o=16,l=null;break t}o=29,a=Error(w(130,t===null?"null":typeof t,"")),l=null}return e=Xt(o,a,e,n),e.elementType=t,e.type=l,e.lanes=i,e}function Xa(t,e,a,l){return t=Xt(7,t,l,e),t.lanes=a,t}function $c(t,e,a){return t=Xt(6,t,null,e),t.lanes=a,t}function Km(t){var e=Xt(18,null,null,0);return e.stateNode=t,e}function Rc(t,e,a){return e=Xt(4,t.children!==null?t.children:[],t.key,e),e.lanes=a,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var np=new WeakMap;function ce(t,e){if(typeof t=="object"&&t!==null){var a=np.get(t);return a!==void 0?a:(e={value:t,source:e,stack:qd(e)},np.set(t,e),e)}return{value:t,source:e,stack:qd(e)}}var Ml=[],zl=0,Ho=null,Xn=0,ie=[],oe=0,_a=null,Te=1,Ae="";function Ye(t,e){Ml[zl++]=Xn,Ml[zl++]=Ho,Ho=t,Xn=e}function Jm(t,e,a){ie[oe++]=Te,ie[oe++]=Ae,ie[oe++]=_a,_a=t;var l=Te;t=Ae;var n=32-Jt(l)-1;l&=~(1<<n),a+=1;var i=32-Jt(e)+n;if(30<i){var o=n-n%5;i=(l&(1<<o)-1).toString(32),l>>=o,n-=o,Te=1<<32-Jt(e)+n|a<<n|l,Ae=i+t}else Te=1<<i|a<<n|l,Ae=t}function rr(t){t.return!==null&&(Ye(t,1),Jm(t,1,0))}function fr(t){for(;t===Ho;)Ho=Ml[--zl],Ml[zl]=null,Xn=Ml[--zl],Ml[zl]=null;for(;t===_a;)_a=ie[--oe],ie[oe]=null,Ae=ie[--oe],ie[oe]=null,Te=ie[--oe],ie[oe]=null}function Wm(t,e){ie[oe++]=Te,ie[oe++]=Ae,ie[oe++]=_a,Te=e.id,Ae=e.overflow,_a=t}var wt=null,F=null,B=!1,va=null,se=!1,ys=Error(w(519));function Ma(t){var e=Error(w(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Zn(ce(e,t)),ys}function ip(t){var e=t.stateNode,a=t.type,l=t.memoizedProps;switch(e[St]=t,e[qt]=l,a){case"dialog":R("cancel",e),R("close",e);break;case"iframe":case"object":case"embed":R("load",e);break;case"video":case"audio":for(a=0;a<Wn.length;a++)R(Wn[a],e);break;case"source":R("error",e);break;case"img":case"image":case"link":R("error",e),R("load",e);break;case"details":R("toggle",e);break;case"input":R("invalid",e),_m(e,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":R("invalid",e);break;case"textarea":R("invalid",e),zm(e,l.value,l.defaultValue,l.children)}a=l.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||e.textContent===""+a||l.suppressHydrationWarning===!0||$0(e.textContent,a)?(l.popover!=null&&(R("beforetoggle",e),R("toggle",e)),l.onScroll!=null&&R("scroll",e),l.onScrollEnd!=null&&R("scrollend",e),l.onClick!=null&&(e.onclick=Ge),e=!0):e=!1,e||Ma(t,!0)}function op(t){for(wt=t.return;wt;)switch(wt.tag){case 5:case 31:case 13:se=!1;return;case 27:case 3:se=!0;return;default:wt=wt.return}}function ml(t){if(t!==wt)return!1;if(!B)return op(t),B=!0,!1;var e=t.tag,a;if((a=e!==3&&e!==27)&&((a=e===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||Vs(t.type,t.memoizedProps)),a=!a),a&&F&&Ma(t),op(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(w(317));F=Kp(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(w(317));F=Kp(t)}else e===27?(e=F,Ca(t.type)?(t=Zs,Zs=null,F=t):F=e):F=wt?fe(t.stateNode.nextSibling):null;return!0}function Ja(){F=wt=null,B=!1}function Uc(){var t=va;return t!==null&&(Bt===null?Bt=t:Bt.push.apply(Bt,t),va=null),t}function Zn(t){va===null?va=[t]:va.push(t)}var vs=ze(null),nl=null,Qe=null;function ca(t,e,a){K(vs,e._currentValue),e._currentValue=a}function Ze(t){t._currentValue=vs.current,yt(vs)}function bs(t,e,a){for(;t!==null;){var l=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,l!==null&&(l.childLanes|=e)):l!==null&&(l.childLanes&e)!==e&&(l.childLanes|=e),t===a)break;t=t.return}}function Ss(t,e,a,l){var n=t.child;for(n!==null&&(n.return=t);n!==null;){var i=n.dependencies;if(i!==null){var o=n.child;i=i.firstContext;t:for(;i!==null;){var u=i;i=n;for(var s=0;s<e.length;s++)if(u.context===e[s]){i.lanes|=a,u=i.alternate,u!==null&&(u.lanes|=a),bs(i.return,a,t),l||(o=null);break t}i=u.next}}else if(n.tag===18){if(o=n.return,o===null)throw Error(w(341));o.lanes|=a,i=o.alternate,i!==null&&(i.lanes|=a),bs(o,a,t),o=null}else o=n.child;if(o!==null)o.return=n;else for(o=n;o!==null;){if(o===t){o=null;break}if(n=o.sibling,n!==null){n.return=o.return,o=n;break}o=o.return}n=o}}function Wl(t,e,a,l){t=null;for(var n=e,i=!1;n!==null;){if(!i){if((n.flags&524288)!==0)i=!0;else if((n.flags&262144)!==0)break}if(n.tag===10){var o=n.alternate;if(o===null)throw Error(w(387));if(o=o.memoizedProps,o!==null){var u=n.type;Ft(n.pendingProps.value,o.value)||(t!==null?t.push(u):t=[u])}}else if(n===Co.current){if(o=n.alternate,o===null)throw Error(w(387));o.memoizedState.memoizedState!==n.memoizedState.memoizedState&&(t!==null?t.push(In):t=[In])}n=n.return}t!==null&&Ss(e,t,a,l),e.flags|=262144}function qo(t){for(t=t.firstContext;t!==null;){if(!Ft(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Wa(t){nl=t,Qe=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function xt(t){return Fm(nl,t)}function io(t,e){return nl===null&&Wa(t),Fm(t,e)}function Fm(t,e){var a=e._currentValue;if(e={context:e,memoizedValue:a,next:null},Qe===null){if(t===null)throw Error(w(308));Qe=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Qe=Qe.next=e;return a}var _1=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(a,l){t.push(l)}};this.abort=function(){e.aborted=!0,t.forEach(function(a){return a()})}},M1=pt.unstable_scheduleCallback,z1=pt.unstable_NormalPriority,rt={$$typeof:Ve,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function dr(){return{controller:new _1,data:new Map,refCount:0}}function ui(t){t.refCount--,t.refCount===0&&M1(z1,function(){t.controller.abort()})}var Cn=null,ws=0,Yl=0,Rl=null;function N1(t,e){if(Cn===null){var a=Cn=[];ws=0,Yl=Br(),Rl={status:"pending",value:void 0,then:function(l){a.push(l)}}}return ws++,e.then(up,up),e}function up(){if(--ws===0&&Cn!==null){Rl!==null&&(Rl.status="fulfilled");var t=Cn;Cn=null,Yl=0,Rl=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function O1(t,e){var a=[],l={status:"pending",value:null,reason:null,then:function(n){a.push(n)}};return t.then(function(){l.status="fulfilled",l.value=e;for(var n=0;n<a.length;n++)(0,a[n])(e)},function(n){for(l.status="rejected",l.reason=n,n=0;n<a.length;n++)(0,a[n])(void 0)}),l}var cp=z.S;z.S=function(t,e){f0=kt(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&N1(t,e),cp!==null&&cp(t,e)};var Za=ze(null);function pr(){var t=Za.current;return t!==null?t:Z.pooledCache}function wo(t,e){e===null?K(Za,Za.current):K(Za,e.pool)}function Im(){var t=pr();return t===null?null:{parent:rt._currentValue,pool:t}}var Fl=Error(w(460)),mr=Error(w(474)),du=Error(w(542)),Yo={then:function(){}};function sp(t){return t=t.status,t==="fulfilled"||t==="rejected"}function Pm(t,e,a){switch(a=t[a],a===void 0?t.push(e):a!==e&&(e.then(Ge,Ge),e=a),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,fp(t),t;default:if(typeof e.status=="string")e.then(Ge,Ge);else{if(t=Z,t!==null&&100<t.shellSuspendCounter)throw Error(w(482));t=e,t.status="pending",t.then(function(l){if(e.status==="pending"){var n=e;n.status="fulfilled",n.value=l}},function(l){if(e.status==="pending"){var n=e;n.status="rejected",n.reason=l}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,fp(t),t}throw ka=e,Fl}}function Va(t){try{var e=t._init;return e(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(ka=a,Fl):a}}var ka=null;function rp(){if(ka===null)throw Error(w(459));var t=ka;return ka=null,t}function fp(t){if(t===Fl||t===du)throw Error(w(483))}var Ul=null,kn=0;function oo(t){var e=kn;return kn+=1,Ul===null&&(Ul=[]),Pm(Ul,t,e)}function vn(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function uo(t,e){throw e.$$typeof===gv?Error(w(525)):(t=Object.prototype.toString.call(e),Error(w(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function th(t){function e(f,r){if(t){var h=f.deletions;h===null?(f.deletions=[r],f.flags|=16):h.push(r)}}function a(f,r){if(!t)return null;for(;r!==null;)e(f,r),r=r.sibling;return null}function l(f){for(var r=new Map;f!==null;)f.key!==null?r.set(f.key,f):r.set(f.index,f),f=f.sibling;return r}function n(f,r){return f=Xe(f,r),f.index=0,f.sibling=null,f}function i(f,r,h){return f.index=h,t?(h=f.alternate,h!==null?(h=h.index,h<r?(f.flags|=67108866,r):h):(f.flags|=67108866,r)):(f.flags|=1048576,r)}function o(f){return t&&f.alternate===null&&(f.flags|=67108866),f}function u(f,r,h,b){return r===null||r.tag!==6?(r=$c(h,f.mode,b),r.return=f,r):(r=n(r,h),r.return=f,r)}function s(f,r,h,b){var A=h.type;return A===vl?g(f,r,h.props.children,b,h.key):r!==null&&(r.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===oa&&Va(A)===r.type)?(r=n(r,h.props),vn(r,h),r.return=f,r):(r=So(h.type,h.key,h.props,null,f.mode,b),vn(r,h),r.return=f,r)}function p(f,r,h,b){return r===null||r.tag!==4||r.stateNode.containerInfo!==h.containerInfo||r.stateNode.implementation!==h.implementation?(r=Rc(h,f.mode,b),r.return=f,r):(r=n(r,h.children||[]),r.return=f,r)}function g(f,r,h,b,A){return r===null||r.tag!==7?(r=Xa(h,f.mode,b,A),r.return=f,r):(r=n(r,h),r.return=f,r)}function v(f,r,h){if(typeof r=="string"&&r!==""||typeof r=="number"||typeof r=="bigint")return r=$c(""+r,f.mode,h),r.return=f,r;if(typeof r=="object"&&r!==null){switch(r.$$typeof){case Fi:return h=So(r.type,r.key,r.props,null,f.mode,h),vn(h,r),h.return=f,h;case En:return r=Rc(r,f.mode,h),r.return=f,r;case oa:return r=Va(r),v(f,r,h)}if(Tn(r)||gn(r))return r=Xa(r,f.mode,h,null),r.return=f,r;if(typeof r.then=="function")return v(f,oo(r),h);if(r.$$typeof===Ve)return v(f,io(f,r),h);uo(f,r)}return null}function m(f,r,h,b){var A=r!==null?r.key:null;if(typeof h=="string"&&h!==""||typeof h=="number"||typeof h=="bigint")return A!==null?null:u(f,r,""+h,b);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Fi:return h.key===A?s(f,r,h,b):null;case En:return h.key===A?p(f,r,h,b):null;case oa:return h=Va(h),m(f,r,h,b)}if(Tn(h)||gn(h))return A!==null?null:g(f,r,h,b,null);if(typeof h.then=="function")return m(f,r,oo(h),b);if(h.$$typeof===Ve)return m(f,r,io(f,h),b);uo(f,h)}return null}function y(f,r,h,b,A){if(typeof b=="string"&&b!==""||typeof b=="number"||typeof b=="bigint")return f=f.get(h)||null,u(r,f,""+b,A);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case Fi:return f=f.get(b.key===null?h:b.key)||null,s(r,f,b,A);case En:return f=f.get(b.key===null?h:b.key)||null,p(r,f,b,A);case oa:return b=Va(b),y(f,r,h,b,A)}if(Tn(b)||gn(b))return f=f.get(h)||null,g(r,f,b,A,null);if(typeof b.then=="function")return y(f,r,h,oo(b),A);if(b.$$typeof===Ve)return y(f,r,h,io(r,b),A);uo(r,b)}return null}function E(f,r,h,b){for(var A=null,H=null,T=r,$=r=0,D=null;T!==null&&$<h.length;$++){T.index>$?(D=T,T=null):D=T.sibling;var q=m(f,T,h[$],b);if(q===null){T===null&&(T=D);break}t&&T&&q.alternate===null&&e(f,T),r=i(q,r,$),H===null?A=q:H.sibling=q,H=q,T=D}if($===h.length)return a(f,T),B&&Ye(f,$),A;if(T===null){for(;$<h.length;$++)T=v(f,h[$],b),T!==null&&(r=i(T,r,$),H===null?A=T:H.sibling=T,H=T);return B&&Ye(f,$),A}for(T=l(T);$<h.length;$++)D=y(T,f,$,h[$],b),D!==null&&(t&&D.alternate!==null&&T.delete(D.key===null?$:D.key),r=i(D,r,$),H===null?A=D:H.sibling=D,H=D);return t&&T.forEach(function(aa){return e(f,aa)}),B&&Ye(f,$),A}function _(f,r,h,b){if(h==null)throw Error(w(151));for(var A=null,H=null,T=r,$=r=0,D=null,q=h.next();T!==null&&!q.done;$++,q=h.next()){T.index>$?(D=T,T=null):D=T.sibling;var aa=m(f,T,q.value,b);if(aa===null){T===null&&(T=D);break}t&&T&&aa.alternate===null&&e(f,T),r=i(aa,r,$),H===null?A=aa:H.sibling=aa,H=aa,T=D}if(q.done)return a(f,T),B&&Ye(f,$),A;if(T===null){for(;!q.done;$++,q=h.next())q=v(f,q.value,b),q!==null&&(r=i(q,r,$),H===null?A=q:H.sibling=q,H=q);return B&&Ye(f,$),A}for(T=l(T);!q.done;$++,q=h.next())q=y(T,f,$,q.value,b),q!==null&&(t&&q.alternate!==null&&T.delete(q.key===null?$:q.key),r=i(q,r,$),H===null?A=q:H.sibling=q,H=q);return t&&T.forEach(function(Hy){return e(f,Hy)}),B&&Ye(f,$),A}function O(f,r,h,b){if(typeof h=="object"&&h!==null&&h.type===vl&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case Fi:t:{for(var A=h.key;r!==null;){if(r.key===A){if(A=h.type,A===vl){if(r.tag===7){a(f,r.sibling),b=n(r,h.props.children),b.return=f,f=b;break t}}else if(r.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===oa&&Va(A)===r.type){a(f,r.sibling),b=n(r,h.props),vn(b,h),b.return=f,f=b;break t}a(f,r);break}else e(f,r);r=r.sibling}h.type===vl?(b=Xa(h.props.children,f.mode,b,h.key),b.return=f,f=b):(b=So(h.type,h.key,h.props,null,f.mode,b),vn(b,h),b.return=f,f=b)}return o(f);case En:t:{for(A=h.key;r!==null;){if(r.key===A)if(r.tag===4&&r.stateNode.containerInfo===h.containerInfo&&r.stateNode.implementation===h.implementation){a(f,r.sibling),b=n(r,h.children||[]),b.return=f,f=b;break t}else{a(f,r);break}else e(f,r);r=r.sibling}b=Rc(h,f.mode,b),b.return=f,f=b}return o(f);case oa:return h=Va(h),O(f,r,h,b)}if(Tn(h))return E(f,r,h,b);if(gn(h)){if(A=gn(h),typeof A!="function")throw Error(w(150));return h=A.call(h),_(f,r,h,b)}if(typeof h.then=="function")return O(f,r,oo(h),b);if(h.$$typeof===Ve)return O(f,r,io(f,h),b);uo(f,h)}return typeof h=="string"&&h!==""||typeof h=="number"||typeof h=="bigint"?(h=""+h,r!==null&&r.tag===6?(a(f,r.sibling),b=n(r,h),b.return=f,f=b):(a(f,r),b=$c(h,f.mode,b),b.return=f,f=b),o(f)):a(f,r)}return function(f,r,h,b){try{kn=0;var A=O(f,r,h,b);return Ul=null,A}catch(T){if(T===Fl||T===du)throw T;var H=Xt(29,T,null,f.mode);return H.lanes=b,H.return=f,H}finally{}}}var Fa=th(!0),eh=th(!1),ua=!1;function hr(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function xs(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function ba(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Sa(t,e,a){var l=t.updateQueue;if(l===null)return null;if(l=l.shared,(Y&2)!==0){var n=l.pending;return n===null?e.next=e:(e.next=n.next,n.next=e),l.pending=e,e=Bo(t),Zm(t,null,a),e}return fu(t,l,e,a),Bo(t)}function $n(t,e,a){if(e=e.updateQueue,e!==null&&(e=e.shared,(a&4194048)!==0)){var l=e.lanes;l&=t.pendingLanes,a|=l,e.lanes=a,bm(t,a)}}function Dc(t,e){var a=t.updateQueue,l=t.alternate;if(l!==null&&(l=l.updateQueue,a===l)){var n=null,i=null;if(a=a.firstBaseUpdate,a!==null){do{var o={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};i===null?n=i=o:i=i.next=o,a=a.next}while(a!==null);i===null?n=i=e:i=i.next=e}else n=i=e;a={baseState:l.baseState,firstBaseUpdate:n,lastBaseUpdate:i,shared:l.shared,callbacks:l.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=e:t.next=e,a.lastBaseUpdate=e}var Es=!1;function Rn(){if(Es){var t=Rl;if(t!==null)throw t}}function Un(t,e,a,l){Es=!1;var n=t.updateQueue;ua=!1;var i=n.firstBaseUpdate,o=n.lastBaseUpdate,u=n.shared.pending;if(u!==null){n.shared.pending=null;var s=u,p=s.next;s.next=null,o===null?i=p:o.next=p,o=s;var g=t.alternate;g!==null&&(g=g.updateQueue,u=g.lastBaseUpdate,u!==o&&(u===null?g.firstBaseUpdate=p:u.next=p,g.lastBaseUpdate=s))}if(i!==null){var v=n.baseState;o=0,g=p=s=null,u=i;do{var m=u.lane&-536870913,y=m!==u.lane;if(y?(L&m)===m:(l&m)===m){m!==0&&m===Yl&&(Es=!0),g!==null&&(g=g.next={lane:0,tag:u.tag,payload:u.payload,callback:null,next:null});t:{var E=t,_=u;m=e;var O=a;switch(_.tag){case 1:if(E=_.payload,typeof E=="function"){v=E.call(O,v,m);break t}v=E;break t;case 3:E.flags=E.flags&-65537|128;case 0:if(E=_.payload,m=typeof E=="function"?E.call(O,v,m):E,m==null)break t;v=I({},v,m);break t;case 2:ua=!0}}m=u.callback,m!==null&&(t.flags|=64,y&&(t.flags|=8192),y=n.callbacks,y===null?n.callbacks=[m]:y.push(m))}else y={lane:m,tag:u.tag,payload:u.payload,callback:u.callback,next:null},g===null?(p=g=y,s=v):g=g.next=y,o|=m;if(u=u.next,u===null){if(u=n.shared.pending,u===null)break;y=u,u=y.next,y.next=null,n.lastBaseUpdate=y,n.shared.pending=null}}while(!0);g===null&&(s=v),n.baseState=s,n.firstBaseUpdate=p,n.lastBaseUpdate=g,i===null&&(n.shared.lanes=0),Na|=o,t.lanes=o,t.memoizedState=v}}function ah(t,e){if(typeof t!="function")throw Error(w(191,t));t.call(e)}function lh(t,e){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)ah(a[t],e)}var jl=ze(null),jo=ze(0);function dp(t,e){t=Ie,K(jo,t),K(jl,e),Ie=t|e.baseLanes}function Ts(){K(jo,Ie),K(jl,jl.current)}function gr(){Ie=jo.current,yt(jl),yt(jo)}var It=ze(null),re=null;function sa(t){var e=t.alternate;K(nt,nt.current&1),K(It,t),re===null&&(e===null||jl.current!==null||e.memoizedState!==null)&&(re=t)}function As(t){K(nt,nt.current),K(It,t),re===null&&(re=t)}function nh(t){t.tag===22?(K(nt,nt.current),K(It,t),re===null&&(re=t)):ra(t)}function ra(){K(nt,nt.current),K(It,It.current)}function Qt(t){yt(It),re===t&&(re=null),yt(nt)}var nt=ze(0);function Vo(t){for(var e=t;e!==null;){if(e.tag===13){var a=e.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Qs(a)||Xs(a)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Je=0,C=null,X=null,ct=null,Go=!1,Dl=!1,Ia=!1,Qo=0,Kn=0,Ll=null,C1=0;function at(){throw Error(w(321))}function yr(t,e){if(e===null)return!1;for(var a=0;a<e.length&&a<t.length;a++)if(!Ft(t[a],e[a]))return!1;return!0}function vr(t,e,a,l,n,i){return Je=i,C=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,z.H=t===null||t.memoizedState===null?Dh:Nr,Ia=!1,i=a(l,n),Ia=!1,Dl&&(i=oh(e,a,l,n)),ih(t),i}function ih(t){z.H=Jn;var e=X!==null&&X.next!==null;if(Je=0,ct=X=C=null,Go=!1,Kn=0,Ll=null,e)throw Error(w(300));t===null||ft||(t=t.dependencies,t!==null&&qo(t)&&(ft=!0))}function oh(t,e,a,l){C=t;var n=0;do{if(Dl&&(Ll=null),Kn=0,Dl=!1,25<=n)throw Error(w(301));if(n+=1,ct=X=null,t.updateQueue!=null){var i=t.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}z.H=Lh,i=e(a,l)}while(Dl);return i}function $1(){var t=z.H,e=t.useState()[0];return e=typeof e.then=="function"?ci(e):e,t=t.useState()[0],(X!==null?X.memoizedState:null)!==t&&(C.flags|=1024),e}function br(){var t=Qo!==0;return Qo=0,t}function Sr(t,e,a){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~a}function wr(t){if(Go){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}Go=!1}Je=0,ct=X=C=null,Dl=!1,Kn=Qo=0,Ll=null}function Ot(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ct===null?C.memoizedState=ct=t:ct=ct.next=t,ct}function it(){if(X===null){var t=C.alternate;t=t!==null?t.memoizedState:null}else t=X.next;var e=ct===null?C.memoizedState:ct.next;if(e!==null)ct=e,X=t;else{if(t===null)throw C.alternate===null?Error(w(467)):Error(w(310));X=t,t={memoizedState:X.memoizedState,baseState:X.baseState,baseQueue:X.baseQueue,queue:X.queue,next:null},ct===null?C.memoizedState=ct=t:ct=ct.next=t}return ct}function pu(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ci(t){var e=Kn;return Kn+=1,Ll===null&&(Ll=[]),t=Pm(Ll,t,e),e=C,(ct===null?e.memoizedState:ct.next)===null&&(e=e.alternate,z.H=e===null||e.memoizedState===null?Dh:Nr),t}function mu(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return ci(t);if(t.$$typeof===Ve)return xt(t)}throw Error(w(438,String(t)))}function xr(t){var e=null,a=C.updateQueue;if(a!==null&&(e=a.memoCache),e==null){var l=C.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(e={data:l.data.map(function(n){return n.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),a===null&&(a=pu(),C.updateQueue=a),a.memoCache=e,a=e.data[e.index],a===void 0)for(a=e.data[e.index]=Array(t),l=0;l<t;l++)a[l]=yv;return e.index++,a}function We(t,e){return typeof e=="function"?e(t):e}function xo(t){var e=it();return Er(e,X,t)}function Er(t,e,a){var l=t.queue;if(l===null)throw Error(w(311));l.lastRenderedReducer=a;var n=t.baseQueue,i=l.pending;if(i!==null){if(n!==null){var o=n.next;n.next=i.next,i.next=o}e.baseQueue=n=i,l.pending=null}if(i=t.baseState,n===null)t.memoizedState=i;else{e=n.next;var u=o=null,s=null,p=e,g=!1;do{var v=p.lane&-536870913;if(v!==p.lane?(L&v)===v:(Je&v)===v){var m=p.revertLane;if(m===0)s!==null&&(s=s.next={lane:0,revertLane:0,gesture:null,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null}),v===Yl&&(g=!0);else if((Je&m)===m){p=p.next,m===Yl&&(g=!0);continue}else v={lane:0,revertLane:p.revertLane,gesture:null,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null},s===null?(u=s=v,o=i):s=s.next=v,C.lanes|=m,Na|=m;v=p.action,Ia&&a(i,v),i=p.hasEagerState?p.eagerState:a(i,v)}else m={lane:v,revertLane:p.revertLane,gesture:p.gesture,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null},s===null?(u=s=m,o=i):s=s.next=m,C.lanes|=v,Na|=v;p=p.next}while(p!==null&&p!==e);if(s===null?o=i:s.next=u,!Ft(i,t.memoizedState)&&(ft=!0,g&&(a=Rl,a!==null)))throw a;t.memoizedState=i,t.baseState=o,t.baseQueue=s,l.lastRenderedState=i}return n===null&&(l.lanes=0),[t.memoizedState,l.dispatch]}function Lc(t){var e=it(),a=e.queue;if(a===null)throw Error(w(311));a.lastRenderedReducer=t;var l=a.dispatch,n=a.pending,i=e.memoizedState;if(n!==null){a.pending=null;var o=n=n.next;do i=t(i,o.action),o=o.next;while(o!==n);Ft(i,e.memoizedState)||(ft=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),a.lastRenderedState=i}return[i,l]}function uh(t,e,a){var l=C,n=it(),i=B;if(i){if(a===void 0)throw Error(w(407));a=a()}else a=e();var o=!Ft((X||n).memoizedState,a);if(o&&(n.memoizedState=a,ft=!0),n=n.queue,Tr(rh.bind(null,l,n,t),[t]),n.getSnapshot!==e||o||ct!==null&&ct.memoizedState.tag&1){if(l.flags|=2048,Vl(9,{destroy:void 0},sh.bind(null,l,n,a,e),null),Z===null)throw Error(w(349));i||(Je&127)!==0||ch(l,e,a)}return a}function ch(t,e,a){t.flags|=16384,t={getSnapshot:e,value:a},e=C.updateQueue,e===null?(e=pu(),C.updateQueue=e,e.stores=[t]):(a=e.stores,a===null?e.stores=[t]:a.push(t))}function sh(t,e,a,l){e.value=a,e.getSnapshot=l,fh(e)&&dh(t)}function rh(t,e,a){return a(function(){fh(e)&&dh(t)})}function fh(t){var e=t.getSnapshot;t=t.value;try{var a=e();return!Ft(t,a)}catch{return!0}}function dh(t){var e=ll(t,2);e!==null&&Ht(e,t,2)}function _s(t){var e=Ot();if(typeof t=="function"){var a=t;if(t=a(),Ia){da(!0);try{a()}finally{da(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:We,lastRenderedState:t},e}function ph(t,e,a,l){return t.baseState=a,Er(t,X,typeof l=="function"?l:We)}function R1(t,e,a,l,n){if(gu(t))throw Error(w(485));if(t=e.action,t!==null){var i={payload:n,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(o){i.listeners.push(o)}};z.T!==null?a(!0):i.isTransition=!1,l(i),a=e.pending,a===null?(i.next=e.pending=i,mh(e,i)):(i.next=a.next,e.pending=a.next=i)}}function mh(t,e){var a=e.action,l=e.payload,n=t.state;if(e.isTransition){var i=z.T,o={};z.T=o;try{var u=a(n,l),s=z.S;s!==null&&s(o,u),pp(t,e,u)}catch(p){Ms(t,e,p)}finally{i!==null&&o.types!==null&&(i.types=o.types),z.T=i}}else try{i=a(n,l),pp(t,e,i)}catch(p){Ms(t,e,p)}}function pp(t,e,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(l){mp(t,e,l)},function(l){return Ms(t,e,l)}):mp(t,e,a)}function mp(t,e,a){e.status="fulfilled",e.value=a,hh(e),t.state=a,e=t.pending,e!==null&&(a=e.next,a===e?t.pending=null:(a=a.next,e.next=a,mh(t,a)))}function Ms(t,e,a){var l=t.pending;if(t.pending=null,l!==null){l=l.next;do e.status="rejected",e.reason=a,hh(e),e=e.next;while(e!==l)}t.action=null}function hh(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function gh(t,e){return e}function hp(t,e){if(B){var a=Z.formState;if(a!==null){t:{var l=C;if(B){if(F){e:{for(var n=F,i=se;n.nodeType!==8;){if(!i){n=null;break e}if(n=fe(n.nextSibling),n===null){n=null;break e}}i=n.data,n=i==="F!"||i==="F"?n:null}if(n){F=fe(n.nextSibling),l=n.data==="F!";break t}}Ma(l)}l=!1}l&&(e=a[0])}}return a=Ot(),a.memoizedState=a.baseState=e,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:gh,lastRenderedState:e},a.queue=l,a=$h.bind(null,C,l),l.dispatch=a,l=_s(!1),i=zr.bind(null,C,!1,l.queue),l=Ot(),n={state:e,dispatch:null,action:t,pending:null},l.queue=n,a=R1.bind(null,C,n,i,a),n.dispatch=a,l.memoizedState=t,[e,a,!1]}function gp(t){var e=it();return yh(e,X,t)}function yh(t,e,a){if(e=Er(t,e,gh)[0],t=xo(We)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var l=ci(e)}catch(o){throw o===Fl?du:o}else l=e;e=it();var n=e.queue,i=n.dispatch;return a!==e.memoizedState&&(C.flags|=2048,Vl(9,{destroy:void 0},U1.bind(null,n,a),null)),[l,i,t]}function U1(t,e){t.action=e}function yp(t){var e=it(),a=X;if(a!==null)return yh(e,a,t);it(),e=e.memoizedState,a=it();var l=a.queue.dispatch;return a.memoizedState=t,[e,l,!1]}function Vl(t,e,a,l){return t={tag:t,create:a,deps:l,inst:e,next:null},e=C.updateQueue,e===null&&(e=pu(),C.updateQueue=e),a=e.lastEffect,a===null?e.lastEffect=t.next=t:(l=a.next,a.next=t,t.next=l,e.lastEffect=t),t}function vh(){return it().memoizedState}function Eo(t,e,a,l){var n=Ot();C.flags|=t,n.memoizedState=Vl(1|e,{destroy:void 0},a,l===void 0?null:l)}function hu(t,e,a,l){var n=it();l=l===void 0?null:l;var i=n.memoizedState.inst;X!==null&&l!==null&&yr(l,X.memoizedState.deps)?n.memoizedState=Vl(e,i,a,l):(C.flags|=t,n.memoizedState=Vl(1|e,i,a,l))}function vp(t,e){Eo(8390656,8,t,e)}function Tr(t,e){hu(2048,8,t,e)}function D1(t){C.flags|=4;var e=C.updateQueue;if(e===null)e=pu(),C.updateQueue=e,e.events=[t];else{var a=e.events;a===null?e.events=[t]:a.push(t)}}function bh(t){var e=it().memoizedState;return D1({ref:e,nextImpl:t}),function(){if((Y&2)!==0)throw Error(w(440));return e.impl.apply(void 0,arguments)}}function Sh(t,e){return hu(4,2,t,e)}function wh(t,e){return hu(4,4,t,e)}function xh(t,e){if(typeof e=="function"){t=t();var a=e(t);return function(){typeof a=="function"?a():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Eh(t,e,a){a=a!=null?a.concat([t]):null,hu(4,4,xh.bind(null,e,t),a)}function Ar(){}function Th(t,e){var a=it();e=e===void 0?null:e;var l=a.memoizedState;return e!==null&&yr(e,l[1])?l[0]:(a.memoizedState=[t,e],t)}function Ah(t,e){var a=it();e=e===void 0?null:e;var l=a.memoizedState;if(e!==null&&yr(e,l[1]))return l[0];if(l=t(),Ia){da(!0);try{t()}finally{da(!1)}}return a.memoizedState=[l,e],l}function _r(t,e,a){return a===void 0||(Je&1073741824)!==0&&(L&261930)===0?t.memoizedState=e:(t.memoizedState=a,t=p0(),C.lanes|=t,Na|=t,a)}function _h(t,e,a,l){return Ft(a,e)?a:jl.current!==null?(t=_r(t,a,l),Ft(t,e)||(ft=!0),t):(Je&42)===0||(Je&1073741824)!==0&&(L&261930)===0?(ft=!0,t.memoizedState=a):(t=p0(),C.lanes|=t,Na|=t,e)}function Mh(t,e,a,l,n){var i=j.p;j.p=i!==0&&8>i?i:8;var o=z.T,u={};z.T=u,zr(t,!1,e,a);try{var s=n(),p=z.S;if(p!==null&&p(u,s),s!==null&&typeof s=="object"&&typeof s.then=="function"){var g=O1(s,l);Dn(t,e,g,Wt(t))}else Dn(t,e,l,Wt(t))}catch(v){Dn(t,e,{then:function(){},status:"rejected",reason:v},Wt())}finally{j.p=i,o!==null&&u.types!==null&&(o.types=u.types),z.T=o}}function L1(){}function zs(t,e,a,l){if(t.tag!==5)throw Error(w(476));var n=zh(t).queue;Mh(t,n,e,Qa,a===null?L1:function(){return Nh(t),a(l)})}function zh(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:Qa,baseState:Qa,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:We,lastRenderedState:Qa},next:null};var a={};return e.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:We,lastRenderedState:a},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function Nh(t){var e=zh(t);e.next===null&&(e=t.alternate.memoizedState),Dn(t,e.next.queue,{},Wt())}function Mr(){return xt(In)}function Oh(){return it().memoizedState}function Ch(){return it().memoizedState}function B1(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var a=Wt();t=ba(a);var l=Sa(e,t,a);l!==null&&(Ht(l,e,a),$n(l,e,a)),e={cache:dr()},t.payload=e;return}e=e.return}}function H1(t,e,a){var l=Wt();a={lane:l,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},gu(t)?Rh(e,a):(a=cr(t,e,a,l),a!==null&&(Ht(a,t,l),Uh(a,e,l)))}function $h(t,e,a){var l=Wt();Dn(t,e,a,l)}function Dn(t,e,a,l){var n={lane:l,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(gu(t))Rh(e,n);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var o=e.lastRenderedState,u=i(o,a);if(n.hasEagerState=!0,n.eagerState=u,Ft(u,o))return fu(t,e,n,0),Z===null&&ru(),!1}catch{}finally{}if(a=cr(t,e,n,l),a!==null)return Ht(a,t,l),Uh(a,e,l),!0}return!1}function zr(t,e,a,l){if(l={lane:2,revertLane:Br(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},gu(t)){if(e)throw Error(w(479))}else e=cr(t,a,l,2),e!==null&&Ht(e,t,2)}function gu(t){var e=t.alternate;return t===C||e!==null&&e===C}function Rh(t,e){Dl=Go=!0;var a=t.pending;a===null?e.next=e:(e.next=a.next,a.next=e),t.pending=e}function Uh(t,e,a){if((a&4194048)!==0){var l=e.lanes;l&=t.pendingLanes,a|=l,e.lanes=a,bm(t,a)}}var Jn={readContext:xt,use:mu,useCallback:at,useContext:at,useEffect:at,useImperativeHandle:at,useLayoutEffect:at,useInsertionEffect:at,useMemo:at,useReducer:at,useRef:at,useState:at,useDebugValue:at,useDeferredValue:at,useTransition:at,useSyncExternalStore:at,useId:at,useHostTransitionStatus:at,useFormState:at,useActionState:at,useOptimistic:at,useMemoCache:at,useCacheRefresh:at};Jn.useEffectEvent=at;var Dh={readContext:xt,use:mu,useCallback:function(t,e){return Ot().memoizedState=[t,e===void 0?null:e],t},useContext:xt,useEffect:vp,useImperativeHandle:function(t,e,a){a=a!=null?a.concat([t]):null,Eo(4194308,4,xh.bind(null,e,t),a)},useLayoutEffect:function(t,e){return Eo(4194308,4,t,e)},useInsertionEffect:function(t,e){Eo(4,2,t,e)},useMemo:function(t,e){var a=Ot();e=e===void 0?null:e;var l=t();if(Ia){da(!0);try{t()}finally{da(!1)}}return a.memoizedState=[l,e],l},useReducer:function(t,e,a){var l=Ot();if(a!==void 0){var n=a(e);if(Ia){da(!0);try{a(e)}finally{da(!1)}}}else n=e;return l.memoizedState=l.baseState=n,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:n},l.queue=t,t=t.dispatch=H1.bind(null,C,t),[l.memoizedState,t]},useRef:function(t){var e=Ot();return t={current:t},e.memoizedState=t},useState:function(t){t=_s(t);var e=t.queue,a=$h.bind(null,C,e);return e.dispatch=a,[t.memoizedState,a]},useDebugValue:Ar,useDeferredValue:function(t,e){var a=Ot();return _r(a,t,e)},useTransition:function(){var t=_s(!1);return t=Mh.bind(null,C,t.queue,!0,!1),Ot().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,a){var l=C,n=Ot();if(B){if(a===void 0)throw Error(w(407));a=a()}else{if(a=e(),Z===null)throw Error(w(349));(L&127)!==0||ch(l,e,a)}n.memoizedState=a;var i={value:a,getSnapshot:e};return n.queue=i,vp(rh.bind(null,l,i,t),[t]),l.flags|=2048,Vl(9,{destroy:void 0},sh.bind(null,l,i,a,e),null),a},useId:function(){var t=Ot(),e=Z.identifierPrefix;if(B){var a=Ae,l=Te;a=(l&~(1<<32-Jt(l)-1)).toString(32)+a,e="_"+e+"R_"+a,a=Qo++,0<a&&(e+="H"+a.toString(32)),e+="_"}else a=C1++,e="_"+e+"r_"+a.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:Mr,useFormState:hp,useActionState:hp,useOptimistic:function(t){var e=Ot();e.memoizedState=e.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=a,e=zr.bind(null,C,!0,a),a.dispatch=e,[t,e]},useMemoCache:xr,useCacheRefresh:function(){return Ot().memoizedState=B1.bind(null,C)},useEffectEvent:function(t){var e=Ot(),a={impl:t};return e.memoizedState=a,function(){if((Y&2)!==0)throw Error(w(440));return a.impl.apply(void 0,arguments)}}},Nr={readContext:xt,use:mu,useCallback:Th,useContext:xt,useEffect:Tr,useImperativeHandle:Eh,useInsertionEffect:Sh,useLayoutEffect:wh,useMemo:Ah,useReducer:xo,useRef:vh,useState:function(){return xo(We)},useDebugValue:Ar,useDeferredValue:function(t,e){var a=it();return _h(a,X.memoizedState,t,e)},useTransition:function(){var t=xo(We)[0],e=it().memoizedState;return[typeof t=="boolean"?t:ci(t),e]},useSyncExternalStore:uh,useId:Oh,useHostTransitionStatus:Mr,useFormState:gp,useActionState:gp,useOptimistic:function(t,e){var a=it();return ph(a,X,t,e)},useMemoCache:xr,useCacheRefresh:Ch};Nr.useEffectEvent=bh;var Lh={readContext:xt,use:mu,useCallback:Th,useContext:xt,useEffect:Tr,useImperativeHandle:Eh,useInsertionEffect:Sh,useLayoutEffect:wh,useMemo:Ah,useReducer:Lc,useRef:vh,useState:function(){return Lc(We)},useDebugValue:Ar,useDeferredValue:function(t,e){var a=it();return X===null?_r(a,t,e):_h(a,X.memoizedState,t,e)},useTransition:function(){var t=Lc(We)[0],e=it().memoizedState;return[typeof t=="boolean"?t:ci(t),e]},useSyncExternalStore:uh,useId:Oh,useHostTransitionStatus:Mr,useFormState:yp,useActionState:yp,useOptimistic:function(t,e){var a=it();return X!==null?ph(a,X,t,e):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:xr,useCacheRefresh:Ch};Lh.useEffectEvent=bh;function Bc(t,e,a,l){e=t.memoizedState,a=a(l,e),a=a==null?e:I({},e,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var Ns={enqueueSetState:function(t,e,a){t=t._reactInternals;var l=Wt(),n=ba(l);n.payload=e,a!=null&&(n.callback=a),e=Sa(t,n,l),e!==null&&(Ht(e,t,l),$n(e,t,l))},enqueueReplaceState:function(t,e,a){t=t._reactInternals;var l=Wt(),n=ba(l);n.tag=1,n.payload=e,a!=null&&(n.callback=a),e=Sa(t,n,l),e!==null&&(Ht(e,t,l),$n(e,t,l))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var a=Wt(),l=ba(a);l.tag=2,e!=null&&(l.callback=e),e=Sa(t,l,a),e!==null&&(Ht(e,t,a),$n(e,t,a))}};function bp(t,e,a,l,n,i,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(l,i,o):e.prototype&&e.prototype.isPureReactComponent?!Qn(a,l)||!Qn(n,i):!0}function Sp(t,e,a,l){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(a,l),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(a,l),e.state!==t&&Ns.enqueueReplaceState(e,e.state,null)}function Pa(t,e){var a=e;if("ref"in e){a={};for(var l in e)l!=="ref"&&(a[l]=e[l])}if(t=t.defaultProps){a===e&&(a=I({},a));for(var n in t)a[n]===void 0&&(a[n]=t[n])}return a}function Bh(t){Lo(t)}function Hh(t){console.error(t)}function qh(t){Lo(t)}function Xo(t,e){try{var a=t.onUncaughtError;a(e.value,{componentStack:e.stack})}catch(l){setTimeout(function(){throw l})}}function wp(t,e,a){try{var l=t.onCaughtError;l(a.value,{componentStack:a.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(n){setTimeout(function(){throw n})}}function Os(t,e,a){return a=ba(a),a.tag=3,a.payload={element:null},a.callback=function(){Xo(t,e)},a}function Yh(t){return t=ba(t),t.tag=3,t}function jh(t,e,a,l){var n=a.type.getDerivedStateFromError;if(typeof n=="function"){var i=l.value;t.payload=function(){return n(i)},t.callback=function(){wp(e,a,l)}}var o=a.stateNode;o!==null&&typeof o.componentDidCatch=="function"&&(t.callback=function(){wp(e,a,l),typeof n!="function"&&(wa===null?wa=new Set([this]):wa.add(this));var u=l.stack;this.componentDidCatch(l.value,{componentStack:u!==null?u:""})})}function q1(t,e,a,l,n){if(a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(e=a.alternate,e!==null&&Wl(e,a,n,!0),a=It.current,a!==null){switch(a.tag){case 31:case 13:return re===null?Wo():a.alternate===null&&lt===0&&(lt=3),a.flags&=-257,a.flags|=65536,a.lanes=n,l===Yo?a.flags|=16384:(e=a.updateQueue,e===null?a.updateQueue=new Set([l]):e.add(l),Kc(t,l,n)),!1;case 22:return a.flags|=65536,l===Yo?a.flags|=16384:(e=a.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([l])},a.updateQueue=e):(a=e.retryQueue,a===null?e.retryQueue=new Set([l]):a.add(l)),Kc(t,l,n)),!1}throw Error(w(435,a.tag))}return Kc(t,l,n),Wo(),!1}if(B)return e=It.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=n,l!==ys&&(t=Error(w(422),{cause:l}),Zn(ce(t,a)))):(l!==ys&&(e=Error(w(423),{cause:l}),Zn(ce(e,a))),t=t.current.alternate,t.flags|=65536,n&=-n,t.lanes|=n,l=ce(l,a),n=Os(t.stateNode,l,n),Dc(t,n),lt!==4&&(lt=2)),!1;var i=Error(w(520),{cause:l});if(i=ce(i,a),Hn===null?Hn=[i]:Hn.push(i),lt!==4&&(lt=2),e===null)return!0;l=ce(l,a),a=e;do{switch(a.tag){case 3:return a.flags|=65536,t=n&-n,a.lanes|=t,t=Os(a.stateNode,l,t),Dc(a,t),!1;case 1:if(e=a.type,i=a.stateNode,(a.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(wa===null||!wa.has(i))))return a.flags|=65536,n&=-n,a.lanes|=n,n=Yh(n),jh(n,t,a,l),Dc(a,n),!1}a=a.return}while(a!==null);return!1}var Or=Error(w(461)),ft=!1;function bt(t,e,a,l){e.child=t===null?eh(e,null,a,l):Fa(e,t.child,a,l)}function xp(t,e,a,l,n){a=a.render;var i=e.ref;if("ref"in l){var o={};for(var u in l)u!=="ref"&&(o[u]=l[u])}else o=l;return Wa(e),l=vr(t,e,a,o,i,n),u=br(),t!==null&&!ft?(Sr(t,e,n),Fe(t,e,n)):(B&&u&&rr(e),e.flags|=1,bt(t,e,l,n),e.child)}function Ep(t,e,a,l,n){if(t===null){var i=a.type;return typeof i=="function"&&!sr(i)&&i.defaultProps===void 0&&a.compare===null?(e.tag=15,e.type=i,Vh(t,e,i,l,n)):(t=So(a.type,null,l,e,e.mode,n),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!Cr(t,n)){var o=i.memoizedProps;if(a=a.compare,a=a!==null?a:Qn,a(o,l)&&t.ref===e.ref)return Fe(t,e,n)}return e.flags|=1,t=Xe(i,l),t.ref=e.ref,t.return=e,e.child=t}function Vh(t,e,a,l,n){if(t!==null){var i=t.memoizedProps;if(Qn(i,l)&&t.ref===e.ref)if(ft=!1,e.pendingProps=l=i,Cr(t,n))(t.flags&131072)!==0&&(ft=!0);else return e.lanes=t.lanes,Fe(t,e,n)}return Cs(t,e,a,l,n)}function Gh(t,e,a,l){var n=l.children,i=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((e.flags&128)!==0){if(i=i!==null?i.baseLanes|a:a,t!==null){for(l=e.child=t.child,n=0;l!==null;)n=n|l.lanes|l.childLanes,l=l.sibling;l=n&~i}else l=0,e.child=null;return Tp(t,e,i,a,l)}if((a&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&wo(e,i!==null?i.cachePool:null),i!==null?dp(e,i):Ts(),nh(e);else return l=e.lanes=536870912,Tp(t,e,i!==null?i.baseLanes|a:a,a,l)}else i!==null?(wo(e,i.cachePool),dp(e,i),ra(e),e.memoizedState=null):(t!==null&&wo(e,null),Ts(),ra(e));return bt(t,e,n,a),e.child}function _n(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function Tp(t,e,a,l,n){var i=pr();return i=i===null?null:{parent:rt._currentValue,pool:i},e.memoizedState={baseLanes:a,cachePool:i},t!==null&&wo(e,null),Ts(),nh(e),t!==null&&Wl(t,e,l,!0),e.childLanes=n,null}function To(t,e){return e=Zo({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Ap(t,e,a){return Fa(e,t.child,null,a),t=To(e,e.pendingProps),t.flags|=2,Qt(e),e.memoizedState=null,t}function Y1(t,e,a){var l=e.pendingProps,n=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(B){if(l.mode==="hidden")return t=To(e,l),e.lanes=536870912,_n(null,t);if(As(e),(t=F)?(t=D0(t,se),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:_a!==null?{id:Te,overflow:Ae}:null,retryLane:536870912,hydrationErrors:null},a=Km(t),a.return=e,e.child=a,wt=e,F=null)):t=null,t===null)throw Ma(e);return e.lanes=536870912,null}return To(e,l)}var i=t.memoizedState;if(i!==null){var o=i.dehydrated;if(As(e),n)if(e.flags&256)e.flags&=-257,e=Ap(t,e,a);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(w(558));else if(ft||Wl(t,e,a,!1),n=(a&t.childLanes)!==0,ft||n){if(l=Z,l!==null&&(o=Sm(l,a),o!==0&&o!==i.retryLane))throw i.retryLane=o,ll(t,o),Ht(l,t,o),Or;Wo(),e=Ap(t,e,a)}else t=i.treeContext,F=fe(o.nextSibling),wt=e,B=!0,va=null,se=!1,t!==null&&Wm(e,t),e=To(e,l),e.flags|=4096;return e}return t=Xe(t.child,{mode:l.mode,children:l.children}),t.ref=e.ref,e.child=t,t.return=e,t}function Ao(t,e){var a=e.ref;if(a===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(w(284));(t===null||t.ref!==a)&&(e.flags|=4194816)}}function Cs(t,e,a,l,n){return Wa(e),a=vr(t,e,a,l,void 0,n),l=br(),t!==null&&!ft?(Sr(t,e,n),Fe(t,e,n)):(B&&l&&rr(e),e.flags|=1,bt(t,e,a,n),e.child)}function _p(t,e,a,l,n,i){return Wa(e),e.updateQueue=null,a=oh(e,l,a,n),ih(t),l=br(),t!==null&&!ft?(Sr(t,e,i),Fe(t,e,i)):(B&&l&&rr(e),e.flags|=1,bt(t,e,a,i),e.child)}function Mp(t,e,a,l,n){if(Wa(e),e.stateNode===null){var i=_l,o=a.contextType;typeof o=="object"&&o!==null&&(i=xt(o)),i=new a(l,i),e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Ns,e.stateNode=i,i._reactInternals=e,i=e.stateNode,i.props=l,i.state=e.memoizedState,i.refs={},hr(e),o=a.contextType,i.context=typeof o=="object"&&o!==null?xt(o):_l,i.state=e.memoizedState,o=a.getDerivedStateFromProps,typeof o=="function"&&(Bc(e,a,o,l),i.state=e.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(o=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),o!==i.state&&Ns.enqueueReplaceState(i,i.state,null),Un(e,l,i,n),Rn(),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308),l=!0}else if(t===null){i=e.stateNode;var u=e.memoizedProps,s=Pa(a,u);i.props=s;var p=i.context,g=a.contextType;o=_l,typeof g=="object"&&g!==null&&(o=xt(g));var v=a.getDerivedStateFromProps;g=typeof v=="function"||typeof i.getSnapshotBeforeUpdate=="function",u=e.pendingProps!==u,g||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u||p!==o)&&Sp(e,i,l,o),ua=!1;var m=e.memoizedState;i.state=m,Un(e,l,i,n),Rn(),p=e.memoizedState,u||m!==p||ua?(typeof v=="function"&&(Bc(e,a,v,l),p=e.memoizedState),(s=ua||bp(e,a,s,l,m,p,o))?(g||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(e.flags|=4194308)):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=l,e.memoizedState=p),i.props=l,i.state=p,i.context=o,l=s):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),l=!1)}else{i=e.stateNode,xs(t,e),o=e.memoizedProps,g=Pa(a,o),i.props=g,v=e.pendingProps,m=i.context,p=a.contextType,s=_l,typeof p=="object"&&p!==null&&(s=xt(p)),u=a.getDerivedStateFromProps,(p=typeof u=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(o!==v||m!==s)&&Sp(e,i,l,s),ua=!1,m=e.memoizedState,i.state=m,Un(e,l,i,n),Rn();var y=e.memoizedState;o!==v||m!==y||ua||t!==null&&t.dependencies!==null&&qo(t.dependencies)?(typeof u=="function"&&(Bc(e,a,u,l),y=e.memoizedState),(g=ua||bp(e,a,g,l,m,y,s)||t!==null&&t.dependencies!==null&&qo(t.dependencies))?(p||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(l,y,s),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(l,y,s)),typeof i.componentDidUpdate=="function"&&(e.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof i.componentDidUpdate!="function"||o===t.memoizedProps&&m===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&m===t.memoizedState||(e.flags|=1024),e.memoizedProps=l,e.memoizedState=y),i.props=l,i.state=y,i.context=s,l=g):(typeof i.componentDidUpdate!="function"||o===t.memoizedProps&&m===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&m===t.memoizedState||(e.flags|=1024),l=!1)}return i=l,Ao(t,e),l=(e.flags&128)!==0,i||l?(i=e.stateNode,a=l&&typeof a.getDerivedStateFromError!="function"?null:i.render(),e.flags|=1,t!==null&&l?(e.child=Fa(e,t.child,null,n),e.child=Fa(e,null,a,n)):bt(t,e,a,n),e.memoizedState=i.state,t=e.child):t=Fe(t,e,n),t}function zp(t,e,a,l){return Ja(),e.flags|=256,bt(t,e,a,l),e.child}var Hc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function qc(t){return{baseLanes:t,cachePool:Im()}}function Yc(t,e,a){return t=t!==null?t.childLanes&~a:0,e&&(t|=Zt),t}function Qh(t,e,a){var l=e.pendingProps,n=!1,i=(e.flags&128)!==0,o;if((o=i)||(o=t!==null&&t.memoizedState===null?!1:(nt.current&2)!==0),o&&(n=!0,e.flags&=-129),o=(e.flags&32)!==0,e.flags&=-33,t===null){if(B){if(n?sa(e):ra(e),(t=F)?(t=D0(t,se),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:_a!==null?{id:Te,overflow:Ae}:null,retryLane:536870912,hydrationErrors:null},a=Km(t),a.return=e,e.child=a,wt=e,F=null)):t=null,t===null)throw Ma(e);return Xs(t)?e.lanes=32:e.lanes=536870912,null}var u=l.children;return l=l.fallback,n?(ra(e),n=e.mode,u=Zo({mode:"hidden",children:u},n),l=Xa(l,n,a,null),u.return=e,l.return=e,u.sibling=l,e.child=u,l=e.child,l.memoizedState=qc(a),l.childLanes=Yc(t,o,a),e.memoizedState=Hc,_n(null,l)):(sa(e),$s(e,u))}var s=t.memoizedState;if(s!==null&&(u=s.dehydrated,u!==null)){if(i)e.flags&256?(sa(e),e.flags&=-257,e=jc(t,e,a)):e.memoizedState!==null?(ra(e),e.child=t.child,e.flags|=128,e=null):(ra(e),u=l.fallback,n=e.mode,l=Zo({mode:"visible",children:l.children},n),u=Xa(u,n,a,null),u.flags|=2,l.return=e,u.return=e,l.sibling=u,e.child=l,Fa(e,t.child,null,a),l=e.child,l.memoizedState=qc(a),l.childLanes=Yc(t,o,a),e.memoizedState=Hc,e=_n(null,l));else if(sa(e),Xs(u)){if(o=u.nextSibling&&u.nextSibling.dataset,o)var p=o.dgst;o=p,l=Error(w(419)),l.stack="",l.digest=o,Zn({value:l,source:null,stack:null}),e=jc(t,e,a)}else if(ft||Wl(t,e,a,!1),o=(a&t.childLanes)!==0,ft||o){if(o=Z,o!==null&&(l=Sm(o,a),l!==0&&l!==s.retryLane))throw s.retryLane=l,ll(t,l),Ht(o,t,l),Or;Qs(u)||Wo(),e=jc(t,e,a)}else Qs(u)?(e.flags|=192,e.child=t.child,e=null):(t=s.treeContext,F=fe(u.nextSibling),wt=e,B=!0,va=null,se=!1,t!==null&&Wm(e,t),e=$s(e,l.children),e.flags|=4096);return e}return n?(ra(e),u=l.fallback,n=e.mode,s=t.child,p=s.sibling,l=Xe(s,{mode:"hidden",children:l.children}),l.subtreeFlags=s.subtreeFlags&65011712,p!==null?u=Xe(p,u):(u=Xa(u,n,a,null),u.flags|=2),u.return=e,l.return=e,l.sibling=u,e.child=l,_n(null,l),l=e.child,u=t.child.memoizedState,u===null?u=qc(a):(n=u.cachePool,n!==null?(s=rt._currentValue,n=n.parent!==s?{parent:s,pool:s}:n):n=Im(),u={baseLanes:u.baseLanes|a,cachePool:n}),l.memoizedState=u,l.childLanes=Yc(t,o,a),e.memoizedState=Hc,_n(t.child,l)):(sa(e),a=t.child,t=a.sibling,a=Xe(a,{mode:"visible",children:l.children}),a.return=e,a.sibling=null,t!==null&&(o=e.deletions,o===null?(e.deletions=[t],e.flags|=16):o.push(t)),e.child=a,e.memoizedState=null,a)}function $s(t,e){return e=Zo({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Zo(t,e){return t=Xt(22,t,null,e),t.lanes=0,t}function jc(t,e,a){return Fa(e,t.child,null,a),t=$s(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Np(t,e,a){t.lanes|=e;var l=t.alternate;l!==null&&(l.lanes|=e),bs(t.return,e,a)}function Vc(t,e,a,l,n,i){var o=t.memoizedState;o===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:l,tail:a,tailMode:n,treeForkCount:i}:(o.isBackwards=e,o.rendering=null,o.renderingStartTime=0,o.last=l,o.tail=a,o.tailMode=n,o.treeForkCount=i)}function Xh(t,e,a){var l=e.pendingProps,n=l.revealOrder,i=l.tail;l=l.children;var o=nt.current,u=(o&2)!==0;if(u?(o=o&1|2,e.flags|=128):o&=1,K(nt,o),bt(t,e,l,a),l=B?Xn:0,!u&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Np(t,a,e);else if(t.tag===19)Np(t,a,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(n){case"forwards":for(a=e.child,n=null;a!==null;)t=a.alternate,t!==null&&Vo(t)===null&&(n=a),a=a.sibling;a=n,a===null?(n=e.child,e.child=null):(n=a.sibling,a.sibling=null),Vc(e,!1,n,a,i,l);break;case"backwards":case"unstable_legacy-backwards":for(a=null,n=e.child,e.child=null;n!==null;){if(t=n.alternate,t!==null&&Vo(t)===null){e.child=n;break}t=n.sibling,n.sibling=a,a=n,n=t}Vc(e,!0,a,null,i,l);break;case"together":Vc(e,!1,null,null,void 0,l);break;default:e.memoizedState=null}return e.child}function Fe(t,e,a){if(t!==null&&(e.dependencies=t.dependencies),Na|=e.lanes,(a&e.childLanes)===0)if(t!==null){if(Wl(t,e,a,!1),(a&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(w(153));if(e.child!==null){for(t=e.child,a=Xe(t,t.pendingProps),e.child=a,a.return=e;t.sibling!==null;)t=t.sibling,a=a.sibling=Xe(t,t.pendingProps),a.return=e;a.sibling=null}return e.child}function Cr(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&qo(t)))}function j1(t,e,a){switch(e.tag){case 3:$o(e,e.stateNode.containerInfo),ca(e,rt,t.memoizedState.cache),Ja();break;case 27:case 5:os(e);break;case 4:$o(e,e.stateNode.containerInfo);break;case 10:ca(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,As(e),null;break;case 13:var l=e.memoizedState;if(l!==null)return l.dehydrated!==null?(sa(e),e.flags|=128,null):(a&e.child.childLanes)!==0?Qh(t,e,a):(sa(e),t=Fe(t,e,a),t!==null?t.sibling:null);sa(e);break;case 19:var n=(t.flags&128)!==0;if(l=(a&e.childLanes)!==0,l||(Wl(t,e,a,!1),l=(a&e.childLanes)!==0),n){if(l)return Xh(t,e,a);e.flags|=128}if(n=e.memoizedState,n!==null&&(n.rendering=null,n.tail=null,n.lastEffect=null),K(nt,nt.current),l)break;return null;case 22:return e.lanes=0,Gh(t,e,a,e.pendingProps);case 24:ca(e,rt,t.memoizedState.cache)}return Fe(t,e,a)}function Zh(t,e,a){if(t!==null)if(t.memoizedProps!==e.pendingProps)ft=!0;else{if(!Cr(t,a)&&(e.flags&128)===0)return ft=!1,j1(t,e,a);ft=(t.flags&131072)!==0}else ft=!1,B&&(e.flags&1048576)!==0&&Jm(e,Xn,e.index);switch(e.lanes=0,e.tag){case 16:t:{var l=e.pendingProps;if(t=Va(e.elementType),e.type=t,typeof t=="function")sr(t)?(l=Pa(t,l),e.tag=1,e=Mp(null,e,t,l,a)):(e.tag=0,e=Cs(null,e,t,l,a));else{if(t!=null){var n=t.$$typeof;if(n===Js){e.tag=11,e=xp(null,e,t,l,a);break t}else if(n===Ws){e.tag=14,e=Ep(null,e,t,l,a);break t}}throw e=ns(t)||t,Error(w(306,e,""))}}return e;case 0:return Cs(t,e,e.type,e.pendingProps,a);case 1:return l=e.type,n=Pa(l,e.pendingProps),Mp(t,e,l,n,a);case 3:t:{if($o(e,e.stateNode.containerInfo),t===null)throw Error(w(387));l=e.pendingProps;var i=e.memoizedState;n=i.element,xs(t,e),Un(e,l,null,a);var o=e.memoizedState;if(l=o.cache,ca(e,rt,l),l!==i.cache&&Ss(e,[rt],a,!0),Rn(),l=o.element,i.isDehydrated)if(i={element:l,isDehydrated:!1,cache:o.cache},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){e=zp(t,e,l,a);break t}else if(l!==n){n=ce(Error(w(424)),e),Zn(n),e=zp(t,e,l,a);break t}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(F=fe(t.firstChild),wt=e,B=!0,va=null,se=!0,a=eh(e,null,l,a),e.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(Ja(),l===n){e=Fe(t,e,a);break t}bt(t,e,l,a)}e=e.child}return e;case 26:return Ao(t,e),t===null?(a=Fp(e.type,null,e.pendingProps,null))?e.memoizedState=a:B||(a=e.type,t=e.pendingProps,l=tu(ya.current).createElement(a),l[St]=e,l[qt]=t,Et(l,a,t),gt(l),e.stateNode=l):e.memoizedState=Fp(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return os(e),t===null&&B&&(l=e.stateNode=L0(e.type,e.pendingProps,ya.current),wt=e,se=!0,n=F,Ca(e.type)?(Zs=n,F=fe(l.firstChild)):F=n),bt(t,e,e.pendingProps.children,a),Ao(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&B&&((n=l=F)&&(l=hb(l,e.type,e.pendingProps,se),l!==null?(e.stateNode=l,wt=e,F=fe(l.firstChild),se=!1,n=!0):n=!1),n||Ma(e)),os(e),n=e.type,i=e.pendingProps,o=t!==null?t.memoizedProps:null,l=i.children,Vs(n,i)?l=null:o!==null&&Vs(n,o)&&(e.flags|=32),e.memoizedState!==null&&(n=vr(t,e,$1,null,null,a),In._currentValue=n),Ao(t,e),bt(t,e,l,a),e.child;case 6:return t===null&&B&&((t=a=F)&&(a=gb(a,e.pendingProps,se),a!==null?(e.stateNode=a,wt=e,F=null,t=!0):t=!1),t||Ma(e)),null;case 13:return Qh(t,e,a);case 4:return $o(e,e.stateNode.containerInfo),l=e.pendingProps,t===null?e.child=Fa(e,null,l,a):bt(t,e,l,a),e.child;case 11:return xp(t,e,e.type,e.pendingProps,a);case 7:return bt(t,e,e.pendingProps,a),e.child;case 8:return bt(t,e,e.pendingProps.children,a),e.child;case 12:return bt(t,e,e.pendingProps.children,a),e.child;case 10:return l=e.pendingProps,ca(e,e.type,l.value),bt(t,e,l.children,a),e.child;case 9:return n=e.type._context,l=e.pendingProps.children,Wa(e),n=xt(n),l=l(n),e.flags|=1,bt(t,e,l,a),e.child;case 14:return Ep(t,e,e.type,e.pendingProps,a);case 15:return Vh(t,e,e.type,e.pendingProps,a);case 19:return Xh(t,e,a);case 31:return Y1(t,e,a);case 22:return Gh(t,e,a,e.pendingProps);case 24:return Wa(e),l=xt(rt),t===null?(n=pr(),n===null&&(n=Z,i=dr(),n.pooledCache=i,i.refCount++,i!==null&&(n.pooledCacheLanes|=a),n=i),e.memoizedState={parent:l,cache:n},hr(e),ca(e,rt,n)):((t.lanes&a)!==0&&(xs(t,e),Un(e,null,null,a),Rn()),n=t.memoizedState,i=e.memoizedState,n.parent!==l?(n={parent:l,cache:l},e.memoizedState=n,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=n),ca(e,rt,l)):(l=i.cache,ca(e,rt,l),l!==n.cache&&Ss(e,[rt],a,!0))),bt(t,e,e.pendingProps.children,a),e.child;case 29:throw e.pendingProps}throw Error(w(156,e.tag))}function Le(t){t.flags|=4}function Gc(t,e,a,l,n){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(n&335544128)===n)if(t.stateNode.complete)t.flags|=8192;else if(g0())t.flags|=8192;else throw ka=Yo,mr}else t.flags&=-16777217}function Op(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!q0(e))if(g0())t.flags|=8192;else throw ka=Yo,mr}function co(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?ym():536870912,t.lanes|=e,Gl|=e)}function bn(t,e){if(!B)switch(t.tailMode){case"hidden":e=t.tail;for(var a=null;e!==null;)e.alternate!==null&&(a=e),e=e.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var l=null;a!==null;)a.alternate!==null&&(l=a),a=a.sibling;l===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:l.sibling=null}}function W(t){var e=t.alternate!==null&&t.alternate.child===t.child,a=0,l=0;if(e)for(var n=t.child;n!==null;)a|=n.lanes|n.childLanes,l|=n.subtreeFlags&65011712,l|=n.flags&65011712,n.return=t,n=n.sibling;else for(n=t.child;n!==null;)a|=n.lanes|n.childLanes,l|=n.subtreeFlags,l|=n.flags,n.return=t,n=n.sibling;return t.subtreeFlags|=l,t.childLanes=a,e}function V1(t,e,a){var l=e.pendingProps;switch(fr(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return W(e),null;case 1:return W(e),null;case 3:return a=e.stateNode,l=null,t!==null&&(l=t.memoizedState.cache),e.memoizedState.cache!==l&&(e.flags|=2048),Ze(rt),Bl(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(ml(e)?Le(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Uc())),W(e),null;case 26:var n=e.type,i=e.memoizedState;return t===null?(Le(e),i!==null?(W(e),Op(e,i)):(W(e),Gc(e,n,null,l,a))):i?i!==t.memoizedState?(Le(e),W(e),Op(e,i)):(W(e),e.flags&=-16777217):(t=t.memoizedProps,t!==l&&Le(e),W(e),Gc(e,n,t,l,a)),null;case 27:if(Ro(e),a=ya.current,n=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==l&&Le(e);else{if(!l){if(e.stateNode===null)throw Error(w(166));return W(e),null}t=Me.current,ml(e)?ip(e,t):(t=L0(n,l,a),e.stateNode=t,Le(e))}return W(e),null;case 5:if(Ro(e),n=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==l&&Le(e);else{if(!l){if(e.stateNode===null)throw Error(w(166));return W(e),null}if(i=Me.current,ml(e))ip(e,i);else{var o=tu(ya.current);switch(i){case 1:i=o.createElementNS("http://www.w3.org/2000/svg",n);break;case 2:i=o.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;default:switch(n){case"svg":i=o.createElementNS("http://www.w3.org/2000/svg",n);break;case"math":i=o.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;case"script":i=o.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof l.is=="string"?o.createElement("select",{is:l.is}):o.createElement("select"),l.multiple?i.multiple=!0:l.size&&(i.size=l.size);break;default:i=typeof l.is=="string"?o.createElement(n,{is:l.is}):o.createElement(n)}}i[St]=e,i[qt]=l;t:for(o=e.child;o!==null;){if(o.tag===5||o.tag===6)i.appendChild(o.stateNode);else if(o.tag!==4&&o.tag!==27&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===e)break t;for(;o.sibling===null;){if(o.return===null||o.return===e)break t;o=o.return}o.sibling.return=o.return,o=o.sibling}e.stateNode=i;t:switch(Et(i,n,l),n){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break t;case"img":l=!0;break t;default:l=!1}l&&Le(e)}}return W(e),Gc(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,a),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==l&&Le(e);else{if(typeof l!="string"&&e.stateNode===null)throw Error(w(166));if(t=ya.current,ml(e)){if(t=e.stateNode,a=e.memoizedProps,l=null,n=wt,n!==null)switch(n.tag){case 27:case 5:l=n.memoizedProps}t[St]=e,t=!!(t.nodeValue===a||l!==null&&l.suppressHydrationWarning===!0||$0(t.nodeValue,a)),t||Ma(e,!0)}else t=tu(t).createTextNode(l),t[St]=e,e.stateNode=t}return W(e),null;case 31:if(a=e.memoizedState,t===null||t.memoizedState!==null){if(l=ml(e),a!==null){if(t===null){if(!l)throw Error(w(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(w(557));t[St]=e}else Ja(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;W(e),t=!1}else a=Uc(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return e.flags&256?(Qt(e),e):(Qt(e),null);if((e.flags&128)!==0)throw Error(w(558))}return W(e),null;case 13:if(l=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(n=ml(e),l!==null&&l.dehydrated!==null){if(t===null){if(!n)throw Error(w(318));if(n=e.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(w(317));n[St]=e}else Ja(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;W(e),n=!1}else n=Uc(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),n=!0;if(!n)return e.flags&256?(Qt(e),e):(Qt(e),null)}return Qt(e),(e.flags&128)!==0?(e.lanes=a,e):(a=l!==null,t=t!==null&&t.memoizedState!==null,a&&(l=e.child,n=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(n=l.alternate.memoizedState.cachePool.pool),i=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(i=l.memoizedState.cachePool.pool),i!==n&&(l.flags|=2048)),a!==t&&a&&(e.child.flags|=8192),co(e,e.updateQueue),W(e),null);case 4:return Bl(),t===null&&Hr(e.stateNode.containerInfo),W(e),null;case 10:return Ze(e.type),W(e),null;case 19:if(yt(nt),l=e.memoizedState,l===null)return W(e),null;if(n=(e.flags&128)!==0,i=l.rendering,i===null)if(n)bn(l,!1);else{if(lt!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(i=Vo(t),i!==null){for(e.flags|=128,bn(l,!1),t=i.updateQueue,e.updateQueue=t,co(e,t),e.subtreeFlags=0,t=a,a=e.child;a!==null;)km(a,t),a=a.sibling;return K(nt,nt.current&1|2),B&&Ye(e,l.treeForkCount),e.child}t=t.sibling}l.tail!==null&&kt()>Ko&&(e.flags|=128,n=!0,bn(l,!1),e.lanes=4194304)}else{if(!n)if(t=Vo(i),t!==null){if(e.flags|=128,n=!0,t=t.updateQueue,e.updateQueue=t,co(e,t),bn(l,!0),l.tail===null&&l.tailMode==="hidden"&&!i.alternate&&!B)return W(e),null}else 2*kt()-l.renderingStartTime>Ko&&a!==536870912&&(e.flags|=128,n=!0,bn(l,!1),e.lanes=4194304);l.isBackwards?(i.sibling=e.child,e.child=i):(t=l.last,t!==null?t.sibling=i:e.child=i,l.last=i)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=kt(),t.sibling=null,a=nt.current,K(nt,n?a&1|2:a&1),B&&Ye(e,l.treeForkCount),t):(W(e),null);case 22:case 23:return Qt(e),gr(),l=e.memoizedState!==null,t!==null?t.memoizedState!==null!==l&&(e.flags|=8192):l&&(e.flags|=8192),l?(a&536870912)!==0&&(e.flags&128)===0&&(W(e),e.subtreeFlags&6&&(e.flags|=8192)):W(e),a=e.updateQueue,a!==null&&co(e,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),l=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(l=e.memoizedState.cachePool.pool),l!==a&&(e.flags|=2048),t!==null&&yt(Za),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),e.memoizedState.cache!==a&&(e.flags|=2048),Ze(rt),W(e),null;case 25:return null;case 30:return null}throw Error(w(156,e.tag))}function G1(t,e){switch(fr(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Ze(rt),Bl(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return Ro(e),null;case 31:if(e.memoizedState!==null){if(Qt(e),e.alternate===null)throw Error(w(340));Ja()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(Qt(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(w(340));Ja()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return yt(nt),null;case 4:return Bl(),null;case 10:return Ze(e.type),null;case 22:case 23:return Qt(e),gr(),t!==null&&yt(Za),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Ze(rt),null;case 25:return null;default:return null}}function kh(t,e){switch(fr(e),e.tag){case 3:Ze(rt),Bl();break;case 26:case 27:case 5:Ro(e);break;case 4:Bl();break;case 31:e.memoizedState!==null&&Qt(e);break;case 13:Qt(e);break;case 19:yt(nt);break;case 10:Ze(e.type);break;case 22:case 23:Qt(e),gr(),t!==null&&yt(Za);break;case 24:Ze(rt)}}function si(t,e){try{var a=e.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var n=l.next;a=n;do{if((a.tag&t)===t){l=void 0;var i=a.create,o=a.inst;l=i(),o.destroy=l}a=a.next}while(a!==n)}}catch(u){G(e,e.return,u)}}function za(t,e,a){try{var l=e.updateQueue,n=l!==null?l.lastEffect:null;if(n!==null){var i=n.next;l=i;do{if((l.tag&t)===t){var o=l.inst,u=o.destroy;if(u!==void 0){o.destroy=void 0,n=e;var s=a,p=u;try{p()}catch(g){G(n,s,g)}}}l=l.next}while(l!==i)}}catch(g){G(e,e.return,g)}}function Kh(t){var e=t.updateQueue;if(e!==null){var a=t.stateNode;try{lh(e,a)}catch(l){G(t,t.return,l)}}}function Jh(t,e,a){a.props=Pa(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(l){G(t,e,l)}}function Ln(t,e){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var l=t.stateNode;break;case 30:l=t.stateNode;break;default:l=t.stateNode}typeof a=="function"?t.refCleanup=a(l):a.current=l}}catch(n){G(t,e,n)}}function _e(t,e){var a=t.ref,l=t.refCleanup;if(a!==null)if(typeof l=="function")try{l()}catch(n){G(t,e,n)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(n){G(t,e,n)}else a.current=null}function Wh(t){var e=t.type,a=t.memoizedProps,l=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":a.autoFocus&&l.focus();break t;case"img":a.src?l.src=a.src:a.srcSet&&(l.srcset=a.srcSet)}}catch(n){G(t,t.return,n)}}function Qc(t,e,a){try{var l=t.stateNode;sb(l,t.type,a,e),l[qt]=e}catch(n){G(t,t.return,n)}}function Fh(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Ca(t.type)||t.tag===4}function Xc(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||Fh(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Ca(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Rs(t,e,a){var l=t.tag;if(l===5||l===6)t=t.stateNode,e?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,e):(e=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,e.appendChild(t),a=a._reactRootContainer,a!=null||e.onclick!==null||(e.onclick=Ge));else if(l!==4&&(l===27&&Ca(t.type)&&(a=t.stateNode,e=null),t=t.child,t!==null))for(Rs(t,e,a),t=t.sibling;t!==null;)Rs(t,e,a),t=t.sibling}function ko(t,e,a){var l=t.tag;if(l===5||l===6)t=t.stateNode,e?a.insertBefore(t,e):a.appendChild(t);else if(l!==4&&(l===27&&Ca(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(ko(t,e,a),t=t.sibling;t!==null;)ko(t,e,a),t=t.sibling}function Ih(t){var e=t.stateNode,a=t.memoizedProps;try{for(var l=t.type,n=e.attributes;n.length;)e.removeAttributeNode(n[0]);Et(e,l,a),e[St]=t,e[qt]=a}catch(i){G(t,t.return,i)}}var je=!1,st=!1,Zc=!1,Cp=typeof WeakSet=="function"?WeakSet:Set,ht=null;function Q1(t,e){if(t=t.containerInfo,Ys=nu,t=qm(t),or(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else t:{a=(a=t.ownerDocument)&&a.defaultView||window;var l=a.getSelection&&a.getSelection();if(l&&l.rangeCount!==0){a=l.anchorNode;var n=l.anchorOffset,i=l.focusNode;l=l.focusOffset;try{a.nodeType,i.nodeType}catch{a=null;break t}var o=0,u=-1,s=-1,p=0,g=0,v=t,m=null;e:for(;;){for(var y;v!==a||n!==0&&v.nodeType!==3||(u=o+n),v!==i||l!==0&&v.nodeType!==3||(s=o+l),v.nodeType===3&&(o+=v.nodeValue.length),(y=v.firstChild)!==null;)m=v,v=y;for(;;){if(v===t)break e;if(m===a&&++p===n&&(u=o),m===i&&++g===l&&(s=o),(y=v.nextSibling)!==null)break;v=m,m=v.parentNode}v=y}a=u===-1||s===-1?null:{start:u,end:s}}else a=null}a=a||{start:0,end:0}}else a=null;for(js={focusedElem:t,selectionRange:a},nu=!1,ht=e;ht!==null;)if(e=ht,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,ht=t;else for(;ht!==null;){switch(e=ht,i=e.alternate,t=e.flags,e.tag){case 0:if((t&4)!==0&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(a=0;a<t.length;a++)n=t[a],n.ref.impl=n.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&i!==null){t=void 0,a=e,n=i.memoizedProps,i=i.memoizedState,l=a.stateNode;try{var E=Pa(a.type,n);t=l.getSnapshotBeforeUpdate(E,i),l.__reactInternalSnapshotBeforeUpdate=t}catch(_){G(a,a.return,_)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,a=t.nodeType,a===9)Gs(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Gs(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(w(163))}if(t=e.sibling,t!==null){t.return=e.return,ht=t;break}ht=e.return}}function Ph(t,e,a){var l=a.flags;switch(a.tag){case 0:case 11:case 15:He(t,a),l&4&&si(5,a);break;case 1:if(He(t,a),l&4)if(t=a.stateNode,e===null)try{t.componentDidMount()}catch(o){G(a,a.return,o)}else{var n=Pa(a.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(n,e,t.__reactInternalSnapshotBeforeUpdate)}catch(o){G(a,a.return,o)}}l&64&&Kh(a),l&512&&Ln(a,a.return);break;case 3:if(He(t,a),l&64&&(t=a.updateQueue,t!==null)){if(e=null,a.child!==null)switch(a.child.tag){case 27:case 5:e=a.child.stateNode;break;case 1:e=a.child.stateNode}try{lh(t,e)}catch(o){G(a,a.return,o)}}break;case 27:e===null&&l&4&&Ih(a);case 26:case 5:He(t,a),e===null&&l&4&&Wh(a),l&512&&Ln(a,a.return);break;case 12:He(t,a);break;case 31:He(t,a),l&4&&a0(t,a);break;case 13:He(t,a),l&4&&l0(t,a),l&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=P1.bind(null,a),yb(t,a))));break;case 22:if(l=a.memoizedState!==null||je,!l){e=e!==null&&e.memoizedState!==null||st,n=je;var i=st;je=l,(st=e)&&!i?qe(t,a,(a.subtreeFlags&8772)!==0):He(t,a),je=n,st=i}break;case 30:break;default:He(t,a)}}function t0(t){var e=t.alternate;e!==null&&(t.alternate=null,t0(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&tr(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var tt=null,Lt=!1;function Be(t,e,a){for(a=a.child;a!==null;)e0(t,e,a),a=a.sibling}function e0(t,e,a){if(Kt&&typeof Kt.onCommitFiberUnmount=="function")try{Kt.onCommitFiberUnmount(ai,a)}catch{}switch(a.tag){case 26:st||_e(a,e),Be(t,e,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:st||_e(a,e);var l=tt,n=Lt;Ca(a.type)&&(tt=a.stateNode,Lt=!1),Be(t,e,a),Yn(a.stateNode),tt=l,Lt=n;break;case 5:st||_e(a,e);case 6:if(l=tt,n=Lt,tt=null,Be(t,e,a),tt=l,Lt=n,tt!==null)if(Lt)try{(tt.nodeType===9?tt.body:tt.nodeName==="HTML"?tt.ownerDocument.body:tt).removeChild(a.stateNode)}catch(i){G(a,e,i)}else try{tt.removeChild(a.stateNode)}catch(i){G(a,e,i)}break;case 18:tt!==null&&(Lt?(t=tt,Zp(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),kl(t)):Zp(tt,a.stateNode));break;case 4:l=tt,n=Lt,tt=a.stateNode.containerInfo,Lt=!0,Be(t,e,a),tt=l,Lt=n;break;case 0:case 11:case 14:case 15:za(2,a,e),st||za(4,a,e),Be(t,e,a);break;case 1:st||(_e(a,e),l=a.stateNode,typeof l.componentWillUnmount=="function"&&Jh(a,e,l)),Be(t,e,a);break;case 21:Be(t,e,a);break;case 22:st=(l=st)||a.memoizedState!==null,Be(t,e,a),st=l;break;default:Be(t,e,a)}}function a0(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{kl(t)}catch(a){G(e,e.return,a)}}}function l0(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{kl(t)}catch(a){G(e,e.return,a)}}function X1(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Cp),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Cp),e;default:throw Error(w(435,t.tag))}}function so(t,e){var a=X1(t);e.forEach(function(l){if(!a.has(l)){a.add(l);var n=tb.bind(null,t,l);l.then(n,n)}})}function Ut(t,e){var a=e.deletions;if(a!==null)for(var l=0;l<a.length;l++){var n=a[l],i=t,o=e,u=o;t:for(;u!==null;){switch(u.tag){case 27:if(Ca(u.type)){tt=u.stateNode,Lt=!1;break t}break;case 5:tt=u.stateNode,Lt=!1;break t;case 3:case 4:tt=u.stateNode.containerInfo,Lt=!0;break t}u=u.return}if(tt===null)throw Error(w(160));e0(i,o,n),tt=null,Lt=!1,i=n.alternate,i!==null&&(i.return=null),n.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)n0(e,t),e=e.sibling}var me=null;function n0(t,e){var a=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Ut(e,t),Dt(t),l&4&&(za(3,t,t.return),si(3,t),za(5,t,t.return));break;case 1:Ut(e,t),Dt(t),l&512&&(st||a===null||_e(a,a.return)),l&64&&je&&(t=t.updateQueue,t!==null&&(l=t.callbacks,l!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?l:a.concat(l))));break;case 26:var n=me;if(Ut(e,t),Dt(t),l&512&&(st||a===null||_e(a,a.return)),l&4){var i=a!==null?a.memoizedState:null;if(l=t.memoizedState,a===null)if(l===null)if(t.stateNode===null){t:{l=t.type,a=t.memoizedProps,n=n.ownerDocument||n;e:switch(l){case"title":i=n.getElementsByTagName("title")[0],(!i||i[ii]||i[St]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=n.createElement(l),n.head.insertBefore(i,n.querySelector("head > title"))),Et(i,l,a),i[St]=t,gt(i),l=i;break t;case"link":var o=Pp("link","href",n).get(l+(a.href||""));if(o){for(var u=0;u<o.length;u++)if(i=o[u],i.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&i.getAttribute("rel")===(a.rel==null?null:a.rel)&&i.getAttribute("title")===(a.title==null?null:a.title)&&i.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){o.splice(u,1);break e}}i=n.createElement(l),Et(i,l,a),n.head.appendChild(i);break;case"meta":if(o=Pp("meta","content",n).get(l+(a.content||""))){for(u=0;u<o.length;u++)if(i=o[u],i.getAttribute("content")===(a.content==null?null:""+a.content)&&i.getAttribute("name")===(a.name==null?null:a.name)&&i.getAttribute("property")===(a.property==null?null:a.property)&&i.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&i.getAttribute("charset")===(a.charSet==null?null:a.charSet)){o.splice(u,1);break e}}i=n.createElement(l),Et(i,l,a),n.head.appendChild(i);break;default:throw Error(w(468,l))}i[St]=t,gt(i),l=i}t.stateNode=l}else tm(n,t.type,t.stateNode);else t.stateNode=Ip(n,l,t.memoizedProps);else i!==l?(i===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):i.count--,l===null?tm(n,t.type,t.stateNode):Ip(n,l,t.memoizedProps)):l===null&&t.stateNode!==null&&Qc(t,t.memoizedProps,a.memoizedProps)}break;case 27:Ut(e,t),Dt(t),l&512&&(st||a===null||_e(a,a.return)),a!==null&&l&4&&Qc(t,t.memoizedProps,a.memoizedProps);break;case 5:if(Ut(e,t),Dt(t),l&512&&(st||a===null||_e(a,a.return)),t.flags&32){n=t.stateNode;try{ql(n,"")}catch(E){G(t,t.return,E)}}l&4&&t.stateNode!=null&&(n=t.memoizedProps,Qc(t,n,a!==null?a.memoizedProps:n)),l&1024&&(Zc=!0);break;case 6:if(Ut(e,t),Dt(t),l&4){if(t.stateNode===null)throw Error(w(162));l=t.memoizedProps,a=t.stateNode;try{a.nodeValue=l}catch(E){G(t,t.return,E)}}break;case 3:if(zo=null,n=me,me=eu(e.containerInfo),Ut(e,t),me=n,Dt(t),l&4&&a!==null&&a.memoizedState.isDehydrated)try{kl(e.containerInfo)}catch(E){G(t,t.return,E)}Zc&&(Zc=!1,i0(t));break;case 4:l=me,me=eu(t.stateNode.containerInfo),Ut(e,t),Dt(t),me=l;break;case 12:Ut(e,t),Dt(t);break;case 31:Ut(e,t),Dt(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,so(t,l)));break;case 13:Ut(e,t),Dt(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(yu=kt()),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,so(t,l)));break;case 22:n=t.memoizedState!==null;var s=a!==null&&a.memoizedState!==null,p=je,g=st;if(je=p||n,st=g||s,Ut(e,t),st=g,je=p,Dt(t),l&8192)t:for(e=t.stateNode,e._visibility=n?e._visibility&-2:e._visibility|1,n&&(a===null||s||je||st||Ga(t)),a=null,e=t;;){if(e.tag===5||e.tag===26){if(a===null){s=a=e;try{if(i=s.stateNode,n)o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none";else{u=s.stateNode;var v=s.memoizedProps.style,m=v!=null&&v.hasOwnProperty("display")?v.display:null;u.style.display=m==null||typeof m=="boolean"?"":(""+m).trim()}}catch(E){G(s,s.return,E)}}}else if(e.tag===6){if(a===null){s=e;try{s.stateNode.nodeValue=n?"":s.memoizedProps}catch(E){G(s,s.return,E)}}}else if(e.tag===18){if(a===null){s=e;try{var y=s.stateNode;n?kp(y,!0):kp(s.stateNode,!1)}catch(E){G(s,s.return,E)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;a===e&&(a=null),e=e.return}a===e&&(a=null),e.sibling.return=e.return,e=e.sibling}l&4&&(l=t.updateQueue,l!==null&&(a=l.retryQueue,a!==null&&(l.retryQueue=null,so(t,a))));break;case 19:Ut(e,t),Dt(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,so(t,l)));break;case 30:break;case 21:break;default:Ut(e,t),Dt(t)}}function Dt(t){var e=t.flags;if(e&2){try{for(var a,l=t.return;l!==null;){if(Fh(l)){a=l;break}l=l.return}if(a==null)throw Error(w(160));switch(a.tag){case 27:var n=a.stateNode,i=Xc(t);ko(t,i,n);break;case 5:var o=a.stateNode;a.flags&32&&(ql(o,""),a.flags&=-33);var u=Xc(t);ko(t,u,o);break;case 3:case 4:var s=a.stateNode.containerInfo,p=Xc(t);Rs(t,p,s);break;default:throw Error(w(161))}}catch(g){G(t,t.return,g)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function i0(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;i0(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function He(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)Ph(t,e.alternate,e),e=e.sibling}function Ga(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:za(4,e,e.return),Ga(e);break;case 1:_e(e,e.return);var a=e.stateNode;typeof a.componentWillUnmount=="function"&&Jh(e,e.return,a),Ga(e);break;case 27:Yn(e.stateNode);case 26:case 5:_e(e,e.return),Ga(e);break;case 22:e.memoizedState===null&&Ga(e);break;case 30:Ga(e);break;default:Ga(e)}t=t.sibling}}function qe(t,e,a){for(a=a&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var l=e.alternate,n=t,i=e,o=i.flags;switch(i.tag){case 0:case 11:case 15:qe(n,i,a),si(4,i);break;case 1:if(qe(n,i,a),l=i,n=l.stateNode,typeof n.componentDidMount=="function")try{n.componentDidMount()}catch(p){G(l,l.return,p)}if(l=i,n=l.updateQueue,n!==null){var u=l.stateNode;try{var s=n.shared.hiddenCallbacks;if(s!==null)for(n.shared.hiddenCallbacks=null,n=0;n<s.length;n++)ah(s[n],u)}catch(p){G(l,l.return,p)}}a&&o&64&&Kh(i),Ln(i,i.return);break;case 27:Ih(i);case 26:case 5:qe(n,i,a),a&&l===null&&o&4&&Wh(i),Ln(i,i.return);break;case 12:qe(n,i,a);break;case 31:qe(n,i,a),a&&o&4&&a0(n,i);break;case 13:qe(n,i,a),a&&o&4&&l0(n,i);break;case 22:i.memoizedState===null&&qe(n,i,a),Ln(i,i.return);break;case 30:break;default:qe(n,i,a)}e=e.sibling}}function $r(t,e){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&ui(a))}function Rr(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&ui(t))}function pe(t,e,a,l){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)o0(t,e,a,l),e=e.sibling}function o0(t,e,a,l){var n=e.flags;switch(e.tag){case 0:case 11:case 15:pe(t,e,a,l),n&2048&&si(9,e);break;case 1:pe(t,e,a,l);break;case 3:pe(t,e,a,l),n&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&ui(t)));break;case 12:if(n&2048){pe(t,e,a,l),t=e.stateNode;try{var i=e.memoizedProps,o=i.id,u=i.onPostCommit;typeof u=="function"&&u(o,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(s){G(e,e.return,s)}}else pe(t,e,a,l);break;case 31:pe(t,e,a,l);break;case 13:pe(t,e,a,l);break;case 23:break;case 22:i=e.stateNode,o=e.alternate,e.memoizedState!==null?i._visibility&2?pe(t,e,a,l):Bn(t,e):i._visibility&2?pe(t,e,a,l):(i._visibility|=2,gl(t,e,a,l,(e.subtreeFlags&10256)!==0||!1)),n&2048&&$r(o,e);break;case 24:pe(t,e,a,l),n&2048&&Rr(e.alternate,e);break;default:pe(t,e,a,l)}}function gl(t,e,a,l,n){for(n=n&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var i=t,o=e,u=a,s=l,p=o.flags;switch(o.tag){case 0:case 11:case 15:gl(i,o,u,s,n),si(8,o);break;case 23:break;case 22:var g=o.stateNode;o.memoizedState!==null?g._visibility&2?gl(i,o,u,s,n):Bn(i,o):(g._visibility|=2,gl(i,o,u,s,n)),n&&p&2048&&$r(o.alternate,o);break;case 24:gl(i,o,u,s,n),n&&p&2048&&Rr(o.alternate,o);break;default:gl(i,o,u,s,n)}e=e.sibling}}function Bn(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var a=t,l=e,n=l.flags;switch(l.tag){case 22:Bn(a,l),n&2048&&$r(l.alternate,l);break;case 24:Bn(a,l),n&2048&&Rr(l.alternate,l);break;default:Bn(a,l)}e=e.sibling}}var Mn=8192;function hl(t,e,a){if(t.subtreeFlags&Mn)for(t=t.child;t!==null;)u0(t,e,a),t=t.sibling}function u0(t,e,a){switch(t.tag){case 26:hl(t,e,a),t.flags&Mn&&t.memoizedState!==null&&Nb(a,me,t.memoizedState,t.memoizedProps);break;case 5:hl(t,e,a);break;case 3:case 4:var l=me;me=eu(t.stateNode.containerInfo),hl(t,e,a),me=l;break;case 22:t.memoizedState===null&&(l=t.alternate,l!==null&&l.memoizedState!==null?(l=Mn,Mn=16777216,hl(t,e,a),Mn=l):hl(t,e,a));break;default:hl(t,e,a)}}function c0(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function Sn(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var a=0;a<e.length;a++){var l=e[a];ht=l,r0(l,t)}c0(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)s0(t),t=t.sibling}function s0(t){switch(t.tag){case 0:case 11:case 15:Sn(t),t.flags&2048&&za(9,t,t.return);break;case 3:Sn(t);break;case 12:Sn(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,_o(t)):Sn(t);break;default:Sn(t)}}function _o(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var a=0;a<e.length;a++){var l=e[a];ht=l,r0(l,t)}c0(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:za(8,e,e.return),_o(e);break;case 22:a=e.stateNode,a._visibility&2&&(a._visibility&=-3,_o(e));break;default:_o(e)}t=t.sibling}}function r0(t,e){for(;ht!==null;){var a=ht;switch(a.tag){case 0:case 11:case 15:za(8,a,e);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var l=a.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:ui(a.memoizedState.cache)}if(l=a.child,l!==null)l.return=a,ht=l;else t:for(a=t;ht!==null;){l=ht;var n=l.sibling,i=l.return;if(t0(l),l===a){ht=null;break t}if(n!==null){n.return=i,ht=n;break t}ht=i}}}var Z1={getCacheForType:function(t){var e=xt(rt),a=e.data.get(t);return a===void 0&&(a=t(),e.data.set(t,a)),a},cacheSignal:function(){return xt(rt).controller.signal}},k1=typeof WeakMap=="function"?WeakMap:Map,Y=0,Z=null,U=null,L=0,V=0,Gt=null,ma=!1,Il=!1,Ur=!1,Ie=0,lt=0,Na=0,Ka=0,Dr=0,Zt=0,Gl=0,Hn=null,Bt=null,Us=!1,yu=0,f0=0,Ko=1/0,Jo=null,wa=null,dt=0,xa=null,Ql=null,ke=0,Ds=0,Ls=null,d0=null,qn=0,Bs=null;function Wt(){return(Y&2)!==0&&L!==0?L&-L:z.T!==null?Br():wm()}function p0(){if(Zt===0)if((L&536870912)===0||B){var t=Pi;Pi<<=1,(Pi&3932160)===0&&(Pi=262144),Zt=t}else Zt=536870912;return t=It.current,t!==null&&(t.flags|=32),Zt}function Ht(t,e,a){(t===Z&&(V===2||V===9)||t.cancelPendingCommit!==null)&&(Xl(t,0),ha(t,L,Zt,!1)),ni(t,a),((Y&2)===0||t!==Z)&&(t===Z&&((Y&2)===0&&(Ka|=a),lt===4&&ha(t,L,Zt,!1)),Ne(t))}function m0(t,e,a){if((Y&6)!==0)throw Error(w(327));var l=!a&&(e&127)===0&&(e&t.expiredLanes)===0||li(t,e),n=l?W1(t,e):kc(t,e,!0),i=l;do{if(n===0){Il&&!l&&ha(t,e,0,!1);break}else{if(a=t.current.alternate,i&&!K1(a)){n=kc(t,e,!1),i=!1;continue}if(n===2){if(i=e,t.errorRecoveryDisabledLanes&i)var o=0;else o=t.pendingLanes&-536870913,o=o!==0?o:o&536870912?536870912:0;if(o!==0){e=o;t:{var u=t;n=Hn;var s=u.current.memoizedState.isDehydrated;if(s&&(Xl(u,o).flags|=256),o=kc(u,o,!1),o!==2){if(Ur&&!s){u.errorRecoveryDisabledLanes|=i,Ka|=i,n=4;break t}i=Bt,Bt=n,i!==null&&(Bt===null?Bt=i:Bt.push.apply(Bt,i))}n=o}if(i=!1,n!==2)continue}}if(n===1){Xl(t,0),ha(t,e,0,!0);break}t:{switch(l=t,i=n,i){case 0:case 1:throw Error(w(345));case 4:if((e&4194048)!==e)break;case 6:ha(l,e,Zt,!ma);break t;case 2:Bt=null;break;case 3:case 5:break;default:throw Error(w(329))}if((e&62914560)===e&&(n=yu+300-kt(),10<n)){if(ha(l,e,Zt,!ma),ou(l,0,!0)!==0)break t;ke=e,l.timeoutHandle=U0($p.bind(null,l,a,Bt,Jo,Us,e,Zt,Ka,Gl,ma,i,"Throttled",-0,0),n);break t}$p(l,a,Bt,Jo,Us,e,Zt,Ka,Gl,ma,i,null,-0,0)}}break}while(!0);Ne(t)}function $p(t,e,a,l,n,i,o,u,s,p,g,v,m,y){if(t.timeoutHandle=-1,v=e.subtreeFlags,v&8192||(v&16785408)===16785408){v={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ge},u0(e,i,v);var E=(i&62914560)===i?yu-kt():(i&4194048)===i?f0-kt():0;if(E=Ob(v,E),E!==null){ke=i,t.cancelPendingCommit=E(Up.bind(null,t,e,i,a,l,n,o,u,s,g,v,null,m,y)),ha(t,i,o,!p);return}}Up(t,e,i,a,l,n,o,u,s)}function K1(t){for(var e=t;;){var a=e.tag;if((a===0||a===11||a===15)&&e.flags&16384&&(a=e.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var l=0;l<a.length;l++){var n=a[l],i=n.getSnapshot;n=n.value;try{if(!Ft(i(),n))return!1}catch{return!1}}if(a=e.child,e.subtreeFlags&16384&&a!==null)a.return=e,e=a;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function ha(t,e,a,l){e&=~Dr,e&=~Ka,t.suspendedLanes|=e,t.pingedLanes&=~e,l&&(t.warmLanes|=e),l=t.expirationTimes;for(var n=e;0<n;){var i=31-Jt(n),o=1<<i;l[i]=-1,n&=~o}a!==0&&vm(t,a,e)}function vu(){return(Y&6)===0?(ri(0,!1),!1):!0}function Lr(){if(U!==null){if(V===0)var t=U.return;else t=U,Qe=nl=null,wr(t),Ul=null,kn=0,t=U;for(;t!==null;)kh(t.alternate,t),t=t.return;U=null}}function Xl(t,e){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,db(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),ke=0,Lr(),Z=t,U=a=Xe(t.current,null),L=e,V=0,Gt=null,ma=!1,Il=li(t,e),Ur=!1,Gl=Zt=Dr=Ka=Na=lt=0,Bt=Hn=null,Us=!1,(e&8)!==0&&(e|=e&32);var l=t.entangledLanes;if(l!==0)for(t=t.entanglements,l&=e;0<l;){var n=31-Jt(l),i=1<<n;e|=t[n],l&=~i}return Ie=e,ru(),a}function h0(t,e){C=null,z.H=Jn,e===Fl||e===du?(e=rp(),V=3):e===mr?(e=rp(),V=4):V=e===Or?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,Gt=e,U===null&&(lt=1,Xo(t,ce(e,t.current)))}function g0(){var t=It.current;return t===null?!0:(L&4194048)===L?re===null:(L&62914560)===L||(L&536870912)!==0?t===re:!1}function y0(){var t=z.H;return z.H=Jn,t===null?Jn:t}function v0(){var t=z.A;return z.A=Z1,t}function Wo(){lt=4,ma||(L&4194048)!==L&&It.current!==null||(Il=!0),(Na&134217727)===0&&(Ka&134217727)===0||Z===null||ha(Z,L,Zt,!1)}function kc(t,e,a){var l=Y;Y|=2;var n=y0(),i=v0();(Z!==t||L!==e)&&(Jo=null,Xl(t,e)),e=!1;var o=lt;t:do try{if(V!==0&&U!==null){var u=U,s=Gt;switch(V){case 8:Lr(),o=6;break t;case 3:case 2:case 9:case 6:It.current===null&&(e=!0);var p=V;if(V=0,Gt=null,Nl(t,u,s,p),a&&Il){o=0;break t}break;default:p=V,V=0,Gt=null,Nl(t,u,s,p)}}J1(),o=lt;break}catch(g){h0(t,g)}while(!0);return e&&t.shellSuspendCounter++,Qe=nl=null,Y=l,z.H=n,z.A=i,U===null&&(Z=null,L=0,ru()),o}function J1(){for(;U!==null;)b0(U)}function W1(t,e){var a=Y;Y|=2;var l=y0(),n=v0();Z!==t||L!==e?(Jo=null,Ko=kt()+500,Xl(t,e)):Il=li(t,e);t:do try{if(V!==0&&U!==null){e=U;var i=Gt;e:switch(V){case 1:V=0,Gt=null,Nl(t,e,i,1);break;case 2:case 9:if(sp(i)){V=0,Gt=null,Rp(e);break}e=function(){V!==2&&V!==9||Z!==t||(V=7),Ne(t)},i.then(e,e);break t;case 3:V=7;break t;case 4:V=5;break t;case 7:sp(i)?(V=0,Gt=null,Rp(e)):(V=0,Gt=null,Nl(t,e,i,7));break;case 5:var o=null;switch(U.tag){case 26:o=U.memoizedState;case 5:case 27:var u=U;if(o?q0(o):u.stateNode.complete){V=0,Gt=null;var s=u.sibling;if(s!==null)U=s;else{var p=u.return;p!==null?(U=p,bu(p)):U=null}break e}}V=0,Gt=null,Nl(t,e,i,5);break;case 6:V=0,Gt=null,Nl(t,e,i,6);break;case 8:Lr(),lt=6;break t;default:throw Error(w(462))}}F1();break}catch(g){h0(t,g)}while(!0);return Qe=nl=null,z.H=l,z.A=n,Y=a,U!==null?0:(Z=null,L=0,ru(),lt)}function F1(){for(;U!==null&&!Sv();)b0(U)}function b0(t){var e=Zh(t.alternate,t,Ie);t.memoizedProps=t.pendingProps,e===null?bu(t):U=e}function Rp(t){var e=t,a=e.alternate;switch(e.tag){case 15:case 0:e=_p(a,e,e.pendingProps,e.type,void 0,L);break;case 11:e=_p(a,e,e.pendingProps,e.type.render,e.ref,L);break;case 5:wr(e);default:kh(a,e),e=U=km(e,Ie),e=Zh(a,e,Ie)}t.memoizedProps=t.pendingProps,e===null?bu(t):U=e}function Nl(t,e,a,l){Qe=nl=null,wr(e),Ul=null,kn=0;var n=e.return;try{if(q1(t,n,e,a,L)){lt=1,Xo(t,ce(a,t.current)),U=null;return}}catch(i){if(n!==null)throw U=n,i;lt=1,Xo(t,ce(a,t.current)),U=null;return}e.flags&32768?(B||l===1?t=!0:Il||(L&536870912)!==0?t=!1:(ma=t=!0,(l===2||l===9||l===3||l===6)&&(l=It.current,l!==null&&l.tag===13&&(l.flags|=16384))),S0(e,t)):bu(e)}function bu(t){var e=t;do{if((e.flags&32768)!==0){S0(e,ma);return}t=e.return;var a=V1(e.alternate,e,Ie);if(a!==null){U=a;return}if(e=e.sibling,e!==null){U=e;return}U=e=t}while(e!==null);lt===0&&(lt=5)}function S0(t,e){do{var a=G1(t.alternate,t);if(a!==null){a.flags&=32767,U=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!e&&(t=t.sibling,t!==null)){U=t;return}U=t=a}while(t!==null);lt=6,U=null}function Up(t,e,a,l,n,i,o,u,s){t.cancelPendingCommit=null;do Su();while(dt!==0);if((Y&6)!==0)throw Error(w(327));if(e!==null){if(e===t.current)throw Error(w(177));if(i=e.lanes|e.childLanes,i|=ur,Ov(t,a,i,o,u,s),t===Z&&(U=Z=null,L=0),Ql=e,xa=t,ke=a,Ds=i,Ls=n,d0=l,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,eb(Uo,function(){return A0(),null})):(t.callbackNode=null,t.callbackPriority=0),l=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||l){l=z.T,z.T=null,n=j.p,j.p=2,o=Y,Y|=4;try{Q1(t,e,a)}finally{Y=o,j.p=n,z.T=l}}dt=1,w0(),x0(),E0()}}function w0(){if(dt===1){dt=0;var t=xa,e=Ql,a=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||a){a=z.T,z.T=null;var l=j.p;j.p=2;var n=Y;Y|=4;try{n0(e,t);var i=js,o=qm(t.containerInfo),u=i.focusedElem,s=i.selectionRange;if(o!==u&&u&&u.ownerDocument&&Hm(u.ownerDocument.documentElement,u)){if(s!==null&&or(u)){var p=s.start,g=s.end;if(g===void 0&&(g=p),"selectionStart"in u)u.selectionStart=p,u.selectionEnd=Math.min(g,u.value.length);else{var v=u.ownerDocument||document,m=v&&v.defaultView||window;if(m.getSelection){var y=m.getSelection(),E=u.textContent.length,_=Math.min(s.start,E),O=s.end===void 0?_:Math.min(s.end,E);!y.extend&&_>O&&(o=O,O=_,_=o);var f=ap(u,_),r=ap(u,O);if(f&&r&&(y.rangeCount!==1||y.anchorNode!==f.node||y.anchorOffset!==f.offset||y.focusNode!==r.node||y.focusOffset!==r.offset)){var h=v.createRange();h.setStart(f.node,f.offset),y.removeAllRanges(),_>O?(y.addRange(h),y.extend(r.node,r.offset)):(h.setEnd(r.node,r.offset),y.addRange(h))}}}}for(v=[],y=u;y=y.parentNode;)y.nodeType===1&&v.push({element:y,left:y.scrollLeft,top:y.scrollTop});for(typeof u.focus=="function"&&u.focus(),u=0;u<v.length;u++){var b=v[u];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}nu=!!Ys,js=Ys=null}finally{Y=n,j.p=l,z.T=a}}t.current=e,dt=2}}function x0(){if(dt===2){dt=0;var t=xa,e=Ql,a=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||a){a=z.T,z.T=null;var l=j.p;j.p=2;var n=Y;Y|=4;try{Ph(t,e.alternate,e)}finally{Y=n,j.p=l,z.T=a}}dt=3}}function E0(){if(dt===4||dt===3){dt=0,wv();var t=xa,e=Ql,a=ke,l=d0;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?dt=5:(dt=0,Ql=xa=null,T0(t,t.pendingLanes));var n=t.pendingLanes;if(n===0&&(wa=null),Ps(a),e=e.stateNode,Kt&&typeof Kt.onCommitFiberRoot=="function")try{Kt.onCommitFiberRoot(ai,e,void 0,(e.current.flags&128)===128)}catch{}if(l!==null){e=z.T,n=j.p,j.p=2,z.T=null;try{for(var i=t.onRecoverableError,o=0;o<l.length;o++){var u=l[o];i(u.value,{componentStack:u.stack})}}finally{z.T=e,j.p=n}}(ke&3)!==0&&Su(),Ne(t),n=t.pendingLanes,(a&261930)!==0&&(n&42)!==0?t===Bs?qn++:(qn=0,Bs=t):qn=0,ri(0,!1)}}function T0(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,ui(e)))}function Su(){return w0(),x0(),E0(),A0()}function A0(){if(dt!==5)return!1;var t=xa,e=Ds;Ds=0;var a=Ps(ke),l=z.T,n=j.p;try{j.p=32>a?32:a,z.T=null,a=Ls,Ls=null;var i=xa,o=ke;if(dt=0,Ql=xa=null,ke=0,(Y&6)!==0)throw Error(w(331));var u=Y;if(Y|=4,s0(i.current),o0(i,i.current,o,a),Y=u,ri(0,!1),Kt&&typeof Kt.onPostCommitFiberRoot=="function")try{Kt.onPostCommitFiberRoot(ai,i)}catch{}return!0}finally{j.p=n,z.T=l,T0(t,e)}}function Dp(t,e,a){e=ce(a,e),e=Os(t.stateNode,e,2),t=Sa(t,e,2),t!==null&&(ni(t,2),Ne(t))}function G(t,e,a){if(t.tag===3)Dp(t,t,a);else for(;e!==null;){if(e.tag===3){Dp(e,t,a);break}else if(e.tag===1){var l=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(wa===null||!wa.has(l))){t=ce(a,t),a=Yh(2),l=Sa(e,a,2),l!==null&&(jh(a,l,e,t),ni(l,2),Ne(l));break}}e=e.return}}function Kc(t,e,a){var l=t.pingCache;if(l===null){l=t.pingCache=new k1;var n=new Set;l.set(e,n)}else n=l.get(e),n===void 0&&(n=new Set,l.set(e,n));n.has(a)||(Ur=!0,n.add(a),t=I1.bind(null,t,e,a),e.then(t,t))}function I1(t,e,a){var l=t.pingCache;l!==null&&l.delete(e),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,Z===t&&(L&a)===a&&(lt===4||lt===3&&(L&62914560)===L&&300>kt()-yu?(Y&2)===0&&Xl(t,0):Dr|=a,Gl===L&&(Gl=0)),Ne(t)}function _0(t,e){e===0&&(e=ym()),t=ll(t,e),t!==null&&(ni(t,e),Ne(t))}function P1(t){var e=t.memoizedState,a=0;e!==null&&(a=e.retryLane),_0(t,a)}function tb(t,e){var a=0;switch(t.tag){case 31:case 13:var l=t.stateNode,n=t.memoizedState;n!==null&&(a=n.retryLane);break;case 19:l=t.stateNode;break;case 22:l=t.stateNode._retryCache;break;default:throw Error(w(314))}l!==null&&l.delete(e),_0(t,a)}function eb(t,e){return Fs(t,e)}var Fo=null,yl=null,Hs=!1,Io=!1,Jc=!1,ga=0;function Ne(t){t!==yl&&t.next===null&&(yl===null?Fo=yl=t:yl=yl.next=t),Io=!0,Hs||(Hs=!0,lb())}function ri(t,e){if(!Jc&&Io){Jc=!0;do for(var a=!1,l=Fo;l!==null;){if(!e)if(t!==0){var n=l.pendingLanes;if(n===0)var i=0;else{var o=l.suspendedLanes,u=l.pingedLanes;i=(1<<31-Jt(42|t)+1)-1,i&=n&~(o&~u),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(a=!0,Lp(l,i))}else i=L,i=ou(l,l===Z?i:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(i&3)===0||li(l,i)||(a=!0,Lp(l,i));l=l.next}while(a);Jc=!1}}function ab(){M0()}function M0(){Io=Hs=!1;var t=0;ga!==0&&fb()&&(t=ga);for(var e=kt(),a=null,l=Fo;l!==null;){var n=l.next,i=z0(l,e);i===0?(l.next=null,a===null?Fo=n:a.next=n,n===null&&(yl=a)):(a=l,(t!==0||(i&3)!==0)&&(Io=!0)),l=n}dt!==0&&dt!==5||ri(t,!1),ga!==0&&(ga=0)}function z0(t,e){for(var a=t.suspendedLanes,l=t.pingedLanes,n=t.expirationTimes,i=t.pendingLanes&-62914561;0<i;){var o=31-Jt(i),u=1<<o,s=n[o];s===-1?((u&a)===0||(u&l)!==0)&&(n[o]=Nv(u,e)):s<=e&&(t.expiredLanes|=u),i&=~u}if(e=Z,a=L,a=ou(t,t===e?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l=t.callbackNode,a===0||t===e&&(V===2||V===9)||t.cancelPendingCommit!==null)return l!==null&&l!==null&&Tc(l),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||li(t,a)){if(e=a&-a,e===t.callbackPriority)return e;switch(l!==null&&Tc(l),Ps(a)){case 2:case 8:a=hm;break;case 32:a=Uo;break;case 268435456:a=gm;break;default:a=Uo}return l=N0.bind(null,t),a=Fs(a,l),t.callbackPriority=e,t.callbackNode=a,e}return l!==null&&l!==null&&Tc(l),t.callbackPriority=2,t.callbackNode=null,2}function N0(t,e){if(dt!==0&&dt!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(Su()&&t.callbackNode!==a)return null;var l=L;return l=ou(t,t===Z?l:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l===0?null:(m0(t,l,e),z0(t,kt()),t.callbackNode!=null&&t.callbackNode===a?N0.bind(null,t):null)}function Lp(t,e){if(Su())return null;m0(t,e,!0)}function lb(){pb(function(){(Y&6)!==0?Fs(mm,ab):M0()})}function Br(){if(ga===0){var t=Yl;t===0&&(t=Ii,Ii<<=1,(Ii&261888)===0&&(Ii=256)),ga=t}return ga}function Bp(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:yo(""+t)}function Hp(t,e){var a=e.ownerDocument.createElement("input");return a.name=e.name,a.value=e.value,t.id&&a.setAttribute("form",t.id),e.parentNode.insertBefore(a,e),t=new FormData(t),a.parentNode.removeChild(a),t}function nb(t,e,a,l,n){if(e==="submit"&&a&&a.stateNode===n){var i=Bp((n[qt]||null).action),o=l.submitter;o&&(e=(e=o[qt]||null)?Bp(e.formAction):o.getAttribute("formAction"),e!==null&&(i=e,o=null));var u=new uu("action","action",null,l,n);t.push({event:u,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(ga!==0){var s=o?Hp(n,o):new FormData(n);zs(a,{pending:!0,data:s,method:n.method,action:i},null,s)}}else typeof i=="function"&&(u.preventDefault(),s=o?Hp(n,o):new FormData(n),zs(a,{pending:!0,data:s,method:n.method,action:i},i,s))},currentTarget:n}]})}}for(ro=0;ro<gs.length;ro++)fo=gs[ro],qp=fo.toLowerCase(),Yp=fo[0].toUpperCase()+fo.slice(1),he(qp,"on"+Yp);var fo,qp,Yp,ro;he(jm,"onAnimationEnd");he(Vm,"onAnimationIteration");he(Gm,"onAnimationStart");he("dblclick","onDoubleClick");he("focusin","onFocus");he("focusout","onBlur");he(x1,"onTransitionRun");he(E1,"onTransitionStart");he(T1,"onTransitionCancel");he(Qm,"onTransitionEnd");Hl("onMouseEnter",["mouseout","mouseover"]);Hl("onMouseLeave",["mouseout","mouseover"]);Hl("onPointerEnter",["pointerout","pointerover"]);Hl("onPointerLeave",["pointerout","pointerover"]);tl("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));tl("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));tl("onBeforeInput",["compositionend","keypress","textInput","paste"]);tl("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));tl("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));tl("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Wn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ib=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Wn));function O0(t,e){e=(e&4)!==0;for(var a=0;a<t.length;a++){var l=t[a],n=l.event;l=l.listeners;t:{var i=void 0;if(e)for(var o=l.length-1;0<=o;o--){var u=l[o],s=u.instance,p=u.currentTarget;if(u=u.listener,s!==i&&n.isPropagationStopped())break t;i=u,n.currentTarget=p;try{i(n)}catch(g){Lo(g)}n.currentTarget=null,i=s}else for(o=0;o<l.length;o++){if(u=l[o],s=u.instance,p=u.currentTarget,u=u.listener,s!==i&&n.isPropagationStopped())break t;i=u,n.currentTarget=p;try{i(n)}catch(g){Lo(g)}n.currentTarget=null,i=s}}}}function R(t,e){var a=e[cs];a===void 0&&(a=e[cs]=new Set);var l=t+"__bubble";a.has(l)||(C0(e,t,2,!1),a.add(l))}function Wc(t,e,a){var l=0;e&&(l|=4),C0(a,t,l,e)}var po="_reactListening"+Math.random().toString(36).slice(2);function Hr(t){if(!t[po]){t[po]=!0,xm.forEach(function(a){a!=="selectionchange"&&(ib.has(a)||Wc(a,!1,t),Wc(a,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[po]||(e[po]=!0,Wc("selectionchange",!1,e))}}function C0(t,e,a,l){switch(Q0(e)){case 2:var n=Rb;break;case 8:n=Ub;break;default:n=Vr}a=n.bind(null,e,a,t),n=void 0,!ps||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(n=!0),l?n!==void 0?t.addEventListener(e,a,{capture:!0,passive:n}):t.addEventListener(e,a,!0):n!==void 0?t.addEventListener(e,a,{passive:n}):t.addEventListener(e,a,!1)}function Fc(t,e,a,l,n){var i=l;if((e&1)===0&&(e&2)===0&&l!==null)t:for(;;){if(l===null)return;var o=l.tag;if(o===3||o===4){var u=l.stateNode.containerInfo;if(u===n)break;if(o===4)for(o=l.return;o!==null;){var s=o.tag;if((s===3||s===4)&&o.stateNode.containerInfo===n)return;o=o.return}for(;u!==null;){if(o=Sl(u),o===null)return;if(s=o.tag,s===5||s===6||s===26||s===27){l=i=o;continue t}u=u.parentNode}}l=l.return}Om(function(){var p=i,g=ar(a),v=[];t:{var m=Xm.get(t);if(m!==void 0){var y=uu,E=t;switch(t){case"keypress":if(bo(a)===0)break t;case"keydown":case"keyup":y=t1;break;case"focusin":E="focus",y=Nc;break;case"focusout":E="blur",y=Nc;break;case"beforeblur":case"afterblur":y=Nc;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=kd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=Vv;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=l1;break;case jm:case Vm:case Gm:y=Xv;break;case Qm:y=i1;break;case"scroll":case"scrollend":y=Yv;break;case"wheel":y=u1;break;case"copy":case"cut":case"paste":y=kv;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=Jd;break;case"toggle":case"beforetoggle":y=s1}var _=(e&4)!==0,O=!_&&(t==="scroll"||t==="scrollend"),f=_?m!==null?m+"Capture":null:m;_=[];for(var r=p,h;r!==null;){var b=r;if(h=b.stateNode,b=b.tag,b!==5&&b!==26&&b!==27||h===null||f===null||(b=Vn(r,f),b!=null&&_.push(Fn(r,b,h))),O)break;r=r.return}0<_.length&&(m=new y(m,E,null,a,g),v.push({event:m,listeners:_}))}}if((e&7)===0){t:{if(m=t==="mouseover"||t==="pointerover",y=t==="mouseout"||t==="pointerout",m&&a!==ds&&(E=a.relatedTarget||a.fromElement)&&(Sl(E)||E[Kl]))break t;if((y||m)&&(m=g.window===g?g:(m=g.ownerDocument)?m.defaultView||m.parentWindow:window,y?(E=a.relatedTarget||a.toElement,y=p,E=E?Sl(E):null,E!==null&&(O=ei(E),_=E.tag,E!==O||_!==5&&_!==27&&_!==6)&&(E=null)):(y=null,E=p),y!==E)){if(_=kd,b="onMouseLeave",f="onMouseEnter",r="mouse",(t==="pointerout"||t==="pointerover")&&(_=Jd,b="onPointerLeave",f="onPointerEnter",r="pointer"),O=y==null?m:An(y),h=E==null?m:An(E),m=new _(b,r+"leave",y,a,g),m.target=O,m.relatedTarget=h,b=null,Sl(g)===p&&(_=new _(f,r+"enter",E,a,g),_.target=h,_.relatedTarget=O,b=_),O=b,y&&E)e:{for(_=ob,f=y,r=E,h=0,b=f;b;b=_(b))h++;b=0;for(var A=r;A;A=_(A))b++;for(;0<h-b;)f=_(f),h--;for(;0<b-h;)r=_(r),b--;for(;h--;){if(f===r||r!==null&&f===r.alternate){_=f;break e}f=_(f),r=_(r)}_=null}else _=null;y!==null&&jp(v,m,y,_,!1),E!==null&&O!==null&&jp(v,O,E,_,!0)}}t:{if(m=p?An(p):window,y=m.nodeName&&m.nodeName.toLowerCase(),y==="select"||y==="input"&&m.type==="file")var H=Pd;else if(Id(m))if(Lm)H=b1;else{H=y1;var T=g1}else y=m.nodeName,!y||y.toLowerCase()!=="input"||m.type!=="checkbox"&&m.type!=="radio"?p&&er(p.elementType)&&(H=Pd):H=v1;if(H&&(H=H(t,p))){Dm(v,H,a,g);break t}T&&T(t,m,p),t==="focusout"&&p&&m.type==="number"&&p.memoizedProps.value!=null&&fs(m,"number",m.value)}switch(T=p?An(p):window,t){case"focusin":(Id(T)||T.contentEditable==="true")&&(El=T,ms=p,On=null);break;case"focusout":On=ms=El=null;break;case"mousedown":hs=!0;break;case"contextmenu":case"mouseup":case"dragend":hs=!1,lp(v,a,g);break;case"selectionchange":if(w1)break;case"keydown":case"keyup":lp(v,a,g)}var $;if(ir)t:{switch(t){case"compositionstart":var D="onCompositionStart";break t;case"compositionend":D="onCompositionEnd";break t;case"compositionupdate":D="onCompositionUpdate";break t}D=void 0}else xl?Rm(t,a)&&(D="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(D="onCompositionStart");D&&($m&&a.locale!=="ko"&&(xl||D!=="onCompositionStart"?D==="onCompositionEnd"&&xl&&($=Cm()):(pa=g,lr="value"in pa?pa.value:pa.textContent,xl=!0)),T=Po(p,D),0<T.length&&(D=new Kd(D,t,null,a,g),v.push({event:D,listeners:T}),$?D.data=$:($=Um(a),$!==null&&(D.data=$)))),($=f1?d1(t,a):p1(t,a))&&(D=Po(p,"onBeforeInput"),0<D.length&&(T=new Kd("onBeforeInput","beforeinput",null,a,g),v.push({event:T,listeners:D}),T.data=$)),nb(v,t,p,a,g)}O0(v,e)})}function Fn(t,e,a){return{instance:t,listener:e,currentTarget:a}}function Po(t,e){for(var a=e+"Capture",l=[];t!==null;){var n=t,i=n.stateNode;if(n=n.tag,n!==5&&n!==26&&n!==27||i===null||(n=Vn(t,a),n!=null&&l.unshift(Fn(t,n,i)),n=Vn(t,e),n!=null&&l.push(Fn(t,n,i))),t.tag===3)return l;t=t.return}return[]}function ob(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function jp(t,e,a,l,n){for(var i=e._reactName,o=[];a!==null&&a!==l;){var u=a,s=u.alternate,p=u.stateNode;if(u=u.tag,s!==null&&s===l)break;u!==5&&u!==26&&u!==27||p===null||(s=p,n?(p=Vn(a,i),p!=null&&o.unshift(Fn(a,p,s))):n||(p=Vn(a,i),p!=null&&o.push(Fn(a,p,s)))),a=a.return}o.length!==0&&t.push({event:e,listeners:o})}var ub=/\r\n?/g,cb=/\u0000|\uFFFD/g;function Vp(t){return(typeof t=="string"?t:""+t).replace(ub,`
`).replace(cb,"")}function $0(t,e){return e=Vp(e),Vp(t)===e}function Q(t,e,a,l,n,i){switch(a){case"children":typeof l=="string"?e==="body"||e==="textarea"&&l===""||ql(t,l):(typeof l=="number"||typeof l=="bigint")&&e!=="body"&&ql(t,""+l);break;case"className":eo(t,"class",l);break;case"tabIndex":eo(t,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":eo(t,a,l);break;case"style":Nm(t,l,i);break;case"data":if(e!=="object"){eo(t,"data",l);break}case"src":case"href":if(l===""&&(e!=="a"||a!=="href")){t.removeAttribute(a);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(a);break}l=yo(""+l),t.setAttribute(a,l);break;case"action":case"formAction":if(typeof l=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(a==="formAction"?(e!=="input"&&Q(t,e,"name",n.name,n,null),Q(t,e,"formEncType",n.formEncType,n,null),Q(t,e,"formMethod",n.formMethod,n,null),Q(t,e,"formTarget",n.formTarget,n,null)):(Q(t,e,"encType",n.encType,n,null),Q(t,e,"method",n.method,n,null),Q(t,e,"target",n.target,n,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(a);break}l=yo(""+l),t.setAttribute(a,l);break;case"onClick":l!=null&&(t.onclick=Ge);break;case"onScroll":l!=null&&R("scroll",t);break;case"onScrollEnd":l!=null&&R("scrollend",t);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(w(61));if(a=l.__html,a!=null){if(n.children!=null)throw Error(w(60));t.innerHTML=a}}break;case"multiple":t.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":t.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){t.removeAttribute("xlink:href");break}a=yo(""+l),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(a,""+l):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":l===!0?t.setAttribute(a,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(a,l):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?t.setAttribute(a,l):t.removeAttribute(a);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?t.removeAttribute(a):t.setAttribute(a,l);break;case"popover":R("beforetoggle",t),R("toggle",t),go(t,"popover",l);break;case"xlinkActuate":De(t,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":De(t,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":De(t,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":De(t,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":De(t,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":De(t,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":De(t,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":De(t,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":De(t,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":go(t,"is",l);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Hv.get(a)||a,go(t,a,l))}}function qs(t,e,a,l,n,i){switch(a){case"style":Nm(t,l,i);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(w(61));if(a=l.__html,a!=null){if(n.children!=null)throw Error(w(60));t.innerHTML=a}}break;case"children":typeof l=="string"?ql(t,l):(typeof l=="number"||typeof l=="bigint")&&ql(t,""+l);break;case"onScroll":l!=null&&R("scroll",t);break;case"onScrollEnd":l!=null&&R("scrollend",t);break;case"onClick":l!=null&&(t.onclick=Ge);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Em.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(n=a.endsWith("Capture"),e=a.slice(2,n?a.length-7:void 0),i=t[qt]||null,i=i!=null?i[a]:null,typeof i=="function"&&t.removeEventListener(e,i,n),typeof l=="function")){typeof i!="function"&&i!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(e,l,n);break t}a in t?t[a]=l:l===!0?t.setAttribute(a,""):go(t,a,l)}}}function Et(t,e,a){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":R("error",t),R("load",t);var l=!1,n=!1,i;for(i in a)if(a.hasOwnProperty(i)){var o=a[i];if(o!=null)switch(i){case"src":l=!0;break;case"srcSet":n=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(w(137,e));default:Q(t,e,i,o,a,null)}}n&&Q(t,e,"srcSet",a.srcSet,a,null),l&&Q(t,e,"src",a.src,a,null);return;case"input":R("invalid",t);var u=i=o=n=null,s=null,p=null;for(l in a)if(a.hasOwnProperty(l)){var g=a[l];if(g!=null)switch(l){case"name":n=g;break;case"type":o=g;break;case"checked":s=g;break;case"defaultChecked":p=g;break;case"value":i=g;break;case"defaultValue":u=g;break;case"children":case"dangerouslySetInnerHTML":if(g!=null)throw Error(w(137,e));break;default:Q(t,e,l,g,a,null)}}_m(t,i,u,s,p,o,n,!1);return;case"select":R("invalid",t),l=o=i=null;for(n in a)if(a.hasOwnProperty(n)&&(u=a[n],u!=null))switch(n){case"value":i=u;break;case"defaultValue":o=u;break;case"multiple":l=u;default:Q(t,e,n,u,a,null)}e=i,a=o,t.multiple=!!l,e!=null?Cl(t,!!l,e,!1):a!=null&&Cl(t,!!l,a,!0);return;case"textarea":R("invalid",t),i=n=l=null;for(o in a)if(a.hasOwnProperty(o)&&(u=a[o],u!=null))switch(o){case"value":l=u;break;case"defaultValue":n=u;break;case"children":i=u;break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(w(91));break;default:Q(t,e,o,u,a,null)}zm(t,l,n,i);return;case"option":for(s in a)if(a.hasOwnProperty(s)&&(l=a[s],l!=null))switch(s){case"selected":t.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:Q(t,e,s,l,a,null)}return;case"dialog":R("beforetoggle",t),R("toggle",t),R("cancel",t),R("close",t);break;case"iframe":case"object":R("load",t);break;case"video":case"audio":for(l=0;l<Wn.length;l++)R(Wn[l],t);break;case"image":R("error",t),R("load",t);break;case"details":R("toggle",t);break;case"embed":case"source":case"link":R("error",t),R("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(p in a)if(a.hasOwnProperty(p)&&(l=a[p],l!=null))switch(p){case"children":case"dangerouslySetInnerHTML":throw Error(w(137,e));default:Q(t,e,p,l,a,null)}return;default:if(er(e)){for(g in a)a.hasOwnProperty(g)&&(l=a[g],l!==void 0&&qs(t,e,g,l,a,void 0));return}}for(u in a)a.hasOwnProperty(u)&&(l=a[u],l!=null&&Q(t,e,u,l,a,null))}function sb(t,e,a,l){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var n=null,i=null,o=null,u=null,s=null,p=null,g=null;for(y in a){var v=a[y];if(a.hasOwnProperty(y)&&v!=null)switch(y){case"checked":break;case"value":break;case"defaultValue":s=v;default:l.hasOwnProperty(y)||Q(t,e,y,null,l,v)}}for(var m in l){var y=l[m];if(v=a[m],l.hasOwnProperty(m)&&(y!=null||v!=null))switch(m){case"type":i=y;break;case"name":n=y;break;case"checked":p=y;break;case"defaultChecked":g=y;break;case"value":o=y;break;case"defaultValue":u=y;break;case"children":case"dangerouslySetInnerHTML":if(y!=null)throw Error(w(137,e));break;default:y!==v&&Q(t,e,m,y,l,v)}}rs(t,o,u,s,p,g,i,n);return;case"select":y=o=u=m=null;for(i in a)if(s=a[i],a.hasOwnProperty(i)&&s!=null)switch(i){case"value":break;case"multiple":y=s;default:l.hasOwnProperty(i)||Q(t,e,i,null,l,s)}for(n in l)if(i=l[n],s=a[n],l.hasOwnProperty(n)&&(i!=null||s!=null))switch(n){case"value":m=i;break;case"defaultValue":u=i;break;case"multiple":o=i;default:i!==s&&Q(t,e,n,i,l,s)}e=u,a=o,l=y,m!=null?Cl(t,!!a,m,!1):!!l!=!!a&&(e!=null?Cl(t,!!a,e,!0):Cl(t,!!a,a?[]:"",!1));return;case"textarea":y=m=null;for(u in a)if(n=a[u],a.hasOwnProperty(u)&&n!=null&&!l.hasOwnProperty(u))switch(u){case"value":break;case"children":break;default:Q(t,e,u,null,l,n)}for(o in l)if(n=l[o],i=a[o],l.hasOwnProperty(o)&&(n!=null||i!=null))switch(o){case"value":m=n;break;case"defaultValue":y=n;break;case"children":break;case"dangerouslySetInnerHTML":if(n!=null)throw Error(w(91));break;default:n!==i&&Q(t,e,o,n,l,i)}Mm(t,m,y);return;case"option":for(var E in a)if(m=a[E],a.hasOwnProperty(E)&&m!=null&&!l.hasOwnProperty(E))switch(E){case"selected":t.selected=!1;break;default:Q(t,e,E,null,l,m)}for(s in l)if(m=l[s],y=a[s],l.hasOwnProperty(s)&&m!==y&&(m!=null||y!=null))switch(s){case"selected":t.selected=m&&typeof m!="function"&&typeof m!="symbol";break;default:Q(t,e,s,m,l,y)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var _ in a)m=a[_],a.hasOwnProperty(_)&&m!=null&&!l.hasOwnProperty(_)&&Q(t,e,_,null,l,m);for(p in l)if(m=l[p],y=a[p],l.hasOwnProperty(p)&&m!==y&&(m!=null||y!=null))switch(p){case"children":case"dangerouslySetInnerHTML":if(m!=null)throw Error(w(137,e));break;default:Q(t,e,p,m,l,y)}return;default:if(er(e)){for(var O in a)m=a[O],a.hasOwnProperty(O)&&m!==void 0&&!l.hasOwnProperty(O)&&qs(t,e,O,void 0,l,m);for(g in l)m=l[g],y=a[g],!l.hasOwnProperty(g)||m===y||m===void 0&&y===void 0||qs(t,e,g,m,l,y);return}}for(var f in a)m=a[f],a.hasOwnProperty(f)&&m!=null&&!l.hasOwnProperty(f)&&Q(t,e,f,null,l,m);for(v in l)m=l[v],y=a[v],!l.hasOwnProperty(v)||m===y||m==null&&y==null||Q(t,e,v,m,l,y)}function Gp(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function rb(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,a=performance.getEntriesByType("resource"),l=0;l<a.length;l++){var n=a[l],i=n.transferSize,o=n.initiatorType,u=n.duration;if(i&&u&&Gp(o)){for(o=0,u=n.responseEnd,l+=1;l<a.length;l++){var s=a[l],p=s.startTime;if(p>u)break;var g=s.transferSize,v=s.initiatorType;g&&Gp(v)&&(s=s.responseEnd,o+=g*(s<u?1:(u-p)/(s-p)))}if(--l,e+=8*(i+o)/(n.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Ys=null,js=null;function tu(t){return t.nodeType===9?t:t.ownerDocument}function Qp(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function R0(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function Vs(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Ic=null;function fb(){var t=window.event;return t&&t.type==="popstate"?t===Ic?!1:(Ic=t,!0):(Ic=null,!1)}var U0=typeof setTimeout=="function"?setTimeout:void 0,db=typeof clearTimeout=="function"?clearTimeout:void 0,Xp=typeof Promise=="function"?Promise:void 0,pb=typeof queueMicrotask=="function"?queueMicrotask:typeof Xp<"u"?function(t){return Xp.resolve(null).then(t).catch(mb)}:U0;function mb(t){setTimeout(function(){throw t})}function Ca(t){return t==="head"}function Zp(t,e){var a=e,l=0;do{var n=a.nextSibling;if(t.removeChild(a),n&&n.nodeType===8)if(a=n.data,a==="/$"||a==="/&"){if(l===0){t.removeChild(n),kl(e);return}l--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")l++;else if(a==="html")Yn(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,Yn(a);for(var i=a.firstChild;i;){var o=i.nextSibling,u=i.nodeName;i[ii]||u==="SCRIPT"||u==="STYLE"||u==="LINK"&&i.rel.toLowerCase()==="stylesheet"||a.removeChild(i),i=o}}else a==="body"&&Yn(t.ownerDocument.body);a=n}while(a);kl(e)}function kp(t,e){var a=t;t=0;do{var l=a.nextSibling;if(a.nodeType===1?e?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(e?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),l&&l.nodeType===8)if(a=l.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=l}while(a)}function Gs(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var a=e;switch(e=e.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Gs(a),tr(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function hb(t,e,a,l){for(;t.nodeType===1;){var n=a;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!l&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(l){if(!t[ii])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(i=t.getAttribute("rel"),i==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(i!==n.rel||t.getAttribute("href")!==(n.href==null||n.href===""?null:n.href)||t.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin)||t.getAttribute("title")!==(n.title==null?null:n.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(i=t.getAttribute("src"),(i!==(n.src==null?null:n.src)||t.getAttribute("type")!==(n.type==null?null:n.type)||t.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin))&&i&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var i=n.name==null?null:""+n.name;if(n.type==="hidden"&&t.getAttribute("name")===i)return t}else return t;if(t=fe(t.nextSibling),t===null)break}return null}function gb(t,e,a){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=fe(t.nextSibling),t===null))return null;return t}function D0(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=fe(t.nextSibling),t===null))return null;return t}function Qs(t){return t.data==="$?"||t.data==="$~"}function Xs(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function yb(t,e){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||a.readyState!=="loading")e();else{var l=function(){e(),a.removeEventListener("DOMContentLoaded",l)};a.addEventListener("DOMContentLoaded",l),t._reactRetry=l}}function fe(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var Zs=null;function Kp(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(e===0)return fe(t.nextSibling);e--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||e++}t=t.nextSibling}return null}function Jp(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(e===0)return t;e--}else a!=="/$"&&a!=="/&"||e++}t=t.previousSibling}return null}function L0(t,e,a){switch(e=tu(a),t){case"html":if(t=e.documentElement,!t)throw Error(w(452));return t;case"head":if(t=e.head,!t)throw Error(w(453));return t;case"body":if(t=e.body,!t)throw Error(w(454));return t;default:throw Error(w(451))}}function Yn(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);tr(t)}var de=new Map,Wp=new Set;function eu(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Pe=j.d;j.d={f:vb,r:bb,D:Sb,C:wb,L:xb,m:Eb,X:Ab,S:Tb,M:_b};function vb(){var t=Pe.f(),e=vu();return t||e}function bb(t){var e=Jl(t);e!==null&&e.tag===5&&e.type==="form"?Nh(e):Pe.r(t)}var Pl=typeof document>"u"?null:document;function B0(t,e,a){var l=Pl;if(l&&typeof e=="string"&&e){var n=ue(e);n='link[rel="'+t+'"][href="'+n+'"]',typeof a=="string"&&(n+='[crossorigin="'+a+'"]'),Wp.has(n)||(Wp.add(n),t={rel:t,crossOrigin:a,href:e},l.querySelector(n)===null&&(e=l.createElement("link"),Et(e,"link",t),gt(e),l.head.appendChild(e)))}}function Sb(t){Pe.D(t),B0("dns-prefetch",t,null)}function wb(t,e){Pe.C(t,e),B0("preconnect",t,e)}function xb(t,e,a){Pe.L(t,e,a);var l=Pl;if(l&&t&&e){var n='link[rel="preload"][as="'+ue(e)+'"]';e==="image"&&a&&a.imageSrcSet?(n+='[imagesrcset="'+ue(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(n+='[imagesizes="'+ue(a.imageSizes)+'"]')):n+='[href="'+ue(t)+'"]';var i=n;switch(e){case"style":i=Zl(t);break;case"script":i=tn(t)}de.has(i)||(t=I({rel:"preload",href:e==="image"&&a&&a.imageSrcSet?void 0:t,as:e},a),de.set(i,t),l.querySelector(n)!==null||e==="style"&&l.querySelector(fi(i))||e==="script"&&l.querySelector(di(i))||(e=l.createElement("link"),Et(e,"link",t),gt(e),l.head.appendChild(e)))}}function Eb(t,e){Pe.m(t,e);var a=Pl;if(a&&t){var l=e&&typeof e.as=="string"?e.as:"script",n='link[rel="modulepreload"][as="'+ue(l)+'"][href="'+ue(t)+'"]',i=n;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=tn(t)}if(!de.has(i)&&(t=I({rel:"modulepreload",href:t},e),de.set(i,t),a.querySelector(n)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(di(i)))return}l=a.createElement("link"),Et(l,"link",t),gt(l),a.head.appendChild(l)}}}function Tb(t,e,a){Pe.S(t,e,a);var l=Pl;if(l&&t){var n=Ol(l).hoistableStyles,i=Zl(t);e=e||"default";var o=n.get(i);if(!o){var u={loading:0,preload:null};if(o=l.querySelector(fi(i)))u.loading=5;else{t=I({rel:"stylesheet",href:t,"data-precedence":e},a),(a=de.get(i))&&qr(t,a);var s=o=l.createElement("link");gt(s),Et(s,"link",t),s._p=new Promise(function(p,g){s.onload=p,s.onerror=g}),s.addEventListener("load",function(){u.loading|=1}),s.addEventListener("error",function(){u.loading|=2}),u.loading|=4,Mo(o,e,l)}o={type:"stylesheet",instance:o,count:1,state:u},n.set(i,o)}}}function Ab(t,e){Pe.X(t,e);var a=Pl;if(a&&t){var l=Ol(a).hoistableScripts,n=tn(t),i=l.get(n);i||(i=a.querySelector(di(n)),i||(t=I({src:t,async:!0},e),(e=de.get(n))&&Yr(t,e),i=a.createElement("script"),gt(i),Et(i,"link",t),a.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(n,i))}}function _b(t,e){Pe.M(t,e);var a=Pl;if(a&&t){var l=Ol(a).hoistableScripts,n=tn(t),i=l.get(n);i||(i=a.querySelector(di(n)),i||(t=I({src:t,async:!0,type:"module"},e),(e=de.get(n))&&Yr(t,e),i=a.createElement("script"),gt(i),Et(i,"link",t),a.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(n,i))}}function Fp(t,e,a,l){var n=(n=ya.current)?eu(n):null;if(!n)throw Error(w(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(e=Zl(a.href),a=Ol(n).hoistableStyles,l=a.get(e),l||(l={type:"style",instance:null,count:0,state:null},a.set(e,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=Zl(a.href);var i=Ol(n).hoistableStyles,o=i.get(t);if(o||(n=n.ownerDocument||n,o={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(t,o),(i=n.querySelector(fi(t)))&&!i._p&&(o.instance=i,o.state.loading=5),de.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},de.set(t,a),i||Mb(n,t,a,o.state))),e&&l===null)throw Error(w(528,""));return o}if(e&&l!==null)throw Error(w(529,""));return null;case"script":return e=a.async,a=a.src,typeof a=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=tn(a),a=Ol(n).hoistableScripts,l=a.get(e),l||(l={type:"script",instance:null,count:0,state:null},a.set(e,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(w(444,t))}}function Zl(t){return'href="'+ue(t)+'"'}function fi(t){return'link[rel="stylesheet"]['+t+"]"}function H0(t){return I({},t,{"data-precedence":t.precedence,precedence:null})}function Mb(t,e,a,l){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?l.loading=1:(e=t.createElement("link"),l.preload=e,e.addEventListener("load",function(){return l.loading|=1}),e.addEventListener("error",function(){return l.loading|=2}),Et(e,"link",a),gt(e),t.head.appendChild(e))}function tn(t){return'[src="'+ue(t)+'"]'}function di(t){return"script[async]"+t}function Ip(t,e,a){if(e.count++,e.instance===null)switch(e.type){case"style":var l=t.querySelector('style[data-href~="'+ue(a.href)+'"]');if(l)return e.instance=l,gt(l),l;var n=I({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return l=(t.ownerDocument||t).createElement("style"),gt(l),Et(l,"style",n),Mo(l,a.precedence,t),e.instance=l;case"stylesheet":n=Zl(a.href);var i=t.querySelector(fi(n));if(i)return e.state.loading|=4,e.instance=i,gt(i),i;l=H0(a),(n=de.get(n))&&qr(l,n),i=(t.ownerDocument||t).createElement("link"),gt(i);var o=i;return o._p=new Promise(function(u,s){o.onload=u,o.onerror=s}),Et(i,"link",l),e.state.loading|=4,Mo(i,a.precedence,t),e.instance=i;case"script":return i=tn(a.src),(n=t.querySelector(di(i)))?(e.instance=n,gt(n),n):(l=a,(n=de.get(i))&&(l=I({},a),Yr(l,n)),t=t.ownerDocument||t,n=t.createElement("script"),gt(n),Et(n,"link",l),t.head.appendChild(n),e.instance=n);case"void":return null;default:throw Error(w(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(l=e.instance,e.state.loading|=4,Mo(l,a.precedence,t));return e.instance}function Mo(t,e,a){for(var l=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),n=l.length?l[l.length-1]:null,i=n,o=0;o<l.length;o++){var u=l[o];if(u.dataset.precedence===e)i=u;else if(i!==n)break}i?i.parentNode.insertBefore(t,i.nextSibling):(e=a.nodeType===9?a.head:a,e.insertBefore(t,e.firstChild))}function qr(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function Yr(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var zo=null;function Pp(t,e,a){if(zo===null){var l=new Map,n=zo=new Map;n.set(a,l)}else n=zo,l=n.get(a),l||(l=new Map,n.set(a,l));if(l.has(t))return l;for(l.set(t,null),a=a.getElementsByTagName(t),n=0;n<a.length;n++){var i=a[n];if(!(i[ii]||i[St]||t==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var o=i.getAttribute(e)||"";o=t+o;var u=l.get(o);u?u.push(i):l.set(o,[i])}}return l}function tm(t,e,a){t=t.ownerDocument||t,t.head.insertBefore(a,e==="title"?t.querySelector("head > title"):null)}function zb(t,e,a){if(a===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function q0(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function Nb(t,e,a,l){if(a.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var n=Zl(l.href),i=e.querySelector(fi(n));if(i){e=i._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=au.bind(t),e.then(t,t)),a.state.loading|=4,a.instance=i,gt(i);return}i=e.ownerDocument||e,l=H0(l),(n=de.get(n))&&qr(l,n),i=i.createElement("link"),gt(i);var o=i;o._p=new Promise(function(u,s){o.onload=u,o.onerror=s}),Et(i,"link",l),a.instance=i}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,e),(e=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=au.bind(t),e.addEventListener("load",a),e.addEventListener("error",a))}}var Pc=0;function Ob(t,e){return t.stylesheets&&t.count===0&&No(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var l=setTimeout(function(){if(t.stylesheets&&No(t,t.stylesheets),t.unsuspend){var i=t.unsuspend;t.unsuspend=null,i()}},6e4+e);0<t.imgBytes&&Pc===0&&(Pc=62500*rb());var n=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&No(t,t.stylesheets),t.unsuspend)){var i=t.unsuspend;t.unsuspend=null,i()}},(t.imgBytes>Pc?50:800)+e);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(l),clearTimeout(n)}}:null}function au(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)No(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var lu=null;function No(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,lu=new Map,e.forEach(Cb,t),lu=null,au.call(t))}function Cb(t,e){if(!(e.state.loading&4)){var a=lu.get(t);if(a)var l=a.get(null);else{a=new Map,lu.set(t,a);for(var n=t.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<n.length;i++){var o=n[i];(o.nodeName==="LINK"||o.getAttribute("media")!=="not all")&&(a.set(o.dataset.precedence,o),l=o)}l&&a.set(null,l)}n=e.instance,o=n.getAttribute("data-precedence"),i=a.get(o)||l,i===l&&a.set(null,n),a.set(o,n),this.count++,l=au.bind(this),n.addEventListener("load",l),n.addEventListener("error",l),i?i.parentNode.insertBefore(n,i.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(n,t.firstChild)),e.state.loading|=4}}var In={$$typeof:Ve,Provider:null,Consumer:null,_currentValue:Qa,_currentValue2:Qa,_threadCount:0};function $b(t,e,a,l,n,i,o,u,s){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ac(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ac(0),this.hiddenUpdates=Ac(null),this.identifierPrefix=l,this.onUncaughtError=n,this.onCaughtError=i,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=s,this.incompleteTransitions=new Map}function Y0(t,e,a,l,n,i,o,u,s,p,g,v){return t=new $b(t,e,a,o,s,p,g,v,u),e=1,i===!0&&(e|=24),i=Xt(3,null,null,e),t.current=i,i.stateNode=t,e=dr(),e.refCount++,t.pooledCache=e,e.refCount++,i.memoizedState={element:l,isDehydrated:a,cache:e},hr(i),t}function j0(t){return t?(t=_l,t):_l}function V0(t,e,a,l,n,i){n=j0(n),l.context===null?l.context=n:l.pendingContext=n,l=ba(e),l.payload={element:a},i=i===void 0?null:i,i!==null&&(l.callback=i),a=Sa(t,l,e),a!==null&&(Ht(a,t,e),$n(a,t,e))}function em(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<e?a:e}}function jr(t,e){em(t,e),(t=t.alternate)&&em(t,e)}function G0(t){if(t.tag===13||t.tag===31){var e=ll(t,67108864);e!==null&&Ht(e,t,67108864),jr(t,67108864)}}function am(t){if(t.tag===13||t.tag===31){var e=Wt();e=Is(e);var a=ll(t,e);a!==null&&Ht(a,t,e),jr(t,e)}}var nu=!0;function Rb(t,e,a,l){var n=z.T;z.T=null;var i=j.p;try{j.p=2,Vr(t,e,a,l)}finally{j.p=i,z.T=n}}function Ub(t,e,a,l){var n=z.T;z.T=null;var i=j.p;try{j.p=8,Vr(t,e,a,l)}finally{j.p=i,z.T=n}}function Vr(t,e,a,l){if(nu){var n=ks(l);if(n===null)Fc(t,e,l,iu,a),lm(t,l);else if(Lb(n,t,e,a,l))l.stopPropagation();else if(lm(t,l),e&4&&-1<Db.indexOf(t)){for(;n!==null;){var i=Jl(n);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var o=ja(i.pendingLanes);if(o!==0){var u=i;for(u.pendingLanes|=2,u.entangledLanes|=2;o;){var s=1<<31-Jt(o);u.entanglements[1]|=s,o&=~s}Ne(i),(Y&6)===0&&(Ko=kt()+500,ri(0,!1))}}break;case 31:case 13:u=ll(i,2),u!==null&&Ht(u,i,2),vu(),jr(i,2)}if(i=ks(l),i===null&&Fc(t,e,l,iu,a),i===n)break;n=i}n!==null&&l.stopPropagation()}else Fc(t,e,l,null,a)}}function ks(t){return t=ar(t),Gr(t)}var iu=null;function Gr(t){if(iu=null,t=Sl(t),t!==null){var e=ei(t);if(e===null)t=null;else{var a=e.tag;if(a===13){if(t=sm(e),t!==null)return t;t=null}else if(a===31){if(t=rm(e),t!==null)return t;t=null}else if(a===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return iu=t,null}function Q0(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(xv()){case mm:return 2;case hm:return 8;case Uo:case Ev:return 32;case gm:return 268435456;default:return 32}default:return 32}}var Ks=!1,Ea=null,Ta=null,Aa=null,Pn=new Map,ti=new Map,fa=[],Db="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function lm(t,e){switch(t){case"focusin":case"focusout":Ea=null;break;case"dragenter":case"dragleave":Ta=null;break;case"mouseover":case"mouseout":Aa=null;break;case"pointerover":case"pointerout":Pn.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":ti.delete(e.pointerId)}}function wn(t,e,a,l,n,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:a,eventSystemFlags:l,nativeEvent:i,targetContainers:[n]},e!==null&&(e=Jl(e),e!==null&&G0(e)),t):(t.eventSystemFlags|=l,e=t.targetContainers,n!==null&&e.indexOf(n)===-1&&e.push(n),t)}function Lb(t,e,a,l,n){switch(e){case"focusin":return Ea=wn(Ea,t,e,a,l,n),!0;case"dragenter":return Ta=wn(Ta,t,e,a,l,n),!0;case"mouseover":return Aa=wn(Aa,t,e,a,l,n),!0;case"pointerover":var i=n.pointerId;return Pn.set(i,wn(Pn.get(i)||null,t,e,a,l,n)),!0;case"gotpointercapture":return i=n.pointerId,ti.set(i,wn(ti.get(i)||null,t,e,a,l,n)),!0}return!1}function X0(t){var e=Sl(t.target);if(e!==null){var a=ei(e);if(a!==null){if(e=a.tag,e===13){if(e=sm(a),e!==null){t.blockedOn=e,Yd(t.priority,function(){am(a)});return}}else if(e===31){if(e=rm(a),e!==null){t.blockedOn=e,Yd(t.priority,function(){am(a)});return}}else if(e===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Oo(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var a=ks(t.nativeEvent);if(a===null){a=t.nativeEvent;var l=new a.constructor(a.type,a);ds=l,a.target.dispatchEvent(l),ds=null}else return e=Jl(a),e!==null&&G0(e),t.blockedOn=a,!1;e.shift()}return!0}function nm(t,e,a){Oo(t)&&a.delete(e)}function Bb(){Ks=!1,Ea!==null&&Oo(Ea)&&(Ea=null),Ta!==null&&Oo(Ta)&&(Ta=null),Aa!==null&&Oo(Aa)&&(Aa=null),Pn.forEach(nm),ti.forEach(nm)}function mo(t,e){t.blockedOn===e&&(t.blockedOn=null,Ks||(Ks=!0,pt.unstable_scheduleCallback(pt.unstable_NormalPriority,Bb)))}var ho=null;function im(t){ho!==t&&(ho=t,pt.unstable_scheduleCallback(pt.unstable_NormalPriority,function(){ho===t&&(ho=null);for(var e=0;e<t.length;e+=3){var a=t[e],l=t[e+1],n=t[e+2];if(typeof l!="function"){if(Gr(l||a)===null)continue;break}var i=Jl(a);i!==null&&(t.splice(e,3),e-=3,zs(i,{pending:!0,data:n,method:a.method,action:l},l,n))}}))}function kl(t){function e(s){return mo(s,t)}Ea!==null&&mo(Ea,t),Ta!==null&&mo(Ta,t),Aa!==null&&mo(Aa,t),Pn.forEach(e),ti.forEach(e);for(var a=0;a<fa.length;a++){var l=fa[a];l.blockedOn===t&&(l.blockedOn=null)}for(;0<fa.length&&(a=fa[0],a.blockedOn===null);)X0(a),a.blockedOn===null&&fa.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(l=0;l<a.length;l+=3){var n=a[l],i=a[l+1],o=n[qt]||null;if(typeof i=="function")o||im(a);else if(o){var u=null;if(i&&i.hasAttribute("formAction")){if(n=i,o=i[qt]||null)u=o.formAction;else if(Gr(n)!==null)continue}else u=o.action;typeof u=="function"?a[l+1]=u:(a.splice(l,3),l-=3),im(a)}}}function Z0(){function t(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(o){return n=o})},focusReset:"manual",scroll:"manual"})}function e(){n!==null&&(n(),n=null),l||setTimeout(a,20)}function a(){if(!l&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,n=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(a,100),function(){l=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),n!==null&&(n(),n=null)}}}function Qr(t){this._internalRoot=t}wu.prototype.render=Qr.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(w(409));var a=e.current,l=Wt();V0(a,l,t,e,null,null)};wu.prototype.unmount=Qr.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;V0(t.current,2,null,t,null,null),vu(),e[Kl]=null}};function wu(t){this._internalRoot=t}wu.prototype.unstable_scheduleHydration=function(t){if(t){var e=wm();t={blockedOn:null,target:t,priority:e};for(var a=0;a<fa.length&&e!==0&&e<fa[a].priority;a++);fa.splice(a,0,t),a===0&&X0(t)}};var om=um.version;if(om!=="19.2.5")throw Error(w(527,om,"19.2.5"));j.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(w(188)):(t=Object.keys(t).join(","),Error(w(268,t)));return t=hv(e),t=t!==null?fm(t):null,t=t===null?null:t.stateNode,t};var Hb={bundleType:0,version:"19.2.5",rendererPackageName:"react-dom",currentDispatcherRef:z,reconcilerVersion:"19.2.5"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(xn=__REACT_DEVTOOLS_GLOBAL_HOOK__,!xn.isDisabled&&xn.supportsFiber))try{ai=xn.inject(Hb),Kt=xn}catch{}var xn;xu.createRoot=function(t,e){if(!cm(t))throw Error(w(299));var a=!1,l="",n=Bh,i=Hh,o=qh;return e!=null&&(e.unstable_strictMode===!0&&(a=!0),e.identifierPrefix!==void 0&&(l=e.identifierPrefix),e.onUncaughtError!==void 0&&(n=e.onUncaughtError),e.onCaughtError!==void 0&&(i=e.onCaughtError),e.onRecoverableError!==void 0&&(o=e.onRecoverableError)),e=Y0(t,1,!1,null,null,a,l,null,n,i,o,Z0),t[Kl]=e.current,Hr(t),new Qr(e)};xu.hydrateRoot=function(t,e,a){if(!cm(t))throw Error(w(299));var l=!1,n="",i=Bh,o=Hh,u=qh,s=null;return a!=null&&(a.unstable_strictMode===!0&&(l=!0),a.identifierPrefix!==void 0&&(n=a.identifierPrefix),a.onUncaughtError!==void 0&&(i=a.onUncaughtError),a.onCaughtError!==void 0&&(o=a.onCaughtError),a.onRecoverableError!==void 0&&(u=a.onRecoverableError),a.formState!==void 0&&(s=a.formState)),e=Y0(t,1,!0,e,a??null,l,n,s,i,o,u,Z0),e.context=j0(null),a=e.current,l=Wt(),l=Is(l),n=ba(l),n.callback=null,Sa(a,n,l),a=l,e.current.lanes=a,ni(e,a),Ne(e),t[Kl]=e.current,Hr(t),new wu(e)};xu.version="19.2.5"});var W0=be((z2,J0)=>{"use strict";function K0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(K0)}catch(t){console.error(t)}}K0(),J0.exports=k0()});var Ug=be(zu=>{"use strict";var rS=Symbol.for("react.transitional.element"),fS=Symbol.for("react.fragment");function Rg(t,e,a){var l=null;if(a!==void 0&&(l=""+a),e.key!==void 0&&(l=""+e.key),"key"in e){a={};for(var n in e)n!=="key"&&(a[n]=e[n])}else a=e;return e=a.ref,{$$typeof:rS,type:t,key:l,ref:e!==void 0?e:null,props:a}}zu.Fragment=fS;zu.jsx=Rg;zu.jsxs=Rg});var ot=be((rw,Dg)=>{"use strict";Dg.exports=Ug()});var c="lookmovie2-enhancer",Vu=`${c}:settings`,Gu=`${c}:watchlist`,Qu=`${c}:movie-watchlist`,Xu=`${c}:playlist`,Hi=`${c}:playlist-session`,qi=`${c}:shows-list-progress`,Zu=`${c}:resume-points`,ku=`${c}:intro-times`,Ku=`${c}:backup-snapshots`,Of=14,Ju=`${c}-style`,Wu=`${c}-site-theme`,Fu=`${c}-ad-bypass-style`,ul=`${c}-fullscreen-style`,Se=`${c}-fullscreen-exit`,S=`${c}-root`,Yi=`${c}:ntfy-active-tab`,Cf=15e3,$f=500,Rf=/^[A-Za-z0-9_-]{1,64}$/,Uf=3600*1e3,Df=1e3,ji=95,Lf=2,Iu=2e3,Bf=30*1e3,Hf=25,qf=10,Yf=8,jf=300,Vt=Object.freeze({autoPlay:!0,autoFullscreen:!0,windowedFullscreen:!0,autoNextEpisode:!0,autoSkipIntro:!0,siteTheme:!0,ntfyRemoteEnabled:!1,ntfyServer:"https://ntfy.sh",ntfyTopic:"",ntfyControlTopic:"",ntfyCommandSecret:""});function et(t){let e=Number.parseInt(String(t),10);return Number.isFinite(e)&&e>0?e:0}async function Vi(t){let e=await fetch(t,{credentials:"same-origin"});if(!e.ok)throw new Error(`Request failed (${e.status})`);return e.text()}async function Gi(t){let e=await fetch(t,{credentials:"same-origin"});if(!e.ok)throw new Error(`Request failed (${e.status})`);return e.json()}function we(t){return t?t.replaceAll("\\'","'").replaceAll("\\\\","\\"):""}function ut(t){let e=typeof t=="string"?t.trim():"";if(!e||e.startsWith("data:image/"))return"";let a=typeof window<"u"&&window.location?window.location.href:"https://www.lookmovie2.to/";try{return new URL(e,a).href}catch{return e.startsWith("//")?`https:${e}`:e}}function la(t){if(!t)return"";let a=(t.getAttribute("style")||"").match(/background-image:\s*url\((['"]?)(.*?)\1\)/i),l=[t.getAttribute("content"),t.getAttribute("data-lazy-background"),t.getAttribute("data-src-portrait"),t.getAttribute("data-background-image"),t.getAttribute("data-src"),a?.[2],t.getAttribute("src")];return ut(l.find(n=>typeof n=="string"&&n.trim()&&!n.trim().startsWith("data:image/"))||"")}function Vf(t){if(!t||typeof t.getBoundingClientRect!="function")return!1;let e=t.getBoundingClientRect();return e.width>0&&e.height>0}function Gf(t){return`${t.textContent||""} ${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.trim()}function Mt(t){if(!t||typeof t!="object")return null;let e=et(t.season),a=et(t.episode),l=et(t.idEpisode||t.id_episode);return!e||!a||!l?null:{season:e,episode:a,idEpisode:l,watchedAt:typeof t.watchedAt=="number"?t.watchedAt:void 0,updatedAt:typeof t.updatedAt=="number"?t.updatedAt:void 0}}function Rt(t){return t?`S${String(t.season).padStart(2,"0")}E${String(t.episode).padStart(2,"0")}`:"Unknown episode"}function xe(t,e){return!t&&!e?0:t?e?t.season!==e.season?t.season-e.season:t.episode!==e.episode?t.episode-e.episode:t.idEpisode-e.idEpisode:1:-1}function Pu(t,e){return!t||!e?!1:t.idEpisode===e.idEpisode&&t.season===e.season&&t.episode===e.episode}function $e(t){return!!t&&Pu(t.latestEpisode,t.lastWatched)}function cl(){return typeof GM_getValue=="function"&&typeof GM_setValue=="function"}function Ba(t){if(cl()){let a=GM_getValue(t,null);if(typeof a=="string")return a}let e=localStorage.getItem(t);return e!==null&&cl()&&GM_setValue(t,e),e}function Re(t,e){cl()&&GM_setValue(t,e);try{e===null?localStorage.removeItem(t):localStorage.setItem(t,e)}catch(a){if(!cl())throw a}}function tc(t){return{autoPlay:typeof t.autoPlay=="boolean"?t.autoPlay:Vt.autoPlay,autoFullscreen:typeof t.autoFullscreen=="boolean"?t.autoFullscreen:Vt.autoFullscreen,windowedFullscreen:typeof t.windowedFullscreen=="boolean"?t.windowedFullscreen:Vt.windowedFullscreen,autoNextEpisode:typeof t.autoNextEpisode=="boolean"?t.autoNextEpisode:Vt.autoNextEpisode,autoSkipIntro:typeof t.autoSkipIntro=="boolean"?t.autoSkipIntro:Vt.autoSkipIntro,siteTheme:typeof t.siteTheme=="boolean"?t.siteTheme:Vt.siteTheme,ntfyRemoteEnabled:typeof t.ntfyRemoteEnabled=="boolean"?t.ntfyRemoteEnabled:Vt.ntfyRemoteEnabled,ntfyServer:typeof t.ntfyServer=="string"&&t.ntfyServer.trim()?t.ntfyServer.trim().replace(/\/+$/,""):Vt.ntfyServer,ntfyTopic:typeof t.ntfyTopic=="string"&&t.ntfyTopic.trim()?t.ntfyTopic.trim():Vt.ntfyTopic,ntfyControlTopic:typeof t.ntfyControlTopic=="string"&&t.ntfyControlTopic.trim()?t.ntfyControlTopic.trim():Vt.ntfyControlTopic,ntfyCommandSecret:typeof t.ntfyCommandSecret=="string"&&t.ntfyCommandSecret.trim()?t.ntfyCommandSecret.trim():Vt.ntfyCommandSecret}}function Xf(){try{let t=Ba(Vu),e=JSON.parse(t||"{}");return tc(e)}catch(t){return console.warn(`[${c}] Failed to load saved settings.`,t),{...Vt}}}function sn(t,e){if(!e||typeof e!="object")return null;let a=typeof t=="string"&&t.trim()?t.trim():"";return a?{slug:a,idShow:et(e.idShow||e.id_show),title:typeof e.title=="string"&&e.title.trim()?e.title.trim():a,year:typeof e.year=="string"||typeof e.year=="number"?String(e.year).trim():"",poster:typeof e.poster=="string"?e.poster:"",addedAt:typeof e.addedAt=="number"?e.addedAt:Date.now(),lastSyncedAt:typeof e.lastSyncedAt=="number"?e.lastSyncedAt:0,lastSyncError:typeof e.lastSyncError=="string"?e.lastSyncError:"",latestEpisode:Mt(e.latestEpisode),lastWatched:Mt(e.lastWatched),upcoming:Xy(e.upcoming)}:null}function Xy(t){if(!t||typeof t!="object"||!Array.isArray(t.episodes))return null;let e=t.episodes.map(Mt).filter(Boolean),a=et(t.total);return{afterIdEpisode:et(t.afterIdEpisode),total:Math.max(a,e.length),episodes:e}}function Zf(){try{let t=JSON.parse(Ba(Gu)||"{}"),e=t&&typeof t=="object"&&t.shows&&typeof t.shows=="object"?t.shows:{},a={};return Object.entries(e).forEach(([l,n])=>{let i=sn(l,n);i&&(a[l]=i)}),{shows:a}}catch(t){return console.warn(`[${c}] Failed to load watchlist.`,t),{shows:{}}}}function rn(t,e){if(!e||typeof e!="object")return null;let a=typeof t=="string"&&t.trim()?t.trim():"";return a?{slug:a,title:typeof e.title=="string"&&e.title.trim()?e.title.trim():a,year:typeof e.year=="string"||typeof e.year=="number"?String(e.year).trim():"",poster:typeof e.poster=="string"?e.poster:"",idMovie:et(e.idMovie||e.id_movie),href:typeof e.href=="string"?e.href:`/movies/view/${a}`,addedAt:typeof e.addedAt=="number"?e.addedAt:Date.now(),watched:!!e.watched,watchedAt:typeof e.watchedAt=="number"?e.watchedAt:void 0}:null}function kf(){try{let t=JSON.parse(Ba(Qu)||"{}"),e=t&&typeof t=="object"&&t.movies&&typeof t.movies=="object"?t.movies:{},a={};return Object.entries(e).forEach(([l,n])=>{let i=rn(l,n);i&&(a[l]=i)}),{movies:a}}catch(t){return console.warn(`[${c}] Failed to load movie watchlist.`,t),{movies:{}}}}function fn(t,e){if(!e||typeof e!="object")return null;let a=typeof e.slug=="string"&&e.slug.trim()?e.slug.trim():typeof t=="string"&&t.trim()?t.split(":")[0].trim():"",l=Mt(e.episode||e.latestEpisode);return!a||!l?null:{key:typeof t=="string"&&t.trim()?t.trim():`${a}:${l.season}:${l.episode}:${l.idEpisode}`,slug:a,idShow:et(e.idShow||e.id_show),title:typeof e.title=="string"&&e.title.trim()?e.title.trim():a,year:typeof e.year=="string"||typeof e.year=="number"?String(e.year).trim():"",poster:typeof e.poster=="string"?e.poster:"",episode:l,addedAt:typeof e.addedAt=="number"?e.addedAt:Date.now()}}function Kf(){try{let t=JSON.parse(Ba(Xu)||"{}"),e=t&&typeof t=="object"&&t.entries&&typeof t.entries=="object"?t.entries:{},a={};return Object.entries(e).forEach(([l,n])=>{let i=fn(l,n);i&&(a[i.key]=i)}),{entries:a}}catch(t){return console.warn(`[${c}] Failed to load playlist.`,t),{entries:{}}}}function Jf(t){return!t||typeof t!="object"?{active:!1,currentKey:"",startedAt:0}:{active:!!t.active,currentKey:typeof t.currentKey=="string"?t.currentKey:"",startedAt:typeof t.startedAt=="number"?t.startedAt:0}}function Wf(){try{return Jf(JSON.parse(Ba(Hi)||"{}"))}catch(t){return console.warn(`[${c}] Failed to load playlist session.`,t),{active:!1,currentKey:"",startedAt:0}}}function Qi(t){if(!t||typeof t!="object")return null;let e=typeof t.slug=="string"&&t.slug.trim()?t.slug.trim():"",a=Mt(t.episode);return!e||!a?null:{slug:e,title:typeof t.title=="string"?t.title:e,href:typeof t.href=="string"?t.href:"",episode:a,seenAt:typeof t.seenAt=="number"?t.seenAt:Date.now(),source:t.source==="manual"?"manual":"auto"}}function Ff(){try{return Qi(JSON.parse(Ba(qi)||"null"))}catch(t){return console.warn(`[${c}] Failed to load shows list progress.`,t),null}}function If(t){try{Re(Vu,JSON.stringify(t))}catch(e){console.warn(`[${c}] Failed to save settings.`,e)}}function Pf(t){try{Re(Gu,JSON.stringify(t)),ad({watchlist:t})}catch(e){console.warn(`[${c}] Failed to save watchlist.`,e)}}function td(t){try{Re(Qu,JSON.stringify(t)),ad({movieWatchlist:t})}catch(e){console.warn(`[${c}] Failed to save movie watchlist.`,e)}}function ec(t){try{Re(Xu,JSON.stringify(t))}catch(e){console.warn(`[${c}] Failed to save playlist.`,e)}}function ed(t){try{let e=Jf(t);if(!e.active){Re(Hi,null);return}Re(Hi,JSON.stringify(e))}catch(e){console.warn(`[${c}] Failed to save playlist session.`,e)}}function ac(t){try{let e=Qi(t);if(!e){Re(qi,null);return}Re(qi,JSON.stringify(e))}catch(e){console.warn(`[${c}] Failed to save shows list progress.`,e)}}function Qf(t,e){return t&&t[e]&&typeof t[e]=="object"?Object.keys(t[e]).length:0}function Zy(t=new Date){let e=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${a}`}function Xi(){if(!cl())return[];try{let t=JSON.parse(GM_getValue(Ku,null)||"[]");return Array.isArray(t)?t.filter(e=>e&&typeof e.date=="string"):[]}catch(t){return console.warn(`[${c}] Failed to load backup snapshots.`,t),[]}}function ad(t){if(cl())try{if(t.watchlist&&!Qf(t.watchlist,"shows")||t.movieWatchlist&&!Qf(t.movieWatchlist,"movies"))return;let e=Zy(),a=Xi(),l=a.find(o=>o.date===e)||a[0]||{},i=[{watchlist:l.watchlist||{shows:{}},movieWatchlist:l.movieWatchlist||{movies:{}},...t,date:e,savedAt:Date.now()},...a.filter(o=>o.date!==e)].sort((o,u)=>u.date.localeCompare(o.date)).slice(0,Of);GM_setValue(Ku,JSON.stringify(i))}catch(e){console.warn(`[${c}] Failed to save backup snapshot.`,e)}}function ld(t,e){try{let a=JSON.parse(Ba(t)||"null");return a&&typeof a=="object"?a:e}catch(a){return console.warn(`[${c}] Failed to load ${t}.`,a),e}}function nd(t,e){try{Re(t,JSON.stringify(e))}catch(a){console.warn(`[${c}] Failed to save ${t}.`,a)}}function lc(t){if(!t||typeof t!="object")return null;let e=Number(t.progress??t.currentTime),a=Number(t.duration);return!Number.isFinite(e)||!Number.isFinite(a)||e<0||a<=0?null:{progress:e,duration:a,savedAt:typeof t.savedAt=="number"?t.savedAt:Date.now()}}function id(){let t={};return Object.entries(ld(Zu,{})).forEach(([e,a])=>{let l=lc(a);l&&(t[e]=l)}),t}function od(t){nd(Zu,t)}function ky(t){if(!t||typeof t!="object")return null;let e=Number(t.start),a=Number(t.end);return!Number.isFinite(e)||!Number.isFinite(a)||e<0||a<=e?null:{start:e,end:a,updatedAt:typeof t.updatedAt=="number"?t.updatedAt:Date.now()}}function ud(){let t={};return Object.entries(ld(ku,{})).forEach(([e,a])=>{let l=ky(a);l&&(t[e]=l)}),t}function nc(t){nd(ku,t)}var d={settings:Xf(),watchlistStore:Zf(),movieWatchlistStore:kf(),playlistStore:Kf(),playlistSession:Wf(),showsListProgress:Ff(),showsListProgressOrder:-1,showsListSeenCandidate:null,showsListSeenCandidateOrder:-1,showsListSessionTouched:!1,showsListManualMarkerSet:!1,showsListObserver:null,showsListMutationObserver:null,showsListRefreshScheduled:!1,showsListObservedCards:new WeakSet,domBootstrapped:!1,uiBootAttempts:0,fullscreenTriggered:!1,lastKnownUrl:location.href,watchlistRefreshPromise:null,watchlistBusy:!1,watchlistMessage:"",watchlistMessageTone:"muted",lastTrackedEpisodeSignature:"",ntfyRemoteStatus:"disabled",ntfyRemoteMessage:"",ntfyLastNotificationAt:0,ntfyRemoteTabId:`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`,ntfyRemoteClaimTimer:0};var sy=k(W0());var Xr=new Set;function F0(t){return Xr.add(t),()=>Xr.delete(t)}function en(){Xr.forEach(t=>t())}function I0(){return`
        @keyframes ${c}-rainbow-border {
            to {
                --${c}-rainbow-angle: 360deg;
            }
        }

        @property --${c}-rainbow-angle {
            syntax: '<angle>';
            initial-value: 0deg;
            inherits: false;
        }

        #${S}-launcher-host {
            display: flex;
            align-items: center;
            flex: 0 0 auto;
            margin: 0;
            padding: 0;
            position: relative;
            z-index: 20;
        }

        #${S} > #${S}-launcher {
            position: absolute;
            top: 14px;
            right: 14px;
            z-index: 2147483647;
        }

        #${S} > #${S}-launcher[data-scrolled="true"] {
            position: fixed;
            top: 18px;
            right: 18px;
        }

        #${S}-launcher-host #${S}-launcher {
            position: relative;
            right: auto;
            bottom: auto;
            z-index: auto;
        }

        #${S}-launcher {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding-bottom: 14px;
            margin-bottom: -14px;
        }

        #${S}-button {
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

        #${S}-button::before {
            --${c}-rainbow-angle: 0deg;
            content: '';
            position: absolute;
            inset: -70%;
            z-index: -2;
            background: conic-gradient(
                from var(--${c}-rainbow-angle),
                #ff2d95,
                #ff7a18,
                #ffd60a,
                #24f2a6,
                #00c2ff,
                #7c3cff,
                #ff2d95
            );
            animation: ${c}-rainbow-border 10s linear infinite;
        }

        #${S}-button::after {
            content: '';
            position: absolute;
            inset: 2px;
            z-index: -1;
            border-radius: inherit;
            background: #13283c;
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
        }

        #${S}-launcher[data-hosted="false"] #${S}-button {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            padding: 0;
            box-shadow:
                0 10px 26px rgba(0, 0, 0, 0.26),
                0 0 20px rgba(255, 45, 149, 0.26),
                0 0 26px rgba(0, 194, 255, 0.18);
        }

        #${S}-button:hover {
            color: #abb7c4;
            box-shadow:
                0 0 0 1px rgba(255, 255, 255, 0.18),
                0 0 18px rgba(255, 255, 255, 0.12);
        }

        #${S}-button:hover::before {
            background: #ffffff;
            animation-play-state: paused;
        }

        #${S}-button-icon {
            display: none;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 1;
        }

        #${S}-button-icon svg {
            width: 18px;
            height: 18px;
            fill: currentColor;
        }

        #${S}-launcher[data-hosted="false"] #${S}-button-icon {
            display: inline-flex;
        }

        #${S}-button-label {
            display: inline-flex;
            align-items: center;
            position: relative;
            z-index: 1;
            white-space: nowrap;
        }

        #${S}-launcher[data-hosted="false"] #${S}-button-label {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip: rect(0 0 0 0);
            white-space: nowrap;
        }

        #${S}-quick-settings {
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

        #${S}-quick-settings::before {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            top: -10px;
            height: 10px;
        }

        #${S}-launcher:hover #${S}-quick-settings,
        #${S}-launcher:focus-within #${S}-quick-settings,
        #${S}-launcher[data-quick-open="true"] #${S}-quick-settings {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
        }

        .${c}-quick-setting {
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

        .${c}-quick-setting:hover {
            border-color: rgba(226, 232, 240, 0.45);
        }

        .${c}-quick-setting[data-enabled="true"] {
            border-color: rgba(186, 230, 253, 0.72);
            background: rgba(14, 116, 144, 0.34);
            color: #bae6fd;
            box-shadow: 0 0 16px rgba(186, 230, 253, 0.16);
        }

        .${c}-quick-setting svg {
            width: 17px;
            height: 17px;
            fill: currentColor;
        }

        #${S}-overlay {
            position: fixed;
            inset: 0;
            z-index: 2147483647;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: rgba(5, 10, 20, 0.65);
        }

        #${S}-overlay.${c}-open {
            display: flex;
        }

        #${S}-modal {
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

        #${S}-modal * {
            scrollbar-color: rgba(125, 211, 252, 0.58) rgba(15, 23, 42, 0.72);
            scrollbar-width: thin;
        }

        #${S}-modal *::-webkit-scrollbar {
            width: 10px;
            height: 10px;
        }

        #${S}-modal *::-webkit-scrollbar-track {
            border-radius: 999px;
            background: rgba(15, 23, 42, 0.72);
        }

        #${S}-modal *::-webkit-scrollbar-thumb {
            border: 2px solid rgba(15, 23, 42, 0.72);
            border-radius: 999px;
            background:
                linear-gradient(180deg, rgba(216, 180, 254, 0.82), rgba(125, 211, 252, 0.82), rgba(187, 247, 208, 0.82));
            background-clip: padding-box;
        }

        #${S}-modal *::-webkit-scrollbar-thumb:hover {
            background:
                linear-gradient(180deg, rgba(244, 194, 194, 0.95), rgba(125, 211, 252, 0.95), rgba(253, 230, 138, 0.95));
            background-clip: padding-box;
        }

        #${S}-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 12px;
            padding: 18px 18px 10px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.12);
        }

        #${S}-title {
            margin: 0;
            font-size: 18px;
            font-weight: 700;
        }

        #${S}-subtitle {
            margin: 6px 0 0;
            color: #94a3b8;
            font-size: 13px;
            line-height: 1.45;
        }

        #${S}-close {
            border: 0;
            background: transparent;
            color: #cbd5e1;
            font-size: 22px;
            line-height: 1;
            cursor: pointer;
        }

        #${S}-content {
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 20px;
            flex: 1;
            min-height: 0;
            overflow: hidden;
        }

        #${S}-settings-panel {
            display: flex;
            flex-direction: column;
            min-width: 0;
            min-height: 0;
            border-bottom: 1px solid rgba(148, 163, 184, 0.12);
            padding-bottom: 18px;
        }

        #${S}-watchlist-panel {
            display: flex;
            flex-direction: column;
            min-width: 0;
            min-height: 0;
            overflow: hidden;
        }

        @media (min-width: 980px) {
            #${S}-content {
                display: grid;
                grid-template-columns: 280px minmax(0, 1fr);
                gap: 24px;
            }

            #${S}-settings-panel {
                border-bottom: none;
                border-right: 1px solid rgba(148, 163, 184, 0.12);
                padding-bottom: 0;
                padding-right: 14px;
                overflow-y: auto;
                scrollbar-width: thin;
            }
        }

        #${S}-settings-title,
        #${S}-watchlist-title,
        #${S}-playlist-title {
            margin: 0 0 12px;
            color: #f8fafc;
            font-size: 15px;
            font-weight: 700;
        }

        #${S}-settings {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            gap: 12px;
        }

        .${c}-setting {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 12px;
            align-items: center;
            padding: 14px;
            border: 1px solid rgba(148, 163, 184, 0.18);
            border-radius: 14px;
            background: rgba(15, 23, 42, 0.7);
        }

        .${c}-setting-stack {
            grid-template-columns: minmax(0, 1fr);
            align-items: stretch;
        }

        .${c}-setting-main {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            min-width: 0;
        }

        .${c}-setting-icon {
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

        .${c}-setting-icon svg {
            width: 18px;
            height: 18px;
            fill: currentColor;
        }

        .${c}-setting-title {
            margin: 0;
            color: #f8fafc;
            font-size: 14px;
            font-weight: 700;
        }

        .${c}-setting-copy {
            margin: 4px 0 0;
            color: #94a3b8;
            font-size: 12px;
            line-height: 1.45;
        }

        .${c}-switch {
            position: relative;
            display: inline-block;
            width: 52px;
            height: 30px;
        }

        .${c}-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .${c}-slider {
            position: absolute;
            inset: 0;
            border-radius: 999px;
            background: #334155;
            transition: background 0.18s ease;
        }

        .${c}-slider::before {
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

        .${c}-switch input:checked + .${c}-slider {
            background: #2563eb;
        }

        .${c}-switch input:checked + .${c}-slider::before {
            transform: translateX(22px);
        }

        .${c}-field {
            display: grid;
            gap: 5px;
            min-width: 0;
        }

        .${c}-field span {
            color: #cbd5e1;
            font-size: 11px;
            font-weight: 700;
        }

        .${c}-field input,
        .${c}-field select {
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

        .${c}-field input::placeholder {
            color: #64748b;
        }

        .${c}-field input:focus,
        .${c}-field select:focus {
            outline: none;
            border-color: rgba(125, 211, 252, 0.72);
            box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.18);
        }

        .${c}-backup-actions {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-end;
            gap: 8px;
        }

        .${c}-backup-actions .${c}-field {
            flex: 1 1 180px;
        }

        /* The site's input styles override the hidden attribute. */
        .${c}-file-input {
            display: none !important;
        }

        .${c}-backup-actions .${c}-button {
            padding: 8px 12px;
        }

        .${c}-ntfy-status {
            margin: 0;
            color: #94a3b8;
            font-size: 12px;
            line-height: 1.45;
        }

        .${c}-ntfy-status[data-status="connected"] {
            color: #86efac;
        }

        .${c}-ntfy-status[data-status="connecting"] {
            color: #fde68a;
        }

        .${c}-ntfy-status[data-status="error"] {
            color: #fda4af;
        }

        .${c}-accordion {
            display: flex;
            flex-direction: column;
            gap: 10px;
            min-height: 0;
            flex: 1;
        }

        .${c}-accordion-trigger {
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

        .${c}-accordion-trigger[data-open="true"] {
            border-color: rgba(96, 165, 250, 0.42);
            background: rgba(30, 41, 59, 0.92);
        }

        .${c}-accordion-trigger span {
            display: grid;
            gap: 3px;
            min-width: 0;
        }

        .${c}-accordion-trigger strong {
            font: 800 13px/1.2 Arial, sans-serif;
        }

        .${c}-accordion-trigger small {
            color: #94a3b8;
            font: 12px/1.35 Arial, sans-serif;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .${c}-accordion-trigger em {
            min-width: 24px;
            border-radius: 999px;
            padding: 4px 7px;
            background: rgba(37, 99, 235, 0.72);
            color: #eff6ff;
            font: 800 11px/1 Arial, sans-serif;
            text-align: center;
            font-style: normal;
        }

        .${c}-accordion-panel {
            display: flex;
            flex-direction: column;
            min-height: 0;
            flex: 1;
        }

        #${S}-watchlist-toolbar,
        #${S}-playlist-toolbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 14px;
            padding-bottom: 12px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.12);
            flex: 0 0 auto;
        }

        .${c}-watchlist-toolbar-actions {
            display: inline-flex;
            align-items: center;
            justify-content: flex-end;
            flex-wrap: wrap;
            gap: 8px;
        }

        .${c}-view-toggle {
            min-width: 0;
        }

        .${c}-toolbar-icon-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 34px;
            height: 34px;
            padding: 0;
        }

        .${c}-toolbar-icon-button svg {
            width: 17px;
            height: 17px;
            fill: currentColor;
        }

        .${c}-tabs {
            display: inline-flex;
            gap: 4px;
            margin: 0 0 8px;
            padding: 3px;
            border: 1px solid rgba(148, 163, 184, 0.18);
            border-radius: 999px;
            background: rgba(15, 23, 42, 0.7);
        }

        .${c}-tab {
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

        .${c}-tab[data-active="true"] {
            background: rgba(37, 99, 235, 0.88);
            color: #eff6ff;
        }

        .${c}-tab span {
            min-width: 18px;
            padding: 2px 6px;
            border-radius: 999px;
            background: rgba(249, 115, 22, 0.92);
            color: #fff7ed;
            font-size: 10px;
            text-align: center;
        }

        #${S}-watchlist-status {
            min-height: 18px;
            margin-bottom: 10px;
            font-size: 12px;
            line-height: 1.45;
            flex: 0 0 auto;
        }

        #${S}-watchlist-status[data-tone="success"] {
            color: #86efac;
        }

        #${S}-watchlist-status[data-tone="danger"] {
            color: #fda4af;
        }

        #${S}-watchlist-status[data-tone="muted"] {
            color: #94a3b8;
        }

        #${S}-watchlist-list,
        #${S}-playlist-list {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            grid-auto-rows: max-content;
            align-items: start;
            align-content: start;
            gap: 14px;
            flex: 1;
            min-height: 0;
            overflow-y: auto;
            overflow-x: hidden;
            padding-right: 8px;
        }

        #${S}-watchlist-list[data-view="list"],
        #${S}-playlist-list[data-view="list"] {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .${c}-watch-empty {
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

        .${c}-watch-item {
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

        .${c}-watch-item[data-view="list"] {
            display: grid;
            grid-template-columns: 74px minmax(0, 1fr);
            gap: 0;
            min-height: 112px;
            border-radius: 10px;
        }

        .${c}-watch-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .${c}-watch-item[data-state="new"] {
            border-color: rgba(249, 115, 22, 0.55);
            box-shadow: 0 0 0 1px rgba(249, 115, 22, 0.18);
        }

        .${c}-watch-item[data-playlist-active="true"] {
            border-color: rgba(96, 165, 250, 0.72);
            box-shadow: 0 0 0 1px rgba(96, 165, 250, 0.28), 0 8px 24px rgba(37, 99, 235, 0.18);
        }

        .${c}-watch-item[data-state="new"]:hover {
            box-shadow: 0 8px 24px rgba(249, 115, 22, 0.15);
        }

        .${c}-watch-item-poster {
            position: relative;
            width: 100%;
            aspect-ratio: 2 / 3;
            overflow: hidden;
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.8));
        }

        .${c}-watch-item[data-view="list"] .${c}-watch-item-poster {
            width: 74px;
            height: 112px;
            aspect-ratio: auto;
            flex: 0 0 auto;
        }

        .${c}-watch-item-poster img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .${c}-watch-poster-link {
            display: block;
            width: 100%;
            height: 100%;
            color: inherit;
            text-decoration: none;
        }

        .${c}-watch-item-poster-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #64748b;
            font-size: 40px;
            font-weight: 700;
        }

        .${c}-watch-item-poster-overlay {
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

        .${c}-watch-item[data-view="list"] .${c}-watch-item-poster-overlay {
            display: none;
        }

        .${c}-watch-item-body {
            padding: 11px 10px 10px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            flex: 1;
            min-height: 82px;
        }

        .${c}-watch-item[data-view="list"] .${c}-watch-item-body {
            min-height: 0;
            padding: 10px 12px;
        }

        .${c}-watch-item-title {
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

        .${c}-watch-item-copy {
            margin: 3px 0 0;
            color: #94a3b8;
            font-size: 11px;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .${c}-watch-action {
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

        .${c}-watch-action:hover {
            filter: brightness(1.12);
            transform: translateY(-1px);
        }

        .${c}-watch-action small {
            margin-left: auto;
            color: rgba(248, 250, 252, 0.82);
            font-size: 10px;
            font-weight: 600;
        }

        .${c}-watch-item[data-view="list"] .${c}-watch-action {
            align-self: flex-start;
            margin-top: 0;
        }

        .${c}-search {
            position: relative;
            margin: 0 0 12px;
        }

        .${c}-search input {
            width: 100%;
            box-sizing: border-box;
            border: 1px solid rgba(148, 163, 184, 0.22);
            border-radius: 10px;
            padding: 10px 12px;
            background: rgba(2, 6, 23, 0.58);
            color: #f8fafc;
            font: 13px/1.35 Arial, sans-serif;
        }

        .${c}-search input:focus {
            outline: none;
            border-color: rgba(125, 211, 252, 0.72);
            box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.18);
        }

        .${c}-search-status {
            margin: 6px 2px 0;
            color: #94a3b8;
            font: 12px/1.4 Arial, sans-serif;
        }

        .${c}-search-results {
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

        .${c}-search-results li {
            display: grid;
            grid-template-columns: 40px minmax(0, 1fr) auto;
            align-items: center;
            gap: 10px;
            padding: 6px;
            border-radius: 8px;
        }

        .${c}-search-results li:hover {
            background: rgba(30, 41, 59, 0.8);
        }

        .${c}-search-results img,
        .${c}-search-results li > span {
            width: 40px;
            height: 60px;
            border-radius: 6px;
            object-fit: cover;
            background: #1e293b;
        }

        .${c}-search-results strong {
            display: block;
            color: #f8fafc;
            font: 700 13px/1.3 Arial, sans-serif;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .${c}-search-results small {
            color: #94a3b8;
            font: 11px/1.4 Arial, sans-serif;
        }

        .${c}-autonext {
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

        .${c}-autonext p {
            margin: 0;
        }

        .${c}-autonext button,
        .${c}-intro button,
        .${c}-intro-pill {
            border: 1px solid rgba(255, 255, 255, 0.24);
            border-radius: 999px;
            padding: 7px 12px;
            background: rgba(15, 23, 42, 0.9);
            color: #f8fafc;
            font: 700 12px/1 Arial, sans-serif;
            cursor: pointer;
        }

        .${c}-autonext .${c}-autonext-play,
        .${c}-intro .${c}-intro-skip {
            border-color: transparent;
            background: #f8fafc;
            color: #020617;
        }

        .${c}-intro {
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

        .${c}-intro > *,
        .${c}-intro-manage > * {
            pointer-events: auto;
        }

        .${c}-intro .${c}-intro-skip {
            padding: 10px 18px;
            font-size: 14px;
            box-shadow: 0 10px 26px rgba(0, 0, 0, 0.45);
        }

        .${c}-intro-manage {
            display: flex;
            gap: 6px;
            transition: opacity 0.2s ease;
        }

        .${c}-intro-pill {
            cursor: default;
            opacity: 0.9;
        }

        button.${c}-intro-pill {
            cursor: pointer;
        }

        /* Mirror the player's own controls: tuck the manage pills away while playing idle. */
        .vjs-user-inactive.vjs-playing .${c}-intro-manage {
            opacity: 0;
            pointer-events: none;
        }

        .${c}-intro-toast {
            margin: 0;
            padding: 6px 10px;
            border-radius: 8px;
            background: rgba(2, 6, 23, 0.86);
            color: #f8fafc;
            font: 12px/1.3 Arial, sans-serif;
        }

        .${c}-intro [hidden],
        .${c}-intro-toast[hidden] {
            display: none !important;
        }

        .${c}-watch-badge {
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

        .${c}-watch-badge[data-state="new"] {
            background: rgba(249, 115, 22, 0.18);
            color: #fdba74;
        }

        .${c}-watch-badge[data-state="watched"] {
            background: rgba(34, 197, 94, 0.18);
            color: #86efac;
        }

        .${c}-watch-badge[data-state="pending"] {
            background: rgba(148, 163, 184, 0.18);
            color: #cbd5e1;
        }

        .${c}-watch-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: auto;
        }

        .${c}-poster-icon-button {
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

        .${c}-poster-check-button {
            left: 8px;
            color: #bbf7d0;
        }

        .${c}-poster-playlist-button {
            left: 50%;
            transform: translate(-50%, -3px);
            color: #bfdbfe;
        }

        .${c}-poster-remove-button {
            right: 8px;
            color: #fecdd3;
        }

        .${c}-watch-item:hover .${c}-poster-icon-button,
        .${c}-watch-item:focus-within .${c}-poster-icon-button {
            opacity: 1;
            transform: translateY(0);
        }

        .${c}-watch-item:hover .${c}-poster-playlist-button,
        .${c}-watch-item:focus-within .${c}-poster-playlist-button {
            transform: translate(-50%, 0);
        }

        .${c}-poster-check-button:hover {
            border-color: rgba(134, 239, 172, 0.72);
            background: rgba(22, 101, 52, 0.92);
        }

        .${c}-poster-remove-button:hover {
            border-color: rgba(251, 113, 133, 0.72);
            background: rgba(127, 29, 29, 0.92);
        }

        .${c}-poster-playlist-button:hover {
            border-color: rgba(147, 197, 253, 0.72);
            background: rgba(30, 64, 175, 0.92);
        }

        .${c}-poster-icon-button[disabled] {
            cursor: not-allowed;
            opacity: 0;
        }

        .${c}-poster-icon-button svg {
            width: 16px;
            height: 16px;
            fill: currentColor;
        }

        .${c}-playlist-play-button[data-active="true"] {
            border-color: rgba(251, 113, 133, 0.64);
            color: #fecdd3;
        }

        .${c}-watch-item[data-view="list"] .${c}-poster-icon-button {
            top: 6px;
            width: 20px;
            height: 20px;
            font-size: 13px;
        }

        .${c}-watch-item[data-view="list"] .${c}-poster-icon-button svg {
            width: 12px;
            height: 12px;
        }

        .${c}-watch-item[data-view="list"] .${c}-poster-check-button {
            left: 5px;
        }

        .${c}-watch-item[data-view="list"] .${c}-poster-remove-button {
            right: 5px;
        }

        .${c}-button,
        .${c}-link-button {
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

        .${c}-open-link {
            font-size: 11px;
            padding: 6px 10px;
        }

        .${c}-button:hover,
        .${c}-link-button:hover {
            border-color: rgba(96, 165, 250, 0.65);
            color: #f8fafc;
        }

        .${c}-button[disabled] {
            cursor: wait;
            opacity: 0.65;
        }

        .${c}-danger-button:hover {
            border-color: rgba(251, 113, 133, 0.7);
        }

        #${S}-footer {
            margin-top: auto;
            padding-top: 16px;
            color: #94a3b8;
            font: 12px/1.45 Arial, sans-serif;
            overflow-wrap: anywhere;
        }

        .${c}-episode-watch-button {
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

        .${c}-episode-watch-button[data-state="watching"] {
            background: rgba(30, 64, 175, 0.92);
            color: #dbeafe;
        }

        .${c}-episode-watch-button[data-state="watching-new"] {
            background: rgba(194, 65, 12, 0.95);
            color: #ffedd5;
        }

        .${c}-episode-watch-button[data-state="adding"] {
            cursor: wait;
            opacity: 0.8;
        }

        .${c}-shows-list-marker-button {
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

        .episode-item:hover .${c}-shows-list-marker-button,
        .episode-item:focus-within .${c}-shows-list-marker-button {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
        }

        .${c}-shows-list-marker-button:hover,
        .${c}-shows-list-marker-button[data-state="current"] {
            background: rgba(202, 138, 4, 0.96);
            color: #fef9c3;
        }

        .episode-item.${c}-shows-list-marker img {
            outline: 4px solid #facc15 !important;
            outline-offset: -4px;
            border-radius: 6px;
            box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.5), 0 0 22px rgba(250, 204, 21, 0.7);
        }

        .episode-item.${c}-shows-list-marker {
            filter: drop-shadow(0 0 16px rgba(250, 204, 21, 0.45));
        }

        .${c}-show-view-watch-wrap {
            margin-top: 14px;
        }

        .${c}-show-view-watch-button {
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

        .${c}-show-view-watch-button:hover {
            transform: translateY(-1px);
            border-color: rgba(96, 165, 250, 0.65);
        }

        .${c}-show-view-watch-button[data-state="watching"] {
            background: rgba(30, 64, 175, 0.92);
            color: #dbeafe;
        }

        .${c}-show-view-watch-button[data-state="watching-new"] {
            background: rgba(194, 65, 12, 0.95);
            color: #ffedd5;
        }

        .${c}-show-view-watch-button[data-state="adding"] {
            cursor: wait;
            opacity: 0.8;
        }

        @media (max-width: 1400px) {
            #${S}-watchlist-list,
            #${S}-playlist-list {
                grid-template-columns: repeat(5, 1fr);
            }
        }

        @media (max-width: 1100px) {
            #${S}-watchlist-list,
            #${S}-playlist-list {
                grid-template-columns: repeat(4, 1fr);
            }
        }

        @media (max-width: 850px) {
            #${S}-content {
                display: flex;
                flex-direction: column;
            }

            #${S}-settings-panel {
                border-bottom: 1px solid rgba(148, 163, 184, 0.12);
                border-right: none;
                padding-bottom: 16px;
                padding-right: 0;
            }

            #${S}-watchlist-list,
            #${S}-playlist-list {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (max-width: 640px) {
            #${S}-watchlist-list,
            #${S}-playlist-list {
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
            }

            #${S}-modal {
                width: 100vw;
                height: 100vh;
                border-radius: 0;
            }
        }
    `}var jt=k(Ha()),uy=k(Sc());var Ct=null,P0="",mi=0,tg=0,eg=!1,Eu=new Map;function ge(t,e=""){d.ntfyRemoteStatus=t,d.ntfyRemoteMessage=e,en()}function hi(t){return String(t||"").trim().replace(/^\/+|\/+$/g,"")}function kr(t){return Rf.test(hi(t))}function ag(t,e){let a=hi(t);return a?a.length>64?`${e} topic must be 64 characters or fewer.`:`${e} topic can only use letters, numbers, hyphens, and underscores.`:`${e} topic is required.`}function Fr(){return document.visibilityState!=="hidden"}function ng(){try{let t=JSON.parse(localStorage.getItem(Yi)||"null");return t&&typeof t=="object"?t:null}catch{return null}}function ig(){try{localStorage.setItem(Yi,JSON.stringify({tabId:d.ntfyRemoteTabId,href:location.href,title:rg(),updatedAt:Date.now()}))}catch(t){console.warn(`[${c}] Failed to claim ntfy remote tab.`,t)}}function qb(){let t=ng();!t||t.tabId!==d.ntfyRemoteTabId||localStorage.removeItem(Yi)}function og(){let t=ng();return!t||!t.tabId||t.tabId===d.ntfyRemoteTabId?!0:Date.now()-Number(t.updatedAt||0)>Cf}function Kr(t="activity"){return!d.settings.ntfyRemoteEnabled||!Fr()||!ye()?!1:(ig(),ge("connected",`This tab controls Android remote (${t}).`),!0)}function Yb(){d.settings.ntfyRemoteEnabled&&og()&&Fr()&&ye()&&ig()}function Jr(){qb()}function Tu(){let t=hi(d.settings.ntfyControlTopic);if(t)return t;let e=hi(d.settings.ntfyTopic);return e?`${e}-controls`:""}function ug(){let t=cg(),e=Tu();return kr(t)?kr(e)?"":ag(e,"Control"):ag(t,"Display")}function jb(){let t=String(d.settings.ntfyServer||"https://ntfy.sh").replace(/\/+$/,""),e=Tu();if(!t||!e||!kr(e))return"";let a=new URL(`${t}/${encodeURIComponent(e)}/sse`);return a.searchParams.set("since",String(Math.floor(Date.now()/1e3))),a.toString()}function cg(){return hi(d.settings.ntfyTopic)}function sg(t){return`${String(d.settings.ntfyServer||"https://ntfy.sh").replace(/\/+$/,"")}/${encodeURIComponent(t)}`}function Vb(){return String(d.settings.ntfyServer||"https://ntfy.sh").replace(/\/+$/,"")}function Gb(t){let e=String(d.settings.ntfyCommandSecret||"").trim();return e?`${e} ${t}`:t}function pi(t,e){let a=Tu();return{action:"http",label:t,url:sg(a),method:"POST",body:Gb(e),clear:!1}}function Ir(){return location.pathname.startsWith("/shows/play/")}function Qb(){if(Pr())return!0;let t=window.movie_storage||window.movie||{};return!Ir()&&!!(t.id_movie||t.title||t.slug)}function Xb(){let t=[pi("Play/Pause","toggle"),pi("Fullscreen","fullscreen")];return Ir()?t.push(pi("Next","next")):Qb()?t.push(pi("-30s","seek -30")):t.push(pi("+30s","seek 30")),t}function Zr(t,e){let a=String(t||"").replace(/\s+/g," ").trim(),l=typeof e=="string"||typeof e=="number"?String(e).trim():"";if(!a)return"";if(/ \(\d{4}\)$/.test(a))return a;let n=a.match(/^(.*?)(\d{4})$/);return n&&n[1].trim()?`${n[1].trim()} (${n[2]})`:l&&!a.endsWith(`(${l})`)?`${a} (${l})`:a}function rg(){let t=window.show_storage||window.show||{},e=window.movie_storage||window.movie||{},a=typeof t.title=="string"&&t.title.trim()?Zr(t.title,t.year):typeof e.title=="string"&&e.title.trim()?Zr(e.title,e.year):"";if(a)return a;let l=document.querySelector("h1")?.textContent||document.querySelector(".movie-title, .film-title, .show-title")?.textContent||document.title||"LookMovie2";return Zr(l)||"LookMovie2"}function Zb(){let t=location.hash.match(/^#S(\d+)-E(\d+)-(\d+)$/i);return t?`S${String(t[1]).padStart(2,"0")}E${String(t[2]).padStart(2,"0")}`:""}function fg(){let t=window.show_storage||window.show||{},e=Number(window.id_show||t.id_show||t.idShow||0),a=Object.values(d.watchlistStore.shows||{});if(e){let n=a.find(i=>i.idShow===e);if(n)return n}let l=String(t.slug||"").trim();return l&&d.watchlistStore.shows[l]||null}function kb(){let t=window.show_storage||window.show||{},e=fg(),a=location.pathname.match(/\/shows\/view\/([^/?#]+)/i),n=document.querySelector('a[href*="/shows/view/"]')?.getAttribute("href")?.match(/\/shows\/view\/([^/?#]+)/i);return String(t.slug||"").trim()||String(t.seo_url||"").trim()||String(e?.slug||"").trim()||(a?a[1]:"")||(n?n[1]:"")}function Kb(t){return t?Eu.has(t)?Promise.resolve(Eu.get(t)||""):fetch(`/shows/view/${encodeURIComponent(t)}`,{credentials:"same-origin"}).then(e=>{if(!e.ok)throw new Error(`Show poster request failed with HTTP ${e.status}`);return e.text()}).then(e=>{let a=e.match(/poster_medium:\s*'((?:\\'|[^'])*)'/),l=ut(a?we(a[1]):"");return Eu.set(t,l),l}).catch(e=>(console.warn(`[${c}] Could not resolve show poster for ntfy attachment.`,e),Eu.set(t,""),"")):Promise.resolve("")}function Jb(){let t=ye(),e=window.movie_storage||window.movie||{},a=window.show_storage||window.show||{},l=fg(),n=document.querySelector(['meta[property="og:image"]',".movie__poster[data-background-image]",'.movie__poster[style*="background-image"]',".movie-single-ct img[data-src]",".movie-single-ct img[src]",".internal-page-container img[data-src]",".internal-page-container img[src]","[data-background-image]",'[style*="background-image"]',"img[data-src-portrait]","img[data-src]"].join(", "));return ut(t?.getAttribute("poster"))||ut(e.movie_poster)||ut(e.poster_medium)||ut(a.poster_medium)||ut(a.poster_large)||ut(a.poster_original)||ut(a.poster)||ut(l?.poster)||la(n)}function Wb(){let t=Jb();return t||!Ir()?Promise.resolve(t):Kb(kb())}function Fb(t,e,a="POST"){let l=JSON.stringify(e),n={"Content-Type":"application/json"};return fetch(t,{method:a,body:l,headers:n}).then(i=>{if(!i.ok)throw new Error(`ntfy request failed with HTTP ${i.status}`);return i}).catch(i=>{if(typeof GM_xmlhttpRequest!="function")throw i;return new Promise((o,u)=>{GM_xmlhttpRequest({method:a,url:t,data:l,headers:n,onload(s){if(s.status>=200&&s.status<300){o(s);return}u(new Error(`ntfy request failed with HTTP ${s.status}`))},onerror:u})})})}function Ib(t,e,a,l="POST"){return fetch(t,{method:l,body:e,headers:a}).then(n=>{if(!n.ok)throw new Error(`ntfy request failed with HTTP ${n.status}`);return n})}function Pb(t){return t?fetch(t,{credentials:"omit",referrerPolicy:"no-referrer"}).then(e=>{if(!e.ok)throw new Error(`Poster request failed with HTTP ${e.status}`);return e.blob()}).then(e=>!e||!e.size||e.size>15*1024*1024?null:e).catch(e=>(console.warn(`[${c}] Could not fetch poster for ntfy attachment.`,e),null)):Promise.resolve(null)}function tS(t,e,a){let l={Title:t.title,Message:t.message,Priority:String(t.priority),Tags:Array.isArray(t.tags)?t.tags.join(","):"",Click:t.click,Actions:JSON.stringify(t.actions||[]),"X-Sequence-ID":t.sequence_id};return e&&(l.Filename=e),a&&(l["Content-Type"]=a),Object.keys(l).forEach(n=>{l[n]||delete l[n]}),l}function eS(t,e,a){return Pb(a).then(l=>l?Ib(sg(t),l,tS(e,"lookmovie-poster.jpg",l.type||"image/jpeg")):Fb(Vb(),e))}function gi(t="update"){if(!d.settings.ntfyRemoteEnabled||!Kr(t))return!1;let e=cg(),a=Tu();if(!e||!a||ug())return!1;let l=ye();if(!l)return!1;let n=l.paused,i=rg(),o=Zb(),u={topic:e,title:n?"Paused on LookMovie2":"Playing on LookMovie2",message:o?`${i} - ${o}`:i,tags:["tv"],priority:3,sequence_id:`${c}-player`,click:location.href,actions:Xb()};return d.ntfyLastNotificationAt=Date.now(),Wb().then(s=>eS(e,u,s)).then(()=>ge("connected",`Updated Android player notification (${t}).`)).catch(s=>{console.warn(`[${c}] Failed to publish ntfy player notification.`,s),ge("error","Could not publish Android player notification.")}),!0}function aS(t){let e=String(d.settings.ntfyCommandSecret||"").trim();if(e&&t.secret!==e)return null;let a=String(t.command||t.action||"").trim().toLowerCase();if(!a)return null;if(a==="seek"){let l=Number(t.seconds??t.by??t.value);return Number.isFinite(l)?{command:a,seconds:l}:null}if(a==="volume"){let l=Number(t.percent??t.value);return Number.isFinite(l)?{command:a,percent:l}:null}return{command:a}}function lS(t){let e=String(t||"").trim();if(!e)return null;try{let u=JSON.parse(e);if(u&&typeof u=="object")return aS(u)}catch{}let a=String(d.settings.ntfyCommandSecret||"").trim(),l=e;if(a){if(l!==a&&!l.startsWith(`${a} `))return null;l=l.slice(a.length).trim()}let[n="",i=""]=l.split(/\s+/,2),o=n.toLowerCase();if(o==="seek"){let u=Number(i);return Number.isFinite(u)?{command:o,seconds:u}:null}if(o==="volume"){let u=Number(i);return Number.isFinite(u)?{command:o,percent:u}:null}return{command:o}}function nS(t){switch(t.command){case"play":return pg();case"pause":return mg();case"toggle":case"playpause":case"play-pause":return hg();case"seek":return gg(t.seconds);case"fullscreen":case"fs":return vg();case"next":return _u();case"mute":return Wr(!0);case"unmute":return Wr(!1);case"volume":return yg(t.percent);default:return!1}}function iS(t){let e=null;try{e=JSON.parse(t.data||"{}")}catch(n){console.warn(`[${c}] Failed to parse ntfy event.`,n);return}if(!e||e.event!=="message"||!e.message||e.id&&e.id===P0)return;if(P0=e.id||"",!Fr()||!og()){let n=Date.now();n-tg>5e3&&(tg=n,ge("connected","Another visible LookMovie tab owns the Android remote."));return}let a=lS(e.message);if(!a){ge("connected","Ignored ntfy message.");return}let l=nS(a);l&&window.setTimeout(()=>gi(a.command),150),ge("connected",l?`Ran remote command: ${a.command}`:`No player handled: ${a.command}`)}function lg(){window.clearTimeout(mi),mi=0,Ct&&(Ct.close(),Ct=null),d.ntfyRemoteClaimTimer&&(window.clearInterval(d.ntfyRemoteClaimTimer),d.ntfyRemoteClaimTimer=0),Jr(),ge("disabled","")}function Au(){if(window.clearTimeout(mi),mi=0,!d.settings.ntfyRemoteEnabled)return lg(),!1;let t=jb();return t?(Ct&&Ct.close(),d.ntfyRemoteClaimTimer||(d.ntfyRemoteClaimTimer=window.setInterval(Yb,5e3)),eg||(eg=!0,window.addEventListener("focus",()=>Kr("focus")),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"?Kr("visible"):Jr()}),window.addEventListener("pagehide",Jr)),ge("connecting","Connecting to ntfy."),Ct=new EventSource(t),Ct.onopen=()=>ge("connected","Connected to ntfy."),Ct.onmessage=iS,Ct.onerror=()=>{ge("error","ntfy connection lost. Reconnecting soon."),Ct&&(Ct.close(),Ct=null),mi=window.setTimeout(Au,5e3)},!0):(lg(),ge("disabled",ug()||"Add an ntfy topic to enable remote control."),!1)}function dg(){return Ct&&(Ct.close(),Ct=null),Au()}var oS=`
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

  .movie-item-style-2 .image__placeholder {
    width: 100% !important;
    height: auto !important;
    aspect-ratio: 2 / 3;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
    transition: transform 0.18s ease, box-shadow 0.18s ease;
  }

  .movie-item-style-2 .image__placeholder img {
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
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    gap: 20px;
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

  .tv-episodes-list .episode-item {
    border-radius: 12px;
    overflow: hidden;
    transition: background 0.18s ease, box-shadow 0.18s ease;
  }

  .tv-episodes-list .episode-item:hover {
    box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.45);
  }

  a[href="/premium.html"] {
    display: none !important;
  }
`;function Mu(){let t=document.getElementById(Wu);if(!d.settings.siteTheme){t&&t.remove();return}if(t||!document.documentElement)return;let e=document.createElement("style");e.id=Wu,e.textContent=oS,(document.head||document.documentElement).appendChild(e)}var bg=0;function uS(){window.clearTimeout(bg),bg=window.setTimeout(dg,$f)}function yi(t){let e={ntfyRemoteEnabled:d.settings.ntfyRemoteEnabled,ntfyServer:d.settings.ntfyServer,ntfyTopic:d.settings.ntfyTopic,ntfyControlTopic:d.settings.ntfyControlTopic,ntfyCommandSecret:d.settings.ntfyCommandSecret};d.settings=tc(t),If(d.settings),Sg(),Mu(),(!d.settings.autoFullscreen||!d.settings.windowedFullscreen)&&(an(),d.fullscreenTriggered=!1),(e.ntfyRemoteEnabled!==d.settings.ntfyRemoteEnabled||e.ntfyServer!==d.settings.ntfyServer||e.ntfyTopic!==d.settings.ntfyTopic||e.ntfyControlTopic!==d.settings.ntfyControlTopic||e.ntfyCommandSecret!==d.settings.ntfyCommandSecret)&&uS()}var wi=k(Ha());function wg(t,e){return!t||!e?"":`${t}:${e.season}:${e.episode}:${e.idEpisode}`}function tf(){return Object.values(d.playlistStore.entries)}function vi(t){return t&&d.playlistStore.entries[t]||null}function xg(t,e){return!!vi(wg(t,e))}function ef(t){return[...t].sort((e,a)=>e.addedAt-a.addedAt)}function ln(){ec(d.playlistStore),$t(),$a()}function af(){ed(d.playlistSession),$t()}function Eg(t){if(!t||!t.slug||!t.latestEpisode)return;let e=wg(t.slug,t.latestEpisode);if(!e||vi(e)){$t();return}d.playlistStore.entries[e]=fn(e,{slug:t.slug,idShow:t.idShow,title:t.title,year:t.year,poster:t.poster,episode:t.latestEpisode,addedAt:Date.now()}),ln()}function lf(t){vi(t)&&(delete d.playlistStore.entries[t],d.playlistSession.active&&d.playlistSession.currentKey===t&&nn(),ln())}function Tg(t){if(!t.length)return"Add latest show episodes from the watchlist poster or list view.";let e=t[0];return`${t.length} queued ${t.length===1?"episode":"episodes"} | Next: ${e.title} ${Rt(e.episode)}`}function Ag(t){let e=ef(tf());if(!e.length)return null;if(!t)return e[0];let a=e.findIndex(l=>l.key===t);return a>=0?e[a+1]||null:e[0]}function _g(t){return t?(location.href=il(t.slug,t.episode),!0):!1}function bi(t){let e=t?vi(t):Ag("");return e?(d.playlistSession={active:!0,currentKey:e.key,startedAt:Date.now()},af(),_g(e)):(nn(),!1)}function nn(){d.playlistSession={active:!1,currentKey:"",startedAt:0},af()}function Mg(){if(!d.playlistSession.active)return!1;let t=d.playlistSession.currentKey;if(!vi(t))return nn(),!1;let a=Ag(t);return delete d.playlistStore.entries[t],ec(d.playlistStore),a?(d.playlistSession.currentKey=a.key,af(),ln(),_g(a)):(nn(),ln(),!0)}var cS=1;function sS(){return{app:c,version:cS,exportedAt:new Date().toISOString(),watchlist:d.watchlistStore,movieWatchlist:d.movieWatchlistStore,playlist:d.playlistStore}}function zg(){let t=JSON.stringify(sS(),null,2),e=URL.createObjectURL(new Blob([t],{type:"application/json"})),a=document.createElement("a");a.href=e,a.download=`lookmovie2-watchlist-${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(a),a.click(),a.remove(),window.setTimeout(()=>URL.revokeObjectURL(e),1e3)}function nf(t,e,a){if(!t||typeof t!="object")return{};let l=t[e];return l&&typeof l=="object"&&l[a]&&typeof l[a]=="object"?l[a]:t[a]&&typeof t[a]=="object"?t[a]:{}}function Ng(t){let e=[],a=0,l=0;Object.entries(nf(t,"watchlist","shows")).forEach(([i,o])=>{if(d.watchlistStore.shows[i])return;let u=sn(i,o);u&&(d.watchlistStore.shows[i]=u,e.push(i))}),Object.entries(nf(t,"movieWatchlist","movies")).forEach(([i,o])=>{if(d.movieWatchlistStore.movies[i])return;let u=rn(i,o);u&&(d.movieWatchlistStore.movies[i]=u,a+=1)}),Object.entries(nf(t,"playlist","entries")).forEach(([i,o])=>{let u=fn(i,o);u&&!d.playlistStore.entries[u.key]&&(d.playlistStore.entries[u.key]=u,l+=1)}),e.length&&(ol(),ta({force:!0,slugs:e})),a&&(on(),Si()),l&&ln();let n=`Restored ${e.length} ${e.length===1?"show":"shows"}, ${a} ${a===1?"movie":"movies"}, ${l} playlist ${l===1?"episode":"episodes"}.`;return Pt(n,e.length||a||l?"success":"muted"),n}async function Og(t){try{return Ng(JSON.parse(await t.text()))}catch(e){return console.warn(`[${c}] Failed to import backup.`,e),Pt("That file is not a valid watchlist backup.","danger"),""}}function Cg(){return Xi().map(t=>({date:t.date,showCount:Object.keys(t.watchlist&&t.watchlist.shows||{}).length,movieCount:Object.keys(t.movieWatchlist&&t.movieWatchlist.movies||{}).length}))}function $g(t){let e=Xi().find(a=>a.date===t);return e?Ng(e):""}var Tt=k(ot());function Lg(){let t=(0,wi.useRef)(null),[e,a]=(0,wi.useState)(""),l=Cg(),[n,i]=(0,wi.useState)(""),o=n||l[0]&&l[0].date||"";return(0,Tt.jsxs)("div",{className:`${c}-setting ${c}-setting-stack`,children:[(0,Tt.jsxs)("div",{children:[(0,Tt.jsx)("p",{className:`${c}-setting-title`,children:"Watchlist backup"}),(0,Tt.jsx)("p",{className:`${c}-setting-copy`,children:"Watchlists are kept in Tampermonkey storage with a daily snapshot for the last 14 days. Export a file now and then for a copy outside the browser. Restoring only adds missing entries."})]}),(0,Tt.jsxs)("div",{className:`${c}-backup-actions`,children:[(0,Tt.jsx)("button",{className:`${c}-button`,type:"button",onClick:()=>zg(),children:"Export file"}),(0,Tt.jsx)("button",{className:`${c}-button`,type:"button",onClick:()=>t.current&&t.current.click(),children:"Import file"}),(0,Tt.jsx)("input",{ref:t,className:`${c}-file-input`,type:"file",accept:"application/json,.json",hidden:!0,onChange:async u=>{let s=u.currentTarget.files&&u.currentTarget.files[0];u.currentTarget.value="",s&&a(await Og(s))}})]}),l.length?(0,Tt.jsxs)("div",{className:`${c}-backup-actions`,children:[(0,Tt.jsxs)("label",{className:`${c}-field`,children:[(0,Tt.jsx)("span",{children:"Snapshot"}),(0,Tt.jsx)("select",{value:o,onChange:u=>i(u.currentTarget.value),children:l.map(u=>(0,Tt.jsxs)("option",{value:u.date,children:[u.date," (",u.showCount," shows, ",u.movieCount," movies)"]},u.date))})]}),(0,Tt.jsx)("button",{className:`${c}-button`,type:"button",onClick:()=>a($g(o)),children:"Restore"})]}):null,e?(0,Tt.jsx)("p",{className:`${c}-ntfy-status`,children:e}):null]})}var ve=k(ot());function Ra({settingKey:t,title:e,copy:a,icon:l}){let n=!!d.settings[t];return(0,ve.jsxs)("label",{className:`${c}-setting`,children:[(0,ve.jsxs)("div",{className:`${c}-setting-main`,children:[l?(0,ve.jsx)("span",{className:`${c}-setting-icon`,children:l}):null,(0,ve.jsxs)("div",{children:[(0,ve.jsx)("p",{className:`${c}-setting-title`,children:e}),(0,ve.jsx)("p",{className:`${c}-setting-copy`,children:a})]})]}),(0,ve.jsxs)("span",{className:`${c}-switch`,children:[(0,ve.jsx)("input",{type:"checkbox",checked:n,onChange:i=>{yi({...d.settings,[t]:i.currentTarget.checked})}}),(0,ve.jsx)("span",{className:`${c}-slider`})]})]})}var Ru=k(Ha());var dS=/^(?:ep_\d+|lookmovie\.mv_\d+)$/,of=null;function Bg(t){return`ep_${t}`}function Hg(t){return`lookmovie.mv_${t}`}function qg(){return of||(of=id()),of}function Yg(t){try{return lc(JSON.parse(localStorage.getItem(t)||"null"))}catch{return null}}function pS(t){let e=Object.keys(t);return e.length<=Iu?!1:(e.sort((a,l)=>t[l].savedAt-t[a].savedAt).slice(Iu).forEach(a=>delete t[a]),!0)}function Nu(){let t=qg(),e=!1;try{for(let a=0;a<localStorage.length;a+=1){let l=localStorage.key(a);if(!dS.test(l))continue;let n=Yg(l),i=t[l];n&&(!i||i.progress!==n.progress||i.duration!==n.duration)&&(t[l]={...n,savedAt:Date.now()},e=!0)}Object.entries(t).forEach(([a,l])=>{localStorage.getItem(a)===null&&localStorage.setItem(a,JSON.stringify({duration:l.duration,progress:l.progress}))})}catch(a){console.warn(`[${c}] Failed to sync resume points.`,a)}(pS(t)||e)&&od(t)}function jg(){Nu(),window.setInterval(Nu,Bf),window.addEventListener("pagehide",Nu),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Nu()})}function mS(t){return Yg(t)||qg()[t]||null}function Ou(t){let e=mS(t);if(!e)return null;let a=e.progress/e.duration*100;return a>=Lf&&a<ji?e:null}function Cu(t){let e=Math.max(1,Math.round((t.duration-t.progress)/6e4));return e<60?`${e}m left`:`${Math.floor(e/60)}h ${e%60}m left`}var vt=k(ot());function Vg({entry:t,viewMode:e}){let a=t.watched?"watched":"new",l=t.href||$u(t.slug),n=t.addedAt?`Added ${new Date(t.addedAt).toLocaleDateString()}`:"",i=[],o=t.idMovie?Ou(Hg(t.idMovie)):null,u=`/movies/play/${t.slug}`;return n&&i.push(n),(0,vt.jsxs)("article",{className:`${c}-watch-item`,"data-state":a,"data-view":e,children:[(0,vt.jsxs)("div",{className:`${c}-watch-item-poster`,children:[(0,vt.jsx)("a",{className:`${c}-watch-poster-link`,href:l,"aria-label":`Open ${t.title}`,children:t.poster?(0,vt.jsx)("img",{src:t.poster,alt:t.title,loading:"lazy"}):(0,vt.jsx)("div",{className:`${c}-watch-item-poster-placeholder`,children:"MOVIE"})}),(0,vt.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-check-button`,type:"button","aria-label":t.watched?`Mark ${t.title} unwatched`:`Mark ${t.title} watched`,title:t.watched?"Mark unwatched":"Mark watched",onClick:()=>Gg(t.slug),children:"\u2713"}),(0,vt.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-remove-button`,type:"button","aria-label":`Remove ${t.title}`,title:"Remove",onClick:()=>xi(t.slug),children:"\xD7"}),(0,vt.jsx)("div",{className:`${c}-watch-item-poster-overlay`,children:(0,vt.jsx)("span",{className:`${c}-watch-badge`,"data-state":a,children:t.watched?"Watched":"To watch"})})]}),(0,vt.jsxs)("div",{className:`${c}-watch-item-body`,children:[(0,vt.jsxs)("div",{children:[(0,vt.jsxs)("a",{className:`${c}-watch-item-title`,href:l,children:[t.title,t.year?` (${t.year})`:""]}),i.length?(0,vt.jsx)("p",{className:`${c}-watch-item-copy`,children:i.join(" | ")}):null]}),o||!t.watched?(0,vt.jsxs)("a",{className:`${c}-watch-action`,href:u,children:[(0,vt.jsx)("span",{"aria-hidden":"true",children:"\u25B6"})," ",o?"Continue":"Play",o?(0,vt.jsx)("small",{children:Cu(o)}):null]}):null]})]})}var Ei=k(ot());function Qg(){return(0,Ei.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,Ei.jsx)("path",{d:"M9.2 16.6 4.9 12.3l-1.4 1.4 5.7 5.7L21 7.6l-1.4-1.4L9.2 16.6z"})})}function Xg(){return(0,Ei.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,Ei.jsx)("path",{d:"m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5z"})})}var At=k(ot());function Zg({entry:t,viewMode:e,isActive:a}){let l=il(t.slug,t.episode),n=Rt(t.episode),i=t.addedAt?`Queued ${new Date(t.addedAt).toLocaleDateString()}`:"",o=[n];return i&&o.push(i),(0,At.jsxs)("article",{className:`${c}-watch-item`,"data-state":"new","data-view":e,"data-playlist-active":a?"true":"false",children:[(0,At.jsxs)("div",{className:`${c}-watch-item-poster`,children:[(0,At.jsx)("a",{className:`${c}-watch-poster-link`,href:l,"aria-label":`Open ${t.title} ${n}`,onClick:u=>{u.preventDefault(),bi(t.key)},children:t.poster?(0,At.jsx)("img",{src:t.poster,alt:t.title,loading:"lazy"}):(0,At.jsx)("div",{className:`${c}-watch-item-poster-placeholder`,children:"TV"})}),(0,At.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-check-button`,type:"button","aria-label":`Remove ${t.title} ${n} from playlist`,title:"Done",onClick:()=>lf(t.key),children:(0,At.jsx)(Qg,{})}),(0,At.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-remove-button`,type:"button","aria-label":`Remove ${t.title}`,title:"Remove",onClick:()=>lf(t.key),children:(0,At.jsx)(Xg,{})}),(0,At.jsx)("div",{className:`${c}-watch-item-poster-overlay`,children:(0,At.jsx)("span",{className:`${c}-watch-badge`,"data-state":"new",children:a?"Playing":"Queued"})})]}),(0,At.jsx)("div",{className:`${c}-watch-item-body`,children:(0,At.jsxs)("div",{children:[(0,At.jsxs)("a",{className:`${c}-watch-item-title`,href:l,onClick:u=>{u.preventDefault(),bi(t.key)},children:[t.title,t.year?` (${t.year})`:""]}),(0,At.jsx)("p",{className:`${c}-watch-item-copy`,children:o.join(" | ")})]})})]})}var Ua=k(Ha());async function kg(t,e){let a=String(e||"").trim();if(a.length<2)return[];let l=await Gi(`/api/v1/${t}/do-search/?q=${encodeURIComponent(a)}`);return(l&&Array.isArray(l.result)?l.result:[]).filter(i=>i&&typeof i.slug=="string"&&i.slug).slice(0,Yf).map(i=>({slug:i.slug,idShow:i.id_show||0,idMovie:i.id_movie||0,title:typeof i.title=="string"?i.title:i.slug,year:i.year?String(i.year):"",rating:i.imdb_rating?String(i.imdb_rating):"",poster:ut(i.poster&&(i.poster.w200||i.poster.w100)||"")}))}var te=k(ot());function Kg({type:t}){let[e,a]=(0,Ua.useState)(""),[l,n]=(0,Ua.useState)([]),[i,o]=(0,Ua.useState)(""),u=(0,Ua.useRef)(0),s=t==="shows";(0,Ua.useEffect)(()=>{n([]),o("");let g=e.trim();if(g.length<2)return;let v=++u.current,m=window.setTimeout(async()=>{o("Searching...");try{let y=await kg(t,g);v===u.current&&(n(y),o(y.length?"":"No matches."))}catch{v===u.current&&o("Search failed. Try again.")}},jf);return()=>window.clearTimeout(m)},[e,t]);function p(g){s?Ai({...g}):Ti({...g,href:`/movies/view/${g.slug}`})}return(0,te.jsxs)("div",{className:`${c}-search`,children:[(0,te.jsx)("input",{type:"search",value:e,placeholder:s?"Search TV shows to add":"Search movies to add","aria-label":s?"Search TV shows to add":"Search movies to add",onChange:g=>a(g.currentTarget.value),onKeyDown:g=>{g.key==="Escape"&&(g.stopPropagation(),a(""))}}),i?(0,te.jsx)("p",{className:`${c}-search-status`,children:i}):null,l.length?(0,te.jsx)("ul",{className:`${c}-search-results`,children:l.map(g=>{let v=s?!!Oe(g.slug):!!ea(g.slug);return(0,te.jsxs)("li",{children:[g.poster?(0,te.jsx)("img",{src:g.poster,alt:"",loading:"lazy"}):(0,te.jsx)("span",{}),(0,te.jsxs)("div",{children:[(0,te.jsx)("strong",{children:g.title}),(0,te.jsx)("small",{children:[g.year,g.rating?`IMDb ${g.rating}`:""].filter(Boolean).join(" \xB7 ")})]}),(0,te.jsx)("button",{className:`${c}-button`,type:"button",disabled:v,onClick:()=>p(g),children:v?"Added":"Add"})]},g.slug)})}):null]})}var mt=k(ot());function hS(t,e){let a=t.lastWatched&&Ou(Bg(t.lastWatched.idEpisode));if(a)return{href:il(t.slug,t.lastWatched),label:`Continue ${Rt(t.lastWatched)}`,detail:Cu(a)};let l=e&&e.episodes[0];return l?{href:il(t.slug,l),label:`Play ${Rt(l)}`,detail:""}:null}function Jg({entry:t,viewMode:e}){let a=uf(t),l=a?a.total:null,n=hS(t,a),i=l!==null?l>0?"new":"watched":t.latestEpisode?$e(t)?"watched":"new":"pending",o=t.latestEpisode?`Latest ${Rt(t.latestEpisode)}`:"Latest episode not synced yet",u=t.lastWatched?`Watched through ${Rt(t.lastWatched)}`:"Nothing marked watched yet",s=t.lastSyncError?`Sync issue: ${t.lastSyncError}`:"",p=i==="new"?l?`${l>99?"99+":l} unwatched`:"New episode":i==="watched"?"Up to date":"Pending sync",g=Wg(t.slug,t.latestEpisode),v=$e(t)?"Mark latest unwatched":"Mark latest watched",m=xg(t.slug,t.latestEpisode),y=m?`${t.title} latest episode is already in your playlist`:`Add ${t.title} latest episode to playlist`,E=t.lastWatched?[o,u]:[o];return s&&E.push(s),(0,mt.jsxs)("article",{className:`${c}-watch-item`,"data-state":i,"data-view":e,children:[(0,mt.jsxs)("div",{className:`${c}-watch-item-poster`,children:[(0,mt.jsx)("a",{className:`${c}-watch-poster-link`,href:g,"aria-label":`Open ${t.title}`,children:t.poster?(0,mt.jsx)("img",{src:t.poster,alt:t.title,loading:"lazy"}):(0,mt.jsx)("div",{className:`${c}-watch-item-poster-placeholder`,children:"TV"})}),(0,mt.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-check-button`,type:"button",disabled:!t.latestEpisode,"aria-label":v,title:v,onClick:()=>Fg(t.slug),children:"\u2713"}),(0,mt.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-playlist-button`,type:"button",disabled:!t.latestEpisode||m,"aria-label":y,title:y,onClick:()=>Eg(t),children:"+"}),(0,mt.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-remove-button`,type:"button","aria-label":`Remove ${t.title}`,title:"Remove",onClick:()=>_i(t.slug),children:"\xD7"}),(0,mt.jsx)("div",{className:`${c}-watch-item-poster-overlay`,children:(0,mt.jsx)("span",{className:`${c}-watch-badge`,"data-state":i,children:p})})]}),(0,mt.jsxs)("div",{className:`${c}-watch-item-body`,children:[(0,mt.jsxs)("div",{children:[(0,mt.jsxs)("a",{className:`${c}-watch-item-title`,href:g,children:[t.title,t.year?` (${t.year})`:""]}),(0,mt.jsx)("p",{className:`${c}-watch-item-copy`,children:E.join(" | ")})]}),n?(0,mt.jsxs)("a",{className:`${c}-watch-action`,href:n.href,children:[(0,mt.jsx)("span",{"aria-hidden":"true",children:"\u25B6"})," ",n.label,n.detail?(0,mt.jsx)("small",{children:n.detail}):null]}):null]})]})}var M=k(ot());function Ig(){return(0,M.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,M.jsx)("path",{d:"M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"})})}function Pg(){return(0,M.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,M.jsx)("path",{d:"M4 6h3v3H4V6zm5 .5h11v2H9v-2zM4 11h3v3H4v-3zm5 .5h11v2H9v-2zM4 16h3v3H4v-3zm5 .5h11v2H9v-2z"})})}function gS(){return(0,M.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,M.jsx)("path",{d:"M17.7 6.3A7.9 7.9 0 0 0 12 4a8 8 0 1 0 7.5 10.7l-1.9-.7A6 6 0 1 1 16.3 7.7L13 11h8V3l-3.3 3.3z"})})}function yS(){return(0,M.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,M.jsx)("path",{d:"M8 5v14l11-7L8 5z"})})}function vS(){return(0,M.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,M.jsx)("path",{d:"M6 6h12v12H6V6z"})})}function ty({id:t,title:e,summary:a,count:l,isOpen:n,onClick:i}){return(0,M.jsxs)("button",{id:`${S}-${t}-fold-button`,className:`${c}-accordion-trigger`,type:"button","aria-expanded":n?"true":"false","aria-controls":`${S}-${t}-fold-panel`,"data-open":n?"true":"false",onClick:i,children:[(0,M.jsxs)("span",{children:[(0,M.jsx)("strong",{children:e}),(0,M.jsx)("small",{children:a})]}),(0,M.jsx)("em",{children:l})]})}function ey(){let[t,e]=(0,Ru.useState)("watchlist"),[a,l]=(0,Ru.useState)("shows"),[n,i]=(0,Ru.useState)("poster"),o=ly(Uu()),u=ay(cf()),s=ef(tf()),p=o.filter(r=>r.latestEpisode&&!$e(r)).length,g=u.filter(r=>!r.watched).length,v=a==="shows",m=t==="watchlist",y=t==="playlist",E=v?o.length?`${o.length} tracked ${o.length===1?"show":"shows"}${p?` | ${p} with a newer latest episode`:""}`:"Add shows from the latest episodes page to start tracking them.":u.length?`${u.length} tracked ${u.length===1?"movie":"movies"}${g?` | ${g} unwatched`:""}`:"Add movies from the movies page or an individual movie page to start tracking them.",_=Tg(s),O=n==="list",f=d.playlistSession.active;return(0,M.jsx)("section",{id:`${S}-watchlist-panel`,children:(0,M.jsxs)("div",{className:`${c}-accordion`,children:[(0,M.jsx)(ty,{id:"watchlist",title:"Watchlist",summary:E,count:o.length+u.length,isOpen:m,onClick:()=>e("watchlist")}),m?(0,M.jsxs)("div",{id:`${S}-watchlist-fold-panel`,className:`${c}-accordion-panel`,role:"region","aria-labelledby":`${S}-watchlist-fold-button`,children:[(0,M.jsxs)("div",{id:`${S}-watchlist-toolbar`,children:[(0,M.jsxs)("div",{children:[(0,M.jsx)("h3",{id:`${S}-watchlist-title`,children:"Watchlist"}),(0,M.jsxs)("div",{className:`${c}-tabs`,role:"tablist","aria-label":"Watchlist type",children:[(0,M.jsxs)("button",{className:`${c}-tab`,type:"button",role:"tab","aria-selected":v?"true":"false","data-active":v?"true":"false",onClick:()=>l("shows"),children:["TV Shows",p>0?(0,M.jsx)("span",{children:p}):null]}),(0,M.jsxs)("button",{className:`${c}-tab`,type:"button",role:"tab","aria-selected":v?"false":"true","data-active":v?"false":"true",onClick:()=>l("movies"),children:["Movies",g>0?(0,M.jsx)("span",{children:g}):null]})]})]}),(0,M.jsxs)("div",{className:`${c}-watchlist-toolbar-actions`,children:[(0,M.jsx)("button",{className:`${c}-button ${c}-toolbar-icon-button ${c}-view-toggle`,type:"button","aria-pressed":O?"true":"false","aria-label":O?"Switch to poster view":"Switch to list view",title:O?"Switch to poster view":"Switch to list view",onClick:()=>i(O?"poster":"list"),children:O?(0,M.jsx)(Ig,{}):(0,M.jsx)(Pg,{})}),v?(0,M.jsx)("button",{id:`${S}-watchlist-refresh`,className:`${c}-button ${c}-toolbar-icon-button`,type:"button",disabled:d.watchlistBusy,"aria-label":"Refresh watchlist",title:"Refresh watchlist",onClick:()=>ta({force:!0}),children:(0,M.jsx)(gS,{})}):null]})]}),(0,M.jsx)(Kg,{type:v?"shows":"movies"}),v?(0,M.jsx)("div",{id:`${S}-watchlist-status`,"data-tone":d.watchlistMessageTone,children:d.watchlistBusy?d.watchlistMessage||"Refreshing watchlist...":d.watchlistMessage||""}):null,(0,M.jsx)("div",{id:`${S}-watchlist-list`,"data-view":n,children:v&&o.length?o.map(r=>(0,M.jsx)(Jg,{entry:r,viewMode:n},r.slug)):!v&&u.length?u.map(r=>(0,M.jsx)(Vg,{entry:r,viewMode:n},r.slug)):(0,M.jsx)("div",{className:`${c}-watch-empty`,children:v?"On the /shows page or an individual show page, use the watchlist button to add that show here.":"On the /movies page or an individual movie page, use the movie watchlist button to add a movie here."})})]}):null,(0,M.jsx)(ty,{id:"playlist",title:"Playlist",summary:_,count:s.length,isOpen:y,onClick:()=>e("playlist")}),y?(0,M.jsxs)("div",{id:`${S}-playlist-fold-panel`,className:`${c}-accordion-panel`,role:"region","aria-labelledby":`${S}-playlist-fold-button`,children:[(0,M.jsxs)("div",{id:`${S}-playlist-toolbar`,children:[(0,M.jsx)("h3",{id:`${S}-playlist-title`,children:"Playlist"}),(0,M.jsxs)("div",{className:`${c}-watchlist-toolbar-actions`,children:[(0,M.jsx)("button",{className:`${c}-button ${c}-toolbar-icon-button ${c}-playlist-play-button`,type:"button",disabled:!s.length,"aria-label":f?"Stop playlist playback":"Play playlist",title:f?"Stop playlist playback":"Play playlist","data-active":f?"true":"false",onClick:()=>{f?nn():bi()},children:f?(0,M.jsx)(vS,{}):(0,M.jsx)(yS,{})}),(0,M.jsx)("button",{className:`${c}-button ${c}-toolbar-icon-button ${c}-view-toggle`,type:"button","aria-pressed":O?"true":"false","aria-label":O?"Switch to poster view":"Switch to list view",title:O?"Switch to poster view":"Switch to list view",onClick:()=>i(O?"poster":"list"),children:O?(0,M.jsx)(Ig,{}):(0,M.jsx)(Pg,{})})]})]}),(0,M.jsx)("div",{id:`${S}-playlist-list`,"data-view":n,children:s.length?s.map(r=>(0,M.jsx)(Zg,{entry:r,viewMode:n,isActive:d.playlistSession.currentKey===r.key},r.key)):(0,M.jsx)("div",{className:`${c}-watch-empty`,children:"Add a latest show episode from a watchlist poster or list item."})})]}):null]})})}var x=k(ot());function bS(t){return Array.from(document.querySelectorAll("a, button")).find(e=>Vf(e)?t.test(Gf(e)):!1)}function SS(){let t=bS(/\bsign\s*up\b|\bsignup\b|\bregister\b/i);if(t){let a=t.closest("li");return a&&a.parentElement?{parent:a.parentElement,before:a.nextSibling,sourceItem:a}:{parent:t.parentElement,before:t.nextSibling,sourceItem:null}}let e=document.querySelector("header, nav, .navbar, .main-header, .header");return e?{parent:e,before:null,sourceItem:null}:null}function wS(t){for(let e=t;e&&e!==document.body;e=e.parentElement){let a=getComputedStyle(e).position;if(a==="fixed"||a==="sticky")return!0}return!1}function xS(){let t=SS();if(!t||!t.parent||wS(t.parent))return null;let e=document.getElementById(`${S}-launcher-host`);return e&&e.tagName!=="LI"&&(e.remove(),e=null),e||(e=document.createElement("li"),e.id=`${S}-launcher-host`),t.sourceItem&&e.className!==t.sourceItem.className&&(e.className=t.sourceItem.className),t.before!==e&&(e.parentElement!==t.parent||e.nextSibling!==t.before)&&t.parent.insertBefore(e,t.before),e}function ny(){return(0,x.jsxs)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[(0,x.jsx)("path",{d:"M8 6.5v11l8.5-5.5L8 6.5z"}),(0,x.jsx)("path",{d:"M16.5 4.5a7.5 7.5 0 0 1 3.2 9.4l1.6.7A9.3 9.3 0 0 0 17.2 3l-.7 1.5zM7.5 19.5a7.5 7.5 0 0 1-3.2-9.4l-1.6-.7A9.3 9.3 0 0 0 6.8 21l.7-1.5z"}),(0,x.jsx)("path",{d:"M19.4 15.2 22 15l-1.5 2.2-1.1-2zM4.6 8.8 2 9l1.5-2.2 1.1 2z"})]})}function iy(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M5 10V5h5v2H7v3H5zm9-5h5v5h-2V7h-3V5zM7 14v3h3v2H5v-5h2zm10 0h2v5h-5v-2h3v-3z"})})}function ES(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M3 5h18v14H3V5zm2 2v10h14V7H5zm2 2h4v2H9v2H7V9zm10 6h-4v-2h2v-2h2v4z"})})}function TS(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M4 4h7v7H4V4zm9 0h7v4h-7V4zm0 6h7v10h-7V10zM4 13h7v7H4v-7z"})})}function AS(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M5 6v12l8.5-6L5 6zm9 0v12h2V6h-2zm3 0v12h2V6h-2z"})})}function _S(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M4 6v12l7-6-7-6zm7 0v12l7-6-7-6zm8 0h2v12h-2V6z"})})}function oy(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M7.1 14.9a7 7 0 0 1 9.8 0l-1.4 1.4a5 5 0 0 0-7 0l-1.4-1.4zm-3.5-3.5a12 12 0 0 1 16.8 0L19 12.8a10 10 0 0 0-14 0l-1.4-1.4zm7 7a2 2 0 0 1 2.8 0L12 19.8l-1.4-1.4zM8 4h8v2H8V4z"})})}function MS(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M12 2.8 14.3 8l5.7.6-4.3 3.8 1.2 5.6-4.9-2.9L7.1 18l1.2-5.6L4 8.6 9.7 8 12 2.8z"})})}function cy(){let[t,e]=(0,jt.useState)(!1),[a,l]=(0,jt.useState)(null),[n,i]=(0,jt.useState)(()=>window.scrollY>120),[o,u]=(0,jt.useState)(!1),s=(0,jt.useRef)(0),[,p]=(0,jt.useState)(0);(0,jt.useEffect)(()=>F0(()=>p(f=>f+1)),[]),(0,jt.useEffect)(()=>{function f(r){r.key==="Escape"&&e(!1)}return window.addEventListener("keydown",f),()=>window.removeEventListener("keydown",f)},[]),(0,jt.useEffect)(()=>{let f=0;function r(){let b=xS();l(A=>A===b?A:b),f+=1,(b||f>40)&&window.clearInterval(h)}let h=window.setInterval(r,500);return r(),()=>window.clearInterval(h)},[]),(0,jt.useEffect)(()=>{function f(){i(window.scrollY>120)}return f(),window.addEventListener("scroll",f,{passive:!0}),()=>window.removeEventListener("scroll",f)},[]),(0,jt.useEffect)(()=>()=>{window.clearTimeout(s.current)},[]);function g(){e(!0)}function v(){window.clearTimeout(s.current),u(!0)}function m(){window.clearTimeout(s.current),s.current=window.setTimeout(()=>{u(!1)},240)}function y(f){yi({...d.settings,[f]:!d.settings[f]})}function E(f,r){yi({...d.settings,[f]:r})}let _=n?null:a,O=(0,x.jsxs)("div",{id:`${S}-launcher`,"data-hosted":_?"true":"false","data-scrolled":n?"true":"false","data-quick-open":o?"true":"false",onMouseEnter:v,onMouseLeave:m,onFocus:v,onBlur:f=>{f.currentTarget.contains(f.relatedTarget)||m()},children:[(0,x.jsxs)("button",{id:`${S}-button`,type:"button","aria-label":"Open LookMovie2 Enhancer","aria-haspopup":"dialog","aria-expanded":t?"true":"false",title:"Open enhancer",onClick:()=>t?e(!1):g(),children:[(0,x.jsx)("span",{id:`${S}-button-icon`,children:(0,x.jsx)(MS,{})}),(0,x.jsx)("span",{id:`${S}-button-label`,children:"Enhancer"})]}),(0,x.jsxs)("div",{id:`${S}-quick-settings`,role:"toolbar","aria-label":"Quick playback settings",children:[(0,x.jsx)("button",{className:`${c}-quick-setting`,type:"button","aria-label":"Toggle auto play",title:"Toggle auto play","data-enabled":d.settings.autoPlay?"true":"false",onClick:f=>{f.stopPropagation(),y("autoPlay")},children:(0,x.jsx)(ny,{})}),(0,x.jsx)("button",{className:`${c}-quick-setting`,type:"button","aria-label":"Toggle auto fullscreen",title:"Toggle auto fullscreen","data-enabled":d.settings.autoFullscreen?"true":"false",onClick:f=>{f.stopPropagation(),y("autoFullscreen")},children:(0,x.jsx)(iy,{})}),(0,x.jsx)("button",{className:`${c}-quick-setting`,type:"button","aria-label":"Toggle ntfy remote",title:"Toggle ntfy remote","data-enabled":d.settings.ntfyRemoteEnabled?"true":"false",onClick:f=>{f.stopPropagation(),y("ntfyRemoteEnabled")},children:(0,x.jsx)(oy,{})})]})]});return(0,x.jsxs)(x.Fragment,{children:[_?(0,uy.createPortal)(O,_):O,(0,x.jsx)("div",{id:`${S}-overlay`,"aria-hidden":t?"false":"true",className:t?`${c}-open`:"",onClick:f=>{f.target===f.currentTarget&&e(!1)},children:(0,x.jsxs)("div",{id:`${S}-modal`,role:"dialog","aria-modal":"true","aria-labelledby":`${S}-title`,children:[(0,x.jsxs)("div",{id:`${S}-header`,children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("h2",{id:`${S}-title`,children:"LookMovie2 Enhancer"}),(0,x.jsx)("p",{id:`${S}-subtitle`,children:"Playback helpers plus a personal show watchlist with latest episode tracking."})]}),(0,x.jsx)("button",{id:`${S}-close`,type:"button","aria-label":"Close settings",onClick:()=>e(!1),children:"\xD7"})]}),(0,x.jsxs)("div",{id:`${S}-content`,children:[(0,x.jsxs)("section",{id:`${S}-settings-panel`,children:[(0,x.jsx)("h3",{id:`${S}-settings-title`,children:"Playback Tools"}),(0,x.jsxs)("div",{id:`${S}-settings`,children:[(0,x.jsx)(Ra,{settingKey:"autoPlay",title:"Auto play",copy:"Clicks the resume or start button when the playback modal appears.",icon:(0,x.jsx)(ny,{})}),(0,x.jsx)(Ra,{settingKey:"autoFullscreen",title:"Auto fullscreen",copy:"Clicks the player's fullscreen button after playback starts.",icon:(0,x.jsx)(iy,{})}),(0,x.jsx)(Ra,{settingKey:"windowedFullscreen",title:"Windowed fullscreen",copy:"Stretches the player over the page when the browser blocks real fullscreen, e.g. after auto play or a remote command.",icon:(0,x.jsx)(ES,{})}),(0,x.jsx)(Ra,{settingKey:"siteTheme",title:"Site UI polish",copy:"Wider layout, responsive poster grids, a calmer background and no premium upsell links.",icon:(0,x.jsx)(TS,{})}),(0,x.jsx)(Ra,{settingKey:"autoNextEpisode",title:"Auto next episode",copy:"Counts down and plays the next episode when one ends, outside playlist mode.",icon:(0,x.jsx)(AS,{})}),(0,x.jsx)(Ra,{settingKey:"autoSkipIntro",title:"Auto skip intros",copy:"Jumps past an intro you marked for that show. Off shows a Skip intro button instead.",icon:(0,x.jsx)(_S,{})}),(0,x.jsx)(Ra,{settingKey:"ntfyRemoteEnabled",title:"Android remote",copy:"Publishes a player notification to ntfy with Android action buttons.",icon:(0,x.jsx)(oy,{})}),(0,x.jsxs)("div",{className:`${c}-setting ${c}-setting-stack`,children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("p",{className:`${c}-setting-title`,children:"ntfy topics"}),(0,x.jsx)("p",{className:`${c}-setting-copy`,children:"The phone subscribes to the display topic; the browser listens on the control topic. Use only letters, numbers, hyphens, and underscores."})]}),(0,x.jsxs)("label",{className:`${c}-field`,children:[(0,x.jsx)("span",{children:"Server"}),(0,x.jsx)("input",{type:"url",value:d.settings.ntfyServer,placeholder:"https://ntfy.sh",onChange:f=>E("ntfyServer",f.currentTarget.value)})]}),(0,x.jsxs)("label",{className:`${c}-field`,children:[(0,x.jsx)("span",{children:"Display topic"}),(0,x.jsx)("input",{type:"text",value:d.settings.ntfyTopic,maxLength:64,pattern:"[A-Za-z0-9_-]{1,64}",placeholder:"random-private-topic",onChange:f=>E("ntfyTopic",f.currentTarget.value)})]}),(0,x.jsxs)("label",{className:`${c}-field`,children:[(0,x.jsx)("span",{children:"Control topic"}),(0,x.jsx)("input",{type:"text",value:d.settings.ntfyControlTopic,maxLength:64,pattern:"[A-Za-z0-9_-]{1,64}",placeholder:"display-topic-controls",onChange:f=>E("ntfyControlTopic",f.currentTarget.value)})]}),(0,x.jsxs)("label",{className:`${c}-field`,children:[(0,x.jsx)("span",{children:"Command secret"}),(0,x.jsx)("input",{type:"password",value:d.settings.ntfyCommandSecret,placeholder:"optional shared command prefix",onChange:f=>E("ntfyCommandSecret",f.currentTarget.value)})]}),(0,x.jsx)("p",{className:`${c}-ntfy-status`,"data-status":d.ntfyRemoteStatus,children:d.ntfyRemoteMessage||`Remote status: ${d.ntfyRemoteStatus}`})]}),(0,x.jsx)(Lg,{})]}),(0,x.jsx)("div",{id:`${S}-footer`,children:"Settings and watchlist data are saved in Tampermonkey storage on this browser."})]}),(0,x.jsx)(ey,{})]})]})})]})}var ry=k(ot()),sf=null;function zS(){if(!document.head||document.getElementById(Ju))return;let t=document.createElement("style");t.id=Ju,t.textContent=I0(),document.head.appendChild(t)}function rf(){if(zS(),!document.body)return;let t=document.getElementById(S);t||(t=document.createElement("div"),t.id=S,document.body.appendChild(t)),sf||(sf=(0,sy.createRoot)(t),sf.render((0,ry.jsx)(cy,{})))}function $a(){en()}function $t(){en()}function Sg(){en()}var Mi=null;function cf(){return Object.values(d.movieWatchlistStore.movies)}function ea(t){return t&&d.movieWatchlistStore.movies[t]||null}function ay(t){return[...t].sort((e,a)=>e.watched!==a.watched?e.watched?1:-1:e.title.localeCompare(a.title))}function on(){td(d.movieWatchlistStore),$t(),$a(),zi(),Ni()}function NS(t){return!(!t||typeof t.poster!="string"||!t.poster.trim()||t.poster.trim().startsWith("data:image/"))}function OS(t){let e=t.match(/(?:var\s+|window\.)movie_storage\s*=\s*(\{[\s\S]*?\})\s*;/);if(!e)return{};try{return JSON.parse(e[1])}catch(a){return console.warn(`[${c}] Failed to parse movie_storage metadata.`,a),{}}}async function fy(t,e){let a=await Vi(`/movies/view/${t}`),l=OS(a),n=a.match(/id_movie:\s*(\d+)/),i=a.match(/title:\s*'((?:\\'|[^'])*)'/),o=a.match(/year:\s*'((?:\\'|[^'])*)'/),u=a.match(/poster_medium:\s*'((?:\\'|[^'])*)'/),s=typeof l.movie_poster=="string"&&l.movie_poster?l.movie_poster:typeof l.poster_medium=="string"&&l.poster_medium?l.poster_medium:typeof l.poster=="string"?l.poster:"";return{slug:t,idMovie:typeof l.id_movie=="number"?l.id_movie:n?parseInt(n[1],10):0,title:typeof l.title=="string"&&l.title.trim()?l.title.trim():i?we(i[1]).trim():e&&e.title?e.title:t,year:typeof l.year=="string"||typeof l.year=="number"?String(l.year):o?we(o[1]).trim():e&&e.year?e.year:"",poster:ut(s)||(u?ut(we(u[1])):"")||(e&&e.poster?ut(e.poster):"")}}async function Si(){if(Mi)return Mi;let t=cf().filter(e=>!NS(e)||!e.idMovie);return t.length?(Mi=(async()=>{let e=!1;for(let a of t)try{let l=await fy(a.slug,a);l.idMovie&&l.idMovie!==a.idMovie&&(a.idMovie=l.idMovie,e=!0),l.title&&l.title!==a.title&&(a.title=l.title,e=!0),l.year&&l.year!==a.year&&(a.year=l.year,e=!0),l.poster&&l.poster!==a.poster&&(a.poster=l.poster,e=!0)}catch(l){console.warn(`[${c}] Failed to refresh movie metadata for ${a.slug}.`,l)}e&&on()})().finally(()=>{Mi=null}),Mi):Promise.resolve()}function Ti(t){if(!t||!t.slug)return;let e={slug:t.slug,title:t.title||t.slug,year:t.year||"",poster:t.poster||"",idMovie:t.idMovie||0};fy(t.slug,t).then(a=>{a.title&&(e.title=a.title),a.year&&(e.year=a.year),a.poster&&(e.poster=a.poster),a.idMovie&&(e.idMovie=a.idMovie),d.movieWatchlistStore.movies[t.slug]=rn(t.slug,{slug:t.slug,title:e.title,year:e.year,poster:e.poster,idMovie:e.idMovie,href:t.href||`/movies/view/${t.slug}`,addedAt:Date.now(),watched:!1}),on(),$t()})}function xi(t){ea(t)&&(delete d.movieWatchlistStore.movies[t],on())}function Gg(t){let e=ea(t);e&&(e.watched=!e.watched,e.watchedAt=e.watched?Date.now():void 0,on())}function dy(t){try{let a=new URL(t,location.origin).pathname.match(/\/shows\/view\/([^/?#]+)/i);return a?a[1]:""}catch{return""}}function CS(t){try{let e=new URL(t,location.origin),a=et(e.searchParams.get("season")),l=et(e.searchParams.get("episode")),n=et(e.searchParams.get("id_episode"));return!a||!l||!n?null:{season:a,episode:l,idEpisode:n}}catch{return null}}function Du(t){let e=typeof t=="string"?t.match(/-(\d{4})$/):null;return e?e[1]:""}function py(t){try{let a=new URL(t,location.origin).pathname.match(/\/movies\/view\/([^/?#]+)/i);return a?a[1]:""}catch{return""}}function Oi(t){if(!t)return null;let e=t.querySelector('a[href*="/shows/view/"]');if(!e)return null;let a=dy(e.getAttribute("href"));if(!a)return null;let l=t.querySelector(".mv-item-infor h6"),n=t.querySelector("img[data-src], img[src]"),i=CS(e.getAttribute("href"));return{slug:a,title:l?l.textContent.trim():a,year:Du(a),poster:la(n),href:new URL(e.getAttribute("href"),location.origin).href,episode:i}}function Wg(t,e){return t?e?`/shows/view/${t}?season=${e.season}&episode=${e.episode}&id_episode=${e.idEpisode}`:`/shows/view/${t}`:"/shows"}function il(t,e){return t?e?`/shows/play/${t}#S${e.season}-E${e.episode}-${e.idEpisode}`:`/shows/view/${t}`:"/shows"}function $u(t){return t?`/movies/view/${t}`:"/movies"}function Ci(){return location.pathname==="/shows"}function my(){return location.pathname.startsWith("/shows/view/")}function Pr(){return location.pathname.startsWith("/movies/play/")}function hy(){return location.pathname.startsWith("/movies/view/")}function $S(){if(!my())return null;let t=window.show_storage||{},e=typeof t.slug=="string"&&t.slug?t.slug:dy(location.href);if(!e)return null;let a=document.querySelector(".movie-single-ct h1")||document.querySelector(".movie-single-ct h2")||document.querySelector(".internal-page-container h1")||document.querySelector(".internal-page-container h2"),l=document.querySelector('.movie__poster[style*="background-image"]')||document.querySelector(".movie__poster[data-background-image]")||document.querySelector(".movie-single-ct img[data-src], .movie-single-ct img[src]")||document.querySelector(".internal-page-container img[data-src], .internal-page-container img[src]"),n=document.querySelector('meta[property="og:image"]'),i=new URLSearchParams(location.search),o=Mt({season:i.get("season"),episode:i.get("episode"),idEpisode:i.get("id_episode")});return{slug:e,title:typeof t.title=="string"&&t.title.trim()?t.title.trim():a?a.textContent.replace(/\s*\d{4}\s*$/,"").trim():e,year:typeof t.year=="string"||typeof t.year=="number"?String(t.year):Du(e),poster:typeof t.poster_medium=="string"&&t.poster_medium?t.poster_medium:la(l)||n?.getAttribute("content")||"",idShow:et(t.id_show),episode:o}}function RS(t){if(!t)return null;let e=t.querySelector('a[href*="/movies/view/"]');if(!e)return null;let a=py(e.getAttribute("href"));if(!a)return null;let l=t.querySelector(".slide-item__title, .mv-item-infor h6, h6, h5, .title"),n=t.querySelector("img[data-src-portrait], img[data-src], img[src]"),i=t.querySelector('[data-background-image], [style*="background-image"], [data-src-portrait], [data-src]'),o=t.querySelector(".year"),u=l?l.textContent.trim():"",s=u.match(/\((\d{4})\)/),p=la(n)||la(i);return{slug:a,title:u?u.replace(/\s*\(\d{4}\)\s*$/,"").trim():a,year:o?o.textContent.trim():s?.[1]||Du(a),poster:p,href:new URL(e.getAttribute("href"),location.origin).href}}function US(){if(!hy())return null;let t=py(location.href);if(!t)return null;let e=window.movie_storage||window.movie||{},a=document.querySelector(".movie-single-ct h1")||document.querySelector(".movie-single-ct h2")||document.querySelector(".internal-page-container h1")||document.querySelector(".internal-page-container h2"),l=document.querySelector('.movie__poster[data-background-image], .movie__poster[style*="background-image"], .movie-single-ct img[data-src], .movie-single-ct img[src], .internal-page-container img[data-src], .internal-page-container img[src]'),n=document.querySelector('meta[property="og:image"]');return{slug:t,title:typeof e.title=="string"&&e.title.trim()?e.title.trim():a?a.textContent.trim():t,year:typeof e.year=="string"||typeof e.year=="number"?String(e.year):Du(t),poster:ut(typeof e.movie_poster=="string"&&e.movie_poster?e.movie_poster:typeof e.poster_medium=="string"&&e.poster_medium?e.poster_medium:"")||la(l)||ut(n?.getAttribute("content")||""),href:location.href}}function ff(t){let e=t.dataset.watchlistSlug||"",a=Oe(e),l=Mt({season:t.dataset.season,episode:t.dataset.episode,idEpisode:t.dataset.idEpisode}),n="add",i="+ Watch",o="Add this show to your watchlist";if(a){let u=l&&(!a.lastWatched||xe(l,a.lastWatched)>0);n=u?"watching-new":"watching",i="Watching",o=u?"This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.":"This show is already in your watchlist. Click to remove it."}t.dataset.state!==n&&(t.dataset.state=n),t.textContent!==i&&(t.textContent=i),t.title!==o&&(t.title=o),t.disabled&&(t.disabled=!1)}function Da(){document.querySelectorAll(`.${c}-episode-watch-button`).forEach(ff)}function df(t){let e=t.dataset.watchlistSlug||"",a=Oe(e),l=Mt({season:t.dataset.season,episode:t.dataset.episode,idEpisode:t.dataset.idEpisode});if(!a){t.dataset.state="add",t.textContent="+ Add To Watchlist",t.title="Add this show to your watchlist",t.disabled=!1;return}let n=l&&(!a.lastWatched||xe(l,a.lastWatched)>0);t.dataset.state=n?"watching-new":"watching",t.textContent=n?"Watching: New Episode":"Watching",t.title=n?"This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.":"This show is already in your watchlist. Click to remove it.",t.disabled=!1}function $i(){document.querySelectorAll(`.${c}-show-view-watch-button`).forEach(df)}function pf(t){let e=t.dataset.watchlistSlug||"",a=ea(e);if(!a){t.dataset.state="add",t.textContent="+ Movie",t.title="Add this movie to your watchlist",t.disabled=!1;return}t.dataset.state=a.watched?"watching":"watching-new",t.textContent=a.watched?"Watched":"Movie List",t.title=a.watched?"This movie is marked watched. Click to remove it from your movie watchlist.":"This movie is in your movie watchlist. Click to remove it.",t.disabled=!1}function zi(){document.querySelectorAll(`.${c}-movie-watch-button`).forEach(pf)}function mf(t){let e=t.dataset.watchlistSlug||"",a=ea(e);if(!a){t.dataset.state="add",t.textContent="+ Add Movie To Watchlist",t.title="Add this movie to your watchlist",t.disabled=!1;return}t.dataset.state=a.watched?"watching":"watching-new",t.textContent=a.watched?"Movie Watched":"In Movie Watchlist",t.title=a.watched?"This movie is marked watched. Click to remove it from your movie watchlist.":"This movie is in your movie watchlist. Click to remove it.",t.disabled=!1}function Ni(){document.querySelectorAll(`.${c}-movie-view-watch-button`).forEach(mf)}function gy(t,e="auto"){return!t||!t.slug||!t.episode?null:{slug:t.slug,title:t.title||t.slug,href:t.href||"",episode:t.episode,seenAt:Date.now(),source:e}}function yy(t,e){return!!t&&!!e&&t.slug===e.slug&&Pu(t.episode,e.episode)}function hf(t){return Array.from(document.querySelectorAll(".episode-item")).indexOf(t)}function gf(){if(!document.body||!Ci())return;document.querySelectorAll(`.episode-item.${c}-shows-list-marker`).forEach(e=>{e.classList.remove(`${c}-shows-list-marker`),e.removeAttribute("data-lookmovie-list-marker")}),d.showsListProgressOrder=-1;let t=d.showsListProgress;t&&document.querySelectorAll(".episode-item").forEach(e=>{let a=Oi(e);yy(a,t)&&(e.classList.add(`${c}-shows-list-marker`),e.dataset.lookmovieListMarker="true",d.showsListProgressOrder=hf(e))})}function vy(t){let e=Oi(t.closest(".episode-item")),a=yy(e,d.showsListProgress),l=a?"current":"set",n=a?"Bookmarked":"Set bookmark",i=a?"This is the current shows-page bookmark.":"Set the yellow shows-page bookmark here.";t.dataset.state!==l&&(t.dataset.state=l),t.textContent!==n&&(t.textContent=n),t.title!==i&&(t.title=i)}function DS(){document.querySelectorAll(`.${c}-shows-list-marker-button`).forEach(vy)}function LS(t){let e=gy(Oi(t),"manual");e&&(d.showsListProgress=e,d.showsListProgressOrder=hf(t),d.showsListSeenCandidate=null,d.showsListSeenCandidateOrder=-1,d.showsListManualMarkerSet=!0,ac(e),gf(),DS())}function BS(){if(d.showsListManualMarkerSet||d.showsListProgress?.source==="manual")return;let t=Qi(d.showsListSeenCandidate);t&&(d.showsListProgress&&!d.showsListSessionTouched&&(d.showsListProgressOrder<0||d.showsListSeenCandidateOrder<d.showsListProgressOrder)||(d.showsListProgress=t,ac(t),gf()))}function Lu(t){t&&t.persist&&BS(),d.showsListObserver&&d.showsListObserver.disconnect(),d.showsListMutationObserver&&d.showsListMutationObserver.disconnect(),d.showsListObserver=null,d.showsListMutationObserver=null,d.showsListRefreshScheduled=!1,d.showsListObservedCards=new WeakSet,d.showsListSeenCandidate=null,d.showsListSeenCandidateOrder=-1,d.showsListSessionTouched=!1,d.showsListManualMarkerSet=!1}function HS(t){let e=Oi(t),a=gy(e);if(!a)return;let l=hf(t);l<d.showsListSeenCandidateOrder||(d.showsListSeenCandidate=a,d.showsListSeenCandidateOrder=l)}function by(){!document.body||!Ci()||!d.showsListObserver||(gf(),document.querySelectorAll(".episode-item").forEach(t=>{d.showsListObservedCards.has(t)||(d.showsListObservedCards.add(t),d.showsListObserver.observe(t))}))}function qS(){d.showsListRefreshScheduled||(d.showsListRefreshScheduled=!0,window.setTimeout(()=>{d.showsListRefreshScheduled=!1,by()},150))}function Bu(){!document.body||!Ci()||typeof IntersectionObserver!="function"||(d.showsListObserver||(d.showsListObserver=new IntersectionObserver(t=>{t.filter(e=>e.isIntersecting).forEach(e=>HS(e.target))},{threshold:.55})),d.showsListMutationObserver||(d.showsListMutationObserver=new MutationObserver(()=>{qS()}),d.showsListMutationObserver.observe(document.body,{childList:!0,subtree:!0})),by())}function Sy(){Ci()&&(d.showsListSessionTouched=!0)}function yf(){!document.body||!Ci()||document.querySelectorAll(".episode-item").forEach(t=>{let e=Oi(t);if(!e)return;let a=t.querySelector(`.${c}-episode-watch-button`);a||(a=document.createElement("button"),a.type="button",a.className=`${c}-episode-watch-button`,t.appendChild(a),a.addEventListener("click",async n=>{n.preventDefault(),n.stopPropagation();let i=a.dataset.watchlistSlug;if(i){if(Oe(i)){_i(i);return}a.dataset.state="adding",a.textContent="Adding...",a.disabled=!0,await Ai({slug:i,title:a.dataset.title||i,year:a.dataset.year||"",poster:a.dataset.poster||"",episode:Mt({season:a.dataset.season,episode:a.dataset.episode,idEpisode:a.dataset.idEpisode})}),ff(a)}})),a.dataset.watchlistSlug=e.slug,a.dataset.title=e.title,a.dataset.year=e.year,a.dataset.poster=e.poster,e.episode&&(a.dataset.season=String(e.episode.season),a.dataset.episode=String(e.episode.episode),a.dataset.idEpisode=String(e.episode.idEpisode)),ff(a);let l=t.querySelector(`.${c}-shows-list-marker-button`);l||(l=document.createElement("button"),l.type="button",l.className=`${c}-shows-list-marker-button`,t.appendChild(l),l.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),LS(t)})),vy(l)})}function vf(){if(!document.body||!my())return;let t=$S();if(!t)return;let e=document.querySelector(".watch-heading")||document.querySelector(".movie-single-ct.main-content")||document.querySelector(".internal-page-container");if(!e)return;let a=document.querySelector(`.${c}-show-view-watch-wrap`);a||(a=document.createElement("div"),a.className=`${c}-show-view-watch-wrap`,e.appendChild(a));let l=a.querySelector(`.${c}-show-view-watch-button`);l||(l=document.createElement("button"),l.type="button",l.className=`${c}-show-view-watch-button`,a.appendChild(l),l.addEventListener("click",async()=>{let n=l.dataset.watchlistSlug;if(n){if(Oe(n)){_i(n);return}l.dataset.state="adding",l.textContent="Adding...",l.disabled=!0,await Ai({slug:n,title:l.dataset.title||n,year:l.dataset.year||"",poster:l.dataset.poster||"",episode:Mt({season:l.dataset.season,episode:l.dataset.episode,idEpisode:l.dataset.idEpisode})}),df(l)}})),l.dataset.watchlistSlug=t.slug,l.dataset.title=t.title,l.dataset.year=t.year,l.dataset.poster=t.poster,t.episode?(l.dataset.season=String(t.episode.season),l.dataset.episode=String(t.episode.episode),l.dataset.idEpisode=String(t.episode.idEpisode)):(delete l.dataset.season,delete l.dataset.episode,delete l.dataset.idEpisode),df(l)}function bf(){!document.body||Pr()||document.querySelectorAll('a[href*="/movies/view/"]').forEach(t=>{let e=t.closest(".slide-item")||t.closest(".movie-item")||t.closest(".mv-item")||t.closest(".movie-item-style-2")||t.closest(".slide-item__backdrop--wrapper")||t.closest(".item")||t.parentElement,a=RS(e);if(!a||!e)return;let l=e.querySelector(".slide-item__buttons")||e.querySelector(".image__placeholder")||e,n=l.querySelector(`.${c}-movie-watch-button`);n||(n=document.createElement("button"),n.type="button",n.className=`${c}-movie-watch-button ${c}-episode-watch-button`,l.appendChild(n),getComputedStyle(l).position==="static"&&(l.style.position="relative"),n.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation();let o=n.dataset.watchlistSlug;if(o){if(ea(o)){xi(o);return}Ti({slug:o,title:n.dataset.title||o,year:n.dataset.year||"",poster:n.dataset.poster||"",href:n.dataset.href||$u(o)}),pf(n)}})),n.dataset.watchlistSlug=a.slug,n.dataset.title=a.title,n.dataset.year=a.year,n.dataset.poster=a.poster,n.dataset.href=a.href,pf(n)})}function Sf(){if(!document.body||!hy())return;let t=US();if(!t)return;let e=document.querySelector(".watch-heading")||document.querySelector(".movie-single-ct.main-content")||document.querySelector(".internal-page-container");if(!e)return;let a=document.querySelector(`.${c}-movie-view-watch-wrap`);a||(a=document.createElement("div"),a.className=`${c}-show-view-watch-wrap ${c}-movie-view-watch-wrap`,e.appendChild(a));let l=a.querySelector(`.${c}-movie-view-watch-button`);l||(l=document.createElement("button"),l.type="button",l.className=`${c}-show-view-watch-button ${c}-movie-view-watch-button`,a.appendChild(l),l.addEventListener("click",()=>{let n=l.dataset.watchlistSlug;if(n){if(ea(n)){xi(n);return}Ti({slug:n,title:l.dataset.title||n,year:l.dataset.year||"",poster:l.dataset.poster||"",href:l.dataset.href||$u(n)}),mf(l)}})),l.dataset.watchlistSlug=t.slug,l.dataset.title=t.title,l.dataset.year=t.year,l.dataset.poster=t.poster,l.dataset.href=t.href,mf(l)}function Uu(){return Object.values(d.watchlistStore.shows)}function Oe(t){return t&&d.watchlistStore.shows[t]||null}function YS(t){return t&&Uu().find(e=>e.idShow===t)||null}function ly(t){return[...t].sort((e,a)=>{let l=e.latestEpisode?$e(e)?1:0:2,n=a.latestEpisode?$e(a)?1:0:2;return l!==n?l-n:e.title.localeCompare(a.title)})}function jS(t,e){return t?!t.idShow||!t.latestEpisode||!t.upcoming?!0:!t.lastSyncedAt||e-t.lastSyncedAt>=Uf:!1}function ol(){Pf(d.watchlistStore),$t(),$a(),Da(),$i()}function Pt(t,e){d.watchlistMessage=t||"",d.watchlistMessageTone=e||"muted",$t()}async function wy(t,e){let a=await Vi(`/shows/view/${t}`),l=a.match(/id_show:\s*(\d+)/),n=a.match(/title:\s*'((?:\\'|[^'])*)'/),i=a.match(/year:\s*'((?:\\'|[^'])*)'/),o=a.match(/poster_medium:\s*'((?:\\'|[^'])*)'/);return{slug:t,idShow:l?et(l[1]):0,title:n?we(n[1]).trim():e&&e.title?e.title:t,year:i?we(i[1]).trim():e&&e.year?e.year:"",poster:o?we(o[1]).trim():e&&e.poster?e.poster:""}}async function wf(t){let e=await Gi(`/api/v2/download/episode/list?id=${t}`),a=[];Object.entries(e&&e.list||{}).forEach(([i,o])=>{Object.entries(o||{}).forEach(([u,s])=>{let p=Mt({season:i,episode:u,idEpisode:s&&s.id_episode});p&&a.push(p)})}),a.sort(xe);let l=e&&e.latest?e.latest:null,n=Mt({season:l&&l.season,episode:l&&l.episode,idEpisode:l&&l.id_episode});return n&&(n.updatedAt=Date.now()),{latestEpisode:n,episodes:a}}function VS(t,e){let a=e?t.findIndex(n=>xe(n,e)>0):0,l=a<0?[]:t.slice(a);return{afterIdEpisode:e?e.idEpisode:0,total:l.length,episodes:l.slice(0,Hf).map(({season:n,episode:i,idEpisode:o})=>({season:n,episode:i,idEpisode:o}))}}function uf(t){let e=t&&t.upcoming;if(!e)return null;let a=t.lastWatched?t.lastWatched.idEpisode:0;if(e.afterIdEpisode===a)return e;if(!t.lastWatched)return null;let l=e.episodes.findIndex(n=>xe(n,t.lastWatched)>0);return l<0?e.episodes.length===e.total?{afterIdEpisode:a,total:0,episodes:[]}:null:l===0?null:{afterIdEpisode:a,total:e.total-l,episodes:e.episodes.slice(l)}}function xy(t){t.upcoming&&!uf(t)&&ta({force:!0,slugs:[t.slug]})}async function Ai(t){if(!t||!t.slug)return;let e=Oe(t.slug);if(e){Pt(`${e.title} is already in your watchlist.`,"muted"),Da();return}Pt(`Adding ${t.title||t.slug}...`,"muted");let a={slug:t.slug,idShow:0,title:t.title||t.slug,year:t.year||"",poster:t.poster||""};try{a=await wy(t.slug,t)}catch(l){console.warn(`[${c}] Failed to resolve show metadata for ${t.slug}.`,l)}d.watchlistStore.shows[t.slug]=sn(t.slug,{slug:t.slug,idShow:a.idShow,title:a.title||t.title||t.slug,year:a.year||t.year||"",poster:a.poster||t.poster||"",addedAt:Date.now(),latestEpisode:t.episode||null,lastSyncedAt:0}),ol(),Pt(`${a.title||t.title||t.slug} added to your watchlist.`,"success"),await ta({force:!0,slugs:[t.slug]})}function _i(t){let e=Oe(t);e&&(delete d.watchlistStore.shows[t],ol(),Pt(`${e.title} removed from your watchlist.`,"muted"))}function Fg(t){let e=Oe(t);!e||!e.latestEpisode||($e(e)?(e.lastWatched=null,Pt(`${e.title} marked as having an unwatched latest episode.`,"muted")):(e.lastWatched={...e.latestEpisode,watchedAt:Date.now()},Pt(`${e.title} marked watched through ${Rt(e.latestEpisode)}.`,"success")),ol(),xy(e))}async function ta(t){let e=!!(t&&t.force),a=t&&Array.isArray(t.slugs)?new Set(t.slugs):null;if(d.watchlistRefreshPromise)return d.watchlistRefreshPromise;let l=Date.now(),n=Uu().filter(i=>a&&!a.has(i.slug)?!1:e||jS(i,l));return n.length?(d.watchlistBusy=!0,Pt(`Refreshing ${n.length} watchlist ${n.length===1?"show":"shows"}...`,"muted"),d.watchlistRefreshPromise=(async()=>{for(let i of n)try{if(!i.idShow){let s=await wy(i.slug,i);i.idShow=s.idShow,i.title=s.title||i.title,i.year=s.year||i.year,i.poster=s.poster||i.poster}if(!i.idShow)throw new Error("Unable to resolve show id.");let{latestEpisode:o,episodes:u}=await wf(i.idShow);i.latestEpisode=o,i.upcoming=VS(u,i.lastWatched),i.lastSyncError="",i.lastSyncedAt=Date.now()}catch(o){i.lastSyncError=o instanceof Error?o.message:String(o),i.lastSyncedAt=Date.now(),console.warn(`[${c}] Failed to refresh ${i.slug}.`,o)}ol(),Pt("Watchlist refreshed.","success")})().catch(i=>{console.warn(`[${c}] Watchlist refresh failed.`,i),Pt("Watchlist refresh failed.","danger")}).finally(()=>{d.watchlistBusy=!1,$t(),Da(),d.watchlistRefreshPromise=null}),d.watchlistRefreshPromise):($t(),Da(),Promise.resolve())}function xf(){let t=et(window.id_show);if(t)return t;let e=Array.from(document.scripts).find(l=>/id_show:\s*\d+/.test(l.textContent||"")),a=e?e.textContent.match(/id_show:\s*(\d+)/):null;return a?et(a[1]):0}function GS(){if(!location.pathname.startsWith("/shows/play/"))return null;let t=location.hash.match(/^#S(\d+)-E(\d+)-(\d+)$/i);if(!t)return null;let e=xf(),a=et(t[1]),l=et(t[2]),n=et(t[3]);return!e||!a||!l||!n?null:{idShow:e,season:a,episode:l,idEpisode:n}}function Ey(){let t=GS();if(!t)return;let e=`${t.idShow}:${t.idEpisode}`;if(e===d.lastTrackedEpisodeSignature)return;let a=YS(t.idShow);a&&(a.lastWatched={season:t.season,episode:t.episode,idEpisode:t.idEpisode,watchedAt:Date.now()},(!a.latestEpisode||xe(a.lastWatched,a.latestEpisode)>0)&&(a.latestEpisode={season:t.season,episode:t.episode,idEpisode:t.idEpisode,updatedAt:Date.now()}),d.lastTrackedEpisodeSignature=e,ol(),xy(a),Pt(`${a.title} updated to watched through ${Rt(a.lastWatched)}.`,"success"))}var Hu=`${c}-autonext`,Ef=0,un=null;function QS(){let t=location.hash.match(/^#S(\d+)-E(\d+)-(\d+)$/i);return t?{season:Number(t[1]),episode:Number(t[2]),idEpisode:Number(t[3])}:null}async function XS(){let t=xf(),e=QS();if(!t||!e)return null;let{episodes:a}=await wf(t);return a.find(l=>xe(l,e)>0)||null}function cn(){window.clearInterval(Ef),Ef=0,un&&(un.remove(),un=null)}function Ty(){cn(),_u()}function ZS(t){let e=document.createElement("div");e.className=Hu,e.setAttribute("role","status");let a=document.createElement("p");a.append("Up next: ");let l=document.createElement("strong");l.textContent=Rt(t),a.append(l," in ");let n=document.createElement("span");n.className=`${Hu}-seconds`,a.append(n,"s");let i=document.createElement("button");i.type="button",i.className=`${Hu}-play`,i.textContent="Play now",i.addEventListener("click",u=>{u.stopPropagation(),Ty()});let o=document.createElement("button");return o.type="button",o.textContent="Cancel",o.addEventListener("click",u=>{u.stopPropagation(),cn()}),e.append(a,i,o),e}async function Ay(){if(!d.settings.autoNextEpisode||!location.pathname.startsWith("/shows/play/"))return!1;let t=location.hash,e=null;try{e=await XS()}catch(i){console.warn(`[${c}] Could not look up the next episode.`,i)}let a=document.getElementById("video_player");if(!e||!a||location.hash!==t)return!1;cn(),un=ZS(e),a.appendChild(un);let l=qf,n=un.querySelector(`.${Hu}-seconds`);return n.textContent=String(l),Ef=window.setInterval(()=>{l-=1,location.hash!==t?cn():l<=0?Ty():n.textContent=String(l)},1e3),!0}var Ce=`${c}-intro`,zy=1,_y=5,Tf=null,La=null,Af="",ee=null,My=0;function Li(){return Tf||(Tf=ud()),Tf}function ju(){let t=location.pathname.match(/^\/shows\/play\/(?:\d+-)?([^/?#]+)/i);return t?t[1].toLowerCase():""}function Bi(){let t=ju();return t&&Li()[t]||null}function Ri(t){let e=Math.max(0,Math.round(t));return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function qu(){return document.querySelector("#video_player video")}function Yu(t){if(!ee)return;let e=ee.querySelector(`.${Ce}-toast`);e.textContent=t,e.hidden=!1,window.clearTimeout(My),My=window.setTimeout(()=>{e.hidden=!0},2500)}function kS(t,e){let a=ju();a&&(Li()[a]={start:t,end:e,updatedAt:Date.now()},nc(Li()))}function KS(){let t=ju();t&&(delete Li()[t],nc(Li()))}function Ui(t,e,a){let l=document.createElement("button");return l.type="button",l.className=e,l.textContent=t,l.addEventListener("click",n=>{n.stopPropagation(),a()}),l}function Di(){let t=ee.querySelector(`.${Ce}-manage`);t.replaceChildren();let e=Bi(),a=`${Ce}-pill`;if(La!==null){t.append(Ui(`Mark intro end (from ${Ri(La)})`,a,()=>{let l=qu(),n=l?l.currentTime:0;if(n-La<_y){Yu(`Play past the intro first (at least ${_y}s).`);return}kS(La,n),La=null,Af=location.hash,Di(),Yu(`Intro saved: ${Ri(Bi().start)}\u2013${Ri(n)}`)}),Ui("\xD7",`${a} ${Ce}-cancel`,()=>{La=null,Di()}));return}if(e){let l=document.createElement("span");l.className=a,l.textContent=`Intro ${Ri(e.start)}\u2013${Ri(e.end)}`,t.append(l,Ui("Clear",`${a} ${Ce}-cancel`,()=>{KS(),Di(),Ny(qu()),Yu("Intro cleared for this show.")}));return}t.append(Ui("Mark intro start",a,()=>{let l=qu();La=l?l.currentTime:0,Di()}))}function Ny(t){if(!ee)return;let e=ee.querySelector(`.${Ce}-skip`),a=Bi(),l=t?t.currentTime:-1;e.hidden=!(a&&!d.settings.autoSkipIntro&&l>=a.start&&l<a.end-zy)}function JS(){let t=document.getElementById("video_player");if(!t||!ju())return null;if(ee&&ee.parentElement===t)return ee;ee=document.createElement("div"),ee.className=Ce;let e=Ui("Skip intro",`${Ce}-skip`,()=>{let n=qu(),i=Bi();n&&i&&(n.currentTime=i.end)});e.hidden=!0;let a=document.createElement("div");a.className=`${Ce}-manage`;let l=document.createElement("p");return l.className=`${Ce}-toast`,l.hidden=!0,ee.append(e,a,l),t.appendChild(ee),Di(),ee}function Oy(t){if(!location.pathname.startsWith("/shows/play/")||!JS())return;let e=Bi(),a=t.currentTime;e&&d.settings.autoSkipIntro&&Af!==location.hash&&La===null&&a>=e.start&&a<e.end-zy&&(Af=location.hash,t.currentTime=e.end,Yu("Skipped intro")),Ny(t)}function ye(){let t=document.getElementById("video_player"),e=t?Array.from(t.querySelectorAll("video")):[],a=[...new Set([...e,...Array.from(document.querySelectorAll("video"))])].filter(l=>{let n=l.getBoundingClientRect();return n.width>0&&n.height>0});return a.find(l=>!l.paused&&!l.ended)||a.find(l=>l.readyState>0)||a[0]||null}function pg(){let t=ye();return t?(t.play(),!0):!1}function mg(){let t=ye();return t?(t.pause(),!0):!1}function hg(){let t=ye();return t?(t.paused?t.play():t.pause(),!0):!1}function gg(t){let e=ye();if(!e||!Number.isFinite(t))return!1;let a=Number.isFinite(e.duration)?e.duration:Number.MAX_SAFE_INTEGER;return e.currentTime=Math.max(0,Math.min(a,e.currentTime+t)),!0}function yg(t){let e=ye();return!e||!Number.isFinite(t)?!1:(e.volume=Math.max(0,Math.min(1,t/100)),e.muted=!1,!0)}function Wr(t){let e=ye();return e?(e.muted=!!t,!0):!1}function vg(){let t=document.getElementById("video_player"),e=t?.querySelector(".vjs-fullscreen-control"),a=!!document.getElementById(ul),l=!!document.fullscreenElement,n=!!t?.classList.contains("vjs-fullscreen");return a||l||n?(a&&an(),l&&typeof document.exitFullscreen=="function"&&document.exitFullscreen(),n&&e&&e.click(),d.fullscreenTriggered=!1,!0):$y()}function $y(){let t=document.getElementById("video_player");if(document.getElementById(ul)||document.fullscreenElement||t?.classList.contains("vjs-fullscreen"))return!0;if(!t)return!1;let e=t.querySelector(".vjs-fullscreen-control");if(e&&e.click(),d.settings.windowedFullscreen)t2();else if(!e)return!1;return d.fullscreenTriggered=!0,!0}function Cy(t){try{let e=new URL(t,location.origin);if(!e.pathname.startsWith("/shows/play/"))return null;let a=e.hash.match(/^#S(\d+)-E(\d+)-(\d+)$/i);return a?{href:e.href,season:Number(a[1]),episode:Number(a[2]),idEpisode:Number(a[3])}:null}catch{return null}}function WS(){let t=location.hash;try{window.dispatchEvent(new Event("switch-next-episode"))}catch{return!1}return location.hash!==t}function FS(){let t=Cy(location.href);if(!t)return!1;let e=Array.from(document.querySelectorAll('a[href*="/shows/play/"]')).map(a=>Cy(a.getAttribute("href"))).filter(a=>a?a.season>t.season?!0:a.season===t.season&&a.episode>t.episode:!1).sort((a,l)=>a.season-l.season||a.episode-l.episode)[0];return e?(location.href=e.href,!0):!1}function _u(){return location.pathname.startsWith("/shows/play/")?WS()||FS():!1}function IS(){if(!d.settings.autoPlay)return!1;let t=document.getElementById("progress-continue-button"),e=document.getElementById("progress-from-beginning-button"),a=Number.parseFloat(document.getElementById("progress-bar")?.style.width),l=Number.isFinite(a)&&a>=ji?e||t:t||e;return l?(console.log(`[${c}] Dismissing playback modal (${l.id}).`),l.click(),!0):!1}function PS(){let t=document.getElementById("video_player");if(!t)return!1;let e=document.getElementById(Se);if(e||(e=document.createElement("button"),e.id=Se,e.type="button",e.textContent="Exit",e.setAttribute("aria-label","Exit windowed fullscreen"),e.title="Exit windowed fullscreen",e.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation(),an(),d.fullscreenTriggered=!1})),e.parentElement!==t&&t.appendChild(e),!t._lookmovieFullscreenExitActivityAttached){let a=()=>{window.clearTimeout(t._lookmovieFullscreenExitActivityTimer),t.classList.add(`${c}-fullscreen-exit-active`),t._lookmovieFullscreenExitActivityTimer=window.setTimeout(()=>{t.classList.remove(`${c}-fullscreen-exit-active`)},1600)};t._lookmovieFullscreenExitActivityAttached=!0,t.addEventListener("pointermove",a)}return!0}function t2(){if(!document.head)return!1;if(!document.getElementById(ul)){let t=document.createElement("style");t.id=ul,t.textContent=`
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

            #video_player.${c}-fullscreen-exit-active {
                cursor: auto !important;
            }

            body.${c}-fullscreen {
                overflow: hidden !important;
            }

            #${Se} {
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

            #video_player.${c}-fullscreen-exit-active #${Se},
            #${Se}:hover,
            #${Se}:focus-visible {
                opacity: 1 !important;
                pointer-events: auto !important;
                transform: translateY(0) !important;
            }

            #${Se}:hover,
            #${Se}:focus-visible {
                border-color: rgba(125, 211, 252, 0.78) !important;
            }
        `,document.head.appendChild(t)}return PS(),document.body&&document.body.classList.add(`${c}-fullscreen`),!0}function an(){let t=document.getElementById(ul);t&&t.remove();let e=document.getElementById("video_player");e&&(window.clearTimeout(e._lookmovieFullscreenExitActivityTimer),e.classList.remove(`${c}-fullscreen-exit-active`));let a=document.getElementById(Se);a&&a.remove(),document.body&&document.body.classList.remove(`${c}-fullscreen`)}function e2(){return!d.settings.autoFullscreen||d.fullscreenTriggered?!1:(console.log(`[${c}] Applying fullscreen behavior.`),$y())}function a2(){cn(),Ey(),gi("play"),!(!d.settings.autoPlay&&!d.settings.autoFullscreen)&&window.setTimeout(()=>{let t=IS();window.setTimeout(()=>{e2()},t?500:200)},300)}function l2(){gi("pause")}function n2(){gi("ended"),window.setTimeout(()=>{Mg()||Ay()},750)}function _f(t){!t||t._lookmovieEnhancerAttached||(t._lookmovieEnhancerAttached=!0,t.addEventListener("play",a2),t.addEventListener("pause",l2),t.addEventListener("ended",n2),t.addEventListener("timeupdate",()=>{t.closest("#video_player")&&Oy(t)}))}function Mf(){document.querySelectorAll("video").forEach(_f)}function Ry(){let t=window.setInterval(()=>{if(!document.body)return;window.clearInterval(t),Mf(),new MutationObserver(a=>{a.forEach(l=>{l.type==="childList"&&l.addedNodes.forEach(n=>{!n||n.nodeType!==Node.ELEMENT_NODE||(n.tagName==="VIDEO"&&_f(n),typeof n.querySelectorAll=="function"&&n.querySelectorAll("video").forEach(_f))})})}).observe(document.body,{childList:!0,subtree:!0})},100)}var Dy=".player-pre-init-ads",i2=".pre-init-ads--close, .pre-init-ads--back-button";function o2(){window.__lookmovie2EnhancerAdBypass||(window.__lookmovie2EnhancerAdBypass=!0,Object.defineProperty(window,"_preInitAdsTimestamp",{configurable:!0,get:()=>Date.now(),set:()=>{}}))}function u2(t){let e=document.createElement("script");e.textContent=t,(document.head||document.documentElement).appendChild(e),e.remove()}function c2(){if(document.getElementById(Fu)||!document.documentElement)return;let t=document.createElement("style");t.id=Fu,t.textContent=".ad-container { display: none !important; }",(document.head||document.documentElement).appendChild(t)}function Uy(){let t=document.querySelector(Dy);if(!t||t.classList.contains("tw-hidden"))return!1;let e=t.querySelector(i2);return e?(e.click(),console.info(`[${c}] Skipped ad countdown.`),!0):!1}function Ly(){try{u2(`(${o2.toString()})();`)}catch(t){console.warn(`[${c}] Failed to install ad timer bypass.`,t)}c2()}function By(){let t=document.querySelector(Dy);t&&(Uy(),new MutationObserver(Uy).observe(t,{attributes:!0,attributeFilter:["class"]}))}function s2(){window.setInterval(()=>{if(location.href===d.lastKnownUrl)return;new URL(d.lastKnownUrl,location.origin).pathname==="/shows"?Lu({persist:!0}):Lu(),d.lastKnownUrl=location.href,d.fullscreenTriggered=!1,d.lastTrackedEpisodeSignature="",an(),Mf(),rf(),$t(),Da(),yf(),Bu(),$i(),vf(),zi(),bf(),Ni(),Sf(),Si(),ta()},Df)}function zf(){if(d.domBootstrapped)return;d.domBootstrapped=!0,By(),Ry(),Au(),s2(),window.addEventListener("scroll",Sy,{passive:!0}),window.addEventListener("pagehide",()=>Lu({persist:!0}));let t=window.setInterval(()=>{d.uiBootAttempts+=1,rf(),yf(),Bu(),vf(),bf(),Sf(),(document.getElementById(S)||d.uiBootAttempts>100)&&window.clearInterval(t)},100);$t(),$a(),Da(),Bu(),$i(),zi(),Ni(),Si(),ta()}Ly();Mu();jg();document.readyState==="loading"?document.addEventListener("DOMContentLoaded",zf,{once:!0}):zf();})();
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
