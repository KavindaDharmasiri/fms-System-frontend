import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {TransactionElementService} from "../../services/transaction-element/transaction-element.service";
import {HttpErrorResponse} from "@angular/common/http";
import {EfmsElementDTO} from "../../dto/field-configurator/efms-element.dto";
import {addDiagnosticChain} from "@angular/compiler-cli/src/ngtsc/diagnostics";
import {FieldDependenciesDTO} from "../../dto/field-configurator/field-dependencies.dto";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSelect} from "@angular/material/select";
import {map, Observable, startWith} from "rxjs";


export interface PeriodicElement {
  num: number;
  value: string;
}

export interface PeriodicElement2 {
  operators: string;
  id: number;
  fieldDependenciesId: number;
  value1: number;
  field: string;
  operator: string;
  value2: number;
}

@Component({
  selector: 'app-add-transaction-element',
  templateUrl: './add-transaction-element.component.html',
  styleUrl: './add-transaction-element.component.scss'
})
export class AddTransactionElementComponent implements OnInit {

  selectedSection: 'comparison' | 'list' | 'range' | 'boolean' = 'comparison';
  elementData: PeriodicElement[] = []
  fieldDependencies: PeriodicElement2[] = []
  dataSource = new MatTableDataSource<PeriodicElement>(this.elementData);
  dataSource2 = new MatTableDataSource<PeriodicElement2>(this.fieldDependencies)
  displayedColumns: string[] = ['number', 'value', 'action'];
  displayedColumns2: string[] = ['operators', 'value', 'field', 'operator', 'values', 'action'];
  addValueForm: FormGroup;
  fieldDependenciesForm: FormGroup;
  observableEfmsVariable: Observable<any[]> | undefined;
  num: number = 0;
  selectedStatus: any;
  selectedStatus2: any;
  selectedStatus3: any;
  selectedStatus4: any;
  form!: FormGroup;
  protected paymentNetwork: any[] = [];
  protected efmsElements: any[] = [];
  protected efmsOperators: any[] = [
    {id: "EQUAL", value: '='},
    {id: "NOT_EQUAL", value: '≠'},
    {id: "GREATER_THAN", value: '>'},
    {id: "LESS_THAN", value: '<'},
    {id: "GREATER_THAN_OR_EQUAL ", value: '>='},
    {id: "LESS_THAN_OR_EQUAL ", value: '<='},
    {id: "IN", value: 'IN'},
    {id: "NOT_IN", value: 'NOT IN'},
    {id: "BETWEEN", value: 'BETWEEN'},
    {id: "true", value: 'TRUE'},
    {id: "false", value: 'FALSE'},

  ];
  fdependenciesoperators = [
    {id: "EQUAL", value: '='},
    {id: "NOT_EQUAL", value: '≠'},
    {id: "GREATER_THAN", value: '>'},
    {id: "LESS_THAN", value: '<'},
    {id: "GREATER_THAN_OR_EQUAL ", value: '>='},
    {id: "LESS_THAN_OR_EQUAL ", value: '<='},
    {id: "IN", value: 'IN'},
    {id: "NOT_IN", value: 'NOT IN'},
    {id: "BETWEEN", value: 'BETWEEN'},
    {id: "true", value: 'TRUE'},
    {id: "false", value: 'FALSE'},
  ];
  private elementId: number = 0;
  private createdBy: string = '';
  mode: string = '';
  code: string = '';
  efmsVariable: any;
  isLoading: boolean = false;
  operatorsForm: FormGroup;

  constructor(public fb: FormBuilder, private transactionElementService: TransactionElementService, private route: ActivatedRoute,
              private router: Router) {
    this.selectedSection = "comparison";
    this.addValueForm = fb.group({
      value: [""]
    })

    this.fieldDependenciesForm = fb.group({
      value1: [0],
      operator: [""],
      efmsElement: [""],
      fdOperator: [""],
      value2: [0],
    })

    this.operatorsForm = fb.group({
      EQUAL: [false],
      NOT_EQUAL: [false],
      GREATERTHAN: [false],
      LESSTHAN: [false],
      GREATERTHAN_OR_EQUAL: [false],
      LESSTHAN_OR_EQUAL: [false],
      IN: [false],
      NOT_IN: [false]
    })
  }

