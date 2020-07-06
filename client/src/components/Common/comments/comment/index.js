import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { timeSince } from "../../../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { selectUser } from "../../../../store/user/selectors";

import TextAreaInput from "../textarea";

const Container = styled.div`
  margin-top: 20px;
  border: 1px solid #d1d8dd;
  border-radius: 3px;
`;

const Top = styled.div`
  display: flex;
  padding: 10px 25px;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
  background-color: #f5f7fa;
  border-bottom: 1px solid #d1d8dd;
`;

const Span = styled.span`
  margin-left: 10px;
  font-size: 0.75em;
  color: #8d99a6;
`;

const Flex = styled.div`
  display: flex;
`;

const Button = styled.p`
  font-size: 0.75em;
  color: #8d99a6;
  cursor: pointer;
  margin-right: 10px;
`;

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  path {
    color: ${(props) => props.color || "unset"};
  }
`;

const Main = styled.div`
  padding: 20px;
`;

const Comment = ({
  comment,
  created_at,
  created_by,
  index,
  onEdit,
  onDelete,
}) => {
  const user = useSelector(selectUser);

  const [state, setState] = useState({ comment });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setState({ comment });
  }, [comment]);

  const onLocalChange = (name, value) => {
    onEdit(index, value);
  };

  const editComment = () => {
    setEditing(true);
  };

  const onLocalDelete = () => {
    onDelete(index);
  };

  const onBlur = () => {
    setEditing(false);
  };

  return (
    <Container>
      <Top>
        <Flex>
          <Icon icon="comment" />
          <Span>
            {created_by === user.email ? "Tú" : created_by} –{" "}
            {timeSince(created_at, true)}
          </Span>
        </Flex>
        {created_by === user.email && (
          <Flex>
            <Button onClick={editComment}>Modificar</Button>
            <Icon icon="times" onClick={onLocalDelete} />
          </Flex>
        )}
      </Top>

      <Main>
        <TextAreaInput
          doc={state}
          name="comment"
          onChange={onLocalChange}
          disabled={!editing}
          onBlur={onBlur}
          rows={2}
        />
      </Main>
    </Container>
  );
};

export default Comment;
