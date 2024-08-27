import { useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode"; 
import UserTask from './manageTask/user';
import AdminTask from './manageTask/admin';
import TaskSearched from './manageTask/search';

export default function Tasks(props: any) { 
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [search, setSearch] = useState(false);

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
      setSearch(false);
    } else if (role === 'user') {
      setUser(true);
      setAdmin(false);
      setSearch(false);
    } else {
      setUser(false);
      setAdmin(false);
      setSearch(false);
    }
  }, [role]);

  return (  
    <> 
      {user && <UserTask />}
      {admin && <AdminTask />}
      {search && <TaskSearched searchTerm={props.searchTerm} />} 
    </>  
  );  
}
