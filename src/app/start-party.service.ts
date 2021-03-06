import { Injectable } from '@angular/core';
import { Party } from './party.model'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class StartPartyService {
  parties: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.parties = database.list('start-party');
  }

  getParties(){
    return this.parties;
  }

  addParty(newParty: Party) {
    this.parties.push(newParty)
  }

  addSongs(party, songs: string[]) {
    let partyId = this.getPartyById(party.$key)
    this.parties.push(songs)
  }

  getPartyById(partyId: string) {
    return this.database.object('/start-party/' + partyId);
  }

  editParty(party) {
  let selectedParty = this.getPartyById(party.$key);
  selectedParty.update({name: party.name,
                  location: party.location,
                  date: party.date,
                  danceability: party.danceability,
                  playlist: party.playlist,
                });
    }

  deleteParty(localPartyToDelete) {
    let partyEntryInFirebase = this.getPartyById(localPartyToDelete.$key);
    partyEntryInFirebase.remove();
  }
}
