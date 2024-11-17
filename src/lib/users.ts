

export interface User {
    id: number;
    email: string;
    password: string;
    name: string;
  }
  
  export const users: User[] = [
    { id: 1, email: 'dinguibedajunior@gmail.com', password: '123', name: 'Admin' },
    { id: 2, email: 'user@example.com', password: 'user123', name: 'User' },
  ];
  