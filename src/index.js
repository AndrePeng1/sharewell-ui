import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class NoteList extends React.Component {
  render() {
    return (
      <div className="note-list">
        <ul>
          <li>You are cool!</li>
          <li>You are the cutest!</li>
          <li>You have a big heart</li>
        </ul>
      </div>
    );
  }
}

// Example usage: <NoteList />

// ================== main =================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<NoteList />);