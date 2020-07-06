import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectUser } from "../../../store/user/selectors";

import TextAreaInput from "./textarea";
import Comment from "./comment";
import Button from "../button";

const Container = styled.div`
  width: 100%;
  margin-bottom: 100px;
`;

const AddComment = styled.div`
  border: 1px solid #d1d8dd;
  border-radius: 3px;
`;

const Top = styled.div`
  display: flex;
  padding: 10px 25px;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f7fa;
  border-bottom: 1px solid #d1d8dd;
`;

const Span = styled.span`
  font-size: 0.75em;
  color: #8d99a6;
`;

const Main = styled.div`
  padding: 20px;
`;

const CommentsSection = ({ idx, doc, field_name, onChange }) => {
  const user = useSelector(selectUser);

  const [comments, setComments] = useState([]);
  const [state, setState] = useState({ comment: "" });

  useEffect(() => {
    setComments(doc[field_name]);
  }, [doc[field_name]]);

  const onLocalChange = (name, value) => {
    setState({ [name]: value });
  };

  const addComment = () => {
    if (!state.comment) return;

    const comment = {
      comment: state.comment,
      created_by: user.email,
      created_at: new Date(),
    };

    setState({ comment: "" });
    onChange(idx, field_name, [...[comment], ...comments]);
  };

  const editComment = (index, value) => {
    const newComments = [...comments];
    newComments[index].comment = value;
    onChange(idx, field_name, newComments);
  };

  const deleteComment = (index) => {
    const newComments = [...comments];
    newComments.splice(index, 1);
    onChange(idx, field_name, newComments);
  };

  return (
    <Container>
      <AddComment>
        <Top>
          <Span>Agrega un comentario</Span>
          <Button onClick={addComment}>Comentar</Button>
        </Top>
        <Main>
          <TextAreaInput
            doc={state}
            name="comment"
            onChange={onLocalChange}
            rows={4}
          />
        </Main>
      </AddComment>

      {comments.map((comment, index) => (
        <Comment
          key={comment.created_at}
          index={index}
          onEdit={editComment}
          onDelete={deleteComment}
          {...comment}
        />
      ))}
    </Container>
  );
};

export default CommentsSection;
