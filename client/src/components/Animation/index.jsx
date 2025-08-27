import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

function Animation({ children, type }) 
{
    // Get page location
    const location = useLocation();

    // Page
    if(type.trim().toLowerCase() === "page") return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                style={{ minHeight: location.pathname.includes("/admin") ? "auto" : "100vh" }}>
                {children}
            </motion.div>
        </AnimatePresence>
    );

    // Heading
    if(type.trim().toLowerCase() === "heading") return (
        <motion.h1
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}>
            { children }
        </motion.h1>        
    );
    
    // Normal
    if(type.trim().toLowerCase() === "normal") return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 * 0.1 }}>
            { children }
        </motion.div>            
    );        
    
    // Card
    if(type.trim().toLowerCase() === "card") return (
        <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: -10 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.04 }}>
            { children }
        </motion.div>            
    );

    // Button
    if (type.trim().toLowerCase() === "button") return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}>
            {children}
        </motion.div>
    );    
    
    // Table
    if(type.trim().toLowerCase() === "table") return (
        <motion.div
            initial={{ opacity: 0, rotateX: -15, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
            transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            style={{ transformOrigin: "top center" }}>
            {children}
        </motion.div>
    );
}

export default Animation;