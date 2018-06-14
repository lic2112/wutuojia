$.cookie('name');
$.cookie('pass');

//登录状态时hover显示下拉菜单,否则点击小人登录注册
if ($.cookie('name') != null && $.cookie('pass') != null) {
    // $('.myInfo').on('click', function () {
    //     null
    // })
    document.querySelector('.myInfo').onclick = null
    $('.header_r span').on('mouseenter', function () {
        $('.dropdown-menu-wtj').stop().slideDown()
    })
    $('.dropdown-menu-wtj').on('mouseleave', function () {
        $('.dropdown-menu-wtj').stop().slideUp()
    })
} else {
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
                                // 记录登录时cookie
                                $.cookie('name', $('#logTxt1').val(), { expires: 7 });
                                $.cookie('pass', $('#logTxt2').val(), { expires: 7 });
                                alert('登录成功,点击跳转');
                                history.go(0);
                                $('.login').hide();
                                $('html,body').removeClass('cover')
                        }
                    }
                })
            } else {
                alert('请填写完整用户名及密码')
            }
        })
    })()
}
// 退出登录删除cookie
$('.quit_login').on('click', function () {
    $.cookie('name', null);
    $.cookie('pass', null);
    history.go(0);
})

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
