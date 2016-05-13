$(function() {

  var _w = 456;
  var _h = 344;
  var _old = {};
  var _new = {};

  $(".upload-btn input").on("change", function() {
    var _this = $(this);
    var fr = new FileReader();

    fr.readAsDataURL(this.files[0]);

    //文件类型为图片时
    if (this.files[0].type.match("^image/*") != null) {

      //判断图片大小不得大于5M
      if (this.files[0].size / 1024 / 1024 < 5) {
        //获取上传图片标识
        var btn = _this.parent();
        //预览图片
        showPic(fr, btn);


      } else {
        alert("上传图片不能超过5M");
      }
    } else {
      alert("请上传图片");
    }


  });

  //预览图片
  function showPic(fr, btn) {
    var img = new Image();

    //btn.hide();
    var upImg = btn.siblings(".upload-img");
    upImg.addClass("loading");


    fr.onload = function() {
      btn.hide();
      img.src = this.result;
      //console.log('img.src === '+ img.src);
      img.onload = function() {
        btn.siblings(".upload-img").append(img);
        var ratio = 1;
        if (img.width > img.height) {
          upImg.find("img").addClass("mh");
          ratio = _h / img.height;
        } else {
          upImg.find("img").addClass("mw");
          ratio = _w / img.width;
        }


        //setTimeout(function() {
        //显示图片和添加图片标识
        btn.show();
        upImg.removeClass("loading").find("img").css("opacity", 1);


        //右移动上传图片标识
        var loadpic_left = parseFloat(btn.css('left')); //如:100.5px获取数字100.5
        btn.css('left', ((loadpic_left.toString() == 'NaN' ? 0 : loadpic_left) + 100) + 'px');

        //最多上传三张图片
        if (upImg.find('img').length >= 3) {
          btn.hide();
        }

        //图片上传到服务器
        // uploadImage(img.src);
        //}, 1000);

      }
    }
  }

  //上传图片
  //参数 image表示图片的编码字符串
  //返回：无
  function uploadImage(image) {

    $.ajax({

      type: 'POST',
      url: 'http://10.3.254.54:8001/uploadFile/uploadByFileSuffix',
      data: {
        file: image,
        fileSuffix: 'jpg',
        appSystem: 'dv'
      },
      async: false,
      dataType: 'json',
      success: function(data) {
        if (data.success) {
          alert('上传成功');
        } else {
          alert('上传失败');
        }
      },

      error: function(err) {
        alert('网络故障');
      }

    });

  }



});
