(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{172:function(e,a,t){"use strict";var n=t(1);Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return r.default}});var r=n(t(413))},411:function(e,a,t){"use strict";var n=t(0),r=t.n(n),c=t(33),i=t.n(c),l=t(36),o=function(e){var a=e.children,t=e.className;return r.a.createElement(n.Fragment,null,r.a.createElement(l.a,null,r.a.createElement(i.a,{variant:"h2",gutterBottom:!0,className:t},a)),r.a.createElement(l.f,null,r.a.createElement(i.a,{variant:"h3",gutterBottom:!0,className:t},a)),r.a.createElement(l.b,null,r.a.createElement(i.a,{variant:"h4",gutterBottom:!0,className:t},a)))};t.d(a,"a",function(){return o})},412:function(e,a,t){"use strict";var n=t(23),r=t(0),c=t.n(r),i=t(17),l=t(73),o=t(411),s=t(48);var u=Object(i.withStyles)(function(e){var a;return{container:{backgroundColor:e.palette.primary.main},containerInner:{maxWidth:l.a.pageWidthMax},h1:(a={color:e.palette.common.white},Object(n.a)(a,e.breakpoints.up(e.breakpoints.values.sm),{paddingLeft:e.spacing.unit}),Object(n.a)(a,e.breakpoints.up(e.breakpoints.values.md),{paddingLeft:1.5*e.spacing.unit}),Object(n.a)(a,e.breakpoints.up(e.breakpoints.values.lg),{paddingLeft:3*e.spacing.unit}),a)}})(function(e){var a=e.text,t=e.classes;return c.a.createElement("div",{className:t.container},c.a.createElement(s.a,{className:t.containerInner},c.a.createElement(o.a,{className:t.h1},a)))});t.d(a,"a",function(){return u})},413:function(e,a,t){"use strict";var n=t(1);Object.defineProperty(a,"__esModule",{value:!0}),a.default=a.styles=void 0;var r=n(t(9)),c=n(t(3)),i=n(t(5)),l=n(t(0)),o=(n(t(2)),n(t(4))),s=(n(t(8)),t(11),n(t(10))),u={root:{display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},media:{width:"100%"}};a.styles=u;var d=["video","audio","picture","iframe","img"];function m(e){var a=e.classes,t=e.className,n=e.component,s=e.image,u=e.src,m=e.style,p=(0,i.default)(e,["classes","className","component","image","src","style"]),f=-1!==d.indexOf(n),g=!f&&s?(0,c.default)({backgroundImage:'url("'.concat(s,'")')},m):m;return l.default.createElement(n,(0,c.default)({className:(0,o.default)(a.root,(0,r.default)({},a.media,f),t),style:g,src:f?s||u:void 0},p))}m.defaultProps={component:"div"};var p=(0,s.default)(u,{name:"MuiCardMedia"})(m);a.default=p},414:function(e,a,t){"use strict"},459:function(e,a,t){e.exports={containerExtra:"Page_containerExtra__39SuS",card:"Page_card__2wbPB",textCenter:"Page_textCenter__3rO6l",media:"Page_media__1TOHy"}},478:function(e,a,t){"use strict";t.r(a);var n=t(27),r=t(28),c=t(34),i=t(32),l=t(35),o=t(0),s=t.n(o),u=t(49),d=t(29),m=t(33),p=t.n(m),f=t(172),g=t.n(f),v=t(55),b=t.n(v),E=(t(414),t(63)),_=t(48),h=t(21),k=t(65),y=t(412),O=t(459),P=t.n(O),x=function(e){function a(){var e,t;Object(n.a)(this,a);for(var r=arguments.length,l=new Array(r),o=0;o<r;o++)l[o]=arguments[o];return(t=Object(c.a)(this,(e=Object(i.a)(a)).call.apply(e,[this].concat(l)))).backButtonHandler=function(){t.props.history.goBack()},t}return Object(l.a)(a,e),Object(r.a)(a,[{key:"componentDidMount",value:function(){var e=this.props,a=e.actions,t=e.post,n=e.match.params.id;!t&&n&&(a.setPagesLoading(),a.getPage(n))}},{key:"renderNoPage",value:function(){return s.a.createElement(k.a,{textCenter:!1})}},{key:"render",value:function(){var e=this.props,a=e.page,t=e.error;if(e.loading)return s.a.createElement(h.a,{text:"S\xe6ki s\xed\xf0u..."});if(t||!a)return this.renderNoPage();var n=a.content,r=a.title,c=a._embedded,i=null,l=c?c["wp:featuredmedia"]:null;return l&&l[0]&&l[0].media_details&&l[0].media_details.sizes&&(i=l[0].media_details.sizes.full.source_url),s.a.createElement(o.Fragment,null,s.a.createElement(y.a,{text:r.rendered}),s.a.createElement(_.a,{className:P.a.containerExtra},i&&s.a.createElement(g.a,{alt:l[0].alt_text||r.rendered,className:P.a.media,image:i,title:l[0].alt_text||r.rendered}),s.a.createElement("div",null,s.a.createElement(p.a,{component:"article"},s.a.createElement("span",{dangerouslySetInnerHTML:{__html:n.rendered}})),s.a.createElement("div",null,s.a.createElement(b.a,{color:"primary",onClick:this.backButtonHandler},"Til baka")))))}}]),a}(o.PureComponent);a.default=Object(u.b)(function(e){var a=e.pages;return{page:a.page,error:a.error,loading:a.loading}},function(e){return{actions:Object(d.b)({getPage:E.b,setPagesLoading:E.d},e)}})(x)}}]);
//# sourceMappingURL=7.b7cd29c3.chunk.js.map