const foods = [
    {
        id: 1,
        name: "Margherita Pizza",
        category: "pizza",
        price: 299,
        icon: "🍕",
        description: "Cheesy pizza with fresh tomato."
    },
    {
        id: 2,
        name: "Veggie Pizza",
        category: "pizza",
        price: 329,
        icon: "🍕",
        description: "Fresh vegetables and extra cheese."
    },
    {
        id: 3,
        name: "Chicken Burger",
        category: "burger",
        price: 249,
        icon: "🍔",
        description: "Crispy chicken burger."
    },
    {
        id: 4,
        name: "Classic Veg Burger",
        category: "burger",
        price: 179,
        icon: "🍔",
        description: "Delicious crispy veg burger."
    },
    {
        id: 5,
        name: "Paneer Butter Masala",
        category: "indian",
        price: 279,
        icon: "🍛",
        description: "Creamy paneer with Indian spices."
    },
    {
        id: 6,
        name: "Masala Dosa",
        category: "indian",
        price: 149,
        icon: "🥞",
        description: "Crispy dosa with potato filling."
    },
    {
        id: 7,
        name: "Chocolate Cake",
        category: "dessert",
        price: 199,
        icon: "🍰",
        description: "Soft and delicious chocolate cake."
    },
    {
        id: 8,
        name: "Gulab Jamun",
        category: "dessert",
        price: 129,
        icon: "🍩",
        description: "Sweet and soft Indian dessert."
    }
];

let cart = JSON.parse(localStorage.getItem("foodieCart")) || [];

const foodContainer = document.getElementById("food-container");

function displayFoods(foodList) {

    foodContainer.innerHTML = "";

    if (foodList.length === 0) {
        foodContainer.innerHTML = `
            <h3>No food found 😔</h3>
        `;
        return;
    }

    foodList.forEach(food => {

        const card = document.createElement("div");

        card.className = "food-card";

        card.innerHTML = `
            <div class="food-image">
                ${food.icon}
            </div>

            <div class="food-info">

                <h3>${food.name}</h3>

                <p>${food.description}</p>

                <div class="food-bottom">

                    <span class="price">
                        ₹${food.price}
                    </span>

                    <button
                        class="add-btn"
                        onclick="addToCart(${food.id})"
                    >
                        Add +
                    </button>

                </div>

            </div>
        `;

        foodContainer.appendChild(card);
    });
}

function addToCart(id) {

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {

        const food = foods.find(item => item.id === id);

        cart.push({
            ...food,
            quantity: 1
        });
    }

    saveCart();

    alert("Food added to cart 🛒");
}

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();
}

function increaseQuantity(id) {

    const item = cart.find(item => item.id === id);

    if (item) {
        item.quantity++;
    }

    saveCart();
}

function decreaseQuantity(id) {

    const item = cart.find(item => item.id === id);

    if (item) {

        item.quantity--;

        if (item.quantity <= 0) {
            removeFromCart(id);
            return;
        }
    }

    saveCart();
}

function saveCart() {

    localStorage.setItem(
        "foodieCart",
        JSON.stringify(cart)
    );

    updateCart();
}

function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty 🛒</h3>
                <p>Add some delicious food.</p>
            </div>
        `;

    } else {

        cart.forEach(item => {

            total += item.price * item.quantity;
            count += item.quantity;

            cartItems.innerHTML += `
                <div class="cart-item">

                    <div class="cart-item-icon">
                        ${item.icon}
                    </div>

                    <div class="cart-item-info">

                        <h4>${item.name}</h4>

                        <p>
                            ₹${item.price * item.quantity}
                        </p>

                    </div>

                    <div class="quantity">

                        <button onclick="decreaseQuantity(${item.id})">
                            -
                        </button>

                        <span>${item.quantity}</span>

                        <button onclick="increaseQuantity(${item.id})">
                            +
                        </button>

                    </div>

                </div>
            `;
        });
    }

    cartCount.textContent = count;
    cartTotal.textContent = total;
}

function openCart() {

    document
        .getElementById("cart")
        .classList.add("active");

    document
        .getElementById("cart-overlay")
        .classList.add("active");

    updateCart();
}

function closeCart() {

    document
        .getElementById("cart")
        .classList.remove("active");

    document
        .getElementById("cart-overlay")
        .classList.remove("active");
}

function filterFood(category) {

    if (category === "all") {
        displayFoods(foods);
        return;
    }

    const filteredFoods = foods.filter(
        food => food.category === category
    );

    displayFoods(filteredFoods);
}

function searchFood() {

    const searchValue =
        document
            .getElementById("search")
            .value
            .toLowerCase();

    const filteredFoods = foods.filter(food =>
        food.name.toLowerCase().includes(searchValue)
    );

    displayFoods(filteredFoods);
}

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert(
        "Order placed successfully! 🎉\nThank you for ordering from Foodie."
    );

    cart = [];

    saveCart();

    closeCart();
}

function submitForm(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    alert(
        `Thank you ${name}! Your message has been sent.`
    );

    event.target.reset();
}

displayFoods(foods);
updateCart();