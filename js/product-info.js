var infoProduct = {};   //JSON CON INFO DEL PRODUCTO
var commentsArray = {}; //JSON CON LISTA DE COMENTARIOS
var productsArray = []; //JSON  CON LISTA DE PRODUCTOS

function showProduct(infoProduct, commentsArray) { // FUNCION  PARA MOSTRAR COMETARIOS Y LA INFO DEL PRODUCTO
    let contenido = "";
    let product = infoProduct;
    let comments = "";
    //SE DECLARAN TRES VARIABLES
    contenido += '<em class = "productName">' + product.name + '</em><br><br>';
    contenido += 'Descripción: <br><br>' + product.description + '<br><br>';
    contenido += 'Precio: ' + product.cost;
    contenido += " " + product.currency + "<br>";
    contenido += 'Cantidad de vendidos: ' + product.soldCount + '<br>';
    contenido += 'Categoría: ' + product.category;
    


    for (let comentarios in commentsArray) {
        let comment = "";
        for (let i = 0; i < commentsArray[comentarios].score; i++) {
            comment += '<span class="fa fa-star checked"></span>'
        }
        for (let i = commentsArray[comentarios].score + 1; i <= 5; i++) {
            comment += '<span class="fa fa-star "></span>'
        }

        comments += `<ul class="list-group" id = "commentDiv">
  <li class="list-group-item">Usuario: ${commentsArray[comentarios].user} comentó: ${commentsArray[comentarios].description}<br> Su puntuación: ${comment} Publicado: ${commentsArray[comentarios].dateTime}</li>
</ul>`
            }
        

        document.getElementById("comments").innerHTML = comments;
        document.getElementById("infoProduct").innerHTML = contenido;

    }


    function showRelatedProducts(array, relatedArray) {
        let contenido = "";

        relatedArray.forEach(function (i) {
        let relatedProduct = array[i];
        contenido += `
         <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + relatedProduct.imgSrc + `" alt="" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ relatedProduct.name +`</h4>
                        <small class="text-muted">` + relatedProduct.soldCount + ` artículos</small>
                    </div>
                    <p class="mb-1">` + relatedProduct.description + `</p>
                    <p class="mb-1">Precio: USD ` + relatedProduct.cost + `</p>
                </div>
            </div>
        </a>
        `

        });
        document.getElementById("relatedProducts").innerHTML = contenido;
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
        getJSONData(PRODUCTS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                productsArray = resultObj.data;
            }
            showRelatedProducts(productsArray, infoProduct.relatedProducts);
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