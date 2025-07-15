import Link from "next/link";

export const Home = () => {
  return (
    <div>
      <Link href={"http://localhost:8000/login"}>Login</Link>
    </div>
  );
};

export default Home;
