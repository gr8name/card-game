import {allRaces} from 'fantasy-name-generator';
import React, {useCallback, useContext, useState} from 'react';
import Card, {Characteristic} from '../../components/Card';
import {UserContext, UserContextType} from '../../context/UserContext';
import CatGenerator from '../catGenerator';
import {Button, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

function CreateBoard() {
	const { level, boards = [], setBoards} = useContext(UserContext) as UserContextType;
	const [ board, setBoard ] = useState<Characteristic[]>([]);
	const [ race, setRace ] = useState<string>("");

	const onCardSelect = useCallback((card: Characteristic) => setBoard([...board, card]), [setBoard, board])

	const { racesWithGender, otherRaces } = allRaces;

	const races = [ ...racesWithGender, ...otherRaces ];

	const saveBoard = useCallback(() => setBoards([...boards, board]), [board, boards, setBoards])

	return (
		<Grid container xs={12} spacing={2}>
			<Grid xs={12}>
				<Typography variant="h3"> Create Board for level {level} </Typography>
			</Grid>
			<Grid xs={8} sm={10}>
				<Typography variant="h5"> Boards amount: {boards?.length} </Typography>
			</Grid>
			<Grid xs={4} sm={2}>
				<Button variant="contained" color="success" onClick={saveBoard}>Save board</Button>
			</Grid>

			<Grid xs={12}>
				<FormControl fullWidth>
					<InputLabel id="raceLabel" color="success">Select race</InputLabel>
					<Select
						label="Select race"
						labelId="raceLabel"
						id="race"
						value={race}
						onChange={(e) => setRace(e.target.value)}
						color="success"
					>
						{ races.map(race => <MenuItem key={race} value={race}>{race}</MenuItem>) }
					</Select>
				</FormControl>
			</Grid>

			<Grid xs={12}>
				{board && board.map(card => <Card key={card.name} {...card} />)}
			</Grid>

			<Grid xs={12}>
				{race && <CatGenerator race={race} amount={3} onCardSelect={onCardSelect}/>}
			</Grid>
		</Grid>
	)
}

export default CreateBoard;
