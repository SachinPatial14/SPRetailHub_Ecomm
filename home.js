let shopHeroBtn = document.getElementById("shopherobtn");


function displayProducts (){
    let productSection = document.getElementById("product1");
    let proContainer = document.getElementById("pro-container");
    let storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    let wishlist = JSON.parse(localStorage.getItem('mylist')) || [];

    const limitedProducts = storedProducts.slice(0, 12);

  limitedProducts.forEach((item)=>{
   const proDiv = document.createElement("div");
   proDiv.setAttribute("class","pro");
   const desDiv  = document.createElement("div");
   desDiv.setAttribute("class","des");
   const wishIcon = document.createElement("div");
    wishIcon.setAttribute("class", "wish-icon");
    wishIcon.innerHTML = `<i class="fa-regular fa-heart"></i>`; 

    if (wishlist.some(product => product.productDescription === item.productDescription)) {
         wishIcon.style.color = "red";
         };


   proDiv.innerHTML = `<img src="${item.image}" alt="${item.brandName}">`
   desDiv.innerHTML = `<span>${item.brandName}</span>
   <h5>${item.productDescription}</h5>
   <h4>₹${item.productPrice}</h4>
   <h3>Available: ${item.productQuantity}</h3>`

   proDiv.appendChild(wishIcon); 
   proDiv.appendChild(desDiv);
   proContainer.appendChild(proDiv);
   productSection.appendChild(proContainer);

   proDiv.addEventListener("click",function(event){
    localStorage.setItem("selectedProducts", JSON.stringify(item));
    window.location.href = "/prodetails.html";
});

 
wishIcon.addEventListener("click", function (event) {
    event.stopPropagation(); 

    let wishlist = JSON.parse(localStorage.getItem('mylist')) || [];

    const itemIndex = wishlist.findIndex((product) =>
        product.productDescription === item.productDescription
    );

    if(itemIndex === -1){
        wishlist.push(item);
        localStorage.setItem("mylist",JSON.stringify(wishlist));
        alert("Product added to wishlist!");
        wishIcon.style.color ="red";
    }else{
        wishlist.splice(itemIndex, 1);
        localStorage.setItem("mylist", JSON.stringify(wishlist));
        alert("Product removed from wishlist!");
        wishIcon.style.color = "black";
    }   
});
});
};

displayProducts();

shopHeroBtn.addEventListener("click",()=>{
    window.location.href = "shop.html";
})
    
function doSearch() {
    let searchArea = document.getElementById("search-area").value;
    let storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    let found = false;

    const searchResults = storedProducts.filter(item => item.productDescription.toLowerCase().includes(searchArea.toLowerCase()) || item.brandName.toLowerCase().includes(searchArea.toLowerCase()));

    if (searchResults.length > 0) {
        localStorage.setItem("searchproducts", JSON.stringify(searchResults));
        window.location.href = "/searchpro.html";
    } else {
        alert("No products found matching your search.");
    }
}

let searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click",function(){
    doSearch();
})

let logoutBtn  = document.getElementById("logout-btn") ;

logoutBtn.addEventListener("click", function(){
    let logoutModel = document.getElementById("logout-model") ;
    logoutModel.style.display = "block" ;

    let noBtn = document.getElementById("no-btn") ;
    noBtn.addEventListener("click", function(){
        logoutModel.style.display = "none" ;
    });

    let yesBtn = document.getElementById("ok-btn") ;
    yesBtn.addEventListener("click", function(){
        let userArray = JSON.parse(localStorage.getItem("getuserdata")) || [];
        let userData = userArray[0]; 

        if( userData !== -1){

            userArray.splice(userData,1) ;
            localStorage.setItem("getuserdata", JSON.stringify(userArray)) ;
            alert("You have logged out") ;

            window.location.href = "index.html" ;
            logoutModel.style.display = "none" ;

        }
      

    })
})


