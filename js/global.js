let productsData
const productRow = document.querySelector('#product-row')
const countnum = document.querySelector('#countnum')



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
                const localDataString = localStorage.getItem(this.key);
                if (localDataString) {
                    this.itemList = JSON.parse(localDataString);
                }
                this.render();
            }

            this.addItem = function (pid, amount) {
                const product = productsData.find(function (p) {
                    return p.id == pid;
                }); 
                const item = {
                imgUrl:product.imgUrl,   
                itemName: product.itemName,
                price: product.price,
                pid: pid,
                amount: amount,
                }; 
                this.itemList.push(item);
                console.log(this.itemList);
                this.render();  
            }

            this.addItemCart = function (pid, amount) {
        
            }
        
           
            this.deleteItem = function (i) {
                this.itemList.splice(i, 1);
                this.render();
            }
          
            
            this.updateDataToStorage = function () {
                const dataString = JSON.stringify(this.itemList);
                localStorage.setItem(this.key, dataString);
            }
            
            // 數字增加
           this.adder=function (){
	       var count=countnum.innerHTML;
	       count=parseInt(count)+1;
	       countnum.innerHTML=count;
            }
           this.minuser=function (){
	       var count=countnum.innerHTML;
	       if(count<=0){
		    count=0;
	       }else{
		    count=parseInt(count)-1;
	        } 	
	         countnum.innerHTML=count;
            }

            this.render = function () { 
                this.updateDataToStorage();


                $("#cartNumber").html(`
                <span class="cartNumber1"> 
                ${this.itemList.length}
                 </span>`);

                const $cartList = $('#cart-list');
                const $cartOrder = $('#cart-order');
                $cartList.empty();
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
                                   <button data-item-index="${idx}" ><img src="./img/trash.svg" alt="" class=" remove-btn w-2 "></button>
                                </td>
                           </tr>
                    </tboby>
                    </table>  
                    </div> `;
                   $cartList.append(tr);
                });
                $cartOrder.html(
                    `<table class="w-100">
                        <p>訂單摘要</p>
                        <hr>
                        <tboby>
                            <tr class=" ff-ping-fang-tc-light fz-16x fz-md-16px">
                                <td>小計</td>
                                <td class="text-right">NT$ ${cartValue} </td>
                            </tr>
                            <tr class=" ff-ping-fang-tc-light fz-16x fz-md-16px">
                                <td>運費</td>
                                <td class="text-right">NT ${fee} </td>
                            </tr>
                        </tboby>
                        <tfoot class="fz-20x fz-md-20px ">
                            <td class="pt-2">總計</td>
                            <td class="pt-2 text-right">NT$ ${cartSum} </td>
                        </tfoot>
                    </table> `);
                 
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

        $(".add-item-tr").submit(function (e) {
        e.preventDefault();
        });

        $("#cart-list").delegate('.remove-btn', 'click', function () {
            let idx = $(this).attr('data-item-index');
            idx = parseInt(idx);
            cart.deleteItem(idx);
    });
       
        $("#cart-list").delegate('.remove-btn', 'click', function () {
        let idx = $(this).attr('data-item-index');
        idx = parseInt(idx);
        cart.deleteItem(idx);
});


});  





