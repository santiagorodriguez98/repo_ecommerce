var ProductsArray = [];

function calcTotal() {
    let totalPesos = 0;
    let subs = document.getElementsByClassName("subtotal");
    for (let i = 0; i < subs.length; i++) {
        totalPesos += parseInt(subs[i].innerHTML);
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
            <td>${category.name}</td>
            <td><img src ='${category.src}' width="150px"></td>
            <td id="precio${i}">${category.currency} ${category.unitCost}</td>
            <td><input style="width:60px;" onchange="calcSubtotal(${conversion},${i})"
                type="number" id="cantidad${i}" value="${category.count}" min="1"></td>
            <td><span class="subtotal" id="subtotal${i}" style="font-weight:bold;">${sub}</span></td>
        </tr>`

    }
    document.getElementById("listado").innerHTML = contenido;
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

let metodosDePago = document.getElementsByName("metodosDePago");
for (let i = 0; i < metodosDePago.length; i++) {
    metodosDePago[i].addEventListener("change", function () {
        seleccionarPago();
    });
}

function seleccionarPago() {
    let metodosDePago = document.getElementsByName("metodosDePago");
    for (let i = 0; i < metodosDePago.length; i++) {
        let seleccion;
        if ((metodosDePago[i].value == "transferencia") && (metodosDePago[i].checked)) {
            document.getElementById("transferencia").classList.remove("d-none");
            document.getElementById("debito").classList.add("d-none");
            document.getElementById("credito").classList.add("d-none");
            let seleccion = metodosDePago[i].value;
        }
        else if ((metodosDePago[i].value == "debito") && (metodosDePago[i].checked)) {
            document.getElementById("debito").classList.remove("d-none");
            document.getElementById("transferencia").classList.add("d-none");
            document.getElementById("credito").classList.add("d-none");
            let seleccion = metodosDePago[i].value;
        }
        else if ((metodosDePago[i].value == "credito") && (metodosDePago[i].checked)) {
            document.getElementById("credito").classList.remove("d-none");
            document.getElementById("transferencia").classList.add("d-none");
            document.getElementById("debito").classList.add("d-none");
            let seleccion = metodosDePago[i].value;
        }
        return seleccion;
    }
}
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_DESAFIO).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductsArray = resultObj.data.articles;

            showProductsList(ProductsArray);
            calcEnvio();
        }
    });

    function modalValidation() {
        let varControl = true;
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
        if ((transferencia.checked) && (bancos.value === "default") && (numeroCuenta === "")) {
            varControl = false;
        }
        else if ((debito.checked) && (tarjetaDebito.value === "") && (codigoDebito === "")) {
            varControl = false;
        }
        else if ((credito.checked) && (tarjetaCredito.value === "") && (codigoCredito === "")&&(cuotas.value === "default")) {
            varControl = false;
        }
    }
    document.getElementById("btnPago").addEventListener("click", function (e){
        modalValidation();
        seleccionarPago()
        if((varControl === true)&&(d)){
            
            localStorage.setItem('datosPago', JSON.stringify({
                Nombre: nombre,
                Edad: edad,
                Email: email,
                Telefono: telefono
            }));
        }
    });
    let datosEnvio = document.getElementById("datosEnvio");
    let modalPago = document.getElementById("modalPago");
    datosEnvio.addEventListener('submit', function (e) {
        modalValidation();
        if ((datosEnvio.checkValidity() === false) || (varControl === false)) {
            e.preventDefault();
            e.stopPropagation();
        }
        datosEnvio.classList.add('was-validated');
        modalPago.classList.add('was-validated');
    });

    let array = document.getElementsByName("envio");
    for (var i = 0; i < array.length; i++) {
        array[i].addEventListener("change", function () {
            calcEnvio();
        });
    }

});
