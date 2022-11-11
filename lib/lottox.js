'use babel';

import LottoxView from './lottox-view';
import { CompositeDisposable } from 'atom';

export default {

  lottoxView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.lottoxView = new LottoxView(state.lottoxViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.lottoxView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'lottox:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.lottoxView.destroy();
  },

  serialize() {
    return {
      lottoxViewState: this.lottoxView.serialize()
    };
  },

  toggle() {
    console.log('Lottox was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
