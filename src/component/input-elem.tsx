'use client'
import React, {useState} from 'react'

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
            

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data
            })

            if (!res.ok) throw new Error(await res.text())
            else {
                setMessage(`The file ${file.name} was uploaded`)
        }
        } catch (e: any) {
            setMessage(`Failed to sent data: ${e}`)
            console.error("Failed to sent data", e)    
        }
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