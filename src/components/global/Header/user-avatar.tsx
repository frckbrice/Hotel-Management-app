"use client";

import { useState } from "react";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

interface UserAvatarProps {
  src?: string | null;
  alt?: string;
  size?: number;
  className?: string;
}

const UserAvatar = ({
  src,
  alt = "User",
  size = 40,
  className = "",
}: UserAvatarProps) => {
  const [imageError, setImageError] = useState(false);

  // If no source or image failed to load, show fallback
  if (!src || imageError) {
    return (
      <div
        className={`flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 ${className}`}
        style={{ width: size, height: size }}
      >
        <FaUserCircle className="text-green-600" size={size * 0.7} />
      </div>
    );
  }

  // Try to load the image
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      onError={() => setImageError(true)}
      unoptimized={true}
    />
  );
};

export default UserAvatar;
