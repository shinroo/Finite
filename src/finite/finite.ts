import { render } from "lit-html";

import { Machine } from "../machine/machine";
import { State } from "../state/state";
import { IStateType } from "../types";

const machine = new Machine();

console.log(
  "🚧 Right now console output only way to debug this, so every Transition is logged 🚧"
);
console.log("");
/**
 * Main framework object
 */
export class Finite {
  /**
   * Creates new State
   * @param state State object
   * @param state.name Name of state
   * @param state.view Function that represents view
   * @param state.memory Initial state values
   * @param state.transitions Representation of state transitions
   * @returns New state
   */
  public static State({
    name,
    view,
    memory,
    transitions,
    ...rest
  }: IStateType): State {
    const state = new State({ name, view, memory, transitions, ...rest });
    machine.add(state);

    return state;
  }

  /**
   * Transit state
   * @param name Name of transiton
   * @param payload Extra memory to send
   */
  public static Transition(name: string, payload = {}) {
    const state = machine.pointer;
    console.log(state);
    const nextStateName = state.transitions.find(
      transition => transition.name === name
    ).to;
    const nextState = machine.find(nextStateName);

    console.log(
      "%cTRANSITION",
      "color: green; font-weight: bold",
      name,
      `${state.name} -> ${nextStateName}`,
      state.memory,
      "-> ",
      {
        ...nextState.memory,
        ...payload
      }
    );

    nextState.memory = { ...nextState.memory, ...payload };

    machine.pointer = nextState;

    render(
      nextState.view({
        ...nextState.memory,
        ...nextState.restWithMemory()
      }),
      machine.getMountPoint()
    );
  }

  /**
   * Render state in point
   * @param state State to render
   * @param point HTMLElement mount point
   */
  public static Render(state: State, point: HTMLElement) {
    machine.setMountPoint(point);
    machine.pointer = state;

    console.log(
      "%cINIT_STATE",
      "color: blue; font-weight: bold",
      state.name || "Anonymous",
      state.memory
    );

    render(
      state.view({
        ...state.memory,
        ...state.restWithMemory()
      }),
      point
    );
  }

  public static T(name: string, to: string) {
    return { name, to };
  }
}
