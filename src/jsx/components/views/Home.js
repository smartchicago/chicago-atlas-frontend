import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import MediaCard from '../ui/MediaCard';
import SearchContainer from '../containers/SearchContainer';
import TopicDropdownContainer from '../containers/TopicDropdownContainer';
import AreaDropdownContainer from '../containers/AreaDropdownContainer';

import * as fetch from '../../actions/fetchActions';

import staticContent from '../../../data/homepage-cards.json';

const Homepage = React.createClass({
  displayName: 'Homepage',

  componentDidMount() {
    this.props.fetchAllPlaces(this.props.places);
    this.props.fetchAllTopics(this.props.topics);
  },

  render() {
    return (
      <div>

        <div className="c-hero">

          <div className="main-layout__inner">

            <h1 className="c-hero__title u-font--serif">
              Chicago Health Atlas
            </h1>

            <p className="c-hero__subtitle">
              Access health data for Chicago and your community
            </p>

            <form className="c-hero__content">

              <p className="u-txt--center u-txt--uppercase u-fw--bold">
                To Get Started, Search by
              </p>

              <div className="grid grid--from-medium">

                <div className="grid__col grid__col--5">

                  <div className="u-relative">
                    <SearchContainer
                      id="topic-search"
                      placeholder="E.g: Vaccinations or Demographics"
                      label="Indicators"
                      dropdown={true}
                      className="c-form-input--has-dropdown"
                    />
                    <TopicDropdownContainer
                      id="topic-search"
                    />
                  </div>

                  <div className="u-txt--center">
                    <Link to={'/indicators'} className="c-hero__link">
                      <b>View All Indicators</b>
                    </Link>
                  </div>
                </div>

                <div className="grid__col grid__col--2 c-hero__conjuction u-font--serif">OR</div>

                <div className="grid__col grid__col--5">

                  <div className="u-relative">
                    <SearchContainer
                      id="area-search"
                      placeholder="E.g: Archer Heights or 60657"
                      label="Community Area / Zip Code"
                      dropdown={true}
                      className="c-form-input--has-dropdown"
                    />
                    <AreaDropdownContainer
                      id="area-search"
                    />
                  </div>

                  <div className="u-txt--center">
                    <Link to={'/community-areas'} className="c-hero__link">
                      <b>View All Community Areas</b>
                    </Link>
                  </div>
                </div>

              </div>

            </form>

          </div>

        </div>

        <div className="main-layout__inner">

          <ul className="grid grid--gutters grid--from-medium u-txt--justify">
            {buildMediaCards(staticContent)}
          </ul>

        </div>

      </div>
    );
  }

});

function buildMediaCards(cards) {
  if (!cards) {
    return null;
  }
  return cards.map((card, i) => {
    return (
      <li key={i} className="grid__col grid__col--4 c-media-card--flex c-media-card--homepage">
        <MediaCard
          title={card.title}
          titleType={'h2'}
          description={card.description}
          linkName={card.link_name}
          linkURL={card.link_url}
        />
      </li>
    );
  });
}

const mapStateToProps = (store, ownProps) => {
  return {
    topics: store.data.topicsList,
    places: store.data.placesList
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchAllPlaces: (placesList) => dispatch(fetch.allPlaces(placesList)),
    fetchAllTopics: (topicsList) => dispatch(fetch.allTopics(topicsList))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage);
