import React from 'react';
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Link from "@material-ui/core/Link";


const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: '#f8f7fa',
        padding: theme.spacing(6),
    },

}))

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Combizinha
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function FooterComponent() {
    const classes = useStyles();
    return (<footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
            Combizinha
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Desenvolvido por Rafael Eich
        </Typography>
        <Copyright />
    </footer>);
}

export default FooterComponent