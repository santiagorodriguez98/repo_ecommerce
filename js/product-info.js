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

    contenido += '<em class = "productName">' + product.name + '</em><br><br>';
    contenido += 'Descripción: <br><br>' + product.description + '<br><br>';
    contenido += 'Precio: ' + product.cost;
    contenido += " " + product.currency + "<br>";
    contenido += 'Cantidad de vendidos: ' + product.soldCount + '<br>';
    contenido += 'Categoría: ' + product.category
    contenido += '<br><hr><br>';

    images += '<hr><br>' + '<img src = "img/car1.jpg" class = car1>';
    images += '<img src = "img/car2.jpg" class = car2>';
    images += '<img src = "img/car3.jpg" class  = car3>';


    for (let comentarios in commentsArray) {
        let comment = "";
        for (let i = 0; i < commentsArray[comentarios].score; i++) {
            comment += '<span class="fa fa-star checked"></span>'
        }
        for (let i = commentsArray[comentarios].score + 1; i <= 5; i++) {
            comment += '<span class="fa fa-star "></span>'
        }

        comments += '<br>Usuario: <strong>' + commentsArray[comentarios].user + '</strong> ';
        comments += 'comentó: ' + commentsArray[comentarios].description + '<br>';
        comments += 'Su puntuación: ' + comment + '<br>';
        comments += 'Publicado: ' + commentsArray[comentarios].dateTime + '<br><br>';

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
    
    document.getElementById("enviar").addEventListener("click", function () {
        let time = Date ();
        let timeDate = '';

        let newComment = {
            user: JSON.parse(localStorage.getItem("User-Logged")).email,
            description: parseInt(document.getElementById("writeCOM").value),
            score: document.getElementById("raiting").value,
            dateTime: "",
        };
        commentsArray.push(newComment);
        showProduct(infoProduct, commentsArray);
    });
});