import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { TbCheck, TbCopy } from "react-icons/tb";
import emailjs from '@emailjs/browser';
import { CONTACT_CONTENT, LINKS, PERSONAL_INFO, SOCIAL_LINKS } from '../constants';

const EMAILJS = CONTACT_CONTENT.emailjs;
const IS_EMAILJS_READY = Boolean(EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey);

function buildMailtoHref({ name, email, phone, message }) {
  const subject = `Portfolio message from ${name}`;
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    "",
    message,
  ].join("\n");

  return `${LINKS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function useLocalClock(timeZone) {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString("en-GB", { timeZone, hour12: false }));

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-GB", { timeZone, hour12: false }));
    }, 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
}

export default function Contact() {
  const ref = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [copied, setCopied] = useState(false);

  const { panel } = CONTACT_CONTENT;
  const localTime = useLocalClock(panel.timezone);

  // Initialize EmailJS once when component mounts (only when ids are configured)
  useEffect(() => {
    if (IS_EMAILJS_READY) {
      emailjs.init(EMAILJS.publicKey);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCopyEmail = async () => {
    let ok = false;

    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      ok = true;
    } catch {
      // Clipboard API can be blocked by permissions: fall back to a hidden textarea.
      try {
        const field = document.createElement('textarea');
        field.value = PERSONAL_INFO.email;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.appendChild(field);
        field.select();
        ok = document.execCommand('copy');
        document.body.removeChild(field);
      } catch {
        ok = false;
      }
    }

    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      return;
    }

    // Without EmailJS ids, hand the message to the visitor's mail app.
    if (!IS_EMAILJS_READY) {
      window.location.href = buildMailtoHref(formData);
      setSubmitStatus('mailto');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        message: formData.message,
        to_name: EMAILJS.toName,
        reply_to: formData.email
      };

      const result = await emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, templateParams);

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });

        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='lg:px-28 px-5 min-h-screen flex flex-col justify-center'
      id='contact'
    >
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className='text-2xl lg:text-4xl text-center'
      >
        <span className="hover:text-gray-500">{CONTACT_CONTENT.heading.normal}</span>  <span className='font-extrabold  hover:text-gray-500'>{CONTACT_CONTENT.heading.bold}</span>
      </motion.h2>

      <div className='flex justify-between items-center mt-8 lg:mt-16 flex-col lg:flex-row gap-10 lg:gap-0'>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className='w-full lg:w-[40%]'
        >
          <form className='w-full space-y-3 lg:space-y-5' onSubmit={handleSubmit}>
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

            {submitStatus === 'mailto' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-black text-sm bg-white p-3 rounded border-2 border-black'
              >
                {CONTACT_CONTENT.form.mailtoMessage}{' '}
                <a href={LINKS.email} className='font-semibold underline underline-offset-2'>
                  {PERSONAL_INFO.email}
                </a>
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
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className='flex justify-between gap-3 lg:gap-5 flex-col lg:flex-row'
            >
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
          </form>
        </motion.div>

        {/* Direct-line card: availability, live local time, email + phone in one glance */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className='w-full lg:w-1/2'
        >
          <div className='border-2 border-black rounded-md bg-white'>
            <div className='flex items-center justify-between gap-3 px-4 py-3 border-b-2 border-black'>
              <span className='flex items-center gap-2 text-[10px] lg:text-xs font-bold uppercase tracking-[0.18em]'>
                <span className='relative flex h-2.5 w-2.5'>
                  <span className='absolute inline-flex h-full w-full rounded-full bg-black opacity-40 animate-ping'></span>
                  <span className='relative inline-flex h-2.5 w-2.5 rounded-full bg-black'></span>
                </span>
                {panel.availability}
              </span>
              <span className='font-mono text-[10px] lg:text-xs tabular-nums text-[#71717A]' aria-label='My current local time'>
                {panel.timezoneLabel} {localTime}
              </span>
            </div>

            <div className='px-4 pt-5 pb-4 lg:px-6 lg:pt-6'>
              <p className='font-extrabold text-3xl lg:text-5xl leading-[0.95] tracking-tight'>
                {panel.headline.first}
                <br />
                <span className='text-white' style={{ WebkitTextStroke: '1.5px black' }}>
                  {panel.headline.second}
                </span>
              </p>
              <p className='hidden lg:block text-[#71717A] font-light text-sm/6 lg:text-base mt-4'>
                {panel.note}
              </p>
            </div>

            <div className='flex items-center justify-between gap-3 px-4 py-3 lg:px-6 border-t-2 border-black'>
              <a href={LINKS.email} className='flex flex-1 items-center gap-2 font-semibold text-sm lg:text-base min-w-0 group'>
                <IoMdMail className='w-4 h-4 lg:w-5 lg:h-5 shrink-0 group-hover:text-gray-500 transition' />
                <span className='truncate text-xs lg:text-base group-hover:text-gray-500 transition'>{PERSONAL_INFO.email}</span>
              </a>
              <button
                type='button'
                onClick={handleCopyEmail}
                aria-label={`Copy ${PERSONAL_INFO.email} to clipboard`}
                className='shrink-0 flex items-center gap-1.5 text-[10px] lg:text-xs font-semibold border-2 border-black rounded px-2 py-1 hover:bg-black hover:text-white transition-colors'
              >
                {copied ? <TbCheck size={14} /> : <TbCopy size={14} />}
                <span className='hidden lg:inline'>{copied ? panel.copiedLabel : panel.copyLabel}</span>
              </button>
            </div>

            <a href={LINKS.phone} className='flex items-center gap-2 px-4 py-3 lg:px-6 border-t-2 border-black rounded-b-md font-semibold text-sm lg:text-base group'>
              <FaPhone className='w-3 h-3 lg:w-4 lg:h-4 shrink-0 group-hover:text-gray-500 transition' />
              <span className='group-hover:text-gray-500 transition'>{PERSONAL_INFO.phone}</span>
            </a>
          </div>

          <p className='font-mono text-[10px] lg:text-xs text-[#71717A] mt-3 uppercase tracking-[0.18em]'>
            {panel.location}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
