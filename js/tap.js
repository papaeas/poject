window.fn = {};

window.fn.toggleMenu = function () {
  document.getElementById('appSplitter').right.toggle();
};

window.fn.loadView = function (index) {
  document.getElementById('appTabbar').setActiveTab(index);
  document.getElementById('sidemenu').close();
};

window.fn.loadLink = function (url) {
  window.open(url, '_blank');
};

window.fn.pushPage = function (page, anim) {
  if (anim) {
    document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title }, animation: anim });
  } else {
    document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title } });
  }
};


 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyANJUsvkZeNUXBy9rtap_A8lLugqg8v-j4",
  authDomain: "food042.firebaseapp.com",
  databaseURL: "https://food042.firebaseio.com",
  projectId: "food042",
  storageBucket: "food042.appspot.com",
  messagingSenderId: "272795893794",
  appId: "1:272795893794:web:d35a5b2f8b176df5ce8a7b",
  measurementId: "G-F7ZLXL0PN0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  firebase.analytics();

const db = firebase.firestore();

  document.addEventListener('init', function (event) {
    var page = event.target;
  
  
    if (page.id === 'homePage') {
      console.log("homePage");
  
      $("#thaibtn").click(function () {
        localStorage.setItem("selectedCategory", "thai");
        $("#content")[0].load("category.html");
      });
  
      $("#drinkbtn").click(function () {
        localStorage.setItem("selectedCategory", "drink");
        $("#content")[0].load("category.html");
      });
  
      $("#menubtn").click(function () {
        $("#sidemenu")[0].open();
      });
  
      $("#carousel").empty();
        const carousel = $("#carousel");
        db.collection("recommended").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const item = `<ons-carousel-item modifier="novider" id="item${doc.data().id}" class="recomended_item">
                <div class="thumbnail" style="background-image: url('${doc.data().PhotoUrl}')"></div>
                </ons-carousel-item>`;
                carousel.append(item);
            });
        });
        
      // $("#carousel").empty();
      // db.collection("recommended").get().then((querySnapshot) => {
      //   querySnapshot.forEach((doc) => {
      //     var item = `<ons-carousel-item modifier="nodivider" id="item${doc.data().id}" class="recomended_item">
      //         <div class="thumbnail" style="background-image: url('${doc.data().PhotoUrl}')">
      //         </div>
      //         <div class="recommended_item_title" id="item1_${doc.data().id}">${doc.data().name}</div>
      //     </ons-carousel-item>`
      //     $("#carousel").append(item);
      //   });
      // });

    }

   if (page.id === 'menuPage') {
      console.log("menuPage");
  
      $("#login").click(function () {
        $("#content")[0].load("login.html");
        $("#sidemenu")[0].close();
      });
  
      $("#home").click(function () {
        $("#content")[0].load("home.html");
        $("#sidemenu")[0].close();
      });
    }
  
    if (page.id === 'categoryPage') {
      var category = localStorage.getItem("selectedCategory");
      console.log("categoryPage:" + category);
  
      $("#header").html(category);
  
      $("#menubtn").click(function () {
        $("#sidemenu")[0].open();
      });
  
      $("#list").empty();
      db.collection("recommended").where("category", "==", category).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var item = `<ons-row class="category">
                  <ons-col modifier="nodivider">
                      <div class="category_header" style="background-image: url('${doc.data().photoUrl}')">
                          <figure class="category_thumbnail" id="thaibtn">
                              <div class="category_title" id="Category_1_name">${doc.data().name}</div>
                          </figure>
                      </div>
                  </ons-col>
           </ons-row>`
          $("#list").append(item);
          console.log(doc.data().name);
          
        });
      });
  
    }
  
    if (page.id === 'loginPage') {
      console.log("loginPage");
  
      $("#backhomebtn").click(function () {
        $("#content")[0].load("home.html");
      });
    }
  });

  document.addEventListener('prechange', function(event) {
    document.querySelector('ons-toolbar .center')
      .innerHTML = event.tabItem.getAttribute('label');
  });