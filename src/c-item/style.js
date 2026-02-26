const style = new CSSStyleSheet();
style.replaceSync(`
  :host {
    width: 100%;
  }

  div.body {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 10px;
  }

  li {
    list-style-type: none;
    width: 100%;
    padding: 10px 0;
    font-size: 20px;

    &.circle {
      list-style-type: circle;
    }

    &.disc {
      list-style-type: disc;
    }

    &.square {
      list-style-type: square;
    }

    &.decimal {
      list-style-type: decimal;
    }
  }

  input {
    font: inherit;
    width: 100%;
    border: none;
    padding: 0;
    border-bottom: 1px solid transparent;
    background-color: transparent;

    &:focus-visible {
      outline: none;
      border-bottom: 1px solid blue;
    }

    &.done {
      color: green;
      border-bottom: 1px solid green;
    }

    &.abort {
      text-decoration: line-through;
      color: red;
    }
  }

  div.control {
    display: flex;
    gap: 4px;
  }

  button {
    width: 30px;
    height: 30px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid blue;
    background: rgb(226, 233, 255);

    &:hover {
      background: rgb(212, 221, 252);
    }

    &.hidden {
      display: none;
    }
  }
`);
export default style;
