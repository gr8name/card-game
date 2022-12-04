import {IconButton, SxProps, Theme} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";

type Props = {
  onClick: () => void,
  expand: boolean,
  sx?: SxProps<Theme>
}

function ExpandBtn({onClick, expand, sx}: Props) {
  return <IconButton
    onClick={onClick}
    aria-label="show details"
    sx={{
      transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
      transition: "transform 0.5s",
      ...sx
    }}
  >
    <FontAwesomeIcon icon={faChevronDown}/>
  </IconButton>;
}

export default ExpandBtn;
