document.addEventListener("DOMContentLoaded", async function () {


	if (window.Pragati.common.metafield.visibility_page.hidden_add_to_cart) {
		// hiding atc button
		const getATCButton = document.querySelector(
			'button[type="submit"][name="add"]'
		);
		if (getATCButton) {
			getATCButton.style.display = "none"; // remember !important rule don't work in javscript, if want use css.
		} else {
			console.error("ATC Button not found in the DOM");
		}
	}




	if (window.Pragati.common.metafield.visibility_page.hidden_buy_now) {
		// hiding buyitnow button
		const getBINButton = document.querySelector(".shopify-payment-button");
		if (getBINButton) {
			getBINButton.style.display = "none";
		} else {
			console.error("BIN Button not found in the DOM");
		}
	}




	let orderInfo = {
		shopId: `${window.Pragati.common.shop.id}`,
		variant_id: `${window.Pragati.common.product.variant}`,
		quantity: "1", // default
		first_name: "",
		last_name: "",
		email: "",
		address1: "",
		address2: "",
		phone: "",
		city: "",
		province: "",
		zip: "",
		note: "",
		country: window.Pragati.common.metafield.country,
		phone_code: `${window.Pragati.common.metafield.phoneCode}`,
	};

	console.log(
		"typeof country : " + typeof window.Pragati.common.metafield.country
	);
	console.log(
		"typeof phone_code : " + typeof window.Pragati.common.metafield.phoneCode
	);

	let convertedMetafieldBuyButtonJson = undefined;
	if (typeof window.Pragati.common.metafield.buy_button === "object") {
		convertedMetafieldBuyButtonJson =
			window.Pragati.common.metafield.buy_button;
	} else if (typeof window.Pragati.common.metafield.buy_button === "string") {
		convertedMetafieldBuyButtonJson = JSON.parse(
			window.Pragati.common.metafield.buy_button
		);
	}

	// Create the button element
	const button = document.createElement("button");

	// Set the buy button's class name
	button.classList.add(
		"btn",
		"animate__animated",
		"animate__infinite",
		"pragati-buy-button",
		"pragati-cod-form-btn-open"
	);

	if (convertedMetafieldBuyButtonJson.buttonAnimation[0] !== "none") {
		button.classList.add(
			`animate__${convertedMetafieldBuyButtonJson.buttonAnimation[0]}`
		);
	}

	// Set the button's style properties
	button.style.backgroundColor =
		convertedMetafieldBuyButtonJson.backgroundColor;
	button.style.borderColor = convertedMetafieldBuyButtonJson.borderColor;
	button.style.borderRadius = `${convertedMetafieldBuyButtonJson.borderRadius}px`;
	button.style.borderWidth = `${convertedMetafieldBuyButtonJson.borderWidth}px`;
	button.style.marginTop = `20px`;
	button.style.marginBottom = `20px`;
	button.type = "button"; // because of this add to cart was not triggered
	button.style.padding = "12.8px 19.2px";

	if (convertedMetafieldBuyButtonJson.shadow !== 0) {
		button.style.boxShadow = `${convertedMetafieldBuyButtonJson.shadow / 2}px ${
			convertedMetafieldBuyButtonJson.shadow
		}px 18px ${convertedMetafieldBuyButtonJson.shadowColor}`;
	}

	if (convertedMetafieldBuyButtonJson.buttonIcon === "quick_sale_major_icon") {
		// Create the SVG element
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

		// Set the SVG's attributes
		svg.setAttribute("viewBox", "0 0 20 20");
		svg.setAttribute("focusable", "false");
		svg.setAttribute("aria-hidden", "true");
		svg.setAttribute("class", "pragati-svg-icon");
		// Set the SVG's style properties
		svg.style.fill = convertedMetafieldBuyButtonJson.textColor;

		// Create the first path element
		const path1 = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"path"
		);
		path1.setAttribute("fill-rule", "evenodd");
		path1.setAttribute(
			"d",
			"M5 0a1 1 0 0 0 0 2h1v1a1 1 0 0 0 .917.997l10.943.911-.727 5.092h-10.133a1 1 0 0 0-1 1v3.17a3.001 3.001 0 1 0 3.83 1.83h3.34a3 3 0 1 0 2.83-2h-8v-2h10a1 1 0 0 0 .99-.859l1-7a1 1 0 0 0-.907-1.138l-11.083-.923v-1.08a1 1 0 0 0-1-1h-2"
		);

		// Create the second path element
		const path2 = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"path"
		);
		path2.setAttribute(
			"d",
			"M0 3a1 1 0 0 1 1-1h1a1 1 0 0 1 0 2h-1a1 1 0 0 1-1-1zm1 3a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-6zm-1 5a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1zm1 3a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2h-1"
		);

		// Add the path elements to the SVG
		svg.appendChild(path1);
		svg.appendChild(path2);

		// Add the SVG to the document
		button.appendChild(svg);
	} else if (
		convertedMetafieldBuyButtonJson.buttonIcon === "shipment_major_icon"
	) {
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

		svg.setAttribute("viewBox", "0 0 20 20");
		svg.setAttribute("focusable", "false");
		svg.setAttribute("aria-hidden", "true");
		svg.setAttribute("class", "pragati-svg-icon");

		svg.style.fill = convertedMetafieldBuyButtonJson.textColor;

		const path1 = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"path"
		);
		path1.setAttribute("fill-rule", "evenodd");
		path1.setAttribute(
			"d",
			"M1.5 2a1.5 1.5 0 0 0-1.5 1.5v11a1.5 1.5 0 0 0 1.5 1.5h.5a3 3 0 1 0 6 0h4a3 3 0 1 0 6 0h.5a1.5 1.5 0 0 0 1.5-1.5v-3.361a1.5 1.5 0 0 0-.214-.772l-2.783-4.639a1.5 1.5 0 0 0-1.286-.728h-2.717v-1.5a1.5 1.5 0 0 0-1.5-1.5h-10zm13.5 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-11-1a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm13.234-6h-4.234v-3h2.434l1.8 3z"
		);

		svg.appendChild(path1);

		button.appendChild(svg);
	} else if (convertedMetafieldBuyButtonJson.buttonIcon === "cart_major_icon") {
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

		svg.setAttribute("viewBox", "0 0 20 20");
		svg.setAttribute("focusable", "false");
		svg.setAttribute("aria-hidden", "true");
		svg.setAttribute("class", "pragati-svg-icon");

		svg.style.fill = convertedMetafieldBuyButtonJson.textColor;

		const path1 = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"path"
		);
		path1.setAttribute("fill-rule", "evenodd");
		path1.setAttribute(
			"d",
			"M1 1c0-.552.45-1 1.004-1h1.505c.831 0 1.505.672 1.505 1.5v.56l12.574.908c.877.055 1.52.843 1.397 1.71l-.866 6.034a1.504 1.504 0 0 1-1.489 1.288h-11.616v2h10.043a3.005 3.005 0 0 1 3.011 3c0 1.657-1.348 3-3.01 3a3.005 3.005 0 0 1-2.84-4h-5.368a3.005 3.005 0 0 1-2.84 4 3.005 3.005 0 0 1-3.01-3c0-1.306.838-2.418 2.007-2.83v-12.17h-1.003a1.002 1.002 0 0 1-1.004-1zm4.014 3.064v5.936h11.18l.727-5.07-11.907-.866zm9.04 12.936c0-.552.449-1 1.003-1 .554 0 1.004.448 1.004 1s-.45 1-1.004 1a1.002 1.002 0 0 1-1.003-1zm-11.047 0c0-.552.45-1 1.004-1s1.003.448 1.003 1-.449 1-1.003 1a1.002 1.002 0 0 1-1.004-1z"
		);

		svg.appendChild(path1);

		button.appendChild(svg);
	} else if (
		convertedMetafieldBuyButtonJson.buttonIcon === "shopping_bag_fontawesome"
	) {
		var i = document.createElement("i");
		i.classList.add(
			"fa",
			"fa-bag-shopping",
			"fa-lg",
			"fa-fw",
			"pragati-svg-icon"
		);

		i.style.padding = "10px";
		i.style.marginRight = "4px";
		i.style.color = convertedMetafieldBuyButtonJson.textColor; // fill attribute only worked with svg.


		i.setAttribute("aria-hidden", "true");

		button.appendChild(i);
	} else if (
		convertedMetafieldBuyButtonJson.buttonIcon === "truck_fontawesome"
	) {
		var i = document.createElement("i");
		i.classList.add(
			"fa",
			"fa-truck-fast",
			"fa-lg",
			"fa-fw",
			"pragati-svg-icon"
		);

		i.style.padding = "10px";
		i.style.marginRight = "10px";
		i.style.color = convertedMetafieldBuyButtonJson.textColor; // fill attribute only worked with svg.

		i.setAttribute("aria-hidden", "true");

		button.appendChild(i);
	} else if (convertedMetafieldBuyButtonJson.buttonIcon === "tag_fontawesome") {
		var i = document.createElement("i");
		i.classList.add("fa", "fa-tag", "fa-lg", "fa-fw", "pragati-svg-icon");

		i.style.padding = "10px";
		i.style.marginRight = "4px";
		i.style.color = convertedMetafieldBuyButtonJson.textColor; // fill attribute only worked with svg.

		i.setAttribute("aria-hidden", "true");

		button.appendChild(i);
	} else if (
		convertedMetafieldBuyButtonJson.buttonIcon === "basket_fontawesome"
	) {
		var i = document.createElement("i");
		i.classList.add(
			"fa",
			"fa-basket-shopping",
			"fa-lg",
			"fa-fw",
			"pragati-svg-icon"
		);

		i.style.padding = "10px";
		i.style.marginRight = "8px";
		i.style.color = convertedMetafieldBuyButtonJson.textColor; // fill attribute only worked with svg.

		i.setAttribute("aria-hidden", "true");

		button.appendChild(i);
	} else if (
		convertedMetafieldBuyButtonJson.buttonIcon === "shop_fontawesome"
	) {
		var i = document.createElement("i");
		i.classList.add("fa", "fa-shop", "fa-lg", "fa-fw", "pragati-svg-icon");

		i.style.padding = "10px";
		i.style.marginRight = "10px";
		i.style.color = convertedMetafieldBuyButtonJson.textColor; // fill attribute only worked with svg.

		i.setAttribute("aria-hidden", "true");

		button.appendChild(i);
	} else if (
		convertedMetafieldBuyButtonJson.buttonIcon === "store_fontawesome"
	) {
		var i = document.createElement("i");
		i.classList.add("fa", "fa-store", "fa-lg", "fa-fw", "pragati-svg-icon");

		i.style.padding = "10px";
		i.style.marginRight = "7px";
		i.style.color = convertedMetafieldBuyButtonJson.textColor; // fill attribute only worked with svg.

		i.setAttribute("aria-hidden", "true");

		button.appendChild(i);
	} else if (
		convertedMetafieldBuyButtonJson.buttonIcon === "gift_fontawesome"
	) {
		var i = document.createElement("i");
		i.classList.add("fa", "fa-gift", "fa-lg", "fa-fw", "pragati-svg-icon");

		i.style.padding = "10px";
		i.style.marginRight = "6px";
		i.style.color = convertedMetafieldBuyButtonJson.textColor; // fill attribute only worked with svg.

		i.setAttribute("aria-hidden", "true");

		button.appendChild(i);
	}

	// Create the span element to hold the button's text
	const span = document.createElement("span");
	span.textContent = convertedMetafieldBuyButtonJson.buttonText;
	span.style.color = convertedMetafieldBuyButtonJson.textColor;
	span.style.fontSize = `${convertedMetafieldBuyButtonJson.fontSize}px`;

	// Add the span element to the button
	button.appendChild(span);

	// Add the button to the DOM
	// document.body.appendChild(button);
	const parent = document.querySelector(".shopify-payment-button");
	if (parent) {
		// Insert the new element before the existing element
		parent.parentNode.insertBefore(button, parent);
	} else {
		console.error("Parent element not found");
	}

	// Create the overlay element
	const overlay = document.createElement("div");
	overlay.classList.add("pragati-cod-form-overlay");
	overlay.classList.add("pragati-cod-form-hidden");

	// Create the modal container element
	const modalContainer = document.createElement("div");
	modalContainer.classList.add("pragati-cod-form-modal-container");

	// Create the modal element
	const modal = document.createElement("div");
	modal.classList.add("pragati-cod-form-modal");

	// Create the flex container element
	const flexContainer = document.createElement("div");
	flexContainer.classList.add("pragati-cod-form-flex");

	// Create the heading element
	const heading = document.createElement("h3");
	heading.textContent =
		window.Pragati.common.metafield.form_designer2.titleName;
	heading.style.fontWeight = "bold";

	// Create the close button element

	const closeButton = document.createElement("button");
	closeButton.classList.add("pragati-cod-form-btn-close");
	closeButton.textContent = "⨉";

	closeButton.style.display = window.Pragati.common.metafield.form_designer2
		.hideCloseButton
		? "none"
		: undefined;
	console.log(
		"value of hideCloseButton : " +
			window.Pragati.common.metafield.form_designer2.hideCloseButton
	);

	// Append the heading and close button to the flex container
	flexContainer.appendChild(heading);
	flexContainer.appendChild(closeButton);

	// Append the flex container to the modal
	modal.appendChild(flexContainer);

	// Append the modal to the modal container
	modalContainer.appendChild(modal);

	// Append the modal container to the overlay
	overlay.appendChild(modalContainer);

	// Append the overlay to the document body
	document.body.appendChild(overlay);

	const formOverlay = document.querySelector(".pragati-cod-form-overlay");
	const openModalBtn = document.querySelector(".pragati-cod-form-btn-open");
	const closeModalBtn = document.querySelector(".pragati-cod-form-btn-close");

	const openModal = function () {
		formOverlay.classList.remove("pragati-cod-form-hidden");
	};

	openModalBtn.addEventListener("click", openModal);

	const closeModal = function () {
		formOverlay.classList.add("pragati-cod-form-hidden");
	};

	closeModalBtn.addEventListener("click", closeModal);

	// formOverlay.addEventListener("click", closeModal);

	const element = document.querySelector("h1"); // Select the first <h1> element on the page

	const style = window.getComputedStyle(element);
	const font = style.getPropertyValue("font-family");

	console.log("font variable value : " + font); // The font used for the <h1> element will be printed to the console

	console.log("hello world! 32");

	console.log(
		"metafield type : " + typeof window.Pragati.common.metafield.buy_button
	);

	const formDesignerData = window.Pragati.common.metafield.form_designer;

	const formDesignerData2 = window.Pragati.common.metafield.form_designer2;

	console.log("vinod " + formDesignerData.length);

	const reverseFormDesignerData = formDesignerData.reverse();

	reverseFormDesignerData.map((key, index) => {
		if (key.id === "order_summary_field") {
			if (key.hidden === false) {
				let price = window.Pragati.common.product.price;
				let dotPrice = (price / 100).toFixed(2);

				const product_title = window.Pragati.common.product.title;
				let new_product_title = "";

				if (product_title.length > 20) {
					new_product_title = product_title.slice(0, 20) + "...";
				} else {
					new_product_title = product_title;
				}

				let str = window.Pragati.common.shop.money_format;
				let newStr = str.replace(/{{.*?}}/g, "");

				let html = `
			<div className="total_summery">
      <hr class="pragati-cod-form-hr-1" style=" height: 1px;background-color: silver;border: none;" />
      <div class="pragati-cod-form-flex">
        <div class="pragati-cod-form-flex">
          <img class="pragati-cod-form-img" src="${window.Pragati.common.product.featured_image}" alt="Girl in a jacket" width="500" height="600">
          <h5 style="margin:10px;" >${new_product_title}</h5>
        </div>
        <h5 style="font-weight: bold; font-size: 14px;">${newStr}${dotPrice}</h5>
      </div>
      <hr class="pragati-cod-form-hr-2" style=" height: 1px;background-color: silver;border: none;" />
    </div>
			`;
				flexContainer.insertAdjacentHTML("afterend", html);
			}
		} else if (key.id === "totals_summary_field") {
			if (key.hidden === false) {
				let price = window.Pragati.common.product.price;
				let dotPrice = (price / 100).toFixed(2);

				let str = window.Pragati.common.shop.money_format;
				let newStr = str.replace(/{{.*?}}/g, "");

				let html = `
			<div style="display: flex;flex-direction: column;justify-content: center;gap: 0.4rem;background-color: #e8ebe9;padding: 10px;border-radius: 6px;margin-top:7px;margin-bottom:7px;">
      <div class="pragati-cod-form-flex">
        <h5>${key.data.field1.value}</h5>
        <h5 style="font-weight: bold;">${newStr}${dotPrice}</h5>
      </div>
      <div class="pragati-cod-form-flex">
        <h5>${key.data.field2.value}</h5>
        <h5 style="font-weight: bold;">Free</h5>
      </div>
      <hr class="pragati-cod-form-hr-3" style="height: 1px;background-color: silver;border: none;" />
      <div class="pragati-cod-form-flex">
        <h5>${key.data.field3.value}</h5>
        <h5 style="font-weight: bold;">${newStr}${dotPrice}</h5>
      </div>
    </div>
			`;
				flexContainer.insertAdjacentHTML("afterend", html);
			}
		} else if (key.id === "shipping_rates_field") {
			if (key.hidden === false) {
				let html = `
			<div>
      <label style="margin-top: 7px; font-weight: bold;">${key.data.field1.value}</label>
      <div class="pragati-cod-form-flex" style="padding: 12px;border-radius: 6px; border: 1px solid #ddd;margin-buttom: 7px;">
        <div class="pragati-cod-form-flex">
          <input type="radio" id="html" name="fav_language" value="HTML" checked style="cursor: pointer; width: auto">
          <label for="html" style="margin-left: 10px;cursor: pointer; font-weight: bold;">Free Shipping</label>
        </div>
        <h5 style="font-weight: bold;">${key.data.field2.value}</h5>
      </div>
    </div>
			`;

				flexContainer.insertAdjacentHTML("afterend", html);
			}
		} else if (key.id === "enter_your_shipping_address_field") {
			if (key.hidden === false) {
				let html = `
			<div style="display: flex;padding: 10px; justify-content: ${key.data.field2.value};">
      <p style="font-weight: ${key.data.field4.value}; font-size: ${key.data.field3.value}px">${key.data.field1.value}</p>
    </div>
			`;
				flexContainer.insertAdjacentHTML("afterend", html);
			}
		} else if (key.id === "first_name_field") {
			if (key.hidden === false) {
				let html = `
			<div style="margin-top: 6px;margin-bottom:6px;">
      <label for="pragati_input_first_name_field" class="${
				key.data.field4.checked ? `pragati-cod-form-required` : `undefined`
			}" style="font-weight: bold; display:${
					formDesignerData2.hideFieldLabels ? `none` : `undefined`
				};">${key.data.field1.value}</label>
      <div class="pragati-cod-form-inputWithIcon" style="margin-top: 5px;">
        <input id="pragati_input_first_name_field" minlength="${
					key.data.field5.minValue
				}" maxlength="${key.data.field5.maxValue}" class="${
					formDesignerData2.textfieldFocusColor
				}" style="padding-left:${
					key.data.field3.checked ? `35px` : `12px`
				}; border-width: ${
					formDesignerData2.textfieldBorderWidth
				}; border-radius: ${
					formDesignerData2.textfieldBorderRadius
				}px;" type="text" placeholder="${key.data.field2.value}">
        <i style="display:${
					key.data.field3.checked ? `undefined` : `none`
				};" class="fa fa-user fa-lg fa-fw" aria-hidden="true"></i>
      </div>
      <label style="display: none;" id="pragati_input_first_name_field_required_message">${
				formDesignerData2.requiredErrorText
			}</label>
      <label style="display: none;" id="pragati_input_first_name_field_invalid_message">${
				key.data.field6.value
					? key.data.field6.value
					: formDesignerData2.invalidValueErrorText
			}</label>    
    </div>
			`;
				flexContainer.insertAdjacentHTML("afterend", html);
			}
		} else if (key.id === "last_name_field") {
			if (key.hidden === false) {
				let html = `
			<div style="margin-top: 6px;margin-bottom:6px;">
      <label for="pragati_input_last_name_field" class="${
				key.data.field4.checked ? `pragati-cod-form-required` : `undefined`
			}" style="font-weight: bold; display:${
					formDesignerData2.hideFieldLabels ? `none` : `undefined`
				};">${key.data.field1.value}</label>
      <div class="pragati-cod-form-inputWithIcon" style="margin-top: 5px;">
        <input id="pragati_input_last_name_field" minlength="${
					key.data.field5.minValue
				}" maxlength="${key.data.field5.maxValue}" class="${
					formDesignerData2.textfieldFocusColor
				}" style="padding-left:${
					key.data.field3.checked ? `35px` : `12px`
				}; border-width: ${
					formDesignerData2.textfieldBorderWidth
				}; border-radius: ${
					formDesignerData2.textfieldBorderRadius
				}px;" type="text" placeholder="${key.data.field2.value}">
        <i style="display:${
					key.data.field3.checked ? `undefined` : `none`
				};" class="fa fa-user fa-lg fa-fw" aria-hidden="true"></i>
      </div>
      <label style="display: none;" id="pragati_input_last_name_field_required_message">${
				formDesignerData2.requiredErrorText
			}</label>
      <label style="display: none;" id="pragati_input_last_name_field_invalid_message">${
				key.data.field6.value
					? key.data.field6.value
					: formDesignerData2.invalidValueErrorText
			}</label>    
    </div>
			`;
				flexContainer.insertAdjacentHTML("afterend", html);
			}
		} else if (key.id === "phone_number_field") {
			if (key.hidden === false) {
				let html = `
			<div style="margin-top: 6px;margin-bottom:6px;">
      <label for="pragati_input_phone_number_field" class="${
				key.data.field4.checked ? `pragati-cod-form-required` : `undefined`
			}" style="font-weight: bold; display:${
					formDesignerData2.hideFieldLabels ? `none` : `undefined`
				};">${key.data.field1.value}</label>
      <div class="pragati-cod-form-inputWithIcon" style="margin-top: 5px;">
        <input id="pragati_input_phone_number_field" minlength="${
					key.data.field5.minValue
				}" maxlength="${key.data.field5.maxValue}" pattern="\\d{${
					key.data.field5.minValue
				},${key.data.field5.maxValue}}" class="${
					formDesignerData2.textfieldFocusColor
				}" style="padding-left:${
					key.data.field3.checked ? `35px` : `12px`
				}; border-width: ${
					formDesignerData2.textfieldBorderWidth
				}; border-radius: ${
					formDesignerData2.textfieldBorderRadius
				}px;" type="tel" placeholder="${key.data.field2.value}">
        <i style="display:${
					key.data.field3.checked ? `undefined` : `none`
				};" class="fa fa-phone fa-lg fa-fw" aria-hidden="true"></i>
      </div>
      <label style="display: none;" id="pragati_input_phone_number_field_required_message">${
				formDesignerData2.requiredErrorText
			}</label>
      <label style="display: none;" id="pragati_input_phone_number_field_invalid_message">${
				key.data.field6.value
					? key.data.field6.value
					: formDesignerData2.invalidValueErrorText
			}</label>    
    </div>
			`;
				console.log(
					`value of key.data.field3.value ${key.data.field3.checked}`
				);
				flexContainer.insertAdjacentHTML("afterend", html);
			}
		} else if (key.id === "address_field") {
			if (key.hidden === false) {
				let html = `
			<div style="margin-top: 6px;margin-bottom:6px;">
      <label for="pragati_input_address_field" class="${
				key.data.field4.checked ? `pragati-cod-form-required` : `undefined`
			}" style="font-weight: bold; display:${
					formDesignerData2.hideFieldLabels ? `none` : `undefined`
				};">${key.data.field1.value}</label>
      <div class="pragati-cod-form-inputWithIcon" style="margin-top: 5px;">
        <input id="pragati_input_address_field" minlength="${
					key.data.field5.minValue
				}" maxlength="${key.data.field5.maxValue}" class="${
					formDesignerData2.textfieldFocusColor
				}" style="padding-left:${
					key.data.field3.checked ? `35px` : `12px`
				}; border-width: ${
					formDesignerData2.textfieldBorderWidth
				}; border-radius: ${
					formDesignerData2.textfieldBorderRadius
				}px;" type="text" placeholder="${key.data.field2.value}">
        <i style="display:${
					key.data.field3.checked ? `undefined` : `none`
				};" class="fa fa-location-dot fa-lg fa-fw" aria-hidden="true"></i>
      </div>
      <label style="display: none;" id="pragati_input_address_field_required_message">${
				formDesignerData2.requiredErrorText
			}</label>
      <label style="display: none;" id="pragati_input_address_field_invalid_message">${
				key.data.field6.value
					? key.data.field6.value
					: formDesignerData2.invalidValueErrorText
			}</label>    
    </div>
			`;
				flexContainer.insertAdjacentHTML("afterend", html);
			}
		} else if (key.id === "address_2_field") {
			if (key.hidden === false) {
				let html = `
			<div style="margin-top: 6px;margin-bottom:6px;">
      <label for="pragati_input_address_2_field" class="${
				key.data.field4.checked ? `pragati-cod-form-required` : `undefined`
			}" style="font-weight: bold; display:${
					formDesignerData2.hideFieldLabels ? `none` : `undefined`
				};">${key.data.field1.value}</label>
      <div class="pragati-cod-form-inputWithIcon" style="margin-top: 5px;">
        <input id="pragati_input_address_2_field" minlength="${
					key.data.field5.minValue
				}" maxlength="${key.data.field5.maxValue}" class="${
					formDesignerData2.textfieldFocusColor
				}" style="padding-left:${
					key.data.field3.checked ? `35px` : `12px`
				}; border-width: ${
					formDesignerData2.textfieldBorderWidth
				}; border-radius: ${
					formDesignerData2.textfieldBorderRadius
				}px;" type="text" placeholder="${key.data.field2.value}">
        <i style="display:${
					key.data.field3.checked ? `undefined` : `none`
				};" class="fa fa-location-dot fa-lg fa-fw" aria-hidden="true"></i>
      </div>
      <label style="display: none;" id="pragati_input_address_2_field_required_message">${
				formDesignerData2.requiredErrorText
			}</label>
      <label style="display: none;" id="pragati_input_address_2_field_invalid_message">${
				key.data.field6.value
					? key.data.field6.value
					: formDesignerData2.invalidValueErrorText
			}</label>    
    </div>
			`;
				flexContainer.insertAdjacentHTML("afterend", html);
			}
		} else if (key.id === "state_field") {
			if (key.hidden === false) {
				const statesOptionsData = window.Pragati.common.metafield.states;

				let optionsHtml = "";
				statesOptionsData.forEach((option) => {
					optionsHtml += `<option value="${option.isoCode}">${option.name}</option>`;
				});

				let html = `
			<div style="margin-top: 6px;margin-bottom:6px;">
      <label for="pragati_input_state_field" class="${
				key.data.field3.checked ? `pragati-cod-form-required` : `undefined`
			}" style="font-weight: bold; display:${
					formDesignerData2.hideFieldLabels ? `none` : `undefined`
				};">${key.data.field1.value}</label>
      <div class="pragati-cod-form-inputWithIcon" style="margin-top: 5px;">
        <select
  name="pragati_input_state_field"
  id="pragati_input_state_field"
  class="${formDesignerData2.textfieldFocusColor}"
  style="height: 34px; padding: 5px; border-radius: ${
		formDesignerData2.textfieldBorderRadius
	}px; border: 2px solid #aaa; border-width: ${
					formDesignerData2.textfieldBorderWidth
				};"
>
	<option value="" disabled selected>${key.data.field2.value}</option>
  ${optionsHtml}
</select>
      </div>
      <label style="display: none;" id="pragati_input_state_field_required_message">${
				formDesignerData2.requiredErrorText
			}</label>
      <label style="display: none;" id="pragati_input_state_field_invalid_message">Enter a valid value.</label>    
    </div>
			`;
				flexContainer.insertAdjacentHTML("afterend", html);
			}
		} else if (key.id === "city_field") {
			if (key.hidden === false) {
				let html = `
			<div style="margin-top: 6px;margin-bottom:6px;">
      <label for="pragati_input_city_field" class="${
				key.data.field4.checked ? `pragati-cod-form-required` : `undefined`
			}" style="font-weight: bold; display:${
					formDesignerData2.hideFieldLabels ? `none` : `undefined`
				};">${key.data.field1.value}</label>
      <div class="pragati-cod-form-inputWithIcon" style="margin-top: 5px;">
        <input id="pragati_input_city_field" minlength="${
					key.data.field5.minValue
				}" maxlength="${key.data.field5.maxValue}" class="${
					formDesignerData2.textfieldFocusColor
				}" style="padding-left:${
					key.data.field3.checked ? `35px` : `12px`
				}; border-width: ${
					formDesignerData2.textfieldBorderWidth
				}; border-radius: ${
					formDesignerData2.textfieldBorderRadius
				}px;" type="text" placeholder="${key.data.field2.value}">
        <i style="display:${
					key.data.field3.checked ? `undefined` : `none`
				};" class="fa fa-location-dot fa-lg fa-fw" aria-hidden="true"></i>
      </div>
      <label style="display: none;" id="pragati_input_city_field_required_message">${
				formDesignerData2.requiredErrorText
			}</label>
      <label style="display: none;" id="pragati_input_city_field_invalid_message">${
				key.data.field6.value
					? key.data.field6.value
					: formDesignerData2.invalidValueErrorText
			}</label>    
    </div>
			`;
				flexContainer.insertAdjacentHTML("afterend", html);
			}
		} else if (key.id === "pincode_field") {
			if (key.hidden === false) {
				let value1 = "",
					value2 = "";
				if (
					Number.isInteger(key.data.field5.minValue) &&
					key.data.field5.minValue > 0
				) {
					value1 = "1";
					value2 = "0".repeat(key.data.field5.minValue - 1);
				}

				let html = `
			<div style="margin-top: 6px;margin-bottom:6px;">
      <label for="pragati_input_pincode_field" class="${
				key.data.field4.checked ? `pragati-cod-form-required` : `undefined`
			}" style="font-weight: bold; display:${
					formDesignerData2.hideFieldLabels ? `none` : `undefined`
				};">${key.data.field1.value}</label>
      <div class="pragati-cod-form-inputWithIcon" style="margin-top: 5px;">
        <input id="pragati_input_pincode_field" class="${
					formDesignerData2.textfieldFocusColor
				}" style="padding-left:${
					key.data.field3.checked ? `35px` : `12px`
				}; border-width: ${
					formDesignerData2.textfieldBorderWidth
				}; border-radius: ${
					formDesignerData2.textfieldBorderRadius
				}px;" type="${key.data.field7.checked ? `number` : `text`}" min="${
					value1 + value2
				}" pattern="[0-9A-Za-z]{${
					key.data.field5.minValue
				},}" oninput="this.value = this.value.slice(0, ${
					key.data.field5.maxValue
				})" placeholder="${key.data.field2.value}">
        <i style="display:${
					key.data.field3.checked ? `undefined` : `none`
				};" class="fa fa-location-dot fa-lg fa-fw" aria-hidden="true"></i>
      </div>
      <label style="display: none;" id="pragati_input_pincode_field_required_message">${
				formDesignerData2.requiredErrorText
			}</label>
      <label style="display: none;" id="pragati_input_pincode_field_invalid_message">${
				key.data.field6.value
					? key.data.field6.value
					: formDesignerData2.invalidValueErrorText
			}</label>
    </div>
			`;
				flexContainer.insertAdjacentHTML("afterend", html);
			}
		} else if (key.id === "email_field") {
			if (key.hidden === false) {
				let html = `
			<div style="margin-top: 6px;margin-bottom:6px;">
      <label for="pragati_input_email_field" class="${
				key.data.field4.checked ? `pragati-cod-form-required` : `undefined`
			}" style="font-weight: bold; display:${
					formDesignerData2.hideFieldLabels ? `none` : `undefined`
				};">${key.data.field1.value}</label>
      <div class="pragati-cod-form-inputWithIcon" style="margin-top: 5px;">
        <input id="pragati_input_email_field" minlength="${
					key.data.field5.minValue
				}" maxlength="${key.data.field5.maxValue}" class="${
					formDesignerData2.textfieldFocusColor
				}" style="padding-left:${
					key.data.field3.checked ? `35px` : `12px`
				}; border-width: ${
					formDesignerData2.textfieldBorderWidth
				}; border-radius: ${
					formDesignerData2.textfieldBorderRadius
				}px;" type="email" placeholder="${key.data.field2.value}">
        <i style="display:${
					key.data.field3.checked ? `undefined` : `none`
				};" class="fa fa-envelope fa-lg fa-fw" aria-hidden="true"></i>
      </div>
      <label style="display: none;" id="pragati_input_email_field_required_message">${
				formDesignerData2.requiredErrorText
			}</label>      
      <label style="display: none;" id="pragati_input_email_field_invalid_message">${
				key.data.field6.value
					? key.data.field6.value
					: formDesignerData2.invalidValueErrorText
			}</label>      
    </div>
			`;
				flexContainer.insertAdjacentHTML("afterend", html);
			}
		} else if (key.id === "order_note_field") {
			if (key.hidden === false) {
				let html = `
			<div style="margin-top: 6px;margin-bottom:6px;">
      <label for="pragati_input_order_note_field" class="${
				key.data.field4.checked ? `pragati-cod-form-required` : `undefined`
			}" style="font-weight: bold; display:${
					formDesignerData2.hideFieldLabels ? `none` : `undefined`
				};">${key.data.field1.value}</label>
      <div class="pragati-cod-form-inputWithIcon" style="margin-top: 5px;">
        <input id="pragati_input_order_note_field" minlength="${
					key.data.field5.minValue
				}" maxlength="${key.data.field5.maxValue}" class="${
					formDesignerData2.textfieldFocusColor
				}" style="padding-left:${
					key.data.field3.checked ? `35px` : `12px`
				}; border-width: ${
					formDesignerData2.textfieldBorderWidth
				}; border-radius: ${
					formDesignerData2.textfieldBorderRadius
				}px;" type="text" placeholder="${key.data.field2.value}">
        <i style="display:${
					key.data.field3.checked ? `undefined` : `none`
				};" class="fa fa-note-sticky fa-lg fa-fw" aria-hidden="true"></i>
      </div>
      <label style="display: none;" id="pragati_input_order_note_field_required_message">${
				formDesignerData2.requiredErrorText
			}</label>
      <label style="display: none;" id="pragati_input_order_note_field_invalid_message">${
				key.data.field6.value
					? key.data.field6.value
					: formDesignerData2.invalidValueErrorText
			}</label>      
    </div>
			`;
				flexContainer.insertAdjacentHTML("afterend", html);
			}
		} else if (key.id === "summit_button_field") {
			if (key.hidden === false) {
				let html = `
			<button
  id="pragati-summit_button_field"
  class="pragati-buy-button order_summit_button"
  style="justify-content: center; padding: 12px 19px; margin: 6px 0px"
>
	<span id="pragati-summit-button-loading" ></span>
  ${key.data.field1.value}
</button>

			`;
				flexContainer.insertAdjacentHTML("afterend", html);
			}
		}
	});

	const summitButton = document.getElementById("pragati-summit_button_field");
	const loadingIcon = document.getElementById("pragati-summit-button-loading");

	const onSummitButtonClick = function () {
		loadingIcon.classList.add("loader");

		const query = `mutation CreateNewOrder($data: CreateNewOrderDataInput) {
    createNewOrder(data: $data) {
      success
      errors {
        message
      }
      result
    }
  }
`;

		const variables = {
			data: orderInfo,
		};

		fetch("https://gadget-demo-two.gadget.app/api/graphql/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query,
				variables,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				console.log(data.data.createNewOrder.result.response.order_status_url);
				const redirectUrl =
					data.data.createNewOrder.result.response.order_status_url;
				window.location.href = redirectUrl;
				loadingIcon.classList.remove("loader");
			})
			.catch((error) => console.error(error));
	};

	summitButton.addEventListener("click", () => {
		let requiredTriggered = false;
		let invalidTriggered = false;
		const elements = document.getElementsByClassName(
			"pragati-cod-form-required"
		);

		for (let i = 0; i < elements.length; i++) {
			const inputId = elements[i].htmlFor;
			const inputElement = document.getElementById(inputId);

			let requiredMessageTriggered = false;

			if (inputElement.value.trim() === "") {
				inputElement.classList.add("pragati-red-border");

				let requiredMessage = document.getElementById(
					`${inputElement.id}_required_message`
				);
				requiredMessage.classList.add("pragati-required-message");

				requiredMessageTriggered = true;

				let invalidMessage = document.getElementById(
					`${inputElement.id}_invalid_message`
				);
				invalidMessage.classList.remove("pragati-invalid-message");

				requiredTriggered = true;
			}

			if (!requiredMessageTriggered) {
				if (!inputElement.checkValidity()) {
					inputElement.classList.add("pragati-red-border");

					let invalidMessage = document.getElementById(
						`${inputElement.id}_invalid_message`
					);
					invalidMessage.classList.add("pragati-invalid-message");

					let requiredMessage = document.getElementById(
						`${inputElement.id}_required_message`
					);
					requiredMessage.classList.remove("pragati-required-message");

					invalidTriggered = true;
				}
			}
		}

		if (!requiredTriggered && !invalidTriggered) {
			onSummitButtonClick();
		}
	});

	document
		.getElementById("pragati_input_first_name_field")
		?.addEventListener("input", function (event) {
			orderInfo.first_name = event.target.value;
			if (this.value !== "" && this.checkValidity()) {
				this.classList.remove("pragati-red-border");

				const requiredMessage = document.getElementById(
					`${this.id}_required_message`
				);
				requiredMessage.classList.remove("pragati-required-message");

				const invalidMessage = document.getElementById(
					`${this.id}_invalid_message`
				);
				invalidMessage.classList.remove("pragati-invalid-message");
			}
		});

	document
		.getElementById("pragati_input_last_name_field")
		?.addEventListener("input", function (event) {
			orderInfo.last_name = event.target.value;
			if (this.value !== "" && this.checkValidity()) {
				this.classList.remove("pragati-red-border");

				const requiredMessage = document.getElementById(
					`${this.id}_required_message`
				);
				requiredMessage.classList.remove("pragati-required-message");

				const invalidMessage = document.getElementById(
					`${this.id}_invalid_message`
				);
				invalidMessage.classList.remove("pragati-invalid-message");
			}
		});

	document
		.getElementById("pragati_input_phone_number_field")
		?.addEventListener("input", function (event) {
			orderInfo.phone = event.target.value;
			const inputValue = this.value;
			const numericValue = inputValue.replace(/[^0-9]/g, "");
			this.value = numericValue;

			if (numericValue !== "" && this.checkValidity()) {
				this.classList.remove("pragati-red-border");

				const requiredMessage = document.getElementById(
					`${this.id}_required_message`
				);
				requiredMessage.classList.remove("pragati-required-message");

				const invalidMessage = document.getElementById(
					`${this.id}_invalid_message`
				);
				invalidMessage.classList.remove("pragati-invalid-message");
			}
		});

	document
		.getElementById("pragati_input_address_field")
		?.addEventListener("input", function (event) {
			orderInfo.address1 = event.target.value;
			if (this.value !== "" && this.checkValidity()) {
				this.classList.remove("pragati-red-border");

				const requiredMessage = document.getElementById(
					`${this.id}_required_message`
				);
				requiredMessage.classList.remove("pragati-required-message");

				const invalidMessage = document.getElementById(
					`${this.id}_invalid_message`
				);
				invalidMessage.classList.remove("pragati-invalid-message");
			}
		});

	document
		.getElementById("pragati_input_address_2_field")
		?.addEventListener("input", function (event) {
			orderInfo.address2 = event.target.value;
			if (this.value !== "" && this.checkValidity()) {
				this.classList.remove("pragati-red-border");

				const requiredMessage = document.getElementById(
					`${this.id}_required_message`
				);
				requiredMessage.classList.remove("pragati-required-message");

				const invalidMessage = document.getElementById(
					`${this.id}_invalid_message`
				);
				invalidMessage.classList.remove("pragati-invalid-message");
			}
		});

	document
		.getElementById("pragati_input_city_field")
		?.addEventListener("input", function (event) {
			orderInfo.city = event.target.value;
			if (this.value !== "" && this.checkValidity()) {
				this.classList.remove("pragati-red-border");

				const requiredMessage = document.getElementById(
					`${this.id}_required_message`
				);
				requiredMessage.classList.remove("pragati-required-message");

				const invalidMessage = document.getElementById(
					`${this.id}_invalid_message`
				);
				invalidMessage.classList.remove("pragati-invalid-message");
			}
		});

	document
		.getElementById("pragati_input_pincode_field")
		?.addEventListener("input", function (event) {
			orderInfo.zip = event.target.value;
			if (this.value !== "" && this.checkValidity()) {
				this.classList.remove("pragati-red-border");

				const requiredMessage = document.getElementById(
					`${this.id}_required_message`
				);
				requiredMessage.classList.remove("pragati-required-message");

				const invalidMessage = document.getElementById(
					`${this.id}_invalid_message`
				);
				invalidMessage.classList.remove("pragati-invalid-message");
			}
		});

	document
		.getElementById("pragati_input_email_field")
		?.addEventListener("input", function (event) {
			orderInfo.email = event.target.value;
			if (this.value !== "" && this.checkValidity()) {
				this.classList.remove("pragati-red-border");

				const requiredMessage = document.getElementById(
					`${this.id}_required_message`
				);
				requiredMessage.classList.remove("pragati-required-message");

				const invalidMessage = document.getElementById(
					`${this.id}_invalid_message`
				);
				invalidMessage.classList.remove("pragati-invalid-message");
			} //today i learn that if i don't add classList and use remove without classList it will completely remove the element from the dom.
		});

	document
		.getElementById("pragati_input_order_note_field")
		?.addEventListener("input", function (event) {
			orderInfo.note = event.target.value;
			if (this.value !== "" && this.checkValidity()) {
				this.classList.remove("pragati-red-border");

				const requiredMessage = document.getElementById(
					`${this.id}_required_message`
				);
				requiredMessage.classList.remove("pragati-required-message");

				const invalidMessage = document.getElementById(
					`${this.id}_invalid_message`
				);
				invalidMessage.classList.remove("pragati-invalid-message");
			}
		});

	document
		.getElementById("pragati_input_state_field")
		?.addEventListener("input", function (event) {
			orderInfo.province = event.target.value;
			console.log("orderInfo.province : " + orderInfo.province);
			if (this.value !== "" && this.checkValidity()) {
				this.classList.remove("pragati-red-border");

				const requiredMessage = document.getElementById(
					`${this.id}_required_message`
				);
				requiredMessage.classList.remove("pragati-required-message");

				// select will never trigger invalid value.

				const invalidMessage = document.getElementById(
					`${this.id}_invalid_message`
				);
				invalidMessage.classList.remove("pragati-invalid-message");
			}
		});

	console.log("WWWWWWWWWWWW 25");
});
