import React, {PropsWithChildren} from 'react';
import {Characteristic} from '../components/Card';

export type CardContextType = {
	player1?: [ Characteristic ],
	player2?: [ Characteristic ],
	setPlayer1: (cards?: [Characteristic]) => void
	setPlayer2: (cards?: [Characteristic]) => void
}

export const CardContext = React.createContext<CardContextType | null>(null);

const CardProvider = ({ children }: PropsWithChildren) => {
	const [player1, setPlayer1] = React.useState<[Characteristic]>();
	const [player2, setPlayer2] = React.useState<[Characteristic]>();
	
 return (
    <CardContext.Provider value={{ player1, setPlayer1, player2, setPlayer2 }}>
      {children}
    </CardContext.Provider>
  );
};

export default CardProvider;
