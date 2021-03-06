var minCount = undefined;
var maxCount = undefined;
var search = undefined;

function verAuto (id) {
    localStorage.setItem("idAuto", id)  
    window.location = "product-info.html"
   }

function cargarDatos(array) {
    document.getElementById("list").innerHTML = "";

    let lista = "";
    let n = 0;
    for (let i = 0; i < array.length; i++) {

        if (((minCount == undefined) || (minCount != undefined && parseInt(array[i].cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(array[i].cost) <= maxCount))) {
         
       
           if (search == undefined || array[i].name.toLowerCase().includes(search)|| array[i].description.toLowerCase().includes(search)){
            
            lista += `
                        <div class="col-lg-4 col-md-12 my-5" id = "celda`+ n + `">  
                        <p> <img src = "${array[i].imgSrc}" class = "row imagsiz"> </p>
                            <h4 class = "row" style="width: 100%;">${array[i].name}</h4>
                            <p class = "row descrp" style="width: 100%;">${array[i].description}</p>
                            <p class = "row precio">${array[i].cost} ${array[i].currency}</p>
                            <em class = "row pb-3"> Artículos vendidos: ${array[i].soldCount}</em>
                            <hr style="border-color:#555254; margin-right:8%;">
                            <button class= "btn btn-outline-info" id="verMasBttn" onclick="verAuto(`+ array[i].id +`)" style="float: right; margin-right: 5%;")> Ver más </button>
                        </div>
                  `;
            n = n + 1;
            };
        };
    };

    document.getElementById("list").innerHTML = lista;

};

function sortCars(criterio, array) {
    let result = [];

    if (criterio === "MinCost") {
        result = array.sort(
            function (a, b) {
                if (a.cost < b.cost) { return -1; }
                if (a.cost > b.cost) { return 1; }
                return 0;
            });
    } else if (criterio === "MaxCost") {
        result = array.sort(
            function (a, b) {
                if (a.cost > b.cost) { return -1; }
                if (a.cost < b.cost) { return 1; }
                return 0;
            });
    } else if (criterio === "Relev") {
        result = array.sort(
            function (a, b) {
                if (a.soldCount > b.soldCount) { return -1; }
                if (a.soldCount < b.soldCount) { return 1; }
                return 0;
            });
    }

    return result;
 
}


function sortAndShowCars(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortCars(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    cargarDatos(currentProductsArray);
}


/*Función que se ejecuta una vez que se haya lanzado el evento de que el documento 
se encuentra cargado, es decir, se encuentran todos los elementos HTML presentes.*/
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            arrayCars = resultObj.data;
            cargarDatos(arrayCars);

            document.getElementById("sortMinCost").addEventListener("click", function () {
                sortAndShowCars("MinCost", arrayCars);
            });

            document.getElementById("sortMaxCost").addEventListener("click", function () {
                sortAndShowCars("MaxCost", arrayCars);
            });

            document.getElementById("sortByCount").addEventListener("click", function () {
                sortAndShowCars("Relev", arrayCars);
            });

            document.getElementById("rangeFilterCount").addEventListener("click", function () {
                //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
                //de productos por categoría.
                minCount = document.getElementById("rangeFilterCountMin").value;
                maxCount = document.getElementById("rangeFilterCountMax").value;

                if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
                    minCount = parseInt(minCount);
                }
                else {
                    minCount = undefined;
                }

                if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
                    maxCount = parseInt(maxCount);
                }
                else {
                    maxCount = undefined;
                }

                cargarDatos(arrayCars);
                /*sortAndShowCars(currentProductsArray);*/

            });

            document.getElementById("clearRangeFilter").addEventListener("click", function () {
                document.getElementById("rangeFilterCountMin").value = "";
                document.getElementById("rangeFilterCountMax").value = "";

                minCount = undefined;
                maxCount = undefined;

                cargarDatos(arrayCars);

            });
            document.getElementById("search").addEventListener('input', function(){
                search = document.getElementById("search").value.toLowerCase();
                cargarDatos(arrayCars);
            });
        };
    });
});    