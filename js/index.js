// banner - list导航栏效果
$('.banner-list>li').hover(function () {
    $(this).siblings().children('.banner-list-box').css({ display: 'none' }).stop().animate({ width: 0 })
        .end().end().children('.banner-list-box').css({ display: 'block' }).stop().delay(300).animate({ width: 440 }, 300)
}, function () {
    $(this).children('.banner-list-box').css({ display: 'none' }).stop().animate({ width: 0 })
})

// banner轮播
class Banner {
    constructor() {
        this.next = $('.next');
        this.prev = $('.prev');
        this.aImg = $('.imgbox').children();
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
new Banner()

//懒加载
$('.lazyload').lazyload()

//mytake hover效果
$('.mytake-ul li').on('mouseenter', function () {
    $('.works').stop().hide().eq($(this).index()).stop().show()
    $('.mytake-arrow').stop().animate({
        left: $(this).index() * $('.mytake-arrow').width()
    })
})