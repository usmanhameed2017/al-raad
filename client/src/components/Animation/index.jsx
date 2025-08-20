import { motion } from 'framer-motion';

function Animation({ children, type }) 
{
    // Heading
    if(type === "heading") return (
        <motion.h1
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}>
            { children }
        </motion.h1>        
    );
    
    // Normal
    if(type === "normal") return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 * 0.1 }}>
            { children }
        </motion.div>            
    );        
    
    // Card
    if(type === "card") return (
        <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: -10 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.04 }}>
            { children }
        </motion.div>            
    );        
    
    // Table
    if(type === "table") return (
        <motion.div
            initial={{ opacity: 0, rotateX: -15, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
            transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for smoothness
            }}
            style={{ transformOrigin: "top center" }}>
            {children}
        </motion.div>
    );
}

export default Animation;