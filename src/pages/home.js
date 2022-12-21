import React, { useState } from 'react';
import Logo from '../media/sharewell-logo.png';
import { Form, Table } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import { dummyNoteColumns } from '../constants/dummyNoteColumns.js';
import { Resizable } from 'react-resizable';
import { Button, Modal, Input } from 'antd';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, addDoc, getDocs } from "firebase/firestore"; 
import { useEffect } from 'react';

const ENCOURAGEMENTS_COLLECTION = "encouragements"

const firebaseConfig = {
  apiKey: "AIzaSyDhpl0xAkoUlh9xcAZvd75qyjxzyVEV3i0",
  authDomain: "sharewell-poc.firebaseapp.com",
  projectId: "sharewell-poc",
  storageBucket: "sharewell-poc.appspot.com",
  messagingSenderId: "263311393",
  appId: "1:263311393:web:bce3155c5138ddf385d360",
  measurementId: "G-EZVETZXYWC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

function SharewellLogo() {
    return (
        <div>
          <img src={Logo} alt="logo" />
        </div>
    );
}

/**
* Only columns with prop = 'width' will be resizable.
*/
const ResizableHeader = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{
        enableUserSelectHack: false,
      }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

function NoteTable () {
    // set state of the notes
    const [notes, setNotes] = useState([])
    useEffect(() => {
      loadNotes()
        .then(noteData => renderNotes(noteData))
        .then(renderedNotes =>  setNotes(renderedNotes))
        .catch((error) => console.log("Error getting document:", error));
    }, [])

  // TODO: pass real data into the state
    const [columns, setColumns] = useState(dummyNoteColumns);

      const handleResize = (index) =>
        (_, { size }) => {
          const newColumns = [...columns];
          newColumns[index] = { ...newColumns[index], width: size.width };
          setColumns(newColumns);
        };

      const mergeColumns = columns.map((col, index) => ({
        ...col,
        onHeaderCell: (column) => ({
          width: column.width,
          onResize: handleResize(index),
        }),
      }));

    return (
        <Table
          bordered
          components={{
            header: {
              cell: ResizableHeader,
            },
          }}
          columns={mergeColumns}
          dataSource={notes}
          pagination={false}
        />
      );
}

async function loadNotes() {
  const querySnapshot = await getDocs(collection(db, ENCOURAGEMENTS_COLLECTION));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
  return querySnapshot.docs.map(doc => doc.data());

}

function renderNotes(note) {
  const formattedNotes = [];
  // iterate through notes, create a JSON per note and append JSON to renderedNotes
  note.forEach((note) => {
    formattedNotes.push({
      key: note.id,
      name: note.name,
      note: note.note,
      react: true,
      score: 5000,
      delete: true
    });
  });
  return formattedNotes;
}

function WriteNoteButton() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Write a Note
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <NoteForm/> 
      </Modal>
    </div>
  );
}

function NoteForm() {
  const [name, setName] = useState('');
  const [note, setNote] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  }

  return (
    <Form name="note-form" validateMessages={validateMessages}>
      <Form.Item
        name={['user', 'name']}
        label="Your Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input onChange={handleNameChange}/>
      </Form.Item>
      <Form.Item 
        name={['user', 'note']} 
        label="Your Encouragement Note"
        rules={[
          {
            required: true,
          },
        ]}>
        <Input.TextArea onChange={handleNoteChange} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={() => saveNote(name, note)}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

async function saveNote(name, note) {
  console.log("Name of sender: " + name);
  console.log("Note: " + note);
  const addDocResult = await addDoc(collection(db, "encouragements"), {
    name: name,
    note: note
  });
  console.log("Document written with ID: ", addDocResult.id);
}

const validateMessages = {
  required: '${label} is required!',
};

function HomePage() {
    return (
        <div className="home">
            <SharewellLogo />
            <NoteTable />
            <WriteNoteButton />
        </div>
    )
}

const App = () => <HomePage />

export default App;