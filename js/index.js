// banner - list导航栏效果
$('.banner-list>li').hover(function () {
    $(this).siblings().children('.banner-list-box').css({ display: 'none' }).stop().animate({ width: 0 })
        .end().end().children('.banner-list-box').css({ display: 'block' }).stop().delay(300).animate({ width: 440 }, 300)
}, function () {
    $(this).children('.banner-list-box').css({ display: 'none' }).stop().animate({ width: 0 })
});

// 轮播效果
class Banner {
    constructor(obj) {
        this.next = obj.next;
        this.prev = obj.prev;
        this.aImg = obj.aImg;
        this.index = this.aImg.length - 1;
        this.iNow = 0;
        this.init();
        this.auto();
    }
    init() {
        let that = this
        this.next.on('click', function () {
            if (that.iNow == that.aImg.length - 1) {
                that.iNow = 0;
                that.index = that.aImg.length - 1;
            } else {
                that.iNow++;
                that.index = that.iNow - 1;
            }
            that.move(1)

        })
        this.prev.on('click', function () {
            if (that.iNow == 0) {
                that.iNow = that.aImg.length - 1;
                that.index = 0;
            } else {
                that.iNow--;
                that.index = that.iNow + 1;
            }
            that.move(-1)
        })
    }
    move(num) {
        this.aImg.eq(this.index).css({ left: 0 }).stop().animate({ left: -this.aImg.eq(0).width() * num }, 500)
            .end().eq(this.iNow).css({ left: this.aImg.eq(0).width() * num }).stop().animate({ left: 0 }, 500);
    }
    auto() {
        this.timer = setInterval(() => {
            this.next.triggerHandler('click')
        }, 5000);
        let that = this;
        this.aImg.hover(function () {
            clearInterval(that.timer);
        }, function () {
            that.timer = setInterval(() => {
                that.next.triggerHandler('click')
            }, 5000);
        })
    }
}
// Banner轮播
new Banner({
    next: $('.next'),
    prev: $('.prev'),
    aImg: $('.imgbox').children()
});
// Brands轮播
new Banner({
    next: $('.next_b'),
    prev: $('.prev_b'),
    aImg: $('.tempWrap ul').children('li')
});

//mytake hover效果
$('.mytake-ul li').on('mouseenter', function () {
    $('.works').stop().hide().eq($(this).index()).stop().show()
    $('.mytake-arrow').stop().animate({
        left: $(this).index() * $('.mytake-arrow').width()
    })
});

// recomd数据请求
$.ajax({
    url: 'http://127.0.0.1/wutuojia/php/data.php',
    type: 'post',
    data: { recommd: 1 },
    dataType: 'json',
    success: function (res) {
        // console.log(res)
        for (let i = 0; i < res.length; i++) {
            $('.recommd-main').find('.lazyload').eq(i).attr('data-src', res[i].data_src)
            $('.recommd-body').eq(i).find('dd').find('a').html(res[i].goods)
            $('.recommd-body').eq(i).find('dd').find('p').html(res[i].info1)
            $('.recommd-body').eq(i).find('dd').find('span').html(res[i].info2)
        }
    },
    // error:function(a,b,c){
    //     console.log(b,c)
    // },
    beforeSend: function () {
        let str = '';
        for (let i = 0; i < 8; i++) {
            str += `<div class="recommd-body">
                        <dl>
                            <dt>
                                <a href="javascript:">
                                    <img src="img/rd1.png" alt="" class="lazyload">
                                </a>
                            </dt>
                            <dd>
                                <a href="javascript:"></a>
                                <p></p>
                                <span></span>
                            </dd>
                        </dl>
                    </div>`
        }
        $('.recommd-main').html(str)
    }
});

// mytake-ul数据请求
$.ajax({
    url: 'http://127.0.0.1/wutuojia/php/data.php',
    type: 'post',
    data: { mytake_ul: 1 },
    dataType: 'json',
    success: function (res) {
        // console.log(res);
        for (let i = 0; i < res.length; i++) {
            $('.mytake-ul li').eq(i).find('.lazyload').attr('data-src', res[i].data_src)
        }
    }
});

// work-ul数据请求
$.ajax({
    url: 'http://127.0.0.1/wutuojia/php/data.php',
    type: 'post',
    data: { work_ul: 1 },
    dataType: 'json',
    success: function (res) {
        // console.log(res);
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                $('.work-ul').eq(i).children('li').eq(j).find('img').attr('data-src', res[i * 4 + j].data_src)
                $('.work-ul').eq(i).children('li').eq(j).find('h3').html(res[i * 4 + j].info)
            }
        }
    }
});

// brands数据请求
$.ajax({
    url: 'http://127.0.0.1/wutuojia/php/data.php',
    type: 'post',
    data: { brands: 1 },
    dataType: 'json',
    success: function (res) {
        // console.log(res);
        for (let i = 0; i < res.length; i++) {
            for (let j = 0; j < 3; j++) {
                $('.clone_r').eq(j).find('.clone_r_div').eq(i).find('img').attr('data-src', res[i].data_src)
            }
            $('.clone_r').eq(i).find('p').html(res[i].info)
            $('.clone_r').eq(i).find('span').html(res[i].price)
        }
    },
    // error: function (a, b, c) {
    //     console.log(b, c);
    // },
    beforeSend: function () {
        let str = ''
        for (let i = 0; i < 6; i++) {
            str += `<a href="javascript:">
                        <div class="clone_r_div">
                            <img src="img/rd1.png" class="lazyload">
                        </div>
                        <p></p>
                        <small>
                            <em>¥</em>&nbsp;
                            <span></span>
                        </small>
                    </a>`
        }
        $('.clone_r').html(str);
    }
});

//懒加载
$('.lazyload').lazyload()