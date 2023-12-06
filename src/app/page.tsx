import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';
import { cookies } from 'next/headers';
// 1. Add the following two imports
import { revalidatePath } from 'next/cache';
import * as queries from '@/graphql/queries';
import InputElem from '@/component/input-elem'

import config from '@/amplifyconfiguration.json';

/*
const cookiesClient = generateServerClientUsingCookies({
  config,
  cookies
});

// 2. Create a new Server Action
async function createTodo(formData: FormData) {
  "use server"
  const { data } = await cookiesClient.graphql({
    query: queries.myCustomQuery,
    variables: {
      cvData: {
        bucketName: 'bucketName',
        objectKey: 'file.name',
        source: "alliedtesting.com",
        name: 'name'
      }            
    }
  });

  console.log("Created Todo: ", data )

}
*/
export default async function Home() {
  const cvData = {bucketName: "bucketName-XXX-XXX", objectKey: "objectKey-YYY-YYYY", source: "alliedtesting.com", name: "test name"}
  /*const { data, errors } = await cookiesClient.graphql({
    query: queries.myCustomQuery, variables: {cvData}
  });
  console.log('cookiesClient >>>> data', data)

  const myClick = async () => {
    const { data, errors } = await cookiesClient.graphql({
      query: queries.myCustomQuery, variables: {cvData}
    });
    console.log('cookiesClient >>>> data', data)

  }
*/
  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
        marginTop: '100px',
        height: '200px',
      }}
    >
      {/* 3. Update the form's action to use the
          new create Todo Server Action*/}
      
      {/* <form action={createTodo}> */}
        {/* <input name="name" placeholder="Add a todo" />
        <button type="submit">Add</button> */}
        <InputElem tol={'tol'}>Input el</InputElem>
      {/* </form> */}
    </div>
  );
}