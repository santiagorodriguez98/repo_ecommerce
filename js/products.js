var productsArray = [];//GUARDO LA LISTA DE PRODUCTOS
var maxPrice = undefined;
var minPrice = undefined;
const SORT_ASC = "asc-price"
const SORT_DESC = "desc-price"
const SORT_DESC_REL = "RELEV"

function showProductsList(array) { //FUNCION PARA MOSTRAR LISTA

    let contenido = '';
    for (let i = 0; i < array.length; i++) {//RECORRO LA LISTA CON UN FOR
        let category = array[i];//GUARDO CADA PRODUCTO DE MI LISTA 


        if (((minPrice == undefined) || (parseInt(category.cost) >= minPrice)) && //CON UN IF CONDICIONO 
            ((maxPrice == undefined) || (parseInt(category.cost) <= maxPrice))) {//EL MUESTREO DE PRODUCTOS
        //EN LA VARIABLE CONTENIDO SE GUARDAN LOS PRODUCTOS (SE MUESTRAN CON CARTAS DE BOOTSTRAP)
           contenido += `<div class="card col-md-3 mr-1 mb-1" style="width: 18rem;"> 
           <img class="card-img-top" src= ${category.imgSrc} alt="Card image cap">
           <div class="card-body">
             <h5 class="card-title">${category.name}</h5>
             <p class="card-text">Descripción: ${category.description}</p>
             <p class="card-text">Precio: USD ${category.cost}</p>
             <p class="card-text">Cantidad de vendidos:  ${category.soldCount}</p>
             <a href="product-info.html" class="btn btn-primary">VER  PRODUCTO</a>
          </div></div>`
        }
        document.getElementById("divProducts").innerHTML = contenido;//CON DOM GUARDO LA LISTA EN ESTE ELEMENTO
    }
}

function sortProducts(criterio, array) {//FUNCION PARA ORDENAR LOS PRODUCTOS (2 PARAMETROS)
    let sortList = [];//GUARDO LA LISTA ORDENADA EN ESTA VARIABLE

    if (criterio === SORT_ASC) {//CON UN IF CONDICIONO LA LISTA SEGUN EL CRITERIO
        sortList = array.sort(function (a, b) {//METODO SORT QUE UTILIZA FUNCION DE 2 PARAMETROS
            if (a.cost > b.cost) {//SE COMPARAN Y DEVUELVE 0, 1, O -1
                return 1;
            }
            if (a.cost < b.cost) {
                return -1;
            }
            return 0;
        });
        return sortList;
    }
    else if (criterio === SORT_DESC) {
        sortList = array.sort(function (a, b) {
            if (a.cost > b.cost) {
                return -1;
            }
            if (a.cost < b.cost) {
                return 1;
            }
            return 0;
        });
        return sortList;
    }
    else if (criterio === SORT_DESC_REL) {
        sortList = array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) {
                return -1;
            }
            if (a.soldCount < b.soldCount) {
                return 1;
            }
            return 0;
        });
        return sortList;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {//SE AGEGA UN EVENTO QUE ESPERE A QUE SE CARGUE EL DOCUMENTO
    getJSONData(PRODUCTS_URL).then(function (resultObj) {//FUNCION QUE UTILIZA LINK COMO PARAMETRO DEVUELVE EL JSON 
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            productsArray = sortProducts(SORT_ASC, productsArray);
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
    document.getElementById("asc").addEventListener("click", function () {
        productsArray = sortProducts(SORT_ASC, productsArray);
        showProductsList(productsArray);
    });
    document.getElementById("desc").addEventListener("click", function () {
        productsArray = sortProducts(SORT_DESC, productsArray);
        showProductsList(productsArray);
    });
    document.getElementById("relev").addEventListener("click", function () {
       productsArray = sortProducts(SORT_DESC_REL, productsArray);
        showProductsList(productsArray);
    });
});