import {
	Avatar, Badge,
	Card as Wrapper,
	CardActions,
	CardContent,
	CardHeader,
	Collapse,
	IconButton,
	Typography
} from "@mui/material";
import Parameter from './Parameter';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDove, faHeart, faTachometerAlt} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import ExpandBtn from "../ExpandBtn/expandBtn";

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
	balanser: number;

	movePoint: number;

	traits?: string[],
	desires?: string[],
	raceBonus?: Partial<Characteristic>
}

type Props = Characteristic & {
	onLikeClick?: () => void,
	minimized?: boolean
}


function Card({onLikeClick, minimized, traits, desires, raceBonus, name, race, health, attack, armor, speed, agility, luck, wisdom, intelligence, strength, charisma, amount, movePoint, mana, balanser}: Props) {
	const [expand, setExpand] = useState(false);

	const toggleExpand = () => setExpand(!expand)

	const { amount: raceAmount, armor: raceArmor, agility: raceAgility, wisdom: raceWisdom, speed: raceSpeed, mana:raceMana } = raceBonus || {};

	return (
		<Wrapper>
			<CardHeader
				avatar={<Avatar alt={name} variant="rounded" sx={{height: 50, width: 50}} src={`https://robohash.org/set_set4/${name}.png`}/>}
				title={name}
				subheader={race}
				action={minimized && <ExpandBtn onClick={toggleExpand} expand={expand}/>}
			/>
			<CardContent sx={{height: 110, display: minimized ? 'none' : ''}}>
				<Typography variant="caption" align="justify">
					{traits}
					<br/>
					{desires}
				</Typography>
			</CardContent>
			<CardActions sx={{ display: "grid", gridTemplateAreas: `"left center right"`, gridTemplateColumns: 'repeat(3, 1fr)' }}>
				{onLikeClick ? (
					<IconButton sx={{ gridArea: 'left' }} aria-label="add to favorites" onClick={onLikeClick}>
						<FontAwesomeIcon icon={faHeart} />
					</IconButton>
				) : <div />}


				<IconButton sx={{gridArea: 'center'}}>
					<Badge badgeContent={speed.toFixed(1)} color="primary">
						<FontAwesomeIcon icon={faTachometerAlt}/>
					</Badge>
				</IconButton>

				{
					movePoint > 0 && (
						<IconButton sx={{gridArea: 'right'}}>
							<Badge sx={{gridArea: 'center'}} badgeContent={movePoint.toFixed()} color="primary">
								<FontAwesomeIcon icon={faDove}/>
							</Badge>
						</IconButton>
				)}
				{!minimized && <ExpandBtn sx={{gridArea: 'right'}} onClick={toggleExpand} expand={expand}/> }
			</CardActions>
			<Collapse in={expand} timeout="auto" unmountOnExit>
				<CardContent>
					<Grid container xs={12} spacing={1} >
						<Parameter title='Amount' value={amount} bonus={raceAmount} />
						<Parameter title='Mana' value={mana} bonus={raceMana} />
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
						<Parameter title='Balanser' value={balanser} accuracy={1} />
						{movePoint > 0 && <Parameter title='Move Point' value={movePoint} accuracy={1}/>}
					</Grid>
				</CardContent>
			</Collapse>
		</Wrapper>
	);
}

export default Card;
