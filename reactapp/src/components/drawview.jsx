import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
// import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import red from '@material-ui/core/colors/red';
import Icon from '@material-ui/core/Icon';
// import Button from '@material-ui/core/ListItem';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'right',
    alignItems: 'flex-end',
    flexGrow: 1,
  },
  icon: {
    margin: theme.spacing.unit * 2,
    position:'absolute',
    right:'0px',
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800],
    },
  },
  appFrame: {
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
});

class PersistentDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventlist: [],
      open: false,
      anchor: 'left',
      description: "",
      eventname: "",
      eventdate: "",
      eventimage: ""
    }
  }

  componentWillMount() {
    //console.log('Component WILL MOUNT!')
    var url = 'http://localhost:3008/db/_all_docs?include_docs=true';
    fetch(url)
      .then(function (showlistdetail) {
        //console.log('Request success12: ',showlistdetail);
        return showlistdetail.json();
      })
      .then(function (showlistdetail) {
        console.log('Request success2: ', showlistdetail);
        var showeventfilter = showlistdetail.map((showevent, i, showlistdetail) => {
          return showevent.doc;
        })
        this.setState({ eventlist: showeventfilter });
        //console.log('Request success22: ',showeventfilter);
      }.bind(this))
      .catch(function (error) {
        console.log('Request failure2: ', error);
      });
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value,
    });
  };
  handleClick = even => {
    this.setState({
      description: even.description,
    });
    this.setState({
      eventname: even.eventname,
    });
    this.setState({
      eventdate: even.date,
    });
    this.setState({
      eventimage: even.eventimage,
    });
    this.setState({ open: false });
  }
  handleClickOpen(e) {
    this.props.history.push("/");
  }
  render() {
    const { classes, theme } = this.props;
    const { anchor, open, description, eventname, eventdate, eventimage } = this.state;

    const { handleClick } = this;
    const myData = [].concat(this.state.eventlist)
      .sort((a, b) => a.eventname < b.eventname)

    const drawer = (
      <Drawer variant="persistent" anchor={anchor} open={open} classes={{ paper: classes.drawerPaper, }} >
        <div className={classes.drawerHeader}>
          <p>Event Name</p>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {myData.map(even =>
            <ListItem button onClick={() => handleClick(even)} key={even.length}>{even.eventname}</ListItem>
          )}
        </List>
        <Divider />
      </Drawer>
    );

    let before = null;
    let after = null;

    if (anchor === 'left') {
      before = drawer;
    } else {
      after = drawer;
    }

    return (
      <div className={classes.root}>
        {/* <TextField id="persistent-anchor" select label="Anchor" value={anchor} onChange={this.handleChangeAnchor} margin="normal" variant="display5">
          <MenuItem value="left">left</MenuItem>
          <MenuItem value="right">right</MenuItem>
        </TextField> */}
        <div className={classes.appFrame}>
          <AppBar className={classNames(classes.appBar, { [classes.appBarShift]: open, [classes[`appBarShift-${anchor}`]]: open, })}>
            <Toolbar disableGutters={!open}>
              <IconButton color="inherit" aria-label="open drawer" onClick={this.handleDrawerOpen} className={classNames(classes.menuButton, open && classes.hide)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="display1" color="inherit" noWrap>
                {eventname}
              </Typography>
              <Icon className={classes.icon} onClick={(e)=>{this.handleClickOpen(e)}}>add_circle</Icon>
            </Toolbar>
            {/* <Button  className="addevent" variant="outlined" color="secondary" onClick={(e)=>{this.handleClickOpen(e)}}>+Add Event</Button><br/><br/> */}
          </AppBar>
          {before}
          <main className={classNames(classes.content, classes[`content-${anchor}`], { [classes.contentShift]: open, [classes[`contentShift-${anchor}`]]: open, })} >
            <div className={classes.drawerHeader} />
            <Typography variant="display1">{
              <div class="typoportion">
                <img src={eventimage} alt="eventimage" className="eventshowimg" />
                <h1> EventDate:</h1>
                {eventdate}
                <h1> About The Event:</h1>
                <p className="descriptionstate">{description}</p>
              </div>}
            </Typography>
          </main>
          {after}
        </div>
      </div>
    );
  }
}

PersistentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawer);