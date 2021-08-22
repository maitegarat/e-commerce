
function cargarDatos(url) {
    document.getElementById("list").innerHTML = "";
   
    fetch(url)
        .then(respuesta => respuesta.json())
       
        .then(datos => {
                      
            for (let i = 0; i < datos.length; i++) {

            let lista = "";
            lista = `
                        <div  id = "center`+ i +`">
                            <p> <img src = "${ datos[i].imgSrc }" class = "imagsiz"> </p>
                            <h3>${datos[i].name}</h3>
                            <p class = "descrp">${datos[i].description}</p>
                            <p class = "precio">${datos[i].cost} ${datos[i].currency}</p>
                            <em> Artículos vendidos: ${datos[i].soldCount}</em>
                        </div>
                        
                        `;

                        document.getElementById("list").innerHTML += lista;
            };

           
        
        })
        .catch(error => alert("Hubo un error: " + error));
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    cargarDatos(PRODUCTS_URL)
});