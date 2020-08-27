//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productsArray = [];
var maxPrice = undefined;
var minPrice = undefined;
const SORT_ASC = "asc-price"
const SORT_DESC = "desc-price"
const SORT_DESC_REL = "RELEV"

function showProductsList(array) {

    let contenido = "";
    for (let i = 0; i < array.length; i++) {
        let category = array[i];


        if (((minPrice == undefined) || (parseInt(category.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (parseInt(category.cost) <= maxPrice))) {

            contenido += category.name + '<br>';
            contenido += "<img src=" + category.imgSrc + "><br>";
            contenido += 'Descripción: ' + category.description + '<br>';
            contenido += 'Precio: ' + category.cost + "<br>";
            contenido += 'Cantidad de vendidos: ' + category.soldCount;
            contenido += '<br><hr><br>';
        }
        document.getElementById("divId").innerHTML = contenido;
    }
}

function sortProducts (criterio, array){
    let sortList = [];

    if (criterio === SORT_ASC){
        sortList = array.sort(function (a,b){
        if (a.cost > b.cost){
            return -1;
        }
        if (a.cost < b.cost){
            return 1;
        }

        return 0;
        })
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            showProductsList(productsArray);
        }

    });
    document.getElementById("Filter").addEventListener("click", function () {
        minPrice = document.getElementById("minPrice").value;
        maxPrice = document.getElementById("maxPrice").value;
        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice) >= 0)) {
            minPrice = parseInt(minPrice);
        }
        else {
            minPrice = undefined;
        }
        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice) >= 0)) {
            maxPrice = parseInt(maxPrice);
        }
        else {
            maxPrice = undefined;
        }
        showProductsList(productsArray);
    });

    document.getElementById("clean").addEventListener("click", function () {
        document.getElementById("maxPrice").value = "";
        document.getElementById("minPrice").value = "";
        maxPrice = undefined;
        minPrice = undefined;

        showProductsList(productsArray);
    });
});