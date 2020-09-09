//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var infoProduct = {};
function showProduct(product) {
    let contenido = "";
    let category = infoProduct;
    let images = "";

    contenido += category.name + '<br><br>';
    contenido += 'Descripción: <br><br>' + category.description + '<br><br>';
    contenido += 'Precio: ' + category.cost;
    contenido += " " + category.currency + "<br>";
    contenido += 'Cantidad de vendidos: ' + category.soldCount;
    contenido += '<br><hr><br>';

    images += '<hr><br>' + '<img src = "img/car1.jpg" class = car1>';
    images += '<img src = "img/car2.jpg" class = car2>';
    images += '<img src = "img/car3.jpg" class  = car3>';

    document.getElementById("infoProduct").innerHTML = contenido;
    document.getElementById("productImages").innerHTML = images;
}




document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            infoProduct = resultObj.data;


        }
        showProduct(infoProduct);
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            infoProduct = resultObj.data;
        }
});
