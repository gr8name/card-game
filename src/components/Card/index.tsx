import styles from './styles.module.scss';

export type Characteristic = {
	name: string;
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
	
	movePoint: number;
}

type Props = Characteristic & {}

function Card({name, health, attack, armor, speed, agility, luck, wisdom, intelligence, strength, charisma, amount, movePoint}: Props) {

	return (
		<div className={styles.card}>
			<img className={styles.logo} alt={name} src={`https://robohash.org/set_set4/${name}.png?size=150x150`}/>
			<span className={styles.name}>{name}</span>
			<span className={styles.amount}>Amount: {amount.toFixed()}</span>
			<span className={styles.attack}>Attack: {attack.toFixed()}</span>
			<span className={styles.health}>Health: {health.toFixed(1)}</span>
			<span className={styles.strength}>Strength: {strength.toFixed(1)}</span>
			<span className={styles.armor}>Armor: {armor > 0 ? armor.toFixed(1) : 0}</span>
			<span className={styles.speed}>Speed: {speed.toFixed(1)}</span>
			<span className={styles.agility}>Agility: {agility.toFixed(1)}</span>
			<span className={styles.luck}>Luck: {luck.toFixed(1)}</span>
			<span className={styles.wisdom}>Wisdom: {wisdom.toFixed(1)}</span>
			<span className={styles.intelligence}>Intelligence: {intelligence.toFixed(1)}</span>
			<span className={styles.charisma}>Charisma: {charisma.toFixed(1)}</span>
			<hr/>
			{ movePoint && <span className={styles.movePoint}>Move Point: {movePoint.toFixed(1)}</span> }
		</div>
	);
}

export default Card;
