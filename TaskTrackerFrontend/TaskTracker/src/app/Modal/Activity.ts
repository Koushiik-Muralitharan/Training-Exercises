export class Activity{
  taskId!: number
  activityId!:number
  title: string
  descriptionField: string
  activityHours: number

  constructor(){
    this.title = "";
    this.descriptionField = "";
    this.activityHours = 0;
  }
}