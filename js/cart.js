new Vue({
    el:"#app",
    data:{
        totalMoney:0,
        productList:[]
    },
    filters:{
      formatMoney:function (value) {
          return "￥" + value.toFixed(2);
      }  
    },
    mounted:function(){
      this.cartView();
    },
    methods:{
        cartView:function () {
            var _this = this;//将this存入变量代表本实例，在方法中的this作用域将发生变化
            this.$http.get("data/cartData.json",{"id":"123"}).then(function (res) {
                _this.productList = res.data.result.list;//将接口返回的list数据放到vue的list里面
                _this.totalMoney = res.data.result.totalMoney;
            });
        }
    }
});
//全局过滤器
Vue.filter("money", function (value,type){
    return value.toFixed(2) + type;
})