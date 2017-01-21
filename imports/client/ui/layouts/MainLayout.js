import React from 'react';

import Header from '../components/Header';

const MainLayout = ({children}) => (
  <div className="main-layout">
    <Header showAll={this.showAll} />
    { children }
  </div>
);

export default MainLayout;
