const style = new CSSStyleSheet();
style.replaceSync(`
  c-item:first-child::part(up-btn),
  c-item:last-child::part(down-btn) {
    display: none;
  }
  `);
document.adoptedStyleSheets = [style];

function initTodoList(list) {
  list.addEventListener("add", (e) => {
    const { content, variant } = e.detail;
    const item = document.createElement("c-item");
    item.variant = variant;
    item.text = content;

    item.addEventListener("delete", (e) => {
      const confirmation = confirm(
        `Are you sure, you want to delete this field? \n "${e.detail.element.text}"`,
      );
      if (confirmation) item.remove();
    });

    item.addEventListener("move-up", (e) => {
      const previous = item.previousElementSibling;
      if (!previous) return;
      list.insertBefore(item, previous);
    });

    item.addEventListener("move-down", (e) => {
      const next = item.nextElementSibling;
      if (!next) return;
      next.parentNode.insertBefore(item, next.nextSibling);
    });

    list.append(item);
  });
}
