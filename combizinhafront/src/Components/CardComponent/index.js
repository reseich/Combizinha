import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    }

}))


function CardComponent(props) {
    const classes = useStyles();
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    function DialogComponent() {
        const theme = useTheme();
        const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
        return <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            fullScreen={fullScreen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description">
            <DialogTitle  id="alert-dialog-slide-title">{props.card.name}</DialogTitle>
            <DialogContent>
                <Typography>
                    Categoria: {props.card.category}
                </Typography>
                <Typography>
                    Quantidade: {props.card.portions.toLowerCase()}
                </Typography>
                <p/>
                <Typography>
                    Ingredientes
                </Typography>
                {props.card.ingredients.map((it, index) => <Typography key={index}> *   {it} </Typography>)}
                <p/>
                <Typography>
                    Modo de preparo:
                </Typography>
                {props.card.steps.map((it, index) => <Typography key={index}> *   {it} </Typography>)}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    }


    return (
        <div>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom component="h2">
                        {props.card.name}
                    </Typography>
                    <Typography>
                        Categoria: {props.card.category}
                    </Typography>
                    <Typography>
                        Quantidade: {props.card.portions.toLowerCase()}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleClickOpen} color="primary">
                        Abrir
                    </Button>
                </CardActions>
            </Card>
            <DialogComponent/>
        </div>

    )

}

export {CardComponent,}
