import Link from "next/link";

export default function ErrorPage() {
  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      Hmmm?
      Well this isn't right.
      <Link href="/">
        <button
          style={{ marginTop: 20 }}
        >
          Go back
        </button>
      </Link>
    </div>
  );
}
