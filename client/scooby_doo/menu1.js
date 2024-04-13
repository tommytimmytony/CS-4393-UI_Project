/** Tommy's Code **/
import { data } from "./data.js";
const mainContainer = document.querySelector(".food-container");
const itemContainer = document.getElementsByClassName("food_section-container");
const filterMenus = document.getElementsByClassName("filters_menu");
const rowGrid = document.getElementsByClassName("row grid");

// addSection(data.BreakfastSpecialties);
// addSection(data.LittlePollitos);

function addSection(section) {
  addTitle(section.title);
  addFilterMenu(section.position);
  addFilterItem(section.filters, section.position);
  addContentContainer(section.position);
  addContent(section.items, section.position);
}

function addTitle(title) {
  const html = `<div class="food_section-container">
    <div class="heading_container heading_center">
      <h2>${title}</h2>
    </div>
   </div>`;

  mainContainer.insertAdjacentHTML("beforeend", html);
}

function addFilterMenu(position) {
  const html = `<ul class="filters_menu">
   <li class="active" data-filter="*">All</li>
  </ul>`;
  itemContainer[position].insertAdjacentHTML("beforeend", html);
}

function addFilterItem(items, position) {
  let html = ``;
  for (const item in items) {
    html += `<li data-filter=".${items[item].filter}">
       ${items[item].name}
     </li>\n`;
  }

  filterMenus[position].insertAdjacentHTML("beforeend", html);
}

function addContentContainer(position) {
  const html = `<div class="filters-content">
     <div class="row grid"></div>
   </div>`;
  itemContainer[position].insertAdjacentHTML("beforeend", html);
}

function addContent(items, position) {
  let html = ``;

  for (const item in items) {
    html += `<div class="col-sm-6 col-lg-4 all ${items[item].filter}">
    <div class="box">
      <div>
        
        <div class="detail-box" style="margin-top: 10px">
          <h5>${items[item].name}</h5>
          <p>${items[item].description}</p>
          <div class="options">
            <h6>$${items[item].price}</h6>
            <a href="">
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
    autoplay: true,
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

// isotope js
// $(document).ready(function() {
//   var $group1 = $('.filters-content group2').isotope({
//     itemSelector: '.'
//   })
//   $(".menu1").on("click", "button", function() {
//     var filterValue = $(this).attr("data-filter");
//     $
//   })
// })

$(window).on("load", function () {
  $(".filters_menu li").click(function () {
    $(".filters_menu li").removeClass("active");
    $(this).addClass("active");

    var data = $(this).attr("data-filter");
    var filterGroup = $(this).closest(".filters_menu").data("filter-group");
    console.log(filterGroup);
    if (filterGroup == "menu1") {
      $grid.isotope({
        filter: data,
      });
    } else {
      $grid2.isotope({
        filter: data,
      })
    }
  });

  var $grid = $(".grid1").isotope({
    itemSelector: ".all",
    percentPosition: false,
    masonry: {
      columnWidth: ".all",
    },
  });
  var $grid2 = $(".grid2").isotope({
    itemSelector: ".all",
    percentPosition: false,
    masonry: {
      columnWidth: ".all",
    },
  });
});
