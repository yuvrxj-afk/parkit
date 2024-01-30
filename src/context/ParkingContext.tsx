import {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

interface ParkingSpace {
  id: number;
  occupied: boolean;
  registration: string;
  entryTime: Date | null;
}

interface ParkingState {
  parkingSpaces: ParkingSpace[];
}

type Action =
  | { type: "SET_PARKING_SPACES"; payload: ParkingSpace[] }
  | { type: "ADD_CAR"; payload: { spaceId: number; registration: string } }
  | { type: "REMOVE_CAR"; payload: number };

const initialState: ParkingState = {
  parkingSpaces: [],
};

const ParkingContext = createContext<{
  state: ParkingState;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

const reducer = (state: ParkingState, action: Action): ParkingState => {
  switch (action.type) {
    case "SET_PARKING_SPACES": {
      return { ...state, parkingSpaces: action.payload };
    }
    case "ADD_CAR": {
      return {
        ...state,
        parkingSpaces: state.parkingSpaces.map((space) =>
          space.id === action.payload.spaceId
            ? {
                ...space,
                occupied: true,
                registration: action.payload.registration,
                entryTime: new Date(),
              }
            : space
        ),
      };
    }
    case "REMOVE_CAR": {
      return {
        ...state,
        parkingSpaces: state.parkingSpaces.map((space) =>
          space.id === action.payload
            ? { ...space, occupied: false, registration: "", entryTime: null }
            : space
        ),
      };
    }
    default:
      return state;
  }
};

interface ParkingProviderProps {
  children: ReactNode;
}
const ParkingProvider: FC<ParkingProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ParkingContext.Provider value={{ state, dispatch }}>
      {children}
    </ParkingContext.Provider>
  );
};

const useParkingContext = () => useContext(ParkingContext);

export { ParkingProvider, useParkingContext };
