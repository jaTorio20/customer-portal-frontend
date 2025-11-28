import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-200 justify-end p-4 flex gap-4">
      <Link href="/login" className="text-blue-500">Login</Link>
      <Link href="/bookings" className="text-blue-500">Bookings</Link>
    </nav>
  );
}
