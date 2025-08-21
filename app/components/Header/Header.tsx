import Link from "next/link";
import "./Header.scss";

export const Header = () => {
  return (
    <nav className="header">
      <Link className="header__link" href="/">
        Home
      </Link>
      <Link className="header__link" href="/cart">
        Cart
      </Link>
    </nav>
  );
};
