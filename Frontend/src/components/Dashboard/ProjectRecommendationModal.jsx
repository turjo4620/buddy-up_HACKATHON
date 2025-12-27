import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getSuggestedTeammates } from '../../api/api';
import './ProjectRecommendationModal.css';

const ProjectRecommendationModal = ({ project, isOpen, onClose }) => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && project) {
      fetchRecommendations();
    }
  }, [isOpen, project]);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getSuggestedTeammates(project._id);
      setRecommendations(response.data || []);
    } catch (err) {
      setError('Failed to load recommendations');
      console.error('Error fetching recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateMatchPercentage = (matchingSkills, requiredSkills) => {
    if (!requiredSkills || requiredSkills.length === 0) return 0;
    return Math.round((matchingSkills.length / requiredSkills.length) * 100);
  };

  const generateRecommendationReason = (profile, matchingSkills, matchPercentage) => {
    const skillsText = matchingSkills.length > 0 
      ? matchingSkills.slice(0, 3).join(', ') + (matchingSkills.length > 3 ? ' and more' : '')
      : 'complementary skills';
    
    if (matchPercentage >= 80) {
      return `Excellent match! This user has ${skillsText} skills required for your project.`;
    } else if (matchPercentage >= 60) {
      return `Good match! This user has ${skillsText} skills that align with your project needs.`;
    } else if (matchPercentage >= 40) {
      return `Potential match! This user has ${skillsText} and could contribute valuable expertise.`;
    } else {
      return `This user brings ${skillsText} and diverse experience that could benefit your project.`;
    }
  };

  const handleViewProfile = (profileId) => {
    // TODO: Navigate to profile page or open profile modal
    console.log('View profile:', profileId);
  };

  const handleSendRequest = (profileId) => {
    // TODO: Send collaboration request
    console.log('Send collaboration request to:', profileId);
  };

  if (!isOpen) return null;

  return (
    <div className="recommendation-modal-overlay" onClick={onClose}>
      <div className="recommendation-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-section">
            <h2>Recommended Profiles</h2>
            <p className="project-title">For: {project?.title}</p>
          </div>
          <button className="close-button" onClick={onClose}>
            <span>&times;</span>
          </button>
        </div>

        <div className="modal-content">
          {loading && (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Finding the best collaborators for your project...</p>
            </div>
          )}

          {error && (
            <div className="error-state">
              <p>{error}</p>
              <button onClick={fetchRecommendations} className="retry-button">
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && recommendations.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No Recommendations Found</h3>
              <p>We couldn't find any profiles matching your project requirements at the moment.</p>
            </div>
          )}

          {!loading && recommendations.length > 0 && (
            <div className="recommendations-list">
              <div className="recommendations-header">
                <h3>Top {recommendations.length} Recommended Profiles</h3>
                <p>Based on skill matching and academic alignment</p>
              </div>

              {recommendations.map((recommendation, index) => {
                const { student, matchingSkills = [], skillOverlapCount = 0 } = recommendation;
                const matchPercentage = calculateMatchPercentage(matchingSkills, project.requiredSkills);
                const reason = generateRecommendationReason(student, matchingSkills, matchPercentage);

                return (
                  <div key={student._id} className="recommendation-card">
                    <div className="card-header">
                      <div className="profile-info">
                        <div className="avatar">
                          {student.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div className="profile-details">
                          <h4 className="profile-name">{student.name}</h4>
                          <p className="profile-meta">
                            {student.department} • {student.academicYear}
                          </p>
                        </div>
                      </div>
                      <div className="match-score">
                        <div className={`match-percentage ${matchPercentage >= 80 ? 'excellent' : matchPercentage >= 60 ? 'good' : matchPercentage >= 40 ? 'fair' : 'potential'}`}>
                          {matchPercentage}%
                        </div>
                        {index < 3 && (
                          <div className="rank-badge">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="skills-section">
                      <div className="skills-list">
                        {student.skills?.map((skill, skillIndex) => {
                          const isMatching = matchingSkills.includes(skill);
                          return (
                            <span 
                              key={skillIndex} 
                              className={`skill-tag ${isMatching ? 'matching' : 'additional'}`}
                            >
                              {skill}
                              {isMatching && <span className="match-indicator">✓</span>}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="recommendation-reason">
                      <p>{reason}</p>
                    </div>

                    <div className="card-actions">
                      <button 
                        className="action-button secondary"
                        onClick={() => handleViewProfile(student._id)}
                      >
                        View Profile
                      </button>
                      <button 
                        className="action-button primary"
                        onClick={() => handleSendRequest(student._id)}
                      >
                        Send Collaboration Request
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectRecommendationModal;