let productsData
const productRow = document.querySelector('#product-row')

function createProductCard(product) {
    const cardElement=`
             <div class="col-md-6 mb-3">
                <ul class="card border border-secondary">
                    <a href="#" class="text-decoration-none ">
                        <li>
                            <img src="${product.imgUrl}" class="img-card d-block position-relative w-100">
                        </li>
                        <li class="text-card position-absolute fz-16px">
                            <span class=" text-white fz-16px px-1 py-1">本日精選</span>
                        </li>
                        <li class="d-flex text-center text-primary fz-18px fz-md-20px">
                           <div class="flex-grow-1  ff-ping-fang-tc-light text-cart-font border border-secondary  border-right-0  border-left-0 py-1">${product.itemName}</div>
                           <div class="flex-grow-1  ff-ping-fang-tc-semibold border-secondary border border-right-0 py-1 ">NT$ ${product.price}</div>
                        </li>
                        <li class="fz-20px fz-md-24px">
                        <button class=" bg-secondary text-center text-primary w-100  py-2 " type="submit" >
                            加入購物車
                        </button>
                        </li>
                   </a>
                        <li class="btn-card position-absolute">
                          <button >
                            <i class="far fa-heart fz-22px text-primary"></i>
                          </button>
                        </li>
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