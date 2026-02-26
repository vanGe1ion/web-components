import style from "./style.js";

class CustomList extends HTMLElement {
  #title = "TODO list";
  #variant = null;

  #addBtn;
  #input;
  #h3;
  #slot;

  static #variantList = ["circle", "disc", "square"];
  static #template = (() => {
    const template = document.createElement("template");
    template.innerHTML = `
      <div class="container">
        <h3>TODO list</h3>
        <div class="control">
          <input id="todo-text" type="text" placeholder="I'm planning to..." />
          <button id="add-btn">
            <img src="./add.svg" alt="add" />
          </button>
        </div>
        <ul>
          <slot></slot>
        </ul>
      </div>
    `;
    return template;
  })();

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const template = CustomList.#template.content.cloneNode(true);

    this.#addBtn = template.getElementById("add-btn");
    this.#h3 = template.querySelector("h3");
    this.#input = template.querySelector("input");
    this.#slot = template.querySelector("slot");

    this.addField = this.addField.bind(this)

    this.shadowRoot.append(template);
    this.shadowRoot.adoptedStyleSheets = [style];
  }

  getVariant() {
    const variant = this.getAttribute("variant");
    if (CustomList.#variantList.includes(variant)) this.#variant = variant;
    else this.#variant = null;
  }

  get variant() {
    return this.getAttribute("variant");
  }

  set variant(value) {
    return this.setAttribute("variant", value);
  }

  getTitle() {
    this.#title = this.getAttribute("title") ?? "TODO list";
  }

  get title() {
    return this.getAttribute("title");
  }

  set title(value) {
    return this.setAttribute("title", value);
  }

  static get observedAttributes() {
    return ["variant", "title"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "variant":
        this.getVariant();
        this.#slot.assignedElements().forEach((el) => {
          el.setAttribute("variant", this.#variant);
        });
        break;
      case "title":
        this.getTitle();
        this.#h3.innerHTML = this.#title;
        break;
      default:
        return;
    }
  }

  addField() {
    this.dispatchEvent(
      new CustomEvent("add", {
        bubbles: true,
        composed: true,
        detail: { content: this.#input.value, variant: this.#variant },
      }),
    );
    this.#input.value = "";
  }

  connectedCallback() {
    this.#addBtn.addEventListener("click", this.addField);
  }

  disconnectedCallback() {
    this.#addBtn.removeEventListener("click", this.addField);
  }
}

customElements.define("c-list", CustomList);
