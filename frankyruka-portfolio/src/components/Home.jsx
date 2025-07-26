// import { motion, useScroll, useTransform } from 'framer-motion';
// import { useRef } from 'react';
// import Image from 'next/image';

// export default function HomePage() {
//     const { scrollY } = useScroll();

//     const scale = useTransform(scrollY, [0, 300], [1, 0.8]); //cambia la escala
//     const opacity = useTransform(scrollY, [0, 300], [1, 0]);

//     const characterImages = Array.from({ length: 15 });
//     const conceptImages = Array.from({ length: 12 });

//     const imageCharacterPaths = characterImages.map((_, i) => (
//         `/media/character-design/character-design-${String(i + 2).padStart(2, '0')}.jpg`
//     ));
//     const imageConceptPaths = conceptImages.map((_, i) => (
//         `/media/concept-art/concept-${String(i + 2).padStart(2, '0')}.jpg`
//     ));

//     const parentVariants = {
//         hidden: {},
//         visible: {
//             transition: {
//                 staggerChildren: 0.2,
//             },
//         },
//     };
//     const childVariants = {
//         hidden: { opacity: 0, y: -50 },
//         visible: { opacity: 1, y: 0 },
//     };

//     return (
//         <>
//             <div className='fixed inset-0 max-h-screen flex items-center justify-center z-10'>
//                 <motion.div
//                     initial={{ scaleX: 0 }}
//                     animate={{ scaleX: 1 }}
//                     transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
//                     className='origin-center'
//                 >
//                     <motion.img
//                         src={'/media/character-design/character-design-01.jpg'}
//                         alt={'Opening image'}
//                         initial={{ scale: 0.8 }}
//                         animate={{ scale: 1 }}
//                         transition={{ delay: 1.8, duration: 1.2, ease: "easeInOut" }}
//                         style={{ scale, opacity }}
//                         className={'w-screen max-h-screen object-cover'}
//                     />
//                     {/* <div className="absolute inset-0 bg-black opacity-60" /> */}
//                 </motion.div>
//             </div>

//             <div className="h-[100vh]"></div>

//             <div className="space-y-20">
//                 <motion.h1
//                     initial={{}}
//                     className='font-stupid text-[100px] text-black'>
//                     CHARACTER DESIGN
//                 </motion.h1>

//                 <motion.div
//                     className="grid grid-cols-3 gap-10"
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true, amount: 0.1 }}
//                     variants={parentVariants}
//                 >
//                     {imageCharacterPaths.map((path, index) => (
//                         <motion.div
//                             key={index}
//                             variants={childVariants}
//                             className='flex justify-center'
//                             // className="flex justify-center transition-transform duration-300 hover:scale-105"
//                             whileHover={{ scale: 1.1, zIndex: 1 }}
//                         >
//                             <div className='w-[500px] relative aspect-square'>
//                                 <Image
//                                     fill
//                                     src={path}
//                                     className="object-cover rounded-xl shadow-lg"
//                                     alt={`image-${index}`}
//                                 />
//                             </div>
//                         </motion.div>
//                     ))}
//                 </motion.div>

//             </div>
//             <div>
//                 <div className='mt-30'>
//                     <motion.h1
//                         className='font-stupid text-[100px] text-black flex justify-end '>
//                         CONCEPT ART
//                     </motion.h1>
//                 </div>
//                 <motion.div
//                     className="grid grid-cols-3 gap-10"
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true, amount: 0.3 }}
//                     variants={parentVariants}
//                 >
//                     {imageConceptPaths.map((path, index) => (
//                         <motion.div
//                             key={index}
//                             whileHover={{ scale: 1.1, zIndex: 1 }}
//                             variants={childVariants}
//                             className='flex justify-center'
//                         >
//                             <div className='w-[500px] relative aspect-square'>
//                                 <Image
//                                     fill
//                                     src={path}
//                                     className="object-cover rounded-xl shadow-lg"
//                                     alt={`image-${index}`}
//                                 />
//                             </div>
//                         </motion.div>
//                     ))}
//                 </motion.div>
//             </div>

//         </>

//     )
// }

import Image from "next/image";
import GsapStaggerWrapper from "./animations/FadeIn";

export default function Home() {
  return (
    <GsapStaggerWrapper>
      <div className="flex justify-center">
        <div className="relative w-full h-[50vh] mt-20">
          <Image
            src={"/media/visdev/illustration-dome.jpg"}
            fill
            className="object-cover opacity-70  z-0"
            alt="background"
          />

          <div className="absolute inset-0 flex flex-col justify-center z-30 mx-auto">
            <h1 className="text-center text-black font-magilio text-[100px] tracking-wider">
              FRANKYRUKA
            </h1>
            <p className="text-[20px] text-black text-center font-calluna">
              CHARACTER DESIGN
            </p>
            <p className="text-[20px] text-black text-center font-calluna">
              VISUAL DEVELOPMENT
            </p>
            <p className="text-[20px] text-black text-center font-calluna">
              ANIMATION
            </p>
          </div>
        </div>
      </div>
    </GsapStaggerWrapper>
  );
}
