'use client';
import {motion} from 'framer-motion';


export default function FadeInWrapper({children, delay= 0}) {
    return(
        <motion.div
            initial={{ opacity:0 , y:40}}
            whileInView={{ opacity: 0, y:0}}
            transition={{ delay, duration: 0.3, ease: 'easeInOut'}}
            viewport={{ once:true, amount:0.3}}
        >
            {children}
        </motion.div>
    )
}
