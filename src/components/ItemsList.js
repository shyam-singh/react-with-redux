import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import CircularProgress from '@material-ui/core/CircularProgress';

import { itemsFetchData } from '../actions/items';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {},
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

class ItemsList extends Component {
    componentDidMount() {
        this.props.fetchData('http://api.tvmaze.com/shows');
    }

    render() {
        const { classes } = this.props;

        if (this.props.hasError) {
            return (
                <p>Sorry! There was an error loading the items</p>
            );
        }

        if (this.props.isLoading) {
            return (
                <CircularProgress />
            );
        }
        return (
            <div className={classes.root}>
                <GridList cellHeight={360} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div">Shows</ListSubheader>
                    </GridListTile>
                    {this.props.items.map((item) => (
                        <GridListTile key={item.id}>
                            <img src={item.image.original} alt={item.name} />
                            <GridListTileBar
                                title={item.name}
                                subtitle={<div><span>Rating: {item.rating.average}</span><br /><span>Premiered: {item.premiered}</span></div>}
                                actionIcon={
                                    <IconButton className={classes.icon}>
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}

ItemsList.propTypes = {
    classes: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    hasError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasError: state.itemsHaveError,
        isLoading: state.itemsAreLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ItemsList));