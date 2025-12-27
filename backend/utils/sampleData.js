// Sample data for testing the recommendation system
const Profile = require('../models/Profile');
const Project = require('../models/Project');

const sampleProfiles = [
  {
    username: 'alice_dev',
    password: 'SecurePass123!',
    name: 'Alice Johnson',
    department: 'Computer Science',
    academicYear: '3rd Year',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Python'],
    projectInterests: ['Web Development', 'Full Stack', 'AI/ML'],
    email: 'alice@university.edu',
    bio: 'Passionate full-stack developer with experience in modern web technologies.'
  },
  {
    username: 'bob_data',
    password: 'DataScience456@',
    name: 'Bob Chen',
    department: 'Data Science',
    academicYear: '4th Year',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'R'],
    projectInterests: ['AI/ML', 'Data Analysis', 'Research'],
    email: 'bob@university.edu',
    bio: 'Data science enthusiast specializing in machine learning and statistical analysis.'
  },
  {
    username: 'carol_design',
    password: 'Design789#',
    name: 'Carol Martinez',
    department: 'Design',
    academicYear: '2nd Year',
    skills: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
    projectInterests: ['Design', 'User Experience', 'Mobile Apps'],
    email: 'carol@university.edu',
    bio: 'Creative designer focused on user-centered design and digital experiences.'
  },
  {
    username: 'david_mobile',
    password: 'Mobile101$',
    name: 'David Kim',
    department: 'Computer Science',
    academicYear: '3rd Year',
    skills: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'JavaScript'],
    projectInterests: ['Mobile Development', 'iOS', 'Android'],
    email: 'david@university.edu',
    bio: 'Mobile app developer with experience in cross-platform development.'
  },
  {
    username: 'emma_backend',
    password: 'Backend202%',
    name: 'Emma Wilson',
    department: 'Software Engineering',
    academicYear: '4th Year',
    skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'AWS'],
    projectInterests: ['Backend Development', 'Cloud Computing', 'Microservices'],
    email: 'emma@university.edu',
    bio: 'Backend engineer passionate about scalable systems and cloud architecture.'
  },
  {
    username: 'frank_ai',
    password: 'AiResearch303&',
    name: 'Frank Rodriguez',
    department: 'Computer Science',
    academicYear: 'Graduate',
    skills: ['Python', 'PyTorch', 'Computer Vision', 'NLP', 'Deep Learning'],
    projectInterests: ['AI/ML', 'Computer Vision', 'Research'],
    email: 'frank@university.edu',
    bio: 'AI researcher specializing in computer vision and natural language processing.'
  },
  {
    username: 'grace_frontend',
    password: 'Frontend404*',
    name: 'Grace Lee',
    department: 'Computer Science',
    academicYear: '2nd Year',
    skills: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Sass'],
    projectInterests: ['Frontend Development', 'Web Design', 'User Interfaces'],
    email: 'grace@university.edu',
    bio: 'Frontend developer with a keen eye for design and user experience.'
  },
  {
    username: 'henry_devops',
    password: 'DevOps505+',
    name: 'Henry Thompson',
    department: 'Information Technology',
    academicYear: '4th Year',
    skills: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Linux'],
    projectInterests: ['DevOps', 'Cloud Computing', 'Infrastructure'],
    email: 'henry@university.edu',
    bio: 'DevOps engineer focused on automation and cloud infrastructure.'
  },
  {
    username: 'ivy_security',
    password: 'Security606=',
    name: 'Ivy Patel',
    department: 'Cybersecurity',
    academicYear: '3rd Year',
    skills: ['Cybersecurity', 'Penetration Testing', 'Python', 'Network Security', 'Ethical Hacking'],
    projectInterests: ['Security', 'Ethical Hacking', 'Network Security'],
    email: 'ivy@university.edu',
    bio: 'Cybersecurity specialist with expertise in penetration testing and network security.'
  },
  {
    username: 'jack_game',
    password: 'GameDev707!',
    name: 'Jack Anderson',
    department: 'Game Development',
    academicYear: '3rd Year',
    skills: ['Unity', 'C#', 'Game Design', '3D Modeling', 'Animation'],
    projectInterests: ['Game Development', '3D Graphics', 'Interactive Media'],
    email: 'jack@university.edu',
    bio: 'Game developer passionate about creating immersive gaming experiences.'
  }
];

