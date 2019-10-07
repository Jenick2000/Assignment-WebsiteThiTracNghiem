import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './user';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
 
@Injectable({
  providedIn: 'root'
})
export class UsersService {
 
 
  private dbPath = '/Users';
  UsersRef: AngularFireList<User> = null;
  public user: SocialUser;
  public loggedIn: boolean;
  constructor(private authService: AuthService ,public afAuth: AngularFireAuth,public db: AngularFireDatabase) {
    this.UsersRef = db.list(this.dbPath);
    // gan du lieu vao user
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if(this.user){
        console.log(this.user.email);
        }
    });
  }
  // login with social
  
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  } 
 
  signOut(): void {
    this.authService.signOut();
  }

 
    

  // register user
  createUser(User: User): void {
    this.UsersRef.push(User);
  }
 
  updateUser(key: string, value: any): Promise<void> {
    return this.UsersRef.update(key, value);
  }
 
  deleteUser(key: string): Promise<void> {
    return this.UsersRef.remove(key);
  }
 
  getUsersList(): AngularFireList<User> {
    return this.UsersRef;
  }
 
  deleteAll(): Promise<void> {
    return this.UsersRef.remove();
  }
  getUserDetail(){
    console.log("get user detail affter logged");
  }
  snapshotChanges() {
    throw new Error("Method not implemented.");
  }
}
