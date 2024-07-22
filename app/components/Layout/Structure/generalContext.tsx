import { createContext, useContext } from 'react';
import { generalResultProps, generalStateInitialValues } from './generalReducer';


const context = createContext<generalResultProps>({
  ...generalStateInitialValues,
  setSeller: () => {}
});

export const useGeneralContext = () : generalResultProps =>
  useContext<generalResultProps>(context);

export const GeneralContextProvider = context.Provider;