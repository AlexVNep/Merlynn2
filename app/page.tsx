export default function Home() {
  return (
    <div className="flex flex-col col-start-2 col-end-6 gap-8 items-center">
      <h1 className="text-5xl">Welcome To The Merlyn Coding Assessment.</h1>
      <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2">
          Get started by navigating to one of the pages in the sidebar.
        </li>
        <li>Fill in all inputs and let Tom choose for you.</li>
      </ol>
    </div>
  );
}
