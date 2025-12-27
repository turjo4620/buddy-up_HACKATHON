import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import EnhancedMyProjectCard from '../components/Dashboard/EnhancedMyProjectCard';
import { getProjectsByOwner } from '../api/api';
import './RecommendationDemo.css';

const RecommendationDemo = () => {
  const { user, isAuthenticated } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserProjects();
    }
  }, [isAuthenticated, user]);

  const fetchUserProjects = async () => {
    try {
      setLoading(true);
      const response = await getProjectsByOwner(user._id);
      setProjects(response.data || []);
    } catch (err) {
      setError('Failed to load projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const seedDatabase = async () => {
    try {
      // Use API configuration instead of hardcoded URL
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/seed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        alert('Database seeded successfully! You can now test the recommendation feature.');
        window.location.reload();
      } else {
        alert('Failed to seed database. Please check the console.');
      }
    } catch (error) {
      console.error('Seeding error:', error);
      alert('Failed to seed database. Please ensure the backend is running.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="recommendation-demo">
        <div className="demo-container">
          <div className="auth-required">
            <h2>Authentication Required</h2>
            <p>Please log in to view the recommendation demo.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendation-demo">
      <div className="demo-container">
        <div className="demo-header">
          <h1>🤖 AI-Powered Profile Recommendations</h1>
          <p className="demo-subtitle">
            Experience BuddyUp's intelligent teammate matching system
          </p>
          
          <div className="demo-features">
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <span>Skill-based matching</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <span>Match percentages</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💡</span>
              <span>AI explanations</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🏆</span>
              <span>Top 10 recommendations</span>
            </div>
          </div>
        </div>

        <div className="demo-instructions">
          <h3>How to Test the Feature</h3>
          <ol>
            <li>Click "Seed Database" to populate with sample data (if needed)</li>
            <li>View your projects below</li>
            <li>Click "View Recommended Profiles" on any project</li>
            <li>Explore the AI-powered recommendations with match percentages</li>
          </ol>
          
          <button className="seed-button" onClick={seedDatabase}>
            🌱 Seed Database with Sample Data
          </button>
        </div>

        <div className="demo-content">
          <h3>Your Projects</h3>
          
          {loading && (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading your projects...</p>
            </div>
          )}

          {error && (
            <div className="error-state">
              <p>{error}</p>
              <button onClick={fetchUserProjects} className="retry-button">
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && projects.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h4>No Projects Found</h4>
              <p>Create a project or seed the database to test the recommendation feature.</p>
            </div>
          )}

          {!loading && projects.length > 0 && (
            <div className="projects-list">
              {projects.map((project) => (
                <EnhancedMyProjectCard
                  key={project._id}
                  project={project}
                  joinRequestsCount={project.joinRequests?.length || 0}
                />
              ))}
            </div>
          )}
        </div>

        <div className="demo-footer">
          <div className="pitch-section">
            <h3>🧠 One-Line Pitch for Judges</h3>
            <blockquote>
              "BuddyUp doesn't just host projects — it intelligently recommends the right collaborators based on skills and academic alignment."
            </blockquote>
          </div>
          
          <div className="experience-goals">
            <h4>Experience Goals</h4>
            <ul>
              <li>✨ Smart: AI-powered matching feels intelligent</li>
              <li>🎯 Actionable: Clear next steps for collaboration</li>
              <li>🚀 Demo-ready: Perfect for hackathon presentations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationDemo;