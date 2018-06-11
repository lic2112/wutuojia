// 登录注册
(function () {
    // 点击小人显示界面
    $('.myInfo').on('click', function () {
        $('.login').show()
        $('html,body').addClass('cover')
    })
    // 点击注册跳转注册页
    $('.lj-register').on('click', function () {
        $('.register').show()
        $('.login-main').hide()
    })
    // 点击登录跳转登录页
    $('.lj-login').on('click', function () {
        $('.register').hide()
        $('.login-main').show()
    })
    // 点击X关闭
    $('.close').on('click', function () {
        $('.login').hide()
        $('html,body').removeClass('cover')
    })
    // 注册
    $('.register-submit').on('click', function () {
        $.ajax({
            url: 'http://datainfo.duapp.com/shopdata/userinfo.php',
            data: {
                status: 'register',
                userID: $('#regTxt1').val(),
                password: $('#regTxt2').val()
            },
            type: 'post',
            success: function (res) {
                // console.log(res);
                switch (res) {
                    case '0': alert('用户名重名'); break;
                    case '1':
                        alert('注册成功,点击跳转');
                        $('.register').hide()
                        $('.login-main').show()
                        break;
                    case '2':
                        alert('数据库出错');
                        break;
                }
            }
        })
    })
    // 登录
    $('.login-submit').on('click', function () {
        if ($('#logTxt1').val().length != 0 && $('#logTxt2').val().length != 0) {
            $.ajax({
                url: 'http://datainfo.duapp.com/shopdata/userinfo.php',
                data: {
                    status: 'login',
                    userID: $('#logTxt1').val(),
                    password: $('#logTxt2').val()
                },
                type: 'post',
                success: function (res) {
                    switch (res) {
                        case '0': alert('用户名不存在'); break;
                        case '2':
                            alert('密码错误');
                            break;
                        default:
                            alert('登录成功,点击跳转');
                            $('.login').hide()
                            $('html,body').removeClass('cover')
                    }
                }
            })
        } else {
            alert('请填写完整用户名及密码')
        }
    })
})()

//懒加载
$('.lazyload').lazyload()

// footer link more
$('.links_moreIcon').on('click', function () {
    $('.links_m').toggle()
})

// ingmenu
onscroll = function () {
    if ($(document).scrollTop() > 400) {
        $('.ingmenu').stop().show(150)
    } else {
        $('.ingmenu').stop().hide(150)
    }
}
//点击缓动返回顶部
$('.imgmenu_ico3').on('click', function () {
    let timer = setInterval(() => {
        let scrollT = $(document).scrollTop()
        let speed = Math.floor(-scrollT / 7)
        // console.log(speed);
        if (scrollT == 0) {
            clearInterval(timer)
        } else {
            $(document).scrollTop(scrollT + speed)
        }
    }, 30);
})
