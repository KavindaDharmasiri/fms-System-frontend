import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {
  AppUserPrivilegesServiceService
} from "../../../user-management/privilege-management/services/user-privileges-service/app-user-privileges-service.service";
import {RoleDTO} from "../../../user-management/DTOs/RoleDTO";
import {ReactionTemplateService} from "../../services/reactionTemplate/reaction-template.service";
import Swal from "sweetalert2";
import {ReactionTemplateDTO} from "../../../shared/dto/ReactionTemplateDTO";

@Component({
  selector: 'app-new-alerting-templates',
  templateUrl: './new-alerting-templates.component.html',
  styleUrl: './new-alerting-templates.component.scss'
})
export class NewAlertingTemplatesComponent implements OnInit{
  actionType: string = "";
  id: string ='';
  title: string = '';
  page_title: string = '';
  newAlertingForm: FormGroup;
  showDateTime: boolean = true;
  showSaveButton:boolean = false;
  showEditButton: boolean = false;
  showBackButton: boolean = false;
  showResetButton: boolean = false;
  roles: RoleDTO[] = [];

  constructor(
    private route: ActivatedRoute,
    private user_privileges_service: AppUserPrivilegesServiceService,
    private reactionTemplateService: ReactionTemplateService,
    public router:Router,
    private fb: FormBuilder) {
    this.newAlertingForm = this.fb.group({
      templateID: [{ value: '', disabled: true }],
      templateName: ["", Validators.required],
      subject: ["", Validators.required],
      status: [false],
      smsAlert: [false],
      smsBody: [""],
      emailBody: [""],
      emailAlert: [false],
      flaggedRules: [false],
      frmNotification: [false],
      userRole: [],
      frmBody: [""]
    })
  }

  // Function to generate an 8-digit alphanumeric ID
  generateDigitID(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Alphanumeric characters
    let result = '';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    return result;
  }
  ngOnInit(): void {
    this.actionType = this.route.snapshot.paramMap.get("action") || "";
    this.id = this.route.snapshot.paramMap.get("id") || "";

    if(this.actionType == 'add'){
      this.title = "New Alerting Template"
      this.page_title = "Add Alerting templates"
      this.showResetButton = true;
      this.showSaveButton = true;
      this.showBackButton = false;
      this.showEditButton = false;
      this.showDateTime = false;
      this.newAlertingForm.get("templateID")?.setValue(this.generateDigitID());
    }else if(this.actionType == 'view'){
      this.showBackButton = true;
      this.showEditButton = false;
      this.showResetButton = false;
      this.showSaveButton = false;
      this.showDateTime = false;
      this.page_title = "View Template";
      this.newAlertingForm.disable()
    }else if(this.actionType == 'edit'){
      this.showDateTime = false;
      this.page_title = "Edit Template"
      this.showEditButton = true;
      this.showResetButton = false;
      this.showBackButton = true;
    }

    this.getRoleNames();

    if (this.id !== "new"){
      this.getTemplate(this.id);
    }
  }

