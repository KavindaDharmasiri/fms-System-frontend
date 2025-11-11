import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RuleGroupTest} from "../rule-group-test/rule-group-test.component";
import {FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {ApiPageReqDTO} from "../../../shared/dto/ApiPageReqDTO";
import {RuleGroupService} from "../../services/rule-group/rule-group.service";
import {ToastrService} from "ngx-toastr";
import { v4 as uuidv4 } from 'uuid';
import {HttpErrorResponse} from "@angular/common/http";
import {RuleService} from "../../services/rule/rule.service";
import {EfmsRuleDTO} from "../../../shared/dto/EfmsRuleDTO";
import {PaymentNetworkDTO} from "../../../shared/dto/PaymentNetworkDTO";
import {RoleDTO} from "../../../shared/dto/RoleDTO";
import {RuleGroupRuleDTO} from "../../../shared/dto/RuleGroupRuleDTO";
import {RuleGroupRoleDTO} from "../../../shared/dto/RuleGroupRoleDTO";
import {RuleGroupDTO} from "../../../shared/dto/RuleGroupDTO";
import {
  ReactionTemplateService
} from "../../services/reactionTemplate/reaction-template.service";
import {ReactionTemplateDTO} from "../../../shared/dto/ReactionTemplateDTO";

declare var DualListbox: any;

@Component({
  selector: 'app-new-rule-group',
  templateUrl: './new-rule-group.component.html',
  styleUrl: './new-rule-group.component.scss'
})
export class NewRuleGroupComponent implements OnInit {
  protected ruleGroupForm:FormGroup;
  protected isEditMode: boolean = false;
  protected ruleGroupUuid: string =this.generateCode();
  protected ruleGroupId: string = '';
  protected ruleGroup: RuleGroupDTO = new RuleGroupDTO();
  protected paymentNetworks: PaymentNetworkDTO[] = [];
  protected allRules: EfmsRuleDTO[] = [];
  protected allRoles: RoleDTO[] = []
  protected reactionTemplates: ReactionTemplateDTO[] = []
  protected ruleGroupRuleCollection: RuleGroupRuleDTO[] = [];
  protected ruleGroupRoleCollection: RuleGroupRoleDTO[] = [];
  protected tempRuleGroupRuleMap: Map<Number,RuleGroupRuleDTO> = new Map<Number,RuleGroupRuleDTO>();
  protected tempRuleGroupRoleMap: Map<Number,RuleGroupRoleDTO> = new Map<Number,RuleGroupRoleDTO>();

  actionType: string = "";
  id: string ='';
  title: string = '';
  dateTime: any;
  selected:any;

  dropdownSingal = 'Active';



  // reactionTemplates: any[] = [{
  //     reactionTemplateId:1,
  //     templateName:"Template1"
  //   },
  //   {
  //     reactionTemplateId:2,
  //     templateName:"Template2"
  // }];



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private ruleGroupService:RuleGroupService,
    private ruleService:RuleService,
    private reactionTemplateService: ReactionTemplateService,
    private toastrService:ToastrService,
    private fb:FormBuilder) {
    this.ruleGroupForm = this.fb.group({
      paymentNetworkId: ['', Validators.required],
      groupName: ['', Validators.required],
      verdict: ['', Validators.required],
      reactionTemplateId: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      status: [false],
    })

  }

  @ViewChild('selectRef', { static: true }) selectRef!: ElementRef<HTMLSelectElement>;
  dualListboxInstance: any;

  ngOnInit(): void {
    this.ruleGroupId = this.route.snapshot.paramMap.get('id') || '';
    this.isEditMode = this.router.url.includes("edit-rule-group") && this.ruleGroupId !== '';
    this.isEditMode && this.getRuleGroup()

    this.getPaymentNetworks()
    this.getRules()
    this.getRoles()
    this.getReactionTemplates()

    if (typeof DualListbox === 'undefined') {
      console.error('DualListbox is not loaded correctly.');
      return;
    }
  }

  generateCode(): string {
    const prefix = 'RG';
    const randomNumber = Math.floor(1000000 + Math.random() * 9000000); // ensures 7 digits
    return `${prefix}${randomNumber}`;
  }
  ngAfterViewInit(): void {
    // this.initializeDualListbox();
  }
  openModal(){
    if (this.ruleGroupForm.invalid) {
      this.ruleGroupForm.markAllAsTouched();
      this.toastrService.error("Please fill all the required fields");
      // return;
    }

    const payload = {
      ...this.ruleGroupForm.value,
      ruleGroupUuid: uuidv4(),
      ruleGroupRuleCollection: this.ruleGroupRuleCollection,
      ruleGroupRoleCollection: this.ruleGroupRoleCollection
    };

    let dialogRef = this.dialog.open(RuleGroupTest, {
      width: '600px',
      data: payload
    });

  }

  handleResetForm(){
   if (this.isEditMode){
     this.getRuleGroup()

   }else {
     this.ruleGroupForm.reset()
   }

    this.resetDualListBox();
  }

  compareRoles = (a: any, b: any): boolean => {
    return a?.roleId === b?.roleId;
  };

  resetDualListBox() {

    const selectEl = this.selectRef.nativeElement;
    const parent = selectEl.parentElement;

    if (parent) {
      // Step 1: Remove the DualListbox wrapper if it exists
      const wrapper = parent.querySelector('.dual-listbox');
      if (wrapper) {
        wrapper.remove();
      }

      // Step 2: Re-attach the original <select> element
      parent.appendChild(selectEl);
    }

    // Step 3: Clear and repopulate <select> options
    selectEl.innerHTML = '';
    for (const rule of this.allRules) {
      const option = document.createElement('option');
      option.value = rule.fmsRuleId!.toString();
      option.text = rule.ruleName!;

      if (this.tempRuleGroupRuleMap.get(rule.fmsRuleId!)) {
        option.setAttribute('selected', 'selected');
        // console.log( option)
      }
      selectEl.appendChild(option);
    }

    // Step 4: Re-initialize the DualListbox
    this.initializeDualListbox();

  }


  initializeDualListbox(): void {
    this.dualListboxInstance = new DualListbox(this.selectRef.nativeElement, {
      availableTitle: 'Available Items',
      selectedTitle: 'Selected Items',

      // Phosphor Icons for buttons
      addButtonText: '<button class="btn btn-secondary"><i class="ph ph-caret-right"></i></button>',
      removeButtonText: '<button class="btn btn-secondary"><i class="ph ph-caret-left"></i></button>',
      // addAllButtonText: '<button class="btn btn-secondary"><i class="ph ph-caret-double-right"></i></button>',
      // removeAllButtonText: '<button class="btn btn-secondary"><i class="ph ph-caret-double-left"></i></button>',

      sortable: true,
      upButtonText: '<button class="btn btn-secondary"><i class="ph ph-arrow-upt"></i></button>',
      downButtonText: '<button class="btn btn-secondary"><i class="ph ph-arrow-down"></i></button>',

      draggable: true,

      addEvent: (value: any) => console.log('Added:', value),
      removeEvent: (value: any) => console.log('Removed:', value),
    });
    setTimeout(() => {
      this.addSearchIcons();
    }, 500);

    this.dualListboxInstance.addEventListener('added', (event: any) => {
      console.log('Item added:', event.addedElement);
      this.getRuleValues();

    });

    this.dualListboxInstance.addEventListener('removed', (event: any) => {
      console.log('Item removed:', event.removedElement);
      this.getRuleValues();
    });



  }
  addSearchIcons(): void {
    document.querySelectorAll('.dual-listbox__search').forEach((input) => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('search-input-wrapper');

      const icon = document.createElement('i');
      icon.classList.add('ph', 'ph-magnifying-glass', 'search-icon');

      input.parentNode?.insertBefore(wrapper, input);
      wrapper.appendChild(input);
      wrapper.appendChild(icon);
    });
  }

  getRuleValues() {
    const selectedOptions = Array.from(this.selectRef.nativeElement.selectedOptions);
    const selectedOptionIds = selectedOptions.map((option: any) => Number.parseInt(option.value));
    // this.ruleGroupRuleCollection = selectedOptions.map((option: any) => option.value);
    this.ruleGroupRuleCollection = this.allRules.filter(rule =>
      rule.fmsRuleId && selectedOptionIds.includes(rule.fmsRuleId));
  }

  getRoleValues(){
    // console.log(this.ruleGroupRoleCollection)
  }

  isRuleSelected(ruleId: any): boolean {
    // console.log(this.ruleGroupRuleCollection.some((selectedRule: any) => selectedRule.efmsRuleId === ruleId));
    return this.ruleGroupRuleCollection.some((selectedRule: any) => selectedRule.efmsRuleId === ruleId);
  }

  isRoleSelected(roleId: any): boolean {
    // console.log(this.ruleGroupRuleCollection.some((selectedRule: any) => selectedRule.efmsRuleId === ruleId));
    return this.ruleGroupRoleCollection.some((selectedRule: any) => selectedRule.efmsRuleId === roleId);
  }


  saveRuleGroup(){

    if (this.ruleGroupForm.invalid) {
      this.ruleGroupForm.markAllAsTouched();
      this.toastrService.error("Please fill all the required fields");
      return;
    }

    this.ruleGroupService.saveRuleGroup({
      ...this.ruleGroupForm.value,
      status:this.ruleGroupForm.value.status ? "ACTIVE" : "INACTIVE",
      ruleGroupUuid:this.ruleGroupUuid,
      ruleGroupRuleCollection:this.ruleGroupRuleCollection,
      ruleGroupRoleCollection:this.ruleGroupRoleCollection
    }).subscribe(res=>{
      // console.log(res);

      this.ruleGroupService.loadRules().subscribe({
        next: (response: any) => {

        }, error: (error: HttpErrorResponse) => {
          console.error('Error loading landing set Rules:', error.message);
        }
      });

      this.toastrService.success("Rule Group Saved Successfully");
      this.router.navigate(['/configurations/rule-group']);
      // this.ruleGroupRuleCollection = [];
      // this.ruleGroupRoleCollection = [];
      // this.handleResetForm()
    })
  }

  editRuleGroup(){
    if (this.ruleGroupForm.invalid) {
      this.ruleGroupForm.markAllAsTouched();
      this.toastrService.error("Please fill all the required fields");
      return;
    }

    this.ruleGroupService.updateRuleGroup({
      ...this.ruleGroupForm.value,
      status:this.ruleGroupForm.value.status ? "ACTIVE" : "INACTIVE",
      ruleGroupUuid:this.ruleGroup.ruleGroupUuid || this.ruleGroupUuid,
      ruleGroupId: this.ruleGroupId,
      ruleGroupRuleCollection:this.ruleGroupRuleCollection
        .map(rule=> this.tempRuleGroupRuleMap.get(<Number>rule.efmsRuleId) || {...rule, ruleGroupId: this.ruleGroupId}),
      ruleGroupRoleCollection:this.ruleGroupRoleCollection
        .map(role=> this.tempRuleGroupRoleMap.get(<Number>role.roleId) || {...role, ruleGroupId: this.ruleGroupId})
    }).subscribe(res=>{
      // this.getRuleGroup();
      // this.handleResetForm();

      this.ruleGroupService.loadRules().subscribe({
        next: (response: any) => {

        }, error: (error: HttpErrorResponse) => {
          console.error('Error loading landing set Rules:', error.message);
        }
      });

      this.toastrService.success("Rule Group Updated Successfully");
      this.router.navigate(['/configurations/rule-group']);
    })
  }

  getRuleGroup(){

    const id = Number.parseInt(this.ruleGroupId);

    if (isNaN(id)) {
      this.toastrService.error("Invalid Rule Group ID");
      return;
    }

    this.ruleGroupService.getRuleGroupById(id).subscribe(res=>{
      if (res.success === false) {
        this.toastrService.error("Error Fetching Rule Group");
        return;
      }

      if (res.data === null) {
        this.toastrService.error("Rule Group Not Found");
        return;
      }else{
        this.ruleGroup = res.data;
        this.ruleGroupUuid = res.data.ruleGroupUuid || this.generateCode();
        this.ruleGroupForm.patchValue({
          ...res.data,
          status: res.data.status === "ACTIVE" ? true : false,
        });
        this.ruleGroupRuleCollection = res.data?.ruleGroupRuleCollection || [];
        this.ruleGroupRoleCollection = res.data?.ruleGroupRoleCollection || [];

        this.tempRuleGroupRuleMap = new Map<number, RuleGroupRuleDTO>(
          this.ruleGroupRuleCollection
            .filter(rule => rule.efmsRuleId !== undefined)
            .map(rule => [rule.efmsRuleId!, rule])
        );

        this.tempRuleGroupRoleMap = new Map<number, RuleGroupRoleDTO>(
          this.ruleGroupRoleCollection
            .filter(role => role.roleId !== undefined)
            .map(role => [role.roleId!, role])
        );

        this.resetDualListBox();
      }
    })
  }

  private getPaymentNetworks() {
    this.ruleGroupService.getPaymentNetworks().subscribe({
      next: (response: any) => {
        this.paymentNetworks = response.data;
      }, error: (error: HttpErrorResponse) => {
        console.error('Error loading landing details:', error.message);
      }
    });
  }

  private getRoles() {
    this.ruleGroupService.getAllRoleNames().subscribe({
      next: (response: any) => {

        if (!response) {
          this.toastrService.error("Error Fetching Roles");
          return;
        }

        this.allRoles = response;
      }, error: (error: HttpErrorResponse) => {
        console.error('Error loading landing details:', error.message);
      }
    });
  }

  private getRules() {
    this.ruleService.filterEfmsRules(new EfmsRuleDTO(), new ApiPageReqDTO(0,10000)).subscribe({
      next: (response) => {


        if (response.success === false) {
          this.toastrService.error("Error Fetching Rules");
          return;
        }

        if (response.data === null) {
          this.toastrService.error("Rules Not Found");
          return;
        }else{
          this.allRules = response.data;
          this.resetDualListBox();
        }

      }, error: (error: HttpErrorResponse) => {
        console.error('Error loading landing details:', error.message);
      }
    });
  }


  private getReactionTemplates() {

    this.reactionTemplateService.getAllData().subscribe(res => {
      this.reactionTemplates = res.data;
    });
  }
}
