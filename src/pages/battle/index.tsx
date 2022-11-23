import React, {useCallback, useContext, useState} from 'react';
import Card, {Characteristic} from '../../components/Card';
import {CardContext, CardContextType} from '../../context/CardContext';
import CatGenerator from '../catGenerator';
import styles from './styles.module.scss';

type Attack = {
	name1: string;
	name2: string;
	result: number;
	remainHealth: number;
}

function getMovePoints(card1: Characteristic, card2: Characteristic): { movePoint1: number, movePoint2: number } {
	let movePoint1 = 0;
	let movePoint2 = 0;
	
	if (card1.speed > card2.speed) {
		movePoint1 = Math.ceil(card1.speed - card2.speed);
		movePoint2 = 1;
	} else if (card1.speed < card2.speed) {
		movePoint2 = Math.ceil(card1.speed - card2.speed);
		movePoint1 = 1;
	} else if (card1.luck >= card2.luck) {
		movePoint1 = 2;
		movePoint2 = 1;
	} else {
		movePoint1 = 1;
		movePoint2 = 2;
	}
	
	if (card1.charisma > card2.charisma) {
		movePoint1 += 1;
	} else {
		movePoint2 += 1;
	}
	
	return { movePoint1, movePoint2 };
}

function Battle() {
	const { player1, setPlayer1, player2, setPlayer2 } = useContext(CardContext) as CardContextType;
	const [attackResult, setAttack] = useState<Attack[]>();
	
	const onCardSelect = useCallback((oponent: Characteristic) => {
		// @ts-ignore
		const [ activeCard ] = player1;
		
		const { movePoint1, movePoint2 } = getMovePoints(activeCard, oponent);
		setPlayer1([{ ...activeCard, movePoint: movePoint1}]);
		setPlayer2([{ ...oponent, movePoint: movePoint2}]);
		
		if (movePoint1 > movePoint2) {
			// @ts-ignore
			attack(player1[0], player2[0]);
		} else {
			// @ts-ignore
			attack(player2[0], player1[0]);
		}
	}, [player1, setPlayer1, player2, setPlayer2]);
	
	const attack = useCallback((card1: Characteristic, card2: Characteristic) => {
		const attack = [];

		let health1 = card1.health;
		let health2 = card2.health;
		let attackAmount = 15;
		
		// let armorDefeated1 = false;
		let armorDefeated2 = false;
		
		while (attackAmount && health1 > 0 && health2 > 0) {
			const at1 = card1.attack * card1.movePoint * 0.2;
			let pl1= at1 * 1.3
			if (at1> card2.armor) {
				armorDefeated2 = true;
				health2 = health2 - at1
			} else {
				health2 = health2 - pl1
			}
			
			console.log( { at1, health2 });
			attack.push({ name1: card1.name, name2: card2.name, result: at1, remainHealth: health2})
			
			const at2 = card2.attack * card2.movePoint * 0.2;
			let pl2 = at2 * 1.3
			if (at2 > card1.armor) {
				health1 = health1 - at2
			} else {
				health1 = health1 - pl2
			}
			
			console.log({at2, health1});
			attack.push({name1: card2.name, name2: card1.name, result: at2, remainHealth: health1});
			
			attackAmount = attackAmount - 1;
		}
		
		
		
		setAttack(attack);
	}, []);
	
	return (
		<div className={styles.container}>
			<h1> Battle </h1>
			<div/>
			<div/>
			{ player1 ? player1.map(card => <Card key={card.name} {...card} />) : <div/> }
			
			<div>
				{ attackResult && (
					attackResult.map((a, i) => <div key={a.result + i}> <span className={player1 && player1[0] && a.name1 === player1[0].name ? styles.name1 : styles.name2}>{a.name1}  </span>  attacks <span className={player1 && player1[0] && a.name2 === player1[0].name ? styles.name1 : styles.name2 } >{a.name2}</span> : {a.result.toFixed()} - Remain health: {a.remainHealth.toFixed()} </div>)
				)}
			</div>
			
			{ player2 ? player2.map(card => <Card key={card.name} {...card} />) :
				<CatGenerator amount={3} onCardSelect={onCardSelect}/> }
		</div>
	)
}

export default Battle;
