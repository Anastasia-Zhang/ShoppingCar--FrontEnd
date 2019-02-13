new Vue({
    el:"#app",
    data:{
        totalMoney:0,
        productList:[],
        checkAllFlag:false//item是循环，无法直接从外面全局定义,全选可以
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
        },
        changeMoney:function(product,way) {
            if(way>0){
                product.productQuantity++;
            }else{
                product.productQuantity--;
                if(product.productQuantity<1){
                    product.productQuantity=1;
                }
            }
        },
        selectedProduct:function (item) {
            if(typeof item.checked == 'undefined'){//看data里面有无变量
                Vue.set(item,"checked","true");//在变量里添加属性
                //this.$set(item."checked",true);
            }else{
                //商品选择、不选择
                item.checked = !item.checked;
            }
        },
        checkAll:function (flag) {
            this.checkAllFlag = flag;
            var _this = this;
            //遍历商品
            this.productList.forEach(function (item,index) {
                //看该商品是否选中
                if(typeof item.checked == 'undefined'){//看data里面有无变量
                    _this.$set(item,"checked",_this.checkAllFlag);//在变量里添加属性，全选值和单个商品的值同步
                    //this.$set(item."checked",true);
                }else{
                    //选中该商品
                    item.checked = _this.checkAllFlag;
                }
            });
        }

    }
});
//全局过滤器
Vue.filter("money", function (value,type){
    return value.toFixed(2) + type;
})