/**
 * Manage System v3.0 | haovei@qq.com
 */
define("main/controllers",["main/init"],function(){function e(e){e.mainStatus={navFold:document.body.clientWidth<1500,navigation:"",msgBubble:0},e.pageTo=function(e){window.location.assign(e)},$.getJSON(Config.getMainInfo,function(t){200==t.code&&angular.extend(e.mainStatus,t.data)}).complete(function(){e.$digest()}),$(document).on("click",".top-nav-wrap .backBtn",function(){window.history.back()})}function t(){}function n(e){}function a(e,t){t.close()}e.$inject=["$scope"],n.$inject=["$scope"],a.$inject=["$scope","modal"],angular.module("manageApp.main").controller("mainCtrl",e).controller("oneCtrl",t).controller("sideNav",n).controller("pageCtrl",a)}),define("main/directives",["main/init"],function(){function e(e,t){return{restrict:"A",priority:-500,link:function(n,a){t.remove(e.current.loadedTemplateUrl)}}}function t(e){var t=e("date");return{require:"ngModel",link:function(e,n,a,i){var l=a.convertToDate?a.convertToDate:"yyyy-MM-dd";i.$parsers.push(function(e){return t(e,l)}),i.$formatters.push(function(){return new Date(i.$modelValue)})}}}function n(){return{require:"ngModel",link:function(e,t,n,a){a.$parsers.push(function(e){return parseInt(e,10)}),a.$formatters.push(function(e){return""+e})}}}function a(e,t){return{restrict:"AE",scope:!0,transclude:!0,link:function(n,a,i,l,o){function r(a){n.isLoading=!0,e({method:"POST",url:i.detailsInfo,data:a,transformRequest:function(e){return t(e)},headers:{"Content-Type":"application/x-www-form-urlencoded","X-Requested-With":"XMLHttpRequest"}}).success(function(e,t,a,i){n.isLoading=!1,200==e.code&&(n.detailsHandler?n.details=n.detailsHandler(e.data):n.details=e.data)}).error(function(){n.isLoading=!1})}n.isLoading=!1,o(n,function(e){a.append(e)}),n.detailsHandler=n.$eval(i.detailsHandler),i.$observe("detailsParams",function(e){r(n.$eval(e))}),i.detailsParams||r({})}}}function i(e,t){return{restrict:"A",scope:!0,link:function(n,a,i){var l=n.formStatus={submitted:!1,submitting:!1,submitInfo:""},o=angular.element(a)[0];n.$eval(i.name);n.formData=angular.extend({},n.formData),n.$watch(i.source,function(e){e&&angular.isObject(e)&&angular.extend(n.formData,e)}),n.reset=function(){o.reset()},a.on("submit",function(a){a.preventDefault(),l.submitting=!0,e({method:"POST",url:i.action,data:n.formData,transformRequest:function(e){return t(e)},headers:{"Content-Type":"application/x-www-form-urlencoded","X-Requested-With":"XMLHttpRequest"}}).success(function(e,t,a,i){l.submitting=!1,200==e.code?(l.submitInfo=e.message||"提交成功",angular.isFunction(n.submitCallBack)?n.submitCallBack(e):e.url&&window.location.assign(e.options.url)):(l.submitInfo=e.message||"提交错误",angular.isFunction(n.submitCallBack)&&n.submitCallBack(e))}).error(function(){l.submitting=!1,l.submitInfo="提交失败。"})})}}}function l(e,t,n){return{restrict:"AE",scope:{listParams:"=",listSelected:"=",listSource:"="},transclude:!0,require:"?^ngModel",link:function(a,i,l,o,r){function s(e){return l.listSource?(a.tbodyList=a.listSource,void(e&&e())):(d.isLoading=!0,void $.getJSON(a.listData,angular.merge({},g,{page:d.currentPage}),function(e,t,n,i){200==e.code?(e.options&&(d.totalCount=e.options.totalCount||d.totalCount,d.pageSize=e.options.pageSize||d.pageSize,d.totalPage=Math.ceil(d.totalCount/d.pageSize)),e.data&&e.data.length>0?a.tbodyList=e.data:d.isFinished=!0,d.loadFailMsg=e.message):(d.isFinished=!0,d.loadFailMsg=e.message),d.isLoading=!1}).error(function(){d.isLoading=!1,d.loadFailMsg="加载出错"}).complete(function(){e&&e(),a.$digest(),u()}))}function c(){var e=[];a.listSelected.length=0,$(".selectOne:checked",i).each(function(){e.push(this.value)}),[].unshift.apply(a.listSelected,e);var t=[];angular.forEach(a.tbodyList,function(e){angular.forEach(a.listSelected,function(n){e.id==n&&t.push(e)})}),o&&o.$setViewValue(t)}function u(){$(".selectOne",i).on("click",function(e){e.stopPropagation();var t=$(".selectOne",i).length,n=$(".selectOne:checked",i).length;n>0&&t>n?$(".selectAll",i).prop("checked",!1).get(0).indeterminate=!0:t==n?$(".selectAll",i).prop("checked",!0).get(0).indeterminate=!1:$(".selectAll",i).prop("checked",!1).get(0).indeterminate=!1,c(),a.$apply()})}var d={currentPage:1,totalCount:0,pageSize:10,totalPage:1,isFinished:!1,isLoading:!1};a.parent=a.$parent,a.status=d,a.listData=l.listData,a.theadList=angular.fromJson(l.listThead),a.tbodyList=[],a.getListData=s,angular.isDefined(a.listParams)||(a.listParams={}),angular.isDefined(a.listSelected)||(a.listSelected=[]),a.delSelected=function(e){t("确定删除这些?",function(){$.post(e,{ids:a.listSelected.join(",")},function(e){200==e.code?a.$broadcast("reloadList"):alert(e.message||"删除错误")},"json").error(function(){alert("请求错误")})})},a.deleteThis=function(e){var n=this.tr;t("确定删除?",function(){$.post(e,{},function(e){200==e.code?a.tbodyList.splice(a.tbodyList.indexOf(n),1):alert(e.message||"删除错误")},"json").error(function(){alert("请求错误")}).complete(function(){a.$digest()})})},a.submitCallBack=function(t){200==t.code&&(e.closeAll(),n(function(){a.$broadcast("reloadList")}))};var g={};a.$on("deleteSelected",function(e,t){$(".selectOne[value="+t.id+"]",i).prop("checked",!1);var n=$(".selectOne",i).length,l=$(".selectOne:checked",i).length;l>0&&n>l?$(".selectAll",i).prop("checked",!1).get(0).indeterminate=!0:n==l?$(".selectAll",i).prop("checked",!0).get(0).indeterminate=!1:$(".selectAll",i).prop("checked",!1).get(0).indeterminate=!1;var o=[];a.listSelected.length=0,$(".selectOne:checked",i).each(function(){o.push(this.value)}),[].unshift.apply(a.listSelected,o),c()}),a.$watchCollection("listSource",function(e){e&&s(c)}),a.$watch("listParams",function(){d.currentPage=1,d.isFinished=!1,a.tbodyList=[],g=angular.copy(a.listParams),s(c),$(".selectAll",i).length>0&&($(".selectAll",i).prop("checked",!1).get(0).indeterminate=!1)},!0),a.$on("reloadList",function(){d.currentPage=1,d.isFinished=!1,a.tbodyList=[],g=angular.copy(a.listParams),s(c),$(".selectAll",i).length>0&&($(".selectAll",i).prop("checked",!1).get(0).indeterminate=!1)}),$(i).on("click",".selectAll",function(){this.indeterminate?(this.checked=!1,$(".selectOne",i).prop("checked",!1)):$(".selectOne",i).prop("checked",this.checked),c(),a.$apply()}),r(a,function(e){i.append(e)})}}}function o(){return{restrict:"AE",scope:{row:"="},replace:!0,templateUrl:"tpl/table-cell.html",link:function(e,t,n){e.cells=[],angular.isString(e.row)||angular.isNumber(e.row)?e.cells.push({text:e.row}):angular.isArray(e.row)?angular.forEach(e.row,function(t){angular.isObject(t)?e.cells.push(t):e.cells.push({text:t})}):e.cells.push(e.row)}}}function r(){return{restrict:"AE",scope:!0,replace:!0,templateUrl:"tpl/pagination.html",link:function(e,t,n){function a(e,t,n){return{number:e,text:t,active:n}}function i(e,t){var n=[],i=1,r=t,s=angular.isDefined(l)&&t>l;s&&(o?(i=Math.max(e-Math.floor(l/2),1),r=i+l-1,r>t&&(r=t,i=r-l+1)):(i=(Math.ceil(e/l)-1)*l+1,r=Math.min(i+l-1,t)));for(var c=i;r>=c;c++){var u=a(c,c,c===e);n.push(u)}if(s&&!o){if(i>1){var d=a(i-1,"...",!1);n.unshift(d)}if(t>r){var g=a(r+1,"...",!1);n.push(g)}}return n}var l=angular.isDefined(n.maxSize)?e.$parent.$eval(n.maxSize):10,o=angular.isDefined(n.rotate)?e.$parent.$eval(n.rotate):!0;e.start=function(){1!=e.status.currentPage&&(e.status.currentPage=1,e.getListData())},e.prev=function(){e.status.currentPage<=1||(e.status.currentPage--,e.getListData())},e.next=function(){e.status.currentPage>=e.status.totalPage||(e.status.currentPage++,e.getListData())},e.end=function(){e.status.currentPage!=e.status.totalPage&&(e.status.currentPage=e.status.totalPage,e.getListData())},e["goto"]=function(t){e.status.currentPage=t,e.getListData()},e.$watch("status.totalPage",function(){e.pages=i(e.status.currentPage,e.status.totalPage)}),e.$watch("status.currentPage",function(){e.pages=i(e.status.currentPage,e.status.totalPage)})}}}function s(){return{restrict:"AE",scope:!0,replace:!0,templateUrl:"tpl/pagination2.html",link:function(e,t,n){e.start=function(){1!=e.status.currentPage&&(e.status.currentPage=1,e.getListData())},e.prev=function(){e.status.currentPage<=1||(e.status.currentPage--,e.getListData())},e.next=function(){e.status.currentPage>=e.status.totalPage||(e.status.currentPage++,e.getListData())},e.end=function(){e.status.currentPage!=e.status.totalPage&&(e.status.currentPage=e.status.totalPage,e.getListData())}}}}function c(){return{restrict:"AE",scope:{},transclude:!0,link:function(e,t,n,a,i){function l(){var t={};angular.forEach(e.filterConditions.list,function(e){t[e.type]=e.id}),e.filterParams=t}e.filterParams={},e.filterConditions={list:[]};var o=e.filterConditions;e.conditionList={},e.selectCondition=function(e,t){t.type=e,o[e]=t,o.list.push(t),l()},e.deleteCondition=function(e){var t=o.list.indexOf(e);o.list.splice(t,1),delete o[e.type],l()},n.filterConditions&&!function(){$.getJSON(n.filterConditions,{},function(t){200==t.code&&(e.conditionList=t.data)}).complete(function(){e.$digest()})}(),i(e,function(e){t.append(e)})}}}function u(e,t){return{restrict:"AE",scope:{},require:"?^ngModel",templateUrl:"tpl/tree.html",link:function(n,a,i,l){n.status={},n.treeList=[],n.curTree1={},n.curTree2={},n.curTree3={},n.status.isLoading=!0,n.selectTree1=function(e){n.curTree1=e},n.selectTree2=function(e){n.curTree2=e;var a=t("filter")(n.treeList,{pid:e.id},e);if(a.length<1){var i=angular.copy(e);i.p=n.curTree1,l&&l.$setViewValue(i)}},n.selectTree3=function(e){n.curTree3=e;var t=angular.copy(e);t.p=n.curTree2,t.p2=n.curTree1,l&&l.$setViewValue(t)},e({method:"POST",url:i.treeList}).success(function(e,t,a,i){200==e.code&&(n.treeList=e.data),n.status.isLoading=!1}).error(function(){n.status.isLoading=!1})}}}function d(e,t){return{restrict:"AE",scope:!0,transclude:!0,require:"?^ngModel",link:function(n,a,i,l,o){function r(a){return i.listSource?(n.tbodyList=n.listSource,void(a&&a())):(s.isLoading=!0,void e({method:"POST",url:i.navList,transformRequest:function(e){return t(e)},headers:{"Content-Type":"application/x-www-form-urlencoded","X-Requested-With":"XMLHttpRequest"}}).success(function(e,t,a,i){n.isLoading=!1,200==e.code&&(n.listData=e.data,n.select(n.listData[0]))}).error(function(){n.isLoading=!1}))}o(n,function(e){a.append(e)});var s={isLoading:!0};n.status=s,n.currentSelect={};n.select=function(e){n.currentSelect=e,l&&l.$setViewValue(e)},r()}}}function g(){return{restrict:"A",scope:{},require:"?^ngModel",link:function(e,t,n,a){$.post(n.selectAsync,{},function(e){if(200==e.code){for(var n='<option value="">请选择</option>',i=e.data.length,l=0;i>l;l++)n+='<option value="'+e.data[l].value+'"'+(a.$viewValue==e.data[l].value?"selected":"")+">"+e.data[l].text+"</option>";t.html(n)}},"json").complete(function(){e.$digest()})}}}function p(e){return{restrict:"A",scope:{},link:function(t,n,a){function i(e){$.post(o,e,function(e){if(200==e.code){for(var t=r?"":'<option value="">请选择</option>',a=e.data.length,i=0;a>i;i++)t+="<option "+(0===e.data[i].enabled?' class="text-muted"':"")+' value="'+e.data[i].value+'" '+(e.data[i].selected||r&&0==i?"selected":"")+">"+e.data[i].text+"</option>";n.html(t),n.trigger("change")}},"json")}var l=a.relativeTo,o=a.relativeSelect,r=angular.isDefined(a.selectFirst);n.on("change",function(){var e={};e[this.name]=this.value,$(l).trigger("update",e)}),n.on("update",function(e,t){i(t)}),a.relativeInitload&&e(function(){n.trigger("change")})}}}function f(e){return{restrict:"A",scope:{clickToUrl:"="},require:"?^ngModel",link:function(t,n,a,i){require(["echarts"],function(l){function o(){r.resize()}var r=l.init(n[0]);$(window).on("resize",o),t.$on("$destroy",function(){$(window).off("resize",o),r.dispose()}),r.showLoading(),r.on("click",function(e){i&&i.$setViewValue(e.data),t.clickToUrl&&window.location.assign(t.clickToUrl)}),e.get(a.chart,{headers:{"X-Requested-With":"XMLHttpRequest"}}).success(function(e){r.hideLoading(),200==e.code&&r.setOption(e.data)}).error(function(){r.hideLoading()})})}}}function m(e,t,n,a){return{restrict:"EA",scope:{placeholder:"@placeholder",selectedItem:"=selectedItem",url:"@url",titleField:"@titleField",descriptionField:"@descriptionField",searchFields:"@searchfields",matchClass:"@matchclass"},require:"?^ngModel",templateUrl:"tpl/autocomplete.html",link:function(e,i,l,o){e.lastSearchTerm=null,e.currentIndex=null,e.justChanged=!1,e.searchTimer=null,e.hideTimer=null,e.searching=!1,e.pause=300,e.minLength=1,e.searchStr=null;var r=function(t,n){return t.length>=e.minLength&&t!=n};e.processResults=function(t,a){if(t&&t.length>0){e.results=[];var i=[];e.titleField&&""!=e.titleField&&(i=e.titleField.split(","));for(var l=0;l<t.length;l++){for(var o=[],r=0;r<i.length;r++)o.push(t[l][i[r]]);var s="";e.descriptionField&&(s=t[l][e.descriptionField]);var c=o.join(" ");if(e.matchClass){var u=new RegExp(a,"i"),d=c.match(u)[0];c=n.trustAsHtml(c.replace(u,'<span class="'+e.matchClass+'">'+d+"</span>"))}var g={id:t[l].id,title:c,description:s,originalObject:t[l]};e.results[e.results.length]=g}}else e.results=[]},e.searchTimerComplete=function(n){if(n.length>=e.minLength)if(e.localData){for(var a=e.searchFields.split(","),i=[],l=0;l<e.localData.length;l++){for(var o=!1,r=0;r<a.length;r++)o=o||"string"==typeof e.localData[l][a[r]]&&"string"==typeof n&&e.localData[l][a[r]].toLowerCase().indexOf(n.toLowerCase())>=0;o&&(i[i.length]=e.localData[l])}e.searching=!1,e.processResults(i,n)}else t.get(e.url+n,{}).success(function(t,a,i,l){e.searching=!1,200==t.code&&e.processResults(t.data,n)}).error(function(e,t,n,a){console.log("error")})},e.hideResults=function(){e.hideTimer=a(function(){e.showDropdown=!1},e.pause)},e.resetHideResults=function(){e.hideTimer&&a.cancel(e.hideTimer)},e.hoverRow=function(t){e.currentIndex=t},e.keyPressed=function(t){38!=t.which&&40!=t.which&&13!=t.which?e.searchStr&&""!=e.searchStr?r(e.searchStr,e.lastSearchTerm)&&(e.lastSearchTerm=e.searchStr,e.showDropdown=!0,e.currentIndex=-1,e.results=[],e.searchTimer&&a.cancel(e.searchTimer),e.searching=!0,e.searchTimer=a(function(){e.searchTimerComplete(e.searchStr)},e.pause)):(e.showDropdown=!1,e.lastSearchTerm=null):t.preventDefault()},e.selectResult=function(t){e.matchClass&&(t.title=t.title.toString().replace(/(<([^>]+)>)/gi,"")),e.searchStr=e.lastSearchTerm=t.title,e.selectedItem=t,e.showDropdown=!1,e.results=[],o&&o.$setViewValue(t.id)};var s=i.find("input");s.on("keyup",e.keyPressed),i.on("keyup",function(t){40===t.which?(e.results&&e.currentIndex+1<e.results.length&&(e.currentIndex++,e.$apply(),t.preventDefault,t.stopPropagation()),e.$apply()):38==t.which?e.currentIndex>=1&&(e.currentIndex--,e.$apply(),t.preventDefault,t.stopPropagation()):13==t.which?e.results&&e.currentIndex>=0&&e.currentIndex<e.results.length?(e.selectResult(e.results[e.currentIndex]),e.$apply(),t.preventDefault,t.stopPropagation()):(e.results=[],e.$apply(),t.preventDefault,t.stopPropagation()):27==t.which?(e.results=[],e.showDropdown=!1,e.$apply()):8==t.which&&(e.selectedItem=null,e.$apply())})}}}function h(){return{restrict:"A",scope:{checkboxGroup:"="},link:function(e,t,n){angular.isArray(e.checkboxGroup)||(e.checkboxGroup=[]),t.on("click",function(){var a=e.checkboxGroup.indexOf(n.value);t[0].checked?-1===a&&e.checkboxGroup.push(n.value):-1!==a&&e.checkboxGroup.splice(a,1),e.$apply()}),e.$watchCollection("checkboxGroup",function(a){a&&-1!==e.checkboxGroup.indexOf(n.value)&&(t[0].checked=!0)})}}}function v(){return{restrict:"A",scope:{chosen:"="},require:"?^ngModel",link:function(e,t,n,a){require(["chosen"],function(){n.selectSource?$.post(n.selectSource,{},function(n){if(200==n.code){for(var i="",l=n.data.length,o=0;l>o;o++)i+='<option value="'+n.data[o].value+'"'+(a.$viewValue==n.data[o].value?"selected":"")+">"+n.data[o].text+"</option>";t.html(i),t.chosen(e.chosen||{no_results_text:"没有找到"})}},"json").complete(function(){e.$digest()}):t.chosen(e.chosen||{no_results_text:"没有找到"})})}}}e.$inject=["$route","$templateCache"],t.$inject=["$filter"],n.$inject=[],a.$inject=["$http","$httpParamSerializer"],i.$inject=["$http","$httpParamSerializer"],l.$inject=["modal","dialogConfirm","$timeout"],u.$inject=["$http","$filter"],d.$inject=["$http","$httpParamSerializer"],g.$inject=[],p.$inject=["$timeout"],f.$inject=["$http"],m.$inject=["$parse","$http","$sce","$timeout"],angular.module("manageApp.main").directive("ngView",e).directive("convertToDate",t).directive("convertToNumber",n).directive("detailsInfo",a).directive("formValidator",i).directive("tableList",l).directive("tableCell",o).directive("pagination",r).directive("pagination2",s).directive("filterConditions",c).directive("treeList",u).directive("navList",d).directive("selectAsync",g).directive("relativeSelect",p).directive("chart",f).directive("angucomplete",m).directive("checkboxGroup",h).directive("chosen",v)}),define("main/filters",["main/init"],function(){angular.module("manageApp.main")}),define("main/init",["angular"],function(){angular.module("manageApp.main",[])}),define("main/services",["main/init"],function(){function e(e,t){return function(n,a){var i=e.$new(!1);i.confirmText="确定删除?",t.openConfirm({template:"tpl/dialog-confirm.html",scope:i}).then(a)}}e.$inject=["$rootScope","modal"],angular.module("manageApp.main").service("dialogConfirm",e)}),define("modal/directives",["modal/init"],function(){function e(e){return{restrict:"A",scope:{modalScope:"="},link:function(t,n,a){n.on("click",function(n){n.preventDefault();var i=angular.isDefined(t.modalScope)?t.modalScope:"noScope";angular.isDefined(a.ngDialogClosePrevious)&&e.close(a.ngDialogClosePrevious);var l=e.getDefaults();e.open({template:a.ngDialog,className:a.ngDialogClass||l.className,controller:a.ngDialogController,controllerAs:a.ngDialogControllerAs,bindToController:a.ngDialogBindToController,scope:i,data:a.ngDialogData,showClose:"false"===a.ngDialogShowClose?!1:"true"===a.ngDialogShowClose?!0:l.showClose,closeByDocument:"false"===a.ngDialogCloseByDocument?!1:"true"===a.ngDialogCloseByDocument?!0:l.closeByDocument,closeByEscape:"false"===a.ngDialogCloseByEscape?!1:"true"===a.ngDialogCloseByEscape?!0:l.closeByEscape,overlay:"false"===a.ngDialogOverlay?!1:"true"===a.ngDialogOverlay?!0:l.overlay,preCloseCallback:a.ngDialogPreCloseCallback||l.preCloseCallback})})}}}function t(e){return{restrict:"A",scope:{modalScope:"="},link:function(t,n,a){var i=a.modalRight||"50%";n.on("click",function(n){n.preventDefault(),e.close(),e.open({template:a.modalUrl,className:"ngdialog-theme-right",cache:!1,trapFocus:!1,overlay:!1,data:a.modalData,scope:t.modalScope,controller:["$scope","$element",function(e,t){$(".ngdialog-content",t).width(i)}]})})}}}function n(e){return{restrict:"A",scope:{modalScope:"="},link:function(t,n,a){var i=a.modalCenter||"50%";n.on("click",function(n){n.preventDefault(),e.open({template:a.modalUrl,cache:!1,trapFocus:!1,data:a.modalData,scope:t.modalScope,controller:["$scope","$element",function(e,t){$(".ngdialog-content",t).width(i)}]})})}}}e.$inject=["modal"],t.$inject=["modal"],n.$inject=["modal"],angular.module("manageApp.modal").directive("modal",e).directive("modalRight",t).directive("modalCenter",n)}),define("modal/init",["angular"],function(){angular.module("manageApp.modal",[])}),define("modal/services",["modal/init"],function(){"use strict";var e=angular.module("manageApp.modal"),t=angular.element,n=angular.isDefined,a=(document.body||document.documentElement).style,i=n(a.animation)||n(a.WebkitAnimation)||n(a.MozAnimation)||n(a.MsAnimation)||n(a.OAnimation),l="animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend",o="a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]",r="ngdialog-disabled-animation",s={html:!1,body:!1},c={},u=[],d=!1;e.provider("modal",function(){var e=this.defaults={className:"ngdialog-theme-default",disableAnimation:!1,plain:!1,showClose:!0,closeByDocument:!0,closeByEscape:!0,closeByNavigation:!1,appendTo:!1,preCloseCallback:!1,overlay:!0,cache:!0,trapFocus:!0,preserveFocus:!0,ariaAuto:!0,ariaRole:null,ariaLabelledById:null,ariaLabelledBySelector:null,ariaDescribedById:null,ariaDescribedBySelector:null};this.setForceHtmlReload=function(e){s.html=e||!1},this.setForceBodyReload=function(e){s.body=e||!1},this.setDefaults=function(t){angular.extend(e,t)};var n,a=0,g=0,p={};this.$get=["$document","$templateCache","$compile","$q","$http","$rootScope","$timeout","$window","$controller","$injector",function(f,m,h,v,b,y,$,D,k,C){var w=[],A={onDocumentKeydown:function(e){27===e.keyCode&&S.close("$escape")},activate:function(e){var t=e.data("$ngDialogOptions");t.trapFocus&&(e.on("keydown",A.onTrapFocusKeydown),w.body.on("keydown",A.onTrapFocusKeydown))},deactivate:function(e){e.off("keydown",A.onTrapFocusKeydown),w.body.off("keydown",A.onTrapFocusKeydown)},deactivateAll:function(e){angular.forEach(e,function(e){var t=angular.element(e);A.deactivate(t)})},setBodyPadding:function(e){var t=parseInt(w.body.css("padding-right")||0,10);w.body.css("padding-right",t+e+"px"),w.body.data("ng-dialog-original-padding",t),y.$broadcast("ngDialog.setPadding",e)},resetBodyPadding:function(){var e=w.body.data("ng-dialog-original-padding");e?w.body.css("padding-right",e+"px"):w.body.css("padding-right",""),y.$broadcast("ngDialog.setPadding",0)},performCloseDialog:function(e,t){var a=e.data("$ngDialogOptions"),o=e.attr("id"),r=c[o];if(r){if("undefined"!=typeof D.Hammer){var s=r.hammerTime;s.off("tap",n),s.destroy&&s.destroy(),delete r.hammerTime}else e.unbind("click");1===g&&w.body.unbind("keydown",A.onDocumentKeydown),e.hasClass("ngdialog-closing")||(g-=1);var f=e.data("$ngDialogPreviousFocus");f&&f.focus&&f.focus(),y.$broadcast("ngDialog.closing",e,t),g=0>g?0:g,i&&!a.disableAnimation?(r.$destroy(),e.unbind(l).bind(l,function(){A.closeDialogElement(e,t)}).addClass("ngdialog-closing")):(r.$destroy(),A.closeDialogElement(e,t)),p[o]&&(p[o].resolve({id:o,value:t,$dialog:e,remainingDialogs:g}),delete p[o]),c[o]&&delete c[o],u.splice(u.indexOf(o),1),u.length||(w.body.unbind("keydown",A.onDocumentKeydown),d=!1)}},closeDialogElement:function(e,t){e.remove(),0===g&&(w.html.removeClass("ngdialog-open"),w.body.removeClass("ngdialog-open"),A.resetBodyPadding()),y.$broadcast("ngDialog.closed",e,t)},closeDialog:function(e,t){var n=e.data("$ngDialogPreCloseCallback");if(n&&angular.isFunction(n)){var a=n.call(e,t);angular.isObject(a)?a.closePromise?a.closePromise.then(function(){A.performCloseDialog(e,t)}):a.then(function(){A.performCloseDialog(e,t)},function(){}):a!==!1&&A.performCloseDialog(e,t)}else A.performCloseDialog(e,t)},onTrapFocusKeydown:function(e){var t,n=angular.element(e.currentTarget);if(n.hasClass("ngdialog"))t=n;else if(t=A.getActiveDialog(),null===t)return;var a=9===e.keyCode,i=e.shiftKey===!0;a&&A.handleTab(t,e,i)},handleTab:function(e,t,n){var a=A.getFocusableElements(e);if(0===a.length)return void(document.activeElement&&document.activeElement.blur());var i=document.activeElement,l=Array.prototype.indexOf.call(a,i),o=-1===l,r=0===l,s=l===a.length-1,c=!1;n?(o||r)&&(a[a.length-1].focus(),c=!0):(o||s)&&(a[0].focus(),c=!0),c&&(t.preventDefault(),t.stopPropagation())},autoFocus:function(e){var n=e[0],a=n.querySelector("*[autofocus]");if(null===a||(a.focus(),document.activeElement!==a)){var i=A.getFocusableElements(e);if(i.length>0)return void i[0].focus();var l=A.filterVisibleElements(n.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span"));if(l.length>0){var o=l[0];t(o).attr("tabindex","-1").css("outline","0"),o.focus()}}},getFocusableElements:function(e){var t=e[0],n=t.querySelectorAll(o),a=A.filterTabbableElements(n);return A.filterVisibleElements(a)},filterTabbableElements:function(e){for(var n=[],a=0;a<e.length;a++){var i=e[a];"-1"!==t(i).attr("tabindex")&&n.push(i)}return n},filterVisibleElements:function(e){for(var t=[],n=0;n<e.length;n++){var a=e[n];(a.offsetWidth>0||a.offsetHeight>0)&&t.push(a)}return t},getActiveDialog:function(){var e=document.querySelectorAll(".ngdialog");return 0===e.length?null:t(e[e.length-1])},applyAriaAttributes:function(e,t){if(t.ariaAuto){if(!t.ariaRole){var n=A.getFocusableElements(e).length>0?"dialog":"alertdialog";t.ariaRole=n}t.ariaLabelledBySelector||(t.ariaLabelledBySelector="h1,h2,h3,h4,h5,h6"),t.ariaDescribedBySelector||(t.ariaDescribedBySelector="article,section,p")}t.ariaRole&&e.attr("role",t.ariaRole),A.applyAriaAttribute(e,"aria-labelledby",t.ariaLabelledById,t.ariaLabelledBySelector),A.applyAriaAttribute(e,"aria-describedby",t.ariaDescribedById,t.ariaDescribedBySelector)},applyAriaAttribute:function(e,n,a,i){if(a&&e.attr(n,a),i){var l=e.attr("id"),o=e[0].querySelector(i);if(!o)return;var r=l+"-"+n;return t(o).attr("id",r),e.attr(n,r),r}},detectUIRouter:function(){try{return angular.module("ui.router"),!0}catch(e){return!1}},getRouterLocationEventName:function(){return A.detectUIRouter()?"$stateChangeSuccess":"$locationChangeSuccess"}},S={__PRIVATE__:A,open:function(i){function l(e,t){return y.$broadcast("ngDialog.templateLoading",e),b.get(e,t||{}).then(function(t){return y.$broadcast("ngDialog.templateLoaded",e),t.data||""})}function o(e){return e?angular.isString(e)&&s.plain?e:"boolean"!=typeof s.cache||s.cache?l(e,{cache:m}):l(e,{cache:!1}):"Empty template"}var s=angular.copy(e),f=++a,L="ngdialog"+f;u.push(L),i=i||{},angular.extend(s,i);var P;p[L]=P=v.defer();var x;c[L]=x=angular.isObject(s.scope)?s.scope.$new():y.$new();var T,E,F=angular.extend({},s.resolve);return angular.forEach(F,function(e,t){F[t]=angular.isString(e)?C.get(e):C.invoke(e,null,null,t)}),v.all({template:o(s.template||s.templateUrl),locals:v.all(F)}).then(function(e){var a=e.template,i=e.locals;s.showClose&&(a+='<div class="ngdialog-close"></div>');var l=s.overlay?"":" ngdialog-no-overlay";if(T=t('<div id="ngdialog'+f+'" class="ngdialog'+l+'"></div>'),T.html(s.overlay?'<div class="ngdialog-overlay"></div><div class="ngdialog-content" role="document">'+a+"</div>":'<div class="ngdialog-content" role="document">'+a+"</div>"),T.data("$ngDialogOptions",s),x.ngDialogId=L,s.data&&angular.isString(s.data)){var o=s.data.replace(/^\s*/,"")[0];x.ngDialogData="{"===o||"["===o?angular.fromJson(s.data):s.data}else s.data&&angular.isObject(s.data)&&(x.ngDialogData=s.data);if(s.className&&T.addClass(s.className),s.disableAnimation&&T.addClass(r),E=s.appendTo&&angular.isString(s.appendTo)?angular.element(document.querySelector(s.appendTo)):w.body,A.applyAriaAttributes(T,s),s.preCloseCallback){var c;angular.isFunction(s.preCloseCallback)?c=s.preCloseCallback:angular.isString(s.preCloseCallback)&&x&&(angular.isFunction(x[s.preCloseCallback])?c=x[s.preCloseCallback]:x.$parent&&angular.isFunction(x.$parent[s.preCloseCallback])?c=x.$parent[s.preCloseCallback]:y&&angular.isFunction(y[s.preCloseCallback])&&(c=y[s.preCloseCallback])),c&&T.data("$ngDialogPreCloseCallback",c)}if(x.closeThisDialog=function(e){A.closeDialog(T,e)},s.controller&&(angular.isString(s.controller)||angular.isArray(s.controller)||angular.isFunction(s.controller))){var u;s.controllerAs&&angular.isString(s.controllerAs)&&(u=s.controllerAs);var p=k(s.controller,angular.extend(i,{$scope:x,$element:T}),!0,u);s.bindToController&&angular.extend(p.instance,{ngDialogId:x.ngDialogId,ngDialogData:x.ngDialogData,closeThisDialog:x.closeThisDialog}),T.data("$ngDialogControllerController",p())}if($(function(){var e=document.querySelectorAll(".ngdialog");A.deactivateAll(e),h(T)(x);var t=D.innerWidth-w.body.prop("clientWidth");w.html.addClass("ngdialog-open"),w.body.addClass("ngdialog-open");var n=t-(D.innerWidth-w.body.prop("clientWidth"));n>0&&A.setBodyPadding(n),E.append(T),A.activate(T),s.trapFocus&&A.autoFocus(T),s.name?y.$broadcast("ngDialog.opened",{dialog:T,name:s.name}):y.$broadcast("ngDialog.opened",T)}),d||(w.body.bind("keydown",A.onDocumentKeydown),d=!0),s.closeByNavigation){var m=A.getRouterLocationEventName();y.$on(m,function(){A.closeDialog(T)})}if(s.preserveFocus&&T.data("$ngDialogPreviousFocus",document.activeElement),n=function(e){var n=s.closeByDocument?t(e.target).hasClass("ngdialog-overlay"):!1,a=t(e.target).hasClass("ngdialog-close");(n||a)&&S.close(T.attr("id"),a?"$closeButton":"$document")},"undefined"!=typeof D.Hammer){var v=x.hammerTime=D.Hammer(T[0]);v.on("tap",n)}else T.bind("click",n);return g+=1,S}),{id:L,closePromise:P.promise,close:function(e){A.closeDialog(T,e)}}},openConfirm:function(n){var a=v.defer(),i=angular.copy(e);n=n||{},angular.extend(i,n),i.scope=angular.isObject(i.scope)?i.scope.$new():y.$new(),i.scope.confirm=function(e){a.resolve(e);var n=t(document.getElementById(l.id));A.performCloseDialog(n,e)};var l=S.open(i);return l.closePromise.then(function(e){return e?a.reject(e.value):a.reject()}),a.promise},isOpen:function(e){var n=t(document.getElementById(e));return n.length>0},close:function(e,n){var a=t(document.getElementById(e));if(a.length)A.closeDialog(a,n);else if("$escape"===e){var i=u[u.length-1];a=t(document.getElementById(i)),a.data("$ngDialogOptions").closeByEscape&&A.closeDialog(a,"$escape")}else S.closeAll(n);return S},closeAll:function(e){for(var n=document.querySelectorAll(".ngdialog"),a=n.length-1;a>=0;a--){var i=n[a];A.closeDialog(t(i),e)}},getOpenDialogs:function(){return u},getDefaults:function(){return e}};return angular.forEach(["html","body"],function(e){if(w[e]=f.find(e),s[e]){var t=A.getRouterLocationEventName();y.$on(t,function(){w[e]=f.find(e)})}}),S}]})}),define("upload/directives",["upload/init"],function(){function e(){return{restrict:"EA",scope:{ngModel:"="},replace:!0,templateUrl:"tpl/uploader.html",link:function(e,t,n){function a(){for(var t=o[0].files,n=0,a=t.length;a>n;n++)if(/image/g.test(t[n].type)){var i={status:"uploading",file:t[n],progress:0,text:"上传中...",data:{},imgSrc:window.URL.createObjectURL(new Blob([t[n]],{type:t[n].type}))};e.fileList.push(i),e.$digest(),l(i)}else alert("只能上传图片")}function i(t){var n=[];angular.forEach(e.fileList,function(a,i){t==a?e.fileList.splice(i,1):n.push(a.data.id)}),e.ngModel=n}function l(t){var a=new XMLHttpRequest,i=new FormData;i.append("fileData",t.file),a.upload.addEventListener("progress",function(n){t.progress=Math.round(100*n.loaded/n.total),e.$digest()},!1),a.addEventListener("load",function(n){var a=angular.fromJson(n.target.responseText);t.progress=100,t.status="finished",t.text="上传成功！",t.data=a.data,e.ngModel.push(a.data.id),e.$apply()},!1),a.addEventListener("loadend",function(n){200!=n.target.status&&(t.status="error",t.text="上传失败！",e.$apply())}),a.open("POST",n.uploader),a.setRequestHeader("X-Requested-With","XMLHttpRequest"),a.send(i)}var o=$('<input type="file" multiple/>');e.fileList=[],e.delFile=i,e.ngModel=e.ngModel||[],e.$parent.resetPic=function(){e.ngModel=[],e.fileList=[]},$(".uploadBtn",t).on("click",function(){o.trigger("click")}),o.on("change",a)}}}e.$inject=[],angular.module("manageApp.upload").directive("uploader",e)}),define("upload/init",["angular"],function(){angular.module("manageApp.upload",[])}),define("manageApp.template",["angular"],function(){!function(){"use strict";angular.module("manageApp.template",[]).run(["$templateCache",function(e){e.put("tpl/autocomplete.html",'<div class="angucomplete-holder"><input ng-model="searchStr" type="text" placeholder="{{placeholder}}" class="ipt" onmouseup="this.select();" ng-focus="resetHideResults()" ng-blur="hideResults()"><div class="angucomplete-dropdown" ng-if="showDropdown"><div class="angucomplete-searching" ng-show="searching">正在查询...</div><div class="angucomplete-searching" ng-show="!searching && (!results || results.length == 0)">没有结果</div><div class="angucomplete-row" ng-repeat="result in results" ng-mousedown="selectResult(result)" ng-mouseover="hoverRow()" ng-class="{\'angucomplete-selected-row\': $index == currentIndex}"><div class="angucomplete-title" ng-if="matchClass" ng-bind-html="result.title"></div><div class="angucomplete-title" ng-if="!matchClass">{{ result.title }}</div><div ng-if="result.description && result.description != \'\'" class="angucomplete-description">{{result.description}}</div></div></div></div>'),e.put("tpl/config-floor.html",'<table class="table-list"><tbody><tr><td>单元名称</td><td ng-repeat="unit in config.unitList track by $index"><input type="text" class="ipt ipt-s ipt-xshort" ng-model="config.unitList[$index]"></td></tr><tr><td>每层户数</td><td ng-repeat="col in config.unitColList track by $index"><input type="number" class="ipt ipt-s ipt-xshort" min="1" ng-model="config.unitColList[$index]"></td></tr></tbody></table>'),
e.put("tpl/dialog-confirm.html",'<div class="page-dialog-wrap"><div class="page-dialog-content"><div class="mgb-l">{{confirmText}}</div><div class="text-center pd-v-s"><button type="button" class="btn btn-gray" ng-click="closeThisDialog()">取消</button> <button type="button" class="btn btn-blue" ng-click="confirm()">确定</button></div></div></div>'),e.put("tpl/dialog-tree.html",'<div class="page-dialog-wrap"><div class="page-dialog-title">选择</div><div class="page-dialog-content"><div class="tree-list tree-list-border" tree-list="../data/tree.data" ng-model="selectItem"></div><div class="text-center pd-v-s"><button type="button" class="btn btn-gray" ng-click="closeThisDialog()">取消</button> <button type="button" class="btn btn-blue" ng-click="confirm(selectItem)">确定</button></div></div></div>'),e.put("tpl/pagination.html",'<ul class="pagination" ng-if="status.totalPage>1"><li ng-class="{disabled:status.currentPage==1}"><a ng-click="prev()"><span>«</span></a></li><li ng-repeat="page in pages" ng-class="{active:page.active}"><a ng-click="goto(page.number)">{{page.text}}</a></li><li ng-class="{disabled:status.currentPage==status.totalPage}"><a ng-click="next()"><span>»</span></a></li></ul>'),e.put("tpl/pagination2.html",'<ul class="pagination2" ng-if="status.totalPage!=1"><li class="text-muted">{{status.currentPage+"/" + status.totalPage}} 页</li><li><a ng-class="{\'on\':status.currentPage==1}" ng-click="start()"><i class="iconfont icon-page-start"></i></a></li><li><a ng-class="{\'on\':status.currentPage==1}" ng-click="prev()"><i class="iconfont icon-page-prev"></i></a></li><li><a ng-class="{\'on\':status.currentPage==status.totalPage}" ng-click="next()"><i class="iconfont icon-page-next"></i></a></li><li><a ng-class="{\'on\':status.currentPage==status.totalPage}" ng-click="end()"><i class="iconfont icon-page-end"></i></a></li></ul>'),e.put("tpl/table-cell.html",'<span ng-repeat="cell in cells" class="{{cell.css}}">{{cell.text}}</span>'),e.put("tpl/table-list.html",'<div><div class="fr"><pagination status="status"></pagination></div><div ng-transclude=""></div></div><table class="table-list"><thead><tr><th ng-if="listSelected"><input type="checkbox" class="selectAll"></th><th ng-repeat="(hKey,hValue) in theadList">{{hValue}}</th></tr></thead><tbody><tr ng-repeat="tr in tbodyList"><td ng-if="listSelected" class="select-td"><input type="checkbox" class="selectOne" value="{{tr.id}}">{{$index}}</td><td ng-repeat="(hKey,hValue) in theadList"><table-cell row="tr[hKey]"></table-cell></td></tr></tbody></table>'),e.put("tpl/tree.html",'<div class="loader" ng-if="status.isLoading"><div class="loader-inner pacman"><div></div><div></div><div></div><div></div><div></div></div></div><div ng-if="!status.isLoading"><div class="empty-wrap" ng-if="treeList.length==0"><div class="icon"><i class="iconfont icon-empty"></i></div><div>什么也没有</div></div><ul ng-if="treeList.length"><li ng-class="{fold:curTree1.id==tree.id}" ng-repeat="tree in treeList | filter:{pid:0}:true"><em ng-click="selectTree1(tree)"><i class="iconfont fold-p"></i> {{tree.name}}</em><ul><li ng-class="{fold:curTree2.id==tree2.id}" ng-repeat="tree2 in treeList | filter:{pid:tree.id}:true"><em ng-click="selectTree2(tree2)"><i class="iconfont fold-p"></i> {{tree2.name}}</em><ul><li ng-class="{on:curTree3.id==tree3.id}" ng-repeat="tree3 in treeList | filter:{pid:tree2.id}:true"><em ng-click="selectTree3(tree3)"><i class="iconfont icon-house"></i> {{tree3.name}}</em></li></ul></li></ul></li></ul></div>'),e.put("tpl/uploader.html",'<div class="uploader-wrap"><div class="uploader-list"><div class="file" ng-class="{finished:file.status==\'finished\',error:file.status==\'error\'}" ng-repeat="file in fileList">\' +<div class="img" style="background-image: url({{file.imgSrc}})"></div><div class="progress-mask" style="height:{{file.progress}}%"></div><div class="del" ng-click="delFile(file)"><i class="iconfont icon-delete"></i></div><div class="text"><span class="status">{{file.text}}</span><i>{{file.progress}}%</i></div></div><div class="file file-upload uploadBtn"><i class="iconfont icon-plus"></i></div></div></div>')}])}()}),!function(){var e=document.getElementsByTagName("script"),t=e[e.length-1];require.dir=t.src.match(/[^?#]*\//)[0]}(),require.config({baseUrl:require.dir+"modules",paths:{echarts:"../libs/echarts.min",chosen:"../libs/chosen.jquery.min",jQuery:"../libs/jquery.min",angular:"../libs/angular"},shim:{jQuery:{exports:"jQuery"},chosen:{deps:["jQuery"]},echarts:{exports:"echarts"},angular:{deps:["jQuery"],exports:"angular"}},urlArgs:""}),define("manageApp.main",["main/init","main/services","main/controllers","main/directives","main/filters"]),define("manageApp.modal",["modal/init","modal/services","modal/directives"]),define("manageApp.upload",["upload/init","upload/directives"]),define("manageApp",["angular","manageApp.template","manageApp.modal","manageApp.main","manageApp.upload"],function(){return angular.module("manageApp",["ngRoute","manageApp.template","manageApp.modal","manageApp.main","manageApp.upload"])}),require(["manageApp"],function(e){e.config(["$routeProvider",function(e){e.when("/:page*",{templateUrl:function(e){var t=(Config.viewsDir||"")+e.page;delete e.page;var n=$.param(e);return n?t+"?"+n:t},resolve:{load:function(){}}}).otherwise({redirectTo:Config.indexPage})}]),angular.bootstrap(document,["manageApp"])});