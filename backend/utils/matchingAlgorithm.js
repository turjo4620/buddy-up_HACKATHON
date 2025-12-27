const calculateSkillOverlap = (studentSkills, requiredSkills) => {
  if (!requiredSkills || requiredSkills.length === 0) return 0;
  if (!studentSkills || studentSkills.length === 0) return 0;

  const matchingSkills = studentSkills.filter(skill => 
    requiredSkills.some(required => 
      required.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(required.toLowerCase())
    )
  );

  return matchingSkills.length;
};

const calculateMatchingSkills = (studentSkills, requiredSkills) => {
  if (!requiredSkills || requiredSkills.length === 0) return [];
  if (!studentSkills || studentSkills.length === 0) return [];

  return studentSkills.filter(skill => 
    requiredSkills.some(required => 
      required.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(required.toLowerCase())
    )
  );
};

const calculateMatchScore = (studentSkills, requiredSkills, studentInterests, projectTitle, projectDescription) => {
  const skillMatches = calculateSkillOverlap(studentSkills, requiredSkills);
  const skillScore = (skillMatches / Math.max(requiredSkills.length, 1)) * 100;

  let interestScore = 0;
  if (studentInterests && studentInterests.length > 0) {
    const projectText = `${projectTitle} ${projectDescription}`.toLowerCase();
    const matchingInterests = studentInterests.filter(interest =>
      projectText.includes(interest.toLowerCase())
    );
    interestScore = (matchingInterests.length / studentInterests.length) * 30;
  }

  return Math.round((skillScore * 0.7) + (interestScore * 0.3));
};

const findSuggestedTeammates = async (project, allProfiles) => {
  if (!project || !allProfiles) return [];

  const excludedIds = [
    project.owner.toString(),
    ...project.members.map(member => member.profile.toString())
  ];

  const eligibleStudents = allProfiles.filter(profile => 
    !excludedIds.includes(profile._id.toString())
  );

  const matches = eligibleStudents.map(student => {
    const matchingSkills = calculateMatchingSkills(student.skills || [], project.requiredSkills || []);
    const matchScore = calculateMatchScore(
      student.skills || [],
      project.requiredSkills || [],
      student.projectInterests || [],
      project.title || '',
      project.description || ''
    );

    return {
      student: {
        _id: student._id,
        name: student.name,
        department: student.department,
        academicYear: student.academicYear,
        skills: student.skills,
        projectInterests: student.projectInterests
      },
      matchScore,
      matchingSkills,
      skillOverlapCount: calculateSkillOverlap(student.skills || [], project.requiredSkills || [])
    };
  });

  return matches
    .filter(match => match.skillOverlapCount > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10);
};

const findMatchingProjects = async (student, allProjects) => {
  if (!student || !allProjects) return [];

  const excludedProjectIds = [
    ...(student.projectsCreated || []).map(id => id.toString()),
    ...(student.projectsJoined || []).map(id => id.toString())
  ];

  const eligibleProjects = allProjects.filter(project => 
    !excludedProjectIds.includes(project._id.toString()) &&
    project.status === 'Looking for members' &&
    project.members.length < project.teamSize
  );

  const matches = eligibleProjects.map(project => {
    const matchScore = calculateMatchScore(
      student.skills || [],
      project.requiredSkills || [],
      student.projectInterests || [],
      project.title || '',
      project.description || ''
    );

    return {
      project: {
        _id: project._id,
        title: project.title,
        description: project.description,
        requiredSkills: project.requiredSkills,
        teamSize: project.teamSize,
        currentMembers: project.members.length,
        owner: project.owner,
        status: project.status
      },
      matchScore,
      matchingSkills: calculateMatchingSkills(student.skills || [], project.requiredSkills || []),
      skillOverlapCount: calculateSkillOverlap(student.skills || [], project.requiredSkills || [])
    };
  });

  return matches
    .filter(match => match.skillOverlapCount > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10);
};

module.exports = {
  findSuggestedTeammates,
  findMatchingProjects,
  calculateSkillOverlap,
  calculateMatchScore
};