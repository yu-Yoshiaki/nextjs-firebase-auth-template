/**
 * @package
 */

import { memo } from "react";

// eslint-disable-next-line react/display-name
export const Footer = memo(() => {
  return (
    <footer className="flex justify-between items-center px-4 h-[80px] text-center text-gray-600">
      <small>&copy; 2022 Next.js + FirebaseAuth</small>
    </footer>
  );
});
