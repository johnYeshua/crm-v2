import { Component, OnInit } from "@angular/core";
import { TodoItem } from "src/app/model/todo-item";
import {
  Chart,
  LinearScale,
  BarController,
  CategoryScale,
  BarElement,
} from "chart.js";

@Component({
  selector: "app-home-page",
  templateUrl: "./homePageView.html",
  styleUrls: ["./homePageView.css"],
})
export class HomePageView implements OnInit{
  toDoItems: TodoItem[] = [];
  toDoText: string = "";
  myBarChart: Chart | undefined;
  completedCount: number = 2;
  uncompletedCount: number = 0;
  time = new Date();
  ngOnInit() {
    const toDoItem: TodoItem = new TodoItem(
      this.toDoItems.length + 1,
      (document.getElementById('text_todo') as HTMLInputElement).innerHTML = "Meeting at 3PM with HR"
    );
    this.toDoItems.push(toDoItem);
    const toDoItem2: TodoItem = new TodoItem(
      this.toDoItems.length + 1,
      (document.getElementById('text_todo') as HTMLInputElement).innerHTML = "Create new Recruiter Admin ID 23"
      
    );
    this.toDoItems.push(toDoItem2);
    const toDoItem3: TodoItem = new TodoItem(
      this.toDoItems.length + 1,
      (document.getElementById('text_todo') as HTMLInputElement).innerHTML = "Meeting with BD Director at 1PM"
      
    );
    this.toDoItems.push(toDoItem3);
    this.uncompletedCount = this.toDoItems.length;
    Chart.register(LinearScale, BarController, CategoryScale, BarElement);
    this.createChart();
    setInterval(()=>{
      this.time = new Date();
    }, 1000)
  }
  createChart() {
    const canvas = document.getElementById("myChart") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      this.myBarChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Completed", "Uncompleted"],
          datasets: [
            {
              label: "To-Do Items",
              data: [this.completedCount, this.uncompletedCount],
              backgroundColor: ["#d9e6fc", "#fc606f"],
            },
          ],
        },
        options: {
          scales: {
            x: {
              ticks:{
                font: {size:16, family:"'courier new', 'courier', 'monospace'"},
                color: '#656D76',
              }
            },
            y: {
              beginAtZero: true,
              ticks:{
                font: {size:16, family:"'courier new', 'courier', 'monospace'"},
                color: '#656D76',
              }
            },
          },
        },
      });
    }
  }
  updateChartData() {
    const newCompletedCount = this.completedCount;
    const newUncompletedCount = this.toDoItems.length;

    // Update the chart's dataset
    if (this.myBarChart) {
      this.myBarChart.data.datasets[0].data = [
        newCompletedCount,
        newUncompletedCount,
      ];

      // Update the chart
      this.myBarChart.update();
    }
  }

  addItem() {
    if (this.toDoText.trim() != "") {
      const toDoItem: TodoItem = new TodoItem(
        this.toDoItems.length + 1,
        this.toDoText
      );
      this.toDoItems.push(toDoItem);
      this.toDoText = "";
      this.updateChartData();
    }
  }
  removeItem(id: number) {
    this.toDoItems = this.toDoItems.filter((item) => item.id !== id);
    this.completedCount++;
    this.updateChartData();
  }
}
