import React, { Component } from 'react'
import { GET_LIST, GET_MANY, Responsive, Title } from 'react-admin';
import Card from '@material-ui/core/Card'
import DollarIcon from '@material-ui/icons/AttachMoney'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import loopbackRestClient from 'aor-loopback'
import CardIcon from './CardIcon'

const dataProvider = loopbackRestClient(process.env.REACT_APP_API_ENDPOINT)

const styles = {
  main: {
    flex: '1',
    marginRight: '1em',
    marginTop: 20,
  },
  card: {
    overflow: 'inherit',
    textAlign: 'right',
    padding: 16,
    minHeight: 52,
  },
};

class Subject extends React.Component {
  constructor(){
    super();
    this.state={

    }
  }
  componentDidMount = async () => {
    
    dataProvider(GET_LIST,'Subjects', {
      pagination: { page: 1, perPage: 500 },
      sort: { order: 'ASC' },
    }).then(response =>response.total)
    .then(subjects => {
      let subjectCount = subjects;
      this.setState({subjectCount})
    });
  }
  render(){
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <Card className={classes.card}>
          <Typography className={classes.title} color='textSecondary'>
            All Subjects
          </Typography>
          <Typography variant='headline' component='h2'>
            {this.state.subjectCount} 
          </Typography>
        </Card>
      </div>

    )
  }
}

export default withStyles(styles)(Subject)