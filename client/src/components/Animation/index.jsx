import { motion } from 'framer-motion';

function Animation({ children, type }) 
{
    if(type === "heading")
    {
        return (
            <motion.h1
                
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}>

                { children }
            </motion.h1>        
        );
    }
    else if(type === "normal")
    {
        return (
           <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 * 0.1 }}>

                { children }
            </motion.div>            
        );        
    } 
}

export default Animation;