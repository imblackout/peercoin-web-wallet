import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import { ListItemSecondaryAction } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EcoIcon from '@material-ui/icons/Eco';
import Divider from '@material-ui/core/Divider';
import InputIcon from '@material-ui/icons/Input';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  primary: {
      color: 'green'
  },
  send: {
      color: 'red'
  },
  receive: {
      color: 'green'
  },
  stake: {
      color: 'green'
  },
  input: {
      color:'white'
  }
}));

export default function FolderList(props) {
  const classes = useStyles();

  console.info('transaction category');
  console.log(props.transaction.category);

  let amountClass = classes.send;
  if ( props.transaction.category == 'receive' ) {
    amountClass = classes.receive;
  }
  if ( props.transaction.category == 'stake' || props.transaction.category == 'stake-mint') {
    amountClass = classes.stake;
  }

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemText primary="APR" secondary='18' />
        <ListItemAvatar>
          <Avatar>
            <EcoIcon></EcoIcon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText secondary={props.transaction.address} />
        <ListItemSecondaryAction>
            <ListItemText className={amountClass} primary={props.transaction.amount} secondary={props.transaction.confirmations} />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}
