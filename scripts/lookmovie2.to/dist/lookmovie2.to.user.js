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


"use strict";(()=>{var nv=Object.create;var Hf=Object.defineProperty;var iv=Object.getOwnPropertyDescriptor;var ov=Object.getOwnPropertyNames;var uv=Object.getPrototypeOf,cv=Object.prototype.hasOwnProperty;var Se=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var rv=(t,e,a,l)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of ov(e))!cv.call(t,n)&&n!==a&&Hf(t,n,{get:()=>e[n],enumerable:!(l=iv(e,n))||l.enumerable});return t};var Z=(t,e,a)=>(a=t!=null?nv(uv(t)):{},rv(e||!t||!t.__esModule?Hf(a,"default",{value:t,enumerable:!0}):a,t));var zd=Se(P=>{"use strict";function mc(t,e){var a=t.length;t.push(e);t:for(;0<a;){var l=a-1>>>1,n=t[l];if(0<Ji(n,e))t[l]=e,t[a]=n,a=l;else break t}}function Ee(t){return t.length===0?null:t[0]}function Fi(t){if(t.length===0)return null;var e=t[0],a=t.pop();if(a!==e){t[0]=a;t:for(var l=0,n=t.length,i=n>>>1;l<i;){var o=2*(l+1)-1,u=t[o],r=o+1,p=t[r];if(0>Ji(u,a))r<n&&0>Ji(p,u)?(t[l]=p,t[r]=a,l=r):(t[l]=u,t[o]=a,l=o);else if(r<n&&0>Ji(p,a))t[l]=p,t[r]=a,l=r;else break t}}return e}function Ji(t,e){var a=t.sortIndex-e.sortIndex;return a!==0?a:t.id-e.id}P.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(bd=performance,P.unstable_now=function(){return bd.now()}):(fc=Date,Sd=fc.now(),P.unstable_now=function(){return fc.now()-Sd});var bd,fc,Sd,Ue=[],na=[],pv=1,ee=null,_t=3,hc=!1,yn=!1,vn=!1,gc=!1,Ed=typeof setTimeout=="function"?setTimeout:null,Td=typeof clearTimeout=="function"?clearTimeout:null,wd=typeof setImmediate<"u"?setImmediate:null;function Wi(t){for(var e=Ee(na);e!==null;){if(e.callback===null)Fi(na);else if(e.startTime<=t)Fi(na),e.sortIndex=e.expirationTime,mc(Ue,e);else break;e=Ee(na)}}function yc(t){if(vn=!1,Wi(t),!yn)if(Ee(Ue)!==null)yn=!0,hl||(hl=!0,ml());else{var e=Ee(na);e!==null&&vc(yc,e.startTime-t)}}var hl=!1,bn=-1,Ad=5,_d=-1;function Md(){return gc?!0:!(P.unstable_now()-_d<Ad)}function dc(){if(gc=!1,hl){var t=P.unstable_now();_d=t;var e=!0;try{t:{yn=!1,vn&&(vn=!1,Td(bn),bn=-1),hc=!0;var a=_t;try{e:{for(Wi(t),ee=Ee(Ue);ee!==null&&!(ee.expirationTime>t&&Md());){var l=ee.callback;if(typeof l=="function"){ee.callback=null,_t=ee.priorityLevel;var n=l(ee.expirationTime<=t);if(t=P.unstable_now(),typeof n=="function"){ee.callback=n,Wi(t),e=!0;break e}ee===Ee(Ue)&&Fi(Ue),Wi(t)}else Fi(Ue);ee=Ee(Ue)}if(ee!==null)e=!0;else{var i=Ee(na);i!==null&&vc(yc,i.startTime-t),e=!1}}break t}finally{ee=null,_t=a,hc=!1}e=void 0}}finally{e?ml():hl=!1}}}var ml;typeof wd=="function"?ml=function(){wd(dc)}:typeof MessageChannel<"u"?(pc=new MessageChannel,xd=pc.port2,pc.port1.onmessage=dc,ml=function(){xd.postMessage(null)}):ml=function(){Ed(dc,0)};var pc,xd;function vc(t,e){bn=Ed(function(){t(P.unstable_now())},e)}P.unstable_IdlePriority=5;P.unstable_ImmediatePriority=1;P.unstable_LowPriority=4;P.unstable_NormalPriority=3;P.unstable_Profiling=null;P.unstable_UserBlockingPriority=2;P.unstable_cancelCallback=function(t){t.callback=null};P.unstable_forceFrameRate=function(t){0>t||125<t?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Ad=0<t?Math.floor(1e3/t):5};P.unstable_getCurrentPriorityLevel=function(){return _t};P.unstable_next=function(t){switch(_t){case 1:case 2:case 3:var e=3;break;default:e=_t}var a=_t;_t=e;try{return t()}finally{_t=a}};P.unstable_requestPaint=function(){gc=!0};P.unstable_runWithPriority=function(t,e){switch(t){case 1:case 2:case 3:case 4:case 5:break;default:t=3}var a=_t;_t=t;try{return e()}finally{_t=a}};P.unstable_scheduleCallback=function(t,e,a){var l=P.unstable_now();switch(typeof a=="object"&&a!==null?(a=a.delay,a=typeof a=="number"&&0<a?l+a:l):a=l,t){case 1:var n=-1;break;case 2:n=250;break;case 5:n=1073741823;break;case 4:n=1e4;break;default:n=5e3}return n=a+n,t={id:pv++,callback:e,priorityLevel:t,startTime:a,expirationTime:n,sortIndex:-1},a>l?(t.sortIndex=a,mc(na,t),Ee(Ue)===null&&t===Ee(na)&&(vn?(Td(bn),bn=-1):vn=!0,vc(yc,a-l))):(t.sortIndex=n,mc(Ue,t),yn||hc||(yn=!0,hl||(hl=!0,ml()))),t};P.unstable_shouldYield=Md;P.unstable_wrapCallback=function(t){var e=_t;return function(){var a=_t;_t=e;try{return t.apply(this,arguments)}finally{_t=a}}}});var Cd=Se((X2,Nd)=>{"use strict";Nd.exports=zd()});var jd=Se(N=>{"use strict";var wc=Symbol.for("react.transitional.element"),mv=Symbol.for("react.portal"),hv=Symbol.for("react.fragment"),gv=Symbol.for("react.strict_mode"),yv=Symbol.for("react.profiler"),vv=Symbol.for("react.consumer"),bv=Symbol.for("react.context"),Sv=Symbol.for("react.forward_ref"),wv=Symbol.for("react.suspense"),xv=Symbol.for("react.memo"),Dd=Symbol.for("react.lazy"),Ev=Symbol.for("react.activity"),Od=Symbol.iterator;function Tv(t){return t===null||typeof t!="object"?null:(t=Od&&t[Od]||t["@@iterator"],typeof t=="function"?t:null)}var Ld={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Bd=Object.assign,qd={};function yl(t,e,a){this.props=t,this.context=e,this.refs=qd,this.updater=a||Ld}yl.prototype.isReactComponent={};yl.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};yl.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Hd(){}Hd.prototype=yl.prototype;function xc(t,e,a){this.props=t,this.context=e,this.refs=qd,this.updater=a||Ld}var Ec=xc.prototype=new Hd;Ec.constructor=xc;Bd(Ec,yl.prototype);Ec.isPureReactComponent=!0;var $d=Array.isArray;function Sc(){}var J={H:null,A:null,T:null,S:null},Yd=Object.prototype.hasOwnProperty;function Tc(t,e,a){var l=a.ref;return{$$typeof:wc,type:t,key:e,ref:l!==void 0?l:null,props:a}}function Av(t,e){return Tc(t.type,e,t.props)}function Ac(t){return typeof t=="object"&&t!==null&&t.$$typeof===wc}function _v(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(a){return e[a]})}var Rd=/\/+/g;function bc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?_v(""+t.key):e.toString(36)}function Mv(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(Sc,Sc):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function gl(t,e,a,l,n){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(i){case"bigint":case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case wc:case mv:o=!0;break;case Dd:return o=t._init,gl(o(t._payload),e,a,l,n)}}if(o)return n=n(t),o=l===""?"."+bc(t,0):l,$d(n)?(a="",o!=null&&(a=o.replace(Rd,"$&/")+"/"),gl(n,e,a,"",function(p){return p})):n!=null&&(Ac(n)&&(n=Av(n,a+(n.key==null||t&&t.key===n.key?"":(""+n.key).replace(Rd,"$&/")+"/")+o)),e.push(n)),1;o=0;var u=l===""?".":l+":";if($d(t))for(var r=0;r<t.length;r++)l=t[r],i=u+bc(l,r),o+=gl(l,e,a,i,n);else if(r=Tv(t),typeof r=="function")for(t=r.call(t),r=0;!(l=t.next()).done;)l=l.value,i=u+bc(l,r++),o+=gl(l,e,a,i,n);else if(i==="object"){if(typeof t.then=="function")return gl(Mv(t),e,a,l,n);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return o}function Ii(t,e,a){if(t==null)return t;var l=[],n=0;return gl(t,l,"","",function(i){return e.call(a,i,n++)}),l}function zv(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(a){(t._status===0||t._status===-1)&&(t._status=1,t._result=a)},function(a){(t._status===0||t._status===-1)&&(t._status=2,t._result=a)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Ud=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},Nv={map:Ii,forEach:function(t,e,a){Ii(t,function(){e.apply(this,arguments)},a)},count:function(t){var e=0;return Ii(t,function(){e++}),e},toArray:function(t){return Ii(t,function(e){return e})||[]},only:function(t){if(!Ac(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};N.Activity=Ev;N.Children=Nv;N.Component=yl;N.Fragment=hv;N.Profiler=yv;N.PureComponent=xc;N.StrictMode=gv;N.Suspense=wv;N.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=J;N.__COMPILER_RUNTIME={__proto__:null,c:function(t){return J.H.useMemoCache(t)}};N.cache=function(t){return function(){return t.apply(null,arguments)}};N.cacheSignal=function(){return null};N.cloneElement=function(t,e,a){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var l=Bd({},t.props),n=t.key;if(e!=null)for(i in e.key!==void 0&&(n=""+e.key),e)!Yd.call(e,i)||i==="key"||i==="__self"||i==="__source"||i==="ref"&&e.ref===void 0||(l[i]=e[i]);var i=arguments.length-2;if(i===1)l.children=a;else if(1<i){for(var o=Array(i),u=0;u<i;u++)o[u]=arguments[u+2];l.children=o}return Tc(t.type,n,l)};N.createContext=function(t){return t={$$typeof:bv,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:vv,_context:t},t};N.createElement=function(t,e,a){var l,n={},i=null;if(e!=null)for(l in e.key!==void 0&&(i=""+e.key),e)Yd.call(e,l)&&l!=="key"&&l!=="__self"&&l!=="__source"&&(n[l]=e[l]);var o=arguments.length-2;if(o===1)n.children=a;else if(1<o){for(var u=Array(o),r=0;r<o;r++)u[r]=arguments[r+2];n.children=u}if(t&&t.defaultProps)for(l in o=t.defaultProps,o)n[l]===void 0&&(n[l]=o[l]);return Tc(t,i,n)};N.createRef=function(){return{current:null}};N.forwardRef=function(t){return{$$typeof:Sv,render:t}};N.isValidElement=Ac;N.lazy=function(t){return{$$typeof:Dd,_payload:{_status:-1,_result:t},_init:zv}};N.memo=function(t,e){return{$$typeof:xv,type:t,compare:e===void 0?null:e}};N.startTransition=function(t){var e=J.T,a={};J.T=a;try{var l=t(),n=J.S;n!==null&&n(a,l),typeof l=="object"&&l!==null&&typeof l.then=="function"&&l.then(Sc,Ud)}catch(i){Ud(i)}finally{e!==null&&a.types!==null&&(e.types=a.types),J.T=e}};N.unstable_useCacheRefresh=function(){return J.H.useCacheRefresh()};N.use=function(t){return J.H.use(t)};N.useActionState=function(t,e,a){return J.H.useActionState(t,e,a)};N.useCallback=function(t,e){return J.H.useCallback(t,e)};N.useContext=function(t){return J.H.useContext(t)};N.useDebugValue=function(){};N.useDeferredValue=function(t,e){return J.H.useDeferredValue(t,e)};N.useEffect=function(t,e){return J.H.useEffect(t,e)};N.useEffectEvent=function(t){return J.H.useEffectEvent(t)};N.useId=function(){return J.H.useId()};N.useImperativeHandle=function(t,e,a){return J.H.useImperativeHandle(t,e,a)};N.useInsertionEffect=function(t,e){return J.H.useInsertionEffect(t,e)};N.useLayoutEffect=function(t,e){return J.H.useLayoutEffect(t,e)};N.useMemo=function(t,e){return J.H.useMemo(t,e)};N.useOptimistic=function(t,e){return J.H.useOptimistic(t,e)};N.useReducer=function(t,e,a){return J.H.useReducer(t,e,a)};N.useRef=function(t){return J.H.useRef(t)};N.useState=function(t){return J.H.useState(t)};N.useSyncExternalStore=function(t,e,a){return J.H.useSyncExternalStore(t,e,a)};N.useTransition=function(){return J.H.useTransition()};N.version="19.2.5"});var Ya=Se((K2,Vd)=>{"use strict";Vd.exports=jd()});var Gd=Se(Ct=>{"use strict";var Cv=Ya();function kd(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)e+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function ia(){}var Nt={d:{f:ia,r:function(){throw Error(kd(522))},D:ia,C:ia,L:ia,m:ia,X:ia,S:ia,M:ia},p:0,findDOMNode:null},Ov=Symbol.for("react.portal");function $v(t,e,a){var l=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ov,key:l==null?null:""+l,children:t,containerInfo:e,implementation:a}}var Sn=Cv.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Pi(t,e){if(t==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}Ct.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Nt;Ct.createPortal=function(t,e){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(kd(299));return $v(t,e,null,a)};Ct.flushSync=function(t){var e=Sn.T,a=Nt.p;try{if(Sn.T=null,Nt.p=2,t)return t()}finally{Sn.T=e,Nt.p=a,Nt.d.f()}};Ct.preconnect=function(t,e){typeof t=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,Nt.d.C(t,e))};Ct.prefetchDNS=function(t){typeof t=="string"&&Nt.d.D(t)};Ct.preinit=function(t,e){if(typeof t=="string"&&e&&typeof e.as=="string"){var a=e.as,l=Pi(a,e.crossOrigin),n=typeof e.integrity=="string"?e.integrity:void 0,i=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;a==="style"?Nt.d.S(t,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:l,integrity:n,fetchPriority:i}):a==="script"&&Nt.d.X(t,{crossOrigin:l,integrity:n,fetchPriority:i,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};Ct.preinitModule=function(t,e){if(typeof t=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var a=Pi(e.as,e.crossOrigin);Nt.d.M(t,{crossOrigin:a,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0})}}else e==null&&Nt.d.M(t)};Ct.preload=function(t,e){if(typeof t=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var a=e.as,l=Pi(a,e.crossOrigin);Nt.d.L(t,a,{crossOrigin:l,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};Ct.preloadModule=function(t,e){if(typeof t=="string")if(e){var a=Pi(e.as,e.crossOrigin);Nt.d.m(t,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:a,integrity:typeof e.integrity=="string"?e.integrity:void 0})}else Nt.d.m(t)};Ct.requestFormReset=function(t){Nt.d.r(t)};Ct.unstable_batchedUpdates=function(t,e){return t(e)};Ct.useFormState=function(t,e,a){return Sn.H.useFormState(t,e,a)};Ct.useFormStatus=function(){return Sn.H.useHostTransitionStatus()};Ct.version="19.2.5"});var _c=Se((W2,Xd)=>{"use strict";function Qd(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Qd)}catch(t){console.error(t)}}Qd(),Xd.exports=Gd()});var n0=Se(Au=>{"use strict";var pt=Cd(),vm=Ya(),Rv=_c();function w(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)e+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function bm(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function oi(t){var e=t,a=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(a=e.return),t=e.return;while(t)}return e.tag===3?a:null}function Sm(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function wm(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Zd(t){if(oi(t)!==t)throw Error(w(188))}function Uv(t){var e=t.alternate;if(!e){if(e=oi(t),e===null)throw Error(w(188));return e!==t?null:t}for(var a=t,l=e;;){var n=a.return;if(n===null)break;var i=n.alternate;if(i===null){if(l=n.return,l!==null){a=l;continue}break}if(n.child===i.child){for(i=n.child;i;){if(i===a)return Zd(n),t;if(i===l)return Zd(n),e;i=i.sibling}throw Error(w(188))}if(a.return!==l.return)a=n,l=i;else{for(var o=!1,u=n.child;u;){if(u===a){o=!0,a=n,l=i;break}if(u===l){o=!0,l=n,a=i;break}u=u.sibling}if(!o){for(u=i.child;u;){if(u===a){o=!0,a=i,l=n;break}if(u===l){o=!0,l=i,a=n;break}u=u.sibling}if(!o)throw Error(w(189))}}if(a.alternate!==l)throw Error(w(190))}if(a.tag!==3)throw Error(w(188));return a.stateNode.current===a?t:e}function xm(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=xm(t),e!==null)return e;t=t.sibling}return null}var I=Object.assign,Dv=Symbol.for("react.element"),to=Symbol.for("react.transitional.element"),zn=Symbol.for("react.portal"),El=Symbol.for("react.fragment"),Em=Symbol.for("react.strict_mode"),or=Symbol.for("react.profiler"),Tm=Symbol.for("react.consumer"),Ve=Symbol.for("react.context"),es=Symbol.for("react.forward_ref"),ur=Symbol.for("react.suspense"),cr=Symbol.for("react.suspense_list"),as=Symbol.for("react.memo"),oa=Symbol.for("react.lazy");Symbol.for("react.scope");var rr=Symbol.for("react.activity");Symbol.for("react.legacy_hidden");Symbol.for("react.tracing_marker");var Lv=Symbol.for("react.memo_cache_sentinel");Symbol.for("react.view_transition");var Kd=Symbol.iterator;function wn(t){return t===null||typeof t!="object"?null:(t=Kd&&t[Kd]||t["@@iterator"],typeof t=="function"?t:null)}var Bv=Symbol.for("react.client.reference");function sr(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===Bv?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case El:return"Fragment";case or:return"Profiler";case Em:return"StrictMode";case ur:return"Suspense";case cr:return"SuspenseList";case rr:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case zn:return"Portal";case Ve:return t.displayName||"Context";case Tm:return(t._context.displayName||"Context")+".Consumer";case es:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case as:return e=t.displayName||null,e!==null?e:sr(t.type)||"Memo";case oa:e=t._payload,t=t._init;try{return sr(t(e))}catch{}}return null}var Nn=Array.isArray,z=vm.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,j=Rv.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Xa={pending:!1,data:null,method:null,action:null},fr=[],Tl=-1;function ze(t){return{current:t}}function yt(t){0>Tl||(t.current=fr[Tl],fr[Tl]=null,Tl--)}function K(t,e){Tl++,fr[Tl]=t.current,t.current=e}var Me=ze(null),Xn=ze(null),ya=ze(null),Uo=ze(null);function Do(t,e){switch(K(ya,e),K(Xn,t),K(Me,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?em(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=em(e),t=Gg(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}yt(Me),K(Me,t)}function Vl(){yt(Me),yt(Xn),yt(ya)}function dr(t){t.memoizedState!==null&&K(Uo,t);var e=Me.current,a=Gg(e,t.type);e!==a&&(K(Xn,t),K(Me,a))}function Lo(t){Xn.current===t&&(yt(Me),yt(Xn)),Uo.current===t&&(yt(Uo),li._currentValue=Xa)}var Mc,Jd;function Va(t){if(Mc===void 0)try{throw Error()}catch(a){var e=a.stack.trim().match(/\n( *(at )?)/);Mc=e&&e[1]||"",Jd=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Mc+t+Jd}var zc=!1;function Nc(t,e){if(!t||zc)return"";zc=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(e){var v=function(){throw Error()};if(Object.defineProperty(v.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(v,[])}catch(y){var m=y}Reflect.construct(t,[],v)}else{try{v.call()}catch(y){m=y}t.call(v.prototype)}}else{try{throw Error()}catch(y){m=y}(v=t())&&typeof v.catch=="function"&&v.catch(function(){})}}catch(y){if(y&&m&&typeof y.stack=="string")return[y.stack,m.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var n=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");n&&n.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=l.DetermineComponentFrameRoot(),o=i[0],u=i[1];if(o&&u){var r=o.split(`
`),p=u.split(`
`);for(n=l=0;l<r.length&&!r[l].includes("DetermineComponentFrameRoot");)l++;for(;n<p.length&&!p[n].includes("DetermineComponentFrameRoot");)n++;if(l===r.length||n===p.length)for(l=r.length-1,n=p.length-1;1<=l&&0<=n&&r[l]!==p[n];)n--;for(;1<=l&&0<=n;l--,n--)if(r[l]!==p[n]){if(l!==1||n!==1)do if(l--,n--,0>n||r[l]!==p[n]){var g=`
`+r[l].replace(" at new "," at ");return t.displayName&&g.includes("<anonymous>")&&(g=g.replace("<anonymous>",t.displayName)),g}while(1<=l&&0<=n);break}}}finally{zc=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?Va(a):""}function qv(t,e){switch(t.tag){case 26:case 27:case 5:return Va(t.type);case 16:return Va("Lazy");case 13:return t.child!==e&&e!==null?Va("Suspense Fallback"):Va("Suspense");case 19:return Va("SuspenseList");case 0:case 15:return Nc(t.type,!1);case 11:return Nc(t.type.render,!1);case 1:return Nc(t.type,!0);case 31:return Va("Activity");default:return""}}function Wd(t){try{var e="",a=null;do e+=qv(t,a),a=t,t=t.return;while(t);return e}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var pr=Object.prototype.hasOwnProperty,ls=pt.unstable_scheduleCallback,Cc=pt.unstable_cancelCallback,Hv=pt.unstable_shouldYield,Yv=pt.unstable_requestPaint,Zt=pt.unstable_now,jv=pt.unstable_getCurrentPriorityLevel,Am=pt.unstable_ImmediatePriority,_m=pt.unstable_UserBlockingPriority,Bo=pt.unstable_NormalPriority,Vv=pt.unstable_LowPriority,Mm=pt.unstable_IdlePriority,kv=pt.log,Gv=pt.unstable_setDisableYieldValue,ui=null,Kt=null;function da(t){if(typeof kv=="function"&&Gv(t),Kt&&typeof Kt.setStrictMode=="function")try{Kt.setStrictMode(ui,t)}catch{}}var Jt=Math.clz32?Math.clz32:Zv,Qv=Math.log,Xv=Math.LN2;function Zv(t){return t>>>=0,t===0?32:31-(Qv(t)/Xv|0)|0}var eo=256,ao=262144,lo=4194304;function ka(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function ru(t,e,a){var l=t.pendingLanes;if(l===0)return 0;var n=0,i=t.suspendedLanes,o=t.pingedLanes;t=t.warmLanes;var u=l&134217727;return u!==0?(l=u&~i,l!==0?n=ka(l):(o&=u,o!==0?n=ka(o):a||(a=u&~t,a!==0&&(n=ka(a))))):(u=l&~i,u!==0?n=ka(u):o!==0?n=ka(o):a||(a=l&~t,a!==0&&(n=ka(a)))),n===0?0:e!==0&&e!==n&&(e&i)===0&&(i=n&-n,a=e&-e,i>=a||i===32&&(a&4194048)!==0)?e:n}function ci(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function Kv(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function zm(){var t=lo;return lo<<=1,(lo&62914560)===0&&(lo=4194304),t}function Oc(t){for(var e=[],a=0;31>a;a++)e.push(t);return e}function ri(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Jv(t,e,a,l,n,i){var o=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var u=t.entanglements,r=t.expirationTimes,p=t.hiddenUpdates;for(a=o&~a;0<a;){var g=31-Jt(a),v=1<<g;u[g]=0,r[g]=-1;var m=p[g];if(m!==null)for(p[g]=null,g=0;g<m.length;g++){var y=m[g];y!==null&&(y.lane&=-536870913)}a&=~v}l!==0&&Nm(t,l,0),i!==0&&n===0&&t.tag!==0&&(t.suspendedLanes|=i&~(o&~e))}function Nm(t,e,a){t.pendingLanes|=e,t.suspendedLanes&=~e;var l=31-Jt(e);t.entangledLanes|=e,t.entanglements[l]=t.entanglements[l]|1073741824|a&261930}function Cm(t,e){var a=t.entangledLanes|=e;for(t=t.entanglements;a;){var l=31-Jt(a),n=1<<l;n&e|t[l]&e&&(t[l]|=e),a&=~n}}function Om(t,e){var a=e&-e;return a=(a&42)!==0?1:ns(a),(a&(t.suspendedLanes|e))!==0?0:a}function ns(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function is(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function $m(){var t=j.p;return t!==0?t:(t=window.event,t===void 0?32:e0(t.type))}function Fd(t,e){var a=j.p;try{return j.p=t,e()}finally{j.p=a}}var Ca=Math.random().toString(36).slice(2),St="__reactFiber$"+Ca,Yt="__reactProps$"+Ca,Pl="__reactContainer$"+Ca,mr="__reactEvents$"+Ca,Wv="__reactListeners$"+Ca,Fv="__reactHandles$"+Ca,Id="__reactResources$"+Ca,si="__reactMarker$"+Ca;function os(t){delete t[St],delete t[Yt],delete t[mr],delete t[Wv],delete t[Fv]}function Al(t){var e=t[St];if(e)return e;for(var a=t.parentNode;a;){if(e=a[Pl]||a[St]){if(a=e.alternate,e.child!==null||a!==null&&a.child!==null)for(t=om(t);t!==null;){if(a=t[St])return a;t=om(t)}return e}t=a,a=t.parentNode}return null}function tn(t){if(t=t[St]||t[Pl]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Cn(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(w(33))}function Dl(t){var e=t[Id];return e||(e=t[Id]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function gt(t){t[si]=!0}var Rm=new Set,Um={};function al(t,e){kl(t,e),kl(t+"Capture",e)}function kl(t,e){for(Um[t]=e,t=0;t<e.length;t++)Rm.add(e[t])}var Iv=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Pd={},tp={};function Pv(t){return pr.call(tp,t)?!0:pr.call(Pd,t)?!1:Iv.test(t)?tp[t]=!0:(Pd[t]=!0,!1)}function bo(t,e,a){if(Pv(e))if(a===null)t.removeAttribute(e);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var l=e.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+a)}}function no(t,e,a){if(a===null)t.removeAttribute(e);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+a)}}function De(t,e,a,l){if(l===null)t.removeAttribute(a);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(e,a,""+l)}}function le(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Dm(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function t1(t,e,a){var l=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var n=l.get,i=l.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return n.call(this)},set:function(o){a=""+o,i.call(this,o)}}),Object.defineProperty(t,e,{enumerable:l.enumerable}),{getValue:function(){return a},setValue:function(o){a=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function hr(t){if(!t._valueTracker){var e=Dm(t)?"checked":"value";t._valueTracker=t1(t,e,""+t[e])}}function Lm(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var a=e.getValue(),l="";return t&&(l=Dm(t)?t.checked?"true":"false":t.value),t=l,t!==a?(e.setValue(t),!0):!1}function qo(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var e1=/[\n"\\]/g;function oe(t){return t.replace(e1,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function gr(t,e,a,l,n,i,o,u){t.name="",o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?t.type=o:t.removeAttribute("type"),e!=null?o==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+le(e)):t.value!==""+le(e)&&(t.value=""+le(e)):o!=="submit"&&o!=="reset"||t.removeAttribute("value"),e!=null?yr(t,o,le(e)):a!=null?yr(t,o,le(a)):l!=null&&t.removeAttribute("value"),n==null&&i!=null&&(t.defaultChecked=!!i),n!=null&&(t.checked=n&&typeof n!="function"&&typeof n!="symbol"),u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?t.name=""+le(u):t.removeAttribute("name")}function Bm(t,e,a,l,n,i,o,u){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(t.type=i),e!=null||a!=null){if(!(i!=="submit"&&i!=="reset"||e!=null)){hr(t);return}a=a!=null?""+le(a):"",e=e!=null?""+le(e):a,u||e===t.value||(t.value=e),t.defaultValue=e}l=l??n,l=typeof l!="function"&&typeof l!="symbol"&&!!l,t.checked=u?t.checked:!!l,t.defaultChecked=!!l,o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"&&(t.name=o),hr(t)}function yr(t,e,a){e==="number"&&qo(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function Ll(t,e,a,l){if(t=t.options,e){e={};for(var n=0;n<a.length;n++)e["$"+a[n]]=!0;for(a=0;a<t.length;a++)n=e.hasOwnProperty("$"+t[a].value),t[a].selected!==n&&(t[a].selected=n),n&&l&&(t[a].defaultSelected=!0)}else{for(a=""+le(a),e=null,n=0;n<t.length;n++){if(t[n].value===a){t[n].selected=!0,l&&(t[n].defaultSelected=!0);return}e!==null||t[n].disabled||(e=t[n])}e!==null&&(e.selected=!0)}}function qm(t,e,a){if(e!=null&&(e=""+le(e),e!==t.value&&(t.value=e),a==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=a!=null?""+le(a):""}function Hm(t,e,a,l){if(e==null){if(l!=null){if(a!=null)throw Error(w(92));if(Nn(l)){if(1<l.length)throw Error(w(93));l=l[0]}a=l}a==null&&(a=""),e=a}a=le(e),t.defaultValue=a,l=t.textContent,l===a&&l!==""&&l!==null&&(t.value=l),hr(t)}function Gl(t,e){if(e){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=e;return}}t.textContent=e}var a1=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function ep(t,e,a){var l=e.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?l?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":l?t.setProperty(e,a):typeof a!="number"||a===0||a1.has(e)?e==="float"?t.cssFloat=a:t[e]=(""+a).trim():t[e]=a+"px"}function Ym(t,e,a){if(e!=null&&typeof e!="object")throw Error(w(62));if(t=t.style,a!=null){for(var l in a)!a.hasOwnProperty(l)||e!=null&&e.hasOwnProperty(l)||(l.indexOf("--")===0?t.setProperty(l,""):l==="float"?t.cssFloat="":t[l]="");for(var n in e)l=e[n],e.hasOwnProperty(n)&&a[n]!==l&&ep(t,n,l)}else for(var i in e)e.hasOwnProperty(i)&&ep(t,i,e[i])}function us(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var l1=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),n1=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function So(t){return n1.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function ke(){}var vr=null;function cs(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var _l=null,Bl=null;function ap(t){var e=tn(t);if(e&&(t=e.stateNode)){var a=t[Yt]||null;t:switch(t=e.stateNode,e.type){case"input":if(gr(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),e=a.name,a.type==="radio"&&e!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+oe(""+e)+'"][type="radio"]'),e=0;e<a.length;e++){var l=a[e];if(l!==t&&l.form===t.form){var n=l[Yt]||null;if(!n)throw Error(w(90));gr(l,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name)}}for(e=0;e<a.length;e++)l=a[e],l.form===t.form&&Lm(l)}break t;case"textarea":qm(t,a.value,a.defaultValue);break t;case"select":e=a.value,e!=null&&Ll(t,!!a.multiple,e,!1)}}}var $c=!1;function jm(t,e,a){if($c)return t(e,a);$c=!0;try{var l=t(e);return l}finally{if($c=!1,(_l!==null||Bl!==null)&&(wu(),_l&&(e=_l,t=Bl,Bl=_l=null,ap(e),t)))for(e=0;e<t.length;e++)ap(t[e])}}function Zn(t,e){var a=t.stateNode;if(a===null)return null;var l=a[Yt]||null;if(l===null)return null;a=l[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(t=t.type,l=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!l;break t;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(w(231,e,typeof a));return a}var Ke=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),br=!1;if(Ke)try{vl={},Object.defineProperty(vl,"passive",{get:function(){br=!0}}),window.addEventListener("test",vl,vl),window.removeEventListener("test",vl,vl)}catch{br=!1}var vl,pa=null,rs=null,wo=null;function Vm(){if(wo)return wo;var t,e=rs,a=e.length,l,n="value"in pa?pa.value:pa.textContent,i=n.length;for(t=0;t<a&&e[t]===n[t];t++);var o=a-t;for(l=1;l<=o&&e[a-l]===n[i-l];l++);return wo=n.slice(t,1<l?1-l:void 0)}function xo(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function io(){return!0}function lp(){return!1}function jt(t){function e(a,l,n,i,o){this._reactName=a,this._targetInst=n,this.type=l,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var u in t)t.hasOwnProperty(u)&&(a=t[u],this[u]=a?a(i):i[u]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?io:lp,this.isPropagationStopped=lp,this}return I(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=io)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=io)},persist:function(){},isPersistent:io}),e}var ll={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},su=jt(ll),fi=I({},ll,{view:0,detail:0}),i1=jt(fi),Rc,Uc,xn,fu=I({},fi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ss,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==xn&&(xn&&t.type==="mousemove"?(Rc=t.screenX-xn.screenX,Uc=t.screenY-xn.screenY):Uc=Rc=0,xn=t),Rc)},movementY:function(t){return"movementY"in t?t.movementY:Uc}}),np=jt(fu),o1=I({},fu,{dataTransfer:0}),u1=jt(o1),c1=I({},fi,{relatedTarget:0}),Dc=jt(c1),r1=I({},ll,{animationName:0,elapsedTime:0,pseudoElement:0}),s1=jt(r1),f1=I({},ll,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),d1=jt(f1),p1=I({},ll,{data:0}),ip=jt(p1),m1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},h1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},g1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function y1(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=g1[t])?!!e[t]:!1}function ss(){return y1}var v1=I({},fi,{key:function(t){if(t.key){var e=m1[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=xo(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?h1[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ss,charCode:function(t){return t.type==="keypress"?xo(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?xo(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),b1=jt(v1),S1=I({},fu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),op=jt(S1),w1=I({},fi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ss}),x1=jt(w1),E1=I({},ll,{propertyName:0,elapsedTime:0,pseudoElement:0}),T1=jt(E1),A1=I({},fu,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),_1=jt(A1),M1=I({},ll,{newState:0,oldState:0}),z1=jt(M1),N1=[9,13,27,32],fs=Ke&&"CompositionEvent"in window,Rn=null;Ke&&"documentMode"in document&&(Rn=document.documentMode);var C1=Ke&&"TextEvent"in window&&!Rn,km=Ke&&(!fs||Rn&&8<Rn&&11>=Rn),up=" ",cp=!1;function Gm(t,e){switch(t){case"keyup":return N1.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Qm(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Ml=!1;function O1(t,e){switch(t){case"compositionend":return Qm(e);case"keypress":return e.which!==32?null:(cp=!0,up);case"textInput":return t=e.data,t===up&&cp?null:t;default:return null}}function $1(t,e){if(Ml)return t==="compositionend"||!fs&&Gm(t,e)?(t=Vm(),wo=rs=pa=null,Ml=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return km&&e.locale!=="ko"?null:e.data;default:return null}}var R1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function rp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!R1[t.type]:e==="textarea"}function Xm(t,e,a,l){_l?Bl?Bl.push(l):Bl=[l]:_l=l,e=au(e,"onChange"),0<e.length&&(a=new su("onChange","change",null,a,l),t.push({event:a,listeners:e}))}var Un=null,Kn=null;function U1(t){jg(t,0)}function du(t){var e=Cn(t);if(Lm(e))return t}function sp(t,e){if(t==="change")return e}var Zm=!1;Ke&&(Ke?(uo="oninput"in document,uo||(Lc=document.createElement("div"),Lc.setAttribute("oninput","return;"),uo=typeof Lc.oninput=="function"),oo=uo):oo=!1,Zm=oo&&(!document.documentMode||9<document.documentMode));var oo,uo,Lc;function fp(){Un&&(Un.detachEvent("onpropertychange",Km),Kn=Un=null)}function Km(t){if(t.propertyName==="value"&&du(Kn)){var e=[];Xm(e,Kn,t,cs(t)),jm(U1,e)}}function D1(t,e,a){t==="focusin"?(fp(),Un=e,Kn=a,Un.attachEvent("onpropertychange",Km)):t==="focusout"&&fp()}function L1(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return du(Kn)}function B1(t,e){if(t==="click")return du(e)}function q1(t,e){if(t==="input"||t==="change")return du(e)}function H1(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Ft=typeof Object.is=="function"?Object.is:H1;function Jn(t,e){if(Ft(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var a=Object.keys(t),l=Object.keys(e);if(a.length!==l.length)return!1;for(l=0;l<a.length;l++){var n=a[l];if(!pr.call(e,n)||!Ft(t[n],e[n]))return!1}return!0}function dp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function pp(t,e){var a=dp(t);t=0;for(var l;a;){if(a.nodeType===3){if(l=t+a.textContent.length,t<=e&&l>=e)return{node:a,offset:e-t};t=l}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=dp(a)}}function Jm(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Jm(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Wm(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=qo(t.document);e instanceof t.HTMLIFrameElement;){try{var a=typeof e.contentWindow.location.href=="string"}catch{a=!1}if(a)t=e.contentWindow;else break;e=qo(t.document)}return e}function ds(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var Y1=Ke&&"documentMode"in document&&11>=document.documentMode,zl=null,Sr=null,Dn=null,wr=!1;function mp(t,e,a){var l=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;wr||zl==null||zl!==qo(l)||(l=zl,"selectionStart"in l&&ds(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),Dn&&Jn(Dn,l)||(Dn=l,l=au(Sr,"onSelect"),0<l.length&&(e=new su("onSelect","select",null,e,a),t.push({event:e,listeners:l}),e.target=zl)))}function ja(t,e){var a={};return a[t.toLowerCase()]=e.toLowerCase(),a["Webkit"+t]="webkit"+e,a["Moz"+t]="moz"+e,a}var Nl={animationend:ja("Animation","AnimationEnd"),animationiteration:ja("Animation","AnimationIteration"),animationstart:ja("Animation","AnimationStart"),transitionrun:ja("Transition","TransitionRun"),transitionstart:ja("Transition","TransitionStart"),transitioncancel:ja("Transition","TransitionCancel"),transitionend:ja("Transition","TransitionEnd")},Bc={},Fm={};Ke&&(Fm=document.createElement("div").style,"AnimationEvent"in window||(delete Nl.animationend.animation,delete Nl.animationiteration.animation,delete Nl.animationstart.animation),"TransitionEvent"in window||delete Nl.transitionend.transition);function nl(t){if(Bc[t])return Bc[t];if(!Nl[t])return t;var e=Nl[t],a;for(a in e)if(e.hasOwnProperty(a)&&a in Fm)return Bc[t]=e[a];return t}var Im=nl("animationend"),Pm=nl("animationiteration"),th=nl("animationstart"),j1=nl("transitionrun"),V1=nl("transitionstart"),k1=nl("transitioncancel"),eh=nl("transitionend"),ah=new Map,xr="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");xr.push("scrollEnd");function me(t,e){ah.set(t,e),al(e,[t])}var Ho=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},ae=[],Cl=0,ps=0;function pu(){for(var t=Cl,e=ps=Cl=0;e<t;){var a=ae[e];ae[e++]=null;var l=ae[e];ae[e++]=null;var n=ae[e];ae[e++]=null;var i=ae[e];if(ae[e++]=null,l!==null&&n!==null){var o=l.pending;o===null?n.next=n:(n.next=o.next,o.next=n),l.pending=n}i!==0&&lh(a,n,i)}}function mu(t,e,a,l){ae[Cl++]=t,ae[Cl++]=e,ae[Cl++]=a,ae[Cl++]=l,ps|=l,t.lanes|=l,t=t.alternate,t!==null&&(t.lanes|=l)}function ms(t,e,a,l){return mu(t,e,a,l),Yo(t)}function il(t,e){return mu(t,null,null,e),Yo(t)}function lh(t,e,a){t.lanes|=a;var l=t.alternate;l!==null&&(l.lanes|=a);for(var n=!1,i=t.return;i!==null;)i.childLanes|=a,l=i.alternate,l!==null&&(l.childLanes|=a),i.tag===22&&(t=i.stateNode,t===null||t._visibility&1||(n=!0)),t=i,i=i.return;return t.tag===3?(i=t.stateNode,n&&e!==null&&(n=31-Jt(a),t=i.hiddenUpdates,l=t[n],l===null?t[n]=[e]:l.push(e),e.lane=a|536870912),i):null}function Yo(t){if(50<Gn)throw Gn=0,kr=null,Error(w(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var Ol={};function G1(t,e,a,l){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Qt(t,e,a,l){return new G1(t,e,a,l)}function hs(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Qe(t,e){var a=t.alternate;return a===null?(a=Qt(t.tag,e,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=e,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,e=t.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function nh(t,e){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,e=a.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function Eo(t,e,a,l,n,i){var o=0;if(l=t,typeof t=="function")hs(t)&&(o=1);else if(typeof t=="string")o=Zb(t,a,Me.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case rr:return t=Qt(31,a,e,n),t.elementType=rr,t.lanes=i,t;case El:return Za(a.children,n,i,e);case Em:o=8,n|=24;break;case or:return t=Qt(12,a,e,n|2),t.elementType=or,t.lanes=i,t;case ur:return t=Qt(13,a,e,n),t.elementType=ur,t.lanes=i,t;case cr:return t=Qt(19,a,e,n),t.elementType=cr,t.lanes=i,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Ve:o=10;break t;case Tm:o=9;break t;case es:o=11;break t;case as:o=14;break t;case oa:o=16,l=null;break t}o=29,a=Error(w(130,t===null?"null":typeof t,"")),l=null}return e=Qt(o,a,e,n),e.elementType=t,e.type=l,e.lanes=i,e}function Za(t,e,a,l){return t=Qt(7,t,l,e),t.lanes=a,t}function qc(t,e,a){return t=Qt(6,t,null,e),t.lanes=a,t}function ih(t){var e=Qt(18,null,null,0);return e.stateNode=t,e}function Hc(t,e,a){return e=Qt(4,t.children!==null?t.children:[],t.key,e),e.lanes=a,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var hp=new WeakMap;function ue(t,e){if(typeof t=="object"&&t!==null){var a=hp.get(t);return a!==void 0?a:(e={value:t,source:e,stack:Wd(e)},hp.set(t,e),e)}return{value:t,source:e,stack:Wd(e)}}var $l=[],Rl=0,jo=null,Wn=0,ne=[],ie=0,_a=null,Te=1,Ae="";function Ye(t,e){$l[Rl++]=Wn,$l[Rl++]=jo,jo=t,Wn=e}function oh(t,e,a){ne[ie++]=Te,ne[ie++]=Ae,ne[ie++]=_a,_a=t;var l=Te;t=Ae;var n=32-Jt(l)-1;l&=~(1<<n),a+=1;var i=32-Jt(e)+n;if(30<i){var o=n-n%5;i=(l&(1<<o)-1).toString(32),l>>=o,n-=o,Te=1<<32-Jt(e)+n|a<<n|l,Ae=i+t}else Te=1<<i|a<<n|l,Ae=t}function gs(t){t.return!==null&&(Ye(t,1),oh(t,1,0))}function ys(t){for(;t===jo;)jo=$l[--Rl],$l[Rl]=null,Wn=$l[--Rl],$l[Rl]=null;for(;t===_a;)_a=ne[--ie],ne[ie]=null,Ae=ne[--ie],ne[ie]=null,Te=ne[--ie],ne[ie]=null}function uh(t,e){ne[ie++]=Te,ne[ie++]=Ae,ne[ie++]=_a,Te=e.id,Ae=e.overflow,_a=t}var wt=null,F=null,B=!1,va=null,ce=!1,Er=Error(w(519));function Ma(t){var e=Error(w(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Fn(ue(e,t)),Er}function gp(t){var e=t.stateNode,a=t.type,l=t.memoizedProps;switch(e[St]=t,e[Yt]=l,a){case"dialog":R("cancel",e),R("close",e);break;case"iframe":case"object":case"embed":R("load",e);break;case"video":case"audio":for(a=0;a<ei.length;a++)R(ei[a],e);break;case"source":R("error",e);break;case"img":case"image":case"link":R("error",e),R("load",e);break;case"details":R("toggle",e);break;case"input":R("invalid",e),Bm(e,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":R("invalid",e);break;case"textarea":R("invalid",e),Hm(e,l.value,l.defaultValue,l.children)}a=l.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||e.textContent===""+a||l.suppressHydrationWarning===!0||kg(e.textContent,a)?(l.popover!=null&&(R("beforetoggle",e),R("toggle",e)),l.onScroll!=null&&R("scroll",e),l.onScrollEnd!=null&&R("scrollend",e),l.onClick!=null&&(e.onclick=ke),e=!0):e=!1,e||Ma(t,!0)}function yp(t){for(wt=t.return;wt;)switch(wt.tag){case 5:case 31:case 13:ce=!1;return;case 27:case 3:ce=!0;return;default:wt=wt.return}}function bl(t){if(t!==wt)return!1;if(!B)return yp(t),B=!0,!1;var e=t.tag,a;if((a=e!==3&&e!==27)&&((a=e===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||Kr(t.type,t.memoizedProps)),a=!a),a&&F&&Ma(t),yp(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(w(317));F=im(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(w(317));F=im(t)}else e===27?(e=F,Oa(t.type)?(t=Ir,Ir=null,F=t):F=e):F=wt?se(t.stateNode.nextSibling):null;return!0}function Fa(){F=wt=null,B=!1}function Yc(){var t=va;return t!==null&&(qt===null?qt=t:qt.push.apply(qt,t),va=null),t}function Fn(t){va===null?va=[t]:va.push(t)}var Tr=ze(null),ol=null,Ge=null;function ca(t,e,a){K(Tr,e._currentValue),e._currentValue=a}function Xe(t){t._currentValue=Tr.current,yt(Tr)}function Ar(t,e,a){for(;t!==null;){var l=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,l!==null&&(l.childLanes|=e)):l!==null&&(l.childLanes&e)!==e&&(l.childLanes|=e),t===a)break;t=t.return}}function _r(t,e,a,l){var n=t.child;for(n!==null&&(n.return=t);n!==null;){var i=n.dependencies;if(i!==null){var o=n.child;i=i.firstContext;t:for(;i!==null;){var u=i;i=n;for(var r=0;r<e.length;r++)if(u.context===e[r]){i.lanes|=a,u=i.alternate,u!==null&&(u.lanes|=a),Ar(i.return,a,t),l||(o=null);break t}i=u.next}}else if(n.tag===18){if(o=n.return,o===null)throw Error(w(341));o.lanes|=a,i=o.alternate,i!==null&&(i.lanes|=a),Ar(o,a,t),o=null}else o=n.child;if(o!==null)o.return=n;else for(o=n;o!==null;){if(o===t){o=null;break}if(n=o.sibling,n!==null){n.return=o.return,o=n;break}o=o.return}n=o}}function en(t,e,a,l){t=null;for(var n=e,i=!1;n!==null;){if(!i){if((n.flags&524288)!==0)i=!0;else if((n.flags&262144)!==0)break}if(n.tag===10){var o=n.alternate;if(o===null)throw Error(w(387));if(o=o.memoizedProps,o!==null){var u=n.type;Ft(n.pendingProps.value,o.value)||(t!==null?t.push(u):t=[u])}}else if(n===Uo.current){if(o=n.alternate,o===null)throw Error(w(387));o.memoizedState.memoizedState!==n.memoizedState.memoizedState&&(t!==null?t.push(li):t=[li])}n=n.return}t!==null&&_r(e,t,a,l),e.flags|=262144}function Vo(t){for(t=t.firstContext;t!==null;){if(!Ft(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Ia(t){ol=t,Ge=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function xt(t){return ch(ol,t)}function co(t,e){return ol===null&&Ia(t),ch(t,e)}function ch(t,e){var a=e._currentValue;if(e={context:e,memoizedValue:a,next:null},Ge===null){if(t===null)throw Error(w(308));Ge=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Ge=Ge.next=e;return a}var Q1=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(a,l){t.push(l)}};this.abort=function(){e.aborted=!0,t.forEach(function(a){return a()})}},X1=pt.unstable_scheduleCallback,Z1=pt.unstable_NormalPriority,st={$$typeof:Ve,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function vs(){return{controller:new Q1,data:new Map,refCount:0}}function di(t){t.refCount--,t.refCount===0&&X1(Z1,function(){t.controller.abort()})}var Ln=null,Mr=0,Ql=0,ql=null;function K1(t,e){if(Ln===null){var a=Ln=[];Mr=0,Ql=ks(),ql={status:"pending",value:void 0,then:function(l){a.push(l)}}}return Mr++,e.then(vp,vp),e}function vp(){if(--Mr===0&&Ln!==null){ql!==null&&(ql.status="fulfilled");var t=Ln;Ln=null,Ql=0,ql=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function J1(t,e){var a=[],l={status:"pending",value:null,reason:null,then:function(n){a.push(n)}};return t.then(function(){l.status="fulfilled",l.value=e;for(var n=0;n<a.length;n++)(0,a[n])(e)},function(n){for(l.status="rejected",l.reason=n,n=0;n<a.length;n++)(0,a[n])(void 0)}),l}var bp=z.S;z.S=function(t,e){xg=Zt(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&K1(t,e),bp!==null&&bp(t,e)};var Ka=ze(null);function bs(){var t=Ka.current;return t!==null?t:X.pooledCache}function To(t,e){e===null?K(Ka,Ka.current):K(Ka,e.pool)}function rh(){var t=bs();return t===null?null:{parent:st._currentValue,pool:t}}var an=Error(w(460)),Ss=Error(w(474)),hu=Error(w(542)),ko={then:function(){}};function Sp(t){return t=t.status,t==="fulfilled"||t==="rejected"}function sh(t,e,a){switch(a=t[a],a===void 0?t.push(e):a!==e&&(e.then(ke,ke),e=a),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,xp(t),t;default:if(typeof e.status=="string")e.then(ke,ke);else{if(t=X,t!==null&&100<t.shellSuspendCounter)throw Error(w(482));t=e,t.status="pending",t.then(function(l){if(e.status==="pending"){var n=e;n.status="fulfilled",n.value=l}},function(l){if(e.status==="pending"){var n=e;n.status="rejected",n.reason=l}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,xp(t),t}throw Ja=e,an}}function Ga(t){try{var e=t._init;return e(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Ja=a,an):a}}var Ja=null;function wp(){if(Ja===null)throw Error(w(459));var t=Ja;return Ja=null,t}function xp(t){if(t===an||t===hu)throw Error(w(483))}var Hl=null,In=0;function ro(t){var e=In;return In+=1,Hl===null&&(Hl=[]),sh(Hl,t,e)}function En(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function so(t,e){throw e.$$typeof===Dv?Error(w(525)):(t=Object.prototype.toString.call(e),Error(w(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function fh(t){function e(f,s){if(t){var h=f.deletions;h===null?(f.deletions=[s],f.flags|=16):h.push(s)}}function a(f,s){if(!t)return null;for(;s!==null;)e(f,s),s=s.sibling;return null}function l(f){for(var s=new Map;f!==null;)f.key!==null?s.set(f.key,f):s.set(f.index,f),f=f.sibling;return s}function n(f,s){return f=Qe(f,s),f.index=0,f.sibling=null,f}function i(f,s,h){return f.index=h,t?(h=f.alternate,h!==null?(h=h.index,h<s?(f.flags|=67108866,s):h):(f.flags|=67108866,s)):(f.flags|=1048576,s)}function o(f){return t&&f.alternate===null&&(f.flags|=67108866),f}function u(f,s,h,b){return s===null||s.tag!==6?(s=qc(h,f.mode,b),s.return=f,s):(s=n(s,h),s.return=f,s)}function r(f,s,h,b){var A=h.type;return A===El?g(f,s,h.props.children,b,h.key):s!==null&&(s.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===oa&&Ga(A)===s.type)?(s=n(s,h.props),En(s,h),s.return=f,s):(s=Eo(h.type,h.key,h.props,null,f.mode,b),En(s,h),s.return=f,s)}function p(f,s,h,b){return s===null||s.tag!==4||s.stateNode.containerInfo!==h.containerInfo||s.stateNode.implementation!==h.implementation?(s=Hc(h,f.mode,b),s.return=f,s):(s=n(s,h.children||[]),s.return=f,s)}function g(f,s,h,b,A){return s===null||s.tag!==7?(s=Za(h,f.mode,b,A),s.return=f,s):(s=n(s,h),s.return=f,s)}function v(f,s,h){if(typeof s=="string"&&s!==""||typeof s=="number"||typeof s=="bigint")return s=qc(""+s,f.mode,h),s.return=f,s;if(typeof s=="object"&&s!==null){switch(s.$$typeof){case to:return h=Eo(s.type,s.key,s.props,null,f.mode,h),En(h,s),h.return=f,h;case zn:return s=Hc(s,f.mode,h),s.return=f,s;case oa:return s=Ga(s),v(f,s,h)}if(Nn(s)||wn(s))return s=Za(s,f.mode,h,null),s.return=f,s;if(typeof s.then=="function")return v(f,ro(s),h);if(s.$$typeof===Ve)return v(f,co(f,s),h);so(f,s)}return null}function m(f,s,h,b){var A=s!==null?s.key:null;if(typeof h=="string"&&h!==""||typeof h=="number"||typeof h=="bigint")return A!==null?null:u(f,s,""+h,b);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case to:return h.key===A?r(f,s,h,b):null;case zn:return h.key===A?p(f,s,h,b):null;case oa:return h=Ga(h),m(f,s,h,b)}if(Nn(h)||wn(h))return A!==null?null:g(f,s,h,b,null);if(typeof h.then=="function")return m(f,s,ro(h),b);if(h.$$typeof===Ve)return m(f,s,co(f,h),b);so(f,h)}return null}function y(f,s,h,b,A){if(typeof b=="string"&&b!==""||typeof b=="number"||typeof b=="bigint")return f=f.get(h)||null,u(s,f,""+b,A);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case to:return f=f.get(b.key===null?h:b.key)||null,r(s,f,b,A);case zn:return f=f.get(b.key===null?h:b.key)||null,p(s,f,b,A);case oa:return b=Ga(b),y(f,s,h,b,A)}if(Nn(b)||wn(b))return f=f.get(h)||null,g(s,f,b,A,null);if(typeof b.then=="function")return y(f,s,h,ro(b),A);if(b.$$typeof===Ve)return y(f,s,h,co(s,b),A);so(s,b)}return null}function E(f,s,h,b){for(var A=null,q=null,T=s,$=s=0,D=null;T!==null&&$<h.length;$++){T.index>$?(D=T,T=null):D=T.sibling;var H=m(f,T,h[$],b);if(H===null){T===null&&(T=D);break}t&&T&&H.alternate===null&&e(f,T),s=i(H,s,$),q===null?A=H:q.sibling=H,q=H,T=D}if($===h.length)return a(f,T),B&&Ye(f,$),A;if(T===null){for(;$<h.length;$++)T=v(f,h[$],b),T!==null&&(s=i(T,s,$),q===null?A=T:q.sibling=T,q=T);return B&&Ye(f,$),A}for(T=l(T);$<h.length;$++)D=y(T,f,$,h[$],b),D!==null&&(t&&D.alternate!==null&&T.delete(D.key===null?$:D.key),s=i(D,s,$),q===null?A=D:q.sibling=D,q=D);return t&&T.forEach(function(aa){return e(f,aa)}),B&&Ye(f,$),A}function _(f,s,h,b){if(h==null)throw Error(w(151));for(var A=null,q=null,T=s,$=s=0,D=null,H=h.next();T!==null&&!H.done;$++,H=h.next()){T.index>$?(D=T,T=null):D=T.sibling;var aa=m(f,T,H.value,b);if(aa===null){T===null&&(T=D);break}t&&T&&aa.alternate===null&&e(f,T),s=i(aa,s,$),q===null?A=aa:q.sibling=aa,q=aa,T=D}if(H.done)return a(f,T),B&&Ye(f,$),A;if(T===null){for(;!H.done;$++,H=h.next())H=v(f,H.value,b),H!==null&&(s=i(H,s,$),q===null?A=H:q.sibling=H,q=H);return B&&Ye(f,$),A}for(T=l(T);!H.done;$++,H=h.next())H=y(T,f,$,H.value,b),H!==null&&(t&&H.alternate!==null&&T.delete(H.key===null?$:H.key),s=i(H,s,$),q===null?A=H:q.sibling=H,q=H);return t&&T.forEach(function(lv){return e(f,lv)}),B&&Ye(f,$),A}function C(f,s,h,b){if(typeof h=="object"&&h!==null&&h.type===El&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case to:t:{for(var A=h.key;s!==null;){if(s.key===A){if(A=h.type,A===El){if(s.tag===7){a(f,s.sibling),b=n(s,h.props.children),b.return=f,f=b;break t}}else if(s.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===oa&&Ga(A)===s.type){a(f,s.sibling),b=n(s,h.props),En(b,h),b.return=f,f=b;break t}a(f,s);break}else e(f,s);s=s.sibling}h.type===El?(b=Za(h.props.children,f.mode,b,h.key),b.return=f,f=b):(b=Eo(h.type,h.key,h.props,null,f.mode,b),En(b,h),b.return=f,f=b)}return o(f);case zn:t:{for(A=h.key;s!==null;){if(s.key===A)if(s.tag===4&&s.stateNode.containerInfo===h.containerInfo&&s.stateNode.implementation===h.implementation){a(f,s.sibling),b=n(s,h.children||[]),b.return=f,f=b;break t}else{a(f,s);break}else e(f,s);s=s.sibling}b=Hc(h,f.mode,b),b.return=f,f=b}return o(f);case oa:return h=Ga(h),C(f,s,h,b)}if(Nn(h))return E(f,s,h,b);if(wn(h)){if(A=wn(h),typeof A!="function")throw Error(w(150));return h=A.call(h),_(f,s,h,b)}if(typeof h.then=="function")return C(f,s,ro(h),b);if(h.$$typeof===Ve)return C(f,s,co(f,h),b);so(f,h)}return typeof h=="string"&&h!==""||typeof h=="number"||typeof h=="bigint"?(h=""+h,s!==null&&s.tag===6?(a(f,s.sibling),b=n(s,h),b.return=f,f=b):(a(f,s),b=qc(h,f.mode,b),b.return=f,f=b),o(f)):a(f,s)}return function(f,s,h,b){try{In=0;var A=C(f,s,h,b);return Hl=null,A}catch(T){if(T===an||T===hu)throw T;var q=Qt(29,T,null,f.mode);return q.lanes=b,q.return=f,q}finally{}}}var Pa=fh(!0),dh=fh(!1),ua=!1;function ws(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function zr(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function ba(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Sa(t,e,a){var l=t.updateQueue;if(l===null)return null;if(l=l.shared,(Y&2)!==0){var n=l.pending;return n===null?e.next=e:(e.next=n.next,n.next=e),l.pending=e,e=Yo(t),lh(t,null,a),e}return mu(t,l,e,a),Yo(t)}function Bn(t,e,a){if(e=e.updateQueue,e!==null&&(e=e.shared,(a&4194048)!==0)){var l=e.lanes;l&=t.pendingLanes,a|=l,e.lanes=a,Cm(t,a)}}function jc(t,e){var a=t.updateQueue,l=t.alternate;if(l!==null&&(l=l.updateQueue,a===l)){var n=null,i=null;if(a=a.firstBaseUpdate,a!==null){do{var o={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};i===null?n=i=o:i=i.next=o,a=a.next}while(a!==null);i===null?n=i=e:i=i.next=e}else n=i=e;a={baseState:l.baseState,firstBaseUpdate:n,lastBaseUpdate:i,shared:l.shared,callbacks:l.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=e:t.next=e,a.lastBaseUpdate=e}var Nr=!1;function qn(){if(Nr){var t=ql;if(t!==null)throw t}}function Hn(t,e,a,l){Nr=!1;var n=t.updateQueue;ua=!1;var i=n.firstBaseUpdate,o=n.lastBaseUpdate,u=n.shared.pending;if(u!==null){n.shared.pending=null;var r=u,p=r.next;r.next=null,o===null?i=p:o.next=p,o=r;var g=t.alternate;g!==null&&(g=g.updateQueue,u=g.lastBaseUpdate,u!==o&&(u===null?g.firstBaseUpdate=p:u.next=p,g.lastBaseUpdate=r))}if(i!==null){var v=n.baseState;o=0,g=p=r=null,u=i;do{var m=u.lane&-536870913,y=m!==u.lane;if(y?(L&m)===m:(l&m)===m){m!==0&&m===Ql&&(Nr=!0),g!==null&&(g=g.next={lane:0,tag:u.tag,payload:u.payload,callback:null,next:null});t:{var E=t,_=u;m=e;var C=a;switch(_.tag){case 1:if(E=_.payload,typeof E=="function"){v=E.call(C,v,m);break t}v=E;break t;case 3:E.flags=E.flags&-65537|128;case 0:if(E=_.payload,m=typeof E=="function"?E.call(C,v,m):E,m==null)break t;v=I({},v,m);break t;case 2:ua=!0}}m=u.callback,m!==null&&(t.flags|=64,y&&(t.flags|=8192),y=n.callbacks,y===null?n.callbacks=[m]:y.push(m))}else y={lane:m,tag:u.tag,payload:u.payload,callback:u.callback,next:null},g===null?(p=g=y,r=v):g=g.next=y,o|=m;if(u=u.next,u===null){if(u=n.shared.pending,u===null)break;y=u,u=y.next,y.next=null,n.lastBaseUpdate=y,n.shared.pending=null}}while(!0);g===null&&(r=v),n.baseState=r,n.firstBaseUpdate=p,n.lastBaseUpdate=g,i===null&&(n.shared.lanes=0),Na|=o,t.lanes=o,t.memoizedState=v}}function ph(t,e){if(typeof t!="function")throw Error(w(191,t));t.call(e)}function mh(t,e){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)ph(a[t],e)}var Xl=ze(null),Go=ze(0);function Ep(t,e){t=Ie,K(Go,t),K(Xl,e),Ie=t|e.baseLanes}function Cr(){K(Go,Ie),K(Xl,Xl.current)}function xs(){Ie=Go.current,yt(Xl),yt(Go)}var It=ze(null),re=null;function ra(t){var e=t.alternate;K(nt,nt.current&1),K(It,t),re===null&&(e===null||Xl.current!==null||e.memoizedState!==null)&&(re=t)}function Or(t){K(nt,nt.current),K(It,t),re===null&&(re=t)}function hh(t){t.tag===22?(K(nt,nt.current),K(It,t),re===null&&(re=t)):sa(t)}function sa(){K(nt,nt.current),K(It,It.current)}function Gt(t){yt(It),re===t&&(re=null),yt(nt)}var nt=ze(0);function Qo(t){for(var e=t;e!==null;){if(e.tag===13){var a=e.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Wr(a)||Fr(a)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Je=0,O=null,Q=null,ct=null,Xo=!1,Yl=!1,tl=!1,Zo=0,Pn=0,jl=null,W1=0;function at(){throw Error(w(321))}function Es(t,e){if(e===null)return!1;for(var a=0;a<e.length&&a<t.length;a++)if(!Ft(t[a],e[a]))return!1;return!0}function Ts(t,e,a,l,n,i){return Je=i,O=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,z.H=t===null||t.memoizedState===null?Xh:Ds,tl=!1,i=a(l,n),tl=!1,Yl&&(i=yh(e,a,l,n)),gh(t),i}function gh(t){z.H=ti;var e=Q!==null&&Q.next!==null;if(Je=0,ct=Q=O=null,Xo=!1,Pn=0,jl=null,e)throw Error(w(300));t===null||ft||(t=t.dependencies,t!==null&&Vo(t)&&(ft=!0))}function yh(t,e,a,l){O=t;var n=0;do{if(Yl&&(jl=null),Pn=0,Yl=!1,25<=n)throw Error(w(301));if(n+=1,ct=Q=null,t.updateQueue!=null){var i=t.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}z.H=Zh,i=e(a,l)}while(Yl);return i}function F1(){var t=z.H,e=t.useState()[0];return e=typeof e.then=="function"?pi(e):e,t=t.useState()[0],(Q!==null?Q.memoizedState:null)!==t&&(O.flags|=1024),e}function As(){var t=Zo!==0;return Zo=0,t}function _s(t,e,a){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~a}function Ms(t){if(Xo){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}Xo=!1}Je=0,ct=Q=O=null,Yl=!1,Pn=Zo=0,jl=null}function Ot(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ct===null?O.memoizedState=ct=t:ct=ct.next=t,ct}function it(){if(Q===null){var t=O.alternate;t=t!==null?t.memoizedState:null}else t=Q.next;var e=ct===null?O.memoizedState:ct.next;if(e!==null)ct=e,Q=t;else{if(t===null)throw O.alternate===null?Error(w(467)):Error(w(310));Q=t,t={memoizedState:Q.memoizedState,baseState:Q.baseState,baseQueue:Q.baseQueue,queue:Q.queue,next:null},ct===null?O.memoizedState=ct=t:ct=ct.next=t}return ct}function gu(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function pi(t){var e=Pn;return Pn+=1,jl===null&&(jl=[]),t=sh(jl,t,e),e=O,(ct===null?e.memoizedState:ct.next)===null&&(e=e.alternate,z.H=e===null||e.memoizedState===null?Xh:Ds),t}function yu(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return pi(t);if(t.$$typeof===Ve)return xt(t)}throw Error(w(438,String(t)))}function zs(t){var e=null,a=O.updateQueue;if(a!==null&&(e=a.memoCache),e==null){var l=O.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(e={data:l.data.map(function(n){return n.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),a===null&&(a=gu(),O.updateQueue=a),a.memoCache=e,a=e.data[e.index],a===void 0)for(a=e.data[e.index]=Array(t),l=0;l<t;l++)a[l]=Lv;return e.index++,a}function We(t,e){return typeof e=="function"?e(t):e}function Ao(t){var e=it();return Ns(e,Q,t)}function Ns(t,e,a){var l=t.queue;if(l===null)throw Error(w(311));l.lastRenderedReducer=a;var n=t.baseQueue,i=l.pending;if(i!==null){if(n!==null){var o=n.next;n.next=i.next,i.next=o}e.baseQueue=n=i,l.pending=null}if(i=t.baseState,n===null)t.memoizedState=i;else{e=n.next;var u=o=null,r=null,p=e,g=!1;do{var v=p.lane&-536870913;if(v!==p.lane?(L&v)===v:(Je&v)===v){var m=p.revertLane;if(m===0)r!==null&&(r=r.next={lane:0,revertLane:0,gesture:null,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null}),v===Ql&&(g=!0);else if((Je&m)===m){p=p.next,m===Ql&&(g=!0);continue}else v={lane:0,revertLane:p.revertLane,gesture:null,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null},r===null?(u=r=v,o=i):r=r.next=v,O.lanes|=m,Na|=m;v=p.action,tl&&a(i,v),i=p.hasEagerState?p.eagerState:a(i,v)}else m={lane:v,revertLane:p.revertLane,gesture:p.gesture,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null},r===null?(u=r=m,o=i):r=r.next=m,O.lanes|=v,Na|=v;p=p.next}while(p!==null&&p!==e);if(r===null?o=i:r.next=u,!Ft(i,t.memoizedState)&&(ft=!0,g&&(a=ql,a!==null)))throw a;t.memoizedState=i,t.baseState=o,t.baseQueue=r,l.lastRenderedState=i}return n===null&&(l.lanes=0),[t.memoizedState,l.dispatch]}function Vc(t){var e=it(),a=e.queue;if(a===null)throw Error(w(311));a.lastRenderedReducer=t;var l=a.dispatch,n=a.pending,i=e.memoizedState;if(n!==null){a.pending=null;var o=n=n.next;do i=t(i,o.action),o=o.next;while(o!==n);Ft(i,e.memoizedState)||(ft=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),a.lastRenderedState=i}return[i,l]}function vh(t,e,a){var l=O,n=it(),i=B;if(i){if(a===void 0)throw Error(w(407));a=a()}else a=e();var o=!Ft((Q||n).memoizedState,a);if(o&&(n.memoizedState=a,ft=!0),n=n.queue,Cs(wh.bind(null,l,n,t),[t]),n.getSnapshot!==e||o||ct!==null&&ct.memoizedState.tag&1){if(l.flags|=2048,Zl(9,{destroy:void 0},Sh.bind(null,l,n,a,e),null),X===null)throw Error(w(349));i||(Je&127)!==0||bh(l,e,a)}return a}function bh(t,e,a){t.flags|=16384,t={getSnapshot:e,value:a},e=O.updateQueue,e===null?(e=gu(),O.updateQueue=e,e.stores=[t]):(a=e.stores,a===null?e.stores=[t]:a.push(t))}function Sh(t,e,a,l){e.value=a,e.getSnapshot=l,xh(e)&&Eh(t)}function wh(t,e,a){return a(function(){xh(e)&&Eh(t)})}function xh(t){var e=t.getSnapshot;t=t.value;try{var a=e();return!Ft(t,a)}catch{return!0}}function Eh(t){var e=il(t,2);e!==null&&Ht(e,t,2)}function $r(t){var e=Ot();if(typeof t=="function"){var a=t;if(t=a(),tl){da(!0);try{a()}finally{da(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:We,lastRenderedState:t},e}function Th(t,e,a,l){return t.baseState=a,Ns(t,Q,typeof l=="function"?l:We)}function I1(t,e,a,l,n){if(bu(t))throw Error(w(485));if(t=e.action,t!==null){var i={payload:n,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(o){i.listeners.push(o)}};z.T!==null?a(!0):i.isTransition=!1,l(i),a=e.pending,a===null?(i.next=e.pending=i,Ah(e,i)):(i.next=a.next,e.pending=a.next=i)}}function Ah(t,e){var a=e.action,l=e.payload,n=t.state;if(e.isTransition){var i=z.T,o={};z.T=o;try{var u=a(n,l),r=z.S;r!==null&&r(o,u),Tp(t,e,u)}catch(p){Rr(t,e,p)}finally{i!==null&&o.types!==null&&(i.types=o.types),z.T=i}}else try{i=a(n,l),Tp(t,e,i)}catch(p){Rr(t,e,p)}}function Tp(t,e,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(l){Ap(t,e,l)},function(l){return Rr(t,e,l)}):Ap(t,e,a)}function Ap(t,e,a){e.status="fulfilled",e.value=a,_h(e),t.state=a,e=t.pending,e!==null&&(a=e.next,a===e?t.pending=null:(a=a.next,e.next=a,Ah(t,a)))}function Rr(t,e,a){var l=t.pending;if(t.pending=null,l!==null){l=l.next;do e.status="rejected",e.reason=a,_h(e),e=e.next;while(e!==l)}t.action=null}function _h(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Mh(t,e){return e}function _p(t,e){if(B){var a=X.formState;if(a!==null){t:{var l=O;if(B){if(F){e:{for(var n=F,i=ce;n.nodeType!==8;){if(!i){n=null;break e}if(n=se(n.nextSibling),n===null){n=null;break e}}i=n.data,n=i==="F!"||i==="F"?n:null}if(n){F=se(n.nextSibling),l=n.data==="F!";break t}}Ma(l)}l=!1}l&&(e=a[0])}}return a=Ot(),a.memoizedState=a.baseState=e,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Mh,lastRenderedState:e},a.queue=l,a=kh.bind(null,O,l),l.dispatch=a,l=$r(!1),i=Us.bind(null,O,!1,l.queue),l=Ot(),n={state:e,dispatch:null,action:t,pending:null},l.queue=n,a=I1.bind(null,O,n,i,a),n.dispatch=a,l.memoizedState=t,[e,a,!1]}function Mp(t){var e=it();return zh(e,Q,t)}function zh(t,e,a){if(e=Ns(t,e,Mh)[0],t=Ao(We)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var l=pi(e)}catch(o){throw o===an?hu:o}else l=e;e=it();var n=e.queue,i=n.dispatch;return a!==e.memoizedState&&(O.flags|=2048,Zl(9,{destroy:void 0},P1.bind(null,n,a),null)),[l,i,t]}function P1(t,e){t.action=e}function zp(t){var e=it(),a=Q;if(a!==null)return zh(e,a,t);it(),e=e.memoizedState,a=it();var l=a.queue.dispatch;return a.memoizedState=t,[e,l,!1]}function Zl(t,e,a,l){return t={tag:t,create:a,deps:l,inst:e,next:null},e=O.updateQueue,e===null&&(e=gu(),O.updateQueue=e),a=e.lastEffect,a===null?e.lastEffect=t.next=t:(l=a.next,a.next=t,t.next=l,e.lastEffect=t),t}function Nh(){return it().memoizedState}function _o(t,e,a,l){var n=Ot();O.flags|=t,n.memoizedState=Zl(1|e,{destroy:void 0},a,l===void 0?null:l)}function vu(t,e,a,l){var n=it();l=l===void 0?null:l;var i=n.memoizedState.inst;Q!==null&&l!==null&&Es(l,Q.memoizedState.deps)?n.memoizedState=Zl(e,i,a,l):(O.flags|=t,n.memoizedState=Zl(1|e,i,a,l))}function Np(t,e){_o(8390656,8,t,e)}function Cs(t,e){vu(2048,8,t,e)}function tb(t){O.flags|=4;var e=O.updateQueue;if(e===null)e=gu(),O.updateQueue=e,e.events=[t];else{var a=e.events;a===null?e.events=[t]:a.push(t)}}function Ch(t){var e=it().memoizedState;return tb({ref:e,nextImpl:t}),function(){if((Y&2)!==0)throw Error(w(440));return e.impl.apply(void 0,arguments)}}function Oh(t,e){return vu(4,2,t,e)}function $h(t,e){return vu(4,4,t,e)}function Rh(t,e){if(typeof e=="function"){t=t();var a=e(t);return function(){typeof a=="function"?a():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Uh(t,e,a){a=a!=null?a.concat([t]):null,vu(4,4,Rh.bind(null,e,t),a)}function Os(){}function Dh(t,e){var a=it();e=e===void 0?null:e;var l=a.memoizedState;return e!==null&&Es(e,l[1])?l[0]:(a.memoizedState=[t,e],t)}function Lh(t,e){var a=it();e=e===void 0?null:e;var l=a.memoizedState;if(e!==null&&Es(e,l[1]))return l[0];if(l=t(),tl){da(!0);try{t()}finally{da(!1)}}return a.memoizedState=[l,e],l}function $s(t,e,a){return a===void 0||(Je&1073741824)!==0&&(L&261930)===0?t.memoizedState=e:(t.memoizedState=a,t=Tg(),O.lanes|=t,Na|=t,a)}function Bh(t,e,a,l){return Ft(a,e)?a:Xl.current!==null?(t=$s(t,a,l),Ft(t,e)||(ft=!0),t):(Je&42)===0||(Je&1073741824)!==0&&(L&261930)===0?(ft=!0,t.memoizedState=a):(t=Tg(),O.lanes|=t,Na|=t,e)}function qh(t,e,a,l,n){var i=j.p;j.p=i!==0&&8>i?i:8;var o=z.T,u={};z.T=u,Us(t,!1,e,a);try{var r=n(),p=z.S;if(p!==null&&p(u,r),r!==null&&typeof r=="object"&&typeof r.then=="function"){var g=J1(r,l);Yn(t,e,g,Wt(t))}else Yn(t,e,l,Wt(t))}catch(v){Yn(t,e,{then:function(){},status:"rejected",reason:v},Wt())}finally{j.p=i,o!==null&&u.types!==null&&(o.types=u.types),z.T=o}}function eb(){}function Ur(t,e,a,l){if(t.tag!==5)throw Error(w(476));var n=Hh(t).queue;qh(t,n,e,Xa,a===null?eb:function(){return Yh(t),a(l)})}function Hh(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:Xa,baseState:Xa,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:We,lastRenderedState:Xa},next:null};var a={};return e.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:We,lastRenderedState:a},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function Yh(t){var e=Hh(t);e.next===null&&(e=t.alternate.memoizedState),Yn(t,e.next.queue,{},Wt())}function Rs(){return xt(li)}function jh(){return it().memoizedState}function Vh(){return it().memoizedState}function ab(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var a=Wt();t=ba(a);var l=Sa(e,t,a);l!==null&&(Ht(l,e,a),Bn(l,e,a)),e={cache:vs()},t.payload=e;return}e=e.return}}function lb(t,e,a){var l=Wt();a={lane:l,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},bu(t)?Gh(e,a):(a=ms(t,e,a,l),a!==null&&(Ht(a,t,l),Qh(a,e,l)))}function kh(t,e,a){var l=Wt();Yn(t,e,a,l)}function Yn(t,e,a,l){var n={lane:l,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(bu(t))Gh(e,n);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var o=e.lastRenderedState,u=i(o,a);if(n.hasEagerState=!0,n.eagerState=u,Ft(u,o))return mu(t,e,n,0),X===null&&pu(),!1}catch{}finally{}if(a=ms(t,e,n,l),a!==null)return Ht(a,t,l),Qh(a,e,l),!0}return!1}function Us(t,e,a,l){if(l={lane:2,revertLane:ks(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},bu(t)){if(e)throw Error(w(479))}else e=ms(t,a,l,2),e!==null&&Ht(e,t,2)}function bu(t){var e=t.alternate;return t===O||e!==null&&e===O}function Gh(t,e){Yl=Xo=!0;var a=t.pending;a===null?e.next=e:(e.next=a.next,a.next=e),t.pending=e}function Qh(t,e,a){if((a&4194048)!==0){var l=e.lanes;l&=t.pendingLanes,a|=l,e.lanes=a,Cm(t,a)}}var ti={readContext:xt,use:yu,useCallback:at,useContext:at,useEffect:at,useImperativeHandle:at,useLayoutEffect:at,useInsertionEffect:at,useMemo:at,useReducer:at,useRef:at,useState:at,useDebugValue:at,useDeferredValue:at,useTransition:at,useSyncExternalStore:at,useId:at,useHostTransitionStatus:at,useFormState:at,useActionState:at,useOptimistic:at,useMemoCache:at,useCacheRefresh:at};ti.useEffectEvent=at;var Xh={readContext:xt,use:yu,useCallback:function(t,e){return Ot().memoizedState=[t,e===void 0?null:e],t},useContext:xt,useEffect:Np,useImperativeHandle:function(t,e,a){a=a!=null?a.concat([t]):null,_o(4194308,4,Rh.bind(null,e,t),a)},useLayoutEffect:function(t,e){return _o(4194308,4,t,e)},useInsertionEffect:function(t,e){_o(4,2,t,e)},useMemo:function(t,e){var a=Ot();e=e===void 0?null:e;var l=t();if(tl){da(!0);try{t()}finally{da(!1)}}return a.memoizedState=[l,e],l},useReducer:function(t,e,a){var l=Ot();if(a!==void 0){var n=a(e);if(tl){da(!0);try{a(e)}finally{da(!1)}}}else n=e;return l.memoizedState=l.baseState=n,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:n},l.queue=t,t=t.dispatch=lb.bind(null,O,t),[l.memoizedState,t]},useRef:function(t){var e=Ot();return t={current:t},e.memoizedState=t},useState:function(t){t=$r(t);var e=t.queue,a=kh.bind(null,O,e);return e.dispatch=a,[t.memoizedState,a]},useDebugValue:Os,useDeferredValue:function(t,e){var a=Ot();return $s(a,t,e)},useTransition:function(){var t=$r(!1);return t=qh.bind(null,O,t.queue,!0,!1),Ot().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,a){var l=O,n=Ot();if(B){if(a===void 0)throw Error(w(407));a=a()}else{if(a=e(),X===null)throw Error(w(349));(L&127)!==0||bh(l,e,a)}n.memoizedState=a;var i={value:a,getSnapshot:e};return n.queue=i,Np(wh.bind(null,l,i,t),[t]),l.flags|=2048,Zl(9,{destroy:void 0},Sh.bind(null,l,i,a,e),null),a},useId:function(){var t=Ot(),e=X.identifierPrefix;if(B){var a=Ae,l=Te;a=(l&~(1<<32-Jt(l)-1)).toString(32)+a,e="_"+e+"R_"+a,a=Zo++,0<a&&(e+="H"+a.toString(32)),e+="_"}else a=W1++,e="_"+e+"r_"+a.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:Rs,useFormState:_p,useActionState:_p,useOptimistic:function(t){var e=Ot();e.memoizedState=e.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=a,e=Us.bind(null,O,!0,a),a.dispatch=e,[t,e]},useMemoCache:zs,useCacheRefresh:function(){return Ot().memoizedState=ab.bind(null,O)},useEffectEvent:function(t){var e=Ot(),a={impl:t};return e.memoizedState=a,function(){if((Y&2)!==0)throw Error(w(440));return a.impl.apply(void 0,arguments)}}},Ds={readContext:xt,use:yu,useCallback:Dh,useContext:xt,useEffect:Cs,useImperativeHandle:Uh,useInsertionEffect:Oh,useLayoutEffect:$h,useMemo:Lh,useReducer:Ao,useRef:Nh,useState:function(){return Ao(We)},useDebugValue:Os,useDeferredValue:function(t,e){var a=it();return Bh(a,Q.memoizedState,t,e)},useTransition:function(){var t=Ao(We)[0],e=it().memoizedState;return[typeof t=="boolean"?t:pi(t),e]},useSyncExternalStore:vh,useId:jh,useHostTransitionStatus:Rs,useFormState:Mp,useActionState:Mp,useOptimistic:function(t,e){var a=it();return Th(a,Q,t,e)},useMemoCache:zs,useCacheRefresh:Vh};Ds.useEffectEvent=Ch;var Zh={readContext:xt,use:yu,useCallback:Dh,useContext:xt,useEffect:Cs,useImperativeHandle:Uh,useInsertionEffect:Oh,useLayoutEffect:$h,useMemo:Lh,useReducer:Vc,useRef:Nh,useState:function(){return Vc(We)},useDebugValue:Os,useDeferredValue:function(t,e){var a=it();return Q===null?$s(a,t,e):Bh(a,Q.memoizedState,t,e)},useTransition:function(){var t=Vc(We)[0],e=it().memoizedState;return[typeof t=="boolean"?t:pi(t),e]},useSyncExternalStore:vh,useId:jh,useHostTransitionStatus:Rs,useFormState:zp,useActionState:zp,useOptimistic:function(t,e){var a=it();return Q!==null?Th(a,Q,t,e):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:zs,useCacheRefresh:Vh};Zh.useEffectEvent=Ch;function kc(t,e,a,l){e=t.memoizedState,a=a(l,e),a=a==null?e:I({},e,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var Dr={enqueueSetState:function(t,e,a){t=t._reactInternals;var l=Wt(),n=ba(l);n.payload=e,a!=null&&(n.callback=a),e=Sa(t,n,l),e!==null&&(Ht(e,t,l),Bn(e,t,l))},enqueueReplaceState:function(t,e,a){t=t._reactInternals;var l=Wt(),n=ba(l);n.tag=1,n.payload=e,a!=null&&(n.callback=a),e=Sa(t,n,l),e!==null&&(Ht(e,t,l),Bn(e,t,l))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var a=Wt(),l=ba(a);l.tag=2,e!=null&&(l.callback=e),e=Sa(t,l,a),e!==null&&(Ht(e,t,a),Bn(e,t,a))}};function Cp(t,e,a,l,n,i,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(l,i,o):e.prototype&&e.prototype.isPureReactComponent?!Jn(a,l)||!Jn(n,i):!0}function Op(t,e,a,l){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(a,l),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(a,l),e.state!==t&&Dr.enqueueReplaceState(e,e.state,null)}function el(t,e){var a=e;if("ref"in e){a={};for(var l in e)l!=="ref"&&(a[l]=e[l])}if(t=t.defaultProps){a===e&&(a=I({},a));for(var n in t)a[n]===void 0&&(a[n]=t[n])}return a}function Kh(t){Ho(t)}function Jh(t){console.error(t)}function Wh(t){Ho(t)}function Ko(t,e){try{var a=t.onUncaughtError;a(e.value,{componentStack:e.stack})}catch(l){setTimeout(function(){throw l})}}function $p(t,e,a){try{var l=t.onCaughtError;l(a.value,{componentStack:a.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(n){setTimeout(function(){throw n})}}function Lr(t,e,a){return a=ba(a),a.tag=3,a.payload={element:null},a.callback=function(){Ko(t,e)},a}function Fh(t){return t=ba(t),t.tag=3,t}function Ih(t,e,a,l){var n=a.type.getDerivedStateFromError;if(typeof n=="function"){var i=l.value;t.payload=function(){return n(i)},t.callback=function(){$p(e,a,l)}}var o=a.stateNode;o!==null&&typeof o.componentDidCatch=="function"&&(t.callback=function(){$p(e,a,l),typeof n!="function"&&(wa===null?wa=new Set([this]):wa.add(this));var u=l.stack;this.componentDidCatch(l.value,{componentStack:u!==null?u:""})})}function nb(t,e,a,l,n){if(a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(e=a.alternate,e!==null&&en(e,a,n,!0),a=It.current,a!==null){switch(a.tag){case 31:case 13:return re===null?Po():a.alternate===null&&lt===0&&(lt=3),a.flags&=-257,a.flags|=65536,a.lanes=n,l===ko?a.flags|=16384:(e=a.updateQueue,e===null?a.updateQueue=new Set([l]):e.add(l),tr(t,l,n)),!1;case 22:return a.flags|=65536,l===ko?a.flags|=16384:(e=a.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([l])},a.updateQueue=e):(a=e.retryQueue,a===null?e.retryQueue=new Set([l]):a.add(l)),tr(t,l,n)),!1}throw Error(w(435,a.tag))}return tr(t,l,n),Po(),!1}if(B)return e=It.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=n,l!==Er&&(t=Error(w(422),{cause:l}),Fn(ue(t,a)))):(l!==Er&&(e=Error(w(423),{cause:l}),Fn(ue(e,a))),t=t.current.alternate,t.flags|=65536,n&=-n,t.lanes|=n,l=ue(l,a),n=Lr(t.stateNode,l,n),jc(t,n),lt!==4&&(lt=2)),!1;var i=Error(w(520),{cause:l});if(i=ue(i,a),kn===null?kn=[i]:kn.push(i),lt!==4&&(lt=2),e===null)return!0;l=ue(l,a),a=e;do{switch(a.tag){case 3:return a.flags|=65536,t=n&-n,a.lanes|=t,t=Lr(a.stateNode,l,t),jc(a,t),!1;case 1:if(e=a.type,i=a.stateNode,(a.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(wa===null||!wa.has(i))))return a.flags|=65536,n&=-n,a.lanes|=n,n=Fh(n),Ih(n,t,a,l),jc(a,n),!1}a=a.return}while(a!==null);return!1}var Ls=Error(w(461)),ft=!1;function bt(t,e,a,l){e.child=t===null?dh(e,null,a,l):Pa(e,t.child,a,l)}function Rp(t,e,a,l,n){a=a.render;var i=e.ref;if("ref"in l){var o={};for(var u in l)u!=="ref"&&(o[u]=l[u])}else o=l;return Ia(e),l=Ts(t,e,a,o,i,n),u=As(),t!==null&&!ft?(_s(t,e,n),Fe(t,e,n)):(B&&u&&gs(e),e.flags|=1,bt(t,e,l,n),e.child)}function Up(t,e,a,l,n){if(t===null){var i=a.type;return typeof i=="function"&&!hs(i)&&i.defaultProps===void 0&&a.compare===null?(e.tag=15,e.type=i,Ph(t,e,i,l,n)):(t=Eo(a.type,null,l,e,e.mode,n),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!Bs(t,n)){var o=i.memoizedProps;if(a=a.compare,a=a!==null?a:Jn,a(o,l)&&t.ref===e.ref)return Fe(t,e,n)}return e.flags|=1,t=Qe(i,l),t.ref=e.ref,t.return=e,e.child=t}function Ph(t,e,a,l,n){if(t!==null){var i=t.memoizedProps;if(Jn(i,l)&&t.ref===e.ref)if(ft=!1,e.pendingProps=l=i,Bs(t,n))(t.flags&131072)!==0&&(ft=!0);else return e.lanes=t.lanes,Fe(t,e,n)}return Br(t,e,a,l,n)}function tg(t,e,a,l){var n=l.children,i=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((e.flags&128)!==0){if(i=i!==null?i.baseLanes|a:a,t!==null){for(l=e.child=t.child,n=0;l!==null;)n=n|l.lanes|l.childLanes,l=l.sibling;l=n&~i}else l=0,e.child=null;return Dp(t,e,i,a,l)}if((a&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&To(e,i!==null?i.cachePool:null),i!==null?Ep(e,i):Cr(),hh(e);else return l=e.lanes=536870912,Dp(t,e,i!==null?i.baseLanes|a:a,a,l)}else i!==null?(To(e,i.cachePool),Ep(e,i),sa(e),e.memoizedState=null):(t!==null&&To(e,null),Cr(),sa(e));return bt(t,e,n,a),e.child}function On(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function Dp(t,e,a,l,n){var i=bs();return i=i===null?null:{parent:st._currentValue,pool:i},e.memoizedState={baseLanes:a,cachePool:i},t!==null&&To(e,null),Cr(),hh(e),t!==null&&en(t,e,l,!0),e.childLanes=n,null}function Mo(t,e){return e=Jo({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Lp(t,e,a){return Pa(e,t.child,null,a),t=Mo(e,e.pendingProps),t.flags|=2,Gt(e),e.memoizedState=null,t}function ib(t,e,a){var l=e.pendingProps,n=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(B){if(l.mode==="hidden")return t=Mo(e,l),e.lanes=536870912,On(null,t);if(Or(e),(t=F)?(t=Xg(t,ce),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:_a!==null?{id:Te,overflow:Ae}:null,retryLane:536870912,hydrationErrors:null},a=ih(t),a.return=e,e.child=a,wt=e,F=null)):t=null,t===null)throw Ma(e);return e.lanes=536870912,null}return Mo(e,l)}var i=t.memoizedState;if(i!==null){var o=i.dehydrated;if(Or(e),n)if(e.flags&256)e.flags&=-257,e=Lp(t,e,a);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(w(558));else if(ft||en(t,e,a,!1),n=(a&t.childLanes)!==0,ft||n){if(l=X,l!==null&&(o=Om(l,a),o!==0&&o!==i.retryLane))throw i.retryLane=o,il(t,o),Ht(l,t,o),Ls;Po(),e=Lp(t,e,a)}else t=i.treeContext,F=se(o.nextSibling),wt=e,B=!0,va=null,ce=!1,t!==null&&uh(e,t),e=Mo(e,l),e.flags|=4096;return e}return t=Qe(t.child,{mode:l.mode,children:l.children}),t.ref=e.ref,e.child=t,t.return=e,t}function zo(t,e){var a=e.ref;if(a===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(w(284));(t===null||t.ref!==a)&&(e.flags|=4194816)}}function Br(t,e,a,l,n){return Ia(e),a=Ts(t,e,a,l,void 0,n),l=As(),t!==null&&!ft?(_s(t,e,n),Fe(t,e,n)):(B&&l&&gs(e),e.flags|=1,bt(t,e,a,n),e.child)}function Bp(t,e,a,l,n,i){return Ia(e),e.updateQueue=null,a=yh(e,l,a,n),gh(t),l=As(),t!==null&&!ft?(_s(t,e,i),Fe(t,e,i)):(B&&l&&gs(e),e.flags|=1,bt(t,e,a,i),e.child)}function qp(t,e,a,l,n){if(Ia(e),e.stateNode===null){var i=Ol,o=a.contextType;typeof o=="object"&&o!==null&&(i=xt(o)),i=new a(l,i),e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Dr,e.stateNode=i,i._reactInternals=e,i=e.stateNode,i.props=l,i.state=e.memoizedState,i.refs={},ws(e),o=a.contextType,i.context=typeof o=="object"&&o!==null?xt(o):Ol,i.state=e.memoizedState,o=a.getDerivedStateFromProps,typeof o=="function"&&(kc(e,a,o,l),i.state=e.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(o=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),o!==i.state&&Dr.enqueueReplaceState(i,i.state,null),Hn(e,l,i,n),qn(),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308),l=!0}else if(t===null){i=e.stateNode;var u=e.memoizedProps,r=el(a,u);i.props=r;var p=i.context,g=a.contextType;o=Ol,typeof g=="object"&&g!==null&&(o=xt(g));var v=a.getDerivedStateFromProps;g=typeof v=="function"||typeof i.getSnapshotBeforeUpdate=="function",u=e.pendingProps!==u,g||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(u||p!==o)&&Op(e,i,l,o),ua=!1;var m=e.memoizedState;i.state=m,Hn(e,l,i,n),qn(),p=e.memoizedState,u||m!==p||ua?(typeof v=="function"&&(kc(e,a,v,l),p=e.memoizedState),(r=ua||Cp(e,a,r,l,m,p,o))?(g||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(e.flags|=4194308)):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=l,e.memoizedState=p),i.props=l,i.state=p,i.context=o,l=r):(typeof i.componentDidMount=="function"&&(e.flags|=4194308),l=!1)}else{i=e.stateNode,zr(t,e),o=e.memoizedProps,g=el(a,o),i.props=g,v=e.pendingProps,m=i.context,p=a.contextType,r=Ol,typeof p=="object"&&p!==null&&(r=xt(p)),u=a.getDerivedStateFromProps,(p=typeof u=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(o!==v||m!==r)&&Op(e,i,l,r),ua=!1,m=e.memoizedState,i.state=m,Hn(e,l,i,n),qn();var y=e.memoizedState;o!==v||m!==y||ua||t!==null&&t.dependencies!==null&&Vo(t.dependencies)?(typeof u=="function"&&(kc(e,a,u,l),y=e.memoizedState),(g=ua||Cp(e,a,g,l,m,y,r)||t!==null&&t.dependencies!==null&&Vo(t.dependencies))?(p||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(l,y,r),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(l,y,r)),typeof i.componentDidUpdate=="function"&&(e.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof i.componentDidUpdate!="function"||o===t.memoizedProps&&m===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&m===t.memoizedState||(e.flags|=1024),e.memoizedProps=l,e.memoizedState=y),i.props=l,i.state=y,i.context=r,l=g):(typeof i.componentDidUpdate!="function"||o===t.memoizedProps&&m===t.memoizedState||(e.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&m===t.memoizedState||(e.flags|=1024),l=!1)}return i=l,zo(t,e),l=(e.flags&128)!==0,i||l?(i=e.stateNode,a=l&&typeof a.getDerivedStateFromError!="function"?null:i.render(),e.flags|=1,t!==null&&l?(e.child=Pa(e,t.child,null,n),e.child=Pa(e,null,a,n)):bt(t,e,a,n),e.memoizedState=i.state,t=e.child):t=Fe(t,e,n),t}function Hp(t,e,a,l){return Fa(),e.flags|=256,bt(t,e,a,l),e.child}var Gc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Qc(t){return{baseLanes:t,cachePool:rh()}}function Xc(t,e,a){return t=t!==null?t.childLanes&~a:0,e&&(t|=Xt),t}function eg(t,e,a){var l=e.pendingProps,n=!1,i=(e.flags&128)!==0,o;if((o=i)||(o=t!==null&&t.memoizedState===null?!1:(nt.current&2)!==0),o&&(n=!0,e.flags&=-129),o=(e.flags&32)!==0,e.flags&=-33,t===null){if(B){if(n?ra(e):sa(e),(t=F)?(t=Xg(t,ce),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:_a!==null?{id:Te,overflow:Ae}:null,retryLane:536870912,hydrationErrors:null},a=ih(t),a.return=e,e.child=a,wt=e,F=null)):t=null,t===null)throw Ma(e);return Fr(t)?e.lanes=32:e.lanes=536870912,null}var u=l.children;return l=l.fallback,n?(sa(e),n=e.mode,u=Jo({mode:"hidden",children:u},n),l=Za(l,n,a,null),u.return=e,l.return=e,u.sibling=l,e.child=u,l=e.child,l.memoizedState=Qc(a),l.childLanes=Xc(t,o,a),e.memoizedState=Gc,On(null,l)):(ra(e),qr(e,u))}var r=t.memoizedState;if(r!==null&&(u=r.dehydrated,u!==null)){if(i)e.flags&256?(ra(e),e.flags&=-257,e=Zc(t,e,a)):e.memoizedState!==null?(sa(e),e.child=t.child,e.flags|=128,e=null):(sa(e),u=l.fallback,n=e.mode,l=Jo({mode:"visible",children:l.children},n),u=Za(u,n,a,null),u.flags|=2,l.return=e,u.return=e,l.sibling=u,e.child=l,Pa(e,t.child,null,a),l=e.child,l.memoizedState=Qc(a),l.childLanes=Xc(t,o,a),e.memoizedState=Gc,e=On(null,l));else if(ra(e),Fr(u)){if(o=u.nextSibling&&u.nextSibling.dataset,o)var p=o.dgst;o=p,l=Error(w(419)),l.stack="",l.digest=o,Fn({value:l,source:null,stack:null}),e=Zc(t,e,a)}else if(ft||en(t,e,a,!1),o=(a&t.childLanes)!==0,ft||o){if(o=X,o!==null&&(l=Om(o,a),l!==0&&l!==r.retryLane))throw r.retryLane=l,il(t,l),Ht(o,t,l),Ls;Wr(u)||Po(),e=Zc(t,e,a)}else Wr(u)?(e.flags|=192,e.child=t.child,e=null):(t=r.treeContext,F=se(u.nextSibling),wt=e,B=!0,va=null,ce=!1,t!==null&&uh(e,t),e=qr(e,l.children),e.flags|=4096);return e}return n?(sa(e),u=l.fallback,n=e.mode,r=t.child,p=r.sibling,l=Qe(r,{mode:"hidden",children:l.children}),l.subtreeFlags=r.subtreeFlags&65011712,p!==null?u=Qe(p,u):(u=Za(u,n,a,null),u.flags|=2),u.return=e,l.return=e,l.sibling=u,e.child=l,On(null,l),l=e.child,u=t.child.memoizedState,u===null?u=Qc(a):(n=u.cachePool,n!==null?(r=st._currentValue,n=n.parent!==r?{parent:r,pool:r}:n):n=rh(),u={baseLanes:u.baseLanes|a,cachePool:n}),l.memoizedState=u,l.childLanes=Xc(t,o,a),e.memoizedState=Gc,On(t.child,l)):(ra(e),a=t.child,t=a.sibling,a=Qe(a,{mode:"visible",children:l.children}),a.return=e,a.sibling=null,t!==null&&(o=e.deletions,o===null?(e.deletions=[t],e.flags|=16):o.push(t)),e.child=a,e.memoizedState=null,a)}function qr(t,e){return e=Jo({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Jo(t,e){return t=Qt(22,t,null,e),t.lanes=0,t}function Zc(t,e,a){return Pa(e,t.child,null,a),t=qr(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Yp(t,e,a){t.lanes|=e;var l=t.alternate;l!==null&&(l.lanes|=e),Ar(t.return,e,a)}function Kc(t,e,a,l,n,i){var o=t.memoizedState;o===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:l,tail:a,tailMode:n,treeForkCount:i}:(o.isBackwards=e,o.rendering=null,o.renderingStartTime=0,o.last=l,o.tail=a,o.tailMode=n,o.treeForkCount=i)}function ag(t,e,a){var l=e.pendingProps,n=l.revealOrder,i=l.tail;l=l.children;var o=nt.current,u=(o&2)!==0;if(u?(o=o&1|2,e.flags|=128):o&=1,K(nt,o),bt(t,e,l,a),l=B?Wn:0,!u&&t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Yp(t,a,e);else if(t.tag===19)Yp(t,a,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(n){case"forwards":for(a=e.child,n=null;a!==null;)t=a.alternate,t!==null&&Qo(t)===null&&(n=a),a=a.sibling;a=n,a===null?(n=e.child,e.child=null):(n=a.sibling,a.sibling=null),Kc(e,!1,n,a,i,l);break;case"backwards":case"unstable_legacy-backwards":for(a=null,n=e.child,e.child=null;n!==null;){if(t=n.alternate,t!==null&&Qo(t)===null){e.child=n;break}t=n.sibling,n.sibling=a,a=n,n=t}Kc(e,!0,a,null,i,l);break;case"together":Kc(e,!1,null,null,void 0,l);break;default:e.memoizedState=null}return e.child}function Fe(t,e,a){if(t!==null&&(e.dependencies=t.dependencies),Na|=e.lanes,(a&e.childLanes)===0)if(t!==null){if(en(t,e,a,!1),(a&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(w(153));if(e.child!==null){for(t=e.child,a=Qe(t,t.pendingProps),e.child=a,a.return=e;t.sibling!==null;)t=t.sibling,a=a.sibling=Qe(t,t.pendingProps),a.return=e;a.sibling=null}return e.child}function Bs(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&Vo(t)))}function ob(t,e,a){switch(e.tag){case 3:Do(e,e.stateNode.containerInfo),ca(e,st,t.memoizedState.cache),Fa();break;case 27:case 5:dr(e);break;case 4:Do(e,e.stateNode.containerInfo);break;case 10:ca(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,Or(e),null;break;case 13:var l=e.memoizedState;if(l!==null)return l.dehydrated!==null?(ra(e),e.flags|=128,null):(a&e.child.childLanes)!==0?eg(t,e,a):(ra(e),t=Fe(t,e,a),t!==null?t.sibling:null);ra(e);break;case 19:var n=(t.flags&128)!==0;if(l=(a&e.childLanes)!==0,l||(en(t,e,a,!1),l=(a&e.childLanes)!==0),n){if(l)return ag(t,e,a);e.flags|=128}if(n=e.memoizedState,n!==null&&(n.rendering=null,n.tail=null,n.lastEffect=null),K(nt,nt.current),l)break;return null;case 22:return e.lanes=0,tg(t,e,a,e.pendingProps);case 24:ca(e,st,t.memoizedState.cache)}return Fe(t,e,a)}function lg(t,e,a){if(t!==null)if(t.memoizedProps!==e.pendingProps)ft=!0;else{if(!Bs(t,a)&&(e.flags&128)===0)return ft=!1,ob(t,e,a);ft=(t.flags&131072)!==0}else ft=!1,B&&(e.flags&1048576)!==0&&oh(e,Wn,e.index);switch(e.lanes=0,e.tag){case 16:t:{var l=e.pendingProps;if(t=Ga(e.elementType),e.type=t,typeof t=="function")hs(t)?(l=el(t,l),e.tag=1,e=qp(null,e,t,l,a)):(e.tag=0,e=Br(null,e,t,l,a));else{if(t!=null){var n=t.$$typeof;if(n===es){e.tag=11,e=Rp(null,e,t,l,a);break t}else if(n===as){e.tag=14,e=Up(null,e,t,l,a);break t}}throw e=sr(t)||t,Error(w(306,e,""))}}return e;case 0:return Br(t,e,e.type,e.pendingProps,a);case 1:return l=e.type,n=el(l,e.pendingProps),qp(t,e,l,n,a);case 3:t:{if(Do(e,e.stateNode.containerInfo),t===null)throw Error(w(387));l=e.pendingProps;var i=e.memoizedState;n=i.element,zr(t,e),Hn(e,l,null,a);var o=e.memoizedState;if(l=o.cache,ca(e,st,l),l!==i.cache&&_r(e,[st],a,!0),qn(),l=o.element,i.isDehydrated)if(i={element:l,isDehydrated:!1,cache:o.cache},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){e=Hp(t,e,l,a);break t}else if(l!==n){n=ue(Error(w(424)),e),Fn(n),e=Hp(t,e,l,a);break t}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(F=se(t.firstChild),wt=e,B=!0,va=null,ce=!0,a=dh(e,null,l,a),e.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(Fa(),l===n){e=Fe(t,e,a);break t}bt(t,e,l,a)}e=e.child}return e;case 26:return zo(t,e),t===null?(a=cm(e.type,null,e.pendingProps,null))?e.memoizedState=a:B||(a=e.type,t=e.pendingProps,l=lu(ya.current).createElement(a),l[St]=e,l[Yt]=t,Et(l,a,t),gt(l),e.stateNode=l):e.memoizedState=cm(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return dr(e),t===null&&B&&(l=e.stateNode=Zg(e.type,e.pendingProps,ya.current),wt=e,ce=!0,n=F,Oa(e.type)?(Ir=n,F=se(l.firstChild)):F=n),bt(t,e,e.pendingProps.children,a),zo(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&B&&((n=l=F)&&(l=Ub(l,e.type,e.pendingProps,ce),l!==null?(e.stateNode=l,wt=e,F=se(l.firstChild),ce=!1,n=!0):n=!1),n||Ma(e)),dr(e),n=e.type,i=e.pendingProps,o=t!==null?t.memoizedProps:null,l=i.children,Kr(n,i)?l=null:o!==null&&Kr(n,o)&&(e.flags|=32),e.memoizedState!==null&&(n=Ts(t,e,F1,null,null,a),li._currentValue=n),zo(t,e),bt(t,e,l,a),e.child;case 6:return t===null&&B&&((t=a=F)&&(a=Db(a,e.pendingProps,ce),a!==null?(e.stateNode=a,wt=e,F=null,t=!0):t=!1),t||Ma(e)),null;case 13:return eg(t,e,a);case 4:return Do(e,e.stateNode.containerInfo),l=e.pendingProps,t===null?e.child=Pa(e,null,l,a):bt(t,e,l,a),e.child;case 11:return Rp(t,e,e.type,e.pendingProps,a);case 7:return bt(t,e,e.pendingProps,a),e.child;case 8:return bt(t,e,e.pendingProps.children,a),e.child;case 12:return bt(t,e,e.pendingProps.children,a),e.child;case 10:return l=e.pendingProps,ca(e,e.type,l.value),bt(t,e,l.children,a),e.child;case 9:return n=e.type._context,l=e.pendingProps.children,Ia(e),n=xt(n),l=l(n),e.flags|=1,bt(t,e,l,a),e.child;case 14:return Up(t,e,e.type,e.pendingProps,a);case 15:return Ph(t,e,e.type,e.pendingProps,a);case 19:return ag(t,e,a);case 31:return ib(t,e,a);case 22:return tg(t,e,a,e.pendingProps);case 24:return Ia(e),l=xt(st),t===null?(n=bs(),n===null&&(n=X,i=vs(),n.pooledCache=i,i.refCount++,i!==null&&(n.pooledCacheLanes|=a),n=i),e.memoizedState={parent:l,cache:n},ws(e),ca(e,st,n)):((t.lanes&a)!==0&&(zr(t,e),Hn(e,null,null,a),qn()),n=t.memoizedState,i=e.memoizedState,n.parent!==l?(n={parent:l,cache:l},e.memoizedState=n,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=n),ca(e,st,l)):(l=i.cache,ca(e,st,l),l!==n.cache&&_r(e,[st],a,!0))),bt(t,e,e.pendingProps.children,a),e.child;case 29:throw e.pendingProps}throw Error(w(156,e.tag))}function Le(t){t.flags|=4}function Jc(t,e,a,l,n){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(n&335544128)===n)if(t.stateNode.complete)t.flags|=8192;else if(Mg())t.flags|=8192;else throw Ja=ko,Ss}else t.flags&=-16777217}function jp(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Wg(e))if(Mg())t.flags|=8192;else throw Ja=ko,Ss}function fo(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?zm():536870912,t.lanes|=e,Kl|=e)}function Tn(t,e){if(!B)switch(t.tailMode){case"hidden":e=t.tail;for(var a=null;e!==null;)e.alternate!==null&&(a=e),e=e.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var l=null;a!==null;)a.alternate!==null&&(l=a),a=a.sibling;l===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:l.sibling=null}}function W(t){var e=t.alternate!==null&&t.alternate.child===t.child,a=0,l=0;if(e)for(var n=t.child;n!==null;)a|=n.lanes|n.childLanes,l|=n.subtreeFlags&65011712,l|=n.flags&65011712,n.return=t,n=n.sibling;else for(n=t.child;n!==null;)a|=n.lanes|n.childLanes,l|=n.subtreeFlags,l|=n.flags,n.return=t,n=n.sibling;return t.subtreeFlags|=l,t.childLanes=a,e}function ub(t,e,a){var l=e.pendingProps;switch(ys(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return W(e),null;case 1:return W(e),null;case 3:return a=e.stateNode,l=null,t!==null&&(l=t.memoizedState.cache),e.memoizedState.cache!==l&&(e.flags|=2048),Xe(st),Vl(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(bl(e)?Le(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Yc())),W(e),null;case 26:var n=e.type,i=e.memoizedState;return t===null?(Le(e),i!==null?(W(e),jp(e,i)):(W(e),Jc(e,n,null,l,a))):i?i!==t.memoizedState?(Le(e),W(e),jp(e,i)):(W(e),e.flags&=-16777217):(t=t.memoizedProps,t!==l&&Le(e),W(e),Jc(e,n,t,l,a)),null;case 27:if(Lo(e),a=ya.current,n=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==l&&Le(e);else{if(!l){if(e.stateNode===null)throw Error(w(166));return W(e),null}t=Me.current,bl(e)?gp(e,t):(t=Zg(n,l,a),e.stateNode=t,Le(e))}return W(e),null;case 5:if(Lo(e),n=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==l&&Le(e);else{if(!l){if(e.stateNode===null)throw Error(w(166));return W(e),null}if(i=Me.current,bl(e))gp(e,i);else{var o=lu(ya.current);switch(i){case 1:i=o.createElementNS("http://www.w3.org/2000/svg",n);break;case 2:i=o.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;default:switch(n){case"svg":i=o.createElementNS("http://www.w3.org/2000/svg",n);break;case"math":i=o.createElementNS("http://www.w3.org/1998/Math/MathML",n);break;case"script":i=o.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof l.is=="string"?o.createElement("select",{is:l.is}):o.createElement("select"),l.multiple?i.multiple=!0:l.size&&(i.size=l.size);break;default:i=typeof l.is=="string"?o.createElement(n,{is:l.is}):o.createElement(n)}}i[St]=e,i[Yt]=l;t:for(o=e.child;o!==null;){if(o.tag===5||o.tag===6)i.appendChild(o.stateNode);else if(o.tag!==4&&o.tag!==27&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===e)break t;for(;o.sibling===null;){if(o.return===null||o.return===e)break t;o=o.return}o.sibling.return=o.return,o=o.sibling}e.stateNode=i;t:switch(Et(i,n,l),n){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break t;case"img":l=!0;break t;default:l=!1}l&&Le(e)}}return W(e),Jc(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,a),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==l&&Le(e);else{if(typeof l!="string"&&e.stateNode===null)throw Error(w(166));if(t=ya.current,bl(e)){if(t=e.stateNode,a=e.memoizedProps,l=null,n=wt,n!==null)switch(n.tag){case 27:case 5:l=n.memoizedProps}t[St]=e,t=!!(t.nodeValue===a||l!==null&&l.suppressHydrationWarning===!0||kg(t.nodeValue,a)),t||Ma(e,!0)}else t=lu(t).createTextNode(l),t[St]=e,e.stateNode=t}return W(e),null;case 31:if(a=e.memoizedState,t===null||t.memoizedState!==null){if(l=bl(e),a!==null){if(t===null){if(!l)throw Error(w(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(w(557));t[St]=e}else Fa(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;W(e),t=!1}else a=Yc(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return e.flags&256?(Gt(e),e):(Gt(e),null);if((e.flags&128)!==0)throw Error(w(558))}return W(e),null;case 13:if(l=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(n=bl(e),l!==null&&l.dehydrated!==null){if(t===null){if(!n)throw Error(w(318));if(n=e.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(w(317));n[St]=e}else Fa(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;W(e),n=!1}else n=Yc(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),n=!0;if(!n)return e.flags&256?(Gt(e),e):(Gt(e),null)}return Gt(e),(e.flags&128)!==0?(e.lanes=a,e):(a=l!==null,t=t!==null&&t.memoizedState!==null,a&&(l=e.child,n=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(n=l.alternate.memoizedState.cachePool.pool),i=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(i=l.memoizedState.cachePool.pool),i!==n&&(l.flags|=2048)),a!==t&&a&&(e.child.flags|=8192),fo(e,e.updateQueue),W(e),null);case 4:return Vl(),t===null&&Gs(e.stateNode.containerInfo),W(e),null;case 10:return Xe(e.type),W(e),null;case 19:if(yt(nt),l=e.memoizedState,l===null)return W(e),null;if(n=(e.flags&128)!==0,i=l.rendering,i===null)if(n)Tn(l,!1);else{if(lt!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(i=Qo(t),i!==null){for(e.flags|=128,Tn(l,!1),t=i.updateQueue,e.updateQueue=t,fo(e,t),e.subtreeFlags=0,t=a,a=e.child;a!==null;)nh(a,t),a=a.sibling;return K(nt,nt.current&1|2),B&&Ye(e,l.treeForkCount),e.child}t=t.sibling}l.tail!==null&&Zt()>Fo&&(e.flags|=128,n=!0,Tn(l,!1),e.lanes=4194304)}else{if(!n)if(t=Qo(i),t!==null){if(e.flags|=128,n=!0,t=t.updateQueue,e.updateQueue=t,fo(e,t),Tn(l,!0),l.tail===null&&l.tailMode==="hidden"&&!i.alternate&&!B)return W(e),null}else 2*Zt()-l.renderingStartTime>Fo&&a!==536870912&&(e.flags|=128,n=!0,Tn(l,!1),e.lanes=4194304);l.isBackwards?(i.sibling=e.child,e.child=i):(t=l.last,t!==null?t.sibling=i:e.child=i,l.last=i)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=Zt(),t.sibling=null,a=nt.current,K(nt,n?a&1|2:a&1),B&&Ye(e,l.treeForkCount),t):(W(e),null);case 22:case 23:return Gt(e),xs(),l=e.memoizedState!==null,t!==null?t.memoizedState!==null!==l&&(e.flags|=8192):l&&(e.flags|=8192),l?(a&536870912)!==0&&(e.flags&128)===0&&(W(e),e.subtreeFlags&6&&(e.flags|=8192)):W(e),a=e.updateQueue,a!==null&&fo(e,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),l=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(l=e.memoizedState.cachePool.pool),l!==a&&(e.flags|=2048),t!==null&&yt(Ka),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),e.memoizedState.cache!==a&&(e.flags|=2048),Xe(st),W(e),null;case 25:return null;case 30:return null}throw Error(w(156,e.tag))}function cb(t,e){switch(ys(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Xe(st),Vl(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return Lo(e),null;case 31:if(e.memoizedState!==null){if(Gt(e),e.alternate===null)throw Error(w(340));Fa()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(Gt(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(w(340));Fa()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return yt(nt),null;case 4:return Vl(),null;case 10:return Xe(e.type),null;case 22:case 23:return Gt(e),xs(),t!==null&&yt(Ka),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Xe(st),null;case 25:return null;default:return null}}function ng(t,e){switch(ys(e),e.tag){case 3:Xe(st),Vl();break;case 26:case 27:case 5:Lo(e);break;case 4:Vl();break;case 31:e.memoizedState!==null&&Gt(e);break;case 13:Gt(e);break;case 19:yt(nt);break;case 10:Xe(e.type);break;case 22:case 23:Gt(e),xs(),t!==null&&yt(Ka);break;case 24:Xe(st)}}function mi(t,e){try{var a=e.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var n=l.next;a=n;do{if((a.tag&t)===t){l=void 0;var i=a.create,o=a.inst;l=i(),o.destroy=l}a=a.next}while(a!==n)}}catch(u){k(e,e.return,u)}}function za(t,e,a){try{var l=e.updateQueue,n=l!==null?l.lastEffect:null;if(n!==null){var i=n.next;l=i;do{if((l.tag&t)===t){var o=l.inst,u=o.destroy;if(u!==void 0){o.destroy=void 0,n=e;var r=a,p=u;try{p()}catch(g){k(n,r,g)}}}l=l.next}while(l!==i)}}catch(g){k(e,e.return,g)}}function ig(t){var e=t.updateQueue;if(e!==null){var a=t.stateNode;try{mh(e,a)}catch(l){k(t,t.return,l)}}}function og(t,e,a){a.props=el(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(l){k(t,e,l)}}function jn(t,e){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var l=t.stateNode;break;case 30:l=t.stateNode;break;default:l=t.stateNode}typeof a=="function"?t.refCleanup=a(l):a.current=l}}catch(n){k(t,e,n)}}function _e(t,e){var a=t.ref,l=t.refCleanup;if(a!==null)if(typeof l=="function")try{l()}catch(n){k(t,e,n)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(n){k(t,e,n)}else a.current=null}function ug(t){var e=t.type,a=t.memoizedProps,l=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":a.autoFocus&&l.focus();break t;case"img":a.src?l.src=a.src:a.srcSet&&(l.srcset=a.srcSet)}}catch(n){k(t,t.return,n)}}function Wc(t,e,a){try{var l=t.stateNode;zb(l,t.type,a,e),l[Yt]=e}catch(n){k(t,t.return,n)}}function cg(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Oa(t.type)||t.tag===4}function Fc(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||cg(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Oa(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Hr(t,e,a){var l=t.tag;if(l===5||l===6)t=t.stateNode,e?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,e):(e=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,e.appendChild(t),a=a._reactRootContainer,a!=null||e.onclick!==null||(e.onclick=ke));else if(l!==4&&(l===27&&Oa(t.type)&&(a=t.stateNode,e=null),t=t.child,t!==null))for(Hr(t,e,a),t=t.sibling;t!==null;)Hr(t,e,a),t=t.sibling}function Wo(t,e,a){var l=t.tag;if(l===5||l===6)t=t.stateNode,e?a.insertBefore(t,e):a.appendChild(t);else if(l!==4&&(l===27&&Oa(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(Wo(t,e,a),t=t.sibling;t!==null;)Wo(t,e,a),t=t.sibling}function rg(t){var e=t.stateNode,a=t.memoizedProps;try{for(var l=t.type,n=e.attributes;n.length;)e.removeAttributeNode(n[0]);Et(e,l,a),e[St]=t,e[Yt]=a}catch(i){k(t,t.return,i)}}var je=!1,rt=!1,Ic=!1,Vp=typeof WeakSet=="function"?WeakSet:Set,ht=null;function rb(t,e){if(t=t.containerInfo,Xr=uu,t=Wm(t),ds(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else t:{a=(a=t.ownerDocument)&&a.defaultView||window;var l=a.getSelection&&a.getSelection();if(l&&l.rangeCount!==0){a=l.anchorNode;var n=l.anchorOffset,i=l.focusNode;l=l.focusOffset;try{a.nodeType,i.nodeType}catch{a=null;break t}var o=0,u=-1,r=-1,p=0,g=0,v=t,m=null;e:for(;;){for(var y;v!==a||n!==0&&v.nodeType!==3||(u=o+n),v!==i||l!==0&&v.nodeType!==3||(r=o+l),v.nodeType===3&&(o+=v.nodeValue.length),(y=v.firstChild)!==null;)m=v,v=y;for(;;){if(v===t)break e;if(m===a&&++p===n&&(u=o),m===i&&++g===l&&(r=o),(y=v.nextSibling)!==null)break;v=m,m=v.parentNode}v=y}a=u===-1||r===-1?null:{start:u,end:r}}else a=null}a=a||{start:0,end:0}}else a=null;for(Zr={focusedElem:t,selectionRange:a},uu=!1,ht=e;ht!==null;)if(e=ht,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,ht=t;else for(;ht!==null;){switch(e=ht,i=e.alternate,t=e.flags,e.tag){case 0:if((t&4)!==0&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(a=0;a<t.length;a++)n=t[a],n.ref.impl=n.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&i!==null){t=void 0,a=e,n=i.memoizedProps,i=i.memoizedState,l=a.stateNode;try{var E=el(a.type,n);t=l.getSnapshotBeforeUpdate(E,i),l.__reactInternalSnapshotBeforeUpdate=t}catch(_){k(a,a.return,_)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,a=t.nodeType,a===9)Jr(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Jr(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(w(163))}if(t=e.sibling,t!==null){t.return=e.return,ht=t;break}ht=e.return}}function sg(t,e,a){var l=a.flags;switch(a.tag){case 0:case 11:case 15:qe(t,a),l&4&&mi(5,a);break;case 1:if(qe(t,a),l&4)if(t=a.stateNode,e===null)try{t.componentDidMount()}catch(o){k(a,a.return,o)}else{var n=el(a.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(n,e,t.__reactInternalSnapshotBeforeUpdate)}catch(o){k(a,a.return,o)}}l&64&&ig(a),l&512&&jn(a,a.return);break;case 3:if(qe(t,a),l&64&&(t=a.updateQueue,t!==null)){if(e=null,a.child!==null)switch(a.child.tag){case 27:case 5:e=a.child.stateNode;break;case 1:e=a.child.stateNode}try{mh(t,e)}catch(o){k(a,a.return,o)}}break;case 27:e===null&&l&4&&rg(a);case 26:case 5:qe(t,a),e===null&&l&4&&ug(a),l&512&&jn(a,a.return);break;case 12:qe(t,a);break;case 31:qe(t,a),l&4&&pg(t,a);break;case 13:qe(t,a),l&4&&mg(t,a),l&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=vb.bind(null,a),Lb(t,a))));break;case 22:if(l=a.memoizedState!==null||je,!l){e=e!==null&&e.memoizedState!==null||rt,n=je;var i=rt;je=l,(rt=e)&&!i?He(t,a,(a.subtreeFlags&8772)!==0):qe(t,a),je=n,rt=i}break;case 30:break;default:qe(t,a)}}function fg(t){var e=t.alternate;e!==null&&(t.alternate=null,fg(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&os(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var tt=null,Bt=!1;function Be(t,e,a){for(a=a.child;a!==null;)dg(t,e,a),a=a.sibling}function dg(t,e,a){if(Kt&&typeof Kt.onCommitFiberUnmount=="function")try{Kt.onCommitFiberUnmount(ui,a)}catch{}switch(a.tag){case 26:rt||_e(a,e),Be(t,e,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:rt||_e(a,e);var l=tt,n=Bt;Oa(a.type)&&(tt=a.stateNode,Bt=!1),Be(t,e,a),Qn(a.stateNode),tt=l,Bt=n;break;case 5:rt||_e(a,e);case 6:if(l=tt,n=Bt,tt=null,Be(t,e,a),tt=l,Bt=n,tt!==null)if(Bt)try{(tt.nodeType===9?tt.body:tt.nodeName==="HTML"?tt.ownerDocument.body:tt).removeChild(a.stateNode)}catch(i){k(a,e,i)}else try{tt.removeChild(a.stateNode)}catch(i){k(a,e,i)}break;case 18:tt!==null&&(Bt?(t=tt,lm(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),Il(t)):lm(tt,a.stateNode));break;case 4:l=tt,n=Bt,tt=a.stateNode.containerInfo,Bt=!0,Be(t,e,a),tt=l,Bt=n;break;case 0:case 11:case 14:case 15:za(2,a,e),rt||za(4,a,e),Be(t,e,a);break;case 1:rt||(_e(a,e),l=a.stateNode,typeof l.componentWillUnmount=="function"&&og(a,e,l)),Be(t,e,a);break;case 21:Be(t,e,a);break;case 22:rt=(l=rt)||a.memoizedState!==null,Be(t,e,a),rt=l;break;default:Be(t,e,a)}}function pg(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Il(t)}catch(a){k(e,e.return,a)}}}function mg(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Il(t)}catch(a){k(e,e.return,a)}}function sb(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Vp),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Vp),e;default:throw Error(w(435,t.tag))}}function po(t,e){var a=sb(t);e.forEach(function(l){if(!a.has(l)){a.add(l);var n=bb.bind(null,t,l);l.then(n,n)}})}function Dt(t,e){var a=e.deletions;if(a!==null)for(var l=0;l<a.length;l++){var n=a[l],i=t,o=e,u=o;t:for(;u!==null;){switch(u.tag){case 27:if(Oa(u.type)){tt=u.stateNode,Bt=!1;break t}break;case 5:tt=u.stateNode,Bt=!1;break t;case 3:case 4:tt=u.stateNode.containerInfo,Bt=!0;break t}u=u.return}if(tt===null)throw Error(w(160));dg(i,o,n),tt=null,Bt=!1,i=n.alternate,i!==null&&(i.return=null),n.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)hg(e,t),e=e.sibling}var pe=null;function hg(t,e){var a=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Dt(e,t),Lt(t),l&4&&(za(3,t,t.return),mi(3,t),za(5,t,t.return));break;case 1:Dt(e,t),Lt(t),l&512&&(rt||a===null||_e(a,a.return)),l&64&&je&&(t=t.updateQueue,t!==null&&(l=t.callbacks,l!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?l:a.concat(l))));break;case 26:var n=pe;if(Dt(e,t),Lt(t),l&512&&(rt||a===null||_e(a,a.return)),l&4){var i=a!==null?a.memoizedState:null;if(l=t.memoizedState,a===null)if(l===null)if(t.stateNode===null){t:{l=t.type,a=t.memoizedProps,n=n.ownerDocument||n;e:switch(l){case"title":i=n.getElementsByTagName("title")[0],(!i||i[si]||i[St]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=n.createElement(l),n.head.insertBefore(i,n.querySelector("head > title"))),Et(i,l,a),i[St]=t,gt(i),l=i;break t;case"link":var o=sm("link","href",n).get(l+(a.href||""));if(o){for(var u=0;u<o.length;u++)if(i=o[u],i.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&i.getAttribute("rel")===(a.rel==null?null:a.rel)&&i.getAttribute("title")===(a.title==null?null:a.title)&&i.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){o.splice(u,1);break e}}i=n.createElement(l),Et(i,l,a),n.head.appendChild(i);break;case"meta":if(o=sm("meta","content",n).get(l+(a.content||""))){for(u=0;u<o.length;u++)if(i=o[u],i.getAttribute("content")===(a.content==null?null:""+a.content)&&i.getAttribute("name")===(a.name==null?null:a.name)&&i.getAttribute("property")===(a.property==null?null:a.property)&&i.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&i.getAttribute("charset")===(a.charSet==null?null:a.charSet)){o.splice(u,1);break e}}i=n.createElement(l),Et(i,l,a),n.head.appendChild(i);break;default:throw Error(w(468,l))}i[St]=t,gt(i),l=i}t.stateNode=l}else fm(n,t.type,t.stateNode);else t.stateNode=rm(n,l,t.memoizedProps);else i!==l?(i===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):i.count--,l===null?fm(n,t.type,t.stateNode):rm(n,l,t.memoizedProps)):l===null&&t.stateNode!==null&&Wc(t,t.memoizedProps,a.memoizedProps)}break;case 27:Dt(e,t),Lt(t),l&512&&(rt||a===null||_e(a,a.return)),a!==null&&l&4&&Wc(t,t.memoizedProps,a.memoizedProps);break;case 5:if(Dt(e,t),Lt(t),l&512&&(rt||a===null||_e(a,a.return)),t.flags&32){n=t.stateNode;try{Gl(n,"")}catch(E){k(t,t.return,E)}}l&4&&t.stateNode!=null&&(n=t.memoizedProps,Wc(t,n,a!==null?a.memoizedProps:n)),l&1024&&(Ic=!0);break;case 6:if(Dt(e,t),Lt(t),l&4){if(t.stateNode===null)throw Error(w(162));l=t.memoizedProps,a=t.stateNode;try{a.nodeValue=l}catch(E){k(t,t.return,E)}}break;case 3:if(Oo=null,n=pe,pe=nu(e.containerInfo),Dt(e,t),pe=n,Lt(t),l&4&&a!==null&&a.memoizedState.isDehydrated)try{Il(e.containerInfo)}catch(E){k(t,t.return,E)}Ic&&(Ic=!1,gg(t));break;case 4:l=pe,pe=nu(t.stateNode.containerInfo),Dt(e,t),Lt(t),pe=l;break;case 12:Dt(e,t),Lt(t);break;case 31:Dt(e,t),Lt(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,po(t,l)));break;case 13:Dt(e,t),Lt(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Su=Zt()),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,po(t,l)));break;case 22:n=t.memoizedState!==null;var r=a!==null&&a.memoizedState!==null,p=je,g=rt;if(je=p||n,rt=g||r,Dt(e,t),rt=g,je=p,Lt(t),l&8192)t:for(e=t.stateNode,e._visibility=n?e._visibility&-2:e._visibility|1,n&&(a===null||r||je||rt||Qa(t)),a=null,e=t;;){if(e.tag===5||e.tag===26){if(a===null){r=a=e;try{if(i=r.stateNode,n)o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none";else{u=r.stateNode;var v=r.memoizedProps.style,m=v!=null&&v.hasOwnProperty("display")?v.display:null;u.style.display=m==null||typeof m=="boolean"?"":(""+m).trim()}}catch(E){k(r,r.return,E)}}}else if(e.tag===6){if(a===null){r=e;try{r.stateNode.nodeValue=n?"":r.memoizedProps}catch(E){k(r,r.return,E)}}}else if(e.tag===18){if(a===null){r=e;try{var y=r.stateNode;n?nm(y,!0):nm(r.stateNode,!1)}catch(E){k(r,r.return,E)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;a===e&&(a=null),e=e.return}a===e&&(a=null),e.sibling.return=e.return,e=e.sibling}l&4&&(l=t.updateQueue,l!==null&&(a=l.retryQueue,a!==null&&(l.retryQueue=null,po(t,a))));break;case 19:Dt(e,t),Lt(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,po(t,l)));break;case 30:break;case 21:break;default:Dt(e,t),Lt(t)}}function Lt(t){var e=t.flags;if(e&2){try{for(var a,l=t.return;l!==null;){if(cg(l)){a=l;break}l=l.return}if(a==null)throw Error(w(160));switch(a.tag){case 27:var n=a.stateNode,i=Fc(t);Wo(t,i,n);break;case 5:var o=a.stateNode;a.flags&32&&(Gl(o,""),a.flags&=-33);var u=Fc(t);Wo(t,u,o);break;case 3:case 4:var r=a.stateNode.containerInfo,p=Fc(t);Hr(t,p,r);break;default:throw Error(w(161))}}catch(g){k(t,t.return,g)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function gg(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;gg(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function qe(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)sg(t,e.alternate,e),e=e.sibling}function Qa(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:za(4,e,e.return),Qa(e);break;case 1:_e(e,e.return);var a=e.stateNode;typeof a.componentWillUnmount=="function"&&og(e,e.return,a),Qa(e);break;case 27:Qn(e.stateNode);case 26:case 5:_e(e,e.return),Qa(e);break;case 22:e.memoizedState===null&&Qa(e);break;case 30:Qa(e);break;default:Qa(e)}t=t.sibling}}function He(t,e,a){for(a=a&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var l=e.alternate,n=t,i=e,o=i.flags;switch(i.tag){case 0:case 11:case 15:He(n,i,a),mi(4,i);break;case 1:if(He(n,i,a),l=i,n=l.stateNode,typeof n.componentDidMount=="function")try{n.componentDidMount()}catch(p){k(l,l.return,p)}if(l=i,n=l.updateQueue,n!==null){var u=l.stateNode;try{var r=n.shared.hiddenCallbacks;if(r!==null)for(n.shared.hiddenCallbacks=null,n=0;n<r.length;n++)ph(r[n],u)}catch(p){k(l,l.return,p)}}a&&o&64&&ig(i),jn(i,i.return);break;case 27:rg(i);case 26:case 5:He(n,i,a),a&&l===null&&o&4&&ug(i),jn(i,i.return);break;case 12:He(n,i,a);break;case 31:He(n,i,a),a&&o&4&&pg(n,i);break;case 13:He(n,i,a),a&&o&4&&mg(n,i);break;case 22:i.memoizedState===null&&He(n,i,a),jn(i,i.return);break;case 30:break;default:He(n,i,a)}e=e.sibling}}function qs(t,e){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&di(a))}function Hs(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&di(t))}function de(t,e,a,l){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)yg(t,e,a,l),e=e.sibling}function yg(t,e,a,l){var n=e.flags;switch(e.tag){case 0:case 11:case 15:de(t,e,a,l),n&2048&&mi(9,e);break;case 1:de(t,e,a,l);break;case 3:de(t,e,a,l),n&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&di(t)));break;case 12:if(n&2048){de(t,e,a,l),t=e.stateNode;try{var i=e.memoizedProps,o=i.id,u=i.onPostCommit;typeof u=="function"&&u(o,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(r){k(e,e.return,r)}}else de(t,e,a,l);break;case 31:de(t,e,a,l);break;case 13:de(t,e,a,l);break;case 23:break;case 22:i=e.stateNode,o=e.alternate,e.memoizedState!==null?i._visibility&2?de(t,e,a,l):Vn(t,e):i._visibility&2?de(t,e,a,l):(i._visibility|=2,wl(t,e,a,l,(e.subtreeFlags&10256)!==0||!1)),n&2048&&qs(o,e);break;case 24:de(t,e,a,l),n&2048&&Hs(e.alternate,e);break;default:de(t,e,a,l)}}function wl(t,e,a,l,n){for(n=n&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var i=t,o=e,u=a,r=l,p=o.flags;switch(o.tag){case 0:case 11:case 15:wl(i,o,u,r,n),mi(8,o);break;case 23:break;case 22:var g=o.stateNode;o.memoizedState!==null?g._visibility&2?wl(i,o,u,r,n):Vn(i,o):(g._visibility|=2,wl(i,o,u,r,n)),n&&p&2048&&qs(o.alternate,o);break;case 24:wl(i,o,u,r,n),n&&p&2048&&Hs(o.alternate,o);break;default:wl(i,o,u,r,n)}e=e.sibling}}function Vn(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var a=t,l=e,n=l.flags;switch(l.tag){case 22:Vn(a,l),n&2048&&qs(l.alternate,l);break;case 24:Vn(a,l),n&2048&&Hs(l.alternate,l);break;default:Vn(a,l)}e=e.sibling}}var $n=8192;function Sl(t,e,a){if(t.subtreeFlags&$n)for(t=t.child;t!==null;)vg(t,e,a),t=t.sibling}function vg(t,e,a){switch(t.tag){case 26:Sl(t,e,a),t.flags&$n&&t.memoizedState!==null&&Kb(a,pe,t.memoizedState,t.memoizedProps);break;case 5:Sl(t,e,a);break;case 3:case 4:var l=pe;pe=nu(t.stateNode.containerInfo),Sl(t,e,a),pe=l;break;case 22:t.memoizedState===null&&(l=t.alternate,l!==null&&l.memoizedState!==null?(l=$n,$n=16777216,Sl(t,e,a),$n=l):Sl(t,e,a));break;default:Sl(t,e,a)}}function bg(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function An(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var a=0;a<e.length;a++){var l=e[a];ht=l,wg(l,t)}bg(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Sg(t),t=t.sibling}function Sg(t){switch(t.tag){case 0:case 11:case 15:An(t),t.flags&2048&&za(9,t,t.return);break;case 3:An(t);break;case 12:An(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,No(t)):An(t);break;default:An(t)}}function No(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var a=0;a<e.length;a++){var l=e[a];ht=l,wg(l,t)}bg(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:za(8,e,e.return),No(e);break;case 22:a=e.stateNode,a._visibility&2&&(a._visibility&=-3,No(e));break;default:No(e)}t=t.sibling}}function wg(t,e){for(;ht!==null;){var a=ht;switch(a.tag){case 0:case 11:case 15:za(8,a,e);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var l=a.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:di(a.memoizedState.cache)}if(l=a.child,l!==null)l.return=a,ht=l;else t:for(a=t;ht!==null;){l=ht;var n=l.sibling,i=l.return;if(fg(l),l===a){ht=null;break t}if(n!==null){n.return=i,ht=n;break t}ht=i}}}var fb={getCacheForType:function(t){var e=xt(st),a=e.data.get(t);return a===void 0&&(a=t(),e.data.set(t,a)),a},cacheSignal:function(){return xt(st).controller.signal}},db=typeof WeakMap=="function"?WeakMap:Map,Y=0,X=null,U=null,L=0,V=0,kt=null,ma=!1,ln=!1,Ys=!1,Ie=0,lt=0,Na=0,Wa=0,js=0,Xt=0,Kl=0,kn=null,qt=null,Yr=!1,Su=0,xg=0,Fo=1/0,Io=null,wa=null,dt=0,xa=null,Jl=null,Ze=0,jr=0,Vr=null,Eg=null,Gn=0,kr=null;function Wt(){return(Y&2)!==0&&L!==0?L&-L:z.T!==null?ks():$m()}function Tg(){if(Xt===0)if((L&536870912)===0||B){var t=ao;ao<<=1,(ao&3932160)===0&&(ao=262144),Xt=t}else Xt=536870912;return t=It.current,t!==null&&(t.flags|=32),Xt}function Ht(t,e,a){(t===X&&(V===2||V===9)||t.cancelPendingCommit!==null)&&(Wl(t,0),ha(t,L,Xt,!1)),ri(t,a),((Y&2)===0||t!==X)&&(t===X&&((Y&2)===0&&(Wa|=a),lt===4&&ha(t,L,Xt,!1)),Ne(t))}function Ag(t,e,a){if((Y&6)!==0)throw Error(w(327));var l=!a&&(e&127)===0&&(e&t.expiredLanes)===0||ci(t,e),n=l?hb(t,e):Pc(t,e,!0),i=l;do{if(n===0){ln&&!l&&ha(t,e,0,!1);break}else{if(a=t.current.alternate,i&&!pb(a)){n=Pc(t,e,!1),i=!1;continue}if(n===2){if(i=e,t.errorRecoveryDisabledLanes&i)var o=0;else o=t.pendingLanes&-536870913,o=o!==0?o:o&536870912?536870912:0;if(o!==0){e=o;t:{var u=t;n=kn;var r=u.current.memoizedState.isDehydrated;if(r&&(Wl(u,o).flags|=256),o=Pc(u,o,!1),o!==2){if(Ys&&!r){u.errorRecoveryDisabledLanes|=i,Wa|=i,n=4;break t}i=qt,qt=n,i!==null&&(qt===null?qt=i:qt.push.apply(qt,i))}n=o}if(i=!1,n!==2)continue}}if(n===1){Wl(t,0),ha(t,e,0,!0);break}t:{switch(l=t,i=n,i){case 0:case 1:throw Error(w(345));case 4:if((e&4194048)!==e)break;case 6:ha(l,e,Xt,!ma);break t;case 2:qt=null;break;case 3:case 5:break;default:throw Error(w(329))}if((e&62914560)===e&&(n=Su+300-Zt(),10<n)){if(ha(l,e,Xt,!ma),ru(l,0,!0)!==0)break t;Ze=e,l.timeoutHandle=Qg(kp.bind(null,l,a,qt,Io,Yr,e,Xt,Wa,Kl,ma,i,"Throttled",-0,0),n);break t}kp(l,a,qt,Io,Yr,e,Xt,Wa,Kl,ma,i,null,-0,0)}}break}while(!0);Ne(t)}function kp(t,e,a,l,n,i,o,u,r,p,g,v,m,y){if(t.timeoutHandle=-1,v=e.subtreeFlags,v&8192||(v&16785408)===16785408){v={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ke},vg(e,i,v);var E=(i&62914560)===i?Su-Zt():(i&4194048)===i?xg-Zt():0;if(E=Jb(v,E),E!==null){Ze=i,t.cancelPendingCommit=E(Qp.bind(null,t,e,i,a,l,n,o,u,r,g,v,null,m,y)),ha(t,i,o,!p);return}}Qp(t,e,i,a,l,n,o,u,r)}function pb(t){for(var e=t;;){var a=e.tag;if((a===0||a===11||a===15)&&e.flags&16384&&(a=e.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var l=0;l<a.length;l++){var n=a[l],i=n.getSnapshot;n=n.value;try{if(!Ft(i(),n))return!1}catch{return!1}}if(a=e.child,e.subtreeFlags&16384&&a!==null)a.return=e,e=a;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function ha(t,e,a,l){e&=~js,e&=~Wa,t.suspendedLanes|=e,t.pingedLanes&=~e,l&&(t.warmLanes|=e),l=t.expirationTimes;for(var n=e;0<n;){var i=31-Jt(n),o=1<<i;l[i]=-1,n&=~o}a!==0&&Nm(t,a,e)}function wu(){return(Y&6)===0?(hi(0,!1),!1):!0}function Vs(){if(U!==null){if(V===0)var t=U.return;else t=U,Ge=ol=null,Ms(t),Hl=null,In=0,t=U;for(;t!==null;)ng(t.alternate,t),t=t.return;U=null}}function Wl(t,e){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,Ob(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),Ze=0,Vs(),X=t,U=a=Qe(t.current,null),L=e,V=0,kt=null,ma=!1,ln=ci(t,e),Ys=!1,Kl=Xt=js=Wa=Na=lt=0,qt=kn=null,Yr=!1,(e&8)!==0&&(e|=e&32);var l=t.entangledLanes;if(l!==0)for(t=t.entanglements,l&=e;0<l;){var n=31-Jt(l),i=1<<n;e|=t[n],l&=~i}return Ie=e,pu(),a}function _g(t,e){O=null,z.H=ti,e===an||e===hu?(e=wp(),V=3):e===Ss?(e=wp(),V=4):V=e===Ls?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,kt=e,U===null&&(lt=1,Ko(t,ue(e,t.current)))}function Mg(){var t=It.current;return t===null?!0:(L&4194048)===L?re===null:(L&62914560)===L||(L&536870912)!==0?t===re:!1}function zg(){var t=z.H;return z.H=ti,t===null?ti:t}function Ng(){var t=z.A;return z.A=fb,t}function Po(){lt=4,ma||(L&4194048)!==L&&It.current!==null||(ln=!0),(Na&134217727)===0&&(Wa&134217727)===0||X===null||ha(X,L,Xt,!1)}function Pc(t,e,a){var l=Y;Y|=2;var n=zg(),i=Ng();(X!==t||L!==e)&&(Io=null,Wl(t,e)),e=!1;var o=lt;t:do try{if(V!==0&&U!==null){var u=U,r=kt;switch(V){case 8:Vs(),o=6;break t;case 3:case 2:case 9:case 6:It.current===null&&(e=!0);var p=V;if(V=0,kt=null,Ul(t,u,r,p),a&&ln){o=0;break t}break;default:p=V,V=0,kt=null,Ul(t,u,r,p)}}mb(),o=lt;break}catch(g){_g(t,g)}while(!0);return e&&t.shellSuspendCounter++,Ge=ol=null,Y=l,z.H=n,z.A=i,U===null&&(X=null,L=0,pu()),o}function mb(){for(;U!==null;)Cg(U)}function hb(t,e){var a=Y;Y|=2;var l=zg(),n=Ng();X!==t||L!==e?(Io=null,Fo=Zt()+500,Wl(t,e)):ln=ci(t,e);t:do try{if(V!==0&&U!==null){e=U;var i=kt;e:switch(V){case 1:V=0,kt=null,Ul(t,e,i,1);break;case 2:case 9:if(Sp(i)){V=0,kt=null,Gp(e);break}e=function(){V!==2&&V!==9||X!==t||(V=7),Ne(t)},i.then(e,e);break t;case 3:V=7;break t;case 4:V=5;break t;case 7:Sp(i)?(V=0,kt=null,Gp(e)):(V=0,kt=null,Ul(t,e,i,7));break;case 5:var o=null;switch(U.tag){case 26:o=U.memoizedState;case 5:case 27:var u=U;if(o?Wg(o):u.stateNode.complete){V=0,kt=null;var r=u.sibling;if(r!==null)U=r;else{var p=u.return;p!==null?(U=p,xu(p)):U=null}break e}}V=0,kt=null,Ul(t,e,i,5);break;case 6:V=0,kt=null,Ul(t,e,i,6);break;case 8:Vs(),lt=6;break t;default:throw Error(w(462))}}gb();break}catch(g){_g(t,g)}while(!0);return Ge=ol=null,z.H=l,z.A=n,Y=a,U!==null?0:(X=null,L=0,pu(),lt)}function gb(){for(;U!==null&&!Hv();)Cg(U)}function Cg(t){var e=lg(t.alternate,t,Ie);t.memoizedProps=t.pendingProps,e===null?xu(t):U=e}function Gp(t){var e=t,a=e.alternate;switch(e.tag){case 15:case 0:e=Bp(a,e,e.pendingProps,e.type,void 0,L);break;case 11:e=Bp(a,e,e.pendingProps,e.type.render,e.ref,L);break;case 5:Ms(e);default:ng(a,e),e=U=nh(e,Ie),e=lg(a,e,Ie)}t.memoizedProps=t.pendingProps,e===null?xu(t):U=e}function Ul(t,e,a,l){Ge=ol=null,Ms(e),Hl=null,In=0;var n=e.return;try{if(nb(t,n,e,a,L)){lt=1,Ko(t,ue(a,t.current)),U=null;return}}catch(i){if(n!==null)throw U=n,i;lt=1,Ko(t,ue(a,t.current)),U=null;return}e.flags&32768?(B||l===1?t=!0:ln||(L&536870912)!==0?t=!1:(ma=t=!0,(l===2||l===9||l===3||l===6)&&(l=It.current,l!==null&&l.tag===13&&(l.flags|=16384))),Og(e,t)):xu(e)}function xu(t){var e=t;do{if((e.flags&32768)!==0){Og(e,ma);return}t=e.return;var a=ub(e.alternate,e,Ie);if(a!==null){U=a;return}if(e=e.sibling,e!==null){U=e;return}U=e=t}while(e!==null);lt===0&&(lt=5)}function Og(t,e){do{var a=cb(t.alternate,t);if(a!==null){a.flags&=32767,U=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!e&&(t=t.sibling,t!==null)){U=t;return}U=t=a}while(t!==null);lt=6,U=null}function Qp(t,e,a,l,n,i,o,u,r){t.cancelPendingCommit=null;do Eu();while(dt!==0);if((Y&6)!==0)throw Error(w(327));if(e!==null){if(e===t.current)throw Error(w(177));if(i=e.lanes|e.childLanes,i|=ps,Jv(t,a,i,o,u,r),t===X&&(U=X=null,L=0),Jl=e,xa=t,Ze=a,jr=i,Vr=n,Eg=l,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,Sb(Bo,function(){return Lg(),null})):(t.callbackNode=null,t.callbackPriority=0),l=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||l){l=z.T,z.T=null,n=j.p,j.p=2,o=Y,Y|=4;try{rb(t,e,a)}finally{Y=o,j.p=n,z.T=l}}dt=1,$g(),Rg(),Ug()}}function $g(){if(dt===1){dt=0;var t=xa,e=Jl,a=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||a){a=z.T,z.T=null;var l=j.p;j.p=2;var n=Y;Y|=4;try{hg(e,t);var i=Zr,o=Wm(t.containerInfo),u=i.focusedElem,r=i.selectionRange;if(o!==u&&u&&u.ownerDocument&&Jm(u.ownerDocument.documentElement,u)){if(r!==null&&ds(u)){var p=r.start,g=r.end;if(g===void 0&&(g=p),"selectionStart"in u)u.selectionStart=p,u.selectionEnd=Math.min(g,u.value.length);else{var v=u.ownerDocument||document,m=v&&v.defaultView||window;if(m.getSelection){var y=m.getSelection(),E=u.textContent.length,_=Math.min(r.start,E),C=r.end===void 0?_:Math.min(r.end,E);!y.extend&&_>C&&(o=C,C=_,_=o);var f=pp(u,_),s=pp(u,C);if(f&&s&&(y.rangeCount!==1||y.anchorNode!==f.node||y.anchorOffset!==f.offset||y.focusNode!==s.node||y.focusOffset!==s.offset)){var h=v.createRange();h.setStart(f.node,f.offset),y.removeAllRanges(),_>C?(y.addRange(h),y.extend(s.node,s.offset)):(h.setEnd(s.node,s.offset),y.addRange(h))}}}}for(v=[],y=u;y=y.parentNode;)y.nodeType===1&&v.push({element:y,left:y.scrollLeft,top:y.scrollTop});for(typeof u.focus=="function"&&u.focus(),u=0;u<v.length;u++){var b=v[u];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}uu=!!Xr,Zr=Xr=null}finally{Y=n,j.p=l,z.T=a}}t.current=e,dt=2}}function Rg(){if(dt===2){dt=0;var t=xa,e=Jl,a=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||a){a=z.T,z.T=null;var l=j.p;j.p=2;var n=Y;Y|=4;try{sg(t,e.alternate,e)}finally{Y=n,j.p=l,z.T=a}}dt=3}}function Ug(){if(dt===4||dt===3){dt=0,Yv();var t=xa,e=Jl,a=Ze,l=Eg;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?dt=5:(dt=0,Jl=xa=null,Dg(t,t.pendingLanes));var n=t.pendingLanes;if(n===0&&(wa=null),is(a),e=e.stateNode,Kt&&typeof Kt.onCommitFiberRoot=="function")try{Kt.onCommitFiberRoot(ui,e,void 0,(e.current.flags&128)===128)}catch{}if(l!==null){e=z.T,n=j.p,j.p=2,z.T=null;try{for(var i=t.onRecoverableError,o=0;o<l.length;o++){var u=l[o];i(u.value,{componentStack:u.stack})}}finally{z.T=e,j.p=n}}(Ze&3)!==0&&Eu(),Ne(t),n=t.pendingLanes,(a&261930)!==0&&(n&42)!==0?t===kr?Gn++:(Gn=0,kr=t):Gn=0,hi(0,!1)}}function Dg(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,di(e)))}function Eu(){return $g(),Rg(),Ug(),Lg()}function Lg(){if(dt!==5)return!1;var t=xa,e=jr;jr=0;var a=is(Ze),l=z.T,n=j.p;try{j.p=32>a?32:a,z.T=null,a=Vr,Vr=null;var i=xa,o=Ze;if(dt=0,Jl=xa=null,Ze=0,(Y&6)!==0)throw Error(w(331));var u=Y;if(Y|=4,Sg(i.current),yg(i,i.current,o,a),Y=u,hi(0,!1),Kt&&typeof Kt.onPostCommitFiberRoot=="function")try{Kt.onPostCommitFiberRoot(ui,i)}catch{}return!0}finally{j.p=n,z.T=l,Dg(t,e)}}function Xp(t,e,a){e=ue(a,e),e=Lr(t.stateNode,e,2),t=Sa(t,e,2),t!==null&&(ri(t,2),Ne(t))}function k(t,e,a){if(t.tag===3)Xp(t,t,a);else for(;e!==null;){if(e.tag===3){Xp(e,t,a);break}else if(e.tag===1){var l=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(wa===null||!wa.has(l))){t=ue(a,t),a=Fh(2),l=Sa(e,a,2),l!==null&&(Ih(a,l,e,t),ri(l,2),Ne(l));break}}e=e.return}}function tr(t,e,a){var l=t.pingCache;if(l===null){l=t.pingCache=new db;var n=new Set;l.set(e,n)}else n=l.get(e),n===void 0&&(n=new Set,l.set(e,n));n.has(a)||(Ys=!0,n.add(a),t=yb.bind(null,t,e,a),e.then(t,t))}function yb(t,e,a){var l=t.pingCache;l!==null&&l.delete(e),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,X===t&&(L&a)===a&&(lt===4||lt===3&&(L&62914560)===L&&300>Zt()-Su?(Y&2)===0&&Wl(t,0):js|=a,Kl===L&&(Kl=0)),Ne(t)}function Bg(t,e){e===0&&(e=zm()),t=il(t,e),t!==null&&(ri(t,e),Ne(t))}function vb(t){var e=t.memoizedState,a=0;e!==null&&(a=e.retryLane),Bg(t,a)}function bb(t,e){var a=0;switch(t.tag){case 31:case 13:var l=t.stateNode,n=t.memoizedState;n!==null&&(a=n.retryLane);break;case 19:l=t.stateNode;break;case 22:l=t.stateNode._retryCache;break;default:throw Error(w(314))}l!==null&&l.delete(e),Bg(t,a)}function Sb(t,e){return ls(t,e)}var tu=null,xl=null,Gr=!1,eu=!1,er=!1,ga=0;function Ne(t){t!==xl&&t.next===null&&(xl===null?tu=xl=t:xl=xl.next=t),eu=!0,Gr||(Gr=!0,xb())}function hi(t,e){if(!er&&eu){er=!0;do for(var a=!1,l=tu;l!==null;){if(!e)if(t!==0){var n=l.pendingLanes;if(n===0)var i=0;else{var o=l.suspendedLanes,u=l.pingedLanes;i=(1<<31-Jt(42|t)+1)-1,i&=n&~(o&~u),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(a=!0,Zp(l,i))}else i=L,i=ru(l,l===X?i:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(i&3)===0||ci(l,i)||(a=!0,Zp(l,i));l=l.next}while(a);er=!1}}function wb(){qg()}function qg(){eu=Gr=!1;var t=0;ga!==0&&Cb()&&(t=ga);for(var e=Zt(),a=null,l=tu;l!==null;){var n=l.next,i=Hg(l,e);i===0?(l.next=null,a===null?tu=n:a.next=n,n===null&&(xl=a)):(a=l,(t!==0||(i&3)!==0)&&(eu=!0)),l=n}dt!==0&&dt!==5||hi(t,!1),ga!==0&&(ga=0)}function Hg(t,e){for(var a=t.suspendedLanes,l=t.pingedLanes,n=t.expirationTimes,i=t.pendingLanes&-62914561;0<i;){var o=31-Jt(i),u=1<<o,r=n[o];r===-1?((u&a)===0||(u&l)!==0)&&(n[o]=Kv(u,e)):r<=e&&(t.expiredLanes|=u),i&=~u}if(e=X,a=L,a=ru(t,t===e?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l=t.callbackNode,a===0||t===e&&(V===2||V===9)||t.cancelPendingCommit!==null)return l!==null&&l!==null&&Cc(l),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||ci(t,a)){if(e=a&-a,e===t.callbackPriority)return e;switch(l!==null&&Cc(l),is(a)){case 2:case 8:a=_m;break;case 32:a=Bo;break;case 268435456:a=Mm;break;default:a=Bo}return l=Yg.bind(null,t),a=ls(a,l),t.callbackPriority=e,t.callbackNode=a,e}return l!==null&&l!==null&&Cc(l),t.callbackPriority=2,t.callbackNode=null,2}function Yg(t,e){if(dt!==0&&dt!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(Eu()&&t.callbackNode!==a)return null;var l=L;return l=ru(t,t===X?l:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l===0?null:(Ag(t,l,e),Hg(t,Zt()),t.callbackNode!=null&&t.callbackNode===a?Yg.bind(null,t):null)}function Zp(t,e){if(Eu())return null;Ag(t,e,!0)}function xb(){$b(function(){(Y&6)!==0?ls(Am,wb):qg()})}function ks(){if(ga===0){var t=Ql;t===0&&(t=eo,eo<<=1,(eo&261888)===0&&(eo=256)),ga=t}return ga}function Kp(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:So(""+t)}function Jp(t,e){var a=e.ownerDocument.createElement("input");return a.name=e.name,a.value=e.value,t.id&&a.setAttribute("form",t.id),e.parentNode.insertBefore(a,e),t=new FormData(t),a.parentNode.removeChild(a),t}function Eb(t,e,a,l,n){if(e==="submit"&&a&&a.stateNode===n){var i=Kp((n[Yt]||null).action),o=l.submitter;o&&(e=(e=o[Yt]||null)?Kp(e.formAction):o.getAttribute("formAction"),e!==null&&(i=e,o=null));var u=new su("action","action",null,l,n);t.push({event:u,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(ga!==0){var r=o?Jp(n,o):new FormData(n);Ur(a,{pending:!0,data:r,method:n.method,action:i},null,r)}}else typeof i=="function"&&(u.preventDefault(),r=o?Jp(n,o):new FormData(n),Ur(a,{pending:!0,data:r,method:n.method,action:i},i,r))},currentTarget:n}]})}}for(mo=0;mo<xr.length;mo++)ho=xr[mo],Wp=ho.toLowerCase(),Fp=ho[0].toUpperCase()+ho.slice(1),me(Wp,"on"+Fp);var ho,Wp,Fp,mo;me(Im,"onAnimationEnd");me(Pm,"onAnimationIteration");me(th,"onAnimationStart");me("dblclick","onDoubleClick");me("focusin","onFocus");me("focusout","onBlur");me(j1,"onTransitionRun");me(V1,"onTransitionStart");me(k1,"onTransitionCancel");me(eh,"onTransitionEnd");kl("onMouseEnter",["mouseout","mouseover"]);kl("onMouseLeave",["mouseout","mouseover"]);kl("onPointerEnter",["pointerout","pointerover"]);kl("onPointerLeave",["pointerout","pointerover"]);al("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));al("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));al("onBeforeInput",["compositionend","keypress","textInput","paste"]);al("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));al("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));al("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ei="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Tb=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ei));function jg(t,e){e=(e&4)!==0;for(var a=0;a<t.length;a++){var l=t[a],n=l.event;l=l.listeners;t:{var i=void 0;if(e)for(var o=l.length-1;0<=o;o--){var u=l[o],r=u.instance,p=u.currentTarget;if(u=u.listener,r!==i&&n.isPropagationStopped())break t;i=u,n.currentTarget=p;try{i(n)}catch(g){Ho(g)}n.currentTarget=null,i=r}else for(o=0;o<l.length;o++){if(u=l[o],r=u.instance,p=u.currentTarget,u=u.listener,r!==i&&n.isPropagationStopped())break t;i=u,n.currentTarget=p;try{i(n)}catch(g){Ho(g)}n.currentTarget=null,i=r}}}}function R(t,e){var a=e[mr];a===void 0&&(a=e[mr]=new Set);var l=t+"__bubble";a.has(l)||(Vg(e,t,2,!1),a.add(l))}function ar(t,e,a){var l=0;e&&(l|=4),Vg(a,t,l,e)}var go="_reactListening"+Math.random().toString(36).slice(2);function Gs(t){if(!t[go]){t[go]=!0,Rm.forEach(function(a){a!=="selectionchange"&&(Tb.has(a)||ar(a,!1,t),ar(a,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[go]||(e[go]=!0,ar("selectionchange",!1,e))}}function Vg(t,e,a,l){switch(e0(e)){case 2:var n=Ib;break;case 8:n=Pb;break;default:n=Ks}a=n.bind(null,e,a,t),n=void 0,!br||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(n=!0),l?n!==void 0?t.addEventListener(e,a,{capture:!0,passive:n}):t.addEventListener(e,a,!0):n!==void 0?t.addEventListener(e,a,{passive:n}):t.addEventListener(e,a,!1)}function lr(t,e,a,l,n){var i=l;if((e&1)===0&&(e&2)===0&&l!==null)t:for(;;){if(l===null)return;var o=l.tag;if(o===3||o===4){var u=l.stateNode.containerInfo;if(u===n)break;if(o===4)for(o=l.return;o!==null;){var r=o.tag;if((r===3||r===4)&&o.stateNode.containerInfo===n)return;o=o.return}for(;u!==null;){if(o=Al(u),o===null)return;if(r=o.tag,r===5||r===6||r===26||r===27){l=i=o;continue t}u=u.parentNode}}l=l.return}jm(function(){var p=i,g=cs(a),v=[];t:{var m=ah.get(t);if(m!==void 0){var y=su,E=t;switch(t){case"keypress":if(xo(a)===0)break t;case"keydown":case"keyup":y=b1;break;case"focusin":E="focus",y=Dc;break;case"focusout":E="blur",y=Dc;break;case"beforeblur":case"afterblur":y=Dc;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=np;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=u1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=x1;break;case Im:case Pm:case th:y=s1;break;case eh:y=T1;break;case"scroll":case"scrollend":y=i1;break;case"wheel":y=_1;break;case"copy":case"cut":case"paste":y=d1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=op;break;case"toggle":case"beforetoggle":y=z1}var _=(e&4)!==0,C=!_&&(t==="scroll"||t==="scrollend"),f=_?m!==null?m+"Capture":null:m;_=[];for(var s=p,h;s!==null;){var b=s;if(h=b.stateNode,b=b.tag,b!==5&&b!==26&&b!==27||h===null||f===null||(b=Zn(s,f),b!=null&&_.push(ai(s,b,h))),C)break;s=s.return}0<_.length&&(m=new y(m,E,null,a,g),v.push({event:m,listeners:_}))}}if((e&7)===0){t:{if(m=t==="mouseover"||t==="pointerover",y=t==="mouseout"||t==="pointerout",m&&a!==vr&&(E=a.relatedTarget||a.fromElement)&&(Al(E)||E[Pl]))break t;if((y||m)&&(m=g.window===g?g:(m=g.ownerDocument)?m.defaultView||m.parentWindow:window,y?(E=a.relatedTarget||a.toElement,y=p,E=E?Al(E):null,E!==null&&(C=oi(E),_=E.tag,E!==C||_!==5&&_!==27&&_!==6)&&(E=null)):(y=null,E=p),y!==E)){if(_=np,b="onMouseLeave",f="onMouseEnter",s="mouse",(t==="pointerout"||t==="pointerover")&&(_=op,b="onPointerLeave",f="onPointerEnter",s="pointer"),C=y==null?m:Cn(y),h=E==null?m:Cn(E),m=new _(b,s+"leave",y,a,g),m.target=C,m.relatedTarget=h,b=null,Al(g)===p&&(_=new _(f,s+"enter",E,a,g),_.target=h,_.relatedTarget=C,b=_),C=b,y&&E)e:{for(_=Ab,f=y,s=E,h=0,b=f;b;b=_(b))h++;b=0;for(var A=s;A;A=_(A))b++;for(;0<h-b;)f=_(f),h--;for(;0<b-h;)s=_(s),b--;for(;h--;){if(f===s||s!==null&&f===s.alternate){_=f;break e}f=_(f),s=_(s)}_=null}else _=null;y!==null&&Ip(v,m,y,_,!1),E!==null&&C!==null&&Ip(v,C,E,_,!0)}}t:{if(m=p?Cn(p):window,y=m.nodeName&&m.nodeName.toLowerCase(),y==="select"||y==="input"&&m.type==="file")var q=sp;else if(rp(m))if(Zm)q=q1;else{q=L1;var T=D1}else y=m.nodeName,!y||y.toLowerCase()!=="input"||m.type!=="checkbox"&&m.type!=="radio"?p&&us(p.elementType)&&(q=sp):q=B1;if(q&&(q=q(t,p))){Xm(v,q,a,g);break t}T&&T(t,m,p),t==="focusout"&&p&&m.type==="number"&&p.memoizedProps.value!=null&&yr(m,"number",m.value)}switch(T=p?Cn(p):window,t){case"focusin":(rp(T)||T.contentEditable==="true")&&(zl=T,Sr=p,Dn=null);break;case"focusout":Dn=Sr=zl=null;break;case"mousedown":wr=!0;break;case"contextmenu":case"mouseup":case"dragend":wr=!1,mp(v,a,g);break;case"selectionchange":if(Y1)break;case"keydown":case"keyup":mp(v,a,g)}var $;if(fs)t:{switch(t){case"compositionstart":var D="onCompositionStart";break t;case"compositionend":D="onCompositionEnd";break t;case"compositionupdate":D="onCompositionUpdate";break t}D=void 0}else Ml?Gm(t,a)&&(D="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(D="onCompositionStart");D&&(km&&a.locale!=="ko"&&(Ml||D!=="onCompositionStart"?D==="onCompositionEnd"&&Ml&&($=Vm()):(pa=g,rs="value"in pa?pa.value:pa.textContent,Ml=!0)),T=au(p,D),0<T.length&&(D=new ip(D,t,null,a,g),v.push({event:D,listeners:T}),$?D.data=$:($=Qm(a),$!==null&&(D.data=$)))),($=C1?O1(t,a):$1(t,a))&&(D=au(p,"onBeforeInput"),0<D.length&&(T=new ip("onBeforeInput","beforeinput",null,a,g),v.push({event:T,listeners:D}),T.data=$)),Eb(v,t,p,a,g)}jg(v,e)})}function ai(t,e,a){return{instance:t,listener:e,currentTarget:a}}function au(t,e){for(var a=e+"Capture",l=[];t!==null;){var n=t,i=n.stateNode;if(n=n.tag,n!==5&&n!==26&&n!==27||i===null||(n=Zn(t,a),n!=null&&l.unshift(ai(t,n,i)),n=Zn(t,e),n!=null&&l.push(ai(t,n,i))),t.tag===3)return l;t=t.return}return[]}function Ab(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Ip(t,e,a,l,n){for(var i=e._reactName,o=[];a!==null&&a!==l;){var u=a,r=u.alternate,p=u.stateNode;if(u=u.tag,r!==null&&r===l)break;u!==5&&u!==26&&u!==27||p===null||(r=p,n?(p=Zn(a,i),p!=null&&o.unshift(ai(a,p,r))):n||(p=Zn(a,i),p!=null&&o.push(ai(a,p,r)))),a=a.return}o.length!==0&&t.push({event:e,listeners:o})}var _b=/\r\n?/g,Mb=/\u0000|\uFFFD/g;function Pp(t){return(typeof t=="string"?t:""+t).replace(_b,`
`).replace(Mb,"")}function kg(t,e){return e=Pp(e),Pp(t)===e}function G(t,e,a,l,n,i){switch(a){case"children":typeof l=="string"?e==="body"||e==="textarea"&&l===""||Gl(t,l):(typeof l=="number"||typeof l=="bigint")&&e!=="body"&&Gl(t,""+l);break;case"className":no(t,"class",l);break;case"tabIndex":no(t,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":no(t,a,l);break;case"style":Ym(t,l,i);break;case"data":if(e!=="object"){no(t,"data",l);break}case"src":case"href":if(l===""&&(e!=="a"||a!=="href")){t.removeAttribute(a);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(a);break}l=So(""+l),t.setAttribute(a,l);break;case"action":case"formAction":if(typeof l=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(a==="formAction"?(e!=="input"&&G(t,e,"name",n.name,n,null),G(t,e,"formEncType",n.formEncType,n,null),G(t,e,"formMethod",n.formMethod,n,null),G(t,e,"formTarget",n.formTarget,n,null)):(G(t,e,"encType",n.encType,n,null),G(t,e,"method",n.method,n,null),G(t,e,"target",n.target,n,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(a);break}l=So(""+l),t.setAttribute(a,l);break;case"onClick":l!=null&&(t.onclick=ke);break;case"onScroll":l!=null&&R("scroll",t);break;case"onScrollEnd":l!=null&&R("scrollend",t);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(w(61));if(a=l.__html,a!=null){if(n.children!=null)throw Error(w(60));t.innerHTML=a}}break;case"multiple":t.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":t.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){t.removeAttribute("xlink:href");break}a=So(""+l),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(a,""+l):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":l===!0?t.setAttribute(a,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(a,l):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?t.setAttribute(a,l):t.removeAttribute(a);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?t.removeAttribute(a):t.setAttribute(a,l);break;case"popover":R("beforetoggle",t),R("toggle",t),bo(t,"popover",l);break;case"xlinkActuate":De(t,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":De(t,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":De(t,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":De(t,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":De(t,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":De(t,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":De(t,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":De(t,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":De(t,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":bo(t,"is",l);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=l1.get(a)||a,bo(t,a,l))}}function Qr(t,e,a,l,n,i){switch(a){case"style":Ym(t,l,i);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(w(61));if(a=l.__html,a!=null){if(n.children!=null)throw Error(w(60));t.innerHTML=a}}break;case"children":typeof l=="string"?Gl(t,l):(typeof l=="number"||typeof l=="bigint")&&Gl(t,""+l);break;case"onScroll":l!=null&&R("scroll",t);break;case"onScrollEnd":l!=null&&R("scrollend",t);break;case"onClick":l!=null&&(t.onclick=ke);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Um.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(n=a.endsWith("Capture"),e=a.slice(2,n?a.length-7:void 0),i=t[Yt]||null,i=i!=null?i[a]:null,typeof i=="function"&&t.removeEventListener(e,i,n),typeof l=="function")){typeof i!="function"&&i!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(e,l,n);break t}a in t?t[a]=l:l===!0?t.setAttribute(a,""):bo(t,a,l)}}}function Et(t,e,a){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":R("error",t),R("load",t);var l=!1,n=!1,i;for(i in a)if(a.hasOwnProperty(i)){var o=a[i];if(o!=null)switch(i){case"src":l=!0;break;case"srcSet":n=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(w(137,e));default:G(t,e,i,o,a,null)}}n&&G(t,e,"srcSet",a.srcSet,a,null),l&&G(t,e,"src",a.src,a,null);return;case"input":R("invalid",t);var u=i=o=n=null,r=null,p=null;for(l in a)if(a.hasOwnProperty(l)){var g=a[l];if(g!=null)switch(l){case"name":n=g;break;case"type":o=g;break;case"checked":r=g;break;case"defaultChecked":p=g;break;case"value":i=g;break;case"defaultValue":u=g;break;case"children":case"dangerouslySetInnerHTML":if(g!=null)throw Error(w(137,e));break;default:G(t,e,l,g,a,null)}}Bm(t,i,u,r,p,o,n,!1);return;case"select":R("invalid",t),l=o=i=null;for(n in a)if(a.hasOwnProperty(n)&&(u=a[n],u!=null))switch(n){case"value":i=u;break;case"defaultValue":o=u;break;case"multiple":l=u;default:G(t,e,n,u,a,null)}e=i,a=o,t.multiple=!!l,e!=null?Ll(t,!!l,e,!1):a!=null&&Ll(t,!!l,a,!0);return;case"textarea":R("invalid",t),i=n=l=null;for(o in a)if(a.hasOwnProperty(o)&&(u=a[o],u!=null))switch(o){case"value":l=u;break;case"defaultValue":n=u;break;case"children":i=u;break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(w(91));break;default:G(t,e,o,u,a,null)}Hm(t,l,n,i);return;case"option":for(r in a)if(a.hasOwnProperty(r)&&(l=a[r],l!=null))switch(r){case"selected":t.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:G(t,e,r,l,a,null)}return;case"dialog":R("beforetoggle",t),R("toggle",t),R("cancel",t),R("close",t);break;case"iframe":case"object":R("load",t);break;case"video":case"audio":for(l=0;l<ei.length;l++)R(ei[l],t);break;case"image":R("error",t),R("load",t);break;case"details":R("toggle",t);break;case"embed":case"source":case"link":R("error",t),R("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(p in a)if(a.hasOwnProperty(p)&&(l=a[p],l!=null))switch(p){case"children":case"dangerouslySetInnerHTML":throw Error(w(137,e));default:G(t,e,p,l,a,null)}return;default:if(us(e)){for(g in a)a.hasOwnProperty(g)&&(l=a[g],l!==void 0&&Qr(t,e,g,l,a,void 0));return}}for(u in a)a.hasOwnProperty(u)&&(l=a[u],l!=null&&G(t,e,u,l,a,null))}function zb(t,e,a,l){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var n=null,i=null,o=null,u=null,r=null,p=null,g=null;for(y in a){var v=a[y];if(a.hasOwnProperty(y)&&v!=null)switch(y){case"checked":break;case"value":break;case"defaultValue":r=v;default:l.hasOwnProperty(y)||G(t,e,y,null,l,v)}}for(var m in l){var y=l[m];if(v=a[m],l.hasOwnProperty(m)&&(y!=null||v!=null))switch(m){case"type":i=y;break;case"name":n=y;break;case"checked":p=y;break;case"defaultChecked":g=y;break;case"value":o=y;break;case"defaultValue":u=y;break;case"children":case"dangerouslySetInnerHTML":if(y!=null)throw Error(w(137,e));break;default:y!==v&&G(t,e,m,y,l,v)}}gr(t,o,u,r,p,g,i,n);return;case"select":y=o=u=m=null;for(i in a)if(r=a[i],a.hasOwnProperty(i)&&r!=null)switch(i){case"value":break;case"multiple":y=r;default:l.hasOwnProperty(i)||G(t,e,i,null,l,r)}for(n in l)if(i=l[n],r=a[n],l.hasOwnProperty(n)&&(i!=null||r!=null))switch(n){case"value":m=i;break;case"defaultValue":u=i;break;case"multiple":o=i;default:i!==r&&G(t,e,n,i,l,r)}e=u,a=o,l=y,m!=null?Ll(t,!!a,m,!1):!!l!=!!a&&(e!=null?Ll(t,!!a,e,!0):Ll(t,!!a,a?[]:"",!1));return;case"textarea":y=m=null;for(u in a)if(n=a[u],a.hasOwnProperty(u)&&n!=null&&!l.hasOwnProperty(u))switch(u){case"value":break;case"children":break;default:G(t,e,u,null,l,n)}for(o in l)if(n=l[o],i=a[o],l.hasOwnProperty(o)&&(n!=null||i!=null))switch(o){case"value":m=n;break;case"defaultValue":y=n;break;case"children":break;case"dangerouslySetInnerHTML":if(n!=null)throw Error(w(91));break;default:n!==i&&G(t,e,o,n,l,i)}qm(t,m,y);return;case"option":for(var E in a)if(m=a[E],a.hasOwnProperty(E)&&m!=null&&!l.hasOwnProperty(E))switch(E){case"selected":t.selected=!1;break;default:G(t,e,E,null,l,m)}for(r in l)if(m=l[r],y=a[r],l.hasOwnProperty(r)&&m!==y&&(m!=null||y!=null))switch(r){case"selected":t.selected=m&&typeof m!="function"&&typeof m!="symbol";break;default:G(t,e,r,m,l,y)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var _ in a)m=a[_],a.hasOwnProperty(_)&&m!=null&&!l.hasOwnProperty(_)&&G(t,e,_,null,l,m);for(p in l)if(m=l[p],y=a[p],l.hasOwnProperty(p)&&m!==y&&(m!=null||y!=null))switch(p){case"children":case"dangerouslySetInnerHTML":if(m!=null)throw Error(w(137,e));break;default:G(t,e,p,m,l,y)}return;default:if(us(e)){for(var C in a)m=a[C],a.hasOwnProperty(C)&&m!==void 0&&!l.hasOwnProperty(C)&&Qr(t,e,C,void 0,l,m);for(g in l)m=l[g],y=a[g],!l.hasOwnProperty(g)||m===y||m===void 0&&y===void 0||Qr(t,e,g,m,l,y);return}}for(var f in a)m=a[f],a.hasOwnProperty(f)&&m!=null&&!l.hasOwnProperty(f)&&G(t,e,f,null,l,m);for(v in l)m=l[v],y=a[v],!l.hasOwnProperty(v)||m===y||m==null&&y==null||G(t,e,v,m,l,y)}function tm(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Nb(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,a=performance.getEntriesByType("resource"),l=0;l<a.length;l++){var n=a[l],i=n.transferSize,o=n.initiatorType,u=n.duration;if(i&&u&&tm(o)){for(o=0,u=n.responseEnd,l+=1;l<a.length;l++){var r=a[l],p=r.startTime;if(p>u)break;var g=r.transferSize,v=r.initiatorType;g&&tm(v)&&(r=r.responseEnd,o+=g*(r<u?1:(u-p)/(r-p)))}if(--l,e+=8*(i+o)/(n.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Xr=null,Zr=null;function lu(t){return t.nodeType===9?t:t.ownerDocument}function em(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Gg(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function Kr(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var nr=null;function Cb(){var t=window.event;return t&&t.type==="popstate"?t===nr?!1:(nr=t,!0):(nr=null,!1)}var Qg=typeof setTimeout=="function"?setTimeout:void 0,Ob=typeof clearTimeout=="function"?clearTimeout:void 0,am=typeof Promise=="function"?Promise:void 0,$b=typeof queueMicrotask=="function"?queueMicrotask:typeof am<"u"?function(t){return am.resolve(null).then(t).catch(Rb)}:Qg;function Rb(t){setTimeout(function(){throw t})}function Oa(t){return t==="head"}function lm(t,e){var a=e,l=0;do{var n=a.nextSibling;if(t.removeChild(a),n&&n.nodeType===8)if(a=n.data,a==="/$"||a==="/&"){if(l===0){t.removeChild(n),Il(e);return}l--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")l++;else if(a==="html")Qn(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,Qn(a);for(var i=a.firstChild;i;){var o=i.nextSibling,u=i.nodeName;i[si]||u==="SCRIPT"||u==="STYLE"||u==="LINK"&&i.rel.toLowerCase()==="stylesheet"||a.removeChild(i),i=o}}else a==="body"&&Qn(t.ownerDocument.body);a=n}while(a);Il(e)}function nm(t,e){var a=t;t=0;do{var l=a.nextSibling;if(a.nodeType===1?e?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(e?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),l&&l.nodeType===8)if(a=l.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=l}while(a)}function Jr(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var a=e;switch(e=e.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Jr(a),os(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function Ub(t,e,a,l){for(;t.nodeType===1;){var n=a;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!l&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(l){if(!t[si])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(i=t.getAttribute("rel"),i==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(i!==n.rel||t.getAttribute("href")!==(n.href==null||n.href===""?null:n.href)||t.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin)||t.getAttribute("title")!==(n.title==null?null:n.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(i=t.getAttribute("src"),(i!==(n.src==null?null:n.src)||t.getAttribute("type")!==(n.type==null?null:n.type)||t.getAttribute("crossorigin")!==(n.crossOrigin==null?null:n.crossOrigin))&&i&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var i=n.name==null?null:""+n.name;if(n.type==="hidden"&&t.getAttribute("name")===i)return t}else return t;if(t=se(t.nextSibling),t===null)break}return null}function Db(t,e,a){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=se(t.nextSibling),t===null))return null;return t}function Xg(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=se(t.nextSibling),t===null))return null;return t}function Wr(t){return t.data==="$?"||t.data==="$~"}function Fr(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function Lb(t,e){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||a.readyState!=="loading")e();else{var l=function(){e(),a.removeEventListener("DOMContentLoaded",l)};a.addEventListener("DOMContentLoaded",l),t._reactRetry=l}}function se(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var Ir=null;function im(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(e===0)return se(t.nextSibling);e--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||e++}t=t.nextSibling}return null}function om(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(e===0)return t;e--}else a!=="/$"&&a!=="/&"||e++}t=t.previousSibling}return null}function Zg(t,e,a){switch(e=lu(a),t){case"html":if(t=e.documentElement,!t)throw Error(w(452));return t;case"head":if(t=e.head,!t)throw Error(w(453));return t;case"body":if(t=e.body,!t)throw Error(w(454));return t;default:throw Error(w(451))}}function Qn(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);os(t)}var fe=new Map,um=new Set;function nu(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Pe=j.d;j.d={f:Bb,r:qb,D:Hb,C:Yb,L:jb,m:Vb,X:Gb,S:kb,M:Qb};function Bb(){var t=Pe.f(),e=wu();return t||e}function qb(t){var e=tn(t);e!==null&&e.tag===5&&e.type==="form"?Yh(e):Pe.r(t)}var nn=typeof document>"u"?null:document;function Kg(t,e,a){var l=nn;if(l&&typeof e=="string"&&e){var n=oe(e);n='link[rel="'+t+'"][href="'+n+'"]',typeof a=="string"&&(n+='[crossorigin="'+a+'"]'),um.has(n)||(um.add(n),t={rel:t,crossOrigin:a,href:e},l.querySelector(n)===null&&(e=l.createElement("link"),Et(e,"link",t),gt(e),l.head.appendChild(e)))}}function Hb(t){Pe.D(t),Kg("dns-prefetch",t,null)}function Yb(t,e){Pe.C(t,e),Kg("preconnect",t,e)}function jb(t,e,a){Pe.L(t,e,a);var l=nn;if(l&&t&&e){var n='link[rel="preload"][as="'+oe(e)+'"]';e==="image"&&a&&a.imageSrcSet?(n+='[imagesrcset="'+oe(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(n+='[imagesizes="'+oe(a.imageSizes)+'"]')):n+='[href="'+oe(t)+'"]';var i=n;switch(e){case"style":i=Fl(t);break;case"script":i=on(t)}fe.has(i)||(t=I({rel:"preload",href:e==="image"&&a&&a.imageSrcSet?void 0:t,as:e},a),fe.set(i,t),l.querySelector(n)!==null||e==="style"&&l.querySelector(gi(i))||e==="script"&&l.querySelector(yi(i))||(e=l.createElement("link"),Et(e,"link",t),gt(e),l.head.appendChild(e)))}}function Vb(t,e){Pe.m(t,e);var a=nn;if(a&&t){var l=e&&typeof e.as=="string"?e.as:"script",n='link[rel="modulepreload"][as="'+oe(l)+'"][href="'+oe(t)+'"]',i=n;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=on(t)}if(!fe.has(i)&&(t=I({rel:"modulepreload",href:t},e),fe.set(i,t),a.querySelector(n)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(yi(i)))return}l=a.createElement("link"),Et(l,"link",t),gt(l),a.head.appendChild(l)}}}function kb(t,e,a){Pe.S(t,e,a);var l=nn;if(l&&t){var n=Dl(l).hoistableStyles,i=Fl(t);e=e||"default";var o=n.get(i);if(!o){var u={loading:0,preload:null};if(o=l.querySelector(gi(i)))u.loading=5;else{t=I({rel:"stylesheet",href:t,"data-precedence":e},a),(a=fe.get(i))&&Qs(t,a);var r=o=l.createElement("link");gt(r),Et(r,"link",t),r._p=new Promise(function(p,g){r.onload=p,r.onerror=g}),r.addEventListener("load",function(){u.loading|=1}),r.addEventListener("error",function(){u.loading|=2}),u.loading|=4,Co(o,e,l)}o={type:"stylesheet",instance:o,count:1,state:u},n.set(i,o)}}}function Gb(t,e){Pe.X(t,e);var a=nn;if(a&&t){var l=Dl(a).hoistableScripts,n=on(t),i=l.get(n);i||(i=a.querySelector(yi(n)),i||(t=I({src:t,async:!0},e),(e=fe.get(n))&&Xs(t,e),i=a.createElement("script"),gt(i),Et(i,"link",t),a.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(n,i))}}function Qb(t,e){Pe.M(t,e);var a=nn;if(a&&t){var l=Dl(a).hoistableScripts,n=on(t),i=l.get(n);i||(i=a.querySelector(yi(n)),i||(t=I({src:t,async:!0,type:"module"},e),(e=fe.get(n))&&Xs(t,e),i=a.createElement("script"),gt(i),Et(i,"link",t),a.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},l.set(n,i))}}function cm(t,e,a,l){var n=(n=ya.current)?nu(n):null;if(!n)throw Error(w(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(e=Fl(a.href),a=Dl(n).hoistableStyles,l=a.get(e),l||(l={type:"style",instance:null,count:0,state:null},a.set(e,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=Fl(a.href);var i=Dl(n).hoistableStyles,o=i.get(t);if(o||(n=n.ownerDocument||n,o={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(t,o),(i=n.querySelector(gi(t)))&&!i._p&&(o.instance=i,o.state.loading=5),fe.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},fe.set(t,a),i||Xb(n,t,a,o.state))),e&&l===null)throw Error(w(528,""));return o}if(e&&l!==null)throw Error(w(529,""));return null;case"script":return e=a.async,a=a.src,typeof a=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=on(a),a=Dl(n).hoistableScripts,l=a.get(e),l||(l={type:"script",instance:null,count:0,state:null},a.set(e,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(w(444,t))}}function Fl(t){return'href="'+oe(t)+'"'}function gi(t){return'link[rel="stylesheet"]['+t+"]"}function Jg(t){return I({},t,{"data-precedence":t.precedence,precedence:null})}function Xb(t,e,a,l){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?l.loading=1:(e=t.createElement("link"),l.preload=e,e.addEventListener("load",function(){return l.loading|=1}),e.addEventListener("error",function(){return l.loading|=2}),Et(e,"link",a),gt(e),t.head.appendChild(e))}function on(t){return'[src="'+oe(t)+'"]'}function yi(t){return"script[async]"+t}function rm(t,e,a){if(e.count++,e.instance===null)switch(e.type){case"style":var l=t.querySelector('style[data-href~="'+oe(a.href)+'"]');if(l)return e.instance=l,gt(l),l;var n=I({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return l=(t.ownerDocument||t).createElement("style"),gt(l),Et(l,"style",n),Co(l,a.precedence,t),e.instance=l;case"stylesheet":n=Fl(a.href);var i=t.querySelector(gi(n));if(i)return e.state.loading|=4,e.instance=i,gt(i),i;l=Jg(a),(n=fe.get(n))&&Qs(l,n),i=(t.ownerDocument||t).createElement("link"),gt(i);var o=i;return o._p=new Promise(function(u,r){o.onload=u,o.onerror=r}),Et(i,"link",l),e.state.loading|=4,Co(i,a.precedence,t),e.instance=i;case"script":return i=on(a.src),(n=t.querySelector(yi(i)))?(e.instance=n,gt(n),n):(l=a,(n=fe.get(i))&&(l=I({},a),Xs(l,n)),t=t.ownerDocument||t,n=t.createElement("script"),gt(n),Et(n,"link",l),t.head.appendChild(n),e.instance=n);case"void":return null;default:throw Error(w(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(l=e.instance,e.state.loading|=4,Co(l,a.precedence,t));return e.instance}function Co(t,e,a){for(var l=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),n=l.length?l[l.length-1]:null,i=n,o=0;o<l.length;o++){var u=l[o];if(u.dataset.precedence===e)i=u;else if(i!==n)break}i?i.parentNode.insertBefore(t,i.nextSibling):(e=a.nodeType===9?a.head:a,e.insertBefore(t,e.firstChild))}function Qs(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function Xs(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var Oo=null;function sm(t,e,a){if(Oo===null){var l=new Map,n=Oo=new Map;n.set(a,l)}else n=Oo,l=n.get(a),l||(l=new Map,n.set(a,l));if(l.has(t))return l;for(l.set(t,null),a=a.getElementsByTagName(t),n=0;n<a.length;n++){var i=a[n];if(!(i[si]||i[St]||t==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var o=i.getAttribute(e)||"";o=t+o;var u=l.get(o);u?u.push(i):l.set(o,[i])}}return l}function fm(t,e,a){t=t.ownerDocument||t,t.head.insertBefore(a,e==="title"?t.querySelector("head > title"):null)}function Zb(t,e,a){if(a===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function Wg(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function Kb(t,e,a,l){if(a.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var n=Fl(l.href),i=e.querySelector(gi(n));if(i){e=i._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=iu.bind(t),e.then(t,t)),a.state.loading|=4,a.instance=i,gt(i);return}i=e.ownerDocument||e,l=Jg(l),(n=fe.get(n))&&Qs(l,n),i=i.createElement("link"),gt(i);var o=i;o._p=new Promise(function(u,r){o.onload=u,o.onerror=r}),Et(i,"link",l),a.instance=i}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,e),(e=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=iu.bind(t),e.addEventListener("load",a),e.addEventListener("error",a))}}var ir=0;function Jb(t,e){return t.stylesheets&&t.count===0&&$o(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var l=setTimeout(function(){if(t.stylesheets&&$o(t,t.stylesheets),t.unsuspend){var i=t.unsuspend;t.unsuspend=null,i()}},6e4+e);0<t.imgBytes&&ir===0&&(ir=62500*Nb());var n=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&$o(t,t.stylesheets),t.unsuspend)){var i=t.unsuspend;t.unsuspend=null,i()}},(t.imgBytes>ir?50:800)+e);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(l),clearTimeout(n)}}:null}function iu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)$o(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var ou=null;function $o(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,ou=new Map,e.forEach(Wb,t),ou=null,iu.call(t))}function Wb(t,e){if(!(e.state.loading&4)){var a=ou.get(t);if(a)var l=a.get(null);else{a=new Map,ou.set(t,a);for(var n=t.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<n.length;i++){var o=n[i];(o.nodeName==="LINK"||o.getAttribute("media")!=="not all")&&(a.set(o.dataset.precedence,o),l=o)}l&&a.set(null,l)}n=e.instance,o=n.getAttribute("data-precedence"),i=a.get(o)||l,i===l&&a.set(null,n),a.set(o,n),this.count++,l=iu.bind(this),n.addEventListener("load",l),n.addEventListener("error",l),i?i.parentNode.insertBefore(n,i.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(n,t.firstChild)),e.state.loading|=4}}var li={$$typeof:Ve,Provider:null,Consumer:null,_currentValue:Xa,_currentValue2:Xa,_threadCount:0};function Fb(t,e,a,l,n,i,o,u,r){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Oc(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Oc(0),this.hiddenUpdates=Oc(null),this.identifierPrefix=l,this.onUncaughtError=n,this.onCaughtError=i,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=r,this.incompleteTransitions=new Map}function Fg(t,e,a,l,n,i,o,u,r,p,g,v){return t=new Fb(t,e,a,o,r,p,g,v,u),e=1,i===!0&&(e|=24),i=Qt(3,null,null,e),t.current=i,i.stateNode=t,e=vs(),e.refCount++,t.pooledCache=e,e.refCount++,i.memoizedState={element:l,isDehydrated:a,cache:e},ws(i),t}function Ig(t){return t?(t=Ol,t):Ol}function Pg(t,e,a,l,n,i){n=Ig(n),l.context===null?l.context=n:l.pendingContext=n,l=ba(e),l.payload={element:a},i=i===void 0?null:i,i!==null&&(l.callback=i),a=Sa(t,l,e),a!==null&&(Ht(a,t,e),Bn(a,t,e))}function dm(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<e?a:e}}function Zs(t,e){dm(t,e),(t=t.alternate)&&dm(t,e)}function t0(t){if(t.tag===13||t.tag===31){var e=il(t,67108864);e!==null&&Ht(e,t,67108864),Zs(t,67108864)}}function pm(t){if(t.tag===13||t.tag===31){var e=Wt();e=ns(e);var a=il(t,e);a!==null&&Ht(a,t,e),Zs(t,e)}}var uu=!0;function Ib(t,e,a,l){var n=z.T;z.T=null;var i=j.p;try{j.p=2,Ks(t,e,a,l)}finally{j.p=i,z.T=n}}function Pb(t,e,a,l){var n=z.T;z.T=null;var i=j.p;try{j.p=8,Ks(t,e,a,l)}finally{j.p=i,z.T=n}}function Ks(t,e,a,l){if(uu){var n=Pr(l);if(n===null)lr(t,e,l,cu,a),mm(t,l);else if(eS(n,t,e,a,l))l.stopPropagation();else if(mm(t,l),e&4&&-1<tS.indexOf(t)){for(;n!==null;){var i=tn(n);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var o=ka(i.pendingLanes);if(o!==0){var u=i;for(u.pendingLanes|=2,u.entangledLanes|=2;o;){var r=1<<31-Jt(o);u.entanglements[1]|=r,o&=~r}Ne(i),(Y&6)===0&&(Fo=Zt()+500,hi(0,!1))}}break;case 31:case 13:u=il(i,2),u!==null&&Ht(u,i,2),wu(),Zs(i,2)}if(i=Pr(l),i===null&&lr(t,e,l,cu,a),i===n)break;n=i}n!==null&&l.stopPropagation()}else lr(t,e,l,null,a)}}function Pr(t){return t=cs(t),Js(t)}var cu=null;function Js(t){if(cu=null,t=Al(t),t!==null){var e=oi(t);if(e===null)t=null;else{var a=e.tag;if(a===13){if(t=Sm(e),t!==null)return t;t=null}else if(a===31){if(t=wm(e),t!==null)return t;t=null}else if(a===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return cu=t,null}function e0(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(jv()){case Am:return 2;case _m:return 8;case Bo:case Vv:return 32;case Mm:return 268435456;default:return 32}default:return 32}}var ts=!1,Ea=null,Ta=null,Aa=null,ni=new Map,ii=new Map,fa=[],tS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function mm(t,e){switch(t){case"focusin":case"focusout":Ea=null;break;case"dragenter":case"dragleave":Ta=null;break;case"mouseover":case"mouseout":Aa=null;break;case"pointerover":case"pointerout":ni.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":ii.delete(e.pointerId)}}function _n(t,e,a,l,n,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:a,eventSystemFlags:l,nativeEvent:i,targetContainers:[n]},e!==null&&(e=tn(e),e!==null&&t0(e)),t):(t.eventSystemFlags|=l,e=t.targetContainers,n!==null&&e.indexOf(n)===-1&&e.push(n),t)}function eS(t,e,a,l,n){switch(e){case"focusin":return Ea=_n(Ea,t,e,a,l,n),!0;case"dragenter":return Ta=_n(Ta,t,e,a,l,n),!0;case"mouseover":return Aa=_n(Aa,t,e,a,l,n),!0;case"pointerover":var i=n.pointerId;return ni.set(i,_n(ni.get(i)||null,t,e,a,l,n)),!0;case"gotpointercapture":return i=n.pointerId,ii.set(i,_n(ii.get(i)||null,t,e,a,l,n)),!0}return!1}function a0(t){var e=Al(t.target);if(e!==null){var a=oi(e);if(a!==null){if(e=a.tag,e===13){if(e=Sm(a),e!==null){t.blockedOn=e,Fd(t.priority,function(){pm(a)});return}}else if(e===31){if(e=wm(a),e!==null){t.blockedOn=e,Fd(t.priority,function(){pm(a)});return}}else if(e===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ro(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var a=Pr(t.nativeEvent);if(a===null){a=t.nativeEvent;var l=new a.constructor(a.type,a);vr=l,a.target.dispatchEvent(l),vr=null}else return e=tn(a),e!==null&&t0(e),t.blockedOn=a,!1;e.shift()}return!0}function hm(t,e,a){Ro(t)&&a.delete(e)}function aS(){ts=!1,Ea!==null&&Ro(Ea)&&(Ea=null),Ta!==null&&Ro(Ta)&&(Ta=null),Aa!==null&&Ro(Aa)&&(Aa=null),ni.forEach(hm),ii.forEach(hm)}function yo(t,e){t.blockedOn===e&&(t.blockedOn=null,ts||(ts=!0,pt.unstable_scheduleCallback(pt.unstable_NormalPriority,aS)))}var vo=null;function gm(t){vo!==t&&(vo=t,pt.unstable_scheduleCallback(pt.unstable_NormalPriority,function(){vo===t&&(vo=null);for(var e=0;e<t.length;e+=3){var a=t[e],l=t[e+1],n=t[e+2];if(typeof l!="function"){if(Js(l||a)===null)continue;break}var i=tn(a);i!==null&&(t.splice(e,3),e-=3,Ur(i,{pending:!0,data:n,method:a.method,action:l},l,n))}}))}function Il(t){function e(r){return yo(r,t)}Ea!==null&&yo(Ea,t),Ta!==null&&yo(Ta,t),Aa!==null&&yo(Aa,t),ni.forEach(e),ii.forEach(e);for(var a=0;a<fa.length;a++){var l=fa[a];l.blockedOn===t&&(l.blockedOn=null)}for(;0<fa.length&&(a=fa[0],a.blockedOn===null);)a0(a),a.blockedOn===null&&fa.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(l=0;l<a.length;l+=3){var n=a[l],i=a[l+1],o=n[Yt]||null;if(typeof i=="function")o||gm(a);else if(o){var u=null;if(i&&i.hasAttribute("formAction")){if(n=i,o=i[Yt]||null)u=o.formAction;else if(Js(n)!==null)continue}else u=o.action;typeof u=="function"?a[l+1]=u:(a.splice(l,3),l-=3),gm(a)}}}function l0(){function t(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(o){return n=o})},focusReset:"manual",scroll:"manual"})}function e(){n!==null&&(n(),n=null),l||setTimeout(a,20)}function a(){if(!l&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,n=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(a,100),function(){l=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),n!==null&&(n(),n=null)}}}function Ws(t){this._internalRoot=t}Tu.prototype.render=Ws.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(w(409));var a=e.current,l=Wt();Pg(a,l,t,e,null,null)};Tu.prototype.unmount=Ws.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Pg(t.current,2,null,t,null,null),wu(),e[Pl]=null}};function Tu(t){this._internalRoot=t}Tu.prototype.unstable_scheduleHydration=function(t){if(t){var e=$m();t={blockedOn:null,target:t,priority:e};for(var a=0;a<fa.length&&e!==0&&e<fa[a].priority;a++);fa.splice(a,0,t),a===0&&a0(t)}};var ym=vm.version;if(ym!=="19.2.5")throw Error(w(527,ym,"19.2.5"));j.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(w(188)):(t=Object.keys(t).join(","),Error(w(268,t)));return t=Uv(e),t=t!==null?xm(t):null,t=t===null?null:t.stateNode,t};var lS={bundleType:0,version:"19.2.5",rendererPackageName:"react-dom",currentDispatcherRef:z,reconcilerVersion:"19.2.5"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Mn=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Mn.isDisabled&&Mn.supportsFiber))try{ui=Mn.inject(lS),Kt=Mn}catch{}var Mn;Au.createRoot=function(t,e){if(!bm(t))throw Error(w(299));var a=!1,l="",n=Kh,i=Jh,o=Wh;return e!=null&&(e.unstable_strictMode===!0&&(a=!0),e.identifierPrefix!==void 0&&(l=e.identifierPrefix),e.onUncaughtError!==void 0&&(n=e.onUncaughtError),e.onCaughtError!==void 0&&(i=e.onCaughtError),e.onRecoverableError!==void 0&&(o=e.onRecoverableError)),e=Fg(t,1,!1,null,null,a,l,null,n,i,o,l0),t[Pl]=e.current,Gs(t),new Ws(e)};Au.hydrateRoot=function(t,e,a){if(!bm(t))throw Error(w(299));var l=!1,n="",i=Kh,o=Jh,u=Wh,r=null;return a!=null&&(a.unstable_strictMode===!0&&(l=!0),a.identifierPrefix!==void 0&&(n=a.identifierPrefix),a.onUncaughtError!==void 0&&(i=a.onUncaughtError),a.onCaughtError!==void 0&&(o=a.onCaughtError),a.onRecoverableError!==void 0&&(u=a.onRecoverableError),a.formState!==void 0&&(r=a.formState)),e=Fg(t,1,!0,e,a??null,l,n,r,i,o,u,l0),e.context=Ig(null),a=e.current,l=Wt(),l=ns(l),n=ba(l),n.callback=null,Sa(a,n,l),a=l,e.current.lanes=a,ri(e,a),Ne(e),t[Pl]=e.current,Gs(t),new Tu(e)};Au.version="19.2.5"});var u0=Se((I2,o0)=>{"use strict";function i0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i0)}catch(t){console.error(t)}}i0(),o0.exports=n0()});var Q0=Se(Cu=>{"use strict";var NS=Symbol.for("react.transitional.element"),CS=Symbol.for("react.fragment");function G0(t,e,a){var l=null;if(a!==void 0&&(l=""+a),e.key!==void 0&&(l=""+e.key),"key"in e){a={};for(var n in e)n!=="key"&&(a[n]=e[n])}else a=e;return e=a.ref,{$$typeof:NS,type:t,key:l,ref:e!==void 0?e:null,props:a}}Cu.Fragment=CS;Cu.jsx=G0;Cu.jsxs=G0});var ot=Se((Uw,X0)=>{"use strict";X0.exports=Q0()});var c="lookmovie2-enhancer",Ju=`${c}:settings`,Wu=`${c}:watchlist`,Fu=`${c}:movie-watchlist`,Iu=`${c}:playlist`,ji=`${c}:playlist-session`,Vi=`${c}:shows-list-progress`,Pu=`${c}:resume-points`,tc=`${c}:intro-times`,ec=`${c}:backup-snapshots`,Yf=14,ac=`${c}-style`,lc=`${c}-site-theme`,nc=`${c}-ad-bypass-style`,dl=`${c}-fullscreen-style`,we=`${c}-fullscreen-exit`,S=`${c}-root`,ki=`${c}:ntfy-active-tab`,jf=15e3,Vf=500,kf=/^[A-Za-z0-9_-]{1,64}$/,Gf=3600*1e3,Qf=1e3,Gi=95,Xf=2,ic=2e3,Zf=30*1e3,Kf=25,Jf=10,Wf=8,Ff=300,qa=Object.freeze([.5,.75,1,1.25,1.5,1.75,2]),Mt=Object.freeze({autoPlay:!0,autoFullscreen:!0,windowedFullscreen:!0,autoNextEpisode:!0,autoSkipIntro:!0,autoSkipCredits:!0,playbackRate:1,siteTheme:!0,ntfyRemoteEnabled:!1,ntfyServer:"https://ntfy.sh",ntfyTopic:"",ntfyControlTopic:"",ntfyCommandSecret:""});function et(t){let e=Number.parseInt(String(t),10);return Number.isFinite(e)&&e>0?e:0}async function Qi(t){let e=await fetch(t,{credentials:"same-origin"});if(!e.ok)throw new Error(`Request failed (${e.status})`);return e.text()}async function Xi(t){let e=await fetch(t,{credentials:"same-origin"});if(!e.ok)throw new Error(`Request failed (${e.status})`);return e.json()}function xe(t){return t?t.replaceAll("\\'","'").replaceAll("\\\\","\\"):""}function ut(t){let e=typeof t=="string"?t.trim():"";if(!e||e.startsWith("data:image/"))return"";let a=typeof window<"u"&&window.location?window.location.href:"https://www.lookmovie2.to/";try{return new URL(e,a).href}catch{return e.startsWith("//")?`https:${e}`:e}}function la(t){if(!t)return"";let a=(t.getAttribute("style")||"").match(/background-image:\s*url\((['"]?)(.*?)\1\)/i),l=[t.getAttribute("content"),t.getAttribute("data-lazy-background"),t.getAttribute("data-src-portrait"),t.getAttribute("data-background-image"),t.getAttribute("data-src"),a?.[2],t.getAttribute("src")];return ut(l.find(n=>typeof n=="string"&&n.trim()&&!n.trim().startsWith("data:image/"))||"")}function If(t){if(!t||typeof t.getBoundingClientRect!="function")return!1;let e=t.getBoundingClientRect();return e.width>0&&e.height>0}function Pf(t){return`${t.textContent||""} ${t.getAttribute("aria-label")||""} ${t.getAttribute("title")||""}`.trim()}function zt(t){if(!t||typeof t!="object")return null;let e=et(t.season),a=et(t.episode),l=et(t.idEpisode||t.id_episode);return!e||!a||!l?null:{season:e,episode:a,idEpisode:l,watchedAt:typeof t.watchedAt=="number"?t.watchedAt:void 0,updatedAt:typeof t.updatedAt=="number"?t.updatedAt:void 0}}function Ut(t){return t?`S${String(t.season).padStart(2,"0")}E${String(t.episode).padStart(2,"0")}`:"Unknown episode"}function Oe(t,e){return!t&&!e?0:t?e?t.season!==e.season?t.season-e.season:t.episode!==e.episode?t.episode-e.episode:t.idEpisode-e.idEpisode:1:-1}function oc(t,e){return!t||!e?!1:t.idEpisode===e.idEpisode&&t.season===e.season&&t.episode===e.episode}function $e(t){return!!t&&oc(t.latestEpisode,t.lastWatched)}function pl(){return typeof GM_getValue=="function"&&typeof GM_setValue=="function"}function Ha(t){if(pl()){let a=GM_getValue(t,null);if(typeof a=="string")return a}let e=localStorage.getItem(t);return e!==null&&pl()&&GM_setValue(t,e),e}function Re(t,e){pl()&&GM_setValue(t,e);try{e===null?localStorage.removeItem(t):localStorage.setItem(t,e)}catch(a){if(!pl())throw a}}function uc(t){return{autoPlay:typeof t.autoPlay=="boolean"?t.autoPlay:Mt.autoPlay,autoFullscreen:typeof t.autoFullscreen=="boolean"?t.autoFullscreen:Mt.autoFullscreen,windowedFullscreen:typeof t.windowedFullscreen=="boolean"?t.windowedFullscreen:Mt.windowedFullscreen,autoNextEpisode:typeof t.autoNextEpisode=="boolean"?t.autoNextEpisode:Mt.autoNextEpisode,autoSkipIntro:typeof t.autoSkipIntro=="boolean"?t.autoSkipIntro:Mt.autoSkipIntro,autoSkipCredits:typeof t.autoSkipCredits=="boolean"?t.autoSkipCredits:Mt.autoSkipCredits,playbackRate:qa.includes(Number(t.playbackRate))?Number(t.playbackRate):Mt.playbackRate,siteTheme:typeof t.siteTheme=="boolean"?t.siteTheme:Mt.siteTheme,ntfyRemoteEnabled:typeof t.ntfyRemoteEnabled=="boolean"?t.ntfyRemoteEnabled:Mt.ntfyRemoteEnabled,ntfyServer:typeof t.ntfyServer=="string"&&t.ntfyServer.trim()?t.ntfyServer.trim().replace(/\/+$/,""):Mt.ntfyServer,ntfyTopic:typeof t.ntfyTopic=="string"&&t.ntfyTopic.trim()?t.ntfyTopic.trim():Mt.ntfyTopic,ntfyControlTopic:typeof t.ntfyControlTopic=="string"&&t.ntfyControlTopic.trim()?t.ntfyControlTopic.trim():Mt.ntfyControlTopic,ntfyCommandSecret:typeof t.ntfyCommandSecret=="string"&&t.ntfyCommandSecret.trim()?t.ntfyCommandSecret.trim():Mt.ntfyCommandSecret}}function ed(){try{let t=Ha(Ju),e=JSON.parse(t||"{}");return uc(e)}catch(t){return console.warn(`[${c}] Failed to load saved settings.`,t),{...Mt}}}function mn(t,e){if(!e||typeof e!="object")return null;let a=typeof t=="string"&&t.trim()?t.trim():"";return a?{slug:a,idShow:et(e.idShow||e.id_show),title:typeof e.title=="string"&&e.title.trim()?e.title.trim():a,year:typeof e.year=="string"||typeof e.year=="number"?String(e.year).trim():"",poster:typeof e.poster=="string"?e.poster:"",addedAt:typeof e.addedAt=="number"?e.addedAt:Date.now(),lastSyncedAt:typeof e.lastSyncedAt=="number"?e.lastSyncedAt:0,lastSyncError:typeof e.lastSyncError=="string"?e.lastSyncError:"",latestEpisode:zt(e.latestEpisode),lastWatched:zt(e.lastWatched),upcoming:sv(e.upcoming)}:null}function sv(t){if(!t||typeof t!="object"||!Array.isArray(t.episodes))return null;let e=t.episodes.map(zt).filter(Boolean),a=et(t.total);return{afterIdEpisode:et(t.afterIdEpisode),total:Math.max(a,e.length),episodes:e}}function ad(){try{let t=JSON.parse(Ha(Wu)||"{}"),e=t&&typeof t=="object"&&t.shows&&typeof t.shows=="object"?t.shows:{},a={};return Object.entries(e).forEach(([l,n])=>{let i=mn(l,n);i&&(a[l]=i)}),{shows:a}}catch(t){return console.warn(`[${c}] Failed to load watchlist.`,t),{shows:{}}}}function hn(t,e){if(!e||typeof e!="object")return null;let a=typeof t=="string"&&t.trim()?t.trim():"";return a?{slug:a,title:typeof e.title=="string"&&e.title.trim()?e.title.trim():a,year:typeof e.year=="string"||typeof e.year=="number"?String(e.year).trim():"",poster:typeof e.poster=="string"?e.poster:"",idMovie:et(e.idMovie||e.id_movie),href:typeof e.href=="string"?e.href:`/movies/view/${a}`,addedAt:typeof e.addedAt=="number"?e.addedAt:Date.now(),watched:!!e.watched,watchedAt:typeof e.watchedAt=="number"?e.watchedAt:void 0}:null}function ld(){try{let t=JSON.parse(Ha(Fu)||"{}"),e=t&&typeof t=="object"&&t.movies&&typeof t.movies=="object"?t.movies:{},a={};return Object.entries(e).forEach(([l,n])=>{let i=hn(l,n);i&&(a[l]=i)}),{movies:a}}catch(t){return console.warn(`[${c}] Failed to load movie watchlist.`,t),{movies:{}}}}function gn(t,e){if(!e||typeof e!="object")return null;let a=typeof e.slug=="string"&&e.slug.trim()?e.slug.trim():typeof t=="string"&&t.trim()?t.split(":")[0].trim():"",l=zt(e.episode||e.latestEpisode);return!a||!l?null:{key:typeof t=="string"&&t.trim()?t.trim():`${a}:${l.season}:${l.episode}:${l.idEpisode}`,slug:a,idShow:et(e.idShow||e.id_show),title:typeof e.title=="string"&&e.title.trim()?e.title.trim():a,year:typeof e.year=="string"||typeof e.year=="number"?String(e.year).trim():"",poster:typeof e.poster=="string"?e.poster:"",episode:l,addedAt:typeof e.addedAt=="number"?e.addedAt:Date.now()}}function nd(){try{let t=JSON.parse(Ha(Iu)||"{}"),e=t&&typeof t=="object"&&t.entries&&typeof t.entries=="object"?t.entries:{},a={};return Object.entries(e).forEach(([l,n])=>{let i=gn(l,n);i&&(a[i.key]=i)}),{entries:a}}catch(t){return console.warn(`[${c}] Failed to load playlist.`,t),{entries:{}}}}function id(t){return!t||typeof t!="object"?{active:!1,currentKey:"",startedAt:0}:{active:!!t.active,currentKey:typeof t.currentKey=="string"?t.currentKey:"",startedAt:typeof t.startedAt=="number"?t.startedAt:0}}function od(){try{return id(JSON.parse(Ha(ji)||"{}"))}catch(t){return console.warn(`[${c}] Failed to load playlist session.`,t),{active:!1,currentKey:"",startedAt:0}}}function Zi(t){if(!t||typeof t!="object")return null;let e=typeof t.slug=="string"&&t.slug.trim()?t.slug.trim():"",a=zt(t.episode);return!e||!a?null:{slug:e,title:typeof t.title=="string"?t.title:e,href:typeof t.href=="string"?t.href:"",episode:a,seenAt:typeof t.seenAt=="number"?t.seenAt:Date.now(),source:t.source==="manual"?"manual":"auto"}}function ud(){try{return Zi(JSON.parse(Ha(Vi)||"null"))}catch(t){return console.warn(`[${c}] Failed to load shows list progress.`,t),null}}function cd(t){try{Re(Ju,JSON.stringify(t))}catch(e){console.warn(`[${c}] Failed to save settings.`,e)}}function rd(t){try{Re(Wu,JSON.stringify(t)),dd({watchlist:t})}catch(e){console.warn(`[${c}] Failed to save watchlist.`,e)}}function sd(t){try{Re(Fu,JSON.stringify(t)),dd({movieWatchlist:t})}catch(e){console.warn(`[${c}] Failed to save movie watchlist.`,e)}}function cc(t){try{Re(Iu,JSON.stringify(t))}catch(e){console.warn(`[${c}] Failed to save playlist.`,e)}}function fd(t){try{let e=id(t);if(!e.active){Re(ji,null);return}Re(ji,JSON.stringify(e))}catch(e){console.warn(`[${c}] Failed to save playlist session.`,e)}}function rc(t){try{let e=Zi(t);if(!e){Re(Vi,null);return}Re(Vi,JSON.stringify(e))}catch(e){console.warn(`[${c}] Failed to save shows list progress.`,e)}}function td(t,e){return t&&t[e]&&typeof t[e]=="object"?Object.keys(t[e]).length:0}function fv(t=new Date){let e=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0");return`${t.getFullYear()}-${e}-${a}`}function Ki(){if(!pl())return[];try{let t=JSON.parse(GM_getValue(ec,null)||"[]");return Array.isArray(t)?t.filter(e=>e&&typeof e.date=="string"):[]}catch(t){return console.warn(`[${c}] Failed to load backup snapshots.`,t),[]}}function dd(t){if(pl())try{if(t.watchlist&&!td(t.watchlist,"shows")||t.movieWatchlist&&!td(t.movieWatchlist,"movies"))return;let e=fv(),a=Ki(),l=a.find(o=>o.date===e)||a[0]||{},i=[{watchlist:l.watchlist||{shows:{}},movieWatchlist:l.movieWatchlist||{movies:{}},...t,date:e,savedAt:Date.now()},...a.filter(o=>o.date!==e)].sort((o,u)=>u.date.localeCompare(o.date)).slice(0,Yf);GM_setValue(ec,JSON.stringify(i))}catch(e){console.warn(`[${c}] Failed to save backup snapshot.`,e)}}function pd(t,e){try{let a=JSON.parse(Ha(t)||"null");return a&&typeof a=="object"?a:e}catch(a){return console.warn(`[${c}] Failed to load ${t}.`,a),e}}function md(t,e){try{Re(t,JSON.stringify(e))}catch(a){console.warn(`[${c}] Failed to save ${t}.`,a)}}function sc(t){if(!t||typeof t!="object")return null;let e=Number(t.progress??t.currentTime),a=Number(t.duration);return!Number.isFinite(e)||!Number.isFinite(a)||e<0||a<=0?null:{progress:e,duration:a,savedAt:typeof t.savedAt=="number"?t.savedAt:Date.now()}}function hd(){let t={};return Object.entries(pd(Pu,{})).forEach(([e,a])=>{let l=sc(a);l&&(t[e]=l)}),t}function gd(t){md(Pu,t)}function dv(t){if(!t||typeof t!="object")return null;let e=Number(t.start),a=Number(t.end),l=Number.isFinite(e)&&Number.isFinite(a)&&e>=0&&a>e,n=Number(t.creditsFromEnd),i=Number.isFinite(n)&&n>0;return!l&&!i?null:{...l?{start:e,end:a}:{},...i?{creditsFromEnd:n}:{},updatedAt:typeof t.updatedAt=="number"?t.updatedAt:Date.now()}}function yd(){let t={};return Object.entries(pd(tc,{})).forEach(([e,a])=>{let l=dv(a);l&&(t[e]=l)}),t}function vd(t){md(tc,t)}var d={settings:ed(),watchlistStore:ad(),movieWatchlistStore:ld(),playlistStore:nd(),playlistSession:od(),showsListProgress:ud(),showsListProgressOrder:-1,showsListSeenCandidate:null,showsListSeenCandidateOrder:-1,showsListSessionTouched:!1,showsListManualMarkerSet:!1,showsListObserver:null,showsListMutationObserver:null,showsListRefreshScheduled:!1,showsListObservedCards:new WeakSet,domBootstrapped:!1,uiBootAttempts:0,fullscreenTriggered:!1,lastKnownUrl:location.href,watchlistRefreshPromise:null,watchlistBusy:!1,watchlistMessage:"",watchlistMessageTone:"muted",lastTrackedEpisodeSignature:"",ntfyRemoteStatus:"disabled",ntfyRemoteMessage:"",ntfyLastNotificationAt:0,ntfyRemoteTabId:`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`,ntfyRemoteClaimTimer:0};var Sy=Z(u0());var Fs=new Set;function c0(t){return Fs.add(t),()=>Fs.delete(t)}function un(){Fs.forEach(t=>t())}function r0(){return`
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
    `}var Vt=Z(Ya()),vy=Z(_c());var $t=null,s0="",bi=0,f0=0,d0=!1,_u=new Map;function he(t,e=""){d.ntfyRemoteStatus=t,d.ntfyRemoteMessage=e,un()}function Si(t){return String(t||"").trim().replace(/^\/+|\/+$/g,"")}function Ps(t){return kf.test(Si(t))}function p0(t,e){let a=Si(t);return a?a.length>64?`${e} topic must be 64 characters or fewer.`:`${e} topic can only use letters, numbers, hyphens, and underscores.`:`${e} topic is required.`}function lf(){return document.visibilityState!=="hidden"}function h0(){try{let t=JSON.parse(localStorage.getItem(ki)||"null");return t&&typeof t=="object"?t:null}catch{return null}}function g0(){try{localStorage.setItem(ki,JSON.stringify({tabId:d.ntfyRemoteTabId,href:location.href,title:w0(),updatedAt:Date.now()}))}catch(t){console.warn(`[${c}] Failed to claim ntfy remote tab.`,t)}}function nS(){let t=h0();!t||t.tabId!==d.ntfyRemoteTabId||localStorage.removeItem(ki)}function y0(){let t=h0();return!t||!t.tabId||t.tabId===d.ntfyRemoteTabId?!0:Date.now()-Number(t.updatedAt||0)>jf}function tf(t="activity"){return!d.settings.ntfyRemoteEnabled||!lf()||!ge()?!1:(g0(),he("connected",`This tab controls Android remote (${t}).`),!0)}function iS(){d.settings.ntfyRemoteEnabled&&y0()&&lf()&&ge()&&g0()}function ef(){nS()}function Mu(){let t=Si(d.settings.ntfyControlTopic);if(t)return t;let e=Si(d.settings.ntfyTopic);return e?`${e}-controls`:""}function v0(){let t=b0(),e=Mu();return Ps(t)?Ps(e)?"":p0(e,"Control"):p0(t,"Display")}function oS(){let t=String(d.settings.ntfyServer||"https://ntfy.sh").replace(/\/+$/,""),e=Mu();if(!t||!e||!Ps(e))return"";let a=new URL(`${t}/${encodeURIComponent(e)}/sse`);return a.searchParams.set("since",String(Math.floor(Date.now()/1e3))),a.toString()}function b0(){return Si(d.settings.ntfyTopic)}function S0(t){return`${String(d.settings.ntfyServer||"https://ntfy.sh").replace(/\/+$/,"")}/${encodeURIComponent(t)}`}function uS(){return String(d.settings.ntfyServer||"https://ntfy.sh").replace(/\/+$/,"")}function cS(t){let e=String(d.settings.ntfyCommandSecret||"").trim();return e?`${e} ${t}`:t}function vi(t,e){let a=Mu();return{action:"http",label:t,url:S0(a),method:"POST",body:cS(e),clear:!1}}function nf(){return location.pathname.startsWith("/shows/play/")}function rS(){if(of())return!0;let t=window.movie_storage||window.movie||{};return!nf()&&!!(t.id_movie||t.title||t.slug)}function sS(){let t=[vi("Play/Pause","toggle"),vi("Fullscreen","fullscreen")];return nf()?t.push(vi("Next","next")):rS()?t.push(vi("-30s","seek -30")):t.push(vi("+30s","seek 30")),t}function Is(t,e){let a=String(t||"").replace(/\s+/g," ").trim(),l=typeof e=="string"||typeof e=="number"?String(e).trim():"";if(!a)return"";if(/ \(\d{4}\)$/.test(a))return a;let n=a.match(/^(.*?)(\d{4})$/);return n&&n[1].trim()?`${n[1].trim()} (${n[2]})`:l&&!a.endsWith(`(${l})`)?`${a} (${l})`:a}function w0(){let t=window.show_storage||window.show||{},e=window.movie_storage||window.movie||{},a=typeof t.title=="string"&&t.title.trim()?Is(t.title,t.year):typeof e.title=="string"&&e.title.trim()?Is(e.title,e.year):"";if(a)return a;let l=document.querySelector("h1")?.textContent||document.querySelector(".movie-title, .film-title, .show-title")?.textContent||document.title||"LookMovie2";return Is(l)||"LookMovie2"}function fS(){let t=location.hash.match(/^#S(\d+)-E(\d+)-(\d+)$/i);return t?`S${String(t[1]).padStart(2,"0")}E${String(t[2]).padStart(2,"0")}`:""}function x0(){let t=window.show_storage||window.show||{},e=Number(window.id_show||t.id_show||t.idShow||0),a=Object.values(d.watchlistStore.shows||{});if(e){let n=a.find(i=>i.idShow===e);if(n)return n}let l=String(t.slug||"").trim();return l&&d.watchlistStore.shows[l]||null}function dS(){let t=window.show_storage||window.show||{},e=x0(),a=location.pathname.match(/\/shows\/view\/([^/?#]+)/i),n=document.querySelector('a[href*="/shows/view/"]')?.getAttribute("href")?.match(/\/shows\/view\/([^/?#]+)/i);return String(t.slug||"").trim()||String(t.seo_url||"").trim()||String(e?.slug||"").trim()||(a?a[1]:"")||(n?n[1]:"")}function pS(t){return t?_u.has(t)?Promise.resolve(_u.get(t)||""):fetch(`/shows/view/${encodeURIComponent(t)}`,{credentials:"same-origin"}).then(e=>{if(!e.ok)throw new Error(`Show poster request failed with HTTP ${e.status}`);return e.text()}).then(e=>{let a=e.match(/poster_medium:\s*'((?:\\'|[^'])*)'/),l=ut(a?xe(a[1]):"");return _u.set(t,l),l}).catch(e=>(console.warn(`[${c}] Could not resolve show poster for ntfy attachment.`,e),_u.set(t,""),"")):Promise.resolve("")}function mS(){let t=ge(),e=window.movie_storage||window.movie||{},a=window.show_storage||window.show||{},l=x0(),n=document.querySelector(['meta[property="og:image"]',".movie__poster[data-background-image]",'.movie__poster[style*="background-image"]',".movie-single-ct img[data-src]",".movie-single-ct img[src]",".internal-page-container img[data-src]",".internal-page-container img[src]","[data-background-image]",'[style*="background-image"]',"img[data-src-portrait]","img[data-src]"].join(", "));return ut(t?.getAttribute("poster"))||ut(e.movie_poster)||ut(e.poster_medium)||ut(a.poster_medium)||ut(a.poster_large)||ut(a.poster_original)||ut(a.poster)||ut(l?.poster)||la(n)}function hS(){let t=mS();return t||!nf()?Promise.resolve(t):pS(dS())}function gS(t,e,a="POST"){let l=JSON.stringify(e),n={"Content-Type":"application/json"};return fetch(t,{method:a,body:l,headers:n}).then(i=>{if(!i.ok)throw new Error(`ntfy request failed with HTTP ${i.status}`);return i}).catch(i=>{if(typeof GM_xmlhttpRequest!="function")throw i;return new Promise((o,u)=>{GM_xmlhttpRequest({method:a,url:t,data:l,headers:n,onload(r){if(r.status>=200&&r.status<300){o(r);return}u(new Error(`ntfy request failed with HTTP ${r.status}`))},onerror:u})})})}function yS(t,e,a,l="POST"){return fetch(t,{method:l,body:e,headers:a}).then(n=>{if(!n.ok)throw new Error(`ntfy request failed with HTTP ${n.status}`);return n})}function vS(t){return t?fetch(t,{credentials:"omit",referrerPolicy:"no-referrer"}).then(e=>{if(!e.ok)throw new Error(`Poster request failed with HTTP ${e.status}`);return e.blob()}).then(e=>!e||!e.size||e.size>15*1024*1024?null:e).catch(e=>(console.warn(`[${c}] Could not fetch poster for ntfy attachment.`,e),null)):Promise.resolve(null)}function bS(t,e,a){let l={Title:t.title,Message:t.message,Priority:String(t.priority),Tags:Array.isArray(t.tags)?t.tags.join(","):"",Click:t.click,Actions:JSON.stringify(t.actions||[]),"X-Sequence-ID":t.sequence_id};return e&&(l.Filename=e),a&&(l["Content-Type"]=a),Object.keys(l).forEach(n=>{l[n]||delete l[n]}),l}function SS(t,e,a){return vS(a).then(l=>l?yS(S0(t),l,bS(e,"lookmovie-poster.jpg",l.type||"image/jpeg")):gS(uS(),e))}function wi(t="update"){if(!d.settings.ntfyRemoteEnabled||!tf(t))return!1;let e=b0(),a=Mu();if(!e||!a||v0())return!1;let l=ge();if(!l)return!1;let n=l.paused,i=w0(),o=fS(),u={topic:e,title:n?"Paused on LookMovie2":"Playing on LookMovie2",message:o?`${i} - ${o}`:i,tags:["tv"],priority:3,sequence_id:`${c}-player`,click:location.href,actions:sS()};return d.ntfyLastNotificationAt=Date.now(),hS().then(r=>SS(e,u,r)).then(()=>he("connected",`Updated Android player notification (${t}).`)).catch(r=>{console.warn(`[${c}] Failed to publish ntfy player notification.`,r),he("error","Could not publish Android player notification.")}),!0}function wS(t){let e=String(d.settings.ntfyCommandSecret||"").trim();if(e&&t.secret!==e)return null;let a=String(t.command||t.action||"").trim().toLowerCase();if(!a)return null;if(a==="seek"){let l=Number(t.seconds??t.by??t.value);return Number.isFinite(l)?{command:a,seconds:l}:null}if(a==="volume"){let l=Number(t.percent??t.value);return Number.isFinite(l)?{command:a,percent:l}:null}return{command:a}}function xS(t){let e=String(t||"").trim();if(!e)return null;try{let u=JSON.parse(e);if(u&&typeof u=="object")return wS(u)}catch{}let a=String(d.settings.ntfyCommandSecret||"").trim(),l=e;if(a){if(l!==a&&!l.startsWith(`${a} `))return null;l=l.slice(a.length).trim()}let[n="",i=""]=l.split(/\s+/,2),o=n.toLowerCase();if(o==="seek"){let u=Number(i);return Number.isFinite(u)?{command:o,seconds:u}:null}if(o==="volume"){let u=Number(i);return Number.isFinite(u)?{command:o,percent:u}:null}return{command:o}}function ES(t){switch(t.command){case"play":return T0();case"pause":return A0();case"toggle":case"playpause":case"play-pause":return _0();case"seek":return M0(t.seconds);case"fullscreen":case"fs":return N0();case"next":return ul();case"mute":return af(!0);case"unmute":return af(!1);case"volume":return z0(t.percent);default:return!1}}function TS(t){let e=null;try{e=JSON.parse(t.data||"{}")}catch(n){console.warn(`[${c}] Failed to parse ntfy event.`,n);return}if(!e||e.event!=="message"||!e.message||e.id&&e.id===s0)return;if(s0=e.id||"",!lf()||!y0()){let n=Date.now();n-f0>5e3&&(f0=n,he("connected","Another visible LookMovie tab owns the Android remote."));return}let a=xS(e.message);if(!a){he("connected","Ignored ntfy message.");return}let l=ES(a);l&&window.setTimeout(()=>wi(a.command),150),he("connected",l?`Ran remote command: ${a.command}`:`No player handled: ${a.command}`)}function m0(){window.clearTimeout(bi),bi=0,$t&&($t.close(),$t=null),d.ntfyRemoteClaimTimer&&(window.clearInterval(d.ntfyRemoteClaimTimer),d.ntfyRemoteClaimTimer=0),ef(),he("disabled","")}function zu(){if(window.clearTimeout(bi),bi=0,!d.settings.ntfyRemoteEnabled)return m0(),!1;let t=oS();return t?($t&&$t.close(),d.ntfyRemoteClaimTimer||(d.ntfyRemoteClaimTimer=window.setInterval(iS,5e3)),d0||(d0=!0,window.addEventListener("focus",()=>tf("focus")),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"?tf("visible"):ef()}),window.addEventListener("pagehide",ef)),he("connecting","Connecting to ntfy."),$t=new EventSource(t),$t.onopen=()=>he("connected","Connected to ntfy."),$t.onmessage=TS,$t.onerror=()=>{he("error","ntfy connection lost. Reconnecting soon."),$t&&($t.close(),$t=null),bi=window.setTimeout(zu,5e3)},!0):(m0(),he("disabled",v0()||"Add an ntfy topic to enable remote control."),!1)}function E0(){return $t&&($t.close(),$t=null),zu()}var AS=`
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
`;function Nu(){let t=document.getElementById(lc);if(!d.settings.siteTheme){t&&t.remove();return}if(t||!document.documentElement)return;let e=document.createElement("style");e.id=lc,e.textContent=AS,(document.head||document.documentElement).appendChild(e)}var C0=0;function _S(){window.clearTimeout(C0),C0=window.setTimeout(E0,Vf)}function $a(t){let e={ntfyRemoteEnabled:d.settings.ntfyRemoteEnabled,ntfyServer:d.settings.ntfyServer,ntfyTopic:d.settings.ntfyTopic,ntfyControlTopic:d.settings.ntfyControlTopic,ntfyCommandSecret:d.settings.ntfyCommandSecret};d.settings=uc(t),cd(d.settings),O0(),Nu(),(!d.settings.autoFullscreen||!d.settings.windowedFullscreen)&&(cn(),d.fullscreenTriggered=!1),(e.ntfyRemoteEnabled!==d.settings.ntfyRemoteEnabled||e.ntfyServer!==d.settings.ntfyServer||e.ntfyTopic!==d.settings.ntfyTopic||e.ntfyControlTopic!==d.settings.ntfyControlTopic||e.ntfyCommandSecret!==d.settings.ntfyCommandSecret)&&_S()}var Ai=Z(Ya());function $0(t,e){return!t||!e?"":`${t}:${e.season}:${e.episode}:${e.idEpisode}`}function uf(){return Object.values(d.playlistStore.entries)}function xi(t){return t&&d.playlistStore.entries[t]||null}function R0(t,e){return!!xi($0(t,e))}function cf(t){return[...t].sort((e,a)=>e.addedAt-a.addedAt)}function rn(){cc(d.playlistStore),Rt(),Ra()}function rf(){fd(d.playlistSession),Rt()}function U0(t){if(!t||!t.slug||!t.latestEpisode)return;let e=$0(t.slug,t.latestEpisode);if(!e||xi(e)){Rt();return}d.playlistStore.entries[e]=gn(e,{slug:t.slug,idShow:t.idShow,title:t.title,year:t.year,poster:t.poster,episode:t.latestEpisode,addedAt:Date.now()}),rn()}function sf(t){xi(t)&&(delete d.playlistStore.entries[t],d.playlistSession.active&&d.playlistSession.currentKey===t&&sn(),rn())}function D0(t){if(!t.length)return"Add latest show episodes from the watchlist poster or list view.";let e=t[0];return`${t.length} queued ${t.length===1?"episode":"episodes"} | Next: ${e.title} ${Ut(e.episode)}`}function L0(t){let e=cf(uf());if(!e.length)return null;if(!t)return e[0];let a=e.findIndex(l=>l.key===t);return a>=0?e[a+1]||null:e[0]}function B0(t){return t?(location.href=cl(t.slug,t.episode),!0):!1}function Ei(t){let e=t?xi(t):L0("");return e?(d.playlistSession={active:!0,currentKey:e.key,startedAt:Date.now()},rf(),B0(e)):(sn(),!1)}function sn(){d.playlistSession={active:!1,currentKey:"",startedAt:0},rf()}function q0(){if(!d.playlistSession.active)return!1;let t=d.playlistSession.currentKey;if(!xi(t))return sn(),!1;let a=L0(t);return delete d.playlistStore.entries[t],cc(d.playlistStore),a?(d.playlistSession.currentKey=a.key,rf(),rn(),B0(a)):(sn(),rn(),!0)}var MS=1;function zS(){return{app:c,version:MS,exportedAt:new Date().toISOString(),watchlist:d.watchlistStore,movieWatchlist:d.movieWatchlistStore,playlist:d.playlistStore}}function H0(){let t=JSON.stringify(zS(),null,2),e=URL.createObjectURL(new Blob([t],{type:"application/json"})),a=document.createElement("a");a.href=e,a.download=`lookmovie2-watchlist-${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(a),a.click(),a.remove(),window.setTimeout(()=>URL.revokeObjectURL(e),1e3)}function ff(t,e,a){if(!t||typeof t!="object")return{};let l=t[e];return l&&typeof l=="object"&&l[a]&&typeof l[a]=="object"?l[a]:t[a]&&typeof t[a]=="object"?t[a]:{}}function Y0(t){let e=[],a=0,l=0;Object.entries(ff(t,"watchlist","shows")).forEach(([i,o])=>{if(d.watchlistStore.shows[i])return;let u=mn(i,o);u&&(d.watchlistStore.shows[i]=u,e.push(i))}),Object.entries(ff(t,"movieWatchlist","movies")).forEach(([i,o])=>{if(d.movieWatchlistStore.movies[i])return;let u=hn(i,o);u&&(d.movieWatchlistStore.movies[i]=u,a+=1)}),Object.entries(ff(t,"playlist","entries")).forEach(([i,o])=>{let u=gn(i,o);u&&!d.playlistStore.entries[u.key]&&(d.playlistStore.entries[u.key]=u,l+=1)}),e.length&&(rl(),ta({force:!0,slugs:e})),a&&(fn(),Ti()),l&&rn();let n=`Restored ${e.length} ${e.length===1?"show":"shows"}, ${a} ${a===1?"movie":"movies"}, ${l} playlist ${l===1?"episode":"episodes"}.`;return Pt(n,e.length||a||l?"success":"muted"),n}async function j0(t){try{return Y0(JSON.parse(await t.text()))}catch(e){return console.warn(`[${c}] Failed to import backup.`,e),Pt("That file is not a valid watchlist backup.","danger"),""}}function V0(){return Ki().map(t=>({date:t.date,showCount:Object.keys(t.watchlist&&t.watchlist.shows||{}).length,movieCount:Object.keys(t.movieWatchlist&&t.movieWatchlist.movies||{}).length}))}function k0(t){let e=Ki().find(a=>a.date===t);return e?Y0(e):""}var Tt=Z(ot());function Z0(){let t=(0,Ai.useRef)(null),[e,a]=(0,Ai.useState)(""),l=V0(),[n,i]=(0,Ai.useState)(""),o=n||l[0]&&l[0].date||"";return(0,Tt.jsxs)("div",{className:`${c}-setting ${c}-setting-stack`,children:[(0,Tt.jsxs)("div",{children:[(0,Tt.jsx)("p",{className:`${c}-setting-title`,children:"Watchlist backup"}),(0,Tt.jsx)("p",{className:`${c}-setting-copy`,children:"Watchlists are kept in Tampermonkey storage with a daily snapshot for the last 14 days. Export a file now and then for a copy outside the browser. Restoring only adds missing entries."})]}),(0,Tt.jsxs)("div",{className:`${c}-backup-actions`,children:[(0,Tt.jsx)("button",{className:`${c}-button`,type:"button",onClick:()=>H0(),children:"Export file"}),(0,Tt.jsx)("button",{className:`${c}-button`,type:"button",onClick:()=>t.current&&t.current.click(),children:"Import file"}),(0,Tt.jsx)("input",{ref:t,className:`${c}-file-input`,type:"file",accept:"application/json,.json",hidden:!0,onChange:async u=>{let r=u.currentTarget.files&&u.currentTarget.files[0];u.currentTarget.value="",r&&a(await j0(r))}})]}),l.length?(0,Tt.jsxs)("div",{className:`${c}-backup-actions`,children:[(0,Tt.jsxs)("label",{className:`${c}-field`,children:[(0,Tt.jsx)("span",{children:"Snapshot"}),(0,Tt.jsx)("select",{value:o,onChange:u=>i(u.currentTarget.value),children:l.map(u=>(0,Tt.jsxs)("option",{value:u.date,children:[u.date," (",u.showCount," shows, ",u.movieCount," movies)"]},u.date))})]}),(0,Tt.jsx)("button",{className:`${c}-button`,type:"button",onClick:()=>a(k0(o)),children:"Restore"})]}):null,e?(0,Tt.jsx)("p",{className:`${c}-ntfy-status`,children:e}):null]})}var ye=Z(ot());function Ua({settingKey:t,title:e,copy:a,icon:l}){let n=!!d.settings[t];return(0,ye.jsxs)("label",{className:`${c}-setting`,children:[(0,ye.jsxs)("div",{className:`${c}-setting-main`,children:[l?(0,ye.jsx)("span",{className:`${c}-setting-icon`,children:l}):null,(0,ye.jsxs)("div",{children:[(0,ye.jsx)("p",{className:`${c}-setting-title`,children:e}),(0,ye.jsx)("p",{className:`${c}-setting-copy`,children:a})]})]}),(0,ye.jsxs)("span",{className:`${c}-switch`,children:[(0,ye.jsx)("input",{type:"checkbox",checked:n,onChange:i=>{$a({...d.settings,[t]:i.currentTarget.checked})}}),(0,ye.jsx)("span",{className:`${c}-slider`})]})]})}var Du=Z(Ya());var OS=/^(?:ep_\d+|lookmovie\.mv_\d+)$/,df=null;function K0(t){return`ep_${t}`}function J0(t){return`lookmovie.mv_${t}`}function W0(){return df||(df=hd()),df}function F0(t){try{return sc(JSON.parse(localStorage.getItem(t)||"null"))}catch{return null}}function $S(t){let e=Object.keys(t);return e.length<=ic?!1:(e.sort((a,l)=>t[l].savedAt-t[a].savedAt).slice(ic).forEach(a=>delete t[a]),!0)}function Ou(){let t=W0(),e=!1;try{for(let a=0;a<localStorage.length;a+=1){let l=localStorage.key(a);if(!OS.test(l))continue;let n=F0(l),i=t[l];n&&(!i||i.progress!==n.progress||i.duration!==n.duration)&&(t[l]={...n,savedAt:Date.now()},e=!0)}Object.entries(t).forEach(([a,l])=>{localStorage.getItem(a)===null&&localStorage.setItem(a,JSON.stringify({duration:l.duration,progress:l.progress}))})}catch(a){console.warn(`[${c}] Failed to sync resume points.`,a)}($S(t)||e)&&gd(t)}function I0(){Ou(),window.setInterval(Ou,Zf),window.addEventListener("pagehide",Ou),document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Ou()})}function RS(t){return F0(t)||W0()[t]||null}function $u(t){let e=RS(t);if(!e)return null;let a=e.progress/e.duration*100;return a>=Xf&&a<Gi?e:null}function Ru(t){let e=Math.max(1,Math.round((t.duration-t.progress)/6e4));return e<60?`${e}m left`:`${Math.floor(e/60)}h ${e%60}m left`}var vt=Z(ot());function P0({entry:t,viewMode:e}){let a=t.watched?"watched":"new",l=t.href||Uu(t.slug),n=t.addedAt?`Added ${new Date(t.addedAt).toLocaleDateString()}`:"",i=[],o=t.idMovie?$u(J0(t.idMovie)):null,u=`/movies/play/${t.slug}`;return n&&i.push(n),(0,vt.jsxs)("article",{className:`${c}-watch-item`,"data-state":a,"data-view":e,children:[(0,vt.jsxs)("div",{className:`${c}-watch-item-poster`,children:[(0,vt.jsx)("a",{className:`${c}-watch-poster-link`,href:l,"aria-label":`Open ${t.title}`,children:t.poster?(0,vt.jsx)("img",{src:t.poster,alt:t.title,loading:"lazy"}):(0,vt.jsx)("div",{className:`${c}-watch-item-poster-placeholder`,children:"MOVIE"})}),(0,vt.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-check-button`,type:"button","aria-label":t.watched?`Mark ${t.title} unwatched`:`Mark ${t.title} watched`,title:t.watched?"Mark unwatched":"Mark watched",onClick:()=>ty(t.slug),children:"\u2713"}),(0,vt.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-remove-button`,type:"button","aria-label":`Remove ${t.title}`,title:"Remove",onClick:()=>_i(t.slug),children:"\xD7"}),(0,vt.jsx)("div",{className:`${c}-watch-item-poster-overlay`,children:(0,vt.jsx)("span",{className:`${c}-watch-badge`,"data-state":a,children:t.watched?"Watched":"To watch"})})]}),(0,vt.jsxs)("div",{className:`${c}-watch-item-body`,children:[(0,vt.jsxs)("div",{children:[(0,vt.jsxs)("a",{className:`${c}-watch-item-title`,href:l,children:[t.title,t.year?` (${t.year})`:""]}),i.length?(0,vt.jsx)("p",{className:`${c}-watch-item-copy`,children:i.join(" | ")}):null]}),o||!t.watched?(0,vt.jsxs)("a",{className:`${c}-watch-action`,href:u,children:[(0,vt.jsx)("span",{"aria-hidden":"true",children:"\u25B6"})," ",o?"Continue":"Play",o?(0,vt.jsx)("small",{children:Ru(o)}):null]}):null]})]})}var Mi=Z(ot());function ey(){return(0,Mi.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,Mi.jsx)("path",{d:"M9.2 16.6 4.9 12.3l-1.4 1.4 5.7 5.7L21 7.6l-1.4-1.4L9.2 16.6z"})})}function ay(){return(0,Mi.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,Mi.jsx)("path",{d:"m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5z"})})}var At=Z(ot());function ly({entry:t,viewMode:e,isActive:a}){let l=cl(t.slug,t.episode),n=Ut(t.episode),i=t.addedAt?`Queued ${new Date(t.addedAt).toLocaleDateString()}`:"",o=[n];return i&&o.push(i),(0,At.jsxs)("article",{className:`${c}-watch-item`,"data-state":"new","data-view":e,"data-playlist-active":a?"true":"false",children:[(0,At.jsxs)("div",{className:`${c}-watch-item-poster`,children:[(0,At.jsx)("a",{className:`${c}-watch-poster-link`,href:l,"aria-label":`Open ${t.title} ${n}`,onClick:u=>{u.preventDefault(),Ei(t.key)},children:t.poster?(0,At.jsx)("img",{src:t.poster,alt:t.title,loading:"lazy"}):(0,At.jsx)("div",{className:`${c}-watch-item-poster-placeholder`,children:"TV"})}),(0,At.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-check-button`,type:"button","aria-label":`Remove ${t.title} ${n} from playlist`,title:"Done",onClick:()=>sf(t.key),children:(0,At.jsx)(ey,{})}),(0,At.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-remove-button`,type:"button","aria-label":`Remove ${t.title}`,title:"Remove",onClick:()=>sf(t.key),children:(0,At.jsx)(ay,{})}),(0,At.jsx)("div",{className:`${c}-watch-item-poster-overlay`,children:(0,At.jsx)("span",{className:`${c}-watch-badge`,"data-state":"new",children:a?"Playing":"Queued"})})]}),(0,At.jsx)("div",{className:`${c}-watch-item-body`,children:(0,At.jsxs)("div",{children:[(0,At.jsxs)("a",{className:`${c}-watch-item-title`,href:l,onClick:u=>{u.preventDefault(),Ei(t.key)},children:[t.title,t.year?` (${t.year})`:""]}),(0,At.jsx)("p",{className:`${c}-watch-item-copy`,children:o.join(" | ")})]})})]})}var Da=Z(Ya());async function ny(t,e){let a=String(e||"").trim();if(a.length<2)return[];let l=await Xi(`/api/v1/${t}/do-search/?q=${encodeURIComponent(a)}`);return(l&&Array.isArray(l.result)?l.result:[]).filter(i=>i&&typeof i.slug=="string"&&i.slug).slice(0,Wf).map(i=>({slug:i.slug,idShow:i.id_show||0,idMovie:i.id_movie||0,title:typeof i.title=="string"?i.title:i.slug,year:i.year?String(i.year):"",rating:i.imdb_rating?String(i.imdb_rating):"",poster:ut(i.poster&&(i.poster.w200||i.poster.w100)||"")}))}var te=Z(ot());function iy({type:t}){let[e,a]=(0,Da.useState)(""),[l,n]=(0,Da.useState)([]),[i,o]=(0,Da.useState)(""),u=(0,Da.useRef)(0),r=t==="shows";(0,Da.useEffect)(()=>{n([]),o("");let g=e.trim();if(g.length<2)return;let v=++u.current,m=window.setTimeout(async()=>{o("Searching...");try{let y=await ny(t,g);v===u.current&&(n(y),o(y.length?"":"No matches."))}catch{v===u.current&&o("Search failed. Try again.")}},Ff);return()=>window.clearTimeout(m)},[e,t]);function p(g){r?Ni({...g}):zi({...g,href:`/movies/view/${g.slug}`})}return(0,te.jsxs)("div",{className:`${c}-search`,children:[(0,te.jsx)("input",{type:"search",value:e,placeholder:r?"Search TV shows to add":"Search movies to add","aria-label":r?"Search TV shows to add":"Search movies to add",onChange:g=>a(g.currentTarget.value),onKeyDown:g=>{g.key==="Escape"&&(g.stopPropagation(),a(""))}}),i?(0,te.jsx)("p",{className:`${c}-search-status`,children:i}):null,l.length?(0,te.jsx)("ul",{className:`${c}-search-results`,children:l.map(g=>{let v=r?!!Ce(g.slug):!!ea(g.slug);return(0,te.jsxs)("li",{children:[g.poster?(0,te.jsx)("img",{src:g.poster,alt:"",loading:"lazy"}):(0,te.jsx)("span",{}),(0,te.jsxs)("div",{children:[(0,te.jsx)("strong",{children:g.title}),(0,te.jsx)("small",{children:[g.year,g.rating?`IMDb ${g.rating}`:""].filter(Boolean).join(" \xB7 ")})]}),(0,te.jsx)("button",{className:`${c}-button`,type:"button",disabled:v,onClick:()=>p(g),children:v?"Added":"Add"})]},g.slug)})}):null]})}var mt=Z(ot());function US(t,e){let a=t.lastWatched&&$u(K0(t.lastWatched.idEpisode));if(a)return{href:cl(t.slug,t.lastWatched),label:`Continue ${Ut(t.lastWatched)}`,detail:Ru(a)};let l=e&&e.episodes[0];return l?{href:cl(t.slug,l),label:`Play ${Ut(l)}`,detail:""}:null}function oy({entry:t,viewMode:e}){let a=pf(t),l=a?a.total:null,n=US(t,a),i=l!==null?l>0?"new":"watched":t.latestEpisode?$e(t)?"watched":"new":"pending",o=t.latestEpisode?`Latest ${Ut(t.latestEpisode)}`:"Latest episode not synced yet",u=t.lastWatched?`Watched through ${Ut(t.lastWatched)}`:"Nothing marked watched yet",r=t.lastSyncError?`Sync issue: ${t.lastSyncError}`:"",p=i==="new"?l?`${l>99?"99+":l} unwatched`:"New episode":i==="watched"?"Up to date":"Pending sync",g=uy(t.slug,t.latestEpisode),v=$e(t)?"Mark latest unwatched":"Mark latest watched",m=R0(t.slug,t.latestEpisode),y=m?`${t.title} latest episode is already in your playlist`:`Add ${t.title} latest episode to playlist`,E=t.lastWatched?[o,u]:[o];return r&&E.push(r),(0,mt.jsxs)("article",{className:`${c}-watch-item`,"data-state":i,"data-view":e,children:[(0,mt.jsxs)("div",{className:`${c}-watch-item-poster`,children:[(0,mt.jsx)("a",{className:`${c}-watch-poster-link`,href:g,"aria-label":`Open ${t.title}`,children:t.poster?(0,mt.jsx)("img",{src:t.poster,alt:t.title,loading:"lazy"}):(0,mt.jsx)("div",{className:`${c}-watch-item-poster-placeholder`,children:"TV"})}),(0,mt.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-check-button`,type:"button",disabled:!t.latestEpisode,"aria-label":v,title:v,onClick:()=>cy(t.slug),children:"\u2713"}),(0,mt.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-playlist-button`,type:"button",disabled:!t.latestEpisode||m,"aria-label":y,title:y,onClick:()=>U0(t),children:"+"}),(0,mt.jsx)("button",{className:`${c}-poster-icon-button ${c}-poster-remove-button`,type:"button","aria-label":`Remove ${t.title}`,title:"Remove",onClick:()=>Ci(t.slug),children:"\xD7"}),(0,mt.jsx)("div",{className:`${c}-watch-item-poster-overlay`,children:(0,mt.jsx)("span",{className:`${c}-watch-badge`,"data-state":i,children:p})})]}),(0,mt.jsxs)("div",{className:`${c}-watch-item-body`,children:[(0,mt.jsxs)("div",{children:[(0,mt.jsxs)("a",{className:`${c}-watch-item-title`,href:g,children:[t.title,t.year?` (${t.year})`:""]}),(0,mt.jsx)("p",{className:`${c}-watch-item-copy`,children:E.join(" | ")})]}),n?(0,mt.jsxs)("a",{className:`${c}-watch-action`,href:n.href,children:[(0,mt.jsx)("span",{"aria-hidden":"true",children:"\u25B6"})," ",n.label,n.detail?(0,mt.jsx)("small",{children:n.detail}):null]}):null]})]})}var M=Z(ot());function ry(){return(0,M.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,M.jsx)("path",{d:"M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"})})}function sy(){return(0,M.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,M.jsx)("path",{d:"M4 6h3v3H4V6zm5 .5h11v2H9v-2zM4 11h3v3H4v-3zm5 .5h11v2H9v-2zM4 16h3v3H4v-3zm5 .5h11v2H9v-2z"})})}function DS(){return(0,M.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,M.jsx)("path",{d:"M17.7 6.3A7.9 7.9 0 0 0 12 4a8 8 0 1 0 7.5 10.7l-1.9-.7A6 6 0 1 1 16.3 7.7L13 11h8V3l-3.3 3.3z"})})}function LS(){return(0,M.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,M.jsx)("path",{d:"M8 5v14l11-7L8 5z"})})}function BS(){return(0,M.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,M.jsx)("path",{d:"M6 6h12v12H6V6z"})})}function fy({id:t,title:e,summary:a,count:l,isOpen:n,onClick:i}){return(0,M.jsxs)("button",{id:`${S}-${t}-fold-button`,className:`${c}-accordion-trigger`,type:"button","aria-expanded":n?"true":"false","aria-controls":`${S}-${t}-fold-panel`,"data-open":n?"true":"false",onClick:i,children:[(0,M.jsxs)("span",{children:[(0,M.jsx)("strong",{children:e}),(0,M.jsx)("small",{children:a})]}),(0,M.jsx)("em",{children:l})]})}function dy(){let[t,e]=(0,Du.useState)("watchlist"),[a,l]=(0,Du.useState)("shows"),[n,i]=(0,Du.useState)("poster"),o=my(Lu()),u=py(mf()),r=cf(uf()),p=o.filter(s=>s.latestEpisode&&!$e(s)).length,g=u.filter(s=>!s.watched).length,v=a==="shows",m=t==="watchlist",y=t==="playlist",E=v?o.length?`${o.length} tracked ${o.length===1?"show":"shows"}${p?` | ${p} with a newer latest episode`:""}`:"Add shows from the latest episodes page to start tracking them.":u.length?`${u.length} tracked ${u.length===1?"movie":"movies"}${g?` | ${g} unwatched`:""}`:"Add movies from the movies page or an individual movie page to start tracking them.",_=D0(r),C=n==="list",f=d.playlistSession.active;return(0,M.jsx)("section",{id:`${S}-watchlist-panel`,children:(0,M.jsxs)("div",{className:`${c}-accordion`,children:[(0,M.jsx)(fy,{id:"watchlist",title:"Watchlist",summary:E,count:o.length+u.length,isOpen:m,onClick:()=>e("watchlist")}),m?(0,M.jsxs)("div",{id:`${S}-watchlist-fold-panel`,className:`${c}-accordion-panel`,role:"region","aria-labelledby":`${S}-watchlist-fold-button`,children:[(0,M.jsxs)("div",{id:`${S}-watchlist-toolbar`,children:[(0,M.jsxs)("div",{children:[(0,M.jsx)("h3",{id:`${S}-watchlist-title`,children:"Watchlist"}),(0,M.jsxs)("div",{className:`${c}-tabs`,role:"tablist","aria-label":"Watchlist type",children:[(0,M.jsxs)("button",{className:`${c}-tab`,type:"button",role:"tab","aria-selected":v?"true":"false","data-active":v?"true":"false",onClick:()=>l("shows"),children:["TV Shows",p>0?(0,M.jsx)("span",{children:p}):null]}),(0,M.jsxs)("button",{className:`${c}-tab`,type:"button",role:"tab","aria-selected":v?"false":"true","data-active":v?"false":"true",onClick:()=>l("movies"),children:["Movies",g>0?(0,M.jsx)("span",{children:g}):null]})]})]}),(0,M.jsxs)("div",{className:`${c}-watchlist-toolbar-actions`,children:[(0,M.jsx)("button",{className:`${c}-button ${c}-toolbar-icon-button ${c}-view-toggle`,type:"button","aria-pressed":C?"true":"false","aria-label":C?"Switch to poster view":"Switch to list view",title:C?"Switch to poster view":"Switch to list view",onClick:()=>i(C?"poster":"list"),children:C?(0,M.jsx)(ry,{}):(0,M.jsx)(sy,{})}),v?(0,M.jsx)("button",{id:`${S}-watchlist-refresh`,className:`${c}-button ${c}-toolbar-icon-button`,type:"button",disabled:d.watchlistBusy,"aria-label":"Refresh watchlist",title:"Refresh watchlist",onClick:()=>ta({force:!0}),children:(0,M.jsx)(DS,{})}):null]})]}),(0,M.jsx)(iy,{type:v?"shows":"movies"}),v?(0,M.jsx)("div",{id:`${S}-watchlist-status`,"data-tone":d.watchlistMessageTone,children:d.watchlistBusy?d.watchlistMessage||"Refreshing watchlist...":d.watchlistMessage||""}):null,(0,M.jsx)("div",{id:`${S}-watchlist-list`,"data-view":n,children:v&&o.length?o.map(s=>(0,M.jsx)(oy,{entry:s,viewMode:n},s.slug)):!v&&u.length?u.map(s=>(0,M.jsx)(P0,{entry:s,viewMode:n},s.slug)):(0,M.jsx)("div",{className:`${c}-watch-empty`,children:v?"On the /shows page or an individual show page, use the watchlist button to add that show here.":"On the /movies page or an individual movie page, use the movie watchlist button to add a movie here."})})]}):null,(0,M.jsx)(fy,{id:"playlist",title:"Playlist",summary:_,count:r.length,isOpen:y,onClick:()=>e("playlist")}),y?(0,M.jsxs)("div",{id:`${S}-playlist-fold-panel`,className:`${c}-accordion-panel`,role:"region","aria-labelledby":`${S}-playlist-fold-button`,children:[(0,M.jsxs)("div",{id:`${S}-playlist-toolbar`,children:[(0,M.jsx)("h3",{id:`${S}-playlist-title`,children:"Playlist"}),(0,M.jsxs)("div",{className:`${c}-watchlist-toolbar-actions`,children:[(0,M.jsx)("button",{className:`${c}-button ${c}-toolbar-icon-button ${c}-playlist-play-button`,type:"button",disabled:!r.length,"aria-label":f?"Stop playlist playback":"Play playlist",title:f?"Stop playlist playback":"Play playlist","data-active":f?"true":"false",onClick:()=>{f?sn():Ei()},children:f?(0,M.jsx)(BS,{}):(0,M.jsx)(LS,{})}),(0,M.jsx)("button",{className:`${c}-button ${c}-toolbar-icon-button ${c}-view-toggle`,type:"button","aria-pressed":C?"true":"false","aria-label":C?"Switch to poster view":"Switch to list view",title:C?"Switch to poster view":"Switch to list view",onClick:()=>i(C?"poster":"list"),children:C?(0,M.jsx)(ry,{}):(0,M.jsx)(sy,{})})]})]}),(0,M.jsx)("div",{id:`${S}-playlist-list`,"data-view":n,children:r.length?r.map(s=>(0,M.jsx)(ly,{entry:s,viewMode:n,isActive:d.playlistSession.currentKey===s.key},s.key)):(0,M.jsx)("div",{className:`${c}-watch-empty`,children:"Add a latest show episode from a watchlist poster or list item."})})]}):null]})})}var x=Z(ot());function qS(t){return Array.from(document.querySelectorAll("a, button")).find(e=>If(e)?t.test(Pf(e)):!1)}function HS(){let t=qS(/\bsign\s*up\b|\bsignup\b|\bregister\b/i);if(t){let a=t.closest("li");return a&&a.parentElement?{parent:a.parentElement,before:a.nextSibling,sourceItem:a}:{parent:t.parentElement,before:t.nextSibling,sourceItem:null}}let e=document.querySelector("header, nav, .navbar, .main-header, .header");return e?{parent:e,before:null,sourceItem:null}:null}function YS(t){for(let e=t;e&&e!==document.body;e=e.parentElement){let a=getComputedStyle(e).position;if(a==="fixed"||a==="sticky")return!0}return!1}function jS(){let t=HS();if(!t||!t.parent||YS(t.parent))return null;let e=document.getElementById(`${S}-launcher-host`);return e&&e.tagName!=="LI"&&(e.remove(),e=null),e||(e=document.createElement("li"),e.id=`${S}-launcher-host`),t.sourceItem&&e.className!==t.sourceItem.className&&(e.className=t.sourceItem.className),t.before!==e&&(e.parentElement!==t.parent||e.nextSibling!==t.before)&&t.parent.insertBefore(e,t.before),e}function hy(){return(0,x.jsxs)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[(0,x.jsx)("path",{d:"M8 6.5v11l8.5-5.5L8 6.5z"}),(0,x.jsx)("path",{d:"M16.5 4.5a7.5 7.5 0 0 1 3.2 9.4l1.6.7A9.3 9.3 0 0 0 17.2 3l-.7 1.5zM7.5 19.5a7.5 7.5 0 0 1-3.2-9.4l-1.6-.7A9.3 9.3 0 0 0 6.8 21l.7-1.5z"}),(0,x.jsx)("path",{d:"M19.4 15.2 22 15l-1.5 2.2-1.1-2zM4.6 8.8 2 9l1.5-2.2 1.1 2z"})]})}function gy(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M5 10V5h5v2H7v3H5zm9-5h5v5h-2V7h-3V5zM7 14v3h3v2H5v-5h2zm10 0h2v5h-5v-2h3v-3z"})})}function VS(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M3 5h18v14H3V5zm2 2v10h14V7H5zm2 2h4v2H9v2H7V9zm10 6h-4v-2h2v-2h2v4z"})})}function kS(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M4 4h7v7H4V4zm9 0h7v4h-7V4zm0 6h7v10h-7V10zM4 13h7v7H4v-7z"})})}function GS(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M5 6v12l8.5-6L5 6zm9 0v12h2V6h-2zm3 0v12h2V6h-2z"})})}function QS(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M4 6v12l7-6-7-6zm7 0v12l7-6-7-6zm8 0h2v12h-2V6z"})})}function yy(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M7.1 14.9a7 7 0 0 1 9.8 0l-1.4 1.4a5 5 0 0 0-7 0l-1.4-1.4zm-3.5-3.5a12 12 0 0 1 16.8 0L19 12.8a10 10 0 0 0-14 0l-1.4-1.4zm7 7a2 2 0 0 1 2.8 0L12 19.8l-1.4-1.4zM8 4h8v2H8V4z"})})}function XS(){return(0,x.jsx)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:(0,x.jsx)("path",{d:"M12 2.8 14.3 8l5.7.6-4.3 3.8 1.2 5.6-4.9-2.9L7.1 18l1.2-5.6L4 8.6 9.7 8 12 2.8z"})})}function by(){let[t,e]=(0,Vt.useState)(!1),[a,l]=(0,Vt.useState)(null),[n,i]=(0,Vt.useState)(()=>window.scrollY>120),[o,u]=(0,Vt.useState)(!1),r=(0,Vt.useRef)(0),[,p]=(0,Vt.useState)(0);(0,Vt.useEffect)(()=>c0(()=>p(f=>f+1)),[]),(0,Vt.useEffect)(()=>{function f(s){s.key==="Escape"&&e(!1)}return window.addEventListener("keydown",f),()=>window.removeEventListener("keydown",f)},[]),(0,Vt.useEffect)(()=>{let f=0;function s(){let b=jS();l(A=>A===b?A:b),f+=1,(b||f>40)&&window.clearInterval(h)}let h=window.setInterval(s,500);return s(),()=>window.clearInterval(h)},[]),(0,Vt.useEffect)(()=>{function f(){i(window.scrollY>120)}return f(),window.addEventListener("scroll",f,{passive:!0}),()=>window.removeEventListener("scroll",f)},[]),(0,Vt.useEffect)(()=>()=>{window.clearTimeout(r.current)},[]);function g(){e(!0)}function v(){window.clearTimeout(r.current),u(!0)}function m(){window.clearTimeout(r.current),r.current=window.setTimeout(()=>{u(!1)},240)}function y(f){$a({...d.settings,[f]:!d.settings[f]})}function E(f,s){$a({...d.settings,[f]:s})}let _=n?null:a,C=(0,x.jsxs)("div",{id:`${S}-launcher`,"data-hosted":_?"true":"false","data-scrolled":n?"true":"false","data-quick-open":o?"true":"false",onMouseEnter:v,onMouseLeave:m,onFocus:v,onBlur:f=>{f.currentTarget.contains(f.relatedTarget)||m()},children:[(0,x.jsxs)("button",{id:`${S}-button`,type:"button","aria-label":"Open LookMovie2 Enhancer","aria-haspopup":"dialog","aria-expanded":t?"true":"false",title:"Open enhancer",onClick:()=>t?e(!1):g(),children:[(0,x.jsx)("span",{id:`${S}-button-icon`,children:(0,x.jsx)(XS,{})}),(0,x.jsx)("span",{id:`${S}-button-label`,children:"Enhancer"})]}),(0,x.jsxs)("div",{id:`${S}-quick-settings`,role:"toolbar","aria-label":"Quick playback settings",children:[(0,x.jsx)("button",{className:`${c}-quick-setting`,type:"button","aria-label":"Toggle auto play",title:"Toggle auto play","data-enabled":d.settings.autoPlay?"true":"false",onClick:f=>{f.stopPropagation(),y("autoPlay")},children:(0,x.jsx)(hy,{})}),(0,x.jsx)("button",{className:`${c}-quick-setting`,type:"button","aria-label":"Toggle auto fullscreen",title:"Toggle auto fullscreen","data-enabled":d.settings.autoFullscreen?"true":"false",onClick:f=>{f.stopPropagation(),y("autoFullscreen")},children:(0,x.jsx)(gy,{})}),(0,x.jsx)("button",{className:`${c}-quick-setting`,type:"button","aria-label":"Toggle ntfy remote",title:"Toggle ntfy remote","data-enabled":d.settings.ntfyRemoteEnabled?"true":"false",onClick:f=>{f.stopPropagation(),y("ntfyRemoteEnabled")},children:(0,x.jsx)(yy,{})})]})]});return(0,x.jsxs)(x.Fragment,{children:[_?(0,vy.createPortal)(C,_):C,(0,x.jsx)("div",{id:`${S}-overlay`,"aria-hidden":t?"false":"true",className:t?`${c}-open`:"",onClick:f=>{f.target===f.currentTarget&&e(!1)},children:(0,x.jsxs)("div",{id:`${S}-modal`,role:"dialog","aria-modal":"true","aria-labelledby":`${S}-title`,children:[(0,x.jsxs)("div",{id:`${S}-header`,children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("h2",{id:`${S}-title`,children:"LookMovie2 Enhancer"}),(0,x.jsx)("p",{id:`${S}-subtitle`,children:"Playback helpers plus a personal show watchlist with latest episode tracking."})]}),(0,x.jsx)("button",{id:`${S}-close`,type:"button","aria-label":"Close settings",onClick:()=>e(!1),children:"\xD7"})]}),(0,x.jsxs)("div",{id:`${S}-content`,children:[(0,x.jsxs)("section",{id:`${S}-settings-panel`,children:[(0,x.jsx)("h3",{id:`${S}-settings-title`,children:"Playback Tools"}),(0,x.jsxs)("div",{id:`${S}-settings`,children:[(0,x.jsx)(Ua,{settingKey:"autoPlay",title:"Auto play",copy:"Clicks the resume or start button when the playback modal appears.",icon:(0,x.jsx)(hy,{})}),(0,x.jsx)(Ua,{settingKey:"autoFullscreen",title:"Auto fullscreen",copy:"Clicks the player's fullscreen button after playback starts.",icon:(0,x.jsx)(gy,{})}),(0,x.jsx)(Ua,{settingKey:"windowedFullscreen",title:"Windowed fullscreen",copy:"Stretches the player over the page when the browser blocks real fullscreen, e.g. after auto play or a remote command.",icon:(0,x.jsx)(VS,{})}),(0,x.jsx)(Ua,{settingKey:"siteTheme",title:"Site UI polish",copy:"Wider layout, responsive poster grids, a calmer background and no premium upsell links.",icon:(0,x.jsx)(kS,{})}),(0,x.jsx)(Ua,{settingKey:"autoNextEpisode",title:"Auto next episode",copy:"Counts down and plays the next episode when one ends, outside playlist mode.",icon:(0,x.jsx)(GS,{})}),(0,x.jsx)(Ua,{settingKey:"autoSkipIntro",title:"Auto skip intros",copy:"Jumps past an intro you marked for that show. Off shows a Skip intro button instead.",icon:(0,x.jsx)(QS,{})}),(0,x.jsx)(Ua,{settingKey:"ntfyRemoteEnabled",title:"Android remote",copy:"Publishes a player notification to ntfy with Android action buttons.",icon:(0,x.jsx)(yy,{})}),(0,x.jsxs)("div",{className:`${c}-setting ${c}-setting-stack`,children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("p",{className:`${c}-setting-title`,children:"ntfy topics"}),(0,x.jsx)("p",{className:`${c}-setting-copy`,children:"The phone subscribes to the display topic; the browser listens on the control topic. Use only letters, numbers, hyphens, and underscores."})]}),(0,x.jsxs)("label",{className:`${c}-field`,children:[(0,x.jsx)("span",{children:"Server"}),(0,x.jsx)("input",{type:"url",value:d.settings.ntfyServer,placeholder:"https://ntfy.sh",onChange:f=>E("ntfyServer",f.currentTarget.value)})]}),(0,x.jsxs)("label",{className:`${c}-field`,children:[(0,x.jsx)("span",{children:"Display topic"}),(0,x.jsx)("input",{type:"text",value:d.settings.ntfyTopic,maxLength:64,pattern:"[A-Za-z0-9_-]{1,64}",placeholder:"random-private-topic",onChange:f=>E("ntfyTopic",f.currentTarget.value)})]}),(0,x.jsxs)("label",{className:`${c}-field`,children:[(0,x.jsx)("span",{children:"Control topic"}),(0,x.jsx)("input",{type:"text",value:d.settings.ntfyControlTopic,maxLength:64,pattern:"[A-Za-z0-9_-]{1,64}",placeholder:"display-topic-controls",onChange:f=>E("ntfyControlTopic",f.currentTarget.value)})]}),(0,x.jsxs)("label",{className:`${c}-field`,children:[(0,x.jsx)("span",{children:"Command secret"}),(0,x.jsx)("input",{type:"password",value:d.settings.ntfyCommandSecret,placeholder:"optional shared command prefix",onChange:f=>E("ntfyCommandSecret",f.currentTarget.value)})]}),(0,x.jsx)("p",{className:`${c}-ntfy-status`,"data-status":d.ntfyRemoteStatus,children:d.ntfyRemoteMessage||`Remote status: ${d.ntfyRemoteStatus}`})]}),(0,x.jsx)(Z0,{})]}),(0,x.jsx)("div",{id:`${S}-footer`,children:"Settings and watchlist data are saved in Tampermonkey storage on this browser."})]}),(0,x.jsx)(dy,{})]})]})})]})}var wy=Z(ot()),hf=null;function ZS(){if(!document.head||document.getElementById(ac))return;let t=document.createElement("style");t.id=ac,t.textContent=r0(),document.head.appendChild(t)}function gf(){if(ZS(),!document.body)return;let t=document.getElementById(S);t||(t=document.createElement("div"),t.id=S,document.body.appendChild(t)),hf||(hf=(0,Sy.createRoot)(t),hf.render((0,wy.jsx)(by,{})))}function Ra(){un()}function Rt(){un()}function O0(){un()}var Oi=null;function mf(){return Object.values(d.movieWatchlistStore.movies)}function ea(t){return t&&d.movieWatchlistStore.movies[t]||null}function py(t){return[...t].sort((e,a)=>e.watched!==a.watched?e.watched?1:-1:e.title.localeCompare(a.title))}function fn(){sd(d.movieWatchlistStore),Rt(),Ra(),$i(),Ri()}function KS(t){return!(!t||typeof t.poster!="string"||!t.poster.trim()||t.poster.trim().startsWith("data:image/"))}function JS(t){let e=t.match(/(?:var\s+|window\.)movie_storage\s*=\s*(\{[\s\S]*?\})\s*;/);if(!e)return{};try{return JSON.parse(e[1])}catch(a){return console.warn(`[${c}] Failed to parse movie_storage metadata.`,a),{}}}async function xy(t,e){let a=await Qi(`/movies/view/${t}`),l=JS(a),n=a.match(/id_movie:\s*(\d+)/),i=a.match(/title:\s*'((?:\\'|[^'])*)'/),o=a.match(/year:\s*'((?:\\'|[^'])*)'/),u=a.match(/poster_medium:\s*'((?:\\'|[^'])*)'/),r=typeof l.movie_poster=="string"&&l.movie_poster?l.movie_poster:typeof l.poster_medium=="string"&&l.poster_medium?l.poster_medium:typeof l.poster=="string"?l.poster:"";return{slug:t,idMovie:typeof l.id_movie=="number"?l.id_movie:n?parseInt(n[1],10):0,title:typeof l.title=="string"&&l.title.trim()?l.title.trim():i?xe(i[1]).trim():e&&e.title?e.title:t,year:typeof l.year=="string"||typeof l.year=="number"?String(l.year):o?xe(o[1]).trim():e&&e.year?e.year:"",poster:ut(r)||(u?ut(xe(u[1])):"")||(e&&e.poster?ut(e.poster):"")}}async function Ti(){if(Oi)return Oi;let t=mf().filter(e=>!KS(e)||!e.idMovie);return t.length?(Oi=(async()=>{let e=!1;for(let a of t)try{let l=await xy(a.slug,a);l.idMovie&&l.idMovie!==a.idMovie&&(a.idMovie=l.idMovie,e=!0),l.title&&l.title!==a.title&&(a.title=l.title,e=!0),l.year&&l.year!==a.year&&(a.year=l.year,e=!0),l.poster&&l.poster!==a.poster&&(a.poster=l.poster,e=!0)}catch(l){console.warn(`[${c}] Failed to refresh movie metadata for ${a.slug}.`,l)}e&&fn()})().finally(()=>{Oi=null}),Oi):Promise.resolve()}function zi(t){if(!t||!t.slug)return;let e={slug:t.slug,title:t.title||t.slug,year:t.year||"",poster:t.poster||"",idMovie:t.idMovie||0};xy(t.slug,t).then(a=>{a.title&&(e.title=a.title),a.year&&(e.year=a.year),a.poster&&(e.poster=a.poster),a.idMovie&&(e.idMovie=a.idMovie),d.movieWatchlistStore.movies[t.slug]=hn(t.slug,{slug:t.slug,title:e.title,year:e.year,poster:e.poster,idMovie:e.idMovie,href:t.href||`/movies/view/${t.slug}`,addedAt:Date.now(),watched:!1}),fn(),Rt()})}function _i(t){ea(t)&&(delete d.movieWatchlistStore.movies[t],fn())}function ty(t){let e=ea(t);e&&(e.watched=!e.watched,e.watchedAt=e.watched?Date.now():void 0,fn())}function Ey(t){try{let a=new URL(t,location.origin).pathname.match(/\/shows\/view\/([^/?#]+)/i);return a?a[1]:""}catch{return""}}function WS(t){try{let e=new URL(t,location.origin),a=et(e.searchParams.get("season")),l=et(e.searchParams.get("episode")),n=et(e.searchParams.get("id_episode"));return!a||!l||!n?null:{season:a,episode:l,idEpisode:n}}catch{return null}}function Bu(t){let e=typeof t=="string"?t.match(/-(\d{4})$/):null;return e?e[1]:""}function Ty(t){try{let a=new URL(t,location.origin).pathname.match(/\/movies\/view\/([^/?#]+)/i);return a?a[1]:""}catch{return""}}function Ui(t){if(!t)return null;let e=t.querySelector('a[href*="/shows/view/"]');if(!e)return null;let a=Ey(e.getAttribute("href"));if(!a)return null;let l=t.querySelector(".mv-item-infor h6"),n=t.querySelector("img[data-src], img[src]"),i=WS(e.getAttribute("href"));return{slug:a,title:l?l.textContent.trim():a,year:Bu(a),poster:la(n),href:new URL(e.getAttribute("href"),location.origin).href,episode:i}}function uy(t,e){return t?e?`/shows/view/${t}?season=${e.season}&episode=${e.episode}&id_episode=${e.idEpisode}`:`/shows/view/${t}`:"/shows"}function cl(t,e){return t?e?`/shows/play/${t}#S${e.season}-E${e.episode}-${e.idEpisode}`:`/shows/view/${t}`:"/shows"}function Uu(t){return t?`/movies/view/${t}`:"/movies"}function Di(){return location.pathname==="/shows"}function Ay(){return location.pathname.startsWith("/shows/view/")}function of(){return location.pathname.startsWith("/movies/play/")}function _y(){return location.pathname.startsWith("/movies/view/")}function FS(){if(!Ay())return null;let t=window.show_storage||{},e=typeof t.slug=="string"&&t.slug?t.slug:Ey(location.href);if(!e)return null;let a=document.querySelector(".movie-single-ct h1")||document.querySelector(".movie-single-ct h2")||document.querySelector(".internal-page-container h1")||document.querySelector(".internal-page-container h2"),l=document.querySelector('.movie__poster[style*="background-image"]')||document.querySelector(".movie__poster[data-background-image]")||document.querySelector(".movie-single-ct img[data-src], .movie-single-ct img[src]")||document.querySelector(".internal-page-container img[data-src], .internal-page-container img[src]"),n=document.querySelector('meta[property="og:image"]'),i=new URLSearchParams(location.search),o=zt({season:i.get("season"),episode:i.get("episode"),idEpisode:i.get("id_episode")});return{slug:e,title:typeof t.title=="string"&&t.title.trim()?t.title.trim():a?a.textContent.replace(/\s*\d{4}\s*$/,"").trim():e,year:typeof t.year=="string"||typeof t.year=="number"?String(t.year):Bu(e),poster:typeof t.poster_medium=="string"&&t.poster_medium?t.poster_medium:la(l)||n?.getAttribute("content")||"",idShow:et(t.id_show),episode:o}}function IS(t){if(!t)return null;let e=t.querySelector('a[href*="/movies/view/"]');if(!e)return null;let a=Ty(e.getAttribute("href"));if(!a)return null;let l=t.querySelector(".slide-item__title, .mv-item-infor h6, h6, h5, .title"),n=t.querySelector("img[data-src-portrait], img[data-src], img[src]"),i=t.querySelector('[data-background-image], [style*="background-image"], [data-src-portrait], [data-src]'),o=t.querySelector(".year"),u=l?l.textContent.trim():"",r=u.match(/\((\d{4})\)/),p=la(n)||la(i);return{slug:a,title:u?u.replace(/\s*\(\d{4}\)\s*$/,"").trim():a,year:o?o.textContent.trim():r?.[1]||Bu(a),poster:p,href:new URL(e.getAttribute("href"),location.origin).href}}function PS(){if(!_y())return null;let t=Ty(location.href);if(!t)return null;let e=window.movie_storage||window.movie||{},a=document.querySelector(".movie-single-ct h1")||document.querySelector(".movie-single-ct h2")||document.querySelector(".internal-page-container h1")||document.querySelector(".internal-page-container h2"),l=document.querySelector('.movie__poster[data-background-image], .movie__poster[style*="background-image"], .movie-single-ct img[data-src], .movie-single-ct img[src], .internal-page-container img[data-src], .internal-page-container img[src]'),n=document.querySelector('meta[property="og:image"]');return{slug:t,title:typeof e.title=="string"&&e.title.trim()?e.title.trim():a?a.textContent.trim():t,year:typeof e.year=="string"||typeof e.year=="number"?String(e.year):Bu(t),poster:ut(typeof e.movie_poster=="string"&&e.movie_poster?e.movie_poster:typeof e.poster_medium=="string"&&e.poster_medium?e.poster_medium:"")||la(l)||ut(n?.getAttribute("content")||""),href:location.href}}function yf(t){let e=t.dataset.watchlistSlug||"",a=Ce(e),l=zt({season:t.dataset.season,episode:t.dataset.episode,idEpisode:t.dataset.idEpisode}),n="add",i="+ Watch",o="Add this show to your watchlist";if(a){let u=l&&(!a.lastWatched||Oe(l,a.lastWatched)>0);n=u?"watching-new":"watching",i="Watching",o=u?"This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.":"This show is already in your watchlist. Click to remove it."}t.dataset.state!==n&&(t.dataset.state=n),t.textContent!==i&&(t.textContent=i),t.title!==o&&(t.title=o),t.disabled&&(t.disabled=!1)}function La(){document.querySelectorAll(`.${c}-episode-watch-button`).forEach(yf)}function vf(t){let e=t.dataset.watchlistSlug||"",a=Ce(e),l=zt({season:t.dataset.season,episode:t.dataset.episode,idEpisode:t.dataset.idEpisode});if(!a){t.dataset.state="add",t.textContent="+ Add To Watchlist",t.title="Add this show to your watchlist",t.disabled=!1;return}let n=l&&(!a.lastWatched||Oe(l,a.lastWatched)>0);t.dataset.state=n?"watching-new":"watching",t.textContent=n?"Watching: New Episode":"Watching",t.title=n?"This show is on your watchlist and this episode is newer than your watched progress. Click to remove from watchlist.":"This show is already in your watchlist. Click to remove it.",t.disabled=!1}function Li(){document.querySelectorAll(`.${c}-show-view-watch-button`).forEach(vf)}function bf(t){let e=t.dataset.watchlistSlug||"",a=ea(e);if(!a){t.dataset.state="add",t.textContent="+ Movie",t.title="Add this movie to your watchlist",t.disabled=!1;return}t.dataset.state=a.watched?"watching":"watching-new",t.textContent=a.watched?"Watched":"Movie List",t.title=a.watched?"This movie is marked watched. Click to remove it from your movie watchlist.":"This movie is in your movie watchlist. Click to remove it.",t.disabled=!1}function $i(){document.querySelectorAll(`.${c}-movie-watch-button`).forEach(bf)}function Sf(t){let e=t.dataset.watchlistSlug||"",a=ea(e);if(!a){t.dataset.state="add",t.textContent="+ Add Movie To Watchlist",t.title="Add this movie to your watchlist",t.disabled=!1;return}t.dataset.state=a.watched?"watching":"watching-new",t.textContent=a.watched?"Movie Watched":"In Movie Watchlist",t.title=a.watched?"This movie is marked watched. Click to remove it from your movie watchlist.":"This movie is in your movie watchlist. Click to remove it.",t.disabled=!1}function Ri(){document.querySelectorAll(`.${c}-movie-view-watch-button`).forEach(Sf)}function My(t,e="auto"){return!t||!t.slug||!t.episode?null:{slug:t.slug,title:t.title||t.slug,href:t.href||"",episode:t.episode,seenAt:Date.now(),source:e}}function zy(t,e){return!!t&&!!e&&t.slug===e.slug&&oc(t.episode,e.episode)}function wf(t){return Array.from(document.querySelectorAll(".episode-item")).indexOf(t)}function xf(){if(!document.body||!Di())return;document.querySelectorAll(`.episode-item.${c}-shows-list-marker`).forEach(e=>{e.classList.remove(`${c}-shows-list-marker`),e.removeAttribute("data-lookmovie-list-marker")}),d.showsListProgressOrder=-1;let t=d.showsListProgress;t&&document.querySelectorAll(".episode-item").forEach(e=>{let a=Ui(e);zy(a,t)&&(e.classList.add(`${c}-shows-list-marker`),e.dataset.lookmovieListMarker="true",d.showsListProgressOrder=wf(e))})}function Ny(t){let e=Ui(t.closest(".episode-item")),a=zy(e,d.showsListProgress),l=a?"current":"set",n=a?"Bookmarked":"Set bookmark",i=a?"This is the current shows-page bookmark.":"Set the yellow shows-page bookmark here.";t.dataset.state!==l&&(t.dataset.state=l),t.textContent!==n&&(t.textContent=n),t.title!==i&&(t.title=i)}function t2(){document.querySelectorAll(`.${c}-shows-list-marker-button`).forEach(Ny)}function e2(t){let e=My(Ui(t),"manual");e&&(d.showsListProgress=e,d.showsListProgressOrder=wf(t),d.showsListSeenCandidate=null,d.showsListSeenCandidateOrder=-1,d.showsListManualMarkerSet=!0,rc(e),xf(),t2())}function a2(){if(d.showsListManualMarkerSet||d.showsListProgress?.source==="manual")return;let t=Zi(d.showsListSeenCandidate);t&&(d.showsListProgress&&!d.showsListSessionTouched&&(d.showsListProgressOrder<0||d.showsListSeenCandidateOrder<d.showsListProgressOrder)||(d.showsListProgress=t,rc(t),xf()))}function qu(t){t&&t.persist&&a2(),d.showsListObserver&&d.showsListObserver.disconnect(),d.showsListMutationObserver&&d.showsListMutationObserver.disconnect(),d.showsListObserver=null,d.showsListMutationObserver=null,d.showsListRefreshScheduled=!1,d.showsListObservedCards=new WeakSet,d.showsListSeenCandidate=null,d.showsListSeenCandidateOrder=-1,d.showsListSessionTouched=!1,d.showsListManualMarkerSet=!1}function l2(t){let e=Ui(t),a=My(e);if(!a)return;let l=wf(t);l<d.showsListSeenCandidateOrder||(d.showsListSeenCandidate=a,d.showsListSeenCandidateOrder=l)}function Cy(){!document.body||!Di()||!d.showsListObserver||(xf(),document.querySelectorAll(".episode-item").forEach(t=>{d.showsListObservedCards.has(t)||(d.showsListObservedCards.add(t),d.showsListObserver.observe(t))}))}function n2(){d.showsListRefreshScheduled||(d.showsListRefreshScheduled=!0,window.setTimeout(()=>{d.showsListRefreshScheduled=!1,Cy()},150))}function Hu(){!document.body||!Di()||typeof IntersectionObserver!="function"||(d.showsListObserver||(d.showsListObserver=new IntersectionObserver(t=>{t.filter(e=>e.isIntersecting).forEach(e=>l2(e.target))},{threshold:.55})),d.showsListMutationObserver||(d.showsListMutationObserver=new MutationObserver(()=>{n2()}),d.showsListMutationObserver.observe(document.body,{childList:!0,subtree:!0})),Cy())}function Oy(){Di()&&(d.showsListSessionTouched=!0)}function Ef(){!document.body||!Di()||document.querySelectorAll(".episode-item").forEach(t=>{let e=Ui(t);if(!e)return;let a=t.querySelector(`.${c}-episode-watch-button`);a||(a=document.createElement("button"),a.type="button",a.className=`${c}-episode-watch-button`,t.appendChild(a),a.addEventListener("click",async n=>{n.preventDefault(),n.stopPropagation();let i=a.dataset.watchlistSlug;if(i){if(Ce(i)){Ci(i);return}a.dataset.state="adding",a.textContent="Adding...",a.disabled=!0,await Ni({slug:i,title:a.dataset.title||i,year:a.dataset.year||"",poster:a.dataset.poster||"",episode:zt({season:a.dataset.season,episode:a.dataset.episode,idEpisode:a.dataset.idEpisode})}),yf(a)}})),a.dataset.watchlistSlug=e.slug,a.dataset.title=e.title,a.dataset.year=e.year,a.dataset.poster=e.poster,e.episode&&(a.dataset.season=String(e.episode.season),a.dataset.episode=String(e.episode.episode),a.dataset.idEpisode=String(e.episode.idEpisode)),yf(a);let l=t.querySelector(`.${c}-shows-list-marker-button`);l||(l=document.createElement("button"),l.type="button",l.className=`${c}-shows-list-marker-button`,t.appendChild(l),l.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),e2(t)})),Ny(l)})}function Tf(){if(!document.body||!Ay())return;let t=FS();if(!t)return;let e=document.querySelector(".watch-heading")||document.querySelector(".movie-single-ct.main-content")||document.querySelector(".internal-page-container");if(!e)return;let a=document.querySelector(`.${c}-show-view-watch-wrap`);a||(a=document.createElement("div"),a.className=`${c}-show-view-watch-wrap`,e.appendChild(a));let l=a.querySelector(`.${c}-show-view-watch-button`);l||(l=document.createElement("button"),l.type="button",l.className=`${c}-show-view-watch-button`,a.appendChild(l),l.addEventListener("click",async()=>{let n=l.dataset.watchlistSlug;if(n){if(Ce(n)){Ci(n);return}l.dataset.state="adding",l.textContent="Adding...",l.disabled=!0,await Ni({slug:n,title:l.dataset.title||n,year:l.dataset.year||"",poster:l.dataset.poster||"",episode:zt({season:l.dataset.season,episode:l.dataset.episode,idEpisode:l.dataset.idEpisode})}),vf(l)}})),l.dataset.watchlistSlug=t.slug,l.dataset.title=t.title,l.dataset.year=t.year,l.dataset.poster=t.poster,t.episode?(l.dataset.season=String(t.episode.season),l.dataset.episode=String(t.episode.episode),l.dataset.idEpisode=String(t.episode.idEpisode)):(delete l.dataset.season,delete l.dataset.episode,delete l.dataset.idEpisode),vf(l)}function Af(){!document.body||of()||document.querySelectorAll('a[href*="/movies/view/"]').forEach(t=>{let e=t.closest(".slide-item")||t.closest(".movie-item")||t.closest(".mv-item")||t.closest(".movie-item-style-2")||t.closest(".slide-item__backdrop--wrapper")||t.closest(".item")||t.parentElement,a=IS(e);if(!a||!e)return;let l=e.querySelector(".slide-item__buttons")||e.querySelector(".image__placeholder")||e,n=l.querySelector(`.${c}-movie-watch-button`);n||(n=document.createElement("button"),n.type="button",n.className=`${c}-movie-watch-button ${c}-episode-watch-button`,l.appendChild(n),getComputedStyle(l).position==="static"&&(l.style.position="relative"),n.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation();let o=n.dataset.watchlistSlug;if(o){if(ea(o)){_i(o);return}zi({slug:o,title:n.dataset.title||o,year:n.dataset.year||"",poster:n.dataset.poster||"",href:n.dataset.href||Uu(o)}),bf(n)}})),n.dataset.watchlistSlug=a.slug,n.dataset.title=a.title,n.dataset.year=a.year,n.dataset.poster=a.poster,n.dataset.href=a.href,bf(n)})}function _f(){if(!document.body||!_y())return;let t=PS();if(!t)return;let e=document.querySelector(".watch-heading")||document.querySelector(".movie-single-ct.main-content")||document.querySelector(".internal-page-container");if(!e)return;let a=document.querySelector(`.${c}-movie-view-watch-wrap`);a||(a=document.createElement("div"),a.className=`${c}-show-view-watch-wrap ${c}-movie-view-watch-wrap`,e.appendChild(a));let l=a.querySelector(`.${c}-movie-view-watch-button`);l||(l=document.createElement("button"),l.type="button",l.className=`${c}-show-view-watch-button ${c}-movie-view-watch-button`,a.appendChild(l),l.addEventListener("click",()=>{let n=l.dataset.watchlistSlug;if(n){if(ea(n)){_i(n);return}zi({slug:n,title:l.dataset.title||n,year:l.dataset.year||"",poster:l.dataset.poster||"",href:l.dataset.href||Uu(n)}),Sf(l)}})),l.dataset.watchlistSlug=t.slug,l.dataset.title=t.title,l.dataset.year=t.year,l.dataset.poster=t.poster,l.dataset.href=t.href,Sf(l)}function Lu(){return Object.values(d.watchlistStore.shows)}function Ce(t){return t&&d.watchlistStore.shows[t]||null}function i2(t){return t&&Lu().find(e=>e.idShow===t)||null}function my(t){return[...t].sort((e,a)=>{let l=e.latestEpisode?$e(e)?1:0:2,n=a.latestEpisode?$e(a)?1:0:2;return l!==n?l-n:e.title.localeCompare(a.title)})}function o2(t,e){return t?!t.idShow||!t.latestEpisode||!t.upcoming?!0:!t.lastSyncedAt||e-t.lastSyncedAt>=Gf:!1}function rl(){rd(d.watchlistStore),Rt(),Ra(),La(),Li()}function Pt(t,e){d.watchlistMessage=t||"",d.watchlistMessageTone=e||"muted",Rt()}async function $y(t,e){let a=await Qi(`/shows/view/${t}`),l=a.match(/id_show:\s*(\d+)/),n=a.match(/title:\s*'((?:\\'|[^'])*)'/),i=a.match(/year:\s*'((?:\\'|[^'])*)'/),o=a.match(/poster_medium:\s*'((?:\\'|[^'])*)'/);return{slug:t,idShow:l?et(l[1]):0,title:n?xe(n[1]).trim():e&&e.title?e.title:t,year:i?xe(i[1]).trim():e&&e.year?e.year:"",poster:o?xe(o[1]).trim():e&&e.poster?e.poster:""}}async function Ry(t){let e=await Xi(`/api/v2/download/episode/list?id=${t}`),a=[];Object.entries(e&&e.list||{}).forEach(([i,o])=>{Object.entries(o||{}).forEach(([u,r])=>{let p=zt({season:i,episode:u,idEpisode:r&&r.id_episode});p&&a.push(p)})}),a.sort(Oe);let l=e&&e.latest?e.latest:null,n=zt({season:l&&l.season,episode:l&&l.episode,idEpisode:l&&l.id_episode});return n&&(n.updatedAt=Date.now()),{latestEpisode:n,episodes:a}}function u2(t,e){let a=e?t.findIndex(n=>Oe(n,e)>0):0,l=a<0?[]:t.slice(a);return{afterIdEpisode:e?e.idEpisode:0,total:l.length,episodes:l.slice(0,Kf).map(({season:n,episode:i,idEpisode:o})=>({season:n,episode:i,idEpisode:o}))}}function pf(t){let e=t&&t.upcoming;if(!e)return null;let a=t.lastWatched?t.lastWatched.idEpisode:0;if(e.afterIdEpisode===a)return e;if(!t.lastWatched)return null;let l=e.episodes.findIndex(n=>Oe(n,t.lastWatched)>0);return l<0?e.episodes.length===e.total?{afterIdEpisode:a,total:0,episodes:[]}:null:l===0?null:{afterIdEpisode:a,total:e.total-l,episodes:e.episodes.slice(l)}}function Uy(t){t.upcoming&&!pf(t)&&ta({force:!0,slugs:[t.slug]})}async function Ni(t){if(!t||!t.slug)return;let e=Ce(t.slug);if(e){Pt(`${e.title} is already in your watchlist.`,"muted"),La();return}Pt(`Adding ${t.title||t.slug}...`,"muted");let a={slug:t.slug,idShow:0,title:t.title||t.slug,year:t.year||"",poster:t.poster||""};try{a=await $y(t.slug,t)}catch(l){console.warn(`[${c}] Failed to resolve show metadata for ${t.slug}.`,l)}d.watchlistStore.shows[t.slug]=mn(t.slug,{slug:t.slug,idShow:a.idShow,title:a.title||t.title||t.slug,year:a.year||t.year||"",poster:a.poster||t.poster||"",addedAt:Date.now(),latestEpisode:t.episode||null,lastSyncedAt:0}),rl(),Pt(`${a.title||t.title||t.slug} added to your watchlist.`,"success"),await ta({force:!0,slugs:[t.slug]})}function Ci(t){let e=Ce(t);e&&(delete d.watchlistStore.shows[t],rl(),Pt(`${e.title} removed from your watchlist.`,"muted"))}function cy(t){let e=Ce(t);!e||!e.latestEpisode||($e(e)?(e.lastWatched=null,Pt(`${e.title} marked as having an unwatched latest episode.`,"muted")):(e.lastWatched={...e.latestEpisode,watchedAt:Date.now()},Pt(`${e.title} marked watched through ${Ut(e.latestEpisode)}.`,"success")),rl(),Uy(e))}async function ta(t){let e=!!(t&&t.force),a=t&&Array.isArray(t.slugs)?new Set(t.slugs):null;if(d.watchlistRefreshPromise)return d.watchlistRefreshPromise;let l=Date.now(),n=Lu().filter(i=>a&&!a.has(i.slug)?!1:e||o2(i,l));return n.length?(d.watchlistBusy=!0,Pt(`Refreshing ${n.length} watchlist ${n.length===1?"show":"shows"}...`,"muted"),d.watchlistRefreshPromise=(async()=>{for(let i of n)try{if(!i.idShow){let r=await $y(i.slug,i);i.idShow=r.idShow,i.title=r.title||i.title,i.year=r.year||i.year,i.poster=r.poster||i.poster}if(!i.idShow)throw new Error("Unable to resolve show id.");let{latestEpisode:o,episodes:u}=await Ry(i.idShow);i.latestEpisode=o,i.upcoming=u2(u,i.lastWatched),i.lastSyncError="",i.lastSyncedAt=Date.now()}catch(o){i.lastSyncError=o instanceof Error?o.message:String(o),i.lastSyncedAt=Date.now(),console.warn(`[${c}] Failed to refresh ${i.slug}.`,o)}rl(),Pt("Watchlist refreshed.","success")})().catch(i=>{console.warn(`[${c}] Watchlist refresh failed.`,i),Pt("Watchlist refresh failed.","danger")}).finally(()=>{d.watchlistBusy=!1,Rt(),La(),d.watchlistRefreshPromise=null}),d.watchlistRefreshPromise):(Rt(),La(),Promise.resolve())}function Dy(){let t=et(window.id_show);if(t)return t;let e=Array.from(document.scripts).find(l=>/id_show:\s*\d+/.test(l.textContent||"")),a=e?e.textContent.match(/id_show:\s*(\d+)/):null;return a?et(a[1]):0}function c2(){if(!location.pathname.startsWith("/shows/play/"))return null;let t=location.hash.match(/^#S(\d+)-E(\d+)-(\d+)$/i);if(!t)return null;let e=Dy(),a=et(t[1]),l=et(t[2]),n=et(t[3]);return!e||!a||!l||!n?null:{idShow:e,season:a,episode:l,idEpisode:n}}function Ly(){let t=c2();if(!t)return;let e=`${t.idShow}:${t.idEpisode}`;if(e===d.lastTrackedEpisodeSignature)return;let a=i2(t.idShow);a&&(a.lastWatched={season:t.season,episode:t.episode,idEpisode:t.idEpisode,watchedAt:Date.now()},(!a.latestEpisode||Oe(a.lastWatched,a.latestEpisode)>0)&&(a.latestEpisode={season:t.season,episode:t.episode,idEpisode:t.idEpisode,updatedAt:Date.now()}),d.lastTrackedEpisodeSignature=e,rl(),Uy(a),Pt(`${a.title} updated to watched through ${Ut(a.lastWatched)}.`,"success"))}function r2(){let t=location.hash.match(/^#S(\d+)-E(\d+)-(\d+)$/i);return t?{season:Number(t[1]),episode:Number(t[2]),idEpisode:Number(t[3])}:null}async function Yu(){let t=Dy(),e=r2();if(!t||!e)return null;let{episodes:a}=await Ry(t);return a.find(l=>Oe(l,e)>0)||null}var ju=`${c}-autonext`,Mf=0,dn=null;function pn(){window.clearInterval(Mf),Mf=0,dn&&(dn.remove(),dn=null)}function By(t){pn(),ul(t)}function s2(t){let e=document.createElement("div");e.className=ju,e.setAttribute("role","status");let a=document.createElement("p");a.append("Up next: ");let l=document.createElement("strong");l.textContent=Ut(t),a.append(l," in ");let n=document.createElement("span");n.className=`${ju}-seconds`,a.append(n,"s");let i=document.createElement("button");i.type="button",i.className=`${ju}-play`,i.textContent="Play now",i.addEventListener("click",u=>{u.stopPropagation(),By(t)});let o=document.createElement("button");return o.type="button",o.textContent="Cancel",o.addEventListener("click",u=>{u.stopPropagation(),pn()}),e.append(a,i,o),e}async function Vu(t){if(!!!(t&&t.force)&&!d.settings.autoNextEpisode||!location.pathname.startsWith("/shows/play/"))return!1;let a=location.hash,l=null;try{l=await Yu()}catch(u){console.warn(`[${c}] Could not look up the next episode.`,u)}let n=document.getElementById("video_player");if(!l||!n||location.hash!==a)return!1;pn(),dn=s2(l),n.appendChild(dn);let i=Jf,o=dn.querySelector(`.${ju}-seconds`);return o.textContent=String(i),Mf=window.setInterval(()=>{i-=1,location.hash!==a?pn():i<=0?By(l):o.textContent=String(i)},1e3),!0}var Bi=`${c}-intro`,f2=1,qy=5,zf=null,Ba=null,Cf="",Nf="",ve=null,Hy=0;function ku(){return zf||(zf=yd()),zf}function Qu(){let t=location.pathname.match(/^\/shows\/play\/(?:\d+-)?([^/?#]+)/i);return t?t[1].toLowerCase():""}function Xu(){let t=Qu();return t&&ku()[t]||null}function Hi(){let t=Xu();return t&&Number.isFinite(t.start)?t:null}function Gu(t){let e=Qu(),a={...Xu()||{},...t,updatedAt:Date.now()};Object.keys(a).forEach(l=>a[l]===void 0&&delete a[l]),Number.isFinite(a.start)||Number.isFinite(a.creditsFromEnd)?ku()[e]=a:delete ku()[e],vd(ku())}function sl(t){let e=Math.max(0,Math.round(t));return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function qi(){return document.querySelector("#video_player video")}function Of(t,e){return t&&e>=t.start&&e<t.end-f2}function be(t){if(!Vy())return;let e=ve.querySelector(`.${Bi}-toast`);e.textContent=t,e.hidden=!1,window.clearTimeout(Hy),Hy=window.setTimeout(()=>{e.hidden=!0},2500)}function Zu(){let t=qi(),e=Hi();return!t||!Of(e,t.currentTime)?!1:(Cf=location.hash,t.currentTime=e.end,be("Skipped intro"),!0)}function fl(t,e,a){let l=document.createElement("button");return l.type="button",l.className=e,l.textContent=t,l.addEventListener("click",n=>{n.stopPropagation(),a()}),l}function d2(t,e){let a=document.createElement("div");a.className=`${c}-player-menu-row`;let l=document.createElement("span");l.textContent="Intro",a.append(l);let n=Hi();if(Ba!==null)a.append(fl(`Mark end (from ${sl(Ba)})`,t,()=>{let i=qi(),o=i?i.currentTime:0;if(o-Ba<qy){be(`Play past the intro first (at least ${qy}s).`);return}Gu({start:Ba,end:o}),Ba=null,Cf=location.hash,be(`Intro saved: ${sl(Hi().start)}\u2013${sl(o)}`),e()}),fl("Cancel",t,()=>{Ba=null,e()}));else if(n){let i=document.createElement("em");i.textContent=`${sl(n.start)}\u2013${sl(n.end)}`,a.append(i,fl("Clear",t,()=>{Gu({start:void 0,end:void 0}),jy(qi()),be("Intro cleared for this show."),e()}))}else a.append(fl("Mark start here",t,()=>{let i=qi();Ba=i?i.currentTime:0,be("Now play to the end of the intro and mark it."),e()}));return a}function p2(t,e){let a=document.createElement("div");a.className=`${c}-player-menu-row`;let l=document.createElement("span");l.textContent="Credits",a.append(l);let n=Xu();if(n&&Number.isFinite(n.creditsFromEnd)){let i=document.createElement("em");i.textContent=`last ${sl(n.creditsFromEnd)}`,a.append(i,fl("Clear",t,()=>{Gu({creditsFromEnd:void 0}),be("Credits cleared for this show."),e()}))}else a.append(fl("Mark credits start here",t,()=>{let i=qi();if(!i||!Number.isFinite(i.duration))return;let o=i.duration-i.currentTime;Gu({creditsFromEnd:o}),Nf=location.hash,be(`Credits saved: last ${sl(o)} of each episode.`),e()}));return a}function Yy(t,e){if(!Qu())return null;let a=document.createElement("div");a.className=`${c}-player-menu-section`;let l=document.createElement("p");return l.className=`${c}-player-menu-heading`,l.textContent="This show",a.append(l,d2(t,e),p2(t,e)),a}function jy(t){if(!ve)return;let e=ve.querySelector(`.${Bi}-skip`);e.hidden=!(!d.settings.autoSkipIntro&&Of(Hi(),t?t.currentTime:-1))}function Vy(){let t=document.getElementById("video_player");if(!t)return null;if(ve&&ve.parentElement===t)return ve;ve=document.createElement("div"),ve.className=Bi;let e=fl("Skip intro",`${Bi}-skip`,Zu);e.hidden=!0;let a=document.createElement("p");return a.className=`${Bi}-toast`,a.hidden=!0,ve.append(e,a),t.appendChild(ve),ve}function ky(t){if(!Qu()||!Vy())return;let e=Xu(),a=t.currentTime;d.settings.autoSkipIntro&&Cf!==location.hash&&Ba===null&&Of(Hi(),a)&&Zu(),e&&Number.isFinite(e.creditsFromEnd)&&d.settings.autoSkipCredits&&Nf!==location.hash&&Number.isFinite(t.duration)&&!t.paused&&t.duration-a<=e.creditsFromEnd&&(Nf=location.hash,Vu({force:!0})),jy(t)}var $f=`${c}-player-menu`,m2=`${c}-player-menu-button`,Gy="#video_player .vjs-settings-quality-menu",h2=[{key:"autoPlay",label:"Auto play"},{key:"autoNextEpisode",label:"Auto next episode",showsOnly:!0},{key:"autoSkipIntro",label:"Auto skip intros",showsOnly:!0},{key:"autoSkipCredits",label:"Skip credits to next episode",showsOnly:!0},{key:"autoFullscreen",label:"Auto fullscreen"},{key:"windowedFullscreen",label:"Windowed fullscreen"}];function g2(){return location.pathname.startsWith("/shows/play/")}function Qy(){return document.querySelector("#video_player video")}function Ku(t=Qy()){t&&t.playbackRate!==d.settings.playbackRate&&(t.playbackRate=d.settings.playbackRate)}function Xy(t){$a({...d.settings,playbackRate:t}),Ku(),be(`Speed ${t}\xD7`),Yi()}function Rf(t){let e=qa.indexOf(d.settings.playbackRate),a=qa[Math.max(0,Math.min(qa.length-1,e+t))];a!==d.settings.playbackRate&&Xy(a)}async function Uf(){let t=Qy();if(!t||!document.pictureInPictureEnabled)return!1;try{return document.pictureInPictureElement?await document.exitPictureInPicture():await t.requestPictureInPicture(),!0}catch(e){return console.warn(`[${c}] Picture-in-picture failed.`,e),!1}}function Zy(t){let e=document.createElement("div");e.className=`${c}-player-menu-section`;let a=document.createElement("p");return a.className=`${c}-player-menu-heading`,a.textContent=t,e.append(a),e}function y2(){let t=Zy("Speed"),e=document.createElement("div");return e.className=`${c}-player-menu-chips`,qa.forEach(a=>{let l=document.createElement("button");l.type="button",l.textContent=`${a}\xD7`,l.dataset.active=a===d.settings.playbackRate?"true":"false",l.addEventListener("click",()=>Xy(a)),e.append(l)}),t.append(e),t}function v2(){let t=Zy("Enhancer");if(h2.filter(e=>!e.showsOnly||g2()).forEach(e=>{let a=document.createElement("button");a.type="button",a.className=`${c}-player-menu-toggle`,a.setAttribute("role","menuitemcheckbox"),a.setAttribute("aria-checked",d.settings[e.key]?"true":"false"),a.textContent=e.label,a.addEventListener("click",()=>{$a({...d.settings,[e.key]:!d.settings[e.key]}),Yi()}),t.append(a)}),document.pictureInPictureEnabled){let e=document.createElement("button");e.type="button",e.className=`${c}-player-menu-toggle`,e.textContent="Picture-in-picture",e.addEventListener("click",Uf),t.append(e)}return t}function Yi(){let t=document.querySelector(`${Gy} .${$f}`);if(!t)return;t.replaceChildren(y2(),v2());let e=Yy(m2,Yi);e&&t.append(e)}function Df(){let t=document.querySelector(Gy),e=t&&t.querySelector(".vjs-settings-body");if(!e||e.querySelector(`.${$f}`))return;let a=e.querySelector(".vjs-menu");if(a&&!e.querySelector(`.${c}-quality-heading`)){let i=document.createElement("p");i.className=`${c}-player-menu-heading ${c}-quality-heading`,i.textContent="Quality",e.insertBefore(i,a)}let l=document.createElement("div");l.className=$f,l.addEventListener("click",i=>i.stopPropagation()),e.append(l),Yi();let n=t.parentElement&&t.parentElement.querySelector("button");n&&n.addEventListener("click",Yi)}function ge(){let t=document.getElementById("video_player"),e=t?Array.from(t.querySelectorAll("video")):[],a=[...new Set([...e,...Array.from(document.querySelectorAll("video"))])].filter(l=>{let n=l.getBoundingClientRect();return n.width>0&&n.height>0});return a.find(l=>!l.paused&&!l.ended)||a.find(l=>l.readyState>0)||a[0]||null}function T0(){let t=ge();return t?(t.play(),!0):!1}function A0(){let t=ge();return t?(t.pause(),!0):!1}function _0(){let t=ge();return t?(t.paused?t.play():t.pause(),!0):!1}function M0(t){let e=ge();if(!e||!Number.isFinite(t))return!1;let a=Number.isFinite(e.duration)?e.duration:Number.MAX_SAFE_INTEGER;return e.currentTime=Math.max(0,Math.min(a,e.currentTime+t)),!0}function z0(t){let e=ge();return!e||!Number.isFinite(t)?!1:(e.volume=Math.max(0,Math.min(1,t/100)),e.muted=!1,!0)}function af(t){let e=ge();return e?(e.muted=!!t,!0):!1}function N0(){let t=document.getElementById("video_player"),e=t?.querySelector(".vjs-fullscreen-control"),a=!!document.getElementById(dl),l=!!document.fullscreenElement,n=!!t?.classList.contains("vjs-fullscreen");return a||l||n?(a&&cn(),l&&typeof document.exitFullscreen=="function"&&document.exitFullscreen(),n&&e&&e.click(),d.fullscreenTriggered=!1,!0):Jy()}function Jy(){let t=document.getElementById("video_player");if(document.getElementById(dl)||document.fullscreenElement||t?.classList.contains("vjs-fullscreen"))return!0;if(!t)return!1;let e=t.querySelector(".vjs-fullscreen-control");if(e&&e.click(),d.settings.windowedFullscreen)w2();else if(!e)return!1;return d.fullscreenTriggered=!0,!0}function Ky(t){history.replaceState(null,"",`#S${t.season}-E${t.episode}-${t.idEpisode}`),window.dispatchEvent(new Event("ChangedEpisodeHash"))}function ul(t){return location.pathname.startsWith("/shows/play/")?t?(Ky(t),!0):(Yu().then(e=>{e?Ky(e):be("This is the last episode.")}).catch(e=>console.warn(`[${c}] Could not find the next episode.`,e)),!0):!1}function b2(){if(!d.settings.autoPlay)return!1;let t=document.getElementById("progress-continue-button"),e=document.getElementById("progress-from-beginning-button"),a=Number.parseFloat(document.getElementById("progress-bar")?.style.width),l=Number.isFinite(a)&&a>=Gi?e||t:t||e;return l?(console.log(`[${c}] Dismissing playback modal (${l.id}).`),l.click(),!0):!1}function S2(){let t=document.getElementById("video_player");if(!t)return!1;let e=document.getElementById(we);if(e||(e=document.createElement("button"),e.id=we,e.type="button",e.textContent="Exit",e.setAttribute("aria-label","Exit windowed fullscreen"),e.title="Exit windowed fullscreen",e.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation(),cn(),d.fullscreenTriggered=!1})),e.parentElement!==t&&t.appendChild(e),!t._lookmovieFullscreenExitActivityAttached){let a=()=>{window.clearTimeout(t._lookmovieFullscreenExitActivityTimer),t.classList.add(`${c}-fullscreen-exit-active`),t._lookmovieFullscreenExitActivityTimer=window.setTimeout(()=>{t.classList.remove(`${c}-fullscreen-exit-active`)},1600)};t._lookmovieFullscreenExitActivityAttached=!0,t.addEventListener("pointermove",a)}return!0}function w2(){if(!document.head)return!1;if(!document.getElementById(dl)){let t=document.createElement("style");t.id=dl,t.textContent=`
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
        `,document.head.appendChild(t)}return S2(),document.body&&document.body.classList.add(`${c}-fullscreen`),!0}function cn(){let t=document.getElementById(dl);t&&t.remove();let e=document.getElementById("video_player");e&&(window.clearTimeout(e._lookmovieFullscreenExitActivityTimer),e.classList.remove(`${c}-fullscreen-exit-active`));let a=document.getElementById(we);a&&a.remove(),document.body&&document.body.classList.remove(`${c}-fullscreen`)}function x2(){return!d.settings.autoFullscreen||d.fullscreenTriggered?!1:(console.log(`[${c}] Applying fullscreen behavior.`),Jy())}function E2(){pn(),Ly(),wi("play"),!(!d.settings.autoPlay&&!d.settings.autoFullscreen)&&window.setTimeout(()=>{let t=b2();window.setTimeout(()=>{x2()},t?500:200)},300)}function T2(){wi("pause")}function A2(){wi("ended"),window.setTimeout(()=>{q0()||Vu()},750)}function Lf(t){!t||t._lookmovieEnhancerAttached||(t._lookmovieEnhancerAttached=!0,t.addEventListener("play",E2),t.addEventListener("loadedmetadata",()=>{t.closest("#video_player")&&(Df(),Ku(t))}),t.addEventListener("play",()=>{t.closest("#video_player")&&Ku(t)}),t.addEventListener("pause",T2),t.addEventListener("ended",A2),t.addEventListener("timeupdate",()=>{t.closest("#video_player")&&(Df(),ky(t))}))}function Bf(){document.querySelectorAll("video").forEach(Lf)}function Wy(){let t=window.setInterval(()=>{if(!document.body)return;window.clearInterval(t),Bf(),new MutationObserver(a=>{a.forEach(l=>{l.type==="childList"&&l.addedNodes.forEach(n=>{!n||n.nodeType!==Node.ELEMENT_NODE||(n.tagName==="VIDEO"&&Lf(n),typeof n.querySelectorAll=="function"&&n.querySelectorAll("video").forEach(Lf))})})}).observe(document.body,{childList:!0,subtree:!0})},100)}var Iy=".player-pre-init-ads",_2=".pre-init-ads--close, .pre-init-ads--back-button";function M2(){window.__lookmovie2EnhancerAdBypass||(window.__lookmovie2EnhancerAdBypass=!0,Object.defineProperty(window,"_preInitAdsTimestamp",{configurable:!0,get:()=>Date.now(),set:()=>{}}))}function z2(t){let e=document.createElement("script");e.textContent=t,(document.head||document.documentElement).appendChild(e),e.remove()}function N2(){if(document.getElementById(nc)||!document.documentElement)return;let t=document.createElement("style");t.id=nc,t.textContent=".ad-container { display: none !important; }",(document.head||document.documentElement).appendChild(t)}function Fy(){let t=document.querySelector(Iy);if(!t||t.classList.contains("tw-hidden"))return!1;let e=t.querySelector(_2);return e?(e.click(),console.info(`[${c}] Skipped ad countdown.`),!0):!1}function Py(){try{z2(`(${M2.toString()})();`)}catch(t){console.warn(`[${c}] Failed to install ad timer bypass.`,t)}N2()}function tv(){let t=document.querySelector(Iy);t&&(Fy(),new MutationObserver(Fy).observe(t,{attributes:!0,attributeFilter:["class"]}))}function ev(){return location.pathname.startsWith("/shows/play/")}function C2(t){return!!t&&(t.isContentEditable||/^(input|textarea|select)$/i.test(t.tagName||""))}function O2(t){if(!document.getElementById("video_player")||t.ctrlKey||t.metaKey||t.altKey||C2(t.target))return;let e=!1;switch(t.key){case"n":case"N":e=ev()&&ul();break;case"s":case"S":e=Zu();break;case">":Rf(1),e=!0;break;case"<":Rf(-1),e=!0;break;case"p":case"P":Uf(),e=!0;break;default:break}e&&(t.preventDefault(),t.stopPropagation())}function $2(t){let e=t.target;!(e&&e.closest&&e.closest(".vjs-next-episode-button"))||!ev()||(t.preventDefault(),t.stopImmediatePropagation(),ul())}function av(){document.addEventListener("keydown",O2,!0),document.addEventListener("click",$2,!0)}function R2(){window.setInterval(()=>{if(location.href===d.lastKnownUrl)return;new URL(d.lastKnownUrl,location.origin).pathname==="/shows"?qu({persist:!0}):qu(),d.lastKnownUrl=location.href,d.fullscreenTriggered=!1,d.lastTrackedEpisodeSignature="",cn(),Bf(),gf(),Rt(),La(),Ef(),Hu(),Li(),Tf(),$i(),Af(),Ri(),_f(),Ti(),ta()},Qf)}function qf(){if(d.domBootstrapped)return;d.domBootstrapped=!0,tv(),av(),Wy(),zu(),R2(),window.addEventListener("scroll",Oy,{passive:!0}),window.addEventListener("pagehide",()=>qu({persist:!0}));let t=window.setInterval(()=>{d.uiBootAttempts+=1,gf(),Ef(),Hu(),Tf(),Af(),_f(),(document.getElementById(S)||d.uiBootAttempts>100)&&window.clearInterval(t)},100);Rt(),Ra(),La(),Hu(),Li(),$i(),Ri(),Ti(),ta()}Py();Nu();I0();document.readyState==="loading"?document.addEventListener("DOMContentLoaded",qf,{once:!0}):qf();})();
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
