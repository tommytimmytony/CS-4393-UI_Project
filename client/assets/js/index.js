// to get current year
function getYear() {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

// isotope js
$(window).on("load", function () {
  $(".filters_menu li").click(function () {
    $(".filters_menu li").removeClass("active");
    $(this).addClass("active");

    var data = $(this).attr("data-filter");
    $grid.isotope({
      filter: data,
    });
  });

  var $grid = $(".grid").isotope({
    itemSelector: ".all",
    percentPosition: false,
    masonry: {
      columnWidth: ".all",
    },
  });
});

// nice select
$(document).ready(function () {
  $("select").niceSelect();
});

/** google_map js **/
function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(40.712775, -74.005973),
    zoom: 18,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

updateActiveUser();
function updateActiveUser() {
  const activeUserEl = document.querySelector(".nav-link.user");
  const user = localStorage.getItem("activeUser");
  if (user != null) {
    activeUserEl.textContent = user;
  }
}

$(document).ready(function () {
  $("a").on("click", function (event) {
    const itemName = $(this).attr("itemName");
    const item = itemName.split("#");
    const name = item[0];
    const price = Number(item[1]);
    const desc = item[2];
    console.log(name, price, desc);
    const ordersInfo = {};
    ordersInfo[name] = {};
    ordersInfo[name].price = price;
    ordersInfo[name].description = desc;
    ordersInfo[name].name = name;
    ordersInfo[name].qty = 1;
    const dataJson = localStorage.getItem("ordersInfo");
    const oldData = JSON.parse(dataJson);
    for (const key in oldData) {
      if (oldData[key].qty == 0) {
        continue;
      }
      ordersInfo[key] = oldData[key];
    }
    localStorage.setItem("ordersInfo", JSON.stringify(ordersInfo));
  });
});
