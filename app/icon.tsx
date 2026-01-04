import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: '#3E2723', // brown-900
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FAF6F1', // cream-100
          borderRadius: '20%', // Carré arrondi
        }}
      >
        {/* Epi simplifié */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
           <path
            d="M12 22C12 22 13 19 13 14C13 9 11 6 12 2C13 6 15 9 15 13C15 17 13 20 13 22H12Z"
            fill="currentColor"
          />
          <path
            d="M11 21C11 21 10 18 8 15C6 12 6 8 8 5C7 8 5 11 6 15C7 19 10 21 11 21Z"
            fill="currentColor"
          />
          <path
            d="M13 21C13 21 14 18 16 15C18 12 18 8 16 5C17 8 19 11 18 15C17 19 14 21 13 21Z"
            fill="currentColor"
          />
        </svg>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}
