/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
"use strict";var __extends=this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);r.prototype=t.prototype,e.prototype=new r};define("vs/languages/vsxml/vsxml",["require","exports","vs/base/objects","vs/base/errors","vs/editor/modes/modesExtensions"],function(e,t,r,n,s){var a='<>"=/',o="	 ",i=r.createKeywordMatcher(["summary","reference","returns","param","loc"]),l=r.createKeywordMatcher(["type","path","name","locid","filename","format","optional"]),c=r.createKeywordMatcher(a.split("")),u=function(e){function t(t,r,n){e.call(this,t),this.state=r,this.parentState=n}return __extends(t,e),t.prototype.getParentState=function(){return this.parentState},t.prototype.makeClone=function(){return new t(this.getMode(),s.safeStateClone(this.state),s.safeStateClone(this.parentState))},t.prototype.equals=function(r){return r instanceof t?e.prototype.equals.call(this,r)&&s.safeStateEquals(this.state,r.state)&&s.safeStateEquals(this.parentState,r.parentState):!1},t.prototype.setState=function(e){this.state=e},t.prototype.postTokenize=function(e){return e},t.prototype.tokenize=function(e){var t=this.state.tokenize(e);return void 0!==t.nextState&&this.setState(t.nextState),t.nextState=this,this.postTokenize(t,e)},t}(s.AbstractState);t.EmbeddedState=u;var d=function(e){function t(t,r,n){e.call(this,t,r,n)}return __extends(t,e),t.prototype.equals=function(r){return r instanceof t?e.prototype.equals.call(this,r):!1},t.prototype.setState=function(t){e.prototype.setState.call(this,t),this.getParentState().setVSXMLState(t)},t.prototype.postTokenize=function(e,t){return t.eos()&&(e.nextState=this.getParentState()),e},t}(u);t.VSXMLEmbeddedState=d;var p=function(e){function t(t,r,n,s){void 0===s&&(s=""),e.call(this,t),this.name=r,this.parent=n,this.whitespaceTokenType=s}return __extends(t,e),t.prototype.equals=function(r){return r instanceof t?e.prototype.equals.call(this,r)&&this.whitespaceTokenType===r.whitespaceTokenType&&this.name===r.name&&s.safeStateEquals(this.parent,r.parent):!1},t.prototype.tokenize=function(e){return e.setTokenRules(a,o),e.skipWhitespace().length>0?{type:this.whitespaceTokenType}:this.stateTokenize(e)},t.prototype.stateTokenize=function(){throw n.notImplemented()},t}(s.AbstractState);t.VSXMLState=p;var m=function(e){function t(t,r){e.call(this,t,"string",r,"attribute.value.vs")}return __extends(t,e),t.prototype.makeClone=function(){return new t(this.getMode(),this.parent?this.parent.clone():null)},t.prototype.equals=function(r){return r instanceof t?e.prototype.equals.call(this,r):!1},t.prototype.stateTokenize=function(e){for(;!e.eos();){var t=e.nextToken();if('"'===t)return{type:"attribute.value.vs",nextState:this.parent}}return{type:"attribute.value.vs",nextState:this.parent}},t}(p);t.VSXMLString=m;var h=function(e){function t(t,r){e.call(this,t,"expression",r,"vs")}return __extends(t,e),t.prototype.makeClone=function(){return new t(this.getMode(),this.parent?this.parent.clone():null)},t.prototype.equals=function(r){return r instanceof t?e.prototype.equals.call(this,r):!1},t.prototype.stateTokenize=function(e){var t=e.nextToken(),r=this.whitespaceTokenType;return">"===t?{type:"delimiter.vs",nextState:this.parent}:'"'===t?{type:"attribute.value.vs",nextState:new m(this.getMode(),this)}:(i(t)?r="tag.vs":l(t)?r="attribute.name.vs":c(t)&&(r="delimiter.vs"),{type:r,nextState:this})},t}(p);t.VSXMLTag=h;var f=function(e){function t(t,r){e.call(this,t,"expression",r,"vs")}return __extends(t,e),t.prototype.makeClone=function(){return new t(this.getMode(),this.parent?this.parent.clone():null)},t.prototype.equals=function(r){return r instanceof t?e.prototype.equals.call(this,r):!1},t.prototype.stateTokenize=function(e){var t=e.nextToken();return"<"===t?{type:"delimiter.vs",nextState:new h(this.getMode(),this)}:{type:this.whitespaceTokenType,nextState:this}},t}(p);t.VSXMLExpression=f});