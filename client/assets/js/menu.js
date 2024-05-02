/** Tommy's Code **/
import { data } from "./data.js";
const mainContainer = document.querySelector(".food-container");
const itemContainer = document.getElementsByClassName("food_section-container");
const filterMenus = document.getElementsByClassName("filters_menu");
const rowGrid = document.getElementsByClassName("row grid");
const goToTopBtn = document.getElementById("go-to-top-button");
const orderInfo = {};
const orderContainer = document.querySelector(".shopping-navbar-nav");
initContent();

function initContent() {
  addSection(data.BreakfastSpecialties);
  addSection(data.LittlePollitos);
  addSection(data.PollosPlatters);
  addSection(data.ChickenSpecialties);
  addSection(data.Burgers);
  addSection(data.PollosByTheBucket);
  addSection(data.SideOrders);
  addSection(data.Beverages);
  addSection(data.Desserts);
  addSection(data.PartyPans);
}

function addSection(section) {
  const pos = section.position;
  addTitle(section.title, pos);
  addFilterMenu(section.filters, pos);
  addFilterItem(section.filters, pos);
  addContentContainer(pos);
  addContent(section.items, pos);
}

function addTitle(title, position) {
  let html = "";
  if (position == 0) {
    html = `
    <div class="food_section-container">
    <div id=${position} class="heading_container heading_center">
      <h2>${title}</h2>
    </div>
   </div>`;
  } else {
    html = `
    <hr class="break_line">
    <div class="food_section-container">
    <div id=${position} class="heading_container heading_center" style="margin-top: 100px;">
      <h2>${title}</h2>
    </div>
   </div>`;
  }

  mainContainer.insertAdjacentHTML("beforeend", html);
}

function addFilterMenu(sectionFilter, position) {
  if (Object.keys(sectionFilter).length === 0) {
    return;
  }
  const html = `<ul class="filters_menu" data-filter-group="group${position}">
   <li class="active" data-filter="*" data-filter-group="group${position}">All</li>
  </ul>`;
  itemContainer[position].insertAdjacentHTML("beforeend", html);
}

function addFilterItem(sectionFilter, position) {
  if (Object.keys(sectionFilter).length === 0) {
    return;
  }
  let html = ``;
  for (const item in sectionFilter) {
    html += `<li data-filter=".${sectionFilter[item].filter}" data-filter-group="group${position}">
       ${sectionFilter[item].name}
     </li>\n`;
  }

  filterMenus[position].insertAdjacentHTML("beforeend", html);
}

function addContentContainer(position) {
  const html = `<div class="filters-content">
     <div class="row grid group${position}"></div>
   </div>`;
  itemContainer[position].insertAdjacentHTML("beforeend", html);
}

function addContent(items, position) {
  let html = ``;
  items = shuffleObject(items);
  for (const item in items) {
    html += `<div class="col-sm-6 col-lg-4 all ${items[item].filter}">
    <div class="box">
      <div>
        
        <div class="detail-box" style="margin-top: 10px">
          <h5>${items[item].name}</h5>
          <p>${items[item].description}</p>
          <div class="options">
            <h6>$${items[item].price}</h6>
            <a dataVal="${items[item].name}" dataDesc = "${items[item].description}" dataPrice = "${items[item].price}"> 
              <i
                class="fa fa-cart-shopping"
                aria-hidden="true"
                style="color: white"
              ></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>\n`;
  }
  rowGrid[position].insertAdjacentHTML("beforeend", html);
}
function addOrder(orderInfo) {
  const total = (orderInfo.qty * orderInfo.price).toFixed(2);
  if (orderInfo.qty == 1) {
    const html = `<div class="order-item">
      ${orderInfo.name.toString()}
        </div>
        <div class="order-item" itemQty="${orderInfo.name.toString()}">
           ${orderInfo.qty.toString()}   
        </div>
        <div class="order-item" itemTotal="${orderInfo.name.toString()}">
           ${total.toString()}
        </div>`;
    orderContainer.insertAdjacentHTML("beforeend", html);
  } else {
    $(document).ready(function () {
      $('[itemQty="' + orderInfo.name.toString() + '"]').text(
        orderInfo.qty.toString()
      );
      $('[itemTotal="' + orderInfo.name.toString() + '"]').text(
        total.toString()
      );
    });
  }
}
function shuffleObject(obj) {
  // Convert object values to an array
  const valuesArray = Object.values(obj);

  // Shuffle the array
  for (let i = valuesArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [valuesArray[i], valuesArray[j]] = [valuesArray[j], valuesArray[i]];
  }

  // Reconstruct the object with shuffled values
  const shuffledObject = {};
  Object.keys(obj).forEach((key, index) => {
    shuffledObject[key] = valuesArray[index];
  });

  return shuffledObject;
}

