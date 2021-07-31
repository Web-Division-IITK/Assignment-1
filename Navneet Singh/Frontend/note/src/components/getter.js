import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const base_url = "http://127.0.0.1:8000/";

const AddNote = () => {

  const { title1,setTitle } = useState("");
  const {description1,setDescription} =useState("");

  const onSave = async (e) =>{
    await axios
    .post(base_url+"api/notes/",
    {
        title: title1,
        description: description1,
    })
    .then((res) => {
        alert("note saved suucessfully");
      })
      .catch((err) => {
        console.log(err);
        alert("error while saving");
      });
  }
  return (
    <Modal >
      <ModalHeader >Notes</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              required
              valid
              type="text"
              name="title"
              placeholder="note title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              placeholder="note description"
              onChange={(e)=>setDescription(e.target.value)}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" 
        onClick={(e) => onSave(e)}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default AddNote;
