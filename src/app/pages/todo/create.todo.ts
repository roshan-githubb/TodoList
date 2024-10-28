import {
  CreateTheConnectionLocal,
  LocalSyncData,
  MakeTheInstanceConceptLocal,
  PatcherStructure,
  PRIVATE,
  UpdateComposition,
} from "mftsccs-browser";
import { StatefulWidget } from "../../default/StatefulWidget";
import "./todo.style.css";
import { getLocalUserId } from "../user/login.service";

export class CreateTodo extends StatefulWidget {
  async addEvents(): Promise<void> {
    let userId: number = getLocalUserId();
    let order: number = 1;
    let task = this.getElementById("name") as HTMLInputElement;
    let id = this.getElementById("id") as HTMLInputElement;

    if (this.data) {
      task.value = this.data.name;
      id.value = this.data.id;
    }

    let submitButton = this.getElementById("submit");
    if (submitButton) {
      submitButton.onclick = async (ev: Event) => {
        ev.preventDefault();

        if (id.value) {
          let patcherStructure: PatcherStructure = new PatcherStructure();
          patcherStructure.compositionId = Number(id.value);
          patcherStructure.patchObject = {
            name: task.value,
          };
          await UpdateComposition(patcherStructure);
          console.log("updatePatherstructure executed..");
          task.value = "";
          id.value = "";
        } else {
          try {
            let mainConcept = await MakeTheInstanceConceptLocal(
              "the_todo",
              "",
              true,
              userId,
              PRIVATE
            );
            let concept = await MakeTheInstanceConceptLocal(
              "name",
              task.value,
              false,
              userId,
              PRIVATE
            );
            await CreateTheConnectionLocal(
              mainConcept.id,
              concept.id,
              mainConcept.id,
              order,
              "",
              userId
            );
            await LocalSyncData.SyncDataOnline();
            console.log("New task added successfully.");
            task.value = "";
            id.value = "";
          } catch (error) {
            console.error("Error creating task:", error);
          }
        }

        console.log("submit button clicked");
      };
    }
  }

  getHtml(): string {
    return `
            <div class="container">
                <form>
                    <div>
                        <input type="number" id="id" hidden>
                        <div class="formbody">
                            <label>Task</label>
                            <input type="text" id="name" placeholder="Enter task here">
                        </div>
                        <button class="btn btn-primary" id="submit" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        `;
  }
}
