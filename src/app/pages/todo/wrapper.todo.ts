import { StatefulWidget } from "../../default/StatefulWidget";
import { CreateTodo } from "./create.todo";
import { TodoList } from "./list.todo";
import "./todo.style.css";

export class TodoWrapper extends StatefulWidget {
  mountChildWidgets() {
    let widget1 = this.getElementById("widget1");
    let widget2 = this.getElementById("widget2");
    let creating = new CreateTodo();
    let listing = new TodoList();

    if (widget1) {
      this.childWidgets.push(creating);
      creating.mount(widget1);
    }
    if (widget2) {
      listing.dataChange((value: any) => {
        this.UpdateChildData(value, creating);
      });
      this.childWidgets.push(listing);
      listing.mount(widget2);
    }
  }

  getHtml(): string {
    let html = "";

    html = `<div class="flex-container">
                    <div id= "widget1"></div>
                </div>
                <div class="flex-container">
                    <div id ="widget2"></div>
                </div>`;
    return html;
  }
}
