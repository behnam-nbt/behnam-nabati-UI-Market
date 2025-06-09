import { IoBarChart } from "react-icons/io5";
import { MdArrowRightAlt } from "react-icons/md";
import { motion } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import { useState } from "react";

function AnimateText() {
    // Intersection observer hook to trigger animations on scroll
    const { ref, inView } = useInView({
        triggerOnce: true,   // Run animation only once
        threshold: 0.3       // Trigger when 30% is visible
    });

    // Hover state to show glowing background effect
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            ref={ref}
            onMouseEnter={() => setIsHovered(true)}
            className='group min-h-[300px] flex flex-col justify-between items-center p-4 relative overflow-hidden'
        >
            {/* Glow animation when hovered */}
            {isHovered && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.3, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 pointer-events-none p-2"
                >
                    <div className="absolute left-[40%] top-1/3 w-[20%] h-1/2 bg-white/50 rounded-full blur-2xl" />
                </motion.div>
            )}

            {/* Badge at the top: "New opportunities" */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='border border-zinc-900 rounded-2xl px-4 py-2 flex items-center'
            >
                <IoBarChart className="text-purple-700" />
                <h1 className="ml-1 text-sm">New opportunities</h1>
            </motion.div>

            {/* Main heading text */}
            <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <p className="uppercase text-2xl md:text-4xl text-center">
                    <span className="text-purple-700">trade</span> your favourite markets
                </p>
            </motion.div>

            {/* Supporting paragraph */}
            <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="w-full lg:w-1/2 text-center"
            >
                <p className="text-md text-zinc-300">
                    Want to buy Bitcoin or trade CFDs on Gold or EUR/USD? We've got you covered with access to 100+ global markets on one platform.
                </p>
            </motion.div>

            {/* Call-to-action button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="bg-purple-500 px-6 py-2 rounded-full flex items-center hover:bg-purple-600 cursor-pointer"
            >
                View All coins <MdArrowRightAlt className="ml-2" size={30} />
            </motion.button>
        </div>
    );
}

export default AnimateText;
