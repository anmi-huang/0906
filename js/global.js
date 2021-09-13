const $cartList = $('#cart-list');
const $cartOrder = $('#cart-order');

function createProductCard(product,index) {
    return `
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
    	<button data-product-id="${index}" class=" js-prodoct-row add-item-tr fz-22px fz-md-28px btn-add bg-secondary text-center text-primary w-100 py-2"id="btn-cart" >
    			加入購物車
    	</button>
        <div class="btn-card position-absolute">
            <button >
                <i class="far fa-heart fz-22px text-primary"></i>
            </button>
        </div>
    </div>
  </li>
    `;
}

function Cart() {
    this.key ='example-cart';
    this.itemList = [];
    this.initCart = function () {
        const localDataString = localStorage.getItem(this.key);
        if (localDataString) {
            this.itemList = JSON.parse(localDataString);
        }
        this.render();
    }
    
    this.addItem = function (pid) {
        const product=productsData[pid]
        // console.log("product",product.id)
        // console.log("id",pid)
        // console.log("購物車",this.itemList)
        if (this.itemList[pid]) {
            this.itemList[pid].amount+=1
         } else {
            let amount = 1;
            const item = {
                imgUrl:product.imgUrl,   
                itemName:product.itemName,
                price:product.price,
                pid:pid,
                amount:amount,
                }; 
                this.itemList.push(item);
         }
         
        this.updateDataToStorage();
        this.render(); 
    }
   
    this.btnAddItem = function (i) {
        this.itemList[i].amount+=1
        
        this.updateDataToStorage();
        // this.render(); 
    }

    this.btnMinuserItem = function (i) {
        if(this.itemList[i].amount<=1){
            this.itemList[i].amount=1;
        }else{
            this.itemList[i].amount-=1  
        }
        
        this.updateDataToStorage();	
        this.render(); 
        
    }

    this.deleteItem = function (i) {
        this.itemList.splice(i, 1);
        this.updateDataToStorage();
        this.render();
    }
  
    this.updateDataToStorage = function () {
        const dataString = JSON.stringify(this.itemList);
        localStorage.setItem(this.key, dataString);
    }
    
    this.render = function () { 

        $("#cart-number").html(`
        <span class="cart-number-size w-5 h-5 position-absolute text-center text-primary bg-secondary fz-24"> 
        ${this.itemList.length}
         </span>
         `);

        $cartList.empty();
        let cartValue = 0;
        let cartSum = 0;
        let fee=300;
        
        this.itemList.forEach(function (item, idx) {
            // console.log(item);
            const itemValue = item.price * item.amount
            cartValue += itemValue;
            cartSum = cartValue+fee;
            const tr =
        `   
         <li class=" row g-0 col-md-12 mb-2 pb-2 mx-0 px-0 border-cart border-secondary text-primary align-items-center  justify-content-between ff-ping-fang-tc-semibold  ">
               
            <div class="col-6 col-md-3 pl-0">
                <img src="${item.imgUrl}" class="img-cart w-100 ">
            </div>

            <div class=" row g-0 col-6 col-md-6 ff-ping-fang-tc-light align-items-center">
                <div class="col-md-6 ">
                    <div class="fz-20px">${item.itemName}</div>
                    <div class="ff-Helvetica-neue-regular py-2px">NT$ ${item.price}</div>
                </div>

                <div class="col-md-6 d-flex  ">
                    <button data-minuser="${idx}" class=" js-minuser w-6 h-6 ff-ping-fang-tc-light border border-right-0 text-center border-button"><i class="icon icon-minus text-primary"></i></button>
                    <div class="d-flex justify-content-center align-items-center w-6 h-6 ff-ping-fang-tc-light border border-right-0">${item.amount}</div>
                    <button data-adder="${idx}" class=" js-adder  w-6 h-6 ff-ping-fang-tc-light  border text-center border-button"><i class="icon icon-add text-primary"></i></button></button> 
                </div>   
            </div>

            <div class="col-12 col-md-3 d-flex  px-0"> 
                    <div class="border-price col-md-10 fz-20px py-1 border border-secondary border-right-0 border-left-0  text-right text-md-left ">
                    NT$ ${itemValue}
                    </div>
                    <button class="col-md-2 d-none d-md-block text-right pr-0 " data-index="${idx}"><img src="./img/trash.svg" alt=""class="js-remove-btn w-2">
                    </button>
            </div> 
        </li>

        `;
        $cartList.append(tr);
        });
        $cartOrder.html(
            `
         <div class="order-list ">
            <div class="p-order">
                <div class="text-center text-primary py-2 px-auto fz-24px  bg-order">訂單摘要</div>
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
                    <a href="#" class="text-primary text-decoration-none ">結帳</a>
                </div>
        </div> 
            `);
    }
}

fetch('api/dessert.json').then(resp => resp.json()).then(({ products }) => {
        
        productsData = products
        let str=" "
        productsData.forEach((product,index) => {
            const card =createProductCard(product,index)
            str+=card
        });

        // const productRow = document.querySelector('#product-row')
        // if(productRow){
        //     productRow.innerHTML=str;  
        // }
        const $productRow = $("#product-row")  
        if($productRow){
            $productRow.html(str)
        }
        const cart = new Cart();
                cart.initCart();
  
        $(".js-prodoct-row").click(function(e){
            e.preventDefault();
            const pid = $(this).attr("data-product-id");
            cart.addItem(pid);
        });

        // $("#cart-list").delegate('.js-remove-btn', 'click', function () {
        //     let idx = $(this).attr('data-index');
        //     idx = parseInt(idx);
        //     const isConfirm = confirm('確定要刪除嗎？')  
        //     if (isConfirm) {
        //         cart.deleteItem(idx);
        //     }
        //  });
       
        // $("#cart-list").delegate('.js-adder','click', function () {
        //     let idx = $(this).attr('data-adder');
        //     idx = parseInt(idx);
        //     cart.btnAddItem(idx);
        // });

        // $("#cart-list").delegate('.js-minuser','click', function () {
        //     let idx = $(this).attr('data-minuser');
        //     idx = parseInt(idx);
        //     cart.btnMinuserItem(idx);
        // });
        
    
        const cartList = document.querySelector('#cart-list')
        cartList.addEventListener('click', (e) => {
            const target = e.target
            let index
            if (target.matches('.js-adder')) {
                index = target.dataset.adder
                cart.btnAddItem(index);
            }
            if (target.matches('.js-minuser')) {
                index = target.dataset.minuser
                cart.btnMinuserItem(index);
            }
            if (target.matches('.js-remove-btn')) {
                const isConfirm = confirm('確定要刪除嗎？')
                index = target.dataset.index
                if (isConfirm) {
                    cart.deleteItem(index);
                }
            }
        })
});  





