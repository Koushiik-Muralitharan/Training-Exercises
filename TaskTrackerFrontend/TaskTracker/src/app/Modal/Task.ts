export class Task{
  userId: number
  taskId!: number
  clientName: string
  projectName: string
  title: string
  eta: number
  taskDate: string
  assignedTo: string
  assignedBy: string
  supportType: string
  priorityType: string
  descriptionField: string

  constructor(){
  this.userId = 0;
  this.clientName ="";
  this.projectName = "";
  this.title = "";
  this.eta = 0;
  this.taskDate = "";
  this.assignedTo = "";
  this.assignedBy = "";
  this.supportType = "";
  this.priorityType = "";
  this.descriptionField = "";
  }
}