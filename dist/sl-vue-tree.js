!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.SlVueTree=t():e.SlVueTree=t()}(window,function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function i(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}n.r(t);var r={name:"sl-vue-tree",props:{value:{type:Array,default:function(){return[]}},edgeSize:{type:Number,default:3},showBranches:{type:Boolean,default:!1},level:{type:Number,default:0},parentInd:{type:Number},allowMultiselect:{type:Boolean,default:!0},allowToggleBranch:{type:Boolean,default:!0},multiselectKey:{type:[String,Array],default:function(){return["ctrlKey","metaKey"]},validator:function(e){var t=["ctrlKey","metaKey","altKey"],n=Array.isArray(e)?e:[e];return!!(n=n.filter(function(e){return-1!==t.indexOf(e)})).length}},scrollAreaHeight:{type:Number,default:70},maxScrollSpeed:{type:Number,default:20}},data:function(){return{rootCursorPosition:null,scrollIntervalId:0,scrollSpeed:0,lastSelectedNode:null,mouseIsDown:!1,isDragging:!1,lastMousePos:{x:0,y:0},preventDrag:!1,currentValue:this.value}},mounted:function(){this.isRoot&&document.addEventListener("mouseup",this.onDocumentMouseupHandler)},beforeDestroy:function(){document.removeEventListener("mouseup",this.onDocumentMouseupHandler)},watch:{value:function(e){this.currentValue=e}},computed:{cursorPosition:function(){return this.isRoot?this.rootCursorPosition:this.getParent().cursorPosition},nodes:function(){if(this.isRoot){var e=this.copy(this.currentValue);return this.getNodes(e)}return this.getParent().nodes[this.parentInd].children},gaps:function(){var e=[],t=this.level-1;for(this.showBranches||t++;t-- >0;)e.push(t);return e},isRoot:function(){return!this.level},selectionSize:function(){return this.getSelected().length},dragSize:function(){return this.getDraggable().length}},methods:{setCursorPosition:function(e){this.isRoot?this.rootCursorPosition=e:this.getParent().setCursorPosition(e)},getNodes:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return e.map(function(r,o){var s=n.concat(o);return t.getNode(s,r,e,i)})},getNode:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,r=e.slice(-1)[0];if(n=n||this.getNodeSiblings(this.currentValue,e),t=t||n&&n[r]||null,null==i&&(i=this.isVisible(e)),!t)return null;var o=void 0==t.isExpanded||!!t.isExpanded,s=void 0==t.isDraggable||!!t.isDraggable,l=void 0==t.isSelectable||!!t.isSelectable;return{title:t.title,isLeaf:!!t.isLeaf,children:t.children?this.getNodes(t.children,e,o):[],isSelected:!!t.isSelected,isExpanded:o,isVisible:i,isDraggable:s,isSelectable:l,data:void 0!==t.data?t.data:{},path:e,pathStr:JSON.stringify(e),level:e.length,ind:r,isFirstChild:0==r,isLastChild:r===n.length-1}},isVisible:function(e){if(e.length<2)return!0;for(var t=this.currentValue,n=0;n<e.length-1;n++){var i=t[e[n]];if(!(void 0==i.isExpanded||!!i.isExpanded))return!1;t=i.children}return!0},emitInput:function(e){this.currentValue=e,this.getRoot().$emit("input",e)},emitSelect:function(e,t){this.getRoot().$emit("select",e,t)},emitBeforeDrop:function(e,t,n){this.getRoot().$emit("beforedrop",e,t,n)},emitDrop:function(e,t,n){this.getRoot().$emit("drop",e,t,n)},emitToggle:function(e,t){this.getRoot().$emit("toggle",e,t)},emitNodeClick:function(e,t){this.getRoot().$emit("nodeclick",e,t)},emitNodeDblclick:function(e,t){this.getRoot().$emit("nodedblclick",e,t)},emitNodeContextmenu:function(e,t){this.getRoot().$emit("nodecontextmenu",e,t)},onExternalDragoverHandler:function(e,t){t.preventDefault();var n=this.getRoot(),i=n.getCursorPositionFromCoords(t.clientX,t.clientY);n.setCursorPosition(i),n.$emit("externaldragover",i,t)},onExternalDropHandler:function(e,t){var n=this.getRoot(),i=n.getCursorPositionFromCoords(t.clientX,t.clientY);n.$emit("externaldrop",i,t),this.setCursorPosition(null)},select:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=Array.isArray(this.multiselectKey)?this.multiselectKey:[this.multiselectKey],o=i&&!!r.find(function(e){return i[e]});n=(o||n)&&this.allowMultiselect;var s=this.getNode(e);if(!s)return null;var l=this.copy(this.currentValue),a=this.allowMultiselect&&i&&i.shiftKey&&this.lastSelectedNode,u=[],c=!1;return this.traverse(function(e,i){a?(e.pathStr!==s.pathStr&&e.pathStr!==t.lastSelectedNode.pathStr||(i.isSelected=e.isSelectable,c=!c),c&&(i.isSelected=e.isSelectable)):e.pathStr===s.pathStr?i.isSelected=e.isSelectable:n||i.isSelected&&(i.isSelected=!1),i.isSelected&&u.push(e)},l),this.lastSelectedNode=s,this.emitInput(l),this.emitSelect(u,i),s},onMousemoveHandler:function(e){if(this.isRoot){if(!this.preventDrag){var t=this.isDragging,n=this.isDragging||this.mouseIsDown&&(this.lastMousePos.x!==e.clientX||this.lastMousePos.y!==e.clientY),i=!1===t&&!0===n;if(this.lastMousePos={x:e.clientX,y:e.clientY},n){var r=this.getRoot().$el,o=r.getBoundingClientRect(),s=this.$refs.dragInfo,l=e.clientY-o.top+r.scrollTop-(0|s.style.marginBottom),a=e.clientX-o.left;s.style.top=l+"px",s.style.left=a+"px";var u=this.getCursorPositionFromCoords(e.clientX,e.clientY),c=u.node,d=u.placement;if(i&&!c.isSelected&&this.select(c.path,!1,e),this.getDraggable().length){this.isDragging=n,this.setCursorPosition({node:c,placement:d});var h=o.bottom-this.scrollAreaHeight,f=(e.clientY-h)/(o.bottom-h),g=o.top+this.scrollAreaHeight,p=(g-e.clientY)/(g-o.top);f>0?this.startScroll(f):p>0?this.startScroll(-p):this.stopScroll()}else this.preventDrag=!0}}}else this.getRoot().onMousemoveHandler(e)},getCursorPositionFromCoords:function(e,t){var n,i,r=document.elementFromPoint(e,t),o=r.getAttribute("path")?r:this.getClosetElementWithPath(r);if(o){if(!o)return;n=this.getNode(JSON.parse(o.getAttribute("path")));var s=o.offsetHeight,l=this.edgeSize,a=t-o.getBoundingClientRect().top;i=n.isLeaf?a>=s/2?"after":"before":a<=l?"before":a>=s-l?"after":"inside"}else{var u=this.getRoot().$el.getBoundingClientRect();t>u.top+u.height/2?(i="after",n=this.getLastNode()):(i="before",n=this.getFirstNode())}return{node:n,placement:i}},getClosetElementWithPath:function(e){return e?e.getAttribute("path")?e:this.getClosetElementWithPath(e.parentElement):null},onMouseleaveHandler:function(e){if(this.isRoot&&this.isDragging){var t=this.getRoot().$el.getBoundingClientRect();e.clientY>=t.bottom?this.setCursorPosition({node:this.nodes.slice(-1)[0],placement:"after"}):e.clientY<t.top&&this.setCursorPosition({node:this.getFirstNode(),placement:"before"})}},getNodeEl:function(e){this.getRoot().$el.querySelector('[path="'.concat(JSON.stringify(e),'"]'))},getLastNode:function(){var e=null;return this.traverse(function(t){e=t}),e},getFirstNode:function(){return this.getNode([0])},getNextNode:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=null;return this.traverse(function(r){if(!(t.comparePaths(r.path,e)<1))return!n||n(r)?(i=r,!1):void 0}),i},getPrevNode:function(e,t){var n=this,i=[];this.traverse(function(t){if(n.comparePaths(t.path,e)>=0)return!1;i.push(t)});for(var r=i.length;r--;){var o=i[r];if(!t||t(o))return o}return null},comparePaths:function(e,t){for(var n=0;n<e.length;n++){if(void 0==t[n])return 1;if(e[n]>t[n])return 1;if(e[n]<t[n])return-1}return void 0==t[e.length]?0:-1},onNodeMousedownHandler:function(e,t){0===e.button&&(this.isRoot?this.mouseIsDown=!0:this.getRoot().onNodeMousedownHandler(e,t))},startScroll:function(e){var t=this,n=this.getRoot().$el;this.scrollSpeed!==e&&(this.scrollIntervalId&&this.stopScroll(),this.scrollSpeed=e,this.scrollIntervalId=setInterval(function(){n.scrollTop+=t.maxScrollSpeed*e},20))},stopScroll:function(){clearInterval(this.scrollIntervalId),this.scrollIntervalId=0,this.scrollSpeed=0},onDocumentMouseupHandler:function(e){this.isDragging&&this.onNodeMouseupHandler(e)},onNodeMouseupHandler:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(0===e.button)if(this.isRoot)if(this.mouseIsDown=!1,this.isDragging||!t||this.preventDrag||this.select(t.path,!1,e),this.preventDrag=!1,this.cursorPosition){var n=this.getDraggable(),i=!0,r=!1,o=void 0;try{for(var s,l=n[Symbol.iterator]();!(i=(s=l.next()).done);i=!0){var a=s.value;if(a.pathStr==this.cursorPosition.node.pathStr)return void this.stopDrag();if(this.checkNodeIsParent(a,this.cursorPosition.node))return void this.stopDrag()}}catch(e){r=!0,o=e}finally{try{i||null==l.return||l.return()}finally{if(r)throw o}}var u=this.copy(this.currentValue),c=[],d=!0,h=!1,f=void 0;try{for(var g,p=n[Symbol.iterator]();!(d=(g=p.next()).done);d=!0){var v=g.value,m=this.getNodeSiblings(u,v.path)[v.ind];c.push(m)}}catch(e){h=!0,f=e}finally{try{d||null==p.return||p.return()}finally{if(h)throw f}}var S=!1;if(this.emitBeforeDrop(n,this.cursorPosition,function(){return S=!0}),S)this.stopDrag();else{for(var y=[],b=0;b<c.length;b++){var _=c[b];y.push(this.copy(_)),_._markToDelete=!0}this.insertModels(this.cursorPosition,y,u),this.traverseModels(function(e,t,n){e._markToDelete&&t.splice(n,1)},u),this.lastSelectedNode=null,this.emitInput(u),this.emitDrop(n,this.cursorPosition,e),this.stopDrag()}}else this.stopDrag();else this.getRoot().onNodeMouseupHandler(e,t)},onToggleHandler:function(e,t){this.allowToggleBranch&&(this.updateNode(t.path,{isExpanded:!t.isExpanded}),this.emitToggle(t,e),e.stopPropagation())},stopDrag:function(){this.isDragging=!1,this.mouseIsDown=!1,this.setCursorPosition(null),this.stopScroll()},getParent:function(){return this.$parent},getRoot:function(){return this.isRoot?this:this.getParent().getRoot()},getNodeSiblings:function(e,t){return 1===t.length?e:this.getNodeSiblings(e[t[0]].children,t.slice(1))},updateNode:function(e,t){if(this.isRoot){var n=JSON.stringify(e),i=this.copy(this.currentValue);this.traverse(function(e,i){e.pathStr===n&&Object.assign(i,t)},i),this.emitInput(i)}else this.getParent().updateNode(e,t)},getSelected:function(){var e=[];return this.traverse(function(t){t.isSelected&&e.push(t)}),e},getDraggable:function(){var e=[];return this.traverse(function(t){t.isSelected&&t.isDraggable&&e.push(t)}),e},traverse:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];t||(t=this.currentValue);for(var i=!1,r=[],o=0;o<t.length;o++){var s=t[o],l=n.concat(o),a=this.getNode(l,s,t);if(i=!1===e(a,s,t),r.push(a),i)break;if(s.children&&(i=!1===this.traverse(e,s.children,l)))break}return!i&&r},traverseModels:function(e,t){for(var n=t.length;n--;){var i=t[n];i.children&&this.traverseModels(e,i.children),e(i,t,n)}return t},remove:function(e){var t=e.map(function(e){return JSON.stringify(e)}),n=this.copy(this.currentValue);this.traverse(function(e,n,i){var r=!0,o=!1,s=void 0;try{for(var l,a=t[Symbol.iterator]();!(r=(l=a.next()).done);r=!0){var u=l.value;e.pathStr===u&&(n._markToDelete=!0)}}catch(e){o=!0,s=e}finally{try{r||null==a.return||a.return()}finally{if(o)throw s}}},n),this.traverseModels(function(e,t,n){e._markToDelete&&t.splice(n,1)},n),this.emitInput(n)},insertModels:function(e,t,n){var r=e.node,o=this.getNodeSiblings(n,r.path),s=o[r.ind];if("inside"===e.placement){var l;s.children=s.children||[],(l=s.children).unshift.apply(l,i(t))}else{var a="before"===e.placement?r.ind:r.ind+1;o.splice.apply(o,[a,0].concat(i(t)))}},insert:function(e,t){var n=Array.isArray(t)?t:[t],i=this.copy(this.currentValue);this.insertModels(e,n,i),this.emitInput(i)},checkNodeIsParent:function(e,t){var n=t.path;return JSON.stringify(n.slice(0,e.path.length))==e.pathStr},copy:function(e){return JSON.parse(JSON.stringify(e))}}},o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"sl-vue-tree",class:{"sl-vue-tree-root":e.isRoot},on:{mousemove:e.onMousemoveHandler,mouseleave:e.onMouseleaveHandler,dragend:function(t){e.onDragendHandler(null,t)}}},[n("div",{ref:"nodes",staticClass:"sl-vue-tree-nodes-list"},[e._l(e.nodes,function(t,i){return n("div",{staticClass:"sl-vue-tree-node",class:{"sl-vue-tree-selected":t.isSelected}},[n("div",{staticClass:"sl-vue-tree-cursor sl-vue-tree-cursor_before",style:{visibility:e.cursorPosition&&e.cursorPosition.node.pathStr===t.pathStr&&"before"===e.cursorPosition.placement?"visible":"hidden"},on:{dragover:function(e){e.preventDefault()}}}),e._v(" "),n("div",{staticClass:"sl-vue-tree-node-item",class:{"sl-vue-tree-cursor-hover":e.cursorPosition&&e.cursorPosition.node.pathStr===t.pathStr,"sl-vue-tree-cursor-inside":e.cursorPosition&&"inside"===e.cursorPosition.placement&&e.cursorPosition.node.pathStr===t.pathStr,"sl-vue-tree-node-is-leaf":t.isLeaf,"sl-vue-tree-node-is-folder":!t.isLeaf},attrs:{path:t.pathStr},on:{mousedown:function(n){e.onNodeMousedownHandler(n,t)},mouseup:function(n){e.onNodeMouseupHandler(n,t)},contextmenu:function(n){e.emitNodeContextmenu(t,n)},dblclick:function(n){e.emitNodeDblclick(t,n)},click:function(n){e.emitNodeClick(t,n)},dragover:function(n){e.onExternalDragoverHandler(t,n)},drop:function(n){e.onExternalDropHandler(t,n)}}},[e._l(e.gaps,function(e){return n("div",{staticClass:"sl-vue-tree-gap"})}),e._v(" "),e.level&&e.showBranches?n("div",{staticClass:"sl-vue-tree-branch"},[e._t("branch",[t.isLastChild?e._e():n("span",[e._v("\n            "+e._s(String.fromCharCode(9500))+e._s(String.fromCharCode(9472))+" \n          ")]),e._v(" "),t.isLastChild?n("span",[e._v("\n            "+e._s(String.fromCharCode(9492))+e._s(String.fromCharCode(9472))+" \n          ")]):e._e()],{node:t})],2):e._e(),e._v(" "),n("div",{staticClass:"sl-vue-tree-title"},[t.isLeaf?e._e():n("span",{staticClass:"sl-vue-tree-toggle",on:{click:function(n){e.onToggleHandler(n,t)}}},[e._t("toggle",[n("span",[e._v("\n             "+e._s(t.isLeaf?"":t.isExpanded?"-":"+")+"\n            ")])],{node:t})],2),e._v(" "),e._t("title",[e._v(e._s(t.title))],{node:t}),e._v(" "),!t.isLeaf&&0==t.children.length&&t.isExpanded?e._t("empty-node",null,{node:t}):e._e()],2),e._v(" "),n("div",{staticClass:"sl-vue-tree-sidebar"},[e._t("sidebar",null,{node:t})],2)],2),e._v(" "),t.children&&t.children.length&&t.isExpanded?n("sl-vue-tree",{attrs:{value:t.children,level:t.level,parentInd:i,allowMultiselect:e.allowMultiselect,allowToggleBranch:e.allowToggleBranch,edgeSize:e.edgeSize,showBranches:e.showBranches},on:{dragover:function(e){e.preventDefault()}},scopedSlots:e._u([{key:"title",fn:function(t){var n=t.node;return[e._t("title",[e._v(e._s(n.title))],{node:n})]}},{key:"toggle",fn:function(t){var i=t.node;return[e._t("toggle",[n("span",[e._v("\n             "+e._s(i.isLeaf?"":i.isExpanded?"-":"+")+"\n          ")])],{node:i})]}},{key:"sidebar",fn:function(t){var n=t.node;return[e._t("sidebar",null,{node:n})]}},{key:"empty-node",fn:function(t){var n=t.node;return[!n.isLeaf&&0==n.children.length&&n.isExpanded?e._t("empty-node",null,{node:n}):e._e()]}}])}):e._e(),e._v(" "),n("div",{staticClass:"sl-vue-tree-cursor sl-vue-tree-cursor_after",style:{visibility:e.cursorPosition&&e.cursorPosition.node.pathStr===t.pathStr&&"after"===e.cursorPosition.placement?"visible":"hidden"},on:{dragover:function(e){e.preventDefault()}}})],1)}),e._v(" "),e.isRoot?n("div",{directives:[{name:"show",rawName:"v-show",value:e.isDragging,expression:"isDragging"}],ref:"dragInfo",staticClass:"sl-vue-tree-drag-info"},[e._t("draginfo",[e._v("\n        Items: "+e._s(e.selectionSize)+"\n      ")])],2):e._e()],2)])};o._withStripped=!0;var s=function(e,t,n,i,r,o,s,l){var a=typeof(e=e||{}).default;"object"!==a&&"function"!==a||(e=e.default);var u,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=n,c._compiled=!0),i&&(c.functional=!0),o&&(c._scopeId=o),s?(u=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(s)},c._ssrRegister=u):r&&(u=l?function(){r.call(this,this.$root.$options.shadowRoot)}:r),u)if(c.functional){c._injectStyles=u;var d=c.render;c.render=function(e,t){return u.call(t),d(e,t)}}else{var h=c.beforeCreate;c.beforeCreate=h?[].concat(h,u):[u]}return{exports:e,options:c}}(r,o,[],!1,null,null,null);s.options.__file="src\\sl-vue-tree.vue";t.default=s.exports}]).default});
//# sourceMappingURL=sl-vue-tree.js.map