import { State, Transition, T, h, Render } from "../dist/finite";

const view = ({ list, inputValue, onChange, addValue, removeValue }) => h`
  <div class="app">
    <input onchange=${onChange} value=${inputValue} type="text"/>
    <button onclick=${addValue}>Add</button>
    ${list.map(
      (element, index) =>
        h`<p>${element}<button onclick=${() =>
          removeValue(index)}>X</button></p>`
    )}
  </div>
  `;

const ToDo = State({
  name: "todo",
  memory: {
    list: [],
    inputValue: ""
  },
  transitions: [
    T("ADD_TODO", "todo"),
    T("CHANGE_INPUT_VALUE", "todo"),
    T("REMOVE_VALUE", "todo")
  ],
  onChange: e =>
    Transition("CHANGE_INPUT_VALUE", {
      inputValue: e.target.value
    }),
  addValue: (_, { list, inputValue }) =>
    inputValue.length > 0
      ? Transition("ADD_TODO", {
          inputValue: "",
          list: [inputValue, ...list]
        })
      : null,
  removeValue: (index, { list }) =>
    Transition("REMOVE_VALUE", {
      list: list.filter((_, i) => i !== index)
    }),
  view
});

Render(ToDo, document.querySelector("#root"));
