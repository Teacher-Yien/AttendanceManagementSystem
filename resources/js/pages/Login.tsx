import { useState, FormEvent, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Login() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');

  const { data, setData, post, processing, errors, reset } = useForm({
    username: '',
    email: '',
    password: '',
    remember: false,
  });
  // Define the User and Auth types according to your structure  
 

 


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Update the form data directly
    if (data.username.includes('@')) {
      setData('email', data.username);
      setData('username', '');
    }
  
    post(route('login'), {
      onSuccess: (response:any) => {
        setAlertType('success');
        setAlertMessage('Login successful! Redirecting to dashboard...');
        setShowAlert(true);
  
      // Assume `response` is of type Response  
      setTimeout(() => {  


        // Use optional chaining with a type guard to safely check the user role  
        if (response.props?.auth?.user?.role === 'admin') {  
          window.location.href = '/dashboard';  
        } else if (response.props?.auth?.user?.role === 'professor') {  
          window.location.href = '/attendance';  
        } else {  
          window.location.href = '/dashboard';  
        }  
      }, 1500);  
      },
      onError: (errors) => {
        console.log('Login errors:', errors);
  
        let errorMessage = '';
  
        if (errors.username) {
          errorMessage += errors.username + ' ';
        }
        if (errors.email) {
          errorMessage += errors.email + ' ';
        }
        if (errors.password) {
          errorMessage += errors.password;
        }
  
        if (!errorMessage.trim()) {
          errorMessage = 'Invalid credentials. Please try again.';
        }
  
        setAlertType('error');
        setAlertMessage(errorMessage.trim());
        setShowAlert(true);
      }
    });
  };
  
  // Auto-hide alert after 5 seconds
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <>
      <Head title="Attendance Management System" />
      <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6">
        <div className="w-full max-w-[600px] rounded-lg border border-gray-200 shadow-lg p-8 md:p-12">
          <div className="mb-10 text-center">
            <h1 className="mb-1 text-2xl md:text-3xl font-bold">ប្រព័ន្ធគ្រប់គ្រងអវត្តមានសិស្ស</h1>
            <p className="text-gray-600 text-sm">Attendance Management System</p>
          </div>
          
          {/* Alert Message */}
          {showAlert && (
            <div className={`mb-4 p-4 rounded-lg text-white ${alertType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
              {alertMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={data.username || data.email}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.includes('@')) {
                      setData('email', value);
                      setData('username', '');
                    } else {
                      setData('username', value);
                      setData('email', '');
                    }
                  }}
                  className="w-full rounded-full bg-gray-200 px-6 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  placeholder="Username or Email"
                  required
                />
              </div>
              
              <div>
                <input
                  type="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className="w-full rounded-full bg-gray-200 px-6 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  placeholder="Password"
                  required
                />
                {errors.password && (
                  <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                )}
              </div>
              
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={!!data.remember}
                    onChange={(e:any) => setData('remember', e.target.checked)}
                    className="h-4 w-4 accent-yellow-600"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm">
                    ចងចាំខ្ញុំ
                  </label>
                </div>
                <div>
                  <a href="/forgot-password" className="text-sm text-gray-600 hover:underline">
                    ភ្លេចពាក្យសម្ងាត់?
                  </a>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={processing}
                className="w-full rounded-full bg-yellow-600 py-4 font-medium text-white hover:bg-yellow-700 transition-colors disabled:opacity-70"
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