import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  return (
    <nav>
      <div>
        {/* navigation 구현 */}
        {/* <Link href="/">
          <a>Home</a>
        </Link>
       */}
      </div>
    </nav>
  );
}
