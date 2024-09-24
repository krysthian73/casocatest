"use client";
import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/app/hooks/useAuth";
import Image from "next/image";

interface UserAvatarProps {
  image?: string;
  email: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ image, email }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { logout } = useAuth()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center justify-start w-auto h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors px-2 gap-2"
      >
        {image ? (
          <Image
            src={image}
            alt="User Avatar"
            className="rounded-full object-cover"
            width={40}
            height={40}
            quality={100}
            objectFit="cover"
          />
        ) : (
          <FaUserCircle className="text-gray-500 dark:text-gray-400 text-xl" />
        )}
        <span className="text-gray-900 dark:text-gray-100 font-semibold text-sm">
          {email}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-10"
        >
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
