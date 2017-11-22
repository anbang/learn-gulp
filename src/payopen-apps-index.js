define(function(require,exports,module){
    "require:nomunge,exports:nomunge,module:nomunge";
    //添加
    var $page=$("#page-payopen-apps");

    var pageUtilitiy={
        init:function(){
            this.bind();
            this.formValidate();
        },
        bind:function(){
            var self=this;
            //点击开通；
            $page.on("click",".j-add-app",function(e){
                e.preventDefault();
            });

        },
        formValidate: function () {
            var self=this;

        }
    };
    pageUtilitiy.init();
});