  // ngOnInit(): void {
  //
  //   // @ts-ignore
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   this.createdBy =  user?.name;
  //
  //   this.route.queryParams.subscribe(params => {
  //     this.elementId = params['id'];
  //     this.mode = params['mode'];
  //     if (this.elementId !== undefined) {
  //       this.getUpdatableDTO(this.elementId)
  //     }
  //     // you can now use elementId to fetch data, etc.
  //   });
  //
  //   this.initializeForms();
  //   this.getPaymentNetwork();
  //   this.getElements();
  //   this.getVariableNames();
  // }

  breadcrumbTitle: string = '';

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem("user") || '{}');
    this.createdBy = user?.name;

    this.route.queryParams.subscribe(params => {
      this.elementId = params['id'];
      this.mode = params['mode']; // will be 'view' or undefined

      if (this.elementId !== undefined) {
        // Edit or View mode
        this.getUpdatableDTO1(this.elementId);
        this.getUpdatableDTO(this.elementId);
      } else {
        // Add new
        this.breadcrumbTitle = 'Add New Transaction Element';
      }

      this.initializeForms();
      this.getPaymentNetwork();
      this.getElements();
      this.getVariableNames();

    });
  }



// Fetch data and set dynamic breadcrumb title
  getUpdatableDTO1(id: number): void {
    this.transactionElementService.getDataById(id).subscribe((response: any) => {
      const transactionName = response.data.elementName;

      if (this.mode === 'view') {
        this.breadcrumbTitle = `${transactionName}`;
      } else {
        this.breadcrumbTitle = `${transactionName}`;
      }
    });
  }


  // addValue() {
  //     const periodicElement: PeriodicElement = {
  //       num: ++(this.num),
  //       value: this.addValueForm.get("value")?.value,
  //     };
  //     this.elementData.push(periodicElement)
  //   this.dataSource = new MatTableDataSource<PeriodicElement>(this.elementData);
  // }

  addValue() {
    const periodicElement: PeriodicElement = {
      num: this.dataSource.data.length + 1,
      value: this.addValueForm.get("value")?.value,
    };

    const isDuplicate = this.elementData.some(dep =>
      dep.value === periodicElement.value
    );

    if (isDuplicate) {
      --(this.num)
      Swal.fire("Invalid", "Duplicate entry detected!", "warning");
      return;
    }

    if (!periodicElement.value || periodicElement.value.trim() === "") {
      --(this.num)
      Swal.fire("Invalid", "Value cannot be empty!", "warning");
      return;
    }

    this.elementData.push(periodicElement)
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.elementData);
  }

  // addFieldDependencie() {
  //   console.log(this.fieldDependenciesForm.value)
  //   const fieldDep: PeriodicElement2 = {
  //     operators: this.fieldDependenciesForm.get("fdOperator")?.value,
  //     value1: this.fieldDependenciesForm.get("value1")?.value,
  //     field: this.fieldDependenciesForm.get("efmsElement")?.value,
  //     operator: this.fieldDependenciesForm.get("operator")?.value,
  //     value2: this.fieldDependenciesForm.get("value2")?.value,
  //     id: 0,
  //   }
  //   this.fieldDependencies.push(fieldDep);
  //   this.dataSource2 = new MatTableDataSource<PeriodicElement2>(this.fieldDependencies)
  //
  // }

  addFieldDependencie() {
    // console.log(this.fieldDependenciesForm.value);

    const fieldDep: PeriodicElement2 = {
      operators: this.fieldDependenciesForm.get("fdOperator")?.value,
      value1: this.fieldDependenciesForm.get("value1")?.value,
      field: this.fieldDependenciesForm.get("efmsElement")?.value,
      operator: this.fieldDependenciesForm.get("operator")?.value,
      fieldDependenciesId: this.fieldDependenciesForm.get("fieldDependenciesId")?.value,
      value2: this.fieldDependenciesForm.get("value2")?.value,
      id: 0,
    };

    const isDuplicate = this.fieldDependencies.some(dep =>
      dep.operators === fieldDep.operators &&
      dep.value1 === fieldDep.value1 &&
      dep.field === fieldDep.field &&
      dep.operator === fieldDep.operator &&
      dep.value2 === fieldDep.value2
    );

    if (isDuplicate) {
      Swal.fire("Invalid", "Duplicate field dependency detected!", "warning");
      return;
    }

    if (!fieldDep.operators || fieldDep.operators.trim() === "") {
      Swal.fire("Invalid", "Operator cannot be empty!", "warning");
      return;
    }

    if (!fieldDep.field || fieldDep.field === "") {
      Swal.fire("Invalid", "Element cannot be empty!", "warning");
      return;
    }

    if (!fieldDep.operator || fieldDep.operator.trim() === "") {
      Swal.fire("Invalid", "Operator cannot be empty!", "warning");
      return;
    }


    this.fieldDependencies.push(fieldDep);
    this.dataSource2 = new MatTableDataSource<PeriodicElement2>(this.fieldDependencies);

    this.fieldDependenciesForm.reset();
  }

  deleteData(element: PeriodicElement) {
    const index = this.dataSource.data.indexOf(element)
    console.log(element)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        if (index >= 0) {
          this.elementData.splice(index, 1);
          this.dataSource = new MatTableDataSource<PeriodicElement>([...this.elementData]);
        }
        Swal.fire({
          title: "Deleted!", text: "Your file has been deleted.", icon: "success"
        });
      }
    });

  }


  deleteData1(element: PeriodicElement2) {
    const index = this.dataSource2.data.indexOf(element)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        if (index >= 0) {
          if (element.id !== 0 || element.id !== undefined) {
            this.transactionElementService.deleteFieldDependencie(element.fieldDependenciesId).subscribe(res => {
                const index = this.fieldDependencies.indexOf(element);
                if (index >= 0) {
                  this.fieldDependencies.splice(index, 1);
                  this.dataSource2 = new MatTableDataSource<PeriodicElement2>(this.fieldDependencies);
                }
              },
              (error) => {
                const index = this.fieldDependencies.indexOf(element);
                if (index >= 0) {
                  this.fieldDependencies.splice(index, 1);
                  this.dataSource2 = new MatTableDataSource<PeriodicElement2>(this.fieldDependencies);
                }
              });
          }

        } else {
          const index = this.fieldDependencies.indexOf(element);
          if (index >= 0) {
            this.fieldDependencies.splice(index, 1);
            this.dataSource2 = new MatTableDataSource<PeriodicElement2>(this.fieldDependencies);
          }
        }
        Swal.fire({
          title: "Deleted!", text: "Your file has been deleted.", icon: "success"
        });
      }
    });

  }

  private getPaymentNetwork() {
    this.transactionElementService.getPaymentNetworks().subscribe({
      next: (response: any) => {
        this.paymentNetwork = response.data;
      }, error: (error: HttpErrorResponse) => {
        console.error('Error loading landing details:', error.message);
      }
    });
  }

  private initializeForms() {
    this.code = this.generateCode();
    this.form = this.fb.group({
      elementCode: [{value: this.code, disabled: true}],
      paymentNetworkId: ['', Validators.required],
      elementName: ['', Validators.required],
      variableName: ['', Validators.required],
      validation: ['', Validators.required],
      validationMessage: ['', Validators.required],
      comparisonOperator: [''],
      status: [false],
      listOperator: [''],
      value: [''],
      fdOperator: [''],
      efmsElement: [''],
      riskWeight: [0, Validators.required],
      rangeMax: [0],
      rangeMin: [0],
      booleanValue: [false]
    });
  }


  generateCode(): string {
    const prefix = 'RM';
    const randomNumber = Math.floor(1000000 + Math.random() * 9000000); // ensures 7 digits
    return `${prefix}${randomNumber}`;
  }


  private getElements() {
    this.transactionElementService.getByStatus().subscribe({
      next: (response: any) => {
        this.efmsElements = response.data;
      }, error: (error: HttpErrorResponse) => {
        console.error('Error loading landing details:', error.message);
      }
    });
  }

  OperatorChanging(selectedStatus2: any) {
    console.log(selectedStatus2)
    if (selectedStatus2 == "Comparison Operators") {
      this.efmsOperators = [
        {id: "EQUAL", value: '='},
        {id: "NOT_EQUAL", value: '≠'},
        {id: "GREATERTHAN", value: '>'},
        {id: "LESSTHAN", value: '<'},
        {id: "GREATERTHAN_OR_EQUAL ", value: '>='},
        {id: "LESSTHAN_OR_EQUAL ", value: '<='},
      ];
    }
    if (selectedStatus2 == "List Operators") {
      this.efmsOperators = [
        {id: "IN", value: 'IN'},
        {id: "NOT_IN", value: 'NOT IN'},
      ];
    }
    if (selectedStatus2 == "Range Operator") {
      this.efmsOperators = [
        {id: "BETWEEN", value: 'BETWEEN'},
      ];
    }
    if (selectedStatus2 == "Boolean Operators") {
      this.efmsOperators = [
        {id: "true", value: 'YES'},
        {id: "false", value: 'NO'},
      ];
    }
  }

  onSubmit() {
    this.form.markAllAsTouched();
    const valuesArray = this.dataSource.data.map(element => element.value);
    if (this.form.valid) {
      const operatorValues = this.operatorsForm.value;
      const comparisonOperators = Object.entries(operatorValues)
        .filter(([key, value]) =>
          ["EQUAL", "NOT_EQUAL", "GREATERTHAN", "LESSTHAN", "GREATERTHAN_OR_EQUAL", "LESSTHAN_OR_EQUAL"].includes(key) && value
        )
        .map(([key]) => key);

      const listOperators = Object.entries(operatorValues)
        .filter(([key, value]) =>
          ["IN", "NOT_IN"].includes(key) && value
        )
        .map(([key]) => key);

      let operators =
        [
          {"Comparison Operators": comparisonOperators},
          {"List Operators": listOperators},
          {
            "Range Operators": [{"rangeMin": this.form.get("rangeMin")?.value},
              {"rangeMax": this.form.get("rangeMax")?.value}]
          },
          {"Boolean Operators": this.form.get("booleanValue")?.value}
        ]

      if (this.addValueForm.valid) {
        if (this.fieldDependenciesForm.valid) {
          const variable=this.form.get("variableName")?.value;
          let var2;
          if(variable.value != undefined || variable.value !=null){
            var2=variable.value
          }else {
            var2=variable
          }
          let efmsElementDto: EfmsElementDTO = {} as EfmsElementDTO;
          efmsElementDto.efmsElementId = this.elementId;
          efmsElementDto.elementCode = this.form.get("elementCode")?.value;
          efmsElementDto.paymentNetworkId = this.form.get("paymentNetworkId")?.value;
          efmsElementDto.elementName = this.form.get("elementName")?.value;
          efmsElementDto.variableName = var2;
          efmsElementDto.validation = this.form.get("validation")?.value;
          efmsElementDto.validationMessage = this.form.get("validationMessage")?.value;
          efmsElementDto.riskWeight = this.form.get("riskWeight")?.value;
          efmsElementDto.operator = JSON.stringify(operators);
          efmsElementDto.value = JSON.stringify(valuesArray);
          efmsElementDto.status = this.form.get("status")?.value ? "ACTIVE" : "INACTIVE";
          // @ts-ignore
          const user = JSON.parse(localStorage.getItem("user"));
          // efmsElementDto.createdBy = this.createdBy;
          efmsElementDto.createdBy = "kav";
          // efmsElementDto.updatedBy = user?.name;
          efmsElementDto.updatedBy = "kav";
          efmsElementDto.description = 'sample description';

          let fieldDependenciesDTOList: FieldDependenciesDTO[] = [];
          this.dataSource2.data.forEach((item) => {
            let fieldDependenciesDTO: FieldDependenciesDTO = {} as FieldDependenciesDTO;

            fieldDependenciesDTO.mainOperator = item.operators;
            fieldDependenciesDTO.fieldDependenciesId = item.fieldDependenciesId;
            fieldDependenciesDTO.value = item.value1 + "";
            fieldDependenciesDTO.depOperator = item.operator;
            fieldDependenciesDTO.depValue = item.value2 + "";
            fieldDependenciesDTO.status = "ACTIVE";
            // @ts-ignore
            const user = JSON.parse(localStorage.getItem("user"));
            // fieldDependenciesDTO.createdBy = user?.name;
            fieldDependenciesDTO.createdBy = "kav";
            // fieldDependenciesDTO.updatedBy = user?.name;
            fieldDependenciesDTO.updatedBy = "kav";
            // @ts-ignore
            fieldDependenciesDTO.efmsElementId = item.field.efmsElementId;
            // @ts-ignore
            fieldDependenciesDTO.depElementId = item.field.efmsElementId;
            fieldDependenciesDTOList.push(fieldDependenciesDTO);
          });

          efmsElementDto.fieldDependenciesCollection = fieldDependenciesDTOList;

          console.log(efmsElementDto);


          this.transactionElementService.saveFieldConfiguration(efmsElementDto).subscribe(res => {
              Swal.fire({
                title: "Success!",
                text: "saved.",
                icon: "success"
              });
              this.resetFormForSave();
            },
            (error) => {
              // Swal.fire({
              //   title: "Error!",
              //   text: "Failed.",
              //   icon: "error"
              // });
              if (error.status === 500) {
                this.router.navigate([`/500`]);
              }
              if (error.status === 502) {
                this.router.navigate([`/502`]);
              }
              if (error.status === 503) {
                this.router.navigate([`/503`]);
              }
              if (error.status === 400) {
                this.router.navigate([`/400`]);
              }
              if (error.status === 401) {
                this.router.navigate([`/401`]);
              }
              if (error.status === 403) {
                this.router.navigate([`/403`]);
              }
              if (error.status === 404) {
                this.router.navigate([`/404`]);
              }
              if (error.status === 408) {
                this.router.navigate([`/408`]);
              }
              if (error.status === 429) {
                this.router.navigate([`/429`]);
              }
              if (error.status === 405) {
                Swal.fire({
                  title: "Error!",
                  text: "Element Name Already Exist.",
                  icon: "error"
                });
              }
              console.log(error)
            });


        }
      }
    } else {
      Swal.fire("Invalid", "Please fill all required fields!", "warning");
    }
  }

  private getUpdatableDTO(elementId: number) {
    this.transactionElementService.getDataById(elementId).subscribe(ress => {
      this.fieldDependencies = [];
      this.elementData = [];
      this.num = 0;
      const res = ress.data;
      const operatorArray = JSON.parse(res.operator);
      const elementValues = JSON.parse(res.value)
      elementValues.forEach((val: string) => {
        const periodicElement: PeriodicElement = {
          num: ++this.num,
          value: val
        };
        this.elementData.push(periodicElement);
      });
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.elementData);

      const checkboxValues: any = {
        EQUAL: false,
        NOT_EQUAL: false,
        GREATERTHAN: false,
        LESSTHAN: false,
        GREATERTHAN_OR_EQUAL: false,
        LESSTHAN_OR_EQUAL: false,
        IN: false,
        NOT_IN: false
      };

      const comparisonOp = operatorArray.find((op: {
        [x: string]: any;
      }) => op["Comparison Operators"])?.["Comparison Operators"] || [];
      const listOp = operatorArray.find((op: { [x: string]: any; }) => op["List Operators"])?.["List Operators"] || [];
      comparisonOp.forEach((op: string | number) => checkboxValues[op] = true);
      listOp.forEach((op: string | number) => checkboxValues[op] = true);

      const rangeOp = operatorArray.find((op: {
        [x: string]: string;
      }) => op['Range Operators'])?.['Range Operators'] || [];
      const booleanVal = operatorArray.find((op: {
        [x: string]: string;
      }) => op['Boolean Operators'])?.['Boolean Operators'] || false;

      // Extract rangeMin and rangeMax from the rangeOp array
      const rangeMin = rangeOp.find((r: { [x: string]: number; }) => r['rangeMin'])?.['rangeMin'] ?? 0;
      const rangeMax = rangeOp.find((r: { [x: string]: number; }) => r['rangeMax'])?.['rangeMax'] ?? 0;
      this.operatorsForm.patchValue(checkboxValues);
      this.form.patchValue({
        elementCode: res.elementCode,
        paymentNetworkId: res.paymentNetworkId,
        elementName: res.elementName,
        variableName: res.variableName,
        validation: res.validation,
        validationMessage: res.validationMessage,
        riskWeight: res.riskWeight,
        status: res.status == 'ACTIVE' ? true : false,
        rangeMax: rangeMax,
        rangeMin: rangeMin,
        booleanValue: booleanVal
      });

      this.createdBy = res.createdBy;
      res.fieldDependenciesCollection.forEach((item: any) => {
        let fieldDep: PeriodicElement2 = {} as PeriodicElement2;
        fieldDep.operators = item.mainOperator;
        fieldDep.fieldDependenciesId = item.fieldDependenciesId;
        fieldDep.value1 = item.value;
        fieldDep.field = item.depElement;
        fieldDep.operator = item.depOperator;
        fieldDep.value2 = item.depValue;
        fieldDep.id = item.id;

        this.fieldDependencies.push(fieldDep);
      });

      this.dataSource2 = new MatTableDataSource<PeriodicElement2>(this.fieldDependencies)
    }, error => {
      if (error.status === 500) {
        this.router.navigate([`/500`]);
      }
      if (error.status === 502) {
        this.router.navigate([`/502`]);
      }
      if (error.status === 503) {
        this.router.navigate([`/503`]);
      }
      if (error.status === 400) {
        this.router.navigate([`/400`]);
      }
      if (error.status === 401) {
        this.router.navigate([`/401`]);
      }
      if (error.status === 403) {
        this.router.navigate([`/403`]);
      }
      if (error.status === 404) {
        this.router.navigate([`/404`]);
      }
      if (error.status === 408) {
        this.router.navigate([`/408`]);
      }
      if (error.status === 429) {
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

    if (this.elementId !== undefined) {
      this.getUpdatableDTO(this.elementId)
      Swal.fire({
        title: "Reset!", text: "form has been reset.", icon: "success"
      });
    } else {
      // this.code = this.form.get('elementCode')?.value
      let tt = this.code
      this.form.reset();
      this.code = tt;
      this.form.get('elementCode')?.setValue(tt);
      // this.form.patchValue({
      //   elementCode:this.code
      // })

      this.elementData = [];
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.elementData);

      this.addValueForm.reset();
      this.fieldDependenciesForm.reset();

      this.fieldDependencies = [];
      this.dataSource2 = new MatTableDataSource<PeriodicElement2>(this.fieldDependencies);

      Swal.fire({
        title: "Cleared!", text: "form has been cleared.", icon: "success"
      });
    }
  }

  resetFormForSave() {
    let code = this.form.get('elementCode')
    this.form.reset();
    this.form.patchValue({
      elementCode: code
    })

    this.elementData = [];
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.elementData);

    this.addValueForm.reset();
    this.fieldDependenciesForm.reset();

    this.fieldDependencies = [];
    this.dataSource2 = new MatTableDataSource<PeriodicElement2>(this.fieldDependencies);

    this.router.navigate([`/configurations/transaction-element`]);
  }

  onFileSelected(event: any) {
    this.isLoading = true;
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const csvText = e.target.result;
        this.parseCSV(csvText);
      };
      reader.readAsText(file);
    }
  }

  parseCSV(csvText: string) {
    const lines = csvText.trim().split('\n');

    if (lines.length === 0) return;

    const headers = lines[0].split(',').map(h => h.trim()); // header columns
    if (!headers.includes('value')) {
      Swal.fire("Invalid", "CSV must contain a column named 'value'", "warning");
      this.isLoading = false;
      return;
    }
    const data: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(',').map(v => v.trim());

      const rowObj: any = {num: this.elementData.length + 1};
      headers.forEach((header, index) => {
        rowObj[header] = values[index] || '';
      });

      this.elementData.push(rowObj);
    }

    // this.elementData.push(data);
    this.dataSource = new MatTableDataSource<any>(this.elementData);
    this.isLoading = false;
  }


  private getVariableNames() {
    this.transactionElementService.getVariableName().subscribe({
      next: (response: any) => {
        this.efmsVariable = response.data;
          console.log("variable :" , this.efmsVariable)
        this.filteredEfmsVariable = [...this.efmsVariable];
          this.filterVariableMethod();
      }, error: (error: HttpErrorResponse) => {
        console.error('Error loading landing details:', error.message);
      }
    });
  }

  private filterVariableMethod(){
      this.observableEfmsVariable=this.form.get("variableName")?.valueChanges.pipe(
          startWith(''),
          map((variable) =>
              variable ? this.filterVariable(variable) : this.efmsVariable.slice()
          )
      )

  }

  filterVariable(name: any): any[] {
    console.log('Filtering by:', name, typeof name);

    const filterValue = typeof name === 'string' ? name.trim().toLowerCase() : '';

    if (!filterValue) return this.efmsVariable;

    return this.efmsVariable.filter((item: any) =>
      item.name?.toLowerCase().includes(filterValue)
    );
  }

  filterValue = '';
  filteredEfmsVariable: any[] = [];


  @ViewChild('hiddenInput') hiddenInput!: ElementRef;
  @ViewChild('variableSelect') variableSelect!: MatSelect;
  filterOptions() {
    const val = this.filterValue.toLowerCase();
    this.filteredEfmsVariable = this.efmsVariable.filter((option: { name: string; }) =>
      option.name.toLowerCase().includes(val)
    );
  }

  onOpenedChange(select: MatSelect) {
    this.filterValue = '';
    this.filteredEfmsVariable = [...this.efmsVariable];

    // Delay to allow panel to render
    setTimeout(() => {
      this.hiddenInput?.nativeElement?.focus();
    });
  }

  onClosed() {
    this.filterValue = '';
    this.filteredEfmsVariable = [...this.efmsVariable];
  }

  displayVariableName(value: any): string {
    // If value is already a string, return it
    if (typeof value === 'string') return value;

    // If value is an object with `name`, return name
    if (value && typeof value === 'object' && 'name' in value) {
      return value.name;
    }

    return '';
  }
}
