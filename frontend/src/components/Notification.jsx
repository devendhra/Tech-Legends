import { CheckCircle, XCircle, Info } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Notification({ message, type, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 500); // Allow fade-out animation
      }, 4000); // Notification visible for 4 seconds
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!isVisible && !message) return null;

  let icon, bgColor, borderColor, textColor;
  switch (type) {
    case 'success':
      icon = <CheckCircle size={20} />;
      bgColor = 'bg-emerald-600';
      borderColor = 'border-emerald-700';
      textColor = 'text-emerald-50';
      break;
    case 'error':
      icon = <XCircle size={20} />;
      bgColor = 'bg-rose-600';
      borderColor = 'border-rose-700';
      textColor = 'text-rose-50';
      break;
    case 'info':
    default:
      icon = <Info size={20} />;
      bgColor = 'bg-blue-600';
      borderColor = 'border-blue-700';
      textColor = 'text-blue-50';
      break;
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] p-4 pr-6 rounded-lg shadow-xl flex items-center gap-3 transition-all duration-500 ${bgColor} ${borderColor} border ${textColor}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      {icon}
      <p className="font-medium text-sm">{message}</p>
      <button onClick={() => setIsVisible(false)} className="ml-4 opacity-70 hover:opacity-100">
        <XCircle size={16} />
      </button>
    </div>
  );
}