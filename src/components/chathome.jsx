export default function ChatHome({ isDark }) {
  const faqs = [
    {
      id: 1,
      question: "What is AskElevance?",
      answer: "AskElevance is an AI assistant powered by advanced language models to help you with any questions.",
    },
    {
      id: 2,
      question: "How do I start a new chat?",
      answer: "Click on 'New Chat' in the sidebar to start a new conversation session.",
    },
    {
      id: 3,
      question: "Can I save my conversations?",
      answer: "Yes, all your conversations are automatically saved and can be accessed from the sidebar.",
    },
    {
      id: 4,
      question: "Is my data secure?",
      answer: "We use end-to-end encryption and secure authentication to protect your data.",
    },
    {
      id: 5,
      question: "What models are supported?",
      answer: "AskElevance supports multiple AI models for different use cases and preferences.",
    },
  ];

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-white dark:bg-slate-900 p-6 overflow-y-auto">
      <div className="max-w-2xl mx-auto w-full">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to AskElevance
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Your personal AI assistant. Start a new chat or select an existing conversation from the sidebar.
          </p>
        </div>

        {/* FAQs Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-gray-100 dark:bg-slate-800 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">
            💡 Quick Tips
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
            <li>• Type your question and press Enter to send</li>
            <li>• Use the theme toggle to switch between light and dark mode</li>
            <li>• All conversations are automatically saved to your history</li>
            <li>• You can access previous chats anytime from the sidebar</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
