(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{173:function(e,t,a){"use strict";var r=a(1);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return n.default}});var n=r(a(414))},414:function(e,t,a){"use strict";var r=a(1);Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.styles=void 0;var n=r(a(9)),o=r(a(3)),c=r(a(5)),l=r(a(0)),i=(r(a(2)),r(a(4))),s=(r(a(8)),a(11),r(a(10))),u={root:{display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},media:{width:"100%"}};t.styles=u;var d=["video","audio","picture","iframe","img"];function m(e){var t=e.classes,a=e.className,r=e.component,s=e.image,u=e.src,m=e.style,f=(0,c.default)(e,["classes","className","component","image","src","style"]),p=-1!==d.indexOf(r),v=!p&&s?(0,o.default)({backgroundImage:'url("'.concat(s,'")')},m):m;return l.default.createElement(r,(0,o.default)({className:(0,i.default)(t.root,(0,n.default)({},t.media,p),a),style:v,src:p?s||u:void 0},f))}m.defaultProps={component:"div"};var f=(0,s.default)(u,{name:"MuiCardMedia"})(m);t.default=f},415:function(e,t,a){"use strict"},417:function(e,t,a){"use strict";var r=a(0),n=a.n(r),o=a(176),c=a.n(o),l=function(e){var t=e.children,a=e.title;return n.a.createElement(c.a,{placement:"top",title:a,interactive:!0},t)};a.d(t,"a",function(){return l})},420:function(e,t,a){"use strict";a.d(t,"a",function(){return i});var r=a(0),n=a.n(r);function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}var c=n.a.createElement("path",{d:"M2 5.077S2 2 5.077 2h13.846S22 2 22 5.077v13.846S22 22 18.923 22H5.077S2 22 2 18.923V5.077z","data-st":"fill:#1565C0;;",fill:"#1565c0"}),l=n.a.createElement("path",{d:"M12.75 8.625c0-.613.24-1.125 1.125-1.125H15V5.25h-1.875c-2.25 0-3 .75-3 3v1.5h-1.5V12h1.5v6.75h2.625V12h1.875L15 9.75h-2.25V8.625z",fillRule:"evenodd",clipRule:"evenodd",fill:"#fff"}),i=function(e){return n.a.createElement("svg",o({width:24,height:24,preserveAspectRatio:"none"},e),c,l)};a.p},449:function(e,t,a){e.exports={containerExtra:"Post_containerExtra__2HhCs",card:"Post_card__3FIm1",textCenter:"Post_textCenter__2oOLI",bigAvatar:"Post_bigAvatar__1GbRX",author:"Post_author__1TeaB",media:"Post_media__2KYO2",facebookIcon:"Post_facebookIcon__2xk2H",buttonsContainer:"Post_buttonsContainer__OxEdh"}},484:function(e,t,a){"use strict";a.r(t);var r=a(27),n=a(28),o=a(35),c=a(33),l=a(36),i=a(0),s=a.n(i),u=a(48),d=a(29),m=a(17),f=a(34),p=a.n(f),v=a(173),h=a.n(v),b=a(67),_=a.n(b),g=a(42),E=a.n(g),k=a(175),y=a.n(k),P=a(43),O=a.n(P),w=a(174),x=a.n(w),j=a(55),N=a.n(j),C=(a(415),a(124));var I=a(125),M=a(49),S=a(21),A=a(417),H=a(65),L=a(420),V=a(449),z=a.n(V),R=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(a=Object(o.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(l)))).backButtonHandler=function(){a.props.history.goBack()},a}return Object(l.a)(t,e),Object(n.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.actions,a=e.post,r=e.match.params.id;!a&&r&&(t.setPostsLoading(),t.getPost(r))}},{key:"renderNoPost",value:function(){return s.a.createElement(H.a,{textCenter:!1,text:"Vi\xf0 fundum enga fr\xe9tt \xe1 \xfeessum hlekk."})}},{key:"render",value:function(){var e=this.props,t=e.post,a=e.error,r=e.loading,n=e.classes;if(r)return s.a.createElement(S.a,{text:"S\xe6ki fr\xe9tt..."});if(a||!t)return this.renderNoPost();var o=t.content,c=t.title,l=t.date,i=t._embedded,u=null,d=i?i["wp:featuredmedia"]:null;d&&(u=d[0].media_details.sizes.full.source_url);var m,f=i.author[0];return s.a.createElement(M.a,{className:z.a.containerExtra},u&&s.a.createElement(h.a,{alt:d[0].alt_text||c.rendered,className:z.a.media,image:u,title:d[0].alt_text||c.rendered}),s.a.createElement("h2",{className:z.a.title},c.rendered),s.a.createElement("div",null,s.a.createElement(_.a,{className:z.a.author},s.a.createElement(E.a,null,s.a.createElement(A.a,{interactive:!0,open:!0,title:s.a.createElement(E.a,{alignItems:"flex-start"},s.a.createElement(y.a,null,s.a.createElement(x.a,{alt:f.name,src:f.avatar_urls[96],className:z.a.bigAvatar})),s.a.createElement(O.a,{primary:f.name,secondary:f.description}))},s.a.createElement(x.a,{alt:f.name,src:f.avatar_urls[96],className:z.a.bigAvatar})),s.a.createElement(O.a,{primary:(m=f.name,m.charAt(0).toUpperCase()+m.slice(1)),secondary:Object(C.a)(l)}))),s.a.createElement(p.a,{component:"article"},s.a.createElement("span",{dangerouslySetInnerHTML:{__html:o.rendered}})),s.a.createElement("div",{className:z.a.buttonsContainer},s.a.createElement(N.a,{color:"primary",onClick:this.backButtonHandler},"Til baka"),s.a.createElement("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https://www.glima.is/frett/".concat(t.slug,"/").concat(t.id),target:"_blank",rel:"noopener noreferrer",className:n.noLink},s.a.createElement(N.a,{size:"small",color:"primary"},s.a.createElement(L.a,{className:z.a.facebookIcon})," Deila \xe1 Facebook")))))}}]),t}(i.PureComponent);t.default=Object(u.b)(function(e){var t=e.blog;return{post:t.post,error:t.error,loading:t.loading}},function(e){return{actions:Object(d.b)({getPost:I.b,setPostsLoading:I.d},e)}})(Object(m.withStyles)({noLink:{textDecoration:"none",color:"inherit","&:hover":{textDecoration:"none"}}})(R))}}]);
//# sourceMappingURL=4.d7d1dc67.chunk.js.map