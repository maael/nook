import Link from "next/link";

export default function ErrorPage() {
  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      Hmmm? Well this isn't right.
      <Link href="/">
        <a>
          <button style={{ marginTop: 20 }}>Go back</button>
        </a>
      </Link>
    </div>
  );
}
