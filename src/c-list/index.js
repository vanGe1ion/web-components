import style from "./style.js";

export class CustomList extends HTMLElement {
  #title = "TODO list";
  #variant = CustomList.#variantList[0];

  #addBtn;
  #markBtn;
  #input;
  #h3;
  #slot;

  static #variantList = ["disc", "circle", "square"];
  static #template = (() => {
    const template = document.createElement("template");
    template.innerHTML = `
      <div class="container">
        <h3>TODO list</h3>
        <div class="control">
          <input id="todo-text" type="text" placeholder="I'm planning to..." />
          <div class="control">
            <button id="add-btn">
              <img src="./add.svg" alt="add" />
            </button>
            <button id="mark-btn">
              <li id='marker'></li>
            </button>
          </div>
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
    this.#markBtn = template.getElementById("mark-btn");
    this.#h3 = template.querySelector("h3");
    this.#input = template.querySelector("input");
    this.#slot = template.querySelector("slot");

    this.addField = this.addField.bind(this);
    this.toggleMark = this.toggleMark.bind(this);

    this.shadowRoot.append(template);
    this.shadowRoot.adoptedStyleSheets = [style];
  }

  getVariant() {
    const variant = this.getAttribute("variant");
    if (CustomList.#variantList.includes(variant))
      return (this.#variant = variant);
    this.#variant = CustomList.#variantList[0];
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
        this.#markBtn.classList.remove(...CustomList.#variantList);
        this.#markBtn.classList.add(this.#variant);

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

  toggleMark() {
    const index = CustomList.#variantList.indexOf(this.#variant);
    const nextIndex =
      index + 1 === CustomList.#variantList.length ? 0 : index + 1;
    this.variant = CustomList.#variantList[nextIndex];
  }

  connectedCallback() {
    this.#addBtn.addEventListener("click", this.addField);
    this.#markBtn.addEventListener("click", this.toggleMark);
  }

  disconnectedCallback() {
    this.#addBtn.removeEventListener("click", this.addField);
    this.#markBtn.removeEventListener("click", this.toggleMark);
  }
}

customElements.define("c-list", CustomList);
