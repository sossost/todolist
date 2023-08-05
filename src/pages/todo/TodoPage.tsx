/** @jsxImportSource @emotion/react */

import { getAllTodos } from "../../api/todo";
import { toast } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { TodoContext } from "../../store/todoContext";
import styled from "@emotion/styled";

import TodoList from "../../components/todo/TodoList";
import TodoForm from "../../components/todo/TodoForm";
import CenterMessage from "../../components/CenterMessage";
import { AuthContext } from "../../store/authContext";

const TodoPage = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await getAllTodos();
        setTodos(todos);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    if (token) {
      fetchTodos();
    }
  }, [setTodos, token]);

  return (
    <Layout>
      <LeftSection>
        <TodoForm />
        <TodoList todos={todos} />
      </LeftSection>
      <RightSection>
        <ContentWrapper>
          <CenterMessage message="오픈준비중" />
        </ContentWrapper>
      </RightSection>
    </Layout>
  );
};

export default TodoPage;

const Layout = styled.div`
  padding: 0;
  display: flex;
  width: 100%;
  flex-grow: 1;
  gap: 30px;
  justify-content: center;
  @media (min-width: 768px) {
    padding: 30px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  width: 100%;
  flex-grow: 1;
  border-radius: 20px;
  gap: 20px;
  @media (min-width: 768px) {
    width: 100%;
    gap: 30px;
  }
`;

const RightSection = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-grow: 1;
    max-width: 450px;
    border-radius: 20px;
    gap: 30px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%,
  height: 100%;
  flex-grow: 1;
  max-width: 450px;
  gap: 20px;
  background: rgba(255, 255, 255, 0.5);
  padding: 30px;
  border-radius: 20px;
`;
