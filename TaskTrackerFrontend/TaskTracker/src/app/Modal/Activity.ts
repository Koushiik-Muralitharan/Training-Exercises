export class Activity{
  taskId!: number
  title: string
  descriptionField: string
  activityHours: number

  constructor(){
    this.title = "";
    this.descriptionField = "";
    this.activityHours = 0;
  }
}