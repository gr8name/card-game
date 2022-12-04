import {Box} from "@mui/material";
import {red, cyan} from "@mui/material/colors";

export type Attack = {
  name1: string,
  name2: string,
  attacker: string,
  damage: number,
  remainHealth: number
}

type Props = {
  fightLog: Attack[]
}

function Fight({fightLog = []}: Props) {
  return (
    <>
      {
        fightLog.map(({attacker, name1, name2, damage, remainHealth}, i) => (
          <Box key={attacker + i}>
            <Box sx={{ display: 'inline-block', color: attacker === name1 ? red[900] : cyan[900]}}>{attacker}</Box>
            &nbsp;attacks&nbsp;
            <Box sx={{display: 'inline-block', color: attacker === name2 ? red[900] : cyan[900]}}>{attacker === name1 ? name2 : name1 }&nbsp;by&nbsp;{damage.toFixed()}</Box>
            &nbsp;Remain health:&nbsp;{remainHealth.toFixed()}
          </Box>
        ))}
    </>
  )
}

export default Fight;
