import { memo, useState } from 'react';

export const Login = memo(() => {
  const [userId, setUserId] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 学習用にここで認証ロジックを実装してください
    // 例) userId を検証→状態保存→遷移 など
    console.log('login submit:', { userId });
  };

  return (
    <main className="min-h-[70svh] flex items-center justify-center p-6">
      <section className="card">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Login</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Enter your user ID to continue</p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-slate-700 dark:text-slate-200">User ID</label>
            <input
              id="userId"
              type="text"
              autoComplete="username"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="e.g. user01"
              className="mt-1 input"
            />
          </div>

          <button type="submit" className="w-full btn btn-primary px-4 py-2.5 font-medium shadow">
            Login
          </button>
        </form>
      </section>
    </main>
  );
});

export default Login;