import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ColorButton = withStyles(theme => ({
  root: {
    backgroundColor: 'rgb(4, 166, 75)',
    marginRight: '1rem',
    '&:hover': {
      backgroundColor: 'rgb(4, 166, 75);',
    },
    height: '2.5rem',
  },
}))(Button);

export default ColorButton;
