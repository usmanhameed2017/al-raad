import styles from './style.module.css';
import { motion } from 'framer-motion';
import { FaBookOpen, FaBookReader, FaVideo, FaUsers, FaLightbulb, FaEnvelope } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';

const sections = [
  {
    icon: <FaBookOpen size={30} />,
    title: "Quranic Tafseer",
    text: `We provide in-depth Quranic Tafseer in Urdu and Arabic, offering classical and modern insights for better understanding.
    <br> 
    Our Tafseer is presented with context, language analysis, and practical life applications.`,
  },
  {
    icon: <FaBookReader size={30} />,
    title: "Islamic Books",
    text: `Access a curated digital library of authentic Islamic books, including Fiqh, Aqeedah, Seerah, and Hadith.
    <br> 
    All resources are free to read or download as pdf.`,
  },
  {
    icon: <FaVideo size={30} />,
    title: "Video Lectures",
    text: `Our video section includes lectures from renowned scholars, detailed tafseer series, and educational sessions on various Islamic topics.
    <br>
    All videos are verified and free from bid'ah or misinformation.`,
  },
  {
    icon: <FaLightbulb size={30} />,
    title: "Why Al-Ra’ad?",
    text: `- 100% Authentic Sources
           <br>- Completely Free for All
           <br>- Mobile-friendly and accessible
           <br>- Regular updates with new content`,
  },
  {
    icon: <FaUsers size={30} />,
    title: "Our Team",
    text: `We are developers, designers, and students of knowledge — collaborating for the sake of Allah ﷻ to make Islamic learning easy and accessible.`,
  },
  {
    icon: <FaEnvelope size={30} />,
    title: "Contact Us",
    text: `Have feedback or suggestions? <a href='/contact'>Click here</a> to help improve Al-Ra’ad.`,
  },
];

function About() 
{
  return (
    <div className={styles.aboutWrapper}>
      <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }}> About Al-Ra’ad </motion.h1>
      <hr className='text-secondary' />

      <div className={styles.sectionsContainer}>
        <Row>
          {sections.map((section, index) => {
            return (
              <Col key={index} xs={12} md={4} xl={4} className="mb-4 d-flex">
                <motion.div
                  className={`${styles.section} w-100`}
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}>

                  {/* Section Icon */}
                  <motion.div className={styles.icon} initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1.1 }} transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                  viewport={{ once: true }}> 
                    {section.icon} 
                  </motion.div>

                  {/* Section Title */}
                  <h2 className={styles.title}>{section.title}</h2>

                  {/* Section Description */}
                  <motion.p className={styles.description} dangerouslySetInnerHTML={{ __html: section.text }}
                  initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }} viewport={{ once: true }}/>
                </motion.div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default About;