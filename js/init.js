const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://raw.githubusercontent.com/maitegarat/e-commerce/main/js/products.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
};



/*Función que se ejecuta una vez que se haya lanzado el evento de
que el documento se encuentra cargado, es decir, se encuentran todos los
elementos HTML presentes*/


document.addEventListener("DOMContentLoaded", function(e){
  let username = window.localStorage.getItem('user');
  let user_logged = document.getElementById('user-logged');
   
  user_logged.innerHTML  = `<button type="button" class="btn btn-default dropdown-toggle" style="color: white;" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <span class="icon-user" id= "user_logged" style="color: white;"> </span> `+ username +`
  <span class="caret"></span>
</button>
<ul class="dropdown-menu">
  <li><a href="my-profile.html">Perfil</a></li>
  <li><a href="#">Lista de Deseos</a></li>
  <li><a href="#">Mis Compras</a></li>
  <li><a href="cart.html">Mi Carrito</a></li>
  <li><hr></li>
  <li><a href="#" id="Singout" onclick="signOut()">Cerrar Sesión</a></li>
</ul> `

 document.getElementById("Singout").addEventListener("click", function() {
    localStorage.removeItem("user");
    window.location = "index.html";
  });
});