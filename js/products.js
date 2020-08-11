//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productsArray = [];

function showProductsList(array){

    let contenido = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];
        contenido += 'Nombre' + category.name + '<br>';
        contenido += 'Descripción' + category.description + '<br>';
        contenido += 'Precio' + category.cost;
        contenido += '<br><hr><br>';

        document.getElementsByClassName("container p-5").innerHTML = contenido;
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