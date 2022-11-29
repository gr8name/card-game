import {allRaces} from 'fantasy-name-generator';
import React, {useCallback, useContext, useState} from 'react';
import Card, {Characteristic} from '../../components/Card';
import {UserContext, UserContextType} from '../../context/UserContext';
import CatGenerator from '../catGenerator';
import styles from './styles.module.scss'
import {Typography} from "@mui/material";

function CreateBoard() {
	const { level, boards = [], setBoards} = useContext(UserContext) as UserContextType;
	const [ board, setBoard ] = useState<Characteristic[]>([]);
	const [ race, setRace ] = useState<string>("");

	const onCardSelect = useCallback((card: Characteristic) => setBoard([...board, card]), [setBoard, board])

	const { racesWithGender, otherRaces } = allRaces;

	const races = [ ...racesWithGender, ...otherRaces ];

	const saveBoard = useCallback(() => setBoards([...boards, board]), [board, boards, setBoards])

	return (
		<div className={styles.wrapper}>
			<Typography variant="h3"> Create Board for level {level} </Typography>

			<Typography variant="h5"> Boards amount: {boards?.length} </Typography>

			<select name='races' value={race} onChange={(e) => setRace(e.target.value)}>
				<option key="empty" value=""/>
				{races.map(race => <option key={race} value={race}>{race}</option>)}
			</select>

			<div className={styles.board}>
				{board && (
					<>
						{board.map(card => <Card key={card.name} {...card} />)}
						<button onClick={saveBoard}>Save board</button>
					</>
				)}
			</div>

			{
				race && <CatGenerator race={race} amount={3} onCardSelect={onCardSelect} />
			}
		</div>
	)
}

export default CreateBoard;
