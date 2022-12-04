import React, {useCallback, useContext, useState} from 'react';
import Card, {Characteristic} from '../../components/Card';
import {CardContext, CardContextType} from '../../context/CardContext';
import CatGenerator from '../catGenerator';
import styles from './styles.module.scss';
import {Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

type Attack = {
	name1: string;
	name2: string;
	result: number;
	remainHealth: number;
}

function getMovePoints(card1: Characteristic, card2: Characteristic): { movePoint1: number, movePoint2: number } {
	let movePoint1;
	let movePoint2;

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

	const attack = useCallback((card1: Characteristic, card2: Characteristic) => {
		const attack = [];

		let health1 = card1.health;
		let health2 = card2.health;
		let attackAmount = 15;

		// let armorDefeated1 = false;
		// let armorDefeated2 = false;

		while (attackAmount && health1 > 0 && health2 > 0) {
			const at1 = card1.attack * card1.movePoint * 0.2;
			let pl1 = at1 * 1.3
			if (at1 > card2.armor) {
				// armorDefeated2 = true;
				health2 = health2 - at1
			} else {
				health2 = health2 - pl1
			}

			attack.push({name1: card1.name, name2: card2.name, result: at1, remainHealth: health2})

			if (health2 > 0) {
				const at2 = card2.attack * card2.movePoint * 0.2;
				let pl2 = at2 * 1.3
				if (at2 > card1.armor) {
					health1 = health1 - at2
				} else {
					health1 = health1 - pl2
				}

				attack.push({name1: card2.name, name2: card1.name, result: at2, remainHealth: health1});
			}

			attackAmount = attackAmount - 1;
		}

		setAttack(attack);
	}, []);

	const onCardSelect = useCallback((oponent: Characteristic) => {
		// @ts-ignore
		const [ activeCard ] = player1;

		const { movePoint1, movePoint2 } = getMovePoints(activeCard, oponent);

		const p1: Characteristic[] = [{...activeCard, movePoint: movePoint1}];
		const p2: Characteristic[] = [{...oponent, movePoint: movePoint2}];
		setPlayer1(p1);
		setPlayer2(p2);

		if (movePoint1 > movePoint2) {
			attack(p1[0], p2[0]);
		} else {
			// @ts-ignore
			attack(p2[0], p1[0]);
		}
	}, [attack, player1, setPlayer1, setPlayer2]);

	return (
		<Grid container xs={12} spacing={2}>
			<Grid xs={12}>
				<Typography variant="h3" gutterBottom>Battle</Typography>
			</Grid>

			{ player1 && (
				<Grid xs={4}>
					{player1.map(card => <Card key={card.name} {...card} />) }
				</Grid>
			)}

			<Grid xs={4}>
				{ attackResult && attackResult.map((a, i) => (
					<div key={a.result + i}>
						<span className={player1 && player1[0] && a.name1 === player1[0].name ? styles.name1 : styles.name2}>
							{a.name1}
						</span>

						attacks
						<span className={player1 && player1[0] && a.name2 === player1[0].name ? styles.name1 : styles.name2 }>
							{a.name2}
						</span>
						: {a.result.toFixed()}
						- Remain health: {a.remainHealth.toFixed()}
					</div>
				))}
			</Grid>

			{ player2 ? (
					<Grid xs={4}>
						{player2.map(card => <Card key={card.name} {...card} />)}
					</Grid>
				) :
				<Grid xs={player1 ? 4 : 12}><CatGenerator amount={3} onCardSelect={onCardSelect} columns={player1 && 12}/> </Grid>
			}
		</Grid>
	)
}

export default Battle;
