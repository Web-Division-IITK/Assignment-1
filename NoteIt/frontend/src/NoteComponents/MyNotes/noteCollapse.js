import React from 'react';
import { useState, setState } from 'react';
import {Collapse, Panel} from 'antd';
import {EditOutlined, DeleteOutlined, DeleteColumnOutlined } from '@ant-design/icons';
function NoteCollapse(props){

    const noteEditOptions = (idx)=>(
        <React.Fragment>
            <EditOutlined
                onClick={()=>editNote(idx)}
                />
            <DeleteOutlined
                onClick={()=>deleteNote(idx)}
                />
        </React.Fragment>
    );
    var panelsList = props.panels.map((panelData, index)=>(
        <Panel header={panelData.header} key={index} extra={noteEditOptions(index)}>
            <div>{panelData.text}</div>
        </Panel>
    ))
    return(
        <>
        <Collapse
          defaultActiveKey={['1']}
          onChange={callback}
          expandIconPosition={expandIconPosition}
        >
          {panelsList}
        </Collapse>
      </>
    );

}
export default NoteCollapse;