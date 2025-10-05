class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }

    addProduct(product) {
        this.items.push(product);
        this.save();
        this.showAddToCartModal(product.name);
    }

    save() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    updateCartCount() {
        const countElement = document.getElementById('cart-count');
        if (countElement) {
            countElement.textContent = this.items.length;
        }
    }

    showAddToCartModal(productName) {
        const modal = document.createElement('div');
        modal.className = 'cart-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <p>Товар "${productName}" добавлен в корзину!</p>
                <a href="cart.html" class="cta-button">Перейти в корзину</a>
            </div>
        `;
        document.body.appendChild(modal);

        setTimeout(() => modal.remove(), 3000);
    }
}

const cart = new Cart();

// slider.js
class ReviewsSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.review-card');
        this.init();
    }

    init() {
        if (this.slides.length === 0) return;

        this.showSlide(this.currentSlide);
        this.startAutoSlide();

        this.addNavigation();
    }

    showSlide(index) {
        this.slides.forEach(slide => slide.style.display = 'none');
        this.slides[index].style.display = 'block';
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(this.currentSlide);
    }

    startAutoSlide() {
        setInterval(() => this.nextSlide(), 5000);
    }

    addNavigation() {
        const nav = document.createElement('div');
        nav.className = 'slider-nav';
        nav.innerHTML = `
            <button class="prev">‹</button>
            <button class="next">›</button>
        `;
        document.querySelector('.reviews-slider').appendChild(nav);

        nav.querySelector('.prev').addEventListener('click', () => {
            this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.showSlide(this.currentSlide);
        });

        nav.querySelector('.next').addEventListener('click', () => this.nextSlide());
    }
}

class Search {
    constructor() {
        this.products = [];
        this.init();
    }

    init() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
        }
    }

    async handleSearch(event) {
        const query = event.target.value.toLowerCase();
        if (query.length < 2) {
            this.hideSuggestions();
            return;
        }

        const results = await this.searchProducts(query);
        this.showSuggestions(results);
    }

    async searchProducts(query) {

        return this.products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
    }

    showSuggestions(products) {

    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}