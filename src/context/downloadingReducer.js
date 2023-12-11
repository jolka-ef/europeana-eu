import { responseInitialValue } from "./AppContext";

export function downloadingReducer(result, action) {
  switch (action.type) {
    case "Loading":
      return { ...result, status: "Loading" };
    case "Loaded": {
      return {
        ...result,
        status: "Loaded",
        data: {
          ...action.data,
          items: [...result.data.items, ...action.data.items],
        },
      };
    }
    case "Error":
      return { ...result, status: "Error", error: action.error };
    case "Set_Query": {
      return { ...responseInitialValue, query: action.query };
    }
    case "Load_More": {
      return { ...result, nextCursor: action.nextCursor };
    }
    default:
      throw new Error();
  }
}
