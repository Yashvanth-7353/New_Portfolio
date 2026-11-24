import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import emailjs from '@emailjs/browser';
import { CONTACT_CONTENT, LINKS, PERSONAL_INFO, SOCIAL_LINKS } from '../constants';

export default function Contact() {
  const ref = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // EmailJS Configuration
  const EMAIL_SERVICE_ID = CONTACT_CONTENT.emailjs.serviceId;
  const EMAIL_TEMPLATE_ID = CONTACT_CONTENT.emailjs.templateId;
  const EMAIL_PUBLIC_KEY = CONTACT_CONTENT.emailjs.publicKey;

  // Initialize EmailJS once when component mounts
  useEffect(() => {
    if (EMAIL_PUBLIC_KEY) {
      emailjs.init(EMAIL_PUBLIC_KEY);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      console.log('Validation failed - missing required fields');
      return;
    }

    // The site owner must add their own EmailJS ids in src/constants/index.js.
    if (!EMAIL_SERVICE_ID || !EMAIL_TEMPLATE_ID || !EMAIL_PUBLIC_KEY) {
      setSubmitStatus('error');
      console.warn('Contact form is not configured: add EmailJS ids to CONTACT_CONTENT.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log('Attempting to send email...');
      
      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        message: formData.message,
        to_name: CONTACT_CONTENT.emailjs.toName,
        reply_to: formData.email
      };

      console.log('Template params:', templateParams);

      // Send email using EmailJS
      const result = await emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        templateParams
      );

      console.log('EmailJS Response:', result);

      if (result.status === 200) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        console.error('EmailJS returned non-200 status:', result.status);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Email send failed:', error);
      console.error('Error details:', error.text || error.message);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className='lg:my-16 lg:px-28 my-8 px-5'
      id='contact'
    >
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className='text-2xl lg:text-4xl text-center'
      >
        <span className="hover:text-gray-500">{CONTACT_CONTENT.heading.normal}</span>  <span className='font-extrabold  hover:text-gray-500'>{CONTACT_CONTENT.heading.bold}</span>
      </motion.h2>

      <div className='flex justify-between items-center mt-8 lg:mt-16 flex-col lg:flex-row'>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className='lg:w-[40%]'
        >
          <div className='w-full space-y-3 lg:space-y-5'>
            <input 
              className='border-2 px-5 py-3 border-black rounded placeholder:text-[#71717A] text-sm w-full' 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={CONTACT_CONTENT.form.placeholders.name} 
              required
            />
            <input 
              className='border-2 px-5 py-3 border-black rounded placeholder:text-[#71717A] text-sm w-full' 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={CONTACT_CONTENT.form.placeholders.email} 
              required
            />
            <input 
              className='border-2 px-5 py-3 border-black rounded placeholder:text-[#71717A] text-sm w-full' 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder={CONTACT_CONTENT.form.placeholders.phone} 
            />
            <textarea 
              className='resize-none border-2 px-5 py-3 h-32 border-black placeholder:text-[#71717A] rounded text-sm w-full' 
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder={CONTACT_CONTENT.form.placeholders.message}
              required
            ></textarea>

            {submitStatus === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-green-600 text-sm bg-green-50 p-3 rounded border border-green-200'
              >
                {CONTACT_CONTENT.form.successMessage}
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-red-600 text-sm bg-red-50 p-3 rounded border border-red-200'
              >
                {CONTACT_CONTENT.form.errorMessage}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
              className='flex justify-between gap-3 lg:gap-5 flex-col lg:flex-row'
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={isSubmitting}
                className='bg-black justify-center w-fit lg:w-auto lg:flex-1 hover:shadow-lg text-white px-3 py-2 rounded flex items-center gap-x-3 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {CONTACT_CONTENT.form.submittingLabel}
                  </>
                ) : (
                  CONTACT_CONTENT.form.submitLabel
                )}
              </motion.button>

              <div className='flex items-center gap-x-2 lg:gap-x-5'>
                {SOCIAL_LINKS.map(({ id, icon: Icon, url }) => (
                  <motion.a
                    key={id}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-2 lg:p-3 rounded border-2 border-black"
                    whileHover={{ scale: 1.1, backgroundColor: "#000", color: "#fff" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className='lg:w-1/2'
        >
          {CONTACT_CONTENT.headline && (
            <div className='font-extrabold text-2xl lg:text-5xl mt-5 lg:mt-0 space-y-1 lg:space-y-3'>
              <h2 className='hover:text-gray-500'>{CONTACT_CONTENT.headline.firstLinePrefix}<span className='text-white' style={{ WebkitTextStroke: '1px black' }}>{CONTACT_CONTENT.headline.firstLineEmphasis}</span>{CONTACT_CONTENT.headline.firstLineSuffix}</h2>
              <h2 className='hover:text-gray-500'>{CONTACT_CONTENT.headline.secondLine}</h2>
            </div>
          )}

          {CONTACT_CONTENT.description && (
            <p className='text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-6'>{CONTACT_CONTENT.description}</p>
          )}

          <div className='font-semibold text-sm lg:text-xl flex flex-col mt-6 gap-2 lg:gap-4'>
            <motion.a
              whileHover={{ x: 5 }}
              className='flex items-center gap-2 group'
              href={LINKS.email}
            >
              <span className='border-2 transition-all border-transparent group-hover:border-black rounded-full p-1'>
                <IoMdMail className="w-4 h-4 lg:w-5 lg:h-5 hover:text-gray-500" />
              </span>
              <span className='hover:text-gray-500'>{PERSONAL_INFO.email}</span> 
            </motion.a>

            <motion.a
              whileHover={{ x: 5 }}
              className='flex items-center gap-2 group'
              href={LINKS.phone}
            >
              <span className='border-2 transition-all border-transparent group-hover:border-black rounded-full p-[5px]'>
                <FaPhone className="w-3 h-3 lg:w-4 lg:h-4 hover:text-gray-500" />
              </span>
             <span className='hover:text-gray-500'>{PERSONAL_INFO.phone}</span> 
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
