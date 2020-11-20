import * as React from 'react';
import WAVES from 'vanta/dist/vanta.waves.min';
import { TopNav } from '@/components/top-nav';

export default function Index() {
  const [bgEffect, setBgEffect] = React.useState();
  const bgRef = React.useRef(null);

  React.useEffect(() => {
    if (!bgEffect) {
      const eff = WAVES({
        el: bgRef.current,
      });
      eff.setOptions({
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x222528,
        shininess: 6.0,
        waveHeight: 4.5,
        waveSpeed: 0.8,
        zoom: 0.65,
      });
      setBgEffect(eff);
    }
    bgEffect;
    return () => {
      bgEffect?.destroy();
    };
  }, [bgEffect]);

  return (
    <div className="h-screen bg-gray-900 text-white" ref={bgRef}>
      <TopNav />
      <h1 className="text-8xl">dz</h1>
    </div>
  );
}
