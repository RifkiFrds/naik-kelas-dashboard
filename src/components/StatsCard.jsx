import React from 'react';

const StatCards = () => {
  return (
    <div className="stats shadow w-full">
      <div className="stat">
        <div className="stat-title">Total Users</div>
        <div className="stat-value">4,200</div>
        <div className="stat-desc">↗︎ 400 (22%)</div>
      </div>
      <div className="stat">
        <div className="stat-title">Total Careers</div>
        <div className="stat-value">15</div>
        <div className="stat-desc">3 new jobs added</div>
      </div>
      <div className="stat">
        <div className="stat-title">Partnerships</div>
        <div className="stat-value">52</div>
        <div className="stat-desc text-secondary">5 inactive partners</div>
      </div>
    </div>
  );
};

export default StatCards;