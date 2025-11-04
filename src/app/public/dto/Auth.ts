export class LoginDTO {
  username: string = ''; // Username is required
  password: string= ''; // Password is required

  // Constructor to initialize the object if needed
  constructor(data?: Partial<LoginDTO>) {
    Object.assign(this, data); // Assigns properties from an input object to this instance
  }
}
