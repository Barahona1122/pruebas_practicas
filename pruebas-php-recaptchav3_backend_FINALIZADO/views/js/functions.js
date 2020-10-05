var Captcha = {
  init: function(){
    console.log("Started!");
    this.actions();
    this.ListUser();
    this.Recaptcha();
    var cd;
  },
  actions: function(){
    let _this = this;

    $(document).on("click",".BtnRegister", function(){
        _this.Ajax();
    });

    $(document).on("click","#btnNew", function(){
      $("#exampleModal").modal("show");
      $("#frmDates")[0].reset();
      $("#OperationType").val("2");

      $(".BtnRegister").css("display","block");
      $(".BtnReUpdate").css("display","none");

      let CatpChaInput = $("#recaptchaResponse").val();
      $("#frmDates").append('<input type="hidden" name="recaptcha_response" value="'+CatpChaInput+'">');
    });

     $(document).on("click",".btnEdit", function(){
        $("#exampleModal").modal("show");
        $("#OperationType").val("3");
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
  },

  Recaptcha: function(){
    grecaptcha.ready(function() {
    grecaptcha.execute('6Le7qtMZAAAAAMi2XRYWnRdrdEvjw314bE9hXFY8')
    .then(function(token) {
    var recaptchaResponse = document.getElementById('recaptchaResponse');
    recaptchaResponse.value = token;
    });});
  }
}

$(document).ready(function(){
  Captcha.init();
});

