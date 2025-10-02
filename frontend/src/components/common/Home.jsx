import React from 'react'
import LatestProduct from './LatestProduct';
import FeatureProduct from './FeatureProduct';

import Section from './Section';
import Layout from './Layout';

const Home = () => {
  return (
  <>
    <Layout>
        <Section/>
        <LatestProduct/>
        <FeatureProduct/> 
    </Layout>
  </>
  )
}

export default Home