import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../api/api';
import './EditProfile.css';

const EditProfile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    academicYear: '',
    bio: '',
    skills: [],
    projectInterests: [],
    contactEmail: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        department: user.department || '',
        academicYear: user.academicYear || '',
        bio: user.bio || '',
        skills: user.skills || [],
        projectInterests: user.projectInterests || [],
        contactEmail: user.contactEmail || user.email || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await updateProfile(user._id, formData);
      
      if (response.success) {
        updateUser(response.data);
        setSuccess('Profile updated successfully!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  if (!user) {
    return (
      <div className="edit-profile-container">
        <div className="loading-message">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-card">
        <div className="profile-header">
          <h1>Edit Profile</h1>
          <p>Update your information</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department *</label>
            <select
              id="department"
              name="departm"
    
e}
              required
            >
              <option value="">Select Departme
              <option value="Computer Science">Computer Science</ption>
            on>
      
   ion>
/option>
          ption>
            </select>
        iv className="edit-profile-card">
        <div className="profile-header">
          <h1>Edit Profile</h1>
          <p>Update your information to help others find and connect with you</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="form-section">
            <h3>Basic Information</h3>
            
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Business">Business</option>
                  <option value="Design">Design</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="academicYear">Academic Year *</label>
                <select
                  id="academicYear"
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option vaption>
    
             
        </div>
            </>

            <div className="roup">
              <label htmlFor="bio">Bio</label>
              <textarea
              o"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tel.."
ws="4"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Skills</h3>
            <div className="skills-input">
              <input
                type="text"
                value={newSk}
                onChange={(e) => s
                placeholder="Add a skill"
                onKeyPress={(e) => e.)}
              />
              on>
            </div>
            <div className="tags-container">
              {formData.skills.map((skill, inde
                <span key={index} className">
                  {skill}
                  <button type="button" n>
                </span>
              ))}
            </div>
          </div>

on">
            <h33>
            <div classNam-input">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInteres
                placeholder="At"
                onKeyPress={(e) =>
              />
              <button type="button" onClick={addInterest} classNan>
            </div>
        ">
              {formData.projectInterests.map((
                <span key={index} ">
                  {interest}

                </span>
            
            </div>
          <>

          <div className="form-sec">
            <h3>Contact Information</h3>
            
            <div className="form-group">
              <label htmlFor=
              <input
                type"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={hanange}
                placeholder"
              />
            </div>
          </div>

          <div className="fotions">
          
              Cancel
            </bn>
            <button ave-btn">
              {loadinnges'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;