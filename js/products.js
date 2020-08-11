//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productsArray = [];

function showProductsList(array){

    let contenido = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];
        contenido += category.name + '<br>';
        contenido += category.description + '<br>';
        contenido += category.cost;
        contenido += '<br><hr><br>';

        document.getElementById('container p-5').innerHTML = contenido;
        }
    } 

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data; 
            showProductsList(productsArray);
        }

});
});