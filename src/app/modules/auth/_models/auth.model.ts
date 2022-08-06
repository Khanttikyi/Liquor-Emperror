export class AuthModel {
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;
  username?: string
  firstName?: string
  lastName?: string
  id?: number
  setAuth(auth: any) {
    this.accessToken = auth.token;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;
    this.username = auth.username;
    this.id = auth.employeeId;
    this.firstName = auth.firstName;
    this.lastName = auth.lastName;
  }
}
