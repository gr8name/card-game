import React, {PropsWithChildren} from 'react';
import {Characteristic} from '../components/Card';

export type UserContextType = {
	level: number,
	setLevel: (level: number) => void
	boards?: Characteristic[][],
	setBoards: (boards: Characteristic[][]) => void
}

export const UserContext = React.createContext<UserContextType | null>(null);

const UserProvider = ({ children }: PropsWithChildren) => {
	const [level, setLevel] = React.useState<number>(0);
	const [boards, setBoards] = React.useState<Characteristic[][]>();
	
 return (
    <UserContext.Provider value={{ level, setLevel, boards, setBoards }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
