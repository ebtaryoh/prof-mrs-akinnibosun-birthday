import React from 'react';
import { motion } from 'framer-motion';

// Pull all portrait images for the Hero cutout. We will use the second one.
const images = import.meta.glob('../../assets/*.{jpg,jpeg,png}', { eager: true });
const imageUrls = Object.values(images).map(img => img.default);

export default function Biography() {
  const bioImage = imageUrls.length > 1 ? imageUrls[1] : (imageUrls[0] || null);

  return (
    <section id="about" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-16">
        
        {/* Left Side - Image (Matching Reference's Playful/Editorial Vibe) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="w-full md:w-5/12 relative"
        >
          <div className="absolute -inset-4 bg-brand-accent-light rounded-[3rem] transform -rotate-6 z-0 mix-blend-multiply"></div>
          {bioImage ? (
            <img 
              src={bioImage} 
              alt="Professor Profile" 
              className="relative z-10 w-full rounded-3xl shadow-xl object-cover aspect-[4/5] object-top"
            />
          ) : (
            <div className="relative z-10 w-full rounded-3xl shadow-xl bg-gray-200 aspect-[4/5] flex items-center justify-center text-gray-400">Image Upload Required</div>
          )}
          
          {/* Decorative Elements */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-highlight/20 rounded-full blur-2xl z-0"
          />
        </motion.div>

        {/* Right Side - Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full md:w-7/12 space-y-8"
        >
           <div>
              <p className="text-brand-accent tracking-[0.2em] text-sm font-semibold uppercase mb-3">A Life of Purpose</p>
              <h2 className="font-serif text-5xl md:text-6xl text-brand-text font-bold leading-tight">
                Grace, Wisdom, <br/>
                <span className="italic font-normal text-brand-accent/80">& Impact.</span>
              </h2>
           </div>

           <div className="space-y-6 text-brand-text/80 font-sans text-lg leading-relaxed">
             <p className="first-letter:text-6xl first-letter:font-serif first-letter:text-brand-accent first-letter:mr-2 first-letter:float-left">
                Born on March 14th to the Ogiefa Royal Family, Professor (Mrs) Faith Iguodala Akinnibosun has always pursued excellence. From graduating as the Best Student for five consecutive years in secondary school to becoming a distinguished Professor of Environmental and Public Health Microbiology at the University of Benin.
             </p>
              <p>
                Her brilliant career includes earning her Ph.D. in collaboration with the University of Exeter (UK), delivering the 348th UNIBEN Inaugural Lecture, and serving as the Pioneer HOD, Dean, EUI (2016 - 2017) & HOD, UNIBEN (2022 - 2025). She is a recognized Fellow of the Linnean Society of London and Recipient of the "Distinguished Alumnus Award" University of Benin Worldwide.
              </p>
             <div className="pt-6 border-t border-brand-accent/20">
               <p className="font-medium text-brand-text">
                  Beyond academia, she is an ordained Minister in the Redeemed Christian Church of God, a loving wife to Professor Henry Adewale Akinnibosun, and a devoted mother to four lovely children.
               </p>
             </div>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
