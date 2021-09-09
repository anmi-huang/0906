let productsData
const productRow = document.querySelector('#product-row')


function createProductCard(product) {
    const cardElement=`
    <li class="col-md-6 mb-3">
    <div class="card border border-secondary">
    <a href="#" class="text-decoration-none ">
        <div>
            <img src="${product.imgUrl}" class="img-card d-block position-relative w-100">
        </div>
        <div class="text-card position-absolute fz-16px">
            <span class=" text-white fz-16px px-1 py-1">本日精選</span>
        </div>
        <div class="d-flex text-center text-primary fz-18px fz-md-20px">
           <div class="flex-grow-1  ff-ping-fang-tc-light text-cart-font border border-secondary  border-right-0  border-left-0 py-1">${product.itemName}</div>
           <div class="flex-grow-1  ff-ping-fang-tc-semibold border-secondary border border-right-0 py-1 ">NT$ ${product.price}</div>
        </div>
    </a>
   <form data-product-id="${product.id}" class="add-item-tr" >
        <div class="fz-22px fz-md-28px">
        <button id="btn-product-row'" class="btn-add bg-secondary text-center text-primary w-100 py-2"id="btn-cart" type="submit">
            加入購物車
        </button>
        </div>
    </form>
        <div class="btn-card position-absolute">
          <button >
            <i class="far fa-heart fz-22px text-primary"></i>
          </button>
        </div>
    </div>
</li>
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
                const localDataString = localStorage.getItem(this.key);
                if (localDataString) {
                    this.itemList = JSON.parse(localDataString);
                }
                this.render();
            }

            this.addItem = function (pid, amount) {
                const product=productsData[pid]
                product==pid
                const item = {
                imgUrl:product.imgUrl,   
                itemName: product.itemName,
                price: product.price,
                pid: pid,
                amount: amount,
                }; 
                this.itemList.push(item);
                this.render();  
            }
           
            this.btnAddItem = function (pid, amount) {
                const product=productsData[pid]
                product==pid
                amount+=1
                this.render();  
            }

            this.minuserItemCart = function (pid,amount) {
                const product=productsData[pid]
                product==pid
                product.amount
                product.amount=parseInt(amount)+1;
                countnum.innerHTML=amount;

                this.render(); 
            }

            this.deleteItem = function (i) {
                this.itemList.splice(i, 1);
                this.render();
            }
          
            
            this.updateDataToStorage = function () {
                const dataString = JSON.stringify(this.itemList);
                localStorage.setItem(this.key, dataString);
            }
            
            this.render = function () { 
                this.updateDataToStorage();


                $("#cart-number").html(`
                <span class="cart-number-size position-absolute text-center text-primary bg-secondary fz-24"> 
                ${this.itemList.length}
                 </span>`);

                const $cartList = $('#cart-list');
                const $cartOrder = $('#cart-order');

                $cartList.empty();

            
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
                `   
                 <li class=" p-cart col-md-12 px-4 py-4 border-secondary text-primary row d-flex align-items-center ff-ping-fang-tc-semibold ">
                       
                    <div class="col-6 col-md-3 mb-1">
                            <img src="${item.imgUrl}" class="img-cart w-100 d-block  ">
                    </div>
                    <div class="col-6 col-md-6 row mb-1 ff-ping-fang-tc-light d-flex align-items-center pl-2">
                            <ul class="px-1 col-md-6 my-auto"">
                               <li class="fz-20px">${item.itemName}</li>
                               <li class="ff-Helvetica-neue-regular ">NT$ ${item.price}</li>
                             </ul> 
                            <div class="col-md-6 d-flex ay-auto button-list">
                               <button id="btn-list-adder" data-cart-adder="${item.pid}" class=" ff-ping-fang-tc-light  border border-right-0 text-center button-hover">-</button>
                               <button  class="ff-ping-fang-tc-light border border-right-0 text-center ">${item.amount}</button>
                               <button id="btn-list-minuser" data-cart-minuser="${item.pid}" class="ff-ping-fang-tc-light border text-center  button-hover ">+</button>
                            </div>   
                    </div>
                    <div class="col-12 col-md-3 d-flex "> 
                             <div class="border-price col-md-10 fz-20px py-1  border border-secondary border-right-0 border-left-0  text-right text-md-left ">
                               NT$ ${item.price}
                             </div>
                             <button class="col-md-2 d-none d-md-block text-right " data-item-index="${idx}"><img src="./img/trash.svg" alt=""class="remove-btn w-2">
                             </button>
                    </div>    
                </div>  
            </li>
                `;
                $cartList.append(tr);
                });
                $cartOrder.html(
                    `
                    <div class="order-list ">
                    <div class="px-2 pb-2">
                      <div class="text-center text-primary py-2 px-auto fz-24px  bg-order">
                      訂單摘要
                      </div>
        
                        <div>
                            <div class=" d-flex justify-content-between ff-ping-fang-tc-light fz-16px pt-2 pb-1">
                                <div>小計</div>
                                <div class="text-right">NT$ ${cartValue} </div>
                            </div>
                            <div class="d-flex justify-content-between ff-ping-fang-tc-light fz-16px ">
                                <div>運費</div>
                                <div class="text-right">NT ${fee} </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between fz-20px">
                            <div class="pt-2">總計</div>
                            <div class="pt-2 text-right">NT$ ${cartSum} </div>
                        </div>
                    </div>    
                        <div class="d-none d-md-block  bg-yellow  text-center py-2 fz-24px   ff-ping-fang-tc-semibold ">
                           <a href="#" class="text-primary text-decoration-none ">
                            結帳
                            </a>
                         </div>
                    </div> 
                    `);
                 
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

        $(".add-item-form").click(function (e) {
            e.preventDefault();
        });
      
        $("#cart-list").delegate('.remove-btn', 'click', function () {
            let idx = $(this).attr('data-item-index');
            idx = parseInt(idx);
            cart.deleteItem(idx);
    });
       
        // $("#btn-list-adder").delegate('click', function () {
        // const btnAdderId = $(this).attr("data-cart-adder")
        // let amount = 1; 
        // cart.btnAddItem(btnAdderId, amount);
        // });

//     $("#btn-list-minuser").delegate('click', function () {
//       const btnMinuseId = $(this).attr("data-cart-minuser")
//       let amount = 1; 
//       cart.minuserItemCart(btnMinuseId, amount);
//   });


});  





