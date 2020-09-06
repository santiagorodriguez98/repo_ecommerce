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
            
            contenido += '<img src=' + category.imgSrc + 'class = "imgProduct"><br>';
            contenido += category.name + '<br><br>';
            contenido += 'Descripción: ' + category.description + '<br>';
            contenido += 'Precio: ' + category.cost + "<br>";
            contenido += 'Cantidad de vendidos: ' + category.soldCount;
            contenido +='<a class= "link" href="https://japdevdep.github.io/ecommerce-api/product/5678.json">VER  PRODUCTO</a>';
            contenido += '<br><hr><br>';
        }
        document.getElementById("divId").innerHTML = contenido;
    }
}

function sortProducts(criterio, array) {
    let sortList = [];

    if (criterio === SORT_ASC) {
        sortList = array.sort(function (a, b) {
            if (a.cost > b.cost) {
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

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
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