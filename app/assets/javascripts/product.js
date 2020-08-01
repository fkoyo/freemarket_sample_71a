$(document).on('turbolinks:load', function(){
  $(function(){
    let buildPrompt = `<option value>---</option>`
    let buildHtmlOption = function(parent) {
      let option = `<option value ="${parent.id}">${parent.name}</option>`
      return option
    }
    $('#parent').change(function() {
      let parent_id = $(this).val();
      $.ajax({
        type: 'GET',
        url: '/products/new/mid_category',
        data: {big_category_id: parent_id},
        dataType: 'json'
      })
      .done(function(parent) {
        $('.child').css('display', 'block');
        $('#child').empty();
        $('.grand_child').css('display', 'none');
        $('#child').append(buildPrompt);

        parent.forEach(function(child) {
          var html_option = buildHtmlOption(child);
          $('#child').append(html_option);
        });
      })
      .fail(function() {
        alert('aaaa')
      });
    });

    $(this).on("change", "#child", function() {
      let parent_id = $("#parent").val();
      let child_id = $("#child").val();

      $.ajax({
          type: 'GET',
          url: '/products/new/small_category',
          data: {
            big_category_id: parent_id,
            mid_category_id: child_id
          },
          dataType: 'json'
      })
      .done(function(parent) {
        $('.grand_child').css('display', 'block');
        $('#grand_child').empty();
        $('#grand_child').append(buildPrompt);

        parent.forEach(function(child) {
          var html_option = buildHtmlOption(child);
          $('#grand_child').append(html_option);
        });
      })
    });
  })

  $(function(){

    //プレビューのhtmlを定義
    function buildHTML(count) {
      var html = `<div class="preview-box" id="preview-box__${count}">
                    <div class="upper-box">
                      <img src="" alt="preview">
                    </div>
                    <div class="lower-box">
                      <div class="delete-box" id="delete_btn_${count}">
                        <span>削除</span>
                      </div>
                    </div>
                  </div>`
      return html;
    }

    // ラベルのwidth操作
    function setLabel() {
      //プレビューボックスのwidthを取得し、maxから引くことでラベルのwidthを決定
      var prevContent = $('.label-content').prev();
      labelWidth = (770 - $(prevContent).css('width').replace(/[^0-9]/g, ''));
      $('.label-content').css('width', labelWidth);
    }

    // プレビューの追加
    $(document).on('change', '.hidden-field', function() {
      setLabel();
      //hidden-fieldのidの数値のみ取得
      var id = $(this).attr('id').replace(/[^0-9]/g, '');
      //labelボックスのidとforを更新
      $('.label-box').attr({id: `label-box--${id}`,for: `product_photos_attributes_${id}_name`});
      //選択したfileのオブジェクトを取得
      var file = this.files[0];
      var reader = new FileReader();
      //readAsDataURLで指定したFileオブジェクトを読み込む
      reader.readAsDataURL(file);
      //読み込み時に発火するイベント
      reader.onload = function() {
        var image = this.result;
        //プレビューが元々なかった場合はhtmlを追加
        if ($(`#preview-box__${id}`).length == 0) {
          var count = $('.preview-box').length;
          var html = buildHTML(id);
          //ラベルの直前のプレビュー群にプレビューを追加
          var prevContent = $('.label-content').prev();
          $(prevContent).append(html);
        }
        //イメージを追加
        $(`#preview-box__${id} img`).attr('src', `${image}`);
        var count = $('.preview-box').length;
        //プレビューが5個あったらラベルを隠す 
        if (count == 5) { 
          $('.label-content').hide();
        }

        //ラベルのwidth操作
        setLabel();
        //ラベルのidとforの値を変更
        if(count < 5){
          //プレビューの数でラベルのオプションを更新する
          $('.label-box').attr({id: `label-box--${count}`,for: `product_photos_attributes_${count}_name`});
        }
      }
    });

    // 画像の削除
    $(document).on('click', '.delete-box', function() {
      var count = $('.preview-box').length;
      setLabel(count);
      //item_images_attributes_${id}_image から${id}に入った数字のみを抽出
      var id = $(this).attr('id').replace(/[^0-9]/g, '');
      //取得したidに該当するプレビューを削除
      $(`#preview-box__${id}`).remove();
      //フォームの中身を削除 
      $(`#product_photos_attributes_${id}_name`).val("");

      //削除時のラベル操作
      var count = $('.preview-box').length;
      //5個めが消されたらラベルを表示
      if (count == 4) {
        $('.label-content').show();
      }
      setLabel(count);

      if(id < 5){
        //削除された際に、空っぽになったfile_fieldをもう一度入力可能にする
        $('.label-box').attr({id: `label-box--${id}`,for: `product_photos_attributes_${id}_name`});
      }
    });
  });
})
