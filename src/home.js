import React, { useState } from 'react';
import Logo from './sharewell-logo.png'
import { Table } from 'antd';
import 'antd/dist/antd.css'
import './index.css';
//import { dummyNoteData, dummyNoteColumns } from './dummyNoteColumns.js'
import { Resizable } from 'react-resizable';

const dummyNoteData = [
    {
        key: '1',
        message: 'You are cool',
        sender: 'Andre Peng',
    },
    {
        key: '2',
        message: 'You are the cutest!',
        sender: 'Hyerin Yoon',
    },
    {
        key: '3',
        message: 'You have a big heart!',
        sender: 'FooBar',
    },
];

const dummyNoteColumns = [
  {
    title: 'Sender',
    dataIndex: 'sender',
    key: 'sender',
    width: 200,
  },
  {
    title: 'Note',
    dataIndex: 'message',
    key: 'message',
    width: 500,
  },
];

// ===================================

class SharewellLogo extends React.Component {
  render() {
    return (
        <div>
          <img src={Logo} alt="logo" />
        </div>
    );
  }
}

/**
* Only columns with prop = 'width' will be resizable.
* Last column is not resizable
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

class WriteNoteButton extends React.Component {
    render() {
        return (
            <div className="write-note-button">
                <button>
                    Write a Note
                </button>
            </div>
        )
    }
}

class HomePage extends React.Component {
    render() {
        return (
            <div className="home">
                <SharewellLogo />
                <NoteTable />
                <WriteNoteButton />
            </div>
        )
    }
}

const App = () => <HomePage />

export default App;