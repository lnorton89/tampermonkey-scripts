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


"use strict";(()=>{var Zy=Object.create;var Of=Object.defineProperty;var Ky=Object.getOwnPropertyDescriptor;var Jy=Object.getOwnPropertyNames;var Wy=Object.getPrototypeOf,Fy=Object.prototype.hasOwnProperty;var be=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Iy=(t,e,a,l)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Jy(e))!Fy.call(t,n)&&n!==a&&Of(t,n,{get:()=>e[n],enumerable:!(l=Ky(e,n))||l.enumerable});return t};var Z=(t,e,a)=>(a=t!=null?Zy(Wy(t)):{},Iy(e||!t||!t.__esModule?Of(a,"default",{value:t,enumerable:!0}):a,t));var bd=be(P=>{"use strict";function rc(t,e){var a=t.length;t.push(e);t:for(;0<a;){var l=a-1>>>1,n=t[l];if(0<Ji(n,e))t[l]=e,t[a]=n,a=l;else break t}}function xe(t){return t.length===0?null:t[0]}function Fi(t){if(t.length===0)return null;var e=t[0],a=t.pop();if(a!==e){t[0]=a;t:for(var l=0,n=t.length,i=n>>>1;l<i;){var o=2*(l+1)-1,u=t[o],s=o+1,p=t[s];if(0>Ji(u,a))s<n&&0>Ji(p,u)?(t[l]=p,t[s]=a,l=s):(t[l]=u,t[o]=a,l=o);else if(s<n&&0>Ji(p,a))t[l]=p,t[s]=a,l=s;else break t}}return e}function Ji(t,e){var a=t.sortIndex-e.sortIndex;return a!==0?a:t.id-e.id}P.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(rd=performance,P.unstable_now=function(){return rd.now()}):(uc=Date,fd=uc.now(),P.unstable_now=function(){return uc.now()-fd});var rd,uc,fd,Re=[],la=[],av=1,ee=null,_t=3,fc=!1,mn=!1,hn=!1,dc=!1,md=typeof setTimeout=="function"?setTimeout:null,hd=typeof clearTimeout=="function"?clearTimeout:null,dd=typeof setImmediate<"u"?setImmediate:null;function Wi(t){for(var e=xe(la);e!==null;){if(e.callback===null)Fi(la);else if(e.startTime<=t)Fi(la),e.sortIndex=e.expirationTime,rc(Re,e);else break;e=xe(la)}}function pc(t){if(hn=!1,Wi(t),!mn)if(xe(Re)!==null)mn=!0,dl||(dl=!0,fl());else{var e=xe(la);e!==null&&mc(pc,e.startTime-t)}}var dl=!1,gn=-1,gd=5,yd=-1;function vd(){return dc?!0:!(P.unstable_now()-yd<gd)}function cc(){if(dc=!1,dl){var t=P.unstable_now();yd=t;var e=!0;try{t:{mn=!1,hn&&(hn=!1,hd(gn),gn=-1),fc=!0;var a=_t;try{e:{for(Wi(t),ee=xe(Re);ee!==null&&!(ee.expirationTime>t&&vd());){var l=ee.callback;if(typeof l=="function"){ee.callback=null,_t=ee.priorityLevel;var n=l(ee.expirationTime<=t);if(t=P.unstable_now(),typeof n=="function"){ee.callback=n,Wi(t),e=!0;break e}ee===xe(Re)&&Fi(Re),Wi(t)}else Fi(Re);ee=xe(Re)}if(ee!==null)e=!0;else{var i=xe(la);i!==null&&mc(pc,i.startTime-t),e=!1}}break t}finally{ee=null,_t=a,fc=!1}e=void 0}}finally{e?fl():dl=!1}}}var fl;typeof dd=="function"?fl=function(){dd(cc)}:typeof MessageChannel<"u"?(sc=new MessageChannel,pd=sc.port2,sc.port1.onmessage=cc,fl=function(){pd.postMessage(null)}):fl=function(){md(cc,0)};var sc,pd;function mc(t,e){gn=md(function(){t(P.unstable_now())},e)}P.unstable_IdlePriority=5;P.unstable_ImmediatePriority=1;P.unstable_LowPriority=4;P.unstable_NormalPriority=3;P.unstable_Profiling=null;P.unstable_UserBlockingPriority=2;P.unstable_cancelCallback=function(t){t.callback=null};P.unstable_forceFrameRate=function(t){0>t||125<t?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):gd=0<t?Math.floor(1e3/t):5};P.unstable_getCurrentPriorityLevel=function(){return _t};P.unstable_next=function(t){switch(_t){case 1:case 2:case 3:var e=3;break;default:e=_t}var a=_t;_t=e;try{return t()}finally{_t=a}};P.unstable_requestPaint=function(){dc=!0};P.unstable_runWithPriority=function(t,e){switch(t){case 1:case 2:case 3:case 4:case 5:break;default:t=3}var a=_t;_t=t;try{return e()}finally{_t=a}};P.unstable_scheduleCallback=function(t,e,a){var l=P.unstable_now();switch(typeof a=="object"&&a!==null?(a=a.delay,a=typeof a=="number"&&0<a?l+a:l):a=l,t){case 1:var n=-1;break;case 2:n=250;break;case 5:n=1073741823;break;case 4:n=1e4;break;default:n=5e3}return n=a+n,t={id:av++,callback:e,priorityLevel:t,startTime:a,expirationTime:n,sortIndex:-1},a>l?(t.sortIndex=a,rc(la,t),xe(Re)===null&&t===xe(la)&&(hn?(hd(gn),gn=-1):hn=!0,mc(pc,a-l))):(t.sortIndex=n,rc(Re,t),mn||fc||(mn=!0,dl||(dl=!0,fl()))),t};P.unstable_shouldYield=vd;P.unstable_wrapCallback=function(t){var e=_t;return function(){var a=_t;_t=e;try{return t.apply(this,arguments)}finally{_t=a}}}});var wd=be((C2,Sd)=>{"use strict";Sd.exports=bd()});var $d=be(N=>{"use strict";var yc=Symbol.for("react.transitional.element"),lv=Symbol.for("react.portal"),nv=Symbol.for("react.fragment"),iv=Symbol.for("react.strict_mode"),ov=Symbol.for("react.profiler"),uv=Symbol.for("react.consumer"),cv=Symbol.for("react.context"),sv=Symbol.for("react.forward_ref"),rv=Symbol.for("react.suspense"),fv=Symbol.for("react.memo"),_d=Symbol.for("react.lazy"),dv=Symbol.for("react.activity"),xd=Symbol.iterator;function pv(t){return t===null||typeof t!="object"?null:(t=xd&&t[xd]||t["@@iterator"],typeof t=="function"?t:null)}var Md={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},zd=Object.assign,Nd={};function ml(t,e,a){this.props=t,this.context=e,this.refs=Nd,this.updater=a||Md}ml.prototype.isReactComponent={};ml.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};ml.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Cd(){}Cd.prototype=ml.prototype;function vc(t,e,a){this.props=t,this.context=e,this.refs=Nd,this.updater=a||Md}var bc=vc.prototype=new Cd;bc.constructor=vc;zd(bc,ml.prototype);bc.isPureReactComponent=!0;var Ed=Array.isArray;function gc(){}var J={H:null,A:null,T:null,S:null},Od=Object.prototype.hasOwnProperty;function Sc(t,e,a){var l=a.ref;return{$$typeof:yc,type:t,key:e,ref:l!==void 0?l:null,props:a}}function mv(t,e){return Sc(t.type,e,t.props)}function wc(t){return typeof t=="object"&&t!==null&&t.$$typeof===yc}function hv(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(a){return e[a]})}var Td=/\/+/g;function hc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?hv(""+t.key):e.toString(36)}function gv(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(gc,gc):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function pl(t,e,a,l,n){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(i){case"bigint":case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case yc:case lv:o=!0;break;case _d:return o=t._init,pl(o(t._payload),e,a,l,n)}}if(o)return n=n(t),o=l===""?"."+hc(t,0):l,Ed(n)?(a="",o!=null&&(a=o.replace(Td,"$&/")+"/"),pl(n,e,a,"",function(p){return p})):n!=null&&(wc(n)&&(n=mv(n,a+(n.key==null||t&&t.key===n.key?"":(""+n.key).replace(Td,"$&/")+"/")+o)),e.push(n)),1;o=0;var u=l===""?".":l+":";if(Ed(t))for(var s=0;s<t.length;s++)l=t[s],i=u+hc(l,s),o+=pl(l,e,a,i,n);else if(s=pv(t),typeof s=="function")for(t=s.call(t),s=0;!(l=t.next()).done;)l=l.value,i=u+hc(l,s++),o+=pl(l,e,a,i,n);else if(i==="object"){if(typeof t.then=="function")return pl(gv(t),e,a,l,n);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return o}function Ii(t,e,a){if(t==null)return t;var l=[],n=0;return pl(t,l,"","",function(i){return e.call(a,i,n++)}),l}function yv(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(a){(t._status===0||t._status===-1)&&(t._status=1,t._result=a)},function(a){(t._status===0||t._status===-1)&&(t._status=2,t._result=a)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Ad=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},vv={map:Ii,forEach:function(t,e,a){Ii(t,function(){e.apply(this,arguments)},a)},count:function(t){var e=0;return Ii(t,function(){e++}),e},toArray:function(t){return Ii(t,function(e){return e})||[]},only:function(t){if(!wc(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};N.Activity=dv;N.Children=vv;N.Component=ml;N.Fragment=nv;N.Profiler=ov;N.PureComponent=vc;N.StrictMode=iv;N.Suspense=rv;N.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=J;N.__COMPILER_RUNTIME={__proto__:null,c:function(t){return J.H.useMemoCache(t)}};N.cache=function(t){return function(){return t.apply(null,arguments)}};N.cacheSignal=function(){return null};N.cloneElement=function(t,e,a){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var l=zd({},t.props),n=t.key;if(e!=null)for(i in e.key!==void 0&&(n=""+e.key),e)!Od.call(e,i)||i==="key"||i==="__self"||i==="__source"||i==="ref"&&e.ref===void 0||(l[i]=e[i]);var i=arguments.length-2;if(i===1)l.children=a;else if(1<i){for(var o=Array(i),u=0;u<i;u++)o[u]=arguments[u+2];l.children=o}return Sc(t.type,n,l)};N.createContext=function(t){return t={$$typeof:cv,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:uv,_context:t},t};N.createElement=function(t,e,a){var l,n={},i=null;if(e!=null)for(l in e.key!==void 0&&(i=""+e.key),e)Od.call(e,l)&&l!=="key"&&l!=="__self"&&l!=="__source"&&(n[l]=e[l]);var o=arguments.length-2;if(o===1)n.children=a;else if(1<o){for(var u=Array(o),s=0;s<o;s++)u[s]=arguments[s+2];n.children=u}if(t&&t.defaultProps)for(l in o=t.defaultProps,o)n[l]===void 0&&(n[l]=o[l]);return Sc(t,i,n)};N.createRef=function(){return{current:null}};N.forwardRef=function(t){return{$$typeof:sv,render:t}};N.isValidElement=wc;N.lazy=function(t){return{$$typeof:_d,_payload:{_status:-1,_result:t},_init:yv}};N.memo=function(t,e){return{$$typeof:fv,type:t,compare:e===void 0?null:e}};N.startTransition=function(t){var e=J.T,a={};J.T=a;try{var l=t(),n=J.S;n!==null&&n(a,l),typeof l=="object"&&l!==null&&typeof l.then=="function"&&l.then(gc,Ad)}catch(i){Ad(i)}finally{e!==null&&a.types!==null&&(e.types=a.types),J.T=e}};N.unstable_useCacheRefresh=function(){return J.H.useCacheRefresh()};N.use=function(t){return J.H.use(t)};N.useActionState=function(t,e,a){return J.H.useActionState(t,e,a)};N.useCallback=function(t,e){return J.H.useCallback(t,e)};N.useContext=function(t){return J.H.useContext(t)};N.useDebugValue=function(){};N.useDeferredValue=function(t,e){return J.H.useDeferredValue(t,e)};N.useEffect=function(t,e){return J.H.useEffect(t,e)};N.useEffectEvent=function(t){return J.H.useEffectEvent(t)};N.useId=function(){return J.H.useId()};N.useImperativeHandle=function(t,e,a){return J.H.useImperativeHandle(t,e,a)};N.useInsertionEffect=function(t,e){return J.H.useInsertionEffect(t,e)};N.useLayoutEffect=function(t,e){return J.H.useLayoutEffect(t,e)};N.useMemo=function(t,e){return J.H.useMemo(t,e)};N.useOptimistic=function(t,e){return J.H.useOptimistic(t,e)};N.useReducer=function(t,e,a){return J.H.useReducer(t,e,a)};N.useRef=function(t){return J.H.useRef(t)};N.useState=function(t){return J.H.useState(t)};N.useSyncExternalStore=function(t,e,a){return J.H.useSyncExternalStore(t,e,a)};N.useTransition=function(){return J.H.useTransition()};N.version="19.2.5"});var Ha=be(($2,Rd)=>{"use strict";Rd.exports=$d()});var Dd=be(Nt=>{"use strict";var bv=Ha();function Ud(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)e+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function na(){}var zt={d:{f:na,r:function(){throw Error(Ud(522))},D:na,C:na,L:na,m:na,X:na,S:na,M:na},p:0,findDOMNode:null},Sv=Symbol.for("react.portal");function wv(t,e,a){var l=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Sv,key:l==null?null:""+l,children:t,containerInfo:e,implementation:a}}var yn=bv.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Pi(t,e){if(t==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}Nt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=zt;Nt.createPortal=function(t,e){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(Ud(299));return wv(t,e,null,a)};Nt.flushSync=function(t){var e=yn.T,a=zt.p;try{if(yn.T=null,zt.p=2,t)return t()}finally{yn.T=e,zt.p=a,zt.d.f()}};Nt.preconnect=function(t,e){typeof t=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,zt.d.C(t,e))};Nt.prefetchDNS=function(t){typeof t=="string"&&zt.d.D(t)};Nt.preinit=function(t,e){if(typeof t=="string"&&e&&typeof e.as=="string"){var a=e.as,l=Pi(a,e.crossOrigin),n=typeof e.integrity=="string"?e.integrity:void 0,i=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;a==="style"?zt.d.S(t,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:l,integrity:n,fetchPriority:i}):a==="script"&&zt.d.X(t,{crossOrigin:l,integrity:n,fetchPriority:i,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};Nt.preinitModule=function(t,e){if(typeof t=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var a=Pi(e.as,e.crossOrigin);zt.d.M(t,{crossOrigin:a,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0})}}else e==null&&zt.d.M(t)};Nt.preload=function(t,e){if(typeof t=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var a=e.as,l=Pi(a,e.crossOrigin);zt.d.L(t,a,{crossOrigin:l,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};Nt.preloadModule=function(t,e){if(typeof t=="string")if(e){var a=Pi(e.as,e.crossOrigin);zt.d.m(t,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:a,integrity:typeof e.integrity=="string"?e.integrity:void 0})}else zt.d.m(t)};Nt.requestFormReset=function(t){zt.d.r(t)};Nt.unstable_batchedUpdates=function(t,e){return t(e)};Nt.useFormState=function(t,e,a){return yn.H.useFormState(t,e,a)};Nt.useFormStatus=function(){return yn.H.useHostTransitionStatus()};Nt.version="19.2.5"});var xc=be((U2,Bd)=>{"use strict";function Ld(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ld)}catch(t){console.error(t)}}Ld(),Bd.exports=Dd()});var J0=be(Au=>{"use strict";var pt=wd(),sm=Ha(),xv=xc();function w(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)e+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function rm(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function li(t){var e=t,a=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(a=e.return),t=e.return;while(t)}return e.tag===3?a:null}function fm(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function dm(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Hd(t){if(li(t)!==t)throw Error(w(188))}function Ev(t){var e=t.alternate;if(!e){if(e=li(t),e===null)throw Error(w(188));return e!==t?null:t}for(var a=t,l=e;;){var n=a.return;if(n===null)break;var i=n.alternate;if(i===null){if(l=n.return,l!==null){a=l;continue}break}if(n.child===i.child){for(i=n.child;i;){if(i===a)return Hd(n),t;if(i===l)return Hd(n),e;i=i.sibling}throw Error(w(188))}if(a.return!==l.return)a=n,l=i;else{for(var o=!1,u=n.child;u;){if(u===a){o=!0,a=n,l=i;break}if(u===l){o=!0,l=n,a=i;break}u=u.sibling}if(!o){for(u=i.child;u;){if(u===a){o=!0,a=i,l=n;break}if(u===l){o=!0,l=i,a=n;break}u=u.sibling}if(!o)throw Error(w(189))}}if(a.alternate!==l)throw Error(w(190))}if(a.tag!==3)throw Error(w(188));return a.stateNode.current===a?t:e}function pm(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=pm(t),e!==null)return e;t=t.sibling}return null}var I=Object.assign,Tv=Symbol.for("react.element"),to=Symbol.for("react.transitional.element"),An=Symbol.for("react.portal"),Sl=Symbol.for("react.fragment"),mm=Symbol.for("react.strict_mode"),as=Symbol.for("react.profiler"),hm=Symbol.for("react.consumer"),je=Symbol.for("react.context"),Fs=Symbol.for("react.forward_ref"),ls=Symbol.for("react.suspense"),ns=Symbol.for("react.suspense_list"),Is=Symbol.for("react.memo"),ia=Symbol.for("react.lazy");Symbol.for("react.scope");var is=Symbol.for("react.activity");Symbol.for("react.legacy_hidden");Symbol.for("react.tracing_marker");var Av=Symbol.for("react.memo_cache_sentinel");Symbol.for("react.view_transition");var qd=Symbol.iterator;function vn(t){return t===null||typeof t!="object"?null:(t=qd&&t[qd]||t["@@iterator"],typeof t=="function"?t:null)}var _v=Symbol.for("react.client.reference");function os(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===_v?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Sl:return"Fragment";case as:return"Profiler";case mm:return"StrictMode";case ls:return"Suspense";case ns:return"SuspenseList";case is:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case An:return"Portal";case je:return t.displayName||"Context";case hm:return(t._context.displayName||"Context")+".Consumer";case Fs:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Is:return e=t.displayName||null,e!==null?e:os(t.type)||"Memo";case ia:e=t._payload,t=t._init;try{return os(t(e))}catch{}}return null}var _n=Array.isArray,z=sm.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,j=xv.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Qa={pending:!1,data:null,method:null,action:null},us=[],wl=-1;function Me(t){return{current:t}}function yt(t){0>wl||(t.current=us[wl],us[wl]=null,wl--)}function K(t,e){wl++,us[wl]=t.current,t.current=e}var _e=Me(null),Gn=Me(null),ga=Me(null),Uo=Me(null);function Do(t,e){switch(K(ga,e),K(Gn,t),K(_e,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?kp(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=kp(e),t=D0(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}yt(_e),K(_e,t)}function ql(){yt(_e),yt(Gn),yt(ga)}function cs(t){t.memoizedState!==null&&K(Uo,t);var e=_e.current,a=D0(e,t.type);e!==a&&(K(Gn,t),K(_e,a))}function Lo(t){Gn.current===t&&(yt(_e),yt(Gn)),Uo.current===t&&(yt(Uo),ti._currentValue=Qa)}var Ec,Yd;function Ya(t){if(Ec===void 0)try{throw Error()}catch(a){var e=a.stack.trim().match(/\n( *(at )?)/);Ec=e&&e[1]||"",Yd=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Ec+t+Yd}var Tc=!1;function Ac(t,e){if(!t||Tc)return"";Tc=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(e){var v=function(){throw Error()};if(Object.defineProperty(v.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(v,[])}catch(y){var m=y}Reflect.construct(t,[],v)}else{try{v.call()}catch(y){m=y}t.call(v.prototype)}}else{try{throw Error()}catch(y){m=y}(v=t())&&typeof v.catch=="function"&&v.catch(function(){})}}catch(y){if(y&&m&&typeof y.stack=="string")return[y.stack,m.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var n=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");n&&n.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=l.DetermineComponentFrameRoot(),o=i[0],u=i[1];if(o&&u){var s=o.split(`
`),p=u.split(`
`);for(n=l=0;l<s.length&&!s[l].includes("DetermineComponentFrameRoot");)l++;for(;n<p.length&&!p[n].includes("DetermineComponentFrameRoot");)n++;if(l===s.length||n===p.length)for(l=s.length-1,n=p.length-1;1<=l&&0<=n&&s[l]!==p[n];)n--;for(;1<=l&&0<=n;l--,n--)if(s[l]!==p[n]){if(l!==1||n!==1)do if(l--,n--,0>n||s[l]!==p[n]){var g=`
`+s[l].replace(" at new "," at ");return t.displayName&&g.includes("<anonymous>")&&(g=g.replace("<anonymous>",t.displayName)),g}while(1<=l&&0<=n);break}}}finally{Tc=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?Ya(a):""}function Mv(t,e){switch(t.tag){case 26:case 27:case 5:return Ya(t.type);case 16:return Ya("Lazy");case 13:return t.child!==e&&e!==null?Ya("Suspense Fallback"):Ya("Suspense");case 19:return Ya("SuspenseList");case 0:case 15:return Ac(t.type,!1);case 11:return Ac(t.type.render,!1);case 1:return Ac(t.type,!0);case 31:return Ya("Activity");default:return""}}function jd(t){try{var e="",a=null;do e+=Mv(t,a),a=t,t=t.return;while(t);return e}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var ss=Object.prototype.hasOwnProperty,Ps=pt.unstable_scheduleCallback,_c=pt.unstable_cancelCallback,zv=pt.unstable_shouldYield,Nv=pt.unstable_requestPaint,Zt=pt.unstable_now,Cv=pt.unstable_getCurrentPriorityLevel,gm=pt.unstable_ImmediatePriority,ym=pt.unstable_UserBlockingPriority,Bo=pt.unstable_NormalPriority,Ov=pt.unstable_LowPriority,vm=pt.unstable_IdlePriority,$v=pt.log,Rv=pt.unstable_setDisableYieldValue,ni=null,Kt=null;function fa(t){if(typeof $v=="function"&&Rv(t),Kt&&typeof Kt.setStrictMode=="function")try{Kt.setStrictMode(ni,t)}catch{}}var Jt=Math.clz32?Math.clz32:Lv,Uv=Math.log,Dv=Math.LN2;function Lv(t){return t>>>=0,t===0?32:31-(Uv(t)/Dv|0)|0}var eo=256,ao=262144,lo=4194304;function ja(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function su(t,e,a){var l=t.pendingLanes;if(l===0)return 0;var n=0,i=t.suspendedLanes,o=t.pingedLanes;t=t.warmLanes;var u=l&134217727;return u!==0?(l=u&~i,l!==0?n=ja(l):(o&=u,o!==0?n=ja(o):a||(a=u&~t,a!==0&&(n=ja(a))))):(u=l&~i,u!==0?n=ja(u):o!==0?n=ja(o):a||(a=l&~t,a!==0&&(n=ja(a)))),n===0?0:e!==0&&e!==n&&(e&i)===0&&(i=n&-n,a=e&-e,i>=a||i===32&&(a&4194048)!==0)?e:n}function ii(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function Bv(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function bm(){var t=lo;return lo<<=1,(lo&62914560)===0&&(lo=4194304),t}function Mc(t){for(var e=[],a=0;31>a;a++)e.push(t);return e}function oi(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Hv(t,e,a,l,n,i){var o=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var u=t.entanglements,s=t.expirationTimes,p=t.hiddenUpdates;for(a=o&~a;0<a;){var g=31-Jt(a),v=1<<g;u[g]=0,s[g]=-1;var m=p[g];if(m!==null)for(p[g]=null,g=0;g<m.length;g++){var y=m[g];y!==null&&(y.lane&=-536870913)}a&=~v}l!==0&&Sm(t,l,0),i!==0&&n===0&&t.tag!==0&&(t.suspendedLanes|=i&~(o&~e))}function Sm(t,e,a){t.pendingLanes|=e,t.suspendedLanes&=~e;var l=31-Jt(e);t.entangledLanes|=e,t.entanglements[l]=t.entanglements[l]|1073741824|a&261930}function wm(t,e){var a=t.entangledLanes|=e;for(t=t.entanglements;a;){var l=31-Jt(a),n=1<<l;n&e|t[l]&e&&(t[l]|=e),a&=~n}}function xm(t,e){var a=e&-e;return a=(a&42)!==0?1:tr(a),(a&(t.suspendedLanes|e))!==0?0:a}function tr(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function er(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Em(){var t=j.p;return t!==0?t:(t=window.event,t===void 0?32:k0(t.type))}function Vd(t,e){var a=j.p;try{return j.p=t,e()}finally{j.p=a}}var Na=Math.random().toString(36).slice(2),St="__reactFiber$"+Na,qt="__reactProps$"+Na,Wl="__reactContainer$"+Na,rs="__reactEvents$"+Na,qv="__reactListeners$"+Na,Yv="__reactHandles$"+Na,Gd="__reactResources$"+Na,ui="__reactMarker$"+Na;function ar(t){delete t[St],delete t[qt],delete t[rs],delete t[qv],delete t[Yv]}function xl(t){var e=t[St];if(e)return e;for(var a=t.parentNode;a;){if(e=a[Wl]||a[St]){if(a=e.alternate,e.child!==null||a!==null&&a.child!==null)for(t=Fp(t);t!==null;){if(a=t[St])return a;t=Fp(t)}return e}t=a,a=t.parentNode}return null}function Fl(t){if(t=t[St]||t[Wl]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Mn(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(w(33))}function $l(t){var e=t[Gd];return e||(e=t[Gd]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function gt(t){t[ui]=!0}var Tm=new Set,Am={};function tl(t,e){Yl(t,e),Yl(t+"Capture",e)}function Yl(t,e){for(Am[t]=e,t=0;t<e.length;t++)Tm.add(e[t])}var jv=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Qd={},Xd={};function Vv(t){return ss.call(Xd,t)?!0:ss.call(Qd,t)?!1:jv.test(t)?Xd[t]=!0:(Qd[t]=!0,!1)}function bo(t,e,a){if(Vv(e))if(a===null)t.removeAttribute(e);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var l=e.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+a)}}function no(t,e,a){if(a===null)t.removeAttribute(e);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+a)}}function Ue(t,e,a,l){if(l===null)t.removeAttribute(a);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(e,a,""+l)}}function le(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function _m(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Gv(t,e,a){var l=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var n=l.get,i=l.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return n.call(this)},set:function(o){a=""+o,i.call(this,o)}}),Object.defineProperty(t,e,{enumerable:l.enumerable}),{getValue:function(){return a},setValue:function(o){a=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function fs(t){if(!t._valueTracker){var e=_m(t)?"checked":"value";t._valueTracker=Gv(t,e,""+t[e])}}function Mm(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var a=e.getValue(),l="";return t&&(l=_m(t)?t.checked?"true":"false":t.value),t=l,t!==a?(e.setValue(t),!0):!1}function Ho(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Qv=/[\n"\\]/g;function oe(t){return t.replace(Qv,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function ds(t,e,a,l,n,i,o,u){t.name="",o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?t.type=o:t.removeAttribute("type"),e!=null?o==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+le(e)):t.value!==""+le(e)&&(t.value=""+le(e)):o!=="submit"&&o!=="reset"||t.removeAttribute("value"),e!=null?ps(t,o,le(e)):a!=null?ps(t,o,le(a)):l!=null&&t.removeAttribute("value"),n==null&&i!=null&&(t.defaultChecked=!!i),n!=null&&(t.checked=n&&typeof n!="function"&&typeof n!="symbol"),u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?t.name=""+le(u):t.removeAttribute("name")}function zm(t,e,a,l,n,i,o,u){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(t.type=i),e!=null||a!=null){if(!(i!=="submit"&&i!=="reset"||e!=null)){fs(t);return}a=a!=null?""+le(a):"",e=e!=null?""+le(e):a,u||e===t.value||(t.value=e),t.defaultValue=e}l=l??n,l=typeof l!="function"&&typeof l!="symbol"&&!!l,t.checked=u?t.checked:!!l,t.defaultChecked=!!l,o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"&&(t.name=o),fs(t)}function ps(t,e,a){e==="number"&&Ho(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function Rl(t,e,a,l){if(t=t.options,e){e={};for(var n=0;n<a.length;n++)e["$"+a[n]]=!0;for(a=0;a<t.length;a++)n=e.hasOwnProperty("$"+t[a].value),t[a].selected!==n&&(t[a].selected=n),n&&l&&(t[a].defaultSelected=!0)}else{for(a=""+le(a),e=null,n=0;n<t.length;n++){if(t[n].value===a){t[n].selected=!0,l&&(t[n].defaultSelected=!0);return}e!==null||t[n].disabled||(e=t[n])}e!==null&&(e.selected=!0)}}function Nm(t,e,a){if(e!=null&&(e=""+le(e),e!==t.value&&(t.value=e),a==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=a!=null?""+le(a):""}function Cm(t,e,a,l){if(e==null){if(l!=null){if(a!=null)throw Error(w(92));if(_n(l)){if(1<l.length)throw Error(w(93));l=l[0]}a=l}a==null&&(a=""),e=a}a=le(e),t.defaultValue=a,l=t.textContent,l===a&&l!==""&&l!==null&&(t.value=l),fs(t)}function jl(t,e){if(e){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=e;return}}t.textContent=e}var Xv=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function kd(t,e,a){var l=e.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?l?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":l?t.setProperty(e,a):typeof a!="number"||a===0||Xv.has(e)?e==="float"?t.cssFloat=a:t[e]=(""+a).trim():t[e]=a+"px"}function Om(t,e,a){if(e!=null&&typeof e!="object")throw Error(w(62));if(t=t.style,a!=null){for(var l in a)!a.hasOwnProperty(l)||e!=null&&e.hasOwnProperty(l)||(l.indexOf("--")===0?t.setProperty(l,""):l==="float"?t.cssFloat="":t[l]="");for(var n in e)l=e[n],e.hasOwnProperty(n)&&a[n]!==l&&kd(t,n,l)}else for(var i in e)e.hasOwnProperty(i)&&kd(t,i,e[i])}function lr(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var kv=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Zv=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function So(t){return Zv.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Ve(){}var ms=null;function nr(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var El=null,Ul=null;function Zd(t){var e=Fl(t);if(e&&(t=e.stateNode)){var a=t[qt]||null;t:switch(t=e.stateNode,e.type){case"input":if(ds(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),e=a.name,a.type==="radio"&&e!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+oe(""+e)+'"][type="radio"]'),e=0;e<a.length;e++){var l=a[e];if(l!==t&&l.form===t.form){var n=l[qt]||null;if(!n)throw Error(w(90));ds(l,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name)}}for(e=0;e<a.length;e++)l=a[e],l.form===t.form&&Mm(l)}break t;case"textarea":Nm(t,a.value,a.defaultValue);break t;case"select":e=a.value,e!=null&&Rl(t,!!a.multiple,e,!1)}}}var zc=!1;function $m(t,e,a){if(zc)return t(e,a);zc=!0;try{var l=t(e);return l}finally{if(zc=!1,(El!==null||Ul!==null)&&(wu(),El&&(e=El,t=Ul,Ul=El=null,Zd(e),t)))for(e=0;e<t.length;e++)Zd(t[e])}}function Qn(t,e){var a=t.stateNode;if(a===null)return null;var l=a[qt]||null;if(l===null)return null;a=l[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(t=t.type,l=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!l;break t;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(w(231,e,typeof a));return a}var Ze=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),hs=!1;if(Ze)try{hl={},Object.defineProperty(hl,"passive",{get:function(){hs=!0}}),window.addEventListener("test",hl,hl),window.removeEventListener("test",hl,hl)}catch{hs=!1}var hl,da=null,ir=null,wo=null;function Rm(){if(wo)return wo;var t,e=ir,a=e.length,l,n="value"in da?da.value:da.textContent,i=n.length;for(t=0;t<a&&e[t]===n[t];t++);var o=a-t;for(l=1;l<=o&&e[a-l]===n[i-l];l++);return wo=n.slice(t,1<l?1-l:void 0)}function xo(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function io(){return!0}function Kd(){return!1}function Yt(t){function e(a,l,n,i,o){this._reactName=a,this._targetInst=n,this.type=l,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var u in t)t.hasOwnProperty(u)&&(a=t[u],this[u]=a?a(i):i[u]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?io:Kd,this.isPropagationStopped=Kd,this}return I(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=io)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=io)},persist:function(){},isPersistent:io}),e}var el={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ru=Yt(el),ci=I({},el,{view:0,detail:0}),Kv=Yt(ci),Nc,Cc,bn,fu=I({},ci,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:or,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==bn&&(bn&&t.type==="mousemove"?(Nc=t.screenX-bn.screenX,Cc=t.screenY-bn.screenY):Cc=Nc=0,bn=t),Nc)},movementY:function(t){return"movementY"in t?t.movementY:Cc}}),Jd=Yt(fu),Jv=I({},fu,{dataTransfer:0}),Wv=Yt(Jv),Fv=I({},ci,{relatedTarget:0}),Oc=Yt(Fv),Iv=I({},el,{animationName:0,elapsedTime:0,pseudoElement:0}),Pv=Yt(Iv),t1=I({},el,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),e1=Yt(t1),a1=I({},el,{data:0}),Wd=Yt(a1),l1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},n1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},i1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function o1(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=i1[t])?!!e[t]:!1}function or(){return o1}var u1=I({},ci,{key:function(t){if(t.key){var e=l1[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=xo(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?n1[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:or,charCode:function(t){return t.type==="keypress"?xo(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?xo(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),c1=Yt(u1),s1=I({},fu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Fd=Yt(s1),r1=I({},ci,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:or}),f1=Yt(r1),d1=I({},el,{propertyName:0,elapsedTime:0,pseudoElement:0}),p1=Yt(d1),m1=I({},fu,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),h1=Yt(m1),g1=I({},el,{newState:0,oldState:0}),y1=Yt(g1),v1=[9,13,27,32],ur=Ze&&"CompositionEvent"in window,Cn=null;Ze&&"documentMode"in document&&(Cn=document.documentMode);var b1=Ze&&"TextEvent"in window&&!Cn,Um=Ze&&(!ur||Cn&&8<Cn&&11>=Cn),Id=" ",Pd=!1;function Dm(t,e){switch(t){case"keyup":return v1.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Lm(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Tl=!1;function S1(t,e){switch(t){case"compositionend":return Lm(e);case"keypress":return e.which!==32?null:(Pd=!0,Id);case"textInput":return t=e.data,t===Id&&Pd?null:t;default:return null}}function w1(t,e){if(Tl)return t==="compositionend"||!ur&&Dm(t,e)?(t=Rm(),wo=ir=da=null,Tl=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Um&&e.locale!=="ko"?null:e.data;default:return null}}var x1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function tp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!x1[t.type]:e==="textarea"}function Bm(t,e,a,l){El?Ul?Ul.push(l):Ul=[l]:El=l,e=au(e,"onChange"),0<e.length&&(a=new ru("onChange","change",null,a,l),t.push({event:a,listeners:e}))}var On=null,Xn=null;function E1(t){$0(t,0)}function du(t){var e=Mn(t);if(Mm(e))return t}function ep(t,e){if(t==="change")return e}var Hm=!1;Ze&&(Ze?(uo="oninput"in document,uo||($c=document.createElement("div"),$c.setAttribute("oninput","return;"),uo=typeof $c.oninput=="function"),oo=uo):oo=!1,Hm=oo&&(!document.documentMode||9<document.documentMode));var oo,uo,$c;function ap(){On&&(On.detachEvent("onpropertychange",qm),Xn=On=null)}function qm(t){if(t.propertyName==="value"&&du(Xn)){var e=[];Bm(e,Xn,t,nr(t)),$m(E1,e)}}function T1(t,e,a){t==="focusin"?(ap(),On=e,Xn=a,On.attachEvent("onpropertychange",qm)):t==="focusout"&&ap()}function A1(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return du(Xn)}function _1(t,e){if(t==="click")return du(e)}function M1(t,e){if(t==="input"||t==="change")return du(e)}function z1(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Ft=typeof Object.is=="function"?Object.is:z1;function kn(t,e){if(Ft(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var a=Object.keys(t),l=Object.keys(e);if(a.length!==l.length)return!1;for(l=0;l<a.length;l++){var n=a[l];if(!ss.call(e,n)||!Ft(t[n],e[n]))return!1}return!0}function lp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function np(t,e){var a=lp(t);t=0;for(var l;a;){if(a.nodeType===3){if(l=t+a.textContent.length,t<=e&&l>=e)return{node:a,offset:e-t};t=l}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=lp(a)}}function Ym(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Ym(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function jm(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=Ho(t.document);e instanceof t.HTMLIFrameElement;){try{var a=typeof e.contentWindow.location.href=="string"}catch{a=!1}if(a)t=e.contentWindow;else break;e=Ho(t.document)}return e}function cr(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var N1=Ze&&"documentMode"in document&&11>=document.documentMode,Al=null,gs=null,$n=null,ys=!1;function ip(t,e,a){var l=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;ys||Al==null||Al!==Ho(l)||(l=Al,"selectionStart"in l&&cr(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),$n&&kn($n,l)||($n=l,l=au(gs,"onSelect"),0<l.length&&(e=new ru("onSelect","select",null,e,a),t.push({event:e,listeners:l}),e.target=Al)))}function qa(t,e){var a={};return a[t.toLowerCase()]=e.toLowerCase(),a["Webkit"+t]="webkit"+e,a["Moz"+t]="moz"+e,a}var _l={animationend:qa("Animation","AnimationEnd"),animationiteration:qa("Animation","AnimationIteration"),animationstart:qa("Animation","AnimationStart"),transitionrun:qa("Transition","TransitionRun"),transitionstart:qa("Transition","TransitionStart"),transitioncancel:qa("Transition","TransitionCancel"),transitionend:qa("Transition","TransitionEnd")},Rc={},Vm={};Ze&&(Vm=document.createElement("div").style,"AnimationEvent"in window||(delete _l.animationend.animation,delete _l.animationiteration.animation,delete _l.animationstart.animation),"TransitionEvent"in window||delete _l.transitionend.transition);function al(t){if(Rc[t])return Rc[t];if(!_l[t])return t;var e=_l[t],a;for(a in e)if(e.hasOwnProperty(a)&&a in Vm)return Rc[t]=e[a];return t}var Gm=al("animationend"),Qm=al("animationiteration"),Xm=al("animationstart"),C1=al("transitionrun"),O1=al("transitionstart"),$1=al("transitioncancel"),km=al("transitionend"),Zm=new Map,vs="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");vs.push("scrollEnd");function me(t,e){Zm.set(t,e),tl(e,[t])}var qo=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},ae=[],Ml=0,sr=0;function pu(){for(var t=Ml,e=sr=Ml=0;e<t;){var a=ae[e];ae[e++]=null;var l=ae[e];ae[e++]=null;var n=ae[e];ae[e++]=null;var i=ae[e];if(ae[e++]=null,l!==null&&n!==null){var o=l.pending;o===null?n.next=n:(n.next=o.next,o.next=n),l.pending=n}i!==0&&Km(a,n,i)}}function mu(t,e,a,l){ae[Ml++]=t,ae[Ml++]=e,ae[Ml++]=a,ae[Ml++]=l,sr|=l,t.lanes|=l,t=t.alternate,t!==null&&(t.lanes|=l)}function rr(t,e,a,l){return mu(t,e,a,l),Yo(t)}function ll(t,e){return mu(t,null,null,e),Yo(t)}function Km(t,e,a){t.lanes|=a;var l=t.alternate;l!==null&&(l.lanes|=a);for(var n=!1,i=t.return;i!==null;)i.childLanes|=a,l=i.alternate,l!==null&&(l.childLanes|=a),i.tag===22&&(t=i.stateNode,t===null||t._visibility&1||(n=!0)),t=i,i=i.return;return t.tag===3?(i=t.stateNode,n&&e!==null&&(n=31-Jt(a),t=i.hiddenUpdates,l=t[n],l===null?t[n]=[e]:l.push(e),e.lane=a|536870912),i):null}function Yo(t){if(50<jn)throw jn=0,qs=null,Error(w(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var zl={};function R1(t,e,a,l){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Xt(t,e,a,l){return new R1(t,e,a,l)}function fr(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Qe(t,e){var a=t.alternate;return a===null?(a=Xt(t.tag,e,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=e,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,e=t.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Jm(t,e){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,e=a.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function Eo(t,e,a,l,n,i){var o=0;if(l=t,typeof t=="function")fr(t)&&(o=1);else if(typeof t=="string")o=Lb(t,a,_e.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case is:return t=Xt(31,a,e,n),t.elementType=is,t.lanes=i,t;case Sl:return Xa(a.children,n,i,e);case mm:o=8,n|=24;break;case as:return t=Xt(12,a,e,n|2),t.elementType=as,t.lanes=i,t;case ls:return t=Xt(13,a,e,n),t.elementType=ls,t.lanes=i,t;case ns:return t=Xt(19,a,e,n),t.elementType=ns,t.lanes=i,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case je:o=10;break t;case hm:o=9;break t;case Fs:o=11;break t;case Is:o=14;break t;case ia:o=16,l=null;break t}o=29,a=Error(w(130,t===null?"null":typeof t,"")),l=null}return e=Xt(o,a,e,n),e.elementType=t,e.type=l,e.lanes=i,e}function Xa(t,e,a,l){return t=Xt(7,t,l,e),t.lanes=a,t}function Uc(t,e,a){return t=Xt(6,t,null,e),t.lanes=a,t}function Wm(t){var e=Xt(18,null,null,0);return e.stateNode=t,e}function Dc(t,e,a){return e=Xt(4,t.children!==null?t.children:[],t.key,e),e.lanes=a,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var op=new WeakMap;function ue(t,e){if(typeof t=="object"&&t!==null){var a=op.get(t);return a!==void 0?a:(e={value:t,source:e,stack:jd(e)},op.set(t,e),e)}return{value:t,source:e,stack:jd(e)}}var Nl=[],Cl=0,jo=null,Zn=0,ne=[],ie=0,Aa=null,Ee=1,Te="";function qe(t,e){Nl[Cl++]=Zn,Nl[Cl++]=jo,jo=t,Zn=e}function Fm(t,e,a){ne[ie++]=Ee,ne[ie++]=Te,ne[ie++]=Aa,Aa=t;var l=Ee;t=Te;var n=32-Jt(l)-1;l&=~(1<<n),a+=1;var i=32-Jt(e)+n;if(30<i){var o=n-n%5;i=(l&(1<<o)-1).toString(32),l>>=o,n-=o,Ee=1<<32-Jt(e)+n|a<<n|l,Te=i+t}else Ee=1<<i|a<<n|l,Te=t}function dr(t){t.return!==null&&(qe(t,1),Fm(t,1,0))}function pr(t){for(;t===jo;)jo=Nl[--Cl],Nl[Cl]=null,Zn=Nl[--Cl],Nl[Cl]=null;for(;t===Aa;)Aa=ne[--ie],ne[ie]=null,Te=ne[--ie],ne[ie]=null,Ee=ne[--ie],ne[ie]=null}function Im(t,e){ne[ie++]=Ee,ne[ie++]=Te,ne[ie++]=Aa,Ee=e.id,Te=e.overflow,Aa=t}var wt=null,F=null,B=!1,ya=null,ce=!1,bs=Error(w(519));function _a(t){var e=Error(w(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Kn(ue(e,t)),bs}function up(t){var e=t.stateNode,a=t.type,l=t.memoizedProps;switch(e[St]=t,e[qt]=l,a){case"dialog":R("cancel",e),R("close",e);break;case"iframe":case"object":case"embed":R("load",e);break;case"video":case"audio":for(a=0;a<In.length;a++)R(In[a],e);break;case"source":R("error",e);break;case"img":case"image":case"link":R("error",e),R("load",e);break;case"details":R("toggle",e);break;case"input":R("invalid",e),zm(e,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":R("invalid",e);break;case"textarea":R("invalid",e),Cm(e,l.value,l.defaultValue,l.children)}a=l.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||e.textContent===""+a||l.suppressHydrationWarning===!0||U0(e.textContent,a)?(l.popover!=null&&(R("beforetoggle",e),R("toggle",e)),l.onScroll!=null&&R("scroll",e),l.onScrollEnd!=null&&R("scrollend",e),l.onClick!=null&&(e.onclick=Ve),e=!0):e=!1,e||_a(t,!0)}function cp(t){for(wt=t.return;wt;)switch(wt.tag){case 5:case 31:case 13:ce=!1;return;case 27:case 3:ce=!0;return;default:wt=wt.return}}function gl(t){if(t!==wt)return!1;if(!B)return cp(t),B=!0,!1;var e=t.tag,a;if((a=e!==3&&e!==27)&&((a=e===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||Qs(t.type,t.memoizedProps)),a=!a),a&&F&&_a(t),cp(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(w(317));F=Wp(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(w(317));F=Wp(t)}else e===27?(e=F,Ca(t.type)?(t=Ks,Ks=null,F=t):F=e):F=wt?re(t.stateNode.nextSibling):null;return!0}function Ja(){F=wt=null,B=!1}function Lc(){var t=ya;return t!==null&&(Bt===null?Bt=t:Bt.push.apply(Bt,t),ya=null),t}function Kn(t){ya===null?ya=[t]:ya.push(t)}var Ss=Me(null),nl=null,Ge=null;function ua(t,e,a){K(Ss,e._currentValue),e._currentValue=a}function Xe(t){t._currentValue=Ss.current,yt(Ss)}function ws(t,e,a){for(;t!==null;){var l=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,l!==null&&(l.childLanes|=e)):l!==null&&(l.childLanes&e)!==e&&(l.childLanes|=e),t===a)break;t=t.return}}function xs(t,e,a,l){var n=t.child;for(n!==null&&(n.return=t);n!==null;){var i=n.dependencies;if(i!==null){var o=n.child;i=i.firstContext;t:for(;i!==null;){var u=i;i=n;for(var s=0;s<e.length;s++)if(u.context===e[s]){i.lanes|=a,u=i.alternate,u!==null&&(u.lanes|=a),ws(i.return,a,t),l||(o=null);break t}i=u.next}}else if(n.tag===18){if(o=n.return,o===null)throw Error(w(341));o.lanes|=a,i=o.alternate,i!==null&&(i.lanes|=a),ws(o,a,t),o=null}else o=n.child;if(o!==null)o.return=n;else for(o=n;o!==null;){if(o===t){o=null;break}if(n=o.sibling,n!==null){n.return=o.return,o=n;break}o=o.return}n=o}}function Il(t,e,a,l){t=null;for(var n=e,i=!1;n!==null;){if(!i){if((n.flags&524288)!==0)i=!0;else if((n.flags&262144)!==0)break}if(n.tag===10){var o=n.alternate;if(o===null)throw Error(w(387));if(o=o.memoizedProps,o!==null){var u=n.type;Ft(n.pendingProps.value,o.value)||(t!==null?t.push(u):t=[u])}}else if(n===Uo.current){if(o=n.alternate,o===null)throw Error(w(387));o.memoizedState.memoizedState!==n.memoizedState.memoizedState&&(t!==null?t.push(ti):t=[ti])}n=n.return}t!==null&&xs(e,t,a,l),e.flags|=262144}function Vo(t){for(t=t.firstContext;t!==null;){if(!Ft(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Wa(t){nl=t,Ge=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function xt(t){return Pm(nl,t)}function co(t,e){return nl===null&&Wa(t),Pm(t,e)}function Pm(t,e){var a=e._currentValue;if(e={context:e,memoizedValue:a,next:null},Ge===null){if(t===null)throw Error(w(308));Ge=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Ge=Ge.next=e;return a}var U1=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(a,l){t.push(l)}};this.abort=function(){e.aborted=!0,t.forEach(function(a){return a()})}},D1=pt.unstable_scheduleCallback,L1=pt.unstable_NormalPriority,rt={$$typeof:je,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function mr(){return{controller:new U1,data:new Map,refCount:0}}function si(t){t.refCount--,t.refCount===0&&D1(L1,function(){t.controller.abort()})}var Rn=null,Es=0,Vl=0,Dl=null;function B1(t,e){if(Rn===null){var a=Rn=[];Es=0,Vl=qr(),Dl={status:"pending",value:void 0,then:function(l){a.push(l)}}}return Es++,e.then(sp,sp),e}function sp(){if(--Es===0&&Rn!==null){Dl!==null&&(Dl.status="fulfilled");var t=Rn;Rn=null,Vl=0,Dl=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function H1(t,e){var a=[],l={status:"pending",value:null,reason:null,then:function(n){a.push(n)}};return t.then(function(){l.status="fulfilled",l.value=e;for(var n=0;n<a.length;n++)(0,a[n])(e)},function(n){for(l.status="rejected",l.reason=n,n=0;n<a.length;n++)(0,a[n])(void 0)}),l}var rp=z.S;z.S=function(t,e){p0=Zt(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&B1(t,e),rp!==null&&rp(t,e)};var ka=Me(null);function hr(){var t=ka.current;return t!==null?t:k.pooledCache}function To(t,e){e===null?K(ka,ka.current):K(ka,e.pool)}function th(){var t=hr();return t===null?null:{parent:rt._currentValue,pool:t}}var Pl=Error(w(460)),gr=Error(w(474)),hu=Error(w(542)),Go={then:function(){}};function fp(t){return t=t.status,t==="fulfilled"||t==="rejected"}function eh(t,e,a){switch(a=t[a],a===void 0?t.push(e):a!==e&&(e.then(Ve,Ve),e=a),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,pp(t),t;default:if(typeof e.status=="string")e.then(Ve,Ve);else{if(t=k,t!==null&&100<t.shellSuspendCounter)throw Error(w(482));t=e,t.status="pending",t.then(function(l){if(e.status==="pending"){var n=e;n.status="fulfilled",n.value=l}},function(l){if(e.status==="pending"){var n=e;n.status="rejected",n.reason=l}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,pp(t),t}throw Za=e,Pl}}function Va(t){try{var e=t._init;return e(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Za=a,Pl):a}}var Za=null;function dp(){if(Za===null)throw Error(w(459));var t=Za;return Za=null,t}function pp(t){if(t===Pl||t===hu)throw Error(w(483))}var Ll=null,Jn=0;function so(t){var e=Jn;return Jn+=1,Ll===null&&(Ll=[]),eh(Ll,t,e)}function Sn(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function ro(t,e){throw e.$$typeof===Tv?Error(w(525)):(t=Object.prototype.toString.call(e),Error(w(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function ah(t){function e(f,r){if(t){var h=f.deletions;h===null?(f.deletions=[r],f.flags|=16):h.push(r)}}function a(f,r){if(!t)return null;for(;r!==null;)e(f,r),r=r.sibling;return null}function l(f){for(var r=new Map;f!==null;)f.key!==null?r.set(f.key,f):r.set(f.index,f),f=f.sibling;return r}function n(f,r){return f=Qe(f,r),f.index=0,f.sibling=null,f}function i(f,r,h){return f.index=h,t?(h=f.alternate,h!==null?(h=h.index,h<r?(f.flags|=67108866,r):h):(f.flags|=67108866,r)):(f.flags|=1048576,r)}function o(f){return t&&f.alternate===null&&(f.flags|=67108866),f}function u(f,r,h,b){return r===null||r.tag!==6?(r=Uc(h,f.mode,b),r.return=f,r):(r=n(r,h),r.return=f,r)}function s(f,r,h,b){var A=h.type;return A===Sl?g(f,r,h.props.children,b,h.key):r!==null&&(r.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===ia&&Va(A)===r.type)?(r=n(r,h.props),Sn(r,h),r.return=f,r):(r=Eo(h.type,h.key,h.props,null,f.mode,b),Sn(r,h),r.return=f,r)}function p(f,r,h,b){return r===null||r.tag!==4||r.stateNode.containerInfo!==h.containerInfo||r.stateNode.implementation!==h.implementation?(r=Dc(h,f.mode,b),r.return=f,r):(r=n(r,h.children||[]),r.return=f,r)}function g(f,r,h,b,A){return r===null||r.tag!==7?(r=Xa(h,f.mode,b,A),r.return=f,r):(r=n(r,h),r.return=f,r)}function v(f,r,h){if(typeof r=="string"&&r!==""||typeof r=="number"||typeof r=="bigint")return r=Uc(""+r,f.mode,h),r.return=f,r;if(typeof r=="object"&&r!==null){switch(r.$$typeof){case to:return h=Eo(r.type,r.key,r.props,null,f.mode,h),Sn(h,r),h.return=f,h;case An:return r=Dc(r,f.mode,h),r.return=f,r;case ia:return r=Va(r),v(f,r,h)}if(_n(r)||vn(r))return r=Xa(r,f.mode,h,null),r.return=f,r;if(typeof r.then=="function")return v(f,so(r),h);if(r.$$typeof===je)return v(f,co(f,r),h);ro(f,r)}return null}function m(f,r,h,b){var A=r!==null?r.key:null;if(typeof h=="string"&&h!==""||typeof h=="number"||typeof h=="bigint")return A!==null?null:u(f,r,""+h,b);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case to:return h.key===A?s(f,r,h,b):null;case An:return h.key===A?p(f,r,h,b):null;case ia:return h=Va(h),m(f,r,h,b)}if(_n(h)||vn(h))return A!==null?null:g(f,r,h,b,null);if(typeof h.then=="function")return m(f,r,so(h),b);if(h.$$typeof===je)return m(f,r,co(f,h),b);ro(f,h)}return null}function y(f,r,h,b,A){if(typeof b=="string"&&b!==""||typeof b=="number"||typeof b=="bigint")return f=f.get(h)||null,u(r,f,""+b,A);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case to:return f=f.get(b.key===null?h:b.key)||null,s(r,f,b,A);case An:return f=f.get(b.key===null?h:b.key)||null,p(r,f,b,A);case ia:return b=Va(b),y(f,r,h,b,A)}if(_n(b)||vn(b))return f=f.get(h)||null,g(r,f,b,A,null);if(typeof b.then=="function")return y(f,r,h,so(b),A);if(b.$$typeof===je)return y(f,r,h,co(r,b),A);ro(r,b)}return null}function E(f,r,h,b){for(var A=null,H=null,T=r,$=r=0,D=null;T!==null&&$<h.length;$++){T.index>$?(D=T,T=null):D=T.sibling;var q=m(f,T,h[$],b);if(q===null){T===null&&(T=D);break}t&&T&&q.alternate===null&&e(f,T),r=i(q,r,$),H===null?A=q:H.sibling=q,H=q,T=D}if($===h.length)return a(f,T),B&&qe(f,$),A;if(T===null){for(;$<h.length;$++)T=v(f,h[$],b),T!==null&&(r=i(T,r,$),H===null?A=T:H.sibling=T,H=T);return B&&qe(f,$),A}for(T=l(T);$<h.length;$++)D=y(T,f,$,h[$],b),D!==null&&(t&&D.alternate!==null&&T.delete(D.key===null?$:D.key),r=i(D,r,$),H===null?A=D:H.sibling=D,H=D);return t&&T.forEach(function(ea){return e(f,ea)}),B&&qe(f,$),A}function _(f,r,h,b){if(h==null)throw Error(w(151));for(var A=null,H=null,T=r,$=r=0,D=null,q=h.next();T!==null&&!q.done;$++,q=h.next()){T.index>$?(D=T,T=null):D=T.sibling;var ea=m(f,T,q.value,b);if(ea===null){T===null&&(T=D);break}t&&T&&ea.alternate===null&&e(f,T),r=i(ea,r,$),H===null?A=ea:H.sibling=ea,H=ea,T=D}if(q.done)return a(f,T),B&&qe(f,$),A;if(T===null){for(;!q.done;$++,q=h.next())q=v(f,q.value,b),q!==null&&(r=i(q,r,$),H===null?A=q:H.sibling=q,H=q);return B&&qe(f,$),A}for(T=l(T);!q.done;$++,q=h.next())q=y(T,f,$,q.value,b),q!==null&&(t&&q.alternate!==null&&T.delete(q.key===null?$:q.key),r=i(q,r,$),H===null?A=q:H.sibling=q,H=q);return t&&T.forEach(function(ky){return e(f,ky)}),B&&qe(f,$),A}function C(f,r,h,b){if(typeof h=="object"&&h!==null&&h.type===Sl&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case to:t:{for(var A=h.key;r!==null;){if(r.key===A){if(A=h.type,A===Sl){if(r.tag===7){a(f,r.sibling),b=n(r,h.props.children),b.return=f,f=b;break t}}else if(r.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===ia&&Va(A)===r.type){a(f,r.sibling),b=n(r,h.props),Sn(b,h),b.return=f,f=b;break t}a(f,r);break}else e(f,r);r=r.sibling}h.type===Sl?(b=Xa(h.props.children,f.mode,b,h.key),b.return=f,f=b):(b=Eo(h.type,h.key,h.props,null,f.mode,b),Sn(b,h),b.return=f,f=b)}return o(f);case An:t:{for(A=h.key;r!==null;){if(r.key===A)if(r.tag===4&&r.stateNode.containerInfo===h.containerInfo&&r.stateNode.implementation===h.implementation){a(f,r.sibling),b=n(r,h.children||[]),b.return=f,f=b;break t}else{a(f,r);break}else e(f,r);r=r.sibling}b=Dc(h,f.mode,b),b.return=f,f=b}return o(f);case ia:return h=Va(h),C(f,r,h,b)}if(_n(h))return E(f,r,h,b);if(vn(h)){if(A=vn(h),typeof A!="function")throw Error(w(150));return h=A.call(h),_(f,r,h,b)}if(typeof h.then=="function")return C(f,r,so(h),b);if(h.$$typeof===je)return C(f,r,co(f,h),b);ro(f,h)}return typeof h=="string"&&h!==""||typeof h=="number"||typeof h=="bigint"?(h=""+h,r!==null&&r.tag===6?(a(f,r.sibling),b=n(r,h),b.return=f,f=b):(a(f,r),b=Uc(h,f.mode,b),b.return=f,f=b),o(f)):a(f,r)}return function(f,r,h,b){try{Jn=0;var A=C(f,r,h,b);return Ll=null,A}catch(T){if(T===Pl||T===hu)throw T;var H=Xt(29,T,null,f.mode);return H.lanes=b,H.return=f,H}finally{}}}var Fa=ah(!0),lh=ah(!1),oa=!1;function yr(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ts(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function va(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function ba(t,e,a){var l=t.updateQueue;if(l===null)return null;if(l=l.shared,(Y&2)!==0){var n=l.pending;return n===null?e.next=e:(e.next=n.next,n.next=e),l.pending=e,e=Yo(t),Km(t,null,a),e}return mu(t,l,e,a),Yo(t)}function Un(t,e,a){if(e=e.updateQueue,e!==null&&(e=e.shared,(a&4194048)!==0)){var l=e.lanes;l&=t.pendingLanes,a|=l,e.lanes=a,wm(t,a)}}function Bc(t,e){var a=t.updateQueue,l=t.alternate;if(l!==null&&(l=l.updateQueue,a===l)){var n=null,i=null;if(a=a.firstBaseUpdate,a!==null){do{var o={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};i===null?n=i=o:i=i.next=o,a=a.next}while(a!==null);i===null?n=i=e:i=i.next=e}else n=i=e;a={baseState:l.baseState,firstBaseUpdate:n,lastBaseUpdate:i,shared:l.shared,callbacks:l.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=e:t.next=e,a.lastBaseUpdate=e}var As=!1;function Dn(){if(As){var t=Dl;if(t!==null)throw t}}function Ln(t,e,a,l){As=!1;var n=t.updateQueue;oa=!1;var i=n.firstBaseUpdate,o=n.lastBaseUpdate,u=n.shared.pending;if(u!==null){n.shared.pending=null;var s=u,p=s.next;s.next=null,o===null?i=p:o.next=p,o=s;var g=t.alternate;g!==null&&(g=g.updateQueue,u=g.lastBaseUpdate,u!==o&&(u===null?g.firstBaseUpdate=p:u.next=p,g.lastBaseUpdate=s))}if(i!==null){var v=n.baseState;o=0,g=p=s=null,u=i;do{var m=u.lane&-536870913,y=m!==u.lane;if(y?(L&m)===m:(l&m)===m){m!==0&&m===Vl&&(As=!0),g!==null&&(g=g.next={lane:0,tag:u.tag,payload:u.payload,callback:null,next:null});t:{var E=t,_=u;m=e;var C=a;switch(_.tag){case 1:if(E=_.payload,typeof E=="function"){v=E.call(C,v,m);break t}v=E;break t;case 3:E.flags=E.flags&-65537|128;case 0:if(E=_.payload,m=typeof E=="function"?E.call(C,v,m):E,m==null)break t;v=I({},v,m);break t;case 2:oa=!0}}m=u.callback,m!==null&&(t.flags|=64,y&&(t.flags|=8192),y=n.callbacks,y===null?n.callbacks=[m]:y.push(m))}else y={lane:m,tag:u.tag,payload:u.payload,callback:u.callback,next:null},g===null?(p=g=y,s=v):g=g.next=y,o|=m;if(u=u.next,u===null){if(u=n.shared.pending,u===null)break;y=u,u=y.next,y.next=null,n.lastBaseUpdate=y,n.shared.pending=null}}while(!0);g===null&&(s=v),n.baseState=s,n.firstBaseUpdate=p,n.lastBaseUpdate=g,i===null&&(n.shared.lanes=0),za|=o,t.lanes=o,t.memoizedState=v}}function nh(t,e){if(typeof t!="function")throw Error(w(191,t));t.call(e)}function ih(t,e){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)nh(a[t],e)}var Gl=Me(null),Qo=Me(0);function mp(t,e){t=Fe,K(Qo,t),K(Gl,e),Fe=t|e.baseLanes}function _s(){K(Qo,Fe),K(Gl,Gl.current)}function vr(){Fe=Qo.current,yt(Gl),yt(Qo)}var It=Me(null),se=null;function ca(t){var e=t.alternate;K(nt,nt.current&1),K(It,t),se===null&&(e===null||Gl.current!==null||e.memoizedState!==null)&&(se=t)}function Ms(t){K(nt,nt.current),K(It,t),se===null&&(se=t)}function oh(t){t.tag===22?(K(nt,nt.current),K(It,t),se===null&&(se=t)):sa(t)}function sa(){K(nt,nt.current),K(It,It.current)}function Qt(t){yt(It),se===t&&(se=null),yt(nt)}var nt=Me(0);function Xo(t){for(var e=t;e!==null;){if(e.tag===13){var a=e.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||ks(a)||Zs(a)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Ke=0,O=null,X=null,ct=null,ko=!1,Bl=!1,Ia=!1,Zo=0,Wn=0,Hl=null,q1=0;function at(){throw Error(w(321))}function br(t,e){if(e===null)return!1;for(var a=0;a<e.length&&a<t.length;a++)if(!Ft(t[a],e[a]))return!1;return!0}function Sr(t,e,a,l,n,i){return Ke=i,O=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,z.H=t===null||t.memoizedState===null?Bh:Or,Ia=!1,i=a(l,n),Ia=!1,Bl&&(i=ch(e,a,l,n)),uh(t),i}function uh(t){z.H=Fn;var e=X!==null&&X.next!==null;if(Ke=0,ct=X=O=null,ko=!1,Wn=0,Hl=null,e)throw Error(w(300));t===null||ft||(t=t.dependencies,t!==null&&Vo(t)&&(ft=!0))}function ch(t,e,a,l){O=t;var n=0;do{if(Bl&&(Hl=null),Wn=0,Bl=!1,25<=n)throw Error(w(301));if(n+=1,ct=X=null,t.updateQueue!=null){var i=t.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}z.H=Hh,i=e(a,l)}while(Bl);return i}function Y1(){var t=z.H,e=t.useState()[0];return e=typeof e.then=="function"?ri(e):e,t=t.useState()[0],(X!==null?X.memoizedState:null)!==t&&(O.flags|=1024),e}function wr(){var t=Zo!==0;return Zo=0,t}function xr(t,e,a){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~a}function Er(t){if(ko){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}ko=!1}Ke=0,ct=X=O=null,Bl=!1,Wn=Zo=0,Hl=null}function Ct(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ct===null?O.memoizedState=ct=t:ct=ct.next=t,ct}function it(){if(X===null){var t=O.alternate;t=t!==null?t.memoizedState:null}else t=X.next;var e=ct===null?O.memoizedState:ct.next;if(e!==null)ct=e,X=t;else{if(t===null)throw O.alternate===null?Error(w(467)):Error(w(310));X=t,t={memoizedState:X.memoizedState,baseState:X.baseState,baseQueue:X.baseQueue,queue:X.queue,next:null},ct===null?O.memoizedState=ct=t:ct=ct.next=t}return ct}function gu(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ri(t){var e=Wn;return Wn+=1,Hl===null&&(Hl=[]),t=eh(Hl,t,e),e=O,(ct===null?e.memoizedState:ct.next)===null&&(e=e.alternate,z.H=e===null||e.memoizedState===null?Bh:Or),t}function yu(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return ri(t);if(t.$$typeof===je)return xt(t)}throw Error(w(438,String(t)))}function Tr(t){var e=null,a=O.updateQueue;if(a!==null&&(e=a.memoCache),e==null){var l=O.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(e={data:l.data.map(function(n){return n.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),a===null&&(a=gu(),O.updateQueue=a),a.memoCache=e,a=e.data[e.index],a===void 0)for(a=e.data[e.index]=Array(t),l=0;l<t;l++)a[l]=Av;return e.index++,a}function Je(t,e){return typeof e=="function"?e(t):e}function Ao(t){var e=it();return Ar(e,X,t)}function Ar(t,e,a){var l=t.queue;if(l===null)throw Error(w(311));l.lastRenderedReducer=a;var n=t.baseQueue,i=l.pending;if(i!==null){if(n!==null){var o=n.next;n.next=i.next,i.next=o}e.baseQueue=n=i,l.pending=null}if(i=t.baseState,n===null)t.memoizedState=i;else{e=n.next;var u=o=null,s=null,p=e,g=!1;do{var v=p.lane&-536870913;if(v!==p.lane?(L&v)===v:(Ke&v)===v){var m=p.revertLane;if(m===0)s!==null&&(s=s.next={lane:0,revertLane:0,gesture:null,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null}),v===Vl&&(g=!0);else if((Ke&m)===m){p=p.next,m===Vl&&(g=!0);continue}else v={lane:0,revertLane:p.revertLane,gesture:null,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null},s===null?(u=s=v,o=i):s=s.next=v,O.lanes|=m,za|=m;v=p.action,Ia&&a(i,v),i=p.hasEagerState?p.eagerState:a(i,v)}else m={lane:v,revertLane:p.revertLane,gesture:p.gesture,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null},s===null?(u=s=m,o=i):s=s.next=m,O.lanes|=v,za|=v;p=p.next}while(p!==null&&p!==e);if(s===null?o=i:s.next=u,!Ft(i,t.memoizedState)&&(ft=!0,g&&(a=Dl,a!==null)))throw a;t.memoizedState=i,t.baseState=o,t.baseQueue=s,l.lastRenderedState=i}return n===null&&(l.lanes=0),[t.memoizedState,l.dispatch]}function Hc(t){var e=it(),a=e.queue;if(a===null)throw Error(w(311));a.lastRenderedReducer=t;var l=a.dispatch,n=a.pending,i=e.memoizedState;if(n!==null){a.pending=null;var o=n=n.next;do i=t(i,o.action),o=o.next;while(o!==n);Ft(i,e.memoizedState)||(ft=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),a.lastRenderedState=i}return[i,l]}function sh(t,e,a){var l=O,n=it(),i=B;if(i){if(a===void 0)throw Error(w(407));a=a()}else a=e();var o=!Ft((X||n).memoizedState,a);if(o&&(n.memoizedState=a,ft=!0),n=n.queue,_r(dh.bind(null,l,n,t),[t]),n.getSnapshot!==e||o||ct!==null&&ct.memoizedState.tag&1){if(l.flags|=2048,Ql(9,{destroy:void 0},fh.bind(null,l,n,a,e),null),k===null)throw Error(w(349));i||(Ke&127)!==0||rh(l,e,a)}return a}function rh(t,e,a){t.flags|=16384,t={getSnapshot:e,value:a},e=O.updateQueue,e===null?(e=gu(),O.updateQueue=e,e.stores=[t]):(a=e.stores,a===null?e.stores=[t]:a.push(t))}function fh(t,e,a,l){e.value=a,e.getSnapshot=l,ph(e)&&mh(t)}function dh(t,e,a){return a(function(){ph(e)&&mh(t)})}function ph(t){var e=t.getSnapshot;t=t.value;try{var a=e();return!Ft(t,a)}catch{return!0}}function mh(t){var e=ll(t,2);e!==null&&Ht(e,t,2)}function zs(t){var e=Ct();if(typeof t=="function"){var a=t;if(t=a(),Ia){fa(!0);try{a()}finally{fa(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Je,lastRenderedState:t},e}function hh(t,e,a,l){return t.baseState=a,Ar(t,X,typeof l=="function"?l:Je)}function j1(t,e,a,l,n){if(bu(t))throw Error(w(485));if(t=e.action,t!==null){var i={payload:n,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(o){i.listeners.push(o)}};z.T!==null?a(!0):i.isTransition=!1,l(i),a=e.pending,a===null?(i.next=e.pending=i,gh(e,i)):(i.next=a.next,e.pending=a.next=i)}}function gh(t,e){var a=e.action,l=e.payload,n=t.state;if(e.isTransition){var i=z.T,o={};z.T=o;try{var u=a(n,l),s=z.S;s!==null&&s(o,u),hp(t,e,u)}catch(p){Ns(t,e,p)}finally{i!==null&&o.types!==null&&(i.types=o.types),z.T=i}}else try{i=a(n,l),hp(t,e,i)}catch(p){Ns(t,e,p)}}function hp(t,e,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(l){gp(t,e,l)},function(l){return Ns(t,e,l)}):gp(t,e,a)}function gp(t,e,a){e.status="fulfilled",e.value=a,yh(e),t.state=a,e=t.pending,e!==null&&(a=e.next,a===e?t.pending=null:(a=a.next,e.next=a,gh(t,a)))}function Ns(t,e,a){var l=t.pending;if(t.pending=null,l!==null){l=l.next;do e.status="rejected",e.reason=a,yh(e),e=e.next;while(e!==l)}t.action=null}function yh(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function vh(t,e){return e}function yp(t,e){if(B){var a=k.formState;if(a!==null){t:{var l=O;if(B){if(F){e:{for(var n=F,i=ce;n.nodeType!==8;){if(!i){n=null;break e}if(n=re(n.nextSibling),n===null){n=null;break e}}i=n.data,n=i==="F!"||i==="F"?n:null}if(n){F=re(n.nextSibling),l=n.data==="F!";break t}}_a(l)}l=!1}l&&(e=a[0])}}return a=Ct(),a.memoizedState=a.baseState=e,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:vh,lastRenderedState:e},a.queue=l,a=Uh.bind(null,O,l),l.dispatch=a,l=zs(!1),i=Cr.bind(null,O,!1,l.queue),l=Ct(),n={state:e,dispatch:null,action:t,pending:null},l.queue=n,a=j1.bind(null,O,n,i,a),n.dispatch=a,l.memoizedState=t,[e,a,!1]}function vp(t){var e=it();return bh(e,X,t)}function bh(t,e,a){if(e=Ar(t,e,vh)[0],t=Ao(Je)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var l=ri(e)}catch(o){throw o===Pl?hu:o}else l=e;e=it();var n=e.queue,i=n.dispatch;return a!==e.memoizedState&&(O.flags|=2048,Ql(9,{destroy:void 0},V1.bind(null,n,a),null)),[l,i,t]}function V1(t,e){t.action=e}function bp(t){var e=it(),a=X;if(a!==null)return bh(e,a,t);it(),e=e.memoizedState,a=it();var l=a.queue.dispatch;return a.memoizedState=t,[e,l,!1]}function Ql(t,e,a,l){return t={tag:t,create:a,deps:l,inst:e,next:null},e=O.updateQueue,e===null&&(e=gu(),O.updateQueue=e),a=e.lastEffect,a===null?e.lastEffect=t.next=t:(l=a.next,a.next=t,t.next=l,e.lastEffect=t),t}function Sh(){return it().memoizedState}function _o(t,e,a,l){var n=Ct();O.flags|=t,n.memoizedState=Ql(1|e,{destroy:void 0},a,l===void 0?null:l)}function vu(t,e,a,l){var n=it();l=l===void 0?null:l;var i=n.memoizedState.inst;X!==null&&l!==null&&br(l,X.memoizedState.deps)?n.memoizedState=Ql(e,i,a,l):(O.flags|=t,n.memoizedState=Ql(1|e,i,a,l))}function Sp(t,e){_o(8390656,8,t,e)}function _r(t,e){vu(2048,8,t,e)}function G1(t){O.flags|=4;var e=O.updateQueue;if(e===null)e=gu(),O.updateQueue=e,e.events=[t];else{var a=e.events;a===null?e.events=[t]:a.push(t)}}function wh(t){var e=it().memoizedState;return G1({ref:e,nextImpl:t}),function(){if((Y&2)!==0)throw Error(w(440));return e.impl.apply(void 0,arguments)}}function xh(t,e){return vu(4,2,t,e)}function Eh(t,e){return vu(4,4,t,e)}function Th(t,e){if(typeof e=="function"){t=t();var a=e(t);return function(){typeof a=="function"?a():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Ah(t,e,a){a=a!=null?a.concat([t]):null,vu(4,4,Th.bind(null,e,t),a)}function Mr(){}function _h(t,e){var a=it();e=e===void 0?null:e;var l=a.memoizedState;return e!==null&&br(e,l[1])?l[0]:(a.memoizedState=[t,e],t)}function Mh(t,e){var a=it();e=e===void 0?null:e;var l=a.memoizedState;if(e!==null&&br(e,l[1]))return l[0];if(l=t(),Ia){fa(!0);try{t()}finally{fa(!1)}}return a.memoizedState=[l,e],l}function zr(t,e,a){return a===void 0||(Ke&1073741824)!==0&&(L&261930)===0?t.memoizedState=e:(t.memoizedState=a,t=h0(),O.lanes|=t,za|=t,a)}function zh(t,e,a,l){return Ft(a,e)?a:Gl.current!==null?(t=zr(t,a,l),Ft(t,e)||(ft=!0),t):(Ke&42)===0||(Ke&1073741824)!==0&&(L&261930)===0?(ft=!0,t.memoizedState=a):(t=h0(),O.lanes|=t,za|=t,e)}function Nh(t,e,a,l,n){var i=j.p;j.p=i!==0&&8>i?i:8;var o=z.T,u={};z.T=u,Cr(t,!1,e,a);try{var s=n(),p=z.S;if(p!==null&&p(u,s),s!==null&&typeof s=="object"&&typeof s.then=="function"){var g=H1(s,l);Bn(t,e,g,Wt(t))}else Bn(t,e,l,Wt(t))}catch(v){Bn(t,e,{then:function(){},status:"rejected",reason:v},Wt())}finally{j.p=i,o!==null&&u.types!==null&&(o.types=u.types),z.T=o}}function Q1(){}function Cs(t,e,a,l){if(t.tag!==5)throw Error(w(476));var n=Ch(t).queue;Nh(t,n,e,Qa,a===null?Q1:function(){return Oh(t),a(l)})}function Ch(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:Qa,baseState:Qa,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Je,lastRenderedState:Qa},next:null};var a={};return e.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Je,lastRenderedState:a},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function Oh(t){var e=Ch(t);e.next===null&&(e=t.alternate.memoizedState),Bn(t,e.next.queue,{},Wt())}function Nr(){return xt(ti)}function $h(){return it().memoizedState}function Rh(){return it().memoizedState}function X1(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var a=Wt();t=va(a);var l=ba(e,t,a);l!==null&&(Ht(l,e,a),Un(l,e,a)),e={cache:mr()},t.payload=e;return}e=e.return}}function k1(t,e,a){var l=Wt();a={lane:l,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},bu(t)?Dh(e,a):(a=rr(t,e,a,l),a!==null&&(Ht(a,t,l),Lh(a,e,l)))}function Uh(t,e,a){var l=Wt();Bn(t,e,a,l)}function Bn(t,e,a,l){var n={lane:l,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(bu(t))Dh(e,n);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var o=e.lastRenderedState,u=i(o,a);if(n.hasEagerState=!0,n.eagerState=u,Ft(u,o))return mu(t,e,n,0),k===null&&pu(),!1}catch{}finally{}if(a=rr(t,e,n,l),a!==null)return Ht(a,t,l),Lh(a,e,l),!0}return!1}function Cr(t,e,a,l){if(l={lane:2,revertLane:qr(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},bu(t)){if(e)throw Error(w(479))}else e=rr(t,a,l,2),e!==null&&Ht(e,t,2)}function bu(t){var e=t.alternate;return t===O||e!==null&&e===O}function Dh(t,e){Bl=ko=!0;var a=t.pending;a===null?e.next=e:(e.next=a.next,a.next=e),t.pending=e}function Lh(t,e,a){if((a&4194048)!==0){var l=e.lanes;l&=t.pendingLanes,a|=l,e.lanes=a,wm(t,a)}}var Fn={readContext:xt,use:yu,useCallback:at,useContext:at,useEffect:at,useImperativeHandle:at,useLayoutEffect:at,useInsertionEffect:at,useMemo:at,useReducer:at,useRef:at,useState:at,useDebugValue:at,useDeferredValue:at,useTransition:at,useSyncExternalStore:at,useId:at,useHostTransitionStatus:at,useFormState:at,useActionState:at,useOptimistic:at,useMemoCache:at,useCacheRefresh:at};Fn.useEffectEvent=at;var Bh={readContext:xt,use:yu,useCallback:function(t,e){return Ct().memoizedState=[t,e===void 0?null:e],t},useContext:xt,useEffect:Sp,useImperativeHandle:function(t,e,a){a=a!=null?a.concat([t]):null,_o(4194308,4,Th.bind(null,e,t),a)},useLayoutEffect:function(t,e){return _o(4194308,4,t,e)},useInsertionEffect:function(t,e){_o(4,2,t,e)},useMemo:function(t,e){var a=Ct();e=e===void 0?null:e;var l=t();if(Ia){fa(!0);try{t()}finally{fa(!1)}}return a.memoizedState=[l,e],l},useReducer:function(t,e,a){var l=Ct();if(a!==void 0){var n=a(e);if(Ia){fa(!0);try{a(e)}finally{fa(!1)}}}else n=e;return l.memoizedState=l.baseState=n,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:n},l.queue=t,t=t.dispatch=k1.bind(null,O,t),[l.memoizedState,t]},useRef:function(t){var e=Ct();return t={current:t},e.memoizedState=t},useState:function(t){t=zs(t);var e=t.queue,a=Uh.bind(null,O,e);return e.dispatch=a,[t.memoizedState,a]},useDebugValue:Mr,useDeferredValue:function(t,e){var a=Ct();return zr(a,t,e)},useTransition:function(){var t=zs(!1);return t=Nh.bind(null,O,t.queue,!0,!1),Ct().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,a){var l=O,n=Ct();if(B){if(a===void 0)throw Error(w(407));a=a()}else{if(a=e(),k===null)throw Error(w(349));(L&127)!==0||rh(l,e,a)}n.memoizedState=a;var i={value:a,getSnapshot:e};return n.queue=i,Sp(dh.bind(null,l,i,t),[t]),l.flags|=2048,Ql(9,{destroy:void 0},fh.bind(null,l,i,a,e),null),a},useId:function(){var t=Ct(),e=k.identifierPrefix;if(B){var a=Te,l=Ee;a=(l&~(1<<32-Jt(l)-1)).toString(32)+a,e="_"+e+"R_"+a,a=Zo++,0<a&&(e+="H"+a.toString(32)),e+="_"}else a=q1++,e="_"+e+"r_"+a.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:Nr,useFormState:yp,useActionState:yp,useOptimistic:function(t){var e=Ct();e.memoizedState=e.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=a,e=Cr.bind(null,O,!0,a),a.dispatch=e,[t,e]},useMemoCache:Tr,useCacheRefresh:function(){return Ct().memoizedState=X1.bind(null,O)},useEffectEvent:function(t){var e=Ct(),a={impl:t};return e.memoizedState=a,function(){if((Y&2)!==0)throw Error(w(440));return a.impl.apply(void 0,arguments)}}},Or={readContext:xt,use:yu,useCallback:_h,useContext:xt,useEffect:_r,useImperativeHandle:Ah,useInsertionEffect:xh,useLayoutEffect:Eh,useMemo:Mh,useReducer:Ao,useRef:Sh,useState:function(){return Ao(Je)},useDebugValue:Mr,useDeferredValue:function(t,e){var a=it();return zh(a,X.memoizedState,t,e)},useTransition:function(){var t=Ao(Je)[0],e=it().memoizedState;return[typeof t=="boolean"?t:ri(t),e]},useSyncExternalStore:sh,useId:$h,useHostTransitionStatus:Nr,useFormState:vp,useActionState:vp,useOptimistic:function(t,e){var a=it();return hh(a,X,t,e)},useMemoCache:Tr,useCacheRefresh:Rh};Or.useEffectEvent=wh;var Hh={readContext:xt,use:yu,useCallback:_h,useContext:xt,useEffect:_r,useImperativeHandle:Ah,useInsertionEffect:xh,useLayoutEffect:Eh,useMemo:Mh,useReducer:Hc,useRef:Sh,useState:function(){return Hc(Je)},useDebugValue:Mr,useDeferredValue:function(t,e){var a=it();return X===null?zr(a,t,e):zh(a,X.memoizedState,t,e)},useTransition:function(){var t=Hc(Je)[0],e=it().memoizedState;return[typeof t=="boolean"?t:ri(t),e]},useSyncExternalStore:sh,useId:$h,useHostTransitionStatus:Nr,useFormState:bp,useActionState:bp,useOptimistic:function(t,e){var a=it();return X!==null?hh(a,X,t,e):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:Tr,useCacheRefresh:Rh};Hh.useEffectEvent=wh;function qc(t,e,a,l){e=t.memoizedState,a=a(l,e),a=a==null?e:I({},e,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var Os={enqueueSetState:function(t,e,a){t=t._reactInternals;var l=Wt(),n=va(l);n.payload=e,a!=null&&(n.callback=a),e=ba(t,n,l),e!==null&&(Ht(e,t,l),Un(e,t,l))},enqueueReplaceState:function(t,e,a){t=t._reactInternals;var l=Wt(),n=va(l);n.tag=1,n.payload=e,a!=null&&(n.callback=a),e=ba(t,n,l),e!==null&&(Ht(e,t,l),Un(e,t,l))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var a=Wt(),l=va(a);l.tag=2,e!=null&&(l.callback=e),e=ba(t,l,a),e!==null&&(Ht(e,t,a),Un(e,t,a))}};function wp(t,e,a,l,n,i,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(l,i,o):e.prototype&&e.prototype.isPureReactComponent?!kn(a,l)||!kn(n,i):!0}function xp(t,e,a,l){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(a,l),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(a,l),e.state!==t&&Os.enqueueReplaceState(e,e.state,null)}function Pa(t,e){var a=e;if("ref"in e){a={};for(var l in e)l!=="ref"&&(a[l]=e[l])}if(t=t.defaultProps){a===e&&(a=I({},a));for(var n in t)a[n]===void 0&&(a[n]=t[n])}return a}function qh(t){qo(t)}function Yh(t){console.error(t)}function jh(t){qo(t)}function Ko(t,e){try{var a=t.onUncaughtError;a(e.value,{componentStack:e.stack})}catch(l){setTimeout(function(){throw l})}}function Ep(t,e,a){try{var l=t.onCaughtError;l(a.value,{componentStack:a.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(n){setTimeout(function(){throw n})}}function $s(t,e,a){return a=va(a),a.tag=3,a.payload={element:null},a.callback=function(){Ko(t,e)},a}function Vh(t){return t=va(t),t.tag=3,t}function Gh(t,e,a,l){var n=a.type.getDerivedStateFromError;if(typeof n=="function"){var i=l.value;t.payload=function(){return n(i)},t.callback=function(){Ep(e,a,l)}}var o=a.stateNode;o!==null&&typeof o.componentDidCatch=="function"&&(t.callback=function(){Ep(e,a,l),typeof n!="function"&&(Sa===null?Sa=new Set([this]):Sa.add(this));var u=l.stack;this.componentDidCatch(l.value,{componentStack:u!==null?u:""})})}function Z1(t,e,a,l,n){if(a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(e=a.alternate,e!==null&&Il(e,a,n,!0),a=It.current,a!==null){switch(a.tag){case 31:case 13:return se===null?Po():a.alternate===null&&lt===0&&(lt=3),a.flags&=-257,a.flags|=65536,a.lanes=n,l===Go?a.flags|=16384:(e=a.updateQueue,e===null?a.updateQueue=new Set([l]):e.add(l),Wc(t,l,n)),!1;case 22:return a.flags|=65536,l===Go?a.flags|=16384:(e=a.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([l])},a.updateQueue=e):(a=e.retryQueue,a===null?e.retryQueue=new Set([l]):a.add(l)),Wc(t,l,n)),!1}throw Error(w(435,a.tag))}return Wc(t,l,n),Po(),!1}if(B)return e=It.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=n,l!==bs&&(t=Error(w(422),{cause:l}),Kn(ue(t,a)))):(l!==bs&&(e=Error(w(423),{cause:l}),Kn(ue(e,a))),t=t.current.alternate,t.flags|=65536,n&=-n,t.lanes|=n,l=ue(l,a),n=$s(t.stateNode,l,n),Bc(t,n),lt!==4&&(lt=2)),!1;var i=Error(w(520),{cause:l});if(i=ue(i,a),Yn===null?Yn=[i]:Yn.push(i),lt!==4&&(lt=2),e===null)return!0;l=ue(l,a),a=e;do{switch(a.tag){case 3:return a.flags|=65536,t=n&-n,a.lanes|=t,t=$s(a.stateNode,l,t),Bc(a,t),!1;case 1:if(e=a.type,i=a.stateNode,(a.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(Sa===null||!Sa.has(i))))return a.flags|=65536,n&=-n,a.lanes|=n,n=Vh(n),Gh(n,t,a,l),Bc(a,n),!1}a=a.return}while(a!==null);return!1}var $r=Error(w(461)),ft=!1;function bt(t,e,a,l){e.child=t===null?lh(e,null,a,l):Fa(e,t.child,a,l)}function Tp(t,e,a,l,n){a=a.render;var i=e.ref;if("ref"in l){var o={};for(var u in l)u!=="ref"&&(o[u]=l[u])}else o=l;return Wa(e),l=Sr(t,e,a,o,i,n),u=wr(),t!==null&&!ft?(xr(t,e,n),We(t,e,n)):(B&&u&&dr(e),e.flags|=1,bt(t,e,l,n),e.child)}function Ap(t,e,a,l,n){if(t===null){var i=a.type;return typeof i=="function"&&!fr(i)&&i.defaultProps===void 0&&a.compare===null?(e.tag=15,e.type=i,Qh(t,e,i,l,n)):(t=Eo(a.type,null,l,e,e.mode,n),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!Rr(t,n)){var o=i.memoizedProps;if(a=a.compare,a=a!==null?a:kn,a(o,l)&&t.ref===e.ref)return We(t,e,n)}return e.flags|=1,t=Qe(i,l),t.ref=e.ref,t.return=e,e.child=t}function Qh(t,e,a,l,n){if(t!==null){var i=t.memoizedProps;if(kn(i,l)&&t.ref===e.ref)if(ft=!1,e.pendingProps=l=i,Rr(t,n))(t.flags&131072)!==0&&(ft=!0);else return e.lanes=t.lanes,We(t,e,n)}return Rs(t,e,a,l,n)}function Xh(t,e,a,l){var n=l.children,i=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((e.flags&128)!==0){if(i=i!==null?i.baseLanes|a:a,t!==null){for(l=e.child=t.child,n=0;l!==null;)n=n|l.lanes|l.childLanes,l=l.sibling;l=n&~i}else l=0,e.child=null;return _p(t,e,i,a,l)}if((a&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&To(e,i!==null?i.cachePool:null),i!==null?mp(e,i):_s(),oh(e);else return l=e.lanes=536870912,_p(t,e,i!==null?i.baseLanes|a:a,a,l)}else i!==null?(To(e,i.cachePool),mp(e,i),sa(e),e.memoizedState=null):(t!==null&&To(e,null),_s(),sa(e));return bt(t,e,n,a),e.child}function zn(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function _p(t,e,a,l,n){var i=hr();return i=i===null?null:{parent:rt._currentValue,pool:i},e.memoizedState={baseLanes:a,cachePool:i},t!==null&&To(e,null),_s(),oh(e),t!==null&&Il(t,e,l,!0),e.childLanes=n,null}function Mo(t,e){return e=Jo({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Mp(t,e,a){return Fa(e,t.child,null,a),t=Mo(e,e.pendingProps),t.flags|=2,Qt(e),e.memoizedState=null,t}function K1(t,e,a){var l=e.pendingProps,n=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(B){if(l.mode==="hidden")return t=Mo(e,l),e.lanes=536870912,zn(null,t);if(Ms(e),(t=F)?(t=B0(t,ce),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:Aa!==null?{id:Ee,overflow:Te}:null,retryLane:536870912,hydrationErrors:null},a=Wm(t),a.return=e,e.child=a,wt=e,F=null)):t=null,t===null)throw _a(e);return e.lanes=536870912,null}return Mo(e,l)}var i=t.memoizedState;if(i!==null){var o=i.dehydrated;if(Ms(e),n)if(e.flags&256)e.flags&=-257,e=Mp(t,e,a);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(w(558));else if(ft||Il(t,e,a,!1),n=(a&t.childLanes)!==0,ft||n){if(l=k,l!==null&&(o=xm(l,a),o!==0&&o!==i.retryLane))throw i.retryLane=o,ll(t,o),Ht(l,t,o),$r;Po(),e=Mp(t,e,a)}else t=i.treeContext,F=re(o.nextSibling),wt=e,B=!0,ya=null,ce=!1,t!==null&&Im(e,t),e=Mo(e,l),e.flags|=4096;return e}return t=Qe(t.child,{mode:l.mode,children:l.children}),t.ref=e.ref,e.child=t,t.return=e,t}function zo(t,e){var a=e.ref;if(a===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(w(284));(t===null||t.ref!==a)&&(e.flags|=4194816)}}function Rs(t,e,a,l,n){return Wa(e),a=Sr(t,e,a,l,void 0,n),l=wr(),t!==null&&!ft?(xr(t,e,n),We(t,e,n)):(B&&l&&dr(e),e.flags|=1,bt(t,e,a,n),e.child)}function zp(t,e,a,l,n,i){return Wa(e),e.updateQueue=null,a=ch(e,l,a,n),uh(t),l=wr(),t!==null&&!ft?(xr(t,e,i),We(t,e,i)):(B&&l&&dr(e),e.flags|=1,bt(t,e,a,i),e.child)}function Np(t,e,a,l,n){if(Wa(e),e.stateNode===null){var i=zl,o=a.contextType;typeof o=="object"&&o!==null&&(i=xt(o)),i=new a(l,i),e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Os,e.stateNode=i,i._reactInternals=e,i=e.stateNode,i.props=l,i.state=e.memoizedState,i.refs={},yr(e),o=a.contextType,i.context=typeof o=="object"&&o!==null?xt(o):zl,i.state=e.memoizedState,o=a.getDerivedStateFromProps,typeof o=="function"&&(qc(e,a,o,l),i.state=e.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(o=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),o!==i.state&&Os.enqueueReplaceState(i,i.state,null),Ln(e,l,i,n),Dn(),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308),l=!0}else if(t===null){i=e.stateNode;var u=e.memoizedProps,s=Pa(a,u);i.props=s;var p=i.context,g=a.contextType;o=zl,typeof g=="object"&&g!==null&&(o=xt(g));var v=a.getDerivedStateFromProps;g=typeof v=="function"||typeof i.getSnapshotBeforeUpdate=="function",u=e.pendingProps!==u,g||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u||p!==o)&&xp(e,i,l,o),oa=!1;var m=e.memoizedState;i.state=m,Ln(e,l,i,n),Dn(),p=e.memoizedState,u||m!==p||oa?(typeof v=="function"&&(qc(e,a,v,l),p=e.memoizedState),(s=oa||wp(e,a,s,l,m,p,o))?(g||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(e.flags|=4194308)):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=l,e.memoizedState=p),i.props=l,i.state=p,i.context=o,l=s):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),l=!1)}else{i=e.stateNode,Ts(t,e),o=e.memoizedProps,g=Pa(a,o),i.props=g,v=e.pendingProps,m=i.context,p=a.contextType,s=zl,typeof p=="object"&&p!==null&&(s=xt(p)),u=a.getDerivedStateFromProps,(p=typeof u=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(o!==v||m!==s)&&xp(e,i,l,s),oa=!1,m=e.memoizedState,i.state=m,Ln(e,l,i,n),Dn();var y=e.memoizedState;o!==v||m!==y||oa||t!==null&&t.dependencies!==null&&Vo(t.dependencies)?(typeof u=="function"&&(qc(e,a,u,l),y=e.memoizedState),(g=oa||wp(e,a,g,l,m,y,s)||t!==null&&t.dependencies!==null&&Vo(t.dependencies))?(p||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(l,y,s),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(l,y,s)),typeof i.componentDidUpdate=="function"&&(e.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof i.componentDidUpdate!="function"||o===t.memoizedProps&&m===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&m===t.memoizedState||(e.flags|=1024),e.memoizedProps=l,e.memoizedState=y),i.props=l,i.state=y,i.context=s,l=g):(typeof i.componentDidUpdate!="function"||o===t.memoizedProps&&m===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&m===t.memoizedState||(e.flags|=1024),l=!1)}return i=l,zo(t,e),l=(e.flags&128)!==0,i||l?(i=e.stateNode,a=l&&typeof a.getDerivedStateFromError!="function"?null:i.render(),e.flags|=1,t!==null&&l?(e.child=Fa(e,t.child,null,n),e.child=Fa(e,null,a,n)):bt(t,e,a,n),e.memoizedState=i.state,t=e.child):t=We(t,e,n),t}function Cp(t,e,a,l){return Ja(),e.flags|=256,bt(t,e,a,l),e.child}var Yc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function jc(t){return{baseLanes:t,cachePool:th()}}function Vc(t,e,a){return t=t!==null?t.childLanes&~a:0,e&&(t|=kt),t}function kh(t,e,a){var l=e.pendingProps,n=!1,i=(e.flags&128)!==0,o;if((o=i)||(o=t!==null&&t.memoizedState===null?!1:(nt.current&2)!==0),o&&(n=!0,e.flags&=-129),o=(e.flags&32)!==0,e.flags&=-33,t===null){if(B){if(n?ca(e):sa(e),(t=F)?(t=B0(t,ce),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:Aa!==null?{id:Ee,overflow:Te}:null,retryLane:536870912,hydrationErrors:null},a=Wm(t),a.return=e,e.child=a,wt=e,F=null)):t=null,t===null)throw _a(e);return Zs(t)?e.lanes=32:e.lanes=536870912,null}var u=l.children;return l=l.fallback,n?(sa(e),n=e.mode,u=Jo({mode:"hidden",children:u},n),l=Xa(l,n,a,null),u.return=e,l.return=e,u.sibling=l,e.child=u,l=e.child,l.memoizedState=jc(a),l.childLanes=Vc(t,o,a),e.memoizedState=Yc,zn(null,l)):(ca(e),Us(e,u))}var s=t.memoizedState;if(s!==null&&(u=s.dehydrated,u!==null)){if(i)e.flags&256?(ca(e),e.flags&=-257,e=Gc(t,e,a)):e.memoizedState!==null?(sa(e),e.child=t.child,e.flags|=128,e=null):(sa(e),u=l.fallback,n=e.mode,l=Jo({mode:"visible",children:l.children},n),u=Xa(u,n,a,null),u.flags|=2,l.return=e,u.return=e,l.sibling=u,e.child=l,Fa(e,t.child,null,a),l=e.child,l.memoizedState=jc(a),l.childLanes=Vc(t,o,a),e.memoizedState=Yc,e=zn(null,l));else if(ca(e),Zs(u)){if(o=u.nextSibling&&u.nextSibling.dataset,o)var p=o.dgst;o=p,l=Error(w(419)),l.stack="",l.digest=o,Kn({value:l,source:null,stack:null}),e=Gc(t,e,a)}else if(ft||Il(t,e,a,!1),o=(a&t.childLanes)!==0,ft||o){if(o=k,o!==null&&(l=xm(o,a),l!==0&&l!==s.retryLane))throw s.retryLane=l,ll(t,l),Ht(o,t,l),$r;ks(u)||Po(),e=Gc(t,e,a)}else ks(u)?(e.flags|=192,e.child=t.child,e=null):(t=s.treeContext,F=re(u.nextSibling),wt=e,B=!0,ya=null,ce=!1,t!==null&&Im(e,t),e=Us(e,l.children),e.flags|=4096);return e}return n?(sa(e),u=l.fallback,n=e.mode,s=t.child,p=s.sibling,l=Qe(s,{mode:"hidden",children:l.children}),l.subtreeFlags=s.subtreeFlags&65011712,p!==null?u=Qe(p,u):(u=Xa(u,n,a,null),u.flags|=2),u.return=e,l.return=e,l.sibling=u,e.child=l,zn(null,l),l=e.child,u=t.child.memoizedState,u===null?u=jc(a):(n=u.cachePool,n!==null?(s=rt._currentValue,n=n.parent!==s?{parent:s,pool:s}:n):n=th(),u={baseLanes:u.baseLanes|a,cachePool:n}),l.memoizedState=u,l.childLanes=Vc(t,o,a),e.memoizedState=Yc,zn(t.child,l)):(ca(e),a=t.child,t=a.sibling,a=Qe(a,{mode:"visible",children:l.children}),a.return=e,a.sibling=null,t!==null&&(o=e.deletions,o===null?(e.deletions=[t],e.flags|=16):o.push(t)),e.child=a,e.memoizedState=null,a)}function Us(t,e){return e=Jo({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Jo(t,e){return t=Xt(22,t,null,e),t.lanes=0,t}function Gc(t,e,a){return Fa(e,t.child,null,a),t=Us(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Op(t,e,a){t.lanes|=e;var l=t.alternate;l!==null&&(l.lanes|=e),ws(t.return,e,a)}function Qc(t,e,a,l,n,i){var o=t.memoizedState;o===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:l,tail:a,tailMode:n,treeForkCount:i}:(o.isBackwards=e,o.rendering=null,o.renderingStartTime=0,o.last=l,o.tail=a,o.tailMode=n,o.treeForkCount=i)}function Zh(t,e,a){var l=e.pendingProps,n=l.revealOrder,i=l.tail;l=l.children;var o=nt.current,u=(o&2)!==0;if(u?(o=o&1|2,e.flags|=128):o&=1,K(nt,o),bt(t,e,l,a),l=B?Zn:0,!u&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Op(t,a,e);else if(t.tag===19)Op(t,a,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(n){case"forwards":for(a=e.child,n=null;a!==null;)t=a.alternate,t!==null&&Xo(t)===null&&(n=a),a=a.sibling;a=n,a===null?(n=e.child,e.child=null):(n=a.sibling,a.sibling=null),Qc(e,!1,n,a,i,l);break;case"backwards":case"unstable_legacy-backwards":for(a=null,n=e.child,e.child=null;n!==null;){if(t=n.alternate,t!==null&&Xo(t)===null){e.child=n;break}t=n.sibling,n.sibling=a,a=n,n=t}Qc(e,!0,a,null,i,l);break;case"together":Qc(e,!1,null,null,void 0,l);break;default:e.memoizedState=null}return e.child}function We(t,e,a){if(t!==null&&(e.dependencies=t.dependencies),za|=e.lanes,(a&e.childLanes)===0)if(t!==null){if(Il(t,e,a,!1),(a&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(w(153));if(e.child!==null){for(t=e.child,a=Qe(t,t.pendingProps),e.child=a,a.return=e;t.sibling!==null;)t=t.sibling,a=a.sibling=Qe(t,t.pendingProps),a.return=e;a.sibling=null}return e.child}function Rr(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&Vo(t)))}function J1(t,e,a){switch(e.tag){case 3:Do(e,e.stateNode.containerInfo),ua(e,rt,t.memoizedState.cache),Ja();break;case 27:case 5:cs(e);break;case 4:Do(e,e.stateNode.containerInfo);break;case 10:ua(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,Ms(e),null;break;case 13:var l=e.memoizedState;if(l!==null)return l.dehydrated!==null?(ca(e),e.flags|=128,null):(a&e.child.childLanes)!==0?kh(t,e,a):(ca(e),t=We(t,e,a),t!==null?t.sibling:null);ca(e);break;case 19:var n=(t.flags&128)!==0;if(l=(a&e.childLanes)!==0,l||(Il(t,e,a,!1),l=(a&e.childLanes)!==0),n){if(l)return Zh(t,e,a);e.flags|=128}if(n=e.memoizedState,n!==null&&(n.rendering=null,n.tail=null,n.lastEffect=null),K(nt,nt.current),l)break;return null;case 22:return e.lanes=0,Xh(t,e,a,e.pendingProps);case 24:ua(e,rt,t.memoizedState.cache)}return We(t,e,a)}function Kh(t,e,a){if(t!==null)if(t.memoizedProps!==e.pendingProps)ft=!0;else{if(!Rr(t,a)&&(e.flags&128)===0)return ft=!1,J1(t,e,a);ft=(t.flags&131072)!==0}else ft=!1,B&&(e.flags&1048576)!==0&&Fm(e,Zn,e.index);switch(e.lanes=0,e.tag){case 16:t:{var l=e.pendingProps;if(t=Va(e.elementType),e.type=t,typeof t=="function")fr(t)?(l=Pa(t,l),e.tag=1,e=Np(null,e,t,l,a)):(e.tag=0,e=Rs(null,e,t,l,a));else{if(t!=null){var n=t.$$typeof;if(n===Fs){e.tag=11,e=Tp(null,e,t,l,a);break t}else if(n===Is){e.tag=14,e=Ap(null,e,t,l,a);break t}}throw e=os(t)||t,Error(w(306,e,""))}}return e;case 0:return Rs(t,e,e.type,e.pendingProps,a);case 1:return l=e.type,n=Pa(l,e.pendingProps),Np(t,e,l,n,a);case 3:t:{if(Do(e,e.stateNode.containerInfo),t===null)throw Error(w(387));l=e.pendingProps;var i=e.memoizedState;n=i.element,Ts(t,e),Ln(e,l,null,a);var o=e.memoizedState;if(l=o.cache,ua(e,rt,l),l!==i.cache&&xs(e,[rt],a,!0),Dn(),l=o.element,i.isDehydrated)if(i={element:l,isDehydrated:!1,cache:o.cache},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){e=Cp(t,e,l,a);break t}else if(l!==n){n=ue(Error(w(424)),e),Kn(n),e=Cp(t,e,l,a);break t}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(F=re(t.firstChild),wt=e,B=!0,ya=null,ce=!0,a=lh(e,null,l,a),e.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(Ja(),l===n){e=We(t,e,a);break t}bt(t,e,l,a)}e=e.child}return e;case 26:return zo(t,e),t===null?(a=Pp(e.type,null,e.pendingProps,null))?e.memoizedState=a:B||(a=e.type,t=e.pendingProps,l=lu(ga.current).createElement(a),l[St]=e,l[qt]=t,Et(l,a,t),gt(l),e.stateNode=l):e.memoizedState=Pp(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return cs(e),t===null&&B&&(l=e.stateNode=H0(e.type,e.pendingProps,ga.current),wt=e,ce=!0,n=F,Ca(e.type)?(Ks=n,F=re(l.firstChild)):F=n),bt(t,e,e.pendingProps.children,a),zo(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&B&&((n=l=F)&&(l=Eb(l,e.type,e.pendingProps,ce),l!==null?(e.stateNode=l,wt=e,F=re(l.firstChild),ce=!1,n=!0):n=!1),n||_a(e)),cs(e),n=e.type,i=e.pendingProps,o=t!==null?t.memoizedProps:null,l=i.children,Qs(n,i)?l=null:o!==null&&Qs(n,o)&&(e.flags|=32),e.memoizedState!==null&&(n=Sr(t,e,Y1,null,null,a),ti._currentValue=n),zo(t,e),bt(t,e,l,a),e.child;case 6:return t===null&&B&&((t=a=F)&&(a=Tb(a,e.pendingProps,ce),a!==null?(e.stateNode=a,wt=e,F=null,t=!0):t=!1),t||_a(e)),null;case 13:return kh(t,e,a);case 4:return Do(e,e.stateNode.containerInfo),l=e.pendingProps,t===null?e.child=Fa(e,null,l,a):bt(t,e,l,a),e.child;case 11:return Tp(t,e,e.type,e.pendingProps,a);case 7:return bt(t,e,e.pendingProps,a),e.child;case 8:return bt(t,e,e.pendingProps.children,a),e.child;case 12:return bt(t,e,e.pendingProps.children,a),e.child;case 10:return l=e.pendingProps,ua(e,e.type,l.value),bt(t,e,l.children,a),e.child;case 9:return n=e.type._context,l=e.pendingProps.children,Wa(e),n=xt(n),l=l(n),e.flags|=1,bt(t,e,l,a),e.child;case 14:return Ap(t,e,e.type,e.pendingProps,a);case 15:return Qh(t,e,e.type,e.pendingProps,a);case 19:return Zh(t,e,a);case 31:return K1(t,e,a);case 22:return Xh(t,e,a,e.pendingProps);case 24:return Wa(e),l=xt(rt),t===null?(n=hr(),n===null&&(n=k,i=mr(),n.pooledCache=i,i.refCount++,i!==null&&(n.pooledCacheLanes|=a),n=i),e.memoizedState={parent:l,cache:n},yr(e),ua(e,rt,n)):((t.lanes&a)!==0&&(Ts(t,e),Ln(e,null,null,a),Dn()),n=t.memoizedState,i=e.memoizedState,n.parent!==l?(n={parent:l,cache:l},e.memoizedState=n,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=n),ua(e,rt,l)):(l=i.cache,ua(e,rt,l),l!==n.cache&&xs(e,[rt],a,!0))),bt(t,e,e.pendingProps.children,a),e.child;case 29:throw e.pendingProps}throw Error(w(156,e.tag))}function De(t){t.flags|=4}function Xc(t,e,a,l,n){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(n&335544128)===n)if(t.stateNode.complete)t.flags|=8192;else if(v0())t.flags|=8192;else throw Za=Go,gr}else t.flags&=-16777217}function $p(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!j0(e))if(v0())t.flags|=8192;else throw Za=Go,gr}function fo(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?bm():536870912,t.lanes|=e,Xl|=e)}function wn(t,e){if(!B)switch(t.tailMode){case"hidden":e=t.tail;for(var a=null;e!==null;)e.alternate!==null&&(a=e),e=e.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var l=null;a!==null;)a.alternate!==null&&(l=a),a=a.sibling;l===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:l.sibling=null}}function W(t){var e=t.alternate!==null&&t.alternate.child===t.child,a=0,l=0;if(e)for(var n=t.child;n!==null;)a|=n.lanes|n.childLanes,l|=n.subtreeFlags&65011712,l|=n.flags&65011712,n.return=t,n=n.sibling;else for(n=t.child;n!==null;)a|=n.lanes|n.childLanes,l|=n.subtreeFlags,l|=n.flags,n.return=t,n=n.sibling;return t.subtreeFlags|=l,t.childLanes=a,e}function W1(t,e,a){var l=e.pendingProps;switch(pr(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return W(e),null;case 1:return W(e),null;case 3:return a=e.stateNode,l=null,t!==null&&(l=t.memoizedState.cache),e.memoizedState.cache!==l&&(e.flags|=2048),Xe(rt),ql(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(gl(e)?De(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Lc())),W(e),null;case 26:var n=e.type,i=e.memoizedState;return t===null?(De(e),i!==null?(W(e),$p(e,i)):(W(e),Xc(e,n,null,l,a))):i?i!==t.memoizedState?(De(e),W(e),$p(e,i)):(W(e),e.flags&=-16777217):(t=t.memoizedProps,t!==l&&De(e),W(e),Xc(e,n,t,l,a)),null;case 27:if(Lo(e),a=ga.current,n=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==l&&De(e);else{if(!l){if(e.stateNode===null)throw Error(w(166));return W(e),null}t=_e.current,gl(e)?up(e,t):(t=H0(n,l,a),e.stateNode=t,De(e))}return W(e),null;case 5:if(Lo(e),n=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==l&&De(e);else{if(!l){if(e.stateNode===null)throw Error(w(166));return W(e),null}if(i=_e.current,gl(e))up(e,i);else{var o=lu(ga.current);switch(i){case 1:i=o.createElementNS("http://www.w3.org/2000/svg",n);break;case 2:i=o.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;default:switch(n){case"svg":i=o.createElementNS("http://www.w3.org/2000/svg",n);break;case"math":i=o.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;case"script":i=o.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof l.is=="string"?o.createElement("select",{is:l.is}):o.createElement("select"),l.multiple?i.multiple=!0:l.size&&(i.size=l.size);break;default:i=typeof l.is=="string"?o.createElement(n,{is:l.is}):o.createElement(n)}}i[St]=e,i[qt]=l;t:for(o=e.child;o!==null;){if(o.tag===5||o.tag===6)i.appendChild(o.stateNode);else if(o.tag!==4&&o.tag!==27&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===e)break t;for(;o.sibling===null;){if(o.return===null||o.return===e)break t;o=o.return}o.sibling.return=o.return,o=o.sibling}e.stateNode=i;t:switch(Et(i,n,l),n){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break t;case"img":l=!0;break t;default:l=!1}l&&De(e)}}return W(e),Xc(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,a),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==l&&De(e);else{if(typeof l!="string"&&e.stateNode===null)throw Error(w(166));if(t=ga.current,gl(e)){if(t=e.stateNode,a=e.memoizedProps,l=null,n=wt,n!==null)switch(n.tag){case 27:case 5:l=n.memoizedProps}t[St]=e,t=!!(t.nodeValue===a||l!==null&&l.suppressHydrationWarning===!0||U0(t.nodeValue,a)),t||_a(e,!0)}else t=lu(t).createTextNode(l),t[St]=e,e.stateNode=t}return W(e),null;case 31:if(a=e.memoizedState,t===null||t.memoizedState!==null){if(l=gl(e),a!==null){if(t===null){if(!l)throw Error(w(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(w(557));t[St]=e}else Ja(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;W(e),t=!1}else a=Lc(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return e.flags&256?(Qt(e),e):(Qt(e),null);if((e.flags&128)!==0)throw Error(w(558))}return W(e),null;case 13:if(l=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(n=gl(e),l!==null&&l.dehydrated!==null){if(t===null){if(!n)throw Error(w(318));if(n=e.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(w(317));n[St]=e}else Ja(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;W(e),n=!1}else n=Lc(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),n=!0;if(!n)return e.flags&256?(Qt(e),e):(Qt(e),null)}return Qt(e),(e.flags&128)!==0?(e.lanes=a,e):(a=l!==null,t=t!==null&&t.memoizedState!==null,a&&(l=e.child,n=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(n=l.alternate.memoizedState.cachePool.pool),i=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(i=l.memoizedState.cachePool.pool),i!==n&&(l.flags|=2048)),a!==t&&a&&(e.child.flags|=8192),fo(e,e.updateQueue),W(e),null);case 4:return ql(),t===null&&Yr(e.stateNode.containerInfo),W(e),null;case 10:return Xe(e.type),W(e),null;case 19:if(yt(nt),l=e.memoizedState,l===null)return W(e),null;if(n=(e.flags&128)!==0,i=l.rendering,i===null)if(n)wn(l,!1);else{if(lt!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(i=Xo(t),i!==null){for(e.flags|=128,wn(l,!1),t=i.updateQueue,e.updateQueue=t,fo(e,t),e.subtreeFlags=0,t=a,a=e.child;a!==null;)Jm(a,t),a=a.sibling;return K(nt,nt.current&1|2),B&&qe(e,l.treeForkCount),e.child}t=t.sibling}l.tail!==null&&Zt()>Fo&&(e.flags|=128,n=!0,wn(l,!1),e.lanes=4194304)}else{if(!n)if(t=Xo(i),t!==null){if(e.flags|=128,n=!0,t=t.updateQueue,e.updateQueue=t,fo(e,t),wn(l,!0),l.tail===null&&l.tailMode==="hidden"&&!i.alternate&&!B)return W(e),null}else 2*Zt()-l.renderingStartTime>Fo&&a!==536870912&&(e.flags|=128,n=!0,wn(l,!1),e.lanes=4194304);l.isBackwards?(i.sibling=e.child,e.child=i):(t=l.last,t!==null?t.sibling=i:e.child=i,l.last=i)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=Zt(),t.sibling=null,a=nt.current,K(nt,n?a&1|2:a&1),B&&qe(e,l.treeForkCount),t):(W(e),null);case 22:case 23:return Qt(e),vr(),l=e.memoizedState!==null,t!==null?t.memoizedState!==null!==l&&(e.flags|=8192):l&&(e.flags|=8192),l?(a&536870912)!==0&&(e.flags&128)===0&&(W(e),e.subtreeFlags&6&&(e.flags|=8192)):W(e),a=e.updateQueue,a!==null&&fo(e,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),l=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(l=e.memoizedState.cachePool.pool),l!==a&&(e.flags|=2048),t!==null&&yt(ka),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),e.memoizedState.cache!==a&&(e.flags|=2048),Xe(rt),W(e),null;case 25:return null;case 30:return null}throw Error(w(156,e.tag))}function F1(t,e){switch(pr(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Xe(rt),ql(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return Lo(e),null;case 31:if(e.memoizedState!==null){if(Qt(e),e.alternate===null)throw Error(w(340));Ja()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(Qt(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(w(340));Ja()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return yt(nt),null;case 4:return ql(),null;case 10:return Xe(e.type),null;case 22:case 23:return Qt(e),vr(),t!==null&&yt(ka),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Xe(rt),null;case 25:return null;default:return null}}function Jh(t,e){switch(pr(e),e.tag){case 3:Xe(rt),ql();break;case 26:case 27:case 5:Lo(e);break;case 4:ql();break;case 31:e.memoizedState!==null&&Qt(e);break;case 13:Qt(e);break;case 19:yt(nt);break;case 10:Xe(e.type);break;case 22:case 23:Qt(e),vr(),t!==null&&yt(ka);break;case 24:Xe(rt)}}function fi(t,e){try{var a=e.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var n=l.next;a=n;do{if((a.tag&t)===t){l=void 0;var i=a.create,o=a.inst;l=i(),o.destroy=l}a=a.next}while(a!==n)}}catch(u){G(e,e.return,u)}}function Ma(t,e,a){try{var l=e.updateQueue,n=l!==null?l.lastEffect:null;if(n!==null){var i=n.next;l=i;do{if((l.tag&t)===t){var o=l.inst,u=o.destroy;if(u!==void 0){o.destroy=void 0,n=e;var s=a,p=u;try{p()}catch(g){G(n,s,g)}}}l=l.next}while(l!==i)}}catch(g){G(e,e.return,g)}}function Wh(t){var e=t.updateQueue;if(e!==null){var a=t.stateNode;try{ih(e,a)}catch(l){G(t,t.return,l)}}}function Fh(t,e,a){a.props=Pa(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(l){G(t,e,l)}}function Hn(t,e){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var l=t.stateNode;break;case 30:l=t.stateNode;break;default:l=t.stateNode}typeof a=="function"?t.refCleanup=a(l):a.current=l}}catch(n){G(t,e,n)}}function Ae(t,e){var a=t.ref,l=t.refCleanup;if(a!==null)if(typeof l=="function")try{l()}catch(n){G(t,e,n)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(n){G(t,e,n)}else a.current=null}function Ih(t){var e=t.type,a=t.memoizedProps,l=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":a.autoFocus&&l.focus();break t;case"img":a.src?l.src=a.src:a.srcSet&&(l.srcset=a.srcSet)}}catch(n){G(t,t.return,n)}}function kc(t,e,a){try{var l=t.stateNode;yb(l,t.type,a,e),l[qt]=e}catch(n){G(t,t.return,n)}}function Ph(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Ca(t.type)||t.tag===4}function Zc(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||Ph(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Ca(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Ds(t,e,a){var l=t.tag;if(l===5||l===6)t=t.stateNode,e?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,e):(e=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,e.appendChild(t),a=a._reactRootContainer,a!=null||e.onclick!==null||(e.onclick=Ve));else if(l!==4&&(l===27&&Ca(t.type)&&(a=t.stateNode,e=null),t=t.child,t!==null))for(Ds(t,e,a),t=t.sibling;t!==null;)Ds(t,e,a),t=t.sibling}function Wo(t,e,a){var l=t.tag;if(l===5||l===6)t=t.stateNode,e?a.insertBefore(t,e):a.appendChild(t);else if(l!==4&&(l===27&&Ca(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(Wo(t,e,a),t=t.sibling;t!==null;)Wo(t,e,a),t=t.sibling}function t0(t){var e=t.stateNode,a=t.memoizedProps;try{for(var l=t.type,n=e.attributes;n.length;)e.removeAttributeNode(n[0]);Et(e,l,a),e[St]=t,e[qt]=a}catch(i){G(t,t.return,i)}}var Ye=!1,st=!1,Kc=!1,Rp=typeof WeakSet=="function"?WeakSet:Set,ht=null;function I1(t,e){if(t=t.containerInfo,Vs=uu,t=jm(t),cr(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else t:{a=(a=t.ownerDocument)&&a.defaultView||window;var l=a.getSelection&&a.getSelection();if(l&&l.rangeCount!==0){a=l.anchorNode;var n=l.anchorOffset,i=l.focusNode;l=l.focusOffset;try{a.nodeType,i.nodeType}catch{a=null;break t}var o=0,u=-1,s=-1,p=0,g=0,v=t,m=null;e:for(;;){for(var y;v!==a||n!==0&&v.nodeType!==3||(u=o+n),v!==i||l!==0&&v.nodeType!==3||(s=o+l),v.nodeType===3&&(o+=v.nodeValue.length),(y=v.firstChild)!==null;)m=v,v=y;for(;;){if(v===t)break e;if(m===a&&++p===n&&(u=o),m===i&&++g===l&&(s=o),(y=v.nextSibling)!==null)break;v=m,m=v.parentNode}v=y}a=u===-1||s===-1?null:{start:u,end:s}}else a=null}a=a||{start:0,end:0}}else a=null;for(Gs={focusedElem:t,selectionRange:a},uu=!1,ht=e;ht!==null;)if(e=ht,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,ht=t;else for(;ht!==null;){switch(e=ht,i=e.alternate,t=e.flags,e.tag){case 0:if((t&4)!==0&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(a=0;a<t.length;a++)n=t[a],n.ref.impl=n.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&i!==null){t=void 0,a=e,n=i.memoizedProps,i=i.memoizedState,l=a.stateNode;try{var E=Pa(a.type,n);t=l.getSnapshotBeforeUpdate(E,i),l.__reactInternalSnapshotBeforeUpdate=t}catch(_){G(a,a.return,_)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,a=t.nodeType,a===9)Xs(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Xs(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(w(163))}if(t=e.sibling,t!==null){t.return=e.return,ht=t;break}ht=e.return}}function e0(t,e,a){var l=a.flags;switch(a.tag){case 0:case 11:case 15:Be(t,a),l&4&&fi(5,a);break;case 1:if(Be(t,a),l&4)if(t=a.stateNode,e===null)try{t.componentDidMount()}catch(o){G(a,a.return,o)}else{var n=Pa(a.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(n,e,t.__reactInternalSnapshotBeforeUpdate)}catch(o){G(a,a.return,o)}}l&64&&Wh(a),l&512&&Hn(a,a.return);break;case 3:if(Be(t,a),l&64&&(t=a.updateQueue,t!==null)){if(e=null,a.child!==null)switch(a.child.tag){case 27:case 5:e=a.child.stateNode;break;case 1:e=a.child.stateNode}try{ih(t,e)}catch(o){G(a,a.return,o)}}break;case 27:e===null&&l&4&&t0(a);case 26:case 5:Be(t,a),e===null&&l&4&&Ih(a),l&512&&Hn(a,a.return);break;case 12:Be(t,a);break;case 31:Be(t,a),l&4&&n0(t,a);break;case 13:Be(t,a),l&4&&i0(t,a),l&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=ub.bind(null,a),Ab(t,a))));break;case 22:if(l=a.memoizedState!==null||Ye,!l){e=e!==null&&e.memoizedState!==null||st,n=Ye;var i=st;Ye=l,(st=e)&&!i?He(t,a,(a.subtreeFlags&8772)!==0):Be(t,a),Ye=n,st=i}break;case 30:break;default:Be(t,a)}}function a0(t){var e=t.alternate;e!==null&&(t.alternate=null,a0(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&ar(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var tt=null,Lt=!1;function Le(t,e,a){for(a=a.child;a!==null;)l0(t,e,a),a=a.sibling}function l0(t,e,a){if(Kt&&typeof Kt.onCommitFiberUnmount=="function")try{Kt.onCommitFiberUnmount(ni,a)}catch{}switch(a.tag){case 26:st||Ae(a,e),Le(t,e,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:st||Ae(a,e);var l=tt,n=Lt;Ca(a.type)&&(tt=a.stateNode,Lt=!1),Le(t,e,a),Vn(a.stateNode),tt=l,Lt=n;break;case 5:st||Ae(a,e);case 6:if(l=tt,n=Lt,tt=null,Le(t,e,a),tt=l,Lt=n,tt!==null)if(Lt)try{(tt.nodeType===9?tt.body:tt.nodeName==="HTML"?tt.ownerDocument.body:tt).removeChild(a.stateNode)}catch(i){G(a,e,i)}else try{tt.removeChild(a.stateNode)}catch(i){G(a,e,i)}break;case 18:tt!==null&&(Lt?(t=tt,Kp(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),Jl(t)):Kp(tt,a.stateNode));break;case 4:l=tt,n=Lt,tt=a.stateNode.containerInfo,Lt=!0,Le(t,e,a),tt=l,Lt=n;break;case 0:case 11:case 14:case 15:Ma(2,a,e),st||Ma(4,a,e),Le(t,e,a);break;case 1:st||(Ae(a,e),l=a.stateNode,typeof l.componentWillUnmount=="function"&&Fh(a,e,l)),Le(t,e,a);break;case 21:Le(t,e,a);break;case 22:st=(l=st)||a.memoizedState!==null,Le(t,e,a),st=l;break;default:Le(t,e,a)}}function n0(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Jl(t)}catch(a){G(e,e.return,a)}}}function i0(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Jl(t)}catch(a){G(e,e.return,a)}}function P1(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Rp),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Rp),e;default:throw Error(w(435,t.tag))}}function po(t,e){var a=P1(t);e.forEach(function(l){if(!a.has(l)){a.add(l);var n=cb.bind(null,t,l);l.then(n,n)}})}function Ut(t,e){var a=e.deletions;if(a!==null)for(var l=0;l<a.length;l++){var n=a[l],i=t,o=e,u=o;t:for(;u!==null;){switch(u.tag){case 27:if(Ca(u.type)){tt=u.stateNode,Lt=!1;break t}break;case 5:tt=u.stateNode,Lt=!1;break t;case 3:case 4:tt=u.stateNode.containerInfo,Lt=!0;break t}u=u.return}if(tt===null)throw Error(w(160));l0(i,o,n),tt=null,Lt=!1,i=n.alternate,i!==null&&(i.return=null),n.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)o0(e,t),e=e.sibling}var pe=null;function o0(t,e){var a=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Ut(e,t),Dt(t),l&4&&(Ma(3,t,t.return),fi(3,t),Ma(5,t,t.return));break;case 1:Ut(e,t),Dt(t),l&512&&(st||a===null||Ae(a,a.return)),l&64&&Ye&&(t=t.updateQueue,t!==null&&(l=t.callbacks,l!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?l:a.concat(l))));break;case 26:var n=pe;if(Ut(e,t),Dt(t),l&512&&(st||a===null||Ae(a,a.return)),l&4){var i=a!==null?a.memoizedState:null;if(l=t.memoizedState,a===null)if(l===null)if(t.stateNode===null){t:{l=t.type,a=t.memoizedProps,n=n.ownerDocument||n;e:switch(l){case"title":i=n.getElementsByTagName("title")[0],(!i||i[ui]||i[St]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=n.createElement(l),n.head.insertBefore(i,n.querySelector("head > title"))),Et(i,l,a),i[St]=t,gt(i),l=i;break t;case"link":var o=em("link","href",n).get(l+(a.href||""));if(o){for(var u=0;u<o.length;u++)if(i=o[u],i.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&i.getAttribute("rel")===(a.rel==null?null:a.rel)&&i.getAttribute("title")===(a.title==null?null:a.title)&&i.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){o.splice(u,1);break e}}i=n.createElement(l),Et(i,l,a),n.head.appendChild(i);break;case"meta":if(o=em("meta","content",n).get(l+(a.content||""))){for(u=0;u<o.length;u++)if(i=o[u],i.getAttribute("content")===(a.content==null?null:""+a.content)&&i.getAttribute("name")===(a.name==null?null:a.name)&&i.getAttribute("property")===(a.property==null?null:a.property)&&i.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&i.getAttribute("charset")===(a.charSet==null?null:a.charSet)){o.splice(u,1);break e}}i=n.createElement(l),Et(i,l,a),n.head.appendChild(i);break;default:throw Error(w(468,l))}i[St]=t,gt(i),l=i}t.stateNode=l}else am(n,t.type,t.stateNode);else t.stateNode=tm(n,l,t.memoizedProps);else i!==l?(i===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):i.count--,l===null?am(n,t.type,t.stateNode):tm(n,l,t.memoizedProps)):l===null&&t.stateNode!==null&&kc(t,t.memoizedProps,a.memoizedProps)}break;case 27:Ut(e,t),Dt(t),l&512&&(st||a===null||Ae(a,a.return)),a!==null&&l&4&&kc(t,t.memoizedProps,a.memoizedProps);break;case 5:if(Ut(e,t),Dt(t),l&512&&(st||a===null||Ae(a,a.return)),t.flags&32){n=t.stateNode;try{jl(n,"")}catch(E){G(t,t.return,E)}}l&4&&t.stateNode!=null&&(n=t.memoizedProps,kc(t,n,a!==null?a.memoizedProps:n)),l&1024&&(Kc=!0);break;case 6:if(Ut(e,t),Dt(t),l&4){if(t.stateNode===null)throw Error(w(162));l=t.memoizedProps,a=t.stateNode;try{a.nodeValue=l}catch(E){G(t,t.return,E)}}break;case 3:if(Oo=null,n=pe,pe=nu(e.containerInfo),Ut(e,t),pe=n,Dt(t),l&4&&a!==null&&a.memoizedState.isDehydrated)try{Jl(e.containerInfo)}catch(E){G(t,t.return,E)}Kc&&(Kc=!1,u0(t));break;case 4:l=pe,pe=nu(t.stateNode.containerInfo),Ut(e,t),Dt(t),pe=l;break;case 12:Ut(e,t),Dt(t);break;case 31:Ut(e,t),Dt(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,po(t,l)));break;case 13:Ut(e,t),Dt(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Su=Zt()),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,po(t,l)));break;case 22:n=t.memoizedState!==null;var s=a!==null&&a.memoizedState!==null,p=Ye,g=st;if(Ye=p||n,st=g||s,Ut(e,t),st=g,Ye=p,Dt(t),l&8192)t:for(e=t.stateNode,e._visibility=n?e._visibility&-2:e._visibility|1,n&&(a===null||s||Ye||st||Ga(t)),a=null,e=t;;){if(e.tag===5||e.tag===26){if(a===null){s=a=e;try{if(i=s.stateNode,n)o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none";else{u=s.stateNode;var v=s.memoizedProps.style,m=v!=null&&v.hasOwnProperty("display")?v.display:null;u.style.display=m==null||typeof m=="boolean"?"":(""+m).trim()}}catch(E){G(s,s.return,E)}}}else if(e.tag===6){if(a===null){s=e;try{s.stateNode.nodeValue=n?"":s.memoizedProps}catch(E){G(s,s.return,E)}}}else if(e.tag===18){if(a===null){s=e;try{var y=s.stateNode;n?Jp(y,!0):Jp(s.stateNode,!1)}catch(E){G(s,s.return,E)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;a===e&&(a=null),e=e.return}a===e&&(a=null),e.sibling.return=e.return,e=e.sibling}l&4&&(l=t.updateQueue,l!==null&&(a=l.retryQueue,a!==null&&(l.retryQueue=null,po(t,a))));break;case 19:Ut(e,t),Dt(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,po(t,l)));break;case 30:break;case 21:break;default:Ut(e,t),Dt(t)}}function Dt(t){var e=t.flags;if(e&2){try{for(var a,l=t.return;l!==null;){if(Ph(l)){a=l;break}l=l.return}if(a==null)throw Error(w(160));switch(a.tag){case 27:var n=a.stateNode,i=Zc(t);Wo(t,i,n);break;case 5:var o=a.stateNode;a.flags&32&&(jl(o,""),a.flags&=-33);var u=Zc(t);Wo(t,u,o);break;case 3:case 4:var s=a.stateNode.containerInfo,p=Zc(t);Ds(t,p,s);break;default:throw Error(w(161))}}catch(g){G(t,t.return,g)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function u0(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;u0(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function Be(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)e0(t,e.alternate,e),e=e.sibling}function Ga(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:Ma(4,e,e.return),Ga(e);break;case 1:Ae(e,e.return);var a=e.stateNode;typeof a.componentWillUnmount=="function"&&Fh(e,e.return,a),Ga(e);break;case 27:Vn(e.stateNode);case 26:case 5:Ae(e,e.return),Ga(e);break;case 22:e.memoizedState===null&&Ga(e);break;case 30:Ga(e);break;default:Ga(e)}t=t.sibling}}function He(t,e,a){for(a=a&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var l=e.alternate,n=t,i=e,o=i.flags;switch(i.tag){case 0:case 11:case 15:He(n,i,a),fi(4,i);break;case 1:if(He(n,i,a),l=i,n=l.stateNode,typeof n.componentDidMount=="function")try{n.componentDidMount()}catch(p){G(l,l.return,p)}if(l=i,n=l.updateQueue,n!==null){var u=l.stateNode;try{var s=n.shared.hiddenCallbacks;if(s!==null)for(n.shared.hiddenCallbacks=null,n=0;n<s.length;n++)nh(s[n],u)}catch(p){G(l,l.return,p)}}a&&o&64&&Wh(i),Hn(i,i.return);break;case 27:t0(i);case 26:case 5:He(n,i,a),a&&l===null&&o&4&&Ih(i),Hn(i,i.return);break;case 12:He(n,i,a);break;case 31:He(n,i,a),a&&o&4&&n0(n,i);break;case 13:He(n,i,a),a&&o&4&&i0(n,i);break;case 22:i.memoizedState===null&&He(n,i,a),Hn(i,i.return);break;case 30:break;default:He(n,i,a)}e=e.sibling}}function Ur(t,e){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&si(a))}function Dr(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&si(t))}function de(t,e,a,l){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)c0(t,e,a,l),e=e.sibling}function c0(t,e,a,l){var n=e.flags;switch(e.tag){case 0:case 11:case 15:de(t,e,a,l),n&2048&&fi(9,e);break;case 1:de(t,e,a,l);break;case 3:de(t,e,a,l),n&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&si(t)));break;case 12:if(n&2048){de(t,e,a,l),t=e.stateNode;try{var i=e.memoizedProps,o=i.id,u=i.onPostCommit;typeof u=="function"&&u(o,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(s){G(e,e.return,s)}}else de(t,e,a,l);break;case 31:de(t,e,a,l);break;case 13:de(t,e,a,l);break;case 23:break;case 22:i=e.stateNode,o=e.alternate,e.memoizedState!==null?i._visibility&2?de(t,e,a,l):qn(t,e):i._visibility&2?de(t,e,a,l):(i._visibility|=2,vl(t,e,a,l,(e.subtreeFlags&10256)!==0||!1)),n&2048&&Ur(o,e);break;case 24:de(t,e,a,l),n&2048&&Dr(e.alternate,e);break;default:de(t,e,a,l)}}function vl(t,e,a,l,n){for(n=n&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var i=t,o=e,u=a,s=l,p=o.flags;switch(o.tag){case 0:case 11:case 15:vl(i,o,u,s,n),fi(8,o);break;case 23:break;case 22:var g=o.stateNode;o.memoizedState!==null?g._visibility&2?vl(i,o,u,s,n):qn(i,o):(g._visibility|=2,vl(i,o,u,s,n)),n&&p&2048&&Ur(o.alternate,o);break;case 24:vl(i,o,u,s,n),n&&p&2048&&Dr(o.alternate,o);break;default:vl(i,o,u,s,n)}e=e.sibling}}function qn(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var a=t,l=e,n=l.flags;switch(l.tag){case 22:qn(a,l),n&2048&&Ur(l.alternate,l);break;case 24:qn(a,l),n&2048&&Dr(l.alternate,l);break;default:qn(a,l)}e=e.sibling}}var Nn=8192;function yl(t,e,a){if(t.subtreeFlags&Nn)for(t=t.child;t!==null;)s0(t,e,a),t=t.sibling}function s0(t,e,a){switch(t.tag){case 26:yl(t,e,a),t.flags&Nn&&t.memoizedState!==null&&Bb(a,pe,t.memoizedState,t.memoizedProps);break;case 5:yl(t,e,a);break;case 3:case 4:var l=pe;pe=nu(t.stateNode.containerInfo),yl(t,e,a),pe=l;break;case 22:t.memoizedState===null&&(l=t.alternate,l!==null&&l.memoizedState!==null?(l=Nn,Nn=16777216,yl(t,e,a),Nn=l):yl(t,e,a));break;default:yl(t,e,a)}}function r0(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function xn(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var a=0;a<e.length;a++){var l=e[a];ht=l,d0(l,t)}r0(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)f0(t),t=t.sibling}function f0(t){switch(t.tag){case 0:case 11:case 15:xn(t),t.flags&2048&&Ma(9,t,t.return);break;case 3:xn(t);break;case 12:xn(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,No(t)):xn(t);break;default:xn(t)}}function No(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var a=0;a<e.length;a++){var l=e[a];ht=l,d0(l,t)}r0(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:Ma(8,e,e.return),No(e);break;case 22:a=e.stateNode,a._visibility&2&&(a._visibility&=-3,No(e));break;default:No(e)}t=t.sibling}}function d0(t,e){for(;ht!==null;){var a=ht;switch(a.tag){case 0:case 11:case 15:Ma(8,a,e);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var l=a.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:si(a.memoizedState.cache)}if(l=a.child,l!==null)l.return=a,ht=l;else t:for(a=t;ht!==null;){l=ht;var n=l.sibling,i=l.return;if(a0(l),l===a){ht=null;break t}if(n!==null){n.return=i,ht=n;break t}ht=i}}}var tb={getCacheForType:function(t){var e=xt(rt),a=e.data.get(t);return a===void 0&&(a=t(),e.data.set(t,a)),a},cacheSignal:function(){return xt(rt).controller.signal}},eb=typeof WeakMap=="function"?WeakMap:Map,Y=0,k=null,U=null,L=0,V=0,Gt=null,pa=!1,tn=!1,Lr=!1,Fe=0,lt=0,za=0,Ka=0,Br=0,kt=0,Xl=0,Yn=null,Bt=null,Ls=!1,Su=0,p0=0,Fo=1/0,Io=null,Sa=null,dt=0,wa=null,kl=null,ke=0,Bs=0,Hs=null,m0=null,jn=0,qs=null;function Wt(){return(Y&2)!==0&&L!==0?L&-L:z.T!==null?qr():Em()}function h0(){if(kt===0)if((L&536870912)===0||B){var t=ao;ao<<=1,(ao&3932160)===0&&(ao=262144),kt=t}else kt=536870912;return t=It.current,t!==null&&(t.flags|=32),kt}function Ht(t,e,a){(t===k&&(V===2||V===9)||t.cancelPendingCommit!==null)&&(Zl(t,0),ma(t,L,kt,!1)),oi(t,a),((Y&2)===0||t!==k)&&(t===k&&((Y&2)===0&&(Ka|=a),lt===4&&ma(t,L,kt,!1)),ze(t))}function g0(t,e,a){if((Y&6)!==0)throw Error(w(327));var l=!a&&(e&127)===0&&(e&t.expiredLanes)===0||ii(t,e),n=l?nb(t,e):Jc(t,e,!0),i=l;do{if(n===0){tn&&!l&&ma(t,e,0,!1);break}else{if(a=t.current.alternate,i&&!ab(a)){n=Jc(t,e,!1),i=!1;continue}if(n===2){if(i=e,t.errorRecoveryDisabledLanes&i)var o=0;else o=t.pendingLanes&-536870913,o=o!==0?o:o&536870912?536870912:0;if(o!==0){e=o;t:{var u=t;n=Yn;var s=u.current.memoizedState.isDehydrated;if(s&&(Zl(u,o).flags|=256),o=Jc(u,o,!1),o!==2){if(Lr&&!s){u.errorRecoveryDisabledLanes|=i,Ka|=i,n=4;break t}i=Bt,Bt=n,i!==null&&(Bt===null?Bt=i:Bt.push.apply(Bt,i))}n=o}if(i=!1,n!==2)continue}}if(n===1){Zl(t,0),ma(t,e,0,!0);break}t:{switch(l=t,i=n,i){case 0:case 1:throw Error(w(345));case 4:if((e&4194048)!==e)break;case 6:ma(l,e,kt,!pa);break t;case 2:Bt=null;break;case 3:case 5:break;default:throw Error(w(329))}if((e&62914560)===e&&(n=Su+300-Zt(),10<n)){if(ma(l,e,kt,!pa),su(l,0,!0)!==0)break t;ke=e,l.timeoutHandle=L0(Up.bind(null,l,a,Bt,Io,Ls,e,kt,Ka,Xl,pa,i,"Throttled",-0,0),n);break t}Up(l,a,Bt,Io,Ls,e,kt,Ka,Xl,pa,i,null,-0,0)}}break}while(!0);ze(t)}function Up(t,e,a,l,n,i,o,u,s,p,g,v,m,y){if(t.timeoutHandle=-1,v=e.subtreeFlags,v&8192||(v&16785408)===16785408){v={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ve},s0(e,i,v);var E=(i&62914560)===i?Su-Zt():(i&4194048)===i?p0-Zt():0;if(E=Hb(v,E),E!==null){ke=i,t.cancelPendingCommit=E(Lp.bind(null,t,e,i,a,l,n,o,u,s,g,v,null,m,y)),ma(t,i,o,!p);return}}Lp(t,e,i,a,l,n,o,u,s)}function ab(t){for(var e=t;;){var a=e.tag;if((a===0||a===11||a===15)&&e.flags&16384&&(a=e.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var l=0;l<a.length;l++){var n=a[l],i=n.getSnapshot;n=n.value;try{if(!Ft(i(),n))return!1}catch{return!1}}if(a=e.child,e.subtreeFlags&16384&&a!==null)a.return=e,e=a;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function ma(t,e,a,l){e&=~Br,e&=~Ka,t.suspendedLanes|=e,t.pingedLanes&=~e,l&&(t.warmLanes|=e),l=t.expirationTimes;for(var n=e;0<n;){var i=31-Jt(n),o=1<<i;l[i]=-1,n&=~o}a!==0&&Sm(t,a,e)}function wu(){return(Y&6)===0?(di(0,!1),!1):!0}function Hr(){if(U!==null){if(V===0)var t=U.return;else t=U,Ge=nl=null,Er(t),Ll=null,Jn=0,t=U;for(;t!==null;)Jh(t.alternate,t),t=t.return;U=null}}function Zl(t,e){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,Sb(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),ke=0,Hr(),k=t,U=a=Qe(t.current,null),L=e,V=0,Gt=null,pa=!1,tn=ii(t,e),Lr=!1,Xl=kt=Br=Ka=za=lt=0,Bt=Yn=null,Ls=!1,(e&8)!==0&&(e|=e&32);var l=t.entangledLanes;if(l!==0)for(t=t.entanglements,l&=e;0<l;){var n=31-Jt(l),i=1<<n;e|=t[n],l&=~i}return Fe=e,pu(),a}function y0(t,e){O=null,z.H=Fn,e===Pl||e===hu?(e=dp(),V=3):e===gr?(e=dp(),V=4):V=e===$r?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,Gt=e,U===null&&(lt=1,Ko(t,ue(e,t.current)))}function v0(){var t=It.current;return t===null?!0:(L&4194048)===L?se===null:(L&62914560)===L||(L&536870912)!==0?t===se:!1}function b0(){var t=z.H;return z.H=Fn,t===null?Fn:t}function S0(){var t=z.A;return z.A=tb,t}function Po(){lt=4,pa||(L&4194048)!==L&&It.current!==null||(tn=!0),(za&134217727)===0&&(Ka&134217727)===0||k===null||ma(k,L,kt,!1)}function Jc(t,e,a){var l=Y;Y|=2;var n=b0(),i=S0();(k!==t||L!==e)&&(Io=null,Zl(t,e)),e=!1;var o=lt;t:do try{if(V!==0&&U!==null){var u=U,s=Gt;switch(V){case 8:Hr(),o=6;break t;case 3:case 2:case 9:case 6:It.current===null&&(e=!0);var p=V;if(V=0,Gt=null,Ol(t,u,s,p),a&&tn){o=0;break t}break;default:p=V,V=0,Gt=null,Ol(t,u,s,p)}}lb(),o=lt;break}catch(g){y0(t,g)}while(!0);return e&&t.shellSuspendCounter++,Ge=nl=null,Y=l,z.H=n,z.A=i,U===null&&(k=null,L=0,pu()),o}function lb(){for(;U!==null;)w0(U)}function nb(t,e){var a=Y;Y|=2;var l=b0(),n=S0();k!==t||L!==e?(Io=null,Fo=Zt()+500,Zl(t,e)):tn=ii(t,e);t:do try{if(V!==0&&U!==null){e=U;var i=Gt;e:switch(V){case 1:V=0,Gt=null,Ol(t,e,i,1);break;case 2:case 9:if(fp(i)){V=0,Gt=null,Dp(e);break}e=function(){V!==2&&V!==9||k!==t||(V=7),ze(t)},i.then(e,e);break t;case 3:V=7;break t;case 4:V=5;break t;case 7:fp(i)?(V=0,Gt=null,Dp(e)):(V=0,Gt=null,Ol(t,e,i,7));break;case 5:var o=null;switch(U.tag){case 26:o=U.memoizedState;case 5:case 27:var u=U;if(o?j0(o):u.stateNode.complete){V=0,Gt=null;var s=u.sibling;if(s!==null)U=s;else{var p=u.return;p!==null?(U=p,xu(p)):U=null}break e}}V=0,Gt=null,Ol(t,e,i,5);break;case 6:V=0,Gt=null,Ol(t,e,i,6);break;case 8:Hr(),lt=6;break t;default:throw Error(w(462))}}ib();break}catch(g){y0(t,g)}while(!0);return Ge=nl=null,z.H=l,z.A=n,Y=a,U!==null?0:(k=null,L=0,pu(),lt)}function ib(){for(;U!==null&&!zv();)w0(U)}function w0(t){var e=Kh(t.alternate,t,Fe);t.memoizedProps=t.pendingProps,e===null?xu(t):U=e}function Dp(t){var e=t,a=e.alternate;switch(e.tag){case 15:case 0:e=zp(a,e,e.pendingProps,e.type,void 0,L);break;case 11:e=zp(a,e,e.pendingProps,e.type.render,e.ref,L);break;case 5:Er(e);default:Jh(a,e),e=U=Jm(e,Fe),e=Kh(a,e,Fe)}t.memoizedProps=t.pendingProps,e===null?xu(t):U=e}function Ol(t,e,a,l){Ge=nl=null,Er(e),Ll=null,Jn=0;var n=e.return;try{if(Z1(t,n,e,a,L)){lt=1,Ko(t,ue(a,t.current)),U=null;return}}catch(i){if(n!==null)throw U=n,i;lt=1,Ko(t,ue(a,t.current)),U=null;return}e.flags&32768?(B||l===1?t=!0:tn||(L&536870912)!==0?t=!1:(pa=t=!0,(l===2||l===9||l===3||l===6)&&(l=It.current,l!==null&&l.tag===13&&(l.flags|=16384))),x0(e,t)):xu(e)}function xu(t){var e=t;do{if((e.flags&32768)!==0){x0(e,pa);return}t=e.return;var a=W1(e.alternate,e,Fe);if(a!==null){U=a;return}if(e=e.sibling,e!==null){U=e;return}U=e=t}while(e!==null);lt===0&&(lt=5)}function x0(t,e){do{var a=F1(t.alternate,t);if(a!==null){a.flags&=32767,U=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!e&&(t=t.sibling,t!==null)){U=t;return}U=t=a}while(t!==null);lt=6,U=null}function Lp(t,e,a,l,n,i,o,u,s){t.cancelPendingCommit=null;do Eu();while(dt!==0);if((Y&6)!==0)throw Error(w(327));if(e!==null){if(e===t.current)throw Error(w(177));if(i=e.lanes|e.childLanes,i|=sr,Hv(t,a,i,o,u,s),t===k&&(U=k=null,L=0),kl=e,wa=t,ke=a,Bs=i,Hs=n,m0=l,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,sb(Bo,function(){return M0(),null})):(t.callbackNode=null,t.callbackPriority=0),l=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||l){l=z.T,z.T=null,n=j.p,j.p=2,o=Y,Y|=4;try{I1(t,e,a)}finally{Y=o,j.p=n,z.T=l}}dt=1,E0(),T0(),A0()}}function E0(){if(dt===1){dt=0;var t=wa,e=kl,a=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||a){a=z.T,z.T=null;var l=j.p;j.p=2;var n=Y;Y|=4;try{o0(e,t);var i=Gs,o=jm(t.containerInfo),u=i.focusedElem,s=i.selectionRange;if(o!==u&&u&&u.ownerDocument&&Ym(u.ownerDocument.documentElement,u)){if(s!==null&&cr(u)){var p=s.start,g=s.end;if(g===void 0&&(g=p),"selectionStart"in u)u.selectionStart=p,u.selectionEnd=Math.min(g,u.value.length);else{var v=u.ownerDocument||document,m=v&&v.defaultView||window;if(m.getSelection){var y=m.getSelection(),E=u.textContent.length,_=Math.min(s.start,E),C=s.end===void 0?_:Math.min(s.end,E);!y.extend&&_>C&&(o=C,C=_,_=o);var f=np(u,_),r=np(u,C);if(f&&r&&(y.rangeCount!==1||y.anchorNode!==f.node||y.anchorOffset!==f.offset||y.focusNode!==r.node||y.focusOffset!==r.offset)){var h=v.createRange();h.setStart(f.node,f.offset),y.removeAllRanges(),_>C?(y.addRange(h),y.extend(r.node,r.offset)):(h.setEnd(r.node,r.offset),y.addRange(h))}}}}for(v=[],y=u;y=y.parentNode;)y.nodeType===1&&v.push({element:y,left:y.scrollLeft,top:y.scrollTop});for(typeof u.focus=="function"&&u.focus(),u=0;u<v.length;u++){var b=v[u];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}uu=!!Vs,Gs=Vs=null}finally{Y=n,j.p=l,z.T=a}}t.current=e,dt=2}}function T0(){if(dt===2){dt=0;var t=wa,e=kl,a=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||a){a=z.T,z.T=null;var l=j.p;j.p=2;var n=Y;Y|=4;try{e0(t,e.alternate,e)}finally{Y=n,j.p=l,z.T=a}}dt=3}}function A0(){if(dt===4||dt===3){dt=0,Nv();var t=wa,e=kl,a=ke,l=m0;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?dt=5:(dt=0,kl=wa=null,_0(t,t.pendingLanes));var n=t.pendingLanes;if(n===0&&(Sa=null),er(a),e=e.stateNode,Kt&&typeof Kt.onCommitFiberRoot=="function")try{Kt.onCommitFiberRoot(ni,e,void 0,(e.current.flags&128)===128)}catch{}if(l!==null){e=z.T,n=j.p,j.p=2,z.T=null;try{for(var i=t.onRecoverableError,o=0;o<l.length;o++){var u=l[o];i(u.value,{componentStack:u.stack})}}finally{z.T=e,j.p=n}}(ke&3)!==0&&Eu(),ze(t),n=t.pendingLanes,(a&261930)!==0&&(n&42)!==0?t===qs?jn++:(jn=0,qs=t):jn=0,di(0,!1)}}function _0(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,si(e)))}function Eu(){return E0(),T0(),A0(),M0()}function M0(){if(dt!==5)return!1;var t=wa,e=Bs;Bs=0;var a=er(ke),l=z.T,n=j.p;try{j.p=32>a?32:a,z.T=null,a=Hs,Hs=null;var i=wa,o=ke;if(dt=0,kl=wa=null,ke=0,(Y&6)!==0)throw Error(w(331));var u=Y;if(Y|=4,f0(i.current),c0(i,i.current,o,a),Y=u,di(0,!1),Kt&&typeof Kt.onPostCommitFiberRoot=="function")try{Kt.onPostCommitFiberRoot(ni,i)}catch{}return!0}finally{j.p=n,z.T=l,_0(t,e)}}function Bp(t,e,a){e=ue(a,e),e=$s(t.stateNode,e,2),t=ba(t,e,2),t!==null&&(oi(t,2),ze(t))}function G(t,e,a){if(t.tag===3)Bp(t,t,a);else for(;e!==null;){if(e.tag===3){Bp(e,t,a);break}else if(e.tag===1){var l=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(Sa===null||!Sa.has(l))){t=ue(a,t),a=Vh(2),l=ba(e,a,2),l!==null&&(Gh(a,l,e,t),oi(l,2),ze(l));break}}e=e.return}}function Wc(t,e,a){var l=t.pingCache;if(l===null){l=t.pingCache=new eb;var n=new Set;l.set(e,n)}else n=l.get(e),n===void 0&&(n=new Set,l.set(e,n));n.has(a)||(Lr=!0,n.add(a),t=ob.bind(null,t,e,a),e.then(t,t))}function ob(t,e,a){var l=t.pingCache;l!==null&&l.delete(e),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,k===t&&(L&a)===a&&(lt===4||lt===3&&(L&62914560)===L&&300>Zt()-Su?(Y&2)===0&&Zl(t,0):Br|=a,Xl===L&&(Xl=0)),ze(t)}function z0(t,e){e===0&&(e=bm()),t=ll(t,e),t!==null&&(oi(t,e),ze(t))}function ub(t){var e=t.memoizedState,a=0;e!==null&&(a=e.retryLane),z0(t,a)}function cb(t,e){var a=0;switch(t.tag){case 31:case 13:var l=t.stateNode,n=t.memoizedState;n!==null&&(a=n.retryLane);break;case 19:l=t.stateNode;break;case 22:l=t.stateNode._retryCache;break;default:throw Error(w(314))}l!==null&&l.delete(e),z0(t,a)}function sb(t,e){return Ps(t,e)}var tu=null,bl=null,Ys=!1,eu=!1,Fc=!1,ha=0;function ze(t){t!==bl&&t.next===null&&(bl===null?tu=bl=t:bl=bl.next=t),eu=!0,Ys||(Ys=!0,fb())}function di(t,e){if(!Fc&&eu){Fc=!0;do for(var a=!1,l=tu;l!==null;){if(!e)if(t!==0){var n=l.pendingLanes;if(n===0)var i=0;else{var o=l.suspendedLanes,u=l.pingedLanes;i=(1<<31-Jt(42|t)+1)-1,i&=n&~(o&~u),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(a=!0,Hp(l,i))}else i=L,i=su(l,l===k?i:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(i&3)===0||ii(l,i)||(a=!0,Hp(l,i));l=l.next}while(a);Fc=!1}}function rb(){N0()}function N0(){eu=Ys=!1;var t=0;ha!==0&&bb()&&(t=ha);for(var e=Zt(),a=null,l=tu;l!==null;){var n=l.next,i=C0(l,e);i===0?(l.next=null,a===null?tu=n:a.next=n,n===null&&(bl=a)):(a=l,(t!==0||(i&3)!==0)&&(eu=!0)),l=n}dt!==0&&dt!==5||di(t,!1),ha!==0&&(ha=0)}function C0(t,e){for(var a=t.suspendedLanes,l=t.pingedLanes,n=t.expirationTimes,i=t.pendingLanes&-62914561;0<i;){var o=31-Jt(i),u=1<<o,s=n[o];s===-1?((u&a)===0||(u&l)!==0)&&(n[o]=Bv(u,e)):s<=e&&(t.expiredLanes|=u),i&=~u}if(e=k,a=L,a=su(t,t===e?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l=t.callbackNode,a===0||t===e&&(V===2||V===9)||t.cancelPendingCommit!==null)return l!==null&&l!==null&&_c(l),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||ii(t,a)){if(e=a&-a,e===t.callbackPriority)return e;switch(l!==null&&_c(l),er(a)){case 2:case 8:a=ym;break;case 32:a=Bo;break;case 268435456:a=vm;break;default:a=Bo}return l=O0.bind(null,t),a=Ps(a,l),t.callbackPriority=e,t.callbackNode=a,e}return l!==null&&l!==null&&_c(l),t.callbackPriority=2,t.callbackNode=null,2}function O0(t,e){if(dt!==0&&dt!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(Eu()&&t.callbackNode!==a)return null;var l=L;return l=su(t,t===k?l:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l===0?null:(g0(t,l,e),C0(t,Zt()),t.callbackNode!=null&&t.callbackNode===a?O0.bind(null,t):null)}function Hp(t,e){if(Eu())return null;g0(t,e,!0)}function fb(){wb(function(){(Y&6)!==0?Ps(gm,rb):N0()})}function qr(){if(ha===0){var t=Vl;t===0&&(t=eo,eo<<=1,(eo&261888)===0&&(eo=256)),ha=t}return ha}function qp(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:So(""+t)}function Yp(t,e){var a=e.ownerDocument.createElement("input");return a.name=e.name,a.value=e.value,t.id&&a.setAttribute("form",t.id),e.parentNode.insertBefore(a,e),t=new FormData(t),a.parentNode.removeChild(a),t}function db(t,e,a,l,n){if(e==="submit"&&a&&a.stateNode===n){var i=qp((n[qt]||null).action),o=l.submitter;o&&(e=(e=o[qt]||null)?qp(e.formAction):o.getAttribute("formAction"),e!==null&&(i=e,o=null));var u=new ru("action","action",null,l,n);t.push({event:u,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(ha!==0){var s=o?Yp(n,o):new FormData(n);Cs(a,{pending:!0,data:s,method:n.method,action:i},null,s)}}else typeof i=="function"&&(u.preventDefault(),s=o?Yp(n,o):new FormData(n),Cs(a,{pending:!0,data:s,method:n.method,action:i},i,s))},currentTarget:n}]})}}for(mo=0;mo<vs.length;mo++)ho=vs[mo],jp=ho.toLowerCase(),Vp=ho[0].toUpperCase()+ho.slice(1),me(jp,"on"+Vp);var ho,jp,Vp,mo;me(Gm,"onAnimationEnd");me(Qm,"onAnimationIteration");me(Xm,"onAnimationStart");me("dblclick","onDoubleClick");me("focusin","onFocus");me("focusout","onBlur");me(C1,"onTransitionRun");me(O1,"onTransitionStart");me($1,"onTransitionCancel");me(km,"onTransitionEnd");Yl("onMouseEnter",["mouseout","mouseover"]);Yl("onMouseLeave",["mouseout","mouseover"]);Yl("onPointerEnter",["pointerout","pointerover"]);Yl("onPointerLeave",["pointerout","pointerover"]);tl("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));tl("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));tl("onBeforeInput",["compositionend","keypress","textInput","paste"]);tl("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));tl("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));tl("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var In="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),pb=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(In));function $0(t,e){e=(e&4)!==0;for(var a=0;a<t.length;a++){var l=t[a],n=l.event;l=l.listeners;t:{var i=void 0;if(e)for(var o=l.length-1;0<=o;o--){var u=l[o],s=u.instance,p=u.currentTarget;if(u=u.listener,s!==i&&n.isPropagationStopped())break t;i=u,n.currentTarget=p;try{i(n)}catch(g){qo(g)}n.currentTarget=null,i=s}else for(o=0;o<l.length;o++){if(u=l[o],s=u.instance,p=u.currentTarget,u=u.listener,s!==i&&n.isPropagationStopped())break t;i=u,n.currentTarget=p;try{i(n)}catch(g){qo(g)}n.currentTarget=null,i=s}}}}function R(t,e){var a=e[rs];a===void 0&&(a=e[rs]=new Set);var l=t+"__bubble";a.has(l)||(R0(e,t,2,!1),a.add(l))}function Ic(t,e,a){var l=0;e&&(l|=4),R0(a,t,l,e)}var go="_reactListening"+Math.random().toString(36).slice(2);function Yr(t){if(!t[go]){t[go]=!0,Tm.forEach(function(a){a!=="selectionchange"&&(pb.has(a)||Ic(a,!1,t),Ic(a,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[go]||(e[go]=!0,Ic("selectionchange",!1,e))}}function R0(t,e,a,l){switch(k0(e)){case 2:var n=jb;break;case 8:n=Vb;break;default:n=Qr}a=n.bind(null,e,a,t),n=void 0,!hs||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(n=!0),l?n!==void 0?t.addEventListener(e,a,{capture:!0,passive:n}):t.addEventListener(e,a,!0):n!==void 0?t.addEventListener(e,a,{passive:n}):t.addEventListener(e,a,!1)}function Pc(t,e,a,l,n){var i=l;if((e&1)===0&&(e&2)===0&&l!==null)t:for(;;){if(l===null)return;var o=l.tag;if(o===3||o===4){var u=l.stateNode.containerInfo;if(u===n)break;if(o===4)for(o=l.return;o!==null;){var s=o.tag;if((s===3||s===4)&&o.stateNode.containerInfo===n)return;o=o.return}for(;u!==null;){if(o=xl(u),o===null)return;if(s=o.tag,s===5||s===6||s===26||s===27){l=i=o;continue t}u=u.parentNode}}l=l.return}$m(function(){var p=i,g=nr(a),v=[];t:{var m=Zm.get(t);if(m!==void 0){var y=ru,E=t;switch(t){case"keypress":if(xo(a)===0)break t;case"keydown":case"keyup":y=c1;break;case"focusin":E="focus",y=Oc;break;case"focusout":E="blur",y=Oc;break;case"beforeblur":case"afterblur":y=Oc;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=Jd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=Wv;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=f1;break;case Gm:case Qm:case Xm:y=Pv;break;case km:y=p1;break;case"scroll":case"scrollend":y=Kv;break;case"wheel":y=h1;break;case"copy":case"cut":case"paste":y=e1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=Fd;break;case"toggle":case"beforetoggle":y=y1}var _=(e&4)!==0,C=!_&&(t==="scroll"||t==="scrollend"),f=_?m!==null?m+"Capture":null:m;_=[];for(var r=p,h;r!==null;){var b=r;if(h=b.stateNode,b=b.tag,b!==5&&b!==26&&b!==27||h===null||f===null||(b=Qn(r,f),b!=null&&_.push(Pn(r,b,h))),C)break;r=r.return}0<_.length&&(m=new y(m,E,null,a,g),v.push({event:m,listeners:_}))}}if((e&7)===0){t:{if(m=t==="mouseover"||t==="pointerover",y=t==="mouseout"||t==="pointerout",m&&a!==ms&&(E=a.relatedTarget||a.fromElement)&&(xl(E)||E[Wl]))break t;if((y||m)&&(m=g.window===g?g:(m=g.ownerDocument)?m.defaultView||m.parentWindow:window,y?(E=a.relatedTarget||a.toElement,y=p,E=E?xl(E):null,E!==null&&(C=li(E),_=E.tag,E!==C||_!==5&&_!==27&&_!==6)&&(E=null)):(y=null,E=p),y!==E)){if(_=Jd,b="onMouseLeave",f="onMouseEnter",r="mouse",(t==="pointerout"||t==="pointerover")&&(_=Fd,b="onPointerLeave",f="onPointerEnter",r="pointer"),C=y==null?m:Mn(y),h=E==null?m:Mn(E),m=new _(b,r+"leave",y,a,g),m.target=C,m.relatedTarget=h,b=null,xl(g)===p&&(_=new _(f,r+"enter",E,a,g),_.target=h,_.relatedTarget=C,b=_),C=b,y&&E)e:{for(_=mb,f=y,r=E,h=0,b=f;b;b=_(b))h++;b=0;for(var A=r;A;A=_(A))b++;for(;0<h-b;)f=_(f),h--;for(;0<b-h;)r=_(r),b--;for(;h--;){if(f===r||r!==null&&f===r.alternate){_=f;break e}f=_(f),r=_(r)}_=null}else _=null;y!==null&&Gp(v,m,y,_,!1),E!==null&&C!==null&&Gp(v,C,E,_,!0)}}t:{if(m=p?Mn(p):window,y=m.nodeName&&m.nodeName.toLowerCase(),y==="select"||y==="input"&&m.type==="file")var H=ep;else if(tp(m))if(Hm)H=M1;else{H=A1;var T=T1}else y=m.nodeName,!y||y.toLowerCase()!=="input"||m.type!=="checkbox"&&m.type!=="radio"?p&&lr(p.elementType)&&(H=ep):H=_1;if(H&&(H=H(t,p))){Bm(v,H,a,g);break t}T&&T(t,m,p),t==="focusout"&&p&&m.type==="number"&&p.memoizedProps.value!=null&&ps(m,"number",m.value)}switch(T=p?Mn(p):window,t){case"focusin":(tp(T)||T.contentEditable==="true")&&(Al=T,gs=p,$n=null);break;case"focusout":$n=gs=Al=null;break;case"mousedown":ys=!0;break;case"contextmenu":case"mouseup":case"dragend":ys=!1,ip(v,a,g);break;case"selectionchange":if(N1)break;case"keydown":case"keyup":ip(v,a,g)}var $;if(ur)t:{switch(t){case"compositionstart":var D="onCompositionStart";break t;case"compositionend":D="onCompositionEnd";break t;case"compositionupdate":D="onCompositionUpdate";break t}D=void 0}else Tl?Dm(t,a)&&(D="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(D="onCompositionStart");D&&(Um&&a.locale!=="ko"&&(Tl||D!=="onCompositionStart"?D==="onCompositionEnd"&&Tl&&($=Rm()):(da=g,ir="value"in da?da.value:da.textContent,Tl=!0)),T=au(p,D),0<T.length&&(D=new Wd(D,t,null,a,g),v.push({event:D,listeners:T}),$?D.data=$:($=Lm(a),$!==null&&(D.data=$)))),($=b1?S1(t,a):w1(t,a))&&(D=au(p,"onBeforeInput"),0<D.length&&(T=new Wd("onBeforeInput","beforeinput",null,a,g),v.push({event:T,listeners:D}),T.data=$)),db(v,t,p,a,g)}$0(v,e)})}function Pn(t,e,a){return{instance:t,listener:e,currentTarget:a}}function au(t,e){for(var a=e+"Capture",l=[];t!==null;){var n=t,i=n.stateNode;if(n=n.tag,n!==5&&n!==26&&n!==27||i===null||(n=Qn(t,a),n!=null&&l.unshift(Pn(t,n,i)),n=Qn(t,e),n!=null&&l.push(Pn(t,n,i))),t.tag===3)return l;t=t.return}return[]}function mb(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Gp(t,e,a,l,n){for(var i=e._reactName,o=[];a!==null&&a!==l;){var u=a,s=u.alternate,p=u.stateNode;if(u=u.tag,s!==null&&s===l)break;u!==5&&u!==26&&u!==27||p===null||(s=p,n?(p=Qn(a,i),p!=null&&o.unshift(Pn(a,p,s))):n||(p=Qn(a,i),p!=null&&o.push(Pn(a,p,s)))),a=a.return}o.length!==0&&t.push({event:e,listeners:o})}var hb=/\r\n?/g,gb=/\u0000|\uFFFD/g;function Qp(t){return(typeof t=="string"?t:""+t).replace(hb,`
`).replace(gb,"")}function U0(t,e){return e=Qp(e),Qp(t)===e}function Q(t,e,a,l,n,i){switch(a){case"children":typeof l=="string"?e==="body"||e==="textarea"&&l===""||jl(t,l):(typeof l=="number"||typeof l=="bigint")&&e!=="body"&&jl(t,""+l);break;case"className":no(t,"class",l);break;case"tabIndex":no(t,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":no(t,a,l);break;case"style":Om(t,l,i);break;case"data":if(e!=="object"){no(t,"data",l);break}case"src":case"href":if(l===""&&(e!=="a"||a!=="href")){t.removeAttribute(a);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(a);break}l=So(""+l),t.setAttribute(a,l);break;case"action":case"formAction":if(typeof l=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(a==="formAction"?(e!=="input"&&Q(t,e,"name",n.name,n,null),Q(t,e,"formEncType",n.formEncType,n,null),Q(t,e,"formMethod",n.formMethod,n,null),Q(t,e,"formTarget",n.formTarget,n,null)):(Q(t,e,"encType",n.encType,n,null),Q(t,e,"method",n.method,n,null),Q(t,e,"target",n.target,n,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(a);break}l=So(""+l),t.setAttribute(a,l);break;case"onClick":l!=null&&(t.onclick=Ve);break;case"onScroll":l!=null&&R("scroll",t);break;case"onScrollEnd":l!=null&&R("scrollend",t);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(w(61));if(a=l.__html,a!=null){if(n.children!=null)throw Error(w(60));t.innerHTML=a}}break;case"multiple":t.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":t.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){t.removeAttribute("xlink:href");break}a=So(""+l),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(a,""+l):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":l===!0?t.setAttribute(a,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(a,l):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?t.setAttribute(a,l):t.removeAttribute(a);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?t.removeAttribute(a):t.setAttribute(a,l);break;case"popover":R("beforetoggle",t),R("toggle",t),bo(t,"popover",l);break;case"xlinkActuate":Ue(t,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":Ue(t,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":Ue(t,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":Ue(t,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":Ue(t,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":Ue(t,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":Ue(t,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":Ue(t,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":Ue(t,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":bo(t,"is",l);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=kv.get(a)||a,bo(t,a,l))}}function js(t,e,a,l,n,i){switch(a){case"style":Om(t,l,i);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(w(61));if(a=l.__html,a!=null){if(n.children!=null)throw Error(w(60));t.innerHTML=a}}break;case"children":typeof l=="string"?jl(t,l):(typeof l=="number"||typeof l=="bigint")&&jl(t,""+l);break;case"onScroll":l!=null&&R("scroll",t);break;case"onScrollEnd":l!=null&&R("scrollend",t);break;case"onClick":l!=null&&(t.onclick=Ve);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Am.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(n=a.endsWith("Capture"),e=a.slice(2,n?a.length-7:void 0),i=t[qt]||null,i=i!=null?i[a]:null,typeof i=="function"&&t.removeEventListener(e,i,n),typeof l=="function")){typeof i!="function"&&i!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(e,l,n);break t}a in t?t[a]=l:l===!0?t.setAttribute(a,""):bo(t,a,l)}}}function Et(t,e,a){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":R("error",t),R("load",t);var l=!1,n=!1,i;for(i in a)if(a.hasOwnProperty(i)){var o=a[i];if(o!=null)switch(i){case"src":l=!0;break;case"srcSet":n=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(w(137,e));default:Q(t,e,i,o,a,null)}}n&&Q(t,e,"srcSet",a.srcSet,a,null),l&&Q(t,e,"src",a.src,a,null);return;case"input":R("invalid",t);var u=i=o=n=null,s=null,p=null;for(l in a)if(a.hasOwnProperty(l)){var g=a[l];if(g!=null)switch(l){case"name":n=g;break;case"type":o=g;break;case"checked":s=g;break;case"defaultChecked":p=g;break;case"value":i=g;break;case"defaultValue":u=g;break;case"children":case"dangerouslySetInnerHTML":if(g!=null)throw Error(w(137,e));break;default:Q(t,e,l,g,a,null)}}zm(t,i,u,s,p,o,n,!1);return;case"select":R("invalid",t),l=o=i=null;for(n in a)if(a.hasOwnProperty(n)&&(u=a[n],u!=null))switch(n){case"value":i=u;break;case"defaultValue":o=u;break;case"multiple":l=u;default:Q(t,e,n,u,a,null)}e=i,a=o,t.multiple=!!l,e!=null?Rl(t,!!l,e,!1):a!=null&&Rl(t,!!l,a,!0);return;case"textarea":R("invalid",t),i=n=l=null;for(o in a)if(a.hasOwnProperty(o)&&(u=a[o],u!=null))switch(o){case"value":l=u;break;case"defaultValue":n=u;break;case"children":i=u;break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(w(91));break;default:Q(t,e,o,u,a,null)}Cm(t,l,n,i);return;case"option":for(s in a)if(a.hasOwnProperty(s)&&(l=a[s],l!=null))switch(s){case"selected":t.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:Q(t,e,s,l,a,null)}return;case"dialog":R("beforetoggle",t),R("toggle",t),R("cancel",t),R("close",t);break;case"iframe":case"object":R("load",t);break;case"video":case"audio":for(l=0;l<In.length;l++)R(In[l],t);break;case"image":R("error",t),R("load",t);break;case"details":R("toggle",t);break;case"embed":case"source":case"link":R("error",t),R("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(p in a)if(a.hasOwnProperty(p)&&(l=a[p],l!=null))switch(p){case"children":case"dangerouslySetInnerHTML":throw Error(w(137,e));default:Q(t,e,p,l,a,null)}return;default:if(lr(e)){for(g in a)a.hasOwnProperty(g)&&(l=a[g],l!==void 0&&js(t,e,g,l,a,void 0));return}}for(u in a)a.hasOwnProperty(u)&&(l=a[u],l!=null&&Q(t,e,u,l,a,null))}function yb(t,e,a,l){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var n=null,i=null,o=null,u=null,s=null,p=null,g=null;for(y in a){var v=a[y];if(a.hasOwnProperty(y)&&v!=null)switch(y){case"checked":break;case"value":break;case"defaultValue":s=v;default:l.hasOwnProperty(y)||Q(t,e,y,null,l,v)}}for(var m in l){var y=l[m];if(v=a[m],l.hasOwnProperty(m)&&(y!=null||v!=null))switch(m){case"type":i=y;break;case"name":n=y;break;case"checked":p=y;break;case"defaultChecked":g=y;break;case"value":o=y;break;case"defaultValue":u=y;break;case"children":case"dangerouslySetInnerHTML":if(y!=null)throw Error(w(137,e));break;default:y!==v&&Q(t,e,m,y,l,v)}}ds(t,o,u,s,p,g,i,n);return;case"select":y=o=u=m=null;for(i in a)if(s=a[i],a.hasOwnProperty(i)&&s!=null)switch(i){case"value":break;case"multiple":y=s;default:l.hasOwnProperty(i)||Q(t,e,i,null,l,s)}for(n in l)if(i=l[n],s=a[n],l.hasOwnProperty(n)&&(i!=null||s!=null))switch(n){case"value":m=i;break;case"defaultValue":u=i;break;case"multiple":o=i;default:i!==s&&Q(t,e,n,i,l,s)}e=u,a=o,l=y,m!=null?Rl(t,!!a,m,!1):!!l!=!!a&&(e!=null?Rl(t,!!a,e,!0):Rl(t,!!a,a?[]:"",!1));return;case"textarea":y=m=null;for(u in a)if(n=a[u],a.hasOwnProperty(u)&&n!=null&&!l.hasOwnProperty(u))switch(u){case"value":break;case"children":break;default:Q(t,e,u,null,l,n)}for(o in l)if(n=l[o],i=a[o],l.hasOwnProperty(o)&&(n!=null||i!=null))switch(o){case"value":m=n;break;case"defaultValue":y=n;break;case"children":break;case"dangerouslySetInnerHTML":if(n!=null)throw Error(w(91));break;default:n!==i&&Q(t,e,o,n,l,i)}Nm(t,m,y);return;case"option":for(var E in a)if(m=a[E],a.hasOwnProperty(E)&&m!=null&&!l.hasOwnProperty(E))switch(E){case"selected":t.selected=!1;break;default:Q(t,e,E,null,l,m)}for(s in l)if(m=l[s],y=a[s],l.hasOwnProperty(s)&&m!==y&&(m!=null||y!=null))switch(s){case"selected":t.selected=m&&typeof m!="function"&&typeof m!="symbol";break;default:Q(t,e,s,m,l,y)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var _ in a)m=a[_],a.hasOwnProperty(_)&&m!=null&&!l.hasOwnProperty(_)&&Q(t,e,_,null,l,m);for(p in l)if(m=l[p],y=a[p],l.hasOwnProperty(p)&&m!==y&&(m!=null||y!=null))switch(p){case"children":case"dangerouslySetInnerHTML":if(m!=null)throw Error(w(137,e));break;default:Q(t,e,p,m,l,y)}return;default:if(lr(e)){for(var C in a)m=a[C],a.hasOwnProperty(C)&&m!==void 0&&!l.hasOwnProperty(C)&&js(t,e,C,void 0,l,m);for(g in l)m=l[g],y=a[g],!l.hasOwnProperty(g)||m===y||m===void 0&&y===void 0||js(t,e,g,m,l,y);return}}for(var f in a)m=a[f],a.hasOwnProperty(f)&&m!=null&&!l.hasOwnProperty(f)&&Q(t,e,f,null,l,m);for(v in l)m=l[v],y=a[v],!l.hasOwnProperty(v)||m===y||m==null&&y==null||Q(t,e,v,m,l,y)}function Xp(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function vb(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,a=performance.getEntriesByType("resource"),l=0;l<a.length;l++){var n=a[l],i=n.transferSize,o=n.initiatorType,u=n.duration;if(i&&u&&Xp(o)){for(o=0,u=n.responseEnd,l+=1;l<a.length;l++){var s=a[l],p=s.startTime;if(p>u)break;var g=s.transferSize,v=s.initiatorType;g&&Xp(v)&&(s=s.responseEnd,o+=g*(s<u?1:(u-p)/(s-p)))}if(--l,e+=8*(i+o)/(n.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Vs=null,Gs=null;function lu(t){return t.nodeType===9?t:t.ownerDocument}function kp(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function D0(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function Qs(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var ts=null;function bb(){var t=window.event;return t&&t.type==="popstate"?t===ts?!1:(ts=t,!0):(ts=null,!1)}var L0=typeof setTimeout=="function"?setTimeout:void 0,Sb=typeof clearTimeout=="function"?clearTimeout:void 0,Zp=typeof Promise=="function"?Promise:void 0,wb=typeof queueMicrotask=="function"?queueMicrotask:typeof Zp<"u"?function(t){return Zp.resolve(null).then(t).catch(xb)}:L0;function xb(t){setTimeout(function(){throw t})}function Ca(t){return t==="head"}function Kp(t,e){var a=e,l=0;do{var n=a.nextSibling;if(t.removeChild(a),n&&n.nodeType===8)if(a=n.data,a==="/$"||a==="/&"){if(l===0){t.removeChild(n),Jl(e);return}l--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")l++;else if(a==="html")Vn(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,Vn(a);for(var i=a.firstChild;i;){var o=i.nextSibling,u=i.nodeName;i[ui]||u==="SCRIPT"||u==="STYLE"||u==="LINK"&&i.rel.toLowerCase()==="stylesheet"||a.removeChild(i),i=o}}else a==="body"&&Vn(t.ownerDocument.body);a=n}while(a);Jl(e)}function Jp(t,e){var a=t;t=0;do{var l=a.nextSibling;if(a.nodeType===1?e?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(e?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),l&&l.nodeType===8)if(a=l.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=l}while(a)}function Xs(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var a=e;switch(e=e.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Xs(a),ar(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function Eb(t,e,a,l){for(;t.nodeType===1;){var n=a;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!l&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(l){if(!t[ui])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(i=t.getAttribute("rel"),i==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(i!==n.rel||t.getAttribute("href")!==(n.href==null||n.href===""?null:n.href)||t.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin)||t.getAttribute("title")!==(n.title==null?null:n.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(i=t.getAttribute("src"),(i!==(n.src==null?null:n.src)||t.getAttribute("type")!==(n.type==null?null:n.type)||t.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin))&&i&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var i=n.name==null?null:""+n.name;if(n.type==="hidden"&&t.getAttribute("name")===i)return t}else return t;if(t=re(t.nextSibling),t===null)break}return null}function Tb(t,e,a){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=re(t.nextSibling),t===null))return null;return t}function B0(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=re(t.nextSibling),t===null))return null;return t}function ks(t){return t.data==="$?"||t.data==="$~"}function Zs(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function Ab(t,e){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||a.readyState!=="loading")e();else{var l=function(){e(),a.removeEventListener("DOMContentLoaded",l)};a.addEventListener("DOMContentLoaded",l),t._reactRetry=l}}function re(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var Ks=null;function Wp(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(e===0)return re(t.nextSibling);e--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||e++}t=t.nextSibling}return null}function Fp(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(e===0)return t;e--}else a!=="/$"&&a!=="/&"||e++}t=t.previousSibling}return null}function H0(t,e,a){switch(e=lu(a),t){case"html":if(t=e.documentElement,!t)throw Error(w(452));return t;case"head":if(t=e.head,!t)throw Error(w(453));return t;case"body":if(t=e.body,!t)throw Error(w(454));return t;default:throw Error(w(451))}}function Vn(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);ar(t)}var fe=new Map,Ip=new Set;function nu(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Ie=j.d;j.d={f:_b,r:Mb,D:zb,C:Nb,L:Cb,m:Ob,X:Rb,S:$b,M:Ub};function _b(){var t=Ie.f(),e=wu();return t||e}function Mb(t){var e=Fl(t);e!==null&&e.tag===5&&e.type==="form"?Oh(e):Ie.r(t)}var en=typeof document>"u"?null:document;function q0(t,e,a){var l=en;if(l&&typeof e=="string"&&e){var n=oe(e);n='link[rel="'+t+'"][href="'+n+'"]',typeof a=="string"&&(n+='[crossorigin="'+a+'"]'),Ip.has(n)||(Ip.add(n),t={rel:t,crossOrigin:a,href:e},l.querySelector(n)===null&&(e=l.createElement("link"),Et(e,"link",t),gt(e),l.head.appendChild(e)))}}function zb(t){Ie.D(t),q0("dns-prefetch",t,null)}function Nb(t,e){Ie.C(t,e),q0("preconnect",t,e)}function Cb(t,e,a){Ie.L(t,e,a);var l=en;if(l&&t&&e){var n='link[rel="preload"][as="'+oe(e)+'"]';e==="image"&&a&&a.imageSrcSet?(n+='[imagesrcset="'+oe(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(n+='[imagesizes="'+oe(a.imageSizes)+'"]')):n+='[href="'+oe(t)+'"]';var i=n;switch(e){case"style":i=Kl(t);break;case"script":i=an(t)}fe.has(i)||(t=I({rel:"preload",href:e==="image"&&a&&a.imageSrcSet?void 0:t,as:e},a),fe.set(i,t),l.querySelector(n)!==null||e==="style"&&l.querySelector(pi(i))||e==="script"&&l.querySelector(mi(i))||(e=l.createElement("link"),Et(e,"link",t),gt(e),l.head.appendChild(e)))}}function Ob(t,e){Ie.m(t,e);var a=en;if(a&&t){var l=e&&typeof e.as=="string"?e.as:"script",n='link[rel="modulepreload"][as="'+oe(l)+'"][href="'+oe(t)+'"]',i=n;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=an(t)}if(!fe.has(i)&&(t=I({rel:"modulepreload",href:t},e),fe.set(i,t),a.querySelector(n)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(mi(i)))return}l=a.createElement("link"),Et(l,"link",t),gt(l),a.head.appendChild(l)}}}function $b(t,e,a){Ie.S(t,e,a);var l=en;if(l&&t){var n=$l(l).hoistableStyles,i=Kl(t);e=e||"default";var o=n.get(i);if(!o){var u={loading:0,preload:null};if(o=l.querySelector(pi(i)))u.loading=5;else{t=I({rel:"stylesheet",href:t,"data-precedence":e},a),(a=fe.get(i))&&jr(t,a);var s=o=l.createElement("link");gt(s),Et(s,"link",t),s._p=new Promise(function(p,g){s.onload=p,s.onerror=g}),s.addEventListener("load",function(){u.loading|=1}),s.addEventListener("error",function(){u.loading|=2}),u.loading|=4,Co(o,e,l)}o={type:"stylesheet",instance:o,count:1,state:u},n.set(i,o)}}}function Rb(t,e){Ie.X(t,e);var a=en;if(a&&t){var l=$l(a).hoistableScripts,n=an(t),i=l.get(n);i||(i=a.querySelector(mi(n)),i||(t=I({src:t,async:!0},e),(e=fe.get(n))&&Vr(t,e),i=a.createElement("script"),gt(i),Et(i,"link",t),a.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(n,i))}}function Ub(t,e){Ie.M(t,e);var a=en;if(a&&t){var l=$l(a).hoistableScripts,n=an(t),i=l.get(n);i||(i=a.querySelector(mi(n)),i||(t=I({src:t,async:!0,type:"module"},e),(e=fe.get(n))&&Vr(t,e),i=a.createElement("script"),gt(i),Et(i,"link",t),a.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(n,i))}}function Pp(t,e,a,l){var n=(n=ga.current)?nu(n):null;if(!n)throw Error(w(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(e=Kl(a.href),a=$l(n).hoistableStyles,l=a.get(e),l||(l={type:"style",instance:null,count:0,state:null},a.set(e,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=Kl(a.href);var i=$l(n).hoistableStyles,o=i.get(t);if(o||(n=n.ownerDocument||n,o={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(t,o),(i=n.querySelector(pi(t)))&&!i._p&&(o.instance=i,o.state.loading=5),fe.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},fe.set(t,a),i||Db(n,t,a,o.state))),e&&l===null)throw Error(w(528,""));return o}if(e&&l!==null)throw Error(w(529,""));return null;case"script":return e=a.async,a=a.src,typeof a=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=an(a),a=$l(n).hoistableScripts,l=a.get(e),l||(l={type:"script",instance:null,count:0,state:null},a.set(e,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(w(444,t))}}function Kl(t){return'href="'+oe(t)+'"'}function pi(t){return'link[rel="stylesheet"]['+t+"]"}function Y0(t){return I({},t,{"data-precedence":t.precedence,precedence:null})}function Db(t,e,a,l){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?l.loading=1:(e=t.createElement("link"),l.preload=e,e.addEventListener("load",function(){return l.loading|=1}),e.addEventListener("error",function(){return l.loading|=2}),Et(e,"link",a),gt(e),t.head.appendChild(e))}function an(t){return'[src="'+oe(t)+'"]'}function mi(t){return"script[async]"+t}function tm(t,e,a){if(e.count++,e.instance===null)switch(e.type){case"style":var l=t.querySelector('style[data-href~="'+oe(a.href)+'"]');if(l)return e.instance=l,gt(l),l;var n=I({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return l=(t.ownerDocument||t).createElement("style"),gt(l),Et(l,"style",n),Co(l,a.precedence,t),e.instance=l;case"stylesheet":n=Kl(a.href);var i=t.querySelector(pi(n));if(i)return e.state.loading|=4,e.instance=i,gt(i),i;l=Y0(a),(n=fe.get(n))&&jr(l,n),i=(t.ownerDocument||t).createElement("link"),gt(i);var o=i;return o._p=new Promise(function(u,s){o.onload=u,o.onerror=s}),Et(i,"link",l),e.state.loading|=4,Co(i,a.precedence,t),e.instance=i;case"script":return i=an(a.src),(n=t.querySelector(mi(i)))?(e.instance=n,gt(n),n):(l=a,(n=fe.get(i))&&(l=I({},a),Vr(l,n)),t=t.ownerDocument||t,n=t.createElement("script"),gt(n),Et(n,"link",l),t.head.appendChild(n),e.instance=n);case"void":return null;default:throw Error(w(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(l=e.instance,e.state.loading|=4,Co(l,a.precedence,t));return e.instance}function Co(t,e,a){for(var l=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),n=l.length?l[l.length-1]:null,i=n,o=0;o<l.length;o++){var u=l[o];if(u.dataset.precedence===e)i=u;else if(i!==n)break}i?i.parentNode.insertBefore(t,i.nextSibling):(e=a.nodeType===9?a.head:a,e.insertBefore(t,e.firstChild))}function jr(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function Vr(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var Oo=null;function em(t,e,a){if(Oo===null){var l=new Map,n=Oo=new Map;n.set(a,l)}else n=Oo,l=n.get(a),l||(l=new Map,n.set(a,l));if(l.has(t))return l;for(l.set(t,null),a=a.getElementsByTagName(t),n=0;n<a.length;n++){var i=a[n];if(!(i[ui]||i[St]||t==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var o=i.getAttribute(e)||"";o=t+o;var u=l.get(o);u?u.push(i):l.set(o,[i])}}return l}function am(t,e,a){t=t.ownerDocument||t,t.head.insertBefore(a,e==="title"?t.querySelector("head > title"):null)}function Lb(t,e,a){if(a===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function j0(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function Bb(t,e,a,l){if(a.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var n=Kl(l.href),i=e.querySelector(pi(n));if(i){e=i._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=iu.bind(t),e.then(t,t)),a.state.loading|=4,a.instance=i,gt(i);return}i=e.ownerDocument||e,l=Y0(l),(n=fe.get(n))&&jr(l,n),i=i.createElement("link"),gt(i);var o=i;o._p=new Promise(function(u,s){o.onload=u,o.onerror=s}),Et(i,"link",l),a.instance=i}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,e),(e=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=iu.bind(t),e.addEventListener("load",a),e.addEventListener("error",a))}}var es=0;function Hb(t,e){return t.stylesheets&&t.count===0&&$o(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var l=setTimeout(function(){if(t.stylesheets&&$o(t,t.stylesheets),t.unsuspend){var i=t.unsuspend;t.unsuspend=null,i()}},6e4+e);0<t.imgBytes&&es===0&&(es=62500*vb());var n=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&$o(t,t.stylesheets),t.unsuspend)){var i=t.unsuspend;t.unsuspend=null,i()}},(t.imgBytes>es?50:800)+e);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(l),clearTimeout(n)}}:null}function iu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)$o(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var ou=null;function $o(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,ou=new Map,e.forEach(qb,t),ou=null,iu.call(t))}function qb(t,e){if(!(e.state.loading&4)){var a=ou.get(t);if(a)var l=a.get(null);else{a=new Map,ou.set(t,a);for(var n=t.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<n.length;i++){var o=n[i];(o.nodeName==="LINK"||o.getAttribute("media")!=="not all")&&(a.set(o.dataset.precedence,o),l=o)}l&&a.set(null,l)}n=e.instance,o=n.getAttribute("data-precedence"),i=a.get(o)||l,i===l&&a.set(null,n),a.set(o,n),this.count++,l=iu.bind(this),n.addEventListener("load",l),n.addEventListener("error",l),i?i.parentNode.insertBefore(n,i.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(n,t.firstChild)),e.state.loading|=4}}var ti={$$typeof:je,Provider:null,Consumer:null,_currentValue:Qa,_currentValue2:Qa,_threadCount:0};function Yb(t,e,a,l,n,i,o,u,s){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Mc(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Mc(0),this.hiddenUpdates=Mc(null),this.identifierPrefix=l,this.onUncaughtError=n,this.onCaughtError=i,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=s,this.incompleteTransitions=new Map}function V0(t,e,a,l,n,i,o,u,s,p,g,v){return t=new Yb(t,e,a,o,s,p,g,v,u),e=1,i===!0&&(e|=24),i=Xt(3,null,null,e),t.current=i,i.stateNode=t,e=mr(),e.refCount++,t.pooledCache=e,e.refCount++,i.memoizedState={element:l,isDehydrated:a,cache:e},yr(i),t}function G0(t){return t?(t=zl,t):zl}function Q0(t,e,a,l,n,i){n=G0(n),l.context===null?l.context=n:l.pendingContext=n,l=va(e),l.payload={element:a},i=i===void 0?null:i,i!==null&&(l.callback=i),a=ba(t,l,e),a!==null&&(Ht(a,t,e),Un(a,t,e))}function lm(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<e?a:e}}function Gr(t,e){lm(t,e),(t=t.alternate)&&lm(t,e)}function X0(t){if(t.tag===13||t.tag===31){var e=ll(t,67108864);e!==null&&Ht(e,t,67108864),Gr(t,67108864)}}function nm(t){if(t.tag===13||t.tag===31){var e=Wt();e=tr(e);var a=ll(t,e);a!==null&&Ht(a,t,e),Gr(t,e)}}var uu=!0;function jb(t,e,a,l){var n=z.T;z.T=null;var i=j.p;try{j.p=2,Qr(t,e,a,l)}finally{j.p=i,z.T=n}}function Vb(t,e,a,l){var n=z.T;z.T=null;var i=j.p;try{j.p=8,Qr(t,e,a,l)}finally{j.p=i,z.T=n}}function Qr(t,e,a,l){if(uu){var n=Js(l);if(n===null)Pc(t,e,l,cu,a),im(t,l);else if(Qb(n,t,e,a,l))l.stopPropagation();else if(im(t,l),e&4&&-1<Gb.indexOf(t)){for(;n!==null;){var i=Fl(n);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var o=ja(i.pendingLanes);if(o!==0){var u=i;for(u.pendingLanes|=2,u.entangledLanes|=2;o;){var s=1<<31-Jt(o);u.entanglements[1]|=s,o&=~s}ze(i),(Y&6)===0&&(Fo=Zt()+500,di(0,!1))}}break;case 31:case 13:u=ll(i,2),u!==null&&Ht(u,i,2),wu(),Gr(i,2)}if(i=Js(l),i===null&&Pc(t,e,l,cu,a),i===n)break;n=i}n!==null&&l.stopPropagation()}else Pc(t,e,l,null,a)}}function Js(t){return t=nr(t),Xr(t)}var cu=null;function Xr(t){if(cu=null,t=xl(t),t!==null){var e=li(t);if(e===null)t=null;else{var a=e.tag;if(a===13){if(t=fm(e),t!==null)return t;t=null}else if(a===31){if(t=dm(e),t!==null)return t;t=null}else if(a===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return cu=t,null}function k0(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Cv()){case gm:return 2;case ym:return 8;case Bo:case Ov:return 32;case vm:return 268435456;default:return 32}default:return 32}}var Ws=!1,xa=null,Ea=null,Ta=null,ei=new Map,ai=new Map,ra=[],Gb="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function im(t,e){switch(t){case"focusin":case"focusout":xa=null;break;case"dragenter":case"dragleave":Ea=null;break;case"mouseover":case"mouseout":Ta=null;break;case"pointerover":case"pointerout":ei.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":ai.delete(e.pointerId)}}function En(t,e,a,l,n,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:a,eventSystemFlags:l,nativeEvent:i,targetContainers:[n]},e!==null&&(e=Fl(e),e!==null&&X0(e)),t):(t.eventSystemFlags|=l,e=t.targetContainers,n!==null&&e.indexOf(n)===-1&&e.push(n),t)}function Qb(t,e,a,l,n){switch(e){case"focusin":return xa=En(xa,t,e,a,l,n),!0;case"dragenter":return Ea=En(Ea,t,e,a,l,n),!0;case"mouseover":return Ta=En(Ta,t,e,a,l,n),!0;case"pointerover":var i=n.pointerId;return ei.set(i,En(ei.get(i)||null,t,e,a,l,n)),!0;case"gotpointercapture":return i=n.pointerId,ai.set(i,En(ai.get(i)||null,t,e,a,l,n)),!0}return!1}function Z0(t){var e=xl(t.target);if(e!==null){var a=li(e);if(a!==null){if(e=a.tag,e===13){if(e=fm(a),e!==null){t.blockedOn=e,Vd(t.priority,function(){nm(a)});return}}else if(e===31){if(e=dm(a),e!==null){t.blockedOn=e,Vd(t.priority,function(){nm(a)});return}}else if(e===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ro(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var a=Js(t.nativeEvent);if(a===null){a=t.nativeEvent;var l=new a.constructor(a.type,a);ms=l,a.target.dispatchEvent(l),ms=null}else return e=Fl(a),e!==null&&X0(e),t.blockedOn=a,!1;e.shift()}return!0}function om(t,e,a){Ro(t)&&a.delete(e)}function Xb(){Ws=!1,xa!==null&&Ro(xa)&&(xa=null),Ea!==null&&Ro(Ea)&&(Ea=null),Ta!==null&&Ro(Ta)&&(Ta=null),ei.forEach(om),ai.forEach(om)}function yo(t,e){t.blockedOn===e&&(t.blockedOn=null,Ws||(Ws=!0,pt.unstable_scheduleCallback(pt.unstable_NormalPriority,Xb)))}var vo=null;function um(t){vo!==t&&(vo=t,pt.unstable_scheduleCallback(pt.unstable_NormalPriority,function(){vo===t&&(vo=null);for(var e=0;e<t.length;e+=3){var a=t[e],l=t[e+1],n=t[e+2];if(typeof l!="function"){if(Xr(l||a)===null)continue;break}var i=Fl(a);i!==null&&(t.splice(e,3),e-=3,Cs(i,{pending:!0,data:n,method:a.method,action:l},l,n))}}))}function Jl(t){function e(s){return yo(s,t)}xa!==null&&yo(xa,t),Ea!==null&&yo(Ea,t),Ta!==null&&yo(Ta,t),ei.forEach(e),ai.forEach(e);for(var a=0;a<ra.length;a++){var l=ra[a];l.blockedOn===t&&(l.blockedOn=null)}for(;0<ra.length&&(a=ra[0],a.blockedOn===null);)Z0(a),a.blockedOn===null&&ra.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(l=0;l<a.length;l+=3){var n=a[l],i=a[l+1],o=n[qt]||null;if(typeof i=="function")o||um(a);else if(o){var u=null;if(i&&i.hasAttribute("formAction")){if(n=i,o=i[qt]||null)u=o.formAction;else if(Xr(n)!==null)continue}else u=o.action;typeof u=="function"?a[l+1]=u:(a.splice(l,3),l-=3),um(a)}}}function K0(){function t(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(o){return n=o})},focusReset:"manual",scroll:"manual"})}function e(){n!==null&&(n(),n=null),l||setTimeout(a,20)}function a(){if(!l&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,n=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(a,100),function(){l=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),n!==null&&(n(),n=null)}}}function kr(t){this._internalRoot=t}Tu.prototype.render=kr.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(w(409));var a=e.current,l=Wt();Q0(a,l,t,e,null,null)};Tu.prototype.unmount=kr.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Q0(t.current,2,null,t,null,null),wu(),e[Wl]=null}};function Tu(t){this._internalRoot=t}Tu.prototype.unstable_scheduleHydration=function(t){if(t){var e=Em();t={blockedOn:null,target:t,priority:e};for(var a=0;a<ra.length&&e!==0&&e<ra[a].priority;a++);ra.splice(a,0,t),a===0&&Z0(t)}};var cm=sm.version;if(cm!=="19.2.5")throw Error(w(527,cm,"19.2.5"));j.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(w(188)):(t=Object.keys(t).join(","),Error(w(268,t)));return t=Ev(e),t=t!==null?pm(t):null,t=t===null?null:t.stateNode,t};var kb={bundleType:0,version:"19.2.5",rendererPackageName:"react-dom",currentDispatcherRef:z,reconcilerVersion:"19.2.5"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Tn=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Tn.isDisabled&&Tn.supportsFiber))try{ni=Tn.inject(kb),Kt=Tn}catch{}var Tn;Au.createRoot=function(t,e){if(!rm(t))throw Error(w(299));var a=!1,l="",n=qh,i=Yh,o=jh;return e!=null&&(e.unstable_strictMode===!0&&(a=!0),e.identifierPrefix!==void 0&&(l=e.identifierPrefix),e.onUncaughtError!==void 0&&(n=e.onUncaughtError),e.onCaughtError!==void 0&&(i=e.onCaughtError),e.onRecoverableError!==void 0&&(o=e.onRecoverableError)),e=V0(t,1,!1,null,null,a,l,null,n,i,o,K0),t[Wl]=e.current,Yr(t),new kr(e)};Au.hydrateRoot=function(t,e,a){if(!rm(t))throw Error(w(299));var l=!1,n="",i=qh,o=Yh,u=jh,s=null;return a!=null&&(a.unstable_strictMode===!0&&(l=!0),a.identifierPrefix!==void 0&&(n=a.identifierPrefix),a.onUncaughtError!==void 0&&(i=a.onUncaughtError),a.onCaughtError!==void 0&&(o=a.onCaughtError),a.onRecoverableError!==void 0&&(u=a.onRecoverableError),a.formState!==void 0&&(s=a.formState)),e=V0(t,1,!0,e,a??null,l,n,s,i,o,u,K0),e.context=G0(null),a=e.current,l=Wt(),l=tr(l),n=va(l),n.callback=null,ba(a,n,l),a=l,e.current.lanes=a,oi(e,a),ze(e),t[Wl]=e.current,Yr(t),new Tu(e)};Au.version="19.2.5"});var I0=be((L2,F0)=>{"use strict";function W0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(W0)}catch(t){console.error(t)}}W0(),F0.exports=J0()});var Lg=be(Ou=>{"use strict";var vS=Symbol.for("react.transitional.element"),bS=Symbol.for("react.fragment");function Dg(t,e,a){var l=null;if(a!==void 0&&(l=""+a),e.key!==void 0&&(l=""+e.key),"key"in e){a={};for(var n in e)n!=="key"&&(a[n]=e[n])}else a=e;return e=a.ref,{$$typeof:vS,type:t,key:l,ref:e!==void 0?e:null,props:a}}Ou.Fragment=bS;Ou.jsx=Dg;Ou.jsxs=Dg});var ot=be((vw,Bg)=>{"use strict";Bg.exports=Lg()});var c="lookmovie2-enhancer",Qu=`${c}:settings`,Xu=`${c}:watchlist`,ku=`${c}:movie-watchlist`,Zu=`${c}:playlist`,ji=`${c}:playlist-session`,Vi=`${c}:shows-list-progress`,Ku=`${c}:resume-points`,Ju=`${c}:intro-times`,Wu=`${c}:backup-snapshots`,$f=14,Fu=`${c}-style`,Iu=`${c}-site-theme`,Pu=`${c}-ad-bypass-style`,sl=`${c}-fullscreen-style`,Se=`${c}-fullscreen-exit`,S=`${c}-root`,Gi=`${c}:ntfy-active-tab`,Rf=15e3,Uf=500,Df=/^[A-Za-z0-9_-]{1,64}$/,Lf=3600*1e3,Bf=1e3,Qi=95,Hf=2,tc=2e3,qf=30*1e3,Yf=25,jf=10,Vf=8,Gf=300,Vt=Object.freeze({autoPlay:!0,autoFullscreen:!0,windowedFullscreen:!0,autoNextEpisode:!0,autoSkipIntro:!0,siteTheme:!0,ntfyRemoteEnabled:!1,ntfyServer:"https://ntfy.sh",ntfyTopic:"",ntfyControlTopic:"",ntfyCommandSecret:""});function et(t){let e=Number.parseInt(String(t),10);return Number.isFinite(e)&&e>0?e:0}async function Xi(t){let e=await fetch(t,{credentials:"same-origin"});if(!e.ok)throw new Error(`Request failed (${e.status})`);return e.text()}async function ki(t){let e=await fetch(t,{credentials:"same-origin"});if(!e.ok)throw new Error(`Request failed (${e.status})`);return e.json()}function we(t){return t?t.replaceAll("\\'","'").replaceAll("\\\\","\\"):""}function ut(t){let e=typeof t=="string"?t.trim():"";if(!e||e.startsWith("data:image/"))return"";let a=typeof window<"u"&&window.location?window.location.href:"https://www.lookmovie2.to/";try{return new URL(e,a).href}catch{return e.startsWith("//")?`https:${e}`:e}}function aa(t){if(!t)return"";let a=(t.getAttribute("style")||"").match(/background-image:\s*url\((['"]?)(.*?)\1\)/i),l=[t.getAttribute("content"),t.getAttribute("data-lazy-background"),t.getAttribute("data-src-portrait"),t.getAttribute("data-background-image"),t.getAttribute("data-src"),a?.[2],t.getAttribute("src")];return ut(l.find(n=>typeof n=="string"&&n.trim()&&!n.trim().startsWith("data:image/"))||"")}function Qf(t){if(!t||typeof t.getBoundingClientRect!="function")return!1;let e=t.getBoundingClientRect();return e.width>0&&e.height>0}function Xf(t){return`${t.textContent||""} ${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.trim()}function Mt(t){if(!t||typeof t!="object")return null;let e=et(t.season),a=et(t.episode),l=et(t.idEpisode||t.id_episode);return!e||!a||!l?null:{season:e,episode:a,idEpisode:l,watchedAt:typeof t.watchedAt=="number"?t.watchedAt:void 0,updatedAt:typeof t.updatedAt=="number"?t.updatedAt:void 0}}function Rt(t){return t?`S${String(t.season).padStart(2,"0")}E${String(t.episode).padStart(2,"0")}`:"Unknown episode"}function Ce(t,e){return!t&&!e?0:t?e?t.season!==e.season?t.season-e.season:t.episode!==e.episode?t.episode-e.episode:t.idEpisode-e.idEpisode:1:-1}function ec(t,e){return!t||!e?!1:t.idEpisode===e.idEpisode&&t.season===e.season&&t.episode===e.episode}function Oe(t){return!!t&&ec(t.latestEpisode,t.lastWatched)}function rl(){return typeof GM_getValue=="function"&&typeof GM_setValue=="function"}function Ba(t){if(rl()){let a=GM_getValue(t,null);if(typeof a=="string")return a}let e=localStorage.getItem(t);return e!==null&&rl()&&GM_setValue(t,e),e}function $e(t,e){rl()&&GM_setValue(t,e);try{e===null?localStorage.removeItem(t):localStorage.setItem(t,e)}catch(a){if(!rl())throw a}}function ac(t){return{autoPlay:typeof t.autoPlay=="boolean"?t.autoPlay:Vt.autoPlay,autoFullscreen:typeof t.autoFullscreen=="boolean"?t.autoFullscreen:Vt.autoFullscreen,windowedFullscreen:typeof t.windowedFullscreen=="boolean"?t.windowedFullscreen:Vt.windowedFullscreen,autoNextEpisode:typeof t.autoNextEpisode=="boolean"?t.autoNextEpisode:Vt.autoNextEpisode,autoSkipIntro:typeof t.autoSkipIntro=="boolean"?t.autoSkipIntro:Vt.autoSkipIntro,siteTheme:typeof t.siteTheme=="boolean"?t.siteTheme:Vt.siteTheme,ntfyRemoteEnabled:typeof t.ntfyRemoteEnabled=="boolean"?t.ntfyRemoteEnabled:Vt.ntfyRemoteEnabled,ntfyServer:typeof t.ntfyServer=="string"&&t.ntfyServer.trim()?t.ntfyServer.trim().replace(/\/+$/,""):Vt.ntfyServer,ntfyTopic:typeof t.ntfyTopic=="string"&&t.ntfyTopic.trim()?t.ntfyTopic.trim():Vt.ntfyTopic,ntfyControlTopic:typeof t.ntfyControlTopic=="string"&&t.ntfyControlTopic.trim()?t.ntfyControlTopic.trim():Vt.ntfyControlTopic,ntfyCommandSecret:typeof t.ntfyCommandSecret=="string"&&t.ntfyCommandSecret.trim()?t.ntfyCommandSecret.trim():Vt.ntfyCommandSecret}}function Zf(){try{let t=Ba(Qu),e=JSON.parse(t||"{}");return ac(e)}catch(t){return console.warn(`[${c}] Failed to load saved settings.`,t),{...Vt}}}function fn(t,e){if(!e||typeof e!="object")return null;let a=typeof t=="string"&&t.trim()?t.trim():"";return a?{slug:a,idShow:et(e.idShow||e.id_show),title:typeof e.title=="string"&&e.title.trim()?e.title.trim():a,year:typeof e.year=="string"||typeof e.year=="number"?String(e.year).trim():"",poster:typeof e.poster=="string"?e.poster:"",addedAt:typeof e.addedAt=="number"?e.addedAt:Date.now(),lastSyncedAt:typeof e.lastSyncedAt=="number"?e.lastSyncedAt:0,lastSyncError:typeof e.lastSyncError=="string"?e.lastSyncError:"",latestEpisode:Mt(e.latestEpisode),lastWatched:Mt(e.lastWatched),upcoming:Py(e.upcoming)}:null}function Py(t){if(!t||typeof t!="object"||!Array.isArray(t.episodes))return null;let e=t.episodes.map(Mt).filter(Boolean),a=et(t.total);return{afterIdEpisode:et(t.afterIdEpisode),total:Math.max(a,e.length),episodes:e}}function Kf(){try{let t=JSON.parse(Ba(Xu)||"{}"),e=t&&typeof t=="object"&&t.shows&&typeof t.shows=="object"?t.shows:{},a={};return Object.entries(e).forEach(([l,n])=>{let i=fn(l,n);i&&(a[l]=i)}),{shows:a}}catch(t){return console.warn(`[${c}] Failed to load watchlist.`,t),{shows:{}}}}function dn(t,e){if(!e||typeof e!="object")return null;let a=typeof t=="string"&&t.trim()?t.trim():"";return a?{slug:a,title:typeof e.title=="string"&&e.title.trim()?e.title.trim():a,year:typeof e.year=="string"||typeof e.year=="number"?String(e.year).trim():"",poster:typeof e.poster=="string"?e.poster:"",idMovie:et(e.idMovie||e.id_movie),href:typeof e.href=="string"?e.href:`/movies/view/${a}`,addedAt:typeof e.addedAt=="number"?e.addedAt:Date.now(),watched:!!e.watched,watchedAt:typeof e.watchedAt=="number"?e.watchedAt:void 0}:null}function Jf(){try{let t=JSON.parse(Ba(ku)||"{}"),e=t&&typeof t=="object"&&t.movies&&typeof t.movies=="object"?t.movies:{},a={};return Object.entries(e).forEach(([l,n])=>{let i=dn(l,n);i&&(a[l]=i)}),{movies:a}}catch(t){return console.warn(`[${c}] Failed to load movie watchlist.`,t),{movies:{}}}}function pn(t,e){if(!e||typeof e!="object")return null;let a=typeof e.slug=="string"&&e.slug.trim()?e.slug.trim():typeof t=="string"&&t.trim()?t.split(":")[0].trim():"",l=Mt(e.episode||e.latestEpisode);return!a||!l?null:{key:typeof t=="string"&&t.trim()?t.trim():`${a}:${l.season}:${l.episode}:${l.idEpisode}`,slug:a,idShow:et(e.idShow||e.id_show),title:typeof e.title=="string"&&e.title.trim()?e.title.trim():a,year:typeof e.year=="string"||typeof e.year=="number"?String(e.year).trim():"",poster:typeof e.poster=="string"?e.poster:"",episode:l,addedAt:typeof e.addedAt=="number"?e.addedAt:Date.now()}}function Wf(){try{let t=JSON.parse(Ba(Zu)||"{}"),e=t&&typeof t=="object"&&t.entries&&typeof t.entries=="object"?t.entries:{},a={};return Object.entries(e).forEach(([l,n])=>{let i=pn(l,n);i&&(a[i.key]=i)}),{entries:a}}catch(t){return console.warn(`[${c}] Failed to load playlist.`,t),{entries:{}}}}function Ff(t){return!t||typeof t!="object"?{active:!1,currentKey:"",startedAt:0}:{active:!!t.active,currentKey:typeof t.currentKey=="string"?t.currentKey:"",startedAt:typeof t.startedAt=="number"?t.startedAt:0}}function If(){try{return Ff(JSON.parse(Ba(ji)||"{}"))}catch(t){return console.warn(`[${c}] Failed to load playlist session.`,t),{active:!1,currentKey:"",startedAt:0}}}function Zi(t){if(!t||typeof t!="object")return null;let e=typeof t.slug=="string"&&t.slug.trim()?t.slug.trim():"",a=Mt(t.episode);return!e||!a?null:{slug:e,title:typeof t.title=="string"?t.title:e,href:typeof t.href=="string"?t.href:"",episode:a,seenAt:typeof t.seenAt=="number"?t.seenAt:Date.now(),source:t.source==="manual"?"manual":"auto"}}function Pf(){try{return Zi(JSON.parse(Ba(Vi)||"null"))}catch(t){return console.warn(`[${c}] Failed to load shows list progress.`,t),null}}function td(t){try{$e(Qu,JSON.stringify(t))}catch(e){console.warn(`[${c}] Failed to save settings.`,e)}}function ed(t){try{$e(Xu,JSON.stringify(t)),nd({watchlist:t})}catch(e){console.warn(`[${c}] Failed to save watchlist.`,e)}}function ad(t){try{$e(ku,JSON.stringify(t)),nd({movieWatchlist:t})}catch(e){console.warn(`[${c}] Failed to save movie watchlist.`,e)}}function lc(t){try{$e(Zu,JSON.stringify(t))}catch(e){console.warn(`[${c}] Failed to save playlist.`,e)}}function ld(t){try{let e=Ff(t);if(!e.active){$e(ji,null);return}$e(ji,JSON.stringify(e))}catch(e){console.warn(`[${c}] Failed to save playlist session.`,e)}}function nc(t){try{let e=Zi(t);if(!e){$e(Vi,null);return}$e(Vi,JSON.stringify(e))}catch(e){console.warn(`[${c}] Failed to save shows list progress.`,e)}}function kf(t,e){return t&&t[e]&&typeof t[e]=="object"?Object.keys(t[e]).length:0}function tv(t=new Date){let e=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${a}`}function Ki(){if(!rl())return[];try{let t=JSON.parse(GM_getValue(Wu,null)||"[]");return Array.isArray(t)?t.filter(e=>e&&typeof e.date=="string"):[]}catch(t){return console.warn(`[${c}] Failed to load backup snapshots.`,t),[]}}function nd(t){if(rl())try{if(t.watchlist&&!kf(t.watchlist,"shows")||t.movieWatchlist&&!kf(t.movieWatchlist,"movies"))return;let e=tv(),a=Ki(),l=a.find(o=>o.date===e)||a[0]||{},i=[{watchlist:l.watchlist||{shows:{}},movieWatchlist:l.movieWatchlist||{movies:{}},...t,date:e,savedAt:Date.now()},...a.filter(o=>o.date!==e)].sort((o,u)=>u.date.localeCompare(o.date)).slice(0,$f);GM_setValue(Wu,JSON.stringify(i))}catch(e){console.warn(`[${c}] Failed to save backup snapshot.`,e)}}function id(t,e){try{let a=JSON.parse(Ba(t)||"null");return a&&typeof a=="object"?a:e}catch(a){return console.warn(`[${c}] Failed to load ${t}.`,a),e}}function od(t,e){try{$e(t,JSON.stringify(e))}catch(a){console.warn(`[${c}] Failed to save ${t}.`,a)}}function ic(t){if(!t||typeof t!="object")return null;let e=Number(t.progress??t.currentTime),a=Number(t.duration);return!Number.isFinite(e)||!Number.isFinite(a)||e<0||a<=0?null:{progress:e,duration:a,savedAt:typeof t.savedAt=="number"?t.savedAt:Date.now()}}function ud(){let t={};return Object.entries(id(Ku,{})).forEach(([e,a])=>{let l=ic(a);l&&(t[e]=l)}),t}function cd(t){od(Ku,t)}function ev(t){if(!t||typeof t!="object")return null;let e=Number(t.start),a=Number(t.end);return!Number.isFinite(e)||!Number.isFinite(a)||e<0||a<=e?null:{start:e,end:a,updatedAt:typeof t.updatedAt=="number"?t.updatedAt:Date.now()}}function sd(){let t={};return Object.entries(id(Ju,{})).forEach(([e,a])=>{let l=ev(a);l&&(t[e]=l)}),t}function oc(t){od(Ju,t)}var d={settings:Zf(),watchlistStore:Kf(),movieWatchlistStore:Jf(),playlistStore:Wf(),playlistSession:If(),showsListProgress:Pf(),showsListProgressOrder:-1,showsListSeenCandidate:null,showsListSeenCandidateOrder:-1,showsListSessionTouched:!1,showsListManualMarkerSet:!1,showsListObserver:null,showsListMutationObserver:null,showsListRefreshScheduled:!1,showsListObservedCards:new WeakSet,domBootstrapped:!1,uiBootAttempts:0,fullscreenTriggered:!1,lastKnownUrl:location.href,watchlistRefreshPromise:null,watchlistBusy:!1,watchlistMessage:"",watchlistMessageTone:"muted",lastTrackedEpisodeSignature:"",ntfyRemoteStatus:"disabled",ntfyRemoteMessage:"",ntfyLastNotificationAt:0,ntfyRemoteTabId:`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`,ntfyRemoteClaimTimer:0};var fy=Z(I0());var Zr=new Set;function P0(t){return Zr.add(t),()=>Zr.delete(t)}function ln(){Zr.forEach(t=>t())}function tg(){return`
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
        .${c}-player-menu-button {
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

        .${c}-intro > * {
            pointer-events: auto;
        }

        .${c}-intro .${c}-intro-skip {
            padding: 10px 18px;
            font-size: 14px;
            box-shadow: 0 10px 26px rgba(0, 0, 0, 0.45);
        }

        .${c}-player-menu {
            position: absolute;
            top: 14px;
            left: 14px;
            z-index: 1000002;
            transition: opacity 0.2s ease;
        }

        /* Mirror the player's own controls: tuck the gear away while playing idle. */
        .vjs-user-inactive.vjs-playing .${c}-player-menu[data-open="false"] {
            opacity: 0;
            pointer-events: none;
        }

        .${c}-player-menu-gear {
            display: inline-flex;
            width: 40px;
            height: 40px;
            align-items: center;
            justify-content: center;
            padding: 0;
            border: 1px solid rgba(255, 255, 255, 0.24);
            border-radius: 50%;
            background: rgba(2, 6, 23, 0.72);
            color: #f8fafc;
            cursor: pointer;
            transition: transform 0.2s ease, background 0.2s ease;
        }

        .${c}-player-menu-gear:hover,
        .${c}-player-menu[data-open="true"] .${c}-player-menu-gear {
            background: rgba(37, 99, 235, 0.85);
            transform: rotate(30deg);
        }

        .${c}-player-menu-gear svg {
            width: 22px;
            height: 22px;
            fill: currentColor;
        }

        .${c}-player-menu-panel {
            display: none;
            min-width: 250px;
            margin-top: 8px;
            padding: 8px;
            border: 1px solid rgba(255, 255, 255, 0.16);
            border-radius: 14px;
            background: rgba(2, 6, 23, 0.94);
            box-shadow: 0 18px 40px rgba(0, 0, 0, 0.55);
            color: #f8fafc;
            font: 13px/1.3 Arial, sans-serif;
        }

        .${c}-player-menu[data-open="true"] .${c}-player-menu-panel {
            display: grid;
            gap: 6px;
        }

        .${c}-player-menu-section + .${c}-player-menu-section {
            border-top: 1px solid rgba(148, 163, 184, 0.18);
            padding-top: 8px;
        }

        .${c}-player-menu-toggle {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            margin: 0;
            padding: 8px 10px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
        }

        .${c}-player-menu-toggle:hover {
            background: rgba(30, 41, 59, 0.85);
        }

        .${c}-player-menu-toggle input {
            width: 18px;
            height: 18px;
            margin: 0;
            accent-color: #2563eb;
            cursor: pointer;
        }

        .${c}-player-menu-heading {
            margin: 0 10px 6px;
            color: #94a3b8;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }

        .${c}-player-menu-row {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px;
            padding: 0 10px 4px;
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
    `}var jt=Z(Ha()),sy=Z(xc());var Ot=null,eg="",gi=0,ag=0,lg=!1,_u=new Map;function he(t,e=""){d.ntfyRemoteStatus=t,d.ntfyRemoteMessage=e,ln()}function yi(t){return String(t||"").trim().replace(/^\/+|\/+$/g,"")}function Jr(t){return Df.test(yi(t))}function ng(t,e){let a=yi(t);return a?a.length>64?`${e} topic must be 64 characters or fewer.`:`${e} topic can only use letters, numbers, hyphens, and underscores.`:`${e} topic is required.`}function Pr(){return document.visibilityState!=="hidden"}function og(){try{let t=JSON.parse(localStorage.getItem(Gi)||"null");return t&&typeof t=="object"?t:null}catch{return null}}function ug(){try{localStorage.setItem(Gi,JSON.stringify({tabId:d.ntfyRemoteTabId,href:location.href,title:dg(),updatedAt:Date.now()}))}catch(t){console.warn(`[${c}] Failed to claim ntfy remote tab.`,t)}}function Zb(){let t=og();!t||t.tabId!==d.ntfyRemoteTabId||localStorage.removeItem(Gi)}function cg(){let t=og();return!t||!t.tabId||t.tabId===d.ntfyRemoteTabId?!0:Date.now()-Number(t.updatedAt||0)>Rf}function Wr(t="activity"){return!d.settings.ntfyRemoteEnabled||!Pr()||!ge()?!1:(ug(),he("connected",`This tab controls Android remote (${t}).`),!0)}function Kb(){d.settings.ntfyRemoteEnabled&&cg()&&Pr()&&ge()&&ug()}function Fr(){Zb()}function Mu(){let t=yi(d.settings.ntfyControlTopic);if(t)return t;let e=yi(d.settings.ntfyTopic);return e?`${e}-controls`:""}function sg(){let t=rg(),e=Mu();return Jr(t)?Jr(e)?"":ng(e,"Control"):ng(t,"Display")}function Jb(){let t=String(d.settings.ntfyServer||"https://ntfy.sh").replace(/\/+$/,""),e=Mu();if(!t||!e||!Jr(e))return"";let a=new URL(`${t}/${encodeURIComponent(e)}/sse`);return a.searchParams.set("since",String(Math.floor(Date.now()/1e3))),a.toString()}function rg(){return yi(d.settings.ntfyTopic)}function fg(t){return`${String(d.settings.ntfyServer||"https://ntfy.sh").replace(/\/+$/,"")}/${encodeURIComponent(t)}`}function Wb(){return String(d.settings.ntfyServer||"https://ntfy.sh").replace(/\/+$/,"")}function Fb(t){let e=String(d.settings.ntfyCommandSecret||"").trim();return e?`${e} ${t}`:t}function hi(t,e){let a=Mu();return{action:"http",label:t,url:fg(a),method:"POST",body:Fb(e),clear:!1}}function tf(){return location.pathname.startsWith("/shows/play/")}function Ib(){if(ef())return!0;let t=window.movie_storage||window.movie||{};return!tf()&&!!(t.id_movie||t.title||t.slug)}function Pb(){let t=[hi("Play/Pause","toggle"),hi("Fullscreen","fullscreen")];return tf()?t.push(hi("Next","next")):Ib()?t.push(hi("-30s","seek -30")):t.push(hi("+30s","seek 30")),t}function Kr(t,e){let a=String(t||"").replace(/\s+/g," ").trim(),l=typeof e=="string"||typeof e=="number"?String(e).trim():"";if(!a)return"";if(/ \(\d{4}\)$/.test(a))return a;let n=a.match(/^(.*?)(\d{4})$/);return n&&n[1].trim()?`${n[1].trim()} (${n[2]})`:l&&!a.endsWith(`(${l})`)?`${a} (${l})`:a}function dg(){let t=window.show_storage||window.show||{},e=window.movie_storage||window.movie||{},a=typeof t.title=="string"&&t.title.trim()?Kr(t.title,t.year):typeof e.title=="string"&&e.title.trim()?Kr(e.title,e.year):"";if(a)return a;let l=document.querySelector("h1")?.textContent||document.querySelector(".movie-title, .film-title, .show-title")?.textContent||document.title||"LookMovie2";return Kr(l)||"LookMovie2"}function tS(){let t=location.hash.match(/^#S(\d+)-E(\d+)-(\d+)$/i);return t?`S${String(t[1]).padStart(2,"0")}E${String(t[2]).padStart(2,"0")}`:""}function pg(){let t=window.show_storage||window.show||{},e=Number(window.id_show||t.id_show||t.idShow||0),a=Object.values(d.watchlistStore.shows||{});if(e){let n=a.find(i=>i.idShow===e);if(n)return n}let l=String(t.slug||"").trim();return l&&d.watchlistStore.shows[l]||null}function eS(){let t=window.show_storage||window.show||{},e=pg(),a=location.pathname.match(/\/shows\/view\/([^/?#]+)/i),n=document.querySelector('a[href*="/shows/view/"]')?.getAttribute("href")?.match(/\/shows\/view\/([^/?#]+)/i);return String(t.slug||"").trim()||String(t.seo_url||"").trim()||String(e?.slug||"").trim()||(a?a[1]:"")||(n?n[1]:"")}function aS(t){return t?_u.has(t)?Promise.resolve(_u.get(t)||""):fetch(`/shows/view/${encodeURIComponent(t)}`,{credentials:"same-origin"}).then(e=>{if(!e.ok)throw new Error(`Show poster request failed with HTTP ${e.status}`);return e.text()}).then(e=>{let a=e.match(/poster_medium:\s*'((?:\\'|[^'])*)'/),l=ut(a?we(a[1]):"");return _u.set(t,l),l}).catch(e=>(console.warn(`[${c}] Could not resolve show poster for ntfy attachment.`,e),_u.set(t,""),"")):Promise.resolve("")}function lS(){let t=ge(),e=window.movie_storage||window.movie||{},a=window.show_storage||window.show||{},l=pg(),n=document.querySelector(['meta[property="og:image"]',".movie__poster[data-background-image]",'.movie__poster[style*="background-image"]',".movie-single-ct img[data-src]",".movie-single-ct img[src]",".internal-page-container img[data-src]",".internal-page-container img[src]","[data-background-image]",'[style*="background-image"]',"img[data-src-portrait]","img[data-src]"].join(", "));return ut(t?.getAttribute("poster"))||ut(e.movie_poster)||ut(e.poster_medium)||ut(a.poster_medium)||ut(a.poster_large)||ut(a.poster_original)||ut(a.poster)||ut(l?.poster)||aa(n)}function nS(){let t=lS();return t||!tf()?Promise.resolve(t):aS(eS())}function iS(t,e,a="POST"){let l=JSON.stringify(e),n={"Content-Type":"application/json"};return fetch(t,{method:a,body:l,headers:n}).then(i=>{if(!i.ok)throw new Error(`ntfy request failed with HTTP ${i.status}`);return i}).catch(i=>{if(typeof GM_xmlhttpRequest!="function")throw i;return new Promise((o,u)=>{GM_xmlhttpRequest({method:a,url:t,data:l,headers:n,onload(s){if(s.status>=200&&s.status<300){o(s);return}u(new Error(`ntfy request failed with HTTP ${s.status}`))},onerror:u})})})}function oS(t,e,a,l="POST"){return fetch(t,{method:l,body:e,headers:a}).then(n=>{if(!n.ok)throw new Error(`ntfy request failed with HTTP ${n.status}`);return n})}function uS(t){return t?fetch(t,{credentials:"omit",referrerPolicy:"no-referrer"}).then(e=>{if(!e.ok)throw new Error(`Poster request failed with HTTP ${e.status}`);return e.blob()}).then(e=>!e||!e.size||e.size>15*1024*1024?null:e).catch(e=>(console.warn(`[${c}] Could not fetch poster for ntfy attachment.`,e),null)):Promise.resolve(null)}function cS(t,e,a){let l={Title:t.title,Message:t.message,Priority:String(t.priority),Tags:Array.isArray(t.tags)?t.tags.join(","):"",Click:t.click,Actions:JSON.stringify(t.actions||[]),"X-Sequence-ID":t.sequence_id};return e&&(l.Filename=e),a&&(l["Content-Type"]=a),Object.keys(l).forEach(n=>{l[n]||delete l[n]}),l}function sS(t,e,a){return uS(a).then(l=>l?oS(fg(t),l,cS(e,"lookmovie-poster.jpg",l.type||"image/jpeg")):iS(Wb(),e))}function vi(t="update"){if(!d.settings.ntfyRemoteEnabled||!Wr(t))return!1;let e=rg(),a=Mu();if(!e||!a||sg())return!1;let l=ge();if(!l)return!1;let n=l.paused,i=dg(),o=tS(),u={topic:e,title:n?"Paused on LookMovie2":"Playing on LookMovie2",message:o?`${i} - ${o}`:i,tags:["tv"],priority:3,sequence_id:`${c}-player`,click:location.href,actions:Pb()};return d.ntfyLastNotificationAt=Date.now(),nS().then(s=>sS(e,u,s)).then(()=>he("connected",`Updated Android player notification (${t}).`)).catch(s=>{console.warn(`[${c}] Failed to publish ntfy player notification.`,s),he("error","Could not publish Android player notification.")}),!0}function rS(t){let e=String(d.settings.ntfyCommandSecret||"").trim();if(e&&t.secret!==e)return null;let a=String(t.command||t.action||"").trim().toLowerCase();if(!a)return null;if(a==="seek"){let l=Number(t.seconds??t.by??t.value);return Number.isFinite(l)?{command:a,seconds:l}:null}if(a==="volume"){let l=Number(t.percent??t.value);return Number.isFinite(l)?{command:a,percent:l}:null}return{command:a}}function fS(t){let e=String(t||"").trim();if(!e)return null;try{let u=JSON.parse(e);if(u&&typeof u=="object")return rS(u)}catch{}let a=String(d.settings.ntfyCommandSecret||"").trim(),l=e;if(a){if(l!==a&&!l.startsWith(`${a} `))return null;l=l.slice(a.length).trim()}let[n="",i=""]=l.split(/\s+/,2),o=n.toLowerCase();if(o==="seek"){let u=Number(i);return Number.isFinite(u)?{command:o,seconds:u}:null}if(o==="volume"){let u=Number(i);return Number.isFinite(u)?{command:o,percent:u}:null}return{command:o}}function dS(t){switch(t.command){case"play":return hg();case"pause":return gg();case"toggle":case"playpause":case"play-pause":return yg();case"seek":return vg(t.seconds);case"fullscreen":case"fs":return Sg();case"next":return Nu();case"mute":return Ir(!0);case"unmute":return Ir(!1);case"volume":return bg(t.percent);default:return!1}}function pS(t){let e=null;try{e=JSON.parse(t.data||"{}")}catch(n){console.warn(`[${c}] Failed to parse ntfy event.`,n);return}if(!e||e.event!=="message"||!e.message||e.id&&e.id===eg)return;if(eg=e.id||"",!Pr()||!cg()){let n=Date.now();n-ag>5e3&&(ag=n,he("connected","Another visible LookMovie tab owns the Android remote."));return}let a=fS(e.message);if(!a){he("connected","Ignored ntfy message.");return}let l=dS(a);l&&window.setTimeout(()=>vi(a.command),150),he("connected",l?`Ran remote command: ${a.command}`:`No player handled: ${a.command}`)}function ig(){window.clearTimeout(gi),gi=0,Ot&&(Ot.close(),Ot=null),d.ntfyRemoteClaimTimer&&(window.clearInterval(d.ntfyRemoteClaimTimer),d.ntfyRemoteClaimTimer=0),Fr(),he("disabled","")}function zu(){if(window.clearTimeout(gi),gi=0,!d.settings.ntfyRemoteEnabled)return ig(),!1;let t=Jb();return t?(Ot&&Ot.close(),d.ntfyRemoteClaimTimer||(d.ntfyRemoteClaimTimer=window.setInterval(Kb,5e3)),lg||(lg=!0,window.addEventListener("focus",()=>Wr("focus")),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"?Wr("visible"):Fr()}),window.addEventListener("pagehide",Fr)),he("connecting","Connecting to ntfy."),Ot=new EventSource(t),Ot.onopen=()=>he("connected","Connected to ntfy."),Ot.onmessage=pS,Ot.onerror=()=>{he("error","ntfy connection lost. Reconnecting soon."),Ot&&(Ot.close(),Ot=null),gi=window.setTimeout(zu,5e3)},!0):(ig(),he("disabled",sg()||"Add an ntfy topic to enable remote control."),!1)}function mg(){return Ot&&(Ot.close(),Ot=null),zu()}var mS=`
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
`;function Cu(){let t=document.getElementById(Iu);if(!d.settings.siteTheme){t&&t.remove();return}if(t||!document.documentElement)return;let e=document.createElement("style");e.id=Iu,e.textContent=mS,(document.head||document.documentElement).appendChild(e)}var wg=0;function hS(){window.clearTimeout(wg),wg=window.setTimeout(mg,Uf)}function il(t){let e={ntfyRemoteEnabled:d.settings.ntfyRemoteEnabled,ntfyServer:d.settings.ntfyServer,ntfyTopic:d.settings.ntfyTopic,ntfyControlTopic:d.settings.ntfyControlTopic,ntfyCommandSecret:d.settings.ntfyCommandSecret};d.settings=ac(t),td(d.settings),xg(),Cu(),(!d.settings.autoFullscreen||!d.settings.windowedFullscreen)&&(nn(),d.fullscreenTriggered=!1),(e.ntfyRemoteEnabled!==d.settings.ntfyRemoteEnabled||e.ntfyServer!==d.settings.ntfyServer||e.ntfyTopic!==d.settings.ntfyTopic||e.ntfyControlTopic!==d.settings.ntfyControlTopic||e.ntfyCommandSecret!==d.settings.ntfyCommandSecret)&&hS()}var xi=Z(Ha());function Eg(t,e){return!t||!e?"":`${t}:${e.season}:${e.episode}:${e.idEpisode}`}function af(){return Object.values(d.playlistStore.entries)}function bi(t){return t&&d.playlistStore.entries[t]||null}function Tg(t,e){return!!bi(Eg(t,e))}function lf(t){return[...t].sort((e,a)=>e.addedAt-a.addedAt)}function on(){lc(d.playlistStore),$t(),Oa()}function nf(){ld(d.playlistSession),$t()}function Ag(t){if(!t||!t.slug||!t.latestEpisode)return;let e=Eg(t.slug,t.latestEpisode);if(!e||bi(e)){$t();return}d.playlistStore.entries[e]=pn(e,{slug:t.slug,idShow:t.idShow,title:t.title,year:t.year,poster:t.poster,episode:t.latestEpisode,addedAt:Date.now()}),on()}function of(t){bi(t)&&(delete d.playlistStore.entries[t],d.playlistSession.active&&d.playlistSession.currentKey===t&&un(),on())}function _g(t){if(!t.length)return"Add latest show episodes from the watchlist poster or list view.";let e=t[0];return`${t.length} queued ${t.length===1?"episode":"episodes"} | Next: ${e.title} ${Rt(e.episode)}`}function Mg(t){let e=lf(af());if(!e.length)return null;if(!t)return e[0];let a=e.findIndex(l=>l.key===t);return a>=0?e[a+1]||null:e[0]}function zg(t){return t?(location.href=ol(t.slug,t.episode),!0):!1}function Si(t){let e=t?bi(t):Mg("");return e?(d.playlistSession={active:!0,currentKey:e.key,startedAt:Date.now()},nf(),zg(e)):(un(),!1)}function un(){d.playlistSession={active:!1,currentKey:"",startedAt:0},nf()}function Ng(){if(!d.playlistSession.active)return!1;let t=d.playlistSession.currentKey;if(!bi(t))return un(),!1;let a=Mg(t);return delete d.playlistStore.entries[t],lc(d.playlistStore),a?(d.playlistSession.currentKey=a.key,nf(),on(),zg(a)):(un(),on(),!0)}var gS=1;function yS(){return{app:c,version:gS,exportedAt:new Date().toISOString(),watchlist:d.watchlistStore,movieWatchlist:d.movieWatchlistStore,playlist:d.playlistStore}}function Cg(){let t=JSON.stringify(yS(),null,2),e=URL.createObjectURL(new Blob([t],{type:"application/json"})),a=document.createElement("a");a.href=e,a.download=`lookmovie2-watchlist-${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(a),a.click(),a.remove(),window.setTimeout(()=>URL.revokeObjectURL(e),1e3)}function uf(t,e,a){if(!t||typeof t!="object")return{};let l=t[e];return l&&typeof l=="object"&&l[a]&&typeof l[a]=="object"?l[a]:t[a]&&typeof t[a]=="object"?t[a]:{}}function Og(t){let e=[],a=0,l=0;Object.entries(uf(t,"watchlist","shows")).forEach(([i,o])=>{if(d.watchlistStore.shows[i])return;let u=fn(i,o);u&&(d.watchlistStore.shows[i]=u,e.push(i))}),Object.entries(uf(t,"movieWatchlist","movies")).forEach(([i,o])=>{if(d.movieWatchlistStore.movies[i])return;let u=dn(i,o);u&&(d.movieWatchlistStore.movies[i]=u,a+=1)}),Object.entries(uf(t,"playlist","entries")).forEach(([i,o])=>{let u=pn(i,o);u&&!d.playlistStore.entries[u.key]&&(d.playlistStore.entries[u.key]=u,l+=1)}),e.length&&(ul(),Pe({force:!0,slugs:e})),a&&(cn(),wi()),l&&on();let n=`Restored ${e.length} ${e.length===1?"show":"shows"}, ${a} ${a===1?"movie":"movies"}, ${l} playlist ${l===1?"episode":"episodes"}.`;return Pt(n,e.length||a||l?"success":"muted"),n}async function $g(t){try{return Og(JSON.parse(await t.text()))}catch(e){return console.warn(`[${c}] Failed to import backup.`,e),Pt("That file is not a valid watchlist backup.","danger"),""}}function Rg(){return Ki().map(t=>({date:t.date,showCount:Object.keys(t.watchlist&&t.watchlist.shows||{}).length,movieCount:Object.keys(t.movieWatchlist&&t.movieWatchlist.movies||{}).length}))}function Ug(t){let e=Ki().find(a=>a.date===t);return e?Og(e):""}var Tt=Z(ot());function Hg(){let t=(0,xi.useRef)(null),[e,a]=(0,xi.useState)(""),l=Rg(),[n,i]=(0,xi.useState)(""),o=n||l[0]&&l[0].date||"";return(0,Tt.jsxs)("div",{className:`${c}-setting ${c}-setting-stack`,children:[(0,Tt.jsxs)("div",{children:[(0,Tt.jsx)("p",{className:`${c}-setting-title`,children:"Watchlist backup"}),(0,Tt.jsx)("p",{className:`${c}-setting-copy`,children:"Watchlists are kept in Tampermonkey storage with a daily snapshot for the last 14 days. Export a file now and then for a copy outside the browser. Restoring only adds missing entries."})]}),(0,Tt.jsxs)("div",{className:`${c}-backup-actions`,children:[(0,Tt.jsx)("button",{className:`${c}-button`,type:"button",onClick:()=>Cg(),children:"Export file"}),(0,Tt.jsx)("button",{className:`${c}-button`,type:"button",onClick:()=>t.current&&t.current.click(),children:"Import file"}),(0,Tt.jsx)("input",{ref:t,className:`${c}-file-input`,type:"file",accept:"application/json,.json",hidden:!0,onChange:async u=>{let s=u.currentTarget.files&&u.currentTarget.files[0];u.currentTarget.value="",s&&a(await $g(s))}})]}),l.length?(0,Tt.jsxs)("div",{className:`${c}-backup-actions`,children:[(0,Tt.jsxs)("label",{className:`${c}-field`,children:[(0,Tt.jsx)("span",{children:"Snapshot"}),(0,Tt.jsx)("select",{value:o,onChange:u=>i(u.currentTarget.value),children:l.map(u=>(0,Tt.jsxs)("option",{value:u.date,children:[u.date," (",u.showCount," shows, ",u.movieCount," movies)"]},u.date))})]}),(0,Tt.jsx)("button",{className:`${c}-button`,type:"button",onClick:()=>a(Ug(o)),children:"Restore"})]}):null,e?(0,Tt.jsx)("p",{className:`${c}-ntfy-status`,children:e}):null]})}var ye=Z(ot());function $a({settingKey:t,title:e,copy:a,icon:l}){let n=!!d.settings[t];return(0,ye.jsxs)("label",{className:`${c}-setting`,children:[(0,ye.jsxs)("div",{className:`${c}-setting-main`,children:[l?(0,ye.jsx)("span",{className:`${c}-setting-icon`,children:l}):null,(0,ye.jsxs)("div",{children:[(0,ye.jsx)("p",{className:`${c}-setting-title`,children:e}),(0,ye.jsx)("p",{className:`${c}-setting-copy`,children:a})]})]}),(0,ye.jsxs)("span",{className:`${c}-switch`,children:[(0,ye.jsx)("input",{type:"checkbox",checked:n,onChange:i=>{il({...d.settings,[t]:i.currentTarget.checked})}}),(0,ye.jsx)("span",{className:`${c}-slider`})]})]})}var Lu=Z(Ha());var SS=/^(?:ep_\d+|lookmovie\.mv_\d+)$/,cf=null;function qg(t){return`ep_${t}`}function Yg(t){return`lookmovie.mv_${t}`}function jg(){return cf||(cf=ud()),cf}function Vg(t){try{return ic(JSON.parse(localStorage.getItem(t)||"null"))}catch{return null}}function wS(t){let e=Object.keys(t);return e.length<=tc?!1:(e.sort((a,l)=>t[l].savedAt-t[a].savedAt).slice(tc).forEach(a=>delete t[a]),!0)}function $u(){let t=jg(),e=!1;try{for(let a=0;a<localStorage.length;a+=1){let l=localStorage.key(a);if(!SS.test(l))continue;let n=Vg(l),i=t[l];n&&(!i||i.progress!==n.progress||i.duration!==n.duration)&&(t[l]={...n,savedAt:Date.now()},e=!0)}Object.entries(t).forEach(([a,l])=>{localStorage.getItem(a)===null&&localStorage.setItem(a,JSON.stringify({duration:l.duration,progress:l.progress}))})}catch(a){console.warn(`[${c}] Failed to sync resume points.`,a)}(wS(t)||e)&&cd(t)}function Gg(){$u(),window.setInterval($u,qf),window.addEventListener("pagehide",$u),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&$u()})}function xS(t){return Vg(t)||jg()[t]||null}function Ru(t){let e=xS(t);if(!e)return null;let a=e.progress/e.duration*100;return a>=Hf&&a<Qi?e:null}function Uu(t){let e=Math.max(1,Math.round((t.duration-t.progress)/6e4));return e<60?`${e}m left`:`${Math.floor(e/60)}h ${e%60}m left`}var vt=Z(ot());function Qg({entry:t,viewMode:e}){let a=t.watched?"watched":"new",l=t.href||Du(t.slug),n=t.addedAt?`Added ${new Date(t.addedAt).toLocaleDateString()}`:"",i=[],o=t.idMovie?Ru(Yg(t.idMovie)):null,u=`/movies/play/${t.slug}`;return n&&i.push(n),(0,vt.jsxs)("article",{className:`${c}-watch-item`,"data-state":a,"data-view":e,children:[(0,vt.jsxs)("div",{className:`${c}-watch-item-poster`,children:[(0,vt.jsx)("a",{className:`${c}-watch-poster-link`,href:l,"aria-label":`Open ${t.title}`,children:t.poster?(0,vt.jsx)("img",{src:t.poster,alt:t.title,loading:"lazy"}):(0,vt.jsx)("div",{className:`${c}-watch-item-poster-placeholder`,children:"MOVIE"})}),(0,vt.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-check-button`,type:"button","aria-label":t.watched?`Mark ${t.title} unwatched`:`Mark ${t.title} watched`,title:t.watched?"Mark unwatched":"Mark watched",onClick:()=>Xg(t.slug),children:"\u2713"}),(0,vt.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-remove-button`,type:"button","aria-label":`Remove ${t.title}`,title:"Remove",onClick:()=>Ei(t.slug),children:"\xD7"}),(0,vt.jsx)("div",{className:`${c}-watch-item-poster-overlay`,children:(0,vt.jsx)("span",{className:`${c}-watch-badge`,"data-state":a,children:t.watched?"Watched":"To watch"})})]}),(0,vt.jsxs)("div",{className:`${c}-watch-item-body`,children:[(0,vt.jsxs)("div",{children:[(0,vt.jsxs)("a",{className:`${c}-watch-item-title`,href:l,children:[t.title,t.year?` (${t.year})`:""]}),i.length?(0,vt.jsx)("p",{className:`${c}-watch-item-copy`,children:i.join(" | ")}):null]}),o||!t.watched?(0,vt.jsxs)("a",{className:`${c}-watch-action`,href:u,children:[(0,vt.jsx)("span",{"aria-hidden":"true",children:"\u25B6"})," ",o?"Continue":"Play",o?(0,vt.jsx)("small",{children:Uu(o)}):null]}):null]})]})}var Ti=Z(ot());function kg(){return(0,Ti.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,Ti.jsx)("path",{d:"M9.2 16.6 4.9 12.3l-1.4 1.4 5.7 5.7L21 7.6l-1.4-1.4L9.2 16.6z"})})}function Zg(){return(0,Ti.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,Ti.jsx)("path",{d:"m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5z"})})}var At=Z(ot());function Kg({entry:t,viewMode:e,isActive:a}){let l=ol(t.slug,t.episode),n=Rt(t.episode),i=t.addedAt?`Queued ${new Date(t.addedAt).toLocaleDateString()}`:"",o=[n];return i&&o.push(i),(0,At.jsxs)("article",{className:`${c}-watch-item`,"data-state":"new","data-view":e,"data-playlist-active":a?"true":"false",children:[(0,At.jsxs)("div",{className:`${c}-watch-item-poster`,children:[(0,At.jsx)("a",{className:`${c}-watch-poster-link`,href:l,"aria-label":`Open ${t.title} ${n}`,onClick:u=>{u.preventDefault(),Si(t.key)},children:t.poster?(0,At.jsx)("img",{src:t.poster,alt:t.title,loading:"lazy"}):(0,At.jsx)("div",{className:`${c}-watch-item-poster-placeholder`,children:"TV"})}),(0,At.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-check-button`,type:"button","aria-label":`Remove ${t.title} ${n} from playlist`,title:"Done",onClick:()=>of(t.key),children:(0,At.jsx)(kg,{})}),(0,At.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-remove-button`,type:"button","aria-label":`Remove ${t.title}`,title:"Remove",onClick:()=>of(t.key),children:(0,At.jsx)(Zg,{})}),(0,At.jsx)("div",{className:`${c}-watch-item-poster-overlay`,children:(0,At.jsx)("span",{className:`${c}-watch-badge`,"data-state":"new",children:a?"Playing":"Queued"})})]}),(0,At.jsx)("div",{className:`${c}-watch-item-body`,children:(0,At.jsxs)("div",{children:[(0,At.jsxs)("a",{className:`${c}-watch-item-title`,href:l,onClick:u=>{u.preventDefault(),Si(t.key)},children:[t.title,t.year?` (${t.year})`:""]}),(0,At.jsx)("p",{className:`${c}-watch-item-copy`,children:o.join(" | ")})]})})]})}var Ra=Z(Ha());async function Jg(t,e){let a=String(e||"").trim();if(a.length<2)return[];let l=await ki(`/api/v1/${t}/do-search/?q=${encodeURIComponent(a)}`);return(l&&Array.isArray(l.result)?l.result:[]).filter(i=>i&&typeof i.slug=="string"&&i.slug).slice(0,Vf).map(i=>({slug:i.slug,idShow:i.id_show||0,idMovie:i.id_movie||0,title:typeof i.title=="string"?i.title:i.slug,year:i.year?String(i.year):"",rating:i.imdb_rating?String(i.imdb_rating):"",poster:ut(i.poster&&(i.poster.w200||i.poster.w100)||"")}))}var te=Z(ot());function Wg({type:t}){let[e,a]=(0,Ra.useState)(""),[l,n]=(0,Ra.useState)([]),[i,o]=(0,Ra.useState)(""),u=(0,Ra.useRef)(0),s=t==="shows";(0,Ra.useEffect)(()=>{n([]),o("");let g=e.trim();if(g.length<2)return;let v=++u.current,m=window.setTimeout(async()=>{o("Searching...");try{let y=await Jg(t,g);v===u.current&&(n(y),o(y.length?"":"No matches."))}catch{v===u.current&&o("Search failed. Try again.")}},Gf);return()=>window.clearTimeout(m)},[e,t]);function p(g){s?_i({...g}):Ai({...g,href:`/movies/view/${g.slug}`})}return(0,te.jsxs)("div",{className:`${c}-search`,children:[(0,te.jsx)("input",{type:"search",value:e,placeholder:s?"Search TV shows to add":"Search movies to add","aria-label":s?"Search TV shows to add":"Search movies to add",onChange:g=>a(g.currentTarget.value),onKeyDown:g=>{g.key==="Escape"&&(g.stopPropagation(),a(""))}}),i?(0,te.jsx)("p",{className:`${c}-search-status`,children:i}):null,l.length?(0,te.jsx)("ul",{className:`${c}-search-results`,children:l.map(g=>{let v=s?!!Ne(g.slug):!!ta(g.slug);return(0,te.jsxs)("li",{children:[g.poster?(0,te.jsx)("img",{src:g.poster,alt:"",loading:"lazy"}):(0,te.jsx)("span",{}),(0,te.jsxs)("div",{children:[(0,te.jsx)("strong",{children:g.title}),(0,te.jsx)("small",{children:[g.year,g.rating?`IMDb ${g.rating}`:""].filter(Boolean).join(" \xB7 ")})]}),(0,te.jsx)("button",{className:`${c}-button`,type:"button",disabled:v,onClick:()=>p(g),children:v?"Added":"Add"})]},g.slug)})}):null]})}var mt=Z(ot());function ES(t,e){let a=t.lastWatched&&Ru(qg(t.lastWatched.idEpisode));if(a)return{href:ol(t.slug,t.lastWatched),label:`Continue ${Rt(t.lastWatched)}`,detail:Uu(a)};let l=e&&e.episodes[0];return l?{href:ol(t.slug,l),label:`Play ${Rt(l)}`,detail:""}:null}function Fg({entry:t,viewMode:e}){let a=sf(t),l=a?a.total:null,n=ES(t,a),i=l!==null?l>0?"new":"watched":t.latestEpisode?Oe(t)?"watched":"new":"pending",o=t.latestEpisode?`Latest ${Rt(t.latestEpisode)}`:"Latest episode not synced yet",u=t.lastWatched?`Watched through ${Rt(t.lastWatched)}`:"Nothing marked watched yet",s=t.lastSyncError?`Sync issue: ${t.lastSyncError}`:"",p=i==="new"?l?`${l>99?"99+":l} unwatched`:"New episode":i==="watched"?"Up to date":"Pending sync",g=Ig(t.slug,t.latestEpisode),v=Oe(t)?"Mark latest unwatched":"Mark latest watched",m=Tg(t.slug,t.latestEpisode),y=m?`${t.title} latest episode is already in your playlist`:`Add ${t.title} latest episode to playlist`,E=t.lastWatched?[o,u]:[o];return s&&E.push(s),(0,mt.jsxs)("article",{className:`${c}-watch-item`,"data-state":i,"data-view":e,children:[(0,mt.jsxs)("div",{className:`${c}-watch-item-poster`,children:[(0,mt.jsx)("a",{className:`${c}-watch-poster-link`,href:g,"aria-label":`Open ${t.title}`,children:t.poster?(0,mt.jsx)("img",{src:t.poster,alt:t.title,loading:"lazy"}):(0,mt.jsx)("div",{className:`${c}-watch-item-poster-placeholder`,children:"TV"})}),(0,mt.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-check-button`,type:"button",disabled:!t.latestEpisode,"aria-label":v,title:v,onClick:()=>Pg(t.slug),children:"\u2713"}),(0,mt.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-playlist-button`,type:"button",disabled:!t.latestEpisode||m,"aria-label":y,title:y,onClick:()=>Ag(t),children:"+"}),(0,mt.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-remove-button`,type:"button","aria-label":`Remove ${t.title}`,title:"Remove",onClick:()=>Mi(t.slug),children:"\xD7"}),(0,mt.jsx)("div",{className:`${c}-watch-item-poster-overlay`,children:(0,mt.jsx)("span",{className:`${c}-watch-badge`,"data-state":i,children:p})})]}),(0,mt.jsxs)("div",{className:`${c}-watch-item-body`,children:[(0,mt.jsxs)("div",{children:[(0,mt.jsxs)("a",{className:`${c}-watch-item-title`,href:g,children:[t.title,t.year?` (${t.year})`:""]}),(0,mt.jsx)("p",{className:`${c}-watch-item-copy`,children:E.join(" | ")})]}),n?(0,mt.jsxs)("a",{className:`${c}-watch-action`,href:n.href,children:[(0,mt.jsx)("span",{"aria-hidden":"true",children:"\u25B6"})," ",n.label,n.detail?(0,mt.jsx)("small",{children:n.detail}):null]}):null]})]})}var M=Z(ot());function ty(){return(0,M.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,M.jsx)("path",{d:"M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"})})}function ey(){return(0,M.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,M.jsx)("path",{d:"M4 6h3v3H4V6zm5 .5h11v2H9v-2zM4 11h3v3H4v-3zm5 .5h11v2H9v-2zM4 16h3v3H4v-3zm5 .5h11v2H9v-2z"})})}function TS(){return(0,M.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,M.jsx)("path",{d:"M17.7 6.3A7.9 7.9 0 0 0 12 4a8 8 0 1 0 7.5 10.7l-1.9-.7A6 6 0 1 1 16.3 7.7L13 11h8V3l-3.3 3.3z"})})}function AS(){return(0,M.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,M.jsx)("path",{d:"M8 5v14l11-7L8 5z"})})}function _S(){return(0,M.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,M.jsx)("path",{d:"M6 6h12v12H6V6z"})})}function ay({id:t,title:e,summary:a,count:l,isOpen:n,onClick:i}){return(0,M.jsxs)("button",{id:`${S}-${t}-fold-button`,className:`${c}-accordion-trigger`,type:"button","aria-expanded":n?"true":"false","aria-controls":`${S}-${t}-fold-panel`,"data-open":n?"true":"false",onClick:i,children:[(0,M.jsxs)("span",{children:[(0,M.jsx)("strong",{children:e}),(0,M.jsx)("small",{children:a})]}),(0,M.jsx)("em",{children:l})]})}function ly(){let[t,e]=(0,Lu.useState)("watchlist"),[a,l]=(0,Lu.useState)("shows"),[n,i]=(0,Lu.useState)("poster"),o=iy(Bu()),u=ny(rf()),s=lf(af()),p=o.filter(r=>r.latestEpisode&&!Oe(r)).length,g=u.filter(r=>!r.watched).length,v=a==="shows",m=t==="watchlist",y=t==="playlist",E=v?o.length?`${o.length} tracked ${o.length===1?"show":"shows"}${p?` | ${p} with a newer latest episode`:""}`:"Add shows from the latest episodes page to start tracking them.":u.length?`${u.length} tracked ${u.length===1?"movie":"movies"}${g?` | ${g} unwatched`:""}`:"Add movies from the movies page or an individual movie page to start tracking them.",_=_g(s),C=n==="list",f=d.playlistSession.active;return(0,M.jsx)("section",{id:`${S}-watchlist-panel`,children:(0,M.jsxs)("div",{className:`${c}-accordion`,children:[(0,M.jsx)(ay,{id:"watchlist",title:"Watchlist",summary:E,count:o.length+u.length,isOpen:m,onClick:()=>e("watchlist")}),m?(0,M.jsxs)("div",{id:`${S}-watchlist-fold-panel`,className:`${c}-accordion-panel`,role:"region","aria-labelledby":`${S}-watchlist-fold-button`,children:[(0,M.jsxs)("div",{id:`${S}-watchlist-toolbar`,children:[(0,M.jsxs)("div",{children:[(0,M.jsx)("h3",{id:`${S}-watchlist-title`,children:"Watchlist"}),(0,M.jsxs)("div",{className:`${c}-tabs`,role:"tablist","aria-label":"Watchlist type",children:[(0,M.jsxs)("button",{className:`${c}-tab`,type:"button",role:"tab","aria-selected":v?"true":"false","data-active":v?"true":"false",onClick:()=>l("shows"),children:["TV Shows",p>0?(0,M.jsx)("span",{children:p}):null]}),(0,M.jsxs)("button",{className:`${c}-tab`,type:"button",role:"tab","aria-selected":v?"false":"true","data-active":v?"false":"true",onClick:()=>l("movies"),children:["Movies",g>0?(0,M.jsx)("span",{children:g}):null]})]})]}),(0,M.jsxs)("div",{className:`${c}-watchlist-toolbar-actions`,children:[(0,M.jsx)("button",{className:`${c}-button ${c}-toolbar-icon-button ${c}-view-toggle`,type:"button","aria-pressed":C?"true":"false","aria-label":C?"Switch to poster view":"Switch to list view",title:C?"Switch to poster view":"Switch to list view",onClick:()=>i(C?"poster":"list"),children:C?(0,M.jsx)(ty,{}):(0,M.jsx)(ey,{})}),v?(0,M.jsx)("button",{id:`${S}-watchlist-refresh`,className:`${c}-button ${c}-toolbar-icon-button`,type:"button",disabled:d.watchlistBusy,"aria-label":"Refresh watchlist",title:"Refresh watchlist",onClick:()=>Pe({force:!0}),children:(0,M.jsx)(TS,{})}):null]})]}),(0,M.jsx)(Wg,{type:v?"shows":"movies"}),v?(0,M.jsx)("div",{id:`${S}-watchlist-status`,"data-tone":d.watchlistMessageTone,children:d.watchlistBusy?d.watchlistMessage||"Refreshing watchlist...":d.watchlistMessage||""}):null,(0,M.jsx)("div",{id:`${S}-watchlist-list`,"data-view":n,children:v&&o.length?o.map(r=>(0,M.jsx)(Fg,{entry:r,viewMode:n},r.slug)):!v&&u.length?u.map(r=>(0,M.jsx)(Qg,{entry:r,viewMode:n},r.slug)):(0,M.jsx)("div",{className:`${c}-watch-empty`,children:v?"On the /shows page or an individual show page, use the watchlist button to add that show here.":"On the /movies page or an individual movie page, use the movie watchlist button to add a movie here."})})]}):null,(0,M.jsx)(ay,{id:"playlist",title:"Playlist",summary:_,count:s.length,isOpen:y,onClick:()=>e("playlist")}),y?(0,M.jsxs)("div",{id:`${S}-playlist-fold-panel`,className:`${c}-accordion-panel`,role:"region","aria-labelledby":`${S}-playlist-fold-button`,children:[(0,M.jsxs)("div",{id:`${S}-playlist-toolbar`,children:[(0,M.jsx)("h3",{id:`${S}-playlist-title`,children:"Playlist"}),(0,M.jsxs)("div",{className:`${c}-watchlist-toolbar-actions`,children:[(0,M.jsx)("button",{className:`${c}-button ${c}-toolbar-icon-button ${c}-playlist-play-button`,type:"button",disabled:!s.length,"aria-label":f?"Stop playlist playback":"Play playlist",title:f?"Stop playlist playback":"Play playlist","data-active":f?"true":"false",onClick:()=>{f?un():Si()},children:f?(0,M.jsx)(_S,{}):(0,M.jsx)(AS,{})}),(0,M.jsx)("button",{className:`${c}-button ${c}-toolbar-icon-button ${c}-view-toggle`,type:"button","aria-pressed":C?"true":"false","aria-label":C?"Switch to poster view":"Switch to list view",title:C?"Switch to poster view":"Switch to list view",onClick:()=>i(C?"poster":"list"),children:C?(0,M.jsx)(ty,{}):(0,M.jsx)(ey,{})})]})]}),(0,M.jsx)("div",{id:`${S}-playlist-list`,"data-view":n,children:s.length?s.map(r=>(0,M.jsx)(Kg,{entry:r,viewMode:n,isActive:d.playlistSession.currentKey===r.key},r.key)):(0,M.jsx)("div",{className:`${c}-watch-empty`,children:"Add a latest show episode from a watchlist poster or list item."})})]}):null]})})}var x=Z(ot());function MS(t){return Array.from(document.querySelectorAll("a, button")).find(e=>Qf(e)?t.test(Xf(e)):!1)}function zS(){let t=MS(/\bsign\s*up\b|\bsignup\b|\bregister\b/i);if(t){let a=t.closest("li");return a&&a.parentElement?{parent:a.parentElement,before:a.nextSibling,sourceItem:a}:{parent:t.parentElement,before:t.nextSibling,sourceItem:null}}let e=document.querySelector("header, nav, .navbar, .main-header, .header");return e?{parent:e,before:null,sourceItem:null}:null}function NS(t){for(let e=t;e&&e!==document.body;e=e.parentElement){let a=getComputedStyle(e).position;if(a==="fixed"||a==="sticky")return!0}return!1}function CS(){let t=zS();if(!t||!t.parent||NS(t.parent))return null;let e=document.getElementById(`${S}-launcher-host`);return e&&e.tagName!=="LI"&&(e.remove(),e=null),e||(e=document.createElement("li"),e.id=`${S}-launcher-host`),t.sourceItem&&e.className!==t.sourceItem.className&&(e.className=t.sourceItem.className),t.before!==e&&(e.parentElement!==t.parent||e.nextSibling!==t.before)&&t.parent.insertBefore(e,t.before),e}function oy(){return(0,x.jsxs)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[(0,x.jsx)("path",{d:"M8 6.5v11l8.5-5.5L8 6.5z"}),(0,x.jsx)("path",{d:"M16.5 4.5a7.5 7.5 0 0 1 3.2 9.4l1.6.7A9.3 9.3 0 0 0 17.2 3l-.7 1.5zM7.5 19.5a7.5 7.5 0 0 1-3.2-9.4l-1.6-.7A9.3 9.3 0 0 0 6.8 21l.7-1.5z"}),(0,x.jsx)("path",{d:"M19.4 15.2 22 15l-1.5 2.2-1.1-2zM4.6 8.8 2 9l1.5-2.2 1.1 2z"})]})}function uy(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M5 10V5h5v2H7v3H5zm9-5h5v5h-2V7h-3V5zM7 14v3h3v2H5v-5h2zm10 0h2v5h-5v-2h3v-3z"})})}function OS(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M3 5h18v14H3V5zm2 2v10h14V7H5zm2 2h4v2H9v2H7V9zm10 6h-4v-2h2v-2h2v4z"})})}function $S(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M4 4h7v7H4V4zm9 0h7v4h-7V4zm0 6h7v10h-7V10zM4 13h7v7H4v-7z"})})}function RS(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M5 6v12l8.5-6L5 6zm9 0v12h2V6h-2zm3 0v12h2V6h-2z"})})}function US(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M4 6v12l7-6-7-6zm7 0v12l7-6-7-6zm8 0h2v12h-2V6z"})})}function cy(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M7.1 14.9a7 7 0 0 1 9.8 0l-1.4 1.4a5 5 0 0 0-7 0l-1.4-1.4zm-3.5-3.5a12 12 0 0 1 16.8 0L19 12.8a10 10 0 0 0-14 0l-1.4-1.4zm7 7a2 2 0 0 1 2.8 0L12 19.8l-1.4-1.4zM8 4h8v2H8V4z"})})}function DS(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M12 2.8 14.3 8l5.7.6-4.3 3.8 1.2 5.6-4.9-2.9L7.1 18l1.2-5.6L4 8.6 9.7 8 12 2.8z"})})}function ry(){let[t,e]=(0,jt.useState)(!1),[a,l]=(0,jt.useState)(null),[n,i]=(0,jt.useState)(()=>window.scrollY>120),[o,u]=(0,jt.useState)(!1),s=(0,jt.useRef)(0),[,p]=(0,jt.useState)(0);(0,jt.useEffect)(()=>P0(()=>p(f=>f+1)),[]),(0,jt.useEffect)(()=>{function f(r){r.key==="Escape"&&e(!1)}return window.addEventListener("keydown",f),()=>window.removeEventListener("keydown",f)},[]),(0,jt.useEffect)(()=>{let f=0;function r(){let b=CS();l(A=>A===b?A:b),f+=1,(b||f>40)&&window.clearInterval(h)}let h=window.setInterval(r,500);return r(),()=>window.clearInterval(h)},[]),(0,jt.useEffect)(()=>{function f(){i(window.scrollY>120)}return f(),window.addEventListener("scroll",f,{passive:!0}),()=>window.removeEventListener("scroll",f)},[]),(0,jt.useEffect)(()=>()=>{window.clearTimeout(s.current)},[]);function g(){e(!0)}function v(){window.clearTimeout(s.current),u(!0)}function m(){window.clearTimeout(s.current),s.current=window.setTimeout(()=>{u(!1)},240)}function y(f){il({...d.settings,[f]:!d.settings[f]})}function E(f,r){il({...d.settings,[f]:r})}let _=n?null:a,C=(0,x.jsxs)("div",{id:`${S}-launcher`,"data-hosted":_?"true":"false","data-scrolled":n?"true":"false","data-quick-open":o?"true":"false",onMouseEnter:v,onMouseLeave:m,onFocus:v,onBlur:f=>{f.currentTarget.contains(f.relatedTarget)||m()},children:[(0,x.jsxs)("button",{id:`${S}-button`,type:"button","aria-label":"Open LookMovie2 Enhancer","aria-haspopup":"dialog","aria-expanded":t?"true":"false",title:"Open enhancer",onClick:()=>t?e(!1):g(),children:[(0,x.jsx)("span",{id:`${S}-button-icon`,children:(0,x.jsx)(DS,{})}),(0,x.jsx)("span",{id:`${S}-button-label`,children:"Enhancer"})]}),(0,x.jsxs)("div",{id:`${S}-quick-settings`,role:"toolbar","aria-label":"Quick playback settings",children:[(0,x.jsx)("button",{className:`${c}-quick-setting`,type:"button","aria-label":"Toggle auto play",title:"Toggle auto play","data-enabled":d.settings.autoPlay?"true":"false",onClick:f=>{f.stopPropagation(),y("autoPlay")},children:(0,x.jsx)(oy,{})}),(0,x.jsx)("button",{className:`${c}-quick-setting`,type:"button","aria-label":"Toggle auto fullscreen",title:"Toggle auto fullscreen","data-enabled":d.settings.autoFullscreen?"true":"false",onClick:f=>{f.stopPropagation(),y("autoFullscreen")},children:(0,x.jsx)(uy,{})}),(0,x.jsx)("button",{className:`${c}-quick-setting`,type:"button","aria-label":"Toggle ntfy remote",title:"Toggle ntfy remote","data-enabled":d.settings.ntfyRemoteEnabled?"true":"false",onClick:f=>{f.stopPropagation(),y("ntfyRemoteEnabled")},children:(0,x.jsx)(cy,{})})]})]});return(0,x.jsxs)(x.Fragment,{children:[_?(0,sy.createPortal)(C,_):C,(0,x.jsx)("div",{id:`${S}-overlay`,"aria-hidden":t?"false":"true",className:t?`${c}-open`:"",onClick:f=>{f.target===f.currentTarget&&e(!1)},children:(0,x.jsxs)("div",{id:`${S}-modal`,role:"dialog","aria-modal":"true","aria-labelledby":`${S}-title`,children:[(0,x.jsxs)("div",{id:`${S}-header`,children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("h2",{id:`${S}-title`,children:"LookMovie2 Enhancer"}),(0,x.jsx)("p",{id:`${S}-subtitle`,children:"Playback helpers plus a personal show watchlist with latest episode tracking."})]}),(0,x.jsx)("button",{id:`${S}-close`,type:"button","aria-label":"Close settings",onClick:()=>e(!1),children:"\xD7"})]}),(0,x.jsxs)("div",{id:`${S}-content`,children:[(0,x.jsxs)("section",{id:`${S}-settings-panel`,children:[(0,x.jsx)("h3",{id:`${S}-settings-title`,children:"Playback Tools"}),(0,x.jsxs)("div",{id:`${S}-settings`,children:[(0,x.jsx)($a,{settingKey:"autoPlay",title:"Auto play",copy:"Clicks the resume or start button when the playback modal appears.",icon:(0,x.jsx)(oy,{})}),(0,x.jsx)($a,{settingKey:"autoFullscreen",title:"Auto fullscreen",copy:"Clicks the player's fullscreen button after playback starts.",icon:(0,x.jsx)(uy,{})}),(0,x.jsx)($a,{settingKey:"windowedFullscreen",title:"Windowed fullscreen",copy:"Stretches the player over the page when the browser blocks real fullscreen, e.g. after auto play or a remote command.",icon:(0,x.jsx)(OS,{})}),(0,x.jsx)($a,{settingKey:"siteTheme",title:"Site UI polish",copy:"Wider layout, responsive poster grids, a calmer background and no premium upsell links.",icon:(0,x.jsx)($S,{})}),(0,x.jsx)($a,{settingKey:"autoNextEpisode",title:"Auto next episode",copy:"Counts down and plays the next episode when one ends, outside playlist mode.",icon:(0,x.jsx)(RS,{})}),(0,x.jsx)($a,{settingKey:"autoSkipIntro",title:"Auto skip intros",copy:"Jumps past an intro you marked for that show. Off shows a Skip intro button instead.",icon:(0,x.jsx)(US,{})}),(0,x.jsx)($a,{settingKey:"ntfyRemoteEnabled",title:"Android remote",copy:"Publishes a player notification to ntfy with Android action buttons.",icon:(0,x.jsx)(cy,{})}),(0,x.jsxs)("div",{className:`${c}-setting ${c}-setting-stack`,children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("p",{className:`${c}-setting-title`,children:"ntfy topics"}),(0,x.jsx)("p",{className:`${c}-setting-copy`,children:"The phone subscribes to the display topic; the browser listens on the control topic. Use only letters, numbers, hyphens, and underscores."})]}),(0,x.jsxs)("label",{className:`${c}-field`,children:[(0,x.jsx)("span",{children:"Server"}),(0,x.jsx)("input",{type:"url",value:d.settings.ntfyServer,placeholder:"https://ntfy.sh",onChange:f=>E("ntfyServer",f.currentTarget.value)})]}),(0,x.jsxs)("label",{className:`${c}-field`,children:[(0,x.jsx)("span",{children:"Display topic"}),(0,x.jsx)("input",{type:"text",value:d.settings.ntfyTopic,maxLength:64,pattern:"[A-Za-z0-9_-]{1,64}",placeholder:"random-private-topic",onChange:f=>E("ntfyTopic",f.currentTarget.value)})]}),(0,x.jsxs)("label",{className:`${c}-field`,children:[(0,x.jsx)("span",{children:"Control topic"}),(0,x.jsx)("input",{type:"text",value:d.settings.ntfyControlTopic,maxLength:64,pattern:"[A-Za-z0-9_-]{1,64}",placeholder:"display-topic-controls",onChange:f=>E("ntfyControlTopic",f.currentTarget.value)})]}),(0,x.jsxs)("label",{className:`${c}-field`,children:[(0,x.jsx)("span",{children:"Command secret"}),(0,x.jsx)("input",{type:"password",value:d.settings.ntfyCommandSecret,placeholder:"optional shared command prefix",onChange:f=>E("ntfyCommandSecret",f.currentTarget.value)})]}),(0,x.jsx)("p",{className:`${c}-ntfy-status`,"data-status":d.ntfyRemoteStatus,children:d.ntfyRemoteMessage||`Remote status: ${d.ntfyRemoteStatus}`})]}),(0,x.jsx)(Hg,{})]}),(0,x.jsx)("div",{id:`${S}-footer`,children:"Settings and watchlist data are saved in Tampermonkey storage on this browser."})]}),(0,x.jsx)(ly,{})]})]})})]})}var dy=Z(ot()),ff=null;function LS(){if(!document.head||document.getElementById(Fu))return;let t=document.createElement("style");t.id=Fu,t.textContent=tg(),document.head.appendChild(t)}function df(){if(LS(),!document.body)return;let t=document.getElementById(S);t||(t=document.createElement("div"),t.id=S,document.body.appendChild(t)),ff||(ff=(0,fy.createRoot)(t),ff.render((0,dy.jsx)(ry,{})))}function Oa(){ln()}function $t(){ln()}function xg(){ln()}var zi=null;function rf(){return Object.values(d.movieWatchlistStore.movies)}function ta(t){return t&&d.movieWatchlistStore.movies[t]||null}function ny(t){return[...t].sort((e,a)=>e.watched!==a.watched?e.watched?1:-1:e.title.localeCompare(a.title))}function cn(){ad(d.movieWatchlistStore),$t(),Oa(),Ni(),Ci()}function BS(t){return!(!t||typeof t.poster!="string"||!t.poster.trim()||t.poster.trim().startsWith("data:image/"))}function HS(t){let e=t.match(/(?:var\s+|window\.)movie_storage\s*=\s*(\{[\s\S]*?\})\s*;/);if(!e)return{};try{return JSON.parse(e[1])}catch(a){return console.warn(`[${c}] Failed to parse movie_storage metadata.`,a),{}}}async function py(t,e){let a=await Xi(`/movies/view/${t}`),l=HS(a),n=a.match(/id_movie:\s*(\d+)/),i=a.match(/title:\s*'((?:\\'|[^'])*)'/),o=a.match(/year:\s*'((?:\\'|[^'])*)'/),u=a.match(/poster_medium:\s*'((?:\\'|[^'])*)'/),s=typeof l.movie_poster=="string"&&l.movie_poster?l.movie_poster:typeof l.poster_medium=="string"&&l.poster_medium?l.poster_medium:typeof l.poster=="string"?l.poster:"";return{slug:t,idMovie:typeof l.id_movie=="number"?l.id_movie:n?parseInt(n[1],10):0,title:typeof l.title=="string"&&l.title.trim()?l.title.trim():i?we(i[1]).trim():e&&e.title?e.title:t,year:typeof l.year=="string"||typeof l.year=="number"?String(l.year):o?we(o[1]).trim():e&&e.year?e.year:"",poster:ut(s)||(u?ut(we(u[1])):"")||(e&&e.poster?ut(e.poster):"")}}async function wi(){if(zi)return zi;let t=rf().filter(e=>!BS(e)||!e.idMovie);return t.length?(zi=(async()=>{let e=!1;for(let a of t)try{let l=await py(a.slug,a);l.idMovie&&l.idMovie!==a.idMovie&&(a.idMovie=l.idMovie,e=!0),l.title&&l.title!==a.title&&(a.title=l.title,e=!0),l.year&&l.year!==a.year&&(a.year=l.year,e=!0),l.poster&&l.poster!==a.poster&&(a.poster=l.poster,e=!0)}catch(l){console.warn(`[${c}] Failed to refresh movie metadata for ${a.slug}.`,l)}e&&cn()})().finally(()=>{zi=null}),zi):Promise.resolve()}function Ai(t){if(!t||!t.slug)return;let e={slug:t.slug,title:t.title||t.slug,year:t.year||"",poster:t.poster||"",idMovie:t.idMovie||0};py(t.slug,t).then(a=>{a.title&&(e.title=a.title),a.year&&(e.year=a.year),a.poster&&(e.poster=a.poster),a.idMovie&&(e.idMovie=a.idMovie),d.movieWatchlistStore.movies[t.slug]=dn(t.slug,{slug:t.slug,title:e.title,year:e.year,poster:e.poster,idMovie:e.idMovie,href:t.href||`/movies/view/${t.slug}`,addedAt:Date.now(),watched:!1}),cn(),$t()})}function Ei(t){ta(t)&&(delete d.movieWatchlistStore.movies[t],cn())}function Xg(t){let e=ta(t);e&&(e.watched=!e.watched,e.watchedAt=e.watched?Date.now():void 0,cn())}function my(t){try{let a=new URL(t,location.origin).pathname.match(/\/shows\/view\/([^/?#]+)/i);return a?a[1]:""}catch{return""}}function qS(t){try{let e=new URL(t,location.origin),a=et(e.searchParams.get("season")),l=et(e.searchParams.get("episode")),n=et(e.searchParams.get("id_episode"));return!a||!l||!n?null:{season:a,episode:l,idEpisode:n}}catch{return null}}function Hu(t){let e=typeof t=="string"?t.match(/-(\d{4})$/):null;return e?e[1]:""}function hy(t){try{let a=new URL(t,location.origin).pathname.match(/\/movies\/view\/([^/?#]+)/i);return a?a[1]:""}catch{return""}}function Oi(t){if(!t)return null;let e=t.querySelector('a[href*="/shows/view/"]');if(!e)return null;let a=my(e.getAttribute("href"));if(!a)return null;let l=t.querySelector(".mv-item-infor h6"),n=t.querySelector("img[data-src], img[src]"),i=qS(e.getAttribute("href"));return{slug:a,title:l?l.textContent.trim():a,year:Hu(a),poster:aa(n),href:new URL(e.getAttribute("href"),location.origin).href,episode:i}}function Ig(t,e){return t?e?`/shows/view/${t}?season=${e.season}&episode=${e.episode}&id_episode=${e.idEpisode}`:`/shows/view/${t}`:"/shows"}function ol(t,e){return t?e?`/shows/play/${t}#S${e.season}-E${e.episode}-${e.idEpisode}`:`/shows/view/${t}`:"/shows"}function Du(t){return t?`/movies/view/${t}`:"/movies"}function $i(){return location.pathname==="/shows"}function gy(){return location.pathname.startsWith("/shows/view/")}function ef(){return location.pathname.startsWith("/movies/play/")}function yy(){return location.pathname.startsWith("/movies/view/")}function YS(){if(!gy())return null;let t=window.show_storage||{},e=typeof t.slug=="string"&&t.slug?t.slug:my(location.href);if(!e)return null;let a=document.querySelector(".movie-single-ct h1")||document.querySelector(".movie-single-ct h2")||document.querySelector(".internal-page-container h1")||document.querySelector(".internal-page-container h2"),l=document.querySelector('.movie__poster[style*="background-image"]')||document.querySelector(".movie__poster[data-background-image]")||document.querySelector(".movie-single-ct img[data-src], .movie-single-ct img[src]")||document.querySelector(".internal-page-container img[data-src], .internal-page-container img[src]"),n=document.querySelector('meta[property="og:image"]'),i=new URLSearchParams(location.search),o=Mt({season:i.get("season"),episode:i.get("episode"),idEpisode:i.get("id_episode")});return{slug:e,title:typeof t.title=="string"&&t.title.trim()?t.title.trim():a?a.textContent.replace(/\s*\d{4}\s*$/,"").trim():e,year:typeof t.year=="string"||typeof t.year=="number"?String(t.year):Hu(e),poster:typeof t.poster_medium=="string"&&t.poster_medium?t.poster_medium:aa(l)||n?.getAttribute("content")||"",idShow:et(t.id_show),episode:o}}function jS(t){if(!t)return null;let e=t.querySelector('a[href*="/movies/view/"]');if(!e)return null;let a=hy(e.getAttribute("href"));if(!a)return null;let l=t.querySelector(".slide-item__title, .mv-item-infor h6, h6, h5, .title"),n=t.querySelector("img[data-src-portrait], img[data-src], img[src]"),i=t.querySelector('[data-background-image], [style*="background-image"], [data-src-portrait], [data-src]'),o=t.querySelector(".year"),u=l?l.textContent.trim():"",s=u.match(/\((\d{4})\)/),p=aa(n)||aa(i);return{slug:a,title:u?u.replace(/\s*\(\d{4}\)\s*$/,"").trim():a,year:o?o.textContent.trim():s?.[1]||Hu(a),poster:p,href:new URL(e.getAttribute("href"),location.origin).href}}function VS(){if(!yy())return null;let t=hy(location.href);if(!t)return null;let e=window.movie_storage||window.movie||{},a=document.querySelector(".movie-single-ct h1")||document.querySelector(".movie-single-ct h2")||document.querySelector(".internal-page-container h1")||document.querySelector(".internal-page-container h2"),l=document.querySelector('.movie__poster[data-background-image], .movie__poster[style*="background-image"], .movie-single-ct img[data-src], .movie-single-ct img[src], .internal-page-container img[data-src], .internal-page-container img[src]'),n=document.querySelector('meta[property="og:image"]');return{slug:t,title:typeof e.title=="string"&&e.title.trim()?e.title.trim():a?a.textContent.trim():t,year:typeof e.year=="string"||typeof e.year=="number"?String(e.year):Hu(t),poster:ut(typeof e.movie_poster=="string"&&e.movie_poster?e.movie_poster:typeof e.poster_medium=="string"&&e.poster_medium?e.poster_medium:"")||aa(l)||ut(n?.getAttribute("content")||""),href:location.href}}function pf(t){let e=t.dataset.watchlistSlug||"",a=Ne(e),l=Mt({season:t.dataset.season,episode:t.dataset.episode,idEpisode:t.dataset.idEpisode}),n="add",i="+ Watch",o="Add this show to your watchlist";if(a){let u=l&&(!a.lastWatched||Ce(l,a.lastWatched)>0);n=u?"watching-new":"watching",i="Watching",o=u?"This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.":"This show is already in your watchlist. Click to remove it."}t.dataset.state!==n&&(t.dataset.state=n),t.textContent!==i&&(t.textContent=i),t.title!==o&&(t.title=o),t.disabled&&(t.disabled=!1)}function Ua(){document.querySelectorAll(`.${c}-episode-watch-button`).forEach(pf)}function mf(t){let e=t.dataset.watchlistSlug||"",a=Ne(e),l=Mt({season:t.dataset.season,episode:t.dataset.episode,idEpisode:t.dataset.idEpisode});if(!a){t.dataset.state="add",t.textContent="+ Add To Watchlist",t.title="Add this show to your watchlist",t.disabled=!1;return}let n=l&&(!a.lastWatched||Ce(l,a.lastWatched)>0);t.dataset.state=n?"watching-new":"watching",t.textContent=n?"Watching: New Episode":"Watching",t.title=n?"This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.":"This show is already in your watchlist. Click to remove it.",t.disabled=!1}function Ri(){document.querySelectorAll(`.${c}-show-view-watch-button`).forEach(mf)}function hf(t){let e=t.dataset.watchlistSlug||"",a=ta(e);if(!a){t.dataset.state="add",t.textContent="+ Movie",t.title="Add this movie to your watchlist",t.disabled=!1;return}t.dataset.state=a.watched?"watching":"watching-new",t.textContent=a.watched?"Watched":"Movie List",t.title=a.watched?"This movie is marked watched. Click to remove it from your movie watchlist.":"This movie is in your movie watchlist. Click to remove it.",t.disabled=!1}function Ni(){document.querySelectorAll(`.${c}-movie-watch-button`).forEach(hf)}function gf(t){let e=t.dataset.watchlistSlug||"",a=ta(e);if(!a){t.dataset.state="add",t.textContent="+ Add Movie To Watchlist",t.title="Add this movie to your watchlist",t.disabled=!1;return}t.dataset.state=a.watched?"watching":"watching-new",t.textContent=a.watched?"Movie Watched":"In Movie Watchlist",t.title=a.watched?"This movie is marked watched. Click to remove it from your movie watchlist.":"This movie is in your movie watchlist. Click to remove it.",t.disabled=!1}function Ci(){document.querySelectorAll(`.${c}-movie-view-watch-button`).forEach(gf)}function vy(t,e="auto"){return!t||!t.slug||!t.episode?null:{slug:t.slug,title:t.title||t.slug,href:t.href||"",episode:t.episode,seenAt:Date.now(),source:e}}function by(t,e){return!!t&&!!e&&t.slug===e.slug&&ec(t.episode,e.episode)}function yf(t){return Array.from(document.querySelectorAll(".episode-item")).indexOf(t)}function vf(){if(!document.body||!$i())return;document.querySelectorAll(`.episode-item.${c}-shows-list-marker`).forEach(e=>{e.classList.remove(`${c}-shows-list-marker`),e.removeAttribute("data-lookmovie-list-marker")}),d.showsListProgressOrder=-1;let t=d.showsListProgress;t&&document.querySelectorAll(".episode-item").forEach(e=>{let a=Oi(e);by(a,t)&&(e.classList.add(`${c}-shows-list-marker`),e.dataset.lookmovieListMarker="true",d.showsListProgressOrder=yf(e))})}function Sy(t){let e=Oi(t.closest(".episode-item")),a=by(e,d.showsListProgress),l=a?"current":"set",n=a?"Bookmarked":"Set bookmark",i=a?"This is the current shows-page bookmark.":"Set the yellow shows-page bookmark here.";t.dataset.state!==l&&(t.dataset.state=l),t.textContent!==n&&(t.textContent=n),t.title!==i&&(t.title=i)}function GS(){document.querySelectorAll(`.${c}-shows-list-marker-button`).forEach(Sy)}function QS(t){let e=vy(Oi(t),"manual");e&&(d.showsListProgress=e,d.showsListProgressOrder=yf(t),d.showsListSeenCandidate=null,d.showsListSeenCandidateOrder=-1,d.showsListManualMarkerSet=!0,nc(e),vf(),GS())}function XS(){if(d.showsListManualMarkerSet||d.showsListProgress?.source==="manual")return;let t=Zi(d.showsListSeenCandidate);t&&(d.showsListProgress&&!d.showsListSessionTouched&&(d.showsListProgressOrder<0||d.showsListSeenCandidateOrder<d.showsListProgressOrder)||(d.showsListProgress=t,nc(t),vf()))}function qu(t){t&&t.persist&&XS(),d.showsListObserver&&d.showsListObserver.disconnect(),d.showsListMutationObserver&&d.showsListMutationObserver.disconnect(),d.showsListObserver=null,d.showsListMutationObserver=null,d.showsListRefreshScheduled=!1,d.showsListObservedCards=new WeakSet,d.showsListSeenCandidate=null,d.showsListSeenCandidateOrder=-1,d.showsListSessionTouched=!1,d.showsListManualMarkerSet=!1}function kS(t){let e=Oi(t),a=vy(e);if(!a)return;let l=yf(t);l<d.showsListSeenCandidateOrder||(d.showsListSeenCandidate=a,d.showsListSeenCandidateOrder=l)}function wy(){!document.body||!$i()||!d.showsListObserver||(vf(),document.querySelectorAll(".episode-item").forEach(t=>{d.showsListObservedCards.has(t)||(d.showsListObservedCards.add(t),d.showsListObserver.observe(t))}))}function ZS(){d.showsListRefreshScheduled||(d.showsListRefreshScheduled=!0,window.setTimeout(()=>{d.showsListRefreshScheduled=!1,wy()},150))}function Yu(){!document.body||!$i()||typeof IntersectionObserver!="function"||(d.showsListObserver||(d.showsListObserver=new IntersectionObserver(t=>{t.filter(e=>e.isIntersecting).forEach(e=>kS(e.target))},{threshold:.55})),d.showsListMutationObserver||(d.showsListMutationObserver=new MutationObserver(()=>{ZS()}),d.showsListMutationObserver.observe(document.body,{childList:!0,subtree:!0})),wy())}function xy(){$i()&&(d.showsListSessionTouched=!0)}function bf(){!document.body||!$i()||document.querySelectorAll(".episode-item").forEach(t=>{let e=Oi(t);if(!e)return;let a=t.querySelector(`.${c}-episode-watch-button`);a||(a=document.createElement("button"),a.type="button",a.className=`${c}-episode-watch-button`,t.appendChild(a),a.addEventListener("click",async n=>{n.preventDefault(),n.stopPropagation();let i=a.dataset.watchlistSlug;if(i){if(Ne(i)){Mi(i);return}a.dataset.state="adding",a.textContent="Adding...",a.disabled=!0,await _i({slug:i,title:a.dataset.title||i,year:a.dataset.year||"",poster:a.dataset.poster||"",episode:Mt({season:a.dataset.season,episode:a.dataset.episode,idEpisode:a.dataset.idEpisode})}),pf(a)}})),a.dataset.watchlistSlug=e.slug,a.dataset.title=e.title,a.dataset.year=e.year,a.dataset.poster=e.poster,e.episode&&(a.dataset.season=String(e.episode.season),a.dataset.episode=String(e.episode.episode),a.dataset.idEpisode=String(e.episode.idEpisode)),pf(a);let l=t.querySelector(`.${c}-shows-list-marker-button`);l||(l=document.createElement("button"),l.type="button",l.className=`${c}-shows-list-marker-button`,t.appendChild(l),l.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),QS(t)})),Sy(l)})}function Sf(){if(!document.body||!gy())return;let t=YS();if(!t)return;let e=document.querySelector(".watch-heading")||document.querySelector(".movie-single-ct.main-content")||document.querySelector(".internal-page-container");if(!e)return;let a=document.querySelector(`.${c}-show-view-watch-wrap`);a||(a=document.createElement("div"),a.className=`${c}-show-view-watch-wrap`,e.appendChild(a));let l=a.querySelector(`.${c}-show-view-watch-button`);l||(l=document.createElement("button"),l.type="button",l.className=`${c}-show-view-watch-button`,a.appendChild(l),l.addEventListener("click",async()=>{let n=l.dataset.watchlistSlug;if(n){if(Ne(n)){Mi(n);return}l.dataset.state="adding",l.textContent="Adding...",l.disabled=!0,await _i({slug:n,title:l.dataset.title||n,year:l.dataset.year||"",poster:l.dataset.poster||"",episode:Mt({season:l.dataset.season,episode:l.dataset.episode,idEpisode:l.dataset.idEpisode})}),mf(l)}})),l.dataset.watchlistSlug=t.slug,l.dataset.title=t.title,l.dataset.year=t.year,l.dataset.poster=t.poster,t.episode?(l.dataset.season=String(t.episode.season),l.dataset.episode=String(t.episode.episode),l.dataset.idEpisode=String(t.episode.idEpisode)):(delete l.dataset.season,delete l.dataset.episode,delete l.dataset.idEpisode),mf(l)}function wf(){!document.body||ef()||document.querySelectorAll('a[href*="/movies/view/"]').forEach(t=>{let e=t.closest(".slide-item")||t.closest(".movie-item")||t.closest(".mv-item")||t.closest(".movie-item-style-2")||t.closest(".slide-item__backdrop--wrapper")||t.closest(".item")||t.parentElement,a=jS(e);if(!a||!e)return;let l=e.querySelector(".slide-item__buttons")||e.querySelector(".image__placeholder")||e,n=l.querySelector(`.${c}-movie-watch-button`);n||(n=document.createElement("button"),n.type="button",n.className=`${c}-movie-watch-button ${c}-episode-watch-button`,l.appendChild(n),getComputedStyle(l).position==="static"&&(l.style.position="relative"),n.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation();let o=n.dataset.watchlistSlug;if(o){if(ta(o)){Ei(o);return}Ai({slug:o,title:n.dataset.title||o,year:n.dataset.year||"",poster:n.dataset.poster||"",href:n.dataset.href||Du(o)}),hf(n)}})),n.dataset.watchlistSlug=a.slug,n.dataset.title=a.title,n.dataset.year=a.year,n.dataset.poster=a.poster,n.dataset.href=a.href,hf(n)})}function xf(){if(!document.body||!yy())return;let t=VS();if(!t)return;let e=document.querySelector(".watch-heading")||document.querySelector(".movie-single-ct.main-content")||document.querySelector(".internal-page-container");if(!e)return;let a=document.querySelector(`.${c}-movie-view-watch-wrap`);a||(a=document.createElement("div"),a.className=`${c}-show-view-watch-wrap ${c}-movie-view-watch-wrap`,e.appendChild(a));let l=a.querySelector(`.${c}-movie-view-watch-button`);l||(l=document.createElement("button"),l.type="button",l.className=`${c}-show-view-watch-button ${c}-movie-view-watch-button`,a.appendChild(l),l.addEventListener("click",()=>{let n=l.dataset.watchlistSlug;if(n){if(ta(n)){Ei(n);return}Ai({slug:n,title:l.dataset.title||n,year:l.dataset.year||"",poster:l.dataset.poster||"",href:l.dataset.href||Du(n)}),gf(l)}})),l.dataset.watchlistSlug=t.slug,l.dataset.title=t.title,l.dataset.year=t.year,l.dataset.poster=t.poster,l.dataset.href=t.href,gf(l)}function Bu(){return Object.values(d.watchlistStore.shows)}function Ne(t){return t&&d.watchlistStore.shows[t]||null}function KS(t){return t&&Bu().find(e=>e.idShow===t)||null}function iy(t){return[...t].sort((e,a)=>{let l=e.latestEpisode?Oe(e)?1:0:2,n=a.latestEpisode?Oe(a)?1:0:2;return l!==n?l-n:e.title.localeCompare(a.title)})}function JS(t,e){return t?!t.idShow||!t.latestEpisode||!t.upcoming?!0:!t.lastSyncedAt||e-t.lastSyncedAt>=Lf:!1}function ul(){ed(d.watchlistStore),$t(),Oa(),Ua(),Ri()}function Pt(t,e){d.watchlistMessage=t||"",d.watchlistMessageTone=e||"muted",$t()}async function Ey(t,e){let a=await Xi(`/shows/view/${t}`),l=a.match(/id_show:\s*(\d+)/),n=a.match(/title:\s*'((?:\\'|[^'])*)'/),i=a.match(/year:\s*'((?:\\'|[^'])*)'/),o=a.match(/poster_medium:\s*'((?:\\'|[^'])*)'/);return{slug:t,idShow:l?et(l[1]):0,title:n?we(n[1]).trim():e&&e.title?e.title:t,year:i?we(i[1]).trim():e&&e.year?e.year:"",poster:o?we(o[1]).trim():e&&e.poster?e.poster:""}}async function Ty(t){let e=await ki(`/api/v2/download/episode/list?id=${t}`),a=[];Object.entries(e&&e.list||{}).forEach(([i,o])=>{Object.entries(o||{}).forEach(([u,s])=>{let p=Mt({season:i,episode:u,idEpisode:s&&s.id_episode});p&&a.push(p)})}),a.sort(Ce);let l=e&&e.latest?e.latest:null,n=Mt({season:l&&l.season,episode:l&&l.episode,idEpisode:l&&l.id_episode});return n&&(n.updatedAt=Date.now()),{latestEpisode:n,episodes:a}}function WS(t,e){let a=e?t.findIndex(n=>Ce(n,e)>0):0,l=a<0?[]:t.slice(a);return{afterIdEpisode:e?e.idEpisode:0,total:l.length,episodes:l.slice(0,Yf).map(({season:n,episode:i,idEpisode:o})=>({season:n,episode:i,idEpisode:o}))}}function sf(t){let e=t&&t.upcoming;if(!e)return null;let a=t.lastWatched?t.lastWatched.idEpisode:0;if(e.afterIdEpisode===a)return e;if(!t.lastWatched)return null;let l=e.episodes.findIndex(n=>Ce(n,t.lastWatched)>0);return l<0?e.episodes.length===e.total?{afterIdEpisode:a,total:0,episodes:[]}:null:l===0?null:{afterIdEpisode:a,total:e.total-l,episodes:e.episodes.slice(l)}}function Ay(t){t.upcoming&&!sf(t)&&Pe({force:!0,slugs:[t.slug]})}async function _i(t){if(!t||!t.slug)return;let e=Ne(t.slug);if(e){Pt(`${e.title} is already in your watchlist.`,"muted"),Ua();return}Pt(`Adding ${t.title||t.slug}...`,"muted");let a={slug:t.slug,idShow:0,title:t.title||t.slug,year:t.year||"",poster:t.poster||""};try{a=await Ey(t.slug,t)}catch(l){console.warn(`[${c}] Failed to resolve show metadata for ${t.slug}.`,l)}d.watchlistStore.shows[t.slug]=fn(t.slug,{slug:t.slug,idShow:a.idShow,title:a.title||t.title||t.slug,year:a.year||t.year||"",poster:a.poster||t.poster||"",addedAt:Date.now(),latestEpisode:t.episode||null,lastSyncedAt:0}),ul(),Pt(`${a.title||t.title||t.slug} added to your watchlist.`,"success"),await Pe({force:!0,slugs:[t.slug]})}function Mi(t){let e=Ne(t);e&&(delete d.watchlistStore.shows[t],ul(),Pt(`${e.title} removed from your watchlist.`,"muted"))}function Pg(t){let e=Ne(t);!e||!e.latestEpisode||(Oe(e)?(e.lastWatched=null,Pt(`${e.title} marked as having an unwatched latest episode.`,"muted")):(e.lastWatched={...e.latestEpisode,watchedAt:Date.now()},Pt(`${e.title} marked watched through ${Rt(e.latestEpisode)}.`,"success")),ul(),Ay(e))}async function Pe(t){let e=!!(t&&t.force),a=t&&Array.isArray(t.slugs)?new Set(t.slugs):null;if(d.watchlistRefreshPromise)return d.watchlistRefreshPromise;let l=Date.now(),n=Bu().filter(i=>a&&!a.has(i.slug)?!1:e||JS(i,l));return n.length?(d.watchlistBusy=!0,Pt(`Refreshing ${n.length} watchlist ${n.length===1?"show":"shows"}...`,"muted"),d.watchlistRefreshPromise=(async()=>{for(let i of n)try{if(!i.idShow){let s=await Ey(i.slug,i);i.idShow=s.idShow,i.title=s.title||i.title,i.year=s.year||i.year,i.poster=s.poster||i.poster}if(!i.idShow)throw new Error("Unable to resolve show id.");let{latestEpisode:o,episodes:u}=await Ty(i.idShow);i.latestEpisode=o,i.upcoming=WS(u,i.lastWatched),i.lastSyncError="",i.lastSyncedAt=Date.now()}catch(o){i.lastSyncError=o instanceof Error?o.message:String(o),i.lastSyncedAt=Date.now(),console.warn(`[${c}] Failed to refresh ${i.slug}.`,o)}ul(),Pt("Watchlist refreshed.","success")})().catch(i=>{console.warn(`[${c}] Watchlist refresh failed.`,i),Pt("Watchlist refresh failed.","danger")}).finally(()=>{d.watchlistBusy=!1,$t(),Ua(),d.watchlistRefreshPromise=null}),d.watchlistRefreshPromise):($t(),Ua(),Promise.resolve())}function _y(){let t=et(window.id_show);if(t)return t;let e=Array.from(document.scripts).find(l=>/id_show:\s*\d+/.test(l.textContent||"")),a=e?e.textContent.match(/id_show:\s*(\d+)/):null;return a?et(a[1]):0}function FS(){if(!location.pathname.startsWith("/shows/play/"))return null;let t=location.hash.match(/^#S(\d+)-E(\d+)-(\d+)$/i);if(!t)return null;let e=_y(),a=et(t[1]),l=et(t[2]),n=et(t[3]);return!e||!a||!l||!n?null:{idShow:e,season:a,episode:l,idEpisode:n}}function My(){let t=FS();if(!t)return;let e=`${t.idShow}:${t.idEpisode}`;if(e===d.lastTrackedEpisodeSignature)return;let a=KS(t.idShow);a&&(a.lastWatched={season:t.season,episode:t.episode,idEpisode:t.idEpisode,watchedAt:Date.now()},(!a.latestEpisode||Ce(a.lastWatched,a.latestEpisode)>0)&&(a.latestEpisode={season:t.season,episode:t.episode,idEpisode:t.idEpisode,updatedAt:Date.now()}),d.lastTrackedEpisodeSignature=e,ul(),Ay(a),Pt(`${a.title} updated to watched through ${Rt(a.lastWatched)}.`,"success"))}function IS(){let t=location.hash.match(/^#S(\d+)-E(\d+)-(\d+)$/i);return t?{season:Number(t[1]),episode:Number(t[2]),idEpisode:Number(t[3])}:null}async function ju(){let t=_y(),e=IS();if(!t||!e)return null;let{episodes:a}=await Ty(t);return a.find(l=>Ce(l,e)>0)||null}var Vu=`${c}-autonext`,Ef=0,sn=null;function rn(){window.clearInterval(Ef),Ef=0,sn&&(sn.remove(),sn=null)}function zy(t){rn(),Nu(t)}function PS(t){let e=document.createElement("div");e.className=Vu,e.setAttribute("role","status");let a=document.createElement("p");a.append("Up next: ");let l=document.createElement("strong");l.textContent=Rt(t),a.append(l," in ");let n=document.createElement("span");n.className=`${Vu}-seconds`,a.append(n,"s");let i=document.createElement("button");i.type="button",i.className=`${Vu}-play`,i.textContent="Play now",i.addEventListener("click",u=>{u.stopPropagation(),zy(t)});let o=document.createElement("button");return o.type="button",o.textContent="Cancel",o.addEventListener("click",u=>{u.stopPropagation(),rn()}),e.append(a,i,o),e}async function Ny(){if(!d.settings.autoNextEpisode||!location.pathname.startsWith("/shows/play/"))return!1;let t=location.hash,e=null;try{e=await ju()}catch(i){console.warn(`[${c}] Could not look up the next episode.`,i)}let a=document.getElementById("video_player");if(!e||!a||location.hash!==t)return!1;rn(),sn=PS(e),a.appendChild(sn);let l=jf,n=sn.querySelector(`.${Vu}-seconds`);return n.textContent=String(l),Ef=window.setInterval(()=>{l-=1,location.hash!==t?rn():l<=0?zy(e):n.textContent=String(l)},1e3),!0}var Bi=`${c}-intro`,$y=1,Cy=5,Tf=null,Da=null,Af="",ve=null,Oy=0;function Hi(){return Tf||(Tf=sd()),Tf}function Yi(){let t=location.pathname.match(/^\/shows\/play\/(?:\d+-)?([^/?#]+)/i);return t?t[1].toLowerCase():""}function qi(){let t=Yi();return t&&Hi()[t]||null}function Ui(t){let e=Math.max(0,Math.round(t));return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function Gu(){return document.querySelector("#video_player video")}function Di(t){if(!Dy())return;let e=ve.querySelector(`.${Bi}-toast`);e.textContent=t,e.hidden=!1,window.clearTimeout(Oy),Oy=window.setTimeout(()=>{e.hidden=!0},2500)}function t2(t,e){Hi()[Yi()]={start:t,end:e,updatedAt:Date.now()},oc(Hi())}function e2(){delete Hi()[Yi()],oc(Hi())}function Li(t,e,a){let l=document.createElement("button");return l.type="button",l.className=e,l.textContent=t,l.addEventListener("click",n=>{n.stopPropagation(),a()}),l}function Ry(t){if(!Yi())return null;let e=document.createElement("div");e.className=`${c}-player-menu-section`;let a=document.createElement("p");a.className=`${c}-player-menu-heading`,a.textContent="Intro for this show";let l=document.createElement("div");l.className=`${c}-player-menu-row`,e.append(a,l);let n=qi(),i=`${c}-player-menu-button`;if(Da!==null)return l.append(Li(`Mark end (from ${Ui(Da)})`,i,()=>{let o=Gu(),u=o?o.currentTime:0;if(u-Da<Cy){Di(`Play past the intro first (at least ${Cy}s).`);return}t2(Da,u),Da=null,Af=location.hash,Di(`Intro saved: ${Ui(qi().start)}\u2013${Ui(u)}`),t()}),Li("Cancel",i,()=>{Da=null,t()})),e;if(n){let o=document.createElement("span");return o.textContent=`${Ui(n.start)}\u2013${Ui(n.end)}`,l.append(o,Li("Clear",i,()=>{e2(),Uy(Gu()),Di("Intro cleared for this show."),t()})),e}return l.append(Li("Mark intro start here",i,()=>{let o=Gu();Da=o?o.currentTime:0,Di("Now play to the end of the intro and mark it."),t()})),e}function Uy(t){if(!ve)return;let e=ve.querySelector(`.${Bi}-skip`),a=qi(),l=t?t.currentTime:-1;e.hidden=!(a&&!d.settings.autoSkipIntro&&l>=a.start&&l<a.end-$y)}function Dy(){let t=document.getElementById("video_player");if(!t)return null;if(ve&&ve.parentElement===t)return ve;ve=document.createElement("div"),ve.className=Bi;let e=Li("Skip intro",`${Bi}-skip`,()=>{let l=Gu(),n=qi();l&&n&&(l.currentTime=n.end)});e.hidden=!0;let a=document.createElement("p");return a.className=`${Bi}-toast`,a.hidden=!0,ve.append(e,a),t.appendChild(ve),ve}function Ly(t){if(!Yi()||!Dy())return;let e=qi(),a=t.currentTime;e&&d.settings.autoSkipIntro&&Af!==location.hash&&Da===null&&a>=e.start&&a<e.end-$y&&(Af=location.hash,t.currentTime=e.end,Di("Skipped intro")),Uy(t)}var cl=`${c}-player-menu`,a2="M19.4 13a7.6 7.6 0 0 0 0-2l2.1-1.6-2-3.5-2.5 1a7.7 7.7 0 0 0-1.7-1L15 3.3h-4l-.4 2.6a7.7 7.7 0 0 0-1.7 1l-2.5-1-2 3.5L6.6 11a7.6 7.6 0 0 0 0 2l-2.1 1.6 2 3.5 2.5-1a7.7 7.7 0 0 0 1.7 1l.4 2.6h4l.4-2.6a7.7 7.7 0 0 0 1.7-1l2.5 1 2-3.5L19.4 13zM13 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z",l2=[{key:"autoPlay",label:"Auto play"},{key:"autoNextEpisode",label:"Auto next episode",showsOnly:!0},{key:"autoSkipIntro",label:"Auto skip intros",showsOnly:!0},{key:"autoFullscreen",label:"Auto fullscreen"},{key:"windowedFullscreen",label:"Windowed fullscreen"}],La=null,By=!1;function n2(){return location.pathname.startsWith("/shows/play/")}function Hy(){let t=La.querySelector(`.${cl}-panel`);t.replaceChildren();let e=document.createElement("div");e.className=`${cl}-section`,l2.filter(l=>!l.showsOnly||n2()).forEach(l=>{let n=document.createElement("label");n.className=`${cl}-toggle`;let i=document.createElement("span");i.textContent=l.label;let o=document.createElement("input");o.type="checkbox",o.checked=!!d.settings[l.key],o.addEventListener("change",()=>{il({...d.settings,[l.key]:o.checked})}),o.addEventListener("click",u=>u.stopPropagation()),n.append(i,o),e.append(n)}),t.append(e);let a=Ry(Hy);a&&t.append(a)}function _f(t){La&&(La.dataset.open=t?"true":"false",La.querySelector(`.${cl}-gear`).setAttribute("aria-expanded",String(t)),t&&Hy())}function i2(){let t=document.createElement("div");t.className=cl,t.dataset.open="false",t.addEventListener("click",l=>l.stopPropagation());let e=document.createElement("button");e.type="button",e.className=`${cl}-gear`,e.title="Enhancer settings",e.setAttribute("aria-label","Enhancer settings"),e.setAttribute("aria-expanded","false"),e.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${a2}"/></svg>`,e.addEventListener("click",()=>_f(t.dataset.open!=="true"));let a=document.createElement("div");return a.className=`${cl}-panel`,a.setAttribute("role","dialog"),a.setAttribute("aria-label","Enhancer settings"),t.append(e,a),t}function Mf(){let t=document.getElementById("video_player");t&&(La||(La=i2()),La.parentElement!==t&&t.appendChild(La),By||(By=!0,document.addEventListener("click",()=>_f(!1)),document.addEventListener("keydown",e=>{e.key==="Escape"&&_f(!1)})))}function ge(){let t=document.getElementById("video_player"),e=t?Array.from(t.querySelectorAll("video")):[],a=[...new Set([...e,...Array.from(document.querySelectorAll("video"))])].filter(l=>{let n=l.getBoundingClientRect();return n.width>0&&n.height>0});return a.find(l=>!l.paused&&!l.ended)||a.find(l=>l.readyState>0)||a[0]||null}function hg(){let t=ge();return t?(t.play(),!0):!1}function gg(){let t=ge();return t?(t.pause(),!0):!1}function yg(){let t=ge();return t?(t.paused?t.play():t.pause(),!0):!1}function vg(t){let e=ge();if(!e||!Number.isFinite(t))return!1;let a=Number.isFinite(e.duration)?e.duration:Number.MAX_SAFE_INTEGER;return e.currentTime=Math.max(0,Math.min(a,e.currentTime+t)),!0}function bg(t){let e=ge();return!e||!Number.isFinite(t)?!1:(e.volume=Math.max(0,Math.min(1,t/100)),e.muted=!1,!0)}function Ir(t){let e=ge();return e?(e.muted=!!t,!0):!1}function Sg(){let t=document.getElementById("video_player"),e=t?.querySelector(".vjs-fullscreen-control"),a=!!document.getElementById(sl),l=!!document.fullscreenElement,n=!!t?.classList.contains("vjs-fullscreen");return a||l||n?(a&&nn(),l&&typeof document.exitFullscreen=="function"&&document.exitFullscreen(),n&&e&&e.click(),d.fullscreenTriggered=!1,!0):Yy()}function Yy(){let t=document.getElementById("video_player");if(document.getElementById(sl)||document.fullscreenElement||t?.classList.contains("vjs-fullscreen"))return!0;if(!t)return!1;let e=t.querySelector(".vjs-fullscreen-control");if(e&&e.click(),d.settings.windowedFullscreen)c2();else if(!e)return!1;return d.fullscreenTriggered=!0,!0}function qy(t){history.replaceState(null,"",`#S${t.season}-E${t.episode}-${t.idEpisode}`),window.dispatchEvent(new Event("ChangedEpisodeHash"))}function Nu(t){return location.pathname.startsWith("/shows/play/")?t?(qy(t),!0):(ju().then(e=>{e&&qy(e)}).catch(e=>console.warn(`[${c}] Could not find the next episode.`,e)),!0):!1}function o2(){if(!d.settings.autoPlay)return!1;let t=document.getElementById("progress-continue-button"),e=document.getElementById("progress-from-beginning-button"),a=Number.parseFloat(document.getElementById("progress-bar")?.style.width),l=Number.isFinite(a)&&a>=Qi?e||t:t||e;return l?(console.log(`[${c}] Dismissing playback modal (${l.id}).`),l.click(),!0):!1}function u2(){let t=document.getElementById("video_player");if(!t)return!1;let e=document.getElementById(Se);if(e||(e=document.createElement("button"),e.id=Se,e.type="button",e.textContent="Exit",e.setAttribute("aria-label","Exit windowed fullscreen"),e.title="Exit windowed fullscreen",e.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation(),nn(),d.fullscreenTriggered=!1})),e.parentElement!==t&&t.appendChild(e),!t._lookmovieFullscreenExitActivityAttached){let a=()=>{window.clearTimeout(t._lookmovieFullscreenExitActivityTimer),t.classList.add(`${c}-fullscreen-exit-active`),t._lookmovieFullscreenExitActivityTimer=window.setTimeout(()=>{t.classList.remove(`${c}-fullscreen-exit-active`)},1600)};t._lookmovieFullscreenExitActivityAttached=!0,t.addEventListener("pointermove",a)}return!0}function c2(){if(!document.head)return!1;if(!document.getElementById(sl)){let t=document.createElement("style");t.id=sl,t.textContent=`
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
        `,document.head.appendChild(t)}return u2(),document.body&&document.body.classList.add(`${c}-fullscreen`),!0}function nn(){let t=document.getElementById(sl);t&&t.remove();let e=document.getElementById("video_player");e&&(window.clearTimeout(e._lookmovieFullscreenExitActivityTimer),e.classList.remove(`${c}-fullscreen-exit-active`));let a=document.getElementById(Se);a&&a.remove(),document.body&&document.body.classList.remove(`${c}-fullscreen`)}function s2(){return!d.settings.autoFullscreen||d.fullscreenTriggered?!1:(console.log(`[${c}] Applying fullscreen behavior.`),Yy())}function r2(){rn(),My(),vi("play"),!(!d.settings.autoPlay&&!d.settings.autoFullscreen)&&window.setTimeout(()=>{let t=o2();window.setTimeout(()=>{s2()},t?500:200)},300)}function f2(){vi("pause")}function d2(){vi("ended"),window.setTimeout(()=>{Ng()||Ny()},750)}function zf(t){!t||t._lookmovieEnhancerAttached||(t._lookmovieEnhancerAttached=!0,t.addEventListener("play",r2),t.addEventListener("loadedmetadata",()=>{t.closest("#video_player")&&Mf()}),t.addEventListener("pause",f2),t.addEventListener("ended",d2),t.addEventListener("timeupdate",()=>{t.closest("#video_player")&&(Mf(),Ly(t))}))}function Nf(){document.querySelectorAll("video").forEach(zf)}function jy(){let t=window.setInterval(()=>{if(!document.body)return;window.clearInterval(t),Nf(),new MutationObserver(a=>{a.forEach(l=>{l.type==="childList"&&l.addedNodes.forEach(n=>{!n||n.nodeType!==Node.ELEMENT_NODE||(n.tagName==="VIDEO"&&zf(n),typeof n.querySelectorAll=="function"&&n.querySelectorAll("video").forEach(zf))})})}).observe(document.body,{childList:!0,subtree:!0})},100)}var Gy=".player-pre-init-ads",p2=".pre-init-ads--close, .pre-init-ads--back-button";function m2(){window.__lookmovie2EnhancerAdBypass||(window.__lookmovie2EnhancerAdBypass=!0,Object.defineProperty(window,"_preInitAdsTimestamp",{configurable:!0,get:()=>Date.now(),set:()=>{}}))}function h2(t){let e=document.createElement("script");e.textContent=t,(document.head||document.documentElement).appendChild(e),e.remove()}function g2(){if(document.getElementById(Pu)||!document.documentElement)return;let t=document.createElement("style");t.id=Pu,t.textContent=".ad-container { display: none !important; }",(document.head||document.documentElement).appendChild(t)}function Vy(){let t=document.querySelector(Gy);if(!t||t.classList.contains("tw-hidden"))return!1;let e=t.querySelector(p2);return e?(e.click(),console.info(`[${c}] Skipped ad countdown.`),!0):!1}function Qy(){try{h2(`(${m2.toString()})();`)}catch(t){console.warn(`[${c}] Failed to install ad timer bypass.`,t)}g2()}function Xy(){let t=document.querySelector(Gy);t&&(Vy(),new MutationObserver(Vy).observe(t,{attributes:!0,attributeFilter:["class"]}))}function y2(){window.setInterval(()=>{if(location.href===d.lastKnownUrl)return;new URL(d.lastKnownUrl,location.origin).pathname==="/shows"?qu({persist:!0}):qu(),d.lastKnownUrl=location.href,d.fullscreenTriggered=!1,d.lastTrackedEpisodeSignature="",nn(),Nf(),df(),$t(),Ua(),bf(),Yu(),Ri(),Sf(),Ni(),wf(),Ci(),xf(),wi(),Pe()},Bf)}function Cf(){if(d.domBootstrapped)return;d.domBootstrapped=!0,Xy(),jy(),zu(),y2(),window.addEventListener("scroll",xy,{passive:!0}),window.addEventListener("pagehide",()=>qu({persist:!0}));let t=window.setInterval(()=>{d.uiBootAttempts+=1,df(),bf(),Yu(),Sf(),wf(),xf(),(document.getElementById(S)||d.uiBootAttempts>100)&&window.clearInterval(t)},100);$t(),Oa(),Ua(),Yu(),Ri(),Ni(),Ci(),wi(),Pe()}Qy();Cu();Gg();document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Cf,{once:!0}):Cf();})();
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
