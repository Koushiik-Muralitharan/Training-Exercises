import { Component, OnInit } from '@angular/core';
import { TranactionsService } from '../../../Services/tranactions.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { transactionDetails } from '../../../models/Transactionmodel';
import { UserStorageService } from '../../../Storage/user-storage.service';
import { userdetails } from '../../../models/Usermodel';
import { AnalyticsComponent } from './analytics/analytics.component';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [FormsModule, CommonModule, AnalyticsComponent],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
})
export class TransactionComponent {
  transactionType: string = '';
  expenseTypes: string[] = [];
  chartLabels: number[] = [];
  chartColors: string[] = [];
  chartDataLabels: string[] = [];
  balance: number = 0;
  income: number = 0;
  expense: number = 0;
  transactions: transactionDetails[] = [];
  transactionAmount: number | null = null;
  transactionDate: string = '';
  expenseMethods: string = '';
  selectedTransactionIndex: number | null = null;
  ButtonName: string = 'Submit';
  currentDate!: string;
  transactionPopUp: Boolean = false;
  refreshFlag: boolean = false;

  constructor(
    private transactionService: TranactionsService,
    private userStorage: UserStorageService
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
    this.loadTransactions();
    this.transactionService.calculateTransaction();
    this.updateTransactionSummary();
  }

  ngDoCheck(): void {
    if (this.transactionService.goalChanges) {
      this.loadTransactions();
      this.updateTransactionSummary();
      this.transactionService.goalChanges = false;
    }
  }

  transactionModal(): Boolean {
    return (this.transactionPopUp = !this.transactionPopUp);
  }

  refreshContent() {
    this.refreshFlag = !this.refreshFlag;
  }

  updateTransactionSummary(): void {
    const index = this.transactionService.getLoggedUserIndex();
    const userArray: userdetails[] = this.userStorage.getUser();
    this.income = userArray[index].income;
    this.expense = userArray[index].expense;
    this.balance = userArray[index].balance;
  }

  onTransactionTypeChange(type: string): void {
    if (type === 'Income' || type === 'Expense') {
      this.expenseTypes = this.transactionService.getExpenseTypes(type);
    } else {
      this.expenseTypes = [];
    }
  }

  onChartChange(type: string): void {
    if (
      type === 'Food' ||
      type === 'Transport' ||
      type === 'Shopping' ||
      type === 'Entertainment' ||
      type === 'Expense'
    ) {
      const analytics = this.transactionService.getAnalyticsOption(type);
      this.chartLabels = analytics.data;
      this.chartColors = analytics.colors;
      this.chartDataLabels = analytics.labels;
    } else {
      this.chartLabels = [];
      this.chartColors = [];
      this.chartDataLabels = [];
    }
    this.refreshContent();
  }

  edit(tindex: number) {
    console.log(tindex);
    const index = this.transactionService.getLoggedUserIndex();
    const userArray: userdetails[] = this.userStorage.getUser();
    this.transactionType =
      userArray[index].transactions[tindex].transactionMethod;
    this.onTransactionTypeChange(this.transactionType);
    this.expenseMethods = userArray[index].transactions[tindex].expenseMethod;
    this.transactionAmount = userArray[index].transactions[tindex].amount;
    this.transactionDate = userArray[index].transactions[tindex].date;
    this.selectedTransactionIndex = tindex;
    this.ButtonName = 'Update';
    this.transactionModal();
  }

  delete(index: number) {
    this.transactionService.deleteTransaction(index);
    this.loadTransactions();
    this.onChartChange('Expense');
    this.transactionService.calculateTransaction();
    this.updateTransactionSummary();
    this.refreshContent();
  }

  onTransactionSubmit(form: NgForm) {
    if (this.selectedTransactionIndex !== null) {
      console.log('I am going to edit...');
      this.transactionService.editTransaction(
        this.selectedTransactionIndex,
        form
      );
      this.selectedTransactionIndex = null;
      this.ButtonName = 'Submit';
      this.onChartChange('Expense');
      this.refreshContent();
    } else {
      this.transactionService.addTransaction(form);
      this.onChartChange('Expense');
      this.refreshContent();
    }

    this.loadTransactions();
    this.transactionService.calculateTransaction();
    this.onChartChange('Expense');
    this.updateTransactionSummary();
    this.transactionModal();
  }

  loadTransactions(): void {
    this.transactions = this.transactionService.loggedUserTransaction();
    this.transactionService.calculateAnalytics();
  }

  exportToCSV() {
    const index = this.transactionService.getLoggedUserIndex();
    const userArray: userdetails[] = this.userStorage.getUser();
    const transactions = userArray[index].transactions;
    if (!transactions || transactions.length === 0) {
      alert('No transaction data found to export.');
      return;
    }
    let csvContent =
      'data:text/csv;charset=utf-8,' +
      'Transaction ID,User ID, Email ,Date, Amount, Category, Transaction Type \n';

    transactions.forEach((transaction) => {
      let row = `${transaction.tid},${transaction.id},${transaction.email},${transaction.date},${transaction.amount},${transaction.expenseMethod},${transaction.transactionMethod}`;
      csvContent += row + '\n';
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  }

  importFromCSV(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;
    const index = this.transactionService.getLoggedUserIndex();
    const userArray: userdetails[] = this.userStorage.getUser();

    if (!file) {
      alert('Please select a CSV file to import.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result as string;
      const rows = content.split('\n').slice(1);

      let newTransactions: transactionDetails[] = [];
      rows.forEach((row) => {
        const [
          transactionid,
          userid,
          email,
          date,
          amount,
          category,
          transactionType,
        ] = row.split(',');

        if (
          transactionid &&
          date &&
          amount &&
          category &&
          email &&
          transactionType &&
          userid
        ) {
          const transaction: transactionDetails = {
            tid: transactionid,
            id: userid,
            email: email,
            transactionMethod: transactionType,
            expenseMethod: category,
            amount: parseFloat(amount),
            date: date,
          };
          newTransactions.push(transaction);
        }
      });

      if (newTransactions.length > 0) {
        const existingTransactions = userArray[index].transactions;
        const updatedTransactions = [
          ...existingTransactions,
          ...newTransactions,
        ];
        userArray[index].transactions = updatedTransactions;
        this.userStorage.setUser(userArray);
        alert('Transactions successfully imported!');
        this.loadTransactions();
        this.transactionService.calculateTransaction();
        this.updateTransactionSummary();
        this.onChartChange('Expense');
        this.refreshContent();
      } else {
        alert('No valid transactions found in the file.');
      }
    };

    reader.readAsText(file);
  }
}
