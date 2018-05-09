
# Recommendations

## Preload hero image on homepage

To improve loading of background image on homepage add following code inside HTML `head` element. 

``` html
<!-- Preload hints for hero image on homepage -->
<link rel="preload" href="%PUBLIC_URL%/images/hero_g8p453_c_scale,w_360.png" as="image" media="(max-width: 599px)">
<link rel="preload" href="%PUBLIC_URL%/images/hero_g8p453_c_scale,w_825.png" as="image" media="(min-width: 600px) and (max-width: 899px)">
<link rel="preload" href="%PUBLIC_URL%/images/hero_g8p453_c_scale,w_1146.png" as="image" media="(min-width: 900px) and (max-width: 1199px)">
<link rel="preload" href="%PUBLIC_URL%/images/hero_g8p453_c_scale,w_1366.png" as="image" media="(min-width: 1200px)">
```

Best to add it dynamically using JS only on homepage route. Reference: <https://www.w3.org/TR/preload/>.

## Test React code

See [testing](./testing.md)

## Implement GraphQL

Refactor API and front end to levrage [GraphQL](http://graphql.org/) for faster and leaner data fetching.

## Switch to Google Maps

Mapbox proved itself as bad choice for map library inside React app. Google Maps offer better integration with React, equally or more powerful API and better performance optimization (by asynchronously loading smaller chucks of code).

## Develop styleguide

Styleguide is librabry of stand-alone, reusable components and design patterns (fonts, colors...) that can serve to build similar applications or expand existing ones without duplication of work or dillution of original designs. It would also be benefical to implement system for easy theming (changing or colors and fonts) of components using Sass variables.

## Move mocks and static data to API

For easier management all data should be delivered and updated via API.

## Improve on accesibility

Test application using only keyboard and screen reader and fix improve on any accessiblity issues

## Rething UX for resources/ view

Avoid loading all resources for Chicago when landing on `resources/` url from main menu. Design empty onboarding state with instructions for user to select area or zip code.
