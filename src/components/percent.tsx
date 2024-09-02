import { useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode"; 
import UserPercent from './perhandle/userH';
import AdminPercent from './perhandle/adminH';

export default function Percent() { 
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token); 
      setRole(decoded.userRole);
    }
  }, []);

  useEffect(() => {
    if (role === 'admin') {
      setAdmin(true);
      setUser(false);
    } else if (role === 'user') {
      setUser(true);
      setAdmin(false);
    } else {
      setUser(false);
      setAdmin(false);
    }
  }, [role]);

  return (  
    <> 
      {user && <UserPercent />}
      {admin && <AdminPercent />}
      
    </>  
  );  
}
