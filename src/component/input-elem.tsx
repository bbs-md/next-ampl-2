'use client'
import React, {useState} from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { saveDataToS3, sendCvDataByGrapgQl } from '@/app/actions'
import { Amplify } from 'aws-amplify';
import config from '@/amplifyconfiguration.json';
import { generateClient } from 'aws-amplify/api';
import { myCustomMutation } from "@/graphql/mutations";

Amplify.configure(config);
const client = generateClient();


export default function InputElem(props: any) {
    console.log('InputElem props >>>>', props)
    const [file, setfile] = useState<File>()
    const [message, setMessage] = useState<string>('')

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('Start onSubmit evente', event)
        const formData = new FormData(event.target as HTMLFormElement);
        let name = formData.get("name");
        console.log('Start name', name)
        if (!file) {
            setMessage('Select the file')
            return
        }

        try {
            const data = new FormData()
            data.set('file', file)
            if (name) {
                data.set('name', name?.toString())
            }

            // const apiData = await client.graphql({ query: myCustomMutation, variables: { 
            //     cvData: {
            //       bucketName: "bucketName",
            //       objectKey: `public/fileName`,
            //       source: "alliedtesting.com",
            //       name: "cvData.name"
            //     }
            //   },
            //   });
            // console.log('graphql apiData >>> ', apiData)
            

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data
            })

            console.log('Save file ', res)

            if (!res.ok) {
                setMessage(`Failed to upload data`)
                throw new Error(await res.text())
            }           

            const uploadResponseDict = await res.json();
            const filePath: string = uploadResponseDict.body.filePath;
            console.log(`The [${filePath}] file was saved`)
            const saveDataToS3Response = await saveDataToS3(filePath);
            console.log('fileNameData ', saveDataToS3Response);
            const key = saveDataToS3Response[0];
            const bucket = saveDataToS3Response[1];
            if (key && bucket) {
                console.log(`The [${filePath}] file was saved to [${bucket}] s3 bucket`);
                let cvDataDict: {} = {name: name}
                const sendCvDataByGrapgQlResponse = await sendCvDataByGrapgQl(filePath, cvDataDict)
                console.log('sendCvDataByGrapgQlResponse ', sendCvDataByGrapgQlResponse)
                const responseFileName = sendCvDataByGrapgQlResponse['fileName'];
                if (responseFileName) {
                    setMessage(`Data and the [${file.name}] file were uploaded`)
                }
            }
            else {
                setMessage(`Data and the [${file.name}] file were uploaded, an error occurred during processing`)
            }
            
            //const saveDataToS3ResponseDict = await saveDataToS3Response.json();
        } catch (e: any) {
            setMessage(`Failed to sent data: ${e}`)
            console.error("Failed to sent data", e)    
        }
    }

    function SubmitButton() {
        const { pending } = useFormStatus()
       
        return (
          <button type="submit" aria-disabled={pending}>
            Add
          </button>
        )
      }


  return (
    <div>
        <form onSubmit={onSubmit}>
            <input name="name" placeholder="Add a todo" />
            <input
                type="file"
                name="file"
                onChange={(e) => {
                    setMessage('')
                    setfile(e.target.files?.[0])}
                }
            />
            <input type="submit" value="Submit" />
        </form>
        {message ? <label>{message}</label> : null}

    </div>
  );
}