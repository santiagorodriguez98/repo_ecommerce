//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("buttonId").addEventListener("click", function (e) {

        let email = document.getElementById("emailId");
        let contraseña = document.getElementById("passwordId");
        let camposCompletos = true;

        if (email.value === "" || contraseña.value === "") {
            
            let warning = document.getElementById("danger");
            camposCompletos = false;
            warning.classList.remove("d-none");
        }
        if (camposCompletos) {
            localStorage.setItem('User-Logged', JSON.stringify({email: emailId.value}));
            window.location ='Inicio.html';


        }
        
    })
});