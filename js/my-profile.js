document.addEventListener("DOMContentLoaded", function (e) {

    let DataUser = localStorage.getItem('DataUser');
    if (DataUser) {
        DataUser = JSON.parse(DataUser);
        user.innerText = user.innerText + "Estas logueado como: " + userLogged.email;
        document.getElementById("user").innerHTML = userLogged.email;
        infoUser.style = "display: inline-block";
        var form = document.getElementById("formDiv");
        form.style = "display: inline-block";
    }

    let datosUsuario = localStorage.getItem('User');
    if (datosUsuario) {
        usuario = JSON.parse(datosUsuario);
        document.getElementById("imgProfile").src = usuario.Imagen;
    }

    function validarDatos() {

        let camposCompletos = false;
        let img = document.getElementById("imgProfile").src;
        let nombre = document.getElementById("nombreCompleto").value;
        let edad = document.getElementById("edad").value;
        let email = document.getElementById("email").value;
        let telefono = document.getElementById("telefono").value;
        if ((!nombre == "") && (!edad == "") && (!email == "") && (!telefono == "")) {
            camposCompletos = true;
            localStorage.setItem('User', JSON.stringify({
                Imagen: img,
                Nombre: nombre,
                Edad: edad,
                Email: email,
                Telefono: telefono
            }));
        }
        else {
            camposCompletos
        }
        let successful = document.getElementById("success");
        let warning = document.getElementById("danger");
        if (camposCompletos) {
            successful.classList.remove("d-none");
            warning.classList.add("d-none");
        } else {
            warning.classList.remove("d-none");
        }
    }
    document.getElementById("enviar").addEventListener("click", function (e) {
        validarDatos();

        var imgProfile = document.getElementById("imgProfile");
        var imgLink = document.getElementById("imgLink").value;
        if (imgLink != "") {
            imgProfile.src = imgLink;
        }


    });

});
