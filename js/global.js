let productsData
const productRow = document.querySelector('#product-row')
const countnum = document.querySelector('.countnum')



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
            </a>
            <form data-product-id="${product.id}" class="add-item-tr">
                 <li class="fz-22px fz-md-28px">
                 <button class="bg-secondary text-center text-primary w-100 py-2"id="btn-cart" type="submit">
                     加入購物車
                 </button>
                 </li>
             </form>
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
        let str=" "
        productsData.forEach(product => {
            const card =createProductCard(product)
            str+=card
        });
        if(productRow){
            productRow.innerHTML=str;  
        }


        function Cart() {
            this.key = 'example-cart';
            this.itemList = [];
            this.initCart = function () {
            }

            this.addItem = function (pid, amount) {
                const product = productsData.find(function (p) {
                    return p.id == pid;
                }); 
                const item = {
                itemName: product.itemName,
                price: product.price,
                pid: pid,
                amount: amount,
                }; 
                this.itemList.push(item);
                console.log(this.itemList);
                this.render();
              
            }
        
            // 至購物車刪除於購物車內指定索引商品
            this.deleteItem = function (i) {
                this.itemList.splice(i, 1);
                this.render();
            }
          
            // 更新資料到localStorage
            this.updateDataToStorage = function () {
                const dataString = JSON.stringify(this.itemList);
                localStorage.setItem(this.key, dataString);
            }
            // 渲染購物車
            this.render = function () { 
                this.updateDataToStorage();
                const $cartList = $('#cart-list');
                // const $cartOrder = $('#cart-order');

                $("#cartNumber").html(`
                <span class="cartNumber1"> 
                ${this.itemList.length}
                 </span>`);

                //  小結 
                let cartValue = 0;
                // 總額
                let cartSum = 0;
                //運費300
                let fee=300;
                 
                this.itemList.forEach(function (item, idx) {
                    console.log(item);
                    const itemValue = item.price * item.amount
                    cartValue += itemValue;
                    cartSum = cartValue+fee;
                    const tr =
                `   <div class="col-md-12 py-3 border border-top-0 border-right-0 border-left-0  border-secondary text-primary ">
                    <table class="w-100">
                    <tboby class="row">
                           <tr class="ff-ping-fang-tc-light fz-20x fz-md-20px ">
                               <td><img src="${item.imgUrl}" class="img-cart d-block mx-0 ">
                               </td>
                               <td>
                                   <ul class="px-4">
                                   <li class="py-0">${item.itemName}</li>
                                   <li class=" py-0 fz-16x fz-md-16px">NT$ ${item.price}</li>
                                   </ul> 
                                </td>
                                <td>
                                  <div class=" button-list d-flex justify-content-center ff-ping-fang-tc-light fz-16x fz-md-16px ">
                                  <ul class="counter">
                                  <li id="minus"><input type="button" onclick="minuser()" value="-"/></li>
                                  <li id="amount-input${item.id}"class="countnum">1</li>
                                  <li id="plus"><input type="button" onclick="adder()" value="+"/></li>
                                  </ul>
                                  </div>
                                </td>
                                <td>
                                   <div class="ff-ping-fang-tc-semibold py-1 px-3 text-center ">NT$ ${item.price}</div>
                                </td>
          
                                <td>
                                   <button data-item-index="${idx} ><img src="./img/trash.svg" alt="" class="w-2 "></button>
                                </td>
                           </tr>
                    </tboby>
                    </table>  
                    </div> `;
                   $cartList.append(tr);
                });

            
                 
            }
        }


        const cart = new Cart();
                cart.initCart();
  
        $('#product-row form').submit(function(e){
            e.preventDefault();
            const pid = $(this).attr("data-product-id");
            let amount = 1;
            cart.addItem(pid, amount);
        });

        // 綁定新增商品至購物車的表單送出事件
        $(".add-item-tr").submit(function (e) {
        e.preventDefault();
        });

        //動態綁定移除單一品項的點擊事件
        
});  





