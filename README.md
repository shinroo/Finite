<p align="center">
  <img src="https://i.imgur.com/FBHIiem.png" width="80%"/>
</p>

## 🤔 Why?

User interfaces can be expressed by two things:

1. The state of the UI
2. Actions that can change that state

And we can connect this two points with Finite-state machine.
This simple micro framework use State as main part of web page.

## 💻 Install and Usage

Install finite using your package manager

```bash
$ npm install @stepanvanzuriak/finite
```

And just use!

```javascript
import Finite, { State, h } from "@stepanvanzuriak/finite";

const JustText = State({
  view: () => h`<p>Hello!</p>`
});

Finite.Render(JustText, document.body);
```

## Simple counter example

```javascript
const Counter = Finite.State({
  name: "counter",
  transitions: [
    Finite.T("INCREMENT", "counter"),
    Finite.T("DECREMENT", "counter")
  ],
  memory: { count: 0 },
  increment: (_, { count }) =>
    Finite.Transition("INCREMENT", { count: count + 1 }),
  decrement: (_, { count }) =>
    Finite.Transition("INCREMENT", { count: count - 1 }),
  view: ({ count, increment, decrement }) =>
    h`<div class="app">
        <button onclick=${decrement}>-1</button>
        <div>${count}</div>
        <button onclick=${increment}>+1</button>
      </div>`
});

Finite.Render(Counter, document.body);
```

## Two state example

```javascript
const A = Finite.State({
  name: "A",
  memory: {
    text: "Text A"
  },
  transitions: [Finite.T("MOVE_TO_B", "B")],
  onClick: e => Finite.Transition("MOVE_TO_B"),
  view: ({ text, onClick }) =>
    h`<div class="app">
        <div>${text}</div><button onclick=${onClick}>To B</button>
      </div>`
});

const B = Finite.State({
  name: "B",
  memory: {
    text: "Text B"
  },
  transitions: [Finite.T("MOVE_TO_A", "A")],
  onClick: e => Finite.Transition("MOVE_TO_A", { text: "New Text A" }),
  view: ({ text, onClick }) =>
    h`<div class="app">
        <div>${text}</div><button onclick=${onClick}>To A</button>
      </div>`
});

Finite.Render(A, document.body);
```

##### More examples in `example` folder

## 📝 TODO

- [x] Write own html template (instead of lit-html) to reduce bundle size. See [picohtml](https://github.com/stepanvanzuriak/picohtml)
- [ ] Create Finite.State version as ES6 class
- [ ] Rethink AsyncTransition (Promise rejection)
- [ ] Move examples to [CodeSandbox](https://codesandbox.io/)
- [ ] Better tests

## 📖 Api

### State

```typescript
Finite.State({
    view,
    [name],
    [memory],
    [transitions],
    [...rest]
}: IStateType)
```

You can use `rest` for own methods like `onChange, onClick` etc.

### Transition

```typescript
Finite.Transition(
  name : String,
  [payload] : Object
)
```

Change current state to another, `name` is name from state transitions and `payload` is extra data to send

### AsyncTransition

```typescript
Finite.Transition(
  name : String,
  [payload] : Object
)
```

Instead of normal `Transition` you can set data in payload as `Promise` and `Finite` will change state only when data become fetched.

See `async.js` in `example` folder

### Render

```typescript
Finite.Render(
  state: State,
  point: HTMLElement
)
```

Set render point and init state for app

### T

```typescript
Finite.T(
  name: String,
  to: String
) -> {name, to}
```

## 🖊️ Typings

```typescript
interface ITransition {
  name: string;
  to: string;
}

interface IStateType {
  view: (...args) => any;
  name: string;
  memory: object;
  transitions: ITransition[];
  rest: object;
}
```

# 💁 Contribute

If you want to contribute to this project, please see our [Contributing Guide](/CONTRIBUTING.md) !
