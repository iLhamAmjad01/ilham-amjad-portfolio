/**
 * Home page — assembles all portfolio sections.
 * Section order matches the navigation: Home → Experience → About → Tech Stack → Services → Projects → Contact
 */
import { Hero, TechMarquee, Experience, About, TechStack, Services, Projects, Contact } from '../sections';

const Home = () => {
  return (
    <>
      <Hero />
      <TechMarquee />
      <Experience />
      <About />
      <TechStack />
      <Services />
      <Projects />
      <Contact />
    </>
  );
};

export default Home;
