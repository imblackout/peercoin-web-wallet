import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: "10px"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>        
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.transaction.address}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.transaction.amount}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.transaction.category}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.transaction.confirmations}
        </Typography>
      </CardContent>
    </Card>
  );
}
