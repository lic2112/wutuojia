class Page {
    constructor() {

        this.askData()
    }
    askData() {
        let that = this;
        $.ajax({
            url: 'http://127.0.0.1/wutuojia/php/data.php',
            type: 'post',
            data: { recommd: 1 },
            dataType: 'json',
            success: function (res) {
                that.mypagination(res)
            }
        });
    }
    mypagination(res) {
        // console.log(res);
        let that = this;
        $('.pagination').pagination(res.length, {
            num_edge_entries: 2,         //两侧显示的首尾分页的条目数
            num_display_entries: 4,      //连续分页主体部分显示的分页条目数
            callback: function (index) {       //index为当前页索引
                // console.log(index);
                // console.log(res);
                //alert(index)
                that.updateData(index, res)
                that.init()
            },
            items_per_page: 16,          //每页显示的条目数
            prev_text: '上一页',
            next_text: '下一页'

        });
    }
    updateData(index, res) {
        let str = '';
        for (let i = index * 16; i < index * 16 + 16; i++) {
            if (i < res.length) {
                str += `<div class='recommd-body' goods_id='${res[i].goodsId}'>
                        <dl>
                            <dt>
                                <a href='javascript:'>
                                    <img src='img/rd1.png' alt='' data-src='${res[i].data_src}' class='lazyload'>
                                </a>
                            </dt>
                            <dd>
                                <a href='javascript:'>${res[i].goods}</a>
                                <p>${res[i].info1}</p>
                                <span>${res[i].info1}</span>
                                <i>￥${res[i].price}</i>
                                <em>点击加入购物车</em>
                            </dd>
                        </dl>
                    </div>`
            }
        }
        $('.recommd-main').html(str)
        //懒加载
        $('.lazyload').lazyload()
    }
    init() {
        $('.recommd-body').on('click', 'em', function () {
            let index = $(this).parent().parent().parent().attr('goods_id');
            // console.log(index);
            let arr = [];
            if (!$.cookie('goods')) {
                arr.push({
                    'id': index,
                    'num': 1
                })
                let a = JSON.stringify(arr)
                $.cookie('goods', a)
            } else {
                arr = JSON.parse($.cookie('goods'))
                let onOff = true
                for (let i = 0; i < arr.length; i++) {
                    if (index == arr[i].id) {
                        arr[i].num++
                        onOff = false
                    }
                }
                if (onOff) {
                    arr.push({
                        'id': index,
                        'num': 1
                    })
                }
                let b = JSON.stringify(arr)
                $.cookie('goods', b)
            }
            // console.log($.cookie('goods'));
        })
    }
}
new Page()


//懒加载
$('.lazyload').lazyload()