//sticky for nagivation bar
document.addEventListener("scroll", function () {
  const menuNav = document.querySelector(".menu_nav");
  const foodSection = document.querySelector(".food_section");

  menuNav.classList.toggle("sticky", window.scrollY > 150);
  foodSection.classList.toggle(
    "menuNav_bot_section_sticky",
    window.scrollY > 150
  );
});

$(document).ready(function () {
  // client section owl carousel
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    dots: false,
    nav: true,
    autoplay: false,
    autoplayHoverPause: true,
    navText: [],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 3,
      },
      800: {
        items: 4,
      },
      1000: {
        items: 5,
      },
    },
  });

  // Handle click event for custom next button
  $(".custom-next-button").on("click", function () {
    $(".owl-carousel").trigger("next.owl.carousel");
  });
});

$(document).ready(function () {
  $(".grid-item").on("click", function () {
    const targetId = $(this).attr("id").substring(1);
    scrollToTarget(targetId);
  });

  // smooth scrolling
  function scrollToTarget(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      let offset = 0;
      if (targetId == "0") {
        offset = targetElement.offsetTop - 200;
      } else {
        offset = targetElement.offsetTop - 160;
      } // Adjusted offset
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  }
});

// isotope js
$(window).on("load", function () {
  var $grids = {}; // Object to store isotope grids

  // Loop to initialize isotope grids
  for (var i = 0; i < Object.keys(data).length; i++) {
    var $grid = $(".group" + i).isotope({
      itemSelector: ".all",
      percentPosition: false,
      masonry: {
        columnWidth: ".all",
      },
    });
    $grids["group" + i] = $grid; // Store grid in the object
  }

  // Click event handler for filter menu items
  $(".filters_menu li").click(function () {
    $(this)
      .addClass("active")
      .siblings("[data-filter-group='" + $(this).data("filter-group") + "']")
      .removeClass("active");

    var data = $(this).attr("data-filter");
    var filterGroup = $(this).closest(".filters_menu").data("filter-group");
    console.log(filterGroup);
    switch (filterGroup) {
      case "group0":
        $grid0.isotope({
          filter: data,
        });
        break;
      case "group1":
        $grid1.isotope({
          filter: data,
        });
        break;
      case "group2":
        $grid2.isotope({
          filter: data,
        });
        break;
      case "group3":
        $grid3.isotope({
          filter: data,
        });
        break;
      case "group4":
        $grid4.isotope({
          filter: data,
        });
        break;
      case "group5":
        $grid5.isotope({
          filter: data,
        });
        break;
      case "group6":
        $grid6.isotope({
          filter: data,
        });
        break;
      case "group7":
        $grid7.isotope({
          filter: data,
        });
        break;
      case "group8":
        $grid8.isotope({
          filter: data,
        });
        break;
      case "group9":
        $grid9.isotope({
          filter: data,
        });
        break;
      default:
        // Handle other cases if needed
        console.log("Something went wrong! Check HTML group!");
        break;
    }
  });

  var $grid0 = $(".group0").isotope({
    itemSelector: ".all",
    percentPosition: false,
    masonry: {
      columnWidth: ".all",
    },
  });
  var $grid1 = $(".group1").isotope({
    itemSelector: ".all",
    percentPosition: false,
    masonry: {
      columnWidth: ".all",
    },
  });
  var $grid2 = $(".group2").isotope({
    itemSelector: ".all",
    percentPosition: false,
    masonry: {
      columnWidth: ".all",
    },
  });
  var $grid3 = $(".group3").isotope({
    itemSelector: ".all",
    percentPosition: false,
    masonry: {
      columnWidth: ".all",
    },
  });
  var $grid4 = $(".group4").isotope({
    itemSelector: ".all",
    percentPosition: false,
    masonry: {
      columnWidth: ".all",
    },
  });
  var $grid5 = $(".group5").isotope({
    itemSelector: ".all",
    percentPosition: false,
    masonry: {
      columnWidth: ".all",
    },
  });
  var $grid6 = $(".group6").isotope({
    itemSelector: ".all",
    percentPosition: false,
    masonry: {
      columnWidth: ".all",
    },
  });
  var $grid7 = $(".group7").isotope({
    itemSelector: ".all",
    percentPosition: false,
    masonry: {
      columnWidth: ".all",
    },
  });
  var $grid8 = $(".group8").isotope({
    itemSelector: ".all",
    percentPosition: false,
    masonry: {
      columnWidth: ".all",
    },
  });
  var $grid9 = $(".group9").isotope({
    itemSelector: ".all",
    percentPosition: false,
    masonry: {
      columnWidth: ".all",
    },
  });
});
