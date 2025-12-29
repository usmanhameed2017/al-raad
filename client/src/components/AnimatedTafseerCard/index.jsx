import { motion } from "framer-motion";
import CardBS from "../Card";

function AnimatedTafseerCard({ tafseer }) {
    return (
        <motion.div
        whileHover={{
            rotateX: 8,
            rotateY: -8,
            scale: 1.05,
        }}
        transition={{ type: "spring", stiffness: 200 }}
        className="mb-4"
        >
        <CardBS
            heading={`Surah ${tafseer?.surahName}`}
            subHeading={`Ayah ${tafseer?.ayah}`}
            description={tafseer?.tafseer}
            buttonText="Read Tafseer"
            redirectTo={`/tafseer/${tafseer?._id}`}
        />
        </motion.div>
    );
}

export default AnimatedTafseerCard;