class SuperStoreItem {
	name;
	price;
	description;
	view;
	isExpanded = false;
  
	constructor(name, price, description) {
	    this.name = name;
	  	this.price = price;
	  	this.description = description;
  
	  	this.view = document.createElement('div');
	  	this.view.classList.add('super-store-item');
	  	this.view.onclick = this.toggle.bind(this);
  
	  	let title = document.createElement('h3');
	  	title.textContent = this.name;
	  	this.view.append(title);
  
	 	let priceElement = document.createElement('p');
	  	priceElement.textContent = `Цена: ${this.price} тенге`;
	  	this.view.append(priceElement);

	  	let buyButton = document.createElement('button');
	  	buyButton.textContent = 'В корзину';
	  	buyButton.onclick = this.buy.bind(this);
	  	this.view.append(buyButton);
  
	  	let image = document.createElement('img');
	  	image.classList.add('item-image');
	  	this.view.append(image);
  
	  	let descriptionElement = document.createElement('p');
	  	descriptionElement.classList.add('item-description');
	  	descriptionElement.textContent = this.description;
	  	descriptionElement.style.display = 'none';
	  	this.view.append(descriptionElement);
	}
  
	setImage(url) {
	  	let image = this.view.querySelector('.item-image');
	  	image.src = url;
	  	image.onclick = this.zoomImage.bind(this);
	}
  
	zoomImage(ev) {
		let image = ev.target;
		if (image.classList.contains('zoomed')) {
			image.classList.remove('zoomed');
			this.collapse();
		} else {
			image.classList.add('zoomed');
			this.expand();
		}
		ev.stopPropagation();
	}
	
	toggle(ev) {
		ev.stopPropagation();
	}
  
	expand() {
		let descriptionElement = this.view.querySelector('.item-description');
		descriptionElement.style.display = 'block';
		descriptionElement.classList.add('expanded');
		this.isExpanded = true;
	}
	  
	collapse() {
		let descriptionElement = this.view.querySelector('.item-description');
		descriptionElement.style.display = 'none';
		descriptionElement.classList.remove('expanded');
		this.isExpanded = false;
	}
  
	buy(ev) {
	  	alert(`Вы добавили в корзину ${this.name}`);
	  	ev.stopPropagation();
	}
}
  
  	let items = [
		new SuperStoreItem('Бензопила Huter BS-2300M', 120000, 'Бензопила BS-2300М Huter - надежная бензопила с шиной универсальной длины.'),
		new SuperStoreItem('Ноутбук Lenovo IdeaPad 5', 350000, 'Благодаря мощному процессору AMD ® Radeon™, ты легко и быстро будешь запускать свои любимые приложения.'),
		new SuperStoreItem('Микроволновая печь LG MS2022D', 53000, 'Микроволновая печь с механическим переключателем')
	  ];
	  
	items[0].setImage('img/pila.png');
	items[1].setImage('img/lenovo-laptops-ideapad-5-15-amd-hero.webp');
	items[2].setImage('img/lg.png');
	  
	let container = document.createElement('div');
	container.classList.add('super-store-container');
	document.body.append(container);
	  
	for (let item of items) {
		container.append(item.view);
	}

