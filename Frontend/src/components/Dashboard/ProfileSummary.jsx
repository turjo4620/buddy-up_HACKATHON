import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileSummary.css';

const ProfileSummary = ({ user }) => {
  const navigate = useNavigate();

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const truncateBio = (bio, maxLength = 120) => {
    if (!bio || bio.length <= maxLength) return bio;
    return bio.substring(0, maxLength) + '...';
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const handleViewPublicProfile = () => {
    navigate(`/profile/${user._id}`);
  };

  return (
    <div className="profile-summary">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <span className="avatar-initials">{getUserInitials()}</span>
            )}
          </div>
          <div className="online-indicator"></div>
        </div>
        
        <div className="profile-info">
          <h2 className="profile-name">{user?.name || 'Student Name'}</h2>
          <div className="profile-meta">
            <span className="department">{user?.department || 'Department'}</span>
            <span className="separator">•</span>
            <span className="academic-year">{user?.academicYear || 'Academic Year'}</span>
          </div>
          
          {user?.bio && (
            <p className="profile-bio">
              {truncateBio(user.bio)}
            </p>
          )}
        </div>
      </div>

      {/* Skills Section */}
      {user?.skills && user.skills.length > 0 && (
        <div className="profile-skills">
          <h4 className="skills-title">Skills</h4>
          <div className="skills-list">
            {user.skills.slice(0, 6).map((skill, index) => (
              <span key={index} className="skill-chip">
                {skill}
              </span>
            ))}
            {user.skills.length > 6 && (
              <span className="skill-chip more-skills">
                +{user.skills.length - 6} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Project Interests */}
      {user?.projectInterests && user.projectInterests.length > 0 && (
        <div className="profile-interests">
          <h4 className="interests-title">Project Interests</h4>
          <div className="interests-list">
            {user.projectInterests.slice(0, 4).map((interest, index) => (
              <span key={index} className="interest-tag">
                {interest}
              </span>
            ))}
            {user.projectInterests.length > 4 && (
              <span className="interest-tag more-interests">
                +{user.projectInterests.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="profile-actions">
        <button 
          className="action-btn primary"
          onClick={handleEditProfile}
        >
          <span className="btn-icon">✏️</span>
          Edit Profile
        </button>
        <button 
          className="action-btn secondary"
          onClick={handleViewPublicProfile}
        >
          <span className="btn-icon">👁️</span>
          View Public Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileSummary;