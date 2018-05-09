import React from 'react';

import SimpleTable from './SimpleTable';

import SaveWidget from '../SaveWidget';
import Header from '../HospitalHeader';

import util from '../../../utils';

export default (props) => (

  <div className="layout--narrow">

    {
      props.meta.doc_embed_url &&
      <div className="print-section" id="service-area">
        <Header title="Demographic & Population Health Data by Service Area">
          <SaveWidget
            className="u-float--right"
            section={'service-area'}
            api={'https://chicagohealth.herokuapp.com/apidoc'}
          />
        </Header>
        <iframe src={props.meta.doc_embed_url} className="v-hospital__iframe" />
      </div>
    }

    <div className="print-section is-printable" id="admission">
      <Header title="Inpatient Hospital Admissions">
        <SaveWidget
          className="u-float--right"
          section={'admission'}
          api={'https://chicagohealth.herokuapp.com/apidoc'}
        />
      </Header>

      <div className="grid grid--gutters grid--wide">
        <div className="grid__col grid__col--6">
          <SimpleTable
            data={mapTableData(props.data, [{name: 'by Service Category', key: 'admissions_by_type'}, {name: 'by Race', key: 'admissions_by_race'}])}
            headings={['Year: ' + getYear(props.data.admissions_by_race.end_date), 'Weighted Number']}
            collapsed={props.collapsed}
            toggleGroup={props.toggleGroup}
          />
        </div>

        <div className="grid__col grid__col--6">
          <SimpleTable
            data={mapTableData(props.data, [{name: 'by Ethnicity', key: 'admissions_by_ethnicity'}, {name: 'Medical-Surgical by Age', key: 'admissions_by_age'}])}
            headings={['Year: ' + getYear(props.data.admissions_by_ethnicity.end_date), 'Weighted Number']}
            collapsed={props.collapsed}
            toggleGroup={props.toggleGroup}
          />
        </div>
      </div>
    </div>

    <div className="print-section" id="revenue">
      <Header title="Hospital Finances">
        <SaveWidget
          className="u-float--right"
          section={'revenue'}
          api={'https://chicagohealth.herokuapp.com/apidoc'}
        />
      </Header>

      <div className="grid grid--center">

        <div className="grid__col grid__col--9 u-center">
          <div className="table--responsive">
            <SimpleTable
              collapsed={props.collapsed}
              toggleGroup={props.toggleGroup}
              data={mapFinance(props)}
              headings={['Year: ' + getYear(props.data.revenue_inpatient.end_date), 'Inpatient', 'Outpatient']}
            />
          </div>
        </div>

      </div>
    </div>

  </div>
);

/* finance */

function mapFinance(props) {
  return [{
    name: 'Finance Summary',
    id: util.slugify('Finance Summary'),
    rows: [
      ['Total revenue', '$' + props.data.finance_data.inpatient_total.toLocaleString(), '$' + props.data.finance_data.outpatient_total.toLocaleString()],
      ['Total Cost of Charity Care', '$' + props.data.finance_data.inpatient_cc.toLocaleString(), '$' + props.data.finance_data.outpatient_cc.toLocaleString()]
    ]
  }, {
    name: 'Revenue by Source',
    id: util.slugify('Revenue by Source'),
    rows: mapsFinanceRows(props.data.revenue_inpatient, props.data.revenue_outpatient)
  }];
}

function mapsFinanceRows(inpatient, outpatient) {
  return inpatient.stats.map((val, i) => {
    return [
      val,
      inpatient.values[i].toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      outpatient.values[i].toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    ];
  });
}

/* admissions */

function mapTableData(data, groups) {

  return groups.map(v => {
    return {
      name: v.name,
      id: util.slugify(v.name),
      rows: mapValues(data[v.key])
    };
  });
}

function mapValues(data) {
  return data.stats.map((v, i) => {
    return {
      data: [
        v, data.values[i]
      ]
    };
  });
}

function getYear(timestamp) {
  const date = new Date(timestamp);
  return date.getFullYear();
}
