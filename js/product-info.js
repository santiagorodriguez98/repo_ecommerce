//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var infoProduct = {};
var commentsArray = {};
function showProduct(infoProduct, commentsArray) {
    let contenido = "";
    let product = infoProduct;
    let images = "";
    let comments = "";

    contenido += product.name + '<br><br>';
    contenido += 'Descripción: <br><br>' + product.description + '<br><br>';
    contenido += 'Precio: ' + product.cost;
    contenido += " " + product.currency + "<br>";
    contenido += 'Cantidad de vendidos: ' + product.soldCount+'<br>';
    contenido += 'Categoría: ' + product.category
    contenido += '<br><hr><br>';

    images += '<hr><br>' + '<img src = "img/car1.jpg" class = car1>';
    images += '<img src = "img/car2.jpg" class = car2>';
    images += '<img src = "img/car3.jpg" class  = car3>';

    for (let comentarios in commentsArray) {
        comments += '<br>Usuario: <p style= "font-weight: bold;">'+ commentsArray[comentarios].user + '</p>';
        comments += 'comentó: ' + commentsArray[comentarios].description + '<br>';
        comments += 'Su puntuación: '+ commentsArray[comentarios].score + '/5 <br>';
        comments += 'Publicado: '+ commentsArray[comentarios].dateTime + '<br><br>';
    }
    
    document.getElementById("comments").innerHTML = comments;
    document.getElementById("infoProduct").innerHTML = contenido;
    document.getElementById("productImages").innerHTML = images;
}






document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            commentsArray = resultObj.data;
        }
    });

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            infoProduct = resultObj.data;

        }
        showProduct(infoProduct, commentsArray);
    });
    
});