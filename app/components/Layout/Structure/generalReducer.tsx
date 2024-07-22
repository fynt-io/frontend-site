import { useEffect, useReducer } from 'react';
import { Seller, getSeller } from '@/app/api/callers/seller';
import { ApiResponse } from '@/app/api/apiRequester';

export interface generalResultProps extends generalStateProps {
  setSeller: (seller: Seller) => void;
}

export interface generalStateProps {
  seller: Seller | null;
}

export interface AiAssistantActionProps {
  type: generalActionType;
  payload?: any;
}

export enum generalActionType {
  SET_SELLER
}

export const generalStateInitialValues: generalStateProps = {
  seller: null
};

const reducer = (
  state: generalStateProps,
  action: AiAssistantActionProps,
): generalStateProps => {
  switch (action.type) {
    case generalActionType.SET_SELLER:
      return { ...state, seller: action.payload };
      default:
      return state;
  }
};

export default function useGeneralReducer(): generalResultProps {
  const [state, dispatch] = useReducer(reducer, generalStateInitialValues);

  const setSeller = (seller: Seller) => {
    dispatch({
      type: generalActionType.SET_SELLER,
      payload: seller,
    });
  };

  const LoadSeller = async () => {
    const res = await getSeller();
    if (res) {
      setSeller(res.data);
    }
  }


  /* Effect for loadEmpresa on First Load */
  useEffect(() => {
    //if user is inside /platform, then we load the seller
    if (window.location.pathname.includes('/platform')){
      LoadSeller();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...state,
    setSeller
  };
}
