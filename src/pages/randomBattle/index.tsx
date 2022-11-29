import React, {useCallback, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Characteristic} from '../../components/Card';
import {CardContext, CardContextType} from '../../context/CardContext';
import CatGenerator from '../catGenerator';
import {Typography} from "@mui/material";

function RandomBattle() {
	const navigate = useNavigate();
	const {setPlayer1, setPlayer2} = useContext(CardContext) as CardContextType;

	useEffect(() => {
		setPlayer1();
		setPlayer2();
	})

	const onCardSelect = useCallback((card: Characteristic) => {
		navigate(`/random/${card.name}`);
		setPlayer1([card])
	}, [navigate]);

	return (
		<div>
			<Typography variant="h3"> Random Battle </Typography>
			<CatGenerator onCardSelect={onCardSelect} />
		</div>
	)
}

export default RandomBattle;
