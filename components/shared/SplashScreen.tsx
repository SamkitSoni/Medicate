"use client"; // This marks the file as a client component

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const textRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const letters = textRef.current?.children;
    if (letters) {
      gsap.fromTo(
        letters,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 4,
          stagger: 0.2,
          ease: 'power1.inOut'
        }
      );

      gsap.to(barRef.current, {
        width: '100%',
        duration: 1,
        delay: 1 + 0.001 * letters.length // Ensuring the bar moves after the text animation
      });
    }
  }, []);

  useGSAP(() => {
    gsap.to('#exceptional', {
      ease: 'power1.inOut',
      opacity: 1,
      y: -10,
      duration: 2,

    });
  }, []);

  useGSAP(() => {
    gsap.to('#screen', {
      ease: "power4.out",
      opacity: 1,
      y: -900,
      duration: 4,
      delay: 3
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-dark-400 z-50">
      <div id='screen'>
      <div ref={textRef} className="text-4xl font-bold flex opacity-0 ml-6" id='exceptional'>
      <div>
      {'Medicate'.split('').map((char, index) => (
        <span key={index} className={char === 'X' ? 'text-green-500' : 'text-white'}>
          {char}
        </span>
      ))}
      <span className="text-green-500">X</span>
    </div>
      </div>
      <div className="mt-4 w-60 sm:max-w-md h-1 bg-gray-300 opacity-0" id='exceptional'>
        <div ref={barRef} className="h-full bg-green-500 w-0"/>
      </div>
      </div>
    </div>
  );
}
