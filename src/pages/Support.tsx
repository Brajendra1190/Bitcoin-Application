import React, { useState } from 'react';
import { MessageCircle, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How do I buy Bitcoin?',
    answer: 'To buy Bitcoin, go to the dashboard, enter the amount you want to buy in the trade form, and click "Buy Bitcoin". Make sure you have sufficient funds in your account.'
  },
  {
    question: 'What payment methods are supported?',
    answer: 'We currently support UPI, Net Banking, and Credit/Debit cards for Indian users. International wire transfers are also available.'
  },
  {
    question: 'How long does KYC verification take?',
    answer: 'KYC verification typically takes 24-48 hours. You will be notified via email once your verification is complete.'
  },
  {
    question: 'Is my Bitcoin secure?',
    answer: 'Yes, we use industry-standard security measures including cold storage for the majority of funds and regular security audits.'
  }
];

export function Support() {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle support message submission
    setMessage('');
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Contact Support
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              How can we help you?
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full rounded-lg bg-gray-700 border-gray-600 text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your issue..."
            />
          </div>
          
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
              <p className="text-gray-400">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}