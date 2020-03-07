import {  Injectable}from '@angular/core';
import {  AngularFireDatabase, AngularFireList}from '@angular/fire/database';
import {  AngularFireAuth}from '@angular/fire/auth';
import {  User}from './user';
import {  SocialUser}from "angularx-social-login";
import {  map}from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private dbPath = '/Users';
  UsersRef: AngularFireList < User > = null;
  public user: SocialUser;
  public loggedIn: boolean;
  public Users: any;
  public userLogin = null;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  getPassWordUser :any;
  alert= null;
  constructor( public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
          this.UsersRef = db.list(this.dbPath);
          this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('usercurrent')));
          this.currentUser = this.currentUserSubject.asObservable();

      }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
// login with social
//   signInWithGoogle(): void {
//       this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);

//   }

//   signInWithFB(): void {
//       this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
//   }

  signOut(): void {

  }

  //login
  authentication(email, password) {
      this.Users = this.UsersRef.snapshotChanges()
          .pipe(map(items => { // <== new way of chaining
              return items.map(a => {
                  const data = a.payload.val();
                  const key = a.payload.key;
                  return {
                      key, ...data
                  }; // or {key, ...data} in case data is Obj
              });
          })).subscribe(user => { // kiem tra user co trong database hay ko ?
              this.userLogin = user.find(u => u.Email === email && u.Password === password)
              setTimeout(() => {
                  if (!this.userLogin) {
                      alert("incorrect email or password !");
                      this.alert ="incorrect email or password !";
                  } else {
                    alert(" Đăng nhập thành công...");
                    localStorage.setItem('usercurrent',JSON.stringify(this.userLogin));
                     this.currentUserSubject.next(this.userLogin);
                     this.alert = " login success..."
                     location.reload();
                  }

              }, 3000)
          });

  }

  //logout user
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('usercurrent');
    this.currentUserSubject.next(null);
    location.reload();
}
  // register user
  createUser(User: User): void {
      this.UsersRef.push(User);
  }
  //reset password with email
  resetPasswor(email){
    this.UsersRef.valueChanges().subscribe(user => {
        this.getPassWordUser = user.find(u => u.Email === email)
    })
    setTimeout(()=>{
        if(this.getPassWordUser){
        alert("Mật khẩu của "+email +" là : "+this.getPassWordUser.Password)
        }else{
            alert("Không tồn tại tài khoản "+email+" trong dữ liệu !")
        }
    },3000)

  }
  // update data User
  updateUser(key: string, value: any) {
      this.UsersRef.update(key, value);
  }

  deleteUser(key: string): Promise < void > {
      return this.UsersRef.remove(key);
  }

  getUsersList(): AngularFireList < User > {
      return this.UsersRef;
  }

  deleteAll(): Promise < void > {
      return this.UsersRef.remove();
  }
  getUserDetail() {
      console.log("get user detail affter logged");
  }
  snapshotChanges() {
      throw new Error("Method not implemented.");
  }
}
