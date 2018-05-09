import React from 'react';

import LevelsIcon from './LevelsIcon';
import GenderChart from './GenderChart';
import RaceChart from './charts/RaceChart';
import SimpleBarChart from './charts/SimpleBarChart';

export default (props) => (

  <div className="c-area-info">
    <div className="grid grid--from-medium">

      <div className="u-txt--center grid__col">
        <div className="c-area-info__number">{props.data.total_population.toLocaleString()}</div>
        <p>Total Population</p>
      </div>

      {
        props.coi &&
        <div className="grid__col">
          <LevelsIcon
            icon="fa-child"
            label="Child Opportunity Index"
            level={props.coi}
            indicator="coi"
          />
        </div>
      }

      {
        props.economicHardship &&
        <div className="grid__col">
          <LevelsIcon
            icon="fa-usd"
            label="Economic Hardship"
            level={props.economicHardship}
            indicator="eh"
          />
        </div>
      }

      <div className="grid__col">
        <h3 className="print-only u-txt--center">Gender</h3>
        <GenderChart
          male={props.data.male_percent}
          female={props.data.female_percent}
        />
      </div>

    </div>

    {
      props.race &&
      <div>
        <RaceChart
          title="Race / Ethnicity"
          data={props.race}
        />
      </div>
    }

    <div>
      <SimpleBarChart
        data={props.demo}
        totalPopulation={props.data.total_population.toLocaleString()}
      />
    </div>

  </div>

);
