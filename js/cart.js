class Cart {
    constructor() {
        this.askData()
        this.getCookie()
    }
    askData() {
        let that = this;
        $.ajax({
            url: 'php/data.php',
            type: 'post',
            data: { recommd: 1 },
            dataType: 'json',
            success: function (res) {
                that.res = res;
                console.log(that.res);
                that.display();
                that.remove();
            }
        })
    }
    getCookie() {
        this.cookie = JSON.parse($.cookie('goods'))
        console.log(this.cookie);
    }
    display() {
        let that = this;
        let str = '';
        let invoice = 0
        if (this.res && this.cookie) {
            this.res.forEach(val1 => {
                that.cookie.forEach(val2 => {
                    if (val1.goodsId == val2.id) {
                        let totalPrice = val2.num * val1.price
                        // 总价计算
                        invoice += totalPrice
                        str += `<tr goods_id='${val1.goodsId}'>
                                <td>
                                    <div>
                                        <strong>${val1.info1}</strong>
                                    </div>
                                </td>
                                <td><img src="${val1.data_src}" alt=""></td>
                                <td>${val2.num}</td>
                                <td>&yen;${val1.price}</td>
                                <td>&yen;${totalPrice}</td>
                                <td><span>删除</span></td>
                            </tr>`
                    }
                });
            });
        }
        // console.log(invoice);
        $('.myshoplist').html(str)
        $('.mypay').html('&yen;')
        $('.mypay').append(invoice)
    }
    remove() {
        let that = this;
        $('.myshoplist').on('click', 'span', function () {
            $(this).parent().parent().remove()
            let index = $(this).parent().parent().attr('goods_id')
            console.log(index);
            for (let i = 0; i < that.cookie.length; i++) {
                if (that.cookie[i].id == index) {
                    that.cookie.splice(i, 1)
                    // console.log(1);
                }
            }
            let str = JSON.stringify(that.cookie)
            $.cookie('goods', str)
            // 删除后重新渲染,为统计总价
            that.display()
        })
    }
}
new Cart()