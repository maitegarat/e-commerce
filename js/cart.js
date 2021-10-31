

function ShowCartInfo(array) {
    
    let costxart = 0;
    let articleContent = "";
    let total = 0;

    for (let i = 0; i < array.length; i++) {
       
        if ( array[i].currency === "UYU" ) {
            costxart =array[i].unitCost
        }else{
            costxart =array[i].count*array[i].unitCost*40
        }
        
        articleContent += `
            <div class="row py-2 mt-2" id="producto${i}" >

                <div class="col-md-7 col-auto pb-3" >
                    <div class="media">
                        <img src="${array[i].src}" class="mr-3 img-thumbnail" style="height: 90px; width: 110px;" alt="">
                        <div class="media-body">
                            <div class="respFont" >${array[i].name}</div>
                        </div>
                    </div>
                </div>
        
                <div class="col-md-3 col-3"> 
                    <div class="row align-items-center input-group">
                        <button class="btn btn-outline-secondary" type="button" style="line-height:10px; height:30px; width: 30px; background-color: #FFFFFF; color:black;" 
                        onclick="suma(${costxart}, ${i})"> + </button> 
                        <input type="text" id="art${i}" value=${array[i].count} style="width: 40px;" onchange="subtotal(${costxart}, ${i})"> 
                        <button class="btn btn-outline-secondary" type="button" style="line-height:10px; height:30px; width: 30px; background-color: #FFFFFF; color:black;" 
                        onclick="resta(${costxart}, ${i})"> - </button> 
                    </div>
                </div>

                <div class="col-md-2 col-3 d-flex justify-content-end">
                    <p>$</p>
                    <span class="subtotal pr-1" id="precio${i}"> ${costxart*array[i].count}
                    </span>
                    <i class="far fa-times-circle" style="color:#af496b;" onclick="remove(${i})"></i>
                </div>

            </div>`;    
       
      total += costxart*array[i].count

           
    };
    
    
    document.getElementById("cartContent").innerHTML = articleContent;
    document.getElementById("total").innerHTML = "$" + total;
   
   
};

function remove(i){
    document.getElementById(`producto${i}`).remove();
    Total();
}

function suma(costxart, i){
let qty = parseInt(document.getElementById(`art${i}`).value) + 1;
document.getElementById(`art${i}`).value = qty;
subtotal(costxart, i);
};



function resta(costxart, i){
    if (document.getElementById(`art${i}`).value > 1) {
        let qty = parseInt(document.getElementById(`art${i}`).value) - 1;
        document.getElementById(`art${i}`).value = qty; 
        subtotal(costxart, i);
    } else {
        document.getElementById(`art${i}`).disabled = true;
    }
};

function subtotal(costxart, i){
    let subtotal = parseInt(document.getElementById(`art${i}`).value)*costxart;
    document.getElementById(`precio${i}`).innerHTML = subtotal;
    Total();
};

function Total(){
   let newtotal = 0;
   let subtotals = document.getElementsByClassName("subtotal")

   for (let i=0; i < subtotals.length; i++){
         newtotal += parseInt(subtotals[i].innerHTML)
    };

    document.getElementById("total").innerHTML = "$" + newtotal;
};

/*------------------------------PROXIMA ENTREGA--------------------------------------------------
function shipping() {
   shippingOption = document.getElementsByName("shipping")
  
   for (elements of shippingOption) {
       console.log(elements)
       if (elements.checked){ 
        let importeTotal = parseInt(document.getElementById("total").value)*elements.value
        document.getElementById("importeTotal").innerHTML = "Importe Total: " + importeTotal;
       }
   };
};
-------------------------------------------------------------------------------------------------*/ 



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartInfo = resultObj.data.articles;
            ShowCartInfo(cartInfo)
        } else {
            throw Error(resultObj.statusText)
        }
    });
});