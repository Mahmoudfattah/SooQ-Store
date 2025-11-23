//we make this page to prevent the defualt behaiver of react 
import {useEffect}from 'react'
import { useLocation } from 'react-router-dom';

export default function ScolledToTop() {

    const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
