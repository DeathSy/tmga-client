import React from 'react';
import loopbackRestClient, { authClient } from 'aor-loopback'
import { GET_LIST, GET_MANY, Responsive, Title } from 'react-admin';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import CodeIcon from '@material-ui/icons/Code';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip'

import { translate } from 'react-admin';
const dataProvider = loopbackRestClient(process.env.REACT_APP_API_ENDPOINT)
const styles = {
  media: {
    height: '18em',
  },
  paper: {
    height: 100,
    width: 500,
    marginBottom: 24,
  },
};

class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      roomlist: [],
    }
  }
// const Welcome = ({ classes, translate }) => (
   
  componentDidMount() {
    const { classes } = this.props;
    dataProvider(GET_LIST, 'rooms', {
      filter: {
        building: 'SIT Building',
      },
      sort: {
        order: 'DESC'
      },
      pagination: {
        page: 1,
        perPage: 100
      },
    })
      .then(response => response.data)
      .then(reviews => {
        let rooms = reviews.map((room) => (
          <Card className={classes.paper}>
            <CardContent>
              <Typography variant='headline' component='h2'>
                Semester : {room.name}
              </Typography>
            </CardContent>
          </Card>
        ))
        this.setState({roomlist: rooms});
        console.log('state',this.state.roomlist)
      })

}


render() {

  const { classes } = this.props;
  const { spacing } = this.state;

  return (
    this.state.roomlist
        
   
  );
}
}
// );

export default withStyles(styles)(Welcome);