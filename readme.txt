  Ideas, para el Login despues del Register
  
  <script>
    function mostrarConfirmacion() {
      var resultado = confirm("¿Estás seguro de continuar?");
      
      if (resultado) {
        // Código a ejecutar si se hace clic en "Aceptar"
        alert("Has seleccionado Aceptar");
      } else {
        // Código a ejecutar si se hace clic en "Cancelar"
        alert("Has seleccionado Cancelar");
      }
    }
  </script>