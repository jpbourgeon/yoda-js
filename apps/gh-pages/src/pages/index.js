import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

const FeatureList = [
  {
    title: 'Offline-first',
    image: '/img/rts.svg',
    description: (
      <>
        Yoda stores your data in a local instance that works offline on the client, and can replicate to and from other
        instances.
      </>
    )
  },
  {
    title: 'Runs everywhere',
    image: '/img/pwa.svg',
    description: (
      <>
        Yoda's offers different implementations that behave the same on a single instance server, in a serverless
        context or in the browser.
      </>
    )
  },
  {
    title: 'Developer friendly',
    image: '/img/dev.svg',
    description: <>Yoda's API is meant to be familiar and consistent yet powerful and extensible.</>
  }
];

function Feature({ title, image, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center"></div>
      <div className="text--center padding-horiz--md">
        <img src={image} alt={title} style={{ height: '10em' }} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.tagline}`} description={`${siteConfig.tagline}`}>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">
            <img src="/img/logo_white.svg" alt="yoda-js white logo" style={{ height: '3em' }} />
            <br />
            {siteConfig.title}
          </h1>
          <p className="hero__subtitle">
            <strong>Y</strong>our <strong>O</strong>ffline-first <strong>DA</strong>tastore
          </p>
          <div className={styles.buttons}>
            <Link className="button button--secondary button--lg" to="/docs">
              Read the docs
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {FeatureList.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
