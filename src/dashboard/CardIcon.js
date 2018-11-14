import React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    card: {
        float: 'left',
        margin: '-20px 20px 0 40px',
        zIndex: 100,
        borderRadius: 3,
    },
    icon: {
        float: 'right',
        width: 54,
        height: 54,
        padding: 14,
        color: '#fff',
    },
};

const CardIcon = ({ Icon, classes, bgColor }) => (
    <div className={classes.card} style={{ backgroundColor: bgColor }}>
        <Icon className={classes.icon} />
    </div>
);

export default withStyles(styles)(CardIcon);