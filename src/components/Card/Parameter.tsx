import styles from './styles.module.scss';

type Props = {
	title: string,
	value: number,
	accuracy?: number
	bonus?: number,
}

function Parameter({ title, value, bonus, accuracy } : Props) {
	return (
		<div className={`${styles.parameter}`}>
			<div className={styles.title}> {title} </div>
			
			<div className={styles.value}>{value.toFixed(accuracy)}</div>
			{bonus ? <span className={styles.bonus}> + {bonus} </span> : ''}
		</div>
	);
}

export default Parameter;
