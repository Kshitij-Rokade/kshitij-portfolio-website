require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Journey = require('../models/Journey');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Experience = require('../models/Experience');
const Education = require('../models/Education');
const Certification = require('../models/Certification');
const SiteSettings = require('../models/SiteSettings');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    console.log('Dropping existing data...');
    await Promise.all([
      User.deleteMany({}),
      Profile.deleteMany({}),
      Journey.deleteMany({}),
      Skill.deleteMany({}),
      Project.deleteMany({}),
      Experience.deleteMany({}),
      Education.deleteMany({}),
      Certification.deleteMany({}),
      SiteSettings.deleteMany({})
    ]);

    // Seed Admin User
    await User.create({
      name: 'Kshitij Rokade',
      email: 'admin@kshitijrokade.dev',
      password: 'admin123456',
      role: 'admin'
    });
    console.log('✓ Admin user created');

    // Seed Profile
    await Profile.create({
      name: 'Kshitij Rokade',
      headline: 'Full-Stack Developer',
      bio: 'Full-Stack Developer with hands-on experience in building scalable web applications using MERN Stack. Skilled in React.js, Node.js, Express.js, MongoDB, REST API development, and authentication systems. Knowledge of Artificial Intelligence, Machine Learning, NLP, and TensorFlow with experience developing AI-based applications. Passionate about building user-centric, high-performance software solutions.',
      email: 'rokadekshitij514@gmail.com',
      location: 'Chandwad, Nashik',
      github: 'https://github.com/Kshitij-Rokade',
      linkedin: 'https://www.linkedin.com/in/kshitijrokade514/',
      heroContent: {
        title: 'Building ideas into working software.',
        subtitle: 'Kshitij Rokade — Full-Stack Developer',
        description: 'Building user-centric, high-performance scalable web applications using the MERN stack with a strong interest in Artificial Intelligence and Machine Learning.'
      },
      aboutContent: {
        whoIAm: 'I am a Full-Stack Developer with hands-on experience in building scalable web applications using the MERN Stack. I am passionate about building user-centric, high-performance software solutions, and I have a keen interest in integrating AI and Machine Learning capabilities into modern applications.',
        journey: 'My journey includes a Bachelor of Engineering in Computer Engineering and professional experience developing full-stack web applications and community platforms. In addition to software development, I actively participate in leadership roles such as Co-Lead at GDG Design & Content Creators Club, Secretary at SNJB Photography Club, and President at SNJB Nature\'s Club.',
        interests: 'Full-Stack Development, React.js, Artificial Intelligence, Machine Learning, UI/UX Design, Leadership'
      },
      currentFocus: [
        'Scalable Web Applications',
        'MERN Stack Development',
        'AI & Machine Learning Integrations',
        'Responsive Design & UI',
        'RESTful API Architecture'
      ]
    });
    console.log('✓ Profile created');

    // Seed Journey Milestones
    await Journey.insertMany([
      {
        year: '2026',
        title: 'Sumago Infotech Pvt. Ltd. — MERN Stack Developer Intern',
        description: 'Developed full-stack web applications using React.js, Node.js, Express.js, and MongoDB. Built and integrated RESTful APIs, developed responsive interfaces, and contributed to the FuelSense project implementing authentication and Google Maps integration.',
        category: 'internship',
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
        displayOrder: 1,
        published: true
      },
      {
        year: '2024',
        title: 'Leadership & Extracurriculars',
        description: 'Active leadership roles: Co-Lead of GDG Design & Content Creators Club, Secretary of SNJB Photography Club, and President of SNJB Nature\'s Club.',
        category: 'other',
        technologies: ['Leadership', 'Team Collaboration', 'Communication'],
        displayOrder: 2,
        published: true
      },
      {
        year: '2027',
        title: 'Bachelor of Engineering (B.E.)',
        description: 'Pursuing Computer Engineering at SNJB\'s K.B. Jain College of Engineering. Current CGPA: 8.43.',
        category: 'learning',
        technologies: ['Computer Science', 'Software Engineering', 'AI/ML'],
        displayOrder: 3,
        published: true
      }
    ]);
    console.log('✓ Journey milestones created');

    // Seed Skills
    await Skill.insertMany([
      { name: 'React.js', category: 'frontend', level: 85, description: 'Component-based UI, hooks, state management', displayOrder: 1 },
      { name: 'JavaScript (ES6+)', category: 'programming', level: 85, description: 'Async/await, DOM manipulation, modern features', displayOrder: 2 },
      { name: 'Node.js', category: 'backend', level: 80, description: 'Server-side runtime', displayOrder: 3 },
      { name: 'Express.js', category: 'backend', level: 80, description: 'REST API development, middleware', displayOrder: 4 },
      { name: 'MongoDB', category: 'database', level: 80, description: 'NoSQL database design', displayOrder: 5 },
      { name: 'HTML5/CSS3', category: 'frontend', level: 90, description: 'Semantic markup, styling, animations', displayOrder: 6 },
      { name: 'Tailwind CSS', category: 'frontend', level: 75, description: 'Utility-first styling', displayOrder: 7 },
      { name: 'Bootstrap', category: 'frontend', level: 80, description: 'Responsive grids and components', displayOrder: 8 },
      { name: 'Python', category: 'programming', level: 70, description: 'Scripting, backend, AI/ML basics', displayOrder: 9 },
      { name: 'TensorFlow', category: 'other', level: 60, description: 'Basic machine learning and model training', displayOrder: 10 },
      { name: 'SQL', category: 'database', level: 75, description: 'Relational databases, queries', displayOrder: 11 },
      { name: 'Git/GitHub', category: 'tools', level: 85, description: 'Version control and collaboration', displayOrder: 12 },
      { name: 'Postman', category: 'tools', level: 80, description: 'API testing and documentation', displayOrder: 13 },
      { name: 'Google Maps API', category: 'apis', level: 75, description: 'Location tracking and route planning', displayOrder: 14 }
    ]);
    console.log('✓ Skills created');

    // Seed Projects
    await Project.insertMany([
      {
        title: 'FuelSense – Smart Fuel Availability Portal',
        slug: 'fuelsense',
        description: 'A MERN Stack application for locating nearby fuel stations, integrating Google Maps API for real-time location tracking and route planning.',
        problem: 'Drivers needed a reliable way to find nearby fuel stations and plan routes efficiently.',
        solution: 'Developed a comprehensive application with real-time tracking, JWT authentication, and a role-based admin dashboard for fuel station management.',
        myRole: 'Full Stack Developer',
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Google Maps API', 'JWT'],
        category: 'fullstack',
        featured: true,
        published: true,
        status: 'completed',
        displayOrder: 1,
        caseStudy: {
          features: [
            'Locate nearby fuel stations',
            'Real-time location tracking and route planning',
            'JWT authentication',
            'Role-based admin dashboard',
            'Fuel station management',
            'REST APIs for dynamic data handling'
          ]
        },
        responsibilities: [
          'Developed responsive user interfaces',
          'Integrated Google Maps API',
          'Implemented secure authentication',
          'Built RESTful backend services'
        ]
      },
      {
        title: 'JinMarg – Community Platform',
        slug: 'jinmarg',
        description: 'A scalable community platform developed using the MERN stack with secure user authentication and discussion management.',
        problem: 'Required a dedicated platform for community discussions and post management with secure profiles.',
        solution: 'Built a robust application featuring secure user authentication, profile management, and REST API-based backend services for handling discussions.',
        myRole: 'Full Stack Developer',
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API'],
        category: 'fullstack',
        featured: true,
        published: true,
        status: 'completed',
        displayOrder: 2,
        caseStudy: {
          features: [
            'Secure user authentication',
            'Profile management',
            'Discussion and post management',
            'Scalable application architecture',
            'Responsive user interface'
          ]
        },
        responsibilities: [
          'Designed scalable application architecture',
          'Implemented user authentication',
          'Built discussion and post management backend',
          'Developed responsive frontend interfaces'
        ]
      }
    ]);
    console.log('✓ Projects created');

    // Seed Experience
    await Experience.create({
      organization: 'Sumago Infotech Pvt. Ltd.',
      role: 'MERN Stack Developer Intern',
      domain: 'Full-Stack Web Development',
      description: 'Developed full-stack web applications using React.js, Node.js, Express.js, and MongoDB. Built and integrated RESTful APIs for seamless frontend-backend communication. Developed responsive user interfaces and implemented reusable React components.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'Google Maps API'],
      learning: [
        'Collaborated with development team to debug, test, and deploy features',
        'Contributed to the FuelSense project',
        'Implemented authentication and admin features',
        'Integrated Google Maps API for real-time tracking'
      ],
      responsibilities: [
        'Developed scalable web applications using MERN stack',
        'Built RESTful APIs',
        'Created responsive React components'
      ],
      startDate: new Date('2026-01-01'),
      endDate: new Date('2026-02-28'),
      current: false,
      location: 'Nashik, India',
      displayOrder: 1
    });
    console.log('✓ Experience created');

    // Seed Education
    await Education.create({
      degree: 'Bachelor of Engineering (B.E.) – Computer Engineering',
      college: 'SNJB\'s K.B. Jain College of Engineering',
      university: 'Savitribai Phule Pune University',
      description: 'CGPA: 8.43. Active in leadership roles including Co-Lead at GDG Design & Content Creators Club, Secretary at SNJB Photography Club, and President at SNJB Nature\'s Club.',
      technologies: ['Computer Science', 'Data Structures', 'Algorithms', 'Web Development'],
      startDate: new Date('2023-08-01'),
      endDate: new Date('2027-06-30'),
      current: true,
      displayOrder: 1
    });
    console.log('✓ Education created');

    // Seed Certifications
    await Certification.insertMany([
      {
        name: 'Microsoft Azure AI-900: Azure AI Fundamentals',
        issuer: 'Microsoft',
        date: new Date('2024-01-01'),
        url: '',
        credentialId: '',
        skills: ['Artificial Intelligence', 'Machine Learning', 'Azure'],
        displayOrder: 1
      },
      {
        name: 'Introduction to Prompt Engineering for Generative AI',
        issuer: 'LinkedIn Learning',
        date: new Date('2024-02-01'),
        skills: ['Generative AI', 'Prompt Engineering', 'NLP'],
        displayOrder: 2
      },
      {
        name: 'What is Generative AI',
        issuer: 'LinkedIn Learning',
        date: new Date('2024-03-01'),
        skills: ['Generative AI', 'Artificial Intelligence'],
        displayOrder: 3
      }
    ]);
    console.log('✓ Certifications created');

    // Seed Site Settings
    await SiteSettings.create({
      siteName: 'Kshitij Rokade',
      siteDescription: 'Full-Stack Developer | React Developer | MERN Stack Developer — Building ideas into working software.',
      footerText: 'Built with React, MERN & Framer Motion',
      seoKeywords: ['Kshitij Rokade', 'Full-Stack Developer', 'React Developer', 'MERN Stack', 'Portfolio', 'Computer Engineering', 'AI/ML']
    });
    console.log('✓ Site settings created');

    console.log('\n✅ Database seeded successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Seed Error:', error);
    process.exit(1);
  }
};

seedData();
