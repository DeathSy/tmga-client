import React from 'react';
import PropTypes from 'prop-types';
import { GET_LIST, GET_MANY, Responsive, Title } from 'react-admin';
import loopbackRestClient, { authClient } from 'aor-loopback'
import TimetableEvent from './TimetableEvents'
import { withStyles } from '@material-ui/core/styles';
import { Tabs, Table, TableCell, TableBody, TableRow, TableHead, ListButton } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
const dataProvider = loopbackRestClient(process.env.REACT_APP_API_ENDPOINT)

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const headDay = [
  { id: 1, name: '0830', color: '#f7ff70' },
  { id: 2, name: '0900', color: '#ffc1c8'},
  { id: 3, name: '0930', color: '#adfca1'},
  { id: 4, name: '1000', color: '#ffcc7a'},
  { id: 5, name: '1030', color: '#82b1ff'},
  { id: 6, name: '1100', color: '#82b1ff'},
  { id: 7, name: '1130', color: '#82b1ff'},
  { id: 8, name: '1200', color: '#82b1ff'},
  { id: 9, name: '1230', color: '#82b1ff'},
  { id: 10, name: '1300', color: '#82b1ff'},
]



function TabContainer(props) {
  return (
    <Typography component='div' style={{ padding: 8 * 3, align:"right" }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
  },
  card: {
    minWidth: 275,
    minHeight: 620,
  },
  table: {
    minWidth: 700,
  },
  row :{
    minWidth :700,
  }
});

class TimetableList extends React.Component {
  state = {
    value: 0,
    filter: '1st year',
  };       
  
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    console.log(this.state.filter)
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
        {this.renderSemester}
        <Typography variant='headline' component='h2'  style={{ marginLeft: 24, marginTop : 15 }}>
                Timetable
              </Typography>
        <Tabs
          value={value}
          onChange={this.handleChange}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        >
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label='IT'
          />
        </Tabs>
        {value === 0 && <TabContainer >
          <Grid container className={classes.root} spacing={24}>
            <Grid item xs={12}>
              <Grid container className={classes.demo} justify='flex-start' spacing={40}>
                <Grid item>
                  <Button variant='fab' mini color='primary' style={{margin: 4 }} onClick={() => this.setState({ filter: '1st year' })}> 1 </Button>
                  <Button variant='fab' mini color='primary' style={{margin: 4 }} onClick={() => this.setState({ filter: '2nd year' })}> 2 </Button>
                  <Button variant='fab' mini color='primary' style={{margin: 4 }} onClick={() => this.setState({ filter: '3rd year' })}> 3 </Button>
                  <Button variant='fab' mini color='primary' style={{margin: 4 }} onClick={() => this.setState({ filter: '4th year' })}> 4 </Button>
                </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12}>
              <TimetableEvent year={this.state.filter}  deparment={this.value} />
            </Grid>
          </Grid>
        </TabContainer>}
        </Card>

      </div>
    );
  }
}

TimetableList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimetableList);