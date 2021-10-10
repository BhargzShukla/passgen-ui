export type PasswordResponse = {
  password: string;
  strength: number;
};

export type ReducerState = {
  length: number;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
  copied: boolean;
  status: "idle" | "pending" | "resolved" | "rejected";
  data: PasswordResponse | null;
  error: Error | null;
};

export type ReducerAction =
  | { type: "setLength"; payload: number }
  | {
      type:
        | "toggleUppercaseFlag"
        | "toggleNumbersFlag"
        | "toggleSymbolsFlag"
        | "callGeneratePasswordApi"
        | "copyToClipboardSuccess"
        | "resetCopyToClipboardFlag";
    }
  | { type: "generatePasswordApiResolve"; payload: PasswordResponse }
  | { type: "generatePasswordApiReject"; payload: Error }
  | { type: "resetAllState"; payload: ReducerState };
