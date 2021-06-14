import * as React from 'react';
import {Button, Card} from 'semantic-ui-react'
import {Note} from "app/models/note.model";
import {EventBusService} from "app/models/event-bus.model";
import {ApplicationService} from "../../application.service";

export interface NotesListProps {

}

export interface NotesListState {
  notes: Array<Note>;
}

export class NotesList extends React.Component<NotesListProps, NotesListState> {
  private applicationService: ApplicationService = ApplicationService.getInstance();
  private eventBus: EventBusService = this.applicationService.getEventBus();

  constructor(props: NotesListProps) {
    super(props);
    this.state = {
      notes: []
    };
  }

  componentDidMount(): void {
    this.setState({notes: this.applicationService.getAllNotes()});
  }

  deleteNote(noteIndex: number): void {
    const notes: Array<Note> = this.state.notes.filter((note, index: number) => index !== noteIndex);
    this.setState({
      notes
    });
    this.applicationService.setNotes(notes);
    this.eventBus?.postMessage({name: "NotesCountUpdate", payload: {count: notes?.length}});
  }

  render(): React.ReactNode {
    return (
      <div className="notes-admin-list">
        {!this.state.notes?.length ? <h3>There is no notes</h3> : ''}
        <Card.Group>
          {this.state.notes?.map((note: Note, index: number) => {
            return (
              <Card key={note.id}>
                <Card.Content>
                  <Card.Header>{note.subject}</Card.Header>
                  <Card.Meta>{note.type}</Card.Meta>
                  <Card.Description>
                    {note.body}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button basic color='red'
                            onClick={this.deleteNote.bind(this, index)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      </div>
    );
  }
}
