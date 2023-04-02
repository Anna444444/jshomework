document.getElementById("addItemForm").addEventListener("submit", (event) => {
  event.preventDefault();

  let input = document.getElementById("newItemText");
  let newItemText = input.value.trim();
  input.value = "";

  if (!newItemText) return;

  let newItem = createListItem(newItemText);
  document.getElementById("list").appendChild(newItem);
});

function createListItem(text) {
  let li = document.createElement("li");
  li.textContent = text;

  let controls = document.createElement("div");
  controls.classList.add("list-item-controls");
  li.appendChild(controls);

  let upButton = createControlButton("⬆️", () => moveItem(li, -1));
  let downButton = createControlButton("⬇️", () => moveItem(li, 1));
  let deleteButton = createControlButton("❌", () => li.remove());

  controls.appendChild(upButton);
  controls.appendChild(downButton);
  controls.appendChild(deleteButton);

  return li;
}

function createControlButton(text, onClick) {
  let button = document.createElement("button");
  button.innerHTML = text;
  button.addEventListener("click", onClick);
  return button;
}

function moveItem(item, direction) {
  let parent = item.parentNode;
  let index = Array.from(parent.children).indexOf(item);

  if (direction === -1 && index === 0 || direction === 1 && index === parent.children.length - 1) {
    return;
}

let targetIndex = index + direction;
parent.insertBefore(item, parent.children[targetIndex + (direction > 0 ? 1 : 0)]);
}
