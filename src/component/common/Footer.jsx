// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useTheme } from '../../context/ThemeContext';

// const Footer = () => {
//   const { isDark } = useTheme();
  
//   const footerLinks = {
//     Product: [
//       { name: 'Features', href: '#features' },
//       { name: 'Pricing', href: '#pricing' },
//       { name: 'API', href: '#api' },
//       { name: 'Documentation', href: '#docs' },
//     ],
//     Company: [
//       { name: 'About', href: '#about' },
//       { name: 'Blog', href: '#blog' },
//       { name: 'Careers', href: '#careers' },
//       { name: 'Contact', href: '#contact' },
//     ],
//     Legal: [
//       { name: 'Privacy', href: '#privacy' },
//       { name: 'Terms', href: '#terms' },
//       { name: 'Security', href: '#security' },
//       { name: 'Compliance', href: '#compliance' },
//     ],
//     Support: [
//       { name: 'Help Center', href: '#help' },
//       { name: 'Community', href: '#community' },
//       { name: 'Status', href: '#status' },
//       { name: 'Contact Support', href: '#support' },
//     ],
//   };

//   return (
//     <footer className={`${
//       isDark ? 'bg-dark-900 text-gray-300' : 'bg-gray-900 text-white'
//     }`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
//           {/* Brand Section */}
//           <div className="lg:col-span-1">
//             <Link to="/" className="flex items-center space-x-2 mb-6">
//               <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-xl">E</span>
//               </div>
//               <span className="text-xl font-bold">ExamPro</span>
//             </Link>
//             <p className={`mb-6 max-w-xs ${
//               isDark ? 'text-gray-400' : 'text-gray-300'
//             }`}>
//               Revolutionizing online examinations with cutting-edge technology and security.
//             </p>
//             <div className="flex space-x-4">
//               {['twitter', 'linkedin', 'github'].map((social) => (
//                 <a
//                   key={social}
//                   href={`#${social}`}
//                   className={`${
//                     isDark ? 'text-gray-400 hover:text-white' : 'text-gray-300 hover:text-white'
//                   } transition duration-300`}
//                 >
//                   <span className="sr-only">{social}</span>
//                   <div className="w-6 h-6 flex items-center justify-center">
//                     {social === 'twitter' && '𝕏'}
//                     {social === 'linkedin' && '👔'}
//                     {social === 'github' && '🐱'}
//                   </div>
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Links Sections */}
//           {Object.entries(footerLinks).map(([category, links]) => (
//             <div key={category}>
//               <h3 className={`text-lg font-semibold mb-4 ${
//                 isDark ? 'text-gray-100' : 'text-white'
//               }`}>{category}</h3>
//               <ul className="space-y-3">
//                 {links.map((link) => (
//                   <li key={link.name}>
//                     <a
//                       href={link.href}
//                       className={`${
//                         isDark ? 'text-gray-400 hover:text-white' : 'text-gray-300 hover:text-white'
//                       } transition duration-300`}
//                     >
//                       {link.name}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         <div className={`mt-12 pt-8 ${
//           isDark ? 'border-dark-800' : 'border-gray-800'
//         } border-t`}>
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p className={`${
//               isDark ? 'text-gray-400' : 'text-gray-300'
//             } text-sm`}>
//               © {new Date().getFullYear()} ExamPro. All rights reserved.
//             </p>
//             <div className="flex space-x-6 mt-4 md:mt-0">
//               {['privacy', 'terms', 'cookies'].map((item) => (
//                 <a
//                   key={item}
//                   href={`#${item}`}
//                   className={`${
//                     isDark ? 'text-gray-400 hover:text-white' : 'text-gray-300 hover:text-white'
//                   } text-sm transition duration-300 capitalize`}
//                 >
//                   {item === 'cookies' ? 'Cookie Policy' : `${item.charAt(0).toUpperCase() + item.slice(1)} Policy`}
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();
  
  const footerLinks = {
    Product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'API', href: '#api' },
      { name: 'Documentation', href: '#docs' },
    ],
    Company: [
      { name: 'About', href: '#about' },
      { name: 'Blog', href: '#blog' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '#contact' },
    ],
    Legal: [
      { name: 'Privacy', href: '#privacy' },
      { name: 'Terms', href: '#terms' },
      { name: 'Security', href: '#security' },
      { name: 'Compliance', href: '#compliance' },
    ],
    Support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Community', href: '#community' },
      { name: 'Status', href: '#status' },
      { name: 'Contact Support', href: '#support' },
    ],
  };

  return (
    <footer className={`relative ${
      isDark ? 'bg-gray-900/80 border-t border-gray-800' : 'bg-white/80 border-t border-gray-200'
    } backdrop-blur-glass`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-500/5 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-br from-primary-600 to-secondary-600' 
                  : 'bg-gradient-to-br from-primary-500 to-secondary-500'
              }`}>
                <span className="text-white font-bold text-xl">EP</span>
              </div>
              <div>
                <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  ExamPro
                </span>
                <span className="block text-xs gradient-text font-semibold">AI-Powered Exams</span>
              </div>
            </Link>
            <p className={`mb-6 max-w-xs ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Revolutionizing online examinations with cutting-edge technology and security.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'LinkedIn', 'GitHub', 'YouTube'].map((social) => (
                <a 
                  key={social}
                  href={`#${social.toLowerCase()}`} 
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    isDark 
                      ? 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700' 
                      : 'bg-gray-100 text-gray-600 hover:text-primary-600 hover:bg-gray-200'
                  }`}
                >
                  {social === 'Twitter' && '𝕏'}
                  {social === 'LinkedIn' && '👔'}
                  {social === 'GitHub' && '🐱'}
                  {social === 'YouTube' && '▶️'}
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-gray-100' : 'text-gray-900'
              }`}>{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`transition-all duration-300 hover:text-primary-500 hover:translate-x-1 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`mt-12 pt-8 ${
          isDark ? 'border-gray-800' : 'border-gray-200'
        } border-t`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`${
              isDark ? 'text-gray-400' : 'text-gray-600'
            } text-sm`}>
              © {new Date().getFullYear()} ExamPro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {['privacy', 'terms', 'cookies'].map((item) => (
                <a 
                  key={item}
                  href={`#${item}`} 
                  className={`${
                    isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  } text-sm transition duration-300 capitalize`}
                >
                  {item === 'cookies' ? 'Cookie Policy' : `${item.charAt(0).toUpperCase() + item.slice(1)} Policy`}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;