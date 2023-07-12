/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect } from 'react';
import { Toaster } from './components/ui/Toaster';
import MainLayout from './layouts/MainLayout';
import { useAppDispatch } from './redux/hook';
import { setLoading, setUser } from './redux/features/user/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase.config';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email!));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);

  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
}

export default App;
