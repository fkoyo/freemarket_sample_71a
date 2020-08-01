$(document).on('turbolinks:load', function() {
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

    if (window.location.href.match(/\/products\/\d+\/edit/)){
      var prevContent = $('.label-content').prev();
      labelWidth = (620 - $(prevContent).css('width').replace(/[^0-9]/g, ''));
      $('.label-content').css('width', labelWidth);
      $('.preview-box').each(function(index, box){
        $(box).attr('id', `preview-box__${index}`);
      })
      $('.delete-box').each(function(index, box){
        $(box).attr('id', `delete_btn_${index}`);
      })
      var count = $('.preview-box').length;
      if (count == 5) {
        $('.label-content').hide();
      }
    }

    function setLabel() {
      var prevContent = $('.label-content').prev();
      labelWidth = (620 - $(prevContent).css('width').replace(/[^0-9]/g, ''));
      $('.label-content').css('width', labelWidth);
    }

    // プレビューの追加
    $(document).on('change', '.hidden-field', function() {
      setLabel();
    
      var id = $(this).attr('id').replace(/[^0-9]/g, '');
      $('.label-box').attr({id: `label-box--${id}`,for: `product_photos_attributes_${id}_name`});
      var file = this.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        var name = this.result;
        if ($(`#preview-box__${id}`).length == 0) {
          var count = $('.preview-box').length;
          var html = buildHTML(id);
          var prevContent = $('.label-content').prev();
          $(prevContent).append(html);
        }

        $(`#preview-box__${id} img`).attr('name', `${name}`);
        var count = $('.preview-box').length;
        if (count == 5) { 
          $('.label-content').hide();
        }

        if ($(`#product_photos_attributes_${id}__destroy`)){
          $(`#product_photos_attributes_${id}__destroy`).prop('checked',false);
        } 

        setLabel();
        if(count < 5){
          $('.label-box').attr({id: `label-box--${count}`,for: `product_photos_attributes_${count}_name`});
        }
      }
    });

    // 画像の削除
    $(document).on('click', '.delete-box', function() {
      var count = $('.preview-box').length;
      setLabel(count);
      var id = $(this).attr('id').replace(/[^0-9]/g, '');
      $(`#preview-box__${id}`).remove();
      // var count2 = $(".hidden-field").length;
      // setLabel(count2);
      // var id2 = $(this).attr('id').replace(/[^0-9]/g, '');
      // console.log(id)
      // $(`#item_item_images_attributes_${id}_image`).remove();
      $(`input[name="product[photos_attributes][${id}][_destroy]"]`).val(1);

      // $(`#item_item_images_attributes_${id}_image`).remove();
      // var t =$(`#item_item_images_attributes_${id}_image`).val();
      // console.log(t)
      //新規登録時と編集時の場合分け==========================================================

      //新規投稿時
      //削除用チェックボックスの有無で判定
      if ($(`#product_photos_attributes_${id}__destroy`).length == 0) {
      // if ($(`product[name="item[item_images_attributes][${id}][_destroy]"]`).length == 0) {
        //フォームの中身を削除 
        // check
        // $(`input[name="item[item_images_attributes][${id}][_image]"]`).val("");
        $(`#product_photos_attributes_${id}_name`).val("");
        var count = $('.preview-box').length;
        //5個めが消されたらラベルを表示
        if (count == 4) {
          $('.label-content').show();
        }
        setLabel(count);
        if(id < 5){
          // $('.label-box').attr({id: `label-box--${id}`,for: $(`input[name="item[item_images_attributes][${id}][_image]"]`)});
          $('.label-box').attr({id: `label-box--${id}`,for: `product_photos_attributes_${id}_name`});

        }
      } else {
        //投稿編集時
        // $(`input[name="item[item_images_attributes][${id}][_destroy]"]`).prop('checked',true);
        $(`#product_photos_attributes_${id}__destroy`).prop('checked',true);
        if (count == 4) {
          $('.label-content').show();
        }
        setLabel();
        if(id < 5){
          // $('.label-box').attr({id: `label-box--${id}`,for: `input[name="item[item_images_attributes][${id}][_image]"]`});
          $('.label-box').attr({id: `label-box--${id}`,for: `product_photos_attributes_${id}_name`});
        }
      }
      //=============================================================================
    });
    // 画像の編集
    $(document).on('click', '.update-box', function() {
      var index_num = $(this).data("image-index");
    
    $(`#product_photos_attributes_${index_num}_name`).click();
      });
  });
})