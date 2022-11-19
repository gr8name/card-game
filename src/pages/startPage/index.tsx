import {Link, Outlet} from 'react-router-dom';
import styles from './styles.module.scss'

function StartPage() {
	const tabs = [
		{ title: 'New Game', link: 'new'},
		{ title: 'Random Battle', link: 'random' },
		{ title: 'Cat generator', link: 'generator' }
	];
	
	return (
		<div className={styles.wrapper}>
			<div>
				<h1>Start Page</h1>
				<ul>
					{tabs.map(({link, title}) => <li key={link}> <Link to={`/${link}`}>{title}</Link> </li>)}
				</ul>
			</div>
			<Outlet/>
		</div>
	);
}

export default StartPage;
