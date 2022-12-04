import Grid from "@mui/material/Unstable_Grid2";
import {Typography} from "@mui/material";

type Props = {
	title: string,
	value: number,
	accuracy?: number
	bonus?: number,
}

function Parameter({ title, value, bonus, accuracy } : Props) {
	return (
		<>
			<Grid xs={6} sm={3}> <Typography variant="caption" color="primary"> {title} </Typography></Grid>
			<Grid xs={6} sm={3}>
				<Typography variant="body1" component="span" color="secondary"> {value.toFixed(accuracy)} </Typography>
				{bonus ? <Typography variant="caption" color="info">+{bonus.toFixed(accuracy)}</Typography> : ''}
			</Grid>
		</>
	);
}

export default Parameter;
