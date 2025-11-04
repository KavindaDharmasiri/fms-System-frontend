import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Injectable } from "@angular/core";
// import { RolesDto } from "../models/common/RolesDto";
// import { LoginService } from "../services/public/login/login.service";
// import { NgxPermissionsService, NgxRolesService } from "ngx-permissions";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root', // This ensures the service is available globally
})
export class AuthGuard implements CanActivate {
  // constructor(private router: Router,
  //             private authService: AuthService) {}

  // listOfRoles: Array<RolesDto> = [];
  // listOfRolesRequired: Array<RolesDto> = [];

  constructor(
    // private _selfLoginService:LoginService,
              private router: Router,
              // private permissionsService: NgxPermissionsService,
              // private rolesService: NgxRolesService
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // console.log(next.data['permissions']?.only);
    //
    // if(this._selfLoginService.isUserLoggedIn()){
    //   // this.getLoginRolesAndPermissions(next.data['permissions']?.only);
    //   return true
    //
    // }else{
    //
    //   // console.log("Not logged");
    //   this.router.navigate(['/login']);
    //   this.permissionsService.flushPermissions();
    //   this.getLoginRolesAndPermissions(next.data['permissions']?.only);
    //   //this.configService.logOut("Permissions changed please login agian");
    //   return false;
    // }
    return true;

  }

  // getLoginRolesAndPermissions(requiredPermissions: string[]) {
  //
  //   let myList : Array<string>[]=[];
  //
  //   const permissionsString = sessionStorage.getItem("PERMISSIONS");
  //
  //   if (permissionsString) {
  //     const permissions = JSON.parse(permissionsString);
  //     const privileges = permissions.privileges;
  //
  //     this.listOfRoles = privileges;
  //   }
  //
  //
  //   console.log(this.listOfRoles);
  //   console.log(requiredPermissions);
  //
  //   this.listOfRolesRequired = this.findMatchingRoles(requiredPermissions, this.listOfRoles);
  //
  //   console.log(this.listOfRolesRequired)
  //
  //   let map1 = new Map();
  //   for (let r = 0; r < this.listOfRolesRequired.length; r++) {
  //     for(let c = 0; c < this.listOfRolesRequired[r].privilegesList.length; c++){
  //       if(this.listOfRolesRequired[r].privilegesList[c] != null ){
  //         // myList.push(this.listOfRoles[r].privilegesList[c].name )
  //         // @ts-ignore
  //         myList.push(this.listOfRolesRequired[r].privilegesList[c]);
  //         console.log(myList)
  //       }else{
  //       }
  //     }
  //     if( typeof myList !== 'undefined' && myList.length === 0){
  //
  //     }else{
  //       map1.set(this.listOfRolesRequired[r].name,myList);
  //     }
  //     myList=[];
  //   }
  //
  //   console.log(myList)
  //   let jsonObject :any= {};
  //   map1.forEach((value, key) => {
  //     jsonObject[key] = value
  //   });
  //   //console.log("222222222222 "+JSON.stringify(jsonObject));
  //   this.permissionsService.flushPermissions();
  //   this.rolesService.flushRoles();
  //   console.log(jsonObject);
  //   this.rolesService.addRolesWithPermissions(jsonObject)
  // }
  //
  // findMatchingRoles(requiredRoles: string[], listOfRoles: RolesDto[]): RolesDto[] {
  //   // Filter the list of roles to find matches in the requiredRoles array
  //   return listOfRoles.filter(role => requiredRoles.includes(role.name));
  // }

}