  addAlertingTemplate() {
    this.newAlertingForm.markAllAsTouched();
    if(this.newAlertingForm.valid){
      let reactiontemplate : ReactionTemplateDTO = {};
      reactiontemplate.templateUuid = this.newAlertingForm.get("templateID")?.value;
      reactiontemplate.reactionTemplateId = Number(this.id);
      reactiontemplate.templateName = this.newAlertingForm.get("templateName")?.value;
      reactiontemplate.subject = this.newAlertingForm.get("subject")?.value;
      reactiontemplate.status = this.newAlertingForm.get("status")?.value;
      reactiontemplate.smsEnabled = this.newAlertingForm.get("smsAlert")?.value;
      reactiontemplate.emailEnabled = this.newAlertingForm.get("emailAlert")?.value;
      reactiontemplate.smsBody = this.newAlertingForm.get("smsBody")?.value;
      reactiontemplate.emailBody = this.newAlertingForm.get("emailBody")?.value;
      // @ts-ignore
      const user = JSON.parse(localStorage.getItem("user"));
      // reactiontemplate.user = user?.name;
      reactiontemplate.user = "kav";

      reactiontemplate.includedFlaggedRules = this.newAlertingForm.get("flaggedRules")?.value;
      reactiontemplate.frmEnabled = this.newAlertingForm.get("frmNotification")?.value;
      reactiontemplate.frmBody = this.newAlertingForm.get("frmBody")?.value;
      reactiontemplate.roleids = this.newAlertingForm.get("userRole")?.value;

      this.reactionTemplateService.saveReactionTemplate(reactiontemplate).subscribe(data => {
          Swal.fire({
            title: "Success!",
            text: "Alerting Template Configuration Successfully Configured!",
            icon: "success"
          });
          this.router.navigate([`/configurations/reaction-templates`]);
      },
        (error) => {
          // Swal.fire({
          //   title: "Error!",
          //   text: "Failed!!.",
          //   icon: "error"
          // });
          if (error.status === 500) {
            this.router.navigate([`/500`]);
          }if (error.status === 502) {
            this.router.navigate([`/502`]);
          }if (error.status === 503) {
            this.router.navigate([`/503`]);
          }if (error.status === 400) {
            this.router.navigate([`/400`]);
          }if (error.status === 401) {
            this.router.navigate([`/401`]);
          }if (error.status === 403) {
            this.router.navigate([`/403`]);
          }if (error.status === 404) {
            this.router.navigate([`/404`]);
          }if (error.status === 408) {
            this.router.navigate([`/408`]);
          }if (error.status === 429) {
            this.router.navigate([`/429`]);
          }
          console.log(error)
        });
    }
  }

  toggletoView() {
    // this.showBackButton = true;
    // this.showEditButton = true;
    // this.showResetButton = false;
    // this.showSaveButton = false;
    // this.showDateTime = true;
    // this.page_title = "View Template";
    // this.newAlertingForm.disable()
    this.router.navigate([`/configurations/reaction-templates`]);
  }

  toggleToEdit() {
    this.showSaveButton = true;
    this.showEditButton = false;
    this.showBackButton = true;
    this.showResetButton = true;
    this.showDateTime = false;
    this.page_title = "Edit Template";
    this.newAlertingForm.enable()
  }

  private getRoleNames() {
    this.user_privileges_service.getAllRoleNames().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (err) => {
        console.error('Error fetching roles:', err);
      }
    });
  }

  private getTemplate(id: string) {
    this.reactionTemplateService.getSingleTemplate(id).subscribe(data => {
      this.newAlertingForm.patchValue({
        templateID:data.data.templateUuid,
        templateName:data.data.templateName,
        subject:data.data.subject,
        status:data.data.status == "true"?true:false,
        smsAlert:data.data.smsEnabled== "true"?true:false,
        emailAlert:data.data.emailEnabled== "true"?true:false,
        smsBody:data.data.smsBody,
        emailBody:data.data.emailBody,
        frmNotification:data.data.frmEnabled== "true"?true:false,
        flaggedRules:data.data.includedFlaggedRules== "true"?true:false,
        frmBody:data.data.frmBody,
        userRole:data.data.roleids
      });
      this.title = data.data.templateName;
    }, error => {
      if (error.status === 500) {
        this.router.navigate([`/500`]);
      }if (error.status === 502) {
        this.router.navigate([`/502`]);
      }if (error.status === 503) {
        this.router.navigate([`/503`]);
      }if (error.status === 400) {
        this.router.navigate([`/400`]);
      }if (error.status === 401) {
        this.router.navigate([`/401`]);
      }if (error.status === 403) {
        this.router.navigate([`/403`]);
      }if (error.status === 404) {
        this.router.navigate([`/404`]);
      }if (error.status === 408) {
        this.router.navigate([`/408`]);
      }if (error.status === 429) {
        this.router.navigate([`/429`]);
      }
      // Swal.fire({
      //   title: "Error!",
      //   text: "Failed to load data.",
      //   icon: "error"
      // });
    });
  }

  resetForm() {
    this.newAlertingForm.reset();
    this.newAlertingForm.patchValue({
      templateID: [this.generateDigitID()],
    })
  }
}
