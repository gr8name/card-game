import Parameter from './Parameter';
import styles from './styles.module.scss';

export type Characteristic = {
	name: string;
	race: string;
	amount: number;
	attack: number;
	health: number;
	armor: number;
	speed: number;
	agility: number;
	luck: number;
	wisdom: number;
	intelligence: number;
	strength: number;
	charisma: number;
	mana: number;
	
	movePoint: number;
	
	traits?: string[],
	desires?: string[],
	raceBonus?: Partial<Characteristic>
}

type Props = Characteristic & {}

function Card({traits, desires, raceBonus, name, race, health, attack, armor, speed, agility, luck, wisdom, intelligence, strength, charisma, amount, movePoint, mana}: Props) {
	const { amount: raceAmount, armor: raceArmor, agility: raceAgility, wisdom: raceWisdom, speed: raceSpeed  } = raceBonus || {};
	
	return (
		<div className={styles.card}>
			<img
				className={styles.logo}
				alt={name}
				src={`https://robohash.org/set_set4/${name}.png?size=150x150`}
			/>
			<span className={styles.name}>{name}</span>
			<span className={styles.race}>{race}</span>
			
			<span className={styles.traits}>"{traits}"</span>
			<span className={styles.desires}>"{desires}"</span>
			
			<Parameter title='Amount' value={amount} bonus={raceAmount} />
			<Parameter title='Mana' value={mana} />
			<Parameter title='Attack' value={attack} />
			<Parameter title='Health' value={health} />
			<Parameter title='Strength' value={strength} accuracy={1} />
			<Parameter title='Armor' value={armor} bonus={raceArmor} />
			<Parameter title='Speed' value={speed} accuracy={1} bonus={raceSpeed} />
			<Parameter title='Agility' value={agility} accuracy={1} bonus={raceAgility} />
			{/*<Parameter title='Luck' value={luck} accuracy={1}/>*/}
			<Parameter title='Wisdom' value={wisdom} accuracy={1} bonus={raceWisdom}/>
			<Parameter title='Intelligence' value={intelligence} accuracy={1}/>
			{/*<Parameter title='Charisma' value={charisma} accuracy={1}/>*/}

			<hr/>
			{movePoint > 0 && <Parameter title='Move Point' value={movePoint} accuracy={1}/>}
		</div>
	);
}

export default Card;
