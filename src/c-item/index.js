import style from "./style.js";

export class CustomItem extends HTMLElement {
  #text = "";
  #variant = CustomItem.#variantList[0];

  #doneBtn;
  #abortBtn;
  #upBtn;
  #downBtn;
  #deleteBtn;
  #li;
  #input;

  #events;

  static #variantList = ["disc", "circle", "square"];
  static #template = (() => {
    const template = document.createElement("template");
    template.innerHTML = `
      <li part="item">
        <div class="body">
          <input type="text" placeholder="I'm planning to..." />
          <div class="control">
            <button id="done-btn">
              <img src="./check.svg" alt="check" />
            </button>
            <button id="abort-btn">
              <img src="./abort.svg" alt="abort" />
            </button>
            <button part="up-btn" id="up-btn">
              <img src="./up.svg" alt="up" />
            </button>
            <button part="down-btn" id="down-btn">
              <img src="./down.svg" alt="down" />
            </button>
            <button id="delete-btn">
              <img src="./trash.svg" alt="trash" />
            </button>
          </div>
        </div>
      </li>
    `;
    return template;
  })();

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const template = CustomItem.#template.content.cloneNode(true);

    this.#doneBtn = template.getElementById("done-btn");
    this.#abortBtn = template.getElementById("abort-btn");
    this.#upBtn = template.getElementById("up-btn");
    this.#downBtn = template.getElementById("down-btn");
    this.#deleteBtn = template.getElementById("delete-btn");
    this.#input = template.querySelector("input");
    this.#li = template.querySelector("li");

    this.assignEvents();

    this.shadowRoot.append(template);
    this.shadowRoot.adoptedStyleSheets = [style];
  }

  getVariant() {
    const variant = this.getAttribute("variant");
    if (CustomItem.#variantList.includes(variant))
      return (this.#variant = variant);
    this.#variant = CustomItem.#variantList[0];
  }

  get variant() {
    return this.getAttribute("variant");
  }

  set variant(value) {
    return this.setAttribute("variant", value);
  }

  getText() {
    this.#text = this.getAttribute("text") ?? "";
  }

  get text() {
    return this.getAttribute("text");
  }

  set text(value) {
    return this.setAttribute("text", value);
  }

  static get observedAttributes() {
    return ["variant", "text"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "variant":
        this.getVariant();
        this.#li.classList.remove(...CustomItem.#variantList);
        this.#li.classList.add(this.#variant);
        break;
      case "text":
        this.getText();
        this.#input.value = this.#text;
        break;
      default:
        return;
    }
  }

  connectedCallback() {
    this.#events.forEach(({ el, e, h }) => {
      el.addEventListener(e, h);
    });
  }

  disconnectedCallback() {
    this.#events.forEach(({ el, e, h }) => {
      el.removeEventListener(e, h);
    });
  }

  dispatch(name) {
    this.dispatchEvent(
      new CustomEvent(name, {
        bubbles: true,
        composed: true,
        detail: { element: this },
      }),
    );
  }

  done() {
    if (this.#input.classList.contains("abort")) {
      this.#abortBtn.classList.remove("hidden");
      return this.#input.classList.remove("abort");
    }
    if (this.#input.classList.length === 0) {
      this.#doneBtn.classList.add("hidden");
      return this.#input.classList.add("done");
    }
  }

  abort() {
    if (this.#input.classList.contains("done")) {
      this.#doneBtn.classList.remove("hidden");
      return this.#input.classList.remove("done");
    }
    if (this.#input.classList.length === 0) {
      this.#abortBtn.classList.add("hidden");
      return this.#input.classList.add("abort");
    }
  }

  assignEvents() {
    this.#events = [
      {
        el: this.#input,
        e: "change",
        h: (e) => (this.text = e.target.value),
      },
      {
        el: this.#doneBtn,
        e: "click",
        h: () => this.done(),
      },
      {
        el: this.#abortBtn,
        e: "click",
        h: () => this.abort(),
      },
      {
        el: this.#upBtn,
        e: "click",
        h: () => this.dispatch("move-up"),
      },
      {
        el: this.#downBtn,
        e: "click",
        h: () => this.dispatch("move-down"),
      },
      {
        el: this.#deleteBtn,
        e: "click",
        h: () => this.dispatch("delete"),
      },
    ];
  }
}

customElements.define("c-item", CustomItem);
