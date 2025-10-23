import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, HelpCircle } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [hoveredTab, setHoveredTab] = useState(null);
  const [showBlackShadow, setShowBlackShadow] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [arrowHover, setArrowHover] = useState({ left: false, right: false });
  const [arrowHoverPersist, setArrowHoverPersist] = useState({ left: false, right: false });
  
  const images = [
    { id: 1, src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop' },
    { id: 2, src: 'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400&h=300&fit=crop' },
    { id: 3, src: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=300&fit=crop' },
    { id: 4, src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop' }
  ];

  const tabs = ['about', 'experiences', 'recommended'];
  const activeIndex = tabs.indexOf(activeTab);
  const hoveredIndex = hoveredTab ? tabs.indexOf(hoveredTab) : null;

 const handleTabClick = (tab) => {
    if (tab === activeTab) {
      setShowBlackShadow(true); // second click → show black shadow
    } else {
      setActiveTab(tab);
      setShowBlackShadow(false); // reset black shadow on tab switch
    }
  };


  const handleArrowLeave = (direction) => {
    setArrowHover({ ...arrowHover, [direction]: false });
    setArrowHoverPersist({ ...arrowHoverPersist, [direction]: true });
    setTimeout(() => {
      setArrowHoverPersist({ ...arrowHoverPersist, [direction]: false });
    }, 300);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 3 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev >= images.length - 3 ? 0 : prev + 1));
  };

  return (
    <div className = 'min-h-screen bg-black flex justify-center items-center'>
    <div className="h-[calc(100%-10px)] w-full rounded-xl bg-[#363C43] text-white p-8 flex gap-8">
      {/* Left half - Empty responsive space */}
      <div className="flex-1" />
      
      {/* Right half - Content */}
      <div className="flex-1 flex flex-col gap-4 max-w-2xl ">
        <div className="bg-[#363C43] rounded-[18px] relative" style={{
          boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.6), -3px -3px 10px rgba(0, 0, 0, 0.25)'
        }}>
          {/* 6 squares grid - top left */}
          <div className="absolute top-36 left-5 grid grid-cols-2 gap-[1px]">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-[10px] h-[10px] bg-[#4A4E54] rounded-[1px]" style={{
                boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.4)'
              }} />
            ))}
          </div>

          <div className="p-6 pl-20">
            {/* Question mark icon - positioned away */}
            <button className="absolute top-6 left-[30px] w-8 h-8 rounded-full flex items-center justify-center transition-all" >
              <HelpCircle className="w-7 h-7 text-[#A3ADB2]" />
            </button>
            
            {/* Tabs with progress bar hover effect */}
            <div className="flex gap-2 mb-6 bg-[#171717] p-1 rounded-[15px] relative overflow-hidden" style={{
              boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.3)'
            }}>
              {/* Hover progress bar effect */}
              {/* {hoveredIndex !== null && (
                <div 
                  className="absolute top-1 h-full bg-gradient-to-r from-transparent via-[#3d4046] to-transparent rounded-[15px] transition-all duration-700 ease-out"
                  style={{
                    width: hoveredIndex !== null ? `calc(33.333% - 5px)` : '0%',
                    left: `calc(${hoveredIndex * 33.333}% + 4px)`,
                    opacity: hoveredIndex !== null ? 0.6 : 0,
                    boxShadow: '0 0 30px rgba(255,255,255,0.08)'
                  }} */}
                {/* /> */}
              {/* )} */}
              
              {/* Active tab white shadow - behind nav */}
              <div 
                className="absolute top-1 h-[calc(100%-8px)] bg-[#28292F] rounded-[15px] transition-all duration-600 ease-in-out z-0"
                style={{
                  width: `calc(33.333% - 5px)`,
                  left: `calc(${activeIndex * 33.333}% + 4px)`,
                  boxShadow: '0 0 60px rgba(255,255,255,0.1), inset 0 4px 60px rgba(0,0,0,0.4), 0 6px 64px rgba(0,0,0,0.25)'
                }}
              />
              
              {/* Black shadow - appears on same-tab click */}
              {showBlackShadow && (
                <div
                  className="absolute top-0 h-full rounded-[15px] transition-all  pointer-events-none"
                  style={{
                    width: `calc(33.333% - 5px)`,
                    left: `calc(${activeIndex * 33.333}% + 4px)`,
                    backgroundColor: '#0d0d0e',
                    boxShadow: '0 0 120px 40px rgba(0,0,0,0.65)'
                  }}
                />
              )}
              
              {/* About Me */}
              <button
                onClick={() => handleTabClick('about')}
                onMouseEnter={() => setHoveredTab('about')}
                onMouseLeave={() => setHoveredTab(null)}
                className={`relative z-10 flex-1 px-4 py-2 rounded-[15px] text-[18px] font-medium transition-all duration-300 overflow-hidden group ${
                  activeTab === 'about'
                    ? 'text-white bg-[#32353A] shadow-[0_0_12px_3px_rgba(255,255,255,0.075)]'
                    : 'text-[#A3ADB2]'
                }`}
              >
                <span className="relative z-10">About Me</span>
                {activeTab !== 'about' && (
                  <span
                    className="absolute inset-0 w-0 rounded-[15px] transition-all duration-500 ease-in-out group-hover:w-full bg-[linear-gradient(to_right,_#1C1C1C_0%,_#2A2D31_25%,_#3F4247_60%,_#4A4E54_100%)] opacity-70"
                  />
                )}
              </button>

              {/* Experiences */}
              <button
                onClick={() => handleTabClick('experiences')}
                onMouseEnter={() => setHoveredTab('experiences')}
                onMouseLeave={() => setHoveredTab(null)}
                className={`relative z-10 flex-1 px-4 py-2 rounded-[15px] text-[18px] font-medium transition-all duration-300 overflow-hidden group ${
                  activeTab === 'experiences'
                    ? 'text-white bg-[#32353A] shadow-[0_0_12px_3px_rgba(255,255,255,0.075)]'
                    : 'text-[#A3ADB2]'
                }`}
              >
                <span className="relative z-10">Experiences</span>
                {activeTab !== 'experiences' && (
                  <span
                    className="absolute inset-0 w-0 rounded-[15px] transition-all duration-500 ease-in-out group-hover:w-full bg-[linear-gradient(to_right,_#1C1C1C_0%,_#2A2D31_25%,_#3F4247_60%,_#4A4E54_100%)] opacity-70"
                  />
                )}
              </button>

              {/* Recommended */}
              <button
                onClick={() => handleTabClick('recommended')}
                onMouseEnter={() => setHoveredTab('recommended')}
                onMouseLeave={() => setHoveredTab(null)}
                className={`relative z-10 flex-1 px-4 py-2 rounded-[15px] text-[18px] font-medium transition-all duration-300 overflow-hidden group ${
                  activeTab === 'recommended'
                    ? 'text-white bg-[#32353A] shadow-[0_0_12px_3px_rgba(255,255,255,0.075)]'
                    : 'text-[#A3ADB2]'
                }`}
              >
                <span className="relative z-10">Recommended</span>
                {activeTab !== 'recommended' && (
                  <span
                    className="absolute inset-0 w-0 rounded-[15px] transition-all duration-500 ease-in-out group-hover:w-full bg-[linear-gradient(to_right,_#1C1C1C_0%,_#2A2D31_25%,_#3F4247_60%,_#4A4E54_100%)] opacity-70"
                  />
                )}
              </button>
            </div>

            {/* Content with scrollbar */}
            <div className="relative">
              <div className="max-h-[175px] overflow-hidden pr-3 space-y-3">
                <p className="text-[#969696] leading-[1.6] text-[20px]">
                  Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.
                </p>
                <p className="text-[#969696] leading-[1.6] text-[20px]">
                  I was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years my wife Tiffany and my 4 year old twin daughters– Emma and Ella. Both of them are just starting school, so my calender is usually blocked between 9–10 AM. This is a a...

                </p>
              </div>

              {/* Fake scrollbar */}
              <div className="absolute ml-1 top-2 right-0 h-16 w-[8px] rounded-[10px] pointer-events-none bg-[linear-gradient(to_bottom,_#4A4E54_0%,_#4A4E54_75%,_#3F4247_100%)]" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[4px] bg-gradient-to-b from-[#282828] via-[#3A3A3A] to-[#282828] rounded-full shadow-inner mx-8" />

        {/* Gallery Widget */}
        <div className="bg-[#363C43] rounded-[18px] relative" style={{
          boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.6), -3px -3px 10px rgba(0, 0, 0, 0.25)'
        }}>
          {/* 6 squares grid - top left */}
          <div className="absolute top-36 left-5 grid grid-cols-2 gap-[1px]">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-[10px] h-[10px] bg-[#4A4E54] rounded-[1px]" style={{
                boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.4)'
              }} />
            ))}
          </div>

          <div className="p-6 pl-20">
            {/* Question mark icon*/}
            <button className="absolute top-6 left-[30px] w-8 h-8 rounded-full flex items-center justify-center transition-all" >
              <HelpCircle className="w-7 h-7 text-[#A3ADB2]" />
            </button>

            {/* Gallery Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[19px] font-semibold bg-[#171717] px-9 py-3 rounded-[20px]" style={{
                boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.6)'
              }}>Gallery</h2>
              <div className="flex items-center gap-6">
                <button className="relative px-5 py-3 bg-[#FFFFFF08] rounded-full text-[13px] font-semibold flex items-center gap-2 transition-all" style={{
                  boxShadow: '-5px -5px 10px rgba(255,255,255,0.06), 8px 8px 16px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.04)'
                }}>
                  <Plus className="w-4 h-4" />
                  ADD IMAGE
                </button>
                <div className="flex gap-3">
                  <button 
                    onClick={handlePrevImage}
                    onMouseEnter={() => setArrowHover({ ...arrowHover, left: true })}
                    onMouseLeave={() => handleArrowLeave('left')}
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 ease-out"
                    style={{
                      background: (arrowHover.left || arrowHoverPersist.left)
                        ? 'linear-gradient(145deg, #2d3135, #1c1e21)' 
                        : 'linear-gradient(145deg, #373B40, #292C30)',
                      boxShadow: (arrowHover.left || arrowHoverPersist.left)
                        ? '5px 5px 12px rgba(0,0,0,0.7), -3px -3px 8px rgba(255,255,255,0.03), inset 2px 2px 5px rgba(0,0,0,0.4)' 
                        : '7px 7px 14px rgba(0,0,0,0.6), -4px -4px 10px rgba(255,255,255,0.03)'
                    }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleNextImage}
                    onMouseEnter={() => setArrowHover({ ...arrowHover, right: true })}
                    onMouseLeave={() => handleArrowLeave('right')}
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 ease-out"
                    style={{
                      background: (arrowHover.right || arrowHoverPersist.right)
                        ? 'linear-gradient(145deg, #2d3135, #1c1e21)' 
                        : 'linear-gradient(145deg, #373B40, #292C30)',
                      boxShadow: (arrowHover.right || arrowHoverPersist.right)
                        ? '5px 5px 12px rgba(0,0,0,0.7), -3px -3px 8px rgba(255,255,255,0.03), inset 2px 2px 5px rgba(0,0,0,0.4)' 
                        : '7px 7px 14px rgba(0,0,0,0.6), -4px -4px 10px rgba(255,255,255,0.03)'
                    }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-3 gap-2 transition-all duration-700 ease-in-out">
              {images.slice(currentImageIndex, currentImageIndex + 3).map((image, idx) => (
                <div
                  key={image.id}
                  className="relative w-full h-[175px] rounded-[22px] overflow-hidden cursor-pointer group"
                  onMouseEnter={() => setHoveredImage(image.id)}
                  onMouseLeave={() => setHoveredImage(null)}
                  style={{
                    transform: hoveredImage === image.id 
                      ? 'scale(1.15) rotate(-2deg)' 
                      : 'scale(1) rotate(0deg)',
                    transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    zIndex: hoveredImage === image.id ? 10 : 1,
                    position: 'relative'
                  }}
                >
                  <img
                    src={image.src}
                    alt={`Gallery ${image.id}`}
                    className="w-full h-full object-cover"
                    style={{
                      filter: hoveredImage === image.id 
                        ? 'grayscale(0%) brightness(1.18) saturate(1.25) contrast(1.05)  ' 
                        : 'grayscale(100%) brightness(0.88)',
                      transition: 'filter 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                  {hoveredImage === image.id && (
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.15) 0%, rgba(255, 180, 120, 0.15) 100%)',
                        mixBlendMode: 'overlay',
                        transition: 'opacity 0.5s ease-out'
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            

          </div>
        </div>
        <div className="h-[4px] bg-gradient-to-b from-[#282828] via-[#3A3A3A] to-[#282828] rounded-full shadow-inner mx-8" />
      </div>
    </div>
    </div>
  );
};

export default App;