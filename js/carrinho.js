if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
  } else {
    ready()
  }
  
  var totalAmount = "0,00"
  
  function ready() {
    // Botão remover produto
    const removeCartProductButtons = document.getElementsByClassName("remove-product-button")
    for (var produto = 0; produto < removeCartProductButtons.length; produto++) {
      removeCartProductButtons[produto].addEventListener("click", removeProduct)
    }
  
    // Mudança valor dos inputs
    const quantityInputs = document.getElementsByClassName("product-qtd-input")
    for (var produto = 0; produto < quantityInputs.length; produto++) {
      quantityInputs[produto].addEventListener("change", checkIfInputIsNull)
    }
  
    // Botão add produto ao carrinho
    const addToCartButtons = document.getElementsByClassName("button-hover-background")
    for (var produto = 0; produto < addToCartButtons.length; produto++) {
      addToCartButtons[produto].addEventListener("click", addProductToCart)
    }
  
    // Botão comprar
    const purchaseButton = document.getElementsByClassName("purchase-button")[0]
    purchaseButton.addEventListener("click", makePurchase)
  }
  
  function removeProduct(event) {
    event.target.parentElement.parentElement.remove()
    updateTotal()
  }
  
  function checkIfInputIsNull(event) {
    if (event.target.value === "0") {
      event.target.parentElement.parentElement.remove()
    }
  
    updateTotal()
  }
  
  function addProductToCart(event) {
    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productImage = productInfos.getElementsByClassName("product-image")[0].src
    const productName = productInfos.getElementsByClassName("product-title")[0].innerText
    const productPrice = productInfos.getElementsByClassName("preco")[0].innerText
  
    const productsCartNames = document.getElementsByClassName("cart-product-title")
    for (var produto = 0; produto < productsCartNames.length; i++) {
      if (productsCartNames[produto].innerText === productName) {
        productsCartNames[produto].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++
        updateTotal()
        return
      }
    }
  
    let newCartProduct = document.createElement("tr")
    newCartProduct.classList.add("cart-product")
  
    newCartProduct.innerHTML =
      `
        <td class="product-identification">
          <img src="${productImage}" alt="${productName}" class="cart-product-image">
          <strong class="cart-product-title">${productName}</strong>
        </td>
        <td>
          <span class="cart-product-price">${productPrice}</span>
        </td>
        <td>
          <input type="number" value="1" min="0" class="product-qtd-input">
          <button type="button" class="remove-product-button">Remover</button>
        </td>
      `
    
    const tableBody = document.querySelector(".cart-table tbody")
    tableBody.append(newCartProduct)
    updateTotal()
  
    newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct)
    newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull)
  }
  
  function makePurchase() {
    if (totalAmount === "0,00") {
      alert("Seu carrinho está vazio!")
    } else {   
      alert(
        `
          Obrigado pela sua compra!
          Valor do pedido: R$${totalAmount}\n
          Volte sempre :)
        `
      )
  
      document.querySelector(".cart-table tbody").innerHTML = ""
      updateTotal()
    }
  }
  
  // Atualizar o valor total do carrinho
  function updateTotal() {
    const cartProducts = document.getElementsByClassName("cart-product")
    totalAmount = 0
  
    for (var produto = 0; produto < cartProducts.length; produto++) {
      const productPrice = cartProducts[produto].getElementsByClassName("cart-product-price")[0].innerText.replace("R$", "").replace(",", ".")
      const productQuantity = cartProducts[produto].getElementsByClassName("product-qtd-input")[0].value
  
      totalAmount += productPrice * productQuantity
    }
    
    totalAmount = totalAmount.toFixed(2)
    totalAmount = totalAmount.replace(".", ",")
    document.querySelector(".cart-total-container span").innerText = "R$" + totalAmount
  }