/** Tommy's Code **/
import { data } from "./data.js";
const mainContainer = document.querySelector(".food-container");
const itemContainer = document.getElementsByClassName("food_section-container");
const filterMenus = document.getElementsByClassName("filters_menu");
const rowGrid = document.getElementsByClassName("row grid");
const ordersInfo = {};
const orderContainer = document.querySelector(".shopping-navbar-nav");

initContent();
initData();

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

function initData() {
  const dataJson = localStorage.getItem("ordersInfo");
  const oldData = JSON.parse(dataJson);
  for (const key in oldData) {
    if (oldData[key].qty == 0) {continue};
    ordersInfo[key] = oldData[key];
    addOrder(ordersInfo[key], true);
  }
  updateItemCounter();
}

updateActiveUser();
function updateActiveUser() {
  const activeUserEl = document.querySelector(".nav-link.user");
  const user = localStorage.getItem("activeUser");
  if (user != null) {
    activeUserEl.textContent = user;
  }
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

function updateLocalStorage() {
    localStorage.setItem("ordersInfo", JSON.stringify(ordersInfo));
}

function updateOrder(orderInfo) {
  updateLocalStorage();
  const total = (orderInfo.qty * orderInfo.price).toFixed(2);
  $(document).ready(function () {
    $('[itemQty="' + orderInfo.name.toString() + '"]').text(
      orderInfo.qty.toString()
    );
    $('[itemTotal="' + orderInfo.name.toString() + '"]').text(total.toString());
  });
  updateItemCounter();
}

function addOrder(orderInfo, initOrder) {
  updateLocalStorage();
  const total = (orderInfo.qty * orderInfo.price).toFixed(2);
  if (initOrder) {
    const html = `<div class="order-item" orderName="${orderInfo.name.toString()}">
      ${orderInfo.name.toString()}
        </div>
        <div class="order-item" orderName="${orderInfo.name.toString()}">
           <span itemQty="${orderInfo.name.toString()}">${orderInfo.qty.toString()}</span>
           <div class="order-itemQty-modify">       
              <i class="fa-solid fa-caret-up" itemQty="${orderInfo.name.toString()}-Qty"></i> 
              <i class="fa-solid fa-caret-down" itemQty="${orderInfo.name.toString()}-Qty"></i>
           </div>
        </div>
        <div class="order-item" itemTotal="${orderInfo.name.toString()}" orderName="${orderInfo.name.toString()}">
           ${total.toString()}
        </div>
        `;
    orderContainer.insertAdjacentHTML("beforeend", html);
  } else {
    updateOrder(orderInfo);
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

    // Use the stored grid from the object
    $grids[filterGroup].isotope({
      filter: data,
    });
  });
});

$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1000 && !$(".shopping-navbar").hasClass("show")) {
      $("#go-to-top-button").addClass("show");
    } else {
      $("#go-to-top-button").removeClass("show");
    }
  });
  $("#go-to-top-button").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
    return false;
  });
});

$(document).ready(function () {
  $(".shopping-btn").click(function () {
    $(".shopping-navbar").toggleClass("show");
    $(".shopping-exit-btn").toggleClass("show");
    $("#go-to-top-button").removeClass("show");
    $("#checkout-button").addClass("show");
    $(".menu_nav").toggleClass("slideup");
  });
});

$(document).ready(function () {
  $(".shopping-exit-btn").click(function () {
    $(".shopping-navbar").toggleClass("show");
    $(".shopping-exit-btn").toggleClass("show");
    $(".menu_nav").toggleClass("slideup");
    $("#checkout-button").removeClass("show");
    removeZeroQtyItems();
  });
});

function removeZeroQtyItems() {
  $(".order-item").each(function () {
    let itemQty = parseInt($(this).find("span").text());
    if (itemQty === 0) {
      const orderName = $(this).attr("orderName");
      if (orderName) {
        $(`div[orderName="${orderName}"]`).remove();
        delete ordersInfo[orderName];
      }
    }
  });
}

function updateItemCounter() {
  const itemCount = $(".item-count");
  const itemValues = Object.values(ordersInfo);
  const totalQty = itemValues.reduce((total, item) => total + item.qty, 0);
  if (totalQty == 0) {
    itemCount.hide();
  } else {
    itemCount.text(`${totalQty}`);
    itemCount.show();
  }
}

$(document).ready(function () {
  $("a").click(function () {
    var dataVal = $(this).attr("dataVal");
    if (dataVal == undefined) {
      return;
    }
    var dataDesc = $(this).attr("dataDesc");
    var dataPrice = $(this).attr("dataPrice");
    let initOrder = false;
    if (ordersInfo.hasOwnProperty(dataVal)) {
      ordersInfo[dataVal].qty += 1;
    } else {
      ordersInfo[dataVal] = {};
      ordersInfo[dataVal].price = dataPrice;
      ordersInfo[dataVal].description = dataDesc;
      ordersInfo[dataVal].name = dataVal;
      ordersInfo[dataVal].qty = 1;
      initOrder = true;
    }
    updateItemCounter();
    addOrder(ordersInfo[dataVal], initOrder);
  });
});

$(document).ready(function () {
  $("body").on("click", ".fa-solid.fa-caret-up", function () {
    let dataVal = $(this).attr("itemQty").slice(0, -4);
    ordersInfo[dataVal].qty += 1;
    updateOrder(ordersInfo[dataVal]);
  });

  $("body").on("click", ".fa-solid.fa-caret-down", function () {
    let dataVal = $(this).attr("itemQty").slice(0, -4);
    if (ordersInfo[dataVal].qty > 0) ordersInfo[dataVal].qty -= 1;
    updateOrder(ordersInfo[dataVal]);
  });
});
