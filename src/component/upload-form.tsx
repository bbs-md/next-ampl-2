'use client'
import { Button, Upload, Input, Form, message, Space, Typography, Progress, Spin } from 'antd'
import axios from 'axios'
import { wrap } from 'module';
import React, {useState, useEffect} from 'react'

const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

export default function UploadForm(props: any) {

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [file, setfile] = useState<File>()
    const [showMessage, setShowMessage] = useState<boolean>(false)
    const [spin, setSpin] = useState<boolean>(false)
    const [progress, setProgress] = useState<number>(0)
    const [mes, setMes] = useState<string>('')

    useEffect(() => {
            console.log('useEffect changed file');
    }, [file]);

    const handleFileUpload = (file: any) => {
        console.log('Start handleFileUpload file ', file)
        console.log('Start handleFileUpload file1 ', file.file.name)
        setfile(file.file)
        setShowMessage(false)
        setProgress(0)
        //const submitButton = document.querySelector('button[type="submit"]');
        //console.log(';el1', submitButton)
        const submitButton = document.getElementById('submin-form');
        //console.log(';el2', l)
        //l?.click()
        //if (submitButton) submitButton.click()
        return
        axios.post('/api/upload', file, {
            onUploadProgress(progressEvent) {
                console.log('UploadForm progressEvent', progressEvent)
            },
        })

    }
    
    const onFinish = async (values: any) => {
        console.log('Start onFinish, Received values of form: ', values);
        setProgress(0);
        setMes('');
        if (values) {
            let upload  = values?.upload;
            let name = values?.nickname;
            console.log('upload: ', upload, ", nickname: ", name)
            if (file) {
                const data = new FormData()
                data.set('file', file)
                if (name) {
                    data.set('name', name?.toString())
                }
                setSpin(true)
                await axios.post('/api/upload', data, {
                    onUploadProgress(progressEvent) {
                        if (progressEvent.progress) {
                            let prog = Math.ceil(progressEvent.progress * 100);
                            setProgress(prog)
                            console.log('progress', progress, prog)
                        }
                        
                        console.log('UploadForm progressEvent', progressEvent)
                    },
                })
                setSpin(false)
                setMes('data has been downloaded and is being processed')
            }
            else {
                setShowMessage(true)
                messageApi.info('Select the file, please');
            }
            
        }
      };

    const onRequiredTypeChange = ( requiredMarkValue: any ) => {
        console.log('onRequiredTypeChange requiredMarkValue ', requiredMarkValue)
      };

    console.log('FILE >>>>>>', !!file)
    return <div 
                style={{
                    //maxWidth: '800px',
                    margin: '0 auto',
                    textAlign: 'center',
                    marginTop: '100px',
                    height: '200px',
                }}>
    <Form
        onValuesChange={onRequiredTypeChange}
  
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        disabled={false}
        style={{ maxWidth: 600 }}
      > 
        <Form.Item 
            label="Upload"
            name="upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            // rules={[{ required: showMessage, message: 'Please select the file', whitespace: true }]}
            >
                {contextHolder}
        
        <Upload 
            //action="/api/upload"
            listType="picture-card"
            customRequest={handleFileUpload}
            showUploadList={false}
            accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .wmv"
            
        >
            <div>

              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
            {/* <Button>Select the file</Button> */}
        </Upload>
        { file ? <Space direction="vertical" ><Space style={{ backgroundColor: "0,0,0,0.05", width: 500, padding: 8}}>
            
            <Typography>{file.name}</Typography>
        </Space>
        {progress ? <Progress percent={progress} /> : null}
        </Space>
        : null}
        
        
        </Form.Item>
        {/* {showMessage ? <div style={{display: 'flex'}}><div className='ant-form-item-explain ant-form-item-explain-connected css-dev-only-do-not-override-6j9yrn' role='alert'><div className='ant-form-item-explain-error'>Please, select the file</div></div></div> : null } */}
        
        <Form.Item
            name="nickname"
            label="Nickname"
            tooltip="What do you want others to call you?"
            rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}>
        <Input placeholder='name'/>
        </Form.Item>
        
        <Form.Item>
        <Button type="primary" htmlType="submit" id="submin-form">Submit</Button>
        <div><Spin spinning={spin}/></div>
        {mes ? <div>{mes}</div> : null}
      </Form.Item>        
      </Form>
      

    </div>
}