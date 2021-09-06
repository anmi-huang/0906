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
             <div class="col-md-6 mb-3">
                <ul class="card border-line">
                    <a href="#" class="text-decoration-name">
                           <li> <img src="${product.imgUrl}" class="card-img-top d-block position-relative w-100 " style="border:solid 1px #EAF0ED;"></li>
                              <li class="card-img position-absolute fz-16px">
                                 <span class=" text-white fz-16px px-1 py-1">本日精選</span>
                           </li>


                        <li class="d-flex text-center text-primary ">
                           <div class="flex-grow-1 fz-18px fz-md-24px py-1 text-cart-font border-line border-right-0  " >
                           ${product.itemName}
                           </div>
                           <div class="flex-grow-1 fz-18px fz-md-24px py-1 border-line" >NT$ ${product.price}</div>
                        </li>
                        <li>
                        <button class="fz-20px fz-md-26px text-center w-100 py-2 text-primary btn-cart-bg " type="submit" >
                            加入購物車
                        </button>
                    </li>
                   </a>
                    <div class="card-btn position-absolute ">
                        <button >
                            <i class="far fa-heart fz-22px text-primary"></i>
                        </button>
                    </div>
                </ul>
            </div>
    `;
    return cardElement;
}
fetch('api/dessert.json').then(resp => resp.json()).then(({ products }) => {
    productsData = products
    let str=''
    productsData.forEach(product => {
        const card =createProductCard(product)
        str+=card
    });
    productRow.innerHTML=str
})

// fetch('api/dessert.json').then(resp => resp.json()).then(({ products }) => {
//     productsData = products
//     productsData.map(product => {
//         const card =createProductCard(product)
//         productRow.innerHTML+=card
//     }).join(" ");
// })
