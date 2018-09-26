import React from 'react';
import loopbackRestClient, { authClient } from 'aor-loopback'
import { GET_LIST, GET_MANY, Responsive, Title } from 'react-admin';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Paper, InputLabel, Input, TextField } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import CodeIcon from '@material-ui/icons/Code';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip'

import { translate } from 'react-admin';
const dataProvider = loopbackRestClient(process.env.REACT_APP_API_ENDPOINT)

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    minHeight: 50,
    backgroundColor: theme.palette.background.paper,
  },
  media: {
    height: '18em',
  },
  paper: {
    height: 100,
    width: 500,
    marginBottom: 24,
  },
  textField: {
    marginLeft: 30,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[/[1-9]/, '/', /[1-9]/, /[1-9]/, /[1-9]/,/[1-9]/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

class Createtable extends React.Component {
  constructor() {
    super();
    this.state = {
      subjectlist: [],
    }
  }
// const Welcome = ({ classes, translate }) => (
  state = {
    checked: [0],
    textmask: ' /    ',
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  componentDidMount() {
    const { classes } = this.props;
    dataProvider(GET_LIST, 'subjects', {
      sort: {
        order: 'DESC'
      },
      pagination: {
        page: 1,
        perPage: 100
      },
    })
      .then(response => response.data)
      .then(data => {
        let subjects = data.map((subject) => (        
          <ListItem
          key={subject.id}
          dense
          button
          // onClick={this.handleToggle(subject.id)}
          className={classes.listItem}
        >
          <Checkbox
            // checked={this.state.checked.indexOf(subject.id) !== -1}
            tabIndex={-1}
            disableRipple
            value={subject.id}
          />
          <ListItemText primary={subject.code + '  ' + subject.name} />
        </ListItem>
        ))
        this.setState({subjectlist: subjects});
        console.log('lecturer', this.state.subjectlist)
      })

}


render() {
  const { classes } = this.props;
  const { textmask } = this.state;

  return (
    <Paper>
      <Typography variant='headline' component='h2' style={{ marginLeft: 24, marginTop : 15 }}>
        Create timetable
      </Typography>
      {/* <InputLabel htmlFor="formatted-text-mask-input">Semester </InputLabel>
          <Input
            value={textmask}
            onChange={this.handleChange('textmask')}
            id="formatted-text-mask-input"
            inputComponent={TextMaskCustom}
          /> */}
          <TextField
          id="standard-name"
          label="Semester/Year"
          className={classes.textField}
          onChange={this.handleChange('name')}
          margin="normal"
        />
      <List>
        {this.state.subjectlist}   
      </List>
   </Paper>
  );
}
}
// );

export default withStyles(styles)(Createtable);