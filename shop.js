let productContainer = document.getElementById("pro-container");
let paginationContainer = document.getElementById("pagination");


function displayProducts(page = 1) {
    let storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    let wishlist = JSON.parse(localStorage.getItem('mylist')) || [];

    const itemsPerPage = 12;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;

    productContainer.innerHTML = '';

    storedProducts.slice(startIndex, endIndex).forEach(item => {
        const productElement = document.createElement('div');
        productElement.classList.add('pro');
        const cartAnchorDiv = document.createElement("div");
        const wishIcon = document.createElement("div");
         wishIcon.setAttribute("class", "wish-icon");
         wishIcon.innerHTML = `<i class="fa-regular fa-heart"></i>`; 
         
         if (wishlist.some(product => product.productDescription === item.productDescription)) {
            wishIcon.style.color = "red";
            };   
     
        productElement.innerHTML = `
            <img src="${item.image}" alt="${item.brandName}">
            <div class="des">
                <h5>${item.brandName}</h5>
                <span>${item.productDescription}</span>
                <h4>₹${item.productPrice}</h4>
                <h3>Available: ${item.productQuantity}</h3>
            </div>
        `;

        productContainer.appendChild(productElement);
        productElement.appendChild(wishIcon);

        productElement.addEventListener("click",function(event){
            localStorage.setItem("selectedProducts", JSON.stringify(item));
            window.location.href = "/prodetails.html"
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

    // Call the function to create pagination buttons
    createPaginationButtons(storedProducts.length, itemsPerPage, page);
}

function createPaginationButtons(totalItems, itemsPerPage, currentPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    paginationContainer.innerHTML = ''; 

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('pagination-btn');
        button.classList.toggle('active', i === currentPage); // Highlight current page

        button.addEventListener('click', () => {
            displayProducts(i); // Display products for the selected page
        });

        paginationContainer.appendChild(button);
    }
}

// Display products on page load (default page is 1)
window.onload = () => {
    displayProducts(1); // Load the first page
};


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



