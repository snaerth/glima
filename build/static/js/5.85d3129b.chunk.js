(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{173:function(e,t,a){"use strict";var n=a(1);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r.default}});var r=n(a(414))},414:function(e,t,a){"use strict";var n=a(1);Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.styles=void 0;var r=n(a(9)),o=n(a(3)),c=n(a(5)),i=n(a(0)),l=(n(a(2)),n(a(4))),s=(n(a(8)),a(11),n(a(10))),u={root:{display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},media:{width:"100%"}};t.styles=u;var d=["video","audio","picture","iframe","img"];function m(e){var t=e.classes,a=e.className,n=e.component,s=e.image,u=e.src,m=e.style,v=(0,c.default)(e,["classes","className","component","image","src","style"]),f=-1!==d.indexOf(n),p=!f&&s?(0,o.default)({backgroundImage:'url("'.concat(s,'")')},m):m;return i.default.createElement(n,(0,o.default)({className:(0,l.default)(t.root,(0,r.default)({},t.media,f),a),style:p,src:f?s||u:void 0},v))}m.defaultProps={component:"div"};var v=(0,s.default)(u,{name:"MuiCardMedia"})(m);t.default=v},415:function(e,t,a){"use strict"},420:function(e,t,a){"use strict";a.d(t,"a",function(){return l});var n=a(0),r=a.n(n);function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var c=r.a.createElement("path",{d:"M2 5.077S2 2 5.077 2h13.846S22 2 22 5.077v13.846S22 22 18.923 22H5.077S2 22 2 18.923V5.077z","data-st":"fill:#1565C0;;",fill:"#1565c0"}),i=r.a.createElement("path",{d:"M12.75 8.625c0-.613.24-1.125 1.125-1.125H15V5.25h-1.875c-2.25 0-3 .75-3 3v1.5h-1.5V12h1.5v6.75h2.625V12h1.875L15 9.75h-2.25V8.625z",fillRule:"evenodd",clipRule:"evenodd",fill:"#fff"}),l=function(e){return r.a.createElement("svg",o({width:24,height:24,preserveAspectRatio:"none"},e),c,i)};a.p},451:function(e,t,a){e.exports={containerExtra:"Event_containerExtra__ufaIB",card:"Event_card__3BCuQ",textCenter:"Event_textCenter__ZINFh",media:"Event_media__3jnQK",facebookIcon:"Event_facebookIcon___Yv00",buttonsContainer:"Event_buttonsContainer__2OhrZ"}},475:function(e,t,a){"use strict";a.r(t);var n=a(27),r=a(28),o=a(35),c=a(33),i=a(36),l=a(0),s=a.n(l),u=a(48),d=a(29),m=a(17),v=a(34),f=a.n(v),p=a(173),h=a.n(p),b=a(82),g=a.n(b),E=a(55),_=a.n(E),k=(a(415),a(124)),y=a(126),w=a(49),O=a(65),j=a(420),x=a(451),C=a.n(x),N=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,i=new Array(r),l=0;l<r;l++)i[l]=arguments[l];return(a=Object(o.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(i)))).backButtonHandler=function(){a.props.history.goBack()},a}return Object(i.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.actions,a=e.event,n=e.match.params.id;!a&&n&&t.getEvent(n)}},{key:"renderLoading",value:function(){return s.a.createElement(w.a,{className:C.a.textCenter},s.a.createElement(g.a,null),s.a.createElement("p",null,"S\xe6ki vi\xf0bur\xf0..."))}},{key:"renderNoEvent",value:function(){return s.a.createElement(w.a,{className:C.a.textCenter},s.a.createElement("h1",null,"Engin vi\xf0bur\xf0ur fannst"))}},{key:"render",value:function(){var e=this.props,t=e.event,a=e.error,n=e.classes;if(a||!t)return s.a.createElement(O.a,{textCenter:!1,text:"Vi\xf0 fundum engan vi\xf0bur\xf0 \xe1 \xfeessum hlekk."});var r=t.description,o=t.title,c=t.start_date,i=t.end_date_details,l=t.start_date_details,u=null;return t.image&&t.image.sizes&&t.image.sizes.medium_large&&t.image.sizes.medium_large.url&&(u=t.image.sizes.medium_large.url),s.a.createElement(w.a,{className:C.a.containerExtra},u&&s.a.createElement(h.a,{alt:o,title:o,className:C.a.media,image:u}),s.a.createElement(f.a,{gutterBottom:!0,variant:"h6",className:n.title},o),s.a.createElement(f.a,{color:"textSecondary",component:"span"},Object(k.a)(c,!1)," fr\xe1 kl. ".concat(l.hour,":").concat(l.minutes)," ","til"," ".concat(i.hour,":").concat(i.minutes)),t.venue.address&&s.a.createElement(f.a,{color:"textSecondary",component:"span"},"Sta\xf0setning: ",t.venue.address),s.a.createElement("div",null,s.a.createElement(f.a,{component:"article"},s.a.createElement("span",{dangerouslySetInnerHTML:{__html:r}})),s.a.createElement("div",{className:C.a.buttonsContainer},s.a.createElement(_.a,{color:"primary",onClick:this.backButtonHandler},"Til baka"),s.a.createElement("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https://www.glima.is/vidburdir/".concat(t.id),target:"_blank",rel:"noopener noreferrer",className:n.noLink},s.a.createElement(_.a,{size:"small",color:"primary"},s.a.createElement(j.a,{className:C.a.facebookIcon})," Deila \xe1 Facebook")))))}}]),t}(l.PureComponent);t.default=Object(u.b)(function(e){var t=e.events;return{event:t.event,error:t.error}},function(e){return{actions:Object(d.b)({getEvent:y.b},e)}})(Object(m.withStyles)({title:{marginTop:16,fontWeight:700},noLink:{textDecoration:"none",color:"inherit","&:hover":{textDecoration:"none"}}})(N))}}]);
//# sourceMappingURL=5.85d3129b.chunk.js.map