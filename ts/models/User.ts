class User {
  id: number;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  constructor(id: number, name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = false;
    this.id = id;
  }
}
export default User;
