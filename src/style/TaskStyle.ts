import styled from "styled-components";

export const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #2a3663;
  border-radius: 4px;
`;

export const TaskInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Button = styled.button<{ $active?: boolean }>`
  background-color: ${(props) => (props.$active ? "#4CAF50" : "#AE445A")};
  color: ${(props) => (props.$active ? "white" : "#FAF6E3")};
  border: none;
  padding: 8px 12px;
  margin-right: 5px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
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
  border-radius: 4px;
  margin-bottom: 5px;
  background-color: ${(props) => (props.$completed ? "#f0f0f0" : "white")};
  text-decoration: ${(props) => (props.$completed ? "line-through" : "none")};
`;
