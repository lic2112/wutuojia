// recomd数据请求
$.ajax({
    url: 'http://127.0.0.1/wutuojia/php/data.php',
    type: 'post',
    data: { recommd: 1 },
    dataType: 'json',
    success: function (res) {
        // console.log(res)
        for (let i = 0; i < res.length; i++) {
            // $('.recommd-main').find('.lazyload').eq(i).attr('data-src', res[i].data_src)
            $('.recommd-body').eq(i).find('.lazyload').attr('data-src', res[i].data_src)
            $('.recommd-body').eq(i).find('dd').find('a').html(res[i].goods)
            $('.recommd-body').eq(i).find('dd').find('p').html(res[i].info1)
            $('.recommd-body').eq(i).find('dd').find('span').html(res[i].info2)
        }
    },
    beforeSend: function () {
        let str = '';
        for (let i = 0; i < 12; i++) {
            str += `<div class='recommd-body'>
                        <dl>
                            <dt>
                                <a href='javascript:'>
                                    <img src='img/rd1.png' alt='' class='lazyload'>
                                </a>
                            </dt>
                            <dd>
                                <a href='javascript:'></a>
                                <p></p>
                                <span></span>
                            </dd>
                        </dl>
                    </div>`
        }
        $('.recommd-main').html(str)
    }
});

// 分页
// $('.pagination').pagination(res.length, {
//     // 每页显示5条
//     items_per_page: 5,
//     callback: function (index) {
//         // 加载数据
//         updateData(index, res)
//     }
// })
$('.pagination').pagination(10, {
    num_edge_entries: 2,         //两侧显示的首尾分页的条目数
    num_display_entries: 4,      //连续分页主体部分显示的分页条目数
    callback: function (index) {
        //alert(index)
        console.log(1);
    },
    items_per_page: 1,          //每页显示的条目数
    prev_text: '上一页',
    next_text: '下一页',

});





//懒加载
$('.lazyload').lazyload()