import { createContext, useContext, useReducer } from 'react';

export const DataLayerContext = createContext(undefined);

export const DataLayer = (props: any) => {
  const initialState: any = props.initialState;
  const reducer: any = props.reducer;
  const children: any = props.children;

  return (
    //@ts-ignore
    <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DataLayerContext.Provider>
  );
};

export const useDataLayerValue = () => useContext(DataLayerContext);
