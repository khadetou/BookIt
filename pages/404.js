import Link from "next/link";
export default function PageNotFound() {
  return (
    <div className="page-not-found-wrapper">
      <h1 id="title_404">404!</h1>
      <h3 id="description_404">
        Page Not Found <Link href="/">Go Back</Link>
      </h3>
    </div>
  );
}
