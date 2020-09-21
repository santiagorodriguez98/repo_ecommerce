//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var infoProduct = {};
var commentsArray = {};
var productsArray = [];
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
    contenido += 'Categoría: ' + product.category;
    contenido += '<br><br>';

    images += '<br>' + '<img src = "img/car1.jpg" class = car1>';
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
        comments += 'Publicado: ' + commentsArray[comentarios].dateTime + '<br><hr>';

    }


    document.getElementById("comments").innerHTML = comments;
    document.getElementById("infoProduct").innerHTML = contenido;
    document.getElementById("productImages").innerHTML = images;
}


function showRelatedProducts(array,relatedArray) {
    let contenido = "";
  
    relatedArray.forEach(function (i){
      
        
        contenido += '<strong>' + array[i].name + '</strong><br>';
        contenido +=  '<img class = "imgRelatedProduct" src = '+array[i].imgSrc+'><br>'
        contenido += '<br>' + array[i].description + '<br><br>';
        contenido += 'Precio: ' + array[i].cost;
        contenido += " " + array[i].currency + "<br>";
        contenido += 'Cantidad de vendidos: ' + array[i].soldCount + "<br>";
        contenido += '<a class= "relatedLink" href="product-info.html">VER  PRODUCTO</a>';
        contenido += '<br><hr>';

    });
    document.getElementById("relatedProducts").innerHTML = contenido;
} 
/*  APLICACION DE LAS TARJETAS (ERROR)
 function showRelatedProducts(array,relatedArray) {
    let contenido = "";
  
    relatedArray.forEach(function (i){
      
        contenido += '<div id = "relatedProducts" class="card" style="width: 18rem;">';

        contenido += '<img src='+ array[i].imgSrc + 'class="card-img-top" alt=""><div class="card-body">';
        contenido +=  '<h5 class= "cardTitle">'+ array[i].name +'</h5>';
        contenido += '<p class="card-text">'+array[i].description+'</p>';
          contenido  += '<a href="product-info.html" class="btn btn-primary">VER PRODUCTO</a></div></div>';
       
    });
    document.getElementById("relatedProducts").innerHTML = contenido;
} 

     */   
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
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
        }
        showRelatedProducts(productsArray,infoProduct.relatedProducts);
    });
    
    document.getElementById("enviar").addEventListener("click", function () {

        var month = new Array();
        month[0] = "1";
        month[1] = "2";
        month[2] = "3";
        month[3] = "4";
        month[4] = "5";
        month[5] = "6";
        month[6] = "7";
        month[7] = "8";
        month[8] = "9";
        month[9] = "10";
        month[10] = "11";
        month[11] = "12";

        let time = new Date();
        var o = month[time.getMonth()];
        var n = time.getDate();
        let dateTime = time.getFullYear() + '-' + o + '-' + n + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();

        let newComment = {
            user: JSON.parse(localStorage.getItem("User-Logged")).email,
            description: document.getElementById("writeCOM").value,
            score: document.getElementById("raiting").value,
            dateTime: dateTime
        };
        commentsArray.push(newComment);
        showProduct(infoProduct, commentsArray);

    });

});