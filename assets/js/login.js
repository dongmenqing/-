$(function () {
    // 点击“去注册账号”的链接
    $("#link-reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show();
        // console.log(111);
    })
    // 点击“去登录”的链接
    $("#link-login").on("click", function () {
        $(".login-box").show();
        $(".reg-box").hide();
    })
    // 从layui中获取form对象
    var form = layui.form;

    var layer = layui.layer;

    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义了一个叫做pwd校验规则
        pwd: [/^\S{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的值
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则return一个提示消息即可
            var pwd = $(".reg-box [name=password]").val();
            if (pwd != value) {
                return "两次密码不一致"
            }
        }

    })


    // 监听注册表单的提交事件
    $("#form-reg").on("submit", function (e) {
        // 1.阻止默认提交行为
        e.preventDefault();
        // $.ajax({
        //     url:"http://api-breakingnews-web.itheima.net/api/reguser",
        //     type:"post",
        //     data:{
        //         username:$("#form-reg [name=username]").val(),
        //         password:$("#form-reg [name=password]").val()
        //     },
        //     function(res){
        //         if(res.status!=0){
        //             return console.log(res.message);
        //         }
        //         console.log("注册成功");
        //     }
        // })

        var data = {
            username: $("#form-reg [name=username]").val(),
            password: $("#form-reg [name=password]").val()
        }
        // 2.发起ajax的post请求
        $.post("/api/reguser", data, function (res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            layer.msg("注册成功")
            // 手动调用点击事件
            $("#link-login").click();
        })
    })

    // 监听登录表单提交事件
    $("#form-login").submit(function(e){
        // 阻止默认提交行为
e.preventDefault();
$.ajax({
    url:"/api/login",
    type:"post",
    // 快速获取表单的数据
    data:$(this).serialize(),
    success(res){
        if(res.status!=0){
            return layer.msg("登录失败")
        }
        layer.msg("登录成功")
        // console.log(res.token);
        // 将登录成功得到的token 字符串，保存到localStorage中
        localStorage.setItem("token",res.token)
        // 跳到后台主页
        location.href="/index.html"
    }
})
    })
})