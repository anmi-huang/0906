
$.validator.setDefaults({
    submitHandler: function() {
      alert("提交事件!");
    }
});

$().ready(function() {
    
      $("#form-id").validate({

        submitHandler:function(form){
            alert("提交事件!");   
            form.submit();
        }, 
        rules: {
          firstname: "required",
          lastname: "required",
          address: "required",
          phone: {
            required: true,
            min: 10
          },
        },
        messages: {
          firstname: "請輸入您的名字",
          lastname: "請輸入您的姓氏",
          address: "請輸入您的地址",
          phone: {
            required: "請輸入電話",
            minlength: "必需有10個數字"
          },
         }
        })
    });