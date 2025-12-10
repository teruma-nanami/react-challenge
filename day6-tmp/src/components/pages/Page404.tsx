import { memo } from "react";

export const Page404 = memo(() => {
  return (
    <main className="min-h-[70svh] md:min-h-screen flex items-center justify-center p-6">
      <section className="glass-card max-w-2xl w-full px-8 py-10 md:px-12 md:py-14">
        <div className="text-center space-y-5">
          <p className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10 px-4 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-300 ring-1 ring-inset ring-indigo-200/50 dark:ring-indigo-500/20">
            Oops!
            <span className="h-1 w-1 rounded-full bg-indigo-400/70 dark:bg-indigo-300/70" />
            404 Not Found
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            ページが見つかりませんでした
          </h2>

          <p className="mx-auto max-w-prose text-slate-600 dark:text-slate-300 leading-relaxed">
            The page you are looking for does not exist. Please check the URL or
            return to the home page.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-5 py-3 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-500 hover:to-fuchsia-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 dark:ring-offset-slate-900 transition-colors"
            >
              ホームに戻る
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 ring-1 ring-inset ring-slate-300/70 dark:ring-white/20 hover:bg-slate-100/60 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200 transition-colors"
            >
              ヘルプを見る
            </a>
          </div>
        </div>
      </section>
    </main>
  );
});

export default Page404;
