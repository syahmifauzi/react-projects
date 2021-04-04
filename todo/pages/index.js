import { useContext, useEffect } from 'react';
import { useUser, getSession } from '@auth0/nextjs-auth0';

import Header from '../components/header';
import Container from '../components/container';
import AddItem from '../components/add-item';
import TodoList from '../components/todo-list';
import Completed from '../components/completed';
import { table, minifyRecords } from './api/utils/Airtable';
import { TodosContext } from '../contexts/todos-context';

export default function Home({ initialTodos }) {
  const { todos, setTodos } = useContext(TodosContext);
  const { user } = useUser();

  useEffect(() => {
    setTodos(initialTodos);
  }, []);

  const getTodoList = () => todos.filter(todo => !todo.fields.completed);

  const getCompletedTodos = () => todos.filter(todo => todo.fields.completed);

  return (
    <>
      <Header user={user} />
      <Container>
        <AddItem user={user} />
        <TodoList user={user} todos={getTodoList()} />
        <Completed user={user} todos={getCompletedTodos()} />
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = getSession(context.req, context.res);
    const userId = session?.user?.sub;
    const todos = await table
      .select({
        filterByFormula: `userId = '${userId}'`,
        fields: ['description', 'completed', 'userName'],
        sort: [{ field: 'createdTime', direction: 'desc' }],
      })
      .firstPage();
    return { props: { initialTodos: minifyRecords(todos) } };
  } catch (err) {
    console.log(err);
    return { props: { err: 'Something went wrong' } };
  }
}
