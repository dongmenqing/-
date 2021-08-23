$(function () {
    initArtCateList()
    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success(res) {
                // console.log(res);
                var htmlstr = template("tpl", res)
                $("#tblist").html(htmlstr)
            }
        })
    }
    var index = null;
    // 为添加类别按钮绑定点击事件
    $("#addCate").on("click", function () {
        index = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: '添加文章分类'
            , content: $("#dialog").html()
        });
    })
    // 利用事件委托，给表单绑定submit事件
    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            url: "/my/article/addcates",
            type: "post",
            data: $(this).serialize(),
            success(res) {
                if (res.status != 0) {
                    return layui.layer.msg("新增分类失败")
                }
                initArtCateList()
                layui.layer.msg("新增分类成功")
                // 根据索引，关闭弹出层
                layui.layer.close(index)
            }
        })
    })
    // 利用委托事件，给btn-edit按钮绑定点击事件
    var indexEdit=null;
    $("tbody").on("click",".btn-edit",function(){
        // console.log(11);
        indexEdit = layui.layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: '添加文章分类'
            , content: $("#dialog-edit").html()
        });
        var id=$(this).attr("data-id")
        console.log(id);
        $.ajax({
            type:"get",
            url:"/my/article/cates/"+id,
            success(res){
                console.log(res);
                layui.form.val("form-edit",res.data)
            }
        })
    })
    // 通过事件委托，为修改分类的表单绑定submit事件
    $("body").on("submit","#form-edit",function(e){
        e.preventDefault()
        $.ajax({
            type:"post",
            url:"/my/article/updatecate",
            data:$(this).serialize(),
            success(res){
                if(res.status!=0){
                    return layui.layer.msg("更新数据失败")
                }
                layui.layer.msg("更新数据成功")
                layui.layer.close(indexEdit)
                initArtCateList()
            }
        })
    })
    // 通过事件委托，为删除按钮绑定点击事件
    $("tbody").on("click",".btn-del",function(){
        var id=$(this).attr("data-id");
        // 提示用户是否要删除
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, 
        function(index){
            //do something
            $.ajax({
                url:"/my/article/deletecate/"+id,
                type:"get",
                success(res){
                    if(res.status!=0){
                        return layui.layer.msg("删除失败")
                    }
                    layui.layer.msg("删除成功")
                    layer.close(index);
                    initArtCateList()

                }
            })



          });
    })

})