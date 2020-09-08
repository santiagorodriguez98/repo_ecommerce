//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var infoProduct = {};
function showProduct(product) {
    let contenido = "";
    let category = infoProduct;

    contenido += category.name + '<br><br>';
    contenido += 'Descripción: ' + category.description +'<br>';
    contenido += 'Precio: ' + category.cost;
    contenido +=  " " + category.currency + "<br>";
    contenido += 'Cantidad de vendidos: ' + category.soldCount;
    contenido += '<br><hr><br>';
    /** 
    for (let i = 0; i < category.images.length ; i++) {
        let imagen = category.images[i];
    contenido += '<img src=' + imagen.images[i] + '><br>';
    */
     }
    document.getElementById("infoProduct").innerHTML = contenido;
}
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            infoProduct = resultObj.data;


        }
        showProduct(infoProduct);
    });
});