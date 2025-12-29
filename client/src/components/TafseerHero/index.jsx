import { motion } from "framer-motion";
import { FaBookOpen } from "react-icons/fa";

function TafseerHero() 
{
    return (
        <motion.section
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        style={{ padding: "120px 20px" }}
        >
        <div className="text-center">
            <FaBookOpen size={60} className="text-info mb-4" />

            <h1 className="display-4 fw-bold text-light">
            Tafseer Al-Qur’an
            </h1>

            <p className="lead text-secondary mt-4">
            Dive deep into divine wisdom.  
            Explore meanings, reflections & timeless guidance.
            </p>

            <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-5 text-info"
            >
            ↓ Scroll to Explore
            </motion.div>
        </div>
        </motion.section>
    );
}

export default TafseerHero;