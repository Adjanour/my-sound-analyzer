import React, { useState, useEffect } from 'react';
import * as meyda from 'meyda';

export const Analyzer: React.FC = () => {
  const [frequencies, setFrequencies] = useState<number[]>([]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyzer = meyda.default.createMeydaAnalyzer({
          audioContext,
          source,
          featureExtractors: ['spectralCentroid'], // Analyze for frequency centroid
          callback: (features: { spectralCentroid: React.SetStateAction<number[]>; }) => {
            setFrequencies((prevFrequencies) => {...frequencies,features.spectralCentroid}); 
          }
        });

        analyzer.start();
      });
  }, []);

  return (
    <div>
        <h1>Frequency Centroid</h1>
        <ul>
          {frequencies.map((frequency, index) => (
            <li key={index}>{frequency}</li>
          ))}
        </ul>
    </div>
  );
}
