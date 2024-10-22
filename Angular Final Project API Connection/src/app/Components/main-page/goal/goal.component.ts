import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserStorageService } from '../../../Storage/user-storage.service';
import { TranactionsService } from '../../../Services/tranactions.service';
import { goalDetails } from '../../../models/goalsmodal';

@Component({
  selector: 'app-goal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.css',
})
export class GoalComponent {
  goalsArray: goalDetails[] = [];
  addGoalPopUp: Boolean = false;
  contributeGoalPopUp: Boolean = false;
  updateGoalPopUp: Boolean = false;
  currentBalance!: number;
  goaltarget!: number;
  goalContributed!: number;
  gindex!: number;
  gCongrats!: Boolean;
  editGoalAmount!: number;
  editGoalName!: string;
  editGoalIndex!: number;
  goalsSavings!: number;

  constructor(
    private userStorage: UserStorageService,
    private transactionService: TranactionsService
  ) {}
  ngOnInit(): void {
   // this.currentBalance = this.transactionService.getCurrentBalance();
   // this.loadGoals();
    //this.transactionService.totalSavings();
  }

  addGoal() {
    this.addGoalPopUp = !this.addGoalPopUp;
    this.currentBalance = this.transactionService.getCurrentBalance();
    this.transactionService.calculateTransaction();
  }

  closeContribution() {
    this.contributeGoalPopUp = !this.contributeGoalPopUp;
  }

  updateGoal(gindex: number = -1) {
    this.updateGoalPopUp = !this.updateGoalPopUp;
    console.log('goal index: ' + gindex);
    if (gindex > -1) {
      this.editGoal(gindex);
    }
  }

  addContribution(gindex: number) {
    this.contributeGoalPopUp = !this.contributeGoalPopUp;
    this.transactionService.calculateTransaction();
    const CurrentGoal = this.transactionService.getGoalInfo(gindex);
    this.currentBalance = this.transactionService.getCurrentBalance();
    this.goaltarget = CurrentGoal.gamount;
    this.goalContributed = CurrentGoal.camount;
    this.gindex = gindex;
  }

  onGoalSubmit(form: NgForm) {
    this.transactionService.addGoals(form);
    this.loadGoals();
    this.addGoal();
    this.transactionService.calculateTransaction();
    const userArray = this.userStorage.getUser();
    const index = this.transactionService.getLoggedUserIndex();
    this.congratulationsPopUp(userArray[index].goals.length - 1);
  }

  onContributionSubmit(form: NgForm) {
    //console.log('contribution submitted');
    //console.log(form);
    //console.log(this.gindex);
    this.transactionService.UpdateContribution(form, this.gindex);
    this.loadGoals();
    this.closeContribution();
    this.congratulationsPopUp(this.gindex);
  }

  congratulationsPopUp(gindex: number): void {
    this.gCongrats = this.goalStatusCheck(gindex);
    //console.log("Congratulations pop up.");
  }

  closeCongrats() {
    this.gCongrats = !this.gCongrats;
  }

  isContributionValid(gfcontribution: string, gfamount: string): boolean {
    const contribution = Number(gfcontribution);
    const amount = Number(gfamount);
    return contribution > amount;
  }

  loadGoals() {
    const userArray = this.userStorage.getUser();
    const index = this.transactionService.getLoggedUserIndex();
    this.goalsArray = userArray[index].goals;
    this.transactionService.calculateTransaction();
    this.goalsSavings = this.totalSavings();
  }

  totalSavings(): number {
    const userArray = this.userStorage.getUser();
    const index = this.transactionService.getLoggedUserIndex();
    this.goalsArray = userArray[index].goals;
    var savings = 0;

    this.goalsArray.forEach((goal) => {
      savings += goal.camount;
    });
    return savings;
  }

  goalContributionCheck(goalContribute: string): Boolean {
    if (Number(goalContribute) + this.goalContributed > this.goaltarget) {
      return true;
    }
    return false;
  }

  contributionGreater(goalContribute: string) {
    if (Number(goalContribute) > this.currentBalance) {
      return true;
    }
    return false;
  }

  deleteGoal(gindex: number) {
    this.transactionService.deleteGoal(gindex);
    this.loadGoals();
    this.transactionService.calculateTransaction();
  }

  goalStatusCheck(gindex: number): Boolean {
    const userArray = this.userStorage.getUser();
    const index = this.transactionService.getLoggedUserIndex();
    const goal = userArray[index].goals[gindex];
    //console.log("Goal amount:"+goal.gamount)
    if (goal.gamount === goal.camount) {
      return true;
    }
    return false;
  }

  checkGoalName(goalName: string): Boolean {
    const userArray = this.userStorage.getUser();
    const index = this.transactionService.getLoggedUserIndex();
    const goal = userArray[index].goals;
    return goal.some((g) => g.name === goalName);
  }

  goalUpdate(form: NgForm) {
    this.transactionService.editUserGoal(this.editGoalIndex, form);
    //console.log(this.editGoalIndex);
    this.congratulationsPopUp(this.editGoalIndex);
    this.loadGoals();
    this.updateGoal();
  }

  editGoal(gindex: number): void {
    this.editGoalIndex = gindex;
    const userArray = this.userStorage.getUser();
    const index = this.transactionService.getLoggedUserIndex();
    this.editGoalName = userArray[index].goals[gindex].name;
    this.editGoalAmount = userArray[index].goals[gindex].gamount;
  }

  checkGoalNameUpdate(goalName: string): Boolean {
    const userArray = this.userStorage.getUser();
    const index = this.transactionService.getLoggedUserIndex();
    const goal: goalDetails = userArray[index].goals[this.editGoalIndex];
    const goalid = goal.gid;
    return userArray[index].goals.some(
      (g) => g.name === goalName && goalid !== g.gid
    );
  }
}
