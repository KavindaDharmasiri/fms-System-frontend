import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {TransactionDto} from "../dto/transactionDto";
import {TransactionService} from "../service/transaction.service";
import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {throwError} from "rxjs";

export interface PeriodicElement {
  name: string;
  position: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen' },
  { position: 2, name: 'Helium' },
];

@Component({
  selector: 'app-rule-testing-validation',
  templateUrl: './rule-testing-validation.component.html',
  styleUrl: './rule-testing-validation.component.scss'
})
export class RuleTestingValidationComponent implements OnInit{

  constructor(private tranService:TransactionService) {
  }

  displayedColumns: string[] = [
    'position',
    'name',
    'action',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  selectedTransactionDataset: string | null = null;
  upload:boolean = false;

  fileUpload(){
    this.upload = true;
    console.log(this.upload);
  }


  ngOnInit(): void {
    console.log(this.upload);
  }


  onFileSelected(event: any) {
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
    const lines = csvText.split('\n').map(line => line.trim()).filter(line => line !== '');
    const data: TransactionDto[] = [];

    if (lines.length < 2) {
      console.error('CSV must have headers and at least one row of data');
      return;
    }

    const headers = lines[0].split(',').map(h => h.trim()); // Extract column headers
    const dataRows = lines.slice(1); // Exclude headers from data

    for (let line of dataRows) {
      const values = line.split(',').map(value => value.trim());

      const rowObject: any = {};
      for (let i = 0; i < headers.length; i++) {
        rowObject[headers[i]] = values[i] ?? ''; // Safely assign columns
      }

      let tran = new TransactionDto();
      tran.transactionHistoryId = 0;
      tran.tranUuid = '';
      tran.status = "ACTIVE";

      // You can either serialize the full row or pick specific columns
      // Option 1: store full JSON string
      tran.tranPacket = JSON.stringify(rowObject);

      // Option 2: construct a string manually
      // tran.tranPacket = `Amount: ${rowObject.Amount}, AccountNo: ${rowObject.AccountNo}, Date: ${rowObject.Date}`;

      data.push(tran);
    }

    console.log(data);

    this.tranService.saveTransaction(data).pipe(
          catchError(
              (err) =>{
                console.log(err)
                Swal.fire(
                    ""+err.error.message,
                    '' ,
                    'error'
                );
                return throwError(err);
              }
          )
      ).subscribe(
          (res:any)=>{
            if(res.success){
              Swal.fire(
                  res.data,
                  '' ,
                  'success'
              );
            }else {
              Swal.fire(
                  "Transaction Save Unsuccessful",
                  '' ,
                  'error'
              );

            }
          }

      )
  }





  // parseCSV(csvText: string) {
  //   const lines = csvText.split('\n');
  //   const data: any[] = [];
  //   let tran=new TransactionDto();
  //   let num = 1;
  //   for (let line of lines) {
  //     const trimmedLine = line.trim();
  //     if (trimmedLine) {
  //
  //       let tran=new TransactionDto();
  //        tran.transactionHistoryId=0;
  //        tran.tranUuid='';
  //        tran.tranPacket=trimmedLine;
  //        tran.status="ACTIVE";
  //        data.push(tran);
  //     }
  //   }
  //   console.log(data)
  //
  //   // this.tranService.saveTransaction(data).pipe(
  //   //     catchError(
  //   //         (err) =>{
  //   //           console.log(err)
  //   //           Swal.fire(
  //   //               ""+err.error.message,
  //   //               '' ,
  //   //               'error'
  //   //           );
  //   //           return throwError(err);
  //   //         }
  //   //     )
  //   // ).subscribe(
  //   //     (res:any)=>{
  //   //       if(res.success){
  //   //         Swal.fire(
  //   //             res.data,
  //   //             '' ,
  //   //             'success'
  //   //         );
  //   //       }else {
  //   //         Swal.fire(
  //   //             "Transaction Save Unsuccessful",
  //   //             '' ,
  //   //             'error'
  //   //         );
  //   //
  //   //       }
  //   //     }
  //   //
  //   // )
  //
  // }
}
