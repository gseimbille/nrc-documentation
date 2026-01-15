import clsx from 'clsx';
import Heading from '@theme/Heading';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: (
      <Translate id="homepage.features.setupCollars.title">
        Setup your IoT Collars
      </Translate>
    ),
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <Translate id="homepage.features.setupCollars.desc">
        Power on collars, validate GPS status, and confirm device health before
        deployment.
      </Translate>
    ),
  },
  {
    title: (
      <Translate id="homepage.features.managePerimeters.title">
        Manage Perimeters
      </Translate>
    ),
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <Translate id="homepage.features.managePerimeters.desc">
        Create, edit, and activate quadrilateral perimeters with GeoJSON
        tooling.
      </Translate>
    ),
  },
  {
    title: (
      <Translate id="homepage.features.usersNotifications.title">
        Setup users and notifications
      </Translate>
    ),
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <Translate id="homepage.features.usersNotifications.desc">
        Invite users, reset passwords, and configure alerts for perimeter
        events.
      </Translate>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
