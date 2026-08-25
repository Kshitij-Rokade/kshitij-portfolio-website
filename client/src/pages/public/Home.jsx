import { Helmet } from 'react-helmet-async';
import { Suspense, lazy } from 'react';
import HeroSection from '../../components/sections/HeroSection';
import AboutSection from '../../components/sections/AboutSection';
import JourneySection from '../../components/sections/JourneySection';
import PhilosophySection from '../../components/sections/PhilosophySection';
import ExperienceSection from '../../components/sections/ExperienceSection';
import ProjectsSection from '../../components/sections/ProjectsSection';
import SkillsSection from '../../components/sections/SkillsSection';
import CertificationsSection from '../../components/sections/CertificationsSection';
import EducationSection from '../../components/sections/EducationSection';
import BeyondCodeSection from '../../components/sections/BeyondCodeSection';
import CurrentFocusSection from '../../components/sections/CurrentFocusSection';
import ContactSection from '../../components/sections/ContactSection';

// Lazy load the global 3D background for performance
const GlobalScroll3D = lazy(() => import('../../components/three/GlobalScroll3D'));

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Kshitij Rokade — Full Stack Developer | Portfolio</title>
        <meta name="description" content="Portfolio of Kshitij Rokade — Final-Year Computer Engineering Student & Full Stack Developer. Building ideas into working software with React, Node.js, Express, and MongoDB." />
        <meta property="og:title" content="Kshitij Rokade — Full Stack Developer" />
        <meta property="og:description" content="From my first database-driven applications to MERN stack development, I learn by building real projects and solving practical problems." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kshitij Rokade — Full Stack Developer" />
      </Helmet>

      <Suspense fallback={null}>
        <GlobalScroll3D />
      </Suspense>

      <HeroSection />
      <JourneySection />
      <AboutSection />
      <PhilosophySection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <CertificationsSection />
      <EducationSection />
      <BeyondCodeSection />
      <CurrentFocusSection />
      <ContactSection />
    </>
  );
}
