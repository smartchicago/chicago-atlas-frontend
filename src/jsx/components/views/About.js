import React from 'react';
import { connect } from 'react-redux';
import MediaCard from '../ui/MediaCard';

import * as fetch from '../../actions/fetchActions';

const About = React.createClass({
  displayName: 'About',

  componentDidMount() {
    this.props.fetchPartners(this.props.content);
  },

  render() {
    return (
      <div className="v-about">
        <div>
          <h1 className="t-main-title">About</h1>
          <div className="layout--narrow">
            <div className="grid grid--gutters">
              <div className="grid__col">
                <div className="u-fw--light u-txt--justify">
                  <div className="v-about__img-container">
                    {/*
                      <img
                      src={process.env.PUBLIC_URL + '/images/about/smart_chicago_collaborative.png'}
                      alt="Smart Chicago Collaborative"
                    />
                    */}
                  </div>
                  <p className="p">The Smart Chicago Collaborative and the Chicago Department of Public Health believe data should be accurate, transparent and easy to understand. We created the Chicago Health Atlas so that you can review, explore and compare health-related data over time and across communities. In addition, the Chicago Health Atlas provides a place for residents to see our progress implementing Healthy Chicago 2.0, the citywide plan to improve health equity.</p>
                  <p className="p">Our hope is that you will use this data to both better understand health in Chicago and identify opportunities to improve health and well-being.</p>
                  <p className="p">The Chicago Health Atlas is, by design, an evolving tool. Through new partnerships, improved data and continuous updates to the site, we will be better equipped to understand and improve our city&#39;s health. </p>

                </div>
              </div>
              <div className="grid__col v-about__contact-us-box-container">

                <div className="v-about__contact-us-box">
                  <h2 className="v-about__h2 u-font--serif">Contact Us</h2>
                  <p className="v-about__contact-us-p">
                    We are always looking for ways to improve the Chicago Health Atlas. If you have feedback, questions or ideas, please email us at HealthyChicago2.0@cityofchicago.org.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
        <hr className="v-about__hr" />
        <h2 className="t-main-title">Partners</h2>
        <div className="layout--narrow">
          <div className="grid grid--gutters">
            <div className="grid__col">
              <p className="p">This website was developed by the Smart Chicago Collaborative, the Chicago Department of Public Health and Dom & Tom, with generous support from the Otho S.A. Sprague Memorial Institute.</p>
            </div>
          </div>
        </div>
        <div className="main-layout__inner u-txt--justify">

          <ul className="grid grid--from-medium grid--wrap">
            {this.props.content && buildMediaCards(this.props.content)}
          </ul>

        </div>
        <div className="layout--narrow v-about__about-the-data">
          <div className="grid grid--gutters">
            <div className="grid__col">
              <h2 className="v-about__h2 u-font--serif u-font--serif">About the Data</h2>
              <div className="t-columns">
                <p>All of the data on the Chicago Health Atlas has been analyzed and interpreted by the Chicago Department of Public Health Office of Epidemiology from the following sources:</p>

                <ul className="v-about__list-container">
                  <li>
                    • Chicago Department of Public Health
                    <ul>
                      <li>- Office of Epidemiology</li>
                      <li>- HIV/STI Division</li>
                      <li>- Immunization</li>
                      <li>- Communicable Disease </li>
                      <li>- Maternal, Infant, Child and Adolescent Health</li>
                      <li>- Environmental Health</li>
                    </ul>
                  </li>
                  <li>• Chicago Department of Family & Support Services </li>
                  <li>• Chicago Fire Department </li>
                  <li>• Chicago Police Department</li>
                  <li>• Chicago Public Schools</li>
                  <li>• Kirwan Institute for the Study of Race and Ethnicity</li>
                  <li>• Illinois Department of Human Services</li>
                  <li>• Illinois Department of Public Health</li>
                  <li>• Illinois Department of Transportation </li>
                  <li>• US Census Bureau</li>
                  <li>• US Centers for Disease Control and Prevention</li>
                  <li>• US Department of Labor</li>
                </ul>

                <p><small className="v-about__small">
                  Site Disclaimer: This site provides summary data that has been modified for use from its original source. The City of Chicago makes no claims as to the content, accuracy, timeliness, or completeness of any of the data provided at this site. The data provided at this site is subject to change at any time. It is understood that the data provided at this site is being used at one’s own risk.  Data available through this website is for informational and planning purposes only and does not represent an official governmental source.  Official data should be requested directly from the original data source
                </small></p>

                <p><small className="v-about__small">
                  Dataset-Specific Disclaimers: Illinois Department of Public Health (IDPH) Hospital Discharge Data: IDPH specifically disclaims responsibility for any analysis, interpretations, or conclusions. Because the IDPH dataset provides information on hospital inpatient admissions and ED visits and not individual persons, the counts and rates reported may not necessarily reflect rates per person; that is, persons who are hospitalized more than once in a year may be counted more than once. The population counts used in the calculations are estimates, and this potential source of error should be taken into account when considering the precision of the indicators. See http://www.census.gov/geo/ZCTA/zcta.html for specific information on the estimation of ZIP code population counts.
                </small></p>

                <p><small className="v-about__small">
                  Chicago Police Department Crime Data: This data reflects crimes as reported to the police as of year selected, occurring during the selected date range for the selected area. These crimes are based upon preliminary information supplied to the Police Department by the reporting parties and have not all been verified. The preliminary crime classifications may be changed at a later date based upon additional investigation and there is always the possibility of mechanical or human error. Therefore, the Chicago Police Department does not guarantee (either expressed or implied) the accuracy, completeness, timeliness, or correct sequencing of the information and the information should not be used for comparison purposes over time. The summary counts shown on this web site should not be considered as official Chicago Police Department statistics. The Chicago Police Department will not be responsible for any error or omission, or for the use of, or the results obtained from the use of this information. All data visualizations or maps should be considered approximate.
                </small></p>

                <div><small className="v-about__small">
                  Note about zip codes: U.S. Postal Service ZIP Codes are designed to meet the day-to-day operational needs of the U.S. Postal Service and tend to change frequently. To account for this instability, as well as the emergence of new ZIP codes over time and low population estimates in certain ZIP codes (i.e. less than 20,000 residents), the following steps were taken:
                  <br />
                  <ul className="v-about__small-list">
                    <li>▪ Zip Codes 60610 and 60654 were combined</li>
                    <li>▪ Zip Codes 60707 and 60635 were combined</li>
                    <li>▪ Zip Codes 60606, 60607 and 60661 were combined</li>
                    <li>▪ Zip Codes 60601, 60602, 60603, 60604, 60605 and 60611 were combined</li>
                    <li>▪ Zip Codes 60827 and 60633 were combined</li>
                  </ul>
                  The total number of ED visits and total population of ZIP codes 60707, 60638 and 60827 were included, regardless of whether the individual resided within the Chicago city limits.
                </small></div>

                <p><small className="v-about__small">
                  Note about Economic Hardship Index: The Economic Hardship Index provides a relative, multidimensional measure of a community’s socioeconomic conditions.  These conditions affect the way people live and the opportunities available to them; ultimately they impact the health of the individuals in a community.  A community with a high Economic Hardship Index score has poor social and/or economic conditions.  The value of the hardship index is standardized across community areas and zipcodes and are thus comparable to one another. See http://www.rockinst.org/pdf/cities_and_neighborhoods/2004-08-an_update_on_urban_hardship.pdf for more information
                </small></p>

                <div><small className="v-about__small">
                  The Economic Hardship Index is composed of six indicators:
                  <ol className="v-about__small-list">
                    <li>Crowded housing- percentage of housing units with more than one person per room</li>
                    <li>Poverty- percentage of people living below the federal poverty level</li>
                    <li>Unemployment-percentage of people over age 16 who are unemployed</li>
                    <li>Education- percentage of people over age 25 without a high school education</li>
                    <li>Dependency- percentage under age 18 and over age 64</li>
                    <li>Income- per capita income of the community</li>
                  </ol>
                </small></div>

                <div><small className="v-about__small">
                  Note about Child Opportunity Index:
                  <p className="v-about__small-p">The Child Opportunity Index measures community characteristics that influence a child’s health and development.  The lower the score, the fewer the opportunities that are available in a community to help children thrive.</p>
                  <p className="v-about__small-p">The Child Opportunity Index is composed of 19 individual metrics in three primary domains: education (education attainment in the community and availability of education to children), health and environment (access to health services and accessibility healthy spaces), social and economic (socioeconomic factors).  The values of the child opportunity index are standardized across community areas and zipcodes and are thus comparable to one another.  See http://www.diversitydatakids.org/files/CHILDOI/DOCS/DDK_KIRWAN_CHILDOI_METHODS.pdf for more information</p>
                </small></div>
                <a id="about"></a>
                <div><small className="v-about__small">
                  Data Suppression and Reliability:
                  <p className="v-about__small-p">The symbol ‘*’ is used throughout the website to indicate when rates should be interpreted with caution due to small counts or small population denominators which might make the rate unstable when comparing across years.  Data are suppressed and, thus, unavailable when the thresholds for counts, sample size are extremely small  or parameter estimates such as relative standard error or 95% confidence intervals are deemed to be unfit for display.  Protection of an individual’s confidentiality is of paramount importance to this effort and no attempt should be made to identify individuals or households within city community areas and/or zip codes.  Specific guidelines used for flagging and suppressing data vary by indicator and can be found within the downloaded datasheet for each indicator.</p>
                </small></div>

                <div><small className="v-about__small-overflow">
                  For additional inquiries and/or more detailed data requests please send an email to epidatarequests@cityofchicago.org or at https://www.cityofchicago.org/content/dam/city/depts/cdph/statistics_and_reports/EPHIPDataAnalysisRequest2012.pdf
                </small></div>
              </div>
            </div>
          </div>
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
      <li key={i} className="grid__col grid__col--4 c-media-card--flex">
        <MediaCard
          title={card.title}
          titleType={'h2'}
          description={card.description}
          linkName={card.link_name}
          linkURL={card.link_url}
          imgLocal={card.imgLocal}
          imageUrl={card.imageUrl}
          subtitle={card.subtitle}
          imgAlt={card.imgAlt}
          invert={true}
        />
      </li>
    );
  });
}

const mapStateToProps = (store, ownProps) => {
  return {
    content: store.data.partners
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchPartners: (cache) => dispatch(fetch.partners(cache))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
