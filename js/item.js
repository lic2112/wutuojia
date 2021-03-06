const mySwiper = new Swiper('.swiper-container', {
    loop: true,
    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'custom'
    },
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    // 如果需要滚动条
    scrollbar: {
        el: '.swiper-scrollbar'
    },
    autoplay: true
})
$('.swiper-container').mouseenter(function () {
    mySwiper.autoplay.stop();
})
$('.swiper-container').mouseleave(function () {
    mySwiper.autoplay.start();
})

// rec-commodity-ul数据请求
$.ajax({
    url: 'php/data.php',
    type: 'post',
    data: { rec_commodity_ul: 1 },
    dataType: 'json',
    success: function (res) {
        // console.log(res);
        for (let i = 0; i < res.length; i++) {
            $('.rec-commodity-ul').children('li').eq(i).find('img').attr('data-src', res[i].data_src)
            $('.rec-commodity-ul').children('li').eq(i).find('.impression').find('a').html(res[i].info1)
            $('.rec-commodity-ul').children('li').eq(i).find('.material').html(res[i].info2)
            $('.rec-commodity-ul').children('li').eq(i).find('.attribute').html(res[i].info3)
        }
    },
    beforeSend: function () {
        let str = ''
        for (let i = 0; i < 6; i++) {
            str += `<li>
                        <div class="commodity-box-main">
                            <div class="commodity-img-box">
                                <a href="">
                                    <img src="img/rd1.png" class="lazyload">
                                </a>
                            </div>
                            <div class="rec-commodity-explain">
                                <div class="impression">
                                    <a href=""></a>
                                </div>
                                <div class="material"></div>
                                <div class="attribute"></div>
                            </div>
                        </div>
                    </li>`
        }
        $('.rec-commodity-ul').html(str);
    }
});

$('.add_collect').on('click', function () {
    $('.add_collect').css({ display: 'none' })
    $('.cancel_collect').css({ display: 'block' })
})
$('.cancel_collect').on('click', function () {
    $('.cancel_collect').css({ display: 'none' })
    $('.add_collect').css({ display: 'block' })
})

let menuT = $('.product_menu').offset().top;
let detailR_T = $('.product-details-r').offset().top;
let foot_H = $('.footer').offset().top
$(window).on('scroll', function () {
    if ($(document).scrollTop() >= menuT) {
        $('.product_menu').css({
            position: 'fixed'
        })
    } else {
        $('.product_menu').css({ position: '' })
    }
    if ($(document).scrollTop() > detailR_T && $(document).scrollTop() < foot_H - detailR_T) {
        $('.product-details-r').css({ top: $(document).scrollTop() - $('.product_main').offset().top })
    } else {
        $('.product-details-r').css({ top: 0 })
    }
})

//懒加载
$('.lazyload').lazyload()