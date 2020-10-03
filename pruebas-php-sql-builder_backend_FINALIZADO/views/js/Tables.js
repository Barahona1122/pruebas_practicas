var Tables = {
	
	init: function(){
		console.log("Started!");
		this.actions();
	},
	actions: function(){
		let _this = this;
		let tableArray = new Array();
		let tableArrayCustom = new Array();
		let objIndex;
		$("#Tables").on("click",function(){
			_this.SearchFields($(this).val());
		});

		$("#Fields").on("click", function(){
			let table = $(this).find(':selected').data("id");
			let value = $(this).val();
			// $(".content").empty();
			let option = '';
			option+='<div class="col-sm col_'+table+'_'+value+'">';
				option += '<button data-id="'+value+'" class="btn btn-success btnField_'+value+'" type="button">'+table+'.'+value+'</button>';
				option+= '<span style="cursor:pointer;" data-table="'+table+'" data-id="'+value+'" id="DeleteField_'+value+'" class="DeleteField badge badge-danger">Borrar</span>';
			option+= '</div>';
			if($(".col_"+table+'_'+value).length == 0 ){
				$(".content").append(option);
				tableArray.push({"table": table, 'field':value[0]});
			}
		});

		$("body").on("click",".DeleteField",function(){
			let table = $(this).data('table');
			let id    = $(this).data('id');
			$(".col_"+table+'_'+id).remove();
			tableArrayCustom = [];
			let remove = tableArray.findIndex((obj => obj.field == id));
			tableArray.splice(remove,1);
		});

		$("#btnFields").on("click",function(){
			let lastField = '';
			if(tableArray){
				$(tableArray).each(function(key,val){
					objIndex = tableArrayCustom.findIndex((obj => obj.table == val['table']));
					if(objIndex != -1){
						tableArrayCustom[objIndex].field += ','+val['field'];
					}else{
						tableArrayCustom.push({"table": val['table'], 'field': val['field']});
					}
				});
			}
			if(tableArrayCustom.length > 0){
				_this.QuerySql(tableArrayCustom);
			}else{
				tableArrayCustom = [];
				tableArray       = [];
				$("#results").empty();
			}
		});
	},

	ExportToExcel: function(table){
		// Create a form
		var mapForm = document.createElement("form");
		// mapForm.target = "_blank";
		mapForm.target = "Map";
		mapForm.method = "POST";
		mapForm.action = "IndexExportToExcel.php";

		// Create an input
			var mapInput = document.createElement("input");
				mapInput.type  = "text";
				mapInput.name  = "parms";
				mapInput.value = JSON.stringify(table);
				mapForm.appendChild(mapInput);
		
		document.body.appendChild(mapForm);
		// "status=0,title=0,height=50,width=50,scrollbars=1"
		map = window.open("", "Map");
		if(map){
		    mapForm.submit();
		} else {
		    alert('You must allow popups for this map to work.');
		}
		// let current = window.location.href;
		// location.replace(current+'?data ='+table);
	},

	SearchFields: function(table){
		$.ajax({
			url: 'classes/AjaxTable.php',
			method: 'POST',
			data: {
					'action': 'Fields',
					'id': table
				},
			dataType: 'JSON'
		})
		.done(function(response){
			let option = '';
			$("#Fields").empty();
			if(response.length > 0){
				$(response).each(function(key,val){
					option+='<option data-id="'+table+'" value="'+val['Field']+'">'+val['Field']+'</option>';
				});
				$("#Fields").append(option);
			}
		})
		.fail(function(error){
			console.log(error);
		});
	},

	QuerySql: function(tableArray){
		let _this = this;
		$.ajax({
			// url: 'classes/SqlBuilder.php',
			url: 'classes/QueryFromFields.php',
			method: 'POST',
			data: {
					'table': tableArray
				},
			dataType: 'JSON'
		})
		.done(function(response){
			let option = '';
			$("#results").empty();

			if(response.length > 0){
				$(response).each(function(key,tables){
					option+= '<div class="col-sm-12">';
						option+= '<h3>'+tables.table+'</h3>';
						option+= '<br/>';
						if(tables.data){
							$(tables.data).each(function(key, fields){
								let filedss = JSON.stringify(fields);
								option+= '<div class="row">'+ filedss+'</div>';
							});
						}
					option+='</div>';
				});
				$("#results").append(option);
				_this.ExportToExcel(response);
			}
		})
		.fail(function(error){
			console.log(error);
		});
	},
}

$(document).ready(function(){
	Tables.init();
});