
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia, Typography, Button, CardContent, CardActions, ButtonBase } from '@material-ui/core';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  main: {
    position: 'relative',
    height: 200,
      backgroundColor: theme.palette.primary.main,
      overflow:'hidden',
      margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit + 6}px`,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $overlay': {
        opacity: 0.15,
      },
      '& $stripeBottom': {
        opacity: .2,
      },
      '& $stripeTop': {
        opacity: .2,
      },
      '& $buttonText': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
    overflow:'hidden',
  },
  // imageSrc: {
  //   position: 'absolute',
  //   left: 0,
  //   right: 0,
  //   top: 0,
  //   bottom: 0,
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center 40%',
  //   backgroundColor: theme.palette.primary.main,
  // },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  buttonText: {
    textAlign: 'center',
    maxWidth:'80%',
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  stripeBottom: {
    height: 40,
    width: 200,
    opacity: 0.8,
    position: 'absolute',
    bottom: 0,
    right:-50,
    transform: 'rotate(-45deg)',
    transition: theme.transitions.create('opacity'),
  },
  stripeTop: {
    height: 20,
    width: 200,
    opacity: 0.8,
    position: 'absolute',
    top: 0,
    left:-60,
    transform: 'rotate(-45deg)',
    transition: theme.transitions.create('opacity'),
  },
});
const ClubButton = (props) => {
    let {classes} = props
    return (
      <ButtonBase
        component={props.component}
        to={props.to}
        focusRipple
        key={1}
        className={classes.main}
        focusVisibleClassName={classes.focusVisible}
        style={{
          width: 300,
          height:200,
          backgroundColor: props.color,
        }}
      >
      {/* <span className={classes.imageSrc} /> */}
      <span className={classes.overlay} />
      <span className={classes.stripeBottom} 
        style={{
          backgroundColor: props.stripe,
        }}
      />
      <span className={classes.stripeTop}  
        style={{
          backgroundColor: props.stripe,
        }}
      />
      
      <span className={classes.imageButton}>
        <Typography
          component="span"
          variant="subheading"
          color="inherit"
          className={classes.buttonText}
        >
          {props.text}
        </Typography>
      </span>
    </ButtonBase>
    );
};

export default withStyles(styles)(ClubButton);