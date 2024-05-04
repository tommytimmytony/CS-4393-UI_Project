const orderContainer = document.querySelector(".order-container");
const subTotalEl = document.querySelector(".subTotal");
const taxesEl = document.querySelector(".taxes");
const totalEl = document.querySelector(".total");
const streetInput = document.querySelector('input[name="street"]');
const cityInput = document.querySelector('input[name="city"]');
const stateInput = document.querySelector('input[name="state"]');
const ordersInfo = {};
const TAXESRATE = 0.0825;
initData();

function initData() {
  const dataJson = localStorage.getItem("ordersInfo");
  const data = JSON.parse(dataJson);
  for (const key in data) {
    if (data[key].qty <= 0) {
      continue;
    }
    ordersInfo[key] = data[key];
    addOrder(ordersInfo[key]);
  }
  initSummary();
}

function initSummary() {
  const itemValues = Object.values(ordersInfo);
  const subTotal = itemValues.reduce(
    (total, item) => total + Number(item.price) * item.qty,
    0
  );
  console.log(subTotal);
  const taxes = subTotal * TAXESRATE;
  const total = subTotal + taxes;
  subTotalEl.textContent = `${subTotal.toFixed(2)}`;
  taxesEl.textContent = `${taxes.toFixed(2)}`;
  totalEl.textContent = `${total.toFixed(2)}`;
}

updateActiveUser();
function updateActiveUser() {
  const activeUserEl = document.querySelector(".nav-link.user");
  const user = localStorage.getItem("activeUser");
  if (user != null) {
    activeUserEl.textContent = user;
  }
}

function updateData(orderInfo) {
  const total = (orderInfo.qty * orderInfo.price).toFixed(2);
  console.log(orderInfo);
  $(document).ready(function () {
    $('[itemQty="' + orderInfo.name.toString() + '"]').text(
      orderInfo.qty.toString()
    );
    $('[itemTotal="' + orderInfo.name.toString() + '"]').text(total.toString());
  });
  initSummary();
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem("ordersInfo", JSON.stringify(ordersInfo));
}

function addOrder(orderInfo) {
  const total = (orderInfo.qty * orderInfo.price).toFixed(2);
  const html = `<div class="order-item">${orderInfo.name.toString()}</div>
        <div class="order-item">
          <span itemQty="${orderInfo.name.toString()}">${orderInfo.qty.toString()}</span>
          <div class="order-itemQty-modify">
            <i
              class="fa-solid fa-caret-up"
              itemQty="${orderInfo.name.toString()}-Qty"
            ></i>
            <i
              class="fa-solid fa-caret-down"
              itemQty="${orderInfo.name.toString()}-Qty"
            ></i>
          </div>
        </div>
          <div class="order-item">${orderInfo.price.toString()}</div>
        <div class="order-item" itemTotal="${orderInfo.name.toString()}">${total.toString()}</div>
        `;
  orderContainer.insertAdjacentHTML("beforeend", html);
}

$(document).ready(function () {
  $("body").on("click", ".fa-solid.fa-caret-up", function () {
    let dataVal = $(this).attr("itemQty").slice(0, -4);
    ordersInfo[dataVal].qty += 1;
    updateData(ordersInfo[dataVal]);
  });

  $("body").on("click", ".fa-solid.fa-caret-down", function () {
    let dataVal = $(this).attr("itemQty").slice(0, -4);
    if (ordersInfo[dataVal].qty > 0) ordersInfo[dataVal].qty -= 1;
    updateData(ordersInfo[dataVal]);
  });
});

$(".header").hide();
$(document).ready(function () {
  $(".submit-button").click(function () {
    if (streetInput.value == "" || cityInput == "" || stateInput == "") {
      $(".header").text("Please fill-out pickup location.");
    } else if (Object.keys(ordersInfo).length == 0) {
      $(".header").text("Your order is empty. Please choose an item");
    } else {
      localStorage.removeItem("ordersInfo");
      $("div.order-container").remove();
      $(".header").text("Order Placed Succesfully!");
      streetInput.disabled = true;
      cityInput.disabled = true;
      stateInput.disabled = true;
    }
    $(".header").show();
  });
});
