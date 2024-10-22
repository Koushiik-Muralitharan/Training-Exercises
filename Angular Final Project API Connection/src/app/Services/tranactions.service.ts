import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { transactionDetails } from '../models/Transactionmodel';
import { userdetails } from '../models/Usermodel';
import { goalDetails } from '../models/goalsmodal';
import { UserStorageService } from '../Storage/user-storage.service';
import { userdetail } from '../models/GetUserModel';

@Injectable({
  providedIn: 'root',
})
export class TranactionsService {
  public goalChanges = false;
  private expenseOptions: Record<'Income' | 'Expense', string[]> = {
    Income: ['Salary', 'Bonus', 'Investment'],
    Expense: ['Food', 'Transport', 'Shopping', 'Entertainment'],
  };

  constructor(private userStorage: UserStorageService) {}

  getIncome(): number {
    const user: userdetails = this.userStorage.getUserDetail();
   
    return user.income;
  }
  getExpense(): number {
    const user: userdetails = this.userStorage.getUserDetail();
    return user.expense;
  }

  // to get the details of the logged user.
  getLoggedInUser(): userdetails {
    const user = sessionStorage.getItem('loggedInUser') || '{}';
    return JSON.parse(user);
  }

  // to get the index of the logged user.
  getLoggedUserIndex(): number {
    const userInfo = this.getLoggedInUser();
    const userArray: userdetails[] = this.userStorage.getUser();
    return userArray.findIndex((user) => user.id === userInfo.id);
  }

  // load the logged user transactions.
  loggedUserTransaction(): transactionDetails[] {
    const userArray: userdetail = this.userStorage.getUserDetailing();
    //const index = this.getLoggedUserIndex();
    console.log(userArray.balance);
    console.log(userArray.email);
    //console.log(userArray.id);
    //console.log(userArray.transactions)
    userArray.userTransaction.forEach(element => {
      console.log(element);
   });
    return userArray.userTransaction;
  }

  // change the expense categories based on the transaction.

  getExpenseTypes(transactionType: 'Income' | 'Expense'): string[] {
    return this.expenseOptions[transactionType] || [];
  }

  // filter the statistics.
  getAnalyticsOption(
    type: 'Expense' | 'Food' | 'Transport' | 'Shopping' | 'Entertainment'
  ): { data: number[]; labels: string[]; colors: string[] } {
    const analyticsData: Record<
      'Expense' | 'Food' | 'Transport' | 'Shopping' | 'Entertainment',
      { data: number[]; labels: string[]; colors: string[] }
    > = {
      Expense: {
        data: [
          (this.calculateAnalytics().foodCost / this.getExpense()) * 100,
          (this.calculateAnalytics().transportCost / this.getExpense()) * 100,
          (this.calculateAnalytics().shoppingCost / this.getExpense()) * 100,
          (this.calculateAnalytics().entertainmentCost / this.getExpense()) *
            100,
        ],
        labels: ['Food', 'Transport', 'Shopping', 'Entertainment'],
        colors: ['#b91d47', '#00aba9', '#2b5797', '#e8c3b9'],
      },
      Food: {
        data: [(this.calculateAnalytics().foodCost / this.getExpense()) * 100],
        labels: ['Food'],
        colors: ['#b91d47'],
      },
      Transport: {
        data: [
          (this.calculateAnalytics().transportCost / this.getExpense()) * 100,
        ],
        labels: ['Transport'],
        colors: ['#00aba9'],
      },
      Shopping: {
        data: [
          (this.calculateAnalytics().shoppingCost / this.getExpense()) * 100,
        ],
        labels: ['Shopping'],
        colors: ['#2b5797'],
      },
      Entertainment: {
        data: [
          (this.calculateAnalytics().entertainmentCost / this.getExpense()) *
            100,
        ],
        labels: ['Entertainment'],
        colors: ['#e8c3b9'],
      },
    };

    return analyticsData[type];
  }

  // add a transaction
  addTransaction(form: NgForm) {
    const userInfo = this.getLoggedInUser();
    const userArray = this.userStorage.getUser();
    const {
      transactionstype,
      expensetype,
      transactionAmount,
      transactiondate,
    } = form.value;
    const newTransaction: transactionDetails = {
      tid: Date.now() + '',
      id: userInfo.id,
      email: userInfo.email,
      transactionMethod: transactionstype,
      expenseMethod: expensetype,
      amount: parseInt(transactionAmount),
      date: transactiondate,
    };
    if (this.getLoggedUserIndex() > -1) {
      const index = this.getLoggedUserIndex();
      userArray[index].transactions.push(newTransaction);
      this.userStorage.setUser(userArray);
    } else {
      console.log('no such user exists...');
    }
    form.resetForm();
  }

  // load the income, expense, and balance.
  calculateTransaction(): void {
    const tranactions = this.loggedUserTransaction();
    const userArray: userdetails = this.userStorage.getUserDetail();

    if (this.getLoggedUserIndex() > -1) {
      const index = this.getLoggedUserIndex();
      userArray.income = 0;
      userArray.expense = 0;
      userArray.balance = 0;
      tranactions.forEach((tranaction) => {
        if (tranaction.transactionMethod === 'Income') {
          userArray.income += tranaction.amount;
        } else {
          userArray.expense += tranaction.amount;
        }
      });
      userArray.balance =
        userArray.income -
        (userArray.expense + this.totalSavings());
      //this.userStorage.setUser(userArray);
    } else {
      console.log('no such user exists...');
    }
  }

