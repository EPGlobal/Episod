'use client';

import { useState, useEffect } from 'react';
import PlusText from './PlusText';

interface AnimatedNavTextProps {
  onValidationError: boolean;
  onAnimationComplete: () => void;
}

export default function AnimatedNavText({ onValidationError, onAnimationComplete }: AnimatedNavTextProps) {
  const [displayText, setDisplayText] = useState('HIGH-END BY INSTINCT');
  const [isAnimating, setIsAnimating] = useState(false);
  
  const originalText = 'HIGH-END BY INSTINCT';
  const errorText = 'NICE TRY... YOU HAVE ONE MORE CHANCE';

  useEffect(() => {
    if (onValidationError && !isAnimating) {
      setIsAnimating(true);
      
      // Step 1: Erase the original text all at once
      const eraseText = () => {
        setDisplayText('');
        // Step 2: Type out the error message letter by letter
        setTimeout(() => {
          typeErrorText();
        }, 200);
      };

      // Step 2: Type out error text
      const typeErrorText = () => {
        let currentText = '';
        let index = 0;
        const typeInterval = setInterval(() => {
          currentText += errorText[index];
          setDisplayText(currentText);
          index++;
          
          if (index >= errorText.length) {
            clearInterval(typeInterval);
            // Step 3: After 3 seconds, type back the original text
            setTimeout(() => {
              typeOriginalText();
            }, 3000);
          }
        }, 40);
      };

      // Step 3: Type back original text
      const typeOriginalText = () => {
        let currentText = '';
        let index = 0;
        setDisplayText('');
        
        const typeInterval = setInterval(() => {
          currentText += originalText[index];
          setDisplayText(currentText);
          index++;
          
          if (index >= originalText.length) {
            clearInterval(typeInterval);
            setIsAnimating(false);
            onAnimationComplete();
          }
        }, 40);
      };

      eraseText();
    }
  }, [onValidationError, isAnimating, onAnimationComplete]);

  return (
    <div className="lg:pl-6">
      <PlusText>
        {displayText}
      </PlusText>
    </div>
  );
}