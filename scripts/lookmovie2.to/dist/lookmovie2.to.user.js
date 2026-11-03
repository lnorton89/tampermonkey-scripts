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


"use strict";(()=>{var uv=Object.create;var Vf=Object.defineProperty;var cv=Object.getOwnPropertyDescriptor;var rv=Object.getOwnPropertyNames;var sv=Object.getPrototypeOf,fv=Object.prototype.hasOwnProperty;var Se=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var dv=(t,e,a,l)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of rv(e))!fv.call(t,n)&&n!==a&&Vf(t,n,{get:()=>e[n],enumerable:!(l=cv(e,n))||l.enumerable});return t};var Z=(t,e,a)=>(a=t!=null?uv(sv(t)):{},dv(e||!t||!t.__esModule?Vf(a,"default",{value:t,enumerable:!0}):a,t));var Od=Se(P=>{"use strict";function vc(t,e){var a=t.length;t.push(e);t:for(;0<a;){var l=a-1>>>1,n=t[l];if(0<Wi(n,e))t[l]=e,t[a]=n,a=l;else break t}}function Ee(t){return t.length===0?null:t[0]}function Ii(t){if(t.length===0)return null;var e=t[0],a=t.pop();if(a!==e){t[0]=a;t:for(var l=0,n=t.length,i=n>>>1;l<i;){var o=2*(l+1)-1,u=t[o],r=o+1,p=t[r];if(0>Wi(u,a))r<n&&0>Wi(p,u)?(t[l]=p,t[r]=a,l=r):(t[l]=u,t[o]=a,l=o);else if(r<n&&0>Wi(p,a))t[l]=p,t[r]=a,l=r;else break t}}return e}function Wi(t,e){var a=t.sortIndex-e.sortIndex;return a!==0?a:t.id-e.id}P.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(xd=performance,P.unstable_now=function(){return xd.now()}):(hc=Date,Ed=hc.now(),P.unstable_now=function(){return hc.now()-Ed});var xd,hc,Ed,Ue=[],na=[],gv=1,ee=null,_t=3,bc=!1,vn=!1,bn=!1,Sc=!1,_d=typeof setTimeout=="function"?setTimeout:null,Md=typeof clearTimeout=="function"?clearTimeout:null,Td=typeof setImmediate<"u"?setImmediate:null;function Fi(t){for(var e=Ee(na);e!==null;){if(e.callback===null)Ii(na);else if(e.startTime<=t)Ii(na),e.sortIndex=e.expirationTime,vc(Ue,e);else break;e=Ee(na)}}function wc(t){if(bn=!1,Fi(t),!vn)if(Ee(Ue)!==null)vn=!0,gl||(gl=!0,hl());else{var e=Ee(na);e!==null&&xc(wc,e.startTime-t)}}var gl=!1,Sn=-1,zd=5,Nd=-1;function Cd(){return Sc?!0:!(P.unstable_now()-Nd<zd)}function gc(){if(Sc=!1,gl){var t=P.unstable_now();Nd=t;var e=!0;try{t:{vn=!1,bn&&(bn=!1,Md(Sn),Sn=-1),bc=!0;var a=_t;try{e:{for(Fi(t),ee=Ee(Ue);ee!==null&&!(ee.expirationTime>t&&Cd());){var l=ee.callback;if(typeof l=="function"){ee.callback=null,_t=ee.priorityLevel;var n=l(ee.expirationTime<=t);if(t=P.unstable_now(),typeof n=="function"){ee.callback=n,Fi(t),e=!0;break e}ee===Ee(Ue)&&Ii(Ue),Fi(t)}else Ii(Ue);ee=Ee(Ue)}if(ee!==null)e=!0;else{var i=Ee(na);i!==null&&xc(wc,i.startTime-t),e=!1}}break t}finally{ee=null,_t=a,bc=!1}e=void 0}}finally{e?hl():gl=!1}}}var hl;typeof Td=="function"?hl=function(){Td(gc)}:typeof MessageChannel<"u"?(yc=new MessageChannel,Ad=yc.port2,yc.port1.onmessage=gc,hl=function(){Ad.postMessage(null)}):hl=function(){_d(gc,0)};var yc,Ad;function xc(t,e){Sn=_d(function(){t(P.unstable_now())},e)}P.unstable_IdlePriority=5;P.unstable_ImmediatePriority=1;P.unstable_LowPriority=4;P.unstable_NormalPriority=3;P.unstable_Profiling=null;P.unstable_UserBlockingPriority=2;P.unstable_cancelCallback=function(t){t.callback=null};P.unstable_forceFrameRate=function(t){0>t||125<t?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):zd=0<t?Math.floor(1e3/t):5};P.unstable_getCurrentPriorityLevel=function(){return _t};P.unstable_next=function(t){switch(_t){case 1:case 2:case 3:var e=3;break;default:e=_t}var a=_t;_t=e;try{return t()}finally{_t=a}};P.unstable_requestPaint=function(){Sc=!0};P.unstable_runWithPriority=function(t,e){switch(t){case 1:case 2:case 3:case 4:case 5:break;default:t=3}var a=_t;_t=t;try{return e()}finally{_t=a}};P.unstable_scheduleCallback=function(t,e,a){var l=P.unstable_now();switch(typeof a=="object"&&a!==null?(a=a.delay,a=typeof a=="number"&&0<a?l+a:l):a=l,t){case 1:var n=-1;break;case 2:n=250;break;case 5:n=1073741823;break;case 4:n=1e4;break;default:n=5e3}return n=a+n,t={id:gv++,callback:e,priorityLevel:t,startTime:a,expirationTime:n,sortIndex:-1},a>l?(t.sortIndex=a,vc(na,t),Ee(Ue)===null&&t===Ee(na)&&(bn?(Md(Sn),Sn=-1):bn=!0,xc(wc,a-l))):(t.sortIndex=n,vc(Ue,t),vn||bc||(vn=!0,gl||(gl=!0,hl()))),t};P.unstable_shouldYield=Cd;P.unstable_wrapCallback=function(t){var e=_t;return function(){var a=_t;_t=e;try{return t.apply(this,arguments)}finally{_t=a}}}});var Rd=Se((I2,$d)=>{"use strict";$d.exports=Od()});var Gd=Se(N=>{"use strict";var Ac=Symbol.for("react.transitional.element"),yv=Symbol.for("react.portal"),vv=Symbol.for("react.fragment"),bv=Symbol.for("react.strict_mode"),Sv=Symbol.for("react.profiler"),wv=Symbol.for("react.consumer"),xv=Symbol.for("react.context"),Ev=Symbol.for("react.forward_ref"),Tv=Symbol.for("react.suspense"),Av=Symbol.for("react.memo"),qd=Symbol.for("react.lazy"),_v=Symbol.for("react.activity"),Ud=Symbol.iterator;function Mv(t){return t===null||typeof t!="object"?null:(t=Ud&&t[Ud]||t["@@iterator"],typeof t=="function"?t:null)}var Hd={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Yd=Object.assign,jd={};function vl(t,e,a){this.props=t,this.context=e,this.refs=jd,this.updater=a||Hd}vl.prototype.isReactComponent={};vl.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};vl.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Vd(){}Vd.prototype=vl.prototype;function _c(t,e,a){this.props=t,this.context=e,this.refs=jd,this.updater=a||Hd}var Mc=_c.prototype=new Vd;Mc.constructor=_c;Yd(Mc,vl.prototype);Mc.isPureReactComponent=!0;var Dd=Array.isArray;function Tc(){}var J={H:null,A:null,T:null,S:null},kd=Object.prototype.hasOwnProperty;function zc(t,e,a){var l=a.ref;return{$$typeof:Ac,type:t,key:e,ref:l!==void 0?l:null,props:a}}function zv(t,e){return zc(t.type,e,t.props)}function Nc(t){return typeof t=="object"&&t!==null&&t.$$typeof===Ac}function Nv(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(a){return e[a]})}var Ld=/\/+/g;function Ec(t,e){return typeof t=="object"&&t!==null&&t.key!=null?Nv(""+t.key):e.toString(36)}function Cv(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(Tc,Tc):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function yl(t,e,a,l,n){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(i){case"bigint":case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Ac:case yv:o=!0;break;case qd:return o=t._init,yl(o(t._payload),e,a,l,n)}}if(o)return n=n(t),o=l===""?"."+Ec(t,0):l,Dd(n)?(a="",o!=null&&(a=o.replace(Ld,"$&/")+"/"),yl(n,e,a,"",function(p){return p})):n!=null&&(Nc(n)&&(n=zv(n,a+(n.key==null||t&&t.key===n.key?"":(""+n.key).replace(Ld,"$&/")+"/")+o)),e.push(n)),1;o=0;var u=l===""?".":l+":";if(Dd(t))for(var r=0;r<t.length;r++)l=t[r],i=u+Ec(l,r),o+=yl(l,e,a,i,n);else if(r=Mv(t),typeof r=="function")for(t=r.call(t),r=0;!(l=t.next()).done;)l=l.value,i=u+Ec(l,r++),o+=yl(l,e,a,i,n);else if(i==="object"){if(typeof t.then=="function")return yl(Cv(t),e,a,l,n);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return o}function Pi(t,e,a){if(t==null)return t;var l=[],n=0;return yl(t,l,"","",function(i){return e.call(a,i,n++)}),l}function Ov(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(a){(t._status===0||t._status===-1)&&(t._status=1,t._result=a)},function(a){(t._status===0||t._status===-1)&&(t._status=2,t._result=a)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Bd=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},$v={map:Pi,forEach:function(t,e,a){Pi(t,function(){e.apply(this,arguments)},a)},count:function(t){var e=0;return Pi(t,function(){e++}),e},toArray:function(t){return Pi(t,function(e){return e})||[]},only:function(t){if(!Nc(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};N.Activity=_v;N.Children=$v;N.Component=vl;N.Fragment=vv;N.Profiler=Sv;N.PureComponent=_c;N.StrictMode=bv;N.Suspense=Tv;N.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=J;N.__COMPILER_RUNTIME={__proto__:null,c:function(t){return J.H.useMemoCache(t)}};N.cache=function(t){return function(){return t.apply(null,arguments)}};N.cacheSignal=function(){return null};N.cloneElement=function(t,e,a){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var l=Yd({},t.props),n=t.key;if(e!=null)for(i in e.key!==void 0&&(n=""+e.key),e)!kd.call(e,i)||i==="key"||i==="__self"||i==="__source"||i==="ref"&&e.ref===void 0||(l[i]=e[i]);var i=arguments.length-2;if(i===1)l.children=a;else if(1<i){for(var o=Array(i),u=0;u<i;u++)o[u]=arguments[u+2];l.children=o}return zc(t.type,n,l)};N.createContext=function(t){return t={$$typeof:xv,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:wv,_context:t},t};N.createElement=function(t,e,a){var l,n={},i=null;if(e!=null)for(l in e.key!==void 0&&(i=""+e.key),e)kd.call(e,l)&&l!=="key"&&l!=="__self"&&l!=="__source"&&(n[l]=e[l]);var o=arguments.length-2;if(o===1)n.children=a;else if(1<o){for(var u=Array(o),r=0;r<o;r++)u[r]=arguments[r+2];n.children=u}if(t&&t.defaultProps)for(l in o=t.defaultProps,o)n[l]===void 0&&(n[l]=o[l]);return zc(t,i,n)};N.createRef=function(){return{current:null}};N.forwardRef=function(t){return{$$typeof:Ev,render:t}};N.isValidElement=Nc;N.lazy=function(t){return{$$typeof:qd,_payload:{_status:-1,_result:t},_init:Ov}};N.memo=function(t,e){return{$$typeof:Av,type:t,compare:e===void 0?null:e}};N.startTransition=function(t){var e=J.T,a={};J.T=a;try{var l=t(),n=J.S;n!==null&&n(a,l),typeof l=="object"&&l!==null&&typeof l.then=="function"&&l.then(Tc,Bd)}catch(i){Bd(i)}finally{e!==null&&a.types!==null&&(e.types=a.types),J.T=e}};N.unstable_useCacheRefresh=function(){return J.H.useCacheRefresh()};N.use=function(t){return J.H.use(t)};N.useActionState=function(t,e,a){return J.H.useActionState(t,e,a)};N.useCallback=function(t,e){return J.H.useCallback(t,e)};N.useContext=function(t){return J.H.useContext(t)};N.useDebugValue=function(){};N.useDeferredValue=function(t,e){return J.H.useDeferredValue(t,e)};N.useEffect=function(t,e){return J.H.useEffect(t,e)};N.useEffectEvent=function(t){return J.H.useEffectEvent(t)};N.useId=function(){return J.H.useId()};N.useImperativeHandle=function(t,e,a){return J.H.useImperativeHandle(t,e,a)};N.useInsertionEffect=function(t,e){return J.H.useInsertionEffect(t,e)};N.useLayoutEffect=function(t,e){return J.H.useLayoutEffect(t,e)};N.useMemo=function(t,e){return J.H.useMemo(t,e)};N.useOptimistic=function(t,e){return J.H.useOptimistic(t,e)};N.useReducer=function(t,e,a){return J.H.useReducer(t,e,a)};N.useRef=function(t){return J.H.useRef(t)};N.useState=function(t){return J.H.useState(t)};N.useSyncExternalStore=function(t,e,a){return J.H.useSyncExternalStore(t,e,a)};N.useTransition=function(){return J.H.useTransition()};N.version="19.2.5"});var Ya=Se((tw,Qd)=>{"use strict";Qd.exports=Gd()});var Zd=Se(Ct=>{"use strict";var Rv=Ya();function Xd(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)e+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function ia(){}var Nt={d:{f:ia,r:function(){throw Error(Xd(522))},D:ia,C:ia,L:ia,m:ia,X:ia,S:ia,M:ia},p:0,findDOMNode:null},Uv=Symbol.for("react.portal");function Dv(t,e,a){var l=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Uv,key:l==null?null:""+l,children:t,containerInfo:e,implementation:a}}var wn=Rv.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function to(t,e){if(t==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}Ct.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Nt;Ct.createPortal=function(t,e){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(Xd(299));return Dv(t,e,null,a)};Ct.flushSync=function(t){var e=wn.T,a=Nt.p;try{if(wn.T=null,Nt.p=2,t)return t()}finally{wn.T=e,Nt.p=a,Nt.d.f()}};Ct.preconnect=function(t,e){typeof t=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,Nt.d.C(t,e))};Ct.prefetchDNS=function(t){typeof t=="string"&&Nt.d.D(t)};Ct.preinit=function(t,e){if(typeof t=="string"&&e&&typeof e.as=="string"){var a=e.as,l=to(a,e.crossOrigin),n=typeof e.integrity=="string"?e.integrity:void 0,i=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;a==="style"?Nt.d.S(t,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:l,integrity:n,fetchPriority:i}):a==="script"&&Nt.d.X(t,{crossOrigin:l,integrity:n,fetchPriority:i,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};Ct.preinitModule=function(t,e){if(typeof t=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var a=to(e.as,e.crossOrigin);Nt.d.M(t,{crossOrigin:a,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0})}}else e==null&&Nt.d.M(t)};Ct.preload=function(t,e){if(typeof t=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var a=e.as,l=to(a,e.crossOrigin);Nt.d.L(t,a,{crossOrigin:l,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};Ct.preloadModule=function(t,e){if(typeof t=="string")if(e){var a=to(e.as,e.crossOrigin);Nt.d.m(t,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:a,integrity:typeof e.integrity=="string"?e.integrity:void 0})}else Nt.d.m(t)};Ct.requestFormReset=function(t){Nt.d.r(t)};Ct.unstable_batchedUpdates=function(t,e){return t(e)};Ct.useFormState=function(t,e,a){return wn.H.useFormState(t,e,a)};Ct.useFormStatus=function(){return wn.H.useHostTransitionStatus()};Ct.version="19.2.5"});var Cc=Se((aw,Jd)=>{"use strict";function Kd(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Kd)}catch(t){console.error(t)}}Kd(),Jd.exports=Zd()});var uy=Se(_u=>{"use strict";var pt=Rd(),wm=Ya(),Lv=Cc();function w(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)e+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function xm(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function ui(t){var e=t,a=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(a=e.return),t=e.return;while(t)}return e.tag===3?a:null}function Em(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Tm(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Wd(t){if(ui(t)!==t)throw Error(w(188))}function Bv(t){var e=t.alternate;if(!e){if(e=ui(t),e===null)throw Error(w(188));return e!==t?null:t}for(var a=t,l=e;;){var n=a.return;if(n===null)break;var i=n.alternate;if(i===null){if(l=n.return,l!==null){a=l;continue}break}if(n.child===i.child){for(i=n.child;i;){if(i===a)return Wd(n),t;if(i===l)return Wd(n),e;i=i.sibling}throw Error(w(188))}if(a.return!==l.return)a=n,l=i;else{for(var o=!1,u=n.child;u;){if(u===a){o=!0,a=n,l=i;break}if(u===l){o=!0,l=n,a=i;break}u=u.sibling}if(!o){for(u=i.child;u;){if(u===a){o=!0,a=i,l=n;break}if(u===l){o=!0,l=i,a=n;break}u=u.sibling}if(!o)throw Error(w(189))}}if(a.alternate!==l)throw Error(w(190))}if(a.tag!==3)throw Error(w(188));return a.stateNode.current===a?t:e}function Am(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=Am(t),e!==null)return e;t=t.sibling}return null}var I=Object.assign,qv=Symbol.for("react.element"),eo=Symbol.for("react.transitional.element"),Nn=Symbol.for("react.portal"),Tl=Symbol.for("react.fragment"),_m=Symbol.for("react.strict_mode"),sr=Symbol.for("react.profiler"),Mm=Symbol.for("react.consumer"),Ve=Symbol.for("react.context"),is=Symbol.for("react.forward_ref"),fr=Symbol.for("react.suspense"),dr=Symbol.for("react.suspense_list"),os=Symbol.for("react.memo"),oa=Symbol.for("react.lazy");Symbol.for("react.scope");var pr=Symbol.for("react.activity");Symbol.for("react.legacy_hidden");Symbol.for("react.tracing_marker");var Hv=Symbol.for("react.memo_cache_sentinel");Symbol.for("react.view_transition");var Fd=Symbol.iterator;function xn(t){return t===null||typeof t!="object"?null:(t=Fd&&t[Fd]||t["@@iterator"],typeof t=="function"?t:null)}var Yv=Symbol.for("react.client.reference");function mr(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===Yv?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Tl:return"Fragment";case sr:return"Profiler";case _m:return"StrictMode";case fr:return"Suspense";case dr:return"SuspenseList";case pr:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case Nn:return"Portal";case Ve:return t.displayName||"Context";case Mm:return(t._context.displayName||"Context")+".Consumer";case is:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case os:return e=t.displayName||null,e!==null?e:mr(t.type)||"Memo";case oa:e=t._payload,t=t._init;try{return mr(t(e))}catch{}}return null}var Cn=Array.isArray,z=wm.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,j=Lv.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Xa={pending:!1,data:null,method:null,action:null},hr=[],Al=-1;function ze(t){return{current:t}}function yt(t){0>Al||(t.current=hr[Al],hr[Al]=null,Al--)}function K(t,e){Al++,hr[Al]=t.current,t.current=e}var Me=ze(null),Zn=ze(null),ya=ze(null),Do=ze(null);function Lo(t,e){switch(K(ya,e),K(Zn,t),K(Me,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?nm(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=nm(e),t=Zg(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}yt(Me),K(Me,t)}function kl(){yt(Me),yt(Zn),yt(ya)}function gr(t){t.memoizedState!==null&&K(Do,t);var e=Me.current,a=Zg(e,t.type);e!==a&&(K(Zn,t),K(Me,a))}function Bo(t){Zn.current===t&&(yt(Me),yt(Zn)),Do.current===t&&(yt(Do),ni._currentValue=Xa)}var Oc,Id;function Va(t){if(Oc===void 0)try{throw Error()}catch(a){var e=a.stack.trim().match(/\n( *(at )?)/);Oc=e&&e[1]||"",Id=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Oc+t+Id}var $c=!1;function Rc(t,e){if(!t||$c)return"";$c=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(e){var v=function(){throw Error()};if(Object.defineProperty(v.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(v,[])}catch(y){var m=y}Reflect.construct(t,[],v)}else{try{v.call()}catch(y){m=y}t.call(v.prototype)}}else{try{throw Error()}catch(y){m=y}(v=t())&&typeof v.catch=="function"&&v.catch(function(){})}}catch(y){if(y&&m&&typeof y.stack=="string")return[y.stack,m.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var n=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");n&&n.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=l.DetermineComponentFrameRoot(),o=i[0],u=i[1];if(o&&u){var r=o.split(`
`),p=u.split(`
`);for(n=l=0;l<r.length&&!r[l].includes("DetermineComponentFrameRoot");)l++;for(;n<p.length&&!p[n].includes("DetermineComponentFrameRoot");)n++;if(l===r.length||n===p.length)for(l=r.length-1,n=p.length-1;1<=l&&0<=n&&r[l]!==p[n];)n--;for(;1<=l&&0<=n;l--,n--)if(r[l]!==p[n]){if(l!==1||n!==1)do if(l--,n--,0>n||r[l]!==p[n]){var h=`
`+r[l].replace(" at new "," at ");return t.displayName&&h.includes("<anonymous>")&&(h=h.replace("<anonymous>",t.displayName)),h}while(1<=l&&0<=n);break}}}finally{$c=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?Va(a):""}function jv(t,e){switch(t.tag){case 26:case 27:case 5:return Va(t.type);case 16:return Va("Lazy");case 13:return t.child!==e&&e!==null?Va("Suspense Fallback"):Va("Suspense");case 19:return Va("SuspenseList");case 0:case 15:return Rc(t.type,!1);case 11:return Rc(t.type.render,!1);case 1:return Rc(t.type,!0);case 31:return Va("Activity");default:return""}}function Pd(t){try{var e="",a=null;do e+=jv(t,a),a=t,t=t.return;while(t);return e}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var yr=Object.prototype.hasOwnProperty,us=pt.unstable_scheduleCallback,Uc=pt.unstable_cancelCallback,Vv=pt.unstable_shouldYield,kv=pt.unstable_requestPaint,Zt=pt.unstable_now,Gv=pt.unstable_getCurrentPriorityLevel,zm=pt.unstable_ImmediatePriority,Nm=pt.unstable_UserBlockingPriority,qo=pt.unstable_NormalPriority,Qv=pt.unstable_LowPriority,Cm=pt.unstable_IdlePriority,Xv=pt.log,Zv=pt.unstable_setDisableYieldValue,ci=null,Kt=null;function da(t){if(typeof Xv=="function"&&Zv(t),Kt&&typeof Kt.setStrictMode=="function")try{Kt.setStrictMode(ci,t)}catch{}}var Jt=Math.clz32?Math.clz32:Wv,Kv=Math.log,Jv=Math.LN2;function Wv(t){return t>>>=0,t===0?32:31-(Kv(t)/Jv|0)|0}var ao=256,lo=262144,no=4194304;function ka(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function su(t,e,a){var l=t.pendingLanes;if(l===0)return 0;var n=0,i=t.suspendedLanes,o=t.pingedLanes;t=t.warmLanes;var u=l&134217727;return u!==0?(l=u&~i,l!==0?n=ka(l):(o&=u,o!==0?n=ka(o):a||(a=u&~t,a!==0&&(n=ka(a))))):(u=l&~i,u!==0?n=ka(u):o!==0?n=ka(o):a||(a=l&~t,a!==0&&(n=ka(a)))),n===0?0:e!==0&&e!==n&&(e&i)===0&&(i=n&-n,a=e&-e,i>=a||i===32&&(a&4194048)!==0)?e:n}function ri(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function Fv(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Om(){var t=no;return no<<=1,(no&62914560)===0&&(no=4194304),t}function Dc(t){for(var e=[],a=0;31>a;a++)e.push(t);return e}function si(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Iv(t,e,a,l,n,i){var o=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var u=t.entanglements,r=t.expirationTimes,p=t.hiddenUpdates;for(a=o&~a;0<a;){var h=31-Jt(a),v=1<<h;u[h]=0,r[h]=-1;var m=p[h];if(m!==null)for(p[h]=null,h=0;h<m.length;h++){var y=m[h];y!==null&&(y.lane&=-536870913)}a&=~v}l!==0&&$m(t,l,0),i!==0&&n===0&&t.tag!==0&&(t.suspendedLanes|=i&~(o&~e))}function $m(t,e,a){t.pendingLanes|=e,t.suspendedLanes&=~e;var l=31-Jt(e);t.entangledLanes|=e,t.entanglements[l]=t.entanglements[l]|1073741824|a&261930}function Rm(t,e){var a=t.entangledLanes|=e;for(t=t.entanglements;a;){var l=31-Jt(a),n=1<<l;n&e|t[l]&e&&(t[l]|=e),a&=~n}}function Um(t,e){var a=e&-e;return a=(a&42)!==0?1:cs(a),(a&(t.suspendedLanes|e))!==0?0:a}function cs(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function rs(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Dm(){var t=j.p;return t!==0?t:(t=window.event,t===void 0?32:ny(t.type))}function tp(t,e){var a=j.p;try{return j.p=t,e()}finally{j.p=a}}var Ca=Math.random().toString(36).slice(2),St="__reactFiber$"+Ca,Yt="__reactProps$"+Ca,tn="__reactContainer$"+Ca,vr="__reactEvents$"+Ca,Pv="__reactListeners$"+Ca,t1="__reactHandles$"+Ca,ep="__reactResources$"+Ca,fi="__reactMarker$"+Ca;function ss(t){delete t[St],delete t[Yt],delete t[vr],delete t[Pv],delete t[t1]}function _l(t){var e=t[St];if(e)return e;for(var a=t.parentNode;a;){if(e=a[tn]||a[St]){if(a=e.alternate,e.child!==null||a!==null&&a.child!==null)for(t=rm(t);t!==null;){if(a=t[St])return a;t=rm(t)}return e}t=a,a=t.parentNode}return null}function en(t){if(t=t[St]||t[tn]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function On(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(w(33))}function Ll(t){var e=t[ep];return e||(e=t[ep]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function gt(t){t[fi]=!0}var Lm=new Set,Bm={};function al(t,e){Gl(t,e),Gl(t+"Capture",e)}function Gl(t,e){for(Bm[t]=e,t=0;t<e.length;t++)Lm.add(e[t])}var e1=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ap={},lp={};function a1(t){return yr.call(lp,t)?!0:yr.call(ap,t)?!1:e1.test(t)?lp[t]=!0:(ap[t]=!0,!1)}function So(t,e,a){if(a1(e))if(a===null)t.removeAttribute(e);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var l=e.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+a)}}function io(t,e,a){if(a===null)t.removeAttribute(e);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+a)}}function De(t,e,a,l){if(l===null)t.removeAttribute(a);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(e,a,""+l)}}function le(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function qm(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function l1(t,e,a){var l=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var n=l.get,i=l.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return n.call(this)},set:function(o){a=""+o,i.call(this,o)}}),Object.defineProperty(t,e,{enumerable:l.enumerable}),{getValue:function(){return a},setValue:function(o){a=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function br(t){if(!t._valueTracker){var e=qm(t)?"checked":"value";t._valueTracker=l1(t,e,""+t[e])}}function Hm(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var a=e.getValue(),l="";return t&&(l=qm(t)?t.checked?"true":"false":t.value),t=l,t!==a?(e.setValue(t),!0):!1}function Ho(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var n1=/[\n"\\]/g;function oe(t){return t.replace(n1,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function Sr(t,e,a,l,n,i,o,u){t.name="",o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?t.type=o:t.removeAttribute("type"),e!=null?o==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+le(e)):t.value!==""+le(e)&&(t.value=""+le(e)):o!=="submit"&&o!=="reset"||t.removeAttribute("value"),e!=null?wr(t,o,le(e)):a!=null?wr(t,o,le(a)):l!=null&&t.removeAttribute("value"),n==null&&i!=null&&(t.defaultChecked=!!i),n!=null&&(t.checked=n&&typeof n!="function"&&typeof n!="symbol"),u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?t.name=""+le(u):t.removeAttribute("name")}function Ym(t,e,a,l,n,i,o,u){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(t.type=i),e!=null||a!=null){if(!(i!=="submit"&&i!=="reset"||e!=null)){br(t);return}a=a!=null?""+le(a):"",e=e!=null?""+le(e):a,u||e===t.value||(t.value=e),t.defaultValue=e}l=l??n,l=typeof l!="function"&&typeof l!="symbol"&&!!l,t.checked=u?t.checked:!!l,t.defaultChecked=!!l,o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"&&(t.name=o),br(t)}function wr(t,e,a){e==="number"&&Ho(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function Bl(t,e,a,l){if(t=t.options,e){e={};for(var n=0;n<a.length;n++)e["$"+a[n]]=!0;for(a=0;a<t.length;a++)n=e.hasOwnProperty("$"+t[a].value),t[a].selected!==n&&(t[a].selected=n),n&&l&&(t[a].defaultSelected=!0)}else{for(a=""+le(a),e=null,n=0;n<t.length;n++){if(t[n].value===a){t[n].selected=!0,l&&(t[n].defaultSelected=!0);return}e!==null||t[n].disabled||(e=t[n])}e!==null&&(e.selected=!0)}}function jm(t,e,a){if(e!=null&&(e=""+le(e),e!==t.value&&(t.value=e),a==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=a!=null?""+le(a):""}function Vm(t,e,a,l){if(e==null){if(l!=null){if(a!=null)throw Error(w(92));if(Cn(l)){if(1<l.length)throw Error(w(93));l=l[0]}a=l}a==null&&(a=""),e=a}a=le(e),t.defaultValue=a,l=t.textContent,l===a&&l!==""&&l!==null&&(t.value=l),br(t)}function Ql(t,e){if(e){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=e;return}}t.textContent=e}var i1=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function np(t,e,a){var l=e.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?l?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":l?t.setProperty(e,a):typeof a!="number"||a===0||i1.has(e)?e==="float"?t.cssFloat=a:t[e]=(""+a).trim():t[e]=a+"px"}function km(t,e,a){if(e!=null&&typeof e!="object")throw Error(w(62));if(t=t.style,a!=null){for(var l in a)!a.hasOwnProperty(l)||e!=null&&e.hasOwnProperty(l)||(l.indexOf("--")===0?t.setProperty(l,""):l==="float"?t.cssFloat="":t[l]="");for(var n in e)l=e[n],e.hasOwnProperty(n)&&a[n]!==l&&np(t,n,l)}else for(var i in e)e.hasOwnProperty(i)&&np(t,i,e[i])}function fs(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var o1=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),u1=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function wo(t){return u1.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function ke(){}var xr=null;function ds(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ml=null,ql=null;function ip(t){var e=en(t);if(e&&(t=e.stateNode)){var a=t[Yt]||null;t:switch(t=e.stateNode,e.type){case"input":if(Sr(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),e=a.name,a.type==="radio"&&e!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+oe(""+e)+'"][type="radio"]'),e=0;e<a.length;e++){var l=a[e];if(l!==t&&l.form===t.form){var n=l[Yt]||null;if(!n)throw Error(w(90));Sr(l,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name)}}for(e=0;e<a.length;e++)l=a[e],l.form===t.form&&Hm(l)}break t;case"textarea":jm(t,a.value,a.defaultValue);break t;case"select":e=a.value,e!=null&&Bl(t,!!a.multiple,e,!1)}}}var Lc=!1;function Gm(t,e,a){if(Lc)return t(e,a);Lc=!0;try{var l=t(e);return l}finally{if(Lc=!1,(Ml!==null||ql!==null)&&(xu(),Ml&&(e=Ml,t=ql,ql=Ml=null,ip(e),t)))for(e=0;e<t.length;e++)ip(t[e])}}function Kn(t,e){var a=t.stateNode;if(a===null)return null;var l=a[Yt]||null;if(l===null)return null;a=l[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(t=t.type,l=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!l;break t;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(w(231,e,typeof a));return a}var Ke=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Er=!1;if(Ke)try{bl={},Object.defineProperty(bl,"passive",{get:function(){Er=!0}}),window.addEventListener("test",bl,bl),window.removeEventListener("test",bl,bl)}catch{Er=!1}var bl,pa=null,ps=null,xo=null;function Qm(){if(xo)return xo;var t,e=ps,a=e.length,l,n="value"in pa?pa.value:pa.textContent,i=n.length;for(t=0;t<a&&e[t]===n[t];t++);var o=a-t;for(l=1;l<=o&&e[a-l]===n[i-l];l++);return xo=n.slice(t,1<l?1-l:void 0)}function Eo(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function oo(){return!0}function op(){return!1}function jt(t){function e(a,l,n,i,o){this._reactName=a,this._targetInst=n,this.type=l,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var u in t)t.hasOwnProperty(u)&&(a=t[u],this[u]=a?a(i):i[u]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?oo:op,this.isPropagationStopped=op,this}return I(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=oo)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=oo)},persist:function(){},isPersistent:oo}),e}var ll={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},fu=jt(ll),di=I({},ll,{view:0,detail:0}),c1=jt(di),Bc,qc,En,du=I({},di,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ms,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==En&&(En&&t.type==="mousemove"?(Bc=t.screenX-En.screenX,qc=t.screenY-En.screenY):qc=Bc=0,En=t),Bc)},movementY:function(t){return"movementY"in t?t.movementY:qc}}),up=jt(du),r1=I({},du,{dataTransfer:0}),s1=jt(r1),f1=I({},di,{relatedTarget:0}),Hc=jt(f1),d1=I({},ll,{animationName:0,elapsedTime:0,pseudoElement:0}),p1=jt(d1),m1=I({},ll,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),h1=jt(m1),g1=I({},ll,{data:0}),cp=jt(g1),y1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},v1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},b1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function S1(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=b1[t])?!!e[t]:!1}function ms(){return S1}var w1=I({},di,{key:function(t){if(t.key){var e=y1[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Eo(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?v1[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ms,charCode:function(t){return t.type==="keypress"?Eo(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Eo(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),x1=jt(w1),E1=I({},du,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),rp=jt(E1),T1=I({},di,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ms}),A1=jt(T1),_1=I({},ll,{propertyName:0,elapsedTime:0,pseudoElement:0}),M1=jt(_1),z1=I({},du,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),N1=jt(z1),C1=I({},ll,{newState:0,oldState:0}),O1=jt(C1),$1=[9,13,27,32],hs=Ke&&"CompositionEvent"in window,Un=null;Ke&&"documentMode"in document&&(Un=document.documentMode);var R1=Ke&&"TextEvent"in window&&!Un,Xm=Ke&&(!hs||Un&&8<Un&&11>=Un),sp=" ",fp=!1;function Zm(t,e){switch(t){case"keyup":return $1.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Km(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var zl=!1;function U1(t,e){switch(t){case"compositionend":return Km(e);case"keypress":return e.which!==32?null:(fp=!0,sp);case"textInput":return t=e.data,t===sp&&fp?null:t;default:return null}}function D1(t,e){if(zl)return t==="compositionend"||!hs&&Zm(t,e)?(t=Qm(),xo=ps=pa=null,zl=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Xm&&e.locale!=="ko"?null:e.data;default:return null}}var L1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function dp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!L1[t.type]:e==="textarea"}function Jm(t,e,a,l){Ml?ql?ql.push(l):ql=[l]:Ml=l,e=lu(e,"onChange"),0<e.length&&(a=new fu("onChange","change",null,a,l),t.push({event:a,listeners:e}))}var Dn=null,Jn=null;function B1(t){Gg(t,0)}function pu(t){var e=On(t);if(Hm(e))return t}function pp(t,e){if(t==="change")return e}var Wm=!1;Ke&&(Ke?(co="oninput"in document,co||(Yc=document.createElement("div"),Yc.setAttribute("oninput","return;"),co=typeof Yc.oninput=="function"),uo=co):uo=!1,Wm=uo&&(!document.documentMode||9<document.documentMode));var uo,co,Yc;function mp(){Dn&&(Dn.detachEvent("onpropertychange",Fm),Jn=Dn=null)}function Fm(t){if(t.propertyName==="value"&&pu(Jn)){var e=[];Jm(e,Jn,t,ds(t)),Gm(B1,e)}}function q1(t,e,a){t==="focusin"?(mp(),Dn=e,Jn=a,Dn.attachEvent("onpropertychange",Fm)):t==="focusout"&&mp()}function H1(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return pu(Jn)}function Y1(t,e){if(t==="click")return pu(e)}function j1(t,e){if(t==="input"||t==="change")return pu(e)}function V1(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Ft=typeof Object.is=="function"?Object.is:V1;function Wn(t,e){if(Ft(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var a=Object.keys(t),l=Object.keys(e);if(a.length!==l.length)return!1;for(l=0;l<a.length;l++){var n=a[l];if(!yr.call(e,n)||!Ft(t[n],e[n]))return!1}return!0}function hp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function gp(t,e){var a=hp(t);t=0;for(var l;a;){if(a.nodeType===3){if(l=t+a.textContent.length,t<=e&&l>=e)return{node:a,offset:e-t};t=l}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=hp(a)}}function Im(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Im(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Pm(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=Ho(t.document);e instanceof t.HTMLIFrameElement;){try{var a=typeof e.contentWindow.location.href=="string"}catch{a=!1}if(a)t=e.contentWindow;else break;e=Ho(t.document)}return e}function gs(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var k1=Ke&&"documentMode"in document&&11>=document.documentMode,Nl=null,Tr=null,Ln=null,Ar=!1;function yp(t,e,a){var l=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Ar||Nl==null||Nl!==Ho(l)||(l=Nl,"selectionStart"in l&&gs(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),Ln&&Wn(Ln,l)||(Ln=l,l=lu(Tr,"onSelect"),0<l.length&&(e=new fu("onSelect","select",null,e,a),t.push({event:e,listeners:l}),e.target=Nl)))}function ja(t,e){var a={};return a[t.toLowerCase()]=e.toLowerCase(),a["Webkit"+t]="webkit"+e,a["Moz"+t]="moz"+e,a}var Cl={animationend:ja("Animation","AnimationEnd"),animationiteration:ja("Animation","AnimationIteration"),animationstart:ja("Animation","AnimationStart"),transitionrun:ja("Transition","TransitionRun"),transitionstart:ja("Transition","TransitionStart"),transitioncancel:ja("Transition","TransitionCancel"),transitionend:ja("Transition","TransitionEnd")},jc={},th={};Ke&&(th=document.createElement("div").style,"AnimationEvent"in window||(delete Cl.animationend.animation,delete Cl.animationiteration.animation,delete Cl.animationstart.animation),"TransitionEvent"in window||delete Cl.transitionend.transition);function nl(t){if(jc[t])return jc[t];if(!Cl[t])return t;var e=Cl[t],a;for(a in e)if(e.hasOwnProperty(a)&&a in th)return jc[t]=e[a];return t}var eh=nl("animationend"),ah=nl("animationiteration"),lh=nl("animationstart"),G1=nl("transitionrun"),Q1=nl("transitionstart"),X1=nl("transitioncancel"),nh=nl("transitionend"),ih=new Map,_r="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");_r.push("scrollEnd");function me(t,e){ih.set(t,e),al(e,[t])}var Yo=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},ae=[],Ol=0,ys=0;function mu(){for(var t=Ol,e=ys=Ol=0;e<t;){var a=ae[e];ae[e++]=null;var l=ae[e];ae[e++]=null;var n=ae[e];ae[e++]=null;var i=ae[e];if(ae[e++]=null,l!==null&&n!==null){var o=l.pending;o===null?n.next=n:(n.next=o.next,o.next=n),l.pending=n}i!==0&&oh(a,n,i)}}function hu(t,e,a,l){ae[Ol++]=t,ae[Ol++]=e,ae[Ol++]=a,ae[Ol++]=l,ys|=l,t.lanes|=l,t=t.alternate,t!==null&&(t.lanes|=l)}function vs(t,e,a,l){return hu(t,e,a,l),jo(t)}function il(t,e){return hu(t,null,null,e),jo(t)}function oh(t,e,a){t.lanes|=a;var l=t.alternate;l!==null&&(l.lanes|=a);for(var n=!1,i=t.return;i!==null;)i.childLanes|=a,l=i.alternate,l!==null&&(l.childLanes|=a),i.tag===22&&(t=i.stateNode,t===null||t._visibility&1||(n=!0)),t=i,i=i.return;return t.tag===3?(i=t.stateNode,n&&e!==null&&(n=31-Jt(a),t=i.hiddenUpdates,l=t[n],l===null?t[n]=[e]:l.push(e),e.lane=a|536870912),i):null}function jo(t){if(50<Qn)throw Qn=0,Zr=null,Error(w(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var $l={};function Z1(t,e,a,l){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Qt(t,e,a,l){return new Z1(t,e,a,l)}function bs(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Qe(t,e){var a=t.alternate;return a===null?(a=Qt(t.tag,e,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=e,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,e=t.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function uh(t,e){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,e=a.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function To(t,e,a,l,n,i){var o=0;if(l=t,typeof t=="function")bs(t)&&(o=1);else if(typeof t=="string")o=Wb(t,a,Me.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case pr:return t=Qt(31,a,e,n),t.elementType=pr,t.lanes=i,t;case Tl:return Za(a.children,n,i,e);case _m:o=8,n|=24;break;case sr:return t=Qt(12,a,e,n|2),t.elementType=sr,t.lanes=i,t;case fr:return t=Qt(13,a,e,n),t.elementType=fr,t.lanes=i,t;case dr:return t=Qt(19,a,e,n),t.elementType=dr,t.lanes=i,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Ve:o=10;break t;case Mm:o=9;break t;case is:o=11;break t;case os:o=14;break t;case oa:o=16,l=null;break t}o=29,a=Error(w(130,t===null?"null":typeof t,"")),l=null}return e=Qt(o,a,e,n),e.elementType=t,e.type=l,e.lanes=i,e}function Za(t,e,a,l){return t=Qt(7,t,l,e),t.lanes=a,t}function Vc(t,e,a){return t=Qt(6,t,null,e),t.lanes=a,t}function ch(t){var e=Qt(18,null,null,0);return e.stateNode=t,e}function kc(t,e,a){return e=Qt(4,t.children!==null?t.children:[],t.key,e),e.lanes=a,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var vp=new WeakMap;function ue(t,e){if(typeof t=="object"&&t!==null){var a=vp.get(t);return a!==void 0?a:(e={value:t,source:e,stack:Pd(e)},vp.set(t,e),e)}return{value:t,source:e,stack:Pd(e)}}var Rl=[],Ul=0,Vo=null,Fn=0,ne=[],ie=0,_a=null,Te=1,Ae="";function Ye(t,e){Rl[Ul++]=Fn,Rl[Ul++]=Vo,Vo=t,Fn=e}function rh(t,e,a){ne[ie++]=Te,ne[ie++]=Ae,ne[ie++]=_a,_a=t;var l=Te;t=Ae;var n=32-Jt(l)-1;l&=~(1<<n),a+=1;var i=32-Jt(e)+n;if(30<i){var o=n-n%5;i=(l&(1<<o)-1).toString(32),l>>=o,n-=o,Te=1<<32-Jt(e)+n|a<<n|l,Ae=i+t}else Te=1<<i|a<<n|l,Ae=t}function Ss(t){t.return!==null&&(Ye(t,1),rh(t,1,0))}function ws(t){for(;t===Vo;)Vo=Rl[--Ul],Rl[Ul]=null,Fn=Rl[--Ul],Rl[Ul]=null;for(;t===_a;)_a=ne[--ie],ne[ie]=null,Ae=ne[--ie],ne[ie]=null,Te=ne[--ie],ne[ie]=null}function sh(t,e){ne[ie++]=Te,ne[ie++]=Ae,ne[ie++]=_a,Te=e.id,Ae=e.overflow,_a=t}var wt=null,F=null,B=!1,va=null,ce=!1,Mr=Error(w(519));function Ma(t){var e=Error(w(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw In(ue(e,t)),Mr}function bp(t){var e=t.stateNode,a=t.type,l=t.memoizedProps;switch(e[St]=t,e[Yt]=l,a){case"dialog":R("cancel",e),R("close",e);break;case"iframe":case"object":case"embed":R("load",e);break;case"video":case"audio":for(a=0;a<ai.length;a++)R(ai[a],e);break;case"source":R("error",e);break;case"img":case"image":case"link":R("error",e),R("load",e);break;case"details":R("toggle",e);break;case"input":R("invalid",e),Ym(e,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":R("invalid",e);break;case"textarea":R("invalid",e),Vm(e,l.value,l.defaultValue,l.children)}a=l.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||e.textContent===""+a||l.suppressHydrationWarning===!0||Xg(e.textContent,a)?(l.popover!=null&&(R("beforetoggle",e),R("toggle",e)),l.onScroll!=null&&R("scroll",e),l.onScrollEnd!=null&&R("scrollend",e),l.onClick!=null&&(e.onclick=ke),e=!0):e=!1,e||Ma(t,!0)}function Sp(t){for(wt=t.return;wt;)switch(wt.tag){case 5:case 31:case 13:ce=!1;return;case 27:case 3:ce=!0;return;default:wt=wt.return}}function Sl(t){if(t!==wt)return!1;if(!B)return Sp(t),B=!0,!1;var e=t.tag,a;if((a=e!==3&&e!==27)&&((a=e===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||Ir(t.type,t.memoizedProps)),a=!a),a&&F&&Ma(t),Sp(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(w(317));F=cm(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(w(317));F=cm(t)}else e===27?(e=F,Oa(t.type)?(t=as,as=null,F=t):F=e):F=wt?se(t.stateNode.nextSibling):null;return!0}function Fa(){F=wt=null,B=!1}function Gc(){var t=va;return t!==null&&(qt===null?qt=t:qt.push.apply(qt,t),va=null),t}function In(t){va===null?va=[t]:va.push(t)}var zr=ze(null),ol=null,Ge=null;function ca(t,e,a){K(zr,e._currentValue),e._currentValue=a}function Xe(t){t._currentValue=zr.current,yt(zr)}function Nr(t,e,a){for(;t!==null;){var l=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,l!==null&&(l.childLanes|=e)):l!==null&&(l.childLanes&e)!==e&&(l.childLanes|=e),t===a)break;t=t.return}}function Cr(t,e,a,l){var n=t.child;for(n!==null&&(n.return=t);n!==null;){var i=n.dependencies;if(i!==null){var o=n.child;i=i.firstContext;t:for(;i!==null;){var u=i;i=n;for(var r=0;r<e.length;r++)if(u.context===e[r]){i.lanes|=a,u=i.alternate,u!==null&&(u.lanes|=a),Nr(i.return,a,t),l||(o=null);break t}i=u.next}}else if(n.tag===18){if(o=n.return,o===null)throw Error(w(341));o.lanes|=a,i=o.alternate,i!==null&&(i.lanes|=a),Nr(o,a,t),o=null}else o=n.child;if(o!==null)o.return=n;else for(o=n;o!==null;){if(o===t){o=null;break}if(n=o.sibling,n!==null){n.return=o.return,o=n;break}o=o.return}n=o}}function an(t,e,a,l){t=null;for(var n=e,i=!1;n!==null;){if(!i){if((n.flags&524288)!==0)i=!0;else if((n.flags&262144)!==0)break}if(n.tag===10){var o=n.alternate;if(o===null)throw Error(w(387));if(o=o.memoizedProps,o!==null){var u=n.type;Ft(n.pendingProps.value,o.value)||(t!==null?t.push(u):t=[u])}}else if(n===Do.current){if(o=n.alternate,o===null)throw Error(w(387));o.memoizedState.memoizedState!==n.memoizedState.memoizedState&&(t!==null?t.push(ni):t=[ni])}n=n.return}t!==null&&Cr(e,t,a,l),e.flags|=262144}function ko(t){for(t=t.firstContext;t!==null;){if(!Ft(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Ia(t){ol=t,Ge=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function xt(t){return fh(ol,t)}function ro(t,e){return ol===null&&Ia(t),fh(t,e)}function fh(t,e){var a=e._currentValue;if(e={context:e,memoizedValue:a,next:null},Ge===null){if(t===null)throw Error(w(308));Ge=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Ge=Ge.next=e;return a}var K1=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(a,l){t.push(l)}};this.abort=function(){e.aborted=!0,t.forEach(function(a){return a()})}},J1=pt.unstable_scheduleCallback,W1=pt.unstable_NormalPriority,st={$$typeof:Ve,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function xs(){return{controller:new K1,data:new Map,refCount:0}}function pi(t){t.refCount--,t.refCount===0&&J1(W1,function(){t.controller.abort()})}var Bn=null,Or=0,Xl=0,Hl=null;function F1(t,e){if(Bn===null){var a=Bn=[];Or=0,Xl=Zs(),Hl={status:"pending",value:void 0,then:function(l){a.push(l)}}}return Or++,e.then(wp,wp),e}function wp(){if(--Or===0&&Bn!==null){Hl!==null&&(Hl.status="fulfilled");var t=Bn;Bn=null,Xl=0,Hl=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function I1(t,e){var a=[],l={status:"pending",value:null,reason:null,then:function(n){a.push(n)}};return t.then(function(){l.status="fulfilled",l.value=e;for(var n=0;n<a.length;n++)(0,a[n])(e)},function(n){for(l.status="rejected",l.reason=n,n=0;n<a.length;n++)(0,a[n])(void 0)}),l}var xp=z.S;z.S=function(t,e){Ag=Zt(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&F1(t,e),xp!==null&&xp(t,e)};var Ka=ze(null);function Es(){var t=Ka.current;return t!==null?t:X.pooledCache}function Ao(t,e){e===null?K(Ka,Ka.current):K(Ka,e.pool)}function dh(){var t=Es();return t===null?null:{parent:st._currentValue,pool:t}}var ln=Error(w(460)),Ts=Error(w(474)),gu=Error(w(542)),Go={then:function(){}};function Ep(t){return t=t.status,t==="fulfilled"||t==="rejected"}function ph(t,e,a){switch(a=t[a],a===void 0?t.push(e):a!==e&&(e.then(ke,ke),e=a),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Ap(t),t;default:if(typeof e.status=="string")e.then(ke,ke);else{if(t=X,t!==null&&100<t.shellSuspendCounter)throw Error(w(482));t=e,t.status="pending",t.then(function(l){if(e.status==="pending"){var n=e;n.status="fulfilled",n.value=l}},function(l){if(e.status==="pending"){var n=e;n.status="rejected",n.reason=l}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Ap(t),t}throw Ja=e,ln}}function Ga(t){try{var e=t._init;return e(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Ja=a,ln):a}}var Ja=null;function Tp(){if(Ja===null)throw Error(w(459));var t=Ja;return Ja=null,t}function Ap(t){if(t===ln||t===gu)throw Error(w(483))}var Yl=null,Pn=0;function so(t){var e=Pn;return Pn+=1,Yl===null&&(Yl=[]),ph(Yl,t,e)}function Tn(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function fo(t,e){throw e.$$typeof===qv?Error(w(525)):(t=Object.prototype.toString.call(e),Error(w(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function mh(t){function e(f,s){if(t){var g=f.deletions;g===null?(f.deletions=[s],f.flags|=16):g.push(s)}}function a(f,s){if(!t)return null;for(;s!==null;)e(f,s),s=s.sibling;return null}function l(f){for(var s=new Map;f!==null;)f.key!==null?s.set(f.key,f):s.set(f.index,f),f=f.sibling;return s}function n(f,s){return f=Qe(f,s),f.index=0,f.sibling=null,f}function i(f,s,g){return f.index=g,t?(g=f.alternate,g!==null?(g=g.index,g<s?(f.flags|=67108866,s):g):(f.flags|=67108866,s)):(f.flags|=1048576,s)}function o(f){return t&&f.alternate===null&&(f.flags|=67108866),f}function u(f,s,g,b){return s===null||s.tag!==6?(s=Vc(g,f.mode,b),s.return=f,s):(s=n(s,g),s.return=f,s)}function r(f,s,g,b){var A=g.type;return A===Tl?h(f,s,g.props.children,b,g.key):s!==null&&(s.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===oa&&Ga(A)===s.type)?(s=n(s,g.props),Tn(s,g),s.return=f,s):(s=To(g.type,g.key,g.props,null,f.mode,b),Tn(s,g),s.return=f,s)}function p(f,s,g,b){return s===null||s.tag!==4||s.stateNode.containerInfo!==g.containerInfo||s.stateNode.implementation!==g.implementation?(s=kc(g,f.mode,b),s.return=f,s):(s=n(s,g.children||[]),s.return=f,s)}function h(f,s,g,b,A){return s===null||s.tag!==7?(s=Za(g,f.mode,b,A),s.return=f,s):(s=n(s,g),s.return=f,s)}function v(f,s,g){if(typeof s=="string"&&s!==""||typeof s=="number"||typeof s=="bigint")return s=Vc(""+s,f.mode,g),s.return=f,s;if(typeof s=="object"&&s!==null){switch(s.$$typeof){case eo:return g=To(s.type,s.key,s.props,null,f.mode,g),Tn(g,s),g.return=f,g;case Nn:return s=kc(s,f.mode,g),s.return=f,s;case oa:return s=Ga(s),v(f,s,g)}if(Cn(s)||xn(s))return s=Za(s,f.mode,g,null),s.return=f,s;if(typeof s.then=="function")return v(f,so(s),g);if(s.$$typeof===Ve)return v(f,ro(f,s),g);fo(f,s)}return null}function m(f,s,g,b){var A=s!==null?s.key:null;if(typeof g=="string"&&g!==""||typeof g=="number"||typeof g=="bigint")return A!==null?null:u(f,s,""+g,b);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case eo:return g.key===A?r(f,s,g,b):null;case Nn:return g.key===A?p(f,s,g,b):null;case oa:return g=Ga(g),m(f,s,g,b)}if(Cn(g)||xn(g))return A!==null?null:h(f,s,g,b,null);if(typeof g.then=="function")return m(f,s,so(g),b);if(g.$$typeof===Ve)return m(f,s,ro(f,g),b);fo(f,g)}return null}function y(f,s,g,b,A){if(typeof b=="string"&&b!==""||typeof b=="number"||typeof b=="bigint")return f=f.get(g)||null,u(s,f,""+b,A);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case eo:return f=f.get(b.key===null?g:b.key)||null,r(s,f,b,A);case Nn:return f=f.get(b.key===null?g:b.key)||null,p(s,f,b,A);case oa:return b=Ga(b),y(f,s,g,b,A)}if(Cn(b)||xn(b))return f=f.get(g)||null,h(s,f,b,A,null);if(typeof b.then=="function")return y(f,s,g,so(b),A);if(b.$$typeof===Ve)return y(f,s,g,ro(s,b),A);fo(s,b)}return null}function E(f,s,g,b){for(var A=null,q=null,T=s,$=s=0,D=null;T!==null&&$<g.length;$++){T.index>$?(D=T,T=null):D=T.sibling;var H=m(f,T,g[$],b);if(H===null){T===null&&(T=D);break}t&&T&&H.alternate===null&&e(f,T),s=i(H,s,$),q===null?A=H:q.sibling=H,q=H,T=D}if($===g.length)return a(f,T),B&&Ye(f,$),A;if(T===null){for(;$<g.length;$++)T=v(f,g[$],b),T!==null&&(s=i(T,s,$),q===null?A=T:q.sibling=T,q=T);return B&&Ye(f,$),A}for(T=l(T);$<g.length;$++)D=y(T,f,$,g[$],b),D!==null&&(t&&D.alternate!==null&&T.delete(D.key===null?$:D.key),s=i(D,s,$),q===null?A=D:q.sibling=D,q=D);return t&&T.forEach(function(aa){return e(f,aa)}),B&&Ye(f,$),A}function _(f,s,g,b){if(g==null)throw Error(w(151));for(var A=null,q=null,T=s,$=s=0,D=null,H=g.next();T!==null&&!H.done;$++,H=g.next()){T.index>$?(D=T,T=null):D=T.sibling;var aa=m(f,T,H.value,b);if(aa===null){T===null&&(T=D);break}t&&T&&aa.alternate===null&&e(f,T),s=i(aa,s,$),q===null?A=aa:q.sibling=aa,q=aa,T=D}if(H.done)return a(f,T),B&&Ye(f,$),A;if(T===null){for(;!H.done;$++,H=g.next())H=v(f,H.value,b),H!==null&&(s=i(H,s,$),q===null?A=H:q.sibling=H,q=H);return B&&Ye(f,$),A}for(T=l(T);!H.done;$++,H=g.next())H=y(T,f,$,H.value,b),H!==null&&(t&&H.alternate!==null&&T.delete(H.key===null?$:H.key),s=i(H,s,$),q===null?A=H:q.sibling=H,q=H);return t&&T.forEach(function(ov){return e(f,ov)}),B&&Ye(f,$),A}function C(f,s,g,b){if(typeof g=="object"&&g!==null&&g.type===Tl&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case eo:t:{for(var A=g.key;s!==null;){if(s.key===A){if(A=g.type,A===Tl){if(s.tag===7){a(f,s.sibling),b=n(s,g.props.children),b.return=f,f=b;break t}}else if(s.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===oa&&Ga(A)===s.type){a(f,s.sibling),b=n(s,g.props),Tn(b,g),b.return=f,f=b;break t}a(f,s);break}else e(f,s);s=s.sibling}g.type===Tl?(b=Za(g.props.children,f.mode,b,g.key),b.return=f,f=b):(b=To(g.type,g.key,g.props,null,f.mode,b),Tn(b,g),b.return=f,f=b)}return o(f);case Nn:t:{for(A=g.key;s!==null;){if(s.key===A)if(s.tag===4&&s.stateNode.containerInfo===g.containerInfo&&s.stateNode.implementation===g.implementation){a(f,s.sibling),b=n(s,g.children||[]),b.return=f,f=b;break t}else{a(f,s);break}else e(f,s);s=s.sibling}b=kc(g,f.mode,b),b.return=f,f=b}return o(f);case oa:return g=Ga(g),C(f,s,g,b)}if(Cn(g))return E(f,s,g,b);if(xn(g)){if(A=xn(g),typeof A!="function")throw Error(w(150));return g=A.call(g),_(f,s,g,b)}if(typeof g.then=="function")return C(f,s,so(g),b);if(g.$$typeof===Ve)return C(f,s,ro(f,g),b);fo(f,g)}return typeof g=="string"&&g!==""||typeof g=="number"||typeof g=="bigint"?(g=""+g,s!==null&&s.tag===6?(a(f,s.sibling),b=n(s,g),b.return=f,f=b):(a(f,s),b=Vc(g,f.mode,b),b.return=f,f=b),o(f)):a(f,s)}return function(f,s,g,b){try{Pn=0;var A=C(f,s,g,b);return Yl=null,A}catch(T){if(T===ln||T===gu)throw T;var q=Qt(29,T,null,f.mode);return q.lanes=b,q.return=f,q}finally{}}}var Pa=mh(!0),hh=mh(!1),ua=!1;function As(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function $r(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function ba(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Sa(t,e,a){var l=t.updateQueue;if(l===null)return null;if(l=l.shared,(Y&2)!==0){var n=l.pending;return n===null?e.next=e:(e.next=n.next,n.next=e),l.pending=e,e=jo(t),oh(t,null,a),e}return hu(t,l,e,a),jo(t)}function qn(t,e,a){if(e=e.updateQueue,e!==null&&(e=e.shared,(a&4194048)!==0)){var l=e.lanes;l&=t.pendingLanes,a|=l,e.lanes=a,Rm(t,a)}}function Qc(t,e){var a=t.updateQueue,l=t.alternate;if(l!==null&&(l=l.updateQueue,a===l)){var n=null,i=null;if(a=a.firstBaseUpdate,a!==null){do{var o={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};i===null?n=i=o:i=i.next=o,a=a.next}while(a!==null);i===null?n=i=e:i=i.next=e}else n=i=e;a={baseState:l.baseState,firstBaseUpdate:n,lastBaseUpdate:i,shared:l.shared,callbacks:l.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=e:t.next=e,a.lastBaseUpdate=e}var Rr=!1;function Hn(){if(Rr){var t=Hl;if(t!==null)throw t}}function Yn(t,e,a,l){Rr=!1;var n=t.updateQueue;ua=!1;var i=n.firstBaseUpdate,o=n.lastBaseUpdate,u=n.shared.pending;if(u!==null){n.shared.pending=null;var r=u,p=r.next;r.next=null,o===null?i=p:o.next=p,o=r;var h=t.alternate;h!==null&&(h=h.updateQueue,u=h.lastBaseUpdate,u!==o&&(u===null?h.firstBaseUpdate=p:u.next=p,h.lastBaseUpdate=r))}if(i!==null){var v=n.baseState;o=0,h=p=r=null,u=i;do{var m=u.lane&-536870913,y=m!==u.lane;if(y?(L&m)===m:(l&m)===m){m!==0&&m===Xl&&(Rr=!0),h!==null&&(h=h.next={lane:0,tag:u.tag,payload:u.payload,callback:null,next:null});t:{var E=t,_=u;m=e;var C=a;switch(_.tag){case 1:if(E=_.payload,typeof E=="function"){v=E.call(C,v,m);break t}v=E;break t;case 3:E.flags=E.flags&-65537|128;case 0:if(E=_.payload,m=typeof E=="function"?E.call(C,v,m):E,m==null)break t;v=I({},v,m);break t;case 2:ua=!0}}m=u.callback,m!==null&&(t.flags|=64,y&&(t.flags|=8192),y=n.callbacks,y===null?n.callbacks=[m]:y.push(m))}else y={lane:m,tag:u.tag,payload:u.payload,callback:u.callback,next:null},h===null?(p=h=y,r=v):h=h.next=y,o|=m;if(u=u.next,u===null){if(u=n.shared.pending,u===null)break;y=u,u=y.next,y.next=null,n.lastBaseUpdate=y,n.shared.pending=null}}while(!0);h===null&&(r=v),n.baseState=r,n.firstBaseUpdate=p,n.lastBaseUpdate=h,i===null&&(n.shared.lanes=0),Na|=o,t.lanes=o,t.memoizedState=v}}function gh(t,e){if(typeof t!="function")throw Error(w(191,t));t.call(e)}function yh(t,e){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)gh(a[t],e)}var Zl=ze(null),Qo=ze(0);function _p(t,e){t=Ie,K(Qo,t),K(Zl,e),Ie=t|e.baseLanes}function Ur(){K(Qo,Ie),K(Zl,Zl.current)}function _s(){Ie=Qo.current,yt(Zl),yt(Qo)}var It=ze(null),re=null;function ra(t){var e=t.alternate;K(it,it.current&1),K(It,t),re===null&&(e===null||Zl.current!==null||e.memoizedState!==null)&&(re=t)}function Dr(t){K(it,it.current),K(It,t),re===null&&(re=t)}function vh(t){t.tag===22?(K(it,it.current),K(It,t),re===null&&(re=t)):sa(t)}function sa(){K(it,it.current),K(It,It.current)}function Gt(t){yt(It),re===t&&(re=null),yt(it)}var it=ze(0);function Xo(t){for(var e=t;e!==null;){if(e.tag===13){var a=e.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||ts(a)||es(a)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Je=0,O=null,Q=null,ct=null,Zo=!1,jl=!1,tl=!1,Ko=0,ti=0,Vl=null,P1=0;function lt(){throw Error(w(321))}function Ms(t,e){if(e===null)return!1;for(var a=0;a<e.length&&a<t.length;a++)if(!Ft(t[a],e[a]))return!1;return!0}function zs(t,e,a,l,n,i){return Je=i,O=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,z.H=t===null||t.memoizedState===null?Jh:Hs,tl=!1,i=a(l,n),tl=!1,jl&&(i=Sh(e,a,l,n)),bh(t),i}function bh(t){z.H=ei;var e=Q!==null&&Q.next!==null;if(Je=0,ct=Q=O=null,Zo=!1,ti=0,Vl=null,e)throw Error(w(300));t===null||ft||(t=t.dependencies,t!==null&&ko(t)&&(ft=!0))}function Sh(t,e,a,l){O=t;var n=0;do{if(jl&&(Vl=null),ti=0,jl=!1,25<=n)throw Error(w(301));if(n+=1,ct=Q=null,t.updateQueue!=null){var i=t.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}z.H=Wh,i=e(a,l)}while(jl);return i}function tb(){var t=z.H,e=t.useState()[0];return e=typeof e.then=="function"?mi(e):e,t=t.useState()[0],(Q!==null?Q.memoizedState:null)!==t&&(O.flags|=1024),e}function Ns(){var t=Ko!==0;return Ko=0,t}function Cs(t,e,a){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~a}function Os(t){if(Zo){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}Zo=!1}Je=0,ct=Q=O=null,jl=!1,ti=Ko=0,Vl=null}function Ot(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ct===null?O.memoizedState=ct=t:ct=ct.next=t,ct}function ot(){if(Q===null){var t=O.alternate;t=t!==null?t.memoizedState:null}else t=Q.next;var e=ct===null?O.memoizedState:ct.next;if(e!==null)ct=e,Q=t;else{if(t===null)throw O.alternate===null?Error(w(467)):Error(w(310));Q=t,t={memoizedState:Q.memoizedState,baseState:Q.baseState,baseQueue:Q.baseQueue,queue:Q.queue,next:null},ct===null?O.memoizedState=ct=t:ct=ct.next=t}return ct}function yu(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function mi(t){var e=ti;return ti+=1,Vl===null&&(Vl=[]),t=ph(Vl,t,e),e=O,(ct===null?e.memoizedState:ct.next)===null&&(e=e.alternate,z.H=e===null||e.memoizedState===null?Jh:Hs),t}function vu(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return mi(t);if(t.$$typeof===Ve)return xt(t)}throw Error(w(438,String(t)))}function $s(t){var e=null,a=O.updateQueue;if(a!==null&&(e=a.memoCache),e==null){var l=O.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(e={data:l.data.map(function(n){return n.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),a===null&&(a=yu(),O.updateQueue=a),a.memoCache=e,a=e.data[e.index],a===void 0)for(a=e.data[e.index]=Array(t),l=0;l<t;l++)a[l]=Hv;return e.index++,a}function We(t,e){return typeof e=="function"?e(t):e}function _o(t){var e=ot();return Rs(e,Q,t)}function Rs(t,e,a){var l=t.queue;if(l===null)throw Error(w(311));l.lastRenderedReducer=a;var n=t.baseQueue,i=l.pending;if(i!==null){if(n!==null){var o=n.next;n.next=i.next,i.next=o}e.baseQueue=n=i,l.pending=null}if(i=t.baseState,n===null)t.memoizedState=i;else{e=n.next;var u=o=null,r=null,p=e,h=!1;do{var v=p.lane&-536870913;if(v!==p.lane?(L&v)===v:(Je&v)===v){var m=p.revertLane;if(m===0)r!==null&&(r=r.next={lane:0,revertLane:0,gesture:null,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null}),v===Xl&&(h=!0);else if((Je&m)===m){p=p.next,m===Xl&&(h=!0);continue}else v={lane:0,revertLane:p.revertLane,gesture:null,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null},r===null?(u=r=v,o=i):r=r.next=v,O.lanes|=m,Na|=m;v=p.action,tl&&a(i,v),i=p.hasEagerState?p.eagerState:a(i,v)}else m={lane:v,revertLane:p.revertLane,gesture:p.gesture,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null},r===null?(u=r=m,o=i):r=r.next=m,O.lanes|=v,Na|=v;p=p.next}while(p!==null&&p!==e);if(r===null?o=i:r.next=u,!Ft(i,t.memoizedState)&&(ft=!0,h&&(a=Hl,a!==null)))throw a;t.memoizedState=i,t.baseState=o,t.baseQueue=r,l.lastRenderedState=i}return n===null&&(l.lanes=0),[t.memoizedState,l.dispatch]}function Xc(t){var e=ot(),a=e.queue;if(a===null)throw Error(w(311));a.lastRenderedReducer=t;var l=a.dispatch,n=a.pending,i=e.memoizedState;if(n!==null){a.pending=null;var o=n=n.next;do i=t(i,o.action),o=o.next;while(o!==n);Ft(i,e.memoizedState)||(ft=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),a.lastRenderedState=i}return[i,l]}function wh(t,e,a){var l=O,n=ot(),i=B;if(i){if(a===void 0)throw Error(w(407));a=a()}else a=e();var o=!Ft((Q||n).memoizedState,a);if(o&&(n.memoizedState=a,ft=!0),n=n.queue,Us(Th.bind(null,l,n,t),[t]),n.getSnapshot!==e||o||ct!==null&&ct.memoizedState.tag&1){if(l.flags|=2048,Kl(9,{destroy:void 0},Eh.bind(null,l,n,a,e),null),X===null)throw Error(w(349));i||(Je&127)!==0||xh(l,e,a)}return a}function xh(t,e,a){t.flags|=16384,t={getSnapshot:e,value:a},e=O.updateQueue,e===null?(e=yu(),O.updateQueue=e,e.stores=[t]):(a=e.stores,a===null?e.stores=[t]:a.push(t))}function Eh(t,e,a,l){e.value=a,e.getSnapshot=l,Ah(e)&&_h(t)}function Th(t,e,a){return a(function(){Ah(e)&&_h(t)})}function Ah(t){var e=t.getSnapshot;t=t.value;try{var a=e();return!Ft(t,a)}catch{return!0}}function _h(t){var e=il(t,2);e!==null&&Ht(e,t,2)}function Lr(t){var e=Ot();if(typeof t=="function"){var a=t;if(t=a(),tl){da(!0);try{a()}finally{da(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:We,lastRenderedState:t},e}function Mh(t,e,a,l){return t.baseState=a,Rs(t,Q,typeof l=="function"?l:We)}function eb(t,e,a,l,n){if(Su(t))throw Error(w(485));if(t=e.action,t!==null){var i={payload:n,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(o){i.listeners.push(o)}};z.T!==null?a(!0):i.isTransition=!1,l(i),a=e.pending,a===null?(i.next=e.pending=i,zh(e,i)):(i.next=a.next,e.pending=a.next=i)}}function zh(t,e){var a=e.action,l=e.payload,n=t.state;if(e.isTransition){var i=z.T,o={};z.T=o;try{var u=a(n,l),r=z.S;r!==null&&r(o,u),Mp(t,e,u)}catch(p){Br(t,e,p)}finally{i!==null&&o.types!==null&&(i.types=o.types),z.T=i}}else try{i=a(n,l),Mp(t,e,i)}catch(p){Br(t,e,p)}}function Mp(t,e,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(l){zp(t,e,l)},function(l){return Br(t,e,l)}):zp(t,e,a)}function zp(t,e,a){e.status="fulfilled",e.value=a,Nh(e),t.state=a,e=t.pending,e!==null&&(a=e.next,a===e?t.pending=null:(a=a.next,e.next=a,zh(t,a)))}function Br(t,e,a){var l=t.pending;if(t.pending=null,l!==null){l=l.next;do e.status="rejected",e.reason=a,Nh(e),e=e.next;while(e!==l)}t.action=null}function Nh(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Ch(t,e){return e}function Np(t,e){if(B){var a=X.formState;if(a!==null){t:{var l=O;if(B){if(F){e:{for(var n=F,i=ce;n.nodeType!==8;){if(!i){n=null;break e}if(n=se(n.nextSibling),n===null){n=null;break e}}i=n.data,n=i==="F!"||i==="F"?n:null}if(n){F=se(n.nextSibling),l=n.data==="F!";break t}}Ma(l)}l=!1}l&&(e=a[0])}}return a=Ot(),a.memoizedState=a.baseState=e,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ch,lastRenderedState:e},a.queue=l,a=Xh.bind(null,O,l),l.dispatch=a,l=Lr(!1),i=qs.bind(null,O,!1,l.queue),l=Ot(),n={state:e,dispatch:null,action:t,pending:null},l.queue=n,a=eb.bind(null,O,n,i,a),n.dispatch=a,l.memoizedState=t,[e,a,!1]}function Cp(t){var e=ot();return Oh(e,Q,t)}function Oh(t,e,a){if(e=Rs(t,e,Ch)[0],t=_o(We)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var l=mi(e)}catch(o){throw o===ln?gu:o}else l=e;e=ot();var n=e.queue,i=n.dispatch;return a!==e.memoizedState&&(O.flags|=2048,Kl(9,{destroy:void 0},ab.bind(null,n,a),null)),[l,i,t]}function ab(t,e){t.action=e}function Op(t){var e=ot(),a=Q;if(a!==null)return Oh(e,a,t);ot(),e=e.memoizedState,a=ot();var l=a.queue.dispatch;return a.memoizedState=t,[e,l,!1]}function Kl(t,e,a,l){return t={tag:t,create:a,deps:l,inst:e,next:null},e=O.updateQueue,e===null&&(e=yu(),O.updateQueue=e),a=e.lastEffect,a===null?e.lastEffect=t.next=t:(l=a.next,a.next=t,t.next=l,e.lastEffect=t),t}function $h(){return ot().memoizedState}function Mo(t,e,a,l){var n=Ot();O.flags|=t,n.memoizedState=Kl(1|e,{destroy:void 0},a,l===void 0?null:l)}function bu(t,e,a,l){var n=ot();l=l===void 0?null:l;var i=n.memoizedState.inst;Q!==null&&l!==null&&Ms(l,Q.memoizedState.deps)?n.memoizedState=Kl(e,i,a,l):(O.flags|=t,n.memoizedState=Kl(1|e,i,a,l))}function $p(t,e){Mo(8390656,8,t,e)}function Us(t,e){bu(2048,8,t,e)}function lb(t){O.flags|=4;var e=O.updateQueue;if(e===null)e=yu(),O.updateQueue=e,e.events=[t];else{var a=e.events;a===null?e.events=[t]:a.push(t)}}function Rh(t){var e=ot().memoizedState;return lb({ref:e,nextImpl:t}),function(){if((Y&2)!==0)throw Error(w(440));return e.impl.apply(void 0,arguments)}}function Uh(t,e){return bu(4,2,t,e)}function Dh(t,e){return bu(4,4,t,e)}function Lh(t,e){if(typeof e=="function"){t=t();var a=e(t);return function(){typeof a=="function"?a():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Bh(t,e,a){a=a!=null?a.concat([t]):null,bu(4,4,Lh.bind(null,e,t),a)}function Ds(){}function qh(t,e){var a=ot();e=e===void 0?null:e;var l=a.memoizedState;return e!==null&&Ms(e,l[1])?l[0]:(a.memoizedState=[t,e],t)}function Hh(t,e){var a=ot();e=e===void 0?null:e;var l=a.memoizedState;if(e!==null&&Ms(e,l[1]))return l[0];if(l=t(),tl){da(!0);try{t()}finally{da(!1)}}return a.memoizedState=[l,e],l}function Ls(t,e,a){return a===void 0||(Je&1073741824)!==0&&(L&261930)===0?t.memoizedState=e:(t.memoizedState=a,t=Mg(),O.lanes|=t,Na|=t,a)}function Yh(t,e,a,l){return Ft(a,e)?a:Zl.current!==null?(t=Ls(t,a,l),Ft(t,e)||(ft=!0),t):(Je&42)===0||(Je&1073741824)!==0&&(L&261930)===0?(ft=!0,t.memoizedState=a):(t=Mg(),O.lanes|=t,Na|=t,e)}function jh(t,e,a,l,n){var i=j.p;j.p=i!==0&&8>i?i:8;var o=z.T,u={};z.T=u,qs(t,!1,e,a);try{var r=n(),p=z.S;if(p!==null&&p(u,r),r!==null&&typeof r=="object"&&typeof r.then=="function"){var h=I1(r,l);jn(t,e,h,Wt(t))}else jn(t,e,l,Wt(t))}catch(v){jn(t,e,{then:function(){},status:"rejected",reason:v},Wt())}finally{j.p=i,o!==null&&u.types!==null&&(o.types=u.types),z.T=o}}function nb(){}function qr(t,e,a,l){if(t.tag!==5)throw Error(w(476));var n=Vh(t).queue;jh(t,n,e,Xa,a===null?nb:function(){return kh(t),a(l)})}function Vh(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:Xa,baseState:Xa,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:We,lastRenderedState:Xa},next:null};var a={};return e.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:We,lastRenderedState:a},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function kh(t){var e=Vh(t);e.next===null&&(e=t.alternate.memoizedState),jn(t,e.next.queue,{},Wt())}function Bs(){return xt(ni)}function Gh(){return ot().memoizedState}function Qh(){return ot().memoizedState}function ib(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var a=Wt();t=ba(a);var l=Sa(e,t,a);l!==null&&(Ht(l,e,a),qn(l,e,a)),e={cache:xs()},t.payload=e;return}e=e.return}}function ob(t,e,a){var l=Wt();a={lane:l,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Su(t)?Zh(e,a):(a=vs(t,e,a,l),a!==null&&(Ht(a,t,l),Kh(a,e,l)))}function Xh(t,e,a){var l=Wt();jn(t,e,a,l)}function jn(t,e,a,l){var n={lane:l,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Su(t))Zh(e,n);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var o=e.lastRenderedState,u=i(o,a);if(n.hasEagerState=!0,n.eagerState=u,Ft(u,o))return hu(t,e,n,0),X===null&&mu(),!1}catch{}finally{}if(a=vs(t,e,n,l),a!==null)return Ht(a,t,l),Kh(a,e,l),!0}return!1}function qs(t,e,a,l){if(l={lane:2,revertLane:Zs(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},Su(t)){if(e)throw Error(w(479))}else e=vs(t,a,l,2),e!==null&&Ht(e,t,2)}function Su(t){var e=t.alternate;return t===O||e!==null&&e===O}function Zh(t,e){jl=Zo=!0;var a=t.pending;a===null?e.next=e:(e.next=a.next,a.next=e),t.pending=e}function Kh(t,e,a){if((a&4194048)!==0){var l=e.lanes;l&=t.pendingLanes,a|=l,e.lanes=a,Rm(t,a)}}var ei={readContext:xt,use:vu,useCallback:lt,useContext:lt,useEffect:lt,useImperativeHandle:lt,useLayoutEffect:lt,useInsertionEffect:lt,useMemo:lt,useReducer:lt,useRef:lt,useState:lt,useDebugValue:lt,useDeferredValue:lt,useTransition:lt,useSyncExternalStore:lt,useId:lt,useHostTransitionStatus:lt,useFormState:lt,useActionState:lt,useOptimistic:lt,useMemoCache:lt,useCacheRefresh:lt};ei.useEffectEvent=lt;var Jh={readContext:xt,use:vu,useCallback:function(t,e){return Ot().memoizedState=[t,e===void 0?null:e],t},useContext:xt,useEffect:$p,useImperativeHandle:function(t,e,a){a=a!=null?a.concat([t]):null,Mo(4194308,4,Lh.bind(null,e,t),a)},useLayoutEffect:function(t,e){return Mo(4194308,4,t,e)},useInsertionEffect:function(t,e){Mo(4,2,t,e)},useMemo:function(t,e){var a=Ot();e=e===void 0?null:e;var l=t();if(tl){da(!0);try{t()}finally{da(!1)}}return a.memoizedState=[l,e],l},useReducer:function(t,e,a){var l=Ot();if(a!==void 0){var n=a(e);if(tl){da(!0);try{a(e)}finally{da(!1)}}}else n=e;return l.memoizedState=l.baseState=n,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:n},l.queue=t,t=t.dispatch=ob.bind(null,O,t),[l.memoizedState,t]},useRef:function(t){var e=Ot();return t={current:t},e.memoizedState=t},useState:function(t){t=Lr(t);var e=t.queue,a=Xh.bind(null,O,e);return e.dispatch=a,[t.memoizedState,a]},useDebugValue:Ds,useDeferredValue:function(t,e){var a=Ot();return Ls(a,t,e)},useTransition:function(){var t=Lr(!1);return t=jh.bind(null,O,t.queue,!0,!1),Ot().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,a){var l=O,n=Ot();if(B){if(a===void 0)throw Error(w(407));a=a()}else{if(a=e(),X===null)throw Error(w(349));(L&127)!==0||xh(l,e,a)}n.memoizedState=a;var i={value:a,getSnapshot:e};return n.queue=i,$p(Th.bind(null,l,i,t),[t]),l.flags|=2048,Kl(9,{destroy:void 0},Eh.bind(null,l,i,a,e),null),a},useId:function(){var t=Ot(),e=X.identifierPrefix;if(B){var a=Ae,l=Te;a=(l&~(1<<32-Jt(l)-1)).toString(32)+a,e="_"+e+"R_"+a,a=Ko++,0<a&&(e+="H"+a.toString(32)),e+="_"}else a=P1++,e="_"+e+"r_"+a.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:Bs,useFormState:Np,useActionState:Np,useOptimistic:function(t){var e=Ot();e.memoizedState=e.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=a,e=qs.bind(null,O,!0,a),a.dispatch=e,[t,e]},useMemoCache:$s,useCacheRefresh:function(){return Ot().memoizedState=ib.bind(null,O)},useEffectEvent:function(t){var e=Ot(),a={impl:t};return e.memoizedState=a,function(){if((Y&2)!==0)throw Error(w(440));return a.impl.apply(void 0,arguments)}}},Hs={readContext:xt,use:vu,useCallback:qh,useContext:xt,useEffect:Us,useImperativeHandle:Bh,useInsertionEffect:Uh,useLayoutEffect:Dh,useMemo:Hh,useReducer:_o,useRef:$h,useState:function(){return _o(We)},useDebugValue:Ds,useDeferredValue:function(t,e){var a=ot();return Yh(a,Q.memoizedState,t,e)},useTransition:function(){var t=_o(We)[0],e=ot().memoizedState;return[typeof t=="boolean"?t:mi(t),e]},useSyncExternalStore:wh,useId:Gh,useHostTransitionStatus:Bs,useFormState:Cp,useActionState:Cp,useOptimistic:function(t,e){var a=ot();return Mh(a,Q,t,e)},useMemoCache:$s,useCacheRefresh:Qh};Hs.useEffectEvent=Rh;var Wh={readContext:xt,use:vu,useCallback:qh,useContext:xt,useEffect:Us,useImperativeHandle:Bh,useInsertionEffect:Uh,useLayoutEffect:Dh,useMemo:Hh,useReducer:Xc,useRef:$h,useState:function(){return Xc(We)},useDebugValue:Ds,useDeferredValue:function(t,e){var a=ot();return Q===null?Ls(a,t,e):Yh(a,Q.memoizedState,t,e)},useTransition:function(){var t=Xc(We)[0],e=ot().memoizedState;return[typeof t=="boolean"?t:mi(t),e]},useSyncExternalStore:wh,useId:Gh,useHostTransitionStatus:Bs,useFormState:Op,useActionState:Op,useOptimistic:function(t,e){var a=ot();return Q!==null?Mh(a,Q,t,e):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:$s,useCacheRefresh:Qh};Wh.useEffectEvent=Rh;function Zc(t,e,a,l){e=t.memoizedState,a=a(l,e),a=a==null?e:I({},e,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var Hr={enqueueSetState:function(t,e,a){t=t._reactInternals;var l=Wt(),n=ba(l);n.payload=e,a!=null&&(n.callback=a),e=Sa(t,n,l),e!==null&&(Ht(e,t,l),qn(e,t,l))},enqueueReplaceState:function(t,e,a){t=t._reactInternals;var l=Wt(),n=ba(l);n.tag=1,n.payload=e,a!=null&&(n.callback=a),e=Sa(t,n,l),e!==null&&(Ht(e,t,l),qn(e,t,l))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var a=Wt(),l=ba(a);l.tag=2,e!=null&&(l.callback=e),e=Sa(t,l,a),e!==null&&(Ht(e,t,a),qn(e,t,a))}};function Rp(t,e,a,l,n,i,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(l,i,o):e.prototype&&e.prototype.isPureReactComponent?!Wn(a,l)||!Wn(n,i):!0}function Up(t,e,a,l){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(a,l),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(a,l),e.state!==t&&Hr.enqueueReplaceState(e,e.state,null)}function el(t,e){var a=e;if("ref"in e){a={};for(var l in e)l!=="ref"&&(a[l]=e[l])}if(t=t.defaultProps){a===e&&(a=I({},a));for(var n in t)a[n]===void 0&&(a[n]=t[n])}return a}function Fh(t){Yo(t)}function Ih(t){console.error(t)}function Ph(t){Yo(t)}function Jo(t,e){try{var a=t.onUncaughtError;a(e.value,{componentStack:e.stack})}catch(l){setTimeout(function(){throw l})}}function Dp(t,e,a){try{var l=t.onCaughtError;l(a.value,{componentStack:a.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(n){setTimeout(function(){throw n})}}function Yr(t,e,a){return a=ba(a),a.tag=3,a.payload={element:null},a.callback=function(){Jo(t,e)},a}function tg(t){return t=ba(t),t.tag=3,t}function eg(t,e,a,l){var n=a.type.getDerivedStateFromError;if(typeof n=="function"){var i=l.value;t.payload=function(){return n(i)},t.callback=function(){Dp(e,a,l)}}var o=a.stateNode;o!==null&&typeof o.componentDidCatch=="function"&&(t.callback=function(){Dp(e,a,l),typeof n!="function"&&(wa===null?wa=new Set([this]):wa.add(this));var u=l.stack;this.componentDidCatch(l.value,{componentStack:u!==null?u:""})})}function ub(t,e,a,l,n){if(a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(e=a.alternate,e!==null&&an(e,a,n,!0),a=It.current,a!==null){switch(a.tag){case 31:case 13:return re===null?tu():a.alternate===null&&nt===0&&(nt=3),a.flags&=-257,a.flags|=65536,a.lanes=n,l===Go?a.flags|=16384:(e=a.updateQueue,e===null?a.updateQueue=new Set([l]):e.add(l),nr(t,l,n)),!1;case 22:return a.flags|=65536,l===Go?a.flags|=16384:(e=a.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([l])},a.updateQueue=e):(a=e.retryQueue,a===null?e.retryQueue=new Set([l]):a.add(l)),nr(t,l,n)),!1}throw Error(w(435,a.tag))}return nr(t,l,n),tu(),!1}if(B)return e=It.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=n,l!==Mr&&(t=Error(w(422),{cause:l}),In(ue(t,a)))):(l!==Mr&&(e=Error(w(423),{cause:l}),In(ue(e,a))),t=t.current.alternate,t.flags|=65536,n&=-n,t.lanes|=n,l=ue(l,a),n=Yr(t.stateNode,l,n),Qc(t,n),nt!==4&&(nt=2)),!1;var i=Error(w(520),{cause:l});if(i=ue(i,a),Gn===null?Gn=[i]:Gn.push(i),nt!==4&&(nt=2),e===null)return!0;l=ue(l,a),a=e;do{switch(a.tag){case 3:return a.flags|=65536,t=n&-n,a.lanes|=t,t=Yr(a.stateNode,l,t),Qc(a,t),!1;case 1:if(e=a.type,i=a.stateNode,(a.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(wa===null||!wa.has(i))))return a.flags|=65536,n&=-n,a.lanes|=n,n=tg(n),eg(n,t,a,l),Qc(a,n),!1}a=a.return}while(a!==null);return!1}var Ys=Error(w(461)),ft=!1;function bt(t,e,a,l){e.child=t===null?hh(e,null,a,l):Pa(e,t.child,a,l)}function Lp(t,e,a,l,n){a=a.render;var i=e.ref;if("ref"in l){var o={};for(var u in l)u!=="ref"&&(o[u]=l[u])}else o=l;return Ia(e),l=zs(t,e,a,o,i,n),u=Ns(),t!==null&&!ft?(Cs(t,e,n),Fe(t,e,n)):(B&&u&&Ss(e),e.flags|=1,bt(t,e,l,n),e.child)}function Bp(t,e,a,l,n){if(t===null){var i=a.type;return typeof i=="function"&&!bs(i)&&i.defaultProps===void 0&&a.compare===null?(e.tag=15,e.type=i,ag(t,e,i,l,n)):(t=To(a.type,null,l,e,e.mode,n),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!js(t,n)){var o=i.memoizedProps;if(a=a.compare,a=a!==null?a:Wn,a(o,l)&&t.ref===e.ref)return Fe(t,e,n)}return e.flags|=1,t=Qe(i,l),t.ref=e.ref,t.return=e,e.child=t}function ag(t,e,a,l,n){if(t!==null){var i=t.memoizedProps;if(Wn(i,l)&&t.ref===e.ref)if(ft=!1,e.pendingProps=l=i,js(t,n))(t.flags&131072)!==0&&(ft=!0);else return e.lanes=t.lanes,Fe(t,e,n)}return jr(t,e,a,l,n)}function lg(t,e,a,l){var n=l.children,i=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((e.flags&128)!==0){if(i=i!==null?i.baseLanes|a:a,t!==null){for(l=e.child=t.child,n=0;l!==null;)n=n|l.lanes|l.childLanes,l=l.sibling;l=n&~i}else l=0,e.child=null;return qp(t,e,i,a,l)}if((a&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&Ao(e,i!==null?i.cachePool:null),i!==null?_p(e,i):Ur(),vh(e);else return l=e.lanes=536870912,qp(t,e,i!==null?i.baseLanes|a:a,a,l)}else i!==null?(Ao(e,i.cachePool),_p(e,i),sa(e),e.memoizedState=null):(t!==null&&Ao(e,null),Ur(),sa(e));return bt(t,e,n,a),e.child}function $n(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function qp(t,e,a,l,n){var i=Es();return i=i===null?null:{parent:st._currentValue,pool:i},e.memoizedState={baseLanes:a,cachePool:i},t!==null&&Ao(e,null),Ur(),vh(e),t!==null&&an(t,e,l,!0),e.childLanes=n,null}function zo(t,e){return e=Wo({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Hp(t,e,a){return Pa(e,t.child,null,a),t=zo(e,e.pendingProps),t.flags|=2,Gt(e),e.memoizedState=null,t}function cb(t,e,a){var l=e.pendingProps,n=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(B){if(l.mode==="hidden")return t=zo(e,l),e.lanes=536870912,$n(null,t);if(Dr(e),(t=F)?(t=Jg(t,ce),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:_a!==null?{id:Te,overflow:Ae}:null,retryLane:536870912,hydrationErrors:null},a=ch(t),a.return=e,e.child=a,wt=e,F=null)):t=null,t===null)throw Ma(e);return e.lanes=536870912,null}return zo(e,l)}var i=t.memoizedState;if(i!==null){var o=i.dehydrated;if(Dr(e),n)if(e.flags&256)e.flags&=-257,e=Hp(t,e,a);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(w(558));else if(ft||an(t,e,a,!1),n=(a&t.childLanes)!==0,ft||n){if(l=X,l!==null&&(o=Um(l,a),o!==0&&o!==i.retryLane))throw i.retryLane=o,il(t,o),Ht(l,t,o),Ys;tu(),e=Hp(t,e,a)}else t=i.treeContext,F=se(o.nextSibling),wt=e,B=!0,va=null,ce=!1,t!==null&&sh(e,t),e=zo(e,l),e.flags|=4096;return e}return t=Qe(t.child,{mode:l.mode,children:l.children}),t.ref=e.ref,e.child=t,t.return=e,t}function No(t,e){var a=e.ref;if(a===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(w(284));(t===null||t.ref!==a)&&(e.flags|=4194816)}}function jr(t,e,a,l,n){return Ia(e),a=zs(t,e,a,l,void 0,n),l=Ns(),t!==null&&!ft?(Cs(t,e,n),Fe(t,e,n)):(B&&l&&Ss(e),e.flags|=1,bt(t,e,a,n),e.child)}function Yp(t,e,a,l,n,i){return Ia(e),e.updateQueue=null,a=Sh(e,l,a,n),bh(t),l=Ns(),t!==null&&!ft?(Cs(t,e,i),Fe(t,e,i)):(B&&l&&Ss(e),e.flags|=1,bt(t,e,a,i),e.child)}function jp(t,e,a,l,n){if(Ia(e),e.stateNode===null){var i=$l,o=a.contextType;typeof o=="object"&&o!==null&&(i=xt(o)),i=new a(l,i),e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Hr,e.stateNode=i,i._reactInternals=e,i=e.stateNode,i.props=l,i.state=e.memoizedState,i.refs={},As(e),o=a.contextType,i.context=typeof o=="object"&&o!==null?xt(o):$l,i.state=e.memoizedState,o=a.getDerivedStateFromProps,typeof o=="function"&&(Zc(e,a,o,l),i.state=e.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(o=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),o!==i.state&&Hr.enqueueReplaceState(i,i.state,null),Yn(e,l,i,n),Hn(),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308),l=!0}else if(t===null){i=e.stateNode;var u=e.memoizedProps,r=el(a,u);i.props=r;var p=i.context,h=a.contextType;o=$l,typeof h=="object"&&h!==null&&(o=xt(h));var v=a.getDerivedStateFromProps;h=typeof v=="function"||typeof i.getSnapshotBeforeUpdate=="function",u=e.pendingProps!==u,h||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u||p!==o)&&Up(e,i,l,o),ua=!1;var m=e.memoizedState;i.state=m,Yn(e,l,i,n),Hn(),p=e.memoizedState,u||m!==p||ua?(typeof v=="function"&&(Zc(e,a,v,l),p=e.memoizedState),(r=ua||Rp(e,a,r,l,m,p,o))?(h||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(e.flags|=4194308)):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=l,e.memoizedState=p),i.props=l,i.state=p,i.context=o,l=r):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),l=!1)}else{i=e.stateNode,$r(t,e),o=e.memoizedProps,h=el(a,o),i.props=h,v=e.pendingProps,m=i.context,p=a.contextType,r=$l,typeof p=="object"&&p!==null&&(r=xt(p)),u=a.getDerivedStateFromProps,(p=typeof u=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(o!==v||m!==r)&&Up(e,i,l,r),ua=!1,m=e.memoizedState,i.state=m,Yn(e,l,i,n),Hn();var y=e.memoizedState;o!==v||m!==y||ua||t!==null&&t.dependencies!==null&&ko(t.dependencies)?(typeof u=="function"&&(Zc(e,a,u,l),y=e.memoizedState),(h=ua||Rp(e,a,h,l,m,y,r)||t!==null&&t.dependencies!==null&&ko(t.dependencies))?(p||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(l,y,r),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(l,y,r)),typeof i.componentDidUpdate=="function"&&(e.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof i.componentDidUpdate!="function"||o===t.memoizedProps&&m===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&m===t.memoizedState||(e.flags|=1024),e.memoizedProps=l,e.memoizedState=y),i.props=l,i.state=y,i.context=r,l=h):(typeof i.componentDidUpdate!="function"||o===t.memoizedProps&&m===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&m===t.memoizedState||(e.flags|=1024),l=!1)}return i=l,No(t,e),l=(e.flags&128)!==0,i||l?(i=e.stateNode,a=l&&typeof a.getDerivedStateFromError!="function"?null:i.render(),e.flags|=1,t!==null&&l?(e.child=Pa(e,t.child,null,n),e.child=Pa(e,null,a,n)):bt(t,e,a,n),e.memoizedState=i.state,t=e.child):t=Fe(t,e,n),t}function Vp(t,e,a,l){return Fa(),e.flags|=256,bt(t,e,a,l),e.child}var Kc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Jc(t){return{baseLanes:t,cachePool:dh()}}function Wc(t,e,a){return t=t!==null?t.childLanes&~a:0,e&&(t|=Xt),t}function ng(t,e,a){var l=e.pendingProps,n=!1,i=(e.flags&128)!==0,o;if((o=i)||(o=t!==null&&t.memoizedState===null?!1:(it.current&2)!==0),o&&(n=!0,e.flags&=-129),o=(e.flags&32)!==0,e.flags&=-33,t===null){if(B){if(n?ra(e):sa(e),(t=F)?(t=Jg(t,ce),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:_a!==null?{id:Te,overflow:Ae}:null,retryLane:536870912,hydrationErrors:null},a=ch(t),a.return=e,e.child=a,wt=e,F=null)):t=null,t===null)throw Ma(e);return es(t)?e.lanes=32:e.lanes=536870912,null}var u=l.children;return l=l.fallback,n?(sa(e),n=e.mode,u=Wo({mode:"hidden",children:u},n),l=Za(l,n,a,null),u.return=e,l.return=e,u.sibling=l,e.child=u,l=e.child,l.memoizedState=Jc(a),l.childLanes=Wc(t,o,a),e.memoizedState=Kc,$n(null,l)):(ra(e),Vr(e,u))}var r=t.memoizedState;if(r!==null&&(u=r.dehydrated,u!==null)){if(i)e.flags&256?(ra(e),e.flags&=-257,e=Fc(t,e,a)):e.memoizedState!==null?(sa(e),e.child=t.child,e.flags|=128,e=null):(sa(e),u=l.fallback,n=e.mode,l=Wo({mode:"visible",children:l.children},n),u=Za(u,n,a,null),u.flags|=2,l.return=e,u.return=e,l.sibling=u,e.child=l,Pa(e,t.child,null,a),l=e.child,l.memoizedState=Jc(a),l.childLanes=Wc(t,o,a),e.memoizedState=Kc,e=$n(null,l));else if(ra(e),es(u)){if(o=u.nextSibling&&u.nextSibling.dataset,o)var p=o.dgst;o=p,l=Error(w(419)),l.stack="",l.digest=o,In({value:l,source:null,stack:null}),e=Fc(t,e,a)}else if(ft||an(t,e,a,!1),o=(a&t.childLanes)!==0,ft||o){if(o=X,o!==null&&(l=Um(o,a),l!==0&&l!==r.retryLane))throw r.retryLane=l,il(t,l),Ht(o,t,l),Ys;ts(u)||tu(),e=Fc(t,e,a)}else ts(u)?(e.flags|=192,e.child=t.child,e=null):(t=r.treeContext,F=se(u.nextSibling),wt=e,B=!0,va=null,ce=!1,t!==null&&sh(e,t),e=Vr(e,l.children),e.flags|=4096);return e}return n?(sa(e),u=l.fallback,n=e.mode,r=t.child,p=r.sibling,l=Qe(r,{mode:"hidden",children:l.children}),l.subtreeFlags=r.subtreeFlags&65011712,p!==null?u=Qe(p,u):(u=Za(u,n,a,null),u.flags|=2),u.return=e,l.return=e,l.sibling=u,e.child=l,$n(null,l),l=e.child,u=t.child.memoizedState,u===null?u=Jc(a):(n=u.cachePool,n!==null?(r=st._currentValue,n=n.parent!==r?{parent:r,pool:r}:n):n=dh(),u={baseLanes:u.baseLanes|a,cachePool:n}),l.memoizedState=u,l.childLanes=Wc(t,o,a),e.memoizedState=Kc,$n(t.child,l)):(ra(e),a=t.child,t=a.sibling,a=Qe(a,{mode:"visible",children:l.children}),a.return=e,a.sibling=null,t!==null&&(o=e.deletions,o===null?(e.deletions=[t],e.flags|=16):o.push(t)),e.child=a,e.memoizedState=null,a)}function Vr(t,e){return e=Wo({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Wo(t,e){return t=Qt(22,t,null,e),t.lanes=0,t}function Fc(t,e,a){return Pa(e,t.child,null,a),t=Vr(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function kp(t,e,a){t.lanes|=e;var l=t.alternate;l!==null&&(l.lanes|=e),Nr(t.return,e,a)}function Ic(t,e,a,l,n,i){var o=t.memoizedState;o===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:l,tail:a,tailMode:n,treeForkCount:i}:(o.isBackwards=e,o.rendering=null,o.renderingStartTime=0,o.last=l,o.tail=a,o.tailMode=n,o.treeForkCount=i)}function ig(t,e,a){var l=e.pendingProps,n=l.revealOrder,i=l.tail;l=l.children;var o=it.current,u=(o&2)!==0;if(u?(o=o&1|2,e.flags|=128):o&=1,K(it,o),bt(t,e,l,a),l=B?Fn:0,!u&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&kp(t,a,e);else if(t.tag===19)kp(t,a,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(n){case"forwards":for(a=e.child,n=null;a!==null;)t=a.alternate,t!==null&&Xo(t)===null&&(n=a),a=a.sibling;a=n,a===null?(n=e.child,e.child=null):(n=a.sibling,a.sibling=null),Ic(e,!1,n,a,i,l);break;case"backwards":case"unstable_legacy-backwards":for(a=null,n=e.child,e.child=null;n!==null;){if(t=n.alternate,t!==null&&Xo(t)===null){e.child=n;break}t=n.sibling,n.sibling=a,a=n,n=t}Ic(e,!0,a,null,i,l);break;case"together":Ic(e,!1,null,null,void 0,l);break;default:e.memoizedState=null}return e.child}function Fe(t,e,a){if(t!==null&&(e.dependencies=t.dependencies),Na|=e.lanes,(a&e.childLanes)===0)if(t!==null){if(an(t,e,a,!1),(a&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(w(153));if(e.child!==null){for(t=e.child,a=Qe(t,t.pendingProps),e.child=a,a.return=e;t.sibling!==null;)t=t.sibling,a=a.sibling=Qe(t,t.pendingProps),a.return=e;a.sibling=null}return e.child}function js(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&ko(t)))}function rb(t,e,a){switch(e.tag){case 3:Lo(e,e.stateNode.containerInfo),ca(e,st,t.memoizedState.cache),Fa();break;case 27:case 5:gr(e);break;case 4:Lo(e,e.stateNode.containerInfo);break;case 10:ca(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,Dr(e),null;break;case 13:var l=e.memoizedState;if(l!==null)return l.dehydrated!==null?(ra(e),e.flags|=128,null):(a&e.child.childLanes)!==0?ng(t,e,a):(ra(e),t=Fe(t,e,a),t!==null?t.sibling:null);ra(e);break;case 19:var n=(t.flags&128)!==0;if(l=(a&e.childLanes)!==0,l||(an(t,e,a,!1),l=(a&e.childLanes)!==0),n){if(l)return ig(t,e,a);e.flags|=128}if(n=e.memoizedState,n!==null&&(n.rendering=null,n.tail=null,n.lastEffect=null),K(it,it.current),l)break;return null;case 22:return e.lanes=0,lg(t,e,a,e.pendingProps);case 24:ca(e,st,t.memoizedState.cache)}return Fe(t,e,a)}function og(t,e,a){if(t!==null)if(t.memoizedProps!==e.pendingProps)ft=!0;else{if(!js(t,a)&&(e.flags&128)===0)return ft=!1,rb(t,e,a);ft=(t.flags&131072)!==0}else ft=!1,B&&(e.flags&1048576)!==0&&rh(e,Fn,e.index);switch(e.lanes=0,e.tag){case 16:t:{var l=e.pendingProps;if(t=Ga(e.elementType),e.type=t,typeof t=="function")bs(t)?(l=el(t,l),e.tag=1,e=jp(null,e,t,l,a)):(e.tag=0,e=jr(null,e,t,l,a));else{if(t!=null){var n=t.$$typeof;if(n===is){e.tag=11,e=Lp(null,e,t,l,a);break t}else if(n===os){e.tag=14,e=Bp(null,e,t,l,a);break t}}throw e=mr(t)||t,Error(w(306,e,""))}}return e;case 0:return jr(t,e,e.type,e.pendingProps,a);case 1:return l=e.type,n=el(l,e.pendingProps),jp(t,e,l,n,a);case 3:t:{if(Lo(e,e.stateNode.containerInfo),t===null)throw Error(w(387));l=e.pendingProps;var i=e.memoizedState;n=i.element,$r(t,e),Yn(e,l,null,a);var o=e.memoizedState;if(l=o.cache,ca(e,st,l),l!==i.cache&&Cr(e,[st],a,!0),Hn(),l=o.element,i.isDehydrated)if(i={element:l,isDehydrated:!1,cache:o.cache},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){e=Vp(t,e,l,a);break t}else if(l!==n){n=ue(Error(w(424)),e),In(n),e=Vp(t,e,l,a);break t}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(F=se(t.firstChild),wt=e,B=!0,va=null,ce=!0,a=hh(e,null,l,a),e.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(Fa(),l===n){e=Fe(t,e,a);break t}bt(t,e,l,a)}e=e.child}return e;case 26:return No(t,e),t===null?(a=fm(e.type,null,e.pendingProps,null))?e.memoizedState=a:B||(a=e.type,t=e.pendingProps,l=nu(ya.current).createElement(a),l[St]=e,l[Yt]=t,Et(l,a,t),gt(l),e.stateNode=l):e.memoizedState=fm(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return gr(e),t===null&&B&&(l=e.stateNode=Wg(e.type,e.pendingProps,ya.current),wt=e,ce=!0,n=F,Oa(e.type)?(as=n,F=se(l.firstChild)):F=n),bt(t,e,e.pendingProps.children,a),No(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&B&&((n=l=F)&&(l=Bb(l,e.type,e.pendingProps,ce),l!==null?(e.stateNode=l,wt=e,F=se(l.firstChild),ce=!1,n=!0):n=!1),n||Ma(e)),gr(e),n=e.type,i=e.pendingProps,o=t!==null?t.memoizedProps:null,l=i.children,Ir(n,i)?l=null:o!==null&&Ir(n,o)&&(e.flags|=32),e.memoizedState!==null&&(n=zs(t,e,tb,null,null,a),ni._currentValue=n),No(t,e),bt(t,e,l,a),e.child;case 6:return t===null&&B&&((t=a=F)&&(a=qb(a,e.pendingProps,ce),a!==null?(e.stateNode=a,wt=e,F=null,t=!0):t=!1),t||Ma(e)),null;case 13:return ng(t,e,a);case 4:return Lo(e,e.stateNode.containerInfo),l=e.pendingProps,t===null?e.child=Pa(e,null,l,a):bt(t,e,l,a),e.child;case 11:return Lp(t,e,e.type,e.pendingProps,a);case 7:return bt(t,e,e.pendingProps,a),e.child;case 8:return bt(t,e,e.pendingProps.children,a),e.child;case 12:return bt(t,e,e.pendingProps.children,a),e.child;case 10:return l=e.pendingProps,ca(e,e.type,l.value),bt(t,e,l.children,a),e.child;case 9:return n=e.type._context,l=e.pendingProps.children,Ia(e),n=xt(n),l=l(n),e.flags|=1,bt(t,e,l,a),e.child;case 14:return Bp(t,e,e.type,e.pendingProps,a);case 15:return ag(t,e,e.type,e.pendingProps,a);case 19:return ig(t,e,a);case 31:return cb(t,e,a);case 22:return lg(t,e,a,e.pendingProps);case 24:return Ia(e),l=xt(st),t===null?(n=Es(),n===null&&(n=X,i=xs(),n.pooledCache=i,i.refCount++,i!==null&&(n.pooledCacheLanes|=a),n=i),e.memoizedState={parent:l,cache:n},As(e),ca(e,st,n)):((t.lanes&a)!==0&&($r(t,e),Yn(e,null,null,a),Hn()),n=t.memoizedState,i=e.memoizedState,n.parent!==l?(n={parent:l,cache:l},e.memoizedState=n,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=n),ca(e,st,l)):(l=i.cache,ca(e,st,l),l!==n.cache&&Cr(e,[st],a,!0))),bt(t,e,e.pendingProps.children,a),e.child;case 29:throw e.pendingProps}throw Error(w(156,e.tag))}function Le(t){t.flags|=4}function Pc(t,e,a,l,n){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(n&335544128)===n)if(t.stateNode.complete)t.flags|=8192;else if(Cg())t.flags|=8192;else throw Ja=Go,Ts}else t.flags&=-16777217}function Gp(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Pg(e))if(Cg())t.flags|=8192;else throw Ja=Go,Ts}function po(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?Om():536870912,t.lanes|=e,Jl|=e)}function An(t,e){if(!B)switch(t.tailMode){case"hidden":e=t.tail;for(var a=null;e!==null;)e.alternate!==null&&(a=e),e=e.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var l=null;a!==null;)a.alternate!==null&&(l=a),a=a.sibling;l===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:l.sibling=null}}function W(t){var e=t.alternate!==null&&t.alternate.child===t.child,a=0,l=0;if(e)for(var n=t.child;n!==null;)a|=n.lanes|n.childLanes,l|=n.subtreeFlags&65011712,l|=n.flags&65011712,n.return=t,n=n.sibling;else for(n=t.child;n!==null;)a|=n.lanes|n.childLanes,l|=n.subtreeFlags,l|=n.flags,n.return=t,n=n.sibling;return t.subtreeFlags|=l,t.childLanes=a,e}function sb(t,e,a){var l=e.pendingProps;switch(ws(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return W(e),null;case 1:return W(e),null;case 3:return a=e.stateNode,l=null,t!==null&&(l=t.memoizedState.cache),e.memoizedState.cache!==l&&(e.flags|=2048),Xe(st),kl(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(Sl(e)?Le(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Gc())),W(e),null;case 26:var n=e.type,i=e.memoizedState;return t===null?(Le(e),i!==null?(W(e),Gp(e,i)):(W(e),Pc(e,n,null,l,a))):i?i!==t.memoizedState?(Le(e),W(e),Gp(e,i)):(W(e),e.flags&=-16777217):(t=t.memoizedProps,t!==l&&Le(e),W(e),Pc(e,n,t,l,a)),null;case 27:if(Bo(e),a=ya.current,n=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==l&&Le(e);else{if(!l){if(e.stateNode===null)throw Error(w(166));return W(e),null}t=Me.current,Sl(e)?bp(e,t):(t=Wg(n,l,a),e.stateNode=t,Le(e))}return W(e),null;case 5:if(Bo(e),n=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==l&&Le(e);else{if(!l){if(e.stateNode===null)throw Error(w(166));return W(e),null}if(i=Me.current,Sl(e))bp(e,i);else{var o=nu(ya.current);switch(i){case 1:i=o.createElementNS("http://www.w3.org/2000/svg",n);break;case 2:i=o.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;default:switch(n){case"svg":i=o.createElementNS("http://www.w3.org/2000/svg",n);break;case"math":i=o.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;case"script":i=o.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof l.is=="string"?o.createElement("select",{is:l.is}):o.createElement("select"),l.multiple?i.multiple=!0:l.size&&(i.size=l.size);break;default:i=typeof l.is=="string"?o.createElement(n,{is:l.is}):o.createElement(n)}}i[St]=e,i[Yt]=l;t:for(o=e.child;o!==null;){if(o.tag===5||o.tag===6)i.appendChild(o.stateNode);else if(o.tag!==4&&o.tag!==27&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===e)break t;for(;o.sibling===null;){if(o.return===null||o.return===e)break t;o=o.return}o.sibling.return=o.return,o=o.sibling}e.stateNode=i;t:switch(Et(i,n,l),n){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break t;case"img":l=!0;break t;default:l=!1}l&&Le(e)}}return W(e),Pc(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,a),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==l&&Le(e);else{if(typeof l!="string"&&e.stateNode===null)throw Error(w(166));if(t=ya.current,Sl(e)){if(t=e.stateNode,a=e.memoizedProps,l=null,n=wt,n!==null)switch(n.tag){case 27:case 5:l=n.memoizedProps}t[St]=e,t=!!(t.nodeValue===a||l!==null&&l.suppressHydrationWarning===!0||Xg(t.nodeValue,a)),t||Ma(e,!0)}else t=nu(t).createTextNode(l),t[St]=e,e.stateNode=t}return W(e),null;case 31:if(a=e.memoizedState,t===null||t.memoizedState!==null){if(l=Sl(e),a!==null){if(t===null){if(!l)throw Error(w(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(w(557));t[St]=e}else Fa(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;W(e),t=!1}else a=Gc(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return e.flags&256?(Gt(e),e):(Gt(e),null);if((e.flags&128)!==0)throw Error(w(558))}return W(e),null;case 13:if(l=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(n=Sl(e),l!==null&&l.dehydrated!==null){if(t===null){if(!n)throw Error(w(318));if(n=e.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(w(317));n[St]=e}else Fa(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;W(e),n=!1}else n=Gc(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),n=!0;if(!n)return e.flags&256?(Gt(e),e):(Gt(e),null)}return Gt(e),(e.flags&128)!==0?(e.lanes=a,e):(a=l!==null,t=t!==null&&t.memoizedState!==null,a&&(l=e.child,n=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(n=l.alternate.memoizedState.cachePool.pool),i=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(i=l.memoizedState.cachePool.pool),i!==n&&(l.flags|=2048)),a!==t&&a&&(e.child.flags|=8192),po(e,e.updateQueue),W(e),null);case 4:return kl(),t===null&&Ks(e.stateNode.containerInfo),W(e),null;case 10:return Xe(e.type),W(e),null;case 19:if(yt(it),l=e.memoizedState,l===null)return W(e),null;if(n=(e.flags&128)!==0,i=l.rendering,i===null)if(n)An(l,!1);else{if(nt!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(i=Xo(t),i!==null){for(e.flags|=128,An(l,!1),t=i.updateQueue,e.updateQueue=t,po(e,t),e.subtreeFlags=0,t=a,a=e.child;a!==null;)uh(a,t),a=a.sibling;return K(it,it.current&1|2),B&&Ye(e,l.treeForkCount),e.child}t=t.sibling}l.tail!==null&&Zt()>Io&&(e.flags|=128,n=!0,An(l,!1),e.lanes=4194304)}else{if(!n)if(t=Xo(i),t!==null){if(e.flags|=128,n=!0,t=t.updateQueue,e.updateQueue=t,po(e,t),An(l,!0),l.tail===null&&l.tailMode==="hidden"&&!i.alternate&&!B)return W(e),null}else 2*Zt()-l.renderingStartTime>Io&&a!==536870912&&(e.flags|=128,n=!0,An(l,!1),e.lanes=4194304);l.isBackwards?(i.sibling=e.child,e.child=i):(t=l.last,t!==null?t.sibling=i:e.child=i,l.last=i)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=Zt(),t.sibling=null,a=it.current,K(it,n?a&1|2:a&1),B&&Ye(e,l.treeForkCount),t):(W(e),null);case 22:case 23:return Gt(e),_s(),l=e.memoizedState!==null,t!==null?t.memoizedState!==null!==l&&(e.flags|=8192):l&&(e.flags|=8192),l?(a&536870912)!==0&&(e.flags&128)===0&&(W(e),e.subtreeFlags&6&&(e.flags|=8192)):W(e),a=e.updateQueue,a!==null&&po(e,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),l=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(l=e.memoizedState.cachePool.pool),l!==a&&(e.flags|=2048),t!==null&&yt(Ka),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),e.memoizedState.cache!==a&&(e.flags|=2048),Xe(st),W(e),null;case 25:return null;case 30:return null}throw Error(w(156,e.tag))}function fb(t,e){switch(ws(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Xe(st),kl(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return Bo(e),null;case 31:if(e.memoizedState!==null){if(Gt(e),e.alternate===null)throw Error(w(340));Fa()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(Gt(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(w(340));Fa()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return yt(it),null;case 4:return kl(),null;case 10:return Xe(e.type),null;case 22:case 23:return Gt(e),_s(),t!==null&&yt(Ka),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Xe(st),null;case 25:return null;default:return null}}function ug(t,e){switch(ws(e),e.tag){case 3:Xe(st),kl();break;case 26:case 27:case 5:Bo(e);break;case 4:kl();break;case 31:e.memoizedState!==null&&Gt(e);break;case 13:Gt(e);break;case 19:yt(it);break;case 10:Xe(e.type);break;case 22:case 23:Gt(e),_s(),t!==null&&yt(Ka);break;case 24:Xe(st)}}function hi(t,e){try{var a=e.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var n=l.next;a=n;do{if((a.tag&t)===t){l=void 0;var i=a.create,o=a.inst;l=i(),o.destroy=l}a=a.next}while(a!==n)}}catch(u){k(e,e.return,u)}}function za(t,e,a){try{var l=e.updateQueue,n=l!==null?l.lastEffect:null;if(n!==null){var i=n.next;l=i;do{if((l.tag&t)===t){var o=l.inst,u=o.destroy;if(u!==void 0){o.destroy=void 0,n=e;var r=a,p=u;try{p()}catch(h){k(n,r,h)}}}l=l.next}while(l!==i)}}catch(h){k(e,e.return,h)}}function cg(t){var e=t.updateQueue;if(e!==null){var a=t.stateNode;try{yh(e,a)}catch(l){k(t,t.return,l)}}}function rg(t,e,a){a.props=el(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(l){k(t,e,l)}}function Vn(t,e){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var l=t.stateNode;break;case 30:l=t.stateNode;break;default:l=t.stateNode}typeof a=="function"?t.refCleanup=a(l):a.current=l}}catch(n){k(t,e,n)}}function _e(t,e){var a=t.ref,l=t.refCleanup;if(a!==null)if(typeof l=="function")try{l()}catch(n){k(t,e,n)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(n){k(t,e,n)}else a.current=null}function sg(t){var e=t.type,a=t.memoizedProps,l=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":a.autoFocus&&l.focus();break t;case"img":a.src?l.src=a.src:a.srcSet&&(l.srcset=a.srcSet)}}catch(n){k(t,t.return,n)}}function tr(t,e,a){try{var l=t.stateNode;Ob(l,t.type,a,e),l[Yt]=e}catch(n){k(t,t.return,n)}}function fg(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Oa(t.type)||t.tag===4}function er(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||fg(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Oa(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function kr(t,e,a){var l=t.tag;if(l===5||l===6)t=t.stateNode,e?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,e):(e=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,e.appendChild(t),a=a._reactRootContainer,a!=null||e.onclick!==null||(e.onclick=ke));else if(l!==4&&(l===27&&Oa(t.type)&&(a=t.stateNode,e=null),t=t.child,t!==null))for(kr(t,e,a),t=t.sibling;t!==null;)kr(t,e,a),t=t.sibling}function Fo(t,e,a){var l=t.tag;if(l===5||l===6)t=t.stateNode,e?a.insertBefore(t,e):a.appendChild(t);else if(l!==4&&(l===27&&Oa(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(Fo(t,e,a),t=t.sibling;t!==null;)Fo(t,e,a),t=t.sibling}function dg(t){var e=t.stateNode,a=t.memoizedProps;try{for(var l=t.type,n=e.attributes;n.length;)e.removeAttributeNode(n[0]);Et(e,l,a),e[St]=t,e[Yt]=a}catch(i){k(t,t.return,i)}}var je=!1,rt=!1,ar=!1,Qp=typeof WeakSet=="function"?WeakSet:Set,ht=null;function db(t,e){if(t=t.containerInfo,Wr=cu,t=Pm(t),gs(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else t:{a=(a=t.ownerDocument)&&a.defaultView||window;var l=a.getSelection&&a.getSelection();if(l&&l.rangeCount!==0){a=l.anchorNode;var n=l.anchorOffset,i=l.focusNode;l=l.focusOffset;try{a.nodeType,i.nodeType}catch{a=null;break t}var o=0,u=-1,r=-1,p=0,h=0,v=t,m=null;e:for(;;){for(var y;v!==a||n!==0&&v.nodeType!==3||(u=o+n),v!==i||l!==0&&v.nodeType!==3||(r=o+l),v.nodeType===3&&(o+=v.nodeValue.length),(y=v.firstChild)!==null;)m=v,v=y;for(;;){if(v===t)break e;if(m===a&&++p===n&&(u=o),m===i&&++h===l&&(r=o),(y=v.nextSibling)!==null)break;v=m,m=v.parentNode}v=y}a=u===-1||r===-1?null:{start:u,end:r}}else a=null}a=a||{start:0,end:0}}else a=null;for(Fr={focusedElem:t,selectionRange:a},cu=!1,ht=e;ht!==null;)if(e=ht,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,ht=t;else for(;ht!==null;){switch(e=ht,i=e.alternate,t=e.flags,e.tag){case 0:if((t&4)!==0&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(a=0;a<t.length;a++)n=t[a],n.ref.impl=n.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&i!==null){t=void 0,a=e,n=i.memoizedProps,i=i.memoizedState,l=a.stateNode;try{var E=el(a.type,n);t=l.getSnapshotBeforeUpdate(E,i),l.__reactInternalSnapshotBeforeUpdate=t}catch(_){k(a,a.return,_)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,a=t.nodeType,a===9)Pr(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Pr(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(w(163))}if(t=e.sibling,t!==null){t.return=e.return,ht=t;break}ht=e.return}}function pg(t,e,a){var l=a.flags;switch(a.tag){case 0:case 11:case 15:qe(t,a),l&4&&hi(5,a);break;case 1:if(qe(t,a),l&4)if(t=a.stateNode,e===null)try{t.componentDidMount()}catch(o){k(a,a.return,o)}else{var n=el(a.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(n,e,t.__reactInternalSnapshotBeforeUpdate)}catch(o){k(a,a.return,o)}}l&64&&cg(a),l&512&&Vn(a,a.return);break;case 3:if(qe(t,a),l&64&&(t=a.updateQueue,t!==null)){if(e=null,a.child!==null)switch(a.child.tag){case 27:case 5:e=a.child.stateNode;break;case 1:e=a.child.stateNode}try{yh(t,e)}catch(o){k(a,a.return,o)}}break;case 27:e===null&&l&4&&dg(a);case 26:case 5:qe(t,a),e===null&&l&4&&sg(a),l&512&&Vn(a,a.return);break;case 12:qe(t,a);break;case 31:qe(t,a),l&4&&gg(t,a);break;case 13:qe(t,a),l&4&&yg(t,a),l&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=wb.bind(null,a),Hb(t,a))));break;case 22:if(l=a.memoizedState!==null||je,!l){e=e!==null&&e.memoizedState!==null||rt,n=je;var i=rt;je=l,(rt=e)&&!i?He(t,a,(a.subtreeFlags&8772)!==0):qe(t,a),je=n,rt=i}break;case 30:break;default:qe(t,a)}}function mg(t){var e=t.alternate;e!==null&&(t.alternate=null,mg(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&ss(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var tt=null,Bt=!1;function Be(t,e,a){for(a=a.child;a!==null;)hg(t,e,a),a=a.sibling}function hg(t,e,a){if(Kt&&typeof Kt.onCommitFiberUnmount=="function")try{Kt.onCommitFiberUnmount(ci,a)}catch{}switch(a.tag){case 26:rt||_e(a,e),Be(t,e,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:rt||_e(a,e);var l=tt,n=Bt;Oa(a.type)&&(tt=a.stateNode,Bt=!1),Be(t,e,a),Xn(a.stateNode),tt=l,Bt=n;break;case 5:rt||_e(a,e);case 6:if(l=tt,n=Bt,tt=null,Be(t,e,a),tt=l,Bt=n,tt!==null)if(Bt)try{(tt.nodeType===9?tt.body:tt.nodeName==="HTML"?tt.ownerDocument.body:tt).removeChild(a.stateNode)}catch(i){k(a,e,i)}else try{tt.removeChild(a.stateNode)}catch(i){k(a,e,i)}break;case 18:tt!==null&&(Bt?(t=tt,om(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),Pl(t)):om(tt,a.stateNode));break;case 4:l=tt,n=Bt,tt=a.stateNode.containerInfo,Bt=!0,Be(t,e,a),tt=l,Bt=n;break;case 0:case 11:case 14:case 15:za(2,a,e),rt||za(4,a,e),Be(t,e,a);break;case 1:rt||(_e(a,e),l=a.stateNode,typeof l.componentWillUnmount=="function"&&rg(a,e,l)),Be(t,e,a);break;case 21:Be(t,e,a);break;case 22:rt=(l=rt)||a.memoizedState!==null,Be(t,e,a),rt=l;break;default:Be(t,e,a)}}function gg(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Pl(t)}catch(a){k(e,e.return,a)}}}function yg(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Pl(t)}catch(a){k(e,e.return,a)}}function pb(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Qp),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Qp),e;default:throw Error(w(435,t.tag))}}function mo(t,e){var a=pb(t);e.forEach(function(l){if(!a.has(l)){a.add(l);var n=xb.bind(null,t,l);l.then(n,n)}})}function Dt(t,e){var a=e.deletions;if(a!==null)for(var l=0;l<a.length;l++){var n=a[l],i=t,o=e,u=o;t:for(;u!==null;){switch(u.tag){case 27:if(Oa(u.type)){tt=u.stateNode,Bt=!1;break t}break;case 5:tt=u.stateNode,Bt=!1;break t;case 3:case 4:tt=u.stateNode.containerInfo,Bt=!0;break t}u=u.return}if(tt===null)throw Error(w(160));hg(i,o,n),tt=null,Bt=!1,i=n.alternate,i!==null&&(i.return=null),n.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)vg(e,t),e=e.sibling}var pe=null;function vg(t,e){var a=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Dt(e,t),Lt(t),l&4&&(za(3,t,t.return),hi(3,t),za(5,t,t.return));break;case 1:Dt(e,t),Lt(t),l&512&&(rt||a===null||_e(a,a.return)),l&64&&je&&(t=t.updateQueue,t!==null&&(l=t.callbacks,l!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?l:a.concat(l))));break;case 26:var n=pe;if(Dt(e,t),Lt(t),l&512&&(rt||a===null||_e(a,a.return)),l&4){var i=a!==null?a.memoizedState:null;if(l=t.memoizedState,a===null)if(l===null)if(t.stateNode===null){t:{l=t.type,a=t.memoizedProps,n=n.ownerDocument||n;e:switch(l){case"title":i=n.getElementsByTagName("title")[0],(!i||i[fi]||i[St]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=n.createElement(l),n.head.insertBefore(i,n.querySelector("head > title"))),Et(i,l,a),i[St]=t,gt(i),l=i;break t;case"link":var o=pm("link","href",n).get(l+(a.href||""));if(o){for(var u=0;u<o.length;u++)if(i=o[u],i.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&i.getAttribute("rel")===(a.rel==null?null:a.rel)&&i.getAttribute("title")===(a.title==null?null:a.title)&&i.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){o.splice(u,1);break e}}i=n.createElement(l),Et(i,l,a),n.head.appendChild(i);break;case"meta":if(o=pm("meta","content",n).get(l+(a.content||""))){for(u=0;u<o.length;u++)if(i=o[u],i.getAttribute("content")===(a.content==null?null:""+a.content)&&i.getAttribute("name")===(a.name==null?null:a.name)&&i.getAttribute("property")===(a.property==null?null:a.property)&&i.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&i.getAttribute("charset")===(a.charSet==null?null:a.charSet)){o.splice(u,1);break e}}i=n.createElement(l),Et(i,l,a),n.head.appendChild(i);break;default:throw Error(w(468,l))}i[St]=t,gt(i),l=i}t.stateNode=l}else mm(n,t.type,t.stateNode);else t.stateNode=dm(n,l,t.memoizedProps);else i!==l?(i===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):i.count--,l===null?mm(n,t.type,t.stateNode):dm(n,l,t.memoizedProps)):l===null&&t.stateNode!==null&&tr(t,t.memoizedProps,a.memoizedProps)}break;case 27:Dt(e,t),Lt(t),l&512&&(rt||a===null||_e(a,a.return)),a!==null&&l&4&&tr(t,t.memoizedProps,a.memoizedProps);break;case 5:if(Dt(e,t),Lt(t),l&512&&(rt||a===null||_e(a,a.return)),t.flags&32){n=t.stateNode;try{Ql(n,"")}catch(E){k(t,t.return,E)}}l&4&&t.stateNode!=null&&(n=t.memoizedProps,tr(t,n,a!==null?a.memoizedProps:n)),l&1024&&(ar=!0);break;case 6:if(Dt(e,t),Lt(t),l&4){if(t.stateNode===null)throw Error(w(162));l=t.memoizedProps,a=t.stateNode;try{a.nodeValue=l}catch(E){k(t,t.return,E)}}break;case 3:if($o=null,n=pe,pe=iu(e.containerInfo),Dt(e,t),pe=n,Lt(t),l&4&&a!==null&&a.memoizedState.isDehydrated)try{Pl(e.containerInfo)}catch(E){k(t,t.return,E)}ar&&(ar=!1,bg(t));break;case 4:l=pe,pe=iu(t.stateNode.containerInfo),Dt(e,t),Lt(t),pe=l;break;case 12:Dt(e,t),Lt(t);break;case 31:Dt(e,t),Lt(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,mo(t,l)));break;case 13:Dt(e,t),Lt(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(wu=Zt()),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,mo(t,l)));break;case 22:n=t.memoizedState!==null;var r=a!==null&&a.memoizedState!==null,p=je,h=rt;if(je=p||n,rt=h||r,Dt(e,t),rt=h,je=p,Lt(t),l&8192)t:for(e=t.stateNode,e._visibility=n?e._visibility&-2:e._visibility|1,n&&(a===null||r||je||rt||Qa(t)),a=null,e=t;;){if(e.tag===5||e.tag===26){if(a===null){r=a=e;try{if(i=r.stateNode,n)o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none";else{u=r.stateNode;var v=r.memoizedProps.style,m=v!=null&&v.hasOwnProperty("display")?v.display:null;u.style.display=m==null||typeof m=="boolean"?"":(""+m).trim()}}catch(E){k(r,r.return,E)}}}else if(e.tag===6){if(a===null){r=e;try{r.stateNode.nodeValue=n?"":r.memoizedProps}catch(E){k(r,r.return,E)}}}else if(e.tag===18){if(a===null){r=e;try{var y=r.stateNode;n?um(y,!0):um(r.stateNode,!1)}catch(E){k(r,r.return,E)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;a===e&&(a=null),e=e.return}a===e&&(a=null),e.sibling.return=e.return,e=e.sibling}l&4&&(l=t.updateQueue,l!==null&&(a=l.retryQueue,a!==null&&(l.retryQueue=null,mo(t,a))));break;case 19:Dt(e,t),Lt(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,mo(t,l)));break;case 30:break;case 21:break;default:Dt(e,t),Lt(t)}}function Lt(t){var e=t.flags;if(e&2){try{for(var a,l=t.return;l!==null;){if(fg(l)){a=l;break}l=l.return}if(a==null)throw Error(w(160));switch(a.tag){case 27:var n=a.stateNode,i=er(t);Fo(t,i,n);break;case 5:var o=a.stateNode;a.flags&32&&(Ql(o,""),a.flags&=-33);var u=er(t);Fo(t,u,o);break;case 3:case 4:var r=a.stateNode.containerInfo,p=er(t);kr(t,p,r);break;default:throw Error(w(161))}}catch(h){k(t,t.return,h)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function bg(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;bg(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function qe(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)pg(t,e.alternate,e),e=e.sibling}function Qa(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:za(4,e,e.return),Qa(e);break;case 1:_e(e,e.return);var a=e.stateNode;typeof a.componentWillUnmount=="function"&&rg(e,e.return,a),Qa(e);break;case 27:Xn(e.stateNode);case 26:case 5:_e(e,e.return),Qa(e);break;case 22:e.memoizedState===null&&Qa(e);break;case 30:Qa(e);break;default:Qa(e)}t=t.sibling}}function He(t,e,a){for(a=a&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var l=e.alternate,n=t,i=e,o=i.flags;switch(i.tag){case 0:case 11:case 15:He(n,i,a),hi(4,i);break;case 1:if(He(n,i,a),l=i,n=l.stateNode,typeof n.componentDidMount=="function")try{n.componentDidMount()}catch(p){k(l,l.return,p)}if(l=i,n=l.updateQueue,n!==null){var u=l.stateNode;try{var r=n.shared.hiddenCallbacks;if(r!==null)for(n.shared.hiddenCallbacks=null,n=0;n<r.length;n++)gh(r[n],u)}catch(p){k(l,l.return,p)}}a&&o&64&&cg(i),Vn(i,i.return);break;case 27:dg(i);case 26:case 5:He(n,i,a),a&&l===null&&o&4&&sg(i),Vn(i,i.return);break;case 12:He(n,i,a);break;case 31:He(n,i,a),a&&o&4&&gg(n,i);break;case 13:He(n,i,a),a&&o&4&&yg(n,i);break;case 22:i.memoizedState===null&&He(n,i,a),Vn(i,i.return);break;case 30:break;default:He(n,i,a)}e=e.sibling}}function Vs(t,e){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&pi(a))}function ks(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&pi(t))}function de(t,e,a,l){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Sg(t,e,a,l),e=e.sibling}function Sg(t,e,a,l){var n=e.flags;switch(e.tag){case 0:case 11:case 15:de(t,e,a,l),n&2048&&hi(9,e);break;case 1:de(t,e,a,l);break;case 3:de(t,e,a,l),n&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&pi(t)));break;case 12:if(n&2048){de(t,e,a,l),t=e.stateNode;try{var i=e.memoizedProps,o=i.id,u=i.onPostCommit;typeof u=="function"&&u(o,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(r){k(e,e.return,r)}}else de(t,e,a,l);break;case 31:de(t,e,a,l);break;case 13:de(t,e,a,l);break;case 23:break;case 22:i=e.stateNode,o=e.alternate,e.memoizedState!==null?i._visibility&2?de(t,e,a,l):kn(t,e):i._visibility&2?de(t,e,a,l):(i._visibility|=2,xl(t,e,a,l,(e.subtreeFlags&10256)!==0||!1)),n&2048&&Vs(o,e);break;case 24:de(t,e,a,l),n&2048&&ks(e.alternate,e);break;default:de(t,e,a,l)}}function xl(t,e,a,l,n){for(n=n&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var i=t,o=e,u=a,r=l,p=o.flags;switch(o.tag){case 0:case 11:case 15:xl(i,o,u,r,n),hi(8,o);break;case 23:break;case 22:var h=o.stateNode;o.memoizedState!==null?h._visibility&2?xl(i,o,u,r,n):kn(i,o):(h._visibility|=2,xl(i,o,u,r,n)),n&&p&2048&&Vs(o.alternate,o);break;case 24:xl(i,o,u,r,n),n&&p&2048&&ks(o.alternate,o);break;default:xl(i,o,u,r,n)}e=e.sibling}}function kn(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var a=t,l=e,n=l.flags;switch(l.tag){case 22:kn(a,l),n&2048&&Vs(l.alternate,l);break;case 24:kn(a,l),n&2048&&ks(l.alternate,l);break;default:kn(a,l)}e=e.sibling}}var Rn=8192;function wl(t,e,a){if(t.subtreeFlags&Rn)for(t=t.child;t!==null;)wg(t,e,a),t=t.sibling}function wg(t,e,a){switch(t.tag){case 26:wl(t,e,a),t.flags&Rn&&t.memoizedState!==null&&Fb(a,pe,t.memoizedState,t.memoizedProps);break;case 5:wl(t,e,a);break;case 3:case 4:var l=pe;pe=iu(t.stateNode.containerInfo),wl(t,e,a),pe=l;break;case 22:t.memoizedState===null&&(l=t.alternate,l!==null&&l.memoizedState!==null?(l=Rn,Rn=16777216,wl(t,e,a),Rn=l):wl(t,e,a));break;default:wl(t,e,a)}}function xg(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function _n(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var a=0;a<e.length;a++){var l=e[a];ht=l,Tg(l,t)}xg(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Eg(t),t=t.sibling}function Eg(t){switch(t.tag){case 0:case 11:case 15:_n(t),t.flags&2048&&za(9,t,t.return);break;case 3:_n(t);break;case 12:_n(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,Co(t)):_n(t);break;default:_n(t)}}function Co(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var a=0;a<e.length;a++){var l=e[a];ht=l,Tg(l,t)}xg(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:za(8,e,e.return),Co(e);break;case 22:a=e.stateNode,a._visibility&2&&(a._visibility&=-3,Co(e));break;default:Co(e)}t=t.sibling}}function Tg(t,e){for(;ht!==null;){var a=ht;switch(a.tag){case 0:case 11:case 15:za(8,a,e);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var l=a.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:pi(a.memoizedState.cache)}if(l=a.child,l!==null)l.return=a,ht=l;else t:for(a=t;ht!==null;){l=ht;var n=l.sibling,i=l.return;if(mg(l),l===a){ht=null;break t}if(n!==null){n.return=i,ht=n;break t}ht=i}}}var mb={getCacheForType:function(t){var e=xt(st),a=e.data.get(t);return a===void 0&&(a=t(),e.data.set(t,a)),a},cacheSignal:function(){return xt(st).controller.signal}},hb=typeof WeakMap=="function"?WeakMap:Map,Y=0,X=null,U=null,L=0,V=0,kt=null,ma=!1,nn=!1,Gs=!1,Ie=0,nt=0,Na=0,Wa=0,Qs=0,Xt=0,Jl=0,Gn=null,qt=null,Gr=!1,wu=0,Ag=0,Io=1/0,Po=null,wa=null,dt=0,xa=null,Wl=null,Ze=0,Qr=0,Xr=null,_g=null,Qn=0,Zr=null;function Wt(){return(Y&2)!==0&&L!==0?L&-L:z.T!==null?Zs():Dm()}function Mg(){if(Xt===0)if((L&536870912)===0||B){var t=lo;lo<<=1,(lo&3932160)===0&&(lo=262144),Xt=t}else Xt=536870912;return t=It.current,t!==null&&(t.flags|=32),Xt}function Ht(t,e,a){(t===X&&(V===2||V===9)||t.cancelPendingCommit!==null)&&(Fl(t,0),ha(t,L,Xt,!1)),si(t,a),((Y&2)===0||t!==X)&&(t===X&&((Y&2)===0&&(Wa|=a),nt===4&&ha(t,L,Xt,!1)),Ne(t))}function zg(t,e,a){if((Y&6)!==0)throw Error(w(327));var l=!a&&(e&127)===0&&(e&t.expiredLanes)===0||ri(t,e),n=l?vb(t,e):lr(t,e,!0),i=l;do{if(n===0){nn&&!l&&ha(t,e,0,!1);break}else{if(a=t.current.alternate,i&&!gb(a)){n=lr(t,e,!1),i=!1;continue}if(n===2){if(i=e,t.errorRecoveryDisabledLanes&i)var o=0;else o=t.pendingLanes&-536870913,o=o!==0?o:o&536870912?536870912:0;if(o!==0){e=o;t:{var u=t;n=Gn;var r=u.current.memoizedState.isDehydrated;if(r&&(Fl(u,o).flags|=256),o=lr(u,o,!1),o!==2){if(Gs&&!r){u.errorRecoveryDisabledLanes|=i,Wa|=i,n=4;break t}i=qt,qt=n,i!==null&&(qt===null?qt=i:qt.push.apply(qt,i))}n=o}if(i=!1,n!==2)continue}}if(n===1){Fl(t,0),ha(t,e,0,!0);break}t:{switch(l=t,i=n,i){case 0:case 1:throw Error(w(345));case 4:if((e&4194048)!==e)break;case 6:ha(l,e,Xt,!ma);break t;case 2:qt=null;break;case 3:case 5:break;default:throw Error(w(329))}if((e&62914560)===e&&(n=wu+300-Zt(),10<n)){if(ha(l,e,Xt,!ma),su(l,0,!0)!==0)break t;Ze=e,l.timeoutHandle=Kg(Xp.bind(null,l,a,qt,Po,Gr,e,Xt,Wa,Jl,ma,i,"Throttled",-0,0),n);break t}Xp(l,a,qt,Po,Gr,e,Xt,Wa,Jl,ma,i,null,-0,0)}}break}while(!0);Ne(t)}function Xp(t,e,a,l,n,i,o,u,r,p,h,v,m,y){if(t.timeoutHandle=-1,v=e.subtreeFlags,v&8192||(v&16785408)===16785408){v={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ke},wg(e,i,v);var E=(i&62914560)===i?wu-Zt():(i&4194048)===i?Ag-Zt():0;if(E=Ib(v,E),E!==null){Ze=i,t.cancelPendingCommit=E(Kp.bind(null,t,e,i,a,l,n,o,u,r,h,v,null,m,y)),ha(t,i,o,!p);return}}Kp(t,e,i,a,l,n,o,u,r)}function gb(t){for(var e=t;;){var a=e.tag;if((a===0||a===11||a===15)&&e.flags&16384&&(a=e.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var l=0;l<a.length;l++){var n=a[l],i=n.getSnapshot;n=n.value;try{if(!Ft(i(),n))return!1}catch{return!1}}if(a=e.child,e.subtreeFlags&16384&&a!==null)a.return=e,e=a;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function ha(t,e,a,l){e&=~Qs,e&=~Wa,t.suspendedLanes|=e,t.pingedLanes&=~e,l&&(t.warmLanes|=e),l=t.expirationTimes;for(var n=e;0<n;){var i=31-Jt(n),o=1<<i;l[i]=-1,n&=~o}a!==0&&$m(t,a,e)}function xu(){return(Y&6)===0?(gi(0,!1),!1):!0}function Xs(){if(U!==null){if(V===0)var t=U.return;else t=U,Ge=ol=null,Os(t),Yl=null,Pn=0,t=U;for(;t!==null;)ug(t.alternate,t),t=t.return;U=null}}function Fl(t,e){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,Ub(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),Ze=0,Xs(),X=t,U=a=Qe(t.current,null),L=e,V=0,kt=null,ma=!1,nn=ri(t,e),Gs=!1,Jl=Xt=Qs=Wa=Na=nt=0,qt=Gn=null,Gr=!1,(e&8)!==0&&(e|=e&32);var l=t.entangledLanes;if(l!==0)for(t=t.entanglements,l&=e;0<l;){var n=31-Jt(l),i=1<<n;e|=t[n],l&=~i}return Ie=e,mu(),a}function Ng(t,e){O=null,z.H=ei,e===ln||e===gu?(e=Tp(),V=3):e===Ts?(e=Tp(),V=4):V=e===Ys?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,kt=e,U===null&&(nt=1,Jo(t,ue(e,t.current)))}function Cg(){var t=It.current;return t===null?!0:(L&4194048)===L?re===null:(L&62914560)===L||(L&536870912)!==0?t===re:!1}function Og(){var t=z.H;return z.H=ei,t===null?ei:t}function $g(){var t=z.A;return z.A=mb,t}function tu(){nt=4,ma||(L&4194048)!==L&&It.current!==null||(nn=!0),(Na&134217727)===0&&(Wa&134217727)===0||X===null||ha(X,L,Xt,!1)}function lr(t,e,a){var l=Y;Y|=2;var n=Og(),i=$g();(X!==t||L!==e)&&(Po=null,Fl(t,e)),e=!1;var o=nt;t:do try{if(V!==0&&U!==null){var u=U,r=kt;switch(V){case 8:Xs(),o=6;break t;case 3:case 2:case 9:case 6:It.current===null&&(e=!0);var p=V;if(V=0,kt=null,Dl(t,u,r,p),a&&nn){o=0;break t}break;default:p=V,V=0,kt=null,Dl(t,u,r,p)}}yb(),o=nt;break}catch(h){Ng(t,h)}while(!0);return e&&t.shellSuspendCounter++,Ge=ol=null,Y=l,z.H=n,z.A=i,U===null&&(X=null,L=0,mu()),o}function yb(){for(;U!==null;)Rg(U)}function vb(t,e){var a=Y;Y|=2;var l=Og(),n=$g();X!==t||L!==e?(Po=null,Io=Zt()+500,Fl(t,e)):nn=ri(t,e);t:do try{if(V!==0&&U!==null){e=U;var i=kt;e:switch(V){case 1:V=0,kt=null,Dl(t,e,i,1);break;case 2:case 9:if(Ep(i)){V=0,kt=null,Zp(e);break}e=function(){V!==2&&V!==9||X!==t||(V=7),Ne(t)},i.then(e,e);break t;case 3:V=7;break t;case 4:V=5;break t;case 7:Ep(i)?(V=0,kt=null,Zp(e)):(V=0,kt=null,Dl(t,e,i,7));break;case 5:var o=null;switch(U.tag){case 26:o=U.memoizedState;case 5:case 27:var u=U;if(o?Pg(o):u.stateNode.complete){V=0,kt=null;var r=u.sibling;if(r!==null)U=r;else{var p=u.return;p!==null?(U=p,Eu(p)):U=null}break e}}V=0,kt=null,Dl(t,e,i,5);break;case 6:V=0,kt=null,Dl(t,e,i,6);break;case 8:Xs(),nt=6;break t;default:throw Error(w(462))}}bb();break}catch(h){Ng(t,h)}while(!0);return Ge=ol=null,z.H=l,z.A=n,Y=a,U!==null?0:(X=null,L=0,mu(),nt)}function bb(){for(;U!==null&&!Vv();)Rg(U)}function Rg(t){var e=og(t.alternate,t,Ie);t.memoizedProps=t.pendingProps,e===null?Eu(t):U=e}function Zp(t){var e=t,a=e.alternate;switch(e.tag){case 15:case 0:e=Yp(a,e,e.pendingProps,e.type,void 0,L);break;case 11:e=Yp(a,e,e.pendingProps,e.type.render,e.ref,L);break;case 5:Os(e);default:ug(a,e),e=U=uh(e,Ie),e=og(a,e,Ie)}t.memoizedProps=t.pendingProps,e===null?Eu(t):U=e}function Dl(t,e,a,l){Ge=ol=null,Os(e),Yl=null,Pn=0;var n=e.return;try{if(ub(t,n,e,a,L)){nt=1,Jo(t,ue(a,t.current)),U=null;return}}catch(i){if(n!==null)throw U=n,i;nt=1,Jo(t,ue(a,t.current)),U=null;return}e.flags&32768?(B||l===1?t=!0:nn||(L&536870912)!==0?t=!1:(ma=t=!0,(l===2||l===9||l===3||l===6)&&(l=It.current,l!==null&&l.tag===13&&(l.flags|=16384))),Ug(e,t)):Eu(e)}function Eu(t){var e=t;do{if((e.flags&32768)!==0){Ug(e,ma);return}t=e.return;var a=sb(e.alternate,e,Ie);if(a!==null){U=a;return}if(e=e.sibling,e!==null){U=e;return}U=e=t}while(e!==null);nt===0&&(nt=5)}function Ug(t,e){do{var a=fb(t.alternate,t);if(a!==null){a.flags&=32767,U=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!e&&(t=t.sibling,t!==null)){U=t;return}U=t=a}while(t!==null);nt=6,U=null}function Kp(t,e,a,l,n,i,o,u,r){t.cancelPendingCommit=null;do Tu();while(dt!==0);if((Y&6)!==0)throw Error(w(327));if(e!==null){if(e===t.current)throw Error(w(177));if(i=e.lanes|e.childLanes,i|=ys,Iv(t,a,i,o,u,r),t===X&&(U=X=null,L=0),Wl=e,xa=t,Ze=a,Qr=i,Xr=n,_g=l,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,Eb(qo,function(){return Hg(),null})):(t.callbackNode=null,t.callbackPriority=0),l=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||l){l=z.T,z.T=null,n=j.p,j.p=2,o=Y,Y|=4;try{db(t,e,a)}finally{Y=o,j.p=n,z.T=l}}dt=1,Dg(),Lg(),Bg()}}function Dg(){if(dt===1){dt=0;var t=xa,e=Wl,a=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||a){a=z.T,z.T=null;var l=j.p;j.p=2;var n=Y;Y|=4;try{vg(e,t);var i=Fr,o=Pm(t.containerInfo),u=i.focusedElem,r=i.selectionRange;if(o!==u&&u&&u.ownerDocument&&Im(u.ownerDocument.documentElement,u)){if(r!==null&&gs(u)){var p=r.start,h=r.end;if(h===void 0&&(h=p),"selectionStart"in u)u.selectionStart=p,u.selectionEnd=Math.min(h,u.value.length);else{var v=u.ownerDocument||document,m=v&&v.defaultView||window;if(m.getSelection){var y=m.getSelection(),E=u.textContent.length,_=Math.min(r.start,E),C=r.end===void 0?_:Math.min(r.end,E);!y.extend&&_>C&&(o=C,C=_,_=o);var f=gp(u,_),s=gp(u,C);if(f&&s&&(y.rangeCount!==1||y.anchorNode!==f.node||y.anchorOffset!==f.offset||y.focusNode!==s.node||y.focusOffset!==s.offset)){var g=v.createRange();g.setStart(f.node,f.offset),y.removeAllRanges(),_>C?(y.addRange(g),y.extend(s.node,s.offset)):(g.setEnd(s.node,s.offset),y.addRange(g))}}}}for(v=[],y=u;y=y.parentNode;)y.nodeType===1&&v.push({element:y,left:y.scrollLeft,top:y.scrollTop});for(typeof u.focus=="function"&&u.focus(),u=0;u<v.length;u++){var b=v[u];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}cu=!!Wr,Fr=Wr=null}finally{Y=n,j.p=l,z.T=a}}t.current=e,dt=2}}function Lg(){if(dt===2){dt=0;var t=xa,e=Wl,a=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||a){a=z.T,z.T=null;var l=j.p;j.p=2;var n=Y;Y|=4;try{pg(t,e.alternate,e)}finally{Y=n,j.p=l,z.T=a}}dt=3}}function Bg(){if(dt===4||dt===3){dt=0,kv();var t=xa,e=Wl,a=Ze,l=_g;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?dt=5:(dt=0,Wl=xa=null,qg(t,t.pendingLanes));var n=t.pendingLanes;if(n===0&&(wa=null),rs(a),e=e.stateNode,Kt&&typeof Kt.onCommitFiberRoot=="function")try{Kt.onCommitFiberRoot(ci,e,void 0,(e.current.flags&128)===128)}catch{}if(l!==null){e=z.T,n=j.p,j.p=2,z.T=null;try{for(var i=t.onRecoverableError,o=0;o<l.length;o++){var u=l[o];i(u.value,{componentStack:u.stack})}}finally{z.T=e,j.p=n}}(Ze&3)!==0&&Tu(),Ne(t),n=t.pendingLanes,(a&261930)!==0&&(n&42)!==0?t===Zr?Qn++:(Qn=0,Zr=t):Qn=0,gi(0,!1)}}function qg(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,pi(e)))}function Tu(){return Dg(),Lg(),Bg(),Hg()}function Hg(){if(dt!==5)return!1;var t=xa,e=Qr;Qr=0;var a=rs(Ze),l=z.T,n=j.p;try{j.p=32>a?32:a,z.T=null,a=Xr,Xr=null;var i=xa,o=Ze;if(dt=0,Wl=xa=null,Ze=0,(Y&6)!==0)throw Error(w(331));var u=Y;if(Y|=4,Eg(i.current),Sg(i,i.current,o,a),Y=u,gi(0,!1),Kt&&typeof Kt.onPostCommitFiberRoot=="function")try{Kt.onPostCommitFiberRoot(ci,i)}catch{}return!0}finally{j.p=n,z.T=l,qg(t,e)}}function Jp(t,e,a){e=ue(a,e),e=Yr(t.stateNode,e,2),t=Sa(t,e,2),t!==null&&(si(t,2),Ne(t))}function k(t,e,a){if(t.tag===3)Jp(t,t,a);else for(;e!==null;){if(e.tag===3){Jp(e,t,a);break}else if(e.tag===1){var l=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(wa===null||!wa.has(l))){t=ue(a,t),a=tg(2),l=Sa(e,a,2),l!==null&&(eg(a,l,e,t),si(l,2),Ne(l));break}}e=e.return}}function nr(t,e,a){var l=t.pingCache;if(l===null){l=t.pingCache=new hb;var n=new Set;l.set(e,n)}else n=l.get(e),n===void 0&&(n=new Set,l.set(e,n));n.has(a)||(Gs=!0,n.add(a),t=Sb.bind(null,t,e,a),e.then(t,t))}function Sb(t,e,a){var l=t.pingCache;l!==null&&l.delete(e),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,X===t&&(L&a)===a&&(nt===4||nt===3&&(L&62914560)===L&&300>Zt()-wu?(Y&2)===0&&Fl(t,0):Qs|=a,Jl===L&&(Jl=0)),Ne(t)}function Yg(t,e){e===0&&(e=Om()),t=il(t,e),t!==null&&(si(t,e),Ne(t))}function wb(t){var e=t.memoizedState,a=0;e!==null&&(a=e.retryLane),Yg(t,a)}function xb(t,e){var a=0;switch(t.tag){case 31:case 13:var l=t.stateNode,n=t.memoizedState;n!==null&&(a=n.retryLane);break;case 19:l=t.stateNode;break;case 22:l=t.stateNode._retryCache;break;default:throw Error(w(314))}l!==null&&l.delete(e),Yg(t,a)}function Eb(t,e){return us(t,e)}var eu=null,El=null,Kr=!1,au=!1,ir=!1,ga=0;function Ne(t){t!==El&&t.next===null&&(El===null?eu=El=t:El=El.next=t),au=!0,Kr||(Kr=!0,Ab())}function gi(t,e){if(!ir&&au){ir=!0;do for(var a=!1,l=eu;l!==null;){if(!e)if(t!==0){var n=l.pendingLanes;if(n===0)var i=0;else{var o=l.suspendedLanes,u=l.pingedLanes;i=(1<<31-Jt(42|t)+1)-1,i&=n&~(o&~u),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(a=!0,Wp(l,i))}else i=L,i=su(l,l===X?i:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(i&3)===0||ri(l,i)||(a=!0,Wp(l,i));l=l.next}while(a);ir=!1}}function Tb(){jg()}function jg(){au=Kr=!1;var t=0;ga!==0&&Rb()&&(t=ga);for(var e=Zt(),a=null,l=eu;l!==null;){var n=l.next,i=Vg(l,e);i===0?(l.next=null,a===null?eu=n:a.next=n,n===null&&(El=a)):(a=l,(t!==0||(i&3)!==0)&&(au=!0)),l=n}dt!==0&&dt!==5||gi(t,!1),ga!==0&&(ga=0)}function Vg(t,e){for(var a=t.suspendedLanes,l=t.pingedLanes,n=t.expirationTimes,i=t.pendingLanes&-62914561;0<i;){var o=31-Jt(i),u=1<<o,r=n[o];r===-1?((u&a)===0||(u&l)!==0)&&(n[o]=Fv(u,e)):r<=e&&(t.expiredLanes|=u),i&=~u}if(e=X,a=L,a=su(t,t===e?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l=t.callbackNode,a===0||t===e&&(V===2||V===9)||t.cancelPendingCommit!==null)return l!==null&&l!==null&&Uc(l),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||ri(t,a)){if(e=a&-a,e===t.callbackPriority)return e;switch(l!==null&&Uc(l),rs(a)){case 2:case 8:a=Nm;break;case 32:a=qo;break;case 268435456:a=Cm;break;default:a=qo}return l=kg.bind(null,t),a=us(a,l),t.callbackPriority=e,t.callbackNode=a,e}return l!==null&&l!==null&&Uc(l),t.callbackPriority=2,t.callbackNode=null,2}function kg(t,e){if(dt!==0&&dt!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(Tu()&&t.callbackNode!==a)return null;var l=L;return l=su(t,t===X?l:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l===0?null:(zg(t,l,e),Vg(t,Zt()),t.callbackNode!=null&&t.callbackNode===a?kg.bind(null,t):null)}function Wp(t,e){if(Tu())return null;zg(t,e,!0)}function Ab(){Db(function(){(Y&6)!==0?us(zm,Tb):jg()})}function Zs(){if(ga===0){var t=Xl;t===0&&(t=ao,ao<<=1,(ao&261888)===0&&(ao=256)),ga=t}return ga}function Fp(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:wo(""+t)}function Ip(t,e){var a=e.ownerDocument.createElement("input");return a.name=e.name,a.value=e.value,t.id&&a.setAttribute("form",t.id),e.parentNode.insertBefore(a,e),t=new FormData(t),a.parentNode.removeChild(a),t}function _b(t,e,a,l,n){if(e==="submit"&&a&&a.stateNode===n){var i=Fp((n[Yt]||null).action),o=l.submitter;o&&(e=(e=o[Yt]||null)?Fp(e.formAction):o.getAttribute("formAction"),e!==null&&(i=e,o=null));var u=new fu("action","action",null,l,n);t.push({event:u,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(ga!==0){var r=o?Ip(n,o):new FormData(n);qr(a,{pending:!0,data:r,method:n.method,action:i},null,r)}}else typeof i=="function"&&(u.preventDefault(),r=o?Ip(n,o):new FormData(n),qr(a,{pending:!0,data:r,method:n.method,action:i},i,r))},currentTarget:n}]})}}for(ho=0;ho<_r.length;ho++)go=_r[ho],Pp=go.toLowerCase(),tm=go[0].toUpperCase()+go.slice(1),me(Pp,"on"+tm);var go,Pp,tm,ho;me(eh,"onAnimationEnd");me(ah,"onAnimationIteration");me(lh,"onAnimationStart");me("dblclick","onDoubleClick");me("focusin","onFocus");me("focusout","onBlur");me(G1,"onTransitionRun");me(Q1,"onTransitionStart");me(X1,"onTransitionCancel");me(nh,"onTransitionEnd");Gl("onMouseEnter",["mouseout","mouseover"]);Gl("onMouseLeave",["mouseout","mouseover"]);Gl("onPointerEnter",["pointerout","pointerover"]);Gl("onPointerLeave",["pointerout","pointerover"]);al("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));al("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));al("onBeforeInput",["compositionend","keypress","textInput","paste"]);al("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));al("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));al("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ai="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Mb=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ai));function Gg(t,e){e=(e&4)!==0;for(var a=0;a<t.length;a++){var l=t[a],n=l.event;l=l.listeners;t:{var i=void 0;if(e)for(var o=l.length-1;0<=o;o--){var u=l[o],r=u.instance,p=u.currentTarget;if(u=u.listener,r!==i&&n.isPropagationStopped())break t;i=u,n.currentTarget=p;try{i(n)}catch(h){Yo(h)}n.currentTarget=null,i=r}else for(o=0;o<l.length;o++){if(u=l[o],r=u.instance,p=u.currentTarget,u=u.listener,r!==i&&n.isPropagationStopped())break t;i=u,n.currentTarget=p;try{i(n)}catch(h){Yo(h)}n.currentTarget=null,i=r}}}}function R(t,e){var a=e[vr];a===void 0&&(a=e[vr]=new Set);var l=t+"__bubble";a.has(l)||(Qg(e,t,2,!1),a.add(l))}function or(t,e,a){var l=0;e&&(l|=4),Qg(a,t,l,e)}var yo="_reactListening"+Math.random().toString(36).slice(2);function Ks(t){if(!t[yo]){t[yo]=!0,Lm.forEach(function(a){a!=="selectionchange"&&(Mb.has(a)||or(a,!1,t),or(a,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[yo]||(e[yo]=!0,or("selectionchange",!1,e))}}function Qg(t,e,a,l){switch(ny(e)){case 2:var n=eS;break;case 8:n=aS;break;default:n=Is}a=n.bind(null,e,a,t),n=void 0,!Er||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(n=!0),l?n!==void 0?t.addEventListener(e,a,{capture:!0,passive:n}):t.addEventListener(e,a,!0):n!==void 0?t.addEventListener(e,a,{passive:n}):t.addEventListener(e,a,!1)}function ur(t,e,a,l,n){var i=l;if((e&1)===0&&(e&2)===0&&l!==null)t:for(;;){if(l===null)return;var o=l.tag;if(o===3||o===4){var u=l.stateNode.containerInfo;if(u===n)break;if(o===4)for(o=l.return;o!==null;){var r=o.tag;if((r===3||r===4)&&o.stateNode.containerInfo===n)return;o=o.return}for(;u!==null;){if(o=_l(u),o===null)return;if(r=o.tag,r===5||r===6||r===26||r===27){l=i=o;continue t}u=u.parentNode}}l=l.return}Gm(function(){var p=i,h=ds(a),v=[];t:{var m=ih.get(t);if(m!==void 0){var y=fu,E=t;switch(t){case"keypress":if(Eo(a)===0)break t;case"keydown":case"keyup":y=x1;break;case"focusin":E="focus",y=Hc;break;case"focusout":E="blur",y=Hc;break;case"beforeblur":case"afterblur":y=Hc;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=up;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=s1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=A1;break;case eh:case ah:case lh:y=p1;break;case nh:y=M1;break;case"scroll":case"scrollend":y=c1;break;case"wheel":y=N1;break;case"copy":case"cut":case"paste":y=h1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=rp;break;case"toggle":case"beforetoggle":y=O1}var _=(e&4)!==0,C=!_&&(t==="scroll"||t==="scrollend"),f=_?m!==null?m+"Capture":null:m;_=[];for(var s=p,g;s!==null;){var b=s;if(g=b.stateNode,b=b.tag,b!==5&&b!==26&&b!==27||g===null||f===null||(b=Kn(s,f),b!=null&&_.push(li(s,b,g))),C)break;s=s.return}0<_.length&&(m=new y(m,E,null,a,h),v.push({event:m,listeners:_}))}}if((e&7)===0){t:{if(m=t==="mouseover"||t==="pointerover",y=t==="mouseout"||t==="pointerout",m&&a!==xr&&(E=a.relatedTarget||a.fromElement)&&(_l(E)||E[tn]))break t;if((y||m)&&(m=h.window===h?h:(m=h.ownerDocument)?m.defaultView||m.parentWindow:window,y?(E=a.relatedTarget||a.toElement,y=p,E=E?_l(E):null,E!==null&&(C=ui(E),_=E.tag,E!==C||_!==5&&_!==27&&_!==6)&&(E=null)):(y=null,E=p),y!==E)){if(_=up,b="onMouseLeave",f="onMouseEnter",s="mouse",(t==="pointerout"||t==="pointerover")&&(_=rp,b="onPointerLeave",f="onPointerEnter",s="pointer"),C=y==null?m:On(y),g=E==null?m:On(E),m=new _(b,s+"leave",y,a,h),m.target=C,m.relatedTarget=g,b=null,_l(h)===p&&(_=new _(f,s+"enter",E,a,h),_.target=g,_.relatedTarget=C,b=_),C=b,y&&E)e:{for(_=zb,f=y,s=E,g=0,b=f;b;b=_(b))g++;b=0;for(var A=s;A;A=_(A))b++;for(;0<g-b;)f=_(f),g--;for(;0<b-g;)s=_(s),b--;for(;g--;){if(f===s||s!==null&&f===s.alternate){_=f;break e}f=_(f),s=_(s)}_=null}else _=null;y!==null&&em(v,m,y,_,!1),E!==null&&C!==null&&em(v,C,E,_,!0)}}t:{if(m=p?On(p):window,y=m.nodeName&&m.nodeName.toLowerCase(),y==="select"||y==="input"&&m.type==="file")var q=pp;else if(dp(m))if(Wm)q=j1;else{q=H1;var T=q1}else y=m.nodeName,!y||y.toLowerCase()!=="input"||m.type!=="checkbox"&&m.type!=="radio"?p&&fs(p.elementType)&&(q=pp):q=Y1;if(q&&(q=q(t,p))){Jm(v,q,a,h);break t}T&&T(t,m,p),t==="focusout"&&p&&m.type==="number"&&p.memoizedProps.value!=null&&wr(m,"number",m.value)}switch(T=p?On(p):window,t){case"focusin":(dp(T)||T.contentEditable==="true")&&(Nl=T,Tr=p,Ln=null);break;case"focusout":Ln=Tr=Nl=null;break;case"mousedown":Ar=!0;break;case"contextmenu":case"mouseup":case"dragend":Ar=!1,yp(v,a,h);break;case"selectionchange":if(k1)break;case"keydown":case"keyup":yp(v,a,h)}var $;if(hs)t:{switch(t){case"compositionstart":var D="onCompositionStart";break t;case"compositionend":D="onCompositionEnd";break t;case"compositionupdate":D="onCompositionUpdate";break t}D=void 0}else zl?Zm(t,a)&&(D="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(D="onCompositionStart");D&&(Xm&&a.locale!=="ko"&&(zl||D!=="onCompositionStart"?D==="onCompositionEnd"&&zl&&($=Qm()):(pa=h,ps="value"in pa?pa.value:pa.textContent,zl=!0)),T=lu(p,D),0<T.length&&(D=new cp(D,t,null,a,h),v.push({event:D,listeners:T}),$?D.data=$:($=Km(a),$!==null&&(D.data=$)))),($=R1?U1(t,a):D1(t,a))&&(D=lu(p,"onBeforeInput"),0<D.length&&(T=new cp("onBeforeInput","beforeinput",null,a,h),v.push({event:T,listeners:D}),T.data=$)),_b(v,t,p,a,h)}Gg(v,e)})}function li(t,e,a){return{instance:t,listener:e,currentTarget:a}}function lu(t,e){for(var a=e+"Capture",l=[];t!==null;){var n=t,i=n.stateNode;if(n=n.tag,n!==5&&n!==26&&n!==27||i===null||(n=Kn(t,a),n!=null&&l.unshift(li(t,n,i)),n=Kn(t,e),n!=null&&l.push(li(t,n,i))),t.tag===3)return l;t=t.return}return[]}function zb(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function em(t,e,a,l,n){for(var i=e._reactName,o=[];a!==null&&a!==l;){var u=a,r=u.alternate,p=u.stateNode;if(u=u.tag,r!==null&&r===l)break;u!==5&&u!==26&&u!==27||p===null||(r=p,n?(p=Kn(a,i),p!=null&&o.unshift(li(a,p,r))):n||(p=Kn(a,i),p!=null&&o.push(li(a,p,r)))),a=a.return}o.length!==0&&t.push({event:e,listeners:o})}var Nb=/\r\n?/g,Cb=/\u0000|\uFFFD/g;function am(t){return(typeof t=="string"?t:""+t).replace(Nb,`
`).replace(Cb,"")}function Xg(t,e){return e=am(e),am(t)===e}function G(t,e,a,l,n,i){switch(a){case"children":typeof l=="string"?e==="body"||e==="textarea"&&l===""||Ql(t,l):(typeof l=="number"||typeof l=="bigint")&&e!=="body"&&Ql(t,""+l);break;case"className":io(t,"class",l);break;case"tabIndex":io(t,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":io(t,a,l);break;case"style":km(t,l,i);break;case"data":if(e!=="object"){io(t,"data",l);break}case"src":case"href":if(l===""&&(e!=="a"||a!=="href")){t.removeAttribute(a);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(a);break}l=wo(""+l),t.setAttribute(a,l);break;case"action":case"formAction":if(typeof l=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(a==="formAction"?(e!=="input"&&G(t,e,"name",n.name,n,null),G(t,e,"formEncType",n.formEncType,n,null),G(t,e,"formMethod",n.formMethod,n,null),G(t,e,"formTarget",n.formTarget,n,null)):(G(t,e,"encType",n.encType,n,null),G(t,e,"method",n.method,n,null),G(t,e,"target",n.target,n,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(a);break}l=wo(""+l),t.setAttribute(a,l);break;case"onClick":l!=null&&(t.onclick=ke);break;case"onScroll":l!=null&&R("scroll",t);break;case"onScrollEnd":l!=null&&R("scrollend",t);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(w(61));if(a=l.__html,a!=null){if(n.children!=null)throw Error(w(60));t.innerHTML=a}}break;case"multiple":t.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":t.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){t.removeAttribute("xlink:href");break}a=wo(""+l),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(a,""+l):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":l===!0?t.setAttribute(a,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(a,l):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?t.setAttribute(a,l):t.removeAttribute(a);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?t.removeAttribute(a):t.setAttribute(a,l);break;case"popover":R("beforetoggle",t),R("toggle",t),So(t,"popover",l);break;case"xlinkActuate":De(t,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":De(t,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":De(t,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":De(t,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":De(t,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":De(t,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":De(t,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":De(t,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":De(t,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":So(t,"is",l);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=o1.get(a)||a,So(t,a,l))}}function Jr(t,e,a,l,n,i){switch(a){case"style":km(t,l,i);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(w(61));if(a=l.__html,a!=null){if(n.children!=null)throw Error(w(60));t.innerHTML=a}}break;case"children":typeof l=="string"?Ql(t,l):(typeof l=="number"||typeof l=="bigint")&&Ql(t,""+l);break;case"onScroll":l!=null&&R("scroll",t);break;case"onScrollEnd":l!=null&&R("scrollend",t);break;case"onClick":l!=null&&(t.onclick=ke);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Bm.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(n=a.endsWith("Capture"),e=a.slice(2,n?a.length-7:void 0),i=t[Yt]||null,i=i!=null?i[a]:null,typeof i=="function"&&t.removeEventListener(e,i,n),typeof l=="function")){typeof i!="function"&&i!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(e,l,n);break t}a in t?t[a]=l:l===!0?t.setAttribute(a,""):So(t,a,l)}}}function Et(t,e,a){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":R("error",t),R("load",t);var l=!1,n=!1,i;for(i in a)if(a.hasOwnProperty(i)){var o=a[i];if(o!=null)switch(i){case"src":l=!0;break;case"srcSet":n=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(w(137,e));default:G(t,e,i,o,a,null)}}n&&G(t,e,"srcSet",a.srcSet,a,null),l&&G(t,e,"src",a.src,a,null);return;case"input":R("invalid",t);var u=i=o=n=null,r=null,p=null;for(l in a)if(a.hasOwnProperty(l)){var h=a[l];if(h!=null)switch(l){case"name":n=h;break;case"type":o=h;break;case"checked":r=h;break;case"defaultChecked":p=h;break;case"value":i=h;break;case"defaultValue":u=h;break;case"children":case"dangerouslySetInnerHTML":if(h!=null)throw Error(w(137,e));break;default:G(t,e,l,h,a,null)}}Ym(t,i,u,r,p,o,n,!1);return;case"select":R("invalid",t),l=o=i=null;for(n in a)if(a.hasOwnProperty(n)&&(u=a[n],u!=null))switch(n){case"value":i=u;break;case"defaultValue":o=u;break;case"multiple":l=u;default:G(t,e,n,u,a,null)}e=i,a=o,t.multiple=!!l,e!=null?Bl(t,!!l,e,!1):a!=null&&Bl(t,!!l,a,!0);return;case"textarea":R("invalid",t),i=n=l=null;for(o in a)if(a.hasOwnProperty(o)&&(u=a[o],u!=null))switch(o){case"value":l=u;break;case"defaultValue":n=u;break;case"children":i=u;break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(w(91));break;default:G(t,e,o,u,a,null)}Vm(t,l,n,i);return;case"option":for(r in a)if(a.hasOwnProperty(r)&&(l=a[r],l!=null))switch(r){case"selected":t.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:G(t,e,r,l,a,null)}return;case"dialog":R("beforetoggle",t),R("toggle",t),R("cancel",t),R("close",t);break;case"iframe":case"object":R("load",t);break;case"video":case"audio":for(l=0;l<ai.length;l++)R(ai[l],t);break;case"image":R("error",t),R("load",t);break;case"details":R("toggle",t);break;case"embed":case"source":case"link":R("error",t),R("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(p in a)if(a.hasOwnProperty(p)&&(l=a[p],l!=null))switch(p){case"children":case"dangerouslySetInnerHTML":throw Error(w(137,e));default:G(t,e,p,l,a,null)}return;default:if(fs(e)){for(h in a)a.hasOwnProperty(h)&&(l=a[h],l!==void 0&&Jr(t,e,h,l,a,void 0));return}}for(u in a)a.hasOwnProperty(u)&&(l=a[u],l!=null&&G(t,e,u,l,a,null))}function Ob(t,e,a,l){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var n=null,i=null,o=null,u=null,r=null,p=null,h=null;for(y in a){var v=a[y];if(a.hasOwnProperty(y)&&v!=null)switch(y){case"checked":break;case"value":break;case"defaultValue":r=v;default:l.hasOwnProperty(y)||G(t,e,y,null,l,v)}}for(var m in l){var y=l[m];if(v=a[m],l.hasOwnProperty(m)&&(y!=null||v!=null))switch(m){case"type":i=y;break;case"name":n=y;break;case"checked":p=y;break;case"defaultChecked":h=y;break;case"value":o=y;break;case"defaultValue":u=y;break;case"children":case"dangerouslySetInnerHTML":if(y!=null)throw Error(w(137,e));break;default:y!==v&&G(t,e,m,y,l,v)}}Sr(t,o,u,r,p,h,i,n);return;case"select":y=o=u=m=null;for(i in a)if(r=a[i],a.hasOwnProperty(i)&&r!=null)switch(i){case"value":break;case"multiple":y=r;default:l.hasOwnProperty(i)||G(t,e,i,null,l,r)}for(n in l)if(i=l[n],r=a[n],l.hasOwnProperty(n)&&(i!=null||r!=null))switch(n){case"value":m=i;break;case"defaultValue":u=i;break;case"multiple":o=i;default:i!==r&&G(t,e,n,i,l,r)}e=u,a=o,l=y,m!=null?Bl(t,!!a,m,!1):!!l!=!!a&&(e!=null?Bl(t,!!a,e,!0):Bl(t,!!a,a?[]:"",!1));return;case"textarea":y=m=null;for(u in a)if(n=a[u],a.hasOwnProperty(u)&&n!=null&&!l.hasOwnProperty(u))switch(u){case"value":break;case"children":break;default:G(t,e,u,null,l,n)}for(o in l)if(n=l[o],i=a[o],l.hasOwnProperty(o)&&(n!=null||i!=null))switch(o){case"value":m=n;break;case"defaultValue":y=n;break;case"children":break;case"dangerouslySetInnerHTML":if(n!=null)throw Error(w(91));break;default:n!==i&&G(t,e,o,n,l,i)}jm(t,m,y);return;case"option":for(var E in a)if(m=a[E],a.hasOwnProperty(E)&&m!=null&&!l.hasOwnProperty(E))switch(E){case"selected":t.selected=!1;break;default:G(t,e,E,null,l,m)}for(r in l)if(m=l[r],y=a[r],l.hasOwnProperty(r)&&m!==y&&(m!=null||y!=null))switch(r){case"selected":t.selected=m&&typeof m!="function"&&typeof m!="symbol";break;default:G(t,e,r,m,l,y)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var _ in a)m=a[_],a.hasOwnProperty(_)&&m!=null&&!l.hasOwnProperty(_)&&G(t,e,_,null,l,m);for(p in l)if(m=l[p],y=a[p],l.hasOwnProperty(p)&&m!==y&&(m!=null||y!=null))switch(p){case"children":case"dangerouslySetInnerHTML":if(m!=null)throw Error(w(137,e));break;default:G(t,e,p,m,l,y)}return;default:if(fs(e)){for(var C in a)m=a[C],a.hasOwnProperty(C)&&m!==void 0&&!l.hasOwnProperty(C)&&Jr(t,e,C,void 0,l,m);for(h in l)m=l[h],y=a[h],!l.hasOwnProperty(h)||m===y||m===void 0&&y===void 0||Jr(t,e,h,m,l,y);return}}for(var f in a)m=a[f],a.hasOwnProperty(f)&&m!=null&&!l.hasOwnProperty(f)&&G(t,e,f,null,l,m);for(v in l)m=l[v],y=a[v],!l.hasOwnProperty(v)||m===y||m==null&&y==null||G(t,e,v,m,l,y)}function lm(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function $b(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,a=performance.getEntriesByType("resource"),l=0;l<a.length;l++){var n=a[l],i=n.transferSize,o=n.initiatorType,u=n.duration;if(i&&u&&lm(o)){for(o=0,u=n.responseEnd,l+=1;l<a.length;l++){var r=a[l],p=r.startTime;if(p>u)break;var h=r.transferSize,v=r.initiatorType;h&&lm(v)&&(r=r.responseEnd,o+=h*(r<u?1:(u-p)/(r-p)))}if(--l,e+=8*(i+o)/(n.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Wr=null,Fr=null;function nu(t){return t.nodeType===9?t:t.ownerDocument}function nm(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Zg(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function Ir(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var cr=null;function Rb(){var t=window.event;return t&&t.type==="popstate"?t===cr?!1:(cr=t,!0):(cr=null,!1)}var Kg=typeof setTimeout=="function"?setTimeout:void 0,Ub=typeof clearTimeout=="function"?clearTimeout:void 0,im=typeof Promise=="function"?Promise:void 0,Db=typeof queueMicrotask=="function"?queueMicrotask:typeof im<"u"?function(t){return im.resolve(null).then(t).catch(Lb)}:Kg;function Lb(t){setTimeout(function(){throw t})}function Oa(t){return t==="head"}function om(t,e){var a=e,l=0;do{var n=a.nextSibling;if(t.removeChild(a),n&&n.nodeType===8)if(a=n.data,a==="/$"||a==="/&"){if(l===0){t.removeChild(n),Pl(e);return}l--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")l++;else if(a==="html")Xn(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,Xn(a);for(var i=a.firstChild;i;){var o=i.nextSibling,u=i.nodeName;i[fi]||u==="SCRIPT"||u==="STYLE"||u==="LINK"&&i.rel.toLowerCase()==="stylesheet"||a.removeChild(i),i=o}}else a==="body"&&Xn(t.ownerDocument.body);a=n}while(a);Pl(e)}function um(t,e){var a=t;t=0;do{var l=a.nextSibling;if(a.nodeType===1?e?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(e?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),l&&l.nodeType===8)if(a=l.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=l}while(a)}function Pr(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var a=e;switch(e=e.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Pr(a),ss(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function Bb(t,e,a,l){for(;t.nodeType===1;){var n=a;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!l&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(l){if(!t[fi])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(i=t.getAttribute("rel"),i==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(i!==n.rel||t.getAttribute("href")!==(n.href==null||n.href===""?null:n.href)||t.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin)||t.getAttribute("title")!==(n.title==null?null:n.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(i=t.getAttribute("src"),(i!==(n.src==null?null:n.src)||t.getAttribute("type")!==(n.type==null?null:n.type)||t.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin))&&i&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var i=n.name==null?null:""+n.name;if(n.type==="hidden"&&t.getAttribute("name")===i)return t}else return t;if(t=se(t.nextSibling),t===null)break}return null}function qb(t,e,a){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=se(t.nextSibling),t===null))return null;return t}function Jg(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=se(t.nextSibling),t===null))return null;return t}function ts(t){return t.data==="$?"||t.data==="$~"}function es(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function Hb(t,e){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||a.readyState!=="loading")e();else{var l=function(){e(),a.removeEventListener("DOMContentLoaded",l)};a.addEventListener("DOMContentLoaded",l),t._reactRetry=l}}function se(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var as=null;function cm(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(e===0)return se(t.nextSibling);e--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||e++}t=t.nextSibling}return null}function rm(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(e===0)return t;e--}else a!=="/$"&&a!=="/&"||e++}t=t.previousSibling}return null}function Wg(t,e,a){switch(e=nu(a),t){case"html":if(t=e.documentElement,!t)throw Error(w(452));return t;case"head":if(t=e.head,!t)throw Error(w(453));return t;case"body":if(t=e.body,!t)throw Error(w(454));return t;default:throw Error(w(451))}}function Xn(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);ss(t)}var fe=new Map,sm=new Set;function iu(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Pe=j.d;j.d={f:Yb,r:jb,D:Vb,C:kb,L:Gb,m:Qb,X:Zb,S:Xb,M:Kb};function Yb(){var t=Pe.f(),e=xu();return t||e}function jb(t){var e=en(t);e!==null&&e.tag===5&&e.type==="form"?kh(e):Pe.r(t)}var on=typeof document>"u"?null:document;function Fg(t,e,a){var l=on;if(l&&typeof e=="string"&&e){var n=oe(e);n='link[rel="'+t+'"][href="'+n+'"]',typeof a=="string"&&(n+='[crossorigin="'+a+'"]'),sm.has(n)||(sm.add(n),t={rel:t,crossOrigin:a,href:e},l.querySelector(n)===null&&(e=l.createElement("link"),Et(e,"link",t),gt(e),l.head.appendChild(e)))}}function Vb(t){Pe.D(t),Fg("dns-prefetch",t,null)}function kb(t,e){Pe.C(t,e),Fg("preconnect",t,e)}function Gb(t,e,a){Pe.L(t,e,a);var l=on;if(l&&t&&e){var n='link[rel="preload"][as="'+oe(e)+'"]';e==="image"&&a&&a.imageSrcSet?(n+='[imagesrcset="'+oe(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(n+='[imagesizes="'+oe(a.imageSizes)+'"]')):n+='[href="'+oe(t)+'"]';var i=n;switch(e){case"style":i=Il(t);break;case"script":i=un(t)}fe.has(i)||(t=I({rel:"preload",href:e==="image"&&a&&a.imageSrcSet?void 0:t,as:e},a),fe.set(i,t),l.querySelector(n)!==null||e==="style"&&l.querySelector(yi(i))||e==="script"&&l.querySelector(vi(i))||(e=l.createElement("link"),Et(e,"link",t),gt(e),l.head.appendChild(e)))}}function Qb(t,e){Pe.m(t,e);var a=on;if(a&&t){var l=e&&typeof e.as=="string"?e.as:"script",n='link[rel="modulepreload"][as="'+oe(l)+'"][href="'+oe(t)+'"]',i=n;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=un(t)}if(!fe.has(i)&&(t=I({rel:"modulepreload",href:t},e),fe.set(i,t),a.querySelector(n)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(vi(i)))return}l=a.createElement("link"),Et(l,"link",t),gt(l),a.head.appendChild(l)}}}function Xb(t,e,a){Pe.S(t,e,a);var l=on;if(l&&t){var n=Ll(l).hoistableStyles,i=Il(t);e=e||"default";var o=n.get(i);if(!o){var u={loading:0,preload:null};if(o=l.querySelector(yi(i)))u.loading=5;else{t=I({rel:"stylesheet",href:t,"data-precedence":e},a),(a=fe.get(i))&&Js(t,a);var r=o=l.createElement("link");gt(r),Et(r,"link",t),r._p=new Promise(function(p,h){r.onload=p,r.onerror=h}),r.addEventListener("load",function(){u.loading|=1}),r.addEventListener("error",function(){u.loading|=2}),u.loading|=4,Oo(o,e,l)}o={type:"stylesheet",instance:o,count:1,state:u},n.set(i,o)}}}function Zb(t,e){Pe.X(t,e);var a=on;if(a&&t){var l=Ll(a).hoistableScripts,n=un(t),i=l.get(n);i||(i=a.querySelector(vi(n)),i||(t=I({src:t,async:!0},e),(e=fe.get(n))&&Ws(t,e),i=a.createElement("script"),gt(i),Et(i,"link",t),a.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(n,i))}}function Kb(t,e){Pe.M(t,e);var a=on;if(a&&t){var l=Ll(a).hoistableScripts,n=un(t),i=l.get(n);i||(i=a.querySelector(vi(n)),i||(t=I({src:t,async:!0,type:"module"},e),(e=fe.get(n))&&Ws(t,e),i=a.createElement("script"),gt(i),Et(i,"link",t),a.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(n,i))}}function fm(t,e,a,l){var n=(n=ya.current)?iu(n):null;if(!n)throw Error(w(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(e=Il(a.href),a=Ll(n).hoistableStyles,l=a.get(e),l||(l={type:"style",instance:null,count:0,state:null},a.set(e,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=Il(a.href);var i=Ll(n).hoistableStyles,o=i.get(t);if(o||(n=n.ownerDocument||n,o={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(t,o),(i=n.querySelector(yi(t)))&&!i._p&&(o.instance=i,o.state.loading=5),fe.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},fe.set(t,a),i||Jb(n,t,a,o.state))),e&&l===null)throw Error(w(528,""));return o}if(e&&l!==null)throw Error(w(529,""));return null;case"script":return e=a.async,a=a.src,typeof a=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=un(a),a=Ll(n).hoistableScripts,l=a.get(e),l||(l={type:"script",instance:null,count:0,state:null},a.set(e,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(w(444,t))}}function Il(t){return'href="'+oe(t)+'"'}function yi(t){return'link[rel="stylesheet"]['+t+"]"}function Ig(t){return I({},t,{"data-precedence":t.precedence,precedence:null})}function Jb(t,e,a,l){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?l.loading=1:(e=t.createElement("link"),l.preload=e,e.addEventListener("load",function(){return l.loading|=1}),e.addEventListener("error",function(){return l.loading|=2}),Et(e,"link",a),gt(e),t.head.appendChild(e))}function un(t){return'[src="'+oe(t)+'"]'}function vi(t){return"script[async]"+t}function dm(t,e,a){if(e.count++,e.instance===null)switch(e.type){case"style":var l=t.querySelector('style[data-href~="'+oe(a.href)+'"]');if(l)return e.instance=l,gt(l),l;var n=I({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return l=(t.ownerDocument||t).createElement("style"),gt(l),Et(l,"style",n),Oo(l,a.precedence,t),e.instance=l;case"stylesheet":n=Il(a.href);var i=t.querySelector(yi(n));if(i)return e.state.loading|=4,e.instance=i,gt(i),i;l=Ig(a),(n=fe.get(n))&&Js(l,n),i=(t.ownerDocument||t).createElement("link"),gt(i);var o=i;return o._p=new Promise(function(u,r){o.onload=u,o.onerror=r}),Et(i,"link",l),e.state.loading|=4,Oo(i,a.precedence,t),e.instance=i;case"script":return i=un(a.src),(n=t.querySelector(vi(i)))?(e.instance=n,gt(n),n):(l=a,(n=fe.get(i))&&(l=I({},a),Ws(l,n)),t=t.ownerDocument||t,n=t.createElement("script"),gt(n),Et(n,"link",l),t.head.appendChild(n),e.instance=n);case"void":return null;default:throw Error(w(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(l=e.instance,e.state.loading|=4,Oo(l,a.precedence,t));return e.instance}function Oo(t,e,a){for(var l=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),n=l.length?l[l.length-1]:null,i=n,o=0;o<l.length;o++){var u=l[o];if(u.dataset.precedence===e)i=u;else if(i!==n)break}i?i.parentNode.insertBefore(t,i.nextSibling):(e=a.nodeType===9?a.head:a,e.insertBefore(t,e.firstChild))}function Js(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function Ws(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var $o=null;function pm(t,e,a){if($o===null){var l=new Map,n=$o=new Map;n.set(a,l)}else n=$o,l=n.get(a),l||(l=new Map,n.set(a,l));if(l.has(t))return l;for(l.set(t,null),a=a.getElementsByTagName(t),n=0;n<a.length;n++){var i=a[n];if(!(i[fi]||i[St]||t==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var o=i.getAttribute(e)||"";o=t+o;var u=l.get(o);u?u.push(i):l.set(o,[i])}}return l}function mm(t,e,a){t=t.ownerDocument||t,t.head.insertBefore(a,e==="title"?t.querySelector("head > title"):null)}function Wb(t,e,a){if(a===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function Pg(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function Fb(t,e,a,l){if(a.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var n=Il(l.href),i=e.querySelector(yi(n));if(i){e=i._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=ou.bind(t),e.then(t,t)),a.state.loading|=4,a.instance=i,gt(i);return}i=e.ownerDocument||e,l=Ig(l),(n=fe.get(n))&&Js(l,n),i=i.createElement("link"),gt(i);var o=i;o._p=new Promise(function(u,r){o.onload=u,o.onerror=r}),Et(i,"link",l),a.instance=i}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,e),(e=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=ou.bind(t),e.addEventListener("load",a),e.addEventListener("error",a))}}var rr=0;function Ib(t,e){return t.stylesheets&&t.count===0&&Ro(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var l=setTimeout(function(){if(t.stylesheets&&Ro(t,t.stylesheets),t.unsuspend){var i=t.unsuspend;t.unsuspend=null,i()}},6e4+e);0<t.imgBytes&&rr===0&&(rr=62500*$b());var n=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Ro(t,t.stylesheets),t.unsuspend)){var i=t.unsuspend;t.unsuspend=null,i()}},(t.imgBytes>rr?50:800)+e);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(l),clearTimeout(n)}}:null}function ou(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Ro(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var uu=null;function Ro(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,uu=new Map,e.forEach(Pb,t),uu=null,ou.call(t))}function Pb(t,e){if(!(e.state.loading&4)){var a=uu.get(t);if(a)var l=a.get(null);else{a=new Map,uu.set(t,a);for(var n=t.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<n.length;i++){var o=n[i];(o.nodeName==="LINK"||o.getAttribute("media")!=="not all")&&(a.set(o.dataset.precedence,o),l=o)}l&&a.set(null,l)}n=e.instance,o=n.getAttribute("data-precedence"),i=a.get(o)||l,i===l&&a.set(null,n),a.set(o,n),this.count++,l=ou.bind(this),n.addEventListener("load",l),n.addEventListener("error",l),i?i.parentNode.insertBefore(n,i.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(n,t.firstChild)),e.state.loading|=4}}var ni={$$typeof:Ve,Provider:null,Consumer:null,_currentValue:Xa,_currentValue2:Xa,_threadCount:0};function tS(t,e,a,l,n,i,o,u,r){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Dc(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Dc(0),this.hiddenUpdates=Dc(null),this.identifierPrefix=l,this.onUncaughtError=n,this.onCaughtError=i,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=r,this.incompleteTransitions=new Map}function ty(t,e,a,l,n,i,o,u,r,p,h,v){return t=new tS(t,e,a,o,r,p,h,v,u),e=1,i===!0&&(e|=24),i=Qt(3,null,null,e),t.current=i,i.stateNode=t,e=xs(),e.refCount++,t.pooledCache=e,e.refCount++,i.memoizedState={element:l,isDehydrated:a,cache:e},As(i),t}function ey(t){return t?(t=$l,t):$l}function ay(t,e,a,l,n,i){n=ey(n),l.context===null?l.context=n:l.pendingContext=n,l=ba(e),l.payload={element:a},i=i===void 0?null:i,i!==null&&(l.callback=i),a=Sa(t,l,e),a!==null&&(Ht(a,t,e),qn(a,t,e))}function hm(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<e?a:e}}function Fs(t,e){hm(t,e),(t=t.alternate)&&hm(t,e)}function ly(t){if(t.tag===13||t.tag===31){var e=il(t,67108864);e!==null&&Ht(e,t,67108864),Fs(t,67108864)}}function gm(t){if(t.tag===13||t.tag===31){var e=Wt();e=cs(e);var a=il(t,e);a!==null&&Ht(a,t,e),Fs(t,e)}}var cu=!0;function eS(t,e,a,l){var n=z.T;z.T=null;var i=j.p;try{j.p=2,Is(t,e,a,l)}finally{j.p=i,z.T=n}}function aS(t,e,a,l){var n=z.T;z.T=null;var i=j.p;try{j.p=8,Is(t,e,a,l)}finally{j.p=i,z.T=n}}function Is(t,e,a,l){if(cu){var n=ls(l);if(n===null)ur(t,e,l,ru,a),ym(t,l);else if(nS(n,t,e,a,l))l.stopPropagation();else if(ym(t,l),e&4&&-1<lS.indexOf(t)){for(;n!==null;){var i=en(n);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var o=ka(i.pendingLanes);if(o!==0){var u=i;for(u.pendingLanes|=2,u.entangledLanes|=2;o;){var r=1<<31-Jt(o);u.entanglements[1]|=r,o&=~r}Ne(i),(Y&6)===0&&(Io=Zt()+500,gi(0,!1))}}break;case 31:case 13:u=il(i,2),u!==null&&Ht(u,i,2),xu(),Fs(i,2)}if(i=ls(l),i===null&&ur(t,e,l,ru,a),i===n)break;n=i}n!==null&&l.stopPropagation()}else ur(t,e,l,null,a)}}function ls(t){return t=ds(t),Ps(t)}var ru=null;function Ps(t){if(ru=null,t=_l(t),t!==null){var e=ui(t);if(e===null)t=null;else{var a=e.tag;if(a===13){if(t=Em(e),t!==null)return t;t=null}else if(a===31){if(t=Tm(e),t!==null)return t;t=null}else if(a===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return ru=t,null}function ny(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Gv()){case zm:return 2;case Nm:return 8;case qo:case Qv:return 32;case Cm:return 268435456;default:return 32}default:return 32}}var ns=!1,Ea=null,Ta=null,Aa=null,ii=new Map,oi=new Map,fa=[],lS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function ym(t,e){switch(t){case"focusin":case"focusout":Ea=null;break;case"dragenter":case"dragleave":Ta=null;break;case"mouseover":case"mouseout":Aa=null;break;case"pointerover":case"pointerout":ii.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":oi.delete(e.pointerId)}}function Mn(t,e,a,l,n,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:a,eventSystemFlags:l,nativeEvent:i,targetContainers:[n]},e!==null&&(e=en(e),e!==null&&ly(e)),t):(t.eventSystemFlags|=l,e=t.targetContainers,n!==null&&e.indexOf(n)===-1&&e.push(n),t)}function nS(t,e,a,l,n){switch(e){case"focusin":return Ea=Mn(Ea,t,e,a,l,n),!0;case"dragenter":return Ta=Mn(Ta,t,e,a,l,n),!0;case"mouseover":return Aa=Mn(Aa,t,e,a,l,n),!0;case"pointerover":var i=n.pointerId;return ii.set(i,Mn(ii.get(i)||null,t,e,a,l,n)),!0;case"gotpointercapture":return i=n.pointerId,oi.set(i,Mn(oi.get(i)||null,t,e,a,l,n)),!0}return!1}function iy(t){var e=_l(t.target);if(e!==null){var a=ui(e);if(a!==null){if(e=a.tag,e===13){if(e=Em(a),e!==null){t.blockedOn=e,tp(t.priority,function(){gm(a)});return}}else if(e===31){if(e=Tm(a),e!==null){t.blockedOn=e,tp(t.priority,function(){gm(a)});return}}else if(e===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Uo(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var a=ls(t.nativeEvent);if(a===null){a=t.nativeEvent;var l=new a.constructor(a.type,a);xr=l,a.target.dispatchEvent(l),xr=null}else return e=en(a),e!==null&&ly(e),t.blockedOn=a,!1;e.shift()}return!0}function vm(t,e,a){Uo(t)&&a.delete(e)}function iS(){ns=!1,Ea!==null&&Uo(Ea)&&(Ea=null),Ta!==null&&Uo(Ta)&&(Ta=null),Aa!==null&&Uo(Aa)&&(Aa=null),ii.forEach(vm),oi.forEach(vm)}function vo(t,e){t.blockedOn===e&&(t.blockedOn=null,ns||(ns=!0,pt.unstable_scheduleCallback(pt.unstable_NormalPriority,iS)))}var bo=null;function bm(t){bo!==t&&(bo=t,pt.unstable_scheduleCallback(pt.unstable_NormalPriority,function(){bo===t&&(bo=null);for(var e=0;e<t.length;e+=3){var a=t[e],l=t[e+1],n=t[e+2];if(typeof l!="function"){if(Ps(l||a)===null)continue;break}var i=en(a);i!==null&&(t.splice(e,3),e-=3,qr(i,{pending:!0,data:n,method:a.method,action:l},l,n))}}))}function Pl(t){function e(r){return vo(r,t)}Ea!==null&&vo(Ea,t),Ta!==null&&vo(Ta,t),Aa!==null&&vo(Aa,t),ii.forEach(e),oi.forEach(e);for(var a=0;a<fa.length;a++){var l=fa[a];l.blockedOn===t&&(l.blockedOn=null)}for(;0<fa.length&&(a=fa[0],a.blockedOn===null);)iy(a),a.blockedOn===null&&fa.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(l=0;l<a.length;l+=3){var n=a[l],i=a[l+1],o=n[Yt]||null;if(typeof i=="function")o||bm(a);else if(o){var u=null;if(i&&i.hasAttribute("formAction")){if(n=i,o=i[Yt]||null)u=o.formAction;else if(Ps(n)!==null)continue}else u=o.action;typeof u=="function"?a[l+1]=u:(a.splice(l,3),l-=3),bm(a)}}}function oy(){function t(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(o){return n=o})},focusReset:"manual",scroll:"manual"})}function e(){n!==null&&(n(),n=null),l||setTimeout(a,20)}function a(){if(!l&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,n=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(a,100),function(){l=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),n!==null&&(n(),n=null)}}}function tf(t){this._internalRoot=t}Au.prototype.render=tf.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(w(409));var a=e.current,l=Wt();ay(a,l,t,e,null,null)};Au.prototype.unmount=tf.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;ay(t.current,2,null,t,null,null),xu(),e[tn]=null}};function Au(t){this._internalRoot=t}Au.prototype.unstable_scheduleHydration=function(t){if(t){var e=Dm();t={blockedOn:null,target:t,priority:e};for(var a=0;a<fa.length&&e!==0&&e<fa[a].priority;a++);fa.splice(a,0,t),a===0&&iy(t)}};var Sm=wm.version;if(Sm!=="19.2.5")throw Error(w(527,Sm,"19.2.5"));j.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(w(188)):(t=Object.keys(t).join(","),Error(w(268,t)));return t=Bv(e),t=t!==null?Am(t):null,t=t===null?null:t.stateNode,t};var oS={bundleType:0,version:"19.2.5",rendererPackageName:"react-dom",currentDispatcherRef:z,reconcilerVersion:"19.2.5"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(zn=__REACT_DEVTOOLS_GLOBAL_HOOK__,!zn.isDisabled&&zn.supportsFiber))try{ci=zn.inject(oS),Kt=zn}catch{}var zn;_u.createRoot=function(t,e){if(!xm(t))throw Error(w(299));var a=!1,l="",n=Fh,i=Ih,o=Ph;return e!=null&&(e.unstable_strictMode===!0&&(a=!0),e.identifierPrefix!==void 0&&(l=e.identifierPrefix),e.onUncaughtError!==void 0&&(n=e.onUncaughtError),e.onCaughtError!==void 0&&(i=e.onCaughtError),e.onRecoverableError!==void 0&&(o=e.onRecoverableError)),e=ty(t,1,!1,null,null,a,l,null,n,i,o,oy),t[tn]=e.current,Ks(t),new tf(e)};_u.hydrateRoot=function(t,e,a){if(!xm(t))throw Error(w(299));var l=!1,n="",i=Fh,o=Ih,u=Ph,r=null;return a!=null&&(a.unstable_strictMode===!0&&(l=!0),a.identifierPrefix!==void 0&&(n=a.identifierPrefix),a.onUncaughtError!==void 0&&(i=a.onUncaughtError),a.onCaughtError!==void 0&&(o=a.onCaughtError),a.onRecoverableError!==void 0&&(u=a.onRecoverableError),a.formState!==void 0&&(r=a.formState)),e=ty(t,1,!0,e,a??null,l,n,r,i,o,u,oy),e.context=ey(null),a=e.current,l=Wt(),l=cs(l),n=ba(l),n.callback=null,Sa(a,n,l),a=l,e.current.lanes=a,si(e,a),Ne(e),t[tn]=e.current,Ks(t),new Au(e)};_u.version="19.2.5"});var sy=Se((nw,ry)=>{"use strict";function cy(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(cy)}catch(t){console.error(t)}}cy(),ry.exports=uy()});var Ky=Se(Ru=>{"use strict";var DS=Symbol.for("react.transitional.element"),LS=Symbol.for("react.fragment");function Zy(t,e,a){var l=null;if(a!==void 0&&(l=""+a),e.key!==void 0&&(l=""+e.key),"key"in e){a={};for(var n in e)n!=="key"&&(a[n]=e[n])}else a=e;return e=a.ref,{$$typeof:DS,type:t,key:l,ref:e!==void 0?e:null,props:a}}Ru.Fragment=LS;Ru.jsx=Zy;Ru.jsxs=Zy});var ut=Se((Xw,Jy)=>{"use strict";Jy.exports=Ky()});var c="lookmovie2-enhancer",Iu=`${c}:settings`,Pu=`${c}:watchlist`,tc=`${c}:movie-watchlist`,ec=`${c}:playlist`,Vi=`${c}:playlist-session`,ki=`${c}:shows-list-progress`,ac=`${c}:resume-points`,lc=`${c}:intro-times`,nc=`${c}:backup-snapshots`,kf=14,ic=`${c}-style`,oc=`${c}-site-theme`,uc=`${c}-ad-bypass-style`,pl=`${c}-fullscreen-style`,we=`${c}-fullscreen-exit`,S=`${c}-root`,Gi=`${c}:ntfy-active-tab`,Gf=15e3,Qf=500,Xf=/^[A-Za-z0-9_-]{1,64}$/,Zf=3600*1e3,Kf=1e3,Qi=95,Jf=2,cc=2e3,Wf=30*1e3,Ff=25,If=10,Pf=8,rc=24,td=300,qa=Object.freeze([.5,.75,1,1.25,1.5,1.75,2]),Mt=Object.freeze({autoPlay:!0,autoFullscreen:!0,windowedFullscreen:!0,autoNextEpisode:!0,autoSkipIntro:!0,autoSkipCredits:!0,playbackRate:1,siteTheme:!0,ntfyRemoteEnabled:!1,ntfyServer:"https://ntfy.sh",ntfyTopic:"",ntfyControlTopic:"",ntfyCommandSecret:""});function et(t){let e=Number.parseInt(String(t),10);return Number.isFinite(e)&&e>0?e:0}async function Xi(t){let e=await fetch(t,{credentials:"same-origin"});if(!e.ok)throw new Error(`Request failed (${e.status})`);return e.text()}async function Zi(t){let e=await fetch(t,{credentials:"same-origin"});if(!e.ok)throw new Error(`Request failed (${e.status})`);return e.json()}function xe(t){return t?t.replaceAll("\\'","'").replaceAll("\\\\","\\"):""}function at(t){let e=typeof t=="string"?t.trim():"";if(!e||e.startsWith("data:image/"))return"";let a=typeof window<"u"&&window.location?window.location.href:"https://www.lookmovie2.to/";try{return new URL(e,a).href}catch{return e.startsWith("//")?`https:${e}`:e}}function la(t){if(!t)return"";let a=(t.getAttribute("style")||"").match(/background-image:\s*url\((['"]?)(.*?)\1\)/i),l=[t.getAttribute("content"),t.getAttribute("data-lazy-background"),t.getAttribute("data-src-portrait"),t.getAttribute("data-background-image"),t.getAttribute("data-src"),a?.[2],t.getAttribute("src")];return at(l.find(n=>typeof n=="string"&&n.trim()&&!n.trim().startsWith("data:image/"))||"")}function ed(t){if(!t||typeof t.getBoundingClientRect!="function")return!1;let e=t.getBoundingClientRect();return e.width>0&&e.height>0}function ad(t){return`${t.textContent||""} ${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.trim()}function zt(t){if(!t||typeof t!="object")return null;let e=et(t.season),a=et(t.episode),l=et(t.idEpisode||t.id_episode);return!e||!a||!l?null:{season:e,episode:a,idEpisode:l,watchedAt:typeof t.watchedAt=="number"?t.watchedAt:void 0,updatedAt:typeof t.updatedAt=="number"?t.updatedAt:void 0}}function Ut(t){return t?`S${String(t.season).padStart(2,"0")}E${String(t.episode).padStart(2,"0")}`:"Unknown episode"}function Oe(t,e){return!t&&!e?0:t?e?t.season!==e.season?t.season-e.season:t.episode!==e.episode?t.episode-e.episode:t.idEpisode-e.idEpisode:1:-1}function sc(t,e){return!t||!e?!1:t.idEpisode===e.idEpisode&&t.season===e.season&&t.episode===e.episode}function $e(t){return!!t&&sc(t.latestEpisode,t.lastWatched)}function ml(){return typeof GM_getValue=="function"&&typeof GM_setValue=="function"}function Ha(t){if(ml()){let a=GM_getValue(t,null);if(typeof a=="string")return a}let e=localStorage.getItem(t);return e!==null&&ml()&&GM_setValue(t,e),e}function Re(t,e){ml()&&GM_setValue(t,e);try{e===null?localStorage.removeItem(t):localStorage.setItem(t,e)}catch(a){if(!ml())throw a}}function fc(t){return{autoPlay:typeof t.autoPlay=="boolean"?t.autoPlay:Mt.autoPlay,autoFullscreen:typeof t.autoFullscreen=="boolean"?t.autoFullscreen:Mt.autoFullscreen,windowedFullscreen:typeof t.windowedFullscreen=="boolean"?t.windowedFullscreen:Mt.windowedFullscreen,autoNextEpisode:typeof t.autoNextEpisode=="boolean"?t.autoNextEpisode:Mt.autoNextEpisode,autoSkipIntro:typeof t.autoSkipIntro=="boolean"?t.autoSkipIntro:Mt.autoSkipIntro,autoSkipCredits:typeof t.autoSkipCredits=="boolean"?t.autoSkipCredits:Mt.autoSkipCredits,playbackRate:qa.includes(Number(t.playbackRate))?Number(t.playbackRate):Mt.playbackRate,siteTheme:typeof t.siteTheme=="boolean"?t.siteTheme:Mt.siteTheme,ntfyRemoteEnabled:typeof t.ntfyRemoteEnabled=="boolean"?t.ntfyRemoteEnabled:Mt.ntfyRemoteEnabled,ntfyServer:typeof t.ntfyServer=="string"&&t.ntfyServer.trim()?t.ntfyServer.trim().replace(/\/+$/,""):Mt.ntfyServer,ntfyTopic:typeof t.ntfyTopic=="string"&&t.ntfyTopic.trim()?t.ntfyTopic.trim():Mt.ntfyTopic,ntfyControlTopic:typeof t.ntfyControlTopic=="string"&&t.ntfyControlTopic.trim()?t.ntfyControlTopic.trim():Mt.ntfyControlTopic,ntfyCommandSecret:typeof t.ntfyCommandSecret=="string"&&t.ntfyCommandSecret.trim()?t.ntfyCommandSecret.trim():Mt.ntfyCommandSecret}}function nd(){try{let t=Ha(Iu),e=JSON.parse(t||"{}");return fc(e)}catch(t){return console.warn(`[${c}] Failed to load saved settings.`,t),{...Mt}}}function hn(t,e){if(!e||typeof e!="object")return null;let a=typeof t=="string"&&t.trim()?t.trim():"";return a?{slug:a,idShow:et(e.idShow||e.id_show),title:typeof e.title=="string"&&e.title.trim()?e.title.trim():a,year:typeof e.year=="string"||typeof e.year=="number"?String(e.year).trim():"",poster:typeof e.poster=="string"?e.poster:"",addedAt:typeof e.addedAt=="number"?e.addedAt:Date.now(),lastSyncedAt:typeof e.lastSyncedAt=="number"?e.lastSyncedAt:0,lastSyncError:typeof e.lastSyncError=="string"?e.lastSyncError:"",latestEpisode:zt(e.latestEpisode),lastWatched:zt(e.lastWatched),upcoming:pv(e.upcoming)}:null}function pv(t){if(!t||typeof t!="object"||!Array.isArray(t.episodes))return null;let e=t.episodes.map(zt).filter(Boolean),a=et(t.total);return{afterIdEpisode:et(t.afterIdEpisode),total:Math.max(a,e.length),episodes:e}}function id(){try{let t=JSON.parse(Ha(Pu)||"{}"),e=t&&typeof t=="object"&&t.shows&&typeof t.shows=="object"?t.shows:{},a={};return Object.entries(e).forEach(([l,n])=>{let i=hn(l,n);i&&(a[l]=i)}),{shows:a}}catch(t){return console.warn(`[${c}] Failed to load watchlist.`,t),{shows:{}}}}function gn(t,e){if(!e||typeof e!="object")return null;let a=typeof t=="string"&&t.trim()?t.trim():"";return a?{slug:a,title:typeof e.title=="string"&&e.title.trim()?e.title.trim():a,year:typeof e.year=="string"||typeof e.year=="number"?String(e.year).trim():"",poster:typeof e.poster=="string"?e.poster:"",idMovie:et(e.idMovie||e.id_movie),href:typeof e.href=="string"?e.href:`/movies/view/${a}`,addedAt:typeof e.addedAt=="number"?e.addedAt:Date.now(),watched:!!e.watched,watchedAt:typeof e.watchedAt=="number"?e.watchedAt:void 0}:null}function od(){try{let t=JSON.parse(Ha(tc)||"{}"),e=t&&typeof t=="object"&&t.movies&&typeof t.movies=="object"?t.movies:{},a={};return Object.entries(e).forEach(([l,n])=>{let i=gn(l,n);i&&(a[l]=i)}),{movies:a}}catch(t){return console.warn(`[${c}] Failed to load movie watchlist.`,t),{movies:{}}}}function yn(t,e){if(!e||typeof e!="object")return null;let a=typeof e.slug=="string"&&e.slug.trim()?e.slug.trim():typeof t=="string"&&t.trim()?t.split(":")[0].trim():"",l=zt(e.episode||e.latestEpisode);return!a||!l?null:{key:typeof t=="string"&&t.trim()?t.trim():`${a}:${l.season}:${l.episode}:${l.idEpisode}`,slug:a,idShow:et(e.idShow||e.id_show),title:typeof e.title=="string"&&e.title.trim()?e.title.trim():a,year:typeof e.year=="string"||typeof e.year=="number"?String(e.year).trim():"",poster:typeof e.poster=="string"?e.poster:"",episode:l,addedAt:typeof e.addedAt=="number"?e.addedAt:Date.now()}}function ud(){try{let t=JSON.parse(Ha(ec)||"{}"),e=t&&typeof t=="object"&&t.entries&&typeof t.entries=="object"?t.entries:{},a={};return Object.entries(e).forEach(([l,n])=>{let i=yn(l,n);i&&(a[i.key]=i)}),{entries:a}}catch(t){return console.warn(`[${c}] Failed to load playlist.`,t),{entries:{}}}}function cd(t){return!t||typeof t!="object"?{active:!1,currentKey:"",startedAt:0}:{active:!!t.active,currentKey:typeof t.currentKey=="string"?t.currentKey:"",startedAt:typeof t.startedAt=="number"?t.startedAt:0}}function rd(){try{return cd(JSON.parse(Ha(Vi)||"{}"))}catch(t){return console.warn(`[${c}] Failed to load playlist session.`,t),{active:!1,currentKey:"",startedAt:0}}}function Ki(t){if(!t||typeof t!="object")return null;let e=typeof t.slug=="string"&&t.slug.trim()?t.slug.trim():"",a=zt(t.episode);return!e||!a?null:{slug:e,title:typeof t.title=="string"?t.title:e,href:typeof t.href=="string"?t.href:"",episode:a,seenAt:typeof t.seenAt=="number"?t.seenAt:Date.now(),source:t.source==="manual"?"manual":"auto"}}function sd(){try{return Ki(JSON.parse(Ha(ki)||"null"))}catch(t){return console.warn(`[${c}] Failed to load shows list progress.`,t),null}}function fd(t){try{Re(Iu,JSON.stringify(t))}catch(e){console.warn(`[${c}] Failed to save settings.`,e)}}function dd(t){try{Re(Pu,JSON.stringify(t)),hd({watchlist:t})}catch(e){console.warn(`[${c}] Failed to save watchlist.`,e)}}function pd(t){try{Re(tc,JSON.stringify(t)),hd({movieWatchlist:t})}catch(e){console.warn(`[${c}] Failed to save movie watchlist.`,e)}}function dc(t){try{Re(ec,JSON.stringify(t))}catch(e){console.warn(`[${c}] Failed to save playlist.`,e)}}function md(t){try{let e=cd(t);if(!e.active){Re(Vi,null);return}Re(Vi,JSON.stringify(e))}catch(e){console.warn(`[${c}] Failed to save playlist session.`,e)}}function pc(t){try{let e=Ki(t);if(!e){Re(ki,null);return}Re(ki,JSON.stringify(e))}catch(e){console.warn(`[${c}] Failed to save shows list progress.`,e)}}function ld(t,e){return t&&t[e]&&typeof t[e]=="object"?Object.keys(t[e]).length:0}function mv(t=new Date){let e=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${a}`}function Ji(){if(!ml())return[];try{let t=JSON.parse(GM_getValue(nc,null)||"[]");return Array.isArray(t)?t.filter(e=>e&&typeof e.date=="string"):[]}catch(t){return console.warn(`[${c}] Failed to load backup snapshots.`,t),[]}}function hd(t){if(ml())try{if(t.watchlist&&!ld(t.watchlist,"shows")||t.movieWatchlist&&!ld(t.movieWatchlist,"movies"))return;let e=mv(),a=Ji(),l=a.find(o=>o.date===e)||a[0]||{},i=[{watchlist:l.watchlist||{shows:{}},movieWatchlist:l.movieWatchlist||{movies:{}},...t,date:e,savedAt:Date.now()},...a.filter(o=>o.date!==e)].sort((o,u)=>u.date.localeCompare(o.date)).slice(0,kf);GM_setValue(nc,JSON.stringify(i))}catch(e){console.warn(`[${c}] Failed to save backup snapshot.`,e)}}function gd(t,e){try{let a=JSON.parse(Ha(t)||"null");return a&&typeof a=="object"?a:e}catch(a){return console.warn(`[${c}] Failed to load ${t}.`,a),e}}function yd(t,e){try{Re(t,JSON.stringify(e))}catch(a){console.warn(`[${c}] Failed to save ${t}.`,a)}}function mc(t){if(!t||typeof t!="object")return null;let e=Number(t.progress??t.currentTime),a=Number(t.duration);return!Number.isFinite(e)||!Number.isFinite(a)||e<0||a<=0?null:{progress:e,duration:a,savedAt:typeof t.savedAt=="number"?t.savedAt:Date.now()}}function vd(){let t={};return Object.entries(gd(ac,{})).forEach(([e,a])=>{let l=mc(a);l&&(t[e]=l)}),t}function bd(t){yd(ac,t)}function hv(t){if(!t||typeof t!="object")return null;let e=Number(t.start),a=Number(t.end),l=Number.isFinite(e)&&Number.isFinite(a)&&e>=0&&a>e,n=Number(t.creditsFromEnd),i=Number.isFinite(n)&&n>0;return!l&&!i?null:{...l?{start:e,end:a}:{},...i?{creditsFromEnd:n}:{},updatedAt:typeof t.updatedAt=="number"?t.updatedAt:Date.now()}}function Sd(){let t={};return Object.entries(gd(lc,{})).forEach(([e,a])=>{let l=hv(a);l&&(t[e]=l)}),t}function wd(t){yd(lc,t)}var d={settings:nd(),watchlistStore:id(),movieWatchlistStore:od(),playlistStore:ud(),playlistSession:rd(),showsListProgress:sd(),showsListProgressOrder:-1,showsListSeenCandidate:null,showsListSeenCandidateOrder:-1,showsListSessionTouched:!1,showsListManualMarkerSet:!1,showsListObserver:null,showsListMutationObserver:null,showsListRefreshScheduled:!1,showsListObservedCards:new WeakSet,domBootstrapped:!1,uiBootAttempts:0,fullscreenTriggered:!1,lastKnownUrl:location.href,watchlistRefreshPromise:null,watchlistBusy:!1,watchlistMessage:"",watchlistMessageTone:"muted",lastTrackedEpisodeSignature:"",ntfyRemoteStatus:"disabled",ntfyRemoteMessage:"",ntfyLastNotificationAt:0,ntfyRemoteTabId:`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`,ntfyRemoteClaimTimer:0};var E0=Z(sy());var ef=new Set;function fy(t){return ef.add(t),()=>ef.delete(t)}function cn(){ef.forEach(t=>t())}function dy(){return`
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
        .${c}-intro button {
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

        /* Sections added to the site's own player settings menu (the control bar gear). The
           site fixes that menu at 232px and its .video-js button rules override display and
           borders, hence the !important overrides below. */
        #video_player .vjs-settings-quality-menu {
            height: auto !important;
            max-height: min(60vh, 520px) !important;
            overflow-y: auto !important;
            scrollbar-width: thin;
        }

        #video_player .${c}-player-menu-toggle {
            display: flex !important;
            width: 100% !important;
        }

        #video_player .${c}-player-menu-toggle[role="menuitemcheckbox"]::after {
            display: block !important;
        }

        #video_player .${c}-player-menu-button,
        #video_player .${c}-player-menu-chips button {
            border: 1px solid rgba(255, 255, 255, 0.24) !important;
        }

        #video_player .${c}-player-menu-chips button[data-active="true"] {
            border-color: transparent !important;
        }

        #video_player .${c}-player-menu-heading {
            text-align: left !important;
        }

        .${c}-player-menu {
            padding: 4px 0 8px;
            text-align: left;
        }

        .${c}-player-menu-section {
            padding: 8px 0 4px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .${c}-player-menu-heading {
            margin: 4px 16px 6px;
            color: rgba(255, 255, 255, 0.55);
            font: 700 10px/1.2 Arial, sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.06em;
        }

        .${c}-player-menu-toggle {
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

        .${c}-player-menu-toggle:hover,
        .${c}-player-menu-toggle:focus-visible {
            background: rgba(255, 255, 255, 0.1);
            outline: none;
        }

        /* A small switch on the right, mirroring the on/off state. */
        .${c}-player-menu-toggle[role="menuitemcheckbox"]::after {
            content: '';
            flex: 0 0 auto;
            width: 28px;
            height: 16px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.25)
                radial-gradient(circle at 8px 50%, #fff 5px, transparent 5.5px);
            transition: background 0.15s ease;
        }

        .${c}-player-menu-toggle[aria-checked="true"]::after {
            background: #2563eb radial-gradient(circle at 20px 50%, #fff 5px, transparent 5.5px);
        }

        .${c}-player-menu-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            padding: 2px 16px 4px;
        }

        .${c}-player-menu-chips button {
            min-width: 44px;
            padding: 5px 8px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 999px;
            background: transparent;
            color: #fff;
            font: 700 11px/1 Arial, sans-serif;
            cursor: pointer;
        }

        .${c}-player-menu-chips button:hover {
            border-color: rgba(255, 255, 255, 0.5);
        }

        .${c}-player-menu-chips button[data-active="true"] {
            border-color: transparent;
            background: #fff;
            color: #111;
        }

        .${c}-player-menu-row {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px;
            padding: 5px 16px;
            color: #fff;
            font: 700 12px/1.2 Arial, sans-serif;
        }

        .${c}-player-menu-row > span {
            min-width: 52px;
        }

        .${c}-player-menu-row em {
            color: rgba(255, 255, 255, 0.7);
            font-style: normal;
        }

        .${c}-player-menu-button {
            padding: 5px 10px;
            border: 1px solid rgba(255, 255, 255, 0.24);
            border-radius: 999px;
            background: transparent;
            color: #fff;
            font: 700 11px/1 Arial, sans-serif;
            cursor: pointer;
        }

        .${c}-player-menu-button:hover {
            background: rgba(255, 255, 255, 0.12);
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
    `}var Vt=Z(Ya()),w0=Z(Cc());var $t=null,py="",Si=0,my=0,hy=!1,Mu=new Map;function he(t,e=""){d.ntfyRemoteStatus=t,d.ntfyRemoteMessage=e,cn()}function wi(t){return String(t||"").trim().replace(/^\/+|\/+$/g,"")}function lf(t){return Xf.test(wi(t))}function gy(t,e){let a=wi(t);return a?a.length>64?`${e} topic must be 64 characters or fewer.`:`${e} topic can only use letters, numbers, hyphens, and underscores.`:`${e} topic is required.`}function cf(){return document.visibilityState!=="hidden"}function vy(){try{let t=JSON.parse(localStorage.getItem(Gi)||"null");return t&&typeof t=="object"?t:null}catch{return null}}function by(){try{localStorage.setItem(Gi,JSON.stringify({tabId:d.ntfyRemoteTabId,href:location.href,title:Ty(),updatedAt:Date.now()}))}catch(t){console.warn(`[${c}] Failed to claim ntfy remote tab.`,t)}}function uS(){let t=vy();!t||t.tabId!==d.ntfyRemoteTabId||localStorage.removeItem(Gi)}function Sy(){let t=vy();return!t||!t.tabId||t.tabId===d.ntfyRemoteTabId?!0:Date.now()-Number(t.updatedAt||0)>Gf}function nf(t="activity"){return!d.settings.ntfyRemoteEnabled||!cf()||!ge()?!1:(by(),he("connected",`This tab controls Android remote (${t}).`),!0)}function cS(){d.settings.ntfyRemoteEnabled&&Sy()&&cf()&&ge()&&by()}function of(){uS()}function zu(){let t=wi(d.settings.ntfyControlTopic);if(t)return t;let e=wi(d.settings.ntfyTopic);return e?`${e}-controls`:""}function wy(){let t=xy(),e=zu();return lf(t)?lf(e)?"":gy(e,"Control"):gy(t,"Display")}function rS(){let t=String(d.settings.ntfyServer||"https://ntfy.sh").replace(/\/+$/,""),e=zu();if(!t||!e||!lf(e))return"";let a=new URL(`${t}/${encodeURIComponent(e)}/sse`);return a.searchParams.set("since",String(Math.floor(Date.now()/1e3))),a.toString()}function xy(){return wi(d.settings.ntfyTopic)}function Ey(t){return`${String(d.settings.ntfyServer||"https://ntfy.sh").replace(/\/+$/,"")}/${encodeURIComponent(t)}`}function sS(){return String(d.settings.ntfyServer||"https://ntfy.sh").replace(/\/+$/,"")}function fS(t){let e=String(d.settings.ntfyCommandSecret||"").trim();return e?`${e} ${t}`:t}function bi(t,e){let a=zu();return{action:"http",label:t,url:Ey(a),method:"POST",body:fS(e),clear:!1}}function rf(){return location.pathname.startsWith("/shows/play/")}function dS(){if(sf())return!0;let t=window.movie_storage||window.movie||{};return!rf()&&!!(t.id_movie||t.title||t.slug)}function pS(){let t=[bi("Play/Pause","toggle"),bi("Fullscreen","fullscreen")];return rf()?t.push(bi("Next","next")):dS()?t.push(bi("-30s","seek -30")):t.push(bi("+30s","seek 30")),t}function af(t,e){let a=String(t||"").replace(/\s+/g," ").trim(),l=typeof e=="string"||typeof e=="number"?String(e).trim():"";if(!a)return"";if(/ \(\d{4}\)$/.test(a))return a;let n=a.match(/^(.*?)(\d{4})$/);return n&&n[1].trim()?`${n[1].trim()} (${n[2]})`:l&&!a.endsWith(`(${l})`)?`${a} (${l})`:a}function Ty(){let t=window.show_storage||window.show||{},e=window.movie_storage||window.movie||{},a=typeof t.title=="string"&&t.title.trim()?af(t.title,t.year):typeof e.title=="string"&&e.title.trim()?af(e.title,e.year):"";if(a)return a;let l=document.querySelector("h1")?.textContent||document.querySelector(".movie-title, .film-title, .show-title")?.textContent||document.title||"LookMovie2";return af(l)||"LookMovie2"}function mS(){let t=location.hash.match(/^#S(\d+)-E(\d+)-(\d+)$/i);return t?`S${String(t[1]).padStart(2,"0")}E${String(t[2]).padStart(2,"0")}`:""}function Ay(){let t=window.show_storage||window.show||{},e=Number(window.id_show||t.id_show||t.idShow||0),a=Object.values(d.watchlistStore.shows||{});if(e){let n=a.find(i=>i.idShow===e);if(n)return n}let l=String(t.slug||"").trim();return l&&d.watchlistStore.shows[l]||null}function hS(){let t=window.show_storage||window.show||{},e=Ay(),a=location.pathname.match(/\/shows\/view\/([^/?#]+)/i),n=document.querySelector('a[href*="/shows/view/"]')?.getAttribute("href")?.match(/\/shows\/view\/([^/?#]+)/i);return String(t.slug||"").trim()||String(t.seo_url||"").trim()||String(e?.slug||"").trim()||(a?a[1]:"")||(n?n[1]:"")}function gS(t){return t?Mu.has(t)?Promise.resolve(Mu.get(t)||""):fetch(`/shows/view/${encodeURIComponent(t)}`,{credentials:"same-origin"}).then(e=>{if(!e.ok)throw new Error(`Show poster request failed with HTTP ${e.status}`);return e.text()}).then(e=>{let a=e.match(/poster_medium:\s*'((?:\\'|[^'])*)'/),l=at(a?xe(a[1]):"");return Mu.set(t,l),l}).catch(e=>(console.warn(`[${c}] Could not resolve show poster for ntfy attachment.`,e),Mu.set(t,""),"")):Promise.resolve("")}function yS(){let t=ge(),e=window.movie_storage||window.movie||{},a=window.show_storage||window.show||{},l=Ay(),n=document.querySelector(['meta[property="og:image"]',".movie__poster[data-background-image]",'.movie__poster[style*="background-image"]',".movie-single-ct img[data-src]",".movie-single-ct img[src]",".internal-page-container img[data-src]",".internal-page-container img[src]","[data-background-image]",'[style*="background-image"]',"img[data-src-portrait]","img[data-src]"].join(", "));return at(t?.getAttribute("poster"))||at(e.movie_poster)||at(e.poster_medium)||at(a.poster_medium)||at(a.poster_large)||at(a.poster_original)||at(a.poster)||at(l?.poster)||la(n)}function vS(){let t=yS();return t||!rf()?Promise.resolve(t):gS(hS())}function bS(t,e,a="POST"){let l=JSON.stringify(e),n={"Content-Type":"application/json"};return fetch(t,{method:a,body:l,headers:n}).then(i=>{if(!i.ok)throw new Error(`ntfy request failed with HTTP ${i.status}`);return i}).catch(i=>{if(typeof GM_xmlhttpRequest!="function")throw i;return new Promise((o,u)=>{GM_xmlhttpRequest({method:a,url:t,data:l,headers:n,onload(r){if(r.status>=200&&r.status<300){o(r);return}u(new Error(`ntfy request failed with HTTP ${r.status}`))},onerror:u})})})}function SS(t,e,a,l="POST"){return fetch(t,{method:l,body:e,headers:a}).then(n=>{if(!n.ok)throw new Error(`ntfy request failed with HTTP ${n.status}`);return n})}function wS(t){return t?fetch(t,{credentials:"omit",referrerPolicy:"no-referrer"}).then(e=>{if(!e.ok)throw new Error(`Poster request failed with HTTP ${e.status}`);return e.blob()}).then(e=>!e||!e.size||e.size>15*1024*1024?null:e).catch(e=>(console.warn(`[${c}] Could not fetch poster for ntfy attachment.`,e),null)):Promise.resolve(null)}function xS(t,e,a){let l={Title:t.title,Message:t.message,Priority:String(t.priority),Tags:Array.isArray(t.tags)?t.tags.join(","):"",Click:t.click,Actions:JSON.stringify(t.actions||[]),"X-Sequence-ID":t.sequence_id};return e&&(l.Filename=e),a&&(l["Content-Type"]=a),Object.keys(l).forEach(n=>{l[n]||delete l[n]}),l}function ES(t,e,a){return wS(a).then(l=>l?SS(Ey(t),l,xS(e,"lookmovie-poster.jpg",l.type||"image/jpeg")):bS(sS(),e))}function xi(t="update"){if(!d.settings.ntfyRemoteEnabled||!nf(t))return!1;let e=xy(),a=zu();if(!e||!a||wy())return!1;let l=ge();if(!l)return!1;let n=l.paused,i=Ty(),o=mS(),u={topic:e,title:n?"Paused on LookMovie2":"Playing on LookMovie2",message:o?`${i} - ${o}`:i,tags:["tv"],priority:3,sequence_id:`${c}-player`,click:location.href,actions:pS()};return d.ntfyLastNotificationAt=Date.now(),vS().then(r=>ES(e,u,r)).then(()=>he("connected",`Updated Android player notification (${t}).`)).catch(r=>{console.warn(`[${c}] Failed to publish ntfy player notification.`,r),he("error","Could not publish Android player notification.")}),!0}function TS(t){let e=String(d.settings.ntfyCommandSecret||"").trim();if(e&&t.secret!==e)return null;let a=String(t.command||t.action||"").trim().toLowerCase();if(!a)return null;if(a==="seek"){let l=Number(t.seconds??t.by??t.value);return Number.isFinite(l)?{command:a,seconds:l}:null}if(a==="volume"){let l=Number(t.percent??t.value);return Number.isFinite(l)?{command:a,percent:l}:null}return{command:a}}function AS(t){let e=String(t||"").trim();if(!e)return null;try{let u=JSON.parse(e);if(u&&typeof u=="object")return TS(u)}catch{}let a=String(d.settings.ntfyCommandSecret||"").trim(),l=e;if(a){if(l!==a&&!l.startsWith(`${a} `))return null;l=l.slice(a.length).trim()}let[n="",i=""]=l.split(/\s+/,2),o=n.toLowerCase();if(o==="seek"){let u=Number(i);return Number.isFinite(u)?{command:o,seconds:u}:null}if(o==="volume"){let u=Number(i);return Number.isFinite(u)?{command:o,percent:u}:null}return{command:o}}function _S(t){switch(t.command){case"play":return My();case"pause":return zy();case"toggle":case"playpause":case"play-pause":return Ny();case"seek":return Cy(t.seconds);case"fullscreen":case"fs":return $y();case"next":return ul();case"mute":return uf(!0);case"unmute":return uf(!1);case"volume":return Oy(t.percent);default:return!1}}function MS(t){let e=null;try{e=JSON.parse(t.data||"{}")}catch(n){console.warn(`[${c}] Failed to parse ntfy event.`,n);return}if(!e||e.event!=="message"||!e.message||e.id&&e.id===py)return;if(py=e.id||"",!cf()||!Sy()){let n=Date.now();n-my>5e3&&(my=n,he("connected","Another visible LookMovie tab owns the Android remote."));return}let a=AS(e.message);if(!a){he("connected","Ignored ntfy message.");return}let l=_S(a);l&&window.setTimeout(()=>xi(a.command),150),he("connected",l?`Ran remote command: ${a.command}`:`No player handled: ${a.command}`)}function yy(){window.clearTimeout(Si),Si=0,$t&&($t.close(),$t=null),d.ntfyRemoteClaimTimer&&(window.clearInterval(d.ntfyRemoteClaimTimer),d.ntfyRemoteClaimTimer=0),of(),he("disabled","")}function Nu(){if(window.clearTimeout(Si),Si=0,!d.settings.ntfyRemoteEnabled)return yy(),!1;let t=rS();return t?($t&&$t.close(),d.ntfyRemoteClaimTimer||(d.ntfyRemoteClaimTimer=window.setInterval(cS,5e3)),hy||(hy=!0,window.addEventListener("focus",()=>nf("focus")),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"?nf("visible"):of()}),window.addEventListener("pagehide",of)),he("connecting","Connecting to ntfy."),$t=new EventSource(t),$t.onopen=()=>he("connected","Connected to ntfy."),$t.onmessage=MS,$t.onerror=()=>{he("error","ntfy connection lost. Reconnecting soon."),$t&&($t.close(),$t=null),Si=window.setTimeout(Nu,5e3)},!0):(yy(),he("disabled",wy()||"Add an ntfy topic to enable remote control."),!1)}function _y(){return $t&&($t.close(),$t=null),Nu()}var Cu=`${c}-in-theaters`;function zS(){let t=new Set;return Array.from(document.querySelectorAll(".hero-slider .slide-item")).map(e=>{let a=e.querySelector('.slide-item__backdrop--wrapper a[href*="/movies/view/"]'),l=e.querySelector(".slide-item__backdrop img"),n=e.querySelector(".slide-item__title"),i=n&&n.querySelector("span"),o=a?a.getAttribute("href"):"";if(!o||t.has(o))return null;t.add(o);let u=n?Array.from(n.childNodes).filter(r=>r.nodeType===Node.TEXT_NODE).map(r=>r.textContent).join("").trim():"";return{href:o,title:u||l&&l.getAttribute("alt")||"",year:i?i.textContent.replace(/[()]/g,"").trim():"",rating:(e.querySelector(".slide-item__stat span")||{}).textContent||"",poster:at(l&&(l.getAttribute("data-src-portrait")||l.getAttribute("data-src-landscape"))||""),qualityTag:e.querySelector(".quality-tag")}}).filter(Boolean)}function NS(t){let e=document.createElement("div");e.className="movie-item-style-2 movie-item-style-1";let a=document.createElement("div");a.className="hvr-inner";let l=document.createElement("a");l.href=t.href,l.append(" WATCH NOW ");let n=document.createElement("i");n.className="ion-play",l.append(n),a.append(l);let i=document.createElement("div");i.className="image__placeholder";let o=document.createElement("a");o.href=t.href;let u=document.createElement("img");if(u.src=t.poster,u.alt=t.title,u.loading="lazy",o.append(u),t.rating.trim()){let v=document.createElement("p");v.className="rate";let m=document.createElement("i");m.className="ion-android-star";let y=document.createElement("span");y.textContent=t.rating.trim(),v.append(m,y," /10"),o.append(v)}if(t.year){let v=document.createElement("p");v.className="year",v.textContent=t.year,o.append(v)}i.append(o),t.qualityTag&&i.append(t.qualityTag.cloneNode(!0));let r=document.createElement("div");r.className="mv-item-infor";let p=document.createElement("h6"),h=document.createElement("a");return h.href=t.href,h.textContent=t.title,p.append(h),r.append(p),e.append(a,i,r),e}function CS(){let t=Array.from(document.querySelectorAll(".page-single .hero-ct h1")).find(e=>/movies filter/i.test(e.textContent||""));return t?t.closest(".row"):null}function Ou(){let t=document.querySelector(`.${Cu}`);if(location.pathname!=="/"||!d.settings.siteTheme){t&&t.remove();return}let e=CS();if(t||!e)return;let a=zS();if(!a.length)return;let l=document.createElement("div");l.className=`row ipad-width ${Cu}`,l.innerHTML=`
    <div class="col-sm-12"><div class="hero-ct"><h1>Recent &amp; In Theaters</h1></div></div>
    <div class="col-sm-12"><div class="flex-wrap-movielist"></div></div>
  `;let n=l.querySelector(".flex-wrap-movielist");if(n.dataset.expanded="false",a.forEach((i,o)=>{let u=NS(i);o>=rc&&u.classList.add(`${Cu}-extra`),n.append(u)}),a.length>rc){let i=document.createElement("button");i.type="button",i.className=`${Cu}-toggle`,i.textContent=`Show all ${a.length}`,i.addEventListener("click",()=>{let o=n.dataset.expanded!=="true";n.dataset.expanded=o?"true":"false",i.textContent=o?"Show fewer":`Show all ${a.length}`}),n.parentElement.append(i)}e.parentElement.insertBefore(l,e),Ei(),cl()}var OS=`
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

  /* The site only sometimes reveals its slider; the in-theaters grid replaces it. */
  .hero-slider {
    display: none !important;
  }

  .${c}-in-theaters {
    margin-bottom: 40px;
  }

  .${c}-in-theaters .flex-wrap-movielist[data-expanded='false'] .${c}-in-theaters-extra {
    display: none !important;
  }

  .${c}-in-theaters-toggle {
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

  .${c}-in-theaters-toggle:hover {
    border-color: rgba(56, 189, 248, 0.6);
  }

  a[href="/premium.html"] {
    display: none !important;
  }
`;function $u(){let t=document.getElementById(oc);if(!d.settings.siteTheme){t&&t.remove();return}if(t||!document.documentElement)return;let e=document.createElement("style");e.id=oc,e.textContent=OS,(document.head||document.documentElement).appendChild(e)}var Ry=0;function $S(){window.clearTimeout(Ry),Ry=window.setTimeout(_y,Qf)}function $a(t){let e={ntfyRemoteEnabled:d.settings.ntfyRemoteEnabled,ntfyServer:d.settings.ntfyServer,ntfyTopic:d.settings.ntfyTopic,ntfyControlTopic:d.settings.ntfyControlTopic,ntfyCommandSecret:d.settings.ntfyCommandSecret};d.settings=fc(t),fd(d.settings),Uy(),$u(),Ou(),(!d.settings.autoFullscreen||!d.settings.windowedFullscreen)&&(rn(),d.fullscreenTriggered=!1),(e.ntfyRemoteEnabled!==d.settings.ntfyRemoteEnabled||e.ntfyServer!==d.settings.ntfyServer||e.ntfyTopic!==d.settings.ntfyTopic||e.ntfyControlTopic!==d.settings.ntfyControlTopic||e.ntfyCommandSecret!==d.settings.ntfyCommandSecret)&&$S()}var Mi=Z(Ya());function Dy(t,e){return!t||!e?"":`${t}:${e.season}:${e.episode}:${e.idEpisode}`}function ff(){return Object.values(d.playlistStore.entries)}function Ti(t){return t&&d.playlistStore.entries[t]||null}function Ly(t,e){return!!Ti(Dy(t,e))}function df(t){return[...t].sort((e,a)=>e.addedAt-a.addedAt)}function sn(){dc(d.playlistStore),Rt(),Ra()}function pf(){md(d.playlistSession),Rt()}function By(t){if(!t||!t.slug||!t.latestEpisode)return;let e=Dy(t.slug,t.latestEpisode);if(!e||Ti(e)){Rt();return}d.playlistStore.entries[e]=yn(e,{slug:t.slug,idShow:t.idShow,title:t.title,year:t.year,poster:t.poster,episode:t.latestEpisode,addedAt:Date.now()}),sn()}function mf(t){Ti(t)&&(delete d.playlistStore.entries[t],d.playlistSession.active&&d.playlistSession.currentKey===t&&fn(),sn())}function qy(t){if(!t.length)return"Add latest show episodes from the watchlist poster or list view.";let e=t[0];return`${t.length} queued ${t.length===1?"episode":"episodes"} | Next: ${e.title} ${Ut(e.episode)}`}function Hy(t){let e=df(ff());if(!e.length)return null;if(!t)return e[0];let a=e.findIndex(l=>l.key===t);return a>=0?e[a+1]||null:e[0]}function Yy(t){return t?(location.href=rl(t.slug,t.episode),!0):!1}function Ai(t){let e=t?Ti(t):Hy("");return e?(d.playlistSession={active:!0,currentKey:e.key,startedAt:Date.now()},pf(),Yy(e)):(fn(),!1)}function fn(){d.playlistSession={active:!1,currentKey:"",startedAt:0},pf()}function jy(){if(!d.playlistSession.active)return!1;let t=d.playlistSession.currentKey;if(!Ti(t))return fn(),!1;let a=Hy(t);return delete d.playlistStore.entries[t],dc(d.playlistStore),a?(d.playlistSession.currentKey=a.key,pf(),sn(),Yy(a)):(fn(),sn(),!0)}var RS=1;function US(){return{app:c,version:RS,exportedAt:new Date().toISOString(),watchlist:d.watchlistStore,movieWatchlist:d.movieWatchlistStore,playlist:d.playlistStore}}function Vy(){let t=JSON.stringify(US(),null,2),e=URL.createObjectURL(new Blob([t],{type:"application/json"})),a=document.createElement("a");a.href=e,a.download=`lookmovie2-watchlist-${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(a),a.click(),a.remove(),window.setTimeout(()=>URL.revokeObjectURL(e),1e3)}function hf(t,e,a){if(!t||typeof t!="object")return{};let l=t[e];return l&&typeof l=="object"&&l[a]&&typeof l[a]=="object"?l[a]:t[a]&&typeof t[a]=="object"?t[a]:{}}function ky(t){let e=[],a=0,l=0;Object.entries(hf(t,"watchlist","shows")).forEach(([i,o])=>{if(d.watchlistStore.shows[i])return;let u=hn(i,o);u&&(d.watchlistStore.shows[i]=u,e.push(i))}),Object.entries(hf(t,"movieWatchlist","movies")).forEach(([i,o])=>{if(d.movieWatchlistStore.movies[i])return;let u=gn(i,o);u&&(d.movieWatchlistStore.movies[i]=u,a+=1)}),Object.entries(hf(t,"playlist","entries")).forEach(([i,o])=>{let u=yn(i,o);u&&!d.playlistStore.entries[u.key]&&(d.playlistStore.entries[u.key]=u,l+=1)}),e.length&&(sl(),ta({force:!0,slugs:e})),a&&(dn(),_i()),l&&sn();let n=`Restored ${e.length} ${e.length===1?"show":"shows"}, ${a} ${a===1?"movie":"movies"}, ${l} playlist ${l===1?"episode":"episodes"}.`;return Pt(n,e.length||a||l?"success":"muted"),n}async function Gy(t){try{return ky(JSON.parse(await t.text()))}catch(e){return console.warn(`[${c}] Failed to import backup.`,e),Pt("That file is not a valid watchlist backup.","danger"),""}}function Qy(){return Ji().map(t=>({date:t.date,showCount:Object.keys(t.watchlist&&t.watchlist.shows||{}).length,movieCount:Object.keys(t.movieWatchlist&&t.movieWatchlist.movies||{}).length}))}function Xy(t){let e=Ji().find(a=>a.date===t);return e?ky(e):""}var Tt=Z(ut());function Wy(){let t=(0,Mi.useRef)(null),[e,a]=(0,Mi.useState)(""),l=Qy(),[n,i]=(0,Mi.useState)(""),o=n||l[0]&&l[0].date||"";return(0,Tt.jsxs)("div",{className:`${c}-setting ${c}-setting-stack`,children:[(0,Tt.jsxs)("div",{children:[(0,Tt.jsx)("p",{className:`${c}-setting-title`,children:"Watchlist backup"}),(0,Tt.jsx)("p",{className:`${c}-setting-copy`,children:"Watchlists are kept in Tampermonkey storage with a daily snapshot for the last 14 days. Export a file now and then for a copy outside the browser. Restoring only adds missing entries."})]}),(0,Tt.jsxs)("div",{className:`${c}-backup-actions`,children:[(0,Tt.jsx)("button",{className:`${c}-button`,type:"button",onClick:()=>Vy(),children:"Export file"}),(0,Tt.jsx)("button",{className:`${c}-button`,type:"button",onClick:()=>t.current&&t.current.click(),children:"Import file"}),(0,Tt.jsx)("input",{ref:t,className:`${c}-file-input`,type:"file",accept:"application/json,.json",hidden:!0,onChange:async u=>{let r=u.currentTarget.files&&u.currentTarget.files[0];u.currentTarget.value="",r&&a(await Gy(r))}})]}),l.length?(0,Tt.jsxs)("div",{className:`${c}-backup-actions`,children:[(0,Tt.jsxs)("label",{className:`${c}-field`,children:[(0,Tt.jsx)("span",{children:"Snapshot"}),(0,Tt.jsx)("select",{value:o,onChange:u=>i(u.currentTarget.value),children:l.map(u=>(0,Tt.jsxs)("option",{value:u.date,children:[u.date," (",u.showCount," shows, ",u.movieCount," movies)"]},u.date))})]}),(0,Tt.jsx)("button",{className:`${c}-button`,type:"button",onClick:()=>a(Xy(o)),children:"Restore"})]}):null,e?(0,Tt.jsx)("p",{className:`${c}-ntfy-status`,children:e}):null]})}var ye=Z(ut());function Ua({settingKey:t,title:e,copy:a,icon:l}){let n=!!d.settings[t];return(0,ye.jsxs)("label",{className:`${c}-setting`,children:[(0,ye.jsxs)("div",{className:`${c}-setting-main`,children:[l?(0,ye.jsx)("span",{className:`${c}-setting-icon`,children:l}):null,(0,ye.jsxs)("div",{children:[(0,ye.jsx)("p",{className:`${c}-setting-title`,children:e}),(0,ye.jsx)("p",{className:`${c}-setting-copy`,children:a})]})]}),(0,ye.jsxs)("span",{className:`${c}-switch`,children:[(0,ye.jsx)("input",{type:"checkbox",checked:n,onChange:i=>{$a({...d.settings,[t]:i.currentTarget.checked})}}),(0,ye.jsx)("span",{className:`${c}-slider`})]})]})}var qu=Z(Ya());var BS=/^(?:ep_\d+|lookmovie\.mv_\d+)$/,gf=null;function Fy(t){return`ep_${t}`}function Iy(t){return`lookmovie.mv_${t}`}function Py(){return gf||(gf=vd()),gf}function t0(t){try{return mc(JSON.parse(localStorage.getItem(t)||"null"))}catch{return null}}function qS(t){let e=Object.keys(t);return e.length<=cc?!1:(e.sort((a,l)=>t[l].savedAt-t[a].savedAt).slice(cc).forEach(a=>delete t[a]),!0)}function Uu(){let t=Py(),e=!1;try{for(let a=0;a<localStorage.length;a+=1){let l=localStorage.key(a);if(!BS.test(l))continue;let n=t0(l),i=t[l];n&&(!i||i.progress!==n.progress||i.duration!==n.duration)&&(t[l]={...n,savedAt:Date.now()},e=!0)}Object.entries(t).forEach(([a,l])=>{localStorage.getItem(a)===null&&localStorage.setItem(a,JSON.stringify({duration:l.duration,progress:l.progress}))})}catch(a){console.warn(`[${c}] Failed to sync resume points.`,a)}(qS(t)||e)&&bd(t)}function e0(){Uu(),window.setInterval(Uu,Wf),window.addEventListener("pagehide",Uu),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Uu()})}function HS(t){return t0(t)||Py()[t]||null}function Du(t){let e=HS(t);if(!e)return null;let a=e.progress/e.duration*100;return a>=Jf&&a<Qi?e:null}function Lu(t){let e=Math.max(1,Math.round((t.duration-t.progress)/6e4));return e<60?`${e}m left`:`${Math.floor(e/60)}h ${e%60}m left`}var vt=Z(ut());function a0({entry:t,viewMode:e}){let a=t.watched?"watched":"new",l=t.href||Bu(t.slug),n=t.addedAt?`Added ${new Date(t.addedAt).toLocaleDateString()}`:"",i=[],o=t.idMovie?Du(Iy(t.idMovie)):null,u=`/movies/play/${t.slug}`;return n&&i.push(n),(0,vt.jsxs)("article",{className:`${c}-watch-item`,"data-state":a,"data-view":e,children:[(0,vt.jsxs)("div",{className:`${c}-watch-item-poster`,children:[(0,vt.jsx)("a",{className:`${c}-watch-poster-link`,href:l,"aria-label":`Open ${t.title}`,children:t.poster?(0,vt.jsx)("img",{src:t.poster,alt:t.title,loading:"lazy"}):(0,vt.jsx)("div",{className:`${c}-watch-item-poster-placeholder`,children:"MOVIE"})}),(0,vt.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-check-button`,type:"button","aria-label":t.watched?`Mark ${t.title} unwatched`:`Mark ${t.title} watched`,title:t.watched?"Mark unwatched":"Mark watched",onClick:()=>l0(t.slug),children:"\u2713"}),(0,vt.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-remove-button`,type:"button","aria-label":`Remove ${t.title}`,title:"Remove",onClick:()=>zi(t.slug),children:"\xD7"}),(0,vt.jsx)("div",{className:`${c}-watch-item-poster-overlay`,children:(0,vt.jsx)("span",{className:`${c}-watch-badge`,"data-state":a,children:t.watched?"Watched":"To watch"})})]}),(0,vt.jsxs)("div",{className:`${c}-watch-item-body`,children:[(0,vt.jsxs)("div",{children:[(0,vt.jsxs)("a",{className:`${c}-watch-item-title`,href:l,children:[t.title,t.year?` (${t.year})`:""]}),i.length?(0,vt.jsx)("p",{className:`${c}-watch-item-copy`,children:i.join(" | ")}):null]}),o||!t.watched?(0,vt.jsxs)("a",{className:`${c}-watch-action`,href:u,children:[(0,vt.jsx)("span",{"aria-hidden":"true",children:"\u25B6"})," ",o?"Continue":"Play",o?(0,vt.jsx)("small",{children:Lu(o)}):null]}):null]})]})}var Ni=Z(ut());function n0(){return(0,Ni.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,Ni.jsx)("path",{d:"M9.2 16.6 4.9 12.3l-1.4 1.4 5.7 5.7L21 7.6l-1.4-1.4L9.2 16.6z"})})}function i0(){return(0,Ni.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,Ni.jsx)("path",{d:"m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5z"})})}var At=Z(ut());function o0({entry:t,viewMode:e,isActive:a}){let l=rl(t.slug,t.episode),n=Ut(t.episode),i=t.addedAt?`Queued ${new Date(t.addedAt).toLocaleDateString()}`:"",o=[n];return i&&o.push(i),(0,At.jsxs)("article",{className:`${c}-watch-item`,"data-state":"new","data-view":e,"data-playlist-active":a?"true":"false",children:[(0,At.jsxs)("div",{className:`${c}-watch-item-poster`,children:[(0,At.jsx)("a",{className:`${c}-watch-poster-link`,href:l,"aria-label":`Open ${t.title} ${n}`,onClick:u=>{u.preventDefault(),Ai(t.key)},children:t.poster?(0,At.jsx)("img",{src:t.poster,alt:t.title,loading:"lazy"}):(0,At.jsx)("div",{className:`${c}-watch-item-poster-placeholder`,children:"TV"})}),(0,At.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-check-button`,type:"button","aria-label":`Remove ${t.title} ${n} from playlist`,title:"Done",onClick:()=>mf(t.key),children:(0,At.jsx)(n0,{})}),(0,At.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-remove-button`,type:"button","aria-label":`Remove ${t.title}`,title:"Remove",onClick:()=>mf(t.key),children:(0,At.jsx)(i0,{})}),(0,At.jsx)("div",{className:`${c}-watch-item-poster-overlay`,children:(0,At.jsx)("span",{className:`${c}-watch-badge`,"data-state":"new",children:a?"Playing":"Queued"})})]}),(0,At.jsx)("div",{className:`${c}-watch-item-body`,children:(0,At.jsxs)("div",{children:[(0,At.jsxs)("a",{className:`${c}-watch-item-title`,href:l,onClick:u=>{u.preventDefault(),Ai(t.key)},children:[t.title,t.year?` (${t.year})`:""]}),(0,At.jsx)("p",{className:`${c}-watch-item-copy`,children:o.join(" | ")})]})})]})}var Da=Z(Ya());async function u0(t,e){let a=String(e||"").trim();if(a.length<2)return[];let l=await Zi(`/api/v1/${t}/do-search/?q=${encodeURIComponent(a)}`);return(l&&Array.isArray(l.result)?l.result:[]).filter(i=>i&&typeof i.slug=="string"&&i.slug).slice(0,Pf).map(i=>({slug:i.slug,idShow:i.id_show||0,idMovie:i.id_movie||0,title:typeof i.title=="string"?i.title:i.slug,year:i.year?String(i.year):"",rating:i.imdb_rating?String(i.imdb_rating):"",poster:at(i.poster&&(i.poster.w200||i.poster.w100)||"")}))}var te=Z(ut());function c0({type:t}){let[e,a]=(0,Da.useState)(""),[l,n]=(0,Da.useState)([]),[i,o]=(0,Da.useState)(""),u=(0,Da.useRef)(0),r=t==="shows";(0,Da.useEffect)(()=>{n([]),o("");let h=e.trim();if(h.length<2)return;let v=++u.current,m=window.setTimeout(async()=>{o("Searching...");try{let y=await u0(t,h);v===u.current&&(n(y),o(y.length?"":"No matches."))}catch{v===u.current&&o("Search failed. Try again.")}},td);return()=>window.clearTimeout(m)},[e,t]);function p(h){r?Oi({...h}):Ci({...h,href:`/movies/view/${h.slug}`})}return(0,te.jsxs)("div",{className:`${c}-search`,children:[(0,te.jsx)("input",{type:"search",value:e,placeholder:r?"Search TV shows to add":"Search movies to add","aria-label":r?"Search TV shows to add":"Search movies to add",onChange:h=>a(h.currentTarget.value),onKeyDown:h=>{h.key==="Escape"&&(h.stopPropagation(),a(""))}}),i?(0,te.jsx)("p",{className:`${c}-search-status`,children:i}):null,l.length?(0,te.jsx)("ul",{className:`${c}-search-results`,children:l.map(h=>{let v=r?!!Ce(h.slug):!!ea(h.slug);return(0,te.jsxs)("li",{children:[h.poster?(0,te.jsx)("img",{src:h.poster,alt:"",loading:"lazy"}):(0,te.jsx)("span",{}),(0,te.jsxs)("div",{children:[(0,te.jsx)("strong",{children:h.title}),(0,te.jsx)("small",{children:[h.year,h.rating?`IMDb ${h.rating}`:""].filter(Boolean).join(" \xB7 ")})]}),(0,te.jsx)("button",{className:`${c}-button`,type:"button",disabled:v,onClick:()=>p(h),children:v?"Added":"Add"})]},h.slug)})}):null]})}var mt=Z(ut());function YS(t,e){let a=t.lastWatched&&Du(Fy(t.lastWatched.idEpisode));if(a)return{href:rl(t.slug,t.lastWatched),label:`Continue ${Ut(t.lastWatched)}`,detail:Lu(a)};let l=e&&e.episodes[0];return l?{href:rl(t.slug,l),label:`Play ${Ut(l)}`,detail:""}:null}function r0({entry:t,viewMode:e}){let a=yf(t),l=a?a.total:null,n=YS(t,a),i=l!==null?l>0?"new":"watched":t.latestEpisode?$e(t)?"watched":"new":"pending",o=t.latestEpisode?`Latest ${Ut(t.latestEpisode)}`:"Latest episode not synced yet",u=t.lastWatched?`Watched through ${Ut(t.lastWatched)}`:"Nothing marked watched yet",r=t.lastSyncError?`Sync issue: ${t.lastSyncError}`:"",p=i==="new"?l?`${l>99?"99+":l} unwatched`:"New episode":i==="watched"?"Up to date":"Pending sync",h=s0(t.slug,t.latestEpisode),v=$e(t)?"Mark latest unwatched":"Mark latest watched",m=Ly(t.slug,t.latestEpisode),y=m?`${t.title} latest episode is already in your playlist`:`Add ${t.title} latest episode to playlist`,E=t.lastWatched?[o,u]:[o];return r&&E.push(r),(0,mt.jsxs)("article",{className:`${c}-watch-item`,"data-state":i,"data-view":e,children:[(0,mt.jsxs)("div",{className:`${c}-watch-item-poster`,children:[(0,mt.jsx)("a",{className:`${c}-watch-poster-link`,href:h,"aria-label":`Open ${t.title}`,children:t.poster?(0,mt.jsx)("img",{src:t.poster,alt:t.title,loading:"lazy"}):(0,mt.jsx)("div",{className:`${c}-watch-item-poster-placeholder`,children:"TV"})}),(0,mt.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-check-button`,type:"button",disabled:!t.latestEpisode,"aria-label":v,title:v,onClick:()=>f0(t.slug),children:"\u2713"}),(0,mt.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-playlist-button`,type:"button",disabled:!t.latestEpisode||m,"aria-label":y,title:y,onClick:()=>By(t),children:"+"}),(0,mt.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-remove-button`,type:"button","aria-label":`Remove ${t.title}`,title:"Remove",onClick:()=>$i(t.slug),children:"\xD7"}),(0,mt.jsx)("div",{className:`${c}-watch-item-poster-overlay`,children:(0,mt.jsx)("span",{className:`${c}-watch-badge`,"data-state":i,children:p})})]}),(0,mt.jsxs)("div",{className:`${c}-watch-item-body`,children:[(0,mt.jsxs)("div",{children:[(0,mt.jsxs)("a",{className:`${c}-watch-item-title`,href:h,children:[t.title,t.year?` (${t.year})`:""]}),(0,mt.jsx)("p",{className:`${c}-watch-item-copy`,children:E.join(" | ")})]}),n?(0,mt.jsxs)("a",{className:`${c}-watch-action`,href:n.href,children:[(0,mt.jsx)("span",{"aria-hidden":"true",children:"\u25B6"})," ",n.label,n.detail?(0,mt.jsx)("small",{children:n.detail}):null]}):null]})]})}var M=Z(ut());function d0(){return(0,M.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,M.jsx)("path",{d:"M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"})})}function p0(){return(0,M.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,M.jsx)("path",{d:"M4 6h3v3H4V6zm5 .5h11v2H9v-2zM4 11h3v3H4v-3zm5 .5h11v2H9v-2zM4 16h3v3H4v-3zm5 .5h11v2H9v-2z"})})}function jS(){return(0,M.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,M.jsx)("path",{d:"M17.7 6.3A7.9 7.9 0 0 0 12 4a8 8 0 1 0 7.5 10.7l-1.9-.7A6 6 0 1 1 16.3 7.7L13 11h8V3l-3.3 3.3z"})})}function VS(){return(0,M.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,M.jsx)("path",{d:"M8 5v14l11-7L8 5z"})})}function kS(){return(0,M.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,M.jsx)("path",{d:"M6 6h12v12H6V6z"})})}function m0({id:t,title:e,summary:a,count:l,isOpen:n,onClick:i}){return(0,M.jsxs)("button",{id:`${S}-${t}-fold-button`,className:`${c}-accordion-trigger`,type:"button","aria-expanded":n?"true":"false","aria-controls":`${S}-${t}-fold-panel`,"data-open":n?"true":"false",onClick:i,children:[(0,M.jsxs)("span",{children:[(0,M.jsx)("strong",{children:e}),(0,M.jsx)("small",{children:a})]}),(0,M.jsx)("em",{children:l})]})}function h0(){let[t,e]=(0,qu.useState)("watchlist"),[a,l]=(0,qu.useState)("shows"),[n,i]=(0,qu.useState)("poster"),o=y0(Hu()),u=g0(vf()),r=df(ff()),p=o.filter(s=>s.latestEpisode&&!$e(s)).length,h=u.filter(s=>!s.watched).length,v=a==="shows",m=t==="watchlist",y=t==="playlist",E=v?o.length?`${o.length} tracked ${o.length===1?"show":"shows"}${p?` | ${p} with a newer latest episode`:""}`:"Add shows from the latest episodes page to start tracking them.":u.length?`${u.length} tracked ${u.length===1?"movie":"movies"}${h?` | ${h} unwatched`:""}`:"Add movies from the movies page or an individual movie page to start tracking them.",_=qy(r),C=n==="list",f=d.playlistSession.active;return(0,M.jsx)("section",{id:`${S}-watchlist-panel`,children:(0,M.jsxs)("div",{className:`${c}-accordion`,children:[(0,M.jsx)(m0,{id:"watchlist",title:"Watchlist",summary:E,count:o.length+u.length,isOpen:m,onClick:()=>e("watchlist")}),m?(0,M.jsxs)("div",{id:`${S}-watchlist-fold-panel`,className:`${c}-accordion-panel`,role:"region","aria-labelledby":`${S}-watchlist-fold-button`,children:[(0,M.jsxs)("div",{id:`${S}-watchlist-toolbar`,children:[(0,M.jsxs)("div",{children:[(0,M.jsx)("h3",{id:`${S}-watchlist-title`,children:"Watchlist"}),(0,M.jsxs)("div",{className:`${c}-tabs`,role:"tablist","aria-label":"Watchlist type",children:[(0,M.jsxs)("button",{className:`${c}-tab`,type:"button",role:"tab","aria-selected":v?"true":"false","data-active":v?"true":"false",onClick:()=>l("shows"),children:["TV Shows",p>0?(0,M.jsx)("span",{children:p}):null]}),(0,M.jsxs)("button",{className:`${c}-tab`,type:"button",role:"tab","aria-selected":v?"false":"true","data-active":v?"false":"true",onClick:()=>l("movies"),children:["Movies",h>0?(0,M.jsx)("span",{children:h}):null]})]})]}),(0,M.jsxs)("div",{className:`${c}-watchlist-toolbar-actions`,children:[(0,M.jsx)("button",{className:`${c}-button ${c}-toolbar-icon-button ${c}-view-toggle`,type:"button","aria-pressed":C?"true":"false","aria-label":C?"Switch to poster view":"Switch to list view",title:C?"Switch to poster view":"Switch to list view",onClick:()=>i(C?"poster":"list"),children:C?(0,M.jsx)(d0,{}):(0,M.jsx)(p0,{})}),v?(0,M.jsx)("button",{id:`${S}-watchlist-refresh`,className:`${c}-button ${c}-toolbar-icon-button`,type:"button",disabled:d.watchlistBusy,"aria-label":"Refresh watchlist",title:"Refresh watchlist",onClick:()=>ta({force:!0}),children:(0,M.jsx)(jS,{})}):null]})]}),(0,M.jsx)(c0,{type:v?"shows":"movies"}),v?(0,M.jsx)("div",{id:`${S}-watchlist-status`,"data-tone":d.watchlistMessageTone,children:d.watchlistBusy?d.watchlistMessage||"Refreshing watchlist...":d.watchlistMessage||""}):null,(0,M.jsx)("div",{id:`${S}-watchlist-list`,"data-view":n,children:v&&o.length?o.map(s=>(0,M.jsx)(r0,{entry:s,viewMode:n},s.slug)):!v&&u.length?u.map(s=>(0,M.jsx)(a0,{entry:s,viewMode:n},s.slug)):(0,M.jsx)("div",{className:`${c}-watch-empty`,children:v?"On the /shows page or an individual show page, use the watchlist button to add that show here.":"On the /movies page or an individual movie page, use the movie watchlist button to add a movie here."})})]}):null,(0,M.jsx)(m0,{id:"playlist",title:"Playlist",summary:_,count:r.length,isOpen:y,onClick:()=>e("playlist")}),y?(0,M.jsxs)("div",{id:`${S}-playlist-fold-panel`,className:`${c}-accordion-panel`,role:"region","aria-labelledby":`${S}-playlist-fold-button`,children:[(0,M.jsxs)("div",{id:`${S}-playlist-toolbar`,children:[(0,M.jsx)("h3",{id:`${S}-playlist-title`,children:"Playlist"}),(0,M.jsxs)("div",{className:`${c}-watchlist-toolbar-actions`,children:[(0,M.jsx)("button",{className:`${c}-button ${c}-toolbar-icon-button ${c}-playlist-play-button`,type:"button",disabled:!r.length,"aria-label":f?"Stop playlist playback":"Play playlist",title:f?"Stop playlist playback":"Play playlist","data-active":f?"true":"false",onClick:()=>{f?fn():Ai()},children:f?(0,M.jsx)(kS,{}):(0,M.jsx)(VS,{})}),(0,M.jsx)("button",{className:`${c}-button ${c}-toolbar-icon-button ${c}-view-toggle`,type:"button","aria-pressed":C?"true":"false","aria-label":C?"Switch to poster view":"Switch to list view",title:C?"Switch to poster view":"Switch to list view",onClick:()=>i(C?"poster":"list"),children:C?(0,M.jsx)(d0,{}):(0,M.jsx)(p0,{})})]})]}),(0,M.jsx)("div",{id:`${S}-playlist-list`,"data-view":n,children:r.length?r.map(s=>(0,M.jsx)(o0,{entry:s,viewMode:n,isActive:d.playlistSession.currentKey===s.key},s.key)):(0,M.jsx)("div",{className:`${c}-watch-empty`,children:"Add a latest show episode from a watchlist poster or list item."})})]}):null]})})}var x=Z(ut());function GS(t){return Array.from(document.querySelectorAll("a, button")).find(e=>ed(e)?t.test(ad(e)):!1)}function QS(){let t=GS(/\bsign\s*up\b|\bsignup\b|\bregister\b/i);if(t){let a=t.closest("li");return a&&a.parentElement?{parent:a.parentElement,before:a.nextSibling,sourceItem:a}:{parent:t.parentElement,before:t.nextSibling,sourceItem:null}}let e=document.querySelector("header, nav, .navbar, .main-header, .header");return e?{parent:e,before:null,sourceItem:null}:null}function XS(t){for(let e=t;e&&e!==document.body;e=e.parentElement){let a=getComputedStyle(e).position;if(a==="fixed"||a==="sticky")return!0}return!1}function ZS(){let t=QS();if(!t||!t.parent||XS(t.parent))return null;let e=document.getElementById(`${S}-launcher-host`);return e&&e.tagName!=="LI"&&(e.remove(),e=null),e||(e=document.createElement("li"),e.id=`${S}-launcher-host`),t.sourceItem&&e.className!==t.sourceItem.className&&(e.className=t.sourceItem.className),t.before!==e&&(e.parentElement!==t.parent||e.nextSibling!==t.before)&&t.parent.insertBefore(e,t.before),e}function v0(){return(0,x.jsxs)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[(0,x.jsx)("path",{d:"M8 6.5v11l8.5-5.5L8 6.5z"}),(0,x.jsx)("path",{d:"M16.5 4.5a7.5 7.5 0 0 1 3.2 9.4l1.6.7A9.3 9.3 0 0 0 17.2 3l-.7 1.5zM7.5 19.5a7.5 7.5 0 0 1-3.2-9.4l-1.6-.7A9.3 9.3 0 0 0 6.8 21l.7-1.5z"}),(0,x.jsx)("path",{d:"M19.4 15.2 22 15l-1.5 2.2-1.1-2zM4.6 8.8 2 9l1.5-2.2 1.1 2z"})]})}function b0(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M5 10V5h5v2H7v3H5zm9-5h5v5h-2V7h-3V5zM7 14v3h3v2H5v-5h2zm10 0h2v5h-5v-2h3v-3z"})})}function KS(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M3 5h18v14H3V5zm2 2v10h14V7H5zm2 2h4v2H9v2H7V9zm10 6h-4v-2h2v-2h2v4z"})})}function JS(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M4 4h7v7H4V4zm9 0h7v4h-7V4zm0 6h7v10h-7V10zM4 13h7v7H4v-7z"})})}function WS(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M5 6v12l8.5-6L5 6zm9 0v12h2V6h-2zm3 0v12h2V6h-2z"})})}function FS(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M4 6v12l7-6-7-6zm7 0v12l7-6-7-6zm8 0h2v12h-2V6z"})})}function S0(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M7.1 14.9a7 7 0 0 1 9.8 0l-1.4 1.4a5 5 0 0 0-7 0l-1.4-1.4zm-3.5-3.5a12 12 0 0 1 16.8 0L19 12.8a10 10 0 0 0-14 0l-1.4-1.4zm7 7a2 2 0 0 1 2.8 0L12 19.8l-1.4-1.4zM8 4h8v2H8V4z"})})}function IS(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M12 2.8 14.3 8l5.7.6-4.3 3.8 1.2 5.6-4.9-2.9L7.1 18l1.2-5.6L4 8.6 9.7 8 12 2.8z"})})}function x0(){let[t,e]=(0,Vt.useState)(!1),[a,l]=(0,Vt.useState)(null),[n,i]=(0,Vt.useState)(()=>window.scrollY>120),[o,u]=(0,Vt.useState)(!1),r=(0,Vt.useRef)(0),[,p]=(0,Vt.useState)(0);(0,Vt.useEffect)(()=>fy(()=>p(f=>f+1)),[]),(0,Vt.useEffect)(()=>{function f(s){s.key==="Escape"&&e(!1)}return window.addEventListener("keydown",f),()=>window.removeEventListener("keydown",f)},[]),(0,Vt.useEffect)(()=>{let f=0;function s(){let b=ZS();l(A=>A===b?A:b),f+=1,(b||f>40)&&window.clearInterval(g)}let g=window.setInterval(s,500);return s(),()=>window.clearInterval(g)},[]),(0,Vt.useEffect)(()=>{function f(){i(window.scrollY>120)}return f(),window.addEventListener("scroll",f,{passive:!0}),()=>window.removeEventListener("scroll",f)},[]),(0,Vt.useEffect)(()=>()=>{window.clearTimeout(r.current)},[]);function h(){e(!0)}function v(){window.clearTimeout(r.current),u(!0)}function m(){window.clearTimeout(r.current),r.current=window.setTimeout(()=>{u(!1)},240)}function y(f){$a({...d.settings,[f]:!d.settings[f]})}function E(f,s){$a({...d.settings,[f]:s})}let _=n?null:a,C=(0,x.jsxs)("div",{id:`${S}-launcher`,"data-hosted":_?"true":"false","data-scrolled":n?"true":"false","data-quick-open":o?"true":"false",onMouseEnter:v,onMouseLeave:m,onFocus:v,onBlur:f=>{f.currentTarget.contains(f.relatedTarget)||m()},children:[(0,x.jsxs)("button",{id:`${S}-button`,type:"button","aria-label":"Open LookMovie2 Enhancer","aria-haspopup":"dialog","aria-expanded":t?"true":"false",title:"Open enhancer",onClick:()=>t?e(!1):h(),children:[(0,x.jsx)("span",{id:`${S}-button-icon`,children:(0,x.jsx)(IS,{})}),(0,x.jsx)("span",{id:`${S}-button-label`,children:"Enhancer"})]}),(0,x.jsxs)("div",{id:`${S}-quick-settings`,role:"toolbar","aria-label":"Quick playback settings",children:[(0,x.jsx)("button",{className:`${c}-quick-setting`,type:"button","aria-label":"Toggle auto play",title:"Toggle auto play","data-enabled":d.settings.autoPlay?"true":"false",onClick:f=>{f.stopPropagation(),y("autoPlay")},children:(0,x.jsx)(v0,{})}),(0,x.jsx)("button",{className:`${c}-quick-setting`,type:"button","aria-label":"Toggle auto fullscreen",title:"Toggle auto fullscreen","data-enabled":d.settings.autoFullscreen?"true":"false",onClick:f=>{f.stopPropagation(),y("autoFullscreen")},children:(0,x.jsx)(b0,{})}),(0,x.jsx)("button",{className:`${c}-quick-setting`,type:"button","aria-label":"Toggle ntfy remote",title:"Toggle ntfy remote","data-enabled":d.settings.ntfyRemoteEnabled?"true":"false",onClick:f=>{f.stopPropagation(),y("ntfyRemoteEnabled")},children:(0,x.jsx)(S0,{})})]})]});return(0,x.jsxs)(x.Fragment,{children:[_?(0,w0.createPortal)(C,_):C,(0,x.jsx)("div",{id:`${S}-overlay`,"aria-hidden":t?"false":"true",className:t?`${c}-open`:"",onClick:f=>{f.target===f.currentTarget&&e(!1)},children:(0,x.jsxs)("div",{id:`${S}-modal`,role:"dialog","aria-modal":"true","aria-labelledby":`${S}-title`,children:[(0,x.jsxs)("div",{id:`${S}-header`,children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("h2",{id:`${S}-title`,children:"LookMovie2 Enhancer"}),(0,x.jsx)("p",{id:`${S}-subtitle`,children:"Playback helpers plus a personal show watchlist with latest episode tracking."})]}),(0,x.jsx)("button",{id:`${S}-close`,type:"button","aria-label":"Close settings",onClick:()=>e(!1),children:"\xD7"})]}),(0,x.jsxs)("div",{id:`${S}-content`,children:[(0,x.jsxs)("section",{id:`${S}-settings-panel`,children:[(0,x.jsx)("h3",{id:`${S}-settings-title`,children:"Playback Tools"}),(0,x.jsxs)("div",{id:`${S}-settings`,children:[(0,x.jsx)(Ua,{settingKey:"autoPlay",title:"Auto play",copy:"Clicks the resume or start button when the playback modal appears.",icon:(0,x.jsx)(v0,{})}),(0,x.jsx)(Ua,{settingKey:"autoFullscreen",title:"Auto fullscreen",copy:"Clicks the player's fullscreen button after playback starts.",icon:(0,x.jsx)(b0,{})}),(0,x.jsx)(Ua,{settingKey:"windowedFullscreen",title:"Windowed fullscreen",copy:"Stretches the player over the page when the browser blocks real fullscreen, e.g. after auto play or a remote command.",icon:(0,x.jsx)(KS,{})}),(0,x.jsx)(Ua,{settingKey:"siteTheme",title:"Site UI polish",copy:"Wider layout, responsive poster grids, a calmer background and no premium upsell links.",icon:(0,x.jsx)(JS,{})}),(0,x.jsx)(Ua,{settingKey:"autoNextEpisode",title:"Auto next episode",copy:"Counts down and plays the next episode when one ends, outside playlist mode.",icon:(0,x.jsx)(WS,{})}),(0,x.jsx)(Ua,{settingKey:"autoSkipIntro",title:"Auto skip intros",copy:"Jumps past an intro you marked for that show. Off shows a Skip intro button instead.",icon:(0,x.jsx)(FS,{})}),(0,x.jsx)(Ua,{settingKey:"ntfyRemoteEnabled",title:"Android remote",copy:"Publishes a player notification to ntfy with Android action buttons.",icon:(0,x.jsx)(S0,{})}),(0,x.jsxs)("div",{className:`${c}-setting ${c}-setting-stack`,children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("p",{className:`${c}-setting-title`,children:"ntfy topics"}),(0,x.jsx)("p",{className:`${c}-setting-copy`,children:"The phone subscribes to the display topic; the browser listens on the control topic. Use only letters, numbers, hyphens, and underscores."})]}),(0,x.jsxs)("label",{className:`${c}-field`,children:[(0,x.jsx)("span",{children:"Server"}),(0,x.jsx)("input",{type:"url",value:d.settings.ntfyServer,placeholder:"https://ntfy.sh",onChange:f=>E("ntfyServer",f.currentTarget.value)})]}),(0,x.jsxs)("label",{className:`${c}-field`,children:[(0,x.jsx)("span",{children:"Display topic"}),(0,x.jsx)("input",{type:"text",value:d.settings.ntfyTopic,maxLength:64,pattern:"[A-Za-z0-9_-]{1,64}",placeholder:"random-private-topic",onChange:f=>E("ntfyTopic",f.currentTarget.value)})]}),(0,x.jsxs)("label",{className:`${c}-field`,children:[(0,x.jsx)("span",{children:"Control topic"}),(0,x.jsx)("input",{type:"text",value:d.settings.ntfyControlTopic,maxLength:64,pattern:"[A-Za-z0-9_-]{1,64}",placeholder:"display-topic-controls",onChange:f=>E("ntfyControlTopic",f.currentTarget.value)})]}),(0,x.jsxs)("label",{className:`${c}-field`,children:[(0,x.jsx)("span",{children:"Command secret"}),(0,x.jsx)("input",{type:"password",value:d.settings.ntfyCommandSecret,placeholder:"optional shared command prefix",onChange:f=>E("ntfyCommandSecret",f.currentTarget.value)})]}),(0,x.jsx)("p",{className:`${c}-ntfy-status`,"data-status":d.ntfyRemoteStatus,children:d.ntfyRemoteMessage||`Remote status: ${d.ntfyRemoteStatus}`})]}),(0,x.jsx)(Wy,{})]}),(0,x.jsx)("div",{id:`${S}-footer`,children:"Settings and watchlist data are saved in Tampermonkey storage on this browser."})]}),(0,x.jsx)(h0,{})]})]})})]})}var T0=Z(ut()),bf=null;function PS(){if(!document.head||document.getElementById(ic))return;let t=document.createElement("style");t.id=ic,t.textContent=dy(),document.head.appendChild(t)}function Sf(){if(PS(),!document.body)return;let t=document.getElementById(S);t||(t=document.createElement("div"),t.id=S,document.body.appendChild(t)),bf||(bf=(0,E0.createRoot)(t),bf.render((0,T0.jsx)(x0,{})))}function Ra(){cn()}function Rt(){cn()}function Uy(){cn()}var Ri=null;function vf(){return Object.values(d.movieWatchlistStore.movies)}function ea(t){return t&&d.movieWatchlistStore.movies[t]||null}function g0(t){return[...t].sort((e,a)=>e.watched!==a.watched?e.watched?1:-1:e.title.localeCompare(a.title))}function dn(){pd(d.movieWatchlistStore),Rt(),Ra(),cl(),Ui()}function t2(t){return!(!t||typeof t.poster!="string"||!t.poster.trim()||t.poster.trim().startsWith("data:image/"))}function e2(t){let e=t.match(/(?:var\s+|window\.)movie_storage\s*=\s*(\{[\s\S]*?\})\s*;/);if(!e)return{};try{return JSON.parse(e[1])}catch(a){return console.warn(`[${c}] Failed to parse movie_storage metadata.`,a),{}}}async function A0(t,e){let a=await Xi(`/movies/view/${t}`),l=e2(a),n=a.match(/id_movie:\s*(\d+)/),i=a.match(/title:\s*'((?:\\'|[^'])*)'/),o=a.match(/year:\s*'((?:\\'|[^'])*)'/),u=a.match(/poster_medium:\s*'((?:\\'|[^'])*)'/),r=typeof l.movie_poster=="string"&&l.movie_poster?l.movie_poster:typeof l.poster_medium=="string"&&l.poster_medium?l.poster_medium:typeof l.poster=="string"?l.poster:"";return{slug:t,idMovie:typeof l.id_movie=="number"?l.id_movie:n?parseInt(n[1],10):0,title:typeof l.title=="string"&&l.title.trim()?l.title.trim():i?xe(i[1]).trim():e&&e.title?e.title:t,year:typeof l.year=="string"||typeof l.year=="number"?String(l.year):o?xe(o[1]).trim():e&&e.year?e.year:"",poster:at(r)||(u?at(xe(u[1])):"")||(e&&e.poster?at(e.poster):"")}}async function _i(){if(Ri)return Ri;let t=vf().filter(e=>!t2(e)||!e.idMovie);return t.length?(Ri=(async()=>{let e=!1;for(let a of t)try{let l=await A0(a.slug,a);l.idMovie&&l.idMovie!==a.idMovie&&(a.idMovie=l.idMovie,e=!0),l.title&&l.title!==a.title&&(a.title=l.title,e=!0),l.year&&l.year!==a.year&&(a.year=l.year,e=!0),l.poster&&l.poster!==a.poster&&(a.poster=l.poster,e=!0)}catch(l){console.warn(`[${c}] Failed to refresh movie metadata for ${a.slug}.`,l)}e&&dn()})().finally(()=>{Ri=null}),Ri):Promise.resolve()}function Ci(t){if(!t||!t.slug)return;let e={slug:t.slug,title:t.title||t.slug,year:t.year||"",poster:t.poster||"",idMovie:t.idMovie||0};A0(t.slug,t).then(a=>{a.title&&(e.title=a.title),a.year&&(e.year=a.year),a.poster&&(e.poster=a.poster),a.idMovie&&(e.idMovie=a.idMovie),d.movieWatchlistStore.movies[t.slug]=gn(t.slug,{slug:t.slug,title:e.title,year:e.year,poster:e.poster,idMovie:e.idMovie,href:t.href||`/movies/view/${t.slug}`,addedAt:Date.now(),watched:!1}),dn(),Rt()})}function zi(t){ea(t)&&(delete d.movieWatchlistStore.movies[t],dn())}function l0(t){let e=ea(t);e&&(e.watched=!e.watched,e.watchedAt=e.watched?Date.now():void 0,dn())}function _0(t){try{let a=new URL(t,location.origin).pathname.match(/\/shows\/view\/([^/?#]+)/i);return a?a[1]:""}catch{return""}}function a2(t){try{let e=new URL(t,location.origin),a=et(e.searchParams.get("season")),l=et(e.searchParams.get("episode")),n=et(e.searchParams.get("id_episode"));return!a||!l||!n?null:{season:a,episode:l,idEpisode:n}}catch{return null}}function Yu(t){let e=typeof t=="string"?t.match(/-(\d{4})$/):null;return e?e[1]:""}function M0(t){try{let a=new URL(t,location.origin).pathname.match(/\/movies\/view\/([^/?#]+)/i);return a?a[1]:""}catch{return""}}function Di(t){if(!t)return null;let e=t.querySelector('a[href*="/shows/view/"]');if(!e)return null;let a=_0(e.getAttribute("href"));if(!a)return null;let l=t.querySelector(".mv-item-infor h6"),n=t.querySelector("img[data-src], img[src]"),i=a2(e.getAttribute("href"));return{slug:a,title:l?l.textContent.trim():a,year:Yu(a),poster:la(n),href:new URL(e.getAttribute("href"),location.origin).href,episode:i}}function s0(t,e){return t?e?`/shows/view/${t}?season=${e.season}&episode=${e.episode}&id_episode=${e.idEpisode}`:`/shows/view/${t}`:"/shows"}function rl(t,e){return t?e?`/shows/play/${t}#S${e.season}-E${e.episode}-${e.idEpisode}`:`/shows/view/${t}`:"/shows"}function Bu(t){return t?`/movies/view/${t}`:"/movies"}function Li(){return location.pathname==="/shows"}function z0(){return location.pathname.startsWith("/shows/view/")}function sf(){return location.pathname.startsWith("/movies/play/")}function N0(){return location.pathname.startsWith("/movies/view/")}function l2(){if(!z0())return null;let t=window.show_storage||{},e=typeof t.slug=="string"&&t.slug?t.slug:_0(location.href);if(!e)return null;let a=document.querySelector(".movie-single-ct h1")||document.querySelector(".movie-single-ct h2")||document.querySelector(".internal-page-container h1")||document.querySelector(".internal-page-container h2"),l=document.querySelector('.movie__poster[style*="background-image"]')||document.querySelector(".movie__poster[data-background-image]")||document.querySelector(".movie-single-ct img[data-src], .movie-single-ct img[src]")||document.querySelector(".internal-page-container img[data-src], .internal-page-container img[src]"),n=document.querySelector('meta[property="og:image"]'),i=new URLSearchParams(location.search),o=zt({season:i.get("season"),episode:i.get("episode"),idEpisode:i.get("id_episode")});return{slug:e,title:typeof t.title=="string"&&t.title.trim()?t.title.trim():a?a.textContent.replace(/\s*\d{4}\s*$/,"").trim():e,year:typeof t.year=="string"||typeof t.year=="number"?String(t.year):Yu(e),poster:typeof t.poster_medium=="string"&&t.poster_medium?t.poster_medium:la(l)||n?.getAttribute("content")||"",idShow:et(t.id_show),episode:o}}function n2(t){if(!t)return null;let e=t.querySelector('a[href*="/movies/view/"]');if(!e)return null;let a=M0(e.getAttribute("href"));if(!a)return null;let l=t.querySelector(".slide-item__title, .mv-item-infor h6, h6, h5, .title"),n=t.querySelector("img[data-src-portrait], img[data-src], img[src]"),i=t.querySelector('[data-background-image], [style*="background-image"], [data-src-portrait], [data-src]'),o=t.querySelector(".year"),u=l?l.textContent.trim():"",r=u.match(/\((\d{4})\)/),p=la(n)||la(i);return{slug:a,title:u?u.replace(/\s*\(\d{4}\)\s*$/,"").trim():a,year:o?o.textContent.trim():r?.[1]||Yu(a),poster:p,href:new URL(e.getAttribute("href"),location.origin).href}}function i2(){if(!N0())return null;let t=M0(location.href);if(!t)return null;let e=window.movie_storage||window.movie||{},a=document.querySelector(".movie-single-ct h1")||document.querySelector(".movie-single-ct h2")||document.querySelector(".internal-page-container h1")||document.querySelector(".internal-page-container h2"),l=document.querySelector('.movie__poster[data-background-image], .movie__poster[style*="background-image"], .movie-single-ct img[data-src], .movie-single-ct img[src], .internal-page-container img[data-src], .internal-page-container img[src]'),n=document.querySelector('meta[property="og:image"]');return{slug:t,title:typeof e.title=="string"&&e.title.trim()?e.title.trim():a?a.textContent.trim():t,year:typeof e.year=="string"||typeof e.year=="number"?String(e.year):Yu(t),poster:at(typeof e.movie_poster=="string"&&e.movie_poster?e.movie_poster:typeof e.poster_medium=="string"&&e.poster_medium?e.poster_medium:"")||la(l)||at(n?.getAttribute("content")||""),href:location.href}}function wf(t){let e=t.dataset.watchlistSlug||"",a=Ce(e),l=zt({season:t.dataset.season,episode:t.dataset.episode,idEpisode:t.dataset.idEpisode}),n="add",i="+ Watch",o="Add this show to your watchlist";if(a){let u=l&&(!a.lastWatched||Oe(l,a.lastWatched)>0);n=u?"watching-new":"watching",i="Watching",o=u?"This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.":"This show is already in your watchlist. Click to remove it."}t.dataset.state!==n&&(t.dataset.state=n),t.textContent!==i&&(t.textContent=i),t.title!==o&&(t.title=o),t.disabled&&(t.disabled=!1)}function La(){document.querySelectorAll(`.${c}-episode-watch-button`).forEach(wf)}function xf(t){let e=t.dataset.watchlistSlug||"",a=Ce(e),l=zt({season:t.dataset.season,episode:t.dataset.episode,idEpisode:t.dataset.idEpisode});if(!a){t.dataset.state="add",t.textContent="+ Add To Watchlist",t.title="Add this show to your watchlist",t.disabled=!1;return}let n=l&&(!a.lastWatched||Oe(l,a.lastWatched)>0);t.dataset.state=n?"watching-new":"watching",t.textContent=n?"Watching: New Episode":"Watching",t.title=n?"This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.":"This show is already in your watchlist. Click to remove it.",t.disabled=!1}function Bi(){document.querySelectorAll(`.${c}-show-view-watch-button`).forEach(xf)}function Ef(t){let e=t.dataset.watchlistSlug||"",a=ea(e);if(!a){t.dataset.state="add",t.textContent="+ Movie",t.title="Add this movie to your watchlist",t.disabled=!1;return}t.dataset.state=a.watched?"watching":"watching-new",t.textContent=a.watched?"Watched":"Movie List",t.title=a.watched?"This movie is marked watched. Click to remove it from your movie watchlist.":"This movie is in your movie watchlist. Click to remove it.",t.disabled=!1}function cl(){document.querySelectorAll(`.${c}-movie-watch-button`).forEach(Ef)}function Tf(t){let e=t.dataset.watchlistSlug||"",a=ea(e);if(!a){t.dataset.state="add",t.textContent="+ Add Movie To Watchlist",t.title="Add this movie to your watchlist",t.disabled=!1;return}t.dataset.state=a.watched?"watching":"watching-new",t.textContent=a.watched?"Movie Watched":"In Movie Watchlist",t.title=a.watched?"This movie is marked watched. Click to remove it from your movie watchlist.":"This movie is in your movie watchlist. Click to remove it.",t.disabled=!1}function Ui(){document.querySelectorAll(`.${c}-movie-view-watch-button`).forEach(Tf)}function C0(t,e="auto"){return!t||!t.slug||!t.episode?null:{slug:t.slug,title:t.title||t.slug,href:t.href||"",episode:t.episode,seenAt:Date.now(),source:e}}function O0(t,e){return!!t&&!!e&&t.slug===e.slug&&sc(t.episode,e.episode)}function Af(t){return Array.from(document.querySelectorAll(".episode-item")).indexOf(t)}function _f(){if(!document.body||!Li())return;document.querySelectorAll(`.episode-item.${c}-shows-list-marker`).forEach(e=>{e.classList.remove(`${c}-shows-list-marker`),e.removeAttribute("data-lookmovie-list-marker")}),d.showsListProgressOrder=-1;let t=d.showsListProgress;t&&document.querySelectorAll(".episode-item").forEach(e=>{let a=Di(e);O0(a,t)&&(e.classList.add(`${c}-shows-list-marker`),e.dataset.lookmovieListMarker="true",d.showsListProgressOrder=Af(e))})}function $0(t){let e=Di(t.closest(".episode-item")),a=O0(e,d.showsListProgress),l=a?"current":"set",n=a?"Bookmarked":"Set bookmark",i=a?"This is the current shows-page bookmark.":"Set the yellow shows-page bookmark here.";t.dataset.state!==l&&(t.dataset.state=l),t.textContent!==n&&(t.textContent=n),t.title!==i&&(t.title=i)}function o2(){document.querySelectorAll(`.${c}-shows-list-marker-button`).forEach($0)}function u2(t){let e=C0(Di(t),"manual");e&&(d.showsListProgress=e,d.showsListProgressOrder=Af(t),d.showsListSeenCandidate=null,d.showsListSeenCandidateOrder=-1,d.showsListManualMarkerSet=!0,pc(e),_f(),o2())}function c2(){if(d.showsListManualMarkerSet||d.showsListProgress?.source==="manual")return;let t=Ki(d.showsListSeenCandidate);t&&(d.showsListProgress&&!d.showsListSessionTouched&&(d.showsListProgressOrder<0||d.showsListSeenCandidateOrder<d.showsListProgressOrder)||(d.showsListProgress=t,pc(t),_f()))}function ju(t){t&&t.persist&&c2(),d.showsListObserver&&d.showsListObserver.disconnect(),d.showsListMutationObserver&&d.showsListMutationObserver.disconnect(),d.showsListObserver=null,d.showsListMutationObserver=null,d.showsListRefreshScheduled=!1,d.showsListObservedCards=new WeakSet,d.showsListSeenCandidate=null,d.showsListSeenCandidateOrder=-1,d.showsListSessionTouched=!1,d.showsListManualMarkerSet=!1}function r2(t){let e=Di(t),a=C0(e);if(!a)return;let l=Af(t);l<d.showsListSeenCandidateOrder||(d.showsListSeenCandidate=a,d.showsListSeenCandidateOrder=l)}function R0(){!document.body||!Li()||!d.showsListObserver||(_f(),document.querySelectorAll(".episode-item").forEach(t=>{d.showsListObservedCards.has(t)||(d.showsListObservedCards.add(t),d.showsListObserver.observe(t))}))}function s2(){d.showsListRefreshScheduled||(d.showsListRefreshScheduled=!0,window.setTimeout(()=>{d.showsListRefreshScheduled=!1,R0()},150))}function Vu(){!document.body||!Li()||typeof IntersectionObserver!="function"||(d.showsListObserver||(d.showsListObserver=new IntersectionObserver(t=>{t.filter(e=>e.isIntersecting).forEach(e=>r2(e.target))},{threshold:.55})),d.showsListMutationObserver||(d.showsListMutationObserver=new MutationObserver(()=>{s2()}),d.showsListMutationObserver.observe(document.body,{childList:!0,subtree:!0})),R0())}function U0(){Li()&&(d.showsListSessionTouched=!0)}function Mf(){!document.body||!Li()||document.querySelectorAll(".episode-item").forEach(t=>{let e=Di(t);if(!e)return;let a=t.querySelector(`.${c}-episode-watch-button`);a||(a=document.createElement("button"),a.type="button",a.className=`${c}-episode-watch-button`,t.appendChild(a),a.addEventListener("click",async n=>{n.preventDefault(),n.stopPropagation();let i=a.dataset.watchlistSlug;if(i){if(Ce(i)){$i(i);return}a.dataset.state="adding",a.textContent="Adding...",a.disabled=!0,await Oi({slug:i,title:a.dataset.title||i,year:a.dataset.year||"",poster:a.dataset.poster||"",episode:zt({season:a.dataset.season,episode:a.dataset.episode,idEpisode:a.dataset.idEpisode})}),wf(a)}})),a.dataset.watchlistSlug=e.slug,a.dataset.title=e.title,a.dataset.year=e.year,a.dataset.poster=e.poster,e.episode&&(a.dataset.season=String(e.episode.season),a.dataset.episode=String(e.episode.episode),a.dataset.idEpisode=String(e.episode.idEpisode)),wf(a);let l=t.querySelector(`.${c}-shows-list-marker-button`);l||(l=document.createElement("button"),l.type="button",l.className=`${c}-shows-list-marker-button`,t.appendChild(l),l.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),u2(t)})),$0(l)})}function zf(){if(!document.body||!z0())return;let t=l2();if(!t)return;let e=document.querySelector(".watch-heading")||document.querySelector(".movie-single-ct.main-content")||document.querySelector(".internal-page-container");if(!e)return;let a=document.querySelector(`.${c}-show-view-watch-wrap`);a||(a=document.createElement("div"),a.className=`${c}-show-view-watch-wrap`,e.appendChild(a));let l=a.querySelector(`.${c}-show-view-watch-button`);l||(l=document.createElement("button"),l.type="button",l.className=`${c}-show-view-watch-button`,a.appendChild(l),l.addEventListener("click",async()=>{let n=l.dataset.watchlistSlug;if(n){if(Ce(n)){$i(n);return}l.dataset.state="adding",l.textContent="Adding...",l.disabled=!0,await Oi({slug:n,title:l.dataset.title||n,year:l.dataset.year||"",poster:l.dataset.poster||"",episode:zt({season:l.dataset.season,episode:l.dataset.episode,idEpisode:l.dataset.idEpisode})}),xf(l)}})),l.dataset.watchlistSlug=t.slug,l.dataset.title=t.title,l.dataset.year=t.year,l.dataset.poster=t.poster,t.episode?(l.dataset.season=String(t.episode.season),l.dataset.episode=String(t.episode.episode),l.dataset.idEpisode=String(t.episode.idEpisode)):(delete l.dataset.season,delete l.dataset.episode,delete l.dataset.idEpisode),xf(l)}function Ei(){!document.body||sf()||document.querySelectorAll('a[href*="/movies/view/"]').forEach(t=>{let e=t.closest(".slide-item")||t.closest(".movie-item")||t.closest(".mv-item")||t.closest(".movie-item-style-2")||t.closest(".slide-item__backdrop--wrapper")||t.closest(".item")||t.parentElement,a=n2(e);if(!a||!e)return;let l=e.querySelector(".slide-item__buttons")||e.querySelector(".image__placeholder")||e,n=l.querySelector(`.${c}-movie-watch-button`);n||(n=document.createElement("button"),n.type="button",n.className=`${c}-movie-watch-button ${c}-episode-watch-button`,l.appendChild(n),getComputedStyle(l).position==="static"&&(l.style.position="relative"),n.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation();let o=n.dataset.watchlistSlug;if(o){if(ea(o)){zi(o);return}Ci({slug:o,title:n.dataset.title||o,year:n.dataset.year||"",poster:n.dataset.poster||"",href:n.dataset.href||Bu(o)}),Ef(n)}})),n.dataset.watchlistSlug=a.slug,n.dataset.title=a.title,n.dataset.year=a.year,n.dataset.poster=a.poster,n.dataset.href=a.href,Ef(n)})}function Nf(){if(!document.body||!N0())return;let t=i2();if(!t)return;let e=document.querySelector(".watch-heading")||document.querySelector(".movie-single-ct.main-content")||document.querySelector(".internal-page-container");if(!e)return;let a=document.querySelector(`.${c}-movie-view-watch-wrap`);a||(a=document.createElement("div"),a.className=`${c}-show-view-watch-wrap ${c}-movie-view-watch-wrap`,e.appendChild(a));let l=a.querySelector(`.${c}-movie-view-watch-button`);l||(l=document.createElement("button"),l.type="button",l.className=`${c}-show-view-watch-button ${c}-movie-view-watch-button`,a.appendChild(l),l.addEventListener("click",()=>{let n=l.dataset.watchlistSlug;if(n){if(ea(n)){zi(n);return}Ci({slug:n,title:l.dataset.title||n,year:l.dataset.year||"",poster:l.dataset.poster||"",href:l.dataset.href||Bu(n)}),Tf(l)}})),l.dataset.watchlistSlug=t.slug,l.dataset.title=t.title,l.dataset.year=t.year,l.dataset.poster=t.poster,l.dataset.href=t.href,Tf(l)}function Hu(){return Object.values(d.watchlistStore.shows)}function Ce(t){return t&&d.watchlistStore.shows[t]||null}function f2(t){return t&&Hu().find(e=>e.idShow===t)||null}function y0(t){return[...t].sort((e,a)=>{let l=e.latestEpisode?$e(e)?1:0:2,n=a.latestEpisode?$e(a)?1:0:2;return l!==n?l-n:e.title.localeCompare(a.title)})}function d2(t,e){return t?!t.idShow||!t.latestEpisode||!t.upcoming?!0:!t.lastSyncedAt||e-t.lastSyncedAt>=Zf:!1}function sl(){dd(d.watchlistStore),Rt(),Ra(),La(),Bi()}function Pt(t,e){d.watchlistMessage=t||"",d.watchlistMessageTone=e||"muted",Rt()}async function D0(t,e){let a=await Xi(`/shows/view/${t}`),l=a.match(/id_show:\s*(\d+)/),n=a.match(/title:\s*'((?:\\'|[^'])*)'/),i=a.match(/year:\s*'((?:\\'|[^'])*)'/),o=a.match(/poster_medium:\s*'((?:\\'|[^'])*)'/);return{slug:t,idShow:l?et(l[1]):0,title:n?xe(n[1]).trim():e&&e.title?e.title:t,year:i?xe(i[1]).trim():e&&e.year?e.year:"",poster:o?xe(o[1]).trim():e&&e.poster?e.poster:""}}async function L0(t){let e=await Zi(`/api/v2/download/episode/list?id=${t}`),a=[];Object.entries(e&&e.list||{}).forEach(([i,o])=>{Object.entries(o||{}).forEach(([u,r])=>{let p=zt({season:i,episode:u,idEpisode:r&&r.id_episode});p&&a.push(p)})}),a.sort(Oe);let l=e&&e.latest?e.latest:null,n=zt({season:l&&l.season,episode:l&&l.episode,idEpisode:l&&l.id_episode});return n&&(n.updatedAt=Date.now()),{latestEpisode:n,episodes:a}}function p2(t,e){let a=e?t.findIndex(n=>Oe(n,e)>0):0,l=a<0?[]:t.slice(a);return{afterIdEpisode:e?e.idEpisode:0,total:l.length,episodes:l.slice(0,Ff).map(({season:n,episode:i,idEpisode:o})=>({season:n,episode:i,idEpisode:o}))}}function yf(t){let e=t&&t.upcoming;if(!e)return null;let a=t.lastWatched?t.lastWatched.idEpisode:0;if(e.afterIdEpisode===a)return e;if(!t.lastWatched)return null;let l=e.episodes.findIndex(n=>Oe(n,t.lastWatched)>0);return l<0?e.episodes.length===e.total?{afterIdEpisode:a,total:0,episodes:[]}:null:l===0?null:{afterIdEpisode:a,total:e.total-l,episodes:e.episodes.slice(l)}}function B0(t){t.upcoming&&!yf(t)&&ta({force:!0,slugs:[t.slug]})}async function Oi(t){if(!t||!t.slug)return;let e=Ce(t.slug);if(e){Pt(`${e.title} is already in your watchlist.`,"muted"),La();return}Pt(`Adding ${t.title||t.slug}...`,"muted");let a={slug:t.slug,idShow:0,title:t.title||t.slug,year:t.year||"",poster:t.poster||""};try{a=await D0(t.slug,t)}catch(l){console.warn(`[${c}] Failed to resolve show metadata for ${t.slug}.`,l)}d.watchlistStore.shows[t.slug]=hn(t.slug,{slug:t.slug,idShow:a.idShow,title:a.title||t.title||t.slug,year:a.year||t.year||"",poster:a.poster||t.poster||"",addedAt:Date.now(),latestEpisode:t.episode||null,lastSyncedAt:0}),sl(),Pt(`${a.title||t.title||t.slug} added to your watchlist.`,"success"),await ta({force:!0,slugs:[t.slug]})}function $i(t){let e=Ce(t);e&&(delete d.watchlistStore.shows[t],sl(),Pt(`${e.title} removed from your watchlist.`,"muted"))}function f0(t){let e=Ce(t);!e||!e.latestEpisode||($e(e)?(e.lastWatched=null,Pt(`${e.title} marked as having an unwatched latest episode.`,"muted")):(e.lastWatched={...e.latestEpisode,watchedAt:Date.now()},Pt(`${e.title} marked watched through ${Ut(e.latestEpisode)}.`,"success")),sl(),B0(e))}async function ta(t){let e=!!(t&&t.force),a=t&&Array.isArray(t.slugs)?new Set(t.slugs):null;if(d.watchlistRefreshPromise)return d.watchlistRefreshPromise;let l=Date.now(),n=Hu().filter(i=>a&&!a.has(i.slug)?!1:e||d2(i,l));return n.length?(d.watchlistBusy=!0,Pt(`Refreshing ${n.length} watchlist ${n.length===1?"show":"shows"}...`,"muted"),d.watchlistRefreshPromise=(async()=>{for(let i of n)try{if(!i.idShow){let r=await D0(i.slug,i);i.idShow=r.idShow,i.title=r.title||i.title,i.year=r.year||i.year,i.poster=r.poster||i.poster}if(!i.idShow)throw new Error("Unable to resolve show id.");let{latestEpisode:o,episodes:u}=await L0(i.idShow);i.latestEpisode=o,i.upcoming=p2(u,i.lastWatched),i.lastSyncError="",i.lastSyncedAt=Date.now()}catch(o){i.lastSyncError=o instanceof Error?o.message:String(o),i.lastSyncedAt=Date.now(),console.warn(`[${c}] Failed to refresh ${i.slug}.`,o)}sl(),Pt("Watchlist refreshed.","success")})().catch(i=>{console.warn(`[${c}] Watchlist refresh failed.`,i),Pt("Watchlist refresh failed.","danger")}).finally(()=>{d.watchlistBusy=!1,Rt(),La(),d.watchlistRefreshPromise=null}),d.watchlistRefreshPromise):(Rt(),La(),Promise.resolve())}function q0(){let t=et(window.id_show);if(t)return t;let e=Array.from(document.scripts).find(l=>/id_show:\s*\d+/.test(l.textContent||"")),a=e?e.textContent.match(/id_show:\s*(\d+)/):null;return a?et(a[1]):0}function m2(){if(!location.pathname.startsWith("/shows/play/"))return null;let t=location.hash.match(/^#S(\d+)-E(\d+)-(\d+)$/i);if(!t)return null;let e=q0(),a=et(t[1]),l=et(t[2]),n=et(t[3]);return!e||!a||!l||!n?null:{idShow:e,season:a,episode:l,idEpisode:n}}function H0(){let t=m2();if(!t)return;let e=`${t.idShow}:${t.idEpisode}`;if(e===d.lastTrackedEpisodeSignature)return;let a=f2(t.idShow);a&&(a.lastWatched={season:t.season,episode:t.episode,idEpisode:t.idEpisode,watchedAt:Date.now()},(!a.latestEpisode||Oe(a.lastWatched,a.latestEpisode)>0)&&(a.latestEpisode={season:t.season,episode:t.episode,idEpisode:t.idEpisode,updatedAt:Date.now()}),d.lastTrackedEpisodeSignature=e,sl(),B0(a),Pt(`${a.title} updated to watched through ${Ut(a.lastWatched)}.`,"success"))}function h2(){let t=location.hash.match(/^#S(\d+)-E(\d+)-(\d+)$/i);return t?{season:Number(t[1]),episode:Number(t[2]),idEpisode:Number(t[3])}:null}async function ku(){let t=q0(),e=h2();if(!t||!e)return null;let{episodes:a}=await L0(t);return a.find(l=>Oe(l,e)>0)||null}var Gu=`${c}-autonext`,Cf=0,pn=null;function mn(){window.clearInterval(Cf),Cf=0,pn&&(pn.remove(),pn=null)}function Y0(t){mn(),ul(t)}function g2(t){let e=document.createElement("div");e.className=Gu,e.setAttribute("role","status");let a=document.createElement("p");a.append("Up next: ");let l=document.createElement("strong");l.textContent=Ut(t),a.append(l," in ");let n=document.createElement("span");n.className=`${Gu}-seconds`,a.append(n,"s");let i=document.createElement("button");i.type="button",i.className=`${Gu}-play`,i.textContent="Play now",i.addEventListener("click",u=>{u.stopPropagation(),Y0(t)});let o=document.createElement("button");return o.type="button",o.textContent="Cancel",o.addEventListener("click",u=>{u.stopPropagation(),mn()}),e.append(a,i,o),e}async function Qu(t){if(!!!(t&&t.force)&&!d.settings.autoNextEpisode||!location.pathname.startsWith("/shows/play/"))return!1;let a=location.hash,l=null;try{l=await ku()}catch(u){console.warn(`[${c}] Could not look up the next episode.`,u)}let n=document.getElementById("video_player");if(!l||!n||location.hash!==a)return!1;mn(),pn=g2(l),n.appendChild(pn);let i=If,o=pn.querySelector(`.${Gu}-seconds`);return o.textContent=String(i),Cf=window.setInterval(()=>{i-=1,location.hash!==a?mn():i<=0?Y0(l):o.textContent=String(i)},1e3),!0}var qi=`${c}-intro`,y2=1,j0=5,Of=null,Ba=null,Rf="",$f="",ve=null,V0=0;function Xu(){return Of||(Of=Sd()),Of}function Ku(){let t=location.pathname.match(/^\/shows\/play\/(?:\d+-)?([^/?#]+)/i);return t?t[1].toLowerCase():""}function Ju(){let t=Ku();return t&&Xu()[t]||null}function Yi(){let t=Ju();return t&&Number.isFinite(t.start)?t:null}function Zu(t){let e=Ku(),a={...Ju()||{},...t,updatedAt:Date.now()};Object.keys(a).forEach(l=>a[l]===void 0&&delete a[l]),Number.isFinite(a.start)||Number.isFinite(a.creditsFromEnd)?Xu()[e]=a:delete Xu()[e],wd(Xu())}function fl(t){let e=Math.max(0,Math.round(t));return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function Hi(){return document.querySelector("#video_player video")}function Uf(t,e){return t&&e>=t.start&&e<t.end-y2}function be(t){if(!Q0())return;let e=ve.querySelector(`.${qi}-toast`);e.textContent=t,e.hidden=!1,window.clearTimeout(V0),V0=window.setTimeout(()=>{e.hidden=!0},2500)}function Wu(){let t=Hi(),e=Yi();return!t||!Uf(e,t.currentTime)?!1:(Rf=location.hash,t.currentTime=e.end,be("Skipped intro"),!0)}function dl(t,e,a){let l=document.createElement("button");return l.type="button",l.className=e,l.textContent=t,l.addEventListener("click",n=>{n.stopPropagation(),a()}),l}function v2(t,e){let a=document.createElement("div");a.className=`${c}-player-menu-row`;let l=document.createElement("span");l.textContent="Intro",a.append(l);let n=Yi();if(Ba!==null)a.append(dl(`Mark end (from ${fl(Ba)})`,t,()=>{let i=Hi(),o=i?i.currentTime:0;if(o-Ba<j0){be(`Play past the intro first (at least ${j0}s).`);return}Zu({start:Ba,end:o}),Ba=null,Rf=location.hash,be(`Intro saved: ${fl(Yi().start)}\u2013${fl(o)}`),e()}),dl("Cancel",t,()=>{Ba=null,e()}));else if(n){let i=document.createElement("em");i.textContent=`${fl(n.start)}\u2013${fl(n.end)}`,a.append(i,dl("Clear",t,()=>{Zu({start:void 0,end:void 0}),G0(Hi()),be("Intro cleared for this show."),e()}))}else a.append(dl("Mark start here",t,()=>{let i=Hi();Ba=i?i.currentTime:0,be("Now play to the end of the intro and mark it."),e()}));return a}function b2(t,e){let a=document.createElement("div");a.className=`${c}-player-menu-row`;let l=document.createElement("span");l.textContent="Credits",a.append(l);let n=Ju();if(n&&Number.isFinite(n.creditsFromEnd)){let i=document.createElement("em");i.textContent=`last ${fl(n.creditsFromEnd)}`,a.append(i,dl("Clear",t,()=>{Zu({creditsFromEnd:void 0}),be("Credits cleared for this show."),e()}))}else a.append(dl("Mark credits start here",t,()=>{let i=Hi();if(!i||!Number.isFinite(i.duration))return;let o=i.duration-i.currentTime;Zu({creditsFromEnd:o}),$f=location.hash,be(`Credits saved: last ${fl(o)} of each episode.`),e()}));return a}function k0(t,e){if(!Ku())return null;let a=document.createElement("div");a.className=`${c}-player-menu-section`;let l=document.createElement("p");return l.className=`${c}-player-menu-heading`,l.textContent="This show",a.append(l,v2(t,e),b2(t,e)),a}function G0(t){if(!ve)return;let e=ve.querySelector(`.${qi}-skip`);e.hidden=!(!d.settings.autoSkipIntro&&Uf(Yi(),t?t.currentTime:-1))}function Q0(){let t=document.getElementById("video_player");if(!t)return null;if(ve&&ve.parentElement===t)return ve;ve=document.createElement("div"),ve.className=qi;let e=dl("Skip intro",`${qi}-skip`,Wu);e.hidden=!0;let a=document.createElement("p");return a.className=`${qi}-toast`,a.hidden=!0,ve.append(e,a),t.appendChild(ve),ve}function X0(t){if(!Ku()||!Q0())return;let e=Ju(),a=t.currentTime;d.settings.autoSkipIntro&&Rf!==location.hash&&Ba===null&&Uf(Yi(),a)&&Wu(),e&&Number.isFinite(e.creditsFromEnd)&&d.settings.autoSkipCredits&&$f!==location.hash&&Number.isFinite(t.duration)&&!t.paused&&t.duration-a<=e.creditsFromEnd&&($f=location.hash,Qu({force:!0})),G0(t)}var Df=`${c}-player-menu`,S2=`${c}-player-menu-button`,Z0="#video_player .vjs-settings-quality-menu",w2=[{key:"autoPlay",label:"Auto play"},{key:"autoNextEpisode",label:"Auto next episode",showsOnly:!0},{key:"autoSkipIntro",label:"Auto skip intros",showsOnly:!0},{key:"autoSkipCredits",label:"Skip credits to next episode",showsOnly:!0},{key:"autoFullscreen",label:"Auto fullscreen"},{key:"windowedFullscreen",label:"Windowed fullscreen"}];function x2(){return location.pathname.startsWith("/shows/play/")}function K0(){return document.querySelector("#video_player video")}function Fu(t=K0()){t&&t.playbackRate!==d.settings.playbackRate&&(t.playbackRate=d.settings.playbackRate)}function J0(t){$a({...d.settings,playbackRate:t}),Fu(),be(`Speed ${t}\xD7`),ji()}function Lf(t){let e=qa.indexOf(d.settings.playbackRate),a=qa[Math.max(0,Math.min(qa.length-1,e+t))];a!==d.settings.playbackRate&&J0(a)}async function Bf(){let t=K0();if(!t||!document.pictureInPictureEnabled)return!1;try{return document.pictureInPictureElement?await document.exitPictureInPicture():await t.requestPictureInPicture(),!0}catch(e){return console.warn(`[${c}] Picture-in-picture failed.`,e),!1}}function W0(t){let e=document.createElement("div");e.className=`${c}-player-menu-section`;let a=document.createElement("p");return a.className=`${c}-player-menu-heading`,a.textContent=t,e.append(a),e}function E2(){let t=W0("Speed"),e=document.createElement("div");return e.className=`${c}-player-menu-chips`,qa.forEach(a=>{let l=document.createElement("button");l.type="button",l.textContent=`${a}\xD7`,l.dataset.active=a===d.settings.playbackRate?"true":"false",l.addEventListener("click",()=>J0(a)),e.append(l)}),t.append(e),t}function T2(){let t=W0("Enhancer");if(w2.filter(e=>!e.showsOnly||x2()).forEach(e=>{let a=document.createElement("button");a.type="button",a.className=`${c}-player-menu-toggle`,a.setAttribute("role","menuitemcheckbox"),a.setAttribute("aria-checked",d.settings[e.key]?"true":"false"),a.textContent=e.label,a.addEventListener("click",()=>{$a({...d.settings,[e.key]:!d.settings[e.key]}),ji()}),t.append(a)}),document.pictureInPictureEnabled){let e=document.createElement("button");e.type="button",e.className=`${c}-player-menu-toggle`,e.textContent="Picture-in-picture",e.addEventListener("click",Bf),t.append(e)}return t}function ji(){let t=document.querySelector(`${Z0} .${Df}`);if(!t)return;t.replaceChildren(E2(),T2());let e=k0(S2,ji);e&&t.append(e)}function qf(){let t=document.querySelector(Z0),e=t&&t.querySelector(".vjs-settings-body");if(!e||e.querySelector(`.${Df}`))return;let a=e.querySelector(".vjs-menu");if(a&&!e.querySelector(`.${c}-quality-heading`)){let i=document.createElement("p");i.className=`${c}-player-menu-heading ${c}-quality-heading`,i.textContent="Quality",e.insertBefore(i,a)}let l=document.createElement("div");l.className=Df,l.addEventListener("click",i=>i.stopPropagation()),e.append(l),ji();let n=t.parentElement&&t.parentElement.querySelector("button");n&&n.addEventListener("click",ji)}function ge(){let t=document.getElementById("video_player"),e=t?Array.from(t.querySelectorAll("video")):[],a=[...new Set([...e,...Array.from(document.querySelectorAll("video"))])].filter(l=>{let n=l.getBoundingClientRect();return n.width>0&&n.height>0});return a.find(l=>!l.paused&&!l.ended)||a.find(l=>l.readyState>0)||a[0]||null}function My(){let t=ge();return t?(t.play(),!0):!1}function zy(){let t=ge();return t?(t.pause(),!0):!1}function Ny(){let t=ge();return t?(t.paused?t.play():t.pause(),!0):!1}function Cy(t){let e=ge();if(!e||!Number.isFinite(t))return!1;let a=Number.isFinite(e.duration)?e.duration:Number.MAX_SAFE_INTEGER;return e.currentTime=Math.max(0,Math.min(a,e.currentTime+t)),!0}function Oy(t){let e=ge();return!e||!Number.isFinite(t)?!1:(e.volume=Math.max(0,Math.min(1,t/100)),e.muted=!1,!0)}function uf(t){let e=ge();return e?(e.muted=!!t,!0):!1}function $y(){let t=document.getElementById("video_player"),e=t?.querySelector(".vjs-fullscreen-control"),a=!!document.getElementById(pl),l=!!document.fullscreenElement,n=!!t?.classList.contains("vjs-fullscreen");return a||l||n?(a&&rn(),l&&typeof document.exitFullscreen=="function"&&document.exitFullscreen(),n&&e&&e.click(),d.fullscreenTriggered=!1,!0):I0()}function I0(){let t=document.getElementById("video_player");if(document.getElementById(pl)||document.fullscreenElement||t?.classList.contains("vjs-fullscreen"))return!0;if(!t)return!1;let e=t.querySelector(".vjs-fullscreen-control");if(e&&e.click(),d.settings.windowedFullscreen)M2();else if(!e)return!1;return d.fullscreenTriggered=!0,!0}function F0(t){history.replaceState(null,"",`#S${t.season}-E${t.episode}-${t.idEpisode}`),window.dispatchEvent(new Event("ChangedEpisodeHash"))}function ul(t){return location.pathname.startsWith("/shows/play/")?t?(F0(t),!0):(ku().then(e=>{e?F0(e):be("This is the last episode.")}).catch(e=>console.warn(`[${c}] Could not find the next episode.`,e)),!0):!1}function A2(){if(!d.settings.autoPlay)return!1;let t=document.getElementById("progress-continue-button"),e=document.getElementById("progress-from-beginning-button"),a=Number.parseFloat(document.getElementById("progress-bar")?.style.width),l=Number.isFinite(a)&&a>=Qi?e||t:t||e;return l?(console.log(`[${c}] Dismissing playback modal (${l.id}).`),l.click(),!0):!1}function _2(){let t=document.getElementById("video_player");if(!t)return!1;let e=document.getElementById(we);if(e||(e=document.createElement("button"),e.id=we,e.type="button",e.textContent="Exit",e.setAttribute("aria-label","Exit windowed fullscreen"),e.title="Exit windowed fullscreen",e.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation(),rn(),d.fullscreenTriggered=!1})),e.parentElement!==t&&t.appendChild(e),!t._lookmovieFullscreenExitActivityAttached){let a=()=>{window.clearTimeout(t._lookmovieFullscreenExitActivityTimer),t.classList.add(`${c}-fullscreen-exit-active`),t._lookmovieFullscreenExitActivityTimer=window.setTimeout(()=>{t.classList.remove(`${c}-fullscreen-exit-active`)},1600)};t._lookmovieFullscreenExitActivityAttached=!0,t.addEventListener("pointermove",a)}return!0}function M2(){if(!document.head)return!1;if(!document.getElementById(pl)){let t=document.createElement("style");t.id=pl,t.textContent=`
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

            #${we} {
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

            #video_player.${c}-fullscreen-exit-active #${we},
            #${we}:hover,
            #${we}:focus-visible {
                opacity: 1 !important;
                pointer-events: auto !important;
                transform: translateY(0) !important;
            }

            #${we}:hover,
            #${we}:focus-visible {
                border-color: rgba(125, 211, 252, 0.78) !important;
            }
        `,document.head.appendChild(t)}return _2(),document.body&&document.body.classList.add(`${c}-fullscreen`),!0}function rn(){let t=document.getElementById(pl);t&&t.remove();let e=document.getElementById("video_player");e&&(window.clearTimeout(e._lookmovieFullscreenExitActivityTimer),e.classList.remove(`${c}-fullscreen-exit-active`));let a=document.getElementById(we);a&&a.remove(),document.body&&document.body.classList.remove(`${c}-fullscreen`)}function z2(){return!d.settings.autoFullscreen||d.fullscreenTriggered?!1:(console.log(`[${c}] Applying fullscreen behavior.`),I0())}function N2(){mn(),H0(),xi("play"),!(!d.settings.autoPlay&&!d.settings.autoFullscreen)&&window.setTimeout(()=>{let t=A2();window.setTimeout(()=>{z2()},t?500:200)},300)}function C2(){xi("pause")}function O2(){xi("ended"),window.setTimeout(()=>{jy()||Qu()},750)}function Hf(t){!t||t._lookmovieEnhancerAttached||(t._lookmovieEnhancerAttached=!0,t.addEventListener("play",N2),t.addEventListener("loadedmetadata",()=>{t.closest("#video_player")&&(qf(),Fu(t))}),t.addEventListener("play",()=>{t.closest("#video_player")&&Fu(t)}),t.addEventListener("pause",C2),t.addEventListener("ended",O2),t.addEventListener("timeupdate",()=>{t.closest("#video_player")&&(qf(),X0(t))}))}function Yf(){document.querySelectorAll("video").forEach(Hf)}function P0(){let t=window.setInterval(()=>{if(!document.body)return;window.clearInterval(t),Yf(),new MutationObserver(a=>{a.forEach(l=>{l.type==="childList"&&l.addedNodes.forEach(n=>{!n||n.nodeType!==Node.ELEMENT_NODE||(n.tagName==="VIDEO"&&Hf(n),typeof n.querySelectorAll=="function"&&n.querySelectorAll("video").forEach(Hf))})})}).observe(document.body,{childList:!0,subtree:!0})},100)}var ev=".player-pre-init-ads",$2=".pre-init-ads--close, .pre-init-ads--back-button";function R2(){window.__lookmovie2EnhancerAdBypass||(window.__lookmovie2EnhancerAdBypass=!0,Object.defineProperty(window,"_preInitAdsTimestamp",{configurable:!0,get:()=>Date.now(),set:()=>{}}))}function U2(t){let e=document.createElement("script");e.textContent=t,(document.head||document.documentElement).appendChild(e),e.remove()}function D2(){if(document.getElementById(uc)||!document.documentElement)return;let t=document.createElement("style");t.id=uc,t.textContent=".ad-container { display: none !important; }",(document.head||document.documentElement).appendChild(t)}function tv(){let t=document.querySelector(ev);if(!t||t.classList.contains("tw-hidden"))return!1;let e=t.querySelector($2);return e?(e.click(),console.info(`[${c}] Skipped ad countdown.`),!0):!1}function av(){try{U2(`(${R2.toString()})();`)}catch(t){console.warn(`[${c}] Failed to install ad timer bypass.`,t)}D2()}function lv(){let t=document.querySelector(ev);t&&(tv(),new MutationObserver(tv).observe(t,{attributes:!0,attributeFilter:["class"]}))}function nv(){return location.pathname.startsWith("/shows/play/")}function L2(t){return!!t&&(t.isContentEditable||/^(input|textarea|select)$/i.test(t.tagName||""))}function B2(t){if(!document.getElementById("video_player")||t.ctrlKey||t.metaKey||t.altKey||L2(t.target))return;let e=!1;switch(t.key){case"n":case"N":e=nv()&&ul();break;case"s":case"S":e=Wu();break;case">":Lf(1),e=!0;break;case"<":Lf(-1),e=!0;break;case"p":case"P":Bf(),e=!0;break;default:break}e&&(t.preventDefault(),t.stopPropagation())}function q2(t){let e=t.target;!(e&&e.closest&&e.closest(".vjs-next-episode-button"))||!nv()||(t.preventDefault(),t.stopImmediatePropagation(),ul())}function iv(){document.addEventListener("keydown",B2,!0),document.addEventListener("click",q2,!0)}function H2(){window.setInterval(()=>{if(location.href===d.lastKnownUrl)return;new URL(d.lastKnownUrl,location.origin).pathname==="/shows"?ju({persist:!0}):ju(),d.lastKnownUrl=location.href,d.fullscreenTriggered=!1,d.lastTrackedEpisodeSignature="",rn(),Yf(),Sf(),Rt(),La(),Mf(),Vu(),Bi(),zf(),cl(),Ei(),Ui(),Nf(),_i(),ta()},Kf)}function jf(){if(d.domBootstrapped)return;d.domBootstrapped=!0,lv(),iv(),P0(),Nu(),H2(),window.addEventListener("scroll",U0,{passive:!0}),window.addEventListener("pagehide",()=>ju({persist:!0}));let t=window.setInterval(()=>{d.uiBootAttempts+=1,Sf(),Mf(),Vu(),zf(),Ei(),Nf(),Ou(),(document.getElementById(S)||d.uiBootAttempts>100)&&window.clearInterval(t)},100);Rt(),Ra(),La(),Vu(),Bi(),cl(),Ui(),_i(),ta()}av();$u();e0();document.readyState==="loading"?document.addEventListener("DOMContentLoaded",jf,{once:!0}):jf();})();
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
