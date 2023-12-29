// Conversion de color de la página entre  dark y ligth mode
document.addEventListener('DOMContentLoaded', function () {
    const SwitchDeColor = document.getElementById('SwitchDeColor');
  
    // con esto verificamos el estado actual del modo oscuro
    const DarkMode = localStorage.getItem('darkMode') === 'enabled';
  
    // Acá llamamos a la funcion para aplicar el el dark mode
    if (DarkMode) {
      activarDarkMode();
    }
  
    // Usamos if else para llamar a las funciones que realizan los cambios de color
    SwitchDeColor.addEventListener('change', function () {
      if (SwitchDeColor.checked) {
        activarDarkMode();
      } else {
        activarLigthMode();
        }
    });
  
    // Funcion para habilitar el modo oscuro
    function activarDarkMode() {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'enabled');
      SwitchDeColor.nextElementSibling.textContent = 'Light Mode';
    }
  

    // Función para deshabilitar el modo oscuro
    function activarLigthMode() {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', null);
      SwitchDeColor.nextElementSibling.textContent = 'Dark Mode';
    }
  });