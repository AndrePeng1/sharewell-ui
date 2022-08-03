import React, { useState } from 'react';
import Logo from '../media/sharewell-logo.png'
import { Table } from 'antd';
import 'antd/dist/antd.css'
import './index.css';
import { dummyNoteData, dummyNoteColumns } from '../constants/dummyNoteColumns.js'
import { Resizable } from 'react-resizable';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
          dataSource={dummyNoteData}
          pagination={false}
        />
      );
}

function WriteNoteButton() {
    return (
        <div className="write-note-button">
            <button onClick={WriteNoteModal}>
                Write a Note
            </button>
        </div>
    )
}

function WriteNoteModal() {
  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Write a Note</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Modal body text goes here.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}

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