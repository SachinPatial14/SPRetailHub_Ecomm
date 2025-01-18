function displayOrderProducts() {
    // Retrieve user data and order data from localStorage
    let userArray = JSON.parse(localStorage.getItem("getuserdata")) || [];
    let userData = userArray[0]; // Assuming the first user is the one logged in

    let orderProducts = JSON.parse(localStorage.getItem("orderproducts")) || [];
    const userOrder = orderProducts.find(data => data.username === userData.createUsername);

    let userLocation = JSON.parse(localStorage.getItem("userlocation")) || [];
    let currentUserLocation = userLocation.find(loc => loc.userName === userData.createUsername);

    let proContainer = document.getElementById("pro-container");

    // If the user has an order, display it
    if (userOrder && userOrder.products.length > 0) {
        proContainer.innerHTML = ""; // Clear the container

        userOrder.products.forEach(product => {
            const proDiv = document.createElement("div");
            proDiv.setAttribute("class", "pro");

            const desDiv = document.createElement("div");
            desDiv.setAttribute("class", "des");

            // Create message element for order status
            const msgElement = document.createElement("div");
            msgElement.setAttribute("class", "msg-element");

            // Set product details
            proDiv.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
            desDiv.innerHTML = `
                <span>${product.name}</span>
                <h5>${product.description}</h5>
                <h4>₹${product.price}</h4>
                <h3>Your Order will be Reached in 2 min</h3>
            `;

            // Append the product details and message element
            proDiv.appendChild(desDiv);
            desDiv.appendChild(msgElement);
            proContainer.appendChild(proDiv);

            // Set a timeout to show the delivery message after 2 minutes
            setTimeout(() => {
                if (currentUserLocation) {
                    msgElement.innerHTML = `<h3>Order has reached your ${currentUserLocation.location}</h3>`;
                } else {
                    msgElement.innerHTML = "<h3>Location data not available</h3>";
                }

                // Set another timeout to remove the order after 4 seconds
                setTimeout(() => {
                    // Remove the product from the order in localStorage
                    removeOrderFromLocalStorage(userData.createUsername);

                    // Optionally, update the UI to reflect the removal
                    proContainer.innerHTML = "<p>Your order has been removed.</p>";
                }, 4000); // After 4 seconds (4000 ms)

            }, 120000); // After 2 minutes (120000 ms)
        });
    } else {
        proContainer.innerHTML = "<p>No orders placed yet.</p>";
    }
}

// Function to remove order from localStorage
function removeOrderFromLocalStorage(username) {

    let userArray = JSON.parse(localStorage.getItem("getuserdata")) || [];
    let userData = userArray[0]; // Assuming the first user is the one logged in

    // Retrieve the order data
    let orderProducts = JSON.parse(localStorage.getItem("orderproducts")) || [];

    // Find the order entry for the user
    const orderIndex = orderProducts.findIndex(data => data.username === userData.createUsername);

    if (orderIndex !== -1) {
        // Remove the user's order
        orderProducts.splice(orderIndex, 1);

        // Save the updated order list back to localStorage
        localStorage.setItem("orderproducts", JSON.stringify(orderProducts));

        console.log(`Order for ${username} has been removed from localStorage.`);
    }
}

displayOrderProducts();
