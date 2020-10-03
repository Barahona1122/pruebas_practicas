<html>
	<head>
		<title>Formulario</title>
		<link rel="stylesheet" type="text/css" href="views/framework/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="views/css/style.css">
	</head>
    <body>
    	<div class="container">
    		<br>
	    	<div class="card">
				<div class="card-header">
					<div class="row">
						<div class="col col-sm">
							Usuarios
						</div>
						<div class="col col-sm text-right">
							<button type="button" class="btn btn-primary" data-toggle="modal" id="btnNew">
								Nuevo
							</button>
						</div>
					</div>
				</div>
				<div class="card-body">
					<div class="row" id="tblRow"></div>
				</div>
	    	</div>
    	</div>

		<!-- Modal -->
		{include file="CreateModal.tpl"}
		{include file="DeleteModal.tpl"}
    </body>
</html>
<!-- SECTION SCRIPTS -->
<script src='views/js/jquery.js'></script>
<script src='views/js/functions.js'></script>
<script type="text/javascript" src="views/framework/bootstrap/js/bootstrap.min.js"></script>