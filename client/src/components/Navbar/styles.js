import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    welcomeMessage: {
        fontSize: '24px',
        [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
            fontSize: '16px',
        }
    },
}));