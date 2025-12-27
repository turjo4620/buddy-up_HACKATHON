import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectResearchCard from './ProjectResearchCard';
import './MyProjectsResearch.css';

const MyProjectsResearch = ({ 
  projects = [], 
  research = [], 
  activeTab, 
  onTabChange, 
  onRefresh 
}) => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'



  const handleViewProject = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleViewResearch = (researchId) => {
    navigate(`/research/${researchId}`);
  };

  const handleViewRequests = (itemId, type) => {
    navigate(`/${type}/${itemId}/requests`);
  };

  const handleViewSuggestions = (itemId, type) => {
    navigate(`/${type}/${itemId}/suggestions`);
  };

  const getStatusColor = (status) => {
    const statusMap = {
      'Looking for members': 'status-open',
      'Open for Collaboration': 'status-open',
      'In Progress': 'status-progress',
      'Ongoing': 'status-progress',
      'Completed': 'status-completed',
      'On Hold': 'status-hold',
      'Cancelled': 'status-cancelled'
    };
    return statusMap[status] || 'status-default';
  };

  const currentData = activeTab === 'projects' ? projects : research;
  const currentType = activeTab === 'projects' ? 'projects' : 'research';

  return (
    <div className="my-projects-research">
      {/* Header */}
      <div className="section-header">
        <div className="header-left">
          <h2 className="section-title">My Projects & Research</h2>
          <p className="section-subtitle">
            Manage your collaborative projects and research initiatives
          </p>
        </div>
        
        <div className="header-actions">
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <span className="view-icon">⊞</span>
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <span className="view-icon">☰</span>
            </button>
          </div>
          
          <button className="refresh-btn" onClick={onRefresh} title="Refresh">
            <span className="refresh-icon">🔄</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => onTabChange('projects')}
        >
          <span className="tab-icon">📋</span>
          <span className="tab-text">My Projects</span>
          <span className="tab-count">{projects.length}</span>
        </button>
        
        <button 
          className={`tab-btn ${activeTab === 'research' ? 'active' : ''}`}
          onClick={() => onTabChange('research')}
        >
          <span className="tab-icon">🔬</span>
          <span className="tab-text">My Research</span>
          <span className="tab-count">{research.length}</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="content-area">
        {currentData.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              {activeTab === 'projects' ? '📋' : '🔬'}
            </div>
            <h3 className="empty-title">
              No {activeTab === 'projects' ? 'projects' : 'research'} yet
            </h3>
            <p className="empty-description">
              {activeTab === 'projects' 
                ? 'Your projects will appear here once you create them from the main navigation.'
                : 'Your research projects will appear here once you create them from the main navigation.'
              }
            </p>
          </div>
        ) : (
          <div className={`items-container ${viewMode}`}>
            {currentData.map((item) => (
              <ProjectResearchCard
                key={item._id}
                item={item}
                type={currentType}
                viewMode={viewMode}
                statusColor={getStatusColor(item.status)}
                onView={activeTab === 'projects' ? handleViewProject : handleViewResearch}
                onViewRequests={handleViewRequests}
                onViewSuggestions={handleViewSuggestions}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProjectsResearch;