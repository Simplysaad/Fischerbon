
import {CheckCircle, AlertTriangle, X} from 'lucide-react'
import { useEffect, useRef, useState } from 'react';

const iconMap = {
  success: <CheckCircle className="text-primary" size={28} />, 
  error: <AlertTriangle className="text-red-400" size={28} />, 
};

const AuthAlert = ({
  header = '',
  message = '',
  iconType = '',
  border = '',
  onClose
}) => {
  const [visible, setVisible] = useState(false);
  const [bar, setBar] = useState( 100 );

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose && onClose(), 400);
    }, 2500);

    const progress = setInterval(() => {
        setBar(prev => prev - 1)
    }, 25);

    return () => {
      clearInterval(progress);
      clearTimeout(timer);
    }

  }, []);

  return (
    <div
      className={`fixed top-5 right-5 z-[1000] font-inter transition-transform duration-400 ease-in-out
        ${visible ? 'animate-jump-in' : 'animate-jump-out'}`}
    >
      <div
        className={`flex flex-col bg-white rounded-xl shadow-sm border-2 ${border ? `border-primary` : 'border-red-400'}`}
      >
        <div className='relative flex items-center gap-3 p-3'>
            <span>{iconMap[iconType] && iconMap[iconType]}</span>
            <div className="flex-1">
            <h1 className="text-lg font-bold mb-1">{header}</h1>
            <p className="text-sm text-gray">{message}</p>
            </div>
            <button
            onClick={() => { setVisible(false); setTimeout(() => onClose && onClose(), 400); }}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-accent cursor-pointer"
            >
            <X size={20} />
            </button>
        </div>
<<<<<<< HEAD
        <div style={{width: `${bar}%`}} className={`mx-1 h-0.5 rounded-xl ${border ? `bg-primary` : 'bg-red-400'}`} />
=======
        <div style={{width: `${bar}%`}} className={`mx-1.5 h-[2.5px] -mb-[0.5px] rounded-xl ${border ? `bg-primary` : 'bg-red-400'}`} />
>>>>>>> dashboard
      </div>
      <style>
        {`
            @keyframes jump-in {
            0% { transform: translateY(-60px) scale(0.8); opacity: 0; }
            60% { transform: translateY(10px) scale(1.05); opacity: 1; }
            80% { transform: translateY(-2px) scale(0.98); }
            100% { transform: translateY(0) scale(1); }
            }
            @keyframes jump-out {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-60px) scale(0.8); opacity: 0; }
            }
            .animate-jump-in { animation: jump-in 0.4s cubic-bezier(.4,2,.6,1) both; }
            .animate-jump-out { animation: jump-out 0.4s cubic-bezier(.4,2,.6,1) both; }
        `}
      </style>
    </div>
  );
};

export default AuthAlert;
