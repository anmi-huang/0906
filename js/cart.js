
// 數字增加
function adder(){
	var count=countnum.innerHTML;
	count=parseInt(count)+1;
	countnum.innerHTML=count;
}
function minuser(){
	var count=countnum.innerHTML;
	if(count<=0){
		count=0;
	}else{
		count=parseInt(count)-1;
	}	
	countnum.innerHTML=count;
}

				// 	<ul class="counter">
                //     <li id="minus"><input type="button" onclick="minuser()" value="-"/></li>
                //     <li id="countnum">1</li>
                //     <li id="plus"><input type="button" onclick="adder()" value="+"/></li>
                // </ul> -->
                // <!-- <button id="minus" class=" border border-right-0 text-center button-hover">-
                // </button>
                // <button  id=""amountInput${product.id} class="border border-right-0 text-center ">1
                //    </button>
                // <button id="plus" class=" border text-center button-hover ">+
                // </button>   
              

				// ul,li{margin:0; padding:0; }
				// .counter li{float:left; list-style-type:none; width:30px; height:30px; text-align:center; line-height:30px; border:#999 thin solid; background-color:#fff}
				// .counter li input{font-size:20px; width:100%; height:100%; outline:none; -webkit-appearance:none; background:none; margin:0; padding:0; border: 1px solid transparent; border-radius: 0;}
				// #countnum{ border-left:hidden; border-right:hidden; color:#666}
		

			// 	<li class="col-md-6 mb-3">
			// 	<div class="card border border-secondary">
			// 	<a href="#" class="text-decoration-none ">
			// 		<div>
			// 			<img src="${product.imgUrl}" class="img-card d-block position-relative w-100">
			// 		</div>
			// 		<div class="text-card position-absolute fz-16px">
			// 			<span class=" text-white fz-16px px-1 py-1">本日精選</span>
			// 		</div>
			// 		<div class="d-flex text-center text-primary fz-18px fz-md-20px">
			// 		   <div class="flex-grow-1  ff-ping-fang-tc-light text-cart-font border border-secondary  border-right-0  border-left-0 py-1">${product.itemName}</div>
			// 		   <div class="flex-grow-1  ff-ping-fang-tc-semibold border-secondary border border-right-0 py-1 ">NT$ ${product.price}</div>
			// 		</div>
			// 	</a>
			//    <form data-product-id="${product.id}" class="add-item-tr" >
			// 		<div class="fz-22px fz-md-28px">
			// 		<button id="btn-product-row" class="btn-add bg-secondary text-center text-primary w-100 py-2"id="btn-cart" type="submit">
			// 			加入購物車
			// 		</button>
			// 		</div>
			// 	</form>
			// 		<div class="btn-card position-absolute">
			// 		  <button >
			// 			<i class="far fa-heart fz-22px text-primary"></i>
			// 		  </button>
			// 		</div>
			// 	</div>
			// </li>