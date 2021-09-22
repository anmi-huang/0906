let productsData
let citiesData
const jsTotal=document.querySelector(`#js-total`)
const jsFee=document.querySelector(`#js-fee`)
const jsSum=document.querySelector(`#js-sum`)
const cartNumber=document.querySelector(`#cart-number`)
const cartOrder=document.querySelector(`#cart-order`)
const cartList=document.querySelector(`#cart-list`)
const jsProductRow=document.querySelector(`.js-product-row`)
const productRow = document.querySelector('#product-row')
const jsProductBtn = document.querySelector('#js-product-btn')
const shoppingList = document.querySelector('#shopping-list')

function createProductCard(product,index) {
    return `
  <li class="col-md-6 mb-3 ">
    <div class="card border border-secondary">
        <a href="#" class="text-decoration-none ">
            <div>
                <img src="${product.imgUrl}" class="img-card d-block position-relative w-100">
            </div>
            <div class="card-span position-absolute fz-16px">
                <span class=" text-white fz-16px px-1 py-1">本日精選</span>
            </div>
            <div class="d-flex text-center text-primary fz-18px fz-md-20px">
                <div class="flex-grow-1  ff-ping-fang-tc-light text-cart-font border border-secondary  border-right-0  border-left-0 py-1">${product.itemName}</div>
                <div class="flex-grow-1  ff-ping-fang-tc-semibold border-secondary border border-right-0 py-1 ">NT$ ${product.price}</div>
            </div>
        </a>
    	<button id="js-product-btn" data-addbtn="${index}"  data-cart="${product.id}" class="js-product-row add-item-tr fz-22px fz-md-28px btn-add bg-secondary text-center text-primary w-100 py-2"id="btn-cart" >
    			加入購物車
    	</button>
        <div class="btn-card position-absolute ">
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

    this.addItem = function (idx,pid) {
          
        let list=this.itemList
        const product=productsData[idx] 
        const findIdx = list.findIndex((item)=>item.id===pid)
        if (list[findIdx]) {
            list[findIdx].amount+=1 
        }
        else{
            const item=product
            item.amount=1
            this.itemList.push(item);
            }        
    this.updateDataToStorage();
    this.cartNumberRender();
}   
    this.btnAddItem = function (i) {
        document.querySelector(`#js-count-${i}`).innerHTML =++this.itemList[i].amount 
        this.updateDataToStorage();
        this.countRender(i)
    }
    
    this.btnMinuserItem = function (i) {
        if(this.itemList[i].amount<=1){
            return
        }
        document.querySelector(`#js-count-${i}`).innerHTML =--this.itemList[i].amount 
        this.updateDataToStorage();
        this.countRender(i)
    }
    
    this.deleteItem = function (i,pid) {
        document.querySelector(`#js-item-${i}`).remove()
        const idxRemove = this.itemList.findIndex((item)=>item.id===pid)
        this.itemList.splice(idxRemove,1);
        this.updateTotal();
        this.cartNumberRender();
        this.updateDataToStorage();
    }
  
    this.updateDataToStorage = function () {
        const dataString = JSON.stringify(this.itemList);
        localStorage.setItem(this.key, dataString);
    }

    this.updateTotal=function(){
        let cartValue = 0;
        let cartSum = 0;
        let fee = 300;
        this.itemList.forEach(function(item) {
            const itemValue = item.price * item.amount
            cartValue += itemValue;
            cartSum = cartValue + fee;
        })
        jsTotal.innerHTML = `NT$ ${cartValue}`
        jsFee.innerHTML = `NT$ ${fee}`
        jsSum.innerHTML = `NT$ ${cartSum}`
    }

    this.countRender =function (i){
        document.querySelector(`#js-value-${i}`).innerHTML =`NT$ ${this.itemList[i].amount*this.itemList[i].price}`
        this.updateTotal();
    }

    this.cartNumberRender =function (){
        cartNumber.innerHTML=`
        <span class="cart-number-size rounded-circle w-5 h-5 position-absolute text-center text-primary bg-secondary fz-24"> 
        ${this.itemList.length}
         </span>
         `
    }

    this.render = function () { 
        this.cartNumberRender();
        let cartValue = 0;
        let cartSum = 0;
        let fee=300;
        let str;
        let shpStr;
        this.itemList.forEach(function (item, idx) {
            const itemValue = item.price * item.amount
            cartValue += itemValue;
            cartSum = cartValue+fee;
            const tr =
        `   
         <li id="js-item-${idx}" class=" row g-0 col-md-12 mb-2 pb-2 mx-0 px-0 border-cart border-secondary text-primary align-items-center  justify-content-between ff-ping-fang-tc-semibold  ">
               
            <div class="col-6 col-md-3 pl-0">
                <img src="${item.imgUrl}" class="cart-img w-100 ">
            </div>

            <div class=" row g-0 col-6 col-md-6 ff-ping-fang-tc-light align-items-center">
                <div class="col-md-6 ">
                    <div class="fz-20px">${item.itemName}</div>
                    <div class="ff-Helvetica-neue-regular py-2px">NT$ ${item.price}</div>
                </div>

                <div class="col-md-6 d-flex  ">
                    <button  data-minuser="${idx}" class=" js-minuser  w-6 h-6 ff-ping-fang-tc-light border border-right-0 text-center btn-active"><i class="icon icon-minus text-primary pointer-events-none"></i></button>
                    <div id="js-count-${idx}" class="d-flex justify-content-center align-items-center w-6 h-6 ff-ping-fang-tc-light border border-right-0">${item.amount}</div>
                    <button  data-adder="${idx}" class=" js-adder  w-6 h-6 ff-ping-fang-tc-light  border text-center btn-active"><i class="icon icon-add text-primary pointer-events-none"></i></button></button> 
                </div>   
            </div>

            <div class="col-12 col-md-3 d-flex  px-0"> 
                    <div  id="js-value-${idx}" class="price-border col-md-10 fz-20px py-1 border border-secondary border-right-0 border-left-0  text-right text-md-left ">
                    NT$ ${itemValue}
                    </div>
                    <button id="js-btn" class="col-md-2 d-none d-md-block text-right px-1" data-btn="${idx}" data-pid="${item.id}" ><img src="./img/trash.svg" alt=""class="pointer-events-none w-2">
                    </button>
            </div> 
        </li>
        `
        const list=
        `
             <li id="js-item-${idx}" class=" row g-0 mx-0 px-0 col-md-12  align-items-center ff-ping-fang-tc-semibold  ">
                <div class="col-md-6 ">
                    <img src="${item.imgUrl}" class="cart-img w-100 h-10 px-2">
                </div>
                <div class=" row g-0 col-md-6 ff-ping-fang-tc-light ">
                    <div>
                        <div class="fz-16px">${item.itemName}&nbsp; (${item.amount})</div>
                        <div id="js-value-${idx}" class="fz-20px text-left">NT$ ${itemValue}</div>
                    </div>
                </div>
            </li>
        `;
        str=tr
        if(cartList){
            cartList.innerHTML+=str;
        }
        shpStr=list
        if(shoppingList){
            shoppingList.innerHTML+=shpStr;
        }
      
    });
        if(cartOrder){
            jsTotal.innerHTML =`NT$ ${cartValue}`
            jsFee.innerHTML =`NT$ ${fee}`
            jsSum.innerHTML =`NT$ ${cartSum}` 
        }
    }
}
if(productRow){
    fetch('api/dessert.json').then(resp => resp.json()).then(({ products }) => {
        productsData = products
        let str=" "
        productsData.forEach((product,index) => {
            const card =createProductCard(product,index)
             str+=card
        });
        
        if(productRow){
            productRow.innerHTML=str; 
        }

        productRow.addEventListener('click', (e) => {
            if(e.target.dataset.addbtn){
                const cartId=e.target.dataset.cart*1  
                cart.addItem(e.target.dataset.addbtn,cartId)
            }
        }); 
    });
}
    
const cart = new Cart();
cart.initCart();
     
if(cartList){        
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
        if (target.matches('#js-btn')) {
            const isConfirm = confirm('確定要刪除嗎？')
            index = target.dataset.btn
            const pid = target.dataset.pid*1
            if (isConfirm) {
            cart.deleteItem(index,pid);
            }
        }    
    })
}    