const style = new CSSStyleSheet();
style.replaceSync(`
  :host {
    width: 100%;
  }

  div.container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  h3 {
    margin: 0;
    text-align: center;
    font-size: 26px;
  }

  div.control {
    display: flex;
    gap: 10px;
    padding: 0 10px;
  }

  input {
    font: inherit;
    flex-grow: 1;
    border: none;
    padding: 0;
    border-bottom: 1px solid blue;
    background-color: transparent;

    &:focus-visible {
      outline: none;
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
  }


  #mark-btn { 
    li {
      margin-left: 15px;
    }

    &.circle li{
      list-style-type: circle;
    } 

    &.disc li{
      list-style-type: disc;
    } 

    &.square li{
      list-style-type: square;
    }
  }

  ul {
    margin: 0;
    list-style-type: none;
    padding: 20px 40px;
  }
`);
export default style;
