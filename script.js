// script.js
document.addEventListener("DOMContentLoaded", () => {
  const menuSection = document.getElementById("menu-section");
  const cartSection = document.getElementById("cart-section");
  const cartItemsList = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const goToCartButton = document.getElementById("go-to-cart");
  const backToMenuButton = document.getElementById("back-to-menu");
  const purchaseButton = document.getElementById("purchase-button");

  let cart = []; // カート内の商品情報

  // 数量ボタンの処理
  document.querySelectorAll(".menu-item").forEach((menuItem) => {
    const minusButton = menuItem.querySelector(".minus-button");
    const plusButton = menuItem.querySelector(".plus-button");
    const quantitySpan = menuItem.querySelector(".quantity");

    // 数量を減らす
    minusButton.addEventListener("click", () => {
      let quantity = parseInt(quantitySpan.textContent, 10);
      if (quantity > 0) {
        quantity--; // 数量を減らす
        quantitySpan.textContent = quantity;
      }
    });

    // 数量を増やす
    plusButton.addEventListener("click", () => {
      let quantity = parseInt(quantitySpan.textContent, 10);
      quantity++; // 数量を増やす
      quantitySpan.textContent = quantity;
    });
  });

  // カートを見るボタン
  goToCartButton.addEventListener("click", () => {
    cart = []; // カートを初期化して再構築
    document.querySelectorAll(".menu-item").forEach((menuItem) => {
      const itemName = menuItem.dataset.name;
      const itemPrice = parseInt(menuItem.dataset.price, 10);
      const quantity = parseInt(menuItem.querySelector(".quantity").textContent, 10);

      if (quantity > 0) {
        cart.push({ name: itemName, price: itemPrice, quantity: quantity });
      }
    });

    renderCart();
    menuSection.style.display = "none";
    cartSection.style.display = "block";
  });

  // メニューに戻るボタン
  backToMenuButton.addEventListener("click", () => {
    menuSection.style.display = "block";
    cartSection.style.display = "none";
  });

  // 購入ボタン
  purchaseButton.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("カートが空です。商品を追加してください。");
      return;
    }

    // PDFを生成してダウンロード
    generatePDF();

    // カートをリセット
    cart = [];
    resetQuantities();
    menuSection.style.display = "block";
    cartSection.style.display = "none";
  });

  // カート内容をレンダリング
  function renderCart() {
    cartItemsList.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} x${item.quantity} - ¥${item.price * item.quantity}`;
      cartItemsList.appendChild(li);
      total += item.price * item.quantity;
    });

    totalPriceElement.textContent = `合計金額: ¥${total}`;
  }

  // 数量をリセット
  function resetQuantities() {
    document.querySelectorAll(".quantity").forEach((quantitySpan) => {
      quantitySpan.textContent = "0";
    });
  }

  // PDFを生成する関数
  function generatePDF() {
    const { jsPDF } = window.jspdf; // jsPDFライブラリを使用
    const doc = new jsPDF();

    // タイトル
    doc.setFontSize(16);
    doc.text("購入した食券", 10, 10);

    // カート内容をPDFに記載
    cart.forEach((item, index) => {
      const yPosition = 20 + index * 10; // 各商品の位置
      doc.text(`${index + 1}. ${item.name} x${item.quantity} - ¥${item.price * item.quantity}`, 10, yPosition);
    });

    // 合計金額を追加
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    doc.text(`合計金額: ¥${total}`, 10, 20 + cart.length * 10);

    // PDFをダウンロード
    doc.save("ticket.pdf");
  }
});
