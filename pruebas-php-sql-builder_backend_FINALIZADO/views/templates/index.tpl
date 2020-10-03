<link rel="stylesheet" type="text/css" href="views/framework/bootstrap/css/bootstrap.min.css">

<html>
    <body class="container">
    	<div class="row">
    		<button class="btn btn-success" id="btnFields">Exportar</button>
    	</div>
    	<div class="row">
    		<div class="col-sm">
		    	<h3>Tablas</h3>
				<select id="Tables" name="Tables" size="10" multiple>
					{foreach $builder->Tables() as $row}
						{foreach $row as $ro}
							<option value="{$ro}" data-id="{$ro}">{$ro}</option>
						{/foreach}
					{/foreach}
				</select>
    		</div>
    		<div class="col-sm">
		    	<h3>Campos</h3>
				<select id="Fields" name="Fields" size="10" multiple>
				</select>
    		</div>
    		<div class="col-sm">
				<div class="fields_select row p-3">
					<h3>Campos seleccionados</h3>
					<div class="row content"></div>
				</div>
    		</div>
    	</div>

    	<div class="row" id="results"></div>

    </body>
</html>
<script type="text/javascript" src="views/js/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="views/framework/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="views/js/Tables.js"></script>

