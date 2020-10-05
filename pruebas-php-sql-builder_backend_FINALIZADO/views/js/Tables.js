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

		$(document).on("click","#BtnExportToExcel", function(){
			_this.GenerateExcel($("#results"),"xls");
		});
		$(document).on("click","#BtnExportToSQL", function(){
			_this.GenerateSQL();
		});		
	},

	HeadersTable: function(table_name,table){
		let option= '';
		// HEADERS
		for(var el in table){
			var obj = table[el];
			var keys = Object.keys(obj); //Returns array of keys
			if(el == 0){
	        	option+='<table id="table_'+table_name+'_'+el+'" class="table tablename_'+table_name+'">';
	        		option+='<thead>';
	        			option+='<tr>';
					      for(var i in keys){
					        var key = keys[i];
					        //BODY
					        if(el == 0){
					        	option+='<th>'+key+'</th>';
					        }
					      }
	        			option+='</tr>';
	        		option+='</thead>';
	        		option+='<tbody>';
	        		option+='</tbody>';
	        	option+='<table>';
			}
		}
		return option;
	},

	BodyTable: function(table_name,table){
		// BODY
		let option_body = '';
		for(var el in table){
			var obj = table[el];
			var keys = Object.keys(obj);
			option_body+='<tr>';
				for(var i in keys){
					var key = keys[i];
					//BODY
					option_body+='<td>'+obj[key]+'</td>';
				}
			option_body+='</tr>';
		}

		for(var el in table){
	        $("#table_"+table_name+'_'+el).append(option_body);
		}
	},

	ExportToExcel: function(table){
		let _this  = this;
		let option = '';

		option+='<div class="row ">';
			option+='<div class="col-sm-8">';
			option+='</div>';
			option+='<div class="col col-sm text-right">';
				option+='<button class="btn btn-success" id="BtnExportToExcel">Exportar a Excel</button>';
			option+='</div>';
			option+='<div class="col col-sm text-right">';
				option+='<button class="btn btn-info" id="BtnExportToSQL">Exportar a SQL</button>';
			option+='</div>';
		option+='</div>';

		option+='<div class="row">';
		$(table).each(function(key, val){
			option+= '<h3>'+ val.table + '</h3>';
			option+='<br/>';
			option+= _this.HeadersTable(val.table,val.data);
		});
		option+='</div>';

		$("#results").append(option);

		//INSERT ROWS ON EACH TABLE
		$(table).each(function(key, val){
			_this.BodyTable(val.table, val.data);
		});
	},

    GenerateExcel:function(id,format){
          let tabla = id;
          var clone = tabla.clone();
          var trs = clone.find('tr');
          $.each(trs, function(i, tr) {
            // $(tr).find('td:eq(1)').remove(); 
            // $(tr).find('td:eq(6)').remove(); 
          });
          var htmlExport = clone.prop('outerHTML');
          var ua = window.navigator.userAgent;
          var msie = ua.indexOf("MSIE ");

          //other browser not tested on IE 11
          // If Internet Explorer
          if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
              jQuery('body').append("<iframe id=\"iframeExport\" style=\"display:none\"></iframe>");
              iframeExport.document.open("txt/html", "replace");
              iframeExport.document.write(htmlExport);
              iframeExport.document.close();
              iframeExport.focus();
              sa = iframeExport.document.execCommand("SaveAs", true, "Tables."+format);
          }
          else {
              var link = document.createElement('a');

              document.body.appendChild(link); // Firefox requires the link to be in the body
              link.download = "Tables."+format;
              link.href = 'data:application/vnd.ms-excel,' + escape(htmlExport);
              link.click();
              document.body.removeChild(link);
          }
    },

    GenerateSQL: function(){
		if ('Blob' in window) {
			var fileName = prompt('Please enter file name to save', 'Query.sql');
			if (fileName) {
				var textToWrite = $('.query').val().replace(/n/g, 'rn');
				var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });

				if ('msSaveOrOpenBlob' in navigator) {
					navigator.msSaveOrOpenBlob(textFileAsBlob, fileName);
				}else{
					var downloadLink = document.createElement('a');
					downloadLink.download = fileName;
					downloadLink.innerHTML = 'Download File';

					if ('webkitURL' in window) {
						// Chrome allows the link to be clicked without actually adding it to the DOM.
						downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
					} else {
						// Firefox requires the link to be added to the DOM before it can be clicked.
						downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
						downloadLink.click(function(){
						document.body.removeChild(event.target);
						}); 

						downloadLink.style.display = 'none';
						document.body.appendChild(downloadLink);
					}
					downloadLink.click();
				}
			}
		}else{
			alert('Your browser does not support the HTML5 Blob.');
		}
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
			url: 'classes/QueryFromFields.php',
			method: 'POST',
			data: {
					'table': tableArray
				},
			dataType: 'JSON'
		})
		.done(function(response){
			$("#results").empty();
			if(response['data']){
				_this.ExportToExcel(response['data']);
			}
			if(response['sql']){
				let option = '';
				$(response['sql']).each(function(key,val){
					option+=val+';';
					option+="\n";
				});
			$(".query").val(option);
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