import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

export default (props) => (
  renderMediaCard(props)
);

function renderMediaCard(props) {
  const TitleType = props.titleType || 'h3';
  var imgSrc = props.imgLocal ? process.env.PUBLIC_URL + '/images/' + props.imgLocal : null;
  imgSrc = props.imgURL || imgSrc;

  return (
    <div className={classNames(props.className, 'c-media-card u-mb--large')}>

      {
        props.imageUrl &&
        <a target="_blank "href={props.imageUrl}>
          {
            (props.imgLocal || props.imgURL) &&
            <img className="c-media-card__img" src={imgSrc} alt={props.imgAlt} />
          }
        </a>
      }

      <TitleType className={classNames('c-media-card__title', { 'u-font--serif': props.invert })}>
        {props.title}
      </TitleType>

      {
        props.subtitle &&
        <p className="c-media-card__subtitle">{props.subtitle}</p>
      }
      <p className={classNames('c-media-card__description', { 'u-font--serif': !props.invert })}>
        {props.description}
      </p>

      {
        props.linkURL && props.linkName &&
        renderLink(props)
      }
    </div>
  );
};

function renderLink(props) {
  if (props.external) {
    return <a className="c-media-card__link" href={props.linkURL}>{props.linkName}</a>;
  } else {
    return <Link className="c-media-card__link" to={props.linkURL}>{props.linkName}</Link>;
  }
}
