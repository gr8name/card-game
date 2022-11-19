import styles from './Card.module.scss';

type Props = {
	name: string;
	health: number;
	armor: number;
	speed: number;
	agility: number;
	luck: number;
	wisdom: number;
	intelligence: number;
	strength: number;
	charisma: number;
}

function Card({name, health, armor, speed, agility, luck, wisdom, intelligence, strength, charisma}: Props) {

	return (
		<div className={styles.card}>
			<img className={styles.logo} alt={name} src={`https://robohash.org/set_set4/${name}.png?size=150x150`}/>
			<span className={styles.health}>Health: {health.toFixed(1)}</span>
			<span className={styles.strength}>Strength: {strength.toFixed(1)}</span>
			<span className={styles.armor}>Armor: {armor > 0 ? armor.toFixed(1) : 0}</span>
			<span className={styles.speed}>Speed: {speed.toFixed(1)}</span>
			<span className={styles.agility}>Agility: {agility.toFixed(1)}</span>
			<span className={styles.luck}>Luck: {luck.toFixed(1)}</span>
			<span className={styles.wisdom}>Wisdom: {wisdom.toFixed(1)}</span>
			<span className={styles.intelligence}>Intelligence: {intelligence.toFixed(1)}</span>
			<span className={styles.charisma}>Charisma: {charisma.toFixed(1)}</span>
		</div>
	);
}

export default Card;
