// document.addEventListener(
//   "DOMContentLoaded", e => {
document.addEventListener('turbolinks:load', function (e) {
    Payjp.setPublicKey("pk_test_8c2bb5e7e6422b6570dc93a0");

    let btn = document.getElementById('payment_card_submit-button');
    btn.addEventListener("click", (e) => {

      e.preventDefault();
      let card = {
        number: $("#card_number").val(),
        cvc: $("#card_cvc").val(),
        exp_month: $("#payment_card_month").val(),
        exp_year: $("#payment_card_year").val(),
      }; 
      console.log(card);


      Payjp.createToken(card, (status, response) => {
        if (status === 200) { 
          // 成功の場合
          $("#number").removeAttr("name");
          $("#cvc").removeAttr("name");
          $("#exp_month").removeAttr("name");
          $("#exp_year").removeAttr("name"); 
          $("#card_token").append(
            $('<input type="hidden" name="payjp_token">').val(response.id)
          );
          document.inputForm.submit();
          // alert("登録が完了しました。"); 
        } else {
          // alert("カード情報が正しくありません。"); 
        }
      });
    });
  },
);