  // edit transaction.
  editTransaction(tindex: number, form: NgForm) {
    const userArray: userdetails[] = this.userStorage.getUser();
    const index = this.getLoggedUserIndex();
    const oldTransaction = userArray[index].transactions[tindex];
    const {
      transactionstype,
      expensetype,
      transactionAmount,
      transactiondate,
    } = form.value;
    const newTransaction: transactionDetails = {
      tid: oldTransaction.tid,
      id: oldTransaction.id,
      email: oldTransaction.email,
      transactionMethod: transactionstype,
      expenseMethod: expensetype,
      amount: parseInt(transactionAmount),
      date: transactiondate,
    };
    userArray[index].transactions[tindex] = newTransaction;
    this.userStorage.setUser(userArray);
    form.resetForm();
  }

  // delete transaction.
  deleteTransaction(tindex: number) {
    const userArray: userdetails[] = this.userStorage.getUser();
    const index = this.getLoggedUserIndex();
    userArray[index].transactions.splice(tindex, 1);
    this.userStorage.setUser(userArray);
  }

  // Goals Transaction services.

  getCurrentBalance(): number {
    const user: userdetails = this.userStorage.getUserDetail();
    const index: number = this.getLoggedUserIndex();
    return user.balance;
  }

  addGoals(form: NgForm): void {
    const userArray: userdetails[] = this.userStorage.getUser();
    const index: number = this.getLoggedUserIndex();
    const { goalname, goalamount, initalcontribution } = form.value;

    const newGoal: goalDetails = {
      gid: Date.now() + '',
      id: userArray[index].id,
      name: goalname,
      gamount: parseInt(goalamount),
      camount: parseInt(initalcontribution) || 0,
    };

    userArray[index].goals.push(newGoal);
    this.userStorage.setUser(userArray);
    this.goalChanges = true;
  }

  getGoalInfo(gindex: number): goalDetails {
    const userArray = this.userStorage.getUser();
    const index = this.getLoggedUserIndex();
    return userArray[index].goals[gindex];
  }

  totalSavings(): number {
    const userArray: userdetails[] = this.userStorage.getUser();
    const index: number = this.getLoggedUserIndex();
    var savings = 0;
    userArray[index].goals.forEach((goal) => {
      savings += goal.camount;
    });
    return savings;
  }

  UpdateContribution(form: NgForm, gindex: number) {
    const userArray: userdetails[] = this.userStorage.getUser();
    const index: number = this.getLoggedUserIndex();
    const { ContributionAmount } = form.value;
    userArray[index].goals[gindex].camount += Number(ContributionAmount);
    this.userStorage.setUser(userArray);
    this.goalChanges = true;
  }

  deleteGoal(gindex: number) {
    const userArray: userdetails[] = this.userStorage.getUser();
    const index: number = this.getLoggedUserIndex();
    userArray[index].goals.splice(gindex, 1);
    this.userStorage.setUser(userArray);
    this.goalChanges = true;
  }

  // Analytics

  calculateAnalytics(): {
    foodCost: number;
    entertainmentCost: number;
    shoppingCost: number;
    transportCost: number;
  } {
    this.calculateTransaction;
    const userArray: userdetails = this.userStorage.getUserDetail();
    const index: number = this.getLoggedUserIndex();
    var food = 0;
    var entertainment = 0;
    var shopping = 0;
    var transport = 0;
    userArray.transactions.forEach((transaction) => {
      if (transaction.expenseMethod === 'Food') {
        food += transaction.amount;
      }
      if (transaction.expenseMethod === 'Entertainment') {
        entertainment += transaction.amount;
      }
      if (transaction.expenseMethod === 'Shopping') {
        shopping += transaction.amount;
      }
      if (transaction.expenseMethod === 'Transport') {
        transport += transaction.amount;
      }
    });

    return {
      foodCost: food,
      entertainmentCost: entertainment,
      shoppingCost: shopping,
      transportCost: transport,
    };
  }

  editUserGoal(gindex: number, form: NgForm) {
    const userArray = this.userStorage.getUser();
    const index = this.getLoggedUserIndex();
    const { eGoalName, eGoalAmount } = form.value;
    const oldGoal = userArray[index].goals[gindex];
    const newGoal: goalDetails = {
      gid: oldGoal.gid,
      id: oldGoal.id,
      name: eGoalName,
      gamount: eGoalAmount,
      camount: oldGoal.camount,
    };

    if (oldGoal.gamount > newGoal.gamount) {
      if (newGoal.camount > newGoal.gamount) {
        const excessContribution = newGoal.camount - newGoal.gamount;
        userArray[index].balance += excessContribution;
        newGoal.camount = newGoal.gamount;
      }
    }
    userArray[index].goals[gindex] = newGoal;
    this.userStorage.setUser(userArray);
    this.goalChanges = true;
  }
}
