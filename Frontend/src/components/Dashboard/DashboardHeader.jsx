import React from 'react';
import './DashboardHeader.css';

const DashboardHeader = ({ user }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getFirstName = () => {
    return user?.name?.split(' ')[0] || 'Student';
  };

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="dashboard-header">
      <div className="dashboard-header-content">
        <div className="welcome-section">
          <h1 className="welcome-title">
            {getGreeting()}, {getFirstName()}! 👋
          </h1>
          <p className="welcome-subtitle">
            Ready to collaborate and build amazing projects together?
          </p>
        </div>
      </div>
      
      {/* Compact User Details Section */}
      <div className="signed-in-user-details">
        <div className="user-details-content">
          <div className="user-avatar-small">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <span className="avatar-initials-small">{getUserInitials()}</span>
            )}
            <div className="online-indicator-small"></div>
          </div>
          
          <div className="user-info-inline">
            <span className="user-name-inline">{user?.name || 'Student Name'}</span>
            <span className="user-meta-separator">·</span>
            <span className="user-department-inline">{user?.department || 'Department'}</span>
            <span className="user-meta-separator">·</span>
            <span className="user-year-inline">{user?.academicYear || 'Academic Year'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;