
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">	
        	Usuario
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
	        <form id="frmDates">
						
	        	<input type="hidden" 
	        			name="id"
	        			id="id">
	        	<input type="hidden"
	        			name="OperationType" 
	        			id="OperationType">

	        	<div class="form-group">
		        	<input type="text" 
		        			name="name"
		        			id="name"
		        			placeholder="Nombres"
		        			class="form-control"
		        			autocomplete="off">	
	        	</div>
	        	<div class="form-group">
		        	<input type="text" 
		        			name="last_name" 
		        			id="last_name" 
		        			placeholder="Apellido Paterno"
		        			class="form-control"
		        			autocomplete="off">	
	        	</div>
	        	<div class="form-group">
		        	<input type="text" 
		        			name="second_name" 
		        			id="second_name" 
		        			placeholder="Apellido Materno"
		        			class="form-control"
		        			autocomplete="off">	
	        	</div>
	        	<div class="form-group">
		        	<input type="text" 
		        			name="email" 
		        			id="email" 
		        			placeholder="Email"
		        			class="form-control"
		        			autocomplete="off">	
	        	</div>

	        	<div class="form-group">
		        	<input type="text" 
		        			name="phone" 
		        			id="phone" 
		        			placeholder="Número de Telefono"
		        			class="form-control"
		        			autocomplete="off">	
	        	</div>
	            <!-- INCLUIR AQUÍ UN FORMULARIO CON NOMBRE, APELLIDOS, EMAIL, TELEFONO -->
				
	        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <input type="button" class="btn btn-success BtnRegister" value="Registrar">
        <input type="button" class="btn btn-success BtnReUpdate" value="Actualizar" style="display: none;">
      </div>
    </div>
  </div>
</div>
