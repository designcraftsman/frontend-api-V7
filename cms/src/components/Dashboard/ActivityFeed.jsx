// components/ActivityFeed.js
import React from 'react';

const ActivityFeed = ({ activities }) => {
  return (
    <div className="activity-feed bg-light rounded shadow">
      <h3>Recent Activities</h3>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            <strong>{activity.user}</strong> {activity.action} <span className="activity-time">{activity.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityFeed;
