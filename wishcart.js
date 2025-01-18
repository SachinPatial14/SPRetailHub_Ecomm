document.addEventListener('DOMContentLoaded', function () {
    let proContainer = document.getElementById("pro-container");
    let wishlist = JSON.parse(localStorage.getItem('mylist')) || [];

    if (wishlist.length === 0) {
        const emptyMessage = document.createElement("div");
        emptyMessage.setAttribute("class", "empty-message");
        emptyMessage.innerHTML = "<h3>Your wishlist is empty</h3>";
        proContainer.appendChild(emptyMessage);
    }else{
    wishlist.forEach((item) => {
        const proDiv = document.createElement("div");
        proDiv.setAttribute("class", "pro");
        const desDiv = document.createElement("div");
        desDiv.setAttribute("class", "des");
        const wishIcon = document.createElement("div");
         wishIcon.setAttribute("class", "wish-icon");
         wishIcon.innerHTML = `<i class="fa-regular fa-heart"></i>`; 
     
         if (wishlist.some(product => product.productDescription === item.productDescription)) {
            wishIcon.style.color = "red";
            };   

        proDiv.innerHTML = `<img src="${item.image}" alt="${item.brandName}">`;
        desDiv.innerHTML = `<span>${item.brandName}</span>
                            <h5>${item.productDescription}</h5>
                            <h4>₹${item.productPrice}</h4>
                            <h3>Available: ${item.productQuantity}</h3>`;
        
        proDiv.appendChild(wishIcon);
        proDiv.appendChild(desDiv);
        proContainer.appendChild(proDiv);

        proDiv.addEventListener("click",function(event){
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
                window.location.reload();
            }   
        });        
    });
}
});
