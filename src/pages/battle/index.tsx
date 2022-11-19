import React, {useCallback, useContext, useState} from 'react';
import Card, {Characteristic} from '../../components/Card';
import {CardContext, CardContextType} from '../../context/CardContext';
import CatGenerator from '../catGenerator';
import styles from './styles.module.scss';

type Attack = {
	name1: string;
	name2: string;
	result: number;
}

function Battle() {
	const { player1, setPlayer1, player2, setPlayer2 } = useContext(CardContext) as CardContextType;
	const [attackResult, setAttack] = useState<Attack>();
	
	const onCardSelect = useCallback((oponent: Characteristic) => {
		// @ts-ignore
		const [ activeCard ] = player1;
		
		let p1: [Characteristic], p2: [Characteristic];
		
		if(activeCard.speed > oponent.speed) {
			const movePointPlayer1 = Math.ceil(activeCard.speed - oponent.speed);
			p1 = [{...activeCard, movePoint: movePointPlayer1}];
			p2 = [{...oponent, movePoint: 1}];
		}	else if(activeCard.speed < oponent.speed) {
			const movePointPlayer2 = Math.ceil(oponent.speed - activeCard.speed);
			p1 = [{...activeCard, movePoint: 1}];
			p2 = [{...oponent, movePoint: movePointPlayer2}];
		} else if (activeCard.luck >= oponent.luck ) {
			p1 = [{...activeCard, movePoint: 2}];
			p2 = [{...oponent, movePoint: 1}];
		} else {
			p1 = [{...activeCard, movePoint: 1}];
			p2 = [{...oponent, movePoint: 2}];
		}
		
		if(p1[0].charisma > p2[0].charisma) {
			// @ts-ignore
			p1 = [{...p1[0], movePoint: p1[0].movePoint + 1}];
		}	else if(p1[0].charisma < p2[0].charisma) {
			// @ts-ignore
			p2 = [{...p2[0], movePoint: p2[0].movePoint + 1}];
		}
		
		setPlayer1(p1);
		setPlayer2(p2);
		
		attack(p1[0], p2[0]);
	}, [player1, setPlayer1, player2, setPlayer2, ]);
	
	const attack = useCallback((card1: Characteristic, card2: Characteristic) => {
		// @ts-ignore
		if(card1.movePoint > card2.movePoint) {
			// @ts-ignore
			const result = card2.armor - (card1.attack * card1.movePoint);
			setAttack({ name1: card1.name, name2: card2.name, result});
		}
	}, [attackResult]);
	
	return (
		<div className={styles.container}>
			<h1> Battle </h1>
			<div/>
			<div/>
			{ player1 ? player1.map(card => <Card key={card.name} {...card} />) : <div/> }
			{ attackResult ? <div> {attackResult.name1} attacks {attackResult.name2}: {attackResult.result.toFixed()} </div> : <div/>}
			{ player2 ? player2.map(card => <Card key={card.name} {...card} />) :
				<CatGenerator amount={3} onCardSelect={onCardSelect}/> }
		</div>
	)
}

export default Battle;
