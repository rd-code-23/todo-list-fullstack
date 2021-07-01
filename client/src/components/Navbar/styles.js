import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((mobile) => ({
    welcomeMessage: {
        fontSize: '24px',
        '@media (max-width:720px)': {
            fontSize: '16px',
        }
    },
}));