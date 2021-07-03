import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        type: 'dark'
    },
    breakpoints: {
        values: {
            mobile: 720,
            laptop: 1024,
            desktop: 1280,
        },
    }
})