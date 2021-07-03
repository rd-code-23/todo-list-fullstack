import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    shadow: {
        '& .MuiPaper-root': {
            margin: '0!important',
            marginBottom: '20px!important',
        },
        '& .MuiDialogContent-root': {
            maxWidth: 220
        }
    },
    googleButton: {
        marginBottom: theme.spacing(2),
    },
    authButton: {
        [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
            fontSize: '12px',
            padding: '7px'
        }
    }
}));

