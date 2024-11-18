import styled from "styled-components";

export const AppContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

export const TaskInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-right: 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }

  &.delete {
    background-color: #f44336;
  }

  &.edit {
    background-color: #2196f3;
  }
`;

export const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
  color: #333;
`;

export const TaskItem = styled.li<{ $completed?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  background-color: ${(props) => (props.$completed ? "#e0e0e0" : "white")};
  text-decoration: ${(props) => (props.$completed ? "line-through" : "none")};
`;
