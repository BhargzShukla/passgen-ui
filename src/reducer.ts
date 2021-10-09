import type { ReducerAction, ReducerState } from "./types";

export const initialState: ReducerState = {
  length: 24,
  uppercase: false,
  numbers: false,
  symbols: false,
  copied: false,
  status: "idle",
  data: null,
  error: null,
};

export function init(initial: ReducerState) {
  return { ...initial };
}

export function formReducer(
  state: ReducerState,
  action: ReducerAction
): ReducerState {
  switch (action.type) {
    case "setLength":
      return {
        ...state,
        length: action.payload,
      };
    case "toggleUppercaseFlag":
      return {
        ...state,
        uppercase: !state.uppercase,
      };
    case "toggleNumbersFlag":
      return {
        ...state,
        numbers: !state.numbers,
      };
    case "toggleSymbolsFlag":
      return {
        ...state,
        symbols: !state.symbols,
      };
    case "callGeneratePasswordApi":
      return {
        ...state,
        status: "pending",
      };
    case "generatePasswordApiResolve":
      return {
        ...state,
        status: "resolved",
        data: action.payload,
      };
    case "generatePasswordApiReject":
      return {
        ...state,
        status: "rejected",
        error: action.payload,
      };
    case "copyToClipboardSuccess":
      return {
        ...state,
        copied: true,
      };
    case "resetCopyToClipboardFlag":
      return {
        ...state,
        copied: false,
      };
    case "resetAllState":
      return init(action.payload);
  }
}
