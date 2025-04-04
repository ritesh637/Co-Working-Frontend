"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What are your operating hours?",
    answer:
      "Our co-working space is open 24/7 for members with access cards. Guests can visit from 9 AM to 7 PM on weekdays.",
  },
  {
    question: "Do you offer day passes?",
    answer:
      "Yes, we offer flexible day passes for those who need a workspace for a short duration.",
  },
  {
    question: "Are meeting rooms available?",
    answer:
      "Yes, we have fully equipped meeting rooms available for booking. Members get discounted rates.",
  },
  {
    question: "Is there high-speed internet?",
    answer:
      "Absolutely! We provide high-speed Wi-Fi and ethernet connections for seamless work.",
  },
  {
    question: "Can I bring my pet?",
    answer:
      "Currently, we do not allow pets in the workspace to maintain a comfortable environment for all.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 bg-gradient-to-r from-blue-100 to-indigo-200 dark:from-gray-800 dark:to-gray-700 shadow-lg"
          >
            <button
              className="w-full flex justify-between items-center text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              {faq.question}
              {openIndex === index ? (
                <ChevronUp className="text-blue-600 dark:text-blue-400" />
              ) : (
                <ChevronDown className="text-gray-500 dark:text-gray-400" />
              )}
            </button>
            {openIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                id={`faq-answer-${index}`}
                className="overflow-hidden"
              >
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
