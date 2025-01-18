function displayDetails(){
    let proDetails = document.getElementById("pro-details");
    let proImage = document.getElementById("pro-image");
    let proDes = document.getElementById("pro-des");
    let getProduct = JSON.parse(localStorage.getItem("selectedProducts")) || [] ;
    let cartProducts = JSON.parse(localStorage.getItem("cartproducts")) || [];



        let productImage  = document.createElement("img");
        let productBrand = document.createElement("h2");
        let productDes = document.createElement("h5");
        let productquantity = document.createElement("h3");
        let productprice = document.createElement("h4");
        let cartLink = document.createElement("button");
        cartLink.classList.add("cart-btn") ;
        let buyButton = document.createElement("button");
        buyButton.classList.add("buy-btn");
        productBrand.textContent = getProduct.brandName;
        productDes.textContent = getProduct.productDescription;
        productquantity.textContent = "Available:" + getProduct.productQuantity;
        productprice.textContent = "₹" + getProduct.productPrice;
        cartLink.innerText = "Add To Cart";
        buyButton.innerText = "Buy Now" ;
        productImage.src = getProduct.image;

        proImage.appendChild(productImage);
        proDes.appendChild(productBrand);
        proDes.appendChild(productDes);
        proDes.appendChild(productquantity);
        proDes.appendChild(productprice);
        proDes.appendChild(cartLink);
        proDes.appendChild(buyButton);

        proDetails.appendChild(proImage);
        proDetails.appendChild(proDes);

        cartLink.addEventListener("click", function () {
            // Retrieve user data from localStorage
            let userArray = JSON.parse(localStorage.getItem("getuserdata")) || [];
            let userData = userArray[0]; // Assuming the first user is the one logged in
        
            // Retrieve existing cart data from localStorage
            let cartProducts = JSON.parse(localStorage.getItem("cartproducts")) || [];
        
            // Create a product object (replace getProduct with actual product data)
            let productData = {
                image: getProduct.image,    
                name: getProduct.brandName, // Assuming getProduct is an object with product details
                price: getProduct.productPrice,
                description: getProduct.productDescription,
                count: getProduct.productQuantity,
            };
        
            // Find if the user already has an entry in the cartProducts array
            const existingCartIndex = cartProducts.findIndex(
                (data) => data.username === userData.createUsername
            );
        
            if (existingCartIndex !== -1) {
                // Check if the product is already in the user's cart
                const existingProductIndex = cartProducts[existingCartIndex].products.findIndex(
                    (product) => product.description === productData.description && product.price === productData.price
                );
        
                if (existingProductIndex !== -1) {
                    // If the product is already in the cart
                    alert("This product is already in your cart.");
                } else {
                    // If the product is not in the cart, add it to the user's product list
                    cartProducts[existingCartIndex].products.push(productData);
                    // Save updated cart data to localStorage
                    localStorage.setItem("cartproducts", JSON.stringify(cartProducts));
                    alert("Your product has been added to your cart");
                }
            } else {
                // If the user does not exist, create a new entry with the product array
                cartProducts.push({
                    username: userData.createUsername,
                    products: [productData],
                });
                // Save updated cart data to localStorage
                localStorage.setItem("cartproducts", JSON.stringify(cartProducts));
                alert("Your product has been added to your cart");
            }
        
            // Reload the page to reflect changes (if necessary)
            window.location.reload();
        });       
        buyButton.addEventListener("click", function () {
            let userArray = JSON.parse(localStorage.getItem("getuserdata")) || [];
            let userData = userArray[0]; // Assuming the first user is the one logged in
        
            let orderProducts = JSON.parse(localStorage.getItem("orderproducts")) || [];
            const existingPro = orderProducts.findIndex(data => data.username === userData.createUsername);
        
            // Prepare the order data with the selected product
            let orderData = {
                image: getProduct.image,
                name: getProduct.brandName,
                description: getProduct.productDescription,
                price: getProduct.productPrice,
            };
        
            if (existingPro !== -1) {
                // If the user has already placed an order, append the new order products to their existing list
                orderProducts[existingPro].products.push(orderData);
                localStorage.setItem("orderproducts", JSON.stringify(orderProducts));
                alert("Your Product has been added to the order list.");
            } else {
                // If no previous order exists for the user, create a new order entry
                orderProducts.push({
                    username: userData.createUsername,
                    products: [orderData], // Add the new product
                });
                localStorage.setItem("orderproducts", JSON.stringify(orderProducts));
                alert("Your Product has been placed in the order.");
            }
        
            // Optionally, navigate to the order page to show the order details immediately
            window.location.href = "/order.html"; // Make sure the correct URL path is used for your order page
        });
        
}
 displayDetails();

 let reviewForm = document.getElementById("review-form");

 reviewForm.addEventListener("submit",function(event){
       event.preventDefault();

       let userName = document.getElementById("name").value;
       let productRating = document.getElementById("rating").value;
       let userReview = document.getElementById("your-review").value;
       let submitReview = document.getElementById("submit-btn");

       let getProduct = JSON.parse(localStorage.getItem("selectedProducts")) || [] ;
 
       let productReview = JSON.parse(localStorage.getItem("ProductReview")) || [] ;

       let reviewData = {
             productDescription : getProduct.productDescription ,
             username : userName ,
             productrating : productRating ,
             userreview : userReview , 
       };

       productReview.push(reviewData);

       localStorage.setItem("ProductReview",JSON.stringify(productReview));

       window.alert("Your review are submitted , successfully");

       window.location.reload();
      displayReview();
 });

 function displayReview(){
        let reviewList = document.getElementById("review-list");
        let productReview = JSON.parse(localStorage.getItem("ProductReview")) || [] ;
        let getProduct = JSON.parse(localStorage.getItem("selectedProducts")) || [] ;

        reviewList.innerHTML = "";

        let filteredReviews = productReview.filter(data =>
                data.productDescription === getProduct.productDescription);

                filteredReviews.forEach( data => {
                        let reviewContainer = document.createElement("div");
                        reviewContainer.classList.add("review-item");
        
                        reviewContainer.innerHTML = `<h3> Name: ${data.username} </h3>
                        <h5> Rating: ${data.productrating} </h5>
                        <h4> ${data.userreview} </h4>`;
        
                        reviewList.appendChild(reviewContainer);
                });
 }

 displayReview();

 document.getElementById("show-questions-btn").addEventListener("click", function(){

       const faqSection = document.getElementById("faq-section");
       faqSection.classList.toggle("hidden");
 });

const questions = Array.from(document.querySelectorAll(".faq-question"));

questions.forEach(function(question){
        question.addEventListener("click",function(event){
         const answer  = question.querySelector(".faq-answer");
          if(answer){
                answer.remove();
          } else{
                const newAnswer = document.createElement("div");
                newAnswer.classList.add("faq-answer");
                newAnswer.textContent = question.getAttribute("data-answer");
                question.appendChild(newAnswer);
          }          
        });
});

function exploreProducts(){
      let productContainer = document.getElementById("product-container");
      let proContainer = document.getElementById("pro-container");
      let storedProducts = JSON.parse(localStorage.getItem("products")) || [];
      let wishlist = JSON.parse(localStorage.getItem('mylist')) || [];

      if(storedProducts.length > 0){

            function shuffleProducts(products,count){
                 return products.sort(() =>
                  0.5 - Math.random()).slice(0,count);
            }

            let randomProducts = shuffleProducts(storedProducts,4);

            randomProducts.forEach(item =>{
                  const productElement = document.createElement('div');
                  productElement.classList.add('pro');
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
          
                  proContainer.appendChild(productElement);
                  productElement.appendChild(wishIcon);
                  productContainer.appendChild(proContainer);
          
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
};

};

exploreProducts();
