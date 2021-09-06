var app = new Vue({
    el: '#app',
    data: {
        products: [
            {
                id: 1,
                imgUrl: "https://bit.ly/2QiWeQW",
                itemName: "焦糖瑪卡龍",
                price: 450
            },
            {
                id: 2,
                imgUrl: "https://bit.ly/2zBjQuq",
                itemName: "焦糖瑪卡龍",
                price: 450
            },
            {
                id: 3,
                imgUrl: "https://bit.ly/2zKOP7w",
                itemName: "焦糖瑪卡龍",
                price: 450
            },
            {
                id: 4,
                imgUrl: "https://bit.ly/2NcDVuB",
                itemName: "焦糖瑪卡龍",
                price: 450
            },
            {
                id: 5,
                imgUrl: "https://bit.ly/2zBDAxX",
                itemName: "焦糖瑪卡龍",
                price: 450
            },
            {
                id: 6,
                imgUrl: "https://bit.ly/2zL5jN7",
                itemName: "焦糖瑪卡龍",
                price: 450
            }
        ],
    },
});
let productsData
const productRow = document.querySelector('#product-row')

function createProductCard(product) {
    const cardElement=`
                <form class="col-12 col-sm-12 col-md-6 rounded-0">
                           <div class="card ">
                                    <img src="${product.imgUrl}" class="card-img-top d-block position-relative w-100 " style="border:solid 1px #EAF0ED;">
                                    <div class="card-btn position-absolute">
                                    <button>
                                        <i class="far fa-heart fz-22px cgr"></i>
                                    </button>
                                </div>
                                <div class="card-img position-absolute fz-16px" >
                                    <span class=" cgr fz-16px px-1 py-1">本日精選</span>
                                </div>
                                
                                <div class="d-flex fz-18px fz-md-24px text-center cgr">
                                    <div class="flex-grow-1 py-1" style="font-family:PingFangTC-Light;border:solid 1px #EAF0ED;">
                                    ${product.itemName}
                                    </div>
                                    <div  class="flex-grow-1 py-1" style="border:solid 1px #EAF0ED;">NT$ ${product.price}</div>
                                </div>
                                <button class="cgr py-2 w-100 fz-20px fz-md-26px mb-3 text-center" type="submit" style="background-color:#EAF0ED ;">
                                    加入購物車
                                </button>
                             </div>
                 </form> 
    `;
    return cardElement;
}
fetch('api/dessert.json').then(resp => resp.json()).then(({ products }) => {
    productsData = products
    productsData.forEach(product => {
        const card =createProductCard(product)
        productRow.innerHTML+=card
    });
})
