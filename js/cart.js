
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