const createSampleProfiles = async () => {
  try {
    console.log('Creating sample profiles...');
    
    // Clear existing profiles (optional - be careful in production!)
    // await Profile.deleteMany({});
    
    const createdProfiles = [];
    for (const profileData of sampleProfiles) {
      // Check if profile already exists
      const existingProfile = await Profile.findOne({ username: profileData.username });
      if (!existingProfile) {
        const profile = new Profile(profileData);
        await profile.save();
        createdProfiles.push(profile);
        console.log(`✅ Created profile: ${profile.name}`);
      } else {
        console.log(`⚠️  Profile already exists: ${profileData.name}`);
        createdProfiles.push(existingProfile);
      }
    }
    
    return createdProfiles;
  } catch (error) {
    console.error('❌ Error creating sample profiles:', error);
    throw error;
  }
};

const createSampleProjects = async (profiles) => {
  try {
    console.log('Creating sample projects...');
    
    const sampleProjects = [
      {
        title: 'AI-Powered Study Assistant',
        description: 'Building an intelligent study assistant that helps students organize their learning materials, create study schedules, and provides personalized recommendations based on learning patterns.',
        requiredSkills: ['Python', 'Machine Learning', 'React', 'Node.js', 'MongoDB'],
        teamSize: 4,
        owner: profiles[0]._id, // Alice
        category: 'AI/ML',
        duration: '2-3 months',
        timeCommitment: '10-20 hours/week',
        status: 'Looking for members'
      },
      {
        title: 'Campus Event Management Platform',
        description: 'A comprehensive platform for managing university events, including event creation, registration, ticketing, and real-time updates for students and faculty.',
        requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'UI/UX Design', 'AWS'],
        teamSize: 5,
        owner: profiles[1]._id, // Bob
        category: 'Web Development',
        duration: '6+ months',
        timeCommitment: '15-25 hours/week',
        status: 'Looking for members'
      },
      {
        title: 'Mobile Fitness Tracker for Students',
        description: 'A mobile app designed specifically for university students to track their fitness goals, join campus sports activities, and connect with workout partners.',
        requiredSkills: ['React Native', 'Firebase', 'UI/UX Design', 'Swift', 'Kotlin'],
        teamSize: 3,
        owner: profiles[2]._id, // Carol
        category: 'Mobile App',
        duration: '2-3 months',
        timeCommitment: '10-15 hours/week',
        status: 'Looking for members'
      },
      {
        title: 'Blockchain-Based Academic Credential System',
        description: 'Developing a secure, blockchain-based system for storing and verifying academic credentials, certificates, and achievements.',
        requiredSkills: ['Blockchain', 'Solidity', 'Web3', 'JavaScript', 'Cybersecurity'],
        teamSize: 4,
        owner: profiles[3]._id, // David
        category: 'Research',
        duration: '6+ months',
        timeCommitment: '20+ hours/week',
        status: 'Looking for members'
      },
      {
        title: 'Smart Campus IoT Network',
        description: 'Creating an IoT network to monitor and optimize campus resources like energy usage, air quality, and space utilization using smart sensors and data analytics.',
        requiredSkills: ['IoT', 'Python', 'Data Analysis', 'Arduino', 'Cloud Computing'],
        teamSize: 5,
        owner: profiles[4]._id, // Emma
        category: 'Research',
        duration: '6+ months',
        timeCommitment: '15-20 hours/week',
        status: 'Looking for members'
      }
    ];
    
    const createdProjects = [];
    for (const projectData of sampleProjects) {
      // Check if project already exists
      const existingProject = await Project.findOne({ title: projectData.title });
      if (!existingProject) {
        const project = new Project(projectData);
        await project.save();
        
        // Add project to owner's projectsCreated
        await Profile.findByIdAndUpdate(
          projectData.owner,
          { $push: { projectsCreated: project._id } }
        );
        
        createdProjects.push(project);
        console.log(`✅ Created project: ${project.title}`);
      } else {
        console.log(`⚠️  Project already exists: ${projectData.title}`);
        createdProjects.push(existingProject);
      }
    }
    
    return createdProjects;
  } catch (error) {
    console.error('❌ Error creating sample projects:', error);
    throw error;
  }
};

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    const profiles = await createSampleProfiles();
    const projects = await createSampleProjects(profiles);
    
    console.log('✅ Database seeding completed successfully!');
    console.log(`📊 Created ${profiles.length} profiles and ${projects.length} projects`);
    
    return { profiles, projects };
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  }
};

module.exports = {
  seedDatabase,
  createSampleProfiles,
  createSampleProjects,
  sampleProfiles
};