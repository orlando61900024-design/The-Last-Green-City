import React from 'react';

interface CharacterPipProps {
  mood?: 'happy' | 'thinking' | 'concerned' | 'cheering';
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showBackpack?: boolean;
  className?: string;
}

export const CharacterPip: React.FC<CharacterPipProps> = ({
  mood = 'happy',
  size = 'md',
  showBackpack = true,
  className = ''
}) => {
  const sizeMap = {
    sm: 'w-16 h-28',
    md: 'w-28 h-48',
    lg: 'w-44 h-72',
    hero: 'w-64 h-96'
  };

  return (
    <div className={`relative inline-block select-none ${sizeMap[size]} ${className}`}>
      <svg
        viewBox="0 0 160 260"
        className="w-full h-full drop-shadow-md overflow-visible transition-transform duration-300"
      >
        {/* Soft Shadow on ground */}
        <ellipse cx="80" cy="245" rx="42" ry="8" fill="rgba(0,0,0,0.18)" />

        {/* Explorer Backpack behind body (visible on sides/shoulders) */}
        {showBackpack && (
          <g id="backpack-silhouette">
            <path
              d="M38 105 C32 90, 32 150, 42 165 C48 168, 52 145, 50 115 Z"
              fill="#8B5A2B"
              stroke="#4A2E12"
              strokeWidth="2.5"
            />
            <path
              d="M122 105 C128 90, 128 150, 118 165 C112 168, 108 145, 110 115 Z"
              fill="#8B5A2B"
              stroke="#4A2E12"
              strokeWidth="2.5"
            />
            {/* Backpack bedroll / top flap */}
            <path
              d="M48 85 C48 76, 112 76, 112 85 C112 92, 48 92, 48 85 Z"
              fill="#6B4423"
              stroke="#4A2E12"
              strokeWidth="2"
            />
          </g>
        )}

        {/* Boots */}
        <g id="boots">
          {/* Left Boot */}
          <path
            d="M50 198 L50 226 C50 236, 42 238, 38 238 C32 238, 32 232, 38 226 L48 200 Z"
            fill="#D9822B"
            stroke="#2B1D0C"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M38 230 C45 234, 62 234, 66 226 L64 216 L48 216 Z"
            fill="#B86A1D"
          />
          {/* Right Boot */}
          <path
            d="M110 198 L110 226 C110 236, 118 238, 122 238 C128 238, 128 232, 122 226 L112 200 Z"
            fill="#D9822B"
            stroke="#2B1D0C"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M122 230 C115 234, 98 234, 94 226 L96 216 L112 216 Z"
            fill="#B86A1D"
          />
        </g>

        {/* Botanical Scout Jumpsuit (Legs & Torso) */}
        <g id="body-jumpsuit">
          {/* Main Jumpsuit Body */}
          <path
            d="M52 105 L48 200 C56 204, 72 202, 76 180 L84 180 C88 202, 104 204, 112 200 L108 105 Z"
            fill="#5EAA48"
            stroke="#1E3314"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />

          {/* Organic Camo / Leaf Blotches from sketch */}
          <ellipse cx="64" cy="120" rx="9" ry="7" fill="#3D752E" />
          <ellipse cx="94" cy="132" rx="10" ry="8" fill="#3D752E" />
          <ellipse cx="62" cy="165" rx="8" ry="6" fill="#3D752E" />
          <ellipse cx="98" cy="180" rx="7" ry="5" fill="#3D752E" />

          {/* Warm Amber-Orange Leaf Camo spots from sketch */}
          <circle cx="88" cy="115" r="5" fill="#E08328" />
          <circle cx="58" cy="142" r="6" fill="#E08328" />
          <circle cx="94" cy="155" r="5" fill="#E08328" />
          <circle cx="64" cy="185" r="5.5" fill="#E08328" />

          {/* Utility Seams & Center Collar */}
          <path
            d="M80 94 L80 148"
            stroke="#3D752E"
            strokeWidth="2.5"
            strokeDasharray="4 2"
          />
          {/* V-neck collar */}
          <path
            d="M70 92 L80 106 L90 92"
            fill="none"
            stroke="#2B461D"
            strokeWidth="2.5"
          />

          {/* Utility Pocket Belt */}
          <path
            d="M48 152 Q80 156 112 152"
            stroke="#7C4B24"
            strokeWidth="4"
            fill="none"
          />
          <rect x="74" y="148" width="12" height="8" rx="2" fill="#D99E32" stroke="#4A2E12" strokeWidth="1.5" />
        </g>

        {/* Arms & Hands */}
        <g id="arms">
          {/* Left Arm */}
          <g>
            <path
              d="M50 102 C36 115, 34 140, 40 162 C43 170, 52 170, 54 160 C50 142, 50 120, 56 106 Z"
              fill="#5EAA48"
              stroke="#1E3314"
              strokeWidth="3"
            />
            {/* Wrist Cuff */}
            <rect x="36" y="148" width="14" height="6" rx="2" fill="#8B5A2B" />
            {/* Hand */}
            <circle cx="44" cy="168" r="9" fill="#F8C496" stroke="#2B1D0C" strokeWidth="2.5" />
          </g>

          {/* Right Arm */}
          <g>
            {mood === 'cheering' ? (
              // Raised Arm in cheer
              <g>
                <path
                  d="M108 102 C125 90, 134 70, 138 52 C146 54, 146 64, 138 78 C128 98, 120 110, 106 114 Z"
                  fill="#5EAA48"
                  stroke="#1E3314"
                  strokeWidth="3"
                />
                <circle cx="140" cy="46" r="9" fill="#F8C496" stroke="#2B1D0C" strokeWidth="2.5" />
              </g>
            ) : mood === 'thinking' ? (
              // Hand to chin
              <g>
                <path
                  d="M108 102 C120 112, 124 125, 114 135 C108 135, 100 125, 96 115 Z"
                  fill="#5EAA48"
                  stroke="#1E3314"
                  strokeWidth="3"
                />
                <circle cx="106" cy="104" r="8" fill="#F8C496" stroke="#2B1D0C" strokeWidth="2.5" />
              </g>
            ) : (
              // Resting Arm
              <g>
                <path
                  d="M110 102 C124 115, 126 140, 120 162 C117 170, 108 170, 106 160 C110 142, 110 120, 104 106 Z"
                  fill="#5EAA48"
                  stroke="#1E3314"
                  strokeWidth="3"
                />
                <rect x="110" y="148" width="14" height="6" rx="2" fill="#8B5A2B" />
                <circle cx="116" cy="168" r="9" fill="#F8C496" stroke="#2B1D0C" strokeWidth="2.5" />
              </g>
            )}
          </g>
        </g>

        {/* Backpack Shoulder Straps */}
        <g id="straps">
          <path d="M58 92 C54 110, 54 135, 58 152" stroke="#663A12" strokeWidth="4.5" fill="none" />
          <path d="M102 92 C106 110, 106 135, 102 152" stroke="#663A12" strokeWidth="4.5" fill="none" />
          {/* Chest Clip */}
          <path d="M58 122 L102 122" stroke="#7C4B24" strokeWidth="2.5" />
        </g>

        {/* Neck */}
        <rect x="74" y="80" width="12" height="15" fill="#F8C496" />

        {/* Head */}
        <g id="head">
          {/* Ears */}
          <circle cx="48" cy="62" r="7" fill="#F8C496" stroke="#2B1D0C" strokeWidth="2.5" />
          <circle cx="112" cy="62" r="7" fill="#F8C496" stroke="#2B1D0C" strokeWidth="2.5" />

          {/* Face Base */}
          <rect
            x="50"
            y="32"
            width="60"
            height="56"
            rx="22"
            fill="#FBD5B2"
            stroke="#2B1D0C"
            strokeWidth="3.2"
          />

          {/* Rosy Cheeks */}
          <circle cx="58" cy="66" r="5.5" fill="#FF9A85" opacity="0.6" />
          <circle cx="102" cy="66" r="5.5" fill="#FF9A85" opacity="0.6" />

          {/* Eyes & Brows based on mood */}
          {mood === 'concerned' ? (
            <g id="eyes-concerned">
              {/* Slanted Brows */}
              <line x1="58" y1="46" x2="68" y2="49" stroke="#3D2109" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="102" y1="46" x2="92" y2="49" stroke="#3D2109" strokeWidth="2.5" strokeLinecap="round" />
              {/* Eyes */}
              <circle cx="64" cy="54" r="3.2" fill="#201509" />
              <circle cx="96" cy="54" r="3.2" fill="#201509" />
              {/* Mouth wavy/concerned */}
              <path d="M72 72 Q80 67 88 72" fill="none" stroke="#201509" strokeWidth="2.8" strokeLinecap="round" />
            </g>
          ) : mood === 'cheering' ? (
            <g id="eyes-cheering">
              {/* Happy squint eyes */}
              <path d="M60 54 Q65 48 70 54" fill="none" stroke="#201509" strokeWidth="3" strokeLinecap="round" />
              <path d="M90 54 Q95 48 100 54" fill="none" stroke="#201509" strokeWidth="3" strokeLinecap="round" />
              {/* Big joyful mouth */}
              <path d="M70 66 Q80 80 90 66 Z" fill="#C93B3B" stroke="#201509" strokeWidth="2.5" />
            </g>
          ) : mood === 'thinking' ? (
            <g id="eyes-thinking">
              {/* One raised eyebrow */}
              <path d="M58 45 Q64 42 70 46" fill="none" stroke="#3D2109" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="92" y1="48" x2="102" y2="48" stroke="#3D2109" strokeWidth="2.5" strokeLinecap="round" />
              <ellipse cx="65" cy="52" rx="3.5" ry="4.5" fill="#201509" />
              <ellipse cx="97" cy="52" rx="3.5" ry="4.5" fill="#201509" />
              {/* Curious slight smile */}
              <path d="M74 68 Q80 72 88 68" fill="none" stroke="#201509" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          ) : (
            // Classic happy face from user sketch!
            <g id="eyes-happy">
              {/* Iconic vertical capsule dot eyes from original sketch */}
              <rect x="63" y="50" width="4" height="11" rx="2" fill="#201509" />
              <rect x="93" y="50" width="4" height="11" rx="2" fill="#201509" />
              {/* Wide friendly curve smile */}
              <path
                d="M68 64 Q80 77 92 64"
                fill="none"
                stroke="#201509"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Spiky Messy Tawny/Brown Hair (Exact faithful hand-drawn silhouette) */}
          <g id="hair">
            <path
              d="M44 42 
                 C38 32, 45 18, 56 15 
                 C62 12, 68 8, 78 8 
                 C88 8, 98 12, 105 14 
                 C116 18, 122 28, 118 42 
                 C125 45, 122 55, 116 60 
                 C114 50, 110 40, 104 38 
                 C98 42, 94 36, 88 40 
                 C80 34, 74 38, 70 34 
                 C62 40, 56 36, 52 44 
                 C46 50, 44 56, 42 60 
                 C38 52, 40 46, 44 42 Z"
              fill="#A8733E"
              stroke="#201509"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            {/* Hair texture strands & highlights from user sketch */}
            <path
              d="M60 20 Q70 14 82 18"
              fill="none"
              stroke="#C48D52"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M84 15 Q95 18 102 24"
              fill="none"
              stroke="#C48D52"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M52 28 Q62 24 72 26"
              fill="none"
              stroke="#7E4F23"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M74 24 Q82 28 92 22"
              fill="none"
              stroke="#7E4F23"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
