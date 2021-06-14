import {EventBusService} from "app/models/event-bus.model";
import {Note} from "app/models/note.model";

export class ApplicationService {
  private static instance: ApplicationService;
  private eventBus: EventBusService

  public static getInstance(): ApplicationService {
    if (!ApplicationService.instance) {
      ApplicationService.instance = new ApplicationService();
    }
    return ApplicationService.instance;
  }

  setEventBus(eventBus: EventBusService | undefined): void {
    if (eventBus) {
      this.eventBus = eventBus;
    }
  }

  getEventBus(): EventBusService {
    return this.eventBus;
  }

  getAllNotes(): Array<Note> {
    let existingNotes: Array<Note>;
    const existingNotesString: string | null = window.localStorage.getItem("my_notes");
    if (!existingNotesString) {
      existingNotes = [];
    } else {
      existingNotes = JSON.parse(existingNotesString);
    }
    return existingNotes;
  }

  setNotes(notes: Array<Note>): void {
    return window.localStorage.setItem("my_notes", JSON.stringify(notes));
  }
}
