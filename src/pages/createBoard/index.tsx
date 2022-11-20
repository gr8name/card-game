import {allRaces} from 'fantasy-name-generator';
import {useCallback, useState} from 'react';
import Card, {Characteristic} from '../../components/Card';
import CatGenerator from '../catGenerator';
import styles from './styles.module.scss'

function CreateBoard() {
	const [ board, setBoard ] = useState<Characteristic[]>([]);
	const [ race, setRace ] = useState<string>("");
	
	const onCardSelect = useCallback((card: Characteristic) => setBoard([...board, card]), [setBoard, board])
	
	const { racesWithGender, otherRaces } = allRaces;
	
	const races = [ ...racesWithGender, ...otherRaces ];

	return (
		<div className={styles.wrapper}>
			<h1> Create Board </h1>
			
			<select name='races' value={race} onChange={(e) => setRace(e.target.value)}>
				<option key="empty" value=""/>
				{races.map(race => <option key={race} value={race}>{race}</option>)}
			</select>
			
			<div className={styles.board}>
				{board && board.map(card => <Card key={card.name} {...card} />)}
			</div>
			
			{
				race && <CatGenerator race={race} amount={3} onCardSelect={onCardSelect} />
			}
		</div>
	)
}

export default CreateBoard;
