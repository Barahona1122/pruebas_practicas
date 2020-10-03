var Captcha = {
  init: function(){
    console.log("Started!");
    this.actions();
    this.ListUser();
    var cd;
  },
  actions: function(){
    let _this = this;
    this.CreateCaptcha();

    $(document).on("click",".BtnReloadCaptcha", function(){
      _this.CreateCaptcha();
    });

    $(document).on("click",".BtnRegister", function(){
      if(_this.CheckCaptcha()){
        _this.Ajax();
      }
    });

    $(document).on("click","#btnNew", function(){
      $("#exampleModal").modal("show");
      $("#frmDates")[0].reset();
      $("#OperationType").val("2");

      $("#RowCaptcha").css("display","block");
      $(".BtnRegister").css("display","block");
      $(".BtnReUpdate").css("display","none");
    });

     $(document).on("click",".btnEdit", function(){
        $("#exampleModal").modal("show");
        $("#OperationType").val("3");
        $("#RowCaptcha").css("display","none");
        $(".BtnRegister").css("display","none");
        $(".BtnReUpdate").css("display","block");
        _this.EditUser($(this).data('id'));

    });

     $(document).on("click",".BtnReUpdate", function(){
        $("#OperationType").val("4");
        _this.Ajax();
     });
     $(document).on("click",".btnDestroy", function(){
        $("#OperationType").val("5");
        $("#id").val($(this).data('id'));
        $("#user_name").append($(this).data('name'));
        $("#delete_modal").modal("show");
     });

     $(document).on("click",".btnConfirm", function(){
        _this.Ajax();
     });

  },

  CreateCaptcha: function() {
    let _this = this;
    var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
                      
    var i;
    for (i = 0; i < 6; i++) {
      var a = alpha[Math.floor(Math.random() * alpha.length)];
      var b = alpha[Math.floor(Math.random() * alpha.length)];
      var c = alpha[Math.floor(Math.random() * alpha.length)];
      var d = alpha[Math.floor(Math.random() * alpha.length)];
      var e = alpha[Math.floor(Math.random() * alpha.length)];
      var f = alpha[Math.floor(Math.random() * alpha.length)];
    }
    _this.cd = a + ' ' + b + ' ' + c + ' ' + d + ' ' + e + ' ' + f;
    $('#CaptchaImageCode').empty().append('<canvas id="CapCode" class="capcode" width="300" height="80"></canvas>')
    
    var c = document.getElementById("CapCode"),
        ctx=c.getContext("2d"),
        x = c.width / 2,
        img = new Image();
   
    img.src = "https://webdevtrick.com/wp-content/uploads/captchaback.jpg";
    img.onload = function () {
        var pattern = ctx.createPattern(img, "repeat");
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.font="46px Roboto Slab";
        ctx.fillStyle = '#212121';
        ctx.textAlign = 'center';
        ctx.setTransform (1, -0.12, 0, 1, 0, 15);
        ctx.fillText(_this.cd,x,55);
    };
  },
   
  ValidateCaptcha: function() {
    let _this = this;
    var string1 = _this.removeSpaces(_this.cd);
    var string2 = _this.removeSpaces($('#UserCaptchaCode').val());
    if (string1 == string2) {
      return true;
    }
    else {
      return false;
    }
    alert(_this.cd);
  },
   
  // Remove Spaces
  removeSpaces: function(string) {
    return string.split(' ').join('');
  },

  CheckCaptcha: function() {
    let _this = this;
    var IsAllowed = false;
    var result = _this.ValidateCaptcha();
    if( $("#UserCaptchaCode").val() == "" || $("#UserCaptchaCode").val() == null || $("#UserCaptchaCode").val() == "undefined") {
      $('#WrongCaptchaError').text('Por favor ingresa Captcha!').show();
      $('#UserCaptchaCode').focus();
    } else {
      if(result == false) {
        IsAllowed = false;
        $('#WrongCaptchaError').text('Captcha no válido!').show();
        _this.CreateCaptcha();
        $('#UserCaptchaCode').focus().select();
      }
      else {
        IsAllowed = true;
        $('#UserCaptchaCode').val('').attr('place-holder','Ingresar Captcha!');
        _this.CreateCaptcha();
        $('#WrongCaptchaError').fadeOut(100);
        $('#SuccessMessage').fadeIn(500).css('display','block').delay(5000).fadeOut(250);
      }
    }
    return IsAllowed;
  },

  ListUser:function(){

    $.ajax({
      url:"classes/AjaxUsers.php",
      method: 'POST',
      dataType:'JSON',
      data:{'OperationType': '1'}
    })
    .done(function(response){
      let option = '';
      $("#tblRow").empty();
      if(response.length > 0){
          option+='<table class="table table-responsive">';
            option+='<thead>';
              option+='<tr>';
                option+='<th width="250px"> Nombre(S) </th>';
                option+='<th width="250px"> Apellidos </th>';
                option+='<th width="250px"> Correo    </th>';
                option+='<th width="250px"> Telefono  </th>';
                option+='<th width="250px"> Editar    </th>';
                option+='<th width="250px"> Eliminar  </th>';
              option+='</tr>';
            option+='</thead>';
            option+='<tbody>';
              $(response).each(function(key,val){
                option+='<tr>';
                  option+='<td>'+(val.name ? val.name : '')+'</td>';
                  option+='<td>'+(val.last_name ? val.last_name : '')+' '+ (val.second_name ? val.second_name : '')+'</td>';
                  option+='<td>'+(val.email ? val.email : '')+'</td>';
                  option+='<td>'+(val.phone ? val.phone : '')+'</td>';
                  option+='<td>';
                    option+='<button class="btn btn-info btnEdit" data-id="'+val.id+'">Editar</button>';
                  option+='</td>';
                  option+='<td>';
                    option+='<button class="btn btn-danger btnDestroy" data-name=" '+' '+val.name+' '+val.last_name+' '+val.last_name+ '" data-id="'+val.id+'">Eliminar</button>';
                  option+='</td>';
                option+='</tr>';
              });
            option+='</tbody>';
          option+='</table>';

        $("#tblRow").append(option);
      }else{
        $("#tblRow").append("<h4>Sin resultados </h4>");
      }
    })
    .fail(function(error){
      console.log(error);
    });
  },

  EditUser: function(id){
    $.ajax({
      url:"classes/AjaxUsers.php",
      method: 'POST',
      dataType:'JSON',
      data: {'id': id, 'OperationType': $("#OperationType").val()}
    })
    .done(function(response){
      if(response){
        $("#id").val(response.id);
        $("#name").val(response.name);
        $("#last_name").val(response.last_name);
        $("#second_name").val(response.second_name);
        $("#email").val(response.email);
        $("#phone").val(response.phone);
      }
    })
    .fail(function(error){
      console.log(error);
    });   
  },

  Ajax: function(){
    let _this = this;
    $.ajax({
      url:"classes/AjaxUsers.php",
      method: 'POST',
      dataType:'JSON',
      // cache: false,
      // contentType: false,
      // processData: false,
      data:$("#frmDates").serialize()
    })
    .done(function(response){
      _this.ListUser();
      if(response.error == false){
        alert(response.message);
        $("#exampleModal").modal("hide");
        $("#delete_modal").modal("hide");
      }else{
        alert(response.message);
      }
    })
    .fail(function(error){
      console.log(error);
    });
  }
}

$(document).ready(function(){
  Captcha.init();
});

