var ProductsArray = [];

function calcTotal() {
    let totalPesos = 0;
    let totalDolares = 0;
    let subs = document.getElementsByClassName("subtotal");
    for (let i = 0; i < subs.length; i++) {
        totalPesos += parseInt(subs[i].innerHTML);
        totalDolares += totalPesos/40;
    }
    document.getElementById("totalPesos").innerHTML = totalPesos;
    document.getElementById("totalDolares").innerHTML = totalDolares;
}
function calcSubtotal(article, i) {
    let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);
    let moneda = article.currency;
    let precio = article.unitCost;
    if ( moneda = "UYU") {
      let subtotalPesos = cantidad * precio;
        document.getElementById(`subtotal${i}`).innerHTML = subtotalPesos;
    } else {
    let conversion = precio * 40;
        let subtotalDolares = cantidad * conversion;
        document.getElementById(`subtotalDolares${i}`).innerHTML = subtotalDolares;
    }
    calcTotal();
}
    

function showProductsList(array) {
  
    let contenido = '';
    for (let i = 0; i < array.length; i++) {
        let category = array[i];
  
        let sub = category.unitCost * category.count;
      
        contenido += `
        <tr>
            <td>${category.name}</td>
            <td><img src ='${category.src}' width="150px"></td>
            <td id="precio${i}">${category.currency} ${category.unitCost}</td>
            <td><input style="width:60px;" onchange="calcSubtotal(${category.unitCost},${i})"
                type="number" id="cantidad${i}" value="${category.count}" min="1"></td>
            <td><span class="subtotal" id="subtotal${i}" style="font-weight:bold;">${sub}</span></td> 
            <td><span class="subtotal" id="subtotalDolares${i}" style="font-weight:bold;">${sub}</span></td> 
        </tr>`
        
    }
    
    document.getElementById("listado").innerHTML = contenido;
}
function calcEnvio() {
    let total = document.getElementById("totalPesos").innerHTML;
    let envio;

    let array = document.getElementsByName("envio");
    for (var i = 0; i < array.length; i++) {
        if (array[i].checked) {
            envio =array[i].value;
        }
    }

    let totalConEnvio = total + envio;
    let contenido = `
        <tr>
        <td>${total}</td>
        <td>${envio}</td>
        <td>${totalConEnvio}</td>
        </tr>
        `
    document.getElementById("totalEnvio").innerHTML = contenido;
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_DESAFIO).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductsArray = resultObj.data.articles;

            showProductsList(ProductsArray);
            calcEnvio();
        }
    });
    let array = document.getElementsByName("envio");
    for (var i = 0; i < array.length; i++) {
        array[i].addEventListener("change", function() {
            calcEnvio();
        });
    }

});