import { useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode"; 
import UserTask from './manageTask/user';
import AdminTask from './manageTask/admin';

export default function Tasks(props: any) { 
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

  const searchTask=props.searchTerm
  const statusTask=props.filterStatus

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
      {user && <UserTask searchTerm={searchTask} filterStatus={statusTask}/>}
      {admin && <AdminTask searchTerm={searchTask}/>}
      
    </>  
  );  
}
