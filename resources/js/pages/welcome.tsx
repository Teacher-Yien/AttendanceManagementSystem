import { useState } from 'react';
import { Head } from '@inertiajs/react';

export default function AttendanceLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Add your login logic here
    console.log({ username, password, rememberMe });
  };

  return (
    <>
      <Head title="Attendance Management System">
         
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 ">
        <div className="w-full max-w-[600px] shadow-lg p-[5rem]">
          <div className="mb-10 text-center">
            <h1 className="mb-1 text-2xl font-bold">ប្រព័ន្ធគ្រប់គ្រងអវត្តមានសិស្ស</h1>
            <p className="text-gray-600">Attendance Management System</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-full bg-gray-200 px-6 py-4 focus:outline-none"
                  placeholder="Username"
                />
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-full bg-gray-200 px-6 py-4 focus:outline-none"
                  placeholder="Password"
                />
              </div>

              <div className="flex items-center justify-between px-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-sm">
                    ចងចាំខ្ញុំ
                  </label>
                </div>
                <div>
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    ភ្លេចពាក្យសម្ងាត់?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-yellow-600 py-4 font-medium text-white hover:bg-yellow-700"
              >
                ចូលគណនី
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}