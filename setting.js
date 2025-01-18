let accountArrow = document.getElementById("arrow-right1");

accountArrow.addEventListener("click", function () {
  let accountModel = document.getElementById("account-model");
  accountModel.style.display = "block";

  let emptyContent = document.getElementById("empty-content");
  emptyContent.style.display = "none";

  let accountSetting = document.getElementById("account-setting");
  accountSetting.style.backgroundColor = "#5bc0be";

  let logoutBtn  = document.getElementById("logout-btn") ;

logoutBtn.addEventListener("click", function(){
    let logoutModel = document.getElementById("logout-model") ;
    logoutModel.style.display = "block" ;

    accountModel.style.display = "none" ;

    let noBtn = document.getElementById("no-btn") ;
    noBtn.addEventListener("click", function(){
        logoutModel.style.display = "none" ;
        accountModel.style.display = "block" ;
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

  let closeButton = document.getElementById("close");
  closeButton.addEventListener("click", function () {
    emptyContent.style.display = "block";
    accountModel.style.display = "none";
    accountSetting.style.backgroundColor = "#f9f9f9";
  });

  let userArray = JSON.parse(localStorage.getItem("getuserdata"));
  let userData = userArray[0];

  let fullName = document.getElementById("full-name");
  let userName = document.getElementById("user-name");

  fullName.innerHTML = `
    <h3>
      Full Name : <h4>${userData.fullName}</h4>
    </h3>
  `;

  userName.innerHTML = `
    <h3>
      User Name : <h4>${userData.createUsername}</h4>
    </h3>
  `;

  accountModel.appendChild(fullName);
  accountModel.appendChild(userName);

  let editProfileBtn = document.getElementById("edit-profile");

  editProfileBtn.addEventListener("click", function () {
    accountModel.style.display = "none";
    emptyContent.style.display = "none";

    let profileEditModel = document.getElementById("profile-edit-model");
    profileEditModel.style.display = "block";

    let editForm = document.getElementById("edit-form");

    editForm.addEventListener("submit", function (event) {
      event.preventDefault();

      try {
        let newFullname = document.getElementById("new-fullname").value;
        let newUsername = document.getElementById("new-username").value;
        let currPassword = document.getElementById("curr-password").value;
        let newPassword = document.getElementById("new-password").value;

        console.log({ newFullname, newUsername, currPassword, newPassword });

        if (!newFullname || !newUsername || !currPassword || !newPassword) {
          alert("Please fill in all fields");
          return;
        }

        let userArray = JSON.parse(localStorage.getItem("getuserdata")) || [];
        let userData = userArray[0];
        console.log({ userData });

        if (currPassword !== userData.setPassword) {
          alert("Your Current Password is incorrect, try again");
          return;
        }

        let newUserData = {
          fullName: newFullname,
          createUsername: newUsername,
          setPassword: newPassword,
        };

        let newArray = [newUserData];
        console.log(newArray);

        localStorage.setItem("getuserdata", JSON.stringify(newArray));
        alert("Your Profile Data Changed, Successfully");
        window.location.reload();
        accountModel.style.display = "block";
        profileEditModel.style.display = "none";
        
      } catch (error) {
        console.error("An error occurred:", error);
        alert(
          "An error occurred while updating your profile. Please try again."
        );
      }
    });

    let closeEditBtn = document.getElementById("close-edit");
    closeEditBtn.addEventListener("click", function () {
      accountModel.style.display = "block";
      profileEditModel.style.display = "none";
      emptyContent.style.display = "none";
    });
  });
});

// address setting //

let addressArrow = document.getElementById("arrow-right2");

addressArrow.addEventListener("click", function () {
  let addressModel = document.getElementById("address-model");
  addressModel.style.display = "block";

  let emptyContent = document.getElementById("empty-content");
  emptyContent.style.display = "none";

  let addressSetting = document.getElementById("address-setting");
  addressSetting.style.backgroundColor = "#5bc0be";

  let closeAddressButton = document.getElementById("close-address-model");
  closeAddressButton.addEventListener("click", function () {
    emptyContent.style.display = "block";
    addressModel.style.display = "none";
    addressSetting.style.backgroundColor = "#f9f9f9";
  });

  let addressArea = document.getElementById("delivery-address");

  let userArray = JSON.parse(localStorage.getItem("getuserdata")) || [];
  let userData = userArray[0]; 

  
  let userLocation = JSON.parse(localStorage.getItem("userlocation")) || [];

  if (!Array.isArray(userLocation)) {
    userLocation = [];
  }

  let currentUserLocation = userLocation.find(
    (loc) => loc.userName === userData.createUsername
  );

  if (currentUserLocation) {
    addressArea.innerHTML = `<h3>Delivery Location :</h3> <h4>${currentUserLocation.location}</h4>`;
  } else {
    addressArea.innerHTML = `<h3>Delivery Location :</h3> <h4>Please Set Your Location</h4>`;
  }

  addressModel.appendChild(addressArea);

  let setAddressBtn = document.getElementById("set-address-btn");

  setAddressBtn.addEventListener("click", function () {
    addressModel.style.display = "none";
    emptyContent.style.display = "none";

    let setAddressModel = document.getElementById("set-address-model");
    setAddressModel.style.display = "block";

    let closeEditBtn = document.getElementById("close-set-address-model");
    closeEditBtn.addEventListener("click", function () {
      addressModel.style.display = "block";
      setAddressModel.style.display = "none";
      emptyContent.style.display = "none";
    });

    let addressForm = document.getElementById("address-form");

    addressForm.addEventListener("submit", function (event) {
      event.preventDefault();

      try {
        let enterLocation = document.getElementById("enter-location").value;

        if (!enterLocation) {
          alert("Please fill in the location field");
          return;
        }

        let userArray = JSON.parse(localStorage.getItem("getuserdata")) || [];
        let userData = userArray[0]; 

        let userLocation =
          JSON.parse(localStorage.getItem("userlocation")) || [];

        if (!Array.isArray(userLocation)) {
          userLocation = [];
        }

        let existingUserIndex = userLocation.findIndex(
          (loc) => loc.userName === userData.createUsername
        );

        if (existingUserIndex !== -1) {
          userLocation[existingUserIndex].location = enterLocation;
        } else {
          userLocation.push({
            userName: userData.createUsername,
            location: enterLocation,
          });
        }

        localStorage.setItem("userlocation", JSON.stringify(userLocation));

        alert("Your Location Data Saved Successfully");

        window.location.reload();
      } catch (error) {
        console.error("Error occurred in saving location data", error);
      }
    });
  });
});


// seller setting //

let sellerArrow = document.getElementById("arrow-right3");

sellerArrow.addEventListener("click", function(){
  let  sellerModel = document.getElementById("seller-model");
  sellerModel.style.display = "block";

  let emptyContent = document.getElementById("empty-content");
  emptyContent.style.display = "none";

  let sellerSetting = document.getElementById("seller-setting");
  sellerSetting.style.backgroundColor = "#5bc0be";

  let closeSellerButton = document.getElementById("close-seller-model");
  closeSellerButton.addEventListener("click", function () {
    emptyContent.style.display = "block";
    sellerModel.style.display = "none";
    sellerSetting.style.backgroundColor = "#f9f9f9";
  });

  let addProductButton = document.getElementById("add-product-btn");
  addProductButton.addEventListener("click", function(){
    let ProductUpload = document.getElementById("product-upload");
    ProductUpload.style.display = "block";
    sellerModel.style.display = "none";
    emptyContent.style.display = "none";

    let closeButton = document.getElementById("close-btn");
    closeButton.addEventListener("click", function(){
      ProductUpload.style.display = "none" ;
      sellerModel.style.display = "block" ;
      emptyContent.style.display = "none" ;
    });
    
    let productForm = document.getElementById("product-form");

    productForm.addEventListener("submit",function(event){
      event.preventDefault();
      const brandName = document.getElementById('brand-name').value;
      const productQuantity = document.getElementById('product-quantity').value;
      const productDescription = document.getElementById('product-des').value;
      const productPrice = document.getElementById('product-price').value;
      const imageFile = document.getElementById('image-upload').files[0];
   
      
      if (!brandName || !productQuantity || !productDescription || !productPrice || !imageFile) {
          alert("Please fill in all fields");
          return;
      }
      const reader = new FileReader();
      reader.onloadend = function() {
          const imageBase64 = reader.result; // Get the base64 image data

          const productData = {
              brandName: brandName ,
              productQuantity: productQuantity,
              productDescription: productDescription,
              productPrice: productPrice,
              image: imageBase64,
          };
   
          // Get the existing data from localStorage (if any)
          let storedProducts = JSON.parse(localStorage.getItem('products')) || [];
   
          // Add the new product to the stored data
          storedProducts.push(productData);
   
          // Save the updated data back to localStorage
          localStorage.setItem('products', JSON.stringify(storedProducts));
   
          // Optionally, you can reset the form fields here
          document.getElementById('product-form').reset();
   
          alert("Product added successfully!");

          ProductUpload.style.display = "none";
          window.location.reload();
      };
   
      // Read the image as a Data URL (base64)
      reader.readAsDataURL(imageFile);
   });
   
  })


})