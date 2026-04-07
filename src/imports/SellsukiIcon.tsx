/** Sellsuki brand icon — Type=Icon, Size=40 (40×40px) */
import { useId } from "react";

export default function SellsukiIcon({ size = 40 }: { size?: number }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.3585 18.0543H16.0788L19.7191 21.6937L23.3585 18.0543Z" fill="#09193A"/>
      <path d="M19.7191 21.6937L27.2243 29.1989L31.3987 24.9183C31.8902 24.4148 32.1646 23.7393 32.1646 23.0353V18.0543H23.3595L19.7191 21.6947L19.7191 21.6937Z" fill="#E6EAEE"/>
      <path d="M32.1637 10.965C32.16 10.3357 31.3728 10.0401 30.9275 10.4854L23.3585 18.0543L19.7182 21.6947L27.2234 29.1999L31.3978 24.9192C31.8893 24.4157 32.1637 23.7403 32.1637 23.0362V10.9797C32.1637 10.9751 32.1637 10.9696 32.1637 10.965Z" fill={`url(#${uid}p0)`}/>
      <path d="M16.0788 18.0543L7.5 18.0543V23.0344C7.5 23.7384 7.77533 24.4148 8.26687 24.9183L12.3313 29.0807L19.7182 21.6938L16.0779 18.0534L16.0788 18.0543Z" fill="#E6EAEE"/>
      <path d="M12.3322 29.0807L15.7166 32.5473C17.9775 34.8627 21.7019 34.8618 23.9609 32.5445L27.2234 29.1989L19.7182 21.6938L12.3313 29.0807L12.3322 29.0807Z" fill="#E6EAEE"/>
      <path d="M12.3322 29.0807L15.7166 32.5473C17.9775 34.8627 21.7019 34.8618 23.9609 32.5445L27.2234 29.1989L19.7182 21.6938L12.3313 29.0807L12.3322 29.0807Z" fill={`url(#${uid}p1)`}/>
      <path d="M19.7191 21.6937L8.55514 10.5298C8.16616 10.1408 7.50092 10.4152 7.5 10.9659V22.7766C7.5 23.6451 7.84001 24.4794 8.44704 25.1012L16.9076 33.765C18.5162 35.4124 21.1651 35.4115 22.7718 33.7632L26.7891 29.6433C27.0303 29.3966 27.0275 29.0012 26.7836 28.7573L19.7191 21.6928L19.7191 21.6937Z" fill={`url(#${uid}p2)`}/>
      <path d="M32.1646 9.05795C31.0115 9.05795 30.0774 8.14972 30.0774 7.02897C30.0774 6.53929 30.2558 6.08933 30.5533 5.73915C30.6198 5.66062 30.6937 5.58947 30.7704 5.52203C31.14 5.19865 31.6278 5 32.1646 5C33.2826 5 34.1927 5.85557 34.2472 6.92919C34.249 6.96245 34.2527 6.99571 34.2527 7.02897C34.2527 7.06224 34.249 7.0955 34.2472 7.12876C34.1936 8.20331 33.2835 9.05795 32.1646 9.05795Z" fill={`url(#${uid}p3)`}/>
      <defs>
        <linearGradient id={`${uid}p0`} x1="-25.7929" y1="19.9985" x2="76.2209" y2="19.9985" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00CFF4"/>
          <stop offset="0.41" stopColor="#00BBF4"/>
          <stop offset="1" stopColor="#0098F5"/>
        </linearGradient>
        <linearGradient id={`${uid}p1`} x1="-7.05316" y1="20.0003" x2="78.201" y2="20.0003" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00CFF4"/>
          <stop offset="0.41" stopColor="#00BBF4"/>
          <stop offset="1" stopColor="#0098F5"/>
        </linearGradient>
        <linearGradient id={`${uid}p2`} x1="-36.6598" y1="20.0015" x2="48.5961" y2="20.0015" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5B059"/>
          <stop offset="0.14" stopColor="#F4AA55"/>
          <stop offset="0.33" stopColor="#F49949"/>
          <stop offset="0.53" stopColor="#F37E37"/>
          <stop offset="0.75" stopColor="#F35B1F"/>
        </linearGradient>
        <linearGradient id={`${uid}p3`} x1="30.0774" y1="7.02898" x2="34.2527" y2="7.02898" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00CFF4"/>
          <stop offset="0.41" stopColor="#00BBF4"/>
          <stop offset="1" stopColor="#0098F5"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
