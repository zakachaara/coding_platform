import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setConfig } from '../store/slices/configSlice';

export default function ClientInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("✅ ClientInitializer running in the browser"); // debug
    const fetchConfig = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/configuration`);
      const data = await res.json();
      console.log(data)
      dispatch(setConfig(data));
    };

    fetchConfig();
  }, [dispatch]);

  return null; // No visible output, just initializes data
}
