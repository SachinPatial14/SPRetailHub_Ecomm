
function displayCartProducts() {
    // Retrieve user data and cart data
    let userArray = JSON.parse(localStorage.getItem("getuserdata")) || [];
    let userData = userArray[0]; // Assuming the first user is the one logged in
    let cartProducts = JSON.parse(localStorage.getItem("cartproducts")) || [];
  
    // Find the cart entry for the current user
    const userCart = cartProducts.find((data) => data.username === userData.createUsername);
  
    // Get the container where products will be displayed
    let proContainer = document.getElementById("pro-container");
  
    if (userCart && userCart.products.length > 0) {
      // If products are found in the user's cart, display them dynamically
      proContainer.innerHTML = ""; // Clear any previous content
  
      userCart.products.forEach((product) => {
        // Create elements for each product
        const proDiv = document.createElement("div");
        proDiv.setAttribute("class", "pro");
        const desDiv = document.createElement("div");
        desDiv.setAttribute("class", "des");

  
        proDiv.innerHTML = `<img src="${product.image}">` ;
        desDiv.innerHTML = `<span>${product.name}</span>
        <h5>${product.description}</h5>
        <h4>₹${product.price}</h4>
        <h3>Available: ${product.count}</h3>`;
        
        // Append product to the container
        proDiv.appendChild(desDiv);
        proContainer.appendChild(proDiv);
      });
    } else {
      // If no products found, display a message
      proContainer.innerHTML = "<p>No items found in your cart.</p>";
    }
  }
  
  // Call the displayCartProducts function to show the cart content
  displayCartProducts();


  let emptyCartBtn = document.getElementById("remove-btn");

  emptyCartBtn.addEventListener("click", function () {
      let userArray = JSON.parse(localStorage.getItem("getuserdata")) || [];
      let userData = userArray[0]; // Assuming the first user is the one logged in
      let cartProducts = JSON.parse(localStorage.getItem("cartproducts")) || [];
  
      // Find the cart entry for the current user
      const userCartIndex = cartProducts.findIndex((data) => data.username === userData.createUsername);
  
      if (userCartIndex !== -1) {
          // Remove all products from the user's cart
          cartProducts[userCartIndex].products = [];
  
          // Save the updated cart to localStorage
          localStorage.setItem("cartproducts", JSON.stringify(cartProducts));
  
          // Re-display the cart products (empty message)
          displayCartProducts();
  
          alert("Your cart has been emptied.");
      } else {
          alert("No items found in your cart.");
      }
  });

  
  let orderBtn = document.getElementById("order-btn");

  orderBtn.addEventListener("click", function(){
      let userArray = JSON.parse(localStorage.getItem("getuserdata")) || [];
      let userData = userArray[0]; // Assuming the first user is the one logged in
      let cartProducts = JSON.parse(localStorage.getItem("cartproducts")) || [];
    
      // Find the cart entry for the current user
      const userCart = cartProducts.find((data) => data.username === userData.createUsername);
  
      if (userCart && userCart.products.length > 0) {
          let orderProducts = JSON.parse(localStorage.getItem("orderproducts")) || [];
          const existingPro = orderProducts.findIndex(data => data.username === userCart.username);
  
          // Prepare orderData by mapping over all the products in the cart
          let orderData = userCart.products.map(product => ({
              image: product.image,
              name: product.name,
              description: product.description,
              price: product.price,
          }));
  
          if (existingPro !== -1) {
              // If the user has already placed an order, append the new order products to their existing list
              orderProducts[existingPro].products.push(orderData); // Using spread operator to add all products
              localStorage.setItem("orderproducts", JSON.stringify(orderProducts));
          } else {
              // If no previous order exists for the user, create a new order entry
              orderProducts.push({
                  username: userCart.username,
                  products: orderData,
              });
              localStorage.setItem("orderproducts", JSON.stringify(orderProducts));
          }
  
          // Empty the cart after placing the order
          userCart.products = [];  // Empty the cart
          localStorage.setItem("cartproducts", JSON.stringify(cartProducts)); // Save the updated cart
  
          alert("Your order has been placed. Your cart is now empty.");
  
          // Re-display the cart (empty message)
          displayCartProducts();
  
          window.location.reload();  // Reload the page to reflect changes
      } else {
          alert("Your cart is empty. Please add products to your cart before placing an order.");
      }
  });
  