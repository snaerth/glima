(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{172:function(e,t,a){"use strict";var n=a(1);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r.default}});var r=n(a(413))},413:function(e,t,a){"use strict";var n=a(1);Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.styles=void 0;var r=n(a(9)),o=n(a(3)),c=n(a(5)),l=n(a(0)),i=(n(a(2)),n(a(4))),s=(n(a(8)),a(11),n(a(10))),u={root:{display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},media:{width:"100%"}};t.styles=u;var d=["video","audio","picture","iframe","img"];function m(e){var t=e.classes,a=e.className,n=e.component,s=e.image,u=e.src,m=e.style,f=(0,c.default)(e,["classes","className","component","image","src","style"]),p=-1!==d.indexOf(n),v=!p&&s?(0,o.default)({backgroundImage:'url("'.concat(s,'")')},m):m;return l.default.createElement(n,(0,o.default)({className:(0,i.default)(t.root,(0,r.default)({},t.media,p),a),style:v,src:p?s||u:void 0},f))}m.defaultProps={component:"div"};var f=(0,s.default)(u,{name:"MuiCardMedia"})(m);t.default=f},414:function(e,t,a){"use strict"},415:function(e,t,a){"use strict";a.d(t,"a",function(){return i});var n=a(0),r=a.n(n);function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}var c=r.a.createElement("path",{d:"M2 5.077S2 2 5.077 2h13.846S22 2 22 5.077v13.846S22 22 18.923 22H5.077S2 22 2 18.923V5.077z","data-st":"fill:#1565C0;;",fill:"#1565c0"}),l=r.a.createElement("path",{d:"M12.75 8.625c0-.613.24-1.125 1.125-1.125H15V5.25h-1.875c-2.25 0-3 .75-3 3v1.5h-1.5V12h1.5v6.75h2.625V12h1.875L15 9.75h-2.25V8.625z",fillRule:"evenodd",clipRule:"evenodd",fill:"#fff"}),i=function(e){return r.a.createElement("svg",o({width:24,height:24,viewBox:"0 0 24 24",preserveAspectRatio:"none"},e),c,l)};a.p},417:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(175),c=a.n(o),l=function(e){var t=e.children,a=e.title;return r.a.createElement(c.a,{placement:"top",title:a,interactive:!0},t)};a.d(t,"a",function(){return l})},451:function(e,t,a){e.exports={containerExtra:"Post_containerExtra__2ObH_",card:"Post_card__2Tqwa",textCenter:"Post_textCenter__3GdgC",bigAvatar:"Post_bigAvatar__3yXMA",author:"Post_author__3jYxV",media:"Post_media__Y9hAS",facebookIcon:"Post_facebookIcon__AnKct",buttonsContainer:"Post_buttonsContainer__2aJ3K"}},487:function(e,t,a){"use strict";a.r(t);var n=a(27),r=a(28),o=a(34),c=a(32),l=a(35),i=a(0),s=a.n(i),u=a(49),d=a(29),m=a(17),f=a(33),p=a.n(f),v=a(172),h=a.n(v),b=a(67),_=a.n(b),g=a(42),E=a.n(g),y=a(174),k=a.n(y),P=a(43),w=a.n(P),x=a(173),O=a.n(x),j=a(55),N=a.n(j),C=(a(414),a(124));var A=a(125),M=a(48),S=a(21),V=a(417),z=a(65),H=a(415),I=a(451),L=a.n(I),B=function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,l=new Array(r),i=0;i<r;i++)l[i]=arguments[i];return(a=Object(o.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(l)))).backButtonHandler=function(){a.props.history.goBack()},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.actions,a=e.post,n=e.match.params.id;!a&&n&&(t.setPostsLoading(),t.getPost(n))}},{key:"renderNoPost",value:function(){return s.a.createElement(z.a,{textCenter:!1,text:"Vi\xf0 fundum enga fr\xe9tt \xe1 \xfeessum hlekk."})}},{key:"render",value:function(){var e=this.props,t=e.post,a=e.error,n=e.loading,r=e.classes;if(n)return s.a.createElement(S.a,{text:"S\xe6ki fr\xe9tt..."});if(a||!t)return this.renderNoPost();var o=t.content,c=t.title,l=t.date,i=t._embedded,u=null,d=i?i["wp:featuredmedia"]:null;d&&d[0]&&d[0].media_details&&d[0].media_details.sizes&&(u=d[0].media_details.sizes.full.source_url);var m,f=i.author[0];return s.a.createElement(M.a,{className:L.a.containerExtra},u&&s.a.createElement(h.a,{alt:d[0].alt_text||c.rendered,className:L.a.media,image:u,title:d[0].alt_text||c.rendered}),s.a.createElement("h2",{className:L.a.title},c.rendered),s.a.createElement("div",null,s.a.createElement(_.a,{className:L.a.author},s.a.createElement(E.a,null,s.a.createElement(V.a,{interactive:!0,open:!0,title:s.a.createElement(E.a,{alignItems:"flex-start"},s.a.createElement(k.a,null,s.a.createElement(O.a,{alt:f.name,src:f.avatar_urls[96],className:L.a.bigAvatar})),s.a.createElement(w.a,{primary:f.name,secondary:f.description}))},s.a.createElement(O.a,{alt:f.name,src:f.avatar_urls[96],className:L.a.bigAvatar})),s.a.createElement(w.a,{primary:(m=f.name,m.charAt(0).toUpperCase()+m.slice(1)),secondary:Object(C.a)(l)}))),s.a.createElement(p.a,{component:"article"},s.a.createElement("span",{dangerouslySetInnerHTML:{__html:o.rendered}})),s.a.createElement("div",{className:L.a.buttonsContainer},s.a.createElement(N.a,{color:"primary",onClick:this.backButtonHandler},"Til baka"),s.a.createElement("a",{href:"https://www.facebook.com/sharer/sharer.php?u=https://www.glima.is/frett/".concat(t.slug,"/").concat(t.id),target:"_blank",rel:"noopener noreferrer",className:r.noLink},s.a.createElement(N.a,{size:"small",color:"primary"},s.a.createElement(H.a,{className:L.a.facebookIcon})," Deila \xe1 Facebook")))))}}]),t}(i.PureComponent);t.default=Object(u.b)(function(e){var t=e.blog;return{post:t.post,error:t.error,loading:t.loading}},function(e){return{actions:Object(d.b)({getPost:A.b,setPostsLoading:A.d},e)}})(Object(m.withStyles)({noLink:{textDecoration:"none",color:"inherit","&:hover":{textDecoration:"none"}}})(B))}}]);
//# sourceMappingURL=4.837db867.chunk.js.map