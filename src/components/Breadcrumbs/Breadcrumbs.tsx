import React, { Component } from 'react';

import _ from 'lodash';
import './Breadcrumbs.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

interface IBreadcrumbs {
  goTo(newRoute: string): any;
  params: String[];
  showBreadcrumbs?: boolean;
}

class Breadcrumbs extends Component<IBreadcrumbs> {
  render() {
    const { goTo, showBreadcrumbs, params } = this.props;

    return (
      showBreadcrumbs && (
        <Breadcrumb className="my-breadcrumb">
          {_.map(params, function (value, idx) {
            const isLastElement = idx === params.length - 1;
            return (
              <Breadcrumb.Item
                active={isLastElement}
                onClick={() => {
                  if (!isLastElement) {
                    goTo('/' + value);
                  }
                }}
                key={value}
              >
                {value}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      )
    );
  }
}

const mapStateToProps = (state, props) => {
  const params = _.omitBy(props.match.params, _.isUndefined);
  return {
    showBreadcrumbs: _.size(params) > 1,
    params: _.values(params),
    goTo: props.history.push,
  };
};

export default withRouter(connect(mapStateToProps)(Breadcrumbs));
