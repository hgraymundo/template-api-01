$(function(e) {
	$('#example').DataTable( {
		"language": {
			"lengthMenu": "Muestrar _MENU_ filas por pagina",
			"search": "Buscar:",
			"info": "Muestra _START_ a _END_ de _TOTAL_ Registros",
			"paginate": {
				"first":      "Inicio",
				"last":       "Ultimo",
				"next":       "Siguiente",
				"previous":   "Anterior"
			},
        }
	});
	// $('#example2').DataTable();
} );
