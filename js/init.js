const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_INFO_DESAFIO = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

document.addEventListener("DOMContentLoaded", function (e) {

  document.getElementById("exit").addEventListener("click", function (e) {
    localStorage.removeItem('User-Logged');
    localStorage.removeItem('User');
    window.location = "Index.html";

  });


  let userLogged = localStorage.getItem('User-Logged');
  let infoUser = document.getElementById("info-user");
  let datosUsuario = localStorage.getItem('User');
  if (datosUsuario) {
    usuario = JSON.parse(datosUsuario);

    document.getElementById("nombreCompleto").value = usuario.Nombre;
    document.getElementById("edad").value = usuario.Edad;
    document.getElementById("email").value = usuario.Email;
    document.getElementById("telefono").value = usuario.Telefono;
    document.getElementById("imgProfile").src = usuario.Imagen;
    document.getElementById("imgLink").value = usuario.Imagen;
  }
  if (userLogged) {
    userLogged = JSON.parse(userLogged);
    infoUser.classList.remove("d-none");
    document.getElementById("user").innerHTML = userLogged.email;
    document.getElementById("formDiv").style = "display: inline-block";
  }

});
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
