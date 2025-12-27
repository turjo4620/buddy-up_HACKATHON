import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectRecommendationModal from './ProjectRecommendationModal';
import './EnhancedMyProjectCard.css';

const EnhancedMyProjectCard = ({ project, joinRequestsCount = 0, onViewDetails }) => {
  const navigate = useNavigate();
  const [showRecommendations, setShowRecommendations] = useState(false);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'looking for members':
        return 'status-active';
      case 'in progress':
        return 'status-progress';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(project);
    } else {
      navigate(`/projects/${project._id}`);
    }
  };

  const handleViewSuggestions = () => {
    setShowRecommendations(true);
  };

  const currentTeamSize = project.members?.length || 1;
  const isTeamFull = currentTeamSize >= project.teamSize;

  return (
    <>
      <div className="enhanced-my-project-card">
        <div className="card-header">
          <div className="project-title-section">
            <h3 className="project-title">{project.title}</h3>
            <div className="project-meta">
              <span className={`status-badge ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <span className="team-size">
                {currentTeamSize}/{project.teamSize} members
              </span>
            </div>
          </div>
          <div className="project-actions">
            <button 
              className="action-button secondary"
              onClick={handleViewDetails}
            >
              View Details
            </button>
          </div>
        </div>

        <div className="card-content">
          <p className="project-description">
            {project.description?.length > 120 
              ? `${project.description.substring(0, 120)}...` 
              : project.description
            }
          </p>

          <div className="skills-section">
            <h4 className="skills-title">Required Skills</h4>
            <div className="skills-list">
              {project.requiredSkills?.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="project-stats">
            <div className="stat-item">
              <span className="stat-icon">📅</span>
              <span className="stat-text">Created {formatDate(project.createdAt)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">👥</span>
              <span className="stat-text">{joinRequestsCount} join requests</span>
            </div>
            {project.category && (
              <div className="stat-item">
                <span className="stat-icon">🏷️</span>
                <span className="stat-text">{project.category}</span>
              </div>
            )}
          </div>
        </div>

        <div className="card-footer">
          <div className="suggestion-section">
            <div className="suggestion-info">
              <span className="suggestion-icon">🤖</span>
              <span className="suggestion-text">
                Get AI-powered teammate recommendations
              </span>
            </div>
            <button 
              className="suggestion-button"
              onClick={handleViewSuggestions}
              disabled={isTeamFull}
            >
              {isTeamFull ? 'Team Complete' : 'View Recommended Profiles'}
            </button>
          </div>
        </div>
      </div>

      <ProjectRecommendationModal
        project={project}
        isOpen={showRecommendations}
        onClose={() => setShowRecommendations(false)}
      />
    </>
  );
};

export default EnhancedMyProjectCard;