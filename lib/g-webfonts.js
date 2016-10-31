'use babel';

import GWebfontsView from './g-webfonts-view';
import { CompositeDisposable } from 'atom';

export default {

  gWebfontsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.gWebfontsView = new GWebfontsView(state.gWebfontsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.gWebfontsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'g-webfonts:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.gWebfontsView.destroy();
  },

  serialize() {
    return {
      gWebfontsViewState: this.gWebfontsView.serialize()
    };
  },

  toggle() {
    console.log('GWebfonts was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
