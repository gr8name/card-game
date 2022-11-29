import {Outlet, useLocation} from 'react-router-dom';
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Drawer,
	Divider,
	List,
	ListItemText,
	ListItemButton, Button, Container, ListItemIcon
} from "@mui/material";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import styles from './styles.module.scss';
import Link from "../../components/Link";
// import robot from '../../img/Preview.jpg';

const tabs = [
	{title: 'New Game', link: '/new'},
	{title: 'Create Board', link: '/create-board'},
	{title: 'Random Battle', link: '/random'},
	{title: 'Cat generator', link: '/generator'}
];

function StartPage() {
	let { pathname } = useLocation();
	const [open, setOpen] = useState(true);

	const toggleDrawer = () => setOpen(!open);

	return (
		<>
			<AppBar position="fixed" classes={{ root: `${styles.topBar} ${open ? styles.open : ''}`}}>
				<Toolbar variant="dense">
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={toggleDrawer}
						edge="start"
						sx={{mr: 2, ...(open && {display: 'none'})}}
					>
						<FontAwesomeIcon icon={faBars}/>
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Card game
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				classes={{paper: styles.drawer}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<Button
					classes={{root: styles.toggler}}
					startIcon={<FontAwesomeIcon icon={faChevronLeft}/>}
					onClick={toggleDrawer}
				>
					Close
				</Button>
				<List>
					{tabs.map(({ title, link}, i) => (
						<>
							<ListItemButton component={Link} key={title} href={link} selected={pathname === link}>
									<ListItemIcon classes={{ root: styles.icon }}>
										<FontAwesomeIcon icon={faChevronRight} />
									</ListItemIcon>
								<ListItemText primary={title}/>
							</ListItemButton>
							{ i === 2 && <Divider key="divider" /> }
						</>
					))}
				</List>
			</Drawer>
			<main className={`${styles.content} ${open ? styles.open : ''}`} >
				<Container>
					<Outlet/>
				</Container>
			</main>
		</>
	);
}

export default StartPage;
