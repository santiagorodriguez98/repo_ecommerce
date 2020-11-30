var ProductsArray = []; /* LISTA DE PRODUCTOS DEL CARRITO  */


function calcTotal() {
    let totalPesos = 0;
    let subs = document.getElementsByClassName("subtotal");/* LISTA DE LOS SUBTOTALES  */
    for (let i = 0; i < subs.length; i++) {
        totalPesos += parseInt(subs[i].innerHTML);/* SE PARSEA LOS SUBTOTALES Y SE SUMAN */
    }
    document.getElementById("totalPesos").innerHTML = totalPesos;
}
function calcSubtotal(precio, i) {

    let cantidad = parseInt(document.getElementById(`cantidad${i}`).value);

    let subtotalPesos = cantidad * precio;
    document.getElementById(`subtotal${i}`).innerHTML = subtotalPesos;
    calcTotal();
    calcEnvio();
}


function showProductsList(array) {

    let contenido = '';
    for (let i = 0; i < array.length; i++) {
        let category = array[i];
        let conversion;
        let moneda = category.currency;
        let precio = category.unitCost;
        if (moneda == "USD") {
            conversion = precio * 40;
        }
        else {
            conversion = category.unitCost;
        }

        let sub = conversion * category.count;

        contenido += `
        <tr>
            <td><strong>${category.name}</strong></td>
            <td><img src ='${category.src}' width="150px"></td>
            <td id="precio${i}"><strong>${category.currency} ${category.unitCost}</strong></td>
            <td><input style="width:60px;" onchange="calcSubtotal(${conversion},${i})"
                type="number" id="cantidad${i}" value="${category.count}" min="1"></td>
            <td><span class="subtotal" id="subtotal${i}" style="font-weight:bold;">${sub}</span></td>
            <td><button type="button" onclick = "removeArtic(${i})" class="btn btn-danger">X</button></td>
        </tr>`
    }
    document.getElementById("listado").innerHTML = contenido;
}


function removeArtic(i) {
    if (ProductsArray.length>1){
        ProductsArray.splice(i,1);
        showProductsList(ProductsArray);
    }
    else{
        document.getElementById("cart").innerHTML = `<div><p class = "Title">Ups... no tienes articulos en tu carrito, si quieres seguir buscando clickea <a href = "products.html">aquí</a></p></div>`;
    }
}


function calcEnvio() {
    let total = document.getElementById("totalPesos").innerHTML;
    let envio;
    let array = document.getElementsByName("envio");
    let pc;
    for (var i = 0; i < array.length; i++) {
        if (array[i].checked) {
            pc = array[i].value;
            envio = (total * pc) / 100;
        }
    }
    let totalConEnvio = Math.abs(-total - envio);
    let contenido = `
        <tr>
        <td>${total}</td>
        <td>${envio}</td>
        <td>${totalConEnvio}</td>
        </tr>
        `
    document.getElementById("totalEnvio").innerHTML = contenido;
}

let array = document.getElementsByName("envio");
for (var i = 0; i < array.length; i++) {
    array[i].addEventListener("change", function () {
        calcEnvio();
    });
}

let metodosDePago = document.getElementsByName("metodosDePago");
for (let i = 0; i < metodosDePago.length; i++) {
    metodosDePago[i].addEventListener("change", function () {
        seleccionarPago();
    });
}

function seleccionarPago() {
    let metodosDePago = document.getElementsByName("metodosDePago");
    for (let i = 0; i < metodosDePago.length; i++) {

        if ((metodosDePago[i].value == "transferencia") && (metodosDePago[i].checked)) {
            document.getElementById("transferencia").classList.remove("d-none");
            document.getElementById("debito").classList.add("d-none");
            document.getElementById("credito").classList.add("d-none");

        }
        else if ((metodosDePago[i].value == "debito") && (metodosDePago[i].checked)) {
            document.getElementById("debito").classList.remove("d-none");
            document.getElementById("transferencia").classList.add("d-none");
            document.getElementById("credito").classList.add("d-none");

        }
        else if ((metodosDePago[i].value == "credito") && (metodosDePago[i].checked)) {
            document.getElementById("credito").classList.remove("d-none");
            document.getElementById("transferencia").classList.add("d-none");
            document.getElementById("debito").classList.add("d-none");
        }
    }
}

function modalValidation() {
    let validPayment = true;
    let transferencia = document.getElementById("validTransfer");
    let bancos = document.getElementById("bancos");
    let numeroCuenta = document.getElementById("numeroCuenta");
    let debito = document.getElementById("validDebit");
    let tarjetaDebito = document.getElementById("numeroTarjetaDeb");
    let codigoDebito = document.getElementById("codigoTarjeta");
    let credito = document.getElementById("validCredit");
    let tarjetaCredito = document.getElementById("numeroTarjetaCred");
    let codigoCredito = document.getElementById("codigoTarjetaCred");
    let cuotas = document.getElementById("cuotas");
    if (transferencia.checked) {
        if ((bancos.value === "default") || (numeroCuenta.value === "")) {
            validPayment = false;
        }
        else if (debito.checked) {
            if ((tarjetaDebito.value === "") || (codigoDebito.value === "")) {
                validPayment = false;
            }
            else if (credito.checked) {
                if ((tarjetaCredito.value === "") || (codigoCredito.value === "") || (cuotas.value === "default")) {
                    validPayment = false;
                }

            }
        }
    }
    return validPayment;
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_DESAFIO).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductsArray = resultObj.data.articles;

            showProductsList(ProductsArray);
            calcEnvio();
        }
    });


    let datosEnvio = document.getElementById("datosEnvio");
    let modalPago = document.getElementById("modalPago");
    datosEnvio.addEventListener('submit', function (e) {
        if (datosEnvio.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            let dataMssg = document.getElementById("dataMssg");
            dataMssg.classList.remove("d-none");
        }
        else {
            if (modalValidation()) {
                let paymentNeed = document.getElementById("success");
                datosEnvio.classList.add('was-validated');
                modalPago.classList.add('was-validated');
                paymentNeed.classList.remove("d-none");
                document.getElementById("cart").innerHTML = `<div><br><br><p class = "Title"><a href= "products.html">Vuelve a la página de productos para seguir comprando</a></p></div>`;
                
            }
            else {
                e.preventDefault();
                e.stopPropagation();
                let mensaje = document.getElementById("modalMssg");
                mensaje.classList.remove("d-none");
                let btnPago = document.getElementById("btnPago");
                btnPago.classList.add("alert-danger");
            }
        }
    });

});



