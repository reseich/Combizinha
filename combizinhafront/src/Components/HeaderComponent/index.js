import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: '#282c34',
        height: '150px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
    }

}))

function HeaderComponent() {
    const classes = useStyles();
    return (<AppBar position={"static"} className={classes.header}>
        <Toolbar>
            <Typography variant='h3' noWrap>
                Combizinha
            </Typography>
        </Toolbar>
    </AppBar>);
}

export default HeaderComponent