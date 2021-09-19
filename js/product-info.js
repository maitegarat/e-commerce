

 function showCarInfo(array) {
    let auto = document.getElementById("autoInfo");
    let autoId = localStorage.getItem("idAuto")  
      let mostrar = "";
      
      mostrar = `

        <div>
            <div class="infocentrado">
                <br>
                <h3>${array.name}</h3>
                <br>
                <p>${array.description}</p>
                <p class = "precio">${array.cost} ${array.currency}</p>
                <em> Artículos vendidos: ${array.soldCount}</em>
                <hr>
                <button onclick="location.href='#'" class="btn btn-outline-dark btn-see-more"> Comprar</button>
            </div>
            <br>
            <div id="carouselExampleIndicators" class="carousel slide w-50" data-ride="carousel">
             
             <div class="carousel-inner">
                    <div class="carousel-item active">
                     <img class="d-block w-100" width="780px" src="img/prod`+autoId+`.jpg">
                    </div>
                    <div class="carousel-item">
                     <img class="d-block w-100" width="780px" src="img/prod`+autoId+`_1.jpg">
                    </div>
                    <div class="carousel-item">
                     <img class="d-block w-100" width="780px" src="img/prod`+autoId+`_2.jpg">
                    </div>
                    <div class="carousel-item">
                     <img class="d-block w-100" width="780px" src="img/prod`+autoId+`_3.jpg">
                    </div>
                    <div class="carousel-item">
                     <img class="d-block w-100" width="780px" src="img/prod`+autoId+`_4.jpg">
                    </div>        
             </div>

             <a class="carousel-control-prev left" href="#carouselExampleIndicators" role="button" data-slide="prev">
                 <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                 <span class="sr-only">Previous</span>
             </a>

             <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                 <span class="carousel-control-next-icon" aria-hidden="true"></span>
                 <span class="sr-only">Next</span>
             </a>

             <ol class="carousel-indicators">
                 <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"><img class="d-block w-100" src="img/prod`+autoId+`.jpg"></li>
                 <li data-target="#carouselExampleIndicators" data-slide-to="1"><img class="d-block w-100" src="img/prod`+autoId+`_1.jpg"></li>
                 <li data-target="#carouselExampleIndicators" data-slide-to="2"><img class="d-block w-100" src="img/prod`+autoId+`_2.jpg"></li>
                 <li data-target="#carouselExampleIndicators" data-slide-to="3"><img class="d-block w-100" src="img/prod`+autoId+`_3.jpg"></li>
                 <li data-target="#carouselExampleIndicators" data-slide-to="4"><img class="d-block w-100" src="img/prod`+autoId+`_4.jpg"></li>
             </ol>

            </div>
            
        </div>`;

    auto.innerHTML = mostrar;
    };

    
    function showComments(comments){
        let commentsArea = document.getElementById("commentsArea");
        let arrayComentarios = "";
        
        for(let i=0; i < comments.length; i++){
            arrayComentarios += `
             <div class="comentarios"><strong>`+ comments[i].user + `</strong><div class="fecha" style="display: inline;"> <small> ` + comments[i].dateTime +` </small> </div></div>
             <div class="desc"><p>`+ comments[i].description +`</div>
             <div class="scores"> Puntuación: `+ comments[i].score +" "        
                for (let j=0; j < comments[i].score; j++){
                    arrayComentarios += `<span class="fa fa-star checked"></span>`;
                }
                for (let k = comments[i].score + 1; k <= 5; k++){
                    arrayComentarios += `<span class="far fa-star"></span>`   
                }
               `</div>
                        
             `;

        }
        commentsArea.innerHTML = arrayComentarios;
       
    }

    document.addEventListener("DOMContentLoaded", function (e) {
              
        if (localStorage.getItem("idAuto") === "1" ) { 
         url =  "https://japdevdep.github.io/ecommerce-api/product/5678.json";
        } else if (localStorage.getItem("idAuto").value === "2" ) {
          url =  "https://raw.githubusercontent.com/maitegarat/e-commerce/main/js/products-info2.json";
        }else if (localStorage.getItem("idAuto") === "3") {
           url = "https://raw.githubusercontent.com/maitegarat/e-commerce/main/js/products-info3.json";
        } else {
            url = "https://raw.githubusercontent.com/maitegarat/e-commerce/main/js/products-info4.json";
        };

        getJSONData(url).then(function (resultObj) {
            if (resultObj.status === "ok") {
                infoAuto = resultObj.data;
             showCarInfo(infoAuto);
            }
            else{
                throw Error(resultObj.statusText)
            }
        });
      
        getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                carComments = resultObj.data;
                showComments(carComments);
            }
            else{
                throw Error(resultObj.statusText)
            }
        });

        document.getElementById("sendComm").addEventListener("click", function(){

            
        let date= new Date();
        let dia = date.getDay();
        let mes = date.getMonth();
        let anio = date.getFullYear();
        let hora = date.getHours();
        let minutos = date.getMinutes();
        let sec = date.getSeconds();
        let fecha = anio + "-" + mes + "-" + dia + " " + hora + ":" + minutos + ":" + sec;





            let newComment = {
                id_auto: JSON.parse(localStorage.getItem('idAuto')),
                user: localStorage.getItem('user'),
                description: document.getElementById('newCommArea').value,
                dateTime: fecha,
                score: getRating()
            };

        
            carComments.push(newComment);
            
            showComments(carComments);
            document.getElementById('newCommArea').value = "";

           
        });
    });

