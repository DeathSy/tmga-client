import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import { ShowButton } from 'react-admin'
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Paper, Typography, ListItemIcon} from '@material-ui/core';
import { Link } from 'react-router-dom'
import ReorderIcon from '@material-ui/icons/Reorder'
export const TimetableIcon = ReorderIcon


const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class TimetableList extends React.Component {
  state = {
    list:[],
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  componentDidMount= async () =>{
    const {data} = await axios.get('http://ml.tmga.cf/timetables')
    let semester = data.map((term)=>{
      return (
        <ListItem >
          <ListItemIcon>
            <TimetableIcon />
          </ListItemIcon>
          <ListItemText primary={"Semester:" +term.semester }/>
          <ShowButton basePath='/timetables' record={term.semester}/>
        </ListItem>
      )
    })
    this.setState({list: semester})
  }
  render() {
    const { classes } = this.props;

    return (
      <Paper>
        <Typography variant='headline' component='h2' style={{ marginLeft: 24, marginTop : 15 }}>
           Timetable List
        </Typography>
        <List component="nav">
        {this.state.list}
          </List>
        </Paper>
    );
  }
}

export default withStyles(styles)(TimetableList);