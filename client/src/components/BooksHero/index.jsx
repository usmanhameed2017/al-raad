import { motion } from "framer-motion";
import { FaBookOpen } from "react-icons/fa";

function BooksHero() 
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
            Books & Articles
            </h1>

            <p className="lead text-secondary mt-4">
            Explore knowledge, insights, and timeless wisdom from a curated selection of books and articles.
            </p>

            <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-5 text-info"
            >
            {/* Optional decorative element */}
            </motion.div>
        </div>
        </motion.section>
    );
}

export default BooksHero;